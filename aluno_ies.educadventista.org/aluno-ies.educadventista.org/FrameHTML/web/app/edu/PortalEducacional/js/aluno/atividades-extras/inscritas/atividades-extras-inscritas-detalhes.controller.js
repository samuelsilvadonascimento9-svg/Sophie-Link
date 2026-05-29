define(['aluno/atividades-extras/atividades-extras.module'], function() {

    'use strict';

    angular
        .module('eduAtividadesExtrasModule')
        .controller('AtividadeExtraDetalhesController', atividadeExtraDetalhesController);

    atividadeExtraDetalhesController.$inject = [
        '$filter',
        '$modalInstance',
        '$state',
        'atividade'
    ];

    function atividadeExtraDetalhesController($filter, $modalInstance, $state, atividade) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************

        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************

        self.modalInstance = $modalInstance;
        self.atividade = {};
        self.onclickMaisInformacoes = onclickMaisInformacoes;
        init();

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************

        function init() {
            self.atividade = atividade;
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function onclickMaisInformacoes() {
            $state.go('atividades-extras.start', {
                'tab': 'inscritas'
            });
            self.modalInstance.dismiss();
        }

    }
});