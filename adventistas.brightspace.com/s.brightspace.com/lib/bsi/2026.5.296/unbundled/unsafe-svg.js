import {
    e as t,
    i as e,
    t as r
} from "./directive.js";
import {
    A as i,
    E as s
} from "./lit-element.js";
class n extends e {
    constructor(t) {
        if (super(t), this.it = i, t.type !== r.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings")
    }
    render(t) {
        if (t === i || null == t) return this._t = void 0, this.it = t;
        if (t === s) return t;
        if ("string" != typeof t) throw Error(this.constructor.directiveName + "() called with a non-string value");
        if (t === this.it) return this._t;
        this.it = t;
        const e = [t];
        return e.raw = e, this._t = {
            _$litType$: this.constructor.resultType,
            strings: e,
            values: []
        }
    }
}
n.directiveName = "unsafeHTML", n.resultType = 1;
const o = t(n);
class c extends n {}
c.directiveName = "unsafeSVG", c.resultType = 2;
const a = t(c);
export {
    a,
    o
};