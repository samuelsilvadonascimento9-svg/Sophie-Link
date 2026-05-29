/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduWidgetsModule
 * @name eduWidgetsFactory
 * @object factory
 *
 * @created 15/02/2017 v12.1.16
 * @updated
 *
 * @requires eduWidgetsModule
 *
 * @description Factory utilizada nos widgets.
 */
define(['widgets/widget.module'], function() {

    'use strict';

    angular
        .module('eduWidgetsModule')
        .factory('eduWidgetsFactory', EduWidgetsFactory);

    EduWidgetsFactory.$inject = ['$totvsresource'];

    /**
     * Factory dos widgets
     * @param   {object} $totvsresource Objeto responsável pela chamado dos serviços REST
     * @returns {object} Factory com os serviços
     */
    function EduWidgetsFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Widget/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});

        factory.getWidgets = getWidgets;
        factory.getWidgetData = getWidgetData;
        factory.getWidgetsFavoritos = getWidgetsFavoritos;
        factory.savePrefUser = savePrefUser;
        factory.getWidgetDataWithParams = getWidgetDataWithParams;

        return factory;

        /**
         * Obtém os widgets de uma determinada funcionalidade
         * @param   {int}      idFuncionalidade Identificador da funcionalidade
         * @param   {function} callback         Função de retorno
         * @returns {Array}    Lista de widgets
         */
        function getWidgets(idFuncionalidade, callback) {
            var params = {
                method: 'DadosWidgets',
                idFuncionalidade: idFuncionalidade
            };

            return this.TOTVSQuery(params, callback);
        }

        /**
         * Obtém os dados de um widget específico
         * @param   {int}      idFuncionalidade Identificador da funcionalidade
         * @param   {int}      idWidget         Identificador do Widget
         * @param   {function} callback         Função de retorno
         * @returns {object}   Objeto Widget com os dados
         */
        function getWidgetData(idFuncionalidade, idWidget, callback) {
            var params = {
                method: 'DadosWidgetPorId',
                idFuncionalidade: idFuncionalidade,
                idWidget: idWidget
            };

            return this.TOTVSGet(params, callback);
        }

        function getWidgetDataWithParams(idFuncionalidade, idWidget, params, callback) {
            var params = {
                method: 'DadosWidgetPorIdWithParams',
                idFuncionalidade: idFuncionalidade,
                idWidget: idWidget,
                arrayParams: params
            };

            return this.TOTVSGet(params, callback);
        }

        /**
         * Obtém os widgets favoritos para o mural
         * @param   {function} callback         Função de retorno
         * @returns {Array}    Lista de widgets favoritos
         */
        function getWidgetsFavoritos(callback) {
            var params = {
                method: 'DadosWidgetsFavoritos'
            };

            return this.TOTVSQuery(params, callback);
        }

        /**
         * Salva as preferências de Usuário para Widgets
         * @param   {Array}    objWidgetList Lista de Widgets para salvar
         * @param   {function} callback      Função de Retorno
         * @returns {object}   Resposta do serviço
         */
        function savePrefUser(objWidgetList, callback) {
            var params = {
                method: 'SalvaPreferenciaUsuario',
            };

            return this.TOTVSPost(params, objWidgetList, callback);
        }
    }
});