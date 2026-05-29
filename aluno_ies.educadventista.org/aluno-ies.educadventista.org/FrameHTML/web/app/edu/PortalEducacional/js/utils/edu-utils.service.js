/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduUtilsModule
 * @name eduUtilsService
 * @object service
 *
 * @created 2016-10-11 v12.1.15
 * @updated
 *
 * @requires
 *
 * @description Service utils do Educacional
 */
define(['utils/edu-utils.module'], function() {

    'use strict';

    angular
        .module('eduUtilsModule')
        .service('eduUtilsService', EduUtilsService);

    EduUtilsService.$inject = [
        '$rootScope',
        '$http',
        'i18nFilter',
        '$resource',
        'eduUtilsFactory'
    ];

    function EduUtilsService(
        $rootScope,
        $http,
        i18nFilter,
        $resource,
        eduUtilsFactory) {

        var self = this;

        self.escapeHtml = escapeHtml;
        self.tratarQuebrasDeLinhaStringParaHTML = tratarQuebrasDeLinhaStringParaHTML;
        self.capitalizeFirstLetter = capitalizeFirstLetter;
        self.abrirJanelaDownloadArquivo = abrirJanelaDownloadArquivo;
        self.b64toBlob = b64toBlob;
        self.buscaIP = buscaIP;
        self.injetarPdfNoHtml = injetarPdfNoHtml;

        /**************
         *   FUNCTIONS
         **************/

        /**
         * @param {string} str - caracter especial
         */
        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .replace(/\//g, '&#x2F;');
        }

        /**
         * Realiza a transformação de quebras de linha string ('\n')
         * para quebras de linha em html ('<br>')
         *
         * @param {any} string - string a receber tratamento
         * @returns
         */
        function tratarQuebrasDeLinhaStringParaHTML(string) {
            if (string) {
                return string.replaceAllRegExp('\n', '<br>');
            } else {
                return '';
            }
        }

        /**
         * Transforma o primeiro caracter de uma string em letra maíuscula (capitalize)
         *
         * @param {any} string - string a receber tratamento
         * @returns
         */
        function capitalizeFirstLetter(string) {
            if (string) {
                return string.replace(/^./, string[0].toUpperCase());
            } else {
                return '';
            }
        }

        function abrirJanelaDownloadArquivo(nomeArquivo, arquivoBytes) {
            var blob = b64toBlob(arquivoBytes);
            saveAs(blob, nomeArquivo);
        }

        function b64toBlob(b64Data, contentType, sliceSize) {

            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data),
                byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {

                var slice = byteCharacters.slice(offset, offset + sliceSize),
                    byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
                type: contentType
            });
            return blob;
        }

        function removerQuebrasDeLinha(texto) {
            return texto.replace(/\n|\r/g, "");
        }

        function buscaIP(callback) {
            if (!angular.isDefined($rootScope.EduParamsGeral)) {
                /*Se a configuração ainda não foi carregada*/
                console.error(i18nFilter('l-falha-buscaip').concat(i18nFilter('l-config-ipserver-nao-carregada')));
                callback('0.0.0.0');
                return;
            }

            if ($rootScope.EduParamsGeral.UtilizaBuscaIpServer === true) {
                //chamada da api para burcar o ip no server
                eduUtilsFactory.getEnderecoRequisicaoAsync(function(result) {
                    if (result) {
                        var ip = atob(result.EnderecoRequisicao);
                        callback(ip);
                    }
                });
            } else {
                /*
                Implementação a fim de chamar o serviço getmyip.cloudtotvs.com.br 
                que não é bloqueado pelos antivírus. Caso não consiga chama o serviço de cloud, 
                permaneceremos chamando o serviço antigo que está funcionando para a maioria dos clientes.            
                */
                $http({
                    method: 'GET',
                    url: 'https://getmyip.cloudtotvs.com.br'
                }).then(function(response) {
                    callback(removerQuebrasDeLinha(response.data));
                }, function(error) {
                    /*Se ocorreu algum erro com a API da TOTVS é feito a tentativa de utilizar a IpiFy*/
                    console.error(i18nFilter('l-falha-buscaip').concat(' https://getmyip.cloudtotvs.com.br'));
                    var ipify = $resource('https://api.ipify.org');
                    ipify.get({
                        "format": "json"
                    }).$promise.then(function(data) {
                        callback(removerQuebrasDeLinha(data.ip));
                    }, function(error) {
                        console.error(i18nFilter('l-falha-buscaip').concat(' https://api.ipify.org'));
                        callback('0.0.0.0');
                    });
                });
            }
        }

        /**
         * Função para injetar um pdf em uma div
         * 
         * @param {string} base64DoPdf - base64 do pdf
         * @param {number} alturaDoObject - altura do objeto
         * @param {string} idDiv - id da div que receberá o pdf
         */
        function injetarPdfNoHtml(base64DoPdf, alturaDoObject, idDiv) {
            const objetoHtml = '<object data="data:application/pdf;base64,' + base64DoPdf +
                '#navpanes=0" width="100%" height="' +
                alturaDoObject + 'px" type="application/pdf"/>';

            const div = $('#' + idDiv);

            div.empty();

            div.append(objetoHtml);
        }
    }
});