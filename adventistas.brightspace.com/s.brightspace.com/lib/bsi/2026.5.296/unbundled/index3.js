const e = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;

function t(t) {
    const h = {};
    return t.replace(e, e => {
        const t = e.length;
        switch (e[0]) {
            case "G":
                h.era = 4 === t ? "long" : 5 === t ? "narrow" : "short";
                break;
            case "y":
                h.year = 2 === t ? "2-digit" : "numeric";
                break;
            case "Y":
            case "u":
            case "U":
            case "r":
                throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
            case "q":
            case "Q":
                throw new RangeError("`q/Q` (quarter) patterns are not supported");
            case "M":
            case "L":
                h.month = ["numeric", "2-digit", "short", "long", "narrow"][t - 1];
                break;
            case "w":
            case "W":
                throw new RangeError("`w/W` (week) patterns are not supported");
            case "d":
                h.day = ["numeric", "2-digit"][t - 1];
                break;
            case "D":
            case "F":
            case "g":
                throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
            case "E":
                h.weekday = 4 === t ? "long" : 5 === t ? "narrow" : "short";
                break;
            case "e":
                if (t < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
                h.weekday = ["short", "long", "narrow", "short"][t - 4];
                break;
            case "c":
                if (t < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
                h.weekday = ["short", "long", "narrow", "short"][t - 4];
                break;
            case "a":
                h.hour12 = !0;
                break;
            case "b":
            case "B":
                throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
            case "h":
                h.hourCycle = "h12", h.hour = ["numeric", "2-digit"][t - 1];
                break;
            case "H":
                h.hourCycle = "h23", h.hour = ["numeric", "2-digit"][t - 1];
                break;
            case "K":
                h.hourCycle = "h11", h.hour = ["numeric", "2-digit"][t - 1];
                break;
            case "k":
                h.hourCycle = "h24", h.hour = ["numeric", "2-digit"][t - 1];
                break;
            case "j":
            case "J":
            case "C":
                throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
            case "m":
                h.minute = ["numeric", "2-digit"][t - 1];
                break;
            case "s":
                h.second = ["numeric", "2-digit"][t - 1];
                break;
            case "S":
            case "A":
                throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
            case "z":
                h.timeZoneName = t < 4 ? "short" : "long";
                break;
            case "Z":
            case "O":
            case "v":
            case "V":
            case "X":
            case "x":
                throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")
        }
        return ""
    }), h
}
const h = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

function i(e) {
    return e.replace(/^(.*?)-/, "")
}
const n = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
    r = /^(@+)?(\+|#+)?[rs]?$/g,
    s = /(\*)(0+)|(#+)(0+)|(0+)/g,
    o = /^(0+)$/;

function a(e) {
    const t = {};
    return "r" === e[e.length - 1] ? t.roundingPriority = "morePrecision" : "s" === e[e.length - 1] && (t.roundingPriority = "lessPrecision"), e.replace(r, function(e, h, i) {
        return "string" != typeof i ? (t.minimumSignificantDigits = h.length, t.maximumSignificantDigits = h.length) : "+" === i ? t.minimumSignificantDigits = h.length : "#" === h[0] ? t.maximumSignificantDigits = h.length : (t.minimumSignificantDigits = h.length, t.maximumSignificantDigits = h.length + ("string" == typeof i ? i.length : 0)), ""
    }), t
}

function c(e) {
    switch (e) {
        case "sign-auto":
            return {
                signDisplay: "auto"
            };
        case "sign-accounting":
        case "()":
            return {
                currencySign: "accounting"
            };
        case "sign-always":
        case "+!":
            return {
                signDisplay: "always"
            };
        case "sign-accounting-always":
        case "()!":
            return {
                signDisplay: "always",
                currencySign: "accounting"
            };
        case "sign-except-zero":
        case "+?":
            return {
                signDisplay: "exceptZero"
            };
        case "sign-accounting-except-zero":
        case "()?":
            return {
                signDisplay: "exceptZero",
                currencySign: "accounting"
            };
        case "sign-never":
        case "+_":
            return {
                signDisplay: "never"
            }
    }
}

function u(e) {
    let t;
    if ("E" === e[0] && "E" === e[1] ? (t = {
            notation: "engineering"
        }, e = e.slice(2)) : "E" === e[0] && (t = {
            notation: "scientific"
        }, e = e.slice(1)), t) {
        const h = e.slice(0, 2);
        if ("+!" === h ? (t.signDisplay = "always", e = e.slice(2)) : "+?" === h && (t.signDisplay = "exceptZero", e = e.slice(2)), !o.test(e)) throw new Error("Malformed concise eng/scientific notation");
        t.minimumIntegerDigits = e.length
    }
    return t
}

function l(e) {
    const t = c(e);
    return t || {}
}

function E(e) {
    let t = {};
    for (const h of e) {
        switch (h.stem) {
            case "percent":
            case "%":
                t.style = "percent";
                continue;
            case "%x100":
                t.style = "percent", t.scale = 100;
                continue;
            case "currency":
                t.style = "currency", t.currency = h.options[0];
                continue;
            case "group-off":
            case ",_":
                t.useGrouping = !1;
                continue;
            case "precision-integer":
            case ".":
                t.maximumFractionDigits = 0;
                continue;
            case "measure-unit":
            case "unit":
                t.style = "unit", t.unit = i(h.options[0]);
                continue;
            case "compact-short":
            case "K":
                t.notation = "compact", t.compactDisplay = "short";
                continue;
            case "compact-long":
            case "KK":
                t.notation = "compact", t.compactDisplay = "long";
                continue;
            case "scientific":
                t = { ...t,
                    notation: "scientific",
                    ...h.options.reduce((e, t) => ({ ...e,
                        ...l(t)
                    }), {})
                };
                continue;
            case "engineering":
                t = { ...t,
                    notation: "engineering",
                    ...h.options.reduce((e, t) => ({ ...e,
                        ...l(t)
                    }), {})
                };
                continue;
            case "notation-simple":
                t.notation = "standard";
                continue;
            case "unit-width-narrow":
                t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
                continue;
            case "unit-width-short":
                t.currencyDisplay = "code", t.unitDisplay = "short";
                continue;
            case "unit-width-full-name":
                t.currencyDisplay = "name", t.unitDisplay = "long";
                continue;
            case "unit-width-iso-code":
                t.currencyDisplay = "symbol";
                continue;
            case "scale":
                t.scale = parseFloat(h.options[0]);
                continue;
            case "rounding-mode-floor":
                t.roundingMode = "floor";
                continue;
            case "rounding-mode-ceiling":
                t.roundingMode = "ceil";
                continue;
            case "rounding-mode-down":
                t.roundingMode = "trunc";
                continue;
            case "rounding-mode-up":
                t.roundingMode = "expand";
                continue;
            case "rounding-mode-half-even":
                t.roundingMode = "halfEven";
                continue;
            case "rounding-mode-half-down":
                t.roundingMode = "halfTrunc";
                continue;
            case "rounding-mode-half-up":
                t.roundingMode = "halfExpand";
                continue;
            case "integer-width":
                if (h.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
                h.options[0].replace(s, function(e, h, i, n, r, s) {
                    if (h) t.minimumIntegerDigits = i.length;
                    else {
                        if (n && r) throw new Error("We currently do not support maximum integer digits");
                        if (s) throw new Error("We currently do not support exact integer digits")
                    }
                    return ""
                });
                continue
        }
        if (o.test(h.stem)) {
            t.minimumIntegerDigits = h.stem.length;
            continue
        }
        if (n.test(h.stem)) {
            if (h.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
            h.stem.replace(n, function(e, h, i, n, r, s) {
                return "*" === i ? t.minimumFractionDigits = h.length : n && "#" === n[0] ? t.maximumFractionDigits = n.length : r && s ? (t.minimumFractionDigits = r.length, t.maximumFractionDigits = r.length + s.length) : (t.minimumFractionDigits = h.length, t.maximumFractionDigits = h.length), ""
            });
            const e = h.options[0];
            "w" === e ? t = { ...t,
                trailingZeroDisplay: "stripIfInteger"
            } : e && (t = { ...t,
                ...a(e)
            });
            continue
        }
        if (r.test(h.stem)) {
            t = { ...t,
                ...a(h.stem)
            };
            continue
        }
        const e = c(h.stem);
        e && (t = { ...t,
            ...e
        });
        const E = u(h.stem);
        E && (t = { ...t,
            ...E
        })
    }
    return t
}
let H = function(e) {
        return e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG", e
    }({}),
    p = function(e) {
        return e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag", e
    }({}),
    b = function(e) {
        return e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime", e
    }({});

function f(e) {
    return e.type === p.literal
}

function B(e) {
    return e.type === p.argument
}

function T(e) {
    return e.type === p.number
}

function m(e) {
    return e.type === p.date
}

function g(e) {
    return e.type === p.time
}

function _(e) {
    return e.type === p.select
}

function A(e) {
    return e.type === p.plural
}

function P(e) {
    return e.type === p.pound
}

function L(e) {
    return e.type === p.tag
}

function S(e) {
    return !(!e || "object" != typeof e || e.type !== b.number)
}

function N(e) {
    return !(!e || "object" != typeof e || e.type !== b.dateTime)
}
const d = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
    C = {
        "001": ["H", "h"],
        419: ["h", "H", "hB", "hb"],
        AC: ["H", "h", "hb", "hB"],
        AD: ["H", "hB"],
        AE: ["h", "hB", "hb", "H"],
        AF: ["H", "hb", "hB", "h"],
        AG: ["h", "hb", "H", "hB"],
        AI: ["H", "h", "hb", "hB"],
        AL: ["h", "H", "hB"],
        AM: ["H", "hB"],
        AO: ["H", "hB"],
        AR: ["h", "H", "hB", "hb"],
        AS: ["h", "H"],
        AT: ["H", "hB"],
        AU: ["h", "hb", "H", "hB"],
        AW: ["H", "hB"],
        AX: ["H"],
        AZ: ["H", "hB", "h"],
        BA: ["H", "hB", "h"],
        BB: ["h", "hb", "H", "hB"],
        BD: ["h", "hB", "H"],
        BE: ["H", "hB"],
        BF: ["H", "hB"],
        BG: ["H", "hB", "h"],
        BH: ["h", "hB", "hb", "H"],
        BI: ["H", "h"],
        BJ: ["H", "hB"],
        BL: ["H", "hB"],
        BM: ["h", "hb", "H", "hB"],
        BN: ["hb", "hB", "h", "H"],
        BO: ["h", "H", "hB", "hb"],
        BQ: ["H"],
        BR: ["H", "hB"],
        BS: ["h", "hb", "H", "hB"],
        BT: ["h", "H"],
        BW: ["H", "h", "hb", "hB"],
        BY: ["H", "h"],
        BZ: ["H", "h", "hb", "hB"],
        CA: ["h", "hb", "H", "hB"],
        CC: ["H", "h", "hb", "hB"],
        CD: ["hB", "H"],
        CF: ["H", "h", "hB"],
        CG: ["H", "hB"],
        CH: ["H", "hB", "h"],
        CI: ["H", "hB"],
        CK: ["H", "h", "hb", "hB"],
        CL: ["h", "H", "hB", "hb"],
        CM: ["H", "h", "hB"],
        CN: ["H", "hB", "hb", "h"],
        CO: ["h", "H", "hB", "hb"],
        CP: ["H"],
        CR: ["h", "H", "hB", "hb"],
        CU: ["h", "H", "hB", "hb"],
        CV: ["H", "hB"],
        CW: ["H", "hB"],
        CX: ["H", "h", "hb", "hB"],
        CY: ["h", "H", "hb", "hB"],
        CZ: ["H"],
        DE: ["H", "hB"],
        DG: ["H", "h", "hb", "hB"],
        DJ: ["h", "H"],
        DK: ["H"],
        DM: ["h", "hb", "H", "hB"],
        DO: ["h", "H", "hB", "hb"],
        DZ: ["h", "hB", "hb", "H"],
        EA: ["H", "h", "hB", "hb"],
        EC: ["h", "H", "hB", "hb"],
        EE: ["H", "hB"],
        EG: ["h", "hB", "hb", "H"],
        EH: ["h", "hB", "hb", "H"],
        ER: ["h", "H"],
        ES: ["H", "hB", "h", "hb"],
        ET: ["hB", "hb", "h", "H"],
        FI: ["H"],
        FJ: ["h", "hb", "H", "hB"],
        FK: ["H", "h", "hb", "hB"],
        FM: ["h", "hb", "H", "hB"],
        FO: ["H", "h"],
        FR: ["H", "hB"],
        GA: ["H", "hB"],
        GB: ["H", "h", "hb", "hB"],
        GD: ["h", "hb", "H", "hB"],
        GE: ["H", "hB", "h"],
        GF: ["H", "hB"],
        GG: ["H", "h", "hb", "hB"],
        GH: ["h", "H"],
        GI: ["H", "h", "hb", "hB"],
        GL: ["H", "h"],
        GM: ["h", "hb", "H", "hB"],
        GN: ["H", "hB"],
        GP: ["H", "hB"],
        GQ: ["H", "hB", "h", "hb"],
        GR: ["h", "H", "hb", "hB"],
        GS: ["H", "h", "hb", "hB"],
        GT: ["h", "H", "hB", "hb"],
        GU: ["h", "hb", "H", "hB"],
        GW: ["H", "hB"],
        GY: ["h", "hb", "H", "hB"],
        HK: ["h", "hB", "hb", "H"],
        HN: ["h", "H", "hB", "hb"],
        HR: ["H", "hB"],
        HU: ["H", "h"],
        IC: ["H", "h", "hB", "hb"],
        ID: ["H"],
        IE: ["H", "h", "hb", "hB"],
        IL: ["H", "hB"],
        IM: ["H", "h", "hb", "hB"],
        IN: ["h", "H"],
        IO: ["H", "h", "hb", "hB"],
        IQ: ["h", "hB", "hb", "H"],
        IR: ["hB", "H"],
        IS: ["H"],
        IT: ["H", "hB"],
        JE: ["H", "h", "hb", "hB"],
        JM: ["h", "hb", "H", "hB"],
        JO: ["h", "hB", "hb", "H"],
        JP: ["H", "K", "h"],
        KE: ["hB", "hb", "H", "h"],
        KG: ["H", "h", "hB", "hb"],
        KH: ["hB", "h", "H", "hb"],
        KI: ["h", "hb", "H", "hB"],
        KM: ["H", "h", "hB", "hb"],
        KN: ["h", "hb", "H", "hB"],
        KP: ["h", "H", "hB", "hb"],
        KR: ["h", "H", "hB", "hb"],
        KW: ["h", "hB", "hb", "H"],
        KY: ["h", "hb", "H", "hB"],
        KZ: ["H", "hB"],
        LA: ["H", "hb", "hB", "h"],
        LB: ["h", "hB", "hb", "H"],
        LC: ["h", "hb", "H", "hB"],
        LI: ["H", "hB", "h"],
        LK: ["H", "h", "hB", "hb"],
        LR: ["h", "hb", "H", "hB"],
        LS: ["h", "H"],
        LT: ["H", "h", "hb", "hB"],
        LU: ["H", "h", "hB"],
        LV: ["H", "hB", "hb", "h"],
        LY: ["h", "hB", "hb", "H"],
        MA: ["H", "h", "hB", "hb"],
        MC: ["H", "hB"],
        MD: ["H", "hB"],
        ME: ["H", "hB", "h"],
        MF: ["H", "hB"],
        MG: ["H", "h"],
        MH: ["h", "hb", "H", "hB"],
        MK: ["H", "h", "hb", "hB"],
        ML: ["H"],
        MM: ["hB", "hb", "H", "h"],
        MN: ["H", "h", "hb", "hB"],
        MO: ["h", "hB", "hb", "H"],
        MP: ["h", "hb", "H", "hB"],
        MQ: ["H", "hB"],
        MR: ["h", "hB", "hb", "H"],
        MS: ["H", "h", "hb", "hB"],
        MT: ["H", "h"],
        MU: ["H", "h"],
        MV: ["H", "h"],
        MW: ["h", "hb", "H", "hB"],
        MX: ["h", "H", "hB", "hb"],
        MY: ["hb", "hB", "h", "H"],
        MZ: ["H", "hB"],
        NA: ["h", "H", "hB", "hb"],
        NC: ["H", "hB"],
        NE: ["H"],
        NF: ["H", "h", "hb", "hB"],
        NG: ["H", "h", "hb", "hB"],
        NI: ["h", "H", "hB", "hb"],
        NL: ["H", "hB"],
        NO: ["H", "h"],
        NP: ["H", "h", "hB"],
        NR: ["H", "h", "hb", "hB"],
        NU: ["H", "h", "hb", "hB"],
        NZ: ["h", "hb", "H", "hB"],
        OM: ["h", "hB", "hb", "H"],
        PA: ["h", "H", "hB", "hb"],
        PE: ["h", "H", "hB", "hb"],
        PF: ["H", "h", "hB"],
        PG: ["h", "H"],
        PH: ["h", "hB", "hb", "H"],
        PK: ["h", "hB", "H"],
        PL: ["H", "h"],
        PM: ["H", "hB"],
        PN: ["H", "h", "hb", "hB"],
        PR: ["h", "H", "hB", "hb"],
        PS: ["h", "hB", "hb", "H"],
        PT: ["H", "hB"],
        PW: ["h", "H"],
        PY: ["h", "H", "hB", "hb"],
        QA: ["h", "hB", "hb", "H"],
        RE: ["H", "hB"],
        RO: ["H", "hB"],
        RS: ["H", "hB", "h"],
        RU: ["H"],
        RW: ["H", "h"],
        SA: ["h", "hB", "hb", "H"],
        SB: ["h", "hb", "H", "hB"],
        SC: ["H", "h", "hB"],
        SD: ["h", "hB", "hb", "H"],
        SE: ["H"],
        SG: ["h", "hb", "H", "hB"],
        SH: ["H", "h", "hb", "hB"],
        SI: ["H", "hB"],
        SJ: ["H"],
        SK: ["H"],
        SL: ["h", "hb", "H", "hB"],
        SM: ["H", "h", "hB"],
        SN: ["H", "h", "hB"],
        SO: ["h", "H"],
        SR: ["H", "hB"],
        SS: ["h", "hb", "H", "hB"],
        ST: ["H", "hB"],
        SV: ["h", "H", "hB", "hb"],
        SX: ["H", "h", "hb", "hB"],
        SY: ["h", "hB", "hb", "H"],
        SZ: ["h", "hb", "H", "hB"],
        TA: ["H", "h", "hb", "hB"],
        TC: ["h", "hb", "H", "hB"],
        TD: ["h", "H", "hB"],
        TF: ["H", "h", "hB"],
        TG: ["H", "hB"],
        TH: ["H", "h"],
        TJ: ["H", "h"],
        TL: ["H", "hB", "hb", "h"],
        TM: ["H", "h"],
        TN: ["h", "hB", "hb", "H"],
        TO: ["h", "H"],
        TR: ["H", "hB"],
        TT: ["h", "hb", "H", "hB"],
        TW: ["hB", "hb", "h", "H"],
        TZ: ["hB", "hb", "H", "h"],
        UA: ["H", "hB", "h"],
        UG: ["hB", "hb", "H", "h"],
        UM: ["h", "hb", "H", "hB"],
        US: ["h", "hb", "H", "hB"],
        UY: ["h", "H", "hB", "hb"],
        UZ: ["H", "hB", "h"],
        VA: ["H", "h", "hB"],
        VC: ["h", "hb", "H", "hB"],
        VE: ["h", "H", "hB", "hb"],
        VG: ["h", "hb", "H", "hB"],
        VI: ["h", "hb", "H", "hB"],
        VN: ["H", "h"],
        VU: ["h", "H"],
        WF: ["H", "hB"],
        WS: ["h", "H"],
        XK: ["H", "hB", "h"],
        YE: ["h", "hB", "hb", "H"],
        YT: ["H", "hB"],
        ZA: ["H", "h", "hb", "hB"],
        ZM: ["h", "hb", "H", "hB"],
        ZW: ["H", "h"],
        "af-ZA": ["H", "h", "hB", "hb"],
        "ar-001": ["h", "hB", "hb", "H"],
        "ca-ES": ["H", "h", "hB"],
        "en-001": ["h", "hb", "H", "hB"],
        "en-HK": ["h", "hb", "H", "hB"],
        "en-IL": ["H", "h", "hb", "hB"],
        "en-MY": ["h", "hb", "H", "hB"],
        "es-BR": ["H", "h", "hB", "hb"],
        "es-ES": ["H", "h", "hB", "hb"],
        "es-GQ": ["H", "h", "hB", "hb"],
        "fr-CA": ["H", "h", "hB"],
        "gl-ES": ["H", "h", "hB"],
        "gu-IN": ["hB", "hb", "h", "H"],
        "hi-IN": ["hB", "h", "H"],
        "it-CH": ["H", "h", "hB"],
        "it-IT": ["H", "h", "hB"],
        "kn-IN": ["hB", "h", "H"],
        "ku-SY": ["H", "hB"],
        "ml-IN": ["hB", "h", "H"],
        "mr-IN": ["hB", "hb", "h", "H"],
        "pa-IN": ["hB", "hb", "h", "H"],
        "ta-IN": ["hB", "h", "hb", "H"],
        "te-IN": ["hB", "h", "H"],
        "zu-ZA": ["H", "hB", "hb", "h"]
    };

function R(e) {
    let t = e.hourCycle;
    if (void 0 === t && e.hourCycles && e.hourCycles.length && (t = e.hourCycles[0]), t) switch (t) {
        case "h24":
            return "k";
        case "h23":
            return "H";
        case "h12":
            return "h";
        case "h11":
            return "K";
        default:
            throw new Error("Invalid hourCycle")
    }
    const h = e.language;
    let i;
    return "root" !== h && (i = e.maximize().region), (C[i || ""] || C[h || ""] || C[`${h}-001`] || C["001"])[0]
}
const M = new RegExp(`^${d.source}*`),
    I = new RegExp(`${d.source}*$`);

function U(e, t) {
    return {
        start: e,
        end: t
    }
}
const y = !!Object.fromEntries,
    G = !!String.prototype.trimStart,
    O = !!String.prototype.trimEnd,
    D = y ? Object.fromEntries : function(e) {
        const t = {};
        for (const [h, i] of e) t[h] = i;
        return t
    },
    w = G ? function(e) {
        return e.trimStart()
    } : function(e) {
        return e.replace(M, "")
    },
    F = O ? function(e) {
        return e.trimEnd()
    } : function(e) {
        return e.replace(I, "")
    },
    k = new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
var v = class {
    constructor(e, t = {}) {
        this.message = e, this.position = {
            offset: 0,
            line: 1,
            column: 1
        }, this.ignoreTag = !!t.ignoreTag, this.locale = t.locale, this.requiresOtherClause = !!t.requiresOtherClause, this.shouldParseSkeletons = !!t.shouldParseSkeletons
    }
    parse() {
        if (0 !== this.offset()) throw Error("parser can only be used once");
        return this.parseMessage(0, "", !1)
    }
    parseMessage(e, t, h) {
        let i = [];
        for (; !this.isEOF();) {
            const n = this.char();
            if (123 === n) {
                const t = this.parseArgument(e, h);
                if (t.err) return t;
                i.push(t.val)
            } else {
                if (125 === n && e > 0) break;
                if (35 !== n || "plural" !== t && "selectordinal" !== t) {
                    if (60 === n && !this.ignoreTag && 47 === this.peek()) {
                        if (h) break;
                        return this.error(H.UNMATCHED_CLOSING_TAG, U(this.clonePosition(), this.clonePosition()))
                    }
                    if (60 === n && !this.ignoreTag && X(this.peek() || 0)) {
                        const h = this.parseTag(e, t);
                        if (h.err) return h;
                        i.push(h.val)
                    } else {
                        const h = this.parseLiteral(e, t);
                        if (h.err) return h;
                        i.push(h.val)
                    }
                } else {
                    const e = this.clonePosition();
                    this.bump(), i.push({
                        type: p.pound,
                        location: U(e, this.clonePosition())
                    })
                }
            }
        }
        return {
            val: i,
            err: null
        }
    }
    parseTag(e, t) {
        const h = this.clonePosition();
        this.bump();
        const i = this.parseTagName();
        if (this.bumpSpace(), this.bumpIf("/>")) return {
            val: {
                type: p.literal,
                value: `<${i}/>`,
                location: U(h, this.clonePosition())
            },
            err: null
        };
        if (this.bumpIf(">")) {
            const n = this.parseMessage(e + 1, t, !0);
            if (n.err) return n;
            const r = n.val,
                s = this.clonePosition();
            if (this.bumpIf("</")) {
                if (this.isEOF() || !X(this.char())) return this.error(H.INVALID_TAG, U(s, this.clonePosition()));
                const e = this.clonePosition();
                return i !== this.parseTagName() ? this.error(H.UNMATCHED_CLOSING_TAG, U(e, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
                    val: {
                        type: p.tag,
                        value: i,
                        children: r,
                        location: U(h, this.clonePosition())
                    },
                    err: null
                } : this.error(H.INVALID_TAG, U(s, this.clonePosition())))
            }
            return this.error(H.UNCLOSED_TAG, U(h, this.clonePosition()))
        }
        return this.error(H.INVALID_TAG, U(h, this.clonePosition()))
    }
    parseTagName() {
        const e = this.offset();
        for (this.bump(); !this.isEOF() && V(this.char());) this.bump();
        return this.message.slice(e, this.offset())
    }
    parseLiteral(e, t) {
        const h = this.clonePosition();
        let i = "";
        for (;;) {
            const h = this.tryParseQuote(t);
            if (h) {
                i += h;
                continue
            }
            const n = this.tryParseUnquoted(e, t);
            if (n) {
                i += n;
                continue
            }
            const r = this.tryParseLeftAngleBracket();
            if (!r) break;
            i += r
        }
        const n = U(h, this.clonePosition());
        return {
            val: {
                type: p.literal,
                value: i,
                location: n
            },
            err: null
        }
    }
    tryParseLeftAngleBracket() {
        return this.isEOF() || 60 !== this.char() || !this.ignoreTag && (X(e = this.peek() || 0) || 47 === e) ? null : (this.bump(), "<");
        var e
    }
    tryParseQuote(e) {
        if (this.isEOF() || 39 !== this.char()) return null;
        switch (this.peek()) {
            case 39:
                return this.bump(), this.bump(), "'";
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35:
                if ("plural" === e || "selectordinal" === e) break;
                return null;
            default:
                return null
        }
        this.bump();
        const t = [this.char()];
        for (this.bump(); !this.isEOF();) {
            const e = this.char();
            if (39 === e) {
                if (39 !== this.peek()) {
                    this.bump();
                    break
                }
                t.push(39), this.bump()
            } else t.push(e);
            this.bump()
        }
        return String.fromCodePoint(...t)
    }
    tryParseUnquoted(e, t) {
        if (this.isEOF()) return null;
        const h = this.char();
        return 60 === h || 123 === h || 35 === h && ("plural" === t || "selectordinal" === t) || 125 === h && e > 0 ? null : (this.bump(), String.fromCodePoint(h))
    }
    parseArgument(e, t) {
        const h = this.clonePosition();
        if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(H.EXPECT_ARGUMENT_CLOSING_BRACE, U(h, this.clonePosition()));
        if (125 === this.char()) return this.bump(), this.error(H.EMPTY_ARGUMENT, U(h, this.clonePosition()));
        let i = this.parseIdentifierIfPossible().value;
        if (!i) return this.error(H.MALFORMED_ARGUMENT, U(h, this.clonePosition()));
        if (this.bumpSpace(), this.isEOF()) return this.error(H.EXPECT_ARGUMENT_CLOSING_BRACE, U(h, this.clonePosition()));
        switch (this.char()) {
            case 125:
                return this.bump(), {
                    val: {
                        type: p.argument,
                        value: i,
                        location: U(h, this.clonePosition())
                    },
                    err: null
                };
            case 44:
                return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(H.EXPECT_ARGUMENT_CLOSING_BRACE, U(h, this.clonePosition())) : this.parseArgumentOptions(e, t, i, h);
            default:
                return this.error(H.MALFORMED_ARGUMENT, U(h, this.clonePosition()))
        }
    }
    parseIdentifierIfPossible() {
        const e = this.clonePosition(),
            t = this.offset(),
            h = (i = this.message, n = t, k.lastIndex = n, k.exec(i)[1] ? ? "");
        var i, n;
        const r = t + h.length;
        return this.bumpTo(r), {
            value: h,
            location: U(e, this.clonePosition())
        }
    }
    parseArgumentOptions(e, h, i, n) {
        let r = this.clonePosition(),
            s = this.parseIdentifierIfPossible().value,
            o = this.clonePosition();
        switch (s) {
            case "":
                return this.error(H.EXPECT_ARGUMENT_TYPE, U(r, o));
            case "number":
            case "date":
            case "time":
                {
                    this.bumpSpace();
                    let e = null;
                    if (this.bumpIf(",")) {
                        this.bumpSpace();
                        const t = this.clonePosition(),
                            h = this.parseSimpleArgStyleIfPossible();
                        if (h.err) return h;
                        const i = F(h.val);
                        if (0 === i.length) return this.error(H.EXPECT_ARGUMENT_STYLE, U(this.clonePosition(), this.clonePosition()));
                        e = {
                            style: i,
                            styleLocation: U(t, this.clonePosition())
                        }
                    }
                    const h = this.tryParseArgumentClose(n);
                    if (h.err) return h;
                    const r = U(n, this.clonePosition());
                    if (e && e.style.startsWith("::")) {
                        let h = w(e.style.slice(2));
                        if ("number" === s) {
                            const t = this.parseNumberSkeletonFromString(h, e.styleLocation);
                            return t.err ? t : {
                                val: {
                                    type: p.number,
                                    value: i,
                                    location: r,
                                    style: t.val
                                },
                                err: null
                            }
                        } {
                            if (0 === h.length) return this.error(H.EXPECT_DATE_TIME_SKELETON, r);
                            let n = h;
                            this.locale && (n = function(e, t) {
                                let h = "";
                                for (let i = 0; i < e.length; i++) {
                                    const n = e.charAt(i);
                                    if ("j" === n) {
                                        let r = 0;
                                        for (; i + 1 < e.length && e.charAt(i + 1) === n;) r++, i++;
                                        let s = 1 + (1 & r),
                                            o = r < 2 ? 1 : 3 + (r >> 1),
                                            a = "a",
                                            c = R(t);
                                        for ("H" != c && "k" != c || (o = 0); o-- > 0;) h += a;
                                        for (; s-- > 0;) h = c + h
                                    } else h += "J" === n ? "H" : n
                                }
                                return h
                            }(h, this.locale));
                            const o = {
                                type: b.dateTime,
                                pattern: n,
                                location: e.styleLocation,
                                parsedOptions: this.shouldParseSkeletons ? t(n) : {}
                            };
                            return {
                                val: {
                                    type: "date" === s ? p.date : p.time,
                                    value: i,
                                    location: r,
                                    style: o
                                },
                                err: null
                            }
                        }
                    }
                    return {
                        val: {
                            type: "number" === s ? p.number : "date" === s ? p.date : p.time,
                            value: i,
                            location: r,
                            style: e ? .style ? ? null
                        },
                        err: null
                    }
                }
            case "plural":
            case "selectordinal":
            case "select":
                {
                    const t = this.clonePosition();
                    if (this.bumpSpace(), !this.bumpIf(",")) return this.error(H.EXPECT_SELECT_ARGUMENT_OPTIONS, U(t, { ...t
                    }));this.bumpSpace();
                    let r = this.parseIdentifierIfPossible(),
                        o = 0;
                    if ("select" !== s && "offset" === r.value) {
                        if (!this.bumpIf(":")) return this.error(H.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, U(this.clonePosition(), this.clonePosition()));
                        this.bumpSpace();
                        const e = this.tryParseDecimalInteger(H.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, H.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                        if (e.err) return e;
                        this.bumpSpace(), r = this.parseIdentifierIfPossible(), o = e.val
                    }
                    const a = this.tryParsePluralOrSelectOptions(e, s, h, r);
                    if (a.err) return a;
                    const c = this.tryParseArgumentClose(n);
                    if (c.err) return c;
                    const u = U(n, this.clonePosition());
                    return "select" === s ? {
                        val: {
                            type: p.select,
                            value: i,
                            options: D(a.val),
                            location: u
                        },
                        err: null
                    } : {
                        val: {
                            type: p.plural,
                            value: i,
                            options: D(a.val),
                            offset: o,
                            pluralType: "plural" === s ? "cardinal" : "ordinal",
                            location: u
                        },
                        err: null
                    }
                }
            default:
                return this.error(H.INVALID_ARGUMENT_TYPE, U(r, o))
        }
    }
    tryParseArgumentClose(e) {
        return this.isEOF() || 125 !== this.char() ? this.error(H.EXPECT_ARGUMENT_CLOSING_BRACE, U(e, this.clonePosition())) : (this.bump(), {
            val: !0,
            err: null
        })
    }
    parseSimpleArgStyleIfPossible() {
        let e = 0;
        const t = this.clonePosition();
        for (; !this.isEOF();) switch (this.char()) {
            case 39:
                {
                    this.bump();
                    let e = this.clonePosition();
                    if (!this.bumpUntil("'")) return this.error(H.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, U(e, this.clonePosition()));this.bump();
                    break
                }
            case 123:
                e += 1, this.bump();
                break;
            case 125:
                if (!(e > 0)) return {
                    val: this.message.slice(t.offset, this.offset()),
                    err: null
                };
                e -= 1;
                break;
            default:
                this.bump()
        }
        return {
            val: this.message.slice(t.offset, this.offset()),
            err: null
        }
    }
    parseNumberSkeletonFromString(e, t) {
        let i = [];
        try {
            i = function(e) {
                if (0 === e.length) throw new Error("Number skeleton cannot be empty");
                const t = e.split(h).filter(e => e.length > 0),
                    i = [];
                for (const e of t) {
                    let t = e.split("/");
                    if (0 === t.length) throw new Error("Invalid number skeleton");
                    const [h, ...n] = t;
                    for (const e of n)
                        if (0 === e.length) throw new Error("Invalid number skeleton");
                    i.push({
                        stem: h,
                        options: n
                    })
                }
                return i
            }(e)
        } catch {
            return this.error(H.INVALID_NUMBER_SKELETON, t)
        }
        return {
            val: {
                type: b.number,
                tokens: i,
                location: t,
                parsedOptions: this.shouldParseSkeletons ? E(i) : {}
            },
            err: null
        }
    }
    tryParsePluralOrSelectOptions(e, t, h, i) {
        let n = !1;
        const r = [],
            s = new Set;
        let {
            value: o,
            location: a
        } = i;
        for (;;) {
            if (0 === o.length) {
                const e = this.clonePosition();
                if ("select" === t || !this.bumpIf("=")) break; {
                    const t = this.tryParseDecimalInteger(H.EXPECT_PLURAL_ARGUMENT_SELECTOR, H.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (t.err) return t;
                    a = U(e, this.clonePosition()), o = this.message.slice(e.offset, this.offset())
                }
            }
            if (s.has(o)) return this.error("select" === t ? H.DUPLICATE_SELECT_ARGUMENT_SELECTOR : H.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, a);
            "other" === o && (n = !0), this.bumpSpace();
            const i = this.clonePosition();
            if (!this.bumpIf("{")) return this.error("select" === t ? H.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : H.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, U(this.clonePosition(), this.clonePosition()));
            const c = this.parseMessage(e + 1, t, h);
            if (c.err) return c;
            const u = this.tryParseArgumentClose(i);
            if (u.err) return u;
            r.push([o, {
                value: c.val,
                location: U(i, this.clonePosition())
            }]), s.add(o), this.bumpSpace(), ({
                value: o,
                location: a
            } = this.parseIdentifierIfPossible())
        }
        return 0 === r.length ? this.error("select" === t ? H.EXPECT_SELECT_ARGUMENT_SELECTOR : H.EXPECT_PLURAL_ARGUMENT_SELECTOR, U(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !n ? this.error(H.MISSING_OTHER_CLAUSE, U(this.clonePosition(), this.clonePosition())) : {
            val: r,
            err: null
        }
    }
    tryParseDecimalInteger(e, t) {
        let h = 1;
        const i = this.clonePosition();
        this.bumpIf("+") || this.bumpIf("-") && (h = -1);
        let n = !1,
            r = 0;
        for (; !this.isEOF();) {
            const e = this.char();
            if (!(e >= 48 && e <= 57)) break;
            n = !0, r = 10 * r + (e - 48), this.bump()
        }
        const s = U(i, this.clonePosition());
        return n ? (r *= h, Number.isSafeInteger(r) ? {
            val: r,
            err: null
        } : this.error(t, s)) : this.error(e, s)
    }
    offset() {
        return this.position.offset
    }
    isEOF() {
        return this.offset() === this.message.length
    }
    clonePosition() {
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column
        }
    }
    char() {
        const e = this.position.offset;
        if (e >= this.message.length) throw Error("out of bound");
        const t = this.message.codePointAt(e);
        if (void 0 === t) throw Error(`Offset ${e} is at invalid UTF-16 code unit boundary`);
        return t
    }
    error(e, t) {
        return {
            val: null,
            err: {
                kind: e,
                message: this.message,
                location: t
            }
        }
    }
    bump() {
        if (this.isEOF()) return;
        const e = this.char();
        10 === e ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2)
    }
    bumpIf(e) {
        if (this.message.startsWith(e, this.offset())) {
            for (let t = 0; t < e.length; t++) this.bump();
            return !0
        }
        return !1
    }
    bumpUntil(e) {
        const t = this.offset(),
            h = this.message.indexOf(e, t);
        return h >= 0 ? (this.bumpTo(h), !0) : (this.bumpTo(this.message.length), !1)
    }
    bumpTo(e) {
        if (this.offset() > e) throw Error(`targetOffset ${e} must be greater than or equal to the current offset ${this.offset()}`);
        for (e = Math.min(e, this.message.length);;) {
            const t = this.offset();
            if (t === e) break;
            if (t > e) throw Error(`targetOffset ${e} is at invalid UTF-16 code unit boundary`);
            if (this.bump(), this.isEOF()) break
        }
    }
    bumpSpace() {
        for (; !this.isEOF() && K(this.char());) this.bump()
    }
    peek() {
        if (this.isEOF()) return null;
        const e = this.char(),
            t = this.offset();
        return this.message.charCodeAt(t + (e >= 65536 ? 2 : 1)) ? ? null
    }
};

function X(e) {
    return e >= 97 && e <= 122 || e >= 65 && e <= 90
}

function V(e) {
    return 45 === e || 46 === e || e >= 48 && e <= 57 || 95 === e || e >= 97 && e <= 122 || e >= 65 && e <= 90 || 183 == e || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039
}

function K(e) {
    return e >= 9 && e <= 13 || 32 === e || 133 === e || e >= 8206 && e <= 8207 || 8232 === e || 8233 === e
}

function x(e) {
    e.forEach(e => {
        if (delete e.location, _(e) || A(e))
            for (const t in e.options) delete e.options[t].location, x(e.options[t].value);
        else T(e) && S(e.style) || (m(e) || g(e)) && N(e.style) ? delete e.style.location : L(e) && x(e.children)
    })
}

function Y(e, t = {}) {
    t = {
        shouldParseSkeletons: !0,
        requiresOtherClause: !0,
        ...t
    };
    const h = new v(e, t).parse();
    if (h.err) {
        const e = SyntaxError(H[h.err.kind]);
        throw e.location = h.err.location, e.originalMessage = h.err.message, e
    }
    return t ? .captureLocation || x(h.val), h.val
}
export {
    P as a, B as b, m as c, N as d, g as e, T as f, S as g, L as h, f as i, _ as j, A as k, Y as p
};