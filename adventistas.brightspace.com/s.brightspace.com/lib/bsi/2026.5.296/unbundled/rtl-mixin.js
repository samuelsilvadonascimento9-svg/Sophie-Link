import {
    a as e
} from "./common.js";
import {
    d as t
} from "./dedupeMixin.js";
const n = t(t => class extends t {
    static get properties() {
        return {
            dir: {
                type: String,
                reflect: !0
            }
        }
    }
    constructor() {
        super(), this._localeSettings = e(), this._handleLanguageChange = this._handleLanguageChange.bind(this), this._handleLanguageChange()
    }
    connectedCallback() {
        super.connectedCallback(), this._localeSettings.addChangeListener(this._handleLanguageChange)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._localeSettings.removeChangeListener(this._handleLanguageChange)
    }
    _handleLanguageChange() {
        const e = document.documentElement.getAttribute("dir");
        !e || "ltr" === e && "rtl" !== this.dir || (this.dir = e)
    }
});
export {
    n as R
};