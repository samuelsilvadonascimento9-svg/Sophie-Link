/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduFileModelDirective
 * @object directive
 *
 * @created 2016-09-05 v12.1.15
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies $totvsresource, $compile
 *
 * @description Diretiva eduFileModelDirective
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduFileModel', EduFileModelDirective);

    EduFileModelDirective.$inject = ['$parse'];

    function EduFileModelDirective($parse) {

        var eduSelecaoDirective = {
            restrict: 'A',
            link: link
        };

        return eduSelecaoDirective;

        //Função para manipulação do DOM (atributos, eventos, observadores)
        function link(scope, element, attrs) {

            var model = $parse(attrs.eduFileModel),
                modelSetter = model.assign;

            element.bind('change', function() {

                scope.$apply(function() {

                    modelSetter(scope, element[0].files[0]);

                });
            });
        }
    }
});