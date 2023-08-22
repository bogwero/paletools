import settings from "../settings";
import { notifyFailure } from "../utils/notifications";
import storage from "./storage";

const LOCKED_ITEMS_KEY = "lockedItems";

function save(items) {
    storage.set(LOCKED_ITEMS_KEY, items, true);
}

export function getLockedItems() {
    return settings.plugins.lockPlayers.enabled ? storage.get(LOCKED_ITEMS_KEY) || [] : [];
}

export function importLockedItems(csv) {
    try {
        const ids = getLockedItems();
        for(let id of csv.split(',')) {
            const definitionId = parseInt(id);
            if(isNaN(definitionId)) continue;

            if(ids.indexOf(definitionId) > -1) continue;

            ids.push(definitionId);
        }

        save(ids);
    }
    catch(ex) {
        notifyFailure(ex);
    }
}

export function lockItem(item) {
    if(!item || !item.definitionId) return;
    const id = item.definitionId;

    const items = getLockedItems();
    if(items.indexOf(id) === -1) {
        items.push(id);
        items.sort();
        save(items);
    }
}

export function unlockItem(item) {
    if(!item || !item.definitionId) return;
    const id = item.definitionId;

    const items = getLockedItems();
    const index = items.indexOf(id);
    if(index > -1) {
        items.splice(index, 1);
        save(items);
    }
}

export function isItemLocked(item) {
    if(!item || !item.definitionId) return;

    return getLockedItems().indexOf(item.definitionId) > -1; 
}