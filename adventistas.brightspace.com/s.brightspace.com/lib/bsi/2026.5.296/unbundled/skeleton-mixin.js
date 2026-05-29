import "./colors.js";
import {
    i as e
} from "./lit-element.js";
import {
    E as t
} from "./subscriberControllers.js";
import {
    s
} from "./svg-to-css.js";
import {
    d as o
} from "./dedupeMixin.js";
const i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? e `none` : e `loadingPulse 1.8s linear infinite`,
    r = s('<svg xmlns="http://www.w3.org/2000/svg">\n  <rect y="11%" width="100%" height="27%" rx="4"/>\n  <rect y="61%" width="90%" height="27%" rx="4"/>\n</svg>'),
    l = s('<svg xmlns="http://www.w3.org/2000/svg">\n  <rect y="7%" width="100%" height="18%" rx="4"/>\n  <rect y="40%" width="100%" height="18%" rx="4"/>\n  <rect y="74%" width="90%" height="18%" rx="4"/>\n</svg>'),
    n = s('<svg xmlns="http://www.w3.org/2000/svg">\n  <rect y="4%" width="100%" height="11%" rx="4"/>\n  <rect y="24%" width="100%" height="11%" rx="4"/>\n  <rect y="44%" width="100%" height="11%" rx="4"/>\n  <rect y="64%" width="100%" height="11%" rx="4"/>\n  <rect y="84%" width="90%" height="11%" rx="4"/>\n</svg>'),
    a = e `
	@keyframes loadingPulse {
		0%, 75%, 100% { background-color: var(--d2l-theme-background-color-interactive-faint-hover); }
		50% { background-color: var(--d2l-theme-background-color-interactive-faint-default); }
	}
	:host([skeleton]) {
		isolation: isolate;
	}
	:host([skeleton]) .d2l-skeletize::before {
		animation: ${i};
		background-color: var(--d2l-theme-background-color-interactive-faint-hover);
		border-radius: 0.2rem;
		bottom: 0;
		content: '';
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 997;
	}
	@media (prefers-reduced-motion: reduce) {
		:host([skeleton]) .d2l-skeletize-paragraph-2::after,
		:host([skeleton]) .d2l-skeletize-paragraph-3::after,
		:host([skeleton]) .d2l-skeletize-paragraph-5::after,
		:host([skeleton]) .d2l-skeletize::before {
			animation: none;
		}
	}
	:host([skeleton]) .d2l-skeletize,
	:host([skeleton]) .d2l-skeletize-container {
		background-color: transparent;
		border-color: var(--d2l-theme-background-color-interactive-faint-hover);
		box-shadow: none;
		color: transparent;
		position: relative;
	}
	:host([skeleton]) .d2l-skeletize-paragraph-2,
	:host([skeleton]) .d2l-skeletize-paragraph-3,
	:host([skeleton]) .d2l-skeletize-paragraph-5 {
		color: transparent;
		position: relative;
	}
	:host([skeleton]) .d2l-skeletize-paragraph-2::after,
	:host([skeleton]) .d2l-skeletize-paragraph-3::after,
	:host([skeleton]) .d2l-skeletize-paragraph-5::after {
		background-color: var(--d2l-theme-background-color-interactive-faint-hover);
		content: '';
		inset: 0;
		position: absolute;
		transform: var(--d2l-mirror-transform, ${"rtl"===document.dir?e`scale(-1, 1)`:e`none`}); /* stylelint-disable-line @stylistic/string-quotes, @stylistic/function-whitespace-after */
		transform-origin: center;
		animation: ${i};
	}
	:host([skeleton]) .d2l-skeletize-paragraph-2::after {
		-webkit-mask-image: ${r};
		mask-image: ${r};
	}
	:host([skeleton]) .d2l-skeletize-paragraph-2::before {
		content: '\\A';
		white-space: pre;
	}
	:host([skeleton]) .d2l-skeletize-paragraph-3::after {
		-webkit-mask-image: ${l};
		mask-image: ${l};
	}
	:host([skeleton]) .d2l-skeletize-paragraph-3::before {
		content: '\\A \\A';
		white-space: pre;
	}
	:host([skeleton]) .d2l-skeletize-paragraph-5::after {
		-webkit-mask-image: ${n};
		mask-image: ${n};
	}
	:host([skeleton]) .d2l-skeletize-paragraph-5::before {
		content: '\\A \\A \\A \\A';
		white-space: pre;
	}
	:host([skeleton]) .d2l-skeletize-95::before {
		width: 95%;
	}
	:host([skeleton]) .d2l-skeletize-90::before {
		width: 90%;
	}
	:host([skeleton]) .d2l-skeletize-85::before {
		width: 85%;
	}
	:host([skeleton]) .d2l-skeletize-80::before {
		width: 80%;
	}
	:host([skeleton]) .d2l-skeletize-75::before {
		width: 75%;
	}
	:host([skeleton]) .d2l-skeletize-70::before {
		width: 70%;
	}
	:host([skeleton]) .d2l-skeletize-65::before {
		width: 65%;
	}
	:host([skeleton]) .d2l-skeletize-60::before {
		width: 60%;
	}
	:host([skeleton]) .d2l-skeletize-55::before {
		width: 55%;
	}
	:host([skeleton]) .d2l-skeletize-50::before {
		width: 50%;
	}
	:host([skeleton]) .d2l-skeletize-45::before {
		width: 45%;
	}
	:host([skeleton]) .d2l-skeletize-40::before {
		width: 40%;
	}
	:host([skeleton]) .d2l-skeletize-35::before {
		width: 35%;
	}
	:host([skeleton]) .d2l-skeletize-30::before {
		width: 30%;
	}
	:host([skeleton]) .d2l-skeletize-25::before {
		width: 25%;
	}
	:host([skeleton]) .d2l-skeletize-20::before {
		width: 20%;
	}
	:host([skeleton]) .d2l-skeletize-15::before {
		width: 15%;
	}
	:host([skeleton]) .d2l-skeletize-10::before {
		width: 10%;
	}
	:host([skeleton]) .d2l-skeletize-5::before {
		width: 5%;
	}
`,
    h = o(e => class extends e {
        static get properties() {
            return {
                skeleton: {
                    reflect: !0,
                    type: Boolean
                }
            }
        }
        static get styles() {
            const e = [a];
            return super.styles && e.unshift(super.styles), e
        }
        constructor() {
            super(), this._skeletonSetByParent = !1, this._skeletonSetExplicitly = !1, this._skeletonActive = !1, this._skeletonWait = !1, this._parentSkeleton = new t(this, "skeleton", {
                onSubscribe: this._onSubscribe.bind(this),
                onUnsubscribe: this._onUnsubscribe.bind(this)
            })
        }
        get skeleton() {
            return this._skeletonActive
        }
        set skeleton(e) {
            const t = this._skeletonSetExplicitly;
            t !== e && (this._skeletonSetExplicitly = e, this._skeletonActive = e, this.requestUpdate("skeleton", t), this._parentSkeleton ? .registry ? .onSubscriberChange())
        }
        setSkeletonActive(e) {
            const t = this._skeletonActive;
            e !== t && (this._skeletonActive = e, this.requestUpdate("skeleton", t))
        }
        setSkeletonSetByParent(e) {
            this._skeletonSetByParent = e
        }
        _onSubscribe() {
            this._skeletonWait = !0
        }
        _onUnsubscribe() {
            this._skeletonWait = !1, this._skeletonActive = this._skeletonSetExplicitly, this.requestUpdate("skeleton", this._skeletonSetExplicitly)
        }
    });
export {
    h as S, a as s
};