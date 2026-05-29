/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduRelatorioModule
 * @name EduRelatorioFactory
 * @object factory
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 *
 * @description Service utilizado para emissão de relatórios.
 */

define([
    'utils/reports/edu-relatorio.module',
    'utils/edu-utils.service',
], function() {
    'use strict';

    angular
        .module('eduRelatorioModule')
        .service('eduRelatorioService', eduRelatorioService);

    eduRelatorioService.$inject = [
        '$window',
        '$filter',
        '$totvsresource',
        'totvs.app-notification.Service',
        'eduUtilsService',
    ];

    /**
     * Serviço utilizado para geração e emissão de relatórios.
     *
     * @param {Object} $window - Objeto window
     * @param {Object} $filter - Filtro angular
     * @param {Object} $totvsresource - Resouce do THF
     * @param {Object} appNotificationService - Serviço de notificação
     * @param {Service} eduUtilsService - Utils
     */
    function eduRelatorioService(
        $window,
        $filter,
        $totvsresource,
        appNotificationService,
        eduUtilsService
    ) {
        let factory = $totvsresource.REST(
            CONST_GLOBAL_URL_BASE_SERVICOS +
            'TOTVSEducacional/Relatorio/:idRelatorio/:codColRelatorio', {}, {}
        );

        let self = this;

        self.emitirRelatorio = emitirRelatorio;
        self.exibirOuSalvarPDF = exibirOuSalvarPDF;

        function emitirRelatorio(idRelatorio, codColRelatorio, filtrosAdicionais) {
            appNotificationService.question({
                title: $filter('i18n')('l-imprimir', [], ''),
                text: $filter('i18n')('l-confirma-impressao', [], ''),
                size: 'sm',
                cancelLabel: 'l-no',
                confirmLabel: 'l-yes',
                callback: function(imprimir) {
                    if (imprimir) {
                        let parametros = {
                            idRelatorio: idRelatorio,
                            codColRelatorio: codColRelatorio,
                        };

                        if (filtrosAdicionais) {
                            parametros = parametrosAdicionais(parametros, filtrosAdicionais);
                        }

                        factory.TOTVSQuery(parametros, function(result) {
                            exibirOuSalvarPDF(result[0].Bytes);
                        });
                    }
                },
            });
        }

        /**
         * Carregar filtros adicionais do relatório
         *
         * @param {Object} parametros - Parâmetros execução do relatório.
         * @param {Array} filtrosAdicionais - Lista de parâmetros opcionais.
         * @returns
         */
        function parametrosAdicionais(parametros, filtrosAdicionais) {
            if (filtrosAdicionais && parametros) {
                parametros.parametrosAdicionais = filtrosAdicionais;
            }
            return parametros;
        }

        /**
         * Exibir relatório em nova aba ou para download.
         *
         * @param {Blob} file - Blob do relatório.
         * @param {string} filename - nome do relatório.
         * @param {boolean} downloadFile  - indica se é para inicializar o download do arquivo
         * @param {options} options - configurações para personalizar a exibição/download do arquivo:
         * options.filename:        Nome do relatório.
         * options.downloadFile:    Indica se é para inicializar o download do arquivo
         * options.urlLoad:         Define a forma de abertura do popup do relatório:
         * options.urlLoad = '_blank' - URL is loaded into a new window/tab. This is default
         * options.urlLoad = '_new' - URL is loaded into a new window.
         * options.urlLoad = '_parent' - URL is loaded into the parent frame
         * options.urlLoad = '_self' - URL replaces the current page
         * options.urlLoad = '_top' - URL replaces any framesets that may be loaded
         */
        function exibirOuSalvarPDF(file, options) {
            if (!options) {
                const filenameDefault = $filter('i18n')(
                    'l-filename-default', [],
                    'js/utils/reports'
                );
                options = {
                    filename: filenameDefault,
                    downloadFile: false,
                    urlLoad: '_blank',
                };
            }
            if (file) {
                try {
                    let blob = eduUtilsService.b64toBlob(file, 'application/pdf');
                    const fullFilename = `${options.filename}.pdf`;
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, fullFilename);
                    } else {
                        const blobUrl = URL.createObjectURL(blob);
                        const popUpHabilitado = $window.open(blobUrl, options.urlLoad);
                        if (!popUpHabilitado) {
                            throw $filter('i18n')(
                                'l-msg-erro-popup-bloqueado', [],
                                'js/utils/reports'
                            );
                        }

                        if (options.downloadFile) {
                            eduUtilsService.abrirJanelaDownloadArquivo(fullFilename, file);
                        }
                    }
                } catch (e) {
                    console.error(e);
                    appNotificationService.notify({
                        type: 'warning',
                        title: $filter('i18n')('l-titulo', [], 'js/utils/reports'),
                        detail: $filter('i18n')(
                            'l-msg-erro-popup-bloqueado', [],
                            'js/utils/reports'
                        ),
                    });
                    eduUtilsService.abrirJanelaDownloadArquivo(fullFilename, file);
                }
            } else {
                appNotificationService.notify({
                    type: 'warning',
                    title: $filter('i18n')('l-titulo', [], 'js/utils/reports'),
                    detail: $filter('i18n')('l-msg-erro-emissao', [], 'js/utils/reports'),
                });
            }
        }
    }
});