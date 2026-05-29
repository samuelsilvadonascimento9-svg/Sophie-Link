/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduQuadroHorarioModule
 * @object routeConfig
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Quadro de Horário
 */

define(['aluno/quadro-horario/quadro-horario.module'], function() {
    'use strict';

    angular
        .module('eduQuadroHorarioModule')
        .config(QuadroHorarioRouteConfig);

    QuadroHorarioRouteConfig.$inject = ['$stateProvider'];

    function QuadroHorarioRouteConfig($stateProvider) {

        var quadroHorarioView = 'js/aluno/quadro-horario/quadro-horario-list.view.html',
            quadroHorarioController = 'js/aluno/quadro-horario/quadro-horario-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.quadroHorario) {
                quadroHorarioView = 'js/aluno/quadro-horario/custom/quadro-horario-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.quadroHorario) {
                quadroHorarioController = 'js/aluno/quadro-horario/custom/quadro-horario-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('quadro-horario', {
                abstract: true,
                template: '<ui-view/>'

            }).state('quadro-horario.iniciar', {
                url: '/quadro-horario',
                controller: 'QuadroHorarioController',
                controllerAs: 'controller',
                templateUrl: quadroHorarioView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduQuadroHorarioModule',
                            files: [quadroHorarioController]
                        }]);
                    }]
                }
            });
        }
    }

});