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
 * @description Rotas de Plano de Aula
 */

define(['aluno/plano-aula/plano-aula.module'], function() {

    'use strict';

    angular
        .module('eduPlanoAulaModule')
        .config(eduPlanoAulaRouteConfig);

    eduPlanoAulaRouteConfig.$inject = ['$stateProvider'];

    function eduPlanoAulaRouteConfig($stateProvider) {

        var PlanoAulaView = 'js/aluno/plano-aula/plano-aula-list.view.html',
            PlanoAulaController = 'js/aluno/plano-aula/plano-aula-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.planoAula) {
                PlanoAulaView = 'js/aluno/plano-aula/custom/plano-aula-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.planoAula) {
                PlanoAulaController = 'js/aluno/plano-aula/custom/plano-aula-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         */
        function carregaRotas() {

            $stateProvider.state('plano-aula', {
                abstract: true,
                template: '<ui-view/>'

            }).state('plano-aula.iniciar', {
                url: '/plano-aula',
                params: {
                    DataAula: null
                },
                views: {
                    '@': {
                        controller: 'eduPlanoAulaController',
                        controllerAs: 'controller',
                        templateUrl: PlanoAulaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduPlanoAulaModule',
                                    files: [PlanoAulaController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});