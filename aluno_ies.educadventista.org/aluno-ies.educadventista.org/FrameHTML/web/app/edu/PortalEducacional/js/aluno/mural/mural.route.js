/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduMuralModule
 * @object routeConfig
 *
 * @created 14/09/2016 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Mural
 */
define(['aluno/mural/mural.module'], function() {

    'use strict';

    angular
        .module('eduMuralModule')
        .config(eduMuralRouteConfig);

    eduMuralRouteConfig.$inject = ['$stateProvider'];

    function eduMuralRouteConfig($stateProvider) {

        var muralView = 'js/aluno/mural/mural-list.view.html',
            muralController = 'js/aluno/mural/mural-list.controller.js';

        init();

        /**
         * Função que inicializa o carregamento do RouteConfig.
         * 
         */
        function init() {
            validaUrlCustom();
            carregaRotas();
        }

        /**
         * Valida se os controllers e views serão customizadas.
         * 
         */
        function validaUrlCustom() {

            /**
             * View
             */
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.mural) {
                muralView = 'js/aluno/mural/custom/mural-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.mural) {
                muralController = 'js/aluno/mural/custom/mural-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {
            $stateProvider.state('mural', {
                abstract: true,
                template: '<ui-view/>'

            }).state('mural.start', {
                url: '/',
                controller: 'EduMuralController',
                controllerAs: 'controller',
                templateUrl: muralView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduMuralModule',
                            files: [muralController]
                        }]);
                    }]
                }
            });
        }
    }
});