import {
    _ as t,
    b as i,
    d as e,
    a as o,
    c as s,
    f as n
} from "./_rollupPluginBabelHelpers.js";
import {
    i as r,
    b as h,
    A as a,
    a as l
} from "./lit-element.js";
import {
    n as d,
    b as c,
    e as p,
    r as u,
    k as f,
    m as b,
    h as m
} from "./dom.js";
import {
    k as _,
    e as w,
    g as v,
    j as g
} from "./focus.js";
import {
    a as k
} from "./announce.js";
import {
    c as y
} from "./styles.js";
import {
    g as x
} from "./uniqueId.js";
import "./backdrop.js";
import "./colors.js";
import {
    t as E
} from "./ifrauBackdropService.js";
import {
    s as W,
    c as M
} from "./dismissible.js";
import {
    _ as L
} from "./offscreen.js";
import {
    e as S
} from "./class-map.js";
import {
    g as P
} from "./flags.js";
import {
    o as T
} from "./style-map.js";
import "./svg-to-css.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./if-defined.js";
import "./framed.js";
import "./directive.js";
const C = {
        button: !0,
        input: !0,
        select: !0,
        textarea: !0
    },
    A = {
        button: !0,
        checkbox: !0,
        combobox: !0,
        link: !0,
        listbox: !0,
        menuitem: !0,
        menuitemcheckbox: !0,
        menuitemradio: !0,
        option: !0,
        radio: !0,
        slider: !0,
        spinbutton: !0,
        switch: !0,
        "tab:": !0,
        textbox: !0,
        treeitem: !0
    };

function F(t, i, e) {
    i = i || C, e = e || A;
    const o = t.nodeName.toLowerCase();
    if (i[o]) return !0;
    const s = t.getAttribute("role") || "";
    return "a" === o && (t.hasAttribute("href") || "0" === t.getAttribute("tabindex")) || e[s] || !1
}

function $(t, i, e) {
    const o = e ? .elements || C,
        s = e ? .roles || A;
    for (let e = 0; e < t.length; e++) {
        const n = t[e];
        if (n.getAttribute) {
            if (i && i(n)) break;
            if (F(n, o, s)) return !0
        }
    }
    return !1
}
const H = P("GAUD-9520-ignore-no-op-resize-events", !0),
    N = Object.freeze({
        blockEnd: "block-end",
        blockStart: "block-start",
        inlineEnd: "inline-end",
        inlineStart: "inline-start"
    }),
    O = Object.freeze({
        all: "all",
        end: "end",
        start: "start"
    }),
    B = {
        location: N.blockEnd,
        span: O.all,
        allowFlip: !0
    },
    j = 20,
    z = 16,
    I = Math.SQRT2 * parseFloat(z),
    D = "popover" in HTMLElement.prototype,
    U = () => {
        const t = window.innerWidth - document.documentElement.clientWidth;
        return t > 0 ? t + 1 : 0
    },
    q = n => {
        var l, f, b, m, g, k, y, x, P, C;
        return l = new WeakMap, f = new WeakMap, b = new WeakMap, m = new WeakMap, g = new WeakMap, k = new WeakMap, y = new WeakMap, x = new WeakMap, P = new WeakMap, C = new WeakSet, class extends n {
            static get properties() {
                return {
                    _contentHeight: {
                        state: !0
                    },
                    _location: {
                        type: String,
                        reflect: !0,
                        attribute: "_location"
                    },
                    _margin: {
                        state: !0
                    },
                    _maxHeight: {
                        state: !0
                    },
                    _maxWidth: {
                        state: !0
                    },
                    _minHeight: {
                        state: !0
                    },
                    _minWidth: {
                        state: !0
                    },
                    _mobile: {
                        type: Boolean,
                        reflect: !0,
                        attribute: "_mobile"
                    },
                    _mobileBreakpoint: {
                        state: !0
                    },
                    _mobileTrayLocation: {
                        type: String,
                        reflect: !0,
                        attribute: "_mobile-tray-location"
                    },
                    _noAutoClose: {
                        state: !0
                    },
                    _noAutoFit: {
                        state: !0
                    },
                    _noAutoFocus: {
                        state: !0
                    },
                    _noPointer: {
                        state: !0
                    },
                    _offscreen: {
                        type: Boolean,
                        reflect: !0,
                        attribute: "_offscreen"
                    },
                    _offset: {
                        state: !0
                    },
                    _opened: {
                        type: Boolean,
                        reflect: !0,
                        attribute: "_opened"
                    },
                    _pointerPosition: {
                        state: !0
                    },
                    _position: {
                        state: !0
                    },
                    _preferredPosition: {
                        state: !0
                    },
                    _rtl: {
                        state: !0
                    },
                    _showBackdrop: {
                        state: !0
                    },
                    _trapFocus: {
                        state: !0
                    },
                    _useNativePopover: {
                        type: String,
                        reflect: !0,
                        attribute: "popover"
                    },
                    _width: {
                        state: !0
                    }
                }
            }
            static get styles() {
                return r `
			:host {
				--d2l-popover-default-animation-name: d2l-popover-animation;
				--d2l-popover-default-background-color: #ffffff;
				--d2l-popover-default-border-color: var(--d2l-color-mica);
				--d2l-popover-default-border-radius: 0.3rem;
				--d2l-popover-default-foreground-color: var(--d2l-color-ferrite);
				--d2l-popover-default-shadow-color: rgba(0, 0, 0, 0.15);
				background-color: transparent; /* override popover default */
				border: none; /* override popover */
				box-sizing: border-box;
				color: var(--d2l-popover-foreground-color, var(--d2l-popover-default-foreground-color));
				display: none;
				height: fit-content; /* normalize popover */
				inset: 0; /* normalize popover */
				margin: 0; /* override popover */
				overflow: visible; /* override popover */
				padding: 0; /* override popover */
				position: fixed; /* normalize popover */
				text-align: start;
				width: fit-content; /* normalize popover */
			}
			:host([theme="dark"]) {
				--d2l-popover-default-animation-name: d2l-popover-animation-dark;
				--d2l-popover-default-background-color: #333536; /* tungsten @ 70% */
				--d2l-popover-default-border-color: var(--d2l-color-tungsten);
				--d2l-popover-default-foreground-color: var(--d2l-color-sylvite);
				--d2l-popover-default-shadow-color: rgba(0, 0, 0, 1);
				opacity: 0.9;
			}
			:host([hidden]) {
				display: none;
			}
			:host(:not([popover])) {
				z-index: 998; /* position on top of floating buttons */
			}
			:host([_opened]) {
				display: inline-block;
			}
			:host([_location="block-start"]) {
				bottom: 0;
				top: auto;
			}

			.content-position {
				display: inline-block;
				position: absolute;
			}
			.content-width {
				background-color: var(--d2l-popover-background-color, var(--d2l-popover-default-background-color));
				border: 1px solid var(--d2l-popover-border-color, var(--d2l-popover-default-border-color));
				border-radius: var(--d2l-popover-border-radius, var(--d2l-popover-default-border-radius));
				box-shadow: 0 2px 12px 0 var(--d2l-popover-shadow-color, var(--d2l-popover-default-shadow-color));
				box-sizing: border-box;
				display: flex;
				max-width: 370px;
				min-width: 70px;
				outline: var(--d2l-popover-outline-width, 0) solid var(--d2l-popover-outline-color, transparent);
				width: 100vw;
			}
			.content-container {
				box-sizing: border-box;
				display: inline-block;
				max-width: 100%;
				min-width: inherit;
				outline: none;
				overflow-y: auto;
			}

			.pointer {
				clip: rect(-5px, 21px, 8px, -7px);
				display: inline-block;
				position: absolute;
				z-index: 1;
			}
			:host([_location="block-start"]) .pointer {
				clip: rect(9px, 21px, 22px, -3px);
			}
			:host([_location="inline-start"]) .pointer,
			:host([_location="inline-end"]) .pointer.pointer-mirror {
				clip: rect(-3px, 21px, 21px, 10px);
			}
			:host([_location="inline-end"]) .pointer,
			:host([_location="inline-start"]) .pointer.pointer-mirror {
				clip: rect(-3px, 8px, 21px, -3px);
			}

			.pointer > div {
				background-color: var(--d2l-popover-background-color, var(--d2l-popover-default-background-color));
				border: 1px solid var(--d2l-popover-border-color, var(--d2l-popover-default-border-color));
				border-radius: 0.1rem;
				box-shadow: -4px -4px 12px -5px rgba(32, 33, 34, 0.2); /* ferrite */
				height: ${z}px;
				outline: var(--d2l-popover-outline-width, 0) solid var(--d2l-popover-outline-color, transparent);
				transform: rotate(45deg);
				width: ${z}px;
			}

			:host([_location="block-start"]) .pointer > div {
				box-shadow: 4px 4px 12px -5px rgba(32, 33, 34, 0.2); /* ferrite */
			}

			@keyframes d2l-popover-animation {
				0% { opacity: 0; transform: translate(0, -10px); }
				100% { opacity: 1; transform: translate(0, 0); }
			}
			@keyframes d2l-popover-animation-dark {
				0% { opacity: 0; transform: translate(0, -10px); }
				100% { opacity: 0.9; transform: translate(0, 0); }
			}
			@media (prefers-reduced-motion: no-preference) {
				:host([_opened]) {
					animation: var(--d2l-popover-animation-name, var(--d2l-popover-default-animation-name)) 300ms ease;
				}
			}

			:host([_mobile][_mobile-tray-location]) .content-width {
				position: fixed;
				z-index: 1000;
			}

			:host([_mobile][_mobile-tray-location="inline-start"]) .content-width,
			:host([_mobile][_mobile-tray-location="inline-end"]) .content-width {
				inset-block-end: 0;
				inset-block-start: 0;
			}

			:host([_mobile][_mobile-tray-location="inline-start"]) .content-width {
				border-end-start-radius: 0;
				border-start-start-radius: 0;
			}

			:host([_mobile][_mobile-tray-location="inline-end"]) .content-width {
				border-end-end-radius: 0;
				border-start-end-radius: 0;
			}

			:host([_mobile][_mobile-tray-location="block-end"]) .content-width {
				border-end-end-radius: 0;
				border-end-start-radius: 0;
				inset-inline-start: 0;
			}

			:host([_mobile][_mobile-tray-location="inline-end"][opened]) .content-width {
				inset-inline-end: 0;
			}

			:host([_mobile][_mobile-tray-location="inline-start"][opened]) .content-width {
				inset-inline-start: 0;
			}

			:host([_mobile][_mobile-tray-location="block-end"][opened]) .content-width {
				inset-block-end: 0;
			}

			:host([_mobile][_mobile-tray-location="inline-start"][opened]) .content-container,
			:host([_mobile][_mobile-tray-location="inline-end"][opened]) .content-container {
				height: 100vh;
			}

			:host([_mobile][_mobile-tray-location]) > .pointer {
				display: none;
			}

			:host([_mobile][_mobile-tray-location][opened]) {
				animation: none;
			}

			:host([_offscreen]) {
				${L}
			}

			d2l-focus-trap {
				display: block;
			}
		`
            }
            constructor() {
                super(), t(this, C), i(this, l, void 0), i(this, f, void 0), i(this, b, void 0), i(this, m, void 0), i(this, g, void 0), i(this, k, void 0), i(this, y, void 0), i(this, x, void 0), i(this, P, void 0), this.configure(), this._mobile = !1, this._showBackdrop = !1, this._useNativePopover = D ? "manual" : void 0, e(m, this, o(C, this, st).bind(this)), e(g, this, o(C, this, nt).bind(this)), e(k, this, o(C, this, rt).bind(this)), e(y, this, o(C, this, lt).bind(this)), e(x, this, o(C, this, dt).bind(this)), e(P, this, o(C, this, ft).bind(this))
            }
            connectedCallback() {
                super.connectedCallback(), this._opened && (o(C, this, A).call(this), o(C, this, $).call(this)), o(C, this, F).call(this)
            }
            disconnectedCallback() {
                super.disconnectedCallback(), o(C, this, ct).call(this), o(C, this, pt).call(this), o(C, this, ut).call(this), o(C, this, q).call(this)
            }
            async close() {
                if (!this._opened) return;
                const t = await E();
                this._opened = !1, this._useNativePopover && this.hidePopover(), this._previousFocusableAncestor = null, o(C, this, ct).call(this), o(C, this, pt).call(this), o(C, this, ut).call(this), o(C, this, q).call(this), t && this._showBackdrop && (t.hideBackdrop(), e(f, this, null)), this._showBackdrop = !1, await this.updateComplete, o(C, this, V).call(this), this.dispatchEvent(new CustomEvent("d2l-popover-close", {
                    bubbles: !0,
                    composed: !0
                }))
            }
            configure(t) {
                t ? .margin ? this._margin = t.margin : t ? .position ? .location === N.inlineStart || t ? .position ? .location === N.inlineEnd ? this._margin = 0 : this._margin = 18, this._maxHeight = t ? .maxHeight, this._maxWidth = t ? .maxWidth, this._minHeight = t ? .minHeight, this._minWidth = t ? .minWidth, this._mobileBreakpoint = t ? .mobileBreakpoint ? ? 616, this._mobileTrayLocation = t ? .mobileTrayLocation, this._noAutoClose = t ? .noAutoClose ? ? !1, this._noAutoFit = t ? .noAutoFit ? ? !1, this._noAutoFocus = t ? .noAutoFocus ? ? !1, this._noPointer = t ? .noPointer ? ? !1, this._offset = Number.isInteger(t ? .offset) ? t.offset : 16, t ? this._preferredPosition ? .location === t.position ? .location && this._preferredPosition ? .span === t.position ? .span && this._preferredPosition ? .allowFlip === t.position ? .allowFlip || (this._preferredPosition = {
                    location: t ? .position ? .location ? ? N.blockEnd,
                    span: t ? .position ? .span ? ? O.all,
                    allowFlip: t ? .position ? .allowFlip ? ? !0
                }) : this._preferredPosition = B, this._trapFocus = t ? .trapFocus ? ? !1, o(C, this, pt).call(this), o(C, this, F).call(this)
            }
            async open(t, i = !0) {
                if (this._opened) return;
                const s = await E();
                this._rtl = "rtl" === document.documentElement.getAttribute("dir"), this._applyFocus = void 0 === i || i, this._opened = !0, await this.updateComplete, this.isConnected && this._useNativePopover && this.showPopover(), this._previousFocusableAncestor = _(this, !1, !1), this._opener = t, o(C, this, A).call(this), await this.position(), this._showBackdrop = this._mobile && this._mobileTrayLocation, s && this._showBackdrop && e(f, this, await s.showBackdrop()), this._dismissibleId = W(() => this.close()), o(C, this, G).call(this, this), o(C, this, $).call(this), this.dispatchEvent(new CustomEvent("d2l-popover-open", {
                    bubbles: !0,
                    composed: !0
                }))
            }
            async position(t, i) {
                if (!this._opener) return;
                i = Object.assign({
                    updateLocation: !0,
                    updateHeight: !0
                }, i);
                const e = o(C, this, X).call(this);
                !this._noAutoFit && i.updateHeight && (this._contentHeight = null), this._width = null, await this.updateComplete;
                const s = (t, i) => ({
                        height: t + 10,
                        width: i.width
                    }),
                    n = e.scrollWidth,
                    r = window.innerWidth - 40;
                this._width = r > n ? n : r, await this.updateComplete, await (async () => {
                    const n = document.documentElement.scrollHeight,
                        r = this._opener.getBoundingClientRect();
                    t = t ? ? e.getBoundingClientRect();
                    const h = this._minHeight ? ? Math.min(this._maxHeight ? ? Number.MAX_VALUE, t.height);
                    let a = s(h, t);
                    const l = this._preferredPosition.location === N.inlineStart || this._preferredPosition.location === N.inlineEnd,
                        d = o(C, this, R).call(this, {
                            above: r.top - (l ? 0 : this._offset) - this._margin,
                            below: window.innerHeight - r.bottom - (l ? 0 : this._offset) - this._margin,
                            left: r.left - 20,
                            right: document.documentElement.clientWidth - r.right - 15
                        }, a, r),
                        c = o(C, this, R).call(this, {
                            above: r.top + document.documentElement.scrollTop,
                            below: n - r.bottom - document.documentElement.scrollTop
                        }, a, r);
                    if (l) {
                        const i = this.minWidth || 70;
                        this._rtl ? this._preferredPosition.location === N.inlineStart && d.right - j > i ? this._width = d.right - j : this._preferredPosition.location === N.inlineStart && d.left - j > i || this._preferredPosition.location === N.inlineEnd && d.left - j > i ? this._width = d.left - j : this._preferredPosition.location === N.inlineEnd && d.right - j > i && (this._width = d.right - j) : this._preferredPosition.location === N.inlineStart && d.left - j > i ? this._width = d.left - j : this._preferredPosition.location === N.inlineStart && d.right - j > i || this._preferredPosition.location === N.inlineEnd && d.right - j > i ? this._width = d.right - j : this._preferredPosition.location === N.inlineEnd && d.left - j > i && (this._width = d.left - j), await this.updateComplete, t = e.getBoundingClientRect(), a = s(h, t)
                    }
                    if (i.updateLocation && (this._location = o(C, this, Q).call(this, d, c, a)), this._position = o(C, this, tt).call(this, d, r, t), this._noPointer || (this._pointerPosition = o(C, this, Z).call(this, r)), i.updateHeight) {
                        const t = this._location === N.inlineStart || this._location === N.inlineEnd ? d.above + d.below + r.height : this._location === N.blockStart ? d.above : d.below;
                        !this._noAutoFit && t && t > 0 && (this._contentHeight = null !== this._maxHeight && t > this._maxHeight ? this._maxHeight - 2 : t, await this.updateComplete)
                    }
                    this.dispatchEvent(new CustomEvent("d2l-popover-position", {
                        bubbles: !0,
                        composed: !0
                    }))
                })()
            }
            renderPopover(t) {
                const i = this._mobile ? this._mobileTrayLocation : null;
                let e;
                e = i === N.blockEnd ? o(C, this, Y).call(this) : i === N.inlineStart || i === N.inlineEnd ? o(C, this, J).call(this) : o(C, this, ot).call(this);
                const s = e.width,
                    n = e.content;
                t = h `
			<div id="content-wrapper" class="content-width vdiff-target" style=${T(s)}>
				<div class="content-container" style=${T(n)}>${t}</div>
			</div>
		`, this._trapFocus && (t = h `
				<d2l-focus-trap @d2l-focus-trap-enter="${o(C,this,at)}" ?trap="${this._opened}">
					${t}
				</d2l-focus-trap>
			`);
                const r = {};
                if (this._position)
                    for (const t in this._position) r[t] = `${this._position[t]}px`;
                t = h `
			<div class="content-position" style=${T(r)}>
				${t}
			</div>
		`;
                const l = {};
                if (this._pointerPosition)
                    for (const t in this._pointerPosition) l[t] = `${this._pointerPosition[t]}px`;
                const d = {
                        pointer: !0,
                        "pointer-mirror": this._rtl,
                        "vdiff-target": !0
                    },
                    c = this._noPointer ? a : h `
			<div class="${S(d)}" style="${T(l)}">
				<div></div>
			</div>
		`,
                    p = this._mobileTrayLocation ? h `<d2l-backdrop for-target="content-wrapper" ?shown="${this._showBackdrop}" @click="${o(C,this,ht)}"></d2l-backdrop>` : a;
                return h `${t}${p}${c}`
            }
            async resize() {
                this._opened && (this._showBackdrop = this._mobile && this._mobileTrayLocation, await this.position())
            }
            toggleOpen(t, i = !0) {
                return this._opened ? this.close() : this.open(t, !this._noAutoFocus && i)
            }
        };

        function A() {
            this.addEventListener("blur", s(k, this), {
                capture: !0
            }), document.body.addEventListener("focus", s(k, this), {
                capture: !0
            }), document.addEventListener("click", s(g, this), {
                capture: !0
            })
        }

        function F() {
            e(b, this, window.matchMedia(`(max-width: ${this._mobileBreakpoint-1}px)`)), this._mobile = s(b, this).matches, s(b, this).addEventListener ? .("change", s(y, this))
        }

        function $() {
            const t = (t, i) => {
                const e = window.getComputedStyle(t, null).getPropertyValue(i);
                return "scroll" === e || "auto" === e
            };
            o(C, this, ut).call(this), e(l, this, new Map), H ? d(s(x, this)) : window.addEventListener("resize", s(x, this)), this._ancestorMutationObserver ? ? (this._ancestorMutationObserver = new MutationObserver(s(m, this)));
            const i = {
                attributes: !0,
                childList: !0,
                subtree: !0
            };
            let n = this;
            for (this._scrollablesObserved = []; n;) {
                let e = !1;
                n.nodeType === Node.ELEMENT_NODE ? e = t(n, "overflow-y") || t(n, "overflow-x") : n.nodeType === Node.DOCUMENT_NODE && (e = !0), e && (this._scrollablesObserved.push(n), n.addEventListener("scroll", s(P, this))), (n.nodeType === Node.DOCUMENT_NODE || n.nodeType === Node.DOCUMENT_FRAGMENT_NODE && n.host) && this._ancestorMutationObserver.observe(n, i), n = c(n)
            }
            this._openerIntersectionObserver = new IntersectionObserver(t => {
                t.forEach(t => this._offscreen = !t.isIntersecting)
            }, {
                threshold: 0
            }), this._opener && this._openerIntersectionObserver.observe(this._opener)
        }

        function q() {
            this._dismissibleId && (M(this._dismissibleId), this._dismissibleId = null)
        }

        function R(t, i, e) {
            const o = { ...t
            };
            return this._preferredPosition.span === O.end && !this._rtl || this._preferredPosition.span === O.start && this._rtl ? o.left = Math.max(0, i.width - (e.width + t.right)) : (this._preferredPosition.span === O.end && this._rtl || this._preferredPosition.span === O.start && !this._rtl) && (o.right = Math.max(0, i.width - (e.width + t.left))), o
        }

        function G(t) {
            if (this._noAutoFocus || !1 === this._applyFocus) return;
            const i = w(t);
            if (i) requestAnimationFrame(() => i.focus());
            else {
                const t = o(C, this, X).call(this);
                t.setAttribute("tabindex", "-1"), t.focus()
            }
        }

        function V() {
            document.activeElement && p(this, v()) && this ? ._opener.focus()
        }

        function X() {
            return this.shadowRoot.querySelector(".content-container")
        }

        function Q(t, i, e) {
            const o = this._preferredPosition;
            if (!o.allowFlip) return o.location;
            if (o.location === N.blockEnd) {
                if (t.below >= e.height) return N.blockEnd;
                if (t.above >= e.height) return N.blockStart;
                if (!this.noAutoFit) return t.above > t.below ? N.blockStart : N.blockEnd;
                if (i.below >= e.height) return N.blockEnd;
                if (i.above >= e.height) return N.blockStart
            }
            if (o.location === N.blockStart) {
                if (t.above >= e.height) return N.blockStart;
                if (t.below >= e.height) return N.blockEnd;
                if (!this.noAutoFit) return t.above > t.below ? N.blockStart : N.blockEnd;
                if (i.above >= e.height) return N.blockStart;
                if (i.below >= e.height) return N.blockEnd
            }
            if (o.location === N.inlineEnd)
                if (this._rtl) {
                    if (t.left >= e.width) return N.inlineEnd;
                    if (t.right >= e.width) return N.inlineStart
                } else {
                    if (t.right >= e.width) return N.inlineEnd;
                    if (t.left >= e.width) return N.inlineStart
                }
            if (o.location === N.inlineStart)
                if (this._rtl) {
                    if (t.right >= e.width) return N.inlineStart;
                    if (t.left >= e.width) return N.inlineEnd
                } else {
                    if (t.left >= e.width) return N.inlineStart;
                    if (t.right >= e.width) return N.inlineEnd
                }
            return N.blockEnd
        }

        function Y() {
            let t, i = Math.min(window.innerHeight, window.screen.height);
            s(f, this) && (i = s(f, this).availableHeight);
            const e = i - 42;
            let o;
            if (t = this._maxHeight ? Math.min(e, this._maxHeight) : e, t = `${t}px`, s(f, this)) {
                o = `${window.innerHeight-s(f,this).availableHeight+Math.min(s(f,this).top,0)}px`
            }
            const n = "100vw";
            return {
                width: {
                    minWidth: n,
                    width: n,
                    maxHeight: t,
                    bottom: o
                },
                content: { ...{
                        width: n
                    },
                    maxHeight: t
                }
            }
        }

        function J() {
            let t = this._maxWidth,
                i = Math.min(window.innerWidth, window.screen.width);
            s(f, this) && (i = s(f, this).availableWidth);
            const e = Math.min(i - 30, 420);
            t = t ? Math.min(e, t) : e;
            let o = this.minWidth;
            o = o ? Math.max(285, o) : 285;
            let n = this._width ? this._width : t;
            n && t && n > t - 20 && (n = t - 20), n && o && n < o - 20 && (n = o - 20), t = `${t}px`, o = `${o}px`;
            const r = `${n+18}px`,
                h = `${n+20}px`,
                a = s(f, this) ? `${s(f,this).availableHeight}px` : "";
            let l, d, c;
            s(f, this) ? l = (s(f, this).top < 0 ? -s(f, this).top : 0) + "px" : window.innerHeight > window.screen.height && (l = window.pageYOffset), this._mobileTrayLocation === N.inlineEnd ? d = `${Math.max(window.innerWidth-window.screen.width,0)}px` : this._mobileTrayLocation === N.inlineStart && (c = `${Math.max(window.innerWidth-window.screen.width,0)}px`), o > t && (o = t);
            return {
                width: {
                    maxWidth: t,
                    minWidth: o,
                    width: h,
                    top: l,
                    maxHeight: a,
                    insetInlineStart: c,
                    insetInlineEnd: d
                },
                content: { ...{
                        minWidth: o,
                        width: r
                    },
                    maxHeight: a
                }
            }
        }

        function K() {
            return this.shadowRoot.querySelector(".pointer")
        }

        function Z(t) {
            const i = {},
                e = o(C, this, K).call(this);
            if (!e) return i;
            const s = e.getBoundingClientRect();
            if (this._location === N.blockEnd || this._location === N.blockStart) {
                if (this._preferredPosition.span !== O.all) {
                    const e = Math.min(20 + (I - z) / 2, (t.width - z) / 2);
                    this._rtl ? this._preferredPosition.span === O.end ? i.right = window.innerWidth - t.right + e - U() : i.left = -1 * (window.innerWidth - t.left - e - U()) : this._preferredPosition.span === O.end ? i.left = t.left + e : i.right = -1 * t.right + e
                } else this._rtl ? i.right = window.innerWidth - t.left - (t.width + s.width) / 2 - U() : i.left = t.left + (t.width - s.width) / 2;
                this._location === N.blockStart ? i.bottom = window.innerHeight - t.top + this._offset - 8 : i.top = t.top + t.height + this._offset - 7
            } else this._location !== N.inlineEnd && this._location !== N.inlineStart || (i.top = t.top + t.height / 2 - 8, this._location === N.inlineStart ? this._rtl ? i.left = -1 * (window.innerWidth - t.right + 7 - this._offset - U()) : i.right = -1 * (t.left - this._offset + 7) : this._rtl ? i.right = window.innerWidth - t.left - 7 + this._offset - U() : i.left = t.left + t.width + this._offset - 7);
            return i
        }

        function tt(t, i, e) {
            const s = {};
            if (this._location === N.blockEnd || this._location === N.blockStart) {
                const n = o(C, this, it).call(this, t, i, e);
                null !== n && (this._rtl ? s.right = window.innerWidth - i.left - i.width + n - U() : s.left = i.left + n), this._location === N.blockStart ? s.bottom = window.innerHeight - i.top + this._offset : s.top = i.top + i.height + this._offset
            } else if (this._location === N.inlineEnd || this._location === N.inlineStart) {
                const n = o(C, this, et).call(this, t, i, e);
                null !== n && (s.top = i.top + n), this._location === N.inlineStart ? this._rtl ? s.left = -1 * (window.innerWidth - i.right - this._offset - U()) : s.right = -1 * (i.left - this._offset) : this._rtl ? s.right = window.innerWidth - i.left + this._offset - U() : s.left = i.left + i.width + this._offset
            }
            return s
        }

        function it(t, i, e) {
            if (this._location !== N.blockEnd && this._location !== N.blockStart) return null;
            const o = e.width - i.width,
                s = o / 2;
            if (this._preferredPosition.span === O.all && o <= 0) return -1 * (s + 1.5);
            if (this._preferredPosition.span === O.all && t.left > s && t.right > s) return -1 * (s + 1.5);
            const n = !this._noPointer && this._preferredPosition.span !== O.all && i.width < 52 ? 26 - i.width / 2 : 0;
            if (this._rtl) {
                if (t.left < s) return -1 * o + t.left + n;
                if (t.right < s) return -1 * t.right - n
            } else {
                if (t.left < s) return -1 * t.left - n;
                if (t.right < s) return -1 * o + t.right + n
            }
            if (this._preferredPosition.span !== O.all) {
                const t = Math.min(i.width / 2 - 28, 0);
                return this._preferredPosition.span === O.end ? t : i.width - e.width - t
            }
            return null
        }

        function et(t, i, e) {
            if (this._location !== N.inlineEnd && this._location !== N.inlineStart) return null;
            const o = e.height - i.height,
                s = o / 2;
            return this._preferredPosition.span === O.all && o <= 0 || this._preferredPosition.span === O.all && t.above > s && t.below > s ? -1 * s : t.above < s ? -1 * t.above : t.below < s ? -1 * o + t.below : null
        }

        function ot() {
            return {
                width: {
                    maxWidth: this._maxWidth ? `${this._maxWidth}px` : void 0,
                    minWidth: this._minWidth ? `${this._minWidth}px` : void 0,
                    width: this._width ? `${this._width+3}px` : void 0
                },
                content: {
                    maxHeight: this._contentHeight ? `${this._contentHeight}px` : void 0
                }
            }
        }

        function st(t) {
            if (!this._opener) return;
            !!t.find(t => {
                if (p(this._opener, t.target)) return !1;
                const i = s(l, this) ? .get(t.target);
                return (!i || i !== t.target.style.cssText) && ("attributes" === t.type && "style" === t.attributeName && s(l, this) ? .set(t.target, t.target.style.cssText), !0)
            }) && o(C, this, ft).call(this)
        }

        function nt(t) {
            if (!this._opened || this._noAutoClose) return;
            const i = t.composedPath()[0];
            p(o(C, this, X).call(this), i) || this._opener !== document.body && p(this._opener, i) || this.close()
        }

        function rt() {
            setTimeout(() => {
                if (!this._opened || this._noAutoClose || !document.activeElement || document.activeElement === this._previousFocusableAncestor || document.activeElement === document.body) return;
                const t = v();
                p(this, t) || p(this._opener, t) || t === this._previousFocusableAncestor || this.close()
            }, 0)
        }

        function ht() {
            this.close()
        }

        function at() {
            o(C, this, G).call(this, o(C, this, X).call(this)), this.dispatchEvent(new CustomEvent("d2l-popover-focus-enter", {
                detail: {
                    applyFocus: this._applyFocus
                }
            }))
        }
        async function lt() {
            this._mobile = s(b, this).matches, this._opened && (this._showBackdrop = this._mobile && this._mobileTrayLocation, await this.position())
        }

        function dt() {
            this.resize()
        }

        function ct() {
            this.removeEventListener("blur", s(k, this), {
                capture: !0
            }), document.body ? .removeEventListener("focus", s(k, this), {
                capture: !0
            }), document.removeEventListener("click", s(g, this), {
                capture: !0
            })
        }

        function pt() {
            s(b, this) ? .removeEventListener ? .("change", s(y, this))
        }

        function ut() {
            this._opener && this._openerIntersectionObserver ? .unobserve(this._opener), this._scrollablesObserved ? .forEach(t => {
                t.removeEventListener("scroll", s(P, this))
            }), this._scrollablesObserved = null, this._ancestorMutationObserver ? .disconnect(), H ? u(s(x, this)) : window.removeEventListener("resize", s(x, this))
        }

        function ft() {
            this._repositioning || requestAnimationFrame(() => {
                this.position(void 0, {
                    updateLocation: !1,
                    updateHeight: !1
                }), this._repositioning = !1
            }), this._repositioning = !0
        }
    };
var R;
const G = { ...C,
        h1: !0,
        h2: !0,
        h3: !0,
        h4: !0,
        h5: !0,
        h6: !0
    },
    V = { ...A,
        heading: !0,
        img: !0
    },
    X = t => t.nodeType === Node.ELEMENT_NODE && (!!g(t, !0, !1, !0) && F(t, G, V));
let Q;
const Y = () => {
    Q && clearTimeout(Q), Q = setTimeout(() => Q = null, 1e3)
};
let J = !0,
    K = null;
var Z = new WeakMap,
    tt = new WeakMap,
    it = new WeakMap,
    et = new WeakMap,
    ot = new WeakMap,
    st = new WeakMap,
    nt = new WeakMap,
    rt = new WeakMap,
    ht = new WeakMap,
    at = new WeakMap,
    lt = new WeakMap,
    dt = new WeakMap,
    ct = new WeakMap,
    pt = new WeakMap,
    ut = new WeakMap,
    ft = new WeakMap,
    bt = new WeakMap,
    mt = new WeakMap,
    _t = new WeakMap,
    wt = new WeakMap,
    vt = new WeakMap,
    gt = new WeakMap,
    kt = new WeakSet;
class yt extends(q(l)) {
    static get properties() {
        return {
            align: {
                type: String,
                reflect: !0
            },
            announced: {
                type: Boolean
            },
            closeOnClick: {
                type: Boolean,
                attribute: "close-on-click"
            },
            delay: {
                type: Number
            },
            disableFocusLock: {
                type: Boolean,
                attribute: "disable-focus-lock"
            },
            for: {
                type: String
            },
            forceShow: {
                type: Boolean,
                attribute: "force-show"
            },
            forType: {
                type: String,
                attribute: "for-type"
            },
            offset: {
                type: Number
            },
            positionLocation: {
                type: String,
                attribute: "position"
            },
            showing: {
                type: Boolean,
                reflect: !0
            },
            showTruncatedOnly: {
                type: Boolean,
                attribute: "show-truncated-only"
            },
            state: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [super.styles, y, r `
			:host {
				--d2l-tooltip-background-color: var(--d2l-color-ferrite); /* Deprecated, use state attribute instead */
				--d2l-tooltip-border-color: var(--d2l-color-ferrite); /* Deprecated, use state attribute instead */
				--d2l-tooltip-outline-color: rgba(255, 255, 255, 0.32);
				--d2l-popover-background-color: var(--d2l-tooltip-background-color);
				--d2l-popover-border-color: var(--d2l-tooltip-border-color);
				--d2l-popover-border-radius: 0.3rem;
				--d2l-popover-outline-color: var(--d2l-tooltip-outline-color);
				--d2l-popover-outline-width: 1px;
			}
			:host([state="error"]) {
				--d2l-tooltip-background-color: var(--d2l-color-cinnabar);
				--d2l-tooltip-border-color: var(--d2l-color-cinnabar);
			}
			.d2l-tooltip-content {
				box-sizing: border-box;
				color: white;
				max-width: 17.5rem;
				min-height: 1.85rem;
				min-width: 2.1rem;
				overflow: hidden;
				overflow-wrap: anywhere;
				padding-block: ${9}px ${10}px;
				padding-inline: ${14}px;
				white-space: normal;
			}
			::slotted(ul),
			::slotted(ol) {
				padding-inline-start: 1rem;
			}
			@media (max-width: 615px) {
				.d2l-tooltip-content {
					padding-bottom: ${11}px;
					padding-top: ${11}px;
				}
			}
		`]
    }
    constructor() {
        super(), t(this, kt), i(this, Z, void 0), i(this, tt, void 0), i(this, it, void 0), i(this, et, void 0), i(this, ot, void 0), i(this, st, void 0), i(this, nt, void 0), i(this, rt, void 0), i(this, ht, void 0), i(this, at, void 0), i(this, lt, !1), i(this, dt, !1), i(this, ct, !1), i(this, pt, !1), i(this, ut, void 0), i(this, ft, void 0), i(this, bt, !1), i(this, mt, !1), i(this, _t, void 0), i(this, wt, void 0), i(this, vt, void 0), i(this, gt, void 0), this.announced = !1, this.closeOnClick = !1, this.delay = 300, this.disableFocusLock = !1, this.forceShow = !1, this.forType = "descriptor", this.offset = 10, this.showTruncatedOnly = !1, this.state = "info", e(Z, this, o(kt, this, Lt).bind(this)), e(tt, this, o(kt, this, St).bind(this)), e(it, this, o(kt, this, Pt).bind(this)), e(et, this, o(kt, this, Tt).bind(this)), e(ot, this, o(kt, this, Ct).bind(this)), e(st, this, o(kt, this, At).bind(this)), e(nt, this, o(kt, this, Ft).bind(this)), e(rt, this, o(kt, this, $t).bind(this)), e(ht, this, o(kt, this, Ht).bind(this))
    }
    get showing() {
        return s(_t, this)
    }
    set showing(t) {
        const i = s(_t, this);
        i !== t && (e(_t, this, t), this.requestUpdate("showing", i), o(kt, this, jt).call(this, t, void 0 !== i))
    }
    connectedCallback() {
        super.connectedCallback(), this.showing = !1, o(kt, this, Wt).call(this), window.addEventListener("resize", s(nt, this)), requestAnimationFrame(() => o(kt, this, It).call(this))
    }
    disconnectedCallback() {
        super.disconnectedCallback(), K === this && (K = null), o(kt, this, Bt).call(this), window.removeEventListener("resize", s(nt, this)), Q = null, s(wt, this) && (f(s(wt, this), "aria-labelledby", this.id), f(s(wt, this), "aria-describedby", this.id))
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.addEventListener("mouseenter", o(kt, this, Nt)), this.addEventListener("mouseleave", o(kt, this, Ot))
    }
    render() {
        const t = h `
			<div class="d2l-tooltip-content d2l-body-small" role="text">
				<slot></slot>
			</div>
		`;
        return this.renderPopover(t)
    }
    willUpdate(t) {
        super.willUpdate(t), (t.has("align") || t.has("forceShow") || t.has("offset") || t.has("positionLocation")) && super.configure({
            maxWidth: "350",
            minWidth: "48",
            noAutoClose: this.forceShow,
            offset: void 0 !== this.offset ? Number.parseInt(this.offset) : void 0,
            position: {
                location: o(kt, this, xt).call(this, this.positionLocation),
                span: o(kt, this, Et).call(this, this.align)
            }
        }), t.forEach((t, i) => {
            "for" === i ? o(kt, this, It).call(this) : "forceShow" === i && o(kt, this, zt).call(this)
        })
    }
    hide() {
        e(dt, this, !1), e(lt, this, !1), o(kt, this, zt).call(this)
    }
    show() {
        this.showing = !0
    }
    updatePosition() {
        return super.position()
    }
    _getTarget() {
        return s(wt, this)
    }
}

function xt(t) {
    switch (t) {
        case "bottom":
        default:
            return "block-end";
        case "left":
            return "inline-start";
        case "right":
            return "inline-end";
        case "top":
            return "block-start"
    }
}

function Et(t) {
    switch (t) {
        case "start":
            return "end";
        case "end":
            return "start";
        default:
            return "all"
    }
}

function Wt() {
    this.addEventListener("d2l-popover-close", this.hide), s(wt, this) && (s(wt, this).addEventListener("mouseenter", s(et, this)), s(wt, this).addEventListener("mouseleave", s(ot, this)), s(wt, this).addEventListener("focus", s(it, this)), s(wt, this).addEventListener("blur", s(Z, this)), s(wt, this).addEventListener("click", s(tt, this)), s(wt, this).addEventListener("touchstart", s(ht, this), {
        passive: !0
    }), s(wt, this).addEventListener("touchcancel", s(rt, this)), s(wt, this).addEventListener("touchend", s(rt, this)), e(vt, this, new ResizeObserver(s(nt, this))), s(vt, this).observe(s(wt, this)), e(gt, this, new MutationObserver(s(st, this))), s(gt, this).observe(s(wt, this), {
        attributes: !0,
        attributeFilter: ["id"]
    }), s(gt, this).observe(s(wt, this).parentNode, {
        childList: !0
    }))
}

function Mt() {
    const t = this.getRootNode();
    let i;
    if (this.for) {
        const e = `#${m(this.for)}`;
        i = t.querySelector(e), i = (i || t ? .host ? .querySelector(e)) ? ? null
    } else {
        const e = this.parentNode;
        i = e.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? t.host : e, "D2L-INPUT-TEXT" === i.tagName && i ? .invalid || console.warn('<d2l-tooltip>: missing required attribute "for"')
    }
    return i
}

function Lt() {
    e(lt, this, !1), o(kt, this, zt).call(this)
}

function St() {
    this.closeOnClick && this.hide()
}
async function Pt() {
    this.showTruncatedOnly && (await o(kt, this, Dt).call(this), !s(pt, this)) || (this.disableFocusLock ? this.showing = !0 : (e(lt, this, !0), o(kt, this, zt).call(this)))
}

function Tt() {
    var t;
    s(bt, this) ? e(dt, this, !0) : e(at, this, setTimeout(async () => {
        this.showTruncatedOnly && (await o(kt, this, Dt).call(this), !s(pt, this)) || (e(dt, this, !0), o(kt, this, zt).call(this))
    }, (t = this.delay, Q ? 0 : t)))
}

function Ct() {
    clearTimeout(s(at, this)), e(dt, this, !1), this.showing && Y(), setTimeout(() => o(kt, this, zt).call(this), 100)
}

function At([t]) {
    (!s(wt, this).isConnected || t.target === s(wt, this) && "id" === t.attributeName) && (s(gt, this).disconnect(), o(kt, this, It).call(this))
}

function Ft() {
    e(mt, this, !0), this.showing && n(R.prototype, "position", this, 2)([])
}

function $t() {
    clearTimeout(s(ut, this))
}

function Ht() {
    e(ut, this, setTimeout(() => {
        s(wt, this).focus()
    }, 500))
}

function Nt() {
    this.showing && (e(ct, this, !0), o(kt, this, zt).call(this))
}

function Ot() {
    clearTimeout(s(ft, this)), e(ct, this, !1), e(bt, this, !0), Y(), e(ft, this, setTimeout(() => {
        e(bt, this, !1), o(kt, this, zt).call(this)
    }, 100))
}

function Bt() {
    this.removeEventListener("d2l-popover-close", this.hide), s(wt, this) && (s(wt, this).removeEventListener("mouseenter", s(et, this)), s(wt, this).removeEventListener("mouseleave", s(ot, this)), s(wt, this).removeEventListener("focus", s(it, this)), s(wt, this).removeEventListener("blur", s(Z, this)), s(wt, this).removeEventListener("click", s(tt, this)), s(wt, this).removeEventListener("touchstart", s(ht, this)), s(wt, this).removeEventListener("touchcancel", s(rt, this)), s(wt, this).removeEventListener("touchend", s(rt, this)), s(vt, this) && (s(vt, this).disconnect(), e(vt, this, null)), s(gt, this) && (s(gt, this).disconnect(), e(gt, this, null)))
}
async function jt(t, i) {
    clearTimeout(s(at, this)), clearTimeout(s(ut, this)), t ? (this.forceShow || (K && K.hide(), K = this), this.setAttribute("aria-hidden", "false"), await this.updateComplete, await n(R.prototype, "open", this, 2)([s(wt, this), !1]), i && this.dispatchEvent(new CustomEvent("d2l-tooltip-show", {
        bubbles: !0,
        composed: !0
    })), this.announced && !X(s(wt, this)) && k(this.innerText)) : (K === this && (K = null), this.setAttribute("aria-hidden", "true"), n(R.prototype, "close", this, 2)([]), i && this.dispatchEvent(new CustomEvent("d2l-tooltip-hide", {
        bubbles: !0,
        composed: !0
    })))
}

function zt() {
    this.showing = s(lt, this) || s(dt, this) || this.forceShow || s(ct, this)
}

function It() {
    if (!this.isConnected) return;
    const t = o(kt, this, Mt).call(this);
    if (s(wt, this) !== t) {
        if (o(kt, this, Bt).call(this), e(wt, this, t), s(wt, this)) {
            const t = s(wt, this).hasAttribute("disabled") || "true" === s(wt, this).getAttribute("aria-disabled"),
                i = X(s(wt, this));
            this.id = this.id || x(), this.setAttribute("role", "tooltip"), "label" === this.forType ? b(s(wt, this), "aria-labelledby", this.id) : this.announced && !i || b(s(wt, this), "aria-describedby", this.id), !J || i || this.announced || (console.warn("d2l-tooltip may be being used in a non-accessible manner; it should be attached to interactive elements like 'a', 'button','input'", "'select', 'textarea' or static / custom elements if a role has been set and the element is focusable.", s(wt, this)), J = !1), this.showing ? n(R.prototype, "_opened", this) ? n(R.prototype, "position", this, 2)([]) : n(R.prototype, "open", this, 2)([s(wt, this), !1]) : !t && p(s(wt, this), v()) && s(it, this).call(this)
        }
        o(kt, this, Wt).call(this)
    }
}
async function Dt() {
    if (!s(mt, this) || !this.showTruncatedOnly) return;
    const t = s(wt, this),
        i = document.createElement("div");
    i.style.position = "absolute", i.style.overflow = "hidden", i.style.whiteSpace = "nowrap", i.style.width = "1px", i.style.insetInlineStart = "-10000px";
    const o = t.cloneNode(!0);
    o.removeAttribute("id"), o.style.maxWidth = "none", o.style.display = "inline-block", i.appendChild(o), t.appendChild(i), await this.updateComplete;
    void 0 !== customElements.get(o.localName) && (o.requestUpdate(), await o.updateComplete), e(pt, this, o.scrollWidth - t.offsetWidth > 2), e(mt, this, !1), t.removeChild(i)
}
R = yt, customElements.define("d2l-tooltip", yt);
export {
    q as P, C as a, $ as b, D as i
};