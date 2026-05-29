class e {
    constructor(e, t) {
        this._noCache = t, this._delegate = e
    }
    getValue() {
        return (this._noCache || void 0 === this._value) && (this._value = this._delegate()), this._value
    }
}

function t(t, s, n) {
    t._providerInstances || (t._providerInstances = new Map, t.addEventListener("d2l-request-instance", s => {
        if (t._providerInstances.has(s.detail.key)) {
            const n = t._providerInstances.get(s.detail.key);
            s.detail.instance = n instanceof e ? n.getValue() : n, s.stopPropagation()
        }
    })), t._providerInstances.set(s, n)
}
const s = e => class extends e {
    provideInstance(e, s) {
        t(this, e, s)
    }
};

function n(e, t) {
    const s = new CustomEvent("d2l-request-instance", {
        detail: {
            key: t
        },
        bubbles: !0,
        composed: !0,
        cancelable: !0
    });
    return e.dispatchEvent(s), s.detail.instance
}
const a = e => class extends e {
    requestInstance(e) {
        return n(this, e)
    }
};
export {
    e as P, a as R, s as a, t as p, n as r
};