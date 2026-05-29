import "./button-icon.js";
import "./button-subtle.js";
import "./colors.js";
import {
    b as t,
    a as e
} from "./styles.js";
import {
    i as o,
    b as i,
    a as s
} from "./lit-element.js";
import {
    e as r
} from "./class-map.js";
import {
    L as n
} from "./localize-core-element.js";
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
import "./style-map.js";
import "./visible-on-ancestor-mixin.js";
import "./button-styles.js";
import "./property-required-mixin.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
import "./svg-to-css.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
class l extends(n(s)) {
    static get properties() {
        return {
            buttonText: {
                type: String,
                attribute: "button-text"
            },
            hasCloseButton: {
                type: Boolean,
                attribute: "has-close-button"
            },
            noPadding: {
                type: Boolean,
                attribute: "no-padding",
                reflect: !0
            },
            subtext: {
                type: String
            },
            type: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [t, e, o `

			:host {
				animation: 600ms ease drop-in;
				background: var(--d2l-theme-background-color-base);
				border: 1px solid var(--d2l-theme-border-color-standard);
				border-inline-start-width: 0.3rem;
				border-radius: 0.3rem;
				box-sizing: border-box;
				display: flex;
				flex: 1;
				max-width: 710px;
				position: relative;
				width: 100%;
			}

			:host([hidden]) {
				display: none;
			}

			:host([type="critical"]),
			:host([type="error"]) {
				border-inline-start-color: var(--d2l-theme-status-color-error);
			}
			:host([type="warning"]) {
				border-inline-start-color: var(--d2l-theme-status-color-warning);
			}
			:host([type="default"]),
			:host([type="call-to-action"]) {
				border-inline-start-color: var(--d2l-theme-status-color-default);
			}
			:host([type="success"]) {
				border-inline-start-color: var(--d2l-theme-status-color-success);
			}

			.d2l-alert-text {
				flex: 1;
				padding-block: 0.9rem;
				padding-inline-end: 1.5rem;
				padding-inline-start: 1.2rem;
				position: relative;
			}
			.d2l-alert-text-with-actions {
				padding-inline-end: 0.9rem;
			}

			:host([no-padding]) .d2l-alert-text,
			:host([no-padding]) .d2l-alert-text-with-actions {
				padding-block: 0;
				padding-inline-end: 0;
				padding-inline-start: 0;
			}

			.d2l-alert-subtext {
				margin: 0.5rem 0 0;
			}

			.d2l-alert-action {
				margin-block: 0.6rem;
				margin-inline-end: 0.6rem;
				margin-inline-start: 0;
			}
			:host([no-padding]) .d2l-alert-action {
				margin: 0;
			}

			@media (max-width: 615px) {
				.d2l-alert-text {
					flex: 1;
					position: relative;
				}
				.d2l-alert-action {
					margin: 0.45rem;
				}
			}

			@keyframes drop-in {
				from {
					opacity: 0;
					transform: translate(0, -10px);
				}
				to {
					opacity: 1;
					transform: translate(0, 0);
				}
			}

			@media (prefers-reduced-motion: reduce) {
				:host {
					animation: none;
				}
			}
		`]
    }
    constructor() {
        super(), this.hasCloseButton = !1, this.noPadding = !1, this.type = "default"
    }
    render() {
        const t = this.buttonText && this.buttonText.length > 0 || this.hasCloseButton;
        return i `
			<div class="${r({"d2l-alert-text":!0,"d2l-alert-text-with-actions":t,"d2l-body-standard":!0})}">
				<slot></slot>
				${this.subtext?i`<p class="d2l-body-compact d2l-alert-subtext">${this.subtext}</p>`:null}
			</div>
			${t?i`
				<div class="d2l-alert-action">
					${this.buttonText&&this.buttonText.length>0?i`
						<d2l-button-subtle @click=${this._onButtonClick} text=${this.buttonText}></d2l-button-subtle>`:null}
					${this.hasCloseButton?i`
						<d2l-button-icon @click=${this.close} icon="tier1:close-default" text="${this.localize("components.alert.close")}"></d2l-button-icon>`:null}
				</div>`:null}
		`
    }
    close() {
        this.dispatchEvent(new CustomEvent("d2l-alert-close", {
            bubbles: !0,
            composed: !0,
            cancelable: !0
        })) && (this.hidden = !0)
    }
    _onButtonClick() {
        this.dispatchEvent(new CustomEvent("d2l-alert-button-press", {
            bubbles: !0,
            composed: !0
        }))
    }
}
customElements.define("d2l-alert", l);