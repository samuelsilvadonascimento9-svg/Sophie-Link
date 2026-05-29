! function() {
    "use strict";
    var r, t, e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        n = {};

    function i() {
        if (t) return r;
        t = 1;
        var n = function(r) {
            return r && r.Math === Math && r
        };
        return r = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || n("object" == typeof r && r) || function() {
            return this
        }() || Function("return this")()
    }
    var o, u, a, f, c, s, l, h, v = {};

    function p() {
        return u ? o : (u = 1, o = function(r) {
            try {
                return !!r()
            } catch (r) {
                return !0
            }
        })
    }

    function d() {
        if (f) return a;
        f = 1;
        var r = p();
        return a = !r(function() {
            return 7 !== Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })
    }

    function g() {
        if (s) return c;
        s = 1;
        var r = p();
        return c = !r(function() {
            var r = function() {}.bind();
            return "function" != typeof r || r.hasOwnProperty("prototype")
        })
    }

    function m() {
        if (h) return l;
        h = 1;
        var r = g(),
            t = Function.prototype.call;
        return l = r ? t.bind(t) : function() {
            return t.apply(t, arguments)
        }, l
    }
    var y, b, w, S, P, O, R, x, E, k, L, j, A, U, C, I, T, F, B, q, _, H, $, z, D, M, N, W, G, Y, K, J, Q, X, V, Z, rr, tr, er, nr, ir, or = {};

    function ur() {
        if (y) return or;
        y = 1;
        var r = {}.propertyIsEnumerable,
            t = Object.getOwnPropertyDescriptor,
            e = t && !r.call({
                1: 2
            }, 1);
        return or.f = e ? function(r) {
            var e = t(this, r);
            return !!e && e.enumerable
        } : r, or
    }

    function ar() {
        return w ? b : (w = 1, b = function(r, t) {
            return {
                enumerable: !(1 & r),
                configurable: !(2 & r),
                writable: !(4 & r),
                value: t
            }
        })
    }

    function fr() {
        if (P) return S;
        P = 1;
        var r = g(),
            t = Function.prototype,
            e = t.call,
            n = r && t.bind.bind(e, e);
        return S = r ? n : function(r) {
            return function() {
                return e.apply(r, arguments)
            }
        }, S
    }

    function cr() {
        if (R) return O;
        R = 1;
        var r = fr(),
            t = r({}.toString),
            e = r("".slice);
        return O = function(r) {
            return e(t(r), 8, -1)
        }
    }

    function sr() {
        if (E) return x;
        E = 1;
        var r = fr(),
            t = p(),
            e = cr(),
            n = Object,
            i = r("".split);
        return x = t(function() {
            return !n("z").propertyIsEnumerable(0)
        }) ? function(r) {
            return "String" === e(r) ? i(r, "") : n(r)
        } : n
    }

    function lr() {
        return L ? k : (L = 1, k = function(r) {
            return null == r
        })
    }

    function hr() {
        if (A) return j;
        A = 1;
        var r = lr(),
            t = TypeError;
        return j = function(e) {
            if (r(e)) throw new t("Can't call method on " + e);
            return e
        }
    }

    function vr() {
        if (C) return U;
        C = 1;
        var r = sr(),
            t = hr();
        return U = function(e) {
            return r(t(e))
        }
    }

    function pr() {
        if (T) return I;
        T = 1;
        var r = "object" == typeof document && document.all;
        return I = void 0 === r && void 0 !== r ? function(t) {
            return "function" == typeof t || t === r
        } : function(r) {
            return "function" == typeof r
        }
    }

    function dr() {
        if (B) return F;
        B = 1;
        var r = pr();
        return F = function(t) {
            return "object" == typeof t ? null !== t : r(t)
        }
    }

    function gr() {
        if (_) return q;
        _ = 1;
        var r = i(),
            t = pr();
        return q = function(e, n) {
            return arguments.length < 2 ? (i = r[e], t(i) ? i : void 0) : r[e] && r[e][n];
            var i
        }, q
    }

    function mr() {
        if ($) return H;
        $ = 1;
        var r = fr();
        return H = r({}.isPrototypeOf)
    }

    function yr() {
        if (N) return M;
        N = 1;
        var r, t, e = i(),
            n = function() {
                if (D) return z;
                D = 1;
                var r = i().navigator,
                    t = r && r.userAgent;
                return z = t ? String(t) : ""
            }(),
            o = e.process,
            u = e.Deno,
            a = o && o.versions || u && u.version,
            f = a && a.v8;
        return f && (t = (r = f.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])), !t && n && (!(r = n.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = n.match(/Chrome\/(\d+)/)) && (t = +r[1]), M = t
    }

    function br() {
        if (G) return W;
        G = 1;
        var r = yr(),
            t = p(),
            e = i().String;
        return W = !!Object.getOwnPropertySymbols && !t(function() {
            var t = Symbol("symbol detection");
            return !e(t) || !(Object(t) instanceof Symbol) || !Symbol.sham && r && r < 41
        })
    }

    function wr() {
        if (K) return Y;
        K = 1;
        var r = br();
        return Y = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
    }

    function Sr() {
        if (Q) return J;
        Q = 1;
        var r = gr(),
            t = pr(),
            e = mr(),
            n = wr(),
            i = Object;
        return J = n ? function(r) {
            return "symbol" == typeof r
        } : function(n) {
            var o = r("Symbol");
            return t(o) && e(o.prototype, i(n))
        }
    }

    function Pr() {
        if (V) return X;
        V = 1;
        var r = String;
        return X = function(t) {
            try {
                return r(t)
            } catch (r) {
                return "Object"
            }
        }
    }

    function Or() {
        if (rr) return Z;
        rr = 1;
        var r = pr(),
            t = Pr(),
            e = TypeError;
        return Z = function(n) {
            if (r(n)) return n;
            throw new e(t(n) + " is not a function")
        }
    }

    function Rr() {
        if (er) return tr;
        er = 1;
        var r = Or(),
            t = lr();
        return tr = function(e, n) {
            var i = e[n];
            return t(i) ? void 0 : r(i)
        }
    }

    function xr() {
        if (ir) return nr;
        ir = 1;
        var r = m(),
            t = pr(),
            e = dr(),
            n = TypeError;
        return nr = function(i, o) {
            var u, a;
            if ("string" === o && t(u = i.toString) && !e(a = r(u, i))) return a;
            if (t(u = i.valueOf) && !e(a = r(u, i))) return a;
            if ("string" !== o && t(u = i.toString) && !e(a = r(u, i))) return a;
            throw new n("Can't convert object to primitive value")
        }
    }
    var Er, kr, Lr, jr, Ar, Ur, Cr, Ir, Tr, Fr, Br, qr, _r, Hr, $r, zr, Dr, Mr, Nr, Wr, Gr, Yr, Kr, Jr, Qr = {
        exports: {}
    };

    function Xr() {
        return kr ? Er : (kr = 1, Er = !1)
    }

    function Vr() {
        if (jr) return Lr;
        jr = 1;
        var r = i(),
            t = Object.defineProperty;
        return Lr = function(e, n) {
            try {
                t(r, e, {
                    value: n,
                    configurable: !0,
                    writable: !0
                })
            } catch (t) {
                r[e] = n
            }
            return n
        }
    }

    function Zr() {
        if (Ar) return Qr.exports;
        Ar = 1;
        var r = Xr(),
            t = i(),
            e = Vr(),
            n = "__core-js_shared__",
            o = Qr.exports = t[n] || e(n, {});
        return (o.versions || (o.versions = [])).push({
            version: "3.49.0",
            mode: r ? "pure" : "global",
            copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
            license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
            source: "https://github.com/zloirock/core-js"
        }), Qr.exports
    }

    function rt() {
        if (Cr) return Ur;
        Cr = 1;
        var r = Zr();
        return Ur = function(t, e) {
            return r[t] || (r[t] = e || {})
        }
    }

    function tt() {
        if (Tr) return Ir;
        Tr = 1;
        var r = hr(),
            t = Object;
        return Ir = function(e) {
            return t(r(e))
        }
    }

    function et() {
        if (Br) return Fr;
        Br = 1;
        var r = fr(),
            t = tt(),
            e = r({}.hasOwnProperty);
        return Fr = Object.hasOwn || function(r, n) {
            return e(t(r), n)
        }
    }

    function nt() {
        if (_r) return qr;
        _r = 1;
        var r = fr(),
            t = 0,
            e = Math.random(),
            n = r(1.1.toString);
        return qr = function(r) {
            return "Symbol(" + (void 0 === r ? "" : r) + ")_" + n(++t + e, 36)
        }
    }

    function it() {
        if ($r) return Hr;
        $r = 1;
        var r = i(),
            t = rt(),
            e = et(),
            n = nt(),
            o = br(),
            u = wr(),
            a = r.Symbol,
            f = t("wks"),
            c = u ? a.for || a : a && a.withoutSetter || n;
        return Hr = function(r) {
            return e(f, r) || (f[r] = o && e(a, r) ? a[r] : c("Symbol." + r)), f[r]
        }
    }

    function ot() {
        if (Dr) return zr;
        Dr = 1;
        var r = m(),
            t = dr(),
            e = Sr(),
            n = Rr(),
            i = xr(),
            o = it(),
            u = TypeError,
            a = o("toPrimitive");
        return zr = function(o, f) {
            if (!t(o) || e(o)) return o;
            var c, s = n(o, a);
            if (s) {
                if (void 0 === f && (f = "default"), c = r(s, o, f), !t(c) || e(c)) return c;
                throw new u("Can't convert object to primitive value")
            }
            return void 0 === f && (f = "number"), i(o, f)
        }
    }

    function ut() {
        if (Nr) return Mr;
        Nr = 1;
        var r = ot(),
            t = Sr();
        return Mr = function(e) {
            var n = r(e, "string");
            return t(n) ? n : n + ""
        }
    }

    function at() {
        if (Gr) return Wr;
        Gr = 1;
        var r = i(),
            t = dr(),
            e = r.document,
            n = t(e) && t(e.createElement);
        return Wr = function(r) {
            return n ? e.createElement(r) : {}
        }
    }

    function ft() {
        if (Kr) return Yr;
        Kr = 1;
        var r = d(),
            t = p(),
            e = at();
        return Yr = !r && !t(function() {
            return 7 !== Object.defineProperty(e("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }

    function ct() {
        if (Jr) return v;
        Jr = 1;
        var r = d(),
            t = m(),
            e = ur(),
            n = ar(),
            i = vr(),
            o = ut(),
            u = et(),
            a = ft(),
            f = Object.getOwnPropertyDescriptor;
        return v.f = r ? f : function(r, c) {
            if (r = i(r), c = o(c), a) try {
                return f(r, c)
            } catch (r) {}
            if (u(r, c)) return n(!t(e.f, r, c), r[c])
        }, v
    }
    var st, lt, ht, vt, pt, dt, gt, mt = {};

    function yt() {
        if (lt) return st;
        lt = 1;
        var r = d(),
            t = p();
        return st = r && t(function() {
            return 42 !== Object.defineProperty(function() {}, "prototype", {
                value: 42,
                writable: !1
            }).prototype
        })
    }

    function bt() {
        if (vt) return ht;
        vt = 1;
        var r = dr(),
            t = String,
            e = TypeError;
        return ht = function(n) {
            if (r(n)) return n;
            throw new e(t(n) + " is not an object")
        }
    }

    function wt() {
        if (pt) return mt;
        pt = 1;
        var r = d(),
            t = ft(),
            e = yt(),
            n = bt(),
            i = ut(),
            o = TypeError,
            u = Object.defineProperty,
            a = Object.getOwnPropertyDescriptor,
            f = "enumerable",
            c = "configurable",
            s = "writable";
        return mt.f = r ? e ? function(r, t, e) {
            if (n(r), t = i(t), n(e), "function" == typeof r && "prototype" === t && "value" in e && s in e && !e[s]) {
                var o = a(r, t);
                o && o[s] && (r[t] = e.value, e = {
                    configurable: c in e ? e[c] : o[c],
                    enumerable: f in e ? e[f] : o[f],
                    writable: !1
                })
            }
            return u(r, t, e)
        } : u : function(r, e, a) {
            if (n(r), e = i(e), n(a), t) try {
                return u(r, e, a)
            } catch (r) {}
            if ("get" in a || "set" in a) throw new o("Accessors not supported");
            return "value" in a && (r[e] = a.value), r
        }, mt
    }

    function St() {
        if (gt) return dt;
        gt = 1;
        var r = d(),
            t = wt(),
            e = ar();
        return dt = r ? function(r, n, i) {
            return t.f(r, n, e(1, i))
        } : function(r, t, e) {
            return r[t] = e, r
        }
    }
    var Pt, Ot, Rt, xt, Et, kt, Lt, jt, At, Ut, Ct, It, Tt, Ft, Bt, qt = {
        exports: {}
    };

    function _t() {
        if (Ot) return Pt;
        Ot = 1;
        var r = d(),
            t = et(),
            e = Function.prototype,
            n = r && Object.getOwnPropertyDescriptor,
            i = t(e, "name"),
            o = i && "something" === function() {}.name,
            u = i && (!r || r && n(e, "name").configurable);
        return Pt = {
            EXISTS: i,
            PROPER: o,
            CONFIGURABLE: u
        }
    }

    function Ht() {
        if (xt) return Rt;
        xt = 1;
        var r = fr(),
            t = pr(),
            e = Zr(),
            n = r(Function.toString);
        return t(e.inspectSource) || (e.inspectSource = function(r) {
            return n(r)
        }), Rt = e.inspectSource
    }

    function $t() {
        if (jt) return Lt;
        jt = 1;
        var r = rt(),
            t = nt(),
            e = r("keys");
        return Lt = function(r) {
            return e[r] || (e[r] = t(r))
        }
    }

    function zt() {
        return Ut ? At : (Ut = 1, At = {})
    }

    function Dt() {
        if (It) return Ct;
        It = 1;
        var r, t, e, n = function() {
                if (kt) return Et;
                kt = 1;
                var r = i(),
                    t = pr(),
                    e = r.WeakMap;
                return Et = t(e) && /native code/.test(String(e))
            }(),
            o = i(),
            u = dr(),
            a = St(),
            f = et(),
            c = Zr(),
            s = $t(),
            l = zt(),
            h = "Object already initialized",
            v = o.TypeError,
            p = o.WeakMap;
        if (n || c.state) {
            var d = c.state || (c.state = new p);
            d.get = d.get, d.has = d.has, d.set = d.set, r = function(r, t) {
                if (d.has(r)) throw new v(h);
                return t.facade = r, d.set(r, t), t
            }, t = function(r) {
                return d.get(r) || {}
            }, e = function(r) {
                return d.has(r)
            }
        } else {
            var g = s("state");
            l[g] = !0, r = function(r, t) {
                if (f(r, g)) throw new v(h);
                return t.facade = r, a(r, g, t), t
            }, t = function(r) {
                return f(r, g) ? r[g] : {}
            }, e = function(r) {
                return f(r, g)
            }
        }
        return Ct = {
            set: r,
            get: t,
            has: e,
            enforce: function(n) {
                return e(n) ? t(n) : r(n, {})
            },
            getterFor: function(r) {
                return function(e) {
                    var n;
                    if (!u(e) || (n = t(e)).type !== r) throw new v("Incompatible receiver, " + r + " required");
                    return n
                }
            }
        }
    }

    function Mt() {
        if (Tt) return qt.exports;
        Tt = 1;
        var r = fr(),
            t = p(),
            e = pr(),
            n = et(),
            i = d(),
            o = _t().CONFIGURABLE,
            u = Ht(),
            a = Dt(),
            f = a.enforce,
            c = a.get,
            s = String,
            l = Object.defineProperty,
            h = r("".slice),
            v = r("".replace),
            g = r([].join),
            m = i && !t(function() {
                return 8 !== l(function() {}, "length", {
                    value: 8
                }).length
            }),
            y = String(String).split("String"),
            b = qt.exports = function(r, t, e) {
                "Symbol(" === h(s(t), 0, 7) && (t = "[" + v(s(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), e && e.getter && (t = "get " + t), e && e.setter && (t = "set " + t), (!n(r, "name") || o && r.name !== t) && (i ? l(r, "name", {
                    value: t,
                    configurable: !0
                }) : r.name = t), m && e && n(e, "arity") && r.length !== e.arity && l(r, "length", {
                    value: e.arity
                });
                try {
                    e && n(e, "constructor") && e.constructor ? i && l(r, "prototype", {
                        writable: !1
                    }) : r.prototype && (r.prototype = void 0)
                } catch (r) {}
                var u = f(r);
                return n(u, "source") || (u.source = g(y, "string" == typeof t ? t : "")), r
            };
        return Function.prototype.toString = b(function() {
            return e(this) && c(this).source || u(this)
        }, "toString"), qt.exports
    }

    function Nt() {
        if (Bt) return Ft;
        Bt = 1;
        var r = pr(),
            t = wt(),
            e = Mt(),
            n = Vr();
        return Ft = function(i, o, u, a) {
            a || (a = {});
            var f = a.enumerable,
                c = void 0 !== a.name ? a.name : o;
            if (r(u) && e(u, c, a), a.global) f ? i[o] = u : n(o, u);
            else {
                try {
                    a.unsafe ? i[o] && (f = !0) : delete i[o]
                } catch (r) {}
                f ? i[o] = u : t.f(i, o, {
                    value: u,
                    enumerable: !1,
                    configurable: !a.nonConfigurable,
                    writable: !a.nonWritable
                })
            }
            return i
        }
    }
    var Wt, Gt, Yt, Kt, Jt, Qt, Xt, Vt, Zt, re, te, ee, ne, ie, oe, ue, ae, fe = {};

    function ce() {
        if (Kt) return Yt;
        Kt = 1;
        var r = function() {
            if (Gt) return Wt;
            Gt = 1;
            var r = Math.ceil,
                t = Math.floor;
            return Wt = Math.trunc || function(e) {
                var n = +e;
                return (n > 0 ? t : r)(n)
            }
        }();
        return Yt = function(t) {
            var e = +t;
            return e != e || 0 === e ? 0 : r(e)
        }
    }

    function se() {
        if (Qt) return Jt;
        Qt = 1;
        var r = ce(),
            t = Math.max,
            e = Math.min;
        return Jt = function(n, i) {
            var o = r(n);
            return o < 0 ? t(o + i, 0) : e(o, i)
        }
    }

    function le() {
        if (Vt) return Xt;
        Vt = 1;
        var r = ce(),
            t = Math.min;
        return Xt = function(e) {
            var n = r(e);
            return n > 0 ? t(n, 9007199254740991) : 0
        }
    }

    function he() {
        if (re) return Zt;
        re = 1;
        var r = le();
        return Zt = function(t) {
            return r(t.length)
        }
    }

    function ve() {
        if (ie) return ne;
        ie = 1;
        var r = fr(),
            t = et(),
            e = vr(),
            n = function() {
                if (ee) return te;
                ee = 1;
                var r = vr(),
                    t = se(),
                    e = he(),
                    n = function(n) {
                        return function(i, o, u) {
                            var a = r(i),
                                f = e(a);
                            if (0 === f) return !n && -1;
                            var c, s = t(u, f);
                            if (n && o != o) {
                                for (; f > s;)
                                    if ((c = a[s++]) != c) return !0
                            } else
                                for (; f > s; s++)
                                    if ((n || s in a) && a[s] === o) return n || s || 0;
                            return !n && -1
                        }
                    };
                return te = {
                    includes: n(!0),
                    indexOf: n(!1)
                }
            }().indexOf,
            i = zt(),
            o = r([].push);
        return ne = function(r, u) {
            var a, f = e(r),
                c = 0,
                s = [];
            for (a in f) !t(i, a) && t(f, a) && o(s, a);
            for (; u.length > c;) t(f, a = u[c++]) && (~n(s, a) || o(s, a));
            return s
        }
    }

    function pe() {
        return ue ? oe : (ue = 1, oe = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"])
    }
    var de, ge, me, ye, be, we, Se, Pe, Oe, Re = {};

    function xe() {
        return de || (de = 1, Re.f = Object.getOwnPropertySymbols), Re
    }

    function Ee() {
        if (me) return ge;
        me = 1;
        var r = gr(),
            t = fr(),
            e = function() {
                if (ae) return fe;
                ae = 1;
                var r = ve(),
                    t = pe().concat("length", "prototype");
                return fe.f = Object.getOwnPropertyNames || function(e) {
                    return r(e, t)
                }, fe
            }(),
            n = xe(),
            i = bt(),
            o = t([].concat);
        return ge = r("Reflect", "ownKeys") || function(r) {
            var t = e.f(i(r)),
                u = n.f;
            return u ? o(t, u(r)) : t
        }
    }

    function ke() {
        if (be) return ye;
        be = 1;
        var r = et(),
            t = Ee(),
            e = ct(),
            n = wt();
        return ye = function(i, o, u) {
            for (var a = t(o), f = n.f, c = e.f, s = 0; s < a.length; s++) {
                var l = a[s];
                r(i, l) || u && r(u, l) || f(i, l, c(o, l))
            }
        }
    }

    function Le() {
        if (Oe) return Pe;
        Oe = 1;
        var r = i(),
            t = ct().f,
            e = St(),
            n = Nt(),
            o = Vr(),
            u = ke(),
            a = function() {
                if (Se) return we;
                Se = 1;
                var r = p(),
                    t = pr(),
                    e = /#|\.prototype\./,
                    n = function(e, n) {
                        var f = o[i(e)];
                        return f === a || f !== u && (t(n) ? r(n) : !!n)
                    },
                    i = n.normalize = function(r) {
                        return String(r).replace(e, ".").toLowerCase()
                    },
                    o = n.data = {},
                    u = n.NATIVE = "N",
                    a = n.POLYFILL = "P";
                return we = n
            }();
        return Pe = function(i, f) {
            var c, s, l, h, v, p = i.target,
                d = i.global,
                g = i.stat;
            if (c = d ? r : g ? r[p] || o(p, {}) : r[p] && r[p].prototype)
                for (s in f) {
                    if (h = f[s], l = i.dontCallGetSet ? (v = t(c, s)) && v.value : c[s], !a(d ? s : p + (g ? "." : "#") + s, i.forced) && void 0 !== l) {
                        if (typeof h == typeof l) continue;
                        u(h, l)
                    }(i.sham || l && l.sham) && e(h, "sham", !0), n(c, s, h, i)
                }
        }
    }
    var je, Ae, Ue, Ce, Ie, Te, Fe, Be, qe, _e, He, $e, ze, De, Me, Ne, We, Ge, Ye = {};

    function Ke() {
        if (Ae) return je;
        Ae = 1;
        var r = ve(),
            t = pe();
        return je = Object.keys || function(e) {
            return r(e, t)
        }
    }

    function Je() {
        if (Ie) return Ce;
        Ie = 1;
        var r = gr();
        return Ce = r("document", "documentElement")
    }

    function Qe() {
        if (Fe) return Te;
        Fe = 1;
        var r, t = bt(),
            e = function() {
                if (Ue) return Ye;
                Ue = 1;
                var r = d(),
                    t = yt(),
                    e = wt(),
                    n = bt(),
                    i = vr(),
                    o = Ke();
                return Ye.f = r && !t ? Object.defineProperties : function(r, t) {
                    n(r);
                    for (var u, a = i(t), f = o(t), c = f.length, s = 0; c > s;) e.f(r, u = f[s++], a[u]);
                    return r
                }, Ye
            }(),
            n = pe(),
            i = zt(),
            o = Je(),
            u = at(),
            a = $t(),
            f = "prototype",
            c = "script",
            s = a("IE_PROTO"),
            l = function() {},
            h = function(r) {
                return "<" + c + ">" + r + "</" + c + ">"
            },
            v = function(r) {
                r.write(h("")), r.close();
                var t = r.parentWindow.Object;
                return r = null, t
            },
            p = function() {
                try {
                    r = new ActiveXObject("htmlfile")
                } catch (r) {}
                var t, e, i;
                p = "undefined" != typeof document ? document.domain && r ? v(r) : (e = u("iframe"), i = "java" + c + ":", e.style.display = "none", o.appendChild(e), e.src = String(i), (t = e.contentWindow.document).open(), t.write(h("document.F=Object")), t.close(), t.F) : v(r);
                for (var a = n.length; a--;) delete p[f][n[a]];
                return p()
            };
        return i[s] = !0, Te = Object.create || function(r, n) {
            var i;
            return null !== r ? (l[f] = t(r), i = new l, l[f] = null, i[s] = r) : i = p(), void 0 === n ? i : e.f(i, n)
        }
    }

    function Xe() {
        if (qe) return Be;
        qe = 1;
        var r = it(),
            t = Qe(),
            e = wt().f,
            n = r("unscopables"),
            i = Array.prototype;
        return void 0 === i[n] && e(i, n, {
            configurable: !0,
            value: t(null)
        }), Be = function(r) {
            i[n][r] = !0
        }
    }

    function Ve() {
        if ($e) return He;
        $e = 1;
        var r = i(),
            t = fr();
        return He = function(e, n) {
            return t(r[e].prototype[n])
        }
    }

    function Ze() {
        if (De) return ze;
        De = 1,
            function() {
                if (_e) return n;
                _e = 1;
                var r = Le(),
                    t = tt(),
                    e = he(),
                    i = ce(),
                    o = Xe();
                r({
                    target: "Array",
                    proto: !0
                }, {
                    at: function(r) {
                        var n = t(this),
                            o = e(n),
                            u = i(r),
                            a = u >= 0 ? u : o + u;
                        return a < 0 || a >= o ? void 0 : n[a]
                    }
                }), o("at")
            }();
        var r = Ve();
        return ze = r("Array", "at")
    }! function() {
        if (Ge) return We;
        Ge = 1;
        var r = function() {
            if (Ne) return Me;
            Ne = 1;
            var r = Ze();
            return Me = r
        }();
        We = r
    }();
    var rn, tn, en, nn, on, un, an, fn, cn, sn, ln, hn, vn, pn, dn, gn, mn, yn = {};

    function bn() {
        if (nn) return en;
        nn = 1;
        var r = function() {
                if (tn) return rn;
                tn = 1;
                var r = {};
                return r[it()("toStringTag")] = "z", rn = "[object z]" === String(r)
            }(),
            t = pr(),
            e = cr(),
            n = it()("toStringTag"),
            i = Object,
            o = "Arguments" === e(function() {
                return arguments
            }());
        return en = r ? e : function(r) {
            var u, a, f;
            return void 0 === r ? "Undefined" : null === r ? "Null" : "string" == typeof(a = function(r, t) {
                try {
                    return r[t]
                } catch (r) {}
            }(u = i(r), n)) ? a : o ? e(u) : "Object" === (f = e(u)) && t(u.callee) ? "Arguments" : f
        }
    }

    function wn() {
        if (un) return on;
        un = 1;
        var r = bn(),
            t = String;
        return on = function(e) {
            if ("Symbol" === r(e)) throw new TypeError("Cannot convert a Symbol value to a string");
            return t(e)
        }
    }

    function Sn() {
        if (fn) return an;
        fn = 1;
        var r = bt();
        return an = function() {
            var t = r(this),
                e = "";
            return t.hasIndices && (e += "d"), t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.dotAll && (e += "s"), t.unicode && (e += "u"), t.unicodeSets && (e += "v"), t.sticky && (e += "y"), e
        }
    }

    function Pn() {
        if (gn) return dn;
        gn = 1;
        var r, t, e = m(),
            n = fr(),
            o = wn(),
            u = Sn(),
            a = function() {
                if (sn) return cn;
                sn = 1;
                var r = p(),
                    t = i().RegExp,
                    e = r(function() {
                        var r = t("a", "y");
                        return r.lastIndex = 2, null !== r.exec("abcd")
                    }),
                    n = e || r(function() {
                        return !t("a", "y").sticky
                    }),
                    o = e || r(function() {
                        var r = t("^r", "gy");
                        return r.lastIndex = 2, null !== r.exec("str")
                    });
                return cn = {
                    BROKEN_CARET: o,
                    MISSED_STICKY: n,
                    UNSUPPORTED_Y: e
                }
            }(),
            f = rt(),
            c = Qe(),
            s = Dt().get,
            l = function() {
                if (hn) return ln;
                hn = 1;
                var r = p(),
                    t = i().RegExp;
                return ln = r(function() {
                    var r = t(".", "s");
                    return !(r.dotAll && r.test("\n") && "s" === r.flags)
                })
            }(),
            h = function() {
                if (pn) return vn;
                pn = 1;
                var r = p(),
                    t = i().RegExp;
                return vn = r(function() {
                    var r = t("(?<a>b)", "g");
                    return "b" !== r.exec("b").groups.a || "bc" !== "b".replace(r, "$<a>c")
                })
            }(),
            v = f("native-string-replace", String.prototype.replace),
            d = RegExp.prototype.exec,
            g = d,
            y = n("".charAt),
            b = n("".indexOf),
            w = n("".replace),
            S = n("".slice),
            P = (t = /b*/g, e(d, r = /a/, "a"), e(d, t, "a"), 0 !== r.lastIndex || 0 !== t.lastIndex),
            O = a.BROKEN_CARET,
            R = void 0 !== /()??/.exec("")[1],
            x = function(r, t) {
                for (var e = r.groups = c(null), n = 0; n < t.length; n++) {
                    var i = t[n];
                    e[i[0]] = r[i[1]]
                }
            };
        return (P || R || O || l || h) && (g = function(r) {
            var t, n, i, a = this,
                f = s(a),
                c = o(r),
                l = f.raw;
            if (l) return l.lastIndex = a.lastIndex, t = e(g, l, c), a.lastIndex = l.lastIndex, t && f.groups && x(t, f.groups), t;
            var h = f.groups,
                p = O && a.sticky,
                m = e(u, a),
                E = a.source,
                k = 0,
                L = c;
            if (p) {
                m = w(m, "y", ""), -1 === b(m, "g") && (m += "g"), L = S(c, a.lastIndex);
                var j = a.lastIndex > 0 && y(c, a.lastIndex - 1);
                a.lastIndex > 0 && (!a.multiline || a.multiline && "\n" !== j && "\r" !== j && "\u2028" !== j && "\u2029" !== j) && (E = "(?: (?:" + E + "))", L = " " + L, k++), n = new RegExp("^(?:" + E + ")", m)
            }
            R && (n = new RegExp("^" + E + "$(?!\\s)", m)), P && (i = a.lastIndex);
            var A = e(d, p ? n : a, L);
            return p ? A ? (A.input = c, A[0] = S(A[0], k), A.index = a.lastIndex, a.lastIndex += A[0].length) : a.lastIndex = 0 : P && A && (a.lastIndex = a.global ? A.index + A[0].length : i), R && A && A.length > 1 && e(v, A[0], n, function() {
                for (var r = 1; r < arguments.length - 2; r++) void 0 === arguments[r] && (A[r] = void 0)
            }), A && h && x(A, h), A
        }), dn = g
    }

    function On() {
        if (mn) return yn;
        mn = 1;
        var r = Le(),
            t = Pn();
        return r({
            target: "RegExp",
            proto: !0,
            forced: /./.exec !== t
        }, {
            exec: t
        }), yn
    }
    var Rn, xn, En, kn, Ln, jn, An, Un, Cn, In, Tn, Fn, Bn, qn, _n, Hn, $n, zn = {};

    function Dn() {
        if (jn) return Ln;
        jn = 1;
        var r = fr(),
            t = ce(),
            e = wn(),
            n = hr(),
            i = r("".charAt),
            o = r("".charCodeAt),
            u = r("".slice),
            a = function(r) {
                return function(a, f) {
                    var c, s, l = e(n(a)),
                        h = t(f),
                        v = l.length;
                    return h < 0 || h >= v ? r ? "" : void 0 : (c = o(l, h)) < 55296 || c > 56319 || h + 1 === v || (s = o(l, h + 1)) < 56320 || s > 57343 ? r ? i(l, h) : c : r ? u(l, h, h + 2) : s - 56320 + (c - 55296 << 10) + 65536
                }
            };
        return Ln = {
            codeAt: a(!1),
            charAt: a(!0)
        }
    }

    function Mn() {
        if (Un) return An;
        Un = 1;
        var r = Dn().charAt;
        return An = function(t, e, n) {
            return e + (n && r(t, e).length || 1)
        }
    }

    function Nn() {
        if (In) return Cn;
        In = 1;
        var r = fr(),
            t = tt(),
            e = Math.floor,
            n = r("".charAt),
            i = r("".replace),
            o = r("".slice),
            u = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
            a = /\$([$&'`]|\d{1,2})/g;
        return Cn = function(r, f, c, s, l, h) {
            var v = c + r.length,
                p = s.length,
                d = a;
            return void 0 !== l && (l = t(l), d = u), i(h, d, function(t, i) {
                var u;
                switch (n(i, 0)) {
                    case "$":
                        return "$";
                    case "&":
                        return r;
                    case "`":
                        return o(f, 0, c);
                    case "'":
                        return o(f, v);
                    case "<":
                        u = l[o(i, 1, -1)];
                        break;
                    default:
                        var a = +i;
                        if (0 === a) return t;
                        if (a > p) {
                            var h = e(a / 10);
                            return 0 === h ? t : h <= p ? void 0 === s[h - 1] ? n(i, 1) : s[h - 1] + n(i, 1) : t
                        }
                        u = s[a - 1]
                }
                return void 0 === u ? "" : u
            })
        }
    }

    function Wn() {
        if (qn) return Bn;
        qn = 1;
        var r = m(),
            t = et(),
            e = mr(),
            n = function() {
                if (Fn) return Tn;
                Fn = 1;
                var r = i(),
                    t = p(),
                    e = r.RegExp,
                    n = !t(function() {
                        var r = !0;
                        try {
                            e(".", "d")
                        } catch (t) {
                            r = !1
                        }
                        var t = {},
                            n = "",
                            i = r ? "dgimsy" : "gimsy",
                            o = function(r, e) {
                                Object.defineProperty(t, r, {
                                    get: function() {
                                        return n += e, !0
                                    }
                                })
                            },
                            u = {
                                dotAll: "s",
                                global: "g",
                                ignoreCase: "i",
                                multiline: "m",
                                sticky: "y"
                            };
                        for (var a in r && (u.hasIndices = "d"), u) o(a, u[a]);
                        return Object.getOwnPropertyDescriptor(e.prototype, "flags").get.call(t) !== i || n !== i
                    });
                return Tn = {
                    correct: n
                }
            }(),
            o = Sn(),
            u = RegExp.prototype;
        return Bn = n.correct ? function(r) {
            return r.flags
        } : function(i) {
            return n.correct || !e(u, i) || t(i, "flags") ? i.flags : r(o, i)
        }
    }

    function Gn() {
        if ($n) return zn;
        $n = 1;
        var r = function() {
                if (xn) return Rn;
                xn = 1;
                var r = g(),
                    t = Function.prototype,
                    e = t.apply,
                    n = t.call;
                return Rn = "object" == typeof Reflect && Reflect.apply || (r ? n.bind(e) : function() {
                    return n.apply(e, arguments)
                }), Rn
            }(),
            t = m(),
            e = fr(),
            n = function() {
                if (kn) return En;
                kn = 1, On();
                var r = m(),
                    t = Nt(),
                    e = Pn(),
                    n = p(),
                    i = it(),
                    o = St(),
                    u = i("species"),
                    a = RegExp.prototype;
                return En = function(f, c, s, l) {
                    var h = i(f),
                        v = !n(function() {
                            var r = {};
                            return r[h] = function() {
                                return 7
                            }, 7 !== "" [f](r)
                        }),
                        p = v && !n(function() {
                            var r = !1,
                                t = /a/;
                            if ("split" === f) {
                                var e = {};
                                e[u] = function() {
                                    return t
                                }, (t = {
                                    constructor: e,
                                    flags: ""
                                })[h] = /./ [h]
                            }
                            return t.exec = function() {
                                return r = !0, null
                            }, t[h](""), !r
                        });
                    if (!v || !p || s) {
                        var d = /./ [h],
                            g = c(h, "" [f], function(t, n, i, o, u) {
                                var f = n.exec;
                                return f === e || f === a.exec ? v && !u ? {
                                    done: !0,
                                    value: r(d, n, i, o)
                                } : {
                                    done: !0,
                                    value: r(t, i, n, o)
                                } : {
                                    done: !1
                                }
                            });
                        t(String.prototype, f, g[0]), t(a, h, g[1])
                    }
                    l && o(a[h], "sham", !0)
                }
            }(),
            i = p(),
            o = bt(),
            u = pr(),
            a = dr(),
            f = ce(),
            c = le(),
            s = wn(),
            l = hr(),
            h = Mn(),
            v = Rr(),
            d = Nn(),
            y = Wn(),
            b = function() {
                if (Hn) return _n;
                Hn = 1;
                var r = m(),
                    t = bt(),
                    e = pr(),
                    n = cr(),
                    i = Pn(),
                    o = TypeError;
                return _n = function(u, a) {
                    var f = u.exec;
                    if (e(f)) {
                        var c = r(f, u, a);
                        return null !== c && t(c), c
                    }
                    if ("RegExp" === n(u)) return r(i, u, a);
                    throw new o("RegExp#exec called on incompatible receiver")
                }
            }(),
            w = it()("replace"),
            S = Math.max,
            P = Math.min,
            O = e([].concat),
            R = e([].push),
            x = e("".indexOf),
            E = e("".slice),
            k = function(r) {
                return void 0 === r ? r : String(r)
            },
            L = "$0" === "a".replace(/./, "$0"),
            j = !!/./ [w] && "" === /./ [w]("a", "$0");
        return n("replace", function(e, n, i) {
            var p = j ? "$" : "$0";
            return [function(r, e) {
                var i = l(this),
                    o = a(r) ? v(r, w) : void 0;
                return o ? t(o, r, i, e) : t(n, s(i), r, e)
            }, function(t, e) {
                var a = o(this),
                    l = s(t),
                    v = u(e);
                v || (e = s(e));
                var g = s(y(a));
                if ("string" == typeof e && !~x(e, p) && !~x(e, "$<") && !~x(g, "y")) {
                    var m = i(n, a, l, e);
                    if (m.done) return m.value
                }
                var w, L = !!~x(g, "g");
                L && (w = !!~x(g, "u") || !!~x(g, "v"), a.lastIndex = 0);
                for (var j, A = []; null !== (j = b(a, l)) && (R(A, j), L);) {
                    "" === s(j[0]) && (a.lastIndex = h(l, c(a.lastIndex), w))
                }
                for (var U = "", C = 0, I = 0; I < A.length; I++) {
                    for (var T, F = s((j = A[I])[0]), B = S(P(f(j.index), l.length), 0), q = [], _ = 1; _ < j.length; _++) R(q, k(j[_]));
                    var H = j.groups;
                    if (v) {
                        var $ = O([F], q, B, l);
                        void 0 !== H && R($, H), T = s(r(e, void 0, $))
                    } else T = d(F, l, B, q, H, e);
                    B >= C && (U += E(l, C, B) + T, C = B + F.length)
                }
                return U + E(l, C)
            }]
        }, !!i(function() {
            var r = /./;
            return r.exec = function() {
                var r = [];
                return r.groups = {
                    a: "7"
                }, r
            }, "7" !== "".replace(r, "$<a>")
        }) || !L || j), zn
    }
    var Yn, Kn, Jn, Qn, Xn, Vn, Zn, ri, ti, ei = {};

    function ni() {
        if (Jn) return ei;
        Jn = 1;
        var r = Le(),
            t = m(),
            e = fr(),
            n = hr(),
            i = pr(),
            o = dr(),
            u = function() {
                if (Kn) return Yn;
                Kn = 1;
                var r = dr(),
                    t = cr(),
                    e = it()("match");
                return Yn = function(n) {
                    var i;
                    return r(n) && (void 0 !== (i = n[e]) ? !!i : "RegExp" === t(n))
                }
            }(),
            a = wn(),
            f = Rr(),
            c = Wn(),
            s = Nn(),
            l = it(),
            h = Xr(),
            v = l("replace"),
            p = TypeError,
            d = e("".indexOf),
            g = e("".replace),
            y = e("".slice),
            b = Math.max;
        return r({
            target: "String",
            proto: !0
        }, {
            replaceAll: function(r, e) {
                var l, m, w, S, P, O, R, x, E, k, L = n(this),
                    j = 0,
                    A = "";
                if (o(r)) {
                    if ((l = u(r)) && (m = a(n(c(r))), !~d(m, "g"))) throw new p("`.replaceAll` does not allow non-global regexes");
                    if (w = f(r, v)) return t(w, r, L, e);
                    if (h && l) return g(a(L), r, e)
                }
                for (S = a(L), P = a(r), (O = i(e)) || (e = a(e)), R = P.length, x = b(1, R), E = d(S, P); - 1 !== E;) k = O ? a(e(P, E, S)) : s(P, S, E, [], void 0, e), A += y(S, j, E) + k, j = E + R, E = E + x > S.length ? -1 : d(S, P, E + x);
                return j < S.length && (A += y(S, j)), A
            }
        }), ei
    }

    function ii() {
        if (Zn) return Vn;
        Zn = 1;
        var r = function() {
            if (Xn) return Qn;
            Xn = 1, On(), Gn(), ni();
            var r = Ve();
            return Qn = r("String", "replaceAll")
        }();
        return Vn = r
    }! function() {
        if (ti) return ri;
        ti = 1;
        var r = ii();
        ri = r
    }();
    var oi, ui, ai, fi, ci, si, li, hi, vi, pi, di, gi, mi, yi, bi, wi, Si, Pi, Oi, Ri, xi, Ei, ki, Li, ji, Ai, Ui, Ci, Ii, Ti, Fi, Bi, qi, _i, Hi, $i, zi, Di, Mi, Ni, Wi, Gi, Yi, Ki, Ji, Qi, Xi, Vi, Zi, ro, to, eo, no, io, oo, uo, ao, fo, co, so, lo, ho, vo, po, go, mo = {},
        yo = {},
        bo = {};

    function wo() {
        if (fi) return ai;
        fi = 1;
        var r = et(),
            t = pr(),
            e = tt(),
            n = $t(),
            i = function() {
                if (ui) return oi;
                ui = 1;
                var r = p();
                return oi = !r(function() {
                    function r() {}
                    return r.prototype.constructor = null, Object.getPrototypeOf(new r) !== r.prototype
                })
            }(),
            o = n("IE_PROTO"),
            u = Object,
            a = u.prototype;
        return ai = i ? u.getPrototypeOf : function(n) {
            var i = e(n);
            if (r(i, o)) return i[o];
            var f = i.constructor;
            return t(f) && i instanceof f ? f.prototype : i instanceof u ? a : null
        }
    }

    function So() {
        if (si) return ci;
        si = 1;
        var r, t, e, n = p(),
            i = pr(),
            o = dr(),
            u = Qe(),
            a = wo(),
            f = Nt(),
            c = it(),
            s = Xr(),
            l = c("iterator"),
            h = !1;
        return [].keys && ("next" in (e = [].keys()) ? (t = a(a(e))) !== Object.prototype && (r = t) : h = !0), !o(r) || n(function() {
            var t = {};
            return r[l].call(t) !== t
        }) ? r = {} : s && (r = u(r)), i(r[l]) || f(r, l, function() {
            return this
        }), ci = {
            IteratorPrototype: r,
            BUGGY_SAFARI_ITERATORS: h
        }
    }

    function Po() {
        if (hi) return li;
        hi = 1;
        var r = wt().f,
            t = et(),
            e = it()("toStringTag");
        return li = function(n, i, o) {
            n && !o && (n = n.prototype), n && !t(n, e) && r(n, e, {
                configurable: !0,
                value: i
            })
        }
    }

    function Oo() {
        return pi ? vi : (pi = 1, vi = {})
    }

    function Ro() {
        if (gi) return di;
        gi = 1;
        var r = So().IteratorPrototype,
            t = Qe(),
            e = ar(),
            n = Po(),
            i = Oo(),
            o = function() {
                return this
            };
        return di = function(u, a, f, c) {
            var s = a + " Iterator";
            return u.prototype = t(r, {
                next: e(+!c, f)
            }), n(u, s, !1, !0), i[s] = o, u
        }
    }

    function xo() {
        if (wi) return bi;
        wi = 1;
        var r = dr();
        return bi = function(t) {
            return r(t) || null === t
        }
    }

    function Eo() {
        if (Pi) return Si;
        Pi = 1;
        var r = xo(),
            t = String,
            e = TypeError;
        return Si = function(n) {
            if (r(n)) return n;
            throw new e("Can't set " + t(n) + " as a prototype")
        }
    }

    function ko() {
        if (Ri) return Oi;
        Ri = 1;
        var r = function() {
                if (yi) return mi;
                yi = 1;
                var r = fr(),
                    t = Or();
                return mi = function(e, n, i) {
                    try {
                        return r(t(Object.getOwnPropertyDescriptor(e, n)[i]))
                    } catch (r) {}
                }
            }(),
            t = dr(),
            e = hr(),
            n = Eo();
        return Oi = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var i, o = !1,
                u = {};
            try {
                (i = r(Object.prototype, "__proto__", "set"))(u, []), o = u instanceof Array
            } catch (r) {}
            return function(r, u) {
                return e(r), n(u), t(r) ? (o ? i(r, u) : r.__proto__ = u, r) : r
            }
        }() : void 0)
    }

    function Lo() {
        if (Ei) return xi;
        Ei = 1;
        var r = Le(),
            t = m(),
            e = Xr(),
            n = _t(),
            i = pr(),
            o = Ro(),
            u = wo(),
            a = ko(),
            f = Po(),
            c = St(),
            s = Nt(),
            l = it(),
            h = Oo(),
            v = So(),
            p = n.PROPER,
            d = n.CONFIGURABLE,
            g = v.IteratorPrototype,
            y = v.BUGGY_SAFARI_ITERATORS,
            b = l("iterator"),
            w = "keys",
            S = "values",
            P = "entries",
            O = function() {
                return this
            };
        return xi = function(n, l, v, m, R, x, E) {
            o(v, l, m);
            var k, L, j, A = function(r) {
                    if (r === R && F) return F;
                    if (!y && r && r in I) return I[r];
                    switch (r) {
                        case w:
                        case S:
                        case P:
                            return function() {
                                return new v(this, r)
                            }
                    }
                    return function() {
                        return new v(this)
                    }
                },
                U = l + " Iterator",
                C = !1,
                I = n.prototype,
                T = I[b] || I["@@iterator"] || R && I[R],
                F = !y && T || A(R),
                B = "Array" === l && I.entries || T;
            if (B && (k = u(B.call(new n))) !== Object.prototype && k.next && (e || u(k) === g || (a ? a(k, g) : i(k[b]) || s(k, b, O)), f(k, U, !0, !0), e && (h[U] = O)), p && R === S && T && T.name !== S && (!e && d ? c(I, "name", S) : (C = !0, F = function() {
                    return t(T, this)
                })), R)
                if (L = {
                        values: A(S),
                        keys: x ? F : A(w),
                        entries: A(P)
                    }, E)
                    for (j in L)(y || C || !(j in I)) && s(I, j, L[j]);
                else r({
                    target: l,
                    proto: !0,
                    forced: y || C
                }, L);
            return e && !E || I[b] === F || s(I, b, F, {
                name: R
            }), h[l] = F, L
        }
    }

    function jo() {
        return Li ? ki : (Li = 1, ki = function(r, t) {
            return {
                value: r,
                done: t
            }
        })
    }

    function Ao() {
        if (Ui) return Ai;
        Ui = 1;
        var r = p(),
            t = it(),
            e = d(),
            n = Xr(),
            i = t("iterator");
        return Ai = !r(function() {
            var r = new URL("b?a=1&b=2&c=3", "https://a"),
                t = r.searchParams,
                o = new URLSearchParams("a=1&a=2&b=3"),
                u = "";
            return r.pathname = "c%20d", t.forEach(function(r, e) {
                t.delete("b"), u += e + r
            }), o.delete("a", 2), o.delete("b", void 0), n && (!r.toJSON || !o.has("a", 1) || o.has("a", 2) || !o.has("a", void 0) || o.has("b")) || !t.size && (n || !e) || !t.sort || "https://a/c%20d?a=1&c=3" !== r.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[i] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("https://тест").host || "#%D0%B1" !== new URL("https://a#б").hash || "a1c3" !== u || "x" !== new URL("https://x", void 0).host
        })
    }

    function Uo() {
        if (Fi) return Ti;
        Fi = 1;
        var r = function() {
                if (Ii) return Ci;
                Ii = 1;
                var r = cr(),
                    t = fr();
                return Ci = function(e) {
                    if ("Function" === r(e)) return t(e)
                }
            }(),
            t = Or(),
            e = g(),
            n = r(r.bind);
        return Ti = function(r, i) {
            return t(r), void 0 === i ? r : e ? n(r, i) : function() {
                return r.apply(i, arguments)
            }
        }, Ti
    }

    function Co() {
        if (qi) return Bi;
        qi = 1;
        var r = Mt(),
            t = wt();
        return Bi = function(e, n, i) {
            return i.get && r(i.get, n, {
                getter: !0
            }), i.set && r(i.set, n, {
                setter: !0
            }), t.f(e, n, i)
        }
    }

    function Io() {
        if (Hi) return _i;
        Hi = 1;
        var r = mr(),
            t = TypeError;
        return _i = function(e, n) {
            if (r(n, e)) return e;
            throw new t("Incorrect invocation")
        }
    }

    function To() {
        if (Mi) return Di;
        Mi = 1;
        var r = m(),
            t = bt(),
            e = Rr();
        return Di = function(n, i, o) {
            var u, a;
            t(n);
            try {
                if (!(u = e(n, "return"))) {
                    if ("throw" === i) throw o;
                    return o
                }
                u = r(u, n)
            } catch (r) {
                a = !0, u = r
            }
            if ("throw" === i) throw o;
            if (a) throw u;
            return t(u), o
        }
    }

    function Fo() {
        if (Wi) return Ni;
        Wi = 1;
        var r = bt(),
            t = To();
        return Ni = function(e, n, i, o) {
            try {
                return o ? n(r(i)[0], i[1]) : n(i)
            } catch (r) {
                t(e, "throw", r)
            }
        }
    }

    function Bo() {
        if (Yi) return Gi;
        Yi = 1;
        var r = it(),
            t = Oo(),
            e = r("iterator"),
            n = Array.prototype;
        return Gi = function(r) {
            return void 0 !== r && (t.Array === r || n[e] === r)
        }
    }

    function qo() {
        if (Ji) return Ki;
        Ji = 1;
        var r = fr(),
            t = p(),
            e = pr(),
            n = bn(),
            i = gr(),
            o = Ht(),
            u = function() {},
            a = i("Reflect", "construct"),
            f = /^\s*(?:class|function)\b/,
            c = r(f.exec),
            s = !f.test(u),
            l = function(r) {
                if (!e(r)) return !1;
                try {
                    return a(u, [], r), !0
                } catch (r) {
                    return !1
                }
            },
            h = function(r) {
                if (!e(r)) return !1;
                switch (n(r)) {
                    case "AsyncFunction":
                    case "GeneratorFunction":
                    case "AsyncGeneratorFunction":
                        return !1
                }
                try {
                    return s || !!c(f, o(r))
                } catch (r) {
                    return !0
                }
            };
        return h.sham = !0, Ki = !a || t(function() {
            var r;
            return l(l.call) || !l(Object) || !l(function() {
                r = !0
            }) || r
        }) ? h : l
    }

    function _o() {
        if (Xi) return Qi;
        Xi = 1;
        var r = d(),
            t = wt(),
            e = ar();
        return Qi = function(n, i, o) {
            r ? t.f(n, i, e(0, o)) : n[i] = o
        }
    }

    function Ho() {
        if (Zi) return Vi;
        Zi = 1;
        var r = cr();
        return Vi = Array.isArray || function(t) {
            return "Array" === r(t)
        }
    }

    function $o() {
        if (no) return eo;
        no = 1;
        var r = bn(),
            t = Rr(),
            e = lr(),
            n = Oo(),
            i = it()("iterator");
        return eo = function(o) {
            if (!e(o)) return t(o, i) || t(o, "@@iterator") || n[r(o)]
        }
    }

    function zo() {
        if (oo) return io;
        oo = 1;
        var r = m(),
            t = Or(),
            e = bt(),
            n = Pr(),
            i = $o(),
            o = TypeError;
        return io = function(u, a) {
            var f = arguments.length < 2 ? i(u) : a;
            if (t(f)) return e(r(f, u));
            throw new o(n(u) + " is not iterable")
        }, io
    }

    function Do() {
        if (ao) return uo;
        ao = 1;
        var r = Uo(),
            t = m(),
            e = tt(),
            n = Fo(),
            i = Bo(),
            o = qo(),
            u = he(),
            a = _o(),
            f = function() {
                if (to) return ro;
                to = 1;
                var r = d(),
                    t = Ho(),
                    e = TypeError,
                    n = Object.getOwnPropertyDescriptor,
                    i = r && ! function() {
                        if (void 0 !== this) return !0;
                        try {
                            Object.defineProperty([], "length", {
                                writable: !1
                            }).length = 1
                        } catch (r) {
                            return r instanceof TypeError
                        }
                    }();
                return ro = i ? function(r, i) {
                    if (t(r) && !n(r, "length").writable) throw new e("Cannot set read only .length");
                    return r.length = i
                } : function(r, t) {
                    return r.length = t
                }
            }(),
            c = zo(),
            s = $o(),
            l = To(),
            h = Array;
        return uo = function(v) {
            var p = o(this),
                d = arguments.length,
                g = d > 1 ? arguments[1] : void 0,
                m = void 0 !== g;
            m && (g = r(g, d > 2 ? arguments[2] : void 0));
            var y, b, w, S, P, O, R = e(v),
                x = s(R),
                E = 0;
            if (!x || this === h && i(x))
                for (y = u(R), b = p ? new this(y) : h(y); y > E; E++) O = m ? g(R[E], E) : R[E], a(b, E, O);
            else
                for (b = p ? new this : [], P = (S = c(R, x)).next; !(w = t(P, S)).done; E++) {
                    O = m ? n(S, g, [w.value, E], !0) : w.value;
                    try {
                        a(b, E, O)
                    } catch (r) {
                        l(S, "throw", r)
                    }
                }
            return f(b, E), b
        }, uo
    }

    function Mo() {
        if (co) return fo;
        co = 1;
        var r = fr();
        return fo = r([].slice)
    }

    function No() {
        if (lo) return so;
        lo = 1;
        var r = fr(),
            t = 2147483647,
            e = /[^\0-\u007E]/,
            n = /[.\u3002\uFF0E\uFF61]/g,
            i = "Overflow: input needs wider integers to process",
            o = RangeError,
            u = r(n.exec),
            a = Math.floor,
            f = String.fromCharCode,
            c = r("".charCodeAt),
            s = r([].join),
            l = r([].push),
            h = r("".replace),
            v = r("".split),
            p = r("".toLowerCase),
            d = function(r) {
                return r + 22 + 75 * (r < 26)
            },
            g = function(r, t, e) {
                var n = 0;
                for (r = e ? a(r / 700) : r >> 1, r += a(r / t); r > 455;) r = a(r / 35), n += 36;
                return a(n + 36 * r / (r + 38))
            },
            m = function(r) {
                var e = [];
                r = function(r) {
                    for (var t = [], e = 0, n = r.length; e < n;) {
                        var i = c(r, e++);
                        if (i >= 55296 && i <= 56319 && e < n) {
                            var o = c(r, e++);
                            56320 == (64512 & o) ? l(t, ((1023 & i) << 10) + (1023 & o) + 65536) : (l(t, i), e--)
                        } else l(t, i)
                    }
                    return t
                }(r);
                var n, u, h = r.length,
                    v = 128,
                    p = 0,
                    m = 72;
                for (n = 0; n < r.length; n++)(u = r[n]) < 128 && l(e, f(u));
                var y = e.length,
                    b = y;
                for (y && l(e, "-"); b < h;) {
                    var w = t;
                    for (n = 0; n < r.length; n++)(u = r[n]) >= v && u < w && (w = u);
                    var S = b + 1;
                    if (w - v > a((t - p) / S)) throw new o(i);
                    for (p += (w - v) * S, v = w, n = 0; n < r.length; n++) {
                        if ((u = r[n]) < v && ++p > t) throw new o(i);
                        if (u === v) {
                            for (var P = p, O = 36;;) {
                                var R = O <= m ? 1 : O >= m + 26 ? 26 : O - m;
                                if (P < R) break;
                                var x = P - R,
                                    E = 36 - R;
                                l(e, f(d(R + x % E))), P = a(x / E), O += 36
                            }
                            l(e, f(d(P))), m = g(p, S, b === y), p = 0, b++
                        }
                    }
                    p++, v++
                }
                return s(e, "")
            };
        return so = function(r) {
            var t, i, o = [],
                a = v(h(p(r), n, "."), ".");
            for (t = 0; t < a.length; t++) i = a[t], l(o, u(e, i) ? "xn--" + m(i) : i);
            return s(o, ".")
        }
    }

    function Wo() {
        if (vo) return ho;
        vo = 1;
        var r = TypeError;
        return ho = function(t, e) {
            if (t < e) throw new r("Not enough arguments");
            return t
        }
    }
    var Go, Yo, Ko, Jo, Qo, Xo, Vo, Zo, ru, tu, eu, nu = {};

    function iu() {
        if (Ko) return Yo;
        Ko = 1;
        var r = i(),
            t = d(),
            e = Object.getOwnPropertyDescriptor;
        return Yo = function(n) {
            if (!t) return r[n];
            var i = e(r, n);
            return i && i.value
        }
    }

    function ou() {
        if (Qo) return Jo;
        Qo = 1;
        var r = Nt();
        return Jo = function(t, e, n) {
            for (var i in e) r(t, i, e[i], n);
            return t
        }
    }

    function uu() {
        if (Vo) return Xo;
        Vo = 1;
        var r = Mo(),
            t = Math.floor,
            e = function(n, i) {
                var o = n.length;
                if (o < 8)
                    for (var u, a, f = 1; f < o;) {
                        for (a = f, u = n[f]; a && i(n[a - 1], u) > 0;) n[a] = n[--a];
                        a !== f++ && (n[a] = u)
                    } else
                        for (var c = t(o / 2), s = e(r(n, 0, c), i), l = e(r(n, c), i), h = s.length, v = l.length, p = 0, d = 0; p < h || d < v;) n[p + d] = p < h && d < v ? i(s[p], l[d]) <= 0 ? s[p++] : l[d++] : p < h ? s[p++] : l[d++];
                return n
            };
        return Xo = e
    }

    function au() {
        if (ru) return Zo;
        ru = 1,
            function() {
                if (go) return po;
                go = 1;
                var r = vr(),
                    t = Xe(),
                    e = Oo(),
                    n = Dt(),
                    i = wt().f,
                    o = Lo(),
                    u = jo(),
                    a = Xr(),
                    f = d(),
                    c = "Array Iterator",
                    s = n.set,
                    l = n.getterFor(c);
                po = o(Array, "Array", function(t, e) {
                    s(this, {
                        type: c,
                        target: r(t),
                        index: 0,
                        kind: e
                    })
                }, function() {
                    var r = l(this),
                        t = r.target,
                        e = r.index++;
                    if (!t || e >= t.length) return r.target = null, u(void 0, !0);
                    switch (r.kind) {
                        case "keys":
                            return u(e, !1);
                        case "values":
                            return u(t[e], !1)
                    }
                    return u([e, t[e]], !1)
                }, "values");
                var h = e.Arguments = e.Array;
                if (t("keys"), t("values"), t("entries"), !a && f && "values" !== h.name) try {
                    i(h, "name", {
                        value: "values"
                    })
                } catch (r) {}
            }(),
            function() {
                if (Go) return nu;
                Go = 1;
                var r = Le(),
                    t = fr(),
                    e = se(),
                    n = RangeError,
                    i = String.fromCharCode,
                    o = String.fromCodePoint,
                    u = t([].join);
                r({
                    target: "String",
                    stat: !0,
                    arity: 1,
                    forced: !!o && 1 !== o.length
                }, {
                    fromCodePoint: function(r) {
                        for (var t, o = [], a = arguments.length, f = 0; a > f;) {
                            if (e(t = +arguments[f], 1114111) !== t) throw new n(t + " is not a valid code point");
                            o[f++] = t < 65536 ? i(t) : i(55296 + ((t -= 65536) >> 10), t % 1024 + 56320)
                        }
                        return u(o, "")
                    }
                })
            }();
        var r = Le(),
            t = i(),
            e = iu(),
            n = gr(),
            o = m(),
            u = fr(),
            a = d(),
            f = Ao(),
            c = Nt(),
            s = Co(),
            l = ou(),
            h = Po(),
            v = Ro(),
            p = Dt(),
            g = Io(),
            y = pr(),
            b = et(),
            w = Uo(),
            S = bn(),
            P = bt(),
            O = dr(),
            R = wn(),
            x = Qe(),
            E = ar(),
            k = zo(),
            L = $o(),
            j = jo(),
            A = Wo(),
            U = it(),
            C = uu(),
            I = U("iterator"),
            T = "URLSearchParams",
            F = T + "Iterator",
            B = p.set,
            q = p.getterFor(T),
            _ = p.getterFor(F),
            H = e("fetch"),
            $ = e("Request"),
            z = e("Headers"),
            D = $ && $.prototype,
            M = z && z.prototype,
            N = t.TypeError,
            W = t.encodeURIComponent,
            G = String.fromCharCode,
            Y = n("String", "fromCodePoint"),
            K = parseInt,
            J = u("".charAt),
            Q = u([].join),
            X = u([].push),
            V = u("".replace),
            Z = u([].shift),
            rr = u([].splice),
            tr = u("".split),
            er = u("".slice),
            nr = u(/./.exec),
            ir = /\+/g,
            or = /^[0-9a-f]+$/i,
            ur = function(r, t) {
                var e = er(r, t, t + 2);
                return nr(or, e) ? K(e, 16) : NaN
            },
            cr = function(r) {
                for (var t = 0, e = 128; e > 0 && 0 !== (r & e); e >>= 1) t++;
                return t
            },
            sr = function(r) {
                var t = null,
                    e = r.length;
                switch (e) {
                    case 1:
                        t = r[0];
                        break;
                    case 2:
                        t = (31 & r[0]) << 6 | 63 & r[1];
                        break;
                    case 3:
                        t = (15 & r[0]) << 12 | (63 & r[1]) << 6 | 63 & r[2];
                        break;
                    case 4:
                        t = (7 & r[0]) << 18 | (63 & r[1]) << 12 | (63 & r[2]) << 6 | 63 & r[3]
                }
                return null === t || t > 1114111 || t >= 55296 && t <= 57343 || t < (e > 3 ? 65536 : e > 2 ? 2048 : e > 1 ? 128 : 0) ? null : t
            },
            lr = function(r) {
                for (var t = (r = V(r, ir, " ")).length, e = "", n = 0; n < t;) {
                    var i = J(r, n);
                    if ("%" === i) {
                        if ("%" === J(r, n + 1) || n + 3 > t) {
                            e += "%", n++;
                            continue
                        }
                        var o = ur(r, n + 1);
                        if (o != o) {
                            e += i, n++;
                            continue
                        }
                        n += 2;
                        var u = cr(o);
                        if (0 === u) i = G(o);
                        else {
                            if (1 === u || u > 4) {
                                e += "�", n++;
                                continue
                            }
                            for (var a = [o], f = 1; f < u && !(++n + 3 > t || "%" !== J(r, n));) {
                                var c = ur(r, n + 1);
                                if (c != c || c > 191 || c < 128) break;
                                if (1 === f) {
                                    if (224 === o && c < 160) break;
                                    if (237 === o && c > 159) break;
                                    if (240 === o && c < 144) break;
                                    if (244 === o && c > 143) break
                                }
                                X(a, c), n += 2, f++
                            }
                            if (a.length !== u) {
                                e += "�";
                                continue
                            }
                            var s = sr(a);
                            if (null === s) {
                                for (var l = 0; l < u; l++) e += "�";
                                n++;
                                continue
                            }
                            i = Y(s)
                        }
                    }
                    e += i, n++
                }
                return e
            },
            hr = /[!'()~]|%20/g,
            mr = {
                "!": "%21",
                "'": "%27",
                "(": "%28",
                ")": "%29",
                "~": "%7E",
                "%20": "+"
            },
            yr = function(r) {
                return mr[r]
            },
            br = function(r) {
                return V(W(r), hr, yr)
            },
            wr = v(function(r, t) {
                B(this, {
                    type: F,
                    target: q(r).entries,
                    index: 0,
                    kind: t
                })
            }, T, function() {
                var r = _(this),
                    t = r.target,
                    e = r.index++;
                if (!t || e >= t.length) return r.target = null, j(void 0, !0);
                var n = t[e];
                switch (r.kind) {
                    case "keys":
                        return j(n.key, !1);
                    case "values":
                        return j(n.value, !1)
                }
                return j([n.key, n.value], !1)
            }, !0),
            Sr = function(r) {
                this.entries = [], this.url = null, void 0 !== r && (O(r) ? this.parseObject(r) : this.parseQuery("string" == typeof r ? "?" === J(r, 0) ? er(r, 1) : r : R(r)))
            };
        Sr.prototype = {
            type: T,
            bindURL: function(r) {
                this.url = r, this.update()
            },
            parseObject: function(r) {
                var t, e, n, i, u, a, f, c = this.entries,
                    s = L(r);
                if (s)
                    for (e = (t = k(r, s)).next; !(n = o(e, t)).done;) {
                        if (u = (i = k(P(n.value))).next, (a = o(u, i)).done || (f = o(u, i)).done || !o(u, i).done) throw new N("Expected sequence with length 2");
                        X(c, {
                            key: R(a.value),
                            value: R(f.value)
                        })
                    } else
                        for (var l in r) b(r, l) && X(c, {
                            key: l,
                            value: R(r[l])
                        })
            },
            parseQuery: function(r) {
                if (r)
                    for (var t, e, n = this.entries, i = tr(r, "&"), o = 0; o < i.length;)(t = i[o++]).length && (e = tr(t, "="), X(n, {
                        key: lr(Z(e)),
                        value: lr(Q(e, "="))
                    }))
            },
            serialize: function() {
                for (var r, t = this.entries, e = [], n = 0; n < t.length;) r = t[n++], X(e, br(r.key) + "=" + br(r.value));
                return Q(e, "&")
            },
            update: function() {
                this.entries.length = 0, this.parseQuery(this.url.query)
            },
            updateURL: function() {
                this.url && this.url.update()
            }
        };
        var Pr = function() {
                g(this, Or);
                var r = B(this, new Sr(arguments.length > 0 ? arguments[0] : void 0));
                a || (this.size = r.entries.length)
            },
            Or = Pr.prototype;
        if (l(Or, {
                append: function(r, t) {
                    var e = q(this);
                    A(arguments.length, 2), X(e.entries, {
                        key: R(r),
                        value: R(t)
                    }), a || this.size++, e.updateURL()
                },
                delete: function(r) {
                    for (var t = q(this), e = A(arguments.length, 1), n = t.entries, i = R(r), o = e < 2 ? void 0 : arguments[1], u = void 0 === o ? o : R(o), f = 0; f < n.length;) {
                        var c = n[f];
                        c.key !== i || void 0 !== u && c.value !== u ? f++ : rr(n, f, 1)
                    }
                    a || (this.size = n.length), t.updateURL()
                },
                get: function(r) {
                    var t = q(this).entries;
                    A(arguments.length, 1);
                    for (var e = R(r), n = 0; n < t.length; n++)
                        if (t[n].key === e) return t[n].value;
                    return null
                },
                getAll: function(r) {
                    var t = q(this).entries;
                    A(arguments.length, 1);
                    for (var e = R(r), n = [], i = 0; i < t.length; i++) t[i].key === e && X(n, t[i].value);
                    return n
                },
                has: function(r) {
                    for (var t = q(this).entries, e = A(arguments.length, 1), n = R(r), i = e < 2 ? void 0 : arguments[1], o = void 0 === i ? i : R(i), u = 0; u < t.length;) {
                        var a = t[u++];
                        if (a.key === n && (void 0 === o || a.value === o)) return !0
                    }
                    return !1
                },
                set: function(r, t) {
                    var e = q(this);
                    A(arguments.length, 2);
                    for (var n, i = e.entries, o = !1, u = R(r), f = R(t), c = 0; c < i.length; c++)(n = i[c]).key === u && (o ? rr(i, c--, 1) : (o = !0, n.value = f));
                    o || X(i, {
                        key: u,
                        value: f
                    }), a || (this.size = i.length), e.updateURL()
                },
                sort: function() {
                    var r = q(this);
                    C(r.entries, function(r, t) {
                        return r.key > t.key ? 1 : -1
                    }), r.updateURL()
                },
                forEach: function(r) {
                    for (var t, e = q(this).entries, n = w(r, arguments.length > 1 ? arguments[1] : void 0), i = 0; i < e.length;) n((t = e[i++]).value, t.key, this)
                },
                keys: function() {
                    return new wr(this, "keys")
                },
                values: function() {
                    return new wr(this, "values")
                },
                entries: function() {
                    return new wr(this, "entries")
                }
            }, {
                enumerable: !0
            }), c(Or, I, Or.entries, {
                name: "entries"
            }), c(Or, "toString", function() {
                return q(this).serialize()
            }, {
                enumerable: !0
            }), a && s(Or, "size", {
                get: function() {
                    return q(this).entries.length
                },
                configurable: !0,
                enumerable: !0
            }), h(Pr, T), r({
                global: !0,
                constructor: !0,
                forced: !f
            }, {
                URLSearchParams: Pr
            }), !f && y(z)) {
            var Rr = u(M.has),
                xr = u(M.set),
                Er = function(r) {
                    if (O(r)) {
                        var t, e = r.body;
                        if (S(e) === T) return t = r.headers ? new z(r.headers) : new z, Rr(t, "content-type") || xr(t, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), x(r, {
                            body: E(0, R(e)),
                            headers: E(0, t)
                        })
                    }
                    return r
                };
            if (y(H) && r({
                    global: !0,
                    enumerable: !0,
                    dontCallGetSet: !0,
                    forced: !0
                }, {
                    fetch: function(r) {
                        return H(r, arguments.length > 1 ? Er(arguments[1]) : {})
                    }
                }), y($)) {
                var kr = function(r) {
                    return g(this, D), new $(r, arguments.length > 1 ? Er(arguments[1]) : {})
                };
                D.constructor = kr, kr.prototype = D, r({
                    global: !0,
                    constructor: !0,
                    dontCallGetSet: !0,
                    forced: !0
                }, {
                    Request: kr
                })
            }
        }
        return Zo = {
            URLSearchParams: Pr,
            getState: q
        }
    }

    function fu() {
        if (tu) return yo;
        tu = 1,
            function() {
                if (ji) return bo;
                ji = 1;
                var r = Dn().charAt,
                    t = wn(),
                    e = Dt(),
                    n = Lo(),
                    i = jo(),
                    o = "String Iterator",
                    u = e.set,
                    a = e.getterFor(o);
                n(String, "String", function(r) {
                    u(this, {
                        type: o,
                        string: t(r),
                        index: 0
                    })
                }, function() {
                    var t, e = a(this),
                        n = e.string,
                        o = e.index;
                    return o >= n.length ? i(void 0, !0) : (t = r(n, o), e.index += t.length, i(t, !1))
                })
            }();
        var r, t = Le(),
            e = d(),
            n = Ao(),
            o = i(),
            u = Uo(),
            a = fr(),
            f = Nt(),
            c = Co(),
            s = Io(),
            l = et(),
            h = function() {
                if (zi) return $i;
                zi = 1;
                var r = d(),
                    t = fr(),
                    e = m(),
                    n = p(),
                    i = Ke(),
                    o = xe(),
                    u = ur(),
                    a = tt(),
                    f = sr(),
                    c = Object.assign,
                    s = Object.defineProperty,
                    l = t([].concat);
                return $i = !c || n(function() {
                    if (r && 1 !== c({
                            b: 1
                        }, c(s({}, "a", {
                            enumerable: !0,
                            get: function() {
                                s(this, "b", {
                                    value: 3,
                                    enumerable: !1
                                })
                            }
                        }), {
                            b: 2
                        })).b) return !0;
                    var t = {},
                        e = {},
                        n = Symbol("assign detection"),
                        o = "abcdefghijklmnopqrst";
                    return t[n] = 7, o.split("").forEach(function(r) {
                        e[r] = r
                    }), 7 !== c({}, t)[n] || i(c({}, e)).join("") !== o
                }) ? function(t, n) {
                    for (var c = a(t), s = arguments.length, h = 1, v = o.f, p = u.f; s > h;)
                        for (var d, g = f(arguments[h++]), m = v ? l(i(g), v(g)) : i(g), y = m.length, b = 0; y > b;) d = m[b++], r && !e(p, g, d) || (c[d] = g[d]);
                    return c
                } : c, $i
            }(),
            v = Do(),
            g = Mo(),
            y = Dn().codeAt,
            b = No(),
            w = wn(),
            S = Po(),
            P = Wo(),
            O = au(),
            R = Dt(),
            x = R.set,
            E = R.getterFor("URL"),
            k = O.URLSearchParams,
            L = O.getState,
            j = o.URL,
            A = o.TypeError,
            U = o.encodeURIComponent,
            C = o.parseInt,
            I = Math.floor,
            T = Math.pow,
            F = a("".charAt),
            B = a(/./.exec),
            q = a([].join),
            _ = a(1.1.toString),
            H = a([].pop),
            $ = a([].push),
            z = a("".replace),
            D = a([].shift),
            M = a("".split),
            N = a("".slice),
            W = a("".toLowerCase),
            G = a([].unshift),
            Y = "Invalid scheme",
            K = "Invalid host",
            J = "Invalid port",
            Q = /[a-z]/i,
            X = /[\d+\-.a-z]/i,
            V = /\d/,
            Z = /^0x/i,
            rr = /^[0-7]+$/,
            tr = /^\d+$/,
            er = /^[\da-f]+$/i,
            nr = /[\0\t\n\r #%/:<>?@[\\\]^|]/,
            ir = /[\0\t\n\r #/:<>?@[\\\]^|]/,
            or = /^[\u0000-\u0020]+/,
            ar = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/,
            cr = /[\t\n\r]/g,
            lr = function(r) {
                var t, e, n, i;
                if ("number" == typeof r) {
                    for (t = [], e = 0; e < 4; e++) G(t, r % 256), r = I(r / 256);
                    return q(t, ".")
                }
                if ("object" == typeof r) {
                    for (t = "", n = function(r) {
                            for (var t = null, e = 1, n = null, i = 0, o = 0; o < 8; o++) 0 !== r[o] ? (i > e && (t = n, e = i), n = null, i = 0) : (null === n && (n = o), ++i);
                            return i > e ? n : t
                        }(r), e = 0; e < 8; e++) i && 0 === r[e] || (i && (i = !1), n === e ? (t += e ? ":" : "::", i = !0) : (t += _(r[e], 16), e < 7 && (t += ":")));
                    return "[" + t + "]"
                }
                return r
            },
            hr = {},
            vr = h({}, hr, {
                " ": 1,
                '"': 1,
                "#": 1,
                "<": 1,
                ">": 1
            }),
            pr = h({}, vr, {
                "'": 1
            }),
            dr = h({}, hr, {
                " ": 1,
                '"': 1,
                "<": 1,
                ">": 1,
                "`": 1
            }),
            gr = h({}, dr, {
                "#": 1,
                "?": 1,
                "{": 1,
                "}": 1,
                "^": 1
            }),
            mr = h({}, gr, {
                "/": 1,
                ":": 1,
                ";": 1,
                "=": 1,
                "@": 1,
                "[": 1,
                "\\": 1,
                "]": 1,
                "^": 1,
                "|": 1
            }),
            yr = function(r, t) {
                var e = y(r, 0);
                return e >= 32 && e < 127 && !l(t, r) ? r : "'" === r && l(t, r) ? "%27" : U(r)
            },
            br = {
                ftp: 21,
                file: null,
                http: 80,
                https: 443,
                ws: 80,
                wss: 443
            },
            wr = function(r, t) {
                var e;
                return 2 === r.length && B(Q, F(r, 0)) && (":" === (e = F(r, 1)) || !t && "|" === e)
            },
            Sr = function(r) {
                var t;
                return r.length > 1 && wr(N(r, 0, 2)) && (2 === r.length || "/" === (t = F(r, 2)) || "\\" === t || "?" === t || "#" === t)
            },
            Pr = function(r) {
                return "." === r || "%2e" === W(r)
            },
            Or = function(r) {
                return ".." === (r = W(r)) || "%2e." === r || ".%2e" === r || "%2e%2e" === r
            },
            Rr = {},
            xr = {},
            Er = {},
            kr = {},
            Lr = {},
            jr = {},
            Ar = {},
            Ur = {},
            Cr = {},
            Ir = {},
            Tr = {},
            Fr = {},
            Br = {},
            qr = {},
            _r = {},
            Hr = {},
            $r = {},
            zr = {},
            Dr = {},
            Mr = {},
            Nr = {},
            Wr = function(r, t, e) {
                var n, i, o, u = w(r);
                if (t) {
                    if (i = this.parse(u)) throw new A(i);
                    this.searchParams = null
                } else {
                    if (void 0 !== e && (n = new Wr(e, !0)), i = this.parse(u, null, n)) throw new A(i);
                    (o = L(new k)).bindURL(this), this.searchParams = o
                }
            };
        Wr.prototype = {
            type: "URL",
            parse: function(t, e, n) {
                var i, o, u, a, f = this,
                    c = e || Rr,
                    s = 0,
                    h = "",
                    p = !1,
                    d = !1,
                    m = !1;
                for (t = w(t), e || (f.scheme = "", f.username = "", f.password = "", f.host = null, f.port = null, f.path = [], f.query = null, f.fragment = null, f.cannotBeABaseURL = !1, t = z(t, or, ""), t = z(t, ar, "$1")), t = z(t, cr, ""), i = v(t); s <= i.length;) {
                    switch (o = i[s], c) {
                        case Rr:
                            if (!o || !B(Q, o)) {
                                if (e) return Y;
                                c = Er;
                                continue
                            }
                            h += W(o), c = xr;
                            break;
                        case xr:
                            if (o && B(X, o)) h += W(o);
                            else {
                                if (":" !== o) {
                                    if (e) return Y;
                                    h = "", c = Er, s = 0;
                                    continue
                                }
                                if (e && (f.isSpecial() !== l(br, h) || "file" === h && (f.includesCredentials() || null !== f.port) || "file" === f.scheme && "" === f.host)) return;
                                if (f.scheme = h, e) return void(f.isSpecial() && br[f.scheme] === f.port && (f.port = null));
                                h = "", "file" === f.scheme ? c = qr : f.isSpecial() && n && n.scheme === f.scheme ? c = kr : f.isSpecial() ? c = Ur : "/" === i[s + 1] ? (c = Lr, s++) : (f.cannotBeABaseURL = !0, $(f.path, ""), c = Dr)
                            }
                            break;
                        case Er:
                            if (!n || n.cannotBeABaseURL && "#" !== o) return Y;
                            if (n.cannotBeABaseURL && "#" === o) {
                                f.scheme = n.scheme, f.path = g(n.path), f.query = n.query, f.fragment = "", f.cannotBeABaseURL = !0, c = Nr;
                                break
                            }
                            c = "file" === n.scheme ? qr : jr;
                            continue;
                        case kr:
                            if ("/" !== o || "/" !== i[s + 1]) {
                                c = jr;
                                continue
                            }
                            c = Cr, s++;
                            break;
                        case Lr:
                            if ("/" === o) {
                                c = Ir;
                                break
                            }
                            c = zr;
                            continue;
                        case jr:
                            if (f.scheme = n.scheme, o === r) f.username = n.username, f.password = n.password, f.host = n.host, f.port = n.port, f.path = g(n.path), f.query = n.query;
                            else if ("/" === o || "\\" === o && f.isSpecial()) c = Ar;
                            else if ("?" === o) f.username = n.username, f.password = n.password, f.host = n.host, f.port = n.port, f.path = g(n.path), f.query = "", c = Mr;
                            else {
                                if ("#" !== o) {
                                    f.username = n.username, f.password = n.password, f.host = n.host, f.port = n.port, f.path = g(n.path), f.path.length && f.path.length--, c = zr;
                                    continue
                                }
                                f.username = n.username, f.password = n.password, f.host = n.host, f.port = n.port, f.path = g(n.path), f.query = n.query, f.fragment = "", c = Nr
                            }
                            break;
                        case Ar:
                            if (!f.isSpecial() || "/" !== o && "\\" !== o) {
                                if ("/" !== o) {
                                    f.username = n.username, f.password = n.password, f.host = n.host, f.port = n.port, c = zr;
                                    continue
                                }
                                c = Ir
                            } else c = Cr;
                            break;
                        case Ur:
                            if (c = Cr, "/" !== o || "/" !== i[s + 1]) continue;
                            s++;
                            break;
                        case Cr:
                            if ("/" !== o && "\\" !== o) {
                                c = Ir;
                                continue
                            }
                            break;
                        case Ir:
                            if ("@" === o) {
                                p && (h = "%40" + h), p = !0, u = v(h);
                                for (var y = 0; y < u.length; y++) {
                                    var b = u[y];
                                    if (":" !== b || m) {
                                        var S = yr(b, mr);
                                        m ? f.password += S : f.username += S
                                    } else m = !0
                                }
                                h = ""
                            } else if (o === r || "/" === o || "?" === o || "#" === o || "\\" === o && f.isSpecial()) {
                                if (p && "" === h) return "Invalid authority";
                                s -= v(h).length + 1, h = "", c = Tr
                            } else h += o;
                            break;
                        case Tr:
                        case Fr:
                            if (e && "file" === f.scheme) {
                                c = Hr;
                                continue
                            }
                            if (":" !== o || d) {
                                if (o === r || "/" === o || "?" === o || "#" === o || "\\" === o && f.isSpecial()) {
                                    if (f.isSpecial() && "" === h) return K;
                                    if (e && "" === h && (f.includesCredentials() || null !== f.port)) return;
                                    if (a = f.parseHost(h)) return a;
                                    if (h = "", c = $r, e) return;
                                    continue
                                }
                                "[" === o ? d = !0 : "]" === o && (d = !1), h += o
                            } else {
                                if ("" === h) return K;
                                if (e === Fr) return;
                                if (a = f.parseHost(h)) return a;
                                h = "", c = Br
                            }
                            break;
                        case Br:
                            if (!B(V, o)) {
                                if (o === r || "/" === o || "?" === o || "#" === o || "\\" === o && f.isSpecial() || e) {
                                    if ("" !== h) {
                                        var P = C(h, 10);
                                        if (P > 65535) return J;
                                        f.port = f.isSpecial() && P === br[f.scheme] ? null : P, h = ""
                                    }
                                    if (e) return;
                                    c = $r;
                                    continue
                                }
                                return J
                            }
                            h += o;
                            break;
                        case qr:
                            if (f.scheme = "file", f.host = "", "/" === o || "\\" === o) c = _r;
                            else {
                                if (!n || "file" !== n.scheme) {
                                    c = zr;
                                    continue
                                }
                                switch (o) {
                                    case r:
                                        f.host = n.host, f.path = g(n.path), f.query = n.query;
                                        break;
                                    case "?":
                                        f.host = n.host, f.path = g(n.path), f.query = "", c = Mr;
                                        break;
                                    case "#":
                                        f.host = n.host, f.path = g(n.path), f.query = n.query, f.fragment = "", c = Nr;
                                        break;
                                    default:
                                        f.host = n.host, Sr(q(g(i, s), "")) || (f.path = g(n.path), f.shortenPath()), c = zr;
                                        continue
                                }
                            }
                            break;
                        case _r:
                            if ("/" === o || "\\" === o) {
                                c = Hr;
                                break
                            }
                            n && "file" === n.scheme && (f.host = n.host, !Sr(q(g(i, s), "")) && wr(n.path[0], !0) && $(f.path, n.path[0])), c = zr;
                            continue;
                        case Hr:
                            if (o === r || "/" === o || "\\" === o || "?" === o || "#" === o) {
                                if (!e && wr(h)) c = zr;
                                else if ("" === h) {
                                    if (f.host = "", e) return;
                                    c = $r
                                } else {
                                    if (a = f.parseHost(h)) return a;
                                    if ("localhost" === f.host && (f.host = ""), e) return;
                                    h = "", c = $r
                                }
                                continue
                            }
                            h += o;
                            break;
                        case $r:
                            if (f.isSpecial()) {
                                if (c = zr, "/" !== o && "\\" !== o) continue
                            } else if (e || "?" !== o)
                                if (e || "#" !== o) {
                                    if (o !== r && (c = zr, "/" !== o)) continue
                                } else f.fragment = "", c = Nr;
                            else f.query = "", c = Mr;
                            break;
                        case zr:
                            if (o === r || "/" === o || "\\" === o && f.isSpecial() || !e && ("?" === o || "#" === o)) {
                                if (Or(h) ? (f.shortenPath(), "/" === o || "\\" === o && f.isSpecial() || $(f.path, "")) : Pr(h) ? "/" === o || "\\" === o && f.isSpecial() || $(f.path, "") : ("file" === f.scheme && !f.path.length && wr(h) && (null !== f.host && "" !== f.host && (f.host = ""), h = F(h, 0) + ":"), $(f.path, h)), h = "", "file" === f.scheme && (o === r || "?" === o || "#" === o))
                                    for (; f.path.length > 1 && "" === f.path[0];) D(f.path);
                                "?" === o ? (f.query = "", c = Mr) : "#" === o && (f.fragment = "", c = Nr)
                            } else h += yr(o, gr);
                            break;
                        case Dr:
                            "?" === o ? (f.query = "", c = Mr) : "#" === o ? (f.fragment = "", c = Nr) : o !== r && (f.path[0] += yr(o, hr));
                            break;
                        case Mr:
                            e || "#" !== o ? o !== r && (f.query += yr(o, f.isSpecial() ? pr : vr)) : (f.fragment = "", c = Nr);
                            break;
                        case Nr:
                            o !== r && (f.fragment += yr(o, dr))
                    }
                    s++
                }
            },
            parseHost: function(r) {
                var t, e, n;
                if ("[" === F(r, 0)) {
                    if ("]" !== F(r, r.length - 1)) return K;
                    if (t = function(r) {
                            var t, e, n, i, o, u, a, f = [0, 0, 0, 0, 0, 0, 0, 0],
                                c = 0,
                                s = null,
                                l = 0,
                                h = function() {
                                    return F(r, l)
                                };
                            if (":" === h()) {
                                if (":" !== F(r, 1)) return;
                                l += 2, s = ++c
                            }
                            for (; h();) {
                                if (8 === c) return;
                                if (":" !== h()) {
                                    for (t = e = 0; e < 4 && B(er, h());) t = 16 * t + C(h(), 16), l++, e++;
                                    if ("." === h()) {
                                        if (0 === e) return;
                                        if (l -= e, c > 6) return;
                                        for (n = 0; h();) {
                                            if (i = null, n > 0) {
                                                if (!("." === h() && n < 4)) return;
                                                l++
                                            }
                                            if (!B(V, h())) return;
                                            for (; B(V, h());) {
                                                if (o = C(h(), 10), null === i) i = o;
                                                else {
                                                    if (0 === i) return;
                                                    i = 10 * i + o
                                                }
                                                if (i > 255) return;
                                                l++
                                            }
                                            f[c] = 256 * f[c] + i, 2 !== ++n && 4 !== n || c++
                                        }
                                        if (4 !== n) return;
                                        break
                                    }
                                    if (":" === h()) {
                                        if (l++, !h()) return
                                    } else if (h()) return;
                                    f[c++] = t
                                } else {
                                    if (null !== s) return;
                                    l++, s = ++c
                                }
                            }
                            if (null !== s)
                                for (u = c - s, c = 7; 0 !== c && u > 0;) a = f[c], f[c--] = f[s + u - 1], f[s + --u] = a;
                            else if (8 !== c) return;
                            return f
                        }(N(r, 1, -1)), !t) return K;
                    this.host = t
                } else if (this.isSpecial()) {
                    if (r = b(r), B(nr, r)) return K;
                    if (function(r) {
                            var t, e, n = M(r, ".");
                            if ("" === n[n.length - 1]) {
                                if (1 === n.length) return !1;
                                n.length--
                            }
                            return t = n[n.length - 1], !!B(tr, t) || !!B(Z, t) && ("" === (e = N(t, 2)) || !!B(er, e))
                        }(r)) {
                        if (t = function(r) {
                                var t, e, n, i, o, u, a, f = M(r, ".");
                                if (f.length && "" === f[f.length - 1] && f.length--, (t = f.length) > 4) return null;
                                for (e = [], n = 0; n < t; n++) {
                                    if ("" === (i = f[n])) return null;
                                    if (o = 10, i.length > 1 && "0" === F(i, 0) && (o = B(Z, i) ? 16 : 8, i = N(i, 8 === o ? 1 : 2)), "" === i) u = 0;
                                    else {
                                        if (!B(10 === o ? tr : 8 === o ? rr : er, i)) return null;
                                        u = C(i, o)
                                    }
                                    $(e, u)
                                }
                                for (n = 0; n < t; n++)
                                    if (u = e[n], n === t - 1) {
                                        if (u >= T(256, 5 - t)) return null
                                    } else if (u > 255) return null;
                                for (a = H(e), n = 0; n < e.length; n++) a += e[n] * T(256, 3 - n);
                                return a
                            }(r), null === t) return K;
                        this.host = t
                    } else this.host = r
                } else {
                    if (B(ir, r)) return K;
                    for (t = "", e = v(r), n = 0; n < e.length; n++) t += yr(e[n], hr);
                    this.host = t
                }
            },
            cannotHaveUsernamePasswordPort: function() {
                return null === this.host || "" === this.host || this.cannotBeABaseURL || "file" === this.scheme
            },
            includesCredentials: function() {
                return "" !== this.username || "" !== this.password
            },
            isSpecial: function() {
                return l(br, this.scheme)
            },
            shortenPath: function() {
                var r = this.path,
                    t = r.length;
                !t || "file" === this.scheme && 1 === t && wr(r[0], !0) || r.length--
            },
            serialize: function() {
                var r = this,
                    t = r.scheme,
                    e = r.username,
                    n = r.password,
                    i = r.host,
                    o = r.port,
                    u = r.path,
                    a = r.query,
                    f = r.fragment,
                    c = t + ":";
                return null !== i ? (c += "//", r.includesCredentials() && (c += e + (n ? ":" + n : "") + "@"), c += lr(i), null !== o && (c += ":" + o)) : "file" === t && (c += "//"), null === i && !r.cannotBeABaseURL && u.length > 1 && "" === u[0] && (c += "/."), c += r.cannotBeABaseURL ? u[0] : u.length ? "/" + q(u, "/") : "", null !== a && (c += "?" + a), null !== f && (c += "#" + f), c
            },
            setHref: function(r) {
                var t = this.parse(r);
                if (t) throw new A(t);
                this.searchParams.update()
            },
            getOrigin: function() {
                var r = this.scheme,
                    t = this.port;
                if ("blob" === r) try {
                    return new Gr(this.path[0]).origin
                } catch (r) {
                    return "null"
                }
                return "file" !== r && this.isSpecial() ? r + "://" + lr(this.host) + (null !== t ? ":" + t : "") : "null"
            },
            getProtocol: function() {
                return this.scheme + ":"
            },
            setProtocol: function(r) {
                this.parse(w(r) + ":", Rr)
            },
            getUsername: function() {
                return this.username
            },
            setUsername: function(r) {
                var t = v(w(r));
                if (!this.cannotHaveUsernamePasswordPort()) {
                    this.username = "";
                    for (var e = 0; e < t.length; e++) this.username += yr(t[e], mr)
                }
            },
            getPassword: function() {
                return this.password
            },
            setPassword: function(r) {
                var t = v(w(r));
                if (!this.cannotHaveUsernamePasswordPort()) {
                    this.password = "";
                    for (var e = 0; e < t.length; e++) this.password += yr(t[e], mr)
                }
            },
            getHost: function() {
                var r = this.host,
                    t = this.port;
                return null === r ? "" : null === t ? lr(r) : lr(r) + ":" + t
            },
            setHost: function(r) {
                this.cannotBeABaseURL || this.parse(r, Tr)
            },
            getHostname: function() {
                var r = this.host;
                return null === r ? "" : lr(r)
            },
            setHostname: function(r) {
                this.cannotBeABaseURL || this.parse(r, Fr)
            },
            getPort: function() {
                var r = this.port;
                return null === r ? "" : w(r)
            },
            setPort: function(r) {
                this.cannotHaveUsernamePasswordPort() || ("" === (r = w(r)) ? this.port = null : this.parse(r, Br))
            },
            getPathname: function() {
                var r = this.path;
                return this.cannotBeABaseURL ? r[0] : r.length ? "/" + q(r, "/") : ""
            },
            setPathname: function(r) {
                this.cannotBeABaseURL || (this.path = [], this.parse(r, $r))
            },
            getSearch: function() {
                var r = this.query;
                return r ? "?" + r : ""
            },
            setSearch: function(r) {
                "" === (r = w(r)) ? this.query = null: ("?" === F(r, 0) && (r = N(r, 1)), this.query = "", this.parse(r, Mr)), this.searchParams.update()
            },
            getSearchParams: function() {
                return this.searchParams.facade
            },
            getHash: function() {
                var r = this.fragment;
                return r ? "#" + r : ""
            },
            setHash: function(r) {
                "" !== (r = w(r)) ? ("#" === F(r, 0) && (r = N(r, 1)), this.fragment = "", this.parse(r, Nr)) : this.fragment = null
            },
            update: function() {
                this.query = this.searchParams.serialize() || null
            }
        };
        var Gr = function(r) {
                var t = s(this, Yr),
                    n = P(arguments.length, 1) > 1 ? arguments[1] : void 0,
                    i = x(t, new Wr(r, !1, n));
                e || (t.href = i.serialize(), t.origin = i.getOrigin(), t.protocol = i.getProtocol(), t.username = i.getUsername(), t.password = i.getPassword(), t.host = i.getHost(), t.hostname = i.getHostname(), t.port = i.getPort(), t.pathname = i.getPathname(), t.search = i.getSearch(), t.searchParams = i.getSearchParams(), t.hash = i.getHash())
            },
            Yr = Gr.prototype,
            Kr = function(r, t) {
                return {
                    get: function() {
                        return E(this)[r]()
                    },
                    set: t && function(r) {
                        return E(this)[t](r)
                    },
                    configurable: !0,
                    enumerable: !0
                }
            };
        if (e && (c(Yr, "href", Kr("serialize", "setHref")), c(Yr, "origin", Kr("getOrigin")), c(Yr, "protocol", Kr("getProtocol", "setProtocol")), c(Yr, "username", Kr("getUsername", "setUsername")), c(Yr, "password", Kr("getPassword", "setPassword")), c(Yr, "host", Kr("getHost", "setHost")), c(Yr, "hostname", Kr("getHostname", "setHostname")), c(Yr, "port", Kr("getPort", "setPort")), c(Yr, "pathname", Kr("getPathname", "setPathname")), c(Yr, "search", Kr("getSearch", "setSearch")), c(Yr, "searchParams", Kr("getSearchParams")), c(Yr, "hash", Kr("getHash", "setHash"))), f(Yr, "toJSON", function() {
                return E(this).serialize()
            }, {
                enumerable: !0
            }), f(Yr, "toString", function() {
                return E(this).serialize()
            }, {
                enumerable: !0
            }), j) {
            var Jr = j.createObjectURL,
                Qr = j.revokeObjectURL;
            Jr && f(Gr, "createObjectURL", u(Jr, j)), Qr && f(Gr, "revokeObjectURL", u(Qr, j))
        }
        return S(Gr, "URL"), t({
            global: !0,
            constructor: !0,
            forced: !n,
            sham: !e
        }, {
            URL: Gr
        }), yo
    }

    function cu() {
        return eu || (eu = 1, fu()), mo
    }
    var su, lu, hu, vu, pu, du, gu, mu = {};

    function yu() {
        if (hu) return lu;
        hu = 1;
        var r = i();
        return lu = r
    }

    function bu() {
        if (pu) return vu;
        pu = 1, cu(),
            function() {
                if (su) return mu;
                su = 1;
                var r = Le(),
                    t = gr(),
                    e = p(),
                    n = Wo(),
                    i = wn(),
                    o = Ao(),
                    u = t("URL"),
                    a = o && e(function() {
                        u.canParse()
                    }),
                    f = e(function() {
                        return 1 !== u.canParse.length
                    });
                r({
                    target: "URL",
                    stat: !0,
                    forced: !a || f
                }, {
                    canParse: function(r) {
                        var t = n(arguments.length, 1),
                            e = i(r),
                            o = t < 2 || void 0 === arguments[1] ? void 0 : i(arguments[1]);
                        try {
                            return !!new u(e, o)
                        } catch (r) {
                            return !1
                        }
                    }
                })
            }();
        var r = yu();
        return vu = r.URL.canParse
    }! function() {
        if (gu) return du;
        gu = 1;
        var r = bu();
        du = r
    }();
    var wu, Su, Pu, Ou, Ru, xu = {};

    function Eu() {
        if (Pu) return Su;
        Pu = 1, cu(),
            function() {
                if (wu) return xu;
                wu = 1;
                var r = Le(),
                    t = gr(),
                    e = Wo(),
                    n = wn(),
                    i = Ao(),
                    o = t("URL");
                r({
                    target: "URL",
                    stat: !0,
                    forced: !i
                }, {
                    parse: function(r) {
                        var t = e(arguments.length, 1),
                            i = n(r),
                            u = t < 2 || void 0 === arguments[1] ? void 0 : n(arguments[1]);
                        try {
                            return new o(i, u)
                        } catch (r) {
                            return null
                        }
                    }
                })
            }();
        var r = yu();
        return Su = r.URL.parse
    }
    let ku;
    ! function() {
        if (Ru) return Ou;
        Ru = 1;
        var r = Eu();
        Ou = r
    }(), window.addEventListener("d2l-performance-measure", r => {
        const t = /(\?|&)timingdebug=(1|0)/gi.exec(location.search);
        if (null !== t && 3 === t.length) {
            const r = "0" !== t[2];
            try {
                r ? window.sessionStorage.setItem("TimingDebug", "1") : window.sessionStorage.removeItem("TimingDebug")
            } catch {}
        }
        let e = !1;
        try {
            e = null !== window.sessionStorage.getItem("TimingDebug")
        } catch {}
        e && requestAnimationFrame(() => {
            const t = document.createElement("div"),
                e = "paint" === r.detail.value.entryType ? r.detail.value.startTime : r.detail.value.duration;
            t.appendChild(document.createTextNode(`${r.detail.value.name}: ${Math.floor(e)}`));
            let n = document.querySelector(".d2l-page-timing");
            null === n ? (n = document.createElement("div"), n.className = "d2l-page-timing", n.appendChild(t), document.body.appendChild(n)) : n.appendChild(t)
        })
    });
    let Lu = !1,
        ju = !1;

    function Au() {
        Lu && ju && ku()
    }
    var Uu = {
        FontsLoaded: function() {
            ju = !0, Au()
        },
        WebComponentsLoaded: function() {
            Lu = !0, Au()
        },
        WebComponentsReady: new Promise(r => {
            ku = r
        }),
        reset: function() {
            Lu = !1, ju = !1, this.WebComponentsReady = new Promise(r => {
                ku = r
            })
        }
    };
    ! function() {
        if (!(window.performance && window.performance.mark && window.performance.measure && window.performance.getEntriesByName)) return;
        let r = !1,
            t = !1,
            e = !1;

        function n(r, t) {
            document.dispatchEvent(new CustomEvent("d2l-performance-measure", {
                bubbles: !0,
                detail: {
                    name: r,
                    value: t
                }
            }))
        }

        function i(r, t, e, i) {
            window.performance.measure(r, t, e);
            const o = window.performance.getEntriesByName(r, "measure");
            1 === o.length && i && n(r, o[0])
        }

        function o() {
            r || (r = !0, window.performance.mark("webComponentsReady"), a())
        }

        function u() {
            t = !0, a()
        }

        function a() {
            r && t && !e && (e = !0, i("d2l.page.preFetch", "navigationStart", "fetchStart", !1), i("d2l.page.domInteractive", "fetchStart", "domInteractive", !1), i("d2l.page.domContentLoadedHandlers", "domContentLoadedEventStart", "domContentLoadedEventEnd", !1), i("d2l.page.load", "fetchStart", "loadEventStart", !1), i("d2l.page.server", "requestStart", "responseStart", !1), i("d2l.page.download", "responseStart", "responseEnd", !1), i("d2l.page.timeToClient", "navigationStart", "responseEnd", !0), i("d2l.page.webComponentsReady", "navigationStart", "webComponentsReady", !0))
        }
        if ("complete" === document.readyState ? u() : addEventListener("load", u), Uu.WebComponentsReady.then(o), "PerformanceObserver" in window) {
            const r = new PerformanceObserver(r => {
                const t = r.getEntries();
                void 0 !== t && t.length > 0 && t.forEach(r => {
                    n(`d2l.page.${r.name}`, r)
                })
            });
            try {
                r.observe({
                    entryTypes: ["paint"]
                })
            } catch {}
        }
        setTimeout(o, 1e4)
    }(), window.D2L = window.D2L || {}, window.D2L.FontsLoaded = Uu.FontsLoaded, window.D2L.WebComponentsLoaded = Uu.WebComponentsLoaded, window.D2L.WebComponentsReady = Uu.WebComponentsReady, window.d2lWCLoaded && Uu.WebComponentsLoaded(), window.d2lFontsLoaded ? Uu.FontsLoaded() : setTimeout(() => {
        Uu.FontsLoaded()
    }, 2e3)
}();