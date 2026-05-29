import {
    c as t,
    s as e
} from "./dismissible.js";
import {
    i,
    b as s
} from "./lit-element.js";
import {
    f as a,
    e as n
} from "./dom.js";
import {
    b as o,
    d as r
} from "./focus.js";
import {
    e as c
} from "./class-map.js";
import {
    o as l
} from "./if-defined.js";
import {
    L as h
} from "./localize-core-element.js";
import {
    o as d
} from "./offscreen.js";

function u(t) {
    return !!t && !!a(t, t => t.classList && t.classList.contains("interactive-trap"))
}
const v = u => class extends(h(u)) {
    static get properties() {
        return {
            _focusingToggle: {
                state: !0
            },
            _hasInteractiveAncestor: {
                state: !0
            },
            _interactive: {
                state: !0
            }
        }
    }
    static get styles() {
        return [d, o(() => ".interactive-focusing-toggle", {
            extraStyles: i `border-radius: 6px;`
        })]
    }
    constructor() {
        super(), this._dismissibleId = null, this._focusingToggle = !1, this._hasInteractiveAncestor = !1, this._interactive = !1
    }
    connectedCallback() {
        super.connectedCallback();
        const t = a(this.parentNode, t => t.nodeType === Node.ELEMENT_NODE && (t.hasAttribute("grid") || "grid" === t.getAttribute("role")));
        this._hasInteractiveAncestor = null !== t
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._dismissibleId && (t(this._dismissibleId), this._dismissibleId = null)
    }
    focus() {
        this.shadowRoot && (this._hasInteractiveAncestor && !this._interactive ? this.shadowRoot.querySelector(".interactive-toggle").focus() : this._focusDelegate())
    }
    renderInteractiveContainer(t, e, i) {
        if (!e) throw new Error(`InteractiveMixin: no label provided for "${this.tagName}"`);
        if (!i) throw new Error(`InteractiveMixin: no focus delegate provided for "${this.tagName}"`);
        if (this._focusDelegate = i, !this._hasInteractiveAncestor) return t;
        const a = {
            "interactive-focusing-toggle": this._focusingToggle
        };
        return s `
			<div class="${c(a)}" @keydown="${this._handleInteractiveKeyDown}">
				<button
					class="interactive-toggle d2l-offscreen"
					@blur="${this._handleInteractiveToggleBlur}"
					@click="${this._handleInteractiveToggleClick}"
					@focus="${this._handleInteractiveToggleFocus}"
					tabindex="${l(this._hasInteractiveAncestor&&!this._interactive?"0":"-1")}">
					${`${e}, ${this.localize("components.interactive.instructions")}`}
				</button>
				<div class="interactive-trap">
					<span class="interactive-trap-start" @focus="${this._handleInteractiveTrapStartFocus}" tabindex="${l(this._hasInteractiveAncestor?"0":void 0)}"></span>
					<div class="interactive-container-content" @focusin="${this._handleInteractiveContentFocusIn}" @focusout="${this._handleInteractiveContentFocusOut}">${t}</div>
					<span class="interactive-trap-end" @focus="${this._handleInteractiveTrapEndFocus}" tabindex="${l(this._hasInteractiveAncestor?"0":void 0)}"></span>
				</div>
			</div>
		`
    }
    _handleInteractiveContentFocusIn() {
        this._interactive = !0, this._dismissibleId = e(async () => {
            await this._handleInteractiveExit()
        })
    }
    _handleInteractiveContentFocusOut(e) {
        n(this.shadowRoot.querySelector(".interactive-container-content"), e.relatedTarget) || (this._interactive = !1, this._dismissibleId && (t(this._dismissibleId), this._dismissibleId = null))
    }
    async _handleInteractiveExit() {
        this._interactive = !1, await this.updateComplete, this.shadowRoot.querySelector(".interactive-toggle").focus()
    }
    async _handleInteractiveKeyDown(t) {
        this._interactive && 27 !== t.keyCode && t.stopPropagation()
    }
    _handleInteractiveToggleBlur() {
        this._focusingToggle = !1
    }
    async _handleInteractiveToggleClick() {
        this._interactive = !0, await this.updateComplete, this.focus()
    }
    _handleInteractiveToggleFocus() {
        this._focusingToggle = !0
    }
    async _handleInteractiveTrapEndFocus() {
        await this._handleInteractiveExit()
    }
    async _handleInteractiveTrapStartFocus(t) {
        if (t.relatedTarget === this.shadowRoot.querySelector(".interactive-toggle")) {
            const t = r(this.shadowRoot.querySelector(".interactive-trap-end"));
            t && t.focus()
        } else await this._handleInteractiveExit()
    }
};
export {
    v as I, u as i
};