import "./boot.js";
let e, o, t = /(url\()([^)]*)(\))/g,
    n = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/;

function r(t, r) {
    if (t && n.test(t)) return t;
    if ("//" === t) return t;
    if (void 0 === e) {
        e = !1;
        try {
            const o = new URL("b", "http://a");
            o.pathname = "c%20d", e = "http://a/c%20d" === o.href
        } catch (e) {}
    }
    if (r || (r = document.baseURI || window.location.href), e) try {
        return new URL(t, r).href
    } catch (e) {
        return t
    }
    return o || (o = document.implementation.createHTMLDocument("temp"), o.base = o.createElement("base"), o.head.appendChild(o.base), o.anchor = o.createElement("a"), o.body.appendChild(o.anchor)), o.base.href = r, o.anchor.href = t, o.anchor.href || t
}

function a(e, o) {
    return e.replace(t, function(e, t, n, a) {
        return t + "'" + r(n.replace(/["']/g, ""), o) + "'" + a
    })
}

function w(e) {
    return e.substring(0, e.lastIndexOf("/") + 1)
}
const d = !window.ShadyDOM || !window.ShadyDOM.inUse;
Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
const i = d && "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype && (() => {
    try {
        const e = new CSSStyleSheet;
        e.replaceSync("");
        const o = document.createElement("div");
        return o.attachShadow({
            mode: "open"
        }), o.shadowRoot.adoptedStyleSheets = [e], o.shadowRoot.adoptedStyleSheets[0] === e
    } catch (e) {
        return !1
    }
})();
let l = window.Polymer && window.Polymer.rootPath || w(document.baseURI || window.location.href),
    s = window.Polymer && window.Polymer.sanitizeDOMValue || void 0,
    m = window.Polymer && window.Polymer.setPassiveTouchGestures || !1,
    y = window.Polymer && window.Polymer.strictTemplatePolicy || !1,
    c = window.Polymer && window.Polymer.allowTemplateFromDomModule || !1,
    h = window.Polymer && window.Polymer.legacyOptimizations || !1,
    p = window.Polymer && window.Polymer.legacyWarnings || !1,
    u = window.Polymer && window.Polymer.syncInitialRender || !1,
    P = window.Polymer && window.Polymer.legacyUndefined || !1,
    S = window.Polymer && window.Polymer.orderedComputed || !1,
    f = !0;
const b = function(e) {
    f = e
};
let g = window.Polymer && window.Polymer.removeNestedTemplates || !1,
    C = window.Polymer && window.Polymer.fastDomIf || !1,
    v = window.Polymer && window.Polymer.suppressTemplateNotifications || !1,
    D = window.Polymer && window.Polymer.legacyNoObservedAttributes || !1,
    R = window.Polymer && window.Polymer.useAdoptedStyleSheetsWithBuiltCSS || !1;
export {
    y as a, a as b, g as c, s as d, h as e, C as f, l as g, u as h, p as i, c as j, R as k, P as l, i as m, f as n, S as o, w as p, m as q, r, b as s, D as t, d as u, v
};