/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/financeiro/financeiro.module'], function() {

    'use strict';

    angular
        .module('eduFinanceiroModule')
        .config(EduFinanceiroNewRouteConfig);

    EduFinanceiroNewRouteConfig.$inject = ['$stateProvider'];

    function EduFinanceiroNewRouteConfig($stateProvider) {

        let financeiroView = 'js/aluno/financeiro/financeiro.new.view.html',
            financeiroController = 'js/aluno/financeiro/financeiro.new.controller.js',
            lancamentosView = 'js/aluno/financeiro/lancamentos/lancamentos-list.view.html',
            lancamentosController = 'js/aluno/financeiro/lancamentos/lancamentos.controller.js',
            beneficiosView = 'js/aluno/financeiro/beneficios/beneficios-list.new.view.html',
            beneficiosController = 'js/aluno/financeiro/beneficios/beneficios.controller.js',
            negociacaoView = 'js/aluno/financeiro/negociacao/negociacao-list.view.html',
            negociacaoController = 'js/aluno/financeiro/negociacao/negociacao.controller.js',
            pagCartaoView = 'js/aluno/financeiro/lancamentos/lancamentos-pagcartao-status.view.html',
            pagCartaoController = 'js/aluno/financeiro/lancamentos/lancamentos-pagcartao-status.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.financeiroNew) {
                financeiroView = 'js/aluno/financeiro/custom/financeiro.new.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.financeiroBeneficios) {
                beneficiosView = 'js/aluno/financeiro/beneficios/custom/beneficios-list.new.view.html';
            }
            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.financeiroNew) {
                financeiroController = 'js/aluno/financeiro/custom/financeiro.new.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.financeiroBeneficios) {
                beneficiosView = 'js/aluno/financeiro/beneficios/custom/beneficios-list.new.view.html';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.financeiroLancamentos) {
                lancamentosView = 'js/aluno/financeiro/lancamentos/custom/lancamentos-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.financeiroNegociacao) {
                negociacaoView = 'js/aluno/financeiro/negociacao/custom/negociacao-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.financeiroPagCartao) {
                pagCartaoView = 'js/aluno/financeiro/lancamentos/custom/lancamentos-pagcartao-status.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.financeiroLancamentos) {
                lancamentosController = 'js/aluno/financeiro/lancamentos/custom/lancamentos.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.financeiroNegociacao) {
                negociacaoController = 'js/aluno/financeiro/negociacao/custom/negociacao.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.financeiroPagCartao) {
                pagCartaoController = 'js/aluno/financeiro/lancamentos/custom/lancamentos-pagcartao-status.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         *
         */
        function carregaRotas() {

            $stateProvider.state('financeiro', {
                abstract: true,
                template: '<ui-view/>'
            }).state('financeiro.start', {
                url: '/financeiro.new?{boleto:int}',
                params: {},
                views: {
                    '@': {
                        controller: 'EduFinanceiroNewController',
                        controllerAs: 'controller',
                        templateUrl: financeiroView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFinanceiroModule',
                                    files: [financeiroController]
                                }]);
                            }]
                        }
                    },
                    'beneficios@financeiro.start': {
                        controller: 'EduBeneficiosController',
                        controllerAs: 'controller',
                        templateUrl: beneficiosView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFinanceiroModule',
                                    files: [beneficiosController]
                                }]);
                            }]
                        }
                    }
                }
            }).state("financeiro.recorrencia-list", {
                url: "/financeiro.recorrencia-lista",
                views: {
                    '@': {
                        controller: 'EduFinanceiroRecorrenciaListController',
                        controllerAs: 'controller',
                        templateUrl: 'js/aluno/financeiro/financeiro.recorrencia-list.view.html',
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFinanceiroModule',
                                    files: ['js/aluno/financeiro/financeiro.recorrencia-list.controller.js']
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});