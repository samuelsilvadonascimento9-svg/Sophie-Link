import "./button-icon.js";
import "./loading-spinner.js";
import {
    e as t,
    f as e,
    _ as i
} from "./styles.js";
import {
    A as o,
    a
} from "./async-container-mixin.js";
import {
    a as n,
    i as s,
    b as d
} from "./lit-element.js";
import {
    e as l
} from "./class-map.js";
import {
    D as r,
    d as h
} from "./dialog-styles.js";
import {
    g as m
} from "./uniqueId.js";
import {
    o as c
} from "./if-defined.js";
import {
    L as p
} from "./localize-core-element.js";
import {
    P as g
} from "./property-required-mixin.js";
import {
    o as u
} from "./style-map.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./tooltip.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./visible-on-ancestor-mixin.js";
import "./button-styles.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
import "./waitForElem.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
const f = window.matchMedia("(max-width: 615px), (max-height: 420px) and (max-width: 900px)");
class x extends(g(p(o(r(n))))) {
    static get properties() {
        return {
            async: {
                type: Boolean
            },
            noPadding: {
                type: Boolean,
                reflect: !0,
                attribute: "no-padding"
            },
            titleText: {
                type: String,
                attribute: "title-text",
                required: !0
            },
            width: {
                type: Number
            },
            _autoSize: {
                state: !0
            },
            _hasFooterContent: {
                state: !0
            },
            _icon: {
                state: !0
            },
            _headerStyle: {
                state: !0
            }
        }
    }
    static get styles() {
        return [i(":host"), h, t, e, s `

			.d2l-dialog-footer.d2l-footer-no-content {
				display: none;
			}

			.d2l-dialog-content-loading {
				text-align: center;
			}

			.d2l-dialog-outer {
				max-width: calc(100% - 3rem);
			}

			:host([no-padding]) .d2l-dialog-content {
				--d2l-list-controls-padding: 0px; /* stylelint-disable-line length-zero-no-unit */
				padding: 0;
			}

			@media (min-width: 616px) {

				.d2l-dialog-header {
					border-bottom: 1px solid var(--d2l-color-gypsum);
					padding-bottom: 0.9rem;
					padding-top: 1rem;
				}

				.d2l-dialog-content > div {
					/* required to properly calculate preferred height when there are bottom
					margins at the end of the slotted content */
					border-bottom: 1px solid transparent;
					box-sizing: border-box;
					height: calc(100% - 1rem);
					padding-top: 1rem;
				}

				:host([no-padding]) .d2l-dialog-content > div {
					height: 100%;
					padding-top: 0;
				}

				.d2l-dialog-header > div > d2l-button-icon {
					flex: none;
					margin-block: -2px 0;
					margin-inline: 0 -12px;
				}

				dialog.d2l-dialog-outer,
				div.d2l-dialog-outer {
					animation: d2l-dialog-fullscreen-close 200ms ease-in;
					border-radius: 8px;
					margin: 1.5rem;
					top: 0;
					width: auto;
				}

				@keyframes d2l-dialog-fullscreen-close {
					0% { opacity: 1; transform: translateY(0); }
					100% { opacity: 0; transform: translateY(-50px) scale(0.97); }
				}

				@keyframes d2l-dialog-fullscreen-open {
					0% { opacity: 0; transform: translateY(-50px) scale(0.97); }
					100% { opacity: 1; transform: translateY(0); }
				}

				dialog.d2l-dialog-outer.d2l-dialog-fullscreen-within,
				div.d2l-dialog-outer.d2l-dialog-fullscreen-within {
					/* no margins when there is a fullscreen element within */
					margin: 0;
				}

				:host(:not([in-iframe])) dialog.d2l-dialog-outer,
				:host(:not([in-iframe])) div.d2l-dialog-outer {
					height: calc(100% - 3rem);
				}

				/* for screens wider than 1170px + 60px margins */
				@media (min-width: 1230px) {
					dialog.d2l-dialog-outer,
					div.d2l-dialog-outer {
						/* center the dialog */
						margin-left: auto;
						margin-right: auto;
					}
				}

				:host([_state="showing"]) dialog.d2l-dialog-outer,
				:host([_state="showing"]) div.d2l-dialog-outer {
					animation: d2l-dialog-fullscreen-open 400ms ease-out;
				}

				:host([_state="showing"]) dialog::backdrop {
					transition-duration: 400ms;
				}

				.d2l-dialog-footer {
					border-top: 1px solid var(--d2l-color-gypsum);
					padding-bottom: 0; /* 0.9rem padding included on button */
					padding-top: 0.9rem;
				}

				@media (prefers-reduced-motion: reduce) {

					dialog.d2l-dialog-outer,
					div.d2l-dialog-outer,
					:host([_state="showing"]) dialog.d2l-dialog-outer,
					:host([_state="showing"]) div.d2l-dialog-outer {
						animation: none;
					}

					dialog::backdrop {
						transition: none;
					}
				}
			}

			@media (max-width: 615px), (max-height: 420px) and (max-width: 900px) {

				.d2l-dialog-header {
					padding-bottom: 15px;
				}

				.d2l-dialog-footer.d2l-footer-no-content {
					padding: 0 0 5px 0;
				}

				.d2l-dialog-content > div {
					/* required to properly calculate preferred height when there are bottom
					margins at the end of the slotted content */
					border-bottom: 1px solid transparent;
					/* required to render full height in an i-Frame */
					height: calc(100% - 1px);
				}

			}
		`]
    }
    constructor() {
        super(), this.async = !1, this.noPadding = !1, this._autoSize = !1, this._hasFooterContent = !1, this._icon = "tier1:close-large-thick", this._headerStyle = "d2l-heading-2", this._handleResize = this._handleResize.bind(this), this._handleResize(), this.width = 1170, this._titleId = m()
    }
    get asyncContainerCustom() {
        return !0
    }
    connectedCallback() {
        super.connectedCallback(), f.addEventListener && f.addEventListener("change", this._handleResize)
    }
    disconnectedCallback() {
        f.removeEventListener && f.removeEventListener("change", this._handleResize), super.disconnectedCallback()
    }
    render() {
        const t = {};
        let e = null;
        if (this._ifrauContextInfo) {
            t.height = f.matches ? this._ifrauContextInfo.availableHeight - 42 + "px" : this._ifrauContextInfo.availableHeight - 60 + "px", t.minHeight = t.height;
            e = (this._ifrauContextInfo.top < 0 ? -this._ifrauContextInfo.top : 0) + (f.matches ? 42 : 0)
        }
        let i = null;
        const o = {};
        this.async && this.asyncState !== a.complete && (o.display = "none", i = d `
				<div class="d2l-dialog-content-loading">
					<d2l-loading-spinner size="100"></d2l-loading-spinner>
				</div>
			`);
        const n = {
                "d2l-dialog-footer": !0,
                "d2l-footer-no-content": !this._hasFooterContent
            },
            s = d `
			${i}
			<div style=${u(o)}><slot @slotchange="${this._handleSlotChange}"></slot></div>
		`,
            r = this.focusableContentElemPresent ? void 0 : "0",
            h = d `
			<div class="d2l-dialog-inner" style=${u(t)}>
				<div class="d2l-dialog-header">
					<div>
						<h2 id="${this._titleId}" class="${this._headerStyle}">${this.titleText}</h2>
						<d2l-button-icon icon="${this._icon}" text="${this.localize("components.dialog.close")}" @click="${this._abort}"></d2l-button-icon>
					</div>
				</div>
				<div class="d2l-dialog-content" @pending-state="${this._handleAsyncItemState}" tabindex="${c(r)}">${s}</div>
				<div class="${l(n)}">
					<slot name="footer" @slotchange="${this._handleFooterSlotChange}"></slot>
				</div>
			</div>
		`;
        return this._render(h, {
            fullscreenMobile: !0,
            labelId: this._titleId,
            role: "dialog"
        }, e)
    }
    updated(t) {
        super.updated(t), t.has("asyncState") && this.asyncState === a.complete && this.resize()
    }
    willUpdate(t) {
        super.willUpdate(t), this._width = Math.max(1170, this.width)
    }
    _abort() {
        this._close("abort")
    }
    _handleFooterSlotChange(t) {
        const e = t.target.assignedNodes({
            flatten: !0
        });
        this._hasFooterContent = e && e.length > 0
    }
    _handleResize() {
        this._icon = f.matches ? "tier1:close-small" : "tier1:close-large-thick", this._headerStyle = f.matches ? "d2l-heading-3" : "d2l-heading-2"
    }
    _handleSlotChange() {
        requestAnimationFrame(() => this._updateFocusableContentElemPresent())
    }
}
customElements.define("d2l-dialog-fullscreen", x);