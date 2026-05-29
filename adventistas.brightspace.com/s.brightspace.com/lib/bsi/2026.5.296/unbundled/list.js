import {
    i as t,
    b as e,
    a as s
} from "./lit-element.js";
import {
    c as i,
    d as o
} from "./focus.js";
import {
    S as l,
    a as n
} from "./selection-mixin.js";
import {
    o as a
} from "./if-defined.js";
import {
    P as r
} from "./pageable-mixin.js";
import {
    S as d
} from "./subscriberControllers.js";
const h = 9,
    c = Object.freeze({
        list: "list",
        tiles: "tiles"
    }),
    u = [842, 636, 580, 0],
    p = new ResizeObserver(t => {
        t.forEach(t => {
            t ? .target ? .resizedCallback && t.target.resizedCallback(t.contentRect ? .width)
        })
    });
class m extends(r(n(s))) {
    static get properties() {
        return {
            addButton: {
                type: Boolean,
                reflect: !0,
                attribute: "add-button"
            },
            addButtonText: {
                type: String,
                reflect: !0,
                attribute: "add-button-text"
            },
            breakpoints: {
                type: Array
            },
            dragHandleShowAlways: {
                type: Boolean,
                attribute: "drag-handle-show-always"
            },
            dragMultiple: {
                type: Boolean,
                reflect: !0,
                attribute: "drag-multiple"
            },
            dropNestedOnly: {
                type: Boolean,
                attribute: "drop-nested-only"
            },
            extendSeparators: {
                type: Boolean,
                reflect: !0,
                attribute: "extend-separators"
            },
            grid: {
                type: Boolean
            },
            label: {
                type: String
            },
            layout: {
                type: String,
                reflect: !0
            },
            separators: {
                type: String,
                reflect: !0
            },
            selectionWhenInteracted: {
                type: Boolean,
                attribute: "selection-when-interacted",
                reflect: !0
            },
            _breakpoint: {
                type: Number,
                reflect: !0
            },
            _slimColor: {
                type: Boolean,
                reflect: !0,
                attribute: "_slim-color"
            }
        }
    }
    static get styles() {
        return t `
			:host {
				--d2l-list-item-color-border-radius: 6px;
				--d2l-list-item-color-width: 6px;
				--d2l-list-item-illustration-margin-inline-end: 0.9rem;
				--d2l-list-item-illustration-max-height: 2.6rem;
				--d2l-list-item-illustration-max-width: 4.5rem;
				display: block;
			}
			:host([layout="tiles"]) > .d2l-list-content {
				display: flex;
				flex-wrap: wrap;
				gap: 0.9rem;
				justify-content: normal;
			}
			:host(:not([slot="nested"])) > .d2l-list-content {
				padding-bottom: 1px;
			}
			:host([hidden]) {
				display: none;
			}
			slot[name="pager"]::slotted(*) {
				margin-top: 10px;
			}
			:host([extend-separators]) slot[name="pager"]::slotted(*) {
				margin-left: 0.9rem;
				margin-right: 0.9rem;
			}
			:host([_breakpoint="1"]) {
				--d2l-list-item-illustration-max-height: 3.55rem;
				--d2l-list-item-illustration-max-width: 6rem;
			}
			:host([_breakpoint="2"]) {
				--d2l-list-item-illustration-max-height: 5.1rem;
				--d2l-list-item-illustration-max-width: 9rem;
			}
			:host([_breakpoint="3"]) {
				--d2l-list-item-illustration-max-height: 6rem;
				--d2l-list-item-illustration-max-width: 10.8rem;
			}
			:host([_slim-color]) {
				--d2l-list-item-color-border-radius: 3px;
				--d2l-list-item-color-width: 3px;
			}
			:host([add-button]) ::slotted([slot="controls"]) {
				margin-bottom: calc(6px + 0.4rem); /* controls section margin-bottom + spacing for add-button */
			}

			::slotted(.d2l-list-tile-break) {
				display: none;
			}
			:host([layout="tiles"]) ::slotted(.d2l-list-tile-break) {
				display: block;
				flex-basis: 100%;
				height: 0;
			}
		`
    }
    constructor() {
        super(), this.addButton = !1, this.breakpoints = u, this.dragMultiple = !1, this.extendSeparators = !1, this.grid = !1, this.layout = c.list, this._listItemChanges = [], this._childHasColor = !1, this._childHasExpandCollapseToggle = !1, this._breakpoint = 0, this._slimColor = !1, this._width = 0, this._listChildrenUpdatedSubscribers = new d(this, "list-child-status", {
            onSubscribe: this._updateActiveSubscriber.bind(this),
            updateSubscribers: this._updateActiveSubscribers.bind(this)
        })
    }
    get breakpoints() {
        return this._breakpoints
    }
    set breakpoints(t) {
        const e = this._breakpoints;
        this._breakpoints = t !== u ? t.sort((t, e) => e - t).slice(0, 4) : u, this.requestUpdate("breakpoints", e)
    }
    connectedCallback() {
        super.connectedCallback(), this.addEventListener("d2l-list-item-showing-count-change", this._handleListItemShowingCountChange), this.addEventListener("d2l-list-item-nested-change", t => this._handleListItemNestedChange(t)), this.addEventListener("d2l-list-item-property-change", t => this._handleListItemPropertyChange(t)), this.addEventListener("d2l-list-item-add-button-click", t => this._handleListItemAddButtonClick(t)), p.observe(this)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._intersectionObserver && this._intersectionObserver.disconnect(), p.unobserve(this)
    }
    firstUpdated(t) {
        super.firstUpdated(t), this._handleListItemNestedChange(), this.addEventListener("d2l-list-item-selected", t => {
            this._updateItemShowSelection(), 0 === this._listItemChanges.length && setTimeout(() => {
                this.dispatchEvent(new CustomEvent("d2l-list-selection-changes", {
                    detail: this._listItemChanges
                })), this._listItemChanges = []
            }, 60), this._listItemChanges.push(t.detail), setTimeout(() => {
                this.dispatchEvent(new CustomEvent("d2l-list-selection-change", {
                    bubbles: !0,
                    composed: !0,
                    detail: t.detail
                }))
            }, 0)
        })
    }
    render() {
        const t = this.grid ? "application" : "list",
            s = "nested" !== this.slot ? this.label : void 0;
        return e `
			<slot name="controls"></slot>
			<slot name="header"></slot>
			<div role="${t}" aria-label="${a(s)}" class="d2l-list-content">
				<slot @keydown="${this._handleKeyDown}" @slotchange="${this._handleSlotChange}"></slot>
			</div>
			${this._renderPagerContainer()}
		`
    }
    willUpdate(t) {
        super.willUpdate(t), t.has("breakpoints") && void 0 !== t.get("breakpoints") && this.resizedCallback(this.offsetWidth, !0), (t.has("add-button") || t.has("add-button-text")) && this._listChildrenUpdatedSubscribers.updateSubscribers(), t.has("grid") && this.grid && (this.selectionNoInputArrowKeyBehaviour = !0), t.has("layout") && void 0 !== t.get("layout") && this.layout && this._updateItemLayouts(), t.has("selectionWhenInteracted") && this._updateItemShowSelection(), t.has("dragHandleShowAlways") && this._updateItemDragHandleShowAlways()
    }
    getItems(t) {
        if (this.shadowRoot) return t || (t = this.shadowRoot.querySelector("slot:not([name])")), t ? t.assignedNodes({
            flatten: !0
        }).filter(t => t.nodeType === Node.ELEMENT_NODE && ("row" === t.role || "listitem" === t.role)) : []
    }
    getListItemByKey(t) {
        const e = this.getItems();
        for (let s = 0; s < e.length; s++) {
            if (e[s].key === t) return e[s];
            if (e[s]._selectionProvider) {
                const i = e[s]._selectionProvider.getListItemByKey(t);
                if (i) return i
            }
        }
        return null
    }
    getListItemCount() {
        return this.getItems().length
    }
    getListItemIndex(t) {
        return this.getItems().indexOf(t)
    }
    getSelectedListItems(t) {
        let e = [];
        return this.getItems().forEach(s => {
            s.selected && e.push(s), t && s._selectionProvider && (e = [...e, ...s._selectionProvider.getSelectedListItems(t)])
        }), e
    }
    getSelectionInfo(t) {
        const e = super.getSelectionInfo();
        if (!t) return e;
        let s = e.state,
            i = e.keys;
        return this.getItems().forEach(t => {
            if (t._selectionProvider) {
                const e = t._selectionProvider.getSelectionInfo(!0);
                s === l.states.notSet ? s = e.state : s === l.states.none && e.state !== l.states.notSet && e.state !== l.states.none ? s = l.states.some : s !== l.states.all || e.state !== l.states.some && e.state !== l.states.none || (s = l.states.some), i = [...i, ...t._selectionProvider.getSelectionInfo(!0).keys]
            }
        }), new l(i, s)
    }
    resizedCallback(t, e) {
        if (this._width === t && !e) return;
        this._width = t, this._slimColor = t < 400;
        this.breakpoints.some((e, s) => {
            if (t >= e || s > 3) return this._breakpoint = 3 - s - (3 - this.breakpoints.length + 1) * s, !0
        })
    }
    setSelectionForAll(t, e) {
        super.setSelectionForAll(t, e), this.getItems().forEach(s => {
            !s.selectable && s._selectionProvider && s._selectionProvider.setSelectionForAll(t, e)
        })
    }
    _getItemByIndex(t) {
        return (this.getItems() || [])[t]
    }
    _getItemShowingCount() {
        return this.getItems().length
    }
    _getLazyLoadItems() {
        const t = this.getItems();
        return t.length > 0 ? t[0]._getFlattenedListItems().lazyLoadListItems : new Map
    }
    _handleKeyDown(t) {
        if (!this.grid || "nested" === this.slot || t.keyCode !== h) return;
        if (t.preventDefault(), !this.shadowRoot) return;
        const e = this.shadowRoot.querySelector("slot:not([name])"),
            s = t.shiftKey ? i(e) : o(e, !1, !0, !0);
        s && s.focus()
    }
    _handleListItemAddButtonClick(t) {
        t.stopPropagation(), this.dispatchEvent(new CustomEvent("d2l-list-add-button-click", {
            detail: {
                key: t.target.key,
                position: t.detail.position
            }
        }))
    }
    _handleListItemNestedChange(t) {
        t && t.stopPropagation();
        const e = this.getItems();
        let s = !1,
            i = !1;
        for (const t of e)
            if (t.color && (s = !0), t.expandable && (i = !0), i && s) break;
        this._childHasColor = s, this._childHasExpandCollapseToggle = i, this._listChildrenUpdatedSubscribers.updateSubscribers()
    }
    _handleListItemPropertyChange(t) {
        if ("color" === t.detail.name) t.stopPropagation(), t.detail.value ? (this._childHasColor = !0, this._listChildrenUpdatedSubscribers.updateSubscribers()) : this._handleListItemNestedChange(t);
        else if ("current" === t.detail.name) {
            if ("nested" === this.slot) return;
            if (t.stopPropagation(), !t.detail.value) return void t.target.dispatchSetChildCurrentEvent(!1);
            const e = this.querySelectorAll("[current]");
            e.length > 2 && console.warn("d2l-list: More than one list item has been set to current. This is not allowed and will cause unexpected behavior.");
            const s = t.target;
            let i = !1;
            if (e.forEach(t => {
                    t !== s && (i = t)
                }), i) {
                this.addEventListener("d2l-list-item-nav-set-child-current", t => {
                    t.stopPropagation(), s.dispatchSetChildCurrentEvent(!0)
                }, {
                    once: !0
                }), i.current = !1;
                const t = this.querySelector("[_has-current-parent]");
                t && (t._hasCurrentParent = !1);
                const e = this.querySelectorAll("[_next-sibling-current]");
                e.length > 0 && e.forEach(t => {
                    t._nextSiblingCurrent = !1
                })
            } else s.dispatchSetChildCurrentEvent(!0)
        }
    }
    _handleListItemShowingCountChange() {
        "nested" !== this.slot && (this._updateItemShowingCountRequested || (this._updateItemShowingCountRequested = !0, setTimeout(() => {
            this._updateItemShowingCount(), this._updateItemShowingCountRequested = !1
        }, 0)))
    }
    _handleSlotChange() {
        this._updateItemShowingCount();
        const t = this.getItems();
        t.forEach((e, s) => {
            1 === t.length ? (e.first = !0, e.last = !0) : 0 === s ? (e.first = !0, e.last = !1) : s === t.length - 1 ? (e.first = !1, e.last = !0) : (e.first = !1, e.last = !1)
        }), this._updateItemLayouts(t), this._updateItemShowSelection(t), this._updateItemDragHandleShowAlways(t), this.dispatchEvent(new CustomEvent("d2l-list-item-showing-count-change", {
            bubbles: !0,
            composed: !0
        }))
    }
    _updateActiveSubscriber(t) {
        t.updateSiblingHasChildren(this._childHasExpandCollapseToggle), t.updateSiblingHasColor(this._childHasColor), t.updateParentHasAddButon(this.addButton, this.addButtonText)
    }
    _updateActiveSubscribers(t) {
        t.forEach(t => {
            t.updateSiblingHasChildren(this._childHasExpandCollapseToggle), t.updateSiblingHasColor(this._childHasColor), t.updateParentHasAddButon(this.addButton, this.addButtonText)
        })
    }
    _updateItemDragHandleShowAlways(t) {
        t || (t = this.getItems()), t.forEach(t => t._dragHandleShowAlways = this.dragHandleShowAlways)
    }
    _updateItemLayouts(t) {
        t || (t = this.getItems()), t.forEach(t => t.layout = this.layout === c.tiles ? "tile" : "normal")
    }
    _updateItemShowSelection(t) {
        t || (t = this.getItems());
        const e = this.getSelectionInfo().state;
        t.forEach(t => {
            t._selectionWhenInteracted = this.selectionWhenInteracted, t._forceShowSelection = this.selectionWhenInteracted && (e === l.states.some || e === l.states.all)
        })
    }
}
customElements.define("d2l-list", m);