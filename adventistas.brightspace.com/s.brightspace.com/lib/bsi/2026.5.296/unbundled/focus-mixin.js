import {
    d as t
} from "./dedupeMixin.js";
const e = t(t => class extends t {
    constructor() {
        super(), this._focusOnFirstRender = !1
    }
    static get focusElementSelector() {
        return null
    }
    firstUpdated(t) {
        super.firstUpdated(t), this._focusOnFirstRender && (this._focusOnFirstRender = !1, this.focus())
    }
    focus() {
        const t = this.constructor.focusElementSelector;
        if (!t) throw new Error(`FocusMixin: no static focusElementSelector provided for "${this.tagName}"`);
        if (!this.hasUpdated) return void(this._focusOnFirstRender = !0);
        const e = this.shadowRoot.querySelector(t);
        if (!e) throw new Error(`FocusMixin: selector "${t}" yielded no element for "${this.tagName}"`);
        e.focus()
    }
});
export {
    e as F
};