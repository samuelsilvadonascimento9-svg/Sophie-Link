define(['aluno/negociacao/negociacao.module'], function() {

    'use strict';

    angular
        .module('eduNegociacaoModule')
        .config(EduNegociacaoRouteConfig);

    EduNegociacaoRouteConfig.$inject = ['$stateProvider'];

    function EduNegociacaoRouteConfig($stateProvider) {
        var negociacaoView = 'js/aluno/negociacao/negociacao.view.html',
            introducaoView = 'js/aluno/negociacao/template-etapa/introducao.view.html',
            listagemDebitosFinanceirosView = 'js/aluno/negociacao/template-etapa/listagem-debitos-financeiros.view.html',
            selecionarTemplateAcordoView = 'js/aluno/negociacao/template-etapa/selecionar-template-acordo.view.html',
            confirmacaoView = 'js/aluno/negociacao/template-etapa/confirmacao.view.html';

        var negociacaoController = 'js/aluno/negociacao/negociacao.controller.js';

        init();

        function init() {
            validaUrlCustom();
            carregaRotas();
        }

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.negociacao) {
                negociacaoView = 'js/aluno/negociacao/custom/negociacao.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.negociacaoIntroducao) {
                introducaoView = 'js/aluno/negociacao/custom/template-etapa/introducao.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.negociacaoListagemDebitosFinanceiros) {
                listagemDebitosFinanceirosView = 'js/aluno/negociacao/custom/template-etapa/listagem-debitos-financeiros.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.negociacaoSelecaoTemplateAcordo) {
                selecionarTemplateAcordoView = 'js/aluno/negociacao/custom/template-etapa/selecionar-template-acordo.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.negociacaoConfirmacao) {
                confirmacaoView = 'js/aluno/negociacao/custom/template-etapa/confirmacao.view.html'
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.negociacao) {
                negociacaoController = 'js/aluno/negociacao/custom/negociacao.controller.js';
            }
        }

        function carregaRotas() {
            $stateProvider.state('negociacao', {
                    abstract: true,
                    template: '<ui-view/>'

                })
                .state('negociacaoonline', {
                    url: '/negociacao',
                    controller: 'EduNegociacaoController',
                    controllerAs: 'controller',
                    templateUrl: negociacaoView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduNegociacaoModule',
                                files: [negociacaoController]
                            }]);
                        }]
                    }
                })
                .state('negociacaoonline.introducao', {
                    url: '/introducao',
                    templateUrl: introducaoView
                })
                .state('negociacaoonline.listagem-debitos-financeiros', {
                    url: '/listagem-debitos-financeiro',
                    templateUrl: listagemDebitosFinanceirosView
                })
                .state('negociacaoonline.selecao-template', {
                    url: '/selecao-template',
                    templateUrl: selecionarTemplateAcordoView
                })
                .state('negociacaoonline.confirmacao', {
                    url: '/confirmacao',
                    templateUrl: confirmacaoView
                });
        }
    }
});