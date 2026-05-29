/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module avaliacoesModule
 * @object routeConfig
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas de Avaliações
 */

define(['aluno/avaliacoes/avaliacoes.module'], function() {
    'use strict';

    angular
        .module('eduAvaliacoesModule')
        .config(EduAvaliacoesRouteConfig);

    EduAvaliacoesRouteConfig.$inject = ['$stateProvider'];

    function EduAvaliacoesRouteConfig($stateProvider) {

        /**
         * Url das Views e Controllers.
         */
        var avaliacoesView = 'js/aluno/avaliacoes/avaliacoes-lista.view.html',
            avaliacoesController = 'js/aluno/avaliacoes/avaliacoes-lista.controller.js',
            avaliacoesInstitucionaisView = 'js/aluno/avaliacoes/institucional/avaliacoes-institucionais-list.view.html',
            avaliacoesInstitucionaisController = 'js/aluno/avaliacoes/institucional/avaliacoes-institucionais-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.avaliacoes) {
                avaliacoesView = 'js/aluno/avaliacoes/avaliacoes-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.avaliacoesInstitucional) {
                avaliacoesInstitucionaisView = 'js/aluno/avaliacoes/institucional/avaliacoes-institucionais-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.avaliacoes) {
                avaliacoesInstitucionaisView = 'js/aluno/avaliacoes/institucional/avaliacoes-institucionais-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.avaliacoesInstitucional) {
                avaliacoesInstitucionaisController = 'js/aluno/avaliacoes/institucional/avaliacoes-institucionais-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('avaliacoes', {
                abstract: true,
                template: '<ui-view/>'

            }).state('avaliacoes.iniciar', {
                url: '/notas/avaliacoes',
                views: {
                    '@': {
                        controller: 'eduAvaliacoesController',
                        controllerAs: 'controller',
                        templateUrl: avaliacoesView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduAvaliacoesModule',
                                    files: [avaliacoesController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('avaliacoesinstitucionais', {
                url: '/avaliacoes',
                views: {
                    '@': {
                        controller: 'EduAvaliacoesInstitucionaisListController',
                        controllerAs: 'controller',
                        templateUrl: avaliacoesInstitucionaisView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduAvaliacoesInstitucionaisModule',
                                    files: [avaliacoesInstitucionaisController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});