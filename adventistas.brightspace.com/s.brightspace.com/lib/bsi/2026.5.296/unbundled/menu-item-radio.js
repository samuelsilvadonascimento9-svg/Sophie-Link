import "./icon.js";
import {
    b as s,
    a as t
} from "./lit-element.js";
import {
    M as i
} from "./menu-item-radio-mixin.js";
import {
    m as e
} from "./menu-item-selectable-styles.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./menu-item-styles.js";
import "./property-required-mixin.js";
import "./dom.js";
import "./dedupeMixin.js";
import "./focus.js";
import "./overflow.js";
class o extends(i(t)) {
    static get styles() {
        return e
    }
    render() {
        return s `
			<d2l-icon icon="tier1:check"></d2l-icon>
			<div class="d2l-menu-item-text">${this.text}</div>
			<div class="d2l-menu-item-supporting"><slot name="supporting"></slot></div>
		`
    }
}
customElements.define("d2l-menu-item-radio", o);
export {
    o as M
};