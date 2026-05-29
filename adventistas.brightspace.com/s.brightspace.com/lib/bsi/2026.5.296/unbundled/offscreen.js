import {
    i as t,
    a as e,
    b as s
} from "./lit-element.js";
const i = t `
		direction: var(--d2l-document-direction, ${"rtl"===document.dir?t`rtl`:t`ltr`}); /* stylelint-disable-line @stylistic/string-quotes */
		height: 1px;
		inset-inline-start: -10000px;
		overflow: hidden;
		position: absolute !important;
		white-space: nowrap;
		width: 1px;
		${"rtl"===document.dir?t`right`:t`left`}: -10000px;
`,
    r = t `
	.d2l-offscreen {
		${i}
	}
`;
customElements.define("d2l-offscreen", class extends e {
    static get styles() {
        return t `
			:host {
				${i}
			}
		`
    }
    render() {
        return s `<slot></slot>`
    }
});
export {
    i as _, r as o
};