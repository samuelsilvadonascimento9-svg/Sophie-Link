/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.20
 * (c) 2015-2018 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFaltasModule
 * @object routeConfig
 *
 * @created 2018-02-20 v12.1.20
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas de Desempenho
 */

define(['aluno/desempenho/desempenho.module'], function() {

    'use strict';

    angular
        .module('eduDesempenhoModule')
        .config(eduDesempenhoRouteConfig);

    eduDesempenhoRouteConfig.$inject = ['$stateProvider'];

    function eduDesempenhoRouteConfig($stateProvider) {

        var DesempenhoView = 'js/aluno/desempenho/desempenho-list.view.html',
            DesempenhoController = 'js/aluno/desempenho/desempenho-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.desempenho) {
                DesempenhoView = 'js/aluno/desempenho/custom/desempenho-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.desempenho) {
                DesempenhoController = 'js/aluno/desempenho/custom/desempenho-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         */
        function carregaRotas() {

            $stateProvider.state('desempenho', {
                abstract: true,
                template: '<ui-view/>'

            }).state('desempenho.iniciar', {
                url: '/desempenho',
                views: {
                    '@': {
                        controller: 'eduDesempenhoController',
                        controllerAs: 'controller',
                        templateUrl: DesempenhoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduDesempenhoModule',
                                    files: [DesempenhoController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});