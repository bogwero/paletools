let plugin;

/// #if process.env.SELL_MULTIPLE
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import localize, { localizeNumber } from "../../localization";
import { openDialog } from "../../services/dialog";
import { listItemOnTransferMarket } from "../../services/market";
import settings, { saveConfiguration } from "../../settings";
import delay from "../../utils/delay";
import { addClass, append, css, select } from "../../utils/dom";
import { displayLoader, hideLoader } from "../../utils/loader";
import { notifyFailure } from "../../utils/notifications";
import { toPromise } from "../../utils/observable";
import { addStyle } from "../../utils/styles";
import SwipeEventDispatcher from "../../utils/swipe";
import { hide, show } from "../../utils/visibility";
import styles from "./styles.css";
const cfg = settings.plugins.sellMultiple;

const SELL_MULTIPLE_MAX_PLAYERS = 25;
const SELL_MULTIPLE_DELAY = 60000; // 60 seconds

let lastListDate = null;

function addSellMultiple(output) {
    output.selectedCardsCount = 0;
    let selectedCards = {};

    const sellMultipleButton = new UTStandardButtonControl();
    const sellMultipleButtonEl = sellMultipleButton.getRootElement();
    
    addClass(sellMultipleButtonEl, "sell-multiple", "section-header-btn", "mini", "call-to-action");

    sellMultipleButton.init();
    sellMultipleButton.setInteractionState(false);
    sellMultipleButton.setText(localize("plugins.sellMultiple.button.text"));

    const quickSellMultipleButton = new UTStandardButtonControl();
    quickSellMultipleButton.init();
    quickSellMultipleButton.setInteractionState(false);
    quickSellMultipleButton.setText(localize("plugins.sellMultiple.button.quickSellText"));
    css(quickSellMultipleButton, { marginLeft: "8px" });
    addClass(quickSellMultipleButton, "sell-multiple", "section-header-btn", "mini", "call-to-action");

    const chkClassName = "sell-multiple-checkbox";

    function verifyCheckboxState(chk, item){
        if (chk) {
            output.selectedCardsCount++;
            selectedCards[item.data.id] = item.data;
        } else {
            output.selectedCardsCount--;
            delete selectedCards[item.data.id];
        }

        const enabled = Object.keys(selectedCards).length > 0;

        sellMultipleButton.setInteractionState(enabled);
        quickSellMultipleButton.setInteractionState(enabled);
    }

    for (let item of output.listRows) {
        var checkbox = document.createElement("input");
        checkbox.classList.add(chkClassName);
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", ev => {
            if (ev.target.checked && output.selectedCardsCount === SELL_MULTIPLE_MAX_PLAYERS) {
                ev.target.checked = false;
                ev.stopPropagation();
                notifyFailure(localize("plugins.sellMultiple.notifications.maxPlayersReached").replace("{players}", SELL_MULTIPLE_MAX_PLAYERS));
                return false;
            }

            verifyCheckboxState(ev.target, item);
            ev.stopPropagation();
        });

        append(select(".item", item.getRootElement()), checkbox);

        if(isPhone()){
            const swipeEvent = new SwipeEventDispatcher(item.getRootElement());
            swipeEvent.on("SWIPE_LEFT", () => {
                const chk = select(`.${chkClassName}`, item.getRootElement());
                chk.checked = chk.checked;
                verifyCheckboxState(chk, item);
            });
        }
    }

    quickSellMultipleButton.addTarget(this, () => {
        const items = Object.values(selectedCards);
        
        if(items.length === 0) return;

        const discardValue = items.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.discardValue;
          }, 0);

        utils.PopupManager.showConfirmation(items.length > 1 
            ? utils.PopupManager.Confirmations.CONFIRM_DISCARD_ALL 
            : utils.PopupManager.Confirmations.CONFIRM_DISCARD, 
            [localizeNumber(discardValue)], async () => {
            
            await toPromise(services.Item.discard(items));

            selectedCards = {};
            output.selectedCardsCount = 0;
            sellMultipleButton.setInteractionState(false);
            quickSellMultipleButton.setInteractionState(false);
        });
    }, EventType.TAP);


    sellMultipleButton.addTarget(this, () => {
        if (Object.keys(selectedCards).length === 0) return;
        if (lastListDate) {
            let dateDiff = new Date() - lastListDate;
            if (dateDiff < SELL_MULTIPLE_DELAY) {
                notifyFailure(localize("plugins.sellMultiple.notifications.wait").replace("{seconds}", Math.round((SELL_MULTIPLE_DELAY - dateDiff) / 1000)));
                return;
            }
        }

        openDialog([
            { labelEnum: enums.UIDialogOptions.OK },
            { labelEnum: enums.UIDialogOptions.CANCEL }
        ],
            localize("infopanel.label.listitem"),
            `<label>${localize("auctioninfo.startprice")}</label>
                <input id="sell-multiple-start-price" type="number" class="ut-text-input-control fut-bin-buy" placeholder="${localize("auctioninfo.startprice")}" />
                <label>${localize("auctioninfo.buynowprice")}</label>
                <input id="sell-multiple-buy-now-price" type="number" class="ut-text-input-control fut-bin-buy" placeholder="${localize("auctioninfo.buynowprice")}" />
            <br/>
            <br/>
            <label>${localize("plugins.sellMultiple.label.ignoredCards")}</label>
            `,
            async text => {
                const startPrice = parseInt(select("#sell-multiple-start-price").value);
                const buyNowPrice = parseInt(select("#sell-multiple-buy-now-price").value);
                if (text !== 2) return;

                if (isNaN(startPrice) || !startPrice) {
                    notifyFailure(`${localize("auctioninfo.startprice")} - ${localize("invalid")}`);
                    return;
                }

                if (isNaN(buyNowPrice) || !buyNowPrice) {
                    notifyFailure(`${localize("auctioninfo.buynowprice")} - ${localize("invalid")}`);
                    return;
                }

                if (startPrice > buyNowPrice) {
                    notifyFailure(`${localize("auctioninfo.startprice")} > ${localize("auctioninfo.buynowprice")}`);
                    return;
                }

                displayLoader();
                try {
                    const keys = Object.keys(selectedCards);

                    for (let id of keys) {
                        await listItemOnTransferMarket(selectedCards[id], buyNowPrice, startPrice);
                        output.selectedCardsCount--;
                        await delay(3000, 5000);
                        delete selectedCards[id];
                    }

                    if (output.selectedCardsCount < 0) output.selectedCardsCount = 0;

                    selectedCards = {};
                } catch (e) {
                    notifyFailure(e);
                }
                finally {
                    hideLoader();
                    lastListDate = new Date();
                }
            });
    }, EventType.TAP)

    output._header.getRootElement().appendChild(sellMultipleButton.getRootElement());
    output._header.getRootElement().appendChild(quickSellMultipleButton.getRootElement());

    on(EVENTS.APP_ENABLED, () => show(sellMultipleButton));
    on(EVENTS.APP_DISABLED, () => hide(sellMultipleButton));
}

function run() {
    addStyle('paletools-sell-multiple', styles);
    const UTTransferListView_renderSection = UTTransferListView.prototype.renderSection;
    UTTransferListView.prototype.renderSection = function (t, e, i) {
        if (e !== UTTransferSectionListViewModel.SECTION.AVAILABLE || !cfg.enabled) {
            return UTTransferListView_renderSection.call(this, t, e, i);
        }

        const output = UTTransferListView_renderSection.call(this, t, e, i);
        addSellMultiple(output);
        return output;
    }

    const UTWatchListView_renderSection = UTWatchListView.prototype.renderSection;
    UTWatchListView.prototype.renderSection = function (t, e, i) {
        if (e !== UTWatchSectionListViewModel.SECTION.WON || !cfg.enabled) {
            return UTWatchListView_renderSection.call(this, t, e, i);
        }

        const output = UTWatchListView_renderSection.call(this, t, e, i);
        addSellMultiple(output);
        return output;
    }
}

function menu() {
    const container = document.createElement("div");
    addLabelWithToggle(container, "enabled", cfg.enabled, toggleState => {
        if (toggleState) {
            if (confirm(localize("plugins.sellMultiple.warning"))) {
                cfg.enabled = toggleState;
                saveConfiguration();
            }
        }
        else {
            cfg.enabled = false;
            saveConfiguration();
        }
    });
    return container;
}

plugin = {
    run: run,
    order: 11,
    settings: {
        name: 'sell-multiple',
        title: 'plugins.sellMultiple.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;


