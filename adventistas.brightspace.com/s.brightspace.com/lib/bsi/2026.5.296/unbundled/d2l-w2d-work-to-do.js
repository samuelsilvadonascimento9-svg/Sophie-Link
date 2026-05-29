import "./list.js";
import "./list-item.js";
import "./list-item-content.js";
import {
    e
} from "./_rollupPluginBabelHelpers.js";
import "./status-indicator.js";
import {
    c as t,
    h as i
} from "./hypermedia-components.js";
import {
    a as s,
    b as r,
    A as a,
    i as l
} from "./lit-element.js";
import {
    H as o,
    o as n,
    S as c,
    b as p,
    f as d,
    c as h
} from "./HypermediaStateMixin.js";
import {
    S as u,
    s as g
} from "./skeleton-mixin.js";
import {
    i as m
} from "./icon.js";
import "./d2l-activity-name.js";
import "./d2l-activity-type.js";
import "./d2l-activity-name-specialization.js";
import {
    e as v
} from "./class-map.js";
import {
    f as _
} from "./dateTime.js";
import {
    o as y
} from "./if-defined.js";
import {
    L as f
} from "./list-item-link-mixin.js";
import {
    L as b
} from "./localize-mixin.js";
import j from "./index7.js";
import "./button.js";
import "./colors.js";
import "./link.js";
import "./offscreen.js";
import "./pager-numeric.js";
import "./navigation-immersive.js";
import {
    a as w,
    e as k,
    f as S,
    d as D
} from "./styles.js";
import "./focus.js";
import "./dom.js";
import "./selection-mixin.js";
import "./collection-mixin.js";
import "./pageable-mixin.js";
import "./subscriberControllers.js";
import "./svg-to-css.js";
import "./d2l-fetch.js";
import "./index5.js";
import "./d2lfetch.js";
import "./index8.js";
import "./dedupeMixin.js";
import "./icon-styles.js";
import "./directive.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./labelled-mixin.js";
import "./property-required-mixin.js";
import "./input-text.js";
import "./tooltip.js";
import "./announce.js";
import "./uniqueId.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./framed.js";
import "./dismissible.js";
import "./style-map.js";
import "./number.js";
import "./common.js";
import "./input-inline-help.js";
import "./localize-core-element.js";
import "./input-label-styles.js";
import "./input-styles.js";
import "./rtl-mixin.js";
import "./localize.js";
import "./index2.js";
import "./index3.js";
import "./list-item-mixin.js";
import "./visible-on-ancestor-mixin.js";
import "./input-checkbox.js";
import "./expand-collapse-content.js";
import "./interactive-mixin.js";
import "./composeMixins.js";
import "./color.js";
import "./selection-input.js";
import "./input-radio-styles.js";
import "./button-styles.js";
import "./button-move.js";
import "./theme-mixin.js";
import "./button-icon.js";
import "./slotted-icon-mixin.js";
import "./loading-spinner.js";
import "./waitForElem.js";
import "./overflow.js";
import "./input-number.js";
import "./localize-labs-element.js";
import "./input-select-styles.js";
import "./navigation.js";
import "./navigation-band.js";
import "./navigation-styles.js";
import "./navigation-skip.js";
import "./navigation-link-back.js";
import "./navigation-link-icon.js";
import "./navigation-shared-styles.js";
class z extends(u(o(s))) {
    constructor() {
        super(), this.skeleton = !0
    }
    render() {
        return this.skeleton ? r `<p class="d2l-skeletize-paragraph-2 d2l-activity-description-skeleton-extend-skeleton-width">2-line</p>` : r `
			<span>${this._description?this._description:a}</span>
		`
    }
    get _loaded() {
        return !this.skeleton
    }
    set _loaded(e) {
        this.skeleton = !e
    }
}
const x = Object.freeze({
    specialization: "https://api.brightspace.com/rels/specialization"
});
t("d2l-activity-description-specialization", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: x.specialization
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["activity-usage"]
]);
const V = Object.freeze({
    content: "https://api.brightspace.com/rels/content",
    description: "https://sequences.api.brightspace.com/rels/description"
});
t("d2l-activity-description-content", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                id: "text",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: V.content
                }, {
                    observable: n.subEntity,
                    rel: V.description
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["user-content-activity"]
]);
const P = Object.freeze({
    checklist: "https://checklists.api.brightspace.com/rels/checklist-item",
    description: "https://checklists.api.brightspace.com/rels/description"
});
t("d2l-activity-description-checklist", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                id: "text",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: P.checklist
                }, {
                    observable: n.subEntity,
                    rel: P.description
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["user-checklist-activity"]
]);
const $ = Object.freeze({
    assignment: "https://api.brightspace.com/rels/assignment"
});
t("d2l-activity-description-assignment", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                id: "instructionsText",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: $.assignment
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["user-assignment-activity"]
]);
const I = Object.freeze({
    description: "https://discussions.api.brightspace.com/rels/description",
    topic: "https://discussions.api.brightspace.com/rels/topic"
});
t("d2l-activity-description-discussion", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                id: "text",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: I.topic
                }, {
                    observable: n.subEntity,
                    rel: I.description
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["user-discussion-activity"]
]);
const G = Object.freeze({
    description: "https://quizzes.api.brightspace.com/rels/description",
    quiz: "https://api.brightspace.com/rels/quiz"
});
t("d2l-activity-description-quiz", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                id: "text",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: G.quiz
                }, {
                    observable: n.subEntity,
                    rel: G.description
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["user-quiz-activity"],
    ["user-quiz-attempt-activity"]
]);
const T = Object.freeze({
    organization: "https://api.brightspace.com/rels/organization"
});
t("d2l-activity-description-course", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: T.organization
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["activity-usage", "course-offering"],
    ["user-course-offering-activity-usage"],
    ["user-activity-usage"]
]);
const H = Object.freeze({
    survey: "https://surveys.api.brightspace.com/rels/survey",
    description: "https://surveys.api.brightspace.com/rels/description"
});
t("d2l-activity-description-survey", class extends z {
    static get properties() {
        return {
            _description: {
                type: String,
                id: "text",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: H.survey
                }, {
                    observable: n.subEntity,
                    rel: H.description
                }]
            }
        }
    }
}, "d2l-activity-description", [
    ["user-survey-activity"]
]);
t("d2l-activity-description", class extends z {});
class O extends(u(o(s))) {
    static get properties() {
        return {
            _classes: {
                type: Array,
                observable: n.classes
            },
            _configuredIcon: {
                type: Object,
                observable: n.subEntities,
                rel: "icon",
                method: e => {
                    for (const t of e)
                        if (t.class.includes("tier2")) return t
                },
                route: [{
                    observable: n.link,
                    rel: "https://api.brightspace.com/rels/content"
                }]
            },
            _childContentClasses: {
                type: Array,
                observable: n.classes,
                route: [{
                    observable: n.subEntity,
                    rel: "https://activities.api.brightspace.com/rels/child-user-activity-usage"
                }]
            }
        }
    }
    static get styles() {
        const e = [l `
			.d2l-activity-icon {
				color: var(--d2l-activity-icon-color);
			}
		`];
        return super.styles && e.unshift(super.styles), e
    }
    constructor() {
        super(), this.skeleton = !0, this._classes = [], this._childContentClasses = []
    }
    static get components() {
        return {
            "user-survey-activity": "tier2:surveys",
            "learning-path": "tier1:exemption-add",
            "course-offering": "tier1:course",
            "user-assignment-activity": "tier2:assignments",
            "user-checklist-activity": "tier2:checklist",
            "user-content-activity": "tier2:content",
            "user-course-offering-activity-usage": "tier2:syllabus",
            "user-activity-usage": "tier1:course",
            "user-discussion-activity": "tier2:discussions",
            "user-quiz-activity": "tier2:quizzing",
            "user-quiz-attempt-activity": "tier2:quizzing",
            default: "tier1:quizzing"
        }
    }
    render() {
        let e = O.components.default;
        if (this._configuredIcon) e = this._configuredIcon.properties.iconSetKey;
        else {
            (this._childContentClasses.length > 0 ? this._childContentClasses : this._classes).some(t => !!O.components[t] && (e = O.components[t], !0))
        }
        return r `
			<d2l-icon icon="${e}" class="d2l-skeletize d2l-activity-icon"></d2l-icon>
		`
    }
    get _loaded() {
        return !this.skeleton
    }
    set _loaded(e) {
        this.skeleton = !e
    }
}
customElements.define("d2l-activity-icon", O);
class A extends(u(s)) {
    static get styles() {
        return [super.styles, l `
			*,
			::slotted(*) {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		`]
    }
    render() {
        return this.skeleton ? r `
				<div class="d2l-w2d-block">
					<div class="d2l-skeletize">Due date - Subject</div>
				</div>` : r `<slot></slot>`
    }
}
customElements.define("d2l-w2d-attribute-list", A);
const E = Object.freeze({
        appId: "worktodo",
        api: "d2l-work-to-do.api",
        activitiesNextpage: "https://activities.api.brightspace.com/rels/next-page"
    }),
    C = Object.freeze({
        overdue: {
            loaded: `${E.api}.overdue.loaded`,
            started: `${E.api}.overdue.started`
        },
        upcoming: {
            loaded: `${E.api}.upcoming.loaded`,
            started: `${E.api}.upcoming.started`
        },
        view: {
            loaded: `${E.api}.view.loaded`
        }
    }),
    M = Object.freeze({
        viewLoad: [C.overdue.loaded, C.upcoming.loaded, C.view.loaded],
        loadMore: [C.overdue.loaded, C.upcoming.loaded]
    });
const F = new class {
    constructor() {
        this._custom = {}, this._marks = {}, this._createClient()
    }
    logActivityNavigatedTo(e, t) {
        return this._logTelemetryEvent("NavigatedTo", e, t).catch(() => {})
    }
    logViewAllClicked(e) {
        return this._logTelemetryEvent("ViewAllClicked", e, "ViewAll").catch(() => {})
    }
    markAndLogLoadMore() {
        this._logPerformanceEvent("LoadMore", E.activitiesNextpage, "ActivitiesNextPage", M.loadMore)
    }
    markAndLogWidgetLoaded(e) {
        this._markEventEnd(C.view.loaded, null), this._logPerformanceEvent("LoadView", window.location.pathname, e ? "Fullscreen" : "Widget", M.viewLoad)
    }
    markFetchEnd(e, t = 0) {
        const i = {
            [`${e.charAt(0).toUpperCase()}${e.slice(1)}Count`]: t
        };
        this._markEventEnd(C[e].loaded, this._marks[e], i)
    }
    markFetchStart(e) {
        this._marks[e] = this._markEventStart(C[e].started)
    }
    async _createClient() {
        window.D2L.Telemetry && (this._client = await window.D2L.Telemetry.CreateClient())
    }
    _logPerformanceEvent(e, t, i, s) {
        if (!(e && t && i && s)) return;
        const r = t.startsWith("/") ? location.origin + t : t,
            a = performance.getEntriesByType("measure").filter(e => s.includes(e.name)).map(e => (performance.clearMeasures(e.name), e)),
            l = (new j.PerformanceEventBody).setAction(e).setObject(encodeURIComponent(r), i, r).addUserTiming(a);
        s.forEach(e => {
            const t = this._custom[e];
            for (; t && t.length;) {
                const e = t.pop();
                l.addCustom(e.name, e.value)
            }
        });
        const o = (new j.TelemetryEvent).setType("PerformanceEvent").setDate(new Date).setSourceId(E.appId).setBody(l);
        return this._sendEvent(o)
    }
    _logTelemetryEvent(e, t, i) {
        if (!e || !t || !i) return;
        const s = t.startsWith("/") ? location.origin + t : t,
            r = (new j.EventBody).setAction(e).setObject(encodeURIComponent(s), i, s),
            a = (new j.TelemetryEvent).setType("TelemetryEvent").setDate(new Date).setSourceId(E.appId).setBody(r);
        return this._sendEvent(a)
    }
    _markEventEnd(e, t, i) {
        void 0 !== t && (performance.measure(e, t || void 0), i && (this._custom[e] || (this._custom[e] = []), Object.entries(i).forEach(([t, i]) => {
            this._custom[e].push({
                name: t,
                value: i
            })
        })))
    }
    _markEventStart(e) {
        if (!e) return;
        const t = `${e}:${performance.now()}`;
        return performance.mark(t), t
    }
    _sendEvent(e) {
        return this._client && this._client.logUserEvent(e)
    }
};
const L = Object.freeze({
        due: "due-date",
        end: "end-date",
        start: "start-date"
    }),
    B = Object.freeze({
        checklist: "https://checklists.api.brightspace.com/rels/checklist-item",
        content: "https://api.brightspace.com/rels/content",
        date: "https://api.brightspace.com/rels/date",
        availabilityDates: "https://api.brightspace.com/rels/availabilitydates",
        organization: "https://api.brightspace.com/rels/organization",
        organizationHomepage: "https://api.brightspace.com/rels/organization-homepage",
        quiz: "https://api.brightspace.com/rels/quiz",
        survey: "https://surveys.api.brightspace.com/rels/survey",
        userAssignment: "https://api.brightspace.com/rels/user-assignment",
        userTopic: "https://discussions.api.brightspace.com/rels/user-topic"
    });
class R extends(b(o(f(s)))) {
    static get properties() {
        return {
            collapsed: {
                type: Boolean
            },
            skeleton: {
                type: Boolean
            },
            allowUnclickableActivities: {
                type: Boolean,
                attribute: "allow-unclickable-activities"
            },
            clickableFutureActivities: {
                type: Boolean,
                attribute: "clickable-future-activities"
            },
            _actionHref: {
                type: String
            },
            _hasStarted: {
                type: Boolean,
                observable: n.classes,
                method: e => e.includes("started")
            },
            _hasAvailabilityDates: {
                type: Boolean,
                observable: n.subEntity,
                rel: B.availabilityDates,
                method: e => e.class.includes("availability-dates")
            },
            _dates: {
                type: Object,
                observable: n.subEntities,
                rel: B.date,
                method: e => {
                    const t = {};
                    return e.forEach(e => {
                        Object.keys(L).forEach(i => e.class.includes(L[i]) && (t[i] = e.properties.localizedDate && new Date(e.properties.localizedDate)))
                    }), t
                }
            },
            _parentName: {
                type: String,
                name: "name",
                observable: n.property,
                route: [{
                    observable: n.link,
                    rel: B.organization
                }]
            }
        }
    }
    static get styles() {
        const e = [l `
			:host([action-href]:not([action-href=""])) {
				--d2l-list-item-content-text-color: var(--d2l-color-ferrite);
			}
			:host([action-href]:not([action-href=""]):not([skeleton])) d2l-activity-icon.d2l-focusing,
			:host([action-href]:not([action-href=""]):not([skeleton])) d2l-activity-icon.d2l-hovering {
				--d2l-activity-icon-color: var(--d2l-color-celestine);
			}
			:host([collapsed]) .d2l-list-item-content {
				padding: 0.25rem 0;
			}
			.d2l-w2d-list-item-name {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.due-date {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			d2l-status-indicator {
				text-transform: none;
			}
			.d2l-w2d-list-item-attributes *::before {
				content: "•";
				display: inline-block;
				height:18px;
				width:18px;
				vertical-align: top;
				margin-left: 0rem;
				margin-right: -.25rem;
			}
			.d2l-w2d-list-item-attributes *:first-child::before {
				content: "";
				height: 0;
				width: 0;
				display: initial;
				margin-left: 0rem;
				margin-right: 0rem;
			}
		`];
        return super.styles && e.unshift(super.styles), e
    }
    constructor() {
        super(), this._dates = !1, this._isCourse = !1, this.collapsed = !1, this._actionHref = void 0, this._hasAvailabilityDates = !1, this.addEventListener("d2l-list-item-link-click", this._handleItemLinkClick.bind(this))
    }
    get actionHref() {
        return this.clickableFutureActivities || this._dates && !this._dates.start || this._hasStarted ? this._actionHref : void 0
    }
    set actionHref(e) {
        const t = this.actionHref;
        this._actionHref = e, this.allowUnclickableActivities = !0, (t || this.actionHref) && this.requestUpdate("actionHref", t)
    }
    static get localizeConfig() {
        return {
            importFunc: async e => (await
                function(e) {
                    switch (e) {
                        case "./lang/ar.js":
                            return import ("./ar93.js");
                        case "./lang/cy.js":
                            return import ("./cy92.js");
                        case "./lang/da.js":
                            return import ("./da92.js");
                        case "./lang/de.js":
                            return import ("./de93.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb86.js");
                        case "./lang/en.js":
                            return import ("./en94.js");
                        case "./lang/es-es.js":
                            return import ("./es-es92.js");
                        case "./lang/es.js":
                            return import ("./es93.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr92.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on87.js");
                        case "./lang/fr.js":
                            return import ("./fr93.js");
                        case "./lang/haw.js":
                            return import ("./haw86.js");
                        case "./lang/hi.js":
                            return import ("./hi92.js");
                        case "./lang/ja.js":
                            return import ("./ja93.js");
                        case "./lang/ko.js":
                            return import ("./ko93.js");
                        case "./lang/mi.js":
                            return import ("./mi87.js");
                        case "./lang/nl.js":
                            return import ("./nl93.js");
                        case "./lang/pt.js":
                            return import ("./pt93.js");
                        case "./lang/sv.js":
                            return import ("./sv93.js");
                        case "./lang/th.js":
                            return import ("./th82.js");
                        case "./lang/tr.js":
                            return import ("./tr93.js");
                        case "./lang/vi.js":
                            return import ("./vi82.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn88.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw93.js");
                        default:
                            return new Promise(function(t, i) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)))
                            })
                    }
                }(`./lang/${e}.js`)).default,
            osloCollection: "@brightspace-hmc\\foundation-components\\WorkToDo"
        }
    }
    render() {
        if (this.skeleton || !this._dates || !this.allowUnclickableActivities && !this._actionHref || !this._parentName) return this._renderSkeleton();
        const e = {
                "d2l-hovering": this._hoveringPrimaryAction,
                "d2l-focusing": this._focusingPrimaryAction
            },
            t = !this.actionHref && this._dates.start ? r `
				<d2l-status-indicator slot="${y(this.collapsed?"supporting-info":void 0)}" state="none" text="${this.localize("StartsWithDate","startDate",_(this._dates.start,{format:"shortMonthDay"}))}"></d2l-status-indicator>
			` : null,
            s = this._renderListItem({
                illustration: r `<d2l-activity-icon href="${this.href}" .token="${this.token}" class="${v(e)}"></d2l-activity-icon>`,
                content: r `${m([this.href,this.token],()=>i`
				<d2l-list-item-content>
					<d2l-activity-name class="d2l-w2d-list-item-name" href="${this.href}" .token="${this.token}"></d2l-activity-name>
					<d2l-w2d-attribute-list slot="secondary" class="d2l-w2d-list-item-attributes">
						<div>
							${this.collapsed?null:t}
							${this._renderAttributeListCollapsed()}
						</div>
					</d2l-w2d-attribute-list>
					${this.collapsed?t:i`<d2l-activity-description slot="supporting-info" href="${this.href}" .token="${this.token}"></d2l-activity-description>`}
				</d2l-list-item-content>
			`)}`
            });
        return r `
			${s}
		`
    }
    _handleItemLinkClick() {
        F.logActivityNavigatedTo(this.actionHref, this.constructor.activityType)
    }
    _renderAttributeListCollapsed() {
        let e;
        (this._dates.due || this._dates.end) && (e = r `<span>${this._dates.due?this.localize("dueWithDate","dueDate",_(this._dates.due,{format:"shortMonthDay"})):this.localize("endWithDate","endDate",_(this._dates.end,{format:"shortMonthDay"}))}</span>`);
        const t = this._isCourse ? null : r `<d2l-activity-type href="${this.href}" .token="${this.token}"></d2l-activity-type>`,
            s = this._isCourse ? r `<span>${this.localize("course")}</span>` : r `<span>${this._parentName}</span>`;
        return i `
			${this.collapsed?e:t}
			${s}
		`
    }
    _renderSkeleton() {
        if (this.skeleton || !this._loaded) return this._renderListItem({
            illustration: i `<d2l-activity-icon skeleton></d2l-activity-icon>`,
            content: i `
				<d2l-list-item-content>
					<d2l-activity-name class="d2l-w2d-list-item-name" skeleton href="${this.href}" .token="${this.token}"></d2l-activity-name>
					<d2l-w2d-attribute-list slot="secondary" skeleton></d2l-w2d-attribute-list>
					${this.collapsed?a:r`<d2l-activity-description slot="supporting-info" href="${this.href}" .token="${this.token}"></d2l-activity-description>`}
				</d2l-list-item-content>
			`
        })
    }
}
t("d2l-w2d-list-item", class extends R {});
class U extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: "alternate",
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    get actionHref() {
        return this._hasAvailabilityDates ? null !== this._actionHref ? this._actionHref : void 0 : super.actionHref
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(U, "activityType", "userAssignment"), t("d2l-w2d-list-item-assignment", U, "d2l-w2d-list-item", [
    ["user-assignment-activity"]
]);
class q extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: "alternate",
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    get actionHref() {
        return super.actionHref
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(q, "activityType", "checklist"), t("d2l-w2d-list-item-checklist", q, "d2l-w2d-list-item", [
    ["user-checklist-activity"]
]);
class N extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: "alternate",
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    get actionHref() {
        return super.actionHref
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(N, "activityType", "content"), t("d2l-w2d-list-item-content", N, "d2l-w2d-list-item", [
    ["user-content-activity"]
]);
class W extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: B.organizationHomepage,
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    constructor() {
        super(), this._isCourse = !0
    }
    get actionHref() {
        return super.actionHref
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(W, "activityType", "organization"), t("d2l-w2d-list-item-course", W, "d2l-w2d-list-item", [
    ["course-offering"],
    ["user-course-offering-activity-usage"],
    ["user-activity-usage"]
]);
class Y extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: "alternate",
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    get actionHref() {
        return null !== this._actionHref ? this._actionHref : void 0
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(Y, "activityType", "userTopic"), t("d2l-w2d-list-item-discussion", Y, "d2l-w2d-list-item", [
    ["user-discussion-activity"]
]);
class K extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: "alternate",
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    get actionHref() {
        return super.actionHref
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(K, "activityType", "quiz"), t("d2l-w2d-list-item-quiz", K, "d2l-w2d-list-item", [
    ["user-quiz-activity"],
    ["user-quiz-attempt-activity"]
]);
class Q extends R {
    static get properties() {
        return { ...super.properties,
            actionHref: {
                type: String,
                observable: n.link,
                rel: "alternate",
                route: [{
                    observable: n.link,
                    rel: B[this.activityType]
                }],
                reflect: !0,
                attribute: "action-href"
            }
        }
    }
    get actionHref() {
        return super.actionHref
    }
    set actionHref(e) {
        super.actionHref = e
    }
}
e(Q, "activityType", "survey"), t("d2l-w2d-list-item-survey", Q, "d2l-w2d-list-item", [
    ["user-survey-activity"]
]);
const J = 864e5;
class X extends c {
    static definedProperty({
        token: e,
        groupByDays: t,
        startDate: i,
        category: s,
        verbose: r
    }) {
        return {
            token: e,
            groupByDays: t,
            startDate: i,
            category: s,
            verbose: r
        }
    }
    get entities() {
        return this._observers.value || {}
    }
    set entities(e) {
        if (this._sirenFacades = e, !this._startDate || void 0 === this._groupByDays) return;
        const t = {},
            i = {};
        e.forEach(e => {
            const s = function(e, t) {
                let i = e.entities.filter(e => e.hasClass("due-date"));
                if (!i.length && (i = e.entities.filter(e => e.hasClass("end-date")), !i.length)) return !1;
                const s = i.pop(),
                    r = new Date(Date.parse(s.properties.localizedDate)),
                    a = Date.UTC(r.getFullYear(), r.getMonth(), r.getDate()),
                    l = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
                return Math.floor((a - l) / J)
            }(e, this._startDate);
            if (!1 === s) return;
            const r = 0 === this._groupByDays ? 0 : Math.floor(s / this._groupByDays);
            if (!i[r]) {
                const e = Z(this._startDate, r * this._groupByDays),
                    t = Z(e, this._groupByDays - 1);
                i[r] = {
                    startDate: e,
                    endDate: t,
                    index: r,
                    count: 0,
                    href: this._state.href
                }
            }
            i[r].count++, t[r] = t[r] ? t[r] : [], t[r].push(e)
        }), this._observers.setProperty({
            categoryInfo: i,
            sirenFacadesByCategory: t
        })
    }
    addObserver(e, t, {
        method: i,
        category: s,
        startDate: r,
        groupByDays: a
    } = {}) {
        s || (this._startDate = new Date(e[r]), this._groupByDays = e[a], this.entities = this._sirenFacades || []);
        const l = t => s ? t.sirenFacadesByCategory[e[s]] : t.categoryInfo;
        super.addObserver(e, t, {
            method: i ? e => i(l(e)) : l
        })
    }
}

function Z(e, t) {
    const i = new Date(e);
    return i.setDate(i.getDate() + t), i
}
const ee = Object.freeze({
    userActivity: "https://activities.api.brightspace.com/rels/user-activity-usage"
});
class te extends(o(s)) {
    static get properties() {
        return {
            category: {
                type: String
            },
            collapsed: {
                type: Boolean
            },
            limit: {
                type: Number
            },
            skeleton: {
                type: Boolean
            },
            allowUnclickableActivities: {
                type: Boolean,
                attribute: "allow-unclickable-activities"
            },
            clickableFutureActivities: {
                type: Boolean,
                attribute: "clickable-future-activities"
            },
            _activities: {
                type: Array,
                observable: n.custom,
                observableObject: X,
                rel: ee.userActivity,
                category: "category"
            }
        }
    }
    constructor() {
        super(), this._activities = [], this.collapsed = !1, this.requiredPropertyForState("category")
    }
    render() {
        if (this.skeleton || !this._activities) return this._renderSkeleton();
        let e = this._activities;
        return void 0 !== this.limit && (e = e.slice(0, this.limit)), i `
			<d2l-list separators="${this.collapsed?"none":"all"}">
				${e.map(e=>i`
					<d2l-w2d-list-item href="${e.href}" .token="${this.token}" ?collapsed="${this.collapsed}" ?allow-unclickable-activities="${this.allowUnclickableActivities}" ?clickable-future-activities="${this.clickableFutureActivities}"></d2l-w2d-list-item>
				`)}
			</d2l-list>
		`
    }
    _renderSkeleton() {
        return !this.skeleton && this._loaded ? null : r `
			<d2l-list separators="${this.collapsed?"none":"all"}">
				<d2l-w2d-list-item skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
				<d2l-w2d-list-item skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
				<d2l-w2d-list-item skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list-item>
			</d2l-list>
		`
    }
}
customElements.define("d2l-w2d-list", te);
const ie = r `
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 294 152.1" style="enable-background:new 0 0 294 152.1; width:100%" xml:space="preserve">
				<style type="text/css">
					.st0{fill:#F8FAFD;}
					.st1{clip-path:url(#SVGID_2_);}
					.st2{opacity:0.2088;clip-path:url(#SVGID_4_);fill:#202122;enable-background:new    ;}
					.st3{clip-path:url(#SVGID_6_);}
					.st4{clip-path:url(#SVGID_8_);fill:#494C4E;}
					.st5{clip-path:url(#SVGID_10_);}
					.st6{clip-path:url(#SVGID_12_);fill:#E3E9F1;}
					.st7{clip-path:url(#SVGID_14_);}
					.st8{clip-path:url(#SVGID_16_);fill:#FFFFFF;}
					.st9{clip-path:url(#SVGID_18_);}
					.st10{clip-path:url(#SVGID_20_);fill:#90989D;}
					.st11{clip-path:url(#SVGID_22_);}
					.st12{clip-path:url(#SVGID_24_);fill:#46A661;}
					.st13{clip-path:url(#SVGID_26_);}
					.st14{clip-path:url(#SVGID_28_);fill:#90989D;}
					.st15{clip-path:url(#SVGID_30_);}
					.st16{clip-path:url(#SVGID_32_);fill:#46A661;}
					.st17{clip-path:url(#SVGID_34_);}
					.st18{clip-path:url(#SVGID_36_);fill:#90989D;}
					.st19{clip-path:url(#SVGID_38_);}
					.st20{clip-path:url(#SVGID_40_);fill:#46A661;}
					.st21{clip-path:url(#SVGID_42_);}
					.st22{clip-path:url(#SVGID_44_);fill:#E3E9F1;}
					.st23{clip-path:url(#SVGID_46_);}
					.st24{clip-path:url(#SVGID_48_);fill:#E3E9F1;}
					.st25{clip-path:url(#SVGID_50_);}
					.st26{clip-path:url(#SVGID_52_);fill:#E3E9F1;}
				</style>
				<g>
					<path class="st0" d="M72.6,47.1h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H72.6c-2.5,0-4.6-2.1-4.6-4.6V51.6
						C68.1,49,70.2,47.1,72.6,47.1L72.6,47.1z"/>
					<path class="st0" d="M4.7,47.1h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H4.7c-2.5-0.1-4.6-2.2-4.6-4.7V51.6
						C0.1,49,2.1,47.1,4.7,47.1L4.7,47.1z"/>
				</g>
				<g>
					<path class="st0" d="M233.8,46h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6V50.6
						C229.2,48.1,231.3,46,233.8,46L233.8,46z"/>
					<path class="st0" d="M165.8,46h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6V50.6
						C161.1,48.1,163.2,46,165.8,46L165.8,46z"/>
				</g>
				<path class="st0" d="M155.6,99.8h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6v-13.8
					C151.1,101.9,153.1,99.8,155.6,99.8L155.6,99.8z"/>
				<path class="st0" d="M87.8,99.8h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H87.8c-2.5,0-4.6-2.1-4.6-4.6v-13.8
					C83.2,101.9,85.3,99.8,87.8,99.8L87.8,99.8z"/>
				<path class="st0" d="M74.8,46.4h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H74.8c-2.5,0-4.6-2.1-4.6-4.6V50.9
					C70.2,48.4,72.3,46.4,74.8,46.4L74.8,46.4z"/>
				<g>
					<path class="st0" d="M226.2,101.8h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6v-13.8
						C221.7,103.8,223.7,101.8,226.2,101.8L226.2,101.8z"/>
					<path class="st0" d="M19.5,101.8h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H19.5c-2.5,0-4.6-2.1-4.6-4.6v-13.8
						C14.8,103.8,16.9,101.8,19.5,101.8L19.5,101.8z"/>
				</g>
				<g>
					<path class="st0" d="M186.1,19.6h55.6c2.5,0,4.6,2.1,4.6,4.6V38c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6V24.3
						C181.5,21.7,183.6,19.6,186.1,19.6L186.1,19.6z"/>
					<path class="st0" d="M50,19.6h55.6c2.5,0,4.6,2.1,4.6,4.6V38c0,2.5-2.1,4.6-4.6,4.6H50c-2.5,0-4.6-2.1-4.6-4.6V24.3
						C45.5,21.7,47.5,19.6,50,19.6L50,19.6z"/>
					<path class="st0" d="M118.1,19.6h55.6c2.5,0,4.6,2.1,4.6,4.6V38c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6V24.3
						C113.4,21.7,115.5,19.6,118.1,19.6L118.1,19.6z"/>
				</g>
				<g>
					<path class="st0" d="M185.8,129.2h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6v-13.8
						C181.2,131.1,183.3,129.2,185.8,129.2L185.8,129.2z"/>
					<path class="st0" d="M49.7,129.2h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H49.7c-2.5,0-4.6-2.1-4.6-4.6v-13.8
						C45.2,131.1,47.2,129.2,49.7,129.2L49.7,129.2z"/>
					<path class="st0" d="M117.8,129.2h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6v-13.8
						C113.2,131.1,115.2,129.2,117.8,129.2L117.8,129.2z"/>
				</g>
				<g>
					<path class="st0" d="M195.3,74.4h55.6c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6h-55.6c-2.5,0-4.6-2.1-4.6-4.6V79
						C190.6,76.5,192.7,74.4,195.3,74.4L195.3,74.4z"/>
					<path class="st0" d="M36.4,74.4H92c2.5,0,4.6,2.1,4.6,4.6v13.8c0,2.5-2.1,4.6-4.6,4.6H36.4c-2.5,0-4.6-2.1-4.6-4.6V79
						C31.8,76.5,33.9,74.4,36.4,74.4L36.4,74.4z"/>
				</g>
				<path class="st0" d="M90.4,68.3h78.9c3.6,0,6.5,2.9,6.5,6.5v19.5c0,3.6-2.9,6.5-6.5,6.5H90.4c-3.6,0-6.5-2.9-6.5-6.5V74.8
					C83.9,71.2,86.8,68.3,90.4,68.3L90.4,68.3z"/>
				<g>
					<g>
						<defs>
							<path id="SVGID_1_" d="M72.5,35.9h144.7c2.2,0,4,1.8,4,4V129c0,2.2-1.8,4-4,4H72.5c-2.2,0-4-1.8-4-4V39.9
								C68.5,37.7,70.3,35.9,72.5,35.9z"/>
						</defs>
						<clipPath id="SVGID_2_">
							<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st1">
							<g>
								<defs>
									<rect id="SVGID_3_" x="-30.5" y="-56.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_4_">
									<use xlink:href="#SVGID_3_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="63.8" y="31.2" class="st2" width="162.1" height="106.5"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_5_" d="M181.2,34L150.6,3.7c-1.6-1.5-4.1-1.5-5.6,0l-30.7,30.1l-0.5-0.5l31.1-30.6c1.6-1.5,4.1-1.5,5.6,0
								l31.1,30.7L181.2,34z"/>
						</defs>
						<clipPath id="SVGID_6_">
							<use xlink:href="#SVGID_5_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st3">
							<g>
								<defs>
									<rect id="SVGID_7_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_8_">
									<use xlink:href="#SVGID_7_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="109.1" y="-4.7" class="st4" width="77.3" height="43.4"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_9_" d="M75.4,34h144.7c2.2,0,4,1.8,4,4v89.1c0,2.2-1.8,4-4,4H75.4c-2.2,0-4-1.8-4-4V38C71.4,35.8,73.2,34,75.4,34
								z"/>
						</defs>
						<clipPath id="SVGID_10_">
							<use xlink:href="#SVGID_9_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st5">
							<g>
								<defs>
									<rect id="SVGID_11_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_12_">
									<use xlink:href="#SVGID_11_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="66.7" y="29.2" class="st6" width="162.1" height="106.5"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<rect id="SVGID_13_" x="78.9" y="45.3" width="137.6" height="75.4"/>
						</defs>
						<clipPath id="SVGID_14_">
							<use xlink:href="#SVGID_13_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st7">
							<g>
								<defs>
									<rect id="SVGID_15_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_16_">
									<use xlink:href="#SVGID_15_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="74.2" y="40.6" class="st8" width="147" height="84.8"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_17_" d="M190.1,68.9h14.3V54.7h-14.3V68.9z M205.3,69.8h-16v-16h16V69.8z"/>
						</defs>
						<clipPath id="SVGID_18_">
							<use xlink:href="#SVGID_17_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st9">
							<g>
								<defs>
									<rect id="SVGID_19_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_20_">
									<use xlink:href="#SVGID_19_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="184.5" y="49" class="st10" width="25.5" height="25.5"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_21_" d="M198.2,66l-4.9-4.9c-0.4-0.4-0.4-0.9,0-1.4s0.9-0.4,1.3,0l3.6,3.6l11-11.1c0.4-0.4,0.9-0.4,1.3,0
								c0.4,0.4,0.4,0.9,0,1.3L198.2,66z"/>
						</defs>
						<clipPath id="SVGID_22_">
							<use xlink:href="#SVGID_21_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st11">
							<g>
								<defs>
									<rect id="SVGID_23_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_24_">
									<use xlink:href="#SVGID_23_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="188.3" y="47.2" class="st12" width="27.3" height="23.6"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_25_" d="M190.1,88.7h14.3V74.4h-14.3V88.7z M205.3,89.6h-16v-16h16V89.6z"/>
						</defs>
						<clipPath id="SVGID_26_">
							<use xlink:href="#SVGID_25_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st13">
							<g>
								<defs>
									<rect id="SVGID_27_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_28_">
									<use xlink:href="#SVGID_27_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="184.5" y="68.8" class="st14" width="25.5" height="25.5"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_29_" d="M198.2,86.7l-4.9-4.9c-0.4-0.4-0.4-0.9,0-1.4c0.4-0.5,0.9-0.4,1.3,0l3.6,3.6l11-11.1
								c0.4-0.4,0.9-0.4,1.3,0c0.4,0.4,0.4,0.9,0,1.3L198.2,86.7z"/>
						</defs>
						<clipPath id="SVGID_30_">
							<use xlink:href="#SVGID_29_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st15">
							<g>
								<defs>
									<rect id="SVGID_31_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_32_">
									<use xlink:href="#SVGID_31_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="188.3" y="67.9" class="st16" width="27.3" height="23.6"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_33_" d="M190.1,109.5h14.3V95.2h-14.3V109.5z M205.3,110.3h-16v-16h16V110.3z"/>
						</defs>
						<clipPath id="SVGID_34_">
							<use xlink:href="#SVGID_33_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st17">
							<g>
								<defs>
									<rect id="SVGID_35_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_36_">
									<use xlink:href="#SVGID_35_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="184.5" y="89.6" class="st18" width="25.5" height="25.5"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_37_" d="M198.2,106.5l-4.9-4.9c-0.4-0.4-0.4-0.9,0-1.4c0.4-0.5,0.9-0.4,1.3,0l3.6,3.6l11-11.1
								c0.4-0.4,0.9-0.4,1.3,0c0.4,0.4,0.4,0.9,0,1.4L198.2,106.5z"/>
						</defs>
						<clipPath id="SVGID_38_">
							<use xlink:href="#SVGID_37_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st19">
							<g>
								<defs>
									<rect id="SVGID_39_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_40_">
									<use xlink:href="#SVGID_39_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="188.3" y="87.7" class="st20" width="27.3" height="23.6"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_41_" d="M91.2,57.5h86.7c2.1,0,3.8,1.7,3.8,3.8c0,2.1-1.7,3.8-3.8,3.8H91.2c-2.1,0-3.8-1.7-3.8-3.8
								S89,57.5,91.2,57.5z"/>
						</defs>
						<clipPath id="SVGID_42_">
							<use xlink:href="#SVGID_41_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st21">
							<g>
								<defs>
									<rect id="SVGID_43_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_44_">
									<use xlink:href="#SVGID_43_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="82.7" y="52.8" class="st22" width="103.7" height="17"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_45_" d="M91.2,78.3h86.7c2.1,0,3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8H91.2c-2.1,0-3.8-1.7-3.8-3.8S89,78.3,91.2,78.3z
								"/>
						</defs>
						<clipPath id="SVGID_46_">
							<use xlink:href="#SVGID_45_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st23">
							<g>
								<defs>
									<rect id="SVGID_47_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_48_">
									<use xlink:href="#SVGID_47_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="82.7" y="73.6" class="st24" width="103.7" height="17"/>
							</g>
						</g>
					</g>
				</g>
				<g>
					<g>
						<defs>
							<path id="SVGID_49_" d="M91.2,98.1h86.7c2.1,0,3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8H91.2c-2.1,0-3.8-1.7-3.8-3.8S89,98.1,91.2,98.1z
								"/>
						</defs>
						<clipPath id="SVGID_50_">
							<use xlink:href="#SVGID_49_"  style="overflow:visible;"/>
						</clipPath>
						<g class="st25">
							<g>
								<defs>
									<rect id="SVGID_51_" x="-29.5" y="-57.5" width="351.6" height="427.9"/>
								</defs>
								<clipPath id="SVGID_52_">
									<use xlink:href="#SVGID_51_"  style="overflow:visible;"/>
								</clipPath>
								<rect x="82.7" y="93.3" class="st26" width="103.7" height="17"/>
							</g>
						</g>
					</g>
				</g>
			</svg>
		`;
const se = Object.freeze({
    firstName: "https://api.brightspace.com/rels/first-name"
});
class re extends(b(o(s))) {
    static get properties() {
        return {
            activities: {
                type: Boolean
            },
            complete: {
                type: Boolean
            },
            dataFullPagePath: {
                type: String,
                attribute: "data-full-page-path"
            },
            collapsed: {
                type: Boolean
            },
            useFirstName: {
                type: Boolean,
                attribute: "use-first-name"
            },
            _firstName: {
                type: String,
                observable: n.subEntities,
                rel: se.firstName,
                method: e => e ? .[0] ? .properties.name
            },
            upcomingWeekLimit: {
                type: Number,
                attribute: "upcoming-week-limit"
            }
        }
    }
    static get styles() {
        return [l `
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-empty-template {
					margin-left: auto;
					margin-right: auto;
				}
				.d2l-empty-icon-container {
					display: flex;
					justify-content: center;
					margin: 1.6rem auto 0 auto;
				}
				.d2l-empty-header-text-container,
				.d2l-empty-body-text-container {
					display: block;
					text-align: center;
					width: 100%;
				}
				.d2l-empty-header-text-container {
					margin: 1.2rem auto 0.3rem auto;
				}
				.d2l-empty-body-text-container {
					margin: 0 auto 0.9rem auto;
				}
				.d2l-empty-button-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
				.d2l-empty-icon {
					max-width: 18rem;
					width: 100%;
				}
			`]
    }
    static get localizeConfig() {
        return {
            importFunc: async e => (await
                function(e) {
                    switch (e) {
                        case "./lang/ar.js":
                            return import ("./ar93.js");
                        case "./lang/cy.js":
                            return import ("./cy92.js");
                        case "./lang/da.js":
                            return import ("./da92.js");
                        case "./lang/de.js":
                            return import ("./de93.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb86.js");
                        case "./lang/en.js":
                            return import ("./en94.js");
                        case "./lang/es-es.js":
                            return import ("./es-es92.js");
                        case "./lang/es.js":
                            return import ("./es93.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr92.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on87.js");
                        case "./lang/fr.js":
                            return import ("./fr93.js");
                        case "./lang/haw.js":
                            return import ("./haw86.js");
                        case "./lang/hi.js":
                            return import ("./hi92.js");
                        case "./lang/ja.js":
                            return import ("./ja93.js");
                        case "./lang/ko.js":
                            return import ("./ko93.js");
                        case "./lang/mi.js":
                            return import ("./mi87.js");
                        case "./lang/nl.js":
                            return import ("./nl93.js");
                        case "./lang/pt.js":
                            return import ("./pt93.js");
                        case "./lang/sv.js":
                            return import ("./sv93.js");
                        case "./lang/th.js":
                            return import ("./th82.js");
                        case "./lang/tr.js":
                            return import ("./tr93.js");
                        case "./lang/vi.js":
                            return import ("./vi82.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn88.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw93.js");
                        default:
                            return new Promise(function(t, i) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)))
                            })
                    }
                }(`./lang/${e}.js`)).default,
            osloCollection: "@brightspace-hmc\\foundation-components\\WorkToDo"
        }
    }
    render() {
        return r `
		<div class="d2l-empty-template">
			<div class="d2l-empty-icon-container d2l-empty-icon">${ie}</div>
			${this._renderEmptyViewHeader()}
			${this._renderEmptyViewText()}
			${this._renderEmptyViewButton()}
		</div>`
    }
    _getEmptyViewText() {
        return this.useFirstName && this._firstName ? this.localize(this._getEmptyViewTextLabel(), "firstName", this._firstName) : this.localize(this._getEmptyViewTextLabel())
    }
    _getEmptyViewTextLabel() {
        let e = "noActivitiesNoFutureActivities";
        return this.activities && this.collapsed ? e = "noActivitiesFutureActivities" : this.collapsed || (e = "noActivities"), this.useFirstName && (this._firstName ? e += "Name" : e += "Nameless"), e
    }
    _navigateToFullPage() {
        this.dataFullPagePath && (window.location.href = this.dataFullPagePath)
    }
    _renderEmptyViewButton() {
        if (this.collapsed && this.activities && this.dataFullPagePath) return r `
			<div class="d2l-empty-button-container">
				<d2l-button
					primary
					@click=${this._navigateToFullPage}>
					${this.localize("viewAllWork")}
				</d2l-button>
			</div>
		`
    }
    _renderEmptyViewHeader() {
        const e = this.activities ? this.localize("xWeeksClear", "count", this.upcomingWeekLimit) : this.localize("allClear");
        return r `
				<div class="d2l-heading-3 d2l-empty-header-text-container">${e}</div>
			`
    }
    _renderEmptyViewText() {
        return r `
			<div class="d2l-body-standard d2l-empty-body-text-container">
				${this._getEmptyViewText()}
			</div>
			`
    }
}
customElements.define("d2l-w2d-no-activities", re);
class ae extends p {
    static definedProperty({
        name: e,
        token: t,
        verbose: i,
        start: s,
        page: r,
        pageSize: a,
        end: l
    }) {
        return {
            id: e,
            token: t,
            verbose: i,
            start: s,
            end: l,
            page: r,
            pageSize: a
        }
    }
    get method() {
        return "GET"
    }
    async addObserver(e, t, {
        method: i,
        route: s,
        start: r,
        page: a,
        pageSize: l,
        end: o
    } = {}) {
        const n = {};
        this._telemetryPage = a.replace(/^_page/, "").toLowerCase(), r && (n.start = this._currentTimeUTC()), o && e[o] && (n.end = e[o]), l && e[l] && (n.pageSize = e[l]), a && e[a] && (n.page = e[a]), (n.start || n.end || n.pageSize || n.page) && (n.embed = !1, this.setQueryParams(n)), super.addObserver(e, t, {
            method: i,
            route: s
        }), this._setPage(e[a]), this._setStartDate(e[r]), this._setEndDate(e[o])
    }
    async onServerResponse(e, t) {
        const i = await super.onServerResponse(e, t);
        return await this.routedState.setSirenEntity(i), i
    }
    async setSirenEntity(e) {
        e && e.hasActionByName(this._name) ? (this._rawSirenAction = e.getActionByName(this._name), this._href = this._rawSirenAction.href, this._fields = this._decodeFields(this._rawSirenAction), this._method = this._rawSirenAction.method, await this._fetchRoutedState()) : this.action = {
            has: !1
        }
    }
    _currentTimeUTC() {
        return (new Date).toISOString()
    }
    async _fetchRoutedState() {
        if (this._routes.size > 0 && this._href && this._token) {
            this.routedState = await this.createRoutedState(this.href, this._token.rawToken), this._routes.forEach((e, t) => {
                this.routedState.addObservables(t, e)
            });
            const e = d(this.routedState);
            F.markFetchStart(this._telemetryPage), F.markFetchEnd(this._telemetryPage, (await e).properties.pagingTotalResults)
        }
    }
    async _setEndDate(e) {
        e && this._endDate !== e && (this._endDate = e, this._startDate && await this._fetchRoutedState())
    }
    async _setPage(e) {
        e && this._page !== e && (this._page = e, await this._fetchRoutedState())
    }
    async _setStartDate(e) {
        e && this._startDate !== e && (this._startDate = e, this._endDate && await this._fetchRoutedState())
    }
}
const le = Object.freeze({
        myActivities: "https://activities.api.brightspace.com/rels/my-activities",
        userActivity: "https://activities.api.brightspace.com/rels/user-activity-usage",
        overdue: "https://activities.api.brightspace.com/rels/overdue"
    }),
    oe = Object.freeze({
        collapsed: 6,
        fullScreen: 20
    });
class ne extends(b(o(s))) {
    static get properties() {
        return {
            currentTime: {
                type: String,
                attribute: "current-time"
            },
            collapsed: {
                type: Boolean
            },
            groupByDays: {
                type: Number,
                attribute: "group-by-days"
            },
            useFirstName: {
                type: Boolean,
                attribute: "use-first-name"
            },
            overdueGroupByDays: {
                type: Number,
                attribute: "overdue-group-by-days"
            },
            startDate: {
                type: String,
                attribute: "start-date"
            },
            endDate: {
                type: String,
                attribute: "end-date"
            },
            dataFullPagePath: {
                type: String,
                attribute: "data-full-page-path"
            },
            upcomingWeekLimit: {
                type: String,
                attribute: "upcoming-week-limit"
            },
            skeleton: {
                type: Boolean,
                reflect: !0
            },
            userUrl: {
                type: String,
                attribute: "user-url"
            },
            allowUnclickableActivities: {
                type: Boolean,
                attribute: "allow-unclickable-activities"
            },
            clickableFutureActivities: {
                type: Boolean,
                attribute: "clickable-future-activities"
            },
            _categories: {
                type: Array,
                observable: n.custom,
                observableObject: X,
                groupByDays: "groupByDays",
                startDate: "currentTime",
                rel: le.userActivity,
                method: e => Object.values(e),
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-work-to-do",
                    start: "startDate",
                    end: "endDate",
                    pageSize: "_pageSize",
                    page: "_pageUpcoming"
                }]
            },
            _overdue: {
                type: Array,
                observable: n.custom,
                observableObject: X,
                groupByDays: "overdueGroupByDays",
                startDate: "currentTime",
                rel: le.userActivity,
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-overdue-activities",
                    pageSize: "_pageSize",
                    page: "_pageOverdue"
                }],
                method: e => Object.keys(e).sort((e, t) => e - t).map(t => e[t])
            },
            _totalActivities: {
                type: Number,
                name: "totalActivities",
                observable: n.property,
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-work-to-do",
                    start: "startDate",
                    end: "endDate",
                    pageSize: "_pageSize",
                    page: "_pageUpcoming"
                }]
            },
            _pageSize: {
                type: Number
            },
            _page: {
                type: Number
            },
            _currentPageUpcoming: {
                type: Number,
                name: "currentPage",
                observable: n.property,
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-work-to-do",
                    start: "startDate",
                    end: "endDate",
                    pageSize: "_pageSize",
                    page: "_pageUpcoming"
                }]
            },
            _pagingTotalResultsUpcoming: {
                type: Number,
                name: "pagingTotalResults",
                observable: n.property,
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-work-to-do",
                    start: "startDate",
                    end: "endDate",
                    pageSize: "_pageSize",
                    page: "_pageUpcoming"
                }]
            },
            _currentPageOverdue: {
                type: Number,
                name: "currentPage",
                observable: n.property,
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-overdue-activities",
                    pageSize: "_pageSize",
                    page: "_pageOverdue"
                }]
            },
            _pagingTotalResultsOverdue: {
                type: Number,
                name: "pagingTotalResults",
                observable: n.property,
                route: [{
                    observable: n.custom,
                    observableObject: ae,
                    name: "filter-overdue-activities",
                    pageSize: "_pageSize",
                    page: "_pageOverdue"
                }]
            }
        }
    }
    static get styles() {
        return [w, k, S, g, l `
			.d2l-w2d-heading-3 {
				margin: 0;
			}
			.d2l-w2d-flex {
				align-items: center;
				border-bottom: 2px solid var(--d2l-color-mica);
				display: flex;
				justify-content: space-between;
				padding: 0 0 0.35rem 0;
			}
			:host(:not([collapsed])) .d2l-w2d-flex {
				border-bottom: 0;
			}
			.d2l-w2d-count {
				background-color: var(--d2l-color-carnelian-minus-1);
				border: 2px solid var(--d2l-color-carnelian-minus-1);
				box-shadow: 0 0 0 1px white;
				box-sizing: content-box;
				color: white;
				display: inline-block;
				font-weight: 400;
				line-height: 100%;
				position: relative;
				text-align: center;
			}
			.d2l-w2d-heading-3-count {
				border-radius: 0.75rem;
				font-size: 0.7rem;
				min-width: 0.7rem;
				padding: 2px;
			}
			.d2l-w2d-heading-2-count {
				border-radius: 1.05rem;
				font-size: 1.05rem;
				min-width: 1.05rem;
				padding: 5px;
			}
			d2l-w2d-list {
				display: block;
				margin-bottom: 1.2rem;
			}
			.d2l-skeletize {
				max-width: 40%;
			}
			.d2l-w2d-collection-fixed {
				position: absolute;
				height: 100%;
				width: 100%;
				background: white;
				z-index: 500;
			}
			.d2l-w2d-collection-overflow {
				overflow: hidden;
				width: 1rem;
				height: 10rem;
			}
		`]
    }
    constructor() {
        super(), this._categories = [], this._overdue = [], this.collapsed = !1, this._totalActivities = 0, this.__currentPageOverdue = 1, this._pagingTotalResultsUpcoming = 0, this._pagingTotalResultsOverdue = 0, this._page = 1, this.requiredPropertyForState("currentTime"), this.requiredPropertyForState("groupByDays"), this.requiredPropertyForState("overdueGroupByDays"), this.requiredPropertyForState("endDate"), this.requiredPropertyForState("startDate"), this.requiredPropertyForState("collapsed"), this.requiredPropertyForState("_page"), this.requiredPropertyForState("_pageSize")
    }
    get collapsed() {
        return this._collapsed
    }
    set collapsed(e) {
        this._pageSize = oe[e ? "collapsed" : "fullScreen"];
        const t = this.collapsed;
        this._collapsed = e, this.requestUpdate("collapsed", t)
    }
    static get localizeConfig() {
        return {
            importFunc: async e => (await
                function(e) {
                    switch (e) {
                        case "./lang/ar.js":
                            return import ("./ar93.js");
                        case "./lang/cy.js":
                            return import ("./cy92.js");
                        case "./lang/da.js":
                            return import ("./da92.js");
                        case "./lang/de.js":
                            return import ("./de93.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb86.js");
                        case "./lang/en.js":
                            return import ("./en94.js");
                        case "./lang/es-es.js":
                            return import ("./es-es92.js");
                        case "./lang/es.js":
                            return import ("./es93.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr92.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on87.js");
                        case "./lang/fr.js":
                            return import ("./fr93.js");
                        case "./lang/haw.js":
                            return import ("./haw86.js");
                        case "./lang/hi.js":
                            return import ("./hi92.js");
                        case "./lang/ja.js":
                            return import ("./ja93.js");
                        case "./lang/ko.js":
                            return import ("./ko93.js");
                        case "./lang/mi.js":
                            return import ("./mi87.js");
                        case "./lang/nl.js":
                            return import ("./nl93.js");
                        case "./lang/pt.js":
                            return import ("./pt93.js");
                        case "./lang/sv.js":
                            return import ("./sv93.js");
                        case "./lang/th.js":
                            return import ("./th82.js");
                        case "./lang/tr.js":
                            return import ("./tr93.js");
                        case "./lang/vi.js":
                            return import ("./vi82.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn88.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw93.js");
                        default:
                            return new Promise(function(t, i) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)))
                            })
                    }
                }(`./lang/${e}.js`)).default,
            osloCollection: "@brightspace-hmc\\foundation-components\\WorkToDo"
        }
    }
    render() {
        let e = this._pageSize,
            t = null;
        this._isOverdueWithinLastPage() && !this._isOverdueOnLastPage() || (t = this._overdue.map(t => {
            let i = this.localize("overdue");
            if (this.collapsed || (i = this._renderDate(t.startDate, t.endDate, this.collapsed)), 0 === e) return;
            const s = r `
					${this._renderHeader3(i,this._pagingTotalResultsOverdue)}
					<d2l-w2d-list
						href="${t.href}"
						.token="${this.token}"
						category="${t.index}"
						?collapsed="${this.collapsed}"
						limit="${y(e)}"
						?allow-unclickable-activities="${this.allowUnclickableActivities}"
						?clickable-future-activities="${this.clickableFutureActivities}">
					</d2l-w2d-list>
				`;
            return e = void 0 === e ? e : Math.max(e - t.count, 0), s
        })), !this.collapsed && this._isOverdueOnLastPage() && (e = this._lastOverduePageHasMoreThanHalf() ? 0 : this._pageSize);
        let i = null;
        e > 0 && (i = this._categories.map(t => {
            if (t.index < 0) return;
            const i = this._renderDate(t.startDate, t.endDate, this.collapsed);
            if (0 === e) return;
            const s = r `
					${this._renderHeader3(i,this._pagingTotalResultsUpcoming)}
					<d2l-w2d-list
						href="${t.href}"
						.token="${this.token}"
						category="${t.index}"
						?collapsed="${this.collapsed}"
						limit="${y(e)}"
						?allow-unclickable-activities="${this.allowUnclickableActivities}"
						?clickable-future-activities="${this.clickableFutureActivities}">
					</d2l-w2d-list>
				`;
            return e = void 0 === e ? e : Math.max(e - t.count, 0), s
        })), i && (i = i.filter(e => void 0 !== e));
        const s = r `
			<div class="${v({"d2l-w2d-collection-overflow":this.skeleton})}">
				${t&&0!==t.length?this._renderHeader2(this.localize("overdue"),this._pagingTotalResultsOverdue):null}
				${t}
				${i&&i.length>0?this._renderHeader2(this.localize("upcoming"),this._pagingTotalResultsUpcoming):null}
				${i}
				${this.dataFullPagePath&&this._loaded&&this.collapsed&&this._pagingTotalResultsOverdue+this._pagingTotalResultsUpcoming>oe.collapsed?r`<d2l-link href="${this.dataFullPagePath}" @click="${this._handleViewAllClick}">${this.localize("fullViewLink")}</d2l-link>`:null}
				${this._renderPager()}
			</div>
		`,
            a = r `
				<d2l-w2d-no-activities
					class="${v({"d2l-w2d-collection-overflow":this.skeleton})}"
					?activities="${0!==this._totalActivities}"
					?collapsed="${this.collapsed}"
					?complete="${!this.collapsed}"
					?use-first-name="${this.useFirstName}"
					data-full-page-path="${y(this.dataFullPagePath)}"
					upcoming-week-limit="${this.upcomingWeekLimit}"
					.token="${this.token}"
					href=${this.userUrl}></d2l-w2d-no-activities>
			`;
        return r `
			${this._renderSkeleton()}
			${t&&t.length||i&&i.length?s:a}
		`
    }
    get _currentPageOverdue() {
        return this.__currentPageOverdue
    }
    set _currentPageOverdue(e) {
        if ("number" != typeof e) return;
        const t = this.__currentPageOverdue;
        this.__currentPageOverdue = e, this.requestUpdate("_currentPageOverdue", t)
    }
    get _loaded() {
        return !this.skeleton
    }
    set _loaded(e) {
        this.skeleton = !e, e && this._paged && F.markAndLogLoadMore()
    }
    get _page() {
        return this.__page
    }
    set _page(e) {
        const t = this._page;
        this._paged = Boolean(this._page), this.__page = e, this.requestUpdate("_page", t)
    }
    get _pageSize() {
        return this.__pageSize
    }
    set _pageSize(e) {
        const t = this._pageSize;
        this.__pageSize = e, this.requestUpdate("_pageSize", t)
    }
    get _pagingTotalResultsOverdue() {
        return this.__pagingTotalResultsOverdue
    }
    set _pagingTotalResultsOverdue(e) {
        const t = this.__pagingTotalResultsOverdue;
        this.__pagingTotalResultsOverdue = e, this.requestUpdate("_pagingTotalResultsOverdue", t)
    }
    get _pageOverdue() {
        return this.__pageSize > 0 && "number" == typeof this.__page && this.__pagingTotalResultsOverdue ? Math.min(this._page, Math.ceil(this.__pagingTotalResultsOverdue / this.__pageSize)) : 1
    }
    get _pageUpcoming() {
        if (this._pagingTotalResultsOverdue && !this._isOverdueWithinLastPage()) return 1;
        let e = "number" == typeof this.__page ? Math.max(1, this.__page - this._pageOverdue) : 1;
        return this.collapsed || this._lastOverduePageHasMoreThanHalf() || 1 === this.__page || e++, e
    }
    async _handleViewAllClick(e) {
        const t = e.target.href;
        e.preventDefault(), await F.logViewAllClicked(t), window.location.href = t
    }
    _isOverdueOnLastPage() {
        return this._pagingTotalResultsOverdue > 0 && this._pageSize > 0 && this._page > 0 && Math.ceil(this._pagingTotalResultsOverdue / this._pageSize) === this._page
    }
    _isOverdueWithinLastPage() {
        return this._pagingTotalResultsOverdue > 0 && this._pageSize > 0 && this._page > 0 && Math.ceil(this._pagingTotalResultsOverdue / this._pageSize) < this._page
    }
    _lastOverduePageHasMoreThanHalf() {
        return this._pagingTotalResultsOverdue > 0 && this._pageSize > 0 && (this._pagingTotalResultsOverdue === this._pageSize || this._pagingTotalResultsOverdue % this._pageSize > this._pageSize / 2 || this._pagingTotalResultsOverdue % this._pageSize === 0 && this.__pagingTotalResultsOverdue > 0)
    }
    async _onPageChange(e) {
        this._loaded = !1, await this.updateComplete, h(), this._page = e.detail.page
    }
    _renderDate(e, t, i) {
        const s = [e];
        return t.getTime() !== e.getTime() && s.push(t), s.map(e => {
            let t = _(e, {
                format: "monthDay"
            });
            return i || (t = this.localize("dateHeader", "dayOfWeek", _(e, {
                format: "longDayOfWeek"
            }), "month", _(e, {
                format: "longMonth"
            }), "dayOfMonth", e.getDate())), t
        }).join(" - ")
    }
    _renderHeader2(e, t) {
        if (this.collapsed) return;
        const i = this.localize("xActivities", "count", t);
        return r `
			<div class="d2l-w2d-flex">
				<h2 class="d2l-heading-2">${e}</h2>
				<div class="d2l-w2d-count d2l-w2d-heading-2-count" aria-hidden="true">${t}</div>
				<d2l-offscreen>${i}</d2l-offscreen>
			</div>
		`
    }
    _renderHeader3(e, t) {
        if (!this.collapsed) return r `<div class="d2l-w2d-flex"><h3 class="d2l-w2d-heading-3">${e}</h3></div>`;
        const i = this.localize("xActivities", "count", t);
        return r `
			<div class="d2l-w2d-flex">
				<h3 class="d2l-w2d-heading-3 d2l-heading-3">${e}</h3>
				<div class="d2l-w2d-count d2l-w2d-heading-3-count" aria-hidden="true">${t}</div>
				<d2l-offscreen>${i}</d2l-offscreen>
			</div>
		`
    }
    _renderPager() {
        let e = Math.ceil(this._pagingTotalResultsUpcoming / this._pageSize) + Math.ceil(this._pagingTotalResultsOverdue / this._pageSize);
        return this._pagingTotalResultsOverdue && this._pagingTotalResultsUpcoming && !this._lastOverduePageHasMoreThanHalf() && (e -= 1), e < 1 && (e = 1), this.skeleton || this.collapsed ? null : r `
			<d2l-labs-pager-numeric
				page-number="${this._page}"
				max-page-number="${e}"
				@d2l-labs-pager-numeric-page-change="${this._onPageChange}"></d2l-labs-pager-numeric>
		`
    }
    _renderSkeleton() {
        return this.skeleton ? r `
			<div class="d2l-w2d-collection-fixed">
				${this.collapsed?null:r`<h2 class="d2l-skeletize d2l-heading-2">${this.localize("overdue")}</h2>`}
				<h3 class="d2l-skeletize d2l-w2d-heading-3 d2l-heading-3">May 14 - May 23</h3>
				<d2l-w2d-list skeleton ?collapsed="${this.collapsed}"></d2l-w2d-list>
			</div>
		` : null
    }
}
customElements.define("d2l-w2d-collections", ne);
const ce = Object.freeze({
    myActivitiesActiveOnly: "https://activities.api.brightspace.com/rels/my-activities#activecoursesonly",
    myOrganizationActivities: "https://activities.api.brightspace.com/rels/my-organization-activities#empty",
    organization: "https://api.brightspace.com/rels/organization",
    organizationHomepage: "https://api.brightspace.com/rels/organization-homepage",
    userActivity: "https://activities.api.brightspace.com/rels/user-activity-usage",
    overdue: "https://activities.api.brightspace.com/rels/overdue",
    root: "https://api.brightspace.com/rels/root"
});
class pe extends(b(o(s))) {
    static get properties() {
        return {
            currentTime: {
                type: String,
                attribute: "current-time"
            },
            collapsed: {
                type: Boolean
            },
            dataFullPagePath: {
                type: String,
                attribute: "data-full-page-path"
            },
            groupByDays: {
                type: Number,
                attribute: "group-by-days"
            },
            useFirstName: {
                type: Boolean,
                attribute: "use-first-name"
            },
            startDate: {
                type: String,
                attribute: "start-date"
            },
            endDate: {
                type: String,
                attribute: "end-date"
            },
            overdueWeekLimit: {
                type: Number,
                attribute: "data-overdue-week-limit"
            },
            upcomingWeekLimit: {
                type: String,
                attribute: "data-upcoming-week-limit"
            },
            allowUnclickableActivities: {
                type: Boolean,
                attribute: "allow-unclickable-activities"
            },
            clickableFutureActivities: {
                type: Boolean,
                attribute: "clickable-future-activities"
            },
            _myActivitiesHref: {
                type: String,
                observable: n.link,
                rel: ce.myActivitiesActiveOnly,
                prime: !0
            },
            _myOrganizationActivitiesHref: {
                type: String,
                observable: n.link,
                rel: ce.myOrganizationActivities,
                prime: !0
            },
            _organizationHompage: {
                type: String,
                observable: n.link,
                rel: ce.organizationHomepage
            },
            _rootHomepage: {
                type: String,
                observable: n.link,
                rel: ce.organizationHomepage,
                route: [{
                    observable: n.link,
                    rel: ce.root
                }, {
                    observable: n.link,
                    rel: ce.organization
                }]
            }
        }
    }
    static get styles() {
        return [w, D, l `
			:host {
				display: block;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			:host(:not([collapsed])) {
				margin: auto;
				max-width: 1230px;
				padding: 0 52px;
			}
			.d2l-w2d-flex {
				align-items: center;
				border-bottom: 2px solid var(--d2l-color-mica);
				display: flex;
				justify-content: space-between;
				padding: 0 0 0.35rem 0;
			}
			.d2l-w2d-heading-1 {
				margin: 1.75rem 0 0 0;
			}
		`]
    }
    constructor() {
        super(), this.collapsed = !1
    }
    get collapsed() {
        return this._collapsed
    }
    set collapsed(e) {
        const t = this._collapsed;
        this._collapsed = e, this._overdueGroupByDays = e ? 0 : 1, this.requestUpdate("collapsed", t), e && sessionStorage.setItem("d2l.workToDo.prevPage", window.location.href)
    }
    static get localizeConfig() {
        return {
            importFunc: async e => (await
                function(e) {
                    switch (e) {
                        case "./lang/ar.js":
                            return import ("./ar93.js");
                        case "./lang/cy.js":
                            return import ("./cy92.js");
                        case "./lang/da.js":
                            return import ("./da92.js");
                        case "./lang/de.js":
                            return import ("./de93.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb86.js");
                        case "./lang/en.js":
                            return import ("./en94.js");
                        case "./lang/es-es.js":
                            return import ("./es-es92.js");
                        case "./lang/es.js":
                            return import ("./es93.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr92.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on87.js");
                        case "./lang/fr.js":
                            return import ("./fr93.js");
                        case "./lang/haw.js":
                            return import ("./haw86.js");
                        case "./lang/hi.js":
                            return import ("./hi92.js");
                        case "./lang/ja.js":
                            return import ("./ja93.js");
                        case "./lang/ko.js":
                            return import ("./ko93.js");
                        case "./lang/mi.js":
                            return import ("./mi87.js");
                        case "./lang/nl.js":
                            return import ("./nl93.js");
                        case "./lang/pt.js":
                            return import ("./pt93.js");
                        case "./lang/sv.js":
                            return import ("./sv93.js");
                        case "./lang/th.js":
                            return import ("./th82.js");
                        case "./lang/tr.js":
                            return import ("./tr93.js");
                        case "./lang/vi.js":
                            return import ("./vi82.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn88.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw93.js");
                        default:
                            return new Promise(function(t, i) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(i.bind(null, new Error("Unknown variable dynamic import: " + e)))
                            })
                    }
                }(`./lang/${e}.js`)).default,
            osloCollection: "@brightspace-hmc\\foundation-components\\WorkToDo"
        }
    }
    render() {
        this._loaded && F.markAndLogWidgetLoaded(!this.collapsed);
        const e = this.collapsed ? null : r `
				<d2l-labs-navigation-immersive back-link-href="${this._getHomeHref()}" back-link-text="${this.localize("backToD2L")}" width-type="normal"></d2l-labs-navigation-immersive>
			`,
            t = this.collapsed ? null : r `
				<h1 class="d2l-w2d-heading-1 d2l-heading-1">
					${this.localize("workToDo")}
				</h1>
			`;
        return r `
			${e}
			${t}
			<d2l-w2d-collections
				href="${this._myActivitiesHref?this._myActivitiesHref:this._myOrganizationActivitiesHref}"
				.token="${this.token}"
				?collapsed="${this.collapsed}"
				group-by-days="${this.groupByDays}"
				overdue-group-by-days="${y(this._overdueGroupByDays)}"
				current-time="${this.currentTime}"
				start-date="${this.startDate}"
				end-date="${this.endDate}"
				data-full-page-path=${y(this.dataFullPagePath)}
				?use-first-name=${this.useFirstName}
				overdue-day-limit="${7*this.overdueWeekLimit}"
				upcoming-week-limit="${this.upcomingWeekLimit}"
				?skeleton="${!this._loaded}"
				user-url="${this.href}"
				?allow-unclickable-activities="${this.allowUnclickableActivities}"
				?clickable-future-activities="${this.clickableFutureActivities}"></d2l-w2d-collections>
		`
    }
    _getHomeHref() {
        if (!this.collapsed) {
            const e = sessionStorage.getItem("d2l.workToDo.prevPage");
            if (e && new URL(e).hostname === window.location.hostname) return e
        }
        return this._organizationHompage ? this._organizationHompage : this._rootHomepage
    }
}
customElements.define("d2l-w2d-work-to-do", pe);