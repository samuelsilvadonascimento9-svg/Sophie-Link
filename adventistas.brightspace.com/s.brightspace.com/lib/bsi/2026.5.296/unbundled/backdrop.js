import "./colors.js";
import {
    a as t,
    i as e,
    b as i
} from "./lit-element.js";
import {
    h as s,
    i as n,
    e as o,
    b as r,
    g as a
} from "./dom.js";
import {
    g as d
} from "./focus.js";
import {
    g as h
} from "./flags.js";
import "./svg-to-css.js";
const u = "data-d2l-backdrop-hidden",
    l = "data-d2l-backdrop-aria-hidden",
    c = "data-d2l-backdrop-tabindex",
    m = "data-d2l-backdrop-inert",
    b = matchMedia("(prefers-reduced-motion: reduce)").matches,
    p = new Set;
let f = null;

function A(t) {
    p.has(t) && (p.delete(t), p.size || (document.body.style.overflow = f, f = null))
}

function g(t) {
    p.size || (f = document.body.style.overflow, document.body.style.overflow = "hidden"), p.add(t)
}

function w(t) {
    if (t)
        for (let e = 0; e < t.length; e++) {
            const i = t[e];
            i.hasAttribute(l) ? (i.setAttribute("aria-hidden", i.getAttribute(l)), i.removeAttribute(l)) : i.removeAttribute("aria-hidden"), i.hasAttribute(c) ? (i.setAttribute("tabindex", i.getAttribute(c)), i.removeAttribute(c)) : i.removeAttribute("tabindex"), h("GAUD-9398-make-backdrop-inert", !1) && (i.hasAttribute(m) ? i.removeAttribute(m) : i.removeAttribute("inert")), i.removeAttribute(u)
        }
}
async function _(t, e) {
    if (Date.now() > e) return;
    const i = d();
    return o(t, i) ? void 0 : (await new Promise(t => requestAnimationFrame(t)), _(t, e))
}
customElements.define("d2l-backdrop", class extends t {
    static get properties() {
        return {
            forTarget: {
                type: String,
                attribute: "for-target"
            },
            noAnimateHide: {
                type: Boolean,
                attribute: "no-animate-hide"
            },
            shown: {
                type: Boolean
            },
            _state: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [e `
			:host {
				background-color: var(--d2l-color-regolith);
				height: 0;
				left: 0;
				opacity: 0;
				position: fixed;
				top: 0;
				transition: opacity ${200}ms ease-in;
				width: 0;
				z-index: 999;
			}
			:host([slow-transition]) {
				transition: opacity 1200ms ease-in;
			}
			:host([_state="showing"]) {
				opacity: 0.7;
			}
			:host([_state="showing"]),
			:host([_state="hiding"]) {
				height: 100%;
				width: 100%;
			}
			:host([_state=null][no-animate-hide]) {
				transition: none;
			}
			@media (prefers-reduced-motion: reduce) {
				:host,
				:host([slow-transition]) {
					transition: none;
				}
			}
		`]
    }
    constructor() {
        super(), this.shown = !1, this.noAnimateHide = !1, this._state = null
    }
    disconnectedCallback() {
        A(this), w(this._hiddenElements), this._hiddenElements = null, this._state = null, super.disconnectedCallback()
    }
    render() {
        return i `<div></div>`
    }
    updated(t) {
        if (super.updated(t), t.has("shown"))
            if (this.shown) {
                if (null === this._state) {
                    g(this);
                    const t = this.parentNode.querySelector(`#${s(this.forTarget)}`);
                    _(t, Date.now() + 200).then(() => {
                        this.shown && "showing" === this._state && (this._hiddenElements = function(t) {
                            const e = [],
                                i = [t],
                                s = function(t) {
                                    const s = a(t);
                                    for (let t = 0; t < s.length; t++) {
                                        const n = s[t];
                                        "SCRIPT" !== n.tagName && "STYLE" !== n.tagName && (-1 === i.indexOf(n) && (n.hasAttribute(u) || (n.hasAttribute("aria-hidden") && n.setAttribute(l, n.getAttribute("aria-hidden")), n.setAttribute("aria-hidden", "true"), n.hasAttribute("tabindex") && n.setAttribute(c, n.getAttribute("tabindex")), n.setAttribute("tabindex", "-1"), h("GAUD-9398-make-backdrop-inert", !1) && (n.hasAttribute("inert") && n.setAttribute(m, ""), n.setAttribute("inert", "")), n.setAttribute(u, u), e.push(n))))
                                    }
                                };
                            let n = r(t);
                            for (; n !== document.documentElement && null !== n;) n.nodeType === Node.ELEMENT_NODE && (i.push(n), s(n)), n = r(n);
                            return e
                        }(t))
                    })
                }
                this._state = "showing"
            } else if ("showing" === this._state) {
            const t = () => {
                this.shown || (A(this), w(this._hiddenElements), this._hiddenElements = null, this._state = null)
            };
            b || this.noAnimateHide || !n(this) ? t() : (this.addEventListener("transitionend", t, {
                once: !0
            }), this._state = "hiding", setTimeout(() => "hiding" === this._state && t(), 300))
        }
    }
});
export {
    A as a, g as p
};