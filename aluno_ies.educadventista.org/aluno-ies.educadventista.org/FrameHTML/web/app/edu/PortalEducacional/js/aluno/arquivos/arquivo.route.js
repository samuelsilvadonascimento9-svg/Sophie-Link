/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/arquivos/arquivo.module'], function() {

    'use strict';

    angular
        .module('eduArquivoModule')
        .config(EduArquivoRouteConfig);

    EduArquivoRouteConfig.$inject = ['$stateProvider'];

    function EduArquivoRouteConfig($stateProvider) {

        /**
         * Url das Views e Controllers.
         */
        var arquivoView = 'js/aluno/arquivos/arquivo.view.html',
            arquivoController = 'js/aluno/arquivos/arquivo.controller.js',
            materialView = 'js/aluno/arquivos/materiais/material-list.view.html',
            materialController = 'js/aluno/arquivos/materiais/material-list.controller.js',
            materialInstituicaoView = 'js/aluno/arquivos/materiais/material-instituicao-list.view.html',
            materialInstituicaoController = 'js/aluno/arquivos/materiais/material-instituicao-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.arquivos) {
                arquivoView = 'js/aluno/arquivos/custom/arquivo.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.arquivosMateriais) {
                materialView = 'js/aluno/arquivos/materiais/custom/material-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.arquivosMateriaisInstituicao) {
                materialInstituicaoView = 'js/aluno/arquivos/materiais/material-instituicao-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.arquivos) {
                arquivoController = 'js/aluno/arquivos/custom/arquivo.controller.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.arquivosMateriais) {
                materialController = 'js/aluno/arquivos/materiais/custom/material-list.controller.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.arquivosMateriaisInstituicao) {
                materialInstituicaoController = 'js/aluno/arquivos/materiais/material-instituicao-list.controller.html';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('arquivos', {
                abstract: true,
                template: '<ui-view/>'
            }).state('arquivos.start', {
                url: '/arquivos',
                params: {
                    tab: ''
                },
                views: {
                    '@': {
                        controller: 'eduArquivoController',
                        controllerAs: 'controller',
                        templateUrl: arquivoView
                    },
                    'materiais@arquivos.start': {
                        controller: 'eduMaterialController',
                        controllerAs: 'controller',
                        templateUrl: materialView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduArquivoModule',
                                    files: [materialController]
                                }]);
                            }]
                        }
                    },
                    'institucionais@arquivos.start': {
                        controller: 'EduMaterialInstitucionalController',
                        controllerAs: 'controller',
                        templateUrl: materialInstituicaoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduArquivoModule',
                                    files: [materialInstituicaoController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});