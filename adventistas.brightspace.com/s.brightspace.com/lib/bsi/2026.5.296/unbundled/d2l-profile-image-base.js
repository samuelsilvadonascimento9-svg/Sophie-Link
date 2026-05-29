import "./colors.js";
import "./icon.js";
import "./d2l-fetch.js";
import {
    c as e,
    e as t,
    f as i,
    h as r,
    l as s
} from "./styles.js";
import {
    i as a,
    a as o,
    A as l,
    b as n
} from "./lit-element.js";
import {
    e as d
} from "./class-map.js";
import "./svg-to-css.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./index5.js";
import "./d2lfetch.js";
import "./focus.js";
import "./dom.js";
const h = a `
	:host([size="x-small"]) .round-corners,
	:host([size="small"]) .round-corners {
		border-radius: 4px;
	}
	:host([size="medium"]) .round-corners {
		border-radius: 6px;
	}
	:host([size="large"]) .round-corners,
	:host([size="x-large"]) .round-corners {
		border-radius: 8px;
	}
`;
customElements.define("d2l-profile-image-base", class extends o {
    static get properties() {
        return {
            colorId: {
                type: Number,
                attribute: "color-id"
            },
            firstName: {
                type: String,
                attribute: "first-name"
            },
            lastName: {
                type: String,
                attribute: "last-name"
            },
            href: {
                type: String
            },
            token: {
                type: String
            },
            size: {
                type: String,
                reflect: !0
            },
            loading: {
                type: Boolean,
                reflect: !0
            },
            _backgroundColors: {
                attribute: !1,
                type: Array
            },
            _imageLoading: {
                attribute: !1,
                type: Boolean
            },
            _imageUrl: {
                attribute: !1,
                type: String
            },
            _failedToLoadImage: {
                attribute: !1,
                type: Boolean
            }
        }
    }
    static get styles() {
        return [e, t, i, r, s, h, a `
				:host {
					--d2l-icon-height: 100%;
					--d2l-icon-width: 100%;
					display: inline-block;
				}

				:host([loading]) {
					opacity: 0.5;
				}

				:host(:not([size="x-small"]):not([size="small"]):not([size="medium"]):not([size="large"]):not([size="x-large"])) {
					display: none;
				}

				:host([size="x-small"]) {
					height: 1.2rem;
					margin: 0;
					min-width: 1.2rem;
					width: 1.2rem;
				}

				:host([size="small"]) {
					height: 1.5rem;
					margin: 0;
					min-width: 1.5rem;
					width: 1.5rem;
				}

				:host([size="medium"]) {
					height: calc(2rem + 2px);
					margin: 0;
					min-width: calc(2rem + 2px);
					width: calc(2rem + 2px);
				}

				:host([size="large"]) {
					height: 3rem;
					margin: 0;
					min-width: 3rem;
					width: 3rem;
				}

				:host([size="x-large"]) {
					height: 4.2rem;
					margin: 0;
					min-width: 4.2rem;
					width: 4.2rem;
				}

				.d2l-profile-image-container {
					height: 100%;
					width: 100%;
				}

				.d2l-profile-image-container.shady-person {
					--d2l-icon-fill-color: var(--d2l-color-ferrite);
				}

				.d2l-profile-image-container.initials {
					align-items: center;
					background-color: var(--d2l-initials-background-color);
					color: #ffffff;
					display: flex;
					justify-content: center;
					margin: 0;
					text-align: center;
				}
		`]
    }
    constructor() {
        super(), this.colorId = -1, this._failedToLoadImage = !1, this._imageLoading = !0, this._backgroundColors = ["#8B271F", "#CF3A2F", "#C74F05", "#527F1F", "#346633", "#165F5B", "#1F826B", "#0C7683", "#3155BF", "#4476C1", "#383773", "#6F6BB8", "#50305F", "#9860AF", "#804167", "#AB578A", "#8C2855", "#D13B7F", "#47565E", "#5F727D", "#3B4148", "#59616C"]
    }
    connectedCallback() {
        super.connectedCallback(), !this._imageUrl && this.href && this._resetImageState(), this._handleColorId()
    }
    render() {
        return this._imageLoading && this.href ? l : this.href && !this._failedToLoadImage ? this._renderAvatar() : void 0 !== this.colorId && null !== this.colorId && this.colorId > 0 && this.firstName ? this._renderInitials() : this._renderShadyPerson()
    }
    updated(e) {
        e.has("href") && this._resetImageState(), e.has("colorId") && this._handleColorId()
    }
    _getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
    _getInitialedBackgroundColor(e) {
        return this._backgroundColors[e % this._backgroundColors.length]
    }
    _getInitials(e, t) {
        return e && t ? e[0].toUpperCase() + t[0].toUpperCase() : e ? e[0].toUpperCase() : ""
    }
    _handleColorId() {
        const e = this._getInitialedBackgroundColor(this.colorId);
        e && this.style.setProperty("--d2l-initials-background-color", e)
    }
    _onImageLoadError() {
        this._failedToLoadImage = !0
    }
    _renderAvatar() {
        return n `
			<img
				class="d2l-profile-image-container avatar round-corners"
				draggable="false"
				src="${this._imageUrl}"
				@error="${this._onImageLoadError}"
				alt="${this._getFullName()} avatar"
			>
		`
    }
    _renderInitials() {
        const e = {
            "d2l-profile-image-container": !0,
            initials: !0,
            "round-corners": !0,
            "d2l-heading-2": "x-large" === this.size,
            "d2l-heading-3": "large" === this.size,
            "d2l-heading-4": "medium" === this.size,
            "d2l-label-text": "small" === this.size,
            "d2l-body-small": "x-small" === this.size
        };
        return n `
			<div class="${d(e)}">
				${this._getInitials(this.firstName,this.lastName)}
			</div>
		`
    }
    _renderShadyPerson() {
        return n `
			<div class="d2l-profile-image-container shady-person round-corners">
				<d2l-icon icon="tier3:profile-pic"></d2l-icon>
			</div>
		`
    }
    async _resetImageState() {
        if (this.href) {
            this._imageLoading = !0, this._failedToLoadImage = !1;
            try {
                const e = await ("function" == typeof this.token) ? this.token() : Promise.resolve(this.token),
                    t = await e,
                    i = new Headers;
                t && i.append("Authorization", `Bearer ${t}`);
                const r = await window.d2lfetch.removeTemp("simple-cache").removeTemp("dedupe").fetch(this.href, {
                        method: "GET",
                        headers: i
                    }),
                    s = await r.blob();
                this._imageUrl = URL.createObjectURL(s)
            } catch {
                this._imageUrl = this.href
            }
            this._imageLoading = !1
        }
    }
});
export {
    h as p
};