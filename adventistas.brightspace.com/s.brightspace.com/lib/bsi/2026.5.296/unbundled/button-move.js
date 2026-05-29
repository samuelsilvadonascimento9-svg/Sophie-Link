import "./colors.js";
import "./icon.js";
import "./tooltip.js";
import {
    a as t,
    i as e,
    b as o
} from "./lit-element.js";
import {
    b as i
} from "./button-styles.js";
import {
    F as d
} from "./focus-mixin.js";
import {
    g as r
} from "./uniqueId.js";
import {
    o as s
} from "./if-defined.js";
import {
    T as n
} from "./theme-mixin.js";
const l = Object.freeze({
        DOWN: 40,
        END: 35,
        HOME: 36,
        LEFT: 37,
        RIGHT: 39,
        UP: 38
    }),
    a = Object.freeze({
        up: "up",
        down: "down",
        left: "left",
        right: "right",
        rootHome: "root-home",
        home: "home",
        rootEnd: "root-end",
        end: "end"
    });
class c extends(n(d(t))) {
    static get properties() {
        return {
            autofocus: {
                type: Boolean,
                reflect: !0
            },
            description: {
                type: String
            },
            disabledDown: {
                type: Boolean,
                attribute: "disabled-down",
                reflect: !0
            },
            disabledEnd: {
                type: Boolean,
                attribute: "disabled-end",
                reflect: !0
            },
            disabledHome: {
                type: Boolean,
                attribute: "disabled-home",
                reflect: !0
            },
            disabledLeft: {
                type: Boolean,
                attribute: "disabled-left",
                reflect: !0
            },
            disabledRight: {
                type: Boolean,
                attribute: "disabled-right",
                reflect: !0
            },
            disabledUp: {
                type: Boolean,
                attribute: "disabled-up",
                reflect: !0
            },
            text: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [i, e `
				:host {
					--d2l-button-move-background-color-focus: #ffffff;
					--d2l-button-move-icon-background-color-hover: var(--d2l-color-mica);
					--d2l-icon-fill-color: var(--d2l-color-tungsten);
					display: inline-block;
					line-height: 0;
				}
				:host([hidden]) {
					display: none;
				}
				:host([theme="dark"]) {
					--d2l-button-move-background-color-focus: #000000;
					--d2l-button-move-icon-background-color-hover: rgba(51, 53, 54, 0.9); /* tungsten @70% @90% */
					--d2l-icon-fill-color: var(--d2l-color-sylvite);
					--d2l-focus-ring-color: var(--d2l-color-celestine-plus-1);
				}
				button {
					background-color: transparent;
					display: flex;
					flex-direction: column;
					gap: 2px;
					margin: 0;
					min-height: auto;
					padding: 0;
					position: relative;
					width: 0.9rem;
				}
				d2l-icon {
					border-radius: 0.1rem;
					height: 0.85rem;
					width: 0.9rem;
				}
				button:focus {
					background-color: var(--d2l-button-move-background-color-focus);
				}
				button:hover > d2l-icon,
				button:focus > d2l-icon {
					background-color: var(--d2l-button-move-icon-background-color-hover);
				}
				.up-icon {
					border-top-left-radius: 0.3rem;
					border-top-right-radius: 0.3rem;
				}
				.down-icon {
					border-bottom-left-radius: 0.3rem;
					border-bottom-right-radius: 0.3rem;
				}

				.up-layer,
				.down-layer {
					height: 1.2rem;
					inset-inline-start: -0.2rem;
					position: absolute;
					width: 1.3rem;
				}
				.up-layer {
					top: -0.35rem;
				}
				.down-layer {
					bottom: -0.35rem;
				}

				/* Firefox includes a hidden border which messes up button dimensions */
				button::-moz-focus-inner {
					border: 0;
				}
				button[disabled]:hover > d2l-icon {
					background-color: transparent;
				}
				:host([disabled-up]) .up-icon,
				:host([disabled-down]) .down-icon {
					opacity: 0.5;
				}
				:host([disabled-up]) .up-layer,
				:host([disabled-down]) .down-layer {
					cursor: default;
				}
			`]
    }
    constructor() {
        super(), this.autofocus = !1, this._buttonId = r(), this._describedById = r()
    }
    static get focusElementSelector() {
        return "button"
    }
    render() {
        return o `
			<div role="application">
				<button
					aria-describedby="${s(this.description?this._describedById:void 0)}"
					aria-label="${s(this.text)}"
					?autofocus="${this.autofocus}"
					?disabled="${this.disabledUp&&this.disabledDown&&this.disabledLeft&&this.disabledRight&&this.disabledHome&&this.disabledEnd}"
					id="${this._buttonId}"
					@keydown="${this._handleKeydown}"
					title="${s(this.text)}"
					type="button">
					<d2l-icon icon="tier1:arrow-toggle-up" class="up-icon"></d2l-icon>
					<d2l-icon icon="tier1:arrow-toggle-down" class="down-icon"></d2l-icon>
					<div class="up-layer" @click="${this._handleUpClick}"></div>
					<div class="down-layer" @click="${this._handleDownClick}"></div>
			</button>
			${this.description?o`<span id="${this._describedById}" hidden>${this.description}</span>`:null}
		</div>`
    }
    _dispatchAction(t) {
        t && this.dispatchEvent(new CustomEvent("d2l-button-move-action", {
            detail: {
                action: t
            },
            bubbles: !1
        }))
    }
    _handleDownClick() {
        this.disabledDown || this._dispatchAction(a.down)
    }
    _handleKeydown(t) {
        let e;
        switch (t.keyCode) {
            case l.UP:
                this.disabledUp || (e = a.up);
                break;
            case l.DOWN:
                this.disabledDown || (e = a.down);
                break;
            case l.LEFT:
                this.disabledLeft || (e = a.left);
                break;
            case l.RIGHT:
                this.disabledRight || (e = a.right);
                break;
            case l.HOME:
                this.disabledHome || (e = t.ctrlKey ? a.rootHome : a.home);
                break;
            case l.END:
                this.disabledEnd || (e = t.ctrlKey ? a.rootEnd : a.end);
                break;
            default:
                return
        }
        e && this._dispatchAction(e), t.preventDefault(), t.stopPropagation()
    }
    _handleUpClick() {
        this.disabledUp || this._dispatchAction(a.up)
    }
}
customElements.define("d2l-button-move", c);
export {
    a as m
};