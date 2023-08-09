import getWindow from "./services/window";
import { getRealElement } from "./utils/dom";
import { isIterable } from "./utils/iterable";

export function off(target, eventName, callback, options) {
    if(typeof target === "string"){
        options = callback;
        callback = eventName;
        eventName = target;
        target = getWindow();
    }

    eventName = getEventName(eventName);

    if(eventName === "click" && isPhone()) {
        eventName = "pointerdown";
    }

    if(isIterable(getRealElement(target))){
        for(let t of getRealElement(target)){
            t.removeEventListener(eventName, callback, options);
        }
    }
    else {
        getRealElement(target).removeEventListener(eventName, callback, options);
    }
}

export function on(target, eventName, callback, options) {
    if(typeof target === "string"){
        options = callback;
        callback = eventName;
        eventName = target;
        target = getWindow();
    }

    eventName = getEventName(eventName);

    if(eventName === "click" && isPhone()) {
        eventName = "pointerdown";
    }

    if(isIterable(getRealElement(target))){
        for(let t of getRealElement(target)){
            t.addEventListener(eventName, callback, options);
        }
    }
    else {
        getRealElement(target).addEventListener(eventName, callback, options);
    }
}

export function triggerEvent(eventName, data) {
    eventName = getEventName(eventName);
    getWindow().dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail: data }));
}

export function listenToWebAppEvents(){
    getDefaultDispatcher().addObserver(AppNotification.UNASSIGNED_ITEM_ADDED, this, ...args => {
        triggerEvent(EVENTS.UNASSIGNED_ITEM_ADDED, args);
    });
}

function getEventName(eventName){
    if(Object.values(EVENTS).indexOf(eventName) > -1){
        return `paletools:${eventName}`;
    }
    else if(Object.values(MOBILE_EVENTS).indexOf(eventName) > -1) {
        return `paletools-mobile:${eventName}`;
    }

    return eventName;
}

export const EVENTS = {
    APP_ENABLED: "appEnabled",
    APP_DISABLED: "appDisabled",
    APP_STARTED: "appStarted",
    CONFIGURATION_SAVED: "configurationSaved",
    CONFIGURATION_LOADED: "configurationLoaded",
    APP_LOADED: "appLoaded",
    SNIPE_SUCCESS: "snipeSuccess",
    SNIPE_FAILED: "snipeFailed",
    SNIPE_GOBACK: "snipeGoBack",
    SNIPE_EXECUTE: "snipeExecute",
    REQUEST_OPEN: "requestOpen",
    REQUEST_SEND: "requestSend",
    REQUEST_FINISHED: "requestFinished",
    LOG: "logMessage",
    ITEM_WON: "itemWon",
    ITEMS_WON: "itemsWon",
    ITEMS_SOLD: "itemsSold",
    ITEM_MOVED: "itemMoved",
    ITEM_DISCARDED: "itemDiscarded",
    TRANSACTIONS_RELOADED: "transactionsReindex",
    REQUEST_UNASSIGNED: "requestUnassigned",
    UNASSIGNED_ITEM_ADDED: "unassignedItemAdded"
}

export const MOBILE_EVENTS = {
    BACK_BUTTON_PRESSED: "backButtonPressed"
}