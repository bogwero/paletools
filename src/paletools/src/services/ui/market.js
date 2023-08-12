import { addMarketSearchPreRender } from "../../core-overrides/UTMarketSearchResultsViewControllerOverrides";
import { EVENTS, triggerEvent } from "../../events";
import localize, { localizeNumber } from "../../localization";
import { notifySuccess } from "../../utils/notifications";
import { getUnassignedItems } from "../item";
import getDebugSettings from "../debug";
import { logDebug } from "../log";
import { tryBuyItem } from "../market";
import { navigateBack } from "./navigation";

const _snipeRequests = [];
const _goBackDelay = getDebugSettings().goBackDelay || 0;

export function addSnipeRequestNoBack(request = () => { }) {
    _snipeRequests.push([request, false]);
}

export function addSnipeRequest(request = () => { }) {
    _snipeRequests.push([request, true]);
    logDebug("Snipe requested");
}

export function clearSnipeRequests() {
    _snipeRequests.length = 0;
    logDebug("Snipe requests cleared");
}


const _goBackRequests = [];
export function enableMarketSnipe() {
    const UTNavigationController_showController = UTNavigationController.prototype._showController;
    UTNavigationController.prototype._showController = function (...args) {
        UTNavigationController_showController.call(this, ...args);

        if (_goBackRequests.length > 0) {
            const goBackRequest = _goBackRequests.shift();
            _goBackRequests.length = 0;
            goBackRequest();
            this._eBackButtonTapped();
        }
    }

    addMarketSearchPreRender((items, controller) => {

        if (_snipeRequests.length === 0) return true;
        logDebug(`Snipe Requests: ${_snipeRequests.length}`);

        let [request, shouldGoBack] = _snipeRequests.shift();
        clearSnipeRequests();

        function goBack() {
            if(!shouldGoBack) return;

            navigateBack(controller, _goBackDelay, () => {
                triggerEvent(EVENTS.SNIPE_GOBACK);
            });
        }

        if (items.length === 0) {
            request({ success: true, item: null });
            goBack();
        }
        else {
            let orderedItems = items.slice().sort((a, b) => {
                const auctionA = a._auction.buyNowPrice;
                const auctionB = b._auction.buyNowPrice;
                return auctionA - auctionB;
            });

            tryBuyItem(orderedItems).then(response => {
                if (response.success) {
                    request({ success: true, item: response.item });

                    // this refreshes the unassigned players at the home page
                    getUnassignedItems();

                    triggerEvent(EVENTS.SNIPE_SUCCESS, response.item);
                    notifySuccess(localize("market.itemBuy.success").replace("{coins}", localizeNumber(response.item._auction.buyNowPrice)));
                }
                else {
                    try {
                        request({ success: false, item: response.item });
                        triggerEvent(EVENTS.SNIPE_FAILED, response);
                    }
                    catch { }
                }
            }).catch(err => {
                try {
                    request({ success: false, item: response.item, error: err });
                    triggerEvent(EVENTS.SNIPE_FAILED, { response: response, err: err });
                }
                catch { }
            }).finally(() => {
                goBack();
            });
        }

        return !shouldGoBack;
    });
}