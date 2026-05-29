const i = ["lowMin", "lowMid", "lowMax", "highMin", "highMid", "highMax"],
    n = {
        tile: {
            lowMin: 145,
            lowMid: 220,
            lowMax: 540,
            highMin: 290,
            highMid: 440,
            highMax: 1080
        },
        narrow: {
            lowMin: 320,
            lowMid: 375,
            lowMax: 767,
            highMin: 640,
            highMid: 750,
            highMax: 1534
        }
    };

function t(i, n) {
    const t = h(i, n),
        r = t["image/jpeg"];
    if (r) return r;
    for (const i in t) return t[i]
}

function r(i, n) {
    if (!i || i.href) return;
    const r = t(i, n);
    return r ? r.highMax || r.lowMax || r.highMid || r.lowMid || r.highMin || r.lowMin : void 0
}

function h(i, n) {
    const t = i.getLinksByClass(n || "tile"),
        r = {};
    return t.forEach(i => {
        const n = r[i.type] = r[i.type] || {},
            t = (i.hasClass("min") ? "Min" : i.hasClass("mid") && "Mid") || i.hasClass("max") && "Max";
        n[(i.hasClass("high-density") ? "high" : "low") + t] = i.href
    }), r
}

function e(i, n, r) {
    if (!i || i.href) return;
    return s(t(i, n), n, r)
}

function o(i, n, t) {
    if (!i || i.href) return;
    const r = h(i, n);
    return Object.keys(r).map(i => ({
        type: i,
        srcset: s(r[i], n, t)
    }))
}

function s(t, r, h) {
    const e = n[r] || n.narrow;
    return i.reduce((i, n) => {
        if (!t[n]) return i;
        let r = t[n];
        if (h) {
            const i = r.split("?")[1] ? "&" : "?";
            r += `${i}timestamp=${Date.now()}`
        }
        return i += `${r} ${e[n]}w, `
    }, "").replace(/,\s*$/, "")
}
export {
    e as a, r as b, t as c, o as g
};