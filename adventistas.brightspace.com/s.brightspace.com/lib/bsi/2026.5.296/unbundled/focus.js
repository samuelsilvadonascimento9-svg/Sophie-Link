import {
    r as e,
    i as t
} from "./lit-element.js";
import {
    g as n,
    i,
    a as r,
    b as o,
    c as s,
    d as u
} from "./dom.js";
const l = {
    a: !0,
    body: !0,
    button: !0,
    frame: !0,
    iframe: !0,
    input: !0,
    isindex: !0,
    object: !0,
    select: !0,
    textarea: !0
};

function c() {
    let e = document.activeElement;
    if (!e) return null;
    for (; e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
    return e
}

function f(e, t, r = () => !0, o, s = !0) {
    const u = n(e);
    if (!u ? .length || !t && s && !i(e)) return null;
    for (let e = 0; e < u.length; e++) {
        if (!t && !i(u[e], {
                checkAncestors: !1
            })) continue;
        if (x(u[e], !0, o) && r(u[e])) return u[e];
        const n = f(u[e], t, r, o, !1);
        if (n) return n
    }
    return null
}

function a(e, {
    includeHidden: t,
    predicate: n = () => !0,
    includeTabbablesOnly: i,
    nodeVisibilityUnknown: s = !0
} = {}) {
    if (!t && s && (e = r(e)), !e) return null;
    if (x(e, !0) && n(e)) return e;
    const u = f(e, t, n, i, !1);
    return null !== u ? u : a(o(e), {
        includeHidden: t,
        predicate: n,
        includeTabbablesOnly: i,
        nodeVisibilityUnknown: !1
    })
}

function d(e, t) {
    let i = [];
    return n(e).forEach(e => {
        "svg" !== e.tagName && (t ? .predicate && !t.predicate(e) || (x(e, t ? .hidden, t ? .tabbablesOnly, t ? .disabled) && i.push(e), t ? .deep && (i = [...i, ...d(e, t)])))
    }), i
}

function b() {
    return w() ? "focus-visible" : "focus"
}

function m(e, {
    extraStyles: n = null
} = {}) {
    return v(e, e => t `
		${e} {
			${n??t``}
			outline: 2px solid var(--d2l-focus-ring-color, var(--d2l-theme-border-color-focus));
			outline-offset: var(--d2l-focus-ring-offset, 2px);
		}
		@media (prefers-contrast: more) {
			${e} {
				outline-color: Highlight;
			}
		}
	`)
}

function v(n, i) {
    const r = "string" == typeof n ? e => `${n}:${e}` : n,
        o = e(r("focus")),
        s = e(r("focus-visible"));
    return e(t `
		@supports not selector(:focus-visible) {
			${i(o)}
		}
		@supports selector(:focus-visible) {
			${i(s)}
		}
	`)
}

function h(e, t) {
    const i = n(e);
    for (let e = i.length - 1; e >= 0; e--) {
        const n = h(i[e], t);
        if (n) return n;
        if (x(i[e], t)) return i[e]
    }
    return null
}

function p(e, t) {
    if (!e) return null;
    void 0 === t && (t = !1);
    const n = (e, i, r) => {
        if (!i && x(e, t)) return e;
        if (!r) {
            const n = h(e, t);
            if (n) return n
        }
        const o = e.previousElementSibling;
        if (o) {
            const e = n(o, !1, !1);
            return e || null
        }
        const s = u(e);
        if (s) {
            const e = n(s, !1, !1);
            if (e) return e
        }
        return null
    };
    return n(e, !0, !0)
}

function g(e, t, n, i) {
    if (!e) return null;
    void 0 === t && (t = !1), void 0 === n && (n = !0), void 0 === i && (i = !1);
    const r = (e, n, i) => {
        if (!n && x(e, t)) return e;
        if (!i) {
            const n = f(e, t);
            if (n) return n
        }
        const o = e.nextElementSibling;
        if (o) {
            const e = r(o, !1, !1);
            return e || null
        }
        const u = s(e);
        if (u) {
            const e = r(u, !1, !1);
            if (e) return e
        }
        return null
    };
    return r(e, n, i)
}

function y(e, t, n) {
    if (!e) return null;
    void 0 === t && (t = !1), void 0 === n && (n = !0);
    let i = o(e);
    for (; i;) {
        if (x(i, t, n)) return i;
        i = o(i)
    }
    return null
}

function x(e, t, n, r) {
    if (!e || 1 !== e.nodeType || !r && e.disabled) return !1;
    let o;
    void 0 === n && (n = !0);
    const s = n ? 0 : -1;
    if (e.getAttributeNode) {
        const t = e.getAttributeNode("tabindex");
        t && t.specified && (o = t.value >= s)
    }
    const u = e.nodeName.toLowerCase();
    return void 0 === o && (o = l[u]), !(o && !t && "body" !== u && !i(e)) && o
}
let E, $;

function w() {
    if (void 0 === E) {
        const e = document.createElement("style");
        try {
            document.head.appendChild(e), e.sheet.insertRule(":focus-visible { color: inherit; }"), E = !0
        } catch {
            E = !1
        } finally {
            e.remove()
        }
    }
    return E
}

function R() {
    if (void 0 === $) {
        const e = document.createElement("style");
        try {
            document.head.appendChild(e), e.sheet.insertRule(":has(a) { color: inherit; }"), $ = !0
        } catch {
            $ = !1
        } finally {
            e.remove()
        }
    }
    return $
}
export {
    b as a, m as b, p as c, g as d, f as e, h as f, c as g, w as h, R as i, x as j, y as k, a as l, d as m, v as n
};