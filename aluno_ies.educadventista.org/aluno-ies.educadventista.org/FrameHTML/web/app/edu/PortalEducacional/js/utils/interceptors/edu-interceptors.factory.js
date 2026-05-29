define(['utils/interceptors/edu-interceptors.module'], function() {

    'use strict';

    angular
        .module('eduInterceptorsModule')
        .factory('EduInterceptors', EduInterceptors);

    EduInterceptors.$inject = ['$q', '$window'];

    // *********************************************************************************
    // *** Factory
    // *********************************************************************************

    /**
     * Factory para interceptar as mensagens dos serviços REST
     * @param   {object} $q         Objeto para tratar as requisições e respostas
     * @param   {object} $window    Objeto window angular
     * @returns {object}            Factory interceptadora
     */
    function EduInterceptors($q, $window) {
        var factory = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        return factory;

        /**
         * Requisição OK
         * @param   {object} config Configurações da requisição
         * @returns {object} Objeto da requisição
         */
        function request(config) {

            if (!angular.isUndefined(config.headers) && config.headers !== null && config.url.includes('TOTVSFinanceiro')) {
                config.headers["x-totvs-app"] = EDU_PORTAL_LICENSE_SLOT;
            }
            return config || $q.when(config);
        }

        /**
         * Requisição com erro
         * @param   {object} rejection Requisição que ocorreu o erro
         * @returns {object} Objeto requisitado rejeitado
         */
        function requestError(rejection) {
            return $q.reject(rejection);
        }

        /**
         * Resposta OK
         * @param   {object} response Objeto de resposta
         * @returns {object} Objeto de resposta
         */
        function response(response) {
            if (response) {
                if (angular.isDefined(response['RMException:StackTrace'])) {
                    console.error(response['RMException:StackTrace']);
                }

                if (!!response['data'] && angular.isDefined(response['data']) && angular.isDefined(response['data']['RMException:StackTrace'])) {
                    console.error(response['data']['RMException:StackTrace']);
                }
            }

            return response;
        }

        /**
         * Resposta com erro
         * @param   {object} rejection Resposta que ocorreu o erro
         * @returns {object} Objeto de resposta rejeitado
         */
        function responseError(rejection) {
            var statusUnauthorized = 401;
            if (rejection.status === statusUnauthorized) {
                $window.location.href = $window.location.href.split('#')[0] + 'login?sessaoexpirada=true';
            }
            return $q.reject(rejection);
        }
    }
});