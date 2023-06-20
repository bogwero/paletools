let plugin;
/* The code to calculate the missing ratings comes from here

https://github.com/mabenj/SbcCruncher/blob/master/src/workers/solver-helper.ts

*/


// #if process.env.SBC_RATING_CALCULATOR
import { addLabelWithToggle } from "../../controls";
import { Table } from "../../controls/Table";
import { EVENTS, on } from "../../events";
import localize from "../../localization";
import { openDialog } from "../../services/dialog";
import { SolverHelper } from "../../services/sbc";
import settings, { saveConfiguration } from "../../settings";
import { range } from "../../utils/array";
import { append, createElem, select } from "../../utils/dom";
import { addStyle, removeStyle } from "../../utils/styles";
import { hide, show } from "../../utils/visibility";
import styles from "./styles.css";

const SOLUTIONS_PER_PAGE = isPhone() ? 6 : 15;

const cfg = settings.plugins.sbcRatingCalculator;

function addStyles() {
    addStyle('paletools-sbc-rating-calculator', styles);
}

function removeStyles() {
    removeStyle('paletools-sbc-rating-calculator');
}

function run() {
    const UTSBCSquadOverviewViewController_initWithSBCSet = UTSBCSquadOverviewViewController.prototype.initWithSBCSet;
    UTSBCSquadOverviewViewController.prototype.initWithSBCSet = function initWithSBCSet(...args) {
        UTSBCSquadOverviewViewController_initWithSBCSet.call(this, ...args);

        if (!cfg.enabled || !settings.enabled) return;

        const sbcSet = args[0];
        const challengeId = args[1];
        const challenge = sbcSet.getChallenge(challengeId);
        const teamRatingRequirement = challenge.eligibilityRequirements.find(x => x.getFirstKey() === SBCEligibilityKey.TEAM_RATING);

        if (!teamRatingRequirement) {
            hide(this.getView().getSummaryPanel()._calculateRating);
        }
        else {
            this.getView().getSummaryPanel().onCalculateRatingTap(() => {
                const playerSlots = challenge.squad.getPlayers().slice(0, 11).filter(x => x.requirement === null || x.requirement.playerType === SBCPlayerRequirementType.DEFAULT);
                const totalPlayers = playerSlots.length;

                const currentRatings = playerSlots.filter(x => x.getItem().rating > 0).map(x => x.getItem().rating);

                const targetRating = teamRatingRequirement.getValue(SBCEligibilityKey.TEAM_RATING)[0];

                const rangeFrom = targetRating - cfg.lowerBound;
                const rangeTo = targetRating + cfg.upperBound;

                openDialog([{ labelEnum: enums.UIDialogOptions.OK }], localize("plugins.sbcRatingCalculator.dialog.title"), `
                <div id="sbc-rating-calculator">
                    <h3>${localize("plugins.sbcRatingCalculator.dialog.ranges.title")}</h3>
                    <div id="sbc-rating-calculator-options">
                        <div>
                            <label>${localize("from")}</label>
                            <input type="text" id="sbc-rating-calculator-from" value="${rangeFrom}" />
                        </div>
                        <div>
                            <label>${localize("to")}</label>
                            <input type="text" id="sbc-rating-calculator-to" value="${rangeTo}" />
                        </div>
                        <div id="sbc-rating-calculator-button-container"></div>
                    </div>
                    <div id="sbc-rating-calculator-container"></div>
                    <div id="sbc-rating-calculator-pager"></div>
                </div>`);

                const dialogContainer = select("#sbc-rating-calculator-container");

                const prevPageButton = createElem("div", { className: "prev" }, localize("label.prev"));
                const nextPageButton = createElem("div", { className: "next" }, localize("label.next"))

                hide(prevPageButton);
                hide(nextPageButton);

                const pager = select("#sbc-rating-calculator-pager");

                append(pager, prevPageButton);
                append(pager, nextPageButton);
                
                let currentPage = 0;
                on(prevPageButton, "click", () => {
                    if (currentPage > 0) {
                        displayCombinationsPage(currentPage - 1);
                    }
                });

                on(nextPageButton, "click", () => {
                    displayCombinationsPage(currentPage + 1);
                });

                const tablesForPage = [];

                function displayCombinationsPage(pageIndex) {
                    currentPage = pageIndex;

                    hide(prevPageButton);
                    hide(nextPageButton);

                    if (pageIndex > 0 && tablesForPage.length > 1) {
                        show(prevPageButton);
                        show(nextPageButton);
                    }
                    else if (pageIndex == 0 && tablesForPage.length > 1) {
                        show(nextPageButton);
                    }
                    else if (pageIndex == tablesForPage.length - 1) {
                        show(prevPageButton);
                    }

                    if (tablesForPage.length > pageIndex) {
                        dialogContainer.innerHTML = "";
                        for (let tableContainer of tablesForPage[pageIndex]) {
                            append(dialogContainer, tableContainer);
                        }
                    }
                }

                const calculateButton = new UTStandardButtonControl();
                calculateButton.init();
                calculateButton.setText(localize("plugins.sbcRatingCalculator.buttons.calculate"));
                calculateButton.addTarget(this, () => {
                    setTimeout(calculateSolutions, 0);
                }, EventType.TAP)
                append(select("#sbc-rating-calculator-button-container"), calculateButton);

                function calculateSolutions() {
                    dialogContainer.innerHTML = "";

                    const lowerBound = parseInt(select("#sbc-rating-calculator-from").value) || cfg.lowerBound;
                    const upperBound = parseInt(select("#sbc-rating-calculator-to").value) || cfg.upperBound;

                    const ratingsToTry = range(lowerBound, upperBound);
                    const combinations = SolverHelper.getMultisubsets(ratingsToTry, totalPlayers - currentRatings.length);

                    let currentCombination = combinations.next();

                    let page = 0;
                    let tableCount = 0;
                    while (!currentCombination.done) {
                        if (tableCount == SOLUTIONS_PER_PAGE) {
                            tableCount = 0;
                            page++;
                        }

                        const combination = currentCombination.value;
                        const rating = SolverHelper.getRating([...currentRatings, ...combination], totalPlayers);

                        if (rating < targetRating) {
                            currentCombination = combinations.next();
                            continue;
                        }

                        const ratingCounts = combination.reduce((acc, curr) => {
                            acc[curr] = (acc[curr] || 0) + 1;
                            return acc;
                        }, {});

                        const table = new Table({
                            headers: [localize("plugins.sbcRatingCalculator.table.rating"), localize("plugins.sbcRatingCalculator.table.count")],
                            caption: `${rating}`
                        });
                        const tableContainer = createElem("div", { className: "sbc-rating-calculator-table-container" });
                        table.updateData(Object.keys(ratingCounts).map((rating) => [rating, ratingCounts[rating]]));

                        append(tableContainer, table);

                        if (tablesForPage.length <= page) {
                            tablesForPage.push([]);
                        }

                        tablesForPage[page].push(tableContainer);

                        currentCombination = combinations.next();

                        tableCount++;

                    }

                    for (let tableContainer of tablesForPage[0]) {
                        append(dialogContainer, tableContainer);
                    }

                    if (tablesForPage.length > 1) {
                        show(nextPageButton);
                    }
                }
            });
        }
    }


    const UTSBCSquadSummaryBannerView__generate = UTSBCSquadSummaryBannerView.prototype._generate;

    UTSBCSquadSummaryBannerView.prototype.onCalculateRatingTap = function (callback) {
        this._calculateRating.addTarget(this, () => {
            callback();
        }, EventType.TAP);
    }

    UTSBCSquadSummaryBannerView.prototype._generate = function (...args) {
        UTSBCSquadSummaryBannerView__generate.call(this, ...args);

        if (!cfg.enabled || !settings.enabled) return;

        if (!this._paletoolsGenerated) {
            this._calculateRating = new UTStandardButtonControl();
            this._calculateRating.init();
            this._calculateRating.setText(localize("plugins.sbcRatingCalculator.buttons.openDialog"));
            this._calculateRating.getRootElement().id = "sbc-rating-calculator-button";
            append(this, this._calculateRating);
            this._paletoolsGenerated = true;

            on(EVENTS.APP_ENABLED, () => show(this._calculateRating));
            on(EVENTS.APP_DISABLED, () => hide(this._calculateRating));
        }
    }

    addStyles();

    on(EVENTS.APP_ENABLED, () => addStyles());
    on(EVENTS.APP_DISABLED, () => removeStyles());
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
        name: 'sbc-rating-calculator',
        title: 'plugins.sbcRatingCalculator.settings.title',
        menu: menu
    }
}
// #endif

export default plugin;
