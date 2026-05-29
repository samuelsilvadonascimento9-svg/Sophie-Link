const e = "[0-9a-f]",
    r = new RegExp(`^#(${e}{3}|${e}{6})$`, "i"),
    o = new RegExp(`^#(${e}{4}|${e}{8})$`, "i");

function t(e, t) {
    if (t) {
        if (void 0 !== e && !r.test(e) && !o.test(e)) throw new TypeError(`Invalid HEX color value "${e}". Expecting a 3, 4, 6, or 8 character HEX color.`)
    } else if (void 0 !== e && !r.test(e)) throw new TypeError(`Invalid HEX color value "${e}". Expecting a 3 or 6 character HEX color.`);
    return "string" == typeof e ? e.toUpperCase() : void 0
}
export {
    t as g
};