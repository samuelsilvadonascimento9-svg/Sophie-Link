import "./tooltip.js";
import {
    a as t,
    i,
    b as s,
    A as e
} from "./lit-element.js";
import {
    h as o,
    b as r
} from "./navigation-styles.js";
import {
    F as a
} from "./focus-mixin.js";
import {
    g as l
} from "./uniqueId.js";
import {
    o as n
} from "./if-defined.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./colors.js";
import "./svg-to-css.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./directive.js";
import "./style-map.js";
import "./dedupeMixin.js";
class p extends(a(t)) {
    static get properties() {
        return {
            href: {
                type: String
            },
            slim: {
                reflect: !0,
                type: Boolean
            },
            src: {
                type: String
            },
            text: {
                type: String
            },
            tooltipOffset: {
                attribute: "tooltip-offset",
                type: Number
            }
        }
    }
    static get styles() {
        return [o, r, i `
			:host {
				display: inline-block;
				height: 100%;
			}
			:host([hidden]) {
				display: none;
			}
			img {
				max-height: 60px;
				max-width: 260px;
				vertical-align: middle;
			}
			:host([slim]) img {
				max-height: 40px;
				max-width: 173px;
			}
			.d2l-labs-navigation-link-image-container {
				align-items: center;
				display: inline-flex;
				height: 100%;
				vertical-align: middle;
			}
		`]
    }
    constructor() {
        super(), this.slim = !1, this.text = "", this._linkId = l()
    }
    static get focusElementSelector() {
        return "a"
    }
    render() {
        const t = s `<img src="${this.src}" alt="${this.text}">`;
        return this.href ? s `
				<a href="${this.href}" id="${this._linkId}">
					<span class="d2l-labs-navigation-highlight-border"></span>
					<span class="d2l-labs-navigation-link-image-container">${t}</span>
				</a>
				${this.text?s`<d2l-tooltip for="${this._linkId}" for-type="label" position="bottom" offset="${n(this.tooltipOffset)}" class="vdiff-target">${this.text}</d2l-tooltip>`:e}
			` : s `<span class="d2l-labs-navigation-link-image-container">${t}</span>`
    }
}
customElements.define("d2l-labs-navigation-link-image", p);