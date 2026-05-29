/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.17
 * (c) 2015-2019 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduCarteiraDigitalModule
 * @name eduCarteiraDigitalService
 * @object service
 *
 * @created 2019-12-02 v12.1.17
 * @updated
 *
 * @requires
 *
 * @description Service utilizada pelas rotinas da carteira digital
 */

define([
    'aluno/carteira-digital/carteira-digital.module',
    'aluno/financeiro/financeiro.factory',
    'aluno/pagamento-cartao/pagamento-cartao.factory',
    'utils/edu-utils.factory'
], function() {

    'use strict';

    angular.module('eduCarteiraDigitalModule')
        .service('eduCarteiraDigitalService', eduCarteiraDigitalService);

    eduCarteiraDigitalService.$inject = [
        '$filter',
        '$sce',
        'EduPaymentsFactory',
        'eduPagamentoCartaoFactory',
        'TotvsDesktopContextoCursoFactory',
        'totvs.app-notification.Service',
        'i18nFilter',
        '$timeout',
        'eduUtilsFactory',
        'eduEnumsConsts'
    ];

    function eduCarteiraDigitalService(
        $filter,
        $sce,
        EduPaymentsFactory,
        eduPagamentoCartaoFactory,
        TotvsDesktopContextoCursoFactory,
        totvsNotification,
        i18nFilter,
        $timeout,
        eduUtilsFactory,
        eduEnumsConsts
    ) {
        var self = this;

        self.finParams = undefined;

        self.carregaDataVencimento = carregaDataVencimento;
        self.carregaInfoRecorrencia = carregaInfoRecorrencia;
        self.converteData = converteData;
        self.recuperaUsuarioLogado = recuperaUsuarioLogado;
        self.montaBandeira = montaBandeira;
        self.apagarCartao = apagarCartao;
        self.cadastrarCartao = cadastrarCartao;
        self.isDefinedNotNull = isDefinedNotNull;
        self.preencheAnoValidadeCartao = preencheAnoValidadeCartao;
        self.verificaBandeira = verificaBandeira;
        self.retornaTipoCartao = retornaTipoCartao;
        self.retiraMascara = retiraMascara;
        self.tokenizarCartao = tokenizarCartao;
        self.buscaParametrosFinanceiro = buscaParametrosFinanceiro;
        self.configuraWebComponent = configuraWebComponent;
        self.carregaDadosCriptografados = carregaDadosCriptografados;
        self.buscarEnderecoCEP = buscarEnderecoCEP;

        function carregaDataVencimento(boleto, forExtratoFinanceiro = false) {
            let texto = "";
            if (forExtratoFinanceiro)
                texto = `<div class="col-xs-1" style="padding: 12px;">${getCalendarIcon(boleto)}</div><div style="padding-left: 50px;">${getDataVencimento(boleto, forExtratoFinanceiro)}</div>`;
            else
                texto = `${getCalendarIcon(boleto)}${getDataVencimento(boleto, forExtratoFinanceiro)}`;

            return $sce.trustAsHtml(texto);
        }

        function getCalendarIcon(boleto) {
            if (boleto.dueDate < boleto.serverDate)
                return "<span class='ico-calendario' style='font-size: 22px; color: red !important'></span>"

            if (boleto.dueDate >= boleto.serverDate)
                return "<span class='ico-calendario' style='font-size: 22px; color: green !important'></span>"

            if (boleto.dueDate == boleto.serverDate)
                return "<span class='ico-calendario' style='font-size: 22px; color: orange !important'></span>"

            return "";
        }

        function getDataVencimento(boleto, forExtratoFinanceiro) {
            if (forExtratoFinanceiro)
                return "<span style='font-size: 16px'>" + i18nFilter('l-vencimento', [], 'js/aluno/carteira-digital') + "<br><b>" + $filter('date')(boleto.dueDate, 'dd/MM/y') + "</b></span>";
            else
                return "<span style='font-size: 16px'>&nbsp;" + i18nFilter('l-vencimento', [], 'js/aluno/carteira-digital') + ":&nbsp;<b>" + $filter('date')(boleto.dueDate, 'dd/MM/y') + "</b></span>";
        }



        function carregaInfoRecorrencia(boleto) {
            let texto = "";

            if (boleto.recurrenceEnabledInService) {
                texto = "<a href='#/financeiro.recorrencia-lista'><span class='ico-payments-recorrencia' style='font-size: 22px; color: purple; !important' title='" + i18nFilter('l-recorrencia-info', [], 'js/aluno/carteira-digital') + "'></span></a>";
            }

            return $sce.trustAsHtml(texto);
        }

        function converteData(data) {
            if (data) {

                var locale = "";
                switch (EDU_CONST_GLOBAL_CUSTOM_IDIOMA) {
                    case "pt":
                        locale = 'pt-BR';
                        break;
                    case "en":
                        locale = 'en-US';
                        break;
                    case "es":
                        locale = 'es-ES';
                        break;
                }

                var dataFormatada = new Date(data).toLocaleDateString(locale, {
                    month: 'long'
                }) + "/" + new Date(data).getFullYear();
                dataFormatada = dataFormatada.substring(0, 1).toUpperCase() + dataFormatada.substring(1, dataFormatada.length);

                return dataFormatada;
            }
        }

        function recuperaUsuarioLogado(contexto) {
            if (contexto.entrarComo === TotvsDesktopContextoCursoFactory.tipoUsuarioEnum.Responsavel) {
                if (contexto.CODUSUARIORESPFINANCEIRO) {
                    return contexto.CODUSUARIORESPFINANCEIRO;
                }
                if (contexto.CODUSUARIORACA) {
                    return contexto.CODUSUARIORACA;
                }
                if (contexto.CODUSUARIOPAI) {
                    return contexto.CODUSUARIOPAI;
                }
                if (contexto.CODUSUARIOMAE) {
                    return contexto.CODUSUARIOMAE;
                }
            } else {
                return contexto.cursoSelecionado.CODUSUARIOALUNO;
            }
        }

        function montaBandeira(bandeira, tela) {
            var imagem = '';

            switch (bandeira) {
                case 1:
                    if (tela == 'payments-gestao') {
                        imagem = 'payments_visa_azul.png';
                    } else {
                        imagem = 'payments_visa.png';
                    }
                    break;
                case 2:
                    imagem = 'payments_master.png';
                    break;
                case 3:
                    imagem = "payments_elo.png";
                    break;
                case 4:
                    imagem = 'payments_dinners.png';
                    break;
                case 5:
                    imagem = 'payments_amex.png';
                    break;
                case 7:
                    imagem = 'payments_jcb.png';
                    break;
                default:
                    imagem = 'payments_chip.png';
                    break;
            }

            return imagem;
        }

        function apagarCartao(idCarteira, numeroCartao, estado) {
            totvsNotification.question({
                title: i18nFilter('l-exclusao-cartao', [], 'js/aluno/carteira-digital'),
                text: i18nFilter('l-texto-exclusao', [], 'js/aluno/carteira-digital') + numeroCartao + '?',
                size: 'md',
                cancelLabel: 'l-no',
                confirmLabel: 'l-yes',
                callback: function(opcaoEscolhida) {
                    if (opcaoEscolhida) {
                        EduPaymentsFactory.apagarCartao(idCarteira, function(result) {
                            if (!result.$messages) {
                                estado.transitionTo(estado.current, estado.params, {
                                    reload: true,
                                    inherit: false,
                                    notify: true
                                });

                                totvsNotification.notify({
                                    type: 'success',
                                    title: i18nFilter('l-exclusao-cartao', [], 'js/aluno/carteira-digital'),
                                    detail: i18nFilter('l-exclusao-sucesso', [], 'js/aluno/carteira-digital')
                                });
                            }
                        });
                    }
                }
            });
        }

        function cadastrarCartao(coligada, filial, codUsuarioLogado, escopo, estado, callback) {
            var formDadosCartaoValido = escopo.controller.frmDadosCartao.$valid;
            var formDadosEnderecoValido = escopo.controller.frmDadosEndereco.$valid;

            if (formDadosCartaoValido && formDadosEnderecoValido) {
                var possuiNomeSobrenome = false;
                if (isDefinedNotNull(escopo.controller.dadosCartao)) {
                    possuiNomeSobrenome = escopo.controller.dadosCartao.NomeTitular.split(" ").length > 1;
                } else {
                    possuiNomeSobrenome = escopo.controller.frmDadosCartao.NomeTitular.split(" ").length > 1;
                }

                if (possuiNomeSobrenome) {
                    prepararDadosGatewayCadastroCartao(coligada, filial, escopo, codUsuarioLogado, function(retorno) {
                        if (retorno) {
                            EduPaymentsFactory.novoCartao(coligada, filial, retorno.model, function(result) {
                                if (result && isDefinedNotNull(result.DigitalWalletCode)) {
                                    estado.transitionTo(estado.current, estado.params, {
                                        reload: true,
                                        inherit: false,
                                        notify: true
                                    });

                                    totvsNotification.notify({
                                        type: 'success',
                                        title: i18nFilter('l-novo-cartao', [], 'js/aluno/carteira-digital'),
                                        detail: i18nFilter('l-cartao-cadastrado-sucesso', [], 'js/aluno/carteira-digital')
                                    });

                                    //Ao cadastrar o primeiro cartão, recarregar as informações do aluno para ser exibido a opção "Carteira Digital" e "Gerenciar Recorrências"
                                    if (escopo.controller.digitalWallet.length == 0)
                                        escopo.$parent.desktop.loadAluno();
                                } else {
                                    totvsNotification.notify({
                                        type: 'error',
                                        title: i18nFilter('l-Atencao'),
                                        detail: result.Message
                                    });
                                }

                                executaCallback(callback);
                            });
                        } else {
                            executaCallback(callback);
                        }
                    });
                } else {
                    totvsNotification.notify({
                        type: 'error',
                        title: i18nFilter('l-Atencao'),
                        detail: i18nFilter('l-nome-impresso-cartao', [], 'js/aluno/carteira-digital')
                    });

                    executaCallback(callback);
                }
            } else {
                totvsNotification.notify({
                    type: 'error',
                    title: i18nFilter('l-Atencao'),
                    detail: i18nFilter('l-cadastro-campos-obrigatorios', [], 'js/aluno/carteira-digital')
                });

                executaCallback(callback);
            }
        }

        function prepararDadosGatewayCadastroCartao(coligada, filial, escopo, codUsuarioLogado, callback) {
            buscaParametrosFinanceiro(function(finParams) {
                var retorno = {};

                switch (finParams.modeloTransacao) {
                    case eduEnumsConsts.PaymentsModeloTransacao.CyberSource:
                        {
                            tokenizarCartao(coligada, filial, escopo, finParams.ambienteProducao, function(token, cartaoMascarado) {
                                if (isDefinedNotNull(token)) {
                                    retorno.model = tratarJsonCadastroCartaoCyber(escopo.controller.dadosCartao, escopo.controller.dadosDonoCartao, escopo.controller.bandeira.codigo,
                                        codUsuarioLogado, token, cartaoMascarado, escopo.controller.paisSelecionado, escopo.controller.ufSelecionado);

                                    if (angular.isFunction(callback)) {
                                        callback(retorno);
                                    }
                                } else {
                                    executaCallback(callback);
                                }
                            });

                            break;
                        }
                    case eduEnumsConsts.PaymentsModeloTransacao.Adyen:
                        {
                            retorno.model = tratarJsonCadastroCartaoAdyen(escopo.controller.frmDadosCartao, escopo.controller.dadosDonoCartao, codUsuarioLogado,
                                escopo.controller.paisSelecionado, escopo.controller.ufSelecionado);

                            if (angular.isFunction(callback)) {
                                callback(retorno);
                            }

                            break;
                        }
                }
            });
        }

        function tratarJsonCadastroCartaoCyber(dadosCartao, dadosDonoCartao, bandeira, codUsuarioLogado, token, cartaoMascarado, paisSelecionado, ufSelecionado) {
            var model = {};
            model.cardflag = bandeira;

            if (isDefinedNotNull(dadosCartao.tipoCartaoSelecionado)) {
                model.cardType = dadosCartao.tipoCartaoSelecionado;
            } else {
                model.cardType = 1; //Crédito
            }

            model.cardNumber = cartaoMascarado;
            model.Name = dadosCartao.NomeTitular;
            model.email = dadosDonoCartao.Email;
            model.phone = dadosDonoCartao.Telefone;
            model.address = dadosDonoCartao.Logradouro;
            model.number = dadosDonoCartao.Numero;
            model.complement = dadosDonoCartao.Complemento;
            model.neighbourhood = dadosDonoCartao.Bairro;
            model.city = dadosDonoCartao.Cidade;
            model.country = paisSelecionado.CountryAbbreviation;
            if (paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.Brasil) {
                model.zipCode = retiraMascara(dadosDonoCartao.Cep);
                model.CPFCNPJ = retiraMascara(dadosDonoCartao.Cpf);
            } else {
                model.zipCode = dadosDonoCartao.Cep;
            }

            model.neighbourhood = dadosDonoCartao.Bairro;
            model.city = dadosDonoCartao.Cidade;
            model.country = paisSelecionado.CountryAbbreviation;

            if (paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.Brasil ||
                paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.EUA ||
                paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.Canada) {
                model.state = ufSelecionado.StateAbbreviation;
            } else {
                model.state = dadosDonoCartao.Uf;
            }

            model.UserCode = codUsuarioLogado;
            model.token = token;

            return model;
        }

        function tratarJsonCadastroCartaoAdyen(dadosCartao, dadosDonoCartao, codUsuarioLogado, paisSelecionado, ufSelecionado) {
            var model = {};

            model.cardType = 1; //Crédito
            model.cardNumber = dadosCartao.NumeroCartao;
            model.cardHolderName = dadosCartao.NomeTitular;
            model.expirationMonth = dadosCartao.ValidadeMes;
            model.expirationYear = dadosCartao.ValidadeAno;
            model.securityCode = dadosCartao.CodigoSeguranca;
            model.Name = dadosCartao.NomeTitular;
            model.email = dadosDonoCartao.Email;
            model.DDDPhone = dadosDonoCartao.DDD;
            model.phone = dadosDonoCartao.Telefone;
            model.address = dadosDonoCartao.Logradouro;
            model.number = dadosDonoCartao.Numero;
            model.complement = dadosDonoCartao.Complemento;
            model.neighbourhood = dadosDonoCartao.Bairro;
            model.city = dadosDonoCartao.Cidade;
            model.country = paisSelecionado.CountryAbbreviation;
            if (paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.Brasil) {
                model.zipCode = retiraMascara(dadosDonoCartao.Cep);
                model.CPFCNPJ = retiraMascara(dadosDonoCartao.Cpf);
            } else {
                model.zipCode = dadosDonoCartao.Cep;
                model.CPFCNPJ = dadosDonoCartao.Cpf;
            }
            if (paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.Brasil ||
                paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.EUA ||
                paisSelecionado.CountryAbbreviation == eduEnumsConsts.PaymentsAbreviacaoCartao.Canada) {
                model.state = ufSelecionado.StateAbbreviation;
            }
            model.UserCode = codUsuarioLogado;

            return model;
        }

        function retiraMascara(valor) {
            return valor.replace(/\D+/g, '');
        }

        /**
         * Verifica se o objeto isDefined e diferente de nulo
         * @param {any} objeto objeto a ser validado
         * @returns
         */
        function isDefinedNotNull(objeto) {
            return (angular.isDefined(objeto) && objeto !== null);
        }

        function preencheAnoValidadeCartao() {
            var anoAtual = new Date().getFullYear();
            var Ano = [];
            for (let index = 0; index <= 10; index++) {
                Ano.push(anoAtual);
                anoAtual = anoAtual + 1;
            }

            return Ano;
        }

        function verificaBandeira(numeroCartao, bandeira) {
            if (isDefinedNotNull(numeroCartao)) {
                var NumeroCartao = numeroCartao.replace(/[^0-9]+/g, '');

                // Não alterar a ordem do array, pois a mesma influencia na identificação da bandeira do cartão.
                var cards = {
                    elo: {
                        expressao: /^(40117[8-9]|431274|438935|451416|457393|45763[1-2]|506(699|7[0-6][0-9]|77[0-8])|509\d{3}|504175|627780|636297|636368|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(4[8-9][0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
                        codigo: 3
                    },
                    hipercard: {
                        expressao: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
                        codigo: 9
                    },
                    dinners: {
                        expressao: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
                        codigo: 4
                    },
                    amex: {
                        expressao: /^3[47][0-9]{13}/,
                        codigo: 5
                    },
                    aura: {
                        expressao: /^(5078\d{2})(\d{2})(\d{11})$/,
                        codigo: 6
                    },
                    jcb: {
                        expressao: /^(?:2131|1800|35\d{3})\d{11}/,
                        codigo: 7
                    },
                    discover: {
                        expressao: /^6(?:011|5[0-9]{2})[0-9]{12}|(644|645|646|647|648|649)[0-9]{13}/,
                        codigo: 8
                    },
                    mastercard: {
                        expressao: /^5[1-5][0-9]{14}|2[2-7][0-9]{14}/,
                        codigo: 2
                    },
                    visa: {
                        expressao: /^4[0-9]{12}(?:[0-9]{3})/,
                        codigo: 1
                    }
                };

                for (var flag in cards) {
                    if (cards[flag].expressao.test(NumeroCartao)) {
                        bandeira.codigo = cards[flag].codigo;
                        bandeira.nome = flag;
                        return true;
                    }
                }

                bandeira.codigo = 0;
                bandeira.nome = undefined;
                return false;

            } else {
                bandeira.codigo = 0;
                bandeira.nome = undefined;
            }
        }

        function retornaTipoCartao(tipoCartao) {
            var tipo;
            switch (tipoCartao) {
                case 1:
                    tipo = i18nFilter('l-cartao-credito', [], 'js/aluno/carteira-digital');
                    break;
                case 2:
                    tipo = i18nFilter('l-cartao-debito', [], 'js/aluno/carteira-digital');
                    break;
            }

            return tipo;
        }

        function tokenizarCartao(codColigada, codFilial, escopo, ambienteProducao, callback) {
            // Chave pública para tokenizar o cartão
            eduPagamentoCartaoFactory.getChavePublica(codColigada, codFilial, function(result) {
                if (result.Jwk) {
                    var jwk = {
                        "kty": result.Jwk.Kty,
                        "use": result.Jwk.Use,
                        "kid": result.Jwk.Kid,
                        "n": result.Jwk.N,
                        "e": result.Jwk.E
                    };

                    var options = {
                        kid: jwk.kid,
                        keystore: jwk,
                        cardInfo: {
                            cardNumber: escopo.controller.dadosCartao.NumeroCartao.toString(),
                            cardType: montaCardType(escopo.controller.bandeira.codigo),
                            cardExpirationMonth: escopo.controller.dadosCartao.ValidadeMes.toString(),
                            cardExpirationYear: escopo.controller.dadosCartao.ValidadeAno.toString()
                        },
                        encryptionType: 'RsaOaep',
                        production: ambienteProducao
                    };

                    FLEX.createToken(options, function(response) {
                        if (response.error) {
                            $timeout(function() {
                                totvsNotification.notify({
                                    type: 'error',
                                    title: i18nFilter('l-Atencao'),
                                    detail: i18nFilter('l-erro-cadastro-cartao', [], 'js/aluno/carteira-digital')
                                });

                                executaCallback(callback);
                            }, 100);
                        } else {
                            if (angular.isFunction(callback)) {
                                callback(response.token, response.maskedPan);
                            }
                        }
                    });
                } else {
                    totvsNotification.notify({
                        type: 'error',
                        title: i18nFilter('l-Atencao'),
                        detail: result.Message
                    });

                    executaCallback(callback);
                }
            });
        }

        function montaCardType(codigo) {
            var codigoCyber = "";

            switch (codigo) {
                case 1: //Visa
                    codigoCyber = "001";
                    break;
                case 2: //Master
                    codigoCyber = "002";
                    break;
                case 3: //Elo
                    codigoCyber = "054";
                    break;
                case 4: //DinersClub
                    codigoCyber = "005";
                    break;
                case 5: //AmericanExpress
                    codigoCyber = "003";
                    break;
                case 6: //Aura
                    codigoCyber = "051";
                    break;
                case 7: //JCB
                    codigoCyber = "007";
                    break;
                case 8: //Discover
                    codigoCyber = "004";
                    break;
                case 9: //Hipercard
                    codigoCyber = "050";
                    break;
            }

            return codigoCyber;
        }

        function buscaParametrosFinanceiro(callback) {
            if (isDefinedNotNull(self.finParams) && self.finParams.ambienteProducao !== null) {
                if (angular.isFunction(callback)) {
                    callback(self.finParams);
                }
            } else {
                eduUtilsFactory.getParametrosTOTVSFinanceiroAsync(function(result) {
                    if (result) {
                        self.finParams = result;

                        if (angular.isFunction(callback)) {
                            callback(self.finParams);
                        }
                    }
                });
            }
        }

        function executaCallback(funcao) {
            if (angular.isFunction(funcao)) {
                funcao();
            }
        }

        function configuraWebComponent(handleOnChange, callback) {
            buscaParametrosFinanceiro(function(finParams) {
                var configuracao = {
                    locale: "pt_BR",
                    environment: finParams.ambienteProducao ? "live" : "test",
                    originKey: finParams.originKey,
                    amount: {
                        "value": 0,
                        "currency": 'BRL'
                    },
                    paymentMethodsResponse: {
                        "paymentMethods": [{
                            "brands": [
                                "amex",
                                "diners",
                                "discover",
                                "jcb",
                                "mc",
                                "visa",
                                "elo"
                            ],
                            "details": [{
                                    "key": "number",
                                    "type": "text"
                                },
                                {
                                    "key": "expiryMonth",
                                    "type": "text"
                                },
                                {
                                    "key": "expiryYear",
                                    "type": "text"
                                },
                                {
                                    "key": "cvc",
                                    "type": "text"
                                },
                                {
                                    "key": "holderName",
                                    "type": "text"
                                }
                            ],
                            "name": "Credit Card",
                            "type": "scheme",
                            "hasHolderName": true,
                            "billingAddressRequired": false,
                            "showPayButton": false,
                            "enableStoreDetails": false
                        }]
                    },
                    onChange: handleOnChange
                };

                if (angular.isFunction(callback)) {
                    callback(configuracao);
                }
            });
        }

        function carregaDadosCriptografados(state, component, escopo) {
            if (isDefinedNotNull(state.data.paymentMethod.encryptedCardNumber) &&
                isDefinedNotNull(state.data.paymentMethod.holderName) &&
                isDefinedNotNull(state.data.paymentMethod.encryptedExpiryMonth) &&
                isDefinedNotNull(state.data.paymentMethod.encryptedExpiryYear) &&
                isDefinedNotNull(state.data.paymentMethod.encryptedSecurityCode)) {
                escopo.controller.frmDadosCartao.$valid = true;

                escopo.controller.frmDadosCartao.NumeroCartao = state.data.paymentMethod.encryptedCardNumber;
                escopo.controller.frmDadosCartao.NomeTitular = state.data.paymentMethod.holderName;
                escopo.controller.frmDadosCartao.ValidadeMes = state.data.paymentMethod.encryptedExpiryMonth;
                escopo.controller.frmDadosCartao.ValidadeAno = state.data.paymentMethod.encryptedExpiryYear;
                escopo.controller.frmDadosCartao.CodigoSeguranca = state.data.paymentMethod.encryptedSecurityCode;
            } else {
                escopo.controller.frmDadosCartao.$valid = false;
            }
        }

        /**
         * Busca informações do endereço com base no CEP
         * @param {any} cep - CEP que será buscado
         * @param {any} callback - Função de callback com os dados do endereço encontrado
         */
        function buscarEnderecoCEP(cep, callback) {
            eduUtilsFactory.getEnderecoCEPAsync(cep, function(endereco) {
                if (endereco && endereco[0]) {
                    if (callback)
                        callback(endereco[0]);
                } else {
                    notificaCepNaoEncontrado();
                }
            });
        }

        /**
         * Toaster informando que o CEP não foi encontrado.
         */
        function notificaCepNaoEncontrado() {
            totvsNotification.notify({
                type: 'info',
                title: i18nFilter('l-Atencao'),
                detail: i18nFilter('l-msg-cep-nao-encontrado', [], 'js/aluno/carteira-digital')
            });
        }
    }
});