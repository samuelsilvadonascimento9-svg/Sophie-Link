import {
    C as e
} from "./collection-mixin.js";
import {
    b as t
} from "./lit-element.js";
import {
    S as i
} from "./subscriberControllers.js";
const s = s => class extends(e(s)) {
    static get properties() {
        return {
            _itemShowingCount: {
                state: !0
            }
        }
    }
    constructor() {
        super(), this._itemShowingCount = 0, this._pageableSubscriberRegistry = new i(this, "pageable", {
            onSubscribe: this._updatePageableSubscriber.bind(this),
            onUnsubscribe: this._clearPageableSubscriber.bind(this),
            updateSubscribers: this._updatePageableSubscribers.bind(this)
        })
    }
    firstUpdated() {
        super.firstUpdated(), this._updateItemShowingCount()
    }
    updated(e) {
        super.updated(e), (e.has("itemCount") || e.has("_itemShowingCount")) && this._pageableSubscriberRegistry.updateSubscribers()
    }
    _clearPageableSubscriber(e) {
        e._pageableInfo = null
    }
    _getItemByIndex(e) {}
    _getItemShowingCount() {}
    _getLastItemIndex() {
        return this._itemShowingCount - 1
    }
    _renderPagerContainer() {
        return t `<slot name="pager"></slot>`
    }
    _updateItemShowingCount() {
        this._itemShowingCount = this._getItemShowingCount()
    }
    _updatePageableSubscriber(e, t = !0) {
        t && this._updateItemShowingCount(), e._pageableInfo = {
            itemShowingCount: this._itemShowingCount,
            itemCount: this.itemCount
        }
    }
    _updatePageableSubscribers(e) {
        e.forEach(e => this._updatePageableSubscriber(e, !1))
    }
};
export {
    s as P
};