import "./icon.js";
import "./tooltip.js";
import {
    a as t,
    i,
    b as e,
    A as s
} from "./lit-element.js";
import {
    h as o,
    b as r
} from "./navigation-styles.js";
import {
    F as n
} from "./focus-mixin.js";
import {
    g as a
} from "./uniqueId.js";
import {
    o as l
} from "./if-defined.js";
import {
    o as d
} from "./offscreen.js";
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
import "./styles.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./class-map.js";
import "./style-map.js";
import "./dedupeMixin.js";
class p extends(n(t)) {
    static get properties() {
        return {
            href: {
                type: String
            },
            icon: {
                type: String
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
            }
        }
    }
    static get styles() {
        return [o, r, d, i `
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
        super(), this.textHidden = !1, this._linkId = a(), this._missingHrefErrorHasBeenThrown = !1, this._validatingHrefTimeout = null
    }
    static get focusElementSelector() {
        return "a"
    }
    firstUpdated(t) {
        super.firstUpdated(t), this._validateHref()
    }
    render() {
        const {
            ariaLabel: t,
            id: i,
            text: s,
            tooltip: o
        } = this._getRenderSettings();
        return e `
			<a id="${l(i)}" href="${l(this.href)}" aria-label="${l(t)}">
				<span class="d2l-labs-navigation-highlight-border"></span>
				<d2l-icon icon="${this.icon}"></d2l-icon>
				${s}
			</a>
			${o}
		`
    }
    updated(t) {
        super.updated(t), t.has("href") && this._validateHref()
    }
    _getRenderSettings() {
        return this.textHidden ? {
            ariaLabel: this.text,
            id: this._linkId,
            text: s,
            tooltip: e `<d2l-tooltip for="${this._linkId}" for-type="label" position="bottom" offset="${l(this.tooltipOffset)}" class="vdiff-target">${this.text}</d2l-tooltip>`
        } : {
            ariaLabel: void 0,
            id: void 0,
            text: this.text,
            tooltip: s
        }
    }
    _validateHref() {
        clearTimeout(this._validatingHrefTimeout), this._validatingHrefTimeout = setTimeout(() => {
            this._validatingHrefTimeout = null;
            "string" == typeof this.href && this.href.length > 0 || this._missingHrefErrorHasBeenThrown || (this._missingHrefErrorHasBeenThrown = !0, setTimeout(() => {
                throw new Error('<d2l-labs-navigation-link-icon>: missing required "href" attribute. If this component performs an action and not a navigation, consider using <d2l-labs-navigation-button-icon> instead.')
            }))
        }, 3e3)
    }
}
customElements.define("d2l-labs-navigation-link-icon", p);