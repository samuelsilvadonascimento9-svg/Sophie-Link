/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

/**
 * @module eduMuralModule
 * @name EduMuralController
 * @object controller
 *
 * @created 14/09/2016 v12.1.15
 * @updated
 *
 * @requires mural.module
 *
 * @dependencies eduMuralFactory
 *
 * @description Controller do Mural
 */
define(['aluno/mural/mural.module',
    'aluno/mural/mural.factory',
    'utils/edu-utils.factory',
    'widgets/widget.constants',
    'cst-customizacao/cst-customizacao.module',
    'cst-customizacao/cst-customizacao.service'
], function() {

    'use strict';

    angular
        .module('eduMuralModule')
        .controller('EduMuralController', EduMuralController);

    EduMuralController.$inject = ['eduMuralFactory',
        '$sce',
        '$interval',
        'eduUtilsFactory',
        'eduWidgetsConsts',
        '$rootScope',
        'TotvsDesktopContextoCursoFactory',
        'eduCustomService'
    ];

    /**
     * Controller para a página principal do portal
     *
     * @param {object} eduMuralFactory  Factory acesso a serviços
     * @param {object} $sce             Sanitize
     * @param {object} $interval        Objeto setInterval
     * @param {object} EduUtilsFactory  Factory utilitária
     * @param {object} eduWidgetsConsts Constantes para os widgets
     */
    function EduMuralController(eduMuralFactory, $sce, $interval, EduUtilsFactory, eduWidgetsConsts, $rootScope, TotvsDesktopContextoCursoFactory, eduCustomService) {

        let self = this;
        self.idFuncionalidade = eduWidgetsConsts.EduWidgetsFuncionalidade.Mural;

        self.slides = [];
        self.informacoes = '';
        self.exibirInformacoes = false;

        self.getSlides = getSlides;
        self.getInformacoes = getInformacoes;

        // Contexto carregado para ser utilizado no serviço da customização
        $rootScope.Contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

        eduCustomService.initPre(this, $rootScope);
        init();

        function init() {
            self.getSlides();
            self.getInformacoes();

            // Abre em outra aba caso seja um link externo
            $interval(function() {
                $('.carousel a').each(function() {
                    if ($(this).attr('href') !== undefined && $(this).attr('href').indexOf('http') > -1) {
                        $(this).attr('target', '_blank');
                    }
                });
            }, 1000, 5);
        }

        function getSlides() {
            eduMuralFactory.getSlides(function(result) {
                if (result) {
                    self.slides = [];
                    angular.forEach(result, function(value) {

                        // Coloca em um objeto no padrão da diretiva do carousel
                        let objSlide = {};
                        objSlide.title = value.TITULO;
                        objSlide.img = value.IMAGEM;
                        objSlide.link = value.LINK;
                        objSlide.isBase64 = true;

                        self.slides.push(objSlide);
                    });
                }
            });
        }

        /**
         * Texto com informações parametrizadas que devem ser exibidas na tela do Mural.
         */
        function getInformacoes() {
            EduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(parametros) {
                if (parametros ? .InformacoesMural) {
                    self.informacoes = $sce.trustAsHtml(parametros.InformacoesMural);
                    self.exibirInformacoes = true;
                }
            });
        }
    }
});