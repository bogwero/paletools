let plugin;
/// #if process.env.COMPARE_MIN_MAX_PRICES
import settings, { saveConfiguration } from "../../settings";
import { addStyle } from "../../utils/styles";
import styles from "./styles.css";
import { addLabelWithToggle } from "../../controls";
import localize from "../../localization";
import { on } from "../../events";
import { addClass, append, createElem, insertBefore } from "../../utils/dom";
import { hide, show } from "../../utils/visibility";
import { setItemSellValue } from "../../services/market"

const cfg = settings.plugins.compareMinMaxPrices;

function run() {
    const playerSellValues = {};
    const UTMarketSearchView__generate = UTMarketSearchView.prototype._generate;
    UTMarketSearchView.prototype._generate = function _generate() {
        UTMarketSearchView__generate.call(this);
        if (!this._generateCompareMinMaxPrices) {
            if (settings.enabled && cfg.enabled) {
                this._minMaxPriceContainer = document.createElement("div");
                this._minPriceText = document.createElement("span");
                this._minPriceText.classList.add("min-price-value");
                this._maxPriceText = document.createElement("span");
                this._maxPriceText.classList.add("max-price-value");
                const minPriceContainer = document.createElement("span");
                minPriceContainer.classList.add("min-price");
                append(minPriceContainer,
                    createElem("span", { className: "min-price-label" }, localize("plugins.compareMinMaxPrices.minPriceLabel")),
                    this._minPriceText
                );

                const maxPriceContainer = document.createElement("span");
                maxPriceContainer.classList.add("max-price");
                append(maxPriceContainer,
                    createElem("span", { className: "max-price-label" }, localize("plugins.compareMinMaxPrices.maxPriceLabel")),
                    this._maxPriceText
                );

                addClass(this._minMaxPriceContainer, "min-max-prices", "paletools-element");
                hide(this._minMaxPriceContainer);
                append(this._minMaxPriceContainer, minPriceContainer, maxPriceContainer);
                insertBefore(this._minMaxPriceContainer, this._list.getRootElement());

                this._minBuyNowPrice = Number.MAX_VALUE;
                this._maxBuyNowPrice = 0;

                on("appEnabled", () => show(this._minMaxPriceContainer));
                on("appDisabled", () => hide(this._minMaxPriceContainer));
            }

            this._generateCompareMinMaxPrices = true;
        }
    }

    const UTMarketSearchResultsViewController_setPinnedItem = UTMarketSearchResultsViewController.prototype.setPinnedItem;
    UTMarketSearchResultsViewController.prototype.setPinnedItem = function setPinnedItem(e) {
        UTMarketSearchResultsViewController_setPinnedItem.call(this, e);
        this.getView()._hasCompareItem = !!e;
    }

    const UTMarketSearchView_setItems = UTMarketSearchView.prototype.setItems;
    UTMarketSearchView.prototype.setItems = function setItems(e, t) {
        if (settings.enabled && cfg.enabled) {
            if (this._hasCompareItem) {
                let definitionId = null;
                if (e.length > 0) {
                    for (let entity of e) {
                        if (entity._auction.buyNowPrice > this._maxBuyNowPrice) {
                            this._maxBuyNowPrice = entity._auction.buyNowPrice;
                        }

                        if (entity._auction.buyNowPrice < this._minBuyNowPrice) {
                            this._minBuyNowPrice = entity._auction.buyNowPrice;
                        }

                        definitionId ||= entity.definitionId;
                    }

                    this._minPriceText.textContent = this._minBuyNowPrice;
                    this._maxPriceText.textContent = this._maxBuyNowPrice;

                    setItemSellValue(definitionId, this._minBuyNowPrice);
                    
                    show(this._minMaxPriceContainer);
                }
                else {
                    hide(this._minMaxPriceContainer);
                }
            }
            else {
                hide(this._minMaxPriceContainer);
            }
        }

        UTMarketSearchView_setItems.call(this, e, t);
    }

    addStyle('paletools-compare-min-max-prices', styles);
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
    order: 1,
    settings: {
        name: 'compare-min-max-prices',
        title: 'plugins.compareMinMaxPrices.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;