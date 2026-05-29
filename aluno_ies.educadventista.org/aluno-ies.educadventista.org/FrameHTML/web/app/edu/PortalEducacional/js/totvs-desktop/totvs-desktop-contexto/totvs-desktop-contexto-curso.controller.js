/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-desktop/totvs-desktop.module'], function() {

    'use strict';

    angular
        .module('totvsDesktop')
        .controller('TotvsDesktopContextoCursoController', TotvsDesktopContextoCursoController);

    TotvsDesktopContextoCursoController.$inject = [
        'i18nFilter',
        '$modalInstance',
        '$state',
        'TotvsDesktopContextoCursoFactory',
        'listaCursos',
        'eduEnumsConsts',
        'totvs.app-notification.Service',
        'eduUtilsFactory',
        '$rootScope',
    ];

    function TotvsDesktopContextoCursoController(
        i18nFilter,
        $modalInstance,
        $state,
        TotvsDesktopContextoCursoFactory,
        listaCursos,
        eduEnumsConsts,
        totvsNotification,
        eduUtilsFactory,
        $rootScope) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************

        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************

        self.idCursoSelecionado = -1;
        self.cursos = [];
        self.carregouCursos = false;
        self.exibeVisaoAluno = true; // quando verdadeiro, o label "Selecione um CURSO" será exibido e o label "Selecione um ALUNO" será escondido

        self.tipoUsuarioLogado = null;
        self.codUsuarioResponsavelLogado = null;
        self.nomeUsuarioLogado = null;
        self.exibeEntrarComo = false;
        self.possuiContextoBiblioteca = false;
        self.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno;
        self.apresentacaoEB = eduEnumsConsts.EduTipoApresentacaoEnum.EnsinoBasico;
        self.apresentacaoES = eduEnumsConsts.EduTipoApresentacaoEnum.EnsinoSuperior;
        self.unidadesBibliotecariasDisponiveis = [];
        self.acessoEducacionalEBiblioteca = false;
        self.listaColigadas = [];
        self.listaFiliais = [];
        self.listaUnidadesBibliotecarias = [];
        self.objContextoBibliotecaSelecionado = {
            codColigada: 0,
            codFilial: 0,
            codUnidadeBibliotecaria: 0
        };

        self.confirmar = confirmar;
        self.filtrarPorUsuarioLogado = filtrarPorUsuarioLogado;
        self.alterarEntrarComo = alterarEntrarComo;
        self.configurarCSSFocoItemCurso = configurarCSSFocoItemCurso;
        self.configurarTabs = configurarTabs;
        self.configurarCSSEntrarComo = configurarCSSEntrarComo;
        self.selecionar = selecionar;
        self.fecharModalSelecaoContextoCurso = fecharModalSelecaoContextoCurso;
        self.existeContextoCursoSelecionado = existeContextoCursoSelecionado;
        self.preencheFiliais = preencheFiliais;
        self.preencheUnidadesBibliotecaria = preencheUnidadesBibliotecaria;

        init();

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************

        function init() {
            var parameters = {};

            if (listaCursos == null || listaCursos.somenteContextoBiblioteca) {
                // listaCursos não estará preenchido quando usuário clicar no link 'Alterar curso' independente do número de cursos do usuário logado
                TotvsDesktopContextoCursoFactory.getContextoAluno(parameters, preencherCampos);
            } else {
                // listaCursos estará preenchido quando possuir mais de 1 curso e controller for chamado no init do desktop-controller
                preencherCampos(listaCursos);
            }
        }

        function preencherCampos(result) {
            filtrarCursos(result);
            self.carregouCursos = true;

            var houveAlteracaoUsuario = TotvsDesktopContextoCursoFactory.verificarAlteracaoUsuario(self.cursos),
                contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

            configurarUsuarioLogado();

            if (self.cursos.length > 0) {

                if (!houveAlteracaoUsuario && contexto != null) {
                    validacoesContextoBiblioteca();
                    // não houve alteração de usuário e contexto já está armazenado em memória
                    var cursoSelecionado = contexto.cursoSelecionado;
                    criarIDCurso(cursoSelecionado);
                    self.idCursoSelecionado = cursoSelecionado.ID;
                    self.entrarComo = contexto.entrarComo;
                } else {

                    if (self.tipoUsuarioLogado === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Aluno) {
                        validacoesContextoBiblioteca();
                        self.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno;
                    } else if (self.tipoUsuarioLogado === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Responsavel) {
                        self.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;

                        if ($rootScope.usuariosBiblioteca && $rootScope.usuariosBiblioteca.length > 0) {
                            self.possuiContextoBiblioteca = true;
                        }
                    } else {
                        // se for aluno e responsável, inicializa o campo entrar como com o valor "A"
                        self.entrarComo = TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Aluno;
                    }

                    selecionarCursoInicial();
                }

                configurarTela();

            } else {
                validacoesContextoBiblioteca();
            }

        }

        function validacoesContextoBiblioteca() {
            if (angular.isDefined($rootScope.usaIntegracaoPergamum) && $rootScope.usaIntegracaoPergamum)
                return;

            // Verifica se o usário tem permissão para acessar o TOTVS Gestão Bibliotecária
            TotvsDesktopContextoCursoFactory.getContextoBiblioteca(function(result) {
                if (result.LIBRARYUNITCONTEXT.length > 0) {

                    self.possuiContextoBiblioteca = true;
                    self.acessoEducacionalEBiblioteca = self.possuiContextoBiblioteca && self.cursos.length > 0;

                    self.nomeUsuarioLogado = $rootScope.InformacoesLogin.username;
                    $rootScope.codUsuarioAtualBiblioteca = $rootScope.InformacoesLogin.login;
                    self.unidadesBibliotecariasDisponiveis = result.LIBRARYUNITCONTEXT;
                    window.localStorage.setItem('UsuarioBiblioteca' + $rootScope.InformacoesLogin.login, 'true');

                    self.unidadesBibliotecariasDisponiveis.filter(function(itemContexto) {
                        if (!self.listaColigadas.find(function(coligada) {
                                return coligada.codColigada === itemContexto.CompanyCode;
                            })) {
                            var itemColigada = {};
                            itemColigada.value = itemContexto.CompanyDescription;
                            itemColigada.codColigada = itemContexto.CompanyCode;
                            itemColigada.nomeColigada = itemContexto.CompanyDescription;

                            self.listaColigadas.push(itemColigada);
                        }
                        return true;
                    });

                    var contexto = TotvsDesktopContextoCursoFactory.getContextoBibliotecaSelecionado();

                    //Ao recarregar a página, se o usuário não possuir curso, fecha o modal para que o usuário
                    //não precise selecionar novamente o contexto da biblioteca
                    if (self.cursos.length === 0 && contexto !== null && !listaCursos.somenteContextoBiblioteca) {
                        fechaModalContexto();
                    }

                    if (contexto !== null) {

                        self.objContextoBibliotecaSelecionado.codColigada = contexto.codColigada;
                        self.objContextoBibliotecaSelecionado.codFilial = contexto.codFilial;
                        self.objContextoBibliotecaSelecionado.codUnidadeBibliotecaria = contexto.codUnidadeBibliotecaria;
                    } else {
                        self.objContextoBibliotecaSelecionado.codColigada = result.LIBRARYUNITCONTEXT[0].CompanyCode;
                        self.objContextoBibliotecaSelecionado.codFilial = result.LIBRARYUNITCONTEXT[0].BranchCode;
                        self.objContextoBibliotecaSelecionado.codUnidadeBibliotecaria = result.LIBRARYUNITCONTEXT[0].LibraryUnitCode;
                    }

                    preencheFiliais(false);
                    preencheUnidadesBibliotecaria(false);
                }
            });
        }

        function fechaModalContexto() {
            $rootScope.$broadcast('OnChangeContextoBibliotecaEmit:Event', {});
            $modalInstance.dismiss();
        }

        function preencheFiliais(coligadaAlterada) {
            self.listaFiliais = [];

            if (coligadaAlterada) {
                self.objContextoBibliotecaSelecionado.codFilial = null;
            }

            self.unidadesBibliotecariasDisponiveis.filter(function(itemContexto) {
                if (!self.listaFiliais.find(function(filial) {
                        return filial.codFilial === itemContexto.BranchCode;
                    })) {
                    if (itemContexto.CompanyCode === self.objContextoBibliotecaSelecionado.codColigada) {
                        var itemFilial = {};
                        itemFilial.value = itemContexto.BranchCode;
                        itemFilial.codFilial = itemContexto.BranchCode;
                        itemFilial.nomeFilial = itemContexto.BranchDescription;

                        self.listaFiliais.push(itemFilial);
                    }
                }
                return true;
            });

            if (self.objContextoBibliotecaSelecionado.codFilial) {
                self.listaUnidadesBibliotecarias = [];
            }
        }

        function preencheUnidadesBibliotecaria(filialAlterada) {
            self.listaUnidadesBibliotecarias = [];

            if (filialAlterada) {
                self.objContextoBibliotecaSelecionado.codUnidadeBibliotecaria = null;
            }

            self.unidadesBibliotecariasDisponiveis.filter(function(itemContexto) {
                if (!self.listaUnidadesBibliotecarias.find(function(unidadeBib) {
                        return unidadeBib.codUnidadeBib === itemContexto.LibraryUnitCode;
                    })) {
                    if (itemContexto.CompanyCode === self.objContextoBibliotecaSelecionado.codColigada && itemContexto.BranchCode === self.objContextoBibliotecaSelecionado.codFilial) {
                        var itemUnidadeBib = {};
                        itemUnidadeBib.codUnidadeBib = itemContexto.LibraryUnitCode;
                        itemUnidadeBib.nomeUnidadeBib = itemContexto.LibraryUnitDescription;

                        self.listaUnidadesBibliotecarias.push(itemUnidadeBib);
                    }
                }
                return true;
            });
        }

        // monta um array de cursos sem repetir a habilitação/filial
        function filtrarCursos(listaCursos) {

            var novaLista = [],
                i, j, adicionado, curso;

            for (i = 0; i < listaCursos.length; i++) {

                adicionado = false;
                curso = listaCursos[i];

                criarIDCurso(curso);

                // verifica se habilitação/filial já foi adicionada
                for (j = 0; j < novaLista.length; j++) {

                    if (curso.ID === novaLista[j].ID) {
                        adicionado = true;
                        break;
                        // se já existir habilitação do mesmo curso e habilitação na lista e filiais diferentes, exibe a filial para não dar a impressão de que o mesmo curso está sendo exibido duplicado
                    } else if ((curso.CODCURSO === novaLista[j].CODCURSO &&
                            curso.CODHABILITACAO === novaLista[j].CODHABILITACAO) &&
                        curso.CODFILIAL !== novaLista[j].CODFILIAL) {
                        novaLista[j].exibeFilial = true;
                        curso.exibeFilial = true;
                    }

                }

                // se não foi adicionado, adiciona
                if (!adicionado) {
                    // adiciona
                    novaLista.push(curso);
                }
            }

            self.cursos = novaLista;
        }

        // para cada item cria um ID composto por CODCOLIGADA + IDHABILITACAOFILIAL + RA
        function criarIDCurso(itemCurso) {
            itemCurso.CodItem = itemCurso.CODCOLIGADA.toString() + itemCurso.IDHABILITACAOFILIAL.toString() + itemCurso.RA.toString();
            itemCurso.ID = itemCurso.CODCOLIGADA.toString() + itemCurso.IDPERLET.toString() + itemCurso.IDHABILITACAOFILIAL.toString() + itemCurso.RA.toString();
        }

        function configurarUsuarioLogado() {

            var retorno = {};

            self.tipoUsuarioLogado = TotvsDesktopContextoCursoFactory.getTipoUsuarioLogado(self.cursos, retorno);

            if (self.tipoUsuarioLogado === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Aluno) {
                self.nomeUsuarioLogado = retorno.nomeAluno;
            } else if (retorno.codUsuarioPai) {
                self.codUsuarioResponsavelLogado = retorno.codUsuarioPai;
                self.nomeUsuarioLogado = retorno.nomePai;
            } else if (retorno.codUsuarioMae) {
                self.codUsuarioResponsavelLogado = retorno.codUsuarioMae;
                self.nomeUsuarioLogado = retorno.nomeMae;
            } else if (retorno.codUsuarioRaca) {
                self.codUsuarioResponsavelLogado = retorno.codUsuarioRaca;
                self.nomeUsuarioLogado = retorno.nomeRaca;
            } else if (retorno.codUsuarioRespFin) {
                self.codUsuarioResponsavelLogado = retorno.codUsuarioRespFin;
                self.nomeUsuarioLogado = retorno.nomeRespFin;
            } else if (retorno.codUsuarioRespContrato) {
                self.codUsuarioResponsavelLogado = retorno.codUsuarioRespContrato;
                self.nomeUsuarioLogado = retorno.nomeRespContrato;
            } else {
                self.codUsuarioResponsavelLogado = retorno.codUsuarioRespParcela;
                self.nomeUsuarioLogado = retorno.nomeRespParcela;
            }
        }

        function selecionarCursoInicial() {

            var listaCursosXTipoUsuarioLogado = [];

            if (self.tipoUsuarioLogado === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.AlunoResponsavel) {
                // considera a lista de cursos de acordo com a variável "entrar Como"
                self.cursos.map(filtrarPorUsuarioLogado(self.entrarComo, self.codUsuarioResponsavelLogado, listaCursosXTipoUsuarioLogado));
            } else {
                listaCursosXTipoUsuarioLogado = self.cursos;
            }

            self.idCursoSelecionado = listaCursosXTipoUsuarioLogado[0].ID;

        }

        // retorna o curso de acordo com o id selecionado
        function buscarCursoSelecionado() {
            if (self.idCursoSelecionado === -1) {
                return null;
            }

            var i;
            for (i = 0; i < self.cursos.length; i++) {
                if (self.cursos[i].ID == self.idCursoSelecionado) {
                    return self.cursos[i];
                }
            }
        }

        // armazena no cookie o curso selecionado pelo usuário
        function confirmar() {
            var voltaPaginaLoginCasoNaoPossuaCurso = -2;

            if (self.possuiContextoBiblioteca && self.idCursoSelecionado == -1) {
                if (gravaContextoBibliotecaSelecionado()) {
                    $state.reload();
                } else {
                    return;
                }

                $modalInstance.dismiss();
                return;
            }

            if (self.idCursoSelecionado == -1) {
                if (localStorage.getItem('loginunificadoaluno') === 'true' || EDU_CONST_GLOBAL_USAR_LOGINPORTAIS) {
                    localStorage.setItem('messageError', i18nFilter('l-nenhum-curso'));
                    eduUtilsFactory.getAuthParams(redirectToLoginPortais);
                    return;
                }
                history.go(voltaPaginaLoginCasoNaoPossuaCurso);
            } else {
                if (!gravaContextoBibliotecaSelecionado()) {
                    return;
                }

                TotvsDesktopContextoCursoFactory.selecionarCurso(buscarCursoSelecionado(), true, function(result) {

                    if (result && result.value) {
                        totvsNotification.notify({
                            type: 'info',
                            title: result.value.Code,
                            detail: result.value.Detail
                        });
                    }
                    $modalInstance.dismiss();
                });
            }
        }

        function redirectToLoginPortais(authParams) {
            const alias = window.localStorage.getItem('aliasSelecionado') ? .toString() ? ? '';
            const url = `${EDU_CONST_GLOBAL_URL_LOGINPORTAIS}#/loginwithtoken/${alias}/${authParams.AccessToken}`;
            location.href = url;
        }

        function gravaContextoBibliotecaSelecionado() {

            if (!self.possuiContextoBiblioteca || ($rootScope.usuariosBiblioteca && $rootScope.usuariosBiblioteca.length > 0)) {
                return true;
            }

            if (self.objContextoBibliotecaSelecionado.codColigada > 0 &&
                self.objContextoBibliotecaSelecionado.codFilial > 0 &&
                self.objContextoBibliotecaSelecionado.codUnidadeBibliotecaria > 0) {
                TotvsDesktopContextoCursoFactory.gravaContextoBibliotecaSelecionado(self.objContextoBibliotecaSelecionado);
                return true;
            } else {
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-Atencao'),
                    detail: i18nFilter('l-msg-erro-campos-obrigatorios', [], 'js/totvs-desktop')
                });

                return false;
            }

        }

        function alterarEntrarComo() {

            selecionar(null);
            self.exibeVisaoAluno = (self.entrarComo === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Aluno);
            selecionarCursoInicial();
        }

        function selecionar(curso) {
            if (curso == null) {
                self.idCursoSelecionado = -1;
            } else {
                self.idCursoSelecionado = curso.ID;
                // seta o foco no radio button dentro da div do item curso selecionado
                $('.contexto-curso-body').find('.item-curso').find('input[value="' + self.idCursoSelecionado + '"]').focus();
            }
        }

        function configurarTela() {

            // verifica se deve exibir o campo entrar como aluno ou responsável (no caso do usuário ser aluno e responsável ao mesmo tempo)
            self.exibeEntrarComo = (self.tipoUsuarioLogado === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.AlunoResponsavel);

            self.exibeVisaoAluno = (self.entrarComo === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Aluno);
        }

        function configurarCSSEntrarComo() {

            var radioEntrarComo = $('.contexto-curso-body').find('.entrar-como input:visible');

            radioEntrarComo.addClass('radio-entrar-como');

        }

        // configura o CSS do focus na div do item do curso
        function configurarCSSFocoItemCurso(curso, focus) {
            if (focus) {
                curso.cssFocus = 'div-item-curso-focus';
            } else {
                curso.cssFocus = null;
            }
        }

        // configura o tab para que o foco não saia do modal
        function configurarTabs(e) {

            if (e.keyCode === 9) { // tab

                // monta o array com todos os elementos visíveis da tela
                var radioEntrarComo = $('.contexto-curso-body').find('.entrar-como input:visible:checked'),
                    radioCursoSelecionado = $('.contexto-curso-body').find('.item-curso').find('input:visible:checked'),
                    btnConfirmar = $('div').find('#btnConfirmar');

                // verifica se o campo entrar está visível na tela
                if (radioEntrarComo.length > 0) {
                    // verifica se o campo entrar como possui o foco
                    if (e.currentTarget.id === radioEntrarComo.attr('id') && e.shiftKey) {
                        e.preventDefault();
                        btnConfirmar.focus();
                        return;
                    }
                } else {
                    // quando a lista de cursos for o primeiro campo visível, verifica se o primeiro
                    // item possui o foco
                    if (e.currentTarget.id === radioCursoSelecionado.attr('id') && e.shiftKey) {
                        e.preventDefault();
                        btnConfirmar.focus();
                        return;
                    }
                }

                // verifica se o botão confirmar possui o foco
                if (e.currentTarget.id === btnConfirmar.attr('id')) {

                    e.preventDefault();
                    if (radioEntrarComo.length > 0) {
                        if (e.shiftKey) {
                            radioCursoSelecionado.focus();
                        } else {
                            radioEntrarComo.focus();
                        }
                    } else {
                        radioCursoSelecionado.focus();
                    }

                    return;
                }

            }
        }

        // função para filtrar os dados exibidos na visão de acordo com o campo entrar como
        // Quando arrResult é um array, adiciona o curso se a condição for verdadeira
        function filtrarPorUsuarioLogado(entrarComo, codUsuarioResp, arrResult) {

            return function(curso) {

                if (entrarComo === eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno) {
                    if (!curso.CODUSUARIOPAI && !curso.CODUSUARIOMAE &&
                        !curso.CODUSUARIORACA && !curso.CODUSUARIORESPFINANCEIRO &&
                        !curso.CODUSUARIORESPCONTRATO && !curso.CODUSUARIORESPPARCELA) {

                        if (arrResult) {
                            arrResult.push(curso);
                        }

                        return curso;
                    }
                } else {
                    if (curso.CODUSUARIOPAI === codUsuarioResp || curso.CODUSUARIOMAE === codUsuarioResp ||
                        curso.CODUSUARIORACA === codUsuarioResp || curso.CODUSUARIORESPFINANCEIRO === codUsuarioResp ||
                        curso.CODUSUARIORESPCONTRATO === codUsuarioResp || curso.CODUSUARIORESPPARCELA === codUsuarioResp) {

                        if (arrResult) {
                            arrResult.push(curso);
                        }

                        return curso;
                    }
                }
            };
        }

        function fecharModalSelecaoContextoCurso() {
            if (existeContextoCursoSelecionado()) {
                $modalInstance.dismiss();
            }
        }

        function existeContextoCursoSelecionado() {
            return TotvsDesktopContextoCursoFactory.existeContextoValidoCookie();
        }
    }

});