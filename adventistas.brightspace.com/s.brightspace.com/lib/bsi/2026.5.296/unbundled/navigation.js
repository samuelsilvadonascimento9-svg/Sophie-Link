import "./navigation-band.js";
import "./navigation-skip.js";
import {
    a as i,
    b as a,
    i as s,
    A as o
} from "./lit-element.js";
import {
    F as t
} from "./focus-mixin.js";
import {
    L as n
} from "./localize-labs-element.js";
import {
    q as e
} from "./dom.js";
import {
    d as l
} from "./focus.js";
import "./colors.js";
import "./svg-to-css.js";
import "./navigation-styles.js";
import "./property-required-mixin.js";
import "./dedupeMixin.js";
import "./localize-mixin.js";
import "./_rollupPluginBabelHelpers.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./if-defined.js";
class r extends(t(n(i))) {
    static get focusElementSelector() {
        return "d2l-labs-navigation-skip"
    }
    render() {
        return a `<d2l-labs-navigation-skip text="${this.localize("components:navigation:skipNav")}" @click="${this._handleSkipNav}" class="vdiff-target"></d2l-labs-navigation-skip>`
    }
    _handleSkipNav() {
        const i = e(document, "main") || e(document, '[role="main"]') || e(document, "h1");
        i ? (i.tabIndex = -1, i.focus()) : this.dispatchEvent(new CustomEvent("d2l-labs-navigation-skip-fail", {
            bubbles: !1,
            composed: !1
        }))
    }
}
customElements.define("d2l-labs-navigation-skip-main", r);
customElements.define("d2l-labs-navigation", class extends i {
    static get properties() {
        return {
            hasSkipNav: {
                attribute: "has-skip-nav",
                type: Boolean
            }
        }
    }
    static get styles() {
        return s `
			:host {
				display: block;
				position: relative;
			}
			.d2l-labs-navigation-shadow-drop-border {
				background-color: rgba(0, 0, 0, 0.02);
				bottom: -4px;
				display: var(--d2l-labs-navigation-shadow-drop-border-display, block);
				height: 4px;
				pointer-events: none;
				position: absolute;
				width: 100%;
			}
		`
    }
    constructor() {
        super(), this.hasSkipNav = !1
    }
    render() {
        const i = this.hasSkipNav ? a `<d2l-labs-navigation-skip-main @d2l-labs-navigation-skip-fail="${this._handleSkipNavFail}"></d2l-labs-navigation-skip-main>` : o;
        return a `
			${i}<d2l-labs-navigation-band><slot name="navigation-band"></slot></d2l-labs-navigation-band>
			<slot></slot>
			<div class="d2l-labs-navigation-shadow-drop-border"></div>
		`
    }
    _handleSkipNavFail() {
        const i = l(this.shadowRoot.querySelector(".d2l-labs-navigation-shadow-drop-border"));
        i && i.focus()
    }
});