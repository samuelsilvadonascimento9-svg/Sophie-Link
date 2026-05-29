import {
    e as t,
    f as e
} from "./dom.js";
import {
    i as a
} from "./lit-element.js";
const o = matchMedia("(prefers-reduced-motion: reduce)").matches,
    i = a `

	:host([__voa-state="hidden"]) {
		opacity: 0 !important;
		transform: translateY(-10px) !important;
	}
	:host([__voa-state="showing"]) {
		transition: transform 200ms ease-out, opacity 200ms ease-out !important;
	}
	:host([__voa-state="hiding"]) {
		opacity: 0 !important;
		transform: none !important;
		transition: opacity 200ms ease-out !important;
	}

	:host([__voa-state="hidden"][animation-type="opacity"]),
	:host([__voa-state="hiding"][animation-type="opacity"]) {
		transform: none !important;
	}
	:host([__voa-state="showing"][animation-type="opacity"]) {
		transition: opacity 200ms ease-in !important;
	}
	:host([__voa-state="hiding"][animation-type="opacity"]) {
		transition: none !important;
	}

	@media only screen and (hover: none), only screen and (-moz-touch-enabled: 1) {
		:host([__voa-state="hidden"]),
		:host([__voa-state="hiding"]) {
			opacity: 1 !important;
			transform: none !important;
		}
	}

`,
    s = a => class extends a {
        static get properties() {
            return {
                animationType: {
                    type: String,
                    reflect: !0,
                    attribute: "animation-type"
                },
                visibleOnAncestor: {
                    type: Boolean,
                    reflect: !0,
                    attribute: "visible-on-ancestor"
                },
                __voaState: {
                    type: String,
                    reflect: !0,
                    attribute: "__voa-state"
                }
            }
        }
        constructor() {
            super(), this.animationType = "opacity-transform", this.visibleOnAncestor = !1
        }
        attributeChangedCallback(t, e, a) {
            "visible-on-ancestor" === t && this.__voaAttached && (a ? this.__voaInit() : this.__voaUninit()), super.attributeChangedCallback(t, e, a)
        }
        connectedCallback() {
            super.connectedCallback(), this.__voaAttached = !0, this.visibleOnAncestor ? requestAnimationFrame(() => this.__voaInit()) : this.__voaState = null
        }
        disconnectedCallback() {
            this.__voaAttached = !1, this.__voaUninit(), super.disconnectedCallback()
        }
        __voaHandleBlur(e) {
            t(this.__voaTarget, e.relatedTarget) || (this.__voaFocusIn = !1, this.__voaHide())
        }
        __voaHandleFocus() {
            this.__voaFocusIn = !0, this.__voaShow()
        }
        __voaHandleMouseEnter() {
            this.__voaMouseOver = !0, this.__voaShow()
        }
        __voaHandleMouseLeave() {
            this.__voaMouseOver = !1, this.__voaHide()
        }
        __voaHide() {
            if (!this.__voaFocusIn && !this.__voaMouseOver)
                if (o) this.__voaState = "hidden";
                else {
                    const t = e => {
                        "transform" !== e.propertyName && "opacity" !== e.propertyName || (this.removeEventListener("transitionend", t), this.__voaState = "hidden")
                    };
                    this.addEventListener("transitionend", t), this.__voaState = "hiding"
                }
        }
        __voaInit() {
            this.visibleOnAncestor && (this.__voaTarget = e(this, t => !(!t || t.nodeType !== Node.ELEMENT_NODE) && (t.isVisibleOnAncestorTarget || t.classList.contains("d2l-visible-on-ancestor-target"))), this.__voaTarget ? (this.__voaHandleBlur = this.__voaHandleBlur.bind(this), this.__voaHandleFocus = this.__voaHandleFocus.bind(this), this.__voaHandleMouseEnter = this.__voaHandleMouseEnter.bind(this), this.__voaHandleMouseLeave = this.__voaHandleMouseLeave.bind(this), this.__voaTarget.addEventListener("focus", this.__voaHandleFocus, !0), this.__voaTarget.addEventListener("blur", this.__voaHandleBlur, !0), this.__voaTarget.addEventListener("mouseenter", this.__voaHandleMouseEnter), this.__voaTarget.addEventListener("mouseleave", this.__voaHandleMouseLeave), this.__voaState = "hidden") : this.__voaState = null)
        }
        __voaShow() {
            if (o && "opacity" !== this.animationType) this.__voaState = "shown";
            else {
                const t = e => {
                    "transform" !== e.propertyName && "opacity" !== e.propertyName || (this.removeEventListener("transitionend", t), this.__voaState = "shown")
                };
                this.addEventListener("transitionend", t), this.__voaState = "showing"
            }
        }
        __voaUninit() {
            this.__voaState = null, this.__voaTarget && (this.__voaTarget.removeEventListener("focus", this.__voaHandleFocus, !0), this.__voaTarget.removeEventListener("blur", this.__voaHandleBlur, !0), this.__voaTarget.removeEventListener("mouseenter", this.__voaHandleMouseEnter), this.__voaTarget.removeEventListener("mouseleave", this.__voaHandleMouseLeave), this.__voaTarget = null)
        }
    };
export {
    s as V, i as v
};