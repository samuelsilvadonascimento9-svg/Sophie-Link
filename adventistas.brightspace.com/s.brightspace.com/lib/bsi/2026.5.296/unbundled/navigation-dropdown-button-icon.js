import "./icon.js";
import "./tooltip.js";
import "./navigation-notification-icon.js";
import {
    a as t,
    i,
    b as o,
    A as s
} from "./lit-element.js";
import {
    h as e,
    a as n
} from "./navigation-styles.js";
import {
    D as r
} from "./dropdown-opener-mixin.js";
import {
    g as a
} from "./uniqueId.js";
import {
    o as p
} from "./if-defined.js";
import {
    o as c
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
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./framed.js";
import "./dismissible.js";
import "./class-map.js";
import "./style-map.js";
import "./rtl-mixin.js";
import "./common.js";
class d extends(r(t)) {
    static get properties() {
        return {
            icon: {
                type: String
            },
            hasNotification: {
                attribute: "has-notification",
                reflect: !0,
                type: Boolean
            },
            text: {
                type: String
            },
            notificationText: {
                attribute: "notification-text",
                type: String
            },
            tooltipOffset: {
                attribute: "tooltip-offset",
                type: Number
            }
        }
    }
    static get styles() {
        return [e, n, c, i `
			:host {
				display: inline-block;
				height: 100%;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			.icon-container {
				display: inline-block;
				position: relative;
			}
		`]
    }
    constructor() {
        super(), this.hasNotification = !1, this._buttonId = a(), this._describedById = a()
    }
    render() {
        const {
            ariaDescribedBy: t,
            ariaDescription: i,
            contents: e
        } = this._getRenderSettings(), n = this.disabled ? s : o `<span class="d2l-labs-navigation-highlight-border"></span>`, r = this.dropdownOpened ? s : o `<d2l-tooltip close-on-click for="${this._buttonId}" for-type="label" position="bottom" offset="${p(this.tooltipOffset)}" class="vdiff-target">${this.text}</d2l-tooltip>`;
        return o `
			<button
				aria-describedby="${p(t)}"
				aria-label="${this.text}"
				?disabled="${this.disabled}"
				id="${this._buttonId}"
				type="button">${n}${e}</button>
			${i}
			${r}
			<slot></slot>
		`
    }
    getOpenerElement() {
        return this.shadowRoot ? .querySelector("button")
    }
    _getRenderSettings() {
        const t = o `<d2l-icon icon="${this.icon}"></d2l-icon>`;
        return this.hasNotification ? {
            ariaDescribedBy: this._describedById,
            ariaDescription: o `<span class="d2l-offscreen" id="${this._describedById}">${this.notificationText}</span>`,
            contents: o `<span class="icon-container">${t}<d2l-labs-navigation-notification-icon></d2l-labs-navigation-notification-icon></span>`
        } : {
            ariaDescribedBy: void 0,
            ariaDescription: s,
            contents: t
        }
    }
}
customElements.define("d2l-labs-navigation-dropdown-button-icon", d);