/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduPagCartaoController
 * @object controller
 *
 * @created 2016-11-23 v12.1.15
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller do pagamento de boleto com cartão
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.new.route',
    'aluno/financeiro/financeiro.factory',
    'utils/edu-utils.factory',
    'aluno/carteira-digital/carteira-digital.service'
], function() {
    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduPagCartaoController', EduPagCartaoController);

    EduPagCartaoController.$inject = ['$scope',
        '$filter',
        '$state',
        '$location',
        '$cookies',
        'EduFinanceiroFactory',
        'EduPaymentsFactory',
        'parametros',
        '$modalInstance',
        '$window',
        '$compile',
        'eduUtilsFactory',
        'eduCarteiraDigitalService',
        'TotvsDesktopContextoCursoFactory',
        'totvs.app-notification.Service',
        'i18nFilter',
        'eduEnumsConsts',
    ];

    /**
     * Controller dos lançamentos financeiros
     * @param   {object} $scope               Escopo do controller
     * @param   {object} $filter              Objeto para aplicação de filtros
     * @param   {object} $state               Objeto para manipulação de rotas
     * @param   {object} $location            Objeto location
     * @param   {object} $cookies             Objeto para manipulação de cookies
     * @param   {object} EduFinanceiroFactory Objeto factory para serviços de financeiro
     * @param   {object} parametros           Objeto com parametros
     * @param   {object} $modalInstance       Objeto para janela modal
     * @param   {object} $window              Objeto para window
     */
    function EduPagCartaoController($scope,
        $filter,
        $state,
        $location,
        $cookies,
        EduFinanceiroFactory,
        EduPaymentsFactory,
        parametros,
        $modalInstance,
        $window,
        $compile,
        eduUtilsFactory,
        eduCarteiraDigitalService,
        TotvsDesktopContextoCursoFactory,
        totvsNotification,
        i18nFilter,
        eduEnumsConsts) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;

        self.pagamento = null;
        self.pagCredito = true;
        self.bandeira = '1';
        self.srcVisa = EDU_CONST_GLOBAL_URL_BASE_APP + '/assets/img/visa.png';
        self.srcMaster = EDU_CONST_GLOBAL_URL_BASE_APP + '/assets/img/mastercard.png';
        self.srcVisaElectron = EDU_CONST_GLOBAL_URL_BASE_APP + '/assets/img/visaElectron.png';
        self.parcelaSelecionada = '01';
        self.showParcelas = true;
        self.opcoesParcelamento = [];
        self.exibirOpcaoPagamentoDebito = exibirOpcaoPagamentoDebito;
        self.exibirOpcaoPagamentoCredito = exibirOpcaoPagamentoCredito;
        self.mask = '999.999.999-99';
        self.IsGetNet = false;
        self.BloquearEdicao = false;
        self.MascarasSistema = null;

        self.listEstados = [];
        self.listaMunicipios = [];
        self.listaPaises = [];

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.retornarOpcoesParcelamento = retornarOpcoesParcelamento;
        self.pagarBoleto = pagarBoleto;
        self.formataOpcaoParcela = formataOpcaoParcela;
        self.retornaValorTotal = retornaValorTotal;
        self.exibeBotaoPagamento = exibeBotaoPagamento;
        self.carregarMunicipios = carregarMunicipios;
        self.onChangePais = onChangePais;
        self.proximaEtapa = proximaEtapa;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {
            if (!parametros.isPay && parametros.idBoleto == undefined) {
                self.idBoleto = getIdBoleto();
            } else if (parametros.idBoleto) {
                self.idBoleto = parametros.idBoleto;
            }

            self.listaBoletos = parametros.listaBoletos;

            if (parametros.isPay && self.listaBoletos != undefined && self.listaBoletos.length > 0) {
                self.isPay = parametros.isPay;
                self.resumoPagamento = parametros.resumoPagamento;
                buscarDadosPagamentoMultiBoleto();
            } else
                buscarDadosPagamento();

            $scope.$watch('controller.bandeira', function() {
                self.opcoesParcelamento = retornarOpcoesParcelamento();
            });
        }

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Trata id boleto preenchido na lista de boletos
         * @returns Id boleto
         */
        function getIdBoleto() {
            if (parametros.listaBoletos.length > 0) {
                parametros.idBoleto = parametros.listaBoletos[0].split('|')[1];
            }
            return parametros.idBoleto;
        }

        /**
         * Preenche a bandeira do cartão
         */
        function preencherBandeiraCartao() {
            if (self.pagamento.CartaoCreditoParams.AtivarBandeiraVisa === 1) {
                self.bandeira = '1';
            } else if (self.pagamento.CartaoCreditoParams.AtivarBandeiraMaster === 1) {
                self.bandeira = '2';
            } else {
                self.bandeira = '3';
            }
        }

        /**
         * Obtém dados para pagamento com multi boleto
         */
        function buscarDadosPagamentoMultiBoleto() {
            if (self.isPay) {
                EduPaymentsFactory.getDadosMultiplosBoleto(self.listaBoletos, retornaTelaOrigem($state.current.name),
                    function(result) {
                        if (result.BOLETO) {
                            $modalInstance.dismiss();
                            $state.go('carteira-digital.start', {
                                resumoPagamento: self.resumoPagamento,
                                listaDadosPagamento: result.BOLETO,
                                codUsuarioLogado: eduCarteiraDigitalService.recuperaUsuarioLogado(TotvsDesktopContextoCursoFactory.getCursoSelecionado()),
                                rotaOrigem: retornaRotaOrigem($state.current.name)
                            });
                        }
                    }
                );
            }
        }

        /**
         * Obtém dados para pagamento
         */
        function buscarDadosPagamento() {
            EduFinanceiroFactory.retornarDadosPagCartao(self.idBoleto, function(result) {
                if (result) {
                    self.pagamento = result;
                    self.opcoesParcelamento = retornarOpcoesParcelamento();

                    let GetNet = 5;
                    let eRede = 4;

                    preencherBandeiraCartao();

                    if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === GetNet ||
                        self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === eRede ||
                        self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === eduEnumsConsts.PaymentsModeloTransacao.CyberSource) {

                        self.MascarasSistema = TotvsDesktopContextoCursoFactory.getMascarasSistema();
                        var valor = self.pagamento.NomeComprador.split(" ");
                        self.pagamento.PrimeiroNome = valor.shift();
                        self.pagamento.Sobrenome = valor.join(" ");

                        carregarPaises(
                            function(result) {
                                carregaEstados(buscarIdPais(self.pagamento.PaisComprador))
                            });

                        if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === GetNet)
                            self.IsGetNet = true;

                        if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === eRede) {
                            var params = {
                                dadosComprador: self.pagamento
                            };
                            $modalInstance.dismiss();
                            $state.go('pagamento-cartao.iniciar', params);
                        }

                        if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === eduEnumsConsts.PaymentsModeloTransacao.CyberSource) {
                            EduPaymentsFactory.getDadosBoleto(self.pagamento.CodColigada, self.pagamento.IdBoleto, retornaTelaOrigem($state.current.name),
                                function(result) {
                                    if (result.BOLETO) {
                                        var parametros = {
                                            dadosPagamento: {
                                                companyCode: result.BOLETO.companyCode,
                                                branchCode: result.BOLETO.branchCode,
                                                bankBilletCode: result.BOLETO.bankBilletCode,
                                                dueDate: result.BOLETO.dueDate,
                                                serverDate: result.BOLETO.serverDate,
                                                canPayWithCredit: result.BOLETO.canPayWithCredit,
                                                canPayWithDebit: result.BOLETO.canPayWithDebit,
                                                isGroupedBankBillet: result.BOLETO.isGroupedBankBillet,
                                                recurrenceEnabledInService: result.BOLETO.recurrenceEnabledInService,
                                                services: result.BOLETO.services,
                                                billetServices: result.BOLETO.billetServices
                                            },
                                            codUsuarioLogado: eduCarteiraDigitalService.recuperaUsuarioLogado(TotvsDesktopContextoCursoFactory.getCursoSelecionado()),
                                            rotaOrigem: retornaRotaOrigem($state.current.name)
                                        };

                                        $modalInstance.dismiss();
                                        $state.go('carteira-digital.start', parametros);
                                    }
                                }
                            );
                        }
                    }
                }
            });

        }

        function retornaTelaOrigem(rota) {
            if (rota.indexOf('negociacaoonline.confirmacao') !== -1)
                return eduEnumsConsts.PaymentsTelaOrigem.NegociacaoOnline;
            else if (rota.indexOf('financeiro.start') !== -1)
                return eduEnumsConsts.PaymentsTelaOrigem.ExtratoFinanceiro;
            else if (rota.indexOf('matriculaES.finalizacao') !== -1 || rota.indexOf('matriculaEB.finalizacao') !== -1)
                return eduEnumsConsts.PaymentsTelaOrigem.MatriculaOnline;
            else
                return eduEnumsConsts.PaymentsTelaOrigem.ExtratoFinanceiro;
        }

        function retornaRotaOrigem(rota) {
            if (rota.indexOf('negociacaoonline.confirmacao') !== -1) {
                return 'negociacaoonline.introducao';
            }

            if (rota.indexOf('financeiro.start') !== -1) {
                return 'financeiro.start';
            }

            if (rota.indexOf('matriculaES.finalizacao') !== -1) {
                return 'matriculaES.apresentacao';
            }

            if (rota.indexOf('matriculaEB.finalizacao') !== -1) {
                return 'matriculaEB.apresentacao';
            }
        }

        function exibeBotaoPagamento() {
            if (self.IsGetNet) {
                return self.BloquearEdicao;
            } else
                return true;
        }

        /**
         * Obtém opções de parcelamento
         * @returns {object} Opções de pagamentos
         */
        function retornarOpcoesParcelamento() {
            if (self.pagamento !== null && self.pagamento !== undefined) {
                if (self.bandeira === '1') {
                    return self.pagamento.OpcoesParcelamentoVisa.OpcoesParcelamento;
                } else {
                    return self.pagamento.OpcoesParcelamentoMasterCard.OpcoesParcelamento;
                }
            }
        }

        function pagarBoletoComBuyPage(precoProduto) {
            var produto = self.bandeira === '3' ? 'A' : self.parcelaSelecionada !== '01' ? '2' : '1',
                urlRetorno = $location.$$absUrl.split('#')[0] + 'js/aluno/financeiro/servico-cielo';

            // Se for débito a bandeira será Visa
            var bandeiraCartao = self.bandeira === '3' && produto === 'A' ? '1' : self.bandeira;

            EduFinanceiroFactory.retornarUrlPagBuyPage(self.idBoleto,
                precoProduto,
                bandeiraCartao,
                produto,
                self.parcelaSelecionada,
                urlRetorno,
                function(result) {

                    if (result.IdTransacao !== undefined) {
                        var transacao = {};

                        transacao.idTransacao = result.IdTransacao;
                        transacao.idTransacaoCielo = result.IdTransacaoCielo;
                        transacao.idBoleto = self.idBoleto;
                        transacao.descricaoBoleto = self.pagamento.DescProduto;
                        transacao.valorBoleto = precoProduto;
                        transacao.nomeRespFinanceiro = self.pagamento.NomeComprador;
                        transacao.emailRespFinanceiro = self.pagamento.EmailComprador;
                        transacao.numParcelas = self.parcelaSelecionada;
                        transacao.isCredito = self.bandeira !== '3';

                        $window.EduTransacaoCielo = angular.toJson(transacao);

                        abrirPaginaCielo(result.Url);
                    }
                }
            );
        }

        function pagarBoletoComCheckoutCielo(precoProduto) {
            EduFinanceiroFactory.retornarUrlPagCheckoutCielo(self.idBoleto,
                self.pagamento.DescProduto,
                precoProduto,
                self.pagamento.NomeComprador,
                self.pagamento.EmailComprador,
                self.pagamento.CpfComprador,
                self.pagamento.TelefoneComprador,
                function(result) {
                    if (result.IdTransacao !== undefined) {
                        var transacao = {};
                        transacao.idTransacao = result.IdTransacao;
                        $window.EduTransacaoCielo = transacao;
                        let winCieloOpened = abrirPaginaCielo(result.Url);

                        if (winCieloOpened != null)
                            controleTelaCheckoutCielo(winCieloOpened);
                    }
                });
        }

        /**
         * Pagar o boleto bancário
         */
        function pagarBoleto() {

            let precoProduto = Number(self.pagamento.PrecoProduto).toFixed(2);

            // BuyPage
            if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === 1) {
                pagarBoletoComBuyPage(precoProduto);
            }
            //Checkout cielo
            else if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === 2) {
                pagarBoletoComCheckoutCielo(precoProduto);
            }
            //GetNet
            else if (self.pagamento.CartaoCreditoParams.ModeloECommerceCielo === 5) {
                //Desativando o botão de pagamento para evitar o pagamento duplicado
                $(".pay-button-checkout").attr('disabled', 'disabled');
            }
        }

        /**
         * Formata as opções de parcela
         * @param   {int}    key   Chave do índica da parcela
         * @param   {number} value Valor da parcela
         * @returns {string} Parcela formatada
         */
        function formataOpcaoParcela(key, value) {
            return key + ' x ' + $filter('currency')(value.replace('.', '').replace(',', '.'));
        }

        /**
         * Obtém o valor total
         * @returns {number} Valor Total
         */
        function retornaValorTotal() {

            if (self.opcoesParcelamento === undefined) {
                return;
            }

            // visa débito
            if (self.bandeira === '3') {
                return $filter('currency')(self.pagamento.PrecoProduto);
            } else { // crédito
                var parcelas = Number(self.parcelaSelecionada),
                    valorParcela = self.opcoesParcelamento[self.parcelaSelecionada].replace('.', '').replace(',', '.'),
                    valorTotal = parcelas * parseFloat(valorParcela);

                return $filter('currency')(valorTotal) + ' (' + parcelas + ' x ' + $filter('currency')(valorParcela) + ')';
            }
        }

        /**
         * Abre página da Cielo
         * @param {string} url Url da Cielo
         */
        function abrirPaginaCielo(url) {
            // Janela da Cielo
            let winCielo = window;
            // Monta e abre a URL
            let winCieloOpened = winCielo.open(
                url,
                '_blank',
                'Height=768px,Width=720px,Top=50,Left=50,help=no,status=yes,resizable=0,scrollbars=1');
            $modalInstance.dismiss();
            return winCieloOpened;
        }

        /**
         * Inicia controles necessários para fechamento automático do pop up de pagamento checkout cielo
         * @param {window} winCieloOpened - Window pop-up checkout cielo
         */
        function controleTelaCheckoutCielo(winCieloOpened) {
            let eventBeforeUnload = 'beforeunload';
            $window.addEventListener(eventBeforeUnload, function(event) {
                if (event.target.location.origin === $window.location.origin) {
                    if (!winCieloOpened.closed) {
                        winCieloOpened.close();
                    }
                }
            });
            controleTempoTelaCheckoutCielo(winCieloOpened);
        }

        /**
         * Inicia timer que controla e exibe alertas sobre o fechamento do pop up checkout cielo
         * @param {window} windowCheckoutCielo - Window pop-up checkout cielo
         */
        function controleTempoTelaCheckoutCielo(windowCheckoutCielo) {
            let horas = "00";
            let minutos = "00";
            let segundos = "00";
            let interval = null;
            let correctInt = function(number) {
                if (number < 10) {
                    return "0" + number;
                }
                return number;
            }
            let timeSec = 1800;
            let tempoAlerta = [1500, 1200, 900, 600, 300, 60];
            interval = setInterval(function() {
                timeSec -= 1;
                horas = correctInt(parseInt(timeSec / 3600));
                minutos = correctInt(parseInt(timeSec % 3600 / 60));
                segundos = correctInt(timeSec % 60);
                if (tempoAlerta.indexOf(timeSec) > -1) {
                    alertaTempoRestanteFecharCheckoutCielo(horas, minutos, segundos);
                }
                if (timeSec === 0) {
                    windowCheckoutCielo.close();
                    alertaFechamentoCheckoutCielo();
                    clearInterval(interval);
                }
                if (windowCheckoutCielo.closed) {
                    clearInterval(interval);
                }
            }, 1000);
        }

        /**
         * Exibe alerta com tempo restante para fechamento do pop up checkout cielo
         * @param {string} horas
         * @param {string} minutos
         * @param {string} segundos
         */
        function alertaTempoRestanteFecharCheckoutCielo(horas, minutos, segundos) {
            totvsNotification.notify({
                type: 'warning',
                title: i18nFilter('l-faltam-x-horas-minutos-segundos-fechamento-tela-cartao', [horas, minutos, segundos], 'js/aluno/financeiro/lancamentos'),
                detail: ''
            });
            $state.go($state.current, {}, {
                reload: false
            });
        }

        /**
         * Exibe alerta informando que o pop up checkout cielo foi fechado por motivos de segurança
         */
        function alertaFechamentoCheckoutCielo() {
            totvsNotification.notify({
                type: 'warning',
                title: i18nFilter('l-fechamento-automatico', [], 'js/aluno/financeiro/lancamentos'),
                detail: i18nFilter('l-tela-pagamento-fechada-automaticamente-seguranca', [], 'js/aluno/financeiro/lancamentos')
            });
            $state.go($state.current, {}, {
                reload: false
            });
        }

        function exibirOpcaoPagamentoDebito() {
            if (self.pagamento) {
                return self.pagamento.CartaoCreditoParams.AtivarDebitoVisa === 1 && self.pagamento.PagamentoCartaoDebito;
            } else {
                return true;
            }
        }

        function exibirOpcaoPagamentoCredito() {
            if (self.pagamento) {
                return (self.pagamento.CartaoCreditoParams.AtivarBandeiraVisa === 1 || self.pagamento.CartaoCreditoParams.AtivarBandeiraMaster === 1) &&
                    self.pagamento.PagamentoCartaoCredito;
            } else {
                return true;
            }
        }

        /**
         * Carrega lista de Estados cadastrados no RM.
         *
         * @param {any} idPais - Id. do país que deseja carregar os estados
         */
        function carregaEstados(idPais) {
            if (idPais) {
                eduUtilsFactory.getListaEstadosAsync(idPais, function(result) {
                    if (result.GEtd) {
                        self.listEstados = result.GEtd;
                    }
                });
            } else {
                eduUtilsFactory.getListaEstadosBRAsync(function(result) {
                    if (result.GEtd) {
                        self.listEstados = result.GEtd;
                    }
                });
            }
        }

        /**
         * busca Id. do país a partir do nome
         *
         * @param {any} nomePais - Nome do país que deseja encontrar o Id.
         * @returns - Id. do país
         */
        function buscarIdPais() {

            var nomePais = retornaPais();

            var pais = self.listaPaises.find(function(item) {
                if (item.DESCRICAO === nomePais) {
                    return item;
                }
            });

            return pais.IDPAIS;
        }

        /**
         * Evento de alteração do país.(Recarrega a lista de estados)
         */
        function onChangePais() {
            self.listEstados = [];
            self.pagamento.UfComprador = null;
            self.pagamento.CidadeComprador = null;
            var idPais = buscarIdPais();
            carregaEstados(idPais);
        }

        /**
         * Carrega lista de países cadastrados no RM
         */
        function carregarPaises(callback) {
            eduUtilsFactory.getListaPaisesAsync(function(result) {
                if (result.GPais) {
                    self.listaPaises = result.GPais;
                    if (callback)
                        callback();
                }
            });
        }

        /**
         * Carrega lista de municípios do estado
         */
        function carregarMunicipios() {
            if (self.pagamento && self.pagamento.PaisComprador && self.pagamento.UfComprador) {
                var idPais = buscarIdPais(self.pagamento.PaisComprador);
                eduUtilsFactory.getListaMunicipiosAsync(idPais, self.pagamento.UfComprador, function(result) {
                    if (result.GMUNICIPIO) {
                        self.listaMunicipios = result.GMUNICIPIO;
                    }
                });
            }
        }

        /**
         * Retorna a descrição do país
         */
        function retornaPais() {
            var pais = self.pagamento.PaisComprador;
            if ((self.pagamento.PaisComprador) && (self.pagamento.PaisComprador.hasOwnProperty('DESCRICAO')))
                pais = self.pagamento.PaisComprador.DESCRICAO;

            return pais;
        }

        /**
         * Próxima etapa do pagamento
         */
        function proximaEtapa() {
            if (self.formulario.$valid) {
                self.BloquearEdicao = true;

                var precoProduto = Number(self.pagamento.PrecoProduto).toFixed(2);

                if (self.IsGetNet) {
                    EduFinanceiroFactory.retornarScriptGetNet(precoProduto,
                        self.pagamento.PrimeiroNome,
                        self.pagamento.Sobrenome,
                        self.pagamento.CpfComprador,
                        self.pagamento.EmailComprador,
                        self.pagamento.TelefoneComprador,
                        self.pagamento.Logradouro,
                        self.pagamento.Numero,
                        self.pagamento.Complemento,
                        self.pagamento.BairroComprador,
                        self.pagamento.CidadeComprador,
                        self.pagamento.UfComprador,
                        self.pagamento.CepComprador,
                        retornaPais(),
                        self.pagamento.DescProduto,
                        'pay-button-checkout',
                        self.idBoleto,
                        self.pagamento.PagamentoCartaoDebito,
                        self.pagamento.PagamentoCartaoCredito,
                        function(result) {
                            if (result) {
                                var comp = $compile(result.Script)($scope);
                                angular.element(document.querySelector('#iframePay')).append(comp);
                            }
                        }
                    );
                }
            } else {
                for (var nomeCampo in self.formulario) {
                    //alternativa ao startsWith, pois o IE não o aceita
                    if (nomeCampo.indexOf('campo') == 0 && self.formulario[nomeCampo].$invalid) {
                        setFocusCampo(nomeCampo);
                        break;
                    }
                }

                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-Atencao'),
                    detail: i18nFilter('l-msg-campos-preenchimento-obrigatorio')
                });
            }
        }

        /**
         * Seta o focus de um determinado campo do formulário
         * @param {string} nomeCampo Nome do campo para setar o focus
         */
        function setFocusCampo(nomeCampo) {
            var seletor = '[name=' + nomeCampo + '] input, [name=' + nomeCampo + '] select';

            $(seletor).focus();
        }
    }
});