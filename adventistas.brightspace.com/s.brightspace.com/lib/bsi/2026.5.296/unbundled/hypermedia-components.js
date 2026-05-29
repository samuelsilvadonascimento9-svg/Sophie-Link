import {
    a as e,
    s as t,
    f as n,
    d as s
} from "./HypermediaStateMixin.js";
import {
    b as o
} from "./lit-element.js";
import {
    m as r
} from "./icon.js";
const i = null;
class a {
    constructor(e) {
        this._elementPseudoTag = e, this._componentStore = new Map
    }
    componentTag(e) {
        if (!e) return;
        e = "object" == typeof e ? e : [e];
        const t = [];
        for (const n in e) {
            const s = e[n];
            t.push(this._getComponentTag(s, e.filter(e => e !== s)))
        }
        return this._reduceComponentTag(t).componentTag
    }
    register(e, t) {
        t || this._componentStore.set(i, e), (t = "object" == typeof t ? t : [t]).forEach(t => {
            t = "object" == typeof t ? t : [t];
            let n = this._componentStore;
            do {
                const e = t.shift();
                n = this._getNextMap(n, e)
            } while (t.length > 0);
            if (n.has(i)) throw new Error(`Duplicate Hypermedia Class Type for element ${this._elementPseudoTag} with tag ${e} and ${n.get(i)}`);
            n.set(i, e)
        })
    }
    skeletonTag() {
        return this._componentStore.get(i)
    }
    _getComponentTag(e, t, n, s = 0) {
        if (!(n = n || this._componentStore).has(e)) return {
            componentTag: n.has(i) ? n.get(i) : null,
            depth: s
        };
        if (!(n = n.get(e))) return null;
        const o = [{
            componentTag: n.get(i),
            depth: s
        }];
        for (const e in t) {
            const r = t[e];
            o.push(this._getComponentTag(r, t.filter(e => e !== r), n, s + 1))
        }
        return this._reduceComponentTag(o)
    }
    _getNextMap(e, t) {
        if (e.has(t)) return e.get(t);
        const n = new Map;
        return e.set(t, n), n
    }
    _reduceComponentTag(e) {
        let t = {
            componentTag: null,
            depth: 0
        };
        return e.forEach(e => {
            !e || !e.componentTag || e.depth < t.depth || (t = e)
        }), t
    }
}

function h(e) {
    if (window.D2L.ComponentStore.has(e)) return window.D2L.ComponentStore.get(e);
    const t = new a(e);
    return window.D2L.ComponentStore.set(e, t), t
}
window.D2L = window.D2L || {}, window.D2L.ComponentStore = window.D2L.ComponentStore || new Map;
class l {
    constructor(e, t) {
        this.strings = e, this.values = t, this.processing()
    }
    render(e, t, n, s, r, i) {
        const a = t.componentTag(n.classes);
        if (!a) return null;
        const h = [],
            l = [];
        for (; r.length > 0;) {
            let e = r.shift();
            if (!e) break;
            e = e.replace(`<${s} `, `<${a} `), e = e.replace(`</${s} `, `</${a} `);
            const t = e.indexOf(">");
            if (-1 === t) {
                h.push(e), l.push(i.shift());
                continue
            }
            const n = e.substring(t);
            e = e.substring(0, t + 1), h.push(e), r.unshift(n);
            break
        }
        return r.pop(), 0 !== r.length ? (h.push(`</${a}>`), l.push(o(r, i))) : h[h.length - 1] += `</${a}>`, o(this._getTemplateStringArray(h), ...l)
    }
    getHrefToken(e, t) {
        let n, s;
        return (e = [...e]).forEach((e, o) => {
            const r = [];
            let i;
            const a = /(token=)|(href=)/g;
            for (; null !== (i = a.exec(e));) r.push(i);
            const h = [...r].pop();
            h && h[1] ? s = t[o] : h && h[2] && (n = t[o])
        }), [n, s]
    }
    getHTML() {
        return o(this._getTemplateStringArray(this.strings), ...this.values)
    }
    processing() {
        const e = [{
                strings: [],
                values: []
            }],
            t = [],
            n = [...this.strings],
            s = [...this.values];
        let o = e[0];
        for (let r = 0; r < n.length; r++) {
            let i = n[r];
            const a = s[r];
            let h = 0;
            const l = [];
            let p;
            const g = /\<([A-Za-z][A-Za-z0-9\-]*)|\<\/([A-Za-z][A-Za-z0-9\-]*)\>/g;
            for (; null !== (p = g.exec(i));) l.push(p);
            [...l].forEach(n => {
                var s;
                n[1] && (s = n[1], window.D2L.ComponentStore.has(s)) && (t.push(n[1]), 1 === t.length && (o.strings.push(i.substring(0, n.index - h)), o = {
                    strings: [],
                    values: []
                }, e.push(o), i = i.substring(n.index - h), h = n.index)), n[2] && n[2] === t[t.length - 1] && (t.pop(), 0 === t.length && (o.strings.push(i.substring(0, n.index + n[0].length - h)), e[0].values.push(this.renderHypermediaComponent(n[2], o.strings, o.values)), o = e[0], i = i.substring(n.index + n[0].length - h), h = n.index + n[0].length))
            }), o.strings.push(i), r < s.length && o.values.push(a)
        }
        this.strings = e[0].strings, this.values = e[0].values
    }
    renderHypermediaComponent(s, i, a) {
        const [l, p] = this.getHrefToken(i, a), g = {
            classes: {
                type: Array,
                observable: e.classes
            }
        }, u = {
            classes: []
        }, c = h(s);
        if (!l || !p) return this._skeletonRender(c);
        const m = t(l, p).then(async e => (e.addObservables(u, g), await n(e), e)).then(e => this.render(e, c, u, s, i, a));
        return this._fetchedResults = m, o `${r(m,this._skeletonRender(c))}`
    }
    _getTemplateStringArray(e) {
        const t = s(e);
        return Object.defineProperty(t, "raw", {
            value: t,
            writable: !0
        }), t
    }
    _skeletonRender(e) {
        const t = e.skeletonTag();
        return t ? o(this._getTemplateStringArray([`<${t} skeleton></${t}>`])) : null
    }
}

function p(e, t, n, s, o) {
    ! function(e, t, n, s, o) {
        h(n = n || e).register(e, s), customElements.define(e, t, o)
    }(e, t, n, s, o)
}

function g(e, ...t) {
    return new l(e, t).getHTML()
}
export {
    p as c, g as h
};