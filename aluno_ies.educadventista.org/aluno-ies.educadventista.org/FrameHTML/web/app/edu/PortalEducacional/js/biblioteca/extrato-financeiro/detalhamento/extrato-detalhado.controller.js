/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2013 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module bibExtratoFinanceiroModule
 * @name BibExtratoDetalhadoController
 * @object controller
 *
 * @created 10/03/2023 v12.1.2306
 * @updated
 *
 * @requires extrato-financeiro.module
 *
 * @dependencies EduExtratoFinanceiroFactory
 *
 * @description Controller exibição do detalhamento do boleto
 */
define(['biblioteca/extrato-financeiro/extrato-financeiro.module',
    'biblioteca/extrato-financeiro/extrato-financeiro.route',
    'utils/edu-enums.constants',
    'biblioteca/extrato-financeiro/extrato-financeiro.factory'
], function() {

    'use strict';

    angular.module('bibExtratoFinanceiroModule')
        .controller('BibExtratoDetalhadoController', BibExtratoDetalhadoController);

    BibExtratoDetalhadoController.$inject = [
        'parametros',
        '$filter',
        '$modalInstance',
        'totvs.app-notification.Service',
        'i18nFilter',
        'eduEnumsConsts',
        'bibExtratoFinanceiroFactory'
    ];

    /**
     * Controller exibição do detalhamento do boleto
     * @param   {object} parametros           Objeto com parametros
     * @param   {object} $modalInstance       Objeto para janela modal
     */
    function BibExtratoDetalhadoController(
        parametros,
        $filter,
        $modalInstance,
        totvsNotification,
        i18nFilter,
        eduEnumsConsts,
        bibExtratoFinanceiroFactory) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;
        self.listaParcelas = [];
        self.textoStatusPagamento = null;
        self.vencimento = null;
        self.dadosGridExtratoDetalhado = [];
        self.valorTotal = parametros.OriginalValue;
        self.dataVencimento = new Date(parametros.DueDate).toLocaleDateString('pt-BR');

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.converteData = converteData;
        self.getValorTotal = getValorTotal;
        self.mostrarDetalhe = mostrarDetalhe;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        function init() {
            getDataDridInferior();
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getDataDridInferior() {

            var dadosLancamento = {
                BookLoanCode: parametros.BookLoanCode,
                LoanRepaymentDate: new Date(parametros.LoanRepaymentDate).toLocaleDateString('pt-BR'),
                BookloanPaymentValue: $filter('currency')(parametros.BookloanPaymentValue),
                PenaltyValue: $filter('currency')(parametros.PenaltyValue),
                BookloanFullPaymentValue: $filter('currency')(parametros.BookloanFullPaymentValue)
            };
            self.dadosGridExtratoDetalhado.push(dadosLancamento);

            parametros.AgrupedFinancial.forEach(function(value) {
                var dadosLancamentosAgrupados = {
                    BookLoanCode: value.BookLoanCode,
                    LoanRepaymentDate: new Date(value.LoanRepaymentDate).toLocaleDateString('pt-BR'),
                    BookloanPaymentValue: $filter('currency')(value.BookloanPaymentValue),
                    PenaltyValue: $filter('currency')(value.PenaltyValue),
                    BookloanFullPaymentValue: $filter('currency')(value.BookloanFullPaymentValue)
                };
                self.dadosGridExtratoDetalhado.push(dadosLancamentosAgrupados);
            });
        }

        function isPossuiOutrasCobrancas() {
            return isDefinedNotNull(self.outrasCobrancas);
        }

        function getValorTotal() {
            if (isPossuiOutrasCobrancas()) {
                return self.valorTotal + self.outrasCobrancas.Amount;
            }
            return self.valorTotal;
        }

        function mostrarDetalhe(detalhe) {

            return parseFloat(detalhe.Amount) > 0;
        }

        function isDefinedNotNull(objeto) {
            return (angular.isDefined(objeto) && objeto !== null);
        }

        function converteData(data) {
            if (data) {
                return $filter('date')(data, 'dd/MM/y');
            }
        }
    }
});