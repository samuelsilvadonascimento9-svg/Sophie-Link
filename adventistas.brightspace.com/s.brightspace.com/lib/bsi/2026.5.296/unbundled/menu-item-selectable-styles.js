import {
    M as e,
    m as t
} from "./menu-item-styles.js";
import {
    i as s
} from "./lit-element.js";
const i = t => class extends(e(t)) {
        static get properties() {
            return {
                selected: {
                    type: Boolean,
                    reflect: !0
                },
                value: {
                    type: String
                }
            }
        }
        constructor() {
            super(), this.selected = !1
        }
        updated(e) {
            super.updated(e), e.forEach((e, t) => {
                "selected" === t && this.__onSelectedChanged(this.selected)
            })
        }
        __onSelect(e) {
            e.preventDefault(), e.stopPropagation();
            const t = {
                bubbles: !0,
                composed: !0,
                detail: {
                    value: this.value,
                    selected: this.selected
                }
            };
            this.dispatchEvent(new CustomEvent("d2l-menu-item-change", t))
        }
        __onSelectedChanged(e) {
            e ? this.setAttribute("aria-checked", "true") : this.setAttribute("aria-checked", "false")
        }
    },
    n = [t, s `
		:host {
			align-items: center;
			display: flex;
			padding: 0.75rem 1rem;
		}

		.d2l-menu-item-text {
			text-decoration: none;
		}

		d2l-icon {
			flex: none;
			margin-inline-end: 0.8rem;
			visibility: hidden;
		}

		:host([aria-checked="true"]) > d2l-icon {
			visibility: visible;
		}
	`];
export {
    i as M, n as m
};