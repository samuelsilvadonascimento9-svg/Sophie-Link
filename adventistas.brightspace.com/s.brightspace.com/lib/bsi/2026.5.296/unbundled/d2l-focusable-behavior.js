import {
    d as o
} from "./polymer-legacy.js";
window.D2L = window.D2L || {}, window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {}, D2L.PolymerBehaviors.FocusableBehavior = {
    focus: function() {
        var e = o(this.root).querySelector(".d2l-focusable");
        e && e.focus()
    }
};