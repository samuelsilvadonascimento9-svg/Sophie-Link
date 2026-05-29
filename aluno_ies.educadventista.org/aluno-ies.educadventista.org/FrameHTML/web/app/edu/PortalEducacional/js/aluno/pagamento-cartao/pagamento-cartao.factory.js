/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.26
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduPagamentoCartaoModule
 * @name eduPagamentoCartaoModule
 * @object factory
 *
 * @created 2019-08-07 v12.1.26
 * @updated
 *
 * @requires eduPagamentoCartaoFactory
 *
 * @description Factory para o pagamento de cartão de crédito
 */

define(['aluno/pagamento-cartao/pagamento-cartao.module'], function() {

    'use strict';

    angular
        .module('eduPagamentoCartaoModule')
        .factory('eduPagamentoCartaoFactory', eduPagamentoCartaoFactory);

    eduPagamentoCartaoFactory.$inject = ['$totvsresource'];

    function eduPagamentoCartaoFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSFinanceiro/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});
        factory.executaPagamentoCartao = executaPagamentoCartao;
        factory.buscaJWTDebito = buscaJWTDebito;
        factory.confirmaPagamentoCartaoDebito = confirmaPagamentoCartaoDebito;
        factory.getChavePublica = getChavePublica;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Realiza o pagamento com cartão
         * @param {any} codColigada Código da Coligada
         * @param {any} codFilial Código da Filial
         * @param {any} objPagamentoCartao Lista de disciplinas matrículadas
         * @param {Function} callback  Função de callback, se necessário.
         * @returns Retorna um objeto com os itens encontrados na validação do período letivo do aluno.
         */
        function executaPagamentoCartao(codColigada, codFilial, objPagamentoCartao, callback) {
            var parameters = {};
            parameters['method'] = 'Cartao/PagamentoCartao';
            parameters['codColigada'] = codColigada;
            parameters['codFilial'] = codFilial;
            return factory.TOTVSPost(parameters, objPagamentoCartao, callback);
        }

        function buscaJWTDebito(codColigada, codFilial, callback) {
            var parameters = {};
            parameters['method'] = 'Cartao/Debito/Token';
            parameters['codColigada'] = codColigada;
            parameters['codFilial'] = codFilial;
            return factory.TOTVSGet(parameters, callback);
        }

        function confirmaPagamentoCartaoDebito(codColigada, codFilial, objPagamentoCartao, callback) {
            var parameters = {};
            parameters['method'] = 'Cartao/Debito/Confirmacao';
            parameters['codColigada'] = codColigada;
            parameters['codFilial'] = codFilial;
            return factory.TOTVSPost(parameters, objPagamentoCartao, callback);
        }

        function getChavePublica(codColigada, codFilial, callback) {
            var parameters = {};
            parameters['method'] = 'Cartao/ChavePublica';
            parameters['codColigada'] = codColigada;
            parameters['codFilial'] = codFilial;
            return factory.TOTVSPost(parameters, {}, callback);
        }
    }
});