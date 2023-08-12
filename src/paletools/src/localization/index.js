import localeEn from './locales/en';
import localeEs from "./locales/es";
import localeIt from "./locales/it";
import localePt from "./locales/pt";
import localeDe from "./locales/de";
import localeFr from "./locales/fr";
import getWindow from "../services/window";

const dictionary = {
    "en": localeEn,
    "es": localeEs,
    "it": localeIt,
    "pt": localePt,
    "de": localeDe,
    "fr": localeFr
};

export default function localize(key) {
    const lang = services.Localization.locale.language;

    const dict = dictionary[lang] || dictionary['en'];

    if (dict[key]) {
        return dict[key];
    }

    const localized = services.Localization.localize(key);
    if(localized.length > 1 && localized.charAt(0) === "*"){
        return localized.substring(1);
    }

    return localized;
}

export function localizeNumber(number) {
    return services.Localization.localizeNumber(number);
}

export function localizeDate(date) {
    return services.Localization.localizeDate(date);
}

export function localizePosition(positionId){
    return UTLocalizationUtil.positionIdToName(positionId, services.Localization);
}

const monthKeys = ["january", "february", "march", "april", "june", "july", "august", "september", "october", "november", "december"];

export function localizeMonthAbbr(date) {
    return localize(`date.${monthKeys[date.getMonth() - 1]}`);
}

export function getLeagueAbbr5(id) {
    return localize(`global.leagueabbr5.${getWindow().APP_YEAR}.league${id}`);
}
