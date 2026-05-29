import {
    P as e,
    B as t
} from "./polymer-legacy.js";
import {
    i as s,
    p as r,
    h as o,
    f as n,
    b as i
} from "./dateTime.js";
import {
    p as a,
    f as u
} from "./number.js";
import {
    a as c,
    s as l
} from "./common.js";
import {
    i as h
} from "./index2.js";
import {
    f as p
} from "./fileSize.js";
e({
    is: "iron-request",
    hostAttributes: {
        hidden: !0
    },
    properties: {
        xhr: {
            type: Object,
            notify: !0,
            readOnly: !0,
            value: function() {
                return new XMLHttpRequest
            }
        },
        response: {
            type: Object,
            notify: !0,
            readOnly: !0,
            value: function() {
                return null
            }
        },
        status: {
            type: Number,
            notify: !0,
            readOnly: !0,
            value: 0
        },
        statusText: {
            type: String,
            notify: !0,
            readOnly: !0,
            value: ""
        },
        completes: {
            type: Object,
            readOnly: !0,
            notify: !0,
            value: function() {
                return new Promise(function(e, t) {
                    this.resolveCompletes = e, this.rejectCompletes = t
                }.bind(this))
            }
        },
        progress: {
            type: Object,
            notify: !0,
            readOnly: !0,
            value: function() {
                return {}
            }
        },
        aborted: {
            type: Boolean,
            notify: !0,
            readOnly: !0,
            value: !1
        },
        errored: {
            type: Boolean,
            notify: !0,
            readOnly: !0,
            value: !1
        },
        timedOut: {
            type: Boolean,
            notify: !0,
            readOnly: !0,
            value: !1
        }
    },
    get succeeded() {
        if (this.errored || this.aborted || this.timedOut) return !1;
        var e = this.xhr.status || 0;
        return 0 === e || e >= 200 && e < 300
    },
    send: function(e) {
        var s = this.xhr;
        if (s.readyState > 0) return null;
        s.addEventListener("progress", function(e) {
            this._setProgress({
                lengthComputable: e.lengthComputable,
                loaded: e.loaded,
                total: e.total
            }), this.fire("iron-request-progress-changed", {
                value: this.progress
            })
        }.bind(this)), s.addEventListener("error", function(t) {
            this._setErrored(!0), this._updateStatus();
            var s = e.rejectWithRequest ? {
                error: t,
                request: this
            } : t;
            this.rejectCompletes(s)
        }.bind(this)), s.addEventListener("timeout", function(t) {
            this._setTimedOut(!0), this._updateStatus();
            var s = e.rejectWithRequest ? {
                error: t,
                request: this
            } : t;
            this.rejectCompletes(s)
        }.bind(this)), s.addEventListener("abort", function() {
            this._setAborted(!0), this._updateStatus();
            var t = new Error("Request aborted."),
                s = e.rejectWithRequest ? {
                    error: t,
                    request: this
                } : t;
            this.rejectCompletes(s)
        }.bind(this)), s.addEventListener("loadend", function() {
            if (this._updateStatus(), this._setResponse(this.parseResponse()), this.succeeded) this.resolveCompletes(this);
            else {
                var t = new Error("The request failed with status code: " + this.xhr.status),
                    s = e.rejectWithRequest ? {
                        error: t,
                        request: this
                    } : t;
                this.rejectCompletes(s)
            }
        }.bind(this)), this.url = e.url;
        var r = !1 !== e.async;
        s.open(e.method || "GET", e.url, r);
        var o = {
                json: "application/json",
                text: "text/plain",
                html: "text/html",
                xml: "application/xml",
                arraybuffer: "application/octet-stream"
            }[e.handleAs],
            n = e.headers || Object.create(null),
            i = Object.create(null);
        for (var a in n) i[a.toLowerCase()] = n[a];
        if (n = i, o && !n.accept && (n.accept = o), Object.keys(n).forEach(function(e) {
                /[A-Z]/.test(e) && t._error("Headers must be lower case, got", e), s.setRequestHeader(e, n[e])
            }, this), r) {
            s.timeout = e.timeout;
            var u = e.handleAs;
            !e.jsonPrefix && u || (u = "text"), s.responseType = s._responseType = u, e.jsonPrefix && (s._jsonPrefix = e.jsonPrefix)
        }
        s.withCredentials = !!e.withCredentials;
        var c = this._encodeBodyObject(e.body, n["content-type"]);
        return s.send(c), this.completes
    },
    parseResponse: function() {
        var e = this.xhr,
            t = e.responseType || e._responseType,
            s = !this.xhr.responseType,
            r = e._jsonPrefix && e._jsonPrefix.length || 0;
        try {
            switch (t) {
                case "json":
                    if (s || void 0 === e.response) try {
                        return JSON.parse(e.responseText)
                    } catch (t) {
                        return console.warn("Failed to parse JSON sent from " + e.responseURL), null
                    }
                    return e.response;
                case "xml":
                    return e.responseXML;
                case "blob":
                case "document":
                case "arraybuffer":
                    return e.response;
                default:
                    if (r) try {
                        return JSON.parse(e.responseText.substring(r))
                    } catch (t) {
                        return console.warn("Failed to parse JSON sent from " + e.responseURL), null
                    }
                    return e.responseText
            }
        } catch (e) {
            this.rejectCompletes(new Error("Could not parse response. " + e.message))
        }
    },
    abort: function() {
        this._setAborted(!0), this.xhr.abort()
    },
    _encodeBodyObject: function(e, t) {
        if ("string" == typeof e) return e;
        var s = e;
        switch (t) {
            case "application/json":
                return JSON.stringify(s);
            case "application/x-www-form-urlencoded":
                return this._wwwFormUrlEncode(s)
        }
        return e
    },
    _wwwFormUrlEncode: function(e) {
        if (!e) return "";
        var t = [];
        return Object.keys(e).forEach(function(s) {
            t.push(this._wwwFormUrlEncodePiece(s) + "=" + this._wwwFormUrlEncodePiece(e[s]))
        }, this), t.join("&")
    },
    _wwwFormUrlEncodePiece: function(e) {
        return null != e && e.toString ? encodeURIComponent(e.toString().replace(/\r?\n/g, "\r\n")).replace(/%20/g, "+") : ""
    },
    _updateStatus: function() {
        this._setStatus(this.xhr.status), this._setStatusText(void 0 === this.xhr.statusText ? "" : this.xhr.statusText)
    }
}), e({
    is: "iron-ajax",
    hostAttributes: {
        hidden: !0
    },
    properties: {
        url: {
            type: String
        },
        params: {
            type: Object,
            value: function() {
                return {}
            }
        },
        method: {
            type: String,
            value: "GET"
        },
        headers: {
            type: Object,
            value: function() {
                return {}
            }
        },
        contentType: {
            type: String,
            value: null
        },
        body: {
            type: Object,
            value: null
        },
        sync: {
            type: Boolean,
            value: !1
        },
        handleAs: {
            type: String,
            value: "json"
        },
        withCredentials: {
            type: Boolean,
            value: !1
        },
        timeout: {
            type: Number,
            value: 0
        },
        auto: {
            type: Boolean,
            value: !1
        },
        verbose: {
            type: Boolean,
            value: !1
        },
        lastRequest: {
            type: Object,
            notify: !0,
            readOnly: !0
        },
        lastProgress: {
            type: Object,
            notify: !0,
            readOnly: !0
        },
        loading: {
            type: Boolean,
            notify: !0,
            readOnly: !0
        },
        lastResponse: {
            type: Object,
            notify: !0,
            readOnly: !0
        },
        lastError: {
            type: Object,
            notify: !0,
            readOnly: !0
        },
        activeRequests: {
            type: Array,
            notify: !0,
            readOnly: !0,
            value: function() {
                return []
            }
        },
        debounceDuration: {
            type: Number,
            value: 0,
            notify: !0
        },
        jsonPrefix: {
            type: String,
            value: ""
        },
        bubbles: {
            type: Boolean,
            value: !1
        },
        rejectWithRequest: {
            type: Boolean,
            value: !1
        },
        _boundHandleResponse: {
            type: Function,
            value: function() {
                return this._handleResponse.bind(this)
            }
        }
    },
    observers: ["_requestOptionsChanged(url, method, params.*, headers, contentType, body, sync, handleAs, jsonPrefix, withCredentials, timeout, auto)"],
    created: function() {
        this._boundOnProgressChanged = this._onProgressChanged.bind(this)
    },
    get queryString() {
        var e, t, s = [];
        for (e in this.params)
            if (t = this.params[e], e = window.encodeURIComponent(e), Array.isArray(t))
                for (var r = 0; r < t.length; r++) s.push(e + "=" + window.encodeURIComponent(t[r]));
            else null !== t ? s.push(e + "=" + window.encodeURIComponent(t)) : s.push(e);
        return s.join("&")
    },
    get requestUrl() {
        var e = this.queryString,
            t = this.url || "";
        if (e) {
            var s = t.indexOf("?") >= 0 ? "&" : "?";
            return t + s + e
        }
        return t
    },
    get requestHeaders() {
        var e, t = {},
            s = this.contentType;
        if (null == s && "string" == typeof this.body && (s = "application/x-www-form-urlencoded"), s && (t["content-type"] = s), "object" == typeof this.headers)
            for (e in this.headers) t[e] = this.headers[e].toString();
        return t
    },
    _onProgressChanged: function(e) {
        this._setLastProgress(e.detail.value)
    },
    toRequestOptions: function() {
        return {
            url: this.requestUrl || "",
            method: this.method,
            headers: this.requestHeaders,
            body: this.body,
            async: !this.sync,
            handleAs: this.handleAs,
            jsonPrefix: this.jsonPrefix,
            withCredentials: this.withCredentials,
            timeout: this.timeout,
            rejectWithRequest: this.rejectWithRequest
        }
    },
    generateRequest: function() {
        var e = document.createElement("iron-request"),
            t = this.toRequestOptions();
        return this.push("activeRequests", e), e.completes.then(this._boundHandleResponse).catch(this._handleError.bind(this, e)).then(this._discardRequest.bind(this, e)), this.fire("iron-ajax-presend", {
            request: e,
            options: t
        }, {
            bubbles: this.bubbles,
            cancelable: !0
        }).defaultPrevented ? (e.abort(), e.rejectCompletes(e), e) : (this.lastRequest && this.lastRequest.removeEventListener("iron-request-progress-changed", this._boundOnProgressChanged), e.addEventListener("iron-request-progress-changed", this._boundOnProgressChanged), e.send(t), this._setLastProgress(null), this._setLastRequest(e), this._setLoading(!0), this.fire("request", {
            request: e,
            options: t
        }, {
            bubbles: this.bubbles,
            composed: !0
        }), this.fire("iron-ajax-request", {
            request: e,
            options: t
        }, {
            bubbles: this.bubbles,
            composed: !0
        }), e)
    },
    _handleResponse: function(e) {
        e === this.lastRequest && (this._setLastResponse(e.response), this._setLastError(null), this._setLoading(!1)), this.fire("response", e, {
            bubbles: this.bubbles,
            composed: !0
        }), this.fire("iron-ajax-response", e, {
            bubbles: this.bubbles,
            composed: !0
        })
    },
    _handleError: function(e, s) {
        this.verbose && t._error(s), e === this.lastRequest && (this._setLastError({
            request: e,
            error: s,
            status: e.xhr.status,
            statusText: e.xhr.statusText,
            response: e.xhr.response
        }), this._setLastResponse(null), this._setLoading(!1)), this.fire("iron-ajax-error", {
            request: e,
            error: s
        }, {
            bubbles: this.bubbles,
            composed: !0
        }), this.fire("error", {
            request: e,
            error: s
        }, {
            bubbles: this.bubbles,
            composed: !0
        })
    },
    _discardRequest: function(e) {
        var t = this.activeRequests.indexOf(e);
        t > -1 && this.splice("activeRequests", t, 1)
    },
    _requestOptionsChanged: function() {
        this.debounce("generate-request", function() {
            null != this.url && this.auto && this.generateRequest()
        }, this.debounceDuration)
    }
}), window.IntlMessageFormat = h;
var d = Object.assign ? Object.assign.bind(Object) : function(e, t) {
    for (var s in t) t.hasOwnProperty(s) && (e[s] = t[s]);
    return e
};
const f = {
        __localizationCache: {
            requests: {},
            messages: {},
            ajax: null
        },
        properties: {
            language: {
                type: String
            },
            resources: {
                type: Object
            },
            formats: {
                type: Object,
                value: function() {
                    return {}
                }
            },
            useKeyIfMissing: {
                type: Boolean,
                value: !1
            },
            localize: {
                type: Function,
                computed: "__computeLocalize(language, resources, formats)"
            },
            bubbleEvent: {
                type: Boolean,
                value: !1
            }
        },
        loadResources: function(e, t, s) {
            var r = this.constructor.prototype;
            this.__checkLocalizationCache(r);
            var o, n = r.__localizationCache.ajax;

            function i(e) {
                this.__onRequestResponse(e, t, s)
            }(n || (n = r.__localizationCache.ajax = document.createElement("iron-ajax")), o = r.__localizationCache.requests[e]) ? o.completes.then(i.bind(this), this.__onRequestError.bind(this)): (n.url = e, (o = n.generateRequest()).completes.then(i.bind(this), this.__onRequestError.bind(this)), r.__localizationCache.requests[e] = o)
        },
        __computeLocalize: function(e, t, s) {
            var r = this.constructor.prototype;
            return this.__checkLocalizationCache(r), r.__localizationCache || (r.__localizationCache = {
                requests: {},
                messages: {},
                ajax: null
            }), r.__localizationCache.messages = {}, (o, ...n) => {
                if (!(o && t && e && t[e])) return "";
                var i = t[e][o];
                if (!i) return this.useKeyIfMissing ? o : "";
                var a = o + i,
                    u = r.__localizationCache.messages[a];
                u || (u = new h(i, e, s), r.__localizationCache.messages[a] = u);
                const c = n.reduce((e, t, s) => s % 2 ? e : { ...e,
                    [t]: n[s + 1]
                }, {});
                var l = i;
                try {
                    l = u.format(c)
                } catch (e) {
                    console.error(e)
                }
                return l
            }
        },
        __onRequestResponse: function(e, t, s) {
            var r = {},
                o = e.response;
            if (s ? t ? (r.resources = d({}, this.resources || {}), r["resources." + t] = d(r.resources[t] || {}, o)) : r.resources = d(this.resources, o) : t ? (r.resources = {}, r.resources[t] = o, r["resources." + t] = o) : r.resources = o, this.setProperties) this.setProperties(r);
            else
                for (var n in r) this.set(n, r[n]);
            this.fire("app-localize-resources-loaded", e, {
                bubbles: this.bubbleEvent
            })
        },
        __onRequestError: function(e) {
            this.fire("app-localize-resources-error")
        },
        __checkLocalizationCache: function(e) {
            void 0 !== e && void 0 === e.__localizationCache && (e.__localizationCache = {
                requests: {},
                messages: {},
                ajax: null
            })
        }
    },
    m = "d2l-oslo",
    _ = "Content-Type",
    g = "ETag",
    b = new Error("Failed to fetch batch overrides."),
    y = new Error("Failed to fetch overrides."),
    v = new Map;
let w, j, C, R = [],
    q = 1,
    L = 0;
async function O(e, t) {
    if (t.ok) {
        const s = await t.json();
        e.resolve(s)
    } else e.reject(y)
}
async function x() {
    if (L = 0, q = 2, R.length <= 0) return void(q = 1);
    const e = R;
    R = [];
    const t = {
            resources: e.map(e => e.resource)
        },
        s = JSON.stringify(t),
        r = await fetch(C.oslo.batch, {
            method: "POST",
            body: s,
            headers: {
                [_]: "application/json"
            }
        });
    if (r.ok) {
        const t = (await r.json()).resources,
            s = [];
        for (let r = 0; r < t.length; ++r) {
            const o = t[r],
                n = e[r],
                i = new Response(o.body, {
                    status: o.status,
                    headers: o.headers
                }),
                a = i.headers.get(g);
            a && E(a);
            const u = new Request(F(n.resource)),
                c = i.clone();
            void 0 === w && (void 0 === j && (j = caches.open(m)), w = await j), s.push(w.put(u, c)), s.push(O(n, i))
        }
        await Promise.all(s)
    } else
        for (const t of e) t.reject(b);
    R.length > 0 ? setTimeout(x, 0) : q = 1
}

function P(e) {
    const t = new Promise((t, s) => {
        R.push({
            resource: e,
            resolve: t,
            reject: s
        })
    });
    return 1 === q && (L > 0 && clearTimeout(L), L = setTimeout(x, 150)), t
}

function F(e) {
    return D(C.oslo.collection, e)
}
async function T(e) {
    void 0 === w && (void 0 === j && (j = caches.open(m)), w = await j);
    const t = new Request(F(e)),
        s = await w.match(t);
    if (void 0 === s) return P(e);
    if (!s.ok) throw P(e).then(e => URL.revokeObjectURL(e)), y;
    const r = function() {
        void 0 === C && (C = c());
        if (!C.oslo || !C.oslo.version) return null;
        return C.oslo.version
    }();
    if (r) {
        s.headers.get(g) !== r && P(e).then(e => URL.revokeObjectURL(e))
    }
    return await s.json()
}
async function S() {
    if (void 0 === C && (C = c()), !C.oslo) return !1;
    try {
        return await caches.open(m), Boolean(C.oslo.batch) && "CacheStorage" in window
    } catch (e) {
        return !1
    }
}

function E(e) {
    void 0 === C && (C = c()), C.oslo && (C.oslo.version = e)
}
async function z() {
    return await S() || (void 0 === C && (C = c()), !!C.oslo && Boolean(C.oslo.collection))
}
async function B(e) {
    let t, s, r;
    return await S() ? (t = e(), s = function(e) {
        let t = v.get(e);
        return void 0 === t && (t = T(e), v.set(e, t)), t
    }(t)) : (t = e(), r = D(C.oslo.collection, t), s = async function(e) {
        if (v.has(e)) return Promise.resolve(v.get(e));
        const t = await fetch(e, {
            method: "GET"
        });
        if (t.ok) {
            const s = await t.json();
            return v.set(e, s), Promise.resolve(s)
        }
        return Promise.reject(y)
    }(r)), s = s.catch(k), s
}

function k() {
    return null
}

function D(e, t) {
    return `${e}/${t}`
}
async function U(e) {
    if (await z()) return B(() => e)
}
window.D2L = window.D2L || {}, window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {}, D2L.PolymerBehaviors.LocalizeBehaviorImpl = {
    properties: {
        formatDateTime: {
            type: Function,
            computed: "_computeFormatDateTime(language, __resolveFast)"
        },
        formatDate: {
            type: Function,
            computed: "_computeFormatDate(language, __resolveFast)"
        },
        formatFileSize: {
            type: Function,
            computed: "_computeFormatFileSize(language, __resolveFast)"
        },
        formatNumber: {
            type: Function,
            computed: "_computeFormatNumber(language, __resolveFast)"
        },
        formatTime: {
            type: Function,
            computed: "_computeFormatTime(language, __resolveFast)"
        },
        language: {
            type: String,
            computed: "_computeLanguage(resources, __documentLanguage, __documentLanguageFallback, __resolvedLanguage)"
        },
        parseDate: {
            type: Function,
            computed: "_computeParseDate(language, __resolveFast)"
        },
        parseNumber: {
            type: Function,
            computed: "_computeParseNumber(language, __resolveFast)"
        },
        parseTime: {
            type: Function,
            computed: "_computeParseTime(language, __resolveFast)"
        },
        __documentLanguage: {
            type: String,
            value: function() {
                return c().language
            }
        },
        __documentLanguageFallback: {
            type: String,
            value: function() {
                return c().fallbackLanguage
            }
        },
        __languageChangeCallback: {
            type: Object
        },
        __possibleLanguages: {
            type: String,
            computed: "__computePossibleLanguages(__documentLanguage, __documentLanguageFallback)"
        },
        __resolveFast: {
            type: Boolean,
            value: !0
        },
        __resolvedLanguage: {
            type: String
        }
    },
    observers: ["__importResources(__possibleLanguages)", "_languageChange(language)"],
    created: function() {
        this.__resourcesPromise = this.resources ? Promise.resolve() : new Promise(e => this.__resolveResources = e)
    },
    attached: function() {
        const e = c();
        this.__languageChangeCallback = () => {
            this.__documentLanguage = e.language, this.__documentLanguageFallback = e.fallbackLanguage
        }, e.addChangeListener(this.__languageChangeCallback), this.__languageChangeCallback()
    },
    detached: function() {
        c().removeChangeListener(this.__languageChangeCallback)
    },
    getTimezone: function() {
        return c().timezone
    },
    _computeFormatDateTime: function() {
        return function(e, t) {
            return i(e, t)
        }
    },
    _computeFormatDate: function() {
        return function(e, t) {
            return n(e, t)
        }
    },
    _computeFormatFileSize: function() {
        return function(e) {
            return p(e)
        }
    },
    _computeFormatNumber: function() {
        return function(e, t) {
            return u(e, t)
        }
    },
    _computeFormatTime: function() {
        return function(e, t) {
            return o(e, t)
        }
    },
    _computeParseDate: function() {
        return function(e) {
            return r(e)
        }
    },
    _computeParseNumber: function() {
        return function(e, t) {
            return a(e)
        }
    },
    _computeParseTime: function() {
        return function(e) {
            return s(e)
        }
    },
    __computePossibleLanguages: function(e, t) {
        const s = [e, t].filter(e => e).map(e => [e.toLowerCase(), e.split("-")[0]]).flat();
        return [...new Set([...s, "en-us", "en"])]
    },
    _computeLanguage: function(e, t, s, r) {
        if (this.localizeConfig.importFunc) return r;
        return this._tryResolve(e, t) || this._tryResolve(e, s) || this._tryResolve(e, "en-us")
    },
    __importResources: async function(e) {
        const {
            importFunc: t,
            osloCollection: s
        } = this.localizeConfig;
        if (e && t) {
            t.toString().includes("switch") || (e = e.filter(e => l.includes(e)));
            for (const r of e) {
                if (this.resources ? .[r]) return void(this.__resolvedLanguage = r);
                let e = await Promise.resolve(t(r)).catch(() => {});
                if (e) return s && (e = { ...e,
                    ...await U(s)
                }), this.__onRequestResponse({
                    response: e
                }, r, !0), this.__resolvedLanguage = r, void setTimeout(this.__resolveResources)
            }
        }
    },
    _languageChange: async function() {
        this.fire("d2l-localize-behavior-language-changed")
    },
    _tryResolve: function(e, t) {
        if (null == t) return null;
        const s = (t = t.toLowerCase()).split("-")[0];
        let r = null;
        for (const o in e) {
            const e = o.toLowerCase();
            if (e === t) return o;
            e === s && (r = o)
        }
        return r || null
    },
    getLoadingComplete() {
        return this.__resourcesPromise
    },
    localizeConfig: {}
}, D2L.PolymerBehaviors.LocalizeBehavior = [f, D2L.PolymerBehaviors.LocalizeBehaviorImpl];