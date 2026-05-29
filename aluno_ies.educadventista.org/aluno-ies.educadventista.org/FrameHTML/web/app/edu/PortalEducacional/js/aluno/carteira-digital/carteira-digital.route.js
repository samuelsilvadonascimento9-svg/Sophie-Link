/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.26
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduCarteiraDigitalModule
 * @object routeConfig
 *
 * @created 2019-10-23 v12.1.27
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas para a tela de carteira digital
 */

define(['aluno/carteira-digital/carteira-digital.module'], function() {

    'use strict';

    angular
        .module('eduCarteiraDigitalModule')
        .config(eduCarteiraDigitalRouteConfig);

    eduCarteiraDigitalRouteConfig.$inject = ['$stateProvider'];

    function eduCarteiraDigitalRouteConfig($stateProvider) {

        var carteiraDigitalView = 'js/aluno/carteira-digital/carteira-digital.view.html',
            carteiraDigitalController = 'js/aluno/carteira-digital/carteira-digital.controller.js';

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
         *
         */
        function validaUrlCustom() {

            /**
             * View
             */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.carteiraDigital) {
                carteiraDigitalView = 'js/aluno/carteira-digital/custom/carteira-digital.view.html'
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.carteiraDigital) {
                carteiraDigitalController = 'js/aluno/carteira-digital/custom/carteira-digital.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         */
        function carregaRotas() {

            $stateProvider.state('carteira-digital', {
                abstract: true,
                template: '<ui-view/>'
            }).state('carteira-digital.start', {
                url: '/carteira-digital',
                params: {
                    dadosPagamento: null,
                    codUsuarioLogado: null,
                    rotaOrigem: null,
                    listaDadosPagamento: null,
                    resumoPagamento: null
                },
                views: {
                    '@': {
                        controller: 'eduCarteiraDigitalController',
                        controllerAs: 'controller',
                        templateUrl: carteiraDigitalView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduCarteiraDigitalModule',
                                    files: [carteiraDigitalController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});