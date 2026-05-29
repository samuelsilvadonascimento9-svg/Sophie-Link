define(['totvs-desktop/totvs-desktop.module',
    'js-cookie',
    'totvs-desktop/totvs-desktop-termo-consentimento/totvs-desktop-termo-consentimento.service'
], function(module, Cookies) {

    'use strict';

    angular
        .module('totvsDesktop')
        .factory('TotvsDesktopContextoCursoFactory', TotvsDesktopContextoCursoFactory);

    TotvsDesktopContextoCursoFactory.$inject = [
        '$totvsresource',
        '$modal',
        '$state',
        '$rootScope',
        '$window',
        'eduEnumsConsts',
        'totvsDesktopTermoConsentimentoService'
    ];

    function TotvsDesktopContextoCursoFactory(
        $totvsresource,
        $modal,
        $state,
        $rootScope,
        $window,
        eduEnumsConsts,
        totvsDesktopTermoConsentimentoService) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Contexto/:method',
            urlContextoAluno = 'Selecao',
            urlContextoComFoto = 'ContextoComFoto',
            factory,
            CONST_COOKIE_CONTEXTO_CURSO = 'EduContextoAlunosCLIENT',
            CONST_COOKIE_CONTEXTO_ALUNO = 'EduContextoAlunoResponsavelAPI',
            CONST_COOKIE_CONTEXTO_MASCARAS = 'EduMascaras',
            CONST_COOKIE_CONTEXTO_BIB = 'BibContextoUsuarioClient',
            CONST_CONTEXTO_BIBLIOTECA = 'ContextoBiblioteca';

        factory = $totvsresource.REST(url, {}, {});

        factory.tipoUsuarioEnum = {
            Aluno: eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno,
            Responsavel: eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel,
            AlunoResponsavel: eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno +
                eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel
        };

        factory.getContextoAluno = getContextoAluno;
        factory.getCursoSelecionado = getCursoSelecionado;
        factory.selecionarCurso = selecionarCurso;
        factory.existeContextoValidoCookie = existeContextoValidoCookie;
        factory.verificarAlteracaoUsuario = verificarAlteracaoUsuario;
        factory.abrirModalCursos = abrirModalCursos;
        factory.getContextoAlunoComFoto = getContextoAlunoComFoto;
        factory.getTipoUsuarioLogado = getTipoUsuarioLogado;
        factory.reloadPortal = reloadPortal;
        factory.getMascarasSistema = getMascarasSistema;
        factory.getLogo = getLogo;
        factory.getInformacoesUsuarioLogadoAsync = getInformacoesUsuarioLogadoAsync;
        factory.getIdContextoEncode = getIdContextoEncode;
        factory.getContextoBiblioteca = getContextoBiblioteca;
        factory.getContextoBibliotecaListaUsuarios = getContextoBibliotecaListaUsuarios;

        factory.gravaContextoBibliotecaSelecionado = gravaContextoBibliotecaSelecionado;
        factory.getContextoBibliotecaSelecionado = getContextoBibliotecaSelecionado;
        factory.carregaDadosBibliotecaResponsavel = carregaDadosBibliotecaResponsavel;
        factory.getListaTipoUsuario = getListaTipoUsuario;
        factory.getUrlLogOutSaml = getUrlLogOutSaml;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        // busca os cursos disponíveis para o usuário
        function getContextoAluno(parameters, callback) {

            return factory.TOTVSQuery(function(listaContexto) {
                $rootScope.listaCursos = listaContexto;
                let contextoComIdContextoAluno = setContextoWithIdContextoAluno(listaContexto);
                $rootScope.ListaContextosDisponiveisAluno = contextoComIdContextoAluno;
                adicionarInfoContextoAlunoResponsavelEmCursos(listaContexto, contextoComIdContextoAluno, callback);

                carregaDadosBibliotecaResponsavel(function(carregado) {
                    if (carregado != null) {
                        callback();
                    }
                });
            });
        }

        function setContextoWithIdContextoAluno(listaContexto) {
            let listaContextoComId = [];

            angular.forEach(listaContexto, function(itemContexto) {
                let contexto = {
                    CodColigada: itemContexto.CODCOLIGADA,
                    CodFilial: itemContexto.CODFILIAL,
                    CodTipoCurso: itemContexto.CODTIPOCURSO,
                    IdContextoAluno: itemContexto.IDCONTEXTOALUNO,
                    IdHabilitacaoFilial: itemContexto.IDHABILITACAOFILIAL,
                    IdPerlet: itemContexto.IDPERLET,
                    RA: itemContexto.RA,
                    AcessoDadosAcademicos: itemContexto.ACESSODADOSACADEMICOS == 'S',
                    AcessoDadosFinanceiros: itemContexto.ACESSODADOSFINANCEIROS == 'S'
                };

                listaContextoComId.push(contexto);
            });

            return listaContextoComId;
        }

        // Busca contexto com foto
        function getContextoAlunoComFoto(callback) {
            let parameters = {
                method: urlContextoComFoto
            };

            return factory.TOTVSQuery(parameters, function(listaCursos) {
                adicionarInfoContextoAlunoResponsavelEmCursos(listaCursos, $rootScope.ListaContextosDisponiveisAluno, callback(listaCursos));
            });
        }

        // Realiza a adição da informação de contexto a ser utilizado para cada curso disponível
        function adicionarInfoContextoAlunoResponsavelEmCursos(cursos, contextos, callback) {
            if (cursos.length !== contextos.length) {

                console.error('[Erro]O número de cursos retornados é diferente do número de contextos disponíveis para o Aluno/Responsável!');
                //Executa callback com os cursos como retorno
                if (callback)
                    return callback(cursos);

                return;
            }

            //Os dois arrays possuem a mesma fontes de dados, por isso podem ser comparados via índice
            for (let i = 0; i < cursos.length; i++) {
                cursos[i].contexto = contextos[i];
            }

            //Executa callback com os cursos como retorno, onde contém os contextos de cada curso
            if (callback)
                callback(cursos);
        }

        //Efetua a gravação do contexto do aluno
        function gravarContextoAlunoResponsavelSelecionado(contexto, callback) {
            factory.TOTVSSave({
                method: urlContextoAluno
            }, contexto, callback);
        }

        // retorna o curso selecionado pelo usuário (armazenado no cookie)
        function getCursoSelecionado() {
            let contexto = null;

            if (browserSuportaLocalStorage()) {
                if ($rootScope.InformacoesLogin) {
                    contexto = $window.localStorage.getItem($rootScope.InformacoesLogin.login);
                    if (contexto) {
                        contexto = angular.fromJson(contexto);
                        exibeSolicitacaoTermoAceite(contexto);
                        exibeSolicitacaoTermoImagemVozAoAtualizarRota(contexto);
                        return contexto;
                    } else
                        return null;
                } else
                    return null;
            } else {

                let contextoCookieClient = Cookies.get(CONST_COOKIE_CONTEXTO_CURSO);
                if ($rootScope.InformacoesLogin && contextoCookieClient) {
                    contextoCookieClient = angular.fromJson(contextoCookieClient);
                    if (contextoCookieClient.hasOwnProperty($rootScope.InformacoesLogin.login)) {
                        contexto = angular.fromJson(contextoCookieClient[$rootScope.InformacoesLogin.login]);
                        exibeSolicitacaoTermoAceite(contexto);
                        exibeSolicitacaoTermoImagemVozAoAtualizarRota(contexto);
                        return contexto;
                    } else
                        return null;
                } else
                    return null;
            }
        }

        // retorna o contexto da biblioteca pelo usuário (armazenado no cookie)
        function getContextoBibliotecaSelecionado() {
            let contexto = null;

            if (browserSuportaLocalStorage()) {
                if ($rootScope.InformacoesLogin) {
                    contexto = $window.localStorage.getItem(CONST_CONTEXTO_BIBLIOTECA + $rootScope.codUsuarioAtualBiblioteca);
                    if (contexto) {
                        contexto = angular.fromJson(contexto);
                        return contexto;
                    } else
                        return null;
                } else
                    return null;
            } else {

                let contextoCookieClient = Cookies.get(CONST_COOKIE_CONTEXTO_BIB);
                if ($rootScope.InformacoesLogin && contextoCookieClient) {
                    contextoCookieClient = angular.fromJson(contextoCookieClient);
                    if (contextoCookieClient.hasOwnProperty(CONST_CONTEXTO_BIBLIOTECA + $rootScope.codUsuarioAtualBiblioteca)) {
                        contexto = angular.fromJson(contextoCookieClient[CONST_CONTEXTO_BIBLIOTECA + $rootScope.InformacoesLogin.login]);
                        return contexto;
                    } else
                        return null;
                } else
                    return null;
            }
        }

        function exibeSolicitacaoTermoAceite(contexto) {
            if (contexto.cursoSelecionado.CONTEXTOSOLICITATERMOACEITE === undefined ||
                contexto.cursoSelecionado.CONTEXTOSOLICITATERMOACEITE === null ||
                contexto.cursoSelecionado.CONTEXTOSOLICITATERMOACEITE === false) {
                return;
            }

            if (!divTermoConsentimentoExiste()) {
                totvsDesktopTermoConsentimentoService.consultaAceiteTermosConsentimento();
            }
        }

        function divTermoConsentimentoExiste() {
            if (document.getElementById('termoConsentimento') === null &&
                $rootScope.isLoadingModalTermoConsentimento === false) {
                $rootScope.isLoadingModalTermoConsentimento = true;
                return false;
            } else
                return true;
        }

        function exibeSolicitacaoTermoImagemVozAoAtualizarRota(contexto) {

            if ($rootScope.modalTermoImagemVozObrigatorioAberto !== undefined && !$rootScope.modalTermoImagemVozObrigatorioAberto) {
                if ($rootScope.TermoImagemVoz.StatusConsentimento == eduEnumsConsts.EduStatusTermoImagemVoz.Pendente) {
                    $rootScope.isLoadingModalTermoConsentimentoImagemVoz = true;
                    $state.go('termo-imagem-voz.start');
                }
            } else if ($rootScope.modalTermoImagemVozObrigatorioAberto) {
                $rootScope.isLoadingModalTermoConsentimentoImagemVoz = true;
                $state.go('termo-imagem-voz.start');
            }
        }

        //Gravar contexto selecionado no Cookie ou LocalStorage de acordo com a compatibilidade do browser
        function gravarCursoSelecionado(contexto) {

            if (browserSuportaLocalStorage()) {
                //Armazena as informações do login no Local Storage
                $window.localStorage.setItem($rootScope.InformacoesLogin.login, angular.toJson(contexto));
            } else {
                let contextoCookie = {};
                contextoCookie[$rootScope.InformacoesLogin.login] = contexto;
                //Armazena as informações do login no cookie
                Cookies.set(CONST_COOKIE_CONTEXTO_CURSO, angular.toJson(contextoCookie), {
                    expires: 365
                });
            }
        }

        function gravaContextoBibliotecaSelecionado(contextoBiblioteca) {
            if (browserSuportaLocalStorage()) {
                //Armazena as informações do login no Local Storage
                $window.localStorage.setItem(CONST_CONTEXTO_BIBLIOTECA + $rootScope.codUsuarioAtualBiblioteca, angular.toJson(contextoBiblioteca));

            } else {
                let contextoCookie = {};
                contextoCookie[CONST_CONTEXTO_BIBLIOTECA + $rootScope.codUsuarioAtualBiblioteca] = contextoBiblioteca;
                //Armazena as informações do login no cookie
                Cookies.set(CONST_COOKIE_CONTEXTO_BIB, angular.toJson(contextoCookie), {
                    expires: 365
                });
            }
        }

        function browserSuportaLocalStorage() {
            if (typeof(Storage) !== 'undefined')
                return true;
            else
                return false;
        }

        // retorna as máscaras de campos disponíveis no sitema
        function getMascarasSistema() {
            return angular.fromJson(Cookies.get(CONST_COOKIE_CONTEXTO_MASCARAS));
        }

        // retorna o curso selecionado pelo usuário (armazenado no cookie via SERVER REST)
        function existeContextoValidoCookie() {
            let contextoAlunoServer = Cookies.get(CONST_COOKIE_CONTEXTO_ALUNO);

            if (contextoAlunoServer)
                return true;
            else
                return false;
        }

        function getIdContextoEncode() {
            if (existeContextoValidoCookie()) {
                let idContextoAluno = Cookies.get(CONST_COOKIE_CONTEXTO_ALUNO);
                return encodeURI(idContextoAluno);
            }
        }

        // caso seja necessário, atualiza o Portal com os dados do novo curso selecionado
        function reloadPortal(contexto) {
            if (contexto == null)
                contexto = getCursoSelecionado();

            if (contexto.cursoSelecionado.reloadPortal) {
                selecionarCurso(contexto.cursoSelecionado, false);
                stateReload();
            }
        }

        // armazena no cookie o curso selecionado pelo usuário e o contexto do aluno/responsavel também
        function selecionarCurso(itemCurso, reloadPortal, callback) {
            let contexto = {};

            if (!usuarioRespVazio(itemCurso.CODUSUARIOPAI)) {
                // usuário logado é de um responsável - Pai
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;
                contexto.CODUSUARIOPAI = itemCurso.CODUSUARIOPAI;
            } else if (!usuarioRespVazio(itemCurso.CODUSUARIOMAE)) {
                // usuário logado é de um responsável - Mãe
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;
                contexto.CODUSUARIOMAE = itemCurso.CODUSUARIOMAE;
            } else if (!usuarioRespVazio(itemCurso.CODUSUARIORACA)) {
                // usuário logado é de um responsável acadêmico
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;
                contexto.CODUSUARIORACA = itemCurso.CODUSUARIORACA;
            } else if (!usuarioRespVazio(itemCurso.CODUSUARIORESPFINANCEIRO)) {
                // usuário logado é de um responsável financeiro
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;
                contexto.CODUSUARIORESPFINANCEIRO = itemCurso.CODUSUARIORESPFINANCEIRO;
            } else if (!usuarioRespVazio(itemCurso.CODUSUARIORESPCONTRATO)) {
                // usuário logado é de um responsável contrato
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;
                contexto.CODUSUARIORESPCONTRATO = itemCurso.CODUSUARIORESPCONTRATO;
            } else if (!usuarioRespVazio(itemCurso.CODUSUARIORESPPARCELA)) {
                // usuário logado é de um responsável da parcela
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel;
                contexto.CODUSUARIORESPPARCELA = itemCurso.CODUSUARIORESPPARCELA;
            } else {
                // usuário logado é de um aluno
                contexto.entrarComo = eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno;
                contexto.RALogado = itemCurso.RA;
            }

            // limpa propriedades desnecessárias
            itemCurso.CodItem = null;
            itemCurso.CODPERLET = null;
            itemCurso.DTINICIO = null;
            itemCurso.CODTURMA = null;
            itemCurso.PERIODO = null;
            itemCurso.FOTOALUNO = null;

            contexto.cursoSelecionado = itemCurso;

            //Gravar contexto selecionado no Cookie ou LocalStorage de acordo com a compatibilidade do browser
            gravarCursoSelecionado(contexto);

            //Submet ao server o contexto selecionado para gravação do cookie
            gravarContextoAlunoResponsavelSelecionado(itemCurso.contexto, function() {

                //Chama o método que vai redirecionar para a tela que foi passada na url do login com o redirect, após o carregamento, salvamento e criação do cookie do contexto
                //Isto é necessário para que não apresente erro quando utilizado o redirect do login para uma página, e consome o contexto sem que o mesmo esteja carregado
                $rootScope.$emit('RedirecionarParaOutraPaginaAposLogin', {});

                if (reloadPortal) {

                    $rootScope.$broadcast('OnChangeCursoSelecionado:Event', null);

                    //A view aberta no momento da operação de seleção/alteração curso somente será recarregada,
                    //se a mesma não estiver manipulando o evento 'OnChangeCursoSelecionado:Event',
                    //caso a mesma esteja a responsabilidade de comportamento após a operação passa a ser da própria view
                    if ($rootScope.$$listenerCount['OnChangeCursoSelecionado:Event'] === undefined)
                        stateReload();
                }

                if (callback)
                    callback();
            });
        }

        // verifica se o código informado está vazio
        function usuarioRespVazio(codUsuario) {
            return (codUsuario == null || codUsuario === '');
        }

        // verifica se houve alteração do usuário logado
        function verificarAlteracaoUsuario(listaCursos) {

            let retorno = {},
                // obtém os dados armazenados no cookie
                cookie = getCursoSelecionado();

            obterUsuarios(listaCursos, retorno);

            // cookie estava vazio, não houve alteração porém usuário deve selecionar o curso
            if (cookie == null)
                return true;

            let alterouAluno = false;

            if (cookie.entrarComo === eduEnumsConsts.EduTipoUsuarioPortalEnum.Aluno)
                alterouAluno = (retorno.raAlunoLogado.indexOf(cookie.RALogado) === -1);

            let alterouResponsavel = false;

            if (cookie.entrarComo === eduEnumsConsts.EduTipoUsuarioPortalEnum.Responsavel)
                alterouResponsavel = verificarAlteracaoResponsavel(listaCursos, retorno.codUsuarioPai, retorno.codUsuarioMae, retorno.codUsuarioRaca, retorno.codUsuarioRespFin, retorno.codUsuarioRespContrato, retorno.codUsuarioRespParcela);

            return (alterouAluno || alterouResponsavel);
        }

        // verifica se os dados armazenados no cookie eram de um responsável diferente do usuário logado
        function verificarAlteracaoResponsavel(listaCursos, codUsuarioPai, codUsuarioMae, codUsuarioRaca, codUsuarioRespFin, codUsuarioRespContrato, codUsuarioRespParcela) {

            // obtém os dados armazenados no cookie
            let cookie = getCursoSelecionado(),
                alterouPai = (cookie.CODUSUARIOPAI != null) && (cookie.CODUSUARIOPAI !== codUsuarioPai),
                alterouMae = (cookie.CODUSUARIOMAE != null) && (cookie.CODUSUARIOMAE !== codUsuarioMae),
                alterouRaca = (cookie.CODUSUARIORACA != null) && (cookie.CODUSUARIORACA !== codUsuarioRaca),
                alterouRespFin = (cookie.CODUSUARIORESPFINANCEIRO != null) && (cookie.CODUSUARIORESPFINANCEIRO !== codUsuarioRespFin),
                alterouRespContrato = (cookie.CODUSUARIORESPCONTRATO != null) && (cookie.CODUSUARIORESPCONTRATO !== codUsuarioRespContrato),
                alterouRespParcela = (cookie.CODUSUARIORESPPARCELA != null) && (cookie.CODUSUARIORESPPARCELA !== codUsuarioRespParcela);

            return alterouPai || alterouMae || alterouRaca || alterouRespFin || alterouRespContrato || alterouRespParcela;
        }

        // abre o modal para seleção de um curso
        // listaCursos: quando for igual a null, o serviço que busca os cursos do aluno logado será chamado. Quando estiver preenchida, seus dados serão utilizados no modal
        // callbackAposConfirmar: função que será executada quando o modal for fechado após clicar no botão Confirmar
        function abrirModalCursos(listaCursos, callbackAposConfirmar) {
            let modalInstance = $modal.open({
                templateUrl: 'js/totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.view.html',
                controller: 'TotvsDesktopContextoCursoController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    listaCursos: function() {
                        return listaCursos;
                    }
                },
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function() {

            }, callbackAposConfirmar);
        }

        // retorna o tipo de usuário logado
        function getTipoUsuarioLogado(listaCursos, retorno) {
            if (retorno == null)
                retorno = {};

            return getTipoUsuario(listaCursos, retorno);
        }

        // retorna o tipo de usuário logado e os parâmetros codUsuarioPai, codUsuarioMae, codUsuarioRaca, codUsuarioRespFin, codUsuarioRespContrato, codUsuarioRespParcela, usuarioAluno preenchidos
        function getTipoUsuario(listaCursos, retorno) {

            // obtém os códigos de usuário dos responsáveis
            obterUsuarios(listaCursos, retorno);

            if (retorno.usuarioAluno && (retorno.codUsuarioMae || retorno.codUsuarioPai || retorno.codUsuarioRaca || retorno.codUsuarioRespContrato || retorno.codUsuarioRespParcela || retorno.codUsuarioRespFin))
                return factory.tipoUsuarioEnum.AlunoResponsavel;
            else if (retorno.usuarioAluno)
                return factory.tipoUsuarioEnum.Aluno;
            else
                return factory.tipoUsuarioEnum.Responsavel;

        }

        function obterUsuarios(listaCursos, retorno) {
            // o aluno pode ter mais de 1 RA
            retorno.raAlunoLogado = [];

            for (let i = 0; i < listaCursos.length; i++) {
                if (listaCursos[i].CODUSUARIOPAI) {
                    retorno.codUsuarioPai = listaCursos[i].CODUSUARIOPAI;
                    retorno.nomePai = listaCursos[i].NOMEPAI;
                }
                if (listaCursos[i].CODUSUARIOMAE) {
                    retorno.codUsuarioMae = listaCursos[i].CODUSUARIOMAE;
                    retorno.nomeMae = listaCursos[i].NOMEMAE;
                }
                if (listaCursos[i].CODUSUARIORACA) {
                    retorno.codUsuarioRaca = listaCursos[i].CODUSUARIORACA;
                    retorno.nomeRaca = listaCursos[i].NOMERACA;
                }
                if (listaCursos[i].CODUSUARIORESPFINANCEIRO) {
                    retorno.codUsuarioRespFin = listaCursos[i].CODUSUARIORESPFINANCEIRO;
                    retorno.nomeRespFin = listaCursos[i].NOMERESPFINANCEIRO;
                }
                if (listaCursos[i].CODUSUARIORESPCONTRATO) {
                    retorno.codUsuarioRespContrato = listaCursos[i].CODUSUARIORESPCONTRATO;
                    retorno.nomeRespContrato = listaCursos[i].NOMERESPCONTRATO;
                }
                if (listaCursos[i].CODUSUARIORESPPARCELA) {
                    retorno.codUsuarioRespParcela = listaCursos[i].CODUSUARIORESPPARCELA;
                    retorno.nomeRespParcela = listaCursos[i].NOMERESPPARCELA;
                }
                if (!listaCursos[i].CODUSUARIOPAI && !listaCursos[i].CODUSUARIOMAE && !listaCursos[i].CODUSUARIORACA && !listaCursos[i].CODUSUARIORESPFINANCEIRO && !listaCursos[i].CODUSUARIORESPCONTRATO && !listaCursos[i].CODUSUARIORESPPARCELA) {
                    retorno.usuarioAluno = true;
                    retorno.raAlunoLogado.push(listaCursos[i].RA);
                    retorno.nomeAluno = listaCursos[i].NOMEALUNO;
                }
            }
        }

        function getLogo(callback) {
            let parameters = {
                method: 'Logo'
            };
            return factory.TOTVSGet(parameters, callback, {}, true);
        }

        /**
         * Refresh
         */
        function stateReload() {
            if (!angular.isDefined($rootScope.startApp) || !$rootScope.startApp) {
                setTimeout(() => {
                    $state.reload(); // atualiza a rota corrente
                }, 250);
            }
        }


        function getInformacoesUsuarioLogadoAsync(callback) {
            let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'user/getcurrentuser',
                httpFactory = $totvsresource.REST(url, {}, {});

            return httpFactory.TOTVSGet({}, callback);
        }

        function getListaTipoUsuario(callback) {
            let parameters = {
                method: "GetUsertype",
            };

            return factory.TOTVSGet(parameters, callback);
        }

        function getUrlLogOutSaml(callback) {

            let provideId = localStorage.getItem('samlproviderId');

            if (provideId == '' || provideId == undefined || provideId == 0)
                return '';

            let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Parametrizacao/v1/TotvsEducacional/SAML',
                httpFactory = $totvsresource.REST(url),
                parametros = {};
            parametros.id = provideId;

            return httpFactory.TOTVSGet(parametros, callback);

        }

        function getContextoBiblioteca(callback) {
            let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSBiblioteca/v1/Context/LibraryUnitContext',
                httpFactory = $totvsresource.REST(url, {}, {}),
                parametros = {};

            parametros.pageSize = 100;

            return httpFactory.TOTVSGet(parametros, callback);
        }

        function getContextoBibliotecaListaUsuarios(listaCodUsuarios, callback) {
            let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSBiblioteca/v1/Context/LibraryUnitContextListaCodUsuario',
                httpFactory = $totvsresource.REST(url, {}, {}),
                parametros = {};
            parametros.listaCodUsuarios = listaCodUsuarios;
            parametros.pageSize = 100;

            return httpFactory.TOTVSGet(parametros, callback);
        }

        function carregaDadosBibliotecaResponsavel(callback) {
            $rootScope.usuariosBiblioteca = [];

            let listaCursos = $rootScope.listaCursos;

            let listaCodUsuarios = '';

            listaCodUsuarios = $rootScope.InformacoesLogin.login;

            //Inclui na pesquisa o código de usuário dos alunos cujo responsável possui permissão de acesso aos dados acadêmicos.
            angular.forEach(listaCursos, function(curso) {
                if (curso.ACESSODADOSACADEMICOS == eduEnumsConsts.EduSimOuNaoEnum.Sim) {
                    listaCodUsuarios += '|' + curso.CODUSUARIOALUNO;
                }
            })

            getContextoBibliotecaListaUsuarios(listaCodUsuarios, function(result) {

                if (result.PERMISSIONSLIST != null && result.PERMISSIONSLIST.length > 0) {
                    $rootScope.listaPermissaoBibliotecaLoginResponsavel = result.PERMISSIONSLIST;

                    if (result.LIBRARYUNITCONTEXT.length > 0) {
                        $rootScope.semContextoBiblioteca = false;
                        let responsavelPossuiContexto = result.LIBRARYUNITCONTEXT.find(x => (x.UserCode === $rootScope.InformacoesLogin.login));

                        if (responsavelPossuiContexto) {
                            let usuarioResponsavel = {
                                codUsuario: $rootScope.InformacoesLogin.login,
                                nome: $rootScope.InformacoesLogin.username,
                                listaContextos: responsavelPossuiContexto.ListLibraryUnitsContext
                            };
                            $rootScope.usuariosBiblioteca.push(usuarioResponsavel);
                        }
                        angular.forEach(listaCursos, function(item) {
                            let usuarioPossuiContexto = result.LIBRARYUNITCONTEXT.find(x => (x.UserCode === item.CODUSUARIOALUNO));
                            if (usuarioPossuiContexto) {
                                let usuarioNaoExiste = $rootScope.usuariosBiblioteca.find(x => (x.codUsuario === item.CODUSUARIOALUNO));
                                if (!usuarioNaoExiste) {
                                    let usuario = {
                                        codUsuario: item.CODUSUARIOALUNO,
                                        nome: item.NOMEALUNO,
                                        listaContextos: usuarioPossuiContexto.ListLibraryUnitsContext
                                    };
                                    $rootScope.usuariosBiblioteca.push(usuario);
                                }
                            }
                        });

                        if ($rootScope.usuariosBiblioteca && $rootScope.usuariosBiblioteca.length > 0) {
                            $rootScope.codUsuarioAtualBiblioteca = $rootScope.usuariosBiblioteca[0].codUsuario;
                            $rootScope.nomeUsuarioAtualBiblioteca = $rootScope.usuariosBiblioteca[0].nome;

                            if ($rootScope.usuariosBiblioteca[0].listaContextos && $rootScope.usuariosBiblioteca[0].listaContextos.length > 0) {
                                let contextoBiblioteca = {
                                    codColigada: $rootScope.usuariosBiblioteca[0].listaContextos[0].CompanyCode,
                                    codFilial: $rootScope.usuariosBiblioteca[0].listaContextos[0].BranchCode,
                                    codUnidadeBibliotecaria: $rootScope.usuariosBiblioteca[0].listaContextos[0].LibraryUnitCode
                                };
                                gravaContextoBibliotecaSelecionado(contextoBiblioteca);
                            }
                        }
                        return true;
                    }
                } else {
                    $rootScope.semContextoBiblioteca = true;
                    return false;
                }
            });
        }
    }

});