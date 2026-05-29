/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduSelecaoEtapaDirective
 * @object directive
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies $totvsresource, $compile
 *
 * @description Diretiva EduSelecaoEtapa
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduSelecaoEtapa', EduSelecaoEtapaDirective);

    EduSelecaoEtapaDirective.$inject = ['$totvsresource', '$compile'];

    /********************************************************************
                        Diretiva EduSelecaoEtapa
    *********************************************************************/
    function EduSelecaoEtapaDirective($totvsresource, $compile) {

        var eduSelecaoDirective = {
            restrict: 'E',
            scope: {
                ngModel: '=',
                ngChange: '=',
                label: '@',
                labelItemDefault: '@',
                tipoetapa: '@',
                idturmadisc: '='
            },
            require: 'ngModel',
            link: link,
            template: '<field type="combo"' +
                ' ng-model="ngModel"' +
                ' ng-disabled="eduSelecaoEtapas.length <= 1"' +
                ' ng-options="etapas.CODETAPA as etapas.DESCRICAO for etapas in eduSelecaoEtapas">' +
                ' </field>'
        };

        return eduSelecaoDirective;

        //Função para manipulação do DOM (atributos, eventos, observadores)
        function link(scope, element, attrs, ctrl) {

            scope.$parent.eduSelecaoEtapas = [];
            var fieldComboSelecao = element.find('field'),
                parameters = {};

            parameters['tipoEtapaTurmaDisc'] = scope.tipoetapa;
            parameters['idTurmaDisc'] = scope.idturmadisc;

            scope.$parent.eduSelecaoEtapas = retornaListaEtapas(parameters, attrs.labelItemDefault);

            if (attrs.ngChange) {

                // Adiciona o observador na alteração do ngModel.
                scope.$watch('ngModel', function() {

                    // Retorna o Etapa selecionado.
                    var etapaSelecionado = retornaObjetoSelecionado(scope.$parent.eduSelecaoEtapas,
                        ctrl.$viewValue);

                    if (etapaSelecionado.length === 0) {
                        scope.ngChange();
                    } else {
                        // Retorna a descrição e o objeto da etapa na função do controller
                        scope.ngChange(etapaSelecionado[0].DESCRICAO, etapaSelecionado[0]);
                    }
                });
            }

            scope.$watch('idturmadisc', function(valor) {

                if (valor && valor !== -1) {

                    var parameters = {};
                    parameters['tipoEtapaTurmaDisc'] = scope.tipoetapa;
                    parameters['idTurmaDisc'] = valor;

                    scope.$parent.eduSelecaoEtapas = retornaListaEtapas(parameters, attrs.labelItemDefault);
                } else {
                    scope.$parent.eduSelecaoEtapas = [];
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

            $compile(fieldComboSelecao)(scope.$parent);

            if (attrs.labelItemDefault) {
                // Se adicionou o item default, o seleciona
                scope.$parent.labelItemDefault = attrs.labelItemDefault;
                ctrl.$setViewValue(-1);
            }
            ctrl.$render();
        }

        // Função que retorna o objeto em um array
        function retornaObjetoSelecionado(etapas, valorSelecionado) {
            return $.grep(etapas, function(e) {
                return e.CODETAPA === valorSelecionado;
            });
        }

        function retornarItemDefault(label) {
            return {
                CODETAPA: -1,
                DESCRICAO: label
            };
        }

        // Função que retorna a lista as Etapas de uma Turma/Disciplina
        function retornaListaEtapas(parametros, labelItemDefault) {
            var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/EtapasTurmaDisc',
                etapas = [];

            // Realiza a chamada REST
            $totvsresource.REST(url, {}, {}).TOTVSQuery(parametros, function(result) {

                if (labelItemDefault && result.length > 0) {
                    // se informou o label do item defacul, adiciona o item default quando
                    // a lista tiver mais de 1 item
                    etapas.push(retornarItemDefault(labelItemDefault));
                }

                angular.forEach(result, function(value) {
                    etapas.push(value);
                });
            });

            return etapas;
        }
    }
});