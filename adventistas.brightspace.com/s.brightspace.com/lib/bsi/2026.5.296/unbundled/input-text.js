import "./colors.js";
import "./tooltip.js";
import {
    a as t,
    i as e,
    b as i,
    A as s
} from "./lit-element.js";
import {
    e as n
} from "./class-map.js";
import {
    F as l
} from "./focus-mixin.js";
import {
    f as a
} from "./number.js";
import {
    I as r,
    F as o
} from "./input-inline-help.js";
import {
    g as d
} from "./uniqueId.js";
import {
    o as h
} from "./if-defined.js";
import {
    i as p
} from "./input-label-styles.js";
import {
    i as u
} from "./input-styles.js";
import {
    L as c
} from "./labelled-mixin.js";
import {
    o as m
} from "./offscreen.js";
import {
    P as f
} from "./property-required-mixin.js";
import {
    R as v
} from "./rtl-mixin.js";
import {
    S as g
} from "./skeleton-mixin.js";
import {
    o as b
} from "./style-map.js";
import "./svg-to-css.js";
import "./_rollupPluginBabelHelpers.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./directive.js";
import "./dedupeMixin.js";
import "./common.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
import "./subscriberControllers.js";
class y {
    constructor(t) {
        this.constructedTime = window.performance.now(), this.host = t
    }
    hostUpdated() {
        window.d2lPerfTestInProgress && void 0 === this.renderedTime && setTimeout(async () => {
            await this.host.updateComplete, this.renderedTime = window.performance.now(), this.host.dispatchEvent(new CustomEvent("d2l-component-perf", {
                bubbles: !0,
                composed: !0,
                detail: {
                    value: Math.round(this.renderedTime - this.constructedTime)
                }
            }))
        })
    }
}
class _ extends(r(f(l(c(o(g(v(t)))))))) {
    static get properties() {
        return {
            ariaHaspopup: {
                type: String,
                attribute: "aria-haspopup"
            },
            ariaInvalid: {
                type: String,
                attribute: "aria-invalid"
            },
            autocomplete: {
                type: String
            },
            autofocus: {
                type: Boolean
            },
            description: {
                type: String,
                reflect: !0
            },
            disabled: {
                type: Boolean,
                reflect: !0
            },
            hideInvalidIcon: {
                attribute: "hide-invalid-icon",
                type: Boolean,
                reflect: !0
            },
            hideInvalidTooltip: {
                attribute: "hide-invalid-tooltip",
                type: Boolean,
                reflect: !0
            },
            inputWidth: {
                attribute: "input-width",
                type: String
            },
            instructions: {
                type: String,
                attribute: "instructions"
            },
            labelHidden: {
                type: Boolean,
                attribute: "label-hidden"
            },
            max: {
                type: String
            },
            maxlength: {
                type: Number
            },
            min: {
                type: String
            },
            minlength: {
                type: Number
            },
            pattern: {
                type: String
            },
            patternFailureText: {
                type: String,
                attribute: "pattern-failure-text"
            },
            placeholder: {
                type: String
            },
            preventSubmit: {
                type: Boolean,
                attribute: "prevent-submit"
            },
            readonly: {
                type: Boolean
            },
            required: {
                type: Boolean,
                reflect: !0
            },
            size: {
                type: Number
            },
            step: {
                type: Number
            },
            title: {
                type: String
            },
            type: {
                type: String
            },
            unit: {
                type: String
            },
            unitLabel: {
                attribute: "unit-label",
                required: {
                    dependentProps: ["unit"],
                    message: (t, e) => `<d2l-input-text>: missing required attribute "unit-label" for unit "${e.unit}"`,
                    validator: (t, e, i) => !("string" == typeof e.unit && e.unit.length > 0 && "%" !== e.unit && !i)
                },
                type: String
            },
            value: {
                type: String
            },
            valueAlign: {
                attribute: "value-align",
                type: String
            },
            _firstSlotWidth: {
                type: Number
            },
            _hasAfterContent: {
                type: Boolean,
                attribute: !1
            },
            _focused: {
                type: Boolean
            },
            _hovered: {
                type: Boolean
            },
            _lastSlotWidth: {
                type: Number
            }
        }
    }
    static get styles() {
        return [super.styles, u, p, m, e `
				:host {
					display: inline-block;
					width: 100%;
				}
				:host([hidden]) {
					display: none;
				}
				:host([value-align="end"]) {
					--d2l-input-text-align: end;
				}
				.d2l-input-label {
					display: inline-block;
					vertical-align: bottom;
				}
				:host(:not([skeleton])) .d2l-input-label {
					margin: 0;
					padding-block: 0 0.4rem;
					padding-inline: 0;
				}
				:host(:not([skeleton]):not([input-width])) .d2l-input-label {
					width: 100%;
				}
				.d2l-input-container {
					display: flex;
				}
				.d2l-input-text-container {
					flex: 1 1 auto;
					position: var(--d2l-input-position, relative); /* overridden by sticky headers in grades */
				}
				.d2l-input {
					-webkit-appearance: textfield;
					appearance: textfield;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				#after-slot {
					display: inline-block;
					flex: 0 0 auto;
				}
				.d2l-input-inside-before, .d2l-input-inside-after {
					align-items: center;
					display: flex;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
				.d2l-input-inside-before {
					left: 0;
				}
				.d2l-input-inside-after {
					right: 0;
				}
				.d2l-input-unit {
					color: var(--d2l-theme-text-color-static-faint);
					font-size: 0.7rem;
					margin-top: 0.05rem;
				}
				.d2l-input-inside-before .d2l-input-unit {
					margin-left: 12px;
					margin-right: 6px;
				}
				.d2l-input-inside-after .d2l-input-unit {
					display: inline-block;
					margin-left: 6px;
					margin-right: 12px;
				}
				:host([disabled]) .d2l-input-unit {
					opacity: var(--d2l-theme-opacity-disabled-control);
				}
				.d2l-input-text-invalid-icon {
					background-image: var(--d2l-input-invalid-image);
					background-position: center center;
					background-repeat: no-repeat;
					background-size: 0.8rem 0.8rem;
					display: flex;
					height: 22px;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 22px;
				}
			`]
    }
    constructor() {
        super(), this.autofocus = !1, this.disabled = !1, this.hideInvalidIcon = !1, this.hideInvalidTooltip = !1, this.labelHidden = !1, this.preventSubmit = !1, this.readonly = !1, this.required = !1, this.type = "text", this.valueAlign = "start", this._value = "", this._descriptionId = d(), this._firstSlotWidth = 0, this._focused = !1, this._hasAfterContent = !1, this._hovered = !1, this._inlineHelpId = d(), this._inputId = d(), this._intersectionObserver = null, this._isIntersecting = !1, this._lastSlotWidth = 0, this._prevValue = "", this._handleBlur = this._handleBlur.bind(this), this._handleFocus = this._handleFocus.bind(this), this._perfMonitor = new y(this)
    }
    get value() {
        return this._value
    }
    set value(t) {
        this._setValue(t, !0)
    }
    static get focusElementSelector() {
        return ".d2l-input"
    }
    get selectionEnd() {
        const t = this.shadowRoot && this.shadowRoot.querySelector(".d2l-input");
        return t ? t.selectionEnd : 0
    }
    get selectionStart() {
        const t = this.shadowRoot && this.shadowRoot.querySelector(".d2l-input");
        return t ? t.selectionStart : 0
    }
    get validationMessage() {
        if (this.validity.rangeOverflow) return this.localize("components.form-element.input.number.rangeOverflow", {
            max: a(parseFloat(this.max)),
            maxExclusive: !1
        });
        if (this.validity.rangeUnderflow) return this.localize("components.form-element.input.number.rangeUnderflow", {
            min: a(parseFloat(this.min)),
            minExclusive: !1
        });
        if (this.validity.tooShort) return this.localize("components.form-element.input.text.tooShort", {
            label: this.label,
            minlength: a(this.minlength)
        });
        if (this.validity.typeMismatch) {
            if ("email" === this.type) return this.localize("components.form-element.input.email.typeMismatch");
            if ("url" === this.type) return this.localize("components.form-element.input.url.typeMismatch")
        } else if (this.validity.patternMismatch && "string" == typeof this.patternFailureText) return this.patternFailureText;
        return super.validationMessage
    }
    get validity() {
        const t = this.shadowRoot && this.shadowRoot.querySelector(".d2l-input");
        return t && !t.validity.valid ? t.validity : super.validity
    }
    connectedCallback() {
        super.connectedCallback(), this.hasAttribute("aria-label") && (this.labelRequired = !1)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._intersectionObserver && this._intersectionObserver.disconnect();
        const t = this.shadowRoot && this.shadowRoot.querySelector(".d2l-input-text-container");
        t && (t.removeEventListener("blur", this._handleBlur, !0), t.removeEventListener("focus", this._handleFocus, !0))
    }
    firstUpdated(t) {
        super.firstUpdated(t), this._setValue(this.value, !0);
        const e = this.shadowRoot && this.shadowRoot.querySelector(".d2l-input-text-container");
        e && (e.addEventListener("blur", this._handleBlur, !0), e.addEventListener("focus", this._handleFocus, !0), "function" == typeof IntersectionObserver ? (this._intersectionObserver = new IntersectionObserver(t => {
            t.forEach(t => {
                t.isIntersecting && (this._isIntersecting = !0, this._updateInputLayout())
            })
        }), this._intersectionObserver.observe(e)) : this._isIntersecting = !0)
    }
    render() {
        this._perfMonitor.hostUpdated();
        const t = !this.disabled && (this._focused || this._hovered),
            e = {
                "d2l-input": !0,
                "d2l-input-focus": t
            },
            l = this.required ? "true" : void 0,
            a = this.invalid ? "true" : this.ariaInvalid,
            r = this.description ? i `<div class="d2l-offscreen" id="${this._descriptionId}">${this.description}</div>` : null,
            o = this.disabled || this.skeleton,
            d = {};
        this._firstSlotWidth > 0 && (d.paddingLeft = t ? this._firstSlotWidth - 1 + "px" : `${this._firstSlotWidth}px`), this._lastSlotWidth > 0 && (d.paddingRight = t ? this._lastSlotWidth - 1 + "px" : `${this._lastSlotWidth}px`);
        const p = {
                maxWidth: this.inputWidth
            },
            u = {
                minWidth: this.inputWidth && !this.skeleton ? `min(100%, ${this.inputWidth})` : void 0
            },
            c = "rtl" === this.dir ? "right" : "left",
            m = "rtl" === this.dir ? "left" : "right",
            f = "true" !== a || this.disabled,
            v = "rtl" === this.dir && "start" === this.valueAlign || "rtl" !== this.dir && "end" === this.valueAlign ? "left" : "right",
            g = Math.max("left" === v ? this._firstSlotWidth : this._lastSlotWidth, 12),
            y = {
                [v]: `${g}px`
            },
            _ = !f && !this.hideInvalidIcon && !this._focused;
        if (_) {
            d["left" === v ? "paddingLeft" : "paddingRight"] = g + 22 - (t ? 1 : 0) + "px"
        }
        const $ = this.unit ? i `<span aria-hidden="true" class="d2l-input-unit" @click="${this._handleUnitClick}">${this.unit}</span>` : null,
            x = `${this.description?this._descriptionId:""} ${this._hasInlineHelp?this._inlineHelpId:""}`.trim(),
            S = i `
			<div class="d2l-input-container">
				<div class="d2l-input-text-container d2l-skeletize"
						@mouseenter="${this._handleMouseEnter}"
						@mouseleave="${this._handleMouseLeave}"
						style="${b(p)}">
					<input
						aria-describedby="${h(x.length>0?x:void 0)}"
						aria-haspopup="${h(this.ariaHaspopup)}"
						aria-invalid="${h(a)}"
						aria-label="${h(this._getAriaLabel())}"
						aria-required="${h(l)}"
						?required="${this.required}"
						autocomplete="${h(this.autocomplete)}"
						?autofocus="${this.autofocus}"
						@change="${this._handleChange}"
						class="${n(e)}"
						?disabled="${o}"
						id="${this._inputId}"
						@input="${this._handleInput}"
						@invalid="${this._handleInvalid}"
						@keypress="${this._handleKeypress}"
						max="${h(this.max)}"
						maxlength="${h(this.maxlength)}"
						min="${h(this.min)}"
						minlength="${h(this.minlength)}"
						name="${h(this.name)}"
						pattern="${h(this.pattern)}"
						placeholder="${h(this.placeholder)}"
						?readonly="${this.readonly}"
						size="${h(this.size)}"
						step="${h(this.step)}"
						style="${b(d)}"
						title="${h(this.title)}"
						type="${this._getType()}">
					<div class="d2l-input-inside-before" @keypress="${this._suppressEvent}">${"rtl"===this.dir?$:""}<slot name="${c}" @slotchange="${this._handleSlotChange}"></slot></div>
					<div class="d2l-input-inside-after" @keypress="${this._suppressEvent}">${"rtl"!==this.dir?$:""}<slot name="${m}" @slotchange="${this._handleSlotChange}"></slot></div>
					${_?i`<div class="d2l-input-text-invalid-icon" style="${b(y)}" @click="${this._handleInvalidIconClick}"></div>`:null}
				</div><div id="after-slot" class="d2l-skeletize" ?hidden="${!this._hasAfterContent}"><slot name="after" @slotchange="${this._handleAfterSlotChange}"></slot></div>
			</div>
			${this._renderInlineHelp(this._inlineHelpId)}
			${r}
		`;
        let w = s;
        if (this.label && !this.labelHidden && !this.labelledBy) {
            const t = this._getUnitLabel();
            w = i `<label class="d2l-input-label d2l-skeletize" for="${this._inputId}" style="${b(u)}">${this.label}${t?i`<span class="d2l-offscreen">${t}</span>`:""}</label>`
        }
        let I = s;
        return this.skeleton || this.disabled || (!this.validationError || this.noValidate || this.hideInvalidTooltip ? this.instructions && (I = i `<d2l-tooltip align="start" for="${this._inputId}" delay="1000" class="vdiff-target">${this.instructions}</d2l-tooltip>`) : I = i `<d2l-tooltip state="error" announced align="start" class="vdiff-target">${this.validationError} <span class="d2l-offscreen">${this.description}</span></d2l-tooltip>`), i `${I}${w}${S}`
    }
    updated(t) {
        super.updated(t), t.forEach((t, e) => {
            if ("unit" === e || "unitLabel" === e) this._updateInputLayout();
            else if ("validationError" === e) {
                if (t && this.validationError) {
                    this.shadowRoot.querySelector("d2l-tooltip").updatePosition()
                }
            } else if ("type" === e) {
                const t = this.shadowRoot ? .querySelector(".d2l-input");
                setTimeout(() => {
                    t && this.value !== t.value && this._setValue(t.value, !1)
                }, 0)
            }
        })
    }
    _getAriaLabel() {
        let t;
        if (this.label && (this.labelHidden || this.labelledBy) ? t = this.label : this.hasAttribute("aria-label") && (t = this.getAttribute("aria-label")), t) return `${t}${this._getUnitLabel()}`
    }
    _getType() {
        return "email" === this.type || "number" === this.type || "password" === this.type || "tel" === this.type || "text" === this.type || "search" === this.type || "url" === this.type ? this.type : "text"
    }
    _getUnitLabel() {
        if (!this.unit) return "";
        return ` ${this.unitLabel||this.unit}`
    }
    _handleAfterSlotChange(t) {
        const e = t.target.assignedNodes({
            flatten: !0
        });
        this._hasAfterContent = e && e.length > 0
    }
    async _handleBlur(t) {
        this._focused = !1, this.requestValidate(!0);
        const e = window.navigator.userAgent;
        this._prevValue !== t.target.value && e.indexOf("Edge") > -1 && this._handleChange()
    }
    _handleChange() {
        this.dispatchEvent(new CustomEvent("change", {
            bubbles: !0,
            composed: !1
        }))
    }
    _handleFocus() {
        this._focused = !0
    }
    _handleInput(t) {
        return this._setValue(t.target.value, !1), !0
    }
    _handleInvalid(t) {
        t.preventDefault()
    }
    _handleInvalidIconClick() {
        this.focus()
    }
    _handleKeypress(t) {
        return !this.preventSubmit || 13 !== t.keyCode || (t.preventDefault(), !1)
    }
    _handleMouseEnter() {
        this._hovered = !0
    }
    _handleMouseLeave() {
        this._hovered = !1
    }
    _handleSlotChange() {
        this._updateInputLayout()
    }
    _handleUnitClick() {
        this.focus()
    }
    async _setValue(t, e) {
        const i = this.value;
        this._prevValue = void 0 === i ? "" : i, this._value = t;
        const s = this.shadowRoot && this.shadowRoot.querySelector(".d2l-input");
        s && (this.setValidity({
            tooShort: this.minlength && this.value.length > 0 && this.value.length < this.minlength
        }), this.setFormValue(this.value), e && (await this.updateComplete, s.value = this.value), this.requestValidate(!1))
    }
    _suppressEvent(t) {
        t.stopPropagation()
    }
    _updateInputLayout() {
        if (!this.shadowRoot || !this._isIntersecting) return;
        const t = this.shadowRoot.querySelector(".d2l-input-inside-before"),
            e = t.querySelector("slot").assignedNodes({
                flatten: !0
            }).length > 0 || this.unit && "rtl" === this.dir,
            i = this.shadowRoot.querySelector(".d2l-input-inside-after"),
            s = i.querySelector("slot").assignedNodes({
                flatten: !0
            }).length > 0 || this.unit && "rtl" !== this.dir;
        e ? requestAnimationFrame(() => this._firstSlotWidth = Math.ceil(t.getBoundingClientRect().width)) : this._firstSlotWidth = 0, s ? requestAnimationFrame(() => this._lastSlotWidth = Math.ceil(i.getBoundingClientRect().width)) : this._lastSlotWidth = 0, requestAnimationFrame(() => {
            this.dispatchEvent(new CustomEvent("d2l-input-text-layout-updated", {
                bubbles: !1,
                composed: !1
            }))
        })
    }
}
customElements.define("d2l-input-text", _);