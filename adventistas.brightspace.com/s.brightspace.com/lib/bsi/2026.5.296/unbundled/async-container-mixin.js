const t = {
        initial: "initial",
        pending: "pending",
        complete: "complete"
    },
    s = s => class extends s {
        static get properties() {
            return {
                asyncPendingDelay: {
                    type: Number,
                    attribute: "async-pending-delay"
                },
                asyncState: {
                    type: String
                }
            }
        }
        constructor() {
            super(), this._initializeAsyncState(), this.asyncPendingDelay = 0, this._handleAsyncItemState = this._handleAsyncItemState.bind(this), this.asyncContainerCustom || this.addEventListener("pending-state", this._handleAsyncItemState)
        }
        get asyncContainerCustom() {
            return !1
        }
        resetAsyncState() {
            this._initializeAsyncState()
        }
        async _handleAsyncItemState(s) {
            const i = s.detail.promise;
            if (i && this.asyncState !== t.complete) {
                this._asyncPromises.push(i), this._asyncCounts.pending++, this.asyncState === t.initial && null === this._asyncTimeoutId && (this._asyncTimeoutId = setTimeout(() => {
                    this._asyncTimeoutId = null, this.asyncState === t.initial && (this.asyncState = t.pending)
                }, this.asyncPendingDelay));
                try {
                    await i, -1 !== this._asyncPromises.indexOf(i) && this._asyncCounts.fulfilled++
                } catch {
                    -1 !== this._asyncPromises.indexOf(i) && this._asyncCounts.rejected++
                } finally {
                    -1 !== this._asyncPromises.indexOf(i) && (this._asyncCounts.pending--, 0 === this._asyncCounts.pending && (this.asyncState = t.complete))
                }
            }
        }
        _initializeAsyncState() {
            null !== this._asyncTimeoutId && clearTimeout(this._asyncTimeoutId), this.asyncState = t.initial, this._asyncTimeoutId = null, this._asyncPromises = [], this._asyncCounts = {
                pending: 0,
                fulfilled: 0,
                rejected: 0
            }
        }
    };
export {
    s as A, t as a
};