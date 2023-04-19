/// #if process.env.CLUB_ANALYZER

import localize from "../../localization";
import { addClass, append, createElem, isVisible, remove, removeClass, select, selectAll } from "../../utils/dom";
import { hide, show } from "../../utils/visibility";
import { on } from "../../events";

export function ClubAnalyzerView(t) {
    UTView.call(this);
    this.onReloadClicked = new EAObservable();
    this.onExportCsvClicked = new EAObservable();
    this.onExportHtmlClicked = new EAObservable();
}

function loc(key) {
    let value = localize(`plugins.clubAnalyzer.${key}`);
    if (!value || value.indexOf(key) > -1) return localize(key);

    return value;
}

const _reportsData = {};

JSUtils.inherits(ClubAnalyzerView, UTView);

ClubAnalyzerView.prototype.dealloc = function dealloc() {
    this.onReloadClicked.dealloc();
    this.onReloadClicked = null;
    this.onExportCsvClicked.dealloc();
    this.onExportCsvClicked = null;
    this.onExportHtmlClicked.dealloc();
    this.onExportHtmlClicked = null;
}

ClubAnalyzerView.prototype._appendMainMenu = function (container) {
    const clubAnalyzerMenu = new EAFilterBarView();
    clubAnalyzerMenu.addTab("clubanalyzer-players-dashboard", "Dashboard");
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-rating", "Rating");
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-rarity", loc("extendedPlayerInfo.general.rarity"));
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-league", loc("search.details.itemLeague"));
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-nation", loc("extendedPlayerInfo.general.nation"));
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-club-bought", loc("view.tab.club"));
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-unnasigned", loc("navbar.label.newitems"));
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-transferlist", loc("panel.label.transferlist"));
    clubAnalyzerMenu.addTab("clubanalyzer-players-by-transfertargets", loc("panel.label.transfertargets"));

    clubAnalyzerMenu.addTarget(this, (_, __, menuItem) => {
        hide(selectAll(".club-analyzer-report"));
        let targetId = menuItem.id.replace("players-", "report-");
        show(select(`#${targetId}`));
        show(selectAll(`.${targetId}`));
    }, EventType.TAP)
    append(container, clubAnalyzerMenu);
    clubAnalyzerMenu.setActiveTab("clubanalyzer-players-dashboard");
    clubAnalyzerMenu.layoutSubviews();
}

ClubAnalyzerView.prototype._appendBody = function (container) {
    const contentContainer = createElem("div", { className: "ut-pinned-list-container ut-content-container" });
    const content = createElem("div", { className: "ut-content" });
    const pinnedList = createElem("div", { className: "ut-pinned-list club-analyzer" });

    const commandsContainer = createElem("div", { id: "clubanalyzercommands", className: "button-container" });

    const reloadButton = new UTStandardButtonControl();
    reloadButton.init();
    reloadButton.setText(loc("view.buttons.reload"));
    reloadButton.addTarget(this, () => this.onReloadClicked.notify(), EventType.TAP);
    addClass(reloadButton, "call-to-action");
    append(commandsContainer, reloadButton);

    if (!isPhone()) {
        const exportCsvButton = new UTStandardButtonControl();
        exportCsvButton.init();
        exportCsvButton.setText(loc("view.buttons.exportCsv"));
        exportCsvButton.addTarget(this, () => this.onExportCsvClicked.notify(), EventType.TAP);
        addClass(exportCsvButton, "call-to-action");

        const exportHtmlButton = new UTStandardButtonControl();
        exportHtmlButton.init();
        exportHtmlButton.setText(loc("view.buttons.exportHtml"));
        exportHtmlButton.addTarget(this, () => this.onExportHtmlClicked.notify(), EventType.TAP);
        addClass(exportHtmlButton, "call-to-action");

        append(commandsContainer, exportCsvButton, exportHtmlButton);
    }

    append(container, contentContainer);
    append(contentContainer, content);
    append(content, commandsContainer);
    append(content, pinnedList);



    return pinnedList;
}

ClubAnalyzerView.prototype._createDashboard = function (viewmodel) {
    const counters = viewmodel.counters;
    return createElem("div", { id: "clubanalyzer-report-dashboard", className: "club-analyzer-report" },
        `<h3 class="tile">
                ${loc("view.dashboard.description")}
                </h3>
                <div>
                <table class="rarities tile">
                    <tr><th></th><th>${loc("item.raretype1")}</th><th>${loc("item.raretype0")}</th></tr>
                    <tr><td><img src="https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/gold.png" /></td><td>${counters.rare.gold}</td><td>${counters.common.gold}</td></tr>
                    <tr><td><img src="https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/silver.png" /></td><td>${counters.rare.silver}</td><td>${counters.common.silver}</td></tr>
                    <tr><td><img src="https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/bronze.png" /></td><td>${counters.rare.bronze}</td><td>${counters.common.bronze}</td></tr>
                    <tr><td><img src="https://www.ea.com/fifa/ultimate-team/web-app/images/SearchFilters/level/SP.png" /></td><td>${counters.totw}</td><td></td></tr>
                </table>
                </div>
                <div>
                    <table class="latam tile">
                        <tr>
                            <th></th>
                            <th>MOTM</th>
                            <th>${loc("search.cardLevels.cardLevel3")}</th>
                            <th>${loc("search.cardLevels.cardLevel2")}</th>
                            <th>${loc("search.cardLevels.cardLevel1")}</th>
                        </tr>
                        <tr><td><img src="https://www.ea.com/fifa/ultimate-team/web-app/content/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fut/items/images/backgrounds/itemCompanionBGs/8f60cc02-051a-4f95-bdcb-a2bc454e1f47/cards_bg_s_1_53_0.png" /></td>
                            <td>${counters.libertadores.motm}</td>
                            <td>${counters.libertadores.gold}</td>
                            <td>${counters.libertadores.silver}</td>
                            <td>${counters.libertadores.bronze}</td>
                        </tr>
                        <tr><td><img src="https://www.ea.com/fifa/ultimate-team/web-app/content/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fut/items/images/backgrounds/itemCompanionBGs/ab719e69-0d3e-430c-8e67-80a106de93c1/cards_bg_s_1_52_0.png" /></td>
                        <td>${counters.sudamericana.motm}</td>
                        <td>${counters.sudamericana.gold}</td>
                        <td>${counters.sudamericana.silver}</td>
                        <td>${counters.sudamericana.bronze}</td>
                        </tr>
                    </table>
                    <table class="limbo tile">
                        <tr><th>${loc("navbar.label.newitems")}</th><th>${loc("panel.label.transferlist")}</th><th>${loc("panel.label.transfertargets")}</th></tr>
                        <tr><td>${counters.unnasignedTotal}</td><td>${counters.tradepileTotal}</td><td>${counters.watchlistTotal}</td></tr>
                    </table>
                </div>
            </div>`);
}

ClubAnalyzerView.prototype._renderPlayer = function (player, addAuctionInfo) {
    return `<li class="player ${addAuctionInfo ? "inline-list" : ""}">
                <a class="fullname" href="https://www.futbin.com/players?page=1&search=${player.data.f}%20${player.data.l}" target="_blank">
                    <span class="firstname">${player.data.f}</span> 
                    <span class="lastname">${player.data.l}</span>
                    <span class="position">${PlayerPosition[player.preferredPosition]}</span>
                </a>
                <span class="rating">${player.rating}</span>
                ${player.untradeable ? '<span class="fut_icon icon_untradeable untradeable"></span>' : ''}
                ${player.loans > -1 ? `<span class="loans">${player.loans}</span>` : ''}
                ${addAuctionInfo ? `<span class="count">${player.count}</span>` : ""}
                ${addAuctionInfo ? `<span class="avg">${Math.round(player.sumPrices / player.count)}</span>` : ""}
                ${addAuctionInfo ? `<span class="rarity">${loc(player.rarity)}</span>` : ""}
            </li>`;
}

ClubAnalyzerView.prototype._createCountReport = function (id, data) {
    return createElem("div", { id: id, className: "club-analyzer-report" }, this._createCountReportTree(data, 0));
}

ClubAnalyzerView.prototype._createCountReportTree = function (data, level) {
    let html = "<div>";
    if (data instanceof Array) {
        html += '<ul class="players" style="display: none">';
        for (let player of data) {
            html += this._renderPlayer(player);
        }
        html += '</ul>';
    }
    else {
        html += level === 0 ? "<ul>" : '<ul style="display: none">';
        for (let value of Object.keys(data).sort()) {
            html += level === 0 ? '<li class="inline-list">' : "<li>";
            html += `<span class="value">${value}</span>`;
            html += `<span class="count">${data[value].players ? data[value].players.length : data[value].length}</span>`;
            html += this._createCountReportTree(data[value].by ? data[value].by : data[value], level + 1);
            html += "</li>";
        }
        html += "</ul>";
    }

    html += "</div>";
    return html;
}

ClubAnalyzerView.prototype._setupAuctionReportSort = function () {
    const reports = selectAll(".club-analyzer-auctionreport");

    on("click", ev => {
        if (!ev.target.dataset.sortby) return;

        const header = ev.target;
        const parentDiv = ev.target.closest("div");
        const reportId = parentDiv.getAttribute("id");
        const reportData = _reportsData[reportId];
        this._createAuctionReport(reportData.id, reportData.data, reportData.caption, null, header.dataset.sortby, header.dataset.sortbyDirection === "asc" ? "desc" : "asc", reportData.addCount);
    });
}

ClubAnalyzerView.prototype._createAuctionReport = function (id, data, caption, className, sortBy, sortByDirection, addCount) {
    sortBy = sortBy || "rating";
    sortByDirection = sortByDirection || "desc";

    function renderPlayer(player) {
        return `<tr class="player">
                    <td>
                        <a class="fullname" href="https://www.futbin.com/players?page=1&search=${player.data.f}%20${player.data.l}" target="_blank">
                            <span class="firstname">${player.data.f}</span> 
                            <span class="lastname">${player.data.l}</span>
                        </a>
                    </td>
                    <td class="position">${PlayerPosition[player.preferredPosition]}</td>
                    <td class="rating">${player.rating}</td>
                    <td class="rarity">${loc(player.rarity)}</td>
                    ${(addCount ? `<td class="count">${player.count}</td>` : "")}
                    <td class="avg">${player.avg}</td>
                </tr>`;
    }

    function renderTh(dataSortBy, text) {
        return `<th data-sortby="${dataSortBy}" data-sortby-direction="${sortByDirection}" class="${(dataSortBy === sortBy ? `sorted-${sortByDirection}` : "")}">${text}
                ${(dataSortBy === sortBy ? "<span class=\"fut_icon icon_arrow\"></span>" : "")}
                </th>`;
    }

    function sortPlayer(p1, p2) {
        let cmpA, cmpB;

        switch (sortBy) {
            case "name":
                cmpA = p1.data.f + p1.data.l;
                cmpB = p2.data.f + p2.data.l;
                break;
            case "position":
                cmpA = p1.preferredPosition;
                cmpB = p2.preferredPosition;
                break;
            case "rating":
                cmpA = p1.rating;
                cmpB = p2.rating;
                break;
            case "rarity":
                cmpA = loc(p1.rarity);
                cmpB = loc(p2.rarity);
                break;
            case "count":
                cmpA = p1.count;
                cmpB = p2.count;
                break;
            case "value":
                cmpA = p1.avg;
                cmpB = p2.avg;
                break;
        }

        let sortResult = 0;
        if (typeof cmpA === "string") {
            sortResult = sortByDirection === "asc"
                ? cmpA.localeCompare(cmpB)
                : cmpB.localeCompare(cmpA);
        }
        else {
            sortResult = sortByDirection === "asc"
                ? cmpA - cmpB
                : cmpB - cmpA;
        }

        if (sortResult === 0) {
            const n1 = p1.data.f + p1.data.l;
            const n2 = p2.data.f + p2.data.l;
            return sortByDirection === "asc" ? n1.localeCompare(n2) : n2.localeCompare(n1);
        }

        return sortResult;
    }

    const players = Object.keys(data).map(x => data[x]);

    if (players.length === 0) {
        return;
    }

    className = className || "";

    let html = "<table>";
    html += caption ? `<caption>${caption}</caption>` : "";
    html += `<tr>
                ${renderTh("name", loc("extendedPlayerInfo.general.firstName"))}
                ${renderTh("position", loc("extendedPlayerInfo.general.preferredPosition"))}
                ${renderTh("rating", loc("extendedPlayerInfo.general.overall"))}
                ${renderTh("rarity", loc("extendedPlayerInfo.general.rarity"))}
                ${(addCount ? renderTh("count", "#") : "")}
                ${renderTh("value", loc("searchauctions.label.pricing"))}
            </tr>`;
    for (let player of players.sort(sortPlayer)) {
        html += renderPlayer(player);
    }

    html += "</table>";

    const existingDiv = document.getElementById(id);
    if (existingDiv) {
        existingDiv.innerHTML = html;
    }
    else {
        let div = createElem("div", { id: id, className: `club-analyzer-report club-analyzer-auctionreport ${className}` }, html);
        _reportsData[id] = {
            id: id,
            data: data,
            caption: caption,
            addCount: addCount
        };
        return div;
    }
}

ClubAnalyzerView.prototype._generate = function _generate() {
    if (!this.generated) {
        const container = document.createElement("div");
        this._appendMainMenu(container);
        this._loadingMessage = createElem("div", { id: "clubanalyzer-loading-message" });
        hide(this._loadingMessage);
        append(container, this._loadingMessage);
        this._body = this._appendBody(container);
        this.__root = container;
        this.generated = true;
    }
}

ClubAnalyzerView.prototype.showLoading = function (msg) {
    this._loadingMessage.textContent = msg;
    show(this._loadingMessage);
}

ClubAnalyzerView.prototype.hideLoading = function () {
    this._loadingMessage.textContent = "";
    hide(this._loadingMessage);
}

ClubAnalyzerView.prototype.prepareForUpdate = function () {
    this._body.innerHTML = "";
    const buttons = selectAll(".menu-container > button", this.__root);
    removeClass(buttons, "selected");
    addClass(buttons[0], "selected");
    hide(select("#clubanalyzer-commands"));
}

ClubAnalyzerView.prototype.update = function (viewmodel) {
    // select("#clubanalyzer-counter-unnasigned").textContent = viewmodel.counters.unnasignedTotal;
    // select("#clubanalyzer-counter-tradepile").textContent = viewmodel.counters.tradepileTotal;
    // select("#clubanalyzer-counter-watchlist").textContent = viewmodel.counters.watchlistTotal;

    this._body.innerHTML = "";

    append(this._body,
        this._createDashboard(viewmodel),
        this._createCountReport("clubanalyzer-report-by-rating", viewmodel.players.byRating),
        this._createCountReport("clubanalyzer-report-by-rarity", viewmodel.players.byRarity),
        this._createCountReport("clubanalyzer-report-by-league", viewmodel.players.byLeague),
        this._createCountReport("clubanalyzer-report-by-nation", viewmodel.players.byNation),

        this._createAuctionReport("clubanalyzer-report-by-club-bought", viewmodel.players.club),
        this._createAuctionReport("clubanalyzer-report-by-unnasigned", viewmodel.players.unnasigned.tradeable, "Tradeable", "clubanalyzer-report-by-unnasigned", null, null, true),
        this._createAuctionReport("clubanalyzer-report-by-unnasigned2", viewmodel.players.unnasigned.untradeable, "Untradeable", "clubanalyzer-report-by-unnasigned", null, null, true),
        this._createAuctionReport("clubanalyzer-report-by-transferlist", viewmodel.players.tradepile, null, null, null, null, true),
        this._createAuctionReport("clubanalyzer-report-by-transfertargets", viewmodel.players.watchlistWon, loc("watchlist.dock.categories.won"), null, null, null, true),
        this._createAuctionReport("clubanalyzer-report-by-transfertargets2", viewmodel.players.watchlistWinning, loc("dock.label.winning"), "clubanalyzer-report-by-transfertargets", null, null, true),
        this._createAuctionReport("clubanalyzer-report-by-transfertargets3", viewmodel.players.watchlistLoosing, loc("dock.label.outbid"), "clubanalyzer-report-by-transfertargets", null, null, true),
        this._createAuctionReport("clubanalyzer-report-by-transfertargets4", viewmodel.players.watchlistLost, loc("watchlist.dock.categories.expired"), "clubanalyzer-report-by-transfertargets", null, null, true));


    this._setupAuctionReportSort();
    const reports = selectAll(".club-analyzer-report");
    hide(reports);
    show(select("#clubanalyzer-commands"));
    show(reports[0]);

    on(selectAll("li", this._body), "click", ev => {
        const elem = ev.currentTarget;
        const childUl = select("ul", elem);

        if (isVisible(childUl)) {
            hide(childUl);
            removeClass(elem, "expanded");
        }
        else {
            show(childUl);
            addClass(elem, "expanded");
        }

        ev.stopPropagation();
    });
}
/// #endif