/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduPagCartaoController
 * @object controller
 *
 * @created 2016-11-23 v12.1.15
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller do pagamento de boleto com cartão
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.new.route',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/financeiro.service'
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduSimulacaoBoletoController', EduSimulacaoBoletoController);

    EduSimulacaoBoletoController.$inject = [
        'EduFinanceiroFactory',
        'parametros',
        '$modalInstance',
        'totvs.app-notification.Service',
        'i18nFilter',
        'EduFinanceiroService',
        '$state',
    ];

    /**
     * Controller dos lançamentos financeiros
     * @param   {object} parametros           Objeto com parametros
     * @param   {object} $modalInstance       Objeto para janela modal
     */
    function EduSimulacaoBoletoController(
        EduFinanceiroFactory,
        parametros,
        $modalInstance,
        totvsNotification,
        i18nFilter,
        eduFinanceiroService,
        $state) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this,
            paramEdu = {};

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.simularValor = simularValor;
        self.gerarBoleto = gerarBoleto;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {

            self.idBoleto = parametros.idBoleto;
            self.nossoNumero = parametros.nossoNumero;
            self.dataVencimentoBoleto = parametros.dataVencimentoBoleto;
            paramEdu = parametros.paramEdu;

            self.aceiteAlteracaoDataVencimento = false;

            calcularDataMinima();
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Realiza a simulação do valor do boleto em determinada data de vencimento
         * @param {number} idBoleto
         * @param {Date} novaDataVencimento
         */
        function simularValor(idBoleto, novaDataVencimento) {

            self.aceiteAlteracaoDataVencimento = false;

            if (novaDataVencimento == null) {
                return;
            }

            var dataVencimentoSimulacao = new Date(novaDataVencimento);

            EduFinanceiroFactory.simularNovaDataVencimento(idBoleto, dataVencimentoSimulacao, function(valorSimulacao) {
                self.valorSimulacao = valorSimulacao;
            });

        }

        /**
         * Altera a data de vencimento e gera o boleto
         * @param {number} idBoleto - identificador do boleto
         * @param {Date} novaDataVencimento - nova data de vencimento do boleto
         */
        function gerarBoleto(idBoleto, novaDataVencimento) {

            var dataVencimento = new Date(novaDataVencimento);

            EduFinanceiroFactory.alterarDataVencimentoBoleto(idBoleto, dataVencimento, function(objAlteracaoDataVencimento) {

                if (objAlteracaoDataVencimento.Boleto && objAlteracaoDataVencimento.Boleto.length > 0) {

                    self.modalInstance.dismiss();

                    eduFinanceiroService.visualizarBoletoSegundaVia(objAlteracaoDataVencimento.Boleto[0].CODCOLIGADA, objAlteracaoDataVencimento.Boleto[0].IDBOLETO, objAlteracaoDataVencimento.Boleto[0].NOSSONUMERO, dataVencimento, paramEdu, function(objInfoBoleto) {
                        self.objInfoBoleto = objInfoBoleto;
                        $state.go($state.current, null, {
                            reload: true
                        });
                    });
                }
            });

        }

        /**
         * Calcula a meno data que é possível fazer a simulação
         */
        function calcularDataMinima() {

            self.dataMinima = new Date(self.dataVencimentoBoleto);
            self.dataMinima.setDate(self.dataMinima.getDate() + 1);

        }


    }
});