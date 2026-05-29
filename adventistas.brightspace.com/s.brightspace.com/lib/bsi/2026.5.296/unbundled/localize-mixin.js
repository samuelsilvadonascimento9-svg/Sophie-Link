import {
    b as e,
    c as t
} from "./_rollupPluginBabelHelpers.js";
import {
    g as s,
    v as o,
    d as r
} from "./localize.js";
import {
    b as a
} from "./lit-element.js";
import {
    o as i
} from "./if-defined.js";
import {
    d as c
} from "./dedupeMixin.js";
const l = c(o => {
        var r;
        return r = new WeakMap, class extends(s(o)) {
            constructor() {
                super(), e(this, r, new Map), super.constructor.setLocalizeMarkup(u), super.constructor.documentLocaleSettings.pseudoLocalization ? .textFormat && (this.localize = (...e) => super.constructor.pseudoLocalize((...e) => super.localize(...e), ...e))
            }
            connectedCallback() {
                super.connectedCallback(), this.connect()
            }
            disconnectedCallback() {
                super.disconnectedCallback(), this.disconnect(), t(r, this).clear()
            }
            async getUpdateComplete() {
                const e = await super.getUpdateComplete(),
                    t = this._hasResources(),
                    s = void 0 !== this.localize.resources && !this.pristine;
                return !t || s || await this.__resourcesLoadedPromise, e
            }
            shouldUpdate(e) {
                if (!this._hasResources()) return super.shouldUpdate(e);
                return void 0 === this.localize.resources || this.pristine ? (e.forEach((e, s) => {
                    t(r, this).set(s, e)
                }), !1) : (t(r, this).forEach((t, s) => {
                    e.has(s) || e.set(s, t)
                }), t(r, this).clear(), super.shouldUpdate(e))
            }
            onLocalizeResourcesChange() {
                this.requestUpdate("localize")
            }
        }
    }),
    n = e => class extends(l(e)) {
        static getLocalizeResources() {
            return super._getLocalizeResources(...arguments)
        }
        static get localizeConfig() {
            return {}
        }
    };

function u(e, ...t) {
    return e.forEach(e => o(e, r)), t.forEach(e => o(e, r)), Object.freeze({ ...a(e, ...t),
        _localizeMarkup: !0
    })
}

function p({
    href: e,
    target: t
}) {
    return import ("./link.js"), s => u `<d2l-link href="${i(e)}" target="${i(t)}">${s}</d2l-link>`
}

function d({
    contents: e
}) {
    return import ("./tooltip-help.js"), t => u `<d2l-tooltip-help inherit-font-style text="${i(t)}">${e}</d2l-tooltip-help>`
}
export {
    n as L, l as _, d as a, p as g, u as l
};