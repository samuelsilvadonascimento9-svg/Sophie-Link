/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.2502
 * (c) 2019-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduAtividadesAcademicasAlertaModule
 * @name eduAtividadesAcademicasAlertaFactory
 * @object factory
 * @description Factory utilizada no alerta das atividades acadêmicas.
 */
define(['aluno/atividades-academicas/atividades-academicas-alerta.module'], function() {

    'use strict';

    angular
        .module('eduAtividadesAcademicasAlertaModule')
        .factory('eduAtividadesAcademicasAlertaFactory', EduAtividadesAcademicasAlertaFactory);

    EduAtividadesAcademicasAlertaFactory.$inject = ['$totvsresource'];

    function EduAtividadesAcademicasAlertaFactory($totvsresource) {

        let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory = $totvsresource.REST(url, {}, {});

        factory.getAlertaAtividadesAcademicas = getAlertaAtividadesAcademicas;
        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Buscar as atividades acadêmicas conforme a parametrização de alerta forem atendidas
         *
         * @param {any} callback - Função de callback, se necessário.
         */
        function getAlertaAtividadesAcademicas(callback) {
            let parameters = {};
            parameters['method'] = 'v1/AtividadeOfertada/AlertaAtividadesAcademicas';
            return factory.TOTVSQuery(parameters, callback);
        }
    }
});