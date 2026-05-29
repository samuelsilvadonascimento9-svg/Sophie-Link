import "./colors.js";
import {
    i as e
} from "./lit-element.js";

function t(e) {
    e.querySelectorAll("[fill]").forEach(e => {
        "#494c4e" === e.getAttribute("fill").toLowerCase() && e.removeAttribute("fill")
    }), e.setAttribute("preserveAspectRatio", "xMidYMid meet"), e.setAttribute("focusable", "false"), e.removeAttribute("height"), e.removeAttribute("width")
}
const i = e `
	:host {
		-webkit-align-items: center;
		align-items: center;
		color: var(--d2l-theme-icon-color-standard);
		display: -ms-inline-flexbox;
		display: -webkit-inline-flex;
		display: inline-flex;
		fill: var(--d2l-icon-fill-color, currentcolor);
		-ms-flex-align: center;
		-ms-flex-pack: center;
		height: var(--d2l-icon-height, 18px);
		-webkit-justify-content: center;
		justify-content: center;
		stroke: var(--d2l-icon-stroke-color, none);
		vertical-align: middle;
		width: var(--d2l-icon-width, 18px);
	}
	:host([hidden]) {
		display: none;
	}
	svg, ::slotted(svg) {
		display: block;
		height: 100%;
		pointer-events: none;
		width: 100%;
	}
	svg[mirror-in-rtl],
	::slotted(svg[mirror-in-rtl]) {
		transform: var(--d2l-mirror-transform, ${"rtl"===document.dir?e`scale(-1, 1)`:e`none`}); /* stylelint-disable-line @stylistic/string-quotes, @stylistic/function-whitespace-after */
		transform-origin: center;
	}
`;
export {
    t as f, i
};