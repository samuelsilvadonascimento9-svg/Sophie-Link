import {
    b as e,
    a as t
} from "./lit-element.js";
import {
    T as s
} from "./tab-panel-mixin.js";
class l extends(s(t)) {
    render() {
        return e `<slot></slot>`
    }
}
customElements.define("d2l-tab-panel", l);