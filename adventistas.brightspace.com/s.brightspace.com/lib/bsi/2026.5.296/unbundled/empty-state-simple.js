import "./button-subtle.js";
import {
    E as s,
    e as t,
    a as i
} from "./empty-state-mixin.js";
import {
    a as e,
    b as o
} from "./lit-element.js";
import {
    b as r
} from "./styles.js";
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
import "./slotted-icon-mixin.js";
import "./property-required-mixin.js";
class p extends(s(e)) {
    static get properties() {
        return {
            description: {
                type: String,
                required: !0
            }
        }
    }
    static get styles() {
        return [r, t, i]
    }
    render() {
        return o `
			<div class="empty-state-container">
				<p class="d2l-body-compact d2l-empty-state-description" tabindex="-1">${this.description}</p>
				<slot class="action-slot"></slot>
			</div>
		`
    }
}
customElements.define("d2l-empty-state-simple", p);