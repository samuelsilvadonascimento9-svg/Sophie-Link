import "./colors.js";
import {
    a as o,
    i as t,
    b as r
} from "./lit-element.js";
import "./svg-to-css.js";
customElements.define("d2l-status-indicator", class extends o {
    static get properties() {
        return {
            state: {
                type: String,
                reflect: !0
            },
            text: {
                type: String
            },
            bold: {
                type: Boolean,
                reflect: !0
            }
        }
    }
    static get styles() {
        return t `
			:host {
				border-color: var(--d2l-color-celestine);
				border-radius: 0.6rem;
				border-style: solid;
				border-width: 1px;
				color: var(--d2l-color-celestine);
				cursor: default;
				display: inline-block;
				font-size: 0.6rem;
				font-weight: bold;
				line-height: 1;
				overflow: hidden;
				padding: 2px 10px 2px 10px;
				text-overflow: ellipsis;
				text-transform: capitalize;
				vertical-align: middle;
				white-space: nowrap;
			}

			:host([hidden]) {
				display: none;
			}
			:host([state="success"]) {
				border-color: var(--d2l-color-olivine-minus-1);
				color: var(--d2l-color-olivine-minus-1);
			}
			:host([state="alert"]) {
				border-color: var(--d2l-color-cinnabar);
				color: var(--d2l-color-cinnabar);
			}
			:host([state="none"]),
			:host([state="null"]) {
				border-color: var(--d2l-color-tungsten);
				color: var(--d2l-color-tungsten);
			}

			:host([bold]) {
				background-color: var(--d2l-color-celestine);
				color: white;
			}
			:host([bold][state="success"]) {
				background-color: var(--d2l-color-olivine-minus-1);
			}
			:host([bold][state="alert"]) {
				background-color: var(--d2l-color-cinnabar);
			}
			:host([bold][state="none"]),
			:host([bold][state="null"]) {
				background-color: var(--d2l-color-tungsten);
			}
		`
    }
    constructor() {
        super(), this.state = "default", this.bold = !1
    }
    render() {
        return r `
			${this.text}
		`
    }
});