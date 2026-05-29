let n = 0,
    e = null;
const t = [];

function o() {
    e && 0 === t.length && (document.removeEventListener("keydown", e), e = null)
}

function c(n) {
    for (let e = 0; e < t.length; e++)
        if (t[e].id === n) {
            t.splice(e, 1);
            break
        }
    o()
}

function l(c) {
    null === e && (e = n => {
        if (27 === n.keyCode) {
            if (t.length > 0) {
                const n = t.splice(t.length - 1, 1)[0];
                "function" == typeof n.cb && n.cb()
            }
            o()
        }
    }, document.addEventListener("keydown", e));
    const l = ++n;
    return t.push({
        id: l,
        cb: c
    }), l
}
export {
    c,
    l as s
};