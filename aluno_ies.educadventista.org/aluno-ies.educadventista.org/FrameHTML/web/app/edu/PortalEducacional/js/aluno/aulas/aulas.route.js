define(['aluno/aulas/aulas.module'], function() {
    'use strict';

    angular
        .module('eduAulasModule')
        .config(EduAulasRouteConfig);

    EduAulasRouteConfig.$inject = ['$stateProvider'];

    function EduAulasRouteConfig($stateProvider) {

        /**
         * Url das Views e Controllers.
         */
        var aulaView = 'js/aluno/aulas/aulas-lista.view.html',
            aulaController = 'js/aluno/aulas/aulas-lista.controller.js',
            aulaDetalhesView = 'js/aluno/aulas/aulas-detalhe.view.html',
            aulaDetalhesController = 'js/aluno/aulas/aulas-detalhe.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.aulas) {
                aulaView = 'js/aluno/aulas/custom/aulas-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.aulasDetalhes) {
                aulaDetalhesView = 'js/aluno/aulas/custom/aulas-detalhe.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.aulas) {
                aulaController = 'js/aluno/aulas/custom/aulas-lista.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.aulasDetalhes) {
                aulaDetalhesController = 'js/aluno/aulas/custom/aulas-detalhe.controlller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('aulas', {
                abstract: true,
                template: '<ui-view/>'

            }).state('aulas.iniciar', {
                url: '/aulas',
                views: {
                    '@': {
                        controller: 'eduAulasListController',
                        controllerAs: 'controller',
                        templateUrl: aulaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduAulasModule',
                                    files: [aulaController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('aulas.detalhe', {
                url: '/aulas/detalhe/{idTurmaDisc:int}/{idPlanoAula:int}',
                controller: 'eduAulasDetalheController',
                controllerAs: 'controller',
                templateUrl: aulaDetalhesView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduAulasModule',
                            files: [aulaDetalhesController]
                        }]);
                    }]
                }
            });
        }
    }
});