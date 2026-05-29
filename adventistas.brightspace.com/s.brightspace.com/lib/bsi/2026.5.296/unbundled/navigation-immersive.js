import "./colors.js";
import "./navigation.js";
import "./navigation-link-back.js";
import {
    a as i,
    i as e,
    b as t
} from "./lit-element.js";
import {
    b as s
} from "./styles.js";
import {
    e as a
} from "./class-map.js";
import {
    n
} from "./navigation-shared-styles.js";
import {
    o as r
} from "./style-map.js";
import "./svg-to-css.js";
import "./navigation-band.js";
import "./navigation-styles.js";
import "./navigation-skip.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./property-required-mixin.js";
import "./dom.js";
import "./localize-labs-element.js";
import "./localize-mixin.js";
import "./_rollupPluginBabelHelpers.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./if-defined.js";
import "./focus.js";
import "./navigation-link-icon.js";
import "./icon.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./tooltip.js";
import "./announce.js";
import "./uniqueId.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
const l = window.matchMedia("(max-width: 615px)");
customElements.define("d2l-labs-navigation-immersive", class extends i {
    static get properties() {
        return {
            allowOverflow: {
                attribute: "allow-overflow",
                type: Boolean,
                reflect: !0
            },
            backLinkHref: {
                attribute: "back-link-href",
                type: String
            },
            backLinkText: {
                attribute: "back-link-text",
                type: String
            },
            backLinkTextShort: {
                attribute: "back-link-text-short",
                type: String
            },
            widthType: {
                attribute: "width-type",
                type: String,
                reflect: !0
            },
            _dynamicSpacingHeight: {
                state: !0
            },
            _middleHidden: {
                state: !0
            },
            _middleNoRightBorder: {
                state: !0
            },
            _smallWidth: {
                state: !0
            }
        }
    }
    static get styles() {
        return [s, n, e `
			:host {
				--d2l-labs-navigation-immersive-height-main: 3.1rem;
				--d2l-labs-navigation-immersive-height-responsive: 2.8rem;
			}
			.d2l-navigiation-immersive-fixed {
				background-color: white;
				left: 0;
				position: fixed;
				right: 0;
				top: 0;
				z-index: 2; /* higher than skeletons which could scroll behind immersive nav */
			}
			d2l-labs-navigation {
				border-bottom: 1px solid var(--d2l-color-mica);
			}
			.d2l-labs-navigation-immersive-margin {
				display: flex;
				justify-content: center;
				margin: 0 30px;
			}

			.d2l-labs-navigation-immersive-container {
				display: flex;
				height: var(--d2l-labs-navigation-immersive-height-main);
				justify-content: space-between;
				margin: 0 -7px;
				max-width: 100%;
				overflow: hidden;
				width: 100%;
			}

			:host([width-type="normal"]) .d2l-labs-navigation-immersive-container {
				max-width: 1230px;
			}

			:host([allow-overflow]) .d2l-labs-navigation-immersive-container {
				overflow: visible;
			}

			.d2l-labs-navigation-immersive-left ::slotted(*),
			.d2l-labs-navigation-immersive-middle ::slotted(*),
			.d2l-labs-navigation-immersive-right ::slotted(*) {
				height: var(--d2l-labs-navigation-immersive-height-main);
			}

			.d2l-labs-navigation-immersive-left {
				color: var(--d2l-color-tungsten);
				letter-spacing: 0.2px;
				padding-left: 7px;
			}

			.d2l-labs-navigation-immersive-right {
				padding-right: 7px;
			}

			.d2l-labs-navigation-immersive-left,
			.d2l-labs-navigation-immersive-right {
				flex: 0 0 auto;
			}

			.d2l-labs-navigation-immersive-middle {
				border-inline-end: 1px solid var(--d2l-color-gypsum);
				border-inline-start: 1px solid var(--d2l-color-gypsum);
				flex: 0 1 auto;
				margin: 0 24px;
				min-width: 0;
				padding: 0 24px;
				width: 100%;
			}

			.d2l-labs-navigation-immersive-middle.d2l-labs-navigation-immersive-middle-no-right-border {
				border-inline-end: none;
			}

			div.d2l-labs-navigation-immersive-middle-observer,
			div.d2l-labs-navigation-immersive-right-observer {
				height: auto;
			}

			.d2l-labs-navigation-immersive-middle-hidden {
				visibility: hidden;
			}

			.d2l-labs-navigation-immersive-spacing {
				position: unset;
			}

			@media (max-width: 929px) {
				.d2l-labs-navigation-immersive-margin {
					margin: 0 24px;
				}
			}

			@media (max-width: 767px) {
				.d2l-labs-navigation-immersive-margin {
					margin: 0 18px;
				}
			}

			@media (max-width: 615px) {
				.d2l-labs-navigation-immersive-container {
					height: var(--d2l-labs-navigation-immersive-height-responsive);
				}
				.d2l-labs-navigation-immersive-left ::slotted(*),
				.d2l-labs-navigation-immersive-middle ::slotted(*),
				.d2l-labs-navigation-immersive-right ::slotted(*) {
					height: var(--d2l-labs-navigation-immersive-height-responsive);
				}
				.d2l-labs-navigation-immersive-spacing {
					height: calc(var(--d2l-labs-navigation-immersive-height-responsive) + 5px);
				}
				.d2l-labs-navigation-immersive-middle {
					margin: 0 18px;
					padding: 0 18px;
				}
			}
		`]
    }
    constructor() {
        super(), this._handlePageResize = this._handlePageResize.bind(this), this._middleHidden = !1, this._middleNoRightBorder = !0, this._middleObserver = new ResizeObserver(this._onMiddleResize.bind(this)), this._rightObserver = new ResizeObserver(this._onRightResize.bind(this)), this._navigationObserver = new ResizeObserver(this._onNavigationResize.bind(this)), this._smallWidth = !1, this._dynamicSpacingHeight = void 0
    }
    connectedCallback() {
        super.connectedCallback(), this._startObserving(), l.addEventListener && l.addEventListener("change", this._handlePageResize)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._middleObserver ? .disconnect(), this._rightObserver ? .disconnect(), this._navigationObserver ? .disconnect(), l.removeEventListener ? .("change", this._handlePageResize)
    }
    firstUpdated(i) {
        super.firstUpdated(i), this._startObserving(), this._smallWidth = l.matches
    }
    render() {
        const i = {
                "d2l-labs-navigation-immersive-middle": !0,
                "d2l-labs-navigation-immersive-middle-hidden": this._middleHidden,
                "d2l-labs-navigation-immersive-middle-no-right-border": this._middleNoRightBorder
            },
            e = this._smallWidth && this.backLinkTextShort || this.backLinkText,
            s = {
                height: this._dynamicSpacingHeight ? `${this._dynamicSpacingHeight}px` : void 0
            };
        return t `
			<div class="d2l-navigiation-immersive-fixed">
				<d2l-labs-navigation>
					<div class="d2l-labs-navigation-immersive-margin">
						<div class="d2l-labs-navigation-immersive-container">
							<div class="d2l-labs-navigation-immersive-left d2l-body-compact">
								<slot name="left">
									<d2l-labs-navigation-link-back text="${e}" href="${this.backLinkHref}" @click="${this._handleBackClick}"></d2l-labs-navigation-link-back>
								</slot>
							</div>
							<div class="${a(i)}">
								<div class="d2l-labs-navigation-immersive-middle-observer">
									<slot name="middle"></slot>
								</div>
							</div>
							<div class="d2l-labs-navigation-immersive-right"><div class="d2l-labs-navigation-immersive-right-observer"><slot name="right"></slot></div></div>
						</div>
					</div>
				</d2l-labs-navigation>
			</div>
			<div class="d2l-labs-navigation-immersive-spacing" style="${r(s)}"></div>
		`
    }
    _handleBackClick() {
        this.dispatchEvent(new CustomEvent("d2l-labs-navigation-immersive-back-click", {
            bubbles: !1,
            composed: !1
        }))
    }
    _handlePageResize(i) {
        this._smallWidth = i.matches
    }
    _onMiddleResize(i) {
        i && 0 !== i.length && (this._middleHidden = i[0].contentRect.height < 1)
    }
    _onNavigationResize(i) {
        if (!i || 0 === i.length) return;
        const e = i[0].contentRect.height;
        e && (this._dynamicSpacingHeight = e)
    }
    _onRightResize(i) {
        i && 0 !== i.length && (this._middleNoRightBorder = i[0].contentRect.height < 1)
    }
    _startObserving() {
        const i = this.shadowRoot ? .querySelector(".d2l-labs-navigation-immersive-middle-observer");
        i && this._middleObserver.observe(i);
        const e = this.shadowRoot ? .querySelector(".d2l-labs-navigation-immersive-right-observer");
        e && this._rightObserver.observe(e);
        const t = this.shadowRoot ? .querySelector(".d2l-navigiation-immersive-fixed");
        t && this._navigationObserver.observe(t)
    }
});