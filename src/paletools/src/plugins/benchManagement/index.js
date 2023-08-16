let plugin;

/// #if process.env.BENCH_MANAGEMENT
import { addLabelWithToggle } from "../../controls";
import localize from "../../localization";
import settings from "../../settings";
import { flattenArray } from "../../utils/array";
import { addClass, append, createElem, css } from "../../utils/dom";

const cfg = settings.plugins.benchManagement;

function run() {
    function save(controller, refreshChemistry) {
        const squad = controller._challenge ? controller._challenge.squad : controller._squad;
        if(controller._challenge) {
            services.SBC.saveChallenge(controller._challenge);
        }
        else {
            squad.save();
        }
        if(refreshChemistry) {
            controller.getView().updatePitchChemistry(squad.getFieldPlayers());
        }
    }

    function sendPlayersToClub(controller, players) {
        const squad = controller._challenge ? controller._challenge.squad : controller._squad;
        if(!squad) return;
        players = players(squad).filter(x => x.getItem().definitionId > 0);

        if (players.length === 0) return;

        for (let player of players) {
            squad.removeItemFromSlot(player.index);
        }

        save(controller);
    }

    function swapPlayers(controller, from, to, keepPositions) {
        const squad = controller._challenge ? controller._challenge.squad : controller._squad;
        if (!squad) return;

        to = to(squad).filter(x => {
            const req = x.getRequirement();
            if(!req) return true;
            return req.playerType === SBCPlayerRequirementType.DEFAULT;
        });
        from = from(squad).slice().filter(x => x.getItem().definitionId > 0).slice(0, to.length);

        if (from.length === 0) return;

        if (!keepPositions) {
            for (let index = 0; index < from.length; index++) {
                squad.swapPlayersByIndex(from[index].index, to[index].index);
            }
            save(controller, true);
            return;
        }

        const toPositions = {};

        for (let slot of to) {
            if (!toPositions[slot.position.typeId]) {
                toPositions[slot.position.typeId] = [];
            }
            toPositions[slot.position.typeId].push(slot.index);
        }

        const altPosPlayers = [];
        const noPosPlayers = [];

        // Try putting player in preferred position
        for (let player of from) {
            const pos = player.getItem().preferredPosition;
            if (toPositions[pos] && toPositions[pos].length > 0) {
                squad.swapPlayersByIndex(player.index, toPositions[pos].shift());
            }
            else {
                altPosPlayers.push(player);
            }
        }

        // Try putting player in alternative position
        for (let player of altPosPlayers) {
            let posIndex = 0;
            for (; posIndex < player.getItem().possiblePositions.length; posIndex++) {
                let pos = player.getItem().possiblePositions[posIndex];
                if (toPositions[pos] && toPositions[pos].length > 0) {
                    squad.swapPlayersByIndex(player.index, toPositions[pos].shift());
                    break;
                }
            }

            if (posIndex >= player.getItem().possiblePositions.length) {
                noPosPlayers.push(player);
            }
        }

        // Put pending players in new positions
        const pendingIndices = flattenArray(Object.values(toPositions));
        for (let player of noPosPlayers) {
            if(pendingIndices.length === 0) break;

            squad.swapPlayersByIndex(player.index, pendingIndices.shift());
        }

        if(controller._challenge) {
            services.SBC.saveChallenge(controller._challenge);
        }
        else {
            squad.save();
        }
        save(controller, true);
    }

    const UTSquadOverviewViewController_viewDidAppear = UTSquadOverviewViewController.prototype.viewDidAppear;
    UTSquadOverviewViewController.prototype.viewDidAppear = function (...args) {
        UTSquadOverviewViewController_viewDidAppear.call(this, ...args);

        const view = this.getView();

        view.leftDock.onSendToFieldClick.observe(this, () => {
            swapPlayers(this, squad => this._challenge ? squad.getSubAndReservePlayers() : squad.getSubPlayers(), squad => squad.getFieldPlayers());
        });

        view.leftDock.onSendToFieldKeepPos.observe(this, () => {
            swapPlayers(this, squad => this._challenge ? squad.getSubAndReservePlayers() : squad.getSubPlayers(), squad => squad.getFieldPlayers(), true);
        });

        view.leftDock.onSendToClubClick.observe(this, () => {
            sendPlayersToClub(this, squad => this._challenge ? squad.getSubAndReservePlayers() : squad.getSubPlayers());
        });

        if (view.rightDock) {
            view.rightDock.onSendToFieldClick.observe(this, () => {
                swapPlayers(this, squad => squad.getReservePlayers(), squad => squad.getFieldPlayers().slice().reverse());
            });

            view.rightDock.onSendToFieldKeepPos.observe(this, () => {
                swapPlayers(this, squad => squad.getReservePlayers(), squad => squad.getFieldPlayers(), true);
            });

            view.rightDock.onSendToClubClick.observe(this, () => {
                sendPlayersToClub(this, squad => squad.getReservePlayers());
            });
        }
    }

    const UTSquadSlotDockView_generate = UTSquadSlotDockView.prototype._generate;
    UTSquadSlotDockView.prototype._generate = function _generate(...args) {
        UTSquadSlotDockView_generate.call(this, ...args);
        if (!settings.enabled || !cfg.enabled) return;

        if (!this._paletoolsGenerated) {
            this.onSendToFieldClick = new EAObservable();
            this.onSendToClubClick = new EAObservable();
            this.onSendToFieldKeepPos = new EAObservable();

            const sendToFieldButton = new UTStandardButtonControl();
            sendToFieldButton.init();
            sendToFieldButton.setText(localize("plugins.benchManagement.buttons.sendToField"));
            addClass(sendToFieldButton, "call-to-action", "mini");
            sendToFieldButton.addTarget(this, () => {
                this.onSendToFieldClick.notify();
            }, EventType.TAP);

            const sendToFieldKeepPosButton = new UTStandardButtonControl();
            sendToFieldKeepPosButton.init();
            sendToFieldKeepPosButton.setText(localize("plugins.benchManagement.buttons.sendToFieldKeepPos"));
            addClass(sendToFieldKeepPosButton, "call-to-action", "mini");
            sendToFieldKeepPosButton.addTarget(this, () => {
                this.onSendToFieldKeepPos.notify();
            }, EventType.TAP);

            const sendToClubButton = new UTStandardButtonControl();
            sendToClubButton.init();
            sendToClubButton.setText(localize("plugins.benchManagement.buttons.sendToClub"));
            addClass(sendToClubButton, "call-to-action", "mini");
            sendToClubButton.addTarget(this, () => {
                this.onSendToClubClick.notify();
            }, EventType.TAP);

            const container = createElem("div");

            css(container, {
                display: "flex",
                gap: "10px",
                justifyContent: "center"
            });

            append(container, sendToFieldButton, sendToFieldKeepPosButton, sendToClubButton);

            append(this.__content, container);

            this._paletoolsGenerated = true;
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
        name: 'bench-management',
        title: 'plugins.benchManagement.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;