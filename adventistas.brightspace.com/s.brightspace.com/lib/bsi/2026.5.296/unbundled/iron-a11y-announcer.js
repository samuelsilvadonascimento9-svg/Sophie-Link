import {
    P as n
} from "./polymer-legacy.js";
import {
    h as e
} from "./polymer-element.js";
const t = n({
    _template: e `
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,
    is: "iron-a11y-announcer",
    properties: {
        mode: {
            type: String,
            value: "polite"
        },
        timeout: {
            type: Number,
            value: 150
        },
        _text: {
            type: String,
            value: ""
        }
    },
    created: function() {
        t.instance || (t.instance = this), document.addEventListener("iron-announce", this._onIronAnnounce.bind(this))
    },
    announce: function(n) {
        this._text = "", this.async(function() {
            this._text = n
        }, this.timeout)
    },
    _onIronAnnounce: function(n) {
        n.detail && n.detail.text && this.announce(n.detail.text)
    }
});
t.instance = null, t.requestAvailability = function() {
    t.instance || (t.instance = document.createElement("iron-a11y-announcer")), document.body ? document.body.appendChild(t.instance) : document.addEventListener("load", function() {
        document.body.appendChild(t.instance)
    })
};
export {
    t as I
};