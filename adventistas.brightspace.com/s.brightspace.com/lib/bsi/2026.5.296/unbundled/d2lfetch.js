class e {
    constructor() {
        this._installedMiddlewares = []
    }
    addTemp(n, {
        prepend: t = !1
    } = {
        prepend: !1
    }) {
        const {
            name: i,
            fn: r,
            options: s
        } = this._verifyMiddleware(n), d = new e;
        d._installedMiddlewares = this._installedMiddlewares.slice();
        const a = {
            name: i,
            fn: d._wrapMiddleware(r, s)
        };
        return t ? d._installedMiddlewares.unshift(a) : d._installedMiddlewares.push(a), d
    }
    fetch(e, n) {
        if ("string" == typeof e && (e = new Request(e, n)), !1 == e instanceof Request) return Promise.reject(new TypeError("Invalid input argument(s) supplied."));
        const t = this._installedMiddlewares.slice();
        return t.push({
            name: "fetch",
            fn: this._wrapMiddleware(window.fetch)
        }), t.shift().fn.bind(this, t)(e)
    }
    removeTemp(n) {
        if (!n || "string" != typeof n) throw TypeError("Middleware name must be a non-empty string");
        const t = new e;
        return t._installedMiddlewares = this._installedMiddlewares.filter(e => e.name !== n), t
    }
    use(e) {
        const {
            name: n,
            fn: t,
            options: i
        } = this._verifyMiddleware(e);
        this._installedMiddlewares.push({
            name: n,
            fn: this._wrapMiddleware(t, i)
        })
    }
    _verifyMiddleware(e) {
        if (e && "object" == typeof e) {
            const {
                name: n,
                fn: t
            } = e;
            if (n && "string" == typeof n && t && "function" == typeof t) return e;
            throw TypeError("Middleware name/function is undefined or not a string/function")
        }
        throw TypeError("Middleware parameter is undefined/null/empty or not an object")
    }
    _wrapMiddleware(e, n) {
        return (t, i) => {
            let r;
            return t && 0 !== t.length && (r = t.shift().fn.bind(this, t)), e(i, r, n)
        }
    }
}
export {
    e as D
};