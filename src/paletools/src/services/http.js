import extend from "../utils/extend";
import getWindow from "./window";

export default async function http(url, method, body, options = null) {
    if (!url) throw new Error("Url must be specified");

    if (url.indexOf("http") === 0) {
        if (! await isExternalRequestSupported()) new Promise(resolve => resolve());

        return await externalHttp(url, method, body, options);
    }
    else {
        const response = await fetch(`${services.Authentication.sessionUtas.url}/ut/game/fifa${APP_YEAR_SHORT}/${url}`, {
            method: method || 'GET',
            headers: {
                "X-UT-SID": services.Authentication.getUtasSession()["id"],
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null
        });

        return await response.json();
    }
}

let _isExternalRequestSupported = undefined;

export async function isExternalRequestSupported() {
    if (typeof _isExternalRequestSupported !== "undefined") return _isExternalRequestSupported;

    if (typeof GM_xmlhttpRequest !== "undefined") {
        _isExternalRequestSupported = true;
        return true;
    }

    try {
        await fetch("https://www.google.com", { method: "HEAD" });
        _isExternalRequestSupported = true;
        return true;
    }
    catch {
        _isExternalRequestSupported = false;
        return false;
    }

}

function externalHttp(url, method, body, options) {
    if (typeof GM_xmlhttpRequest !== "undefined") {
        return new Promise((resolve, reject) => {
            let request = extend({
                method: method,
                url: url,
                onload: response => resolve(response.responseText),
                onerror: response => reject(response),
                data: body
            }, options);


            GM_xmlhttpRequest(request);
        });
    }
    else {
        options = extend({
            method: method,
            body: body
        }, options)

        return fetch(url, options);
    }
}