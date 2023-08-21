export default {
    "enabled": "Enabled",
    "valid": "valid",
    "invalid": "invalid",
    "ui.loadingPlayers": "Loading club players: {count} loaded",
    "plugins.dangerous": "WARNING: Enabling this plugin could eventually lead to a potential BAN from EA, are you sure you want to continue?",
    "page.restart": "Please reload the page and re-execute Paletools for the changes to take effect",
    "market.itemBuy.success": "Item bought succesfully! - {coins}",
    "confirm": "Are you sure you want to proceed?",
    "loading": "Loading",
    "from": "From",
    "to": "To",
    "extinct": "Extinct",
    "market": "Market",

    /// #if process.env.GRID_MODE
    "plugins.gridMode.title": "Grid Mode",
    /// #endif

    /// #if process.env.WIDE_MODE
    "plugins.wideMode.title": "Wide Mode",
    /// #endif

    "plugins.donation.title": "Powered by Paletools",
    "plugins.donation.paypal": "PayPal Donation",
    "plugins.donation.mercadopago": "MercadoPago Donation",
    "plugins.donation.message": "If you enjoy Paletools please consider donating",

    /// #if process.env.COMPARE_MIN_MAX_PRICES
    "plugins.compareMinMaxPrices.settings.title": "Compare Prices",
    "plugins.compareMinMaxPrices.minPriceLabel": "Min Buy Now",
    "plugins.compareMinMaxPrices.maxPriceLabel": "Max Buy Now",
    /// #endif

    /// #if process.env.PLAYER_ACTIONS
    "plugins.playerActions.settings.title": "Player Actions",
    "plugins.playerActions.settings.copyPlayerId": "Enable Copy Player Id",
    "plugins.playerActions.settings.futbinSearch": "Enable FUTBIN search",
    "plugins.playerActions.settings.findLowestPrice": "Find lowest market price",
    "plugins.playerActions.settings.listForProfit": "Quick market list - show buttons",
    "plugins.playerActions.settings.listForProfitAutoPublish": "Quick market list - auto publish",
    "plugins.playerActions.settings.displayApplyConsumable": "Always display apply consumable",

    "plugins.playerActions.copyPlayerId": "Copy Player Id to clipboard",
    "plugins.playerActions.futbinSearch": "FUTBIN search",
    "plugins.playerActions.findLowestPrice.button": "Find lowest market price",
    "plugins.playerActions.findLowestPrice.notFound": "Extinct",
    "plugins.playerActions.findLowestPrice.searching": "Searching...",
    "plugins.playerActions.listForProfit.button.set": "ADD %",
    "plugins.playerActions.listForProfit.button.market": "Cheapest",
    /// #endif

    /// #if process.env.MARKET_SEARCH_FILTERS
    "plugins.marketSearchFilters.settings.title": "Market Search Filters",
    "plugins.marketSearchFilters.settings.savedFilters": "Enable Saved Filters",
    "plugins.marketSearchFilters.settings.playerId": "Enable Player Id",
    "plugins.marketSearchFilters.settings.playerRating": "Enable Player Rating",
    "plugins.marketSearchFilters.settings.hideDuplicates": "Hide player duplicates in Market Search",
    "plugins.marketSearchFilters.filterSaved": "Filter saved",
    "plugins.marketSearchFilters.filterDeleted": "Filter deleted",
    "plugins.marketSearchFilters.loadFilters": "-- Select a filter to load --",
    "plugins.marketSearchFilters.playerId": "Player ID",
    "plugins.marketSearchFilters.playerRating": "Player Rating",
    "plugins.marketSearchFilters.filter.name": "Filter name",
    "plugins.marketSearchFilters.filter.save": "Save",
    "plugins.marketSearchFilters.filter.delete": "Delete",
    "plugins.marketSearchFilters.playerIdWarning": "This is an experimental feature and could potentially lead to you account being banned, are you sure you want to enable it?",
    /// #endif

    /// #if process.env.SNIPE
    "plugins.snipe.settings.title": "Sniping",
    "plugins.snipe.settings.enableDisable": "Enable / Disable",
    "plugins.snipe.settings.results.pressEnter": "Auto press ENTER after buy",
    "plugins.snipe.settings.oneTouch.isEnabled": "One Touch Snipe",
    "plugins.snipe.settings.back": "Go Back",
    "plugins.snipe.settings.search.search": "Search",
    "plugins.snipe.settings.results.buy": "Buy now",
    "plugins.snipe.settings.search.resetBid": "Reset Bid",
    "plugins.snipe.settings.results.bid": "Bid",
    "plugins.snipe.settings.results.transfer": "Send item to transfer list",
    "plugins.snipe.settings.results.club": "Send item to club",
    "plugins.snipe.settings.results.sell": "Quick sell item",
    "plugins.snipe.settings.results.compare": "Compare price",
    "plugins.snipe.settings.lists.up": "Select previous player in lists",
    "plugins.snipe.settings.lists.down": "Select next player in lists",
    "plugins.snipe.settings.lists.prev": "Go to previous page",
    "plugins.snipe.settings.lists.next": "Go to next page",
    "plugins.snipe.settings.search.decMinBid": "Decrease min bid value",
    "plugins.snipe.settings.search.incMinBid": "Increase min bid value",
    "plugins.snipe.settings.search.decMaxBid": "Decrease max bid value",
    "plugins.snipe.settings.search.incMaxBid": "Increase max bid value",
    "plugins.snipe.settings.search.decMinBuy": "Decrease min buy now value",
    "plugins.snipe.settings.search.incMinBuy": "Increase min buy now value",
    "plugins.snipe.settings.search.decMaxBuy": "Decrease max buy now value",
    "plugins.snipe.settings.search.incMaxBuy": "Increase max buy now value",
    "plugins.snipe.settings.search.oneTouchMinBid": "Snipe +Bid",
    "plugins.snipe.settings.search.oneTouchMinBuy": "Snipe +Buy Now",
    "plugins.snipe.settings.oneTouch.displayMinBid": "Display One Touch Snipe +Bid button",
    "plugins.snipe.settings.oneTouch.displayMinBuy": "Display One Touch Snipe +Buy button",
    "plugins.snipe.settings.oneTouch.superMode": "One Touch Smart Mode",
    "plugins.snipe.settings.legacyMode": "Use legacy mode for buying cards (palesnipe 3.1)",
    /// #endif

    /// #if process.env.SNIPE_MOBILE
    "plugins.snipeMobile.settings.title": "Sniping",
    "plugins.snipeMobile.settings.autoBack": "Go Back Automatically",
    "plugins.snipeMobile.button.goBack": "BACK",
    /// #endif

    // #if process.env.DUPLICATED_TO_SBC
    "plugins.duplicatedToSbc.button.text": "Use duplicated players",
    "plugins.duplicatedToSbc.settings.title": "Duplicated to SBC",
    "plugins.duplicatedToSbc.button.textLoading": "Loading players from club... {count} loaded",
    /// #endif

    // #if process.env.TRANSFER_LIST_TO_SBC
    "plugins.transferListToSbc.button.text": "Use Transfer List players",
    "plugins.transferListToSbc.settings.title": "Transfer List to SBC",
    "plugins.transferListToSbc.button.textLoading": "Loading players from club... {count} loaded",
    /// #endif

    /// #if process.env.SELECT_CHEAPEST
    "plugins.selectCheapest.settings.title": "Select cheapest player automatically",
    "plugins.selectCheapest.banner.text": "Mas Barato: {name} - {minBuyNow}",
    /// #endif

    /// #if process.env.FILL_SBC_FROM_FUTBIN
    "plugins.fillSbcFromFutbin.settings.title": "Fill SBC with FUTBIN",
    "plugins.fillSbcFromFutbin.settings.importToolLabel": "Install FUTBIN Link",
    "plugins.fillSbcFromFutbin.settings.importToolLinkText": "Export FUTBIN SBC",
    "plugins.fillSbcFromFutbin.settings.installInstructions": "Drag the install link to the bookmarks bar",
    "plugins.fillSbcFromFutbin.button.text": "Import SBC from FUTBIN",
    "plugins.fillSbcFromFutbin.button.textLoading": "Loading players from club... {count} loaded",
    "plugins.fillSbcFromFutbin.copyError": "There was an error importing SBC from FUTBIN, make sure you use the Export FUTBIN SBC first",
    /// #endif

    /// #if process.env.MARK_DUPLICATED
    "plugins.markDuplicated.settings.title": "Highlight duplicated players",
    /// #endif

    /// #if process.env.IMPROVED_PLAYER_SEARCH
    "plugins.improvedPlayerSearch.settings.title": "Improved player search",
    /// #endif

    /// #if process.env.SBC_SELECT_MULTIPLE_PLAYERS
    "plugins.sbcSelectMultiplePlayers.settings.title": "Select Multiple Players on SBCs",
    // #endif

    /// #if process.env.FILTER_SBCS
    "plugins.filterSbcs.settings.title": "Filter SBCs",
    "plugins.filterSbcs.label": "Search",
    "plugins.filterSbcs.sort.label": "-- Sort By --",
    "plugins.filterSbcs.sort.byId": "Newly added first",
    "plugins.filterSbcs.sort.byEndTime": "Closes expiration first",
    "plugins.filterSbcs.sort.byTimesCompleted": "More Times Completed first",
    "plugins.filterSbcs.sort.byChallengesCompletedCount": "More completed first",
    // #endif

    /// #if process.env.SETTINGS_MENU
    "plugins.settings.title": "Paletools",
    "plugins.settings.reset": "Reset to Defaults",
    /// #endif

    /// #if process.env.CLUB_ANALYZER
    "plugins.clubAnalyzer.settings.title": "Club Analyzer",
    "plugins.clubAnalyzer.settings.autoRefresh": "Auto Refresh",
    "plugins.clubAnalyzer.view.dashboard.description": "Players count (including duplicated, not including loans) in club + unnasigned up to 50, watchlist (won) up to 100 and tradepile",
    "plugins.clubAnalyzer.view.loading.players": "Loading players {count} loaded...",
    "plugins.clubAnalyzer.view.loading.usermassinfo": "Loading unassigned players data...",
    "plugins.clubAnalyzer.view.loading.watchlist": "Loading watchlist data...",
    "plugins.clubAnalyzer.view.loading.tradepile": "Loading tradepile data...",
    "plugins.clubAnalyzer.view.loading.process": "Processing information",
    "plugins.clubAnalyzer.view.buttons.reload": "Reload",
    "plugins.clubAnalyzer.view.buttons.exportCsv": "Export as CSV",
    "plugins.clubAnalyzer.view.buttons.exportHtml": "Export as HTML",
    "plugins.clubAnalyzer.view.tab.club": "Bought @ Club",
    /// #endif

    /// #if process.env.SHOW_CONSOLE_OUTPUT
    "plugins.showConsoleOutput.settings.title": "Show Console Output",
    /// #endif

    /// #if process.env.SBC_TIMES_COMPLETED
    "plugins.sbcTimesCompleted.settings.title": "SBC times completed notification",
    /// #endif

    /// #if process.env.COUNT_MY_PACKS
    "plugins.countMyPacks.settings.title": "My Packs counter",
    /// #endif

    /// #if process.env.MY_PACKS
    "plugins.myPacks.settings.title": "My Packs",
    "plugins.myPacks.settings.group": "Group",
    "plugins.myPacks.settings.filter": "Filter",
    "plugins.myPacks.settings.packCollector": "Pack Collector",
    "plugins.myPacks.filter.label": "Search My Packs",
    "plugins.myPacks.filter.default": "-- ALL MY PACKS --",
    "plugins.myPacks.packCollector.link.text": "Open Pack Collector",
    /// #endif

    /// #if process.env.TRANSFER_LIST_SEND_ALL_TO_CLUB
    "plugins.transferListSendAllToClub.settings.title": "Send Non Duplicated From Transfer List to Club",
    "plugins.transferListSendAllToClub.button.text": "Send Non Duplicated To Club",
    /// #endif

    /// #if process.env.SBC_BUILDER_ENHACER
    "plugins.sbcBuilderEnhacer.settings.title": "SBC Builder Enhacer",
    "plugins.sbcBuilderEnhacer.filter.ratings.title": "Ratings",
    "plugins.sbcBuilderEnhacer.filter.ratings.min.label": "Min",
    "plugins.sbcBuilderEnhacer.filter.ratings.max.label": "Max",
    "plugins.sbcBuilderEnhacer.filter.settings.title": "Settings",
    "plugins.sbcBuilderEnhacer.filter.settings.maxPlayers.label": "Players Count",
    "plugins.sbcBuilderEnhacer.filter.search.ignorePlayersPos": "Ignore Players Positions",
    "plugins.sbcBuilderEnhacer.filter.search.importantLeaguesOnly": "Important Leagues Only",
    "plugins.sbcBuilderEnhacer.filter.search.unimportantLeaguesOnly": "Not Important Leagues Only",
    "plugins.sbcBuilderEnhacer.filter.settings.playersFromSameClub.label": "Max Players From Same Club",
    /// #endif


    /// #if process.env.CLUB_SEARCH_ENHACER
    "plugins.clubSearchEnhacer.settings.title": "Club Search Enhacer",
    /// #endif

    /// #if process.env.SBC_SMART_BUILDER
    "plugins.sbcSmartBuilder.button.text": "Smart Builder",
    /// #endif

    /// #if process.env.DISABLE_PACK_ANIMATIONS
    "plugins.disablePackAnimations.settings.title": "Disable Pack Opening Animations",
    /// #endif

    /// #if process.env.KEEP_PLAYER_SELL_VALUES
    "plugins.keepPlayerSellValues.settings.title": "Keep player sell values",
    /// #endif

    /// #if process.env.SELL_MULTIPLE
    "plugins.sellMultiple.settings.title": "Sell multiple items at once",
    "plugins.sellMultiple.button.text": "Sell Multiple",
    "plugins.sellMultiple.button.quickSellText": "Quick Sell Multiple",
    "plugins.sellMultiple.label.ignoredCards": "Card will be ignored if teh price range does not fall in the provided values",
    "plugins.sellMultiple.warning": "This is an automation feature, your account could potentially be banned if you are abusing of it, are you sure you want to enable it?",
    "plugins.sellMultiple.notifications.maxPlayersReached": "You have reached the limit of {players} players you can listº",
    "plugins.sellMultiple.notifications.wait": "Please wait {seconds} seconds before performing another list",
    /// #endif

    /// #if process.env.INCREASE_ALLOWED_AUCTIONS
    "plugins.increaseAllowedAuctions.settings.title": "Increase Allowed Auctions",
    /// #endif

    /// #if process.env.PLAYER_CARD_INFO
    "plugins.playerCardInfo.settings.title": "Display Extra Card Information",
    "plugins.playerCardInfo.settings.alternatePositions": "Display alternative positions",
    "plugins.playerCardInfo.settings.skillMoves": "Display skill moves",
    "plugins.playerCardInfo.settings.weakFoot": "Display weak foot",
    "plugins.playerCardInfo.settings.untradeable": "Display untradeable icon",
    "plugins.playerCardInfo.settings.pristine": "Display if a card is pristine (7 contracts, 1 owner) only on search results",
    "plugins.playerCardInfo.settings.contracts": "Display contracts",
    "plugins.playerCardInfo.settings.league": "Display League",
    "plugins.playerCardInfo.settings.importantLeague": "Highlight Important League",
    /// #endif

    /// #if process.env.TRACK_TRANSACTIONS
    "plugins.trackTransactions.settings.title": "Save Transactions Information",
    /// #endif

    /// #if process.env.SELL_PROFIT
    "plugins.sellProfit.settings.title": "Show sell profit",
    "plugins.sellProfit.realProfit.text": "Profit",
    "plugins.sellProfit.expectedProfit.text": "Expected Profit",
    /// #endif

    /// #if process.env.TRANSACTIONS_HISTORY
    "plugins.transactionsHistory.settings.title": "Transactions History",
    "plugins.transactionsHistory.panel.title": "Transactions History",
    "plugins.transactionsHistory.panel.label": "All",
    "plugins.transactionsHistory.panel.bought": "Bought",
    "plugins.transactionsHistory.panel.sold": "Sold",
    "plugins.transactionsHistory.view.menu.dashboard": "Dashboard",
    "plugins.transactionsHistory.view.table.date": "Date",
    "plugins.transactionsHistory.view.table.item": "Item",
    "plugins.transactionsHistory.view.table.price": "Coins",
    "plugins.transactionsHistory.view.buttons.filterToday": "Today",
    "plugins.transactionsHistory.view.buttons.filterWeek": "This Week",
    "plugins.transactionsHistory.view.buttons.filterMonth": "This Month",
    "plugins.transactionsHistory.view.buttons.filterAnyMonth": "-- Select Month --",
    "plugins.transactionsHistory.view.dashboard.month": "Month",
    "plugins.transactionsHistory.view.buttons.reindex": "Re-Index Database",
    "plugins.transactionsHistory.view.buttons.exportCsv": "Export as CSV",
    "plugins.transactionsHistory.view.buttons.clear": "Reset Database",
    /// #endif

    /// #if process.env.IMPORTANT_LEAGUES
    "plugins.importantLeagues.settings.title": "Important Leagues",
    /// #endif

    /// #if process.env.REFRESH_COINS
    "plugins.refreshCoins.settings.title": "Refresh Coins",
    /// #endif

    /// #if process.env.EXPERIMENTAL
    "plugins.experimental.settings.title": "Experimental Stuff - Use at your own risk",
    "plugins.experimental.settings.fastClubSearch": "Fast club search",
    /// #endif

    /// #if process.env.SBC_RATING_CALCULATOR
    "plugins.sbcRatingCalculator.settings.title": "Ratings Calculator",
    "plugins.sbcRatingCalculator.buttons.openDialog": "Calculate Missing Ratings",
    "plugins.sbcRatingCalculator.table.rating": "Rating",
    "plugins.sbcRatingCalculator.table.count": "Count",
    "plugins.sbcRatingCalculator.buttons.calculate": "Calculate",
    "plugins.sbcRatingCalculator.dialog.title": "Ratings Calculator",
    "plugins.sbcRatingCalculator.dialog.ranges.title": "Ratings to try",
    /// #endif

    /// #if process.env.CLAIM_OBJECTIVES
    "plugins.claimObjectives.settings.title": "Claim All Rewards",
    "plugins.claimObjectives.button.text": "Claim All Rewards",
    "plugins.claimObjectives.button.loading": "Claiming Rewards",
    /// #endif

    /// #if process.env.PACKS_OPENER
    "plugins.packsOpener.settings.title": "Packs Opener",
    "plugins.packsOpener.button.text": "Open Pack",
    "plugins.packsOpener.button.subtext": "Automatically",
    "plugins.packsOpener.purchaseAction.moveToClub": "Move To Club",
    "plugins.packsOpener.purchaseAction.moveToTransferList": "Move To Transfer List",
    "plugins.packsOpener.purchaseAction.quickSell": "Quick Sell",
    "plugins.packsOpener.purchaseAction.stopProcess": "Stop Buying Packs",
    "plugins.packsOpener.errors.missingPack": "No pack has been selected",
    "plugins.packsOpener.errors.generic": "There has been an error opening the pack",
    "plugins.packsOpener.errors.transferListFull": "The transfer list is full",
    "plugins.packsOpener.packsRemaining": "Only # packs left to be opened",
    "plugins.packsOpener.handlingNonDuplicatePlayers": "Processing non duplicate players",
    "plugins.packsOpener.handlingNonDuplicateManagers": "Processing non duplicate managers",
    "plugins.packsOpener.handlingNonDuplicateItems": "Processing non duplicate items",
    "plugins.packsOpener.handlingDuplicatePlayers": "Handling duplicate players",
    "plugins.packsOpener.handlingDuplicateManagers": "Handling duplicate managers",
    "plugins.packsOpener.handlingDuplicateItems": "Handling duplicate items",
    "plugins.packsOpener.handlingCredits": "Updating credits",
    "plugins.packsOpener.labels.purchaseAction.players": "¿What should I do with players?",
    "plugins.packsOpener.labels.purchaseAction.duplicatePlayers": "¿What should I do with duplicated players?",
    "plugins.packsOpener.labels.purchaseAction.managers": "¿What should I do with managers?",
    "plugins.packsOpener.labels.purchaseAction.duplicateManagers": "¿What should I do with duplicated managers?",
    "plugins.packsOpener.labels.purchaseAction.items": "¿What should I do with items that are NOT players and NOT managers?",
    "plugins.packsOpener.labels.purchaseAction.duplicateItems": "¿What should I do with duplicated items that are NOT players and NOT managers?",
    "plugins.packsOpener.labels.purchaseAction.transferListFull": "¿What should I do when the transfer list is full?",
    "plugins.packsOpener.labels.currency": "Type of currency to use",
    "plugins.packsOpener.labels.packsCount": "¿How many packs should I open?",
    "plugins.packsOpener.labels.speed": "Open Speed",
    "plugins.packsOpener.speed.slow": "Slow",
    "plugins.packsOpener.speed.fast": "Fast",
    "plugins.packsOpener.packResult.title": "Pack Opener Result",
    "plugins.packsOpener.packResult.html": "<ul><li><b>Opened Packs:</b><span>{packs}</span></li><li><b>Total Players:</b><span>{players}</span></li><li><b>Players sent to Club:</b><span>{playersToClub}</span></li><li><b>Players sent to Transfer list:</b><span>{playersToTransfer}</span></li><li><b>Discarded Players:</b><span>{playersDiscarded}</span></li><li><b>Duplicated Players:</b><span>{duplicatedPlayers}</span></li><li><b>Total Managers:</b><span>{managers}</span></li><li><b>Managers sent to Club:</b><span>{managersToClub}</span></li><li><b>Managers sent to Transfer List:</b><span>{managersToTransfer}</span></li><li><b>Discarded Managers:</b><span>{managersDiscarded}</span></li><li><b>Duplicated Managers:</b><span>{duplicatedManagers}</span></li><li><b>Total Items:</b><span>{items}</span></li><li><b>Items sent to Club:</b><span>{itemsToClub}</span></li><li><b>Items sent to Transfer List:</b><span>{itemsToTransfer}</span></li><li><b>Discarded Items:</b><span>{itemsDiscarded}</span></li><li><b>Duplicated Items:</b><span>{duplicatedItems}</span></li><li><b>Coins Spent:</b><span>{coinsSpent}</span></li><li><b>Coins Earned:</b><span>{coinsEarned}</span></li></ul>",

    /// #if process.env.DECIMAL_RATING
    "plugins.decimalRating.settings.title": "Decimal Rating",
    /// #endif

    /// #if process.env.LOWEST_MARKET_PRICE
    "plugins.lowestMarketPrice.button.text": "Find Lowest Market Price",
    "plugins.lowestMarketPrice.settings.title": "Lowest Market Price",
    /// #endif

    /// #if process.env.REPEAT_SBC
    "plugins.repeatSbc.button.text": "Repeat Search",
    "plugins.repeatSbc.settings.title": "Repeat SBC Search",
    /// #endif

    /// #if process.env.GO_TO_PACK_STORE
    "plugins.goToPackStore.settings.title": "Go To Pack Store",
    /// #endif

    /// #if process.env.BENCH_MANAGEMENT
    "plugins.benchManagement.settings.title": "Subs Management",
    "plugins.benchManagement.buttons.sendToField": "Send To Field",
    "plugins.benchManagement.buttons.sendToFieldKeepPos": "Send to Field to Position",
    "plugins.benchManagement.buttons.sendToClub": "Send to Club",
    /// #endif

    /// #if process.env.UNASSIGNED_DUPLICATES
    "plugins.unassignedDuplicates.settings.title": "Unassigned Duplicates",
    "plugins.unassignedDuplicates.buttons.switchUntradeables": "Switch Untradeables",
    /// #endif

    /// #if process.env.LOCK_PLAYERS
    "plugins.lockPlayers.settings.title": "Lock Players",
    "plugins.lockPlayers.button.massLock": "Lock / Unlock Players",
    "plugins.lockPlayers.messages.sbcWarning": "SBC Aborted - You have locked players in your squad",
    "plugins.lockPlayers.playerAction.lock": "Lock Player",
    "plugins.lockPlayers.playerAction.unlock": "Unlock Player",
    "plugins.lockPlayers.clubHub.tile": "Locked Players",
    /// #endif

    // #if process.env.UNASSIGNED_TO_SBC
    "plugins.unassignedToSbc.button.text": "Use unassigned players",
    "plugins.unassignedToSbc.settings.title": "Unassigned to SBC",
    "plugins.unassignedToSbc.button.textLoading": "Loading players from club... {count} loaded",
    /// #endif

    "plugins.warningScreen.title": "PALETOOLS - USAGE WARNING",
    "plugins.warningScreen.disclaimer": "<p>Dear user, since Paletools allows you to perform actions that were not design by EA and allows you to be much quicker in the usage of the WebApp you are at a potential risk of ban from EA</p><p><br /></p><p>Therefore you shall use it at your own discretion and you should be very cautious</p><p><br /></p><p>If you perform too many snipes in a row you might get a soft market ban or even worst a <b>permanent ban from the transfer market</b></p><p><br /></p><p>Please <b>USE THIS TOOL AT YOUR OWN RISK</b></p><p><br /></p><p>Thanks a have a nice day!</p>",

    "plugins.eaBugFixer.settings.title": "Fix EA mistakes"
};

