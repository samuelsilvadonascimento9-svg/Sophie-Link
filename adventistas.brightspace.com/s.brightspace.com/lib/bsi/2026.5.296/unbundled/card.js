import "./colors.js";
import {
    a as e,
    i as t,
    A as o,
    b as r
} from "./lit-element.js";
import {
    e as i
} from "./class-map.js";
import {
    g as n
} from "./flags.js";
import {
    b as s
} from "./focus.js";
import {
    o as d
} from "./if-defined.js";
import {
    o as a
} from "./offscreen.js";
import {
    o as l
} from "./style-map.js";
import "./svg-to-css.js";
import "./directive.js";
import "./dom.js";
const c = n("GAUD-8697-card-badge-center-flag", !0);
customElements.define("d2l-card", class extends e {
    static get properties() {
        return {
            alignCenter: {
                type: Boolean,
                attribute: "align-center",
                reflect: !0
            },
            download: {
                type: Boolean,
                reflect: !0
            },
            href: {
                type: String,
                reflect: !0
            },
            hreflang: {
                type: String,
                reflect: !0
            },
            rel: {
                type: String,
                reflect: !0
            },
            subtle: {
                type: Boolean,
                reflect: !0
            },
            target: {
                type: String,
                reflect: !0
            },
            text: {
                type: String,
                reflect: !0
            },
            type: {
                type: String,
                reflect: !0
            },
            _active: {
                type: Boolean,
                reflect: !0
            },
            _dropdownActionOpen: {
                type: Boolean,
                attribute: "_dropdown-action-open",
                reflect: !0
            },
            _hover: {
                type: Boolean
            },
            _badgeMarginTop: {
                type: String
            },
            _footerHidden: {
                type: Boolean
            },
            _tooltipShowing: {
                type: Boolean,
                attribute: "_tooltip_showing",
                reflect: !0
            }
        }
    }
    static get styles() {
        return [a, t `
			:host {
				background-color: #ffffff;
				border: 1px solid var(--d2l-color-gypsum);
				border-radius: 6px;
				box-sizing: border-box;
				display: inline-block;
				position: relative;
				z-index: 0;
			}
			.d2l-card-container {
				align-items: flex-start; /* required so that footer will not stretch to 100% width */
				display: flex;
				flex-direction: column;
				height: 100%;
				position: relative;
			}
			.d2l-card-link-container {
				flex-basis: auto;
				flex-grow: 1;
				flex-shrink: 1;
				width: 100%; /* required for Legacy-Edge and FF when align-items: flex-start is specified */
			}
			.d2l-card-link-text {
				display: inline-block;
			}
			.d2l-card-header {
				border-start-end-radius: 6px;
				border-start-start-radius: 6px;
				overflow: hidden;
			}

			a {
				bottom: -1px;
				display: block;
				left: -1px;
				outline: none;
				position: absolute;
				right: -1px;
				top: -1px;
				z-index: 1;
			}
			:host([subtle]) a {
				bottom: 0;
				left: 0;
				right: 0;
				top: 0;
			}

			:host(:hover) a {
				bottom: -5px;
			}
			:host([subtle]:hover) a {
				bottom: -4px;
			}

			.d2l-card-content {
				padding: 1.2rem 0.8rem 0 0.8rem;
			}
			:host([align-center]) .d2l-card-content {
				text-align: center;
			}

			${c?t`
	:host([align-center]) .d2l-card-badge {
		display: flex;
		justify-content: center;
	}`:t``}
			.d2l-card-footer-hidden .d2l-card-content {
				padding-bottom: 1.2rem;
			}
			.d2l-card-actions {
				inset-inline-end: 0.6rem;
				position: absolute;
				top: 0.6rem;
				/* this must be higher than footer z-index so dropdowns will be on top */
				z-index: 3;
			}
			.d2l-card-actions ::slotted(*) {
				margin-inline-start: 0.3rem;
			}
			.d2l-card-badge {
				line-height: 0;
				padding: 0 0.8rem;
			}
			.d2l-card-footer {
				box-sizing: border-box;
				flex: none;
				padding: 1.2rem 0.8rem 0.6rem 0.8rem;
				pointer-events: none;
				width: 100%;
				z-index: 2;
			}
			:host([align-center]) .d2l-card-footer {
				text-align: center;
			}

			.d2l-card-footer ::slotted([slot="footer"]) {
				pointer-events: all;
			}

			.d2l-card-footer-hidden .d2l-card-footer {
				box-sizing: content-box;
				height: auto;
			}

			:host([subtle]) {
				border: none;
			}
			:host([subtle][href]) {
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.03);
			}
			:host([href]:not([_active]):hover) {
				box-shadow: 0 2px 14px 1px rgba(0, 0, 0, 0.06);
			}
			:host([subtle][href]:not([_active]):hover) {
				box-shadow: 0 4px 18px 2px rgba(0, 0, 0, 0.06);
			}
			${s(()=>":host([_active])",{extraStyles:t`border-color: transparent;`})}
			/* .d2l-card-link-container-hover is used to only color/underline when
			hovering the anchor; these styles are not applied when hovering actions */
			:host([href]) .d2l-card-link-container-hover,
			:host([href][_active]) .d2l-card-content {
				color: var(--d2l-color-celestine);
				text-decoration: underline;
			}
			/* this is needed to ensure tooltip is not be clipped by adjacent cards */
			:host([_tooltip_showing]) {
				z-index: 1;
			}
			/* this is needed to ensure open menu will be ontop of adjacent cards */
			:host([_dropdown-action-open]) {
				z-index: 2;
			}
			@media (prefers-reduced-motion: no-preference) {
				:host {
					transition: box-shadow 0.2s;
				}
			}
			@media (prefers-contrast: more) {
				:host([subtle]) {
					border: 1px solid var(--d2l-color-gypsum);
				}
			}
		`]
    }
    constructor() {
        super(), this.alignCenter = !1, this.download = !1, this.subtle = !1, this._active = !1, this._dropdownActionOpen = !1, this._focusOnFirstRender = !1, this._footerHidden = !0, this._hover = !1, this._tooltipShowing = !1, this._onBadgeResize = this._onBadgeResize.bind(this), this._onFooterResize = this._onFooterResize.bind(this)
    }
    firstUpdated(e) {
        super.firstUpdated(e);
        new ResizeObserver(this._onBadgeResize).observe(this.shadowRoot.querySelector(".d2l-card-badge"));
        new ResizeObserver(this._onFooterResize).observe(this.shadowRoot.querySelector(".d2l-card-footer")), this._focusOnFirstRender && (this._focusOnFirstRender = !1, this.focus())
    }
    render() {
        const e = {
                "d2l-card-container": !0,
                "d2l-visible-on-ancestor-target": !0,
                "d2l-card-footer-hidden": this._footerHidden
            },
            t = {
                "d2l-card-link-container": !0,
                "d2l-card-link-container-hover": this._hover
            },
            n = {};
        this._badgeMarginTop && (n.marginTop = this._badgeMarginTop);
        const s = {
            "d2l-card-footer": !0,
            "d2l-offscreen": this._footerHidden
        };
        return r `
			<div class="${i(e)}"
				@d2l-dropdown-open="${this._onDropdownOpen}"
				@d2l-dropdown-close="${this._onDropdownClose}"
				@d2l-tooltip-show="${this._onTooltipShow}"
				@d2l-tooltip-hide="${this._onTooltipHide}">
				${this.href?r`
					<a @blur="${this._onLinkBlur}"
						?download="${this.download}"
						@focus="${this._onLinkFocus}"
						href="${d(this.href?this.href:void 0)}"
						hreflang="${d(this.hreflang)}"
						@mouseenter="${this._onLinkMouseEnter}"
						@mouseleave="${this._onLinkMouseLeave}"
						rel="${d(this.rel)}"
						target="${d(this.target)}"
						type="${d(this.type)}">
						<span class="d2l-card-link-text d2l-offscreen">${this.text}</span>
					</a>
				`:o}
				<div class="${i(t)}">
					<div class="d2l-card-header"><slot name="header"></slot></div>
					<div class="d2l-card-badge" style="${l(n)}"><slot name="badge"></slot></div>
					<div class="d2l-card-content"><slot name="content"></slot></div>
				</div>
				<div class="d2l-card-actions"><slot name="actions"></slot></div>
				<div class="${i(s)}"><slot name="footer"></slot></div>
			</div>
		`
    }
    focus() {
        if (!this.hasUpdated) return void(this._focusOnFirstRender = !0);
        const e = this.shadowRoot.querySelector("a[href]");
        e ? e.focus() : super.focus()
    }
    _onBadgeResize(e) {
        if (!e || 0 === e.length) return;
        const t = e[0];
        requestAnimationFrame(() => this._badgeMarginTop = -.5 * t.contentRect.height + "px")
    }
    _onDropdownClose() {
        this._dropdownActionOpen = !1
    }
    _onDropdownOpen() {
        this._dropdownActionOpen = !0
    }
    _onFooterResize(e) {
        if (!e || 0 === e.length) return;
        const t = e[0];
        requestAnimationFrame(() => this._footerHidden = t.contentRect.height < 1)
    }
    _onLinkBlur() {
        this._active = !1
    }
    _onLinkFocus() {
        this._active = !0
    }
    _onLinkMouseEnter() {
        this._hover = !0
    }
    _onLinkMouseLeave() {
        this._hover = !1
    }
    _onTooltipHide() {
        this._tooltipShowing = !1
    }
    _onTooltipShow() {
        this._tooltipShowing = !0
    }
});