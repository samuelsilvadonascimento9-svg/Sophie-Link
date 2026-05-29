import "./colors.js";
import "./icon-custom.js";
import "./expand-collapse-content.js";
import {
    a as e,
    i as l,
    b as a
} from "./lit-element.js";
import {
    d as t,
    e as n,
    f as s,
    h as i
} from "./styles.js";
import {
    e as o
} from "./class-map.js";
import {
    E as r
} from "./subscriberControllers.js";
import {
    F as d
} from "./focus-mixin.js";
import {
    g as p
} from "./focus.js";
import {
    o as c
} from "./if-defined.js";
import {
    e as h
} from "./dom.js";
import {
    S as b
} from "./skeleton-mixin.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./_rollupPluginBabelHelpers.js";
import "./style-map.js";
import "./directive.js";
import "./dedupeMixin.js";
let m = !1,
    u = !1;
class g extends(b(d(e))) {
    static get properties() {
        return {
            panelTitle: {
                attribute: "panel-title",
                type: String,
                reflect: !0
            },
            headingLevel: {
                attribute: "heading-level",
                type: String,
                reflect: !0
            },
            headingStyle: {
                attribute: "heading-style",
                type: String,
                reflect: !0
            },
            expanded: {
                type: Boolean,
                reflect: !0
            },
            expandCollapseLabel: {
                attribute: "expand-collapse-label",
                type: String,
                reflect: !0
            },
            type: {
                type: String,
                reflect: !0
            },
            paddingType: {
                attribute: "padding-type",
                type: String,
                reflect: !0
            },
            noSticky: {
                attribute: "no-sticky",
                type: Boolean
            },
            _focused: {
                state: !0
            },
            _hasBefore: {
                state: !0
            },
            _hasSummary: {
                state: !0
            },
            _isLastPanelInGroup: {
                state: !0
            },
            _scrolled: {
                state: !0
            }
        }
    }
    static get styles() {
        return [super.styles, t, n, s, i, l `
			:host {
				--d2l-collapsible-panel-focus-outline: solid 2px var(--d2l-theme-border-color-focus);
				--d2l-collapsible-panel-spacing-inline: 0.9rem;
				--d2l-collapsible-panel-header-spacing: 0.6rem;
				--d2l-collapsible-panel-transition-time: 0.2s;
				--d2l-collapsible-panel-arrow-time: 0.5s;
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host([padding-type="large"][type="inline"]) {
				--d2l-collapsible-panel-spacing-inline: 2rem;
			}
			.d2l-collapsible-panel {
				border: 1px solid var(--d2l-theme-border-color-standard);
				border-radius: 0.4rem;
			}
			:host(:not([expanded]):not([skeleton])) .d2l-collapsible-panel {
				cursor: pointer;
			}
			:host([type="subtle"]) .d2l-collapsible-panel {
				background-color: var(--d2l-theme-background-color-base);
				border: none;
				box-shadow: var(--d2l-theme-shadow-attached);
			}
			:host([type="inline"]) .d2l-collapsible-panel {
				border-left: none;
				border-radius: 0;
				border-right: none;
				outline-offset: -2px;
			}
			:host([type="inline"]) .d2l-collapsible-panel.no-bottom-border {
				border-bottom: none;
			}
			:host([heading-style="1"]) {
				--d2l-collapsible-panel-header-spacing: 1.2rem;
			}
			:host([heading-style="4"]) {
				--d2l-collapsible-panel-header-spacing: 0.3rem;
			}
			.d2l-collapsible-panel-before {
				grid-row: 1/-1;
			}
			.d2l-collapsible-panel.has-before .d2l-collapsible-panel-before {
				margin: 0.3rem 0;
				margin-inline-start: var(--d2l-collapsible-panel-spacing-inline);
			}
			.d2l-collapsible-panel-header {
				border-radius: 0.4rem;
				cursor: pointer;
				display: grid;
				grid-template-columns: auto 1fr;
				grid-template-rows: auto auto;
				padding: var(--d2l-collapsible-panel-header-spacing) 0;
			}
			:host(:not([skeleton])) .d2l-collapsible-panel-header {
				cursor: pointer;
			}
			:host([type="inline"]) .d2l-collapsible-panel-header {
				border-radius: 0;
				outline-offset: -2px;
			}
			.d2l-collapsible-panel.scrolled .d2l-collapsible-panel-header {
				background-color: var(--d2l-theme-background-color-base);
				box-shadow: 0 8px 12px -9px rgba(0, 0, 0, 0.3);
				position: sticky;
				top: 0;
				z-index: 11; /* must be greater greater than list-items with open dropdowns or tooltips */
			}
			.d2l-collapsible-panel.focused.scrolled .d2l-collapsible-panel-header {
				top: 2px;
			}
			.d2l-collapsible-panel-title {
				flex: 1;
				margin: 0.3rem;
				margin-inline-start: var(--d2l-collapsible-panel-spacing-inline);
				overflow-wrap: anywhere;
				user-select: none;
			}
			.d2l-collapsible-panel.has-before .d2l-collapsible-panel-title {
				margin-inline-start: 0.75rem;
			}

			.d2l-collapsible-panel.focused,
			:host([expanded]) .d2l-collapsible-panel.focused .d2l-collapsible-panel-header {
				outline: var(--d2l-collapsible-panel-focus-outline);
			}
			@supports selector(:has(a, b)) {
				.d2l-collapsible-panel.focused,
				:host([expanded]) .d2l-collapsible-panel.focused .d2l-collapsible-panel-header {
					outline: none;
				}
				.d2l-collapsible-panel.focused:has(:focus-visible),
				:host([expanded]) .d2l-collapsible-panel.focused:has(:focus-visible) .d2l-collapsible-panel-header {
					outline: var(--d2l-collapsible-panel-focus-outline);
				}
			}
			:host([expanded]) .d2l-collapsible-panel {
				outline: none;
			}

			.d2l-collapsible-panel-header-primary {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}
			.d2l-collapsible-panel-header-secondary {
				display: flex;
				margin-inline-end: var(--d2l-collapsible-panel-spacing-inline);
				margin-inline-start: var(--d2l-collapsible-panel-spacing-inline);
			}
			.d2l-collapsible-panel.has-before .d2l-collapsible-panel-header-secondary {
				margin-inline-start: 0.75rem;
			}
			.d2l-collapsible-panel-header-secondary ::slotted(*) {
				cursor: default;
			}
			.d2l-collapsible-panel-header-actions {
				align-self: self-start;
				display: flex;
				gap: 0.3rem;
			}
			.d2l-collapsible-panel-header-actions::after {
				border-inline-end: 1px solid var(--d2l-theme-border-color-standard);
				content: "";
				display: flex;
				margin: 0.3rem;
			}
			.d2l-collapsible-panel-opener {
				background-color: transparent;
				border: none;
				color: inherit;
				cursor: pointer;
				font-family: inherit;
				font-size: inherit;
				font-weight: inherit;
				letter-spacing: inherit;
				line-height: inherit;
				outline: none;
				padding-block: 0;
				padding-inline: 0;
				text-align: inherit;
			}
			d2l-icon-custom {
				align-self: self-start;
				height: 0.9rem;
				margin: 0.6rem;
				margin-inline-end: var(--d2l-collapsible-panel-spacing-inline);
				position: relative;
				transform: var(--d2l-mirror-transform, ${"rtl"===document.dir?l`scale(-1, 1)`:l`none`}); /* stylelint-disable-line @stylistic/string-quotes, @stylistic/function-whitespace-after */
				transform-origin: center;
				width: 0.9rem;
			}
			d2l-icon-custom svg {
				position: absolute;
				transform-origin: 0.4rem;
			}
			:host([expanded]) d2l-icon-custom svg {
				fill: currentColor;
				transform: rotate(90deg);
			}
			@media (prefers-reduced-motion: no-preference) {
				.d2l-collapsible-panel-divider {
					transition: opacity var(--d2l-collapsible-panel-transition-time) ease-in-out;
				}
				d2l-icon-custom svg {
					animation: d2l-collapsible-panel-opener-close var(--d2l-collapsible-panel-arrow-time) ease-in-out;
				}
				:host([expanded]) d2l-icon-custom svg {
					animation: d2l-collapsible-panel-opener-open var(--d2l-collapsible-panel-arrow-time) ease-in-out;
				}
				/* stylelint-disable order/properties-alphabetical-order */
				@keyframes d2l-collapsible-panel-opener-open {
					0% { transform: rotate(0deg); }
					25% { transform: rotate(105deg); animation-timing-function: ease-in-out; }
					50% { transform: rotate(82deg); animation-timing-function: ease-in-out; }
					75% { transform: rotate(93deg); animation-timing-function: ease-in-out; }
					100% { transform: rotate(90deg); animation-timing-function: ease-in-out; }
				}
				@keyframes d2l-collapsible-panel-opener-close {
					0% { transform: rotate(90deg); }
					25% { transform: rotate(-15deg); animation-timing-function: ease-in-out; }
					50% { transform: rotate(8deg); animation-timing-function: ease-in-out; }
					75% { transform: rotate(-3deg); animation-timing-function: ease-in-out; }
					100% { transform: rotate(0deg); animation-timing-function: ease-in-out; }
				}
				/* stylelint-enable */
			}
			.d2l-collapsible-panel-divider {
				border-bottom: 1px solid var(--d2l-theme-border-color-standard);
				margin-inline: var(--d2l-collapsible-panel-spacing-inline);
				opacity: 1;
			}
			:host([type=inline]) .d2l-collapsible-panel-divider {
				opacity: 0;
			}
			:host(:not([expanded])) .d2l-collapsible-panel:not(.has-summary) .d2l-collapsible-panel-divider {
				opacity: 0;
			}
			.d2l-collapsible-panel-summary,
			.d2l-collapsible-panel-content {
				padding: 0.9rem var(--d2l-collapsible-panel-spacing-inline);
			}
			:host([type=inline]) .d2l-collapsible-panel-summary,
			:host([type=inline]) .d2l-collapsible-panel-content {
				padding-top: 0;
			}
			:host([type="inline"]) .d2l-collapsible-panel-summary {
				margin-top: -0.3rem;
			}
			.d2l-collapsible-panel:not(.has-summary) .d2l-collapsible-panel-summary {
				display: none;
			}
		`]
    }
    constructor() {
        super(), this.expanded = !1, this.headingLevel = 3, this.headingStyle = 3, this.paddingType = "default", this.type = "default", this.noSticky = !1, this._focused = !1, this._group = void 0, this._groupSubscription = new r(this, "collapsible-panel-group", {
            onSubscribe: e => {
                this._group = e, this._group._updatePanelAttributes()
            }
        }), this._hasSummary = !1, this._isLastPanelInGroup = !0, this._scrolled = !1
    }
    static get focusElementSelector() {
        return ".d2l-collapsible-panel-opener"
    }
    connectedCallback() {
        super.connectedCallback(), u || (u = !0, document.addEventListener("keydown", e => {
            9 === e.keyCode && (m = !0)
        }), document.addEventListener("keyup", e => {
            9 === e.keyCode && (m = !1)
        }))
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._intersectionObserver && this._intersectionObserver.disconnect()
    }
    render() {
        const e = {
            "d2l-collapsible-panel": !0,
            focused: this._focused,
            "has-summary": this._hasSummary,
            "has-before": this._hasBefore,
            scrolled: this._scrolled,
            "no-bottom-border": "inline" === this.type && !this._isLastPanelInGroup
        };
        return a `
			<div class="${o(e)}" @click="${this._handlePanelClick}">
				<div class="d2l-collapsible-panel-top-sentinel"></div>
				${this._renderHeader()}
				<d2l-expand-collapse-content
					?expanded="${this.expanded}"
					@d2l-expand-collapse-content-collapse="${this._handleExpandCollapse}"
					@d2l-expand-collapse-content-expand="${this._handleExpandCollapse}">
					<div class="d2l-collapsible-panel-content">
						<slot></slot>
					</div>
				</d2l-expand-collapse-content>
				<d2l-expand-collapse-content ?expanded="${!this.expanded}">
					<div class="d2l-collapsible-panel-summary">
						<slot name="summary" @slotchange="${this._handleSummarySlotChange}"></slot>
					</div>
				</d2l-expand-collapse-content>
			</div>
		`
    }
    updated(e) {
        super.updated(e), e.has("expanded") && (this.expanded || (this._scrolled = !1)), e.has("noSticky") && this._stickyObserverUpdate(), e.has("type") && this._group ? ._updatePanelAttributes()
    }
    _handleActionsClick(e) {
        const l = this.shadowRoot.querySelector(".d2l-collapsible-panel-header-actions");
        e.target !== l && e.stopPropagation()
    }
    _handleBeforeSlotChange(e) {
        const l = e.target.assignedNodes({
            flatten: !0
        });
        this._hasBefore = l ? .length > 0
    }
    _handleExpandCollapse(e) {
        const l = this.expanded ? e.detail.expandComplete : e.detail.collapseComplete,
            a = this.expanded ? "d2l-collapsible-panel-expand" : "d2l-collapsible-panel-collapse";
        this.dispatchEvent(new CustomEvent(a, {
            bubbles: !1,
            composed: !1,
            detail: {
                complete: l
            }
        }))
    }
    _handleHeaderSecondaryClick(e) {
        const l = this.shadowRoot.querySelector(".d2l-collapsible-panel-header-secondary");
        e.target !== l && e.stopPropagation()
    }
    _handlePanelClick(e) {
        const l = this.shadowRoot.querySelector(".d2l-collapsible-panel-content");
        e.target !== l && e.target.isConnected && !h(l, e.target) && this._toggleExpand()
    }
    _handleSummarySlotChange(e) {
        const l = e.target.assignedNodes({
            flatten: !0
        });
        this._hasSummary = l ? .length > 0
    }
    _onBlur() {
        setTimeout(() => {
            p() !== this.shadowRoot.querySelector("button") && (this._focused = !1)
        }, 10)
    }
    _onFocus() {
        m && (this._focused = !0)
    }
    _renderHeader() {
        return a `
			<div class="d2l-collapsible-panel-header">
				<div class="d2l-collapsible-panel-before">
					<slot name="before" @slotchange="${this._handleBeforeSlotChange}"></slot>
				</div>
				<div class="d2l-collapsible-panel-header-primary">
					${this._renderPanelTitle()}
					<div class="d2l-collapsible-panel-header-actions" @click="${this._handleActionsClick}">
						<slot name="actions"></slot>
					</div>
					<d2l-icon-custom size="tier1" class="d2l-skeletize" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" fill="none" viewBox="0 0 10 18">
							<path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="m9 9-8 8V1l8 8Z"/>
						</svg>
					</d2l-icon-custom>
				</div>
				<div class="d2l-collapsible-panel-header-secondary" @click="${this._handleHeaderSecondaryClick}">
					<slot name="header"></slot>
				</div>
			</div>
			<div class="d2l-collapsible-panel-divider"></div>
		`
    }
    _renderPanelTitle() {
        let e = 3 === this.headingStyle && this.headingLevel !== this.headingStyle ? this.headingLevel : this.headingStyle;
        var l;
        l = e, e = (l = parseInt(l)) < 1 ? 1 : l > 4 ? 4 : l;
        const t = {
                "d2l-collapsible-panel-title": !0,
                "d2l-skeletize": !0,
                [`d2l-heading-${e}`]: !0
            },
            n = a `
			<button
				class="d2l-collapsible-panel-opener"
				aria-expanded="${this.expanded}"
				type="button"
				@focus="${this._onFocus}"
				@blur="${this._onBlur}"
				aria-label="${c(this.expandCollapseLabel)}">${this.panelTitle}</button>
		`,
            s = (e => (e = parseInt(e)) < 1 ? 1 : e > 6 ? 6 : e)(this.headingLevel);
        switch (s) {
            case 1:
                return a `<h1 class="${o(t)}">${n}</h1>`;
            case 2:
                return a `<h2 class="${o(t)}">${n}</h2>`;
            case 3:
                return a `<h3 class="${o(t)}">${n}</h3>`;
            case 4:
                return a `<h4 class="${o(t)}">${n}</h4>`;
            case 5:
                return a `<h5 class="${o(t)}">${n}</h5>`;
            case 6:
                return a `<h6 class="${o(t)}">${n}</h6>`
        }
    }
    _stickyObserverDisconnect() {
        this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = void 0, this._scrolled = !1)
    }
    _stickyObserverUpdate() {
        this._stickyObserverDisconnect(), this.noSticky || "function" != typeof IntersectionObserver || (this._intersectionObserver = new IntersectionObserver(e => {
            if (!this.expanded) return;
            const l = e[0];
            this._scrolled = !l.isIntersecting
        }), this._intersectionObserver.observe(this.shadowRoot.querySelector(".d2l-collapsible-panel-top-sentinel")))
    }
    _toggleExpand() {
        this.skeleton || (this.expanded = !this.expanded, this.focus())
    }
}
customElements.define("d2l-collapsible-panel", g);