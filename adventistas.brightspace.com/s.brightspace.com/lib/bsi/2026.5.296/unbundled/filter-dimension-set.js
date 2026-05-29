import {
    a as t,
    b as e
} from "./lit-element.js";
customElements.define("d2l-filter-dimension-set", class extends t {
    static get properties() {
        return {
            hasMore: {
                type: Boolean,
                attribute: "has-more"
            },
            headerText: {
                type: String,
                attribute: "header-text"
            },
            introductoryText: {
                type: String,
                attribute: "introductory-text"
            },
            key: {
                type: String
            },
            loading: {
                type: Boolean
            },
            minWidth: {
                type: Number
            },
            ignoreEnforceSelectionSingle: {
                type: Boolean,
                attribute: "ignore-enforce-selection-single"
            },
            searchType: {
                type: String,
                attribute: "search-type"
            },
            selectAll: {
                type: Boolean,
                attribute: "select-all"
            },
            selectedFirst: {
                type: Boolean,
                attribute: "selected-first"
            },
            selectionSingle: {
                type: Boolean,
                attribute: "selection-single"
            },
            text: {
                type: String
            },
            valueOnlyActiveFilterText: {
                type: Boolean,
                attribute: "value-only-active-filter-text"
            }
        }
    }
    constructor() {
        super(), this.headerText = "", this.introductoryText = "", this.loading = !1, this.hasMore = !1, this.ignoreEnforceSelectionSingle = !1, this.searchType = "automatic", this.selectAll = !1, this.selectedFirst = !1, this.selectionSingle = !1, this.text = "", this.valueOnlyActiveFilterText = !1, this._searchEmptyStatesSlot = null, this._setEmptyStatesSlot = null, this._slot = null
    }
    firstUpdated(t) {
        super.firstUpdated(t), this.addEventListener("d2l-filter-dimension-set-value-data-change", this._handleDimensionSetValueDataChange)
    }
    render() {
        return e `
			<slot @slotchange="${this._handleSlotChange}"></slot>
			<slot name="search-empty-state" @slotchange="${this._handleSearchEmptyStateSlotChange}"></slot>
			<slot name="set-empty-state" @slotchange="${this._handleSetEmptyStateSlotChange}"></slot>
		`
    }
    updated(t) {
        super.updated(t);
        const e = new Map;
        t.forEach((t, a) => {
            void 0 !== t && ("text" !== a && "loading" !== a && "hasMore" !== a && "selectedFirst" !== a || e.set(a, this[a]))
        }), e.size > 0 && this._dispatchDataChangeEvent({
            dimensionKey: this.key,
            changes: e
        })
    }
    willUpdate(t) {
        t.has("hasMore") && this.hasMore && ("manual" !== this.searchType ? (console.warn("Paging requires search type set to manual."), this.hasMore = !1) : this.selectedFirst = !0)
    }
    getSearchEmptyState() {
        return this._getEmptyState(this._searchEmptyStateSlot, "search")
    }
    getSetEmptyState() {
        return this._getEmptyState(this._setEmptyStateSlot, "set")
    }
    getValues() {
        const t = this._getSlottedNodes();
        let e, a = !1,
            s = !1;
        const i = t.map(t => (t._noSearchSupport && (a = !0), t._enforceSingleSelection && (s = !0), t._minWidth && (e = e ? Math.max(t._minWidth, e) : t._minWidth), t.getValueDetails()));
        return a && (this.searchType = "none"), s && !this.ignoreEnforceSelectionSingle && (this.selectionSingle = !0), e && (this.minWidth = e), i
    }
    _dispatchDataChangeEvent(t) {
        this.dispatchEvent(new CustomEvent("d2l-filter-dimension-data-change", {
            detail: t,
            bubbles: !0,
            composed: !1
        }))
    }
    _getEmptyState(t, e) {
        if (!t) return null;
        const a = t.assignedNodes({
            flatten: !0
        }).find(t => t.nodeType === Node.ELEMENT_NODE && "d2l-filter-dimension-set-empty-state" === t.tagName.toLowerCase());
        return a ? {
            actionHref: a.actionHref,
            actionText: a.actionText,
            description: a.description,
            type: e
        } : null
    }
    _getSlottedNodes() {
        if (!this._slot) return [];
        return this._slot.assignedNodes({
            flatten: !0
        }).filter(t => t.nodeType === Node.ELEMENT_NODE && t._filterSetValue)
    }
    _handleDimensionSetValueDataChange(t) {
        t.stopPropagation(), this._dispatchDataChangeEvent({
            dimensionKey: this.key,
            valueKey: t.detail.valueKey,
            changes: t.detail.changes,
            dispatchChangeEvent: t.detail.dispatchChangeEvent
        })
    }
    _handleSearchEmptyStateSlotChange(t) {
        this._searchEmptyStateSlot || (this._searchEmptyStateSlot = t.target), this._dispatchDataChangeEvent({
            dimensionKey: this.key,
            changes: new Map([
                ["searchEmptyState", this.getSearchEmptyState()]
            ])
        })
    }
    _handleSetEmptyStateSlotChange(t) {
        this._setEmptyStateSlot || (this._setEmptyStateSlot = t.target), this._dispatchDataChangeEvent({
            dimensionKey: this.key,
            changes: new Map([
                ["setEmptyState", this.getSetEmptyState()]
            ])
        })
    }
    _handleSlotChange(t) {
        this._slot || (this._slot = t.target);
        const e = this.getValues();
        this._dispatchDataChangeEvent({
            dimensionKey: this.key,
            changes: new Map([
                ["values", e]
            ])
        })
    }
});