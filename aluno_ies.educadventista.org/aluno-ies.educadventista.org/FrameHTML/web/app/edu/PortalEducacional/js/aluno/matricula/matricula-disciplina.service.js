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
        .service('MatriculaDisciplinaService', MatriculaDisciplinaService);

    MatriculaDisciplinaService.$inject = ['$modal'];

    function MatriculaDisciplinaService($modal) {

        this.exibirDetalhesMatriculaDisciplina = function(codColigada, idTurmaDisc, ra) {

            var params = {
                codColigada: codColigada,
                idTurmaDisc: idTurmaDisc,
                ra: ra
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/matricula/matricula-disciplina-detalhes.view.html',
                controller: 'MatriculaDisciplinaDetalhesController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });
        };

        this.exibirDetalhesMatriculaDisciplinaComHorario = function(idTurmaDisc, idHorarioTurma) {

            var params = {
                idTurmaDisc: idTurmaDisc,
                idHorarioTurma: idHorarioTurma
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/matricula/matricula-disciplina-detalhes.view.html',
                controller: 'MatriculaDisciplinaDetalhesController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });
        };
    }
});