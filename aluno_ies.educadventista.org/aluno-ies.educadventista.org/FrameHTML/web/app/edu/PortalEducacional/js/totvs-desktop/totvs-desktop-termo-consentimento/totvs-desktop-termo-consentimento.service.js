/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.27
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module totvsDesktop
 * @name TotvsDesktopTermoConsentimentoService
 * @object service
 *
 * @created 2019-12-02 v12.1.27
 * @updated
 *
 * @requires totvsDesktop
 *
 * @description Service utilizada para verificar se o termo de consentimento foi aceito pelo usuário.
 */
define(['totvs-desktop/totvs-desktop.module',
    'totvs-desktop/totvs-desktop-termo-consentimento/totvs-desktop-termo-consentimento.factory',
    'totvs-desktop/totvs-desktop-termo-consentimento/totvs-desktop-termo-consentimento.controller'
], function() {

    'use strict';

    angular
        .module('totvsDesktop')
        .service('totvsDesktopTermoConsentimentoService', totvsDesktopTermoConsentimentoService);

    totvsDesktopTermoConsentimentoService.$inject = ['$modal',
        '$rootScope',
        'totvsDesktopTermoConsentimentoFactory',
        'eduTermoImagemVozService'
    ];

    function totvsDesktopTermoConsentimentoService($modal,
        $rootScope,
        totvsDesktopTermoConsentimentoFactory,
        eduTermoImagemVozService) {

        this.consultaAceiteTermosConsentimento = function() {
            $rootScope.isLoadingModalTermoConsentimento = true;

            totvsDesktopTermoConsentimentoFactory.consultaAceiteTermosConsentimento(function(consultaTermosUsuario) {
                if (angular.isDefined(consultaTermosUsuario)) {

                    if (exibeSolicitacaoTermoAceite(consultaTermosUsuario) === false) {
                        eduTermoImagemVozService.consultaTermoImagemVoz();
                        return;
                    }

                    $modal.open({
                        templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/totvs-desktop/totvs-desktop-termo-consentimento/totvs-desktop-termo-consentimento.view.html',
                        controller: 'totvsDesktopTermoConsentimentoController',
                        controllerAs: 'controller',
                        size: 'lg',
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            parametros: function() {
                                return consultaTermosUsuario;
                            }
                        },
                    });
                }

                $rootScope.isLoadingModalTermoConsentimento = false;
            });
        };

        function exibeSolicitacaoTermoAceite(consultaTermosUsuario) {

            if (angular.isDefined($rootScope.realizadoAceiteTermosConsentimento) &&
                $rootScope.realizadoAceiteTermosConsentimento === true) {
                return false;
            }

            if (consultaTermosUsuario.ContextoUsaSolicitacaoAceitePoliticaPrivacidade === true &&
                consultaTermosUsuario.AceiteRealizadoPoliticaPrivacidade === false) {
                return true;
            }

            if (consultaTermosUsuario.ContextoUsaSolicitacaoAceitePoliticaCookies === true &&
                consultaTermosUsuario.AceiteRealizadoPoliticaCookie === false) {
                return true;
            }

            if (consultaTermosUsuario.ContextoUsaSolicitacaoAceitePoliticaCookies === false &&
                consultaTermosUsuario.ContextoUsaSolicitacaoAceitePoliticaPrivacidade === false) {
                return false;
            }

            if (consultaTermosUsuario.AceiteRealizadoPoliticaPrivacidade === true &&
                consultaTermosUsuario.AceiteRealizadoPoliticaCookie === true) {
                return false;
            }

            return false;
        }
    }
});