const e = "d2l-mathjax",
    t = "https://s.brightspace.com/lib/mathjax/3.2.2",
    a = new Map([
        ["MJXTEX", "MathJax_Main-Regular"],
        ["MJXTEX-B", "MathJax_Main-Bold"],
        ["MJXTEX-I", "MathJax_Math-Italic"],
        ["MJXTEX-MI", "MathJax_Main-Italic"],
        ["MJXTEX-BI", "MathJax_Math-BoldItalic"],
        ["MJXTEX-S1", "MathJax_Size1-Regular"],
        ["MJXTEX-S2", "MathJax_Size2-Regular"],
        ["MJXTEX-S3", "MathJax_Size3-Regular"],
        ["MJXTEX-S4", "MathJax_Size4-Regular"],
        ["MJXTEX-A", "MathJax_AMS-Regular"],
        ["MJXTEX-C", "MathJax_Calligraphic-Regular"],
        ["MJXTEX-CB", "MathJax_Calligraphic-Bold"],
        ["MJXTEX-FR", "MathJax_Fraktur-Regular"],
        ["MJXTEX-FRB", "MathJax_Fraktur-Bold"],
        ["MJXTEX-SS", "MathJax_SansSerif-Regular"],
        ["MJXTEX-SSB", "MathJax_SansSerif-Bold"],
        ["MJXTEX-SSI", "MathJax_SansSerif-Italic"],
        ["MJXTEX-SC", "MathJax_Script-Regular"],
        ["MJXTEX-T", "MathJax_Typewriter-Regular"],
        ["MJXTEX-V", "MathJax_Vector-Regular"],
        ["MJXTEX-VB", "MathJax_Vector-Bold"]
    ]);
class n {
    get contextKeys() {
        return [e]
    }
    async render(t, a) {
        if (!a.contextValues) return t;
        const n = a.contextValues.get(e) || {
            renderLatex: !1,
            outputScale: 1
        };
        if (!(t.querySelector("math") || n.renderLatex && /\$\$|\\\(|\\\[|\\begin{|\\ref{|\\eqref{/.test(t.innerHTML))) return t;
        const r = {
            deferTypeset: !0,
            renderLatex: n.renderLatex,
            outputScale: n.outputScale || 1,
            window: window
        };
        await o(r), t.querySelectorAll('mspace[linebreak="newline"]').forEach(e => {
            e.style.display = "block", e.style.height = "0.5rem"
        }), t.querySelectorAll("math mmultiscripts > none").forEach(e => {
            const t = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mrow");
            e.replaceWith(t)
        }), a.noDeferredRendering || (t.innerHTML = `<mjx-doc><mjx-head></mjx-head><mjx-body>${t.innerHTML}</mjx-body></mjx-doc>`), await window.MathJax.startup.promise, window.D2L = window.D2L || {}, window.D2L.renderingPromise || (window.D2L.renderingPromise = Promise.resolve()), window.D2L.renderingPromise = window.D2L.renderingPromise.then(() => window.MathJax.typesetShadow(t.getRootNode(), t)), await window.D2L.renderingPromise
    }
    async getLoadingComplete() {
        return new Promise(e => setTimeout(e, 100))
    }
}

function r() {
    return new n
}

function o(e) {
    const n = e && e.window || window;
    if (n.D2L = n.D2L || {}, n.D2L.mathJaxLoaded) return n.D2L.mathJaxLoaded;
    if (n.MathJax = {
            chtml: {
                adaptiveCSS: !1,
                scale: e && e.outputScale || 1
            },
            options: {
                menuOptions: {
                    settings: {
                        zoom: "None"
                    }
                },
                skipHtmlTags: ["d2l-html-block"]
            },
            loader: {
                load: ["ui/menu"]
            },
            startup: {
                ready: () => {
                    const e = n.MathJax._.mathjax.mathjax,
                        t = n.MathJax._.adaptors.HTMLAdaptor.HTMLAdaptor,
                        a = n.MathJax._.handlers.html.HTMLHandler.HTMLHandler,
                        r = n.MathJax._.core.Handler.AbstractHandler.prototype,
                        o = n.MathJax.startup,
                        d = e => {
                            const t = e.firstChild;
                            return t && t.nodeType !== Node.ELEMENT_NODE ? t.nextElementSibling : t
                        };
                    class i extends t {
                        body(e) {
                            return e.body || (d(e) || {}).lastChild || e
                        }
                        create(e, t) {
                            const a = this.document.createElement ? this.document : this.window.document;
                            return t ? a.createElementNS(t, e) : a.createElement(e)
                        }
                        head(e) {
                            return e.head || (d(e) || {}).firstChild || e
                        }
                        root(e) {
                            return e.documentElement || d(e) || e
                        }
                        text(e) {
                            return (this.document.createTextNode ? this.document : this.window.document).createTextNode(e)
                        }
                    }
                    o.registerConstructor("HTMLHandler", class extends a {
                        create(e, t) {
                            const a = this.adaptor;
                            if ("string" == typeof e) e = a.parse(e, "text/html");
                            else if ((e instanceof a.window.HTMLElement || e instanceof a.window.DocumentFragment) && !(e instanceof n.ShadowRoot)) {
                                const t = e;
                                e = a.parse("", "text/html"), a.append(a.body(e), t)
                            }
                            return r.create.call(this, e, t)
                        }
                    }), o.registerConstructor("browserAdaptor", () => new i(n)), n.MathJax.typesetShadow = async function(t, a) {
                        const n = o.getInputJax(),
                            r = o.getOutputJax(),
                            d = e.document(t, {
                                InputJax: n,
                                OutputJax: r
                            });
                        a && (d.options.elements = [a]), await e.handleRetriesFor(() => d.render()), d.typeset()
                    }, n.MathJax.startup.defaultReady()
                },
                typeset: !(e && e.deferTypeset)
            }
        }, e && e.deferTypeset && !n.document.head.querySelector("#d2l-mathjax-fonts") && !n.document.head.querySelector("#MJX-CHTML-styles")) {
        const e = n.document.createElement("style");
        e.id = "d2l-mathjax-fonts";
        let r = "";
        a.forEach((e, a) => {
            r += `\n@font-face {\n\t\t\t\t\tfont-family: ${a};\n\t\t\t\t\tsrc: url("${t}/output/chtml/fonts/woff-v2/${e}.woff") format("woff");\n\t\t\t\t}`
        }), e.textContent = r, n.document.head.appendChild(e)
    }
    return n.D2L.mathJaxLoaded = new Promise(a => {
        const r = n.document.createElement("script");
        r.async = "async", r.onload = a;
        const o = e && e.renderLatex ? "tex-mml-chtml" : "mml-chtml";
        r.src = `${t}/${o}.js`, n.document.head.appendChild(r)
    }), n.D2L.mathJaxLoaded
}
export {
    r as c, o as l
};