import {
    a as s,
    b as e
} from "./lit-element.js";
import {
    H as t,
    o as r
} from "./HypermediaStateMixin.js";
import {
    c as a
} from "./hypermedia-components.js";
import {
    L as i
} from "./localize-mixin.js";
import {
    S as n
} from "./skeleton-mixin.js";
class l extends(n(i(t(s)))) {
    static get properties() {
        return {
            _classes: {
                type: Array,
                observable: r.classes
            },
            _childContentClasses: {
                type: Array,
                observable: r.classes,
                route: [{
                    observable: r.subEntity,
                    rel: "https://activities.api.brightspace.com/rels/child-user-activity-usage"
                }]
            }
        }
    }
    static get styles() {
        return [super.styles]
    }
    constructor() {
        super(), this._classes = [], this._childContentClasses = [], this.skeleton = !0
    }
    static get components() {
        return {
            "user-survey-activity": "label-survey",
            "learning-path": "label-learningPath",
            "course-offering": "label-course",
            "user-assignment-activity": "label-assignment",
            "user-checklist-activity": "label-checklist",
            "user-content-activity": "label-content",
            "user-course-offering-activity-usage": "label-course",
            "user-activity-usage": "label-course",
            "user-discussion-activity": "label-discussion",
            "user-quiz-activity": "label-quiz",
            "user-quiz-attempt-activity": "label-quiz",
            "lti-activity-usage": "label-lti-activity",
            default: "label-activity"
        }
    }
    static get localizeConfig() {
        return {
            importFunc: async s => (await
                function(s) {
                    switch (s) {
                        case "./lang/ar.js":
                            return import ("./ar9.js");
                        case "./lang/cy.js":
                            return import ("./cy9.js");
                        case "./lang/da.js":
                            return import ("./da9.js");
                        case "./lang/de.js":
                            return import ("./de9.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb8.js");
                        case "./lang/en.js":
                            return import ("./en9.js");
                        case "./lang/es-es.js":
                            return import ("./es-es9.js");
                        case "./lang/es.js":
                            return import ("./es9.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr9.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on8.js");
                        case "./lang/fr.js":
                            return import ("./fr9.js");
                        case "./lang/haw.js":
                            return import ("./haw9.js");
                        case "./lang/hi.js":
                            return import ("./hi9.js");
                        case "./lang/ja.js":
                            return import ("./ja9.js");
                        case "./lang/ko.js":
                            return import ("./ko9.js");
                        case "./lang/mi.js":
                            return import ("./mi9.js");
                        case "./lang/nl.js":
                            return import ("./nl9.js");
                        case "./lang/pt.js":
                            return import ("./pt9.js");
                        case "./lang/sv.js":
                            return import ("./sv9.js");
                        case "./lang/th.js":
                            return import ("./th9.js");
                        case "./lang/tr.js":
                            return import ("./tr9.js");
                        case "./lang/vi.js":
                            return import ("./vi9.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn8.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw9.js");
                        default:
                            return new Promise(function(e, t) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(t.bind(null, new Error("Unknown variable dynamic import: " + s)))
                            })
                    }
                }(`./lang/${s}.js`)).default,
            osloCollection: "@brightspace-hmc\\foundation-components\\ActivityType"
        }
    }
    render() {
        let s = l.components.default;
        return (this._childContentClasses.length > 0 ? this._childContentClasses : this._classes).some(e => {
            if (l.components[e]) return s = l.components[e], !0
        }), e `
			<span class="d2l-skeletize">${this.localize(s)}</span>
		`
    }
    get _loaded() {
        return !this.skeleton
    }
    set _loaded(s) {
        this.skeleton = !s
    }
}
a("d2l-activity-type", l);