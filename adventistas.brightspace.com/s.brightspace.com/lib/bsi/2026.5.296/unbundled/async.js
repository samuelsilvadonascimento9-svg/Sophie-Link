import "./boot.js";
let t = 0,
    e = 0,
    n = [],
    o = 0,
    r = !1,
    c = document.createTextNode("");
new window.MutationObserver(function() {
    r = !1;
    const t = n.length;
    for (let e = 0; e < t; e++) {
        let t = n[e];
        if (t) try {
            t()
        } catch (t) {
            setTimeout(() => {
                throw t
            })
        }
    }
    n.splice(0, t), e += t
}).observe(c, {
    characterData: !0
});
const i = {
        after: t => ({
            run: e => window.setTimeout(e, t),
            cancel(t) {
                window.clearTimeout(t)
            }
        }),
        run: (t, e) => window.setTimeout(t, e),
        cancel(t) {
            window.clearTimeout(t)
        }
    },
    a = {
        run: e => (r || (r = !0, c.textContent = o++), n.push(e), t++),
        cancel(t) {
            const o = t - e;
            if (o >= 0) {
                if (!n[o]) throw new Error("invalid async handle: " + t);
                n[o] = null
            }
        }
    };
export {
    a as m, i as t
};