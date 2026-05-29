import {
    b as e
} from "./dom.js";
import {
    d as r
} from "./dedupeMixin.js";

function t(r, t, i, o) {
    const s = function(r) {
        const t = [];
        let i = e(r);
        for (; null !== i && "body" !== i ? .tagName ? .toLowerCase();) i ? .tagName && t.push(i.tagName.toLowerCase()), i = e(i);
        if (0 === t.length) return "";
        const o = t.slice(0, 10);
        return ` ${o.length} parent nodes: "${o.join(", ")}".`
    }(t);
    return `<${t.tagName.toLowerCase()}>: ${i}.${s} (@brightspace-ui/core:${r})`
}
const i = e => `"${e}" attribute is required`;

function o(e, r, o = i(r)) {
    return t("PropertyRequiredMixin", e, o)
}
const s = r(e => class extends e {
    constructor() {
        super(), this._requiredProperties = new Map, this._initProperties(Object.getPrototypeOf(this))
    }
    firstUpdated(e) {
        super.firstUpdated(e);
        for (const e of this._requiredProperties.keys()) this._validateRequiredProperty(e)
    }
    updated(e) {
        super.updated(e), this._requiredProperties.forEach((r, t) => {
            (e.has(t) || r.dependentProps.includes(t)) && this._validateRequiredProperty(t)
        })
    }
    flushRequiredPropertyErrors() {
        for (const e of this._requiredProperties.keys()) this._flushRequiredPropertyError(e)
    }
    _addRequiredProperty(e, r) {
        const t = {
            dependentProps: [],
            message: (e, r, t) => t,
            validator: (e, r, t) => t,
            ...r.required
        };
        this._requiredProperties.set(e, {
            attrName: r.attribute || e,
            dependentProps: t.dependentProps,
            message: t.message,
            thrown: !1,
            timeout: null,
            type: r.type,
            validator: t.validator
        })
    }
    _flushRequiredPropertyError(e) {
        if (!this._requiredProperties.has(e) || !this.isConnected) return;
        const r = this._requiredProperties.get(e);
        if (clearTimeout(r.timeout), r.timeout = null, void 0 !== r.type && r.type !== String) throw new Error(o(this, t = e, `only String properties can be required (property: "${t}")`));
        var t;
        const s = this[e],
            n = s ? .constructor === String && s ? .length > 0;
        if (!r.validator(s, this, n)) {
            if (r.thrown) return;
            r.thrown = !0;
            const e = o(this, r.attrName, r.message(s, this, i(r.attrName)));
            throw new TypeError(e)
        }
    }
    _initProperties(e) {
        if (null !== e) {
            this._initProperties(Object.getPrototypeOf(e));
            for (const r in e.constructor.properties) {
                const t = e.constructor.properties[r];
                t.required && this._addRequiredProperty(r, t)
            }
        }
    }
    _validateRequiredProperty(e) {
        const r = this._requiredProperties.get(e);
        clearTimeout(r.timeout), r.timeout = setTimeout(() => this._flushRequiredPropertyError(e), 3e3)
    }
});
export {
    s as P
};