/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/altera-senha/altera-senha.module'], function() {

    'use strict';

    angular
        .module('eduAlteraSenhaModule')
        .config(eduAlteraSenhaRouteConfig);

    eduAlteraSenhaRouteConfig.$inject = ['$stateProvider'];

    function eduAlteraSenhaRouteConfig($stateProvider) {

    }
});