
let plugin;

// #if process.env.CLAIM_OBJECTIVES
import { addLabelWithToggle } from "../../controls";
import { EVENTS, on } from "../../events";
import localize from "../../localization";
import settings, { saveConfiguration } from "../../settings";
import { toDictionary } from "../../utils/array";
import delay from "../../utils/delay";
import { addClass, append } from "../../utils/dom";
import { toPromise } from "../../utils/observable";
import { hide, show } from "../../utils/visibility";


const cfg = settings.plugins.claimObjectives;

function run() {

    const UTObjectivesHubTileContentView_generate = UTObjectivesHubTileContentView.prototype._generate;

    UTObjectivesHubTileContentView.prototype._generate = function (...args) {
        UTObjectivesHubTileContentView_generate.call(this, ...args);
        const self = this;
        let pendingGroups = {};
        let categories = null;

        async function verifyUnclaimedRewards() {
            const response = await toPromise(services.Objectives.requestCategories());

            function getPendingGroups(category) {
                const groups = [];
                for(let group of category.groups.values()) {
                    if(group.objectivesReadyToRedeem > 0) {
                        groups.push(group);
                    }
                }

                return groups;
            }

            let hasUnclaimedRewards = false;
            categories = response.data.categories;
            for (let category of categories) {
                const categoryPendingGroups = getPendingGroups(category);
                if(categoryPendingGroups.length > 0) {
                    hasUnclaimedRewards = true;
                    pendingGroups[category.id] = categoryPendingGroups;
                }
            }

            if (hasUnclaimedRewards) {
                show(self._reclaimRewardsButton);
            }
        }

        async function claimPendingRewards() {
            self._reclaimRewardsButton.setInteractionState(false);
            self._reclaimRewardsButton.setText(localize("plugins.claimObjectives.button.loading"));
            for(let category of categories) {
                if(pendingGroups[category.id]) {
                    for(let group of pendingGroups[category.id]){
                        await toPromise(services.Objectives.requestGroup(category, group.compositeId));
                        for(let objective of group.objectives.values().filter(x => x.isClaimable())) {
                            await toPromise(category.claimObjectiveRewards(group.compositeId, objective.id));
                            await delay(100, 300);
                        }

                        if(group.objectivesCompleted === group.objectivesNumber) {
                            await toPromise(category.claimGroupRewards(group.compositeId));
                            await delay(100, 300);
                        }
                        await delay(100, 300);
                    }
                }
            }
            hide(self._reclaimRewardsButton);
        }

        if (!this._paletoolsGenerated) {

            this._reclaimRewardsButton = new UTStandardButtonControl();
            this._reclaimRewardsButton.init();
            addClass(this._reclaimRewardsButton, "call-to-action");
            this._reclaimRewardsButton.setText(localize("plugins.claimObjectives.button.text"));
            this._reclaimRewardsButton.addTarget(this, () => {
                claimPendingRewards();
            }, EventType.TAP);
            append(this, this._reclaimRewardsButton);
            hide(this._reclaimRewardsButton);
            verifyUnclaimedRewards();

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
    order: 10,
    settings: {
        name: "claimObjectives",
        title: 'plugins.claimObjectives.settings.title',
        menu: menu
    }
};
// #endif

export default plugin;