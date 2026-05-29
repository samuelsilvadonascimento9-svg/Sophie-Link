import "./colors.js";
import {
    c as l,
    g as o
} from "./navigation-styles.js";
import {
    a as t,
    i as e,
    b as a
} from "./lit-element.js";
import "./svg-to-css.js";
customElements.define("d2l-labs-navigation-band", class extends t {
    static get styles() {
        return [l, o, e `
			:host {
				background: linear-gradient(180deg, var(--d2l-branding-primary-color, var(--d2l-color-celestine)) 1.5rem, #ffffff 0%);
				display: block;
				min-height: 4px;
				position: relative; /* Needed for Firefox */
			}
			:host([hidden]) {
				display: none;
			}

			.d2l-labs-navigation-scroll {
				overflow-x: auto;
				overflow-y: hidden;
				scroll-behavior: smooth;
			}

			.d2l-labs-navigation-scroll[data-custom-scroll] {
				/* Firefox Styles */
				scrollbar-color: var(--d2l-color-galena) var(--d2l-color-sylvite);
				scrollbar-width: thin;
			}
			/* Webkit Styles */
			.d2l-labs-navigation-scroll[data-custom-scroll]::-webkit-scrollbar {
				background-color: var(--d2l-color-sylvite);
				border-radius: 8px;
				height: 9px;
			}
			.d2l-labs-navigation-scroll[data-custom-scroll]::-webkit-scrollbar-thumb {
				background-color: var(--d2l-color-galena);
				border-bottom: 1px solid var(--d2l-color-sylvite);
				border-radius: 8px;
				border-top: 1px solid var(--d2l-color-sylvite);
			}
			/* Faded edges styles */
			.d2l-labs-navigation-scroll-before,
			.d2l-labs-navigation-scroll-after {
				height: 100%;
				max-height: 1.5rem; /* should match linear-background height */
				pointer-events: none;
				position: absolute;
				top: 0;
				width: 2.439%; /* should match gutter width */
				z-index: 2;
			}
			.d2l-labs-navigation-scroll-before {
				background: linear-gradient(to right, var(--d2l-branding-primary-color, var(--d2l-color-celestine)), transparent);
				left: 0;
			}
			.d2l-labs-navigation-scroll-after {
				background: linear-gradient(to left, var(--d2l-branding-primary-color, var(--d2l-color-celestine)), transparent);
				right: 0;
			}
			/* Styles to ensure the right padding is respected when scrolling */
			.d2l-labs-navigation-centerer {
				line-height: 0;
				position: relative;
			}
			.d2l-labs-navigation-gutters {
				display: inline-block;
				position: unset;
				vertical-align: top;
			}
			@media (max-width: 615px) {
				.d2l-labs-navigation-scroll-before,
				.d2l-labs-navigation-scroll-after {
					width: 15px;
				}
			}
			@media (min-width: 1230px) {
				.d2l-labs-navigation-scroll-before,
				.d2l-labs-navigation-scroll-after {
					width: 30px;
				}
			}
		`]
    }
    constructor() {
        super(), this._customScroll = function() {
            const l = navigator.userAgent.toLowerCase();
            return l.indexOf("win") > -1 && -1 === l.indexOf("mobile")
        }()
    }
    connectedCallback() {
        super.connectedCallback(), this.addEventListener("d2l-navigation-band-slot-scroll-request", this._handleScrollRequest)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.removeEventListener("d2l-navigation-band-slot-scroll-request", this._handleScrollRequest)
    }
    render() {
        return a `
			<div class="d2l-labs-navigation-centerer">
				<div class="d2l-labs-navigation-scroll" ?data-custom-scroll="${this._customScroll}">
					<div class="d2l-labs-navigation-scroll-before"></div>
					<div class="d2l-labs-navigation-scroll-after"></div>
					<div class="d2l-labs-navigation-gutters">
						<slot></slot>
					</div>
				</div>
			</div>
		`
    }
    _handleScrollRequest(l) {
        l.stopPropagation();
        if ("rtl" === (document.documentElement.getAttribute("dir") || "ltr").toLowerCase()) return;
        const o = this.shadowRoot.querySelector(".d2l-labs-navigation-scroll");
        requestAnimationFrame(() => {
            o.scrollLeft = l.detail.pointToCenter - .5 * o.offsetWidth
        })
    }
});