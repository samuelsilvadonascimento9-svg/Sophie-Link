const e = new Map;

function n(n, i, t) {
    const r = function(n) {
        let i = e.get(n);
        return i || (i = {
            plugins: [],
            requested: !1,
            requiresSorting: !1
        }, e.set(n, i), i)
    }(n);
    if (r.requested) throw new Error(`Plugin Set "${n}" has already been requested. Additional plugin registrations would result in stale consumer plugins.`);
    if (void 0 !== t ? .key && r.plugins.find(e => e.options.key === t ? .key)) throw new Error(`Plugin Set "${n}" already has a plugin with the key "${t.key}".`);
    r.plugins.push({
        plugin: i,
        options: Object.assign({
            key: void 0,
            sort: 0
        }, t)
    }), r.requiresSorting = r.requiresSorting || void 0 !== t ? .sort
}

function i(n, i) {
    const t = e.get(n),
        r = t ? .plugins.find(e => e.options.key === i) ? .plugin;
    return r || null
}
export {
    n as r, i as t
};