define(['aluno/dados-pessoais/documentos/documentos.module',
    'aluno/dados-pessoais/dados-pessoais.service'
], function() {

    'use strict';

    angular
        .module('eduDocumentosModule')
        .controller('EduModalAnexoController', EduModalAnexoController);

    EduModalAnexoController.$inject = ['$scope',
        'parametros',
        '$modalInstance',
        'eduDadosPessoaisService',
        'totvs.app-notification.Service',
        '$rootScope',
        '$state',
        'TotvsDesktopContextoCursoFactory',
        'i18nFilter'
    ];

    function EduModalAnexoController($scope,
        parametros,
        $modalInstance,
        eduDadosPessoaisService,
        totvsNotification,
        $rootScope,
        $state,
        TotvsDesktopContextoCursoFactory,
        i18nFilter) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************

        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************

        $scope.parametros = parametros;
        self.modalInstance = $modalInstance;
        self.objContexto = {
            RALogado: '',
            IDPERLET: '',
            IDHABILITACAOFILIAL: '',
            RA: ''
        };
        self.origemMatricula = false
        self.fechaModal = fechaModal;
        self.registrarAnexoDocumento = registrarAnexoDocumento;

        self.documentoSelecionado = {};
        self.temTextoOrientacao = false;
        init();

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************

        function init() {
            var contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

            self.objContexto.RALogado = contexto.cursoSelecionado.RA;
            self.objContexto.IDPERLET = contexto.cursoSelecionado.IdPerlet;
            self.objContexto.IDHABILITACAOFILIAL = contexto.cursoSelecionado.IdHabilitacaoFilial
            self.documentoSelecionado = parametros.documentoSelecionado;
            self.origemMatricula = parametros.origemMatricula;

            self.temTextoOrientacao = !!(self.documentoSelecionado.TXTORIENTACAOUPLDDOCUMENTOPRT &&
                self.documentoSelecionado.TXTORIENTACAOUPLDDOCUMENTOPRT.trim());
        }

        function fechaModal(fechou) {
            self.documentoSelecionado = {};
            eduDadosPessoaisService.limparCampoFileUpload();
            $scope.$close(fechou);
        }

        function registrarAnexoDocumento() {
            var reader = new FileReader(),
                file = self.documentoSelecionado.ARQUIVO;

            if (typeof file !== "undefined") {
                reader.onload = function(e) {

                    const stringBinario = e.target.result.split(',')[1];
                    const extensaoArquivo = file.name.toLowerCase().split('.').pop();
                    const nomeArquivo = self.documentoSelecionado.CODCOLIGADA + ';' +
                        self.documentoSelecionado.IDPERLET + ';' +
                        self.objContexto.RALogado + ';' +
                        self.documentoSelecionado.CODDOCUMENTO + '_' +
                        self.documentoSelecionado.DESCRICAO + '.' +
                        extensaoArquivo;
                    const pathArquivo = nomeArquivo;

                    let modelUploadDocumento = {
                        codDocumento: self.documentoSelecionado.CODDOCUMENTO,
                        ra: self.objContexto.RALogado,
                        idPerLet: self.documentoSelecionado.IDPERLET,
                        arquivo: stringBinario,
                        nomeArquivo: nomeArquivo,
                        pathArquivo: pathArquivo,
                        ehMatricula: self.origemMatricula,
                        idHabilitacaoFilial: self.documentoSelecionado.IDHABILITACAOFILIAL
                    };
                    eduDadosPessoaisService.uploadArquivo(modelUploadDocumento,
                        function(result) {
                            if (result) {
                                if (result.Arquivo != null) {
                                    self.fechaModal(true);

                                    if (!self.origemMatricula) {
                                        setTimeout(function() {
                                            $state.go($state.current, {
                                                tab: 'documentos'
                                            }, {
                                                reload: true
                                            });
                                        }, 500);
                                    }

                                    if (result.$messages ? .length > 0 && result.$messages[0].type === 'error') {
                                        totvsNotification.notify({
                                            type: result.$messages[0].type,
                                            title: result.MensagemNotificacao,
                                        });
                                    }
                                }
                            } else {
                                totvsNotification.notify({
                                    type: 'error',
                                    title: i18nFilter('l-erro-envio', [], 'js/aluno/dados-pessoais'),
                                });
                            }
                        });
                };
                reader.readAsDataURL(file);
            } else {
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-erro-envio', [], 'js/aluno/dados-pessoais'),
                    detail: i18nFilter('l-selecione-arquivo', [], 'js/aluno/dados-pessoais')
                });
            }
        }
    }
});