import {
    r as e
} from "./plugins.js";
e("practices-component", {
    getComponent: () => Promise.all([
        import ("./fill-blanks.js").catch(() => {})
    ])
}, {
    key: "fill-blanks"
}), e("practices-component", {
    getComponent: () => Promise.all([
        import ("./multiple-choice.js").catch(() => {})
    ])
}, {
    key: "multiple-choice"
}), e("practices-component", {
    getComponent: () => Promise.all([
        import ("./multiple-select.js").catch(() => {})
    ])
}, {
    key: "multiple-select"
}), e("practices-component", {
    getComponent: () => Promise.all([
        import ("./sequencing.js").catch(() => {})
    ])
}, {
    key: "sequencing"
}), e("practices-component", {
    getComponent: () => Promise.all([
        import ("./sorting.js").catch(() => {})
    ])
}, {
    key: "sorting"
}), e("practices-component", {
    getComponent: () => Promise.all([
        import ("./true-false.js").catch(() => {})
    ])
}, {
    key: "true-false"
}), e("practices-activity-display", {
    getModule: async () => await
    import ("./registry.js").then(function(e) {
        return e.r
    })
}, {
    key: "registry"
}), e("practices-activity-display", {
    getModule: async () => {
        const {
            getProviderFromRelsList: e
        } = await
        import ("./provider-utils.js").then(function(e) {
            return e.p
        });
        return e
    }
}, {
    key: "provider-framework-utils"
});