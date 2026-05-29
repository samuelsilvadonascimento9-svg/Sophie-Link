const e = {},
    t = {},
    o = "D2L.Fetch.Tokens";
let r = 0;
const n = new class {
    constructor() {
        window.addEventListener("storage", this._onStorage.bind(this)), window.addEventListener("d2l-logout", this._onLogout.bind(this)), this._enableTokenCache = !1
    }
    wrap(e, t) {
        return !1 == e instanceof Request ? Promise.reject(new TypeError("Invalid request argument supplied; must be a valid window.Request object.")) : (t = t || function(e) {
            return Promise.resolve(e)
        }, e.headers.get("Authorization") ? t(e) : this._isRelativeUrl(e.url) ? "GET" !== (e = new Request(e, {
            credentials: "same-origin"
        })).method && "HEAD" !== e.method ? this._getXsrfToken().then(o => {
            const r = {
                "X-Csrf-Token": o
            };
            return t(this._getRequest(e, r))
        }) : t(this._getRequest(e)) : this._getAuthToken().then(o => {
            const r = {
                Authorization: `Bearer ${o}`
            };
            return e = new Request(e, {
                credentials: "omit"
            }), t(this._getRequest(e, r))
        }))
    }
    _adjustClockSkew(e) {
        try {
            const t = e.headers.get("Date");
            if (!t) return;
            let o = new Date(t).getTime();
            if (o != o) return;
            o = Math.round(o / 1e3);
            const n = this._clock();
            r = o - n
        } catch {}
    }
    _cacheToken(t, r) {
        e[t] = r, this._localStorageSupported() && window.localStorage.setItem(o, JSON.stringify(e))
    }
    _clearAllCachedTokens() {
        this._clearLocalCachedTokens(), this._localStorageSupported() && window.localStorage.removeItem(o)
    }
    _clearCachedToken(t) {
        delete e[t], this._localStorageSupported() && window.localStorage.setItem(o, JSON.stringify(e))
    }
    _clearInFlightRequests() {
        for (const e in t) delete t[e]
    }
    _clearLocalCachedTokens() {
        for (const t in e) delete e[t]
    }
    _clock() {
        return Date.now() / 1e3 | 0
    }
    _getAuthToken() {
        const e = this,
            t = "*:*:*";
        return Promise.resolve().then(() => {
            const o = e._getCachedAuthToken.bind(e, t);
            return o().catch(() => e._getAuthTokenDeDuped(t).then(e._cacheToken.bind(e, t)).then(o))
        })
    }
    _getAuthTokenDeDuped(e) {
        return t[e] || (t[e] = this._requestAuthToken(e).then(o => (delete t[e], o)).catch(o => {
            throw delete t[e], o
        })), t[e]
    }
    _getCachedAuthToken(e) {
        return Promise.resolve().then(() => {
            const t = this._tryGetCachedToken(e);
            if (t) {
                if (!this._tokenExpired(t)) return t.access_token;
                this._clearCachedToken(e)
            }
            throw new Error("No cached token")
        })
    }
    _getCurrentLocation() {
        return location
    }
    _getRequest(e, t) {
        if (t)
            for (const o in t) e.headers.set(o, t[o]);
        return e
    }
    _getXsrfToken() {
        let e;
        try {
            e = window.localStorage.getItem("XSRF.Token")
        } catch {}
        if (e) return Promise.resolve(e);
        const t = new Request("/d2l/lp/auth/xsrf-tokens", {
            credentials: "include"
        });
        return window.fetch(t).then(e => e.json()).then(e => {
            try {
                window.localStorage.setItem("XSRF.Token", e.referrerToken)
            } catch {}
            return e.referrerToken
        })
    }
    _isRelativeUrl(e) {
        const t = document.createElement("a");
        t.href = e;
        let o = t.host;
        o.indexOf(":443") === o.length - 4 ? o = o.substr(0, o.length - 4) : o.indexOf(":80") === o.length - 3 && (o = o.substr(0, o.length - 3));
        const r = this._getCurrentLocation();
        return !t.host || !t.protocol || o === r.host && t.protocol === r.protocol
    }
    _localStorageSupported() {
        if (!this._enableTokenCache) return !1;
        try {
            return window.localStorage.setItem("supported", "1"), window.localStorage.removeItem("supported"), !0
        } catch {
            return !1
        }
    }
    _onLogout() {
        this._resetAuthTokenCaches()
    }
    _onStorage(e) {
        switch (e.key) {
            case "Session.Expired":
            case "Session.UserId":
                this._resetAuthTokenCaches();
                break;
            case o:
                this._clearLocalCachedTokens()
        }
    }
    _requestAuthToken(e) {
        return this._getXsrfToken().then(t => {
            const o = new Request("/d2l/lp/auth/oauth2/token", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Csrf-Token": t
                }),
                body: `scope=${e}`,
                credentials: "include"
            });
            return window.fetch(o).then(e => (this._adjustClockSkew(e), e)).then(e => {
                if (!e.ok) throw Error(e.statusText);
                return e.json()
            }).then(e => e)
        })
    }
    _resetAuthTokenCaches() {
        this._clearAllCachedTokens(), this._clearInFlightRequests()
    }
    _tokenExpired(e) {
        return this._clock() + r > e.expires_at
    }
    _tryGetCachedToken(t) {
        if (e[t] || !this._localStorageSupported()) return e[t];
        const o = this._tryGetTokenFromLocalStorage(t);
        if (null === o) return null;
        const r = this._tryGetUserIdFromToken(o),
            n = window.localStorage.getItem("Session.UserId");
        return null === r || n !== r ? (this._clearCachedToken(t), null) : (e[t] = o, o)
    }
    _tryGetTokenFromLocalStorage(e) {
        try {
            const t = JSON.parse(window.localStorage.getItem(o));
            if (t && t[e]) return t[e]
        } catch {}
        return null
    }
    _tryGetUserIdFromToken(e) {
        const t = e.access_token.split(".");
        if (3 !== t.length) return null;
        try {
            const e = JSON.parse(atob(t[1]));
            return e.sub
        } catch {
            return null
        }
    }
};

function s(e, t, o) {
    return o && (n._enableTokenCache = !0 === o.enableTokenCache, o._resetLocalCache && n._clearLocalCachedTokens()), n.wrap(e, t)
}
export {
    s as a
};