import "./navigation-link-icon.js";
import {
    a as i,
    i as t,
    b as s
} from "./lit-element.js";
import {
    F as o
} from "./focus-mixin.js";
import {
    L as e
} from "./localize-labs-element.js";
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
import "./if-defined.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./style-map.js";
import "./navigation-styles.js";
import "./dedupeMixin.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
class r extends(e(o(i))) {
    static get properties() {
        return {
            text: {
                type: String
            },
            href: {
                type: String
            }
        }
    }
    static get styles() {
        return t `
			:host {
				display: inline-block;
				height: 100%;
			}
			:host([hidden]) {
				display: none;
			}
		`
    }
    static get focusElementSelector() {
        return "d2l-labs-navigation-link-icon"
    }
    render() {
        const i = this.href ? this.href : "javascript:void(0);",
            t = this.text ? this.text : this.localize("components:navigation:back");
        return s `<d2l-labs-navigation-link-icon href="${i}" icon="tier1:chevron-left" text="${t}"></d2l-labs-navigation-link-icon>`
    }
}
customElements.define("d2l-labs-navigation-link-back", r);