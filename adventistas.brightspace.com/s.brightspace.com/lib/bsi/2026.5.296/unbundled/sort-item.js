import {
    _ as e,
    a as t,
    e as s
} from "./_rollupPluginBabelHelpers.js";
import "./dropdown-button-subtle.js";
import "./dropdown-menu.js";
import "./menu.js";
import {
    a as l,
    i as o,
    b as n
} from "./lit-element.js";
import {
    F as d
} from "./focus-mixin.js";
import {
    L as i
} from "./localize-core-element.js";
import {
    M as a
} from "./menu-item-radio.js";
var r = new WeakSet;
class c extends(d(i(l))) {
    static get styles() {
        return o `
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
			::slotted(:not(d2l-sort-item)) {
				display: none;
			}
		`
    }
    constructor() {
        super(), e(this, r), this.disabled = !1, this.opened = !1, this._selectedItemText = "", this._selectedItemValue = ""
    }
    static get focusElementSelector() {
        return "d2l-dropdown-button-subtle"
    }
    render() {
        return n `
			<d2l-dropdown-button-subtle
				?disabled="${this.disabled}"
				text="${this.localize("components.sort.text",{selectedItemText:this._selectedItemText})}">
				<d2l-dropdown-menu class="vdiff-target" ?opened="${this.opened}">
					<d2l-menu
						label="${this.localize("components.sort.label")}"
						@d2l-menu-item-change="${t(r,this,u)}">
						<slot
							@d2l-sort-item-selected-text-change="${t(r,this,p)}"
							@slotchange="${t(r,this,h)}"></slot>
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown-button-subtle>
		`
    }
}

function m() {
    const e = this.shadowRoot ? .querySelector("slot") ? .assignedElements();
    return e ? e.filter(e => "D2L-SORT-ITEM" === e.tagName) : []
}

function u(e) {
    this._selectedItemValue !== e.target.value && (this._selectedItemText = e.target.text, this._selectedItemValue = e.target.value, this.dispatchEvent(new CustomEvent("d2l-sort-change", {
        detail: {
            value: e.detail.value
        }
    })))
}

function h() {
    t(r, this, p).call(this)
}

function p() {
    const e = t(r, this, m).call(this);
    if (0 === e.length) return;
    const s = e.filter(e => e.selected);
    0 === s.length && (e[0].selected = !0, s.push(e[0]));
    const l = s[s.length - 1];
    this._selectedItemText = l.text, this._selectedItemValue = l.value
}
s(c, "properties", {
    disabled: {
        type: Boolean,
        reflect: !0
    },
    opened: {
        type: Boolean,
        reflect: !0
    },
    _selectedItemText: {
        state: !0
    },
    _selectedItemValue: {
        state: !0
    }
}), customElements.define("d2l-sort", c);
customElements.define("d2l-sort-item", class extends a {
    updated(e) {
        super.updated(e), e.has("text") && this.selected && this.dispatchEvent(new CustomEvent("d2l-sort-item-selected-text-change", {
            bubbles: !0,
            composed: !1
        }))
    }
});