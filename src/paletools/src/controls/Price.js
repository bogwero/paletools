import { localizeNumber } from "../localization";
import { append, createElem, css } from "../utils/dom";

export class Price {
    #elem;
    #label;
    #value;

    constructor(coins, labelText, className = "") {
        this.#elem = createElem("div", { className: "price-container " + className });
        css(this.#elem, { display: "block !important" });

        const aunctionValue = createElem("div", { className: "price" });
        this.#label = createElem("div", { className: "label" });
        this.#value = createElem("div", { className: "value" });
        this.#label.textContent = labelText;
        this.#value.textContent = coins;

        append(aunctionValue, this.#label, this.#value);
        append(this.#elem, aunctionValue);
    }

    setLabel(label) {
        this.#label.textContent = label;
    }

    setValue(value) {
        this.#value.textContent = localizeNumber(value);
    }

    getRootElement() {
        return this.#elem;
    }
}