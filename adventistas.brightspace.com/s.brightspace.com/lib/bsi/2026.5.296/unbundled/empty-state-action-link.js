import {
    a as t,
    b as i,
    A as s
} from "./lit-element.js";
import {
    b as r
} from "./styles.js";
import {
    F as e
} from "./focus-mixin.js";
import {
    linkStyles as o
} from "./link.js";
import {
    P as m
} from "./property-required-mixin.js";
import "./colors.js";
import "./svg-to-css.js";
import "./focus.js";
import "./dom.js";
import "./dedupeMixin.js";
import "./_rollupPluginBabelHelpers.js";
import "./icon.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./tooltip.js";
import "./announce.js";
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
import "./overflow.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
class p extends(e(m(t))) {
    static get properties() {
        return {
            text: {
                type: String,
                required: !0
            },
            href: {
                type: String,
                required: !0
            }
        }
    }
    static get styles() {
        return [r, o]
    }
    static get focusElementSelector() {
        return ".d2l-link"
    }
    render() {
        const t = this.text && this.href ? i `
				<a class="d2l-body-compact d2l-link" href=${this.href}>${this.text}</a>` : s;
        return i `${t}`
    }
}
customElements.define("d2l-empty-state-action-link", p);