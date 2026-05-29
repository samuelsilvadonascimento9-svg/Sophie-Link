import "./colors.js";
import "./icon.js";
import {
    i as e,
    b as t,
    a as i
} from "./lit-element.js";
import {
    L as s
} from "./localize-core-element.js";
import {
    M as o,
    m as r
} from "./menu-item-styles.js";
import {
    o as n
} from "./overflow.js";
import {
    n as a,
    r as h,
    f as d,
    e as c,
    b as l
} from "./dom.js";
import {
    c as u,
    d as m
} from "./focus.js";
import {
    g as _
} from "./flags.js";
import {
    P as w
} from "./property-required-mixin.js";
import {
    T as v
} from "./theme-mixin.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./localize-mixin.js";
import "./_rollupPluginBabelHelpers.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./if-defined.js";
import "./dedupeMixin.js";
const p = _("GAUD-9520-ignore-no-op-resize-events", !0),
    f = matchMedia("(prefers-reduced-motion: reduce)").matches,
    b = document.createElement("div").focus,
    g = t => class extends t {
        static get properties() {
            return {
                hierarchicalView: {
                    type: Boolean
                },
                rootView: {
                    type: Boolean,
                    attribute: "root-view"
                },
                shown: {
                    type: Boolean,
                    reflect: !0
                },
                _childView: {
                    type: Boolean,
                    reflect: !0,
                    attribute: "child-view"
                }
            }
        }
        static get styles() {
            return e `
			:host {
				--d2l-hierarchical-view-height-transition: height 300ms linear;
				box-sizing: border-box;
				display: none;
				left: 0;
				overflow: hidden;
				position: relative;
				-webkit-transition: var(--d2l-hierarchical-view-height-transition);
				transition: var(--d2l-hierarchical-view-height-transition);
				width: 100%;
			}
			:host([child-view]) {
				display: none;
				left: 100%;
				position: absolute;
				top: 0;
			}
			:host([shown]) {
				display: inline-block;
				vertical-align: top; /* DE37329: required to prevent extra spacing caused by inline-block */
			}
			.d2l-hierarchical-view-content {
				position: relative;
			}
			.d2l-hierarchical-view-content.d2l-child-view-show {
				-webkit-animation: show-child-view-animation forwards 300ms linear;
				animation: show-child-view-animation 300ms forwards linear;
			}
			.d2l-hierarchical-view-content.d2l-child-view-hide {
				-webkit-animation: hide-child-view-animation forwards 300ms linear;
				animation: hide-child-view-animation 300ms forwards linear;
			}
			@media (prefers-reduced-motion: reduce) {
				:host {
					-webkit-transition: none;
					transition: none;
				}
				.d2l-hierarchical-view-content.d2l-child-view-show {
					-webkit-animation: none;
					animation: none;
					left: -100%;
				}
				.d2l-hierarchical-view-content.d2l-child-view-hide {
					-webkit-animation: none;
					animation: none;
					left: 0;
				}
			}
			@keyframes show-child-view-animation {
				0% { left: 0; }
				100% { left: -100%; }
			}
			@-webkit-keyframes show-child-view-animation {
				0% { left: 0; }
				100% { left: -100%; }
			}
			@keyframes hide-child-view-animation {
				0% { left: -100%; }
				100% { left: 0; }
			}
			@-webkit-keyframes hide-child-view-animation {
				0% { left: -100%; }
				100% { left: 0; }
			}
		`
        }
        constructor() {
            super(), this.hierarchicalView = !0, this.rootView = !1, this._childView = !1, this.__focusPrevious = !1, this.__intersectionObserver = null, this.__isAutoSized = !1, this.__resizeObserver = null, this.__hideAnimations = []
        }
        connectedCallback() {
            super.connectedCallback(), this.__updateRootView(), "function" == typeof IntersectionObserver && (this.__intersectionObserver = new IntersectionObserver(e => {
                e.forEach(e => {
                    e.isIntersecting && this.__autoSize(this)
                })
            }), this.__intersectionObserver.observe(this)), requestAnimationFrame(() => {
                this.isConnected && ("function" != typeof IntersectionObserver && this.__autoSize(this), this.__startResizeObserver(), this._childView || (this.addEventListener("focus", this.__focusCapture, !0), this.addEventListener("focusout", this.__focusOutCapture, !0), this.__onWindowResize = this.__onWindowResize.bind(this), p ? a(this.__onWindowResize) : window.addEventListener("resize", this.__onWindowResize)))
            })
        }
        disconnectedCallback() {
            super.disconnectedCallback(), this.removeEventListener("focus", this.__focusCapture), this.removeEventListener("focusout", this.__focusOutCapture), p ? h(this.__onWindowResize) : window.removeEventListener("resize", this.__onWindowResize), this.__intersectionObserver && (this.__intersectionObserver.disconnect(), this.__isAutoSized = !1), this.__resizeObserver && this.__resizeObserver.disconnect()
        }
        firstUpdated(e) {
            super.firstUpdated(e), this.addEventListener("keydown", this.__onKeyDown), this.addEventListener("d2l-hierarchical-view-hide-start", this.__onHideStart), this.addEventListener("d2l-hierarchical-view-show-start", this.__onShowStart), this.addEventListener("d2l-hierarchical-view-resize", this.__onViewResize);
            const t = e => {
                this._childView && e.stopPropagation()
            };
            this.addEventListener("beforeinput", t), this.addEventListener("click", t), this.addEventListener("keydown", t), this.addEventListener("keyup", t), this.addEventListener("keypress", t), this.__updateRootView(), this.rootView && (this.addEventListener("d2l-hierarchical-view-hide-complete", this.__stopPropagation), this.addEventListener("d2l-hierarchical-view-hide-start", this.__stopPropagation), this.addEventListener("d2l-hierarchical-view-show-complete", this.__stopPropagation), this.addEventListener("d2l-hierarchical-view-show-start", this.__stopPropagation), this.addEventListener("d2l-hierarchical-view-resize", this.__stopPropagation))
        }
        getActiveView() {
            const e = this.getRootView(),
                t = e.querySelectorAll("[child-view][shown]");
            if (!t || 0 === t.length) return e;
            for (let e = 0; e < t.length; e++) {
                const i = t[e];
                if (i.isActive()) return i
            }
            return e
        }
        getRootView() {
            if (this.rootView || !this._childView) return this;
            return d(this.parentNode, e => e.rootView)
        }
        hide(e, t) {
            t || (t = this);
            const i = {
                bubbles: !0,
                composed: !0,
                detail: {
                    data: e,
                    isSource: t === this,
                    sourceView: t
                }
            };
            this.dispatchEvent(new CustomEvent("d2l-hierarchical-view-hide-start", i))
        }
        isActive() {
            if (this._childView && !this.shown || !this.shadowRoot) return !1;
            return !this.shadowRoot.querySelector(".d2l-hierarchical-view-content").classList.contains("d2l-child-view-show")
        }
        resize() {
            this.__dispatchViewResize()
        }
        show(e, t) {
            const i = (e, i) => {
                    i.shown = !0;
                    const s = {
                        bubbles: !0,
                        composed: !0,
                        detail: {
                            isSource: t === this,
                            data: e,
                            sourceView: t
                        }
                    };
                    i.dispatchEvent(new CustomEvent("d2l-hierarchical-view-show-start", s))
                },
                s = (e, t) => {
                    const i = t.querySelectorAll("[child-view][shown]");
                    for (let t = 0; t < i.length; t++) i[t].hide(e);
                    this.resize()
                };
            if (t) return void i(e, this);
            t = this;
            const o = this.getActiveView();
            c(o, this) ? i(e, this) : c(this, o) ? s(e, this) : (s(e, this.getRootView()), i(e, this))
        }
        __autoSize(e) {
            this.__isAutoSized || this._childView || requestAnimationFrame(() => {
                if (null === e.offsetParent) return;
                let t;
                this.__isAutoSized = !0, t = e === this && this.shadowRoot ? this.shadowRoot.querySelector(".d2l-hierarchical-view-content").getBoundingClientRect() : e.getBoundingClientRect(), this.style.height = `${t.height}px`
            })
        }
        __dispatchHideComplete(e) {
            const t = {
                bubbles: !0,
                composed: !0,
                detail: {
                    activeView: this.getActiveView(),
                    data: e
                }
            };
            this.dispatchEvent(new CustomEvent("d2l-hierarchical-view-hide-complete", t))
        }
        __dispatchShowComplete(e) {
            const t = {
                bubbles: !0,
                composed: !0,
                detail: {
                    activeView: this.getActiveView(),
                    data: e
                }
            };
            this.dispatchEvent(new CustomEvent("d2l-hierarchical-view-show-complete", t))
        }
        __dispatchViewResize() {
            if (!this.isActive()) {
                return void this.getActiveView().resize()
            }
            if (!this.shadowRoot) return;
            const e = this.shadowRoot.querySelector(".d2l-hierarchical-view-content").getBoundingClientRect();
            if (e.height < 1) return;
            const t = {
                bubbles: !0,
                composed: !0,
                detail: e
            };
            requestAnimationFrame(() => {
                this.dispatchEvent(new CustomEvent("d2l-hierarchical-view-resize", t))
            })
        }
        __focusCapture(e) {
            if (this.__getParentViewFromEvent(e).isActive()) return;
            const t = e.relatedTarget;
            let i;
            const s = () => {
                const e = this.getActiveView();
                return b === e.focus ? m(e) : e
            };
            t ? i = c(this, t) ? u(this) : s() : this.__focusPrevious ? (this.__focusPrevious = !1, i = u(this)) : i = s(), i && i.focus()
        }
        __focusOutCapture(e) {
            const t = e.relatedTarget,
                i = this.getActiveView();
            this.__focusPrevious = !1, c(i, e.target) && c(this, t) && (this.__focusPrevious = !0)
        }
        __getParentViewFromEvent(e) {
            const t = e.composedPath();
            for (let e = 1; e < t.length; e++)
                if (t[e].hierarchicalView) return t[e]
        }
        __onHideStart(e) {
            this.__resetAncestorTabIndicies(e.detail.sourceView);
            const t = e.composedPath()[0];
            if (t === this || !t.hierarchicalView) return;
            const i = this.__getParentViewFromEvent(e);
            if (this.shadowRoot && i === this) {
                const i = this.shadowRoot.querySelector(".d2l-hierarchical-view-content"),
                    s = e.detail.data,
                    o = !!i.offsetParent && !f,
                    r = () => {
                        t.shown = !1, requestAnimationFrame(() => {
                            this.__removeAncestorTabIndicies(this.getActiveView()), t.__dispatchHideComplete(s)
                        })
                    };
                if (o) {
                    const e = () => {
                        const t = this.__hideAnimations.indexOf(e);
                        this.__hideAnimations.splice(t, 1), i.removeEventListener("animationend", e), i.classList.remove("d2l-child-view-hide"), r()
                    };
                    this.__hideAnimations.push(e), i.addEventListener("animationend", e), i.classList.add("d2l-child-view-hide")
                }
                i.classList.remove("d2l-child-view-show"), o || (this.__hideAnimations.forEach(e => e()), r());
                const n = {
                    bubbles: !0,
                    composed: !0,
                    detail: i.getBoundingClientRect()
                };
                this.dispatchEvent(new CustomEvent("d2l-hierarchical-view-resize", n))
            }
        }
        __onKeyDown(e) {
            if (this._childView && 27 === e.keyCode) return e.stopPropagation(), void this.hide()
        }
        __onShowStart(e) {
            this.__removeAncestorTabIndicies(e.detail.sourceView);
            const t = e.composedPath()[0];
            if (t === this || !t.hierarchicalView) return;
            this._childView && !this.shown && this.show(e.detail.data, e.detail.sourceView);
            const i = this.shadowRoot && this.shadowRoot.querySelector(".d2l-hierarchical-view-content");
            if (this.shadowRoot && f) i.classList.add("d2l-child-view-show"), requestAnimationFrame(() => {
                e.detail.sourceView.__dispatchShowComplete(e.detail.data, e.detail)
            });
            else if (this.shadowRoot) {
                if (e.detail.isSource && this.__getParentViewFromEvent(e) === this) {
                    const t = () => {
                        i.removeEventListener("animationend", t), e.detail.sourceView.__dispatchShowComplete(e.detail.data, e.detail)
                    };
                    i.addEventListener("animationend", t)
                }
                i.classList.add("d2l-child-view-show")
            }
            e.detail.isSource && this.__getParentViewFromEvent(e) === this && requestAnimationFrame(() => {
                e.detail.sourceView.__dispatchViewResize()
            })
        }
        __onViewResize(e) {
            this._height !== e.detail.height && (this._height = e.detail.height, this.style.height = `${e.detail.height}px`)
        }
        __onWindowResize() {
            const e = this.getActiveView();
            e && e.__dispatchViewResize()
        }
        __removeAncestorTabIndicies(e) {
            this.__updateAncestorTabIndicies(e, "tabindex", "data-d2l-hierarchical-view-tabindex")
        }
        __resetAncestorTabIndicies(e) {
            this.__updateAncestorTabIndicies(e, "data-d2l-hierarchical-view-tabindex", "tabindex")
        }
        __startResizeObserver() {
            const e = this.shadowRoot.querySelector(".d2l-hierarchical-view-content");
            e && (this.__bound_dispatchViewResize = this.__bound_dispatchViewResize || this.__dispatchViewResize.bind(this), this.__resizeObserver = this.__resizeObserver || new ResizeObserver(this.__bound_dispatchViewResize), this.__resizeObserver.disconnect(), this.__resizeObserver.observe(e))
        }
        __stopPropagation(e) {
            e.stopPropagation()
        }
        __updateAncestorTabIndicies(e, t, i) {
            const s = this.getRootView();
            let o = l(e);
            for (; o && o !== s;) {
                if (o.nodeType === Node.ELEMENT_NODE) {
                    const e = o.getAttribute(t);
                    null !== e && (o.setAttribute(i, e), o.removeAttribute(t))
                }
                o = l(o)
            }
        }
        __updateRootView() {
            if (!this.hasAttribute("root-view")) {
                const e = d(this.parentNode, e => e.hierarchicalView);
                this.rootView = !e
            }
            this._childView = !this.rootView
        }
    };
class y extends(s(o(i))) {
    static get styles() {
        return [r, e `
				:host {
					display: flex;
					padding: 0.75rem 1rem;
				}

				span {
					flex: auto;
					line-height: 1rem;
					${n}
				}

				d2l-icon {
					flex: none;
					margin-inline-end: 1rem;
					margin-top: 0.1rem;
				}
			`]
    }
    constructor() {
        super(), this.text = null
    }
    render() {
        return t `
			<d2l-icon icon="tier1:chevron-left"></d2l-icon>
			<span aria-hidden="true">${this.text}</span>
		`
    }
    willUpdate(e) {
        super.willUpdate(e), e.has("text") && (this.text ? this.setAttribute("aria-label", this.localize("components.menu-item-return.returnCurrentlyShowing", "menuTitle", this.text)) : this.setAttribute("aria-label", this.localize("components.menu-item-return.return")))
    }
}
customElements.define("d2l-menu-item-return", y);
const V = 40,
    A = 13,
    E = 27,
    x = 37,
    C = 32,
    R = 38;
class z extends(w(v(g(i)))) {
    static get properties() {
        return {
            active: {
                type: Boolean,
                reflect: !0
            },
            label: {
                type: String,
                required: !0
            },
            role: {
                type: String,
                attribute: "role"
            }
        }
    }
    static get styles() {
        return [super.styles, e `
			:host {
				--d2l-menu-background-color: var(--d2l-theme-background-color-base);
				--d2l-menu-background-color-hover: var(--d2l-theme-brand-color-highlight);
				--d2l-menu-border-color: var(--d2l-theme-border-color-subtle);
				--d2l-menu-border-color-hover: var(--d2l-theme-border-color-focus);
				--d2l-menu-foreground-color: var(--d2l-theme-text-color-static-standard);
				--d2l-menu-foreground-color-hover: var(--d2l-theme-brand-color-primary-hover);
				--d2l-menu-separator-color: var(--d2l-theme-border-color-emphasized);
				box-sizing: border-box;
				display: block;
				min-width: 180px;
				padding-top: 1px;
				width: 100%;
			}

			:host([active]) .d2l-menu-items d2l-menu-item-return[role="menuitem"],
			:host([active]) .d2l-menu-items ::slotted([role="menuitem"]),
			:host([active]) .d2l-menu-items ::slotted([role="menuitemcheckbox"]),
			:host([active]) .d2l-menu-items ::slotted([role="menuitemradio"]) {
				position: relative;
			}

			:host([theme="dark"]) {
				--d2l-menu-background-color: #333536; /* tungsten @ 70% */
				--d2l-menu-background-color-hover: #123559; /* celestine-1 @ 50% */
				--d2l-menu-border-color: var(--d2l-color-tungsten);
				--d2l-menu-border-color-hover: #ffffff;
				--d2l-menu-foreground-color: var(--d2l-color-sylvite);
				--d2l-menu-foreground-color-hover: #ffffff;
				--d2l-menu-separator-color: var(--d2l-color-galena);
				--d2l-icon-fill-color: var(--d2l-color-mica);
				background-color: var(--d2l-menu-background-color); /* so that opacity on disabled items works */
			}
		`]
    }
    constructor() {
        super(), this.role = "menu", this._items = []
    }
    connectedCallback() {
        super.connectedCallback(), this.active = this.getActiveView() === this
    }
    firstUpdated(e) {
        super.firstUpdated(e), this.addEventListener("d2l-hierarchical-view-show-start", this._onShowStart), this.addEventListener("d2l-hierarchical-view-hide-complete", this._onHideComplete), this.addEventListener("d2l-hierarchical-view-show-complete", this._onShowComplete), this.addEventListener("d2l-hierarchical-view-resize", this._onViewResize), this.addEventListener("d2l-menu-item-visibility-change", this._onMenuItemsChanged), this.addEventListener("keydown", this._onKeyDown), this.addEventListener("keypress", this._onKeyPress), this._labelChanged(), this._onMenuItemsChanged();
        this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
            this._onMenuItemsChanged()
        }), this.setAttribute("role", this.role)
    }
    render() {
        return t `
			<div class="d2l-menu-items d2l-hierarchical-view-content">
				<slot></slot>
			</div>
		`
    }
    updated(e) {
        super.updated(e), e.forEach((e, t) => {
            if ("label" === t && this._labelChanged(), "rootView" === t && !this.rootView) {
                const e = this.shadowRoot.querySelector(".d2l-menu-items");
                e.insertBefore(this._createReturnItem(), e.childNodes[0]), this._onMenuItemsChanged()
            }
        })
    }
    focus() {
        if ("menu-radio" === this.getMenuType()) this._focusSelected();
        else {
            const e = this._getTabFocusable();
            e ? this._focusItem(e) : this._focusFirst()
        }
    }
    getMenuType() {
        if (0 === this._items.length) return "menu";
        switch (this._items[0].role) {
            case "menuitemradio":
                return "menu-radio";
            case "menuitemcheckbox":
                return "menu-checkbox";
            default:
                return "menu"
        }
    }
    resetFocusables() {
        this._getTabFocusable() ? .setAttribute("tabindex", "-1")
    }
    _createReturnItem() {
        const e = document.createElement("d2l-menu-item-return");
        return e.addEventListener("d2l-menu-item-select", e => {
            e.stopPropagation(), this.hide()
        }), e.text = this.label, e
    }
    _focusFirst() {
        const e = this._getTabFocusable();
        e && e.setAttribute("tabindex", "-1");
        const t = this._tryGetNextFocusable();
        t && this._focusItem(t)
    }
    _focusItem(e) {
        e.setAttribute("tabindex", "0"), e.focus()
    }
    _focusLast() {
        const e = this._tryGetPreviousFocusable();
        e && this._focusItem(e)
    }
    _focusNext(e) {
        e.setAttribute("tabindex", "-1"), (e = this._tryGetNextFocusable(e)) ? this._focusItem(e) : this._focusFirst()
    }
    _focusPrevious(e) {
        e.setAttribute("tabindex", "-1"), (e = this._tryGetPreviousFocusable(e)) ? this._focusItem(e) : this._focusLast()
    }
    _focusSelected() {
        const e = this.querySelector("[selected]");
        e ? this._focusItem(e) : this._focusFirst()
    }
    _getFirstVisibleItem() {
        for (let e = 0; e < this._items.length; e++)
            if (!this._items[e].hidden) return this._items[e];
        return null
    }
    _getLastVisibleItem() {
        for (let e = this._items.length - 1; e >= 0; e--)
            if (!this._items[e].hidden) return this._items[e];
        return null
    }
    _getMenuItemReturn() {
        return this.shadowRoot && this.shadowRoot.querySelector("d2l-menu-item-return")
    }
    async _getMenuItems() {
        const e = this.shadowRoot && this.shadowRoot.querySelector("slot");
        if (!e) return;
        const t = e.assignedNodes({
                flatten: !0
            }).filter(e => e.nodeType === Node.ELEMENT_NODE),
            i = this._getMenuItemReturn();
        return i && t.unshift(i), await Promise.all(t.map(e => e.updateComplete)), t.filter(e => {
            const t = e.getAttribute("role");
            return "menuitem" === t || "menuitemcheckbox" === t || "menuitemradio" === t || "D2L-MENU-ITEM-RETURN" === e.tagName
        })
    }
    _getTabFocusable() {
        return this._items.find(e => "0" === e.getAttribute("tabindex"))
    }
    _isFocusable(e) {
        return 1 === e.nodeType && (("0" === e.getAttribute("tabindex") || "-1" === e.getAttribute("tabindex")) && "none" !== window.getComputedStyle(e, null).getPropertyValue("display"))
    }
    _labelChanged() {
        "string" == typeof this.label && this.label.trim().length > 0 ? this.setAttribute("aria-label", this.label) : this.removeAttribute("aria-label");
        const e = this._getMenuItemReturn();
        e && e.setAttribute("text", this.label)
    }
    _onHideComplete() {
        this.resetFocusables(), this.active = this.isActive()
    }
    _onKeyDown(e) {
        const t = e.composedPath()[0];
        if (-1 !== this._items.indexOf(t)) return e.keyCode === V || e.keyCode === R ? (e.preventDefault(), e.stopPropagation(), void(e.keyCode === V ? this._focusNext(t) : e.keyCode === R && this._focusPrevious(t))) : this.rootView || e.keyCode !== x ? void 0 : (e.stopPropagation(), void this.hide())
    }
    _onKeyPress(e) {
        const t = e.composedPath()[0];
        if (-1 === this._items.indexOf(t)) return;
        if (e.keyCode === V || e.keyCode === R || e.keyCode === C || e.keyCode === A || e.keyCode === E) return;
        e.stopPropagation(), t.setAttribute("tabindex", "-1");
        const i = function(e, t) {
                return !!(e.text && e.text.length > 0 && e.text.toLowerCase().substr(0, 1) === t)
            },
            s = this._items.filter(this._isFocusable, this);
        if (!s || 0 === s.length) return;
        const o = s.indexOf(e.composedPath()[0]),
            r = function(e) {
                return e === s.length - 1 ? 0 : e + 1
            }.bind(this),
            n = String.fromCharCode(e.charCode).toLowerCase();
        let a = r(o);
        for (; a !== o;) {
            const e = s[a];
            if (i(e, n)) return void this._focusItem(e);
            a = r(a)
        }
    }
    _onMenuItemsChanged() {
        requestAnimationFrame(async () => {
            this._items = await this._getMenuItems(), this._updateItemAttributes()
        })
    }
    _onShowComplete() {
        this.isActive() && this.focus()
    }
    _onShowStart() {
        this.active = this.isActive()
    }
    _onViewResize(e) {
        if (!this.rootView) return;
        const t = {
            bubbles: !0,
            composed: !0,
            detail: e.detail
        };
        this.dispatchEvent(new CustomEvent("d2l-menu-resize", t))
    }
    _tryGetNextFocusable(e) {
        const t = this._items.filter(this._isFocusable, this);
        if (!t || 0 === t.length) return;
        if (!e) return t[0];
        const i = t.indexOf(e);
        return i !== t.length - 1 ? t[i + 1] : void 0
    }
    _tryGetPreviousFocusable(e) {
        const t = this._items.filter(this._isFocusable, this);
        if (!t || 0 === t.length) return;
        if (!e) return t[t.length - 1];
        const i = t.indexOf(e);
        return 0 !== i ? t[i - 1] : void 0
    }
    _updateItemAttributes() {
        if (!this._items || 0 === this._items.length) return;
        const e = [];
        for (let t = 0; t < this._items.length; t++) {
            const i = this._items[t];
            i.removeAttribute("first"), i.removeAttribute("last"), i.hidden || (i.setAttribute("tabindex", 0 === e.length ? 0 : -1), e.push(i))
        }
        e.length > 0 && (e[0].setAttribute("first", !0), e[e.length - 1].setAttribute("last", !0))
    }
}
customElements.define("d2l-menu", z);
export {
    g as H
};