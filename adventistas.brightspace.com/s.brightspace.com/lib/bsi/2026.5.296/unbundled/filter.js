import {
    _ as e,
    b as t,
    c as i,
    a as s
} from "./_rollupPluginBabelHelpers.js";
import "./colors.js";
import "./count-badge.js";
import "./button-icon.js";
import "./button-subtle.js";
import "./dropdown.js";
import "./dropdown-content.js";
import "./dropdown-menu.js";
import "./empty-state-action-button.js";
import "./empty-state-action-link.js";
import "./empty-state-simple.js";
import "./expand-collapse-content.js";
import {
    i as n,
    b as l,
    a as o,
    A as a
} from "./lit-element.js";
import {
    H as r
} from "./menu.js";
import "./icon.js";
import "./input-search.js";
import "./list.js";
import "./list-item.js";
import "./loading-spinner.js";
import "./menu-item.js";
import "./pager-load-more.js";
import "./selection-select-all.js";
import "./selection-summary.js";
import "./tooltip.js";
import {
    b as d,
    c,
    a as h,
    h as p
} from "./styles.js";
import {
    o as m,
    g as u
} from "./overflow.js";
import {
    a as y
} from "./announce.js";
import {
    e as _
} from "./class-map.js";
import {
    F as f
} from "./focus-mixin.js";
import {
    f as v
} from "./number.js";
import {
    o as g
} from "./if-defined.js";
import {
    L as b
} from "./localize-core-element.js";
import {
    o as x
} from "./offscreen.js";
import {
    o as $
} from "./style-map.js";
import {
    S as D
} from "./subscriberControllers.js";
import "./svg-to-css.js";
import "./count-badge-mixin.js";
import "./uniqueId.js";
import "./skeleton-mixin.js";
import "./dedupeMixin.js";
import "./focus.js";
import "./dom.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./directive.js";
import "./common.js";
import "./localize-mixin.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
import "./visible-on-ancestor-mixin.js";
import "./button-styles.js";
import "./property-required-mixin.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
import "./icon-styles.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./dropdown-opener-mixin.js";
import "./dropdown-opener-styles.js";
import "./dropdown-popover-mixin.js";
import "./button.js";
import "./link.js";
import "./empty-state-mixin.js";
import "./menu-item-styles.js";
import "./input-text.js";
import "./input-inline-help.js";
import "./input-label-styles.js";
import "./input-styles.js";
import "./labelled-mixin.js";
import "./rtl-mixin.js";
import "./selection-mixin.js";
import "./collection-mixin.js";
import "./pageable-mixin.js";
import "./list-item-link-mixin.js";
import "./list-item-mixin.js";
import "./input-checkbox.js";
import "./interactive-mixin.js";
import "./composeMixins.js";
import "./color.js";
import "./selection-input.js";
import "./input-radio-styles.js";
import "./button-move.js";
import "./waitForElem.js";
import "./list2.js";
import "./pageable-subscriber-mixin.js";
import "./selection-observer-mixin.js";
class C extends(r(o)) {
    static get styles() {
        return [super.styles, n `
			:host {
				display: inline-block;
			}
		`]
    }
    render() {
        return l `
			<div class="d2l-hierarchical-view-content">
				<slot></slot>
			</div>
		`
    }
}
customElements.define("d2l-hierarchical-view", C);
const S = "d2l-filter-dropdown-content",
    w = "list-";
let j = !1,
    E = !1,
    k = !1;
var T = new WeakMap,
    A = new WeakSet;
class F extends(f(b(o))) {
    static get properties() {
        return {
            disabled: {
                type: Boolean,
                reflect: !0
            },
            opened: {
                type: Boolean,
                reflect: !0
            },
            text: {
                type: String
            },
            _activeDimensionKey: {
                type: String,
                attribute: !1
            },
            _dimensions: {
                type: Array,
                attribute: !1
            },
            _displayKeyboardTooltip: {
                state: !0
            },
            _ignoreSlotChanges: {
                type: Boolean
            },
            _minWidth: {
                type: Number,
                attribute: !1
            },
            _totalAppliedCount: {
                type: Number,
                attribute: !1
            }
        }
    }
    static get styles() {
        return [d, c, h, p, x, n `
			[slot="header"] {
				padding: 0.9rem 0.3rem;
			}

			.d2l-filter-dimension-header {
				padding-bottom: 0.9rem;
			}

			.d2l-filter-dimension-header.with-intro {
				padding-bottom: 0.6rem;
			}

			.d2l-filter-dimension-header,
			.d2l-filter-dimension-header-actions {
				align-items: center;
				display: flex;
			}

			.d2l-filter-dimension-header-actions {
				flex-flow: row wrap;
			}

			d2l-input-search {
				flex: 1 0;
				margin-inline: 0.3rem 0.6rem;
			}

			.d2l-filter-dimension-select-all {
				flex-basis: 100%;
				margin-top: 0.9rem;
			}

			d2l-selection-select-all {
				padding: 0 0.6rem;
			}

			.d2l-filter-dimension-header-text {
				flex-grow: 1;
				padding-inline-end: calc(2rem + 2px);
				text-align: center;
				${m}
			}

			.d2l-filter-dimension-set-value {
				align-items: center;
				color: var(--d2l-color-ferrite);
				display: flex;
				gap: 0.45rem;
				line-height: unset;
			}
			.d2l-filter-dimension-set-value d2l-icon {
				flex-shrink: 0;
			}
			d2l-expand-collapse-content[expanded] {
				margin-inline-start: -2.1rem;
				padding-block: 0.8rem 0.4rem;
			}
			d2l-list-item.expanding-content {
				overflow-y: hidden;
			}

			.d2l-filter-dimension-set-value-text {
				hyphens: auto;
				${u({lines:2})}
			}

			d2l-list-item[selection-disabled] .d2l-filter-dimension-set-value,
			d2l-list-item[selection-disabled] .d2l-body-small {
				color: var(--d2l-color-chromite);
			}

			.d2l-filter-dimension-intro-text {
				margin: 0;
				padding: 0.6rem 1.5rem 1.5rem;
				text-align: center;
			}

			.d2l-filter-dimension-intro-text.multi-dimension {
				padding: 0 1.5rem 1.5rem;
			}

			.d2l-empty-state-container {
				padding: 0.9rem 0.9rem calc(0.9rem - 5px);
			}

			.list-header-text {
				color: var(--d2l-color-ferrite);
				margin: 0;
				padding-bottom: 0.05rem;
				padding-top: 0.65rem;
			}

			.d2l-filter-dimension-info-message {
				color: var(--d2l-color-ferrite);
				display: flex;
				justify-content: center;
			}

			/* Needed to "undo" the menu-item style for multiple dimensions */
			d2l-hierarchical-view {
				cursor: auto;
			}

			d2l-loading-spinner {
				padding-top: 0.6rem;
				width: 100%;
			}
		`]
    }
    constructor() {
        super(), e(this, A), t(this, T, void 0), this.disabled = !1, this.opened = !1, this._changeEventsToDispatch = new Map, this._dimensions = [], this._displayKeyboardTooltip = !1, this._ignoreSlotChanges = !1, this._minWidth = 285, this._openedDimensions = [], this._totalAppliedCount = 0, this._activeFilters = null, this._activeFiltersSubscribers = new D(this, "active-filters", {
            onSubscribe: this._updateActiveFiltersSubscriber.bind(this),
            updateSubscribers: this._updateActiveFiltersSubscribers.bind(this)
        }), this._spacePressedDuringLastSelection = !1
    }
    static get focusElementSelector() {
        return "d2l-button-subtle"
    }
    connectedCallback() {
        super.connectedCallback(), k || (k = !0, document.addEventListener("keydown", e => {
            " " === e.key && (E = !0)
        }), document.addEventListener("keyup", e => {
            " " === e.key && (E = !1)
        }))
    }
    disconnectedCallback() {
        super.disconnectedCallback(), i(T, this) && i(T, this).disconnect()
    }
    firstUpdated(e) {
        super.firstUpdated(e), this.addEventListener("d2l-filter-dimension-data-change", this._handleDimensionDataChange)
    }
    render() {
        const e = 1 === this._dimensions.length,
            t = this._buildHeader(e),
            i = this._buildDimensions(e),
            s = e ? this._dimensions[0].text : this.text || this.localize("components.filter.filters");
        let n = e ? this.localize("components.filter.singleDimensionDescription", {
            filterName: this._dimensions[0].text
        }) : this.localize("components.filter.filters");
        n += `. ${this.localize("components.filter.filterCountDescription",{number:this._totalAppliedCount})}`;
        const o = e ? l `
				<d2l-dropdown-content
					class="vdiff-target ${S}"
					min-width="${this._minWidth}"
					max-width="420"
					mobile-tray="right"
					mobile-breakpoint="768"
					no-padding-header
					no-padding
					?opened="${this.opened}"
					?trap-focus="${!this._isDimensionEmpty(this._dimensions[0])}">
					${t}
					${i}
				</d2l-dropdown-content>` : l `
				<d2l-dropdown-menu
					class="vdiff-target ${S}"
					min-width="${this._minWidth}"
					max-width="420"
					mobile-tray="right"
					mobile-breakpoint="768"
					no-padding-header
					?opened="${this.opened}"
					trap-focus>
					${t}
					<d2l-menu label="${this.localize("components.filter.filters")}">
						${i}
					</d2l-menu>
				</d2l-dropdown-menu>
			`,
            r = this._totalAppliedCount ? l `
				<d2l-count-badge
					aria-hidden="true"
					max-digits="2"
					type="count"
					number="${this._totalAppliedCount}">
				</d2l-count-badge>` : a;
        return l `
			<d2l-dropdown
				@d2l-dropdown-close="${this._handleDropdownClose}"
				@d2l-dropdown-open="${this._handleDropdownOpen}"
				@d2l-dropdown-position="${this._stopPropagation}"
				class="vdiff-target"
				?disabled="${this.disabled}">
				<d2l-button-subtle
					class="d2l-dropdown-opener"
					description="${n}"
					text="${s}"
					icon="tier1:chevron-down"
					icon-right
					?disabled="${this.disabled}">
					${r}
				</d2l-button-subtle>
				${o}
			</d2l-dropdown>
			<slot @slotchange="${this._handleSlotChange}"></slot>
		`
    }
    willUpdate(e) {
        super.willUpdate(e), e.has("opened") && this.opened && 1 === this._dimensions.length && this._dimensions[0].selectedFirst && this._updateDimensionShouldBubble(this._dimensions[0]), e.has("_dimensions") && (this._setFilterCounts(), this._activeFiltersSubscribers.updateSubscribers())
    }
    requestFilterChangeEvent(e, t) {
        this.dispatchEvent(new CustomEvent("d2l-filter-change", {
            bubbles: !0,
            composed: !1,
            detail: {
                allCleared: e,
                dimensions: t
            }
        }))
    }
    requestFilterClearAll() {
        this._handleClearAll()
    }
    requestFilterDimensionFirstOpenEvent(e) {
        this._openedDimensions.push(e), this.dispatchEvent(new CustomEvent("d2l-filter-dimension-first-open", {
            bubbles: !0,
            composed: !1,
            detail: {
                key: e
            }
        }))
    }
    requestFilterLoadMoreEvent(e, t, i = () => {}) {
        const s = this._getSearchCallback(e);
        this.dispatchEvent(new CustomEvent("d2l-filter-dimension-load-more", {
            detail: {
                key: e,
                value: t,
                loadMoreCompleteCallback: e => {
                    s(e), i(e)
                }
            },
            bubbles: !0,
            composed: !1
        }))
    }
    requestFilterSearchEvent(e, t, i = () => {}) {
        const s = this._getDimensionByKey(e);
        s.searchValue = t, s.loading = !0, this.requestUpdate();
        const n = this._getSearchCallback(e);
        this.dispatchEvent(new CustomEvent("d2l-filter-dimension-search", {
            bubbles: !0,
            composed: !1,
            detail: {
                key: s.key,
                value: s.searchValue,
                searchCompleteCallback: e => {
                    n(e), i(e)
                }
            }
        }))
    }
    requestFilterValueClear(e) {
        const t = this._getDimensionByKey(e.dimension);
        if ("d2l-filter-dimension-set" === t.type) this._performChangeSetDimension(t, [{
            key: e.value,
            selected: !1
        }])
    }
    _buildDimension(e, t) {
        let i;
        if ("d2l-filter-dimension-set" === e.type) i = l `
				<div class="d2l-filter-container">
					${this._createSetDimension(e)}
				</div>`;
        return t ? i : l `
			<d2l-hierarchical-view
				@d2l-hierarchical-view-hide-start="${this._handleDimensionHideStart}"
				@d2l-hierarchical-view-show-complete="${this._handleDimensionShowComplete}"
				@d2l-hierarchical-view-show-start="${this._handleDimensionShowStart}"
				@keydown="${this._handleDimensionHideKeyDown}"
				data-key="${e.key}">
				${i}
			</d2l-hierarchical-view>
		`
    }
    _buildDimensions(e) {
        return e ? this._buildDimension(this._dimensions[0], !0) : this._dimensions.map(e => {
            const t = this._buildDimension(e),
                i = `filters-applied-count-${e.key}`,
                s = `${this.localize("components.filter.filterCountDescription",{number:e.appliedCount})}`;
            return l `<d2l-menu-item text="${e.text}" description="${e.text}." aria-describedby="${i}">
				<div slot="supporting">
					<d2l-count-badge id="${i}" number="${e.appliedCount}" max-digits="2" text="${s}" hide-zero></d2l-count-badge>
				</div>
				${t}
			</d2l-menu-item>`
        })
    }
    _buildHeader(e) {
        if (!this._activeDimensionKey && !e) return l `
				<d2l-button-subtle
					slot="header"
					@click="${this._handleClearAll}"
					?disabled="${0===this._totalAppliedCount}"
					description="${this.text?this.localize("components.filter.clearAllDescriptionOverride",{filterText:this.text}):this.localize("components.filter.clearAllDescription")}"
					text="${this.localize("components.filter.clearAll")}">
				</d2l-button-subtle>
			`;
        const t = this._getActiveDimension(),
            i = {
                "d2l-body-compact": !0,
                "d2l-filter-dimension-intro-text": !0,
                "multi-dimension": !e
            },
            n = t.introductoryText ? l `
			<p class="${_(i)}">${t.introductoryText}</p>` : a,
            o = l `
			<d2l-button-subtle
				@click="${this._handleClear}"
				?disabled="${t.loading||0===t.appliedCount}"
				description="${this.localize("components.filter.clearDescription",{filterName:t.text})}"
				text="${this.localize("components.filter.clear")}">
			</d2l-button-subtle>
		`,
            r = "none" === t.searchType ? a : l `
			<d2l-input-search
				@d2l-input-search-searched="${this._handleSearch}"
				@d2l-input-search-layout-updated="${s(A,this,K)}"
				?disabled="${this._isDimensionEmpty(t)}"
				label="${this.localize("components.input-search.search")}"
				value="${g(t.searchValue)}">
			</d2l-input-search>
		`,
            d = !t.selectAllIdPrefix || t.searchValue || t.loading || this._isDimensionEmpty(t) ? null : l `
			<div class="d2l-filter-dimension-select-all">
				<d2l-selection-select-all
					selection-for="${t.selectAllIdPrefix}${t.key}">
				</d2l-selection-select-all>
				<d2l-selection-summary
					selection-for="${t.selectAllIdPrefix}${t.key}"
					no-selection-text="${this.localize("components.selection.select-all")}">
				</d2l-selection-summary>
			</div>
		`,
            c = l `
			<div class="d2l-filter-dimension-header-actions">
				${o}
				${r}
				${d}
			</div>
		`,
            h = {
                "d2l-filter-dimension-header": !0,
                "with-intro": t.introductoryText
            },
            p = e ? a : l `
			<div class="${_(h)}">
				<d2l-button-icon
					@click="${this._handleDimensionHide}"
					icon="tier1:chevron-left"
					text="${this.localize("components.menu-item-return.returnCurrentlyShowing","menuTitle",t.text)}">
				</d2l-button-icon>
				<div class="d2l-filter-dimension-header-text d2l-body-standard">${t.text}</div>
			</div>
		`;
        return l `
			<div slot="header" @keydown="${this._handleDimensionHideKeyDown}">
				${p}
				${n}
				${c}
			</div>
		`
    }
    _createEmptyState(e, t) {
        let i = a;
        return e.actionText && e.actionHref ? i = l `
				<d2l-empty-state-action-link
					href="${e.actionHref}"
					text="${e.actionText}">
				</d2l-empty-state-action-link>
			` : e.actionText && (i = l `
				<d2l-empty-state-action-button
					@d2l-empty-state-action="${this._handleEmptyStateAction}"
					data-dimension-key="${t}"
					data-type="${e.type}"
					text="${e.actionText}">
				</d2l-empty-state-action-button>
			`), l `
			<d2l-empty-state-simple
				class="d2l-filter-dimension-info-message"
				description="${e.description}">
				${i}
			</d2l-empty-state-simple>
		`
    }
    _createSetDimension(e) {
        if (e.loading) return l `
				<d2l-loading-spinner></d2l-loading-spinner>
				<p class="d2l-offscreen" aria-busy="true" role="alert">${this.localize("components.filter.loading")}</p>
			`;
        if (e.minWidth && (this._minWidth = Math.max(e.minWidth, this._minWidth)), this._isDimensionEmpty(e)) {
            const t = e.setEmptyState ? this._createEmptyState(e.setEmptyState, e.key) : l `
					<d2l-empty-state-simple
						class="d2l-filter-dimension-info-message"
						description="${this.localize("components.filter.noFilters")}">
					</d2l-empty-state-simple>
				`;
            return l `
				<div class="d2l-empty-state-container" role="alert">
					${t}
				</div>
			`
        }
        let t = null;
        if (e.searchValue && "" !== e.searchValue) {
            const i = e.values.reduce((e, t) => t.hidden ? e : e + 1, 0),
                s = {
                    "d2l-empty-state-container": !0,
                    "d2l-offscreen": 0 !== i
                },
                n = e.searchEmptyState && 0 === i ? this._createEmptyState(e.searchEmptyState, e.key) : l `
					<d2l-empty-state-simple
						class="d2l-filter-dimension-info-message"
						description="${this.localize("components.filter.searchResults",{number:i})}">
					</d2l-empty-state-simple>
				`;
            if (t = l `
				<div class="${_(s)}" role="alert">
					${n}
				</div>
			`, 0 === i) return t
        }
        let i, s = a;
        e.headerText && "" === e.searchValue && (s = l `
				<d2l-list-item>
					<h4 class="d2l-heading-4 list-header-text" aria-hidden="true">${e.headerText}</h4>
				</d2l-list-item>
			`, i = e.headerText);
        let n = a,
            o = a;
        e.selectedFirst ? (i && (i = this.localize("components.filter.selectedFirstListLabel", {
            headerText: e.headerText
        })), n = e.values.filter(e => e.shouldBubble).map(e => this._createSetDimensionItem(e)), o = e.values.filter(e => !e.shouldBubble).map(e => this._createSetDimensionItem(e))) : o = e.values.map(e => this._createSetDimensionItem(e));
        const r = {
            paddingBlockEnd: e.hasMore ? "10px" : void 0
        };
        return l `
			${t}
			<d2l-list
				id="${w}${e.key}"
				@d2l-list-selection-changes="${this._handleChangeSetDimension}"
				extend-separators
				grid
				label="${g(i)}"
				?selection-single="${e.selectionSingle}"
				separators="between"
				style=${$(r)}>
				${n}
				${s}
				${o}
				<d2l-pager-load-more slot="pager"
					@d2l-pager-load-more="${this._handleDimensionLoadMore}"
					?has-more="${e.hasMore}">
				</d2l-pager-load-more>
			</d2l-list>
		`
    }
    _createSetDimensionItem(e) {
        const t = e.label || e.text,
            i = `list-item-${e.key}`;
        return l `
			<d2l-list-item
				id="${i}"
				@d2l-list-item-selected="${e.additionalContent?this._handleListItemSelected:void 0}"
				?selection-disabled="${e.disabled}"
				?hidden="${e.hidden}"
				key="${e.key}"
				label="${t}"
				?no-primary-action="${e.additionalContent&&e.selected}"
				selectable
				?selected="${e.selected}">
				<div>
					<div class="d2l-filter-dimension-set-value d2l-body-compact">
						<div class="d2l-filter-dimension-set-value-text">${e.text}</div>
						${void 0!==e.count?l`<div class="d2l-body-small">(${v(e.count)})</div>`:a}
						${e.additionalContent?l`<d2l-icon icon="${e.selected?"tier1:arrow-collapse-small":"tier1:arrow-expand-small"}" aria-hidden="true"></d2l-icon>`:a}
					</div>
					${e.additionalContent?l`
						<d2l-expand-collapse-content
							?expanded="${e.selected}"
							@d2l-expand-collapse-content-collapse="${this._handleExpandCollapse}"
							@d2l-expand-collapse-content-expand="${this._handleExpandCollapse}">
							${e.additionalContent()}
						</d2l-expand-collapse-content>
					`:a}
				</div>
			</d2l-list-item>
			${e.additionalContent&&e.selected&&this._displayKeyboardTooltip?l`<d2l-tooltip align="start" announced for="${i}" for-type="descriptor" @d2l-tooltip-hide="${this._handleTooltipHide}">${this.localizeHTML("components.filter.additionalContentTooltip")}</d2l-tooltip>`:a}
		`
    }
    _dispatchChangeEvent(e, t) {
        this._setDimensionChangeEvent(e, t, !1), clearTimeout(this._changeEventTimeout), this._changeEventTimeout = setTimeout(() => {
            this._dispatchChangeEventNow(!1)
        }, 300)
    }
    _dispatchChangeEventNow(e) {
        const t = Array.from(this._changeEventsToDispatch.values());
        t.forEach(e => {
            e.changes = Array.from(e.changes.values())
        }), this.requestFilterChangeEvent(e, t), this._changeEventsToDispatch = new Map, clearTimeout(this._changeEventTimeout), this._activeFiltersSubscribers.updateSubscribers()
    }
    _dispatchChangeEventValueDataChange(e, t, i) {
        const s = {
            valueKey: i,
            selected: t.selected
        };
        t.getAdditionalEventDetails && Object.assign(s, t.getAdditionalEventDetails(t.selected)), this._dispatchChangeEvent(e, s)
    }
    _dispatchDimensionFirstOpenEvent(e) {
        this._openedDimensions.includes(e.key) || (this.requestFilterDimensionFirstOpenEvent(e.key), "manual" === e.searchType && this._search(e))
    }
    _getActiveDimension() {
        return this._activeDimensionKey ? this._getDimensionByKey(this._activeDimensionKey) : this._dimensions[0]
    }
    _getDimensionByKey(e) {
        return this._dimensions.find(t => t.key === e)
    }
    _getSearchCallback(e) {
        return function({
            keysToDisplay: t = [],
            displayAllKeys: i = !1
        } = {}) {
            requestAnimationFrame(() => {
                const s = this._getDimensionByKey(e);
                s.displayAllKeys = i, s.searchKeysToDisplay = t, this._performDimensionSearch(s), s.loading = !1, this.requestUpdate()
            })
        }.bind(this)
    }
    _getSlottedNodes(e) {
        const t = ["d2l-filter-dimension-set"];
        return e.assignedNodes({
            flatten: !0
        }).filter(e => e.nodeType === Node.ELEMENT_NODE && t.includes(e.tagName.toLowerCase()))
    }
    _handleChangeSetDimension(e) {
        const t = e.target.id.slice(5),
            i = this._getDimensionByKey(t);
        this._performChangeSetDimension(i, e.detail)
    }
    _handleClear() {
        const e = this._getActiveDimension();
        if ("none" !== e.searchType) {
            this._handleClearSearch(e);
            const t = this.shadowRoot.querySelector("d2l-input-search");
            t && (t.value = "")
        }
        this._performDimensionClear(e), this._dispatchChangeEventNow(!1), this.requestUpdate(), y(this.localize("components.filter.clearAnnounce", {
            filterName: e.text
        }))
    }
    _handleClearAll() {
        let e = !1;
        if (this._dimensions.forEach(t => {
                "none" !== t.searchType && (this._handleClearSearch(t), e = !0), this._performDimensionClear(t)
            }), e) {
            const e = this.shadowRoot.querySelectorAll("d2l-input-search");
            e ? .forEach(e => e.value = "")
        }
        this._dispatchChangeEventNow(!0), this.requestUpdate(), this.text ? y(this.localize("components.filter.clearAllAnnounceOverride", {
            filterText: this.text
        })) : y(this.localize("components.filter.clearAllAnnounce"))
    }
    _handleClearSearch(e) {
        "" !== e.searchValue && (e.searchValue = "", this._search(e))
    }
    _handleDimensionDataChange(e) {
        const t = e.detail.changes,
            i = this._getDimensionByKey(e.detail.dimensionKey),
            s = e.detail.valueKey && i ? .values.find(t => t.key === e.detail.valueKey),
            n = e.detail.valueKey ? s : i;
        if (!n) return;
        let l = !1,
            o = !1,
            a = !1;
        t.forEach((e, t) => {
            n[t] !== e && (n[t] = e, l = !0, "selected" === t ? (e ? (i.appliedCount++, this._totalAppliedCount++) : (i.appliedCount--, this._totalAppliedCount--), this._activeFiltersSubscribers.updateSubscribers()) : "values" === t ? ((i.searchValue || "manual" === i.searchType) && (o = !0), a = !0, this._activeFiltersSubscribers.updateSubscribers(), e.forEach(e => this._minWidth = e.minWidth ? Math.max(e.minWidth, this._minWidth) : this._minWidth)) : "text" === t && this._activeFiltersSubscribers.updateSubscribers())
        }), o && this._performDimensionSearch(i), a && this._setFilterCounts(i), l && this.requestUpdate(), e.detail.dispatchChangeEvent && this._dispatchChangeEventValueDataChange(i, s, e.detail.valueKey)
    }
    _handleDimensionHide() {
        this.shadowRoot && this.shadowRoot.querySelector(`d2l-hierarchical-view[data-key="${this._activeDimensionKey}"]`).hide()
    }
    _handleDimensionHideKeyDown(e) {
        !this._activeDimensionKey || 37 !== e.keyCode && 27 !== e.keyCode || (e.stopPropagation(), this._handleDimensionHide())
    }
    _handleDimensionHideStart() {
        this._activeDimensionKey = null
    }
    _handleDimensionLoadMore(e) {
        const t = e.target.parentNode.id.slice(5),
            i = this._getDimensionByKey(t);
        this.requestFilterLoadMoreEvent(t, i.searchValue, () => {
            const t = this.shadowRoot.querySelector("d2l-dropdown-menu");
            t ? t.addEventListener("d2l-dropdown-position", e.detail.complete, {
                once: !0
            }) : e.detail.complete()
        })
    }
    _handleDimensionShowComplete() {
        const e = this.shadowRoot && this.shadowRoot.querySelector('d2l-button-icon[icon="tier1:chevron-left"]');
        e && e.focus()
    }
    _handleDimensionShowStart(e) {
        this._activeDimensionKey = e.detail.sourceView.getAttribute("data-key");
        const t = this._getDimensionByKey(this._activeDimensionKey);
        t.introductoryText && y(t.introductoryText), t.selectedFirst && this._updateDimensionShouldBubble(t), this._dispatchDimensionFirstOpenEvent(t)
    }
    _handleDropdownClose(e) {
        e.target.classList ? .contains(S) && (this.opened = !1, this._activeDimensionKey = null, this._stopPropagation(e))
    }
    _handleDropdownOpen(e) {
        if (e.target.classList ? .contains(S)) {
            if (this.opened = !0, 1 === this._dimensions.length) {
                const e = this._dimensions[0];
                this._dispatchDimensionFirstOpenEvent(e), e.introductoryText && y(e.introductoryText)
            }
            this._stopPropagation(e)
        }
    }
    _handleEmptyStateAction(e) {
        this.dispatchEvent(new CustomEvent("d2l-filter-dimension-empty-state-action", {
            detail: {
                key: e.target.getAttribute("data-dimension-key"),
                type: e.target.getAttribute("data-type")
            }
        }))
    }
    async _handleExpandCollapse(e) {
        const t = e.target.expanded,
            i = t ? e.detail.expandComplete : e.detail.collapseComplete,
            s = e.target.closest("d2l-list-item");
        s.classList.add("expanding-content"), await i, s.classList.remove("expanding-content"), t && !j && this._spacePressedDuringLastSelection && (await new Promise(e => requestAnimationFrame(e)), this._displayKeyboardTooltip = !0, j = !0)
    }
    _handleListItemSelected() {
        this._spacePressedDuringLastSelection = E
    }
    _handleSearch(e) {
        const t = this._getActiveDimension(),
            i = e.detail.value.trim();
        t.searchValue = i, this._search(t)
    }
    _handleSlotChange(e) {
        const t = this._getSlottedNodes(e.target);
        this._ignoreSlotChanges || (this._dimensions = t.map(e => {
            const t = e.tagName.toLowerCase(),
                i = {
                    key: e.key,
                    loading: e.loading,
                    text: e.text,
                    type: t
                };
            switch (t) {
                case "d2l-filter-dimension-set":
                    {
                        i.headerText = e.headerText,
                        i.introductoryText = e.introductoryText,
                        i.hasMore = e.hasMore,
                        i.minWidth = e.minWidth,
                        i.searchType = e.searchType,
                        i.searchValue = "",
                        i.selectedFirst = e.selectedFirst,
                        i.selectionSingle = e.selectionSingle,
                        e.selectAll && !e.selectionSingle && (i.selectAllIdPrefix = w),
                        i.searchEmptyState = e.getSearchEmptyState(),
                        i.setEmptyState = e.getSetEmptyState(),
                        i.valueOnlyActiveFilterText = e.valueOnlyActiveFilterText;
                        const t = e.getValues();i.values = t;
                        break
                    }
            }
            return i
        }))
    }
    _handleTooltipHide() {
        this._displayKeyboardTooltip = !1, j = !0
    }
    _isDimensionEmpty(e) {
        return "d2l-filter-dimension-set" === e.type && 0 === e.values.length
    }
    _performChangeSetDimension(e, t) {
        let i = 0;
        const s = [];
        t.forEach(t => {
            const n = e.values.find(e => e.key === t.key);
            if (n.selected === t.selected) return;
            n.selected = t.selected, t.selected ? i++ : i--;
            const l = {
                valueKey: t.key,
                selected: t.selected
            };
            n.getAdditionalEventDetails && Object.assign(l, n.getAdditionalEventDetails(t.selected)), s.push(l)
        }), e.appliedCount += i, this._totalAppliedCount += i, this.requestUpdate(), s.forEach(t => this._dispatchChangeEvent(e, t))
    }
    _performDimensionClear(e) {
        if (this._totalAppliedCount = this._totalAppliedCount - e.appliedCount, e.appliedCount = 0, "d2l-filter-dimension-set" === e.type) e.values.forEach(t => {
            t.selected && (t.selected = !1, this._setDimensionChangeEvent(e, {
                valueKey: t.key,
                selected: !1
            }, !0)), t.clearProperties && t.clearProperties()
        })
    }
    _performDimensionSearch(e) {
        if (e.selectedFirst && this._updateDimensionShouldBubble(e), "d2l-filter-dimension-set" === e.type) e.values.forEach(t => {
            "automatic" === e.searchType && "" === e.searchValue || e.displayAllKeys ? t.hidden = !1 : t.hidden = e.searchKeysToDisplay ? !e.searchKeysToDisplay.includes(t.key) : !(t.text.toLowerCase().indexOf(e.searchValue.toLowerCase()) > -1)
        });
        this.requestUpdate()
    }
    _search(e) {
        "automatic" === e.searchType ? this._performDimensionSearch(e) : "manual" === e.searchType && (e.loading = !0, this.requestUpdate(), this.requestFilterSearchEvent(e.key, e.searchValue))
    }
    _setDimensionChangeEvent(e, t, i) {
        this._changeEventsToDispatch.has(e.key) || this._changeEventsToDispatch.set(e.key, {
            dimensionKey: e.key,
            cleared: !1,
            changes: new Map
        });
        const s = this._changeEventsToDispatch.get(e.key);
        if (s.cleared = i || e.selectionSingle && !t.selected && !e.appliedCount, "d2l-filter-dimension-set" === e.type) s.changes.set(t.valueKey, t)
    }
    _setFilterCounts(e) {
        this._totalAppliedCount = 0, this._dimensions.forEach(t => {
            if ((!e || e.key === t.key) && "d2l-filter-dimension-set" === t.type) t.appliedCount = t.values.reduce((e, t) => t.selected ? e + 1 : e, 0);
            this._totalAppliedCount += t.appliedCount
        })
    }
    _stopPropagation(e) {
        e.stopPropagation()
    }
    _updateActiveFilters() {
        const e = [];
        this._dimensions.forEach(t => {
            if ("d2l-filter-dimension-set" === t.type) t.values.forEach(i => {
                if (i.selected && !i.inactive) {
                    const s = {
                        dimension: t.key,
                        value: i.key
                    };
                    let n;
                    n = i.valueText ? t.valueOnlyActiveFilterText ? i.valueText : `${t.text}: ${i.valueText}` : t.valueOnlyActiveFilterText ? i.text : `${t.text}: ${i.text}`, e.push({
                        keyObject: s,
                        text: n
                    })
                }
            })
        }), this._activeFilters = e
    }
    _updateActiveFiltersSubscriber(e) {
        this._activeFilters || this._updateActiveFilters(), e.updateActiveFilters(this.id, this._activeFilters)
    }
    _updateActiveFiltersSubscribers(e) {
        this._updateActiveFilters(), e.forEach(e => e.updateActiveFilters(this.id, this._activeFilters))
    }
    _updateDimensionShouldBubble(e) {
        for (const t of e.values) t.shouldBubble = t.selected
    }
}

function K() {
    this.shadowRoot.querySelector(`.${S}`).resize()
}
customElements.define("d2l-filter", F);