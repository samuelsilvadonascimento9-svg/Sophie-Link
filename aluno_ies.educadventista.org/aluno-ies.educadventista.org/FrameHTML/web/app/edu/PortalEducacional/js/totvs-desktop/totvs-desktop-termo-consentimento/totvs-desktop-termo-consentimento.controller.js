/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.27
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['totvs-desktop/totvs-desktop.module',
    'utils/reports/edu-relatorio.service',
    'totvs-desktop/totvs-desktop-termo-consentimento/totvs-desktop-termo-consentimento.factory'
], function() {

    'use strict';

    angular
        .module('totvsDesktop')
        .controller('totvsDesktopTermoConsentimentoController', totvsDesktopTermoConsentimentoController);

    totvsDesktopTermoConsentimentoController.$inject = [
        '$rootScope',
        '$modalInstance',
        '$window',
        '$sce',
        'eduRelatorioService',
        'i18nFilter',
        'totvs.app-notification.Service',
        'parametros',
        'totvsDesktopTermoConsentimentoFactory',
        'eduTermoImagemVozService'
    ];

    function totvsDesktopTermoConsentimentoController(
        $rootScope,
        $modalInstance,
        $window,
        $sce,
        eduRelatorioService,
        i18nFilter,
        totvsNotification,
        parametros,
        totvsDesktopTermoConsentimentoFactory,
        eduTermoImagemVozService) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************

        let self = this;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************

        self.usuarioLeuPoliticaPrivacidade = false;
        self.usuarioLeuPoliticaCookies = false;
        self.solicitaPoliticaPrivacidade = false;
        self.solicitaPoliticaCookie = false;
        self.textoApresentacaoTermos = '';

        self.modalInstance = $modalInstance;
        self.aceiteTermosConsentimento = aceiteTermosConsentimento;
        self.naoAceitarTermosConsentimento = naoAceitarTermosConsentimento;
        self.exibirRelatorioPoliticaPrivacidade = exibirRelatorioPoliticaPrivacidade;
        self.exibirRelatorioPoliticaCookies = exibirRelatorioPoliticaCookies;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************

        init();

        function init() {
            self.paramsTermo = parametros;
            self.textoApresentacaoTermos = $sce.trustAsHtml(self.paramsTermo.TextoApresentacaoTermoConsentimento);
            validaExibicaoDasPoliticas();
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Método executado quando usuário aceita os termos de consentimento
         */
        function aceiteTermosConsentimento() {
            if (verificaPermissaoAceiteTermos() === false) {
                return;
            }

            totvsDesktopTermoConsentimentoFactory.realizaAceiteTermosConsentimento(self.paramsTermo, function(resultado) {
                $modalInstance.dismiss();

                if (resultado) {
                    $rootScope.realizadoAceiteTermosConsentimento = true;
                    eduTermoImagemVozService.consultaTermoImagemVoz();
                }
            });
        }

        /**
         * Método executado quando o usuário NÃO aceita os termos de consentimento
         */
        function naoAceitarTermosConsentimento() {
            $window.location.href = $window.location.href.split('#')[0] + 'login';
        }

        /**
         * Gera e exibe o relatório definido para o termo de política de consentimento
         */
        function exibirRelatorioPoliticaPrivacidade() {
            if (!validaConfigRelatoriosConsentimento(
                    self.paramsTermo.CodColigadaRelatorioPoliticaPrivacidade,
                    self.paramsTermo.IdRelatorioPoliticaPrivacidade,
                    i18nFilter('l-politica_privacidade', [], 'js/totvs-desktop'),
                )) {
                return;
            }

            totvsDesktopTermoConsentimentoFactory.exibirRelatorioTermoConsentimento(
                self.paramsTermo.CodColigadaRelatorioPoliticaPrivacidade,
                self.paramsTermo.IdRelatorioPoliticaPrivacidade,
                function(report) {
                    if (report && report[0]['Bytes']) {
                        self.usuarioLeuPoliticaPrivacidade = true;
                        self.paramsTermo.RelatorioPoliticaPrivacidade = report[0].Bytes;
                        eduRelatorioService.exibirOuSalvarPDF(report[0].Bytes);
                    }
                });
        }

        /**
         * Gera e exibe o relatório definido para a política de utilização de cookie
         */
        function exibirRelatorioPoliticaCookies() {
            if (!validaConfigRelatoriosConsentimento(
                    self.paramsTermo.CodColigadaRelatorioPoliticaCookies,
                    self.paramsTermo.IdRelatorioPoliticaCookies,
                    i18nFilter('l-politica_utilizacao_cookies', [], 'js/totvs-desktop'),
                )) {
                return;
            }

            totvsDesktopTermoConsentimentoFactory.exibirRelatorioTermoConsentimento(
                self.paramsTermo.CodColigadaRelatorioPoliticaCookies,
                self.paramsTermo.IdRelatorioPoliticaCookies,
                function(report) {
                    self.usuarioLeuPoliticaCookies = true;

                    if (report && report[0]['Bytes']) {
                        self.paramsTermo.RelatorioPoliticaCoockie = report[0].Bytes;
                        eduRelatorioService.exibirOuSalvarPDF(report[0].Bytes);
                    }
                });
        }

        function validaConfigRelatoriosConsentimento(codColigada, idRelatorio, nomeRelatorio) {
            let configValida = true;

            if (codColigada == null || idRelatorio == null) {
                configValida = false;

                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-termo-consentimento', [], 'js/totvs-desktop'),
                    detail: i18nFilter('l-config_relatorios_termo_consentimento_inconsistente', [nomeRelatorio], 'js/totvs-desktop')
                });
            }

            return configValida;
        }

        function validaExibicaoDasPoliticas() {
            if (self.paramsTermo.ContextoUsaSolicitacaoAceitePoliticaPrivacidade &&
                self.paramsTermo.IdRelatorioPoliticaPrivacidade > 0 &&
                !self.paramsTermo.AceiteRealizadoPoliticaPrivacidade) {
                self.solicitaPoliticaPrivacidade = true;
            }
            if (self.paramsTermo.ContextoUsaSolicitacaoAceitePoliticaCookies &&
                self.paramsTermo.IdRelatorioPoliticaCookies > 0 &&
                !self.paramsTermo.AceiteRealizadoPoliticaCookie) {
                self.solicitaPoliticaCookie = true;
            }
        }

        function verificaPermissaoAceiteTermos() {
            var possuiPermissao = true;

            if (self.solicitaPoliticaPrivacidade && !self.usuarioLeuPoliticaPrivacidade && self.solicitaPoliticaCookie && !self.usuarioLeuPoliticaCookies) {
                possuiPermissao = false;
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-termo-consentimento', [], 'js/totvs-desktop'),
                    detail: i18nFilter('l-informa-usuario-termos', [], 'js/totvs-desktop')
                });
            } else if (self.solicitaPoliticaPrivacidade && !self.usuarioLeuPoliticaPrivacidade) {
                possuiPermissao = false;
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-politica-privacidade', [], 'js/totvs-desktop'),
                    detail: i18nFilter('l-informa-usuario-termos-politica-privacidade', [], 'js/totvs-desktop')
                });
            } else if (self.solicitaPoliticaCookie && !self.usuarioLeuPoliticaCookies) {
                possuiPermissao = false;
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-politica-cookies', [], 'js/totvs-desktop'),
                    detail: i18nFilter('l-informa-usuario-termos-politica-cookies', [], 'js/totvs-desktop')
                });
            }

            return possuiPermissao;
        }
    }
});