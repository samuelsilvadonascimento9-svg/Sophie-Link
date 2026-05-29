import "./colors.js";
import {
    i
} from "./lit-element.js";
const o = i `
	.d2l-labs-navigation-centerer {
		margin: 0 auto;
		max-width: 1230px;
	}
`,
    e = i `
	.d2l-labs-navigation-gutters {
		padding-left: 2.439%;
		padding-right: 2.439%;
		position: relative;
	}
	@media (max-width: 615px) {
		.d2l-labs-navigation-gutters {
			padding-left: 15px;
			padding-right: 15px;
		}
	}
	@media (min-width: 1230px) {
		.d2l-labs-navigation-gutters {
			padding-left: 30px;
			padding-right: 30px;
		}
	}
`,
    t = i `
	.d2l-labs-navigation-highlight-border {
		background: transparent;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		display: block;
		height: 4px;
		left: -7px;
		position: absolute;
		top: 0;
		width: calc(100% + 14px);
	}
	*:focus > .d2l-labs-navigation-highlight-border,
	*:hover > .d2l-labs-navigation-highlight-border,
	*[active] > .d2l-labs-navigation-highlight-border {
		background: var(--d2l-color-celestine);
	}
`,
    n = i `
	button {
		align-items: center;
		background: transparent;
		border: none;
		color: var(--d2l-color-ferrite);
		cursor: pointer;
		display: inline-flex;
		font-family: inherit;
		font-size: inherit;
		gap: 6px;
		height: 100%;
		margin: 0;
		min-height: 40px;
		outline: none;
		overflow: visible;
		padding: 0;
		position: relative;
		vertical-align: middle;
		white-space: nowrap;
	}
	/* Firefox includes a hidden border which messes up button dimensions */
	button::-moz-focus-inner {
		border: 0;
	}
	button:not([disabled]):hover,
	button:not([disabled]):focus,
	button[active] {
		--d2l-icon-fill-color: var(--d2l-color-celestine);
		color: var(--d2l-color-celestine);
		outline: none;
	}
	button[disabled] {
		cursor: default;
		opacity: 0.5;
	}
`,
    a = i `
	a {
		align-items: center;
		color: var(--d2l-color-ferrite);
		display: inline-flex;
		gap: 6px;
		height: 100%;
		min-height: 40px;
		position: relative;
		text-decoration: none;
		vertical-align: middle;
		white-space: nowrap;
	}
	a:hover,
	a:focus {
		--d2l-icon-fill-color: var(--d2l-color-celestine);
		color: var(--d2l-color-celestine);
		outline: none;
	}
`;
export {
    n as a, a as b, o as c, e as g, t as h
};