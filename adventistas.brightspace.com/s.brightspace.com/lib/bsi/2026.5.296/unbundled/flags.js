const e = new Map,
    t = new Map;

function n(n, l) {
    let s;
    return s = t.has(n) ? t.get(n) : globalThis.D2L ? .LP ? .Web ? .UI ? .Flags.Flag(n, l) ? ? l,
        function(n, l, s) {
            e.has(n) || e.set(n, {
                value: l,
                defaultValue: s
            });
            if (void 0 === globalThis.document ? .dispatchEvent) return;
            if (a) return;
            a = !0, setTimeout(() => {
                globalThis.document.dispatchEvent(new CustomEvent("d2l-flags-known", {
                    detail: {
                        flagOverrides: t,
                        knownFlags: e
                    }
                })), a = !1
            })
        }(n, s, l), s
}
let a = !1;
export {
    n as g
};