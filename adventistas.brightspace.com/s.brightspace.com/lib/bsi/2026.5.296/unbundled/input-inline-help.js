import {
    h as t
} from "./dom.js";
import {
    L as e
} from "./localize-core-element.js";
import {
    i,
    b as s
} from "./lit-element.js";
import {
    k as r
} from "./styles.js";
import {
    S as n
} from "./skeleton-mixin.js";
const o = {
        button: !0,
        fieldset: !0,
        input: !0,
        object: !0,
        output: !0,
        select: !0,
        textarea: !0
    },
    a = t => t && t.nodeType === Node.ELEMENT_NODE,
    l = t => (t => a(t) && -1 !== t.nodeName.indexOf("-"))(t) && !!t.formAssociated,
    d = t => {
        if (!a(t)) return !1;
        const e = t.nodeName.toLowerCase();
        return !!o[e]
    },
    h = (t, e, i, s) => {
        if ((d(t) || l(t) || i(t)) && e.push(t), s(t)) {
            const r = "SLOT" === t.tagName && ["primary", "secondary"].includes(t.name) ? t.assignedNodes() : t.children;
            for (const t of r) h(t, e, i, s)
        }
    },
    c = (t, e = () => !1, i = () => !0) => {
        const s = [];
        return h(t, s, e, i), s
    },
    u = e => {
        const i = (e => {
            if (e.labels && e.labels.length > 0) return e.labels[0];
            const i = e.getRootNode();
            if (!i || i === document) return null;
            const s = e.parentElement;
            if (s && "LABEL" === e.parentElement.tagName) return s;
            if (e.id) return e.getRootNode().querySelector(`label[for="${t(e.id)}"]`);
            return null
        })(e);
        if (i) {
            const t = [...i.childNodes].filter(t => t.nodeType === Node.TEXT_NODE).reduce((t, e) => t + e.textContent, "").trim();
            if (t) return t
        }
        if (e.hasAttribute("aria-label")) {
            const t = e.getAttribute("aria-label");
            if (t) return t
        }
        if (e.hasAttribute("aria-labelledby")) {
            const t = e.getAttribute("aria-labelledby").split(" "),
                i = e.getRootNode();
            for (const e of t) {
                const t = i.getElementById(e);
                if (t) {
                    const e = t.textContent.trim();
                    if (e) return e
                }
            }
        }
        if (e.hasAttribute("title")) {
            const t = e.getAttribute("title");
            if (t) return t
        }
        const s = e.nodeName.toLowerCase();
        if ("button" === s && e.textContent) {
            const t = e.textContent.trim();
            if (t) return t
        }
        if ("input" === s) {
            if ("button" === e.type || "submit" === e.type || "reset" === e.type && e.value) {
                const t = e.value;
                if (t) return t
            }
            if ("image" === e.type) {
                const t = e.alt;
                if (t) return t
            }
        }
        return null
    },
    f = (t, e) => {
        const i = {};
        if (!((t, e) => {
                if (t.disabled) return !1;
                const i = t.nodeName.toLowerCase();
                if ("button" === i && t !== e) return !1;
                if ("input" === i) {
                    const i = t.getAttribute("type");
                    if (("checkbox" === i || "radio" === i) && !t.checked) return !1;
                    if ("submit" === i && t !== e) return !1;
                    if ("reset" === i) return !1
                }
                return !("d2l-input-checkbox" === i && !t.checked) && "object" !== i && "output" !== i
            })(t, e)) return i;
        const s = t.nodeName.toLowerCase();
        if (l(t)) return (t => t.formValue instanceof Object ? { ...t.formValue
        } : t.name ? {
            [t.name]: t.formValue
        } : {})(t);
        const r = t.getAttribute("name");
        if (!r) return i;
        const n = t.getAttribute("type");
        return "input" === s && "file" === n ? (i[r] = t.files, i) : (i[r] = t.value, i)
    },
    m = t => {
        const e = new Map;
        for (const [i, s] of t)
            if (s instanceof Map) {
                const t = m(s);
                for (const [i, s] of t) e.set(i, s)
            } else e.set(i, s);
        return e
    };
class p {
    constructor(t) {
        const e = Object.keys(t),
            i = e.filter(t => !(t in p.supportedFlags));
        i.length > 0 && (t = e.filter(t => t in p.supportedFlags).reduce((e, i) => (e[i] = t[i], e), {}), console.warn(`validity state was constructed with invalid flags: ${i}`)), this.flags = { ...this.constructor.supportedFlags,
            ...t
        }
    }
    get badInput() {
        return this.flags.badInput
    }
    get customError() {
        return this.flags.customError
    }
    get patternMismatch() {
        return this.flags.patternMismatch
    }
    get rangeOverflow() {
        return this.flags.rangeOverflow
    }
    get rangeUnderflow() {
        return this.flags.rangeUnderflow
    }
    get stepMismatch() {
        return this.flags.stepMismatch
    }
    static get supportedFlags() {
        return {
            valueMissing: !1,
            typeMismatch: !1,
            patternMismatch: !1,
            tooLong: !1,
            tooShort: !1,
            rangeUnderflow: !1,
            rangeOverflow: !1,
            stepMismatch: !1,
            badInput: !1,
            customError: !1
        }
    }
    get tooLong() {
        return this.flags.tooLong
    }
    get tooShort() {
        return this.flags.tooShort
    }
    get valid() {
        return Object.values(this.flags).reduce((t, e) => t && !e, !0)
    }
    get valueMissing() {
        return this.flags.valueMissing
    }
}
const g = t => class extends(e(t)) {
        static get properties() {
            return {
                forceInvalid: {
                    type: Boolean,
                    attribute: !1
                },
                invalid: {
                    type: Boolean,
                    reflect: !0
                },
                name: {
                    type: String
                },
                noValidate: {
                    type: Boolean,
                    attribute: "novalidate"
                },
                validateOnInit: {
                    type: Boolean,
                    attribute: "validate-on-init"
                },
                validationError: {
                    type: String,
                    attribute: !1
                },
                childErrors: {
                    type: Object,
                    attribute: !1
                },
                _errors: {
                    type: Array,
                    attribute: !1
                }
            }
        }
        constructor() {
            super(), this._validationCustomConnected = this._validationCustomConnected.bind(this), this._onFormElementErrorsChange = this._onFormElementErrorsChange.bind(this), this._firstUpdateResolve = null, this._firstUpdatePromise = new Promise(t => {
                this._firstUpdateResolve = t
            }), this._validationCustoms = new Set, this._validity = new p({}), this.forceInvalid = !1, this.formValue = null, this.invalid = !1, this.noValidate = !1, this.validateOnInit = !1, this.validationError = null, this.childErrors = new Map, this._errors = []
        }
        get formAssociated() {
            return !0
        }
        get validationMessage() {
            const t = this.label || this.localize("components.form-element.defaultFieldLabel");
            return this.validity.valueMissing ? this.localize("components.form-element.valueMissing", {
                label: t
            }) : this.localize("components.form-element.defaultError", {
                label: t
            })
        }
        get validity() {
            return this._validity
        }
        connectedCallback() {
            super.connectedCallback(), this.shadowRoot.addEventListener("d2l-validation-custom-connected", this._validationCustomConnected), this.shadowRoot.addEventListener("d2l-form-element-errors-change", this._onFormElementErrorsChange)
        }
        disconnectedCallback() {
            super.disconnectedCallback(), this.shadowRoot.removeEventListener("d2l-validation-custom-connected", this._validationCustomConnected), this.shadowRoot.removeEventListener("d2l-form-element-errors-change", this._onFormElementErrorsChange)
        }
        firstUpdated(t) {
            super.firstUpdated(t), this._firstUpdateResolve()
        }
        updated(t) {
            if (t.has("_errors") || t.has("childErrors")) {
                let t = this._errors;
                for (const e of this.childErrors.values()) t = [...e, ...t];
                const e = {
                    bubbles: !0,
                    composed: !0,
                    detail: {
                        errors: t
                    }
                };
                this.dispatchEvent(new CustomEvent("d2l-form-element-errors-change", e))
            }
            if (t.has("noValidate") || t.has("forceInvalid") || t.has("validationError")) {
                const t = this.invalid;
                this.invalid = (this.forceInvalid || null !== this.validationError) && !this.noValidate, this.invalid !== t && this.dispatchEvent(new CustomEvent("invalid-change"))
            }
            this.validateOnInit && (t.has("noValidate") || t.has("validateOnInit")) && this.requestValidate(!0)
        }
        async requestValidate(t = !0) {
            if (this.noValidate) return [];
            await this._firstUpdatePromise;
            const e = [...this._validationCustoms].filter(t => t.forElement === this || !l(t.forElement)),
                i = await Promise.all(e.map(t => t.validate())),
                s = e.map(t => t.failureText).filter((t, e) => !i[e]);
            this.validity.valid || s.unshift(this.validationMessage);
            const r = this.validationError;
            s.length > 0 && (t || this.validationError) ? this.validationError = s[0] : this.validationError = null, r !== this.validationError && (this._errors = s), await this.updateComplete
        }
        resetValidation() {
            this.invalid = !1, this.validationError = null, this._errors = [], this.childErrors.forEach((t, e) => {
                l(e) && e.resetValidation()
            }), this.childErrors = new Map
        }
        setFormValue(t) {
            this.formValue = t
        }
        setValidity(t) {
            this._validity = new p(t)
        }
        async validate() {
            return await this.requestValidate(!0), this._errors
        }
        validationCustomConnected(t) {
            this._validationCustoms.add(t), this.validateOnInit && this.requestValidate(!0)
        }
        validationCustomDisconnected(t) {
            this._validationCustoms.delete(t)
        }
        _onFormElementErrorsChange(t) {
            t.stopPropagation();
            const e = t.detail.errors;
            0 === e.length ? this.childErrors.has(t.target) && (this.childErrors.delete(t.target), this.requestUpdate("childErrors")) : (this.childErrors.set(t.target, e), this.requestUpdate("childErrors"))
        }
        _validationCustomConnected(t) {
            t.stopPropagation();
            const e = t.composedPath()[0];
            this.validationCustomConnected(e);
            const i = () => {
                e.removeEventListener("d2l-validation-custom-disconnected", i), this.validationCustomDisconnected(e)
            };
            e.addEventListener("d2l-validation-custom-disconnected", i)
        }
    },
    v = [r(".d2l-input-inline-help", !0), i `
		.d2l-input-inline-help {
			margin-top: 0.3rem !important;
			overflow-wrap: anywhere;
		}
	`],
    b = t => class extends(n(t)) {
        static get properties() {
            return {
                _hasInlineHelp: {
                    type: Boolean,
                    reflect: !0,
                    attribute: "_has-inline-help"
                }
            }
        }
        static get styles() {
            const t = [v, i `
			:host([_has-inline-help]) .d2l-input-inline-help {
				display: block;
			}
			.d2l-input-inline-help {
				display: none;
			}
		`];
            return super.styles && t.unshift(super.styles), t
        }
        constructor() {
            super(), this._hasInlineHelp = !1
        }
        _handleInlineHelpSlotChange(t) {
            const e = t.target.assignedNodes({
                flatten: !0
            });
            this._hasInlineHelp = e ? .length > 0
        }
        _renderInlineHelp(t) {
            return s `
			<div id="${t}" class="d2l-input-inline-help d2l-skeletize">
				<slot name="inline-help" @slotchange="${this._handleInlineHelpSlotChange}"></slot>
			</div>
		`
        }
    };
export {
    g as F, b as I, v as a, d as b, c, m as f, f as g, l as i, u as t
};