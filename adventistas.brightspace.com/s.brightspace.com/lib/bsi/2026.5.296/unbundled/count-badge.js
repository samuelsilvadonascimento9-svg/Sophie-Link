import "./colors.js";
import {
    i as r,
    b as s,
    a as e
} from "./lit-element.js";
import {
    C as t
} from "./count-badge-mixin.js";
import {
    F as i
} from "./focus-mixin.js";
import {
    b as o
} from "./focus.js";
import {
    g as p
} from "./uniqueId.js";
import {
    o as m
} from "./if-defined.js";
import "./svg-to-css.js";
import "./tooltip.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./announce.js";
import "./styles.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./directive.js";
import "./style-map.js";
import "./number.js";
import "./common.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
import "./dedupeMixin.js";
import "./skeleton-mixin.js";
import "./subscriberControllers.js";
class a extends(i(t(e))) {
    static get styles() {
        return [super.styles, r `
		${o(r=>`:host([focus-ring]) .d2l-count-badge-wrapper, .d2l-count-badge-wrapper:${r}`)}
		.d2l-count-badge-wrapper {
			--d2l-focus-ring-offset: 0;
			border: 2px solid transparent;
		}

		:host([size="small"]) .d2l-count-badge-wrapper {
			border-radius: 0.65rem;
		}

		:host([size="large"]) .d2l-count-badge-wrapper {
			border-radius: 0.8rem;
		}
		`]
    }
    constructor() {
        super(), this._badgeId = p()
    }
    static get focusElementSelector() {
        return ".d2l-count-badge-wrapper"
    }
    render() {
        const r = (this.tabStop || this.hasTooltip) && !(this.hideZero && 0 === this.number) && !this.skeleton,
            e = s `
			<div
			class="d2l-count-badge-wrapper d2l-skeletize"
			id="${this._badgeId}"
			tabindex="${m(r?"0":void 0)}"
			aria-labelledby="${m(this.getAriaLabelId())}"
			role="img">
				${this.renderCount()}
			</div>
		`;
        return this.renderTooltips(e, this._badgeId)
    }
}
customElements.define("d2l-count-badge", a);