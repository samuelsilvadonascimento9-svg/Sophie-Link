import {
    h as s
} from "./dom.js";
class t {
    constructor(s, t, e = {}) {
        if (!s || !t) throw new TypeError("SubscriberController: missing host or subscription name");
        s.addController(this), this._host = s, this._name = t, this._options = e, this._eventName = `d2l-subscribe-${this._name}`
    }
}
class e extends t {
    constructor() {
        super(...arguments), this._subscriptionComplete = Promise.resolve(), this._timeouts = new Set
    }
    hostDisconnected() {
        this._timeouts.forEach(s => clearTimeout(s))
    }
    _keepTrying(s, t, e, i, r = 0) {
        const o = s();
        return o || (r >= e ? (this._options.onError && this._options.onError(i), o) : new Promise(o => {
            const h = setTimeout(async () => {
                this._timeouts.delete(h), o(await this._keepTrying(s, t, e, i, r + t))
            }, t);
            this._timeouts.add(h)
        }))
    }
    _subscribe(s = this._host, t) {
        const e = s === this._host ? {
                bubbles: !0,
                composed: !0
            } : {},
            i = new CustomEvent(this._eventName, { ...e,
                detail: {
                    subscriber: this._host
                }
            });
        s.dispatchEvent(i);
        const {
            registry: r,
            registryController: o
        } = i.detail;
        return !!r && (t ? (this._registries.set(t, r), this._registryControllers.set(t, o)) : (this._registry = r, this._registryController = o), this._options.onSubscribe && this._options.onSubscribe(r), !0)
    }
}
class i extends t {
    constructor(s, t, e) {
        super(s, t, e), this._subscribers = new Map, this._handleSubscribe = this._handleSubscribe.bind(this)
    }
    get subscribers() {
        return this._subscribers
    }
    hostConnected() {
        this._eventName && this._host.addEventListener(this._eventName, this._handleSubscribe)
    }
    hostDisconnected() {
        this._eventName && this._host.removeEventListener(this._eventName, this._handleSubscribe)
    }
    subscribe(s) {
        this._subscribers.has(s) || (this._subscribers.set(s, s), this._options.onSubscribe && this._options.onSubscribe(s))
    }
    unsubscribe(s) {
        this._subscribers.delete(s), this._options.onUnsubscribe && this._options.onUnsubscribe(s)
    }
    updateSubscribers() {
        this._subscribers && 0 !== this._subscribers.size && this._options.updateSubscribers && (this._updateSubscribersRequested || (this._updateSubscribersRequested = !0, setTimeout(() => {
            this._options.updateSubscribers(this._subscribers), this._updateSubscribersRequested = !1
        }, 0)))
    }
    _handleSubscribe(s) {
        if (s.detail.subscriber === this._host) return;
        s.stopPropagation(), s.detail.registry = this._host, s.detail.registryController = this;
        const t = s.detail.subscriber;
        this.subscribe(t)
    }
}
class r extends e {
    constructor(s, t, e) {
        super(s, t, e), this._registry = null, this._registryController = null
    }
    get registry() {
        return this._registry
    }
    hostConnected() {
        requestAnimationFrame(() => {
            this._subscriptionComplete = this._keepTrying(() => this._subscribe(), 40, 400)
        })
    }
    hostDisconnected() {
        super.hostDisconnected(), this._registryController && this._registryController.unsubscribe(this._host)
    }
}
class o extends e {
    constructor(s, t, e) {
        super(s, t, e), this._idPropertyName = e && e.idPropertyName, this._idPropertyValue = this._idPropertyName ? this._host[this._idPropertyName] : void 0, this._registries = new Map, this._registryControllers = new Map
    }
    get registries() {
        return Array.from(this._registries.values())
    }
    hostDisconnected() {
        super.hostDisconnected(), this._registryObserver && this._registryObserver.disconnect(), this._registryControllers.forEach(s => {
            s.unsubscribe(this._host)
        })
    }
    hostUpdated() {
        const s = this._host[this._idPropertyName];
        s !== this._idPropertyValue && (this._idPropertyValue = s, this._registryObserver && this._registryObserver.disconnect(), this._registryControllers.forEach((s, t) => {
            s.unsubscribe(this._host), this._options.onUnsubscribe && this._options.onUnsubscribe(t)
        }), this._registries = new Map, this._registryControllers = new Map, this._updateRegistries(), this._registryObserver = new MutationObserver(() => {
            this._updateRegistries()
        }), this._registryObserver.observe(this._host.getRootNode(), {
            childList: !0,
            subtree: !0
        }))
    }
    _updateRegistries() {
        let s = this._host[this._idPropertyName];
        s && (s = s.trim().split(" "), s.forEach(s => {
            this._keepTrying(() => this._updateRegistry(s), 100, 3e3, s)
        }))
    }
    _updateRegistry(t) {
        const e = this._host.getRootNode().querySelector(`#${s(t)}`) || void 0;
        if (this._registries.get(t) === e) return e;
        if (e) {
            !this._subscribe(e, t) && this._options.onError && this._options.onError(t)
        } else this._registries.delete(t), this._registryControllers.delete(t), this._options.onUnsubscribe && this._options.onUnsubscribe(t);
        return e
    }
}
export {
    r as E, o as I, i as S
};