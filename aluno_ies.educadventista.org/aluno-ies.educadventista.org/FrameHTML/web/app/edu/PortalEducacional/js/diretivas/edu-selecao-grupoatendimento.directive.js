/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduSelecaoGrupoAtendimentoDirective
 * @object directive
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies $totvsresource, $compile
 *
 * @description Diretiva eduSelecaoGrupoAtendimentoDirective
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduSelecaoGrupoAtendimento', EduSelecaoGrupoAtendimentoDirective);

    EduSelecaoGrupoAtendimentoDirective.$inject = ['$totvsresource', '$compile'];


    function EduSelecaoGrupoAtendimentoDirective($totvsresource, $compile) {

        var eduSelecaoDirective = {
            restrict: 'E',
            scope: {
                ngModel: '=',
                ngChange: '=',
                label: '@',
                labelItemDefault: '@',
                refresh: '='
            },
            require: 'ngModel',
            link: link,
            retornaListaGruposAtendimentoSolicitados: retornaListaGruposAtendimentoSolicitados,
            template: '<label class="diretiva-campos-selecao">{{label}}</label>' +
                '<field type="combo"' +
                ' ng-model="ngModel"' +
                ' ng-options="item.CODGRUPOATENDIMENTO as item.NOME for item in eduSelecaoGrupoAtendimento">' +
                ' </field>' +
                '<br class="diretiva-campos-selecao-clear">'
        };

        return eduSelecaoDirective;

        //Função para manipulação do DOM (atributos, eventos, observadores)
        function link(scope, element, attrs, ctrl) {
            scope.$parent.eduSelecaoGrupoAtendimento = [];

            var fieldComboSelecao = element.find('field');

            scope.$parent.eduSelecaoGrupoAtendimento = retornaListaGruposAtendimento(scope.labelItemDefault);

            if (attrs.ngChange) {

                // Adiciona o observador na alteração do ngModel.
                scope.$watch('ngModel', function() {
                    // Retorna a disciplina selecionada.
                    var itemSelecionado = retornaObjetoSelecionado(scope.$parent.eduSelecaoGrupoAtendimento,
                        ctrl.$viewValue);

                    if (scope.ngChange) {
                        if (itemSelecionado.length === 0) {
                            scope.ngChange();
                        } else {
                            // Retorna o CODGRUPOATENDIMENTO na função do controller
                            scope.ngChange(itemSelecionado[0].CODGRUPOATENDIMENTO);
                        }
                    }
                });
            }

            scope.$watch('refresh', function(valor) {

                if (valor != undefined) {
                    if (valor == true)
                        scope.$parent.eduSelecaoGrupoAtendimento = retornaListaGruposAtendimentoSolicitados(scope.labelItemDefault);
                    else
                        scope.$parent.eduSelecaoGrupoAtendimento = retornaListaGruposAtendimento(scope.labelItemDefault);
                }
            });

            if (attrs.ngModel) {
                fieldComboSelecao.attr('ng-model', attrs.ngModel);
                element.removeAttr('ng-model');
            }

            if (attrs.label) {
                element.removeAttr('label');
            }

            if (!scope.ngModel && attrs.labelItemDefault) {
                // Se adicionou o item default, o seleciona
                ctrl.$setViewValue(-1);
            }

            $compile(fieldComboSelecao)(scope.$parent);

            ctrl.$render();
        }

        // Função que retorna o objeto em um array
        function retornaObjetoSelecionado(item, valorSelecionado) {
            return $.grep(item, function(e) {
                return (e.CODGRUPOATENDIMENTO === valorSelecionado);
            });
        }

        // Função que retorna a lista as item matriculadas de um aluno.
        function retornaListaGruposAtendimento(labelItemDefault) {
            var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Aluno/Solicitacao/GruposAtendimento',
                itens = [];

            if (labelItemDefault !== '') {
                // se informou o label do item default, adiciona este item na lista.
                var itemDefault = {
                    CODGRUPOATENDIMENTO: -1,
                    NOME: labelItemDefault
                };

                itens.push(itemDefault);
            }

            // Realiza a chamada REST
            $totvsresource.REST(url, {}, {}).TOTVSGet(function(result) {

                if (result && result['HGRUPOATENDIMENTO']) {
                    angular.forEach(result['HGRUPOATENDIMENTO'], function(value) {
                        itens.push(value);
                    });
                }
            });

            return itens;
        }

        // Função que retorna a lista as item matriculadas de um aluno.
        function retornaListaGruposAtendimentoSolicitados(labelItemDefault) {
            var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Aluno/Solicitacao/GruposAtendimentoSolicitados',
                itens = [];

            if (labelItemDefault !== '') {
                // se informou o label do item default, adiciona este item na lista.
                var itemDefault = {
                    CODGRUPOATENDIMENTO: -1,
                    NOME: labelItemDefault
                };

                itens.push(itemDefault);
            }

            // Realiza a chamada REST
            $totvsresource.REST(url, {}, {}).TOTVSGet(function(result) {

                if (result && result['HGRUPOATENDIMENTO']) {
                    angular.forEach(result['HGRUPOATENDIMENTO'], function(value) {
                        itens.push(value);
                    });
                }
            });

            return itens;
        }

    }
});