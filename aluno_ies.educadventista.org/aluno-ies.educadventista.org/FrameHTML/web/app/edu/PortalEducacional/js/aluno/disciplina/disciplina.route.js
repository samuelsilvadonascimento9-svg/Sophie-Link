/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/disciplina/disciplina.module'], function() {

    'use strict';

    angular
        .module('eduDisciplinaModule')
        .config(EduDisciplinaRouteConfig);

    EduDisciplinaRouteConfig.$inject = ['$stateProvider'];

    function EduDisciplinaRouteConfig($stateProvider) {

        var disciplinaView = 'js/aluno/disciplina/disciplina.view.html',
            disciplinaController = 'js/aluno/disciplina/disciplina.controller.js',
            avaliacaoView = 'js/aluno/avaliacoes/avaliacoes-lista.view.html',
            avaliacaoController = 'js/aluno/avaliacoes/avaliacoes-lista.controller.js',
            faltaAulaView = 'js/aluno/faltas/aula/faltas-aula-list.view.html',
            faltaController = 'js/aluno/faltas/faltas-list.controller.js',
            faltaEtapaView = 'js/aluno/faltas/etapas/faltas-etapas-list.view.html',
            faltaEtapaController = 'js/aluno/faltas/etapas/faltas-etapas-list.controller.js',
            faltaAulaController = 'js/aluno/faltas/aula/faltas-aula-list.controller.js',
            ocorrenciasView = 'js/aluno/ocorrencias/ocorrencias-list.view.html',
            ocorrenciasController = 'js/aluno/ocorrencias/ocorrencias-list.controller.js',
            entregasView = 'js/aluno/entregas/entregas-list.view.html',
            entregasController = 'js/aluno/entregas/entregas-list.controller.js',
            aulasView = 'js/aluno/aulas/aulas-lista.view.html',
            aulasController = 'js/aluno/aulas/aulas-lista.controller.js',
            complementoView = 'js/aluno/disciplina/complemento/complemento-list.view.html',
            complementoController = 'js/aluno/disciplina/complemento/complemento-list.controller.js',
            materialView = 'js/aluno/arquivos/materiais/material-list.view.html',
            materialController = 'js/aluno/arquivos/materiais/material-list.controller.js',
            tccBancaView = 'js/aluno/tcc/banca/tcc-banca-list.view.html',
            tccBancaController = 'js/aluno/tcc/banca/tcc-banca-list.controller.js',
            acompanhamentoView = 'js/aluno/tcc/acompanhamento/acompanhamento-list.view.html',
            acompanhamentoController = 'js/aluno/tcc/acompanhamento/acompanhamento-list.controller.js',
            arquivoFinalView = 'js/aluno/tcc/arquivofinal/arquivofinal-list.view.html',
            arquivoFinalController = 'js/aluno/tcc/arquivofinal/arquivofinal-list.controller.js',
            tccInformacoesView = 'js/aluno/tcc/informacoes/tcc-informacoes.view.html',
            tccInformacoesController = 'js/aluno/tcc/informacoes/tcc-informacoes.controller.js',
            tccInformacoesEditView = 'js/aluno/tcc/informacoes/tcc-informacoes-edit.view.html',
            tccInformacoesEditController = 'js/aluno/tcc/informacoes/tcc-informacoes-edit.controller.js';



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

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.disciplina) {
                disciplinaView = 'js/aluno/disciplina/custom/disciplina.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.disciplina) {
                disciplinaController = 'js/aluno/disciplina/custom/disciplina.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.avaliacoes) {
                avaliacaoView = 'js/aluno/avaliacoes/custom/avaliacoes-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.avaliacoes) {
                avaliacaoController = 'js/aluno/avaliacoes/custom/avaliacoes-lista.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.faltasAula) {
                faltaAulaView = 'js/aluno/faltas/aula/custom/faltas-aula-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.faltas) {
                faltaController = 'js/aluno/faltas/custom/faltas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.faltasEtapas) {
                faltaEtapaView = 'js/aluno/faltas/etapas/custom/faltas-etapas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.faltasEtapas) {
                faltaEtapaController = 'js/aluno/faltas/etapas/custom/faltas-etapas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.faltasAula) {
                faltaAulaController = 'js/aluno/faltas/aula/custom/faltas-aula-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.ocorrencias) {
                ocorrenciasView = 'js/aluno/ocorrencias/custom/ocorrencias-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.ocorrencias) {
                ocorrenciasController = 'js/aluno/ocorrencias/custom/ocorrencias-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.entregas) {
                entregasView = 'js/aluno/entregas/custom/entregas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.entregas) {
                entregasController = 'js/aluno/entregas/custom/entregas-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.aulas) {
                aulasView = 'js/aluno/aulas/custom/aulas-lista.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.aulas) {
                aulasController = 'js/aluno/aulas/custom/aulas-lista.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.disciplinaComplemento) {
                complementoView = 'js/aluno/disciplina/complemento/custom/complemento-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.disciplinaComplemento) {
                complementoController = 'js/aluno/disciplina/complemento/custom/complemento-list.controller.js'
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.arquivosMateriais) {
                materialView = 'js/aluno/arquivos/materiais/custom/material-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.arquivosMateriais) {
                materialController = 'js/aluno/arquivos/materiais/custom/material-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccBanca) {
                tccBancaView = 'js/aluno/tcc/banca/custom/tcc-banca-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccBanca) {
                tccBancaController = 'js/aluno/tcc/banca/custom/tcc-banca-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccAcompanhamento) {
                acompanhamentoView = 'js/aluno/tcc/acompanhamento/custom/acompanhamento-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccAcompanhamento) {
                acompanhamentoController = 'js/aluno/tcc/acompanhamento/custom/acompanhamento-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccArquivoFinal) {
                arquivoFinalView = 'js/aluno/tcc/arquivofinal/custom/arquivofinal-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccArquivoFinal) {
                arquivoFinalController = 'js/aluno/tcc/arquivofinal/custom/arquivofinal-list.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccInformacoes) {
                tccInformacoesView = 'js/aluno/tcc/informacoes/custom/tcc-informacoes.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccInformacoes) {
                tccInformacoesController = 'js/aluno/tcc/informacoes/custom/tcc-informacoes.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.tccInformacoesEdit) {
                tccInformacoesEditView = 'js/aluno/tcc/informacoes/custom/tcc-informacoes-edit.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.tccInformacoesEdit) {
                tccInformacoesEditController = 'js/aluno/tcc/informacoes/custom/tcc-informacoes-edit.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         *
         */
        function carregaRotas() {

            $stateProvider.state('disciplina', {
                abstract: true,
                template: '<ui-view/>'
            }).state('disciplina.start', {
                url: '/disciplina/{idTurmaDisc:int}/{codDisc:string}',
                views: {
                    '@': {
                        controller: 'eduDisciplinaController',
                        controllerAs: 'controller',
                        templateUrl: disciplinaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'DisciplinaController',
                                    files: [disciplinaController]
                                }]);
                            }]
                        }
                    },
                    'avaliacoes@disciplina.start': {
                        controller: 'eduAvaliacoesController',
                        controllerAs: 'controller',
                        templateUrl: avaliacaoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'AvaliacoesController',
                                    files: [avaliacaoController]
                                }]);
                            }]
                        }
                    },
                    'faltas@disciplina.start': {
                        controller: 'eduFaltasAulaListControlller',
                        controllerAs: 'controller',
                        templateUrl: faltaAulaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'FaltasController',
                                    files: [faltaController]
                                }]);
                            }]
                        }
                    },
                    'etapas@disciplina.start': {
                        controller: 'eduFaltasEtapasListControlller',
                        controllerAs: 'controller',
                        templateUrl: faltaEtapaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFaltasModule',
                                    files: [faltaEtapaController]
                                }]);
                            }]
                        }
                    },
                    'aula@disciplina.start': {
                        controller: 'eduFaltasAulaListControlller',
                        controllerAs: 'controller',
                        templateUrl: faltaAulaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduFaltasModule',
                                    files: [faltaAulaController]
                                }]);
                            }]
                        }
                    },
                    'ocorrencias@disciplina.start': {
                        controller: 'EduOcorrenciasController',
                        controllerAs: 'controller',
                        templateUrl: ocorrenciasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'OcorrenciasController',
                                    files: [ocorrenciasController]
                                }]);
                            }]
                        }
                    },
                    'entregas@disciplina.start': {
                        controller: 'eduEntregasController',
                        controllerAs: 'controller',
                        templateUrl: entregasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'entregasController',
                                    files: [entregasController]
                                }]);
                            }]
                        }
                    },
                    'aulas@disciplina.start': {
                        controller: 'eduAulasListController',
                        controllerAs: 'controller',
                        templateUrl: aulasView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'AulaController',
                                    files: [aulasController]
                                }]);
                            }]
                        }
                    },
                    'informacoes@disciplina.start': {
                        controller: 'eduDisciplinaComplementoController',
                        controllerAs: 'controller',
                        templateUrl: complementoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'InformacoesController',
                                    files: [complementoController]
                                }]);
                            }]
                        }
                    },
                    'materiais@disciplina.start': {
                        controller: 'eduMaterialController',
                        controllerAs: 'controller',
                        templateUrl: materialView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'MateriaisController',
                                    files: [materialController]
                                }]);
                            }]
                        }
                    },
                    'tccbanca@disciplina.start': {
                        controller: 'EduTccBancaController',
                        controllerAs: 'controller',
                        templateUrl: tccBancaView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduTccModule',
                                    files: [tccBancaController]
                                }]);
                            }]
                        }
                    },
                    'acompanhamentotcc@disciplina.start': {
                        controller: 'eduAcompanhamentoTccController',
                        controllerAs: 'controller',
                        templateUrl: acompanhamentoView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'AcompanhamentoTccController',
                                    files: [acompanhamentoController]
                                }]);
                            }]
                        }
                    },
                    'arquivofinaltcc@disciplina.start': {
                        controller: 'eduArquivoFinalListController',
                        controllerAs: 'controller',
                        templateUrl: arquivoFinalView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'ArquivoFinalListController',
                                    files: [arquivoFinalController]
                                }]);
                            }]
                        }
                    },
                    'informacoestcc@disciplina.start': {
                        controller: 'EduTccInformacoesController',
                        controllerAs: 'controller',
                        templateUrl: tccInformacoesView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduTccInformacoesController',
                                    files: [tccInformacoesController]
                                }]);
                            }]
                        }
                    }

                }
            }).state('tcc.cadastro-novo', {
                url: '/tcc/informacoes/{idTurmaDisc:int}/{codDisc:string}/novo',
                controller: 'EduTccInformacoesEditController',
                controllerAs: 'controller',
                templateUrl: tccInformacoesEditView,
                params: {
                    idTurmaDisc: 0,
                    codDisc: ''
                },
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduInformacoesEditController',
                            files: [tccInformacoesEditController]
                        }]);
                    }]
                }
            }).state('tcc.cadastro-edit', {
                url: '/tcc/informacoes/edit/{idTurmaDisc:int}/{codDisc:string}',
                controller: 'EduTccInformacoesEditController',
                controllerAs: 'controller',
                templateUrl: tccInformacoesEditView,
                params: {
                    idTurmaDisc: 0,
                    codDisc: ''
                },
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduInformacoesEditController',
                            files: [tccInformacoesEditController]
                        }]);
                    }]
                }
            });
        }
    }
});