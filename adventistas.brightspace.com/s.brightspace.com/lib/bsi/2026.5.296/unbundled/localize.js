import {
    e,
    b as t,
    d as o,
    c as s,
    _ as n,
    a as r
} from "./_rollupPluginBabelHelpers.js";
import {
    a,
    s as i,
    d as c,
    b as l
} from "./common.js";
import {
    i as u
} from "./index2.js";
const h = {
    mi: {
        aliases: ["mri", "mao"],
        options: {
            cardinal: {
                locale: "mi",
                pluralCategories: ["one", "other"],
                shim: !0
            },
            ordinal: {
                locale: "mi",
                pluralCategories: ["other"],
                shim: !0
            }
        },
        select: (e, t) => t || 1 !== e ? "other" : "one"
    }
};
var p = new WeakMap,
    m = new WeakMap,
    g = new WeakMap;
class f extends Intl.PluralRules {
    static supportedLocalesOf(e) {
        return [e].flat().map(e => {
            const t = function(e) {
                const t = [e].flat().map(e => {
                    for (const t in h)
                        if (h[t].aliases.includes(e)) return t;
                    return e
                });
                return Intl.getCanonicalLocales(t)
            }(e)[0];
            return h[t] ? t : super.supportedLocalesOf(e)
        }).flat()
    }
    constructor(e, n = {}) {
        super(e, n), t(this, p, void 0), t(this, m, void 0), t(this, g, void 0), o(m, this, f.supportedLocalesOf(e)[0]), o(g, this, n.type ? ? "cardinal"), h[s(m, this)] && o(p, this, h[s(m, this)])
    }
    resolvedOptions() {
        return { ...super.resolvedOptions(),
            ...s(p, this) ? .options[s(g, this)]
        }
    }
    select(e) {
        return s(p, this) ? s(p, this).select(e, "ordinal" === s(g, this)) : super.select(e)
    }
}
e(f, "shim", !0), Object.defineProperty(Intl, "PluralRules", {
    value: f,
    writable: !0,
    enumerable: !1,
    configurable: !0
});
const d = "d2l-oslo",
    w = "Content-Type",
    j = "ETag",
    b = new Error("Failed to fetch batch overrides."),
    v = new Error("Failed to fetch overrides."),
    z = new Map;
let L, y, k, C = [],
    R = 1,
    O = 0;
async function P(e, t) {
    if (t.ok) {
        const o = await t.json();
        e.resolve(o)
    } else e.reject(v)
}
async function _() {
    if (O = 0, R = 2, C.length <= 0) return void(R = 1);
    const e = C;
    C = [];
    const t = {
            resources: e.map(e => e.resource)
        },
        o = JSON.stringify(t),
        s = await fetch(k.oslo.batch, {
            method: "POST",
            body: o,
            headers: {
                [w]: "application/json"
            }
        });
    if (s.ok) {
        const t = (await s.json()).resources,
            o = [];
        for (let s = 0; s < t.length; ++s) {
            const n = t[s],
                r = e[s],
                a = new Response(n.body, {
                    status: n.status,
                    headers: n.headers
                }),
                i = a.headers.get(j);
            i && S(i);
            const c = new Request(E(r.resource)),
                l = a.clone();
            void 0 === L && (void 0 === y && (y = caches.open(d)), L = await y), o.push(L.put(c, l)), o.push(P(r, a))
        }
        await Promise.all(o)
    } else
        for (const t of e) t.reject(b);
    C.length > 0 ? setTimeout(_, 0) : R = 1
}

function M(e) {
    const t = new Promise((t, o) => {
        C.push({
            resource: e,
            resolve: t,
            reject: o
        })
    });
    return 1 === R && (O > 0 && clearTimeout(O), O = setTimeout(_, 150)), t
}

function E(e) {
    return U(k.oslo.collection, e)
}
async function x(e) {
    void 0 === L && (void 0 === y && (y = caches.open(d)), L = await y);
    const t = new Request(E(e)),
        o = await L.match(t);
    if (void 0 === o) return M(e);
    if (!o.ok) throw M(e).then(e => URL.revokeObjectURL(e)), v;
    const s = function() {
        void 0 === k && (k = a());
        if (!k.oslo || !k.oslo.version) return null;
        return k.oslo.version
    }();
    if (s) {
        o.headers.get(j) !== s && M(e).then(e => URL.revokeObjectURL(e))
    }
    return await o.json()
}
async function $() {
    if (void 0 === k && (k = a()), !k.oslo) return !1;
    try {
        return await caches.open(d), Boolean(k.oslo.batch) && "CacheStorage" in window
    } catch {
        return !1
    }
}

function S(e) {
    void 0 === k && (k = a()), k.oslo && (k.oslo.version = e)
}
async function T() {
    return await $() || (void 0 === k && (k = a()), !!k.oslo && Boolean(k.oslo.collection))
}
async function F(e) {
    let t, o, s;
    return await $() ? (t = e(), o = function(e) {
        let t = z.get(e);
        return void 0 === t && (t = x(e), z.set(e, t)), t
    }(t)) : (t = e(), s = U(k.oslo.collection, t), o = async function(e) {
        if (z.has(e)) return Promise.resolve(z.get(e));
        const t = await fetch(e, {
            method: "GET"
        });
        if (t.ok) {
            const o = await t.json();
            return z.set(e, o), Promise.resolve(o)
        }
        return Promise.reject(v)
    }(s)), o = o.catch(I), o
}

function I() {
    return null
}

function U(e, t) {
    return `${e}/${t}`
}
async function B(e, t, o) {
    const s = [];
    if (s.push(t), await T()) {
        const e = await F(o);
        s.push(e)
    }
    const n = await Promise.all(s);
    return {
        language: e,
        resources: Object.assign({}, ...n)
    }
}
const W = Object.freeze(["d2l-link", "d2l-tooltip-help", "p", "br", "b", "strong", "i", "em", "button"]),
    A = new Map([
        ["'", "apostrophe"],
        ["&", "ampersand"],
        ["*", "asterisk"],
        ["\\", "backslash"],
        [":", "colon"],
        [",", "comma"],
        [">", "greaterThan"],
        ["<", "lessThan"],
        ["#", "numberSign"],
        ["%", "percentSign"],
        ["|", "pipe"],
        ["?", "questionMark"],
        ['"', "quotationMark"]
    ]),
    q = ["actions:add", "actions:apply", "actions:browse", "actions:cancel", "actions:clear", "actions:close", "actions:confirm", "actions:copy", "actions:create", "actions:delete", "actions:done", "actions:edit", "actions:finish", "actions:more", "actions:print", "actions:remove", "actions:save", "actions:saveAndClose", "actions:saveAndNew", "actions:search", "actions:submit", "actions:update", "confirm:no", "confirm:ok", "confirm:yes", "navigation:back:title", "navigation:continue:title", "navigation:next:title", "navigation:previous:title"],
    N = new Map,
    H = e => {
        const t = `/?(${e.join("|")})?([>\\s/]|$)`;
        return new RegExp(`<(?!${t})`)
    },
    G = H(W),
    J = H([]),
    D = (h = class {}) => {
        var p, m, g, f, d, w, j;
        return m = new WeakMap, g = new WeakMap, f = new WeakMap, d = new WeakMap, w = new WeakSet, p = class a extends h {
            constructor(...s) {
                super(...s), n(this, w), e(this, "pristine", !0), t(this, m, !1), t(this, g, void 0), t(this, f, void 0), t(this, d, void 0), e(this, "__resourcesLoadedPromise", new Promise(e => o(f, this, e)))
            }
            static pseudoLocalize(e, t, ...o) {
                const s = e(t, ...o);
                return this.documentLocaleSettings.pseudoLocalization.textFormat.replace(/\{(0|1)\}/g, e => "{0}" === e ? s : t)
            }
            static setLocalizeMarkup(e) {
                r(p, this, j)._ ? ? (j._ = r(p, this, e))
            }
            connect() {
                o(g, this, () => r(w, this, b).call(this)), a.documentLocaleSettings.addChangeListener(s(g, this)), o(m, this, !0), s(g, this).call(this)
            }
            disconnect() {
                a.documentLocaleSettings.removeChangeListener(s(g, this)), o(m, this, !1)
            }
            localize(e, t) {
                const {
                    language: o,
                    value: s
                } = this.localize.resources ? .[e] ? ? {};
                if (!s) return "";
                let n = {};
                if (t ? .constructor === Object) n = t;
                else
                    for (let e = 1; e < arguments.length; e += 2) n[arguments[e]] = arguments[e + 1];
                const r = new u(s, o);
                let a = s;
                try {
                    V(a, J), a = r.format(n)
                } catch (e) {
                    "MarkupError" === e.name && (e = new Error("localize() does not support rich text. For more information, see: https://github.com/BrightspaceUI/core/blob/main/mixins/localize/"), a = ""), console.error(e)
                }
                return a
            }
            localizeCharacter(e) {
                if (!A.has(e)) throw new Error(`localizeCharacter() does not support character: "${e}"`);
                const t = this.localize(`intl-common:characters:${A.get(e)}`);
                if (0 === t.length) throw new Error("localizeCharacter() cannot be used unless loadCommon in localizeConfig is enabled");
                return t
            }
            localizeCommon(e) {
                if (-1 === q.indexOf(e)) throw new Error(`localizeCommon() term not found: "${e}"`);
                const t = this.localize(`intl-common:${e}`);
                if (0 === t.length) throw new Error("localizeCommon() cannot be used unless loadCommon in localizeConfig is enabled");
                return t
            }
            localizeHTML(e, t = {}) {
                const {
                    language: o,
                    value: s
                } = this.localize.resources ? .[e] ? ? {};
                if (!s) return "";
                const n = new u(s, o);
                let i = s;
                try {
                    const e = n.format({
                        b: e => r(p, a, j)._.bind(a)
                        `<b>${e}</b>`,
                        br: () => r(p, a, j)._.bind(a)
                        `<br>`,
                        em: e => r(p, a, j)._.bind(a)
                        `<em>${e}</em>`,
                        i: e => r(p, a, j)._.bind(a)
                        `<i>${e}</i>`,
                        p: e => r(p, a, j)._.bind(a)
                        `<p>${e}</p>`,
                        strong: e => r(p, a, j)._.bind(a)
                        `<strong>${e}</strong>`,
                        ...t
                    });
                    V(e), i = e
                } catch (e) {
                    "MarkupError" === e.name && (i = ""), console.error(e)
                }
                return i
            }
            static _generatePossibleLanguages(e) {
                if (e ? .useBrowserLangs) return navigator.languages.map(e => e.toLowerCase()).concat("en");
                const {
                    language: t,
                    fallbackLanguage: o
                } = this.documentLocaleSettings, s = [t, o].filter(e => e).map(e => [e.toLowerCase(), e.split("-")[0]]).flat();
                return Array.from(new Set([...s, "en-us", "en"]))
            }
            static _getAllLocalizeResources(e = this.localizeConfig) {
                const t = [],
                    o = Object.getPrototypeOf(this);
                if ("_getAllLocalizeResources" in o) {
                    const s = Object.prototype.hasOwnProperty.call(o, "localizeConfig") && o.localizeConfig.importFunc ? o.localizeConfig : e;
                    t.push(o._getAllLocalizeResources(s))
                }
                if (Object.prototype.hasOwnProperty.call(this, "getLocalizeResources") || Object.prototype.hasOwnProperty.call(this, "resources")) {
                    const o = this._generatePossibleLanguages(e),
                        s = this.getLocalizeResources(o, e);
                    t.push(s), e ? .loadCommon && t.push(this.getLocalizeResources(o, {
                        importFunc: async e => {
                            if (N.has(e)) return N.get(e);
                            const t = (await
                                function(e) {
                                    switch (e) {
                                        case "../lang/ar.js":
                                            return import ("./ar14.js");
                                        case "../lang/ca.js":
                                            return import ("./ca2.js");
                                        case "../lang/cy.js":
                                            return import ("./cy14.js");
                                        case "../lang/da.js":
                                            return import ("./da14.js");
                                        case "../lang/de.js":
                                            return import ("./de14.js");
                                        case "../lang/en-gb.js":
                                            return import ("./en-gb13.js");
                                        case "../lang/en.js":
                                            return import ("./en14.js");
                                        case "../lang/es-es.js":
                                            return import ("./es-es14.js");
                                        case "../lang/es.js":
                                            return import ("./es14.js");
                                        case "../lang/fr-fr.js":
                                            return import ("./fr-fr14.js");
                                        case "../lang/fr-on.js":
                                            return import ("./fr-on13.js");
                                        case "../lang/fr.js":
                                            return import ("./fr14.js");
                                        case "../lang/haw.js":
                                            return import ("./haw14.js");
                                        case "../lang/hi.js":
                                            return import ("./hi14.js");
                                        case "../lang/ja.js":
                                            return import ("./ja14.js");
                                        case "../lang/ko.js":
                                            return import ("./ko14.js");
                                        case "../lang/mi.js":
                                            return import ("./mi14.js");
                                        case "../lang/nl.js":
                                            return import ("./nl14.js");
                                        case "../lang/pt.js":
                                            return import ("./pt14.js");
                                        case "../lang/sv.js":
                                            return import ("./sv14.js");
                                        case "../lang/th.js":
                                            return import ("./th14.js");
                                        case "../lang/tr.js":
                                            return import ("./tr14.js");
                                        case "../lang/vi.js":
                                            return import ("./vi14.js");
                                        case "../lang/zh-cn.js":
                                            return import ("./zh-cn13.js");
                                        case "../lang/zh-tw.js":
                                            return import ("./zh-tw14.js");
                                        default:
                                            return new Promise(function(t, o) {
                                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(o.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                            })
                                    }
                                }(`../lang/${e}.js`)).default;
                            return N.set(e, t), t
                        }
                    }))
                }
                return Promise.all(t)
            }
            static async _getLocalizeResources(e, {
                importFunc: t,
                osloCollection: o,
                useBrowserLangs: s
            }) {
                if (void 0 === t) return;
                const n = e.includes("en-ca") && e.indexOf("en-ca") <= Math.max(e.indexOf("en-us"), 0);
                t.toString().includes("switch") || s || (e = e.filter(e => i.includes(e)));
                for (const s of [...e, c]) {
                    const e = await Promise.resolve(t(s)).catch(() => {}),
                        r = "en" === s && n ? "en-ca" : s;
                    if (e) {
                        if (o) {
                            const t = this.documentLocaleSettings.oslo;
                            let n = 0;
                            if (t.collection && (n = l.find(e => e.code === r || e.pack === r) ? .id, n)) {
                                const e = t.batch && new URL(t.batch, self.origin);
                                e && n !== e.searchParams.get("languageId") && (e.searchParams.set("languageId", n), t.batch = e.toString());
                                const o = new URL(t.collection, self.origin);
                                n !== o.searchParams.get("languageId") && (o.searchParams.set("languageId", n), t.collection = o.toString())
                            }
                            return await B(s, e, () => o)
                        }
                        return {
                            language: s,
                            resources: e
                        }
                    }
                }
            }
            _hasResources() {
                return this.constructor.localizeConfig ? void 0 !== this.constructor.localizeConfig || !0 === this.constructor.localizeConfig.loadCommon : void 0 !== this.constructor.getLocalizeResources
            }
        }, e(p, "documentLocaleSettings", a()), j = {
            _: void 0
        }, p;
        async function b() {
            if (!this._hasResources()) return;
            const e = this.constructor._getAllLocalizeResources(this.config);
            o(d, this, e);
            const t = (await e).flat(1 / 0).filter(e => e);
            if (s(d, this) !== e) return;
            const n = {},
                a = new Set;
            for (const {
                    language: e,
                    resources: o
                } of t)
                for (const [t, s] of Object.entries(o)) n[t] = {
                    language: e,
                    value: s
                }, a.add(e);
            this.localize.resources = n, this.localize.resolvedLocale = [...a][0], a.size > 1 && console.warn(`Resolved multiple locales in '${this.constructor.name||this.tagName||""}': ${[...a].join(", ")}`), this.pristine && (this.pristine = !1, s(f, this).call(this)), r(w, this, v).call(this)
        }

        function v() {
            s(m, this) && (this.dispatchEvent ? .(new CustomEvent("d2l-localize-resources-change")), this.config ? .onResourcesChange ? .(), this.onLocalizeResourcesChange ? .())
        }
    },
    K = class extends(D()) {
        static getLocalizeResources() {
            return super._getLocalizeResources(...arguments)
        }
        constructor(e) {
            super(), super.constructor.setLocalizeMarkup(X), this.localize = super.constructor.documentLocaleSettings.pseudoLocalization ? .textFormat ? (...e) => super.constructor.pseudoLocalize((...e) => super.localize(...e), ...e) : (...e) => super.localize(...e), this.config = e, this.connect()
        }
        get ready() {
            return this.__resourcesLoadedPromise
        }
        connect() {
            return super.connect(), this.ready
        }
    };
class Q extends Error {
    constructor(...t) {
        super(...t), e(this, "name", this.constructor.name)
    }
}

function V(e, t) {
    if (e) {
        if (e.forEach) return void e.forEach(e => V(e));
        if (e._localizeMarkup) return;
        if (function(e, t) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                return Object.prototype.hasOwnProperty.call(Object(e), t)
            }(e, "_$litType$")) throw new Q("Rich-text replacements must use localizeMarkup templates. For more information, see: https://github.com/BrightspaceUI/core/blob/main/mixins/localize/");
        if (e.constructor === String && t ? .test(e)) throw new Q(`Rich-text replacements may use only the following allowed elements: ${W}. For more information, see: https://github.com/BrightspaceUI/core/blob/main/mixins/localize/`)
    }
}

function X(e, ...t) {
    return e.forEach(e => V(e, G)), t.forEach(e => V(e, G)), e.reduce((e, o, s) => e.push(o, t[s] ? ? "") && e, []).join("")
}
export {
    K as L, B as a, G as d, D as g, V as v
};