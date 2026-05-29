/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduWidgetsModule
 * @name eduWidgetsService
 * @object service
 *
 * @created 02/03/2017 v12.1.16
 * @updated
 *
 * @requires eduWidgetsModule
 *
 * @description Service utilizada nos Widgets.
 */
define(['widgets/widget.module', 'widgets/widget.factory'], function() {

    'use strict';

    angular
        .module('eduWidgetsModule')
        .service('eduWidgetsService', EduWidgetsService);

    EduWidgetsService.$inject = ['eduWidgetsFactory'];

    /**
     * Service para os widgets
     */
    function EduWidgetsService(objWidgetFactory) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.getWidgetDataByController = getWidgetDataByController;
        self.getWidgetDataByFactory = getWidgetDataByFactory;
        self.getWidgetDataByFactoryWithParams = getWidgetDataByFactoryWithParams;

        // *********************************************************************************
        // *** Public functions
        // *********************************************************************************

        /**
         * @public
         * @function Obtém os dados de um widget pelo escopo
         * @param   {object} scope Escopo onde o widget se encontra
         * @returns {object} Dados do widget
         */
        function getWidgetDataByController(scope) {
            return widgetData(scope);
        }

        /**
         * @public
         * @function Obtém dados de um widget pelo serviço
         * @param {int}      idFuncionalidade Identificador da funcionalidade
         * @param {int}      idWidget         Identificador do widget
         * @callback callback Função de retorno
         */
        function getWidgetDataByFactory(idFuncionalidade, idWidget, callback) {
            objWidgetFactory.getWidgetData(idFuncionalidade, idWidget, callback);
        }

        function getWidgetDataByFactoryWithParams(idFuncionalidade, idWidget, params, callback) {
            objWidgetFactory.getWidgetDataWithParams(idFuncionalidade, idWidget, params, callback);
        }

        // *********************************************************************************
        // *** Private functions
        // *********************************************************************************

        /**
         * @private
         * @function Obtém os dados de um widget pelo escopo
         * @param   {object} scope Escopo onde o widget se encontra
         * @returns {object} Dados do widget
         */
        function widgetData(scope) {
            var objWidgetData = null;

            if (angular.isDefined(scope.$parent) && angular.isDefined(scope.$parent.objWidget)) {
                objWidgetData = scope.$parent.objWidget;
            } else if (angular.isDefined(scope.$parent)) {
                objWidgetData = widgetData(scope.$parent);
            }

            return objWidgetData;
        }
    }
});