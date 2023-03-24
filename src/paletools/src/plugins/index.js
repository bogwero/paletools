import minMaxPrices from "./compareMinMaxPrices";
import playerActions from "./playerActions";
import transferTargetsLimbo from "./transferTargetsLimbo";
import unassignedLimbo from "./unassignedLimbo";
import donation from "./donation";
import marketSearchFilters from "./marketSearchFilters";
import gridMode from "./gridMode";
import snipe from "./snipe";
import duplicatedToSbc from "./duplicatedToSbc";
import selectCheapest from "./selectCheapest";
import settingsMenu from "./settingsMenu";
import fillSbcFromFutbin from "./fillSbcFromFutbin";
import improvedPlayerSearch from "./improvedPlayerSearch";
import markDuplicated from "./markDuplicated";
import filterSbcs from "./filterSbcs";
import sbcTimesCompleted from "./sbcTimesCompleted";
import clubAnalyzer from "./clubAnalyzer";
import showConsoleOutput from "./showConsoleOutput";
import wideMode from "./wideMode";
import countMyPacks from "./countMyPacks";
import transferListSendAllToClub from "./transferListSendAllToClub";
import transferListToSbc from "./transferListToSbc";
import sbcBuilderEnhacer from "./sbcBuilderEnhacer";
import eaBugFixer from "./eaBugFixer";
import snipeMobile from "./snipeMobile";
import sbcSmartBuilder from "./sbcSmartBuilder";
import disablePackAnimations from "./disablePackAnimations";
import clubSearchEnhacer from "./clubSearchEnhacer";
import keepPlayerSellValues from "./keepPlayerSellValues";
import sellMultiple from "./sellMultiple";
import xmlHttpRequest from "./xmlHttpRequest";
import warningScreen from "./warningScreen";
import debugMode from "./debugMode";
import sellProfit from "./sellProfit";
import trackTransactions from "./trackTransactions";
import playerCardInfo from "./playerCardInfo";
import transactionsHistory from "./transactionsHistory";
import keyListener from "./keyListener";
import importantLeagues from "./importantLeagues";
import experimental from "./experimental";
import refreshCoins from "./refreshCoins";
import externalMarketPrices from "./externalMarketPrices";
import packsOpener from "./packsOpener";
import bidAll from "./bidAll";
import myPacks from "./myPacks";
import sbcRatingCalculator from "./sbcRatingCalculator";
import limbo from "./limbo";

const plugins = [
    minMaxPrices,
    playerActions,
    transferTargetsLimbo,
    unassignedLimbo,
    donation,
    marketSearchFilters,
    gridMode,
    wideMode,
    duplicatedToSbc,
    selectCheapest,
    fillSbcFromFutbin,
    improvedPlayerSearch,
    markDuplicated,
    filterSbcs,
    sbcTimesCompleted,
    clubAnalyzer,
    showConsoleOutput,
    countMyPacks,
    transferListSendAllToClub,
    transferListToSbc,
    sbcBuilderEnhacer,
    eaBugFixer,
    snipeMobile,
    sbcSmartBuilder,
    disablePackAnimations,
    clubSearchEnhacer,
    keepPlayerSellValues,
    sellMultiple,
    xmlHttpRequest,
    warningScreen,
    sellProfit,
    trackTransactions,
    debugMode,
    playerCardInfo,
    transactionsHistory,
    importantLeagues,
    experimental,
    refreshCoins,
    packsOpener,
    bidAll,
    myPacks,
    externalMarketPrices,
    sbcRatingCalculator,
    limbo,
    snipe,
    keyListener,

].filter(x => x);

const menus = [];

export default function runPlugins() {
    plugins.sort((a, b) => {
        return a.order - b.order;
    });
    for (let plugin of plugins) {
        if (!plugin.run) continue;

        plugin.run();
        if (plugin.settings) {
            menus.push(plugin.settings);
        }
    }

    if (settingsMenu) {
        settingsMenu.run(menus);
    }
}