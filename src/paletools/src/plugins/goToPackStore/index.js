let plugin;

// #if process.env.GO_TO_PACK_STORE
import { addLabelWithToggle } from "../../controls";
import settings, { saveConfiguration } from "../../settings";

const cfg = settings.plugins.goToPackStore;

function run() {

    const UTGoToLinkController_attemptNavigation = UTGoToLinkController.prototype.attemptNavigation;
    UTGoToLinkController.prototype.attemptNavigation = function attemptNavigation(e) {
        if (settings.enabled && cfg.enabled && e == RedirectId.STORE) {
            this._goToPackStore();
            return;
        }

        UTGoToLinkController_attemptNavigation.call(this, e);
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

