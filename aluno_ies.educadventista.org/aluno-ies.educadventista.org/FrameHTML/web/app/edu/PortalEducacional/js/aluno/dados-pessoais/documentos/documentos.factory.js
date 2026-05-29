/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduDocumentosModule
 * @name eduDocumentosFactory
 * @object factory
 *
 * @created 07/10/2016 v12.1.15
 * @updated
 *
 * @dependencies $totvsresource
 *
 * @description Factory utilizada para os documentos do Aluno.
 */
define(['aluno/dados-pessoais/documentos/documentos.module',
    'aluno/dados-pessoais/documentos/modal-documentos-anexo.controller'
], function() {

    'use strict';

    angular
        .module('eduDocumentosModule')
        .factory('eduDocumentosFactory', EduDocumentosFactory);

    EduDocumentosFactory.$inject = ['$totvsresource', '$modal'];

    function EduDocumentosFactory($totvsresource, $modal) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Aluno/:method',
            factory = $totvsresource.REST(url, {}, {});

        factory.getDocumentosAluno = getDocumentosAluno;
        factory.getDocumentosAlunoMatricula = getDocumentosAlunoMatricula;
        factory.validaEntregaDocumentosNaMatricula = validaEntregaDocumentosNaMatricula;
        factory.getArquivoDocumento = getArquivoDocumento;
        factory.downloadArquivo = downloadArquivo;
        factory.uploadArquivoAsync = uploadArquivoAsync;
        factory.uploadArquivoFiadorAsync = uploadArquivoFiadorAsync;
        factory.exibirModalDocumentos = exibirModalDocumentos;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getDocumentosAluno(callback) {
            var parameters = {
                method: 'DocumentosAluno'
            };

            return factory.TOTVSGet(parameters, callback);
        }

        function getDocumentosAlunoMatricula(idPerlet, idHabilitacaoFilial, callback) {
            var parameters = {
                method: 'DocumentosAlunoMatricula/{IdPerLet}/{IdHabilitacaoFilial}',
                IdPerlet: idPerlet,
                IdHabilitacaoFilial: idHabilitacaoFilial
            };
            return factory.TOTVSGet(parameters, callback);
        }

        function validaEntregaDocumentosNaMatricula(idPerLet, idHabilitacaoFilial, ra, callback) {
            var parameters = {
                method: 'ValidaEntregaDocumentosNaMatricula/{IdPerLet}/{IdHabilitacaoFilial}/{Ra}',
                IdPerlet: idPerLet,
                IdHabilitacaoFilial: idHabilitacaoFilial,
                Ra: ra
            };

            return factory.TOTVSGet(parameters, callback);
        }

        function getArquivoDocumento(chaveRM, origem, callback) {
            var parameters = {
                method: 'Documento/ArquivoNew',
                chaveRM: chaveRM,
                dataServerArquivo: origem
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        function downloadArquivo(idArquivo, callback) {
            var parameters = {
                method: 'Documento/Download',
                idArquivo: idArquivo
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        function uploadArquivoAsync(modelUploadDocumento, callback) {
            var parameters = {
                    method: 'Documento/Upload',
                    codDocumento: modelUploadDocumento.codDocumento,
                    ra: modelUploadDocumento.ra,
                    idPerLet: modelUploadDocumento.idPerLet
                },
                model = {
                    Arquivo: modelUploadDocumento.arquivo,
                    PathArquivo: modelUploadDocumento.pathArquivo,
                    NomeArquivo: modelUploadDocumento.nomeArquivo,
                    ehMatricula: modelUploadDocumento.ehMatricula,
                    idHabilitacaoFilial: modelUploadDocumento.idHabilitacaoFilial
                };
            return factory.TOTVSSave(parameters, model, callback);
        }

        function uploadArquivoFiadorAsync(codDocumento, idFiador, idDocFiador, bytes, nomeArquivo, pathArquivo, callback) {
            var parameters = {
                    method: 'Documento/UploadArquivoFiador',
                    codDocumento: codDocumento,
                    idFiador: idFiador,
                    idDocFiador: idDocFiador == null ? 0 : idDocFiador
                },
                model = {
                    Arquivo: bytes,
                    PathArquivo: pathArquivo,
                    NomeArquivo: nomeArquivo
                };
            return factory.TOTVSSave(parameters, model, callback);
        }

        function exibirModalDocumentos(documentoSelecionado, callback) {
            var modalInstance = $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + 'js/aluno/dados-pessoais/documentos/modal-documentos-anexo.view.html',
                controller: 'EduModalAnexoController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return documentoSelecionado;
                    }
                },
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(
                function(fechouModal) {
                    callback(fechouModal);
                }
            );
        }
    }
});