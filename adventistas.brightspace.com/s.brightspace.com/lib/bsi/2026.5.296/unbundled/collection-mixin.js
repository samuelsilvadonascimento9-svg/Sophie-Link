const t = t => class extends t {
    static get properties() {
        return {
            itemCount: {
                type: Number,
                attribute: "item-count",
                reflect: !0
            }
        }
    }
    constructor() {
        super(), this.itemCount = null
    }
};
export {
    t as C
};