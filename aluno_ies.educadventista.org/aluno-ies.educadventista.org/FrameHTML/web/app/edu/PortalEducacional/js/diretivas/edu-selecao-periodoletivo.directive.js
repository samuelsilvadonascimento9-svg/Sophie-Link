/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

define(['diretivas/diretivas.module', 'diretivas/edu-selecao-periodoletivo.factory'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduSelecaoPeriodoletivo', EduSelecaoPeriodoletivoDirective);

    EduSelecaoPeriodoletivoDirective.$inject = [
        '$rootScope',
        '$compile',
        'TotvsDesktopContextoCursoFactory',
        'eduSelecaoPeriodoletivoFactory'
    ];

    /********************************************************************
                        Diretiva eduSelecaoPeriodoletivo
    *********************************************************************/
    function EduSelecaoPeriodoletivoDirective($rootScope, $compile, TotvsDesktopContextoCursoFactory,
        EduSelecaoPeriodoletivoFactory) {
        var eduSelecaoDirective = {
            restrict: 'E',
            scope: {
                ngModel: '=',
                ngChange: '=',
                ngDisabled: '@',
                label: '@'
            },
            require: 'ngModel',
            link: link,
            template: '<field type="combo"' +
                ' ng-model="ngModel"' +
                ' ng-disabled="ngDisabled"' +
                ' class="periodo-letivo" ' +
                ' ng-options="periodos.IDPERLET as periodos.CODPERLET  for periodos in eduSelecaoPeriodos">' +
                ' </field>'
        };

        return eduSelecaoDirective;

        //Função para manipulação do DOM (atributos, eventos, observadores)
        function link(scope, element, attrs, ctrl) {
            scope.$parent.eduSelecaoPeriodos = [];
            var fieldComboSelecao = element.find('field'),
                contexto = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

            if (contexto) {

                scope.$parent.eduSelecaoPeriodos = retornaListaPeriodos();

                if (attrs.ngChange) {
                    // Adiciona o observador na alteração do ngModel.
                    scope.$watch('ngModel', function() {
                        // Retorna o periodo selecionado.
                        var periodoSelecionado = retornaObjetoSelecionado(scope.$parent.eduSelecaoPeriodos,
                            ctrl.$viewValue);

                        if (scope.ngChange) {
                            if (periodoSelecionado.length === 0) {
                                scope.ngChange();
                            } else // Retorna o CODPERLET na função do controller
                            {
                                var cursoAlteracao = TotvsDesktopContextoCursoFactory.getCursoSelecionado();

                                var contextoSelecionado = null;
                                if (angular.isArray($rootScope.ListaContextosDisponiveisAluno)) {

                                    contextoSelecionado = $rootScope.ListaContextosDisponiveisAluno.find(function(contexto) {
                                        if (contexto.CodColigada === cursoAlteracao.cursoSelecionado.contexto.CodColigada &&
                                            contexto.RA === cursoAlteracao.cursoSelecionado.contexto.RA &&
                                            contexto.CodFilial === cursoAlteracao.cursoSelecionado.contexto.CodFilial &&
                                            contexto.CodTipoCurso === cursoAlteracao.cursoSelecionado.contexto.CodTipoCurso &&
                                            contexto.IdHabilitacaoFilial === cursoAlteracao.cursoSelecionado.contexto.IdHabilitacaoFilial &&
                                            contexto.IdPerlet === periodoSelecionado[0].IDPERLET) {
                                            return contexto;
                                        }
                                    });
                                }

                                //Realiza a gravação de alteração do IDPERLET no cookie de contexto
                                cursoAlteracao.cursoSelecionado.IDPERLET = periodoSelecionado[0].IDPERLET;
                                cursoAlteracao.cursoSelecionado.contexto.IDPERLET = periodoSelecionado[0].IDPERLET;

                                if (contextoSelecionado) {
                                    //Utilização da propriedade controle, para tratamento de legado, uma veze que
                                    //a propriedade "Controle" foi renomeada para "IdContextoAluno"
                                    if (contextoSelecionado.Controle) {
                                        cursoAlteracao.cursoSelecionado.contexto.Controle = contextoSelecionado.IdContextoAluno;
                                    } else {
                                        cursoAlteracao.cursoSelecionado.contexto.IdContextoAluno = contextoSelecionado.IdContextoAluno;
                                    }
                                }

                                TotvsDesktopContextoCursoFactory.selecionarCurso(cursoAlteracao.cursoSelecionado, false, function() {
                                    scope.ngChange(periodoSelecionado[0].CODPERLET);
                                    // Atualiza o menu
                                    $rootScope.$broadcast('OnChangeCursoSelecionadoEmit:Event', {});
                                });
                            }
                        }
                    });
                }

                if (attrs.ngModel) {
                    fieldComboSelecao.attr('ng-model', attrs.ngModel);
                    element.removeAttr('ng-model');
                }

                if (attrs.label) {
                    fieldComboSelecao.attr('label', scope.label);
                    element.removeAttr('label');
                }

                if (attrs.ngDisabled) {
                    fieldComboSelecao.attr('ng-disabled', attrs.ngDisabled);
                    element.removeAttr('ngDisabled');
                }

                $compile(fieldComboSelecao)(scope.$parent);

                // Seleciona o período de acordo com o contexto
                ctrl.$setViewValue(contexto.cursoSelecionado.IDPERLET);
                ctrl.$render();
            }
        }

        // Função que retorna o objeto em um array
        function retornaObjetoSelecionado(periodos, valorSelecionado) {
            return $.grep(periodos, function(e) {
                return e.IDPERLET === valorSelecionado;
            });
        }

        // Função que retorna a lista de períodos do aluno
        function retornaListaPeriodos() {
            var periodos = [];

            EduSelecaoPeriodoletivoFactory.getPeriodos(function(result) {
                angular.forEach(result, function(value) {
                    periodos.push(value);
                });
            });

            return periodos;
        }
    }
});