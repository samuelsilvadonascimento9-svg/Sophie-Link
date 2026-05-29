/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduMuralModule
 * @name eduMuralFactory
 * @object factory
 *
 * @created 14/09/2016 v12.1.15
 * @updated
 *
 * @requires eduMuralModule
 *
 * @description Factory utilizada no Mural.
 */
define(['aluno/mural/mural.module'], function() {

    'use strict';

    angular
        .module('eduMuralModule')
        .factory('eduMuralFactory', eduMuralFactory);

    eduMuralFactory.$inject = ['$totvsresource'];

    /**
     * Factory da página inicial do portal
     * @param   {object} $totvsresource Objeto responsável pela chamado dos serviços REST
     * @returns {object} Factory com os serviços
     */
    function eduMuralFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});

        factory.getSlides = getSlides; // Busca todos banners para o mural

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Banner para o carousel do Mural
         * @param   {[[Type]]} callback [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        function getSlides(callback) {
            return this.TOTVSQuery({
                method: 'Banner'
            }, callback);
        }
    }
});