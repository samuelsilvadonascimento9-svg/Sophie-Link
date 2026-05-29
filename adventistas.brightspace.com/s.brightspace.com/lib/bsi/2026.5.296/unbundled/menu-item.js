import "./icon.js";
import {
    a as i,
    i as s,
    b as t
} from "./lit-element.js";
import {
    M as e,
    m as o
} from "./menu-item-styles.js";
import "./colors.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./property-required-mixin.js";
import "./dom.js";
import "./dedupeMixin.js";
import "./focus.js";
import "./overflow.js";
class r extends(e(i)) {
    static get styles() {
        return [o, s `
				:host {
					align-items: center;
					display: flex;
					padding: 0.75rem 1rem;
				}
				d2l-icon {
					flex: none;
					margin-inline-start: 6px;
				}
			`]
    }
    render() {
        const i = this.hasChildView ? t `<d2l-icon icon="tier1:chevron-right"></d2l-icon>` : null;
        return t `
			<div class="d2l-menu-item-text">${this.text}</div>
			<div class="d2l-menu-item-supporting"><slot name="supporting"></slot></div>
			${i}
			<slot></slot>
		`
    }
}
customElements.define("d2l-menu-item", r);