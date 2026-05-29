import "./d2l-activity-name-specialization.js";
import {
    a as e,
    b as t
} from "./lit-element.js";
import {
    H as i,
    o as r
} from "./HypermediaStateMixin.js";
import {
    c as s
} from "./hypermedia-components.js";
import {
    a as n
} from "./labelled-mixin.js";
const a = Object.freeze({
    assignment: "https://api.brightspace.com/rels/assignment"
});
class c extends(n(i(e))) {
    static get properties() {
        return {
            _assignmentHref: {
                type: String,
                observable: r.link,
                rel: a.assignment,
                prime: !0
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name href="${this._assignmentHref}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
s("d2l-activity-name-assignment", c, "d2l-activity-name", [
    ["user-assignment-activity"]
]);
const o = Object.freeze({
    checklist: "https://checklists.api.brightspace.com/rels/checklist-item"
});
class l extends(n(i(e))) {
    static get properties() {
        return {
            _checklistHref: {
                type: String,
                observable: r.link,
                rel: o.checklist,
                prime: !0
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name href="${this._checklistHref}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
s("d2l-activity-name-checklist", l, "d2l-activity-name", [
    ["user-checklist-activity"]
]);
const m = Object.freeze({
    content: "https://api.brightspace.com/rels/content"
});
class p extends(n(i(e))) {
    static get properties() {
        return {
            _title: {
                type: String,
                observable: r.property,
                route: [{
                    observable: r.link,
                    rel: m.content
                }]
            },
            _contentHref: {
                type: String,
                observable: r.link,
                rel: m.content,
                prime: !0
            }
        }
    }
    render() {
        return t `
			${this._loaded&&this._title?t`${this._title}`:t`<d2l-hc-name href="${this._contentHref}" .token="${this.token}"></d2l-hc-name>`}
		`
    }
}
s("d2l-activity-name-content", p, "d2l-activity-name", [
    ["user-content-activity"]
]);
const h = Object.freeze({
    organization: "https://api.brightspace.com/rels/organization"
});
class d extends(n(i(e))) {
    static get properties() {
        return {
            _organizationHref: {
                type: String,
                observable: r.link,
                rel: h.organization,
                prime: !0
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name href="${this._organizationHref}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
s("d2l-activity-name-course", d, "d2l-activity-name", [
    ["activity-usage", "course-offering"],
    ["user-course-offering-activity-usage"],
    ["user-activity-usage"]
]);
const u = Object.freeze({
    topic: "https://discussions.api.brightspace.com/rels/topic"
});
class y extends(n(i(e))) {
    static get properties() {
        return {
            _topicHref: {
                type: String,
                observable: r.link,
                rel: u.topic,
                prime: !0
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name href="${this._topicHref}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
s("d2l-activity-name-discussion", y, "d2l-activity-name", [
    ["user-discussion-activity"]
]);
const v = Object.freeze({
    quiz: "https://api.brightspace.com/rels/quiz"
});
class g extends(n(i(e))) {
    static get properties() {
        return {
            _quizHref: {
                type: String,
                observable: r.link,
                rel: v.quiz,
                prime: !0
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name href="${this._quizHref}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
s("d2l-activity-name-quiz", g, "d2l-activity-name", [
    ["user-quiz-activity"],
    ["user-quiz-attempt-activity"]
]);
const f = Object.freeze({
    survey: "https://surveys.api.brightspace.com/rels/survey"
});
class b extends(n(i(e))) {
    static get properties() {
        return {
            _surveyHref: {
                type: String,
                observable: r.link,
                rel: f.survey,
                prime: !0
            }
        }
    }
    render() {
        return t `
			<d2l-hc-name href="${this._surveyHref}" .token="${this.token}"></d2l-hc-name>
		`
    }
}
s("d2l-activity-name-survey", b, "d2l-activity-name", [
    ["user-survey-activity"]
]);
s("d2l-activity-name", class extends e {
    render() {
        return t `<d2l-hc-name></d2l-hc-name>`
    }
});