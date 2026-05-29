import "./object-property-list-item.js";
import "./screen-reader-pause.js";
import {
    a as t,
    i as e,
    b as s,
    A as o
} from "./lit-element.js";
import {
    c as i
} from "./styles.js";
import {
    L as r
} from "./localize-core-element.js";
import {
    S as l
} from "./skeleton-mixin.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./list2.js";
import "./common.js";
import "./offscreen.js";
import "./focus.js";
import "./dom.js";
import "./localize-mixin.js";
import "./_rollupPluginBabelHelpers.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
import "./if-defined.js";
import "./dedupeMixin.js";
import "./subscriberControllers.js";
class n extends(r(l(t))) {
    static get properties() {
        return {
            skeletonCount: {
                type: Number,
                attribute: "skeleton-count"
            }
        }
    }
    static get styles() {
        return [super.styles, i, e `
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			::slotted([slot="status"]) {
				display: none;
			}
			::slotted(d2l-status-indicator[slot="status"]:first-of-type) {
				display: inline-block;
				margin-inline-end: 0.25rem; /* 10px desired margin, subtract 5px arbitrary whitespace. */
			}
		`]
    }
    firstUpdated() {
        this.addEventListener("d2l-object-property-list-item-visibility-change", () => this._onItemsChanged());
        const t = this.shadowRoot.querySelector("slot:not([name])");
        t.childElementCount && this._setItemSeparatorVisibility(t)
    }
    render() {
        const t = this.skeleton && this.skeletonCount > 0 ? [...Array(this.skeletonCount)].map(() => s `
			<d2l-object-property-list-item text="${this.localize("components.object-property-list.item-placeholder-text")}" skeleton></d2l-object-property-list-item>
		`) : o;
        return s `
			<div class="d2l-body-small">
				<slot name="status"></slot>
				<d2l-screen-reader-pause></d2l-screen-reader-pause>
				<slot @slotchange="${this._onItemsChanged}">${t}</slot>
			</div>
		`
    }
    _onItemsChanged(t) {
        const e = t ? .target || this.shadowRoot.querySelector("slot:not([name])");
        this._setItemSeparatorVisibility(e)
    }
    _setItemSeparatorVisibility(t) {
        const e = t.assignedElements(),
            s = (e.length ? e : [...t.children]).filter(t => t.tagName ? .toLowerCase().includes("d2l-object-property-list-") && !t.hidden),
            o = s.length - 1;
        s.forEach((t, e) => t._showSeparator = e !== o)
    }
}
customElements.define("d2l-object-property-list", n);