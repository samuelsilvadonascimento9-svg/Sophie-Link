import "./requestIdleCallback.js";
import {
    P as t,
    d as e
} from "./polymer-legacy.js";
import {
    g as i,
    a as n,
    b as o
} from "./common2.js";
import {
    E as r
} from "./index8.js";
import {
    a as s
} from "./render-status.js";
! function() {
    if ("object" == typeof window)
        if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
            get: function() {
                return this.intersectionRatio > 0
            }
        });
        else {
            var t = function() {
                    for (var t = window.document, e = o(t); e;) e = o(t = e.ownerDocument);
                    return t
                }(),
                e = [],
                i = null,
                n = null;
            s.prototype.THROTTLE_TIMEOUT = 100, s.prototype.POLL_INTERVAL = null, s.prototype.USE_MUTATION_OBSERVER = !0, s._setupCrossOriginUpdater = function() {
                return i || (i = function(t, i) {
                    n = t && i ? d(t, i) : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }, e.forEach(function(t) {
                        t._checkForIntersections()
                    })
                }), i
            }, s._resetCrossOriginUpdater = function() {
                i = null, n = null
            }, s.prototype.observe = function(t) {
                if (!this._observationTargets.some(function(e) {
                        return e.element == t
                    })) {
                    if (!t || 1 != t.nodeType) throw new Error("target must be an Element");
                    this._registerInstance(), this._observationTargets.push({
                        element: t,
                        entry: null
                    }), this._monitorIntersections(t.ownerDocument), this._checkForIntersections()
                }
            }, s.prototype.unobserve = function(t) {
                this._observationTargets = this._observationTargets.filter(function(e) {
                    return e.element != t
                }), this._unmonitorIntersections(t.ownerDocument), 0 == this._observationTargets.length && this._unregisterInstance()
            }, s.prototype.disconnect = function() {
                this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance()
            }, s.prototype.takeRecords = function() {
                var t = this._queuedEntries.slice();
                return this._queuedEntries = [], t
            }, s.prototype._initThresholds = function(t) {
                var e = t || [0];
                return Array.isArray(e) || (e = [e]), e.sort().filter(function(t, e, i) {
                    if ("number" != typeof t || isNaN(t) || t < 0 || t > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return t !== i[e - 1]
                })
            }, s.prototype._parseRootMargin = function(t) {
                var e = (t || "0px").split(/\s+/).map(function(t) {
                    var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                    if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                    return {
                        value: parseFloat(e[1]),
                        unit: e[2]
                    }
                });
                return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e
            }, s.prototype._monitorIntersections = function(e) {
                var i = e.defaultView;
                if (i && -1 == this._monitoringDocuments.indexOf(e)) {
                    var n = this._checkForIntersections,
                        r = null,
                        s = null;
                    this.POLL_INTERVAL ? r = i.setInterval(n, this.POLL_INTERVAL) : (h(i, "resize", n, !0), h(e, "scroll", n, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in i && (s = new i.MutationObserver(n)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })), this._monitoringDocuments.push(e), this._monitoringUnsubscribes.push(function() {
                        var t = e.defaultView;
                        t && (r && t.clearInterval(r), a(t, "resize", n, !0)), a(e, "scroll", n, !0), s && s.disconnect()
                    });
                    var c = this.root && (this.root.ownerDocument || this.root) || t;
                    if (e != c) {
                        var u = o(e);
                        u && this._monitorIntersections(u.ownerDocument)
                    }
                }
            }, s.prototype._unmonitorIntersections = function(e) {
                var i = this._monitoringDocuments.indexOf(e);
                if (-1 != i) {
                    var n = this.root && (this.root.ownerDocument || this.root) || t,
                        r = this._observationTargets.some(function(t) {
                            var i = t.element.ownerDocument;
                            if (i == e) return !0;
                            for (; i && i != n;) {
                                var r = o(i);
                                if ((i = r && r.ownerDocument) == e) return !0
                            }
                            return !1
                        });
                    if (!r) {
                        var s = this._monitoringUnsubscribes[i];
                        if (this._monitoringDocuments.splice(i, 1), this._monitoringUnsubscribes.splice(i, 1), s(), e != n) {
                            var h = o(e);
                            h && this._unmonitorIntersections(h.ownerDocument)
                        }
                    }
                }
            }, s.prototype._unmonitorAllIntersections = function() {
                var t = this._monitoringUnsubscribes.slice(0);
                this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
                for (var e = 0; e < t.length; e++) t[e]()
            }, s.prototype._checkForIntersections = function() {
                if (this.root || !i || n) {
                    var t = this._rootIsInDom(),
                        e = t ? this._getRootRect() : {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        };
                    this._observationTargets.forEach(function(n) {
                        var o = n.element,
                            s = u(o),
                            h = this._rootContainsTarget(o),
                            a = n.entry,
                            c = t && h && this._computeTargetAndRootIntersection(o, s, e),
                            l = null;
                        this._rootContainsTarget(o) ? i && !this.root || (l = e) : l = {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        };
                        var d = n.entry = new r({
                            time: window.performance && performance.now && performance.now(),
                            target: o,
                            boundingClientRect: s,
                            rootBounds: l,
                            intersectionRect: c
                        });
                        a ? t && h ? this._hasCrossedThreshold(a, d) && this._queuedEntries.push(d) : a && a.isIntersecting && this._queuedEntries.push(d) : this._queuedEntries.push(d)
                    }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
                }
            }, s.prototype._computeTargetAndRootIntersection = function(e, o, r) {
                if ("none" != window.getComputedStyle(e).display) {
                    for (var s = o, h = f(e), a = !1; !a && h;) {
                        var l = null,
                            m = 1 == h.nodeType ? window.getComputedStyle(h) : {};
                        if ("none" == m.display) return null;
                        if (h == this.root || 9 == h.nodeType)
                            if (a = !0, h == this.root || h == t) i && !this.root ? !n || 0 == n.width && 0 == n.height ? (h = null, l = null, s = null) : l = n : l = r;
                            else {
                                var p = f(h),
                                    g = p && u(p),
                                    w = p && this._computeTargetAndRootIntersection(p, g, r);
                                g && w ? (h = p, l = d(g, w)) : (h = null, s = null)
                            }
                        else {
                            var v = h.ownerDocument;
                            h != v.body && h != v.documentElement && "visible" != m.overflow && (l = u(h))
                        }
                        if (l && (s = c(l, s)), !s) break;
                        h = h && f(h)
                    }
                    return s
                }
            }, s.prototype._getRootRect = function() {
                var e;
                if (this.root && !p(this.root)) e = u(this.root);
                else {
                    var i = p(this.root) ? this.root : t,
                        n = i.documentElement,
                        o = i.body;
                    e = {
                        top: 0,
                        left: 0,
                        right: n.clientWidth || o.clientWidth,
                        width: n.clientWidth || o.clientWidth,
                        bottom: n.clientHeight || o.clientHeight,
                        height: n.clientHeight || o.clientHeight
                    }
                }
                return this._expandRectByRootMargin(e)
            }, s.prototype._expandRectByRootMargin = function(t) {
                var e = this._rootMarginValues.map(function(e, i) {
                        return "px" == e.unit ? e.value : e.value * (i % 2 ? t.width : t.height) / 100
                    }),
                    i = {
                        top: t.top - e[0],
                        right: t.right + e[1],
                        bottom: t.bottom + e[2],
                        left: t.left - e[3]
                    };
                return i.width = i.right - i.left, i.height = i.bottom - i.top, i
            }, s.prototype._hasCrossedThreshold = function(t, e) {
                var i = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                    n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (i !== n)
                    for (var o = 0; o < this.thresholds.length; o++) {
                        var r = this.thresholds[o];
                        if (r == i || r == n || r < i != r < n) return !0
                    }
            }, s.prototype._rootIsInDom = function() {
                return !this.root || m(t, this.root)
            }, s.prototype._rootContainsTarget = function(e) {
                var i = this.root && (this.root.ownerDocument || this.root) || t;
                return m(i, e) && (!this.root || i == e.ownerDocument)
            }, s.prototype._registerInstance = function() {
                e.indexOf(this) < 0 && e.push(this)
            }, s.prototype._unregisterInstance = function() {
                var t = e.indexOf(this); - 1 != t && e.splice(t, 1)
            }, window.IntersectionObserver = s, window.IntersectionObserverEntry = r
        }
    function o(t) {
        try {
            return t.defaultView && t.defaultView.frameElement || null
        } catch (t) {
            return null
        }
    }

    function r(t) {
        this.time = t.time, this.target = t.target, this.rootBounds = l(t.rootBounds), this.boundingClientRect = l(t.boundingClientRect), this.intersectionRect = l(t.intersectionRect || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }), this.isIntersecting = !!t.intersectionRect;
        var e = this.boundingClientRect,
            i = e.width * e.height,
            n = this.intersectionRect,
            o = n.width * n.height;
        this.intersectionRatio = i ? Number((o / i).toFixed(4)) : this.isIntersecting ? 1 : 0
    }

    function s(t, e) {
        var i, n, o, r = e || {};
        if ("function" != typeof t) throw new Error("callback must be a function");
        if (r.root && 1 != r.root.nodeType && 9 != r.root.nodeType) throw new Error("root must be a Document or Element");
        this._checkForIntersections = (i = this._checkForIntersections.bind(this), n = this.THROTTLE_TIMEOUT, o = null, function() {
            o || (o = setTimeout(function() {
                i(), o = null
            }, n))
        }), this._callback = t, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(r.rootMargin), this.thresholds = this._initThresholds(r.threshold), this.root = r.root || null, this.rootMargin = this._rootMarginValues.map(function(t) {
            return t.value + t.unit
        }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = []
    }

    function h(t, e, i, n) {
        "function" == typeof t.addEventListener ? t.addEventListener(e, i, n) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i)
    }

    function a(t, e, i, n) {
        "function" == typeof t.removeEventListener ? t.removeEventListener(e, i, n) : "function" == typeof t.detachEvent && t.detachEvent("on" + e, i)
    }

    function c(t, e) {
        var i = Math.max(t.top, e.top),
            n = Math.min(t.bottom, e.bottom),
            o = Math.max(t.left, e.left),
            r = Math.min(t.right, e.right),
            s = r - o,
            h = n - i;
        return s >= 0 && h >= 0 && {
            top: i,
            bottom: n,
            left: o,
            right: r,
            width: s,
            height: h
        } || null
    }

    function u(t) {
        var e;
        try {
            e = t.getBoundingClientRect()
        } catch (t) {}
        return e ? (e.width && e.height || (e = {
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            width: e.right - e.left,
            height: e.bottom - e.top
        }), e) : {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }
    }

    function l(t) {
        return !t || "x" in t ? t : {
            top: t.top,
            y: t.top,
            bottom: t.bottom,
            left: t.left,
            x: t.left,
            right: t.right,
            width: t.width,
            height: t.height
        }
    }

    function d(t, e) {
        var i = e.top - t.top,
            n = e.left - t.left;
        return {
            top: i,
            left: n,
            height: e.height,
            width: e.width,
            bottom: i + e.height,
            right: n + e.width
        }
    }

    function m(t, e) {
        for (var i = e; i;) {
            if (i == t) return !0;
            i = f(i)
        }
        return !1
    }

    function f(e) {
        var i = e.parentNode;
        return 9 == e.nodeType && e != t ? o(e) : (i && i.assignedSlot && (i = i.assignedSlot.parentNode), i && 11 == i.nodeType && i.host ? i.host : i)
    }

    function p(t) {
        return t && 9 === t.nodeType
    }
}(), window.D2L = window.D2L || {}, window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {}, window.D2L.PolymerBehaviors.Hypermedia = window.D2L.PolymerBehaviors.Hypermedia || {}, D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior = {
    getDefaultImageLink: function(t, e) {
        return o(t, e)
    },
    getImageSrcset: function(t, e, i) {
        return n(t, e, i)
    },
    getPictureSrcsets: function(t, e, n) {
        return i(t, e, n)
    }
};
const h = document.createElement("template");
h.innerHTML = '<dom-module id="d2l-course-image">\n\t<template strip-whitespace="">\n\t\t<style>\n\t\t\t.shown {\n\t\t\t\topacity: 1;\n\t\t\t}\n\n\t\t\timg {\n\t\t\t\tobject-fit: cover;\n\t\t\t\tobject-position: center;\n\t\t\t\theight: 100%;\n\t\t\t\twidth: 100%;\n\t\t\t\topacity: 0;\n\t\t\t\ttransition: opacity 0.5s;\n\t\t\t}\n\n\t\t\t:host([load-error]) img {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\n\t\t\t.d2l-course-image-error-container {\n\t\t\t\tdisplay: none;\n\t\t\t\theight: 100%;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t:host([load-error]) .d2l-course-image-error-container {\n\t\t\t\tdisplay: block;\n\t\t\t}\n\t\t</style>\n\n\t\t<img src="[[_src]]" srcset$="[[_srcset]]" loading="lazy" sizes$="[[_tileSizes]]" on-load="_showImage" on-error="_handleError" class$="[[_imageClass]]" alt="" aria-hidden="true">\n\t\t<div class="d2l-course-image-error-container">\n\t\t\t<svg viewBox="0 0 231 103" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t<g fill="none" fill-rule="evenodd"><path fill="#E3E9F1" d="M0 0h231v103H0z"/>\n\t\t\t\t\t<path d="M231 89l-41.216-37.138c-2.4-2.874-6.624-5-11.712-5.92-1.824-.287-3.648-.46-5.472-.46-3.36 0-6.72.518-9.696 1.552L101.368 68.53 77.752 58.93c-3.264-1.322-7.008-1.954-10.752-1.954-4.992 0-9.888 1.15-13.536 3.39L0 87v16h231V89z" fill="#CDD5DC"/>\n\t\t\t\t\t<path d="M116 41c0 8.636-5 15-15 15s-15-6.364-15-15 5-15 15-15 15 6.364 15 15z" fill="#CDD5DC"/>\n\t\t\t\t</g>\n\t\t\t</svg>\n\t\t</div>\n\t</template>\n\n</dom-module>', document.head.appendChild(h.content), window.D2L = window.D2L || {}, window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {}, window.D2L.PolymerBehaviors.Hypermedia = window.D2L.PolymerBehaviors.Hypermedia || {}, t({
    is: "d2l-course-image",
    properties: {
        type: {
            type: String,
            value: "tile"
        },
        sizes: Object,
        image: Object,
        loadError: {
            type: Boolean,
            readOnly: !0,
            reflectToAttribute: !0
        },
        _imageClass: String,
        _src: String,
        _srcset: String,
        _tileSizes: {
            type: String,
            computed: "_generateSizes(sizes)"
        },
        _load: Boolean
    },
    behaviors: [D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior],
    observers: ["_updateImage(_load, image, type)"],
    attached: function() {
        s(this, function() {
            var t = e(this.root).querySelector("img"),
                i = function(e, i) {
                    for (var n = 0; n < e.length; n++)
                        if (e[n].intersectionRatio > 0) {
                            i.unobserve(t), this._load = !0;
                            break
                        }
                }.bind(this),
                n = new IntersectionObserver(i.bind(this));
            requestIdleCallback(function() {
                this._load || (n.unobserve(t), this._load = !0)
            }.bind(this)), n.observe(t)
        }.bind(this))
    },
    _defaultSizes: {
        mobile: {
            maxwidth: 767,
            size: 100
        },
        tablet: {
            maxwidth: 991,
            size: 50
        },
        desktop: {
            size: 33
        }
    },
    _generateSizes: function(t) {
        if ("object" == typeof(t = t || this._defaultSizes)) {
            var e = {};
            return ["mobile", "tablet", "desktop"].forEach(function(i) {
                e[i] = {
                    maxwidth: t[i] && t[i].maxwidth || this._defaultSizes[i].maxwidth,
                    size: t[i] && t[i].size || this._defaultSizes[i].maxwidth
                }
            }.bind(this)), "(max-width: " + e.mobile.maxwidth + "px) " + e.mobile.size + "vw" + (", (max-width: " + e.tablet.maxwidth + "px) and (min-width: " + (e.mobile.maxwidth + 1) + "px) " + e.tablet.size + "vw") + (", " + e.desktop.size + "vw")
        }
        return t
    },
    _updateImage: function(t, e, i) {
        if (t && e)
            if (e.getLinksByClass) {
                var n = this.getDefaultImageLink(e, i);
                if (n) {
                    var o = e.forceImageRefresh ? "#" + (new Date).getTime() : "";
                    this._src = n + o
                }
                var s = this.getImageSrcset(e, i, e.forceImageRefresh);
                s && (this._srcset = s)
            } else this.image = r(e)
    },
    _showImage: function() {
        this._setLoadError(!1), this._imageClass = "shown", s(this, function() {
            this.fire("course-image-loaded")
        }.bind(this))
    },
    _handleError: function() {
        this._setLoadError(!0)
    },
    getTileSizes: function() {
        return this._tileSizes
    }
});