import {
    h as e
} from "./dom.js";
import {
    P as l
} from "./property-required-mixin.js";
const t = e => e.tagName.includes("-"),
    a = e => t(e) ? e._label : e.textContent,
    s = e => class extends e {
        static get properties() {
            return {
                _label: {
                    type: String,
                    reflect: !0
                }
            }
        }
        connectedCallback() {
            super.connectedCallback(), this.addEventListener("d2l-label-change", this._handleLabelChange)
        }
        disconnectedCallback() {
            super.disconnectedCallback(), this.removeEventListener("d2l-label-change", this._handleLabelChange)
        }
        updateLabel(e) {
            this._label = e
        }
        _handleLabelChange(e) {
            e.stopPropagation(), this.updateLabel(e.detail)
        }
    },
    i = s => class extends(l(s)) {
        static get properties() {
            return {
                labelledBy: {
                    type: String,
                    reflect: !0,
                    attribute: "labelled-by"
                },
                label: {
                    type: String,
                    required: {
                        message: (e, l, t) => l.labelledBy ? `LabelledMixin: "${l.tagName.toLowerCase()}" is labelled-by="${l.labelledBy}", but its label is empty` : t,
                        validator: (e, l, t) => !(l.labelRequired && !t) || !!l.labelledBy && null !== l._labelElem
                    }
                }
            }
        }
        constructor() {
            super(), this.labelRequired = !0, this._labelElem = null, this._missingLabelErrorHasBeenThrown = !1
        }
        async updated(l) {
            if (super.updated(l), l.has("labelledBy"))
                if (this.labelledBy) {
                    const l = await (async (e, l, t) => {
                        let a = e.querySelector(l);
                        return a || new Promise(s => {
                            let i = 0;
                            const r = setInterval(() => {
                                if (a = e.querySelector(l), a || (i += 100), a || i > t) return clearInterval(r), void s(a)
                            }, 100)
                        })
                    })(this.getRootNode(), `#${e(this.labelledBy)}`, 3e3);
                    l || this._throwError(new Error(`LabelledMixin: "${this.tagName.toLowerCase()}" is labelled-by="${this.labelledBy}", but no such element exists`)), this._updateLabelElem(l)
                } else this._updateLabelElem(null)
        }
        _dispatchChangeEvent() {
            this.dispatchEvent(new CustomEvent("d2l-labelled-mixin-label-change", {
                bubbles: !1,
                composed: !1
            }))
        }
        _throwError(e) {
            this.labelRequired && !this._missingLabelErrorHasBeenThrown && (this._missingLabelErrorHasBeenThrown = !0, setTimeout(() => {
                throw e
            }))
        }
        _updateLabelElem(l) {
            const s = this.label;
            if (l === this._labelElem && this._labelElem) return this.label = a(this._labelElem), void(s !== this.label && this._dispatchChangeEvent());
            if (this._labelElem = l, this._labelObserver && this._labelObserver.disconnect(), !this._labelElem) return void(this.label = void 0);
            this._labelObserver = new MutationObserver(() => {
                const l = this.getRootNode().querySelector(`#${e(this.labelledBy)}`);
                t(l) ? requestAnimationFrame(() => {
                    this._updateLabelElem(l)
                }) : this._updateLabelElem(l)
            });
            const i = ((e, l) => {
                const t = new WeakMap;
                let a = e;
                for (; a;) t.set(a, a), a = a.parentNode;
                let s = l.parentNode;
                for (; s;) {
                    if (t.has(s)) return s;
                    s = s.parentNode
                }
            })(this, this._labelElem);
            t(this._labelElem) ? this._labelObserver.observe(i, {
                attributes: !0,
                attributeFilter: ["_label"],
                childList: !0,
                subtree: !0
            }) : this._labelObserver.observe(i, {
                characterData: !0,
                childList: !0,
                subtree: !0
            }), this.label = a(this._labelElem), s !== this.label && this._dispatchChangeEvent()
        }
    };
export {
    i as L, s as a
};