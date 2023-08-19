import localize from "../../localization";
import { isItemLocked, lockItem, unlockItem } from "../../services/lockedItems";
import settings from "../../settings";
import { addClass, append, removeClass, selectAll } from "../../utils/dom";

const cfg = settings.plugins.lockPlayers;

const lockPlayerAction = {
    canRun: (instance) => {
        return instance === UTDefaultActionPanelView || instance === UTSlotActionPanelView;
    },

    inject: proto => {

        function setup(instance, item) {
            if(!cfg.enabled || !settings.enabled) return;

            if (item.isPlayer() && item.loans === -1 && item.definitionId > 0) {
                instance._player = item;
                instance._lockPlayerButton.setText(
                    isItemLocked(item)
                        ? localize("plugins.lockPlayers.playerAction.unlock")
                        : localize("plugins.lockPlayers.playerAction.lock"));
                instance._lockPlayerButton.setDisplay(true);
            }
            else {
                instance._lockPlayerButton.setDisplay(false);
            }
        }

        if (proto.render) {
            const oldRender = proto.render;
            proto.render = function (...args) {
                oldRender.call(this, ...args);
                setup(this, args[0]);
            }
        }

        if (proto.setItem) {
            const oldSetItem = proto.setItem;
            proto.setItem = function (...args) {
                oldSetItem.call(this, ...args);
                setup(this, args[0])
            }
        }
    },

    generate: (instance, buttonsContainerFunc) => {
        instance._lockPlayerButton = new UTGroupButtonControl();
        instance._lockPlayerButton.init();
        instance._lockPlayerButton.addTarget(instance, () => {
            const item = instance._player;

            const nodes = selectAll(`[data-definition-id="${item.definitionId}"]`);

            if (isItemLocked(item)) {
                unlockItem(item);
                instance._lockPlayerButton.setText(localize("plugins.lockPlayers.playerAction.lock"));
                removeClass(nodes, "locked");
            }
            else {
                lockItem(item);
                instance._lockPlayerButton.setText(localize("plugins.lockPlayers.playerAction.unlock"));
                addClass(nodes, "locked");
            }
        }, EventType.TAP);
        instance._lockPlayerButton.setDisplay(false);
        append(buttonsContainerFunc(instance), instance._lockPlayerButton.getRootElement());
    },
    destroyGeneratedElements: (instance) => {
        if (instance._lockPlayerButton) {
            instance._lockPlayerButton.destroy();
        }
    }
}

export default lockPlayerAction;