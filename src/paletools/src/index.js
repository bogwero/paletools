import runOverrides from "./core-overrides";
import { EVENTS, listenToWebAppEvents, on, triggerEvent } from "./events";
import runPlugins from "./plugins";
import db from "./services/db";
import { logDebug } from "./services/log";
import { watchForPlayersMovement } from "./services/ui/club";
import getWindow from "./services/window";
import styles from "./styles.css";
import { addClass, hasClass, removeClass, select } from "./utils/dom";
import playAudio, { isFxEnabled } from "./utils/fx";
import { addStyle } from "./utils/styles";
import { hide } from "./utils/visibility";
import VERSION from "./version";

function setupPhoneView() {
    if (isPhone && isPhone()) {
        const body = select("body");
        if (!hasClass("phone")) {
            addClass(
                removeClass(
                    removeClass(body, "landscape"),
                    "web"),
                "phone");
        }
        hide(select(".ut-fifa-header-view"));
        removeClass(select("body"), "with-fifa-header");
    }
}

function removeOrientationWarning() {
    // Remove orientation warning
    const orientationWarning = select(".ui-orientation-warning");
    if (orientationWarning) {
        orientationWarning.style.display = "none";
    }
}

function resetConsole() {
    //reset console
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    getWindow().console = iframe.contentWindow.console;
}

let initialized = false;
let isAppLoaded = false;
async function init() {
    const login = select(".ut-login");
    if (login || (
        !services
        || !services.Localization
        || !services.Authentication.sessionUtas
        || !services.Authentication.sessionUtas.url)) {
        setTimeout(init, 1000);
        return;
    }

    resetConsole();
    setupPhoneView();
    removeOrientationWarning();

    // detect if the script was already run
    const app = getAppMain();
    if (!app._ptVersion) {
        app._ptVersion = VERSION;
    }
    else {
        return;
    }

    runOverrides();
    await initDatabase();
    initApp();
    triggerEvent(EVENTS.APP_STARTED);
    initialized = true;
}

async function initDatabase() {
    if (db.isSupported()) {
        try {
            await db.init();
        }
        catch {
            logDebug("Error initializing database");
        }
    }
}

function initApp() {
    if (services.Localization) {
        const tabBar = select(".ut-tab-bar");
        if (tabBar) {
            isAppLoaded = true;
        }
    }

    if (isAppLoaded) {
        addStyle("paletools", styles);
        runPlugins();
        //listenToWebAppEvents();
        getAppMain().getRootViewController().showGameView();
        triggerEvent(EVENTS.APP_LOADED);
        watchForPlayersMovement();

        if (isFxEnabled()) {
            playAudio("castigo");

            on("click", ev => {
                switch (ev.button) {
                    case 0:
                        playAudio("tuki");
                        break;
                }
            });
        }
    } else {
        setTimeout(initApp, 1000);
    }
}

init();