/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-desktop/totvs-desktop.module',
    'totvs-desktop/totvs-desktop.factory',
    'totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.factory',
    'utils/edu-utils.factory',
    'setup/sso/sso.factory'
], function() {

    'use strict';

    angular
        .module('totvsDesktop')
        .service('totvsDesktopService', TotvsDesktopService);

    TotvsDesktopService.$inject = ['$rootScope',
        '$window',
        'totvsDesktopFactory',
        'eduUtilsFactory',
        'TotvsDesktopContextoCursoFactory',
        'i18nFilter',
        'totvs.app-notification.Service',
        'eduSSOFactory',
        'eduEnumsConsts'
    ];

    /**
     * Service geral do portal
     * @param   {object} $rootScope             Objeto do escopo principal
     * @param   {object} $window                Objeto window angular
     * @param   {object} objTotvsDesktopFactory Objeto Factory
     * @param   {object} objEduUtilsFactory     Objeto Utils Factory
     * @param   {object} objContextoFactory     Objeto Factory do Contexto
     * @param   {object} i18nFilter             Objeto para tradução
     * @param   {object} totvsNotification      Objeto para notificações
     * @param   {object} eduSSOFactory          Dados de permissão do menu portal antigo
     * @param   {object} EduEnumsConsts         Objeto de Constantes do Educacional
     * @returns {object} Service Totvs Desktop
     */
    function TotvsDesktopService($rootScope, $window, objTotvsDesktopFactory, objEduUtilsFactory,
        objContextoFactory, i18nFilter, totvsNotification, eduSSOFactory, EduEnumsConsts) {
        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        //Objeto que contém as informações do usuário logado
        $rootScope.InformacoesLogin = null;

        //Objeto que contém todas as permissões utilizadas no sistema
        $rootScope.objPermissions = null;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.getParamURL = getParamURL;
        self.realizaLoginFrameHTML = realizaLoginFrameHTML;
        self.exibirMensagemErroAoLogar = exibirMensagemErroAoLogar;
        self.verificaUsuarioLogadoSetInfoLogin = verificaUsuarioLogadoSetInfoLogin;
        self.loadPermissions = loadPermissions;
        self.loadParametrosTotvsEducacionalGeral = loadParametrosTotvsEducacionalGeral;
        self.redirecionarParaPaginaLogin = redirecionarParaPaginaLogin;
        self.loadParamsHeader = loadParamsHeader;
        self.getMenuPortalEducacional = getMenuPortalEducacional;
        self.getMenuBiblioteca = getMenuBiblioteca;
        self.getMenuCorporeRMAsync = getMenuCorporeRMAsync;
        self.getIconsMenu = getIconsMenu;
        self.getInformacoesPessoaisBasicas = getInformacoesPessoaisBasicas;
        self.verificaUsuarioLogadoAsync = verificaUsuarioLogadoAsync;
        self.IntegradoProvaFacil = false;
        self.urlPergamum = '';
        self.getParametroIntegracaoBib = getParametroIntegracaoBib;
        self.getMenuBibliotecaFixo = getMenuBibliotecaFixo;

        // *********************************************************************************
        // *** Public Methods
        // *********************************************************************************

        /**
         * @public
         * @function Obtém os parâmetros da URL
         * @name getParamURL
         * @param   {string} nomeParametro Nome do parâmetro
         * @returns {object} Objeto parâmetro
         */
        function getParamURL(nomeParametro) {
            var results = new RegExp('[\?&]' + nomeParametro + '=([^&#]*)').exec($window.location.href);

            if (angular.isArray(results) && results.length > 1) {
                return decodeURIComponent(results[1]);
            } else {
                return undefined;
            }
        }

        /**
         * @public
         * @function Realiza o Login no FrameHTML
         * @name realizaLoginFrameHTML
         * @param {string}   key      Chave para logar
         * @callback Função de retorno ao logar
         */
        function realizaLoginFrameHTML(key, callback) {

            objTotvsDesktopFactory.realizarAutoLoginAsync(key, function(result) {

                if (result && !result.Excessao) {

                    if (angular.isFunction(callback)) {
                        callback();
                    }
                } else {
                    self.exibirMensagemErroAoLogar(function() {
                        $window.location.href = $window.location.href.split('#')[0] + 'login';
                    });
                }
            });
        }

        /**
         * @public
         * @function Exibe uma mensagem de erro ao logar
         * @name exibirMensagemErroAoLogar
         * @callback Função de retorno após exibir a mensagem
         */
        function exibirMensagemErroAoLogar(callback) {

            totvsNotification.message({
                title: i18nFilter('l-titulo-erro-login'),
                text: i18nFilter('l-msg-erro-login'),
                size: 'md', // sm = small | md = medium | lg = larger,
                callback: callback
            });
        }

        /**
         * @public
         * @function Verifica se o usuário está logado e set informações de login
         * @name verificaUsuarioLogadoAsync
         * @callback Função de retorno caso esteja logado
         */
        function verificaUsuarioLogadoSetInfoLogin(callback) {
            objTotvsDesktopFactory.verificaUsuarioLogadoAsync(function(result) {

                if (result.value) {

                    //Retorna as informações do usuário logado
                    objContextoFactory.getInformacoesUsuarioLogadoAsync(function(result) {

                        if (result) {

                            //Registra as informações do usuário logado no $rootScope
                            $rootScope.InformacoesLogin = result;

                            //Inicializa a aplicação
                            objContextoFactory.getContextoAluno({}, callback);
                        } else {
                            //Caso não consiga retorna as informações do usuário logado
                            self.redirecionarParaPaginaLogin();
                        }
                    });
                } else {
                    //Caso o usuário não esteja logado no sistema, o mesmo será redirecionado para tela de login
                    self.redirecionarParaPaginaLogin();
                }
            });
        }

        /**
         * @public
         * @function Carrega as permissões da aplicação
         * @name loadPermissions
         */
        function loadPermissions() {
            // Carrega as permissões do usuário
            objTotvsDesktopFactory.getPermissions(function(permissions) {
                if (angular.isDefined(permissions)) {
                    $rootScope.objPermissions = permissions;
                }
            });
        }


        /**
         * @public
         * @function Carrega os parâmetros gerais do Totvs Educacional 
         * @name loadPermissions
         */
        function loadParametrosTotvsEducacionalGeral() {
            objEduUtilsFactory.getParametrosTOTVSEducacionalGeralAsync(function(parametrosGeral) {
                if (angular.isDefined(parametrosGeral)) {
                    $rootScope.EduParamsGeral = {};
                    $rootScope.EduParamsGeral = parametrosGeral;
                }
            });
        }

        /**
         * @public
         * @function Retorna a informação básica do aluno, como o nome e a foto que é exibido no topo superior direito do portal
         * @name getInformacoesPessoaisBasicas
         */
        function getInformacoesPessoaisBasicas(parameters, callback) {
            // Carrega as permissões do usuário
            return objTotvsDesktopFactory.getInformacoesPessoaisBasicas(parameters, callback);
        }

        /**
         * @public
         * @function Redireciona para a url de login
         * @name redirecionarParaPaginaLogin
         */
        function redirecionarParaPaginaLogin() {
            var actionRedirect = $window.location.href.split('/#/')[1];
            if (actionRedirect === '') {
                $window.location.href = $window.location.href.split('#')[0] + 'login';
            } else {
                $window.location.href = $window.location.href.split('#')[0] + 'login?redirect=' + actionRedirect;
            }
        }

        /**
         * @public
         * @function Carrega os parâmetros para a customização do cabeçalho e menus
         * @name loadParamsHeader
         * @callback Função para retornar os parâmetros
         */
        function loadParamsHeader(callback) {
            objEduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(objParams) {

                if (angular.isDefined(objParams)) {
                    let objParamsHeader = {
                        CorCabecalho: objParams.CorCabecalho,
                        CorFonteCabecalho: objParams.CorFonteCabecalho,
                        CorMenu: objParams.CorMenu,
                        CorFonteMenu: objParams.CorFonteMenu,
                        HotLink1: objParams.HotLink1,
                        HotLink2: objParams.HotLink2,
                        HotLink3: objParams.HotLink3,
                        HotLinkName1: objParams.HotLinkName1,
                        HotLinkName2: objParams.HotLinkName2,
                        HotLinkName3: objParams.HotLinkName3,
                        LogoPortal: objParams.LogoPortal,
                        PermiteAlterarSenha: objParams.PermiteAlterarSenha,
                        ExibirNomeFilial: objParams.ExibirNomeFilial,
                        IntegradoProvaFacil: objParams.IntegradoProvaFacil
                    };

                    self.IntegradoProvaFacil = objParamsHeader.IntegradoProvaFacil;

                    if (angular.isFunction(callback)) {
                        callback(objParamsHeader);
                    }
                }
            });
        }

        /**
         * @public
         * @function Carrega as listas com os menus
         * @name getMenuPortalEducacional
         * @callback Função para retornar os menus
         */
        function getMenuPortalEducacional(callback) {
            objTotvsDesktopFactory.getMenuPortalEducacional(function(menus) {
                getParametroIntegracaoBib(function(dataBiblioteca) {
                    if (dataBiblioteca) {

                        if (dataBiblioteca === EduEnumsConsts.TipoIntegracaoBibliotecaria.TOTVSGestaoBibliotecaria) {

                            var menuBib = getMenuBibliotecaFixo();
                            let existeMenuBib = menus.find(x => x.id === 'BIB_PORTAL_BIBLIOTECA');
                            if (existeMenuBib == null && menuBib != null) {
                                menus.push(menuBib.data[0]);
                            }
                        }
                        customMenu(menus);
                        callback(buildMenu(menus));
                    }
                });
            });
        }

        /**
         * @public
         * @function Carrega as listas com os menus da biblioteca
         * @name getMenuBiblioteca
         * @callback Função para retornar os menus
         */
        function getMenuBiblioteca(codColigada, callback) {
            objTotvsDesktopFactory.getMenuBiblioteca(codColigada, function(menus) {
                callback(buildMenu(menus));
            });
        }

        /**
         * @public
         * @function Carrega a lista de permissões do Corpore.Net
         * @name getMenuCorporeRMAsync
         * @callback Função para retornar as permissões do portal antigo Corpore.Net
         */
        function getMenuCorporeRMAsync(callback) {
            eduSSOFactory.getMenuCorporeRMAsync(function(result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }

        /**
         * @public
         * @function Define-se os ícones dos menus
         * @name getIconsMenu
         * @param {int}    idMenu ID do Menu
         * @param {string} urlMenu URL do Menu (Rota)
         * @returns {string} Classe CSS do menu
         */
        function getIconsMenu(idMenu, urlMenu) {
            var prefixIcon = 'ico-';

            if (urlMenu === '/') {
                if (idMenu === 'EDU_PORTAL_MURAL') {
                    return prefixIcon + 'mural';
                } else if (idMenu === 'EDU_PORTAL_MEU_PERGAMUM') {
                    return prefixIcon + 'biblioteca';
                }
            } else if (urlMenu === '#') { // Se for submenu

                switch (idMenu) {
                    case 'EDU_PORTAL_ACADEMICO_CENTRALALUNO': // Central do aluno
                        return prefixIcon + 'central-aluno';
                    case 'EDU_PORTAL_ACADEMICO_OPORTUNIDADES': // Oportunidades
                        return prefixIcon + 'oportunidades';
                    case 'EDU_PORTAL_ACADEMICO_SECRETARIA': // Secretaria
                        return prefixIcon + 'secretaria';
                    case 'EDU_PORTAL_ACADEMICO_URLSEXTERNAS': // Url's externas
                        return prefixIcon + 'links-uteis';
                    case 'BIB_PORTAL_BIBLIOTECA': // Biblioteca
                        return prefixIcon + 'biblioteca';
                }
            } else if (urlMenu && urlMenu !== '') { // Rota normal
                // Menus de customização receberão um ícone padrão.
                if (idMenu.substring(0, 4) === 'CST_') {
                    return prefixIcon + 'bookmark';
                } else if (urlMenu === '/es/matricula/apresentacao' || idMenu === 'EDU_PORTAL_MATRICULA_ITINERARIO_FORMATIVO') {
                    return prefixIcon + 'user-plus';
                } else if (urlMenu === '/eb/matricula/apresentacao') {
                    return prefixIcon + 'user-check';
                } else if (idMenu === 'EDU_PORTAL_FINANCEIRO_NEGOCIACAO' ||
                    urlMenu === '/negociacao/listagem-debitos-financeiro') {
                    return prefixIcon + 'negociacao';
                } else if (idMenu === 'EDU_PORTAL_ACELERADORA_DE_CARREIRAS') {
                    return prefixIcon + 'aceleradora-de-carreiras';
                } else if (urlMenu === '/financeiro.new' || idMenu === 'EDU_PORTAL_FINANCEIRO_NOVO') {
                    return prefixIcon + 'financeironew';
                } else if (idMenu === 'EDU_PORTAL_PROVA_FACIL') {
                    return prefixIcon + 'prova-facil';
                } else {
                    return prefixIcon + urlMenu.replace('/', '');
                }
            } else {
                return '';
            }
        }

        /**
         * @public
         * @function Verifica se o usuário está logado
         * @name verificaUsuarioLogadoAsync
         * @callback Função de retorno
         */
        function verificaUsuarioLogadoAsync(callback) {
            objTotvsDesktopFactory.verificaUsuarioLogadoAsync(function(result) {
                if (!result.value) {
                    self.exibirMensagemErroAoLogar(function() {
                        self.redirecionarParaPaginaLogin();
                    });
                } else {
                    if (angular.isFunction(callback)) {
                        callback(result);
                    }
                }
            });
        }

        // *********************************************************************************
        // *** Private Methods
        // *********************************************************************************

        /**
         * Faz a chamada para o servidor para obter a url do pergamum
         */
        function getUrlPergamum() {
            return new Promise(function(resolve, reject) {
                if (!!self.urlPergamum) {
                    resolve(self.urlPergamum);
                    return;
                }
                objTotvsDesktopFactory.getURLPergamum(function(result) {
                    if (!angular.isUndefined(result)) {
                        self.urlPergamum = result[0].URL;
                        resolve(self.urlPergamum);
                    } else
                        reject(i18nFilter('l-msg-erro-acessar-meu-pergamum'));
                });
            })
        }

        /**
         * Faz a chamada para o servidor para obter a url do Prova Fácil
         */
        function getUrlProvaFacil() {
            return new Promise(function(resolve, reject) {
                objTotvsDesktopFactory.getURLProvaFacil(function(result) {
                    if (!angular.isUndefined(result)) {
                        resolve(result.value);
                    } else
                        reject(i18nFilter('l-msg-erro-acessar-prova-facil'));
                });
            })
        }

        /**
         * @private
         * @function Customiza o menu
         * @name customMenu
         * @param {Array} menus Lista de objetos de menu
         * @returns {Array} Lista com os menus do portal Educacional
         */
        function customMenu(menus) {

            if (angular.isArray(menus) && menus.length > 0) {

                menus.forEach(function(menu) {
                    if (menu.id === 'EDU_PORTAL_PROVA_FACIL' && self.IntegradoProvaFacil) {
                        menu.url = 'prova-facil';
                        menu.function = getUrlProvaFacil;
                    }

                    if (menu.id === 'EDU_PORTAL_MEU_PERGAMUM') {
                        menu.url = '/';
                        menu.function = getUrlPergamum;
                        $rootScope.usaIntegracaoPergamum = true;
                    }
                });
            }

            return menus;
        }

        /**
         * @private
         * @function Constrói os menus do portal
         * @name buildMenu
         * @param   {Array} menus Lista com os objetos de menu
         * @returns {Array} Lista com os objetos de menus da aplicação
         */
        function buildMenu(ItensMenu) {
            var objMenuList = [];
            ordenaItensMenuBiblioteca(ItensMenu);

            angular.forEach(ItensMenu, function(ItemMenuAtual) {
                // Obtém os ícones dos menus
                ItemMenuAtual.icon = self.getIconsMenu(ItemMenuAtual.id, ItemMenuAtual.url);

                var objMenu = new Menu(ItemMenuAtual.id, ItemMenuAtual.name, ItemMenuAtual.url, ItemMenuAtual.icon, [], ItemMenuAtual.function);

                if (angular.isArray(ItemMenuAtual.itens) && ItemMenuAtual.itens.length > 0) {
                    objMenu.submenus = buildMenu(ItemMenuAtual.itens);
                }

                objMenuList.push(objMenu);
            });

            return objMenuList;
        }

        /**
         * @class
         * @classdesc Classe para definir o formato do menu
         * @param {string} id       Identificador do menu
         * @param {string} name     Nome do menu
         * @param {string} url      Rotas do menu
         * @param {string} icon     Classe CSS do ícone do menu
         * @param {Array}  submenus Lista de submenus
         * @param {function} functionToExecute função a ser executada ao clicar no menu
         */
        function Menu(id, name, url, icon, submenus, functionToExecute) {
            this.id = id || 1;
            this.name = name || '[name]';
            this.url = url || '/';
            this.icon = icon || '[icon]';
            this.submenus = submenus || [];
            this.function = functionToExecute;
        }

        function ordenaItensMenuBiblioteca(itensMenu) {
            let menuBiblioteca = itensMenu.find(menu => menu.id === 'BIB_PORTAL_BIBLIOTECA');

            if (!menuBiblioteca) return;

            let indexSubMenuPesquisaAcervo = menuBiblioteca.itens.findIndex(subMenu => subMenu.id === 'BIB_PORTAL_BIBLIOTECA_PESQUISAACERVO')

            if (indexSubMenuPesquisaAcervo >= 0) {
                arrayMove(menuBiblioteca.itens, indexSubMenuPesquisaAcervo, 0);
            }
        }

        function arrayMove(arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }

        function getParametroIntegracaoBib(callback) {
            objEduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(params) {
                callback(params.TipoIntegracaoBibliotecaria);
            });
        }

        function getMenuBibliotecaFixo() {
            if ($rootScope.listaPermissaoBibliotecaLoginResponsavel == null) {
                return null;
            }

            let permissaoExtrato = $rootScope.listaPermissaoBibliotecaLoginResponsavel.find(x => x === 'BIB_PORTAL_BIBLIOTECA_EXTRATOFINANCEIRO');
            let permissaoMovimentacoes = $rootScope.listaPermissaoBibliotecaLoginResponsavel.find(x => x === 'BIB_PORTAL_BIBLIOTECA_MOVIMENTACOES');
            let permissaoPesquisa = $rootScope.listaPermissaoBibliotecaLoginResponsavel.find(x => x === 'BIB_PORTAL_BIBLIOTECA_PESQUISAACERVO');

            let itens = [];

            if (permissaoExtrato !== undefined) {
                itens.push({
                    id: "BIB_PORTAL_BIBLIOTECA_EXTRATOFINANCEIRO",
                    name: "Extrato Financeiro",
                    url: "/extrato-financeiro",
                    itens: []
                });
            }

            if (permissaoMovimentacoes !== undefined) {
                itens.push({
                    id: "BIB_PORTAL_BIBLIOTECA_MOVIMENTACOES",
                    name: "Movimentações",
                    url: "/bib-movimentacoes",
                    itens: []
                });
            }

            if (permissaoPesquisa !== undefined) {
                itens.push({
                    id: "BIB_PORTAL_BIBLIOTECA_PESQUISAACERVO",
                    name: "Pesquisa ao Acervo",
                    url: "/pesquisa-acervo",
                    itens: []
                });
            }

            let menuBibFixo = {
                data: [{
                    id: "BIB_PORTAL_BIBLIOTECA",
                    name: "Biblioteca",
                    url: "#",
                    itens: itens
                }]
            };

            return angular.fromJson(JSON.stringify(menuBibFixo));
        }
    }
});