/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-app.module',
    'utils/interceptors/edu-interceptors.factory'
], function() {

    'use strict';

    angular
        .module('totvsApp')
        .config(totvsAppConfig);

    totvsAppConfig.$inject = ['$httpProvider', 'TotvsI18nProvider', '$compileProvider', 'TotvsGridProvider'];

    function totvsAppConfig($httpProvider, TotvsI18nProvider, $compileProvider, TotvsGridProvider) {

        $httpProvider.interceptors.push('totvsHttpInterceptor');
        $httpProvider.interceptors.push('EduInterceptors');

        TotvsGridProvider.hyphenateProperties(false);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);

        //Variável global 'CONST_GLOBAL_URL_BASE_APP' definida antes do carregamento da aplicação
        TotvsI18nProvider.setBaseContext(EDU_CONST_GLOBAL_URL_BASE_APP);

    }
});