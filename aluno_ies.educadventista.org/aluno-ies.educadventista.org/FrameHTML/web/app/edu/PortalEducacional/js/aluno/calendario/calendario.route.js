/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/calendario/calendario.module'], function() {

    'use strict';

    angular
        .module('eduCalendarioModule')
        .config(EduCalendarioRouteConfig);

    EduCalendarioRouteConfig.$inject = ['$stateProvider'];

    function EduCalendarioRouteConfig($stateProvider) {

        var calendarioView = 'js/aluno/calendario/calendario-list.view.html',
            calendarioController = 'js/aluno/calendario/calendario-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.calendario) {
                calendarioView = 'js/aluno/calendario/custom/calendario-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.calendario) {
                calendarioController = 'js/aluno/calendario/custom/calendario-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('calendario', {
                abstract: true,
                template: '<ui-view/>'
            }).state('calendario.start', {
                url: '/calendario',
                views: {
                    '@': {
                        controller: 'eduCalendarioController',
                        controllerAs: 'controller',
                        templateUrl: calendarioView,
                        resolve: {
                            lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    name: 'eduCalendarioModule',
                                    files: [calendarioController]
                                }]);
                            }]
                        }
                    }
                }
            });
        }
    }
});