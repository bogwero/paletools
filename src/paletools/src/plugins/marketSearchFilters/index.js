let plugin;

// #if process.env.MARKET_SEARCH_FILTERS
import { addLabelWithToggle } from "../../controls";
import { addMarketSearchComplete, addMarketSearchFilter } from "../../core-overrides/UTMarketSearchResultsViewControllerOverrides";
import { EVENTS, on } from "../../events";
import localize from "../../localization";
import { isFastClubSearchEnabled } from "../../services/experimental";
import { findPlayersInClub, loadClubPlayers } from "../../services/ui/club";
import settings, { saveConfiguration } from "../../settings";
import getCurrentController from "../../utils/controller";
import { addClass, append, createElem, insertBefore, select } from "../../utils/dom";
import { notifySuccess } from "../../utils/notifications";
import { addStyle } from "../../utils/styles";
import { hide, show } from "../../utils/visibility";
import styles from "./styles.css";


const cfg = settings.plugins.marketSearchFilters;

function run() {
    if (settings.enabled && cfg.hideDuplicates) {
        loadClubPlayers();
    }

    addMarketSearchFilter((items, controller) => {
        if (!settings.enabled || !cfg.hideDuplicates) return items;

        return new Promise(async (resolve, reject) => {
            const foundPlayers = await findPlayersInClub(items, null, true);
            return resolve(items.filter(x => !foundPlayers[x.definitionId]));
        });
    });

    on(EVENTS.CONFIGURATION_SAVED, () => {
        if (!isFastClubSearchEnabled()) {
            loadClubPlayers();
        }
    });

    const UTTransfersHubViewController_requestTransferTargetData_ = UTTransfersHubViewController.prototype._requestTransferTargetData;

    UTTransfersHubViewController.prototype._requestTransferTargetData = function () {
        UTTransfersHubViewController_requestTransferTargetData_.call(this);
    };

    const UTMarketSearchFiltersView__generate = UTMarketSearchFiltersView.prototype._generate
    UTMarketSearchFiltersView.prototype._generate = function _generate() {
        function createContainer(child) {
            const container = document.createElement("div");
            container.classList.add("inline-list-select");
            container.classList.add("ut-player-search-control");
            const inlineContainer = document.createElement("div")
            inlineContainer.classList.add("inline-container");
            container.appendChild(inlineContainer);
            const inlineInlineContainer = document.createElement("div");
            inlineContainer.appendChild(inlineInlineContainer);
            inlineInlineContainer.classList.add("ut-player-search-control--input-container");
            inlineInlineContainer.appendChild(child);
            return container;
        }

        UTMarketSearchFiltersView__generate.call(this);

        if (!settings.enabled) return;

        if (!this._generateMarketSearchFilters) {
            const container = document.createElement("div");
            addClass(container, "ut-item-search-view", "paletools-element");

            if (cfg.savedFilters) {

                let filtersContainer = document.createElement("div");
                filtersContainer.classList.add("saved-filters");

                this._filterName = new UTTextInputControl();
                this._filterName.init();
                this._filterName.setPlaceholder(localize("plugins.marketSearchFilters.filter.name"));

                this._saveFilterButton = new UTStandardButtonControl();
                this._saveFilterButton.init();
                this._saveFilterButton.setText(localize("plugins.marketSearchFilters.filter.save"));
                this._saveFilterButton.addTarget(this, this.saveFilter, EventType.TAP);

                this._deleteFilterButton = new UTStandardButtonControl();
                this._deleteFilterButton.init();
                this._deleteFilterButton.setText(localize("plugins.marketSearchFilters.filter.delete"));
                this._deleteFilterButton.addTarget(this, this.deleteFilter, EventType.TAP);

                this._savedFilters = new UTDropDownControl();
                this._savedFilters.init();
                this._savedFilters.addTarget(this, this.onSavedFiltersChange, EventType.CHANGE);

                append(filtersContainer,
                    this._filterName.getRootElement(),
                    this._saveFilterButton.getRootElement(),
                    this._deleteFilterButton.getRootElement(),
                    this._savedFilters.getRootElement());

                container.appendChild(filtersContainer);

                this.loadSavedFilters();
            }

            if (cfg.playerId) {
                this._playerId = new UTTextInputControl();
                const playerIdContainer = createContainer(this._playerId.getRootElement());
                this._playerId.init();
                this._playerId.setPlaceholder(localize("plugins.marketSearchFilters.playerId"));
                this._playerId.setMaxLength(25);
                this._playerId.addTarget(this, this.handlePlayerIdChange, EventType.CHANGE);
                container.appendChild(playerIdContainer);
            }

            if (cfg.playerRating) {
                this._playerRating = new UTTextInputControl();
                const playerRatingContainer = createContainer(this._playerRating.getRootElement());
                this._playerRating.init();
                this._playerRating.setPlaceholder(localize("plugins.marketSearchFilters.playerRating"));
                this._playerRating.setMaxLength(3);
                this._playerRating.addTarget(this, this.handlePlayerRatingChange, EventType.CHANGE);

                container.appendChild(playerRatingContainer);
            }

            insertBefore(container, select(".ut-item-search-view", this.__root));

            this._marketSearchFilters = container;

            on("appEnabled", () => show(container));
            on("appDisabled", () => hide(container));

            this._generateMarketSearchFilters = true;
        }
    }

    const UTMarketSearchFiltersViewController_eSearchCategoryChanged = UTMarketSearchFiltersViewController.prototype._eSearchCategoryChanged;
    UTMarketSearchFiltersViewController.prototype._eSearchCategoryChanged = function _eSearchCategoryChanged(t, e, i) {
        UTMarketSearchFiltersViewController_eSearchCategoryChanged.call(this, t, e, i);

        if (i.id === enums.SearchBucket.PLAYER) {
            show(this.getView()._marketSearchFilters);
        }
        else {
            hide(this.getView()._marketSearchFilters)
        }
    }

    UTMarketSearchFiltersView.prototype.getStoredFilters = function () {
        const data = localStorage.getItem("paletools:searchFilters");
        if (!data) return {};
        return JSON.parse(atob(data)) || {};
    }

    UTMarketSearchFiltersView.prototype.saveFilters = function (filters) {
        localStorage.setItem("paletools:searchFilters", btoa(JSON.stringify(filters)));
    }

    UTMarketSearchFiltersView.prototype.loadSavedFilters = function () {
        const searchFilters = this.getStoredFilters();
        let filters = [{ label: localize("plugins.marketSearchFilters.loadFilters"), value: '' }];
        for (let filterKey of Object.keys(searchFilters).sort()) {
            filters.push({ label: searchFilters[filterKey].name, value: filterKey });
        }
        this._savedFilters.setOptions(filters);
    }

    UTMarketSearchFiltersView.prototype.saveFilter = function () {
        const controller = getCurrentController();
        if (controller instanceof UTMarketSearchFiltersViewController) {
            const searchCriteria = controller._viewmodel.searchCriteria;
            const name = this._filterName.getValue();
            const key = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filters = this.getStoredFilters();
            if (this._playerRating) {
                searchCriteria.rating = this._playerRating.getValue();
            }
            filters[key] = { name: name, criteria: searchCriteria };
            this.saveFilters(filters);
            this.loadSavedFilters();
            notifySuccess(localize("plugins.marketSearchFilters.filterSaved"));
        }
    }

    UTMarketSearchFiltersView.prototype.deleteFilter = function () {
        const controller = getCurrentController();
        if (controller instanceof UTMarketSearchFiltersViewController) {
            const filterKey = this._savedFilters.getValue();
            const filters = this.getStoredFilters();
            if (!filters[filterKey]) return;
            delete filters[filterKey];
            this.saveFilters(filters);
            this.loadSavedFilters();
            notifySuccess(localize("plugins.marketSearchFilters.filterDeleted"));
        }
    }

    UTMarketSearchFiltersView.prototype.loadFilter = function (filter) {
        const controller = getCurrentController();
        if (controller instanceof UTMarketSearchFiltersViewController) {
            if (filter.criteria.defId && filter.criteria.defId.length > 0 && this._playerId) {
                this._playerId.setValue(filter.criteria.defId[0]);
            }
            if (filter.criteria.rating && this._playerRating) {
                this._playerRating.setValue(filter.criteria.rating);
            }

            if (filter.criteria.maskedDefId) {
                let playerData = repositories.Item.getStaticDataByDefId(filter.criteria.maskedDefId);
                controller._viewmodel.playerData = playerData;
                //this._searchFilters.setPlayerSearch(playerData);
            }


            for (let key of Object.keys(filter.criteria)) {
                controller._viewmodel.searchCriteria[key] = filter.criteria[key];
            }

            this.setFilters(controller._viewmodel);
        }
    }

    const UTMarketSearchFiltersView_setFilters = UTMarketSearchFiltersView.prototype.setFilters;
    UTMarketSearchFiltersView.prototype.setFilters = function setFilters(e, t) {
        if (settings.enabled && cfg.playerId && this._playerId && e.searchCriteria.defId && e.searchCriteria.defId.length > 0) {
            this._playerId.setValue(e.searchCriteria.defId[0])
        }
        if (settings.enabled && cfg.playerRating && this._playerRating && e.searchCriteria.rating) {
            this._playerRating.setValue(e.searchCriteria.rating);
        }
        UTMarketSearchFiltersView_setFilters.call(this, e, t);
    }

    const UTMarketSearchFiltersView_destroyGeneratedElements = UTMarketSearchFiltersView.prototype.destroyGeneratedElements;
    UTMarketSearchFiltersView.prototype.destroyGeneratedElements = function destroyGeneratedElements() {
        UTMarketSearchFiltersView_destroyGeneratedElements.call(this);
        if (this._playerId) {
            this._playerId.destroy();
        }

        if (this._playerRating) {
            this._playerRating.destroy();
        }

        if (this._filterName) {
            this._filterName.destroy();
            this._saveFilterButton.destroy();
            this._deleteFilterButton.destroy();
            this._savedFilters.destroy();
        }
    }

    UTMarketSearchFiltersView.prototype.updateSearchCriteria = function () {
        if (this._playerId) {
            this.handlePlayerIdChange(null, null, this._playerId.getRootElement());
        }
        if (this._playerRating) {
            this.handlePlayerRatingChange(null, null, this._playerRating.getRootElement());
        }
    }

    UTMarketSearchFiltersView.prototype.handlePlayerIdChange = function (_, __, elem) {
        const controller = getCurrentController();
        if (controller instanceof UTMarketSearchFiltersViewController && elem.value && elem.value.length > 0) {
            controller._viewmodel.searchCriteria.defId = [elem.value];
        }
    }

    UTMarketSearchFiltersView.prototype.handlePlayerRatingChange = function (_, __, elem) {
        const controller = getCurrentController();
        if (controller instanceof UTMarketSearchFiltersViewController) {
            controller._viewmodel.searchCriteria.rating = elem.value;
        }
    }

    UTMarketSearchFiltersView.prototype.onSavedFiltersChange = function (_, __, elem) {
        const filters = this.getStoredFilters();
        if (filters[elem.value]) {
            this.loadFilter(filters[elem.value]);
        }
        else {
            const controller = getCurrentController();
            if (controller instanceof UTMarketSearchFiltersViewController) {
                controller._eResetSelected();
            }
        }
    }

    const UTMarketSearchFiltersViewController__eResetSelected = UTMarketSearchFiltersViewController.prototype._eResetSelected;
    UTMarketSearchFiltersViewController.prototype._eResetSelected = function _eResetSelected() {
        if (this.getView()._playerId) {
            this.getView()._playerId.clear();
            this._viewmodel.searchCriteria.defId = [];
        }
        if (this.getView()._playerRating) {
            this.getView()._playerRating.clear();
            this._viewmodel.searchCriteria.rating = null;
        }
        if (this.getView()._filterName) {
            this.getView()._filterName.clear();
        }

        UTMarketSearchFiltersViewController__eResetSelected.call(this);
    }

    addMarketSearchFilter(async (items, controller) => {
        if (cfg.playerRating) {
            items = items.filter(x => shouldRenderItem(x, controller._searchCriteria)); // added .filter;
        }

        return items;
    });

    // const UTItemTableCellView_render = UTItemTableCellView.prototype.render;
    // UTItemTableCellView.prototype.render = function (e) {
    //     UTItemTableCellView_render.call(this, e);
    //     if (settings.enabled && this.data.isPlayer() && cfg.playerId) {
    //         append(
    //             select(".ut-item-view--main", this.__entityContainer),
    //             createElem("span", { className: "player-definition-id" }, this.data.definitionId));
    //     }
    // }

    function shouldRenderItem(item, searchCriteria) {
        let rating = searchCriteria.rating;

        if (!settings.enabled || !rating || !cfg.playerRating) return true;

        if (rating.charAt(0) === "+") {
            rating = parseInt(rating.substr(1));
            return item.rating >= rating;
        }
        else if (rating.charAt(0) === "-") {
            rating = parseInt(rating.substr(1));
            return item.rating <= rating;
        }
        else {
            rating = parseInt(rating);
            return item.rating == rating;
        }
    }

    addStyle('paletools-marketsearch-filters', styles);
}

function menu() {
    var container = document.createElement("div");
    function add(id) {
        addLabelWithToggle(container, `plugins.marketSearchFilters.settings.${id}`, cfg[id], toggleState => {
            if (toggleState) {
                if (id === "playerId") {
                    if (confirm(localize("plugins.marketSearchFilters.playerIdWarning"))) {
                        cfg[id] = toggleState;
                        saveConfiguration();
                    }
                    else {
                        return false;
                    }
                } else {
                    cfg[id] = toggleState;
                    saveConfiguration();
                }
            }
            else {
                cfg[id] = toggleState;
                saveConfiguration();
            }
        });
    }

    add('savedFilters');
    add('playerId');
    add('playerRating');
    add('hideDuplicates');

    return container;
}

plugin = {
    run: run,
    order: 5,
    settings: {
        name: 'market-search-filters',
        title: 'plugins.marketSearchFilters.settings.title',
        menu: menu
    }
}
// #endif

export default plugin;