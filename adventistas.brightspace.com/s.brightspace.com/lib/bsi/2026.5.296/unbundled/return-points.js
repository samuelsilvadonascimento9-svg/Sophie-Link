const t = "ReturnPoints";

function n() {
    let n;
    try {
        n = window.sessionStorage.getItem(t)
    } catch {
        return []
    }
    return null == n || 0 === n.length ? [] : JSON.parse(n)
}

function e(t, n) {
    if (null == t || 0 === t.length) throw new TypeError(`Invalid ${n}`)
}

function r(n) {
    try {
        window.sessionStorage.setItem(t, JSON.stringify(n))
    } catch {}
}
const o = {
        getReturnPoint: function(t, o) {
            if (e(t, "key"), !(o instanceof URL)) throw new TypeError("Invalid defaultLocation");
            let i = n();
            for (let n = i.length - 1; n > -1; n--)
                if (i[n].key === t) {
                    const t = new URL(i[n].url);
                    return i = i.slice(0, n), r(i), t
                }
            return o
        },
        resetReturnPoints: function() {
            try {
                window.sessionStorage.removeItem(t)
            } catch {}
        },
        setReturnPoint: function(t, o = new URL(document.location.href)) {
            if (e(t, "key"), !(o instanceof URL)) throw new TypeError("Invalid location");
            const i = n();
            i.push({
                key: t,
                url: o.href
            }), r(i)
        },
        tryPeekReturnPoint: function(t) {
            e(t, "key");
            const r = n();
            for (let n = r.length - 1; n > -1; n--)
                if (r[n].key === t) return new URL(r[n].url);
            return null
        }
    },
    i = (t, n) => o.getReturnPoint(t, n),
    s = (t, n) => o.setReturnPoint(t, n),
    u = t => o.tryPeekReturnPoint(t);
export {
    i as g, s, u as t
};