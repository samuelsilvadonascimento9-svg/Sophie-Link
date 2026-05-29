/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.22
 * (c) 2015-2018 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduMainModule
 * @object routeConfig
 *
 * @created 08/10/2018 v12.1.22
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Main
 */
define(['aluno/main/main.module'], function() {

    'use strict';

    angular
        .module('eduMainModule')
        .config(eduMainRouteConfig);

    eduMainRouteConfig.$inject = ['$stateProvider'];

    function eduMainRouteConfig($stateProvider) {

        var mainView = 'js/aluno/main/main.view.html',
            mainController = 'js/aluno/main/main.controller.js';

        init();

        /**
         * Função que inicializa o carregamento do RouteConfig.
         */
        function init() {
            carregaRotas();
        }

        /**
         * Realiza o carregamento das rotas.
         */
        function carregaRotas() {

            $stateProvider.state('main', {
                abstract: true,
                template: '<ui-view/>'

            }).state('main.start', {
                url: '/main',
                controller: 'EduMainController',
                controllerAs: 'controller',
                templateUrl: mainView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduMainModule',
                            files: [mainController]
                        }]);
                    }]
                }
            });
        }
    }
});