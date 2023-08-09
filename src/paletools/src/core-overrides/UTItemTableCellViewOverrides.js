import { Price } from "../controls/Price";
import { addClass, append, createElem } from "../utils/dom";

export default function executeItemTableCellViewOverrides() {

    const UTItemTableCellView_generate = UTItemTableCellView.prototype._generate;
    UTItemTableCellView.prototype._generate = function _generate() {
        UTItemTableCellView_generate.call(this);

        this.__pricesContainer = createElem("div", { className: "prices-container" });
        append(this, this.__pricesContainer);
    }

    UTItemTableCellView.prototype.addPrice = function(label, className) {
        const price = new Price("", label, className);
        append(this.__pricesContainer, price);
        return price;
    }

    const UTItemTableCellView_render = UTItemTableCellView.prototype.render;
    UTItemTableCellView.prototype.render = function (e) {
        UTItemTableCellView_render.call(this, e);

        if (this.data.untradeable) {
            addClass(this.getRootElement(), "untradeable");
        }


    }
}