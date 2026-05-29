import {
    b as e,
    a as o
} from "./lit-element.js";
import {
    D as t
} from "./dropdown-opener-mixin.js";
import {
    d as n
} from "./dropdown-opener-styles.js";
import "./uniqueId.js";
import "./dom.js";
class r extends(t(o)) {
    static get styles() {
        return n
    }
    render() {
        return e `<slot></slot>`
    }
    getOpenerElement() {
        if (!this.shadowRoot) return;
        const e = this.shadowRoot.querySelector("slot").assignedNodes({
            flatten: !0
        });
        for (let o = 0; o < e.length; o++) {
            if (e[o].nodeType !== Node.ELEMENT_NODE) continue;
            if (e[o].classList.contains("d2l-dropdown-opener")) return e[o];
            if (e[o]._dropdownContent) continue;
            const t = e[o].querySelector(".d2l-dropdown-opener");
            if (t) return t
        }
    }
}
customElements.define("d2l-dropdown", r);