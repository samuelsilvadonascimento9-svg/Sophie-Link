import {
    f as o,
    g as t,
    b as e,
    e as n
} from "./dom.js";
window.D2L = window.D2L || {}, window.D2L.Dom = window.D2L.Dom || {}, window.D2L.Dom.findComposedAncestor = o, window.D2L.Dom.getComposedChildren = t, window.D2L.Dom.getComposedParent = e, window.D2L.Dom.isComposedAncestor = n, window.D2L.Dom.getOffsetParent = function(o) {
    if (!window.ShadowRoot) return o.offsetParent;
    if (!this.getComposedParent(o) || "BODY" === o.tagName || "fixed" === window.getComputedStyle(o).position) return null;
    let t = this.getComposedParent(o);
    for (; t;) {
        if (t instanceof ShadowRoot) t = this.getComposedParent(t);
        else {
            if (t instanceof DocumentFragment) return null;
            if ("BODY" === t.tagName) return t
        }
        const o = window.getComputedStyle(t).position,
            e = t.tagName;
        if (o && "static" !== o || "static" === o && ("TD" === e || "TH" === e || "TABLE" === e)) return t;
        t = this.getComposedParent(t)
    }
    return null
};