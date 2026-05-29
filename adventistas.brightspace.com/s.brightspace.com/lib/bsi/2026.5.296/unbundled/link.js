import {
    _ as e,
    b as i,
    c as t,
    a as o
} from "./_rollupPluginBabelHelpers.js";
import "./colors.js";
import "./icon.js";
import "./tooltip.js";
import {
    r as s,
    i as l,
    a,
    b as n,
    A as r
} from "./lit-element.js";
import {
    o as d,
    g as c
} from "./overflow.js";
import {
    t as p
} from "./styles.js";
import {
    b as m
} from "./focus.js";
import {
    e as h
} from "./class-map.js";
import {
    F as f
} from "./focus-mixin.js";
import {
    g as u
} from "./uniqueId.js";
import {
    o as b
} from "./if-defined.js";
import {
    L as j
} from "./localize-core-element.js";
import {
    o as $
} from "./offscreen.js";
import {
    o as g
} from "./style-map.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./dom.js";
import "./announce.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./dedupeMixin.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
const v = ((e, i = !0) => {
    if (!p(e)) return;
    const t = s(e),
        o = i ? l `
		:host([skeleton])  ${t}.d2l-skeletize::before {
			bottom: 0.2rem;
			top: 0.2rem;
		}
		:host([skeleton]) ${t}.d2l-link-small.d2l-skeletize::before {
			bottom: 0.15rem;
			top: 0.15rem;
		}
	` : s("");
    return l `
		${t}, ${t}:visited, ${t}:active, ${t}:link {
			--d2l-focus-ring-offset: 1px;
			color: var(--d2l-color-celestine);
			cursor: pointer;
			outline-style: none;
			text-decoration: none;
		}
		${t}:hover {
			color: var(--d2l-color-celestine-minus-1);
			text-decoration: underline;
		}
		${m(e,{extraStyles:l`border-radius: 2px; text-decoration: underline;`})}
		${t}.d2l-link-main {
			font-weight: 700;
		}
		${t}.d2l-link-small {
			font-size: 0.7rem;
			letter-spacing: 0.01rem;
			line-height: 1.05rem;
		}
		@media print {
			${t}, ${t}:visited, ${t}:active, ${t}:link {
				color: var(--d2l-color-ferrite);
			}
		}
		${o}
	`
})(".d2l-link", !0);
var k = new WeakMap,
    w = new WeakSet;
class y extends(j(f(a))) {
    static get properties() {
        return {
            ariaLabel: {
                type: String,
                attribute: "aria-label"
            },
            disabled: {
                type: Boolean,
                reflect: !0
            },
            disabledTooltip: {
                type: String,
                attribute: "disabled-tooltip",
                reflect: !0
            },
            download: {
                type: Boolean
            },
            href: {
                type: String
            },
            main: {
                type: Boolean,
                reflect: !0
            },
            lines: {
                type: Number
            },
            small: {
                type: Boolean,
                reflect: !0
            },
            target: {
                type: String
            }
        }
    }
    static get styles() {
        return [v, $, l `
				:host {
					display: inline;
				}
				:host([hidden]) {
					display: none;
				}
				:host([small]) {
					/* needed to keep host element same height as link */
					font-size: 0.7rem;
					line-height: 1.05rem;
				}
				:host([lines]) {
					min-width: 0;
				}
				a {
					display: inherit;
				}
				:host([lines]) a {
					align-items: baseline;
					display: flex;
				}
				a span.truncate {
					${c({lines:1})}
				}
				a span.truncate-one {
					${d}
				}
				#new-window {
					line-height: 0;
					white-space: nowrap;
				}
				d2l-icon {
					color: var(--d2l-color-celestine);
					height: calc(1em - 1px);
					margin-inline-start: 0.315em;
					transform: translateY(0.1em);
					vertical-align: inherit;
					width: calc(1em - 1px);
				}

				a:hover d2l-icon {
					--d2l-icon-fill-color: var(--d2l-color-celestine-minus-1);
				}

				:host([disabled]:not([disabled-tooltip])) a:hover {
					color: var(--d2l-color-celestine);
					text-decoration: none;
				}
				:host([disabled]:not([disabled-tooltip])) a:hover d2l-icon {
					--d2l-icon-fill-color: var(--d2l-color-celestine);
				}
				a[aria-disabled="true"],
				a[aria-disabled="true"]:active {
					cursor: default;
				}
				a[aria-disabled="true"] .d2l-link-content {
					opacity: 0.74;
				}
				a[aria-disabled="true"] d2l-icon {
					opacity: 0.64;
				}

				@media print {
					d2l-icon {
						display: none;
					}
				}
			`]
    }
    constructor() {
        super(), e(this, w), i(this, k, u()), this.disabled = !1, this.download = !1, this.main = !1, this.small = !1, this.lines = 0
    }
    static get focusElementSelector() {
        return ".d2l-link"
    }
    render() {
        const e = {
                "d2l-link": !0,
                "d2l-link-main": this.main,
                "d2l-link-small": this.small
            },
            i = {
                "d2l-link-content": !0,
                truncate: this.lines > 1,
                "truncate-one": 1 === this.lines
            },
            s = {
                webkitLineClamp: this.lines || null
            },
            l = "_blank" === this.target ? n `<span id="new-window"><span style="font-size: 0;">&nbsp;</span><d2l-icon icon="tier1:new-window"></d2l-icon></span><span class="d2l-offscreen">${this.localize("components.link.open-in-new-window")}</span>` : r,
            a = this.disabled && this.disabledTooltip ? n `<d2l-tooltip class="vdiff-target" for="${t(k,this)}">${this.disabledTooltip}</d2l-tooltip>` : r;
        return n `<a
				aria-disabled="${b(this.disabled?"true":void 0)}"
				aria-label="${b(this.ariaLabel)}"
				class="${h(e)}"
				@click="${o(w,this,x)}"
				?download="${this.download}"
				href="${b(this.disabled?void 0:this.href)}"
				id="${t(k,this)}"
				tabindex="${b(this.disabled&&this.disabledTooltip?0:void 0)}"
				target="${b(this.target)}"
				><span
					class="${h(i)}"
					style="${g(s)}"><slot></slot></span>${l}</a>${a}`
    }
}

function x(e) {
    this.disabled && (e.stopPropagation(), e.preventDefault())
}
customElements.define("d2l-link", y);
export {
    v as linkStyles
};