import "./colors.js";
import {
    a as e,
    i as t,
    b as o
} from "./lit-element.js";
customElements.define("d2l-card-content-meta", class extends e {
    static get styles() {
        return t `
			:host {
				box-sizing: border-box;
				color: var(--d2l-color-tungsten);
				display: inline-block;
				font-size: 0.7rem;
				font-weight: 400;
				line-height: 1rem;
			}
			:host span {
				display: inline-block; /* extra inline-block helps reset display context to opt-out of underline */
			}
		`
    }
    render() {
        return o `<span><slot></slot></span>`
    }
});