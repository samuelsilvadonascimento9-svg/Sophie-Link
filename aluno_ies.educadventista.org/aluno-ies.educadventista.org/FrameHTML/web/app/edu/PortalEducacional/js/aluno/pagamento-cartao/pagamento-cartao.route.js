/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.26
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module edupagamentoCartaoModule
 * @object routeConfig
 *
 * @created 2019-08-18 v12.1.26
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas para a tela de pagamento de cartão de crédito
 */

define(['aluno/pagamento-cartao/pagamento-cartao.module'], function() {

    'use strict';

    angular
        .module('eduPagamentoCartaoModule')
        .config(eduPagamentoCartaoRouteConfig);

    eduPagamentoCartaoRouteConfig.$inject = ['$stateProvider'];

    function eduPagamentoCartaoRouteConfig($stateProvider) {

        var pagamentoCartaoView = 'js/aluno/pagamento-cartao/pagamento-cartao.view.html',
            pagamentoCartaoController = 'js/aluno/pagamento-cartao/pagamento-cartao.controller.js';

        init();

        /**
         * Função que inicializa o carregamento do RouteConfig.
         *
         */
        function init() {
            validaUrlCustom();
            carregaRotas();
        }

        /**
         * Valida se os controllers e views serão customizadas.
         */
        function validaUrlCustom() {
            /**
             * View
             */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.pagamentoCartao) {
                pagamentoCartaoView = 'js/aluno/pagamento-cartao/custom/pagamento-cartao.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.pagamentoCartao) {
                pagamentoCartaoController = 'js/aluno/pagamento-cartao/custom/pagamento-cartao.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         */
        function carregaRotas() {

            $stateProvider.state('pagamento-cartao', {
                abstract: true,
                template: '<ui-view/>'
            }).state('pagamento-cartao.iniciar', {
                url: '/pagamento-cartao',
                params: {
                    dadosComprador: null
                },
                views: {
                    '@': {
                        controller: 'eduPagamentoCartaoController',
                        controllerAs: 'controller',
                        templateUrl: pagamentoCartaoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduPagamentoCartaoModule',
                                    files: [pagamentoCartaoController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('pagamento-cartao.debitorede', {
                url: '/pagamento-cartao/:nsu/:codautorizacao/:mensagem',
                params: {
                    tab: '',
                    status: -1,
                    nsu: '',
                    codautorizacao: '',
                    mensagem: ''
                },
                views: {
                    '@': {
                        controller: 'eduPagamentoCartaoController',
                        controllerAs: 'controller',
                        templateUrl: pagamentoCartaoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduPagamentoCartaoModule',
                                    files: [pagamentoCartaoController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});