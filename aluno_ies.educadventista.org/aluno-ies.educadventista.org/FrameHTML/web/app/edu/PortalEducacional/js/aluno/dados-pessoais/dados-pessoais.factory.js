/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/dados-pessoais/dados-pessoais.module',
    'aluno/dados-pessoais/modal-dados-pessoais-foto.controller'
], function() {

    'use strict';

    angular
        .module('eduDadosPessoaisModule')
        .factory('eduDadosPessoaisFactory', EduDadosPessoaisFactory);

    EduDadosPessoaisFactory.$inject = ['$totvsresource', '$modal', 'TotvsDesktopContextoCursoFactory'];

    // *********************************************************************************
    // *** Factory
    // *********************************************************************************
    function EduDadosPessoaisFactory($totvsresource, $modal, TotvsDesktopContextoCursoFactory) {

        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});
        factory.buscaDadosPessoais = buscaDadosPessoais;
        factory.atualizarDadosPessoais = atualizarDadosPessoais;
        factory.exibirFiadoresAlunoAsync = exibirFiadoresAlunoAsync;
        factory.getListaDeFiadoresAsync = getListaDeFiadoresAsync;
        factory.exibirModalFotos = exibirModalFotos;
        factory.removeFotoAlunoAsync = removeFotoAlunoAsync;
        factory.adicionaFotoAlunoAsync = adicionaFotoAlunoAsync;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function buscaDadosPessoais(callback) {
            var parameters = {};
            parameters['idContextoAluno'] = TotvsDesktopContextoCursoFactory.getIdContextoEncode();
            parameters.method = 'v1/Aluno/DadosPessoais';
            return this.TOTVSGet(parameters, callback, {});
        }

        function exibirFiadoresAlunoAsync(idPerLet, callback) {
            var parameters = {};
            parameters.idPerLet = idPerLet;
            parameters.method = 'Aluno/ExibirFiadores';

            return this.TOTVSGet(parameters, callback);
        }

        function getListaDeFiadoresAsync(idPerLet, callback) {
            var parameters = {};
            parameters.idPerLet = idPerLet;
            parameters.method = 'Aluno/Fiadores';

            return this.TOTVSGet(parameters, callback);
        }

        function atualizarDadosPessoais(aluno, callback) {
            var parametros = {};
            parametros.method = 'Aluno/DadosPessoais';

            var dados = [];
            dados.push(aluno);

            return this.TOTVSUpdate(parametros, dados, callback);
        }

        function exibirModalFotos(alunoSelecionado, callback) {
            var modalInstance = $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + 'js/aluno/dados-pessoais/modal-dados-pessoais-foto.view.html',
                controller: 'EduModalFotoController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return alunoSelecionado;
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

        function removeFotoAlunoAsync(codColigada, ra, callback) {
            var parameters = {};
            parameters.ra = ra;
            parameters.codColigada = codColigada;
            parameters.method = 'Aluno/Foto/Excluir';

            return factory.TOTVSRemove(parameters, callback);
        }

        function adicionaFotoAlunoAsync(codColigada, ra, foto, nomeArquivo, pathArquivo, callback) {
            var parameters = {
                    codColigada: codColigada,
                    ra: ra,
                    method: 'Aluno/Foto/Incluir'
                },
                model = {
                    Arquivo: foto,
                    PathArquivo: pathArquivo,
                    NomeArquivo: nomeArquivo
                };
            return factory.TOTVSSave(parameters, model, callback);
        }
    }
});