import "./boot.js";
let t = !1,
    n = [],
    o = [];

function i() {
    t = !0, requestAnimationFrame(function() {
        t = !1,
            function(t) {
                for (; t.length;) e(t.shift())
            }(n), setTimeout(function() {
                ! function(t) {
                    for (let n = 0, o = t.length; n < o; n++) e(t.shift())
                }(o)
            })
    })
}

function e(t) {
    const n = t[0],
        o = t[1],
        i = t[2];
    try {
        o.apply(n, i)
    } catch (t) {
        setTimeout(() => {
            throw t
        })
    }
}

function f(n, e, f) {
    t || i(), o.push([n, e, f])
}
export {
    f as a
};