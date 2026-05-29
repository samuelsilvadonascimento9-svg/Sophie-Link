/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-desktop/totvs-desktop.module'], function() {

    'use strict';

    angular
        .module('totvsDesktop')
        .factory('totvsDesktopFactory', TotvsDesktopFactory);

    TotvsDesktopFactory.$inject = ['$totvsresource', 'i18nFilter'];

    /**
     * Factory para os serviços gerais do portal
     * @param   {object} $totvsresource Resource para acesso aos serviços
     * @param   {object} i18nFilter     Objeto para tradução
     * @returns {object} Factory Totvs Desktop
     */
    function TotvsDesktopFactory($totvsresource, i18nFilter) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory = $totvsresource.REST(url, {}, {});

        // Obtém os menus do portal
        factory.getMenuPortalEducacional = getMenuPortalEducacional;
        // Obtém as permissões do portal
        factory.getPermissions = getPermissions;
        // Carrega a URL de Login do Portal Corpore.Net
        factory.getURLPortalCorporeNET = getURLPortalCorporeNET;
        //Busca as informações básicas do aluno selecionado no contexto, como nome e foto que é exibido no topo superior direito do portal
        factory.getInformacoesPessoaisBasicas = getInformacoesPessoaisBasicas;
        // Carrega a URL da Biblioteca Pergamum
        factory.getURLPergamum = getURLPergamum;
        // Carrega a URL do Prova Fácil
        factory.getURLProvaFacil = getURLProvaFacil;
        factory.getMenuBiblioteca = getMenuBiblioteca;
        // Realiza o auto-login da aplicação baseado em um chave
        factory.realizarAutoLoginAsync = realizarAutoLoginAsync;
        // Verifica se o usuário está logado
        factory.verificaUsuarioLogadoAsync = verificaUsuarioLogadoAsync;
        // Carrega os parâmetros de customização do cabeçalho e menus
        factory.loadParamsHeader = loadParamsHeader;

        return factory;

        // ********************************************************************
        // Public Functions
        // ********************************************************************

        /**
         * @public
         * @function Obtém os menus do portal
         * @name getMenuPortalEducacional
         * @callback Função de retorno recebendo os menus
         */
        function getMenuPortalEducacional(callback) {
            return factory.TOTVSQuery({
                method: 'GetMenu'
            }, callback);
        }

        /**
         * @public
         * @function Obtém os menus da biblioteca
         * @name getMenuBiblioteca
         * @callback Função de retorno recebendo os menus
         */
        function getMenuBiblioteca(codColigada, callback) {

            var parameters = {
                method: 'GetMenuBiblioteca',
                CodColigada: codColigada
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * @public
         * @function Obtém as permissões do portal
         * @name getPermissions
         * @callback Função de retorno recebendo as permissões
         * @returns {object} Resources
         */
        function getPermissions(callback) {
            return factory.TOTVSGet({
                method: 'Permissoes'
            }, callback);
        }

        /**
         * @public
         * @function Carrega a URL de Login do Portal Corpore.Net
         * @name getURLPortalCorporeNET
         * @callback Função de retorno recebendo a URL do Portal Corpore.Net
         * @returns {object} Resources
         */
        function getURLPortalCorporeNET(callback) {
            return factory.TOTVSQuery({
                method: 'LoginURL'
            }, callback);
        }

        /**
         * @public
         * @function Realiza o auto-login da aplicação baseado em um chave
         * @param   {string}   key      Chave para realizar o login
         * @callback Função de retorno
         * @returns {object} Resources
         */
        function realizarAutoLoginAsync(key, callback) {

            var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'user/:method',
                factoryAutoLogin = $totvsresource.REST(url, {}, {}),
                parameters = {
                    method: 'AutoLoginPortal',
                    key: key
                };

            return factoryAutoLogin.TOTVSGet(parameters, callback);
        }

        /**
         * @public
         * @function Verifica se o usuário está logado
         * @callback Função de retorno
         * @returns {object} Resources
         */
        function verificaUsuarioLogadoAsync(callback) {
            return factory.TOTVSGet({
                method: 'UsuarioLogado'
            }, callback, {}, true);
        }

        /**
         * @public
         * @function Parâmetros de customização do cabeçalho e menu
         * @callback Função de retorno
         * @returns {object} Resources
         */
        function loadParamsHeader(callback) {
            return factory.TOTVSGet({
                method: 'ParamsCustom'
            }, callback);
        }

        /**
         * @public
         * @function Carrega a URL de Login do Portal Corpore.Net
         * @name getURLPergamum
         * @callback Função de retorno recebendo a URL do Portal Corpore.Net
         * @returns {object} Resources
         */
        function getURLPergamum(callback) {
            return factory.TOTVSQuery({
                method: 'URLPergamum'
            }, callback);
        }

        /**
         * @public
         * @function Carrega a URL de autenticação SSO do Prova Fácil
         * @name getURLProvaFacil
         * @callback Função de retorno recebendo a URL do Prova Fácil
         * @returns {object} Resources
         */
        function getURLProvaFacil(callback) {
            return factory.TOTVSGet({
                method: 'URLProvaFacil'
            }, callback);
        }

        /**
         * @public
         * @function Carrega as informações básicas do aluno, como nome e a foto que é exibido no topo superior direito do portal do aluno
         * @name getInformacoesPessoaisBasicas
         * @returns {object} Com nome e foto do usuário
         */
        function getInformacoesPessoaisBasicas(parameters, callback) {
            parameters.method = 'Aluno/InformacoesPessoaisBasicas';
            return this.TOTVSQuery(parameters, callback);
        }
    }
});