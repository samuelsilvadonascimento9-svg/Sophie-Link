import "./d2l-fetch.js";
import {
    E as t
} from "./index8.js";
class e {
    constructor(t, e) {
        this._cacheKey = this._parseCacheKey(t), this._value = t, this._rawToken = e
    }
    get cookie() {
        return -1 === this._value
    }
    get rawToken() {
        return this._rawToken
    }
    get value() {
        return this._value
    }
    isResolved() {
        return !!this.value
    }
    toString() {
        return this._cacheKey
    }
    _parseCacheKey(t) {
        if (!t) return "";
        if (-1 === t) return "cookie";
        const e = t.split(".");
        if (e.length < 3) return t;
        const s = JSON.parse(atob(e[1]).toString()),
            r = ["exp", "iat", "jti", "nbf"],
            i = Object.keys(s).filter(t => -1 === r.indexOf(t)).reduce((t, e) => (t[e] = s[e], t), {});
        return btoa(JSON.stringify(i)).toLowerCase()
    }
}
let s = null;
async function r(t) {
    if ("function" != typeof t) return new e(t, t || t.rawToken);
    if (s) return s;
    let r;
    s = new Promise(t => r = t);
    const i = await t(),
        n = new e(i, t);
    return r(n), s = null, n
}

function i(t, e) {
    const s = e && e.rel;
    if (!Array.isArray(s)) return -1;
    return -1 !== s.indexOf("nofollow") ? -1 : t.rawToken
}
class n extends Error {}
class a extends n {
    constructor(t, e) {
        super(t), this.status = t, this.errorMessage = e
    }
}
class o {
    constructor() {
        this.complete = null, this.pending = !1, this._resetWaitForNextFetch()
    }
    get waitForNextFetch() {
        return this._waitForNextFetch
    }
    cancel() {
        if (!this.pending) throw new n("Cannot call cancel() on a status that is not pending");
        this._resolver(null), this.pending = !1
    }
    done(t, e) {
        if (!this.pending) throw new n("Cannot call done() on a status that is not pending");
        e ? this._rejecter(e) : this._resolver(t), this.pending = !1, this._resetWaitForNextFetch()
    }
    start() {
        return this.complete = new Promise((t, e) => {
            this._resolver = t, this._rejecter = e
        }), this.pending = !0, this._waitForNextFetchResolver(), this.complete
    }
    async _resetWaitForNextFetch() {
        this._waitForNextFetch = new Promise(t => {
            this._waitForNextFetchResolver = t
        })
    }
}
const h = t => class extends t {
    constructor(t, e) {
        super(), this._body = null, this._fetchStatus = new o, this._headers = null, this._href = t, this._token = e, this._paramsObj = {}, this._bypassCache = !1
    }
    get body() {
        return this._body
    }
    get childHrefs() {
        return []
    }
    get fetchStatus() {
        return this._fetchStatus
    }
    get headers() {
        return this._initHeaders(), this._headers
    }
    get href() {
        return this._setupHrefWithQueryParams(this._paramsObj)
    }
    get method() {
        return this._method || "GET"
    }
    get token() {
        return this._token
    }
    bypassCache() {}
    handleCachePriming() {}
    hasServerResponseCached() {
        return !1
    }
    onServerResponse() {}
    async refreshToken() {
        this._token = await async function(t) {
            return r(t.rawToken)
        }(this.token)
    }
    setQueryParams(t) {
        this._paramsObj = t
    }
    async waitAfterFetch() {}
    _initHeaders() {
        const t = new Headers;
        !this.token.cookie && t.set("Authorization", `Bearer ${this.token.value}`), this._headers = t
    }
    _setupHrefWithQueryParams(t) {
        if (!t || 0 === Object.keys(t).length) return this._href;
        let e = new URL(this._href, window.location.origin);
        const s = new URLSearchParams(Object.keys(t).map(e => [e, t[e]]));
        e = new URL(`${e.pathname}?${s.toString()}`, e.origin);
        return e.toString()
    }
};
class c {
    constructor(t) {
        this._loaded = new Promise(t => this._loadedResolver = t), this._fetchables = [], this._fetching = [], this._waitForHref = [], this._setupNoMoreChildrenPromise(), this.addFetchable(t)
    }
    get loaded() {
        return this._loaded
    }
    addFetchable(t) {
        this._fetchables.length > 0 && this._fetchables.some(e => t === e) || (this._waitForHref = this._waitForHref.filter(e => e !== t.href), this._fetchables.push(t), this._fetching.push(this.queue(t)))
    }
    hasFetchable(t) {
        return this._fetchables.some(e => t === e) || this._waitForHref.some(e => e === t.href)
    }
    async queue(t) {
        await t.fetchStatus.waitForNextFetch, await t.fetchStatus.complete, await t.waitAfterFetch(), t.childHrefs.forEach(t => {
            this._fetchables.length > 0 && this._fetchables.some(e => t === e.href) || this._waitForHref.push(t)
        }), this._noMoreChildrenResolver && 0 === this._waitForHref.length && this._noMoreChildrenResolver()
    }
    async reset() {
        this._loaded = new Promise(t => this._loadedResolver = t), this._fetching = [], this._setupNoMoreChildrenPromise(), this._fetchables.forEach(t => this._fetching.push(t.waitAfterFetch()));
        for await (const t of this._fetchables) await t.waitAfterFetch();
        this._noMoreChildrenResolver()
    }
    waitForHref(t) {
        this._waitForHref.push(t)
    }
    async _setupNoMoreChildrenPromise() {
        const t = new Promise(t => this._noMoreChildrenResolver = t);
        await t, this._noMoreChildrenResolver = null;
        for await (const t of this._fetching) await t;
        this._waitForHref.length <= 0 ? this._loadedResolver() : this._setupNoMoreChildrenPromise()
    }
}
window.D2L = window.D2L || {}, window.D2L.Foundation = window.D2L.Foundation || {}, window.D2L.Foundation.Loaders = window.D2L.Foundation.Loaders || new class {
    constructor() {
        this._loadingGroups = []
    }
    clear() {
        this._loadingGroups = []
    }
    putInLoadingGroup(t) {
        let e;
        return this._loadingGroups.some(s => (e = s, s.addFetchable(t), !0)) || (e = new c(t), this._loadingGroups.push(new c(t))), e
    }
};
const u = window.D2L.Foundation.Loaders;

function d(t) {
    return u.putInLoadingGroup(t).loaded
}

function l() {
    u._loadingGroups[0].reset()
}
const _ = window.d2lfetch;

function p(t, e = !1) {
    if (!t.href) return;
    if (t.fetchStatus.pending) {
        if (!e) return t.fetchStatus.complete;
        t.fetchStatus.cancel()
    }
    const s = t.fetchStatus.start();
    d(t);
    const r = async function(t, e) {
        await t.refreshToken();
        const s = t.token.cookie ? _.removeTemp("auth") : _,
            r = t.headers;
        e && (t.bypassCache(), r.set("pragma", "no-cache"), r.set("cache-control", "no-cache"));
        const i = await s.fetch(t.href, {
            headers: r,
            body: t.body,
            method: t.method
        });
        if (!i.ok) {
            let t = "";
            try {
                t = await i.text()
            } catch (t) {
                throw new a(i.status, "")
            }
            throw new a(i.status, t)
        }
        await t.handleCachePriming(function(t) {
            const e = t.headers && t.headers.get("Link");
            if (!e) return [];
            return function(t) {
                const e = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g,
                    s = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g,
                    r = t.match(e),
                    i = [];
                for (let t = 0; t < r.length; t++) {
                    const e = r[t].split(">"),
                        n = e[0].substring(1);
                    i.push({
                        href: n
                    });
                    const a = e[1].match(s);
                    for (let e = 0; e < a.length; e++) {
                        const s = a[e].split("="),
                            r = s[0],
                            n = s[1].replace(/["']/g, "");
                        if ("rel" === r) {
                            const e = n.split(" ");
                            i[t][r] = e
                        } else i[t][r] = n
                    }
                }
                return i
            }(e).filter(t => -1 !== t.rel.indexOf("https://api.brightspace.com/rels/cache-primer") && t.href).map(t => t.href)
        }(i));
        try {
            return await i.json()
        } catch (t) {
            return
        }
    }(t, e);
    return r.then(async e => {
        await t.onServerResponse(e), t.fetchStatus.done(e)
    }).catch(async e => {
        try {
            await t.onServerResponse(null, e)
        } catch (t) {
            e = t
        }
        t.fetchStatus.done(null, e)
    }), s
}

function f(t) {
    if (!t.href) return;
    if (t.fetchStatus.pending) return t.fetchStatus.complete;
    const e = t.fetchStatus.start();
    return d(t), t.fetchStatus.done(), e
}

function y(t, e = null) {
    if ("object" != typeof t || null === t) return t;
    if (t instanceof Date) return new Date(t.getTime());
    const s = Array.isArray(t) ? [] : {};
    if ((e = null === e ? new WeakMap : e).has(t)) return e.get(t);
    let r;
    e.set(t, s);
    for (const i in t) r = t[i], s[i] = y(r, e);
    return s
}
class w {
    constructor() {
        this._observers = new Map, this._methods = new WeakMap
    }
    get value() {
        return this._value
    }
    add(t, e, s) {
        void 0 !== t && "object" == typeof t && void 0 !== e && "string" == typeof e && (this._observers.has(t) || (this._observers.set(t, e), s && this._methods.set(t, s), void 0 !== this._value && this._setObserverProperty(t, e)))
    }
    delete(t) {
        return this._methods.delete(t), this._observers.delete(t)
    }
    merge(t) {
        t._observers.forEach((e, s) => {
            this.add(s, e, t._methods.get(s))
        })
    }
    setProperty(t) {
        this._value = t, this._observers.forEach((t, e) => {
            this._setObserverProperty(e, t)
        })
    }
    _setObserverProperty(t, e) {
        const s = this._methods.has(t) && this._methods.get(t),
            r = y(this.value);
        t[e] = s ? s(r) : r
    }
}

function b(t) {
    const e = t.hasLinkByRel && t.hasLinkByRel("self") && t.getLinkByRel && t.getLinkByRel("self");
    return t.href || e && e.href
}
class S {
    constructor() {
        this._observers = new w
    }
    addObserver(t, e, {
        method: s
    } = {}) {
        this._observers.add(t, e, s)
    }
    deleteObserver(t) {
        this._observers.delete(t)
    }
    setSirenEntity() {}
    updateProperty(t) {
        this._observers.setProperty(t)
    }
}
const m = new class {
        constructor() {
            this._seen = new Map, this._inProgress = new Set
        }
        finishTask(t) {
            this.isBeingTracked(t) && (this._seen.set(t, !0), this._inProgress.delete(t), 0 === this._inProgress.size && this._seen.clear())
        }
        isBeingTracked(t) {
            return this._seen.has(t)
        }
        isComplete(t) {
            return this._seen.has(t) && !this._inProgress.has(t)
        }
        startTask(t) {
            return !this.isBeingTracked(t) && (this._seen.set(t, !1), this._inProgress.add(t), !0)
        }
    },
    g = {
        has: !1,
        commit: () => {}
    };
class v extends(h(S)) {
    static definedProperty({
        name: t,
        token: e
    }) {
        return {
            id: t,
            token: e
        }
    }
    constructor({
        id: t,
        token: e,
        state: s
    }) {
        super(null, e), this.action = g, this._name = t, this._readyToSend = !1, this._state = s
    }
    get action() {
        return this._observers.value || g
    }
    set action({
        has: t,
        commit: e
    }) {
        t && "function" == typeof e || (t = !1, e = () => {}), this.action.has === t && this.action.commit === e || this._observers.setProperty({
            has: t,
            commit: e
        })
    }
    get headers() {
        return super.headers, -1 !== this._rawSirenAction.type.indexOf("json") && this._headers.set("Content-Type", this._rawSirenAction.type), this._headers
    }
    get method() {
        return this._rawSirenAction && this._rawSirenAction.method
    }
    handleCachePriming(t) {
        return this._state.handleCachePriming(t, this._token)
    }
    async onServerResponse(t, e) {
        if (e) throw e;
        if (!t) return null;
        const s = await this._state.processRawJsonSirenEntity(t);
        return this._state.isSelfless && !s.hasLinkByRel("self") && this._state.setSirenEntity(s), s
    }
    async push() {
        if (this._readyToSend) {
            if (m.isBeingTracked(this)) return;
            m.startTask(this), await p(this), this.reset(), m.finishTask(this)
        }
    }
    reset() {
        this._href = this._rawSirenAction.href, this._body = null, this._readyToSend = !1
    }
    setBodyFromInput(t) {
        if (-1 !== this._rawSirenAction.type.indexOf("json")) this._body = JSON.stringify({ ...this._fields,
            ...t
        });
        else if ("GET" !== this.method && "HEAD" !== this.method) {
            const e = new FormData,
                s = { ...this._fields,
                    ...t
                };
            Object.keys(s).forEach(t => {
                Array.isArray(s[t]) ? s[t].forEach(s => e.append(t, s)) : e.append(t, s[t])
            }), this._body = e
        }
        return this._body
    }
    setQueryParams(t) {
        "GET" !== this.method && "HEAD" !== this.method || super.setQueryParams(t)
    }
    setSirenEntity(t) {
        t && t.hasActionByName(this._name) ? (this._rawSirenAction = t.getActionByName(this._name), this._href = this._rawSirenAction.href, this._fields = this._decodeFields(this._rawSirenAction), this._method = this._rawSirenAction.method, this._updateAction()) : this.action = {
            has: !1
        }
    }
    _decodeFields(t) {
        const e = new URL(t.href, window.location.origin),
            s = {};
        if (e.searchParams.toString() && ("GET" === t.method || "HEAD" === t.method))
            for (const t of e.searchParams.entries()) s[t[0]] = t[1];
        return t.fields && t.fields.forEach && t.fields.forEach(t => {
            void 0 !== t.value && (s[t.name] = t.value)
        }), s
    }
    _prepareAction(t) {
        const e = {};
        t && Object.keys(t).forEach(s => {
            e[s] = void 0 !== t[s] ? .value ? t[s].value : t[s]
        }), this.setQueryParams(e), this.setBodyFromInput(e)
    }
    _setupHrefWithQueryParams(t) {
        return super._setupHrefWithQueryParams({ ...this._fields,
            ...t
        })
    }
    _updateAction() {
        this.action = {
            has: !0,
            commit: (t = {}) => (this._prepareAction(t), this._readyToSend = !0, this._state.updateProperties(t))
        }
    }
}
const k = t => class extends t {
    constructor(t = {}) {
        super(t), this._routes = new Map
    }
    get routedState() {
        return this._routedState
    }
    set routedState(t) {
        this._routedState = t
    }
    addObserver(t, e, {
        route: s,
        method: r,
        ...i
    } = {}) {
        s && 0 !== s[e] ? .length ? this._addRoute(t, s) : super.addObserver(t, e, {
            method: r,
            ...i
        })
    }
    createRoutedState(t, e) {
        return this._state.createRoutedState(t, e)
    }
    deleteObserver(t) {
        this._routes.has(t) ? this._deleteRoute(t) : super.deleteObserver(t)
    }
    _addRoute(t, e) {
        const s = this._routes.has(t) ? this._routes.get(t) : {};
        this._routes.set(t, { ...s,
            ...e
        }), this._routedState && this._routedState.addObservables(t, e)
    }
    _deleteRoute(t) {
        this.routedState && this.routedState.dispose(t), this._routes.delete(t)
    }
};
class E extends(k(S)) {
    constructor({
        id: t,
        token: e,
        state: s
    } = {}) {
        super({}), this._state = s, this._rel = t, this._token = e
    }
    get href() {
        return this._observers.value
    }
    set href(t) {
        this.href !== t && this._observers.setProperty(t)
    }
    get rel() {
        return this._rel
    }
    async setSirenEntity(t, e) {
        const s = t && t.hasLinkByRel(this.rel) && t.getLinkByRel(this.rel);
        if (s && (this.href = s.href, e && e instanceof Map && s.rel.forEach(t => {
                e.has(t) && this !== e.get(t) && this._merge(e.get(t)), e.set(t, this)
            }), this._token)) {
            this.routedState = await this.createRoutedState(s.href, i(this._token.rawToken, s)), this._routes.forEach((t, e) => {
                this.routedState.addObservables(e, t)
            });
            const t = !this.routedState.fetchStatus.pending && this.routedState._bypassCache;
            await p(this.routedState, t)
        }
    }
    _merge(t) {
        t && t instanceof E && (this._observers.merge(t._observers), this._token = this._token || t._token)
    }
}
class F {
    constructor(t, e = !1) {
        t && (this.href = b(t) || void 0, this.rel = t.rel || [], this.class = t.class || [], this.links = t.links || [], this.actions = t.actions ? t.actions.map(t => t.name) : [], this.entities = t.entities ? t.entities.map(t => new F(t, e)) : [], this.properties = t.properties || {}, e && (this.rawSirenParsedEntity = t))
    }
    update(t, e = !1) {
        t && (this.href = b(t) || void 0, this.rel = t.rel || [], this.class = t.class || [], this.links = t.links || [], this.actions = t.actions ? t.actions.map(t => t.name) : [], this.entities = t.entities ? t.entities.map(t => new F(t, e)) : [], this.properties = t.properties || {}, e && (this.rawSirenParsedEntity = t))
    }
    hasClass(t) {
        return !(!this.class.length || !this.class.includes(t))
    }
}
class P extends(k(S)) {
    static definedProperty({
        verbose: t
    }) {
        return {
            verbose: t
        }
    }
    constructor({
        id: t,
        token: e,
        state: s,
        verbose: r
    } = {}) {
        super({}), this._state = s, this._rel = t, this._token = e, this._verbose = r
    }
    get entity() {
        return this._observers.value
    }
    set entity(t) {
        const e = new F(t, this._verbose);
        this.entity !== e && this._observers.setProperty(e)
    }
    get rel() {
        return this._rel
    }
    async setSirenEntity(t, e) {
        const s = t && t.hasSubEntityByRel(this._rel) && t.getSubEntityByRel(this._rel);
        s && (e && e instanceof Map && s.rel.forEach(t => {
            e.has(t) && this._merge(e.get(t)), e.set(t, this)
        }), await this.setSubEntity(s))
    }
    async setSubEntity(t) {
        const e = b(t);
        this.entity = t, this._token && (this._routedState = await this.createRoutedState(e, i(this._token.rawToken, t)), this._routedState.setSirenEntity(t), this._routes.forEach((t, e) => {
            this._routedState.addObservables(e, t)
        }), t.href ? await p(this._routedState) : await f(this._routedState))
    }
    _merge(t) {
        t && t instanceof P && (this._observers.merge(t._observers), this._token = this._token || t._token)
    }
}
class C extends S {
    static definedProperty({
        token: t,
        verbose: e
    }) {
        return {
            token: t,
            verbose: e
        }
    }
    constructor({
        id: t,
        token: e,
        state: s,
        verbose: r
    }) {
        super(), this._state = s, this._rel = t, this._entityMap = new Map, this._token = e, this._verbose = r
    }
    get entities() {
        return this._observers.value || []
    }
    set entities(t) {
        this.entities !== t && this._observers.setProperty(t || [])
    }
    get entityMap() {
        return this._entityMap
    }
    get rel() {
        return this._rel
    }
    get routedState() {
        const t = [];
        return this.entityMap.forEach(e => e.routedState && t.push(e.routedState)), t
    }
    async setSirenEntity(t) {
        const e = t && t.getSubEntitiesByRel(this._rel) || [],
            s = new Map,
            r = [],
            i = e.map(async t => {
                const e = b(t);
                let i;
                r.push(new F(t, this._verbose)), e && this.entityMap.has(e) ? i = this.entityMap.get(e) : (i = new P({
                    id: this.rel,
                    token: this._token,
                    verbose: this._verbose,
                    state: this._state
                }), await i.setSubEntity(t)), e && s.set(e, i)
            });
        await Promise.all(i), this.entityMap.clear(), this._entityMap = s, Promise.all(r.map(async t => {
            if (!t.href || !s.has(t.href)) return;
            const e = s.get(t.href).routedState;
            s.get(t.href).href ? await p(e) : await f(e), t.update(e._entity, this._verbose)
        })).then(() => this.entities = r)
    }
}
const A = {
    has: !1,
    summon: () => {}
};
class R extends(k(v)) {
    static definedProperty({
        name: t,
        token: e,
        verbose: s
    }) {
        return {
            id: t,
            token: e,
            verbose: s
        }
    }
    constructor({
        id: t,
        token: e,
        state: s,
        verbose: r,
        prime: i
    }) {
        super({
            id: t,
            token: e,
            state: s
        }), this._prime = i, this.action = A, this._verbose = r, this._bypassCache = !1, this._updateState = !1
    }
    get action() {
        return this._observers.value || A
    }
    set action({
        has: t,
        summon: e
    }) {
        t && "function" == typeof e || (t = !1, e = () => {}), this.action.has === t && this.action.summon === e || this._observers.setProperty({
            has: t,
            summon: e
        })
    }
    async onServerResponse(t, e) {
        const s = await super.onServerResponse(t, e),
            r = b(s);
        return this.routedState = this.routedState || await this.createRoutedState(r, this._token.rawToken), this._routes.forEach((t, e) => {
            this.routedState.addObservables(e, t)
        }), await this.routedState.setSirenEntity(s, {
            bypassCache: this._bypassCache
        }), this._updateState && await this._state.setSirenEntity(s, {
            bypassCache: this._bypassCache
        }), s
    }
    push() {}
    async setSirenEntity(t) {
        t && t.hasActionByName(this._name) ? (this._rawSirenAction = t.getActionByName(this._name), this._href = this._rawSirenAction.href, this._fields = this._decodeFields(this._rawSirenAction), this._method = this._rawSirenAction.method, this._routes.size > 0 && p(this), this._updateAction()) : this.action = {
            has: !1
        }
    }
    _updateAction() {
        this.action = {
            has: !0,
            summon: async (t, {
                bypassCache: e,
                updateState: s,
                clearFields: r,
                testing: i
            } = {}) => (r && (this._fields = []), this._prepareAction(t), this._readyToSend = !0, this._bypassCache = !!e, this._updateState = !!s, await p(this), i ? this : new F(this.routedState._entity, this._verbose))
        }
    }
}
const O = Object.freeze({
        property: 1,
        link: 2,
        classes: 3,
        subEntities: 4,
        entity: 5,
        subEntity: 6,
        action: 7,
        summonAction: 8,
        custom: 9,
        refreshState: 10
    }),
    L = Object.freeze({
        [O.classes]: class extends S {
            get classes() {
                return this._observers.value
            }
            set classes(t) {
                this.classes !== t && this._observers.setProperty(t)
            }
            setSirenEntity(t) {
                this.classes = t && t.class
            }
        },
        [O.entity]: class extends S {
            get sirenEntity() {
                return this._observers.value
            }
            set sirenEntity(t) {
                this.sirenEntity !== t && this._observers.setProperty(t)
            }
            setSirenEntity(t) {
                this.sirenEntity = t
            }
        },
        [O.link]: E,
        [O.property]: class extends S {
            static definedProperty({
                id: t,
                name: e,
                observable: s
            }) {
                return {
                    id: t = t || e.replace(/^_+/, ""),
                    type: s
                }
            }
            constructor({
                id: t
            }) {
                super(), this._property = t
            }
            get value() {
                return this._observers.value
            }
            set value(t) {
                this.value !== t && this._observers.setProperty(t)
            }
            get property() {
                return this._property
            }
            setSirenEntity(t) {
                this.value = t && t.properties && t.properties[this.property]
            }
        },
        [O.subEntity]: P,
        [O.subEntities]: C,
        [O.action]: v,
        [O.summonAction]: R,
        [O.refreshState]: class extends S {
            static definedProperty({
                state: t
            }) {
                return {
                    id: "refreshState",
                    state: t
                }
            }
            constructor({
                state: t
            }) {
                super(), this._observers.setProperty(() => p(t, !0))
            }
        }
    });

function T({
    observable: t,
    observableObject: e,
    prime: s,
    rel: r,
    route: i,
    token: n,
    state: a,
    method: o
}) {
    return {
        id: r,
        route: i,
        token: s || i && 0 !== i.length ? n : void 0,
        type: t,
        typeObject: e,
        state: a,
        method: o
    }
}

function M(t, e) {
    return t === O.custom ? e : t && L[t]
}

function x(t, e) {
    const s = M((t = function(t) {
        if (!t.route || 0 === t.route.length) return t;
        const e = t.route.shift();
        return { ...t,
            ...e,
            route: t
        }
    }(t)).observable, t.observableObject);
    if (!s) return;
    const r = s.definedProperty ? s.definedProperty(t) : {};
    return { ...T(t),
        ...r,
        state: e
    }
}
const j = O;
window.D2L = window.D2L || {}, window.D2L.Foundation = window.D2L.Foundation || {}, window.D2L.Foundation.StateStore = window.D2L.Foundation.StateStore || new class {
    constructor() {
        this._states = new Map
    }
    add(t) {
        if (!t || !t.entityID || !t.token ? .toString()) return;
        const e = t.entityID.toLowerCase(),
            s = t.token.toString();
        this._initTokenMap(s).set(e, t)
    }
    clear() {
        this._states.forEach(t => t.clear()), this._states.clear()
    }
    get(t, e) {
        if (!t || !e ? .toString()) return !1;
        const s = t.toLowerCase(),
            r = e.toString();
        return this.has(t, e) && this._states.get(r).get(s)
    }
    has(t, e) {
        if (!t || !e ? .toString()) return !1;
        const s = t.toLowerCase(),
            r = e.toString();
        return this._states.has(r) && this._states.get(r).has(s)
    }
    _initTokenMap(t) {
        return this._states.has(t) || this._states.set(t, new Map), this._states.get(t)
    }
};
const B = window.D2L.Foundation.StateStore;
class H extends(h(Object)) {
    constructor(t, e) {
        super(t, e), this._entity = null, this._decodedEntity = new Map, this._parents = new Map, this._waitForFirstFetch = t && this.fetchStatus.waitForNextFetch, this._observers = [], this._childHrefs = []
    }
    get childHrefs() {
        return this._childHrefs
    }
    get entityID() {
        return this.href
    }
    get isSelfless() {
        return !this.href
    }
    addObservables(t, e) {
        this._observers.push(t), Object.keys(e).forEach(s => {
            e[s] && e[s].bypassCache && (this._bypassCache = !0);
            const r = x({
                name: s,
                token: this.token,
                ...e[s]
            }, this);
            if (!r) return;
            const i = this._getSirenObservable(r),
                n = { ...r,
                    route: r.route ? {
                        [s]: r.route
                    } : void 0
                };
            i.addObserver(t, s, n)
        })
    }
    addParent(t) {
        this._parents.set(t, !0)
    }
    async allFetchesComplete(t) {
        await this._waitForFirstFetch, await this.fetchStatus.complete, t = Array.isArray(t) ? t : [t];
        const e = [this, ...t],
            s = [];
        this._parents.forEach((r, i) => {
            t.includes(i) || s.push(i.allFetchesComplete(e))
        }), await Promise.all(s), await Promise.all(this._routedStates().filter(e => !t.includes(e)).map(t => t.allFetchesComplete(e)))
    }
    bypassCache() {
        this._entity = null
    }
    createRoutedState(t, e) {
        return t && this._childHrefs.push(t), D(t, e = void 0 === e ? this.token.rawToken : e).then(t => (t.addParent(this), t))
    }
    dispose(t) {
        this._decodedEntity.forEach(e => {
            e.forEach(e => {
                e.deleteObserver(t)
            })
        }), this._observers = this._observers.filter(e => t !== e)
    }
    handleCachePriming(t, e = null) {
        return e = null !== e ? e : this.token, Promise.all(t.map(async t => p(await D(t, e.rawToken), !0)))
    }
    hasServerResponseCached() {
        return null !== this._entity
    }
    async onServerResponse(e, s) {
        if (s) throw s;
        const r = await t(e);
        await this.setSirenEntity(r)
    }
    processRawJsonSirenEntity(e, s) {
        return async function(e, s) {
            const r = await t(e),
                i = r.hasLinkByRel && r.hasLinkByRel("self") && r.getLinkByRel && r.getLinkByRel("self").href;
            if (i) {
                (await D(i, s)).setSirenEntity(r)
            }
            return r
        }(e, s = void 0 === s ? this.token.rawToken : s)
    }
    async push() {
        if (m.isBeingTracked(this)) return;
        m.startTask(this);
        for await (const t of this._routedStates()) await t.push();
        const t = [];
        this._getMap(this._decodedEntity, j.action).forEach(e => t.push(e));
        for await (const e of t) await e.push();
        m.finishTask(this)
    }
    reset() {
        this._routedStates().forEach(t => t ? .reset()), this.setSirenEntity();
        this._getMap(this._decodedEntity, j.action).forEach(t => t.reset())
    }
    async setSirenEntity(t = null, {
        bypassCache: e
    } = {}) {
        if (e = !!e, t && t.href || !e && this.hasServerResponseCached()) return;
        this._entity = null !== t ? t : this._entity;
        const s = [];
        this._decodedEntity.forEach(t => {
            t.forEach(e => {
                s.push(e.setSirenEntity(this._entity, t))
            })
        }), await Promise.all(s)
    }
    updateProperties(t) {
        Object.keys(t).forEach(e => {
            const s = {
                name: e,
                token: this.token,
                state: this,
                ...t[e]
            };
            let r = x(s, this);
            if (!r) return;
            let i = this;
            for (; r.route && 0 !== r.route.length;) {
                const t = i._getSirenObservable(r);
                if (i = t && t.routedState, !i) return;
                r = x(r.route, i)
            }
            const n = i._getSirenObservable(r);
            n && n.updateProperty(s.value)
        })
    }
    async waitAfterFetch() {
        for await (const t of this._observers) t.updateComplete && await t.updateComplete
    }
    _getMap(t, e) {
        return t.has(e) || t.set(e, new Map), t.get(e)
    }
    _getSirenObservable(t) {
        const e = this._getMap(this._decodedEntity, t.type);
        if (e.has(t.id)) return e.get(t.id);
        const s = function(t) {
            const e = M(t.type, t.typeObject);
            if (!e) throw new Error("Bad siren component");
            return new e(t)
        }(t);
        return e.set(t.id, s), this._entity && s.setSirenEntity(this._entity, e), s
    }
    _routedStates() {
        const t = [];
        return this._decodedEntity.forEach(e => {
            e.forEach(e => {
                e.routedState && (e = Array.isArray(e.routedState) ? e.routedState : [e.routedState]).forEach(e => e && t.push(e))
            })
        }), t
    }
}
async function D(t, e) {
    const s = await r(e);
    if (B.has(t, s)) {
        return B.get(t, s)
    }
    const i = new H(t, s);
    return t && B.add(i), i
}

function N(t, e) {
    t && t.dispose(e)
}
const G = j,
    W = t => class extends t {
        static get properties() {
            return {
                href: {
                    type: String,
                    reflect: !0
                },
                token: {
                    type: String
                },
                _loaded: {
                    type: Boolean
                }
            }
        }
        constructor() {
            super(), this._loaded = !1, this.__observables = this.constructor.properties, this.__waitForAttributes = {}
        }
        connectedCallback() {
            super.connectedCallback(), this._state && this._loaded || !this.__shouldUpdateState() || this._makeState()
        }
        disconnectedCallback() {
            this._loaded = !1, N(this._state, this), super.disconnectedCallback()
        }
        updated(t) {
            this.__shouldUpdateState(t) && (N(this._state, this), this._makeState()), super.updated(t)
        }
        onServerError(t) {
            console.error(t)
        }
        requiredPropertyForState(t, e = []) {
            this.__waitForAttributes[t] || (this.__waitForAttributes[t] = []), this.__waitForAttributes[t] = [...this.__waitForAttributes[t], ...e]
        }
        get _observables() {
            return y(this.__observables)
        }
        __shouldUpdateState(t = null) {
            const e = { ...this.__waitForAttributes,
                href: ["undefined"],
                token: []
            };
            if (null !== t) {
                if (!Object.keys(e).some(e => t.has(e))) return !1
            }
            return !Object.keys(e).some(t => {
                const s = e[t].some(e => this[t] === e);
                return !this[t] && 0 !== this[t] && !1 !== this[t] || s
            })
        }
        _hasAction(t) {
            return this[t] && this[t].has
        }
        async _makeState() {
            if (!this.__gettingState) try {
                this.__gettingState = !0, this._state = await D(this.href, this.token), this._state.addObservables(this, this._observables), (this._state.hasServerResponseCached() ? f(this._state) : p(this._state)).then(async () => {
                    await this.updateComplete, await d(this._state), this._loaded = !0
                }).catch(t => {
                    throw t instanceof a && this.onServerError(t), t
                })
            } catch (t) {
                console.error(t)
            } finally {
                this.__gettingState = !1
            }
        }
    };
export {
    W as H, C as S, j as a, R as b, l as c, y as d, p as f, G as o, D as s
};