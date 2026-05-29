import {
    _ as e,
    a as t
} from "./_rollupPluginBabelHelpers.js";
import {
    a as n,
    i as a,
    b as s
} from "./lit-element.js";
import {
    o as i
} from "./style-map.js";
import "./directive.js";
const o = matchMedia("(prefers-reduced-motion: reduce)").matches,
    l = "precollapsing",
    d = "collapsing",
    p = "collapsed",
    c = "preexpanding",
    r = "expanding",
    h = "expanded";
var x = new WeakSet;

function m() {
    return this.shadowRoot ? .querySelector(".d2l-expand-collapse-content-inner") ? .scrollHeight ? ? 0
}

function u() {
    this._state = this.expanded ? h : p, this._height = this.expanded ? "auto" : "0", this._eventPromiseResolve && this._eventPromiseResolve()
}
customElements.define("d2l-expand-collapse-content", class extends n {
    static get properties() {
        return {
            expanded: {
                type: Boolean,
                reflect: !0
            },
            _height: {
                type: String
            },
            _state: {
                type: String
            }
        }
    }
    static get styles() {
        return a `
			:host {
				--d2l-expand-collapse-content-transition-duration: 0.2s;
				--d2l-expand-collapse-content-transition-function: cubic-bezier(0.4, 0.4, 0.25, 1);
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			.d2l-expand-collapse-content-container {
				display: block;
				opacity: 0;
				overflow: hidden;
				transition:
					height var(--d2l-expand-collapse-content-transition-duration) var(--d2l-expand-collapse-content-transition-function),
					opacity var(--d2l-expand-collapse-content-transition-duration) var(--d2l-expand-collapse-content-transition-function);
			}

			.d2l-expand-collapse-content-container[data-state="collapsed"] {
				display: none;
			}

			.d2l-expand-collapse-content-container[data-state="expanded"] {
				overflow: visible;
			}


			.d2l-expand-collapse-content-container[data-state="expanded"],
			.d2l-expand-collapse-content-container[data-state="expanding"] {
				opacity: 1;
			}

			/* prevent margin colapse on slotted children */
			.d2l-expand-collapse-content-inner::before,
			.d2l-expand-collapse-content-inner::after {
				content: " ";
				display: table;
			}

			@media (prefers-reduced-motion: reduce) {
				.d2l-expand-collapse-content-container {
					transition: none;
				}
			}
		`
    }
    constructor() {
        super(), e(this, x), this.expanded = !1, this._height = "0", this._state = p, this._reduceMotion = o
    }
    render() {
        const e = {
            height: this._height
        };
        return s `
			<div class="d2l-expand-collapse-content-container" data-state="${this._state}" @transitionend=${t(x,this,u)} style=${i(e)}>
				<div class="d2l-expand-collapse-content-inner">
					<slot></slot>
				</div>
			</div>
		`
    }
    willUpdate(e) {
        super.willUpdate(e), e.has("expanded") && (this.hasUpdated ? this._expandedChanged() : t(x, this, u).call(this))
    }
    async _expandedChanged() {
        const e = new Promise(e => this._eventPromiseResolve = e);
        if (this.dispatchEvent(new CustomEvent(this.expanded ? "d2l-expand-collapse-content-expand" : "d2l-expand-collapse-content-collapse", {
                bubbles: !0,
                detail: {
                    [this.expanded ? "expandComplete" : "collapseComplete"]: e
                }
            })), this._reduceMotion) t(x, this, u).call(this);
        else if (this.expanded) {
            if (this._state = c, await this.updateComplete, await new Promise(e => requestAnimationFrame(() => requestAnimationFrame(e))), this._state === c) {
                this._state = r;
                const e = t(x, this, m).call(this);
                e && (this._height = `${e}px`), 0 === e && t(x, this, u).call(this)
            }
        } else this._state = l, this._height = `${t(x,this,m).call(this)}px`, await this.updateComplete, await new Promise(e => requestAnimationFrame(() => requestAnimationFrame(e))), this._state === l && (this._state = d, this._height = "0")
    }
});