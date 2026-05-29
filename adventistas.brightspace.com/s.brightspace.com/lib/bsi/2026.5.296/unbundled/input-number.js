import "./input-text.js";
import "./tooltip.js";
import {
    a as t,
    i,
    b as e
} from "./lit-element.js";
import {
    g as s,
    p as a,
    f as n
} from "./number.js";
import {
    F as r
} from "./focus-mixin.js";
import {
    F as o
} from "./input-inline-help.js";
import {
    g as l
} from "./uniqueId.js";
import {
    o as u
} from "./if-defined.js";
import {
    L as m
} from "./labelled-mixin.js";
import {
    L as h
} from "./localize-core-element.js";
import {
    S as d
} from "./skeleton-mixin.js";
import {
    o as p
} from "./style-map.js";
import "./colors.js";
import "./svg-to-css.js";
import "./class-map.js";
import "./directive.js";
import "./input-label-styles.js";
import "./input-styles.js";
import "./focus.js";
import "./dom.js";
import "./offscreen.js";
import "./property-required-mixin.js";
import "./dedupeMixin.js";
import "./rtl-mixin.js";
import "./common.js";
import "./_rollupPluginBabelHelpers.js";
import "./announce.js";
import "./styles.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./localize-mixin.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
import "./subscriberControllers.js";
const c = 0,
    g = 1,
    v = 2,
    f = 3,
    x = 4,
    b = {
        fromAttribute: t => t ? Number(t) : void 0,
        toAttribute: t => String(t)
    };

function _(t, i, e) {
    return void 0 === t ? "" : (e > 0 && (i.minimumFractionDigits = Math.min(Math.max(i.minimumFractionDigits, e), i.maximumFractionDigits)), n(t, i))
}

function y(t, i) {
    if (null == t) return 0;
    const e = i ? s().symbols.decimal : ".";
    let a = 0;
    for (let i = t.length - 1; i > -1; i--) {
        if (t.charAt(i) === e) return a;
        a++
    }
    return 0
}
class F extends(r(m(d(o(h(t)))))) {
    static get properties() {
        return {
            autocomplete: {
                type: String
            },
            autofocus: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            hideInvalidIcon: {
                attribute: "hide-invalid-icon",
                type: Boolean,
                reflect: !0
            },
            inputWidth: {
                attribute: "input-width",
                type: String
            },
            labelHidden: {
                type: Boolean,
                attribute: "label-hidden"
            },
            max: {
                type: Number
            },
            maxExclusive: {
                type: Boolean,
                attribute: "max-exclusive"
            },
            maxFractionDigits: {
                type: Number,
                attribute: "max-fraction-digits"
            },
            min: {
                type: Number
            },
            minExclusive: {
                type: Boolean,
                attribute: "min-exclusive"
            },
            minFractionDigits: {
                type: Number,
                attribute: "min-fraction-digits"
            },
            required: {
                type: Boolean
            },
            trailingZeroes: {
                type: Boolean,
                attribute: "trailing-zeroes"
            },
            unit: {
                type: String
            },
            unitLabel: {
                attribute: "unit-label",
                type: String
            },
            value: {
                type: Number,
                converter: b
            },
            valueAlign: {
                attribute: "value-align",
                type: String
            },
            valueTrailingZeroes: {
                type: String,
                attribute: "value-trailing-zeroes"
            },
            _afterSlotWidth: {
                state: !0
            },
            _hintType: {
                state: !0
            },
            _formattedValue: {
                state: !0
            }
        }
    }
    static get styles() {
        return [super.styles, i `
				:host {
					display: inline-block;
					position: var(--d2l-input-position, relative); /* overridden by sticky headers in grades */
					width: 100%;
				}
				:host([hidden]) {
					display: none;
				}
				d2l-input-text:not([skeleton]) {
					width: auto;
				}
			`]
    }
    constructor() {
        super(), this.autofocus = !1, this.disabled = !1, this.inputWidth = "4rem", this.labelHidden = !1, this.maxExclusive = !1, this.minExclusive = !1, this.required = !1, this.valueAlign = "start", this._formattedValue = "", this._hintType = c, this._inputId = l(), this._trailingZeroes = !1, this._valueTrailingZeroes = "", this._descriptor = s(), this._afterSlotWidth = 0
    }
    get maxFractionDigits() {
        return null === this._maxFractionDigits || void 0 === this._maxFractionDigits ? Math.max(this.minFractionDigits, 3) : this._maxFractionDigits
    }
    set maxFractionDigits(t) {
        if (isNaN(t) || t < 0 || t > 20 || t < this.minFractionDigits) throw new RangeError("maxFractionDigits must be between 0 and 20 and >= minFractionDigits");
        this._maxFractionDigits = t, this._updateFormattedValue()
    }
    get minFractionDigits() {
        return null === this._minFractionDigits || void 0 === this._minFractionDigits ? 0 : this._minFractionDigits
    }
    set minFractionDigits(t) {
        if (isNaN(t) || t < 0 || t > 20 || t < this.minFractionDigits) throw new RangeError("minFractionDigits must be between 0 and 20 and <= maxFractionDigits");
        this._minFractionDigits = t, this._updateFormattedValue()
    }
    get trailingZeroes() {
        return this._trailingZeroes
    }
    set trailingZeroes(t) {
        this._trailingZeroes = t, this._updateFormattedValue()
    }
    get value() {
        if (void 0 !== this._value) return function(t, i) {
            const e = new Intl.NumberFormat("en-US", {
                maximumFractionDigits: i,
                minimumFractionDigits: 0,
                useGrouping: !1
            }).format(t);
            return parseFloat(e)
        }(this._value, this.maxFractionDigits)
    }
    set value(t) {
        const i = this.value;
        (null === t || "" === t || isNaN(t)) && (t = void 0), this._value = t, this._updateFormattedValue(), this.requestUpdate("value", i)
    }
    get valueTrailingZeroes() {
        if ("" === this._valueTrailingZeroes) return "";
        const t = Math.min(y(this._valueTrailingZeroes, !1), this.maxFractionDigits);
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: t,
            useGrouping: !1
        }).format(this.value)
    }
    set valueTrailingZeroes(t) {
        this.value = parseFloat(t), this._valueTrailingZeroes = void 0 === this.value ? "" : t, this._updateFormattedValue()
    }
    static get focusElementSelector() {
        return "d2l-input-text"
    }
    get validationMessage() {
        if (this.validity.rangeOverflow || this.validity.rangeUnderflow) {
            const t = "number" == typeof this.min ? _(this.min, {
                    minimumFractionDigits: this.minFractionDigits,
                    maximumFractionDigits: this.maxFractionDigits
                }) : null,
                i = "number" == typeof this.max ? _(this.max, {
                    minimumFractionDigits: this.minFractionDigits,
                    maximumFractionDigits: this.maxFractionDigits
                }) : null;
            if (t && i) return this.localize("components.form-element.input.number.rangeError", {
                min: t,
                max: i,
                minExclusive: this.minExclusive,
                maxExclusive: this.maxExclusive
            });
            if (i) return this.localize("components.form-element.input.number.rangeOverflow", {
                max: i,
                maxExclusive: this.maxExclusive
            });
            if (t) return this.localize("components.form-element.input.number.rangeUnderflow", {
                min: t,
                minExclusive: this.minExclusive
            })
        }
        return super.validationMessage
    }
    get validity() {
        const t = this.shadowRoot && this.shadowRoot.querySelector("d2l-input-text");
        return t && !t.validity.valid ? t.validity : super.validity
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.addEventListener("d2l-localize-resources-change", () => {
            this._descriptor = s(), this._formattedValue.length > 0 && this._updateFormattedValue()
        })
    }
    render() {
        const t = "end" === this.valueAlign ? "end" : "start",
            i = this.inputWidth.includes("%"),
            s = {
                width: "100%",
                maxWidth: `calc(${this.inputWidth} + ${this._afterSlotWidth}px)`
            };
        return e `
			<d2l-input-text
				autocomplete="${u(this.autocomplete)}"
				?noValidate="${this.noValidate}"
				?autofocus="${this.autofocus}"
				@blur="${this._handleBlur}"
				@change="${this._handleChange}"
				class="vdiff-target"
				@input="${this._handleInput}"
				@keypress="${this._handleKeyPress}"
				?disabled="${this.disabled}"
				.forceInvalid="${this.invalid}"
				?hide-invalid-icon="${this.hideInvalidIcon}"
				id="${this._inputId}"
				input-width="${i?"none":this.inputWidth}"
				@invalid-change="${this._handleInvalidChange}"
				label="${u(this.label)}"
				?label-hidden="${this.labelHidden||this.labelledBy}"
				.labelRequired="${!1}"
				name="${u(this.name)}"
				?required="${this.required}"
				?skeleton="${this.skeleton}"
				style="${u(i?p(s):void 0)}"
				unit="${u(this.unit)}"
				unit-label="${u(this.unitLabel)}"
				.value="${this._formattedValue}"
				value-align="${t}">
					<slot slot="left" name="left"></slot>
					<slot slot="right" name="right"></slot>
					<slot slot="after" name="after" @slotchange=${this._handleAfterSlotChange}></slot>
					<slot slot="inline-help" name="inline-help"></slot>
			</d2l-input-text>
			${this._getTooltip()}
		`
    }
    async updated(t) {
        super.updated(t);
        let i = !1;
        if (t.forEach((t, e) => {
                "value" === e ? (this.setFormValue(this.value), i = !0) : ("min" === e && void 0 !== t || "max" === e && void 0 !== t || "minExclusive" === e && void 0 !== t || "maxExclusive" === e && void 0 !== t) && (i = !0)
            }), i) {
            const t = this.shadowRoot.querySelector("d2l-input-text");
            await t.updateComplete;
            let i = !1;
            "number" == typeof this.min && (i = this.minExclusive ? this.value <= this.min : this.value < this.min);
            let e = !1;
            "number" == typeof this.max && (e = this.maxExclusive ? this.value >= this.max : this.value > this.max), this.setValidity({
                rangeUnderflow: i,
                rangeOverflow: e
            }), this.requestValidate(!0)
        }
    }
    async validate() {
        if (!this.shadowRoot) return;
        const t = this.shadowRoot.querySelector("d2l-input-text");
        await t.updateComplete;
        return [...await t.validate(), ...await super.validate()]
    }
    _getTooltip() {
        if (this.disabled) return null;
        if (this.validationError && 0 === this.childErrors.size && !this.noValidate) return e `<d2l-tooltip announced for="${this._inputId}" state="error" align="start" class="vdiff-target">${this.validationError}</d2l-tooltip>`;
        let t = "";
        return this._hintType === x ? t = "components.input-number.hintInteger" : this._hintType === g ? t = "components.input-number.hintDecimalDuplicate" : this._hintType === v ? t = "components.input-number.hintDecimalIncorrectComma" : this._hintType === f && (t = "components.input-number.hintDecimalIncorrectPeriod"), "" !== t ? e `<d2l-tooltip announced for="${this._inputId}" state="info" align="start" class="vdiff-target">${this.localize(t)}</d2l-tooltip>` : void 0
    }
    async _handleAfterSlotChange(t) {
        const i = t.target.assignedNodes(),
            e = this.shadowRoot.querySelector("d2l-input-text");
        await e.updateComplete, this._afterSlotWidth = i.reduce((t, i) => t + i.clientWidth, 0)
    }
    _handleBlur() {
        this._hintType = c
    }
    async _handleChange(t) {
        const i = t.target.value;
        this._formattedValue = i, await this.updateComplete;
        let e = !1;
        if (this.trailingZeroes) {
            const t = this.valueTrailingZeroes,
                s = a(i);
            "" === i.trim() || isNaN(s) ? this.valueTrailingZeroes = "" : this.valueTrailingZeroes = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: y(i, !0),
                useGrouping: !1
            }).format(s), e = t !== this.valueTrailingZeroes
        } else {
            const t = this.value;
            this.value = "" === i.trim() ? NaN : a(i), e = t !== this.value
        }
        e && (await this.requestValidate(!0), this.dispatchEvent(new CustomEvent("change", {
            bubbles: !0,
            composed: !1
        })))
    }
    _handleInput(t) {
        "insertFromPaste" === t.inputType && this._handleChange(t), "insertText" !== t.inputType && (this._hintType = c)
    }
    _handleInvalidChange() {
        this.requestValidate(!0)
    }
    _handleKeyPress(t) {
        const i = t.key;
        let e = !1,
            s = c;
        const a = t.target.value.indexOf(this._descriptor.symbols.decimal),
            n = a > -1 && (a >= t.target.selectionEnd || a < t.target.selectionStart);
        i === this._descriptor.symbols.negative ? "{number}-" === this._descriptor.patterns.decimal.negativePattern ? t.target.selectionStart !== t.target.value.length && (e = !0) : 0 !== t.target.selectionStart && (e = !0) : i === this._descriptor.symbols.decimal ? n ? (s = g, e = !0) : 0 === this.maxFractionDigits && (s = x, e = !0) : ("." === i || "," === i) && !n && this.maxFractionDigits > 0 ? (s = "," === i ? f : v, e = !0) : -1 === ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter"].indexOf(i) && (e = !0), this._hintType = s, e && t.preventDefault()
    }
    _updateFormattedValue() {
        this._formattedValue = _(this.value, {
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits,
            useGrouping: !1
        }, this.trailingZeroes ? y(this._valueTrailingZeroes, !1) : 0)
    }
}
customElements.define("d2l-input-number", F);