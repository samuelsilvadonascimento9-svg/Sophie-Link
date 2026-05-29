/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.33
 * (c) 2015-2021 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduNegociacaoModule
 * @name EduImpressaoTermoAceiteController
 * @object controller
 *
 * @created 2021-07-08 v12.1.33
 * @updated
 *
 * @requires Negociacao.module
 *
 * @dependencies eduNegociacaoFactory
 *
 * @description Controller da impressão do Termo de Aceite
 */
define([
    'aluno/negociacao/negociacao.module',
    'utils/edu-utils.service'
], function() {

    'use strict';

    angular.module('eduNegociacaoModule')
        .controller('EduImpressaoTermoAceiteController', EduImpressaoTermoAceiteController);

    EduImpressaoTermoAceiteController.$inject = [
        'parametros',
        '$modalInstance',
        'eduRelatorioService',
        'EduNegociacaoFactoryFinanceiro'
    ];

    function EduImpressaoTermoAceiteController(
        parametros,
        $modalInstance,
        eduRelatorioService,
        EduNegociacaoFactoryFinanceiro) {

        // *********************************************************************************
        // *** Variáveis
        // *********************************************************************************
        var self = this;

        // *********************************************************************************
        // *** Propriedades públicas e métodos
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.imprimirTermoAceite = imprimirTermoAceite;

        // *********************************************************************************
        // *** Inicialização do controller
        // *********************************************************************************
        init();

        /**
         * Método de inicialização do controller
         */
        function init() {
            self.objRelatorio = parametros.jpegRelatorio;
            self.objImprimirRelatorio = parametros.objImprimirRelatorio;
        }

        // *********************************************************************************
        // *** Funções
        // *********************************************************************************
        function imprimirTermoAceite() {
            EduNegociacaoFactoryFinanceiro.gerarRelatorioPDF(self.objImprimirRelatorio, function(retorno) {
                eduRelatorioService.exibirOuSalvarPDF(retorno.Relatorio);
            });
        }

    }
});