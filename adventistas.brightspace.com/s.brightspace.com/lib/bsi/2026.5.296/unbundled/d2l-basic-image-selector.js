import {
    P as t,
    d as e
} from "./polymer-legacy.js";
import "./colors.js";
import "./d2l-fetch.js";
import "./icon.js";
import "./loading-spinner.js";
import "./input-search.js";
import {
    a as n
} from "./render-status.js";
import {
    E as i
} from "./index8.js";
import "./d2l-course-image.js";
import "./d2l-localize-behavior.js";
const a = document.createElement("template");
a.innerHTML = '<dom-module id="d2l-search-widget">\n\t<template strip-whitespace="">\n\t\t<d2l-input-search label="[[searchLabel]]" placeholder="[[placeholderText]]"></d2l-input-search>\n\t</template>\n\n</dom-module>', document.head.appendChild(a.content), t({
    is: "d2l-search-widget",
    properties: {
        placeholderText: {
            type: String,
            value: ""
        },
        searchAction: {
            type: Object,
            observer: "_onSearchActionChanged"
        },
        searchFieldName: {
            type: String,
            value: "search"
        },
        searchQuery: {
            type: Object,
            value: {}
        },
        searchLabel: {
            type: String
        },
        _searchAction: {
            type: String
        },
        _searchUrl: {
            type: String,
            observer: "_onSearchUrlChanged"
        }
    },
    ready: function() {
        this._handleSearch = this._handleSearch.bind(this)
    },
    attached: function() {
        n(this, function() {
            this._getSearchInput().addEventListener("d2l-input-search-searched", this._handleSearch)
        }.bind(this))
    },
    detached: function() {
        this._getSearchInput().removeEventListener("d2l-input-search-searched", this._handleSearch)
    },
    search: function() {
        this._getSearchInput().search()
    },
    clear: function() {
        const t = this._getSearchInput();
        t.value = "", t.search()
    },
    _getSearchInput: function() {
        return this.shadowRoot.querySelector("d2l-input-search")
    },
    _handleSearch: function(t) {
        this._setSearchUrl(t.detail.value.trim())
    },
    _setSearchUrl: function(t) {
        if (this._searchAction) {
            var e = this.searchQuery;
            e[this.searchFieldName] = encodeURIComponent(t), this.set("_searchUrl", this._createActionUrl(this._searchAction, e))
        }
    },
    _createActionUrl: function(t, e) {
        e = e || {}, t.fields = t.fields || [];
        var n = {};
        t.fields.forEach(function(t) {
            e.hasOwnProperty(t.name) ? n[t.name] = e[t.name] : n[t.name] = t.value
        });
        var i = Object.keys(n).map(function(t) {
            return t + "=" + n[t]
        }).join("&");
        return i ? t.href + "?" + i : t.href
    },
    _onSearchActionChanged: function(t) {
        "string" == typeof t && (t = JSON.parse(t));
        var e = i({
            actions: [t]
        }).actions[0];
        this.set("_searchAction", e);
        var n = e.getFieldByName(this.searchFieldName);
        if (n && n.value) {
            this._getSearchInput().value = n.value
        }
    },
    _onSearchResponse: function(t) {
        var e = {
            searchValue: this._getSearchInput().value,
            searchResponse: t
        };
        this.fire("d2l-search-widget-results-changed", e)
    },
    _onSearchUrlChanged: function(t) {
        return window.d2lfetch.fetch(new Request(t, {
            headers: {
                Accept: "application/vnd.siren+json"
            }
        })).then(function(t) {
            return t.ok ? t.json() : Promise.reject(t.status + " " + t.statusText)
        }).then(i).then(this._onSearchResponse.bind(this))
    }
});
const s = document.createElement("template");
s.innerHTML = '<dom-module id="d2l-image-selector-tile-styles">\n\t<template strip-whitespace="">\n\t\t<style>\n\t\t\t:host {\n\t\t\t\tbackground-color: lightgrey;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.d2l-image-tile {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\toverflow: hidden;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t}\n\n\t\t\t.d2l-image-tile-overlay\t{\n\t\t\t\tz-index: 2;\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\tbackground: none;\n\n\t\t\t\tpointer-events: none;\n\t\t\t\ttransition: opacity 0.35s;\n\t\t\t\topacity: 0;\n\t\t\t}\n\n\t\t\t.d2l-image-tile-content {\n\t\t\t\tposition: relative;\n\t\t\t\theight: 100%;\n\t\t\t\tmin-height: 100%;\n\t\t\t\tmin-width: 100%;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\ttransition: transform 0.35s, filter 0.35s, -webkit-filter 0.35s;\n\t\t\t\ttransform: scale(1.0) translateZ(0);\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\n\t\t\t.no-image .d2l-image-tile-content,\n\t\t\t.no-image .click-overlay,\n\t\t\t.no-image .d2l-image-tile-overlay {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t.d2l-image-tile-content d2l-course-image {\n\t\t\t\theight: 100%;\n\t\t\t\tmin-width: 100%;\n\t\t\t\tbackground-color: lightgray;\n\t\t\t}\n\n\t\t\t.d2l-image-tile:hover .d2l-image-tile-content,\n\t\t\t.mobile-selected .d2l-image-tile-content {\n\t\t\t\ttransform: scale(1.2) translateZ(0);\n\t\t\t\t-webkit-filter: saturate(1.15);\n\t\t\t\tfilter: saturate(1.15);\n\t\t\t}\n\n\t\t\t.d2l-image-tile:hover .d2l-image-tile-overlay,\n\t\t\t.mobile-selected .d2l-image-tile-overlay {\n\t\t\t\tbox-shadow: 3px 2px 10px rgba(0, 0, 0, 0);\n\t\t\t\topacity: 1;\n\t\t\t}\n\n\t\t\t.click-overlay {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tz-index: 3;\n\t\t\t}\n\n\t\t\t.d2l-image-tile:hover .click-overlay {\n\t\t\t\tpointer-events: none;\n\t\t\t}\n\n\t\t\t.overlay-button {\n\t\t\t\tz-index: 4;\n\t\t\t\tbackground: rgba(0,0,0,0.5);\n\t\t\t\tborder: 0;\n\t\t\t\tborder-radius: 3px;\n\t\t\t\tpadding: 15px;\n\t\t\t\tcolor: white;\n\n\t\t\t\tmargin-top: -30px;\n\t\t\t\ttransition: margin-top 0.35s, color 0.5s, background 0.5s;\n\t\t\t\tfont-family: inherit;\n\t\t\t\tfont-size: inherit;\n\t\t\t\tpointer-events:all;\n\t\t\t}\n\n\t\t\t.overlay-button-inner {\n\t\t\t\theight: 100%;\n\t\t\t\twidth: 100%;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.overlay-button-text {\n\t\t\t\tpadding-top: 2px;\n\t\t\t\tfont-size: 0.8em;\n\t\t\t}\n\n\t\t\t.overlay-button:hover, .overlay-button:focus {\n\t\t\t\topacity: 1;\n\t\t\t\tbackground: var(--d2l-color-celestine);\n\t\t\t}\n\n\t\t\t.camera-icon {\n\t\t\t\tmargin-right: 10px;\n\t\t\t\tcolor: white;\n\t\t\t}\n\n\t\t\t.d2l-image-tile:hover .d2l-image-tile-overlay .overlay-button,\n\t\t\t.mobile-selected .d2l-image-tile-overlay .overlay-button {\n\t\t\t\tmargin-top: 0;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t</style>\n\t</template>\n</dom-module>', document.head.appendChild(s.content);
const r = {
        localizeConfig: {
            importFunc: async t => (await
                function(t) {
                    switch (t) {
                        case "./lang/ar.js":
                            return import ("./ar97.js");
                        case "./lang/cy.js":
                            return import ("./cy95.js");
                        case "./lang/da.js":
                            return import ("./da95.js");
                        case "./lang/de.js":
                            return import ("./de97.js");
                        case "./lang/en-gb.js":
                            return import ("./en-gb89.js");
                        case "./lang/en.js":
                            return import ("./en98.js");
                        case "./lang/es-es.js":
                            return import ("./es-es96.js");
                        case "./lang/es.js":
                            return import ("./es97.js");
                        case "./lang/fr-fr.js":
                            return import ("./fr-fr96.js");
                        case "./lang/fr-on.js":
                            return import ("./fr-on91.js");
                        case "./lang/fr.js":
                            return import ("./fr97.js");
                        case "./lang/haw.js":
                            return import ("./haw89.js");
                        case "./lang/hi.js":
                            return import ("./hi96.js");
                        case "./lang/ja.js":
                            return import ("./ja97.js");
                        case "./lang/ko.js":
                            return import ("./ko97.js");
                        case "./lang/mi.js":
                            return import ("./mi90.js");
                        case "./lang/nl.js":
                            return import ("./nl97.js");
                        case "./lang/pt.js":
                            return import ("./pt97.js");
                        case "./lang/sv.js":
                            return import ("./sv97.js");
                        case "./lang/th.js":
                            return import ("./th85.js");
                        case "./lang/tr.js":
                            return import ("./tr97.js");
                        case "./lang/vi.js":
                            return import ("./vi85.js");
                        case "./lang/zh-cn.js":
                            return import ("./zh-cn90.js");
                        case "./lang/zh-tw.js":
                            return import ("./zh-tw97.js");
                        default:
                            return new Promise(function(e, n) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(n.bind(null, new Error("Unknown variable dynamic import: " + t)))
                            })
                    }
                }(`./lang/${t}.js`)).default,
            osloCollection: "d2l-image-selector\\ImageSelector"
        }
    },
    o = [D2L.PolymerBehaviors.LocalizeBehavior, r],
    l = document.createElement("template");
l.innerHTML = '<dom-module id="d2l-image-selector-tile">\n\t<template strip-whitespace="">\n\t\t<style include="d2l-image-selector-tile-styles">\n\t\t\t.d2l-image-selector-tile-hidden {\n\t\t\t\topacity: 0;\n\t\t\t}\n\n\t\t\t.shown {\n\t\t\t\tanimation-name: shown;\n\t\t\t\tanimation-duration: 0.5s;\n\t\t\t\tanimation-fill-mode: forwards;\n\t\t\t}\n\n\t\t\t@keyframes shown {\n\t\t\t\t0% { opacity: 0 }\n\t\t\t\t100% { opacity: 1; }\n\t\t\t}\n\t\t</style>\n\n\t\t<div class$="[[_getTileClass(image)]]">\n\t\t\t<div class="click-overlay" on-click="_toggleOverlayOn" on-blur="_toggleOverlayOff" tabindex="-1">\n\t\t\t</div>\n\t\t\t<div class="d2l-image-tile-overlay">\n\t\t\t\t<button class="overlay-button" on-tap="_selectImage" on-focus="_toggleOverlayOn" on-blur="_toggleOverlayOff">\n\t\t\t\t\t<div class="overlay-button-inner">\n\t\t\t\t\t\t<d2l-icon class="camera-icon" icon="tier1:pic" aria-hidden="true"></d2l-icon>\n\t\t\t\t\t\t<span class="overlay-button-text">[[localize(\'useThisImage\')]]</span>\n\t\t\t\t\t</div>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<div class="d2l-image-tile-content">\n\t\t\t\t<d2l-course-image image="[[image]]" sizes="[[_imageSizes]]" type="narrow"></d2l-course-image>\n\t\t\t</div>\n\t\t</div>\n\t</template>\n\n\n</dom-module>', document.head.appendChild(l.content), t({
    is: "d2l-image-selector-tile",
    properties: {
        image: Object,
        _imageSizes: {
            type: Object,
            value: {
                mobile: {
                    size: 100
                },
                tablet: {
                    size: 50
                },
                desktop: {
                    size: 33
                }
            }
        },
        organization: Object,
        _setImageUrl: String,
        _imageClass: String
    },
    behaviors: [o, D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior],
    _getTileClass: function(t) {
        return t ? "d2l-image-tile" : "d2l-image-tile no-image"
    },
    _toggleOverlayOn: function() {
        this.toggleClass("mobile-selected", !0, this.$$(".d2l-image-tile"))
    },
    _toggleOverlayOff: function() {
        this.toggleClass("mobile-selected", !1, this.$$(".d2l-image-tile"))
    },
    _getSetImageUrl: function() {
        if (this.organization && this.image) {
            var t = (this.organization.getActionByName("set-catalog-image") || {}).href || "",
                e = this.image.getLinkByRel("self").href.match(/\/images\/[^/?]*/i);
            if ("" !== t && e) return t + "?imagePath=" + e[0]
        }
        return ""
    },
    _fireCourseImageMessage: function(t) {
        this.fire("set-course-image", {
            organization: this.organization,
            image: this.image,
            status: t
        })
    },
    _selectImage: function() {
        this._setImageUrl = this._getSetImageUrl();
        var t = window.d2lfetch.fetch(new Request(this._setImageUrl, {
            method: "POST",
            headers: {
                Accept: "application/vnd.siren+json"
            }
        })).then(function(t) {
            return t.ok ? Promise.resolve() : Promise.reject()
        }).then(this._fireCourseImageMessage.bind(this, "success")).catch(this._fireCourseImageMessage.bind(this, "failure"));
        return this._fireCourseImageMessage("set"), this.fire("image-selector-tile-image-selected"), t
    },
    _updateImageSource: function() {
        var t = e(this.root).querySelector("img");
        this._imageClass = "d2l-image-selector-tile-hidden", e(t).setAttribute("srcset", this.getImageSrcset(this.image, "narrow")), e(t).setAttribute("sizes", "(max-width: 767px) 100vw, (max-width: 991px) and (min-width: 768px) 50vw, 33vw")
    },
    _showImage: function() {
        this._imageClass = "shown"
    }
});
const c = document.createElement("template");
c.innerHTML = '<dom-module id="d2l-image-tile-grid">\n\t<template strip-whitespace="">\n\t\t<style>\n\t\t:host {\n\t\t\t--breakpoint-gutter-width: 0.8%;\n\n\t\t\t/*\n\t\t\t*\t100% = n(tile width) + 2n(margin) - 2(margin),\n\t\t\t*\tsee d2l-course-tile-grid-styles.html for a more in-depth description\n\t\t\t*/\n\t\t\t--breakpoint-two-column-width: 48.7%;\n\t\t\t--breakpoint-three-column-width: 31.6%;\n\n\t\t\t/*\n\t\t\t\tHeight has to be 73% of the width to maintain the image aspect ratio,\n\t\t\t\tuse padding, as it sizes in relation to the width of the screen as opposed to the height (yay css!)\n\t\t\t*/\n\t\t\t--breakpoint-one-column-height: 73%;\n\t\t\t--breakpoint-two-column-height: 35.551%;\n\t\t\t--breakpoint-three-column-height: 23.068%;\n\t\t}\n\n\t\t.grid-child {\n\t\t\twidth: 100%;\n\t\t}\n\n\t\t.grid-container {\n\t\t\tposition: relative;\n\t\t\twidth: 100%;\n\t\t\tdisplay: flex;\n\t\t\tflex-wrap: wrap;\n\t\t\tflex-direction: row;\n\t\t\talign-items: flex-start;\n\t\t}\n\n\t\t.responsive-columns-3-2-1 {\n\t\t\t/* This needs to be a block so that we get the width-based padding-top for it\'s children on firefox */\n\t\t\tdisplay: block;\n\t\t}\n\n\t\t.responsive-columns-3-2-1 > .grid-child {\n\t\t\theight: auto;\n\t\t\tposition: relative;\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t@media screen and (min-width: 992px) {\n\t\t\t.responsive-columns-3-2-1 {\n\t\t\t\tpadding: 0;\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child {\n\t\t\t\twidth: var(--breakpoint-three-column-width);\n\t\t\t\tpadding-top: var(--breakpoint-three-column-height);\n\t\t\t\tmargin: var(--breakpoint-gutter-width);\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child:nth-child(3n) {\n\t\t\t\tmargin-right: 0;\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child:nth-child(3n+1) {\n\t\t\t\tmargin-left: 0;\n\t\t\t}\n\t\t}\n\n\t\t@media screen and (max-width: 991px) and (min-width: 768px) {\n\t\t\t.responsive-columns-3-2-1 {\n\t\t\t\tpadding: 0;\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child {\n\t\t\t\twidth: var(--breakpoint-two-column-width);\n\t\t\t\tpadding-top: var(--breakpoint-two-column-height);\n\t\t\t\tmargin: var(--breakpoint-gutter-width);\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child:nth-child(2n) {\n\t\t\t\tmargin-right: 0;\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child:nth-child(2n+1) {\n\t\t\t\tmargin-left: 0;\n\t\t\t}\n\t\t}\n\n\t\t@media screen and (max-width: 767px) {\n\t\t\t.responsive-columns-3-2-1 {\n\t\t\t\tmargin: 0 -28px;\n\t\t\t\twidth: 100vw;\n\t\t\t}\n\n\t\t\t.responsive-columns-3-2-1 > .grid-child {\n\t\t\t\twidth: 100%;\n\t\t\t\tpadding-top: var(--breakpoint-one-column-height);\n\t\t\t\tmargin: var(--breakpoint-gutter-width) 0;\n\t\t\t}\n\t\t}\n\t\t</style>\n\n\n\t\t<div class="image-selector-tile-container responsive-columns-3-2-1 grid-container">\n\t\t\t<template id="enrollmentsTemplate" is="dom-repeat" items="[[images]]">\n\t\t\t\t<d2l-image-selector-tile image="[[item]]" organization="[[organization]]" class="grid-child"></d2l-image-selector-tile>\n\t\t\t</template>\n\t\t</div>\n\n\t</template>\n\t\n</dom-module>', document.head.appendChild(c.content), t({
    is: "d2l-image-tile-grid",
    properties: {
        images: {
            type: Array,
            observer: "_imagesChanged"
        },
        organization: Object
    },
    _imagesChanged: function(t) {
        if (!t || 0 === t.length) {
            for (var e = new Array(20), n = 0; n < 20; n++) e[n] = null;
            this.images = e
        }
    }
});
const h = document.createElement("template");
h.innerHTML = '<dom-module id="d2l-basic-image-selector">\n\t<template strip-whitespace="">\n\t\t<style>\n\t\t\t#image-search{\n\t\t\t\twidth: 50%;\n\t\t\t}\n\n\t\t\t.no-results-search-text {\n\t\t\t\tfont-weight: bolder;\n\t\t\t\tword-wrap: break-word;\n\t\t\t}\n\n\t\t\t.no-results-text {\n\t\t\t\tfont-size: 1.5rem;\n\t\t\t\tmargin-bottom: 12px;\n\t\t\t}\n\n\t\t\t.top-section {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: space-between;\n\t\t\t\talign-items: center;\n\t\t\t\tmargin-bottom: 45px;\n\t\t\t}\n\n\t\t\tdiv.upload {\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\n\t\t\t.upload-text {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\n\t\t\t.upload:focus .upload-text,\n\t\t\t.upload:hover .upload-text,\n\t\t\t.upload:focus .upload-icon,\n\t\t\t.upload:hover .upload-icon {\n\t\t\t\ttext-decoration: underline;\n\t\t\t\tcolor: var(--d2l-color-celestine);\n\t\t\t}\n\n\t\t\t#lazyLoadSpinner {\n\t\t\t\tdisplay: block;\n\t\t\t\tmargin: auto;\n\t\t\t\tmargin-bottom: 30px;\n\t\t\t}\n\n\t\t\t#lazyLoadSpinner.d2l-basic-image-selector-hidden {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t</style>\n\n\t\t<div class="top-section">\n\t\t\t<d2l-search-widget id="image-search" search-action="[[_searchAction]]" search-label="[[localize(\'search\')]]" placeholder-text="[[localize(\'search\')]]" search-field-name="search">\n\t\t\t</d2l-search-widget>\n\n\t\t\t<template is="dom-if" if="[[_organizationChangeImageHref]]" restamp="true">\n\t\t\t\t<div role="button" tabindex="0" class="upload" on-tap="_handleUpload" on-keydown="_handleUpload">\n\t\t\t\t\t<d2l-icon class="upload-icon" icon="tier2:upload" aria-hidden="true"></d2l-icon>\n\t\t\t\t\t<span class="upload-text">[[localize(\'upload\')]]</span>\n\t\t\t\t</div>\n\t\t\t</template>\n\n\t\t</div>\n\n\t\t<template is="dom-if" if="[[_showGrid]]">\n\t\t\t<d2l-image-tile-grid id="image-grid" organization="[[organization]]" images="[[_images]]"></d2l-image-tile-grid>\n\t\t</template>\n\n\t\t<template is="dom-if" if="[[!_showGrid]]">\n\t\t\t<div class="no-results-area">\n\t\t\t\t<div class="no-results-text">\n\t\t\t\t\t<span>[[_noResultsTextStart]]</span><span class="no-results-search-text">[[_noResultsTextMid]]</span><span>[[_noResultsTextEnd]]</span>\n\t\t\t\t</div>\n\t\t\t\t[[localize(\'images_pleaseModify\')]]\n\t\t\t</div>\n\t\t</template>\n\t\t<d2l-loading-spinner id="lazyLoadSpinner" class$="[[_loadingSpinnerClass]]" size="100">\n\t\t</d2l-loading-spinner>\n\t</template>\n\n</dom-module>', document.head.appendChild(h.content), t({
    is: "d2l-basic-image-selector",
    ready: function() {
        this._images = this._defaultImages
    },
    properties: {
        courseImageUploadCb: Function,
        imageCatalogLocation: String,
        organization: Object,
        _searchString: String,
        _images: Array,
        _searchAction: String,
        _noResultsTextStart: String,
        _noResultsTextMid: String,
        _noResultsTextEnd: String,
        _showGrid: Boolean,
        _organizationChangeImageHref: String,
        _nextSearchResultPage: String,
        _nextDefaultResultPage: String,
        _loadingSpinnerClass: {
            type: String,
            value: "d2l-basic-image-selector-hidden"
        }
    },
    behaviors: [o],
    observers: ["_onOrganizationChanged(organization)"],
    attached: function() {
        this.listen(this.$$("d2l-search-widget"), "d2l-search-widget-results-changed", "_searchResultsChanged")
    },
    detached: function() {
        this.unlisten(this.$$("d2l-search-widget"), "d2l-search-widget-results-changed", "_searchResultsChanged")
    },
    _searchImages: [],
    _defaultImages: [],
    _searchResultsChanged: function(t) {
        t.detail.searchValue ? (this._displaySearchResults(t.detail.searchValue, t.detail.searchResponse), this._setNextPage(t.detail.searchResponse, !1)) : this._displayDefaultResults(), this._updateImages()
    },
    _displaySearchResults: function(t, e) {
        var n = "$$$DELIMITER???",
            i = this.localize("images_noResults", "search", n).split(n);
        this._searchImages = e.entities || [], this._noResultsTextStart = i[0], this._noResultsTextMid = t, this._noResultsTextEnd = i[1], this._showGrid = "" === (t || "") || this._searchImages.length > 0
    },
    _setNextPage: function(t, e) {
        if (t) {
            var n = (t.getLinkByRel("next") || {}).href || null;
            e ? this._nextDefaultResultPage = n : this._nextSearchResultPage = n, this.fire("clear-image-scroll-threshold")
        }
    },
    _displayDefaultResults: function() {
        this._searchImages = [], this._showGrid = !0, this._nextSearchResultPage = null
    },
    _onImagesRequestResponse: function(t, e, n) {
        var i;
        this._loadingSpinnerClass = "d2l-basic-image-selector-hidden", e ? (i = (n ? this._defaultImages : this._searchImages) || [], t && t.entities && (i = i.concat(t.entities))) : i = t.entities, n ? this._defaultImages = i : this._searchImages = i, this._setNextPage(t, n), this._updateImages()
    },
    _onOrganizationChanged: function(t) {
        t.getLinkByRel || (this.organization = i(t))
    },
    initializeSearch: function() {
        if (this._searchAction = JSON.stringify(this._getSearchAction()), this._showGrid = !0, this.$$("d2l-search-widget").clear(), this._organizationChangeImageHref = this._getChangeCourseImageLink(this.organization), this.organization && (this.organization.properties || {}).name ? this._searchString = this._getSearchStringValue(this.organization.properties.name, !0) : this._searchString = this._getSearchStringValue("THIS_WILL_RETURN_NOTHING", !0), void 0 !== this._searchString && null !== this._searchString) return this._fetchSirenEntity(this._searchString).then(this._onDefaultImagesRequestResponse.bind(this))
    },
    clearSearch: function() {
        this._searchString = "", this._images = [], this._searchImages = [], this._defaultImages = [], this._nextSearchResultPage = null, this._nextDefaultResultPage = null, this._showGrid = !0
    },
    _getSearchAction: function() {
        return {
            name: "search-catalog-image",
            method: "GET",
            href: this._searchPath,
            fields: [{
                name: "search",
                type: "search",
                value: ""
            }]
        }
    },
    get _searchPath() {
        if (!this.imageCatalogLocation) return null;
        var t = "/" === this.imageCatalogLocation.slice(-1) ? "" : "/";
        return this.imageCatalogLocation + t + "images"
    },
    _getSearchStringValue: function(t, e) {
        var n = e ? "&appendMore=1" : "";
        return this._searchPath + "?search=" + t + n
    },
    _updateImages: function() {
        var t = this._searchImages || [];
        this._images = t.length > 0 ? t : this._defaultImages
    },
    _getChangeCourseImageLink: function(t) {
        var e = t && t.getLinkByRel(/course-offering-info-page/);
        if (e) return e.href
    },
    loadMore: function() {
        if (this._showGrid) return this._nextSearchResultPage ? (this._loadingSpinnerClass = "", this.$.lazyLoadSpinner.scrollIntoView(), this._fetchSirenEntity(this._nextSearchResultPage).then(this._moreSearchImagesRequestResponse.bind(this))) : this._nextDefaultResultPage && 0 === (this._searchImages || []).length ? (this._loadingSpinnerClass = "", this.$.lazyLoadSpinner.scrollIntoView(), this._fetchSirenEntity(this._nextDefaultResultPage).then(this._moreDefaultImagesRequestResponse.bind(this))) : void(this._loadingSpinnerClass = "d2l-basic-image-selector-hidden");
        this._loadingSpinnerClass = "d2l-basic-image-selector-hidden"
    },
    _moreDefaultImagesRequestResponse: function(t) {
        this._onImagesRequestResponse(t, !0, !0)
    },
    _moreSearchImagesRequestResponse: function(t) {
        this._onImagesRequestResponse(t, !0, !1)
    },
    _onDefaultImagesRequestResponse: function(t) {
        this._onImagesRequestResponse(t, !1, !0)
    },
    _handleUpload: function(t) {
        ("keydown" === t.type && 13 === t.keyCode || "tap" === t.type) && (this.courseImageUploadCb ? this.courseImageUploadCb() : window.location.href = this._organizationChangeImageHref)
    },
    _fetchSirenEntity: function(t) {
        return window.d2lfetch.fetch(new Request(t, {
            headers: {
                Accept: "application/vnd.siren+json"
            }
        })).then(function(t) {
            if (t.ok) return t.json();
            Promise.reject(t.status + " " + t.statusText)
        }).then(i)
    }
});