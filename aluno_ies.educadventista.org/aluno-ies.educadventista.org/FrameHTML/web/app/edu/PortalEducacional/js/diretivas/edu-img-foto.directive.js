/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module diretivasModule
 * @name eduImgFoto
 * @object directive
 *
 * @created 07/10/2016 v12.1.15
 * @updated
 *
 * @requires diretivas.module
 *
 * @dependencies
 *
 * @description Diretiva para Fotos
 */
define(['diretivas/diretivas.module'], function() {

    'use strict';

    angular.module('eduDiretivasModule').directive('eduImgFoto', eduImgFotoDirective);

    eduImgFotoDirective.$inject = [];

    /********************************************************************
                        Diretiva eduImgFoto
    *********************************************************************/
    function eduImgFotoDirective() {

        var eduImgFotoDirective = {
            restrict: 'E',
            scope: {
                src: '=',
                srcOriginal: '=',
                defaultSrc: '@',
                cssClass: '@',
                alt: '@'
            },
            template: '<img class="media-object {{cssClass}}" ' +
                'data-ng-src="{{(src) ? (\'data:image/png;base64,\' + src) : defaultSrc}}" ' +
                'alt="{{ alt }}" />',
            link: link
        };

        return eduImgFotoDirective;

        function link(scope, element, attrs) {
            var lightbox = '';
            if (angular.isDefined(scope.srcOriginal) && scope.srcOriginal.length > 0) {
                lightbox = angular.element('<a href="data:image/png;base64,' + scope.srcOriginal + '" data-lightbox="' + scope.alt + '"></a>');
                var img = element.find('img');
                lightbox.html(img);
                element.html(lightbox);
            }

            element.find('img').bind('error', function() {
                if (attrs.src != attrs.defaultSrc) {
                    angular.element(this).attr('src', attrs.defaultSrc);
                }
            });
        }
    }
});