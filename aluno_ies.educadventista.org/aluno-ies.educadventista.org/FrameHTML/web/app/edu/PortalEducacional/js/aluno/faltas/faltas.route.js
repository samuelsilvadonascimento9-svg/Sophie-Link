/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFaltasModule
 * @object routeConfig
 *
 * @created 2016-09-26 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas das Faltas
 */

define(['aluno/faltas/faltas.module'], function() {

    'use strict';

    angular
        .module('eduFaltasModule')
        .config(FaltasRouteConfig);

    FaltasRouteConfig.$inject = ['$stateProvider'];

    function FaltasRouteConfig($stateProvider) {

        var faltasView = 'js/aluno/faltas/faltas-list.view.html',
            faltasController = 'js/aluno/faltas/faltas-list.controller.js',
            faltasEtapasView = 'js/aluno/faltas/etapas/faltas-etapas-list.view.html',
            faltasEtapasController = 'js/aluno/faltas/etapas/faltas-etapas-list.controller.js',
            faltasAulasView = 'js/aluno/faltas/aula/faltas-aula-list.view.html',
            faltasAulasController = 'js/aluno/faltas/aula/faltas-aula-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.faltas) {
                faltasView = 'js/aluno/faltas/custom/faltas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.faltasEtapas) {
                faltasEtapasView = 'js/aluno/faltas/etapas/custom/faltas-etapas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.faltasAula) {
                faltasAulasView = 'js/aluno/faltas/aula/custom/faltas-aula-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.faltas) {
                faltasController = 'js/aluno/faltas/custom/faltas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.faltasEtapas) {
                faltasEtapasController = 'js/aluno/faltas/etapas/custom/faltas-etapas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.faltasAula) {
                faltasAulasController = 'js/aluno/faltas/aula/custom/faltas-aula-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('faltas', {
                abstract: true,
                template: '<ui-view/>'

            }).state('faltas.iniciar', {
                url: '/faltas',
                views: {
                    '@': {
                        controller: 'eduFaltasController',
                        controllerAs: 'controller',
                        templateUrl: faltasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFaltasModule',
                                    files: [faltasController]
                                }]);
                            }]
                        }
                    },
                    'etapas@faltas.iniciar': {
                        controller: 'eduFaltasEtapasListControlller',
                        controllerAs: 'controller',
                        templateUrl: faltasEtapasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFaltasModule',
                                    files: [faltasEtapasController]
                                }]);
                            }]
                        }
                    },
                    'aula@faltas.iniciar': {
                        controller: 'eduFaltasAulaListControlller',
                        controllerAs: 'controller',
                        templateUrl: faltasAulasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFaltasModule',
                                    files: [faltasAulasController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});