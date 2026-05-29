/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name eduFinanceiroService
 * @object service
 *
 * @created 2016-10-13 v12.1.15
 * @updated
 *
 * @requires
 *
 * @description Service utilizada para retornar informações financeiras do aluno
 */

define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.factory',
    'utils/edu-utils.module',
    'utils/edu-utils.service',
    'utils/edu-utils.factory',
    'utils/edu-enums.constants'
], function() {

    'use strict';

    angular
        .module('eduFinanceiroModule')
        .service('EduFinanceiroService', EduFinanceiroService);

    EduFinanceiroService.$inject = ['$filter',
        '$window',
        'TotvsDesktopContextoCursoFactory',
        'EduFinanceiroFactory',
        'EduPaymentsFactory',
        'eduRelatorioService',
        'i18nFilter',
        'totvs.app-notification.Service',
        'eduEnumsConsts'
    ];

    function EduFinanceiroService($filter,
        $window,
        TotvsDesktopContextoCursoFactory,
        EduFinanceiroFactory,
        EduPaymentsFactory,
        eduRelatorioService,
        i18nFilter,
        appNotificationService,
        eduEnumsConsts) {

        // *********************************************************************************
        // *** Variáveis
        // *********************************************************************************
        var paramEdu = {},
            objInfoBoleto = [];

        var self = this;
        self.retornarBeneficios = retornarBeneficios;
        self.visualizarBoleto = visualizarBoleto;
        self.visualizarBoletoSegundaVia = visualizarBoletoSegundaVia;
        self.visualizarBoletoMatricula = visualizarBoletoMatricula;
        self.visualizarRecibo = visualizarRecibo;
        self.visualizarPix = visualizarPix;
        self.visualizarPixMultiBoletos = visualizarPixMultiBoletos;
        self.permitePagamentoCartao = permitePagamentoCartao;
        self.permiteImpressaoRecibo = permiteImpressaoRecibo;
        self.permitePagamentoBoleto = permitePagamentoBoleto;
        self.permitePagamentoPix = permitePagamentoPix;
        self.copiarCodBarras = copiarCodBarras;
        self.existemBeneficios = existemBeneficios;
        self.retornaArrayBoleto = retornaArrayBoleto;
        self.validaCodigoIpte = validaCodigoIpte;

        // *********************************************************************************
        // *** Propriedades públicas e métodos
        // *********************************************************************************

        /**
         * Retorna lista de benefícios do aluno
         *
         * @param {any} callback - Função de callback
         */
        function retornarBeneficios(callback) {
            var listaBeneficios = [];

            EduFinanceiroFactory.buscarBeneficios(function(resultado) {
                if (resultado) {
                    resultado.SBolsaAluno.forEach(function(dadosBeneficio) {
                        listaBeneficios.push(new Bolsa(dadosBeneficio));
                    });
                }

                if (typeof callback === 'function') {
                    callback(listaBeneficios);
                }

            });
        }

        /**
         * Objeto Bolsa
         *
         * @param {any} dados - Dados para carregar bolsa
         */
        function Bolsa(dados) {

            this.descricao = dados.BOLSA;
            this.codServico = dados.CODSERVICO;
            this.servico = dados.SERVICO;
            this.tipoDesconto = dados.TIPODESC;
            this.valorDesconto = dados.DESCONTO;
            this.codContrato = dados.CODCONTRATO;
            this.parcelaInicial = dados.PARCELAINICIAL;
            this.parcelaFinal = dados.PARCELAFINAL;
            this.dataInicial = dados.DTINICIO;
            this.dataFinal = dados.DTFIM;
            this.valorMaximo = dados.TETOVALOR;
            this.dataAutorizacao = dados.DATAAUTORIZACAO;
            this.dataConcessao = dados.DATACONCESSAO;
            this.dataCancelamento = dados.DATACANCELAMENTO;
            this.usuarioCancelamento = dados.CODUSUARIOCANCEL;
            this.motivoCancelamento = dados.MOTIVOCANCELAMENTO;
            this.ativa = dados.ATIVA;
            this.retroativa = dados['BOLSARETROATIVA'] && dados.BOLSARETROATIVA === eduEnumsConsts.EduSimOuNaoEnum.Sim;

            this.getValorDesconto = function() {
                if (this.tipoDesconto === 'P') {
                    return this.valorDesconto + '%';
                } else {
                    return $filter('currency')(this.valorDesconto);
                }
            };
        }

        /**
         * Verifica se o aluno possui benefício
         *
         * @param {any} callback - Função de callback
         */
        function existemBeneficios(callback) {
            retornarBeneficios(function(listaBeneficios) {
                var existemBeneficios = listaBeneficios.length > 0;
                callback(existemBeneficios);
            });
        }

        /**
         * Visualizar boleto
         *
         * @param {Number} idBoleto Id. do boleto
         * @param {String} nossoNumero Nosso número
         * @param {Date} dtVencimento Data de vencimento do boleto
         * @param {Object} paramEdu Parâmetros do educacional
         * @param {any} callback Função de retorno com informações do boleto
         */
        function visualizarBoleto(idBoleto, nossoNumero, dtVencimento, paramsEdu, callback) {
            paramEdu = paramsEdu;

            EduFinanceiroFactory.geraSegundaVia(idBoleto, nossoNumero, dtVencimento, function(result) {

                validacoesPosBoleto(result, paramEdu);

                if (angular.isFunction(callback)) {
                    callback(objInfoBoleto);
                }
            });
        }

        /**
         * Visualizar boleto
         *
         * @param {Number} idBoleto Id. do boleto
         * @param {String} nossoNumero Nosso número
         * @param {Date} dtVencimento Data de vencimento do boleto
         * @param {Object} paramEdu Parâmetros do educacional
         * @param {any} callback Função de retorno com informações do boleto
         */
        function visualizarBoletoSegundaVia(codColigada, idBoleto, nossoNumero, dtVencimento, paramsEdu, callback) {

            EduFinanceiroFactory.geraSegundaViaExtratoFinanceiroNovo(codColigada, idBoleto, nossoNumero, dtVencimento, "PDF", function(result) {

                validacoesPosBoleto(result, paramEdu);

                if (angular.isFunction(callback)) {
                    callback(objInfoBoleto);
                }
            });

        }

        /**
         * Visualizar boleto
         *
         * @param {Number} idBoleto Id. do boleto
         * @param {String} nossoNumero Nosso número
         * @param {Date} dtVencimento Data de vencimento do boleto
         * @param {Object} paramEdu Parâmetros do educacional
         * @param {any} callback Função de retorno com informações do boleto
         */
        function visualizarBoletoMatricula(idBoleto, nossoNumero, dtVencimento, paramsEdu, idPerlet, callback) {
            paramEdu = paramsEdu;

            EduFinanceiroFactory.geraSegundaViaMatricula(idBoleto, nossoNumero, dtVencimento, idPerlet, function(result) {

                validacoesPosBoleto(result, paramEdu);

                if (angular.isFunction(callback)) {
                    callback(objInfoBoleto);
                }
            });
        }

        /**
         * Visualizar recibo
         * @param {Number} idBoleto
         */
        function visualizarRecibo(idBoleto, callback) {

            EduFinanceiroFactory.gerarRecibo(idBoleto, function(result) {

                let objRecibo = {};

                if (result && result[0].Bytes) {
                    objRecibo = result[0].Bytes;
                    eduRelatorioService.exibirOuSalvarPDF(result[0].Bytes);
                }

                if (angular.isFunction(callback)) {
                    callback(objRecibo);
                }

            });
        }

        /**
         * Verifica se o objeto isDefined e diferente de nulo
         * @param {any} objeto objeto a ser validado
         * @returns
         */
        function isDefinedNotNull(objeto) {
            return (angular.isDefined(objeto) && objeto !== null);
        }

        /**
         * Visualizar o QRCode do Pix conforme o resumo de pagamento
         * @param {Object} resultResumoPagamento Resumo de pagamento (cálculo liquido)
         */
        function visualizaQRCodePix(resultResumoPagamento) {

            let codColigada = resultResumoPagamento.RESUMOPAGTO[0].bankBilletsList[0].companyCode,
                codFilial = resultResumoPagamento.RESUMOPAGTO[0].bankBilletsList[0].branchCode,
                valorTotal = 0,
                boletos = [];

            angular.forEach(resultResumoPagamento.RESUMOPAGTO, function(resumo) {
                valorTotal += resumo.paymentNetTotalAmount;
                boletos.push(resumo.bankBilletsList[0].bankBilletCode);
            });

            let listaBoletos = {
                codColigada,
                codFilial,
                valorTotal,
                boletos
            };
            EduFinanceiroFactory.exibirDadosPix(listaBoletos);
        }

        /**
         * Visualizar dados para pagamento com Pix
         * @param {Object} codColigada Coligada
         * @param {Object}  idBoleto Id. Boleto
         */
        function visualizarPix(codColigada, idBoleto) {

            let listaBoletos = new Array();
            let dadosBoleto = `${codColigada}|${idBoleto}`;
            listaBoletos.push(dadosBoleto);

            getResumoPagamento(listaBoletos);
        }

        /**
         * Visualizar dados para pagamento com vários boletos por Pix
         * @param {Object}  listaBoletos Lista de boletos
         */
        function visualizarPixMultiBoletos(listaBoletos, paymentsSummary, tipoUsuarioPortalAluno) {
            getResumoPagamento(listaBoletos, paymentsSummary, tipoUsuarioPortalAluno);
        }

        /**
         * Visualizar dados para pagamento com vários boletos por Pix
         * @param {Object}  listaBoletos Lista de boletos
         */
        function getResumoPagamento(listaBoletos, paymentsSummary, tipoUsuarioPortalAluno, callback) {
            if (paymentsSummary) {
                visualizarDadosPix(paymentsSummary, callback);
            } else {
                EduPaymentsFactory.getResumoPagamentoMultiplosBoletos(listaBoletos, eduEnumsConsts.PaymentsFormaPgtoCalcLiquido.Pix, tipoUsuarioPortalAluno,
                    function(resultResumoPagamento) {
                        visualizarDadosPix(resultResumoPagamento, callback)
                    });
            }
        }

        function visualizarDadosPix(resultResumoPagamento, callback) {
            if (isDefinedNotNull(resultResumoPagamento)) {
                visualizaQRCodePix(resultResumoPagamento);
            } else {

                appNotificationService.notify({
                    type: 'error',
                    title: i18nFilter('l-mensagem-pagamento-pix-titulo', [], 'js/aluno/financeiro/lancamentos'),
                    detail: i18nFilter('l-mensagem-erro-calculo-valor-qrcode-pix', [], 'js/aluno/financeiro/lancamentos')
                });
            }

            if (angular.isFunction(callback)) {
                callback(resultResumoPagamento);
            }
        }

        function validaCodigoIpte(codigoIpte) {
            if (codigoIpte !== null && codigoIpte.trim() !== '') {
                return codigoIpte
            } else {
                appNotificationService.notify({
                    type: 'error',
                    detail: i18nFilter('l-mensagem-error-gerar-cod-barras', [], 'js/aluno/financeiro')
                });
            }
        }

        /**
         * Verifica se permite pagamento com cartão para o boleto
         *
         * @param {Obeject} objBoleto Boleto
         * @param {Object} paramsEdu Parâmetros do educacional
         * @returns {Boolean} Boleto pode ser pago com cartão
         */
        function permitePagamentoCartao(objBoleto, paramsEdu) {
            return servicoPermitePagamentoComCartao(objBoleto) &&
                !(paramsEdu.IntegradoProtheus && paramsEdu.LegadoIntegracaoProtheus === '1') &&
                (eduEnumsConsts.StatusBoletoEnum.EmAberto == objBoleto.STATUSBOLETO || objBoleto.STATUSBOLETO == eduEnumsConsts.StatusBoletoEnum.BaixadoParcialmente) &&
                (eduEnumsConsts.EduTipoBolsaFiesEnum.NovoFIES != objBoleto.FIES) &&
                (paramsEdu.PermitePagCartaoCredito) &&
                (!paramsEdu.ExcluiPagtoCartaoPorMatrizAplicada) && objBoleto.INTEGRADOEAI;
        }

        function servicoPermitePagamentoComCartao(objBoleto) {
            return objBoleto.PGCARTAODEBITO === eduEnumsConsts.EduSimOuNaoEnum.Sim || objBoleto.PGCARTAOCREDITO === eduEnumsConsts.EduSimOuNaoEnum.Sim;
        }

        /**
         * Verifica se permite impressão de recibo
         *
         * @param {Obeject} objBoleto Boleto
         * @param {Object} paramsEdu Parâmetros do educacional
         * @returns {Boolean} Recibo do Boleto pode ser impresso
         */
        function permiteImpressaoRecibo(objBoleto, paramsEdu) {
            return (paramsEdu.CodColRelatDemonstrativoDotNetExe != null) &&
                (paramsEdu.IdRelatDemonstrativoDotNetExe != null) &&
                (objBoleto.IDBOLETO != null) &&
                (objBoleto.STATUSBOLETO == eduEnumsConsts.StatusBoletoEnum.Baixado);
        }

        /**
         * Permite emissão do boleto para pagamento
         *
         * @param {Object} objBoleto Boleto
         * @param {Object} paramsEdu Parâmetros do educacional
         * @returns {Boolean}
         */
        function permitePagamentoBoleto(objBoleto, paramsEdu) {
            return objBoleto.PGBOLETO === eduEnumsConsts.EduSimOuNaoEnum.Sim &&
                registroBoletoValido(objBoleto, paramsEdu) &&
                relatorioCadastrado(paramsEdu) &&
                (eduEnumsConsts.StatusBoletoEnum.EmAberto == objBoleto.STATUSBOLETO ||
                    (objBoleto.STATUSBOLETO == eduEnumsConsts.StatusBoletoEnum.BaixadoParcialmente && paramsEdu.ImprimirBoletosBaixaParcial)) &&
                eduEnumsConsts.EduTipoBolsaFiesEnum.NovoFIES != objBoleto.FIES;
        }

        /**
         * Permite o pagamento com PIX
         *
         * @param {Object} objBoleto Boleto
         * @param {Object} paramsEdu Parâmetros do educacional
         * @returns {Boolean}
         */
        function permitePagamentoPix(objBoleto, paramsEdu) {
            return objBoleto.PGPIX == eduEnumsConsts.EduSimOuNaoEnum.Sim &&
                !(paramsEdu.IntegradoProtheus && paramsEdu.LegadoIntegracaoProtheus === '1') &&
                (eduEnumsConsts.StatusBoletoEnum.EmAberto == objBoleto.STATUSBOLETO ||
                    objBoleto.STATUSBOLETO == eduEnumsConsts.StatusBoletoEnum.BaixadoParcialmente) &&
                (eduEnumsConsts.EduTipoBolsaFiesEnum.NovoFIES != objBoleto.FIES) && objBoleto.INTEGRADOEAI;
        }

        function registroBoletoValido(objBoleto, paramsEdu) {
            return ((angular.isDefined(objBoleto.PERMITEREGONLINE) && objBoleto.PERMITEREGONLINE) ||
                (angular.isDefined(objBoleto.BOLETOREGISTRADO) && objBoleto.BOLETOREGISTRADO) ||
                paramsEdu.ShowBoletoNaoRegistradoPortal);
        }

        function relatorioCadastrado(paramsEdu) {
            return (paramsEdu.IdRelatBoletosDotNetExe != null);
        }

        function validacoesPosBoleto(result, paramEdu) {
            if (result && result[0]['Bytes']) {
                angular.forEach(result, function(value) {
                    objInfoBoleto.push(value);
                });

                //Para boleto registrado, abre o boleto em PDF normalmente.
                if (objInfoBoleto[0].BOLETOREGISTRADO === true ||
                    paramEdu.ShowBoletoNaoRegistradoPortal) {

                    eduRelatorioService.exibirOuSalvarPDF(result[0].Bytes);
                } else if (objInfoBoleto[0].PERMITEREGONLINE === true) {

                    //O usuário é informado que será redirecionado para o site do banco,
                    //e confirma se deseja continuar ou não.
                    appNotificationService.question({
                        title: i18nFilter('l-boleto', [], 'js/aluno/financeiro/lancamentos'),
                        text: i18nFilter('l-redirecionarbanco', [], 'js/aluno/financeiro/lancamentos'),
                        size: 'sm',
                        cancelLabel: 'l-no',
                        confirmLabel: 'l-yes',
                        callback: function(opcaoEscolhida) {
                            if (opcaoEscolhida) {
                                $window.open(objInfoBoleto[0].URLREGONLINE);
                            }
                        }
                    });
                } else if (!paramEdu.ShowBoletoNaoRegistradoPortal) {
                    appNotificationService.notify({
                        type: 'warning',
                        title: i18nFilter('l-boleto', [], 'js/aluno/financeiro/lancamentos'),
                        detail: i18nFilter('l-boleto-nao-registrado', [], 'js/aluno/financeiro/lancamentos')
                    });
                } else {
                    appNotificationService.notify({
                        type: 'warning',
                        title: i18nFilter('l-boleto', [], 'js/aluno/financeiro/lancamentos'),
                        detail: i18nFilter('l-erro-gerar-boleto', [], 'js/aluno/financeiro/lancamentos')
                    });
                }
            }
        }

        /**
         * Copiar código de barras para área de transferência
         * @param {Number} codBarras Código de barras
         */
        function copiarCodBarras(codBarras) {
            if (codBarras) {
                navigator.clipboard.writeText(codBarras).then(() => {
                    notificacaoCopiarCodBarrasBoleto(true);
                });
            } else {
                notificacaoCopiarCodBarrasBoleto(false);
            }
        }

        /**
         * Notificar sucesso ou falha ao copiar código de barras do boleto para área de transferência
         * @param {boolean} sucesso
         */
        function notificacaoCopiarCodBarrasBoleto(sucesso) {
            appNotificationService.notify({
                type: sucesso ? 'success' : 'error',
                detail: sucesso ? i18nFilter('l-mensagem-sucesso-copiar-cod-barras', [], 'js/aluno/financeiro') : i18nFilter('l-mensagem-erro-copiar-cod-barras', [], 'js/aluno/financeiro')
            });
        }

        /**
         * Retorna array de boletos
         * @param {any} boleto Dados do boleto usados pela matrícula e negociação
         * @returns Array[{InternalId,companyCode,bankBilletCode,ourNumberBanking,dueDate }]
         */
        function retornaArrayBoleto(boleto) {
            let boletoArray = new Array();
            boletoArray.push({
                InternalId: `${boleto.CODCOLIGADA}|${boleto.IDBOLETO}`,
                companyCode: boleto.CODCOLIGADA,
                bankBilletCode: boleto.IDBOLETO,
                ourNumberBanking: boleto.NOSSONUMERO,
                dueDate: boleto.DATAVENCIMENTO
            });

            return boletoArray;
        }
    }
});