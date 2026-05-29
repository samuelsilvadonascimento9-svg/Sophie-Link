/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduObterCodigoBarrasController
 * @object controller
 *
 * @created 2020-10-15 v12.1.31
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller da impressão do código de barras do boleto
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.new.route',
    'aluno/financeiro/financeiro.factory',
    'aluno/financeiro/financeiro.service'
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduObterCodigoBarrasController', EduObterCodigoBarrasController);

    EduObterCodigoBarrasController.$inject = [
        'EduFinanceiroFactory',
        'parametros',
        '$modalInstance',
        'totvs.app-notification.Service',
        'i18nFilter',
        'EduFinanceiroService',
        '$state',
        '$scope',
    ];

    /**
     * Controller da impressão do código de barras do boleto
     * @param   {object} parametros            Objeto com parametros
     * @param   {object} $modalInstance        Objeto para janela modal
     * @param   {object} $scope                Escopo AngularJS
     * @param   {object} EduFinanceiroFactory  Objeto factory para serviços de financeiro
     * @param   {object} $state                Objeto para manipulação de rotas
     * @param   {object} totvsNotification     Serviços de notificação
     * @param   {object} $i18nFilter           Filtro
     * @param   {object} $eduFinanceiroService Service do financeiro
     * @param   {object} totvsNotification    Serviço de notificação 
     */
    function EduObterCodigoBarrasController(
        EduFinanceiroFactory,
        parametros,
        $modalInstance,
        totvsNotification,
        i18nFilter,
        eduFinanceiroService,
        $state,
        $scope) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {
            self.codBarras = aplicarMascaraParaCodigoBarras(parametros.codBarras);
            self.copiarCodBarras = copiarCodBarras
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function copiarCodBarras() {
            eduFinanceiroService.copiarCodBarras(parametros.codBarras);
            self.modalInstance.dismiss();
        }

        //Aplica a máscara de código de barras.
        //Entrada: 00000000000000000000000000000000000000000000000 
        //Saída: 00000.00000 00000.000000 00000.000000 0 00000000000000
        function aplicarMascaraParaCodigoBarras(codBarras) {
            if (parametros.codBarras.length >= 44) {
                codBarras = codBarras.replace(/(\d{5})(\d)/, "$1.$2")
                    .replace(/(\d{5})(\d)/, "$1 $2")
                    .replace(/(\d{5})(\d)/, "$1.$2")
                    .replace(/(\d{6})(\d)/, "$1 $2")
                    .replace(/(\d{5})(\d\d)/, "$1.$2")
                    .replace(/(\d{6})(\d\d)/, "$1 $2")
                    .replace(/(\d)(\d\d\d\d\d\d)/, "$1 $2");
            }

            return codBarras;
        }
    }
});