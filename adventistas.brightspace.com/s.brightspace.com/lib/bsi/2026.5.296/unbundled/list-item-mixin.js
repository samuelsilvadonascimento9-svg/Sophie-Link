import "./colors.js";
import {
    a as t,
    b as e
} from "./tooltip.js";
import {
    a as o,
    i,
    r as n,
    b as s,
    A as l
} from "./lit-element.js";
import {
    b as r,
    a,
    m as d,
    f as c,
    e as h,
    c as u,
    d as p,
    g
} from "./focus.js";
import {
    V as m,
    v as b
} from "./visible-on-ancestor-mixin.js";
import {
    F as _
} from "./focus-mixin.js";
import {
    g as v
} from "./uniqueId.js";
import {
    o as f
} from "./if-defined.js";
import {
    L as y
} from "./localize-core-element.js";
import {
    P as x
} from "./property-required-mixin.js";
import "./input-checkbox.js";
import {
    c as w
} from "./styles.js";
import {
    f as k
} from "./number.js";
import {
    S as L
} from "./skeleton-mixin.js";
import {
    f as I,
    e as T,
    b as $,
    g as C
} from "./dom.js";
import {
    i as S
} from "./interactive-mixin.js";
import "./expand-collapse-content.js";
import {
    e as D
} from "./class-map.js";
import {
    c as E
} from "./composeMixins.js";
import {
    g as M
} from "./color.js";
import {
    L as A
} from "./labelled-mixin.js";
import "./selection-input.js";
import {
    _ as N,
    a as P
} from "./_rollupPluginBabelHelpers.js";
import {
    a as B
} from "./announce.js";
import "./icon.js";
import {
    b as R
} from "./button-styles.js";
import {
    m as O
} from "./button-move.js";
import {
    S as F
} from "./selection-mixin.js";
import "./button-icon.js";
import "./loading-spinner.js";
import {
    E as H
} from "./subscriberControllers.js";
import {
    o as K
} from "./style-map.js";
import {
    w as z
} from "./waitForElem.js";
const j = "icon",
    q = "icon-and-text",
    U = "icon-when-interacted";
class W extends(x(_(y(o)))) {
    static get properties() {
        return {
            mode: {
                type: String,
                reflect: !0
            },
            text: {
                type: String,
                required: !0
            }
        }
    }
    static get styles() {
        return i `
			:host {
				--d2l-button-add-animation-delay: 0ms;
				--d2l-button-add-animation-duration: 200ms;
				--d2l-button-add-hover-focus-color: var(--d2l-color-celestine-minus-1);
				--d2l-button-add-line-color: var(--d2l-color-mica);
				--d2l-button-add-line-height: 1px;
				--d2l-button-add-hover-focus-line-height: 2px;
			}
			:host([mode="icon-when-interacted"]) {
				--d2l-button-add-animation-delay: 50ms;
			}
			button {
				align-items: center;
				background-color: transparent;
				border: 0;
				box-shadow: none;
				cursor: pointer;
				display: flex;
				font-family: inherit;
				height: 11px;
				justify-content: center;
				margin: 6.5px 0; /* (d2l-button-add-icon-text height - line height) / 2 */
				outline: none;
				padding: 0;
				position: relative;
				user-select: none;
				white-space: nowrap;
				width: 100%;
				z-index: 1; /* needed for button-add to have expected hover behaviour in list (hover from below, tooltip position) */
			}
			:host([mode="icon-and-text"]) button {
				margin: calc((1.5rem - 11px) / 2) 0; /* (d2l-button-add-icon-text height - line height) / 2 */
			}

			.line {
				background: var(--d2l-button-add-line-color);
				height: var(--d2l-button-add-line-height);
				margin: 5px 0;
				width: 100%;
			}

			button:hover .line,
			button:focus .line {
				background: var(--d2l-button-add-hover-focus-color);
				height: var(--d2l-button-add-hover-focus-line-height);
			}
			button:hover d2l-button-add-icon-text,
			button:focus d2l-button-add-icon-text {
				--d2l-button-add-icon-text-color: var(--d2l-button-add-hover-focus-color);
			}
			:host([mode="icon-when-interacted"]) button:hover .line {
				transition-delay: var(--d2l-button-add-animation-delay);
			}

			:host([mode="icon-when-interacted"]) button:not(:focus):not(:hover) d2l-button-add-icon-text {
				position: absolute;
			}
			:host([mode="icon-when-interacted"]) button:hover d2l-button-add-icon-text,
			:host([mode="icon-when-interacted"]) button:focus d2l-button-add-icon-text {
				animation: position-change-animation var(--d2l-button-add-animation-delay); /* add delay in changing position to avoid flash of missing icon space */
			}
			@keyframes position-change-animation {
				0% { position: absolute; }
				100% { position: static; }
			}
			${r(t=>`button:${t} d2l-button-add-icon-text`,{extraStyles:i`background-color: white; border-radius: 0.3rem;`})}
			:host([mode="icon-when-interacted"]) button:${n(a())} d2l-button-add-icon-text,
			:host([mode="icon"]) button:${n(a())} d2l-button-add-icon-text {
				border-radius: 0.2rem;
				padding: 0.15rem;
			}

			@media (prefers-reduced-motion: no-preference) {
				button:hover .line,
				button:focus .line {
					animation: line-start-animation var(--d2l-button-add-animation-duration) ease-in var(--d2l-button-add-animation-delay) 1 forwards;
					transition: all var(--d2l-button-add-animation-duration) ease-in var(--d2l-button-add-animation-delay);
				}
				button:hover .line-end,
				button:focus .line-end {
					animation-name: line-end-animation;
				}

				@keyframes line-start-animation {
					0% {
						background: linear-gradient(to var(--d2l-inline-end, right), var(--d2l-button-add-line-color) 0%, var(--d2l-button-add-line-color) 11%, var(--d2l-button-add-hover-focus-color) 11%) var(--d2l-inline-start, left) center / 113%;
						opacity: 10%;
					}
					100% {
						background: linear-gradient(to var(--d2l-inline-end, right), var(--d2l-button-add-line-color) 0%, var(--d2l-button-add-line-color) 11%, var(--d2l-button-add-hover-focus-color) 11%) var(--d2l-inline-start, left) center / 113%; /* safari */
						background-position: var(--d2l-inline-end, right);
					}
				}
				@keyframes line-end-animation {
					0% {
						background: linear-gradient(to var(--d2l-inline-start, left), var(--d2l-button-add-line-color) 0%, var(--d2l-button-add-line-color) 11%, var(--d2l-button-add-hover-focus-color) 11%) var(--d2l-inline-end, right) center / 113%;
						opacity: 10%;
					}
					100% {
						background: linear-gradient(to var(--d2l-inline-start, left), var(--d2l-button-add-line-color) 0%, var(--d2l-button-add-line-color) 11%, var(--d2l-button-add-hover-focus-color) 11%) var(--d2l-inline-end, right) center / 113%; /* safari */
						background-position: var(--d2l-inline-start, left);
					}
				}
			}
			@media (prefers-contrast: more) {
				.line {
					background-color: ButtonBorder;
				}
				button:hover .line,
				button:focus .line {
					background-color: Highlight !important;
				}
			}
		`
    }
    constructor() {
        super(), this.mode = j, this._buttonId = v()
    }
    static get focusElementSelector() {
        return "button"
    }
    render() {
        const t = this.text || this.localize("components.button-add.addItem"),
            e = this.mode !== q ? this._buttonId : void 0,
            o = this.mode !== q ? s `<d2l-button-add-icon-text ?visible-on-ancestor="${this.mode===U}" animation-type="opacity"></d2l-button-add-icon-text>` : s `<d2l-button-add-icon-text text="${t}"></d2l-button-add-icon-text>`,
            i = this.mode !== q ? s `<d2l-tooltip class="vdiff-target" delay="100" offset="21" for="${this._buttonId}" for-type="label">${t}</d2l-tooltip>` : l;
        return s `
			<button
				class="d2l-label-text d2l-visible-on-ancestor-target"
				id="${f(e)}"
				type="button">
				<div class="line line-start"></div>
				${o}
				<div class="line line-end"></div>
			</button>
			${i}
		`
    }
}
customElements.define("d2l-button-add", W);
class V extends(m(o)) {
    static get properties() {
        return {
            text: {
                type: String
            }
        }
    }
    static get styles() {
        return [b, i `
			:host {
				--d2l-focus-ring-offset: 0;
				--d2l-focus-ring-color: var(--d2l-button-add-hover-focus-color);
				--d2l-button-add-icon-text-color: var(--d2l-color-galena);
				align-items: center;
				display: flex;
				stroke: var(--d2l-button-add-icon-text-color);
				stroke-width: 2;
			}
			:host([visible-on-ancestor]),
			:host([text]) {
				--d2l-button-add-icon-text-color: var(--d2l-color-celestine);
			}
			:host([text]) {
				color: var(--d2l-button-add-icon-text-color);
				height: 1.5rem;
				padding: 0 0.3rem;
			}

			:host([text]) svg {
				padding-inline-end: 0.2rem;
			}
			:host(:not([text])) svg {
				margin: -0.15rem; /** hover/click target */
				padding: 0.15rem; /** hover/click target */
			}

			span {
				font-size: 0.7rem;
				font-weight: 700;
				letter-spacing: 0.2px;
				line-height: 1rem;
			}`]
    }
    render() {
        return s `
			<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
				<g>
					<circle cx="9" cy="9" r="8" fill="#fff" />
					<path stroke-linecap="round" d="M9 6v6M6 9h6"/>
				</g>
			</svg>
			${this.text?s`<span class="d2l-label-text">${this.text}</span>`:l}
		`
    }
}
customElements.define("d2l-button-add-icon-text", V);
class Y extends(y(L(o))) {
    static get properties() {
        return {
            count: {
                type: Number
            },
            includePlusSign: {
                type: Boolean,
                attribute: "include-plus-sign"
            }
        }
    }
    static get styles() {
        return [super.styles, w, i `
			:host {
				display: block;
				height: 70px;
				inset-inline-start: -10000px;
				position: absolute;
				width: 340px;
				z-index: 0;
			}
			:host([hidden]) {
				display: none;
			}
			.first, .second, .third {
				background-color: white;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 4px;
				box-sizing: border-box;
				height: 100%;
				position: absolute;
				width: 100%;
			}
			.first {
				align-items: start;
				display: flex;
				padding: 16px 8px;
			}
			.second {
				margin-inline-start: 6px;
				margin-top: 6px;
				z-index: -1;
			}
			.third {
				margin-inline-start: 12px;
				margin-top: 12px;
				z-index: -2;
			}
			.text {
				width: 100%;
			}
			.line-1 {
				height: 24px;
				margin-bottom: 4px;
				width: 100%;
			}
			.line-2 {
				height: 16px;
				width: 25%;
			}
			d2l-input-checkbox {
				line-height: 0;
				margin: 0;
				margin-inline-start: 16px;
			}
			.count {
				background-color: var(--d2l-color-celestine);
				border-radius: 0.7rem;
				box-sizing: border-box;
				color: white;
				left: 26px;
				min-width: 1.4rem;
				padding: 0.25rem 0.4rem;
				position: absolute;
				text-align: center;
				top: 30px;
				z-index: 998; /* must be higher than the skeleton z-index */
			}
			.count:dir(rtl) {
				left: 14px;
			}
		`]
    }
    constructor() {
        super(), this.count = 0, this.skeleton = !0
    }
    render() {
        return s `
			<div class="first">
				<div class="count d2l-body-small">${this.includePlusSign?this.localize("components.count-badge.plus",{number:this.count}):k(this.count)}</div>
				<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
					<path fill="#494c4e" d="M8 16v1c0 .5-.4 1-1 1H6c-.6 0-1-.5-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M13 16v1c0 .5-.4 1-1 1h-1c-.6 0-1-.5-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M8 11v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M13 11v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M8 6v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M13 6v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M8 1v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V1c0-.5.4-1 1-1h1c.6 0 1 .5 1 1M13 1v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V1c0-.5.4-1 1-1h1c.6 0 1 .5 1 1"/>
				</svg>
				<d2l-input-checkbox disabled skeleton></d2l-input-checkbox>
				<div class="text">
					<div class="line-1 d2l-skeletize"></div>
					<div class="line-2 d2l-skeletize"></div>
				</div>
			</div>
			<div class="second vdiff-target"></div>
			<div class="third vdiff-target"></div>
		`
    }
}
customElements.define("d2l-list-item-drag-image", Y);
const X = 40,
    G = 35,
    J = 36,
    Q = 37,
    Z = 33,
    tt = 34,
    et = 39,
    ot = 38;

function it() {
    return "rtl" === document.documentElement.getAttribute("dir")
}
customElements.define("d2l-list-item-generic-layout", class extends o {
    static get properties() {
        return {
            alignNested: {
                type: String,
                reflect: !0,
                attribute: "align-nested"
            },
            noPrimaryAction: {
                type: Boolean,
                attribute: "no-primary-action",
                reflect: !0
            },
            role: {
                type: String,
                reflect: !0
            },
            gridActive: {
                type: Boolean,
                attribute: "grid-active"
            },
            indentation: {
                type: Number,
                reflect: !0
            },
            layout: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return i `
			:host {
				display: grid;
				grid-template-columns:
					[start outside-control-start] minmax(0, min-content)
					[color-start outside-control-end] minmax(0, min-content)
					[expand-collapse-start color-end] minmax(0, min-content)
					[control-start expand-collapse-end] minmax(0, min-content)
					[control-end content-start] minmax(0, auto)
					[content-end actions-start] minmax(0, min-content)
					[end actions-end];
				grid-template-rows:
					[start add-top-start] minmax(0, min-content)
					[add-top-end main-start] minmax(0, min-content)
					[main-end nested-start] minmax(0, min-content)
					[nested-end add-start] minmax(0, min-content)
					[add-end end];
			}

			:host([align-nested="control"]) ::slotted([slot="nested"]) {
				grid-column: control-start / end;
			}

			::slotted([slot="drop-target"]) {
				grid-column: start / end;
			}

			::slotted([slot="outside-control"]),
			::slotted([slot="color-indicator"]),
			::slotted([slot="expand-collapse"]),
			::slotted([slot="control"]),
			::slotted([slot="content"]),
			::slotted([slot="actions"]),
			::slotted([slot="outside-control-action"]),
			::slotted([slot="before-content"]),
			::slotted([slot="control-action"]),
			::slotted([slot="content-action"]),
			::slotted([slot="outside-control-container"]),
			::slotted([slot="control-container"]),
			::slotted([slot="drop-target"]) {
				grid-row: 2 / 3;
			}

			::slotted([slot="outside-control"]) {
				grid-column: outside-control-start / outside-control-end;
			}

			::slotted([slot="outside-control"]:not(.handle-only)) {
				pointer-events: none;
			}

			::slotted([slot="expand-collapse"]) {
				cursor: pointer;
				grid-column: expand-collapse-start / expand-collapse-end;
			}

			::slotted([slot="control"]) {
				grid-column: control-start / control-end;
				pointer-events: none;
				width: 2.1rem;
			}

			::slotted([slot="content"]) {
				grid-column: content-start / content-end;
			}

			::slotted([slot="color-indicator"]) {
				grid-column: color-start / color-end;
			}

			::slotted([slot="before-content"]) {
				grid-column: color-start / content-start;
			}

			::slotted([slot="control-action"]) ~ ::slotted([slot="content"]),
			::slotted([slot="outside-control-action"]) ~ ::slotted([slot="content"]) {
				pointer-events: unset;
			}

			slot[name="actions"] {
				white-space: nowrap;
			}

			::slotted([slot="actions"]) {
				grid-column: actions-start / actions-end;
				justify-self: end;
			}

			::slotted([slot="outside-control-action"]) {
				grid-column: start / end;
			}
			:host([no-primary-action]) ::slotted([slot="outside-control-action"]) {
				grid-column: start / outside-control-end;
			}

			::slotted([slot="content-action"]) {
				grid-column: content-start / content-end;
			}

			:host([no-primary-action]) ::slotted([slot="content-action"]) {
				display: none;
			}

			::slotted([slot="control-action"]) {
				grid-column-start: control-start;
			}

			:host(:not([no-primary-action])) ::slotted([slot="outside-control-action"]) {
				grid-column-end: end;
			}

			:host(:not([no-primary-action])) ::slotted([slot="control-action"]) {
				grid-column-end: actions-start;
			}

			::slotted([slot="outside-control-container"]) {
				grid-column: start / end;
			}
			::slotted([slot="control-container"]) {
				grid-column: color-start / end;
			}

			::slotted([slot="nested"]) {
				grid-column: content-start / end;
				grid-row: nested;
			}

			:host([indentation]) ::slotted([slot="nested"]) {
				grid-column-start: start;
				padding-inline-start: var(--d2l-list-item-generic-layout-nested-indentation);
			}

			::slotted([slot="add"]) {
				grid-row: add;
			}
			::slotted([slot="add-top"]) {
				grid-row: add-top;
			}
			::slotted([slot="add-top"]),
			::slotted([slot="add"]) {
				grid-column: color-start / end;
			}

			:host([layout="tile"]) {
				grid-template-columns:
					[start control-start] minmax(0, min-content)
					[control-end actions-start] minmax(0, auto)
					[actions-end end];
				grid-template-rows:
					[start header-start] minmax(0, min-content)
					[header-end content-start] auto
					[content-end end];
				height: 100%;
			}

			:host([layout="tile"]) ::slotted([slot="header"]) {
				grid-column: start / end;
				grid-row: header-start / header-end;
			}

			:host([layout="tile"]) ::slotted([slot="content"]),
			:host([layout="tile"]) ::slotted([slot="content-action"]),
			:host([layout="tile"]) ::slotted([slot="control-action"]) {
				grid-column: start / end;
				grid-row: content-start / end;
			}
			:host([layout="tile"]) ::slotted([slot="outside-control-container"]) {
				grid-column: start / end;
				grid-row: start / end;
			}
			:host([layout="tile"]) ::slotted([slot="control"]) {
				grid-column: control-start / control-end;
				grid-row: start / start;
				pointer-events: all;
				width: unset;
			}

			:host([layout="tile"]) ::slotted([slot="actions"]) {
				grid-column: actions-start / actions-end;
				grid-row: start / start;
			}

			:host([layout="tile"]) ::slotted([slot="color-indicator"]) {
				grid-column: start;
				grid-row: content-start / content-end;
			}

			:host(:not([layout="tile"])) slot[name="header"],
			:host([layout="tile"]) slot[name="add-top"],
			:host([layout="tile"]) slot[name="control-container"],
			:host([layout="tile"]) slot[name="before-content"],
			:host([layout="tile"]) slot[name="outside-control"],
			:host([layout="tile"]) slot[name="outside-control-action"],
			:host([layout="tile"]) slot[name="expand-collapse"],
			:host([layout="tile"]) slot[name="drop-target"],
			:host([layout="tile"]) slot[name="nested"],
			:host([layout="tile"]) slot[name="add"] {
				display: none;
			}
		`
    }
    constructor() {
        super(), this.alignNested = "content", this.noPrimaryAction = !1, this._preventFocus = {
            handleEvent(t) {
                const e = (t.path || t.composedPath()).find(t => "SLOT" === t.nodeName && ["content"].includes(t.name));
                console.warn(`${e.name} area should not have focusable items in it. Consider using href or creating a custom list-item.`)
            },
            capture: !0
        }
    }
    connectedCallback() {
        super.connectedCallback(), this.role = this.gridActive ? "gridcell" : void 0
    }
    firstUpdated() {
        this.addEventListener("keydown", this._onKeydown.bind(this))
    }
    render() {
        return s `
			<slot name="add-top" class="d2l-cell" data-cell-num="10"></slot>

			<slot name="control-container"></slot>
			<slot name="outside-control-container"></slot>
			<slot name="header"></slot>
			<slot name="before-content"></slot>

			<slot name="content-action" class="d2l-cell" data-cell-num="6"></slot>
			<slot name="outside-control" class="d2l-cell" data-cell-num="2"></slot>
			<slot name="outside-control-action" class="d2l-cell" data-cell-num="1"></slot>
			<slot name="color-indicator"></slot>
			<slot name="expand-collapse" class="d2l-cell" data-cell-num="4"></slot>
			<slot name="content" class="d2l-cell" data-cell-num="8" @focus="${this.noPrimaryAction?null:this._preventFocus}"></slot>
			<slot name="control-action" class="d2l-cell" data-cell-num="3"></slot>
			<slot name="control" class="d2l-cell" data-cell-num="5"></slot>
			<slot name="actions" class="d2l-cell" data-cell-num="7"></slot>

			<slot name="drop-target"></slot>
			<slot name="nested"></slot>
			<slot name="add" class="d2l-cell" data-cell-num="9"></slot>
		`
    }
    willUpdate(t) {
        super.willUpdate(t), t.has("indentation") && this.style.setProperty("--d2l-list-item-generic-layout-nested-indentation", `${this.indentation}px`)
    }
    _focusCellItem(t) {
        const e = this.shadowRoot ? .querySelector(`[data-cell-num="${t.cellNum}"]`);
        if (!e) return;
        let o;
        const i = d(e, {
            deep: !0,
            predicate: t => !S(t)
        });
        return t.index <= i.length - 1 ? o = i[t.index] : i.length > 0 && (o = i[i.length - 1]), o && o.focus(), o
    }
    _focusFirstCell() {
        this._focusNextCell(1)
    }
    _focusFirstRow() {
        const t = I(this, t => "D2L-LIST" === t.tagName).firstElementChild.shadowRoot.querySelector('[role="gridcell"]');
        it() ? t._focusLastCell() : t._focusFirstCell()
    }
    _focusLastCell() {
        let t = null,
            e = null,
            o = 1;
        do {
            t = this.shadowRoot && this.shadowRoot.querySelector(`[data-cell-num="${o++}"]`), t && (e = c(t) || e)
        } while (t);
        e.focus()
    }
    _focusLastRow() {
        const t = I(this, t => "D2L-LIST" === t.tagName).lastElementChild.shadowRoot.querySelector('[role="gridcell"]');
        it() ? t._focusFirstCell() : t._focusLastCell()
    }
    _focusNextCell(t, e = !0) {
        let o = null,
            i = null;
        do {
            o = this.shadowRoot && this.shadowRoot.querySelector(`[data-cell-num="${t}"]`), o && (i = e ? h(o) : c(o)), i && i.focus(), e ? ++t : --t
        } while (o && !i);
        return o || (e ? this._focusFirstCell() : this._focusLastCell()), i
    }
    _focusNextRow(t, e = !1, o = 1) {
        const i = I(this, t => "row" === t.role);
        let n = i;
        for (; o > 0;) {
            const t = e ? this._getPreviousFlattenedListItem(n) : this._getNextFlattenedListItem(n);
            if (!t) break;
            n = t, o--
        }
        if (!n) return;
        if (!n.shadowRoot.querySelector('[role="gridcell"]')._focusCellItem(t) && !n._tryFocus()) {
            const t = e ? u(n) : p(n),
                o = I(t, t => "row" === t.role || "listitem" === t.role);
            o && this._isContainedInSameRootList(i, o) && t.focus()
        }
    }
    _focusNextWithinRow(t, e) {
        t.index === e.length - 1 ? this._focusNextCell(t.cellNum + 1) : e[t.index + 1].focus()
    }
    _focusPreviousWithinRow(t, e) {
        0 === t.index ? this._focusNextCell(t.cellNum - 1, !1) : e[t.index - 1].focus()
    }
    _getNextFlattenedListItem(t) {
        const e = t.querySelector('[slot="nested"]') || t.shadowRoot.querySelector("d2l-list");
        if (e && (!t.expandable || t.expandable && t.expanded)) {
            const t = [...e.children].find(t => "row" === t.role);
            if (t) return t
        }
        const o = t => {
            let e = t.nextElementSibling;
            for (; e;) {
                if ("row" === e.role) return e;
                e = e.nextElementSibling
            }
            const i = I(t, t => "D2L-LIST" === t.tagName);
            if ("nested" !== i.slot && ("SLOT" !== i.parentNode.tagName || "nested" !== i.parentNode.name)) return;
            const n = I(i, t => "row" === t.role);
            return o(n)
        };
        return o(t)
    }
    _getPreviousFlattenedListItem(t) {
        let e = t.previousElementSibling;
        for (; e;) {
            if ("row" === e.role) {
                let t;
                do {
                    if (t = e.querySelector('[slot="nested"]') || e.shadowRoot.querySelector("d2l-list"), !t || !(!e.expandable || e.expandable && e.expanded)) break; {
                        const o = [...t.children].filter(t => "row" === t.role);
                        if (!o.length) break;
                        e = o[o.length - 1]
                    }
                } while (t);
                return e
            }
            e = e.previousElementSibling
        }
        const o = I(t, t => "D2L-LIST" === t.tagName);
        if ("nested" === o.slot || "SLOT" === o.parentNode.tagName && "nested" === o.parentNode.name) {
            return I(o, t => "row" === t.role)
        }
    }
    _isContainedInSameRootList(t, e) {
        const o = t ? .getRootList ? .(t);
        return T(o, e)
    }
    _onKeydown(t) {
        if (!this.gridActive) return;
        let e = !0;
        const o = g(),
            i = I(o, t => t.classList ? .contains("d2l-cell"));
        if (!i) return;
        const n = d(i, {
                deep: !0,
                predicate: t => !S(t)
            }),
            s = {
                cellNum: parseInt(i.getAttribute("data-cell-num")),
                index: n.findIndex(t => t === o)
            };
        switch (t.keyCode) {
            case et:
                it() ? this._focusPreviousWithinRow(s, n) : this._focusNextWithinRow(s, n);
                break;
            case Q:
                it() ? this._focusNextWithinRow(s, n) : this._focusPreviousWithinRow(s, n);
                break;
            case ot:
                this._focusNextRow(s, !0);
                break;
            case X:
                this._focusNextRow(s);
                break;
            case J:
                it() ? t.ctrlKey ? this._focusFirstRow() : this._focusLastCell() : t.ctrlKey ? this._focusFirstRow() : this._focusFirstCell();
                break;
            case G:
                it() ? t.ctrlKey ? this._focusLastRow() : this._focusFirstCell() : t.ctrlKey ? this._focusLastRow() : this._focusLastCell();
                break;
            case Z:
                this._focusNextRow(s, !0, 5);
                break;
            case tt:
                this._focusNextRow(s, !1, 5);
                break;
            default:
                e = !1
        }
        e && (t.preventDefault(), t.stopPropagation())
    }
});
customElements.define("d2l-list-item-placement-marker", class extends o {
    static get styles() {
        return i `
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			.d2l-list-drag-marker-line {
				height: 12px;
				margin-left: -1px;
				margin-right: -1px;
				stroke: var(--d2l-color-celestine);
				stroke-width: 3px;
				width: 100%;
			}

			.d2l-list-drag-marker-linecap {
				fill: var(--d2l-color-celestine);
				height: 12px;
				margin-inline: -1px 0;
				stroke: none;
				width: 4px;
			}

			.d2l-list-drag-marker-circle {
				fill: none;
				height: 12px;
				margin-inline: 0 -1px;
				stroke: var(--d2l-color-celestine);
				stroke-width: 3px;
				width: 12px;
			}

			.d2l-list-drag-marker {
				display: flex;
				flex-wrap: nowrap;
			}
		`
    }
    render() {
        return s `
			<div class="d2l-list-drag-marker">
				<svg class="d2l-list-drag-marker-circle">
					<circle cx="50%" cy="50%" r="3.8px"/>
				</svg>
				<svg class="d2l-list-drag-marker-line">
					<line x1="0" y1="50%" x2="100%" y2="50%" />
				</svg>
				<svg class="d2l-list-drag-marker-linecap">
					<circle cx="50%" cy="50%" r="1.5px"/>
				</svg>
			</div>
		`
    }
});
const nt = t => class extends(L(t)) {
        static get properties() {
            return {
                selectionDisabled: {
                    type: Boolean,
                    attribute: "selection-disabled",
                    reflect: !0
                },
                selectionDisabledTooltip: {
                    type: String,
                    attribute: "selection-disabled-tooltip"
                },
                key: {
                    type: String,
                    reflect: !0
                },
                selectable: {
                    type: Boolean
                },
                selected: {
                    type: Boolean,
                    reflect: !0
                },
                selectionInfo: {
                    type: Object,
                    attribute: !1
                },
                _hoveringSelection: {
                    type: Boolean,
                    attribute: "_hovering-selection",
                    reflect: !0
                }
            }
        }
        static get styles() {
            const t = [i `
			.d2l-checkbox-action {
				cursor: pointer;
				display: block;
				height: 100%;
			}
			:host([selection-disabled]) [slot="control-action"] {
				pointer-events: none;
			}
			:host([selection-disabled]) [slot="control"],
			:host([selection-disabled]) [slot="control-action"] [slot="content"] {
				pointer-events: all;
			}
		`];
            return super.styles && t.unshift(super.styles), t
        }
        constructor() {
            super(), this.selectable = !1, this.selected = !1, this.selectionDisabled = !1, this.selectionInfo = new F, this._checkboxId = v()
        }
        get selectionInfo() {
            return this._selectionInfo
        }
        set selectionInfo(t) {
            const e = this._selectionInfo;
            e !== t && (this._selectionInfo = t, this._selectionInfo.state !== F.states.notSet && this.setSelected(this._selectionInfo.state === F.states.all), this.requestUpdate("selectionInfo", e))
        }
        connectedCallback() {
            super.connectedCallback(), this.selectable && (this.key || console.warn("ListItemCheckboxMixin requires a key.")), this.key || this.setSelected(void 0, !0)
        }
        updated(t) {
            super.updated(t), this._selectionProvider && t.has("selectionInfo") && this.selectionInfo.state !== F.states.notSet && (this.selected = this.selectionInfo.state === F.states.all)
        }
        willUpdate(t) {
            super.willUpdate(t), t.has("selectionDisabled") && !0 === this.selectionDisabled && (this._hoveringSelection = !1)
        }
        setSelected(t, e = !1) {
            this.selected === t || void 0 === this.selected && !t || (this.selected = t, e || this._dispatchSelected(t))
        }
        async _dispatchSelected(t) {
            await this.updateComplete, this.dispatchEvent(new CustomEvent("d2l-list-item-selected", {
                detail: {
                    key: this.key,
                    selected: t
                },
                composed: !0,
                bubbles: !0
            }))
        }
        _onCheckboxActionClick(t) {
            if (t.preventDefault(), this.selectionDisabled) return;
            if (Lt(t, t => t === this.shadowRoot.querySelector("div.d2l-checkbox-action"))) return;
            this.setSelected(!this.selected);
            const e = this.shadowRoot && this.shadowRoot.querySelector(`#${this._checkboxId}`);
            e && e.focus()
        }
        _onCheckboxChange(t) {
            this.setSelected(t.target.selected), this._selectionProvider && (this.selected && this.selectionInfo.state !== F.states.all || !this.selected && this.selectionInfo.state === F.states.all) && this._selectionProvider.setSelectionForAll(this.selected)
        }
        _onMouseEnterSelection() {
            this._hoveringSelection = !this.selectionDisabled
        }
        _onMouseLeaveSelection() {
            this._hoveringSelection = !1
        }
        _onNestedSlotChangeCheckboxMixin() {
            this._updateNestedSelectionProvider()
        }
        _onSelectionProviderConnected(t) {
            t.stopPropagation(), this._updateNestedSelectionProvider()
        }
        _renderCheckbox() {
            return this.selectable ? s `
			<d2l-selection-input
				@d2l-selection-change="${this._onCheckboxChange}"
				?disabled="${this.selectionDisabled}"
				disabled-tooltip=${this.selectionDisabledTooltip}
				.hovering="${this._hoveringSelection}"
				id="${this._checkboxId}"
				?_indeterminate="${this.selectionInfo.state===F.states.some}"
				key="${this.key}"
				label="${this.label}"
				@mouseenter="${this._onMouseEnterSelection}"
				@mouseleave="${this._onMouseLeaveSelection}"
				?selected="${this.selected}"
				?skeleton="${this.skeleton}">
			</d2l-selection-input>
		` : l
        }
        _renderCheckboxAction(t) {
            return this.selectable ? s `
			<div class="d2l-checkbox-action"
				@click="${this._onCheckboxActionClick}"
				@mouseenter="${this._onMouseEnterSelection}"
				@mouseleave="${this._onMouseLeaveSelection}">
				${t}
			</div>
			` : l
        }
        _updateNestedSelectionProvider() {
            const t = this._getNestedList();
            this._selectionProvider !== t && (this._selectionProvider && this._selectionProvider !== t && (this._selectionProvider.unsubscribeObserver(this), this._selectionProvider = null), t && (this._selectionProvider = t, this._selectionProvider.subscribeObserver(this)))
        }
    },
    st = Object.freeze({
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESC: 27,
        HOME: 36,
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }),
    lt = Object.freeze({
        active: "keyboard-active",
        cancel: "keyboard-deactivate-cancel",
        down: "down",
        first: "first",
        last: "last",
        nest: "nest",
        nextElement: "next-element",
        previousElement: "previous-element",
        rootFirst: "rootFirst",
        rootLast: "rootLast",
        save: "keyboard-deactivate-save",
        unnest: "unnest",
        up: "up"
    });
let rt = !1;
class at extends(y(_(o))) {
    static get properties() {
        return {
            disabled: {
                type: Boolean,
                reflect: !0
            },
            keyboardTextInfo: {
                type: Object,
                attribute: "keyboard-text-info"
            },
            text: {
                type: String
            },
            _displayKeyboardTooltip: {
                type: Boolean
            },
            _keyboardActive: {
                type: Boolean
            }
        }
    }
    static get styles() {
        return [R, i `
			:host {
				display: flex;
				margin: 0.25rem;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-list-item-drag-handle-dragger-button {
				background-color: unset;
				display: block;
				margin: 0;
				min-height: 1.8rem;
				padding: 0;
				width: 0.9rem;
			}
			/* Firefox includes a hidden border which messes up button dimensions */
			button::-moz-focus-inner {
				border: 0;
			}
			.d2l-button-dragger-icon {
				height: 0.9rem;
				width: 0.9rem;
			}
			button,
			button[disabled]:hover,
			button[disabled]:focus {
				background-color: var(--d2l-color-gypsum);
				color: var(--d2l-color-ferrite);
			}
			.d2l-list-item-drag-handle-dragger-button:hover,
			.d2l-list-item-drag-handle-dragger-button:focus {
				background-color: var(--d2l-color-mica);
			}
			button[disabled] {
				cursor: default;
				opacity: 0.5;
			}
			d2l-tooltip > div {
				font-weight: 700;
			}
			d2l-tooltip > ul {
				padding-inline-start: 1rem;
			}
			.d2l-list-item-drag-handle-tooltip-key {
				font-weight: 700;
			}
			d2l-button-move {
				pointer-events: auto; /* required since ancestors may set point-events: none; (see generic layout) */
			}
		`]
    }
    constructor() {
        super(), this.disabled = !1, this._buttonId = v(), this._displayKeyboardTooltip = !1, this._keyboardActive = !1, this._movingElement = !1
    }
    static get focusElementSelector() {
        return ".d2l-list-item-drag-handle-button"
    }
    render() {
        return this._keyboardActive && !this.disabled ? this._renderKeyboardDragging() : this._renderDragger()
    }
    updated(t) {
        super.updated(t), t.has("_keyboardActive") && void 0 !== t.get("_keyboardActive") && this.focus()
    }
    activateKeyboardMode() {
        this._dispatchAction(lt.active), this._keyboardActive = !0
    }
    get _defaultLabel() {
        const t = "components.list-item-drag-handle",
            e = this.localize(`${t}.default`, "name", this.text),
            o = this.localize(`${t}.keyboard`, "currentPosition", this.keyboardTextInfo && this.keyboardTextInfo.currentPosition, "size", this.keyboardTextInfo && this.keyboardTextInfo.count);
        return this._keyboardActive ? o : e
    }
    _dispatchAction(t) {
        t && this.dispatchEvent(new CustomEvent("d2l-list-item-drag-handle-action", {
            detail: {
                action: t
            },
            bubbles: !1
        }))
    }
    async _doAction(t) {
        this._dispatchAction(t);
        const e = I(this, t => t.hasAttribute && t.hasAttribute("draggable"));
        e && await e.updateComplete, await this.updateComplete, this.focus(), this._movingElement = !1
    }
    _onDraggerButtonClick() {
        this.disabled || this.activateKeyboardMode()
    }
    async _onMoveButtonAction(t) {
        const e = "rtl" === document.documentElement.getAttribute("dir");
        let o = null;
        switch (t.detail.action) {
            case O.up:
                this._movingElement = !0, o = lt.up, this.updateComplete.then(() => this.blur());
                break;
            case O.down:
                this._movingElement = !0, o = lt.down;
                break;
            case O.right:
                this._movingElement = !0, o = e ? lt.unnest : lt.nest;
                break;
            case O.left:
                this._movingElement = !0, o = e ? lt.nest : lt.unnest;
                break;
            case O.rootHome:
                this._movingElement = !0, o = lt.rootFirst;
                break;
            case O.home:
                this._movingElement = !0, o = lt.first;
                break;
            case O.rootEnd:
                this._movingElement = !0, o = lt.rootLast;
                break;
            case O.end:
                this._movingElement = !0, o = lt.last;
                break;
            default:
                return
        }
        this._doAction(o)
    }
    _onMoveButtonFocusIn() {
        rt || (this._displayKeyboardTooltip = !0, rt = !0)
    }
    _onMoveButtonFocusOut(t) {
        if (this._displayKeyboardTooltip = !1, this._movingElement) return this._movingElement = !1, t.stopPropagation(), void t.preventDefault();
        this._keyboardActive = !1, this._dispatchAction(lt.save), t.stopPropagation()
    }
    async _onMoveButtonKeydown(t) {
        if (!this._keyboardActive) return;
        let e = null;
        switch (t.keyCode) {
            case st.TAB:
                e = t.shiftKey ? lt.previousElement : lt.nextElement;
                break;
            case st.ESC:
                e = lt.cancel, this.updateComplete.then(() => this._keyboardActive = !1);
                break;
            case st.ENTER:
            case st.SPACE:
                e = lt.save, this.updateComplete.then(() => this._keyboardActive = !1);
                break;
            default:
                return
        }
        t.preventDefault(), t.stopPropagation(), this._doAction(e)
    }
    _onMoveButtonMouseDown(t) {
        t.preventDefault()
    }
    _renderDragger() {
        return s `
			<button
				class="d2l-list-item-drag-handle-dragger-button d2l-list-item-drag-handle-button"
				@click="${this._onDraggerButtonClick}"
				aria-label="${this._defaultLabel}"
				?disabled="${this.disabled}">
				<d2l-icon icon="tier1:dragger" class="d2l-button-dragger-icon"></d2l-icon>
			</button>
		`
    }
    _renderKeyboardDragging() {
        return s `
			<d2l-button-move
				class="d2l-list-item-drag-handle-button"
				@d2l-button-move-action="${this._onMoveButtonAction}"
				@focusin="${this._onMoveButtonFocusIn}"
				@focusout="${this._onMoveButtonFocusOut}"
				id="${this._buttonId}"
				@keydown="${this._onMoveButtonKeydown}"
				@mousedown="${this._onMoveButtonMouseDown}"
				text="${this._defaultLabel}">
			</d2l-button-move>
			${this._displayKeyboardTooltip?s`<d2l-tooltip class="vdiff-target" align="start" announced for="${this._buttonId}" for-type="descriptor">${this._renderTooltipContent()}</d2l-tooltip>`:""}
		`
    }
    _renderTooltipContent() {
        return s `
			<div>${this.localize("components.list-item-drag-handle-tooltip.title")}</div>
			<ul>
				<li><span class="d2l-list-item-drag-handle-tooltip-key">${this.localize("components.list-item-drag-handle-tooltip.enter-key")}</span> - ${this.localize("components.list-item-drag-handle-tooltip.enter-desc")}</li>
				<li><span class="d2l-list-item-drag-handle-tooltip-key">${this.localize("components.list-item-drag-handle-tooltip.up-down-key")}</span> - ${this.localize("components.list-item-drag-handle-tooltip.up-down-desc")}</li>
				<li><span class="d2l-list-item-drag-handle-tooltip-key">${this.localize("components.list-item-drag-handle-tooltip.left-right-key")}</span> - ${this.localize("components.list-item-drag-handle-tooltip.left-right-desc")}</li>
			</ul>
		`
    }
}
customElements.define("d2l-list-item-drag-handle", at);
const dt = Object.freeze({
        above: 1,
        below: 2,
        first: 3,
        last: 4,
        shiftDown: 5,
        shiftUp: 6,
        nest: 7,
        void: 0
    }),
    ct = dt,
    ht = t => {
        const e = new Event(t, {
            bubbles: !0
        });
        return e.dataTransfer = {
            setData: () => {}
        }, e
    };
class ut {
    constructor(t) {
        this._dragTargets = t, this._activeDropTarget = null, this._dropTargets = new Map, this._dropLocation = ct.void, this._time = 0
    }
    get dragTargets() {
        return this._dragTargets
    }
    get dropLocation() {
        return this._dropLocation
    }
    get dropTarget() {
        return this._activeDropTarget
    }
    get dropTargetKey() {
        return this._activeDropTarget && this._activeDropTarget.key
    }
    addDropTarget(t) {
        t && !this._dropTargets.has(t) && this._dropTargets.set(t, null)
    }
    clear() {
        this._cleanUpOnLeave(), this._dropTargets.forEach((t, e) => e._draggingOver = !1), this._dropTargets.clear()
    }
    setActiveDropTarget(t, e) {
        this._dropLocation = e, this._activeDropTarget !== t ? (this._cleanUpOnLeave(), this._activeDropTarget = t, this._setPlacementMarkers(), this.addDropTarget(t)) : this._setPlacementMarkers()
    }
    shouldDrop(t) {
        return t - this._time < 1e3
    }
    updateTime(t) {
        this._time = t, this._timeoutId && clearTimeout(this._timeoutId), this._timeoutId = setTimeout(() => {
            this._cleanUpOnLeave(), this._activeDropTarget = null
        }, 1e3)
    }
    _cleanUpOnLeave() {
        this._activeDropTarget && (this._activeDropTarget._draggingOver = !1, this._activeDropTarget._dropLocation = ct.void, this._activeDropTarget._inTopArea = !1, this._activeDropTarget._inBottomArea = !1)
    }
    _setPlacementMarkers() {
        this._activeDropTarget._dropLocation = this.dropLocation
    }
}
let pt = null;

function gt(t) {
    return bt(), pt = new ut(t || []), pt
}

function mt() {
    return pt || gt(), pt
}

function bt() {
    pt && pt.clear(), pt = null
}
class _t {
    constructor({
        dragTargetKey: t,
        dropTargetKey: e,
        dropLocation: o
    }) {
        if (!t) throw new Error(`NewPositionEventDetails must have a targetKey and destinationKey\nGiven: ${t}`);
        this.dragTargetKey = t, this.dropTargetKey = e, this.dropLocation = o
    }
    announceMove(t, {
        announceFn: e,
        keyFn: o
    }) {
        const i = this.fetchPosition(t, this.dragTargetKey, o);
        if (null === i) throw new Error(`Target "${this.dragTargetKey}" not found in array`);
        const n = this._fetchDropTargetPosition(t, i, o);
        if (null === n) throw new Error(`Destination "${this.dropTargetKey}" not found in array`);
        const s = e(t[i], n);
        s && B(s)
    }
    fetchPosition(t, e, o) {
        const i = t.findIndex(t => o(t) === e);
        return -1 === i ? null : i
    }
    reorder(t, {
        announceFn: e,
        keyFn: o
    }) {
        if (void 0 === this.dropTargetKey || this.dropTargetKey === this.dragTargetKey) return;
        e && this.announceMove(t, {
            announceFn: e,
            keyFn: o
        });
        const i = this.fetchPosition(t, this.dragTargetKey, o);
        if (null === i) throw new Error(`Position not found in list:\n\torigin: ${this.dragTargetKey} at ${i}`);
        let n = this._fetchDropTargetPosition(t, i, o);
        if (null === n) throw new Error(`Position not found in list:\n\tdestination: ${this.dropTargetKey} at ${n}`);
        const s = t[i];
        if (i > n) {
            n = this.dropLocation === ct.below ? Math.min(n + 1, t.length - 1) : n;
            for (let e = i; e > n; e--) t[e] = t[e - 1]
        } else {
            n = this.dropLocation === ct.above ? Math.max(n - 1, 0) : n;
            for (let e = i; e < n; e++) t[e] = t[e + 1]
        }
        t[n] = s
    }
    _fetchDropTargetPosition(t, e, o) {
        if (this.dropTargetKey) return this.fetchPosition(t, this.dropTargetKey, o);
        switch (this.dropLocation) {
            case ct.shiftUp:
                return Math.max(0, e - 1);
            case ct.shiftDown:
                return Math.min(t.length - 1, e + 1);
            case ct.first:
                return 0;
            case ct.last:
                return t.length - 1
        }
        return null
    }
}
const vt = t => {
        var e;
        return e = new WeakSet, class extends t {
            static get properties() {
                return {
                    keyboardDragDisabled: {
                        type: Boolean,
                        attribute: "keyboard-drag-disabled"
                    },
                    draggable: {
                        type: Boolean,
                        reflect: !0
                    },
                    dragging: {
                        type: Boolean,
                        reflect: !0
                    },
                    dragHandleText: {
                        type: String,
                        attribute: "drag-handle-text"
                    },
                    dropNested: {
                        type: Boolean,
                        attribute: "drop-nested"
                    },
                    dropText: {
                        type: String,
                        attribute: "drop-text"
                    },
                    key: {
                        type: String,
                        reflect: !0
                    },
                    _dragHandleShowAlways: {
                        type: Boolean,
                        attribute: "_drag-handle-show-always",
                        reflect: !0
                    },
                    _draggingOver: {
                        type: Boolean
                    },
                    _dropLocation: {
                        type: Number,
                        reflect: !0,
                        attribute: "_drop-location"
                    },
                    _focusingDragHandle: {
                        type: Boolean
                    },
                    _hovering: {
                        type: Boolean
                    },
                    _keyboardActive: {
                        type: Boolean
                    },
                    _keyboardTextInfo: {
                        type: Object
                    }
                }
            }
            static get styles() {
                const t = [i `
			:host {
				display: block;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-list-item-drag-bottom-marker,
			.d2l-list-item-drag-top-marker {
				pointer-events: none;
				position: absolute;
				width: 100%;
				z-index: 1;
			}
			.d2l-list-item-drag-bottom-marker {
				bottom: -6px;
			}
			.d2l-list-item-drag-top-marker {
				top: -6px;
			}
			.d2l-list-item-drag-area {
				cursor: move;
				height: 100%;
			}
			.d2l-list-item-drag-drop-grid {
				display: grid;
				grid-template-columns: 100%;
				grid-template-rows: 1rem 1fr 1fr 1rem;
			}
			:host([_drop-location="7"]) {
				z-index: 1; /* drop target border must render on top of next adjacent border */
			}
			:host([_drop-location="7"]) [slot="outside-control-container"] {
				border: 2px solid var(--d2l-color-celestine);
				border-radius: 6px;
			}
			:host([_drop-location="7"]) [slot="control-container"]::after {
				border-color: transparent;
			}
			:host(:not([no-primary-action])) [slot="outside-control-action"] ~ [slot="content"] {
				pointer-events: none;
			}

			@media only screen and (hover: hover), only screen and (pointer: fine) {
				d2l-list-item-drag-handle {
					opacity: 0;
				}
				:host([selected]) d2l-list-item-drag-handle,
				:host([current]) d2l-list-item-drag-handle,
				:host([_drag-handle-show-always]) d2l-list-item-drag-handle,
				:host([_focusing]) d2l-list-item-drag-handle,
				d2l-list-item-drag-handle:hover,
				d2l-list-item-drag-handle.d2l-hovering,
				d2l-list-item-drag-handle.d2l-focusing {
					opacity: 1;
				}
			}
		`];
                return super.styles && t.unshift(super.styles), t
            }
            constructor() {
                super(), N(this, e), this._itemDragId = v(), this.draggable = !1, this.dragging = !1, this.dropNested = !1
            }
            get dropDisabled() {
                return this._dropNestedOnly && !this.dropNested
            }
            connectedCallback() {
                super.connectedCallback(), this.key || (this.draggable = !1);
                const t = this.getRootList();
                this._dragMultiple = t ? .hasAttribute("drag-multiple"), this._dropNestedOnly = t ? .hasAttribute("drop-nested-only"), this._dragHandleShowAlways = t ? .dragHandleShowAlways
            }
            firstUpdated(t) {
                this.addEventListener("dragenter", this._onHostDragEnter.bind(this)), super.firstUpdated(t)
            }
            willUpdate(t) {
                super.willUpdate(t), this._dropNestedOnly && (this.keyboardDragDisabled = !0)
            }
            activateDragHandle() {
                this.shadowRoot && this.shadowRoot.querySelector(`#${this._itemDragId}`).activateKeyboardMode()
            }
            _annoucePositionChange(t, e, o) {
                this.dispatchEvent(new CustomEvent("d2l-list-item-position-change", {
                    detail: new _t({
                        dragTargetKey: t,
                        dropTargetKey: e,
                        dropLocation: o
                    }),
                    bubbles: !0
                }))
            }
            _dispatchListItemsMove(t, e, o, i) {
                i || (i = !1);
                this.getRootList().dispatchEvent(new CustomEvent("d2l-list-items-move", {
                    detail: {
                        keyboardActive: i,
                        sourceItems: t,
                        target: {
                            item: e,
                            location: o
                        }
                    },
                    bubbles: !0
                }))
            }
            _dispatchMoveAroundCollapsedItem(t, e) {
                const o = this._getParentList();
                if (o) {
                    const i = o.getItems(),
                        n = i.indexOf(t);
                    this._dispatchListItemsMove([this], i[n], e ? dt.above : dt.below, !0)
                } else this._dispatchMoveRootItem(e)
            }
            _dispatchMoveListItemFirst(t) {
                const e = (t ? this.getRootList() : I(this, t => "D2L-LIST" === t.tagName)).getItems();
                this._dispatchListItemsMove([this], e[0], dt.above, !0)
            }
            _dispatchMoveListItemLast(t) {
                const e = (t ? this.getRootList() : I(this, t => "D2L-LIST" === t.tagName)).getItems();
                this._dispatchListItemsMove([this], e[e.length - 1], dt.below, !0)
            }
            _dispatchMoveListItemNest() {
                const t = this._getPreviousListItemSibling();
                t && (this._expandListItemOnKeyboardMove(t), this._dispatchListItemsMove([this], t, dt.nest, !0))
            }
            _dispatchMoveListItemNext() {
                const t = this._getNextListItemSibling();
                if (t && t.expandable && !t.expanded) this._dispatchMoveAroundCollapsedItem(t, !1);
                else if (t) {
                    this._expandListItemOnKeyboardMove(t);
                    const e = t._getNestedList(),
                        o = e ? e.getItems() : [];
                    o.length > 0 ? this._dispatchListItemsMove([this], o[0], dt.above, !0) : this._dispatchListItemsMove([this], t, dt.below, !0)
                } else {
                    const t = this._getParentListItem();
                    t ? this._dispatchListItemsMove([this], t, dt.below, !0) : this._dispatchMoveRootItem(!1)
                }
            }
            _dispatchMoveListItemPrevious() {
                const t = this._getPreviousListItemSibling();
                if (t && t.expandable && !t.expanded) this._dispatchMoveAroundCollapsedItem(t, !0);
                else if (t) {
                    const e = t._getNestedList(),
                        o = e ? e.getItems() : [];
                    o.length > 0 ? this._dispatchListItemsMove([this], o[o.length - 1], dt.below, !0) : this._dispatchListItemsMove([this], t, dt.above, !0)
                } else {
                    const t = this._getParentListItem();
                    t ? this._dispatchListItemsMove([this], t, dt.above, !0) : this._dispatchMoveRootItem(!0)
                }
            }
            _dispatchMoveListItemUnnest() {
                const t = this._getParentListItem();
                t && (this._expandListItemOnKeyboardMove(t), this._dispatchListItemsMove([this], t, dt.below, !0))
            }
            _dispatchMoveRootItem(t) {
                const e = this.getRootList().getItems(),
                    o = e.indexOf(this);
                t && 0 !== o ? this._dispatchListItemsMove([this], e[o - 1], dt.above, !0) : t || o === e.length - 1 || this._dispatchListItemsMove([this], e[o + 1], dt.below, !0)
            }
            _expandListItemOnKeyboardMove(t) {
                this._keyboardActive && t.expandable && !t.expanded && t._toggleExpandCollapse()
            }
            _findListItemFromCoordinates(t, e) {
                return I(this.parentNode, t => t && "D2L-LIST" === t.tagName).shadowRoot.elementFromPoint(t, e)
            }
            _getKeyboardText() {
                const t = this.parentNode;
                this._keyboardTextInfo = JSON.stringify({
                    currentPosition: t.getListItemIndex(this) + 1,
                    count: t.getListItemCount()
                })
            }
            _onContextMenu(t) {
                (() => {
                    const t = document.createElement("div");
                    return t.setAttribute("ondragenter", "return;"), "function" == typeof t.ondragenter
                })() || (t.preventDefault(), t.stopPropagation())
            }
            _onDragEnd(t) {
                const e = mt();
                if (this.dragging = !1, !e.dropTarget ? .dropDisabled && "none" !== t.dataTransfer.dropEffect && e.shouldDrop(t.timeStamp)) {
                    const t = I(e.dropTarget, t => "D2L-LIST" === t.tagName);
                    !e.dragTargets.find(e => I(e, t => "D2L-LIST" === t.tagName) !== t) && 1 === e.dragTargets.length && this._annoucePositionChange(e.dragTargets[0].key, e.dropTargetKey, e.dropLocation), this._dispatchListItemsMove(e.dragTargets, e.dropTarget, e.dropLocation, !1)
                }
                const o = this.shadowRoot.querySelector(".d2l-list-item-drag-image") || this;
                o && o.classList.remove("dragging"), bt()
            }
            _onDragHandleActions(t) {
                switch (t.detail.action) {
                    case lt.active:
                        this._keyboardActive = !0;
                        break;
                    case lt.cancel:
                    case lt.save:
                        this._keyboardActive = !1;
                        break;
                    case lt.up:
                        this._annoucePositionChange(this.key, null, ct.shiftUp), this._dispatchMoveListItemPrevious();
                        break;
                    case lt.down:
                        this._annoucePositionChange(this.key, null, ct.shiftDown), this._dispatchMoveListItemNext();
                        break;
                    case lt.nest:
                        this._dispatchMoveListItemNest();
                        break;
                    case lt.unnest:
                        this._dispatchMoveListItemUnnest();
                        break;
                    case lt.first:
                        this._annoucePositionChange(this.key, null, ct.first), this._dispatchMoveListItemFirst();
                        break;
                    case lt.rootFirst:
                        this._dispatchMoveListItemFirst(!0);
                        break;
                    case lt.last:
                        this._annoucePositionChange(this.key, null, ct.last), this._dispatchMoveListItemLast();
                        break;
                    case lt.rootLast:
                        this._dispatchMoveListItemLast(!0)
                }
            }
            _onDragOver(t) {
                if (!this.key || this.dropDisabled) return;
                mt().updateTime(t.timeStamp), t.preventDefault()
            }
            _onDragStart(t) {
                t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData && this.dropText && t.dataTransfer.setData("text/plain", `${this.dropText}`);
                const e = (t, e) => {
                        let o = this.shadowRoot.querySelector("d2l-list-item-drag-image");
                        return o || (o = document.createElement("d2l-list-item-drag-image"), this.shadowRoot.appendChild(o)), o.count = t, o.includePlusSign = e, o
                    },
                    o = this.getRootList(this),
                    i = o.getSelectionInfo(o.dragMultiple);
                if (o.dragMultiple && i.keys.length > 1) {
                    const o = this._getFlattenedListItems().lazyLoadListItems;
                    let n = !1;
                    if (o.size > 0)
                        for (const t of i.keys)
                            if (o.has(t)) {
                                n = !0;
                                break
                            }
                    t.dataTransfer.setDragImage && t.dataTransfer.setDragImage(e(i.keys.length, n), 24, 26)
                } else if (o.dragMultiple && this.expandable) {
                    const o = this._getFlattenedListItems(this);
                    t.dataTransfer.setDragImage && t.dataTransfer.setDragImage(e(o.listItems.size, o.lazyLoadListItems.size > 0), 24, 26)
                } else if (this.shadowRoot) {
                    const e = this.shadowRoot.querySelector(".d2l-list-item-drag-image") || this;
                    e.classList.add("dragging"), t.dataTransfer.setDragImage && t.dataTransfer.setDragImage(e, 50, 50)
                }
                if (o.dragMultiple && i.state !== F.states.none) {
                    const t = e => {
                        let o = [];
                        return e.getItems().forEach(e => {
                            e.selected || e === this ? o.push(e) : e._selectionProvider && (o = [...o, ...t(e._selectionProvider)])
                        }), o
                    };
                    gt(t(o))
                } else gt([this]);
                setTimeout(() => {
                    this.dragging = !0
                })
            }
            _onDragTargetClick(t) {
                this.shadowRoot && (this._keyboardActiveOnNextClick ? this.shadowRoot.querySelector(`#${this._itemDragId}`).activateKeyboardMode() : this.shadowRoot.querySelector(`#${this._itemDragId}`).focus(), this._keyboardActiveOnNextClick = !1, t.preventDefault(), t.stopPropagation())
            }
            _onDragTargetMouseDown() {
                this._keyboardActiveOnNextClick = this._focusingDragHandle
            }
            _onDrop() {
                const t = mt();
                t.setActiveDropTarget(this, t.dropLocation)
            }
            _onDropTargetBottomDragEnter(t) {
                P(e, this, o).call(this, t, !1, !1)
            }
            _onDropTargetLowerDragEnter(t) {
                P(e, this, o).call(this, t, !1, !0)
            }
            _onDropTargetTopDragEnter(t) {
                P(e, this, o).call(this, t, !0, !1)
            }
            _onDropTargetUpperDragEnter(t) {
                P(e, this, o).call(this, t, !0, !0)
            }
            _onFocusinDragHandle() {
                this._focusingDragHandle = !0, this._getKeyboardText()
            }
            _onFocusoutDragHandle() {
                this._focusingDragHandle = !1
            }
            _onHostDragEnter(t) {
                const e = mt();
                if (e.dragTargets.find(t => T(t, this))) return void e.clear();
                const o = e.dragTargets[0] && e.dragTargets[0].getRootList();
                this.getRootList() === o && (e.addDropTarget(this), this._draggingOver = !0, t.dataTransfer.dropEffect = "move")
            }
            _onTouchCancel() {
                this._touchTimeoutId && clearTimeout(this._touchTimeoutId), this._touchStarted = !1
            }
            _onTouchEnd(t) {
                if (this._touchTimeoutId && clearTimeout(this._touchTimeoutId), !this._touchStarted) return;
                t.preventDefault(), this._touchStarted = !1, this._currentTouchListItem = void 0;
                const e = t.changedTouches[0],
                    o = this._findListItemFromCoordinates(e.clientX, e.clientY).shadowRoot.querySelector(".d2l-list-item-drag-drop-grid");
                o && o.dispatchEvent(ht("drop")), this.shadowRoot && this.shadowRoot.querySelector(".d2l-list-item-drag-area").dispatchEvent(ht("dragend"))
            }
            _onTouchMove(t) {
                if (!this._touchStarted) return;
                t.cancelable && t.preventDefault();
                const e = t.changedTouches[0],
                    o = this._findListItemFromCoordinates(e.clientX, e.clientY);
                if (!o) return;
                o !== this && this._currentTouchListItem !== o && (o.dispatchEvent(ht("dragenter")), this._currentTouchListItem = o);
                const i = o.shadowRoot.querySelector(".d2l-list-item-drag-drop-grid");
                if (!i) return;
                const n = o.shadowRoot.elementFromPoint(e.clientX, e.clientY);
                n && n.parentNode === i && (i.dispatchEvent(ht("dragover")), this._currentTouchDropArea !== n && (n.dispatchEvent(ht("dragenter")), this._currentTouchDropArea = n)), e.clientY > window.innerHeight / 2 && window.innerHeight - e.clientY < 150 ? window.scrollBy(0, 10) : e.clientY < window.innerHeight / 2 && e.clientY < 150 && window.scrollBy(0, -10)
            }
            _onTouchStart() {
                this._touchTimeoutId && clearTimeout(this._touchTimeoutId), this._touchTimeoutId = setTimeout(() => {
                    this._touchStarted = !0, this.shadowRoot && this.shadowRoot.querySelector(".d2l-list-item-drag-area").dispatchEvent(ht("dragstart"))
                }, 400)
            }
            _renderBottomPlacementMarker(t) {
                return this._dropLocation === ct.below ? s `<div class="d2l-list-item-drag-bottom-marker">${t}</div>` : null
            }
            _renderDragHandle(t) {
                t = t || (t => t);
                const e = {
                    "d2l-focusing": this._focusingDragHandle,
                    "d2l-hovering": this._hovering
                };
                return this.draggable ? t(s `
			<d2l-list-item-drag-handle
				id="${this._itemDragId}"
				class="${D(e)}"
				?disabled="${this.keyboardDragDisabled}"
				text="${f(this.dragHandleText)}"
				keyboard-text-info="${f(this._keyboardTextInfo)}"
				@focusin="${this._onFocusinDragHandle}"
				@focusout="${this._onFocusoutDragHandle}"
				@d2l-list-item-drag-handle-action="${this._onDragHandleActions}">
			</d2l-list-item-drag-handle>
		`) : l
            }
            _renderDragMultipleImage() {
                return this._dragMultiple && this.draggable && (this.selectable || this.expandable) ? s `<d2l-list-item-drag-image></d2l-list-item-drag-image>` : l
            }
            _renderDragTarget(t) {
                return t = t || (t => t), this.draggable && !this._keyboardActive ? t.call(this, s `
			<div
				class="d2l-list-item-drag-area"
				draggable="true"
				@click="${this._onDragTargetClick}"
				@contextmenu="${this._onContextMenu}"
				@dragstart="${this._onDragStart}"
				@dragend="${this._onDragEnd}"
				@touchstart="${this._onTouchStart}"
				@touchmove="${this._onTouchMove}"
				@touchend="${this._onTouchEnd}"
				@touchcancel="${this._onTouchCancel}"
				@mousedown="${this._onDragTargetMouseDown}"
				>
			</div>
		`) : l
            }
            _renderDropTarget(t) {
                return t = t || (t => t), this.draggable && this._draggingOver ? t(s `
			<div class="d2l-list-item-drag-drop-grid" slot="drop-target" @drop="${this._onDrop}" @dragover="${this._onDragOver}">
				<div @dragenter="${this._onDropTargetTopDragEnter}"></div>
				<div @dragenter="${this._onDropTargetUpperDragEnter}"></div>
				<div @dragenter="${this._onDropTargetLowerDragEnter}"></div>
				<div @dragenter="${this._onDropTargetBottomDragEnter}"></div>
			</div>
		`) : l
            }
            _renderTopPlacementMarker(t) {
                return this._dropLocation === ct.above ? s `<div class="d2l-list-item-drag-top-marker">${t}</div>` : null
            }
        };

        function o(t, e, o) {
            if (this.dropDisabled) return;
            let i;
            t.dataTransfer.dropEffect = "move", this._dropNestedOnly || o && this.dropNested ? i = dt.nest : o ? e ? (i = this._inTopArea ? dt.below : dt.above, this._inTopArea = !1) : (i = this._inBottomArea ? dt.above : dt.below, this._inBottomArea = !1) : (i = e ? ct.above : ct.below, this._inTopArea = e, this._inBottomArea = !e);
            mt().setActiveDropTarget(this, i)
        }
    },
    ft = t => class extends(L(t)) {
        static get properties() {
            return {
                expandable: {
                    type: Boolean
                },
                expanded: {
                    type: Boolean,
                    reflect: !0
                },
                _siblingHasNestedItems: {
                    state: !0
                },
                _renderExpandCollapseSlot: {
                    type: Boolean,
                    reflect: !0,
                    attribute: "_render-expand-collapse-slot"
                },
                _showNestedLoadingSpinner: {
                    state: !0
                }
            }
        }
        static get styles() {
            const t = [i `
			:host {
				--d2l-expand-collapse-slot-transition-duration: 0.3s;
			}
			.d2l-list-expand-collapse {
				line-height: 0;
				width: 0;
			}
			.d2l-list-expand-collapse d2l-button-icon {
				--d2l-button-icon-min-height: 1.2rem;
				--d2l-button-icon-min-width: 1.2rem;
			}
			.d2l-list-expand-collapse:hover d2l-button-icon {
				background-color: var(--d2l-button-icon-background-color-hover);
				border-radius: var(--d2l-button-icon-border-radius);
			}
			:host([_render-expand-collapse-slot]) .d2l-list-expand-collapse {
				padding-block-start: 0.55rem;
				padding-inline-end: 0.3rem;
				width: 1.2rem;
			}
			.d2l-list-expand-collapse-action {
				cursor: pointer;
				display: block;
				height: 100%;
			}
			.d2l-list-nested-loading {
				display: flex;
				justify-content: center;
				padding: 0.4rem;
			}

			@media (prefers-reduced-motion: no-preference) {
				.d2l-list-expand-collapse {
					transition: width var(--d2l-expand-collapse-slot-transition-duration) cubic-bezier(0, 0.7, 0.5, 1);
				}
			}
		`];
            return super.styles && t.unshift(super.styles), t
        }
        constructor() {
            super(), this._siblingHasNestedItems = !1, this._renderExpandCollapseSlot = !1, this._showNestedLoadingSpinner = !1, this._parentChildUpdateSubscription = new H(this, "list-child-status")
        }
        connectedCallback() {
            super.connectedCallback(), !this.key && this.expandable && (console.warn("ListItemExpandCollapseMixin requires a key."), this.expandable = !1)
        }
        willUpdate(t) {
            if (super.willUpdate(t), (t.has("_siblingHasNestedItems") || t.has("expandable")) && (this._renderExpandCollapseSlot = this.expandable || this._siblingHasNestedItems), t.has("_draggingOver") && this._draggingOver && this.dropNested && !this.expanded && this.expandable) {
                let t = 0,
                    e = null;
                e = setInterval(() => {
                    t >= 1e3 ? (this._draggingOver && this._toggleExpandCollapse(), clearInterval(e)) : this._draggingOver ? t += 100 : clearInterval(e)
                }, 100)
            }(t.has("expanded") || t.has("_hasNestedList")) && (this._showNestedLoadingSpinner = this.expanded && !this._hasNestedList)
        }
        updateSiblingHasChildren(t) {
            this._siblingHasNestedItems = t
        }
        _renderExpandCollapse() {
            return this.expandable ? s `
			<d2l-button-icon
				class="d2l-skeletize"
				icon="${this.expanded?"tier1:arrow-collapse-small":"tier1:arrow-expand-small"}"
				expanded="${this.expanded?"true":"false"}"
				text="${this.label}"
				@click="${this._toggleExpandCollapse}"></d2l-button-icon>` : l
        }
        _renderExpandCollapseAction(t) {
            return this.selectable || !this.expandable || this.noPrimaryAction ? l : s `<div class="d2l-list-expand-collapse-action" @click="${this._toggleExpandCollapseAction}">${t||l}</div>`
        }
        _renderNestedLoadingSpinner() {
            return this.expandable && this._showNestedLoadingSpinner ? s `
			<div class="d2l-list-nested-loading">
				<d2l-loading-spinner size="40"></d2l-loading-spinner>
			</div>` : l
        }
        _toggleExpandCollapse(t = null) {
            t && t.stopPropagation(), this.expandable && (this.expanded = !this.expanded, this.dispatchEvent(new CustomEvent("d2l-list-item-expand-collapse-toggled", {
                composed: !0,
                bubbles: !0
            })))
        }
        _toggleExpandCollapseAction(t = null) {
            t && Lt(t, t => t === this.shadowRoot.querySelector("div.d2l-list-expand-collapse-action")) ? t.preventDefault() : this._toggleExpandCollapse(t)
        }
    },
    yt = t => class extends t {
        static get properties() {
            return {
                role: {
                    type: String,
                    reflect: !0
                },
                _nested: {
                    type: Boolean,
                    reflect: !0
                },
                _separators: {
                    type: String,
                    reflect: !0
                }
            }
        }
        constructor() {
            super(), this._nested = !1
        }
        connectedCallback() {
            super.connectedCallback();
            const t = I(this.parentNode, t => t && "D2L-LIST" === t.tagName);
            if (!t) return;
            const e = t.getAttribute("separators");
            this.role = t.hasAttribute("grid") ? "row" : "listitem", this._nested = "nested" === t.slot, this._separators = e || void 0, this._extendSeparators = t.hasAttribute("extend-separators")
        }
    };
let xt = !1,
    wt = !1;
let kt = !1;

function Lt(o, i) {
    const n = { ...t,
        "d2l-button": !0,
        "d2l-tooltip-help": !0
    };
    return e(o.composedPath(), i, {
        elements: n
    })
}
const It = t => class extends(E(t, A, y, ft, vt, nt, yt, L)) {
    static get properties() {
        return {
            color: {
                type: String
            },
            first: {
                type: Boolean,
                reflect: !0
            },
            dragTargetHandleOnly: {
                type: Boolean,
                attribute: "drag-target-handle-only"
            },
            indentation: {
                type: Number,
                reflect: !0
            },
            last: {
                type: Boolean,
                reflect: !0
            },
            layout: {
                type: String,
                reflect: !0
            },
            noPrimaryAction: {
                type: Boolean,
                attribute: "no-primary-action"
            },
            paddingType: {
                type: String,
                attribute: "padding-type"
            },
            tileHeader: {
                type: Boolean,
                reflect: !0,
                attribute: "tile-header"
            },
            tilePaddingType: {
                type: String,
                attribute: "tile-padding-type"
            },
            _addButtonText: {
                state: !0
            },
            _displayKeyboardTooltip: {
                type: Boolean
            },
            _hasColorSlot: {
                type: Boolean,
                reflect: !0,
                attribute: "_has-color-slot"
            },
            _hasListItemContent: {
                state: !0
            },
            _hasNestedList: {
                type: Boolean,
                reflect: !0,
                attribute: "_has-nested-list"
            },
            _hasNestedListAddButton: {
                type: Boolean,
                reflect: !0,
                attribute: "_has-nested-list-add-button"
            },
            _hovering: {
                type: Boolean,
                reflect: !0
            },
            _hoveringControl: {
                type: Boolean,
                attribute: "_hovering-control",
                reflect: !0
            },
            _hoveringPrimaryAction: {
                type: Boolean,
                attribute: "_hovering-primary-action",
                reflect: !0
            },
            _focusing: {
                type: Boolean,
                reflect: !0
            },
            _focusingPrimaryAction: {
                type: Boolean,
                attribute: "_focusing-primary-action",
                reflect: !0
            },
            _forceShowSelection: {
                type: Boolean,
                attribute: "_force-show-selection",
                reflect: !0
            },
            _highlight: {
                type: Boolean,
                reflect: !0
            },
            _highlighting: {
                type: Boolean,
                reflect: !0
            },
            _showAddButton: {
                type: Boolean,
                attribute: "_show-add-button",
                reflect: !0
            },
            _selectionWhenInteracted: {
                type: Boolean,
                attribute: "_selection-when-interacted",
                reflect: !0
            },
            _siblingHasColor: {
                state: !0
            }
        }
    }
    static get styles() {
        const t = [i `
			:host {
				display: block;
				position: relative;
			}
			:host([layout="tile"]) {
				display: inline-block;
				flex: none;
				width: 14rem;
			}
			:host[hidden] {
				display: none;
			}

			:host d2l-list-item-generic-layout {
				--d2l-list-item-border-color: var(--d2l-color-mica);
				--d2l-list-item-illustration-border-radius: 5px;
				--d2l-list-item-padding: 0.6rem;
			}

			:host([dragging]) d2l-list-item-generic-layout {
				filter: grayscale(75%);
				opacity: 0.4;
			}
			:host([dragging]) .d2l-list-item-drag-image {
				background: white;
			}

			[slot="control-container"] {
				pointer-events: none;
				position: relative;
			}

			:host(:first-of-type) [slot="control-container"]::before,
			[slot="control-container"]::after,
			:host(:not([_separators="none"])[expandable][expanded]:not(:last-of-type))::after,
			:host(:not([_separators="none"])[_has-nested-list]:not([expandable]):not(:last-of-type))::after {
				border-top: 1px solid var(--d2l-color-mica);
				content: "";
				position: absolute;
				width: 100%;
			}
			:host([draggable][expandable][expanded]:not(:last-of-type))::after,
			:host([draggable][_has-nested-list]:not([expandable]):not(:last-of-type))::after {
				inset-inline-start: 1.5rem; /* left and right margins of 0.3rem + drag handle width of 0.9rem */
				width: calc(100% - 1.5rem);
			}
			:host(:first-of-type) [slot="control-container"]::before {
				top: 0;
			}
			[slot="control-container"]::after {
				bottom: -1px;
			}

			:host(:first-of-type[_separators="between"]) [slot="control-container"]::before,
			:host(:last-of-type[_separators="between"]) [slot="control-container"]::after,
			:host([_separators="none"]) [slot="control-container"]::before,
			:host([_separators="none"]) [slot="control-container"]::after,
			:host([_hovering-selection]) [slot="control-container"]::before,
			:host([_hovering-selection]) [slot="control-container"]::after,
			:host([_hovering-primary-action]) [slot="control-container"]::before,
			:host([_hovering-primary-action]) [slot="control-container"]::after,
			:host([selectable][_focusing]:not([selection-disabled])) [slot="control-container"]::before,
			:host([selectable][_focusing]:not([selection-disabled])) [slot="control-container"]::after,
			:host([_focusing-primary-action]) [slot="control-container"]::before,
			:host([_focusing-primary-action]) [slot="control-container"]::after,
			:host([selected]:not([selection-disabled]):not([skeleton])) [slot="control-container"]::before,
			:host([selected]:not([selection-disabled]):not([skeleton])) [slot="control-container"]::after,
			:host(:first-of-type[_nested]) [slot="control-container"]::before {
				border-top-color: transparent;
			}

			:host([padding-type="none"]) d2l-list-item-generic-layout {
				border-bottom: 0;
				border-top: 0;
			}

			:host(:not([layout="tile"]):not([_render-expand-collapse-slot])) .d2l-list-item-content-extend-separators > [slot="control"] {
				width: 2.9rem;
			}
			:host(:not([layout="tile"]):not([_render-expand-collapse-slot])) .d2l-list-item-content-extend-separators > [slot="control"] ~ [slot="control-action"] [slot="content"] {
				padding-inline-start: 2.9rem;
			}
			:host(:not([_has-color-slot])) .d2l-list-item-content-extend-separators [slot="content"] {
				padding-inline: 0.9rem;
			}
			:host([selectable]:not([_has-color-slot])) .d2l-list-item-content-extend-separators [slot="content"],
			:host([selectable]) .d2l-list-item-content-extend-separators > [slot="content"] {
				padding-inline-start: 0;
			}

			:host([_hovering-primary-action]) .d2l-list-item-content,
			:host([_focusing-primary-action]) .d2l-list-item-content {
				--d2l-list-item-content-text-color: var(--d2l-color-celestine);
				--d2l-list-item-content-text-decoration: underline;
			}
			:host([_focusing-primary-action]) .d2l-list-item-content {
				--d2l-list-item-content-text-border-radius: 3px;
				--d2l-list-item-content-text-outline: 2px solid var(--d2l-color-celestine);
				--d2l-list-item-content-text-outline-offset: 1px;
			}
			:host([_focusing-primary-action]:not([padding-type="none"])) .d2l-list-item-content.d2l-list-item-content-none {
				border-radius: 6px;
				outline: var(--d2l-list-item-content-text-outline);
				outline-offset: -4px;
			}
			@supports selector(:has(a, b)) {
				:host([_focusing-primary-action]) .d2l-list-item-content {
					--d2l-list-item-content-text-border-radius: initial;
					--d2l-list-item-content-text-outline: initial;
					--d2l-list-item-content-text-outline-offset: initial;
				}
				:host([_focusing-primary-action]):has(:focus-visible) .d2l-list-item-content {
					--d2l-list-item-content-text-border-radius: 3px;
					--d2l-list-item-content-text-outline: 2px solid var(--d2l-color-celestine);
					--d2l-list-item-content-text-outline-offset: 1px;
				}
				:host([_focusing-primary-action]:not([padding-type="none"])) .d2l-list-item-content.d2l-list-item-content-none {
					border-radius: initial;
					outline: initial;
					outline-offset: initial;
				}
				:host([_focusing-primary-action]:not([padding-type="none"])):has(:focus-visible) .d2l-list-item-content.d2l-list-item-content-none {
					border-radius: 8px;
					outline: var(--d2l-list-item-content-text-outline);
					outline-offset: -4px;
				}
			}

			[slot="content-action"] {
				height: 100%;
			}
			[slot="content-action"]:focus {
				outline: none;
			}
			[slot="content"] {
				display: flex;
				justify-content: start;
				padding-block: 0.55rem;
				padding-inline: 0 0.55rem;
			}
			:host([padding-type="none"]) [slot="content"] {
				padding-bottom: 0;
				padding-top: 0;
			}

			[slot="control"] ~ [slot="control-action"] [slot="content"] {
				padding-inline-start: 2.1rem; /* width of "control" slot set in generic-layout */
			}

			[slot="content"] ::slotted([slot="illustration"]),
			[slot="content"] .d2l-list-item-illustration > * {
				border-radius: 6px;
				flex-grow: 0;
				flex-shrink: 0;
				margin-inline-end: var(--d2l-list-item-illustration-margin-inline-end, 0.9rem);
				max-height: var(--d2l-list-item-illustration-max-height, 2.6rem);
				max-width: var(--d2l-list-item-illustration-max-width, 4.5rem);
				overflow: hidden;
			}
			[slot="content"] ::slotted(d2l-icon[slot="illustration"]),
			[slot="content"] .d2l-list-item-illustration d2l-icon {
				border-radius: 0;
				color: var(--d2l-list-item-content-text-color);
			}

			.d2l-list-item-actions-container {
				padding: 0.55rem 0;
			}

			::slotted([slot="actions"]),
			.d2l-list-item-actions > * {
				display: grid;
				gap: 0.3rem;
				grid-auto-columns: 1fr;
				grid-auto-flow: column;
			}

			.d2l-list-item-content-extend-separators ::slotted([slot="actions"]),
			.d2l-list-item-content-extend-separators .d2l-list-item-actions > * {
				margin-inline-end: 0.9rem;
			}

			d2l-selection-input {
				margin-block: 0.55rem;
				margin-inline-end: 0.55rem;
			}
			:host(:not([layout="tile"]):not([_render-expand-collapse-slot])) .d2l-list-item-content-extend-separators d2l-selection-input {
				margin-inline-start: 0.9rem;
			}
			:host(:not([_render-expand-collapse-slot])[_has-color-slot]) .d2l-list-item-content-extend-separators d2l-selection-input {
				margin-inline-start: 0.6rem;
			}

			d2l-list-item-drag-handle {
				margin: 0.25rem 0.3rem;
			}

			[slot="outside-control-container"] {
				border: 1px solid transparent;
				border-radius: 6px;
				margin: 0 -12px;
			}
			:host(:not([layout="tile"])) .d2l-list-item-content-extend-separators [slot="outside-control-container"] {
				border-left: none !important;
				border-radius: 0 !important;
				border-right: none !important;
			}
			:host([draggable]) [slot="outside-control-container"],
			.d2l-list-item-content-extend-separators [slot="outside-control-container"] {
				margin: 0;
			}
			:host([draggable]) [slot="outside-control-container"] {
				margin-inline-end: -12px;
			}

			:host([_has-color-slot]) .d2l-list-item-content-extend-separators [slot="outside-control-container"] {
				margin-inline-end: 0 !important;
				margin-inline-start: 0 !important;
			}

			:host(:not([draggable])[_has-color-slot]) [slot="outside-control-container"] {
				margin-inline-start: -6px;
			}

			:host([_hovering-control]) [slot="outside-control-container"],
			:host([_hovering-primary-action]) [slot="outside-control-container"],
			:host([_hovering-selection]) [slot="outside-control-container"],
			:host([_focusing-primary-action]) [slot="outside-control-container"],
			:host(:not([selection-disabled]):not([skeleton])[selected][_hovering-selection]) [slot="outside-control-container"],
			:host(:not([selection-disabled]):not([button-disabled]):not([skeleton])[_focusing]:not([current])) [slot="outside-control-container"] {
				border-color: var(--d2l-color-mica);
				margin-bottom: -1px;
			}
			:host([_hovering-control]) d2l-button-add,
			:host([_hovering-primary-action]) d2l-button-add,
			:host([_hovering-selection]) d2l-button-add,
			:host([_focusing-primary-action]) d2l-button-add,
			:host(:not([selection-disabled]):not([skeleton])[selectable][_focusing]) d2l-button-add,
			:host(:not([selection-disabled]):not([skeleton])[selected]) d2l-button-add {
				--d2l-button-add-line-color: var(--d2l-color-mica);
			}
			:host([_hovering-control]) [slot="outside-control-container"],
			:host([_hovering-primary-action]) [slot="outside-control-container"],
			:host([_hovering-selection]) [slot="outside-control-container"] {
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			}
			:host(:not([selection-disabled]):not([skeleton])[selected]) [slot="outside-control-container"] {
				background-color: #f3fbff;
				border-color: var(--d2l-color-mica);
				margin-bottom: -1px;
			}

			:host(:not([selection-disabled]):not([skeleton])[padding-type="none"]) [slot="outside-control-container"] {
				border-color: transparent;
				margin: 0;
			}

			:host([_highlight]) [slot="outside-control-container"] {
				transition: background-color 400ms linear, border-color 400ms linear;
			}
			:host([_highlight]:first-of-type) [slot="control-container"]::before,
			:host([_highlight]) [slot="control-container"]::after {
				transition: border-color 400ms linear;
			}
			:host([_highlighting]) [slot="outside-control-container"],
			:host([_hovering-selection][_highlighting]) [slot="outside-control-container"],
			:host(:not([selection-disabled]):not([skeleton])[_focusing][_highlighting]) [slot="outside-control-container"],
			:host(:not([selection-disabled]):not([skeleton])[selected][_highlighting]) [slot="outside-control-container"] {
				background-color: var(--d2l-color-celestine-plus-2);
				border-color: var(--d2l-color-celestine);
			}
			:host([_highlighting]:first-of-type) [slot="control-container"]::before,
			:host([_highlighting]) [slot="control-container"]::after {
				border-color: transparent;
			}

			d2l-tooltip > div {
				font-weight: 700;
			}
			d2l-tooltip > ul {
				padding-inline-start: 1rem;
			}
			.d2l-list-item-tooltip-key {
				font-weight: 700;
			}
			:host([skeleton]) {
				pointer-events: none;
			}

			.d2l-list-item-color-inner {
				border-radius: var(--d2l-list-item-color-border-radius, 6px);
				height: 100%;
				width: var(--d2l-list-item-color-width, 6px);
			}
			.d2l-list-item-color-outer {
				padding-block: 2px 1px;
				padding-inline: 0 12px;
			}
			:host(:not([_nested])) .d2l-list-item-content-extend-separators .d2l-list-item-color-outer {
				padding-inline-start: 3px;
			}
			:host([selectable]:not([_render-expand-collapse-slot])) .d2l-list-item-content-extend-separators .d2l-list-item-color-outer {
				padding-inline-end: 0;
			}
			.d2l-list-item-color-outer + .d2l-list-expand-collapse {
				margin-inline-start: -6px;
			}

			[slot="add"],
			[slot="add-top"] {
				margin-bottom: -12.5px;
				margin-top: -11.5px;
			}
			:host([draggable][selectable][_hovering]) [slot="add"],
			:host([draggable][selectable][_focusing]) [slot="add"],
			:host([draggable][selectable][_hovering]) [slot="add-top"],
			:host([draggable][selectable][_focusing]) [slot="add-top"] {
				padding-inline-end: 6px;
			}
			.dragging [slot="add"] {
				display: none;
			}

			:host([layout="tile"]) .d2l-list-item-content {
				box-sizing: border-box;
				flex-direction: column;
				height: 100%;
				padding: var(--d2l-list-item-padding);
			}
			:host([layout="tile"][tile-padding-type="none"]) .d2l-list-item-content {
				padding: 0;
			}

			:host([layout="tile"][_selection-when-interacted]) [slot="control"] {
				opacity: 0;
				transform: translateY(-10px);
				transition: opacity 200ms ease-out, transform 0ms ease-out 300ms;
			}
			:host([layout="tile"][_selection-when-interacted]) [slot="control"]:hover,
			:host([layout="tile"][_selection-when-interacted][_focusing]) [slot="control"],
			:host([layout="tile"][_selection-when-interacted][_force-show-selection]) [slot="control"],
			:host([layout="tile"][_selection-when-interacted][_hovering-selection]) [slot="control"],
			:host([layout="tile"][_selection-when-interacted][_hovering]) [slot="control"] {
				opacity: 1;
				transform: none;
				transition: opacity 200ms ease-out, transform 200ms ease-out;
			}

			@media (prefers-reduced-motion: reduce) {
				:host([layout="tile"][_selection-when-interacted]) [slot="control"] {
					transform: none;
					transition: none;
				}
				:host([layout="tile"][_selection-when-interacted]) [slot="control"]:hover,
				:host([layout="tile"][_selection-when-interacted][_focusing]) [slot="control"],
				:host([layout="tile"][_selection-when-interacted][_force-show-selection]) [slot="control"],
				:host([layout="tile"][_selection-when-interacted][_hovering-selection]) [slot="control"],
				:host([layout="tile"][_selection-when-interacted][_hovering]) [slot="control"] {
					transition: none;
				}
			}

			:host([layout="tile"]) [slot="content"] ::slotted([slot="illustration"]),
			:host([layout="tile"]) .d2l-list-item-illustration > * {
				border-end-end-radius: 0;
				border-end-start-radius: 0;
				border-start-end-radius: var(--d2l-list-item-illustration-border-radius);
				border-start-start-radius: var(--d2l-list-item-illustration-border-radius);
				box-sizing: border-box;
				margin-block: calc(-1 * var(--d2l-list-item-padding) + 1px) var(--d2l-list-item-padding);
				margin-inline: calc(-1 * var(--d2l-list-item-padding) + 1px);
				max-height: unset;
				max-width: calc(100% + 1.1rem);
			}
			:host([layout="tile"][tile-padding-type="none"]) [slot="content"] ::slotted([slot="illustration"]),
			:host([layout="tile"][tile-padding-type="none"]) .d2l-list-item-illustration > * {
				margin-block: 0;
				margin-inline: 0;
			}

			:host([layout="tile"][tile-header]) [slot="content"] ::slotted([slot="illustration"]),
			:host([layout="tile"][tile-header]) .d2l-list-item-illustration > * {
				border-radius: 0;
				margin-block: calc(-1 * var(--d2l-list-item-padding)) var(--d2l-list-item-padding);
			}
			:host([layout="tile"][tile-header][tile-padding-type="none"]) [slot="content"] ::slotted([slot="illustration"]),
			:host([layout="tile"][tile-header][tile-padding-type="none"]) .d2l-list-item-illustration > * {
				margin-block: 0;
			}

			:host([layout="tile"]) [slot="content"] ::slotted(d2l-icon[slot="illustration"]),
			:host([layout="tile"]) .d2l-list-item-illustration > d2l-icon[slot="illustration"] {
				padding: 1rem;
			}

			:host([layout="tile"]) [slot="content"] ::slotted(div[slot="illustration"]),
			:host([layout="tile"]) .d2l-list-item-illustration > div[slot="illustration"],
			:host([layout="tile"]) [slot="content"] ::slotted(d2l-icon[slot="illustration"]),
			:host([layout="tile"]) .d2l-list-item-illustration > d2l-icon[slot="illustration"] {
				border-bottom: 1px solid var(--d2l-list-item-border-color);
				width: calc(100% + 1.1rem);
			}
			:host([layout="tile"][tile-padding-type="none"]) [slot="content"] ::slotted(div[slot="illustration"]),
			:host([layout="tile"][tile-padding-type="none"]) .d2l-list-item-illustration > div[slot="illustration"],
			:host([layout="tile"][tile-padding-type="none"]) [slot="content"] ::slotted(d2l-icon[slot="illustration"]),
			:host([layout="tile"][tile-padding-type="none"]) .d2l-list-item-illustration > d2l-icon[slot="illustration"] {
				width: 100%;
			}

			:host([layout="tile"]:not([selection-disabled]):not([skeleton])[padding-type="none"]) [slot="outside-control-container"],
			:host([layout="tile"]) [slot="outside-control-container"] {
				border-color: var(--d2l-list-item-border-color);
				margin: 0;
			}
			:host([layout="tile"]:not([draggable])[_has-color-slot]) [slot="outside-control-container"] {
				margin-inline-start: 0;
			}
			:host([layout="tile"]:not([_has-color-slot])) .d2l-list-item-content-extend-separators [slot="content"] {
				padding-inline: var(--d2l-list-item-padding);
			}

			:host([layout="tile"][_focusing-primary-action]:not([selection-disabled]):not([button-disabled]):not([skeleton]):not([current])) [slot="outside-control-container"].d2l-list-item-content-none {
				border-color: transparent;
			}
			:host([layout="tile"][_focusing-primary-action]:not([padding-type="none"])) .d2l-list-item-content.d2l-list-item-content-none {
				border-radius: 6px;
				outline: var(--d2l-list-item-content-text-outline);
				outline-offset: 2px;
			}
			@supports selector(:has(a, b)) {
				:host([layout="tile"][_focusing-primary-action]:not([padding-type="none"])) .d2l-list-item-content.d2l-list-item-content-none {
					border-radius: initial;
					outline: initial;
					outline-offset: initial;
				}
				:host([layout="tile"][_focusing-primary-action]:not([selection-disabled]):not([button-disabled]):not([skeleton]):not([current])) [slot="outside-control-container"].d2l-list-item-content-none {
					border-color: var(--d2l-list-item-border-color);
				}
				:host([layout="tile"][_focusing-primary-action]:not([padding-type="none"])):has(:focus-visible) .d2l-list-item-content.d2l-list-item-content-none {
					border-radius: 6px;
					outline: var(--d2l-list-item-content-text-outline);
					outline-offset: 2px;
				}
				:host([layout="tile"][_focusing-primary-action]:not([selection-disabled]):not([button-disabled]):not([skeleton]):not([current])):has(:focus-visible) [slot="outside-control-container"].d2l-list-item-content-none {
					border-color: transparent;
				}
			}

			:host([layout="tile"]) d2l-selection-input {
				margin: 0;
			}
			:host([layout="tile"]:not([tile-header])) d2l-selection-input {
				--d2l-input-checkbox-border-color-hover-focus: var(--d2l-color-celestine-minus-1);
				--d2l-input-radio-border-color-hover-focus: var(--d2l-color-celestine-minus-1);
				border: 2px solid transparent;
				border-radius: 8px;
				padding: 3px;
			}
			:host([layout="tile"][_focusing]:not([tile-header])) d2l-selection-input {
				border: 2px solid white;
			}
			:host([layout="tile"]) [slot="control"] {
				background-color: rgba(0, 0, 0, 0.5);
				border-radius: 8px;
				box-sizing: border-box;
				margin: 0.5rem;
				outline: 2px solid transparent;
				position: absolute;
			}
			:host([layout="tile"][_focusing]:not([tile-header])) [slot="control"] {
				background-color: var(--d2l-color-celestine);
				outline-color: var(--d2l-color-celestine-minus-1);
			}
			:host([layout="tile"][skeleton]) [slot="control"] {
				background-color: transparent;
			}
			:host([layout="tile"][tile-header]) [slot="control"] {
				background-color: transparent;
				display: inline-flex;
				margin: 0.4rem var(--d2l-list-item-padding);
				outline: none;
				position: static;
			}

			:host([layout="tile"]) [slot="actions"] {
				--d2l-button-icon-min-height: 1.5rem;
				--d2l-button-icon-min-width: 1.5rem;
				--d2l-button-icon-border-radius: 4px;
				margin-block: var(--d2l-list-item-padding);
				margin-inline-end: var(--d2l-list-item-padding);
				padding: 0;
				position: absolute;
			}
			:host([layout="tile"][tile-header]) [slot="actions"] {
				--d2l-button-icon-background-color-hover: var(--d2l-color-mica);
				margin: 0.25rem var(--d2l-list-item-padding);
				position: static;
			}

			:host([layout="tile"][tile-header]) [slot="header"] {
				background-color: var(--d2l-color-gypsum);
				border-end-end-radius: 0;
				border-end-start-radius: 0;
				border-start-end-radius: 5px;
				border-start-start-radius: 5px;
				margin-block-start: 1px;
				margin-inline: 1px;
			}

			:host([layout="tile"]) .d2l-list-item-content-extend-separators ::slotted([slot="actions"]),
			:host([layout="tile"]) .d2l-list-item-content-extend-separators .d2l-list-item-actions > * {
				margin-inline: 0;
			}

			:host([layout="tile"]) .d2l-list-item-color-outer {
				padding: 1px;
			}
			:host([layout="tile"]) .d2l-list-item-color-inner {
				border-end-end-radius: 0;
				border-end-start-radius: 6px;
				border-start-end-radius: 0;
				border-start-start-radius: 6px;
				width: 5px;
			}
			:host([layout="tile"][tile-header]) .d2l-list-item-color-outer {
				padding-block-start: 0;
			}
			:host([layout="tile"][tile-header]) .d2l-list-item-color-inner {
				border-start-end-radius: 0;
				border-start-start-radius: 0;
			}

		`];
        return super.styles && t.unshift(super.styles), t
    }
    constructor() {
        super(), this.first = !1, this.isVisibleOnAncestorTarget = !0, this.noPrimaryAction = !1, this.paddingType = "normal", this._selectionWhenInteracted = !1, this.tileHeader = !1, this.tilePaddingType = "normal", this._addButtonTopId = v(), this._contentId = v(), this._displayKeyboardTooltip = !1, this._forceShowSelection = !1, this._hasColorSlot = !1, this._hasListItemContent = !0, this._hasNestedList = !1, this._siblingHasColor = !1
    }
    get color() {
        return this._color
    }
    set color(t) {
        const e = this._color;
        this._color = M(t, !0), this.requestUpdate("value", e), this.dispatchEvent(new CustomEvent("d2l-list-item-property-change", {
            bubbles: !0,
            composed: !0,
            detail: {
                name: "color",
                value: this._color
            }
        }))
    }
    connectedCallback() {
        super.connectedCallback(), "row" === this.role && (wt || (wt = !0, document.addEventListener("keydown", t => {
            9 === t.keyCode && (xt = !0)
        }), document.addEventListener("keyup", t => {
            9 === t.keyCode && (xt = !1)
        }))), this.selectable || this.expandable || (this.labelRequired = !1)
    }
    willUpdate(t) {
        super.willUpdate(t), (t.has("_siblingHasColor") || t.has("color")) && (this._hasColorSlot = this.color || this._siblingHasColor), this._focusingPrimaryAction && t.has("_focusingPrimaryAction") && (this._hasListItemContent = !!this.shadowRoot.querySelector("slot:not([name])").assignedElements({
            flatten: !0
        }).find(t => "D2L-LIST-ITEM-CONTENT" === t.tagName))
    }
    focus() {
        this._tryFocus()
    }
    getRootList(t) {
        let e;
        for (t || (t = this); t;) "D2L-LIST" === t.tagName && (e = t), t = $(t);
        return e
    }
    async highlight() {
        if (this._highlight) return;
        const t = this.shadowRoot.querySelector('[slot="outside-control-container"]');
        this._highlight = !0, await this.updateComplete, t.addEventListener("transitionend", () => {
            setTimeout(() => {
                t.addEventListener("transitionend", () => this._highlight = !1, {
                    once: !0
                }), this._highlighting = !1
            }, 1e3)
        }, {
            once: !0
        }), this._highlighting = !0
    }
    scrollToAndHighlight(t = !0) {
        this.scrollToItem(t), setTimeout(() => {
            this.highlight()
        }, 1e3)
    }
    scrollToItem(t = !0) {
        matchMedia("(prefers-reduced-motion: reduce)").matches ? this.scrollIntoView(t) : this.scrollIntoView({
            behavior: "smooth",
            block: t ? "start" : "end"
        })
    }
    updateParentHasAddButon(t, e) {
        this._addButtonText = e, this._showAddButton = t
    }
    updateSiblingHasColor(t) {
        this._siblingHasColor = t
    }
    async waitForUpdateComplete() {
        const t = () => !0,
            e = C(this, t);
        await Promise.all(e.map(e => z(e, t)))
    }
    _getFlattenedListItems(t) {
        const e = new Map,
            o = new Map;
        return this._getListItems(e, o, t), {
            listItems: e,
            lazyLoadListItems: o
        }
    }
    _getListItems(t, e, o) {
        if (o) {
            if (t.set(o.key, o), o.expandable && !o._hasNestedList && e.set(o.key, o), o._hasNestedList) {
                o._getNestedList().getItems().forEach(o => this._getListItems(t, e, o))
            }
        } else {
            this.getRootList().getItems().forEach(o => this._getListItems(t, e, o))
        }
    }
    _getNestedList() {
        if (!this.shadowRoot) return;
        const t = this.shadowRoot.querySelector('slot[name="nested"]');
        let e = t.assignedNodes();
        return 0 === e.length && (e = [...t.childNodes]), e.find(t => t.nodeType === Node.ELEMENT_NODE && "D2L-LIST" === t.tagName)
    }
    _getNextListItemSibling() {
        let t = this.nextElementSibling;
        for (; t;) {
            if (this._isListItem(t)) return t;
            t = t.nextElementSibling
        }
    }
    _getParentList(t) {
        let e;
        for (t || (t = this);
            "D2L-LIST" !== e ? .tagName;) "D2L-LIST" === (t = $(t)).tagName && (e = t);
        return e
    }
    _getParentListItem() {
        return I(this.parentNode, t => this._isListItem(t))
    }
    _getPreviousListItemSibling() {
        let t = this.previousElementSibling;
        for (; t;) {
            if (this._isListItem(t)) return t;
            t = t.previousElementSibling
        }
    }
    _handleButtonAddClick(t) {
        const e = t.target.hasAttribute("data-is-first") ? "before" : "after";
        this.dispatchEvent(new CustomEvent("d2l-list-item-add-button-click", {
            bubbles: !0,
            detail: {
                position: e
            }
        }))
    }
    _isListItem(t) {
        return t || (t = this), "row" === t.role || "listitem" === t.role
    }
    _onFocusIn(t) {
        t.stopPropagation(), this._focusing = !0, "row" === this.role && xt && !kt && (this._displayKeyboardTooltip = !0, kt = !0)
    }
    _onFocusInPrimaryAction() {
        this._focusingPrimaryAction = !0
    }
    _onFocusOut() {
        this._focusing = !1, this._displayKeyboardTooltip = !1
    }
    _onFocusOutPrimaryAction() {
        this._focusingPrimaryAction = !1
    }
    _onMouseEnter() {
        this._hovering = !0
    }
    _onMouseEnterControl() {
        this._hoveringControl = !0, this._hovering = !0
    }
    _onMouseEnterPrimaryAction() {
        this._hoveringPrimaryAction = !0, this._hovering = !0
    }
    _onMouseLeave() {
        this._hovering = !1
    }
    _onMouseLeaveControl() {
        this._hoveringControl = !1, this._hovering = !1
    }
    _onMouseLeavePrimaryAction() {
        this._hoveringPrimaryAction = !1, this._hovering = !1
    }
    _onNestedSlotChange() {
        this._onNestedSlotChangeCheckboxMixin();
        const t = this._getNestedList();
        this._hasNestedList !== !!t && (this._hasNestedList = !!t, this._hasNestedListAddButton = this._hasNestedList && t.hasAttribute("add-button"), this.dispatchEvent(new CustomEvent("d2l-list-item-nested-change", {
            bubbles: !0,
            composed: !0
        })))
    }
    _renderListItem({
        illustration: t,
        content: e,
        actions: o,
        nested: i
    } = {}) {
        const n = {
                "d2l-visible-on-ancestor-target": !0,
                "d2l-list-item-content-extend-separators": this._extendSeparators,
                "d2l-dragging-over": this._draggingOver
            },
            r = {
                backgroundColor: this._hasColorSlot ? this.color : void 0
            },
            a = {
                "d2l-list-item-color-inner": !0,
                "d2l-skeletize": this.color
            },
            d = {
                "d2l-list-item-content": !0,
                "d2l-list-item-content-none": !this._hasListItemContent
            },
            c = {
                "d2l-list-item-content-none": !this._hasListItemContent
            },
            h = this.draggable && this.selectable || this.expandable && this.selectable && this.color || this.expandable && !this.selectable ? "control" : void 0,
            u = s `
			<div slot="content"
				class="${D(d)}"
				id="${this._contentId}"
				@mouseenter="${this._onMouseEnter}"
				@mouseleave="${this._onMouseLeave}">
				<slot name="illustration" class="d2l-list-item-illustration">${t}</slot>
				<slot>${e}</slot>
			</div>
		`,
            p = !this.noPrimaryAction && this._renderPrimaryAction ? this._renderPrimaryAction(this._contentId, u) : null,
            g = !p && !this.selectable && this.expandable && !this.noPrimaryAction,
            m = !p && this.selectable && !this.noPrimaryAction;
        let b = null;
        this._showAddButton ? b = this._addButtonTopId : p ? b = this._primaryActionId : this.selectable && (b = this._checkboxId);
        const _ = this._addButtonText || this.localize("components.list-item.addItem"),
            v = s `
			<d2l-list-item-generic-layout
				align-nested="${f(h)}"
				@focusin="${this._onFocusIn}"
				@focusout="${this._onFocusOut}"
				class="${D(n)}"
				data-separators="${f(this._separators)}"
				indentation="${f(this.indentation)}"
				?grid-active="${"row"===this.role}"
				layout="${this.layout}"
				?no-primary-action="${this.noPrimaryAction}">
				${this._showAddButton&&this.first?s`
				<div slot="add-top">
					<d2l-button-add
						text="${_}"
						mode="icon-when-interacted"
						@click="${this._handleButtonAddClick}"
						data-is-first
						id="${this._addButtonTopId}">
					</d2l-button-add>
				</div>
				`:l}
				<div slot="header" @mouseenter="${this._onMouseEnter}" @mouseleave="${this._onMouseLeave}"></div>
				<div slot="outside-control-container" class="${D(c)}"></div>
				<div slot="before-content"></div>
				${this._renderDropTarget()}
				${this._renderDragHandle(this._renderOutsideControl)}
				${this._renderDragTarget(this.dragTargetHandleOnly?this._renderOutsideControlHandleOnly:this._renderOutsideControlAction)}
				<div slot="control-container"></div>
				${this._hasColorSlot?s`
				<div slot="color-indicator" class="d2l-list-item-color-outer">
					<div class="${D(a)}" style="${K(r)}"></div>
				</div>`:l}
				<div slot="expand-collapse"
					class="d2l-list-expand-collapse"
					@click="${this._toggleExpandCollapse}"
					@mouseenter="${this._onMouseEnterControl}"
					@mouseleave="${this._onMouseLeaveControl}">
					${this._renderExpandCollapse()}
				</div>
				${this.selectable?s`<div slot="control">${this._renderCheckbox()}</div>`:l}
				${this.selectable||this.expandable?s`
				<div slot="control-action"
					@mouseenter="${this._onMouseEnter}"
					@mouseleave="${this._onMouseLeave}">
						${this._renderCheckboxAction(m?u:"")}
						${this._renderExpandCollapseAction(g?u:null)}
				</div>`:l}
				${p?s`
				<div slot="content-action"
					@focusin="${this._onFocusInPrimaryAction}"
					@focusout="${this._onFocusOutPrimaryAction}"
					@mouseenter="${this._onMouseEnterPrimaryAction}"
					@mouseleave="${this._onMouseLeavePrimaryAction}">
						${p}
				</div>`:l}
				${p||g||m?l:u}
				<div slot="actions"
					@mouseenter="${this._onMouseEnter}"
					@mouseleave="${this._onMouseLeave}"
					class="d2l-list-item-actions-container">
					<slot name="actions" class="d2l-list-item-actions">${o}</slot>
				</div>
				${this._renderNested(i)}
				${this._showAddButton&&(!this._hasNestedListAddButton||this.expandable&&!this.expanded)?s`
				<div slot="add">
					<d2l-button-add text="${_}" mode="icon-when-interacted" @click="${this._handleButtonAddClick}"></d2l-button-add>
				</div>
				`:l}
			</d2l-list-item-generic-layout>
		`;
        return s `
			${this._renderTopPlacementMarker(s`<d2l-list-item-placement-marker></d2l-list-item-placement-marker>`)}
			${this.draggable?s`<div class="d2l-list-item-drag-image">${v}</div>`:v}
			${this._renderBottomPlacementMarker(s`<d2l-list-item-placement-marker></d2l-list-item-placement-marker>`)}
			${this._displayKeyboardTooltip&&b?s`<d2l-tooltip align="start" announced for="${b}" for-type="descriptor">${this.localizeHTML("components.list.keyboard")}</d2l-tooltip>`:""}
			${this.draggable?this._renderDragMultipleImage():l}
		`
    }
    _renderNested(t) {
        const e = s `<slot name="nested" @slotchange="${this._onNestedSlotChange}">${t}</slot>`;
        return s `
			<div slot="nested" @d2l-selection-provider-connected="${this._onSelectionProviderConnected}">
				${this.expandable?s`<d2l-expand-collapse-content ?expanded="${this.expanded}">${this._renderNestedLoadingSpinner()}${e}</d2l-expand-collapse-content>`:e}
			</div>
		`
    }
    _renderOutsideControl(t) {
        return s `<div slot="outside-control">${t}</div>`
    }
    _renderOutsideControlAction(t) {
        return s `<div slot="outside-control-action"
			@mouseenter="${this._onMouseEnterControl}"
			@mouseleave="${this._onMouseLeaveControl}">
				${t}
			</div>`
    }
    _renderOutsideControlHandleOnly(t) {
        return s `<div slot="outside-control" class="handle-only" @mouseenter="${this._onMouseEnter}" @mouseleave="${this._onMouseLeave}">${t}</div>`
    }
    _tryFocus() {
        const t = h(this);
        return !!t && (t.focus(), !0)
    }
};
export {
    It as L, yt as a, vt as b, ct as d, Lt as i, dt as m
};