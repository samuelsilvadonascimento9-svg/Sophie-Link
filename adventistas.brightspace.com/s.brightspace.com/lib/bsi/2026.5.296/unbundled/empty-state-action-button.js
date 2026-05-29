import "./button.js";
import "./button-subtle.js";
import {
    a as t,
    i as s,
    b as i,
    A as e
} from "./lit-element.js";
import {
    F as o
} from "./focus-mixin.js";
import {
    o as r
} from "./if-defined.js";
import {
    P as l
} from "./property-required-mixin.js";
import "./colors.js";
import "./svg-to-css.js";
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
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./directive.js";
import "./style-map.js";
import "./button-styles.js";
import "./dedupeMixin.js";
import "./icon.js";
import "./icon-styles.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./slotted-icon-mixin.js";
class a extends(o(l(t))) {
    static get properties() {
        return {
            text: {
                type: String,
                required: !0
            },
            primary: {
                type: Boolean
            },
            _illustrated: {
                state: !0
            }
        }
    }
    static get styles() {
        return s `
					.d2l-empty-state-action {
						vertical-align: top;
					}
				`
    }
    constructor() {
        super(), this._illustrated = !1
    }
    static get focusElementSelector() {
        return ".d2l-empty-state-action"
    }
    connectedCallback() {
        super.connectedCallback(), requestAnimationFrame(() => {
            const t = new CustomEvent("d2l-empty-state-illustrated-check", {
                bubbles: !0,
                detail: {}
            });
            this.dispatchEvent(t), this._illustrated = t.detail.illustrated || !1
        })
    }
    render() {
        let t = e;
        return this.text && (t = this._illustrated && this.primary ? i `<d2l-button
							class="d2l-empty-state-action"
							@click=${this._handleActionClick}
							primary>
								${this.text}
						</d2l-button>` : i `<d2l-button-subtle
							class="d2l-empty-state-action"
							@click=${this._handleActionClick}
							h-align="${r(this._illustrated?void 0:"text")}"
							?slim=${!this._illustrated}
							text=${this.text}>
						</d2l-button-subtle>`), i `${t}`
    }
    _handleActionClick(t) {
        t.stopPropagation(), this.dispatchEvent(new CustomEvent("d2l-empty-state-action"))
    }
}
customElements.define("d2l-empty-state-action-button", a);