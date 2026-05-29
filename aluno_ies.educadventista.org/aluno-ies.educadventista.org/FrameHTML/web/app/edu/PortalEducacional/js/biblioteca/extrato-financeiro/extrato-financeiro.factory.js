/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.32
 * (c) 2021-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module bibExtratoFinanceiroModule
 * @name bibExtratoFinanceiroFactory
 * @object factory
 *
 * @created 10/03/2023 v12.1.2306
 * @updated
 *
 * @dependencies $totvsresource
 *
 * @description Factory utilizada na página de Extrato Financeiro do TOTVS Educacional Gestão Bibliotecária.
 */
define(['biblioteca/extrato-financeiro/extrato-financeiro.module'], function() {

    'use strict';

    angular
        .module('bibExtratoFinanceiroModule')
        .factory('bibExtratoFinanceiroFactory', bibExtratoFinanceiroFactory);

    bibExtratoFinanceiroFactory.$inject = ['$totvsresource', '$modal'];

    function bibExtratoFinanceiroFactory($totvsresource, $modal) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSBiblioteca/:method';
        var factory = $totvsresource.REST(url, {}, {});

        factory.getExtratoFinanceiro = getExtratoFinanceiro;
        factory.exibirExtratoDetalhado = exibirExtratoDetalhado;
        factory.exibirModalBoletoExtratoFinanceiroBib = exibirModalBoletoExtratoFinanceiroBib;
        factory.carregaBoletoExtratoFinanceiroBib = carregaBoletoExtratoFinanceiroBib;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getExtratoFinanceiro(contextoAtual, codCliente, statusBoleto, callback) {
            var parameters = {};

            parameters['method'] = 'v1/Bankbillets';
            parameters['companyCode'] = contextoAtual.codColigada;
            parameters['userCode'] = codCliente;
            parameters['statusBankBillet'] = statusBoleto;
            parameters['libraryUnitCode'] = contextoAtual.codUnidadeBibliotecaria;
            parameters['branchCode'] = contextoAtual.codFilial;

            return factory.TOTVSGet(parameters, callback);
        }

        function carregaBoletoExtratoFinanceiroBib(params, callback) {
            var parameters = {};

            parameters['method'] = 'v1/BankbilletPrint';
            parameters['companyCode'] = params.companyCode;
            parameters['branchCode'] = params.branchCode;
            parameters['libraryUnitCode'] = params.libraryUnitCode;
            parameters['bankBilletCode'] = params.bankBilletCode;
            parameters['userCode'] = params.userCode;
            parameters['exportFileType'] = params.exportFileType;

            return factory.TOTVSGet(parameters, callback);
        }

        function exibirExtratoDetalhado(lancamento) {

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/biblioteca/extrato-financeiro/detalhamento/extrato-detalhado.view.html',
                controller: 'BibExtratoDetalhadoController',
                controllerAs: 'controller',
                size: 'lg',
                resolve: {
                    parametros: function() {
                        return lancamento;
                    }
                },
                backdrop: 'true'
            });
        }

        function exibirModalBoletoExtratoFinanceiroBib(codColigada, codFilial, codUnidadeBibliotecaria, idBoleto, codUsuario) {

            var params = {
                companyCode: codColigada,
                branchCode: codFilial,
                libraryUnitCode: codUnidadeBibliotecaria,
                bankBilletCode: idBoleto,
                userCode: codUsuario,
                exportFileType: 'JPEG'
            };

            carregaBoletoExtratoFinanceiroBib(params, function(result) {

                if (result) {
                    params.jpegRelatorioBoleto = result.BankBilletPrint.Bytes;

                    $modal.open({
                        templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/biblioteca/extrato-financeiro/boleto/impressao-boleto.view.html',
                        controller: 'BibExtratoFinImpressaoBoletoController',
                        controllerAs: 'controller',
                        size: 'lg',
                        resolve: {
                            parametros: function() {
                                return params;
                            }
                        },
                        backdrop: 'true'
                    });
                }

            });
        }
    }
});