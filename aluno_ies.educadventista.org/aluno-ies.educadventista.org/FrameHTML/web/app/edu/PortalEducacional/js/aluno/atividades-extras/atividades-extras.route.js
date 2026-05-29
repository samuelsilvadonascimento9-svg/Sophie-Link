/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description Define a rota para acesso à funcionalidade de Atividades Extras
 */

define(['aluno/atividades-extras/atividades-extras.module'], function() {

    'use strict';

    angular
        .module('eduAtividadesExtrasModule')
        .config(EduAtividadesExtrasRouteConfig);

    EduAtividadesExtrasRouteConfig.$inject = ['$stateProvider'];

    /**
     * Configuração da Rota de Atividades Extras
     *
     * @param {any} $stateProvider responsável por verificar o estado da rota
     */
    function EduAtividadesExtrasRouteConfig($stateProvider) {

        /**
         * Url das Views e Controllers.
         */
        var atvExtrasView = 'js/aluno/atividades-extras/atividades-extras.view.html',
            atvExtrasController = 'js/aluno/atividades-extras/atividades-extras.controller.js',
            atvInscricaoView = 'js/aluno/atividades-extras/inscricao/atividades-extras-inscricao.view.html',
            atvInscricaoController = 'js/aluno/atividades-extras/inscricao/atividades-extras-inscricao.controller.js',
            atvInscritasView = 'js/aluno/atividades-extras/inscritas/atividades-extras-inscritas.view.html',
            atvInscritasController = 'js/aluno/atividades-extras/inscritas/atividades-extras-inscritas.controller.js';


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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.atividadesExtras) {
                arquivoView = 'js/aluno/atividades-extras/custom/atividades-extras.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.atividadesExtrasInscricao) {
                materialView = 'js/aluno/atividades-extras/inscricao/custom/atividades-extras-inscricao.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.atividadesExtrasInscritas) {
                materialInstituicaoView = 'js/aluno/atividades-extras/inscritas/custom/atividades-extras-inscritas.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.atividadesExtras) {
                arquivoController = 'js/aluno/atividades-extras/custom/atividades-extras.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.atividadesExtrasInscricao) {
                materialController = 'js/aluno/atividades-extras/inscricao/custom/atividades-extras-inscricao.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.atividadesExtrasInscritas) {
                materialInstituicaoController = 'js/aluno/atividades-extras/inscritas/atividades-extras-inscritas.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {
            $stateProvider.state('atividades-extras', {
                abstract: true,
                template: '<ui-view/>'
            }).state('atividades-extras.start', {
                url: '/atividades-extras',
                params: {
                    tab: ''
                },
                views: {
                    '@': {
                        controller: 'EduAtividadesExtrasController',
                        controllerAs: 'controller',
                        templateUrl: atvExtrasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduAtividadesExtrasModule',
                                    files: [atvExtrasController]
                                }]);
                            }]
                        }
                    },
                    'inscricao@atividades-extras.start': {
                        controller: 'EduAtividadesExtrasInscricaoController',
                        controllerAs: 'controller',
                        templateUrl: atvInscricaoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduAtividadesExtrasModule',
                                    files: [atvInscricaoController]
                                }]);
                            }]
                        }
                    },
                    'inscritas@atividades-extras.start': {
                        controller: 'eduAtividadesExtrasInscritasController',
                        controllerAs: 'controller',
                        templateUrl: atvInscritasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduAtividadesExtrasModule',
                                    files: [atvInscritasController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});