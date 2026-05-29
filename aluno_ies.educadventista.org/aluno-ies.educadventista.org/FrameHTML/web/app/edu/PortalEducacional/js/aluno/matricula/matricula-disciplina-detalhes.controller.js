define(['aluno/matricula/matricula-disciplina.module',
    'utils/edu-utils.factory'
], function() {

    'use strict';

    angular
        .module('eduMatriculaDisciplinaModule')
        .controller('MatriculaDisciplinaDetalhesController', MatriculaDisciplinaDetalhesController);

    MatriculaDisciplinaDetalhesController.$inject = [
        '$filter',
        'MatriculaDisciplinaDetalhesFactory',
        'TotvsDesktopContextoCursoFactory',
        'eduUtilsFactory',
        'eduEnumsConsts',
        'parametros',
        '$state',
        '$modalInstance'
    ];

    function MatriculaDisciplinaDetalhesController($filter,
        MatriculaDisciplinaDetalhesFactory,
        TotvsDesktopContextoCursoFactory,
        objUtilsFactory,
        eduEnumsConsts,
        parametros,
        $state,
        $modalInstance) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************

        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************

        self.disciplina = {};
        self.exibirInfoHorario = false;
        self.horario = {};
        self.modalInstance = $modalInstance;
        self.periodoHorarioModular = periodoHorarioModular;
        self.tipoDisciplina = tipoDisciplina;
        self.onclickMaisInfoDisciplina = onclickMaisInfoDisciplina;
        self.apresentacao = undefined;
        self.numeroCasasDecimaisCargaHoraria = 0;
        self.loadNumeroCasasDecimais = loadNumeroCasasDecimais;
        init();

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************

        function init() {
            self.idTurmaDisc = parametros.idTurmaDisc;
            exibeDisciplinaInfo(parametros);
            loadNumeroCasasDecimais();
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Busca informações da Turma/Disciplina
         *
         * @param {any} parametros - Informações da turma/disciplina e horário.
         */
        function exibeDisciplinaInfo(parametros) {

            MatriculaDisciplinaDetalhesFactory.retornarDetalhesMatriculaDisciplina(parametros, function(result) {
                self.disciplina = result;

                if (result && result.DisciplinaInfo[0].APRESENTACAO) {
                    self.apresentacao = result.DisciplinaInfo[0].APRESENTACAO;
                }

                if (parametros['idHorarioTurma']) {
                    self.exibirInfoHorario = true;
                    preencherInfoHorario(parametros.idHorarioTurma);
                }

                if (result.ProfessorTurmaDiscInfo && result.ProfessorTurmaDiscInfo.length > 0) {
                    self.disciplina.ProfessorTurmaDiscInfo = result.ProfessorTurmaDiscInfo.filter(function(elem, index, self) {
                        //alternativa ao findIndex, pois o IE não o aceita
                        var indice = null;
                        for (var i = 0; i < self.length; i++) {
                            if (elem.CODPROF === self[i].CODPROF) {
                                indice = i;
                                break;
                            }
                        }
                        return index === indice;
                    });
                }
            });
        }

        /**
         * Preenche informações sobre o horário.
         *
         * @param {any} idHorarioTurma - Id. do horário na turma/disciplina.
         */
        function preencherInfoHorario(idHorarioTurma) {
            var _horario = self.disciplina['HorariosTurmaDiscInfo'].filter(function(horario) {
                return horario.IDHORARIOTURMA === idHorarioTurma;
            });
            if (_horario) {
                tratarVariosProfessoresNoHorario(_horario);
                self.horario = _horario[0];
            }
        }

        /**
         * Remove duplicidade de professores.
         *
         * @param {any} horarios - Horários da turma/disciplina.
         */
        function tratarVariosProfessoresNoHorario(horarios) {
            var professores = [];

            //Validação pois os horários podem ser duplicados,
            //quando tiver mais de um professor informado no horário.
            horarios.forEach(function(horario) {
                if (horario.PROFESSOR) {
                    professores.push(horario.PROFESSOR);
                }
            });
            horarios[0].PROFESSOR = professores;
        }

        /**
         * Período do horário modular.
         *
         * @param {any} horario - Horário modular.
         * @returns - String com o período do horário modular.
         */
        function periodoHorarioModular(horario) {
            var periodoModular = '';
            if (horario && horario['DATAINICIAL']) {
                periodoModular = $filter('date')(horario.DATAINICIAL, 'dd/MM/yyyy') +
                    ' - ' +
                    $filter('date')(horario.DATAFINAL, 'dd/MM/yyyy');
            }

            return periodoModular;
        }

        /**
         * Tipo da turma/disciplina.
         *
         * @param {any} disciplina - Dados da turma/disciplina.
         * @returns - String com informação do tipo da disciplina e seu tipo de referência na grade do aluno.
         */
        function tipoDisciplina(disciplina) {
            var modalidade = '';

            if (disciplina && disciplina.TIPOTURMA) {
                modalidade = disciplina.TIPOTURMA;

                if (disciplina.TIPOGRADE) {
                    modalidade += ' (' + disciplina.TIPOGRADE + ')';
                }
            }
            return modalidade;
        }

        /**
         * Redireciona para a página da turma/disciplina
         *
         */
        function onclickMaisInfoDisciplina() {

            var params = {
                idTurmaDisc: self.idTurmaDisc,
                codDisc: self.disciplina.DisciplinaInfo[0].CODDISC
            };

            $state.go('disciplina.start', params);

            $modalInstance.dismiss();

        }

        /**
         * Carrega o número de casas decimais
         */
        function loadNumeroCasasDecimais() {
            objUtilsFactory.getParametrosTOTVSEducacionalAsync(function(params) {
                self.numeroCasasDecimaisCargaHoraria = params.NumCasasDecimaisCH;
            });
        }
    }
});