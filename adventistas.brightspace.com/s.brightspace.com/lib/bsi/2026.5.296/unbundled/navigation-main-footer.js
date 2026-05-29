import {
    a as s,
    i as t,
    b as a
} from "./lit-element.js";
import {
    n as e
} from "./navigation-shared-styles.js";
customElements.define("d2l-labs-navigation-main-footer", class extends s {
    static get styles() {
        return [e, t `
			:host {
				border-bottom: 1px solid rgba(124, 134, 149, 0.18);
				border-top: 1px solid rgba(124, 134, 149, 0.18);
				display: block;
			}
		`]
    }
    render() {
        return a `
			<div class="d2l-labs-navigation-centerer">
				<div class="d2l-labs-navigation-gutters">
					<slot name="main"></slot>
				</div>
			</div>
		`
    }
});