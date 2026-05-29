/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.32
 * (c) 2021-2021 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module bibPesquisaAcervoModule
 * @object routeConfig
 *
 * @created 09/03/2021 v12.1.32
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas da Pesquisa ao acervo do TOTVS Educacional Gestão Bibliotecária.
 */
define(['biblioteca/pesquisa-acervo/pesquisa-acervo.module'], function() {

    'use strict';

    angular
        .module('bibPesquisaAcervoModule')
        .config(BibPesquisaAcervoRouteConfig);

    BibPesquisaAcervoRouteConfig.$inject = ['$stateProvider'];

    function BibPesquisaAcervoRouteConfig($stateProvider) {

        var pesquisaAcervoUrlView = 'js/biblioteca/pesquisa-acervo/pesquisa-acervo-list.view.html';
        var pesquisaAcervoUrlController = 'js/biblioteca/pesquisa-acervo/pesquisa-acervo-list.controller.js';

        validaUrlCustom();


        $stateProvider.state('pesquisa-acervo', {
            abstract: true,
            template: '<ui-view/>'

        }).state('pesquisa-acervo.start', {
            url: '/pesquisa-acervo',
            controller: 'BibPesquisaAcervoController',
            controllerAs: 'controller',
            templateUrl: pesquisaAcervoUrlView,
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'bibPesquisaAcervoModule',
                        files: [pesquisaAcervoUrlController]
                    }]);
                }]
            }
        });

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.pesquisaAcervo) {
                pesquisaAcervoUrlView = 'js/biblioteca/pesquisa-acervo/custom/pesquisa-acervo-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.pesquisaAcervo) {
                pesquisaAcervoUrlController = 'js/biblioteca/pesquisa-acervo/custom/pesquisa-acervo-list.controller.js';
            }
        }
    }
});