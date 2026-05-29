import "./dialog-fullscreen.js";
import "./loading-spinner.js";
import "./tab.js";
import "./tab-panel-mixin.js";
import "./tab-panel.js";
import "./d2l-basic-image-selector.js";
import "./d2l-course-image.js";
import "./alert.js";
import "./link.js";
import "./sort-item.js";
import "./card-footer-link.js";
import "./tooltip.js";
import "./requestIdleCallback.js";
import "./dropdown-menu.js";
import "./dropdown-more.js";
import "./d2l-fetch.js";
import "./icon.js";
import "./menu.js";
import "./menu-item.js";
import "./menu-item-link.js";
import "./button-icon.js";
import "./card.js";
import "./card-content-meta.js";
import "./colors.js";
import "./status-indicator.js";
import "./object-property-list.js";
import "./object-property-list-item.js";
import {
    f as e,
    h as t
} from "./dateTime.js";
import {
    e as s,
    p as o
} from "./dateTime2.js";
import {
    P as n,
    h as i
} from "./polymer-element.js";
import {
    a as r
} from "./render-status.js";
import {
    d as a
} from "./mixin.js";
import {
    M as l,
    I as d,
    a as c,
    b as h
} from "./localize-behavior.js";
import {
    E as m
} from "./index8.js";
import {
    I as u
} from "./iron-a11y-announcer.js";
import {
    a as p,
    i as g,
    b as _
} from "./lit-element.js";
import {
    o as b
} from "./style-map.js";
import "./dropdown.js";
import "./dropdown-content.js";
import "./input-search.js";
import "./d2l-typography-shared-styles.js";
import {
    P as f
} from "./polymer-legacy.js";
import {
    e as y
} from "./dom.js";
import {
    A as w
} from "./index6.js";
import "./filter.js";
import "./filter-dimension-set.js";
import "./filter-dimension-set-value.js";
import {
    o as S
} from "./if-defined.js";
import "./offscreen.js";
import "./styles.js";
import "./focus.js";
import "./svg-to-css.js";
import "./async-container-mixin.js";
import "./class-map.js";
import "./directive.js";
import "./dialog-styles.js";
import "./ifrauBackdropService.js";
import "./_rollupPluginBabelHelpers.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./framed.js";
import "./backdrop.js";
import "./flags.js";
import "./dismissible.js";
import "./uniqueId.js";
import "./waitForElem.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./property-required-mixin.js";
import "./icon-styles.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./announce.js";
import "./visible-on-ancestor-mixin.js";
import "./button-styles.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
import "./overflow.js";
import "./skeleton-mixin.js";
import "./subscriberControllers.js";
import "./arrow-keys-mixin.js";
import "./repeat.js";
import "./d2l-localize-behavior.js";
import "./number.js";
import "./fileSize.js";
import "./common2.js";
import "./button-subtle.js";
import "./dropdown-button-subtle.js";
import "./dropdown-opener-mixin.js";
import "./dropdown-opener-styles.js";
import "./menu-item-radio.js";
import "./menu-item-radio-mixin.js";
import "./menu-item-selectable-styles.js";
import "./menu-item-styles.js";
import "./count-badge-icon.js";
import "./count-badge-mixin.js";
import "./dropdown-popover-mixin.js";
import "./button.js";
import "./index5.js";
import "./d2lfetch.js";
import "./screen-reader-pause.js";
import "./list2.js";
import "./boot.js";
import "./settings.js";
import "./async.js";
import "./iron-selectable.js";
import "./input-text.js";
import "./input-inline-help.js";
import "./input-label-styles.js";
import "./input-styles.js";
import "./labelled-mixin.js";
import "./rtl-mixin.js";
import "./debounce.js";
import "./count-badge.js";
import "./empty-state-action-button.js";
import "./empty-state-action-link.js";
import "./empty-state-simple.js";
import "./empty-state-mixin.js";
import "./expand-collapse-content.js";
import "./list.js";
import "./selection-mixin.js";
import "./collection-mixin.js";
import "./pageable-mixin.js";
import "./list-item.js";
import "./list-item-link-mixin.js";
import "./list-item-mixin.js";
import "./input-checkbox.js";
import "./interactive-mixin.js";
import "./composeMixins.js";
import "./color.js";
import "./selection-input.js";
import "./input-radio-styles.js";
import "./button-move.js";
import "./pager-load-more.js";
import "./pageable-subscriber-mixin.js";
import "./selection-select-all.js";
import "./selection-observer-mixin.js";
import "./selection-summary.js";
const C = a(function(e) {
        return class extends e {
            enrollmentStatus(e, t) {
                if (!t || "boolean" != typeof e) return null;
                const s = 864e5,
                    o = new Date(Date.now());
                o.setHours(0, 0, 0, 0);
                const n = new Date(Date.now() + s);
                n.setHours(0, 0, 0, 0);
                const i = new Date(Date.now() - s);
                i.setHours(0, 0, 0, 0);
                const r = new Date(Date.now() - 6048e5);
                r.setHours(0, 0, 0, 0);
                const a = new Date(Date.parse(t));
                let l = null;
                e && a < n ? l = "completed" : a < o && (l = "overdue");
                return {
                    status: l,
                    msInDay: s,
                    nowDate: o,
                    tomorrowDate: n,
                    yesterdayDate: i,
                    pastWeekFromNow: r,
                    parsedDate: a
                }
            }
        }
    }),
    v = a(function(e) {
        return class extends(l(C(e))) {
            dateTextAndStatus(e, t) {
                if (!this.enrollmentStatus(e, t)) return null;
                const s = this.enrollmentStatus(e, t),
                    o = s.msInDay,
                    n = s.nowDate,
                    i = s.tomorrowDate,
                    r = s.yesterdayDate,
                    a = s.pastWeekFromNow,
                    l = s.parsedDate,
                    d = e ? "completed" : "due";
                let c;
                if (this._compareDate(l, n)) c = this.localize(`${d}Today`);
                else if (this._compareDate(l, i)) c = this.localize(`${d}Tomorrow`);
                else if (this._compareDate(l, r)) c = this.localize(`${d}Yesterday`);
                else if (l >= a && l <= n) {
                    const e = Math.ceil((n - l) / o);
                    c = this.localize(`${d}DaysAgo`, "number", e.toString())
                } else c = this.localize(`${d}On`, "dateTime", this.formatDate(l, {
                    format: this._dateFormat(l, n)
                }));
                return {
                    dateText: c,
                    status: s.status
                }
            }
            _compareDate(e, t) {
                return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
            }
            _dateFormat(e, t) {
                const s = new Date(Date.now() + 6048e5);
                return s.setHours(0, 0, 0, 0), e < s && e > t ? "dddd" : e.getFullYear() === t.getFullYear() ? "MMM d" : "MMM d, yyyy"
            }
        }
    });

function U(e, t) {
    if (!e) return;
    t = t || {};
    const s = Object.keys(t).map(e => `${e}=${t[e]}`).join("&");
    return s ? e.indexOf("?") > -1 ? `${e}&${s}` : `${e}?${s}` : e
}

function z(e) {
    if (e) return window.d2lfetch.fetch(new Request(e)).then(e => e.ok ? e.json() : Promise.reject(`${e.status} ${e.statusText}`))
}
class A extends(v(n)) {
    static get properties() {
        return {
            disabled: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1
            },
            overdue: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1
            },
            completed: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1
            },
            closed: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1
            },
            inactive: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1
            },
            showCourseCode: {
                type: Boolean,
                value: !1
            },
            showSemesterName: {
                type: Boolean
            },
            showCourseStartDate: {
                type: Boolean,
                value: !1
            },
            showCourseEndDate: {
                type: Boolean,
                value: !1
            },
            hidePinning: {
                type: Boolean,
                value: !1
            },
            showDropboxUnreadFeedback: {
                type: Boolean,
                value: !1
            },
            showPendingEnrollmentRequests: {
                type: Boolean,
                value: !1
            },
            showUnattemptedQuizzes: {
                type: Boolean,
                value: !1
            },
            showUngradedQuizAttempts: {
                type: Boolean,
                value: !1
            },
            showUnreadDiscussionMessages: {
                type: Boolean,
                value: !1
            },
            showUnreadDropboxSubmissions: {
                type: Boolean,
                value: !1
            },
            enrollment: {
                type: Object,
                value: function() {
                    return {}
                }
            },
            _pinned: {
                type: Boolean,
                value: !1,
                observer: "_handlePinnedChange"
            },
            _canAccessCourseInfo: Boolean,
            _canChangeCourseImage: Boolean,
            _courseInfoUrl: String,
            _imageLoading: {
                type: Boolean,
                value: !1
            },
            _imageLoadingProgress: {
                type: Boolean,
                value: !1
            },
            _load: Boolean,
            _orgUnitId: Number,
            _organization: Object,
            _organizationHomepageUrl: String,
            _organizationImageUrl: String,
            _organizationName: String,
            _badgeText: {
                type: String,
                value: null,
                observer: "_handleBadgeTextChange"
            },
            _badgeState: String,
            _beforeStartDate: Boolean,
            _accessibilityData: {
                type: Object,
                value: function() {
                    return {}
                }
            },
            _newEnrollment: {
                type: Boolean,
                value: !1
            },
            _notificationMap: Object,
            _notifications: Array,
            _organizationCode: String,
            _organizationDisplayName: String,
            _semesterName: String,
            _organizationDateText: String,
            _showBothMetadata: {
                type: Boolean,
                computed: "_computeShowBothMetadata(showCourseCode, _organizationCode, showSemesterName, _semesterName)"
            },
            _imageAlt: String,
            _imageError: {
                type: Boolean,
                value: !1
            },
            _imageLoaded: {
                type: Boolean,
                value: !1
            }
        }
    }
    static get is() {
        return "d2l-my-courses-enrollment-card"
    }
    static get observers() {
        return ["_loadEnrollmentData(_load, enrollment)", "_startedInactive(_beforeStartDate, closed, inactive)", "_onLanguageChange(language, enrollment)"]
    }
    static get template() {
        return i `
			<style>
				:host {
					display: block;
					position: relative;
				}

				d2l-card {
					height: 100%;
					/* Prevents long, non-breaking course names from overflowing */
					width: 100%;
				}
				:host([disabled]) .d2l-enrollment-card-image-container {
					/*
					Chrome 19+,
					Safari 6+,
					Safari 6+ iOS,
					Opera 15+
					*/
					-webkit-filter: grayscale(1);

					/* Firefox 35+ */
					filter: grayscale(1);

					opacity: 0.5;
					position: relative;
					z-index: -1;
				}
				:host([disabled]) d2l-card:hover,
				:host([disabled]) d2l-card:focus {
					cursor: not-allowed;
				}

				:host([disabled]) d2l-organization-updates {
					display: none;
				}

				d2l-icon {
					color: white;
					--d2l-icon-width: 18px;
					--d2l-icon-height: 18px;
				}

				.enrollment-content-block {
					display: block;
				}

				.d2l-enrollment-card-overlay {
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: center;
					position: absolute;
					top: 1px;
					height: var(--course-image-height);
					width: calc(100% - 2px);
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					color: white;
					padding: 10px;
					text-align: center;
					background-color: rgba(0,0,0,0.7);
				}
				.d2l-enrollment-card-overlay[hidden] {
					display: none;
				}

				.d2l-enrollment-card-image-container {
					height: var(--course-image-height);
					line-height:0;
				}

				.d2l-enrollment-card-icon-container {
					height: 64px;
					width: 64px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-style: none;
					border-radius: 100px;
					background-color: white;
					overflow: hidden;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					animation-name: container;
					animation-duration: 1s;
					animation-fill-mode: forwards;
				}
				@keyframes container {
					0% { height: 64px; width: 64px; }
					70% { height: 64px; width: 64px; opacity: 1; }
					90% { height: 80px; width: 80px; opacity: 0.4 }
					100% { height: 20px; width: 20px; opacity: 0; }
				}

				.d2l-enrollment-card-checkmark {
					color: var(--d2l-color-olivine);
				}
				.d2l-enrollment-card-fail-icon {
					color: #ffce51;
				}
				.d2l-enrollment-card-checkmark,
				.d2l-enrollment-card-fail-icon {
					display: flex;
					animation-name: inner;
					animation-duration: 1s;
					animation-fill-mode: forwards;
				}
				@keyframes inner {
					0% { transform: scale(1); }
					15% { transform: scale(2.30); }
					20% { transform: scale(2.0); }
					100% { transform: scale(2.0); }
				}

				.d2l-enrollment-card-alert-colour-circle {
					height: .75rem;
					width: .75rem;
					border-radius: 50%;
					border: 1px solid #f6f7f8;
					background-color: var(--d2l-color-celestine);
					position: absolute;
					top: -0.375rem;
					right: -0.375rem;
				}

				:host(:dir(rtl)) .d2l-enrollment-card-alert-colour-circle {
					right: auto;
					left: -0.375rem;
				}

				.d2l-enrollment-card-content-flex {
					overflow: hidden;
					word-wrap: break-word; /* IE/Edge */
					overflow-wrap: break-word; /* replaces 'word-wrap' in Firefox, Chrome, Safari */
					display: flex;
					flex-direction: column;
					margin: -0.35rem 0 -0.1rem -0.05rem;
				}
				.d2l-enrollment-card-content-flex[badge] {
					margin-top: -0.855rem;
				}
				.d2l-enrollment-card-status-indicator {
					background-color: #FFFFFF;
					box-shadow: 0 0 0 2px #FFFFFF;
					padding: 0.2rem 0.5rem 0.15rem 0.5rem;
					filter: grayscale(0);
					opacity: 1;
				}
				
				/* Inlined organization styles */
				.d2l-organization-name {
					/* d2l-organization-name component just displays text with no special styling */
				}
				
				.d2l-organization-code {
					text-transform: uppercase;
				}
				
				.d2l-organization-info-item {
					/* Individual info items styled like d2l-object-property-list-item */
				}
				
				.d2l-organization-date {
					/* d2l-organization-date component just displays text with no special styling */
				}
				
				/* Inlined organization image styles */
				.d2l-organization-image {
					display: block;
					height: 100%;
					width: 100%;
					position: relative;
					overflow: hidden;
					background-color: var(--d2l-color-regolith);
				}
				
				.d2l-organization-image-main {
					height: 100%;
					width: 100%;
					object-fit: cover;
					display: block;
				}
				
			.d2l-organization-image-placeholder {
				display: block;
				height: 100%;
				width: 100%;
			}
			
			.d2l-organization-image-placeholder svg {
				width: 100%;
				height: 100%;
			}

				.d2l-enrollment-card-updates-tooltip {
					color: #ffffff;
					white-space: nowrap;
				}
				.d2l-enrollment-card-updates-tooltip[disabled] {
					display: none;
				}
				.d2l-enrollment-card-updates-tooltip ul {
					list-style-type: none;
					margin: 0;
					padding: 0;
				}
				.d2l-enrollment-card-updates-tooltip ul li {
					margin: 0;
					padding: 0;
				}
			</style>

			<d2l-card href="[[_computeHref(disabled, _organizationHomepageUrl)]]" text="[[_accessibilityDataToString(_accessibilityData)]]">
				<div slot="header" aria-hidden="true">
					<div class="d2l-enrollment-card-image-container">
						<!-- Inlined organization image -->
						<div class="d2l-organization-image">
							<template is="dom-if" if="[[_imageLoaded]]">
								<img class="d2l-organization-image-main" src$="[[_organizationImageUrl]]" alt$="[[_imageAlt]]" loading="lazy" />
							</template>
							<template is="dom-if" if="[[!_imageLoaded]]">
								<div class="d2l-organization-image-placeholder">
									<template is="dom-if" if="[[_imageError]]">
										<svg viewBox="0 0 231 103" xmlns="http://www.w3.org/2000/svg">
											<g fill="none" fill-rule="evenodd">
												<path fill="#E3E9F1" d="M0 0h231v103H0z"/>
												<path d="M231 89l-41.216-37.138c-2.4-2.874-6.624-5-11.712-5.92-1.824-.287-3.648-.46-5.472-.46-3.36 0-6.72.518-9.696 1.552L101.368 68.53 77.752 58.93c-3.264-1.322-7.008-1.954-10.752-1.954-4.992 0-9.888 1.15-13.536 3.39L0 87v16h231V89z" fill="#CDD5DC"/>
												<path d="M116 41c0 8.636-5 15-15 15s-15-6.364-15-15 5-15 15-15 15 6.364 15 15z" fill="#CDD5DC"/>
											</g>
										</svg>
									</template>
								</div>
							</template>
						</div>
					</div>
					<div hidden$="[[!_imageLoading]]" class="d2l-enrollment-card-overlay">
						<d2l-loading-spinner hidden$="[[!_imageLoadingProgress]]" size="85"></d2l-loading-spinner>
						<div class="d2l-enrollment-card-icon-container" hidden$="[[_imageLoadingProgress]]">
							<d2l-icon icon="tier2:check"></d2l-icon>
						</div>
					</div>
				</div>

				<d2l-status-indicator aria-hidden="true" class="d2l-enrollment-card-status-indicator" slot="badge" state="[[_badgeState]]" text="[[localize(_badgeText)]]" hidden$="[[!_badgeText]]">
				</d2l-status-indicator>

			<div badge$="[[_badgeText]]" class="d2l-enrollment-card-content-flex" slot="content" aria-hidden="true">
				<div class="d2l-organization-name">[[_organizationDisplayName]]</div>
				<d2l-card-content-meta>
					<template is="dom-if" if="[[_showBothMetadata]]">
						<d2l-object-property-list>
							<template is="dom-if" if="[[_shouldShowCourseCode(showCourseCode, _organizationCode)]]">
								<d2l-object-property-list-item class="d2l-organization-code" text="[[_organizationCode]]"></d2l-object-property-list-item>
							</template>
							<template is="dom-if" if="[[_shouldShowSemester(showSemesterName, _semesterName)]]">
								<d2l-object-property-list-item text="[[_semesterName]]"></d2l-object-property-list-item>
							</template>
						</d2l-object-property-list>
					</template>
					<template is="dom-if" if="[[!_showBothMetadata]]">
						<div class="d2l-body-small" hidden$="[[!_shouldShowCourseCode(showCourseCode, _organizationCode)]]">
							<span class="d2l-organization-code">[[_organizationCode]]</span>
						</div>
						<div class="d2l-body-small" hidden$="[[!_shouldShowSemester(showSemesterName, _semesterName)]]">
							[[_semesterName]]
						</div>
					</template>
					<div class="d2l-organization-date" hidden$="[[!_organizationDateText]]">[[_organizationDateText]]</div>
				</d2l-card-content-meta>
			</div>				<template is="dom-if" if="[[_shouldShowDropDown(_canAccessCourseInfo, _canChangeCourseImage)]]">
					<d2l-dropdown-more slot="actions" text="[[localize('courseSettings', 'course', _organizationName)]]" translucent="" visible-on-ancestor="">
						<d2l-dropdown-menu>
							<d2l-menu label="[[localize('courseSettings', 'course', _organizationName)]]">
								<d2l-menu-item-link hidden$="[[!_canAccessCourseInfo]]" text="[[localize('courseOfferingInformation')]]" href="[[_courseInfoUrl]]">
								</d2l-menu-item-link>
								<d2l-menu-item on-d2l-menu-item-select="_launchCourseImageSelector" hidden$="[[!_canChangeCourseImage]]" text="[[localize('changeImage')]]">
								</d2l-menu-item>
								<d2l-menu-item on-d2l-menu-item-select="_pinClickHandler" hidden$="[[_shouldHidePinOption(_pinned)]]" text="[[localize('pin')]]">
								</d2l-menu-item>
								<d2l-menu-item on-d2l-menu-item-select="_pinClickHandler" hidden$="[[_shouldHideUnpinOption(_pinned)]]" text="[[localize('unpin')]]">
								</d2l-menu-item>
							</d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown-more>

					<d2l-button-icon slot="actions" translucent="" hidden$="[[_shouldHideUnpinOption(_pinned)]]" text="[[localize('coursePinButton', 'course', _organizationName)]]" icon="tier1:pin-filled" on-tap="_pinClickHandler" on-keypress="_pinPressHandler">
					</d2l-button-icon>
				</template>

				<div slot="content" class="d2l-enrollment-card-alert-colour-circle" hidden$="[[!_newEnrollment]]"></div>

				<template is="dom-repeat" items="[[_notifications]]" as="notification">
					<d2l-card-footer-link slot="footer" id="[[notification.key]]" icon="[[notification.icon]]" text="[[notification.ariaLabel]]" href="[[notification.link]]" secondary-count="[[_toNumber(notification.updateCount)]]">
						<d2l-tooltip slot="tooltip" class="d2l-enrollment-card-updates-tooltip d2l-body-small" for="[[notification.key]]" position="top">
							<ul>
								<template is="dom-repeat" items="[[notification.toolTip]]" as="item">
									<li>[[item]]</li>
								</template>
							</ul>
						</d2l-tooltip>
					</d2l-card-footer-link>
				</template>
			</d2l-card>`
    }
    connectedCallback() {
        super.connectedCallback(), window.addEventListener("set-course-image", this._boundOnSetCourseImage), this._notificationMap = {
            UnreadAssignmentFeedback: {
                key: "unreadAssignmentFeedback",
                toolTip: "unreadAssignmentFeedback",
                icon: "d2l-tier1:assignments",
                order: 1
            },
            UnreadAssignmentSubmissions: {
                key: "unreadAssignmentFeedback",
                toolTip: "unreadAssignmentSubmissions",
                icon: "d2l-tier1:assignments",
                order: 1
            },
            UnreadDiscussions: {
                key: "unreadDiscussionFeedback",
                toolTip: "unreadDiscussions",
                icon: "d2l-tier1:comment-filled",
                order: 2
            },
            UnapprovedDiscussions: {
                key: "unreadDiscussionFeedback",
                toolTip: "unapprovedDiscussions",
                icon: "d2l-tier1:comment-filled",
                order: 2
            },
            UnattemptedQuizzes: {
                key: "unreadQuizzesFeedback",
                toolTip: "unattemptedQuizzes",
                icon: "d2l-tier1:quizzing",
                order: 3
            },
            UngradedQuizzes: {
                key: "unreadQuizzesFeedback",
                toolTip: "ungradedQuizzes",
                icon: "d2l-tier1:quizzing",
                order: 3
            },
            PendingEnrollmentRequests: {
                key: "pendingEnrollmentRequests",
                toolTip: "pendingEnrollmentRequests",
                icon: "d2l-tier1:enrollment",
                order: 4
            }
        }, this._notificationsData && this.getLoadingComplete().then(() => {
            this._createNotificationsArray(this._notificationsData)
        }).catch(() => {}), r(this, () => {
            const e = this.$$("d2l-card"),
                t = new IntersectionObserver(((t, s) => {
                    if (!this._load)
                        for (let o = 0; o < t.length; o++)
                            if (t[o].intersectionRatio > 0) {
                                s.unobserve(e), this.fire("initially-visible-course-tile"), this._load = !0;
                                break
                            }
                }).bind(this));
            t.observe(e), requestIdleCallback(() => {
                this._load || (t.unobserve(e), this._load = !0)
            })
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback(), window.removeEventListener("set-course-image", this._boundOnSetCourseImage)
    }
    focusDropdownOpener() {
        const e = this.shadowRoot.querySelector("d2l-dropdown-more");
        return !!e && (e.getOpenerElement().focus(), !0)
    }
    ready() {
        super.ready(), u.requestAvailability(), this._boundOnSetCourseImage = this._onSetCourseImage.bind(this)
    }
    refreshImage(e) {
        if (e && e.properties.orgUnitId !== this._orgUnitId) return;
        const t = {
            bustCache: Math.random()
        };
        this._organizationImageUrl = U(this._organizationImageUrl, t)
    }
    _accessibilityDataReset() {
        const e = this._accessibilityData;
        this._accessibilityData = {}, this._accessibilityData = e
    }
    _accessibilityDataToString(e) {
        if (!e || !e.organizationName) return this.localize("closed");
        return [e.new, e.disabled, e.badge, e.organizationName, e.organizationCode, e.semesterName, e.userActivityUsageInfo ? e.userActivityUsageInfo : e.organizationDate].filter(e => e && "string" == typeof e).join(", ")
    }
    _displaySetImageResult(e, t) {
        setTimeout(() => {
            const s = this.$$(".d2l-enrollment-card-icon-container d2l-icon");
            s.classList.remove("d2l-enrollment-card-checkmark"), s.classList.remove("d2l-enrollment-card-fail-icon");
            const o = e ? "tier2:check" : "tier3:close",
                n = e ? "d2l-enrollment-card-checkmark" : "d2l-enrollment-card-fail-icon";
            s.setAttribute("icon", o), s.classList.add(n), this._imageLoadingProgress = !1, e && !t && this.refreshImage(), setTimeout(() => {
                this._imageLoading = !1
            }, 1e3)
        }, 1e3)
    }
    _handleBadgeTextChange(e) {
        this._accessibilityData.badge = e ? this.localize(e) : null, this._accessibilityDataReset()
    }
    _handleEnrollmentNew() {
        this._newEnrollment = !0, this._accessibilityData.new = this.localize("new"), this._accessibilityDataReset(), this.fire("d2l-enrollment-new")
    }
    _handlePinnedChange(e) {
        e ? this.setAttribute("pinned", "") : this.removeAttribute("pinned")
    }
    updateNotifications(e) {
        if (!e) return;
        this.enrollment && (this.enrollment._notificationsData = e), this._notificationsData = e;
        this.getLoadingComplete().then(() => {
            this._notificationMap && this._createNotificationsArray(this._notificationsData)
        }).catch(() => {})
    }
    _launchCourseImageSelector() {
        this.fire("open-change-image-view", {
            organization: this._organization
        })
    }
    _loadEnrollmentData(e, t) {
        this._resetState(), e && t && (t._notificationsData && (this._notificationsData = t._notificationsData), this._organizationDisplayName = t.Name, this._organizationCode = t.Code, this._organizationHomepageUrl = `/d2l/home/${t.OrgUnitId}`, this._pinned = 0 === t.PinState, this._organizationName = this._organizationDisplayName, this._organizationImageUrl = t.FormattedImageLink, this._semesterName = t.SemesterName, this._canChangeCourseImage = t.CanSeeCourseInformation, this._canAccessCourseInfo = t.CanSeeCourseInformation, this._courseInfoUrl = t.CourseInformationRoute, this._orgUnitId = t.OrgUnitId, this.disabled = !t.CanAccessCourse, !0 === t.IsNewEnrollment && this._handleEnrollmentNew(), this._organization = {
            class: ["organization"],
            properties: {
                orgUnitId: t.OrgUnitId,
                name: t.Name,
                code: t.Code
            },
            entities: [],
            actions: [{
                name: "set-catalog-image",
                method: "POST",
                href: `/d2l/api/lp/1.47/courses/${t.OrgUnitId}/image`,
                fields: [{
                    name: "imagePath",
                    type: "text",
                    value: ""
                }]
            }],
            links: [{
                rel: ["course-offering-info-page"],
                href: `${t.CourseInformationRoute}`
            }, {
                rel: ["self"],
                href: `/d2l/api/hm/organizations/${t.OrgUnitId}`
            }, {
                rel: ["https://api.brightspace.com/rels/organization-image"],
                href: t.FormattedImageLink || `/d2l/api/hm/organizations/${t.OrgUnitId}/image`
            }, {
                rel: ["edit"],
                href: `/d2l/api/hm/organizations/${t.OrgUnitId}`
            }, {
                rel: ["https://api.brightspace.com/rels/organization-homepage"],
                href: `/d2l/home/${t.OrgUnitId}`
            }]
        }, this._imageLoaded = !1, this._imageError = !1, this.inactive = !t.IsActive, this._organizationImageUrl ? this._preloadImage(this._organizationImageUrl) : this._imageError = !0, this._loadLocalizedData(t))
    }
    async _loadLocalizedData(e) {
        await this._getLocalizedData(e), this.fire("d2l-enrollment-card-fetched", {
            enrollmentUrl: this.href
        })
    }
    async _onLanguageChange(e, t) {
        t && await this._getLocalizedData(t)
    }
    async _getLocalizedData(e) {
        await this.getLoadingComplete(), this._imageAlt = this.localize("courseImageAlt", "courseName", this._organizationDisplayName);
        let t = !1;
        (e.DueDate || e.CompletionDate) && (t = this._setActivityUsageDateFromEnrollment(e)), t || !e.StartDate && !e.EndDate || this._setOrganizationDateFromEnrollment(e), this._setOrganizationAccessibleData(this._organizationDisplayName, this._organizationCode, this._organizationDateText), this._semesterName && this._setSemesterAccessibleData(this._semesterName), this._setBadgeText(), this._createNotificationsArray(this._notificationsData)
    }
    _onSetCourseImage(e) {
        if (!e.detail.organization || e.detail.organization.properties.orgUnitId !== this._orgUnitId) return;
        this._imageLoading = !0;
        switch (e.detail.status) {
            case "set":
            case "success":
                this._displaySetImageResult(!0, !1);
                break;
            default:
                this._displaySetImageResult(!1, !0)
        }
    }
    _pinClickHandler() {
        this.fire(this._pinned ? "enrollment-pinned" : "enrollment-unpinned", {
            enrollment: this.enrollment,
            organization: this._organization
        });
        const e = this._pinned ? "unpinActionResult" : "pinActionResult";
        this.fire("iron-announce", {
            text: this.localize(e, "course", this._organizationName)
        }, {
            bubbles: !0
        }), this._pinned = !this._pinned, this.fire("d2l-course-pinned-change", {
            enrollment: this.enrollment,
            isPinned: this._pinned
        })
    }
    _pinPressHandler(e) {
        "Space" !== e.code && "Enter" !== e.code || this._pinClickHandler()
    }
    _resetState() {
        this._notificationsData = null, this._beforeStartDate = !1, this.disabled = !1, this.closed = !1, this.overdue = !1, this.completed = !1, this.inactive = !1, this._newEnrollment = !1, this._organizationDateText = null, this._semesterName = null, this._organizationCode = null, this._imageAlt = null, this._notificationsData = null, this._notifications = [], this._setBadgeText()
    }
    _setBadgeText() {
        const e = [
            [this.completed, "completed", "success"],
            [this._beforeStartDate && !this.inactive, null, null],
            [this.inactive, "inactive", "default"],
            [this.closed && !this.inactive, "closed", "default"],
            [this.overdue, "overdue", "alert"]
        ];
        for (let t = 0; t < e.length; t++)
            if (e[t][0]) return this._badgeText = e[t][1], void(this._badgeState = e[t][2]);
        this._badgeText = null, this._badgeState = null
    }
    _setOrganizationAccessibleData(e, t, s) {
        this._accessibilityData.organizationName = e || this._organizationDisplayName, this._accessibilityData.organizationCode = t || this._organizationCode, this._accessibilityData.organizationDate = s || this._organizationDateText, this._accessibilityDataReset()
    }
    _setSemesterAccessibleData(e) {
        this._accessibilityData.semesterName = e, this._accessibilityDataReset()
    }
    _setUserActivityUsageAccessible(e) {
        this._accessibilityData.userActivityUsageInfo = e, this._accessibilityDataReset()
    }
    _shouldHidePinOption(e) {
        return this.hidePinning || e
    }
    _shouldHideUnpinOption(e) {
        return this.hidePinning || !e
    }
    _computeShowBothMetadata(e, t, s, o) {
        return e && t && (s && o)
    }
    _shouldShowCourseCode(e, t) {
        return e && t
    }
    _shouldShowSemester(e, t) {
        return e && t
    }
    _computeHref(e, t) {
        return e ? null : t
    }
    _shouldShowDropDown(e, t) {
        return !this.hidePinning || e || t
    }
    _startedInactive(e, t, s) {
        e || t || !s ? this.removeAttribute("started-inactive") : (this.setAttribute("started-inactive", ""), this.fire("started-inactive"))
    }
    _setActivityUsageDateFromEnrollment(e) {
        const t = !!e.CompletionDate,
            s = e.CompletionDate || e.DueDate;
        if (!s) return !1;
        const o = this.dateTextAndStatus(t, s);
        return !!o && (this._organizationDateText = o.dateText, this._setUserActivityUsageAccessible(o.dateText), "completed" === o.status ? this.completed = !0 : "overdue" === o.status && (this.overdue = !0), !0)
    }
    _setOrganizationDateFromEnrollment(n) {
        const i = new Date;
        let r = "";
        if (n.StartDate) {
            const a = s(n.StartDate),
                l = o(a),
                d = new Date(l.year, l.month - 1, l.date, l.hours, l.minutes, l.seconds);
            d > i && (this._beforeStartDate = !0, this.showCourseStartDate && (r = this.localize("startsAt", "date", e(d, {
                format: "MMMM d, yyyy"
            }), "time", t(d))))
        }
        if (n.EndDate && !r) {
            const a = s(n.EndDate),
                l = o(a),
                d = new Date(l.year, l.month - 1, l.date, l.hours, l.minutes, l.seconds);
            d > i ? this.showCourseEndDate && (r = this.localize("endsAt", "date", e(d, {
                format: "MMMM d, yyyy"
            }), "time", t(d))) : (this.closed = !0, this.showCourseEndDate && (r = this.localize("ended", "date", e(d, {
                format: "MMMM d, yyyy"
            }), "time", t(d))))
        }
        this._organizationDateText = r
    }
    _preloadImage(e) {
        if (!e) return void(this._imageError = !0);
        const t = new Image;
        t.onload = () => this._onImageLoad(), t.onerror = () => this._onImageError(), t.src = e
    }
    _onImageLoad() {
        this._imageLoaded = !0, this._imageError = !1
    }
    _onImageError() {
        this._imageLoaded = !1, this._imageError = !0
    }
    _createNotificationsArray(e) {
        const t = [],
            s = {};
        if (!e) return void(this._notifications = t);
        const o = [];
        this.showDropboxUnreadFeedback && e.UnreadAssignmentFeedback > 0 && o.push({
            key: "UnreadAssignmentFeedback",
            count: e.UnreadAssignmentFeedback,
            link: e.UnreadAssignmentFeedbackLocation
        }), this.showUnreadDropboxSubmissions && e.UnreadAssignmentSubmissions > 0 && o.push({
            key: "UnreadAssignmentSubmissions",
            count: e.UnreadAssignmentSubmissions,
            link: e.UnreadAssignmentSubmissionsLocation
        }), this.showUnreadDiscussionMessages && e.UnreadDiscussions > 0 && o.push({
            key: "UnreadDiscussions",
            count: e.UnreadDiscussions,
            link: e.UnreadDiscussionsLocation
        }), this.showUnreadDiscussionMessages && e.UnapprovedDiscussions > 0 && o.push({
            key: "UnapprovedDiscussions",
            count: e.UnapprovedDiscussions,
            link: e.UnapprovedDiscussionsLocation
        }), this.showUngradedQuizAttempts && e.UngradedQuizzes > 0 && o.push({
            key: "UngradedQuizzes",
            count: e.UngradedQuizzes,
            link: e.UngradedQuizzesLocation
        }), this.showUnattemptedQuizzes && e.UnattemptedQuizzes > 0 && o.push({
            key: "UnattemptedQuizzes",
            count: e.UnattemptedQuizzes,
            link: e.UnattemptedQuizzesLocation
        }), this.showPendingEnrollmentRequests && e.PendingEnrollmentRequests > 0 && o.push({
            key: "PendingEnrollmentRequests",
            count: e.PendingEnrollmentRequests,
            link: e.PendingEnrollmentRequestLocation
        }), o.forEach(e => {
            const t = e.key,
                o = this._notificationMap[t].key;
            s[o] || (s[o] = {
                key: o,
                order: this._notificationMap[t].order,
                icon: this._notificationMap[t].icon,
                tooltips: [],
                link: e.link,
                totalCount: 0
            });
            const n = this.localize(this._notificationMap[t].toolTip, "number", e.count);
            s[o].tooltips.push(n), s[o].totalCount += e.count
        }), Object.values(s).forEach(e => {
            const s = e.totalCount > 99 ? "99+" : e.totalCount,
                o = {
                    key: e.key,
                    order: e.order,
                    updateCount: s,
                    toolTip: e.tooltips,
                    ariaLabel: e.tooltips.join(", "),
                    icon: e.icon,
                    link: e.link
                };
            t.push(o)
        }), this._notifications = t.sort((e, t) => e.order > t.order ? 1 : -1)
    }
    _toNumber(e) {
        return "number" == typeof e ? e : "99+" === e ? 100 : parseInt(e)
    }
}
window.customElements.define(A.is, A);
window.customElements.define("d2l-my-courses-card-grid-v2", class extends p {
    static get properties() {
        return {
            filteredEnrollments: {
                type: Array
            },
            hidePastCourses: {
                attribute: "hide-past-courses",
                reflect: !0,
                type: Boolean
            },
            loading: {
                type: Boolean
            },
            widgetView: {
                attribute: "widget-view",
                reflect: !0,
                type: Boolean
            },
            showCourseCode: Boolean,
            showSemesterName: Boolean,
            showCourseStartDate: Boolean,
            showCourseEndDate: Boolean,
            _numColumns: {
                attribute: !1,
                type: Number
            },
            showDropboxUnreadFeedback: Boolean,
            showPendingEnrollmentRequests: Boolean,
            showUnattemptedQuizzes: Boolean,
            showUngradedQuizAttempts: Boolean,
            showUnreadDiscussionMessages: Boolean,
            showUnreadDropboxSubmissions: Boolean
        }
    }
    static get styles() {
        return [g `
			/* stylelint-disable custom-property-pattern */
			:host {
				--course-image-card-height: 0; /* Recalculated in onResize, so initial value is meaningless */
				display: block;
			}
			.course-card-grid {
				column-gap: 15px;
				display: -ms-grid;
				display: grid;
			}
			.course-card-grid.columns-1 {
				-ms-grid-columns: 100%;
				grid-template-columns: 100%;
			}
			.course-card-grid.columns-2 {
				-ms-grid-columns: 1fr 15px 1fr;
				grid-template-columns: repeat(2, 1fr);
			}
			.course-card-grid.columns-3 {
				-ms-grid-columns: 1fr 15px 1fr 15px 1fr;
				grid-template-columns: repeat(3, 1fr);
			}
			.course-card-grid.columns-4 {
				-ms-grid-columns: 1fr 15px 1fr 15px 1fr 15px 1fr;
				grid-template-columns: repeat(4, 1fr);
			}

			.course-card-grid div,
			.course-card-grid d2l-my-courses-enrollment-card {
				min-width: 0;
			}

			.course-card-grid d2l-my-courses-enrollment-card {
				--course-image-height: var(--course-image-card-height);
				box-sizing: border-box;
				height: 100%;
				padding-bottom: 0.75rem;
			}

			:host([widget-view]) .course-card-grid d2l-my-courses-enrollment-card:nth-of-type(n+13):not([pinned]),
			:host([hide-past-courses]) .course-card-grid d2l-my-courses-enrollment-card[closed]:not([pinned]) {
				display: none;
			}

			d2l-loading-spinner {
				margin: auto;
				padding-bottom: 20px;
				width: 100%;
			}
			/* stylelint-enable custom-property-pattern */
		`]
    }
    constructor() {
        super(), this.onResize = this.onResize.bind(this), this.filteredEnrollments = [], this.hidePastCourses = !1, this.loading = !1, this.widgetView = !1, this._numColumns = 0
    }
    updated(e) {
        super.updated(e)
    }
    connectedCallback() {
        super.connectedCallback(), window.addEventListener("resize", this.onResize), requestAnimationFrame(() => {
            this.onResize()
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback(), window.removeEventListener("resize", this.onResize)
    }
    render() {
        let e = () => ({});
        return void 0 === document.body.style["grid-template-columns"] && (e = e => ({
            "-ms-grid-column": 2 * (e % this._numColumns + 1) - 1,
            "-ms-grid-row": Math.floor(e / this._numColumns) + 1
        })), this.loading ? _ `
			<d2l-loading-spinner size="100">
			</d2l-loading-spinner>
			` : _ `
			<slot></slot>
			<div class="course-card-grid columns-${this._numColumns}">
				${this.filteredEnrollments.map((t,s)=>_`
					<d2l-my-courses-enrollment-card
						id="enrollment-card-${t.OrgUnitId}"
						style=${b(e(s))}
						.enrollment="${t}"
						?show-course-start-date="${this.showCourseStartDate}"
						?show-course-end-date="${this.showCourseEndDate}"
						?show-course-code="${this.showCourseCode}"
						?show-semester-name="${this.showSemesterName}"
						?show-dropbox-unread-feedback="${this.showDropboxUnreadFeedback}"
						?show-pending-enrollment-requests="${this.showPendingEnrollmentRequests}"
						?show-unattempted-quizzes="${this.showUnattemptedQuizzes}"
						?show-ungraded-quiz-attempts="${this.showUngradedQuizAttempts}"
						?show-unread-discussion-messages="${this.showUnreadDiscussionMessages}"
						?show-unread-dropbox-submissions="${this.showUnreadDropboxSubmissions}"
					></d2l-my-courses-enrollment-card>
				`)}
			</div>
		`
    }
    onResize() {
        if (!(this.shadowRoot && this.shadowRoot.querySelector(".course-card-grid"))) return;
        let e = this.offsetWidth;
        for (let t = this.parentNode; e <= 0 && t; t = t.parentNode) e = t.offsetWidth;
        isNaN(e) || (this._numColumns = Math.min(Math.floor(e / 350), 4) + 1, this.style.setProperty("--course-image-card-height", e / this._numColumns * .43 + "px"))
    }
    refreshCardGridImages(e) {
        if (!this.shadowRoot) return;
        const t = this.shadowRoot.querySelectorAll("d2l-my-courses-enrollment-card");
        for (let s = 0; s < t.length; s++) t[s].refreshImage(e)
    }
    spliceEnrollments(e, t, s) {
        s ? this.filteredEnrollments.splice(e, t, s) : this.filteredEnrollments.splice(e, t), this.requestUpdate()
    }
    updateCardPinState(e, t) {
        const s = this.shadowRoot.querySelectorAll("d2l-my-courses-enrollment-card");
        s[e] && (s[e]._pinned = t)
    }
});
const D = document.createElement("template");
D.innerHTML = '<dom-module id="d2l-search-listbox">\n\t<template strip-whitespace="">\n\t\t<style>\n\t\t\t:host {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tdisplay: block;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t::slotted(div) {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tborder-top: 1px solid transparent;\n\t\t\t\tborder-bottom: 1px solid var(--d2l-color-gypsum);\n\t\t\t\tlist-style-type: none;\n\t\t\t\twidth: calc(100% - 2px);\n\t\t\t\tpadding: 0.75rem 1.5rem;\n\t\t\t\tcursor: pointer;\n\t\t\t\toutline: none;\n\t\t\t}\n\n\t\t\t::slotted(div:last-of-type) {\n\t\t\t\tborder-bottom-color: transparent;\n\t\t\t}\n\n\t\t\t::slotted(*:not([disabled]):focus),\n\t\t\t::slotted(*:not([disabled]):hover) {\n\t\t\t\tbackground-color: var(--d2l-color-celestine-plus-2);\n\t\t\t\tborder-top-color: var(--d2l-color-celestine);\n\t\t\t\tborder-bottom-color: var(--d2l-color-celestine);\n\t\t\t\tcolor: var(--d2l-color-celestine-minus-1);\n\t\t\t}\n\n\t\t\t::slotted([data-list-title]) {\n\t\t\t\tpadding-top: 1rem;\n\t\t\t\tpadding-bottom: 1rem;\n\t\t\t\tmargin: 0 !important;\n\t\t\t\tcursor: default;\n\t\t\t\tborder-bottom-color: var(--d2l-color-mica);\n\t\t\t}\n\n\t\t\t::slotted([data-list-title]+div) {\n\t\t\t\tbackground: -moz-linear-gradient(to top, white, var(--d2l-color-regolith));\n\t\t\t\tbackground: -webkit-linear-gradient(to top, white, var(--d2l-color-regolith));\n\t\t\t\tbackground: linear-gradient(to top, white, var(--d2l-color-regolith));\n\t\t\t}\n\t\t</style>\n\t\t<slot></slot>\n\t</template>\n\t\n</dom-module>', document.head.appendChild(D.content), f({
    is: "d2l-search-listbox-v2",
    properties: {
        owner: Object
    },
    hostAttributes: {
        role: "listbox",
        tabindex: -1
    },
    behaviors: [d, c],
    hasItems: function() {
        return this.items.filter(e => {
            if (e.hasAttribute("role") && "option" === e.getAttribute("role") && !e.hasAttribute("disabled")) return !0
        }).length > 0
    },
    focusLast: function() {
        for (let e = this.items.length - 1; e >= 0; e--) {
            const t = this.items[e];
            if (!t.hasAttribute("disabled")) return void this._setFocusedItem(t)
        }
    },
    _focusPrevious: function() {
        const e = this.items.length,
            t = this.indexOf(this.focusedItem);
        for (let s = 1; s < e + 1; s++) {
            const o = (t - s + e) % e,
                n = this.items[o];
            if (this.owner && o === e - 1) return this._setFocusedItem(null), void this.owner.focus();
            if (!n.hasAttribute("disabled")) return void this._setFocusedItem(n)
        }
    },
    _focusNext: function() {
        const e = this.items.length,
            t = this.indexOf(this.focusedItem);
        for (let s = 1; s < e + 1; s++) {
            const o = (t + s) % e,
                n = this.items[o];
            if (this.owner && t > o && 0 === o) return this._setFocusedItem(null), void this.owner.focus();
            if (!n.hasAttribute("disabled")) return void this._setFocusedItem(n)
        }
    },
    _onKeydown: function(e) {
        "keydown" === e.detail.event && (this.keyboardEventMatchesKeys(e, "space") || this.keyboardEventMatchesKeys(e, "enter")) && (e.preventDefault(), this.focusedItem && !this.focusedItem.hasAttribute("disabled") && this.fire("iron-activate", {
            item: this.focusedItem
        }))
    },
    _resetTabindices: function() {
        for (let e = 0; e < this.items.length; e++) this.items[e].setAttribute("tabindex", -1)
    },
    _focusedItemChanged: function(e) {
        e && e.focus()
    },
    keyBindings: {
        enter: "_onKeydown",
        space: "_onKeydown"
    }
});
class I extends(l(n)) {
    static get properties() {
        return {
            _previousSearches: {
                type: Array,
                value: function() {
                    return []
                }
            },
            _dropdownWidth: Number,
            _keyCodes: {
                type: Object,
                value: {
                    DOWN: 40,
                    UP: 38
                }
            }
        }
    }
    static get template() {
        return i `
		<style>
			d2l-dropdown {
				min-width: 100%;
			}
			.d2l-search-custom-item {
				@apply --d2l-body-compact-text;
			}
		</style>

		<d2l-dropdown no-auto-open>
			<div class="d2l-dropdown-opener">
				<d2l-input-search
					on-d2l-input-search-searched="_onInputSearched"
					on-blur="_onSearchInputBlur"
					on-focus="_onSearchInputFocused"
					on-keydown="_onSearchInputKeyPressed"
					label="[[localize('search_searchCourses')]]"
					placeholder="[[localize('courseSearchInputPlaceholder')]]">
				</d2l-input-search>
			</div>
			<d2l-dropdown-content 
				align="start"
				max-width="[[_dropdownWidth]]"
				min-width="[[_dropdownWidth]]"
				no-auto-close
				no-auto-focus
				no-padding
				no-pointer
				vertical-offset="5">
				<d2l-search-listbox-v2>
					<div data-list-title disabled>[[localize('recentSearches')]]</div>
					<template is="dom-repeat" items="[[_previousSearches]]">
						<div class="d2l-search-custom-item" selectable data-text$="[[item]]" role="option">
							[[item]]
						</div>
					</template>
				</d2l-search-listbox-v2>
			</d2l-dropdown-content>
		</d2l-dropdown>`
    }
    ready() {
        super.ready(), this._handleFocusBound = this._handleFocus.bind(this), this._handleClickBound = this._handleClick.bind(this)
    }
    connectedCallback() {
        super.connectedCallback(), document.body.addEventListener("focus", this._handleFocusBound, !0), document.body.addEventListener("click", this._handleClickBound, !0), r(this, () => {
            this.addEventListener("iron-activate", this._onIronActivate)
        }), this._initializePreviousSearches()
    }
    disconnectedCallback() {
        super.disconnectedCallback(), document.body.removeEventListener("focus", this._handleFocusBound, !0), document.body.removeEventListener("click", this._handleClickBound, !0)
    }
    clear() {
        const e = this._getSearchInput();
        e.value = "", e.search()
    }
    _getSearchInput() {
        return this.shadowRoot.querySelector("d2l-input-search")
    }
    _getListbox() {
        return this.shadowRoot.querySelector("d2l-search-listbox")
    }
    _getDropdownContent() {
        return this.shadowRoot.querySelector("d2l-dropdown-content")
    }
    _onInputSearched(e) {
        this._addSearchToHistory(e.detail.value), this.dispatchEvent(new CustomEvent("d2l-my-courses-search-change", {
            bubbles: !0,
            composed: !1,
            detail: {
                value: e.detail.value
            }
        }))
    }
    _initializePreviousSearches() {
        if (window.localStorage.getItem("myCourses.previousSearches")) try {
            const e = JSON.parse(window.localStorage.getItem("myCourses.previousSearches"));
            e.hasOwnProperty("searches") && e.searches instanceof Array && (this._previousSearches = e.searches)
        } catch {
            window.localStorage.removeItem("myCourses.previousSearches"), this._previousSearches = []
        }
    }
    _addSearchToHistory(e) {
        if ("" !== e.trim()) {
            for (let t = 0; t < this._previousSearches.length; t++) e === this._previousSearches[t] && this.splice("_previousSearches", t, 1);
            this.unshift("_previousSearches", e), this._previousSearches.length > 5 && this.splice("_previousSearches", 5, this._previousSearches.length - 5);
            try {
                window.localStorage.setItem("myCourses.previousSearches", JSON.stringify({
                    searches: this._previousSearches
                }))
            } catch {}
        }
    }
    _onIronActivate(e) {
        const t = e.detail.item.dataset.text;
        if (t) {
            const e = this._getSearchInput();
            e.value = t, e.search()
        }
        e.stopPropagation()
    }
    _onSearchInputFocused() {
        const e = this._getDropdownContent();
        e.opened || (this.set("_dropdownWidth", this._getSearchInput().offsetWidth), this._previousSearches.length > 0 && e.open())
    }
    _onSearchInputKeyPressed(e) {
        switch (e.keyCode) {
            case this._keyCodes.DOWN:
                this._getListbox().hasItems() && this._getListbox().focus(), e.preventDefault();
                break;
            case this._keyCodes.UP:
                this._getListbox().hasItems() && this._getListbox().focusLast(), e.preventDefault()
        }
    }
    _onSearchInputBlur(e) {
        const t = e.relatedTarget ? e.relatedTarget.className : "";
        e.relatedTarget !== this._getListbox() && -1 === t.indexOf("d2l-search-custom-item") && this._getDropdownContent().close()
    }
    _handleFocus() {
        this._checkFocusLost(document.activeElement)
    }
    _handleClick(e) {
        this._checkFocusLost(e.composedPath()[0])
    }
    _checkFocusLost(e) {
        const t = this._getDropdownContent();
        t.opened && !y(this, e) && t.close()
    }
}
window.customElements.define("d2l-my-courses-search-v2", I);
class E extends(h(p)) {
    static get properties() {
        return {
            filterCategories: {
                type: Array
            }
        }
    }
    constructor() {
        super(), this.filterCategories = []
    }
    clear() {
        const e = this.shadowRoot.querySelector("d2l-filter");
        e && e.requestFilterClearAll()
    }
    updated(e) {
        super.updated(e)
    }
    render() {
        return _ `
			<d2l-filter
				@d2l-filter-change="${this._onFilterChange}"
				@d2l-filter-dimension-first-open="${this._onDimensionFirstOpen}"
				@d2l-filter-dimension-search="${this._onDimensionSearch}">

				${this.filterCategories.map(e=>_`
					<d2l-filter-dimension-set
						key="${e.key}"
						text="${S(e.name)}"
						?loading="${!e.optionsLoaded}"
						search-type="${e.apiSearch?"manual":"automatic"}">

						${e.options.map(t=>_`
							<d2l-filter-dimension-set-value
								key="${t.key}"
								text="${S(t.name)}"
								?selected="${e.selectedOptions.findIndex(e=>e===t.key)>-1}">
							</d2l-filter-dimension-set-value>
						`)}
					</d2l-filter-dimension-set>
				`)}
			</d2l-filter>
		`
    }
    _loadOptions(e) {
        e && !e.optionsLoaded && z(e.apiUrl).then(t => {
            this._parseFilterOptions(e, t)
        })
    }
    _parseFilterOptions(e, t) {
        const s = [];
        if (t && t.length > 0)
            for (let o = 0; o < t.length; o++)
                if ("departments" === e.key || "semesters" === e.key) {
                    s.find(e => e.key === t[o].OrgUnitId) || s.push({
                        name: t[o].Name,
                        key: t[o].OrgUnitId
                    })
                } else if ("roles" === e.key) {
            s.find(e => e.key === t[o].RoleId) || s.push({
                name: t[o].Name,
                key: t[o].RoleId
            })
        }
        e.options = s, e.optionsLoaded = !0, this.requestUpdate()
    }
    _onDimensionFirstOpen(e) {
        const t = this.filterCategories.find(t => t.key === e.detail.key);
        this._loadOptions(t)
    }
    _onDimensionSearch(e) {
        if ("" === e.detail.value) return void e.detail.searchCompleteCallback({
            displayAllKeys: !0
        });
        z(U(this.filterCategories.find(t => t.key === e.detail.key).apiUrl, {
            search: encodeURIComponent(e.detail.value)
        })).then(t => {
            let s = [];
            t && (s = t.map(e => e.OrgUnitId)), e.detail.searchCompleteCallback({
                keysToDisplay: s
            })
        })
    }
    _onFilterChange(e) {
        if (e.detail.allCleared) return this.filterCategories.forEach(e => {
            e.selectedOptions = []
        }), void this.dispatchEvent(new CustomEvent("d2l-my-courses-filter-clear"));
        const t = new Set;
        e.detail.dimensions.forEach(e => {
            t.add(e.dimensionKey);
            const s = this.filterCategories.find(t => t.key === e.dimensionKey);
            e.cleared ? s.selectedOptions = [] : e.changes.forEach(e => {
                const t = s.selectedOptions.findIndex(t => t === e.valueKey);
                e.selected ? -1 === t && s.selectedOptions.push(e.valueKey) : t > -1 && s.selectedOptions.splice(t, 1)
            })
        });
        const s = new Map;
        this.filterCategories.forEach(e => s.set(e.key, e.selectedOptions)), this.dispatchEvent(new CustomEvent("d2l-my-courses-filter-change", {
            detail: {
                changedCategories: t,
                selectedFilters: s
            }
        }))
    }
}
window.customElements.define("d2l-my-courses-filter-v2", E);
class k {
    constructor(e, t, s, o) {
        this.key = e, this.name = t, this.apiUrl = s, this.apiSearch = o, this.options = [], this.optionsLoaded = !1, this.selectedOptions = []
    }
}
class x extends(l(n)) {
    static get is() {
        return "d2l-all-courses-v2"
    }
    static get properties() {
        return {
            advancedSearchUrl: String,
            filterStandardDepartmentName: String,
            filterStandardSemesterName: String,
            showImageError: {
                type: Boolean,
                value: !1
            },
            tabSearchActions: {
                type: Array,
                value: function() {
                    return []
                }
            },
            tabSearchType: String,
            orgUnitTypeIds: {
                type: Array,
                observer: "_onOrgUnitTypeIdsChange"
            },
            showCourseCode: Boolean,
            showSemesterName: Boolean,
            widgetId: String,
            showCourseStartDate: Boolean,
            showCourseEndDate: Boolean,
            showDropboxUnreadFeedback: Boolean,
            showPendingEnrollmentRequests: Boolean,
            showUnattemptedQuizzes: Boolean,
            showUngradedQuizAttempts: Boolean,
            showUnreadDiscussionMessages: Boolean,
            showUnreadDropboxSubmissions: Boolean,
            hasDepartments: Boolean,
            hasSemesters: Boolean,
            enrollmentsUrl: String,
            myNotificationsUrl: String,
            departmentsUrl: String,
            semestersUrl: String,
            rolesUrl: String,
            _actionParams: Object,
            _bustCacheToken: Number,
            _filterCategories: {
                type: Array,
                value: function() {
                    return []
                }
            },
            _filterCounts: {
                type: Object,
                value: function() {
                    return {
                        departments: 0,
                        semesters: 0,
                        roles: 0
                    }
                }
            },
            _hasEnrollmentsChanged: {
                type: Boolean,
                value: !1
            },
            _hasMoreEnrollments: {
                type: Boolean,
                computed: "_computeHasMoreEnrollments(_bookmark, _showTabContent)"
            },
            _infoMessageText: {
                type: String,
                value: null
            },
            _isSearched: Boolean,
            _bookmark: Object,
            _searchUrl: {
                type: String,
                observer: "_fetchEnrollments"
            },
            _selectedTab: Object,
            _showAdvancedSearchLink: {
                type: Boolean,
                value: !1,
                computed: "_computeShowAdvancedSearchLink(advancedSearchUrl)"
            },
            _showContent: {
                type: Boolean,
                value: !1
            },
            _showTabContent: {
                type: Boolean,
                value: !1
            },
            _appendEnrollments: {
                type: Boolean,
                value: !1
            },
            _sortMap: {
                type: Object,
                value: function() {
                    return {
                        Default: {
                            action: "Current",
                            promotePins: !0
                        },
                        OrgUnitName: {
                            action: "OrgUnitName,OrgUnitId",
                            promotePins: !1
                        },
                        OrgUnitCode: {
                            action: "OrgUnitCode,OrgUnitId",
                            promotePins: !1
                        },
                        PinDate: {
                            action: "-PinDate,OrgUnitId",
                            promotePins: !0
                        },
                        LastAccessed: {
                            action: "LastAccessed",
                            promotePins: !1
                        },
                        EnrollmentDate: {
                            action: "-LastModifiedDate,OrgUnitId",
                            promotePins: !1
                        }
                    }
                }
            }
        }
    }
    static get template() {
        return i `
			<style>
				:host {
					display: block;
				}
				d2l-alert {
					margin-bottom: 20px;
				}
				d2l-loading-spinner {
					margin-bottom: 30px;
					padding-bottom: 30px;
					margin: auto;
					width: 100%;
				}
				#search-and-filter {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					margin-bottom: 1rem;
					margin-top: -0.5rem;
				}
				.advanced-search-link {
					font-size: 0.8rem;
					margin-top: 3px;
				}
				.advanced-search-link[hidden] {
					display: none;
				}
				d2l-my-courses-search-v2 {
					min-width: 300px;
					width: 100%;
				}
				#search-and-link,
				#filter-and-sort {
					display: flex;
					margin-top: 0.5rem;
				}
				#search-and-link {
					flex: 1;
					flex-direction: row;
					flex-wrap: wrap;
				}
				#filter-and-sort {
					flex: 1.4;
					justify-content: flex-end;
				}
				d2l-my-courses-filter-v2,
				d2l-sort {
					margin-left: 0.5rem;
				}
				:host(:dir(rtl)) d2l-my-courses-filter-v2,
				:host(:dir(rtl)) d2l-sort {
					margin-left: 0;
					margin-right: 0.5rem;
				}
				#infoMessage {
					padding-bottom: 20px;
				}
			</style>

			<d2l-dialog-fullscreen
				id="all-courses"
				title-text="[[localize('allCourses')]]"
				on-d2l-dialog-open="_onDialogOpening"
     			on-d2l-dialog-close="_onDialogClosed">

				<div hidden$="[[!_showContent]]">

					<div id="search-and-filter">
						<div id="search-and-link">
							<d2l-my-courses-search-v2
								on-d2l-my-courses-search-change="_onSearchChange">
							</d2l-my-courses-search-v2>
							<d2l-link class="advanced-search-link" hidden$="[[!_showAdvancedSearchLink]]" href$="[[advancedSearchUrl]]">[[localize('advancedSearch')]]</d2l-link>
						</div>

						<div id="filter-and-sort">
							<d2l-my-courses-filter-v2
								on-d2l-my-courses-filter-change="_onFilterChange"
								on-d2l-my-courses-filter-clear="_onFilterClear"
								filter-categories="[[_filterCategories]]">
							</d2l-my-courses-filter-v2>

							<d2l-sort on-d2l-sort-change="_onSortOrderChanged">
								<d2l-sort-item value="Default" text="[[localize('sorting_sortDefault')]]"></d2l-sort-item>
								<d2l-sort-item value="OrgUnitName" text="[[localize('sorting_sortCourseName')]]"></d2l-sort-item>
								<d2l-sort-item value="OrgUnitCode" text="[[localize('sorting_sortCourseCode')]]"></d2l-sort-item>
								<d2l-sort-item value="PinDate" text="[[localize('sorting_sortDatePinned')]]"></d2l-sort-item>
								<d2l-sort-item value="LastAccessed" text="[[localize('sorting_sortLastAccessed')]]"></d2l-sort-item>
								<d2l-sort-item value="EnrollmentDate" text="[[localize('sorting_sortEnrollmentDate')]]"></d2l-sort-item>
							</d2l-sort>
						</div>
					</div>

				<d2l-alert hidden$="[[!showImageError]]" type="warning">
					[[localize('error_settingImage')]]
				</d2l-alert>
				<template is="dom-if" if="[[_tabSearchActionsCount(tabSearchActions)]]">
					<d2l-tabs on-d2l-tab-selected="_onTabSelected">
						<template items="[[tabSearchActions]]" is="dom-repeat">
							<d2l-tab id="all-courses-tab-[[item.name]]" text="[[item.title]]" slot="tabs" selected="[[item.selected]]" data-panel-id="all-courses-panel-[[item.name]]"></d2l-tab>
							<d2l-tab-panel id="all-courses-panel-[[item.name]]" labelled-by="all-courses-tab-[[item.name]]" slot="panels">
								<d2l-my-courses-card-grid-v2
									show-dropbox-unread-feedback="[[showDropboxUnreadFeedback]]"
									show-pending-enrollment-requests="[[showPendingEnrollmentRequests]]"
									show-unattempted-quizzes="[[showUnattemptedQuizzes]]"
									show-ungraded-quiz-attempts="[[showUngradedQuizAttempts]]"
									show-unread-discussion-messages="[[showUnreadDiscussionMessages]]"
									show-unread-dropbox-submissions="[[showUnreadDropboxSubmissions]]"
									loading="[[!_showTabContent]]" 
									show-course-code="[[showCourseCode]]"
									show-semester-name="[[showSemesterName]]"
									show-course-start-date="[[showCourseStartDate]]"
									show-course-end-date="[[showCourseEndDate]]">
									<span id="infoMessage" hidden$="[[!_infoMessageText]]">
										[[_infoMessageText]]
									</span>
								</d2l-my-courses-card-grid-v2>
							</d2l-tab-panel>
						</template>
					</d2l-tabs>
				</template>					<div id="scrollThreshold"></div>
					<d2l-loading-spinner id="lazyLoadSpinner" hidden$="[[!_hasMoreEnrollments]]" size="100">
					</d2l-loading-spinner>
				</div>
				<d2l-loading-spinner hidden$="[[_showContent]]" size="100">
				</d2l-loading-spinner>
			</d2l-dialog-fullscreen>`
    }
    ready() {
        super.ready(), this._actionParams = {
            autoPinCourses: !1,
            embedDepth: 0,
            orgUnitTypeId: this.orgUnitTypeIds,
            pageSize: 50,
            promotePins: this._sortMap.Default.promotePins,
            search: "",
            sort: this._sortMap.Default.action
        }
    }
    connectedCallback() {
        super.connectedCallback(), this._observer = new IntersectionObserver(this._onAllCoursesLowerThreshold.bind(this)), this._observer.observe(this.$.scrollThreshold)
    }
    disconnectedCallback() {
        this._observer.unobserve(this.$.scrollThreshold), super.disconnectedCallback()
    }
    courseEnrollmentChanged(e) {
        if (this.tabSearchActions.length > 1) {
            const t = this._getTabActionName();
            e.isPinned || t !== w.enrollments.searchMyPinnedEnrollments || (this._searchUrl = this._createFetchEnrollmentsUrl(!1));
            for (let e = 0; e < this.tabSearchActions.length; e++) this.tabSearchActions[e].hasEnrollmentsChanged = !0
        }
        this._hasEnrollmentsChanged = !0
    }
    open() {
        this._showContent = !!this._searchUrl, this.shadowRoot.querySelector("#all-courses").open(), this._setSelectedTabAndUrl()
    }
    refreshCardGridImages(e) {
        const t = this._getCardGrid();
        t && t.refreshCardGridImages(e)
    }
    _getTabActionName() {
        return this._selectedTab.name.replace("all-courses-tab-", "")
    }
    _getCardGrid() {
        return this._selectedTab ? this.shadowRoot.querySelector(`d2l-tab-panel[labelled-by="all-courses-tab-${this._selectedTab.name}"] d2l-my-courses-card-grid-v2`) : null
    }
    _onAllCoursesLowerThreshold(e) {
        for (let t = 0; t < e.length; t++)
            if (e[t].intersectionRatio > 0) {
                this.$["all-courses"].opened && this._bookmark && this._showTabContent && (this._searchUrl = this._createFetchEnrollmentsUrl(!0));
                break
            }
    }
    _onOrgUnitTypeIdsChange(e) {
        this._actionParams && (this._actionParams.orgUnitTypeId = e)
    }
    _onSortOrderChanged(e) {
        const t = this._sortMap[e.detail.value] || this._sortMap.Default;
        this._actionParams.sort = t.action, this._actionParams.promotePins = t.promotePins, this._invalidateOtherTabs(), this._searchUrl = this._createFetchEnrollmentsUrl(!1)
    }
    _onSearchChange(e) {
        this._isSearched = !!e.detail.value, this._actionParams.search = encodeURIComponent(e.detail.value), this._invalidateOtherTabs(), this._searchUrl = this._createFetchEnrollmentsUrl(!1)
    }
    async _onFilterChange(e) {
        this._invalidateOtherTabs(), this._showTabContent = !1;
        const t = e.detail.selectedFilters.get("departments") || [],
            s = e.detail.selectedFilters.get("semesters") || [],
            o = e.detail.selectedFilters.get("roles") || [];
        if (this._filterCounts = {
                departments: t.length,
                semesters: s.length,
                roles: o.length
            }, e.detail.changedCategories.has("semesters") || e.detail.changedCategories.has("departments")) {
            const e = s.concat(t);
            this._actionParams.parentOrgUnitIds = e.join(",")
        }
        e.detail.changedCategories.has("roles") && (this._actionParams.roles = o.join(",")), this._searchUrl = this._createFetchEnrollmentsUrl(!1)
    }
    _tabSearchActionsCount(e) {
        return e.length
    }
    _onFilterClear() {
        this._filterCounts = {
            departments: 0,
            semesters: 0,
            roles: 0
        }, this._clearParentOrganizationsAndRolesParams(), this._invalidateOtherTabs(), this._searchUrl = this._createFetchEnrollmentsUrl(!1)
    }
    _onDialogOpening() {
        this._hasEnrollmentsChanged && (this._hasEnrollmentsChanged = !1, this._searchUrl && (this._searchUrl = this._createFetchEnrollmentsUrl(!1)))
    }
    _onDialogClosed() {
        this._actionParams.search = "", this._actionParams.sort = this._sortMap.Default.action, this._actionParams.promotePins = this._sortMap.Default.promotePins, this._clearParentOrganizationsAndRolesParams(), this.shadowRoot.querySelector("d2l-my-courses-search-v2").clear(), this.shadowRoot.querySelector("d2l-my-courses-filter-v2").clear(), this.shadowRoot.querySelector('d2l-sort-item[value="Default"]').click(), this.dispatchEvent(new CustomEvent("d2l-all-courses-close"))
    }
    _invalidateOtherTabs() {
        for (let e = 0; e < this.tabSearchActions.length; e++) this.tabSearchActions[e].selected || (this.tabSearchActions[e].isLoaded = !1)
    }
    _clearParentOrganizationsAndRolesParams() {
        "BySemester" !== this.tabSearchType && "ByDepartment" !== this.tabSearchType && this._actionParams.parentOrgUnitIds && (this._actionParams.parentOrgUnitIds = ""), "ByRoleAlias" !== this.tabSearchType && this._actionParams.roles && (this._actionParams.roles = "")
    }
    _onTabSelected(e) {
        e.stopPropagation();
        const t = e.target.id.replace("all-courses-tab-", ""),
            s = !this._selectedTab || this._selectedTab.hasEnrollmentsChanged;
        for (let e = 0; e < this.tabSearchActions.length; e++) this.tabSearchActions[e].name === t ? (this.tabSearchActions[e].selected = !0, this._selectedTab = this.tabSearchActions[e], !this.tabSearchActions[e].isLoaded || s || this.tabSearchActions[e].hasEnrollmentsChanged ? (this._showTabContent = !1, this._searchUrl = this._createFetchEnrollmentsUrl(!1), this.tabSearchActions[e].isLoaded = !0, this.tabSearchActions[e].hasEnrollmentsChanged = !1) : (this._showTabContent = !0, this._bookmark = this.tabSearchActions[e].bookmark, this.tabSearchActions[e].hasEnrollmentsChanged = !1)) : this.tabSearchActions[e].selected = !1
    }
    _setSelectedTabAndUrl() {
        for (let e = 0; e < this.tabSearchActions.length; e++)
            if (this.tabSearchActions[e].selected) {
                this._selectedTab = this.tabSearchActions[e], this._showTabContent = !1, this._searchUrl = this._createFetchEnrollmentsUrl(!1), this.tabSearchActions[e].isLoaded = !0;
                break
            }
    }
    _fetchEnrollments(e) {
        z(e).then(e => {
            this._handleEnrollmentsEntity(e)
        })
    }
    _createFetchEnrollmentsUrl(e) {
        this._appendEnrollments = e;
        const t = JSON.parse(JSON.stringify(this._actionParams));
        this._getTabActionName() === w.enrollments.searchMyPinnedEnrollments && (t.pinned = !0), e && this._bookmark ? t.bookmark = this._bookmark : t.bookmark = "", this._selectedTab.orgUnitId && (t.parentOrgUnitIds = this._selectedTab.orgUnitId), this._selectedTab.roleId && (t.roles = this._selectedTab.roleId), this.widgetId && (t.widgetId = this.widgetId), t.bustCache = Math.random();
        const s = Object.keys(t).map(e => `${e}=${t[e]}`).join("&");
        return `${this.enrollmentsUrl}?${s}`
    }
    async _handleEnrollmentsEntity(e) {
        await this.getLoadingComplete(), this._updateFilteredEnrollments(e), this.myNotificationsUrl && e.Courses && e.Courses.length > 0 && this._fetchAndMergeNotifications(e.Courses), 0 === this._filterCategories.length && this._createFilterCategories(), this._showContent = !0, this._showTabContent = !0, setTimeout(() => {
            window.dispatchEvent(new Event("resize"))
        }, 10)
    }
    _createFilterCategories() {
        const e = [];
        this.hasSemesters && this.semestersUrl && "BySemester" !== this.tabSearchType && "ByDepartment" !== this.tabSearchType && e.push(new k("semesters", this.filterStandardSemesterName, this.semestersUrl, !0)), this.hasDepartments && this.departmentsUrl && "BySemester" !== this.tabSearchType && "ByDepartment" !== this.tabSearchType && e.push(new k("departments", this.filterStandardDepartmentName, this.departmentsUrl, !0)), this.rolesUrl && "ByRoleAlias" !== this.tabSearchType && e.push(new k("roles", this.localize("filtering_roles"), this.rolesUrl, !1)), this._filterCategories = e
    }
    _computeHasMoreEnrollments(e, t) {
        return !!t && null != e
    }
    _computeShowAdvancedSearchLink(e) {
        return !!e
    }
    _updateFilteredEnrollments(e) {
        this._bookmark = e.Bookmark || null;
        for (let e = 0; e < this.tabSearchActions.length; e++)
            if (this.tabSearchActions[e].name === this._selectedTab.name) {
                this.tabSearchActions[e].bookmark = this._bookmark;
                break
            }
        const t = e.Courses || [],
            s = this._getCardGrid();
        s && (this._appendEnrollments ? s.filteredEnrollments = (s.filteredEnrollments || []).concat(t) : s.filteredEnrollments = t, this._updateInfoMessage(s.filteredEnrollments.length), requestAnimationFrame(() => {
            window.dispatchEvent(new Event("resize"))
        }))
    }
    _updateInfoMessage(e) {
        if (this._infoMessageText = null, 0 === e) {
            if (this._isSearched) return void(this._infoMessageText = this.localize("noCoursesInSearch"));
            const e = this._filterCounts.departments + this._filterCounts.semesters + this._filterCounts.roles;
            if (1 === e) return void(1 === this._filterCounts.departments ? this._infoMessageText = this.localize("noCoursesInDepartment") : 1 === this._filterCounts.semesters ? this._infoMessageText = this.localize("noCoursesInSemester") : 1 === this._filterCounts.roles && (this._infoMessageText = this.localize("noCoursesInRole")));
            if (e > 1) return void(this._infoMessageText = this.localize("noCoursesInSelection"))
        }
    }
    async _fetchAndMergeNotifications(e) {
        if (!this.myNotificationsUrl || !e || 0 === e.length) return;
        if (!(this.showDropboxUnreadFeedback || this.showPendingEnrollmentRequests || this.showUnattemptedQuizzes || this.showUngradedQuizAttempts || this.showUnreadDiscussionMessages || this.showUnreadDropboxSubmissions)) return;
        const t = e.map(e => e.OrgUnitId).join(","),
            s = this.myNotificationsUrl.includes("?") ? "&" : "?";
        let o = `${this.myNotificationsUrl}${s}orgunitIds=${t}`;
        this.widgetId && (o += `&widgetId=${this.widgetId}`);
        try {
            const e = await z(o);
            if (e && Array.isArray(e)) {
                const t = this._getCardGrid();
                if (!t) return;
                const s = async () => {
                    let e = 0;
                    for (; t.loading && e < 50;) await new Promise(e => setTimeout(e, 100)), e++;
                    await t.updateComplete
                };
                await s();
                for (const s of e) {
                    const e = t.shadowRoot.getElementById(`enrollment-card-${s.OrgUnitId}`);
                    e && "function" == typeof e.updateNotifications && e.updateNotifications({
                        PendingEnrollmentRequests: s.PendingEnrollmentRequests,
                        PendingEnrollmentRequestLocation: s.PendingEnrollmentsRequestLocation,
                        UnreadDiscussions: s.UnreadDiscussions,
                        UnreadDiscussionsLocation: s.UnreadDiscussionsLocation,
                        UnapprovedDiscussions: s.UnapprovedDiscussions,
                        UnapprovedDiscussionsLocation: s.UnapprovedDiscussionsLocation,
                        UnreadAssignmentFeedback: s.UnreadAssignmentFeedback,
                        UnreadAssignmentFeedbackLocation: s.UnreadAssignmentFeedbackLocation,
                        UnreadAssignmentSubmissions: s.UnreadAssignmentSubmissions,
                        UnreadAssignmentSubmissionsLocation: s.UnreadAssignmentSubmissionsLocation,
                        UngradedQuizzes: s.UngradedQuizzes,
                        UngradedQuizzesLocation: s.UngradedQuizzesLocation,
                        UnattemptedQuizzes: s.UnattemptedQuizzes,
                        UnattemptedQuizzesLocation: s.UnattemptedQuizzesLocation
                    })
                }
            }
        } catch (e) {
            console.error("Failed to fetch notifications:", e)
        }
    }
}
window.customElements.define(x.is, x);
class T extends(l(n)) {
    static get is() {
        return "d2l-my-courses-content-v2"
    }
    static get properties() {
        return {
            showImageError: {
                type: Boolean,
                value: !1
            },
            tabSearchActions: {
                type: Array,
                value: function() {
                    return []
                }
            },
            enrollmentsSearchAction: Object,
            orgUnitTypeIds: String,
            showCourseCode: Boolean,
            showSemesterName: Boolean,
            widgetId: String,
            showCourseStartDate: Boolean,
            showCourseEndDate: Boolean,
            showDropboxUnreadFeedback: Boolean,
            showPendingEnrollmentRequests: Boolean,
            showUnattemptedQuizzes: Boolean,
            showUngradedQuizAttempts: Boolean,
            showUnreadDiscussionMessages: Boolean,
            showUnreadDropboxSubmissions: Boolean,
            enrollmentsUrl: String,
            myNotificationsUrl: String,
            userSettingsUrl: String,
            _courseTileOrganizationEventCount: {
                type: Number,
                value: 0
            },
            _enrollments: {
                type: Array,
                value: function() {
                    return []
                },
                notify: !0
            },
            _existingEnrollmentsMap: {
                type: Object,
                value: function() {
                    return {}
                }
            },
            _bookmark: {
                type: String,
                value: null
            },
            _courseInfoAlertText: {
                type: String,
                value: null,
                computed: "_computeCourseInfoAlertText(_numberOfEnrollments, _enrollments.length, _hidePastCourses, localize)"
            },
            _newEnrollmentAlertNum: {
                type: Number,
                value: 0
            },
            _newEnrollmentAlertText: {
                type: String,
                value: null,
                computed: "_computeNewEnrollmentAlertText(_newEnrollmentAlertNum, localize)"
            },
            _numberOfEnrollments: {
                type: Number,
                value: 0
            },
            _lastPinnedIndex: {
                type: Number,
                value: -1
            },
            _showContent: {
                type: Boolean,
                value: !1
            },
            _viewAllCoursesText: {
                type: String,
                computed: "_getViewAllCoursesText(_bookmark, _numberOfEnrollments, localize)"
            },
            _isRefetchNeeded: {
                type: Boolean,
                value: !1
            },
            _thisTabSelected: {
                type: Boolean,
                value: !1
            },
            _isAllTab: {
                type: Boolean,
                computed: "_computeIsAllTab(enrollmentsSearchAction.name)"
            },
            _isPinnedTab: {
                type: Boolean,
                computed: "_computeIsPinnedTab(enrollmentsSearchAction.name)"
            },
            _rootTabSelected: {
                type: Boolean,
                value: !1
            },
            _initiallyVisibleCourseTileCount: {
                type: Number,
                value: 0
            },
            _widgetMaxCardVisible: {
                type: Number,
                value: 12
            },
            _hidePastCourses: {
                type: Boolean,
                value: !1
            }
        }
    }
    static get template() {
        return i `
		<style>
			:host {
				display: block;
			}
			@media not all and (hover: hover) {
				:host {
					-webkit-user-select: none;
					user-select: none;
				}
			}
			d2l-alert {
				margin-bottom: 20px;
				clear: both;
			}

			h3 {
				display: inline;
			}

			.d2l-body-standard {
				@apply --d2l-body-standard-text;
				margin: 0;
			}
		</style>

		<d2l-my-courses-card-grid-v2
			filtered-enrollments="[[_enrollments]]"
			hide-past-courses="[[_hidePastCourses]]"
			loading="[[!_showContent]]"
			show-course-code="[[showCourseCode]]"
			show-semester-name="[[showSemesterName]]"
			show-course-start-date="[[showCourseStartDate]]"
			show-course-end-date="[[showCourseEndDate]]"
			show-dropbox-unread-feedback="[[showDropboxUnreadFeedback]]"
			show-pending-enrollment-requests="[[showPendingEnrollmentRequests]]"
			show-unattempted-quizzes="[[showUnattemptedQuizzes]]"
			show-ungraded-quiz-attempts="[[showUngradedQuizAttempts]]"
			show-unread-discussion-messages="[[showUnreadDiscussionMessages]]"
			show-unread-dropbox-submissions="[[showUnreadDropboxSubmissions]]"
			widget-view>

			<d2l-alert id="imageErrorAlert" hidden$="[[!showImageError]]" type="warning">
				[[localize('error_settingImage')]]
			</d2l-alert>
			<d2l-alert id="courseInfoAlert" hidden$="[[!_courseInfoAlertText]]" type="call-to-action">
				[[_courseInfoAlertText]]
			</d2l-alert>
			<d2l-alert id="newEnrollmentAlert" hidden$="[[!_newEnrollmentAlertText]]" type="call-to-action">
				[[_newEnrollmentAlertText]]
			</d2l-alert>

		</d2l-my-courses-card-grid-v2>

		<div hidden$="[[_computeHideViewAllCourses(_showContent, _numberOfEnrollments)]]">
			<d2l-offscreen>
				<h3>[[_viewAllCoursesText]]</h3>
			</d2l-offscreen>
			<d2l-link id="viewAllCourses"
				href="javascript:void(0);"
				on-tap="_openAllCoursesView"
				on-keypress="_keypressOpenAllCoursesView">
				<span class="d2l-body-standard">[[_viewAllCoursesText]]</span>
			</d2l-link>
		</div>`
    }
    ready() {
        super.ready()
    }
    connectedCallback() {
        super.connectedCallback(), this.addEventListener("course-tile-organization", this._onCourseTileOrganization), this.addEventListener("d2l-enrollment-new", this._onD2lEnrollmentNew), this.addEventListener("initially-visible-course-tile", this._onInitiallyVisibleCourseTile)
    }
    allCoursesOverlayClosed() {
        this._isRefetchNeeded && this._handleEnrollmentsRefetch()
    }
    courseEnrollmentChanged(e) {
        if (!e) return;
        const t = this._enrollments.findIndex(t => String(t.OrgUnitId) === String(e.orgUnitId)),
            s = e.orgUnitId && -1 !== t;
        s && (this._enrollments[t].PinState = e.isPinned ? 0 : 1), this._thisTabSelected ? s ? this._rearrangeAfterPinning(this._enrollments[t], e.isPinned) : this._refetchEnrollments() : (this._isAllTab || this._isPinnedTab || s) && (this._isRefetchNeeded = !0)
    }
    newTabSelected(e) {
        if (this.parentElement && e === this.parentElement.getAttribute("labelled-by")) return this._thisTabSelected = !0, this._isRefetchNeeded ? this._handleEnrollmentsRefetch() : 0 !== this._numberOfEnrollments || this._rootTabSelected ? setTimeout(() => {
            window.dispatchEvent(new Event("resize"))
        }, 10) : (this._rootTabSelected = !0, this._fetchRoot()), this._setLastSearchName(this.enrollmentsSearchAction.name), this.enrollmentsSearchAction.name;
        this._thisTabSelected = !1
    }
    refreshCardGridImages(e) {
        this._getCardGrid().refreshCardGridImages(e)
    }
    requestRefresh() {
        this._isRefetchNeeded = !0
    }
    getPinnedEnrollmentCount() {
        return this._enrollments.filter(e => 0 === e.PinState).length
    }
    _getCardGrid() {
        return this.shadowRoot.querySelector("d2l-my-courses-card-grid-v2")
    }
    _computeCourseInfoAlertText(e, t, s) {
        return 0 === e ? this.localize("noCoursesMessage") : s && 0 !== e && 0 === t ? this.localize("onlyPastCoursesMessage") : null
    }
    _computeNewEnrollmentAlertText(e) {
        return 1 === e ? this.localize("newEnrollment") : e >= 1 ? this.localize("newEnrollmentMultiple") : null
    }
    _computeHideViewAllCourses(e, t) {
        return !e || !t
    }
    _onD2lEnrollmentNew() {
        this._newEnrollmentAlertNum++
    }
    _onCourseTileOrganization() {
        this._courseTileOrganizationEventCount++, this._courseTileOrganizationEventCount === this._initiallyVisibleCourseTileCount && (this._showContent = !0, requestAnimationFrame(() => {
            this._getCardGrid().onResize()
        }))
    }
    _onInitiallyVisibleCourseTile() {
        this._initiallyVisibleCourseTileCount++
    }
    _computeIsAllTab(e) {
        return e === w.enrollments.searchMyEnrollments
    }
    _computeIsPinnedTab(e) {
        return e === w.enrollments.searchMyPinnedEnrollments
    }
    _rearrangeAfterPinning(e, t) {
        const s = this._getCardGrid();
        this._isRefetchNeeded = !1;
        const o = this._enrollments.findIndex(t => t.OrgUnitId === e.OrgUnitId);
        let n = this._lastPinnedIndex + 1;
        if (t || this._lastPinnedIndex--, t && this._lastPinnedIndex++, o === n) return s.updateCardPinState(o, t), void s.onResize(); - 1 !== o && (s.spliceEnrollments(o, 1), this.notifyPath("_enrollments.length"), o < n && n--), this._isPinnedTab ? this._numberOfEnrollments-- : (s.spliceEnrollments(n, 0, e), this.notifyPath("_enrollments.length"), s.updateCardPinState(n, t)), s.onResize()
    }
    _createFetchEnrollmentsUrl(e) {
        const t = {
            pageSize: 20,
            sort: "current",
            autoPinCourses: !1,
            orgUnitTypeId: this.orgUnitTypeIds,
            promotePins: !0,
            embedDepth: 0
        };
        this.widgetId && (t.widgetId = this.widgetId), this._isPinnedTab && (t.pinned = !0), this.enrollmentsSearchAction.orgUnitId ? t.parentOrgUnitIds = this.enrollmentsSearchAction.orgUnitId : this.enrollmentsSearchAction.roleId && (t.roles = this.enrollmentsSearchAction.roleId);
        const s = Object.keys(t).map(e => `${e}=${t[e]}`).join("&");
        let o = `${this.enrollmentsUrl}?${s}`;
        return e && (o && o.indexOf("?") > -1 ? o += `&bustCache=${Math.random()}` : o += `?bustCache=${Math.random()}`), o
    }
    _keypressOpenAllCoursesView(e) {
        if ("Space" === e.code || "Enter" === e.code) return this._openAllCoursesView(e)
    }
    _fetchRoot() {
        this.enrollmentsSearchAction && this._fetchEnrollments()
    }
    _fetchEnrollments() {
        z(this._createFetchEnrollmentsUrl(this._isPinnedTab)).then(e => {
            this._enrollmentsRootResponse(e)
        })
    }
    _getViewAllCoursesText(e, t) {
        const s = this.localize("viewAllCourses");
        let o = t;
        return t >= 20 && (o = t - t % 5, e = e || t % 5 > 0), o > 99 && (o = 99, e = !0), e && (o += "+"), t > 0 ? `${s} (${o})` : s
    }
    _openAllCoursesView(e) {
        this.dispatchEvent(new CustomEvent("d2l-my-courses-content-open-all-courses")), e.preventDefault(), e.stopPropagation()
    }
    _enrollmentRefetch(e) {
        const t = function() {
            this._showContent = !0, requestAnimationFrame(() => {
                this._getCardGrid().onResize()
            })
        }.bind(this);
        try {
            this._populateEnrollments(e), window.dispatchEvent(new Event("resize")), setTimeout(t, 1e3)
        } catch {
            t()
        }
    }
    _enrollmentsRootResponse(e) {
        const t = function() {
                this._showContent = !0, requestAnimationFrame(() => {
                    this._getCardGrid().onResize()
                })
            }.bind(this),
            s = this._rootTabSelected;
        try {
            this._populateEnrollments(e), setTimeout(t, 1e3)
        } catch {
            t()
        }
        s && window.dispatchEvent(new Event("resize"))
    }
    _populateEnrollments(e) {
        if (!e || !e.Courses) throw new Error("No courses response retrieved");
        const t = e.Courses,
            s = null !== e.Bookmark;
        this._bookmark = s ? e.Bookmark : null;
        !this.enrollmentsSearchAction.orgUnitId && !this.enrollmentsSearchAction.roleId && (this._hidePastCourses = !0);
        const o = [];
        let n = !1;
        t.forEach(function(e) {
            const t = e.OrgUnitId;
            if (!this._existingEnrollmentsMap.hasOwnProperty(t)) {
                this._numberOfEnrollments++, this._existingEnrollmentsMap[t] = !0;
                const s = e.EndDate && new Date(e.EndDate) < new Date,
                    i = 0 === e.PinState;
                this._hidePastCourses && s && !i || (o.push(e), i && (this._lastPinnedIndex++, n = !0))
            }
        }, this), this._enrollments = this._enrollments.concat(o), n && 1 === o.length && (this._lastPinnedIndex--, this._rearrangeAfterPinning(o[0], !0)), this.myNotificationsUrl && t.length > 0 && this._fetchAndMergeNotifications(t), 0 === this._enrollments.length && (this._showContent = !0);
        const i = t[t.length - 1];
        if (i && 0 === i.PinState && this._bookmark) {
            z(`${this._createFetchEnrollmentsUrl(!1)}&bookmark=${this._bookmark}`).then(e => {
                this._populateEnrollments(e)
            })
        }
    }
    _handleEnrollmentsRefetch() {
        this._showContent = !1, this._isRefetchNeeded = !1, this._resetEnrollments(), this._refetchEnrollments()
    }
    _refetchEnrollments() {
        z(this._createFetchEnrollmentsUrl(!0)).then(e => {
            this._enrollmentRefetch(e)
        })
    }
    _resetEnrollments() {
        this._lastPinnedIndex = -1, this._existingEnrollmentsMap = {}, this._enrollments = [], this._numberOfEnrollments = 0, this._newEnrollmentAlertNum = 0, this._bookmark = null
    }
    _setLastSearchName(e) {
        const t = new FormData;
        t.append("mostRecentEnrollmentsSearchType", "None"), t.append("mostRecentEnrollmentsSearchName", e),
            function(e, t) {
                if (!e) return;
                const s = {
                    method: "PUT"
                };
                return t && (t instanceof FormData ? s.body = t : (s.headers = {
                    "Content-Type": "application/json"
                }, s.body = JSON.stringify(t))), window.d2lfetch.fetch(new Request(e, s)).then(e => {
                    if (!e.ok) return Promise.reject(`${e.status} ${e.statusText}`)
                })
            }(this.userSettingsUrl, t).catch(() => {})
    }
    async _fetchAndMergeNotifications(e) {
        if (!this.myNotificationsUrl || !e || 0 === e.length) return;
        if (!(this.showDropboxUnreadFeedback || this.showPendingEnrollmentRequests || this.showUnattemptedQuizzes || this.showUngradedQuizAttempts || this.showUnreadDiscussionMessages || this.showUnreadDropboxSubmissions)) return;
        const t = e.map(e => e.OrgUnitId).join(","),
            s = this.myNotificationsUrl.includes("?") ? "&" : "?";
        let o = `${this.myNotificationsUrl}${s}orgunitIds=${t}`;
        this.widgetId && (o += `&widgetId=${this.widgetId}`);
        try {
            const e = await z(o);
            if (e && Array.isArray(e)) {
                const t = this._getCardGrid();
                if (!t) return;
                const s = async () => {
                    let e = 0;
                    for (; t.loading && e < 50;) await new Promise(e => setTimeout(e, 100)), e++;
                    await t.updateComplete
                };
                await s();
                for (const s of e) {
                    const e = t.shadowRoot.getElementById(`enrollment-card-${s.OrgUnitId}`);
                    e && "function" == typeof e.updateNotifications && e.updateNotifications({
                        PendingEnrollmentRequests: s.PendingEnrollmentRequests,
                        PendingEnrollmentRequestLocation: s.PendingEnrollmentsRequestLocation,
                        UnreadDiscussions: s.UnreadDiscussions,
                        UnreadDiscussionsLocation: s.UnreadDiscussionsLocation,
                        UnapprovedDiscussions: s.UnapprovedDiscussions,
                        UnapprovedDiscussionsLocation: s.UnapprovedDiscussionsLocation,
                        UnreadAssignmentFeedback: s.UnreadAssignmentFeedback,
                        UnreadAssignmentFeedbackLocation: s.UnreadAssignmentFeedbackLocation,
                        UnreadAssignmentSubmissions: s.UnreadAssignmentSubmissions,
                        UnreadAssignmentSubmissionsLocation: s.UnreadAssignmentSubmissionsLocation,
                        UngradedQuizzes: s.UngradedQuizzes,
                        UngradedQuizzesLocation: s.UngradedQuizzesLocation,
                        UnattemptedQuizzes: s.UnattemptedQuizzes,
                        UnattemptedQuizzesLocation: s.UnattemptedQuizzesLocation
                    })
                }
            }
        } catch (e) {
            console.error("Failed to fetch notifications:", e)
        }
    }
}
window.customElements.define(T.is, T);
class j extends(l(n)) {
    static get is() {
        return "d2l-my-courses-container-v2"
    }
    static get properties() {
        return {
            advancedSearchUrl: String,
            imageCatalogLocation: String,
            showCourseCode: Boolean,
            orgUnitTypeIds: String,
            showSemesterName: Boolean,
            standardDepartmentName: String,
            standardSemesterName: String,
            courseImageUploadCb: Function,
            token: String,
            promotedSearchType: String,
            promotedSearchTypeDirection: String,
            widgetId: String,
            showCourseStartDate: Boolean,
            showCourseEndDate: Boolean,
            showDropboxUnreadFeedback: Boolean,
            showPendingEnrollmentRequests: Boolean,
            showUnattemptedQuizzes: Boolean,
            showUngradedQuizAttempts: Boolean,
            showUnreadDiscussionMessages: Boolean,
            showUnreadDropboxSubmissions: Boolean,
            hasDepartments: Boolean,
            hasSemesters: Boolean,
            showPinnedTab: Boolean,
            lastEnrollmentsSearchName: String,
            enrollmentsUrl: String,
            myNotificationsUrl: String,
            semestersUrl: String,
            departmentsUrl: String,
            rolesUrl: String,
            pinUrl: String,
            userSettingsUrl: String,
            _currentTabId: String,
            _orgUnitTypeIds: Array,
            _tabSearchActions: {
                type: Array,
                value: [],
                observer: "_tabSearchActionsChanged"
            },
            _tabSearchType: String,
            _changedCourseEnrollment: Object,
            _setImageOrg: {
                type: Object,
                value: function() {
                    return {}
                }
            },
            _showContent: {
                type: Boolean,
                value: !1
            },
            _showImageError: {
                type: Boolean,
                value: !1
            }
        }
    }
    static get observers() {
        return ["_onLanguageChange(language, _tabSearchActions)"]
    }
    _hasTabSearchActions(e) {
        return e && e.length > 0
    }
    static get template() {
        return i `
			<style>
				.spinner-container {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				d2l-tabs[hidden] {
					display: none;
				}
			</style>

		<div class="spinner-container">
			<d2l-loading-spinner hidden$="[[_showContent]]" size="100">
			</d2l-loading-spinner>
		</div>
		<template is="dom-if" if="[[_hasTabSearchActions(_tabSearchActions)]]">
			<d2l-tabs hidden$="[[!_showContent]]" on-d2l-tab-selected="_tabSelectedChanged">
				<template items="[[_tabSearchActions]]" is="dom-repeat">
					<!-- item.name is an OrgUnitId, and querySelector does not work with components with ids that start with a number -->
					<d2l-tab id="[[item.name]]" text="[[item.title]]" slot="tabs" selected="[[item.selected]]" data-panel-id="panel-[[item.name]]"></d2l-tab>
					<d2l-tab-panel id="panel-[[item.name]]" labelled-by="[[item.name]]" slot="panels">
						<d2l-my-courses-content-v2
							show-course-code="[[showCourseCode]]"
							show-semester-name="[[showSemesterName]]"
							on-d2l-my-courses-content-open-all-courses="_openAllCoursesOverlay"
							show-image-error="[[_showImageError]]"
							enrollments-search-action="[[item]]"
							org-unit-type-ids="[[_orgUnitTypeIds]]"
							tab-search-type="[[_tabSearchType]]"
							widget-id="[[widgetId]]"
							my-notifications-url="[[myNotificationsUrl]]"
							show-course-start-date="[[showCourseStartDate]]"
							show-course-end-date="[[showCourseEndDate]]"
							show-dropbox-unread-feedback="[[showDropboxUnreadFeedback]]"
							show-pending-enrollment-requests="[[showPendingEnrollmentRequests]]"
							show-unattempted-quizzes="[[showUnattemptedQuizzes]]"
							show-ungraded-quiz-attempts="[[showUngradedQuizAttempts]]"
							show-unread-discussion-messages="[[showUnreadDiscussionMessages]]"
							show-unread-dropbox-submissions="[[showUnreadDropboxSubmissions]]"
							enrollments-url="[[enrollmentsUrl]]"
							user-settings-url="[[userSettingsUrl]]"
							>
						</d2l-my-courses-content-v2>
					</d2l-tab-panel>
				</template>
			</d2l-tabs>
		</template>			
		
		<d2l-all-courses-v2
			show-semester-name="[[showSemesterName]]"
			show-course-code="[[showCourseCode]]"
			on-d2l-all-courses-close="_onAllCoursesClose"
			advanced-search-url="[[advancedSearchUrl]]"
			filter-standard-department-name="[[standardDepartmentName]]"
			filter-standard-semester-name="[[standardSemesterName]]"
			org-unit-type-ids="[[_orgUnitTypeIds]]"
			show-image-error="[[_showImageError]]"
			tab-search-type="[[_tabSearchType]]"
			token="[[token]]"
			widget-id="[[widgetId]]"
			my-notifications-url="[[myNotificationsUrl]]"
			show-course-start-date="[[showCourseStartDate]]"
			show-course-end-date="[[showCourseEndDate]]"
			show-dropbox-unread-feedback="[[showDropboxUnreadFeedback]]"
			show-pending-enrollment-requests="[[showPendingEnrollmentRequests]]"
			show-unattempted-quizzes="[[showUnattemptedQuizzes]]"
			show-ungraded-quiz-attempts="[[showUngradedQuizAttempts]]"
			show-unread-discussion-messages="[[showUnreadDiscussionMessages]]"
			show-unread-dropbox-submissions="[[showUnreadDropboxSubmissions]]"
			has-departments="[[hasDepartments]]"
			has-semesters="[[hasSemesters]]"
			enrollments-url="[[enrollmentsUrl]]"
			departments-url="[[departmentsUrl]]"
			semesters-url="[[semestersUrl]]"
			roles-url="[[rolesUrl]]"
		>
		</d2l-all-courses-v2>
	
		<d2l-dialog-fullscreen id="basic-image-selector-overlay"
			title-text="[[localize('changeImage')]]">
			<d2l-basic-image-selector
				image-catalog-location="[[imageCatalogLocation]]"
				organization="[[_setImageOrg]]"
				course-image-upload-cb="[[courseImageUploadCb]]">
			</d2l-basic-image-selector>
			<div id="scrollThreshold" style="height: 1px"></div>
		</d2l-dialog-fullscreen>`
    }
    constructor() {
        super(), this._onCourseEnrollmentChange = this._onCourseEnrollmentChange.bind(this), this._pinnedCacheBuster = Math.random()
    }
    connectedCallback() {
        super.connectedCallback(), this.addEventListener("open-change-image-view", this._onOpenChangeImageView), this.addEventListener("set-course-image", this._onSetCourseImage), this._observer = new IntersectionObserver(this._onChangeImageLowerThreshold.bind(this)), this._observer.observe(this.$.scrollThreshold), document.body.addEventListener("d2l-course-pinned-change", this._onCourseEnrollmentChange);
        let e = [];
        try {
            e = JSON.parse(this.orgUnitTypeIds).value
        } catch {}
        this._orgUnitTypeIds = e, this._waitForLocalizationAndBuildTabs()
    }
    async _waitForLocalizationAndBuildTabs() {
        await this.getLoadingComplete(), this._buildTabs()
    }
    disconnectedCallback() {
        document.body.removeEventListener("d2l-course-pinned-change", this._onCourseEnrollmentChange), this._observer.unobserve(this.$.scrollThreshold), super.disconnectedCallback()
    }
    courseImageUploadCompleted(e) {
        if (e) {
            this._setDialogOpen(!1);
            const e = this._getContentComponent();
            e && e.refreshCardGridImages(this._setImageOrg), this._getAllCoursesComponent().refreshCardGridImages(this._setImageOrg)
        }
    }
    getLastOrgUnitId() {
        if (this._setImageOrg.links) return function(e) {
            const t = /[0-9]+(?=$|\?)/.exec(e);
            if (t) return t[0]
        }(this._setImageOrg.getLinkByRel("self").href)
    }
    _onChangeImageLowerThreshold(e) {
        for (let t = 0; t < e.length; t++)
            if (e[t].intersectionRatio > 0) {
                this.shadowRoot.querySelector("d2l-basic-image-selector").loadMore();
                break
            }
    }
    _onOpenChangeImageView(e) {
        const t = e.detail.organization;
        t && (this._setImageOrg = m(t)), this._setDialogOpen(!0)
    }
    _onSetCourseImage(e) {
        this._setDialogOpen(!1), this._showImageError = !1, e && e.detail && "failure" === e.detail.status && setTimeout(() => {
            this._showImageError = !0
        }, 1e3)
    }
    _setDialogOpen(e) {
        this.shadowRoot.querySelector("d2l-dialog-fullscreen").opened = e;
        const t = this.shadowRoot.querySelector("d2l-basic-image-selector");
        e ? t.initializeSearch() : t.clearSearch()
    }
    _getContentComponent() {
        return this.shadowRoot.querySelector(`d2l-tab-panel[labelled-by="${this._currentTabId}"] d2l-my-courses-content-v2`)
    }
    _getAllCoursesComponent() {
        return this.shadowRoot.querySelector("d2l-all-courses-v2")
    }
    _openAllCoursesOverlay() {
        const e = this._getAllCoursesComponent(),
            t = this._tabSearchActions.map(e => Object.assign({}, e));
        e.tabSearchActions = t, e.open(), this._showImageError = !1
    }
    _onAllCoursesClose() {
        this._showImageError = !1;
        const e = this._getContentComponent();
        e && e.allCoursesOverlayClosed()
    }
    _onPromotedSearchEntityChange(e) {
        if (!e) return;
        let t = [];
        if (this._showContent = !0, 0 === e.length) return void(this._tabSearchActions = this._getPinTabAndAllTabActions());
        this._tabSearchType = this.promotedSearchType, e.length > 1 && (t = e.map(e => {
            let t, s, o;
            return "BySemester" === this.promotedSearchType || "ByDepartment" === this.promotedSearchType ? (t = e.OrgUnitId, o = `${this.promotedSearchType}${t}`) : "ByRoleAlias" === this.promotedSearchType && (s = e.RoleId, o = `${this.promotedSearchType}${s}`), {
                name: o,
                title: e.Name,
                selected: o === this.lastEnrollmentsSearchName,
                fields: [{
                    isAscending: "asc" === this.promotedSearchTypeDirection ? "true" : "false"
                }],
                orgUnitId: t,
                roleId: s
            }
        }));
        t = this._getPinTabAndAllTabActions().concat(t), this._tabSearchActions && this._tabSearchActions.length > 0 && this._tabSearchActions.length === t.length || (this._tabSearchActions = t)
    }
    _buildTabs() {
        let e = "";
        if ("BySemester" === this.promotedSearchType) e = `${this.semestersUrl}?isAscending=${"asc"===this.promotedSearchTypeDirection?"true":"false"}&widgetId=${encodeURIComponent(this.widgetId)}&cacheBuster=${Math.random()}`;
        else if ("ByDepartment" === this.promotedSearchType) e = `${this.departmentsUrl}?isAscending=${"asc"===this.promotedSearchTypeDirection?"true":"false"}&widgetId=${encodeURIComponent(this.widgetId)}&cacheBuster=${Math.random()}`;
        else {
            if ("ByRoleAlias" !== this.promotedSearchType) return this._showContent = !0, void(this._tabSearchActions = this._getPinTabAndAllTabActions());
            e = `${this.rolesUrl}?isAscending=${"asc"===this.promotedSearchTypeDirection?"true":"false"}`
        }
        z(e).then(e => {
            this._onPromotedSearchEntityChange(e)
        }).catch(e => {
            console.error("Error fetching promoted search entities:", e), this._showContent = !0, this._tabSearchActions = this._getPinTabAndAllTabActions()
        })
    }
    _onCourseEnrollmentChange(e) {
        let t;
        if (t = e.detail.orgUnitId ? e.detail.orgUnitId : e.detail.enrollment.OrgUnitId, this._changedCourseEnrollment && this._changedCourseEnrollment.orgUnitId === t && this._changedCourseEnrollment.isPinned === e.detail.isPinned) return;
        this._changedCourseEnrollment = {
            orgUnitId: t,
            isPinned: e.detail.isPinned
        };
        const s = this.pinUrl.replace("{orgUnitId}", t);
        e.detail.isPinned ? function(e) {
            if (!e) return;
            return window.d2lfetch.fetch(new Request(e, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })).then(e => {
                if (!e.ok) return Promise.reject(`${e.status} ${e.statusText}`)
            })
        }(s).catch(() => {}) : function(e) {
            if (!e) return;
            return window.d2lfetch.fetch(new Request(e, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })).then(e => {
                if (!e.ok) return Promise.reject(`${e.status} ${e.statusText}`)
            })
        }(s).catch(() => {});
        const o = this.shadowRoot.querySelectorAll("d2l-my-courses-content-v2");
        let n = 0;
        if (!e.detail.isPinned) {
            const e = this._getContentComponent();
            e && (n = e.getPinnedEnrollmentCount())
        }
        o.forEach(e => {
            e.courseEnrollmentChanged(this._changedCourseEnrollment)
        }), this._getAllCoursesComponent().courseEnrollmentChanged(this._changedCourseEnrollment), e.detail.isPinned ? this._addPinnedTab() : 1 === n && this._removePinnedTab()
    }
    async _tabSearchActionsChanged(e, t) {
        if ((!t || 0 === t.length) && e && e.length > 0) {
            const t = e.find(e => e.selected);
            if (!t) return;
            this._currentTabId = t.name, requestAnimationFrame(() => {
                this._updateContentsTabSelected()
            })
        }
    }
    _tabSelectedChanged(e) {
        e.stopPropagation(), this._currentTabId = e.target.id;
        this._getContentComponent() ? this._updateContentsTabSelected() : requestAnimationFrame(() => {
            this._updateContentsTabSelected()
        })
    }
    _updateContentsTabSelected() {
        let e;
        this.shadowRoot.querySelectorAll("d2l-my-courses-content-v2").forEach(t => {
            const s = t.newTabSelected(this._currentTabId);
            s && (e = s)
        }), this._tabSearchActions = this._tabSearchActions.map(t => Object.assign({}, t, {
            selected: t.name === e
        })), this.dispatchEvent(new CustomEvent("d2l-my-courses-tab-selected"))
    }
    _getPinTabAndAllTabActions() {
        const e = [];
        return e.push({
            name: "search-my-enrollments",
            title: this.localize("allTab"),
            selected: "search-my-enrollments" === this.lastEnrollmentsSearchName
        }), this.showPinnedTab && e.push(this._getPinnedTabAction()), e
    }
    _getPinnedTabAction() {
        return {
            name: "search-my-pinned-enrollments",
            title: this.localize("pinnedCourses"),
            selected: "search-my-pinned-enrollments" === this.lastEnrollmentsSearchName
        }
    }
    _addPinnedTab() {
        if (-1 === this._tabSearchActions.findIndex(e => "search-my-pinned-enrollments" === e.name)) {
            this.splice("_tabSearchActions", 1, 0, this._getPinnedTabAction());
            const e = this._getAllCoursesComponent();
            e.tabSearchActions && e.tabSearchActions.length > 0 && e.splice("tabSearchActions", 1, 0, this._getPinnedTabAction());
            this.shadowRoot.querySelectorAll("d2l-my-courses-content-v2").forEach(e => {
                e.requestRefresh()
            })
        }
    }
    _removePinnedTab() {
        const e = this._tabSearchActions.findIndex(e => "search-my-pinned-enrollments" === e.name);
        if (-1 !== e) {
            this.splice("_tabSearchActions", e, 1);
            const t = this._getAllCoursesComponent();
            t.tabSearchActions && t.tabSearchActions.length > 0 && t.splice("tabSearchActions", e, 1);
            this.shadowRoot.querySelectorAll("d2l-my-courses-content-v2").forEach(e => {
                e.requestRefresh()
            })
        }
    }
    _onLanguageChange(e, t) {
        e && t && 0 !== t.length && t.forEach((e, t) => {
            let s;
            s = "search-my-enrollments" === e.name ? this.localize("allTab") : "search-my-pinned-enrollments" === e.name ? this.localize("pinnedCourses") : e.title, e.title !== s && this.set(`_tabSearchActions.${t}.title`, s)
        })
    }
}
window.customElements.define(j.is, j);
class P extends n {
    static get is() {
        return "d2l-my-courses-v2"
    }
    static get properties() {
        return {
            advancedSearchUrl: String,
            enrollmentsUrl: String,
            departmentsUrl: String,
            semestersUrl: String,
            rolesUrl: String,
            pinUrl: String,
            userSettingsUrl: String,
            imageCatalogLocation: String,
            showCourseCode: {
                type: Boolean,
                value: !1
            },
            orgUnitTypeIds: String,
            showSemester: {
                type: Boolean,
                value: !1
            },
            standardDepartmentName: String,
            standardSemesterName: String,
            courseUpdatesConfig: Object,
            courseImageUploadCb: Function,
            promotedSearchType: String,
            promotedSearchTypeDirection: String,
            myNotificationsUrl: String,
            widgetId: String,
            lastEnrollmentsSearchName: String,
            showPinnedTab: {
                type: Boolean,
                value: !1
            },
            showCourseStartDate: {
                type: Boolean,
                value: !1
            },
            showCourseEndDate: {
                type: Boolean,
                value: !1
            },
            showDropboxUnreadFeedback: {
                type: Boolean,
                value: !1
            },
            showPendingEnrollmentRequests: {
                type: Boolean,
                value: !1
            },
            showUnattemptedQuizzes: {
                type: Boolean,
                value: !1
            },
            showUngradedQuizAttempts: {
                type: Boolean,
                value: !1
            },
            showUnreadDiscussionMessages: {
                type: Boolean,
                value: !1
            },
            showUnreadDropboxSubmissions: {
                type: Boolean,
                value: !1
            },
            hasDepartments: {
                type: Boolean,
                value: !1
            },
            hasSemesters: {
                type: Boolean,
                value: !1
            }
        }
    }
    static get template() {
        return i `
			<d2l-my-courses-container-v2 
				advanced-search-url="[[advancedSearchUrl]]"
				enrollments-url="[[enrollmentsUrl]]"
				image-catalog-location="[[imageCatalogLocation]]"
				show-course-code="[[showCourseCode]]"
				org-unit-type-ids="[[orgUnitTypeIds]]"
				show-semester-name="[[showSemester]]"
				standard-department-name="[[standardDepartmentName]]"
				standard-semester-name="[[standardSemesterName]]"
				course-updates-config="[[courseUpdatesConfig]]"
				course-image-upload-cb="[[courseImageUploadCb]]"
				promoted-search-type="[[promotedSearchType]]"
				promoted-search-type-direction="[[promotedSearchTypeDirection]]"
				widget-id="[[widgetId]]"	
				my-notifications-url="[[myNotificationsUrl]]"
				show-course-start-date="[[showCourseStartDate]]"
				show-course-end-date="[[showCourseEndDate]]"
				show-dropbox-unread-feedback="[[showDropboxUnreadFeedback]]"
				show-pending-enrollment-requests="[[showPendingEnrollmentRequests]]"
				show-unattempted-quizzes="[[showUnattemptedQuizzes]]"
				show-ungraded-quiz-attempts="[[showUngradedQuizAttempts]]"
				show-unread-discussion-messages="[[showUnreadDiscussionMessages]]"
				show-unread-dropbox-submissions="[[showUnreadDropboxSubmissions]]"
				has-departments="[[hasDepartments]]"
				has-semesters="[[hasSemesters]]"
				last-enrollments-search-name="[[lastEnrollmentsSearchName]]"
				show-pinned-tab="[[showPinnedTab]]"
				roles-url="[[rolesUrl]]"
				departments-url="[[departmentsUrl]]"
				semesters-url="[[semestersUrl]]"
				pin-url="[[pinUrl]]"
				user-settings-url="[[userSettingsUrl]]">
			</d2l-my-courses-container-v2>`
    }
    courseImageUploadCompleted(e) {
        return this.shadowRoot.querySelector("d2l-my-courses-container-v2").courseImageUploadCompleted(e)
    }
    getLastOrgUnitId() {
        return this.shadowRoot.querySelector("d2l-my-courses-container-v2").getLastOrgUnitId()
    }
}
window.customElements.define(P.is, P);