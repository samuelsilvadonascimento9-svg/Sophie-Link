import {
    L as r
} from "./localize-mixin.js";
const s = s => class extends(r(s)) {
    static get localizeConfig() {
        return {
            importFunc: async r => (await
                function(r) {
                    switch (r) {
                        case "../lang/ar.js":
                            return import ("./ar2.js");
                        case "../lang/cy.js":
                            return import ("./cy2.js");
                        case "../lang/da.js":
                            return import ("./da2.js");
                        case "../lang/de.js":
                            return import ("./de2.js");
                        case "../lang/en-gb.js":
                            return import ("./en-gb2.js");
                        case "../lang/en.js":
                            return import ("./en2.js");
                        case "../lang/es-es.js":
                            return import ("./es-es2.js");
                        case "../lang/es.js":
                            return import ("./es2.js");
                        case "../lang/fr-fr.js":
                            return import ("./fr-fr2.js");
                        case "../lang/fr-on.js":
                            return import ("./fr-on.js");
                        case "../lang/fr.js":
                            return import ("./fr2.js");
                        case "../lang/haw.js":
                            return import ("./haw2.js");
                        case "../lang/hi.js":
                            return import ("./hi2.js");
                        case "../lang/ja.js":
                            return import ("./ja2.js");
                        case "../lang/ko.js":
                            return import ("./ko2.js");
                        case "../lang/mi.js":
                            return import ("./mi2.js");
                        case "../lang/nl.js":
                            return import ("./nl2.js");
                        case "../lang/pt.js":
                            return import ("./pt2.js");
                        case "../lang/sv.js":
                            return import ("./sv2.js");
                        case "../lang/th.js":
                            return import ("./th2.js");
                        case "../lang/tr.js":
                            return import ("./tr2.js");
                        case "../lang/vi.js":
                            return import ("./vi2.js");
                        case "../lang/zh-cn.js":
                            return import ("./zh-cn2.js");
                        case "../lang/zh-tw.js":
                            return import ("./zh-tw2.js");
                        default:
                            return new Promise(function(s, e) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(e.bind(null, new Error("Unknown variable dynamic import: " + r)))
                            })
                    }
                }(`../lang/${r}.js`)).default
        }
    }
};
export {
    s as L
};