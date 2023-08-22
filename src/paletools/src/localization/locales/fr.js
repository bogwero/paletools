export default {
    "enabled": "Activé",
    "valide": "valide",
    "invalide": "invalide",
    "ui.loadingPlayers": "Chargement des joueurs du club: {count} chargé",
    "plugins.dangerous": "AVERTISSEMENT: l'activation de ce plugin pourrait éventuellement conduire à une interdiction potentielle d'EA, êtes-vous sûr de vouloir continuer?",
    "page.restart": "Veuillez recharger la page et réexécuter les outils de palet pour les modifications pour prendre effet",
    "market.itemBuy.success": "Article acheté avec succès! - {pièces de monnaie}",
    "confirm": "Êtes-vous sur de vouloir continuer?",
    "loading": "Chargement",
    "from": "Depuis",
    "to": "À",
    "extinct": "Éteint",
    "market": "Marché",
    "import": "Importer",
    "export": "Exporter",

    /// #if process.env.GRID_MODE
    "plugins.gridMode.title": "Mode grille",
    /// #endif

    /// #if process.env.WIDE_MODE
    "plugins.wideMode.title": "Mode large",
    /// #endif

    "plugins.donation.title": "Propulsé par Paletools",
    "plugins.donation.paypal": "Don PayPal",
    "plugins.donation.mercadopago": "Don de mercadopago",
    "plugins.donation.message": "Si vous aimez Paletools, veuillez envisager de faire un don",

    /// #if process.env.COMPARE_MIN_MAX_PRICES
    "plugins.compareMinMaxPrices.settings.title": "Comparer les prix",
    "plugins.compareMinMaxPrices.minPriceLabel": "Min Acheter maintenant",
    "plugins.compareMinMaxPrices.maxPriceLabel": "Max Acheter maintenant",
    /// #endif

    /// #if process.env.PLAYER_ACTIONS
    "plugins.playerActions.settings.title": "Actions des joueurs",
    "plugins.playerActions.settings.copyPlayerId": "Activer l'ID de copie",
    "plugins.playerActions.settings.futbinSearch": "Activer la recherche de futbin",
    "plugins.playerActions.settings.findLowestPrice": "Trouvez le prix du marché le plus bas",
    "plugins.playerActions.settings.listForProfit": "Liste de marché rapide - Afficher les boutons",
    "plugins.playerActions.settings.listForProfitAutoPublish": "Liste de marché rapide - publication automatique",
    "plugins.playerActions.settings.displayApplyConsumable": "Afficher toujours appliquer consommable",

    "plugins.playerActions.copyPlayerId": "Copier l'ID du joueur dans le presse-papiers",
    "plugins.playerActions.futbinSearch": "Recherche de futbin",
    "plugins.playerActions.findLowestPrice.button": "Trouvez le prix du marché le plus bas",
    "plugins.playerActions.findLowestPrice.notFound": "Éteint",
    "plugins.playerActions.findLowestPrice.searching": "Recherche...",
    "plugins.playerActions.listForProfit.button.set": "AJOUTER %",
    "plugins.playerActions.listForProfit.button.market": "Le moins cher",
    /// #endif

    /// #if process.env.MARKET_SEARCH_FILTERS
    "plugins.marketSearchFilters.settings.title": "Filtres de recherche de marché",
    "plugins.marketSearchFilters.settings.savedFilters": "Activer les filtres enregistrés",
    "plugins.marketSearchFilters.settings.playerId": "Activer l'ID du joueur",
    "plugins.marketSearchFilters.settings.playerRating": "Activer la notation des joueurs",
    "plugins.marketSearchFilters.settings.hideDuplicates": "Masquer les doublons des joueurs dans la recherche de marché",
    "plugins.marketSearchFilters.filterSaved": "Filtre enregistré",
    "plugins.marketSearchFilters.filterDeleted": "Filtre supprimé",
    "plugins.marketSearchFilters.loadFilters": "- sélectionnez un filtre à charger -",
    "plugins.marketSearchFilters.playerId": "ID du joueur",
    "plugins.marketSearchFilters.playerRating": "Cote de joueur",
    "plugins.marketSearchFilters.filter.name": "Nom de filtre",
    "plugins.marketSearchFilters.filter.save": "Sauvegarder",
    "plugins.marketSearchFilters.filter.delete": "Supprimer",
    "plugins.marketSearchFilters.playerIdWarning": "Ceci est une fonctionnalité expérimentale et pourrait potentiellement vous conduire à votre compte, êtes-vous sûr de vouloir l'activer?",
    /// #endif

    /// #if process.env.SNIPE
    "plugins.snipe.settings.title": "Tireur d'élite",
    "plugins.snipe.settings.enableDisable": "Activer désactiver",
    "plugins.snipe.settings.results.pressEnter": "Appuyez automatiquement sur Entrée après l'achat",
    "plugins.snipe.settings.oneTouch.isEnabled": "Une touche Snipe",
    "plugins.snipe.settings.back": "Retourner",
    "plugins.snipe.settings.search.search": "Recherche",
    "plugins.snipe.settings.results.buy": "Acheter maintenant",
    "plugins.snipe.settings.search.resetBid": "Réinitialiser l'offre",
    "plugins.snipe.settings.results.bid": "Offre",
    "plugins.snipe.settings.results.transfer": "Envoyer l'article à la liste de transfert",
    "plugins.snipe.settings.results.club": "Envoyer l'article au club",
    "plugins.snipe.settings.results.sell": "Article de vente rapide",
    "plugins.snipe.settings.results.compare": "Comparez le prix",
    "plugins.snipe.settings.lists.up": "Sélectionnez le joueur précédent dans les listes",
    "plugins.snipe.settings.lists.down": "Sélectionnez le joueur suivant dans les listes",
    "plugins.snipe.settings.lists.prev": "Passez à la page précédente",
    "plugins.snipe.settings.lists.next": "Aller à la page suivante",
    "plugins.snipe.settings.search.decMinBid": "Diminuer la valeur de l'offre min",
    "plugins.snipe.settings.search.incMinBid": "Augmenter la valeur de l'offre min",
    "plugins.snipe.settings.search.decMaxBid": "Diminuer la valeur de l'offre maximale",
    "plugins.snipe.settings.search.incMaxBid": "Augmenter la valeur de l'offre maximale",
    "plugins.snipe.settings.search.decMinBuy": "Diminuez Min Acheter maintenant Valeur",
    "plugins.snipe.settings.search.incMinBuy": "Augmenter la valeur Min Acheter maintenant",
    "plugins.snipe.settings.search.decMaxBuy": "Diminuer max acheter maintenant la valeur",
    "plugins.snipe.settings.search.incMaxBuy": "Augmenter maximum acheter maintenant la valeur",
    "plugins.snipe.settings.search.oneTouchMinBid": "Enchère",
    "plugins.snipe.settings.search.oneTouchMinBuy": "Snipe Acheter maintenant",
    "plugins.snipe.settings.oneTouch.displayMinBid": "Afficher un bouton d'offre de snipe tactile",
    "plugins.snipe.settings.oneTouch.displayMinBuy": "Afficher un bouton d'achat de snipe tactile",
    "plugins.snipe.settings.oneTouch.superMode": "One Touch Smart Mode",
    "plugins.snipe.settings.legacyMode": "Utilisez le mode héritage pour acheter des cartes (Palesnipe 3.1)",
    /// #endif

    /// #if process.env.SNIPE_MOBILE
    "plugins.snipeMobile.settings.title": "Tireur d'élite",
    "plugins.snipeMobile.settings.autoBack": "Revenez automatiquement",
    "plugins.snipeMobile.button.goBack": "DOS",
    /// #endif

    // #if process.env.DUPLICATED_TO_SBC
    "plugins.duplicatedToSbc.button.text": "Utilisez des joueurs dupliqués",
    "plugins.duplicatedToSbc.settings.title": "Duplifié à SBC",
    "plugins.duplicatedToSbc.button.textLoading": "Chargement des joueurs du club ... {count} chargé",
    /// #endif

    // #if process.env.TRANSFER_LIST_TO_SBC
    "plugins.transferListToSbc.button.text": "Utiliser les joueurs de la liste de transfert",
    "plugins.transferListToSbc.settings.title": "Transférer la liste vers SBC",
    "plugins.transferListToSbc.button.textLoading": "Chargement des joueurs du club ... {count} chargé",
    /// #endif

    /// #if process.env.SELECT_CHEAPEST
    "plugins.selectCheapest.settings.title": "Sélectionnez automatiquement le joueur le moins cher",
    "plugins.selectCheapest.banner.text": "Mas Barato: {nom} - {MinBuynow}",
    /// #endif

    /// #if process.env.FILL_SBC_FROM_FUTBIN
    "plugins.fillSbcFromFutbin.settings.title": "Remplissez SBC avec Futbin",
    "plugins.fillSbcFromFutbin.settings.importToolLabel": "Installer le lien futbin",
    "plugins.fillSbcFromFutbin.settings.importToolLinkText": "Exporter Futbin SBC",
    "plugins.fillSbcFromFutbin.settings.installInstructions": "Faites glisser le lien d'installation vers la barre des signets",
    "plugins.fillSbcFromFutbin.button.text": "Importer SBC de Futbin",
    "plugins.fillSbcFromFutbin.button.textLoading": "Chargement des joueurs du club ... {count} chargé",
    "plugins.fillSbcFromFutbin.copyError": "Il y a eu une erreur d'importation de SBC de Futbin, assurez-vous d'utiliser d'abord l'exportation de Futbin SBC",
    /// #endif

    /// #if process.env.MARK_DUPLICATED
    "plugins.markDuplicated.settings.title": "Mettre en surbrillance les joueurs dupliqués",
    /// #endif

    /// #if process.env.IMPROVED_PLAYER_SEARCH
    "plugins.improvedPlayerSearch.settings.title": "Recherche de joueurs améliorée",
    /// #endif

    /// #if process.env.SBC_SELECT_MULTIPLE_PLAYERS
    "plugins.sbcSelectMultiplePlayers.settings.title": "Sélectionnez plusieurs joueurs sur SBCS",
    // #endif

    /// #if process.env.FILTER_SBCS
    "plugins.filterSbcs.settings.title": "Filtre les SBC",
    "plugins.filterSbcs.label": "Recherche",
    "plugins.filterSbcs.sort.label": "-- Trier par --",
    "plugins.filterSbcs.sort.byId": "Tout d'abord ajouté",
    "plugins.filterSbcs.sort.byEndTime": "Ferme l'expiration en premier",
    "plugins.filterSbcs.sort.byTimesCompleted": "Plus de fois terminé en premier",
    "plugins.filterSbcs.sort.byChallengesCompletedCount": "Plus terminé d'abord",
    // #endif

    /// #if process.env.SETTINGS_MENU
    "plugins.settings.title": "Paletols",
    "plugins.settings.reset": "Réinitialiser les paramètres par défaut",
    /// #endif

    /// #if process.env.CLUB_ANALYZER
    "plugins.clubAnalyzer.settings.title": "Analyseur de club",
    "plugins.clubAnalyzer.settings.autoRefresh": "Actualisation automatique",
    "plugins.clubAnalyzer.view.dashboard.description": "Les joueurs comptent (y compris dupliqués, à l'exclusion des prêts) dans le club non né jusqu'à 50, Watchlist (gagné) jusqu'à 100 et TradePile",
    "plugins.clubAnalyzer.view.loading.players": "Chargement des joueurs {count} chargé ...",
    "plugins.clubAnalyzer.view.loading.usermassinfo": "Chargement des données des joueurs non attribués ...",
    "plugins.clubAnalyzer.view.loading.watchlist": "Chargement des données de liste de surveillance ...",
    "plugins.clubAnalyzer.view.loading.tradepile": "Chargement des données TradePile ...",
    "plugins.clubAnalyzer.view.loading.process": "Traitement des informations",
    "plugins.clubAnalyzer.view.buttons.reload": "Recharger",
    "plugins.clubAnalyzer.view.buttons.exportCsv": "Exporter comme CSV",
    "plugins.clubAnalyzer.view.buttons.exportHtml": "Exporter comme HTML",
    "plugins.clubAnalyzer.view.tab.club": "Acheté @ club",
    /// #endif

    /// #if process.env.SHOW_CONSOLE_OUTPUT
    "plugins.showConsoleOutput.settings.title": "Afficher la sortie de la console",
    /// #endif

    /// #if process.env.SBC_TIMES_COMPLETED
    "plugins.sbcTimesCompleted.settings.title": "Notification terminée SBC Times",
    /// #endif

    /// #if process.env.COUNT_MY_PACKS
    "plugins.countMyPacks.settings.title": "Mon compteur de packs",
    /// #endif

    /// #if process.env.MY_PACKS
    "plugins.myPacks.settings.title": "Mes packs",
    "plugins.myPacks.settings.group": "Groupe",
    "plugins.myPacks.settings.filter": "Filtre",
    "plugins.myPacks.settings.packCollector": "Collectionneur de packs",
    "plugins.myPacks.filter.label": "Recherchez mes packs",
    "plugins.myPacks.filter.default": "- tous mes packs -",
    "plugins.myPacks.packCollector.link.text": "Collection de pack ouvert",
    /// #endif

    /// #if process.env.TRANSFER_LIST_SEND_ALL_TO_CLUB
    "plugins.transferListSendAllToClub.settings.title": "Envoyer non dupliqué de la liste de transfert au club",
    "plugins.transferListSendAllToClub.button.text": "Envoyer non dupliqué au club",
    /// #endif

    /// #if process.env.SBC_BUILDER_ENHACER
    "plugins.sbcBuilderEnhacer.settings.title": "SBC Builder Enhacer",
    "plugins.sbcBuilderEnhacer.filter.ratings.title": "Notes",
    "plugins.sbcBuilderEnhacer.filter.ratings.min.label": "Min",
    "plugins.sbcBuilderEnhacer.filter.ratings.max.label": "Max",
    "plugins.sbcBuilderEnhacer.filter.settings.title": "Paramètres",
    "plugins.sbcBuilderEnhacer.filter.settings.maxPlayers.label": "Les joueurs comptent",
    "plugins.sbcBuilderEnhacer.filter.search.ignorePlayersPos": "Ignorer les positions des joueurs",
    "plugins.sbcBuilderEnhacer.filter.search.importantLeaguesOnly": "Ligues importantes uniquement",
    "plugins.sbcBuilderEnhacer.filter.search.unimportantLeaguesOnly": "Les ligues pas importantes seulement",
    "plugins.sbcBuilderEnhacer.filter.settings.playersFromSameClub.label": "Joueurs max du même club",
    /// #endif


    /// #if process.env.CLUB_SEARCH_ENHACER
    "plugins.clubSearchEnhacer.settings.title": "Recherche de club",
    /// #endif

    /// #if process.env.SBC_SMART_BUILDER
    "plugins.sbcSmartBuilder.button.text": "Constructeur intelligent",
    /// #endif

    /// #if process.env.DISABLE_PACK_ANIMATIONS
    "plugins.disablePackAnimations.settings.title": "Désactiver les animations d'ouverture du pack",
    /// #endif

    /// #if process.env.KEEP_PLAYER_SELL_VALUES
    "plugins.keepPlayerSellValues.settings.title": "Gardez les valeurs de vente des joueurs",
    /// #endif

    /// #if process.env.SELL_MULTIPLE
    "plugins.sellMultiple.settings.title": "Vendre plusieurs articles à la fois",
    "plugins.sellMultiple.button.text": "Vendre plusieurs",
    "plugins.sellMultiple.button.quickSellText": "Vendre rapide multiple",
    "plugins.sellMultiple.label.ignoredCards": "La carte sera ignorée si la gamme de prix ne tombe pas dans les valeurs fournies",
    "plugins.sellMultiple.warning": "Il s'agit d'une fonction d'automatisation, votre compte pourrait potentiellement être interdit si vous en abusiez, êtes-vous sûr de vouloir l'activer?",
    "plugins.sellMultiple.notifications.maxPlayersReached": "Vous avez atteint la limite des {joueurs} joueurs que vous pouvez lister",
    "plugins.sellMultiple.notifications.wait": "Veuillez patienter {secondes} secondes avant d'exécuter une autre liste",
    /// #endif

    /// #if process.env.INCREASE_ALLOWED_AUCTIONS
    "plugins.increaseAllowedAuctions.settings.title": "Augmenter les enchères autorisées",
    /// #endif

    /// #if process.env.PLAYER_CARD_INFO
    "plugins.playerCardInfo.settings.title": "Afficher les informations de carte supplémentaires",
    "plugins.playerCardInfo.settings.alternatePositions": "Afficher les positions alternatives",
    "plugins.playerCardInfo.settings.skillMoves": "Afficher les mouvements de compétences",
    "plugins.playerCardInfo.settings.weakFoot": "Afficher le pied faible",
    "plugins.playerCardInfo.settings.untradeable": "Afficher l'icône non tradable",
    "plugins.playerCardInfo.settings.pristine": "Afficher si une carte est vierge (7 contrats, 1 propriétaire) uniquement sur les résultats de la recherche",
    "plugins.playerCardInfo.settings.contracts": "Afficher les contrats",
    "plugins.playerCardInfo.settings.league": "Ligue d'affichage",
    "plugins.playerCardInfo.settings.importantLeague": "Mettre en évidence la ligue importante",
    /// #endif

    /// #if process.env.TRACK_TRANSACTIONS
    "plugins.trackTransactions.settings.title": "Enregistrer les informations sur les transactions",
    /// #endif

    /// #if process.env.SELL_PROFIT
    "plugins.sellProfit.settings.title": "Show Sell Profit",
    "plugins.sellProfit.realProfit.text": "Profit",
    "plugins.sellProfit.expectedProfit.text": "Bénéfice attendu",
    /// #endif

    /// #if process.env.TRANSACTIONS_HISTORY
    "plugins.transactionsHistory.settings.title": "Historique des transactions",
    "plugins.transactionsHistory.panel.title": "Historique des transactions",
    "plugins.transactionsHistory.panel.label": "Tous",
    "plugins.transactionsHistory.panel.bought": "Acheté",
    "plugins.transactionsHistory.panel.sold": "Vendu",
    "plugins.transactionsHistory.view.menu.dashboard": "Tableau de bord",
    "plugins.transactionsHistory.view.table.date": "Date",
    "plugins.transactionsHistory.view.table.item": "Article",
    "plugins.transactionsHistory.view.table.price": "Pièces de monnaie",
    "plugins.transactionsHistory.view.buttons.filterAujourd'hui": "Aujourd'hui",
    "plugins.transactionsHistory.view.buttons.filterWeek": "Cette semaine",
    "plugins.transactionsHistory.view.buttons.filterMonth": "Ce mois-ci",
    "plugins.transactionsHistory.view.buttons.filterAnyMonth": "-- Sélectionnez un mois --",
    "plugins.transactionsHistory.view.dashboard.month": "Mois",
    "plugins.transactionsHistory.view.buttons.reindex": "Base de données Re-index",
    "plugins.transactionsHistory.view.buttons.exportCsv": "Exporter comme CSV",
    "plugins.transactionsHistory.view.buttons.clear": "Réinitialiser la base de données",
    /// #endif

    /// #if process.env.IMPORTANT_LEAGUES
    "plugins.importantLeagues.settings.title": "Ligues importantes",
    /// #endif

    /// #if process.env.REFRESH_COINS
    "plugins.refreshCoins.settings.title": "Rafraîchir les pièces",
    /// #endif

    /// #if process.env.EXPERIMENTAL
    "plugins.experimental.settings.title": "Des trucs expérimentaux - Utilisez à vos risques et périls",
    "plugins.experimental.settings.fastClubSearch": "Recherche de club rapide",
    /// #endif

    /// #if process.env.SBC_RATING_CALCULATOR
    "plugins.sbcRatingCalculator.settings.title": "Calculatrice de notes",
    "plugins.sbcRatingCalculator.buttons.openDialog": "Calculer les notes manquantes",
    "plugins.sbcNotationCalculator.table.rating": "Notation",
    "plugins.sbcRatingCalculator.table.count": "Compter",
    "plugins.sbcRatingCalculator.buttons.calculate": "Calculer",
    "plugins.sbcRatingCalculator.dialog.title": "Calculatrice de notes",
    "plugins.sbcRatingCalculator.dialog.ranges.title": "Notes pour essayer",
    /// #endif

    /// #if process.env.CLAIM_OBJECTIVES
    "plugins.claimObjectives.settings.title": "Réclamer toutes les récompenses",
    "plugins.claimObjectives.button.text": "Réclamer toutes les récompenses",
    "plugins.claimObjectives.button.loading": "Réclamer des récompenses",
    /// #endif

    /// #if process.env.PACKS_OPENER
    "plugins.packsOpener.settings.title": "Ouvre-packs",
    "plugins.packsOpener.button.text": "Pack ouvert",
    "plugins.packsOpener.button.subtext": "Automatiquement",
    "plugins.packsOpener.purchaseAction.moveToClub": "Déménager au club",
    "plugins.packsOpener.purchaseAction.moveToTransferList": "Passer à la liste de transfert",
    "plugins.packsOpener.purchaseAction.quickSell": "Vente rapide",
    "plugins.packsOpener.purchaseAction.stopProcess": "Arrêtez d'acheter des packs",
    "plugins.packsOpener.errors.missingPack": "Aucun pack n'a été sélectionné",
    "plugins.packsOpener.errors.generic": "Il y a eu une erreur ouvrant le pack",
    "plugins.packsOpener.errors.transferListFull": "La liste de transfert est complète",
    "plugins.packsOpener.packsRemaining": "Seulement",
    "plugins.packsOpener.handlingNonDuplicatePlayers": "Traitement des joueurs non en double",
    "plugins.packsOpener.handlingNonDuplicateManagers": "Traitement des gestionnaires non en double",
    "plugins.packsOpener.handlingNonDuplicateItems": "Traitement des articles non en double",
    "plugins.packsOpener.handlingDuplicatePlayers": "Traiter les joueurs en double",
    "plugins.packsOpener.handlingDuplicateManagers": "Gestion des managers en double",
    "plugins.packsOpener.handlingDuplicateItems": "Gestion des articles en double",
    "plugins.packsOpener.handlingCredits": "Mise à jour des crédits",
    "plugins.packsOpener.labels.purchaseAction.players": "¿Que dois-je faire avec les joueurs?",
    "plugins.packsOpener.labels.purchaseAction.duplicatePlayers": "¿Que dois-je faire avec les joueurs dupliqués?",
    "plugins.packsOpener.labels.purchaseAction.managers": "¿Que dois-je faire avec les managers?",
    "plugins.packsOpener.labels.purchaseAction.duplicateManagers": "¿Que dois-je faire avec les gestionnaires dupliqués?",
    "plugins.packsOpener.labels.purchaseAction.items": "¿Que dois-je faire avec des objets qui ne sont pas des joueurs et pas des managers?",
    "plugins.packsOpener.labels.purchaseAction.duplicateItems": "¿Que dois-je faire avec des objets dupliqués qui ne sont pas des joueurs et pas des managers?",
    "plugins.packsOpener.labels.purchaseAction.transferListFull": "¿Que dois-je faire lorsque la liste de transfert est pleine?",
    "plugins.packsOpener.labels.currency": "Type de monnaie à utiliser",
    "plugins.packsOpener.labels.packsCount": "¿Combien de packs dois-je ouvrir?",
    "plugins.packsOpener.labels.speed": "Vitesse ouverte",
    "plugins.packsOpener.speed.slow": "Lent",
    "plugins.packsOpener.speed.fast": "Rapide",
    "plugins.packsOpener.packResult.title": "Résultat de l'ouverture du pack",
    "plugins.packsOpener.packResult.html": "<ul><li><b>Packs ouverts :</b><span>{packs}</span></li><li><b>Nombre total de joueurs :</b><span>{players}</span>< /li><li><b>Joueurs envoyés au club :</b><span>{playersToClub}</span></li><li><b>Joueurs envoyés à la liste de transfert :</b><span >{playersToTransfer}</span></li><li><b>Joueurs rejetés :</b><span>{playersDiscarded}</span></li><li><b>Joueurs en double :</ b><span>{duplicatedPlayers}</span></li><li><b>Entraîneurs totaux :</b><span>{managers}</span></li><li><b>Entraîneurs envoyé au club :</b><span>{managersToClub}</span></li><li><b>Managers envoyés à la liste de transfert :</b><span>{managersToTransfer}</span></ li><li><b>Administrateurs supprimés :</b><span>{managersDiscarded}</span></li><li><b>Administrateurs en double :</b><span>{duplicatedManagers}</ span></li><li><b>Total des articles :</b><span>{items}</span></li><li><b>Articles envoyés au club :</b><span >{itemsToClub}</span></li><li><b>Éléments envoyés à la liste de transfert :</b><span>{itemsToTransfer}</span></li><li><b>Éléments rejetés :</b><span>{itemsDiscarded}</span></li><li><b>Éléments dupliqués :</b><span>{duplicatedItems}</span></li><li>< b>Pièces dépensées :</b><span>{coinsSpent}</span></li><li><b>Pièces gagnées :</b><span>{coinsEarned}</span></li></ul>",

    /// #if process.env.DECIMAL_RATING
    "plugins.decimalRating.settings.title": "Décimal",
    /// #endif

    /// #if process.env.LOWEST_MARKET_PRICE
    "plugins.lowestMarketPrice.button.text": "Trouver le prix du marché le plus bas",
    "plugins.lowestMarketPrice.settings.title": "Prix ​​du marché le plus bas",
    /// #endif

    /// #if process.env.REPEAT_SBC
    "plugins.repeatSbc.button.text": "Répéter la recherche",
    "plugins.repeatSbc.settings.title": "Répéter la recherche SBC",
    /// #endif

    /// #if process.env.GO_TO_PACK_STORE
    "plugins.goToPackStore.settings.title": "Aller au magasin de pack",
    /// #endif

    /// #if process.env.BENCH_MANAGEMENT
    "plugins.benchManagement.settings.title": "Gestion des remplaçants",
    "plugins.benchManagement.buttons.sendToField": "Envoyer au champ",
    "plugins.benchManagement.buttons.sendToFieldKeepPos": "Envoyer au champ à la position",
    "plugins.benchManagement.buttons.sendToClub": "Envoyer au club",
    /// #endif

    /// #if process.env.UNASSIGNED_DUPLICATES
    "plugins.unassignedDuplicates.settings.title": "Doublons non attribués",
    "plugins.unassignedDuplicates.buttons.switchUntradeables": "Changer les objets non échangeables",
    /// #endif

    /// #if process.env.LOCK_PLAYERS
    "plugins.lockPlayers.settings.title": "Verrouiller les joueurs",
    "plugins.lockPlayers.button.massLock": "Verrouiller / déverrouiller les joueurs",
    "plugins.lockPlayers.messages.sbcWarning": "SBC abandonné - vous avez verrouillé les joueurs dans votre équipe",
    "plugins.lockPlayers.playerAction.lock": "Joueur de verrouillage",
    "plugins.lockPlayers.playerAction.unlock": "Déverrouiller le joueur",
    "plugins.lockPlayers.clubHub.tile": "Joueurs verrouillés",
    "plugins.lockPlayers.duplicated.dialogTitle": "Joueurs en double verrouillés",
    "plugins.lockPlayers.duplicated.dialogText": "Voulez-vous envoyer des joueurs en double verrouillés ?",
    "plugins.lockPlayers.import.dialogTitle": "Importer des joueurs verrouillés",
    /// #endif

    // #if process.env.UNASSIGNED_TO_SBC
    "plugins.unassignedToSbc.button.text": "Utiliser des joueurs non assignés",
    "plugins.unassignedToSbc.settings.title": "CNon attribué à SBC",
    "plugins.unassignedToSbc.button.textLoading": "Chargement des joueurs du club",
    /// #endif

    "plugins.warningScreen.title": "Paletools - Avertissement d'utilisation",
    "plugins.warningScreen.disclaimer": "<p> Cher utilisateur, puisque Paletools vous permet d'effectuer des actions qui n'étaient pas conçues par EA et vous permet d'être beaucoup plus rapide dans l'utilisation de la webapp que vous êtes à un risque potentiel d'interdiction d'EA </p> <p> < br /> </p> <p> Par conséquent, vous devez l'utiliser à votre discrétion et vous devriez être très prudent </p> <p> <br /> </p> <p> si vous effectuez trop de snipes Une ligne, vous pourriez obtenir une interdiction de marché en douce Outil à vos risques et périls </b> </p> <p> <br /> </p> <p> Merci une bonne journée! </p>",

    "plugins.eaBugFixer.settings.title": "Fixer les erreurs d'EA"
};

