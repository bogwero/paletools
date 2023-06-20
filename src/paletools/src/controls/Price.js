import { append, createElem, css } from "../utils/dom";

export class Price {
    #elem;

    constructor(text) {
        this.#elem = createElem("div", { className: "price-container" });
        css(this.#elem, { display: "block !important" });

        const aunctionValue = createElem("div", { className: "price" });
        const label = createElem("div", { className: "label" });
        const value = createElem("div", { className: "coins value" });
        value.textContent = text;

        append(aunctionValue, label, value);
        append(this.#elem, aunctionValue);
    }

    getRootElement() {
        return this.#elem;
    }
}