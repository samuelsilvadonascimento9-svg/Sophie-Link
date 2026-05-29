import {
    d as e,
    m as t
} from "./polymer-legacy.js";
import {
    I as s
} from "./iron-selectable.js";
import {
    e as i
} from "./_rollupPluginBabelHelpers.js";
import "./d2l-localize-behavior.js";
import {
    d as n
} from "./mixin.js";
import {
    _ as r
} from "./localize-mixin.js";
var a = {
        "U+0008": "backspace",
        "U+0009": "tab",
        "U+001B": "esc",
        "U+0020": "space",
        "U+007F": "del"
    },
    o = {
        8: "backspace",
        9: "tab",
        13: "enter",
        27: "esc",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        46: "del",
        106: "*"
    },
    l = {
        shift: "shiftKey",
        ctrl: "ctrlKey",
        alt: "altKey",
        meta: "metaKey"
    },
    c = /[a-z0-9*]/,
    u = /U\+/,
    h = /^arrow/,
    d = /^space(bar)?/,
    f = /^escape$/;

function m(e, t) {
    var s = "";
    if (e) {
        var i = e.toLowerCase();
        " " === i || d.test(i) ? s = "space" : f.test(i) ? s = "esc" : 1 == i.length ? t && !c.test(i) || (s = i) : s = h.test(i) ? i.replace("arrow", "") : "multiply" == i ? "*" : i
    }
    return s
}

function p(e, t) {
    return e.key ? m(e.key, t) : e.detail && e.detail.key ? m(e.detail.key, t) : (s = e.keyIdentifier, i = "", s && (s in a ? i = a[s] : u.test(s) ? (s = parseInt(s.replace("U+", "0x"), 16), i = String.fromCharCode(s).toLowerCase()) : i = s.toLowerCase()), i || function(e) {
        var t = "";
        return Number(e) && (t = e >= 65 && e <= 90 ? String.fromCharCode(32 + e) : e >= 112 && e <= 123 ? "f" + (e - 112 + 1) : e >= 48 && e <= 57 ? String(e - 48) : e >= 96 && e <= 105 ? String(e - 96) : o[e]), t
    }(e.keyCode) || "");
    var s, i
}

function g(e, t) {
    return p(t, e.hasModifiers) === e.key && (!e.hasModifiers || !!t.shiftKey == !!e.shiftKey && !!t.ctrlKey == !!e.ctrlKey && !!t.altKey == !!e.altKey && !!t.metaKey == !!e.metaKey)
}

function y(e) {
    return e.trim().split(" ").map(function(e) {
        return function(e) {
            return 1 === e.length ? {
                combo: e,
                key: e,
                event: "keydown"
            } : e.split("+").reduce(function(e, t) {
                var s = t.split(":"),
                    i = s[0],
                    n = s[1];
                return i in l ? (e[l[i]] = !0, e.hasModifiers = !0) : (e.key = i, e.event = n || "keydown"), e
            }, {
                combo: e.split(":").shift()
            })
        }(e)
    })
}
const _ = {
        properties: {
            keyEventTarget: {
                type: Object,
                value: function() {
                    return this
                }
            },
            stopKeyboardEventPropagation: {
                type: Boolean,
                value: !1
            },
            _boundKeyHandlers: {
                type: Array,
                value: function() {
                    return []
                }
            },
            _imperativeKeyBindings: {
                type: Object,
                value: function() {
                    return {}
                }
            }
        },
        observers: ["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],
        keyBindings: {},
        registered: function() {
            this._prepKeyBindings()
        },
        attached: function() {
            this._listenKeyEventListeners()
        },
        detached: function() {
            this._unlistenKeyEventListeners()
        },
        addOwnKeyBinding: function(e, t) {
            this._imperativeKeyBindings[e] = t, this._prepKeyBindings(), this._resetKeyEventListeners()
        },
        removeOwnKeyBindings: function() {
            this._imperativeKeyBindings = {}, this._prepKeyBindings(), this._resetKeyEventListeners()
        },
        keyboardEventMatchesKeys: function(e, t) {
            for (var s = y(t), i = 0; i < s.length; ++i)
                if (g(s[i], e)) return !0;
            return !1
        },
        _collectKeyBindings: function() {
            var e = this.behaviors.map(function(e) {
                return e.keyBindings
            });
            return -1 === e.indexOf(this.keyBindings) && e.push(this.keyBindings), e
        },
        _prepKeyBindings: function() {
            for (var e in this._keyBindings = {}, this._collectKeyBindings().forEach(function(e) {
                    for (var t in e) this._addKeyBinding(t, e[t])
                }, this), this._imperativeKeyBindings) this._addKeyBinding(e, this._imperativeKeyBindings[e]);
            for (var t in this._keyBindings) this._keyBindings[t].sort(function(e, t) {
                var s = e[0].hasModifiers;
                return s === t[0].hasModifiers ? 0 : s ? -1 : 1
            })
        },
        _addKeyBinding: function(e, t) {
            y(e).forEach(function(e) {
                this._keyBindings[e.event] = this._keyBindings[e.event] || [], this._keyBindings[e.event].push([e, t])
            }, this)
        },
        _resetKeyEventListeners: function() {
            this._unlistenKeyEventListeners(), this.isAttached && this._listenKeyEventListeners()
        },
        _listenKeyEventListeners: function() {
            this.keyEventTarget && Object.keys(this._keyBindings).forEach(function(e) {
                var t = this._keyBindings[e],
                    s = this._onKeyBindingEvent.bind(this, t);
                this._boundKeyHandlers.push([this.keyEventTarget, e, s]), this.keyEventTarget.addEventListener(e, s)
            }, this)
        },
        _unlistenKeyEventListeners: function() {
            for (var e, t, s, i; this._boundKeyHandlers.length;) t = (e = this._boundKeyHandlers.pop())[0], s = e[1], i = e[2], t.removeEventListener(s, i)
        },
        _onKeyBindingEvent: function(e, t) {
            if (this.stopKeyboardEventPropagation && t.stopPropagation(), !t.defaultPrevented)
                for (var s = 0; s < e.length; s++) {
                    var i = e[s][0],
                        n = e[s][1];
                    if (g(i, t) && (this._triggerKeyHandler(i, n, t), t.defaultPrevented)) return
                }
        },
        _triggerKeyHandler: function(e, t, s) {
            var i = Object.create(e);
            i.keyboardEvent = s;
            var n = new CustomEvent(e.event, {
                detail: i,
                cancelable: !0
            });
            this[t].call(this, n), n.defaultPrevented && s.preventDefault()
        }
    },
    v = {
        properties: {
            multi: {
                type: Boolean,
                value: !1,
                observer: "multiChanged"
            },
            selectedValues: {
                type: Array,
                notify: !0,
                value: function() {
                    return []
                }
            },
            selectedItems: {
                type: Array,
                readOnly: !0,
                notify: !0,
                value: function() {
                    return []
                }
            }
        },
        observers: ["_updateSelected(selectedValues.splices)"],
        select: function(e) {
            this.multi ? this._toggleSelected(e) : this.selected = e
        },
        multiChanged: function(e) {
            this._selection.multi = e, this._updateSelected()
        },
        get _shouldUpdateSelection() {
            return null != this.selected || null != this.selectedValues && this.selectedValues.length
        },
        _updateAttrForSelected: function() {
            this.multi ? this.selectedItems && this.selectedItems.length > 0 && (this.selectedValues = this.selectedItems.map(function(e) {
                return this._indexToValue(this.indexOf(e))
            }, this).filter(function(e) {
                return null != e
            }, this)) : s._updateAttrForSelected.apply(this)
        },
        _updateSelected: function() {
            this.multi ? this._selectMulti(this.selectedValues) : this._selectSelected(this.selected)
        },
        _selectMulti: function(e) {
            e = e || [];
            var t = (this._valuesToItems(e) || []).filter(function(e) {
                return null != e
            });
            this._selection.clear(t);
            for (var s = 0; s < t.length; s++) this._selection.setItemSelected(t[s], !0);
            this.fallbackSelection && !this._selection.get().length && (this._valueToItem(this.fallbackSelection) && this.select(this.fallbackSelection))
        },
        _selectionChange: function() {
            var e = this._selection.get();
            this.multi ? (this._setSelectedItems(e), this._setSelectedItem(e.length ? e[0] : null)) : null != e ? (this._setSelectedItems([e]), this._setSelectedItem(e)) : (this._setSelectedItems([]), this._setSelectedItem(null))
        },
        _toggleSelected: function(e) {
            var t = this.selectedValues.indexOf(e);
            t < 0 ? this.push("selectedValues", e) : this.splice("selectedValues", t, 1)
        },
        _valuesToItems: function(e) {
            return null == e ? null : e.map(function(e) {
                return this._valueToItem(e)
            }, this)
        }
    },
    b = {
        properties: {
            focusedItem: {
                observer: "_focusedItemChanged",
                readOnly: !0,
                type: Object
            },
            attrForItemTitle: {
                type: String
            },
            disabled: {
                type: Boolean,
                value: !1,
                observer: "_disabledChanged"
            }
        },
        _MODIFIER_KEYS: ["Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock", "Hyper", "Meta", "NumLock", "OS", "ScrollLock", "Shift", "Super", "Symbol", "SymbolLock"],
        _SEARCH_RESET_TIMEOUT_MS: 1e3,
        _previousTabIndex: 0,
        hostAttributes: {
            role: "menu"
        },
        observers: ["_updateMultiselectable(multi)"],
        listeners: {
            focus: "_onFocus",
            keydown: "_onKeydown",
            "iron-items-changed": "_onIronItemsChanged"
        },
        keyBindings: {
            up: "_onUpKey",
            down: "_onDownKey",
            esc: "_onEscKey",
            "shift+tab:keydown": "_onShiftTabDown"
        },
        attached: function() {
            this._resetTabindices()
        },
        select: function(e) {
            this._defaultFocusAsync && (this.cancelAsync(this._defaultFocusAsync), this._defaultFocusAsync = null);
            var t = this._valueToItem(e);
            t && t.hasAttribute("disabled") || (this._setFocusedItem(t), v.select.apply(this, arguments))
        },
        _resetTabindices: function() {
            var e = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
            this.items.forEach(function(t) {
                t.setAttribute("tabindex", t === e ? "0" : "-1"), t.setAttribute("aria-selected", this._selection.isSelected(t))
            }, this)
        },
        _updateMultiselectable: function(e) {
            e ? this.setAttribute("aria-multiselectable", "true") : this.removeAttribute("aria-multiselectable")
        },
        _focusWithKeyboardEvent: function(e) {
            if (-1 === this._MODIFIER_KEYS.indexOf(e.key)) {
                this.cancelDebouncer("_clearSearchText");
                for (var t, s = this._searchText || "", i = (s += (e.key && 1 == e.key.length ? e.key : String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length, n = 0; t = this.items[n]; n++)
                    if (!t.hasAttribute("disabled")) {
                        var r = this.attrForItemTitle || "textContent",
                            a = (t[r] || t.getAttribute(r) || "").trim();
                        if (!(a.length < i) && a.slice(0, i).toLocaleLowerCase() == s) {
                            this._setFocusedItem(t);
                            break
                        }
                    }
                this._searchText = s, this.debounce("_clearSearchText", this._clearSearchText, this._SEARCH_RESET_TIMEOUT_MS)
            }
        },
        _clearSearchText: function() {
            this._searchText = ""
        },
        _focusPrevious: function() {
            for (var t = this.items.length, s = Number(this.indexOf(this.focusedItem)), i = 1; i < t + 1; i++) {
                var n = this.items[(s - i + t) % t];
                if (!n.hasAttribute("disabled")) {
                    var r = e(n).getOwnerRoot() || document;
                    if (this._setFocusedItem(n), e(r).activeElement == n) return
                }
            }
        },
        _focusNext: function() {
            for (var t = this.items.length, s = Number(this.indexOf(this.focusedItem)), i = 1; i < t + 1; i++) {
                var n = this.items[(s + i) % t];
                if (!n.hasAttribute("disabled")) {
                    var r = e(n).getOwnerRoot() || document;
                    if (this._setFocusedItem(n), e(r).activeElement == n) return
                }
            }
        },
        _applySelection: function(e, t) {
            t ? e.setAttribute("aria-selected", "true") : e.setAttribute("aria-selected", "false"), s._applySelection.apply(this, arguments)
        },
        _focusedItemChanged: function(e, t) {
            t && t.setAttribute("tabindex", "-1"), !e || e.hasAttribute("disabled") || this.disabled || (e.setAttribute("tabindex", "0"), e.focus())
        },
        _onIronItemsChanged: function(e) {
            e.detail.addedNodes.length && this._resetTabindices()
        },
        _onShiftTabDown: function(e) {
            var t = this.getAttribute("tabindex");
            b._shiftTabPressed = !0, this._setFocusedItem(null), this.setAttribute("tabindex", "-1"), this.async(function() {
                this.setAttribute("tabindex", t), b._shiftTabPressed = !1
            }, 1)
        },
        _onFocus: function(t) {
            if (!b._shiftTabPressed) {
                var s = e(t).rootTarget;
                (s === this || void 0 === s.tabIndex || this.isLightDescendant(s)) && (this._defaultFocusAsync = this.async(function() {
                    var e = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
                    this._setFocusedItem(null), e ? this._setFocusedItem(e) : this.items[0] && this._focusNext()
                }))
            }
        },
        _onUpKey: function(e) {
            this._focusPrevious(), e.detail.keyboardEvent.preventDefault()
        },
        _onDownKey: function(e) {
            this._focusNext(), e.detail.keyboardEvent.preventDefault()
        },
        _onEscKey: function(e) {
            var t = this.focusedItem;
            t && t.blur()
        },
        _onKeydown: function(e) {
            this.keyboardEventMatchesKeys(e, "up down esc") || this._focusWithKeyboardEvent(e), e.stopPropagation()
        },
        _activateHandler: function(e) {
            s._activateHandler.call(this, e), e.stopPropagation()
        },
        _disabledChanged: function(e) {
            e ? (this._previousTabIndex = this.hasAttribute("tabindex") ? this.tabIndex : 0, this.removeAttribute("tabindex")) : this.hasAttribute("tabindex") || this.setAttribute("tabindex", this._previousTabIndex)
        },
        _shiftTabPressed: !1
    },
    j = [
        [s, v], _, b
    ];
const k = n(e => class extends(t([D2L.PolymerBehaviors.LocalizeBehavior], e)) {
        constructor(...e) {
            super(...e), i(this, "localizeConfig", {
                importFunc: async e => (await
                    function(e) {
                        switch (e) {
                            case "./lang/ar.js":
                                return import ("./ar114.js");
                            case "./lang/cy.js":
                                return import ("./cy112.js");
                            case "./lang/da.js":
                                return import ("./da112.js");
                            case "./lang/de.js":
                                return import ("./de114.js");
                            case "./lang/en-gb.js":
                                return import ("./en-gb104.js");
                            case "./lang/en.js":
                                return import ("./en107.js");
                            case "./lang/es-es.js":
                                return import ("./es-es113.js");
                            case "./lang/es.js":
                                return import ("./es114.js");
                            case "./lang/fr-fr.js":
                                return import ("./fr-fr113.js");
                            case "./lang/fr-on.js":
                                return import ("./fr-on106.js");
                            case "./lang/fr.js":
                                return import ("./fr114.js");
                            case "./lang/haw.js":
                                return import ("./haw104.js");
                            case "./lang/hi.js":
                                return import ("./hi112.js");
                            case "./lang/ja.js":
                                return import ("./ja114.js");
                            case "./lang/ko.js":
                                return import ("./ko114.js");
                            case "./lang/mi.js":
                                return import ("./mi102.js");
                            case "./lang/nl.js":
                                return import ("./nl114.js");
                            case "./lang/pt.js":
                                return import ("./pt114.js");
                            case "./lang/sv.js":
                                return import ("./sv114.js");
                            case "./lang/th.js":
                                return import ("./th98.js");
                            case "./lang/tr.js":
                                return import ("./tr114.js");
                            case "./lang/vi.js":
                                return import ("./vi98.js");
                            case "./lang/zh-cn.js":
                                return import ("./zh-cn103.js");
                            case "./lang/zh-tw.js":
                                return import ("./zh-tw114.js");
                            default:
                                return new Promise(function(t, s) {
                                    ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(s.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                })
                        }
                    }(`./lang/${e}.js`)).default,
                osloCollection: "d2l-my-courses\\d2l-my-courses"
            })
        }
    }),
    K = e => class extends(r(e)) {
        static get localizeConfig() {
            return {
                importFunc: async e => (await
                    function(e) {
                        switch (e) {
                            case "./lang/ar.js":
                                return import ("./ar114.js");
                            case "./lang/cy.js":
                                return import ("./cy112.js");
                            case "./lang/da.js":
                                return import ("./da112.js");
                            case "./lang/de.js":
                                return import ("./de114.js");
                            case "./lang/en-gb.js":
                                return import ("./en-gb104.js");
                            case "./lang/en.js":
                                return import ("./en107.js");
                            case "./lang/es-es.js":
                                return import ("./es-es113.js");
                            case "./lang/es.js":
                                return import ("./es114.js");
                            case "./lang/fr-fr.js":
                                return import ("./fr-fr113.js");
                            case "./lang/fr-on.js":
                                return import ("./fr-on106.js");
                            case "./lang/fr.js":
                                return import ("./fr114.js");
                            case "./lang/haw.js":
                                return import ("./haw104.js");
                            case "./lang/hi.js":
                                return import ("./hi112.js");
                            case "./lang/ja.js":
                                return import ("./ja114.js");
                            case "./lang/ko.js":
                                return import ("./ko114.js");
                            case "./lang/mi.js":
                                return import ("./mi102.js");
                            case "./lang/nl.js":
                                return import ("./nl114.js");
                            case "./lang/pt.js":
                                return import ("./pt114.js");
                            case "./lang/sv.js":
                                return import ("./sv114.js");
                            case "./lang/th.js":
                                return import ("./th98.js");
                            case "./lang/tr.js":
                                return import ("./tr114.js");
                            case "./lang/vi.js":
                                return import ("./vi98.js");
                            case "./lang/zh-cn.js":
                                return import ("./zh-cn103.js");
                            case "./lang/zh-tw.js":
                                return import ("./zh-tw114.js");
                            default:
                                return new Promise(function(t, s) {
                                    ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(s.bind(null, new Error("Unknown variable dynamic import: " + e)))
                                })
                        }
                    }(`./lang/${e}.js`)).default,
                osloCollection: "d2l-my-courses\\d2l-my-courses"
            }
        }
    };
export {
    j as I, k as M, _ as a, K as b
};