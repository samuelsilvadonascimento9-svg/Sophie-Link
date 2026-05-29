/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.2310
 * (c) 2019-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduAlertaProxVencimento
 * @object directive
 * @requires diretivas.module,financeiro.factory
 *
 * @dependencies $totvsresource, $timeout
 *
 */
define(['diretivas/diretivas.module',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/prox-vencimento/prox-vencimento-pagamento.controller'
], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduAlertaProxVencimento', eduAlertaProxVencimento);

    eduAlertaProxVencimento.$inject = ['$timeout'];

    function eduAlertaProxVencimento($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'js/aluno/financeiro/prox-vencimento/prox-vencimento-alerta.view.html',
            controller: EduAlertaProxVencimentoDirectiveController,
            controllerAs: 'controller',
            bindToController: true,
            link: function(scope, element, attrs) {
                element.hide();
                $timeout(function() {
                    element.show();
                }, 2500)
            }
        };
    }

    EduAlertaProxVencimentoDirectiveController.$inject = [
        '$rootScope',
        '$modal',
        'i18nFilter',
        'EduPaymentsFactory'
    ];

    function EduAlertaProxVencimentoDirectiveController($rootScope, $modal, i18nFilter, EduPaymentsFactory) {
        /**
         * Variáveis
         */
        let self = this;
        self.boleto = {};
        self.diasParaVencimento = 0;

        /**
         * Métodos
         */
        self.ocultaAlertaProximoVencimento = ocultaAlertaProximoVencimento;
        self.goFinanceiro = goFinanceiro;
        self.getLabelDias = getLabelDias;
        self.getLabelAlerta = getLabelAlerta;

        /**
         * Inicializa o controller.
         */
        init();

        function init() {
            $("#vencimento-alert").hide();
            carregarAlerta();
        }

        /**
         * Efetua o carregamento do alerta
         */
        function carregarAlerta() {
            let exibirAlerta = $rootScope.exibirAlertaProxVencimento;
            if (exibirAlerta == undefined) {
                $rootScope.exibirAlertaProxVencimento = 1;
                exibirAlerta = 1;
            }
            if (exibirAlerta === 1) {
                carregarBoletoProximoVencimento()
            }
        }

        /**
         * Efetua carregamento do boleto com próximo vencimento
         * API retorna o boleto apenas se a parametrização de alerta for atendida
         */
        function carregarBoletoProximoVencimento() {
            EduPaymentsFactory.getBoletoAlertaProxVencimento(function(result) {
                if (result && result.BOLETO != null) {
                    self.boleto = result.BOLETO;
                    self.diasParaVencimento = getDifDias(self.boleto.serverDate, self.boleto.dueDate);
                    $("#vencimento-alert").show();
                } else {
                    $rootScope.exibirAlertaProxVencimento = 0;
                }
            });
        }

        /**
         * Calcula diferença de dias entre duas datas
         * @param {*} dataIni - Data inicial
         * @param {*} dataFim - Data final
         * @returns Retorna a diferença de dias entre a data atual e a data de vencimento do boleto
         */
        function getDifDias(dataIni, dataFim) {
            let ini = new Date(dataIni);
            let fim = new Date(dataFim);

            let tempo = fim.getTime() - ini.getTime();
            return tempo / (1000 * 3600 * 24);
        }

        /**
         * @returns Retorna o label hoje quando faltar apenas 0 dias para vencimento no restante o label é retornado no plural
         */
        function getLabelAlerta() {
            if (self.diasParaVencimento == 0)
                return i18nFilter('l-alerta-vencimento-boleto-vence-hoje', [], 'js/aluno/financeiro');

            return i18nFilter('l-alerta-vencimento-boleto-vence-em', [], 'js/aluno/financeiro');
        }

        /**
         * @returns Retorna o label no singular quando faltar apenas 1 dia para vencimento no restante o label é retornado no plural
         */
        function getLabelDias() {
            if (self.diasParaVencimento == 0)
                return '';

            if (self.diasParaVencimento == 1)
                return self.diasParaVencimento + ' ' + i18nFilter('l-dia', [], 'js/aluno/financeiro');

            return self.diasParaVencimento + ' ' + i18nFilter('l-dias', [], 'js/aluno/financeiro');
        }

        /**
         * Oculta o alerta de próximo vencimento
         */
        function ocultaAlertaProximoVencimento() {
            $("#vencimento-alert").hide();
            $rootScope.exibirAlertaProxVencimento = 0;
        }

        /**
         * Função que exibe alerta para pagamento do próximo boleto.
         */
        function goFinanceiro() {
            ocultaAlertaProximoVencimento();
            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP +
                    'js/aluno/financeiro/prox-vencimento/prox-vencimento-pagamento.view.html',
                controller: 'EduProxVencimentoPagamentoController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    $boleto: function() {
                        return self.boleto;
                    }
                },
                backdrop: 'true'
            });
        }
    }
});