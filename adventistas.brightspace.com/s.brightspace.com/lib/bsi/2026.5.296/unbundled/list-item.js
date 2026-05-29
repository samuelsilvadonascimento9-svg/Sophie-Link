import {
    L as e
} from "./list-item-link-mixin.js";
import {
    a as t
} from "./lit-element.js";
class r extends(e(t)) {
    static get properties() {
        return {
            href: {
                type: String
            }
        }
    }
    get href() {
        return this.actionHref
    }
    set href(e) {
        this.actionHref = e
    }
    render() {
        return this._renderListItem()
    }
}
customElements.define("d2l-list-item", r);