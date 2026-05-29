define(['aluno/requerimentos/requerimentos.module'], function() {

    'use strict';

    angular
        .module('eduRequerimentosModule')
        .config(EduRequerimentosRouteConfig);

    EduRequerimentosRouteConfig.$inject = ['$stateProvider'];

    function EduRequerimentosRouteConfig($stateProvider) {

        var requerimentosView = 'js/aluno/requerimentos/requerimentos-list.view.html',
            requerimentosController = 'js/aluno/requerimentos/requerimentos-list.controller.js',
            disponiveisView = 'js/aluno/requerimentos/disponiveis/requerimentos-disponiveis-list.view.html',
            disponiveisController = 'js/aluno/requerimentos/disponiveis/requerimentos-disponiveis-list.controller.js',
            solicitadosView = 'js/aluno/requerimentos/solicitados/requerimentos-solicitados-list.view.html',
            solicitadosController = 'js/aluno/requerimentos/solicitados/requerimentos-solicitados-list.controller.js',
            requerimentosEditView = 'js/aluno/requerimentos/requerimentos-edit.view.html',
            requerimentosEditController = 'js/aluno/requerimentos/requerimentos-edit.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.requerimentos) {
                requerimentosView = 'js/aluno/requerimentos/custom/requerimentos-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.requerimentosDisponiveis) {
                disponiveisView = 'js/aluno/requerimentos/disponiveis/custom/requerimentos-disponiveis-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.requerimentosSolicitados) {
                solicitadosView = 'js/aluno/requerimentos/solicitados/custom/requerimentos-solicitados-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.requerimentosEdit) {
                requerimentosEditView = 'js/aluno/requerimentos/custom/requerimentos-edit.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.requerimentos) {
                requerimentosController = 'js/aluno/requerimentos/custom/requerimentos-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.requerimentosDisponiveis) {
                disponiveisController = 'js/aluno/requerimentos/disponiveis/custom/requerimentos-disponiveis-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.requerimentosSolicitados) {
                solicitadosController = 'js/aluno/requerimentos/solicitados/custom/requerimentos-solicitados-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.requerimentosEdit) {
                requerimentosEditController = 'js/aluno/requerimentos/custom/requerimentos-edit.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('requerimentos', {
                    abstract: true,
                    template: '<ui-view/>'

                }).state('requerimentos.start', {
                    url: '/requerimentos?{protocolo:int}',
                    views: {
                        '@': {
                            controller: 'eduRequerimentosController',
                            controllerAs: 'controller',
                            templateUrl: requerimentosView,
                            resolve: {
                                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        name: 'eduRequerimentosModule',
                                        files: [requerimentosController]
                                    }]);
                                }]
                            }
                        },
                        'disponiveis@requerimentos.start': {
                            controller: 'eduRequerimentosDisponiveisController',
                            controllerAs: 'controller',
                            templateUrl: disponiveisView,
                            resolve: {
                                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        name: 'eduRequerimentosModule',
                                        files: [disponiveisController]
                                    }]);
                                }]
                            }
                        },
                        'solicitados@requerimentos.start': {
                            controller: 'eduRequerimentosSolicitadosController',
                            controllerAs: 'controller',
                            templateUrl: solicitadosView,
                            resolve: {
                                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load([{
                                        name: 'eduRequerimentosModule',
                                        files: [solicitadosController]
                                    }]);
                                }]
                            }
                        }
                    }
                })
                .state('requerimentos.edit', {
                    url: '/requerimento/novo/{codGrupoAtendimento:int}/{codTipoAtendimento:int}',
                    controller: 'eduRequerimentosEditController',
                    controllerAs: 'controller',
                    templateUrl: requerimentosEditView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduRequerimentosModule',
                                files: [requerimentosEditController]
                            }]);
                        }]
                    }
                });
        }
    }
});