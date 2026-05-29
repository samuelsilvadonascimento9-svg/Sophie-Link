/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.28
 * (c) 2015-2020 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduEstagioEmpregoModule
 * @object routeConfig
 *
 * @created 17/02/2020 v12.1.28
 * @updated
 *
 * @description Rotas do estagio/emprego
 */
define(['aluno/estagio-emprego/estagio-emprego.module'], function() {

    'use strict';

    angular
        .module('eduEstagioEmpregoModule')
        .config(eduEstagioEmpregoRouteConfig);

    eduEstagioEmpregoRouteConfig.$inject = ['$stateProvider'];

    function eduEstagioEmpregoRouteConfig($stateProvider) {

        var estagioEmpregoUrlView = 'js/aluno/estagio-emprego/estagio-emprego-list.view.html';
        var estagioEmpregoUrlController = 'js/aluno/estagio-emprego/estagio-emprego-list.controller.js';

        var estagiosUrlView = 'js/aluno/estagio-emprego/estagios/estagios-list.view.html';
        var estagiosUrlController = 'js/aluno/estagio-emprego/estagios/estagios-list.controller.js';

        var vagasDisponiveisInscritaslUrlView = 'js/aluno/estagio-emprego/vagas/vagas-disponiveis-inscritas.view.html';
        var vagasDisponiveisInscritasUrlController = 'js/aluno/estagio-emprego/vagas/vagas-disponiveis-inscritas.controller.js';

        var solicitacaoEditUrlView = 'js/aluno/estagio-emprego/estagios/solicitacao-edit.view.html';
        var solicitacaoEditUrlController = 'js/aluno/estagio-emprego/estagios/solicitacao-edit.controller.js';

        var planoAtividadeUrlView = 'js/aluno/estagio-emprego/estagios/plano-atividade/plano-atividade-edit.view.html';
        var planoAtividadeUrlController = 'js/aluno/estagio-emprego/estagios/plano-atividade/plano-atividade-edit.controller.js';

        var anexoPlanoAtividadeUrlView = 'js/aluno/estagio-emprego/estagios/plano-atividade/anexo-plano-atividade-list.view.html';
        var anexoPlanoAtividadeUrlController = 'js/aluno/estagio-emprego/estagios/plano-atividade/anexo-plano-atividade-list.controller.js';

        var etapaPlanoAtividadeUrlView = 'js/aluno/estagio-emprego/estagios/plano-atividade/etapa-plano-atividade-list.view.html';
        var etapaPlanoAtividadeUrlController = 'js/aluno/estagio-emprego/estagios/plano-atividade/etapa-plano-atividade-list.controller.js';

        var etapaPlanoAtividadeEditUrlView = 'js/aluno/estagio-emprego/estagios/plano-atividade/etapa-plano-atividade-edit.view.html';
        var etapaPlanoAtividadeEditUrlController = 'js/aluno/estagio-emprego/estagios/plano-atividade/etapa-plano-atividade-edit.controller.js';

        var relatorioFinalEditUrlView = 'js/aluno/estagio-emprego/estagios/relatorio-final/relatorio-final-edit.view.html';
        var relatorioFinalEditUrlController = 'js/aluno/estagio-emprego/estagios/relatorio-final/relatorio-final-edit.controller.js';

        var anexoRelatorioFinalListUrlView = 'js/aluno/estagio-emprego/estagios/relatorio-final/anexo-relatorio-final-list.view.html';
        var anexoRelatorioFinalListUrlController = 'js/aluno/estagio-emprego/estagios/relatorio-final/anexo-relatorio-final-list.controller.js';

        init();

        function init() {
            validaUrlCustom();
            carregaRotas();
        }

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.estagio) {
                estagioEmpregoUrlView = 'js/aluno/estagio-emprego/custom/estagio-emprego-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.estagio) {
                estagioEmpregoUrlController = 'js/aluno/estagio-emprego/custom/estagio-emprego-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.estagioSolicitacaoTermo) {
                estagiosUrlView = 'js/aluno/estagio-emprego/custom/estagios/estagios-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.estagioSolicitacaoTermo) {
                estagiosUrlController = 'js/aluno/estagio-emprego/custom/estagios/estagios-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.estagioVagasDisponiveisInscritas) {
                vagasDisponiveisInscritaslUrlView = 'js/aluno/estagio-emprego/custom/vagas/vagas-disponiveis.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.estagioVagasDisponiveis) {
                vagasDisponiveisInscritasUrlController = 'js/aluno/estagio-emprego/custom/vagas/vagas-disponiveis.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.estagioSolicitacao) {
                solicitacaoEditUrlView = 'js/aluno/estagio-emprego/custom/estagios/solicitacao-edit.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.estagioSolicitacao) {
                solicitacaoEditUrlController = 'js/aluno/estagio-emprego/custom/estagios/solicitacao-edit.controller.js';
            }
        }

        function carregaRotas() {
            $stateProvider.state('estagio-emprego', {
                abstract: true,
                template: '<ui-view/>'
            }).state('estagio-emprego.start', {
                url: '/estagio-emprego',
                params: {
                    tab: null
                },
                views: {
                    '@': {
                        controller: 'eduEstagioEmpregoController',
                        controllerAs: 'controller',
                        templateUrl: estagioEmpregoUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [estagioEmpregoUrlController]
                                }]);
                            }]
                        }
                    },
                    'estagios@estagio-emprego.start': {
                        controller: 'eduEstagiosListController',
                        controllerAs: 'controller',
                        templateUrl: estagiosUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [estagiosUrlController]
                                }]);
                            }]
                        }
                    },
                    'vagas-disponiveis-inscritas@estagio-emprego.start': {
                        controller: 'eduVagasListController',
                        controllerAs: 'controller',
                        templateUrl: vagasDisponiveisInscritaslUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [vagasDisponiveisInscritasUrlController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('estagio-emprego.solicitacao', {
                url: '/estagio-emprego/solicitacao/{idSolicitacaoEstagio}',
                views: {
                    '@': {
                        controller: 'eduSolicitacaoController',
                        controllerAs: 'controller',
                        templateUrl: solicitacaoEditUrlView,
                        params: {
                            idSolicitacaoEstagio: null
                        },
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [solicitacaoEditUrlController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('estagio-emprego.plano-atividade', {
                url: '/estagio-emprego/termo-compromisso/{idContratoEstagio:int}/plano-atividade/{idPlanoAtividade}',
                views: {
                    '@': {
                        controller: 'eduPlanoAtividadeController',
                        controllerAs: 'controller',
                        templateUrl: planoAtividadeUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [planoAtividadeUrlController]
                                }]);
                            }]
                        }
                    },
                    'anexos@estagio-emprego.plano-atividade': {
                        controller: 'eduAnexosPlanoAtividadeController',
                        controllerAs: 'controller',
                        templateUrl: anexoPlanoAtividadeUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [anexoPlanoAtividadeUrlController]
                                }]);
                            }]
                        }
                    },
                    'etapas@estagio-emprego.plano-atividade': {
                        controller: 'eduEtapasPlanoAtividadeController',
                        controllerAs: 'controller',
                        templateUrl: etapaPlanoAtividadeUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [etapaPlanoAtividadeUrlController]
                                }]);
                            }]
                        }
                    }
                }
            }).state('estagio-emprego.etapa-plano-atividade', {
                url: '/estagio-emprego/termo-compromisso/{idContratoEstagio:int}/plano-atividade/{idPlanoAtividade:int}/etapa/{idEtapa}',
                controller: 'eduEtapaPlanoAtividadeEditController',
                controllerAs: 'controller',
                templateUrl: etapaPlanoAtividadeEditUrlView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduEstagioEmpregoModule',
                            files: [etapaPlanoAtividadeEditUrlController]
                        }]);
                    }]
                }
            }).state('estagio-emprego.relatorio-final', {
                url: '/estagio-emprego/termo-compromisso/{idContratoEstagio:int}/relatorio-final/{idEstagioAvalAluno}',
                views: {
                    '@': {
                        controller: 'eduRelatorioFinalEstagioEditController',
                        controllerAs: 'controller',
                        templateUrl: relatorioFinalEditUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [relatorioFinalEditUrlController]
                                }]);
                            }]
                        }
                    },
                    'anexos@estagio-emprego.relatorio-final': {
                        controller: 'eduAnexoRelatorioFinalListController',
                        controllerAs: 'controller',
                        templateUrl: anexoRelatorioFinalListUrlView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduEstagioEmpregoModule',
                                    files: [anexoRelatorioFinalListUrlController]
                                }]);
                            }]
                        }
                    }
                }
            });

        }
    }
});