import { isFastClubSearchEnabled } from "./experimental";
import { getPlayerAlternativePositions, getPlayerSecondaryAlternativePositions } from "./players";
import { findPlayersInClub } from "./ui/club";

export async function fillSbc(sbcChallenge, playersToUse, onClubBatchLoadedCallback) {
    let club = (await findPlayersInClub(playersToUse, onClubBatchLoadedCallback, false, true))
    
    let cleanClub = [];

    for(let player of club) {
        if(!playersToUse.find(x => x.definitionId === player.definitionId)) continue;

        cleanClub.push(player);
    }
    
    club = cleanClub.slice(0, 23);
    const squad = sbcChallenge.squad;
    const positionIndexes = squad.getSBCSlots().reduce((acc, curr) => {
        if (!curr.position) return acc;

        if (!acc[curr.position.typeName]) {
            acc[curr.position.typeName] = [];
        }
        acc[curr.position.typeName].push(curr.index);
        return acc;
    }, {});

    club.sort((a, b) => {
        return a.rating < b.rating ? -1 : a.rating > b.rating ? 1 : 0;
    });

    let substituteIndex = 11;
    let playersOutOfPosition = [];

    const players = new Array(23);


    for (const player of club) {
        const squadPosition = positionIndexes[PlayerPosition[player.preferredPosition]];

        // Position each player on its preferred position if the position is not occupied
        if (squadPosition && squadPosition.length > 0) {
            players[squadPosition.shift()] = player;
            if (squadPosition.length === 0) {
                delete positionIndexes[PlayerPosition[player.preferredPosition]];
            }
        }
        // if the position is occupied, put player as out of position
        else {
            playersOutOfPosition.push(player);
        }
    }

    function processAlternativePositions(getPositionFunc) {
        // if there is still open positions in the starting 11, try to put players in their alternatives positions
        for (let outOfPositionIndex = 0; outOfPositionIndex < playersOutOfPosition.length && Object.keys(positionIndexes).length > 0;) {
            let player = playersOutOfPosition.shift();

            let squadPosition = null;
            for (let alternativePositionIndex of getPositionFunc(player.preferredPosition)) {
                squadPosition = positionIndexes[PlayerPosition[alternativePositionIndex]];
                if (!squadPosition || squadPosition.length == 0) continue;

                players[squadPosition.shift()] = player;
                if (squadPosition.length === 0) {
                    delete positionIndexes[PlayerPosition[alternativePositionIndex]];
                }
                break;
            }

            if (!squadPosition) {
                playersOutOfPosition.push(player);
                outOfPositionIndex++;
            }
        }
    }

    processAlternativePositions(getPlayerAlternativePositions);
    processAlternativePositions(getPlayerSecondaryAlternativePositions);

    // position players of pending open positions in the starting 11
    for (let position of Object.keys(positionIndexes)) {
        if (playersOutOfPosition.length === 0) break;

        for (let positionIndex of positionIndexes[position]) {
            if (playersOutOfPosition.length === 0) break;

            players[positionIndex] = playersOutOfPosition.shift();
        }
    }

    // position players on the bench
    for (let player of playersOutOfPosition) {
        if (substituteIndex >= 23) break;

        players[substituteIndex++] = player;
    }

    squad.setPlayers(players, true);
    services.SBC.saveChallenge(sbcChallenge);
    repositories.Item.unassigned.expiryTimestamp = 0;
    repositories.Item.transfer.expiryTimestamp = 0;
}


/*
Original code comes from here

https://raw.githubusercontent.com/mabenj/SbcCruncher/master/src/workers/solver-helper.ts

*/

export class SolverHelper {
    static getMultisubsetsCount(setLength, n) {
        return (
            this.factorial(setLength + n - 1) /
            (this.factorial(setLength - 1) * this.factorial(n))
        );
    }

    static factorial(num) {
        let rval = 1;
        for (let i = 2; i <= num; i++) {
            rval = rval * i;
        }
        return rval;
    }

    // https://www.reddit.com/r/FIFA/comments/5osq7k/new_overall_rating_figured_out/
    static getRating(ratings, squadSize) {
        const sum = ratings.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / ratings.length;
        const excess = ratings.reduce((acc, curr) => {
            if (curr <= avg) {
                return acc;
            }
            return acc + curr - avg;
        }, 0);
        const rating = Math.round(sum + excess) / squadSize;
        return Math.floor(rating);
    }

    /**
     * Calculates all the multisubsets of length n of a set
     * @param set set
     * @param n multisubset length
     * @returns Iterable of multisubsets
     */
    static getMultisubsets(set, multisubsetLength) {
        return multisubsetsImpl(set, multisubsetLength);
    }
}

function* multisubsetsImpl(set, n) {
    if (n === 0) {
        yield [];
    } else if (set.length > 0) {
        const [x, rest] = [set[0], set.slice(1)];
        for (let i = 0; i < n; i++) {
            yield* prependNTimes(x, multisubsetsImpl(rest, i), n - i);
        }
        yield* multisubsetsImpl(rest, n);
    }
}

function* prependNTimes(a, xss, n) {
    const as = Array.from({ length: n }).fill(a);
    for (let xs of xss) {
        yield [...as, ...xs];
    }
}