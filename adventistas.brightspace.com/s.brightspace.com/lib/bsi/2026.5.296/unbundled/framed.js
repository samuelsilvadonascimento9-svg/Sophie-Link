let e;

function r() {
    if (void 0 !== e) return e;
    if (window.D2L && window.D2L.IsNotAnIframedApp) return e = Promise.resolve(!1), e;
    try {
        if (window === window.parent) return e = Promise.resolve(!1), e
    } catch {
        return e = Promise.resolve(!1), e
    }
    return e = Promise.race([new Promise(e => {
        const r = i => {
            i && i.data && void 0 !== i.data.isFramed && (window.removeEventListener("message", r, !1), e(i.data.isFramed))
        };
        window.addEventListener("message", r, !1), window.parent.postMessage("isFramedRequest", "*")
    }), new Promise(e => {
        setTimeout(() => {
            e(!1)
        }, 150)
    })]), e
}
export {
    r as i
};