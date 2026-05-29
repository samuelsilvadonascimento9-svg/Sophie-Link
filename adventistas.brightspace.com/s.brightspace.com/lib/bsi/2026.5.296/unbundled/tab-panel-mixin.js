import {
    _ as t,
    b as e,
    a as s,
    c as i,
    d as a
} from "./_rollupPluginBabelHelpers.js";
import "./colors.js";
import "./icon.js";
import {
    a as o,
    i as l,
    b as n,
    r
} from "./lit-element.js";
import {
    e as d
} from "./class-map.js";
import {
    b as h,
    a as c
} from "./focus.js";
import {
    o as u,
    g as b
} from "./overflow.js";
import {
    S as p
} from "./skeleton-mixin.js";
import {
    h as f,
    f as _,
    i as m,
    j as g
} from "./dom.js";
import {
    A as v
} from "./arrow-keys-mixin.js";
import {
    b as w
} from "./styles.js";
import {
    o as x
} from "./if-defined.js";
import {
    L as S
} from "./localize-core-element.js";
import {
    c as y
} from "./repeat.js";
import {
    o as C
} from "./style-map.js";
import {
    g as P
} from "./uniqueId.js";
const R = 13,
    k = 32;
class T extends(p(o)) {
    static get properties() {
        return {
            ariaSelected: {
                type: String,
                reflect: !0,
                attribute: "aria-selected"
            },
            controlsPanel: {
                type: String,
                reflect: !0,
                attribute: "controls-panel"
            },
            role: {
                type: String,
                reflect: !0
            },
            text: {
                type: String
            }
        }
    }
    static get styles() {
        return [super.styles, l `
			:host {
				box-sizing: border-box;
				display: inline-block;
				max-width: 200px;
				outline: none;
				position: relative;
				vertical-align: middle;
			}
			.d2l-tab-text {
				--d2l-focus-ring-offset: 0;
				margin: 0.5rem;
				padding: 0.1rem;
				${u}
			}
			:host([skeleton]) .d2l-tab-text.d2l-skeletize::before {
				bottom: 0.15rem;
				top: 0.15rem;
			}
			:host(:first-child) .d2l-tab-text {
				margin-inline-start: 0;
			}
			.d2l-tab-selected-indicator {
				border-top: 4px solid var(--d2l-theme-brand-color-primary-default);
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				bottom: 0;
				display: none;
				margin: 1px 0.6rem 0 0.6rem;
				position: absolute;
				-webkit-transition: box-shadow 0.2s;
				transition: box-shadow 0.2s;
				width: calc(100% - 1.2rem);
			}
			:host([skeleton]) .d2l-tab-selected-indicator {
				position: absolute; /* make sure skeleton styles do not override this */
			}
			.d2l-tab-text-skeletize-override {
				min-width: 50px;
			}
			:host(:first-child) .d2l-tab-selected-indicator {
				margin-inline-start: 0;
				width: calc(100% - 0.6rem);
			}
			${h(t=>`:host(:${t}) > .d2l-tab-text`,{extraStyles:l`border-radius: 0.3rem; color: var(--d2l-theme-text-color-interactive-default);`})}
			:host([aria-selected="true"]:focus) {
				text-decoration: none;
			}
			:host(:hover) {
				color: var(--d2l-theme-text-color-interactive-default);
				cursor: pointer;
			}
			:host([aria-selected="true"]:hover) {
				color: inherit;
				cursor: default;
			}
			:host([aria-selected="true"]) .d2l-tab-selected-indicator {
				display: block;
			}

			@media (prefers-reduced-motion: reduce) {
				.d2l-tab-selected-indicator {
					-webkit-transition: none;
					transition: none;
				}
			}
		`]
    }
    constructor() {
        super(), this.ariaSelected = "false", this.role = "tab", this.tabIndex = -1
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.addEventListener("click", () => {
            this.ariaSelected = "true"
        }), this.addEventListener("keydown", t => {
            t.keyCode === k && (t.stopPropagation(), t.preventDefault())
        }), this.addEventListener("keyup", t => {
            t.keyCode !== R && t.keyCode !== k || (this.ariaSelected = "true")
        })
    }
    render() {
        const t = this.skeleton && (!this.text || 0 === this.text.length);
        return n `
			<div class="${d({"d2l-tab-text":!0,"d2l-skeletize":!0,"d2l-tab-text-skeletize-override":t})}">${t?n`&nbsp;`:this.text}</div>
			<div class="d2l-tab-selected-indicator d2l-skeletize-container"></div>
		`
    }
    update(t) {
        super.update(t), t.forEach((t, e) => {
            "ariaSelected" === e && "true" === this.ariaSelected ? this.dispatchEvent(new CustomEvent("d2l-tab-selected", {
                bubbles: !0,
                composed: !0
            })) : "text" === e && (this.title = this.text)
        })
    }
}
customElements.define("d2l-tab-internal", T);
const B = matchMedia("(prefers-reduced-motion: reduce)").matches,
    E = 56;
var I = new WeakMap,
    L = new WeakMap,
    $ = new WeakMap,
    z = new WeakSet;
class D extends(S(v(p(o)))) {
    static get properties() {
        return {
            maxToShow: {
                type: Number,
                attribute: "max-to-show"
            },
            text: {
                type: String
            },
            _allowScrollNext: {
                type: Boolean
            },
            _allowScrollPrevious: {
                type: Boolean
            },
            _defaultSlotBehavior: {
                state: !0
            },
            _maxWidth: {
                type: Number
            },
            _scrollCollapsed: {
                type: Boolean
            },
            _state: {
                type: String
            },
            _tabInfos: {
                type: Array
            },
            _translationValue: {}
        }
    }
    static get styles() {
        return [super.styles, w, l `
			:host {
				--d2l-tabs-background-color: var(--d2l-theme-background-color-base);
				box-sizing: border-box;
				display: block;
				margin-bottom: 1.2rem;
			}
			.d2l-tabs-layout {
				border-bottom: 1px solid var(--d2l-theme-border-color-subtle);
				display: none;
				max-height: 0;
				opacity: 0;
				transform: translateY(-10px);
				-webkit-transition: max-height 200ms ease-out, transform 200ms ease-out, opacity 200ms ease-out;
				transition: max-height 200ms ease-out, transform 200ms ease-out, opacity 200ms ease-out;
				width: 100%;
			}
			.d2l-tabs-layout-anim {
				display: flex;
			}
			.d2l-tabs-layout-shown {
				display: flex;
				max-height: 60px;
				opacity: 1;
				transform: none;
			}
			.d2l-tabs-container {
				box-sizing: border-box;
				flex: auto;
				margin-left: -3px;
				padding-left: 3px;
				position: relative;
				-webkit-transition: max-width 200ms ease-in;
				transition: max-width 200ms ease-in;
				${b({textOverflow:"clip"})}
			}
			.d2l-tabs-container-ext {
				flex: none;
				padding-inline: 4px 0;
			}
			.d2l-tabs-container-list {
				display: flex;
				position: relative;
				-webkit-transition: transform 200ms ease-out;
				transition: transform 200ms ease-out;
				white-space: nowrap;
			}
			.d2l-tabs-scroll-previous-container,
			.d2l-tabs-scroll-next-container {
				background-color: var(--d2l-tabs-background-color);
				box-shadow: 0 0 12px 18px var(--d2l-tabs-background-color);
				clip-path: rect(0% 200% 100% -100%);
				display: none;
				height: 100%;
				position: absolute;
				top: 0;
				z-index: 1;
			}
			.d2l-tabs-scroll-previous-container {
				inset-inline-start: 0;
				margin-inline: 4px 0;
			}
			.d2l-tabs-container[data-allow-scroll-previous] > .d2l-tabs-scroll-previous-container {
				display: inline-block;
			}
			.d2l-tabs-scroll-next-container {
				inset-inline-end: 0;
				margin-inline: 0 4px;
			}
			.d2l-tabs-container[data-allow-scroll-next] > .d2l-tabs-scroll-next-container {
				display: inline-block;
			}
			.d2l-tabs-scroll-button {
				background-color: transparent;
				border: 1px solid transparent;
				border-radius: 15px;
				box-sizing: border-box;
				cursor: pointer;
				display: inline-block;
				height: 30px;
				margin: 0;
				outline: none;
				padding: 0;
				transform: translateY(10px);
				width: 30px;
			}
			.d2l-tabs-scroll-button[disabled] {
				cursor: default;
				opacity: 0.5;
			}
			.d2l-tabs-scroll-button::-moz-focus-inner {
				border: 0;
			}
			.d2l-tabs-scroll-button[disabled]:hover,
			.d2l-tabs-scroll-button[disabled]:${r(c())} {
				background-color: transparent;
			}
			.d2l-tabs-scroll-button:hover,
			.d2l-tabs-scroll-button:${r(c())} {
				background-color: var(--d2l-theme-background-color-interactive-tertiary-hover);
			}
			${h(".d2l-tabs-scroll-button")}
			:host([skeleton]) .d2l-tabs-scroll-button {
				visibility: hidden;
			}
			.d2l-panels-container-no-whitespace ::slotted(*) {
				margin-top: 0;
				-webkit-transition: margin-top 200ms ease-out;
				transition: margin-top 200ms ease-out;
			}

			d2l-tab-internal, ::slotted([role="tab"]) {
				-webkit-transition: max-width 200ms ease-out, opacity 200ms ease-out, transform 200ms ease-out;
				transition: max-width 200ms ease-out, opacity 200ms ease-out, transform 200ms ease-out;
			}
			d2l-tab-internal[data-state="adding"],
			d2l-tab-internal[data-state="removing"],
			::slotted([role="tab"][data-state="adding"]),
			::slotted([role="tab"][data-state="removing"]) {
				max-width: 0;
				opacity: 0;
				transform: translateY(20px);
			}

			@media (prefers-reduced-motion: reduce) {

				.d2l-tabs-layout {
					-webkit-transition: none;
					transition: none;
				}
				.d2l-tabs-container {
					-webkit-transition: none;
					transition: none;
				}
				.d2l-tabs-container-list {
					-webkit-transition: none;
					transition: none;
				}
				.d2l-panels-container-no-whitespace ::slotted(*) {
					-webkit-transition: none;
					transition: none;
				}
				d2l-tab-internal, ::slotted([role="tab"]) {
					-webkit-transition: none;
					transition: none;
				}

			}

			@media (prefers-contrast: more) {
				.d2l-tabs-scroll-previous-container,
				.d2l-tabs-scroll-next-container {
					margin-inline: 0;
					padding-inline: 4px;
				}
				.d2l-tabs-scroll-next-container {
					border-inline-start: 1px solid var(--d2l-theme-border-color-subtle);
					padding-inline-start: 11px;
				}
				.d2l-tabs-scroll-previous-container {
					border-inline-end: 1px solid var(--d2l-theme-border-color-subtle);
					padding-inline-end: 11px;
				}
			}
		`]
    }
    constructor() {
        super(), t(this, z), e(this, I, void 0), e(this, L, void 0), e(this, $, void 0), this.maxToShow = -1, this._allowScrollNext = !1, this._allowScrollPrevious = !1, this._defaultSlotBehavior = !0, this._loadingCompleteResolve = void 0, this._loadingCompletePromise = new Promise(t => this._loadingCompleteResolve = t), this._maxWidth = null, this._scrollCollapsed = !1, this._state = "shown", this._tabIds = {}, this._tabInfos = [], this._translationValue = 0
    }
    connectedCallback() {
        super.connectedCallback(), queueMicrotask(() => {
            const t = this._getComputedBackgroundColor();
            t && "rgb(255, 255, 255)" !== t && "rgba(255, 255, 255, 1)" !== t && this.style.setProperty("--d2l-tabs-background-color", t)
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._resizeObserver && this._resizeObserver.disconnect()
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.arrowKeysFocusablesProvider = async () => this._defaultSlotBehavior ? [...this.shadowRoot.querySelectorAll("d2l-tab-internal")] : this._tabs, this.arrowKeysOnBeforeFocus = async t => {
            if (this._defaultSlotBehavior) {
                const e = this._getTabInfo(t.controlsPanel);
                if (this._setFocusableDefaultSlotBehavior(e), this.requestUpdate(), await this.updateComplete, this._scrollCollapsed) {
                    const t = this._getMeasures(),
                        i = this._calculateScrollPositionDefaultSlotBehavior(e, t);
                    if (s(z, this, N).call(this)) {
                        if (i <= 0) return
                    } else if (i >= 0) return;
                    return await this._tryExpandTabsContainer(t) ? void 0 : this._updateScrollPositionDefaultSlotBehavior(e)
                }
                return this._updateScrollPositionDefaultSlotBehavior(e)
            }
            if (this._setFocusable(t), this.requestUpdate(), await this.updateComplete, this._scrollCollapsed) {
                const e = this._getMeasures(),
                    i = this._calculateScrollPosition(t, e);
                if (s(z, this, N).call(this)) {
                    if (i <= 0) return
                } else if (i >= 0) return;
                return await this._tryExpandTabsContainer(e) ? void 0 : this._updateScrollPosition(t)
            }
            return this._updateScrollPosition(t)
        }, this._handleResize = this._handleResize.bind(this), this._resizeObserver = new ResizeObserver(this._handleResize), this._resizeObserver.observe(this.shadowRoot.querySelector(".d2l-tabs-container-list"))
    }
    render() {
        const t = {
                "d2l-tabs-layout": !0,
                "d2l-body-compact": !0,
                "d2l-skeletize-container": !0,
                "d2l-tabs-layout-anim": "anim" === this._state,
                "d2l-tabs-layout-shown": "shown" === this._state
            },
            e = {
                "d2l-panels-container": !0,
                "d2l-panels-container-no-whitespace": "shown" !== this._state
            },
            i = {};
        this._maxWidth && (i["max-width"] = `${this._maxWidth}px`);
        const a = {
            transform: `translateX(${this._translationValue}px)`
        };
        return n `
			<div class="${d(t)}">
				<div ?data-allow-scroll-next="${this._allowScrollNext}"
					?data-allow-scroll-previous="${this._allowScrollPrevious}"
					class="d2l-tabs-container"
					style="${C(i)}">
					<div class="d2l-tabs-scroll-previous-container">
						<button class="d2l-tabs-scroll-button"
							@click="${this._handleScrollPrevious}"
							title="${this.localize("components.tabs.previous")}">
							<d2l-icon icon="tier1:chevron-left"></d2l-icon>
						</button>
					</div>
					${this.arrowKeysContainer(n`
						<div class="d2l-tabs-container-list"
							@d2l-tab-content-change="${this._handleTabContentChange}"
							@d2l-tab-hidden-change="${s(z,this,V)}"
							@d2l-tab-selected="${this._handleTabSelected}"
							@d2l-tab-deselected="${s(z,this,A)}"
							@focusout="${this._handleFocusOut}"
							aria-label="${x(this.text)}"
							role="tablist"
							style="${C(a)}">
							${y(this._tabInfos,t=>t.id,t=>n`
								<d2l-tab-internal aria-selected="${t.selected?"true":"false"}"
									.controlsPanel="${t.id}"
									data-state="${t.state}"
									?skeleton="${this.skeleton}"
									tabindex="${t.activeFocusable?0:-1}"
									text="${t.text}">
								</d2l-tab-internal>
							`)}
							<slot name="tabs" @slotchange="${this._handleTabsSlotChange}"></slot>
						</div>
					`)}
					<div class="d2l-tabs-scroll-next-container">
						<button class="d2l-tabs-scroll-button"
							@click="${this._handleScrollNext}"
							title="${this.localize("components.tabs.next")}">
							<d2l-icon icon="tier1:chevron-right"></d2l-icon>
						</button>
					</div>
				</div>
				<div class="d2l-tabs-container-ext"><slot name="ext"></slot></div>
			</div>
			<div class="${d(e)}"
				@d2l-tab-panel-selected="${this._handlePanelSelected}"
				@d2l-tab-panel-text-changed="${this._handlePanelTextChange}">
				<slot @slotchange="${this._handleDefaultSlotChange}"></slot>
				<slot name="panels" @slotchange="${this._handlePanelsSlotChange}"></slot>
			</div>
		`
    }
    focus() {
        return this._focusSelected()
    }
    async getLoadingComplete() {
        return this._loadingCompletePromise
    }
    getTabListRect() {
        if (this.shadowRoot) return this.shadowRoot.querySelector(".d2l-tabs-container-list").getBoundingClientRect()
    }
    hideTab(t) {
        return t.setAttribute("data-state", "removing"), Object.keys(this._tabIds).length > 1 && !B ? this._animateTabRemoval(t) : Promise.resolve()
    }
    _animateTabAddition(t) {
        return new Promise(!t || B ? e => {
            t.setAttribute("data-state", ""), this.requestUpdate(), e()
        } : e => {
            const s = i => {
                "max-width" === i.propertyName && (t.removeEventListener("transitionend", s), e())
            };
            t.addEventListener("transitionend", s), t.setAttribute("data-state", ""), this.requestUpdate()
        })
    }
    _animateTabAdditionDefaultSlotBehavior(t) {
        const e = this.shadowRoot && this.shadowRoot.querySelector(`d2l-tab-internal[controls-panel="${f(t.id)}"]`);
        return e || Promise.resolve(), new Promise(s => {
            const i = t => {
                "max-width" === t.propertyName && (e.removeEventListener("transitionend", i), s())
            };
            e.addEventListener("transitionend", i), t.state = "", this.requestUpdate()
        })
    }
    _animateTabRemoval(t) {
        return !t || B ? Promise.resolve() : new Promise(e => {
            const s = i => {
                "max-width" === i.propertyName && (t.removeEventListener("transitionend", s), this.requestUpdate(), e())
            };
            t.addEventListener("transitionend", s)
        })
    }
    _animateTabRemovalDefaultSlotBehavior(t) {
        const e = this.shadowRoot && this.shadowRoot.querySelector(`d2l-tab-internal[controls-panel="${f(t.id)}"]`);
        return e || Promise.resolve(), new Promise(s => {
            const i = a => {
                "max-width" === a.propertyName && (e.removeEventListener("transitionend", i), this._tabInfos.splice(this._tabInfos.findIndex(e => e.id === t.id), 1), this.requestUpdate(), s())
            };
            e.addEventListener("transitionend", i)
        })
    }
    _calculateScrollPosition(t, e) {
        const i = this._tabs,
            a = i.indexOf(t);
        return s(z, this, q).call(this, i, a, e)
    }
    _calculateScrollPositionDefaultSlotBehavior(t, e) {
        const i = this._tabInfos.indexOf(t);
        return s(z, this, q).call(this, this._tabInfos, i, e)
    }
    async _focusSelected() {
        if (this._defaultSlotBehavior) return void this._focusSelectedDefaultSlotBehavior();
        const t = this._tabs.find(t => t.selected);
        t && (await this._updateScrollPosition(t), t.focus())
    }
    async _focusSelectedDefaultSlotBehavior() {
        const t = this.shadowRoot && this.shadowRoot.querySelector('d2l-tab-internal[aria-selected="true"]');
        if (!t) return;
        const e = this._getTabInfo(t.controlsPanel);
        await this._updateScrollPositionDefaultSlotBehavior(e), t.focus()
    }
    _getComputedBackgroundColor() {
        let t = null;
        return _(this, e => {
            if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
            const s = getComputedStyle(e, null).backgroundColor;
            return "rgba(0, 0, 0, 0)" !== s && "transparent" !== s && (t = s, !0)
        }), t
    }
    _getMeasures() {
        return this._measures || this._updateMeasures(), this._measures
    }
    _getPanel(t) {
        return this._defaultSlotBehavior ? this._getPanelDefaultSlotBehavior(t) : i(L, this) ? i(L, this).find(e => e.labelledBy === t) : void 0
    }
    _getPanelDefaultSlotBehavior(t) {
        if (!this.shadowRoot) return;
        const e = this.shadowRoot.querySelector(".d2l-panels-container").querySelector("slot"),
            s = this._getPanelsDefaultSlotBehavior(e);
        for (let e = 0; e < s.length; e++)
            if (s[e].nodeType === Node.ELEMENT_NODE && "tabpanel" === s[e].role && s[e].id === t) return s[e]
    }
    _getPanelsDefaultSlotBehavior(t) {
        if (t) return t.assignedElements({
            flatten: !0
        }).filter(t => "tabpanel" === t.role)
    }
    _getTabInfo(t) {
        return this._tabInfos.find(e => e.id === t)
    }
    async _handleDefaultSlotChange(t) {
        if (!this._defaultSlotBehavior) return;
        const e = this._getPanelsDefaultSlotBehavior(t.target);
        if (this._updateTabListVisibility(e), !this._initialized && 0 === e.length) return;
        let s = null;
        const i = e.map(t => {
            let i = "";
            this._initialized && !B && e.length !== this._tabInfos.length && -1 === this._tabInfos.findIndex(e => e.id === t.id) && (i = "adding");
            const a = {
                id: t.id,
                text: t.text,
                selected: t.selected,
                state: i
            };
            return a.selected && (s = a, this._setFocusableDefaultSlotBehavior(a)), a
        });
        this._initialized && !B && this._tabInfos.length !== i.length && this._tabInfos.forEach((t, e) => {
            -1 === i.findIndex(e => e.id === t.id) && (t.state = "removing", t.selected = !1, i.splice(e, 0, t))
        }), this._tabInfos = i, this._tabInfos.length > 0 && !s && (s = this._tabInfos.find(t => "removing" !== t.state), s && (s.activeFocusable = !0, s.selected = !0)), await this.updateComplete;
        const a = [];
        !this._initialized && this._tabInfos.length > 0 ? (this._initialized = !0, await this._updateTabsContainerWidthDefaultSlotBehavior(s)) : (this._tabInfos.length > 1 && this._tabInfos.forEach(t => {
            "adding" === t.state ? a.push(this._animateTabAdditionDefaultSlotBehavior(t)) : "removing" === t.state && a.push(this._animateTabRemovalDefaultSlotBehavior(t))
        }), this._updateMeasures()), s && Promise.all(a).then(() => (this._updateMeasures(), this._updateScrollPositionDefaultSlotBehavior(s)))
    }
    _handleFocusOut(t) {
        t.relatedTarget && "tab" === t.relatedTarget.role || this._resetFocusables()
    }
    _handlePanelSelected(t) {
        if (!this._defaultSlotBehavior) return;
        const e = this._getTabInfo(t.target.id);
        e && (this._setFocusableDefaultSlotBehavior(e), e.selected = !0, this.requestUpdate())
    }
    _handlePanelsSlotChange(t) {
        this._defaultSlotBehavior || (a(L, this, t.target.assignedElements({
            flatten: !0
        }).filter(t => "tabpanel" === t.role)), s(z, this, M).call(this), s(z, this, j).call(this))
    }
    async _handlePanelTextChange(t) {
        const e = this._getTabInfo(t.target.id);
        e && (e.text = t.target.text, this.requestUpdate(), await this.updateComplete, this._updateMeasures(), await this._updateScrollVisibility(this._getMeasures()))
    }
    _handleResize(t) {
        const e = this._getMeasures();
        1 === t.length && t[0].contentRect.width === e.tabsContainerListRect.width || (this._updateMeasures(), this._updateScrollVisibility(this._getMeasures()))
    }
    async _handleScrollNext() {
        const t = this._getMeasures(),
            e = await this._tryExpandTabsContainer(t) ? this._getMeasures() : t;
        let i;
        const a = t.tabRects[t.tabRects.length - 1];
        let o;
        s(z, this, N).call(this) ? (i = this._translationValue + t.tabsContainerRect.width - E, i > 0 && (i -= E), o = a.offsetLeft + i < 0, o || (i = -1 * a.offsetLeft, i < 0 && (i = 0))) : (i = this._translationValue - t.tabsContainerRect.width + E, i < 0 && (i += E), o = a.offsetLeft + a.rect.width + i >= e.tabsContainerRect.width, o || (i = -1 * (a.offsetLeft - e.tabsContainerRect.width + a.rect.width), i > 0 && (i = 0))), await this._scrollToPosition(i), await this._updateScrollVisibility(e), !o && this.shadowRoot && this.shadowRoot.querySelector(".d2l-tabs-scroll-previous-container button").focus()
    }
    async _handleScrollPrevious() {
        const t = this._getMeasures(),
            e = await this._tryExpandTabsContainer(t) ? this._getMeasures() : t;
        let i, a;
        s(z, this, N).call(this) ? (i = this._translationValue - t.tabsContainerRect.width + E, a = i > 0, a || (i = 0)) : (i = this._translationValue + t.tabsContainerRect.width - E, a = i < 0, a || (i = 0)), await this._scrollToPosition(i), await this._updateScrollVisibility(e), !a && this.shadowRoot && this.shadowRoot.querySelector(".d2l-tabs-scroll-next-container button").focus()
    }
    async _handleTabContentChange() {
        this._updateMeasures(), await this._updateScrollVisibility(this._getMeasures())
    }
    async _handleTabSelected(t) {
        if (this._defaultSlotBehavior) return void this._handleTabSelectedDefaultSlotBehavior(t);
        const e = t.target;
        s(z, this, U).call(this, e), await this.updateComplete, this._updateScrollPosition(e)
    }
    async _handleTabSelectedDefaultSlotBehavior(t) {
        t.stopPropagation();
        const e = t.target,
            s = this._getPanel(e.controlsPanel),
            i = this._getTabInfo(e.controlsPanel);
        i.activeFocusable = !0, await this.updateComplete, this._updateScrollPositionDefaultSlotBehavior(i), s.selected = !0, this._tabInfos.forEach(t => {
            if (t.id !== e.controlsPanel) {
                if (t.selected) {
                    t.selected = !1;
                    const e = this._getPanel(t.id);
                    e && (e.selected = !1)
                }
                t.activeFocusable && (t.activeFocusable = !1)
            }
        }), this.requestUpdate()
    }
    async _handleTabsSlotChange(t) {
        if (this._defaultSlotBehavior = !1, this._tabs = t.target.assignedElements({
                flatten: !0
            }).filter(t => "tab" === t.role), this._updateTabListVisibility(this._tabs), !this._initialized && 0 === this._tabs.length) return;
        let e = null;
        const i = {};
        this._tabs ? .forEach(t => {
            this._initialized && !B && this._tabs.length !== Object.keys(this._tabIds).length && (this._tabIds[t.id] || (this._tabIds[t.id] = !0, t.setAttribute("data-state", "adding"))), !e && t.selected && "removing" !== t.getAttribute("data-state") && (e = t), i[t.id] = !0
        }), this._tabIds = i, e || (e = this._tabs.find(t => "removing" !== t.getAttribute("data-state")), e && (e.selected = !0)), e && s(z, this, U).call(this, e), await this.updateComplete, s(z, this, M).call(this), s(z, this, j).call(this);
        const a = [];
        !this._initialized && this._tabs.length > 0 ? (this._initialized = !0, await this._updateTabsContainerWidth(e)) : (this._tabs.length > 1 && this._tabs.forEach(t => {
            "adding" === t.getAttribute("data-state") && a.push(this._animateTabAddition(t))
        }), this._updateMeasures()), e && Promise.all(a).then(() => {
            this._updateMeasures(), this._updateScrollPosition(e)
        })
    }
    _isPositionInLeftScrollArea(t) {
        return t > 0 && t < E
    }
    _isPositionInRightScrollArea(t, e) {
        return t > e.tabsContainerRect.width - E && t < e.tabsContainerRect.width
    }
    _resetFocusables() {
        if (this._defaultSlotBehavior) {
            const t = this._tabInfos.find(t => t.selected);
            t && this._setFocusableDefaultSlotBehavior(t)
        } else {
            const t = this._tabs.find(t => t.selected);
            t && this._setFocusable(t)
        }
        this.requestUpdate()
    }
    _scrollToPosition(t) {
        return t === this._translationValue ? Promise.resolve() : (this._translationValue = t, !this.shadowRoot || B ? this.updateComplete : new Promise(t => {
            const e = this.shadowRoot.querySelector(".d2l-tabs-container-list"),
                s = i => {
                    "transform" === i.propertyName && (e.removeEventListener("transitionend", s), t())
                };
            e.addEventListener("transitionend", s)
        }))
    }
    _setFocusable(t) {
        const e = this._tabs.find(t => 0 === t.tabIndex);
        e && (e.tabIndex = -1), t.tabIndex = 0
    }
    _setFocusableDefaultSlotBehavior(t) {
        const e = this._tabInfos.find(t => t.activeFocusable);
        e && (e.activeFocusable = !1), t.activeFocusable = !0
    }
    async _tryExpandTabsContainer(t) {
        if (!this._scrollCollapsed) return !1;
        let e;
        return this.maxToShow = null, B ? (this._scrollCollapsed = !1, this._maxWidth = t.totalTabsWidth + 50, e = this.updateComplete) : e = new Promise(e => {
            const s = this.shadowRoot && this.shadowRoot.querySelector(".d2l-tabs-container"),
                i = t => {
                    "max-width" === t.propertyName && (s && s.removeEventListener("transitionend", i), e())
                };
            s && s.addEventListener("transitionend", i), this._scrollCollapsed = !1, this._maxWidth = t.totalTabsWidth + 50
        }), await e, this._measures = null, await this._updateScrollVisibility(this._getMeasures()), this._maxWidth = null, this._allowScrollNext || (this._allowScrollPrevious ? this.shadowRoot && this.shadowRoot.querySelector(".d2l-tabs-scroll-previous-container button").focus() : this._focusSelected()), await this.updateComplete, !0
    }
    _updateMeasures() {
        let t = 0;
        if (!this.shadowRoot) return;
        const e = (this._defaultSlotBehavior ? [...this.shadowRoot.querySelectorAll("d2l-tab-internal")] : this._tabs).map(e => {
            const s = e.getBoundingClientRect(),
                i = this._defaultSlotBehavior ? e.offsetLeft : function(t, e) {
                    const s = g(t);
                    return Math.round(e.left - s.getBoundingClientRect().left)
                }(e, s),
                a = {
                    rect: s,
                    offsetLeft: i
                };
            return t += a.rect.width, a
        });
        this._measures = {
            tabsContainerRect: this.shadowRoot.querySelector(".d2l-tabs-container").getBoundingClientRect(),
            tabsContainerListRect: this.shadowRoot.querySelector(".d2l-tabs-container-list").getBoundingClientRect(),
            tabRects: e,
            totalTabsWidth: t
        }
    }
    _updateScrollPosition(t) {
        const e = this._getMeasures(),
            i = this._calculateScrollPosition(t, e);
        return s(z, this, O).call(this, e, i)
    }
    _updateScrollPositionDefaultSlotBehavior(t) {
        const e = this._getMeasures(),
            i = this._calculateScrollPositionDefaultSlotBehavior(t, e);
        return s(z, this, O).call(this, e, i)
    }
    _updateScrollVisibility(t) {
        const e = t.tabRects[t.tabRects.length - 1];
        return e ? (s(z, this, N).call(this) ? (this._allowScrollPrevious = this._translationValue > 0, this._allowScrollNext = e.offsetLeft + this._translationValue < 0) : (this._allowScrollPrevious = this._translationValue < 0, this._allowScrollNext = e.offsetLeft + e.rect.width + this._translationValue > t.tabsContainerRect.width), this.updateComplete) : Promise.resolve()
    }
    _updateTabListVisibility(t) {
        "shown" === this._state && t.length < 2 ? s(z, this, F).call(this) : "hidden" === this._state && t.length > 1 ? s(z, this, W).call(this) : "shown" === this._state && t.length > 1 && s(z, this, V).call(this)
    }
    _updateTabsContainerWidth(t) {
        const e = this._tabs;
        if (!(!this.maxToShow || this.maxToShow <= 0 || this.maxToShow >= e.length || e.indexOf(t) > this.maxToShow - 1)) return s(z, this, K).call(this)
    }
    _updateTabsContainerWidthDefaultSlotBehavior(t) {
        if (!(!this.maxToShow || this.maxToShow <= 0 || this.maxToShow >= this._tabInfos.length || this._tabInfos.indexOf(t) > this.maxToShow - 1)) return s(z, this, K).call(this)
    }
}

function q(t, e, i) {
    if (!i.tabRects[e]) return 0;
    const a = i.tabRects[e],
        o = a.offsetLeft + this._translationValue < 0,
        l = a.offsetLeft + a.rect.width + this._translationValue > i.tabsContainerRect.width,
        n = s(z, this, N).call(this);
    let r;
    r = n ? () => 0 === e ? 0 : e === t.length - 1 ? -1 * a.offsetLeft : i.tabsContainerRect.width / 2 - (a.offsetLeft + a.rect.width / 2) + a.rect.width / 2 : () => 0 === e ? 0 : e === t.length - 1 ? -1 * (a.offsetLeft - i.tabsContainerRect.width + a.rect.width) : -1 * (a.offsetLeft - i.tabsContainerRect.width / 2 + a.rect.width / 2);
    let d, h = this._translationValue;
    return (o || l) && (h = r()), n ? (d = a.offsetLeft + a.rect.width + h, h > 0 && this._isPositionInRightScrollArea(d, i) && (h = r())) : (d = a.offsetLeft + h, h < 0 && this._isPositionInLeftScrollArea(d) && (h = r())), n ? h < 0 && (h = 0) : h > 0 && (h = 0), n ? (d = a.offsetLeft + h, e < t.length - 1 && this._isPositionInLeftScrollArea(d) && (h = r())) : (d = a.offsetLeft + a.rect.width + h, e < t.length - 1 && this._isPositionInRightScrollArea(d, i) && (h = r())), h
}

function M() {
    i(I, this) || (a(I, this, !0), setTimeout(() => {
        this._tabs && !i(L, this) || i(L, this) && !this._tabs ? console.warn("d2l-tabs: tabs and panels are not in sync") : this._tabs.length !== i(L, this).length && console.warn("d2l-tabs: number of tabs and panels does not match"), a(I, this, !1)
    }, 0))
}

function A(t) {
    const e = this._getPanel(t.target.id);
    e && (e.selected = !1)
}

function V() {
    if (!this._tabs || this._tabs.length <= 1) return;
    let t = 0;
    this._tabs.forEach(e => {
        e.hidden || t++
    }), t > 1 && "hidden" === this._state ? s(z, this, W).call(this) : t <= 1 && "shown" === this._state && s(z, this, F).call(this)
}

function F() {
    if (!B && this._initialized && m(this)) {
        if (this.shadowRoot) {
            const t = this.shadowRoot.querySelector(".d2l-tabs-layout"),
                e = s => {
                    "max-height" === s.propertyName && (t.removeEventListener("transitionend", e), this._state = "hidden")
                };
            t.addEventListener("transitionend", e), this._state = "anim"
        }
    } else this._state = "hidden"
}

function N() {
    return "rtl" === document.documentElement.getAttribute("dir")
}

function j() {
    i($, this) || (a($, this, !0), setTimeout(() => {
        this._tabs ? .forEach(t => {
            const e = this._getPanel(t.id);
            e ? t.setAttribute("aria-controls", `${e.id}`) : console.warn("d2l-tabs: tab without matching panel")
        }), a($, this, !1)
    }, 0))
}

function W() {
    B || !this._initialized ? this._state = "shown" : (this._state = "anim", requestAnimationFrame(() => {
        this._state = "shown"
    }))
}

function O(t, e) {
    const s = this._scrollToPosition(e),
        i = this._updateScrollVisibility(t),
        a = Promise.all([i, s]);
    return a.then(() => {
        this._loadingCompleteResolve && (this._loadingCompleteResolve(), this._loadingCompleteResolve = void 0)
    }), a
}
async function U(t) {
    await this.updateComplete, t.selected = !0, t.tabIndex = 0;
    const e = this._getPanel(t.id);
    e && (e.selected = !0), this._tabs.forEach(e => {
        if (e.id !== t.id) {
            if (e.selected) {
                e.selected = !1;
                const t = this._getPanel(e.id);
                t && (t.selected = !1)
            }
            0 === e.tabIndex && (e.tabIndex = -1)
        }
    })
}

function K() {
    const t = this._getMeasures();
    let e = 4;
    for (let s = 0; s < this.maxToShow; s++) e += t.tabRects[s].rect.width;
    if (t.tabsContainerListRect.width > e && (e += E), !(e >= t.tabsContainerRect.width)) return this._maxWidth = e, this._scrollCollapsed = !0, this._measures = null, this.updateComplete
}
customElements.define("d2l-tabs", D);
const Y = t => class extends t {
    static get properties() {
        return {
            labelledBy: {
                type: String,
                attribute: "labelled-by",
                reflect: !0
            },
            noPadding: {
                type: Boolean,
                attribute: "no-padding",
                reflect: !0
            },
            role: {
                type: String,
                reflect: !0
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
    static get styles() {
        return l `
			:host {
				box-sizing: border-box;
				display: none;
				margin: 1.2rem 0 0 0;
			}
			:host([no-padding]) {
				margin: 0;
			}
			:host([selected]) {
				display: block;
			}
		`
    }
    constructor() {
        super(), this.noPadding = !1, this.role = "tabpanel", this.selected = !1
    }
    connectedCallback() {
        super.connectedCallback(), 0 === this.id.length && (this.id = P())
    }
    updated(t) {
        super.updated(t), t.forEach((t, e) => {
            "labelledBy" === e ? this.setAttribute("aria-labelledby", this.labelledBy) : "selected" === e ? this.selected && requestAnimationFrame(() => {
                this.dispatchEvent(new CustomEvent("d2l-tab-panel-selected", {
                    bubbles: !0,
                    composed: !0
                }))
            }) : "text" === e && (this.setAttribute("aria-label", this.text), this.dispatchEvent(new CustomEvent("d2l-tab-panel-text-changed", {
                bubbles: !0,
                composed: !0,
                detail: {
                    text: this.text
                }
            })))
        })
    }
};
export {
    Y as T
};