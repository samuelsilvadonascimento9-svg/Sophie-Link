/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduWidgetsModule
 * @name eduWidgetsNotaAlunoXTurmaAvaliacao
 * @object controller
 *
 * @created 07/04/2017 v12.1.17
 * @updated 07/04/2017 v12.1.17
 *
 * @requires
 *
 * @dependencies
 *
 * @description
 */
define(['widgets/widget.module',
    'widgets/widget.service',
    'widgets/widget.constants'
], function() {

    'use strict';

    angular
        .module('eduWidgetsModule')
        .controller('EduWidgetsNotaAlunoXTurmaAvaliacaoController', EduWidgetsNotaAlunoXTurmaAvaliacaoController);

    EduWidgetsNotaAlunoXTurmaAvaliacaoController.$inject = [
        '$scope',
        'eduWidgetsService',
        'eduWidgetsConsts',
        'i18nFilter'
    ];

    /**
     * Controller do widget de Notas do Aluno pela Média da Turma por avaliação
     * Gráfico de linha utilizando a diretiva totvs-chart
     * @param {object} $scope           Escopo do controller
     * @param {object} objWidgetService Serviços para widgets
     * @param {object} objWidgetConst   Constantes de definição dos widgets
     * @param {object} i18nFilter       Objeto para tradução dos campos
     */
    function EduWidgetsNotaAlunoXTurmaAvaliacaoController($scope, objWidgetService, objWidgetConst, i18nFilter) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;
        self.objWidget = {}; // Dados do widgets
        self.objDisciplinaList = []; // Disciplinas para o combo
        self.selectedDisciplina = null; // Disciplina selecionada no combo
        self.objEtapaList = []; // Etapa para o combo
        self.selectedEtapa = null; // Etapa selecionada no combo
        self.objAvaliacaoList = []; // Avaliações para o eixo X do gráfico
        self.objNotaList = []; // Notas para as linhas do gráfico
        self.hasNota = false; // Guarda se já possui alguma nota inserida
        self.valueMax = 0; // Valor máximo para o eixo Y do gráfico
        self.isNotaConceitual = false; // Verdadeiro se a disciplina usar nota conceitual
        self.valueAxis = []; // Parâmetros do eixo de valor do gráfico

        // *********************************************************************************
        // *** Public Methods
        // *********************************************************************************
        self.getWidgetDados = getWidgetDados;
        self.setChartData = setChartData;
        self.changeDisciplina = changeDisciplina;
        self.changeEtapa = changeEtapa;
        self.setFnExport = setFnExport;
        self.updateChartData = updateChartData;

        // *********************************************************************************
        // *** Initialize
        // *********************************************************************************
        init();

        /**
         * @private
         * @function Função de inicialização do controller
         * @name init
         */
        function init() {
            self.getWidgetDados($scope);
        }

        // *********************************************************************************
        // *** Public functions
        // *********************************************************************************

        /**
         * @public
         * @function Obtém os dados do widget
         * @name getWidgetDados
         * @param {object} scope Escopo do controller
         */
        function getWidgetDados(scope) {
            self.objWidget = objWidgetService.getWidgetDataByController(scope);

            if (!self.objWidget || !self.objWidget.DadosWidget) {
                loadWidgetDados(objWidgetConst.EduWidgetsFuncionalidade.Notas,
                    objWidgetConst.EduWidgets.NotaAlunoXTurmaAvaliacao.ID);
            } else {
                self.setChartData();
            }
        }

        /**
         * @public
         * @function Realiza a montagem do gráfico
         * @name setChartData
         */
        function setChartData() {
            setDisciplinas();
            setEtapas();
            setAvaliacoes();
            setNotas();
        }

        /**
         * @public
         * @function Atualiza o gráfico
         * @name updateChartData
         */
        function updateChartData() {
            setEtapas();
            setAvaliacoes();
            setNotas();
        }

        /**
         * @public
         * @function Alteração da disciplina na lista
         * @name changeDisciplina
         */
        function changeDisciplina() {
            objWidgetService.getWidgetDataByFactoryWithParams(self.objWidget.IdFuncionalidade,
                objWidgetConst.EduWidgets.NotaAlunoXTurmaAvaliacao.ID, this.selectedDisciplina.id,
                function(objResult) {
                    if (objResult) {
                        self.objWidget = objResult;
                        self.updateChartData();
                    }
                });
        }

        /**
         * @public
         * @function Alteração da etapa na lista
         * @name changeEtapa
         */
        function changeEtapa() {
            setNotas();
        }

        /**
         * @public
         * @function Seta as funções do gráfico para exportar para PDF ou PNG
         * @name setFnExport
         * @param {object} objChart Objeto do gráfico
         */
        function setFnExport(objChart) {
            self.exportToPdf = objChart.pdf;
            self.exportToPng = objChart.png;
        }

        // *********************************************************************************
        // *** Private functions
        // *********************************************************************************

        /**
         * @private
         * @function Carrega os dados de um determinado widget
         * @name loadWidgetDados
         * @param {int} idFuncionalidade Identificador da Funcionalidade
         * @param {int} idWidget         Identificador do Widget
         */
        function loadWidgetDados(idFuncionalidade, idWidget) {
            objWidgetService.getWidgetDataByFactory(idFuncionalidade, idWidget,
                function(objResult) {
                    if (objResult) {
                        self.objWidget = objResult;
                        self.setChartData();
                    }
                });
        }

        /**
         * @private
         * @function Carregam as disciplinas
         * @name setDisciplinas
         */
        function setDisciplinas() {
            var objWidgetDados = self.objWidget.DadosWidget;
            self.objDisciplinaList = [];

            if (angular.isDefined(objWidgetDados) && objWidgetDados !== null && angular.isArray(objWidgetDados.DISCIPLINAS)) {
                angular.forEach(objWidgetDados.DISCIPLINAS, function(rowDisciplina) {

                    var objDisciplina = {
                        label: rowDisciplina.NOME,
                        value: rowDisciplina.CODDISC,
                        id: rowDisciplina.IDTURMADISC
                    };

                    self.objDisciplinaList.push(objDisciplina);
                });

            }

            if (!self.selectedDisciplina && self.objDisciplinaList.length > 0) {
                self.selectedDisciplina = self.objDisciplinaList[0];
            }
        }

        /**
         * @private
         * @function Carregam as etapas
         * @name setEtapas
         */
        function setEtapas() {
            var objWidgetDados = self.objWidget.DadosWidget;
            self.objEtapaList = [];

            if (angular.isDefined(objWidgetDados) && objWidgetDados !== null && angular.isArray(objWidgetDados.ETAPAS)) {
                angular.forEach(objWidgetDados.ETAPAS, function(rowEtapa) {

                    if (self.selectedDisciplina && rowEtapa.IDTURMADISC == self.selectedDisciplina.id) {
                        var objEtapa = {
                            label: rowEtapa.ETAPA,
                            value: rowEtapa.CODETAPA,
                            id: rowEtapa.IDTURMADISC
                        };

                        self.objEtapaList.push(objEtapa);
                    }
                });

            }

            if (self.objEtapaList.length > 0) {
                self.selectedEtapa = self.objEtapaList[0];
            }
        }

        /**
         * @private
         * @function Carregam as avaliações
         * @name setAvaliacoes
         */
        function setAvaliacoes() {
            var objWidgetDados = self.objWidget.DadosWidget;
            self.objAvaliacaoList = [];

            if (angular.isDefined(objWidgetDados) && objWidgetDados !== null && angular.isArray(objWidgetDados.AVALIACOES)) {
                angular.forEach(objWidgetDados.AVALIACOES, function(rowAvaliacao) {
                    self.objAvaliacaoList.push(rowAvaliacao.PROVA);
                });

            }
        }

        /**
         * @private
         * @function Calcula a média das notas de todos os alunos na disciplina selecionada, em todas as etapas.
         * @name getDadosDiscSelecionada
         * @param listaNotasAluno {array} lista de notas das provas do aluno
         */
        function getDadosDiscSelecionada(listaNotasAluno) {
            var NotasAvaliacoes = [];
            var resultadoFinal = [];
            var etapasDiscSelecionada = [];

            etapasDiscSelecionada = $.grep(self.objWidget.DadosWidget.AVALIACOES, function(itemEtapa) {
                return itemEtapa.CODDISC === self.selectedDisciplina.value &&
                    itemEtapa.CODETAPA === self.selectedEtapa.value
            });

            //Retorna dados apenas das etapas da disciplina selecionada;
            angular.forEach(etapasDiscSelecionada, function(itemAvaliacao) {

                var adicionaDisciplina = false;

                for (var i = 0; i < listaNotasAluno.length; i++) {
                    var notaAluno = listaNotasAluno[i];
                    // Adiciona apenas as disciplinas do aluno (trata o caso de mudança de turma/turno)
                    if (notaAluno.CODPROVA === itemAvaliacao.CODPROVA &&
                        notaAluno.PROVA === itemAvaliacao.PROVA) {
                        adicionaDisciplina = true;
                    }
                }

                if (adicionaDisciplina) {

                    NotasAvaliacoes = $.grep(self.objWidget.DadosWidget.NOTAS, function(objNotaAvaliacao) {
                        return objNotaAvaliacao.CODDISC === self.selectedDisciplina.value &&
                            objNotaAvaliacao.CODETAPA === self.selectedEtapa.value &&
                            objNotaAvaliacao.CODPROVA === itemAvaliacao.CODPROVA;
                    });

                    if (NotasAvaliacoes.length > 0) {

                        var notaTurmaItem = {
                            IDTURMADISC: NotasAvaliacoes[0].IDTURMADISC,
                            CODDISC: self.selectedDisciplina,
                            CODPROVA: itemAvaliacao.CODPROVA,
                            CODETAPA: self.selectedEtapa.value,
                            ETAPA: self.selectedEtapa.label,
                            PROVA: itemAvaliacao.PROVA,
                            NOTA: null,
                            NOTACONCEITUAL: NotasAvaliacoes[0].NOTACONCEITUAL
                        };

                        var notasSomadas = 0;
                        for (var i = 0, _len = NotasAvaliacoes.length; i < _len; i++) {
                            notasSomadas += NotasAvaliacoes[i]["NOTA"];
                        }

                        notaTurmaItem.NOTA = parseFloat(notasSomadas / NotasAvaliacoes.length).toFixed(2);
                        resultadoFinal.push(notaTurmaItem);
                    };
                }
            });

            return resultadoFinal;
        }

        /**
         * @private
         * @function Carregam as notas
         * @name setNotas
         */
        function setNotas() {
            self.hasNota = false;
            self.valueMax = 0;

            // Verifica se tem alguma nota lançada para uma etapa e disciplina
            if (angular.isArray(self.objDisciplinaList) && self.objDisciplinaList.length > 0 &&
                angular.isArray(self.objEtapaList) && self.objEtapaList.length > 0 &&
                angular.isArray(self.objAvaliacaoList) && self.objAvaliacaoList.length > 0) {

                var objWidgetDados = self.objWidget.DadosWidget;
                self.objNotaList = [];
                var objNotaServiceList = [];

                // Notas do aluno
                if (angular.isDefined(objWidgetDados) && objWidgetDados !== null && angular.isArray(objWidgetDados.NOTAS)) {
                    // Obtém as notas da disciplina selecionada
                    objNotaServiceList = $.grep(objWidgetDados.NOTAS, function(objNota) {
                        return (
                            objNota.CODDISC === self.selectedDisciplina.value &&
                            objNota.CODETAPA === self.selectedEtapa.value &&
                            objNota.RA === objWidgetDados.ALUNO[0] &&
                            objNota.CODPROVA !== null
                        );
                    });

                    if (objNotaServiceList.length > 0 && !verificaNotaConceitual(objNotaServiceList)) { // Se não for nota conceitual
                        self.objNotaList.push(setChartObject(objNotaServiceList,
                            i18nFilter('l-aluno', [], 'js/widgets'),
                            '#a0a700'));

                        self.hasNota = true;
                    }
                }

                var objNotasTurma = getDadosDiscSelecionada(objNotaServiceList);

                // Média das notas de avaliações da turma
                if (angular.isDefined(objNotasTurma) && objNotasTurma !== null && angular.isArray(objNotasTurma)) {

                    if (objNotasTurma.length > 0 && !verificaNotaConceitual(objNotasTurma)) { // Se não for nota conceitual
                        self.objNotaList.push(setChartObject(objNotasTurma,
                            i18nFilter('l-media-turma', [], 'js/widgets'),
                            '#ff6800'));

                        self.hasNota = true;
                    }
                }

            }
        }

        /**
         * @private
         * @function Verifica se a nota para a disciplina é conceitual
         * @name verificaNotaConceitual
         * @param   {Array}   objNotasList Lista com as notas para a disciplina corrente
         * @returns {boolean} Verdadeiro se as notas forem conceituais
         */
        function verificaNotaConceitual(objNotaList) {
            if (angular.isArray(objNotaList) && objNotaList.length > 0) {
                if (angular.isDefined(objNotaList[0].NOTACONCEITUAL) && objNotaList[0].NOTACONCEITUAL !== null && objNotaList[0].NOTACONCEITUAL.length > 0) {
                    self.isNotaConceitual = true;
                    return true;
                }
            } else {
                return false;
            }
        }

        /**
         * @private
         * @function Monta o objeto para o totvs-chart
         * @name setChartObject
         * @param   {Array}  objNotaList  Lista das notas
         * @param   {string} strLinhaNome Nome relativo a linha no gráfico
         * @param   {string} strCor       Hexadecimal da cor da linha no gráfico
         * @returns {object} Objeto do gráfico para o totvs-chart
         */
        function setChartObject(objNotaList, strLinhaNome, strCor) {
            var objChart = {};

            if (angular.isArray(objNotaList) && objNotaList.length > 0) {
                objChart = {
                    name: strLinhaNome,
                    color: strCor,
                    categoryField: 'avaliacao',
                    data: []
                };

                angular.forEach(objNotaList, function(objNota) {

                    var objData = {
                        avaliacao: objNota.PROVA,
                        value: (objNota.NOTA != null) ? objNota.NOTA : 0
                    };

                    // Valor máximo para o eixo Y do gráfico
                    if (objNota.VALOR && objNota.VALOR > self.valueMax) {
                        self.valueMax = objNota.VALOR;
                    } else if (objNota.NOTA) {
                        let nota = Number(objNota.NOTA);
                        if (nota != NaN && nota > self.valueMax) {
                            self.valueMax = nota;
                        }
                    }

                    objChart.data.push(objData);
                });

                self.valueAxis = {
                    min: 0,
                    max: self.valueMax + (self.valueMax * 0.2),
                    line: {
                        visible: true
                    },
                    labels: {
                        visible: true
                    },
                    minorGridLines: {
                        visible: true,
                        step: 1
                    },
                    majorGridLines: {
                        visible: true
                    }
                };

                // Valor da nota acima da coluna do gráfico
                objChart.labels = {
                    visible: true,
                    template: '#:value#'
                };
            }

            return objChart;
        }
    }
});