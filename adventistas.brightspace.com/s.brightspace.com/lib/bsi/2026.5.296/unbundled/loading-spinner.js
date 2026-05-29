import {
    _ as e,
    a as i
} from "./_rollupPluginBabelHelpers.js";
import "./colors.js";
import {
    a as r,
    i as t,
    b as s,
    w as n
} from "./lit-element.js";
import {
    e as a
} from "./class-map.js";
import "./svg-to-css.js";
import "./directive.js";
var o = new WeakSet;

function l(e) {
    const i = {
        slice: !0
    };
    return i[`slice-${e}`] = !0, n `<g class="${a(i)}">
			<path d="M39 24h6a21 21 0 0 0 -21 -21v6a 1.5 1.5 0 0 1 0 3v12h12a1.5 1.5 0 0 1 3 0z" fill="#FFF"></path>
			<path d="M39 24a15 15 0 0 0 -15 -15a1.5 1.5 0 0 1 0 3a12 12 0 0 1 12 12a1.5 1.5 0 0 1 3 0z" fill="#E6EAF0"></path>
		</g>`
}
customElements.define("d2l-loading-spinner", class extends r {
    constructor(...i) {
        super(...i), e(this, o)
    }
    static get properties() {
        return {
            color: {
                type: String
            },
            size: {
                type: Number
            }
        }
    }
    static get styles() {
        return t `

			:host {
				color: var(--d2l-loading-spinner-color, var(--d2l-color-celestine));
				display: inline-block;
				text-align: initial;
			}

			:host([hidden]) {
				display: none;
			}

			.d2l-loading-spinner-wrapper {
				height: var(--d2l-loading-spinner-size, 48px);
				margin: auto;
				overflow: hidden;
				position: relative;
				width: var(--d2l-loading-spinner-size, 48px);
			}
			svg {
				background: radial-gradient(rgba(0, 0, 0, 0.42), transparent 70%); /* 70% ≈ 100%/sqrt(2) = radius of circle since corners lie on 100% of radial gradient */
				height: 100%;
				position: absolute;
				top: 0;
				width: 100%;
			}
			.outer-circle {
				fill: white;
				stroke: none;
			}
			.inner-circle {
				fill: none;
				stroke: var(--d2l-loading-spinner-color, var(--d2l-color-celestine));
				stroke-width: 3;
			}

			.slice {
				animation-duration: 1.5s;
				animation-iteration-count: infinite;
				animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
				transform-origin: center;
			}
			.slice-1 {
				animation-name: slicespin1;
				transform: rotate(54deg);
			}
			.slice-2 {
				animation-name: slicespin2;
				transform: rotate(124deg);
			}
			.slice-3 {
				animation-name: slicespin3;
				transform: rotate(198deg);
			}
			.slice-4 {
				animation-name: slicespin4;
				transform: rotate(270deg);
			}
			.slice-5 {
				animation-name: slicespin5;
				transform: rotate(344deg);
			}

			@keyframes slicespin1 {
				0% { transform: rotate(54deg); }
				80%, 100% { transform: rotate(430deg); }
			}
			@keyframes slicespin2 {
				0%, 10% { transform: rotate(124deg); }
				80%, 100% { transform: rotate(500deg); }
			}
			@keyframes slicespin3 {
				0%, 20% { transform: rotate(198deg); }
				80%, 100% { transform: rotate(574deg); }
			}
			@keyframes slicespin4 {
				0%, 35% { transform: rotate(270deg); }
				80%, 100% { transform: rotate(644deg); }
			}
			@keyframes slicespin5 {
				80%, 100% { transform: rotate(720deg); }
			}

		`
    }
    render() {
        return s `
			<div class="d2l-loading-spinner-wrapper">
				<svg viewBox="0 0 48 48" fill-rule="evenodd">
					<g>
						<circle cx="24" cy="24" r="21" class="outer-circle"></circle>
						<circle cx="24" cy="24" r="13.5" class="inner-circle"></circle>
					</g>
					${Array.from({length:5}).map((e,r)=>i(o,this,l).call(this,r+1))}
				</svg>
			</div>
		`
    }
    updated(e) {
        e.forEach((e, i) => {
            "color" === i ? this.style.setProperty("--d2l-loading-spinner-color", this.color) : "size" === i && this.style.setProperty("--d2l-loading-spinner-size", `${this.size}px`)
        })
    }
});