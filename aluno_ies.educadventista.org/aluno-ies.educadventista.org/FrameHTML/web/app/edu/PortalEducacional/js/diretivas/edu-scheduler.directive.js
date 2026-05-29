/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.16
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduSchedulerDirective
 * @object directive
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies $totvsresource, $compile
 *
 * @description Diretiva eduSchedulerDirective
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduScheduler', eduSchedulerDirective);

    eduSchedulerDirective.$inject = ['$parse', '$q', '$log', 'i18nFilter'];

    function eduSchedulerDirective($parse, $q, $log, i18nFilter) {

        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                scheduler: '=',
                schedulerOptions: '=',
                schedulerData: '=',
                schema: '=',
                filter: '=',
                date: '=',
                startTime: '=',
                endTime: '=',
                allDaySlot: '=',
                currentTimeMarker: '=',
                timezone: '=',
                height: '=',
                width: '=',
                views: '=',
                editable: '=',
                add: '=',
                change: '=',
                edit: '=',
                save: '=',
                remove: '=',
                cancel: '=',
                dataBinding: '=',
                dataBound: '=',
                eventTemplate: '=',
                allDayEventTemplate: '=',
                resources: '=',
                culture: '=',
                onCreated: '=',
                autoBind: '=',
                mobile: '='
            },
            template: '<div kendo-scheduler="scheduler" k-options="options" class="scheduler-class"></div>',
            link: link
        };

        return directive;

        function link(scope) {

            if (scope && scope.schedulerOptions && angular.isFunction(scope.schedulerOptions)) {

                var opts = scope.schedulerOptions();

                $q.when(opts).then(function(data) {
                    scope.options = data;

                }, function(error) {

                    $log.error('An error occurred while retrieving "schedulerOptions" property. Detail: ' + error);
                    delete scope.schedulerOptions;
                });

            } else if (scope && scope.schedulerOptions) {
                scope.options = scope.schedulerOptions;
                configI18nScheduler(scope.options, scope, i18nFilter);
            } else if (scope && scope.schedulerData && angular.isFunction(scope.schedulerData)) {

                var promisse = scope.schedulerData();
                $q.when(promisse).then(function(data) {

                    scope.schedulerData = data;
                    configKendoOptionsProperties(scope);
                }, function(error) {

                    $log.error('An error occurred while retrieving "schedulerData" property. Detail: ' + error);
                    delete scope.schedulerData;
                });
            } else if (scope && scope.schedulerData) {
                configKendoOptionsProperties(scope);
            } else {
                $log.error('An error occurred while retrieving "schedulerData" property.');
            }

            scope.$on('kendoWidgetCreated', function(event, widget) {

                if (scope.onCreated && scope.scheduler === widget) {
                    scope.onCreated(scope.scheduler);
                }

            });
        }

        function configKendoOptionsProperties(scope) {

            var kOptions = {};

            configI18nScheduler(kOptions, scope, i18nFilter);

            //Propriedades que necessitam de um tratamento especial antes de ser adicionada a configuração
            var specialProperties = ['schedulerData', 'schedulerOptions', 'constructor', 'filter', 'schema'];

            //Adiciona todas as propriedades do escopo no objeto para configuração do Kendo Scheduler (Propriedade kendoOptions)
            for (var propertyName in scope) {
                //Serão ignoradas as propriedades que necessitam de tratamento específico
                if (propertyName.indexOf('$') === -1 && specialProperties.indexOf(propertyName) === -1) {
                    if (typeof scope[propertyName] !== 'undefined') {
                        kOptions[propertyName] = scope[propertyName];
                    }
                }
            }

            kOptions.dataSource = new kendo.data.SchedulerDataSource({
                data: scope.schedulerData
            });
            kOptions.timezone = 'Etc/UTC';

            //Filtros
            if (scope.filter) {
                kOptions.dataSource.filter(scope.filter);
            }

            //Schema
            if (scope.schema) {
                kOptions.dataSource.schema(scope.schema);
            }

            //Template Views Scheduler - é definido um data format para headertemplate das views do componente
            if (kOptions.views && angular.isArray) {
                configDateFormatHeaderTemplate(kOptions);
            }

            scope.options = kOptions;
        }

        function configDateFormatHeaderTemplate(kOptions) {

            if (kOptions.views && angular.isArray) {
                for (var i = 0; i < kOptions.views.length; i++) {

                    if (angular.isObject(kOptions.views[i])) {

                        if (kOptions.views[i].type !== 'month' && kOptions.views[i].type !== 'agenda') {

                            if (!kOptions.views[i].hasOwnProperty('dateHeaderTemplate')) {
                                kOptions.views[i].dateHeaderTemplate = '<span class="k-link k-nav-day">#=kendo.toString(date, "ddd dd/M")#</span>';
                            }
                        }
                    } else if (angular.isString(kOptions.views[i])) {

                        if (kOptions.views[i] !== 'month' && kOptions.views[i] !== 'agenda') {
                            kOptions.views[i] = {
                                type: kOptions.views[i]
                            };
                            kOptions.views[i].dateHeaderTemplate = '<span class="k-link k-nav-day">#=kendo.toString(date, "ddd dd/M")#</span>';
                        }
                    }
                }
            }
        }

        function configI18nScheduler(kOptions, scope, i18nFilter) {
            /* jshint maxstatements: false */
            if (scope && scope.culture) {
                var attr = scope.culture.toLowerCase();
                attr = (attr === 'pt') ? attr + '-BR' : attr;
                kendo.culture(attr);
            } else {
                kendo.culture('pt-BR');
            }

            kOptions.messages = {};
            kOptions.messages.today = i18nFilter('l-scheduler-messages.today', [], 'js/diretivas');
            kOptions.messages.save = i18nFilter('l-scheduler-messages.save', [], 'js/diretivas');
            kOptions.messages.cancel = i18nFilter('l-scheduler-messages.cancel', [], 'js/diretivas');
            kOptions.messages.destroy = i18nFilter('l-scheduler-messages.destroy', [], 'js/diretivas');
            kOptions.messages.event = i18nFilter('l-scheduler-messages.event', [], 'js/diretivas');
            kOptions.messages.date = i18nFilter('l-scheduler-messages.date', [], 'js/diretivas');
            kOptions.messages.time = i18nFilter('l-scheduler-messages.time', [], 'js/diretivas');
            kOptions.messages.allDay = i18nFilter('l-scheduler-messages.allDay', [], 'js/diretivas');
            kOptions.messages.showFullDay = i18nFilter('l-scheduler-messages.showFullDay', [], 'js/diretivas');
            kOptions.messages.showWorkDay = i18nFilter('l-scheduler-messages.showWorkDay', [], 'js/diretivas');
            kOptions.messages.defaultRowText = i18nFilter('l-scheduler-messages.defaultRowText', [], 'js/diretivas');
            kOptions.messages.deleteWindowTitle = i18nFilter('l-scheduler-messages.deleteWindowTitle', [], 'js/diretivas');
            kOptions.messages.ariaEventLabel = i18nFilter('l-scheduler-messages.ariaEventLabel', [], 'js/diretivas');
            kOptions.messages.ariaSlotLabel = i18nFilter('l-scheduler-messages.ariaSlotLabel', [], 'js/diretivas');
            kOptions.messages.views = {};
            kOptions.messages.views.day = i18nFilter('l-scheduler-messages.views.day', [], 'js/diretivas');
            kOptions.messages.views.week = i18nFilter('l-scheduler-messages.views.week', [], 'js/diretivas');
            kOptions.messages.views.month = i18nFilter('l-scheduler-messages.views.month', [], 'js/diretivas');
            kOptions.messages.views.timeline = i18nFilter('l-scheduler-messages.views.timeline', [], 'js/diretivas');
            kOptions.messages.views.workWeek = i18nFilter('l-scheduler-messages.views.workWeek', [], 'js/diretivas');
            kOptions.messages.editable = {};
            kOptions.messages.editable.confirmation = i18nFilter('l-scheduler-messages.editable.confirmation', [], 'js/diretivas');
            kOptions.messages.editor = {};
            kOptions.messages.editor.allDayEvent = i18nFilter('l-scheduler-messages.editor.allDayEvent', [], 'js/diretivas');
            kOptions.messages.editor.description = i18nFilter('l-scheduler-messages.editor.description', [], 'js/diretivas');
            kOptions.messages.editor.editorTitle = i18nFilter('l-scheduler-messages.editor.editorTitle', [], 'js/diretivas');
            kOptions.messages.editor.end = i18nFilter('l-scheduler-messages.editor.end', [], 'js/diretivas');
            kOptions.messages.editor.endTimezone = i18nFilter('l-scheduler-messages.editor.endTimezone', [], 'js/diretivas');
            kOptions.messages.editor.repeat = i18nFilter('l-scheduler-messages.editor.repeat', [], 'js/diretivas');
            kOptions.messages.editor.separateTimezones = i18nFilter('l-scheduler-messages.editor.separateTimezones', [], 'js/diretivas');
            kOptions.messages.editor.start = i18nFilter('l-scheduler-messages.editor.start', [], 'js/diretivas');
            kOptions.messages.editor.startTimezone = i18nFilter('l-scheduler-messages.editor.startTimezone', [], 'js/diretivas');
            kOptions.messages.editor.timezone = i18nFilter('l-scheduler-messages.editor.timezone', [], 'js/diretivas');
            kOptions.messages.editor.timezoneEditorButton = i18nFilter('l-scheduler-messages.editor.timezoneEditorButton', [], 'js/diretivas');
            kOptions.messages.editor.timezoneEditorTitle = i18nFilter('l-scheduler-messages.editor.timezoneEditorTitle', [], 'js/diretivas');
            kOptions.messages.editor.title = i18nFilter('l-scheduler-messages.editor.title', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor = {};
            kOptions.messages.recurrenceEditor.daily = {};
            kOptions.messages.recurrenceEditor.daily.interval = i18nFilter('l-scheduler-messages.recurrenceEditor.daily.interval', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.daily.repeatEvery = i18nFilter('l-scheduler-messages.recurrenceEditor.daily.repeatEvery', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.end = {};
            kOptions.messages.recurrenceEditor.end.after = i18nFilter('l-scheduler-messages.recurrenceEditor.end.after', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.end.occurrence = i18nFilter('l-scheduler-messages.recurrenceEditor.end.occurrence', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.end.label = i18nFilter('l-scheduler-messages.recurrenceEditor.end.label', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.end.never = i18nFilter('l-scheduler-messages.recurrenceEditor.end.never', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.end.mobileLabel = i18nFilter('l-scheduler-messages.recurrenceEditor.end.mobileLabel', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.end.on = i18nFilter('l-scheduler-messages.recurrenceEditor.end.on', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.frequencies = {};
            kOptions.messages.recurrenceEditor.frequencies.daily = i18nFilter('l-scheduler-messages.recurrenceEditor.frequencies.daily', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.frequencies.monthly = i18nFilter('l-scheduler-messages.recurrenceEditor.frequencies.monthly', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.frequencies.never = i18nFilter('l-scheduler-messages.recurrenceEditor.frequencies.never', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.frequencies.weekly = i18nFilter('l-scheduler-messages.recurrenceEditor.frequencies.weekly', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.frequencies.yearly = i18nFilter('l-scheduler-messages.recurrenceEditor.frequencies.yearly', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.monthly = {};
            kOptions.messages.recurrenceEditor.monthly.day = i18nFilter('l-scheduler-messages.recurrenceEditor.monthly.day', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.monthly.interval = i18nFilter('l-scheduler-messages.recurrenceEditor.monthly.interval', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.monthly.repeatEvery = i18nFilter('l-scheduler-messages.recurrenceEditor.monthly.repeatEvery', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.monthly.repeatOn = i18nFilter('l-scheduler-messages.recurrenceEditor.monthly.repeatOn', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.offsetPositions = {};
            kOptions.messages.recurrenceEditor.offsetPositions.first = i18nFilter('l-scheduler-messages.recurrenceEditor.offsetPositions.first', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.offsetPositions.second = i18nFilter('l-scheduler-messages.recurrenceEditor.offsetPositions.second', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.offsetPositions.third = i18nFilter('l-scheduler-messages.recurrenceEditor.offsetPositions.third', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.offsetPositions.fourth = i18nFilter('l-scheduler-messages.recurrenceEditor.offsetPositions.fourth', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.offsetPositions.last = i18nFilter('l-scheduler-messages.recurrenceEditor.offsetPositions.last', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.weekly = {};
            kOptions.messages.recurrenceEditor.weekly.interval = i18nFilter('l-scheduler-messages.recurrenceEditor.weekly.interval', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.weekly.repeatEvery = i18nFilter('l-scheduler-messages.recurrenceEditor.weekly.repeatEvery', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.weekly.repeatOn = i18nFilter('l-scheduler-messages.recurrenceEditor.weekly.repeatOn', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.weekdays = {};
            kOptions.messages.recurrenceEditor.weekdays.day = i18nFilter('l-scheduler-messages.recurrenceEditor.weekdays.day', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.weekdays.weekday = i18nFilter('l-scheduler-messages.recurrenceEditor.weekdays.weekday', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.weekdays.weekend = i18nFilter('l-scheduler-messages.recurrenceEditor.weekdays.weekend', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.yearly = {};
            kOptions.messages.recurrenceEditor.yearly.of = i18nFilter('l-scheduler-messages.recurrenceEditor.yearly.of', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.yearly.repeatEvery = i18nFilter('l-scheduler-messages.recurrenceEditor.yearly.repeatEvery', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.yearly.repeatOn = i18nFilter('l-scheduler-messages.recurrenceEditor.yearly.repeatOn', [], 'js/diretivas');
            kOptions.messages.recurrenceEditor.yearly.interval = i18nFilter('l-scheduler-messages.recurrenceEditor.yearly.interval', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages = {};
            kOptions.messages.recurrenceMessages.deleteRecurring = i18nFilter('l-scheduler-messages.recurrenceMessages.deleteRecurring', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.deleteWindowOccurrence = i18nFilter('l-scheduler-messages.recurrenceMessages.deleteWindowOccurrence', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.deleteWindowSeries = i18nFilter('l-scheduler-messages.recurrenceMessages.deleteWindowSeries', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.deleteWindowTitle = i18nFilter('l-scheduler-messages.recurrenceMessages.deleteWindowTitle', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.editRecurring = i18nFilter('l-scheduler-messages.recurrenceMessages.editRecurring', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.editWindowOccurrence = i18nFilter('l-scheduler-messages.recurrenceMessages.editWindowOccurrence', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.editWindowSeries = i18nFilter('l-scheduler-messages.recurrenceMessages.editWindowSeries', [], 'js/diretivas');
            kOptions.messages.recurrenceMessages.editWindowTitle = i18nFilter('l-scheduler-messages.recurrenceMessages.editWindowTitle', [], 'js/diretivas');
        }
    }
});