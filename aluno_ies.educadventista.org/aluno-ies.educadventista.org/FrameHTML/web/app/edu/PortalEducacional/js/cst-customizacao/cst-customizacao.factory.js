/**
 * @license TOTVS | Portal Processo Seletivo v12.1.17
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module cstCustomizacaoModule
 * @name eduCustomFactory
 * @object factory
 *
 * @created 12/12/2018 v12.1.17
 * @updated
 *
 * @requires cstCustomizacaoModule
 *
 * @description Factory utilizada nas funcionalidades Customizadas do Processo Seletivo
 */
define(['cst-customizacao/cst-customizacao.module'], function() {

    'use strict';

    angular
        .module('cstCustomizacaoModule')
        .factory('eduCustomFactory', EduCustomFactory);

    EduCustomFactory.$inject = ['$totvsresource'];

    function EduCustomFactory($totvsresource) {
        // o método precisa de um return falso para não dar erro
        // o mesmo será sobrescrito quando houver customização
        return '';
    }
});