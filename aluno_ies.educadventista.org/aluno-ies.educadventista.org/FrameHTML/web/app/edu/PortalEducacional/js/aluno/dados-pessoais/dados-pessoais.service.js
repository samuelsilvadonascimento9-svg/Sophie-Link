/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduDadosPessoaisModule
 * @name eduDadosPessoaisService
 * @object service
 *
 * @created 2016-10-13 v12.1.15
 * @updated
 *
 * @requires
 *
 * @description Service utilizada para exibir as informações pessoais do aluno
 */

define(['aluno/dados-pessoais/dados-pessoais.module',
    'aluno/dados-pessoais/dados-pessoais.factory',
    'aluno/dados-pessoais/documentos/documentos.factory',
    'utils/edu-enums.constants'
], function() {

    'use strict';

    angular
        .module('eduDadosPessoaisModule')
        .service('eduDadosPessoaisService', EduDadosPessoaisService);

    EduDadosPessoaisService.$inject = ['$filter',
        'eduEnumsConsts',
        'totvs.app-notification.Service',
        'TotvsDesktopContextoCursoFactory',
        'eduDadosPessoaisFactory',
        'eduDocumentosFactory',
        'i18nFilter'
    ];

    function EduDadosPessoaisService($filter,
        eduEnumsConsts,
        appNotificationService,
        TotvsDesktopContextoCursoFactory,
        EduDadosPessoaisFactory,
        eduDocumentosFactory,
        i18nFilter
    ) {

        // *********************************************************************************
        // *** Variáveis
        // *********************************************************************************

        var self = this;

        // *********************************************************************************
        // *** Propriedades públicas e métodos
        // *********************************************************************************

        self.Aluno = {};

        self.carregaAlunoDoContexto = carregaAlunoDoContexto;
        self.carregaMascarasSistema = carregaMascarasSistema;
        self.atualizarDados = atualizarDados;
        self.downloadArquivo = downloadArquivo;
        self.uploadArquivo = uploadArquivo;
        self.uploadArquivoFiador = uploadArquivoFiador;
        self.getDocumentosAluno = getDocumentosAluno;
        self.getDocumentosAlunoMatricula = getDocumentosAlunoMatricula;
        self.getArquivos = getArquivos;
        self.criaHyperLink = criaHyperLink;
        self.criaBotaoUploadArquivos = criaBotaoUploadArquivos;
        self.formatarColunaSituacaoDocumento = formatarColunaSituacaoDocumento;
        self.limparCampoFileUpload = limparCampoFileUpload;
        self.formatarColunaObrigatorio = formatarColunaObrigatorio;
        self.exibirFiadoresAlunoAsync = exibirFiadoresAlunoAsync;
        self.getListaDeFiadoresAsync = getListaDeFiadoresAsync;
        self.adicionarFotoAluno = adicionarFotoAluno;

        /**
         * Carrega os dados do Aluno que está carregado no contexto
         *
         * @param {any} callback - função de callback a ser chamada
         */
        function carregaAlunoDoContexto(callback) {

            var contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

            EduDadosPessoaisFactory.buscaDadosPessoais(function(result) {
                self.Aluno = new Aluno(result, contexto);

                if (typeof callback === 'function') {
                    callback(self.Aluno);
                }
            });
        }

        /**
         * Carrega as máscaras utilizadas no sistema
         *
         * @returns Objeto com as máscaras do sistema
         */
        function carregaMascarasSistema() {
            return TotvsDesktopContextoCursoFactory.getMascarasSistema();
        }

        /**
         * Metodo para salvar o registro
         *
         * @param {any} pagina - página que deseja ser atulizada
         * @param {any} alunoParam - aluno que deseja atualizar
         * @param {any} callbackUpdate - função callback a ser executada
         */
        function atualizarDados(pagina, alunoParam, callbackUpdate) {
            var contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();
            self.Aluno = alunoParam;

            appNotificationService.question({
                title: $filter('i18n')('l-confirmar', [], 'js/aluno/dados-pessoais/'),
                text: $filter('i18n')('l-mensagem-atualizacao', [], 'js/aluno/dados-pessoais/'),
                size: 'sm',
                cancelLabel: 'l-no',
                confirmLabel: 'l-yes',
                callback: function(atualizar) {
                    if (atualizar) {

                        var dadosAtualizacao = {};
                        dadosAtualizacao.codColigada = self.Aluno.codColigada;
                        dadosAtualizacao.ra = self.Aluno.ra;

                        if (pagina === 'dados-pessoais') {
                            dadosAtualizacao.email = self.Aluno.email.value;
                            dadosAtualizacao.telefone1 = self.Aluno.telefone1.value;
                            dadosAtualizacao.telefone2 = self.Aluno.telefone2.value;
                            dadosAtualizacao.telefone3 = self.Aluno.telefone3.value;
                            dadosAtualizacao.empresaTelefone = self.Aluno.empresaTelefone.value;
                            dadosAtualizacao.fax = self.Aluno.fax.value;
                            dadosAtualizacao.rua = self.Aluno.rua.value;
                            dadosAtualizacao.numero = parseInt(self.Aluno.numero.value);
                            dadosAtualizacao.bairro = self.Aluno.bairro.value;
                            dadosAtualizacao.cep = self.Aluno.cep.value;
                            dadosAtualizacao.complemento = self.Aluno.complemento.value;
                            dadosAtualizacao.estado = self.Aluno.estado.value;
                            dadosAtualizacao.cidade = self.Aluno.cidade.value;
                            dadosAtualizacao.codmunicipio = self.Aluno.codmunicipio.value;
                            dadosAtualizacao.pais = self.Aluno.pais.value;
                        } else if (pagina === 'dados-profissionais') {
                            dadosAtualizacao.empresaNome = self.Aluno.empresaNome.value;
                            dadosAtualizacao.codOcupacao = self.Aluno.codOcupacao.value;
                            dadosAtualizacao.empresaCep = self.Aluno.empresaCep.value;
                            dadosAtualizacao.empresaRua = self.Aluno.empresaRua.value;
                            dadosAtualizacao.empresaNro = self.Aluno.empresaNumero.value;
                            dadosAtualizacao.empresaComplemento = self.Aluno.empresaComplemento.value;
                            dadosAtualizacao.empresaBairro = self.Aluno.empresaBairro.value;
                            dadosAtualizacao.empresaCidade = self.Aluno.empresaCidade.value;
                            dadosAtualizacao.empresaUF = self.Aluno.empresaUF.value;
                            dadosAtualizacao.empresaTelefone = self.Aluno.empresaTelefone.value;
                            dadosAtualizacao.empresaHorario = self.Aluno.empresaHorario.value;
                        }

                        EduDadosPessoaisFactory.atualizarDadosPessoais(dadosAtualizacao, function(alunoAtualizado) {

                            if (alunoAtualizado && alunoAtualizado['ra'] && alunoAtualizado['codColigada']) {

                                if (typeof callbackUpdate === 'function') {
                                    self.Aluno = {};
                                    self.Aluno = new Aluno(alunoAtualizado, contexto);
                                    callbackUpdate(self.Aluno);
                                }
                            }
                        });
                    }
                }
            });
        }

        /**
         * Carrega o objeto Aluno
         *
         * @param {any} dadosAluno - dados do aluno a ser carregado
         * @param {any} contexto - contexto do aluno
         */
        function Aluno(dadosAluno, contexto) {

            //Contexto
            this.codColigada = contexto.cursoSelecionado.CODCOLIGADA;
            this.nome = contexto.cursoSelecionado.NOMEALUNO;
            this.ra = contexto.cursoSelecionado.RA;
            this.curso = contexto.cursoSelecionado.NOMECURSO;
            this.habilitacao = contexto.cursoSelecionado.NOMEHABILITACAO;
            this.turno = contexto.cursoSelecionado.NOMETURNO;
            this.situacao = situacaoAluno();
            this.apresentacao = contexto.cursoSelecionado.APRESENTACAO;

            //Identificação
            this.foto = '';
            this.dataNascimento = '';
            this.naturalidade = '';
            this.estadoNatal = '';
            this.filiacao = [];

            //Contato
            this.email = new RegrasCampo();
            this.telefone1 = new RegrasCampo();
            this.telefone2 = new RegrasCampo();
            this.telefone3 = new RegrasCampo();
            this.descricaoTelefone1 = new RegrasCampo();
            this.descricaoTelefone2 = new RegrasCampo();
            this.descricaoTelefone3 = new RegrasCampo();
            this.empresaTelefone = new RegrasCampo();
            this.fax = new RegrasCampo();

            //Endereço
            this.rua = new RegrasCampo();
            this.numero = new RegrasCampo();
            this.bairro = new RegrasCampo();
            this.cep = new RegrasCampo();
            this.complemento = new RegrasCampo();
            this.cidade = new RegrasCampo();
            this.codmunicipio = new RegrasCampo();
            this.estado = new RegrasCampo();
            this.pais = new RegrasCampo();

            //Dados Profissionais
            this.empresaNome = new RegrasCampo();
            this.codOcupacao = new RegrasCampo();
            this.empresaCep = new RegrasCampo();
            this.empresaRua = new RegrasCampo();
            this.empresaNumero = new RegrasCampo();
            this.empresaComplemento = new RegrasCampo();
            this.empresaBairro = new RegrasCampo();
            this.empresaCidade = new RegrasCampo();
            this.empresaUF = new RegrasCampo();
            this.empresaHorario = new RegrasCampo();

            //Vínculo como Funcionário
            this.isFuncionario = false;

            // Mensagem de orientação para upload de foto
            this.msgOrientacaoUploadFotoAluno = new RegrasCampo();

            carregarDados(this, dadosAluno);

            function carregarDados(aluno, dados) {
                if (dados && dados['SAluno'][0]) {

                    aluno.foto = dados['SAluno'][0].IMAGEM;
                    aluno.dataNascimento = dados['SAluno'][0].DTNASCIMENTO;
                    aluno.naturalidade = dados['SAluno'][0].NATURALIDADE;
                    aluno.estadoNatal = dados['SAluno'][0].ESTADONATAL;
                    aluno.filiacao = dados['VFiliacao'];

                    aluno.email.value = dados['SAluno'][0].EMAIL;
                    aluno.email.visible = preparaVisible(dados['SAluno'][0].EMAIL);
                    aluno.email.readOnly = preparaReadOnly(aluno.email.visible, dados["CamposPerfil"][0].EMAIL);

                    aluno.descricaoTelefone1.value = dados['SAluno'][0].DESCRICAOTELEFONE1;
                    aluno.descricaoTelefone2.value = dados['SAluno'][0].DESCRICAOTELEFONE2;
                    aluno.descricaoTelefone3.value = dados['SAluno'][0].DESCRICAOTELEFONE3;

                    aluno.telefone1.value = dados['SAluno'][0].TELEFONE1;
                    aluno.telefone1.visible = preparaVisible(dados['SAluno'][0].TELEFONE1);
                    aluno.telefone1.readOnly = preparaReadOnly(aluno.telefone1.visible, dados["CamposPerfil"][0].TELEFONE1);

                    aluno.telefone2.value = dados['SAluno'][0].TELEFONE2;
                    aluno.telefone2.visible = preparaVisible(dados['SAluno'][0].TELEFONE2);
                    aluno.telefone2.readOnly = preparaReadOnly(aluno.telefone2.visible, dados["CamposPerfil"][0].TELEFONE2);

                    aluno.telefone3.value = dados['SAluno'][0].TELEFONE3;
                    aluno.telefone3.visible = preparaVisible(dados['SAluno'][0].TELEFONE3);
                    aluno.telefone3.readOnly = preparaReadOnly(aluno.telefone3.visible, dados["CamposPerfil"][0].TELEFONE3);

                    aluno.fax.value = dados['SAluno'][0].FAX;
                    aluno.fax.visible = preparaVisible(dados['SAluno'][0].FAX);
                    aluno.fax.readOnly = preparaReadOnly(aluno.fax.visible, dados["CamposPerfil"][0].FAX);

                    aluno.rua.value = dados['SAluno'][0].RUA;
                    aluno.rua.visible = preparaVisible(dados['SAluno'][0].RUA);
                    aluno.rua.readOnly = preparaReadOnly(aluno.rua.visible, dados["CamposPerfil"][0].RUA);

                    aluno.numero.value = dados['SAluno'][0].NUMERO;
                    aluno.numero.visible = preparaVisible(dados['SAluno'][0].NUMERO);
                    aluno.numero.readOnly = preparaReadOnly(aluno.numero.visible, dados["CamposPerfil"][0].NUMERO);

                    aluno.bairro.value = dados['SAluno'][0].BAIRRO;
                    aluno.bairro.visible = preparaVisible(dados['SAluno'][0].BAIRRO);
                    aluno.bairro.readOnly = preparaReadOnly(aluno.bairro.visible, dados["CamposPerfil"][0].BAIRRO);

                    aluno.cep.value = dados['SAluno'][0].CEP;
                    aluno.cep.visible = preparaVisible(dados['SAluno'][0].CEP);
                    aluno.cep.readOnly = preparaReadOnly(aluno.cep.visible, dados["CamposPerfil"][0].CEP);

                    aluno.complemento.value = dados['SAluno'][0].COMPLEMENTO;
                    aluno.complemento.visible = preparaVisible(dados['SAluno'][0].COMPLEMENTO);
                    aluno.complemento.readOnly = preparaReadOnly(aluno.complemento.visible, dados["CamposPerfil"][0].COMPLEMENTO);

                    aluno.cidade.value = dados['SAluno'][0].CIDADE;
                    aluno.cidade.visible = preparaVisible(dados['SAluno'][0].CIDADE);
                    aluno.cidade.readOnly = preparaReadOnly(aluno.cidade.visible, dados["CamposPerfil"][0].CIDADE);
                    aluno.codmunicipio.value = dados.SAluno[0].CODMUNICIPIO;

                    aluno.estado.value = dados['SAluno'][0].ESTADO;
                    aluno.estado.visible = preparaVisible(dados['SAluno'][0].ESTADO);
                    aluno.estado.readOnly = preparaReadOnly(aluno.estado.visible, dados["CamposPerfil"][0].ESTADO);

                    aluno.pais.value = dados['SAluno'][0].PAIS;
                    aluno.pais.visible = preparaVisible(dados['SAluno'][0].PAIS);
                    aluno.pais.readOnly = preparaReadOnly(aluno.pais.visible, dados["CamposPerfil"][0].PAIS);

                    aluno.empresaNome.value = dados['SAluno'][0].EMPRESANOME;
                    aluno.empresaNome.visible = preparaVisible(dados['SAluno'][0].EMPRESANOME);
                    aluno.empresaNome.readOnly = preparaReadOnly(aluno.empresaNome.visible, dados["CamposPerfil"][0].EMPRESANOME);

                    aluno.codOcupacao.value = dados['SAluno'][0].CODOCUPACAO;
                    aluno.codOcupacao.visible = preparaVisible(dados['SAluno'][0].CODOCUPACAO);
                    aluno.codOcupacao.readOnly = preparaReadOnly(aluno.codOcupacao.visible, dados["CamposPerfil"][0].CODOCUPACAO);

                    aluno.empresaCep.value = dados['SAluno'][0].EMPRESACEP;
                    aluno.empresaCep.visible = preparaVisible(dados['SAluno'][0].EMPRESACEP);
                    aluno.empresaCep.readOnly = preparaReadOnly(aluno.empresaCep.visible, dados["CamposPerfil"][0].EMPRESACEP);

                    aluno.empresaRua.value = dados['SAluno'][0].EMPRESARUA;
                    aluno.empresaRua.visible = preparaVisible(dados['SAluno'][0].EMPRESARUA);
                    aluno.empresaRua.readOnly = preparaReadOnly(aluno.empresaRua.visible, dados["CamposPerfil"][0].EMPRESARUA);

                    aluno.empresaNumero.value = dados['SAluno'][0].EMPRESANUMERO;
                    aluno.empresaNumero.visible = preparaVisible(dados['SAluno'][0].EMPRESANUMERO);
                    aluno.empresaNumero.readOnly = preparaReadOnly(aluno.empresaNumero.visible, dados["CamposPerfil"][0].EMPRESANUMERO);

                    aluno.empresaComplemento.value = dados['SAluno'][0].EMPRESACOMPLEMENTO;
                    aluno.empresaComplemento.visible = preparaVisible(dados['SAluno'][0].EMPRESACOMPLEMENTO);
                    aluno.empresaComplemento.readOnly = preparaReadOnly(aluno.empresaComplemento.visible, dados["CamposPerfil"][0].EMPRESACOMPLEMENTO);

                    aluno.empresaBairro.value = dados['SAluno'][0].EMPRESABAIRRO;
                    aluno.empresaBairro.visible = preparaVisible(dados['SAluno'][0].EMPRESABAIRRO);
                    aluno.empresaBairro.readOnly = preparaReadOnly(aluno.empresaBairro.visible, dados["CamposPerfil"][0].EMPRESABAIRRO);

                    aluno.empresaCidade.value = dados['SAluno'][0].EMPRESACIDADE;
                    aluno.empresaCidade.visible = preparaVisible(dados['SAluno'][0].EMPRESACIDADE);
                    aluno.empresaCidade.readOnly = preparaReadOnly(aluno.empresaCidade.visible, dados["CamposPerfil"][0].EMPRESACIDADE);

                    aluno.empresaUF.value = dados['SAluno'][0].EMPRESAUF;
                    aluno.empresaUF.visible = preparaVisible(dados['SAluno'][0].EMPRESAUF);
                    aluno.empresaUF.readOnly = preparaReadOnly(aluno.empresaUF.visible, dados["CamposPerfil"][0].EMPRESAUF);

                    aluno.empresaHorario.value = dados['SAluno'][0].EMPRESAHORARIO;
                    aluno.empresaHorario.visible = preparaVisible(dados['SAluno'][0].EMPRESAHORARIO);
                    aluno.empresaHorario.readOnly = preparaReadOnly(aluno.empresaHorario.visible, dados["CamposPerfil"][0].EMPRESAHORARIO);

                    aluno.empresaTelefone.value = dados['SAluno'][0].EMPRESATELEFONE;
                    aluno.empresaTelefone.visible = preparaVisible(dados['SAluno'][0].EMPRESATELEFONE);
                    aluno.empresaTelefone.readOnly = preparaReadOnly(aluno.empresaTelefone.visible, dados["CamposPerfil"][0].EMPRESATELEFONE);

                    aluno.isFuncionario = dados['SAluno'][0].ISFUNCIONARIO;

                    aluno.msgOrientacaoUploadFotoAluno.value = dados['SAluno'][0].MSGORIENTACAOUPLOADFOTOALUNO;
                    aluno.msgOrientacaoUploadFotoAluno.visible = preparaVisible(dados['SAluno'][0].MSGORIENTACAOUPLOADFOTOALUNO);
                }
            }

            /**
             * Situação de matrícula oo aluno baseado no contexto.
             *
             * @returns Situação de matrícula do aluno na habilitação.
             */
            function situacaoAluno() {
                if (contexto.cursoSelecionado.SITMATHABILITACAO) {
                    return contexto.cursoSelecionado.SITMATHABILITACAO;
                } else {
                    return contexto.cursoSelecionado.SITMATPERLET;
                }
            }
        }

        /**
         * Carrega o objeto com as regras de cada campo
         */
        //alternativa a class, pois o IE não o aceita
        var RegrasCampo = /** @class */ (function() {
            function RegrasCampo() {
                this.value = '';
                this.visible = true;
                this.readOnly = false;
            }
            return RegrasCampo;
        }());

        function preparaVisible(campoVisivel) {
            return angular.isDefined(campoVisivel);
        }

        function preparaReadOnly(campoVisivel, campoReadOnly) {
            return campoVisivel && angular.isDefined(campoReadOnly) && campoReadOnly;
        }

        function adicionarFotoAluno(codColigada, ra, foto, nomeArquivo, pathArquivo, callback) {
            EduDadosPessoaisFactory.adicionaFotoAlunoAsync(codColigada, ra, foto, nomeArquivo, pathArquivo, function(foto) {
                if (foto && angular.isFunction(callback))
                    callback(foto);
            });
        }

        function downloadArquivo(idArquivo, callback) {
            eduDocumentosFactory.downloadArquivo(idArquivo, function(arquivo) {
                if (arquivo && angular.isFunction(callback))
                    callback(arquivo);
            });
        }

        function uploadArquivo(modelUploadDocumento, callback) {
            eduDocumentosFactory.uploadArquivoAsync(modelUploadDocumento, function(arquivo) {
                if (arquivo && angular.isFunction(callback))
                    callback(arquivo);
            });
        }

        function uploadArquivoFiador(codDocumento, idFiador, idDocFiador, arquivo, nomeArquivo, pathArquivo, callback) {
            eduDocumentosFactory.uploadArquivoFiadorAsync(codDocumento, idFiador, idDocFiador, arquivo, nomeArquivo, pathArquivo, function(arquivo) {
                if (arquivo && angular.isFunction(callback))
                    callback(arquivo);
            });
        }

        // Utilizado apenas para recuperar os documentos obrigatórios, durante a matrícula.
        function getDocumentosAlunoMatricula(plSelecionado, callback) {
            eduDocumentosFactory.getDocumentosAlunoMatricula(plSelecionado.IDPERLET, plSelecionado.IDHABILITACAOFILIAL,
                function(documentosMatricula) {
                    if (documentosMatricula) {
                        if (angular.isFunction(callback))
                            callback(documentosMatricula.SDocExigidos);
                    }
                });
        }

        function getArquivos(documento, ra) {
            if (documento.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.EntregueEmValidacao ||
                documento.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.Validado) {
                let chaveRM = documento.CODCOLIGADA + ';' + documento.IDPERLET + ';' + ra + ';' + documento.CODDOCUMENTO;
                eduDocumentosFactory.getArquivoDocumento(chaveRM, eduEnumsConsts.EduDataServerArquivoEnum.DocumentosAluno,
                    function(arquivo) {
                        if (arquivo)
                            if (angular.isArray(arquivo))
                                documento["ARQUIVO"] = arquivo;
                    });
            }
        }

        function getDocumentosAluno(callback) {
            eduDocumentosFactory.getDocumentosAluno(
                function(documentoAluno) {
                    if (documentoAluno) {
                        if (angular.isFunction(callback))
                            callback(documentoAluno.SDocExigidos);
                    }
                });
        }

        function formatarColunaObrigatorio(item) {
            if (item.OBRIGATORIO)
                return i18nFilter('l-doc-obrigatorio-sim', [], 'js/aluno/dados-pessoais');
            else
                return i18nFilter('l-doc-obrigatorio-nao', [], 'js/aluno/dados-pessoais');
        }

        function criaHyperLink(item) {
            if (item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.Validado ||
                item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.EntregueEmValidacao) {
                return '<a class="underLineLink" ng-click="controller.downloadArquivo(' + item.CODDOCUMENTO + ')">' + item.DESCRICAO + '</a>';
            } else {
                return item.DESCRICAO;
            }
        }

        function exibirFiadoresAlunoAsync(idPerLet, callback) {
            EduDadosPessoaisFactory.exibirFiadoresAlunoAsync(idPerLet, function(result) {
                if (result) {
                    if (angular.isFunction(callback)) {
                        callback(result);
                    }
                }
            });
        }

        function getListaDeFiadoresAsync(idPerLet, callback) {
            EduDadosPessoaisFactory.getListaDeFiadoresAsync(idPerLet, function(result) {
                if (result) {
                    if (angular.isFunction(callback)) {
                        callback(result);
                    }
                }
            });
        }

        function criaBotaoUploadArquivos(item) {
            if (item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.EntregueEmValidacao ||
                item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.Validado ||
                !item.PERMITEUPLOAD) {
                return '';
            } else if (item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.Recusado ||
                item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.NaoEntregue) {
                return '<button class="btn-upload" ng-click="controller.abrirModalUploadArquivos(' + item.CODDOCUMENTO + ')" formnovalidate> <span id="spanbuttonAnexo" class="glyphicon glyphicon-paperclip" aria-hidden="True"></span> </button>';
            }
        }

        function formatarColunaSituacaoDocumento(item) {
            var conteudo;
            if (item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.EntregueEmValidacao) {
                conteudo = '<span class="tag legend doc-entregue-em-validacao"></span>';
            } else if (item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.Recusado) {
                conteudo = '<span class="tag legend doc-recusado"></span>';
            } else if (item.STATUS === eduEnumsConsts.EduStatusDocumentoEntregueEnum.Validado) {
                conteudo = '<span class="tag legend doc-validado"></span>';
            } else {
                conteudo = '<span class="tag legend doc-nao-entregue"></span>';
            }

            return '<span>' + conteudo + '</span>';
        }

        function limparCampoFileUpload() {
            $('[data-dismiss=modal]').on('click', function(e) {
                var $t = $(this),
                    target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];

                $(target)
                    .find("input,textarea,select")
                    .val('')
                    .end()
                    .find("input[type=checkbox], input[type=radio]")
                    .prop("checked", "")
                    .end();
            });
        }
    }
});