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
define(['setup/setup.module'], function() {

    'use strict';

    angular
        .module('eduSetupModule')
        .config(eduSetupRouteConfig);

    eduSetupRouteConfig.$inject = ['$stateProvider'];

    function eduSetupRouteConfig($stateProvider) {

        $stateProvider.state('setup', {
            abstract: true,
            template: '<ui-view/>'

        }).state('setup.start', {
            url: '/sair',
            controller: 'EduLogoutController',
            controllerAs: 'controller',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduSetupModule',
                        files: ['js/setup/logout/logout.controller.js']
                    }]);
                }]
            }
        }).state('setup.autologin', {
            url: '/autologin?{key:string}',
            controller: 'EduAutoLoginController',
            controllerAs: 'controller',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduSetupModule',
                        files: ['js/setup/auto-login/auto-login.controller.js']
                    }]);
                }]
            }
        }).state('setup.sso', {
            url: '/corporerm',
            controller: 'EduSSOController',
            controllerAs: 'controller',
            templateUrl: 'js/setup/sso/sso.view.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'eduSetupModule',
                        files: ['js/setup/sso/sso.controller.js']
                    }]);
                }]
            }
        });
    }
});