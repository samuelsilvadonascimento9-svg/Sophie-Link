import "./colors.js";
import "./loading-spinner.js";
import {
    a as e,
    i as t,
    A as o,
    b as s
} from "./lit-element.js";
import {
    b as a
} from "./button-styles.js";
import {
    F as i
} from "./focus-mixin.js";
import {
    f as r
} from "./number.js";
import {
    e as n
} from "./focus.js";
import {
    g as l
} from "./list2.js";
import {
    l as c
} from "./styles.js";
import {
    L as m
} from "./localize-core-element.js";
import {
    o as p
} from "./offscreen.js";
import {
    P as d
} from "./pageable-subscriber-mixin.js";
const u = document.createElement("div").focus;
class g extends(d(i(m(e)))) {
    static get properties() {
        return {
            hasMore: {
                type: Boolean,
                attribute: "has-more",
                reflect: !0
            },
            pageSize: {
                type: Number,
                attribute: "page-size",
                reflect: !0
            },
            _loading: {
                state: !0
            }
        }
    }
    static get styles() {
        return [a, c, p, t `
			:host {
				display: block;
			}
			:host(:not([has-more])),
			:host([hidden]) {
				display: none;
			}
			button {
				align-items: center;
				background-color: var(--d2l-color-regolith);
				border: 1px solid var(--d2l-color-sylvite);
				display: flex;
				font-family: inherit;
				gap: 0.5rem;
				justify-content: center;
				width: 100%;
			}
			button:hover {
				background-color: var(--d2l-color-sylvite);
				border-color: var(--d2l-color-gypsum);
			}
			.action {
				color: var(--d2l-color-celestine);
			}
			.separator {
				border-right: 1px solid var(--d2l-color-mica);
				height: 0.8rem;
			}
			.info {
				color: var(--d2l-color-galena);
				font-weight: 400;
			}
		`]
    }
    constructor() {
        super(), this.hasMore = !1, this._loading = !1
    }
    static get focusElementSelector() {
        return "button"
    }
    render() {
        if (!this.hasMore || !this._pageableInfo) return o;
        const {
            itemCount: e,
            itemShowingCount: t
        } = this._pageableInfo;
        return s `
			${this._loading?s`
				<span class="d2l-offscreen" role="alert">${this.localize("components.pager-load-more.status-loading")}</span>
			`:o}
			<button class="d2l-label-text" @click="${this._handleClick}" type="button">
			${this._loading?s`
				<d2l-loading-spinner size="24"></d2l-loading-spinner>
			`:s`
				<span class="action">${isNaN(this.pageSize)?this.localize("components.pager-load-more.action"):this.localize("components.pager-load-more.action-with-page-size",{count:r(this.pageSize)})}</span>
				${null!==e?s`
					<span class="d2l-offscreen">${l({nonBreaking:!0})}</span>
					<span class="separator"></span>
					<span class="info">${this.localize("components.pageable.info-with-total",{countFormatted:r(t),totalCount:e,totalCountFormatted:r(e)})}</span>
				`:o}
			`}
		</button>
		`
    }
    async _handleClick() {
        if (this._loading) return;
        const e = this._getPageableRegistries()[0];
        if (!e) return;
        const t = e._getLastItemIndex();
        await new Promise(e => {
            this._loading = !0, this.dispatchEvent(new CustomEvent("d2l-pager-load-more", {
                bubbles: !1,
                composed: !1,
                detail: {
                    complete: e
                }
            }))
        }), this._loading = !1, await new Promise(requestAnimationFrame);
        const o = e._getItemByIndex(t + 1);
        let s;
        if (o)
            if (o.updateComplete && await o.updateComplete, o.focus !== u) s = o;
            else {
                const e = n(o);
                e ? s = e : o.focus === u && (o.tabIndex = -1, s = o)
            }
        s && (await new Promise(requestAnimationFrame), s.focus()), await new Promise(requestAnimationFrame), this.dispatchEvent(new CustomEvent("d2l-pager-load-more-loaded"))
    }
}
customElements.define("d2l-pager-load-more", g);