import {
    i as e,
    b as t,
    a as s
} from "./lit-element.js";
import {
    H as r,
    o as a
} from "./HypermediaStateMixin.js";
import {
    e as n
} from "./class-map.js";
import {
    L as i
} from "./localize-mixin.js";
import {
    S as o
} from "./skeleton-mixin.js";
import "./input-text.js";
import {
    c as l
} from "./hypermedia-components.js";
import {
    o as p
} from "./if-defined.js";
import {
    a as c
} from "./labelled-mixin.js";
const m = e => class extends(i(e)) {
    static get localizeConfig() {
        return {
            importFunc: async e => (await
                function(e) {
                    switch (e) {
                        case "./lang/ar.js":
                            return import ("./ar71.js");
                        case "./lang/cy.js":
                            return import ("./cy70.js");
                        case "./lang/da.js":
                            return import ("./da70.js");
                        case "./lang/de.js":
                            return import ("./de71.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb65.js");
                        case "./lang/en.js":
                            return import ("./en72.js");
                        case "./lang/es-es.js":
                            return import ("./es-es70.js");
                        case "./lang/es.js":
                            return import ("./es71.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr70.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on65.js");
                        case "./lang/fr.js":
                            return import ("./fr71.js");
                        case "./lang/haw.js":
                            return import ("./haw65.js");
                        case "./lang/hi.js":
                            return import ("./hi70.js");
                        case "./lang/ja.js":
                            return import ("./ja71.js");
                        case "./lang/ko.js":
                            return import ("./ko71.js");
                        case "./lang/mi.js":
                            return import ("./mi66.js");
                        case "./lang/nl.js":
                            return import ("./nl71.js");
                        case "./lang/pt.js":
                            return import ("./pt71.js");
                        case "./lang/sv.js":
                            return import ("./sv71.js");
                        case "./lang/th.js":
                            return import ("./th61.js");
                        case "./lang/tr.js":
                            return import ("./tr71.js");
                        case "./lang/vi.js":
                            return import ("./vi61.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn66.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw71.js");
                        default:
                            return new Promise(function(t, s) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(s.bind(null, new Error("Unknown variable dynamic import: " + e)))
                            })
                    }
                }(`./lang/${e}.js`)).default
        }
    }
};
class j extends(o(r(m(s)))) {
    static get properties() {
        return {
            name: {
                type: String,
                observable: a.property
            },
            wrap: {
                type: Boolean
            }
        }
    }
    static get styles() {
        return [super.styles, e `
			.d2l-activity-name-skeleton-extend-skeleton-width {
				display: inline-block;
				min-width: 5rem;
			}
			.d2l-skeletize {
				overflow-y: hidden;
				white-space: nowrap;
			}
			.wrap {
				white-space: normal;
			}
		`]
    }
    constructor() {
        super(), this.skeleton = !0
    }
    render() {
        const e = {
            wrap: this.wrap
        };
        return t `
		<span class="d2l-skeletize ${n(e)}">${this.name?this.name:t`${this.localize("name")} <div class="d2l-activity-name-skeleton-extend-skeleton-width"></div>`}</span>
		`
    }
    updated(e) {
        super.updated(e), e.has("name") && this.dispatchEvent(new CustomEvent("d2l-label-change", {
            bubbles: !0,
            composed: !0,
            detail: this.name
        }))
    }
    get _loaded() {
        return !this.skeleton
    }
    set _loaded(e) {
        this.skeleton = !e
    }
}
customElements.define("d2l-hc-name", j);
const u = Object.freeze({
    specialization: "https://api.brightspace.com/rels/specialization"
});
class d extends(c(r(s))) {
    static get properties() {
        return {
            _specializationHref: {
                type: String,
                observable: a.link,
                rel: u.specialization,
                prime: !0
            },
            wrap: {
                type: Boolean
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name ?wrap="${this.wrap}" href="${p(this._specializationHref)}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
l("d2l-activity-name-specialization", d, "d2l-activity-name", [
    ["activity-usage"]
]);