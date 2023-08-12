export default {
    "enabled": "Habilitado",
    "valid": "válido",
    "invalid": "inválido",
    "ui.loadingPlayers": "Cargando club: {count} jugadores cargados",
    "plugins.dangerous": "CUIDADO: Habilitar este plugin puede llevar eventualmente a un BAN por parte de EA de tu cuenta, ¿ESTAS SEGURO DE QUERER CONTINUAR?",
    "page.restart": "Por favor recarga la página y re ejecuta Paletools para que los cambios tomen efecto",
    "market.itemBuy.success": "¡Compra realizada correctamente! - {coins}",
    "confirm": "¿Estas seguro de querer continuar?",
    "loading": "Cargando",
    "from": "Desde",
    "to": "Hasta",
    "extinct": "Extinto",
    "market": "Mercado",

    /// #if process.env.GRID_MODE
    "plugins.gridMode.title": "Modo grilla",
    /// #endif

    /// #if process.env.WIDE_MODE
    "plugins.wideMode.title": "Modo ancho",
    /// #endif

    "plugins.donation.title": "Potenciado por Paletools",
    "plugins.donation.paypal": "Donación PayPal",
    "plugins.donation.mercadopago": "Donación MercadoPago",
    "plugins.donation.message": "Si estas disfrutando Paletools por favor considera realizar una donación",

    /// #if process.env.COMPARE_MIN_MAX_PRICES
    "plugins.compareMinMaxPrices.settings.title": "Comparar Precios",
    "plugins.compareMinMaxPrices.minPriceLabel": "Min. Comp. Ahora",
    "plugins.compareMinMaxPrices.maxPriceLabel": "Max. Comp. Ahora",
    /// #endif

    /// #if process.env.PLAYER_ACTIONS
    "plugins.playerActions.settings.title": "Acciones del Jugador",
    "plugins.playerActions.settings.copyPlayerId": "Habilitar copiar Id del jugador",
    "plugins.playerActions.settings.futbinSearch": "Habilitar búsqueda en FUTBIN",
    "plugins.playerActions.settings.findLowestPrice": "Buscar el valor más barato",
    "plugins.playerActions.settings.listForProfit": "Botones de listado rápido en el mercado",
    "plugins.playerActions.settings.displayApplyConsumable": "Siempre mostrar aplicar consumibles",

    "plugins.playerActions.copyPlayerId": "Copiar Id del jugador al portapapeles",
    "plugins.playerActions.futbinSearch": "Buscar en FUTBIN",
    "plugins.playerActions.findLowestPrice.button": "Buscar el valor más barato",
    "plugins.playerActions.findLowestPrice.notFound": "Extincto",
    "plugins.playerActions.findLowestPrice.searching": "Buscando...",
    "plugins.playerActions.settings.listForProfit": "Listado rápido - mostrar botones",
    "plugins.playerActions.settings.listForProfitAutoPublish": "Listado rápido - auto publicar",
    "plugins.playerActions.listForProfit.button.set": "SUMAR %",
    "plugins.playerActions.listForProfit.button.market": "Mas Barato",
    /// #endif

    /// #if process.env.MARKET_SEARCH_FILTERS
    "plugins.marketSearchFilters.settings.title": "Filtros de Búsqueda del Mercado",
    "plugins.marketSearchFilters.settings.savedFilters": "Habilitar filtros guardados",
    "plugins.marketSearchFilters.settings.playerId": "Habilitar Id del jugador",
    "plugins.marketSearchFilters.settings.playerRating": "Habilitar valoración del jugador",
    "plugins.marketSearchFilters.settings.hideDuplicates": "Ocultar jugadores duplicados en el mercado",
    "plugins.marketSearchFilters.filterSaved": "Filtro guardado",
    "plugins.marketSearchFilters.filterDeleted": "Filter eliminado",
    "plugins.marketSearchFilters.loadFilters": "-- Elija un filtro a cargar --",
    "plugins.marketSearchFilters.playerId": "Id del jugador",
    "plugins.marketSearchFilters.playerRating": "Valoración del jugador",
    "plugins.marketSearchFilters.filter.name": "Nombre del filtro",
    "plugins.marketSearchFilters.filter.save": "Guardar",
    "plugins.marketSearchFilters.filter.delete": "Eliminar",
    "plugins.marketSearchFilters.playerIdWarning": "Esta funcionalidad es EXPERIMENTAL y podría llevar a que tu cuenta sea suspendida, ¿estas seguro de querer activarla?",
    /// #endif

    /// #if process.env.SNIPE
    "plugins.snipe.settings.title": "Sniping",
    "plugins.snipe.settings.enableDisable": "Habilitar / Deshabilitar",
    "plugins.snipe.settings.results.pressEnter": "Auto presionar ENTER después de comprar",
    "plugins.snipe.settings.oneTouch.isEnabled": "Modo Snipe de Un Toque (Tuki)",
    "plugins.snipe.settings.back": "Volver atrás",
    "plugins.snipe.settings.search.search": "Buscar",
    "plugins.snipe.settings.results.buy": "Comprar ahora",
    "plugins.snipe.settings.search.resetBid": "Resetear puja",
    "plugins.snipe.settings.results.bid": "Pujar",
    "plugins.snipe.settings.results.transfer": "Enviar item a a lista de transferencia",
    "plugins.snipe.settings.results.club": "Enviar item al club",
    "plugins.snipe.settings.results.sell": "Venta rápida",
    "plugins.snipe.settings.results.compare": "Comparar precio",
    "plugins.snipe.settings.lists.up": "Seleccionar el item anterior en la lista",
    "plugins.snipe.settings.lists.down": "Seleccionar el item siguiente en la lista",
    "plugins.snipe.settings.lists.prev": "Ir a la página anterior",
    "plugins.snipe.settings.lists.next": "Ir a la página siguiente",
    "plugins.snipe.settings.search.decMinBid": "Disminuir puja mínima",
    "plugins.snipe.settings.search.incMinBid": "Aumentar puja mínima",
    "plugins.snipe.settings.search.decMaxBid": "Disminuir puja máxima",
    "plugins.snipe.settings.search.incMaxBid": "Aumentar puja máxima",
    "plugins.snipe.settings.search.decMinBuy": "Disminuir comprar ahora mínimo",
    "plugins.snipe.settings.search.incMinBuy": "Aumentar comprar ahora mínimo",
    "plugins.snipe.settings.search.decMaxBuy": "Disminuir comprar ahora máximo",
    "plugins.snipe.settings.search.incMaxBuy": "Aumentar comprar ahora máximo",
    "plugins.snipe.settings.search.oneTouchMinBid": "Snipe +Puja",
    "plugins.snipe.settings.search.oneTouchMinBuy": "Snipe +Comprar Ahora",
    "plugins.snipe.settings.oneTouch.displayMinBid": "Mostrar boton Snipe +Puja",
    "plugins.snipe.settings.oneTouch.displayMinBuy": "Mostrar boton Snipe +Comprar Ahora",
    "plugins.snipe.settings.oneTouch.superMode": "Modo Snipe inteligente",
    "plugins.snipe.settings.legacyMode": "Usar modo legacy para comprar (palesnipe 3.1)",
    /// #endif

    /// #if process.env.SNIPE_MOBILE
    "plugins.snipeMobile.settings.title": "Sniping",
    "plugins.snipeMobile.settings.autoBack": "Ir hacia atrás automáticamente",
    "plugins.snipeMobile.button.goBack": "VOLVER",
    /// #endif

    // #if process.env.DUPLICATED_TO_SBC
    "plugins.duplicatedToSbc.button.text": "Usar jugadores duplicados",
    "plugins.duplicatedToSbc.settings.title": "Duplicados a SBC",
    "plugins.duplicatedToSbc.button.textLoading": "Cargando club... {count} jugadores cargados",
    /// #endif

    // #if process.env.TRANSFER_LIST_TO_SBC
    "plugins.transferListToSbc.button.text": "Usar jugadores de la lista de transferencia",
    "plugins.transferListToSbc.settings.title": "Lista de Transferencia a SBC",
    "plugins.transferListToSbc.button.textLoading": "Cargando club... {count} jugadores cargados",
    /// #endif

    /// #if process.env.SELECT_CHEAPEST
    "plugins.selectCheapest.settings.title": "Elegir el jugador mas barato automáticamente",
    "plugins.selectCheapest.banner.text": "Mas Barato: {name} - {minBuyNow}",
    /// #endif

    /// #if process.env.FILL_SBC_FROM_FUTBIN
    "plugins.fillSbcFromFutbin.settings.title": "Completar SBC con FUTBIN",
    "plugins.fillSbcFromFutbin.settings.importToolLabel": "Link de instalación",
    "plugins.fillSbcFromFutbin.settings.importToolLinkText": "Exportar SBC de FUTBIN",
    "plugins.fillSbcFromFutbin.settings.installInstructions": "Arrastre el link de instalación a la barra de marcadores",
    "plugins.fillSbcFromFutbin.button.text": "Importar SBC desde FUTBIN",
    "plugins.fillSbcFromFutbin.button.textLoading": "Cargando club... {count} jugadores cargados",
    "plugins.fillSbcFromFutbin.copyError": "Hubo un error importando el SBC desde FUTBIN, asegúrate de usar la herramienta Exportar SBC de FUTBIN antes",
    /// #endif

    /// #if process.env.MARK_DUPLICATED
    "plugins.markDuplicated.settings.title": "Marcar jugadores duplicados",
    /// #endif

    /// #if process.env.IMPROVED_PLAYER_SEARCH
    "plugins.improvedPlayerSearch.settings.title": "Búsqueda de jugadores mejorada",
    /// #endif

    /// #if process.env.SBC_SELECT_MULTIPLE_PLAYERS
    "plugins.sbcSelectMultiplePlayers.settings.title": "Elegir multiples jugadores en un SBC",
    // #endif

    /// #if process.env.FILTER_SBCS
    "plugins.filterSbcs.settings.title": "Filtrar SBCs",
    "plugins.filterSbcs.label": "Buscar",
    "plugins.filterSbcs.sort.label": "-- Ordenar --",
    "plugins.filterSbcs.sort.byId": "Agregados Recientemente Primero",
    "plugins.filterSbcs.sort.byEndTime": "Expiración Mas Cercana Primero",
    "plugins.filterSbcs.sort.byTimesCompleted": "Mayor Cantidad de Veces Completado Primero",
    "plugins.filterSbcs.sort.byChallengesCompletedCount": "Mayor Cantidad de Desafíos Completados Primero",
    // #endif

    /// #if process.env.SETTINGS_MENU
    "plugins.settings.title": "Paletools",
    "plugins.settings.reset": "Reset a los valores predeterminados",
    /// #endif

    /// #if process.env.CLUB_ANALYZER
    "plugins.clubAnalyzer.settings.title": "Club Analyzer",
    "plugins.clubAnalyzer.settings.autoRefresh": "Actualización Automática",
    "plugins.clubAnalyzer.view.dashboard.description": "Cantidad de jugadores (incluye duplicados, no incluye préstamos + hasta 50 jugadores sin asignar + hasta 100 jugadores de la watchlist (solo los ganados) + la lista de transferibles",
    "plugins.clubAnalyzer.view.loading.players": "Cargando jugadores, {count} cargados...",
    "plugins.clubAnalyzer.view.loading.usermassinfo": "Cargando jugadores sin asignar...",
    "plugins.clubAnalyzer.view.loading.watchlist": "Cargando objetivos de mercado...",
    "plugins.clubAnalyzer.view.loading.tradepile": "Cargando lista de transferencia...",
    "plugins.clubAnalyzer.view.loading.process": "Procesando información",
    "plugins.clubAnalyzer.view.buttons.reload": "Recargar",
    "plugins.clubAnalyzer.view.buttons.exportCsv": "Exportar como CSV",
    "plugins.clubAnalyzer.view.buttons.exportHtml": "Exportar como HTML",
    "plugins.clubAnalyzer.view.tab.club": "Comprados en Club",
    /// #endif

    /// #if process.env.SHOW_CONSOLE_OUTPUT
    "plugins.showConsoleOutput.settings.title": "Mostrar Log de Consola",
    /// #endif

    /// #if process.env.SBC_TIMES_COMPLETED
    "plugins.sbcTimesCompleted.settings.title": "Notificar cuantas veces un SBC se ha completado",
    /// #endif

    /// #if process.env.COUNT_MY_PACKS
    "plugins.countMyPacks.settings.title": "Contador de Mis Packs",
    /// #endif

    /// #if process.env.MY_PACKS
    "plugins.myPacks.settings.title": "Mis Packs",
    "plugins.myPacks.settings.group": "Agrupar",
    "plugins.myPacks.settings.filter": "Filtrar",
    "plugins.myPacks.settings.packCollector": "Pack Collector",
    "plugins.myPacks.filter.label": "Buscar Mis Packs",
    "plugins.myPacks.filter.default": "-- TODOS MIS PACKS --",
    "plugins.myPacks.packCollector.link.text": "Abrir Pack Collector",
    /// #endif

    /// #if process.env.TRANSFER_LIST_SEND_ALL_TO_CLUB
    "plugins.transferListSendAllToClub.settings.title": "Enviar No Duplicados de la Lista de Transferencia al Club",
    "plugins.transferListSendAllToClub.button.text": "Enviar No Duplicados al Club",
    /// #endif

    /// #if process.env.SBC_BUILDER_ENHACER
    "plugins.sbcBuilderEnhacer.settings.title": "Creador de Plantilla por Valoración",
    "plugins.sbcBuilderEnhacer.filter.ratings.title": "Valoración",
    "plugins.sbcBuilderEnhacer.filter.ratings.min.label": "Min.",
    "plugins.sbcBuilderEnhacer.filter.ratings.max.label": "Max.",
    "plugins.sbcBuilderEnhacer.filter.settings.title": "Configuración",
    "plugins.sbcBuilderEnhacer.filter.settings.maxPlayers.label": "Cant. de Jugadores",
    "plugins.sbcBuilderEnhacer.filter.search.ignorePlayersPos": "Ignorar Posición del Jugador",
    "plugins.sbcBuilderEnhacer.filter.search.importantLeaguesOnly": "Solo Ligas Importantes",
    "plugins.sbcBuilderEnhacer.filter.search.unimportantLeaguesOnly": "Solo Ligas No Importantes",
    "plugins.sbcBuilderEnhacer.filter.settings.playersFromSameClub.label": "Max. Cant. de Jugadores del mismo club",
    /// #endif

    /// #if process.env.SBC_SMART_BUILDER
    "plugins.sbcSmartBuilder.button.text": "Creador Inteligente",
    /// #endif

    /// #if process.env.DISABLE_PACK_ANIMATIONS
    "plugins.disablePackAnimations.settings.title": "Deshabilitar animaciones de apertura de packs",
    /// #endif

    /// #if process.env.KEEP_PLAYER_SELL_VALUES
    "plugins.keepPlayerSellValues.settings.title": "Matener precio de venta del jugador",
    /// #endif

    /// #if process.env.SELL_MULTIPLE
    "plugins.sellMultiple.settings.title": "Vender masiva de items",
    "plugins.sellMultiple.button.text": "Venta Masiva",
    "plugins.sellMultiple.button.quickSellText": "Venta Rápida Masiva",
    "plugins.sellMultiple.label.ignoredCards": "Las cartas serán ignoradas si el rango de valores no se encuentra entre los valores provistos",
    "plugins.sellMultiple.warning": "Esto es una función de automatización, tu cuenta puede ser banneada si haces abuso de la misma, ¿estas seguro que quieres habilitarla?",
    "plugins.sellMultiple.notifications.maxPlayersReached": "Has alcanzado el límite de {players} jugadores que puedes listar",
    "plugins.sellMultiple.notifications.wait": "Por favor espera {seconds} segundos antes de realizar otro listado",
    /// #endif

    /// #if process.env.INCREASE_ALLOWED_AUCTIONS
    "plugins.increaseAllowedAuctions.settings.title": "Incrementar Ventas Permitidas",
    /// #endif

    /// #if process.env.PLAYER_CARD_INFO
    "plugins.playerCardInfo.settings.title": "Información Extra en Cartas",
    "plugins.playerCardInfo.settings.alternatePositions": "Mostrar posiciones alternativas",
    "plugins.playerCardInfo.settings.skillMoves": "Mostrar filigranas",
    "plugins.playerCardInfo.settings.weakFoot": "Mostrar pierna mala",
    "plugins.playerCardInfo.settings.untradeable": "Mostrar si es intransferible",
    "plugins.playerCardInfo.settings.pristine": "Mostrar si es pristino (7 contratos, 1 dueño), solo en resultados de búsqueda",
    "plugins.playerCardInfo.settings.contracts": "Mostrar contratos",
    "plugins.playerCardInfo.settings.league": "Mostrar Liga",
    "plugins.playerCardInfo.settings.importantLeague": "Destacar Liga Importante",
    /// #endif

    /// #if process.env.TRACK_TRANSACTIONS
    "plugins.trackTransactions.settings.title": "Guardar Información de las Transacciones",
    /// #endif

    /// #if process.env.SELL_PROFIT
    "plugins.sellProfit.settings.title": "Mostrar ganancias de las ventas",
    "plugins.sellProfit.realProfit.text": "Ganancia",
    "plugins.sellProfit.expectedProfit.text": "Ganancia Esperada",
    /// #endif

    /// #if process.env.TRANSACTIONS_HISTORY
    "plugins.transactionsHistory.settings.title": "Historial de Transacciones",
    "plugins.transactionsHistory.panel.title": "Historial de Transacciones",
    "plugins.transactionsHistory.panel.label": "Todas",
    "plugins.transactionsHistory.panel.bought": "Compras",
    "plugins.transactionsHistory.panel.sold": "Ventas",
    "plugins.transactionsHistory.view.table.date": "Fecha",
    "plugins.transactionsHistory.view.table.item": "Item",
    "plugins.transactionsHistory.view.table.price": "Monedas",
    "plugins.transactionsHistory.view.menu.dashboard": "Resumen",
    "plugins.transactionsHistory.view.buttons.filterToday": "Hoy",
    "plugins.transactionsHistory.view.buttons.filterWeek": "Esta semana",
    "plugins.transactionsHistory.view.buttons.filterMonth": "Este mes",
    "plugins.transactionsHistory.view.buttons.filterAnyMonth": "-- Elija un mes --",
    "plugins.transactionsHistory.view.dashboard.month": "Mes",
    "plugins.transactionsHistory.view.buttons.reindex": "Re-Indexar la Base de Datos",
    "plugins.transactionsHistory.view.buttons.exportCsv": "Exportar como CSV",
    "plugins.transactionsHistory.view.buttons.clear": "Resetear la Base de Datos",
    /// #endif

    /// #if process.env.IMPORTANT_LEAGUES
    'plugins.importantLeagues.settings.title': "Ligas Importantes",
    /// #endif

    /// #if process.env.REFRESH_COINS
    'plugins.refreshCoins.settings.title': "Refrescar Monedas",
    /// #endif

    /// #if process.env.EXPERIMENTAL
    'plugins.experimental.settings.title': "Zona Experimental - Usar bajo tu propio riesgo",
    'plugins.experimental.settings.fastClubSearch': 'Búsqueda del club rápida',
    /// #endif

    /// #if process.env.SBC_RATING_CALCULATOR
    "plugins.sbcRatingCalculator.settings.title": "Calculadora de Medias",
    "plugins.sbcRatingCalculator.buttons.openDialog": "Calcular Medias Restantes",
    "plugins.sbcRatingCalculator.table.rating": "Media",
    "plugins.sbcRatingCalculator.table.count": "Cant.",
    "plugins.sbcRatingCalculator.buttons.calculate": "Calcular",
    "plugins.sbcRatingCalculator.dialog.title": "Calculadora de Medias",
    "plugins.sbcRatingCalculator.dialog.ranges.title": "Rango de medias a probar",
    /// #endif

    /// #if process.env.CLAIM_OBJECTIVES
    "plugins.claimObjectives.settings.title": "Reclamar Todas las Recompensas",
    "plugins.claimObjectives.button.text": "Reclamar Recompensas",
    "plugins.claimObjectives.button.loading": "Reclamando Recompensas",
    /// #endif

    /// #if process.env.PACKS_OPENER
    "plugins.packsOpener.settings.title": "Abridor de sobres",
    "plugins.packsOpener.button.text": "Abrir Sobres",
    "plugins.packsOpener.button.subtext": "Automáticamente",
    "plugins.packsOpener.purchaseAction.moveToClub": "Mover al Club",
    "plugins.packsOpener.purchaseAction.moveToTransferList": "Mover a la Lista de Transferencias",
    "plugins.packsOpener.purchaseAction.quickSell": "Venta rápida",
    "plugins.packsOpener.purchaseAction.stopProcess": "Dejar de comprar packs",
    "plugins.packsOpener.errors.missingPack": "No hay pack seleccionado",
    "plugins.packsOpener.errors.generic": "A habido un error al abrir el pack",
    "plugins.packsOpener.errors.transferListFull": "La lista de transferencias esta llena",
    "plugins.packsOpener.packsRemaining": "Quedan # packs por abrir",
    "plugins.packsOpener.handlingNonDuplicatePlayers": "Procesando jugadores NO duplicados",
    "plugins.packsOpener.handlingNonDuplicateManager": "Procesando managers NO duplicados",
    "plugins.packsOpener.handlingNonDuplicateItems": "Procesando items NO duplicados",
    "plugins.packsOpener.handlingDuplicatePlayers": "Procesando jugadores duplicados",
    "plugins.packsOpener.handlingDuplicateManagers": "Procesando managers duplicados",
    "plugins.packsOpener.handlingDuplicateItems": "Procesando items duplicados",
    "plugins.packsOpener.handlingCredits": "Actualizando creditos",
    "plugins.packsOpener.labels.purchaseAction.players": "¿Qué tengo que hacer con los jugadores?",
    "plugins.packsOpener.labels.purchaseAction.duplicatePlayers": "¿Qué tengo que hacer con los jugadores duplicados?",
    "plugins.packsOpener.labels.purchaseAction.managers": "¿Qué tengo que hacer con los managers?",
    "plugins.packsOpener.labels.purchaseAction.duplicateManagers": "¿Qué tengo que hacer con los managers duplicados?",
    "plugins.packsOpener.labels.purchaseAction.items": "¿Qué tengo que hacer con los items (NO jugadores, NO managers)?",
    "plugins.packsOpener.labels.purchaseAction.duplicateItems": "¿Qué tengo que hacer con los items duplicados (NO jugadores, NO managers)?",
    "plugins.packsOpener.labels.purchaseAction.transferListFull": "¿Qué tengo que hacer cuando la lista de transferencia esta llena?",
    "plugins.packsOpener.labels.currency": "Tipo de moneda a usar",
    "plugins.packsOpener.labels.packsCount": "¿Cuantos packs debo abrir?",
    "plugins.packsOpener.labels.speed": "Velocidad de Apertura",
    "plugins.packsOpener.speed.slow": "Lenta",
    "plugins.packsOpener.speed.fast": "Rápida",
    "plugins.packsOpener.packResult.title": "Resultado del Abridor de sobres",
    "plugins.packsOpener.packResult.html": "<ul><li><b>Packs Abiertos:</b><span>{packs}</span></li><li><b>Jugadores Totales:</b><span>{players}</span></li><li><b>Jugadores al club:</b><span>{playersToClub}</span></li><li><b>Jugadores a la lista de transferencia:</b><span>{playersToTransfer}</span></li><li><b>Jugadores descartados:</b><span>{playersDiscarded}</span></li><li><b>Jugadores duplicados:</b><span>{duplicatedPlayers}</span></li><li><b>Managers:</b><span>{managers}</span></li><li><b>Managers al club:</b><span>{managersToClub}</span></li><li><b>Managers a la lista de transferencias:</b><span>{managersToTransfer}</span></li><li><b>Managers descartados:</b><span>{managersDiscarded}</span></li><li><b>Managers duplicados:</b><span>{duplicatedManagers}</span></li><li><b>Items:</b><span>{items}</span></li><li><b>Items al club:</b><span>{itemsToClub}</span></li><li><b>Items a la lista de transferencias:</b><span>{itemsToTransfer}</span></li><li><b>Items descartados:</b><span>{itemsDiscarded}</span></li><li><b>Items duplicados:</b><span>{duplicatedItems}</span></li><li><b>Monedas gastadas:</b><span>{coinsSpent}</span></li><li><b>Monedas ganadas:</b><span>{coinsEarned}</span></li></ul>",
    /// #endif

    /// #if process.env.DECIMAL_RATING
    "plugins.decimalRating.settings.title": "Rating Decimal",
    /// #endif

    /// #if process.env.LOWEST_MARKET_PRICE
    "plugins.lowestMarketPrice.button.text": "Buscar Precio en el Mercado",
    "plugins.lowestMarketPrice.settings.title": "Precio Mas Barato en el Mercado",
    /// #endif

    /// #if process.env.REPEAT_SBC
    "plugins.repeatSbc.button.text": "Repeat Búsqueda",
    "plugins.repeatSbc.settings.title": "Repeat Búsqueda en SBC",
    /// #endif

    "plugins.warningScreen.title": "PALETOOLS - ADVERTENCIA DE USO",
    "plugins.warningScreen.disclaimer": "<p>Querido usuario, ya que Paletools es una herramienta que te permite realizar acciones no pensadas por EA y te permite ser mucho mas r&aacute;pido en el uso de la WebApp tu estas aceptando que puedes estar en riesgo de un posible BAN por parte de EA</p><p><br /></p><p>Tu aceptas utilizar la herramienta bajo tu responsabilidad y aceptas que vas a ser muy cuidadoso y cauteloso con su uso.</p><p><br /></p><p>Si realizas muchos snipes seguidos puedes recibir un SOFT BAN del mercado o incluso peor un <b>BAN permanente</b></p><p><br /></p><p>Por favor <b>USA ESTA HERRAMIENTA RESPONSABLEMENTE</b></p><p><br /></p><p>&iexcl;Gracias y que tengas un gran d&iacute;a!</p>",

    "plugins.eaBugFixer.settings.title": "Arreglar cagadas de EA"
};

