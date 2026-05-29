import {
    a as e
} from "./lit-element.js";
customElements.define("d2l-filter-dimension-set-value", class extends e {
    static get properties() {
        return {
            count: {
                type: Number
            },
            disabled: {
                type: Boolean,
                reflect: !0
            },
            key: {
                type: String
            },
            selected: {
                type: Boolean,
                reflect: !0
            },
            text: {
                type: String
            }
        }
    }
    constructor() {
        super(), this.disabled = !1, this.selected = !1, this.text = "", this._enforceSingleSelection = !1, this._filterSetValue = !0, this._noSearchSupport = !1
    }
    get count() {
        return this._count
    }
    set count(e) {
        e < 0 && (e = 0), Number.isInteger(e) || (e = Math.floor(e)), Number.isNaN(e) && (e = void 0);
        const t = this._count;
        t !== e && (this._count = e, this.requestUpdate("count", t))
    }
    updated(e) {
        super.updated(e);
        const t = new Map;
        e.forEach((e, s) => {
            void 0 !== e && ("count" !== s && "disabled" !== s && "selected" !== s && "text" !== s || t.set(s, this[s]))
        }), t.size > 0 && this.dispatchEvent(new CustomEvent("d2l-filter-dimension-set-value-data-change", {
            detail: {
                valueKey: this.key,
                changes: t
            },
            bubbles: !0,
            composed: !1
        }))
    }
    getValueDetails() {
        return {
            count: this.count,
            disabled: this.disabled,
            key: this.key,
            selected: this.selected,
            text: this.text
        }
    }
});