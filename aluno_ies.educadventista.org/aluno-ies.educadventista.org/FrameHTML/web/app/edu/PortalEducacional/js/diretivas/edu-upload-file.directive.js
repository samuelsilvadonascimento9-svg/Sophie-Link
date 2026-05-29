/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduUploadFile
 * @object directive
 *
 * @created 11/01/2017 v12.1.15
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies i18nFilter
 *
 * @restrict E
 * Parâmetros:
 * {string} label                Texto a ser apresentado no botão
 * {string}  name                Nome para o campo de input tipo file
 * {boolean} multiple            Se verdadeiro irá deixar selecionar mais de um arquivo para upload
 * {boolean} required            Se verdadeiro campo é obrigatório
 * {int}     maxFileSizeKbytes    Tamanho máximo do arquivo inserido (em bytes)
 * {object}  model               Equivalente a ng-model
 *
 * @example
 * <edu-upload-file
 *      name="campoFile"
 *      required="true"
 *      model="controller.Arquivos.File"
 *      label="{{ ::'l-enviar-arquivo' | i18n : [] : 'js/aluno' }}">
 * </edu-upload-file>
 *
 * @description Diretiva para Upload de arquivos
 *
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduUploadFile', EduUploadFile);

    EduUploadFile.$inject = ['i18nFilter', 'totvs.app-notification.Service'];
    /**
     * Diretiva eduUploadFile
     *
     * @param {any} i18nFilter - Filtro de tradução
     * @param {any} totvsNotification - Notificação toast
     * @returns
     */
    function EduUploadFile(i18nFilter, totvsNotification) {

        let eduUploadFileDirective = {
            restrict: 'E',
            scope: {
                label: '@',
                name: '@',
                multiple: '=',
                required: '=',
                maxFileSizeKbytes: '=',
                extensionsPermitted: '=',
                model: '='
            },
            template: '<div style="padding: 15px">' +
                '<label class="field-label">{{label}}</label>' +
                '<div class="input-group">' +
                '<input type="text" class="form-control" name="{{name}}_fake" ng-model="model" readonly>' +
                '<label class="input-group-btn">' +
                '<span id="btnAnexoHover" class="btn btn-primary">' +
                '{{label}}' +
                '<input ' +
                'type="file" ' +
                'name="{{name}}" ' +
                'edu-file-model="model" ' +
                'ng-model="model" ' +
                'class="hidden" />' +
                '</span>' +
                '</label>' +
                '</div>' +
                '<ul class="list-unstyled">' +
                '<li ng-if="extensionsPermitted !== null && extensionsPermitted !== undefined">' +
                '<span class="text-warning">' +
                '{{::"l-ext-permitidas" | i18n : [] : "js/diretivas"}}{{extensionsPermitted}}</span>' +
                '</li>' +
                '<li ng-if="maxFileSizeKbytes !== null && maxFileSizeKbytes !== undefined">' +
                '<span class="text-warning">' +
                '{{::"l-max-file-size" | i18n : [] : "js/diretivas"}}{{maxFileSizeKbytes | number}} KB</span>' +
                '</li>' +
                '</ul>' +
                '</div>',
            link: link
        };

        return eduUploadFileDirective;

        function link(scope, element) {

            if (scope.multiple) {
                element.find(':file').attr('multiple', 'multiple');
            }

            if (scope.required) {
                element.find('label').attr('required', 'required');
                element.find(':file').attr('required', 'required');
            }

            element.on('change', ':file', function() {
                let input = angular.element(this),
                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

                checkFiles(input.get(0).files, scope.maxFileSizeKbytes, scope.extensionsPermitted, function(result) {
                    if (result) {
                        input.trigger('fileselect', [numFiles, label]);
                    } else {
                        input.val(''); //limpa o input
                    }
                    scope.$apply();
                });
            });

            element.find(':file').on('fileselect', function(event, numFiles, label) {

                let input = angular.element(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' ' + i18nFilter('l-files selected', [], 'js/diretivas') : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) {
                        console.log(log);
                    }
                }
            });
        }

        function checkFiles(arrayFiles, maxFileSizeKbytes, extensionsPermitted, callback) {
            let result = true;
            if (angular.isDefined(arrayFiles)) {

                angular.forEach(arrayFiles, (value) => {

                    if (value && angular.isDefined(value)) {
                        if ((angular.isDefined(maxFileSizeKbytes) && maxFileSizeKbytes > 0) && Math.round(value.size / 1024) > maxFileSizeKbytes) {
                            totvsNotification.notify({
                                type: 'warning',
                                title: i18nFilter('l-edu-upload-file', [], 'js/diretivas'),
                                detail: value.name + i18nFilter('l-eduuploadfile-valida-file-size', [], 'js/diretivas') + maxFileSizeKbytes + ' KB'
                            });
                            result = false;
                        }

                        if (angular.isDefined(extensionsPermitted) && extensionsPermitted !== '' && extensionsPermitted !== null) {
                            const filename = value.name || '';
                            let extFile = filename.toLowerCase().split('.').pop();
                            if (extensionsPermitted.toLowerCase().split(';').indexOf(extFile) === -1) {
                                totvsNotification.notify({
                                    type: 'warning',
                                    title: i18nFilter('l-edu-upload-file', [], 'js/diretivas'),
                                    detail: value.name + i18nFilter('l-eduuploadfile-valida-file-extension', [], 'js/diretivas') + extensionsPermitted
                                });
                                result = false;
                            }
                        }
                    }
                });
            }

            if (typeof callback === 'function') {
                callback(result);
            }
        }
    }
});