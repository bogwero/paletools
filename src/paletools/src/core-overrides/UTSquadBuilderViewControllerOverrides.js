import { getLockedItems } from "../services/lockedItems";
import settings from "../settings";

export default function executeSquadBuilderViewControllerOverrides() {

const UTSquadBuilderViewController_onClubSearchComplete = UTSquadBuilderViewController.prototype.onClubSearchComplete;
    UTSquadBuilderViewController.prototype.onClubSearchComplete = function onClubSearchComplete(...args) {
        if (settings.plugins.playerActions.lockPlayer && this.challenge) {
            const lockedItems = getLockedItems();

            args[1].response.items = args[1].response.items.filter(x => { 
                if(!x.isPlayer()) return true;

                const index = lockedItems.indexOf(x.definitionId);
                if(index > -1) {
                    lockedItems.splice(index, 1);
                    return false;
                }

                return true
            });
        }

        UTSquadBuilderViewController_onClubSearchComplete.call(this, ...args);
    }
}