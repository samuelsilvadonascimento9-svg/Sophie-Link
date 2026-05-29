/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.2306
 * (c) 2015-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduTermoImagemVozModule
 * @name eduTermoImagemVozService
 * @object service
 *
 * @created 2019-12-02 v12.1.2306
 * @updated
 *
 * @requires eduTermoImagemVozModule
 *
 * @description Service utilizada para verificar se o termo de uso de imagem e voz foi aceito pelo usuário.
 */

define([
    'aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.module',
    'aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.factory',
    'utils/edu-utils.service',
    'utils/edu-enums.constants'
], function() {

    'use strict';

    angular
        .module('eduTermoImagemVozModule')
        .service('eduTermoImagemVozService', eduTermoImagemVozService);

    eduTermoImagemVozService.$inject = [
        '$rootScope',
        'eduTermoImagemVozFactory',
        'totvs.app-notification.Service',
        '$state',
        'i18nFilter',
        'eduEnumsConsts'
    ];

    function eduTermoImagemVozService(
        $rootScope,
        eduTermoImagemVozFactory,
        totvsNotification,
        $state,
        i18nFilter,
        eduEnumsConsts
    ) {

        function abreModalTermoOpcional(TermoImagemVoz) {
            if (angular.isDefined(TermoImagemVoz) && TermoImagemVoz.StatusConsentimento == eduEnumsConsts.EduStatusTermoImagemVoz.Pendente) {

                $rootScope.TermoImagemVoz = TermoImagemVoz;
                totvsNotification.question({
                    title: i18nFilter('l-termo-imagem-voz', [], 'js/aluno/dados-pessoais'),
                    text: i18nFilter('l-texto-nova-atualizacao-modal-termo', [], 'js/aluno/dados-pessoais') + '<br>' + i18nFilter('l-texto-modal-termo', [], 'js/aluno/dados-pessoais'),
                    size: 'lg',
                    confirmLabel: i18nFilter('l-acessar-termo', [], 'js/aluno/dados-pessoais'),
                    cancelLabel: i18nFilter('l-depois-termo', [], 'js/aluno/dados-pessoais'),
                    callback: function(isPositiveResult) {
                        if (isPositiveResult) {
                            $rootScope.divModalTermoImagemVozExiste = true;
                            if ($state.current.name != 'termo-imagem-voz.start') {
                                $state.go('termo-imagem-voz.start');
                            }
                        }
                    }
                });
                aplicaEstiloBotaoSecundario();
            }
        }

        this.consultaTermoImagemVoz = function() {
            $rootScope.urlOrigem = $state.current.name;
            $rootScope.isLoadingModalTermoConsentimentoImagemVoz = true;

            const paramsTermo = {
                obterNomeResponsavel: false,
                incluirRelatorio: false,
                somenteStatus: true
            }

            eduTermoImagemVozFactory.getTermoImagemVoz(paramsTermo, function(TermoImagemVoz) {
                $rootScope.TermoImagemVoz = TermoImagemVoz;
                if (!angular.isDefined(TermoImagemVoz) || !TermoImagemVoz.TermoImgVozHabilitado)
                    return;
                if (TermoImagemVoz.StatusConsentimento !== eduEnumsConsts.EduStatusTermoImagemVoz.Pendente)
                    return;

                if (TermoImagemVoz.BloqueiaPortalNovoTermo) {
                    $state.go('termo-imagem-voz.start');
                    hidePortalMenus();
                } else {
                    abreModalTermoOpcional(TermoImagemVoz);
                }
            });
        };

        /**
         * Aplica estilo secundário ao botão
         */
        function aplicaEstiloBotaoSecundario() {
            setTimeout(function() {
                $('.modal-footer > .btn-default').css('background-color', '#FFF')
                $('.modal-footer > .btn-default').css('color', '#278495')
            }, 50);
        }

        /**
         * Mostra os menus interativos do portal para tratamento do bloqueio do mesmo
         */
        function hidePortalMenus() {
            $('#sidebar-min').css('display', 'none')
            $('#menu-header').css('display', 'none')
            $('#subheader').css('margin-top', '-33px')
        }
    }
});