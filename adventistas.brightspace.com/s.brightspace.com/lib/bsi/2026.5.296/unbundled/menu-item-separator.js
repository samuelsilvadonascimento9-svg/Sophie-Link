import {
    a as t,
    i as e
} from "./lit-element.js";
customElements.define("d2l-menu-item-separator", class extends t {
    static get styles() {
        return e `
			:host {
				border-top: 1px solid var(--d2l-menu-separator-color);
				display: block;
				margin-top: -1px;
				position: relative;
				z-index: 1;
			}
		`
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.setAttribute("role", "separator")
    }
});