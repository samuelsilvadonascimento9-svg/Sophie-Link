import "./colors.js";
import {
    E as r,
    a as e,
    i as t,
    b as i
} from "./lit-element.js";
import {
    i as s,
    f as o
} from "./icon-styles.js";
import {
    e as a,
    i as n
} from "./directive.js";
import {
    a as c
} from "./unsafe-svg.js";
import {
    f as m,
    n as l
} from "./async-directive.js";
import "./svg-to-css.js";
const u = {},
    p = a(class extends n {
        constructor() {
            super(...arguments), this.ot = u
        }
        render(r, e) {
            return e()
        }
        update(e, [t, i]) {
            if (Array.isArray(t)) {
                if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((r, e) => r === this.ot[e])) return r
            } else if (this.ot === t) return r;
            return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i)
        }
    });
class j {
    constructor(r) {
        this.G = r
    }
    disconnect() {
        this.G = void 0
    }
    reconnect(r) {
        this.G = r
    }
    deref() {
        return this.G
    }
}
class d {
    constructor() {
        this.Y = void 0, this.Z = void 0
    }
    get() {
        return this.Y
    }
    pause() {
        this.Y ? ? (this.Y = new Promise(r => this.Z = r))
    }
    resume() {
        this.Z ? .(), this.Y = this.Z = void 0
    }
}
const h = r => !l(r) && "function" == typeof r.then,
    g = 1073741823;
const b = a(class extends m {
    constructor() {
        super(...arguments), this._$Cwt = g, this._$Cbt = [], this._$CK = new j(this), this._$CX = new d
    }
    render(...e) {
        return e.find(r => !h(r)) ? ? r
    }
    update(e, t) {
        const i = this._$Cbt;
        let s = i.length;
        this._$Cbt = t;
        const o = this._$CK,
            a = this._$CX;
        this.isConnected || this.disconnected();
        for (let r = 0; r < t.length && !(r > this._$Cwt); r++) {
            const e = t[r];
            if (!h(e)) return this._$Cwt = r, e;
            r < s && e === i[r] || (this._$Cwt = g, s = 0, Promise.resolve(e).then(async r => {
                for (; a.get();) await a.get();
                const t = o.deref();
                if (void 0 !== t) {
                    const i = t._$Cbt.indexOf(e);
                    i > -1 && i < t._$Cwt && (t._$Cwt = i, t.setValue(r))
                }
            }))
        }
        return r
    }
    disconnected() {
        this._$CK.disconnect(), this._$CX.pause()
    }
    reconnected() {
        this._$CK.reconnect(this), this._$CX.resume()
    }
});
customElements.define("d2l-icon", class extends e {
    static get properties() {
        return {
            icon: {
                type: String,
                reflect: !0
            }
        }
    }
    static get styles() {
        return [s, t `
			:host([icon*="tier1:"]) {
				height: var(--d2l-icon-height, 18px);
				width: var(--d2l-icon-width, 18px);
			}
			:host([icon*="tier2:"]) {
				height: var(--d2l-icon-height, 24px);
				width: var(--d2l-icon-width, 24px);
			}
			:host([icon*="tier3:"]) {
				height: var(--d2l-icon-height, 30px);
				width: var(--d2l-icon-width, 30px);
			}
		`]
    }
    render() {
        return p([this.icon], () => b(this._getIcon(), r))
    }
    _fixSvg(r) {
        if (void 0 === r) return;
        const e = document.createElement("template");
        e.innerHTML = r;
        const t = e.content.firstChild;
        return o(t), i `${c(e.innerHTML)}`
    }
    async _getIcon() {
        if (this.icon) {
            let r = this.icon;
            "d2l-" === r.substring(0, 4) && (r = r.substring(4));
            const e = await
            function(r) {
                switch (r) {
                    case "emoji:angry":
                        return import ("./angry.js");
                    case "emoji:happy":
                        return import ("./happy.js");
                    case "emoji:lol":
                        return import ("./lol.js");
                    case "emoji:meh":
                        return import ("./meh.js");
                    case "emoji:sad":
                        return import ("./sad.js");
                    case "emoji:shout":
                        return import ("./shout.js");
                    case "html-editor:accessibility-check":
                        return import ("./accessibility-check.js");
                    case "html-editor:align-center":
                        return import ("./align-center.js");
                    case "html-editor:align-full":
                        return import ("./align-full.js");
                    case "html-editor:align-left":
                        return import ("./align-left.js");
                    case "html-editor:align-right":
                        return import ("./align-right.js");
                    case "html-editor:bold":
                        return import ("./bold.js");
                    case "html-editor:cut":
                        return import ("./cut.js");
                    case "html-editor:direction-ltr":
                        return import ("./direction-ltr.js");
                    case "html-editor:direction-rtl":
                        return import ("./direction-rtl.js");
                    case "html-editor:equation-graphical-chemistry":
                        return import ("./equation-graphical-chemistry.js");
                    case "html-editor:equation-graphical":
                        return import ("./equation-graphical.js");
                    case "html-editor:equation-latex":
                        return import ("./equation-latex.js");
                    case "html-editor:equation-mathml":
                        return import ("./equation-mathml.js");
                    case "html-editor:h5p":
                        return import ("./h5p.js");
                    case "html-editor:image":
                        return import ("./image.js");
                    case "html-editor:indent-decrease":
                        return import ("./indent-decrease.js");
                    case "html-editor:indent-increase":
                        return import ("./indent-increase.js");
                    case "html-editor:insert-attributes":
                        return import ("./insert-attributes.js");
                    case "html-editor:insert-emoticon":
                        return import ("./insert-emoticon.js");
                    case "html-editor:italic":
                        return import ("./italic.js");
                    case "html-editor:link":
                        return import ("./link2.js");
                    case "html-editor:list-bullet":
                        return import ("./list-bullet.js");
                    case "html-editor:list-ordered":
                        return import ("./list-ordered.js");
                    case "html-editor:media":
                        return import ("./media.js");
                    case "html-editor:new-line":
                        return import ("./new-line.js");
                    case "html-editor:paste":
                        return import ("./paste.js");
                    case "html-editor:source-editor":
                        return import ("./source-editor.js");
                    case "html-editor:spellcheck":
                        return import ("./spellcheck.js");
                    case "html-editor:strikethrough":
                        return import ("./strikethrough.js");
                    case "html-editor:subscript":
                        return import ("./subscript.js");
                    case "html-editor:superscript":
                        return import ("./superscript.js");
                    case "html-editor:symbol":
                        return import ("./symbol.js");
                    case "html-editor:table-cell-merge":
                        return import ("./table-cell-merge.js");
                    case "html-editor:table-cell-properties":
                        return import ("./table-cell-properties.js");
                    case "html-editor:table-cell-split":
                        return import ("./table-cell-split.js");
                    case "html-editor:table-column-insert-after":
                        return import ("./table-column-insert-after.js");
                    case "html-editor:table-column-insert-before":
                        return import ("./table-column-insert-before.js");
                    case "html-editor:table-column-remove":
                        return import ("./table-column-remove.js");
                    case "html-editor:table-delete":
                        return import ("./table-delete.js");
                    case "html-editor:table-properties":
                        return import ("./table-properties.js");
                    case "html-editor:table-row-copy":
                        return import ("./table-row-copy.js");
                    case "html-editor:table-row-cut":
                        return import ("./table-row-cut.js");
                    case "html-editor:table-row-insert-after":
                        return import ("./table-row-insert-after.js");
                    case "html-editor:table-row-insert-before":
                        return import ("./table-row-insert-before.js");
                    case "html-editor:table-row-paste-above":
                        return import ("./table-row-paste-above.js");
                    case "html-editor:table-row-paste-below":
                        return import ("./table-row-paste-below.js");
                    case "html-editor:table-row-properties":
                        return import ("./table-row-properties.js");
                    case "html-editor:table-row-remove":
                        return import ("./table-row-remove.js");
                    case "html-editor:underline":
                        return import ("./underline.js");
                    case "tier1:accelerator":
                        return import ("./accelerator.js");
                    case "tier1:access-special":
                        return import ("./access-special.js");
                    case "tier1:accessibility":
                        return import ("./accessibility.js");
                    case "tier1:add-file":
                        return import ("./add-file.js");
                    case "tier1:add-message":
                        return import ("./add-message.js");
                    case "tier1:add-to-lor":
                        return import ("./add-to-lor.js");
                    case "tier1:add-user":
                        return import ("./add-user.js");
                    case "tier1:add":
                        return import ("./add.js");
                    case "tier1:ai":
                        return import ("./ai.js");
                    case "tier1:alarmbell":
                        return import ("./alarmbell.js");
                    case "tier1:alert":
                        return import ("./alert2.js");
                    case "tier1:arrow-collapse-small":
                        return import ("./arrow-collapse-small.js");
                    case "tier1:arrow-collapse":
                        return import ("./arrow-collapse.js");
                    case "tier1:arrow-expand-small":
                        return import ("./arrow-expand-small.js");
                    case "tier1:arrow-expand":
                        return import ("./arrow-expand.js");
                    case "tier1:arrow-thin-down":
                        return import ("./arrow-thin-down.js");
                    case "tier1:arrow-thin-left":
                        return import ("./arrow-thin-left.js");
                    case "tier1:arrow-thin-right":
                        return import ("./arrow-thin-right.js");
                    case "tier1:arrow-thin-up":
                        return import ("./arrow-thin-up.js");
                    case "tier1:arrow-toggle-down":
                        return import ("./arrow-toggle-down.js");
                    case "tier1:arrow-toggle-up":
                        return import ("./arrow-toggle-up.js");
                    case "tier1:assignments":
                        return import ("./assignments.js");
                    case "tier1:attach":
                        return import ("./attach.js");
                    case "tier1:attendance":
                        return import ("./attendance.js");
                    case "tier1:awards":
                        return import ("./awards.js");
                    case "tier1:binder":
                        return import ("./binder.js");
                    case "tier1:blocked":
                        return import ("./blocked.js");
                    case "tier1:blog":
                        return import ("./blog.js");
                    case "tier1:book-management":
                        return import ("./book-management.js");
                    case "tier1:bookmark-filled":
                        return import ("./bookmark-filled.js");
                    case "tier1:bookmark-hollow":
                        return import ("./bookmark-hollow.js");
                    case "tier1:broken-link":
                        return import ("./broken-link.js");
                    case "tier1:browser":
                        return import ("./browser2.js");
                    case "tier1:bullet":
                        return import ("./bullet.js");
                    case "tier1:bullseye":
                        return import ("./bullseye.js");
                    case "tier1:calculate":
                        return import ("./calculate.js");
                    case "tier1:calendar":
                        return import ("./calendar2.js");
                    case "tier1:change-file":
                        return import ("./change-file.js");
                    case "tier1:chat":
                        return import ("./chat.js");
                    case "tier1:check-circle":
                        return import ("./check-circle.js");
                    case "tier1:check-manual":
                        return import ("./check-manual.js");
                    case "tier1:check-user":
                        return import ("./check-user.js");
                    case "tier1:check":
                        return import ("./check.js");
                    case "tier1:checklist":
                        return import ("./checklist.js");
                    case "tier1:chevron-down-medium":
                        return import ("./chevron-down-medium.js");
                    case "tier1:chevron-down-small":
                        return import ("./chevron-down-small.js");
                    case "tier1:chevron-down":
                        return import ("./chevron-down.js");
                    case "tier1:chevron-left":
                        return import ("./chevron-left.js");
                    case "tier1:chevron-right":
                        return import ("./chevron-right.js");
                    case "tier1:chevron-up":
                        return import ("./chevron-up.js");
                    case "tier1:class":
                        return import ("./class.js");
                    case "tier1:classlist":
                        return import ("./classlist.js");
                    case "tier1:close-circle":
                        return import ("./close-circle.js");
                    case "tier1:close-default":
                        return import ("./close-default.js");
                    case "tier1:close-large-thick":
                        return import ("./close-large-thick.js");
                    case "tier1:close-large":
                        return import ("./close-large.js");
                    case "tier1:close-small":
                        return import ("./close-small.js");
                    case "tier1:comment-filled":
                        return import ("./comment-filled.js");
                    case "tier1:comment-hollow":
                        return import ("./comment-hollow.js");
                    case "tier1:configure":
                        return import ("./configure.js");
                    case "tier1:contacts":
                        return import ("./contacts.js");
                    case "tier1:copy":
                        return import ("./copy.js");
                    case "tier1:course-tile-sort":
                        return import ("./course-tile-sort.js");
                    case "tier1:course":
                        return import ("./course.js");
                    case "tier1:coursebuilder":
                        return import ("./coursebuilder.js");
                    case "tier1:delete":
                        return import ("./delete.js");
                    case "tier1:disable":
                        return import ("./disable.js");
                    case "tier1:discussions":
                        return import ("./discussions.js");
                    case "tier1:divider-solid":
                        return import ("./divider-solid.js");
                    case "tier1:dot":
                        return import ("./dot.js");
                    case "tier1:download":
                        return import ("./download.js");
                    case "tier1:draft":
                        return import ("./draft.js");
                    case "tier1:dragger":
                        return import ("./dragger.js");
                    case "tier1:edit-bulk":
                        return import ("./edit-bulk.js");
                    case "tier1:edit":
                        return import ("./edit.js");
                    case "tier1:email-read":
                        return import ("./email-read.js");
                    case "tier1:email":
                        return import ("./email.js");
                    case "tier1:enable":
                        return import ("./enable.js");
                    case "tier1:enrollment":
                        return import ("./enrollment.js");
                    case "tier1:eportfolio":
                        return import ("./eportfolio.js");
                    case "tier1:event-log":
                        return import ("./event-log.js");
                    case "tier1:exemption-add":
                        return import ("./exemption-add.js");
                    case "tier1:exemption-remove":
                        return import ("./exemption-remove.js");
                    case "tier1:export":
                        return import ("./export.js");
                    case "tier1:external":
                        return import ("./external.js");
                    case "tier1:feed":
                        return import ("./feed.js");
                    case "tier1:feedback":
                        return import ("./feedback.js");
                    case "tier1:file-archive":
                        return import ("./file-archive.js");
                    case "tier1:file-audio":
                        return import ("./file-audio.js");
                    case "tier1:file-document":
                        return import ("./file-document.js");
                    case "tier1:file-image":
                        return import ("./file-image.js");
                    case "tier1:file-presentation":
                        return import ("./file-presentation.js");
                    case "tier1:file-video":
                        return import ("./file-video.js");
                    case "tier1:filter":
                        return import ("./filter2.js");
                    case "tier1:flag-filled":
                        return import ("./flag-filled.js");
                    case "tier1:flag-hollow":
                        return import ("./flag-hollow.js");
                    case "tier1:folder-up-level":
                        return import ("./folder-up-level.js");
                    case "tier1:folder":
                        return import ("./folder.js");
                    case "tier1:forms":
                        return import ("./forms.js");
                    case "tier1:forward":
                        return import ("./forward.js");
                    case "tier1:fullscreen":
                        return import ("./fullscreen.js");
                    case "tier1:game":
                        return import ("./game.js");
                    case "tier1:gear":
                        return import ("./gear.js");
                    case "tier1:glossary":
                        return import ("./glossary.js");
                    case "tier1:google-drive":
                        return import ("./google-drive.js");
                    case "tier1:grabber-small":
                        return import ("./grabber-small.js");
                    case "tier1:grabber":
                        return import ("./grabber.js");
                    case "tier1:grade-remove":
                        return import ("./grade-remove.js");
                    case "tier1:grade-visible":
                        return import ("./grade-visible.js");
                    case "tier1:grade":
                        return import ("./grade.js");
                    case "tier1:group-locker":
                        return import ("./group-locker.js");
                    case "tier1:group":
                        return import ("./group.js");
                    case "tier1:help":
                        return import ("./help.js");
                    case "tier1:history":
                        return import ("./history.js");
                    case "tier1:home":
                        return import ("./home.js");
                    case "tier1:import":
                        return import ("./import.js");
                    case "tier1:important":
                        return import ("./important.js");
                    case "tier1:insights-portal":
                        return import ("./insights-portal.js");
                    case "tier1:link":
                        return import ("./link3.js");
                    case "tier1:list-view":
                        return import ("./list-view.js");
                    case "tier1:location":
                        return import ("./location.js");
                    case "tier1:locations":
                        return import ("./locations.js");
                    case "tier1:lock-locked":
                        return import ("./lock-locked.js");
                    case "tier1:lock-unlock":
                        return import ("./lock-unlock.js");
                    case "tier1:locker":
                        return import ("./locker.js");
                    case "tier1:lor":
                        return import ("./lor.js");
                    case "tier1:low-priority":
                        return import ("./low-priority.js");
                    case "tier1:manage-dates-edit":
                        return import ("./manage-dates-edit.js");
                    case "tier1:manage-dates-offset":
                        return import ("./manage-dates-offset.js");
                    case "tier1:manage-dates":
                        return import ("./manage-dates.js");
                    case "tier1:manage-files":
                        return import ("./manage-files.js");
                    case "tier1:manual-run":
                        return import ("./manual-run.js");
                    case "tier1:menu-hamburger":
                        return import ("./menu-hamburger.js");
                    case "tier1:messages":
                        return import ("./messages.js");
                    case "tier1:mic":
                        return import ("./mic.js");
                    case "tier1:mobile":
                        return import ("./mobile.js");
                    case "tier1:more":
                        return import ("./more.js");
                    case "tier1:move-down":
                        return import ("./move-down.js");
                    case "tier1:move-to":
                        return import ("./move-to.js");
                    case "tier1:move-up":
                        return import ("./move-up.js");
                    case "tier1:my-computer":
                        return import ("./my-computer.js");
                    case "tier1:navigate":
                        return import ("./navigate.js");
                    case "tier1:new-window":
                        return import ("./new-window.js");
                    case "tier1:news":
                        return import ("./news.js");
                    case "tier1:no-entry":
                        return import ("./no-entry.js");
                    case "tier1:one-drive":
                        return import ("./one-drive.js");
                    case "tier1:online-rooms":
                        return import ("./online-rooms.js");
                    case "tier1:online":
                        return import ("./online.js");
                    case "tier1:outcomes":
                        return import ("./outcomes.js");
                    case "tier1:password":
                        return import ("./password.js");
                    case "tier1:pause":
                        return import ("./pause.js");
                    case "tier1:pic":
                        return import ("./pic.js");
                    case "tier1:pin-filled":
                        return import ("./pin-filled.js");
                    case "tier1:pin-hollow":
                        return import ("./pin-hollow.js");
                    case "tier1:play":
                        return import ("./play.js");
                    case "tier1:plus-default":
                        return import ("./plus-default.js");
                    case "tier1:plus-large-thick":
                        return import ("./plus-large-thick.js");
                    case "tier1:plus-large":
                        return import ("./plus-large.js");
                    case "tier1:preview":
                        return import ("./preview.js");
                    case "tier1:print":
                        return import ("./print.js");
                    case "tier1:profile-default":
                        return import ("./profile-default.js");
                    case "tier1:profile-pic":
                        return import ("./profile-pic.js");
                    case "tier1:publish-to-lor":
                        return import ("./publish-to-lor.js");
                    case "tier1:quicklink":
                        return import ("./quicklink.js");
                    case "tier1:quizzing":
                        return import ("./quizzing.js");
                    case "tier1:read-unread":
                        return import ("./read-unread.js");
                    case "tier1:read":
                        return import ("./read.js");
                    case "tier1:reading":
                        return import ("./reading.js");
                    case "tier1:redo":
                        return import ("./redo.js");
                    case "tier1:reflection":
                        return import ("./reflection.js");
                    case "tier1:refresh":
                        return import ("./refresh.js");
                    case "tier1:release-conditions":
                        return import ("./release-conditions.js");
                    case "tier1:remove-user":
                        return import ("./remove-user.js");
                    case "tier1:reorder":
                        return import ("./reorder.js");
                    case "tier1:repeat":
                        return import ("./repeat2.js");
                    case "tier1:replied":
                        return import ("./replied.js");
                    case "tier1:reply":
                        return import ("./reply.js");
                    case "tier1:reporting":
                        return import ("./reporting.js");
                    case "tier1:reports":
                        return import ("./reports.js");
                    case "tier1:resize-left":
                        return import ("./resize-left.js");
                    case "tier1:resize-right":
                        return import ("./resize-right.js");
                    case "tier1:reverse-order":
                        return import ("./reverse-order.js");
                    case "tier1:role-switch":
                        return import ("./role-switch.js");
                    case "tier1:rss":
                        return import ("./rss.js");
                    case "tier1:rubric-graded":
                        return import ("./rubric-graded.js");
                    case "tier1:rubric":
                        return import ("./rubric.js");
                    case "tier1:save":
                        return import ("./save.js");
                    case "tier1:scorm":
                        return import ("./scorm.js");
                    case "tier1:search":
                        return import ("./search.js");
                    case "tier1:seating":
                        return import ("./seating.js");
                    case "tier1:self-assessment":
                        return import ("./self-assessment.js");
                    case "tier1:send":
                        return import ("./send.js");
                    case "tier1:share-hollow":
                        return import ("./share-hollow.js");
                    case "tier1:share-parent-filled":
                        return import ("./share-parent-filled.js");
                    case "tier1:share-parent-hollow":
                        return import ("./share-parent-hollow.js");
                    case "tier1:share":
                        return import ("./share.js");
                    case "tier1:smallscreen":
                        return import ("./smallscreen.js");
                    case "tier1:sort-type":
                        return import ("./sort-type.js");
                    case "tier1:spellcheck":
                        return import ("./spellcheck2.js");
                    case "tier1:style":
                        return import ("./style.js");
                    case "tier1:subscribe-filled":
                        return import ("./subscribe-filled.js");
                    case "tier1:subscribe-hollow":
                        return import ("./subscribe-hollow.js");
                    case "tier1:support":
                        return import ("./support.js");
                    case "tier1:surveys":
                        return import ("./surveys.js");
                    case "tier1:syllabus":
                        return import ("./syllabus.js");
                    case "tier1:table-of-contents":
                        return import ("./table-of-contents.js");
                    case "tier1:tag-hollow":
                        return import ("./tag-hollow.js");
                    case "tier1:tag":
                        return import ("./tag.js");
                    case "tier1:thumbs-down":
                        return import ("./thumbs-down.js");
                    case "tier1:thumbs-up":
                        return import ("./thumbs-up.js");
                    case "tier1:tile-view":
                        return import ("./tile-view.js");
                    case "tier1:time":
                        return import ("./time.js");
                    case "tier1:tools":
                        return import ("./tools.js");
                    case "tier1:topic-last":
                        return import ("./topic-last.js");
                    case "tier1:turnitin":
                        return import ("./turnitin.js");
                    case "tier1:unapproved":
                        return import ("./unapproved.js");
                    case "tier1:undo":
                        return import ("./undo.js");
                    case "tier1:unsaved":
                        return import ("./unsaved.js");
                    case "tier1:upload":
                        return import ("./upload.js");
                    case "tier1:user-competencies":
                        return import ("./user-competencies.js");
                    case "tier1:user-progress":
                        return import ("./user-progress.js");
                    case "tier1:video-assignment":
                        return import ("./video-assignment.js");
                    case "tier1:virtual-classroom":
                        return import ("./virtual-classroom.js");
                    case "tier1:visibility-conditional":
                        return import ("./visibility-conditional.js");
                    case "tier1:visibility-hide":
                        return import ("./visibility-hide.js");
                    case "tier1:visibility-show":
                        return import ("./visibility-show.js");
                    case "tier1:volume-muted":
                        return import ("./volume-muted.js");
                    case "tier1:volume":
                        return import ("./volume.js");
                    case "tier1:widgets":
                        return import ("./widgets.js");
                    case "tier1:wizard":
                        return import ("./wizard.js");
                    case "tier1:zoom-in":
                        return import ("./zoom-in.js");
                    case "tier1:zoom-out":
                        return import ("./zoom-out.js");
                    case "tier2:accelerator":
                        return import ("./accelerator2.js");
                    case "tier2:accessibility":
                        return import ("./accessibility2.js");
                    case "tier2:add-file":
                        return import ("./add-file2.js");
                    case "tier2:add-message":
                        return import ("./add-message2.js");
                    case "tier2:add-to-lor":
                        return import ("./add-to-lor2.js");
                    case "tier2:add-user":
                        return import ("./add-user2.js");
                    case "tier2:add":
                        return import ("./add2.js");
                    case "tier2:ai":
                        return import ("./ai2.js");
                    case "tier2:alarmbell":
                        return import ("./alarmbell2.js");
                    case "tier2:alert":
                        return import ("./alert3.js");
                    case "tier2:arrow-collapse":
                        return import ("./arrow-collapse2.js");
                    case "tier2:assignments":
                        return import ("./assignments2.js");
                    case "tier2:attach":
                        return import ("./attach2.js");
                    case "tier2:attendance":
                        return import ("./attendance2.js");
                    case "tier2:awards":
                        return import ("./awards2.js");
                    case "tier2:binder":
                        return import ("./binder2.js");
                    case "tier2:blocked":
                        return import ("./blocked2.js");
                    case "tier2:blog":
                        return import ("./blog2.js");
                    case "tier2:book-management":
                        return import ("./book-management2.js");
                    case "tier2:bookmark-filled":
                        return import ("./bookmark-filled2.js");
                    case "tier2:bookmark-hollow":
                        return import ("./bookmark-hollow2.js");
                    case "tier2:broken-link":
                        return import ("./broken-link2.js");
                    case "tier2:browser":
                        return import ("./browser3.js");
                    case "tier2:bullseye":
                        return import ("./bullseye2.js");
                    case "tier2:calculate":
                        return import ("./calculate2.js");
                    case "tier2:calendar":
                        return import ("./calendar3.js");
                    case "tier2:capture":
                        return import ("./capture.js");
                    case "tier2:change-file":
                        return import ("./change-file2.js");
                    case "tier2:chat":
                        return import ("./chat2.js");
                    case "tier2:check-box-unchecked":
                        return import ("./check-box-unchecked.js");
                    case "tier2:check-box":
                        return import ("./check-box.js");
                    case "tier2:check-circle":
                        return import ("./check-circle2.js");
                    case "tier2:check":
                        return import ("./check2.js");
                    case "tier2:checklist":
                        return import ("./checklist2.js");
                    case "tier2:chevron-down":
                        return import ("./chevron-down2.js");
                    case "tier2:chevron-left":
                        return import ("./chevron-left2.js");
                    case "tier2:chevron-right":
                        return import ("./chevron-right2.js");
                    case "tier2:chevron-up":
                        return import ("./chevron-up2.js");
                    case "tier2:classes":
                        return import ("./classes.js");
                    case "tier2:classlist":
                        return import ("./classlist2.js");
                    case "tier2:contacts":
                        return import ("./contacts2.js");
                    case "tier2:content":
                        return import ("./content.js");
                    case "tier2:copy":
                        return import ("./copy2.js");
                    case "tier2:course-tile-sort":
                        return import ("./course-tile-sort2.js");
                    case "tier2:coursebuilder":
                        return import ("./coursebuilder2.js");
                    case "tier2:delete":
                        return import ("./delete2.js");
                    case "tier2:discussions":
                        return import ("./discussions2.js");
                    case "tier2:divider-big":
                        return import ("./divider-big.js");
                    case "tier2:divider":
                        return import ("./divider.js");
                    case "tier2:dot":
                        return import ("./dot2.js");
                    case "tier2:download":
                        return import ("./download2.js");
                    case "tier2:draft":
                        return import ("./draft2.js");
                    case "tier2:edit-not-editable":
                        return import ("./edit-not-editable.js");
                    case "tier2:edit":
                        return import ("./edit2.js");
                    case "tier2:email-open":
                        return import ("./email-open.js");
                    case "tier2:email":
                        return import ("./email2.js");
                    case "tier2:eportfolio":
                        return import ("./eportfolio2.js");
                    case "tier2:evaluate-all":
                        return import ("./evaluate-all.js");
                    case "tier2:external":
                        return import ("./external2.js");
                    case "tier2:feedback":
                        return import ("./feedback2.js");
                    case "tier2:file-archive":
                        return import ("./file-archive2.js");
                    case "tier2:file-audio":
                        return import ("./file-audio2.js");
                    case "tier2:file-document":
                        return import ("./file-document2.js");
                    case "tier2:file-image":
                        return import ("./file-image2.js");
                    case "tier2:file-presentation":
                        return import ("./file-presentation2.js");
                    case "tier2:file-video":
                        return import ("./file-video2.js");
                    case "tier2:filter":
                        return import ("./filter3.js");
                    case "tier2:flag-fill":
                        return import ("./flag-fill.js");
                    case "tier2:flag-hollow":
                        return import ("./flag-hollow2.js");
                    case "tier2:folder":
                        return import ("./folder2.js");
                    case "tier2:forms":
                        return import ("./forms2.js");
                    case "tier2:fullscreen":
                        return import ("./fullscreen2.js");
                    case "tier2:game":
                        return import ("./game2.js");
                    case "tier2:gear":
                        return import ("./gear2.js");
                    case "tier2:glossary":
                        return import ("./glossary2.js");
                    case "tier2:google-drive":
                        return import ("./google-drive2.js");
                    case "tier2:grade":
                        return import ("./grade2.js");
                    case "tier2:help":
                        return import ("./help2.js");
                    case "tier2:history":
                        return import ("./history2.js");
                    case "tier2:home":
                        return import ("./home2.js");
                    case "tier2:insights-portal":
                        return import ("./insights-portal2.js");
                    case "tier2:link":
                        return import ("./link4.js");
                    case "tier2:location":
                        return import ("./location2.js");
                    case "tier2:locations":
                        return import ("./locations2.js");
                    case "tier2:lock-unlocked":
                        return import ("./lock-unlocked.js");
                    case "tier2:lock":
                        return import ("./lock.js");
                    case "tier2:locker":
                        return import ("./locker2.js");
                    case "tier2:lor":
                        return import ("./lor2.js");
                    case "tier2:manage-dates":
                        return import ("./manage-dates2.js");
                    case "tier2:manage-files":
                        return import ("./manage-files2.js");
                    case "tier2:media":
                        return import ("./media2.js");
                    case "tier2:menu-hamburger":
                        return import ("./menu-hamburger2.js");
                    case "tier2:merge":
                        return import ("./merge.js");
                    case "tier2:message-new":
                        return import ("./message-new.js");
                    case "tier2:messages":
                        return import ("./messages2.js");
                    case "tier2:mic":
                        return import ("./mic2.js");
                    case "tier2:module":
                        return import ("./module.js");
                    case "tier2:move-down":
                        return import ("./move-down2.js");
                    case "tier2:move-to":
                        return import ("./move-to2.js");
                    case "tier2:move-up":
                        return import ("./move-up2.js");
                    case "tier2:navigate":
                        return import ("./navigate2.js");
                    case "tier2:news":
                        return import ("./news2.js");
                    case "tier2:one-drive":
                        return import ("./one-drive2.js");
                    case "tier2:online-rooms":
                        return import ("./online-rooms2.js");
                    case "tier2:online":
                        return import ("./online2.js");
                    case "tier2:outcomes":
                        return import ("./outcomes2.js");
                    case "tier2:password":
                        return import ("./password2.js");
                    case "tier2:pic":
                        return import ("./pic2.js");
                    case "tier2:pin-filled":
                        return import ("./pin-filled2.js");
                    case "tier2:pin-hollow":
                        return import ("./pin-hollow2.js");
                    case "tier2:preview":
                        return import ("./preview2.js");
                    case "tier2:print":
                        return import ("./print2.js");
                    case "tier2:profile-default":
                        return import ("./profile-default2.js");
                    case "tier2:profile-pic":
                        return import ("./profile-pic2.js");
                    case "tier2:project":
                        return import ("./project.js");
                    case "tier2:publish-all":
                        return import ("./publish-all.js");
                    case "tier2:publish-to-lor":
                        return import ("./publish-to-lor2.js");
                    case "tier2:quicklink":
                        return import ("./quicklink2.js");
                    case "tier2:quiz-submissions":
                        return import ("./quiz-submissions.js");
                    case "tier2:quizzing":
                        return import ("./quizzing2.js");
                    case "tier2:read-unread":
                        return import ("./read-unread2.js");
                    case "tier2:read":
                        return import ("./read2.js");
                    case "tier2:reading":
                        return import ("./reading2.js");
                    case "tier2:reflection":
                        return import ("./reflection2.js");
                    case "tier2:refresh":
                        return import ("./refresh2.js");
                    case "tier2:release-conditions":
                        return import ("./release-conditions2.js");
                    case "tier2:remove-user":
                        return import ("./remove-user2.js");
                    case "tier2:reorder":
                        return import ("./reorder2.js");
                    case "tier2:reply-all":
                        return import ("./reply-all.js");
                    case "tier2:reply":
                        return import ("./reply2.js");
                    case "tier2:reporting":
                        return import ("./reporting2.js");
                    case "tier2:rss":
                        return import ("./rss2.js");
                    case "tier2:rubrics":
                        return import ("./rubrics.js");
                    case "tier2:save":
                        return import ("./save2.js");
                    case "tier2:scorm":
                        return import ("./scorm2.js");
                    case "tier2:search":
                        return import ("./search2.js");
                    case "tier2:seating":
                        return import ("./seating2.js");
                    case "tier2:self-assessment":
                        return import ("./self-assessment2.js");
                    case "tier2:send":
                        return import ("./send2.js");
                    case "tier2:share":
                        return import ("./share2.js");
                    case "tier2:smallscreen":
                        return import ("./smallscreen2.js");
                    case "tier2:style":
                        return import ("./style2.js");
                    case "tier2:subscribe-filled":
                        return import ("./subscribe-filled2.js");
                    case "tier2:subscribe-hollow":
                        return import ("./subscribe-hollow2.js");
                    case "tier2:surveys":
                        return import ("./surveys2.js");
                    case "tier2:syllabus":
                        return import ("./syllabus2.js");
                    case "tier2:table-of-contents":
                        return import ("./table-of-contents2.js");
                    case "tier2:tag":
                        return import ("./tag2.js");
                    case "tier2:time":
                        return import ("./time2.js");
                    case "tier2:tools":
                        return import ("./tools2.js");
                    case "tier2:topic-last":
                        return import ("./topic-last2.js");
                    case "tier2:unapproved":
                        return import ("./unapproved2.js");
                    case "tier2:undo":
                        return import ("./undo2.js");
                    case "tier2:unsaved":
                        return import ("./unsaved2.js");
                    case "tier2:upload":
                        return import ("./upload2.js");
                    case "tier2:user-competencies":
                        return import ("./user-competencies2.js");
                    case "tier2:user-progress":
                        return import ("./user-progress2.js");
                    case "tier2:validate":
                        return import ("./validate.js");
                    case "tier2:video-assignment":
                        return import ("./video-assignment2.js");
                    case "tier2:view-submission-list":
                        return import ("./view-submission-list.js");
                    case "tier2:viewed-notviewed":
                        return import ("./viewed-notviewed.js");
                    case "tier2:virtual-classroom":
                        return import ("./virtual-classroom2.js");
                    case "tier2:visibility-hide":
                        return import ("./visibility-hide2.js");
                    case "tier2:visibility-show":
                        return import ("./visibility-show2.js");
                    case "tier2:volume-muted":
                        return import ("./volume-muted2.js");
                    case "tier2:volume":
                        return import ("./volume2.js");
                    case "tier2:wizard":
                        return import ("./wizard2.js");
                    case "tier3:accessibility":
                        return import ("./accessibility3.js");
                    case "tier3:ai":
                        return import ("./ai3.js");
                    case "tier3:alert":
                        return import ("./alert4.js");
                    case "tier3:assignments":
                        return import ("./assignments3.js");
                    case "tier3:bookmark":
                        return import ("./bookmark.js");
                    case "tier3:bullseye":
                        return import ("./bullseye3.js");
                    case "tier3:calendar":
                        return import ("./calendar4.js");
                    case "tier3:chat":
                        return import ("./chat3.js");
                    case "tier3:check-circle":
                        return import ("./check-circle3.js");
                    case "tier3:chevron-down":
                        return import ("./chevron-down3.js");
                    case "tier3:chevron-left-circle":
                        return import ("./chevron-left-circle.js");
                    case "tier3:chevron-left":
                        return import ("./chevron-left3.js");
                    case "tier3:chevron-right-circle":
                        return import ("./chevron-right-circle.js");
                    case "tier3:chevron-right":
                        return import ("./chevron-right3.js");
                    case "tier3:chevron-up":
                        return import ("./chevron-up3.js");
                    case "tier3:classes":
                        return import ("./classes2.js");
                    case "tier3:close-thick":
                        return import ("./close-thick.js");
                    case "tier3:close":
                        return import ("./close.js");
                    case "tier3:copy":
                        return import ("./copy3.js");
                    case "tier3:course-progress-complete":
                        return import ("./course-progress-complete.js");
                    case "tier3:course-progress-in-progress":
                        return import ("./course-progress-in-progress.js");
                    case "tier3:course-progress-not-started":
                        return import ("./course-progress-not-started.js");
                    case "tier3:discussions":
                        return import ("./discussions3.js");
                    case "tier3:download":
                        return import ("./download3.js");
                    case "tier3:email-open":
                        return import ("./email-open2.js");
                    case "tier3:email":
                        return import ("./email3.js");
                    case "tier3:evaluate-all":
                        return import ("./evaluate-all2.js");
                    case "tier3:export":
                        return import ("./export2.js");
                    case "tier3:external":
                        return import ("./external3.js");
                    case "tier3:feed":
                        return import ("./feed2.js");
                    case "tier3:file-audio":
                        return import ("./file-audio3.js");
                    case "tier3:file-document":
                        return import ("./file-document3.js");
                    case "tier3:file-presentation":
                        return import ("./file-presentation3.js");
                    case "tier3:file-video":
                        return import ("./file-video3.js");
                    case "tier3:game":
                        return import ("./game3.js");
                    case "tier3:gear":
                        return import ("./gear3.js");
                    case "tier3:google-drive":
                        return import ("./google-drive3.js");
                    case "tier3:grade":
                        return import ("./grade3.js");
                    case "tier3:help":
                        return import ("./help3.js");
                    case "tier3:home":
                        return import ("./home3.js");
                    case "tier3:image":
                        return import ("./image2.js");
                    case "tier3:import":
                        return import ("./import2.js");
                    case "tier3:lock-unlocked":
                        return import ("./lock-unlocked2.js");
                    case "tier3:lock":
                        return import ("./lock2.js");
                    case "tier3:menu-hamburger":
                        return import ("./menu-hamburger3.js");
                    case "tier3:menu":
                        return import ("./menu2.js");
                    case "tier3:news":
                        return import ("./news3.js");
                    case "tier3:notification-bell":
                        return import ("./notification-bell.js");
                    case "tier3:pause-borderless":
                        return import ("./pause-borderless.js");
                    case "tier3:pause":
                        return import ("./pause2.js");
                    case "tier3:pic":
                        return import ("./pic3.js");
                    case "tier3:play-borderless":
                        return import ("./play-borderless.js");
                    case "tier3:play":
                        return import ("./play2.js");
                    case "tier3:preview":
                        return import ("./preview3.js");
                    case "tier3:profile-default":
                        return import ("./profile-default3.js");
                    case "tier3:profile-pic":
                        return import ("./profile-pic3.js");
                    case "tier3:publish-all":
                        return import ("./publish-all2.js");
                    case "tier3:quizzing":
                        return import ("./quizzing3.js");
                    case "tier3:rubric-graded":
                        return import ("./rubric-graded2.js");
                    case "tier3:rubric":
                        return import ("./rubric2.js");
                    case "tier3:scorm":
                        return import ("./scorm3.js");
                    case "tier3:search":
                        return import ("./search3.js");
                    case "tier3:stop-borderless":
                        return import ("./stop-borderless.js");
                    case "tier3:stop":
                        return import ("./stop.js");
                    case "tier3:syllabus":
                        return import ("./syllabus3.js");
                    case "tier3:upload":
                        return import ("./upload3.js");
                    case "tier3:view-submission-list":
                        return import ("./view-submission-list2.js")
                }
            }(r);
            return this._fixSvg(e ? e.val : void 0)
        }
    }
});
export {
    p as i, b as m
};