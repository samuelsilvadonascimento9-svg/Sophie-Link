import "./button-icon.js";
import {
    a as t,
    i as s,
    b as o
} from "./lit-element.js";
import {
    V as i,
    v as r
} from "./visible-on-ancestor-mixin.js";
import {
    D as e
} from "./dropdown-opener-mixin.js";
import {
    d as n
} from "./dropdown-opener-styles.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./tooltip.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./uniqueId.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./if-defined.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./style-map.js";
import "./button-styles.js";
import "./property-required-mixin.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
class m extends(e(i(t))) {
    static get properties() {
        return {
            text: {
                type: String
            },
            translucent: {
                type: Boolean
            }
        }
    }
    static get styles() {
        return [n, r, s `
			:host {
				display: inline-block;
			}
		`]
    }
    constructor() {
        super(), this.translucent = !1
    }
    render() {
        return o `
			<d2l-button-icon ?disabled=${this.disabled} icon="tier1:more" text=${this.text} ?translucent=${this.translucent}>
			</d2l-button-icon>
			<slot></slot>
		`
    }
    getOpenerElement() {
        return this.shadowRoot && this.shadowRoot.querySelector("d2l-button-icon")
    }
}
customElements.define("d2l-dropdown-more", m);