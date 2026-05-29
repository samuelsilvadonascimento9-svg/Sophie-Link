import "./colors.js";
import "./tooltip.js";
import {
    a as t,
    i as o,
    b as i
} from "./lit-element.js";
import {
    B as e,
    b as r
} from "./button-styles.js";
import {
    g as s
} from "./uniqueId.js";
import {
    o as a
} from "./if-defined.js";
import {
    l as d
} from "./styles.js";
import "./svg-to-css.js";
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
import "./class-map.js";
import "./directive.js";
import "./style-map.js";
class n extends(e(t)) {
    static get properties() {
        return {
            description: {
                type: String
            },
            primary: {
                type: Boolean,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [d, r, o `
				:host {
					display: inline-block;
				}
				:host([hidden]) {
					display: none;
				}

				button {
					font-family: inherit;
					padding-block-end: 0;
					padding-block-start: 0;
					padding-inline-end: var(--d2l-button-padding-inline-end, 1.5rem);
					padding-inline-start: var(--d2l-button-padding-inline-start, 1.5rem);
					width: 100%;
				}

				/* Firefox includes a hidden border which messes up button dimensions */
				button::-moz-focus-inner {
					border: 0;
				}

				button,
				button[disabled]:hover,
				button[disabled]:focus,
				:host([active]) button[disabled] {
					background-color: var(--d2l-theme-background-color-interactive-secondary-default);
					color: var(--d2l-theme-text-color-static-standard);
				}

				button:hover,
				button:focus,
				:host([active]) button {
					background-color: var(--d2l-theme-background-color-interactive-secondary-hover);
				}

				:host([disabled]) button {
					cursor: default;
					position: relative;
				}
				:host([disabled]) button::before {
					background-color: var(--d2l-theme-background-color-base);
					border-radius: inherit;
					content: "";
					inset: 0;
					opacity: var(--d2l-theme-opacity-disabled-control);
					position: absolute;
				}

				:host([primary]) button,
				:host([primary]) button[disabled]:hover,
				:host([primary]) button[disabled]:focus,
				:host([primary][active]) button[disabled] {
					background-color: var(--d2l-theme-background-color-interactive-primary-default);
					color: var(--d2l-theme-text-color-static-inverted);
				}
				:host([primary]) button:hover,
				:host([primary]) button:focus,
				:host([primary][active]) button {
					background-color: var(--d2l-theme-background-color-interactive-primary-hover);
				}
			`]
    }
    constructor() {
        super(), this.primary = !1, this._buttonId = s(), this._describedById = s()
    }
    render() {
        return i `
			<button
				aria-describedby="${a(this.description?this._describedById:void 0)}"
				aria-disabled="${a(this.disabled&&this.disabledTooltip?"true":void 0)}"
				aria-expanded="${a(this.expanded)}"
				aria-haspopup="${a(this.ariaHaspopup)}"
				aria-label="${a(this.ariaLabel)}"
				?autofocus="${this.autofocus}"
				class="d2l-label-text"
				?disabled="${this.disabled&&!this.disabledTooltip}"
				form="${a(this.form)}"
				formaction="${a(this.formaction)}"
				formenctype="${a(this.formenctype)}"
				formmethod="${a(this.formmethod)}"
				?formnovalidate="${this.formnovalidate}"
				formtarget="${a(this.formtarget)}"
				id="${this._buttonId}"
				name="${a(this.name)}"
				type="${this._getType()}">
				<slot></slot>
			</button>
			${this.description?i`<span id="${this._describedById}" hidden>${this.description}</span>`:null}
			${this.disabled&&this.disabledTooltip?i`<d2l-tooltip class="vdiff-target" for="${this._buttonId}">${this.disabledTooltip}</d2l-tooltip>`:""}
		`
    }
}
customElements.define("d2l-button", n);