import "./button-icon.js";
import "./input-number.js";
import "./input-text.js";
import {
    a as e,
    i as t,
    b as a
} from "./lit-element.js";
import {
    f as i
} from "./number.js";
import {
    L as s
} from "./localize-labs-element.js";
import {
    s as n
} from "./input-select-styles.js";
class r extends(s(e)) {
    static get properties() {
        return {
            maxPageNumber: {
                type: Number,
                attribute: "max-page-number",
                reflect: !0
            },
            pageNumber: {
                type: Number,
                attribute: "page-number",
                reflect: !0
            },
            pageSize: {
                type: Number,
                attribute: "page-size",
                reflect: !0
            },
            pageSizes: {
                type: Array,
                attribute: "page-sizes"
            },
            showPageSizeSelector: {
                type: Boolean,
                attribute: "show-page-size-selector",
                reflect: !0
            }
        }
    }
    static get styles() {
        return [n, t `
			:host {
				align-items: center;
				display: flex;
				justify-content: center;
				white-space: nowrap;
			}

			.d2l-page-selector-container {
				margin: 0.75rem;
			}

			.d2l-page-number-container {
				direction: ltr;
				display: inline-block;
			}

			d2l-input-number {
				margin-left: 0.25rem;
				margin-right: 0.25rem;
				width: 3.8rem;
			}

			.d2l-page-max-text {
				margin-right: 0.25rem;
			}

			@media (max-width: 544px) {
				:host {
					flex-direction: column-reverse;
				}
			}
		`]
    }
    constructor() {
        super(), this.pageNumber = 1, this.maxPageNumber = 1, this.pageSizes = [10, 20, 30, 40]
    }
    render() {
        return a `
			<div class="d2l-page-selector-container">
				<d2l-button-icon
					id="d2l-labs-pager-numeric-previous-button"
					icon="tier1:chevron-left"
					text="${this.localize("components:pagination:previousPage")}"
					?disabled="${this.pageNumber<=1}"
					@click="${this._onPreviousClicked}">
				</d2l-button-icon>

				<div class="d2l-page-number-container">
					<d2l-input-number
						autocomplete="off"
						label="${this.localize("components:pagination:currentPage",{pageNumber:this.pageNumber,maxPageNumber:this.maxPageNumber})}"
						label-hidden
						max-fraction-digits="0"
						value="${this.pageNumber}"
						@change="${this._onPageNumberChanged}">
					</d2l-input-number>
					<!-- Note: this uses a division slash rather than a regular slash -->
					<!-- a11y note: setting aria-hidden to true because info here is covered by input element -->
					<span class="d2l-page-max-text" aria-hidden="true">∕ ${i(this.maxPageNumber)}</span>
				</div>

				<d2l-button-icon
					id="d2l-labs-pager-numeric-next-button"
					icon="tier1:chevron-right"
					text="${this.localize("components:pagination:nextPage")}"
					?disabled="${this.pageNumber>=this.maxPageNumber}"
					@click="${this._onNextClicked}">
				</d2l-button-icon>
			</div>

			${this.showPageSizeSelector?a`
				<select
					class="d2l-input-select"
					aria-label="${this.localize("components:pagination:resultsPerPage")}"
					title="${this.localize("components:pagination:resultsPerPage")}"
					@change="${this._onPageSizeChanged}">
					${this.pageSizes.map(e=>a`
						<option ?selected="${this.pageSize===e}" value="${e}">${this.localize("components:pagination:amountPerPage","count",i(e))}</option>
					`)}
				</select>
			`:null}
		`
    }
    _dispatchPageChangeEvent(e) {
        this.dispatchEvent(new CustomEvent("d2l-labs-pager-numeric-page-change", {
            detail: {
                page: e
            },
            bubbles: !0,
            composed: !0
        }))
    }
    _isLastPage() {
        return this.pageNumber >= this.maxPageNumber
    }
    _isValidNumber(e) {
        return e >= 1 && e <= this.maxPageNumber && e !== this.pageNumber
    }
    _onNextClicked() {
        this._dispatchPageChangeEvent(this.pageNumber + 1)
    }
    _onPageNumberChanged(e) {
        this._isValidNumber(e.target.value) ? this._dispatchPageChangeEvent(Number(e.target.value)) : e.target.value = this.pageNumber
    }
    _onPageSizeChanged(e) {
        this.dispatchEvent(new CustomEvent("d2l-labs-pager-numeric-page-size-change", {
            detail: {
                itemCount: Number(e.target.value)
            },
            bubbles: !0,
            composed: !0
        }))
    }
    _onPreviousClicked() {
        this._dispatchPageChangeEvent(this.pageNumber - 1)
    }
}
customElements.define("d2l-labs-pager-numeric", r);