function e(e) {
    return window.CSS && window.CSS.escape ? window.CSS.escape(e) : e = e.replace(/\$/g, "\\$")
}

function t(e, t, n) {
    if (null == e || !e.getAttribute || !e.setAttribute) throw new TypeError('elemIdListAdd: "elem" must be a valid DOM Element');
    if ("string" != typeof t) throw new TypeError('elemIdListAdd: "attrName" must be a valid string');
    if ("string" != typeof n) throw new TypeError('elemIdListAdd: "value" must be a valid ID string');
    const r = e.hasAttribute(t) ? e.getAttribute(t).split(" ") : [];
    r.indexOf(n) > -1 || (r.push(n), e.setAttribute(t, r.join(" ")))
}

function n(e, t, n) {
    if (null == e || !e.getAttribute || !e.setAttribute) throw new TypeError('elemIdListRemove: "elem" must be a valid DOM Element');
    if ("string" != typeof t) throw new TypeError('elemIdListRemove: "attrName" must be a valid string');
    if ("string" != typeof n) throw new TypeError('elemIdListRemove: "value" must be a valid ID string');
    const r = (e.getAttribute(t) || "").split(" "),
        i = r.indexOf(n); - 1 !== i && (1 === r.length ? e.removeAttribute(t) : (r.splice(i, 1), e.setAttribute(t, r.join(" "))))
}

function r(e, t) {
    for (; e;) {
        if (!0 === t(e)) return e;
        e = s(e)
    }
    return null
}

function i(e) {
    return r(e, e => {
        if (e === document.body) return !1;
        if ("SLOT" === e.tagName) return !1;
        if (e === document.documentElement) return !0;
        if (e.nodeType === Node.ELEMENT_NODE) {
            return "visible" !== window.getComputedStyle(e, null).getPropertyValue("overflow")
        }
        return !1
    })
}

function o(e, t = () => !0) {
    if (!e) return null;
    if (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType) return null;
    let n;
    const r = [];
    "CONTENT" === e.tagName ? n = e.getDistributedNodes() : "SLOT" === e.tagName ? n = e.assignedNodes({
        flatten: !0
    }) : (e.shadowRoot && (e = e.shadowRoot), n = e.children || e.childNodes);
    for (let e = 0; e < n.length; e++) 1 === n[e].nodeType && t(n[e]) && r.push(n[e]);
    return r
}

function s(e) {
    if (e.getDestinationInsertionPoints) {
        const t = e.getDestinationInsertionPoints();
        if (t && t.length > 0) return t[0]
    }
    return e.assignedSlot ? e.assignedSlot : e.parentNode ? e.parentNode : e.host ? e.host : null
}

function l(e, t = () => !0) {
    let n = s(e);
    for (; n;) {
        const e = n.nextElementSibling;
        if (e && t(e)) return e;
        n = s(n)
    }
    return null
}

function u(e, t = () => !0) {
    let n = s(e);
    for (; n;) {
        const e = n.previousElementSibling;
        if (e && t(e)) return e;
        n = s(n)
    }
    return null
}

function a(e) {
    if (!window.ShadowRoot) return e.offsetParent;
    if (!s(e) || "BODY" === e.tagName || "fixed" === window.getComputedStyle(e).position) return null;
    let t = null,
        n = s(e);
    for (; n;) {
        if (n instanceof ShadowRoot) n = s(n);
        else {
            if (n instanceof DocumentFragment) return t;
            if ("BODY" === n.tagName) return t || n
        }
        const e = window.getComputedStyle(n).position,
            r = n.tagName;
        if (e && "static" !== e) return n;
        null !== t || "static" !== e || "TD" !== r && "TH" !== r && "TABLE" !== r || (t = n), n = s(n)
    }
    return t
}

function d(e, t) {
    return null !== r(t, t => t === e)
}

function f(e, {
    checkAncestors: t = !0
} = {}) {
    if (!e) return !1;
    if (!e.host) {
        if (void 0 === e.style) return !0;
        if ("none" === e.style.display) return !1;
        if ("hidden" === e.style.visibility) return !1;
        const t = window.getComputedStyle(e, null);
        if ("none" === t.getPropertyValue("display")) return !1;
        if ("hidden" === t.getPropertyValue("visibility")) return !1
    }
    if (t) {
        const t = s(e);
        if (t) return f(t)
    }
    return !0
}

function c(e) {
    let t = r(e, e => !f(e, {
        checkAncestors: !1
    }));
    for (; t;) t = r(e = s(t), e => !f(e, {
        checkAncestors: !1
    }));
    return e
}

function g(e, t) {
    if (!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType) throw new TypeError("Invalid node. Must be nodeType document, element or document fragment");
    if ("string" != typeof t) throw new TypeError("Invalid selector");
    const n = e.querySelector(t);
    if (n) return n;
    const r = e.querySelectorAll("*");
    for (const e of r)
        if (e.shadowRoot) {
            const n = g(e.shadowRoot, t);
            if (n) return n
        }
    return null
}
const m = new Set,
    h = {};

function p(e) {
    m.add(e), h.height = null, h.width = null
}

function w(e) {
    m.delete(e)
}
globalThis.addEventListener && globalThis.addEventListener("resize", e => {
    if (0 === m.size) return;
    const t = e.target.frameElement;
    if (t ? .classList.contains("d2l-iframe-fit-user-content")) {
        if (h.height === t.scrollHeight && h.width === t.scrollWidth) return;
        h.height = t.scrollHeight, h.width = t.scrollWidth
    }
    m.forEach(t => {
        t(e)
    })
});
export {
    c as a, s as b, l as c, u as d, d as e, r as f, o as g, e as h, f as i, a as j, n as k, i as l, t as m, p as n, g as q, w as r
};