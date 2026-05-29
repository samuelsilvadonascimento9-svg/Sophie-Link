import "./screen-reader-pause.js";
import "./colors.js";
import "./icon.js";
import {
    a as e,
    i as t,
    b as r,
    A as i
} from "./lit-element.js";
import {
    S as s
} from "./skeleton-mixin.js";
import "./list2.js";
import "./common.js";
import "./offscreen.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./subscriberControllers.js";
import "./dom.js";
import "./dedupeMixin.js";
class o extends(s(e)) {
    static get properties() {
        return {
            hidden: {
                type: Boolean
            },
            icon: {
                type: String
            },
            text: {
                type: String
            },
            _showSeparator: {
                state: !0
            }
        }
    }
    static get styles() {
        return [super.styles, t `
			:host {
				unicode-bidi: isolate;
				vertical-align: middle;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-icon {
				height: 1.2857em; /* 18px desired height at main font size (14px), but using em to scale properly at smaller breakpoint. */
				width: 1.2857em;
			}
			.separator {
				margin: 0 -0.05rem; /* 10px desired margin, subtract 5px arbitrary whitespace and 6px whitespace inside bullet icon. */
			}
			.separator d2l-icon {
				color: var(--d2l-color-galena);
			}
			.item-icon {
				margin-inline-end: 0.05rem; /* 6px desired margin, subtract 5px arbitrary whitespace. */
				margin-top: -0.1rem;
			}
			:host([skeleton]) d2l-icon {
				color: var(--d2l-color-sylvite);
			}
			:host([skeleton]) .d2l-skeletize {
				display: inline-block;
				max-width: 80%;
				overflow: hidden;
				vertical-align: middle;
				white-space: nowrap;
			}
		`]
    }
    constructor() {
        super(), this._showSeparator = !0
    }
    render() {
        return r `
			${this._renderIcon()}
			${this._renderText()}
			${this._renderSeparator()}
		`
    }
    updated(e) {
        super.updated(e), e.has("hidden") && this._onHidden()
    }
    _onHidden() {
        this.dispatchEvent(new CustomEvent("d2l-object-property-list-item-visibility-change", {
            bubbles: !0,
            composed: !0
        }))
    }
    _renderIcon() {
        return this.icon && !this.skeleton ? r `<d2l-icon icon="${this.icon}" class="item-icon"></d2l-icon>` : i
    }
    _renderSeparator() {
        return this._showSeparator ? r `
			<span class="separator">
				<d2l-screen-reader-pause></d2l-screen-reader-pause>
				<d2l-icon icon="tier1:bullet"></d2l-icon>
			</span>
		` : i
    }
    _renderText() {
        return r `<span class="d2l-skeletize" aria-hidden="${this.skeleton?"true":"false"}">${this.text}</span>`
    }
}
customElements.define("d2l-object-property-list-item", o);
export {
    o as O
};