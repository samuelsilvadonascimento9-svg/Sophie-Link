import {
    _ as e,
    a as t
} from "./_rollupPluginBabelHelpers.js";
import "./input-checkbox.js";
import {
    i as s,
    b as i,
    a as o
} from "./lit-element.js";
import {
    F as n
} from "./focus-mixin.js";
import {
    o as l
} from "./if-defined.js";
import {
    L as c
} from "./localize-core-element.js";
import {
    S as a
} from "./selection-mixin.js";
import {
    S as r
} from "./selection-observer-mixin.js";
var h = new WeakSet;
class d extends(n(c(r(o)))) {
    static get properties() {
        return {
            disabled: {
                type: Boolean
            }
        }
    }
    static get styles() {
        return s `
			:host {
				display: inline-block;
				line-height: normal;
			}
			:host([hidden]) {
				display: none;
			}
		`
    }
    constructor() {
        super(), e(this, h), this.disabled = !1
    }
    static get focusElementSelector() {
        return "d2l-input-checkbox"
    }
    render() {
        if (!this._provider || this._provider.selectionSingle) return;
        const e = this.selectionInfo.state === a.states.none ? this.localize("components.selection.select-all") : this.localize("components.selection.selected", "count", this.selectionInfo.keys.length);
        return i `
			<d2l-input-checkbox
				label="${this.localize("components.selection.select-all")}"
				label-hidden
				@change="${t(h,this,u)}"
				?checked="${t(h,this,m).call(this)}"
				?disabled="${this.disabled}"
				description="${l(this.selectionInfo.state!==a.states.none?e:void 0)}"
				?indeterminate="${t(h,this,p).call(this)}">
			</d2l-input-checkbox>
		`
    }
}

function m() {
    return this.selectionInfo.state === a.states.all || this.selectionInfo.state === a.states.allPages
}

function p() {
    return this.selectionInfo.state === a.states.some
}
async function u(e) {
    const s = e.target;
    this._provider && this._provider.setSelectionForAll(s.checked, !1), await this.updateComplete, s.checked = t(h, this, m).call(this), s.indeterminate = t(h, this, p).call(this)
}
customElements.define("d2l-selection-select-all", d);