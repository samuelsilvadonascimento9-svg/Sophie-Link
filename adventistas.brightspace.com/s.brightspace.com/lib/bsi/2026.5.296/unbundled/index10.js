const t = t => null !== t && isFinite(t) && !isNaN(t),
    e = "data-logging-endpoint",
    i = new Set(["Script error.", "ResizeObserver loop limit exceeded", "ResizeObserver loop completed with undelivered notifications."]);
class o {
    constructor(t) {
        this._log = {
            appId: String(t)
        }
    }
    build() {
        return Object.freeze(this._log)
    }
    withError(e) {
        return e && e instanceof Error ? (this._log.error = {}, e.message && (this._log.error.message = String(e.message)), e.name && (this._log.error.name = String(e.name)), e.description && (this._log.error.description = String(e.description)), t(e.number) && (this._log.error.number = Number(e.number)), e.fileName && (this._log.error.fileName = String(e.fileName)), t(e.lineNumber) && (this._log.error.lineNumber = Number(e.lineNumber)), t(e.columnNumber) && (this._log.error.columnNumber = Number(e.columnNumber)), e.stack && (this._log.error.stack = String(e.stack)), this) : this
    }
    withLegacyError(e, i, o, r) {
        return this._log.legacyError = {}, e && (this._log.legacyError.message = String(e)), i && (this._log.legacyError.source = String(i)), t(o) && (this._log.legacyError.lineno = Number(o)), t(r) && (this._log.legacyError.colno = Number(r)), this
    }
    withLocation() {
        return window.location && window.location.href && (this._log.location = String(window.location.href)), this
    }
    withMessage(t) {
        return t instanceof Object ? this._log.message = JSON.stringify(t) : t && (this._log.message = String(t)), this
    }
}
class r {
    constructor(t, e, i) {
        this._appId = t, this._logger = e, this._logTimestamps = [], this._shouldThrottle = !!i && !!i.shouldThrottle, this._uniqueLogs = new Map
    }
    error(t, e) {
        this.errorBatch([{
            error: t,
            developerMessage: e
        }])
    }
    errorBatch(t) {
        const e = t.map(({
            error: t,
            developerMessage: e
        }) => new o(this._appId).withError(t).withMessage(e).withLocation().build()).filter(this._throttle.bind(this));
        e.length > 0 && this._logger.logBatch(e)
    }
    legacyError(t, e, i, o, r, s) {
        this.legacyErrorBatch([{
            message: t,
            source: e,
            lineno: i,
            colno: o,
            error: r,
            developerMessage: s
        }])
    }
    legacyErrorBatch(t) {
        const e = t.map(({
            message: t,
            source: e,
            lineno: i,
            colno: r,
            error: s,
            developerMessage: n
        }) => new o(this._appId).withLegacyError(t, e, i, r).withError(s).withMessage(n).withLocation().build()).filter(this._filterBenign).filter(this._throttle.bind(this));
        e.length > 0 && this._logger.logBatch(e)
    }
    log(t) {
        this.logBatch([t])
    }
    logBatch(t) {
        const e = t.map(t => new o(this._appId).withMessage(t).withLocation().build()).filter(this._throttle.bind(this));
        e.length > 0 && this._logger.logBatch(e)
    }
    _filterBenign(t) {
        if (t && t.legacyError && t.legacyError.message) {
            return !i.has(t.legacyError.message)
        }
        return !0
    }
    _throttle(t) {
        const e = Date.now();
        for (; this._logTimestamps.length > 0 && this._logTimestamps[0] < e - 6e4;) this._logTimestamps.shift();
        if (this._logTimestamps.length >= 100) return console.warn("Logging rate limit of 100 reached in timespan of 60000ms"), !1;
        if (this._logTimestamps.push(e), !this._shouldThrottle) return !0;
        const i = JSON.stringify(t),
            o = this._uniqueLogs.get(i);
        return (void 0 === o || e - o >= 6e4) && (this._uniqueLogs.set(i, e), !0)
    }
}
const s = new class {
    constructor(t, e) {
        this._batchSize = t, this._batchTime = e, this._logs = [], window.addEventListener("unload", this._onUnload.bind(this))
    }
    logBatch(t) {
        for (clearTimeout(this._batchTimeout), this._loggerPromise = this._loggerPromise || this._provisionLoggerEndpoint(!1), this._logs = [...this._logs, ...t]; this._logs.length >= this._batchSize;) {
            const t = this._logs.slice(0, this._batchSize);
            this._logs = this._logs.slice(this._batchSize, this._logs.length), this._log(t)
        }
        this._logs.length > 0 && (this._batchTimeout = setTimeout(() => {
            this._log(this._logs), this._logs = []
        }, this._batchTime))
    }
    async _log(t) {
        let e = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(t)
        };
        try {
            let t = await this._loggerPromise;
            410 === (await window.fetch(t.Endpoint, e)).status && (this._loggerPromise = this._provisionLoggerEndpoint(!0), t = await this._loggerPromise, e = { ...e,
                mode: "no-cors"
            }, window.fetch(t.Endpoint, e))
        } catch (e) {
            console.error(e, t)
        }
    }
    async _onUnload() {
        if (clearTimeout(this._batchTimeout), (this._loggerPromise || navigator) && navigator.sendBeacon && this._logs.length > 0) try {
            const t = await this._loggerPromise,
                e = JSON.stringify(this._logs);
            navigator.sendBeacon(t.Endpoint, e)
        } catch (t) {
            console.error(t, this._logs)
        }
    }
    async _provisionLoggerEndpoint(t) {
        const i = document.getElementsByTagName("html")[0];
        if (!i) throw new Error(`Failed to locate top-level HTML element for ${e}`);
        const o = i.getAttribute(e);
        if (!o) throw new Error(`Missing ${e} attribute on top-level HTML element`);
        const r = await window.fetch(o, t ? {
                cache: "reload"
            } : {}),
            s = await r.json();
        if ("string" != typeof s ? .Endpoint || 0 === s ? .Endpoint.length) throw new Error("Logging endpoint missing or empty, logging is disabled");
        return s
    }
}(500, 5e3);

function n(t, e) {
    return new r(t, s, e)
}
export {
    n as c
};