import "./colors.js";
import {
    i as t,
    r as e
} from "./lit-element.js";
import {
    b as n
} from "./focus.js";
import {
    s as o
} from "./svg-to-css.js";

function r(t) {
    return t.split(",").every(t => (t => {
        if (":host" === t) return !0;
        const e = t.match(/([a-zA-Z0-9-_ >.#]+)(\[[a-zA-Z0-9-_]+\])?([a-zA-Z0-9-_ >.#]+)?/g),
            n = !!e && 1 === e.length && e[0].length === t.length;
        return n || console.warn(`Invalid CSS selector: "${t}"`), n
    })(t))
}
const a = n => {
        if (r(n)) return n = e(n), t `
		${n} {
			font-size: 0.95rem;
			font-weight: 400;
			line-height: 1.4rem;
		}
		@media (max-width: 615px) {
			${n} {
				font-size: 0.8rem;
				line-height: 1.2rem;
			}
		}
	`
    },
    l = t `
	${a(".d2l-body-standard")}
	:host([skeleton]) .d2l-body-standard.d2l-skeletize::before {
		bottom: 0.35rem;
		top: 0.3rem;
	}
	:host([skeleton]) .d2l-body-standard.d2l-skeletize-paragraph-2 {
		max-height: 2.8rem;
	}
	:host([skeleton]) .d2l-body-standard.d2l-skeletize-paragraph-3 {
		max-height: 4.2rem;
	}
	:host([skeleton]) .d2l-body-standard.d2l-skeletize-paragraph-5 {
		max-height: 7rem;
	}
	@media (max-width: 615px) {
		:host([skeleton]) .d2l-body-standard.d2l-skeletize::before {
			bottom: 0.3rem;
			top: 0.3rem;
		}
		:host([skeleton]) .d2l-body-standard.d2l-skeletize-paragraph-2 {
			max-height: 2.4rem;
		}
		:host([skeleton]) .d2l-body-standard.d2l-skeletize-paragraph-3 {
			max-height: 3.6rem;
		}
		:host([skeleton]) .d2l-body-standard.d2l-skeletize-paragraph-5 {
			max-height: 6rem;
		}
	}
`,
    i = n => {
        if (r(n)) return n = e(n), t `
		${n} {
			color: var(--d2l-theme-text-color-static-standard);
			font-size: 0.95rem;
			font-weight: 400;
			line-height: 1.4rem;
			text-align: start;
			white-space: normal;
		}
	`
    },
    s = (n, o = !0) => {
        if (!r(n)) return;
        n = e(n);
        const a = o ? t `
		:host([skeleton]) ${n}.d2l-skeletize::before {
			bottom: 0.3rem;
			top: 0.3rem;
		}
		:host([skeleton]) ${n}.d2l-skeletize-paragraph-2 {
			max-height: 2.4rem;
		}
		:host([skeleton]) ${n}.d2l-skeletize-paragraph-3 {
			max-height: 3.6rem;
		}
		:host([skeleton]) ${n}.d2l-skeletize-paragraph-5 {
			max-height: 6rem;
		}
	` : e("");
        return t `
		${n} {
			font-size: 0.8rem;
			font-weight: 400;
			line-height: 1.2rem;
		}
		${a}
	`
    },
    f = s(".d2l-body-compact", !0),
    h = (n, o = !0) => {
        if (!r(n)) return;
        n = e(n);
        const a = o ? t `
		:host([skeleton]) ${n}.d2l-skeletize::before {
			bottom: 0.25rem;
			top: 0.2rem;
		}
		:host([skeleton]) ${n}.d2l-skeletize-paragraph-2 {
			max-height: 2rem;
		}
		:host([skeleton]) ${n}.d2l-skeletize-paragraph-3 {
			max-height: 3rem;
		}
		:host([skeleton]) ${n}.d2l-skeletize-paragraph-5 {
			max-height: 5rem;
		}
		@media (max-width: 615px) {
			:host([skeleton]) ${n}.d2l-skeletize::before {
				bottom: 0.25rem;
				top: 0.2rem;
			}
			:host([skeleton]) ${n}.d2l-skeletize-paragraph-2 {
				max-height: 1.8rem;
			}
			:host([skeleton]) ${n}.d2l-skeletize-paragraph-3 {
				max-height: 2.7rem;
			}
			:host([skeleton]) ${n}.d2l-skeletize-paragraph-5 {
				max-height: 4.5rem;
			}
		}` : e("");
        return t `
		${n} {
			color: var(--d2l-theme-text-color-static-subtle);
			font-size: 0.7rem;
			font-weight: 400;
			line-height: 0.9rem;
			margin: auto;
		}
		${a}
	`
    },
    m = h(".d2l-body-small", !0),
    d = e => n(e, {
        extraStyles: t `border-radius: 0.3rem;`
    }),
    g = (n, o = !1) => {
        if (!r(n)) return;
        const a = o ? d(n) : e("");
        return n = e(n), t `
		${n} {
			font-size: 2rem;
			font-weight: 400;
			line-height: 2.4rem;
			margin: 1.5rem 0 1.5rem 0;
		}
		${a}
		@media (max-width: 615px) {
			${n} {
				font-size: 1.5rem;
				line-height: 1.8rem;
			}

		}
	`
    },
    p = t `
	${g(".d2l-heading-1",!0)}
	:host([skeleton]) .d2l-heading-1.d2l-skeletize {
		height: 2.4rem;
		overflow: hidden;
	}
	:host([skeleton]) .d2l-heading-1.d2l-skeletize::before {
		bottom: 0.45rem;
		top: 0.45rem;
	}
	@media (max-width: 615px) {
		:host([skeleton]) .d2l-heading-1.d2l-skeletize {
			height: 1.8rem;
		}
		:host([skeleton]) .d2l-heading-1.d2l-skeletize::before {
			bottom: 0.3rem;
			top: 0.35rem;
		}
	}
`,
    w = (n, o = !1) => {
        if (!r(n)) return;
        const a = o ? d(n) : e("");
        return n = e(n), t `
		${n} {
			font-size: 1.5rem;
			font-weight: 400;
			line-height: 1.8rem;
			margin: 1.5rem 0 1.5rem 0;
		}
		${a}
		@media (max-width: 615px) {
			${n} {
				font-size: 1rem;
				font-weight: 700;
				line-height: 1.5rem;
			}

		}
	`
    },
    c = t `
	${w(".d2l-heading-2",!0)}
	:host([skeleton]) .d2l-heading-2.d2l-skeletize {
		height: 1.8rem;
		overflow: hidden;
	}
	:host([skeleton]) .d2l-heading-2.d2l-skeletize::before {
		bottom: 0.3rem;
		top: 0.35rem;
	}
	@media (max-width: 615px) {
		:host([skeleton]) .d2l-heading-2.d2l-skeletize {
			height: 1.5rem;
		}
		:host([skeleton]) .d2l-heading-2.d2l-skeletize::before {
			bottom: 0.35rem;
			top: 0.35rem;
		}
	}
`,
    $ = (n, o = !1) => {
        if (!r(n)) return;
        const a = o ? d(n) : e("");
        return n = e(n), t `
		${n} {
			font-size: 1rem;
			font-weight: 700;
			line-height: 1.5rem;
			margin: 1.5rem 0 1.5rem 0;
		}
		${a}
		@media (max-width: 615px) {
			${n} {
				font-size: 0.8rem;
				line-height: 1.2rem;
			}

		}
	`
    },
    k = t `
	${$(".d2l-heading-3",!0)}
	:host([skeleton]) .d2l-heading-3.d2l-skeletize {
		height: 1.5rem;
		overflow: hidden;
	}
	:host([skeleton]) .d2l-heading-3.d2l-skeletize::before {
		bottom: 0.35rem;
		top: 0.35rem;
	}
	@media (max-width: 615px) {
		:host([skeleton]) .d2l-heading-3.d2l-skeletize {
			height: 1.2rem;
		}
		:host([skeleton]) .d2l-heading-3.d2l-skeletize::before {
			bottom: 0.3rem;
			top: 0.25rem;
		}
	}
`,
    y = (n, o = !1) => {
        if (!r(n)) return;
        const a = o ? d(n) : e("");
        return n = e(n), t `
		${n} {
			font-size: 0.8rem;
			font-weight: 700;
			line-height: 1.2rem;
			margin: 1.5rem 0 1.5rem 0;
		}
		${a}
	`
    },
    u = t `
	${y(".d2l-heading-4",!0)}
	:host([skeleton]) .d2l-heading-4.d2l-skeletize {
		height: 1.2rem;
		overflow: hidden;
	}
	:host([skeleton]) .d2l-heading-4.d2l-skeletize::before {
		bottom: 0.25rem;
		top: 0.25rem;
	}
`,
    z = (n, o = !0) => {
        if (!r(n)) return;
        n = e(n);
        const a = o ? t `
		:host([skeleton]) ${n}.d2l-skeletize::before {
			bottom: 0.25rem;
			top: 0.15rem;
		}
	` : e("");
        return t `
		${n} {
			font-size: 0.7rem;
			font-weight: 700;
			letter-spacing: 0.2px;
			line-height: 0.9rem;
		}
		${a}
	`
    },
    b = z(".d2l-label-text", !0),
    x = o('<svg width="11" height="11" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t<defs>\n\t\t<path id="a" d="M0 0h24v24H0z"/>\n\t</defs>\n\t<g transform="translate(-1 -1)" fill="none" fill-rule="evenodd">\n\t\t<mask id="b" fill="#fff"><use xlink:href="#a"/></mask>\n\t\t<path d="M6 22.667A4.667 4.667 0 0 0 10.667 18c0-1.227-.559-2.5-1.334-3.333C8.481 13.75 7.35 13.333 6 13.333c-.411 0 1.333-6.666 3-9 1.667-2.333 1.333-3 .333-3C8 1.333 5.253 4.586 4 7.255 1.773 12 1.333 15.392 1.333 18A4.667 4.667 0 0 0 6 22.667zm12 0A4.667 4.667 0 0 0 22.667 18c0-1.227-.559-2.5-1.334-3.333-.852-.917-1.983-1.334-3.333-1.334-.411 0 1.333-6.666 3-9 1.667-2.333 1.333-3 .333-3-1.333 0-4.08 3.253-5.333 5.922C13.773 12 13.333 15.392 13.333 18A4.667 4.667 0 0 0 18 22.667z" fill="#D3D9E3" mask="url(#b)"/>\n\t</g>\n</svg>'),
    L = n => {
        if (r(n)) return n = e(n), t `
		${n} {
			font-size: 0.8rem;
			font-weight: 400;
			line-height: 1.4rem;
			margin-block: 0;
			margin-inline: 0 1.2rem;
			padding-block: 0.5rem 0;
			padding-inline: 1.2rem 0;
			position: relative;
		}
		${n}::before {
			content: ${x};
			inset-block-start: 0;
			inset-inline-start: 0;
			position: absolute;
			transform: var(--d2l-mirror-transform, ${"rtl"===globalThis.document?.dir?t`scale(-1, 1)`:t`none`}); /* stylelint-disable-line @stylistic/string-quotes, @stylistic/function-whitespace-after */
		}
		@media (max-width: 615px) {
			${n} {
				line-height: 1.2rem;
			}
		}
	`
    },
    S = L(".d2l-blockquote"),
    R = "https://s.brightspace.com/lib/fonts/0.6.4/assets/",
    U = "Lato-400",
    v = "Lato-700",
    B = "NotoSansThai-Regular",
    C = "NotoSansThai-Bold",
    A = "BCSans-Light",
    j = "BCSans-Regular",
    T = "BCSans-Bold",
    N = "BCSans-LightItalic",
    G = "BCSans-Italic",
    I = "BCSans-BoldItalic",
    D = `@font-face {\n\tfont-family: 'Lato';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tsrc:\n\t\turl(${new URL(`${U}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${U}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'Lato';\n\tfont-style: normal;\n\tfont-weight: 700;\n\tsrc:\n\t\turl(${new URL(`${v}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${v}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'Noto Sans Thai';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tsrc:\n\t\turl(${new URL(`${B}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${B}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'Noto Sans Thai';\n\tfont-style: normal;\n\tfont-weight: 700;\n\tsrc:\n\t\turl(${new URL(`${C}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${C}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'BC Sans';\n\tfont-style: normal;\n\tfont-weight: 300;\n\tsrc:\n\t\turl(${new URL(`${A}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${A}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'BC Sans';\n\tfont-style: normal;\n\tfont-weight: 400;\n\tsrc:\n\t\turl(${new URL(`${j}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${j}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'BC Sans';\n\tfont-style: normal;\n\tfont-weight: 700;\n\tsrc:\n\t\turl(${new URL(`${T}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${T}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'BC Sans';\n\tfont-style: italic;\n\tfont-weight: 300;\n\tsrc:\n\t\turl(${new URL(`${N}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${N}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'BC Sans';\n\tfont-style: italic;\n\tfont-weight: 400;\n\tsrc:\n\t\turl(${new URL(`${G}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${G}.woff`,R)}) format('woff');\n}\n@font-face {\n\tfont-family: 'BC Sans';\n\tfont-style: italic;\n\tfont-weight: 700;\n\tsrc:\n\t\turl(${new URL(`${I}.woff2`,R)}) format('woff2'),\n\t\turl(${new URL(`${I}.woff`,R)}) format('woff');\n}`,
    H = t `
	${e(D)}
	html {
		--d2l-cursor-resize-inline-end: e-resize;
		--d2l-cursor-resize-inline-start: w-resize;
		--d2l-document-direction: ltr;
		--d2l-inline-end: right;
		--d2l-inline-start: left;
		--d2l-length-factor: 1;
		--d2l-mirror-transform: none;
	}
	html[dir="rtl"] {
		--d2l-cursor-resize-inline-end: w-resize;
		--d2l-cursor-resize-inline-start: e-resize;
		--d2l-document-direction: rtl;
		--d2l-inline-end: left;
		--d2l-inline-start: right;
		--d2l-length-factor: -1;
		--d2l-mirror-transform: scale(-1, 1);
	}

	.d2l-typography {
		color: var(--d2l-theme-text-color-static-standard);
		display: block;
		font-family: "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
		letter-spacing: 0.01rem;
	}
	${a(".d2l-typography")}
	.d2l-typography p {
		margin: 1rem 0;
	}

	.d2l-typography:lang(ar), .d2l-typography :lang(ar) {
		font-family: "Segoe UI", "Geeza Pro", sans-serif;
	}
	.d2l-typography:lang(ja), .d2l-typography :lang(ja) {
		font-family: "Hiragino Kaku Gothic Pro", "Meiyro", sans-serif;
	}
	.d2l-typography:lang(ko), .d2l-typography :lang(ko) {
		font-family: "Apple SD Gothic Neo", Dotum, sans-serif;
	}
	.d2l-typography:lang(th), .d2l-typography :lang(th), .d2l-typography:lang(tha), .d2l-typography :lang(tha) {
		font-family: "Noto Sans Thai", system-ui, Tahoma;
	}
	.d2l-typography:lang(zh), .d2l-typography :lang(zh) {
		font-family: "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
	}
`;
export {
    i as _, l as a, f as b, m as c, p as d, c as e, k as f, H as g, u as h, a as i, s as j, h as k, b as l, z as m, g as n, w as o, $ as p, y as q, L as r, D as s, r as t, S as u
};