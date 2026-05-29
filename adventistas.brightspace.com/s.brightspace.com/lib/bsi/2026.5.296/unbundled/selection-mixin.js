import {
    b as e,
    d as t,
    c as s
} from "./_rollupPluginBabelHelpers.js";
import {
    d as i,
    c as n,
    e as l,
    f as o
} from "./focus.js";
import {
    C as c
} from "./collection-mixin.js";
import {
    e as a
} from "./dom.js";
const r = 40,
    d = 37,
    h = 39;
var b = new WeakMap,
    u = new WeakMap,
    p = new WeakMap;
class S {
    constructor(s, i, n) {
        e(this, b, void 0), e(this, u, void 0), e(this, p, void 0), n || (n = !1), s || (s = []), i || (i = S.states.none), t(b, this, n), t(u, this, s), t(p, this, i)
    }
    get allEnabledSelected() {
        return s(b, this)
    }
    get keys() {
        return s(u, this)
    }
    get state() {
        return s(p, this)
    }
    static get states() {
        return {
            none: "none",
            some: "some",
            all: "all",
            allPages: "all-pages",
            notSet: "not-set"
        }
    }
}
const v = e => class extends(c(e)) {
    static get properties() {
        return {
            selectionNoInputArrowKeyBehaviour: {
                type: Boolean,
                attribute: "selection-no-input-arrow-key-behavior"
            },
            selectionSingle: {
                type: Boolean,
                attribute: "selection-single"
            }
        }
    }
    constructor() {
        super(), this.selectionNoInputArrowKeyBehaviour = !1, this.selectionSingle = !1, this._selectAllPages = !1, this._selectionObservers = new Map, this._selectionSelectables = new Map
    }
    connectedCallback() {
        super.connectedCallback(), this.selectionSingle && this.addEventListener("keydown", this._handleRadioKeyDown), this.selectionSingle && this.addEventListener("keyup", this._handleRadioKeyUp), this.addEventListener("d2l-selection-change", this._handleSelectionChange), this.addEventListener("d2l-selection-observer-subscribe", this._handleSelectionObserverSubscribe), this.addEventListener("d2l-selection-input-subscribe", this._handleSelectionInputSubscribe), requestAnimationFrame(() => {
            this.dispatchEvent(new CustomEvent("d2l-selection-provider-connected", {
                bubbles: !0,
                composed: !0
            }))
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.selectionSingle && this.removeEventListener("keydown", this._handleRadioKeyDown), this.selectionSingle && this.removeEventListener("keyup", this._handleRadioKeyUp), this.removeEventListener("d2l-selection-change", this._handleSelectionChange), this.removeEventListener("d2l-selection-observer-subscribe", this._handleSelectionObserverSubscribe), this.removeEventListener("d2l-selection-input-subscribe", this._handleSelectionInputSubscribe)
    }
    getSelectionInfo() {
        let e = !0,
            t = this._selectionSelectables.size > 0 ? S.states.none : S.states.notSet;
        const s = [];
        return this._selectAllPages ? t = S.states.allPages : (this._selectionSelectables.forEach(i => {
            i.selected && s.push(i.key), i.disabled || i.selected || (e = !1), i._indeterminate && (t = S.states.some)
        }), s.length > 0 && (t = s.length === this._selectionSelectables.size ? S.states.all : S.states.some)), new S(s, t, e)
    }
    setSelectionForAll(e, t) {
        if (this.selectionSingle && e) return;
        this._selectAllPages = e && t;
        const {
            allEnabledSelected: s
        } = this.getSelectionInfo();
        this._selectionSelectables.forEach(t => {
            this.selectionSingle || this._selectAllPages ? t.selected !== e && (t.selected = e) : t.disabled || t.selected === !s || (t.selected = !s)
        }), this._updateSelectionObservers()
    }
    subscribeObserver(e) {
        this._selectionObservers.has(e) || (this._selectionObservers.set(e, e), this._updateSelectionObservers())
    }
    unsubscribeObserver(e) {
        this._selectionObservers.delete(e)
    }
    unsubscribeSelectable(e) {
        this._selectionSelectables.delete(e), this._updateSelectionObservers()
    }
    _focusSelectAll() {
        for (const e of this._selectionObservers.values())
            if ("D2L-SELECTION-SELECT-ALL" === e.tagName) {
                e.focus();
                break
            }
    }
    _handleRadioKeyDown(e) {
        e.composedPath()[0].classList.contains("d2l-selection-input-radio") && e.keyCode >= d && e.keyCode <= r && (e.stopPropagation(), e.preventDefault())
    }
    _handleRadioKeyUp(e) {
        const t = e.composedPath()[0];
        if (!t.classList.contains("d2l-selection-input-radio") || this.selectionNoInputArrowKeyBehaviour) return;
        if (e.keyCode < d || e.keyCode > r) return;
        const s = (e, t) => {
                for (; e;) {
                    if (e.classList.contains("d2l-selection-input-radio")) {
                        const t = e.getRootNode().host;
                        if (!t.focusDisabled && this._selectionSelectables.has(t)) return t
                    }
                    if (!a(this, e)) return null;
                    e = t ? i(e, !1, !0, !0) : n(e, !1)
                }
            },
            c = "rtl" === document.documentElement.getAttribute("dir"),
            b = !c && e.keyCode === h || c && e.keyCode === d || e.keyCode === r;
        let u = b ? i(t, !1, !0, !0) : n(t, !1),
            p = s(u, b);
        p || (u = b ? l(this, !1) : o(this, !1), p = s(u, b)), p && (p.disabled || (p.selected = !0), p.focus())
    }
    _handleSelectionChange(e) {
        if (e.detail.selected || (this._selectAllPages = !1), this.selectionSingle && e.detail.selected) {
            const t = e.composedPath().find(e => "D2L-SELECTION-INPUT" === e.tagName);
            this._selectionSelectables.forEach(e => {
                e.selected && e !== t && (e.selected = !1)
            })
        }
        this._updateSelectionObservers()
    }
    _handleSelectionInputSubscribe(e) {
        e.stopPropagation(), e.detail.provider = this;
        const t = e.composedPath()[0];
        this._selectionSelectables.has(t) || (this._selectionSelectables.set(t, t), this.selectionSingle && t.selected && this._selectionSelectables.forEach(e => {
            e.selected && e !== t && (e.selected = !1)
        }), this._updateSelectionObservers())
    }
    _handleSelectionObserverSubscribe(e) {
        e.stopPropagation(), e.detail.provider = this;
        const t = e.composedPath()[0];
        this.subscribeObserver(t)
    }
    _updateSelectionObservers() {
        this._selectionObservers && 0 !== this._selectionObservers.size && (this._updateObserversRequested || (this._updateObserversRequested = !0, setTimeout(() => {
            const e = this.getSelectionInfo(!0);
            this._selectionObservers.forEach(t => t.selectionInfo = e), this._updateObserversRequested = !1
        }, 0)))
    }
};
export {
    S,
    v as a
};