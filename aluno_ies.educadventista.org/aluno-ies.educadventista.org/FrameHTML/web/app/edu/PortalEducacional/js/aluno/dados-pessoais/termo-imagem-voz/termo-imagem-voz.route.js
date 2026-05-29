/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.32
 * (c) 2021-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduTermoImagemVozModule
 * @object routeConfig
 *
 * @created 10/03/2023 v12.1.2306
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do gerencimaento da página de Termo de Consentimento de Uso de Imagem e Voz
 */
define(['aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.module'], function() {

    'use strict';

    angular
        .module('eduTermoImagemVozModule')
        .config(EduTermoImagemVozRouteConfig);

    EduTermoImagemVozRouteConfig.$inject = ['$stateProvider'];

    function EduTermoImagemVozRouteConfig($stateProvider) {

        let eduTermoImagemVozUrlView = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.view.html';
        let eduTermoImagemVozUrlController = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.controller.js';

        validaUrlCustom();

        $stateProvider.state('termo-imagem-voz', {
            abstract: true,
            template: '<ui-view/>'

        }).state('termo-imagem-voz.start', {
            url: '/termo-imagem-voz',
            views: {
                '@': {
                    controller: 'eduTermoImagemVozController',
                    controllerAs: 'controller',
                    templateUrl: eduTermoImagemVozUrlView,
                    resolve: {
                        lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'eduTermoImagemVozModule',
                                files: [eduTermoImagemVozUrlController]
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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.termoImagemVoz) {
                eduTermoImagemVozUrlView = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.termoImagemVoz) {
                eduTermoImagemVozUrlController = 'js/aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.controller.js';
            }
        }
    }
});