/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.16
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['widgets/widget.module',
    'widgets/widget.service',
    'widgets/widget.constants',
    'utils/edu-enums.constants'
], function() {

    'use strict';

    angular
        .module('eduWidgetsModule')
        .controller('eduWidgetsAconteceHojeController', EduWidgetsAconteceHojeController);

    EduWidgetsAconteceHojeController.$inject = [
        '$scope',
        'eduWidgetsService',
        'eduWidgetsConsts',
        '$state',
        '$rootScope',
        'i18nFilter',
        '$timeout',
        'eduEnumsConsts'
    ];

    function EduWidgetsAconteceHojeController(
        $scope,
        objWidgetService,
        objWidgetConst,
        $state,
        $rootScope,
        i18nFilter,
        $timeout,
        eduEnumsConsts) {

        // variáveis
        var self = this;
        self.objWidget = {};
        self.hasValue = false;
        self.dataAtual = new Date();
        self.permissaoPlanoAula = false;

        // metódos
        self.getWidgetDados = getWidgetDados;
        self.goCalendario = goCalendario;
        self.goAulasDoDia = goAulasDoDia;

        // inicializador
        init();

        // public
        function init() {
            getWidgetDados($scope);

            self.permissaoPlanoAula = angular.isDefined($rootScope.objPermissions.EDU_ACADEMICO_CENTRALALUNO_PLANOAULA);
        }

        function getWidgetDados(scope) {
            self.eventosCalendario = [];

            self.objWidget = objWidgetService.getWidgetDataByController(scope);
            if (!self.objWidget) {
                loadWidgetDados(objWidgetConst.EduWidgetsFuncionalidade.Calendario,
                    objWidgetConst.EduWidgets.AconteceHoje.ID);
            } else {
                self.objWidget.DadosWidget.forEach(function(item) {
                    self.eventosCalendario.push(criarEvento(item));
                });
            }

            self.hasValue = self.objWidget.DadosWidget !== null && self.objWidget.DadosWidget.length > 0;

            configurarScheduler();
        }

        function goCalendario() {
            $state.go('calendario.start');
        }

        function goAulasDoDia() {
            var dataAtual = new Date();

            var params = {
                DataAula: dataAtual
            }

            $state.go('plano-aula.iniciar', params);
        }

        // private
        function loadWidgetDados(idFuncionalidade, idWidget) {
            objWidgetService.getWidgetDataByFactory(
                idFuncionalidade,
                idWidget,
                function(objResult) {
                    if (objResult) {
                        self.objWidget = objResult;
                    }
                }
            );
        }

        /**
         * Configura o scheduler
         */
        function configurarScheduler() {

            self.views = [{
                type: 'agenda',
                eventTimeTemplate: getEventTimeTemplate(),
                eventTemplate: getEventTemplate()
            }];

            self.editable = {
                create: false,
                destroy: false,
                move: false,
                resize: false,
                editRecurringMode: 'occurrence'
            };

            // configura jquery para selecionar a linha do que está ocorrendo no momento
            $timeout(function() {
                $('.edu-widget-acontece-hj-cell-agora').parent('div').parent().addClass('edu-widget-acontece-hj-cell-agora');
            }, 0);

        }

        function getEventTimeTemplate() {

            return '# if (isAllDay) { #' +
                '<span class="edu-widget-label-hora-acontece-hj"> ' + i18nFilter('l-dia-todo', [], 'js/widgets') + '</span>' +
                '# } else { #' +
                '# var dataAtual = Date.now(); #' +
                '# if (dataAtual >= start && dataAtual <= end ) { #' +
                '# if (type === ' + eduEnumsConsts.TipoEventoCalendario.EntregaTrab + ' ) { #' +
                '<span class="edu-widget-label-hora-acontece-hj  edu-widget-acontece-hj-cell-agora"> ' + i18nFilter('l-ate', [], 'js/widgets') + ' <br>#= kendo.toString(end, "t") #</span>' +
                '# } else {#' +
                '<span class="edu-widget-label-hora-acontece-hj  edu-widget-acontece-hj-cell-agora">#= kendo.toString(start, "t") #<br>#= kendo.toString(end, "t") #</span>' +
                '# } #' +
                '# } else {#' +
                '# if (type === ' + eduEnumsConsts.TipoEventoCalendario.EntregaTrab + ' ) { #' +
                '<span class="edu-widget-label-hora-acontece-hj"> ' + i18nFilter('l-ate', [], 'js/widgets') + ' <br>#= kendo.toString(end, "t") #</span>' +
                '# } else {#' +
                '<span class="edu-widget-label-hora-acontece-hj">#= kendo.toString(start, "t") #<br>#= kendo.toString(end, "t") #</span>' +
                '# } #' +
                '# } #' +
                '# }  #';

        }

        function getEventTemplate() {
            return '# var dataAtual = Date.now(); #' +
                '# if (dataAtual >= start && dataAtual <= end ) { #' +
                '<span class="edu-widget-acontece-hj-cell-agora"> #: title # </span>' +
                '# } else {#' +
                '<span class="edu-widget-label-acontece-hj"> #: title # </span>' +
                '# } #';
        }

        /**
         * Cria um evento para ser adicionado ao dataSouce do scheduler
         *
         * @param {any} item com os dados do evento
         * @returns
         */
        function criarEvento(item) {

            var evento = {
                id: item.ID + 1, // o evento não pode ter o valor 0
                title: item.Assunto + '. ' + item.Descricao,
                description: item.Descricao,
                start: new Date(item.DataInicio),
                end: new Date(item.DataFim),
                isAllDay: item.DiaInteiro,
                type: parseInt(item.TipoEvento)
            };

            // corrige erro na exibição de eventos que ocorrem no dia todo
            if (evento.isAllDay) {
                evento.end = evento.start;
            }

            return evento;
        }

    }
});