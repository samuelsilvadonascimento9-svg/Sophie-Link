const e = document.documentElement,
    t = {
        pseudoLocalization: {},
        _fallbackLanguage: null,
        overrides: {},
        terminology: {
            educator: "teacher",
            moduleHierarchy: "module",
            outcomes: "standards"
        },
        timezone: {
            name: "",
            identifier: ""
        },
        oslo: {
            batch: null,
            collection: null,
            version: null
        }
    };
class a {
    constructor() {
        this._cache = new Map, this._listeners = [], this._overrides = t.overrides;
        new MutationObserver(this._handleObserverChange.bind(this)).observe(e, {
            attributes: !0
        }), this.sync()
    }
    get fallbackLanguage() {
        return this._fallbackLanguage
    }
    set fallbackLanguage(e) {
        const t = this._normalize(e);
        t !== this._fallbackLanguage && (this._cache.clear(), this._fallbackLanguage = t, this._listeners.forEach(e => e()))
    }
    get language() {
        return this._language
    }
    set language(e) {
        const t = this._normalize(e);
        t !== this._language && (this._cache.clear(), this._language = t, this._listeners.forEach(e => e()))
    }
    get overrides() {
        return this._overrides
    }
    set overrides(e) {
        e.date && (e.date.calendar && delete e.date.calendar.dayPeriods, e.date.formats && delete e.date.formats.timeFormats), this._cache.clear(), this._overrides = e, this._listeners.forEach(e => e())
    }
    addChangeListener(e) {
        this._listeners.push(e)
    }
    getCacheItem(e, t) {
        return this._cache.has(e) || this._cache.set(e, t()), this._cache.get(e)
    }
    removeChangeListener(e) {
        const t = this._listeners.indexOf(e);
        t < 0 || this._listeners.splice(t, 1)
    }
    reset() {
        this._cache.clear(), this._language = this._languageInitial, this._listeners = [], Object.assign(this, JSON.parse(JSON.stringify(t)))
    }
    sync() {
        this.language = e.getAttribute("lang"), this._languageInitial ? ? (this._languageInitial = this._language), this.fallbackLanguage = e.getAttribute("data-lang-default"), this.overrides = this._tryParseHtmlElemAttr("data-intl-overrides", t.overrides), this.terminology = this._tryParseHtmlElemAttr("data-terminology", t.terminology), this.timezone = this._tryParseHtmlElemAttr("data-timezone", t.timezone), this.pseudoLocalization = this._tryParseHtmlElemAttr("data-pseudo-localization", t.pseudoLocalization), this.oslo = this._tryParseHtmlElemAttr("data-oslo", t.oslo)
    }
    _handleObserverChange(a) {
        let r = !1;
        for (let i = 0; i < a.length; i++) {
            const n = a[i];
            "lang" === n.attributeName ? this.language = e.getAttribute("lang") : "data-lang-default" === n.attributeName ? this.fallbackLanguage = e.getAttribute("data-lang-default") : "data-intl-overrides" === n.attributeName ? this.overrides = this._tryParseHtmlElemAttr("data-intl-overrides", t.overrides) : "data-terminology" === n.attributeName ? (this.terminology = this._tryParseHtmlElemAttr("data-terminology", t.terminology), r = !0) : "data-timezone" === n.attributeName ? (this.timezone = this._tryParseHtmlElemAttr("data-timezone", t.timezone), r = !0) : "data-pseudo-localization" === n.attributeName ? (this.pseudoLocalization = this._tryParseHtmlElemAttr("data-pseudo-localization", t.pseudoLocalization), r = !0) : "data-oslo" === n.attributeName && (this.oslo = this._tryParseHtmlElemAttr("data-oslo", t.oslo), r = !0)
        }
        r && this._listeners.forEach(e => e())
    }
    _normalize(e) {
        if (null == e) return null;
        const t = (e = e.trim().toLowerCase()).split("-");
        return t.length < 2 ? e : `${t[0]}-${t[t.length-1]}`
    }
    _tryParseHtmlElemAttr(t, a) {
        if (e.hasAttribute(t)) try {
            return JSON.parse(e.getAttribute(t))
        } catch {}
        return a
    }
}
const r = "en",
    i = ["ar", "ca", "cy", "da", "de", "en", "es", "fr", "haw", "hi", "ja", "ko", "mi", "nl", "pt", "sv", "th", "tr", "vi", "zh"],
    n = ["ar", "ca", "cy", "da", "de", "en", "en-gb", "es", "es-es", "fr", "fr-fr", "fr-on", "haw", "hi", "ja", "ko", "mi", "nl", "pt", "sv", "th", "tr", "vi", "zh-cn", "zh-tw"],
    s = [{
        id: 16,
        code: "ar-sa",
        pack: "ar",
        dir: "rtl",
        name: "العربية (المملكة العربية السعودية)"
    }, {
        id: 38,
        code: "ca-es",
        pack: "ca",
        dir: "ltr",
        name: "Català (Espanya)"
    }, {
        id: 31,
        code: "cy-gb",
        pack: "cy",
        dir: "ltr",
        name: "Cymraeg (Y Deyrnas Unedig)"
    }, {
        id: 28,
        code: "da-dk",
        pack: "da",
        dir: "ltr",
        name: "Dansk (danmark)"
    }, {
        id: 26,
        code: "de-de",
        pack: "de",
        dir: "ltr",
        name: "Deutsch (Deutschland)"
    }, {
        id: 13,
        code: "en-ca",
        dir: "ltr",
        name: "English (Canada)"
    }, {
        id: 11,
        code: "en-gb",
        pack: "en-gb",
        dir: "ltr",
        name: "English (United Kingdom)"
    }, {
        id: 1,
        code: "en-us",
        pack: "en",
        dir: "ltr",
        name: "English (United States)"
    }, {
        id: 30,
        code: "es-es",
        pack: "es-es",
        dir: "ltr",
        name: "Español (España)"
    }, {
        id: 18,
        code: "es-mx",
        pack: "es",
        overrideCode: "es-419",
        dir: "ltr",
        name: "Español (Latinoamérica)"
    }, {
        id: 2,
        code: "fr-ca",
        pack: "fr",
        dir: "ltr",
        name: "Français (Canada)"
    }, {
        id: 29,
        code: "fr-fr",
        pack: "fr-fr",
        dir: "ltr",
        name: "Français (France)"
    }, {
        id: 32,
        code: "fr-on",
        pack: "fr-on",
        overrideCode: "fr-CA-Ontario",
        dir: "ltr",
        name: "Français (Ontario)"
    }, {
        id: 35,
        code: "haw-us",
        pack: "haw",
        dir: "ltr",
        name: "ʻŌlelo Hawaiʻi (ʻAmelika Hui Pū ʻIa)"
    }, {
        id: 33,
        code: "hi-in",
        pack: "hi",
        dir: "ltr",
        name: "हिंदी (भारत)"
    }, {
        id: 21,
        code: "ja-jp",
        pack: "ja",
        dir: "ltr",
        name: "日本語 (日本)"
    }, {
        id: 22,
        code: "ko-kr",
        pack: "ko",
        dir: "ltr",
        name: "한국어 (대한민국)"
    }, {
        id: 34,
        code: "mi-nz",
        pack: "mi",
        dir: "ltr",
        name: "Māori (Aotearoa)"
    }, {
        id: 25,
        code: "nl-nl",
        pack: "nl",
        dir: "ltr",
        name: "Nederlands (Nederland)"
    }, {
        id: 19,
        code: "pt-br",
        pack: "pt",
        dir: "ltr",
        name: "Português (Brasil)"
    }, {
        id: 24,
        code: "sv-se",
        pack: "sv",
        dir: "ltr",
        name: "Svenska (Sverige)"
    }, {
        id: 37,
        code: "th-th",
        pack: "th",
        dir: "ltr",
        name: "ไทย (ไทย)"
    }, {
        id: 23,
        code: "tr-tr",
        pack: "tr",
        dir: "ltr",
        name: "Türkçe (Türkiye)"
    }, {
        id: 36,
        code: "vi-vn",
        pack: "vi",
        dir: "ltr",
        name: "Tiếng Việt (Việt Nam)"
    }, {
        id: 17,
        code: "zh-cn",
        pack: "zh-cn",
        overrideCode: "zh-Hans",
        dir: "ltr",
        name: "中文(简体)"
    }, {
        id: 20,
        code: "zh-tw",
        pack: "zh-tw",
        overrideCode: "zh-Hant",
        dir: "ltr",
        name: "中文(繁体)"
    }],
    l = s.map(e => e.code);

function o(e) {
    if (null == e) return null;
    if (l.indexOf(e) > -1) return e;
    const t = e.split("-");
    return t.length < 2 ? i.indexOf(e) > -1 ? e : null : i.indexOf(t[0]) > -1 ? t[0] : null
}

function d() {
    const e = g();
    return o(e.language) || o(e.fallbackLanguage) || r
}

function c(e, t) {
    if (null != t && "object" == typeof t)
        for (const a in t) e.hasOwnProperty(a) && ("object" == typeof t[a] && "object" == typeof e[a] ? c(e[a], t[a]) : e[a] = t[a])
}

function h(e) {
    if (null == e) return 0;
    if ("string" == typeof e && (e = parseFloat(e)), isNaN(e) || "number" != typeof e) throw new RangeError("value is out of range.");
    return e
}
let u = null;

function g() {
    return null === u && (u = new a), u
}
const m = /[^a-zA-Z0-9-]/g;

function f() {
    const e = [u.language, navigator.language, r].filter(e => e && !m.test(e));
    let t;
    try {
        t = new Intl.DisplayNames(e, {
            type: "language"
        })
    } catch {
        return
    }
    s.forEach(e => {
        e.localName = t.of(e.overrideCode || e.code)
    })
}
g().addChangeListener(f), f();
export {
    g as a, s as b, i as c, r as d, d as g, c as m, n as s, h as v
};