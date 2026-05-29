/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.16
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/entregas/entregas.module'], function() {

    'use strict';

    angular
        .module('eduEntregasModule')
        .config(eduEntregasRouteConfig);

    eduEntregasRouteConfig.$inject = ['$stateProvider'];

    function eduEntregasRouteConfig($stateProvider) {

        var entregasUrlView = 'js/aluno/entregas/entregas-list.view.html',
            entregasUrlController = 'js/aluno/entregas/entregas-list.controller.js';

        validaUrlCustom();

        $stateProvider.state('entregas', {
            abstract: true,
            template: '<ui-view/>'

        }).state('entregas.start', {
            url: '/entregas',
            controller: 'eduEntregasController',
            controllerAs: 'controller',
            templateUrl: entregasUrlView,
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduEntregasModule',
                        files: [entregasUrlController]
                    }]);
                }]
            }
        });

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.entregas) {
                entregasUrlView = 'js/aluno/entregas/custom/entregas-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.entregas) {
                entregasUrlController = 'js/aluno/entregas/custom/entregas-list.controller.js';
            }
        }
    }
});