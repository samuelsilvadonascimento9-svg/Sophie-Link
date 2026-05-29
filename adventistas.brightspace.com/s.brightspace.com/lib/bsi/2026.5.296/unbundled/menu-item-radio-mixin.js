import {
    M as e
} from "./menu-item-selectable-styles.js";
const t = t => class extends(e(t)) {
    constructor() {
        super(), this.role = "menuitemradio"
    }
    firstUpdated() {
        super.firstUpdated(), this.addEventListener("d2l-menu-item-change", this._onChange), this.addEventListener("d2l-menu-item-select", this._onSelectRadio)
    }
    _onChange(e) {
        const t = this.parentNode.querySelectorAll('[role="menuitemradio"]');
        for (let s = 0; s < t.length; s++) t[s].selected = t[s].value === e.detail.value
    }
    _onSelectRadio(e) {
        this.selected = !0, this.__onSelect(e)
    }
};
export {
    t as M
};