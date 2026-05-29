import {
    F as t
} from "./focus-mixin.js";
import "./colors.js";
import {
    i as e
} from "./lit-element.js";
import {
    b as r
} from "./focus.js";
const i = e => class extends(t(e)) {
        static get properties() {
            return {
                ariaExpanded: {
                    type: String,
                    reflect: !0,
                    attribute: "aria-expanded"
                },
                ariaHaspopup: {
                    type: String,
                    reflect: !0,
                    attribute: "aria-haspopup"
                },
                ariaLabel: {
                    type: String,
                    reflect: !0,
                    attribute: "aria-label"
                },
                autofocus: {
                    type: Boolean,
                    reflect: !0
                },
                expanded: {
                    type: String,
                    reflect: !0,
                    attribute: "expanded"
                },
                disabled: {
                    type: Boolean,
                    reflect: !0
                },
                disabledTooltip: {
                    type: String,
                    attribute: "disabled-tooltip"
                },
                form: {
                    type: String,
                    reflect: !0
                },
                formaction: {
                    type: String,
                    reflect: !0
                },
                formenctype: {
                    type: String,
                    reflect: !0
                },
                formmethod: {
                    type: String,
                    reflect: !0
                },
                formnovalidate: {
                    type: String,
                    reflect: !0
                },
                formtarget: {
                    type: String,
                    reflect: !0
                },
                name: {
                    type: String,
                    reflect: !0
                },
                type: {
                    type: String,
                    reflect: !0
                }
            }
        }
        constructor() {
            super(), this.disabled = !1, this.autofocus = !1, this.type = "button"
        }
        get disabled() {
            return this._disabled
        }
        set disabled(t) {
            const e = this._disabled;
            this._disabled = t, this.requestUpdate("disabled", e)
        }
        get disabledTooltip() {
            return this._disabledTooltip
        }
        set disabledTooltip(t) {
            const e = this._disabledTooltip;
            this._disabledTooltip = t, this.requestUpdate("disabledTooltip", e)
        }
        static get focusElementSelector() {
            return "button"
        }
        get isButtonMixin() {
            return !0
        }
        connectedCallback() {
            super.connectedCallback(), this.addEventListener("click", this._handleClick, !0)
        }
        disconnectedCallback() {
            super.disconnectedCallback(), this.removeEventListener("click", this._handleClick, !0)
        }
        firstUpdated(t) {
            super.firstUpdated(t);
            const e = this.shadowRoot.querySelector(this.constructor.focusElementSelector);
            e && e.addEventListener("focus", () => {
                this.shadowRoot.querySelector(":focus-visible") && this.dispatchEvent(new CustomEvent("focus-visible"))
            })
        }
        willUpdate(t) {
            super.willUpdate(t), t.has("ariaExpanded") && void 0 !== this.ariaExpanded && (this.expanded = this.ariaExpanded)
        }
        _getType() {
            return "submit" === this.type || "reset" === this.type ? this.type : "button"
        }
        _handleClick(t) {
            this.disabled && t.stopPropagation()
        }
    },
    s = e `
	button {
		border-end-end-radius: var(--d2l-button-end-end-radius, 0.3rem);
		border-end-start-radius: var(--d2l-button-end-start-radius, 0.3rem);
		border-start-end-radius: var(--d2l-button-start-end-radius, 0.3rem);
		border-start-start-radius: var(--d2l-button-start-start-radius, 0.3rem);
		border-style: none;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-block;
		margin: 0;
		min-height: calc(2rem + 2px);
		outline: none;
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		vertical-align: middle;
		white-space: nowrap;
		width: auto;
	}
	${r("button")}
	@media (prefers-contrast: more) {
		button {
			border: 2px solid transparent;
		}
	}
`;
export {
    i as B, s as b
};