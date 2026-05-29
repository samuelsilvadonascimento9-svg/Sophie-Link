import "./colors.js";
import "./icon.js";
import {
    a as i,
    i as t,
    b as o
} from "./lit-element.js";
import {
    C as e
} from "./count-badge-mixin.js";
import {
    F as s
} from "./focus-mixin.js";
import {
    b as r
} from "./focus.js";
import {
    g as n
} from "./uniqueId.js";
import {
    o as d
} from "./if-defined.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
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
class p extends(s(e(i))) {
    static get properties() {
        return {
            icon: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [super.styles, t `
		${r(i=>`:host([focus-ring]) d2l-icon, d2l-icon:${i}`)}
		:host {
			display: inline-block;
			/* symmetrical padding to prevent overflows for most numbers */
			padding-left: 0.5rem;
			padding-right: 0.5rem;
			position: relative;
		}

		:host([size="large"]) {
			--d2l-count-badge-icon-padding-top: 0.7rem;
			padding-top: var(--d2l-count-badge-icon-padding-top);
		}

		:host([size="small"]) {
			--d2l-count-badge-icon-padding-top: 0.55rem;
			padding-top: var(--d2l-count-badge-icon-padding-top);
		}

		d2l-tooltip[_open-dir="top"] {
			margin-top: calc(0px - var(--d2l-count-badge-icon-padding-top));
		}

		d2l-icon {
			--d2l-focus-ring-offset: 0;
			border: 2px solid transparent;
			border-radius: 6px;
		}
		`]
    }
    constructor() {
        super(), this._badgeId = n()
    }
    static get focusElementSelector() {
        return "d2l-icon"
    }
    render() {
        let i = {
            border: "2px solid var(--d2l-theme-background-color-base)",
            position: "absolute",
            visibility: this.skeleton ? "hidden" : void 0
        };
        i = this.getNumberString().length >= 4 ? { ...i,
            left: "50%",
            transform: "translate(-50%, -50%)"
        } : { ...i,
            insetInlineEnd: "-0.1rem",
            transform: "translateY(-50%)"
        };
        const t = (this.tabStop || this.hasTooltip) && !this.skeleton,
            e = o `
			${this.renderCount(i)}
			<div class="d2l-skeletize d2l-count-badge-wrapper">
				<d2l-icon id="${this._badgeId}"
					icon="${this.icon}"
					tabindex="${d(t?"0":void 0)}"
					aria-labelledby="${d(this.getAriaLabelId())}"
					role="img">
				</d2l-icon>
			</div>
		`;
        return this.renderTooltips(e, this._badgeId)
    }
}
customElements.define("d2l-count-badge-icon", p);