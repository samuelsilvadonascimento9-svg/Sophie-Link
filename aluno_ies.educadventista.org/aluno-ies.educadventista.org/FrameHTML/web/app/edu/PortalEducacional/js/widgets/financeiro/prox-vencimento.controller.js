/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.16
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['widgets/widget.module',
    'widgets/widget.service',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/financeiro.service',
    'widgets/widget.constants',
    'utils/reports/edu-relatorio.service',
    'utils/edu-utils.factory',
    'utils/edu-enums.constants',
    'aluno/financeiro/lancamentos/lancamentos-pagcartao.controller'
], function() {

    'use strict';

    angular
        .module('eduWidgetsModule')
        .controller('eduWidgetsProxVencimentoController', EduWidgetsProxVencimentoController);

    EduWidgetsProxVencimentoController.$inject = [
        '$scope',
        'eduWidgetsService',
        'eduWidgetsConsts',
        '$state',
        'EduFinanceiroFactory',
        'EduFinanceiroService',
        'eduUtilsFactory',
        'totvs.app-notification.Service',
        'eduEnumsConsts',
        'i18nFilter',
        'TotvsDesktopContextoCursoFactory'
    ];

    function EduWidgetsProxVencimentoController(
        $scope,
        objWidgetService,
        objWidgetConst,
        $state,
        EduFinanceiroFactory,
        EduFinanceiroService,
        eduUtilsFactory,
        totvsNotification,
        eduEnumsConsts,
        i18nFilter,
        TotvsDesktopContextoCursoFactory) {

        // variáveis
        let self = this;
        self.paramEdu = null;
        self.objWidget = {};
        self.dadosBoleto = {};
        self.objInfoBoleto = [];
        self.hasValue = false;
        self.PermitePagCartaoCredito = false;
        self.IntegradoProtheus = false;
        self.LegadoIntegracaoProtheus = false;
        self.IdRelatBoletosDotNetExe = null;
        self.exibeBtnBoleto = false;
        self.exibeBtnCartao = false;
        self.exibeBtnPix = false;
        self.exibeLinkFinanceiro = true;
        self.bankBilletCodeAtual = 0;
        self.ourNumberBankingAtual = '';
        self.dtVencimentoAtual = new Date();
        self.jpegRelatorioBoletoExtratoFinanceiro = [];
        self.PermiteAlteracaoDataVencimentoBoletoPortal = false;
        self.IsPay = false;
        self.contextoAtual = [];

        // metódos
        self.getWidgetDados = getWidgetDados;
        self.pagarBoleto = pagarBoleto;
        self.exibirDadosPagCartao = exibirDadosPagCartao;
        self.exibirDadosPix = exibirDadosPix;
        self.exibirModalSimulacao = exibirModalSimulacao;
        self.copiarCodBarras = copiarCodBarras;

        self.goFinanceiro = goFinanceiro;

        // inicializador
        init();

        /**
         * Inicializa o controller.
         */
        function init() {
            getWidgetDados($scope);
            carregarParametrosEdu();
            verificaExibicaoLink();
            self.contextoAtual = TotvsDesktopContextoCursoFactory.getCursoSelecionado();
        }

        /**
         * Recupera os dados do Widget de acordo com o ID do widget.
         *
         * @param {any} scope - scopo da tela a qual o widget estará
         */
        function getWidgetDados(scope) {

            self.objWidget = objWidgetService.getWidgetDataByController(scope);
            if (!self.objWidget) {
                loadWidgetDados(objWidgetConst.EduWidgetsFuncionalidade.Disciplinas,
                    objWidgetConst.EduWidgets.ProximoVencimento.ID);
            }
            if (self.objWidget.DadosWidget !== null && self.objWidget.DadosWidget.length > 0) {
                self.dadosBoleto = self.objWidget.DadosWidget[0];
            }

            self.hasValue = self.objWidget.DadosWidget !== null && self.objWidget.DadosWidget.length > 0;
        }

        // Realiza o carregamento dos dados do widget
        function loadWidgetDados(idFuncionalidade, idWidget) {
            objWidgetService.getWidgetDataByFactory(
                idFuncionalidade,
                idWidget,
                function(objResult) {
                    if (objResult) {
                        self.objWidget = objResult;
                    }
                }
            );
        }

        /**
         * Imprime o boleto de acordo com o parâmetro.
         * @param {any} boleto - Boleto retornado na consulta
         */
        function imprimirRelatorioBoletoExtratoFinanceiro(boleto) {
            EduFinanceiroFactory.geraSegundaViaExtratoFinanceiroNovo(boleto.companyCode, boleto.bankBilletCode, boleto.ourNumberBanking, boleto.dueDate, "JPEG", function(result) {
                if (result && result[0]['Bytes']) {
                    eduRelatorioService.exibirOuSalvarPDF(result[0].Bytes);
                }
            });
        }

        /**
         * Exibe o boleto
         *
         * @param {any} boleto - Boleto retornado na consulta
         */
        function pagarBoleto(boleto) {
            let boletosSelecionados = new Array();
            boletosSelecionados.push(boleto);

            EduFinanceiroFactory.exibirListaBoletosSelecionadosPagamento(boletosSelecionados, null, function() {
                if (self.IdRelatBoletosDotNetExe != null) {
                    EduFinanceiroFactory.exibirModalBoletoExtratoFinanceiroNovo(boleto.companyCode, boleto.bankBilletCode, boleto.ourNumberBanking,
                        boleto.dueDate, boleto.canPayWithBilletBarCode, self.paramEdu);
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
         * @param {any} boleto - Boleto retornado na consulta
         */
        function exibirDadosPagCartao(boleto) {
            let boletosSelecionados = new Array();
            boletosSelecionados.push(boleto);

            EduFinanceiroFactory.exibirListaBoletosSelecionadosPagamento(boletosSelecionados, eduEnumsConsts.PaymentsFormaPgtoCalcLiquido.CartaoCredito, function(paymentSummary) {
                EduFinanceiroFactory.exibirDadosPagCartaoMultiBoleto(boletosSelecionados.map(b => b.InternalId), self.IsPay, paymentSummary);
            });
        }

        function exibirDadosPix(boleto) {
            let boletosSelecionados = new Array();
            boletosSelecionados.push(boleto);

            EduFinanceiroFactory.exibirListaBoletosSelecionadosPagamento(boletosSelecionados, eduEnumsConsts.PaymentsFormaPgtoCalcLiquido.Pix, function(paymentSummary) {
                EduFinanceiroService.visualizarPixMultiBoletos(boletosSelecionados.map(b => b.InternalId), paymentSummary, self.contextoAtual.entrarComo);
            });
        }

        function copiarCodBarras(boleto) {
            EduFinanceiroFactory.obterCodigoBarrasBoleto(boleto.companyCode, boleto.bankBilletCode, boleto.ourNumberBanking, boleto.dueDate, function(result) {
                if (result && result.length > 0) {
                    if (EduFinanceiroService.validaCodigoIpte(result[0].IPTE)) {
                        EduFinanceiroFactory.exibirDadosCodigoBarras(result[0].IPTE);
                    }
                }
            });
        }

        function exibirModalSimulacao(boleto) {
            EduFinanceiroFactory.exibirSimulacaoBoleto(boleto.bankBilletCode, boleto.ourNumberBanking, boleto.dueDate, self.paramEdu);
        }

        /**
         * Define se serão exibidos os botões de boleto e cartão de crédito
         *
         */
        function defineRegraBtnPagto() {

            self.exibeBtnBoleto = self.dadosBoleto.canPayWithBarCode;

            self.exibeBtnCartao = self.dadosBoleto.canPayWithCredit || self.dadosBoleto.canPayWithDebit;

            self.exibeBtnPix = self.dadosBoleto.canPayWithPix;
        }

        /**
         * Carrega os parâmetros do educacional.
         *
         */
        function carregarParametrosEdu() {
            eduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(params) {
                self.paramEdu = params;
                self.PermitePagCartaoCredito = params.PermitePagCartaoCredito;
                self.IntegradoProtheus = params.IntegradoProtheus;
                self.LegadoIntegracaoProtheus = params.LegadoIntegracaoProtheus;
                self.IdRelatBoletosDotNetExe = params.IdRelatBoletosDotNetExe;
                self.PermiteAlteracaoDataVencimentoBoletoPortal = params.PermiteAlteracaoDataVencimentoBoletoPortal;
                self.IsPay = params.IsPay;
                // define a regra de acordo com os parâmetros
                defineRegraBtnPagto();
            });
        }

        /**
         * Função que redireciona para a tela de financeiro.
         *
         */
        function goFinanceiro() {

            var params = {
                status: 0
            };

            $state.go('financeiro.start', params);
        }

        /**
         * Valida exibição do link 'Ver financeiro'
         */
        function verificaExibicaoLink() {
            if ($state.current.name === 'financeiro.start') {
                self.exibeLinkFinanceiro = false;
            }
        }
    }
});