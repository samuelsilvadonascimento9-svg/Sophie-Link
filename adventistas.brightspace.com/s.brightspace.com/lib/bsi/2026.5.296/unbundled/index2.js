import {
    p as e,
    i as t,
    a as r,
    b as n,
    c as s,
    d as o,
    e as i,
    f as a,
    g as l,
    h as u,
    j as c,
    k as m
} from "./index3.js";

function p(e, t) {
    const r = t && t.cache ? t.cache : b,
        n = t && t.serializer ? t.serializer : d;
    return (t && t.strategy ? t.strategy : g)(e, {
        cache: r,
        serializer: n
    })
}

function f(e, t, r, n) {
    const s = null == (o = n) || "number" == typeof o || "boolean" == typeof o ? n : r(n);
    var o;
    let i = t.get(s);
    return void 0 === i && (i = e.call(this, n), t.set(s, i)), i
}

function h(e, t, r) {
    const n = Array.prototype.slice.call(arguments, 3),
        s = r(n);
    let o = t.get(s);
    return void 0 === o && (o = e.apply(this, n), t.set(s, o)), o
}

function y(e, t, r, n, s) {
    return r.bind(t, e, n, s)
}

function g(e, t) {
    return y(e, this, 1 === e.length ? f : h, t.cache.create(), t.serializer)
}
const d = function() {
    return JSON.stringify(arguments)
};
var v = class {
    constructor() {
        this.cache = Object.create(null)
    }
    get(e) {
        return this.cache[e]
    }
    set(e, t) {
        this.cache[e] = t
    }
};
const b = {
        create: function() {
            return new v
        }
    },
    I = {
        variadic: function(e, t) {
            return y(e, this, h, t.cache.create(), t.serializer)
        }
    };
var L;
let w = function(e) {
    return e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API", e
}({});
var N = class extends Error {
        constructor(e, t, r) {
            super(e), this.code = t, this.originalMessage = r
        }
        toString() {
            return `[formatjs Error: ${this.code}] ${this.message}`
        }
    },
    A = class extends N {
        constructor(e, t, r, n) {
            super(`Invalid values for "${e}": "${t}". Options are "${Object.keys(r).join('", "')}"`, w.INVALID_VALUE, n)
        }
    },
    O = class extends N {
        constructor(e, t, r) {
            super(`Value for "${e}" must be of type ${t}`, w.INVALID_VALUE, r)
        }
    },
    _ = class extends N {
        constructor(e, t) {
            super(`The intl string context variable "${e}" was not provided to the string "${t}"`, w.MISSING_VALUE, t)
        }
    };
let S = function(e) {
    return e[e.literal = 0] = "literal", e[e.object = 1] = "object", e
}({});

function T(e) {
    return "function" == typeof e
}

function j(e, p, f, h, y, g, d) {
    if (1 === e.length && t(e[0])) return [{
        type: S.literal,
        value: e[0].value
    }];
    const v = [];
    for (const b of e) {
        if (t(b)) {
            v.push({
                type: S.literal,
                value: b.value
            });
            continue
        }
        if (r(b)) {
            "number" == typeof g && v.push({
                type: S.literal,
                value: f.getNumberFormat(p).format(g)
            });
            continue
        }
        const {
            value: e
        } = b;
        if (!y || !(e in y)) throw new _(e, d);
        let I = y[e];
        if (n(b)) I && "string" != typeof I && "number" != typeof I && "bigint" != typeof I || (I = "string" == typeof I || "number" == typeof I || "bigint" == typeof I ? String(I) : ""), v.push({
            type: "string" == typeof I ? S.literal : S.object,
            value: I
        });
        else {
            if (s(b)) {
                const e = "string" == typeof b.style ? h.date[b.style] : o(b.style) ? b.style.parsedOptions : void 0;
                v.push({
                    type: S.literal,
                    value: f.getDateTimeFormat(p, e).format(I)
                });
                continue
            }
            if (i(b)) {
                const e = "string" == typeof b.style ? h.time[b.style] : o(b.style) ? b.style.parsedOptions : h.time.medium;
                v.push({
                    type: S.literal,
                    value: f.getDateTimeFormat(p, e).format(I)
                });
                continue
            }
            if (a(b)) {
                const e = "string" == typeof b.style ? h.number[b.style] : l(b.style) ? b.style.parsedOptions : void 0;
                if (e && e.scale) {
                    const t = e.scale || 1;
                    if ("bigint" == typeof I) {
                        if (!Number.isInteger(t)) throw new TypeError(`Cannot apply fractional scale ${t} to bigint value. Scale must be an integer when formatting bigint.`);
                        I *= BigInt(t)
                    } else I *= t
                }
                v.push({
                    type: S.literal,
                    value: f.getNumberFormat(p, e).format(I)
                });
                continue
            }
            if (u(b)) {
                const {
                    children: e,
                    value: t
                } = b, r = y[t];
                if (!T(r)) throw new O(t, "function", d);
                let n = r(j(e, p, f, h, y, g).map(e => e.value));
                Array.isArray(n) || (n = [n]), v.push(...n.map(e => ({
                    type: "string" == typeof e ? S.literal : S.object,
                    value: e
                })))
            }
            if (c(b)) {
                const e = I,
                    t = (Object.prototype.hasOwnProperty.call(b.options, e) ? b.options[e] : void 0) || b.options.other;
                if (!t) throw new A(b.value, I, Object.keys(b.options), d);
                v.push(...j(t.value, p, f, h, y));
                continue
            }
            if (m(b)) {
                const e = `=${I}`;
                let t = Object.prototype.hasOwnProperty.call(b.options, e) ? b.options[e] : void 0;
                if (!t) {
                    if (!Intl.PluralRules) throw new N('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', w.MISSING_INTL_API, d);
                    const e = "bigint" == typeof I ? Number(I) : I,
                        r = f.getPluralRules(p, {
                            type: b.pluralType
                        }).select(e - (b.offset || 0));
                    t = (Object.prototype.hasOwnProperty.call(b.options, r) ? b.options[r] : void 0) || b.options.other
                }
                if (!t) throw new A(b.value, I, Object.keys(b.options), d);
                const r = "bigint" == typeof I ? Number(I) : I;
                v.push(...j(t.value, p, f, h, y, r - (b.offset || 0)));
                continue
            }
        }
    }
    return (b = v).length < 2 ? b : b.reduce((e, t) => {
        const r = e[e.length - 1];
        return r && r.type === S.literal && t.type === S.literal ? r.value += t.value : e.push(t), e
    }, []);
    var b
}

function D(e, t) {
    return t ? Object.keys(e).reduce((r, n) => {
        var s, o;
        return r[n] = (s = e[n], (o = t[n]) ? { ...s,
            ...o,
            ...Object.keys(s).reduce((e, t) => (e[t] = { ...s[t],
                ...o[t]
            }, e), {})
        } : s), r
    }, { ...e
    }) : e
}

function F(e) {
    return {
        create: () => ({
            get: t => e[t],
            set(t, r) {
                e[t] = r
            }
        })
    }
}
var P = (L = class e {
    constructor(t, r = e.defaultLocale, n, s) {
        if (this.formatterCache = {
                number: {},
                dateTime: {},
                pluralRules: {}
            }, this.format = e => {
                const t = this.formatToParts(e);
                if (1 === t.length) return t[0].value;
                const r = t.reduce((e, t) => (e.length && t.type === S.literal && "string" == typeof e[e.length - 1] ? e[e.length - 1] += t.value : e.push(t.value), e), []);
                return r.length <= 1 ? r[0] || "" : r
            }, this.formatToParts = e => j(this.ast, this.locales, this.formatters, this.formats, e, void 0, this.message), this.resolvedOptions = () => ({
                locale: this.resolvedLocale ? .toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0]
            }), this.getAst = () => this.ast, this.locales = r, this.resolvedLocale = e.resolveLocale(r), "string" == typeof t) {
            if (this.message = t, !e.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
            const { ...r
            } = s || {};
            this.ast = e.__parse(t, { ...r,
                locale: this.resolvedLocale
            })
        } else this.ast = t;
        if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
        this.formats = D(e.formats, n), this.formatters = s && s.formatters || function(e = {
            number: {},
            dateTime: {},
            pluralRules: {}
        }) {
            return {
                getNumberFormat: p((...e) => new Intl.NumberFormat(...e), {
                    cache: F(e.number),
                    strategy: I.variadic
                }),
                getDateTimeFormat: p((...e) => new Intl.DateTimeFormat(...e), {
                    cache: F(e.dateTime),
                    strategy: I.variadic
                }),
                getPluralRules: p((...e) => new Intl.PluralRules(...e), {
                    cache: F(e.pluralRules),
                    strategy: I.variadic
                })
            }
        }(this.formatterCache)
    }
    static get defaultLocale() {
        return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = (new Intl.NumberFormat).resolvedOptions().locale), e.memoizedDefaultLocale
    }
}, L.memoizedDefaultLocale = null, L.resolveLocale = e => {
    if (void 0 === Intl.Locale) return;
    const t = Intl.NumberFormat.supportedLocalesOf(e);
    return t.length > 0 ? new Intl.Locale(t[0]) : new Intl.Locale("string" == typeof e ? e : e[0])
}, L.__parse = e, L.formats = {
    number: {
        integer: {
            maximumFractionDigits: 0
        },
        currency: {
            style: "currency"
        },
        percent: {
            style: "percent"
        }
    },
    date: {
        short: {
            month: "numeric",
            day: "numeric",
            year: "2-digit"
        },
        medium: {
            month: "short",
            day: "numeric",
            year: "numeric"
        },
        long: {
            month: "long",
            day: "numeric",
            year: "numeric"
        },
        full: {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    },
    time: {
        short: {
            hour: "numeric",
            minute: "numeric"
        },
        medium: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        },
        long: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        },
        full: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        }
    }
}, L);
export {
    P as i
};