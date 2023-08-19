let plugin;

// #if process.env.CLUB_SEARCH_ENHACER
import styles from "./styles.css";
import UTLabelWithTextInputControl from "../../controls/UTLabelWithTextInputControl";
import localize from "../../localization";
import settings, { saveConfiguration } from "../../settings";
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import { hide, show } from "../../utils/visibility";
import { addStyle, removeStyle } from "../../utils/styles";


const cfg = settings.plugins.clubSearchEnhacer;

function addStyles() {
    addStyle('paletools-club-search-enhacer', styles);
}

function removeStyles() {
    removeStyle('paletools-club-search-enhacer');
}

function run() {

    const UTClubSearchFiltersView_generate = UTClubSearchFiltersView.prototype._generate;
    UTClubSearchFiltersView.prototype._generate = function _generate() {
        UTClubSearchFiltersView_generate.call(this);

        if (!cfg.enabled) return;

        if (!this._paletoolsGenerated) {
            this._ratingTitle = document.createElement("h4");
            this._ratingTitle.textContent = localize("plugins.sbcBuilderEnhacer.filter.ratings.title");
            this.__sortContainer.appendChild(this._ratingTitle);

            this._minRating = new UTLabelWithTextInputControl();
            this._minRating.init();
            this._minRating.setLabel(localize("plugins.sbcBuilderEnhacer.filter.ratings.min.label"));

            this._maxRating = new UTLabelWithTextInputControl();
            this._maxRating.init();
            this._maxRating.setLabel(localize("plugins.sbcBuilderEnhacer.filter.ratings.max.label"));



            const ratingContainer = document.createElement("div");
            ratingContainer.classList.add("club-search-ratings-container");
            ratingContainer.appendChild(this._minRating.getRootElement());
            ratingContainer.appendChild(this._maxRating.getRootElement());
            this.__sortContainer.appendChild(ratingContainer);

            on(EVENTS.APP_ENABLED, () => { addStyles(); show(this._ratingTitle); show(ratingContainer); });
            on(EVENTS.APP_DISABLED, () => { removeStyles(); hide(this._ratingTitle); hide(ratingContainer); });

            addStyles();

            this._paletoolsGenerated = true;
        }
    }

    UTClubSearchFiltersView.prototype.getMinRating = function () {
        if (!this._minRating) return;
        return parseInt(this._minRating.getInputValue()) || null;
    }

    UTClubSearchFiltersView.prototype.getMaxRating = function () {
        if (!this._maxRating) return;
        return parseInt(this._maxRating.getInputValue()) || null;
    }

    const UTClubSearchFiltersViewController_init = UTClubSearchFiltersViewController.prototype.init;

    UTClubSearchFiltersViewController.prototype.init = function () {
        UTClubSearchFiltersViewController_init.call(this);

        if (!cfg.enabled) return;

        this.getView()._minRating.addTarget(this, () => {
            this.viewmodel.searchCriteria.minRating = this.getView().getMinRating();
        }, EventType.CHANGE);

        this.getView()._maxRating.addTarget(this, () => {
            this.viewmodel.searchCriteria.maxRating = this.getView().getMaxRating();
        }, EventType.CHANGE);
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
        name: 'club-search-enhacer',
        title: 'plugins.clubSearchEnhacer.settings.title',
        menu: menu
    }
}
// #endif

export default plugin;
