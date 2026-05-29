import {
    a as t,
    i as e,
    b as i
} from "./lit-element.js";
import {
    i as s,
    f as h
} from "./icon-styles.js";
customElements.define("d2l-icon-custom", class extends t {
    static get properties() {
        return {
            size: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [s, e `
			:host([size="tier1"]) {
				height: var(--d2l-icon-height, 18px);
				width: var(--d2l-icon-width, 18px);
			}
			:host([size="tier2"]) {
				height: var(--d2l-icon-height, 24px);
				width: var(--d2l-icon-width, 24px);
			}
			:host([size="tier3"]) {
				height: var(--d2l-icon-height, 30px);
				width: var(--d2l-icon-width, 30px);
			}
		`]
    }
    render() {
        return i `<slot @slotchange="${this._handleSlotChange}"></slot>`
    }
    _handleSlotChange(t) {
        const e = t.target.assignedNodes().find(t => 1 === t.nodeType && "svg" === t.nodeName);
        e && h(e)
    }
});