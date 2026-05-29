/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduDiretivasModule
 * @name eduSelecaoPeriodoletivoFactory
 * @object factory
 *
 * @created 06/12/2016 v12.1.15
 * @updated
 *
 * @dependencies $totvsresource
 *
 * @description Factory utilizada na Seleção de Período Letivo.
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular
        .module('eduDiretivasModule')
        .factory('eduSelecaoPeriodoletivoFactory', EduSelecaoPeriodoletivoFactory);

    EduSelecaoPeriodoletivoFactory.$inject = ['$totvsresource'];

    function EduSelecaoPeriodoletivoFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Periodos',
            factory = $totvsresource.REST(url, {}, {});

        factory.getPeriodos = getPeriodos;
        factory.getDescricaoPeriodoLetivoPorIdAsync = getDescricaoPeriodoLetivoPorIdAsync;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getPeriodos(callback) {
            return factory.TOTVSQuery({}, callback);
        }

        function getDescricaoPeriodoLetivoPorIdAsync(IDPERLET, callback) {
            getPeriodos(function(result) {

                if (result && result.length > 0) {

                    var objPeriodo = $.grep(result, function(e) {
                            return e.IDPERLET === IDPERLET;
                        }),
                        descricaoPeriodoLetivo = '';

                    if (angular.isArray(objPeriodo) && objPeriodo.length > 0) {
                        descricaoPeriodoLetivo = objPeriodo[0].CODPERLET;
                    }

                    if (angular.isFunction(callback)) {
                        callback(descricaoPeriodoLetivo);
                    }
                }
            });
        }
    }
});