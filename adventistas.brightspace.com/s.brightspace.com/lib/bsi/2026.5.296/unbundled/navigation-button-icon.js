import "./colors.js";
import "./icon.js";
import "./tooltip.js";
import {
    a as t,
    i,
    b as o,
    A as s
} from "./lit-element.js";
import {
    h as e,
    a as r
} from "./navigation-styles.js";
import {
    F as n
} from "./focus-mixin.js";
import {
    g as l
} from "./uniqueId.js";
import {
    o as a
} from "./if-defined.js";
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
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./style-map.js";
import "./dedupeMixin.js";
class p extends(n(t)) {
    static get properties() {
        return {
            disabled: {
                reflect: !0,
                type: Boolean
            },
            icon: {
                type: String
            },
            iconPosition: {
                attribute: "icon-position",
                type: String
            },
            noHighlightBorder: {
                attribute: "no-highlight-border",
                type: Boolean
            },
            text: {
                type: String
            },
            textHidden: {
                attribute: "text-hidden",
                type: Boolean
            },
            tooltipOffset: {
                attribute: "tooltip-offset",
                type: Number
            },
            tooltipPosition: {
                attribute: "tooltip-position",
                type: String
            }
        }
    }
    static get styles() {
        return [e, r, i `
			:host {
				display: inline-block;
				height: 100%;
			}
			:host([hidden]) {
				display: none;
			}
		`]
    }
    constructor() {
        super(), this.disabled = !1, this.iconPosition = "start", this.noHighlightBorder = !1, this.textHidden = !1, this._buttonId = l(), this.tooltipPosition = "bottom"
    }
    static get focusElementSelector() {
        return "button"
    }
    render() {
        const {
            ariaLabel: t,
            id: i,
            text: e,
            tooltip: r
        } = this._getRenderSettings(), n = this.disabled || this.noHighlightBorder ? s : o `<span class="d2l-labs-navigation-highlight-border"></span>`, l = o `<d2l-icon icon="${this.icon}"></d2l-icon>`;
        return o `
			<button id="${a(i)}" ?disabled="${this.disabled}" aria-label="${a(t)}" type="button">
				${n}
				${"start"===this.iconPosition?l:s}
				${e}
				${"end"===this.iconPosition?l:s}
			</button>
			${r}
		`
    }
    _getRenderSettings() {
        return this.textHidden ? {
            ariaLabel: this.text,
            id: this._buttonId,
            text: s,
            tooltip: o `<d2l-tooltip close-on-click for="${this._buttonId}" for-type="label" position="${this.tooltipPosition}" offset="${a(this.tooltipOffset)}" class="vdiff-target">${this.text}</d2l-tooltip>`
        } : {
            ariaLabel: void 0,
            id: void 0,
            text: this.text,
            tooltip: s
        }
    }
}
customElements.define("d2l-labs-navigation-button-icon", p);