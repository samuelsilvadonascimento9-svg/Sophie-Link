import {
    a as t,
    i as e,
    b as o
} from "./lit-element.js";
import {
    h as s,
    a as n
} from "./navigation-styles.js";
import {
    D as i
} from "./dropdown-opener-mixin.js";
import {
    o as r
} from "./if-defined.js";
import "./colors.js";
import "./svg-to-css.js";
import "./uniqueId.js";
import "./dom.js";
class a extends(i(t)) {
    static get properties() {
        return {
            openerLabel: {
                type: String,
                attribute: "opener-label"
            }
        }
    }
    static get styles() {
        return [s, n, e `
			:host {
				display: inline-block;
				height: 100%;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
		`]
    }
    render() {
        return o `
			<button
				type="button"
				aria-haspopup="menu"
				aria-label="${r(this.openerLabel)}">
				<span class="d2l-labs-navigation-highlight-border"></span>
				<slot name="opener"></slot>
			</button>
			<slot></slot>
		`
    }
    getOpenerElement() {
        return this.shadowRoot ? .querySelector("button")
    }
}
customElements.define("d2l-labs-navigation-dropdown-button-custom", a);