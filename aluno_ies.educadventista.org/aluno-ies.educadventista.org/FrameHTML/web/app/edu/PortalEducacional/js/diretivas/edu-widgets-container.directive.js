/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.16
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduDiretivasModule
 * @name eduWidgetsContainer
 * @object directive
 *
 * @created 07/02/2017 v12.1.16
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies
 *
 * @restrict E
 *
 *
 * @description Diretiva para Container dos Widgets do Educacional
 *
 */
define(['diretivas/diretivas.module',
    'widgets/widget.factory',
    'widgets/widget.constants',
    'utils/edu-utils.factory'
], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduWidgetsContainer', EduWidgetsContainer);

    EduWidgetsContainer.$inject = [];

    /**
     * Diretiva para Container dos Widgets do Educacional
     * @returns {object} Diretiva angular
     */
    function EduWidgetsContainer() {

        var eduWidgetsContainerDirective = {
            restrict: 'E',
            scope: {
                containerTitle: '@', // titulo do container
                idFuncionalidade: '=' // Funcionalidade que os widgets estão vinculadas (notas, faltas, grade curricular, etc)
            },
            templateUrl: 'js/diretivas/edu-widgets-container.view.html',
            controller: EduWidgetsContainerController,
            controllerAs: 'objWidgetController',
            bindToController: true
        };

        return eduWidgetsContainerDirective;
    }

    EduWidgetsContainerController.$inject = ['$rootScope', '$scope', '$ocLazyLoad', 'i18nFilter',
        'eduWidgetsFactory', 'eduWidgetsConsts', 'eduUtilsFactory',
        '$sce'
    ];

    /**
     * Controller para a diretiva do Container para Widgets
     * @param {object} $rootScope        Escopo principal
     * @param {object} $scope            Escopo da diretiva
     * @param {object} $ocLazyLoad       Objeto para carregamento sob demanda
     * @param {object} i18nFilter        Objeto para traduções de idioma
     * @param {object} eduWidgetsFactory Objeto com os serviços de widgets
     * @param {object} eduWidgetsConsts  Objeto com constantes das funcionalidades e widgets
     * @param {object} eduUtilsFactory   Factory utilitária
     */
    function EduWidgetsContainerController($rootScope, $scope, $ocLazyLoad, i18nFilter,
        eduWidgetsFactory, eduWidgetsConsts, eduUtilsFactory,
        $sce) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        // Propriedades
        self.maxWidgets = 2; // Máximo de widgets no container
        self.blnOpen = false; // Se o container está visível
        self.blnLoaded1timeMural = false; // Se já carregou a lista de widgets a 1a vez quando for o mural
        self.blnMural = false; // Se Funcionalidade é mural
        self.blnEditMode = false; // Mode de edição
        self.objWidgetList = []; // Lista com todos widgets da funcionalidade
        self.objWidgetShowList = []; // Lista de widgets para exibir
        self.objWidgetMuralList = []; // Lista de widgets do Mural
        self.blnLoaded = false; // Verifica se o widget já está carregado
        self.blnVisualizar = false; // Verdadeiro se o usuário tem permissão para visualiar widgets
        self.blnPermiteEditar = false; // Verdadeiro se o usuário tem permissão para editar os widgets

        // *********************************************************************************
        // *** Public Methods
        // *********************************************************************************
        self.loadWidgets = loadWidgets;
        self.toggle = toggle;
        self.settings = settings;
        self.filter = filter;
        self.save = save;
        self.refresh = refresh;
        self.remove = remove;
        self.left = left;
        self.right = right;
        self.changeSize = changeSize;
        self.changeWidget = changeWidget;
        self.setFavorito = setFavorito;
        self.exibeBotaoFavoritos = exibeBotaoFavoritos;

        // *********************************************************************************
        // *** Initialize
        // *********************************************************************************
        init();

        /**
         * @private
         * @function Função de inicialização do controller
         */
        function init() {
            // Verifica permissões e troca de eventos
            loadListeners();
        }

        // *********************************************************************************
        // *** Public functions
        // *********************************************************************************

        /**
         * @public
         * @function Carrega os widgets
         * @name loadWidgets
         */
        function loadWidgets() {
            self.blnMural = (self.idFuncionalidade === eduWidgetsConsts.EduWidgetsFuncionalidade.Mural);
            self.objWidgetList = [];

            if (self.blnMural) {
                preencherWidgetsMural();
            } else {
                eduWidgetsFactory.getWidgets(self.idFuncionalidade, function(objResult) {
                    if (angular.isArray(objResult)) {
                        self.objWidgetList = objResult;
                        getWidgetsViewsControllers();
                        self.blnLoaded = true;
                    }
                });
            }
        }

        /**
         * @public
         * @function Visibilidade do container e mudança nos botões
         * @name toggle
         */
        function toggle() {
            if (self.blnOpen) {
                containerShow(false); // Container invisível
            } else {
                containerShow(true); // Container visivel
            }
        }

        /**
         * @public
         * @function Ativa/Desativa o mode de edição
         * @name settings
         */
        function settings() {
            self.blnEditMode = !self.blnEditMode;
        }

        /**
         * @public
         * @function Filtro para a lista de widgets que podem ser substituídos
         * @name filter
         * @param   {object}  objWidgetAtual Widget Atual
         * @returns {boolean} Verdadeiro se o widget estará na lista
         */
        function filter(objWidgetAtual) {

            return function(objWidgetByList) {
                // Se o widget da lista for igual ao widget atual ele consta na lista
                if (objWidgetAtual.IdConfiguracao === objWidgetByList.IdConfiguracao) {
                    return true;
                } else {
                    var result = $.grep(self.objWidgetShowList, function(e) {
                        return e.IdConfiguracao === objWidgetByList.IdConfiguracao;
                    });

                    // Se não encontrou o widget na lista de visíveis então deixa ele na lista
                    return (result.length === 0);
                }
            };
        }

        /**
         * @public
         * @function Salva a preferência do usuário
         * @name save
         */
        function save() {
            var objWidgetListToSave = [];
            var idConfigList = [];
            var blnVisivel = true;
            var ordem = 0;

            // Manipula os widgets escolhidos pelo usuário
            for (var i = 0; i < self.objWidgetShowList.length; i++) {
                ordem = alterOrder(self.objWidgetShowList[i], ordem);
                objWidgetListToSave.push(self.objWidgetShowList[i]);
                idConfigList.push(self.objWidgetShowList[i].IdConfiguracao);
                if (!self.objWidgetShowList[i].Visivel) {
                    blnVisivel = false;
                }
            }

            // Manipula os widgets disponiveis mas não escolhidos pelo usuário
            for (var j = 0; j < self.objWidgetList.length; j++) {
                if ($.inArray(self.objWidgetList[j].IdConfiguracao, idConfigList) < 0) {
                    ordem = alterOrder(self.objWidgetList[j], ordem);
                    self.objWidgetList[j].Visivel = blnVisivel;
                    objWidgetListToSave.push(self.objWidgetList[j]);
                }
            }

            eduWidgetsFactory.savePrefUser(objWidgetListToSave, function() {
                self.refresh();
            });
        }

        /**
         * @public
         * @function Realiza a atualização da página.
         * @name refresh
         */
        function refresh() {
            self.blnEditMode = false;
            self.loadWidgets();
        }

        /**
         * @public
         * @function Remove o widget
         * @name remove
         * @param {int} index Índice do widget na lista
         */
        function remove(index) {
            self.objWidgetShowList.splice(index, 1);
        }

        /**
         * @public
         * @function Move o widget para a esquerda
         * @name left
         * @param {int} index Índice do widget na lista
         */
        function left(index) {

            if (index < 0) {
                return;
            }

            self.objWidgetShowList.splice(index - 1, 0, angular.copy(self.objWidgetShowList[index]));
            self.objWidgetShowList.splice(index + 1, 1);
        }

        /**
         * @public
         * @function Move o widget para a direita
         * @name right
         * @param {int} index Índice do widget na lista
         */
        function right(index) {

            if (index + 1 >= self.objWidgetShowList.length) {
                return;
            }

            self.objWidgetShowList.splice(index + 2, 0, angular.copy(self.objWidgetShowList[index]));
            self.objWidgetShowList.splice(index, 1);
        }

        /**
         * @public
         * @function Aumenta/Diminui o tamanho do container do widget
         * @name changeSize
         * @param {int} index Índice do widget na lista
         */
        function changeSize(index) {
            var objWidget = self.objWidgetShowList[index];

            objWidget.Tamanho = objWidget.Tamanho === 'half' ? 'full' : 'half';

            self.objWidgetShowList[index] = angular.copy(objWidget);
        }

        /**
         * @public
         * @function Evento quando alterar o widget na lista
         * @name changeWidget
         * @param {object} objWidget Widget a ser substituído
         */
        function changeWidget(objWidget) {
            var idTarget = objWidget.IdConfiguracaoModel;
            var idSource = objWidget.IdConfiguracao;
            var objWidgetTarget = {};

            for (var i = 0; i < self.objWidgetList.length; i++) {
                if (self.objWidgetList[i].IdConfiguracao === idTarget) {
                    objWidgetTarget = self.objWidgetList[i];
                    objWidgetTarget.IdConfiguracaoModel = self.objWidgetList[i].IdConfiguracao;
                    break;
                }
            }

            for (var j = 0; j < self.objWidgetShowList.length; j++) {
                if (self.objWidgetShowList[j].IdConfiguracao === idSource) {
                    self.objWidgetShowList[j] = objWidgetTarget;
                    // Verifica se o widget já possui dados carregados
                    if (!self.objWidgetShowList[j].DadosWidget) {
                        loadWidgetData(self.objWidgetShowList[j]);
                    }

                    break;
                }
            }
        }

        /**
         * @public
         * @function Adiciona ou Remove o widget na lista de favoritos
         * @name setFavorito
         * @param {object}  objWidget   Objeto Widget
         * @param {boolean} blnFavorito Se verdadeiro adiciona nos favoritos
         */
        function setFavorito(objWidget, blnFavorito) {
            if (blnFavorito) {
                objWidget.OrdemFavorito = 0;
            } else {
                objWidget.OrdemFavorito = -1;
            }
        }

        // *********************************************************************************
        // *** Private functions
        // *********************************************************************************

        /**
         * @private
         * @function Obtém as views e controllers para os widgets
         * @name getWidgetsViewsControllers
         */
        function getWidgetsViewsControllers() {
            self.objWidgetShowList = [];
            var objControlArray = [];
            var objViewsArray = [];

            for (var i = 0; i < self.objWidgetList.length; i++) {
                // Seta o IdConfiguracaoModel para vir selecionado previamente na lista de widgets
                self.objWidgetList[i].IdConfiguracaoModel = self.objWidgetList[i].IdConfiguracao;

                // Se pelo menos um widget estiver visível abre-se o container
                if (self.objWidgetList[i].Visivel) {
                    self.blnOpen = true;
                }

                // Adiciona as views e controllers
                for (var key in eduWidgetsConsts.EduWidgets) {
                    // Se não existir a propriedade continua o loop
                    if (!eduWidgetsConsts.EduWidgets.hasOwnProperty(key)) {
                        continue;
                    }
                    var objWidgetConst = eduWidgetsConsts.EduWidgets[key];
                    if (self.objWidgetList[i].IdWidget === objWidgetConst.ID) {
                        objViewsArray[self.objWidgetList[i].IdConfiguracao] = objWidgetConst.VIEW; // guardam as views
                        objControlArray.push(objWidgetConst.CONTROLLER); // guardam os controllers
                        break;
                    }
                }
            }

            // Carregam os controllers
            loadWidgetsControllers(self.objWidgetList, objControlArray, objViewsArray, insertWidgetViews);
        }

        /**
         * @private
         * @function Carrega sob demanda os controllers dos widgets
         * @name loadWidgetsControllers
         * @param {Array}    objWidgetList   Lista de Widgets
         * @param {Array}    objControlArray Lista de Controllers dos widgets
         * @param {Array}    objViewsArray   Lista de Views dos widgets
         * @param {function} callback        Função chamada após os controllers serem carregados
         */
        function loadWidgetsControllers(objWidgetList, objControlArray, objViewsArray, callback) {
            // Carregam os controllers dos widgets
            $ocLazyLoad.load({
                name: 'eduWidgetsModule',
                files: objControlArray
            }).then(function() {
                callback(objWidgetList, objViewsArray);
            });
        }

        /**
         * @private
         * @function Insere as views aos widgets
         * @name insertWidgetViews
         * @param {Array} objWidgetList Lista de Widgets
         * @param {Array} objViewsArray Lista de Views
         */
        function insertWidgetViews(objWidgetList, objViewsArray) {
            self.objWidgetShowList = [];

            // Insere as views após os controllers serem carregados
            for (var k = 0; k < self.objWidgetList.length; k++) {
                if (angular.isDefined(objViewsArray[self.objWidgetList[k].IdConfiguracao])) {
                    self.objWidgetList[k].VIEW = objViewsArray[self.objWidgetList[k].IdConfiguracao];
                }

                // Verifica o máximo de widgets
                if (k < self.maxWidgets) {
                    self.objWidgetShowList.push(self.objWidgetList[k]);
                }
            }
        }

        /**
         * @private
         * @function Seta a visibilidade do container
         * @name containerShow
         * @param {int} intVisible Se igual a 1 container visível, senão invisível
         */
        function containerShow(blnVisivel) {
            angular.forEach(self.objWidgetShowList, function(objWidget) {
                objWidget.Visivel = blnVisivel;
            });

            self.blnOpen = blnVisivel;
            self.save();
        }

        /**
         * @private
         * @function Altera a ordem dos widgets
         * @name alterOrder
         * @param   {object} objWidget Objeto Widget
         * @param   {int}    intOrder  Última ordem adicionada
         * @returns {int}    Próxima ordem
         */
        function alterOrder(objWidget, intOrder) {
            if (self.blnMural) {
                if (objWidget.OrdemFavorito > 0) {
                    objWidget.OrdemFavorito = ++intOrder;
                } else {
                    objWidget.Ordem = ++intOrder;
                }
            } else {
                objWidget.Ordem = ++intOrder;
            }
            return intOrder;
        }

        /**
         * @private
         * @function Carrega os dados do widget
         * @name loadWidgetData
         * @param {object} objWidget Widget para carregar os dados
         */
        function loadWidgetData(objWidget) {
            eduWidgetsFactory.getWidgetData(objWidget.IdFuncionalidade, objWidget.IdWidget,
                function(objResult) {
                    if (objResult) {
                        objWidget.DadosWidget = objResult.DadosWidget;
                        var objViewsArray = [];
                        for (var i = 0; i < eduWidgetsConsts.EduWidgets.length; i++) {
                            if (objWidget.IdWidget === eduWidgetsConsts.EduWidgets[i].ID) {
                                objViewsArray[objWidget.IdConfiguracao] = eduWidgetsConsts.EduWidgets[i].VIEW;
                                loadWidgetsControllers([objWidget], [eduWidgetsConsts.EduWidgets[i].CONTROLLER],
                                    objViewsArray,
                                    insertViewInWidget);
                                break;
                            }
                        }
                    }
                });
        }

        /**
         * @private
         * @function Insere a view após a troca do widget
         * @name insertViewInWidget
         * @param {Array} objWidgetList Lista de Widgets
         * @param {Array} objViewsArray Lista de Views
         */
        function insertViewInWidget(objWidgetList, objViewsArray) {
            // Insere as views após os controllers serem carregados
            for (var k = 0; k < objWidgetList.length; k++) {
                if (angular.isDefined(objViewsArray[objWidgetList[k].IdConfiguracao])) {
                    objWidgetList[k].VIEW = objViewsArray[objWidgetList[k].IdConfiguracao];
                }
            }
        }

        /**
         * @private
         * @function Carrega a escuta de eventos
         * @name loadListeners
         */
        function loadListeners() {
            // Evento disparado quando se altera o período letivo
            $rootScope.$on('OnChangeCursoSelecionadoEmit:Event', function() {
                if (self.blnLoaded) {
                    self.blnLoaded = false;
                    self.loadWidgets();
                }
            });

            // Verifica as permissões gerais para os widgets
            var myWatch = $rootScope.$watch('objPermissions', function(data) {
                if (data !== null) {
                    self.blnVisualizar = angular.isDefined($rootScope.objPermissions.EDU_WIDGETS);
                    self.blnPermiteEditar = angular.isDefined($rootScope.objPermissions.EDU_WIDGETS_CONFIGURACAO);

                    // Carrega somente se tiver permissão
                    if (self.blnVisualizar) {
                        self.loadWidgets();
                    }

                    myWatch();
                }
            });
        }

        function configurarWidgetsMural() {

            if (self.exibirInformacoes) {
                self.maxWidgets = 3; // tamanho máximo para o mural com o widget "fake" de informações
            } else {
                self.maxWidgets = 4; // tamanho máximo para o mural
            }

            eduWidgetsFactory.getWidgetsFavoritos(function(objResult) {
                if (angular.isArray(objResult)) {

                    self.objWidgetList = objResult;
                    getWidgetsViewsControllers();
                    self.blnLoaded = true;

                    if (!self.blnLoaded1timeMural) {
                        self.blnLoaded1timeMural = true;
                        if (self.exibirInformacoes && self.objWidgetShowList.length === 0) {
                            // abre expandido se exibir informações e não possuir nenhum widget favorito
                            self.blnOpen = true;
                        }
                    }
                }
            });

        }

        /**
         * Texto com informações parametrizadas que devem ser exibidas no widget "fake" do Mural.
         */
        function preencherWidgetsMural() {

            eduUtilsFactory.getParametrosTOTVSEducacionalAsync(function(parametros) {

                if (parametros && parametros.InformacoesMural) {
                    self.informacoes = $sce.trustAsHtml(parametros.InformacoesMural);
                    self.exibirInformacoes = true;
                } else {
                    self.exibirInformacoes = false;
                }

                configurarWidgetsMural();
            });
        }

        function exibeBotaoFavoritos(widgetVisao) {
            var resultado = false;

            //Se a tela aberta for a de mural
            if (self.idFuncionalidade === 0) {

                //Exibe o botão de Favoritos (estrelinha) para os widgets que NÃO estão definidos para o mural (através da tela de configuração de widget por funcionalidade)
                //Mas que estão favoritados em qualquer outra tela. (para que o usuário possa retirar do mural)
                angular.forEach(self.objWidgetMuralList, function(objWidgetItem) {
                    if (objWidgetItem.IdWidget === widgetVisao.IdWidget &&
                        objWidgetItem.OrdemFavorito >= 0 &&
                        objWidgetItem.Visivel === true) {
                        resultado = true;
                    }
                });

                //Se for qualquer outra tela
            } else {

                //Oculta o botão de Favoritos (estrelinha) para os widget que ESTÃO definidos para o mural
                //(através da tela de configuração de widget por funcionalidade)
                resultado = true;
                angular.forEach(self.objWidgetMuralList, function(objWidgetItem) {
                    if (objWidgetItem.IdWidget === widgetVisao.IdWidget &&
                        objWidgetItem.IdFuncionalidade === 0 &&
                        objWidgetItem.Visivel === true) {
                        resultado = false;
                    }
                });
            }

            return resultado;
        }
    }
});