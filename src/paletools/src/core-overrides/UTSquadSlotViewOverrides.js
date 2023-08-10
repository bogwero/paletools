import { Price } from "../controls/Price";
import { addClass, append, createElem } from "../utils/dom";

export default function executeSquadSlotViewOverrides() {

    const UTSquadSlotView_generate = UTSquadSlotView.prototype._generate;
    UTSquadSlotView.prototype._generate = function _generate() {
        UTSquadSlotView_generate.call(this);

        this.__pricesContainer = createElem("div", { className: "prices-container" });
        append(this, this.__pricesContainer);
    }

    UTSquadSlotView.prototype.addPrice = function(label, className) {
        const price = new Price("", label, className);
        append(this.__pricesContainer, price);
        return price;
    }
}