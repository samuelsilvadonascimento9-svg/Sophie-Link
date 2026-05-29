import "./button-subtle.js";
import {
    a as t,
    b as s
} from "./lit-element.js";
import {
    D as i
} from "./dropdown-opener-mixin.js";
import {
    d as o
} from "./dropdown-opener-styles.js";
import {
    o as e
} from "./if-defined.js";
import "./icon.js";
import "./colors.js";
import "./svg-to-css.js";
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
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./style-map.js";
import "./button-styles.js";
import "./slotted-icon-mixin.js";
class r extends(i(t)) {
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
                type: String
            }
        }
    }
    static get styles() {
        return o
    }
    render() {
        return s `
			<d2l-button-subtle description="${e(this.description)}" h-align="${e(this.hAlign)}" text=${this.text} icon="tier1:chevron-down" icon-right ?disabled=${this.disabled}></d2l-button-subtle>
			<slot></slot>
		`
    }
    getOpenerElement() {
        return this.shadowRoot && this.shadowRoot.querySelector("d2l-button-subtle")
    }
}
customElements.define("d2l-dropdown-button-subtle", r);