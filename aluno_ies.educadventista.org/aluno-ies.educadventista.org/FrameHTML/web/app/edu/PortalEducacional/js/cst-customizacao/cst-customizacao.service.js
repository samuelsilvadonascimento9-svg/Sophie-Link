/**
 * @license TOTVS | Portal Processo Seletivo v12.1.17
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define([
    'cst-customizacao/cst-customizacao.module',
    'cst-customizacao/cst-customizacao.factory',
], function() {

    'use strict';

    angular
        .module('cstCustomizacaoModule')
        .service('eduCustomService', eduCustomService);

    eduCustomService.$inject = [
        '$totvsresource',
        'eduCustomFactory',
        '$compile'
    ];

    function eduCustomService(
        $totvsresource,
        EduCustomFactory,
        $compile
    ) {

        var self = this;
        self.initPost = initPost;
        self.initPre = initPre;
        return self;



        //Evento Pre da inicialização do controller para customização
        function initPre(controller, scope) {}

        //Evento Post da inicialização do controller para customização
        function initPost(controller, scope) {}
    }


});