import {
    _ as t,
    a as e
} from "./_rollupPluginBabelHelpers.js";
import "./button-icon.js";
import "./colors.js";
import "./input-text.js";
import {
    a as s,
    i,
    b as l
} from "./lit-element.js";
import {
    F as a
} from "./focus-mixin.js";
import {
    o
} from "./if-defined.js";
import {
    i as r
} from "./input-styles.js";
import {
    L as n
} from "./localize-core-element.js";
import "./icon.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./tooltip.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./svg-to-css.js";
import "./uniqueId.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./offscreen.js";
import "./class-map.js";
import "./style-map.js";
import "./visible-on-ancestor-mixin.js";
import "./button-styles.js";
import "./property-required-mixin.js";
import "./dedupeMixin.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
import "./number.js";
import "./common.js";
import "./input-inline-help.js";
import "./skeleton-mixin.js";
import "./subscriberControllers.js";
import "./input-label-styles.js";
import "./labelled-mixin.js";
import "./rtl-mixin.js";
import "./localize-mixin.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
var h = new WeakSet;
class u extends(a(n(s))) {
    static get properties() {
        return {
            description: {
                type: String,
                reflect: !0
            },
            disabled: {
                type: Boolean
            },
            label: {
                type: String
            },
            lastSearchValue: {
                type: String,
                attribute: !1
            },
            maxlength: {
                type: Number
            },
            noClear: {
                type: Boolean,
                attribute: "no-clear"
            },
            placeholder: {
                type: String
            },
            searchOnInput: {
                type: Boolean,
                attribute: "search-on-input"
            },
            value: {
                type: String
            }
        }
    }
    static get styles() {
        return [r, i `
				:host {
					display: inline-block;
					width: 100%;
				}
				:host([hidden]) {
					display: none;
				}
				d2l-button-icon {
					--d2l-button-icon-min-height: 1.5rem;
					--d2l-button-icon-min-width: 1.5rem;
					--d2l-button-icon-border-radius: 4px;
					--d2l-focus-ring-offset: 1px;
					margin-inline: 0.3rem;
				}
			`]
    }
    constructor() {
        super(), t(this, h), this._inputTimeout = void 0, this._lastSearchValue = "", this._suppressEnter = !1, this.disabled = !1, this.noClear = !1, this.searchOnInput = !1, this.value = ""
    }
    get lastSearchValue() {
        return this._lastSearchValue
    }
    set lastSearchValue(t) {}
    static get focusElementSelector() {
        return "d2l-input-text"
    }
    connectedCallback() {
        super.connectedCallback(), void 0 !== this.value && null !== this.value && this._setLastSearchValue(this.value)
    }
    render() {
        const t = this._computeShowSearch() ? l `
			<d2l-button-icon
				?disabled="${this.disabled}"
				icon="tier1:search"
				@click="${this.search}"
				slot="right"
				text="${this.localize("components.input-search.search")}"></d2l-button-icon>` : l `
			<d2l-button-icon
				@click="${this._handleClearClick}"
				?disabled="${this.disabled}"
				icon="tier1:close-default"
				slot="right"
				text="${this.localize("components.input-search.clear")}"></d2l-button-icon>`;
        return l `
			<d2l-input-text
				label="${o(this.label)}"
				label-hidden
				@d2l-input-text-layout-updated="${e(h,this,p)}"
				description="${this.description}"
				?disabled="${this.disabled}"
				@input="${this._handleInput}"
				@keypress="${this._handleInputKeyPress}"
				maxlength="${o(this.maxlength)}"
				placeholder="${this.placeholder||this.localize("components.input-search.defaultPlaceholder")}"
				type="search"
				.value="${this.value}">
				${t}
				<slot slot="inline-help" name="inline-help"></slot>
			</d2l-input-text>
		`
    }
    search() {
        this._setLastSearchValue(this.value), this._dispatchEvent(), !this.noClear && this.value.length > 0 && this.updateComplete.then(() => {
            this.shadowRoot && this.shadowRoot.querySelector("d2l-button-icon").focus()
        })
    }
    _computeShowSearch() {
        const t = void 0 === this.value || null === this.value || "" === this.value,
            e = void 0 === this.lastSearchValue || null === this.lastSearchValue || "" === this.lastSearchValue;
        return t && e || this.lastSearchValue !== this.value || this.noClear
    }
    _debounceInput() {
        clearTimeout(this._inputTimeout), this._setLastSearchValue(this.value), this._inputTimeout = setTimeout(() => this._dispatchEvent(), 400)
    }
    _dispatchEvent() {
        this.dispatchEvent(new CustomEvent("d2l-input-search-searched", {
            bubbles: !0,
            composed: !1,
            detail: {
                value: this.value
            }
        }))
    }
    _handleClearClick() {
        this.value = "", this.value !== this.lastSearchValue && (this._setLastSearchValue(""), this._dispatchEvent()), this.shadowRoot && this.shadowRoot.querySelector("d2l-input-text").focus()
    }
    _handleInput(t) {
        this.value = t.target.value, this.searchOnInput && this._debounceInput()
    }
    _handleInputKeyPress(t) {
        if (13 !== t.keyCode) return;
        t.preventDefault();
        const e = this._setLastSearchValue(this.value);
        this._suppressEnter && !e || (this._suppressEnter = !0, setTimeout(() => this._suppressEnter = !1, 1e3), this._dispatchEvent())
    }
    _setLastSearchValue(t) {
        const e = this._lastSearchValue;
        return this._lastSearchValue = t, this.requestUpdate("lastSearchValue", e), e !== t
    }
}

function p() {
    requestAnimationFrame(() => {
        this.dispatchEvent(new CustomEvent("d2l-input-search-layout-updated", {
            bubbles: !1,
            composed: !1
        }))
    })
}
customElements.define("d2l-input-search", u);