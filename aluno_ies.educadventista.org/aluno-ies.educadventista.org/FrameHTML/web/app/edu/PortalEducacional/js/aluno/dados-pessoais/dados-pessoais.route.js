/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/dados-pessoais/dados-pessoais.module'], function() {

    'use strict';

    angular
        .module('eduDadosPessoaisModule')
        .config(EduDadosPessoaisRouteConfig);

    EduDadosPessoaisRouteConfig.$inject = ['$stateProvider'];

    function EduDadosPessoaisRouteConfig($stateProvider) {

        var dadosPessoaisListView = 'js/aluno/dados-pessoais/dados-pessoais.view.html',
            dadosPessoaisListController = 'js/aluno/dados-pessoais/dados-pessoais.controller.js',
            dadosProfissionaisView = 'js/aluno/dados-pessoais/dados-profissionais/dados-profissionais-edit.view.html',
            responsaveisListView = 'js/aluno/dados-pessoais/responsaveis/responsaveis-list.view.html',
            responsaveisListController = 'js/aluno/dados-pessoais/responsaveis/responsaveis-list.controller.js',
            documentosView = 'js/aluno/dados-pessoais/documentos/documentos-list.view.html',
            documentosController = 'js/aluno/dados-pessoais/documentos/documentos-list.controller.js',
            movAcadListView = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.view.html',
            movAcadListController = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.controller.js',
            fiadorListView = 'js/aluno/dados-pessoais/fiador/fiador.view.html',
            fiadorController = 'js/aluno/dados-pessoais/fiador/fiador.controller.js',
            responsaveisEditView = 'js/aluno/dados-pessoais/responsaveis/responsaveis-edit.view.html',
            responsaveisEditController = 'js/aluno/dados-pessoais/responsaveis/responsaveis-edit.controller.js',
            movAcadEditView = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.view.html',
            movAcadEditController = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.controller.js',
            fichaMedicaView = 'js/aluno/dados-pessoais/ficha-medica/ficha-medica.view.html',
            fichaMedicaController = 'js/aluno/dados-pessoais/ficha-medica/ficha-medica.controller.js',
            termoImagemVozView = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.view.html',
            termoImagemVozController = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.controller.js',
            fichaMedicaFlexivelView = 'js/aluno/dados-pessoais/ficha-medica-flexivel/ficha-medica-flexivel.view.html',
            fichaMedicaFlexivelController = 'js/aluno/dados-pessoais/ficha-medica-flexivel/ficha-medica-flexivel.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosPessoais) {
                dadosPessoaisListView = 'js/aluno/dados-pessoais/custom/dados-pessoais.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosProfissionais) {
                dadosProfissionaisView = 'js/aluno/dados-pessoais/dados-profissionais/custom/dados-profissionais-edit.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosPessoaisResponsaveisList) {
                responsaveisListView = 'js/aluno/dados-pessoais/responsaveis/custom/responsaveis-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosPessoaisResponsaveisEdit) {
                responsaveisEditView = 'js/aluno/dados-pessoais/responsaveis/custom/responsaveis-edit.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosPessoaisDocumentos) {
                documentosView = 'js/aluno/dados-pessoais/documentos/custom/documentos-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosPessoaisMovAcadList) {
                movAcadListView = 'js/aluno/dados-pessoais/movimentacao-academica/custom/movimentacao-academica-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.dadosPessoaisMovAcadEdit) {
                movAcadEditView = 'js/aluno/dados-pessoais/movimentacao-academica/custom/movimentacao-academica-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.fichaMedica) {
                fichaMedicaView = 'js/aluno/dados-pessoais/ficha-medica/custom/ficha-medica.view.html';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.termoImagemVoz) {
                termoImagemVozView = 'js/aluno/termo-imagem-voz/custom/termo-imagem-voz.view.html';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.fichaMedicaFlexivel) {
                fichaMedicaFlexivelView = 'js/aluno/dados-pessoais/ficha-medica-flexivel/custom/ficha-medica-flexivel.view.html';
            }

            /**
             * Controller
             */

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.dadosPessoais) {
                dadosPessoaisListController = 'js/aluno/dados-pessoais/custom/dados-pessoais.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.dadosPessoaisResponsaveisList) {
                responsaveisListController = 'js/aluno/dados-pessoais/responsaveis/custom/responsaveis-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.dadosPessoaisDocumentos) {
                documentosController = 'js/aluno/dados-pessoais/documentos/custom/documentos-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.dadosPessoaisMovAcadList) {
                movAcadListController = 'js/aluno/dados-pessoais/movimentacao-academica/custom/movimentacao-academica-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.responsaveisEditView) {
                responsaveisEditController = 'js/aluno/dados-pessoais/responsaveis/custom/responsaveis-edit.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.movAcadEditView) {
                movAcadEditController = 'js/aluno/dados-pessoais/movimentacao-academica/custom/movimentacao-academica-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.fichaMedica) {
                fichaMedicaController = 'js/aluno/dados-pessoais/ficha-medica/custom/ficha-medica.controller.js';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.termoImagemVoz) {
                termoImagemVozController = 'js/aluno/dados-pessoais/termo-imagem-voz/custom/termo-imagem-voz.controller.js';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.fichaMedicaFlexivel) {
                fichaMedicaFlexivelController = 'js/aluno/dados-pessoais/ficha-medica-flexivel/custom/ficha-medica-flexivel.controller.js';
            }

        }

        /**
         * Realiza o carregamento das rotas.
         *
         */
        function carregaRotas() {
            $stateProvider.state('dados-pessoais', {
                abstract: true,
                template: '<ui-view/>'
            }).state('dados-pessoais.start', {
                url: '/dados-pessoais',
                params: {
                    tab: ''
                },
                views: {
                    '@': {
                        controller: 'eduDadosPessoaisController',
                        controllerAs: 'controller',
                        templateUrl: dadosPessoaisListView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduDadosPessoaisModule',
                                    files: [dadosPessoaisListController]
                                }]);
                            }]
                        }
                    },
                    'dados-profissionais@dados-pessoais.start': {
                        controller: 'eduDadosPessoaisController',
                        controllerAs: 'controller',
                        templateUrl: dadosProfissionaisView
                    },
                    'responsaveis@dados-pessoais.start': {
                        controller: 'eduResponsaveisListController',
                        controllerAs: 'controller',
                        templateUrl: responsaveisListView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduResponsaveisModule',
                                    files: [responsaveisListController]
                                }]);
                            }]
                        }
                    },
                    'documentos@dados-pessoais.start': {
                        controller: 'eduDocumentosListController',
                        controllerAs: 'controller',
                        templateUrl: documentosView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduDocumentosModule',
                                    files: [documentosController]
                                }]);
                            }]
                        }
                    },
                    'movimentacao-academica@dados-pessoais.start': {
                        controller: 'eduMovimentacaoAcademicaController',
                        controllerAs: 'controller',
                        templateUrl: movAcadListView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduMovimentacaoAcademicaModule',
                                    files: [movAcadListController]
                                }]);
                            }]
                        }
                    },
                    'ficha-medica@dados-pessoais.start': {
                        controller: 'eduFichaMedicaController',
                        controllerAs: 'controller',
                        templateUrl: fichaMedicaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFichaMedicaModule',
                                    files: [fichaMedicaController]
                                }]);
                            }]
                        }
                    },
                    'termo-imagem-voz@dados-pessoais.start': {
                        controller: 'eduTermoImagemVozController',
                        controllerAs: 'controller',
                        templateUrl: termoImagemVozView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduTermoImagemVozModule',
                                    files: [termoImagemVozController]
                                }]);
                            }]
                        }
                    },
                    'ficha-medica-flexivel@dados-pessoais.start': {
                        controller: 'eduFichaMedicaFlexivelController',
                        controllerAs: 'controller',
                        templateUrl: fichaMedicaFlexivelView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFichaMedicaFlexivelModule',
                                    files: [fichaMedicaFlexivelController]
                                }]);
                            }]
                        }
                    },
                    'fiador@dados-pessoais.start': {
                        controller: 'eduFiadorController',
                        controllerAs: 'controller',
                        templateUrl: fiadorListView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFiadorModule',
                                    files: [fiadorController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('dados-pessoais.responsavel', {
                url: '/responsavel/novo',
                controller: 'eduResponsaveisController',
                controllerAs: 'controller',
                templateUrl: responsaveisEditView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduResponsaveisModule',
                            files: [responsaveisEditController]
                        }]);
                    }]
                }
            }).state('dados-pessoais.movimentacao-academica', {
                url: '/movimentacao-academica/novo',
                controller: 'eduMovimentacaoAcademicaController',
                controllerAs: 'controller',
                templateUrl: movAcadEditView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduMovimentacaoAcademicaModule',
                            files: [movAcadEditController]
                        }]);
                    }]
                }
            });
        }
    }
});