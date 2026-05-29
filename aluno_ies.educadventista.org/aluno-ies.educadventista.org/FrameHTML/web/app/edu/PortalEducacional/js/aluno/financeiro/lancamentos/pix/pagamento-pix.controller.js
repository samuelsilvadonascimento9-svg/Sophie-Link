/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduPagamentoPixController
 * @object controller
 *
 * @created 2020-01-06 v12.1.32
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller do pagamento via Pix
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.factory',
    'utils/edu-utils.factory'
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduPagamentoPixController', EduPagamentoPixController);

    EduPagamentoPixController.$inject = [
        'parametros',
        '$modalInstance',
        'eduUtilsFactory'
    ];

    /**
     * Controller do pagamento com o Pix
     * @param   {object} parametros         Objeto com parametros
     * @param   {object} $modalInstance     Objeto para janela modal
     * @param   {object} eduUtilsFactory    Funções utils
     */
    function EduPagamentoPixController(
        parametros,
        $modalInstance,
        eduUtilsFactory
    ) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.sendMessageEvent = sendMessageEvent;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {
            if (angular.isDefined(parametros))
                self.sendMessageEvent();
        }

        function sendMessageEvent() {
            eduUtilsFactory.getAuthParams(sendMessageEventCallBack);
        }

        function sendMessageEventCallBack(authParams) {
            let paymentList = new Array();

            angular.forEach(parametros.boletos, function(boleto) {
                let item = {
                    companyId: parametros.codColigada,
                    branchId: parametros.codFilial,
                    type: "Boleto",
                    id: boleto
                }
                paymentList.push(item);
            });

            const paramsPaymentQrCode = {
                tokenAcesso: authParams.TokenAcesso,
                pathImageErrorSvg: 'js/elements/assets/images/error_loading.png',
                origin: 'Student',
                params: {
                    amount: parametros.valorTotal,
                    items: paymentList
                }
            }

            const eventGeneratePaymentQrCode = new CustomEvent('eventGeneratePaymentQrCode', {
                detail: paramsPaymentQrCode
            });
            dispatchEvent(eventGeneratePaymentQrCode);
        }
    }
});