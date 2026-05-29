/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduOcorrenciasModule
 * @object routeConfig
 *
 * @created 14/09/2016 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Ocorrencias
 */
define(['aluno/ocorrencias/ocorrencias.module'], function() {

    'use strict';

    angular
        .module('eduOcorrenciasModule')
        .config(EduOcorrenciasRouteConfig);

    EduOcorrenciasRouteConfig.$inject = ['$stateProvider'];

    function EduOcorrenciasRouteConfig($stateProvider) {

        var ocorrenciasUrlView = 'js/aluno/ocorrencias/ocorrencias-list.view.html';
        var ocorrenciasUrlController = 'js/aluno/ocorrencias/ocorrencias-list.controller.js';

        validaUrlCustom();


        $stateProvider.state('ocorrencias', {
            abstract: true,
            template: '<ui-view/>'

        }).state('ocorrencias.start', {
            url: '/ocorrencias',
            controller: 'EduOcorrenciasController',
            controllerAs: 'controller',
            templateUrl: ocorrenciasUrlView,
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduOcorrenciasModule',
                        files: [ocorrenciasUrlController]
                    }]);
                }]
            }
        });

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.ocorrencias) {
                ocorrenciasUrlView = 'js/aluno/ocorrencias/custom/ocorrencias-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.ocorrencias) {
                ocorrenciasUrlController = 'js/aluno/ocorrencias/custom/ocorrencias-list.controller.js';
            }
        }
    }
});