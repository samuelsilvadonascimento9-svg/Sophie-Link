/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.32
 * (c) 2021-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module bibExtratoFinanceiroModule
 * @object routeConfig
 *
 * @created 10/03/2023 v12.1.2306
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do gerencimaento da página de Extrato Financeiro do TOTVS Educacional Gestão Bibliotecária.
 */
define(['biblioteca/extrato-financeiro/extrato-financeiro.module'], function() {

    'use strict';

    angular
        .module('bibExtratoFinanceiroModule')
        .config(BibExtratoFinanceiroRouteConfig);

    BibExtratoFinanceiroRouteConfig.$inject = ['$stateProvider'];

    function BibExtratoFinanceiroRouteConfig($stateProvider) {

        var bibExtratoFinanceiroUrlView = 'js/biblioteca/extrato-financeiro/extrato-financeiro.view.html';
        var bibExtratoFinanceiroUrlController = 'js/biblioteca/extrato-financeiro/extrato-financeiro.controller.js';

        validaUrlCustom();

        $stateProvider.state('extrato-financeiro', {
            abstract: true,
            template: '<ui-view/>'

        }).state('extrato-financeiro.start', {
            url: '/extrato-financeiro',
            views: {
                '@': {
                    controller: 'BibExtratoFinanceiroController',
                    controllerAs: 'controller',
                    templateUrl: bibExtratoFinanceiroUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'bibExtratoFinanceiroModule',
                                files: [bibExtratoFinanceiroUrlController]
                            }]);
                        }]
                    }
                }
            }
        });

        function validaUrlCustom() {

            /**
             * View
             */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.bibExtratoFinanceiro) {
                bibExtratoFinanceiroUrlView = 'js/biblioteca/extrato-financeiro/custom/extrato-financeiro.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.bibExtratoFinanceiro) {
                bibExtratoFinanceiroUrlController = 'js/biblioteca/extrato-financeiro/custom/extrato-financiero-list.controller.js';
            }
        }
    }
});