window.requestIdleCallback = window.requestIdleCallback || function(e) {
    const n = Date.now();
    return setTimeout(() => {
        e({
            didTimeout: !1,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - n))
            }
        })
    }, 1)
}, window.cancelIdleCallback = window.cancelIdleCallback || function(e) {
    clearTimeout(e)
};