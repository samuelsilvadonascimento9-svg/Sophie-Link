import "./boot.js";
import "./async.js";
class t {
    constructor() {
        this._asyncModule = null, this._callback = null, this._timer = null
    }
    setConfig(t, c) {
        this._asyncModule = t, this._callback = c, this._timer = this._asyncModule.run(() => {
            this._timer = null, s.delete(this), this._callback()
        })
    }
    cancel() {
        this.isActive() && (this._cancelAsync(), s.delete(this))
    }
    _cancelAsync() {
        this.isActive() && (this._asyncModule.cancel(this._timer), this._timer = null)
    }
    flush() {
        this.isActive() && (this.cancel(), this._callback())
    }
    isActive() {
        return null != this._timer
    }
    static debounce(s, c, i) {
        return s instanceof t ? s._cancelAsync() : s = new t, s.setConfig(c, i), s
    }
}
let s = new Set;
const c = function(t) {
        s.add(t)
    },
    i = function() {
        const t = Boolean(s.size);
        return s.forEach(t => {
            try {
                t.flush()
            } catch (t) {
                setTimeout(() => {
                    throw t
                })
            }
        }), t
    };
export {
    t as D, c as e, i as f
};