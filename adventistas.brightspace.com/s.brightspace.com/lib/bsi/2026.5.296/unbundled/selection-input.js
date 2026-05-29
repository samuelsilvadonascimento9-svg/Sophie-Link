import {
    b as e,
    c as t
} from "./_rollupPluginBabelHelpers.js";
import "./input-checkbox.js";
import "./tooltip.js";
import {
    a as i,
    i as s,
    b as d,
    A as l
} from "./lit-element.js";
import {
    e as o
} from "./class-map.js";
import {
    g as a
} from "./uniqueId.js";
import {
    o as n
} from "./if-defined.js";
import {
    L as r
} from "./labelled-mixin.js";
import {
    r as h
} from "./input-radio-styles.js";
import {
    S as c
} from "./skeleton-mixin.js";
const p = 32;
var b = new WeakMap;
class u extends(c(r(i))) {
    static get properties() {
        return {
            selected: {
                type: Boolean,
                reflect: !0
            },
            disabled: {
                type: Boolean,
                reflect: !0
            },
            disabledTooltip: {
                type: String,
                attribute: "disabled-tooltip"
            },
            hovering: {
                type: Boolean
            },
            key: {
                type: String
            },
            _indeterminate: {
                type: Boolean
            },
            _provider: {
                type: Object
            }
        }
    }
    static get styles() {
        return [super.styles, h, s `
			:host {
				display: inline-block;
				line-height: normal;
			}
			:host([hidden]) {
				display: none;
			}
		`]
    }
    constructor() {
        super(), e(this, b, a()), this.selected = !1, this._indeterminate = !1
    }
    get focusDisabled() {
        return this.disabled && !this.disabledTooltip
    }
    connectedCallback() {
        super.connectedCallback(), requestAnimationFrame(() => {
            const e = new CustomEvent("d2l-selection-input-subscribe", {
                bubbles: !0,
                composed: !0,
                detail: {}
            });
            this.dispatchEvent(e), this._provider = e.detail.provider, this._provider && this._provider._selectAllPages && (this.selected = !0)
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._provider && this._provider.unsubscribeSelectable(this)
    }
    firstUpdated(e) {
        super.firstUpdated(e), this.key && 0 !== this.key.length || console.warn("d2l-selection-input component requires a key.")
    }
    render() {
        if (this._provider) {
            if (this._provider.selectionSingle) {
                const e = {
                        "d2l-input-radio": !0,
                        "d2l-selection-input-radio": !0,
                        "d2l-skeletize": !0,
                        "d2l-hovering": this.hovering,
                        "d2l-disabled": this.disabled,
                        "d2l-input-radio-disabled-tooltip": this.disabled && this.disabledTooltip
                    },
                    i = this.disabled && this.disabledTooltip ? d `<d2l-tooltip align="start" class="vdiff-include" for="${t(b,this)}" ?force-show="${this.hovering}" position="top">${this.disabledTooltip}</d2l-tooltip>` : l;
                return d `
				<div
					aria-disabled="${n(this.disabled)}"
					aria-label="${this.label}"
					aria-checked="${this.selected?"true":"false"}"
					class="${o(e)}"
					id="${t(b,this)}"
					@click="${this._handleRadioClick}"
					@keydown="${this._handleRadioKeyDown}"
					@keyup="${this._handleRadioKeyUp}"
					role="radio"
					tabindex="${n(this.focusDisabled?void 0:0)}"></div>
					${i}
			`
            }
            return d `
				<d2l-input-checkbox
					label="${this.label}"
					label-hidden
					@change="${this._handleCheckboxChange}"
					?checked="${this.selected}"
					class="${n(this.hovering?"d2l-hovering":void 0)}"
					?disabled="${this.disabled}"
					disabled-tooltip="${n(this.disabledTooltip)}"
					?indeterminate="${this._indeterminate}"
					?skeleton="${this.skeleton}">
				</d2l-input-checkbox>
			`
        }
    }
    updated(e) {
        super.updated(e), (e.has("selected") && (void 0 !== e.get("selected") || !1 !== this.selected) || e.has("_indeterminate") && (void 0 !== e.get("_indeterminate") || !1 !== this._indeterminate)) && this.dispatchEvent(new CustomEvent("d2l-selection-change", {
            bubbles: !0,
            composed: !0,
            detail: {
                key: this.key,
                indeterminate: this._indeterminate,
                selected: this.selected
            }
        }))
    }
    focus() {
        const e = this.shadowRoot && this.shadowRoot.firstElementChild;
        e && e.focus()
    }
    _handleCheckboxChange(e) {
        e.stopPropagation(), this.selected = e.target.checked
    }
    _handleRadioClick(e) {
        e.stopPropagation(), this.disabled || (this.selected = !this.selected)
    }
    _handleRadioKeyDown(e) {
        e.keyCode === p && e.preventDefault()
    }
    _handleRadioKeyUp(e) {
        e.keyCode !== p || this.disabled || (this.selected = !this.selected)
    }
}
customElements.define("d2l-selection-input", u);