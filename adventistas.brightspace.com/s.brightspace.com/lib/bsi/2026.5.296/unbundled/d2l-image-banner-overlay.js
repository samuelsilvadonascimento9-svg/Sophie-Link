import {
    P as t,
    d as e
} from "./polymer-legacy.js";
import "./dialog-fullscreen.js";
import "./alert.js";
import "./dropdown-menu.js";
import "./dropdown-more.js";
import "./d2l-fetch.js";
import "./icon.js";
import "./d2l-basic-image-selector.js";
import "./link.js";
import "./loading-spinner.js";
import "./menu.js";
import "./menu-item.js";
import "./offscreen.js";
import "./d2l-course-image.js";
import "./d2l-dom.js";
import "./d2l-dom-focus.js";
import "./d2l-focusable-behavior.js";
import "./colors.js";
import "./d2l-typography-shared-styles.js";
import "./d2l-localize-behavior.js";
import {
    a as n
} from "./render-status.js";
import {
    E as o
} from "./index8.js";
import "./polymer-element.js";
import "./boot.js";
import "./settings.js";
import "./mixin.js";
import "./async.js";
import "./debounce.js";
import "./button-icon.js";
import "./tooltip.js";
import "./_rollupPluginBabelHelpers.js";
import "./lit-element.js";
import "./dom.js";
import "./focus.js";
import "./announce.js";
import "./styles.js";
import "./svg-to-css.js";
import "./uniqueId.js";
import "./backdrop.js";
import "./flags.js";
import "./ifrauBackdropService.js";
import "./focus-mixin.js";
import "./dedupeMixin.js";
import "./if-defined.js";
import "./framed.js";
import "./dismissible.js";
import "./class-map.js";
import "./directive.js";
import "./style-map.js";
import "./visible-on-ancestor-mixin.js";
import "./button-styles.js";
import "./property-required-mixin.js";
import "./slotted-icon-mixin.js";
import "./theme-mixin.js";
import "./icon-styles.js";
import "./unsafe-svg.js";
import "./async-directive.js";
import "./async-container-mixin.js";
import "./dialog-styles.js";
import "./waitForElem.js";
import "./localize-core-element.js";
import "./localize-mixin.js";
import "./localize.js";
import "./common.js";
import "./index2.js";
import "./index3.js";
import "./button-subtle.js";
import "./dropdown-popover-mixin.js";
import "./button.js";
import "./dropdown-opener-mixin.js";
import "./dropdown-opener-styles.js";
import "./index5.js";
import "./d2lfetch.js";
import "./input-search.js";
import "./input-text.js";
import "./number.js";
import "./input-inline-help.js";
import "./skeleton-mixin.js";
import "./subscriberControllers.js";
import "./input-label-styles.js";
import "./input-styles.js";
import "./labelled-mixin.js";
import "./rtl-mixin.js";
import "./overflow.js";
import "./menu-item-styles.js";
import "./requestIdleCallback.js";
import "./common2.js";
import "./dateTime.js";
import "./fileSize.js";
const r = document.createElement("template");
r.innerHTML = '<dom-module id="d2l-image-banner-overlay-styles">\n\t<template strip-whitespace="">\n\t\t<style>\n\t\t\t:host {\n\t\t\t\theight: 100%;\n\t\t\t\tleft: 0;\n\t\t\t\tword-wrap: break-word; /* IE/Edge */\n\t\t\t\toverflow-wrap: break-word; /* replaces \'word-wrap\' in Firefox, Chrome, Safari */\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\tz-index: 1;\n\t\t\t\t@apply --d2l-body-standard-text;\n\t\t\t}\n\n\t\t\t.d2l-image-banner-overlay-content {\n\t\t\t\tdisplay: none;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 0;\n\t\t\t\toverflow: hidden;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t.d2l-image-banner-overlay-content-shown {\n\t\t\t\tanimation-duration: 1.2s;\n\t\t\t\tanimation-fill-mode: forwards;\n\t\t\t\tanimation-name: shown;\n\t\t\t\tdisplay: block;\n\t\t\t}\n\n\t\t\t@keyframes shown {\n\t\t\t\t0% { opacity: 0 }\n\t\t\t\t100% { opacity: 1; }\n\t\t\t}\n\n\t\t\t.d2l-image-banner-course-name {\n\t\t\t\tbackground: linear-gradient(rgba(0,0,0,0), #000 120%);\n\t\t\t\tbottom: 0;\n\t\t\t\tmax-height: 100%;\n\t\t\t\tpadding-top: 3.5rem;\n\t\t\t\tposition: absolute;\n\t\t\t\ttransform: scale3d(1,1,1);\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t@supports (-webkit-line-clamp: 2) {\n\t\t\t\t.d2l-image-banner-course-name {\n\t\t\t\t\tbackground: linear-gradient(rgba(0, 0, 0, 0), #000 267px);\n\t\t\t\t\tpadding-top: 3.35rem;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t#bannerTitle {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tcolor: white;\n\t\t\t\t-webkit-line-clamp: 2;\n\t\t\t\t-webkit-box-orient: vertical;\n\t\t\t\tdisplay: -webkit-box;\n\t\t\t\tmargin-top: 0;\n\t\t\t\toverflow: hidden;\n\t\t\t\tpadding-top: 0;\n\t\t\t\tpadding-bottom: 0;\n\t\t\t\tpointer-events: none;\n\t\t\t\ttext-shadow: 0 0 3px rgba(0,0,0,.2);\n\t\t\t\t@apply --d2l-heading-1;\n\t\t\t}\n\n\t\t\td2l-dropdown-more,\n\t\t\t#bannerTitle {\n\t\t\t\tmargin-left: 2.439%;\n\t\t\t\tmargin-right: 2.439%;\n\t\t\t}\n\n\t\t\t:host([department-banner-flag]) d2l-dropdown-more {\n\t\t\t\tmargin-left: 10px;\n\t\t\t\tmargin-right: 10px;\n\t\t\t\tmargin-top: 10px;\n\t\t\t}\n\n\t\t\t.loading-overlay-shown d2l-dropdown-more {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t@media (min-width: 1230px) {\n\t\t\t\t:host(:not([department-banner-flag])) d2l-dropdown-more {\n\t\t\t\t\tmargin-left: 30px;\n\t\t\t\t\tmargin-right: 30px;\n\t\t\t\t\tmargin-top: 30px;\n\t\t\t\t}\n\n\t\t\t\t:host(:dir(rtl)) #bannerTitle.menu-exists {\n\t\t\t\t\tpadding-left: 50px;\n\t\t\t\t\tpadding-right: 0;\n\t\t\t\t}\n\n\t\t\t\t#bannerTitle.menu-exists {\n\t\t\t\t\tpadding-right: 50px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t@media (max-width: 615px) {\n\t\t\t\t:host(:not([department-banner-flag])) d2l-dropdown-more {\n\t\t\t\t\tmargin-left: 15px;\n\t\t\t\t\tmargin-right: 15px;\n\t\t\t\t\tmargin-top: 15px;\n\t\t\t\t}\n\t\t\t\t#bannerTitle {\n\t\t\t\t\tmargin-left: 15px;\n\t\t\t\t\tmargin-right: 15px;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\td2l-dropdown-more {\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t}\n\t\t\td2l-dropdown-more[hidden] {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t:host(:dir(rtl)) d2l-dropdown-more {\n\t\t\t\tleft: 0;\n\t\t\t\tright: auto;\n\t\t\t}\n\n\t\t\t:host(:dir(rtl)) #bannerTitle.menu-exists {\n\t\t\t\tpadding-left: 40px;\n\t\t\t\tpadding-right: 0;\n\t\t\t}\n\n\t\t\t#bannerTitle.menu-exists {\n\t\t\t\tpadding-right: 40px;\n\t\t\t}\n\n\t\t\t.d2l-image-banner-course-name-container {\n\t\t\t\theight: 100%;\n\t\t\t\toverflow: hidden;\n\t\t\t\tpointer-events: none;\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\td2l-alert {\n\t\t\t\tfont-size: 1rem;\n\t\t\t}\n\n\t\t\t.d2l-image-banner-error-alert {\n\t\t\t\tmargin-left: 2%;\n\t\t\t\tmargin-right: 2%;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 20px;\n\t\t\t\twidth: 95%;\n\t\t\t}\n\n\t\t\t.loading-overlay {\n\t\t\t\talign-items: center;\n\t\t\t\tdisplay: flex;\n\t\t\t\theight: 100%;\n\t\t\t\tjustify-content: center;\n\t\t\t\tleft: 0;\n\t\t\t\topacity: 0;\n\t\t\t\tpointer-events: none;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t.loading-overlay-shown .loading-overlay {\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.4);\n\t\t\t\topacity: 1;\n\t\t\t\ttransition: opacity 0.5s 0.5s;\n\t\t\t}\n\n\t\t\td2l-loading-spinner {\n\t\t\t\tbottom: 0;\n\t\t\t\tdisplay: none;\n\t\t\t\tleft: 0;\n\t\t\t\tmargin: auto;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t\ttop: 0;\n\t\t\t\tz-index: 4;\n\t\t\t}\n\n\t\t\t.change-image-loading d2l-loading-spinner,\n\t\t\t.loading-overlay-shown .loading-overlay d2l-loading-spinner {\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\n\t\t\t.change-image-success d2l-loading-spinner,\n\t\t\t.change-image-failure d2l-loading-spinner {\n\t\t\t\tdisplay: flex;\n\t\t\t\topacity: 0;\n\t\t\t}\n\n\t\t\t.icon-container {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t.change-image-loading .icon-container,\n\t\t\t.change-image-success .icon-container,\n\t\t\t.change-image-failure .icon-container {\n\t\t\t\talign-items: center;\n\t\t\t\tbackground-color: white;\n\t\t\t\tborder-radius: 100px;\n\t\t\t\tborder-style: none;\n\t\t\t\tbottom: 0;\n\t\t\t\tdisplay: flex;\n\t\t\t\theight: 80px;\n\t\t\t\tjustify-content: center;\n\t\t\t\tleft: 0;\n\t\t\t\tmargin: auto;\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t\ttop: 0;\n\t\t\t\twidth: 80px;\n\t\t\t}\n\n\t\t\t@keyframes inner {\n\t\t\t\t0% { transform: scale(1); }\n\t\t\t\t15% { transform: scale(1.8); }\n\t\t\t\t20% { transform: scale(1.5); }\n\t\t\t\t100% { transform: scale(1.5); }\n\t\t\t}\n\n\t\t\t@keyframes container {\n\t\t\t\t0% { height: 80px; width: 80px; }\n\t\t\t\t70% { height: 80px; width: 80px; opacity: 1; }\n\t\t\t\t90% { height: 100px; width: 100px; opacity: 0.4 }\n\t\t\t\t100% { height: 20px; width: 20px; opacity: 0; }\n\t\t\t}\n\n\t\t\t.checkmark {\n\t\t\t\tcolor: var(--d2l-color-olivine);\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t.fail-icon {\n\t\t\t\tcolor: #ffce51;\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t.change-image-success,\n\t\t\t.change-image-failure,\n\t\t\t.change-image-loading {\n\t\t\t\tpointer-events: none;\n\t\t\t}\n\n\t\t\t.change-image-success .checkmark,\n\t\t\t.change-image-failure .fail-icon {\n\t\t\t\tanimation-duration: 1s;\n\t\t\t\tanimation-fill-mode: forwards;\n\t\t\t\tanimation-name: inner;\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\n\t\t\t.change-image-success .icon-container,\n\t\t\t.change-image-failure .icon-container {\n\t\t\t\tanimation-duration: 1s;\n\t\t\t\tanimation-fill-mode: forwards;\n\t\t\t\tanimation-name: container;\n\t\t\t}\n\n\t\t\t.change-image-loading .loading-overlay,\n\t\t\t.change-image-success .loading-overlay,\n\t\t\t.change-image-failure .loading-overlay {\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.4);\n\t\t\t\tdisplay: block;\n\t\t\t\theight: 100%;\n\t\t\t\topacity: 1;\n\t\t\t\tposition: relative;\n\t\t\t\twidth: 100%;\n\t\t\t\tz-index: 2;\n\t\t\t}\n\t\t</style>\n\t</template>\n</dom-module>', document.head.appendChild(r.content), window.D2L = window.D2L || {}, window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {}, window.D2L.PolymerBehaviors.ImageBanner = window.D2L.PolymerBehaviors.ImageBanner || {}, D2L.PolymerBehaviors.ImageBanner.LocalizeBehaviorImpl = {
    localizeConfig: {
        importFunc: async t => (await
            function(t) {
                switch (t) {
                    case "./lang/ar.js":
                        return import ("./ar96.js");
                    case "./lang/cy-gb.js":
                        return import ("./cy-gb4.js");
                    case "./lang/cy.js":
                        return import ("./cy94.js");
                    case "./lang/da-dk.js":
                        return import ("./da-dk4.js");
                    case "./lang/da.js":
                        return import ("./da94.js");
                    case "./lang/de.js":
                        return import ("./de96.js");
                    case "./lang/en-gb.js":
                        return import ("./en-gb88.js");
                    case "./lang/en.js":
                        return import ("./en97.js");
                    case "./lang/es-es.js":
                        return import ("./es-es95.js");
                    case "./lang/es.js":
                        return import ("./es96.js");
                    case "./lang/fr-fr.js":
                        return import ("./fr-fr95.js");
                    case "./lang/fr-on.js":
                        return import ("./fr-on90.js");
                    case "./lang/fr.js":
                        return import ("./fr96.js");
                    case "./lang/haw.js":
                        return import ("./haw88.js");
                    case "./lang/hi.js":
                        return import ("./hi95.js");
                    case "./lang/ja.js":
                        return import ("./ja96.js");
                    case "./lang/ko.js":
                        return import ("./ko96.js");
                    case "./lang/mi.js":
                        return import ("./mi89.js");
                    case "./lang/nl.js":
                        return import ("./nl96.js");
                    case "./lang/pt.js":
                        return import ("./pt96.js");
                    case "./lang/sv.js":
                        return import ("./sv96.js");
                    case "./lang/th.js":
                        return import ("./th84.js");
                    case "./lang/tr.js":
                        return import ("./tr96.js");
                    case "./lang/vi.js":
                        return import ("./vi84.js");
                    case "./lang/zh-tw.js":
                        return import ("./zh-tw96.js");
                    case "./lang/zh.js":
                        return import ("./zh9.js");
                    default:
                        return new Promise(function(e, n) {
                            ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + t)))
                        })
                }
            }(`./lang/${t}.js`)).default
    }
}, D2L.PolymerBehaviors.ImageBanner.LocalizeBehavior = [D2L.PolymerBehaviors.LocalizeBehavior, D2L.PolymerBehaviors.ImageBanner.LocalizeBehaviorImpl];
const i = document.createElement("template");
i.innerHTML = '<dom-module id="d2l-image-banner-overlay">\n\t<template strip-whitespace="">\n\t\t<style include="d2l-image-banner-overlay-styles"></style>\n\n\t\t<div id="overlayContent" class="d2l-image-banner-overlay-content d2l-visible-on-ancestor-target">\n\t\t\t<div class="d2l-image-banner-course-name-container">\n\t\t\t\t<div class="d2l-image-banner-course-name">\n\t\t\t\t\t<h1 id="bannerTitle">\n\t\t\t\t\t\t<span hidden$="[[hideBannerTitle]]">[[bannerTitle]]</span>\n\t\t\t\t\t\t<d2l-offscreen hidden$="[[!hideBannerTitle]]">[[bannerTitle]]</d2l-offscreen>\n\t\t\t\t\t</h1>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<d2l-dropdown-more class="d2l-focusable" hidden$="[[!_showDropdown]]" text="[[localize(\'bannerSettings\')]]" translucent="" visible-on-ancestor="">\n\t\t\t\t<d2l-dropdown-menu>\n\t\t\t\t\t<d2l-menu label$="[[localize(\'bannerSettings\')]]">\n\t\t\t\t\t\t<d2l-menu-item id="change-image-button" hidden$="[[!_showChangeImageMenuItem]]" text="[[localize(\'changeImage\')]]" on-d2l-menu-item-select="_launchCourseTileImageSelector">\n\t\t\t\t\t\t</d2l-menu-item>\n\t\t\t\t\t\t<d2l-menu-item hidden$="[[!canChangeBannerTitle]]" text="[[localize(\'customizeBannerText\')]]" on-d2l-menu-item-select="_changeBannerTitle">\n\t\t\t\t\t\t</d2l-menu-item>\n\t\t\t\t\t\t<d2l-menu-item id="opt-out-button" hidden$="[[!_showRemoveBannerMenuItem]]" text="[[localize(\'removeBanner\')]]" on-d2l-menu-item-select="_toggleCourseBanner">\n\t\t\t\t\t\t</d2l-menu-item>\n\t\t\t\t\t</d2l-menu>\n\t\t\t\t</d2l-dropdown-menu>\n\t\t\t</d2l-dropdown-more>\n\t\t\t<div class="loading-overlay">\n\t\t\t\t<d2l-loading-spinner size="100"></d2l-loading-spinner>\n\t\t\t\t<div class="icon-container">\n\t\t\t\t\t<d2l-icon class$="[[_iconDetails.className]]" icon="[[_iconDetails.iconName]]"></d2l-icon>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<d2l-dialog-fullscreen id="basic-image-selector-overlay" title-text="[[localize(\'changeImage\')]]">\n\t\t\t<d2l-basic-image-selector image-catalog-location="[[imageCatalogLocation]]" organization="[[_organization]]" course-image-upload-cb="[[courseImageUploadCb]]">\n\t\t\t</d2l-basic-image-selector>\n\t\t\t<div id="scrollThreshold" style="height: 1px"></div>\n\t\t</d2l-dialog-fullscreen>\n\t\t<d2l-alert id="optBackInAlert" hidden$="[[!_showBannerRemovedAlert]]" button-text="[[localize(\'undo\')]]" has-close-button="true" role="alert">\n\t\t\t<span id="bannerRemovedMenuAlertText">[[localize(\'bannerRemovedMenu\')]]</span>\n\t\t</d2l-alert>\n\t\t<d2l-alert id="errorAlert" hidden$="[[!_showBannerErrorAlert]]" has-close-button="true" role="alert" type="error">\n\t\t\t<span>[[_errorAlertStart]]</span><d2l-link href="javascript:window.location.reload(true)">[[localize(\'refreshAndTryAgain\')]]</d2l-link><span>[[_errorAlertEnd]]</span>\n\t\t</d2l-alert>\n\t\t<d2l-alert hidden$="[[!_showErrorLoadingBannerImage]]" class="d2l-image-banner-error-alert" type="error">\n\t\t\t<span>[[localize(\'imageLoadingError\')]]</span>\n\t\t</d2l-alert>\n\t</template>\n\n</dom-module>', document.head.appendChild(i.content), t({
    is: "d2l-image-banner-overlay",
    properties: {
        courseImageUploadCb: Function,
        organizationUrl: String,
        imageCatalogLocation: String,
        bannerTitle: String,
        hideBannerTitle: {
            type: Boolean,
            value: !1
        },
        canChangeBannerTitle: {
            type: Boolean,
            value: !1
        },
        errorLoadingBannerImage: {
            type: Boolean,
            value: !1
        },
        _removeBannerUrl: String,
        _addBannerUrl: String,
        _changeImageUrl: String,
        _organization: Object,
        _showBannerRemovedAlert: Boolean,
        _showBannerErrorAlert: Boolean,
        _errorAlertStart: String,
        _errorAlertEnd: String,
        _iconDetails: {
            type: Object,
            value: {
                className: "",
                iconName: ""
            }
        },
        _shouldRefreshCourseImage: Boolean,
        _nextImage: Object,
        _showDropdown: {
            type: Boolean,
            value: !1,
            computed: "_computeShowDropdown(_showRemoveBannerMenuItem, _showChangeImageMenuItem)"
        },
        _showChangeImageMenuItem: {
            type: Boolean,
            value: !1,
            computed: "_computeShowMenuItem(_changeImageUrl)"
        },
        _showRemoveBannerMenuItem: {
            type: Boolean,
            value: !1,
            computed: "_computeShowMenuItem(_removeBannerUrl)"
        },
        _showErrorLoadingBannerImage: {
            type: Boolean,
            value: !1,
            computed: "_computeShowErrorLoadingBannerImage(errorLoadingBannerImage, _showBannerErrorAlert, _showBannerRemovedAlert)"
        }
    },
    behaviors: [D2L.PolymerBehaviors.ImageBanner.LocalizeBehavior, D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior, D2L.PolymerBehaviors.FocusableBehavior],
    listeners: {
        "d2l-alert-button-press": "_onAlertButtonPressed",
        "d2l-alert-close": "_onAlertClosed",
        blur: "_onBlur"
    },
    observers: ["_localizeReady(localize, resources)"],
    _localizeReady: function(t, e) {
        t && e && this.organizationUrl && this._getOrganizationInfo()
    },
    attached: function() {
        n(this, () => {
            this.addEventListener("blur", this._onBlur, !0)
        }), this.listen(document.body, "set-course-image", "_onSetCourseImage"), this._observer = new IntersectionObserver(this._onChangeImageLowerThreshold.bind(this)), this._observer.observe(this.$.scrollThreshold)
    },
    detached: function() {
        this.removeEventListener("blur", this._onBlur, !0), this.unlisten(document.body, "set-course-image", "_onSetCourseImage"), this._observer.unobserve(this.$.scrollThreshold)
    },
    ready: function() {
        this._addPerfMark("ready"), this._showBannerRemovedAlert = !1, this._showBannerErrorAlert = !1, e(this.$.overlayContent).classList.add("d2l-image-banner-overlay-content-shown")
    },
    courseImageUploadCompleted: function(t) {
        const e = this.$.overlayContent;
        t ? (this._setDialogOpen(!1), this.toggleClass("change-image-loading", !0, e), this._shouldRefreshCourseImage = !0, this._getOrganizationInfo()) : this._displaySetImageResult(!1), this.focus()
    },
    _setDialogOpen: function(t) {
        this.shadowRoot.querySelector("d2l-dialog-fullscreen").opened = t;
        const e = this.shadowRoot.querySelector("d2l-basic-image-selector");
        t ? e.initializeSearch() : e.clearSearch()
    },
    _getOrganizationInfo: function() {
        const t = new Headers({
            Accept: "application/vnd.siren+json"
        });
        return this._organization && t.append("cache-control", "no-cache"), window.d2lfetch.fetch(new Request(this.organizationUrl, {
            headers: t
        })).then(t => t.ok ? t.json() : Promise.reject(t.status + t.statusText)).then(this._onOrganizationResponse.bind(this)).catch(this._onFetchError.bind(this))
    },
    _onChangeImageLowerThreshold: function(t) {
        for (let e = 0; e < t.length; e++)
            if (t[e].intersectionRatio > 0) {
                this.$$("d2l-basic-image-selector").loadMore();
                break
            }
    },
    _onSetCourseImage: function(t) {
        this._setDialogOpen(!1);
        if (((this._parseSiren(t.detail.organization).getLinkByRel("self") || {}).href || "") === this.organizationUrl) switch (t.detail.status) {
            case "set":
                if (!t.detail.image) break;
                var e = this._getDefaultImageLink(t.detail.image),
                    n = this.$.overlayContent;
                this.toggleClass("change-image-loading", !0, n), this._nextImage = t.detail.image, document.createElement("img").setAttribute("src", e);
                break;
            case "success":
                this._displaySetImageResult(!0);
                break;
            case "failure":
                this._displaySetImageResult(!1)
        }
    },
    _displaySetImageResult: function(t, e) {
        const n = this.$.overlayContent,
            o = "change-image-success",
            r = "change-image-failure";
        setTimeout(() => {
            this.toggleClass("change-image-loading", !1, n), this.toggleClass(o, t, n), this.toggleClass(r, !t, n), this._iconDetails = t ? {
                className: "checkmark",
                iconName: "tier2:check"
            } : {
                className: "fail-icon",
                iconName: "tier3:close"
            }, setTimeout(() => {
                t && this._setBannerImage(this._nextImage, e), this.toggleClass(o, !1, n), this.toggleClass(r, !1, n)
            }, 1e3)
        }, 1e3)
    },
    _launchCourseTileImageSelector: function() {
        this._setDialogOpen(!0)
    },
    _setBannerImage: function(t, e) {
        const n = document.querySelector(".d2l-course-banner .d2l-course-banner-image");
        let o = this._getDefaultImageLink(t);
        if (e) {
            const t = o.split("?")[1] ? "&" : "?";
            o = `${o}${t}timestamp=${(new Date).getTime()}`
        }
        n && o && (n.srcset = "", n.src = o)
    },
    _getDefaultImageLink: function(t) {
        return this.getDefaultImageLink(t, "wide")
    },
    _parseSiren: function(t) {
        return o(t)
    },
    _computeShowDropdown: function(t, e) {
        return t || e
    },
    _computeShowMenuItem: function(t) {
        return !!t
    },
    _computeShowErrorLoadingBannerImage: function(t, e, n) {
        return t && !e && !n
    },
    _onCourseImageResponse: function(t) {
        this._nextImage = this._parseSiren(t), this._displaySetImageResult(!0, !0)
    },
    _onOrganizationResponse: function(t) {
        const o = this._parseSiren(t);
        this._organization = o, this._addPerfMark("org-response.parsed"), this._addPerfMeasure("ready-to-org-response-parsed", "ready", "org-response.parsed"), this._removeBannerUrl = (o.getActionByName("remove-homepage-banner") || {}).href, this._changeImageUrl = (o.getActionByName("set-catalog-image") || {}).href, (this._removeBannerUrl || this._changeImageUrl || this.canChangeBannerTitle) && e(this.$.bannerTitle).classList.add("menu-exists"), n(this, () => {
            this._addPerfMark("org-response.rendered"), this._addPerfMeasure("ready-to-org-response-displayed", "ready", "org-response.rendered")
        }), this._shouldRefreshCourseImage && this._refreshCourseImage(o.getSubEntityByClass("course-image").href)
    },
    _refreshCourseImage: function(t) {
        window.d2lfetch.fetch(new Request(t, {
            headers: new Headers({
                Accept: "application/vnd.siren+json"
            })
        })).then(t => {
            if (t.ok) return t.json();
            this._displaySetImageResult(!1)
        }).then(this._onCourseImageResponse.bind(this))
    },
    _toggleCourseBanner: function() {
        const t = this._addBannerUrl || this._removeBannerUrl;
        if (e(this.$.overlayContent).classList.add("loading-overlay-shown"), t) return this.dispatchEvent(new CustomEvent("d2l-image-banner-overlay-toggle-banner", {
            bubbles: !0,
            composed: !0
        })), window.d2lfetch.fetch(new Request(t, {
            method: "PUT",
            headers: new Headers({
                Accept: "application/vnd.siren+json",
                "Content-Type": "application/x-www-form-urlencoded"
            }),
            body: `showCourseBanner=${t===this._addBannerUrl}`
        })).then(t => t.ok ? t.json() : Promise.reject(t.status + t.statusText)).then(this._onToggleBannerResponse.bind(this)).catch(this._onFetchError.bind(this))
    },
    _changeBannerTitle: function() {
        this.dispatchEvent(new CustomEvent("d2l-image-banner-overlay-change-banner-title", {
            bubbles: !0,
            composed: !0
        }))
    },
    _onToggleBannerResponse: function(t) {
        const e = this._parseSiren(t) || {};
        this._addBannerUrl = (e.getActionByName("add-homepage-banner") || {}).href, this._removeBannerUrl = (e.getActionByName("remove-homepage-banner") || {}).href, this._showBannerRemovedAlert = !!this._addBannerUrl, this._addBannerUrl ? this._showAlert(!0) : this._removeBannerUrl && this._showAlert(!1)
    },
    _onFetchError: function() {
        this._showBannerErrorAlert = !0, this._removeBannerUrl = null;
        const t = "REFRESH_PAGE",
            e = this.localize("somethingWentWrong", "placeholder", t).split(t);
        this._errorAlertStart = e[0], this._errorAlertEnd = e[1], this._showAlert(!0)
    },
    _showAlert: function(t) {
        e(this.$.overlayContent).classList.remove("loading-overlay-shown");
        const n = D2L.Dom.findComposedAncestor(this.root, t => !!t.classList && t.classList.contains("d2l-course-banner-container"));
        t ? (e(this.$.overlayContent).classList.remove("d2l-image-banner-overlay-content-shown"), n && n.classList.add("showing-alert")) : (e(this.$.overlayContent).classList.add("d2l-image-banner-overlay-content-shown"), n && n.classList.remove("showing-alert"))
    },
    _onAlertButtonPressed: function(t) {
        e(t).rootTarget === this.$$("d2l-alert") && this._toggleCourseBanner()
    },
    _onAlertClosed: function(t) {
        const n = e(t),
            o = this.$$(`#${n.rootTarget.id}`);
        n.rootTarget === o && (o.hidden = !0)
    },
    _addPerfMark: function(t) {
        window.performance && window.performance.mark && window.performance.mark(`d2l.image-banner-overlay.${t}`)
    },
    _addPerfMeasure: function(t, e, n) {
        window.performance && window.performance.measure && window.performance.measure(`d2l.image-banner-overlay.${t}`, `d2l.image-banner-overlay.${e}`, `d2l.image-banner-overlay.${n}`)
    },
    _onBlur: function() {
        setTimeout(() => {
            D2L.Dom.isComposedAncestor(this, D2L.Dom.Focus.getComposedActiveElement()) || this._closeDropdown()
        }, 0)
    },
    _closeDropdown: function() {
        this.$$("d2l-dropdown-menu").hasAttribute("opened") && this.$$("d2l-dropdown-more").toggleOpen()
    }
});