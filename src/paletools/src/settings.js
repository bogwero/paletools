import VERSION from "./version";
import { EVENTS, triggerEvent } from "./events";
import extend from "./utils/extend";

const buttons = {
    back: 'Digit1',
    enableDisable: 'Comma',
    lists: {
        up: 'ArrowUp',
        down: 'ArrowDown',
        prev: 'ArrowLeft',
        next: 'ArrowRight',
    },
    search: {
        resetBid: 'Backquote',
        decMinBid: 'ArrowLeft',
        incMinBid: 'ArrowRight',
        decMaxBid: 'End',
        incMaxBid: 'Home',
        decMinBuy: 'Delete',
        incMinBuy: 'PageDown',
        decMaxBuy: 'ArrowDown',
        incMaxBuy: 'ArrowUp',
        search: 'Digit2',
        oneTouchMinBid: 'BracketRight',
        oneTouchMinBuy: 'BracketLeft',
    },
    results: {
        bid: 'Digit4',
        buy: 'Digit3',
        transfer: 'KeyR',
        club: 'KeyC',
        pressEnter: true,
        autoBuy: false,
        preventBack: false,
        sell: 'KeyQ',
        decBid: 'Delete',
        incBid: 'PageDown',
        compare: 'KeyM'
    },
    customActions: {
        findLowestPrice: "KeyV"
    }
};

let settings = {
    enabled: true,
    appVersion: VERSION,
    requests: {
        maxItemsCount: 150,
    },
    externalServices: {
        prices: {
            providers: ["futbin"],
            provider: "futbin"
        },
        sbc: {
            providers: ["futbin"],
            provider: "futbin"
        }
    },
    plugins: {
        gridMode: {
            enabled: false
        },
        wideMode: {
            enabled: false
        },
        compareMinMaxPrices: {
            enabled: true
        },
        marketSearchFilters: {
            playerId: false,
            playerRating: true,
            savedFilters: true,
            hideDuplicates: false
        },
        donation: {
            enabled: true
        },
        playerActions: {
            copyPlayerId: true,
            futbinSearch: true,
            findLowestPrice: true,
            listForProfit: true,
            listForProfitAutoPublish: false,
            displayApplyConsumable: true
        },
        snipeMobile: {
            enabled: true,
            autoBack: false
        },
        snipe: {
            oneTouch: {
                isEnabled: false,
                displayMinBid: false,
                displayMinBuy: false,
                superMode: false,
            },
            buttons: buttons,
            legacyMode: false,
            enabled: true
        },
        duplicatedToSbc: {
            enabled: true
        },
        transferListToSbc: {
            enabled: true
        },
        selectCheapest: {
            enabled: false
        },
        pristinePlayers: {
            enabled: true
        },
        fillSbcFromFutbin: {
            enabled: true
        },
        improvedPlayerSearch: {
            enabled: true
        },
        markDuplicated: {
            enabled: true
        },
        sbcSelectMultiplePlayers: {
            enabled: true
        },
        filterSbcs: {
            enabled: true
        },
        clubAnalyzer: {
            enabled: true,
            autoRefresh: true
        },
        sbcTimesCompleted: {
            enabled: true
        },
        showConsoleOutput: {
            enabled: true
        },
        countMyPacks: {
            enabled: true
        },
        groupMyPacks: {
            enabled: true
        },
        transferListSendAllToClub: {
            enabled: true
        },
        sbcBuilderEnhacer: {
            enabled: true
        },
        sbcSmartBuilder: {
            enabled: true
        },
        clubSearchEnhacer: {
            enabled: true
        },
        keepPlayerSellValues: {
            enabled: true
        },
        sellMultiple: {
            enabled: false
        },
        eaBugFixer: {
            enabled: true
        },
        disablePackAnimations: {
            enabled: false
        },
        pristinePlayers: {
            enabled: false
        },
        showPlayerContracts: {
            enabled: false
        },
        incrementAllowedAuctions: {
            enabled: false
        },
        warningScreen: {
            enabled: true
        },
        sellProfit: {
            enabled: true
        },
        trackTransactions: {
            enabled: true
        },
        playerCardInfo: {
            enabled: true,
            alternatePositions: true,
            skillMoves: true,
            weakFoot: true,
            untradeable: true,
            pristine: true,
            contracts: true,
            league: true,
            importantLeague: true
        },
        importantLeagues: {
            enabled: true,
            leagueIds: []
        },
        transactionsHistory: {
            enabled: true
        },
        debugMode: {
            enabled: false
        },
        experimental: {
            fastClubSearch: false,
            fastConceptSearch: false
        },
        refreshCoins: {
            enabled: true
        },
        externalMarketPrices: {
            enabled: true
        },
        packCollector: {
            enabled: true
        },
        limbo: {
            enabled: true
        },
        myPacks: {
            enabled: true,
            group: true,
            packCollector: true,
            filter: true,
            filterText: null,
        },
        sbcRatingCalculator: {
            enabled: true,
            maxCombinations: 10,
            lowerBound: 5,
            upperBound: 5
        },
        claimObjectives: {
            enabled: true
        },
        packsOpener: {
            enabled: false
        }
    }
};

const defaultSettings = JSON.parse(JSON.stringify(settings));

export function resetConfiguration(){
    localStorage.removeItem("paletools:settings");
    extend(true, settings, defaultSettings);
    saveConfiguration();
}

if (localStorage.getItem("paletools:settings")) {
    const savedSettings = JSON.parse(atob(localStorage.getItem("paletools:settings")));
    extend(true, settings, savedSettings);
    triggerEvent(EVENTS.CONFIGURATION_LOADED, settings);
}

export function saveConfiguration() {
    localStorage.setItem("paletools:settings", btoa(JSON.stringify(settings)));
    triggerEvent(EVENTS.CONFIGURATION_SAVED, settings);
}

export default settings;