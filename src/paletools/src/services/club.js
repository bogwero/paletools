import { triggerEvent } from "../events";
import delay from "../utils/delay";
import promiseState from "../utils/promiseState";
import { randomInt } from "../utils/random";
import http from "./http";
import { toPromise } from "../utils/observable";
import { flattenArray } from "../utils/array";
import settings from "../settings";

const MAX_ITEMS_REQUEST = settings.requests.maxItemsCount;

export function getUserCoins() {
    return toPromise(services.User.requestCurrencies());
}

export function getClubPlayersCount() {
    return new Promise(resolve => {
        http("club/stats/club").then(stats => {
            resolve(stats.stat.find(x => x.type == "players").typeValue);
        });
    });
}

export async  function getClubPlayersByDefId(playerDefIds) {
    if(playerDefIds.length === 0){
        return [];
    }
    
    if (MAX_ITEMS_REQUEST < playerDefIds.length) {
        const iterations = Math.ceil(playerDefIds.length / MAX_ITEMS_REQUEST);
        const players = [];
        for(let iteration = 0; iteration < iterations; iteration++){
            players.push(await getClubPlayersByDefId(playerDefIds.slice(0, MAX_ITEMS_REQUEST)));
            playerDefIds = playerDefIds.slice(MAX_ITEMS_REQUEST, playerDefIds.length);
        }

        return flattenArray(players);
    }
    else {
        const searchCriteria = new UTItemSearchViewModel().searchCriteria;
        searchCriteria.count = MAX_ITEMS_REQUEST;
        searchCriteria.defId = playerDefIds;
        const response = await toPromise(services.Club.search(searchCriteria));
        return response.response.items;
    }
}

export function getClubPlayers(playerIds) {
    return new Promise(resolve => {
        const players = [];
        const promises = [];
        for (const playerId of playerIds) {
            promises.push(getAllClubPlayers(true, playerId));
        }

        Promise.all(promises).then(results => {
            for (const result of results) {
                players.push(result[0]);
            }

            resolve(players);
        });
    });
}

let getAllClubPlayersExecutingPromise = null;

export function getAllClubPlayers(filterLoaned, playerId, onBatchLoadedCallback) {
    return new Promise(resolve => {
        if (getAllClubPlayersExecutingPromise) {
            promiseState(getAllClubPlayersExecutingPromise, state => {
                if (state !== "pending") {
                    getAllClubPlayersExecutingPromise = searchClub(filterLoaned, playerId, onBatchLoadedCallback);
                }

                getAllClubPlayersExecutingPromise.then(resolve);
            });
        }
        else {
            getAllClubPlayersExecutingPromise = searchClub(filterLoaned, playerId, onBatchLoadedCallback);
            getAllClubPlayersExecutingPromise.then(resolve);
        }
    });
};

export function quickRefreshClub() {
    return new Promise((resolve, reject) => {
        const searchCriteria = new UTItemSearchViewModel().searchCriteria;
        searchCriteria.count = MAX_ITEMS_REQUEST;
        searchCriteria.defId = [randomInt(1000, 10000)];
        const search = () => {
            services.Club.search(searchCriteria).observe(
                this,
                async function (sender, response) {
                    resolve();
                }
            );
        };
        search();
    });
}

export function searchClub(filterLoaned, playerId, onBatchLoadedCallback, searchCriteria) {
    return new Promise((resolve, reject) => {
        searchCriteria = searchCriteria || new UTItemSearchViewModel().searchCriteria;
        if (playerId) {
            searchCriteria.defId = [parseInt(playerId)];
        }
        searchCriteria.count = MAX_ITEMS_REQUEST;
        let gatheredSquad = [];

        const getAllSquadMembers = () => {
            services.Club.search(searchCriteria).observe(
                this,
                async function (sender, response) {
                    gatheredSquad = [
                        ...response.response.items.filter(
                            (item) => !filterLoaned || item.loans < 0
                        ),
                    ];
                    if (response.status !== 400 && !response.response.retrievedAll) {
                        searchCriteria.offset += searchCriteria.count;
                        if (onBatchLoadedCallback) {
                            let result = (onBatchLoadedCallback)(searchCriteria.offset, gatheredSquad);
                            if(result === false) {
                                resolve(gatheredSquad);
                            }
                        }
                        delay(100 + (Math.random() * 100)).then(() => getAllSquadMembers());
                    } else {
                        if (onBatchLoadedCallback) {
                            (onBatchLoadedCallback)(searchCriteria.offset, gatheredSquad);
                        }
                        resolve(gatheredSquad);
                    }
                }
            );
        };
        getAllSquadMembers();
    });
}

export async function getUnassignedPlayersCount() {
    const usermassinfo = await http('usermassinfo');
    return usermassinfo.userInfo.unassignedPileSize;
}


