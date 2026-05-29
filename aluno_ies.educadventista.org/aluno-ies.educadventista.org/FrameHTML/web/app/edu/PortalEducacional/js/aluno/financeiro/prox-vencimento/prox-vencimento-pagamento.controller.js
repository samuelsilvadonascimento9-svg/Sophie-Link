/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.16
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/financeiro.service',
    'utils/reports/edu-relatorio.service',
    'utils/edu-utils.factory',
    'utils/edu-enums.constants',
    'aluno/financeiro/lancamentos/lancamentos-pagcartao.controller'
], function() {

    'use strict';

    angular
        .module('eduFinanceiroModule')
        .controller('EduProxVencimentoPagamentoController', EduProxVencimentoPagamentoController);

    EduProxVencimentoPagamentoController.$inject = [
        '$modalInstance',
        'EduFinanceiroFactory',
        'EduFinanceiroService',
        'eduUtilsFactory',
        'eduEnumsConsts',
        'totvs.app-notification.Service',
        '$boleto',
        'i18nFilter',
        'TotvsDesktopContextoCursoFactory'
    ];

    function EduProxVencimentoPagamentoController(
        $modalInstance,
        EduFinanceiroFactory,
        EduFinanceiroService,
        eduUtilsFactory,
        eduEnumsConsts,
        totvsNotification,
        $boleto,
        i18nFilter,
        TotvsDesktopContextoCursoFactory) {

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        let self = this;
        self.paramEdu = null;
        self.dadosBoleto = {};
        self.PermitePagCartaoCredito = false;
        self.IdRelatBoletosDotNetExe = null;
        self.exibeBtnBoleto = false;
        self.exibeBtnCartao = false;
        self.exibeBtnPix = false;
        self.exibeLinkFinanceiro = true;
        self.bankBilletCodeAtual = 0;
        self.ourNumberBankingAtual = '';
        self.dtVencimentoAtual = new Date();
        self.PermiteAlteracaoDataVencimentoBoletoPortal = false;
        self.modalInstance = $modalInstance;
        self.IsPay = false;
        self.contextoAtual = [];

        // metódos
        self.getDados = getDados;
        self.pagarBoleto = pagarBoleto;
        self.exibirDadosPagCartao = exibirDadosPagCartao;
        self.exibirDadosPix = exibirDadosPix;
        self.exibirModalSimulacao = exibirModalSimulacao;
        self.copiarCodBarras = copiarCodBarras;

        // inicializador
        init();

        /**
         * Inicializa o controller.
         */
        function init() {
            getDados();
            carregarParametrosEdu();
            self.contextoAtual = TotvsDesktopContextoCursoFactory.getCursoSelecionado();
        }

        /**
         *
         */
        function getDados() {
            if ($boleto)
                self.dadosBoleto = $boleto;
        }


        /**
         * Exibe o boleto
         * @param {any} boleto - Boleto retornado na consulta
         */
        function pagarBoleto(boleto) {
            let boletosSelecionados = new Array();
            boletosSelecionados.push(boleto);

            EduFinanceiroFactory.exibirListaBoletosSelecionadosPagamento(boletosSelecionados, null, function() {
                if (self.IdRelatBoletosDotNetExe != null) {
                    EduFinanceiroFactory.exibirModalBoletoExtratoFinanceiroNovo(boleto.companyCode, boleto.bankBilletCode, boleto.ourNumberBanking, boleto.dueDate, boleto.canPayWithBilletBarCode, self.paramEdu);
                    self.modalInstance.dismiss();
                } else {
                    totvsNotification.notify({
                        type: 'error',
                        detail: i18nFilter('l-boleto-indisponivel')
                    })
                }
            });
        }

        /**
         * Mostra o modal com os dados de pagamento para cartão de crédito
         * @param {any}  boleto - Boleto retornado na consulta
         */
        function exibirDadosPagCartao(boleto) {
            let boletosSelecionados = new Array();
            boletosSelecionados.push(boleto);

            EduFinanceiroFactory.exibirListaBoletosSelecionadosPagamento(boletosSelecionados, eduEnumsConsts.PaymentsFormaPgtoCalcLiquido.CartaoCredito, function(paymentSummary) {
                EduFinanceiroFactory.exibirDadosPagCartaoMultiBoleto(boletosSelecionados.map(b => b.InternalId), self.IsPay, paymentSummary);
                self.modalInstance.dismiss();
            });
        }

        /**
         * Exibe PIX
         *
         * @param {any} boleto - Boleto retornado na consulta
         */
        function exibirDadosPix(boleto) {
            let boletosSelecionados = new Array();
            boletosSelecionados.push(boleto);

            EduFinanceiroFactory.exibirListaBoletosSelecionadosPagamento(boletosSelecionados, eduEnumsConsts.PaymentsFormaPgtoCalcLiquido.Pix, function(paymentSummary) {
                EduFinanceiroService.visualizarPixMultiBoletos(boletosSelecionados.map(b => b.InternalId), paymentSummary, self.contextoAtual.entrarComo);
                self.modalInstance.dismiss();
            });
        }

        /**
         * Copia o código de barras do boleto
         * @param {any} boleto - Boleto retornado na consulta
         */
        function copiarCodBarras(boleto) {
            EduFinanceiroFactory.obterCodigoBarrasBoleto(boleto.companyCode, boleto.bankBilletCode, boleto.ourNumberBanking, boleto.dueDate, function(result) {
                if (result && result.length > 0 && EduFinanceiroService.validaCodigoIpte(result[0].IPTE)) {
                    EduFinanceiroFactory.exibirDadosCodigoBarras(result[0].IPTE);
                    self.modalInstance.dismiss();
                }
            });
        }

        /**
         * Exibe modal para simulação de alteração de data de vencimento
         * @param {any} boleto - Boleto retornado na consulta
         */
        function exibirModalSimulacao(boleto) {
            EduFinanceiroFactory.exibirSimulacaoBoleto(boleto.bankBilletCode, boleto.ourNumberBanking, boleto.dueDate, self.paramEdu);
            self.modalInstance.dismiss();
        }

        /**
         * Define se serão exibidos os botões de boleto e cartão de crédito
         */
        function defineRegraBtnPagto() {
            self.exibeBtnBoleto = self.dadosBoleto.canPayWithBarCode;
            self.exibeBtnCartao = self.dadosBoleto.canPayWithCredit || self.dadosBoleto.canPayWithDebit;
            self.exibeBtnPix = self.dadosBoleto.canPayWithPix;
        }

        /**
         * Carrega os parâmetros do educacional
         */
        function carregarParametrosEdu() {
            eduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(params) {
                self.paramEdu = params;
                self.IdRelatBoletosDotNetExe = params.IdRelatBoletosDotNetExe;
                self.PermiteAlteracaoDataVencimentoBoletoPortal = params.PermiteAlteracaoDataVencimentoBoletoPortal;
                self.IsPay = params.IsPay;
                defineRegraBtnPagto();
            });
        }
    }
});