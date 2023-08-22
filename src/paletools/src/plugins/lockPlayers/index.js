

let plugin;

/// #if process.env.LOCK_PLAYERS
import { addLabelWithToggle } from "../../controls";
import { on } from "../../events";
import localize from "../../localization";
import { dateToString } from "../../services/date";
import { openDialog } from "../../services/dialog";
import { getUnassignedItems } from "../../services/item";
import { getLockedItems, importLockedItems, isItemLocked, lockItem, unlockItem } from "../../services/lockedItems";
import settings, { saveConfiguration } from "../../settings";
import getCurrentController from "../../utils/controller";
import { addClass, append, attr, createElem, css, remove, removeAttr, removeClass, select, selectAll } from "../../utils/dom";
import download from "../../utils/download";
import { notifyFailure } from "../../utils/notifications";
import { toPromise } from "../../utils/observable";
import { addStyle, removeStyle } from "../../utils/styles";
import { hide, show } from "../../utils/visibility";
import styles from "./styles.css";

const cfg = settings.plugins.lockPlayers;

function addLockPlayersButton(listRows, buttonContainer, styles) {

    if (buttonContainer.lockPlayers) {
        buttonContainer.lockPlayers.setInteractionState(listRows.length > 0);
        remove(buttonContainer.lockPlayers);
    }

    const button = new UTStandardButtonControl();
    if (styles) {
        css(button, styles);
    }
    addClass(button, "lock-players", "section-header-btn", "mini", "call-to-action");

    button.init();
    button.setInteractionState(false);
    button.setText(localize("plugins.lockPlayers.button.massLock"));
    button.setInteractionState(listRows.length > 0);

    button.addTarget(this, async () => {
        for (let itemCell of listRows) {
            if (!itemCell.data.isPlayer() || itemCell.data.loans > -1) continue;

            if (isItemLocked(itemCell.data)) {
                removeClass(itemCell.itemComponent, "locked");
                unlockItem(itemCell.data);
            }
            else {
                addClass(itemCell.itemComponent, "locked");
                lockItem(itemCell.data);
            }
        }
    }, EventType.TAP);

    append(buttonContainer, button);

    buttonContainer.lockPlayers = button;
}

function run() {

    const UTClubHubView_generate = UTClubHubView.prototype._generate;
    UTClubHubView.prototype._generate = function _generate(...args) {
        UTClubHubView_generate.call(this, ...args);
        removeStyle("locked-players");

        if (!settings.enabled || !cfg.enabled) return;

        const itemsCount = getLockedItems().length;

        if (!this._lockPlayersGenerated) {
            addStyle("locked-players", styles);
            this._lockedPlayersTile = new UTTileView();
            this._lockedPlayersTile.init();
            this._lockedPlayersTile.setTitle(localize("plugins.lockPlayers.clubHub.tile"));

            const label = new UTLabelView();
            label.setAngle(UTLabelView.Angle.TOP_LEFT);
            label.setLabel(localize(itemsCount === 1 ? "tile.label.itemCount" : "tile.label.itemsCount", [itemsCount]));
            this._lockedPlayersTile.setContent(label);
            this._lockedPlayersTile.addTarget(this, () => {
                const navController = getCurrentController().getNavigationController();
                if (!navController) return;

                const searchResultsController = isPhone() ? new UTClubSearchResultsViewController : new controllers.club.ClubSearchResultsLandscape;
                const searchCriteria = new UTSearchCriteriaDTO();
                searchCriteria.defId = getLockedItems();
                searchCriteria.type = SearchType.PLAYER;
                searchResultsController.initWithSearchCriteria(searchCriteria);
                navController.pushViewController(searchResultsController);
            }, EventType.TAP);

            this._exportLockedPlayersButton = new UTStandardButtonControl();
            this._exportLockedPlayersButton.init();
            this._exportLockedPlayersButton.addClass("call-to-action");
            this._exportLockedPlayersButton.setText(localize("export"));
            this._exportLockedPlayersButton.addTarget(this, () => {
                download(getLockedItems(), `locked-players_${dateToString(new Date())}.csv`, "text/plain");
            }, EventType.TAP);

            const fileElement = createElem("input", { type: "file", className: "import-locked-players" });

            this._importLockedPlayersButton = new UTStandardButtonControl();
            this._importLockedPlayersButton.init();
            this._importLockedPlayersButton.addClass("call-to-action");
            this._importLockedPlayersButton.setText(localize("import"));
            this._importLockedPlayersButton.addTarget(this, () => {

                openDialog(
                    [
                        { labelEnum: enums.UIDialogOptions.OK },
                        { labelEnum: enums.UIDialogOptions.CANCEL },
                    ],
                    localize("plugins.lockPlayers.import.dialogTitle"),
                    fileElement,
                    async (text) => {
                        if (text == enums.UIDialogOptions.OK) {
                            if(fileElement.files.length === 0) return;

                            const fileReader = new FileReader();
                            fileReader.onload = () => {
                                importLockedItems(fileReader.result);
                            };
                            fileReader.readAsText(fileElement.files[0]);
                        }
                        else {
                            fileElement.value = null;
                        }
                    });
            }, EventType.TAP);

            const commands = createElem("div", { className: "commands" });
            append(commands, this._importLockedPlayersButton, this._exportLockedPlayersButton);
            append(this._lockedPlayersTile, commands);
            addClass(this._lockedPlayersTile, "col-1-3-md", "col-1-2", "locked-players-tile");
            append(select(".grid", this), this._lockedPlayersTile);
            this._lockPlayersGenerated = true;
        }

        if (itemsCount === 0) {
            hide(this._exportLockedPlayersButton);
        }
        else {
            show(this._exportLockedPlayersButton);
        }

    }

    const UTSquadActionsView_generate = UTSquadActionsView.prototype._generate;
    UTSquadActionsView.prototype._generate = function _generate(...args) {
        UTSquadActionsView_generate.call(this, ...args);

        if (!settings.enabled || !cfg.enabled) return;

        this._lockPlayersBtn = new UTGroupButtonControl();
        this._lockPlayersBtn.init();
        this._lockPlayersBtn.setText(localize("plugins.lockPlayers.button.massLock"));
        this._lockPlayersBtn.addTarget(this, () => {
            for (let player of this._squad.getPlayers()) {
                const item = player.getItem();
                if (item.loans > -1) continue;

                if (isItemLocked(item)) {
                    removeClass(selectAll(`[data-definition-id="${item.definitionId}"]`), "locked");
                    unlockItem(player.getItem());
                }
                else {
                    addClass(selectAll(`[data-definition-id="${item.definitionId}"]`), "locked");
                    lockItem(item);
                }
            }

        }, EventType.TAP);

        append(select(".ut-button-group", this), this._lockPlayersBtn);
    }

    const UTSquadActionsView_destroyGeneratedElements = UTSquadActionsView.prototype.destroyGeneratedElements;
    UTSquadActionsView.prototype.destroyGeneratedElements = function destroyGeneratedElements(...args) {
        UTSquadActionsView_destroyGeneratedElements.call(this, ...args);
        if (!this._lockPlayersBtn) return;
        this._lockPlayersBtn.destroy()
    }

    const UTSquadActionsViewController_setSquad = UTSquadActionsViewController.prototype.setSquad;
    UTSquadActionsViewController.prototype.setSquad = function (...args) {
        UTSquadActionsViewController_setSquad.call(this, ...args);

        if (!settings.enabled || !cfg.enabled) return;

        this.getView()._squad = this._squad;
    }


    const UTSBCService_submitChallenge = UTSBCService.prototype.submitChallenge;
    UTSBCService.prototype.submitChallenge = function (...args) {
        if (settings.enabled && cfg.enabled) {
            const observable = new EAObservable();

            const challenge = args[0];

            function getFieldLockedPlayers() {
                return challenge.squad.getFieldPlayers().map(x => x.item).filter(x => isItemLocked(x));
            }

            const lockedPlayers = getFieldLockedPlayers();

            if (lockedPlayers.length === 0) {
                return UTSBCService_submitChallenge.call(this, ...args);
            }

            getUnassignedItems().then(async items => {
                for (let item of items) {
                    if (!item.isPlayer()) continue;

                    const index = lockedPlayers.findIndex(x => x.definitionId === item.definitionId);

                    if (index === -1) continue;

                    lockedPlayers.splice(index, 1);
                }

                if (lockedPlayers.length === 0) {
                    let html = localize("plugins.lockPlayers.duplicated.dialogText") + "<br /><br /><ul>";
                    for (let player of getFieldLockedPlayers()) {
                        html += `<li>${player.getStaticData().name}</li>`;
                    }
                    html += "</ul>";

                    openDialog(
                        [
                            { labelEnum: enums.UIDialogOptions.OK },
                            { labelEnum: enums.UIDialogOptions.CANCEL },
                        ],
                        localize("plugins.lockPlayers.duplicated.dialogTitle"),
                        html,
                        async (text) => {
                            if (text == enums.UIDialogOptions.OK) {
                                observable.notify(await toPromise(UTSBCService_submitChallenge.call(this, ...args)));
                            }
                        });
                }
                else {
                    var response = new UTServiceResponseDTO();
                    response.status = HttpStatusCode.BAD_REQUEST;
                    response.success = false;
                    observable.notify(response);
                    let html = localize("plugins.lockPlayers.messages.sbcWarning");
                    html += "<br /><br /><ul style=\"list-style-type:disc !important\">";
                    for (let player of lockedPlayers) {
                        html += `<li>${player.getStaticData().name}</li>`;
                    }
                    html += "</ul>";
                    notifyFailure(html)
                }
            });

            return observable;
        }
        else {
            return UTSBCService_submitChallenge.call(this, ...args);
        }
    }

    const UTPlayerItemView_resetRender = UTPlayerItemView.prototype.resetRender;
    UTPlayerItemView.prototype.resetRender = function (...args) {
        UTPlayerItemView_resetRender.call(this, ...args);

        if (settings.enabled && cfg.enabled) {
            removeAttr(this, "data-definition-id");
            removeClass(this, "locked");
        }
    }

    const UTPlayerItemView_renderItem = UTPlayerItemView.prototype.renderItem;
    UTPlayerItemView.prototype.renderItem = function (...args) {
        const player = args[0];
        const result = UTPlayerItemView_renderItem.call(this, ...args);
        if (settings.enabled && cfg.enabled && player.definitionId > 0) {
            attr(this, "data-definition-id", player.definitionId);

            if (isItemLocked(player)) {
                addClass(this, "locked");
            }
        }

        return result;
    };

    const UTClubSearchResultsView_setItems = UTClubSearchResultsView.prototype.setItems;
    UTClubSearchResultsView.prototype.setItems = function (...args) {
        UTClubSearchResultsView_setItems.call(this, ...args);

        if (!settings.enabled || !cfg.enabled || !this.header) return;

        addLockPlayersButton(this._list.listRows, this.header);
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
    order: 11,
    settings: {
        name: 'lock-players',
        title: 'plugins.lockPlayers.settings.title',
        menu: menu
    }
};
/// #endif

export default plugin;


