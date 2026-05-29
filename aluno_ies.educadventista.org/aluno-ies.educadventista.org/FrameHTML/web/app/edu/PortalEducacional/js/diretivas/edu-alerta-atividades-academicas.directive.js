/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.2502
 * (c) 2019-2023 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduAlertaAtividadesAcademicas
 * @object directive
 * @requires diretivas.module,atividades-academicas-alerta.factory
 * @dependencies $totvsresource, $timeout
 * @description Directive utilizada no alerta das atividades acadêmicas.
 */
define(['diretivas/diretivas.module',
    'js-cookie',
    'aluno/atividades-academicas/atividades-academicas-alerta.factory'
], function(cookies) {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduAlertaAtividadesAcademicas', eduAlertaAtividadesAcademicasDirective);

    eduAlertaAtividadesAcademicasDirective.$inject = ['$timeout'];

    function eduAlertaAtividadesAcademicasDirective($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'js/aluno/atividades-academicas/atividades-academicas-alerta.view.html',
            controller: EduAlertaAtividadesAcademicasDirectiveController,
            controllerAs: 'controller',
            bindToController: true,
            scope: {}, // Isolated scope
            link: function(scope, element, attrs) {
                element.hide();
                $timeout(function() {
                    element.show();
                }, 2500)
            }
        };
    }

    EduAlertaAtividadesAcademicasDirectiveController.$inject = [
        '$window',
        '$rootScope',
        'TotvsDesktopContextoCursoFactory',
        'eduAtividadesAcademicasAlertaFactory'
    ];

    function EduAlertaAtividadesAcademicasDirectiveController($window, $rootScope, TotvsDesktopContextoCursoFactory, eduAtividadesAcademicasAlertaFactory) {
        /**
         * Constante
         */
        const CONST_ID_DIV_ATIVIDADE_ACADEMICA_ALERTA = "#atividades-academicas-alerta";

        /**
         * Variáveis
         */
        let self = this;
        self.alertaAtividadesAcademicas = [];
        self.naoExibirAlertaAtividadeAcademicaHoje = false;
        self.contextoAluno = null;
        self.dataAtual = new Date().toDateString();

        /**
         * Métodos
         */
        self.fecharAlerta = fecharAlerta;
        self.formatarColunaDataAtividade = formatarColunaDataAtividade;

        /**
         * Inicializa o controller.
         */
        init();

        function init() {
            self.contextoAluno = TotvsDesktopContextoCursoFactory.getCursoSelecionado();
            $(CONST_ID_DIV_ATIVIDADE_ACADEMICA_ALERTA).hide();

            if ($rootScope ? .InformacoesLogin)
                carregarAlerta();
        }

        /**
         * Efetua o carregamento do alerta
         */
        function carregarAlerta() {
            if (exibirAlerta())
                buscarAtividadesAcademicas();
        }

        /**
         * Verificar se deve realizar o carregamento do alerta
         */
        function exibirAlerta() {
            let dataNaoExibirAlertaAtividadesAcademicas = buscarCookieOuLocalStorageNaoExibirAlertaAtividadesAcademicas();

            if (dataNaoExibirAlertaAtividadesAcademicas)
                return dataNaoExibirAlertaAtividadesAcademicas != self.dataAtual;
            else
                return true;
        }

        /**
         * Buscar a informação para exibir ou não o alerta de atividades acadêmicas hoje
         */
        function buscarCookieOuLocalStorageNaoExibirAlertaAtividadesAcademicas() {
            if (browserSuportaLocalStorage())
                return $window.localStorage.getItem(getNomeCookieOuLocalStorage());
            else
                return cookies.get(getNomeCookieOuLocalStorage());
        }

        /**
         * Gravar a informação para exibir ou não o alerta de atividades acadêmicas hoje
         */
        function gravarCookieOuLocalStorageNaoExibirAlertaAtividadesAcademicas() {
            if (browserSuportaLocalStorage())
                $window.localStorage.setItem(getNomeCookieOuLocalStorage(), self.dataAtual);
            else
                cookies.set(getNomeCookieOuLocalStorage(), self.dataAtual);
        }

        /**
         * Buscar o nome do cookie ou do local storage com base no contexto selecionado do aluno
         */
        function getNomeCookieOuLocalStorage() {
            if (self.contextoAluno) {
                let ra = self.contextoAluno.cursoSelecionado.RA;
                let idPerlet = self.contextoAluno.cursoSelecionado.IDPERLET;
                let idHabilitacaoFilial = self.contextoAluno.cursoSelecionado.IDHABILITACAOFILIAL;
                const nomeCookieOuLocalStorage = 'EduNaoExibirAlertAtivAcadHoje';
                return `${nomeCookieOuLocalStorage}|${ra}|${idPerlet}|${idHabilitacaoFilial}`;
            } else
                return null;
        }

        /**
         * Buscar se o navegador suporta local storage
         */
        function browserSuportaLocalStorage() {
            return typeof(Storage) !== 'undefined';
        }

        /**
         * Buscar as atividades acadêmicas que parametrização de alerta forem atendidas
         */
        function buscarAtividadesAcademicas() {

            eduAtividadesAcademicasAlertaFactory.getAlertaAtividadesAcademicas(function(result) {
                if (result && result.length > 0) {
                    self.alertaAtividadesAcademicas = result;
                    $(CONST_ID_DIV_ATIVIDADE_ACADEMICA_ALERTA).show();
                } else
                    $(CONST_ID_DIV_ATIVIDADE_ACADEMICA_ALERTA).hide();
            });
        }

        function formatarColunaDataAtividade(dataItem) {
            return (dataItem.DATA_ATIVIDADE !== '' && dataItem.DATA_ATIVIDADE != null) ?
                '<span class="ng-binding">{{dataItem.DATA_ATIVIDADE | date : "dd/MM/yyyy"}}</span>' : '';
        }

        /**
         * Fechar o alerta
         */
        function fecharAlerta() {
            if (naoExibirAlertaAtividadeAcademicaHoje.checked)
                gravarCookieOuLocalStorageNaoExibirAlertaAtividadesAcademicas();

            $(CONST_ID_DIV_ATIVIDADE_ACADEMICA_ALERTA).hide();
        }
    }
});