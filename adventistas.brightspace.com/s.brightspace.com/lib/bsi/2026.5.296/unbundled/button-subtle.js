import "./icon.js";
import "./tooltip.js";
import {
    a as t,
    i as o,
    b as e
} from "./lit-element.js";
import {
    B as i,
    b as n
} from "./button-styles.js";
import {
    e as s
} from "./class-map.js";
import {
    g as r
} from "./uniqueId.js";
import {
    o as d
} from "./if-defined.js";
import {
    l
} from "./styles.js";
import {
    S as a
} from "./slotted-icon-mixin.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./style-map.js";
class c extends(a(i(t))) {
    static get properties() {
        return {
            description: {
                type: String
            },
            hAlign: {
                type: String,
                reflect: !0,
                attribute: "h-align"
            },
            iconRight: {
                type: Boolean,
                reflect: !0,
                attribute: "icon-right"
            },
            slim: {
                type: Boolean,
                reflect: !0
            },
            text: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [super.styles, l, n, o `
				:host {
					--d2l-count-badge-background-color: var(--d2l-theme-background-color-interactive-primary-default);
					--d2l-count-badge-foreground-color: var(--d2l-theme-text-color-static-inverted);
					display: inline-block;
				}

				:host([hidden]) {
					display: none;
				}

				button {
					--d2l-button-subtle-padding-inline-start: 0.6rem;
					--d2l-button-subtle-padding-inline-end: 0.6rem;
					align-items: center;
					background-color: var(--d2l-theme-background-color-interactive-tertiary-default);
					border-color: transparent;
					column-gap: 0.3rem;
					display: inline-flex;
					font-family: inherit;
					padding-block-end: 0;
					padding-block-start: 0;
					padding-inline-end: var(--d2l-button-subtle-padding-inline-end);
					padding-inline-start: var(--d2l-button-subtle-padding-inline-start);
					position: relative;
				}

				:host([slim]) button {
					--d2l-button-subtle-padding-inline-start: 0.5rem;
					--d2l-button-subtle-padding-inline-end: 0.5rem;
					min-height: 1.5rem;
				}

				:host([slim]) button.d2l-button-subtle-has-icon {
					--d2l-button-subtle-padding-inline-start: 0.4rem;
					--d2l-button-subtle-padding-inline-end: 0.5rem;
				}

				:host([slim][icon-right]) button.d2l-button-subtle-has-icon {
					--d2l-button-subtle-padding-inline-start: 0.5rem;
					--d2l-button-subtle-padding-inline-end: 0.4rem;
				}

				:host([h-align="text"]) button {
					inset-inline-start: calc(var(--d2l-button-subtle-padding-inline-start) * -1);
				}
				:host([h-align="text-end"]) button {
					inset-inline-end: calc(var(--d2l-button-subtle-padding-inline-end) * -1);
				}

				/* Firefox includes a hidden border which messes up button dimensions */
				button::-moz-focus-inner {
					border: 0;
				}

				button[disabled]:hover,
				button[disabled]:focus,
				:host([active]) button[disabled] {
					background-color: var(--d2l-theme-background-color-interactive-tertiary-default);
				}

				button:hover,
				button:focus,
				:host([active]) button {
					background-color: var(--d2l-theme-background-color-interactive-tertiary-hover);
				}

				.d2l-button-subtle-content {
					color: var(--d2l-theme-text-color-interactive-default);
				}

				button:hover:not([disabled]) .d2l-button-subtle-content,
				button:focus:not([disabled]) .d2l-button-subtle-content,
				:host([active]:not([disabled])) button .d2l-button-subtle-content {
					color: var(--d2l-theme-text-color-interactive-hover);
				}

				button:hover:not([disabled]),
				button:focus:not([disabled]),
				:host([active]:not([disabled])) {
					--d2l-count-badge-background-color: var(--d2l-theme-text-color-interactive-hover);
				}

				.property-icon,
				slot[name="icon"]::slotted(d2l-icon-custom) {
					color: var(--d2l-theme-text-color-interactive-default);
				}

				button:hover:not([disabled]) .property-icon,
				button:focus:not([disabled]) .property-icon,
				:host([active]:not([disabled])) button .property-icon,
				button:hover:not([disabled]) slot[name="icon"]::slotted(d2l-icon-custom),
				button:focus:not([disabled]) slot[name="icon"]::slotted(d2l-icon-custom),
				:host([active]:not([disabled])) slot[name="icon"]::slotted(d2l-icon-custom) {
					color: var(--d2l-theme-text-color-interactive-hover);
				}

				:host([icon-right]) .property-icon,
				:host([icon-right]) slot[name="icon"]::slotted(d2l-icon-custom) {
					order: 1;
				}

				.d2l-button-subtle-content-wrapper slot {
					color: var(--d2l-theme-text-color-static-standard);
				}

				:host([disabled]) button {
					cursor: default;
					opacity: var(--d2l-theme-opacity-disabled-control);
				}
			`]
    }
    constructor() {
        super(), this.iconRight = !1, this.slim = !1, this._buttonId = r(), this._describedById = r()
    }
    render() {
        const t = {
            "d2l-button-subtle-has-icon": this.hasIcon(),
            "d2l-label-text": !0
        };
        return e `
			<button
				aria-describedby="${d(this.description?this._describedById:void 0)}"
				aria-disabled="${d(this.disabled&&this.disabledTooltip?"true":void 0)}"
				aria-expanded="${d(this.expanded)}"
				aria-haspopup="${d(this.ariaHaspopup)}"
				aria-label="${d(this.ariaLabel)}"
				?autofocus="${this.autofocus}"
				class="${s(t)}"
				?disabled="${this.disabled&&!this.disabledTooltip}"
				form="${d(this.form)}"
				formaction="${d(this.formaction)}"
				formenctype="${d(this.formenctype)}"
				formmethod="${d(this.formmethod)}"
				?formnovalidate="${this.formnovalidate}"
				formtarget="${d(this.formtarget)}"
				id="${this._buttonId}"
				name="${d(this.name)}"
				type="${this._getType()}">
				${this._renderIcon()}
				<span class="d2l-button-subtle-content-wrapper">
					<span class="d2l-button-subtle-content">${this.text}</span>
					<slot></slot>
				</span>
			</button>
			${this.description?e`<span id="${this._describedById}" hidden>${this.description}</span>`:null}
			${this.disabled&&this.disabledTooltip?e`<d2l-tooltip class="vdiff-target" for="${this._buttonId}">${this.disabledTooltip}</d2l-tooltip>`:""}
		`
    }
}
customElements.define("d2l-button-subtle", c);