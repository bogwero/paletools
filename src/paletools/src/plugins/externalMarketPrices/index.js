
let plugin;

/// #if process.env.EXTERNAL_MARKET_PRICES
import { addLabelWithToggle } from "../../controls";
import { Price } from "../../controls/Price";
import { EVENTS, on } from "../../events";
import localize, { localizeNumber } from "../../localization";
import { getExternalMarketPrices } from "../../services/external/market";
import { isExternalRequestSupported } from "../../services/http";
import settings, { saveConfiguration } from "../../settings";
import { append, createElem } from "../../utils/dom";
import { addStyle, removeStyle } from "../../utils/styles";
import { hide, show } from "../../utils/visibility";
import styles from "./styles.css";
const cfg = settings.plugins.externalMarketPrices;

function run() {

    if (!isExternalRequestSupported()) return;

    function populateExternalMarketPrices(listRows) {
        getExternalMarketPrices(listRows.map(x => x.data)).then(prices => {
            for (let row of listRows) {
                const price = prices[row.data.definitionId];
                if (price) {
                    row.__externalPrice.setValue(price);
                    show(row.__externalPrice);
                }
            }
        });
    }

    const UTItemTableCellView_generate = UTItemTableCellView.prototype._generate;
    UTItemTableCellView.prototype._generate = function _generate() {
        UTItemTableCellView_generate.call(this);

        if (!settings.enabled || !cfg.enabled) return;

        this.__externalPrice = this.addPrice(settings.externalServices.prices.provider, "external-market-price");
        hide(this.__externalPrice);

        on(EVENTS.APP_DISABLED, () => hide(this.__externalPrice));
        on(EVENTS.APP_ENABLED, () => show(this.__externalPrice));
    }

    const UTPaginatedItemListView__renderItems = UTPaginatedItemListView.prototype._renderItems;
    UTPaginatedItemListView.prototype._renderItems = function (r) {
        UTPaginatedItemListView__renderItems.call(this, r);
        populateExternalMarketPrices(this.listRows);
    }

    const UTSectionedItemListView_render = UTSectionedItemListView.prototype.render;
    UTSectionedItemListView.prototype.render = function () {
        UTSectionedItemListView_render.call(this);
        populateExternalMarketPrices(this.listRows);
    }

    const UTStoreRevealModalListView_addItems = UTStoreRevealModalListView.prototype.addItems;
    UTStoreRevealModalListView.prototype.addItems = function(...args) {
        const returnValue = UTStoreRevealModalListView_addItems.call(this, ...args);
        populateExternalMarketPrices(this.listRows);
        return returnValue;
    }

    on(EVENTS.APP_ENABLED, () => addStyle("paletools-external-market-prices", styles));
    on(EVENTS.APP_DISABLED, () => removeStyle("paletools-external-market-prices"));
}

if (settings.enabled && cfg.enabled) {
    addStyle("paletools-external-market-prices", styles);
}

function menu() {
    const container = document.createElement("div");
    addLabelWithToggle(container, "enabled", cfg.enabled, toggleState => {
        cfg.enabled = toggleState;
        saveConfiguration();
    });
    return container;
}


plugin = {
    run: run,
    order: 10,
    settings: {
        name: 'external-market-prices',
        title: 'plugins.externalMarketPrices.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;