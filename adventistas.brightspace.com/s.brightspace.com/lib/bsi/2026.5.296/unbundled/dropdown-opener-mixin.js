import {
    g as e
} from "./uniqueId.js";
import {
    e as t
} from "./dom.js";
const n = n => class extends n {
    static get properties() {
        return {
            disabled: {
                type: Boolean,
                reflect: !0
            },
            dropdownOpened: {
                state: !0
            },
            dropdownOpener: {
                type: Boolean
            },
            noAutoOpen: {
                type: Boolean,
                reflect: !0,
                attribute: "no-auto-open"
            },
            openOnHover: {
                type: Boolean,
                attribute: "open-on-hover"
            },
            _isHovering: {
                type: Boolean
            },
            _isOpenedViaClick: {
                type: Boolean
            },
            _isFading: {
                type: Boolean
            }
        }
    }
    constructor() {
        super(), this.dropdownOpener = !0, this.noAutoOpen = !1, this.openOnHover = !1, this.disabled = !1, this._dismissTimerId = e(), this.dropdownOpened = !1, this._isOpenedViaClick = !1, this._isHovering = !1, this._isFading = !1, this._onOutsideClick = this._onOutsideClick.bind(this), this._contentRendered = null, this._openerRendered = null
    }
    connectedCallback() {
        super.connectedCallback(), this.addEventListener("keypress", this.__onKeypress), this.addEventListener("mouseup", this.__onMouseUp), this.addEventListener("mouseenter", this.__onMouseEnter), this.addEventListener("mouseleave", this.__onMouseLeave), this.openOnHover && document.body.addEventListener("mouseup", this._onOutsideClick)
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.removeEventListener("keypress", this.__onKeypress), this.removeEventListener("mouseup", this.__onMouseUp), this.removeEventListener("mouseenter", this.__onMouseEnter), this.removeEventListener("mouseleave", this.__onMouseLeave), this.openOnHover && document.body.removeEventListener("mouseup", this._onOutsideClick)
    }
    firstUpdated(e) {
        super.firstUpdated(e), this.addEventListener("d2l-dropdown-open", this.__onOpened), this.addEventListener("d2l-dropdown-close", this.__onClosed);
        const t = this.__getContentElement(),
            n = "D2L-DROPDOWN-MENU" === t ? .tagName ? "menu" : "true";
        this._setOpenerElementAttribute(t ? .opened || !1, !1, n)
    }
    updated(e) {
        if (super.updated(e), !this.openOnHover || !e.has("_isFading")) return;
        const t = this.__getContentElement();
        t && (this._isFading ? t.classList.add("d2l-dropdown-content-fading") : t.classList.remove("d2l-dropdown-content-fading"))
    }
    async closeDropdown(e) {
        if (this.dropdownOpened = !1, this._isHovering = !1, this._isOpenedViaClick = !1, e) return void this._closeTimerStart();
        const t = this.__getContentElement();
        await t.close()
    }
    focus() {
        const e = this.getOpenerElement();
        e && e.focus()
    }
    getOpener() {
        return this
    }
    getOpenerElement() {
        return this
    }
    async openDropdown(e) {
        this.dropdownOpened = !0;
        const t = this.__getContentElement();
        t && (await t.open(e), await t.updateComplete)
    }
    toggleOpen(e) {
        if (this.disabled) return;
        const t = this.__getContentElement();
        t && (t.toggleOpen(e), this.dropdownOpened = !this.dropdownOpened)
    }
    __dispatchOpenerClickEvent() {
        this.dispatchEvent(new CustomEvent("d2l-dropdown-opener-click", {
            bubbles: !1,
            composed: !1
        }))
    }
    __getContentElement() {
        if (this.shadowRoot) return this.shadowRoot.querySelector("slot:not([name])").assignedNodes().filter(e => e.hasAttribute && (e._dropdownContent || e.hasAttribute("dropdown-content")))[0]
    }
    __onClosed() {
        this._setOpenerElementAttribute(!1, !0) && (this.dropdownOpened = !1, this._isOpenedViaClick = !1)
    }
    __onDropdownMouseUp() {
        this.dropdownOpened = !0, this._isFading = !1, this._isHovering = !1, this._isOpenedViaClick = !0, this._closeTimerStop()
    }
    __onKeypress(e) {
        if (e.srcElement === this || t(this.getOpenerElement(), e.srcElement)) {
            if (13 !== e.keyCode && 32 !== e.keyCode) return;
            if (this.__dispatchOpenerClickEvent(), this.noAutoOpen) return;
            this.openOnHover ? (this._closeTimerStop(), e.preventDefault(), this._isOpenedViaClick = !0, this.openDropdown(!0)) : this.toggleOpen(!0)
        }
    }
    async __onMouseEnter() {
        if (!this.openOnHover) return;
        this.__getContentElement()._mobile || (clearTimeout(this._dismissTimerId), this.dropdownOpened || await this.openDropdown(!1), this._closeTimerStop(), this._isOpenedViaClick || (this._isHovering = !0))
    }
    async __onMouseLeave() {
        if (!this.openOnHover) return;
        this.__getContentElement()._mobile || (this._isHovering = !1, this._isOpenedViaClick || (clearTimeout(this._dismissTimerId), await this.closeDropdown(!0)))
    }
    __onMouseUp(e) {
        e.srcElement === this || t(this.getOpenerElement(), e.srcElement) ? this.__onOpenerMouseUp(e) : this.openOnHover && t(this.__getContentElement(), e.srcElement) && this.__onDropdownMouseUp()
    }
    __onOpened() {
        this._setOpenerElementAttribute(!0, !0) && (this._isFading = !1)
    }
    __onOpenerMouseUp(e) {
        this.__dispatchOpenerClickEvent(), this.noAutoOpen || (this.openOnHover ? (e && e.stopPropagation(), this._closeTimerStop(), this.dropdownOpened && !this._isHovering ? this.closeDropdown() : (this._isOpenedViaClick = !0, this._isHovering = !1, this.openDropdown(!1))) : this.toggleOpen(!0))
    }
    _closeTimerStart() {
        this.dropdownOpened || (clearTimeout(this._setTimeoutId), this._isFading = !0, this._setTimeoutId = setTimeout(() => {
            this.closeDropdown(!1), this._isFading = !1
        }, 700))
    }
    _closeTimerStop() {
        clearTimeout(this._setTimeoutId), this._isFading = !1
    }
    _onOutsideClick(e) {
        if (!this.dropdownOpened) return;
        const n = this.__getContentElement(),
            s = t(n, e.composedPath()[0]),
            i = t(this.getOpenerElement(), e.composedPath()[0]),
            o = s && n._mobile && e.composedPath().find(e => "D2L-BACKDROP" === e.nodeName);
        i || s && !o || this.closeDropdown()
    }
    _setOpenerElementAttribute(e, t = !1, n) {
        const s = this.getOpenerElement();
        if (!s) return !1;
        const i = s.isButtonMixin ? "expanded" : "aria-expanded";
        return s.setAttribute(i, e.toString()), n && s.setAttribute("aria-haspopup", n), t && (e ? s.setAttribute("active", "true") : s.removeAttribute("active")), !0
    }
};
export {
    n as D
};