let plugin;

// #if process.env.SBC_BUILDER_ENHACER
import { addLabelWithToggle } from "../../controls";
import TableLayout from "../../controls/TableLayout";
import UTLabelWithTextInputControl from "../../controls/UTLabelWithTextInputControl";
import { EVENTS, on } from "../../events";
import localize from "../../localization";
import { getAllClubPlayers, searchClub } from "../../services/club";
import { getImportantLeagueIds } from "../../services/league";
import { getLockedItems } from "../../services/lockedItems";
import storage from "../../services/storage";
import settings, { saveConfiguration } from "../../settings";
import { findControllerByType } from "../../utils/controller";
import { append } from "../../utils/dom";
import { addStyle, removeStyle } from "../../utils/styles";
import { hide, show } from "../../utils/visibility";
import styles from "./styles.css";


const cfg = settings.plugins.sbcBuilderEnhacer;

function addStyles() {
    addStyle('paletools-sbc-builder-enhacer', styles);
}

function removeStyles() {
    removeStyle('paletools-sbc-builder-enhacer');
}

function run() {

    const UTSquadBuilderView_generate = UTSquadBuilderView.prototype._generate;
    UTSquadBuilderView.prototype._generate = function _generate() {
        UTSquadBuilderView_generate.call(this);

        if (!cfg.enabled) return;

        if (!this._paletoolsGenerated) {
            this._ratingTitle = document.createElement("h4");
            this._ratingTitle.textContent = localize("plugins.sbcBuilderEnhacer.filter.ratings.title");
            this.__sortContainer.appendChild(this._ratingTitle);

            this._minRating = new UTLabelWithTextInputControl();
            this._minRating.init();
            this._minRating.setInputType("number");
            this._minRating.setLabel(localize("plugins.sbcBuilderEnhacer.filter.ratings.min.label"));

            this._maxRating = new UTLabelWithTextInputControl();
            this._maxRating.init();
            this._maxRating.setInputType("number");
            this._maxRating.setLabel(localize("plugins.sbcBuilderEnhacer.filter.ratings.max.label"));

            const ratingContainer = document.createElement("div");
            ratingContainer.classList.add("sbc-ratings-container");
            ratingContainer.appendChild(this._minRating.getRootElement());
            ratingContainer.appendChild(this._maxRating.getRootElement());

            this.__sortContainer.appendChild(ratingContainer);


            this._settingsTitle = document.createElement("h4");
            this._settingsTitle.textContent = localize("plugins.sbcBuilderEnhacer.filter.settings.title");
            this.__sortContainer.appendChild(this._settingsTitle);


            const searchOptionsLayout = new TableLayout(this.__sortContainer, { className: "sbc-settings" });
            this._maxPlayers = new UTLabelWithTextInputControl();
            this._maxPlayers.init();
            this._maxPlayers.setInputType("number");
            this._maxPlayers.setLabel(localize("plugins.sbcBuilderEnhacer.filter.settings.maxPlayers.label"));
            append(searchOptionsLayout.addRow().addColumn(), this._maxPlayers);
            this._playersFromSameClub = new UTLabelWithTextInputControl();
            this._playersFromSameClub.init();
            this._playersFromSameClub.setInputType("number");
            this._playersFromSameClub.setLabel(localize("plugins.sbcBuilderEnhacer.filter.settings.playersFromSameClub.label"));
            append(searchOptionsLayout.addRow().addColumn(), this._playersFromSameClub);
            this._searchToggles = new UTToggleControlGroupView();
            this._searchToggles.init();
            this._searchToggles.addToggleCell("ignore-positions", localize("plugins.sbcBuilderEnhacer.filter.search.ignorePlayersPos"));
            this._searchToggles.addToggleCell("important-leagues-only", localize("plugins.sbcBuilderEnhacer.filter.search.importantLeaguesOnly"))
            this._searchToggles.addToggleCell("unimportant-leagues-only", localize("plugins.sbcBuilderEnhacer.filter.search.unimportantLeaguesOnly"))
            this._searchToggles.layoutSubviews();
            append(searchOptionsLayout.addRow().addColumn(), this._searchToggles);

            append(this.__sortContainer, searchOptionsLayout);

            on(EVENTS.APP_ENABLED, () => { addStyles(); show(searchOptionsLayout); show(ratingContainer); });
            on(EVENTS.APP_DISABLED, () => { removeStyles(); hide(searchOptionsLayout); hide(ratingContainer); });

            addStyles();

            this._paletoolsGenerated = true;
        }
    }

    UTSquadBuilderView.prototype.onMinRatingChange = function (callback) {
        if (!this._minRating) return;
        if (!callback) return;
        this._minRating.onKeyDown(() => callback(this._minRating.value));
    }

    UTSquadBuilderView.prototype.onMaxRatingChange = function (callback) {
        if (!this._maxRating) return;
        if (!callback) return;
        this._maxRating.onKeyDown(() => callback(this._maxRating.value));
    }

    UTSquadBuilderView.prototype.onMaxPlayersChange = function (callback) {
        if (!this._maxPlayers) return;
        if (!callback) return;
        this._maxPlayers.onKeyDown(() => callback(this._maxPlayers.value));
    }

    UTSquadBuilderView.prototype.onPlayersFromSameClubChange = function (callback) {
        if (!this._playersFromSameClub) return;
        if (!callback) return;

        this._playersFromSameClub.onKeyDown(() => callback(this._playersFromSameClub.value));
    }

    UTSquadBuilderView.prototype.onMinRatingChange = function (callback) {
        if (!this._minRating) return;
        if (!callback) return;
        this._minRating.onKeyDown(() => callback(this._minRating.value));
    }

    UTSquadBuilderView.prototype.setMinRating = function (value) {
        if (!this._minRating) return;
        this._minRating.setInputValue(value);
    }

    UTSquadBuilderView.prototype.setMaxRating = function (value) {
        if (!this._maxRating) return;
        this._maxRating.setInputValue(value);
    }

    UTSquadBuilderView.prototype.setMaxPlayers = function (value) {
        if (!this._maxPlayers) return;
        this._maxPlayers.setInputValue(value);
    }

    UTSquadBuilderView.prototype.setPlayerFromSameClub = function (value) {
        if (!this._playersFromSameClub) return;
        this._playersFromSameClub.setInputValue(value);
    }

    UTSquadBuilderView.prototype.getMinRating = function () {
        if (!this._minRating) return;
        return parseInt(this._minRating.getInputValue()) || null;
    }

    UTSquadBuilderView.prototype.getMaxRating = function () {
        if (!this._maxRating) return;
        return parseInt(this._maxRating.getInputValue()) || null;
    }

    UTSquadBuilderView.prototype.getMaxPlayers = function () {
        if (!this._maxPlayers) return;
        return parseInt(this._maxPlayers.getInputValue()) || null;
    }

    UTSquadBuilderView.prototype.getPlayersFromSameClub = function () {
        if (!this._playersFromSameClub) return;
        return parseInt(this._playersFromSameClub.getInputValue()) || null;
    }

    UTSquadBuilderView.prototype.getSearchToggles = function () {
        return this._searchToggles;
    }

    UTSquadBuilderView.prototype.getSearchToggleState = function (toggleId) {
        return this._searchToggles.toggles.get(toggleId).getToggleState();
    }

    const UTSquadBuilderView_destroyGeneratedElements = UTSquadBuilderView.prototype.destroyGeneratedElements;
    UTSquadBuilderView.prototype.destroyGeneratedElements = function destroyGeneratedElements() {
        UTSquadBuilderView_destroyGeneratedElements.call(this);

        if (!cfg.enabled) return;

        this._searchToggles.destroy();
    }

    // const UTSBCSquadOverviewViewController_onChallengeSubmitted = UTSBCSquadOverviewViewController.prototype._onChallengeSubmitted;
    // UTSBCSquadOverviewViewController.prototype._onChallengeSubmitted = function _onChallengeSubmitted(...args) {
    //     UTSBCSquadOverviewViewController_onChallengeSubmitted.call(this, ...args);

    //     const navController = this.getNavigationController();
    //     if(navController) {
    //         navController.pushViewController(this);
    //     }
    // }

    const UTSquadBuilderViewController_init = UTSquadBuilderViewController.prototype.init;
    UTSquadBuilderViewController.prototype.init = function () {
        UTSquadBuilderViewController_init.call(this);

        if (!cfg.enabled) return;

        let storageKey;
        let searchSettings = {};
        if (this.challenge && this.challenge.id) {
            storageKey = `sbc:${this.challenge.id}:searchSettings`;
            searchSettings = storage.get(storageKey);
            if (searchSettings) {
                Object.assign(this.viewModel.searchCriteria, searchSettings.searchCriteria);

                this.getView().setMinRating(searchSettings.minRating || "");
                this.getView().setMaxRating(searchSettings.maxRating || "");
                this.getView().setMaxPlayers(searchSettings.maxPlayers || "");
                this.getView().setPlayerFromSameClub(searchSettings.playersFromSameClub || "");
                if (searchSettings.ignorePlayerPos) {
                    this.getView().getSearchToggles().toggleById('ignore-positions');
                }

                if (searchSettings.importantLeaguesOnly) {
                    this.getView().getSearchToggles().toggleById("important-leagues-only");
                }

                if (searchSettings.unimportantLeaguesOnly) {
                    this.getView().getSearchToggles().toggleById("unimportant-leagues-only");
                }

                if (searchSettings.filterBy) {
                    if (searchSettings.filterBy[enums.UISortOptionType.CONCEPT]) {
                        this.getView().getSortOptions().toggleById(enums.UISortOptionType.CONCEPT);
                    }
                    if (searchSettings.filterBy[enums.UISortOptionType.UNTRADEABLE]) {
                        this.getView().getSortOptions().toggleById(enums.UISortOptionType.UNTRADEABLE);
                    }
                    if (searchSettings.filterBy[enums.UISortOptionType.EXCLUDE_SQUAD]) {
                        this.getView().getSortOptions().toggleById(enums.UISortOptionType.EXCLUDE_SQUAD);
                    }
                    if (searchSettings.filterBy[enums.UISortOptionType.REPLACE]) {
                        this.getView().getSortOptions().toggleById(enums.UISortOptionType.REPLACE);
                    }
                }

                if (searchSettings.sortBy) {
                    this.getView().getSortDropDown().setIndexById(searchSettings.sortBy);
                }
            }
            else {
                searchSettings = {};
            }
        }

        this.viewModel.searchSettings = searchSettings;

        const storeSettings = () => {
            if (storageKey) {
                storage.set(storageKey, searchSettings);
            }
            this.viewModel.searchSettings = searchSettings;
        }

        this.getView()._minRating.addTarget(this, () => {
            searchSettings.minRating = this.getView().getMinRating();
            storeSettings();
        }, EventType.CHANGE);

        this.getView()._maxRating.addTarget(this, () => {
            searchSettings.maxRating = this.getView().getMaxRating();
            storeSettings();
        }, EventType.CHANGE);

        this.getView()._maxPlayers.addTarget(this, () => {
            searchSettings.maxPlayers = this.getView().getMaxPlayers();
            storeSettings();
        }, EventType.CHANGE);

        this.getView()._playersFromSameClub.addTarget(this, () => {
            searchSettings.playersFromSameClub = this.getView().getPlayersFromSameClub();
            storeSettings();
        });

        this.getView()._searchToggles.addTarget(this, (_, __, opt) => {
            if (opt.id === "ignore-positions") {
                searchSettings.ignorePlayerPos = opt.checked;
            }
            else if (opt.id === "imporant-leagues-only") {
                searchSettings.importantLeaguesOnly = opt.checked;
            }
            else if (opt.id == "unimportant-leagues-only") {
                searchSettings.unimportantLeaguesOnly = opt.checked;
            }
            storeSettings();
        }, EventType.CHANGE);

        this.getView().getSortOptions().addTarget(this, (_, __, opt) => {
            if (!searchSettings.filterBy) {
                searchSettings.filterBy = {};
            }

            searchSettings.filterBy[opt.id] = opt.checked;
            storeSettings();
        }, EventType.CHANGE);

        this.getView().getSortDropDown().addTarget(this, (t) => {
            searchSettings.sortBy = t.id;
            storeSettings();
        }, EventType.CHANGE);
    }

    UTSquadBuilderViewController.prototype.updateCustomSearchSettings = function () {
        this.viewModel.searchSettings = this.viewModel.searchSettings || {};
        this.viewModel.searchSettings.minRating = this.getView().getMinRating();
        this.viewModel.searchSettings.maxRating = this.getView().getMaxRating();
        this.viewModel.searchSettings.maxPlayers = this.getView().getMaxPlayers();
        this.viewModel.searchSettings.playersFromSameClub = this.getView().getPlayersFromSameClub();
        this.viewModel.searchSettings.importantLeaguesOnly = this.getView().getSearchToggleState("important-leagues-only");
        this.viewModel.searchSettings.unimportantLeaguesOnly = this.getView().getSearchToggleState("unimportant-leagues-only");
    }

    UTSquadBuilderViewController.prototype.getPlayersByClub = function () {
        const playersByClub = {};

        for (let slot of this.squad.getPlayers()) {
            const player = slot.getItem();
            if (!playersByClub[player.teamId]) {
                playersByClub[player.teamId] = 1;
            }
            else {
                playersByClub[player.teamId]++;
            }
        }

        return playersByClub;
    }

    UTSquadBuilderViewController.prototype.saveSbcSettings = function () {
        if (this.challenge && this.challenge.id) {
            const storageKey = `sbc:${this.challenge.id}:searchSettings`;
            let searchSettings = storage.get(storageKey) || {};
            Object.assign(searchSettings, {
                ...this.viewModel.searchSettings,
                searchCriteria: this.viewModel.searchCriteria
            });
            storage.set(storageKey, searchSettings);
        }
    }

    UTSquadBuilderViewController.prototype.filterAndSortPlayers = function (players, importantLeagueIds, playersByClub) {
        const lockedItems = getLockedItems();

        players = players.filter(x => {
            if (settings.plugins.lockPlayers.enabled && lockedItems.indexOf(x.definitionId) > -1) return false;
            if (this.viewModel.searchSettings.minRating && x.rating < this.viewModel.searchSettings.minRating) return false;
            if (this.viewModel.searchSettings.maxRating && x.rating > this.viewModel.searchSettings.maxRating) return false;
            if (this.viewModel.searchSettings.importantLeaguesOnly && importantLeagueIds.length > 0 && importantLeagueIds.indexOf(x.leagueId) === -1) return false;
            if (this.viewModel.searchSettings.unimportantLeaguesOnly && importantLeagueIds.length > 0 && importantLeagueIds.indexOf(x.leagueId) > -1) return false;
            if (x.isLoaned()) return false;
            if (UTItemEntity.isStoryMode(x.id)) return false;
            if (this.viewModel.searchSettings.playersFromSameClub) {
                if (!playersByClub[x.teamId]) {
                    playersByClub[x.teamId] = 1;
                }
                else {
                    playersByClub[x.teamId]++;
                }

                if (playersByClub[x.teamId] > this.viewModel.searchSettings.playersFromSameClub) {
                    return false;
                }
            }

            return true;
        });

        switch (this.viewModel.searchCriteria.sortBy) {
            case SearchSortType.RATING:
                players.sort((a, b) => {
                    if (this.viewModel.searchCriteria.sort === "asc") {
                        return a.rating - b.rating;
                    } else {
                        return b.rating - a.rating;
                    }
                });
                break;
            case SearchSortType.RECENCY:
                players.sort((a, b) => {
                    if (this.viewModel.searchCriteria.sort === "asc") {
                        return a.timestamp - b.timestamp;
                    }
                    else {
                        return b.timestamp - a.timestamp;
                    }
                });
                break;
            case SearchSortType.VALUE:
                players.sort((a, b) => {
                    if (this.viewModel.searchCriteria.sort === "asc") {
                        return a.discardValue - b.discardValue;
                    }
                    else {
                        return b.discardValue - a.discardValue;
                    }
                });
                break;
        }

        if (this.viewModel.searchSettings.maxPlayers && players.length > this.viewModel.searchSettings.maxPlayers) {
            players = players.slice(0, this.viewModel.searchSettings.maxPlayers);
        }

        return players;
    }

    const UTSquadBuilderViewController_eBuildSelected = UTSquadBuilderViewController.prototype.eBuildSelected;
    UTSquadBuilderViewController.prototype.eBuildSelected = function (...args) {
        if (!cfg.enabled || !settings.enabled || this.useConceptPlayers) {
            UTSquadBuilderViewController_eBuildSelected.call(this, ...args);
            return;
        }

        const requiredPlayersCount = this.squad.getSBCSlots().length;
        let foundPlayers = [];

        let playersByClub = this.getPlayersByClub();
        this.updateCustomSearchSettings();
        const importantLeagueIds = getImportantLeagueIds();
        this.formation = this.getView().getFormationFilter().value;

        this.viewModel.searchCriteria.offset = 0;

        searchClub(true, null, (currentCount, players) => {
            if (foundPlayers.length >= requiredPlayersCount) {
                return false;
            }

            for (let player of this.filterAndSortPlayers(players, importantLeagueIds, playersByClub)) {
                foundPlayers.push(player);
            }

            if (foundPlayers.length >= requiredPlayersCount) {
                foundPlayers = foundPlayers.slice(0, requiredPlayersCount);
                return false;
            }

            return true;
        }, this.viewModel.searchCriteria).then(players => {
            this.saveSbcSettings();

            if (foundPlayers.length < requiredPlayersCount) {
                foundPlayers = [];
                playersByClub = this.getPlayersByClub();
                for (let player of this.filterAndSortPlayers(players, importantLeagueIds, playersByClub)) {
                    foundPlayers.push(player);
                    if(foundPlayers.length >= requiredPlayersCount) break;
                }
            }

            if (foundPlayers.length === 0) {
                utils.PopupManager.showAlert(utils.PopupManager.Alerts.SQUAD_BUILDER_NO_RESULTS);
                return;
            }

            this.onClubSearchComplete({
                unobserve: () => { },
            }, {
                success: true,
                response: {
                    items: foundPlayers
                }
            });
        });
    }

    const UTSquadBuilderViewModel_generatePlayerCollection = UTSquadBuilderViewModel.prototype.generatePlayerCollection;
    UTSquadBuilderViewModel.prototype.generatePlayerCollection = function (t, o, n) {
        if (!cfg.enabled) {
            return UTSquadBuilderViewModel_generatePlayerCollection.call(this, t, o, n);
        }

        const controller = findControllerByType(UTSquadBuilderViewController);
        const searchSettings = controller && controller.viewModel.searchSettings || {};
        if (!searchSettings.ignorePlayerPos) {
            return UTSquadBuilderViewModel_generatePlayerCollection.call(this, t, o, n);
        }

        let playerIndex = 0;
        return t.map(function (t, e) {
            var i = n ? n.getSlot(e) : null;
            return i && (i.isValid() || i.isBrick()) ? i.getItem() : o[playerIndex++];
        });
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
    order: 6,
    menu: menu,
    settings: {
        name: 'sbc-builder-enhacer',
        title: 'plugins.sbcBuilderEnhacer.settings.title',
        menu: menu
    }
}
// #endif

export default plugin;
