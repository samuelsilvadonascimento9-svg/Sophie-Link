/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.20
 * (c) 2015-2018 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFaltasModule
 * @object routeConfig
 *
 * @created 2018-01-05 v12.1.20
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas de Nota/Falta Unificada
 */

define(['aluno/notafalta-unificada/notafalta-unificada.module'], function() {

    'use strict';

    angular
        .module('eduNotaFaltaUnificadaModule')
        .config(eduNotaFaltaRouteConfig);

    eduNotaFaltaRouteConfig.$inject = ['$stateProvider'];

    function eduNotaFaltaRouteConfig($stateProvider) {

        var eduNotaFaltaUnificadaView = 'js/aluno/notafalta-unificada/notafalta-unificada-list.view.html',
            eduNotaFaltaUnificadaController = 'js/aluno/notafalta-unificada/notafalta-unificada-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.notaFalta) {
                eduNotaFaltaView = 'js/aluno/notafalta-unificada/custom/notafalta-unificada-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.notaFalta) {
                eduNotaFaltaUnificadaController = 'js/aluno/notafalta-unificada/custom/notafalta-unificada-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         */
        function carregaRotas() {

            $stateProvider.state('notafalta-unificada', {
                abstract: true,
                template: '<ui-view/>'

            }).state('notafalta-unificada.iniciar', {
                url: '/nota-falta-unificada',
                views: {
                    '@': {
                        controller: 'eduNotaFaltaUnificadaController',
                        controllerAs: 'controller',
                        templateUrl: eduNotaFaltaUnificadaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduNotaFaltaUnificadaModule',
                                    files: [eduNotaFaltaUnificadaController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});