const asbInit = function() {
    // don't add for pages inside iframe
    if (window.self != window.top)
        return;

    // URLs dos arquivos hospedados no AWS e do Font Awesome
    var cssFiles = [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css", // Font Awesome

        "https://adventistas.brightspace.com/shared/java-script-management/plugin-acessibilidade/css/default.css", // Caminho local para default.css
        "https://adventistas.brightspace.com/shared/java-script-management/plugin-acessibilidade/css/asb.css", // Caminho local para asb.css
    ];
    var jsFile = "https://adventistas.brightspace.com/shared/java-script-management/plugin-acessibilidade/js/asb.js"; // Caminho local para asb.js

    // Função para adicionar CSS ao head
    cssFiles.forEach(function(href) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    });

    // Função para adicionar JavaScript ao body
    var script = document.createElement("script");
    script.src = jsFile;
    document.body.appendChild(script);
};
document.addEventListener("DOMContentLoaded", asbInit);