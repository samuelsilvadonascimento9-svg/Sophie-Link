import {
    p as e,
    P as t
} from "./provider-mixin.js";
import {
    r as c
} from "./plugins.js";
let r, o;
e(document, "org-context", new t(() => {
    if (o) return o;
    const e = (r || (r = JSON.parse(document.documentElement.getAttribute("data-global-context"))), r);
    return e ? (o = {
        orgUnitId: e.orgUnitId
    }, o) : void 0
})), c("attachment-sources", {
    getSource: async () => {
        const e = await
        import ("./file-selector.js");
        return {
            selectItem: e ? .selectFile
        }
    }
}, {
    key: "file-selector"
}), c("attachment-sources", {
    getSource: async () => {
        const e = await
        import ("./audio-capture.js");
        return {
            selectItem: e ? .selectFile
        }
    }
}, {
    key: "audio-capture"
}), c("attachment-sources", {
    getSource: async () => {
        const e = await
        import ("./video-capture.js");
        return {
            selectItem: e ? .selectFile
        }
    }
}, {
    key: "video-capture"
});
const s = async () => {
    const e = await
    import ("./attachments-quicklinks.js");
    return {
        selectItem: e ? .selectItem
    }
};
c("attachment-sources", {
    getSource: s
}, {
    key: "quicklinks"
}), c("attachment-sources", {
    getSource: s
}, {
    key: "one-drive"
}), c("attachment-sources", {
    getSource: s
}, {
    key: "google-drive"
});