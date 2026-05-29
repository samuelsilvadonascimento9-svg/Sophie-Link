import {
    a as t
} from "./_rollupPluginBabelHelpers.js";
import {
    a as e,
    i as s,
    b as o
} from "./lit-element.js";
import {
    d as a,
    c as r
} from "./focus.js";
import {
    F as n
} from "./focus-mixin.js";
import {
    o as i
} from "./if-defined.js";
import {
    e as d
} from "./dom.js";
import {
    i as c
} from "./framed.js";
var l;
const h = [];
class p extends(n(e)) {
    static get properties() {
        return {
            trap: {
                type: Boolean
            },
            _legacyPromptIds: {
                state: !0
            }
        }
    }
    static get styles() {
        return s `
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`
    }
    constructor() {
        super(), this.trap = !1, this._handleBodyFocus = this._handleBodyFocus.bind(this), this._handleLegacyPromptOpen = this._handleLegacyPromptOpen.bind(this), this._handleLegacyPromptClose = this._handleLegacyPromptClose.bind(this), this._legacyPromptIds = new Set
    }
    static get focusElementSelector() {
        return ".d2l-focus-trap-start"
    }
    connectedCallback() {
        super.connectedCallback(), document.body.addEventListener("focus", this._handleBodyFocus, !0), document.body.addEventListener("d2l-legacy-prompt-open", this._handleLegacyPromptOpen), document.body.addEventListener("d2l-legacy-prompt-close", this._handleLegacyPromptClose)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), document.body.removeEventListener("focus", this._handleBodyFocus, !0), document.body.removeEventListener("d2l-legacy-prompt-open", this._handleLegacyPromptOpen), document.body.removeEventListener("d2l-legacy-prompt-close", this._handleLegacyPromptClose)
    }
    render() {
        const t = this.trap && 0 === this._legacyPromptIds.size ? "0" : void 0;
        return o `
			<span class="d2l-focus-trap-start" @focusin="${this._handleStartFocusIn}" tabindex="${i(t)}"></span>
			<slot></slot>
			<span class="d2l-focus-trap-end" @focusin="${this._handleEndFocusIn}" tabindex="${i(t)}"></span>
		`
    }
    willUpdate(t) {
        if (t.has("trap"))
            if (this.trap) h.push(this);
            else {
                const t = h.findIndex(t => t === this);
                if (-1 === t) return;
                h.splice(t, 1)
            }
    }
    _focusFirst() {
        const t = this.shadowRoot && a(this.shadowRoot.querySelector(".d2l-focus-trap-start"));
        t && t.focus(), this.dispatchEvent(new CustomEvent("d2l-focus-trap-enter", {
            bubbles: !0,
            composed: !0
        }))
    }
    _getContainer() {
        return this.shadowRoot && this.shadowRoot.querySelector(".d2l-focus-trap-start").parentNode
    }
    _handleBodyFocus(t) {
        const e = h[h.length - 1];
        if (!this.trap || this._legacyPromptIds.size > 0 || e !== this) return;
        const s = this._getContainer(),
            o = t.composedPath()[0];
        d(s, o) || u.call(p, o) || this._focusFirst()
    }
    _handleEndFocusIn(t) {
        const e = this._getContainer();
        if (this.shadowRoot && (d(e, t.relatedTarget) || u.call(p, t.relatedTarget))) {
            const t = a(this.shadowRoot.querySelector(".d2l-focus-trap-start"));
            if (t) return void t.focus()
        }
        this._focusFirst()
    }
    _handleLegacyPromptClose(t) {
        this._legacyPromptIds.delete(t.detail.id), this.requestUpdate()
    }
    _handleLegacyPromptOpen(t) {
        this._legacyPromptIds.add(t.detail.id), this.requestUpdate()
    }
    _handleStartFocusIn(t) {
        const e = this._getContainer();
        if (this.shadowRoot && (d(e, t.relatedTarget) || u.call(p, t.relatedTarget))) {
            const t = r(this.shadowRoot.querySelector(".d2l-focus-trap-end"));
            if (t) return void t.focus()
        }
        this._focusFirst()
    }
}

function u(e) {
    return !!e ? .closest(t(l, this, m)._)
}
l = p;
var m = {
    _: [".d2l-focus-trap-exempt", ".equatio-toolbar-wrapper", ".equatio-toolbar-shadow-root-container"].join(", ")
};
let f;
async function y() {
    if (!await c()) return null;
    if (f) return f;
    const t = await
    import ("./slim.js"), e = await (new t.SlimClient).connect();
    return f = await e.getService("dialogWC", "0.1"), f
}
customElements.define("d2l-focus-trap", p);
export {
    y as t
};