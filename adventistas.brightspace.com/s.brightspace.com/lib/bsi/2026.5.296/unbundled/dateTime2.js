import {
    c as t,
    a as e
} from "./dateTime.js";

function n(t) {
    if (!(t && Object.prototype.hasOwnProperty.call(t, "year") && Object.prototype.hasOwnProperty.call(t, "month") && Object.prototype.hasOwnProperty.call(t, "date"))) throw new Error("Invalid input: Expected input to be object containing year, month, and date");
    let e = t.month,
        n = t.date;
    return t.month.toString().length < 2 && (e = `0${e}`), t.date.toString().length < 2 && (n = `0${n}`), `${t.year}-${e}-${n}`
}

function r(t, e) {
    if (!t) throw new Error("Invalid input: Expected input to be an object");
    return `${n({year:t.year,month:t.month,date:t.date})}T${s({hours:t.hours,minutes:t.minutes,seconds:t.seconds})}.000${e?"":"Z"}`
}

function s(t) {
    if (!(t && Object.prototype.hasOwnProperty.call(t, "hours") && Object.prototype.hasOwnProperty.call(t, "minutes") && Object.prototype.hasOwnProperty.call(t, "seconds"))) throw new Error("Invalid input: Expected input to be object containing hours, minutes, and seconds");
    let e = t.hours,
        n = t.minutes,
        r = t.seconds;
    return e.toString().length < 2 && (e = `0${e}`), n.toString().length < 2 && (n = `0${n}`), r.toString().length < 2 && (r = `0${r}`), `${e}:${n}:${r}`
}

function o(t) {
    let e = t.getHours(),
        n = t.getMinutes(),
        r = t.getSeconds();
    return e.toString().length < 2 && (e = `0${e}`), n.toString().length < 2 && (n = `0${n}`), r.toString().length < 2 && (r = `0${r}`), `${e}:${n}:${r}`
}

function a(t, e, n) {
    const r = t.hours - e.hours,
        s = t.minutes - e.minutes;
    let o = n.hours + r,
        a = n.minutes + s;
    return a > 59 ? (o++, a -= 60) : a < 0 && (o--, a += 60), o > 23 ? (o = 23, a = 59) : o < 0 && (o = 0, a = 0), {
        hours: o,
        minutes: a
    }
}

function i(t, s, o) {
    const a = p(),
        i = u(a),
        h = o ? r(e(a)) : n(a),
        l = c(t),
        d = c(s);
    if (t && s) {
        if (y(i, l, d)) return h;
        return Math.abs(i.getTime() - l.getTime()) < Math.abs(i.getTime() - d.getTime()) ? t : s
    }
    return t ? y(i, l, void 0) ? h : t : s ? y(i, void 0, d) ? h : s : h
}

function u(t) {
    return new Date(t.year, parseInt(t.month) - 1, t.date)
}

function c(t) {
    if (!t) return null;
    return u(I(t))
}

function h(e) {
    if (!e) return null;
    const n = T(e),
        r = t(n);
    return new Date(r.year, r.month - 1, r.date, r.hours, r.minutes, r.seconds)
}

function l(t) {
    if (!t) return null;
    const e = $(t),
        n = p();
    return new Date(n.year, n.month - 1, n.date, e.hours, e.minutes, e.seconds)
}

function d(t) {
    const e = T(t);
    return new Date(e.year, e.month - 1, e.date, e.hours, e.minutes, e.seconds)
}

function m(e) {
    const n = T(e);
    return r(t(n), !0)
}

function p() {
    const e = T((new Date).toISOString());
    return t(e)
}

function f(t, n) {
    if (!t || !n) throw new Error("Invalid input: Expected date and time");
    const s = I(t),
        o = $(n);
    return r(e(Object.assign(s, o)))
}

function g(t, e) {
    if (!t || !e && 0 !== e || 0 === e && "days" !== t) return {};
    if ("seconds" !== t && "minutes" !== t && "hours" !== t && "days" !== t && "months" !== t && "years" !== t) return {};
    if ("days" === t && 0 === e) {
        const t = n(p());
        return {
            startValue: f(t, "0:0:0"),
            endValue: f(t, "23:59:59")
        }
    }
    const r = new Date,
        s = r.toISOString();
    if ("seconds" === t) {
        const t = r.getUTCSeconds() + e;
        r.setUTCSeconds(t)
    } else if ("minutes" === t) {
        const t = r.getUTCMinutes() + e;
        r.setUTCMinutes(t)
    } else if ("hours" === t) {
        const t = r.getUTCHours() + e;
        r.setUTCHours(t)
    } else if ("days" === t) {
        const t = r.getUTCDate() + e;
        r.setUTCDate(t)
    } else if ("months" === t) {
        const t = r.getUTCMonth() + e;
        r.setUTCMonth(t)
    } else if ("years" === t) {
        const t = r.getUTCFullYear() + e;
        r.setUTCFullYear(t)
    }
    return e > 0 ? {
        startValue: s,
        endValue: r.toISOString()
    } : {
        startValue: r.toISOString(),
        endValue: s
    }
}

function y(t, e, n) {
    if (!t) return !1;
    const r = !e || e && t.getTime() >= e.getTime(),
        s = !n || n && t.getTime() <= n.getTime();
    return r && s
}

function w(t) {
    return null !== t.match(/([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2}))?/)
}

function I(t) {
    if (!t) return null;
    const e = t.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})/);
    if (!e || 4 !== e.length) throw new Error("Invalid input: Expected format is YYYY-MM-DD");
    return {
        year: parseInt(e[1]),
        month: parseInt(e[2]),
        date: parseInt(e[3])
    }
}

function T(t) {
    if (!t) return null;
    const e = t.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
    if (!e || 7 !== e.length) throw new Error("Invalid input: Expected format is YYYY-MM-DDTHH:mm:ss.sssZ");
    return {
        year: parseInt(e[1]),
        month: parseInt(e[2]),
        date: parseInt(e[3]),
        hours: parseInt(e[4]),
        minutes: parseInt(e[5]),
        seconds: parseInt(e[6])
    }
}

function $(t) {
    let e = 0,
        n = 0,
        r = 0;
    const s = t.match(/([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2}))?/);
    if (null === s) throw new Error("Invalid input: Expected format is hh:mm:ss");
    return s.length > 1 && (e = parseInt(s[1]), (isNaN(e) || e < 0 || e > 23) && (e = 0)), s.length > 2 && (n = parseInt(s[2]), (isNaN(n) || n < 0 || n > 59) && (n = 0)), s.length > 3 && (r = parseInt(s[4]), (isNaN(r) || r < 0 || r > 59) && (r = 0)), {
        hours: e,
        minutes: n,
        seconds: r
    }
}
export {
    u as a, p as b, i as c, r as d, m as e, n as f, c as g, d as h, y as i, h as j, f as k, o as l, I as m, $ as n, a as o, T as p, w as q, l as r, s, g as t
};