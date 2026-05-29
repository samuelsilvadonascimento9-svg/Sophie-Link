/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduPgtoBoletosListController
 * @object controller
 *
 * @created 2023-08-31 v12.1.2310
 * @updated
 *
 * @requires Financeiro.module
 *
 * @description Controller exibição do valor liquido dos boletos selecionados para pagamento
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.factory',
    'aluno/carteira-digital/carteira-digital.service'
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduPgtoBoletosListController', EduPgtoBoletosListController);

    EduPgtoBoletosListController.$inject = [
        '$scope',
        'parametros',
        'EduPaymentsFactory',
        'EduFinanceiroFactory',
        'EduFinanceiroService',
        'eduCarteiraDigitalService',
        '$filter',
        '$modalInstance',
        'totvs.app-notification.Service',
        'eduEnumsConsts',
        'TotvsDesktopContextoCursoFactory',
        'i18nFilter'
    ];

    /**
     * Controller exibição do valor liquido dos boletos selecionados para pagamento
     * @param   {object} parametros                 Objeto com parametros
     * @param   {object} EduPaymentsFactory         Factory para pagamentos
     * @param   {object} eduCarteiraDigitalService  Serviço carteira digital
     */
    function EduPgtoBoletosListController($scope,
        parametros,
        EduPaymentsFactory,
        EduFinanceiroFactory,
        eduFinanceiroService,
        eduCarteiraDigitalService,
        $filter,
        $modalInstance,
        totvsNotification,
        eduEnumsConsts,
        TotvsDesktopContextoCursoFactory,
        i18nFilter
    ) {

        // *********************************************************************************
        // *** Variáveis
        // *********************************************************************************
        let self = this;
        self.bankBilletsList = [];
        self.totalAmount = null;
        self.paymentSummary = null;
        self.modalInstance = $modalInstance;
        self.tipoPagamento = null;
        self.exibirBtnAvancarBoleto = true;
        self.contextoAtual = [];

        // *********************************************************************************
        // *** Funções públicas
        // *********************************************************************************
        self.pagarBoleto = pagarBoleto;
        self.tipoPagamentoBoleto = tipoPagamentoBoleto;

        // *********************************************************************************
        // *** Inicializa Controller
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {
            self.totalAmount = 0;

            validaBoletosSelecionados();
            self.contextoAtual = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

            if (parametros.TipoPagamento != undefined && parametros.TipoPagamento != null) {
                carregarValorPixCartao();
            } else {
                carregarValorBoleto();
                self.tipoPagamento = eduEnumsConsts.EduTipoPagamentoEnum.Boleto
            }
        }

        /**
         * Caso não houver boletos selecionados um alerta é exibido e o modal é fechado
         */
        function validaBoletosSelecionados() {
            if (parametros.boletosSelecionados == undefined || parametros.boletosSelecionados.length == 0) {
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-Atencao'),
                    detail: i18nFilter('l-alerta-nenhum-boleto-selecionado', [], 'js/aluno/financeiro/lancamentos')
                });
                self.modalInstance.dismiss();
            }
        }

        /**
         * Faz o carregamento do resumo dos valores para pagamento via PIX e cartão
         */
        function carregarValorPixCartao() {
            let internalIdsBoleto = parametros.boletosSelecionados.map(b => b.InternalId);
            EduPaymentsFactory.getResumoPagamentoMultiplosBoletos(internalIdsBoleto, parametros.TipoPagamento, self.contextoAtual.entrarComo,
                function(result) {
                    if (result) {
                        self.paymentSummary = result;
                        self.totalAmount = result.RESUMOPAGTO.map(v => v.paymentNetTotalAmount).reduce((valor1, valor2) => valor1 + valor2);
                        angular.forEach(parametros.boletosSelecionados, function(boleto) {
                            let splitedInternalId = boleto.InternalId.split('|');
                            let companyCode = parseInt(splitedInternalId[0]);
                            let bankBilletCode = parseInt(splitedInternalId[1]);

                            let bankBillet = result.RESUMOPAGTO.find(r => r.bankBilletsList.find(b => b.companyCode == companyCode && b.bankBilletCode == bankBilletCode))
                            if (bankBillet) {
                                addBankBillet(boleto.InternalId, boleto.dueDate, bankBillet.paymentNetTotalAmount, boleto.dueDate);
                            }
                        });
                        validaBoletosCancelados(self.totalAmount);
                    } else {
                        self.modalInstance.dismiss();
                    }
                });
        }

        /**
         * Caso boletos selecionados forem cancelados um alerta é exibido e o modal é fechado
         */
        function validaBoletosCancelados(valor) {
            if (valor <= 0) {
                self.exibirBtnAvancarBoleto = false;

                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-Atencao'),
                    detail: i18nFilter('l-mensagem-boleto-cancelado', [], 'js/aluno/financeiro/lancamentos')
                });
                self.modalInstance.dismiss();
            }
        }

        /**
         * Faz o carregamento dos valores para pagamento via boleto bancário
         */
        function carregarValorBoleto() {
            let boleto = parametros.boletosSelecionados[0];

            let splitedInternalId = boleto.InternalId.split('|');
            let bankBilletCode = parseInt(splitedInternalId[1]);

            EduFinanceiroFactory.obterValorLiquidoBoleto(bankBilletCode, function(valorSimulacao) {
                if (valorSimulacao) {
                    self.paymentSummary = boleto;
                    self.totalAmount = valorSimulacao;
                } else {
                    self.exibirBtnAvancarBoleto = false;
                }
                let valorBoleto = boleto.paymentNetAmount == undefined ? self.totalAmount : boleto.paymentNetAmount;
                addBankBillet(boleto.InternalId, boleto.dueDate, valorBoleto, boleto.dueDate);
            });
        }

        function addBankBillet(internalId, paymentReference, paymentValue, dueDate) {
            self.bankBilletsList.push({
                'internalId': internalId,
                'paymentReference': eduCarteiraDigitalService.converteData(paymentReference),
                'paymentValue': $filter('currency')(paymentValue),
                'dueDate': $filter('date')(dueDate, 'dd/MM/yyyy')
            });
        }

        function tipoPagamentoBoleto() {
            return (self.tipoPagamento === eduEnumsConsts.EduTipoPagamentoEnum.Boleto)
        }

        function pagarBoleto() {
            $scope.$close(self.paymentSummary);
        }
    }
});