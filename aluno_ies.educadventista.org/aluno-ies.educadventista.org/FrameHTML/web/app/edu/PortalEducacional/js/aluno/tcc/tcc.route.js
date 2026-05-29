/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduTccModule
 * @object routeConfig
 *
 * @created 14/09/2016 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Tcc
 */
define(['aluno/tcc/tcc.module'], function() {
    'use strict';

    angular
        .module('eduTccModule')
        .config(EduTccRouteConfig);

    EduTccRouteConfig.$inject = ['$stateProvider'];

    function EduTccRouteConfig($stateProvider) {

        var acompanhamentoView = 'js/aluno/tcc/acompanhamento/acompanhamento-list.view.html',
            acompanhamentoController = 'js/aluno/tcc/acompanhamento/acompanhamento-list.controller.js',
            informacoesView = 'js/aluno/tcc/informacoes/tcc-informacoes.view.html',
            informacoesController = 'js/aluno/tcc/informacoes/tcc-informacoes.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccAcompanhamento) {
                acompanhamentoView = 'js/aluno/tcc/acompanhamento/custom/acompanhamento-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccInformacoes) {
                informacoesView = 'js/aluno/tcc/informacoes/custom/tcc-informacoes.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccAcompanhamento) {
                acompanhamentoController = 'js/aluno/tcc/acompanhamento/custom/acompanhamento-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccInformacoes) {
                informacoesController = 'js/aluno/tcc/informacoes/custom/tcc-informacoes.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('tcc', {
                abstract: true,
                template: '<ui-view/>'

            }).state('tcc.start', {
                url: '/tcc',
                controller: 'eduAcompanhamentoTccController',
                controllerAs: 'controller',
                templateUrl: acompanhamentoView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduTccModule',
                            files: [acompanhamentoController]
                        }]);
                    }]
                }
            }).state('tcc.informacoes', {
                url: '/tcc/informacoes/{idTurmaDisc:int}',
                controller: 'EduTccInformacoesController',
                controllerAs: 'controller',
                templateUrl: informacoesView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduTccInformacoesController',
                            files: [informacoesController]
                        }]);
                    }]
                }

            });
        }
    }
});