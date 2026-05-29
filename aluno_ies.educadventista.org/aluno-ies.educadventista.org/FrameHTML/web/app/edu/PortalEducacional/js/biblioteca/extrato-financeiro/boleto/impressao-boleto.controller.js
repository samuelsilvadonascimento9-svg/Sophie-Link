/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module bibExtratoFinanceiroModule
 * @name BibExtratoFinImpressaoBoletoController
 * @object controller
 *
 * @created 2023-03-22 v12.1.2306
 * @updated
 *
 * @requires extrato-financeiro.module
 *
 * @dependencies bibExtratoFinanceiroFactory
 *
 * @description Controller da impressão de boleto
 */

define(['biblioteca/extrato-financeiro/extrato-financeiro.module',
    'biblioteca/extrato-financeiro/extrato-financeiro.route',
    'utils/edu-enums.constants',
    'biblioteca/extrato-financeiro/extrato-financeiro.factory'
], function() {

    'use strict';

    angular.module('bibExtratoFinanceiroModule')
        .controller('BibExtratoFinImpressaoBoletoController', BibExtratoFinImpressaoBoletoController);

    BibExtratoFinImpressaoBoletoController.$inject = [
        'parametros',
        '$modalInstance',
        'eduRelatorioService',
        'bibExtratoFinanceiroFactory'
    ];

    /**
     * Controller da impressão de boleto
     * @param   {object} parametros           Objeto com parametros
     * @param   {object} $modalInstance       Objeto para janela modal
     */
    function BibExtratoFinImpressaoBoletoController(
        parametros,
        $modalInstance,
        eduRelatorioService,
        bibExtratoFinanceiroFactory) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;
        self.pdfRelatorioBoleto = '';

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
            self.dataVencimentoBoleto = parametros.dataVencimentoBoleto;
            self.jpegRelatorioBoleto = parametros.jpegRelatorioBoleto;

        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************
        function imprimirBoleto(callback) {

            parametros.exportFileType = 'PDF';
            bibExtratoFinanceiroFactory.carregaBoletoExtratoFinanceiroBib(parametros, function(result) {

                if (result) {
                    self.pdfRelatorioBoleto = result.BankBilletPrint.Bytes;
                    eduRelatorioService.exibirOuSalvarPDF(self.pdfRelatorioBoleto);
                }

                if (angular.isFunction(callback)) {
                    callback(objInfoBoleto);
                }
            });
        }
    }
});