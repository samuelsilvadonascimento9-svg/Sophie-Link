/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduRelatoriosModule
 * @object routeConfig
 *
 * @created 30/08/2018 v12.1.22
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Relatorios
 */
define(['aluno/relatorios/relatorios.module'], function() {

    'use strict';

    angular
        .module('eduRelatoriosModule')
        .config(EduRelatoriosRouteConfig);

    EduRelatoriosRouteConfig.$inject = ['$stateProvider'];

    function EduRelatoriosRouteConfig($stateProvider) {

        var relatoriosUrlView = 'js/aluno/relatorios/relatorios-list.view.html';
        var relatoriosUrlController = 'js/aluno/relatorios/relatorios-list.controller.js';

        validaUrlCustom();

        $stateProvider.state('relatorios', {
            abstract: true,
            template: '<ui-view/>'

        }).state('relatorios.start', {
            url: '/relatorios',
            controller: 'EduRelatoriosController',
            controllerAs: 'controller',
            templateUrl: relatoriosUrlView,
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduRelatoriosModule',
                        files: [relatoriosUrlController]
                    }]);
                }]
            }
        });

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.relatorios) {
                relatoriosUrlView = 'js/aluno/relatorios/custom/relatorios-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.relatorios) {
                relatoriosUrlController = 'js/aluno/relatorios/custom/relatorios-list.controller.js';
            }
        }
    }
});