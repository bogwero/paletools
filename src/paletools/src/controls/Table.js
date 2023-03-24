import { on } from "../events";
import { createElem } from "../utils/dom";


export class Table {
    #table;
    #mapper;
    #recordSet;

    constructor(opts) {
        this.#mapper = opts.mapper;
        this.#table = createElem("table", { id: opts.id, className: opts.className });
        if(opts.caption) {
            this.#table.createCaption().textContent = opts.caption;
        }
        const thead = this.#table.createTHead();
        const theadRow = thead.insertRow();

        const ths = [];

        for (let header of opts.headers) {
            let th = createElem("th");

            if (typeof header === "string") {
                th.appendChild(document.createTextNode(header));
            }
            else {
                th.appendChild(document.createTextNode(header.text));
                if (header.sort) {
                    th.addEventListener("click", ev => {
                        const returnValue = opts.sortFunc(this.#recordSet, th.dataset.sortby, th.dataset.sortbyDirection);
                        if (returnValue && returnValue.then) {
                            returnValue.then(recordSet => {
                                if (recordSet) {
                                    this.updateData(recordSet);
                                }
                            });
                        }
                        else if (returnValue) {
                            this.updateData(returnValue);
                        }
                        ths.forEach(x => x.removeAttribute("data-sorted"));
                        th.setAttribute("data-sorted", th.dataset.sortbyDirection);
                        th.setAttribute("data-sortby-direction", th.dataset.sortbyDirection === "asc" ? "desc" : "asc");
                    });

                    th.setAttribute("data-sortby", header.sort.key);
                    th.setAttribute("data-sortby-direction", header.sort.direction);
                    if (header.sort.default) {
                        th.setAttribute("data-sorted", true);
                    }
                    th.appendChild(createElem("span", { className: "fut_icon icon_arrow" }));
                }
            }

            theadRow.appendChild(th);

            ths.push(th);
        }
    }

    updateData(recordSet) {
        this.#recordSet = recordSet;

        if (this.#table.tBodies.length === 1) {
            this.#table.removeChild(this.#table.tBodies[0]);
        }

        const tbody = this.#table.createTBody();

        for (let row of this.#recordSet) {
            let tr = tbody.insertRow();
            if (this.#mapper) {
                row = this.#mapper(row);
            }
            for (let record of row) {
                let td = createElem("td");
                td.appendChild(document.createTextNode(record));
                tr.appendChild(td);
            }
        }
    }

    getRootElement() {
        return this.#table;
    }
}