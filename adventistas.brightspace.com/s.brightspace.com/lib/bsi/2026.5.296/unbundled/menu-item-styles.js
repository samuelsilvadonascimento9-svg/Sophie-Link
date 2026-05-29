import {
    P as e
} from "./property-required-mixin.js";
import "./colors.js";
import {
    r as t,
    i
} from "./lit-element.js";
import {
    a as o
} from "./focus.js";
import {
    g as r
} from "./overflow.js";
const s = t => class extends(e(t)) {
        static get properties() {
            return {
                disabled: {
                    type: Boolean,
                    reflect: !0
                },
                first: {
                    type: Boolean,
                    reflect: !0
                },
                hasChildView: {
                    type: Boolean
                },
                hidden: {
                    type: Boolean,
                    reflect: !0
                },
                last: {
                    type: String,
                    reflect: !0
                },
                lines: {
                    type: Number
                },
                role: {
                    type: String,
                    reflect: !0
                },
                tabindex: {
                    type: String,
                    reflect: !0
                },
                text: {
                    type: String,
                    required: !0
                },
                description: {
                    type: String
                },
                _ariaDisabled: {
                    type: String,
                    attribute: "aria-disabled",
                    reflect: !0
                },
                _ariaLabel: {
                    type: String,
                    attribute: "aria-label",
                    reflect: !0
                },
                _letClickPropagate: {
                    state: !0
                }
            }
        }
        constructor() {
            super(), this.__keyCodes = {
                ENTER: 13,
                LEFT: 37,
                RIGHT: 39,
                SPACE: 32
            }, this.__children = null, this.disabled = !1, this.lines = 2, this.role = "menuitem", this.tabindex = -1, this._letClickPropagate = !1
        }
        firstUpdated(e) {
            super.firstUpdated(e), this.addEventListener("click", this.__onClick), this.addEventListener("d2l-hierarchical-view-hide-complete", this.__onHideComplete), this.addEventListener("dom-change", this.__onDomChange), this.addEventListener("keydown", this._onKeyDown), this.__initializeItem(), this.hidden && this._onHidden()
        }
        updated(e) {
            super.updated(e), e.has("hidden") && this._onHidden()
        }
        willUpdate(e) {
            super.willUpdate(e), e.forEach((t, i) => {
                switch (i) {
                    case "text":
                    case "description":
                        this._ariaLabel = this.description || this.text;
                        break;
                    case "disabled":
                        this._ariaDisabled = this.disabled ? "true" : "false";
                        break;
                    case "lines":
                        void 0 === e.get("lines") && 2 === this.lines || this.style.setProperty("--d2l-menu-item-lines", this.lines)
                }
            })
        }
        __action() {
            this.disabled || (this.__children && this.__children.length > 0 && this.__children[0].hierarchicalView ? this.__children[0].show() : this.dispatchEvent(new CustomEvent("d2l-menu-item-select", {
                bubbles: !0,
                composed: !0
            })))
        }
        __initializeItem() {
            const e = this.shadowRoot && this.shadowRoot.querySelector("slot:not([name])");
            if (!e) return;
            const t = e.assignedNodes().filter(e => e.nodeType === Node.ELEMENT_NODE);
            if (!(t && t.length > 0 && "TEMPLATE" === t[0].tagName))
                for (let e = 0; e < t.length; e++)
                    if ("TEMPLATE" !== t[e].tagName && "DOM-IF" !== t[e].tagName) {
                        this.hasChildView = !0, this.__children = t, this.setAttribute("aria-haspopup", !0), this.__children[0].label = this.text;
                        break
                    }
        }
        __onClick(e) {
            this._letClickPropagate || e.stopPropagation(), this.__action()
        }
        __onDomChange() {
            this.__initializeItem()
        }
        __onHideComplete(e) {
            -1 !== this.__children.indexOf(e.target) && (e.detail.data && e.detail.data.preventFocus || (this.focus(), this.setAttribute("tabindex", "0")))
        }
        _onHidden() {
            this.dispatchEvent(new CustomEvent("d2l-menu-item-visibility-change", {
                bubbles: !0,
                composed: !0
            }))
        }
        _onKeyDown(e) {
            if (e.target === this) return e.keyCode === this.__keyCodes.ENTER || e.keyCode === this.__keyCodes.SPACE ? (e.stopPropagation(), e.preventDefault(), void this.__action()) : this.__children && this.__children.length > 0 && e.keyCode === this.__keyCodes.RIGHT ? (e.stopPropagation(), void this.__action()) : void 0
        }
    },
    a = i `
	:host {
		--d2l-menu-item-lines: 2;
		background-color: var(--d2l-menu-background-color);
		border-top: 1px solid var(--d2l-menu-border-color);
		box-sizing: border-box;
		color: var(--d2l-menu-foreground-color);
		cursor: pointer;
		display: block;
		font-size: 0.8rem;
		margin-top: -1px;
		width: 100%;
	}

	:host(:hover),
	:host([first]:hover) {
		background-color: var(--d2l-menu-background-color-hover);
		color: var(--d2l-menu-foreground-color-hover);
	}

	:host(:${t(o())}),
	:host([first]:${t(o())}) {
		border-radius: 6px;
		border-top-color: transparent;
		color: var(--d2l-menu-foreground-color-hover);
		outline: 2px solid var(--d2l-menu-border-color-hover) !important; /* override reset styles */
		outline-offset: -3px;
		z-index: 2;
	}

	:host([disabled]), :host([disabled]:hover) {
		cursor: default;
		opacity: 0.75;
	}

	:host([disabled]:${t(o())}) {
		cursor: default;
		opacity: 0.75;
	}

	:host([hidden]) {
		display: none;
	}

	:host([first]) {
		border-top-color: transparent;
	}

	.d2l-menu-item-text {
		flex: auto;
		line-height: 1rem;
		white-space: normal;
		${r({lines:"var(--d2l-menu-item-lines, 2)"})}
	}

	.d2l-menu-item-supporting {
		flex: 0 0 auto;
		line-height: 1rem;
		margin-inline-start: 6px;
	}
`;
export {
    s as M, a as m
};