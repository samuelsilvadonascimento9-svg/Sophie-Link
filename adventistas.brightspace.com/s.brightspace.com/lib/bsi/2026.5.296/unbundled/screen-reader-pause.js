import {
    a as e,
    b as s
} from "./lit-element.js";
import {
    g as r
} from "./list2.js";
import {
    o as n
} from "./offscreen.js";
customElements.define("d2l-screen-reader-pause", class extends e {
    static get styles() {
        return n
    }
    render() {
        return s `<span class="d2l-offscreen">${r({nonBreaking:!0})}</span>`
    }
});