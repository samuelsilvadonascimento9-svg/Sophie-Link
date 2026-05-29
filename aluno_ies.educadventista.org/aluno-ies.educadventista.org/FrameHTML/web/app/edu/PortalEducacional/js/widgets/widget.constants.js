/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduWidgetsModule
 * @name eduWidgetsConsts
 * @object constants
 *
 * @created 15/02/2017 v12.1.16
 * @updated
 *
 * @description Constantes para as Funcionalidade e Widgets.
 */

define(['widgets/widget.module'], function() {

    'use strict';

    angular
        .module('eduWidgetsModule')
        .constant('eduWidgetsConsts', {
            EduWidgetsFuncionalidade: {
                Mural: 0,
                Disciplinas: 1,
                Notas: 2,
                Calendario: 3,
                GradeCurricular: 4,
                QuadroHorarios: 5,
                Faltas: 6,
                Ocorrencias: 7,
                Historico: 8,
                Requerimentos: 9,
                AtividadesCurriculares: 10,
                Arquivos: 11,
                Financeiro: 12,
                AvaliacaoInstitucional: 13,
                NotaFaltaUnificada: 14,
                Desempenho: 15,
                DocumentosPendentes: 16
            },
            EduWidgets: {
                DisciplinaEmCurso: {
                    ID: 1,
                    VIEW: 'js/widgets/disciplinas/em-curso.view.html',
                    CONTROLLER: 'js/widgets/disciplinas/em-curso.controller.js'
                },
                NotaAlunoXTurma: {
                    ID: 2,
                    VIEW: 'js/widgets/notas/nota-aluno-x-turma.view.html',
                    CONTROLLER: 'js/widgets/notas/nota-aluno-x-turma.controller.js'
                },
                NotaAlunoXTurmaAvaliacao: {
                    ID: 3,
                    VIEW: 'js/widgets/notas/nota-aluno-x-turma-avaliacao.view.html',
                    CONTROLLER: 'js/widgets/notas/nota-aluno-x-turma-avaliacao.controller.js'
                },
                AconteceHoje: {
                    ID: 4,
                    VIEW: 'js/widgets/calendario/acontece-hoje.view.html',
                    CONTROLLER: 'js/widgets/calendario/acontece-hoje.controller.js'
                },
                ProximoVencimento: {
                    ID: 5,
                    VIEW: 'js/widgets/financeiro/prox-vencimento.view.html',
                    CONTROLLER: 'js/widgets/financeiro/prox-vencimento.controller.js'
                },
                FrequenciaLimiteFaltas: {
                    ID: 6,
                    VIEW: 'js/widgets/faltas/frequencia.view.html',
                    CONTROLLER: 'js/widgets/faltas/frequencia.controller.js'
                },
                DocumentosPendentes: {
                    ID: 7,
                    VIEW: 'js/widgets/documentos/documentos-pendentes.view.html',
                    CONTROLLER: 'js/widgets/documentos/documentos-pendentes.controller.js'
                }
            }
        });
});