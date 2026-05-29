function t(t, e, r) {
    if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : r;
    throw new TypeError("Private element is not present on this object")
}

function e(t, e) {
    if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
}

function r(e, r) {
    return e.get(t(e, r))
}

function n(t, r, n) {
    e(t, r), r.set(t, n)
}

function o(e, r, n) {
    return e.set(t(e, r), n), n
}

function i(e, r, n) {
    return n(t(e, r))
}

function u(t, r) {
    e(t, r), r.add(t)
}

function c(t, e, r) {
    return (e = function(t) {
        var e = function(t, e) {
            if ("object" != typeof t || !t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
                var n = r.call(t, e);
                if ("object" != typeof n) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === e ? String : Number)(t)
        }(t, "string");
        return "symbol" == typeof e ? e : e + ""
    }(e)) in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t
}

function f() {
    return f = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, r) {
        var n = function(t, e) {
            for (; !{}.hasOwnProperty.call(t, e) && null !== (t = a(t)););
            return t
        }(t, e);
        if (n) {
            var o = Object.getOwnPropertyDescriptor(n, e);
            return o.get ? o.get.call(arguments.length < 3 ? t : r) : o.value
        }
    }, f.apply(null, arguments)
}

function a(t) {
    return a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
    }, a(t)
}

function p(t, e) {
    return p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t
    }, p(t, e)
}

function l(t, e, r, n) {
    var o = f(a(1 & n ? t.prototype : t), e, r);
    return 2 & n && "function" == typeof o ? function(t) {
        return o.apply(r, t)
    } : o
}

function s() {
    s = function(t, e) {
        return new r(t, void 0, e)
    };
    var t = RegExp.prototype,
        e = new WeakMap;

    function r(t, n, o) {
        var i = RegExp(t, n);
        return e.set(i, o || e.get(t)), p(i, r.prototype)
    }

    function n(t, r) {
        var n = e.get(r);
        return Object.keys(n).reduce(function(e, r) {
            var o = n[r];
            if ("number" == typeof o) e[r] = t[o];
            else {
                for (var i = 0; void 0 === t[o[i]] && i + 1 < o.length;) i++;
                e[r] = t[o[i]]
            }
            return e
        }, Object.create(null))
    }
    return function(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e && p(t, e)
    }(r, RegExp), r.prototype.exec = function(e) {
        var r = t.exec.call(this, e);
        if (r) {
            r.groups = n(r, this);
            var o = r.indices;
            o && (o.groups = n(o, this))
        }
        return r
    }, r.prototype[Symbol.replace] = function(r, o) {
        if ("string" == typeof o) {
            var i = e.get(this);
            return t[Symbol.replace].call(this, r, o.replace(/\$<([^>]+)(>|$)/g, function(t, e, r) {
                if ("" === r) return t;
                var n = i[e];
                return Array.isArray(n) ? "$" + n.join("$") : "number" == typeof n ? "$" + n : ""
            }))
        }
        if ("function" == typeof o) {
            var u = this;
            return t[Symbol.replace].call(this, r, function() {
                var t = arguments;
                return "object" != typeof t[t.length - 1] && (t = [].slice.call(t)).push(n(t, u)), o.apply(this, t)
            })
        }
        return t[Symbol.replace].call(this, r, o)
    }, s.apply(this, arguments)
}
export {
    u as _, t as a, n as b, r as c, o as d, c as e, l as f, i as g, s as h
};