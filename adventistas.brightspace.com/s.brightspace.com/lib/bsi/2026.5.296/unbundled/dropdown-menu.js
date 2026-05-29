import {
    _ as t,
    b as i,
    d as e,
    c as s,
    a as o
} from "./_rollupPluginBabelHelpers.js";
import {
    a as n,
    i as r
} from "./lit-element.js";
import {
    D as a
} from "./dropdown-popover-mixin.js";
import {
    T as d
} from "./theme-mixin.js";
import "./button.js";
import "./colors.js";
import "./svg-to-css.js";
import "./tooltip.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./uniqueId.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./if-defined.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./directive.js";
import "./style-map.js";
import "./button-styles.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
const m = matchMedia("(prefers-reduced-motion: reduce)").matches;
var l = new WeakMap,
    c = new WeakMap,
    h = new WeakMap,
    p = new WeakSet;
class u extends(d(a(n))) {
    static get properties() {
        return {
            _closeRadio: {
                type: Boolean,
                reflect: !0,
                attribute: "_close-radio"
            }
        }
    }
    static get styles() {
        return [super.styles, r `
			:host {
				--d2l-dropdown-close-animation-name: d2l-dropdown-close-animation;
			}

			:host([theme="dark"]) {
				--d2l-dropdown-close-animation-name: d2l-dropdown-close-animation-dark;
			}

			:host([_close-radio]) {
				animation: var(--d2l-dropdown-close-animation-name) ${300}ms ease-out;
				animation-delay: 50ms;
			}

			@media (prefers-reduced-motion: reduce) {
				:host([_close-radio]) {
					animation: none !important;
				}
			}
			@keyframes d2l-dropdown-close-animation {
				0% { opacity: 1; transform: translate(0, 0); }
				100% { opacity: 0; transform: translate(0, -10px); }
			}

			@keyframes d2l-dropdown-close-animation-dark {
				0% { opacity: 0.9; transform: translate(0, 0); }
				100% { opacity: 0; transform: translate(0, -10px); }
			}
		`]
    }
    constructor() {
        super(), t(this, p), i(this, l, void 0), i(this, c, void 0), i(this, h, void 0), this.noAutoFocus = !0, this.noPadding = !0, this._closeRadio = !1, e(c, this, !1), e(h, this, this.maxHeight)
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.opened && e(c, this, !0), e(h, this, this.maxHeight), this._mobile && this.mobileTray ? this.maxHeight = null : this.maxHeight = s(h, this), this.addEventListener("animationend", o(p, this, j)), this.addEventListener("d2l-dropdown-open", o(p, this, v)), this.addEventListener("d2l-dropdown-close", o(p, this, w)), this.addEventListener("d2l-menu-resize", o(p, this, b)), this.addEventListener("d2l-menu-item-select", o(p, this, x)), this.addEventListener("d2l-selection-action-click", o(p, this, x)), this.addEventListener("d2l-menu-item-change", o(p, this, g)), this.addEventListener("focus", o(p, this, E))
    }
}

function f() {
    return this.shadowRoot ? .querySelector(".dropdown-content > slot").assignedNodes().filter(t => t.hasAttribute && ("menu" === t.getAttribute("role") || "listbox" === t.getAttribute("role")))[0]
}

function j() {
    this._closeRadio && (this._closeRadio = !1, this.close())
}

function g(t) {
    "menuitemradio" === t.target.getAttribute("role") && (m ? setTimeout(() => {
        this.close()
    }, 300) : this._closeRadio = !0)
}

function w(t) {
    if (t.target !== this) return;
    const i = o(p, this, f).call(this);
    i.show({
        preventFocus: !0
    }), i.resetFocusables()
}

function E(t) {
    t.srcElement !== this && o(p, this, f).call(this).focus()
}

function b(t) {
    this._mobile && this.mobileTray ? this.maxHeight = null : this.maxHeight = s(h, this), this.position(t.detail, {
        updateLocation: s(l, this)
    }), e(l, this, !1);
    const i = o(p, this, f).call(this);
    if ("menu-radio" === i.getMenuType()) {
        const t = i.querySelector("[selected]");
        null !== t && setTimeout(() => t.scrollIntoView({
            block: "nearest"
        }), 0)
    }
}

function v(t) {
    if (t.target !== this) return;
    e(l, this, !0), this._closeRadio = !1;
    const i = o(p, this, f).call(this);
    i.resize(), s(c, this) ? e(c, this, !1) : i.focus()
}

function x(t) {
    ["D2L-MENU-ITEM", "D2L-MENU-ITEM-LINK", "D2L-SELECTION-ACTION-MENU-ITEM", "D2L-BUTTON-SPLIT-ITEM"].indexOf(t.target.tagName) < 0 || this.close()
}
customElements.define("d2l-dropdown-menu", u);