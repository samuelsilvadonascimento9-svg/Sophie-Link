const vlibrasInit = function() {
    // don't add for pages inside iframe
    if (window.self != window.top)
        return;

    var vlibrasContainer = document.createElement("div");
    vlibrasContainer.setAttribute("vw", "");
    vlibrasContainer.className = "enabled";

    var vlibrasAccessButton = document.createElement("div");
    vlibrasAccessButton.setAttribute("vw-access-button", "");
    vlibrasAccessButton.className = "active";

    var vlibrasPluginWrapper = document.createElement("div");
    vlibrasPluginWrapper.setAttribute("vw-plugin-wrapper", "");

    var vlibrasPluginTopWrapper = document.createElement("div");
    vlibrasPluginTopWrapper.className = "vw-plugin-top-wrapper";
    vlibrasPluginWrapper.append(vlibrasPluginTopWrapper);

    vlibrasContainer.append(vlibrasAccessButton, vlibrasPluginWrapper);

    var vlibrasScript = document.createElement("script");
    vlibrasScript.onload = function() {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
    };
    vlibrasScript.src = "https://vlibras.gov.br/app/vlibras-plugin.js";

    document.body.append(vlibrasContainer, vlibrasScript);
};
document.addEventListener("DOMContentLoaded", vlibrasInit);