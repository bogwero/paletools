let plugin;

/// #if process.env.REPEAT_SBC
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import localize from "../../localization";
import settings from "../../settings";
import { displayLoader, hideLoader } from "../../utils/loader";
import { hide, show } from "../../utils/visibility";

const cfg = settings.plugins.repeatSbc;

const searchCache = {};

function run() {

    const UTSBCSquadDetailPanelViewController_getView = UTSBCSquadDetailPanelViewController.prototype.getView;
    UTSBCSquadDetailPanelViewController.prototype.getView = function(...args) {
        if(!this.repeatSbcButtonHandled) {
            UTSBCSquadDetailPanelViewController_getView.call(this, ...args).getRepeatSbcButton().addTarget(this, this._eRepeatSbcSelected, EventType.TAP);
            this.repeatSbcButtonHandled = true;
        }

        return UTSBCSquadDetailPanelViewController_getView.call(this, ...args);
    }

    UTSBCSquadDetailPanelViewController.prototype._eRepeatSbcSelected = function(...args) {
        if(!searchCache[this._challenge.id]) return;

        displayLoader();
        const controller = new UTSquadBuilderViewController();
        this._challenge ? controller.initWithChallenge(this._challenge) : controller.init();
        this.getNavigationController().pushViewController(controller, !0);
        controller.viewModel = searchCache[this._challenge.id];
        controller.eBuildSelected(...args);
        hideLoader();
    }

    const UTSBCSquadDetailPanelView_generate = UTSBCSquadDetailPanelView.prototype._generate;
    UTSBCSquadDetailPanelView.prototype._generate = function _generate() {
        UTSBCSquadDetailPanelView_generate.call(this);
        if (!settings.enabled || !cfg.enabled) return;
        if (!this._repeatSbcCalled) {
            this._repeatSbcButton = new UTStandardButtonControl();
            this._repeatSbcButton.getRootElement().classList.add("call-to-action");
            this._repeatSbcButton.init();
            this._repeatSbcButton.setText(localize('plugins.repeatSbc.button.text'));
            
            this.__content.appendChild(this._repeatSbcButton.getRootElement());

            on(EVENTS.APP_ENABLED, () => show(this._repeatSbcButton));
            on(EVENTS.APP_DISABLED, () => hide(this._repeatSbcButton));

            this._repeatSbcCalled = true;
        }
    }

    UTSBCSquadDetailPanelView.prototype.getRepeatSbcButton = function() {
        return this._repeatSbcButton;
    }

    const UTSBCSquadDetailPanelView_destroyGeneratedElements = UTSBCSquadDetailPanelView.prototype.destroyGeneratedElements;
    UTSBCSquadDetailPanelView.prototype.destroyGeneratedElements = function destroyGeneratedElements() {
        UTSBCSquadDetailPanelView_destroyGeneratedElements.call(this);

        if (this._repeatSbcButton) {
            this._repeatSbcButton.destroy();
        }
    }

    const UTSquadBuilderViewController_onClubSearchComplete = UTSquadBuilderViewController.prototype.onClubSearchComplete;
    UTSquadBuilderViewController.prototype.onClubSearchComplete = function(...args) {
    
        UTSquadBuilderViewController_onClubSearchComplete.call(this, ...args);

        if(!this.challenge) return;
        
        searchCache[this.challenge.id] = this.viewModel;
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
    order: 128,
    settings: {
        name: 'repeat-sbc',
        title: 'plugins.repeatSbc.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;