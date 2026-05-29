/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduImpressaoReciboController
 * @object controller
 *
 * @created 2020-10-15 v12.1.31
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller da impressão de Recibo
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.new.route',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/financeiro.service'
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduImpressaoReciboController', EduImpressaoReciboController);

    EduImpressaoReciboController.$inject = [
        'parametros',
        '$modalInstance',
        'totvs.app-notification.Service',
        'i18nFilter',
        'EduFinanceiroService'
    ];

    /**
     * Controller da impressão de recibo
     * @param   {object} parametros           Objeto com parametros
     * @param   {object} $modalInstance       Objeto para janela modal
     */
    function EduImpressaoReciboController(
        parametros,
        $modalInstance,
        totvsNotification,
        i18nFilter,
        eduFinanceiroService) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.imprimirRecibo = imprimirRecibo;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {

            self.idBoleto = parametros.idBoleto;
            self.objRelatorioRecibo = parametros.objRelatorioRecibo;

        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************
        function imprimirRecibo(idBoleto) {
            eduFinanceiroService.visualizarRecibo(idBoleto, function(objRecibo) {});
        }

    }
});