

let plugin;

/// #if process.env.LOWEST_MARKET_PRICE
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import localize, { localizeNumber } from "../../localization";
import settings, { saveConfiguration } from "../../settings";
import { addClass, append, attr, css, isHidden, isVisible, remove, select } from "../../utils/dom";
import { hide, show } from "../../utils/visibility";
import { findLowestMarketPrice, getItemSellValue } from "../../services/market";
import { addLoadingProgress, removeLoadingProgress } from "../../utils/loader";
import { Price } from "../../controls/Price";
import delay from "../../utils/delay";
import { notifyFailure } from "../../utils/notifications";
import { addStyle, removeStyle } from "../../utils/styles";

const cfg = settings.plugins.lowestMarketPrice;

function addLowestMarketPriceButton(listRows, buttonContainer, styles) {

    if (buttonContainer.findLowestMarketPriceButton) {
        buttonContainer.findLowestMarketPriceButton.setInteractionState(listRows.length > 0);
        remove(buttonContainer.findLowestMarketPriceButton);
    }

    const button = new UTStandardButtonControl();
    if (styles) {
        css(button, styles);
    }
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
                    
                    itemCell.__lowestMarketPrice.setValue(minPrice.value);
                    show(itemCell.__lowestMarketPrice);
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

        if (!sellValue) continue;

        itemCell.__lowestMarketPrice.setValue(sellValue.value);
        show(itemCell.__lowestMarketPrice);
        removeLoadingProgress(itemCell);
    }
}

function run() {
    if (!settings.enabled || !cfg.enabled) return;

    const UTItemTableCellView_generate = UTItemTableCellView.prototype._generate;
    UTItemTableCellView.prototype._generate = function _generate() {
        UTItemTableCellView_generate.call(this);

        if (!settings.enabled || !cfg.enabled) return;

        this.__lowestMarketPrice = this.addPrice(localize("market"), "lowest-market-price-container");
        hide(this.__lowestMarketPrice);

        on(EVENTS.APP_DISABLED, () => hide(this.__lowestMarketPrice));
        on(EVENTS.APP_ENABLED, () => show(this.__lowestMarketPrice));
    }

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

    const UTStoreRevealModalListView_setupFooter = UTStoreRevealModalListView.prototype.setupFooter;
    UTStoreRevealModalListView.prototype.setupFooter = function (...args) {
        UTStoreRevealModalListView_setupFooter.call(this, ...args);

        addLowestMarketPriceButton(this.listRows, this.__actionContainer);
        populateSellValue(this.listRows);
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


