let plugin;

// #if process.env.GO_TO_PACK_STORE
import { addLabelWithToggle } from "../../controls";
import settings, { saveConfiguration } from "../../settings";
import getCurrentController from "../../utils/controller";

const cfg = settings.plugins.goToPackStore;

function run() {

    const UTTabBarController_eTabSelected = UTTabBarController.prototype._eTabSelected;
    UTTabBarController.prototype._eTabSelected = function(...args) {
        UTTabBarController_eTabSelected.call(this, ...args);

        if(!cfg.enabled || !settings.enabled) return;

        const controller = this._childViewControllers[args[2].index];
        if(!(controller.getRootController() instanceof UTStoreHubViewController)) return;
        
        const packController = new UTStorePackViewController();
        packController.init();
        controller.pushViewController(packController);
    }
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
        name: "goToPackStore",
        title: 'plugins.goToPackStore.settings.title',
        menu: menu
    }
};
// #endif

export default plugin;

