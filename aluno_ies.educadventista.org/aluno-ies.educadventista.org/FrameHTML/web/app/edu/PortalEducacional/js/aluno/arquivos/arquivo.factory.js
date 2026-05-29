define(['aluno/arquivos/arquivo.module'], function() {

    'use strict';

    angular
        .module('eduArquivoModule')
        .factory('eduMaterialFactory', EduMaterialFactory);

    EduMaterialFactory.$inject = ['$totvsresource'];

    function EduMaterialFactory($totvsresource) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory = $totvsresource.REST(url, {}, {});

        factory.materiaisAluno = materiaisAluno;
        factory.materiaisTurmaDisc = materiaisTurmaDisc;
        factory.urlDownloadArquivo = urlDownloadArquivo;
        factory.materiaisInstitucionais = materiaisInstitucionais;

        return factory;
        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Busca lista de materiais disponibilizados para o aluno.
         *
         * @param {Function} callback - função de retorno
         * @returns Lista de materiais
         */
        function materiaisAluno(callback) {
            var parameters = {
                method: 'Material',
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Busca lista de materiais disponibilizados para o aluno.
         *
         * @param {int} idTurmaDisc - id. turma/disciplina
         * @param {Function} callback - função de retorno
         * @returns Lista de materiais da turma/disciplina
         */
        function materiaisTurmaDisc(idTurmaDisc, callback) {
            var parameters = {
                method: 'MateriaisTurmaDisciplina',
                idTurmaDisc: idTurmaDisc
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Busca lista de materiais disponibilizados para o aluno.
         *
         * @param {Function} callback - Função de Retorno
         * @returns Lista de materiais
         */
        function materiaisInstitucionais(callback) {
            var parameters = {
                method: 'Material/Institucional'
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Url para download do material disponibilizado para o aluno.
         *
         * @param {Number} idMaterialSec - identificador do material
         * @param {String} pathArquivo - caminho do arquivo
         * @returns Url para download do arquivo
         */
        function urlDownloadArquivo(idMaterialSec, pathArquivo) {
            return getURLBaseDownloadArquivo() +
                getParametroIdMaterialParaURL(idMaterialSec) +
                getParametroPathArquivoParaURL(pathArquivo);
        }

        function getURLBaseDownloadArquivo() {
            return CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Material/Download?';
        }

        function getParametroIdMaterialParaURL(idMaterialSec) {
            return 'idMaterialSec=' + idMaterialSec;
        }

        function getParametroPathArquivoParaURL(pathArquivo) {
            return '&pathArquivo=' + encodeURIComponent(pathArquivo);
        }
    }
});