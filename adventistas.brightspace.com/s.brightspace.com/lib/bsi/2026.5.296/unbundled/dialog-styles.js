import {
    t
} from "./ifrauBackdropService.js";
import {
    a as e,
    p as i
} from "./backdrop.js";
import {
    c as o,
    s
} from "./dismissible.js";
import {
    g as a,
    e as n,
    f as l
} from "./dom.js";
import {
    j as d,
    e as r,
    d as h,
    g as c,
    l as u,
    b as p
} from "./focus.js";
import {
    e as g
} from "./class-map.js";
import {
    g as f
} from "./uniqueId.js";
import {
    b as _,
    i as m
} from "./lit-element.js";
import {
    o as w
} from "./if-defined.js";
import {
    o as v
} from "./style-map.js";
import {
    w as b
} from "./waitForElem.js";
import "./colors.js";
let x, y, C = !1;

function S() {
    C = !1, document.documentElement.style.setProperty("--d2l-vh", `${x}px`), document.documentElement.style.setProperty("--d2l-vw", `${y}px`)
}

function D() {
    x = .01 * window.innerHeight, y = .01 * window.innerWidth, C || requestAnimationFrame(S), C = !0
}
let E = !1;
E || (E = !0, window.addEventListener("resize", D)), D(), window.D2L = window.D2L || {}, window.D2L.DialogMixin = window.D2L.DialogMixin || {}, window.D2L.DialogMixin.hasNative = !1, void 0 === window.D2L.DialogMixin.preferNative && (window.D2L.DialogMixin.preferNative = !0);
const k = matchMedia("(prefers-reduced-motion: reduce)").matches,
    $ = "abort",
    I = 75,
    L = 30,
    q = 30,
    F = 30,
    z = p => class extends p {
        static get properties() {
            return {
                focusableContentElemPresent: {
                    state: !0
                },
                opened: {
                    type: Boolean,
                    reflect: !0
                },
                noContentScroll: {
                    type: Boolean,
                    attribute: "no-content-scroll",
                    reflect: !0
                },
                titleText: {
                    type: String,
                    attribute: "title-text"
                },
                _autoSize: {
                    state: !0
                },
                _fullscreenWithin: {
                    state: !0
                },
                _height: {
                    state: !0
                },
                _inIframe: {
                    type: Boolean,
                    attribute: "in-iframe",
                    reflect: !0
                },
                _isFullHeight: {
                    state: !0
                },
                _left: {
                    state: !0
                },
                _margin: {
                    state: !0
                },
                _nestedShowing: {
                    state: !0
                },
                _overflowBottom: {
                    state: !0
                },
                _overflowTop: {
                    state: !0
                },
                _parentDialog: {
                    state: !0
                },
                _scroll: {
                    state: !0
                },
                _state: {
                    type: String,
                    reflect: !0
                },
                _top: {
                    state: !0
                },
                _width: {
                    state: !0
                },
                _useNative: {
                    state: !0
                }
            }
        }
        constructor() {
            super(), this.focusableContentElemPresent = !1, this.noContentScroll = !1, this.opened = !1, this._autoSize = !0, this._dialogId = f(), this._fullscreenWithin = 0, this._handleMvcDialogOpen = this._handleMvcDialogOpen.bind(this), this._inIframe = !1, this._isDialogMixin = !0, this._isFullHeight = !1, this._height = 0, this._left = 0, this._margin = {
                top: I,
                right: L,
                bottom: q,
                left: F
            }, this._nestedShowing = !1, this._overflowBottom = !1, this._overflowTop = !1, this._parentDialog = null, this._scroll = !1, this._state = null, this._top = 0, this._updateOverflow = this._updateOverflow.bind(this), this._updateSize = this._updateSize.bind(this), this._useNative = window.D2L.DialogMixin.hasNative && window.D2L.DialogMixin.preferNative, this._width = 0
        }
        async connectedCallback() {
            super.connectedCallback(), this._useNative && window.addEventListener("d2l-mvc-dialog-open", this._handleMvcDialogOpen)
        }
        disconnectedCallback() {
            super.disconnectedCallback(), window.removeEventListener("d2l-mvc-dialog-open", this._handleMvcDialogOpen)
        }
        async updated(e) {
            if (super.updated(e), !e.has("opened")) return;
            const i = await t();
            this.opened ? (i && (this._ifrauContextInfo = await i.showBackdrop(), this._inIframe = !0), this._open()) : (i && (i.hideBackdrop(), this._ifrauContextInfo = null), this._close())
        }
        open() {
            if (!this.opened) return this.opened = !0, new Promise(t => {
                const e = function(i) {
                    i.target === this && (this.removeEventListener("d2l-dialog-close", e), t(i.detail.action))
                }.bind(this);
                this.addEventListener("d2l-dialog-close", e)
            })
        }
        resize() {
            return new Promise(t => {
                setTimeout(async () => {
                    await this._updateSize(), t()
                }, 0)
            })
        }
        async waitForUpdateComplete() {
            const t = () => !0,
                e = a(this, t);
            await Promise.all(e.map(e => b(e, t)))
        }
        _addHandlers() {
            window.addEventListener("resize", this._updateSize), this.addEventListener("touchstart", this._handleTouchStart), this.shadowRoot && this.shadowRoot.querySelector(".d2l-dialog-content").addEventListener("scroll", this._updateOverflow)
        }
        _close(t) {
            if (!this._state) return;
            if (this._action = t, o(this._dismissibleId), this._dismissibleId = null, this._isCloseAborted()) return void(this._dismissibleId = s(() => this._close($)));
            if (!this.shadowRoot) return;
            const e = this.shadowRoot.querySelector(".d2l-dialog-outer"),
                i = () => {
                    this._useNative ? e.close() : this._handleClose()
                };
            if (this._scroll = !1, k) this._state = "hiding", i();
            else {
                const t = () => {
                    e.removeEventListener("animationend", t), i()
                };
                e.addEventListener("animationend", t), this._state = "hiding"
            }
        }
        _findAutofocusElement(t) {
            if (this._useNative) return null;
            const e = t.querySelector("slot");
            if (!e) return null;
            const i = e.assignedElements({
                flatten: !0
            });
            let o = null;
            for (const t of i)
                if (o = t.hasAttribute("autofocus") ? t : t.querySelector("[autofocus]"), o) break;
            return o
        }
        _focusElemOrDescendant(t) {
            d(t, !1, !1) || (t = r(t)), t && t.focus()
        }
        _focusFirst() {
            if (!this.shadowRoot) return;
            const t = this._updateFocusableContentElemPresent();
            if (t && n(this.shadowRoot.querySelector(".d2l-dialog-inner"), t)) return void this._focusElemOrDescendant(t);
            const e = this.shadowRoot.querySelector("d2l-focus-trap");
            if (e) return void e.focus();
            const i = this.shadowRoot.querySelector(".d2l-dialog-header");
            if (i) {
                const t = h(i);
                t && this._focusElemOrDescendant(t)
            }
        }
        _focusInitial() {
            this._focusFirst()
        }
        async _focusOpener() {
            this._opener && this._opener.focus && requestAnimationFrame(() => {
                this._tryApplyFocus(this._opener), this._opener = null
            })
        }
        _getHeight() {
            if (!this.shadowRoot) return;
            const t = this._ifrauContextInfo ? this._ifrauContextInfo.availableHeight - this._margin.top - this._margin.bottom : window.innerHeight - this._margin.top - this._margin.bottom;
            let e = 3;
            if (this.fullHeight) e = 2 * this._width;
            else {
                const t = this.shadowRoot.querySelector(".d2l-dialog-header");
                t && (e += Math.ceil(t.getBoundingClientRect().height));
                const i = this.shadowRoot.querySelector(".d2l-dialog-content"),
                    o = this.shadowRoot.querySelector(".d2l-dialog-content > div");
                if (i && o) {
                    const t = o.offsetTop - i.offsetTop;
                    e += o.offsetHeight + t
                }
                const s = this.shadowRoot.querySelector(".d2l-dialog-footer");
                s && (e += Math.ceil(s.getBoundingClientRect().height))
            }
            const i = e > t;
            this._isFullHeight = !this._ifrauContextInfo && i;
            return i ? t : e
        }
        _getLeft() {
            if (this._useNative || !this._parentDialog) return 0;
            const t = this._parentDialog.getBoundingClientRect();
            return t.width > this._width ? 0 : (t.width - this._width) / 2
        }
        _getWidth() {
            const t = window.innerWidth - this._margin.left - this._margin.right;
            return this.width < t ? this.width : t
        }
        _handleClick(t) {
            if (!t.target.hasAttribute("data-dialog-action") && !t.target.hasAttribute("dialog-action")) return;
            const e = t.target.getAttribute("data-dialog-action") || t.target.getAttribute("dialog-action");
            t.stopPropagation(), this._close(e)
        }
        _handleClose() {
            this._removeHandlers(), this._focusOpener(), this._state = null, this.opened = !1, this._useNative && e(this), void 0 === this._action && (this._action = $), this.dispatchEvent(new CustomEvent("d2l-dialog-close", {
                bubbles: !0,
                composed: !0,
                detail: {
                    action: this._action
                }
            }))
        }
        _handleDialogClose(t) {
            this._nestedShowing = !1, t.stopPropagation()
        }
        _handleDialogOpen(t) {
            this._nestedShowing = !0, t.stopPropagation()
        }
        _handleFocusTrapEnter(t) {
            t.target === this && this._focusFirst()
        }
        _handleFullscreenWithin(t) {
            t.detail.state ? this._fullscreenWithin += 1 : this._fullscreenWithin -= 1
        }
        _handleKeyDown(t) {
            this.opened && 27 === t.keyCode && t.preventDefault()
        }
        _handleMvcDialogOpen() {
            this._useNative = !1
        }
        _handleTouchStart(t) {
            t.stopPropagation()
        }
        _isCloseAborted() {
            const t = new CustomEvent("d2l-dialog-before-close", {
                cancelable: !0,
                detail: {
                    action: this._action,
                    closeDialog: this._close.bind(this, this._action)
                }
            });
            return this.dispatchEvent(t), t.defaultPrevented
        }
        _open() {
            if (!this.opened) return;
            if (this._opener = c(), this._dismissibleId = s(() => {
                    this.opened && this._close($)
                }), this._action = void 0, this._addHandlers(), !this.shadowRoot) return;
            const t = this.shadowRoot.querySelector(".d2l-dialog-outer"),
                e = new Promise(e => {
                    const i = () => {
                        t.removeEventListener("animationend", i), e()
                    };
                    t.addEventListener("animationend", i)
                });
            this._useNative && t.showModal(), this._parentDialog = l(this, t => t.classList && t.classList.contains("d2l-dialog-outer")), this._useNative && i(this), this._focusInitial(), setTimeout(async () => {
                this.shadowRoot.querySelector(".d2l-dialog-content").scrollTop = 0, setTimeout(() => {
                    this._scroll = !0
                }, 0), await this._updateSize(), this._state = "showing", await this.updateComplete;
                const i = c();
                i && n(t, i) || requestAnimationFrame(() => this._focusInitial()), k ? await new Promise(t => requestAnimationFrame(t)) : await e, requestAnimationFrame(() => this._updateFocusableContentElemPresent()), await this.waitForUpdateComplete(), await this._updateSize(), this.dispatchEvent(new CustomEvent("d2l-dialog-open", {
                    bubbles: !0,
                    composed: !0
                }))
            }, 0)
        }
        _removeHandlers() {
            window.removeEventListener("resize", this._updateSize), this.removeEventListener("touchstart", this._handleTouchStart), this.shadowRoot && this.shadowRoot.querySelector(".d2l-dialog-content").removeEventListener("scroll", this._updateOverflow)
        }
        _render(t, e, i) {
            const o = {};
            this._width && (o.width = `${this._width}px`), this._autoSize ? (this._ifrauContextInfo && (o.top = `${this._top}px`), this._ifrauContextInfo && (o.bottom = "auto"), this._left && (o.left = `${this._left}px`), this._height && !this._isFullHeight && (o.height = `${this._height}px`), this._width ? o.width = `${this._width}px` : o.width = "auto") : i && this._ifrauContextInfo && (o.top = `${i}px`);
            const s = {
                "vdiff-target": !0,
                "d2l-dialog-outer": !0,
                "d2l-dialog-outer-full-height": this._autoSize && this._isFullHeight,
                "d2l-dialog-outer-overflow-bottom": this._overflowBottom,
                "d2l-dialog-outer-overflow-top": this._overflowTop,
                "d2l-dialog-outer-nested": !this._useNative && this._parentDialog,
                "d2l-dialog-outer-nested-showing": !this._useNative && this._nestedShowing,
                "d2l-dialog-outer-scroll": this._scroll,
                "d2l-dialog-fullscreen-mobile": e.fullscreenMobile,
                "d2l-dialog-fullscreen-within": 0 !== this._fullscreenWithin
            };
            return _ `${this._useNative?_`<dialog
				aria-describedby="${w(e.descId)}"
				aria-labelledby="${e.labelId}"
				class="${g(s)}"
				@click="${this._handleClick}"
				@close="${this._handleClose}"
				@d2l-fullscreen-within="${this._handleFullscreenWithin}"
				id="${this._dialogId}"
				@keydown="${this._handleKeyDown}"
				role="${e.role}"
				style=${v(o)}>
					${t}
				</dialog>`:_`<div
				aria-describedby="${w(e.descId)}"
				aria-labelledby="${e.labelId}"
				class="${g(s)}"
				@click="${this._handleClick}"
				@d2l-dialog-close="${this._handleDialogClose}"
				@d2l-dialog-open="${this._handleDialogOpen}"
				@d2l-fullscreen-within="${this._handleFullscreenWithin}"
				id="${this._dialogId}"
				role="${e.role}"
				style=${v(o)}>
					<d2l-focus-trap
						@d2l-focus-trap-enter="${this._handleFocusTrapEnter}"
						?trap="${this.opened}">${t}</d2l-focus-trap>
				</div>
				<d2l-backdrop for-target="${this._dialogId}" ?shown="${"showing"===this._state}"></d2l-backdrop>`}
		`
        }
        _tryApplyFocus(t) {
            const e = u(t);
            e && e.focus()
        }
        _updateFocusableContentElemPresent() {
            const t = this.shadowRoot ? .querySelector(".d2l-dialog-content");
            if (!t) return null;
            const e = this._findAutofocusElement(t) ? ? h(t);
            return n(t, e) && (this.focusableContentElemPresent = !0), e
        }
        _updateOverflow() {
            if (!this.shadowRoot) return;
            const t = this.shadowRoot.querySelector(".d2l-dialog-content"),
                e = t.scrollHeight - (Math.ceil(t.scrollTop) + t.clientHeight);
            this._overflowTop = t.scrollTop > 0, this._overflowBottom = e > 0
        }
        async _updateSize() {
            this._autoSize ? (this._ifrauContextInfo && (this._ifrauContextInfo.top > I ? (this._top = 0, this._margin.top = 0) : this._ifrauContextInfo.top < 0 ? (this._top = I - this._ifrauContextInfo.top, this._margin.top = I) : (this._top = I - this._ifrauContextInfo.top, this._margin.top = I - this._ifrauContextInfo.top)), this._width = this._getWidth(), this._left = this._getLeft(), await this.updateComplete, this._height = this._getHeight(), await this.updateComplete) : this._width = 0, await new Promise(t => {
                requestAnimationFrame(async () => {
                    this._updateOverflow(), await this.updateComplete, t()
                })
            })
        }
    },
    R = m `

	:host {
		display: none;
	}

	:host([opened]), :host([_state="showing"]), :host([_state="hiding"]) {
		display: block;
	}

	:host([opened]:not([_state="showing"])) {
		visibility: hidden;
	}

	:host([opened][_state="showing"]),
	:host([opened][_state="hiding"]) {
		visibility: visible;
	}

	.d2l-dialog-outer {
		animation: d2l-dialog-close 200ms ease-in;
		background-color: white;
		border: 1px solid var(--d2l-color-mica);
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		position: fixed; /* also required for native to override position: absolute */
		top: 75px;
	}

	:host([_state="showing"]) > .d2l-dialog-outer {
		/* must target direct child to avoid ancestor from interfering with closing child dialogs in Legacy-Edge */
		animation: d2l-dialog-open 200ms ease-out;
	}

	@keyframes d2l-dialog-close {
		0% { opacity: 1; transform: translateY(0); }
		100% { opacity: 0; transform: translateY(-50px); }
	}

	@keyframes d2l-dialog-open {
		0% { opacity: 0; transform: translateY(-50px); }
		100% { opacity: 1; transform: translateY(0); }
	}

	.d2l-dialog-outer.d2l-dialog-outer-full-height {
		bottom: 1.5rem;
		top: 1.5rem;
	}

	.d2l-dialog-outer.d2l-dialog-outer-nested-showing {
		border-color: rgba(205, 213, 220, 0.35);
		box-shadow: none;
	}

	div.d2l-dialog-outer {
		left: 0;
		margin: auto;
		right: 0;
		width: 300px;
		z-index: 1000;
	}

	dialog.d2l-dialog-outer {
		color: var(--d2l-color-ferrite);
		margin-bottom: 0; /* required to override Chrome native positioning */
		margin-top: 0; /* required to override Chrome native positioning */
		padding: 0;
	}

	dialog::backdrop {
		/* cannot use variables inside of ::backdrop : https://github.com/whatwg/fullscreen/issues/124 */
		background-color: #f9fbff;
		opacity: 0;
		transition: opacity 200ms ease-in;
	}

	:host([_state="showing"]) dialog::backdrop {
		opacity: 0.7;
		transition-timing-function: ease-out;
	}

	d2l-focus-trap {
		display: block;
		height: 100%;
	}

	.d2l-dialog-inner {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	:host([critical]) .d2l-dialog-header {
		border-block-start: 0.4rem solid var(--d2l-color-cinnabar);
		border-start-end-radius: 0.4rem;
		border-start-start-radius: 0.4rem;
		margin-block: -1px 0;
		margin-inline: -1px;
		padding: 1rem 31px 23px 31px;
	}

	.d2l-dialog-header {
		box-sizing: border-box;
		flex: none;
		padding: 19px 30px 23px 30px;
		position: relative; /* stack header overflow shadow on top of content */
		z-index: 1; /* stack header overflow shadow on top of content */
	}

	.d2l-dialog-outer.d2l-dialog-outer-overflow-top .d2l-dialog-header {
		box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.05);
	}

	.d2l-dialog-header > div {
		display: flex;
	}

	.d2l-dialog-header > div > h2 {
		flex: 1 0 0;
		margin: 0;
	}

	.d2l-dialog-content {
		--d2l-list-controls-padding: 30px;
		box-sizing: border-box;
		flex: 1 0 0;
		overflow: hidden; /* scrollbar is kept hidden while we update the scroll position to avoid scrollbar flash */
		padding: 0 30px;
	}
	${p(".d2l-dialog-content",{extraStyles:m`--d2l-focus-ring-offset: -2px; border-radius: 6px;`})}
	.d2l-dialog-content > div {
		position: relative; /* make this the positioned parent for absolute positioned elements like d2l-template-primary-secondary */
	}

	:host([full-height]) .d2l-dialog-content > div {
		box-sizing: border-box;
		height: 100%;
	}

	:host(:not([no-content-scroll])) .d2l-dialog-outer-scroll .d2l-dialog-content {
		overflow: auto;
	}

	.d2l-dialog-footer {
		box-sizing: border-box;
		flex: none;
		padding: 18px 30px 0 30px; /* 18px margin below footer children */
		position: relative; /* stack footer overflow shadow on top of content */
	}

	.d2l-dialog-outer.d2l-dialog-outer-overflow-bottom .d2l-dialog-footer {
		box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.05);
	}

	.d2l-dialog-footer ::slotted(*) {
		margin-block-end: 18px;
		margin-inline-end: 18px;
	}

	dialog.d2l-dialog-outer.d2l-dialog-fullscreen-within,
	div.d2l-dialog-outer.d2l-dialog-fullscreen-within {
		border: none;
		border-radius: 0;
		box-shadow: none;
		height: 100% !important;
		max-height: initial; /* required to override Chrome native positioning */
		max-width: initial; /* required to override Chrome native positioning */
		top: 0;
		width: 100% !important;
	}

	@media (max-width: 615px), (max-height: 420px) and (max-width: 900px) {

		.d2l-dialog-header {
			padding: 14px 20px 16px 20px;
		}
		.d2l-dialog-fullscreen-mobile .d2l-dialog-header > div > d2l-button-icon {
			margin-block: -8px 0;
			margin-inline: 15px -13px;
		}
		.d2l-dialog-content {
			--d2l-list-controls-padding: 20px;
			padding: 0 20px;
		}
		.d2l-dialog-footer {
			padding: 18px 20px 0 20px;
		}
		.d2l-dialog-outer.d2l-dialog-fullscreen-mobile {
			margin: 0 !important;
			min-width: calc(var(--d2l-vw, 1vw) * 100);
			top: 5%;
		}
		:host(:not([in-iframe])) dialog.d2l-dialog-outer.d2l-dialog-fullscreen-mobile,
		:host(:not([in-iframe])) div.d2l-dialog-outer.d2l-dialog-fullscreen-mobile {
			height: calc(var(--d2l-vh, 1vh) * 95);
			min-height: calc(var(--d2l-vh, 1vh) * 95);
		}

	}

	@media (prefers-reduced-motion: reduce) {
		.d2l-dialog-outer,
		:host([_state="showing"]) > .d2l-dialog-outer {
			animation: none;
		}
		dialog::backdrop {
			transition: none;
		}
	}
`;
export {
    z as D, R as d
};