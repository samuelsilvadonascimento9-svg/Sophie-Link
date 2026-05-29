/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.23
 * (c) 2019-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduselecaoturmadisciplinaDirective
 * @object directive
 *
 * @created 2019-04-01 v12.1.23
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies $totvsresource, $compile
 *
 * @description Diretiva eduDiretivaTurmaDisciplina versão melhorada da EduSelecaoTurmaDisciplina.
 * @description Usar essa diretiva !!! a outra contem brechas quando vinculada ao periodo letivo.
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduDiretivaTurmaDisciplina', eduDiretivaTurmaDisciplina);

    eduDiretivaTurmaDisciplina.$inject = ['$totvsresource', '$compile'];

    /********************************************************************
                        Diretiva eduselecaoturmadisciplina  
    *********************************************************************/
    function eduDiretivaTurmaDisciplina($totvsresource, $compile) {

        var eduSelecaoDirective = {
            restrict: 'E',
            scope: {
                ngModel: '=',
                ngChange: '=',
                label: '@',
                labelItemDefault: '@',
                refresh: '=',
                mostraApenasDiscEmCurso: '='
            },
            require: 'ngModel',
            link: link,
            template: ' <field type="combo"' +
                ' ng-model="ngModel"' +
                ' ng-options="disciplinas.IDTURMADISC as disciplinas.NOMEDISCIPLINA for disciplinas in listaTurmasDisciplinas">' +
                ' </field>'
        };

        return eduSelecaoDirective;

        //Função para manipulação do DOM (atributos, eventos, observadores)
        function link(scope, element, attrs, ctrl) {
            scope.$parent.listaTurmasDisciplinas = [];
            var fieldComboSelecao = element.find('field');

            retornaListaDisciplinas(scope.labelItemDefault, scope.mostraApenasDiscEmCurso, ctrl, function(disciplinas) {
                scope.$parent.listaTurmasDisciplinas = disciplinas;

                if (attrs.ngChange) {
                    // Adiciona o observador na alteração do ngModel.
                    scope.$watch('ngModel', function(newValue, oldValue) {

                        // Retorna a disciplina selecionada.
                        var turmaDiscSelecionado = retornaObjetoSelecionado(scope.$parent.listaTurmasDisciplinas,
                            ctrl.$viewValue);

                        if (scope.ngChange) {
                            if (turmaDiscSelecionado.length === 0) {
                                scope.ngChange();
                            } else {
                                // Retorna o IDTURMADISC na função do controller
                                scope.ngChange(turmaDiscSelecionado[0].IDTURMADISC, turmaDiscSelecionado[0].IDTURMADISCMISTA);
                            }
                        }
                    });
                }
            });

            scope.$watch('refresh', function(valor) {
                if (valor === true) {
                    scope.$parent.listaTurmasDisciplinas = retornaListaDisciplinas(scope.labelItemDefault, scope.mostraApenasDiscEmCurso, ctrl,
                        function(disciplinas) {
                            scope.$parent.listaTurmasDisciplinas = disciplinas;
                            scope.refresh = false;
                        });
                }
            });

            scope.$watch('mostraApenasDiscEmCurso', function(value) {
                if (value) {
                    scope.$parent.listaTurmasDisciplinas = retornaListaDisciplinas(scope.labelItemDefault, value, ctrl,
                        function(disciplinas) {
                            scope.$parent.listaTurmasDisciplinas = disciplinas;
                        });
                }
            });

            if (attrs.ngModel) {
                fieldComboSelecao.attr('ng-model', attrs.ngModel);
                element.removeAttr('ng-model');
            }

            if (attrs.label) {
                fieldComboSelecao.attr('label', scope.label);
                element.removeAttr('label');
            }

            if (attrs.mostraApenasDiscEmCurso) {
                fieldComboSelecao.attr('ignora-disc-em-curso', scope.mostraApenasDiscEmCurso);
                element.removeAttr('ignora-disc-em-curso');
            }

            if (!scope.ngModel && attrs.labelItemDefault) {
                // Se adicionou o item default, o seleciona
                ctrl.$setViewValue(-1);
            }

            $compile(fieldComboSelecao)(scope.$parent);

            ctrl.$render();
        }

        // Função que retorna o objeto em um array
        function retornaObjetoSelecionado(disciplinas, valorSelecionado) {
            return $.grep(disciplinas, function(e) {
                return (e.IDTURMADISC == valorSelecionado);
            });
        }

        // Função que retorna a lista as Disciplinas matriculadas de um aluno.
        function retornaListaDisciplinas(labelItemDefault, mostraApenasDiEmCurso, ctrl, callback) {
            var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/DisciplinasAlunoPeriodoLetivo',
                disciplinas = [],
                selecionarPrimeiroItem = true;

            if (mostraApenasDiEmCurso === undefined) {
                mostraApenasDiEmCurso = false;
            }

            var params = {
                mostraApenasDiscEmCurso: mostraApenasDiEmCurso
            };

            // Realiza a chamada REST
            $totvsresource.REST(url, params, {}).TOTVSQuery(function(result) {
                if (labelItemDefault !== '' && labelItemDefault !== undefined) {
                    // se informou o label do item default, adiciona este item na lista.
                    var itemDefault = {
                        IDTURMADISC: -1,
                        NOMEDISCIPLINA: labelItemDefault
                    };

                    disciplinas.push(itemDefault);
                    selecionarPrimeiroItem = false;
                }

                angular.forEach(result, function(value) {
                    value["NOMEDISCIPLINA"] = value.NOME + ' (' + value.CODDISC + ')';
                    disciplinas.push(value);
                });

                if (selecionarPrimeiroItem && ctrl !== null) {
                    // Seleciona o primeiro item
                    if (disciplinas.length > 0) {
                        ctrl.$setViewValue(disciplinas[0].IDTURMADISC);
                        ctrl.$render();
                    }
                }

                if (angular.isFunction(callback)) {
                    callback(disciplinas);
                }
            });
            return disciplinas;
        }
    }
});