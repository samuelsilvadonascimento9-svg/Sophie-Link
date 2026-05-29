import {
    i as e,
    b as t,
    r as s,
    a as o
} from "./lit-element.js";
import {
    b as i,
    a as n
} from "./focus.js";
import {
    e as l
} from "./class-map.js";
import {
    o as d
} from "./overflow.js";
import {
    _ as r,
    b as a,
    a as c,
    d as h,
    c as p
} from "./_rollupPluginBabelHelpers.js";
import "./colors.js";
import {
    S as b
} from "./skeleton-mixin.js";
const u = 13,
    m = 32,
    f = s => {
        var o, i;
        return o = new WeakMap, i = new WeakSet, class extends(b(s)) {
            static get properties() {
                return {
                    hidden: {
                        type: Boolean,
                        reflect: !0
                    },
                    selected: {
                        type: Boolean,
                        reflect: !0
                    },
                    role: {
                        type: String,
                        reflect: !0
                    },
                    tabIndex: {
                        type: Number,
                        reflect: !0,
                        attribute: "tabindex"
                    },
                    _clicked: {
                        type: Boolean,
                        reflect: !0
                    }
                }
            }
            static get styles() {
                const t = [e `
			:host {
				box-sizing: border-box;
				display: inline-block;
				max-width: 200px;
				outline: none;
				position: relative;
				vertical-align: middle;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-tab-content {
				margin: 0.5rem;
			}
			:host(:first-child) .d2l-tab-content {
				margin-inline-start: 0;
			}
			.d2l-tab-selected-indicator {
				border-top: 4px solid var(--d2l-theme-brand-color-primary-default);
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				bottom: 0;
				display: none;
				margin: 1px 0.6rem 0 0.6rem;
				position: absolute;
				transition: box-shadow 0.2s;
				width: calc(100% - 1.2rem);
			}
			:host(:first-child) .d2l-tab-selected-indicator {
				margin-inline-start: 0;
				width: calc(100% - 0.6rem);
			}
			:host([selected]:focus) {
				text-decoration: none;
			}
			:host(:hover) {
				color: var(--d2l-theme-text-color-interactive-default);
				cursor: pointer;
			}
			:host([_clicked]) {
				color: var(--d2l-theme-text-color-interactive-default);
			}
			:host([selected]:hover) {
				color: inherit;
				cursor: default;
			}
			:host([selected]) .d2l-tab-selected-indicator {
				display: block;
			}
			:host([skeleton]) .d2l-tab-selected-indicator {
				position: absolute !important; /* make sure skeleton styles do not override this */
			}

		`];
                return super.styles && t.unshift(super.styles), t
            }
            constructor() {
                super(), r(this, i), a(this, o, !1), this.hidden = !1, this.role = "tab", this.selected = !1, this.tabIndex = -1, this._clicked = !1
            }
            firstUpdated(e) {
                super.firstUpdated(e), this.addEventListener("click", c(i, this, n)), this.addEventListener("keydown", c(i, this, l)), this.addEventListener("keyup", c(i, this, d)), h(o, this, !0)
            }
            render() {
                return t `
			<div class="d2l-skeletize d2l-tab-content">${this.renderContent()}</div>
			<div class="d2l-tab-selected-indicator d2l-skeletize-container"></div>
		`
            }
            update(e) {
                if (super.update(e), e.has("selected")) {
                    if (this.ariaSelected = `${this.selected}`, !p(o, this)) return;
                    this.selected ? this.dispatchEvent(new CustomEvent("d2l-tab-selected", {
                        bubbles: !0,
                        composed: !0
                    })) : this.dispatchEvent(new CustomEvent("d2l-tab-deselected", {
                        bubbles: !0
                    }))
                }
                e.has("hidden") && void 0 !== e.get("hidden") && this.dispatchEvent(new CustomEvent("d2l-tab-hidden-change", {
                    bubbles: !0
                }))
            }
            dispatchContentChangeEvent() {
                this.dispatchEvent(new CustomEvent("d2l-tab-content-change", {
                    bubbles: !0,
                    composed: !0
                }))
            }
            renderContent() {
                return console.warn("Subclasses to implement/override renderContent"), t `<div>Default Tab Content</div>`
            }
        };

        function n() {
            if (this.selected) return;
            this._clicked = !0;
            const e = new CustomEvent("d2l-tab-before-selected", {
                detail: {
                    select: () => {
                        this.selected = !0, this._clicked = !1
                    },
                    reset: () => this._clicked = !1
                },
                cancelable: !0,
                bubbles: !0,
                composed: !0
            });
            this.dispatchEvent(e), e.defaultPrevented || (this.selected = !0, this._clicked = !1)
        }

        function l(e) {
            e.keyCode !== m && e.keyCode !== u || (e.stopPropagation(), e.preventDefault())
        }

        function d(e) {
            e.keyCode !== m && e.keyCode !== u || c(i, this, n).call(this)
        }
    },
    v = i(e => `:host(:${e}) .d2l-tab-text-inner-content`, {
        extraStyles: e `border-radius: 0.3rem; color: var(--d2l-theme-text-color-interactive-default);`
    });
class x extends(f(o)) {
    static get properties() {
        return {
            text: {
                type: String
            }
        }
    }
    static get styles() {
        const t = [e `
			.d2l-tab-text-inner-content {
				--d2l-focus-ring-offset: 0;
				display: flex;
				padding: 0.1rem;
			}
			${v}
			:host(:${s(n())}) ::slotted(d2l-icon) {
				color: var(--d2l-theme-text-color-interactive-default);
			}
			slot {
				align-items: center;
				display: flex;
			}
			::slotted([slot="before"]) {
				padding-inline-end: 0.3rem;
			}
			::slotted([slot="after"]) {
				padding-inline-start: 0.3rem;
			}
			:host(:not([selected]):hover) ::slotted(d2l-icon) {
				color: var(--d2l-theme-text-color-interactive-default);
			}
			span {
				${d}
			}
			.d2l-tab-text-skeletize-override {
				min-width: 50px;
			}
			:host([skeleton]) .d2l-tab-content.d2l-skeletize::before {
				inset-block: 0.15rem;
			}

			/**
			 * Only allow d2l-icon, d2l-count-badge, and d2l-icon-custom in the before/after slots
			 * Only show the first item in the before slot and the last item in the after slot
			 */
			::slotted([slot]:not(d2l-icon):not(d2l-count-badge):not(d2l-icon-custom)),
			::slotted([slot="before"]:not(:first-child)),
			::slotted([slot="after"]:not(:last-child)) {
				display: none;
			}
		`];
        return super.styles && t.unshift(super.styles), t
    }
    updated(e) {
        super.updated(e), e.has("text") && (this.dispatchContentChangeEvent(), this.title = this.text)
    }
    renderContent() {
        const e = this.skeleton && (!this.text || 0 === this.text.length);
        return t `
			<div class="d2l-tab-text-inner-content">
				<slot name="before"></slot>
				<span class="${l({"d2l-tab-text":!0,"d2l-tab-text-skeletize-override":e})}">${e?t`&nbsp;`:this.text}</span>
				<slot name="after"></slot>
			</div>
		`
    }
}
customElements.define("d2l-tab", x);