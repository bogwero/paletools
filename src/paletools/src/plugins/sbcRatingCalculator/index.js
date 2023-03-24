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
                            <input type="number" id="sbc-rating-calculator-from" value="${rangeFrom}" />
                        </div>
                        <div>
                            <label>${localize("to")}</label>
                            <input type="number" id="sbc-rating-calculator-to" value="${rangeTo}" />
                        </div>
                        <div id="sbc-rating-calculator-button-container"></div>
                    </div>
                    <div id="sbc-rating-calculator-container"></div>
                    <div id="sbc-rating-calculator-pager"></div>
                </div>`);

                const dialogContainer = select("#sbc-rating-calculator-container");

                const prevPageButton = createElem("div", { className: "prev" }, "Prev");
                const nextPageButton = createElem("div", { className: "next" }, "Next")

                const pager = select("#sbc-rating-calculator-pager");

                let currentPage = 0;
                let maxPage = -1;

                append(pager, prevPageButton);
                append(pager, nextPageButton);

                on(prevPageButton, "click", () => {
                    if (currentPage > 0) {
                        displayCombinationsPage(currentPage - 1);
                    }
                });

                on(nextPageButton, "click", () => {
                    displayCombinationsPage(currentPage + 1);
                });


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
                    let combinationsCounter = 0;
                    const combinations = SolverHelper.getMultisubsets(ratingsToTry, totalPlayers - currentRatings.length);

                    let currentCombination = combinations.next();

                    const tablesForPage = [];

                    displayCombinationsPage(0);

                    function displayCombinationsPage(pageIndex) {
                        if (pageIndex == 0) {
                            hide(prevPageButton);
                        }
                        else {
                            show(prevPageButton);
                        }

                        if (pageIndex === maxPage) {
                            hide(nextPageButton);
                        }
                        else {
                            show(nextPageButton);
                        }
                        currentPage = pageIndex;
                        if (tablesForPage.length > pageIndex) {
                            dialogContainer.innerHTML = "";
                            for (let tableContainer of tablesForPage[pageIndex]) {
                                append(dialogContainer, tableContainer);
                            }
                            return;
                        }

                        while (!currentCombination.done) {
                            const combination = currentCombination.value;
                            const rating = SolverHelper.getRating([...currentRatings, ...combination], totalPlayers);

                            if (rating < targetRating) {
                                currentCombination = combinations.next();
                                continue;
                            }

                            combinationsCounter++;
                            if (combinationsCounter > SOLUTIONS_PER_PAGE) {
                                combinationsCounter = 0;
                            };

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

                            if (tablesForPage.length <= currentPage) {
                                tablesForPage.push([]);
                            }

                            tablesForPage[currentPage].push(tableContainer);

                            append(dialogContainer, tableContainer);

                            currentCombination = combinations.next();
                        }

                        if (combinationsCounter < SOLUTIONS_PER_PAGE) {
                            maxPage = currentPage;
                            hide(nextPageButton);
                        }
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
