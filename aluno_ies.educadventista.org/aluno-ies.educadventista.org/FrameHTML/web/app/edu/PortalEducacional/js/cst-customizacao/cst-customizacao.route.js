define(['cst-customizacao/cst-customizacao.module'], function() {

    'use strict';

    angular
        .module('cstCustomizacaoModule')
        .config(CstCustomizacaoRouteConfig);

    CstCustomizacaoRouteConfig.$inject = ['$stateProvider'];

    function CstCustomizacaoRouteConfig($stateProvider) {

        init();

        /**
         * Função que inicializa o carregamento do RouteConfig.
         *
         */
        function init() {

        }
    }
});