import {
    _ as t,
    a as s
} from "./_rollupPluginBabelHelpers.js";
import "./icon.js";
import {
    i as e,
    b as o,
    A as n
} from "./lit-element.js";
const i = i => {
    var r;
    return r = new WeakSet, class extends i {
        static get properties() {
            return {
                icon: {
                    type: String,
                    reflect: !0,
                    required: {
                        validator: (t, s, e) => e || s._hasCustomIcon || !s._iconRequired
                    }
                },
                _hasCustomIcon: {
                    state: !0
                }
            }
        }
        static get styles() {
            const t = [e `
			slot[name="icon"]::slotted(*) {
				display: none;
			}
			slot[name="icon"]::slotted(d2l-icon-custom) {
				display: inline-flex;
			}

			d2l-icon.property-icon,
			slot[name="icon"]::slotted(d2l-icon-custom) {
				height: 0.9rem;
				width: 0.9rem;
			}
		`];
            return super.styles && t.unshift(super.styles), t
        }
        constructor() {
            super(), t(this, r), this._hasCustomIcon = !1, this._iconRequired = !1
        }
        hasIcon() {
            return !(!this.icon && !this._hasCustomIcon)
        }
        _renderIcon() {
            const t = this.icon ? o `<d2l-icon icon="${this.icon}" class="property-icon"></d2l-icon>` : n;
            return o `<slot name="icon" @slotchange="${s(r,this,c)}">${t}</slot>`
        }
    };

    function c(t) {
        const s = t.target.assignedElements({
            flatten: !0
        }).filter(t => "D2L-ICON-CUSTOM" === t.tagName);
        this._hasCustomIcon = 1 === s.length
    }
};
export {
    i as S
};