/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.27
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-desktop/totvs-desktop.module'], function() {

    'use strict';

    angular
        .module('totvsDesktop')
        .factory('totvsDesktopTermoConsentimentoFactory', totvsDesktopTermoConsentimentoFactory);

    totvsDesktopTermoConsentimentoFactory.$inject = [
        '$totvsresource'
    ];

    function totvsDesktopTermoConsentimentoFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/v1/Contexto/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});
        factory.consultaAceiteTermosConsentimento = consultaAceiteTermosConsentimento;
        factory.realizaAceiteTermosConsentimento = realizaAceiteTermosConsentimento;
        factory.exibirRelatorioTermoConsentimento = exibirRelatorioTermoConsentimento;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function exibirRelatorioTermoConsentimento(codColigadaRelatorio, idRelatorio, callback) {
            var parameters = [];
            parameters['method'] = 'GeraRelatorioTermoConsentimento';
            parameters['codColigadaRelatorio'] = codColigadaRelatorio;
            parameters['idRelatorio'] = idRelatorio;

            factory.TOTVSQuery(parameters, callback);
        }

        function consultaAceiteTermosConsentimento(callback) {
            var parameters = [];
            parameters['method'] = 'ConsultaAceiteTermosConsentimento';

            factory.TOTVSGet(parameters, callback);
        }

        function realizaAceiteTermosConsentimento(parametrosTermo, callback) {
            var parameters = [];
            parameters['method'] = 'RealizaAceiteTermosConsentimento';

            factory.TOTVSSave(parameters, parametrosTermo, callback);
        }
    }
});