import "./colors.js";
import "./tooltip.js";
import {
    i as t,
    b as e
} from "./lit-element.js";
import {
    f as i
} from "./number.js";
import {
    g as o
} from "./uniqueId.js";
import {
    L as r
} from "./localize-core-element.js";
import {
    o as s
} from "./offscreen.js";
import {
    S as a
} from "./skeleton-mixin.js";
import {
    o as n
} from "./style-map.js";
const l = l => class extends(r(a(l))) {
    static get properties() {
        return {
            announceChanges: {
                type: Boolean,
                attribute: "announce-changes"
            },
            forceFocusRing: {
                type: Boolean,
                attribute: "focus-ring",
                reflect: !0
            },
            hasTooltip: {
                type: Boolean,
                attribute: "has-tooltip"
            },
            hideZero: {
                type: Boolean,
                attribute: "hide-zero"
            },
            maxDigits: {
                type: Number,
                attribute: "max-digits"
            },
            number: {
                type: Number,
                attribute: "number"
            },
            size: {
                type: String,
                reflect: !0,
                attribute: "size"
            },
            tabStop: {
                type: Boolean,
                attribute: "tab-stop"
            },
            text: {
                type: String
            },
            type: {
                type: String,
                reflect: !0,
                attribute: "type"
            }
        }
    }
    static get styles() {
        return [super.styles, s, t `
			:host([hidden]) {
				display: none;
			}

			:host {
				display: inline-block;
				min-width: 0.9rem;
			}

			.d2l-count-badge-number {
				font-weight: bold;
			}

			:host([type="notification"]) .d2l-count-badge-number {
				background-color: var(--d2l-theme-notification-background-color);
				color: var(--d2l-theme-notification-text-color);
			}

			:host([type="count"]) .d2l-count-badge-number {
				background-color: var(--d2l-count-badge-background-color, var(--d2l-theme-badge-background-color));
				color: var(--d2l-count-badge-foreground-color, var(--d2l-theme-badge-text-color));
			}

			:host([size="small"]) .d2l-count-badge-number {
				border-radius: 0.55rem;
				font-size: 0.6rem;
				line-height: 0.9rem;
				padding-left: 0.3rem;
				padding-right: 0.3rem;
			}

			:host([size="large"]) .d2l-count-badge-number {
				border-radius: 0.7rem;
				font-size: 0.8rem;
				line-height: 1.2rem;
				padding-left: 0.4rem;
				padding-right: 0.4rem;
			}
		`]
    }
    constructor() {
        super(), this.announceChanges = !1, this.forceFocusRing = !1, this.hasTooltip = !1, this.hideZero = !1, this.size = "small", this.tabStop = !1, this.text = "", this.type = "count", this._labelId = o()
    }
    connectedCallback() {
        super.connectedCallback(), this.maxDigits ? this.maxDigits > 5 && (this.maxDigits = 5) : this.maxDigits = "notification" === this.type ? 2 : 5
    }
    updated(t) {
        super.updated(t), t.get("maxDigits") && this.maxDigits > 5 && (this.maxDigits = 5)
    }
    getAriaLabelId() {
        return this.hasTooltip ? void 0 : this._labelId
    }
    getNumberString() {
        let t = `${this.number}`;
        return this.maxDigits && this.number.toString().length > this.maxDigits ? (t = `${"9".repeat(this.maxDigits)}`, t = i(parseInt(t)), t = this.localize("components.count-badge.plus", {
            number: t
        })) : t = i(t), t
    }
    renderCount(t) {
        const i = this.hideZero && 0 === this.number;
        return t && "hidden" === t.visibility || (t = { ...t,
            visibility: i ? "hidden" : "visible"
        }), e `
			<div class="d2l-count-badge-number" style=${n(t)}>
					<div aria-hidden="true">${this.getNumberString()}</div>
			</div>
		`
    }
    renderTooltips(t, i) {
        return e `
		<div id="${this._labelId}"
			aria-label="${this.text}"
			aria-atomic="true"
			aria-live="${this.announceChanges?"polite":"off"}">
			${t}
		</div>
		${this.hasTooltip&&!this.skeleton?e`<d2l-tooltip class="vdiff-target" for="${i}" for-type="label">${this.text}</d2l-tooltip>`:null}
		`
    }
};
export {
    l as C
};