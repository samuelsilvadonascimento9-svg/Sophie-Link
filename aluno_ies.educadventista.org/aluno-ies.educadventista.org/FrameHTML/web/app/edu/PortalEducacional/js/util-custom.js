(function() {

    buscarCSSDinamico();

    /**
     * Carrega o css de forma dinâmica de acordo com a configuração
     */
    function buscarCSSDinamico() {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'screen';
        link.href = 'assets/css/fonts.css?v=' + Date.now();

        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'screen';

        if (EDU_CONST_GLOBAL_CUSTOM_CSS) {
            link.href = 'assets/custom/css/eduPortalAluno.css';
        } else {
            link.href = 'assets/css/eduPortalAluno.css';
        }

        document.head.appendChild(link);
    }
})();