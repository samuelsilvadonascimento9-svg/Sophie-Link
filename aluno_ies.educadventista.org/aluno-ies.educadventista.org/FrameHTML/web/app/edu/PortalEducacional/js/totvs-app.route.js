/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-app.module'], function() {

    'use strict';

    angular
        .module('totvsApp')
        .config(totvsRouteConfig);

    totvsRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function totvsRouteConfig($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            abstract: true,
            template: '<ui-view/>'

        }).state('home.blank', {
            url: '/'

        });

        $urlRouterProvider.otherwise('/');

    }
});