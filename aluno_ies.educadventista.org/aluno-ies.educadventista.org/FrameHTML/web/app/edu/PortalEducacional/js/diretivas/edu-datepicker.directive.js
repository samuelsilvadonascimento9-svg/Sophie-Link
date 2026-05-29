define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular
        .module('eduDiretivasModule')
        .directive('eduDatepicker', EduDatepicker);

    EduDatepicker.$inject = ['$rootScope', '$compile', 'totvsFieldService', 'totvs.utils.Service', '$timeout', 'TotvsDatepicker', 'totvsUtilsDirectiveService'];

    function EduDatepicker($rootScope, $compile, totvsField, totvsUtils, $timeout, TotvsDatepickerProvider, directiveService) {

        let directive = {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                depth: '@',
                format: '@',
                ngBlur: '&',
                ngChange: '&',
                ngModel: '=',
                ngDisabled: '&',
                ngRequired: '@',
                placeholder: '@',
                outputFormat: '@',
                tMin: '=',
                tMax: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attrs, ngModelCtrl) {
            let childScope,
                datePickerElement,
                isMobile,
                removeAttrs = directiveService.scopeToArray(scope).concat(['label', 'canclean']);

            isMobile = totvsUtils.isMobile;

            // Cria o elemento para dispositivo mobile.
            if (isMobile.any()) {
                // Cria o componente mobile
                buildMobileComponent();
            } else {
                // Cria o componente desktop
                buildComponent();
            }

            /* Functions */
            function buildMobileComponent() {
                let callbackfn;

                datePickerElement = getMobileElement();
                totvsField.addElementInTotvsField(datePickerElement, element);

                totvsField.pattern(scope, attrs, element, scope, ngModelCtrl, datePickerElement);

                callbackfn = function() {
                    let value;

                    switch (attrs.canclean) {
                        case 'undefined':
                            value = undefined;
                            break;
                        case '':
                        case 'null':
                            value = null;
                            break;
                        default:
                            value = attrs.canclean;
                            break;
                    }

                    ngModelCtrl.$setViewValue(value);
                    ngModelCtrl.$render();

                    getDateMobile().value(null);
                };

                totvsField.canclean(attrs, element, scope, datePickerElement, callbackfn);

                directiveService.removeAttributesFromElement(element, attrs, removeAttrs);

                totvsField.compile(scope, element);
                totvsField.watchHasError(scope, datePickerElement, ngModelCtrl);

                function getDateMobile() {
                    return {
                        value: function(value) {
                            element.find('input').val(value);
                        },
                        getValue: function() {
                            return element.find('input').val();
                        }
                    };
                }

                function formatDate(value) {
                    let day,
                        month,
                        year,
                        date;

                    date = angular.copy(value);

                    if (date) {
                        if (!angular.isDate(date)) {
                            date = new Date(date);
                        }

                        day = date.getDate();
                        month = date.getMonth() + 1;
                        year = date.getFullYear();

                        day = (day > 9) ? day : ('0' + day);
                        month = (month > 9) ? month : ('0' + month);

                        return year + '-' + month + '-' + day;
                    }

                    return date;
                }

                function convertDateToUTC(date) {
                    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(),
                        date.getUTCMinutes(), date.getUTCSeconds());
                }

                function changeMobileValue(value) {

                    return getDateMobile().value(formatDate(value));
                }

                element.find('input').bind('blur', function() {
                    let inputValue,
                        date,
                        outputDate,
                        formatToday;

                    inputValue = getDateMobile().getValue();
                    date = convertDateToUTC(new Date(inputValue));
                    formatToday = formatDate(new Date());
                    outputDate = getOutputFormat(date);

                    if (formatDate(date) === formatToday) {
                        return setModelValue(getOutputFormat(new Date()));
                    }

                    if (ngModelCtrl.$modelValue !== outputDate) {
                        return setModelValue(outputDate);
                    }
                });

                ngModelCtrl.$formatters.push(function(value) {
                    changeMobileValue(value);
                    return value;
                });

                function setModelValue(date) {
                    ngModelCtrl.$setViewValue(date);
                }

                function getMobileElement() {
                    let element = angular.element('<input type="date" class="form-control" ' +
                        'placeholder="{{::placeholder}} ng-disabled="ngDisabled()" ng-required="{{::ngRequired}}">');

                    if (attrs.$attr.focus) {
                        element.attr('autofocus', 'true');
                    }
                    if (attrs.tMin) {
                        element.attr('min', formatDate(scope.tMin));
                    }
                    if (attrs.tMax) {
                        element.attr('max', formatDate(scope.tMax));
                    }

                    return element;
                }
            }

            function buildComponent() {
                let callbackfn,
                    dataDatePicker;

                /* Begin component desktop */
                datePickerElement = getDesktopElement();
                totvsField.addElementInTotvsField(datePickerElement, element).addClass('date');

                childScope = scope.$new();

                callbackfn = function() {
                    let value;

                    switch (attrs.canclean) {
                        case 'undefined':
                            value = undefined;
                            break;
                        case '':
                        case 'null':
                            value = null;
                            break;
                        default:
                            value = attrs.canclean;
                            break;
                    }

                    ngModelCtrl.$setViewValue(value);
                    ngModelCtrl.$render();

                    getDatePicker().value(null);
                };

                totvsField.pattern(scope, attrs, element, childScope, ngModelCtrl, datePickerElement);
                totvsField.canclean(attrs, element, childScope, datePickerElement, callbackfn);

                directiveService.removeAttributesFromElement(element, attrs, removeAttrs);

                totvsField.compile(childScope, element);
                totvsField.watchHasError(scope, datePickerElement, ngModelCtrl);
                /* End html component */

                function getDatePicker() {
                    if (dataDatePicker) {
                        return dataDatePicker;
                    }

                    dataDatePicker = element.find('input').data('kendoDatePicker');

                    return dataDatePicker;
                }

                function changeComponentValue(value) {
                    value = value || null;

                    if (angular.isNumber(value)) {
                        return getDatePicker().value(new Date(value));
                    }

                    if ((getDatePicker() && !dataDatePicker.value() && value) || value === null) {
                        dataDatePicker.value(value);
                    }
                }

                ngModelCtrl.$formatters.push(function(value) {
                    if (!getDatePicker()) {
                        $timeout(function() {
                            changeComponentValue(value);
                        }, 250);
                    } else {
                        changeComponentValue(value);
                    }

                    return value;

                });

                scope.dateSelectorOptions = {
                    start: attrs.depth,
                    depth: attrs.depth,
                    format: scope.format || 'dd/MM/yyyy',
                    max: scope.tMax,
                    min: scope.tMin,
                    change: function() {
                        if (this.value()) {
                            ngModelCtrl.$setViewValue(getOutputFormat(this.value()));
                        } else {
                            ngModelCtrl.$setViewValue(null);
                        }
                    }
                };

                scope.$on('kendoWidgetCreated', function() {
                    let span;

                    span = element.find('.k-picker-wrap');

                    if (attrs.$attr.focus) {
                        element.find('input.k-input').focus();
                    }

                    if (attrs.$attr.canclean) {
                        span.css('border-bottom-right-radius', '0px');
                        span.css('border-top-right-radius', '0px');
                    }
                });

                function getDesktopElement() {
                    let el = angular.element('<input kendo-date-picker k-ng-model="ngModel" k-options="dateSelectorOptions" ' +
                        'ng-blur="ngBlur()" ng-required="{{::ngRequired}}" placeholder="{{::placeholder}}" ' +
                        'style="width: 100%" ng-disabled="ngDisabled()"/>');

                    if (attrs.$attr.tMaskDate) {
                        el.attr('totvs-mask-date', attrs.tMaskDate);
                    }

                    return el;
                }
            }

            function getOutputFormat(date) {
                let format = getSelectedFormat();

                switch (format) {
                    case 'date':
                        return date.toLocaleDateString("PT-BR");
                    case 'time':
                        return date.getTime();
                    default:
                        return date.getTime();
                }

            }

            function getSelectedFormat() {
                return scope.outputFormat || TotvsDatepickerProvider.getOutputFormat();

            }
        }
    }

});