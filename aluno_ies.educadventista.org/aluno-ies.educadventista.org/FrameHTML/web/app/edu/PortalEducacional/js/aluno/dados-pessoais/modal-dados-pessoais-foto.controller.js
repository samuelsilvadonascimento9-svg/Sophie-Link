define(['aluno/dados-pessoais/dados-pessoais.module',
    'aluno/dados-pessoais/dados-pessoais.service'
], function() {

    'use strict';

    angular
        .module('eduDadosPessoaisModule')
        .controller('EduModalFotoController', EduModalFotoController);

    EduModalFotoController.$inject = ['$scope',
        'parametros',
        '$modalInstance',
        'eduDadosPessoaisService',
        'totvs.app-notification.Service',
        '$rootScope',
        '$state',
        'TotvsDesktopContextoCursoFactory',
        'i18nFilter'
    ];

    function EduModalFotoController($scope,
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
            CODCOLIGADA: '',
            FOTO: ''
        };
        self.origemMatricula = false
        self.acaoDeFecharModal = acaoDeFecharModal;
        self.registrarFotoAluno = registrarFotoAluno;
        self.acaoCancelarModal = acaoCancelarModal;

        self.alunoSelecionado = {};
        init();

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************

        function init() {
            var contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

            self.objContexto.RALogado = contexto.cursoSelecionado.RA;
            self.objContexto.CODCOLIGADA = contexto.cursoSelecionado.CODCOLIGADA;
            self.objContexto.FOTO = contexto.cursoSelecionado.FOTO;
            self.alunoSelecionado = parametros.alunoSelecionado;
        }

        function acaoDeFecharModal(fechou) {
            fecharModal(fechou);
            window.location.reload();
        }

        function fecharModal(fechou) {
            self.alunoSelecionado = {};
            $scope.$close(fechou);
        }

        function acaoCancelarModal() {
            fecharModal(false);
        }

        function registrarFotoAluno() {
            var reader = new FileReader(),
                file = self.alunoSelecionado.foto;

            if (typeof file !== "undefined") {

                if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
                    totvsNotification.notify({
                        type: 'error',
                        title: i18nFilter('l-erro-adicionar-foto', [], 'js/aluno/dados-pessoais'),
                        detail: i18nFilter('l-formato-invalido', [], 'js/aluno/dados-pessoais')
                    });
                    return;
                }

                if (file.size > 3000000) {
                    totvsNotification.notify({
                        type: 'error',
                        title: i18nFilter('l-erro-adicionar-foto', [], 'js/aluno/dados-pessoais'),
                        detail: i18nFilter('l-tamanho-excedido', [], 'js/aluno/dados-pessoais')
                    });
                    return;
                }

                reader.onload = function(e) {

                    var stringBinario = e.target.result.split(',')[1];
                    var nomeArquivo = self.objContexto.CODCOLIGADA + ';' +
                        self.objContexto.RALogado + '_' +
                        file.name;
                    var pathArquivo = nomeArquivo;
                    eduDadosPessoaisService.adicionarFotoAluno(self.objContexto.CODCOLIGADA,
                        self.objContexto.RALogado,
                        stringBinario,
                        nomeArquivo,
                        pathArquivo,
                        function(result) {
                            if (result) {
                                if (result.SAluno[0].IMAGEM != null) {
                                    self.acaoDeFecharModal(true);

                                    totvsNotification.notify({
                                        type: 'success',
                                        title: i18nFilter('l-foto-adicionada', [], 'js/aluno/dados-pessoais'),
                                        detail: result.message
                                    });
                                }
                            } else {
                                totvsNotification.notify({
                                    type: 'error',
                                    title: i18nFilter('l-erro-adicionar-foto', [], 'js/aluno/dados-pessoais'),
                                    detail: result.message
                                });
                            }
                        });
                };
                reader.readAsDataURL(file);
            } else {
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-erro-adicionar-foto', [], 'js/aluno/dados-pessoais'),
                    detail: i18nFilter('l-selecione-foto', [], 'js/aluno/dados-pessoais')
                });
            }
        }
    }
});