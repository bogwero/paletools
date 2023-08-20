let plugin;

/// #if process.env.DUPLICATED_TO_SBC
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import localize from "../../localization";
import { getUnassignedItems } from "../../services/item";
import { fillSbc } from "../../services/sbc";
import { navigateBack } from "../../services/ui/navigation";
import { getSbcChallengeFromController } from "../../services/ui/sbc";
import settings from "../../settings";
import getCurrentController from "../../utils/controller";
import { hide, show } from "../../utils/visibility";

const cfg = settings.plugins.duplicatedToSbc;

function run() {
    const UTSBCSquadDetailPanelView_generate = UTSBCSquadDetailPanelView.prototype._generate;
    UTSBCSquadDetailPanelView.prototype._generate = function _generate() {
        UTSBCSquadDetailPanelView_generate.call(this);
        if (!settings.enabled || !cfg.enabled) return;
        if (!this._duplicatedToSbcCalled) {
            this._useDuplicatedPlayersButton = new UTStandardButtonControl();
            this._useDuplicatedPlayersButton.getRootElement().classList.add("call-to-action");
            this._useDuplicatedPlayersButton.init();
            this._useDuplicatedPlayersButton.setText(localize('plugins.duplicatedToSbc.button.text'));
            this._useDuplicatedPlayersButton.addTarget(this, async () => {
                try {
                    await fillSbc(getSbcChallengeFromController(), await getUnassignedItems(), count => {
                        this._useDuplicatedPlayersButton.setInteractionState(false);
                        this._useDuplicatedPlayersButton.setText(localize('plugins.duplicatedToSbc.button.textLoading').replace("{count}", count));
                    });
                }
                finally {
                    this._useDuplicatedPlayersButton.setInteractionState(true);
                    this._useDuplicatedPlayersButton.setText(localize('plugins.duplicatedToSbc.button.text'));

                    if (isPhone()) {
                        navigateBack(getCurrentController());
                    }
                }
            }, EventType.TAP);
            this.__content.appendChild(this._useDuplicatedPlayersButton.getRootElement());
            this._duplicatedToSbcCalled = true;
        }
    }

    const UTSBCSquadDetailPanelView_destroyGeneratedElements = UTSBCSquadDetailPanelView.prototype.destroyGeneratedElements;
    UTSBCSquadDetailPanelView.prototype.destroyGeneratedElements = function destroyGeneratedElements() {
        UTSBCSquadDetailPanelView_destroyGeneratedElements.call(this);

        if (this._useDuplicatedPlayersButton) {
            this._useDuplicatedPlayersButton.destroy();
        }
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
    order: 3,
    settings: {
        name: 'duplicated-to-sbc',
        title: 'plugins.duplicatedToSbc.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;