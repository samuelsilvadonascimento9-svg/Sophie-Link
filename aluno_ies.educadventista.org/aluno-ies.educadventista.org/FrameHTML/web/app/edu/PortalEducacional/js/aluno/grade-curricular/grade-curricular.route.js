/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduGradeCurricularModule
 * @object routeConfig
 *
 * @created 04/11/2016 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas da Grade Curricular
 */
define(['aluno/grade-curricular/grade-curricular.module'], function() {

    'use strict';

    angular
        .module('eduGradeCurricularModule')
        .config(EduGradeCurricularRouteConfig);

    EduGradeCurricularRouteConfig.$inject = ['$stateProvider'];

    function EduGradeCurricularRouteConfig($stateProvider) {

        var gradeCurricularView = 'js/aluno/grade-curricular/grade-curricular-list.view.html',
            gradeCurricularController = 'js/aluno/grade-curricular/grade-curricular-list.controller.js';

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
            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.gradeCurricular) {
                gradeCurricularView = 'js/aluno/grade-curricular/custom/grade-curricular-list.view.html';
            }

            /**
             * Controller
             */
            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.gradeCurricular) {
                gradeCurricularController = 'js/aluno/grade-curricular/custom/grade-curricular-list.controller.js';
            }
        }

        /**
         * Realiza o carregamento das rotas.
         * 
         */
        function carregaRotas() {

            $stateProvider.state('grade-curricular', {
                abstract: true,
                template: '<ui-view/>'

            }).state('grade-curricular.start', {
                url: '/grade-curricular',
                controller: 'EduGradeCurricularController',
                controllerAs: 'controller',
                templateUrl: gradeCurricularView,
                resolve: {
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'eduGradeCurricularModule',
                            files: [gradeCurricularController]
                        }]);
                    }]
                }
            });
        }
    }
});