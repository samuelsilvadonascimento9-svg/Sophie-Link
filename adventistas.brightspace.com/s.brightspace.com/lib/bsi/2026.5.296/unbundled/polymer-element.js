import "./boot.js";
import {
    r as t,
    p as e,
    a as r,
    b as i,
    l as s,
    c as n,
    f as a,
    o,
    d as l,
    e as p,
    g as d,
    h,
    i as _,
    j as c,
    k as u,
    m as f
} from "./settings.js";
import {
    d as m
} from "./mixin.js";
import {
    m as y
} from "./async.js";
let P = {},
    g = {};

function b(t, e) {
    P[t] = g[t.toLowerCase()] = e
}

function C(t) {
    return P[t] || g[t.toLowerCase()]
}
class T extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }
    static
    import (t, e) {
        if (t) {
            let r = C(t);
            return r && e ? r.querySelector(e) : r
        }
        return null
    }
    attributeChangedCallback(t, e, r, i) {
        e !== r && this.register()
    }
    get assetpath() {
        if (!this.__assetpath) {
            const r = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument,
                i = t(this.getAttribute("assetpath") || "", r.baseURI);
            this.__assetpath = e(i)
        }
        return this.__assetpath
    }
    register(t) {
        if (t = t || this.id) {
            if (r && void 0 !== C(t)) throw b(t, null), new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);
            this.id = t, b(t, this), (e = this).querySelector("style") && console.warn("dom-module %s has style outside template", e.id)
        }
        var e
    }
}
T.prototype.modules = P, customElements.define("dom-module", T);
const O = "shady-unscoped";

function E(t) {
    return T.import(t)
}

function v(t) {
    let e = t.body ? t.body : t;
    const r = i(e.textContent, t.baseURI),
        s = document.createElement("style");
    return s.textContent = r, s
}

function w(t) {
    const e = t.trim().split(/\s+/),
        r = [];
    for (let t = 0; t < e.length; t++) r.push(...A(e[t]));
    return r
}

function A(t) {
    const e = E(t);
    if (!e) return console.warn("Could not find style data in module named", t), [];
    if (void 0 === e._styles) {
        const t = [];
        t.push(...N(e));
        const r = e.querySelector("template");
        r && t.push(...S(r, e.assetpath)), e._styles = t
    }
    return e._styles
}

function S(t, e) {
    if (!t._styles) {
        const r = [],
            s = t.content.querySelectorAll("style");
        for (let t = 0; t < s.length; t++) {
            let n = s[t],
                a = n.getAttribute("include");
            a && r.push(...w(a).filter(function(t, e, r) {
                return r.indexOf(t) === e
            })), e && (n.textContent = i(n.textContent, e)), r.push(n)
        }
        t._styles = r
    }
    return t._styles
}

function N(t) {
    const e = [],
        r = t.querySelectorAll("link[rel=import][type~=css]");
    for (let t = 0; t < r.length; t++) {
        let i = r[t];
        if (i.import) {
            const t = i.import,
                r = i.hasAttribute(O);
            if (r && !t._unscopedStyle) {
                const e = v(t);
                e.setAttribute(O, ""), t._unscopedStyle = e
            } else t._style || (t._style = v(t));
            e.push(r ? t._unscopedStyle : t._style)
        }
    }
    return e
}

function I(t) {
    let e = t.trim().split(/\s+/),
        r = "";
    for (let t = 0; t < e.length; t++) r += x(e[t]);
    return r
}

function x(t) {
    let e = E(t);
    if (e && void 0 === e._cssText) {
        let t = function(t) {
                let e = "",
                    r = N(t);
                for (let t = 0; t < r.length; t++) e += r[t].textContent;
                return e
            }(e),
            r = e.querySelector("template");
        r && (t += function(t, e) {
            let r = "";
            const i = S(t, e);
            for (let t = 0; t < i.length; t++) {
                let e = i[t];
                e.parentNode && e.parentNode.removeChild(e), r += e.textContent
            }
            return r
        }(r, e.assetpath)), e._cssText = t || null
    }
    return e || console.warn("Could not find style data in module named", t), e && e._cssText || ""
}
const L = window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap ? window.ShadyDOM.wrap : window.ShadyDOM ? t => ShadyDOM.patch(t) : t => t;

function R(t) {
    return t.indexOf(".") >= 0
}

function H(t) {
    let e = t.indexOf(".");
    return -1 === e ? t : t.slice(0, e)
}

function M(t, e) {
    return 0 === t.indexOf(e + ".")
}

function z(t, e) {
    return 0 === e.indexOf(t + ".")
}

function D(t, e, r) {
    return e + r.slice(t.length)
}

function F(t, e) {
    return t === e || M(t, e) || z(t, e)
}

function k(t) {
    if (Array.isArray(t)) {
        let e = [];
        for (let r = 0; r < t.length; r++) {
            let i = t[r].toString().split(".");
            for (let t = 0; t < i.length; t++) e.push(i[t])
        }
        return e.join(".")
    }
    return t
}

function j(t) {
    return Array.isArray(t) ? k(t).split(".") : t.toString().split(".")
}

function B(t, e, r) {
    let i = t,
        s = j(e);
    for (let t = 0; t < s.length; t++) {
        if (!i) return;
        i = i[s[t]]
    }
    return r && (r.path = s.join(".")), i
}

function $(t, e, r) {
    let i = t,
        s = j(e),
        n = s[s.length - 1];
    if (s.length > 1) {
        for (let t = 0; t < s.length - 1; t++) {
            if (i = i[s[t]], !i) return
        }
        i[n] = r
    } else i[e] = r;
    return s.join(".")
}
const Y = {},
    U = /-[a-z]/g,
    J = /([A-Z])/g;

function q(t) {
    return Y[t] || (Y[t] = t.indexOf("-") < 0 ? t : t.replace(U, t => t[1].toUpperCase()))
}

function V(t) {
    return Y[t] || (Y[t] = t.replace(J, "-$1").toLowerCase())
}
const W = y,
    G = m(t => class extends t {
        static createProperties(t) {
            const e = this.prototype;
            for (let r in t) r in e || e._createPropertyAccessor(r)
        }
        static attributeNameForProperty(t) {
            return t.toLowerCase()
        }
        static typeForProperty(t) {}
        _createPropertyAccessor(t, e) {
            this._addPropertyToAttributeMap(t), this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor", this)) || (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor)), this.__dataHasAccessor[t] || (this.__dataHasAccessor[t] = !0, this._definePropertyAccessor(t, e))
        }
        _addPropertyToAttributeMap(t) {
            this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes", this)) || (this.__dataAttributes = Object.assign({}, this.__dataAttributes));
            let e = this.__dataAttributes[t];
            return e || (e = this.constructor.attributeNameForProperty(t), this.__dataAttributes[e] = t), e
        }
        _definePropertyAccessor(t, e) {
            Object.defineProperty(this, t, {
                get() {
                    return this.__data[t]
                },
                set: e ? function() {} : function(e) {
                    this._setPendingProperty(t, e, !0) && this._invalidateProperties()
                }
            })
        }
        constructor() {
            super(), this.__dataEnabled = !1, this.__dataReady = !1, this.__dataInvalid = !1, this.__data = {}, this.__dataPending = null, this.__dataOld = null, this.__dataInstanceProps = null, this.__dataCounter = 0, this.__serializing = !1, this._initializeProperties()
        }
        ready() {
            this.__dataReady = !0, this._flushProperties()
        }
        _initializeProperties() {
            for (let t in this.__dataHasAccessor) this.hasOwnProperty(t) && (this.__dataInstanceProps = this.__dataInstanceProps || {}, this.__dataInstanceProps[t] = this[t], delete this[t])
        }
        _initializeInstanceProperties(t) {
            Object.assign(this, t)
        }
        _setProperty(t, e) {
            this._setPendingProperty(t, e) && this._invalidateProperties()
        }
        _getProperty(t) {
            return this.__data[t]
        }
        _setPendingProperty(t, e, r) {
            let i = this.__data[t],
                s = this._shouldPropertyChange(t, e, i);
            return s && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), this.__dataOld && !(t in this.__dataOld) && (this.__dataOld[t] = i), this.__data[t] = e, this.__dataPending[t] = e), s
        }
        _isPropertyPending(t) {
            return !(!this.__dataPending || !this.__dataPending.hasOwnProperty(t))
        }
        _invalidateProperties() {
            !this.__dataInvalid && this.__dataReady && (this.__dataInvalid = !0, W.run(() => {
                this.__dataInvalid && (this.__dataInvalid = !1, this._flushProperties())
            }))
        }
        _enableProperties() {
            this.__dataEnabled || (this.__dataEnabled = !0, this.__dataInstanceProps && (this._initializeInstanceProperties(this.__dataInstanceProps), this.__dataInstanceProps = null), this.ready())
        }
        _flushProperties() {
            this.__dataCounter++;
            const t = this.__data,
                e = this.__dataPending,
                r = this.__dataOld;
            this._shouldPropertiesChange(t, e, r) && (this.__dataPending = null, this.__dataOld = null, this._propertiesChanged(t, e, r)), this.__dataCounter--
        }
        _shouldPropertiesChange(t, e, r) {
            return Boolean(e)
        }
        _propertiesChanged(t, e, r) {}
        _shouldPropertyChange(t, e, r) {
            return r !== e && (r == r || e == e)
        }
        attributeChangedCallback(t, e, r, i) {
            e !== r && this._attributeToProperty(t, r), super.attributeChangedCallback && super.attributeChangedCallback(t, e, r, i)
        }
        _attributeToProperty(t, e, r) {
            if (!this.__serializing) {
                const i = this.__dataAttributes,
                    s = i && i[t] || t;
                this[s] = this._deserializeValue(e, r || this.constructor.typeForProperty(s))
            }
        }
        _propertyToAttribute(t, e, r) {
            this.__serializing = !0, r = arguments.length < 3 ? this[t] : r, this._valueToNodeAttribute(this, r, e || this.constructor.attributeNameForProperty(t)), this.__serializing = !1
        }
        _valueToNodeAttribute(t, e, r) {
            const i = this._serializeValue(e);
            "class" !== r && "name" !== r && "slot" !== r || (t = L(t)), void 0 === i ? t.removeAttribute(r) : t.setAttribute(r, "" === i && window.trustedTypes ? window.trustedTypes.emptyScript : i)
        }
        _serializeValue(t) {
            return "boolean" == typeof t ? t ? "" : void 0 : null != t ? t.toString() : void 0
        }
        _deserializeValue(t, e) {
            switch (e) {
                case Boolean:
                    return null !== t;
                case Number:
                    return Number(t);
                default:
                    return t
            }
        }
    }),
    X = {};
let Z = HTMLElement.prototype;
for (; Z;) {
    let t = Object.getOwnPropertyNames(Z);
    for (let e = 0; e < t.length; e++) X[t[e]] = !0;
    Z = Object.getPrototypeOf(Z)
}
const K = window.trustedTypes ? t => trustedTypes.isHTML(t) || trustedTypes.isScript(t) || trustedTypes.isScriptURL(t) : () => !1;
const Q = m(t => {
        const e = G(t);
        return class extends e {
            static createPropertiesForAttributes() {
                let t = this.observedAttributes;
                for (let e = 0; e < t.length; e++) this.prototype._createPropertyAccessor(q(t[e]))
            }
            static attributeNameForProperty(t) {
                return V(t)
            }
            _initializeProperties() {
                this.__dataProto && (this._initializeProtoProperties(this.__dataProto), this.__dataProto = null), super._initializeProperties()
            }
            _initializeProtoProperties(t) {
                for (let e in t) this._setProperty(e, t[e])
            }
            _ensureAttribute(t, e) {
                const r = this;
                r.hasAttribute(t) || this._valueToNodeAttribute(r, e, t)
            }
            _serializeValue(t) {
                if ("object" == typeof t) {
                    if (t instanceof Date) return t.toString();
                    if (t) {
                        if (K(t)) return t;
                        try {
                            return JSON.stringify(t)
                        } catch (t) {
                            return ""
                        }
                    }
                }
                return super._serializeValue(t)
            }
            _deserializeValue(t, e) {
                let r;
                switch (e) {
                    case Object:
                        try {
                            r = JSON.parse(t)
                        } catch (e) {
                            r = t
                        }
                        break;
                    case Array:
                        try {
                            r = JSON.parse(t)
                        } catch (e) {
                            r = null, console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)
                        }
                        break;
                    case Date:
                        r = isNaN(t) ? String(t) : Number(t), r = new Date(r);
                        break;
                    default:
                        r = super._deserializeValue(t, e)
                }
                return r
            }
            _definePropertyAccessor(t, e) {
                ! function(t, e) {
                    if (!X[e]) {
                        let r = t[e];
                        void 0 !== r && (t.__data ? t._setPendingProperty(e, r) : (t.__dataProto ? t.hasOwnProperty(JSCompiler_renameProperty("__dataProto", t)) || (t.__dataProto = Object.create(t.__dataProto)) : t.__dataProto = {}, t.__dataProto[e] = r))
                    }
                }(this, t), super._definePropertyAccessor(t, e)
            }
            _hasAccessor(t) {
                return this.__dataHasAccessor && this.__dataHasAccessor[t]
            }
            _isPropertyPending(t) {
                return Boolean(this.__dataPending && t in this.__dataPending)
            }
        }
    }),
    tt = {
        "dom-if": !0,
        "dom-repeat": !0
    };
let et = !1,
    rt = !1;

function it(t) {
    (function() {
        if (!et) {
            et = !0;
            const t = document.createElement("textarea");
            t.placeholder = "a", rt = t.placeholder === t.textContent
        }
        return rt
    })() && "textarea" === t.localName && t.placeholder && t.placeholder === t.textContent && (t.textContent = null)
}
const st = (() => {
    const t = window.trustedTypes && window.trustedTypes.createPolicy("polymer-template-event-attribute-policy", {
        createScript: t => t
    });
    return (e, r, i) => {
        const s = r.getAttribute(i);
        t && i.startsWith("on-") ? e.setAttribute(i, t.createScript(s, i)) : e.setAttribute(i, s)
    }
})();

function nt(t) {
    let e = t.getAttribute("is");
    if (e && tt[e]) {
        let r = t;
        for (r.removeAttribute("is"), t = r.ownerDocument.createElement(e), r.parentNode.replaceChild(t, r), t.appendChild(r); r.attributes.length;) {
            const {
                name: e
            } = r.attributes[0];
            st(t, r, e), r.removeAttribute(e)
        }
    }
    return t
}

function at(t, e) {
    let r = e.parentInfo && at(t, e.parentInfo);
    if (!r) return t;
    for (let t = r.firstChild, i = 0; t; t = t.nextSibling)
        if (e.parentIndex === i++) return t
}

function ot(t, e, r, i) {
    i.id && (e[i.id] = r)
}

function lt(t, e, r) {
    if (r.events && r.events.length)
        for (let i, s = 0, n = r.events; s < n.length && (i = n[s]); s++) t._addMethodEventListenerToNode(e, i.name, i.value, t)
}

function pt(t, e, r, i) {
    r.templateInfo && (e._templateInfo = r.templateInfo, e._parentTemplateInfo = i)
}
const dt = m(t => class extends t {
    static _parseTemplate(t, e) {
        if (!t._templateInfo) {
            let r = t._templateInfo = {};
            r.nodeInfoList = [], r.nestedTemplate = Boolean(e), r.stripWhiteSpace = e && e.stripWhiteSpace || t.hasAttribute && t.hasAttribute("strip-whitespace"), this._parseTemplateContent(t, r, {
                parent: null
            })
        }
        return t._templateInfo
    }
    static _parseTemplateContent(t, e, r) {
        return this._parseTemplateNode(t.content, e, r)
    }
    static _parseTemplateNode(t, e, r) {
        let i = !1,
            s = t;
        return "template" != s.localName || s.hasAttribute("preserve-content") ? "slot" === s.localName && (e.hasInsertionPoint = !0) : i = this._parseTemplateNestedTemplate(s, e, r) || i, it(s), s.firstChild && this._parseTemplateChildNodes(s, e, r), s.hasAttributes && s.hasAttributes() && (i = this._parseTemplateNodeAttributes(s, e, r) || i), i || r.noted
    }
    static _parseTemplateChildNodes(t, e, r) {
        if ("script" !== t.localName && "style" !== t.localName)
            for (let i, s = t.firstChild, n = 0; s; s = i) {
                if ("template" == s.localName && (s = nt(s)), i = s.nextSibling, s.nodeType === Node.TEXT_NODE) {
                    let r = i;
                    for (; r && r.nodeType === Node.TEXT_NODE;) s.textContent += r.textContent, i = r.nextSibling, t.removeChild(r), r = i;
                    if (e.stripWhiteSpace && !s.textContent.trim()) {
                        t.removeChild(s);
                        continue
                    }
                }
                let a = {
                    parentIndex: n,
                    parentInfo: r
                };
                this._parseTemplateNode(s, e, a) && (a.infoIndex = e.nodeInfoList.push(a) - 1), s.parentNode && n++
            }
    }
    static _parseTemplateNestedTemplate(t, e, r) {
        let i = t,
            s = this._parseTemplate(i, e);
        return (s.content = i.content.ownerDocument.createDocumentFragment()).appendChild(i.content), r.templateInfo = s, !0
    }
    static _parseTemplateNodeAttributes(t, e, r) {
        let i = !1,
            s = Array.from(t.attributes);
        for (let n, a = s.length - 1; n = s[a]; a--) i = this._parseTemplateNodeAttribute(t, e, r, n.name, n.value) || i;
        return i
    }
    static _parseTemplateNodeAttribute(t, e, r, i, s) {
        return "on-" === i.slice(0, 3) ? (t.removeAttribute(i), r.events = r.events || [], r.events.push({
            name: i.slice(3),
            value: s
        }), !0) : "id" === i && (r.id = s, !0)
    }
    static _contentForTemplate(t) {
        let e = t._templateInfo;
        return e && e.content || t.content
    }
    _stampTemplate(t, e) {
        t && !t.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(t);
        let r = (e = e || this.constructor._parseTemplate(t)).nodeInfoList,
            i = e.content || t.content,
            s = document.importNode(i, !0);
        s.__noInsertionPoint = !e.hasInsertionPoint;
        let n = s.nodeList = new Array(r.length);
        s.$ = {};
        for (let t, i = 0, a = r.length; i < a && (t = r[i]); i++) {
            let r = n[i] = at(s, t);
            ot(0, s.$, r, t), pt(0, r, t, e), lt(this, r, t)
        }
        return s
    }
    _addMethodEventListenerToNode(t, e, r, i) {
        let s = function(t, e, r) {
            return t = t._methodHost || t,
                function(e) {
                    t[r] ? t[r](e, e.detail) : console.warn("listener method `" + r + "` not defined")
                }
        }(i = i || t, 0, r);
        return this._addEventListenerToNode(t, e, s), s
    }
    _addEventListenerToNode(t, e, r) {
        t.addEventListener(e, r)
    }
    _removeEventListenerFromNode(t, e, r) {
        t.removeEventListener(e, r)
    }
});
let ht = 0;
const _t = [],
    ct = {
        COMPUTE: "__computeEffects",
        REFLECT: "__reflectEffects",
        NOTIFY: "__notifyEffects",
        PROPAGATE: "__propagateEffects",
        OBSERVE: "__observeEffects",
        READ_ONLY: "__readOnly"
    },
    ut = "__computeInfo",
    ft = /[A-Z]/;

function mt(t, e, r) {
    let i = t[e];
    if (i) {
        if (!t.hasOwnProperty(e) && (i = t[e] = Object.create(t[e]), r))
            for (let t in i) {
                let e = i[t],
                    r = i[t] = Array(e.length);
                for (let t = 0; t < e.length; t++) r[t] = e[t]
            }
    } else i = t[e] = {};
    return i
}

function yt(t, e, r, i, s, n) {
    if (e) {
        let a = !1;
        const o = ht++;
        for (let l in r) {
            let p = e[s ? H(l) : l];
            if (p)
                for (let e, d = 0, h = p.length; d < h && (e = p[d]); d++) e.info && e.info.lastRun === o || s && !gt(l, e.trigger) || (e.info && (e.info.lastRun = o), e.fn(t, l, r, i, e.info, s, n), a = !0)
        }
        return a
    }
    return !1
}

function Pt(t, e, r, i, s, n, a, o) {
    let l = !1,
        p = e[a ? H(i) : i];
    if (p)
        for (let e, d = 0, h = p.length; d < h && (e = p[d]); d++) e.info && e.info.lastRun === r || a && !gt(i, e.trigger) || (e.info && (e.info.lastRun = r), e.fn(t, i, s, n, e.info, a, o), l = !0);
    return l
}

function gt(t, e) {
    if (e) {
        let r = e.name;
        return r == t || !(!e.structured || !M(r, t)) || !(!e.wildcard || !z(r, t))
    }
    return !0
}

function bt(t, e, r, i, s) {
    let n = "string" == typeof s.method ? t[s.method] : s.method,
        a = s.property;
    n ? n.call(t, t.__data[a], i[a]) : s.dynamicFn || console.warn("observer method `" + s.method + "` not defined")
}

function Ct(t, e, r) {
    let i = H(e);
    if (i !== e) {
        return Tt(t, V(i) + "-changed", r[e], e), !0
    }
    return !1
}

function Tt(t, e, r, i) {
    let s = {
        value: r,
        queueProperty: !0
    };
    i && (s.path = i), L(t).dispatchEvent(new CustomEvent(e, {
        detail: s
    }))
}

function Ot(t, e, r, i, s, n) {
    let a = (n ? H(e) : e) != e ? e : null,
        o = a ? B(t, a) : t.__data[e];
    a && void 0 === o && (o = r[e]), Tt(t, s.eventName, o, a)
}

function Et(t, e, r, i, s) {
    let n = t.__data[e];
    l && (n = l(n, s.attrName, "attribute", t)), t._propertyToAttribute(e, s.attrName, n)
}

function vt(t, e, r, i) {
    let s = t[ct.COMPUTE];
    if (s)
        if (o) {
            ht++;
            const n = function(t) {
                    let e = t.constructor.__orderedComputedDeps;
                    if (!e) {
                        e = new Map;
                        const r = t[ct.COMPUTE];
                        let i, {
                            counts: s,
                            ready: n,
                            total: a
                        } = function(t) {
                            const e = t[ut],
                                r = {},
                                i = t[ct.COMPUTE],
                                s = [];
                            let n = 0;
                            for (let t in e) {
                                const i = e[t];
                                n += r[t] = i.args.filter(t => !t.literal).length + (i.dynamicFn ? 1 : 0)
                            }
                            for (let t in i) e[t] || s.push(t);
                            return {
                                counts: r,
                                ready: s,
                                total: n
                            }
                        }(t);
                        for (; i = n.shift();) {
                            e.set(i, e.size);
                            const t = r[i];
                            t && t.forEach(t => {
                                const e = t.info.methodInfo;
                                --a, 0 === --s[e] && n.push(e)
                            })
                        }
                        if (0 !== a) {
                            const e = t;
                            console.warn(`Computed graph for ${e.localName} incomplete; circular?`)
                        }
                        t.constructor.__orderedComputedDeps = e
                    }
                    return e
                }(t),
                a = [];
            for (let t in e) At(t, s, a, n, i);
            let o;
            for (; o = a.shift();) St(t, "", e, r, o) && At(o.methodInfo, s, a, n, i);
            Object.assign(r, t.__dataOld), Object.assign(e, t.__dataPending), t.__dataPending = null
        } else {
            let n = e;
            for (; yt(t, s, n, r, i);) Object.assign(r, t.__dataOld), Object.assign(e, t.__dataPending), n = t.__dataPending, t.__dataPending = null
        }
}
const wt = (t, e, r) => {
        let i = 0,
            s = e.length - 1,
            n = -1;
        for (; i <= s;) {
            const a = i + s >> 1,
                o = r.get(e[a].methodInfo) - r.get(t.methodInfo);
            if (o < 0) i = a + 1;
            else {
                if (!(o > 0)) {
                    n = a;
                    break
                }
                s = a - 1
            }
        }
        n < 0 && (n = s + 1), e.splice(n, 0, t)
    },
    At = (t, e, r, i, s) => {
        const n = e[s ? H(t) : t];
        if (n)
            for (let e = 0; e < n.length; e++) {
                const a = n[e];
                a.info.lastRun === ht || s && !gt(t, a.trigger) || (a.info.lastRun = ht, wt(a.info, r, i))
            }
    };

function St(t, e, r, i, s) {
    let n = Mt(t, e, r, i, s);
    if (n === _t) return !1;
    let a = s.methodInfo;
    return t.__dataHasAccessor && t.__dataHasAccessor[a] ? t._setPendingProperty(a, n, !0) : (t[a] = n, !1)
}

function Nt(t, e, r, i, s, n, a) {
    r.bindings = r.bindings || [];
    let o = {
        kind: i,
        target: s,
        parts: n,
        literal: a,
        isCompound: 1 !== n.length
    };
    if (r.bindings.push(o), function(t) {
            return Boolean(t.target) && "attribute" != t.kind && "text" != t.kind && !t.isCompound && "{" === t.parts[0].mode
        }(o)) {
        let {
            event: t,
            negate: e
        } = o.parts[0];
        o.listenerEvent = t || V(s) + "-changed", o.listenerNegate = e
    }
    let l = e.nodeInfoList.length;
    for (let r = 0; r < o.parts.length; r++) {
        let i = o.parts[r];
        i.compoundIndex = r, It(t, e, o, i, l)
    }
}

function It(t, e, r, i, s) {
    if (!i.literal)
        if ("attribute" === r.kind && "-" === r.target[0]) console.warn("Cannot set attribute " + r.target + ' because "-" is not a valid attribute starting character');
        else {
            let n = i.dependencies,
                a = {
                    index: s,
                    binding: r,
                    part: i,
                    evaluator: t
                };
            for (let r = 0; r < n.length; r++) {
                let i = n[r];
                "string" == typeof i && (i = $t(i), i.wildcard = !0), t._addTemplatePropertyEffect(e, i.rootProperty, {
                    fn: xt,
                    info: a,
                    trigger: i
                })
            }
        }
}

function xt(t, e, r, i, s, n, a) {
    let o = a[s.index],
        p = s.binding,
        d = s.part;
    if (n && d.source && e.length > d.source.length && "property" == p.kind && !p.isCompound && o.__isPropertyEffectsClient && o.__dataHasAccessor && o.__dataHasAccessor[p.target]) {
        let i = r[e];
        e = D(d.source, p.target, e), o._setPendingPropertyOrPath(e, i, !1, !0) && t._enqueueClient(o)
    } else {
        let a = s.evaluator._evaluateBinding(t, d, e, r, i, n);
        a !== _t && function(t, e, r, i, s) {
            s = function(t, e, r, i) {
                if (r.isCompound) {
                    let s = t.__dataCompoundStorage[r.target];
                    s[i.compoundIndex] = e, e = s.join("")
                }
                "attribute" !== r.kind && ("textContent" !== r.target && ("value" !== r.target || "input" !== t.localName && "textarea" !== t.localName) || (e = null == e ? "" : e));
                return e
            }(e, s, r, i), l && (s = l(s, r.target, r.kind, e));
            if ("attribute" == r.kind) t._valueToNodeAttribute(e, s, r.target);
            else {
                let i = r.target;
                e.__isPropertyEffectsClient && e.__dataHasAccessor && e.__dataHasAccessor[i] ? e[ct.READ_ONLY] && e[ct.READ_ONLY][i] || e._setPendingProperty(i, s) && t._enqueueClient(e) : t._setUnmanagedPropertyToNode(e, i, s)
            }
        }(t, o, p, d, a)
    }
}

function Lt(t, e) {
    if (e.isCompound) {
        let r = t.__dataCompoundStorage || (t.__dataCompoundStorage = {}),
            i = e.parts,
            s = new Array(i.length);
        for (let t = 0; t < i.length; t++) s[t] = i[t].literal;
        let n = e.target;
        r[n] = s, e.literal && "property" == e.kind && ("className" === n && (t = L(t)), t[n] = e.literal)
    }
}

function Rt(t, e, r) {
    if (r.listenerEvent) {
        let i = r.parts[0];
        t.addEventListener(r.listenerEvent, function(t) {
            ! function(t, e, r, i, s) {
                let n, a = t.detail,
                    o = a && a.path;
                o ? (i = D(r, i, o), n = a && a.value) : n = t.currentTarget[r], n = s ? !n : n, e[ct.READ_ONLY] && e[ct.READ_ONLY][i] || !e._setPendingPropertyOrPath(i, n, !0, Boolean(o)) || a && a.queueProperty || e._invalidateProperties()
            }(t, e, r.target, i.source, i.negate)
        })
    }
}

function Ht(t, e, r, i, s, n) {
    n = e.static || n && ("object" != typeof n || n[e.methodName]);
    let a = {
        methodName: e.methodName,
        args: e.args,
        methodInfo: s,
        dynamicFn: n
    };
    for (let s, n = 0; n < e.args.length && (s = e.args[n]); n++) s.literal || t._addPropertyEffect(s.rootProperty, r, {
        fn: i,
        info: a,
        trigger: s
    });
    return n && t._addPropertyEffect(e.methodName, r, {
        fn: i,
        info: a
    }), a
}

function Mt(t, e, r, i, s) {
    let n = t._methodHost || t,
        a = n[s.methodName];
    if (a) {
        let i = t._marshalArgs(s.args, e, r);
        return i === _t ? _t : a.apply(n, i)
    }
    s.dynamicFn || console.warn("method `" + s.methodName + "` not defined")
}
const zt = [],
    Dt = "(?:[a-zA-Z_$][\\w.:$\\-*]*)",
    Ft = "(?:(" + Dt + "|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)",
    kt = new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?" + ("(" + Dt + "\\s*" + ("(?:\\(\\s*(?:" + ("(?:" + Ft + "(?:,\\s*" + Ft + ")*)") + "?)\\)\\s*)") + "?)") + "(?:]]|}})", "g");

function jt(t) {
    let e = "";
    for (let r = 0; r < t.length; r++) {
        e += t[r].literal || ""
    }
    return e
}

function Bt(t) {
    let e = t.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (e) {
        let t = {
            methodName: e[1],
            static: !0,
            args: zt
        };
        if (e[2].trim()) {
            return function(t, e) {
                return e.args = t.map(function(t) {
                    let r = $t(t);
                    return r.literal || (e.static = !1), r
                }, this), e
            }(e[2].replace(/\\,/g, "&comma;").split(","), t)
        }
        return t
    }
    return null
}

function $t(t) {
    let e = t.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"),
        r = {
            name: e,
            value: "",
            literal: !1
        },
        i = e[0];
    switch ("-" === i && (i = e[1]), i >= "0" && i <= "9" && (i = "#"), i) {
        case "'":
        case '"':
            r.value = e.slice(1, -1), r.literal = !0;
            break;
        case "#":
            r.value = Number(e), r.literal = !0
    }
    return r.literal || (r.rootProperty = H(e), r.structured = R(e), r.structured && (r.wildcard = ".*" == e.slice(-2), r.wildcard && (r.name = e.slice(0, -2)))), r
}

function Yt(t, e, r) {
    let i = B(t, r);
    return void 0 === i && (i = e[r]), i
}

function Ut(t, e, r, i) {
    const n = {
        indexSplices: i
    };
    s && !t._overrideLegacyUndefined && (e.splices = n), t.notifyPath(r + ".splices", n), t.notifyPath(r + ".length", e.length), s && !t._overrideLegacyUndefined && (n.indexSplices = [])
}

function Jt(t, e, r, i, s, n) {
    Ut(t, e, r, [{
        index: i,
        addedCount: s,
        removed: n,
        object: e,
        type: "splice"
    }])
}
const qt = m(t => {
        const e = dt(Q(t));
        return class extends e {
            constructor() {
                super(), this.__isPropertyEffectsClient = !0, this.__dataClientsReady, this.__dataPendingClients, this.__dataToNotify, this.__dataLinkedPaths, this.__dataHasPaths, this.__dataCompoundStorage, this.__dataHost, this.__dataTemp, this.__dataClientsInitialized, this.__data, this.__dataPending, this.__dataOld, this.__computeEffects, this.__computeInfo, this.__reflectEffects, this.__notifyEffects, this.__propagateEffects, this.__observeEffects, this.__readOnly, this.__templateInfo, this._overrideLegacyUndefined
            }
            get PROPERTY_EFFECT_TYPES() {
                return ct
            }
            _initializeProperties() {
                super._initializeProperties(), this._registerHost(), this.__dataClientsReady = !1, this.__dataPendingClients = null, this.__dataToNotify = null, this.__dataLinkedPaths = null, this.__dataHasPaths = !1, this.__dataCompoundStorage = this.__dataCompoundStorage || null, this.__dataHost = this.__dataHost || null, this.__dataTemp = {}, this.__dataClientsInitialized = !1
            }
            _registerHost() {
                if (Vt.length) {
                    let t = Vt[Vt.length - 1];
                    t._enqueueClient(this), this.__dataHost = t
                }
            }
            _initializeProtoProperties(t) {
                this.__data = Object.create(t), this.__dataPending = Object.create(t), this.__dataOld = {}
            }
            _initializeInstanceProperties(t) {
                let e = this[ct.READ_ONLY];
                for (let r in t) e && e[r] || (this.__dataPending = this.__dataPending || {}, this.__dataOld = this.__dataOld || {}, this.__data[r] = this.__dataPending[r] = t[r])
            }
            _addPropertyEffect(t, e, r) {
                this._createPropertyAccessor(t, e == ct.READ_ONLY);
                let i = mt(this, e, !0)[t];
                i || (i = this[e][t] = []), i.push(r)
            }
            _removePropertyEffect(t, e, r) {
                let i = mt(this, e, !0)[t],
                    s = i.indexOf(r);
                s >= 0 && i.splice(s, 1)
            }
            _hasPropertyEffect(t, e) {
                let r = this[e];
                return Boolean(r && r[t])
            }
            _hasReadOnlyEffect(t) {
                return this._hasPropertyEffect(t, ct.READ_ONLY)
            }
            _hasNotifyEffect(t) {
                return this._hasPropertyEffect(t, ct.NOTIFY)
            }
            _hasReflectEffect(t) {
                return this._hasPropertyEffect(t, ct.REFLECT)
            }
            _hasComputedEffect(t) {
                return this._hasPropertyEffect(t, ct.COMPUTE)
            }
            _setPendingPropertyOrPath(t, e, r, i) {
                if (i || H(Array.isArray(t) ? t[0] : t) !== t) {
                    if (!i) {
                        let r = B(this, t);
                        if (!(t = $(this, t, e)) || !super._shouldPropertyChange(t, e, r)) return !1
                    }
                    if (this.__dataHasPaths = !0, this._setPendingProperty(t, e, r)) return function(t, e, r) {
                        let i = t.__dataLinkedPaths;
                        if (i) {
                            let s;
                            for (let n in i) {
                                let a = i[n];
                                z(n, e) ? (s = D(n, a, e), t._setPendingPropertyOrPath(s, r, !0, !0)) : z(a, e) && (s = D(a, n, e), t._setPendingPropertyOrPath(s, r, !0, !0))
                            }
                        }
                    }(this, t, e), !0
                } else {
                    if (this.__dataHasAccessor && this.__dataHasAccessor[t]) return this._setPendingProperty(t, e, r);
                    this[t] = e
                }
                return !1
            }
            _setUnmanagedPropertyToNode(t, e, r) {
                r === t[e] && "object" != typeof r || ("className" === e && (t = L(t)), t[e] = r)
            }
            _setPendingProperty(t, e, r) {
                let i = this.__dataHasPaths && R(t),
                    s = i ? this.__dataTemp : this.__data;
                return !!this._shouldPropertyChange(t, e, s[t]) && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), t in this.__dataOld || (this.__dataOld[t] = this.__data[t]), i ? this.__dataTemp[t] = e : this.__data[t] = e, this.__dataPending[t] = e, (i || this[ct.NOTIFY] && this[ct.NOTIFY][t]) && (this.__dataToNotify = this.__dataToNotify || {}, this.__dataToNotify[t] = r), !0)
            }
            _setProperty(t, e) {
                this._setPendingProperty(t, e, !0) && this._invalidateProperties()
            }
            _invalidateProperties() {
                this.__dataReady && this._flushProperties()
            }
            _enqueueClient(t) {
                this.__dataPendingClients = this.__dataPendingClients || [], t !== this && this.__dataPendingClients.push(t)
            }
            _flushClients() {
                this.__dataClientsReady ? this.__enableOrFlushClients() : (this.__dataClientsReady = !0, this._readyClients(), this.__dataReady = !0)
            }
            __enableOrFlushClients() {
                let t = this.__dataPendingClients;
                if (t) {
                    this.__dataPendingClients = null;
                    for (let e = 0; e < t.length; e++) {
                        let r = t[e];
                        r.__dataEnabled ? r.__dataPending && r._flushProperties() : r._enableProperties()
                    }
                }
            }
            _readyClients() {
                this.__enableOrFlushClients()
            }
            setProperties(t, e) {
                for (let r in t) !e && this[ct.READ_ONLY] && this[ct.READ_ONLY][r] || this._setPendingPropertyOrPath(r, t[r], !0);
                this._invalidateProperties()
            }
            ready() {
                this._flushProperties(), this.__dataClientsReady || this._flushClients(), this.__dataPending && this._flushProperties()
            }
            _propertiesChanged(t, e, r) {
                let i, s = this.__dataHasPaths;
                this.__dataHasPaths = !1, vt(this, e, r, s), i = this.__dataToNotify, this.__dataToNotify = null, this._propagatePropertyChanges(e, r, s), this._flushClients(), yt(this, this[ct.REFLECT], e, r, s), yt(this, this[ct.OBSERVE], e, r, s), i && function(t, e, r, i, s) {
                    let n, a, o = t[ct.NOTIFY],
                        l = ht++;
                    for (let a in e) e[a] && (o && Pt(t, o, l, a, r, i, s) || s && Ct(t, a, r)) && (n = !0);
                    n && (a = t.__dataHost) && a._invalidateProperties && a._invalidateProperties()
                }(this, i, e, r, s), 1 == this.__dataCounter && (this.__dataTemp = {})
            }
            _propagatePropertyChanges(t, e, r) {
                this[ct.PROPAGATE] && yt(this, this[ct.PROPAGATE], t, e, r), this.__templateInfo && this._runEffectsForTemplate(this.__templateInfo, t, e, r)
            }
            _runEffectsForTemplate(t, e, r, i) {
                const s = (e, i) => {
                    yt(this, t.propertyEffects, e, r, i, t.nodeList);
                    for (let s = t.firstChild; s; s = s.nextSibling) this._runEffectsForTemplate(s, e, r, i)
                };
                t.runEffects ? t.runEffects(s, e, i) : s(e, i)
            }
            linkPaths(t, e) {
                t = k(t), e = k(e), this.__dataLinkedPaths = this.__dataLinkedPaths || {}, this.__dataLinkedPaths[t] = e
            }
            unlinkPaths(t) {
                t = k(t), this.__dataLinkedPaths && delete this.__dataLinkedPaths[t]
            }
            notifySplices(t, e) {
                let r = {
                    path: ""
                };
                Ut(this, B(this, t, r), r.path, e)
            }
            get(t, e) {
                return B(e || this, t)
            }
            set(t, e, r) {
                r ? $(r, t, e) : this[ct.READ_ONLY] && this[ct.READ_ONLY][t] || this._setPendingPropertyOrPath(t, e, !0) && this._invalidateProperties()
            }
            push(t, ...e) {
                let r = {
                        path: ""
                    },
                    i = B(this, t, r),
                    s = i.length,
                    n = i.push(...e);
                return e.length && Jt(this, i, r.path, s, e.length, []), n
            }
            pop(t) {
                let e = {
                        path: ""
                    },
                    r = B(this, t, e),
                    i = Boolean(r.length),
                    s = r.pop();
                return i && Jt(this, r, e.path, r.length, 0, [s]), s
            }
            splice(t, e, r, ...i) {
                let s, n = {
                        path: ""
                    },
                    a = B(this, t, n);
                return e < 0 ? e = a.length - Math.floor(-e) : e && (e = Math.floor(e)), s = 2 === arguments.length ? a.splice(e) : a.splice(e, r, ...i), (i.length || s.length) && Jt(this, a, n.path, e, i.length, s), s
            }
            shift(t) {
                let e = {
                        path: ""
                    },
                    r = B(this, t, e),
                    i = Boolean(r.length),
                    s = r.shift();
                return i && Jt(this, r, e.path, 0, 0, [s]), s
            }
            unshift(t, ...e) {
                let r = {
                        path: ""
                    },
                    i = B(this, t, r),
                    s = i.unshift(...e);
                return e.length && Jt(this, i, r.path, 0, e.length, []), s
            }
            notifyPath(t, e) {
                let r;
                if (1 == arguments.length) {
                    let i = {
                        path: ""
                    };
                    e = B(this, t, i), r = i.path
                } else r = Array.isArray(t) ? k(t) : t;
                this._setPendingPropertyOrPath(r, e, !0, !0) && this._invalidateProperties()
            }
            _createReadOnlyProperty(t, e) {
                var r;
                this._addPropertyEffect(t, ct.READ_ONLY), e && (this["_set" + (r = t, r[0].toUpperCase() + r.substring(1))] = function(e) {
                    this._setProperty(t, e)
                })
            }
            _createPropertyObserver(t, e, r) {
                let i = {
                    property: t,
                    method: e,
                    dynamicFn: Boolean(r)
                };
                this._addPropertyEffect(t, ct.OBSERVE, {
                    fn: bt,
                    info: i,
                    trigger: {
                        name: t
                    }
                }), r && this._addPropertyEffect(e, ct.OBSERVE, {
                    fn: bt,
                    info: i,
                    trigger: {
                        name: e
                    }
                })
            }
            _createMethodObserver(t, e) {
                let r = Bt(t);
                if (!r) throw new Error("Malformed observer expression '" + t + "'");
                Ht(this, r, ct.OBSERVE, Mt, null, e)
            }
            _createNotifyingProperty(t) {
                this._addPropertyEffect(t, ct.NOTIFY, {
                    fn: Ot,
                    info: {
                        eventName: V(t) + "-changed",
                        property: t
                    }
                })
            }
            _createReflectedProperty(t) {
                let e = this.constructor.attributeNameForProperty(t);
                "-" === e[0] ? console.warn("Property " + t + " cannot be reflected to attribute " + e + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.') : this._addPropertyEffect(t, ct.REFLECT, {
                    fn: Et,
                    info: {
                        attrName: e
                    }
                })
            }
            _createComputedProperty(t, e, r) {
                let i = Bt(e);
                if (!i) throw new Error("Malformed computed expression '" + e + "'");
                const s = Ht(this, i, ct.COMPUTE, St, t, r);
                mt(this, ut)[t] = s
            }
            _marshalArgs(t, e, r) {
                const i = this.__data,
                    n = [];
                for (let a = 0, o = t.length; a < o; a++) {
                    let {
                        name: o,
                        structured: l,
                        wildcard: p,
                        value: d,
                        literal: h
                    } = t[a];
                    if (!h)
                        if (p) {
                            const t = z(o, e),
                                s = Yt(i, r, t ? e : o);
                            d = {
                                path: t ? e : o,
                                value: s,
                                base: t ? B(i, o) : s
                            }
                        } else d = l ? Yt(i, r, o) : i[o];
                    if (s && !this._overrideLegacyUndefined && void 0 === d && t.length > 1) return _t;
                    n[a] = d
                }
                return n
            }
            static addPropertyEffect(t, e, r) {
                this.prototype._addPropertyEffect(t, e, r)
            }
            static createPropertyObserver(t, e, r) {
                this.prototype._createPropertyObserver(t, e, r)
            }
            static createMethodObserver(t, e) {
                this.prototype._createMethodObserver(t, e)
            }
            static createNotifyingProperty(t) {
                this.prototype._createNotifyingProperty(t)
            }
            static createReadOnlyProperty(t, e) {
                this.prototype._createReadOnlyProperty(t, e)
            }
            static createReflectedProperty(t) {
                this.prototype._createReflectedProperty(t)
            }
            static createComputedProperty(t, e, r) {
                this.prototype._createComputedProperty(t, e, r)
            }
            static bindTemplate(t) {
                return this.prototype._bindTemplate(t)
            }
            _bindTemplate(t, e) {
                let r = this.constructor._parseTemplate(t),
                    i = this.__preBoundTemplateInfo == r;
                if (!i)
                    for (let t in r.propertyEffects) this._createPropertyAccessor(t);
                if (e)
                    if (r = Object.create(r), r.wasPreBound = i, this.__templateInfo) {
                        const e = t._parentTemplateInfo || this.__templateInfo,
                            i = e.lastChild;
                        r.parent = e, e.lastChild = r, r.previousSibling = i, i ? i.nextSibling = r : e.firstChild = r
                    } else this.__templateInfo = r;
                else this.__preBoundTemplateInfo = r;
                return r
            }
            static _addTemplatePropertyEffect(t, e, r) {
                (t.hostProps = t.hostProps || {})[e] = !0;
                let i = t.propertyEffects = t.propertyEffects || {};
                (i[e] = i[e] || []).push(r)
            }
            _stampTemplate(t, e) {
                e = e || this._bindTemplate(t, !0), Vt.push(this);
                let r = super._stampTemplate(t, e);
                if (Vt.pop(), e.nodeList = r.nodeList, !e.wasPreBound) {
                    let t = e.childNodes = [];
                    for (let e = r.firstChild; e; e = e.nextSibling) t.push(e)
                }
                return r.templateInfo = e,
                    function(t, e) {
                        let {
                            nodeList: r,
                            nodeInfoList: i
                        } = e;
                        if (i.length)
                            for (let e = 0; e < i.length; e++) {
                                let s = i[e],
                                    n = r[e],
                                    a = s.bindings;
                                if (a)
                                    for (let e = 0; e < a.length; e++) {
                                        let r = a[e];
                                        Lt(n, r), Rt(n, t, r)
                                    }
                                n.__dataHost = t
                            }
                    }(this, e), this.__dataClientsReady && (this._runEffectsForTemplate(e, this.__data, null, !1), this._flushClients()), r
            }
            _removeBoundDom(t) {
                const e = t.templateInfo,
                    {
                        previousSibling: r,
                        nextSibling: i,
                        parent: s
                    } = e;
                r ? r.nextSibling = i : s && (s.firstChild = i), i ? i.previousSibling = r : s && (s.lastChild = r), e.nextSibling = e.previousSibling = null;
                let n = e.childNodes;
                for (let t = 0; t < n.length; t++) {
                    let e = n[t];
                    L(L(e).parentNode).removeChild(e)
                }
            }
            static _parseTemplateNode(t, r, i) {
                let s = e._parseTemplateNode.call(this, t, r, i);
                if (t.nodeType === Node.TEXT_NODE) {
                    let e = this._parseBindings(t.textContent, r);
                    e && (t.textContent = jt(e) || " ", Nt(this, r, i, "text", "textContent", e), s = !0)
                }
                return s
            }
            static _parseTemplateNodeAttribute(t, r, i, s, n) {
                let a = this._parseBindings(n, r);
                if (a) {
                    let e = s,
                        n = "property";
                    ft.test(s) ? n = "attribute" : "$" == s[s.length - 1] && (s = s.slice(0, -1), n = "attribute");
                    let o = jt(a);
                    return o && "attribute" == n && ("class" == s && t.hasAttribute("class") && (o += " " + t.getAttribute(s)), t.setAttribute(s, o)), "attribute" == n && "disable-upgrade$" == e && t.setAttribute(s, ""), "input" === t.localName && "value" === e && t.setAttribute(e, ""), t.removeAttribute(e), "property" === n && (s = q(s)), Nt(this, r, i, n, s, a, o), !0
                }
                return e._parseTemplateNodeAttribute.call(this, t, r, i, s, n)
            }
            static _parseTemplateNestedTemplate(t, r, i) {
                let s = e._parseTemplateNestedTemplate.call(this, t, r, i);
                const o = t.parentNode,
                    l = i.templateInfo,
                    p = "dom-if" === o.localName,
                    d = "dom-repeat" === o.localName;
                n && (p || d) && (o.removeChild(t), (i = i.parentInfo).templateInfo = l, i.noted = !0, s = !1);
                let h = l.hostProps;
                if (a && p) h && (r.hostProps = Object.assign(r.hostProps || {}, h), n || (i.parentInfo.noted = !0));
                else {
                    let t = "{";
                    for (let e in h) {
                        Nt(this, r, i, "property", "_host_" + e, [{
                            mode: t,
                            source: e,
                            dependencies: [e],
                            hostProp: !0
                        }])
                    }
                }
                return s
            }
            static _parseBindings(t, e) {
                let r, i = [],
                    s = 0;
                for (; null !== (r = kt.exec(t));) {
                    r.index > s && i.push({
                        literal: t.slice(s, r.index)
                    });
                    let n = r[1][0],
                        a = Boolean(r[2]),
                        o = r[3].trim(),
                        l = !1,
                        p = "",
                        d = -1;
                    "{" == n && (d = o.indexOf("::")) > 0 && (p = o.substring(d + 2), o = o.substring(0, d), l = !0);
                    let h = Bt(o),
                        _ = [];
                    if (h) {
                        let {
                            args: t,
                            methodName: r
                        } = h;
                        for (let e = 0; e < t.length; e++) {
                            let r = t[e];
                            r.literal || _.push(r)
                        }
                        let i = e.dynamicFns;
                        (i && i[r] || h.static) && (_.push(r), h.dynamicFn = !0)
                    } else _.push(o);
                    i.push({
                        source: o,
                        mode: n,
                        negate: a,
                        customEvent: l,
                        signature: h,
                        dependencies: _,
                        event: p
                    }), s = kt.lastIndex
                }
                if (s && s < t.length) {
                    let e = t.substring(s);
                    e && i.push({
                        literal: e
                    })
                }
                return i.length ? i : null
            }
            static _evaluateBinding(t, e, r, i, s, n) {
                let a;
                return a = e.signature ? Mt(t, r, i, 0, e.signature) : r != e.source ? B(t, e.source) : n && R(r) ? B(t, r) : t.__data[r], e.negate && (a = !a), a
            }
        }
    }),
    Vt = [];

function Wt(t) {}
const Gt = m(t => {
        const e = G(t);

        function r(t) {
            const e = Object.getPrototypeOf(t);
            return e.prototype instanceof s ? e : null
        }

        function i(t) {
            if (!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties", t))) {
                let e = null;
                if (t.hasOwnProperty(JSCompiler_renameProperty("properties", t))) {
                    const r = t.properties;
                    r && (e = function(t) {
                        const e = {};
                        for (let r in t) {
                            const i = t[r];
                            e[r] = "function" == typeof i ? {
                                type: i
                            } : i
                        }
                        return e
                    }(r))
                }
                t.__ownProperties = e
            }
            return t.__ownProperties
        }
        class s extends e {
            static get observedAttributes() {
                if (!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes", this))) {
                    this.prototype;
                    const t = this._properties;
                    this.__observedAttributes = t ? Object.keys(t).map(t => this.prototype._addPropertyToAttributeMap(t)) : []
                }
                return this.__observedAttributes
            }
            static finalize() {
                if (!this.hasOwnProperty(JSCompiler_renameProperty("__finalized", this))) {
                    const t = r(this);
                    t && t.finalize(), this.__finalized = !0, this._finalizeClass()
                }
            }
            static _finalizeClass() {
                const t = i(this);
                t && this.createProperties(t)
            }
            static get _properties() {
                if (!this.hasOwnProperty(JSCompiler_renameProperty("__properties", this))) {
                    const t = r(this);
                    this.__properties = Object.assign({}, t && t._properties, i(this))
                }
                return this.__properties
            }
            static typeForProperty(t) {
                const e = this._properties[t];
                return e && e.type
            }
            _initializeProperties() {
                this.constructor.finalize(), super._initializeProperties()
            }
            connectedCallback() {
                super.connectedCallback && super.connectedCallback(), this._enableProperties()
            }
            disconnectedCallback() {
                super.disconnectedCallback && super.disconnectedCallback()
            }
        }
        return s
    }),
    Xt = window.ShadyCSS && window.ShadyCSS.cssBuild,
    Zt = m(s => {
        const n = Gt(qt(s));

        function a(t, e, r, i) {
            r.computed && (r.readOnly = !0), r.computed && (t._hasReadOnlyEffect(e) ? console.warn(`Cannot redefine computed property '${e}'.`) : t._createComputedProperty(e, r.computed, i)), r.readOnly && !t._hasReadOnlyEffect(e) ? t._createReadOnlyProperty(e, !r.computed) : !1 === r.readOnly && t._hasReadOnlyEffect(e) && console.warn(`Cannot make readOnly property '${e}' non-readOnly.`), r.reflectToAttribute && !t._hasReflectEffect(e) ? t._createReflectedProperty(e) : !1 === r.reflectToAttribute && t._hasReflectEffect(e) && console.warn(`Cannot make reflected property '${e}' non-reflected.`), r.notify && !t._hasNotifyEffect(e) ? t._createNotifyingProperty(e) : !1 === r.notify && t._hasNotifyEffect(e) && console.warn(`Cannot make notify property '${e}' non-notify.`), r.observer && t._createPropertyObserver(e, r.observer, i[r.observer]), t._addPropertyToAttributeMap(e)
        }

        function o(t, e, r, i) {
            if (!Xt) {
                const s = e.content.querySelectorAll("style"),
                    n = S(e),
                    a = function(t) {
                        let e = E(t);
                        return e ? N(e) : []
                    }(r),
                    o = e.content.firstElementChild;
                for (let r = 0; r < a.length; r++) {
                    let s = a[r];
                    s.textContent = t._processStyleText(s.textContent, i), e.content.insertBefore(s, o)
                }
                let l = 0;
                for (let e = 0; e < n.length; e++) {
                    let r = n[e],
                        a = s[l];
                    a !== r ? (r = r.cloneNode(!0), a.parentNode.insertBefore(r, a)) : l++, r.textContent = t._processStyleText(r.textContent, i)
                }
            }
            if (window.ShadyCSS && window.ShadyCSS.prepareTemplate(e, r), u && Xt && f) {
                const r = e.content.querySelectorAll("style");
                if (r) {
                    let e = "";
                    Array.from(r).forEach(t => {
                        e += t.textContent, t.parentNode.removeChild(t)
                    }), t._styleSheet = new CSSStyleSheet, t._styleSheet.replaceSync(e)
                }
            }
        }
        return class extends n {
            static get polymerElementVersion() {
                return "3.5.2"
            }
            static _finalizeClass() {
                n._finalizeClass.call(this);
                const t = ((e = this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers", e)) || (e.__ownObservers = e.hasOwnProperty(JSCompiler_renameProperty("observers", e)) ? e.observers : null), e.__ownObservers);
                var e;
                t && this.createObservers(t, this._properties), this._prepareTemplate()
            }
            static _prepareTemplate() {
                let t = this.template;
                t && ("string" == typeof t ? (console.error("template getter must return HTMLTemplateElement"), t = null) : p || (t = t.cloneNode(!0))), this.prototype._template = t
            }
            static createProperties(t) {
                for (let e in t) a(this.prototype, e, t[e], t)
            }
            static createObservers(t, e) {
                const r = this.prototype;
                for (let i = 0; i < t.length; i++) r._createMethodObserver(t[i], e)
            }
            static get template() {
                if (!this.hasOwnProperty(JSCompiler_renameProperty("_template", this))) {
                    let t = this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template", this.prototype)) ? this.prototype._template : void 0;
                    "function" == typeof t && (t = t()), this._template = void 0 !== t ? t : this.hasOwnProperty(JSCompiler_renameProperty("is", this)) && function(t) {
                        let e = null;
                        if (t && (!r || c) && (e = T.import(t, "template"), r && !e)) throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${t}`);
                        return e
                    }(this.is) || Object.getPrototypeOf(this.prototype).constructor.template
                }
                return this._template
            }
            static set template(t) {
                this._template = t
            }
            static get importPath() {
                if (!this.hasOwnProperty(JSCompiler_renameProperty("_importPath", this))) {
                    const t = this.importMeta;
                    if (t) this._importPath = e(t.url);
                    else {
                        const t = T.import(this.is);
                        this._importPath = t && t.assetpath || Object.getPrototypeOf(this.prototype).constructor.importPath
                    }
                }
                return this._importPath
            }
            constructor() {
                super(), this._template, this._importPath, this.rootPath, this.importPath, this.root, this.$
            }
            _initializeProperties() {
                this.constructor.finalize(), this.constructor._finalizeTemplate(this.localName), super._initializeProperties(), this.rootPath = d, this.importPath = this.constructor.importPath;
                let t = function(t) {
                    if (!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults", t))) {
                        t.__propertyDefaults = null;
                        let e = t._properties;
                        for (let r in e) {
                            let i = e[r];
                            "value" in i && (t.__propertyDefaults = t.__propertyDefaults || {}, t.__propertyDefaults[r] = i)
                        }
                    }
                    return t.__propertyDefaults
                }(this.constructor);
                if (t)
                    for (let e in t) {
                        let r = t[e];
                        if (this._canApplyPropertyDefault(e)) {
                            let t = "function" == typeof r.value ? r.value.call(this) : r.value;
                            this._hasAccessor(e) ? this._setPendingProperty(e, t, !0) : this[e] = t
                        }
                    }
            }
            _canApplyPropertyDefault(t) {
                return !this.hasOwnProperty(t)
            }
            static _processStyleText(t, e) {
                return i(t, e)
            }
            static _finalizeTemplate(e) {
                const r = this.prototype._template;
                if (r && !r.__polymerFinalized) {
                    r.__polymerFinalized = !0;
                    const i = this.importPath;
                    o(this, r, e, i ? t(i) : ""), this.prototype._bindTemplate(r)
                }
            }
            connectedCallback() {
                window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this), super.connectedCallback()
            }
            ready() {
                this._template && (this.root = this._stampTemplate(this._template), this.$ = this.root.$), super.ready()
            }
            _readyClients() {
                this._template && (this.root = this._attachDom(this.root)), super._readyClients()
            }
            _attachDom(t) {
                const e = L(this);
                if (e.attachShadow) return t ? (e.shadowRoot || (e.attachShadow({
                    mode: "open",
                    shadyUpgradeFragment: t
                }), e.shadowRoot.appendChild(t), this.constructor._styleSheet && (e.shadowRoot.adoptedStyleSheets = [this.constructor._styleSheet])), h && window.ShadyDOM && window.ShadyDOM.flushInitial(e.shadowRoot), e.shadowRoot) : null;
                throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")
            }
            updateStyles(t) {
                window.ShadyCSS && window.ShadyCSS.styleSubtree(this, t)
            }
            resolveUrl(e, r) {
                return !r && this.importPath && (r = t(this.importPath)), t(e, r)
            }
            static _parseTemplateContent(t, e, r) {
                return e.dynamicFns = e.dynamicFns || this._properties, n._parseTemplateContent.call(this, t, e, r)
            }
            static _addTemplatePropertyEffect(t, e, r) {
                return !_ || e in this._properties || r.info.part.signature && r.info.part.signature.static || r.info.part.hostProp || t.nestedTemplate || console.warn(`Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`), n._addTemplatePropertyEffect.call(this, t, e, r)
            }
        }
    }),
    Kt = window.trustedTypes && trustedTypes.createPolicy("polymer-html-literal", {
        createHTML: t => t
    });
class Qt {
    constructor(t, e) {
        re(t, e);
        const r = e.reduce((e, r, i) => e + te(r) + t[i + 1], t[0]);
        this.value = r.toString()
    }
    toString() {
        return this.value
    }
}

function te(t) {
    if (t instanceof Qt) return t.value;
    throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)
}
const ee = function(t, ...e) {
        re(t, e);
        const r = document.createElement("template");
        let i = e.reduce((e, r, i) => e + function(t) {
            if (t instanceof HTMLTemplateElement) return t.innerHTML;
            if (t instanceof Qt) return te(t);
            throw new Error(`non-template value passed to Polymer's html function: ${t}`)
        }(r) + t[i + 1], t[0]);
        return Kt && (i = Kt.createHTML(i)), r.innerHTML = i, r
    },
    re = (t, e) => {
        if (!Array.isArray(t) || !Array.isArray(t.raw) || e.length !== t.length - 1) throw new TypeError("Invalid call to the html template tag")
    },
    ie = Zt(HTMLElement);
export {
    Zt as E, ie as P, dt as T, Q as a, Xt as b, Wt as c, q as d, qt as e, I as f, B as g, ee as h, F as m, H as r, D as t, L as w
};