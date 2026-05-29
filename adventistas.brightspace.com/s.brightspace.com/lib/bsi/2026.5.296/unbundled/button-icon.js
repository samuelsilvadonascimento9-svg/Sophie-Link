import "./colors.js";
import "./icon.js";
import "./tooltip.js";
import {
    i as t,
    b as o,
    a as i
} from "./lit-element.js";
import {
    v as r,
    V as e
} from "./visible-on-ancestor-mixin.js";
import {
    B as n,
    b as s
} from "./button-styles.js";
import {
    g as l
} from "./uniqueId.js";
import {
    o as d
} from "./if-defined.js";
import {
    P as a
} from "./property-required-mixin.js";
import {
    S as c
} from "./slotted-icon-mixin.js";
import {
    T as u
} from "./theme-mixin.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./style-map.js";
class b extends(c(a(u(n(e(i)))))) {
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
            text: {
                type: String,
                reflect: !0,
                required: !0
            },
            translucent: {
                type: Boolean,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [super.styles, s, r, t `
				:host {
					--d2l-button-icon-background-color-default: var(--d2l-theme-background-color-interactive-tertiary-default);
					--d2l-button-icon-background-color-hover-default: var(--d2l-theme-background-color-interactive-tertiary-hover);
					--d2l-button-icon-border-radius-default: 0.3rem;
					--d2l-button-icon-min-height-default: calc(2rem + 2px);
					--d2l-button-icon-min-width-default: calc(2rem + 2px);
					--d2l-button-icon-h-align: calc(((2rem + 2px - 0.9rem) / 2) * -1);
					display: inline-block;
					line-height: 0;
				}
				:host([hidden]) {
					display: none;
				}
				:host([translucent]) {
					--d2l-button-icon-background-color-default: var(--d2l-theme-background-color-interactive-translucent-default);
					--d2l-button-icon-background-color-hover-default: var(--d2l-theme-background-color-interactive-translucent-hover);
					--d2l-focus-ring-color: var(--d2l-theme-icon-color-inverted);
					--d2l-focus-ring-offset: -4px;
					--d2l-button-icon-fill-color: var(--d2l-theme-icon-color-inverted);
					--d2l-button-icon-fill-color-hover: var(--d2l-theme-icon-color-inverted);
				}
				:host([theme="dark"]) {
					--d2l-button-icon-background-color-default: transparent;
					--d2l-button-icon-background-color-hover-default: rgba(51, 53, 54, 0.9); /* tungsten @70% @90% */
					--d2l-button-icon-fill-color: var(--d2l-color-sylvite);
					--d2l-button-icon-fill-color-hover: var(--d2l-color-sylvite);
					--d2l-focus-ring-color: var(--d2l-color-celestine-plus-1);
				}

				button {
					background-color: var(--d2l-button-icon-background-color, var(--d2l-button-icon-background-color-default));
					border-color: transparent;
					border-radius: var(--d2l-button-icon-border-radius, var(--d2l-button-icon-border-radius-default));
					font-family: inherit;
					min-height: var(--d2l-button-icon-min-height, var(--d2l-button-icon-min-height-default));
					min-width: var(--d2l-button-icon-min-width, var(--d2l-button-icon-min-width-default));
					padding: 0;
					position: relative;
				}

				:host([h-align="text"]) button {
					inset-inline-start: var(--d2l-button-icon-h-align);
				}
				:host([h-align="text-end"]) button {
					inset-inline-end: var(--d2l-button-icon-h-align);
				}

				/* Firefox includes a hidden border which messes up button dimensions */
				button::-moz-focus-inner {
					border: 0;
				}

				button:hover:not([disabled]),
				button:focus:not([disabled]),
				:host([active]) button:not([disabled]) {
					--d2l-button-icon-fill-color: var(--d2l-button-icon-fill-color-hover, var(--d2l-theme-icon-color-standard));
					background-color: var(--d2l-button-icon-background-color-hover, var(--d2l-button-icon-background-color-hover-default));
				}

				d2l-icon,
				slot[name="icon"]::slotted(d2l-icon-custom) {
					color: var(--d2l-button-icon-fill-color, var(--d2l-theme-icon-color-standard));
				}

				:host([translucent]) button {
					transition-duration: 0.2s, 0.2s;
					transition-property: background-color, box-shadow;
				}
				:host([translucent][visible-on-ancestor]) button {
					transition-duration: 0.4s, 0.4s;
				}

				:host([disabled]) button {
					cursor: default;
					opacity: var(--d2l-theme-opacity-disabled-control);
				}

				@media (prefers-reduced-motion: reduce) {
					:host([translucent]) button {
						transition: none;
					}
				}
			`]
    }
    constructor() {
        super(), this.translucent = !1, this._buttonId = l(), this._describedById = l(), this._iconRequired = !0
    }
    render() {
        return o `
			<button
				aria-describedby="${d(this.description?this._describedById:void 0)}"
				aria-disabled="${d(this.disabled&&this.disabledTooltip?"true":void 0)}"
				aria-expanded="${d(this.expanded)}"
				aria-haspopup="${d(this.ariaHaspopup)}"
				aria-label="${this.ariaLabel?this.ariaLabel:d(this.text)}"
				?autofocus="${this.autofocus}"
				?disabled="${this.disabled&&!this.disabledTooltip}"
				form="${d(this.form)}"
				formaction="${d(this.formaction)}"
				formenctype="${d(this.formenctype)}"
				formmethod="${d(this.formmethod)}"
				?formnovalidate="${this.formnovalidate}"
				formtarget="${d(this.formtarget)}"
				id="${this._buttonId}"
				name="${d(this.name)}"
				title="${d(this.text)}"
				type="${this._getType()}">
				${this._renderIcon()}
		</button>
		${this.description?o`<span id="${this._describedById}" hidden>${this.description}</span>`:null}
		${this.disabled&&this.disabledTooltip?o`<d2l-tooltip class="vdiff-target" for="${this._buttonId}">${this.disabledTooltip}</d2l-tooltip>`:""}
		`
    }
}
customElements.define("d2l-button-icon", b);