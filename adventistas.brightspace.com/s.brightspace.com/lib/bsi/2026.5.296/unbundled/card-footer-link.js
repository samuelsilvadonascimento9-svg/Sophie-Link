import "./colors.js";
import "./count-badge-icon.js";
import "./icon.js";
import {
    a as t,
    i as e,
    b as o
} from "./lit-element.js";
import {
    F as i
} from "./focus-mixin.js";
import {
    o as n
} from "./if-defined.js";
import {
    o as r
} from "./offscreen.js";
class s extends(i(t)) {
    static get properties() {
        return {
            download: {
                type: Boolean,
                reflect: !0
            },
            href: {
                type: String,
                reflect: !0
            },
            hreflang: {
                type: String,
                reflect: !0
            },
            icon: {
                type: String,
                reflect: !0
            },
            rel: {
                type: String,
                reflect: !0
            },
            secondaryCount: {
                type: Number,
                attribute: "secondary-count",
                reflect: !0
            },
            secondaryCountMaxDigits: {
                type: Number,
                attribute: "secondary-count-max-digits"
            },
            secondaryCountType: {
                type: String,
                attribute: "secondary-count-type",
                reflect: !0
            },
            target: {
                type: String,
                reflect: !0
            },
            text: {
                type: String,
                reflect: !0
            },
            type: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [r, e `
			:host {
				display: inline-block;
				position: relative;
			}
			:host[hidden] {
				display: none;
			}
			a {
				box-sizing: border-box;
				display: inline-block;
				height: 100%;
				outline: none;
				width: 100%;
			}
			d2l-count-badge-icon {
				text-align: initial;
			}
		`]
    }
    constructor() {
        super(), this.download = !1, this.secondaryCountType = "notification"
    }
    static get focusElementSelector() {
        return "a"
    }
    render() {
        const t = void 0 === this.secondaryCount;
        return o `
			<a @focus="${this._onFocus}"
				@blur="${this._onBlur}"
				?download="${this.download}"
				href="${n(this.href)}"
				hreflang="${n(this.hreflang)}"
				rel="${n(this.rel)}"
				target="${n(this.target)}"
				type="${n(this.type)}">
				<span class="d2l-offscreen">${this.text}</span>
				<d2l-count-badge-icon
					aria-hidden="true"
					icon="${this.icon}"
					max-digits="${n(this.secondaryCountMaxDigits?this.secondaryCountMaxDigits:void 0)}"
					number="${t?0:this.secondaryCount}"
					?hide-zero="${t}"
					text="${this.text}"
					type="${this._getType()}">
				</d2l-count-badge-icon>
			</a>
			<slot name="tooltip"></slot>
		`
    }
    _getType() {
        return "count" === this.secondaryCountType ? this.secondaryCountType : "notification"
    }
    _onBlur() {
        this.shadowRoot && (this.shadowRoot.querySelector("d2l-count-badge-icon").forceFocusRing = !1)
    }
    _onFocus() {
        this.shadowRoot && (this.shadowRoot.querySelector("d2l-count-badge-icon").forceFocusRing = !0)
    }
}
customElements.define("d2l-card-footer-link", s);