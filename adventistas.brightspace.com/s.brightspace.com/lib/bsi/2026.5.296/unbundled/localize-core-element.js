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
                            return import ("./ar.js");
                        case "../lang/cy.js":
                            return import ("./cy.js");
                        case "../lang/da.js":
                            return import ("./da.js");
                        case "../lang/de.js":
                            return import ("./de.js");
                        case "../lang/en-gb.js":
                            return import ("./en-gb.js");
                        case "../lang/en.js":
                            return import ("./en.js");
                        case "../lang/es-es.js":
                            return import ("./es-es.js");
                        case "../lang/es.js":
                            return import ("./es.js");
                        case "../lang/fr-fr.js":
                            return import ("./fr-fr.js");
                        case "../lang/fr.js":
                            return import ("./fr.js");
                        case "../lang/haw.js":
                            return import ("./haw.js");
                        case "../lang/hi.js":
                            return import ("./hi.js");
                        case "../lang/ja.js":
                            return import ("./ja.js");
                        case "../lang/ko.js":
                            return import ("./ko.js");
                        case "../lang/mi.js":
                            return import ("./mi.js");
                        case "../lang/nl.js":
                            return import ("./nl.js");
                        case "../lang/pt.js":
                            return import ("./pt.js");
                        case "../lang/sv.js":
                            return import ("./sv.js");
                        case "../lang/th.js":
                            return import ("./th.js");
                        case "../lang/tr.js":
                            return import ("./tr.js");
                        case "../lang/vi.js":
                            return import ("./vi.js");
                        case "../lang/zh-cn.js":
                            return import ("./zh-cn.js");
                        case "../lang/zh-tw.js":
                            return import ("./zh-tw.js");
                        default:
                            return new Promise(function(s, e) {
                                ("function" == typeof queueMicrotask ? queueMicrotask : setTimeout)(e.bind(null, new Error("Unknown variable dynamic import: " + r)))
                            })
                    }
                }(`../lang/${r}.js`)).default,
            loadCommon: !0
        }
    }
};
export {
    s as L
};