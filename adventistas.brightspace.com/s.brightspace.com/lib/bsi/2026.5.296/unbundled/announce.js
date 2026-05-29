let e = null,
    t = null;

function l(l) {
    if (!l) return;
    null !== e && (clearTimeout(e), e = null), t || (t = document.createElement("div"), t.setAttribute("aria-live", "polite"), t.style.display = "inline-block", t.style.position = "fixed", t.style.height = "0", t.style.clip = "rect(0px,0px,0px,0px)", document.body.appendChild(t));
    const n = [...t.childNodes].find(e => e.textContent === l);
    n && (n.parentNode.removeChild(n), l = l.concat(" ")), setTimeout(() => {
        t.appendChild(document.createTextNode(l))
    }, 200), e = setTimeout(() => {
        t.parentNode.removeChild(t), t = null, e = null
    }, 1e4)
}
export {
    l as a
};