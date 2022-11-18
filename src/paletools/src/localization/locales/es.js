export default {
    "enabled": "Habilitado",
    "valid": "válido",
    "invalid": "inválido",
    "ui.loadingPlayers": "Cargando club: {count} jugadores cargados",
    "plugins.dangerous": "CUIDADO: Habilitar este plugin puede llevar eventualmente a un BAN por parte de EA de tu cuenta, ¿ESTAS SEGURO DE QUERER CONTINUAR?",
    "page.restart": "Por favor recarga la página y re ejecuta Paletools para que los cambios tomen efecto",
    "market.itemBuy.success": "¡Compra realizada correctamente! - {COINS}",
    "confirm": "¿Estas seguro de querer continuar?",

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
    "plugins.duplicatedToSbc.button.textLoading": "Cargado club... {count} jugadores cargados",
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

    /// #if process.env.GROUP_MY_PACKS
    "plugins.groupMyPacks.settings.title": "Agrupar Mis Packs",
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
    "plugins.sellMultiple.label.ignoredCards": "Las cartas serán ignoradas si el rango de valores no se encuentra entre los valores provistos",
    "plugins.sellMultiple.warning": "Esto es una función de automatización, tu cuenta puede ser banneada si haces abuso de la misma, ¿estas seguro que quieres habilitarla?",
    "plugins.sellMultiple.notifications.maxPlayersReached": "Has alcanzado el límite de {PLAYERS} jugadores que puedes listar",
    "plugins.sellMultiple.notifications.wait": "Por favor espera {SECONDS} segundos antes de realizar otro listado",
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

    "plugins.warningScreen.title": "PALETOOLS - ADVERTENCIA DE USO",
    "plugins.warningScreen.disclaimer": "<p>Querido usuario, ya que Paletools es una herramienta que te permite realizar acciones no pensadas por EA y te permite ser mucho mas r&aacute;pido en el uso de la WebApp tu estas entiendo que puedes estar en riesgo de un posible BAN por parte de EA</p><p><br /></p><p>Tu aceptas utilizar la herramienta bajo tu responsabilidad y aceptas que vas a ser muy cuidadoso y cauteloso con su uso.</p><p><br /></p><p>Si realizas muchos snipes seguidos puedes recibir un SOFT BAN del mercado o incluso peor un <b>BAN permanente</b></p><p><br /></p><p>Por favor <b>USA ESTA HERRAMIENTA RESPONSABLEMENTE</b></p><p><br /></p><p>&iexcl;Gracias y que tengas un gran d&iacute;a!</p>",

    "plugins.eaBugFixer.settings.title": "Arreglar cagadas de EA"
};

