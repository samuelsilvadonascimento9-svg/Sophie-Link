import {
    w as e,
    a as t,
    E as s,
    b as n,
    c as i,
    g as r,
    e as o,
    P as l,
    m as a,
    t as h,
    r as c,
    f as d
} from "./polymer-element.js";
import "./boot.js";
import {
    d as u
} from "./mixin.js";
import {
    t as _,
    m as p
} from "./async.js";
import {
    D as f,
    f as m,
    e as y
} from "./debounce.js";
import {
    n as g,
    q as b,
    t as C,
    e as S,
    a as v,
    i as w,
    u as P,
    v as E,
    f as x
} from "./settings.js";
const O = !(window.ShadyDOM && window.ShadyDOM.inUse);
let A, I;

function T(e) {
    A = (!e || !e.shimcssproperties) && (O || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports("box-shadow", "0 0 0 var(--foo)")))
}
window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (I = window.ShadyCSS.cssBuild);
const N = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);
window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? A = window.ShadyCSS.nativeCss : window.ShadyCSS ? (T(window.ShadyCSS), window.ShadyCSS = void 0) : T(window.WebComponents && window.WebComponents.flags);
const D = A;
class M {
    constructor() {
        this.start = 0, this.end = 0, this.previous = null, this.parent = null, this.rules = null, this.parsedCssText = "", this.cssText = "", this.atRule = !1, this.type = 0, this.keyframesName = "", this.selector = "", this.parsedSelector = ""
    }
}

function k(e) {
    return R(function(e) {
        let t = new M;
        t.start = 0, t.end = e.length;
        let s = t;
        for (let n = 0, i = e.length; n < i; n++)
            if (e[n] === H) {
                s.rules || (s.rules = []);
                let e = s,
                    t = e.rules[e.rules.length - 1] || null;
                s = new M, s.start = n + 1, s.parent = e, s.previous = t, e.rules.push(s)
            } else e[n] === j && (s.end = n + 1, s = s.parent || t);
        return t
    }(e = e.replace($.comments, "").replace($.port, "")), e)
}

function R(e, t) {
    let s = t.substring(e.start, e.end - 1);
    if (e.parsedCssText = e.cssText = s.trim(), e.parent) {
        let n = e.previous ? e.previous.end : e.parent.start;
        s = t.substring(n, e.start - 1), s = function(e) {
            return e.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
                let e = arguments[1],
                    t = 6 - e.length;
                for (; t--;) e = "0" + e;
                return "\\" + e
            })
        }(s), s = s.replace($.multipleSpaces, " "), s = s.substring(s.lastIndexOf(";") + 1);
        let i = e.parsedSelector = e.selector = s.trim();
        e.atRule = 0 === i.indexOf(z), e.atRule ? 0 === i.indexOf(B) ? e.type = F.MEDIA_RULE : i.match($.keyframesRule) && (e.type = F.KEYFRAMES_RULE, e.keyframesName = e.selector.split($.multipleSpaces).pop()) : 0 === i.indexOf(q) ? e.type = F.MIXIN_RULE : e.type = F.STYLE_RULE
    }
    let n = e.rules;
    if (n)
        for (let e, s = 0, i = n.length; s < i && (e = n[s]); s++) R(e, t);
    return e
}

function L(e, t, s = "") {
    let n = "";
    if (e.cssText || e.rules) {
        let s = e.rules;
        if (s && ! function(e) {
                let t = e[0];
                return Boolean(t) && Boolean(t.selector) && 0 === t.selector.indexOf(q)
            }(s))
            for (let e, i = 0, r = s.length; i < r && (e = s[i]); i++) n = L(e, t, n);
        else n = t ? e.cssText : function(e) {
            return e = function(e) {
                    return e.replace($.customProp, "").replace($.mixinProp, "")
                }(e),
                function(e) {
                    return e.replace($.mixinApply, "").replace($.varApply, "")
                }(e)
        }(e.cssText), n = n.trim(), n && (n = "  " + n + "\n")
    }
    return n && (e.selector && (s += e.selector + " " + H + "\n"), s += n, e.selector && (s += j + "\n\n")), s
}
const F = {
        STYLE_RULE: 1,
        KEYFRAMES_RULE: 7,
        MEDIA_RULE: 4,
        MIXIN_RULE: 1e3
    },
    H = "{",
    j = "}",
    $ = {
        comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
        port: /@import[^;]*;/gim,
        customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
        varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        keyframesRule: /^@[^\s]*keyframes/,
        multipleSpaces: /\s+/g
    },
    q = "--",
    B = "@media",
    z = "@",
    U = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    Y = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
    J = new Set;

function V(e) {
    const t = e.textContent;
    if (!J.has(t)) {
        J.add(t);
        const e = document.createElement("style");
        e.setAttribute("shady-unscoped", ""), e.textContent = t, document.head.appendChild(e)
    }
}

function X(e) {
    return e.hasAttribute("shady-unscoped")
}

function W(e, t) {
    return e ? ("string" == typeof e && (e = k(e)), L(e, D)) : ""
}

function G(e) {
    return !e.__cssRules && e.textContent && (e.__cssRules = k(e.textContent)), e.__cssRules || null
}

function K(e, t, s, n) {
    if (!e) return;
    let i = !1,
        r = e.type;
    r === F.STYLE_RULE ? t(e) : r === F.MIXIN_RULE && (i = !0);
    let o = e.rules;
    if (o && !i)
        for (let e, s = 0, n = o.length; s < n && (e = o[s]); s++) K(e, t)
}

function Q(e, t) {
    let s = e.indexOf("var(");
    if (-1 === s) return t(e, "", "", "");
    let n = function(e, t) {
            let s = 0;
            for (let n = t, i = e.length; n < i; n++)
                if ("(" === e[n]) s++;
                else if (")" === e[n] && 0 === --s) return n;
            return -1
        }(e, s + 3),
        i = e.substring(s + 4, n),
        r = e.substring(0, s),
        o = Q(e.substring(n + 1), t),
        l = i.indexOf(",");
    return -1 === l ? t(r, i.trim(), "", o) : t(r, i.substring(0, l).trim(), i.substring(l + 1).trim(), o)
}
window.ShadyDOM && window.ShadyDOM.wrap;
const Z = "css-build";

function ee(e) {
    if (void 0 !== I) return I;
    if (void 0 === e.__cssBuild) {
        const t = e.getAttribute(Z);
        if (t) e.__cssBuild = t;
        else {
            const t = function(e) {
                const t = "template" === e.localName ? e.content.firstChild : e.firstChild;
                if (t instanceof Comment) {
                    const e = t.textContent.trim().split(":");
                    if (e[0] === Z) return e[1]
                }
                return ""
            }(e);
            "" !== t && function(e) {
                const t = "template" === e.localName ? e.content.firstChild : e.firstChild;
                t.parentNode.removeChild(t)
            }(e), e.__cssBuild = t
        }
    }
    return e.__cssBuild || ""
}

function te(e) {
    return "" !== ee(e)
}

function se(e, t) {
    for (let s in t) null === s ? e.style.removeProperty(s) : e.style.setProperty(s, t[s])
}

function ne(e, t) {
    const s = window.getComputedStyle(e).getPropertyValue(t);
    return s ? s.trim() : ""
}
const ie = /;\s*/m,
    re = /^\s*(initial)|(inherit)\s*$/,
    oe = /\s*!important/,
    le = "_-_";
class ae {
    constructor() {
        this._map = {}
    }
    set(e, t) {
        e = e.trim(), this._map[e] = {
            properties: t,
            dependants: {}
        }
    }
    get(e) {
        return e = e.trim(), this._map[e] || null
    }
}
let he = null;
class ce {
    constructor() {
        this._currentElement = null, this._measureElement = null, this._map = new ae
    }
    detectMixin(e) {
        return function(e) {
            const t = Y.test(e) || U.test(e);
            return Y.lastIndex = 0, U.lastIndex = 0, t
        }(e)
    }
    gatherStyles(e) {
        const t = function(e) {
            const t = [],
                s = e.querySelectorAll("style");
            for (let e = 0; e < s.length; e++) {
                const n = s[e];
                X(n) ? O || (V(n), n.parentNode.removeChild(n)) : (t.push(n.textContent), n.parentNode.removeChild(n))
            }
            return t.join("").trim()
        }(e.content);
        if (t) {
            const s = document.createElement("style");
            return s.textContent = t, e.content.insertBefore(s, e.content.firstChild), s
        }
        return null
    }
    transformTemplate(e, t) {
        void 0 === e._gatheredStyle && (e._gatheredStyle = this.gatherStyles(e));
        const s = e._gatheredStyle;
        return s ? this.transformStyle(s, t) : null
    }
    transformStyle(e, t = "") {
        let s = G(e);
        return this.transformRules(s, t), e.textContent = W(s), s
    }
    transformCustomStyle(e) {
        let t = G(e);
        return K(t, e => {
            ":root" === e.selector && (e.selector = "html"), this.transformRule(e)
        }), e.textContent = W(t), t
    }
    transformRules(e, t) {
        this._currentElement = t, K(e, e => {
            this.transformRule(e)
        }), this._currentElement = null
    }
    transformRule(e) {
        e.cssText = this.transformCssText(e.parsedCssText, e), ":root" === e.selector && (e.selector = ":host > *")
    }
    transformCssText(e, t) {
        return e = e.replace(U, (e, s, n, i) => this._produceCssProperties(e, s, n, i, t)), this._consumeCssProperties(e, t)
    }
    _getInitialValueForProperty(e) {
        return this._measureElement || (this._measureElement = document.createElement("meta"), this._measureElement.setAttribute("apply-shim-measure", ""), this._measureElement.style.all = "initial", document.head.appendChild(this._measureElement)), window.getComputedStyle(this._measureElement).getPropertyValue(e)
    }
    _fallbacksFromPreviousRules(e) {
        let t = e;
        for (; t.parent;) t = t.parent;
        const s = {};
        let n = !1;
        return K(t, t => {
            n = n || t === e, n || t.selector === e.selector && Object.assign(s, this._cssTextToMap(t.parsedCssText))
        }), s
    }
    _consumeCssProperties(e, t) {
        let s = null;
        for (; s = Y.exec(e);) {
            let n = s[0],
                i = s[1],
                r = s.index,
                o = r + n.indexOf("@apply"),
                l = r + n.length,
                a = e.slice(0, o),
                h = e.slice(l),
                c = t ? this._fallbacksFromPreviousRules(t) : {};
            Object.assign(c, this._cssTextToMap(a));
            let d = this._atApplyToCssProperties(i, c);
            e = `${a}${d}${h}`, Y.lastIndex = r + d.length
        }
        return e
    }
    _atApplyToCssProperties(e, t) {
        e = e.replace(ie, "");
        let s = [],
            n = this._map.get(e);
        if (n || (this._map.set(e, {}), n = this._map.get(e)), n) {
            let i, r, o;
            this._currentElement && (n.dependants[this._currentElement] = !0);
            const l = n.properties;
            for (i in l) o = t && t[i], r = [i, ": var(", e, le, i], o && r.push(",", o.replace(oe, "")), r.push(")"), oe.test(l[i]) && r.push(" !important"), s.push(r.join(""))
        }
        return s.join("; ")
    }
    _replaceInitialOrInherit(e, t) {
        let s = re.exec(t);
        return s && (t = s[1] ? this._getInitialValueForProperty(e) : "apply-shim-inherit"), t
    }
    _cssTextToMap(e, t = !1) {
        let s, n, i = e.split(";"),
            r = {};
        for (let e, o, l = 0; l < i.length; l++) e = i[l], e && (o = e.split(":"), o.length > 1 && (s = o[0].trim(), n = o.slice(1).join(":"), t && (n = this._replaceInitialOrInherit(s, n)), r[s] = n));
        return r
    }
    _invalidateMixinEntry(e) {
        if (he)
            for (let t in e.dependants) t !== this._currentElement && he(t)
    }
    _produceCssProperties(e, t, s, n, i) {
        if (s && Q(s, (e, t) => {
                t && this._map.get(t) && (n = `@apply ${t};`)
            }), !n) return e;
        let r = this._consumeCssProperties("" + n, i),
            o = e.slice(0, e.indexOf("--")),
            l = this._cssTextToMap(r, !0),
            a = l,
            h = this._map.get(t),
            c = h && h.properties;
        c ? a = Object.assign(Object.create(c), l) : this._map.set(t, a);
        let d, u, _ = [],
            p = !1;
        for (d in a) u = l[d], void 0 === u && (u = "initial"), c && !(d in c) && (p = !0), _.push(`${t}${le}${d}: ${u}`);
        return p && this._invalidateMixinEntry(h), h && (h.properties = a), s && (o = `${e};${o}`), `${o}${_.join("; ")};`
    }
}
ce.prototype.detectMixin = ce.prototype.detectMixin, ce.prototype.transformStyle = ce.prototype.transformStyle, ce.prototype.transformCustomStyle = ce.prototype.transformCustomStyle, ce.prototype.transformRules = ce.prototype.transformRules, ce.prototype.transformRule = ce.prototype.transformRule, ce.prototype.transformTemplate = ce.prototype.transformTemplate, ce.prototype._separator = le, Object.defineProperty(ce.prototype, "invalidCallback", {
    get: () => he,
    set(e) {
        he = e
    }
});
const de = {},
    ue = "_applyShimCurrentVersion",
    _e = "_applyShimNextVersion",
    pe = "_applyShimValidatingVersion",
    fe = Promise.resolve();

function me(e) {
    let t = de[e];
    t && function(e) {
        e[ue] = e[ue] || 0, e[pe] = e[pe] || 0, e[_e] = (e[_e] || 0) + 1
    }(t)
}

function ye(e) {
    return e[ue] === e[_e]
}
let ge, be = null,
    Ce = window.HTMLImports && window.HTMLImports.whenReady || null;

function Se(e) {
    requestAnimationFrame(function() {
        Ce ? Ce(e) : (be || (be = new Promise(e => {
            ge = e
        }), "complete" === document.readyState ? ge() : document.addEventListener("readystatechange", () => {
            "complete" === document.readyState && ge()
        })), be.then(function() {
            e && e()
        }))
    })
}
const ve = "__seenByShadyCSS",
    we = "__shadyCSSCachedStyle";
let Pe = null,
    Ee = null,
    xe = class {
        constructor() {
            this.customStyles = [], this.enqueued = !1, Se(() => {
                window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles()
            })
        }
        enqueueDocumentValidation() {
            !this.enqueued && Ee && (this.enqueued = !0, Se(Ee))
        }
        addCustomStyle(e) {
            e[ve] || (e[ve] = !0, this.customStyles.push(e), this.enqueueDocumentValidation())
        }
        getStyleForCustomStyle(e) {
            if (e[we]) return e[we];
            let t;
            return t = e.getStyle ? e.getStyle() : e, t
        }
        processStyles() {
            const e = this.customStyles;
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                if (s[we]) continue;
                const n = this.getStyleForCustomStyle(s);
                if (n) {
                    const e = n.__appliedElement || n;
                    Pe && Pe(e), s[we] = e
                }
            }
            return e
        }
    };
xe.prototype.addCustomStyle = xe.prototype.addCustomStyle, xe.prototype.getStyleForCustomStyle = xe.prototype.getStyleForCustomStyle, xe.prototype.processStyles = xe.prototype.processStyles, Object.defineProperties(xe.prototype, {
    transformCallback: {
        get: () => Pe,
        set(e) {
            Pe = e
        }
    },
    validateCallback: {
        get: () => Ee,
        set(e) {
            let t = !1;
            Ee || (t = !0), Ee = e, t && this.enqueueDocumentValidation()
        }
    }
});
const Oe = new ce;
class Ae {
    constructor() {
        this.customStyleInterface = null, Oe.invalidCallback = me
    }
    ensure() {
        this.customStyleInterface || window.ShadyCSS.CustomStyleInterface && (this.customStyleInterface = window.ShadyCSS.CustomStyleInterface, this.customStyleInterface.transformCallback = e => {
            Oe.transformCustomStyle(e)
        }, this.customStyleInterface.validateCallback = () => {
            requestAnimationFrame(() => {
                this.customStyleInterface.enqueued && this.flushCustomStyles()
            })
        })
    }
    prepareTemplate(e, t) {
        if (this.ensure(), te(e)) return;
        de[t] = e;
        let s = Oe.transformTemplate(e, t);
        e._styleAst = s
    }
    flushCustomStyles() {
        if (this.ensure(), !this.customStyleInterface) return;
        let e = this.customStyleInterface.processStyles();
        if (this.customStyleInterface.enqueued) {
            for (let t = 0; t < e.length; t++) {
                let s = e[t],
                    n = this.customStyleInterface.getStyleForCustomStyle(s);
                n && Oe.transformCustomStyle(n)
            }
            this.customStyleInterface.enqueued = !1
        }
    }
    styleSubtree(e, t) {
        if (this.ensure(), t && se(e, t), e.shadowRoot) {
            this.styleElement(e);
            let t = e.shadowRoot.children || e.shadowRoot.childNodes;
            for (let e = 0; e < t.length; e++) this.styleSubtree(t[e])
        } else {
            let t = e.children || e.childNodes;
            for (let e = 0; e < t.length; e++) this.styleSubtree(t[e])
        }
    }
    styleElement(e) {
        this.ensure();
        let {
            is: t
        } = function(e) {
            let t = e.localName,
                s = "",
                n = "";
            return t ? t.indexOf("-") > -1 ? s = t : (n = t, s = e.getAttribute && e.getAttribute("is") || "") : (s = e.is, n = e.extends), {
                is: s,
                typeExtension: n
            }
        }(e), s = de[t];
        if ((!s || !te(s)) && s && !ye(s)) {
            (function(e) {
                return !ye(e) && e[pe] === e[_e]
            })(s) || (this.prepareTemplate(s, t), function(e) {
                e[pe] = e[_e], e._validating || (e._validating = !0, fe.then(function() {
                    e[ue] = e[_e], e._validating = !1
                }))
            }(s));
            let n = e.shadowRoot;
            if (n) {
                let e = n.querySelector("style");
                e && (e.__cssRules = s._styleAst, e.textContent = W(s._styleAst))
            }
        }
    }
    styleDocument(e) {
        this.ensure(), this.styleSubtree(document.body, e)
    }
}
if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
    const e = new Ae;
    let t = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
    window.ShadyCSS = {
        prepareTemplate(t, s, n) {
            e.flushCustomStyles(), e.prepareTemplate(t, s)
        },
        prepareTemplateStyles(e, t, s) {
            window.ShadyCSS.prepareTemplate(e, t, s)
        },
        prepareTemplateDom(e, t) {},
        styleSubtree(t, s) {
            e.flushCustomStyles(), e.styleSubtree(t, s)
        },
        styleElement(t) {
            e.flushCustomStyles(), e.styleElement(t)
        },
        styleDocument(t) {
            e.flushCustomStyles(), e.styleDocument(t)
        },
        getComputedStyleValue: (e, t) => ne(e, t),
        flushCustomStyles() {
            e.flushCustomStyles()
        },
        nativeCss: D,
        nativeShadow: O,
        cssBuild: I,
        disableRuntime: N
    }, t && (window.ShadyCSS.CustomStyleInterface = t)
}
window.ShadyCSS.ApplyShim = Oe;
let Ie = "string" == typeof document.head.style.touchAction,
    Te = "__polymerGestures",
    Ne = "__polymerGesturesHandled",
    De = "__polymerGesturesTouchAction",
    Me = ["mousedown", "mousemove", "mouseup", "click"],
    ke = [0, 1, 4, 2],
    Re = function() {
        try {
            return 1 === new MouseEvent("test", {
                buttons: 1
            }).buttons
        } catch (e) {
            return !1
        }
    }();

function Le(e) {
    return Me.indexOf(e) > -1
}
let Fe = !1;

function He(e) {
    if (!Le(e) && "touchend" !== e) return Ie && Fe && b ? {
        passive: !0
    } : void 0
}! function() {
    try {
        let e = Object.defineProperty({}, "passive", {
            get() {
                Fe = !0
            }
        });
        window.addEventListener("test", null, e), window.removeEventListener("test", null, e)
    } catch (e) {}
}();
let je = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
const $e = [],
    qe = {
        button: !0,
        input: !0,
        keygen: !0,
        meter: !0,
        output: !0,
        textarea: !0,
        progress: !0,
        select: !0
    },
    Be = {
        button: !0,
        command: !0,
        fieldset: !0,
        input: !0,
        keygen: !0,
        optgroup: !0,
        option: !0,
        select: !0,
        textarea: !0
    };

function ze(e) {
    return qe[e.localName] || !1
}

function Ue(e) {
    let t = Array.prototype.slice.call(e.labels || []);
    if (!t.length) {
        t = [];
        try {
            let s = e.getRootNode();
            if (e.id) {
                let n = s.querySelectorAll(`label[for = '${e.id}']`);
                for (let e = 0; e < n.length; e++) t.push(n[e])
            }
        } catch (e) {}
    }
    return t
}
let Ye = function(e) {
    let t = e.sourceCapabilities;
    if ((!t || t.firesTouchEvents) && (e[Ne] = {
            skip: !0
        }, "click" === e.type)) {
        let t = !1,
            s = Ke(e);
        for (let e = 0; e < s.length; e++) {
            if (s[e].nodeType === Node.ELEMENT_NODE)
                if ("label" === s[e].localName) $e.push(s[e]);
                else if (ze(s[e])) {
                let n = Ue(s[e]);
                for (let e = 0; e < n.length; e++) t = t || $e.indexOf(n[e]) > -1
            }
            if (s[e] === Xe.mouse.target) return
        }
        if (t) return;
        e.preventDefault(), e.stopPropagation()
    }
};

function Je(e) {
    let t = je ? ["click"] : Me;
    for (let s, n = 0; n < t.length; n++) s = t[n], e ? ($e.length = 0, document.addEventListener(s, Ye, !0)) : document.removeEventListener(s, Ye, !0)
}

function Ve(e) {
    let t = e.type;
    if (!Le(t)) return !1;
    if ("mousemove" === t) {
        let t = void 0 === e.buttons ? 1 : e.buttons;
        return e instanceof window.MouseEvent && !Re && (t = ke[e.which] || 0), Boolean(1 & t)
    }
    return 0 === (void 0 === e.button ? 0 : e.button)
}
let Xe = {
    mouse: {
        target: null,
        mouseIgnoreJob: null
    },
    touch: {
        x: 0,
        y: 0,
        id: -1,
        scrollDecided: !1
    }
};

function We(e, t, s) {
    e.movefn = t, e.upfn = s, document.addEventListener("mousemove", t), document.addEventListener("mouseup", s)
}

function Ge(e) {
    document.removeEventListener("mousemove", e.movefn), document.removeEventListener("mouseup", e.upfn), e.movefn = null, e.upfn = null
}
g && document.addEventListener("touchend", function(e) {
    if (!g) return;
    Xe.mouse.mouseIgnoreJob || Je(!0), Xe.mouse.target = Ke(e)[0], Xe.mouse.mouseIgnoreJob = f.debounce(Xe.mouse.mouseIgnoreJob, _.after(2500), function() {
        Je(), Xe.mouse.target = null, Xe.mouse.mouseIgnoreJob = null
    })
}, !!Fe && {
    passive: !0
});
const Ke = window.ShadyDOM && window.ShadyDOM.noPatch ? window.ShadyDOM.composedPath : e => e.composedPath && e.composedPath() || [],
    Qe = {},
    Ze = [];

function et(e) {
    const t = Ke(e);
    return t.length > 0 ? t[0] : e.target
}

function tt(e) {
    let t, s = e.type,
        n = e.currentTarget[Te];
    if (!n) return;
    let i = n[s];
    if (i) {
        if (!e[Ne] && (e[Ne] = {}, "touch" === s.slice(0, 5))) {
            let t = e.changedTouches[0];
            if ("touchstart" === s && 1 === e.touches.length && (Xe.touch.id = t.identifier), Xe.touch.id !== t.identifier) return;
            Ie || "touchstart" !== s && "touchmove" !== s || function(e) {
                let t = e.changedTouches[0],
                    s = e.type;
                if ("touchstart" === s) Xe.touch.x = t.clientX, Xe.touch.y = t.clientY, Xe.touch.scrollDecided = !1;
                else if ("touchmove" === s) {
                    if (Xe.touch.scrollDecided) return;
                    Xe.touch.scrollDecided = !0;
                    let s = function(e) {
                            let t = "auto",
                                s = Ke(e);
                            for (let e, n = 0; n < s.length; n++)
                                if (e = s[n], e[De]) {
                                    t = e[De];
                                    break
                                }
                            return t
                        }(e),
                        n = !1,
                        i = Math.abs(Xe.touch.x - t.clientX),
                        r = Math.abs(Xe.touch.y - t.clientY);
                    e.cancelable && ("none" === s ? n = !0 : "pan-x" === s ? n = r > i : "pan-y" === s && (n = i > r)), n ? e.preventDefault() : lt("track")
                }
            }(e)
        }
        if (t = e[Ne], !t.skip) {
            for (let s, n = 0; n < Ze.length; n++) s = Ze[n], i[s.name] && !t[s.name] && s.flow && s.flow.start.indexOf(e.type) > -1 && s.reset && s.reset();
            for (let n, r = 0; r < Ze.length; r++) n = Ze[r], i[n.name] && !t[n.name] && (t[n.name] = !0, n[s](e))
        }
    }
}

function st(e, t, s) {
    return !!Qe[t] && (function(e, t, s) {
        let n = Qe[t],
            i = n.deps,
            r = n.name,
            o = e[Te];
        o || (e[Te] = o = {});
        for (let t, s, n = 0; n < i.length; n++) t = i[n], je && Le(t) && "click" !== t || (s = o[t], s || (o[t] = s = {
            _count: 0
        }), 0 === s._count && e.addEventListener(t, tt, He(t)), s[r] = (s[r] || 0) + 1, s._count = (s._count || 0) + 1);
        e.addEventListener(t, s), n.touchAction && rt(e, n.touchAction)
    }(e, t, s), !0)
}

function nt(e, t, s) {
    return !!Qe[t] && (function(e, t, s) {
        let n = Qe[t],
            i = n.deps,
            r = n.name,
            o = e[Te];
        if (o)
            for (let t, s, n = 0; n < i.length; n++) t = i[n], s = o[t], s && s[r] && (s[r] = (s[r] || 1) - 1, s._count = (s._count || 1) - 1, 0 === s._count && e.removeEventListener(t, tt, He(t)));
        e.removeEventListener(t, s)
    }(e, t, s), !0)
}

function it(e) {
    Ze.push(e);
    for (let t = 0; t < e.emits.length; t++) Qe[e.emits[t]] = e
}

function rt(e, t) {
    Ie && e instanceof HTMLElement && p.run(() => {
        e.style.touchAction = t
    }), e[De] = t
}

function ot(t, s, n) {
    let i = new Event(s, {
        bubbles: !0,
        cancelable: !0,
        composed: !0
    });
    if (i.detail = n, e(t).dispatchEvent(i), i.defaultPrevented) {
        let e = n.preventer || n.sourceEvent;
        e && e.preventDefault && e.preventDefault()
    }
}

function lt(e) {
    let t = function(e) {
        for (let t, s = 0; s < Ze.length; s++) {
            t = Ze[s];
            for (let s, n = 0; n < t.emits.length; n++)
                if (s = t.emits[n], s === e) return t
        }
        return null
    }(e);
    t.info && (t.info.prevent = !0)
}

function at(e, t, s, n) {
    t && ot(t, e, {
        x: s.clientX,
        y: s.clientY,
        sourceEvent: s,
        preventer: n,
        prevent: function(e) {
            return lt(e)
        }
    })
}

function ht(e, t, s) {
    if (e.prevent) return !1;
    if (e.started) return !0;
    let n = Math.abs(e.x - t),
        i = Math.abs(e.y - s);
    return n >= 5 || i >= 5
}

function ct(e, t, s) {
    if (!t) return;
    let n, i = e.moves[e.moves.length - 2],
        r = e.moves[e.moves.length - 1],
        o = r.x - e.x,
        l = r.y - e.y,
        a = 0;
    i && (n = r.x - i.x, a = r.y - i.y), ot(t, "track", {
        state: e.state,
        x: s.clientX,
        y: s.clientY,
        dx: o,
        dy: l,
        ddx: n,
        ddy: a,
        sourceEvent: s,
        hover: function() {
            return function(e, t) {
                let s = document.elementFromPoint(e, t),
                    n = s;
                for (; n && n.shadowRoot && !window.ShadyDOM;) {
                    let i = n;
                    if (n = n.shadowRoot.elementFromPoint(e, t), i === n) break;
                    n && (s = n)
                }
                return s
            }(s.clientX, s.clientY)
        }
    })
}

function dt(e, t, s) {
    let n = Math.abs(t.clientX - e.x),
        i = Math.abs(t.clientY - e.y),
        r = et(s || t);
    !r || Be[r.localName] && r.hasAttribute("disabled") || (isNaN(n) || isNaN(i) || n <= 25 && i <= 25 || function(e) {
        if ("click" === e.type) {
            if (0 === e.detail) return !0;
            let t = et(e);
            if (!t.nodeType || t.nodeType !== Node.ELEMENT_NODE) return !0;
            let s = t.getBoundingClientRect(),
                n = e.pageX,
                i = e.pageY;
            return !(n >= s.left && n <= s.right && i >= s.top && i <= s.bottom)
        }
        return !1
    }(t)) && (e.prevent || ot(r, "tap", {
        x: t.clientX,
        y: t.clientY,
        sourceEvent: t,
        preventer: s
    }))
}
it({
    name: "downup",
    deps: ["mousedown", "touchstart", "touchend"],
    flow: {
        start: ["mousedown", "touchstart"],
        end: ["mouseup", "touchend"]
    },
    emits: ["down", "up"],
    info: {
        movefn: null,
        upfn: null
    },
    reset: function() {
        Ge(this.info)
    },
    mousedown: function(e) {
        if (!Ve(e)) return;
        let t = et(e),
            s = this;
        We(this.info, function(e) {
            Ve(e) || (at("up", t, e), Ge(s.info))
        }, function(e) {
            Ve(e) && at("up", t, e), Ge(s.info)
        }), at("down", t, e)
    },
    touchstart: function(e) {
        at("down", et(e), e.changedTouches[0], e)
    },
    touchend: function(e) {
        at("up", et(e), e.changedTouches[0], e)
    }
}), it({
    name: "track",
    touchAction: "none",
    deps: ["mousedown", "touchstart", "touchmove", "touchend"],
    flow: {
        start: ["mousedown", "touchstart"],
        end: ["mouseup", "touchend"]
    },
    emits: ["track"],
    info: {
        x: 0,
        y: 0,
        state: "start",
        started: !1,
        moves: [],
        addMove: function(e) {
            this.moves.length > 2 && this.moves.shift(), this.moves.push(e)
        },
        movefn: null,
        upfn: null,
        prevent: !1
    },
    reset: function() {
        this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, Ge(this.info)
    },
    mousedown: function(e) {
        if (!Ve(e)) return;
        let t = et(e),
            s = this,
            n = function(e) {
                let n = e.clientX,
                    i = e.clientY;
                ht(s.info, n, i) && (s.info.state = s.info.started ? "mouseup" === e.type ? "end" : "track" : "start", "start" === s.info.state && lt("tap"), s.info.addMove({
                    x: n,
                    y: i
                }), Ve(e) || (s.info.state = "end", Ge(s.info)), t && ct(s.info, t, e), s.info.started = !0)
            };
        We(this.info, n, function(e) {
            s.info.started && n(e), Ge(s.info)
        }), this.info.x = e.clientX, this.info.y = e.clientY
    },
    touchstart: function(e) {
        let t = e.changedTouches[0];
        this.info.x = t.clientX, this.info.y = t.clientY
    },
    touchmove: function(e) {
        let t = et(e),
            s = e.changedTouches[0],
            n = s.clientX,
            i = s.clientY;
        ht(this.info, n, i) && ("start" === this.info.state && lt("tap"), this.info.addMove({
            x: n,
            y: i
        }), ct(this.info, t, s), this.info.state = "track", this.info.started = !0)
    },
    touchend: function(e) {
        let t = et(e),
            s = e.changedTouches[0];
        this.info.started && (this.info.state = "end", this.info.addMove({
            x: s.clientX,
            y: s.clientY
        }), ct(this.info, t, s))
    }
}), it({
    name: "tap",
    deps: ["mousedown", "click", "touchstart", "touchend"],
    flow: {
        start: ["mousedown", "touchstart"],
        end: ["click", "touchend"]
    },
    emits: ["tap"],
    info: {
        x: NaN,
        y: NaN,
        prevent: !1
    },
    reset: function() {
        this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1
    },
    mousedown: function(e) {
        Ve(e) && (this.info.x = e.clientX, this.info.y = e.clientY)
    },
    click: function(e) {
        Ve(e) && dt(this.info, e)
    },
    touchstart: function(e) {
        const t = e.changedTouches[0];
        this.info.x = t.clientX, this.info.y = t.clientY
    },
    touchend: function(e) {
        dt(this.info, e.changedTouches[0], e)
    }
});
const ut = u(e => class extends e {
        _addEventListenerToNode(e, t, s) {
            st(e, t, s) || super._addEventListenerToNode(e, t, s)
        }
        _removeEventListenerFromNode(e, t, s) {
            nt(e, t, s) || super._removeEventListenerFromNode(e, t, s)
        }
    }),
    _t = /:host\(:dir\((ltr|rtl)\)\)/g,
    pt = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
    ft = /:dir\((?:ltr|rtl)\)/,
    mt = Boolean(window.ShadyDOM && window.ShadyDOM.inUse),
    yt = [];
let gt = null,
    bt = "";

function Ct() {
    bt = document.documentElement.getAttribute("dir")
}

function St(e) {
    if (!e.__autoDirOptOut) {
        e.setAttribute("dir", bt)
    }
}

function vt() {
    Ct(), bt = document.documentElement.getAttribute("dir");
    for (let e = 0; e < yt.length; e++) St(yt[e])
}
const wt = u(e => {
    mt || gt || (Ct(), gt = new MutationObserver(vt), gt.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["dir"]
    }));
    const s = t(e);
    class n extends s {
        static _processStyleText(e, t) {
            return e = s._processStyleText.call(this, e, t), !mt && ft.test(e) && (e = this._replaceDirInCssText(e), this.__activateDir = !0), e
        }
        static _replaceDirInCssText(e) {
            let t = e;
            return t = t.replace(_t, ':host([dir="$1"])'), t = t.replace(pt, ':host([dir="$2"]) $1'), t
        }
        constructor() {
            super(), this.__autoDirOptOut = !1
        }
        ready() {
            super.ready(), this.__autoDirOptOut = this.hasAttribute("dir")
        }
        connectedCallback() {
            s.prototype.connectedCallback && super.connectedCallback(), this.constructor.__activateDir && (gt && gt.takeRecords().length && vt(), yt.push(this), St(this))
        }
        disconnectedCallback() {
            if (s.prototype.disconnectedCallback && super.disconnectedCallback(), this.constructor.__activateDir) {
                const e = yt.indexOf(this);
                e > -1 && yt.splice(e, 1)
            }
        }
    }
    return n.__activateDir = !1, n
});

function Pt() {
    document.body.removeAttribute("unresolved")
}

function Et(e, t, s) {
    return {
        index: e,
        removed: t,
        addedCount: s
    }
}
"interactive" === document.readyState || "complete" === document.readyState ? Pt() : window.addEventListener("DOMContentLoaded", Pt);

function xt(e, t, s, n, i, r) {
    let o, l = 0,
        a = 0,
        h = Math.min(s - t, r - i);
    if (0 == t && 0 == i && (l = function(e, t, s) {
            for (let n = 0; n < s; n++)
                if (!At(e[n], t[n])) return n;
            return s
        }(e, n, h)), s == e.length && r == n.length && (a = function(e, t, s) {
            let n = e.length,
                i = t.length,
                r = 0;
            for (; r < s && At(e[--n], t[--i]);) r++;
            return r
        }(e, n, h - l)), i += l, r -= a, (s -= a) - (t += l) == 0 && r - i == 0) return [];
    if (t == s) {
        for (o = Et(t, [], 0); i < r;) o.removed.push(n[i++]);
        return [o]
    }
    if (i == r) return [Et(t, [], s - t)];
    let c = function(e) {
        let t = e.length - 1,
            s = e[0].length - 1,
            n = e[t][s],
            i = [];
        for (; t > 0 || s > 0;) {
            if (0 == t) {
                i.push(2), s--;
                continue
            }
            if (0 == s) {
                i.push(3), t--;
                continue
            }
            let r, o = e[t - 1][s - 1],
                l = e[t - 1][s],
                a = e[t][s - 1];
            r = l < a ? l < o ? l : o : a < o ? a : o, r == o ? (o == n ? i.push(0) : (i.push(1), n = o), t--, s--) : r == l ? (i.push(3), t--, n = l) : (i.push(2), s--, n = a)
        }
        return i.reverse(), i
    }(function(e, t, s, n, i, r) {
        let o = r - i + 1,
            l = s - t + 1,
            a = new Array(o);
        for (let e = 0; e < o; e++) a[e] = new Array(l), a[e][0] = e;
        for (let e = 0; e < l; e++) a[0][e] = e;
        for (let s = 1; s < o; s++)
            for (let r = 1; r < l; r++)
                if (At(e[t + r - 1], n[i + s - 1])) a[s][r] = a[s - 1][r - 1];
                else {
                    let e = a[s - 1][r] + 1,
                        t = a[s][r - 1] + 1;
                    a[s][r] = e < t ? e : t
                }
        return a
    }(e, t, s, n, i, r));
    o = void 0;
    let d = [],
        u = t,
        _ = i;
    for (let e = 0; e < c.length; e++) switch (c[e]) {
        case 0:
            o && (d.push(o), o = void 0), u++, _++;
            break;
        case 1:
            o || (o = Et(u, [], 0)), o.addedCount++, u++, o.removed.push(n[_]), _++;
            break;
        case 2:
            o || (o = Et(u, [], 0)), o.addedCount++, u++;
            break;
        case 3:
            o || (o = Et(u, [], 0)), o.removed.push(n[_]), _++
    }
    return o && d.push(o), d
}

function Ot(e, t) {
    return xt(e, 0, e.length, t, 0, t.length)
}

function At(e, t) {
    return e === t
}

function It(e) {
    return "slot" === e.localName
}
let Tt = class {
    static getFlattenedNodes(t) {
        const s = e(t);
        if (It(t)) return s.assignedNodes({
            flatten: !0
        }); {
            const t = [];
            for (let n = 0; n < s.childNodes.length; n++) {
                const i = s.childNodes[n];
                if (It(i)) {
                    const s = i;
                    t.push(...e(s).assignedNodes({
                        flatten: !0
                    }))
                } else t.push(i)
            }
            return t
        }
    }
    constructor(e, t) {
        this._shadyChildrenObserver = null, this._nativeChildrenObserver = null, this._connected = !1, this._target = e, this.callback = t, this._effectiveNodes = [], this._observer = null, this._scheduled = !1, this._boundSchedule = () => {
            this._schedule()
        }, this.connect(), this._schedule()
    }
    connect() {
        It(this._target) ? this._listenSlots([this._target]) : e(this._target).children && (this._listenSlots(e(this._target).children), window.ShadyDOM ? this._shadyChildrenObserver = window.ShadyDOM.observeChildren(this._target, e => {
            this._processMutations(e)
        }) : (this._nativeChildrenObserver = new MutationObserver(e => {
            this._processMutations(e)
        }), this._nativeChildrenObserver.observe(this._target, {
            childList: !0
        }))), this._connected = !0
    }
    disconnect() {
        It(this._target) ? this._unlistenSlots([this._target]) : e(this._target).children && (this._unlistenSlots(e(this._target).children), window.ShadyDOM && this._shadyChildrenObserver ? (window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver), this._shadyChildrenObserver = null) : this._nativeChildrenObserver && (this._nativeChildrenObserver.disconnect(), this._nativeChildrenObserver = null)), this._connected = !1
    }
    _schedule() {
        this._scheduled || (this._scheduled = !0, p.run(() => this.flush()))
    }
    _processMutations(e) {
        this._processSlotMutations(e), this.flush()
    }
    _processSlotMutations(e) {
        if (e)
            for (let t = 0; t < e.length; t++) {
                let s = e[t];
                s.addedNodes && this._listenSlots(s.addedNodes), s.removedNodes && this._unlistenSlots(s.removedNodes)
            }
    }
    flush() {
        if (!this._connected) return !1;
        window.ShadyDOM && ShadyDOM.flush(), this._nativeChildrenObserver ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords()) : this._shadyChildrenObserver && this._processSlotMutations(this._shadyChildrenObserver.takeRecords()), this._scheduled = !1;
        let e = {
                target: this._target,
                addedNodes: [],
                removedNodes: []
            },
            t = this.constructor.getFlattenedNodes(this._target),
            s = Ot(t, this._effectiveNodes);
        for (let t, n = 0; n < s.length && (t = s[n]); n++)
            for (let s, n = 0; n < t.removed.length && (s = t.removed[n]); n++) e.removedNodes.push(s);
        for (let n, i = 0; i < s.length && (n = s[i]); i++)
            for (let s = n.index; s < n.index + n.addedCount; s++) e.addedNodes.push(t[s]);
        this._effectiveNodes = t;
        let n = !1;
        return (e.addedNodes.length || e.removedNodes.length) && (n = !0, this.callback.call(this._target, e)), n
    }
    _listenSlots(e) {
        for (let t = 0; t < e.length; t++) {
            let s = e[t];
            It(s) && s.addEventListener("slotchange", this._boundSchedule)
        }
    }
    _unlistenSlots(e) {
        for (let t = 0; t < e.length; t++) {
            let s = e[t];
            It(s) && s.removeEventListener("slotchange", this._boundSchedule)
        }
    }
};
const Nt = function() {
        let e, t;
        do {
            e = window.ShadyDOM && ShadyDOM.flush(), window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush(), t = m()
        } while (e || t)
    },
    Dt = Element.prototype,
    Mt = Dt.matches || Dt.matchesSelector || Dt.mozMatchesSelector || Dt.msMatchesSelector || Dt.oMatchesSelector || Dt.webkitMatchesSelector,
    kt = function(e, t) {
        return Mt.call(e, t)
    };
class Rt {
    constructor(e) {
        window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(e), this.node = e
    }
    observeNodes(e) {
        return new Tt(this.node, e)
    }
    unobserveNodes(e) {
        e.disconnect()
    }
    notifyObserver() {}
    deepContains(t) {
        if (e(this.node).contains(t)) return !0;
        let s = t,
            n = t.ownerDocument;
        for (; s && s !== n && s !== this.node;) s = e(s).parentNode || e(s).host;
        return s === this.node
    }
    getOwnerRoot() {
        return e(this.node).getRootNode()
    }
    getDistributedNodes() {
        return "slot" === this.node.localName ? e(this.node).assignedNodes({
            flatten: !0
        }) : []
    }
    getDestinationInsertionPoints() {
        let t = [],
            s = e(this.node).assignedSlot;
        for (; s;) t.push(s), s = e(s).assignedSlot;
        return t
    }
    importNode(t, s) {
        let n = this.node instanceof Document ? this.node : this.node.ownerDocument;
        return e(n).importNode(t, s)
    }
    getEffectiveChildNodes() {
        return Tt.getFlattenedNodes(this.node)
    }
    queryDistributedElements(e) {
        let t = this.getEffectiveChildNodes(),
            s = [];
        for (let n, i = 0, r = t.length; i < r && (n = t[i]); i++) n.nodeType === Node.ELEMENT_NODE && kt(n, e) && s.push(n);
        return s
    }
    get activeElement() {
        let e = this.node;
        return void 0 !== e._activeElement ? e._activeElement : e.activeElement
    }
}

function Lt(e, t) {
    for (let s = 0; s < t.length; s++) {
        let n = t[s];
        Object.defineProperty(e, n, {
            get: function() {
                return this.node[n]
            },
            configurable: !0
        })
    }
}
class Ft {
    constructor(e) {
        this.event = e
    }
    get rootTarget() {
        return this.path[0]
    }
    get localTarget() {
        return this.event.target
    }
    get path() {
        return this.event.composedPath()
    }
}
Rt.prototype.cloneNode, Rt.prototype.appendChild, Rt.prototype.insertBefore, Rt.prototype.removeChild, Rt.prototype.replaceChild, Rt.prototype.setAttribute, Rt.prototype.removeAttribute, Rt.prototype.querySelector, Rt.prototype.querySelectorAll, Rt.prototype.parentNode, Rt.prototype.firstChild, Rt.prototype.lastChild, Rt.prototype.nextSibling, Rt.prototype.previousSibling, Rt.prototype.firstElementChild, Rt.prototype.lastElementChild, Rt.prototype.nextElementSibling, Rt.prototype.previousElementSibling, Rt.prototype.childNodes, Rt.prototype.children, Rt.prototype.classList, Rt.prototype.textContent, Rt.prototype.innerHTML;
let Ht = Rt;
if (window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.noPatch && window.ShadyDOM.Wrapper) {
    class e extends window.ShadyDOM.Wrapper {}
    Object.getOwnPropertyNames(Rt.prototype).forEach(t => {
        "activeElement" != t && (e.prototype[t] = Rt.prototype[t])
    }), Lt(e.prototype, ["classList"]), Ht = e, Object.defineProperties(Ft.prototype, {
        localTarget: {
            get() {
                const e = this.event.currentTarget,
                    t = e && jt(e).getOwnerRoot(),
                    s = this.path;
                for (let e = 0; e < s.length; e++) {
                    const n = s[e];
                    if (jt(n).getOwnerRoot() === t) return n
                }
            },
            configurable: !0
        },
        path: {
            get() {
                return window.ShadyDOM.composedPath(this.event)
            },
            configurable: !0
        }
    })
} else ! function(e, t) {
        for (let s = 0; s < t.length; s++) {
            let n = t[s];
            e[n] = function() {
                return this.node[n].apply(this.node, arguments)
            }
        }
    }(Rt.prototype, ["cloneNode", "appendChild", "insertBefore", "removeChild", "replaceChild", "setAttribute", "removeAttribute", "querySelector", "querySelectorAll", "attachShadow"]), Lt(Rt.prototype, ["parentNode", "firstChild", "lastChild", "nextSibling", "previousSibling", "firstElementChild", "lastElementChild", "nextElementSibling", "previousElementSibling", "childNodes", "children", "classList", "shadowRoot"]),
    function(e, t) {
        for (let s = 0; s < t.length; s++) {
            let n = t[s];
            Object.defineProperty(e, n, {
                get: function() {
                    return this.node[n]
                },
                set: function(e) {
                    this.node[n] = e
                },
                configurable: !0
            })
        }
    }(Rt.prototype, ["textContent", "innerHTML", "className"]);
const jt = function(e) {
        if ((e = e || document) instanceof Ht) return e;
        if (e instanceof Ft) return e;
        let t = e.__domApi;
        return t || (t = e instanceof Event ? new Ft(e) : new Ht(e), e.__domApi = t), t
    },
    $t = window.ShadyDOM,
    qt = window.ShadyCSS;

function Bt(t, s) {
    return e(t).getRootNode() === s
}
const zt = "disable-upgrade",
    Ut = e => {
        for (; e;) {
            const t = Object.getOwnPropertyDescriptor(e, "observedAttributes");
            if (t) return t.get;
            e = Object.getPrototypeOf(e.prototype).constructor
        }
        return () => []
    };
u(t => {
    const n = s(t);
    let i = Ut(n);
    return class extends n {
        constructor() {
            super(), this.__isUpgradeDisabled
        }
        static get observedAttributes() {
            return i.call(this).concat(zt)
        }
        _initializeProperties() {
            this.hasAttribute(zt) ? this.__isUpgradeDisabled = !0 : super._initializeProperties()
        }
        _enableProperties() {
            this.__isUpgradeDisabled || super._enableProperties()
        }
        _canApplyPropertyDefault(e) {
            return super._canApplyPropertyDefault(e) && !(this.__isUpgradeDisabled && this._isPropertyPending(e))
        }
        attributeChangedCallback(t, s, n, i) {
            t == zt ? this.__isUpgradeDisabled && null == n && (super._initializeProperties(), this.__isUpgradeDisabled = !1, e(this).isConnected && super.connectedCallback()) : super.attributeChangedCallback(t, s, n, i)
        }
        connectedCallback() {
            this.__isUpgradeDisabled || super.connectedCallback()
        }
        disconnectedCallback() {
            this.__isUpgradeDisabled || super.disconnectedCallback()
        }
    }
});
const Yt = "disable-upgrade";
let Jt = window.ShadyCSS;
const Vt = u(t => {
        const o = ut(s(t)),
            l = n ? o : wt(o),
            a = Ut(l),
            h = {
                x: "pan-x",
                y: "pan-y",
                none: "none",
                all: "auto"
            };
        class c extends l {
            constructor() {
                super(), this.isAttached, this.__boundListeners, this._debouncers, this.__isUpgradeDisabled, this.__needsAttributesAtConnected, this._legacyForceObservedAttributes
            }
            static get importMeta() {
                return this.prototype.importMeta
            }
            created() {}
            __attributeReaction(e, t, s) {
                (this.__dataAttributes && this.__dataAttributes[e] || e === Yt) && this.attributeChangedCallback(e, t, s, null)
            }
            setAttribute(e, t) {
                if (C && !this._legacyForceObservedAttributes) {
                    const s = this.getAttribute(e);
                    super.setAttribute(e, t), this.__attributeReaction(e, s, String(t))
                } else super.setAttribute(e, t)
            }
            removeAttribute(e) {
                if (C && !this._legacyForceObservedAttributes) {
                    const t = this.getAttribute(e);
                    super.removeAttribute(e), this.__attributeReaction(e, t, null)
                } else super.removeAttribute(e)
            }
            static get observedAttributes() {
                return C && !this.prototype._legacyForceObservedAttributes ? (this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes", this)) || (this.__observedAttributes = [], i(this.prototype)), this.__observedAttributes) : a.call(this).concat(Yt)
            }
            _enableProperties() {
                this.__isUpgradeDisabled || super._enableProperties()
            }
            _canApplyPropertyDefault(e) {
                return super._canApplyPropertyDefault(e) && !(this.__isUpgradeDisabled && this._isPropertyPending(e))
            }
            connectedCallback() {
                this.__needsAttributesAtConnected && this._takeAttributes(), this.__isUpgradeDisabled || (super.connectedCallback(), this.isAttached = !0, this.attached())
            }
            attached() {}
            disconnectedCallback() {
                this.__isUpgradeDisabled || (super.disconnectedCallback(), this.isAttached = !1, this.detached())
            }
            detached() {}
            attributeChangedCallback(t, s, n, i) {
                s !== n && (t == Yt ? this.__isUpgradeDisabled && null == n && (this._initializeProperties(), this.__isUpgradeDisabled = !1, e(this).isConnected && this.connectedCallback()) : (super.attributeChangedCallback(t, s, n, i), this.attributeChanged(t, s, n)))
            }
            attributeChanged(e, t, s) {}
            _initializeProperties() {
                if (S && this.hasAttribute(Yt)) this.__isUpgradeDisabled = !0;
                else {
                    let e = Object.getPrototypeOf(this);
                    e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished", e)) || (this._registered(), e.__hasRegisterFinished = !0), super._initializeProperties(), this.root = this, this.created(), C && !this._legacyForceObservedAttributes && (this.hasAttributes() ? this._takeAttributes() : this.parentNode || (this.__needsAttributesAtConnected = !0)), this._applyListeners()
                }
            }
            _takeAttributes() {
                const e = this.attributes;
                for (let t = 0, s = e.length; t < s; t++) {
                    const s = e[t];
                    this.__attributeReaction(s.name, null, s.value)
                }
            }
            _registered() {}
            ready() {
                this._ensureAttributes(), super.ready()
            }
            _ensureAttributes() {}
            _applyListeners() {}
            serialize(e) {
                return this._serializeValue(e)
            }
            deserialize(e, t) {
                return this._deserializeValue(e, t)
            }
            reflectPropertyToAttribute(e, t, s) {
                this._propertyToAttribute(e, t, s)
            }
            serializeValueToAttribute(e, t, s) {
                this._valueToNodeAttribute(s || this, e, t)
            }
            extend(e, t) {
                if (!e || !t) return e || t;
                let s = Object.getOwnPropertyNames(t);
                for (let n, i = 0; i < s.length && (n = s[i]); i++) {
                    let s = Object.getOwnPropertyDescriptor(t, n);
                    s && Object.defineProperty(e, n, s)
                }
                return e
            }
            mixin(e, t) {
                for (let s in t) e[s] = t[s];
                return e
            }
            chainObject(e, t) {
                return e && t && e !== t && (e.__proto__ = t), e
            }
            instanceTemplate(e) {
                let t = this.constructor._contentForTemplate(e);
                return document.importNode(t, !0)
            }
            fire(t, s, n) {
                n = n || {}, s = null == s ? {} : s;
                let i = new Event(t, {
                    bubbles: void 0 === n.bubbles || n.bubbles,
                    cancelable: Boolean(n.cancelable),
                    composed: void 0 === n.composed || n.composed
                });
                i.detail = s;
                let r = n.node || this;
                return e(r).dispatchEvent(i), i
            }
            listen(e, t, s) {
                e = e || this;
                let n = this.__boundListeners || (this.__boundListeners = new WeakMap),
                    i = n.get(e);
                i || (i = {}, n.set(e, i));
                let r = t + s;
                i[r] || (i[r] = this._addMethodEventListenerToNode(e, t, s, this))
            }
            unlisten(e, t, s) {
                e = e || this;
                let n = this.__boundListeners && this.__boundListeners.get(e),
                    i = t + s,
                    r = n && n[i];
                r && (this._removeEventListenerFromNode(e, t, r), n[i] = null)
            }
            setScrollDirection(e, t) {
                rt(t || this, h[e] || "auto")
            }
            $$(e) {
                return this.root.querySelector(e)
            }
            get domHost() {
                let t = e(this).getRootNode();
                return t instanceof DocumentFragment ? t.host : t
            }
            distributeContent() {
                const e = jt(this);
                window.ShadyDOM && e.shadowRoot && ShadyDOM.flush()
            }
            getEffectiveChildNodes() {
                return jt(this).getEffectiveChildNodes()
            }
            queryDistributedElements(e) {
                return jt(this).queryDistributedElements(e)
            }
            getEffectiveChildren() {
                return this.getEffectiveChildNodes().filter(function(e) {
                    return e.nodeType === Node.ELEMENT_NODE
                })
            }
            getEffectiveTextContent() {
                let e = this.getEffectiveChildNodes(),
                    t = [];
                for (let s, n = 0; s = e[n]; n++) s.nodeType !== Node.COMMENT_NODE && t.push(s.textContent);
                return t.join("")
            }
            queryEffectiveChildren(e) {
                let t = this.queryDistributedElements(e);
                return t && t[0]
            }
            queryAllEffectiveChildren(e) {
                return this.queryDistributedElements(e)
            }
            getContentChildNodes(e) {
                let t = this.root.querySelector(e || "slot");
                return t ? jt(t).getDistributedNodes() : []
            }
            getContentChildren(e) {
                return this.getContentChildNodes(e).filter(function(e) {
                    return e.nodeType === Node.ELEMENT_NODE
                })
            }
            isLightDescendant(t) {
                const s = this;
                return s !== t && e(s).contains(t) && e(s).getRootNode() === e(t).getRootNode()
            }
            isLocalDescendant(t) {
                return this.root === e(t).getRootNode()
            }
            scopeSubtree(t, s = !1) {
                return function(t, s = !1) {
                    if (!$t || !qt) return null;
                    if (!$t.handlesDynamicScoping) return null;
                    const n = qt.ScopingShim;
                    if (!n) return null;
                    const i = n.scopeForNode(t),
                        r = e(t).getRootNode(),
                        o = e => {
                            if (!Bt(e, r)) return;
                            const t = Array.from($t.nativeMethods.querySelectorAll.call(e, "*"));
                            t.push(e);
                            for (let e = 0; e < t.length; e++) {
                                const s = t[e];
                                if (!Bt(s, r)) continue;
                                const o = n.currentScopeForNode(s);
                                o !== i && ("" !== o && n.unscopeNode(s, o), n.scopeNode(s, i))
                            }
                        };
                    if (o(t), s) {
                        const e = new MutationObserver(e => {
                            for (let t = 0; t < e.length; t++) {
                                const s = e[t];
                                for (let e = 0; e < s.addedNodes.length; e++) {
                                    const t = s.addedNodes[e];
                                    t.nodeType === Node.ELEMENT_NODE && o(t)
                                }
                            }
                        });
                        return e.observe(t, {
                            childList: !0,
                            subtree: !0
                        }), e
                    }
                    return null
                }(t, s)
            }
            getComputedStyleValue(e) {
                return Jt.getComputedStyleValue(this, e)
            }
            debounce(e, t, s) {
                return this._debouncers = this._debouncers || {}, this._debouncers[e] = f.debounce(this._debouncers[e], s > 0 ? _.after(s) : p, t.bind(this))
            }
            isDebouncerActive(e) {
                this._debouncers = this._debouncers || {};
                let t = this._debouncers[e];
                return !(!t || !t.isActive())
            }
            flushDebouncer(e) {
                this._debouncers = this._debouncers || {};
                let t = this._debouncers[e];
                t && t.flush()
            }
            cancelDebouncer(e) {
                this._debouncers = this._debouncers || {};
                let t = this._debouncers[e];
                t && t.cancel()
            }
            async (e, t) {
                return t > 0 ? _.run(e.bind(this), t) : ~p.run(e.bind(this))
            }
            cancelAsync(e) {
                e < 0 ? p.cancel(~e) : _.cancel(e)
            }
            create(e, t) {
                let s = document.createElement(e);
                if (t)
                    if (s.setProperties) s.setProperties(t);
                    else
                        for (let e in t) s[e] = t[e];
                return s
            }
            elementMatches(e, t) {
                return kt(t || this, e)
            }
            toggleAttribute(t, s) {
                let n = this;
                return 3 === arguments.length && (n = arguments[2]), 1 == arguments.length && (s = !n.hasAttribute(t)), s ? (e(n).setAttribute(t, ""), !0) : (e(n).removeAttribute(t), !1)
            }
            toggleClass(e, t, s) {
                s = s || this, 1 == arguments.length && (t = !s.classList.contains(e)), t ? s.classList.add(e) : s.classList.remove(e)
            }
            transform(e, t) {
                (t = t || this).style.webkitTransform = e, t.style.transform = e
            }
            translate3d(e, t, s, n) {
                n = n || this, this.transform("translate3d(" + e + "," + t + "," + s + ")", n)
            }
            arrayDelete(e, t) {
                let s;
                if (Array.isArray(e)) {
                    if (s = e.indexOf(t), s >= 0) return e.splice(s, 1)
                } else {
                    if (s = r(this, e).indexOf(t), s >= 0) return this.splice(e, s, 1)
                }
                return null
            }
            _logger(e, t) {
                switch (Array.isArray(t) && 1 === t.length && Array.isArray(t[0]) && (t = t[0]), e) {
                    case "log":
                    case "warn":
                    case "error":
                        console[e](...t)
                }
            }
            _log(...e) {
                this._logger("log", e)
            }
            _warn(...e) {
                this._logger("warn", e)
            }
            _error(...e) {
                this._logger("error", e)
            }
            _logf(e, ...t) {
                return ["[%s::%s]", this.is, e, ...t]
            }
        }
        return c.prototype.is = "", c
    }),
    Xt = {
        attached: !0,
        detached: !0,
        ready: !0,
        created: !0,
        beforeRegister: !0,
        registered: !0,
        attributeChanged: !0,
        listeners: !0,
        hostAttributes: !0
    },
    Wt = {
        attached: !0,
        detached: !0,
        ready: !0,
        created: !0,
        beforeRegister: !0,
        registered: !0,
        attributeChanged: !0,
        behaviors: !0,
        _noAccessors: !0
    },
    Gt = Object.assign({
        listeners: !0,
        hostAttributes: !0,
        properties: !0,
        observers: !0
    }, Wt);

function Kt(e, t) {
    return ss({}, Vt(t), e)
}

function Qt(e, t, s, n) {
    ! function(e, t, s) {
        const n = e._noAccessors,
            i = Object.getOwnPropertyNames(e);
        for (let r = 0; r < i.length; r++) {
            let o = i[r];
            if (!(o in s))
                if (n) t[o] = e[o];
                else {
                    let s = Object.getOwnPropertyDescriptor(e, o);
                    s && (s.configurable = !0, Object.defineProperty(t, o, s))
                }
        }
    }(t, e, n);
    for (let e in Xt) t[e] && (s[e] = s[e] || [], s[e].push(t[e]))
}

function Zt(e, t, s) {
    t = t || [];
    for (let n = e.length - 1; n >= 0; n--) {
        let i = e[n];
        i ? Array.isArray(i) ? Zt(i, t) : t.indexOf(i) < 0 && (!s || s.indexOf(i) < 0) && t.unshift(i) : console.warn("behavior is null, check for missing or 404 import")
    }
    return t
}

function es(e, t) {
    for (const s in t) {
        const n = e[s],
            i = t[s];
        e[s] = !("value" in i) && n && "value" in n ? Object.assign({
            value: n.value
        }, i) : i
    }
}
const ts = Vt(HTMLElement);

function ss(e, t, s) {
    let n;
    const i = {};
    class r extends t {
        static _finalizeClass() {
            if (this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom", this))) {
                if (n)
                    for (let e, t = 0; t < n.length; t++) e = n[t], e.properties && this.createProperties(e.properties), e.observers && this.createObservers(e.observers, e.properties);
                e.properties && this.createProperties(e.properties), e.observers && this.createObservers(e.observers, e.properties), this._prepareTemplate()
            } else t._finalizeClass.call(this)
        }
        static get properties() {
            const t = {};
            if (n)
                for (let e = 0; e < n.length; e++) es(t, n[e].properties);
            return es(t, e.properties), t
        }
        static get observers() {
            let t = [];
            if (n)
                for (let e, s = 0; s < n.length; s++) e = n[s], e.observers && (t = t.concat(e.observers));
            return e.observers && (t = t.concat(e.observers)), t
        }
        created() {
            super.created();
            const e = i.created;
            if (e)
                for (let t = 0; t < e.length; t++) e[t].call(this)
        }
        _registered() {
            const e = r.prototype;
            if (!e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished", e))) {
                e.__hasRegisterFinished = !0, super._registered(), S && o(e);
                const t = Object.getPrototypeOf(this);
                let s = i.beforeRegister;
                if (s)
                    for (let e = 0; e < s.length; e++) s[e].call(t);
                if (s = i.registered, s)
                    for (let e = 0; e < s.length; e++) s[e].call(t)
            }
        }
        _applyListeners() {
            super._applyListeners();
            const e = i.listeners;
            if (e)
                for (let t = 0; t < e.length; t++) {
                    const s = e[t];
                    if (s)
                        for (let e in s) this._addMethodEventListenerToNode(this, e, s[e])
                }
        }
        _ensureAttributes() {
            const e = i.hostAttributes;
            if (e)
                for (let t = e.length - 1; t >= 0; t--) {
                    const s = e[t];
                    for (let e in s) this._ensureAttribute(e, s[e])
                }
            super._ensureAttributes()
        }
        ready() {
            super.ready();
            let e = i.ready;
            if (e)
                for (let t = 0; t < e.length; t++) e[t].call(this)
        }
        attached() {
            super.attached();
            let e = i.attached;
            if (e)
                for (let t = 0; t < e.length; t++) e[t].call(this)
        }
        detached() {
            super.detached();
            let e = i.detached;
            if (e)
                for (let t = 0; t < e.length; t++) e[t].call(this)
        }
        attributeChanged(e, t, s) {
            super.attributeChanged();
            let n = i.attributeChanged;
            if (n)
                for (let i = 0; i < n.length; i++) n[i].call(this, e, t, s)
        }
    }
    if (s) {
        Array.isArray(s) || (s = [s]);
        let e = t.prototype.behaviors;
        n = Zt(s, null, e), r.prototype.behaviors = e ? e.concat(s) : n
    }
    const o = t => {
        n && function(e, t, s) {
            for (let n = 0; n < t.length; n++) Qt(e, t[n], s, Gt)
        }(t, n, i), Qt(t, e, i, Wt)
    };
    return S || o(r.prototype), r.generatedFrom = e, r
}
const ns = function(e) {
    let t;
    return t = "function" == typeof e ? e : ns.Class(e), e._legacyForceObservedAttributes && (t.prototype._legacyForceObservedAttributes = e._legacyForceObservedAttributes), customElements.define(t.is, t), t
};

function is(e, t, s, n, i) {
    let r;
    i && (r = "object" == typeof s && null !== s, r && (n = e.__dataTemp[t]));
    let o = n !== s && (n == n || s == s);
    return r && o && (e.__dataTemp[t] = s), o
}
ns.Class = function(e, t) {
    e || console.warn("Polymer.Class requires `info` argument");
    let s = t ? t(ts) : ts;
    return s = ss(e, s, e.behaviors), s.is = s.prototype.is = e.is, s
};
const rs = u(e => class extends e {
        _shouldPropertyChange(e, t, s) {
            return is(this, e, t, s, !0)
        }
    }),
    os = u(e => class extends e {
        static get properties() {
            return {
                mutableData: Boolean
            }
        }
        _shouldPropertyChange(e, t, s) {
            return is(this, e, t, s, this.mutableData)
        }
    });
rs._mutablePropertyChange = is;
let ls = null;

function as() {
    return ls
}
as.prototype = Object.create(HTMLTemplateElement.prototype, {
    constructor: {
        value: as,
        writable: !0
    }
});
const hs = o(as),
    cs = rs(hs);
const ds = o(class {});

function us(t, s) {
    for (let n = 0; n < s.length; n++) {
        let i = s[n];
        if (Boolean(t) != Boolean(i.__hideTemplateChildren__))
            if (i.nodeType === Node.TEXT_NODE) t ? (i.__polymerTextContent__ = i.textContent, i.textContent = "") : i.textContent = i.__polymerTextContent__;
            else if ("slot" === i.localName)
            if (t) i.__polymerReplaced__ = document.createComment("hidden-slot"), e(e(i).parentNode).replaceChild(i.__polymerReplaced__, i);
            else {
                const t = i.__polymerReplaced__;
                t && e(e(t).parentNode).replaceChild(i, t)
            }
        else i.style && (t ? (i.__polymerDisplay__ = i.style.display, i.style.display = "none") : i.style.display = i.__polymerDisplay__);
        i.__hideTemplateChildren__ = t, i._showHideChildren && i._showHideChildren(t)
    }
}
class _s extends ds {
    constructor(e) {
        super(), this._configureProperties(e), this.root = this._stampTemplate(this.__dataHost);
        let t = [];
        this.children = t;
        for (let e = this.root.firstChild; e; e = e.nextSibling) t.push(e), e.__templatizeInstance = this;
        this.__templatizeOwner && this.__templatizeOwner.__hideTemplateChildren__ && this._showHideChildren(!0);
        let s = this.__templatizeOptions;
        (e && s.instanceProps || !s.instanceProps) && this._enableProperties()
    }
    _configureProperties(e) {
        if (this.__templatizeOptions.forwardHostProp)
            for (let e in this.__hostProps) this._setPendingProperty(e, this.__dataHost["_host_" + e]);
        for (let t in e) this._setPendingProperty(t, e[t])
    }
    forwardHostProp(e, t) {
        this._setPendingPropertyOrPath(e, t, !1, !0) && this.__dataHost._enqueueClient(this)
    }
    _addEventListenerToNode(e, t, s) {
        if (this._methodHost && this.__templatizeOptions.parentModel) this._methodHost._addEventListenerToNode(e, t, e => {
            e.model = this, s(e)
        });
        else {
            let n = this.__dataHost.__dataHost;
            n && n._addEventListenerToNode(e, t, s)
        }
    }
    _showHideChildren(e) {
        us(e, this.children)
    }
    _setUnmanagedPropertyToNode(e, t, s) {
        e.__hideTemplateChildren__ && e.nodeType == Node.TEXT_NODE && "textContent" == t ? e.__polymerTextContent__ = s : super._setUnmanagedPropertyToNode(e, t, s)
    }
    get parentModel() {
        let e = this.__parentModel;
        if (!e) {
            let t;
            e = this;
            do {
                e = e.__dataHost.__dataHost
            } while ((t = e.__templatizeOptions) && !t.parentModel);
            this.__parentModel = e
        }
        return e
    }
    dispatchEvent(e) {
        return !0
    }
}
_s.prototype.__dataHost, _s.prototype.__templatizeOptions, _s.prototype._methodHost, _s.prototype.__templatizeOwner, _s.prototype.__hostProps;
const ps = rs(_s);

function fs(e) {
    let t = e.__dataHost;
    return t && t._methodHost || t
}

function ms(e, t, s) {
    let n = s.mutableData ? ps : _s;
    Ss.mixin && (n = Ss.mixin(n));
    let i = class extends n {};
    return i.prototype.__templatizeOptions = s, i.prototype._bindTemplate(e),
        function(e, t, s, n) {
            let i = s.hostProps || {};
            for (let t in n.instanceProps) {
                delete i[t];
                let s = n.notifyInstanceProp;
                s && e.prototype._addPropertyEffect(t, e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {
                    fn: bs(t, s)
                })
            }
            if (n.forwardHostProp && t.__dataHost)
                for (let t in i) s.hasHostProps || (s.hasHostProps = !0), e.prototype._addPropertyEffect(t, e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {
                    fn: Cs()
                })
        }(i, e, t, s), i
}

function ys(e, t, s, n) {
    let i = s.forwardHostProp;
    if (i && t.hasHostProps) {
        const l = "template" == e.localName;
        let a = t.templatizeTemplateClass;
        if (!a) {
            if (l) {
                let e = s.mutableData ? cs : hs;
                class n extends e {}
                a = t.templatizeTemplateClass = n
            } else {
                const s = e.constructor;
                class n extends s {}
                a = t.templatizeTemplateClass = n
            }
            let r = t.hostProps;
            for (let e in r) a.prototype._addPropertyEffect("_host_" + e, a.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, {
                fn: gs(e, i)
            }), a.prototype._createNotifyingProperty("_host_" + e);
            w && n && function(e, t, s) {
                const n = s.constructor._properties,
                    {
                        propertyEffects: i
                    } = e,
                    {
                        instanceProps: r
                    } = t;
                for (let e in i)
                    if (!(n[e] || r && r[e])) {
                        const t = i[e];
                        for (let s = 0; s < t.length; s++) {
                            const {
                                part: n
                            } = t[s].info;
                            if (!n.signature || !n.signature.static) {
                                console.warn(`Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`);
                                break
                            }
                        }
                    }
            }(t, s, n)
        }
        if (e.__dataProto && Object.assign(e.__data, e.__dataProto), l) o = a, ls = r = e, Object.setPrototypeOf(r, o.prototype), new o, ls = null, e.__dataTemp = {}, e.__dataPending = null, e.__dataOld = null, e._enableProperties();
        else {
            Object.setPrototypeOf(e, a.prototype);
            const s = t.hostProps;
            for (let t in s)
                if (t = "_host_" + t, t in e) {
                    const s = e[t];
                    delete e[t], e.__data[t] = s
                }
        }
    }
    var r, o
}

function gs(e, t) {
    return function(e, s, n) {
        t.call(e.__templatizeOwner, s.substring(6), n[s])
    }
}

function bs(e, t) {
    return function(e, s, n) {
        t.call(e.__templatizeOwner, e, s, n[s])
    }
}

function Cs() {
    return function(e, t, s) {
        e.__dataHost._setPendingPropertyOrPath("_host_" + t, s[t], !0, !0)
    }
}

function Ss(e, t, s) {
    if (v && !fs(e)) throw new Error("strictTemplatePolicy: template owner not trusted");
    if (s = s || {}, e.__templatizeOwner) throw new Error("A <template> can only be templatized once");
    e.__templatizeOwner = t;
    let n = (t ? t.constructor : _s)._parseTemplate(e),
        i = n.templatizeInstanceClass;
    i || (i = ms(e, n, s), n.templatizeInstanceClass = i);
    const r = fs(e);
    ys(e, n, s, r);
    let o = class extends i {};
    return o.prototype._methodHost = r, o.prototype.__dataHost = e, o.prototype.__templatizeOwner = t, o.prototype.__hostProps = n.hostProps, o
}
let vs = !1;

function ws() {
    if (S && !P) {
        if (!vs) {
            vs = !0;
            const e = document.createElement("style");
            e.textContent = "dom-bind,dom-if,dom-repeat{display:none;}", document.head.appendChild(e)
        }
        return !0
    }
    return !1
}
const Ps = ut(os(o(HTMLElement)));
customElements.define("dom-bind", class extends Ps {
    static get observedAttributes() {
        return ["mutable-data"]
    }
    constructor() {
        if (super(), v) throw new Error("strictTemplatePolicy: dom-bind not allowed");
        this.root = null, this.$ = null, this.__children = null
    }
    attributeChangedCallback(e, t, s, n) {
        this.mutableData = !0
    }
    connectedCallback() {
        ws() || (this.style.display = "none"), this.render()
    }
    disconnectedCallback() {
        this.__removeChildren()
    }
    __insertChildren() {
        e(e(this).parentNode).insertBefore(this.root, this)
    }
    __removeChildren() {
        if (this.__children)
            for (let e = 0; e < this.__children.length; e++) this.root.appendChild(this.__children[e])
    }
    render() {
        let e;
        if (!this.__children) {
            if (e = e || this.querySelector("template"), !e) {
                let t = new MutationObserver(() => {
                    if (e = this.querySelector("template"), !e) throw new Error("dom-bind requires a <template> child");
                    t.disconnect(), this.render()
                });
                return void t.observe(this, {
                    childList: !0
                })
            }
            this.root = this._stampTemplate(e), this.$ = this.root.$, this.__children = [];
            for (let e = this.root.firstChild; e; e = e.nextSibling) this.__children[this.__children.length] = e;
            this._enableProperties()
        }
        this.__insertChildren(), this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        }))
    }
});
const Es = os(l);
class xs extends Es {
    static get is() {
        return "dom-repeat"
    }
    static get template() {
        return null
    }
    static get properties() {
        return {
            items: {
                type: Array
            },
            as: {
                type: String,
                value: "item"
            },
            indexAs: {
                type: String,
                value: "index"
            },
            itemsIndexAs: {
                type: String,
                value: "itemsIndex"
            },
            sort: {
                type: Function,
                observer: "__sortChanged"
            },
            filter: {
                type: Function,
                observer: "__filterChanged"
            },
            observe: {
                type: String,
                observer: "__observeChanged"
            },
            delay: Number,
            renderedItemCount: {
                type: Number,
                notify: !E,
                readOnly: !0
            },
            initialCount: {
                type: Number
            },
            targetFramerate: {
                type: Number,
                value: 20
            },
            _targetFrameTime: {
                type: Number,
                computed: "__computeFrameTime(targetFramerate)"
            },
            notifyDomChange: {
                type: Boolean
            },
            reuseChunkedInstances: {
                type: Boolean
            }
        }
    }
    static get observers() {
        return ["__itemsChanged(items.*)"]
    }
    constructor() {
        super(), this.__instances = [], this.__renderDebouncer = null, this.__itemsIdxToInstIdx = {}, this.__chunkCount = null, this.__renderStartTime = null, this.__itemsArrayChanged = !1, this.__shouldMeasureChunk = !1, this.__shouldContinueChunking = !1, this.__chunkingId = 0, this.__sortFn = null, this.__filterFn = null, this.__observePaths = null, this.__ctor = null, this.__isDetached = !0, this.template = null, this._templateInfo
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.__isDetached = !0;
        for (let e = 0; e < this.__instances.length; e++) this.__detachInstance(e);
        this.__chunkingId && cancelAnimationFrame(this.__chunkingId)
    }
    connectedCallback() {
        if (super.connectedCallback(), ws() || (this.style.display = "none"), this.__isDetached) {
            this.__isDetached = !1;
            let t = e(e(this).parentNode);
            for (let e = 0; e < this.__instances.length; e++) this.__attachInstance(e, t);
            this.__chunkingId && this.__render()
        }
    }
    __ensureTemplatized() {
        if (!this.__ctor) {
            const e = this;
            let t = this.template = e._templateInfo ? e : this.querySelector("template");
            if (!t) {
                let e = new MutationObserver(() => {
                    if (!this.querySelector("template")) throw new Error("dom-repeat requires a <template> child");
                    e.disconnect(), this.__render()
                });
                return e.observe(this, {
                    childList: !0
                }), !1
            }
            let s = {};
            s[this.as] = !0, s[this.indexAs] = !0, s[this.itemsIndexAs] = !0, this.__ctor = Ss(t, this, {
                mutableData: this.mutableData,
                parentModel: !0,
                instanceProps: s,
                forwardHostProp: function(e, t) {
                    let s = this.__instances;
                    for (let n, i = 0; i < s.length && (n = s[i]); i++) n.forwardHostProp(e, t)
                },
                notifyInstanceProp: function(e, t, s) {
                    if (a(this.as, t)) {
                        let n = e[this.itemsIndexAs];
                        t == this.as && (this.items[n] = s);
                        let i = h(this.as, `${JSCompiler_renameProperty("items",this)}.${n}`, t);
                        this.notifyPath(i, s)
                    }
                }
            })
        }
        return !0
    }
    __getMethodHost() {
        return this.__dataHost._methodHost || this.__dataHost
    }
    __functionFromPropertyValue(e) {
        if ("string" == typeof e) {
            let t = e,
                s = this.__getMethodHost();
            return function() {
                return s[t].apply(s, arguments)
            }
        }
        return e
    }
    __sortChanged(e) {
        this.__sortFn = this.__functionFromPropertyValue(e), this.items && this.__debounceRender(this.__render)
    }
    __filterChanged(e) {
        this.__filterFn = this.__functionFromPropertyValue(e), this.items && this.__debounceRender(this.__render)
    }
    __computeFrameTime(e) {
        return Math.ceil(1e3 / e)
    }
    __observeChanged() {
        this.__observePaths = this.observe && this.observe.replace(".*", ".").split(" ")
    }
    __handleObservedPaths(e) {
        if (this.__sortFn || this.__filterFn)
            if (e) {
                if (this.__observePaths) {
                    let t = this.__observePaths;
                    for (let s = 0; s < t.length; s++) 0 === e.indexOf(t[s]) && this.__debounceRender(this.__render, this.delay)
                }
            } else this.__debounceRender(this.__render, this.delay)
    }
    __itemsChanged(e) {
        this.items && !Array.isArray(this.items) && console.warn("dom-repeat expected array for `items`, found", this.items), this.__handleItemPath(e.path, e.value) || ("items" === e.path && (this.__itemsArrayChanged = !0), this.__debounceRender(this.__render))
    }
    __debounceRender(e, t = 0) {
        this.__renderDebouncer = f.debounce(this.__renderDebouncer, t > 0 ? _.after(t) : p, e.bind(this)), y(this.__renderDebouncer)
    }
    render() {
        this.__debounceRender(this.__render), Nt()
    }
    __render() {
        if (!this.__ensureTemplatized()) return;
        let e = this.items || [];
        const t = this.__sortAndFilterItems(e),
            s = this.__calculateLimit(t.length);
        this.__updateInstances(e, s, t), this.initialCount && (this.__shouldMeasureChunk || this.__shouldContinueChunking) && (cancelAnimationFrame(this.__chunkingId), this.__chunkingId = requestAnimationFrame(() => {
            this.__chunkingId = null, this.__continueChunking()
        })), this._setRenderedItemCount(this.__instances.length), E && !this.notifyDomChange || this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        }))
    }
    __sortAndFilterItems(e) {
        let t = new Array(e.length);
        for (let s = 0; s < e.length; s++) t[s] = s;
        return this.__filterFn && (t = t.filter((t, s, n) => this.__filterFn(e[t], s, n))), this.__sortFn && t.sort((t, s) => this.__sortFn(e[t], e[s])), t
    }
    __calculateLimit(e) {
        let t = e;
        const s = this.__instances.length;
        if (this.initialCount) {
            let n;
            !this.__chunkCount || this.__itemsArrayChanged && !this.reuseChunkedInstances ? (t = Math.min(e, this.initialCount), n = Math.max(t - s, 0), this.__chunkCount = n || 1) : (n = Math.min(Math.max(e - s, 0), this.__chunkCount), t = Math.min(s + n, e)), this.__shouldMeasureChunk = n === this.__chunkCount, this.__shouldContinueChunking = t < e, this.__renderStartTime = performance.now()
        }
        return this.__itemsArrayChanged = !1, t
    }
    __continueChunking() {
        if (this.__shouldMeasureChunk) {
            const e = performance.now() - this.__renderStartTime,
                t = this._targetFrameTime / e;
            this.__chunkCount = Math.round(this.__chunkCount * t) || 1
        }
        this.__shouldContinueChunking && this.__debounceRender(this.__render)
    }
    __updateInstances(e, t, s) {
        const n = this.__itemsIdxToInstIdx = {};
        let i;
        for (i = 0; i < t; i++) {
            let t = this.__instances[i],
                r = s[i],
                o = e[r];
            n[r] = i, t ? (t._setPendingProperty(this.as, o), t._setPendingProperty(this.indexAs, i), t._setPendingProperty(this.itemsIndexAs, r), t._flushProperties()) : this.__insertInstance(o, i, r)
        }
        for (let e = this.__instances.length - 1; e >= i; e--) this.__detachAndRemoveInstance(e)
    }
    __detachInstance(t) {
        let s = this.__instances[t];
        const n = e(s.root);
        for (let e = 0; e < s.children.length; e++) {
            let t = s.children[e];
            n.appendChild(t)
        }
        return s
    }
    __attachInstance(e, t) {
        let s = this.__instances[e];
        t.insertBefore(s.root, this)
    }
    __detachAndRemoveInstance(e) {
        this.__detachInstance(e), this.__instances.splice(e, 1)
    }
    __stampInstance(e, t, s) {
        let n = {};
        return n[this.as] = e, n[this.indexAs] = t, n[this.itemsIndexAs] = s, new this.__ctor(n)
    }
    __insertInstance(t, s, n) {
        const i = this.__stampInstance(t, s, n);
        let r = this.__instances[s + 1],
            o = r ? r.children[0] : this;
        return e(e(this).parentNode).insertBefore(i.root, o), this.__instances[s] = i, i
    }
    _showHideChildren(e) {
        for (let t = 0; t < this.__instances.length; t++) this.__instances[t]._showHideChildren(e)
    }
    __handleItemPath(e, t) {
        let s = e.slice(6),
            n = s.indexOf("."),
            i = n < 0 ? s : s.substring(0, n);
        if (i == parseInt(i, 10)) {
            let e = n < 0 ? "" : s.substring(n + 1);
            this.__handleObservedPaths(e);
            let r = this.__itemsIdxToInstIdx[i],
                o = this.__instances[r];
            if (o) {
                let s = this.as + (e ? "." + e : "");
                o._setPendingPropertyOrPath(s, t, !1, !0), o._flushProperties()
            }
            return !0
        }
    }
    itemForElement(e) {
        let t = this.modelForElement(e);
        return t && t[this.as]
    }
    indexForElement(e) {
        let t = this.modelForElement(e);
        return t && t[this.indexAs]
    }
    modelForElement(t) {
        return function(t, s) {
            let n;
            for (; s;)
                if (n = s.__dataHost ? s : s.__templatizeInstance) {
                    if (n.__dataHost == t) return n;
                    s = n.__dataHost
                } else s = e(s).parentNode;
            return null
        }(this.template, t)
    }
}
customElements.define(xs.is, xs);
class Os extends l {
    static get is() {
        return "dom-if"
    }
    static get template() {
        return null
    }
    static get properties() {
        return {
            if: {
                type: Boolean,
                observer: "__debounceRender"
            },
            restamp: {
                type: Boolean,
                observer: "__debounceRender"
            },
            notifyDomChange: {
                type: Boolean
            }
        }
    }
    constructor() {
        super(), this.__renderDebouncer = null, this._lastIf = !1, this.__hideTemplateChildren__ = !1, this.__template, this._templateInfo
    }
    __debounceRender() {
        this.__renderDebouncer = f.debounce(this.__renderDebouncer, p, () => this.__render()), y(this.__renderDebouncer)
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        const t = e(this).parentNode;
        t && (t.nodeType != Node.DOCUMENT_FRAGMENT_NODE || e(t).host) || this.__teardownInstance()
    }
    connectedCallback() {
        super.connectedCallback(), ws() || (this.style.display = "none"), this.if && this.__debounceRender()
    }
    __ensureTemplate() {
        if (!this.__template) {
            const t = this;
            let s = t._templateInfo ? t : e(t).querySelector("template");
            if (!s) {
                let t = new MutationObserver(() => {
                    if (!e(this).querySelector("template")) throw new Error("dom-if requires a <template> child");
                    t.disconnect(), this.__render()
                });
                return t.observe(this, {
                    childList: !0
                }), !1
            }
            this.__template = s
        }
        return !0
    }
    __ensureInstance() {
        let t = e(this).parentNode;
        if (this.__hasInstance()) {
            let s = this.__getInstanceNodes();
            if (s && s.length) {
                if (e(this).previousSibling !== s[s.length - 1])
                    for (let n, i = 0; i < s.length && (n = s[i]); i++) e(t).insertBefore(n, this)
            }
        } else {
            if (!t) return !1;
            if (!this.__ensureTemplate()) return !1;
            this.__createAndInsertInstance(t)
        }
        return !0
    }
    render() {
        Nt()
    }
    __render() {
        if (this.if) {
            if (!this.__ensureInstance()) return
        } else this.restamp && this.__teardownInstance();
        this._showHideChildren(), E && !this.notifyDomChange || this.if == this._lastIf || (this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        })), this._lastIf = this.if)
    }
    __hasInstance() {}
    __getInstanceNodes() {}
    __createAndInsertInstance(e) {}
    __teardownInstance() {}
    _showHideChildren() {}
}
const As = x ? class extends Os {
    constructor() {
        super(), this.__instance = null, this.__syncInfo = null
    }
    __hasInstance() {
        return Boolean(this.__instance)
    }
    __getInstanceNodes() {
        return this.__instance.templateInfo.childNodes
    }
    __createAndInsertInstance(t) {
        const s = this.__dataHost || this;
        if (v && !this.__dataHost) throw new Error("strictTemplatePolicy: template owner not trusted");
        const n = s._bindTemplate(this.__template, !0);
        n.runEffects = (e, t, s) => {
            let n = this.__syncInfo;
            if (this.if) n && (this.__syncInfo = null, this._showHideChildren(), t = Object.assign(n.changedProps, t)), e(t, s);
            else if (this.__instance)
                if (n || (n = this.__syncInfo = {
                        runEffects: e,
                        changedProps: {}
                    }), s)
                    for (const e in t) {
                        const t = c(e);
                        n.changedProps[t] = this.__dataHost[t]
                    } else Object.assign(n.changedProps, t)
        }, this.__instance = s._stampTemplate(this.__template, n), e(t).insertBefore(this.__instance, this)
    }
    __syncHostProperties() {
        const e = this.__syncInfo;
        e && (this.__syncInfo = null, e.runEffects(e.changedProps, !1))
    }
    __teardownInstance() {
        const e = this.__dataHost || this;
        this.__instance && (e._removeBoundDom(this.__instance), this.__instance = null, this.__syncInfo = null)
    }
    _showHideChildren() {
        const e = this.__hideTemplateChildren__ || !this.if;
        this.__instance && Boolean(this.__instance.__hidden) !== e && (this.__instance.__hidden = e, us(e, this.__instance.templateInfo.childNodes)), e || this.__syncHostProperties()
    }
} : class extends Os {
    constructor() {
        super(), this.__ctor = null, this.__instance = null, this.__invalidProps = null
    }
    __hasInstance() {
        return Boolean(this.__instance)
    }
    __getInstanceNodes() {
        return this.__instance.children
    }
    __createAndInsertInstance(t) {
        this.__ctor || (this.__ctor = Ss(this.__template, this, {
            mutableData: !0,
            forwardHostProp: function(e, t) {
                this.__instance && (this.if ? this.__instance.forwardHostProp(e, t) : (this.__invalidProps = this.__invalidProps || Object.create(null), this.__invalidProps[c(e)] = !0))
            }
        })), this.__instance = new this.__ctor, e(t).insertBefore(this.__instance.root, this)
    }
    __teardownInstance() {
        if (this.__instance) {
            let t = this.__instance.children;
            if (t && t.length) {
                let s = e(t[0]).parentNode;
                if (s) {
                    s = e(s);
                    for (let e, n = 0; n < t.length && (e = t[n]); n++) s.removeChild(e)
                }
            }
            this.__invalidProps = null, this.__instance = null
        }
    }
    __syncHostProperties() {
        let e = this.__invalidProps;
        if (e) {
            this.__invalidProps = null;
            for (let t in e) this.__instance._setPendingProperty(t, this.__dataHost[t]);
            this.__instance._flushProperties()
        }
    }
    _showHideChildren() {
        const e = this.__hideTemplateChildren__ || !this.if;
        this.__instance && Boolean(this.__instance.__hidden) !== e && (this.__instance.__hidden = e, this.__instance._showHideChildren(e)), e || this.__syncHostProperties()
    }
};
customElements.define(As.is, As);
let Is = u(e => {
    let t = s(e);
    return class extends t {
        static get properties() {
            return {
                items: {
                    type: Array
                },
                multi: {
                    type: Boolean,
                    value: !1
                },
                selected: {
                    type: Object,
                    notify: !0
                },
                selectedItem: {
                    type: Object,
                    notify: !0
                },
                toggle: {
                    type: Boolean,
                    value: !1
                }
            }
        }
        static get observers() {
            return ["__updateSelection(multi, items.*)"]
        }
        constructor() {
            super(), this.__lastItems = null, this.__lastMulti = null, this.__selectedMap = null
        }
        __updateSelection(e, t) {
            let s = t.path;
            if (s == JSCompiler_renameProperty("items", this)) {
                let s = t.base || [],
                    n = this.__lastItems;
                if (e !== this.__lastMulti && this.clearSelection(), n) {
                    let e = Ot(s, n);
                    this.__applySplices(e)
                }
                this.__lastItems = s, this.__lastMulti = e
            } else if (t.path == `${JSCompiler_renameProperty("items",this)}.splices`) this.__applySplices(t.value.indexSplices);
            else {
                let e = s.slice(`${JSCompiler_renameProperty("items",this)}.`.length),
                    t = parseInt(e, 10);
                e.indexOf(".") < 0 && e == t && this.__deselectChangedIdx(t)
            }
        }
        __applySplices(e) {
            let t = this.__selectedMap;
            for (let s = 0; s < e.length; s++) {
                let n = e[s];
                t.forEach((e, s) => {
                    e < n.index || (e >= n.index + n.removed.length ? t.set(s, e + n.addedCount - n.removed.length) : t.set(s, -1))
                });
                for (let e = 0; e < n.addedCount; e++) {
                    let s = n.index + e;
                    t.has(this.items[s]) && t.set(this.items[s], s)
                }
            }
            this.__updateLinks();
            let s = 0;
            t.forEach((e, n) => {
                e < 0 ? (this.multi ? this.splice(JSCompiler_renameProperty("selected", this), s, 1) : this.selected = this.selectedItem = null, t.delete(n)) : s++
            })
        }
        __updateLinks() {
            if (this.__dataLinkedPaths = {}, this.multi) {
                let e = 0;
                this.__selectedMap.forEach(t => {
                    t >= 0 && this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`, `${JSCompiler_renameProperty("selected",this)}.${e++}`)
                })
            } else this.__selectedMap.forEach(e => {
                this.linkPaths(JSCompiler_renameProperty("selected", this), `${JSCompiler_renameProperty("items",this)}.${e}`), this.linkPaths(JSCompiler_renameProperty("selectedItem", this), `${JSCompiler_renameProperty("items",this)}.${e}`)
            })
        }
        clearSelection() {
            this.__dataLinkedPaths = {}, this.__selectedMap = new Map, this.selected = this.multi ? [] : null, this.selectedItem = null
        }
        isSelected(e) {
            return this.__selectedMap.has(e)
        }
        isIndexSelected(e) {
            return this.isSelected(this.items[e])
        }
        __deselectChangedIdx(e) {
            let t = this.__selectedIndexForItemIndex(e);
            if (t >= 0) {
                let e = 0;
                this.__selectedMap.forEach((s, n) => {
                    t == e++ && this.deselect(n)
                })
            }
        }
        __selectedIndexForItemIndex(e) {
            let t = this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];
            if (t) return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length), 10)
        }
        deselect(e) {
            let t = this.__selectedMap.get(e);
            if (t >= 0) {
                let s;
                this.__selectedMap.delete(e), this.multi && (s = this.__selectedIndexForItemIndex(t)), this.__updateLinks(), this.multi ? this.splice(JSCompiler_renameProperty("selected", this), s, 1) : this.selected = this.selectedItem = null
            }
        }
        deselectIndex(e) {
            this.deselect(this.items[e])
        }
        select(e) {
            this.selectIndex(this.items.indexOf(e))
        }
        selectIndex(e) {
            let t = this.items[e];
            this.isSelected(t) ? this.toggle && this.deselectIndex(e) : (this.multi || this.__selectedMap.clear(), this.__selectedMap.set(t, e), this.__updateLinks(), this.multi ? this.push(JSCompiler_renameProperty("selected", this), t) : this.selected = this.selectedItem = t)
        }
    }
})(l);
class Ts extends Is {
    static get is() {
        return "array-selector"
    }
    static get template() {
        return null
    }
}
customElements.define(Ts.is, Ts);
const Ns = new xe;
window.ShadyCSS || (window.ShadyCSS = {
    prepareTemplate(e, t, s) {},
    prepareTemplateDom(e, t) {},
    prepareTemplateStyles(e, t, s) {},
    styleSubtree(e, t) {
        Ns.processStyles(), se(e, t)
    },
    styleElement(e) {
        Ns.processStyles()
    },
    styleDocument(e) {
        Ns.processStyles(), se(document.body, e)
    },
    getComputedStyleValue: (e, t) => ne(e, t),
    flushCustomStyles() {},
    nativeCss: D,
    nativeShadow: O,
    cssBuild: I,
    disableRuntime: N
}), window.ShadyCSS.CustomStyleInterface = Ns;
const Ds = "include",
    Ms = window.ShadyCSS.CustomStyleInterface;
class ks extends HTMLElement {
    constructor() {
        super(), this._style = null, Ms.addCustomStyle(this)
    }
    getStyle() {
        if (this._style) return this._style;
        const e = this.querySelector("style");
        if (!e) return null;
        this._style = e;
        const t = e.getAttribute(Ds);
        return t && (e.removeAttribute(Ds), e.textContent = d(t) + e.textContent), this.ownerDocument !== window.document && window.document.head.appendChild(this), this._style
    }
}
window.customElements.define("custom-style", ks);
const Rs = Vt(HTMLElement).prototype;
export {
    Rs as B, wt as D, ns as P, Ot as c, jt as d, Nt as f, Kt as m, Ss as t
};