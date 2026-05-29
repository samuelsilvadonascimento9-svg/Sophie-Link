/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduUtilsModule
 * @name eduEnumsConsts
 * @object constants
 *
 * @created 25/11/2016 v12.1.15
 * @updated
 *
 * @description Constantes globais do Educacional (Portal do Aluno).
 */

define(['utils/edu-utils.module'], function() {

    'use strict';

    angular
        .module('eduUtilsModule')
        .constant('eduConstantesGlobaisConsts', {
            EduStateViewPadrao: 'mural.start'
        });
});