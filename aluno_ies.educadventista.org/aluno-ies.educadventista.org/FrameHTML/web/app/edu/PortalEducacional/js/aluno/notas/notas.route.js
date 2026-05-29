/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/notas/notas.module'], function() {

    'use strict';

    angular
        .module('eduNotasModule')
        .config(EduNotasRouteConfig);

    EduNotasRouteConfig.$inject = ['$stateProvider'];

    function EduNotasRouteConfig($stateProvider) {

        var notaView = 'js/aluno/notas/notas-lista.view.html',
            notaController = 'js/aluno/notas/notas-lista.controller.js',
            avaliacoesView = 'js/aluno/avaliacoes/avaliacoes-lista.view.html',
            avaliacoesController = 'js/aluno/avaliacoes/avaliacoes-lista.controller.js',
            notasEtapaView = 'js/aluno/notas/notas-etapas-lista.view.html',
            notasEtapaController = 'js/aluno/notas/notas-etapas-lista.controller.js',
            entregasView = 'js/aluno/entregas/entregas-list.view.html',
            entregasController = 'js/aluno/entregas/entregas-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.notas) {
                notaView = 'js/aluno/notas/custom/notas-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.notasAvaliacoes) {
                avaliacoesView = 'js/aluno/avaliacoes/custom/avaliacoes-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.notasEtapas) {
                notasEtapaView = 'js/aluno/notas/custom/notas-etapas-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.entregas) {
                entregasView = 'js/aluno/entregas/custom/entregas-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.notas) {
                notaController = 'js/aluno/notas/custom/notas-lista.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.notasAvaliacoes) {
                avaliacoesController = 'js/aluno/avaliacoes/custom/avaliacoes-lista.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.notasEtapas) {
                notasEtapaController = 'js/aluno/notas/custom/notas-etapas-lista.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.entregas) {
                notasEtapaController = 'js/aluno/entregas/custom/entregas-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         *
         */
        function carregaRotas() {

            $stateProvider.state('notas', {
                abstract: true,
                template: '<ui-view/>'

            }).state('notas.start', {
                url: '/notas',
                views: {
                    '@': {
                        controller: 'eduNotasListaController',
                        controllerAs: 'controller',
                        templateUrl: notaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'notasModule',
                                    files: [notaController]
                                }]);
                            }]
                        }
                    },
                    'avaliacoes@notas.start': {
                        controller: 'eduAvaliacoesController',
                        controllerAs: 'controller',
                        templateUrl: avaliacoesView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'AvaliacoesController',
                                    files: [avaliacoesController]
                                }]);
                            }]
                        }
                    },
                    'notas-etapas@notas.start': {
                        controller: 'EduNotasEtapasListaControlller',
                        controllerAs: 'controller',
                        templateUrl: notasEtapaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'NotasEtaspasController',
                                    files: [notasEtapaController]
                                }]);
                            }]
                        }
                    },
                    'entregas@notas.start': {
                        controller: 'eduEntregasController',
                        controllerAs: 'controller',
                        templateUrl: entregasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'entregasController',
                                    files: [entregasController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});