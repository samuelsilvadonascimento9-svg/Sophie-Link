/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/arquivos/arquivo.module',
        'widgets/widget.constants',
        'utils/edu-constantes-globais.constants'
    ],
    function() {

        'use strict';

        angular
            .module('eduArquivoModule')
            .controller('eduArquivoController', EduArquivoController);

        EduArquivoController.$inject = ['$scope',
            '$rootScope',
            'eduWidgetsConsts',
            '$state',
            'eduConstantesGlobaisConsts',
            'totvs.app-notification.Service',
            'i18nFilter'
        ];

        function EduArquivoController($scope, $rootScope, eduWidgetsConsts, $state, eduConstantesGlobaisConsts, totvsNotification, i18nFilter) {

            // *********************************************************************************
            // *** Variáveis
            // *********************************************************************************

            var self = this;

            // *********************************************************************************
            // *** Propriedades públicas e métodos
            // *********************************************************************************

            self.exibeTab = exibeTab;
            self.periodoLetivoAlterado = periodoLetivoAlterado;
            self.idFuncionalidade = eduWidgetsConsts.EduWidgetsFuncionalidade.Arquivos;

            // *********************************************************************************
            // *** Inicialização do controller
            // *********************************************************************************
            init();

            /**
             * Valida se o usuário tem permissão ao menu
             */
            var permissionsWatch = $rootScope.$watch('objPermissions', function() {

                if ($rootScope.objPermissions) {

                    if (!$rootScope.objPermissions.EDU_ARQUIVOS) {
                        totvsNotification.notify({
                            type: 'warning',
                            title: i18nFilter('l-Atencao'),
                            detail: i18nFilter('l-usuario-sem-permissao')
                        });
                        $state.go(eduConstantesGlobaisConsts.EduStateViewPadrao);
                    }

                    //destroy watch
                    permissionsWatch();
                }
            });

            /**
             * Metodo de inicialização do controller
             */
            function init() {

            }

            /**
             * Valida se aba deve ser exibida, conforme permissão do usuário
             *
             * @param {String} tabName - Nome da tab.
             * @returns Permissão se aba deve ser visível ou não.
             */
            function exibeTab(tabName) {

                if ($rootScope.objPermissions === null) {
                    return false;
                }

                switch (tabName) {
                    case 'materiais':
                        return angular.isDefined($rootScope.objPermissions.EDU_ARQUIVOS_MATERIAIS_DISCIPLINAS);
                    case 'institucionais':
                        return angular.isDefined($rootScope.objPermissions.EDU_ARQUIVOS_DOCUMENTOS_INSTITUICAO);
                }
            }

            /**
             * Evento de alteração do período letivo.
             * Notifica controllers da alteração.
             */
            function periodoLetivoAlterado() {
                $scope.$broadcast('alteraPeriodoLetivoEvent');
                init();
            }
        }
    });