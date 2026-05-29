/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */
define(['setup/setup.module'], function() {

    'use strict';

    angular
        .module('eduSetupModule')
        .factory('eduSSOFactory', EduSSOFactory);

    EduSSOFactory.$inject = ['$totvsresource'];

    function EduSSOFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory = $totvsresource.REST(url, {}, {});

        factory.getMenuCorporeRMAsync = getMenuCorporeRMAsync;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getMenuCorporeRMAsync(callback) {

            var parameters = {
                method: 'AcessoPortalCorporeRM'
            };

            return factory.TOTVSQuery(parameters, callback);
        }
    }
});