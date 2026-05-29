/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduHistoricoEBModule
 * @object routeConfig
 *
 * @created 14/12/2016 v12.1.15
 * @updated
 *
 * @dependencies $stateProvider
 *
 * @description Rotas do Histórico do Ensino Básico
 */
define(['aluno/historico-eb/historico-eb.module'], function() {

    'use strict';

    angular
        .module('eduHistoricoEBModule')
        .config(EduHistoricoEBRouteConfig);

    EduHistoricoEBRouteConfig.$inject = ['$stateProvider'];

    function EduHistoricoEBRouteConfig($stateProvider) {

        $stateProvider.state('historico-eb', {
            abstract: true,
            template: '<ui-view/>'

        }).state('historico-eb.start', {
            url: '/historico',
            controller: 'EduHistoricoEBController',
            controllerAs: 'controller',
            templateUrl: 'js/aluno/historico-eb/historico-eb-list.view.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduHistoricoEBModule',
                        files: ['js/aluno/historico-eb/historico-eb-list.controller.js']
                    }]);
                }]
            }
        });
    }
});