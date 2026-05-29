import {
    g as e
} from "./dom.js";
async function t(o, a = () => !0) {
    if (!o) return;
    const i = o.updateComplete;
    "object" == typeof i && Promise.resolve(i) === i && (await i, await new Promise(e => {
        requestAnimationFrame(() => e())
    })), "function" == typeof o.getLoadingComplete && (await o.getLoadingComplete(), await new Promise(e => {
        requestAnimationFrame(() => e())
    }));
    const n = e(o, a);
    await Promise.all(n.map(e => t(e, a)))
}
export {
    t as w
};