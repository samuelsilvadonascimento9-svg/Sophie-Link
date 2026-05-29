import {
    _ as e,
    b as t,
    c as i,
    a as o
} from "./_rollupPluginBabelHelpers.js";
import "./expand-collapse-content.js";
import "./tooltip.js";
import {
    i as n,
    a,
    A as c,
    b as l
} from "./lit-element.js";
import {
    e as d
} from "./class-map.js";
import {
    F as s
} from "./focus-mixin.js";
import {
    F as r,
    I as p
} from "./input-inline-help.js";
import {
    g as h
} from "./uniqueId.js";
import {
    o as b
} from "./if-defined.js";
import {
    o as u
} from "./offscreen.js";
import {
    r as m
} from "./colors.js";
import {
    S as k
} from "./skeleton-mixin.js";
import "./style-map.js";
import "./directive.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./svg-to-css.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./framed.js";
import "./dismissible.js";
import "./dedupeMixin.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./subscriberControllers.js";
m("--d2l-input-checkbox-check-image", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n\t\t<path fill="var(--d2l-theme-icon-color-standard)" d="M8.4 16.6c.6.6 1.5.6 2.1 0l8-8c.6-.6.6-1.5 0-2.1-.6-.6-1.5-.6-2.1 0l-6.9 7-1.9-1.9c-.6-.6-1.5-.6-2.1 0-.6.6-.6 1.5 0 2.1l2.9 2.9z"/>\t</svg>'), m("--d2l-input-checkbox-indeterminate-image", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n\t\t<path fill="var(--d2l-theme-icon-color-standard)" d="M7.5,11h9c0.8,0,1.5,0.7,1.5,1.5l0,0c0,0.8-0.7,1.5-1.5,1.5h-9C6.7,14,6,13.3,6,12.5l0,0C6,11.7,6.7,11,7.5,11z"/>\n\t</svg>');
const x = {
        inputBoxSize: 1.2,
        checkboxMargin: .5
    },
    g = n `
	input[type="checkbox"].d2l-input-checkbox {
		--d2l-input-checkbox-background-image: none;
		--d2l-input-checkbox-background-color: var(--d2l-theme-background-color-interactive-faint-default);
		--d2l-input-checkbox-background-image-disabled:
			linear-gradient(
				var(--d2l-theme-background-color-interactive-faint-disabled),
				var(--d2l-theme-background-color-interactive-faint-disabled)
			),
			var(--d2l-input-checkbox-background-image);
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-image: var(--d2l-input-checkbox-background-image);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: ${x.inputBoxSize}rem ${x.inputBoxSize}rem;
		border-radius: 0.3rem;
		border-style: solid;
		box-sizing: border-box;
		display: inline-block;
		height: ${x.inputBoxSize}rem;
		margin: 0;
		padding: 0;
		vertical-align: middle;
		width: ${x.inputBoxSize}rem;
	}
	input[type="checkbox"].d2l-input-checkbox:checked {
		--d2l-input-checkbox-background-image: var(--d2l-input-checkbox-check-image);
	}
	input[type="checkbox"].d2l-input-checkbox:indeterminate {
		--d2l-input-checkbox-background-image: var(--d2l-input-checkbox-indeterminate-image);
	}
	input[type="checkbox"].d2l-input-checkbox,
	input[type="checkbox"].d2l-input-checkbox:hover:disabled {
		background-color: var(--d2l-input-checkbox-background-color);
		border-color: var(--d2l-theme-border-color-emphasized);
		border-width: 1px;
	}
	input[type="checkbox"].d2l-input-checkbox:hover:disabled {
		border-color: var(--d2l-theme-border-color-disabled);
	}
	input[type="checkbox"].d2l-input-checkbox:hover,
	input[type="checkbox"].d2l-input-checkbox:focus,
	input[type="checkbox"].d2l-input-checkbox.d2l-input-checkbox-focus,
	:host(.d2l-hovering) input[type="checkbox"]:not(:disabled).d2l-input-checkbox {
		border-color: var(--d2l-input-checkbox-border-color-hover-focus, var(--d2l-theme-border-color-focus));
		border-width: 2px;
		outline: none;
	}
	input[type="checkbox"].d2l-input-checkbox:disabled,
	input[type="checkbox"].d2l-input-checkbox:where([aria-disabled="true"]) {
		background-image: var(--d2l-input-checkbox-background-image-disabled);
		border-color: var(--d2l-theme-border-color-disabled);
	}
	@media (forced-colors: active) {
		input[type="checkbox"].d2l-input-checkbox:checked,
		input[type="checkbox"].d2l-input-checkbox:indeterminate {
			background-image: none;
			position: relative;
		}
		input[type="checkbox"].d2l-input-checkbox:checked::after,
		input[type="checkbox"].d2l-input-checkbox:indeterminate::after {
			background-color: FieldText;
			content: "";
			display: block;
			height: ${x.inputBoxSize}rem;
			left: 50%;
			position: absolute;
			top: 50%;
			transform: translate(-50%, -50%);
			width: ${x.inputBoxSize}rem;
		}

		input[type="checkbox"].d2l-input-checkbox:disabled,
		input[type="checkbox"].d2l-input-checkbox:where([aria-disabled="true"]) {
			opacity: var(--d2l-theme-opacity-disabled-control);
		}

		input[type="checkbox"].d2l-input-checkbox:checked::after {
			mask-image: var(--d2l-input-checkbox-check-image);
		}

		input[type="checkbox"].d2l-input-checkbox:indeterminate::after {
			mask-image: var(--d2l-input-checkbox-indeterminate-image);
		}
	}
`;
var v = new WeakMap,
    f = new WeakMap,
    y = new WeakMap,
    $ = new WeakSet;
class w extends(r(p(s(k(a))))) {
    static get properties() {
        return {
            ariaLabel: {
                type: String,
                attribute: "aria-label"
            },
            checked: {
                type: Boolean
            },
            description: {
                type: String
            },
            disabled: {
                type: Boolean
            },
            disabledTooltip: {
                type: String,
                attribute: "disabled-tooltip"
            },
            indeterminate: {
                type: Boolean
            },
            label: {
                type: String
            },
            labelHidden: {
                attribute: "label-hidden",
                reflect: !0,
                type: Boolean
            },
            notTabbable: {
                type: Boolean,
                attribute: "not-tabbable"
            },
            supportingHiddenWhenUnchecked: {
                type: Boolean,
                attribute: "supporting-hidden-when-unchecked",
                reflect: !0
            },
            value: {
                type: String
            },
            _hasSupporting: {
                state: !0
            },
            _isHovered: {
                state: !0
            }
        }
    }
    static get styles() {
        return [super.styles, g, u, n `
				:host {
					display: block;
					margin-block-end: 0.6rem;
				}
				:host([hidden]) {
					display: none;
				}
				:host([label-hidden]) {
					display: inline-block;
					margin-block-end: 0;
				}
				label {
					display: flex;
					line-height: ${x.inputBoxSize}rem;
					overflow-wrap: anywhere;
				}
				.d2l-input-checkbox-wrapper {
					display: inline-block;
				}
				.d2l-input-checkbox-text {
					color: var(--d2l-theme-text-color-static-standard);
					display: inline-block;
					font-size: 0.8rem;
					font-weight: 400;
					margin-inline-start: ${x.checkboxMargin}rem;
					vertical-align: top;
					white-space: normal;
				}
				:host([label-hidden]) .d2l-input-checkbox-text {
					margin-inline-start: 0;
				}
				:host([skeleton]) .d2l-input-checkbox-text.d2l-skeletize::before {
					bottom: 0.3rem;
					top: 0.3rem;
				}
				.d2l-input-inline-help,
				.d2l-input-checkbox-supporting {
					margin-inline-start: ${x.inputBoxSize+x.checkboxMargin}rem;
				}
				:host(:not([skeleton])) .d2l-input-checkbox-text-disabled {
					opacity: 0.5;
				}
				input[type="checkbox"].d2l-input-checkbox {
					vertical-align: top;
				}
				.d2l-input-checkbox-supporting {
					margin-block-start: 0.6rem;
				}
			`]
    }
    constructor() {
        super(), e(this, $), t(this, v, h()), t(this, f, h()), t(this, y, h()), this.checked = !1, this.disabled = !1, this.indeterminate = !1, this.label = "", this.labelHidden = !1, this.name = "", this.notTabbable = !1, this.supportingHiddenWhenUnchecked = !1, this.value = "on", this._hasSupporting = !1, this._isHovered = !1
    }
    static get focusElementSelector() {
        return "input.d2l-input-checkbox"
    }
    render() {
        const e = this.notTabbable ? -1 : void 0,
            t = this._hasSupporting && (this.checked || !this.supportingHiddenWhenUnchecked),
            n = {
                "d2l-input-checkbox-text": !0,
                "d2l-skeletize": !0,
                "d2l-input-checkbox-text-disabled": this.disabled
            },
            a = this.indeterminate ? "mixed" : void 0,
            s = this._hasSupporting && this.supportingHiddenWhenUnchecked ? t ? "true" : "false" : void 0,
            r = this.label && this.labelHidden ? this.label : void 0,
            p = this.label && !this.labelHidden ? this.label : c,
            h = this.disabled || this.skeleton,
            u = this.description ? l `<div class="d2l-offscreen" id="${i(v,this)}">${this.description}</div>` : null,
            m = `${this.description?i(v,this):""} ${this._hasInlineHelp?i(f,this):""}`.trim(),
            k = h && this.disabledTooltip ? l `<d2l-tooltip align="start" class="vdiff-target" for="${i(y,this)}" ?force-show="${this._isHovered}" position="top">${this.disabledTooltip}</d2l-tooltip>` : c;
        return l `
			<label @mouseleave="${o($,this,B)}" @mouseenter="${o($,this,z)}">
				<span class="d2l-input-checkbox-wrapper d2l-skeletize"><input
					aria-checked="${b(a)}"
					aria-describedby="${b(m.length>0?m:void 0)}"
					aria-disabled="${b(h&&this.disabledTooltip?"true":void 0)}"
					aria-expanded="${b(s)}"
					aria-label="${b(r)}"
					@change="${o($,this,j)}"
					class="d2l-input-checkbox"
					@click="${o($,this,S)}"
					.checked="${this.checked}"
					?disabled="${h&&!this.disabledTooltip}"
					id="${i(y,this)}"
					.indeterminate="${this.indeterminate}"
					name="${b(this.name)}"
					tabindex="${b(e)}"
					type="checkbox"
					.value="${this.value}"></span><span class="${d(n)}">${p}<slot></slot></span>
			</label>
			${this._renderInlineHelp(i(f,this))}
			${u}
			${k}
			<d2l-expand-collapse-content ?expanded="${t}">
				<div class="d2l-input-checkbox-supporting" @change="${o($,this,H)}"><slot name="supporting" @slotchange="${o($,this,_)}"></slot></div>
			</d2l-expand-collapse-content>
		`
    }
    updated(e) {
        super.updated(e), e.has("value") && this.setFormValue(this.value)
    }
    willUpdate(e) {
        super.willUpdate(e), e.has("ariaLabel") && void 0 !== this.ariaLabel && (this.label = this.ariaLabel, this.labelHidden = !0)
    }
    simulateClick() {
        this.checked = !this.checked, this.indeterminate = !1, this.dispatchEvent(new CustomEvent("change", {
            bubbles: !0,
            composed: !1
        }))
    }
}

function j(e) {
    this.checked = e.target.checked, this.indeterminate = !1, this.dispatchEvent(new CustomEvent("change", {
        bubbles: !0,
        composed: !1
    }))
}

function S(e) {
    this.disabled && e.preventDefault()
}

function z() {
    this._isHovered = !0
}

function B() {
    this._isHovered = !1
}

function H(e) {
    e.stopPropagation()
}

function _(e) {
    const t = e.target.assignedNodes({
        flatten: !0
    });
    this._hasSupporting = t ? .length > 0
}
customElements.define("d2l-input-checkbox", w);
export {
    g as a, x as c
};