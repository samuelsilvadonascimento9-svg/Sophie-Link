import "./colors.js";
import {
    L as e
} from "./error.js";
import {
    g as t,
    e as n,
    l as r,
    h as s
} from "./focus.js";
import "./plugins2.js";
import "./plugins3.js";
import {
    s as o,
    c as i
} from "./dismissible.js";
import {
    p as a,
    f as d
} from "./number.js";
import {
    i as c,
    h as u
} from "./dateTime.js";
import {
    t as l,
    s as m,
    g as h
} from "./return-points.js";
import {
    r as p,
    p as w,
    P as f
} from "./provider-mixin.js";
import {
    a as g
} from "./announce.js";
import {
    c as b
} from "./index10.js";
import {
    d as v
} from "./index5.js";
import {
    a as L
} from "./d2lfetch-auth.js";
import "./d2lfetch-auth-framed.js";
import {
    s as y
} from "./settings.js";
import "./svg-to-css.js";
import "./lit-element.js";
import "./dom.js";
import "./plugins.js";
import "./common.js";
import "./d2lfetch.js";
import "./boot.js";
let P = !1;
const j = new Map,
    q = new Map,
    D = new Set;

function x(e, t, n) {
    const r = q.get(e);
    return n && !D.has(e) && (D.add(e), r && r.subscribe && r.subscribe(t => C(e, t), {})), r && r.tryGet && r.tryGet(t)
}

function E(e) {
    e.detail && e.detail.type && (e.detail.value = x(e.detail.type, e.detail.options, e.detail.subscribe), e.detail.handled = !0)
}

function R(t) {
    if (!t.data.isContextProvider) return;
    if (!t.data.type || !/^(?:http|https):\/\//.test(t.origin)) throw new e(`Invalid message sent by framed client at origin ${t.origin}`);
    let n;
    for (const e of j.keys())
        if (e.contentWindow === t.source) {
            n = e;
            break
        }
    if (!n || j.get(n) !== t.origin) return;
    const r = t.data.type;
    if ("framed-request" === r) return void n.contentWindow.postMessage({
        isContextProvider: !0,
        type: "framed-request",
        value: !0
    }, t.origin);
    const s = x(r, t.data.options, t.data.subscribe);
    n.contentWindow.postMessage({
        isContextProvider: !0,
        type: r,
        value: s
    }, t.origin)
}

function C(e, t) {
    document.dispatchEvent(new CustomEvent("lms-context-change", {
        detail: {
            type: e,
            changedValues: t
        }
    })), j.forEach((n, r) => {
        r.contentWindow.postMessage({
            isContextProvider: !0,
            type: e,
            changedValues: t
        }, n)
    })
}
const I = {
    allowFrame: function(t, n) {
        if (!P) throw new e(`Can't register frame with id ${t.id}. Context provider host has not been initialized.`);
        if (j.has(t)) throw new e(`A frame with id ${t.id} has already been registered with this host.`);
        j.set(t, n)
    },
    initialize: function() {
        P || (window.addEventListener("message", R), document.addEventListener("lms-context-request", E), P = !0)
    },
    registerPlugin: function(t, n, r) {
        if (!P) throw new e(`Can't register plugin with type ${t}. Context provider host has not been initialized.`);
        if (q.has(t)) throw new e(`A plugin with type ${t} has already been registered with this host.`);
        q.set(t, {
            tryGet: n,
            subscribe: r
        }), D.has(t) && r && r(e => C(t, e), {
            sendImmediate: !0
        })
    },
    reset: function() {
        P && (window.removeEventListener("message", R), document.removeEventListener("lms-context-request", E), j.clear(), q.clear(), D.clear(), P = !1)
    }
};

function _(e, t, n) {
    ((e, t, n) => {
        I.registerPlugin(e, t, n)
    })(e, t, n)
}
const A = new Map,
    M = new MutationObserver(e => {
        e.forEach(e => {
            A.get(e.attributeName) ? .forEach(e => e())
        })
    });
let S = !1;

function W(e) {
    const t = document.documentElement.getAttribute(e) ? ? void 0;
    try {
        return JSON.parse(t)
    } catch {
        return void console.warn(`context-provider-host: Can't fetch context attribute "${e}"; can't be parsed as a JSON object`)
    }
}

function N(e, t, n) {
    S || (M.observe(document.documentElement, {
        attributes: !0
    }), S = !0), n && t(W(e)), A.has(e) || A.set(e, []), A.get(e).push(() => t(W(e)))
}
window.D2L = window.D2L || {}, window.D2L.ContextProvider = {
    allowFrame: function(e, t) {
        ((e, t) => {
            I.allowFrame(e, t)
        })(e, t)
    },
    registerPlugin: _
}, I.initialize(), _("d2l-htmleditor", () => W("data-he-context"), (e, t) => N("data-he-context", e, t.sendImmediate)), _("d2l-mathjax", () => W("data-mathjax-context"), (e, t) => N("data-mathjax-context", e, t.sendImmediate)), _("d2l-userprofile", () => W("data-userprofile-context"), (e, t) => N("data-userprofile-context", e, t.sendImmediate)), window.D2L = window.D2L || {}, window.D2L.LP = window.D2L.LP || {}, window.D2L.LP.Web = window.D2L.LP.Web || {}, window.D2L.LP.Web.UI = window.D2L.LP.Web.UI || {}, window.D2L.LP.Web.UI.Html = window.D2L.LP.Web.UI.Html || {}, window.D2L.LP.Web.UI.Html.Dom = window.D2L.LP.Web.UI.Html.Dom || {}, window.D2L.LP.Web.UI.Html.Dom.GetComposedActiveElement = t, window.D2L.LP.Web.UI.Html.Dom.GetFirstFocusableDescendant = n, window.D2L.LP.Web.UI.Html.Dom.GetFirstFocusableRelative = r;
const T = new class {
    constructor() {
        this._inflightRequests = {}
    }
    dedupe(e, t) {
        if (!1 == e instanceof Request) return Promise.reject(new TypeError("Invalid request argument supplied; must be a valid window.Request object."));
        if ("GET" !== e.method && "HEAD" !== e.method && "OPTIONS" !== e.method) return t(e);
        const n = this._getKey(e);
        let r = !1;
        if (!this._inflightRequests[n]) {
            const t = e.signal && "function" == typeof e.signal.addEventListener && window.AbortController ? new AbortController : void 0,
                s = new Request(e, {
                    signal: t ? t.signal : void 0
                });
            this._inflightRequests[n] = {
                inflightRequest: s,
                abortController: t,
                dedupedRequests: [],
                nextReqId: 0
            }, r = !0
        }
        const s = new Promise((t, r) => {
            const s = this._inflightRequests[n],
                o = s.nextReqId++,
                i = {
                    resolvers: {
                        resolve: t,
                        reject: r
                    },
                    reqId: o
                };
            if (s.dedupedRequests.push(i), e.signal) {
                const t = (e, t, n) => {
                    const s = () => {
                        e.removeEventListener("abort", s);
                        const o = this._inflightRequests[t];
                        if (!o) return;
                        const i = o.dedupedRequests.findIndex(e => e.reqId === n);
                        i < 0 || (o.dedupedRequests.splice(i, 1), 0 === o.dedupedRequests.length && o.abortController && o.abortController.abort(), r(new DOMException("Request was aborted.", "AbortError")))
                    };
                    i.removeAbortListener = () => e.removeEventListener("abort", s), e.addEventListener("abort", s)
                };
                t(e.signal, n, o)
            }
        });
        return r ? (t(this._inflightRequests[n].inflightRequest).then(e => {
            const t = this._inflightRequests[n].dedupedRequests;
            delete this._inflightRequests[n];
            const r = t.length > 1 ? this._clone(e) : e;
            for (const e of t) "function" == typeof e.removeAbortListener && e.removeAbortListener(), e.resolvers.resolve(r)
        }, e => {
            const t = this._inflightRequests[n].dedupedRequests;
            delete this._inflightRequests[n];
            for (const n of t) "function" == typeof n.removeAbortListener && n.removeAbortListener(), n.resolvers.reject(e)
        }), s) : s
    }
    _clone(e) {
        return e.text().then(t => (e.json = function() {
            return Promise.resolve(JSON.parse(t))
        }, e.text = function() {
            return Promise.resolve(t)
        }, e.arrayBuffer = function() {
            return Promise.reject(new Error("dedupe middleware cannot be used with arrayBuffer response bodies"))
        }, e.blob = function() {
            return Promise.reject(new Error("dedupe middleware cannot be used with blob response bodies"))
        }, e.formData = function() {
            return Promise.reject(new Error("dedupe middleware cannot be used with formData response bodies"))
        }, e))
    }
    _getKey(e) {
        return e.headers.has("Authorization") ? e.url + e.headers.get("Authorization") : e.url
    }
    _reset() {
        this._inflightRequests = []
    }
};
const U = /max-age=([0-9]+)/;
const G = new class {
    constructor() {
        this._simplyCachedRequests = this._simplyCachedRequests || []
    }
    cache(e, t, n) {
        const r = n && n.cacheLengthInSeconds ? n.cacheLengthInSeconds : 120,
            s = n && Array.isArray(n.methods) ? n.methods : ["GET", "HEAD", "OPTIONS"];
        if (!1 == e instanceof Request) return Promise.reject(new TypeError("Invalid request argument supplied; must be a valid window.Request object."));
        if (!s.includes(e.method)) return t ? t(e) : Promise.resolve(e);
        const o = this._getKey(e),
            {
                noCache: i,
                noStore: a,
                maxAge: d
            } = function(e, t) {
                let n = !1,
                    r = !1,
                    s = t;
                "string" == typeof e && (e = e.toLowerCase()).split(",").forEach(e => {
                    if ("no-cache" === (e = e.trim())) n = !0;
                    else if ("no-store" === e) r = !0;
                    else {
                        const t = U.exec(e);
                        if (null !== t && 2 === t.length) {
                            const e = parseInt(t[1]);
                            isNaN(e) || (s = e)
                        }
                    }
                });
                return {
                    noCache: n,
                    noStore: r,
                    maxAge: s
                }
            }(e.headers.get("cache-control"), r);
        if (i && delete this._simplyCachedRequests[o], this._simplyCachedRequests[o]) {
            const e = Date.now();
            if (this._simplyCachedRequests[o].cacheExpires >= e && this._simplyCachedRequests[o].cacheSetAt + 1e3 * d >= e) {
                if (this._simplyCachedRequests[o].response instanceof Response) return Promise.resolve(this._simplyCachedRequests[o].response)
            } else delete this._simplyCachedRequests[o]
        }
        if (!t) return Promise.resolve(e);
        const c = t(e);
        return c && c instanceof Promise && !a ? c.then(this._clone).then(e => {
            const t = Date.now();
            return this._simplyCachedRequests[o] = {
                cacheSetAt: t,
                cacheExpires: t + 1e3 * d,
                response: e
            }, e
        }) : c
    }
    _clone(e) {
        return e instanceof Response == !1 ? Promise.resolve(e) : e.text().then(t => (e.json = function() {
            return Promise.resolve(JSON.parse(t))
        }, e.text = function() {
            return Promise.resolve(t)
        }, e.arrayBuffer = function() {
            return Promise.reject(new Error("simple-cache middleware cannot be used with arrayBuffer response bodies"))
        }, e.blob = function() {
            return Promise.reject(new Error("simple-cache middleware cannot be used with blob response bodies"))
        }, e.formData = function() {
            return Promise.reject(new Error("simple-cache middleware cannot be used with formData response bodies"))
        }, e))
    }
    _getKey(e) {
        const t = e.method + e.url;
        return e.headers.has("Authorization") ? t + e.headers.get("Authorization") : t
    }
    _reset() {
        this._simplyCachedRequests = []
    }
};

function O(e) {
    const t = this;
    let n = {
        start: {
            time: performance.now(),
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
    };
    const r = () => {
            n = null, t.removeEventListener("touchend", o), t.removeEventListener("touchermove", i), t.removeEventListener("touchcancel", s)
        },
        s = () => {
            r()
        },
        o = () => {
            if (!n || !n.end) return;
            const e = performance.now() - n.start.time;
            if (e > 2e3) return void r();
            const s = n.end.x - n.start.x,
                o = n.end.y - n.start.y;
            let i = Math.atan(Math.abs(s) / Math.abs(o));
            o > 0 && s > 0 ? i = 57.3 * (Math.PI - i) : o > 0 && s < 0 ? i = 57.3 * (Math.PI + i) : o < 0 && s > 0 ? i *= 57.3 : o < 0 && s < 0 && (i = 57.3 * (2 * Math.PI - i));
            let a = "none";
            Math.abs(s) >= 30 && (i > 205 && i < 335 ? a = "left" : i > 25 && i < 155 && (a = "right"));
            let d = "none";
            Math.abs(o) >= 30 && (i > 295 || i < 65 ? d = "up" : i > 115 && i < 245 && (d = "down")), t.dispatchEvent(new CustomEvent("d2l-gesture-swipe", {
                detail: {
                    distance: {
                        x: s,
                        y: o
                    },
                    direction: {
                        angle: i,
                        horizontal: a,
                        vertical: d
                    },
                    duration: e
                }
            })), r()
        },
        i = e => {
            n && (e.preventDefault(), n.end = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            })
        };
    t.addEventListener("touchend", o), t.addEventListener("touchmove", i), t.addEventListener("touchcancel", s)
}
let H, z, F;

function k() {
    return H || (H = JSON.parse(document.documentElement.getAttribute("data-global-context"))), H
}
window.D2L = window.D2L || {}, window.D2L.Intl = {
    FormatNumber: d,
    FormatTime: u,
    ParseNumber: a,
    ParseTime: c
}, v.use({
    name: "auth",
    fn: L,
    options: {
        enableTokenCache: !0
    }
}), v.use({
    name: "dedupe",
    fn: function(e, t) {
        return T.dedupe(e, t)
    }
}), v.use({
    name: "simple-cache",
    fn: function(e, t, n) {
        return G.cache(e, t, n)
    }
}), window.d2lfetch = v, window.D2L.Telemetry = {
    Load: async function() {
        return (await
            import ("./index7.js")).default
    },
    CreateClient: async function() {
        const e = await D2L.Telemetry.Load(),
            t = document.documentElement.getAttribute("data-telemetry-endpoint");
        if (null === t) throw new Error("Unable to create telemetry client, missing endpoint.");
        return new e.Client({
            endpoint: t
        })
    }
}, window.D2L.Logging = {
    createClient: b
}, window.dispatchEvent(new CustomEvent("d2l-logging-loaded", {
    detail: {
        createClient: b
    }
})), y(!1), window.D2L.Announce = g, window.D2L.Gestures = window.D2L.Gestures || {}, window.D2L.Gestures.Swipe = {
    register: function(e) {
        e.addEventListener("touchstart", O)
    }
}, window.D2L.Dismissible = {
    Clear: function(e) {
        i(e)
    },
    Set: function(e) {
        return o(e)
    }
}, window.D2L.Provider = {
    provideInstance: w,
    requestInstance: p
}, window.D2L.ReturnPoints = {
    get: h,
    set: m,
    tryPeek: l
}, w(document, "org-context", new f(() => {
    if (z) return z;
    const e = k();
    return e ? (z = {
        orgUnitId: e.orgUnitId,
        orgId: e.orgId
    }, z) : void 0
})), w(document, "user-context", new f(() => {
    if (F) return F;
    const e = k();
    return e ? (F = {
        userId: e.userId
    }, F) : void 0
})), w(document, "html-block-renderer-loader", {
    async getRenderers() {
        const e = Promise.all([
            import ("./d2l-user-profile-html-block.js").catch(() => {})
        ]);
        return (await e).filter(e => e).map(e => e.createHtmlBlockRenderer())
    }
}), w(document, "html-editor-plugin-loader", {
    getPlugins: () => Promise.all([
        import ("./creator-plus.js").then(e => e.createPlugin()).catch(() => {}),
        import ("./insert-element.js").then(e => e.createPlugin()).catch(() => {}),
        import ("./practices.js").then(e => e.createPlugin()).catch(() => {}),
        import ("./layouts.js").then(e => e.createPlugin()).catch(() => {}),
        import ("./content-styler.js").then(e => e.createPlugin()).catch(() => {}),
        import ("./h5p2.js").then(e => e.createPlugin()).catch(() => {})
    ])
}), s() || document.body.classList.add("d2l-focus-visible-not-supported");