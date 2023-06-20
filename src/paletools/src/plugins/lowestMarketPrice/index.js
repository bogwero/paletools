

let plugin;

/// #if process.env.LOWEST_MARKET_PRICE
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import localize, { localizeNumber } from "../../localization";
import settings, { saveConfiguration } from "../../settings";
import { addClass, append, attr, css, isHidden, select } from "../../utils/dom";
import { hide, show } from "../../utils/visibility";
import { findLowestMarketPrice, getItemSellValue } from "../../services/market";
import { addLoadingProgress, removeLoadingProgress } from "../../utils/loader";
import { Price } from "../../controls/Price";
import delay from "../../utils/delay";
import { notifyFailure } from "../../utils/notifications";
import { addStyle, removeStyle } from "../../utils/styles";
import styles from "./styles.css";

const cfg = settings.plugins.lowestMarketPrice;

function addStyles() {
    addStyle("lowest-market-price", styles);
}

function removeStyles() {
    removeStyle("lowest-market-price");
}

function addLowestMarketPriceButton(listRows, buttonContainer) {

    if (buttonContainer.findLowestMarketPriceButton) {
        buttonContainer.findLowestMarketPriceButton.setInteractionState(listRows.length > 0);
        return;
    }

    const button = new UTStandardButtonControl();
    css(button, { marginLeft: "8px" });
    addClass(button, "find-lowest-market-price", "section-header-btn", "mini", "call-to-action");

    button.init();
    button.setInteractionState(false);
    button.setText(localize("plugins.lowestMarketPrice.button.text"));
    button.setInteractionState(listRows.length > 0);

    button.addTarget(this, async () => {
        const group = {};

        for (let itemCell of listRows) {
            const itemData = itemCell.data;
            if (!group[itemData.definitionId]) {
                group[itemData.definitionId] = [];
            }

            group[itemData.definitionId].push(itemCell);
        }

        let stopSearch = false;
        for (let definitionId in group) {

            for (let itemCell of group[definitionId]) {
                if (isHidden(itemCell)) {
                    stopSearch = true;
                    break;
                }
                addLoadingProgress(itemCell);
            }

            if (stopSearch) {
                break;
            }

            try {
                const minPrice = await findLowestMarketPrice(definitionId, group[definitionId][0].data.type, 1);

                for (let itemCell of group[definitionId]) {
                    const priceElem = new Price(minPrice ? localizeNumber(minPrice.value) : localize("extinct"), localize("market"));
                    append(itemCell, priceElem);
                    removeLoadingProgress(itemCell);
                }

                await delay(1000, 2000);
            }
            catch (ex) {
                notifyFailure(ex);
                return;
            }
        }
    }, EventType.TAP)

    append(buttonContainer, button);

    buttonContainer.findLowestMarketPriceButton = button;

    on(EVENTS.APP_ENABLED, () => { addStyles(); show(button); });
    on(EVENTS.APP_DISABLED, () => { removeStyles(); hide(button); });
}

function populateSellValue(cells) {
    for (let itemCell of cells) {
        const sellValue = getItemSellValue(itemCell.data.definitionId);

        if(!sellValue) continue;

        const priceElem = new Price(localizeNumber(sellValue), localize("market"));
        append(itemCell, priceElem);
        removeLoadingProgress(itemCell);
    }
}

function run() {
    if(!settings.enabled || !cfg.enabled) return;

    addStyles();

    const UTTransferListView_renderSection = UTTransferListView.prototype.renderSection;
    UTTransferListView.prototype.renderSection = function (t, e, i) {
        if (e !== UTTransferSectionListViewModel.SECTION.AVAILABLE || !settings.enabled || !cfg.enabled) {
            return UTTransferListView_renderSection.call(this, t, e, i);
        }

        const output = UTTransferListView_renderSection.call(this, t, e, i);
        addLowestMarketPriceButton(output.listRows, output._header);
        populateSellValue(output.listRows);
        return output;
    }

    const UTClubSearchResultsView_setItems = UTClubSearchResultsView.prototype.setItems;
    UTClubSearchResultsView.prototype.setItems = function (...args) {
        UTClubSearchResultsView_setItems.call(this, ...args);

        if (!settings.enabled || !cfg.enabled || !this.header) return;

        addLowestMarketPriceButton(this._list.listRows, this.header);
        populateSellValue(this._list.listRows);
    }
}

function menu() {
    const container = document.createElement("div");
    addLabelWithToggle(container, "enabled", cfg.enabled, toggleState => {
        if (toggleState) {
            if (confirm(localize("plugins.dangerous"))) {
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
        name: 'lowest-market-price',
        title: 'plugins.lowestMarketPrice.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;


