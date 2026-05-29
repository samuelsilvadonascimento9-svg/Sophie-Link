import "./colors.js";
import "./icon.js";
import {
    a as i,
    i as s,
    b as o
} from "./lit-element.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
customElements.define("d2l-labs-navigation-separator", class extends i {
    static get styles() {
        return s `
			:host {
				display: inline-block;
				margin: 0 9px;
			}
			d2l-icon {
				color: var(--d2l-color-mica);
			}
		`
    }
    render() {
        return o `
			<d2l-icon icon="tier2:divider-big"></d2l-icon>
		`
    }
});