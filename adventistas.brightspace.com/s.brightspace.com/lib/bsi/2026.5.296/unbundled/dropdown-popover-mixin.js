import {
    _ as o,
    b as t,
    d as e,
    a as i,
    c as n
} from "./_rollupPluginBabelHelpers.js";
import "./button.js";
import {
    i as r,
    b as s
} from "./lit-element.js";
import {
    e as d
} from "./class-map.js";
import {
    f as a
} from "./dom.js";
import {
    L as l
} from "./localize-core-element.js";
import {
    P as p
} from "./tooltip.js";
import {
    o as h
} from "./style-map.js";
[...document.fonts].forEach(o => o.load());
const c = c => {
    var u, b;
    return u = new WeakMap, b = new WeakSet, class extends(l(p(c))) {
        static get properties() {
            return {
                align: {
                    type: String
                },
                maxHeight: {
                    type: Number,
                    attribute: "max-height"
                },
                maxWidth: {
                    type: Number,
                    attribute: "max-width"
                },
                minHeight: {
                    type: Number,
                    attribute: "min-height"
                },
                minWidth: {
                    type: Number,
                    attribute: "min-width"
                },
                mobileBreakpointOverride: {
                    type: Number,
                    attribute: "mobile-breakpoint"
                },
                mobileTray: {
                    type: String,
                    attribute: "mobile-tray"
                },
                noAutoClose: {
                    type: Boolean,
                    attribute: "no-auto-close"
                },
                noAutoFit: {
                    type: Boolean,
                    attribute: "no-auto-fit"
                },
                noAutoFocus: {
                    type: Boolean,
                    attribute: "no-auto-focus"
                },
                noMobileCloseButton: {
                    type: Boolean,
                    attribute: "no-mobile-close-button"
                },
                noPadding: {
                    type: Boolean,
                    attribute: "no-padding"
                },
                noPaddingFooter: {
                    type: Boolean,
                    attribute: "no-padding-footer"
                },
                noPaddingHeader: {
                    type: Boolean,
                    attribute: "no-padding-header"
                },
                noPointer: {
                    type: Boolean,
                    attribute: "no-pointer"
                },
                opened: {
                    type: Boolean,
                    reflect: !0
                },
                trapFocus: {
                    type: Boolean,
                    attribute: "trap-focus"
                },
                verticalOffset: {
                    type: String,
                    attribute: "vertical-offset"
                },
                _blockEndScroll: {
                    state: !0
                },
                _blockStartScroll: {
                    state: !0
                },
                _dropdownContent: {
                    type: Boolean,
                    attribute: "dropdown-content",
                    reflect: !0
                },
                _hasFooterSlotContent: {
                    state: !0
                },
                _hasHeaderSlotContent: {
                    state: !0
                }
            }
        }
        static get styles() {
            return [super.styles, r `
			.dropdown-content-layout {
				align-items: stretch;
				display: flex;
				flex-direction: column;
			}
			.dropdown-content {
				box-sizing: border-box;
				flex: auto;
				max-width: 100%;
				overflow-y: auto;
				padding: 1rem;
			}
			.dropdown-header,
			.dropdown-footer {
				box-sizing: border-box;
				flex: none;
				max-width: 100%;
				min-height: 5px;
				padding: 1rem;
				position: relative;
				width: 100%;
				z-index: 2;
			}
			.dropdown-header {
				border-block-end: 1px solid var(--d2l-popover-border-color, var(--d2l-popover-default-border-color));
				border-start-end-radius: var(--d2l-popover-border-radius, var(--d2l-popover-default-border-radius));
				border-start-start-radius: var(--d2l-popover-border-radius, var(--d2l-popover-default-border-radius));
			}
			.dropdown-footer {
				border-block-start: 1px solid var(--d2l-popover-border-color, var(--d2l-popover-default-border-color));
				border-end-end-radius: var(--d2l-popover-border-radius, var(--d2l-popover-default-border-radius));
				border-end-start-radius: var(--d2l-popover-border-radius, var(--d2l-popover-default-border-radius));
			}
			.dropdown-no-header {
				border-block-end: none;
				padding: 0;
			}
			.dropdown-no-footer {
				border-block-start: none;
				padding: 0;
			}
			.dropdown-no-padding {
				padding: 0;
			}
			.dropdown-header-scroll {
				box-shadow: 0 3px 3px 0 var(--d2l-popover-shadow-color, var(--d2l-popover-default-shadow-color));
			}
			.dropdown-footer-scroll {
				box-shadow: 0 -3px 3px 0 var(--d2l-popover-shadow-color, var(--d2l-popover-default-shadow-color));
			}

			:host([_mobile][_mobile-tray-location="inline-start"][opened]) .dropdown-content-layout,
			:host([_mobile][_mobile-tray-location="inline-end"][opened]) .dropdown-content-layout {
				height: 100vh;
			}
		`]
        }
        constructor() {
            super(), o(this, b), t(this, u, void 0), this.opened = !1, this.noAutoClose = !1, this.noAutoFit = !1, this.noAutoFocus = !1, this.noPadding = !1, this.noPaddingFooter = !1, this.noPaddingHeader = !1, this.noPointer = !1, this.trapFocus = !1, this._blockEndScroll = !1, this._blockStartScroll = !1, this._dropdownContent = !0, this._hasFooterSlotContent = !1, this._hasHeaderSlotContent = !1
        }
        firstUpdated(o) {
            super.firstUpdated(o), e(u, this, this.shadowRoot ? .querySelector(".dropdown-content")), this.addEventListener("d2l-popover-open", i(b, this, F)), this.addEventListener("d2l-popover-close", i(b, this, x)), this.addEventListener("d2l-popover-position", i(b, this, S)), this.addEventListener("d2l-popover-focus-enter", i(b, this, _))
        }
        render() {
            const o = {};
            if (this._mobile && "block-end" === this._mobileTrayLocation) o.maxHeight = "100%";
            else {
                const t = this._mobile && ("inline-start" === this._mobileTrayLocation || "inline-end" === this._mobileTrayLocation);
                o.maxHeight = !t && this._contentHeight ? `${this._contentHeight}px` : void 0
            }
            const t = {
                    "dropdown-content": !0,
                    "dropdown-no-padding": this.noPadding
                },
                e = {
                    "dropdown-header": !0,
                    "dropdown-no-header": !this._hasHeaderSlotContent,
                    "dropdown-no-padding": this.noPaddingHeader,
                    "dropdown-header-scroll": this._blockStartScroll
                },
                n = {
                    "dropdown-footer": !0,
                    "dropdown-no-footer": !(this._hasFooterSlotContent || this._mobile && this._mobileTrayLocation && !this.noMobileCloseButton),
                    "dropdown-no-padding": this.noPaddingFooter,
                    "dropdown-footer-scroll": this._blockEndScroll
                },
                r = i(b, this, v).call(this),
                a = s `
			<div class="dropdown-content-layout" style="${h(o)}">
				<div class="${d(e)}">
					<slot name="header" @slotchange="${i(b,this,y)}"></slot>
				</div>
				<div class="${d(t)}" @scroll="${i(b,this,C)}">
					<slot></slot>
				</div>
				<div class="${d(n)}">
					<slot name="footer" @slotchange="${i(b,this,w)}"></slot>
					<d2l-button style=${h(r)} @click=${this.close}>
						${this.localize("components.dropdown.close")}
					</d2l-button>
				</div>
			</div>
		`;
            return this.renderPopover(a)
        }
        willUpdate(o) {
            (o.has("align") || o.has("maxHeight") || o.has("maxWidth") || o.has("minHeight") || o.has("minWidth") || o.has("mobileBreakpointOverride") || o.has("mobileTray") || o.has("noAutoClose") || o.has("noAutoFit") || o.has("noAutoFocus") || o.has("noPointer") || o.has("trapFocus") || o.has("verticalOffset")) && super.configure({
                maxHeight: this.maxHeight,
                maxWidth: this.maxWidth,
                minHeight: this.minHeight,
                minWidth: this.minWidth,
                mobileBreakpoint: this.mobileBreakpointOverride,
                mobileTrayLocation: i(b, this, m).call(this, this.mobileTray),
                noAutoClose: this.noAutoClose,
                noAutoFit: this.noAutoFit,
                noAutoFocus: this.noAutoFocus,
                noPointer: this.noPointer,
                offset: void 0 !== this.verticalOffset ? Number.parseInt(this.verticalOffset) : void 0,
                position: {
                    location: "block-end",
                    span: i(b, this, f).call(this, this.align)
                },
                trapFocus: this.trapFocus
            }), o.has("opened") && (this.opened ? this.open(!0) : o.get("opened") && this.close())
        }
        async open(o = !0) {
            const t = i(b, this, g).call(this);
            super.open(t, o)
        }
        scrollTo(o) {
            if (n(u, this)) return "number" == typeof o && (n(u, this).scrollTop = o), n(u, this).scrollTop
        }
        toggleOpen(o = !0) {
            const t = i(b, this, g).call(this);
            super.toggleOpen(t, o)
        }
    };

    function m(o) {
        switch (o) {
            case "bottom":
                return "block-end";
            case "left":
                return "inline-start";
            case "right":
                return "inline-end";
            default:
                return
        }
    }

    function f(o) {
        switch (o) {
            case "start":
                return "end";
            case "end":
                return "start";
            default:
                return "all"
        }
    }

    function v() {
        if (!this._mobile || !this._mobileTrayLocation) return {
            display: "none"
        };
        let o;
        return o = this.noPaddingFooter ? "calc(100% - 24px)" : this._hasFooterSlotContent ? "100%" : "calc(100% + 16px)", {
            display: this.noMobileCloseButton ? "none" : "inline-block",
            marginBlock: this._hasFooterSlotContent ? "0" : "-20px -20px",
            marginInline: this._hasFooterSlotContent ? "0" : "-20px 0",
            padding: this._hasFooterSlotContent && !this.noPaddingFooter ? "12px 0 0 0" : "12px",
            width: o
        }
    }

    function g() {
        return a(this, o => o.dropdownOpener)
    }

    function w(o) {
        this._hasFooterSlotContent = 0 !== o.target.assignedNodes().length
    }

    function y(o) {
        this._hasHeaderSlotContent = 0 !== o.target.assignedNodes().length
    }

    function x(o) {
        o.target === this && setTimeout(() => {
            this.opened = !1, this.dispatchEvent(new CustomEvent("d2l-dropdown-close", {
                bubbles: !0,
                composed: !0
            }))
        })
    }

    function _(o) {
        this.dispatchEvent(new CustomEvent("d2l-dropdown-focus-enter", {
            detail: {
                applyFocus: o.detail.applyFocus
            }
        }))
    }

    function F(o) {
        if (o.target === this) {
            var t;
            if (this.opened = !0, !this.noAutoFit && n(u, this))(t = n(u, this)).scrollTop ? ? (t.scrollTop = 0);
            setTimeout(() => {
                this.dispatchEvent(new CustomEvent("d2l-dropdown-open", {
                    bubbles: !0,
                    composed: !0
                }))
            })
        }
    }

    function S() {
        i(b, this, C).call(this), this.dispatchEvent(new CustomEvent("d2l-dropdown-position", {
            bubbles: !0,
            composed: !0
        }))
    }

    function C() {
        this._blockEndScroll = n(u, this).scrollHeight - (n(u, this).scrollTop + n(u, this).clientHeight) >= 5, this._blockStartScroll = 0 !== n(u, this).scrollTop
    }
};
export {
    c as D
};