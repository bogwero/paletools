export function getBeginOfDay(date = new Date()) {
    date.setHours(0,0,0,0);
    return date;
}

export function getEndOfDay(date = new Date()) {
    date.setHours(23, 59, 59, 999);
    return date;
}

export function getFirstDayOfMonth(date) {
    date = date || new Date();
    return getBeginOfDay(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function getLastDayOfMonth(date) {
    date = date ||new Date();
    return getEndOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function getFirstDayOfWeek() {
    const date = new Date();
    return getBeginOfDay(new Date(date.setDate(date.getDate() - date.getDay())));
}

export function getLastDayOfWeek() {
    const date = new Date();
    return getEndOfDay(new Date(date.setDate(date.getDate() - date.getDay() + 6)));
}

export function dateToInt(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const sec = date.getUTCSeconds();

    return year * 10000000000 + month * 100000000 + day * 1000000 + hh * 10000 + mm * 100 + sec;
}

export function intToDate(date) {
    const sec = Math.round(date % 100);
    date /= 100;
    const mm = Math.round(date % 100);
    date /= 100;
    const hh = Math.round(date % 100);
    date /= 100;
    const day = Math.round(date % 100);
    date /= 100;
    const month = Math.round(date % 100);
    date /= 100;
    const year = Math.round(date);
    
    return new Date(year, month - 1, day, hh, mm, sec);
}