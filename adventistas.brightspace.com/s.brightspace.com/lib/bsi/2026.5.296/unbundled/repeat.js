import {
    E as e
} from "./lit-element.js";
import {
    e as t,
    i as s,
    t as r
} from "./directive.js";
import {
    M as l,
    u as n,
    v as o,
    h as i,
    p as u
} from "./async-directive.js";
const f = (e, t, s) => {
        const r = new Map;
        for (let l = t; l <= s; l++) r.set(e[l], l);
        return r
    },
    c = t(class extends s {
        constructor(e) {
            if (super(e), e.type !== r.CHILD) throw Error("repeat() can only be used in text expressions")
        }
        dt(e, t, s) {
            let r;
            void 0 === s ? s = t : void 0 !== t && (r = t);
            const l = [],
                n = [];
            let o = 0;
            for (const t of e) l[o] = r ? r(t, o) : o, n[o] = s(t, o), o++;
            return {
                values: n,
                keys: l
            }
        }
        render(e, t, s) {
            return this.dt(e, t, s).values
        }
        update(t, [s, r, c]) {
            const a = l(t),
                {
                    values: d,
                    keys: h
                } = this.dt(s, r, c);
            if (!Array.isArray(a)) return this.ut = h, d;
            const p = this.ut ? ? (this.ut = []),
                v = [];
            let m, y, x = 0,
                g = a.length - 1,
                j = 0,
                k = d.length - 1;
            for (; x <= g && j <= k;)
                if (null === a[x]) x++;
                else if (null === a[g]) g--;
            else if (p[x] === h[j]) v[j] = n(a[x], d[j]), x++, j++;
            else if (p[g] === h[k]) v[k] = n(a[g], d[k]), g--, k--;
            else if (p[x] === h[k]) v[k] = n(a[x], d[k]), o(t, v[k + 1], a[x]), x++, k--;
            else if (p[g] === h[j]) v[j] = n(a[g], d[j]), o(t, a[x], a[g]), g--, j++;
            else if (void 0 === m && (m = f(h, j, k), y = f(p, x, g)), m.has(p[x]))
                if (m.has(p[g])) {
                    const e = y.get(h[j]),
                        s = void 0 !== e ? a[e] : null;
                    if (null === s) {
                        const e = o(t, a[x]);
                        n(e, d[j]), v[j] = e
                    } else v[j] = n(s, d[j]), o(t, a[x], s), a[e] = null;
                    j++
                } else i(a[g]), g--;
            else i(a[x]), x++;
            for (; j <= k;) {
                const e = o(t, v[k + 1]);
                n(e, d[j]), v[j++] = e
            }
            for (; x <= g;) {
                const e = a[x++];
                null !== e && i(e)
            }
            return this.ut = h, u(t, v), e
        }
    });
export {
    c
};