import {
    r as e
} from "./lit-element.js";
const l = /^\s*?\n/,
    t = /\n[^\S\n]+$/,
    o = /^\s*/;

function i(e, ...i) {
    let r = Number.MAX_SAFE_INTEGER;
    e[0].match(l) && ((e = [e[0].replace(l, ""), ...e.slice(1)])[e.length - 1] = e.at(-1).replace(t, "")), e.forEach(e => e.split("\n").forEach((e, l) => {
        l && (r = Math.min(e.match(o)[0].length, r))
    }));
    const n = new RegExp(`(^|\n)[^\\S\n]{${r}}`, "g");
    return e.reduce((e, l, t) => e.push(l.replace(n, "$1"), i[t] ? ? "") && e, []).join("")
}
const r = c({}),
    n = c({
        textOverflow: "ellipsis"
    });

function c({
    textOverflow: l = "",
    lines: t = 0,
    lit: o = !0
} = {}) {
    if (!arguments.length) return r;
    const n = i `
		min-width: 0; /* clamps width of flex items */
		overflow-x: clip;
		${t?i`
			display: -webkit-box;
			overflow-clip-margin: 0.2em;
			overflow-wrap: anywhere;
			overflow-y: clip;
			text-overflow: ${l||"ellipsis"};
			-webkit-box-orient: vertical;
			-webkit-line-clamp: ${t};`:i`
			overflow-clip-margin: 1em;
			${l?i`
				overflow-y: visible;
				text-overflow: ${l};
				white-space: nowrap;`:"overflow-y: clip;"}
		`}
	`;
    return o ? e(n) : n
}
export {
    r as a, c as g, n as o
};