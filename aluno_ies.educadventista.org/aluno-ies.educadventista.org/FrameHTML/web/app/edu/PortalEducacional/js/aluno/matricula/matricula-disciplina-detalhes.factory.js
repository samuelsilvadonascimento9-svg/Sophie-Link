/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduQuadroHorarioModule
 * @name QuadroHorarioFactory
 * @object factory
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @requires eduMatriculaDisciplinaDetalhes
 *
 * @description Factory utilizada nos detalhes da matrícula do aluno na turma/disciplina.
 */

define(['aluno/matricula/matricula-disciplina.module'], function() {

    'use strict';

    angular
        .module('eduMatriculaDisciplinaModule')
        .factory('MatriculaDisciplinaDetalhesFactory', MatriculaDisciplinaDetalhesFactory);

    MatriculaDisciplinaDetalhesFactory.$inject = ['$totvsresource'];

    function MatriculaDisciplinaDetalhesFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});
        factory.retornarDetalhesMatriculaDisciplina = retornarDetalhesMatriculaDisciplina;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function retornarDetalhesMatriculaDisciplina(parameters, callback) {
            let method = 'MatriculaDisciplinaPorHabilitacaoFilialTurmaDisc';

            if (parameters.hasOwnProperty('idHorarioTurma'))
                method = 'v1/MatriculaDisciplinaPorHabilitacaoFilialTurmaDisc';

            parameters.method = method;
            factory.TOTVSGet(parameters, callback);
        }
    }
});