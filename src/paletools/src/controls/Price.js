import { append, createElem, css } from "../utils/dom";

export class Price {
    #elem;

    constructor(coins, label) {
        this.#elem = createElem("div", { className: "price-container" });
        css(this.#elem, { display: "block !important" });

        const aunctionValue = createElem("div", { className: "price" });
        const label = createElem("div", { className: "label" });
        const value = createElem("div", { className: "coins value" });
        label.textContent = label;
        value.textContent = coins;

        append(aunctionValue, label, value);
        append(this.#elem, aunctionValue);
    }

    getRootElement() {
        return this.#elem;
    }
}