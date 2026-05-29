const e = "_ifrau-error-object";

function s(t) {
    return null !== t && "object" == typeof t ? Array.isArray(t) ? function(e) {
        return e.map(s)
    }(t) : function(t) {
        const n = t instanceof Error,
            r = n ? {
                props: {}
            } : {};
        n && (r.message = t.message, r.name = t.name, r[e] = !0);
        const i = n ? r.props : r;
        return Object.keys(t).forEach(e => {
            const n = s(t[e]);
            i[e] = n
        }), r
    }(t) : "function" == typeof t ? null : t
}

function t(s) {
    return null !== s && "object" == typeof s ? Array.isArray(s) ? function(e) {
        return e.map(t)
    }(s) : function(s) {
        const n = !0 === s[e],
            r = n ? new Error(s.message) : {};
        n && (r.name = s.name);
        const i = n ? s.props : s;
        return Object.keys(i).forEach(e => {
            const s = t(i[e]);
            r[e] = s
        }), r
    }(s) : s
}
let n = 0;

function r(e) {
    return !e || 0 === e.length
}
class i {
    constructor(e, s, t) {
        t = t || {}, this._connectQueue = [], this._pluginStartupValues = [], this._debugEnabled = t.debug || !1, this._endPoint = e, this._eventHandlers = {}, this._isConnected = !1, this._isOpen = !1, this._messageHandlers = {}, this._onCloseCallbacks = [], this._targetOrigin = s, this._id = (n++, `d2l-iframe-uid-${n}`), this._onMessage("evt", (e, s) => {
            this._receiveEvent(e, s)
        })
    }
    close() {
        if (!this._isOpen) throw new Error("Port cannot be closed, call open() first");
        this._isOpen = !1, this._isConnected = !1, window.removeEventListener("message", this._receiveMessage.bind(this), !1), this._onCloseCallbacks.forEach(e => e()), this.debug("closed")
    }
    async connect() {
        return this._isConnected = !0, this.debug("connected"), this._connectQueue.forEach(e => e()), this._connectQueue = [], await Promise.all(this._pluginStartupValues), this._pluginStartupValues = null, this
    }
    debug(e) {
        this._debugEnabled && console.log(e)
    }
    onClose(e) {
        this._onCloseCallbacks.push(e)
    }
    onEvent(e, s) {
        return this.debug(`onEvent handler added for "${e}"`), this._isConnected && this.debug("You've attached event handlers after connecting, you may have missed some events"), this._initHashArrAndPush(this._eventHandlers, e, s), this
    }
    open() {
        if (this._isOpen) throw new Error("Port is already open.");
        return this._isOpen = !0, window.addEventListener("message", this._receiveMessage.bind(this), !1), this.debug("opened"), this
    }
    sendEvent(e) {
        const s = [];
        for (let e = 1; e < arguments.length; e++) s.push(arguments[e]);
        return this._isConnected ? this._sendMessage("evt", e, s) : (this._connectQueue.push(() => {
            this._sendMessage("evt", e, s)
        }), this)
    }
    use(e) {
        return this._pluginStartupValues.push(e(this)), this
    }
    _initHashArrAndPush(e, s, t) {
        void 0 === e[s] && (e[s] = []), e[s].push(t)
    }
    _onMessage(e, s) {
        if (3 !== e.length) throw new Error("message class name must be 3 characters");
        this._messageHandlers[e] = s
    }
    _receiveEvent(e, s) {
        void 0 !== this._eventHandlers[e] && this._eventHandlers[e].forEach(e => {
            e.apply(e, s)
        })
    }
    _receiveMessage(e) {
        if (! function(e, s, t) {
                return t.source === s && ("*" === e || !r(e) && !r(t.origin) && e.toUpperCase() === t.origin.toUpperCase()) && void 0 !== t.data.key && null !== t.data.key && 0 === t.data.key.indexOf("frau.")
            }(this._targetOrigin, this._endPoint, e)) return;
        const s = e.data.key.substr(5, 3),
            t = e.data.key.substr(9);
        this.debug(`received ${s}.${t}`);
        const n = this._messageHandlers[s];
        n && n.call(this, t, e.data.payload)
    }
    _sendMessage(e, s, t) {
        const n = {
            key: `frau.${e}.${s}`,
            payload: t
        };
        return this.debug(`sending key: ${n.key}`), this._endPoint.postMessage(n, this._targetOrigin), this
    }
}
class o extends Error {
    constructor(e) {
        super(), this.name = "RequestTypeError", this.message = e ? `No onRequest handler for type "${e}` : "No handler defined for request"
    }
}
class a extends i {
    constructor(e, s, t) {
        super(e, s, t), this._pendingRequests = {}, this._requestHandlers = {}, this._requestCounter = 0, this._waitingRequests = [], this._onMessage("req", (e, s) => {
            this._receiveRequest(e, s)
        }), this._onMessage("res", (e, s) => {
            this._receiveRequestResponse(e, s)
        })
    }
    onRequest(e, s) {
        if (this._isConnected) throw new Error("Add request handlers before connecting");
        if (void 0 !== this._requestHandlers[e]) throw new Error(`Duplicate onRequest handler for type "${e}"`);
        return this.debug(`onRequest handler added for ${e}`), this._requestHandlers[e] = s, this._sendRequestResponse(e), this
    }
    request(e) {
        const s = new Array(arguments.length - 1);
        for (let e = 1; e < arguments.length; ++e) s[e - 1] = arguments[e];
        return new Promise((t, n) => {
            const r = ++this._requestCounter,
                i = `${this._id}_${r}`;
            this._initHashArrAndPush(this._pendingRequests, e, {
                id: i,
                resolve: t,
                reject: n
            });
            const o = () => {
                this._sendMessage("req", e, {
                    id: i,
                    args: s
                })
            };
            this._isConnected ? o() : this._connectQueue.push(o)
        })
    }
    _receiveRequest(e, s) {
        this._initHashArrAndPush(this._waitingRequests, e, s), this._sendRequestResponse(e)
    }
    _receiveRequestResponse(e, s) {
        const n = this._pendingRequests[e];
        if (void 0 !== n)
            for (let e = 0; e < n.length; ++e) {
                const r = n[e];
                if (r.id === s.id) {
                    if (s.hasOwnProperty("err")) {
                        const e = t(s.err);
                        r.reject(e)
                    } else r.resolve(s.val);
                    return void n.splice(e, 1)
                }
            }
    }
    _sendRequestResponse(e) {
        const t = this._requestHandlers[e],
            n = this._waitingRequests[e];
        if (delete this._waitingRequests[e], void 0 !== n && 0 !== n.length) {
            if (void 0 === t) {
                const t = s(new o(e));
                return void n.forEach(s => {
                    this._sendMessage("res", e, {
                        id: s.id,
                        err: t
                    })
                })
            }
            n.forEach(n => {
                Promise.resolve().then(() => "function" == typeof t ? t.apply(t, n.args) : t).then(s => {
                    this._sendMessage("res", e, {
                        id: n.id,
                        val: s
                    })
                }).catch(t => {
                    const r = s(t);
                    this._sendMessage("res", e, {
                        id: n.id,
                        err: r
                    })
                })
            })
        }
    }
}
const h = /^[a-zA-Z]+[a-zA-Z-]*$/;
class c extends a {
    async getService(e, s) {
        if (!this._isConnected) throw new Error("Cannot getService() before connect() has completed");
        const t = `service:${e}:${s}`,
            n = this;
        return function(e) {
            const s = {};
            return e.forEach(e => {
                s[e] = function(e) {
                    return function() {
                        const s = new Array(arguments.length + 1);
                        s[0] = `${t}:${e}`;
                        for (let e = 0; e < arguments.length; ++e) s[e + 1] = arguments[e];
                        return n.request.apply(n, s)
                    }
                }(e)
            }), s
        }(await this.request(t))
    }
    registerService(e, s, t) {
        if (this._isConnected) throw new Error("Register services before connecting");
        if (!h.test(e)) throw new Error(`Invalid service type ${e}`);
        const n = `service:${e}:${s}`,
            r = Object.keys(t).filter(e => "function" == typeof t[e]);
        return this.onRequest(n, r), r.forEach(e => {
            this.onRequest(`${n}:${e}`, t[e])
        }), this
    }
}
class u extends c {
    constructor(e) {
        super(window.parent, "*", e)
    }
    async connect() {
        return this.open(), this._sendMessage("evt", "ready"), await super.connect(), this
    }
}
export {
    u as SlimClient
};