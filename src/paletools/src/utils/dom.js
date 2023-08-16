import { toArray } from "./array";
import { isIterable } from "./iterable";

export function getRealElement(elem) {
    if (elem.getRootElement) {
        return elem.getRootElement();
    }

    return elem;
}

export function parent(elem) {
    elem = getRealElement(elem);

    return elem.parentNode;
}

export function select(query, parent = document) {
    if (!query) return;

    return getRealElement(parent).querySelector(query);
}

export function selectAll(query, parent = document) {
    if (!query) return;

    return toArray(getRealElement(parent).querySelectorAll(query));
}

export function append(parent, ...children) {
    if (!parent) return;

    parent = getRealElement(parent);

    for (let child of [].concat(...children)) {
        if (!child) continue;

        parent.append(getRealElement(child));
    }

    return children;
}

export function prepend(parent, ...children) {
    if (!parent) return;

    parent = getRealElement(parent);

    for (let child of [].concat(...children)) {
        if (!child) continue;

        parent.prepend(getRealElement(child));
    }

    return children;
}

export function remove(elem) {
    if (!elem) return;

    if (isIterable(elem)) {
        for (let el in elem) {
            if (!el) continue;

            el = getRealElement(el);
            el.parentNode.removeChild(el);
        }
    }
    else {
        elem = getRealElement(elem);
        elem.parentNode.removeChild(elem);
    }

    return elem;
}

export function attr(elem, name, value) {
    if (!value) {
        return getRealElement(elem).getAttribute(name);
    }
    else {
        getRealElement(elem).setAttribute(name, value);
    }
}

export function createElem(tag, attrs, html) {
    let elem = document.createElement(tag);
    if (typeof attrs === "string") {
        html = attrs;
        attrs = null;
    }

    if (attrs) {
        for (let attr of Object.keys(attrs)) {
            if (!attrs[attr]) continue;

            elem.setAttribute(attr === "className" ? "class" : attr, attrs[attr]);
        }
    }

    if (html) {
        elem.innerHTML = html;
    }

    return elem;
}

export function isVisible(elem) {
    return !isHidden(elem);
}

export function isHidden(elem) {
    if (!elem) return true;
    elem = getRealElement(elem);
    return elem.offsetWidth === 0 && elem.offsetHeight === 0;
}

export function addClass(elem, ...className) {
    if (!elem) return;

    if (isIterable(elem)) {
        for (let e of elem) {
            if (!e) continue;
            getRealElement(e).classList.add(...className);
        }
    }
    else {
        getRealElement(elem).classList.add(...className);
    }

    return elem;
}

export function hasClass(elem, className) {
    if (!elem) return false;

    elem = getRealElement(elem);

    if (elem.classList) {
        return elem.classList.contains(className);
    }

    return false;
}

export function removeClass(elem, ...className) {
    if (!elem) return;

    if (isIterable(elem)) {
        for (let e of elem) {
            if (!e) continue;
            e = getRealElement(e);
            e.classList.remove(...className);
        }
    }
    else {
        getRealElement(elem).classList.remove(...className);
    }

    return elem;
}

export function css(elem, css) {
    if (!elem) return;

    if (isIterable(elem)) {
        for (let el of elem) {
            if (!el) continue;
            for (let key of Object.keys(css)) {
                getRealElement(el).style[key] = css[key];
            }
        }
    }
    else {
        for (let key of Object.keys(css)) {
            getRealElement(elem).style[key] = css[key];
        }
    }

    return elem;
}

export function insertBefore(newNode, existingNode) {
    if (!newNode) return;
    if (!existingNode) return;

    existingNode = getRealElement(existingNode);

    existingNode.parentNode.insertBefore(getRealElement(newNode), existingNode);

    return newNode;
}

export function insertAfter(newNode, existingNode) {
    if (!newNode) return;
    if (!existingNode) return;

    existingNode = getRealElement(existingNode);
    existingNode.parentNode.insertBefore(getRealElement(newNode), existingNode.nextSibling);

    return newNode;
}

export function detach(nodes) {
    if (!nodes) return;

    if (isIterable(nodes)) {
        for (let node of nodes) {
            if (!node) continue;

            node = getRealElement(node);
            node.parentElement.removeChild(node);
        }
    }
    else {
        nodes = getRealElement(nodes);
        nodes.parentElement.removeChild(nodes);
    }

    return nodes;
}