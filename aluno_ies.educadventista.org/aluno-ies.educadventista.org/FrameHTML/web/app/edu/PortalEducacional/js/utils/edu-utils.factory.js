/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['utils/edu-utils.module',
    'totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.factory',
], function() {

    'use strict';

    angular
        .module('eduUtilsModule')
        .factory('eduUtilsFactory', EduUtilsFactory);

    EduUtilsFactory.$inject = ['$totvsresource', '$rootScope', 'TotvsDesktopContextoCursoFactory', 'totvs.app-notification.Service', 'i18nFilter'];

    function EduUtilsFactory($totvsresource, $rootScope, TotvsDesktopContextoCursoFactory, totvsNotification, i18nFilter) {

        let self = this,
            url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional';

        self.getListaOcupacoesAsync = getListaOcupacoesAsync;
        self.getListaEstadosBRAsync = getListaEstadosBRAsync;
        self.getListaEstadosAsync = getListaEstadosAsync;
        self.getListaMunicipiosAsync = getListaMunicipiosAsync;
        self.getListaPaisesAsync = getListaPaisesAsync;
        self.getListaTiposResponsavelAsync = getListaTiposResponsavelAsync;
        self.getListaTiposParentescoAsync = getListaTiposParentescoAsync;
        self.getParametrosTOTVSGestaoPessoasAsync = getParametrosTOTVSGestaoPessoasAsync;
        self.getParametrosTOTVSFolhaPagamentoAsync = getParametrosTOTVSFolhaPagamentoAsync;
        self.getParametrosTOTVSEducacionalAsync = getParametrosTOTVSEducacionalAsync;
        self.getParametrosTOTVSEducacionalGeralAsync = getParametrosTOTVSEducacionalGeralAsync;
        self.getParametrosTOTVSFinanceiroAsync = getParametrosTOTVSFinanceiroAsync;
        self.getEnderecoCEPAsync = getEnderecoCEPAsync;
        self.getEnderecoRequisicaoAsync = getEnderecoRequisicaoAsync;
        self.getParametroGlobal = getParametroGlobal;
        self.getParametrosTOTVSCRMAsync = getParametrosTOTVSCRMAsync;
        self.externalLoginOnPge = externalLoginOnPge;
        self.getAuthParams = getAuthParams;
        self.useCache = true;

        return self;

        // Retorna lista do cadastro básico de ocupações
        function getListaOcupacoesAsync(callback) {
            let factory = getInstanciaFactory('/CadastroBasico/Ocupacao');
            return factory.TOTVSGet({}, callback);
        }

        // Retorna Retorna lista do cadastro básico de países
        function getListaPaisesAsync(callback) {
            let factory = getInstanciaFactory('/CadastroBasico/Pais');
            return factory.TOTVSGet({}, callback);
        }

        // Retorna Retorna lista do cadastro básico de estados (UF) do Brasil (exclusivamente)
        function getListaEstadosBRAsync(callback) {
            let factory = getInstanciaFactory('/CadastroBasico/EstadoBR');
            return factory.TOTVSGet({}, callback);
        }

        // Retorna Retorna lista do cadastro básico de estados (UF)
        function getListaEstadosAsync(idPAIS, callback) {
            let parametros = {};
            parametros.idPAIS = idPAIS;

            let factory = getInstanciaFactory('/CadastroBasico/Estado/:idPAIS');
            return factory.TOTVSGet(parametros, callback);
        }

        // Retorna lista do cadastro básico de municípios
        function getListaMunicipiosAsync(idPAIS, codETD, callback) {
            let parametros = {};
            parametros.idPAIS = idPAIS;
            parametros.codETD = codETD;

            let factory = getInstanciaFactory('/CadastroBasico/Municipio/:idPAIS/:codETD');
            return factory.TOTVSGet(parametros, callback);
        }

        // Retorna lista do cadastro básico de tipos de responsáveis
        function getListaTiposResponsavelAsync(callback) {
            let factory = getInstanciaFactory('/CadastroBasico/TipoResponsavel');
            return factory.TOTVSGet({}, callback);
        }

        // Retorna lista do cadastro básico de tipos de parentesco
        function getListaTiposParentescoAsync(callback) {
            let factory = getInstanciaFactory('/CadastroBasico/TipoParentesco');
            return factory.TOTVSGet({}, callback);
        }

        //Retorna alguns parâmetros do módulo Rhu - TOTVS Gestão de Pessoas, utilizado no TOTVS Educacional
        function getParametrosTOTVSGestaoPessoasAsync(callback) {
            let factory = getInstanciaFactory('/Parametrizacao/TotvsGestaoPessoas');
            return factory.TOTVSGet({}, callback);
        }

        //Retorna alguns parâmetros do módulo Fop - TOTVS Folha de Pagamento, utilizado no TOTVS Educacional
        function getParametrosTOTVSFolhaPagamentoAsync(callback) {
            let factory = getInstanciaFactory('/Parametrizacao/TotvsFolhaPagamento');
            return factory.TOTVSGet({}, callback);
        }

        //Retorna alguns parâmetros do módulo Fin - Totvs Financeiro, utilizados no TOTVS Educacional
        function getParametrosTOTVSFinanceiroAsync(callback) {
            let factory = getInstanciaFactory('/Parametrizacao/TotvsFinanceiro');
            return factory.TOTVSGet({}, callback);
        }

        //Retorna alguns parâmetros do módulo Edu - TOTVS Educacional
        function getParametrosTOTVSEducacionalAsync(callback) {
            let factory = getInstanciaFactory('/Parametrizacao/TotvsEducacional');

            if (angular.isDefined($rootScope.ListaContextosDisponiveisAluno) && $rootScope.ListaContextosDisponiveisAluno.length > 0) {

                let cursoAtual = TotvsDesktopContextoCursoFactory.getCursoSelecionado().cursoSelecionado;

                $rootScope.ListaContextosDisponiveisAluno.find(function(contexto) {
                    if (contexto.CodColigada === cursoAtual.CODCOLIGADA &&
                        contexto.CodFilial === cursoAtual.CODFILIAL &&
                        contexto.CodTipoCurso === cursoAtual.CODTIPOCURSO &&
                        contexto.IdPerlet === cursoAtual.IDPERLET &&
                        contexto.IdHabilitacaoFilial === cursoAtual.IDHABILITACAOFILIAL) {

                        if (!angular.isDefined(contexto['EduParams'])) {
                            factory.TOTVSGet({}, callback, {}, self.useCache).then(function(data) {
                                if (self.useCache === true) {
                                    self.useCache = !self.useCache;
                                }

                                contexto['EduParams'] = data;
                                return data;
                            });
                        } else {
                            if (angular.isFunction(callback)) {
                                callback(contexto['EduParams']);
                            }
                        }
                    }
                });
            }
        }

        // Retorna o endereço ip da requisição
        function getEnderecoRequisicaoAsync(callback) {
            let factory = getInstanciaFactory('/v1/GetEnderecoRequisicaoCliente');
            return factory.TOTVSGet({}, callback);
        }

        //Retorna o objeto factory a partir da URL padrão juntamento ao complemeto
        function getInstanciaFactory(urlComplemento) {
            let urlCompletaServico = url + urlComplemento;
            return $totvsresource.REST(urlCompletaServico, {}, {});
        }

        // Retorna informações do endereço a partir do CEP
        function getEnderecoCEPAsync(cep, callback) {
            let factory = getInstanciaFactory('/CadastroBasico/CEP');
            return factory.TOTVSQuery({
                'cep': cep
            }, callback);
        }

        // Retorna parametro global
        function getParametroGlobal(nomeCampo, callback) {
            let parametros = {};
            parametros.nomeCampo = nomeCampo;

            let factory = getInstanciaFactory('/Parametrizacao/Globais');
            return factory.TOTVSQuery(parametros, callback);
        }

        //Retorna alguns parâmetros do módulo TOTVS CRM, utilizado no TOTVS Educacional
        function getParametrosTOTVSCRMAsync(callback) {
            let factory = getInstanciaFactory('/Parametrizacao/TotvsCRM');
            return factory.TOTVSGet({}, callback);
        }

        function externalLoginOnPge(route, callback, ...params) {
            let factory = getInstanciaFactory('/TokenAcesso');
            return factory.TOTVSGet({}, (result) => {
                let alias = window.localStorage.getItem('aliasSelecionado');
                let baseURLPge = window.location.origin + EDUPS_CONST_GLOBAL_URL_PGE;

                if (EDU_CONST_GLOBAL_URL_PGE_CUSTOM && EDU_CONST_GLOBAL_URL_PGE_CUSTOM !== '/')
                    baseURLPge = `${window.location.origin}${EDU_CONST_GLOBAL_URL_PGE_CUSTOM}`;

                let url = `${baseURLPge}#/external-login/${alias}/${encodeURIComponent(result.TokenAcesso)}/${route}/${encodeURIComponent(result.IdContextAluno)}`

                params ? .forEach(param => {
                    if (param)
                        url = `${url}|${param}`;
                })

                $rootScope.externalPgeUrl = url;

                if (angular.isFunction(callback)) {
                    callback(result);
                }
            });
        }

        //Retorna o token de acesso
        function getAuthParams(callback) {
            let factory = getInstanciaFactory('/TokenAcesso');
            factory.TOTVSGet({}, (result) => {
                if (angular.isFunction(callback)) {
                    callback(result);
                }
            });
        }

        // Retorna parametros gerais do TOTVS Educacional
        function getParametrosTOTVSEducacionalGeralAsync(callback) {
            let factory = getInstanciaFactory('/Parametrizacao/v1/TotvsEducacional/Geral');
            return factory.TOTVSGet({}, callback);
        }
    }
});