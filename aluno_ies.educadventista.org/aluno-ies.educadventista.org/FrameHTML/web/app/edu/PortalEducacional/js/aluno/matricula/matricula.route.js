define(['aluno/matricula/matricula.module', 'aluno/dados-pessoais/dados-pessoais.module'], function() {

    'use strict';

    angular
        .module('eduMatriculaModule')
        .config(EduMatriculaRouteConfig);

    EduMatriculaRouteConfig.$inject = ['$stateProvider'];

    function EduMatriculaRouteConfig($stateProvider) {

        var matriculaEnsinoSuperiorView = 'js/aluno/matricula/ensino-superior/matriculaES.view.html',
            matriculaEnsinoSuperiorController = 'js/aluno/matricula/ensino-superior/matriculaES.controller.js',
            matriculaEtapaApresentacaoEnsinoSuperiorView = 'js/aluno/matricula/template-etapa/etapa-apresentacao.view.html',
            matriculaEtapaSelecaoPeriodoLetivoEnsinoSuperiorView = 'js/aluno/matricula/template-etapa/etapa-selecao-periodo-letivo.view.html',
            matriculaEtapaFiadorEnsinoSuperiorView = 'js/aluno/matricula/template-etapa/etapa-fiador.view.html',
            matriculaEtapaDisciplinasEnsinoSuperiorView = 'js/aluno/matricula/template-etapa/etapa-disciplinas-es.view.html',
            matriculaEtapaPlanosPagamentoEnsinoSuperiorView = 'js/aluno/matricula/template-etapa/etapa-planos-pagamento.view.html',
            matriculaEtapaFinalizacaoEnsinoSuperiorView = 'js/aluno/matricula/template-etapa/etapa-finalizacao.view.html',
            matriculaEtapaDocumentosEnsinoSuperiorView = 'js/aluno/dados-pessoais/documentos/documentos-matricula-list.view.html',
            matriculaEnsinoBasicoView = 'js/aluno/matricula/ensino-basico/matriculaEB.view.html',
            matriculaEnsinoBasicoController = 'js/aluno/matricula/ensino-basico/matriculaEB.controller.js',
            matriculaEtapaApresentacaoEnsinoBasicoView = 'js/aluno/matricula/template-etapa/etapa-apresentacao.view.html',
            matriculaEtapaSelecaoPeriodoLetivoEnsinoBasicoView = 'js/aluno/matricula/template-etapa/etapa-selecao-periodo-letivo.view.html',
            matriculaEtapaDisciplinasEnsinoBasicoView = 'js/aluno/matricula/template-etapa/etapa-disciplinas.view.html',
            matriculaEtapaItinerarioFormativoEnsinoBasicoView = 'js/aluno/matricula/template-etapa/etapa-itinerario-formativo.view.html',
            matriculaEtapaPlanosPagamentoEnsinoBasicoView = 'js/aluno/matricula/template-etapa/etapa-planos-pagamento.view.html',
            matriculaEtapaFinalizacaoEnsinoBasicoView = 'js/aluno/matricula/template-etapa/etapa-finalizacao.view.html',
            matriculaEtapaDocumentosEnsinoBasicoView = 'js/aluno/dados-pessoais/documentos/documentos-matricula-list.view.html',
            matriculaItinerarioFormativoView = 'js/aluno/matricula/ensino-basico/matriculaItinerarioFormativo.view.html',
            matriculaItinerarioFormativoController = 'js/aluno/matricula/ensino-basico/matriculaItinerarioFormativo.controller.js',
            matriculaItinerarioFormativoEtapaFinalizacao = 'js/aluno/matricula/ensino-basico/matriculaItinerarioFormativo-etapa-finalizacao.html';

        var dadosPessoaisListView = 'js/aluno/dados-pessoais/dados-pessoais.view.html',
            dadosPessoaisListController = 'js/aluno/dados-pessoais/dados-pessoais.controller.js',
            dadosProfissionaisView = 'js/aluno/dados-pessoais/dados-profissionais/dados-profissionais-edit.view.html',
            responsaveisListView = 'js/aluno/dados-pessoais/responsaveis/responsaveis-list.view.html',
            responsaveisListController = 'js/aluno/dados-pessoais/responsaveis/responsaveis-list.controller.js',
            documentosView = 'js/aluno/dados-pessoais/documentos/documentos-list.view.html',
            documentosController = 'js/aluno/dados-pessoais/documentos/documentos-list.controller.js',
            movAcadListView = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.view.html',
            movAcadListController = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.controller.js',
            responsaveisEditView = 'js/aluno/dados-pessoais/responsaveis/responsaveis-edit.view.html',
            responsaveisEditController = 'js/aluno/dados-pessoais/responsaveis/responsaveis-edit.controller.js',
            movAcadEditView = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.view.html',
            movAcadEditController = 'js/aluno/dados-pessoais/movimentacao-academica/movimentacao-academica-list.controller.js',
            fichaMedicaController = 'js/aluno/dados-pessoais/ficha-medica/ficha-medica.controller.js',
            fichaMedicaView = 'js/aluno/dados-pessoais/ficha-medica/ficha-medica.view.html',
            fichaMedicaFlexivelController = 'js/aluno/dados-pessoais/ficha-medica-flexivel/ficha-medica-flexivel.controller.js',
            fichaMedicaFlexivelView = 'js/aluno/dados-pessoais/ficha-medica-flexivel/ficha-medica-flexivel.view.html',
            termoImagemVozController = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.controller.js',
            termoImagemVozView = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.view.html',
            fiadorController = 'js/aluno/dados-pessoais/fiador/fiador.controller.js',
            fiadorView = 'js/aluno/dados-pessoais/fiador/fiador.view.html';

        init();

        function init() {
            validaUrlCustom();
            carregaRotas();
        }

        function validaUrlCustom() {

            /* URL CUSTOM Ensino Superior */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEnsinoSuperior) {
                matriculaEnsinoSuperiorView = 'js/aluno/matricula/custom/ensino-superior/matriculaES.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.matriculaEnsinoSuperior) {
                matriculaEnsinoSuperiorController = 'js/aluno/matricula/custom/ensino-superior/matriculaES.controller.js';
            }

            /* URL CUSTOM Ensino Básico */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEnsinoBasico) {
                matriculaEnsinoBasicoView = 'js/aluno/matricula/custom/ensino-basico/matriculaEB.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.matriculaEnsinoBasico) {
                matriculaEnsinoBasicoController = 'js/aluno/matricula/custom/ensino-basico/matriculaEB.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaApresentacaoEnsinoBasico) {
                matriculaEtapaApresentacaoEnsinoBasicoView = 'js/aluno/matricula/custom/template-etapa/etapa-apresentacao.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaSelecaoPeriodoLetivoEnsinoBasico) {
                matriculaEtapaSelecaoPeriodoLetivoEnsinoBasicoView = 'js/aluno/matricula/custom/template-etapa/etapa-selecao-periodo-letivo.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaDisciplinasEnsinoBasico) {
                matriculaEtapaDisciplinasEnsinoBasicoView = 'js/aluno/matricula/custom/template-etapa/etapa-disciplinas.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaItinerarioFormativoEnsinoBasico) {
                matriculaEtapaItinerarioFormativoEnsinoBasicoView = 'js/aluno/matricula/custom/template-etapa/etapa-itinerario-formativo.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaDocumentosEnsinoBasico) {
                matriculaEtapaDocumentosEnsinoBasicoView = 'js/aluno/dados-pessoais/documentos/custom/documentos-matricula-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaPlanosPagamentoEnsinoBasico) {
                matriculaEtapaPlanosPagamentoEnsinoBasicoView = 'js/aluno/matricula/custom/template-etapa/etapa-planos-pagamento.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.matriculaEtapaFinalizacaoEnsinoBasico) {
                matriculaEtapaFinalizacaoEnsinoBasicoView = 'js/aluno/matricula/custom/template-etapa/etapa-finalizacao.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.fichaMedica) {
                fichaMedicaView = 'js/aluno/dados-pessoais/ficha-medica/custom/ficha-medica.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.fichaMedica) {
                fichaMedicaController = 'js/aluno/dados-pessoais/ficha-medica/custom/ficha-medica.controller.js';
            }
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.termoImagemVoz) {
                termoImagemVozView = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.termoImagemVoz) {
                termoImagemVozController = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.controller.js';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.documentos) {
                documentosView = 'js/aluno/dados-pessoais/documentos/custom/documentos-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.documentos) {
                documentosController = 'js/aluno/dados-pessoais/documentos/custom/documentos-list.controller.js';
            }
        }

        function carregaRotas() {

            $stateProvider.state('matricula', {
                    abstract: true,
                    template: '<ui-view/>'

                })
                .state('matriculaEB', {
                    url: '/eb/matricula',
                    controller: 'EduMatriculaEBController',
                    controllerAs: 'controller',
                    templateUrl: matriculaEnsinoBasicoView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduMatriculaModule',
                                files: [matriculaEnsinoBasicoController]
                            }]);
                        }]
                    }
                })
                .state('matriculaEB.apresentacao', {
                    url: '/apresentacao',
                    templateUrl: matriculaEtapaApresentacaoEnsinoBasicoView
                })
                .state('matriculaEB.periodo-letivo', {
                    url: '/periodo-letivo',
                    templateUrl: matriculaEtapaSelecaoPeriodoLetivoEnsinoBasicoView
                })
                .state('matriculaEB.dados-pessoais', {
                    url: '/dados-pessoais',
                    params: {
                        origem: 'matricula-eb',
                        ocultarTabs: ['ficha-medica', 'ficha-medica-flexivel', 'documentos', 'fiador', 'termo-imagem-voz']
                    },
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                    name: 'eduDadosPessoaisController',
                                    files: [dadosPessoaisListController]
                                },
                                {
                                    name: 'eduResponsaveisListController',
                                    files: [responsaveisListController]
                                },
                                {
                                    name: 'eduDocumentosListController',
                                    files: [documentosController]
                                },
                                {
                                    name: 'eduMovimentacaoAcademicaController',
                                    files: [movAcadListController]
                                }
                            ]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduDadosPessoaisController',
                            controllerAs: 'controller',
                            templateUrl: dadosPessoaisListView
                        },
                        'dados-profissionais@matriculaEB.dados-pessoais': {
                            controller: 'eduDadosPessoaisController',
                            controllerAs: 'controller',
                            templateUrl: dadosProfissionaisView
                        },
                        'responsaveis@matriculaEB.dados-pessoais': {
                            controller: 'eduResponsaveisListController',
                            controllerAs: 'controller',
                            templateUrl: responsaveisListView
                        },
                        'documentos@matriculaEB.dados-pessoais': {
                            controller: 'eduDocumentosListController',
                            controllerAs: 'controller',
                            templateUrl: documentosView
                        },
                        'movimentacao-academica@matriculaEB.dados-pessoais': {
                            controller: 'eduMovimentacaoAcademicaController',
                            controllerAs: 'controller',
                            templateUrl: movAcadListView
                        }
                    }
                }).state('matriculaEB.ficha-medica', {
                    url: '/ficha-medica',
                    params: {
                        origem: 'matricula-eb',
                        botaoSalvarVisivel: false
                    },
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduFichaMedicaController',
                                files: [fichaMedicaController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduFichaMedicaController',
                            controllerAs: 'controller',
                            templateUrl: fichaMedicaView
                        }
                    }
                }).state('matriculaEB.ficha-medica-flexivel', {
                    params: {
                        origem: 'studentPortalRegistration',
                    },
                    url: '/ficha-medica-flexivel',
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduFichaMedicaFlexivelController',
                                files: [fichaMedicaFlexivelController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduFichaMedicaFlexivelController',
                            controllerAs: 'controller',
                            templateUrl: fichaMedicaFlexivelView
                        }
                    }
                }).state('matriculaEB.termo-imagem-voz', {
                    url: '/termo-imagem-voz',
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduTermoImagemVozController',
                                files: [termoImagemVozController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduTermoImagemVozController',
                            controllerAs: 'controller',
                            templateUrl: termoImagemVozView
                        }
                    }
                }).state('matriculaEB.documentos', {
                    url: '/documentos',
                    params: {
                        origem: 'matricula-eb'
                    },
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduDocumentosListController',
                                files: [documentosController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduDocumentosListController',
                            controllerAs: 'controller',
                            templateUrl: matriculaEtapaDocumentosEnsinoBasicoView
                        }
                    }
                })
                .state('matriculaEB.disciplinas', {
                    url: '/disciplinas',
                    templateUrl: matriculaEtapaDisciplinasEnsinoBasicoView
                })
                .state('matriculaEB.itinerario-formativo', {
                    url: '/itinerario-formativo',
                    templateUrl: matriculaEtapaItinerarioFormativoEnsinoBasicoView
                })
                .state('matriculaEB.planos-pagamento', {
                    url: '/planos-pagamento',
                    templateUrl: matriculaEtapaPlanosPagamentoEnsinoBasicoView
                })
                .state('matriculaEB.finalizacao', {
                    url: '/finalizacao',
                    templateUrl: matriculaEtapaFinalizacaoEnsinoBasicoView
                })

                .state('matriculaES', {
                    url: '/es/matricula',
                    controller: 'EduMatriculaESController',
                    controllerAs: 'controller',
                    templateUrl: matriculaEnsinoSuperiorView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduMatriculaModule',
                                files: [matriculaEnsinoSuperiorController]
                            }]);
                        }]
                    }
                })
                .state('matriculaES.apresentacao', {
                    url: '/apresentacao',
                    templateUrl: matriculaEtapaApresentacaoEnsinoSuperiorView
                })
                .state('matriculaES.periodo-letivo', {
                    url: '/periodo-letivo',
                    templateUrl: matriculaEtapaSelecaoPeriodoLetivoEnsinoSuperiorView
                })
                .state('matriculaES.fiador', {
                    url: '/fiador',
                    templateUrl: matriculaEtapaFiadorEnsinoSuperiorView
                })
                .state('matriculaES.dados-pessoais', {
                    url: '/dados-pessoais',
                    params: {
                        origem: 'matricula-es',
                        ocultarTabs: ['ficha-medica', 'ficha-medica-flexivel', 'documentos', 'fiador', 'termo-imagem-voz']
                    },
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                    name: 'eduDadosPessoaisController',
                                    files: [dadosPessoaisListController]
                                },
                                {
                                    name: 'eduResponsaveisListController',
                                    files: [responsaveisListController]
                                },
                                {
                                    name: 'eduDocumentosListController',
                                    files: [documentosController]
                                },
                                {
                                    name: 'eduMovimentacaoAcademicaController',
                                    files: [movAcadListController]
                                }
                            ]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduDadosPessoaisController',
                            controllerAs: 'controller',
                            templateUrl: dadosPessoaisListView
                        },
                        'dados-profissionais@matriculaES.dados-pessoais': {
                            controller: 'eduDadosPessoaisController',
                            controllerAs: 'controller',
                            templateUrl: dadosProfissionaisView
                        },
                        'responsaveis@matriculaES.dados-pessoais': {
                            controller: 'eduResponsaveisListController',
                            controllerAs: 'controller',
                            templateUrl: responsaveisListView
                        },
                        'documentos@matriculaES.dados-pessoais': {
                            controller: 'eduDocumentosListController',
                            controllerAs: 'controller',
                            templateUrl: documentosView
                        },
                        'fiador@matriculaES.dados-pessoais': {
                            controller: 'eduFiadorController',
                            controllerAs: 'controller',
                            templateUrl: dadosProfissionaisView
                        },
                        'movimentacao-academica@matriculaES.dados-pessoais': {
                            controller: 'eduMovimentacaoAcademicaController',
                            controllerAs: 'controller',
                            templateUrl: movAcadListView
                        },
                    }
                })
                .state('matriculaES.ficha-medica', {
                    url: '/ficha-medica',
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduFichaMedicaController',
                                files: [fichaMedicaController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduFichaMedicaController',
                            controllerAs: 'controller',
                            templateUrl: fichaMedicaView
                        }
                    }
                })
                .state('matriculaES.ficha-medica-flexivel', {
                    params: {
                        origem: 'studentPortalRegistration',
                    },
                    url: '/ficha-medica-flexivel',
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduFichaMedicaFlexivelController',
                                files: [fichaMedicaFlexivelController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduFichaMedicaFlexivelController',
                            controllerAs: 'controller',
                            templateUrl: fichaMedicaFlexivelView
                        }
                    }
                })
                .state('matriculaES.termo-imagem-voz', {
                    url: '/termo-imagem-voz',
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduTermoImagemVozController',
                                files: [termoImagemVozController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduTermoImagemVozController',
                            controllerAs: 'controller',
                            templateUrl: termoImagemVozView
                        }
                    }
                }).state('matriculaES.documentos', {
                    url: '/documentos',
                    params: {
                        origem: 'matricula-es'
                    },
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduDocumentosListController',
                                files: [documentosController]
                            }]);
                        }]
                    },
                    views: {
                        '': {
                            controller: 'eduDocumentosListController',
                            controllerAs: 'controller',
                            templateUrl: matriculaEtapaDocumentosEnsinoSuperiorView
                        }
                    }
                })
                .state('matriculaES.disciplinas', {
                    url: '/disciplinas',
                    templateUrl: matriculaEtapaDisciplinasEnsinoSuperiorView
                })
                .state('matriculaES.planos-pagamento', {
                    url: '/planos-pagamento',
                    templateUrl: matriculaEtapaPlanosPagamentoEnsinoSuperiorView
                })
                .state('matriculaES.finalizacao', {
                    url: '/finalizacao',
                    templateUrl: matriculaEtapaFinalizacaoEnsinoSuperiorView
                })

                .state('matriculaItinerarioFormativo', {
                    url: '/eb/matriculaitinerarioformativo',
                    controller: 'EduMatriculaItinerarioFormativoController',
                    controllerAs: 'controller',
                    templateUrl: matriculaItinerarioFormativoView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduMatriculaModule',
                                files: [matriculaItinerarioFormativoController]
                            }]);
                        }]
                    }
                })

                .state('matriculaItinerarioFormativoEtapaFinalizacao', {
                    url: '/eb/matriculaitinerarioformativo/finalizacaoitinerario',
                    templateUrl: matriculaItinerarioFormativoEtapaFinalizacao
                })

        }
    }
});