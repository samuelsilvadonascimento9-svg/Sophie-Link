import {
    h as e
} from "./dom.js";
import {
    S as r
} from "./selection-mixin.js";
const t = t => class extends t {
    static get properties() {
        return {
            selectionFor: {
                type: String,
                reflect: !0,
                attribute: "selection-for"
            },
            selectionInfo: {
                type: Object
            },
            _provider: {
                type: Object,
                attribute: !1
            }
        }
    }
    constructor() {
        super(), this.selectionInfo = new r, this._provider = null
    }
    connectedCallback() {
        super.connectedCallback(), this.addEventListener("d2l-selection-observer-subscribe", this._handleSelectionObserverSubscribe), requestAnimationFrame(() => {
            if (this.selectionFor) return this._handleSelectionFor(), this._provider ? .subscribeObserver(this);
            const e = new CustomEvent("d2l-selection-observer-subscribe", {
                bubbles: !0,
                composed: !0,
                detail: {}
            });
            this.dispatchEvent(e), this._provider = e.detail.provider
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._disconnectSelectionForObserver(), this._disconnectProvider(), this.removeEventListener("d2l-selection-observer-subscribe", this._handleSelectionObserverSubscribe)
    }
    updated(e) {
        super.updated(e), e.has("selectionFor") && this._handleSelectionFor()
    }
    _disconnectProvider() {
        this._provider && (this._provider.unsubscribeObserver(this), this._provider = void 0)
    }
    _disconnectSelectionForObserver() {
        this._selectionForObserver && (this._selectionForObserver.disconnect(), this._selectionForObserver = void 0)
    }
    _handleSelectionFor() {
        this._disconnectSelectionForObserver(), this._updateProvider(), this.selectionFor && (this._selectionForObserver = new MutationObserver(() => this._updateProvider()), this._selectionForObserver.observe(this.getRootNode(), {
            childList: !0,
            subtree: !0
        }))
    }
    _handleSelectionObserverSubscribe(e) {
        if (this._provider) {
            const r = e.composedPath()[0];
            if (r === this) return;
            e.stopPropagation(), e.detail.provider = this._provider, this._provider.subscribeObserver(r)
        }
    }
    _updateProvider() {
        const t = this.selectionFor ? this.getRootNode().querySelector(`#${e(this.selectionFor)}`) : void 0;
        this._provider !== t && (this._disconnectProvider(), this._provider = t, this._provider ? this._provider.subscribeObserver(this) : this.selectionInfo = new r)
    }
};
export {
    t as S
};