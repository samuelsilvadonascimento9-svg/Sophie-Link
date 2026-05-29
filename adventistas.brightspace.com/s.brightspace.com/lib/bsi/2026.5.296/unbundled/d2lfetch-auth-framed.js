const e =
    import ("./slim-m6oxJCJ2.js").then(e => e.SlimClient);
const t = new class {
    wrap(e, t) {
        return !1 == e instanceof Request ? Promise.reject(new TypeError("Invalid request argument supplied; must be a valid window.Request object.")) : (t = t || function(e) {
            return Promise.resolve(e)
        }, e.headers.get("Authorization") ? t(e) : this._getToken("*:*:*").then(n => {
            const r = {
                Authorization: `Bearer ${n}`
            };
            return t(this._getRequest(e, r))
        }))
    }
    _getRequest(e, t) {
        if (t)
            for (const n in t) e.headers.set(n, t[n]);
        return e
    }
    _getToken(t) {
        return async function(t, n) {
            const r = await e,
                s = await (new r).connect();
            return await s.request("frau-jwt-new-jwt", t, n)
        }(t)
    }
};

function n(e, n) {
    return t.wrap(e, n)
}
export {
    n as a
};