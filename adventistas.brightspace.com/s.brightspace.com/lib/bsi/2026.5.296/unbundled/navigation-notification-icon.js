import "./colors.js";
import {
    a as i,
    i as t,
    b as o
} from "./lit-element.js";
import {
    R as r
} from "./rtl-mixin.js";
class n extends(r(i)) {
    static get properties() {
        return {
            thinBorder: {
                attribute: "thin-border",
                reflect: !0,
                type: Boolean
            }
        }
    }
    static get styles() {
        return t `
			:host {
				display: inline-block;
				height: 100%;
				position: absolute;
				right: calc(-100% + 11px);
				top: calc(-50% + 11px);
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}
			:host([dir="rtl"]) {
				left: calc(-50% - 4px);
				right: auto;
			}
			.d2l-labs-navigation-notification-icon-indicator {
				background: var(--d2l-color-primary-accent-indicator);
				border: 2px solid white;
				border-radius: 50%;
				height: 10px;
				width: 10px;
			}
			:host([thin-border]) .d2l-labs-navigation-notification-icon-indicator {
				border-width: 1px;
			}
		`
    }
    constructor() {
        super(), this.thinBorder = !1
    }
    render() {
        return o `<div class="d2l-labs-navigation-notification-icon-indicator"></div>`
    }
}
window.customElements.define("d2l-labs-navigation-notification-icon", n);