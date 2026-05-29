define(['aluno/altera-senha/altera-senha.module',
    'aluno/altera-senha/altera-senha.controller'
], function() {

    'use strict';

    angular
        .module('eduAlteraSenhaModule')
        .factory('eduAlteraSenhaFactory', eduAlteraSenhaFactory);

    eduAlteraSenhaFactory.$inject = ['$totvsresource', '$modal'];

    function eduAlteraSenhaFactory($totvsresource, $modal) {

        let url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory = $totvsresource.REST(url, {}, {});

        factory.alteraSenha = alteraSenha;
        factory.abrirModalAlteraSenha = abrirModalAlteraSenha;

        return factory;

        function abrirModalAlteraSenha(callbackAposAlterarSenha) {

            let modalInstance = $modal.open({
                templateUrl: 'js/aluno/altera-senha/altera-senha.view.html',
                controller: 'eduAlteraSenhaController',
                controllerAs: 'controller',
                size: 'md',
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function() {

            }, callbackAposAlterarSenha);

        }

        /**
         * Realiza a alteração de senha do usuário logado
         */
        function alteraSenha(senhaAtual, novaSenha, callback) {

            let parameters = {
                method: 'UpdatePassword'
            }

            let model = {
                senhaAtual: senhaAtual,
                novaSenha: novaSenha
            };

            return factory.TOTVSSave(parameters, model, callback).then(function(retorno) {
                callback(retorno);
            });
        }
    }
});