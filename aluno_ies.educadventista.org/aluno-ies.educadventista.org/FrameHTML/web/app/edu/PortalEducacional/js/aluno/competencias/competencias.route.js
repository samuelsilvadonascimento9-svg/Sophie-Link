define(['aluno/competencias/competencias.module'], function() {

    'use strict';

    angular
        .module('eduCompetenciasModule')
        .config(EduCompetenciasRouteConfig);

    EduCompetenciasRouteConfig.$inject = ['$stateProvider'];

    function EduCompetenciasRouteConfig($stateProvider) {

        var competenciasUrlView = 'js/aluno/competencias/competencias-list.view.html';
        var competenciasUrlController = 'js/aluno/competencias/competencias-list.controller.js';

        validaUrlCustom();


        $stateProvider.state('competencias', {
            abstract: true,
            template: '<ui-view/>'

        }).state('competencias.start', {
            url: '/competencias',
            controller: 'EduCompetenciasController',
            controllerAs: 'controller',
            templateUrl: competenciasUrlView,
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduCompetenciasModule',
                        files: [competenciasUrlController]
                    }]);
                }]
            }
        });

        function validaUrlCustom() {

            if (EDU_CONST_GLOBAL_CUSTOM_VIEW.competencias) {
                competenciasUrlView = 'js/aluno/competencias/custom/competencias-list.view.html';
            }

            if (EDU_CONST_GLOBAL_CUSTOM_CONTROLLER.competencias) {
                competenciasUrlController = 'js/aluno/competencias/custom/competencias-list.controller.js';
            }
        }
    }
});