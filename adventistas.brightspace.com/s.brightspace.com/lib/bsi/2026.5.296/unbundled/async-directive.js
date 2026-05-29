import {
    j as t
} from "./lit-element.js";
import {
    i as e,
    t as i
} from "./directive.js";
const {
    I: s
} = t, o = t => t, n = t => null === t || "object" != typeof t && "function" != typeof t, A = t => void 0 === t.strings, $ = () => document.createComment(""), _ = (t, e, i) => {
    const n = t._$AA.parentNode,
        A = void 0 === e ? t._$AB : e._$AA;
    if (void 0 === i) {
        const e = n.insertBefore($(), A),
            o = n.insertBefore($(), A);
        i = new s(e, o, t, t.options)
    } else {
        const e = i._$AB.nextSibling,
            s = i._$AM,
            $ = s !== t;
        if ($) {
            let e;
            i._$AQ ? .(t), i._$AM = t, void 0 !== i._$AP && (e = t._$AU) !== s._$AU && i._$AP(e)
        }
        if (e !== A || $) {
            let t = i._$AA;
            for (; t !== e;) {
                const e = o(t).nextSibling;
                o(n).insertBefore(t, A), t = e
            }
        }
    }
    return i
}, r = (t, e, i = t) => (t._$AI(e, i), t), c = {}, h = (t, e = c) => t._$AH = e, d = t => t._$AH, f = t => {
    t._$AR(), t._$AA.remove()
}, l = (t, e) => {
    const i = t._$AN;
    if (void 0 === i) return !1;
    for (const t of i) t._$AO ? .(e, !1), l(t, e);
    return !0
}, a = t => {
    let e, i;
    do {
        if (void 0 === (e = t._$AM)) break;
        i = e._$AN, i.delete(t), t = e
    } while (0 === i ? .size)
}, u = t => {
    for (let e; e = t._$AM; t = e) {
        let i = e._$AN;
        if (void 0 === i) e._$AN = i = new Set;
        else if (i.has(t)) break;
        i.add(t), C(e)
    }
};

function v(t) {
    void 0 !== this._$AN ? (a(this), this._$AM = t, u(this)) : this._$AM = t
}

function p(t, e = !1, i = 0) {
    const s = this._$AH,
        o = this._$AN;
    if (void 0 !== o && 0 !== o.size)
        if (e)
            if (Array.isArray(s))
                for (let t = i; t < s.length; t++) l(s[t], !1), a(s[t]);
            else null != s && (l(s, !1), a(s));
    else l(this, t)
}
const C = t => {
    t.type == i.CHILD && (t._$AP ? ? (t._$AP = p), t._$AQ ? ? (t._$AQ = v))
};
class m extends e {
    constructor() {
        super(...arguments), this._$AN = void 0
    }
    _$AT(t, e, i) {
        super._$AT(t, e, i), u(this), this.isConnected = t._$AU
    }
    _$AO(t, e = !0) {
        t !== this.isConnected && (this.isConnected = t, t ? this.reconnected ? .() : this.disconnected ? .()), e && (l(this, t), a(this))
    }
    setValue(t) {
        if (A(this._$Ct)) this._$Ct._$AI(t, this);
        else {
            const e = [...this._$Ct._$AH];
            e[this._$Ci] = t, this._$Ct._$AI(e, this, 0)
        }
    }
    disconnected() {}
    reconnected() {}
}
export {
    d as M, m as f, f as h, n, h as p, A as r, r as u, _ as v
};