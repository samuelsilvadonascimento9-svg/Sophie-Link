import "./boot.js";
let t = 0;
const e = function(e) {
    let i = e.__mixinApplications;
    i || (i = new WeakMap, e.__mixinApplications = i);
    let n = t++;
    return function(t) {
        let l = t.__mixinSet;
        if (l && l[n]) return t;
        let _ = i,
            o = _.get(t);
        if (!o) {
            o = e(t), _.set(t, o);
            let i = Object.create(o.__mixinSet || l || null);
            i[n] = !0, o.__mixinSet = i
        }
        return o
    }
};
export {
    e as d
};