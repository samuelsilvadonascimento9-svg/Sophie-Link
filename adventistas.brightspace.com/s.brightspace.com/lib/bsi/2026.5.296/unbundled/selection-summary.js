import {
    a as e,
    i as t,
    A as s,
    b as i
} from "./lit-element.js";
import {
    b as o
} from "./styles.js";
import {
    f as n
} from "./number.js";
import {
    L as r
} from "./localize-core-element.js";
import {
    S as l
} from "./selection-mixin.js";
import {
    S as a
} from "./selection-observer-mixin.js";
class m extends(r(a(e))) {
    static get properties() {
        return {
            noSelectionText: {
                type: String,
                attribute: "no-selection-text"
            }
        }
    }
    static get styles() {
        return [o, t `
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
			p {
				margin: 0;
			}
		`]
    }
    render() {
        return this._summary ? i `
			<p class="d2l-body-compact">${this._summary}</p>
		` : s
    }
    willUpdate(e) {
        (e.has("_provider") || e.has("selectionInfo") || e.has("noSelectionText")) && this._updateSelectSummary()
    }
    _updateSelectSummary() {
        if (this._provider ? .selectionSingle) return void(this._summary = null);
        let e = !1;
        if (this._provider && this._provider._getLazyLoadItems) {
            const t = this._provider._getLazyLoadItems();
            if (t.size > 0)
                for (const s of this.selectionInfo.keys)
                    if (t.has(s)) {
                        e = !0;
                        break
                    }
        }
        const t = this._provider && this.selectionInfo.state === l.states.allPages ? this._provider.itemCount : this.selectionInfo.keys.length;
        this.selectionInfo.state === l.states.none && this.noSelectionText ? this._summary = this.noSelectionText : this._summary = e ? this.localize("components.selection.selected-plus", "count", n(t)) : this.localize("components.selection.selected", "count", n(t))
    }
}
customElements.define("d2l-selection-summary", m);