import {
    g as n
} from "./common.js";

function o({
    nonBreaking: o
} = {}) {
    const r = n().split("-")[0],
        s = o ? " " : " ";
    return "ar" === r ? `${s}،${s}` : ["ja", "zh"].includes(r) ? "、" : `,${s}`
}
export {
    o as g
};