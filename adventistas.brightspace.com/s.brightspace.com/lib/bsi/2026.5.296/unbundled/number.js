import {
    g as e,
    a as t,
    m as n,
    v as r
} from "./common.js";

function i(e, t, n, r, i) {
    if (null == t && (t = n), "string" == typeof t && (t = parseInt(t)), isNaN(t) || "number" != typeof t || t < r || t > i) throw new RangeError(`${e} value is out of range.`);
    return t
}

function a() {
    const r = e(),
        i = r.split("-")[0];
    let a = "-{number}";
    "ar" === i && (a = "{number}-");
    let s = "{number} %",
        m = "-{number} %";
    switch (i) {
        case "ca":
        case "es":
        case "hi":
        case "ja":
        case "mi":
        case "pt":
        case "zh":
            s = "{number}%", m = "-{number}%";
            break;
        case "tr":
            s = "%{number}", m = "-%{number}"
    }
    let c = ".",
        o = ",";
    switch (i) {
        case "ca":
        case "da":
        case "de":
        case "es":
        case "nl":
        case "pt":
        case "tr":
            c = ",", o = ".";
            break;
        case "fr":
        case "sv":
            c = ",", o = " "
    }
    if ("es-mx" === r) c = ".", o = ",";
    const u = {
            groupSize: 3,
            patterns: {
                decimal: {
                    positivePattern: "{number}",
                    negativePattern: a
                },
                percent: {
                    positivePattern: s,
                    negativePattern: m
                }
            },
            symbols: {
                decimal: c,
                group: o,
                negative: "-",
                percent: "%"
            }
        },
        l = t();
    return l.overrides.number && n(u, l.overrides.number), u
}

function s(e, t) {
    const n = a();
    e = r(e), t = function(e) {
        if ((e = e || {}).useGrouping = !1 !== e.useGrouping, "decimal" !== e.style && "percent" !== e.style && (e.style = "decimal"), e.minimumFractionDigits = i("minimumFractionDigits", e.minimumFractionDigits, 0, 0, 20), e.maximumFractionDigits = i("maximumFractionDigits", e.maximumFractionDigits, Math.max(e.minimumFractionDigits, 3), 0, 20), e.minimumFractionDigits > e.maximumFractionDigits) throw new RangeError("maximumFractionDigits value is out of range.");
        return e
    }(t);
    const s = e < 0;
    e = Math.abs(e);
    const m = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: t.maximumFractionDigits,
        minimumFractionDigits: t.minimumFractionDigits,
        useGrouping: !1
    }).format(e);
    let c = function(e, t, n) {
        if (e = Math.floor(e), !n) return e.toString();
        const r = `${e}`;
        let i = "";
        const a = Array.isArray(t.groupSize) ? t.groupSize : [t.groupSize];
        let s = -1;
        const m = a.length - 1;
        let c = 0,
            o = r.length;
        for (; o > 0;) {
            s < m && (c = a[++s]);
            let e = null;
            if (0 === c) e = r.substring(0, o);
            else {
                const t = o - c;
                e = r.substring(t, o)
            }
            o !== r.length && (i = t.symbols.group + i), i = e + i, o -= e.length
        }
        return i
    }(parseInt(m), n, t.useGrouping);
    const o = m.indexOf(".");
    o > -1 && (c += n.symbols.decimal + m.substr(o + 1));
    return c = (s ? n.patterns.decimal.negativePattern : n.patterns.decimal.positivePattern).replace("{number}", c), s && (c = c.replace("-", n.symbols.negative)), c
}

function m(e, t) {
    return t && "percent" === t.style ? c(e, t) : s(e, t)
}

function c(e, t) {
    const n = a(),
        i = (e = r(e)) < 0,
        m = s(e = 100 * Math.abs(e), t);
    let c = i ? n.patterns.percent.negativePattern : n.patterns.percent.positivePattern;
    return c = c.replace("{number}", m), c = c.replace("%", n.symbols.percent), i && (c = c.replace("-", n.symbols.negative)), c
}

function o(e) {
    if (null == e) return 0;
    const t = a();
    if ("" === (e = e.replace(new RegExp(`\\s|[${t.symbols.group}]`, "g"), ""))) return 0;
    let n = "",
        r = !1,
        i = !1,
        s = !1;
    for (let a = 0; a < e.length; a++) {
        let m = e.charAt(a);
        switch (m) {
            case t.symbols.decimal:
                n += i ? "" : ".", i = !0;
                break;
            case t.symbols.negative:
            case "(":
            case ")":
                r = !0;
                break;
            default:
                m = parseInt(m), !isNaN(m) && m >= 0 && m <= 9 ? n += m : s = !0
        }
        if (s) break
    }
    return 0 === n.length ? NaN : (n = parseFloat(n), r && (n *= -1), n)
}
export {
    c as a, m as f, a as g, o as p
};