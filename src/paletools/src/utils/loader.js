import { addClass, append, createElem, css, remove, removeClass, select } from "./dom";

export function displayLoader() {
    addClass(select(".ut-click-shield"), "showing");
    css(select(".loaderIcon"), { display: "block" });
};

export function hideLoader() {
    removeClass(select(".ut-click-shield"), "showing");
    css(select(".loaderIcon"), { display: "none" });
};

export function addLoadingProgress(elem) {
    const loadingProgress = createElem("div", {
        className: "loading-progress"
    });
    append(elem, loadingProgress);
}

export function removeLoadingProgress(elem) {
    remove(select(".loading-progress", elem));
}