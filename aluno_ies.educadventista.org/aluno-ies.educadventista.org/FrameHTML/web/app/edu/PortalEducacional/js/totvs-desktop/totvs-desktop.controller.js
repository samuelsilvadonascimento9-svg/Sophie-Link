define(['totvs-desktop/totvs-desktop.module',
        'totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.factory',
        'totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.controller',
        'aluno/altera-senha/altera-senha.factory',
        'aluno/dados-pessoais/dados-pessoais.factory',
        'cst-customizacao/cst-customizacao.module',
        'cst-customizacao/cst-customizacao.service',
        'totvs-desktop/totvs-desktop-termo-consentimento/totvs-desktop-termo-consentimento.service',
        'aluno/financeiro/financeiro.factory'
    ],
    function() {

        'use strict';

        var inicializa = true;

        angular
            .module('totvsDesktop')
            .run(['totvsDesktopService', function(objTotvsDesktopService) {
                var keyParam = objTotvsDesktopService.getParamURL('key');
                if (angular.isDefined(keyParam))
                    inicializa = false;
            }])
            .controller('TotvsDesktopController', TotvsDesktopController);

        TotvsDesktopController.$inject = [
            '$rootScope',
            '$state',
            '$window',
            '$location',
            'i18nFilter',
            'totvsDesktopService',
            'TotvsDesktopContextoCursoFactory',
            'eduEnumsConsts',
            'totvsDesktopTermoConsentimentoService',
            'EduPaymentsFactory',
            'eduCustomService',
            'totvs.app-notification.Service',
            'eduAlteraSenhaFactory',
            'eduUtilsFactory'
        ];

        /**
         * Controller principal
         * @param   {object} $rootScope                       Escopo principal
         * @param   {object} $window                          Objeto window angular
         * @param   {object} $location                        Objeto location angular
         * @param   {object} i18nFilter                       Objeto para tradução
         * @param   {object} objTotvsDesktopService           Serviços comuns
         * @param   {object} TotvsDesktopContextoCursoFactory Serviços de contexto
         * @param   {object} eduEnumsConsts                   Constantes do educacional
         * @param   {object} TotvsDesktopTermoConsentimentoService Serviços do Termo de Consentimento
         * @param   {object} EduPaymentsFactory               Serviços do Payments
         * @param   {object} totvsNotification                Objeto para notificações
         * @returns {object} Controller principal da aplicação
         */
        /*jshint maxparams: false*/
        function TotvsDesktopController($rootScope,
            $state,
            $window,
            $location,
            i18nFilter,
            objTotvsDesktopService,
            TotvsDesktopContextoCursoFactory,
            eduEnumsConsts,
            TotvsDesktopTermoConsentimentoService,
            EduPaymentsFactory,
            eduCustomService,
            totvsNotification,
            eduAlteraSenhaFactory,
            eduUtilsFactory) {

            // *********************************************************************************
            // *** Variables
            // *********************************************************************************
            var self = this;
            var keys = {}; // guarda as teclas pressionadas (utilizado nos atalhos)
            var KeyParams = "";
            var menuAlterarSenhaAdicionado = false;
            let logoutUrlProviderSaml = '';

            // *********************************************************************************
            // *** Public Properties
            // *********************************************************************************
            self.headerInformations = [];
            self.srcDefaultLogo = EDU_CONST_GLOBAL_PATH_LOGO;
            self.nomeFilial = '';
            self.carregouContexto = false;
            self.selectedMenuGroup = undefined;
            self.selectedMenu = undefined;
            self.bodyFontSize = 1.4;
            self.objMenuList = [];
            self.objParamsHeader = {};
            self.userLogado = '';
            self.isAluno = true;
            self.showMenu = false;

            // *********************************************************************************
            // *** Public Methods
            // *********************************************************************************
            self.getSelectedMenu = getSelectedMenu;
            self.abrirContextoCurso = abrirContextoCurso;
            self.abrirContextoBiblioteca = abrirContextoBiblioteca;
            self.openMenuClick = openMenuClick;
            self.loadAluno = loadAluno;
            self.toggleMenu = toggleMenu;
            self.fixedMenu = fixedMenu;
            self.redirect = redirect;
            self.openModal = openModal;
            self.hasPendingRequests = hasPendingRequests;
            self.loadParams = loadParams;
            self.increaseFontSize = increaseFontSize;
            self.decreaseFontSize = decreaseFontSize;
            self.changeContrast = changeContrast;
            self.deslogar = deslogar;
            self.isLoading = false;

            // *********************************************************************************
            // *** Controller Initialize
            // *********************************************************************************
            if (inicializa)
                preInit();

            /**
             * Esta função é responsável por iniciar o processo de carregamento, salvamento e criação do cookie do contexto e carretamento da permissões
             */
            $rootScope.$on('ValidarUsuario', function(event, args) {
                if (KeyParams !== args.keyParam) {
                    KeyParams = args.keyParam;
                    objTotvsDesktopService.realizaLoginFrameHTML(args.keyParam, function() {
                        aplicaRotaInicialAposLogin(args);
                    });
                }
            });

            function aplicaRotaInicialAposLogin(args) {
                preInit();
                let rotaInicialAposLoginSemRedirecionar = "/main";
                let rota = args.route;
                let url = $window.location.href.split('#')[0] + '#' + rota;

                //Verifica se a rota é após o login com o redirect ou não
                if (rota == rotaInicialAposLoginSemRedirecionar) {
                    //Este metodo que vai redirecionar para a tela incial do sistema, após o login sem o redirect
                    $window.location.href = url;
                } else {
                    //Este método que vai redirecionar para a tela que foi passada na url do login com o redirect, após o carregamento, salvamento e criação do cookie do contexto
                    //Isto é necessário para que não apresente erro quando utilizado o redirect do login para uma página, e consome o contexto sem que o mesmo esteja carregado
                    $rootScope.$on('RedirecionarParaOutraPaginaAposLogin', () => {
                        $window.location.href = url;
                    });
                }
            }

            /**
             * @private
             * @function Função de pré-inicialização do controller
             * @name preInit
             */
            function preInit() {
                eduCustomService.initPre(self, $rootScope);

                menuAlterarSenhaAdicionado = false;
                //Configurar idioma padrão da tradução
                $rootScope.currentuser = {
                    dialect: EDU_CONST_GLOBAL_CUSTOM_IDIOMA
                };

                //Definir um valor inicial para o objeto, para que se possa controlar a exibição da logo
                self.objParamsHeader.LogoPortal = 'init';

                let changePass = objTotvsDesktopService.getParamURL('cpsw'); //changepsw
                let externalApplicationUserNotIdentified = objTotvsDesktopService.getParamURL('ExternalApplicationUserNotIdentified');

                if (angular.isDefined(changePass)) {
                    let user = objTotvsDesktopService.getParamURL('user');
                    if (user)
                        sessionStorage.setItem('user_change_pass', user);

                    $window.location.href = $window.location.href.split('#')[0] + 'login/?cpsw';
                } else if (angular.isDefined(externalApplicationUserNotIdentified)) {
                    sessionStorage.setItem('externalApplication_alias', objTotvsDesktopService.getParamURL('alias'));
                    sessionStorage.setItem('externalApplication_accessToken', objTotvsDesktopService.getParamURL('accessToken'));
                    sessionStorage.setItem('externalApplication_providerId', objTotvsDesktopService.getParamURL('providerId'));
                    $window.location.href = $window.location.href.split('#')[0] + 'login/?ExternalApplicationUserNotIdentified';
                } else
                    init();
            }

            /**
             * @private
             * @function Função de inicialização do controller
             * @name init
             */
            function init() {
                $rootScope.setLoading = setLoading;
                //Realiza a inicialização da aplicação através da seleção de contexto educacional
                inicializarAppSelecaoContextoEducacionalAsync(function() {
                    // Carrega as permissões do usuário
                    objTotvsDesktopService.loadPermissions();
                    // Carrega os parâmetros gerais do Totvs Educacional                      
                    objTotvsDesktopService.loadParametrosTotvsEducacionalGeral();
                });

                definirTratamentoEventosGlobais();

                //configura tipo de menu a ser exibido
                self.selectedMenuGroup = 'apps';

                // configura teclas de atalho
                $(document).keydown(adicionarTecla);
                $(document).keyup(removerTecla);
                TotvsDesktopContextoCursoFactory.getUrlLogOutSaml(function(result) {
                    logoutUrlProviderSaml = result.value ? ? '';
                });

            }

            // *********************************************************************************
            // *** Public Functions
            // *********************************************************************************

            function deslogar() {
                if (logoutUrlProviderSaml != '' && logoutUrlProviderSaml != undefined) {
                    window.open(logoutUrlProviderSaml);
                }

                if (localStorage.getItem('loginunificadoaluno') === 'true' || EDU_CONST_GLOBAL_USAR_LOGINPORTAIS)
                    location.href = EDU_CONST_GLOBAL_URL_LOGINPORTAIS;
                else
                    $location.path('/sair');
            }

            /**
             * @public
             * @function Retorna o menu selecinado
             * @name getSelectedMenu
             * @returns {object} Menu selecionado
             */
            function getSelectedMenu() {

                if (!self.selectedMenu) {
                    let path = $location.path();
                    for (let i = 0; i < self.objMenuList.length; i++) {
                        if (path === self.objMenuList[i].url) {
                            self.selectedMenu = self.objMenuList[i];
                            break;
                        } else if (self.objMenuList[i].submenus.length > 0) { // submenus
                            for (let j = 0; j < self.objMenuList[i].submenus.length; j++) {
                                if (path === self.objMenuList[i].submenus[j].url) {
                                    self.selectedMenu = self.objMenuList[i].submenus[j];
                                    break;
                                }
                            }
                        }
                    }
                }

                return self.selectedMenu;
            }

            /**
             * @public
             * @function Carrega os parâmetros de customização
             * @name loadParams
             */
            function loadParams() {
                let usuarioBiblioteca = window.localStorage.getItem('UsuarioBiblioteca' + $rootScope.InformacoesLogin.login);
                if (usuarioBiblioteca) {
                    let acoes = [];
                    self.objParamsHeader.LogoPortal = 'somenteBiblioteca';
                    self.labelSair = i18nFilter('l-sair');

                    self.headerInformations.menus = [{
                        img: {
                            src: null,
                            alt: null
                        },
                        itens: acoes
                    }];

                    self.objParamsHeader.CorCabecalho = '#fff';
                    self.objParamsHeader.CorFonteCabecalho = '#000';
                    self.objParamsHeader.CorMenu = '#1e99c0';
                    self.objParamsHeader.CorFonteMenu = '#fff';

                    $rootScope.$broadcast('OnChangeContextoBibliotecaEmit:Event', {});
                }

                objTotvsDesktopService.loadParamsHeader(function(objParams) {
                    self.objParamsHeader = objParams;

                    if (!self.objParamsHeader.CorCabecalho || self.objParamsHeader.CorCabecalho === '') {
                        self.objParamsHeader.CorCabecalho = '#fff';
                    }

                    if (!self.objParamsHeader.CorFonteCabecalho || self.objParamsHeader.CorFonteCabecalho === '') {
                        self.objParamsHeader.CorFonteCabecalho = '#000';
                    }

                    if (!self.objParamsHeader.CorMenu || self.objParamsHeader.CorMenu === '') {
                        self.objParamsHeader.CorMenu = '#1e99c0';
                    }

                    if (!self.objParamsHeader.CorFonteMenu || self.objParamsHeader.CorFonteMenu === '') {
                        self.objParamsHeader.CorFonteMenu = '#fff';
                    }

                    self.objParamsHeader.HotLink1Icon = objTotvsDesktopService.getIconsMenu('', self.objParamsHeader.HotLink1);
                    self.objParamsHeader.HotLink2Icon = objTotvsDesktopService.getIconsMenu('', self.objParamsHeader.HotLink2);
                    self.objParamsHeader.HotLink3Icon = objTotvsDesktopService.getIconsMenu('', self.objParamsHeader.HotLink3);

                    adicionaMenuAlterarSenha();
                });
            }

            /**
             * @public
             * @function Define variável para controle das requisições http que estão pendentes
             * @name hasPendingRequests
             * @returns {boolean} Verdadeiro se existe requisição pendente
             */
            function hasPendingRequests() {
                return ($rootScope.pendingRequests > 0);
            }

            /**
             * @public
             * @function Carrega informações do aluno
             * @name loadAluno
             */
            function loadAluno() {
                if ($rootScope.InformacoesDoUsuarioEmProcessamento == true)
                    return;
                else
                    $rootScope.InformacoesDoUsuarioEmProcessamento = true;

                objTotvsDesktopService.getInformacoesPessoaisBasicas({}, function(result) {
                    atribuiRetornoInformacoesPessoais(result);
                    $rootScope.InformacoesDoUsuarioEmProcessamento = false;
                });
            }

            function atribuiRetornoInformacoesPessoais(result) {
                $rootScope.InformacoesPessoaisBasicas = result;

                if (angular.isDefined(result)) {
                    TotvsDesktopContextoCursoFactory.getListaTipoUsuario(function(listaTipoUsuario) {
                        let exibirAcaoTrocarPlataforma = false;
                        if (listaTipoUsuario ? .value ? .ListUserType.length > 1 && verificaPerfilDiferenteAluno(listaTipoUsuario ? .value ? .ListUserType))
                            exibirAcaoTrocarPlataforma = true;

                        carregaAcoesMenu(result, exibirAcaoTrocarPlataforma);
                    });

                }
            }

            function carregaAcoesMenu(result, exibirAcaoTrocarPlataforma) {
                menuAlterarSenhaAdicionado = false;
                EduPaymentsFactory.getQtdeCartoesCarteiraDigital(function(listaCarteira) {
                    let acoes = [];

                    let contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

                    if (contexto.cursoSelecionado.ACESSODADOSACADEMICOS == 'S')
                        acoes.push({
                            label: i18nFilter('l-cadastro-academico'),
                            link: 'dados-pessoais'
                        });

                    if (listaCarteira && listaCarteira.CARTOES > 0) {
                        acoes.push({
                            label: i18nFilter('l-gerenciar-recorrencia'),
                            link: 'financeiro.recorrencia-lista'
                        });
                    }

                    if ((localStorage.getItem('loginunificadoaluno') === 'true' || EDU_CONST_GLOBAL_USAR_LOGINPORTAIS) && exibirAcaoTrocarPlataforma)
                        acoes.push({
                            label: i18nFilter('l-alterar-plataforma'),
                            link: () => {
                                eduUtilsFactory.getAuthParams(redirectToLoginPortais);
                            }
                        });

                    self.labelSair = i18nFilter('l-sair');

                    self.headerInformations.menus = [{
                        img: {
                            src: result[0].IMAGEM,
                            alt: result[0].NOME
                        },
                        itens: acoes
                    }];

                    adicionaMenuAlterarSenha();

                });
            }

            function adicionaMenuAlterarSenha() {
                if (!menuAlterarSenhaAdicionado && self.objParamsHeader.PermiteAlterarSenha && localStorage.getItem('loginwithsaml') !== 'true' && self.headerInformations ? .menus ? .length > 0) {
                    self.headerInformations ? .menus[0] ? .itens.push({
                        label: i18nFilter('l-alterar-senha'),
                        action: self.openModal
                    });
                    menuAlterarSenhaAdicionado = true;
                }
            }

            function verificaPerfilDiferenteAluno(listaTipoUsuario) {
                const Professor = 1;
                const Empresa = 2;
                const Funcionario = 4;
                const idTiposUsuario = [Professor, Empresa, Funcionario];
                let temPerfilDiferenteDeAluno = false;
                for (let i = 0; i < listaTipoUsuario.length; i++) {
                    temPerfilDiferenteDeAluno = idTiposUsuario.includes(listaTipoUsuario[i].Type);
                    if (temPerfilDiferenteDeAluno) break;
                }
                return temPerfilDiferenteDeAluno;
            }

            function redirectToLoginPortais(authParams) {
                const alias = window.localStorage.getItem('aliasSelecionado') ? .toString() ? ? '';
                const url = `${EDU_CONST_GLOBAL_URL_LOGINPORTAIS}#/loginwithtoken/${alias}/${authParams.AccessToken}`;
                location.href = url;
            }

            function openModal() {
                eduAlteraSenhaFactory.abrirModalAlteraSenha();
            }

            /**
             * @public
             * @function Abre modal para usuário alterar o curso que está salvo no contexto
             * @name abrirContextoCurso
             * @param {object} result Contexto selecionado
             */
            function abrirContextoCurso(listaCursos) {
                TotvsDesktopContextoCursoFactory.getContextoAlunoComFoto(function(listaCursosComFotos) {
                    TotvsDesktopContextoCursoFactory.abrirModalCursos(listaCursosComFotos, preencherDadosUsuario);
                });
            }

            /**
             * @public
             * @function Abre modal para usuário alterar o contexto bibliotecário que está salvo no contexto
             * @name abrirContextoBiblioteca
             * @param {object} result Contexto Bibliotecario Selecionado
             */
            function abrirContextoBiblioteca() {
                let listaCursos = {}
                listaCursos.somenteContextoBiblioteca = true;
                TotvsDesktopContextoCursoFactory.abrirModalCursos(listaCursos, preencherDadosUsuario);
            }

            /**
             * @public
             * @function Executa as ações ao clicar em um menu
             * @name openMenuClick
             * @param {object} objMenu Objeto do menu clicado
             */
            function openMenuClick(objMenu) {

                if (!objMenu)
                    return;

                self.selectedMenu = objMenu;

                if (objMenu.url === '#') {
                    let jObj = $('#' + objMenu.id).children('.submenu-item');
                    if ($(jObj).css('display') === 'none') {
                        $(jObj).show();
                        $(jObj).prev().children('.glyphicon').attr('class', 'glyphicon ico-chevron-up');
                    } else {
                        $(jObj).hide();
                        $(jObj).prev().children('.glyphicon').attr('class', 'glyphicon ico-chevron-down');
                    }

                    // Se o menu não estiver aberto
                    $('#menu-desktop').addClass('toggled');

                } else {
                    // Se o menu estiver aberto
                    $('#menu-desktop').removeClass('toggled');

                    if (typeof(objMenu.function) == typeof(Function)) {
                        objMenu.function().then(function(url) {
                            $window.open(encodeURI(url.trim()), '_blank');
                        }).catch(function(mensagemErro) {
                            totvsNotification.notify({
                                type: 'error',
                                title: i18nFilter('l-titulo-msg-erro-acessar-menu'),
                                detail: mensagemErro
                            });
                        });
                    } else {
                        if (objMenu.url.indexOf('http') !== -1)
                            $window.open(encodeURI(objMenu.url.trim()), '_blank');
                        else
                            $location.url(encodeURI(objMenu.url.trim()));
                    }
                }
            }

            /**
             * @public
             * @function Esconde/Mostra a sidebar com os menus
             * @name toggleMenu
             */
            function toggleMenu() {
                $('#menu-desktop').toggleClass('toggled');
            }

            /**
             * @public
             * @function Define se a sidebar ficará fixa estendida
             * @name fixedMenu
             */
            function fixedMenu() {
                $('#menu-desktop').removeClass('toggled');
                $('#menu-desktop').toggleClass('fixed-menu');
            }

            /**
             * @public
             * @function Redireciona para uma página
             * @name redirect
             * @param {string} Endereço da página a ser redirecionada
             */
            function redirect(url) {
                if (angular.isDefined(self.selectedMenu) && self.selectedMenu.url !== url)
                    self.selectedMenu = undefined;

                if (typeof url == typeof Function)
                    url();

                $location.path(url);
            }

            /** Barra de Acessibilidade */
            /**
             * @public
             * @function Incrementa o tamanho da fonte
             * @name increaseFontSize
             */
            function increaseFontSize() {
                if (self.bodyFontSize < 2) {
                    self.bodyFontSize += 0.5;
                    $('body').css('font-size', self.bodyFontSize + 'rem');
                }
            }

            /**
             * @public
             * @function Decrementa o tamanho da fonte
             * @name decreaseFontSize
             */
            function decreaseFontSize() {
                if (self.bodyFontSize > 0.5) {
                    self.bodyFontSize -= 0.2;
                    $('body').css('font-size', self.bodyFontSize + 'rem');
                }
            }

            /**
             * @public
             * @function Mudar o contraste do portal
             * @name changeContrast
             */
            function changeContrast() {
                // the css we are going to inject
                let objCss = {
                    '-webkit-filter': 'invert(100%)',
                    '-moz-filter': 'invert(100%)',
                    '-o-filter': 'invert(100%)',
                    '-ms-filter': 'invert(100%)',
                    'filter': 'invert(100%)'
                };

                if (!$window.hasContrast)
                    $window.hasContrast = true;
                else {
                    $window.hasContrast = false;
                    objCss = {
                        '-webkit-filter': 'invert(0%)',
                        '-moz-filter': 'invert(0%)',
                        '-o-filter': 'invert(0%)',
                        '-ms-filter': 'invert(0%)',
                        'filter': 'invert(0%)'
                    };
                }

                $('html').css(objCss);
            }
            /** Fim Barra de Acessibilidade */

            // *********************************************************************************
            // *** Private Functions
            // *********************************************************************************

            /**
             * @private
             * @function Realiza a inicialização da aplicação através da seleção de contexto educacional
             * @name inicializarAppSelecaoContextoEducacionalAsync
             */
            function inicializarAppSelecaoContextoEducacionalAsync(callback) {
                objTotvsDesktopService.verificaUsuarioLogadoSetInfoLogin(configurarSelecaoCurso, callback);
            }

            /**
             * @private
             * @function Preenche os dados do aluno logado no header da página
             * @name preencherDadosUsuario
             */
            function preencherDadosUsuario() {
                let itemContexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado(),
                    linkAlterar,
                    usuarioBiblioteca = window.localStorage.getItem('UsuarioBiblioteca' + $rootScope.InformacoesLogin.login);

                if (itemContexto != null) {

                    self.headerInformations = [];

                    let alunoERA = itemContexto.cursoSelecionado.NOMEALUNO;
                    alunoERA += ' (' + i18nFilter('l-ra') + ': ' + itemContexto.cursoSelecionado.RA + ')';

                    self.userInfo = alunoERA;
                    self.userLogado = $rootScope.InformacoesLogin.username;
                    self.isAluno = itemContexto.entrarComo === 'A';

                    if (itemContexto.entrarComo === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Aluno) {
                        linkAlterar = i18nFilter('l-alterar-curso');
                    } else {
                        linkAlterar = i18nFilter('l-alterar-aluno');
                    }

                    self.headerInformations.push({
                        label: linkAlterar,
                        action: self.abrirContextoCurso,
                        title: linkAlterar + ' (CTRL + SHIFT + A)'
                    });

                    self.headerInformations.push({
                        label: itemContexto.cursoSelecionado.NOMECURSO,
                        title: itemContexto.cursoSelecionado.NOMECURSO
                    });

                    if (itemContexto.cursoSelecionado.APRESENTACAO === eduEnumsConsts.EduTipoApresentacaoEnum.EnsinoBasico.toString()) {
                        self.headerInformations.push({
                            label: itemContexto.cursoSelecionado.NOMEHABILITACAO,
                            title: itemContexto.cursoSelecionado.NOMEHABILITACAO
                        });
                    }

                    self.nomeFilial = itemContexto.cursoSelecionado.NOMEFILIAL;

                    // Carrega os parâmetros do Cabeçalho
                    self.loadParams();

                    // Carrega informações do aluno
                    self.loadAluno();

                    self.carregouContexto = true;

                    // Atualiza o menu
                    $rootScope.$broadcast('OnChangeCursoSelecionadoEmit:Event', {});


                } else if (usuarioBiblioteca) {

                    let listaCursos = {};
                    listaCursos.somenteContextoBiblioteca = false;

                    self.userInfo = $rootScope.InformacoesLogin.username;
                    $rootScope.codUsuarioAtualBiblioteca = $rootScope.InformacoesLogin.login;
                    self.headerInformations = [];

                    let linkAlterar = i18nFilter('l-alterar-contexto-biblioteca');

                    self.headerInformations.push({
                        label: linkAlterar,
                        action: self.abrirContextoBiblioteca,
                        title: linkAlterar + ' (CTRL + SHIFT + A)'
                    });

                    self.loadParams();

                    $rootScope.$broadcast('OnChangeContextoBibliotecaEmit:Event', {});
                }
            }


            /**
             * @private
             * @function Configuração da seleção de curso
             * @name configurarSelecaoCurso
             * @param {object} result Resultado de um callback
             */
            function configurarSelecaoCurso(listaCursos) {
                try {
                    //Verifica se o usuário possui contexto na biblioteca e ainda não tenha selecionado nenhum
                    TotvsDesktopContextoCursoFactory.getContextoBiblioteca(function(result) {
                        if (result) {
                            if (result.LIBRARYUNITCONTEXT && result.LIBRARYUNITCONTEXT.length > 0)
                                finalizaConfiguracaoSelecaoBiblioteca(result.LIBRARYUNITCONTEXT);
                        }
                        finalizaConfiguracaoSelecaoCursoAluno(listaCursos);
                    });
                } catch (erro) {
                    //Mesmo que ocorra erro na verificação da bibilioteca
                    //O aluno deve conseguir logar corretamente
                    finalizaConfiguracaoSelecaoCursoAluno(listaCursos);
                }
            }

            function finalizaConfiguracaoSelecaoBiblioteca(listaUnidadesBibliotecarias) {
                let contextobibliotecaSelecionado = TotvsDesktopContextoCursoFactory.getContextoBibliotecaSelecionado();
                let objContextoBibliotecaSelecionado = {};

                let filialPadrao = listaUnidadesBibliotecarias.find(function(unidade) {
                    return unidade.BranchDefault === 'T';
                });

                if (contextobibliotecaSelecionado) {
                    objContextoBibliotecaSelecionado.codColigada = contextobibliotecaSelecionado.codColigada;
                    objContextoBibliotecaSelecionado.codColigada = contextobibliotecaSelecionado.codColigada;
                    objContextoBibliotecaSelecionado.codFilial = contextobibliotecaSelecionado.codFilial;
                    objContextoBibliotecaSelecionado.codUnidadeBibliotecaria = contextobibliotecaSelecionado.codUnidadeBibliotecaria;
                } else if (filialPadrao) {
                    objContextoBibliotecaSelecionado.codColigada = filialPadrao.CompanyCode;
                    objContextoBibliotecaSelecionado.codFilial = filialPadrao.BranchCode;
                    objContextoBibliotecaSelecionado.codUnidadeBibliotecaria = filialPadrao.LibraryUnitCode;
                } else {
                    objContextoBibliotecaSelecionado.codColigada = listaUnidadesBibliotecarias[0].CompanyCode;
                    objContextoBibliotecaSelecionado.codFilial = listaUnidadesBibliotecarias[0].BranchCode;
                    objContextoBibliotecaSelecionado.codUnidadeBibliotecaria = listaUnidadesBibliotecarias[0].LibraryUnitCode;
                }

                TotvsDesktopContextoCursoFactory.gravaContextoBibliotecaSelecionado(objContextoBibliotecaSelecionado);
            }

            function finalizaConfiguracaoSelecaoCursoAluno(listaCursos) {

                // verifica se aluno não possui nenhum curso
                if (listaCursos.length === 0) {
                    self.abrirContextoCurso(listaCursos);
                    return;
                }

                // se possuir apenas 1 curso, seta o contexto automaticamente e não abre o modal
                if (listaCursos.length === 1 || contextosMesmoCurso(listaCursos)) {
                    TotvsDesktopContextoCursoFactory.selecionarCurso(listaCursos[0], true, function() {
                        loadPostContexto();
                        preencherDadosUsuario();
                    });
                    return;
                } else {

                    let houveAlteracaoUsuarioSelecionado = TotvsDesktopContextoCursoFactory.verificarAlteracaoUsuario(listaCursos),
                        contextoSelecionadoCookie = TotvsDesktopContextoCursoFactory.getCursoSelecionado(),
                        contextoSelecionadoCookieVazio = (contextoSelecionadoCookie == null);

                    // se possuir mais de 1 curso
                    // ou se for responsável por mais de um aluno
                    // ou se for aluno e responsável
                    if (houveAlteracaoUsuarioSelecionado || contextoSelecionadoCookieVazio) {
                        // se houve alteração de usuário abre modal para seleção de curso
                        self.abrirContextoCurso(listaCursos);
                    } else {

                        let contextoCurso = retornaContextoCursoValidoPorCursoCookie(listaCursos, contextoSelecionadoCookie.cursoSelecionado);

                        if (contextoCurso) {
                            TotvsDesktopContextoCursoFactory.selecionarCurso(contextoCurso, true, function() {
                                loadPostContexto();
                                preencherDadosUsuario();
                            });
                            return;
                        } else {
                            self.abrirContextoCurso(listaCursos);
                            return;
                        }
                    }
                }
            }

            /**
             * @private
             * @function Retorna o contexto válido a partir do cookie selecionado anteriormente
             * @name retornaContextoCursoValidoPorCursoCookie
             * @param   {Array}  listaCursos               Lista de Cursos
             * @param   {object} contextoSelecionadoCookie Contexto selecionado
             * @returns {object} Contexto selecionado
             */
            function retornaContextoCursoValidoPorCursoCookie(listaCursos, contextoSelecionadoCookie) {
                let contexto = null;

                if (listaCursos) {
                    for (let i = 0; i < listaCursos.length; i++) {
                        if (listaCursos[i].contexto) {
                            let contextoValido = true;
                            for (let nome in contextoSelecionadoCookie.contexto) {

                                //Os campos "Controle", "$messages" e "$length" não serão comparados
                                if (nome !== 'Controle' && nome !== '$messages' && nome !== '$length' &&
                                    contextoSelecionadoCookie.contexto[nome] !== listaCursos[i].contexto[nome]) {

                                    contextoValido = false;
                                    break;
                                }
                            }

                            if (contextoValido) {
                                contexto = listaCursos[i];
                                break;
                            }
                        }
                    }
                }

                return contexto;
            }

            /**
             * @private
             * @function Valida se os contextos se referem a um mesmo curso
             * @name contextosMesmoCurso
             * @param   {object}  result Objeto de um callback
             * @returns {boolean} Verdadeiro se os contextos são do mesmo curso
             */
            function contextosMesmoCurso(result) {
                let curso = result[0].CODCOLIGADA.toString() + result[0].IDHABILITACAOFILIAL.toString() + result[0].RA.toString();
                for (let i = 1; i < result.length; i++) {
                    let cursoAtual = result[i].CODCOLIGADA.toString() + result[i].IDHABILITACAOFILIAL.toString() + result[i].RA.toString();

                    if (curso !== cursoAtual)
                        return false;
                }
                return true;
            }

            /**
             * @private
             * @function Carrega informações após definição do contexto
             * @name loadPostContexto
             */
            function loadPostContexto() {
                self.loadParams();
                self.loadAluno();
            }

            /**
             * @private
             * @function Adicionar atalhos
             * @name adicionarTecla
             * @param {object} e Objeto do evento
             */
            function adicionarTecla(e) {
                keys[e.which] = true;
                executarAtalhos();
            }

            /**
             * @private
             * @function Remover atalhos
             * @name removerTecla
             * @param {object} e Objeto do evento
             */
            function removerTecla(e) {
                delete keys[e.which];
            }

            /**
             * @private
             * @function Executa atalhos
             * @name executarAtalhos
             */
            function executarAtalhos() {
                if (keys[16] && keys[17] && keys[65]) {
                    // se pressionou as teclas CTRL + SHIFT + A: abre modal para alterar curso
                    self.abrirContextoCurso();
                }
            }

            /**
             * @private
             * @function Tratamento de eventos globais
             * @name definirTratamentoEventosGlobais
             */
            function definirTratamentoEventosGlobais() {

                $rootScope.$on('OnChangeContextoBibliotecaEmit:Event', function() {
                    let contexto = TotvsDesktopContextoCursoFactory.getContextoBibliotecaSelecionado();
                    objTotvsDesktopService.getMenuBiblioteca(contexto.codColigada, function(data) {
                        self.objMenuList = data;
                    });
                });

                /**
                 * Refresh nos menus ao alterar o contexto educacinoal para atualizar o
                 * guid das urls externas
                 */
                $rootScope.$on('OnChangeCursoSelecionadoEmit:Event', function() {
                    // Carrega as permissões novamente considerando a coligada do contexto armazenado no cookie.
                    objTotvsDesktopService.loadPermissions();
                    // Carrega os parâmetros gerais do Totvs Educacional                           
                    objTotvsDesktopService.loadParametrosTotvsEducacionalGeral();

                    // Load List Menu Applications
                    objTotvsDesktopService.getMenuPortalEducacional(function(data) {
                        self.objMenuList = data;
                        verificaVisibilidadeMenuMatriculaES();
                        self.getSelectedMenu();
                    });

                    TotvsDesktopTermoConsentimentoService.consultaAceiteTermosConsentimento();

                    if ($rootScope.startApp === true) {
                        $rootScope.startApp = false;
                        $state.go('mural.start', null);
                    }
                });

                //Toda vez que uma nova view é apresentada, será verificado se o usuário está logado,
                //caso não esteja o mesmo estará com a sessão expirada e será redirecionado para  tela de login
                $rootScope.$on('$stateChangeStart', function() {
                    objTotvsDesktopService.verificaUsuarioLogadoAsync();
                });

                $rootScope.$on('$stateChangeSuccess', function() {
                    self.getSelectedMenu();
                });
            }

            function verificaVisibilidadeMenuMatriculaES() {
                if (EDU_CONST_PORTAL_MATRICULAES == false) {
                    let listaItensMenu = [];

                    for (let i = 0; i < self.objMenuList.length; i++) {
                        if (self.objMenuList[i].id !== 'EDU_PORTAL_MATRICULAES')
                            listaItensMenu.push(self.objMenuList[i]);
                    }

                    self.objMenuList = listaItensMenu;
                }
            }

            function setLoading(isLoading) {
                self.isLoading = isLoading;
            }
        }
    });