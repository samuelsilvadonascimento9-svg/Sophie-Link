import "./colors.js";
import {
    i as t
} from "./lit-element.js";
import {
    b as e
} from "./focus.js";
import {
    P as i
} from "./property-required-mixin.js";
const s = t `

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	.action-slot::slotted(*) {
		display: none;
	}

	.action-slot::slotted(d2l-empty-state-action-button:first-of-type),
	.action-slot::slotted(d2l-empty-state-action-link:first-of-type) {
		display: inline;
	}
	.d2l-empty-state-description {
		--d2l-focus-ring-offset: 3px;
		border-radius: 0.3rem;
	}
	${e(".d2l-empty-state-description")}
`,
    o = t `

	:host {
		border: 1px solid var(--d2l-color-mica);
		border-radius: 0.3rem;
		padding: 1.2rem 1.5rem;
	}

	:host([description]) .empty-state-container {
		align-items: center;
		column-gap: 0.75rem;
		display: flex;
		flex-wrap: wrap;
		padding-inline-start: 0;
	}

	.d2l-empty-state-description {
		margin: 0;
	}

`,
    r = t `

	:host {
		text-align: center;
	}

	.illustration-slot::slotted(*) {
		display: none;
	}

	.illustration-slot::slotted(img:first-of-type),
	.illustration-slot::slotted(svg:first-of-type) {
		display: inline-block;
	}

	svg {
		height: 100%;
		max-width: 500px;
		width: 100%;
	}

	.d2l-empty-state-title {
		margin-bottom: 0.9rem;
	}

	.d2l-empty-state-title-large {
		font-size: 1.5rem;
		line-height: 1.8rem;
		margin: 1rem 0 1.5rem 0;
	}

	.d2l-empty-state-title-small {
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.5rem;
		margin-top: 0.5rem;
	}

	.d2l-empty-state-description {
		margin: 0 auto 0.8rem;
		max-width: 500px;
		width: 100%;
	}

`,
    a = t => class extends(i(t)) {
        focus() {
            if (!this.hasUpdated) return;
            const t = this.shadowRoot ? .querySelector(".action-slot").assignedElements().find(t => "D2L-EMPTY-STATE-ACTION-BUTTON" === t.tagName || "D2L-EMPTY-STATE-ACTION-LINK" === t.tagName);
            if (void 0 !== t) return void t.focus();
            const e = this.shadowRoot ? .querySelector(".d2l-empty-state-description");
            null !== e && e.focus()
        }
    };
export {
    a as E, o as a, r as b, s as e
};