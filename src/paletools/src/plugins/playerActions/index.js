let plugin;

// #if process.env.PLAYER_ACTIONS
import copyPlayerIdAction from "./copyPlayerIdAction";
import futbinSearchAction from "./futbinSearchAction";
import findLowestPriceAction from "./findLowestPrice";
import { addLabelWithToggle } from "../../controls";
import settings, { saveConfiguration } from "../../settings";
import listForProfitAction from "./listForProfitAction";
import styles from "./styles.css";
import { addStyle } from "../../utils/styles";
import alwaysDisplayApplyConsumableAction from "./alwaysDisplayApplyConsumableAction";
import lockPlayer from "./lockPlayerAction";

const cfg = settings.plugins.playerActions;

let actions = [copyPlayerIdAction, futbinSearchAction, findLowestPriceAction, listForProfitAction, alwaysDisplayApplyConsumableAction, lockPlayer];

function forEachAction(canRun, execute) {
    for(const action of actions){
        if(canRun(action)){
            execute(action);
        }
    }
}

function run() {
    function addActionsToActionPanel(className, buttonsContainerFunc) {
        const generate = className.prototype._generate;

        forEachAction(action => action.canRun(className) && action.inject, action => action.inject(className.prototype));

        className.prototype._generate = function _generate() {
            generate.call(this);
            if (!settings.enabled) return;
            if (!this._generateAddActionsToPanelCalled) {
                forEachAction(action => action.canRun(className) && action.generate, action => action.generate(this, buttonsContainerFunc));
                this._generateAddActionsToPanelCalled = true;
            }
        }

        const _destroyGeneratedElements = className.prototype.destroyGeneratedElements;
        className.prototype.destroyGeneratedElements = function destroyGeneratedElements() {
            _destroyGeneratedElements.call(this);
            forEachAction(action => action.canRun(className) && action.destroyGeneratedElements, action => action.destroyGeneratedElements(this));
        }

        const dealloc = className.prototype.dealloc;
        className.prototype.dealloc = function () {
            dealloc.call(this);
            forEachAction(action => action.canRun(className) && action.dealloc, action => action.dealloc(this));
        }
    }

    addActionsToActionPanel(UTDefaultActionPanelView, instance => instance.__itemActions);
    addActionsToActionPanel(UTAuctionActionPanelView, instance => instance.getRootElement().querySelector(".ut-button-group"));
    addActionsToActionPanel(UTQuickListPanelView, instance => instance.__panelActions);
    addActionsToActionPanel(UTSlotActionPanelView, instance => instance.__itemActions);

    const ItemDetails__getPanelViewInstanceFromData = controllers.items.ItemDetails.prototype._getPanelViewInstanceFromData;
    controllers.items.ItemDetails.prototype._getPanelViewInstanceFromData = function _getPanelViewInstanceFromData(e, t) {
        ItemDetails__getPanelViewInstanceFromData.call(this, e, t);
        if (this._panel instanceof UTDefaultActionPanelView
            || this._panel instanceof UTAuctionActionPanelView
            || this._panel instanceof UTSlotActionPanelView) {
            forEachAction(action => action.attachEvent, action => action.attachEvent(this));
        }
    }

    forEachAction(action => action.createEvent, action => action.createEvent(controllers.items.ItemDetails.prototype));

    addStyle("player-actions", styles);
}

function menu() {
    var container = document.createElement("div");
    function add(id) {
        addLabelWithToggle(container, `plugins.playerActions.settings.${id}`, cfg[id], toggleState => {
            cfg[id] = toggleState;
            saveConfiguration();
        });
    }

    add('copyPlayerId');
    add('futbinSearch');
    add('findLowestPrice');
    add('listForProfit');
    add('listForProfitAutoPublish');
    add('displayApplyConsumable');

    return container;
}

plugin = {
    run: run,
    order: 6,
    settings: {
        name: 'player-actions',
        title: 'plugins.playerActions.settings.title',
        menu: menu
    }
}
// #endif

export default plugin;