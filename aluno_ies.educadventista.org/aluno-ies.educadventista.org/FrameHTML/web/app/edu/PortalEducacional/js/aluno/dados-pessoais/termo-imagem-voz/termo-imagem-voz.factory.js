/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduResponsaveisModule
 * @name eduTermoImagemVozFactory
 * @object factory
 *
 * @dependencies $totvsresource
 *
 */
define(['aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.module'], function() {

    'use strict';

    angular
        .module('eduTermoImagemVozModule')
        .factory('eduTermoImagemVozFactory', EduTermoImagemVozFactory);

    EduTermoImagemVozFactory.$inject = ['$totvsresource'];

    function EduTermoImagemVozFactory($totvsresource) {

        let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Aluno/:method',
            factory = $totvsresource.REST(url, {}, {});

        factory.getTermoImagemVoz = getTermoImagemVoz;
        factory.updateTermoImagemVoz = updateTermoImagemVoz;
        factory.enviarTokenTermoImagemVoz = enviarTokenTermoImagemVoz;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getTermoImagemVoz(paramsTermo, callback) {
            let parameters = {
                method: 'TermoImagemVoz/',
                obterNomeResponsavel: paramsTermo.obterNomeResponsavel,
                incluirRelatorio: paramsTermo.incluirRelatorio,
                somenteStatus: paramsTermo.somenteStatus
            };

            return factory.TOTVSGet(parameters, callback);
        }

        function updateTermoImagemVoz(body, callback) {
            let parameters = {
                method: 'TermoImagemVoz',
            }

            return factory.TOTVSUpdate(parameters, body, callback);
        }

        function enviarTokenTermoImagemVoz(body, callback) {
            let parameters = {
                method: 'TermoImagemVoz/EnviarToken',
            }

            return factory.TOTVSPost(parameters, body, callback);
        }
    }
});