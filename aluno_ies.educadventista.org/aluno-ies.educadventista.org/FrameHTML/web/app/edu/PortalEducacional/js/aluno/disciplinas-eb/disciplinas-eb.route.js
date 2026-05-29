/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduDisciplinasEBModule
 * @object routeConfig
 *
 * @created 06/12/2016 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas das Disciplinas (Séries) do Ensino Básico
 */
define(['aluno/disciplinas-eb/disciplinas-eb.module'], function() {

    'use strict';

    angular
        .module('eduDisciplinasEBModule')
        .config(EduDisciplinasEBRouteConfig);

    EduDisciplinasEBRouteConfig.$inject = ['$stateProvider'];

    function EduDisciplinasEBRouteConfig($stateProvider) {

        var disciplinaEbView = 'js/aluno/disciplinas-eb/disciplinas-eb-list.view.html',
            disciplinaEbController = 'js/aluno/disciplinas-eb/disciplinas-eb-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.disciplinasEb) {
                disciplinaEbView = 'js/aluno/disciplinas-eb/custom/disciplinas-eb-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.disciplinasEb) {
                disciplinaEbController = 'js/aluno/disciplinas-eb/custom/disciplinas-eb-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('disciplinas-eb', {
                abstract: true,
                template: '<ui-view/>'

            }).state('disciplinas-eb.start', {
                url: '/disciplinas-eb',
                controller: 'EduDisciplinasEBController',
                controllerAs: 'controller',
                templateUrl: disciplinaEbView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduDisciplinasEBModule',
                            files: [disciplinaEbController]
                        }]);
                    }]
                }
            });
        }
    }
});