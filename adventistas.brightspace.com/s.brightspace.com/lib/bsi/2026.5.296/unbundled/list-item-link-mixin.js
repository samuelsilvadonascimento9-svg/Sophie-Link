import "./colors.js";
import {
    i as t,
    A as e,
    b as i
} from "./lit-element.js";
import {
    L as n,
    i as r
} from "./list-item-mixin.js";
import {
    g as o
} from "./flags.js";
import {
    g as s
} from "./uniqueId.js";
import {
    o as a
} from "./if-defined.js";
const c = c => class extends(n(c)) {
    static get properties() {
        return {
            actionHref: {
                type: String,
                attribute: "action-href",
                reflect: !0
            },
            _ariaCurrent: {
                type: String
            }
        }
    }
    static get styles() {
        const e = [t `
			:host([action-href]:not([action-href=""])) {
				--d2l-list-item-content-text-color: var(--d2l-color-celestine);
			}
			a[href] {
				color: unset;
				display: block;
				height: 100%;
				outline: none;
				text-decoration: none;
				width: 100%;
			}
			:host([action-href]:not([action-href=""])) [slot="control-action"],
			:host([action-href]:not([action-href=""])) [slot="outside-control-action"] {
				grid-column-end: control-end;
			}
		`];
        return super.styles && e.unshift(super.styles), e
    }
    constructor() {
        super(), this.actionHref = null, this._primaryActionId = s(), this._propagateLinkClickEvent = o("GAUD-8733-list-item-propagate-link-click-event", !0)
    }
    willUpdate(t) {
        super.willUpdate(t), t.has("actionHref") && !this.actionHref && (this._hoveringPrimaryAction = !1)
    }
    _getDescendantClicked(t) {
        return r(t, t => t === this.shadowRoot.querySelector(`#${this._primaryActionId}`))
    }
    _handleLinkClick(t) {
        if (this._getDescendantClicked(t)) t.preventDefault();
        else if (this.dispatchEvent(new CustomEvent("d2l-list-item-link-click", {
                bubbles: !0
            })), !this._propagateLinkClickEvent) {
            t.stopPropagation();
            const e = new t.constructor(t.type, t);
            e.preventDefault = () => {
                t.preventDefault()
            }, this.dispatchEvent(e)
        }
    }
    _handleLinkFocus(t) {
        this._getDescendantClicked(t) && requestAnimationFrame(() => this._focusingPrimaryAction = !1)
    }
    _handleLinkKeyDown(t) {
        32 === t.keyCode && (t.preventDefault(), t.stopPropagation(), t.target.click())
    }
    _renderPrimaryAction(t, n) {
        if (this.actionHref) return i `<a aria-labelledby="${t}"
			aria-current="${a(this._ariaCurrent)}"
			@click="${this._handleLinkClick}"
			@focusin="${this._handleLinkFocus}"
			href="${this.actionHref}"
			id="${this._primaryActionId}"
			@keydown="${this._handleLinkKeyDown}">${n||e}</a>`
    }
};
export {
    c as L
};