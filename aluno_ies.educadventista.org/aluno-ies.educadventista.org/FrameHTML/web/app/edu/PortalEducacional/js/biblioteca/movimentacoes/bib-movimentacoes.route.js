/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.32
 * (c) 2021-2021 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module bibMovimentacoesModule
 * @object routeConfig
 *
 * @created 08/02/2022 v12.1.32
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do gerencimaento da página de Movimentações do TOTVS Educacional Gestão Bibliotecária.
 */
define(['biblioteca/movimentacoes/bib-movimentacoes.module'], function() {

    'use strict';

    angular
        .module('bibMovimentacoesModule')
        .config(BibMovimentacoesRouteConfig);

    BibMovimentacoesRouteConfig.$inject = ['$stateProvider'];

    function BibMovimentacoesRouteConfig($stateProvider) {

        var bibMovimentacoesUrlView = 'js/biblioteca/movimentacoes/bib-movimentacoes-list.view.html';
        var bibMovimentacoesUrlController = 'js/biblioteca/movimentacoes/bib-movimentacoes-list.controller.js';

        var bibMovimentacoesReservasUrlView = 'js/biblioteca/movimentacoes/reservas/bib-movimentacoes-reservas-list.view.html';
        var bibMovimentacoesReservasUrlController = 'js/biblioteca/movimentacoes/reservas/bib-movimentacoes-reservas-list.controller.js';

        var bibMovimentacoesEmprestimosUrlView = 'js/biblioteca/movimentacoes/emprestimos/bib-movimentacoes-emprestimos-list.view.html';
        var bibMovimentacoesEmprestimosUrlController = 'js/biblioteca/movimentacoes/emprestimos/bib-movimentacoes-emprestimos-list.controller.js';

        var bibMovimentacoesSugestaoCompraUrlView = 'js/biblioteca/movimentacoes/sugestao-compra/bib-movimentacoes-sugestaocompra-list.view.html';
        var bibMovimentacoesSugestaoCompraUrlController = 'js/biblioteca/movimentacoes/sugestao-compra/bib-movimentacoes-sugestaocompra-list.controller.js';

        var bibMovimentacoesUltimasAquisicoesUrlView = 'js/biblioteca/movimentacoes/ultimas-aquisicoes/bib-movimentacoes-ultimasAquisicoes-list.view.html';
        var bibMovimentacoesUltimasAquisicoesUrlController = 'js/biblioteca/movimentacoes/ultimas-aquisicoes/bib-movimentacoes-ultimasAquisicoes-list.controller.js';

        validaUrlCustom();

        $stateProvider.state('bib-movimentacoes', {
            abstract: true,
            template: '<ui-view/>'

        }).state('bib-movimentacoes.start', {
            url: '/bib-movimentacoes',
            views: {
                '@': {
                    controller: 'BibMovimentacoesController',
                    controllerAs: 'controller',
                    templateUrl: bibMovimentacoesUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'bibMovimentacoesModule',
                                files: [bibMovimentacoesUrlController]
                            }]);
                        }]
                    }
                },
                'reservas@bib-movimentacoes.start': {
                    controller: 'BibMovimentacoesReservasController',
                    controllerAs: 'controller',
                    templateUrl: bibMovimentacoesReservasUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'bibMovimentacoesModule',
                                files: [bibMovimentacoesReservasUrlController]
                            }]);
                        }]
                    }
                },
                'emprestimos@bib-movimentacoes.start': {
                    controller: 'BibMovimentacoesEmprestimosController',
                    controllerAs: 'controller',
                    templateUrl: bibMovimentacoesEmprestimosUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'bibMovimentacoesModule',
                                files: [bibMovimentacoesEmprestimosUrlController]
                            }]);
                        }]
                    }
                },
                'sugestaocompra@bib-movimentacoes.start': {
                    controller: 'BibMovimentacoesSugestaoCompraController',
                    controllerAs: 'controller',
                    templateUrl: bibMovimentacoesSugestaoCompraUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'bibMovimentacoesModule',
                                files: [bibMovimentacoesSugestaoCompraUrlController]
                            }]);
                        }]
                    }
                },
                'ultimasaquisicoes@bib-movimentacoes.start': {
                    controller: 'BibMovimentacoesUltimasAquisicoesController',
                    controllerAs: 'controller',
                    templateUrl: bibMovimentacoesUltimasAquisicoesUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'bibMovimentacoesModule',
                                files: [bibMovimentacoesUltimasAquisicoesUrlController]
                            }]);
                        }]
                    }
                }
            }
        });

        function validaUrlCustom() {

            /**
             * View
             */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibMovimentacoes) {
                bibMovimentacoesUrlView = 'js/biblioteca/movimentacoes/custom/bib-movimentacoes-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibMovimentacoesReservas) {
                bibMovimentacoesReservasUrlView = 'js/biblioteca/movimentacoes/custom/reservas/bib-movimentacoes-reservas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibMovimentacoesEmprestimos) {
                bibMovimentacoesEmprestimosUrlView = 'js/biblioteca/movimentacoes/custom/emprestimos/bib-movimentacoes-reservas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibMovimentacoesSugestaoCompra) {
                bibMovimentacoesSugestaoCompraUrlView = 'js/biblioteca/movimentacoes/custom/sugestao-compra/bib-movimentacoes-sugestaocompra-list.view.html';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibMovimentacoesUltimasAquisicoes) {
                bibMovimentacoesUltimasAquisicoesUrlView = 'js/biblioteca/movimentacoes/custom/ultimas-aquisicoes/bib-movimentacoes-ultimasAquisicoes-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.bibMovimentacoes) {
                bibMovimentacoesUrlController = 'js/biblioteca/movimentacoes/custom/bib-movimentacoes-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.bibMovimentacoesReservas) {
                bibMovimentacoesReservasUrlController = 'js/biblioteca/movimentacoes/custom/reservas/bib-movimentacoes-reservas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.bibMovimentacoesEmprestimos) {
                bibMovimentacoesEmprestimosUrlController = 'js/biblioteca/movimentacoes/custom/emprestimos/bib-movimentacoes-reservas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.bibMovimentacoesSugestaoCompra) {
                bibMovimentacoesSugestaoCompraUrlController = 'js/biblioteca/movimentacoes/custom/sugestao-compra/bib-movimentacoes-sugestaocompra-list.controller.js';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibMovimentacoesUltimasAquisicoes) {
                bibMovimentacoesUltimasAquisicoesUrlController = 'js/biblioteca/movimentacoes/custom/ultimas-aquisicoes/bib-movimentacoes-ultimasAquisicoes-list.controller.js';
            }
        }
    }
});