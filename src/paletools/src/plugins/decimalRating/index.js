let plugin;

// #if process.env.DECIMAL_RATING
import { addLabelWithToggle } from "../../controls";
import settings, { saveConfiguration } from "../../settings";

const cfg = settings.plugins.decimalRating;

function run() {

    const UTSBCSquadOverviewView_setSquad = UTSBCSquadOverviewView.prototype.setSquad;
    UTSBCSquadOverviewView.prototype.setSquad = function(...args) {
        UTSBCSquadOverviewView_setSquad.call(this, ...args);

        if(settings.enabled && cfg.enabled && this._summaryPanel) {
            const squad = args[0];
            this._summaryPanel.setChemistryAndRating(squad.getChemistry(), squad.getDecimalRating());
        }
    }

    UTSquadEntity.prototype.getDecimalRating = function() {
        var t = this.isSBC() ? this.getFieldPlayers() : this.getFieldAndSubPlayers()
          , e = services.Configuration.checkFeatureEnabled(UTServerSettingsRepository.KEY.SQUAD_RATING_FLOAT_CALCULATION_ENABLED)
          , r = 0
          , n = UTSquadEntity.FIELD_PLAYERS;
        if (t.forEach(function(t, e) {
            var i = t.item;
            i.isValid() && (r += i.rating,
            UTSquadEntity.FIELD_PLAYERS <= e && n++)
        }),
        e) {
            var o = r
              , s = o;
            0 < n && (o /= n),
            o = Math.min(o, 99),
            t.forEach(function(t, e) {
                var i = t.item;
                if (i.isValid()) {
                    if (i.rating <= o)
                        return;
                    s += e < UTSquadEntity.FIELD_PLAYERS ? i.rating - o : .5 * (i.rating - o)
                }
            }),
            r = Math.round(s)
        } else {
            var a = Math.min(Math.floor(r / n), 99);
            t.forEach(function(t, e) {
                var i = t.item;
                if (i.isValid()) {
                    if (i.rating <= a)
                        return;
                    r += e < UTSquadEntity.FIELD_PLAYERS ? i.rating - a : Math.floor(.5 * (i.rating - a))
                }
            })
        }
        
        let rating = Math.min(Math.max(r / n, 0), 99);
        return Math.round((rating + Number.EPSILON) * 100) / 100;
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
        name: "decimalRating",
        title: 'plugins.decimalRating.settings.title',
        menu: menu
    }
};
// #endif

export default plugin;


