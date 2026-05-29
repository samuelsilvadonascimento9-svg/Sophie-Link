define(['aluno/altera-senha/altera-senha.module'], function() {

    'use strict';

    angular
        .module('eduAlteraSenhaModule')
        .controller('eduAlteraSenhaController', eduAlteraSenhaController);

    eduAlteraSenhaController.$inject = [
        '$scope',
        '$modalInstance',
        'i18nFilter',
        'eduAlteraSenhaFactory',
        'totvs.app-notification.Service'
    ];

    function eduAlteraSenhaController($scope,
        $modalInstance,
        i18nFilter,
        eduAlteraSenhaFactory,
        totvsNotification) {
        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.realizaAlteracaoSenha = realizaAlteracaoSenha;
        self.validaConfirmacaoSenha = validaConfirmacaoSenha;
        self.isTodosCamposPreenchidos = isTodosCamposPreenchidos;
        self.isConfirmacaoSenhaValida = true;
        self.podeAlterarSenha = false;
        init();

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        function init() {
            self.senhaAtual = '';
            self.novaSenha = '';
            self.confirmacaoSenha = '';
            self.podeAlterarSenha = false;
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************
        function realizaAlteracaoSenha() {
            eduAlteraSenhaFactory.alteraSenha(self.senhaAtual, self.novaSenha, function(retorno) {
                if (retorno.value == true) {
                    self.modalInstance.dismiss();
                }
            });
        }

        function validaConfirmacaoSenha() {
            self.isConfirmacaoSenhaValida = isConfirmacaoSenhaValida();

            if (self.isConfirmacaoSenhaValida === true) {
                $('#controller_confirmacaosenha .field-label').attr('class', 'field-label senha-em-preto');
                $('#controller_novasenha .field-label').attr('class', 'field-label senha-em-preto');
            } else {
                $('#controller_confirmacaosenha .field-label').attr('class', 'field-label senha-em-vermelho');
                $('#controller_novasenha .field-label').attr('class', 'field-label senha-em-vermelho');
            }

            isTodosCamposPreenchidos();
        }

        function isTodosCamposPreenchidos() {
            if (self.senhaAtual != '' && self.senhaAtual != null &&
                self.novaSenha != '' && self.novaSenha != null &&
                self.confirmacaoSenha != '' && self.confirmacaoSenha != null)
                self.podeAlterarSenha = self.isConfirmacaoSenhaValida;
            else
                self.podeAlterarSenha = false;
        }

        function isConfirmacaoSenhaValida() {
            if (self.confirmacaoSenha != '') {
                if (self.confirmacaoSenha != self.novaSenha) {
                    return false;
                }

                return true;
            }

            return false;
        }
    }
});