import {
    b as e
} from "./lit-element.js";
const r = Object.freeze({
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    }),
    t = t => class extends t {
        static get properties() {
            return {
                arrowKeysDirection: {
                    type: String,
                    attribute: "arrow-keys-direction"
                },
                arrowKeysNoWrap: {
                    type: Boolean,
                    attribute: "arrow-keys-no-wrap"
                }
            }
        }
        constructor() {
            super(), this.arrowKeysDirection = "leftright", this.arrowKeysNoWrap = !1
        }
        arrowKeysContainer(r) {
            return e `<div class="arrow-keys-container" @keydown="${this._handleArrowKeys}">
			${r}
		</div>`
        }
        async arrowKeysFocusablesProvider() {
            return this.shadowRoot ? [...this.shadowRoot.querySelectorAll(".d2l-arrowkeys-focusable")] : []
        }
        async _focus(e) {
            e && (this.arrowKeysOnBeforeFocus && await this.arrowKeysOnBeforeFocus(e), e.focus())
        }
        async _focusFirst() {
            const e = await this.arrowKeysFocusablesProvider();
            if (e && e.length > 0) return this._focus(e[0])
        }
        async _focusLast() {
            const e = await this.arrowKeysFocusablesProvider();
            if (e && e.length > 0) return this._focus(e[e.length - 1])
        }
        async _focusNext(e) {
            const r = await this.arrowKeysFocusablesProvider(),
                t = this._tryGetNextFocusable(r, e);
            return this._focus(t)
        }
        async _focusPrevious(e) {
            const r = await this.arrowKeysFocusablesProvider(),
                t = this._tryGetPreviousFocusable(r, e);
            return this._focus(t)
        }
        _handleArrowKeys(e) {
            const t = e.target;
            if (this.arrowKeysDirection.indexOf("left") >= 0 && e.keyCode === r.LEFT) "rtl" === getComputedStyle(this).direction ? this._focusNext(t) : this._focusPrevious(t);
            else if (this.arrowKeysDirection.indexOf("right") >= 0 && e.keyCode === r.RIGHT) "rtl" === getComputedStyle(this).direction ? this._focusPrevious(t) : this._focusNext(t);
            else if (this.arrowKeysDirection.indexOf("up") >= 0 && e.keyCode === r.UP) this._focusPrevious(t);
            else if (this.arrowKeysDirection.indexOf("down") >= 0 && e.keyCode === r.DOWN) this._focusNext(t);
            else if (e.keyCode === r.HOME) this._focusFirst();
            else {
                if (e.keyCode !== r.END) return;
                this._focusLast()
            }
            e.stopPropagation(), e.preventDefault()
        }
        _tryGetNextFocusable(e, r) {
            if (!e || 0 === e.length) return;
            const t = e.indexOf(r);
            if (t === e.length - 1) {
                if (this.arrowKeysNoWrap) return;
                return e[0]
            }
            return e[t + 1]
        }
        _tryGetPreviousFocusable(e, r) {
            if (!e || 0 === e.length) return;
            const t = e.indexOf(r);
            if (0 === t) {
                if (this.arrowKeysNoWrap) return;
                return e[e.length - 1]
            }
            return e[t - 1]
        }
    };
export {
    t as A
};