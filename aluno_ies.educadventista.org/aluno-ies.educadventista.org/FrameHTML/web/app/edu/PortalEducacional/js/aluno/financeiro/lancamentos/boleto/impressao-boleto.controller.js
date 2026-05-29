/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduImpressaoBoletoController
 * @object controller
 *
 * @created 2020-10-15 v12.1.31
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller da impressão de boleto
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.new.route',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/financeiro.service',
    'utils/edu-utils.factory',
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduImpressaoBoletoController', EduImpressaoBoletoController);

    EduImpressaoBoletoController.$inject = [
        'EduFinanceiroFactory',
        'parametros',
        '$modalInstance',
        'totvs.app-notification.Service',
        'i18nFilter',
        'EduFinanceiroService',
        '$state',
        '$scope',
        'eduUtilsFactory'
    ];

    /**
     * Controller da impressão de boleto
     * @param   {object} parametros            Objeto com parametros
     * @param   {object} $modalInstance        Objeto para janela modal
     * @param   {object} $scope                Escopo AngularJS
     * @param   {object} EduFinanceiroFactory  Objeto factory para serviços de financeiro
     * @param   {object} $state                Objeto para manipulação de rotas
     * @param   {object} totvsNotification     Serviços de notificação
     * @param   {object} $i18nFilter           Filtro
     * @param   {object} $eduFinanceiroService Service do financeiro
     * @param   {object} EduUtilsFactory  	   Objeto factory para serviços utilitários
     */
    function EduImpressaoBoletoController(
        EduFinanceiroFactory,
        parametros,
        $modalInstance,
        totvsNotification,
        i18nFilter,
        eduFinanceiroService,
        $state,
        $scope,
        eduUtilsFactory) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        let self = this

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.imprimirBoleto = imprimirBoleto;

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
            self.jpegRelatorioBoleto = parametros.jpegRelatorioBoleto;
            self.codColigada = parametros.codColigada;
            self.possuiFormulaCodBarrasPagamento = parametros.possuiFormulaCodBarrasPagamento;
            self.codBarras = parametros.codBarras;
            self.copiarCodBarras = copiarCodBarras;
            carregaParametrosEducacional();
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Função para carregar parâmetros do educacional
         * Caso os parâmetros não existam, o controller faz a busca via API, caso contrário 
         * o controller utiliza o paramEdu recebido com os parâmetros
         */
        function carregaParametrosEducacional() {
            if (parametros ? .paramEdu) {
                self.paramEdu = parametros.paramEdu;
            } else {
                eduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(params) {
                    self.paramEdu = params;
                });
            }
        }

        function imprimirBoleto(codColigada, idBoleto, nossoNumero, dtVencimento, paramEdu) {
            eduFinanceiroService.visualizarBoletoSegundaVia(codColigada, idBoleto, nossoNumero, dtVencimento, paramEdu, function(objInfoBoleto) {
                self.objInfoBoleto = objInfoBoleto;
            });
        }

        function copiarCodBarras() {
            eduFinanceiroService.copiarCodBarras(self.codBarras);
            new Promise(f => setTimeout(f, 300)).then(() => {
                $scope.$apply();
            });
        }
    }
});