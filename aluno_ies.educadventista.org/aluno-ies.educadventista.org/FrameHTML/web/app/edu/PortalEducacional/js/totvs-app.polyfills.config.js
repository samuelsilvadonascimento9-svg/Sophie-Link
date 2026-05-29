define([], function() {

    'use strict';

    /* jshint ignore:start */
    if (!Array.prototype.find) {

        Array.prototype.find = function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var list = Object(this),
                length = list.length >>> 0,
                thisArg = arguments[1],
                value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };

    }

    if (!String.prototype.replaceAllRegExp) {

        String.prototype.replaceAllRegExp = function(search, replacement) {

            if (this === null) {
                throw new TypeError('String.prototype.replaceAllRegExp invocado de uma string null or undefined!');
            }

            if (!search) {
                throw new TypeError('Expressão regular para pesquisa na string não foi informada!');
            }

            if (!replacement) {
                throw new TypeError('O conteúdo para substituição não foi informado!');
            }

            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
    }

    if (!String.prototype.replaceAllSplitAndJoin) {

        String.prototype.replaceAllSplitAndJoin = function(search, replacement) {

            if (this === null) {
                throw new TypeError('String.prototype.replaceAllSplitAndJoin invocado de uma null or undefined!');
            }

            if (!search) {
                throw new TypeError('O conteúdo para pesquisa na string não foi informado!');
            }

            if (!replacement) {
                throw new TypeError('O conteúdo para substituição não foi informado!');
            }

            var target = this;
            return target.split(search).join(replacement);
        };
    }

    /* jshint ignore:end */
});