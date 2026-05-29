import {
    i as e,
    b as i,
    A as t,
    a as s
} from "./lit-element.js";
import "./icon.js";
import {
    e as r
} from "./class-map.js";
import {
    o as n
} from "./if-defined.js";
import {
    L as o
} from "./localize-core-element.js";
import {
    o as a
} from "./offscreen.js";
import {
    M as l,
    m as d
} from "./menu-item-styles.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./localize-mixin.js";
import "./_rollupPluginBabelHelpers.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./dedupeMixin.js";
import "./property-required-mixin.js";
import "./dom.js";
import "./focus.js";
import "./overflow.js";
const p = s => class extends(o(s)) {
    static get properties() {
        return {
            download: {
                type: String
            },
            href: {
                type: String
            },
            target: {
                type: String
            }
        }
    }
    static get styles() {
        return [a, e `
			#new-window {
				line-height: 0;
				white-space: nowrap;
			}
			d2l-icon {
				color: inherit;
				height: calc(1em - 1px);
				margin-inline-start: 0.315em;
				transform: translateY(0.1em);
				vertical-align: inherit;
				width: calc(1em - 1px);
			}

			@media print {
				d2l-icon {
					display: none;
				}
			}
		`]
    }
    getNewWindowDescription(e) {
        return e && "_blank" === this.target ? this.localize("components.link.open-in-new-window") : void 0
    }
    _render(e, {
        ariaLabel: t,
        rel: s,
        linkClasses: o = {},
        tabindex: a
    } = {}) {
        return i `<a
			aria-label="${n(t)}"
			aria-description="${n(this.getNewWindowDescription(t))}"
			class="${r(o)}"
			download="${n(this.download)}"
			href="${n(this.href)}"
			target="${n(this.target)}"
			rel="${n(s)}"
			tabindex="${n(a)}"
			>${e}</a>`
    }
    _renderNewWindowIcon() {
        return "_blank" !== this.target ? t : i `<span id="new-window"><span style="font-size: 0;">&nbsp;</span><d2l-icon icon="tier1:new-window"></d2l-icon></span><span class="d2l-offscreen">${this.localize("components.link.open-in-new-window")}</span>`
    }
};
class c extends(p(l(s))) {
    static get properties() {
        return {
            _ariaDescription: {
                type: String,
                attribute: "aria-description",
                reflect: !0
            }
        }
    }
    static get styles() {
        return [super.styles, d, e `
				:host {
					display: block;
					padding: 0;
				}

				:host > a {
					align-items: center;
					color: inherit;
					display: flex;
					line-height: 1rem;
					outline: none;
					overflow-x: hidden;
					padding: 0.75rem 1rem;
					text-decoration: none;
				}

				:host([target="_blank"]) .d2l-menu-item-text {
					align-self: baseline;
					flex: 0 1 auto;
				}

				#new-window {
					align-self: baseline;
					flex: auto;
				}
			`]
    }
    constructor() {
        super(), this._letClickPropagate = !0
    }
    firstUpdated() {
        super.firstUpdated(), this.addEventListener("keydown", this._onKeyDown)
    }
    render() {
        const e = i `
			<div class="d2l-menu-item-text">${this.text}</div>
			${this._renderNewWindowIcon()}
			<div class="d2l-menu-item-supporting"><slot name="supporting"></slot></div>
		`;
        return this._render(e, {
            ariaLabel: this._ariaLabel,
            rel: this.target ? "noreferrer noopener" : void 0,
            tabindex: -1
        })
    }
    willUpdate(e) {
        super.willUpdate(e), (e.has("_ariaLabel") || e.has("target")) && (this._ariaDescription = this.getNewWindowDescription(this._ariaLabel))
    }
    _onKeyDown(e) {
        e.keyCode !== this.__keyCodes.ENTER && e.keyCode !== this.__keyCodes.SPACE || this.shadowRoot.querySelector("a").click()
    }
}
customElements.define("d2l-menu-item-link", c);