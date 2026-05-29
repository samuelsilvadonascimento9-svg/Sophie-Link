import {
    E as e,
    I as t
} from "./subscriberControllers.js";
const a = a => class extends a {
    static get properties() {
        return {
            pageableFor: {
                type: String,
                reflect: !0,
                attribute: "pageable-for"
            },
            _pageableInfo: {
                state: !0
            }
        }
    }
    constructor() {
        super(), this._pageableInfo = null, this._pageableEventSubscriber = new e(this, "pageable"), this._pageableIdSubscriber = new t(this, "pageable", {
            idPropertyName: "pageableFor"
        })
    }
    async getUpdateComplete() {
        await super.getUpdateComplete(), await (this.pageableFor ? this._pageableIdSubscriber._subscriptionComplete : this._pageableEventSubscriber._subscriptionComplete)
    }
    _getPageableRegistries() {
        return this.pageableFor ? this._pageableIdSubscriber.registries : [this._pageableEventSubscriber.registry]
    }
};
export {
    a as P
};