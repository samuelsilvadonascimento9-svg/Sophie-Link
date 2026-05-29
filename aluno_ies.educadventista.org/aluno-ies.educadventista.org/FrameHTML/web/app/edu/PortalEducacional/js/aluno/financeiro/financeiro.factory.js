/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 * @description
 */

define(['aluno/financeiro/financeiro.module'], function() {

    'use strict';

    angular
        .module('eduFinanceiroModule')
        .factory('EduFinanceiroFactory', EduFinanceiroFactory)
        .factory('EduPaymentsFactory', EduPaymentsFactory);

    EduFinanceiroFactory.$inject = ['$totvsresource', '$modal'];
    EduPaymentsFactory.$inject = ['$totvsresource', '$modal'];

    // *********************************************************************************
    // *** Factory
    // *********************************************************************************
    function EduFinanceiroFactory($totvsresource, $modal) {
        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/Financeiro/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});
        factory.buscarBeneficios = buscarBeneficios;
        factory.buscaHistoricoFinanceiro = buscaHistoricoFinanceiro; // Busca todos os lançamentos
        factory.geraSegundaVia = geraSegundaVia;
        factory.geraSegundaViaExtratoFinanceiro = geraSegundaViaExtratoFinanceiro;
        factory.geraSegundaViaExtratoFinanceiroNovo = geraSegundaViaExtratoFinanceiroNovo;
        factory.obterCodigoBarrasBoleto = obterCodigoBarrasBoleto;
        factory.geraSegundaViaMatricula = geraSegundaViaMatricula;
        factory.gerarRecibo = gerarRecibo;
        factory.exibirDadosPagCartao = exibirDadosPagCartao;
        factory.exibirDadosPagCartaoMultiBoleto = exibirDadosPagCartaoMultiBoleto;
        factory.exibirSimulacaoBoleto = exibirSimulacaoBoleto;
        factory.exibirModalBoleto = exibirModalBoleto;
        factory.exibirModalBoletoExtratoFinanceiroNovo = exibirModalBoletoExtratoFinanceiroNovo;
        factory.exibirModalRecibo = exibirModalRecibo;
        factory.exibirDetalhamentoBoleto = exibirDetalhamentoBoleto;
        factory.retornarDadosPagCartao = retornarDadosPagCartao;
        factory.retornarUrlPagBuyPage = retornarUrlPagBuyPage;
        factory.retornarUrlPagCheckoutCielo = retornarUrlPagCheckoutCielo;
        factory.retornarScriptGetNet = retornarScriptGetNet;
        factory.simularNovaDataVencimento = simularNovaDataVencimento;
        factory.alterarDataVencimentoBoleto = alterarDataVencimentoBoleto;
        factory.exibirDadosPix = exibirDadosPix;
        factory.exibirListaBoletosSelecionadosPagamento = exibirListaBoletosSelecionadosPagamento;
        factory.exibirDadosCodigoBarras = exibirDadosCodigoBarras;
        factory.obterValorLiquidoBoleto = obterValorLiquidoBoleto;

        return factory;

        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        /**
         * Buscar registros de benefícios do aluno
         *
         * @param {any} callback - Função de callback, se necessário.
         * @returns Benefícios do aluno.
         */
        function buscarBeneficios(callback) {
            var parameters = {
                method: 'BolsasAluno',
                start: 0,
                limit: 1000
            };

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Gera segunda via do boleto
         * @param {int} idBoleto - Id do Boleto a ser gerado.
         * @param {String} nossoNumero - Nosso número.
         * @param {datetime} dtVencimento - Data de vencimento do boleto.
         * @param {Function} callback - Função de callback, se necessário.
         * @returns Segunda via do boleto do aluno.
         */
        function geraSegundaVia(idBoleto, nossoNumero, dtVencimento, callback) {
            var parameters = {};
            parameters['method'] = '2aViaBoletoAluno';
            parameters['idBoleto'] = idBoleto;
            parameters['nossoNumero'] = nossoNumero === null ? "" : nossoNumero;
            parameters['dtVencimento'] = dtVencimento;
            parameters['canalPagamento'] = EDU_CONST_CANAL_PAGAMENTO_PORTAL;

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Gera segunda via de boleto no extrato financeiro
         * @param {int} idBoleto - Id do Boleto a ser gerado.
         * @param {String} nossoNumero - Nosso número.
         * @param {datetime} dtVencimento - Data de vencimento do boleto.
         * @param {Function} callback - Função de callback, se necessário.
         * @returns Segunda via do boleto do aluno.
         */
        function geraSegundaViaExtratoFinanceiro(idBoleto, nossoNumero, dtVencimento, callback) {
            var parameters = {};
            parameters['method'] = '2aViaBoletoAlunoPorTipoRelatorio';
            parameters['idBoleto'] = idBoleto;
            parameters['nossoNumero'] = nossoNumero === null ? "" : nossoNumero;
            parameters['dtVencimento'] = dtVencimento;
            parameters['tipoExibicaoRelatorio'] = 'JPEG';
            parameters['canalPagamento'] = EDU_CONST_CANAL_PAGAMENTO_PORTAL;

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Retorna a segunda via de boleto do aluno, independente do contexto do aluno logado
         * @param {int} codColigada - cód. coligada
         * @param {int} idBoleto - Id do Boleto a ser gerado.
         * @param {String} nossoNumero - Nosso número.
         * @param {datetime} dtVencimento - Data de vencimento do boleto.
         * @param {Function} callback - Função de callback, se necessário.
         * * @param {Function} tipoExibicaoRelatorio - tipo de Exibição do relatório, ex.: "JPEG", "PDF", etc.
         * @returns Segunda via do boleto do aluno.
         */
        function geraSegundaViaExtratoFinanceiroNovo(codColigada, idBoleto, nossoNumero, dtVencimento, tipoExibicaoRelatorio, callback) {
            var parameters = {};
            parameters['method'] = '2aViaBoletoAlunoExtratoFinanceiroNovoPorTipoRelatorio';
            parameters['codColigada'] = codColigada;
            parameters['idBoleto'] = idBoleto;
            parameters['nossoNumero'] = nossoNumero === null ? "" : nossoNumero;
            parameters['dtVencimento'] = dtVencimento;
            parameters['tipoExibicaoRelatorio'] = tipoExibicaoRelatorio;

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Gera segunda via de boleto da finalização da matrícula
         * @param {int} idBoleto - Id do Boleto a ser gerado.
         * @param {String} nossoNumero - Nosso número.
         * @param {datetime} dtVencimento - Data de vencimento do boleto.
         * @param {int} - Id do Período letivo
         * @param {Function} callback - Função de callback, se necessário.
         * @returns Benefícios do aluno.
         */
        function geraSegundaViaMatricula(idBoleto, nossoNumero, dtVencimento, idPerlet, callback) {
            var parameters = {};
            parameters['method'] = '2aViaBoletoAlunoMatricula';
            parameters['idBoleto'] = idBoleto;
            parameters['nossoNumero'] = nossoNumero === null ? "" : nossoNumero;
            parameters['dtVencimento'] = dtVencimento;
            parameters['idPerlet'] = idPerlet;
            parameters['canalPagamento'] = EDU_CONST_CANAL_PAGAMENTO_PORTAL;

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Gerar o recibo do boleto informado
         * @param {int} idBoleto - Id do Boleto a ser gerado.
         * @param {Function} callback - Função de callback, se necessário.
         * @returns Benefícios do aluno.
         */
        function gerarRecibo(idBoleto, callback) {
            var parameters = {};
            parameters['method'] = 'ReciboAluno';
            parameters['idBoleto'] = idBoleto;

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Gerar o recibo do boleto informado
         * @param {int} idBoleto - Id do Boleto a ser gerado.
         * @param {Function} callback - Função de callback, se necessário.
         * @returns Imagem do recibo do aluno.
         */
        function gerarImagemRecibo(idBoleto, callback) {
            var parameters = {};
            parameters['method'] = 'ReciboAlunoPorTipoRelatorio';
            parameters['idBoleto'] = idBoleto;
            parameters['tipoRelatorio'] = 'JPEG';

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Busca os registros de boletos
         *
         * @param {any} todosAbertos - Exibe todos os boletos abertos
         * @param {any} startAt - Início dos registros retornados.
         * @param {any} limitAt - Limite de registros retornados.
         * @param {any} callback - Função de callback, se necessário.
         * @returns Benefícios do aluno.
         */
        function buscaHistoricoFinanceiro(todosAbertos, startAt, limitAt, callback) {
            var pStart = startAt || 0,
                pLimit = limitAt || 0,
                parameters = {};

            parameters['method'] = 'ExtratoFinanceiroAluno';
            parameters['todosAbertos'] = todosAbertos;
            parameters['start'] = pStart;
            parameters['limit'] = pLimit;

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Abri o modal de Pagamento do Boleto
         *
         * @param {int} idBoleto - Identificador do boleto
         */
        function exibirDadosPagCartao(idBoleto) {

            var params = {
                idBoleto: idBoleto
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/lancamentos-pagcartao.view.html',
                controller: 'EduPagCartaoController',
                controllerAs: 'controller',
                size: 'lg',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });
        }

        /**
         * Abre o modal de Pagamento para Múltiplos Boletos
         *
         * @param {int} listaBoletos - Lista de boletos
         * @param {boolean} isPay - É pay?
         * @param {object} resumoPagamento - Resumo dos dados para pagamento
         */
        function exibirDadosPagCartaoMultiBoleto(listaBoletos, isPay, resumoPagamento) {
            let params = {
                listaBoletos: listaBoletos,
                isPay: isPay,
                resumoPagamento: resumoPagamento
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/lancamentos-pagcartao.view.html',
                controller: 'EduPagCartaoController',
                controllerAs: 'controller',
                size: 'lg',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });
        }

        /**
         * Abre o modal de simulação do valor de um boleto
         */
        function exibirSimulacaoBoleto(idBoleto, nossoNumero, dataVencimentoBoleto, paramEdu) {

            var params = {
                idBoleto: idBoleto,
                nossoNumero: nossoNumero,
                dataVencimentoBoleto: dataVencimentoBoleto,
                paramEdu: paramEdu
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/simulacao/simulacao-boleto.view.html',
                controller: 'EduSimulacaoBoletoController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });

        }

        /**
         * Abri o modal de Pagamento com o Pix
         *
         * @param {object} listaBoletos - Lista de boletos para pagamento por Pix
         */
        function exibirDadosPix(listaBoletos) {
            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/pix/pagamento-pix.view.html',
                controller: 'EduPagamentoPixController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return listaBoletos;
                    }
                },
                backdrop: 'true'
            });
        }

        function exibirListaBoletosSelecionadosPagamento(boletosSelecionados, tipoPagamento, callback) {
            let parametros = {
                boletosSelecionados: boletosSelecionados,
                TipoPagamento: tipoPagamento
            };

            let modalBoletos = $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/pgto-boletos-selecionados/pagamento-boletos-selecionados.view.html',
                controller: 'EduPgtoBoletosListController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return parametros;
                    }
                },
                backdrop: 'true'
            });

            modalBoletos.result.then(function(paymentSummary) {
                if (paymentSummary)
                    callback(paymentSummary);
            });
        }

        function exibirDadosCodigoBarras(codBarras) {
            var params = {
                codBarras: codBarras
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/boleto/impressao-codigo-barras.view.html',
                controller: 'EduObterCodigoBarrasController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });
        }

        function exibirDetalhamentoBoleto(boleto, entrarComo) {

            var params = {
                codColigada: (boleto.studentsEnrollment.length > 0) ? boleto.studentsEnrollment[0].companyCode : -1,
                codFilial: (boleto.studentsEnrollment.length > 0) ? boleto.studentsEnrollment[0].branchCode : -1,
                codTipoCurso: (boleto.studentsEnrollment.length > 0) ? boleto.studentsEnrollment[0].levelEducationCode : -1,
                idBoleto: boleto.bankBilletCode,
                vencimento: boleto.dueDate,
                tipoUsuarioPortalAluno: entrarComo
            };

            $modal.open({
                templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/detalhamento/financeiro-detalhamento.view.html',
                controller: 'EduFinanceiroDetalhamentoController',
                controllerAs: 'controller',
                size: 'md',
                resolve: {
                    parametros: function() {
                        return params;
                    }
                },
                backdrop: 'true'
            });

        }

        /**
         * Abre o modal de 2a via de boleto, independente do contexto do aluno logado
         */
        function exibirModalBoletoExtratoFinanceiroNovo(codColigada, idBoleto, nossoNumero, dataVencimentoBoleto, possuiFormulaCodBarrasPagamento, paramEdu) {

            var params = {
                codColigada: codColigada,
                idBoleto: idBoleto,
                nossoNumero: nossoNumero,
                dataVencimentoBoleto: dataVencimentoBoleto,
                possuiFormulaCodBarrasPagamento: possuiFormulaCodBarrasPagamento,
                paramEdu: paramEdu
            };

            geraSegundaViaExtratoFinanceiroNovo(codColigada, idBoleto, nossoNumero, dataVencimentoBoleto, "JPEG", function(result) {
                if (result && result[0]['Bytes']) {

                    obterCodigoBarrasBoleto(codColigada, idBoleto, nossoNumero, dataVencimentoBoleto, function(callback) {
                        params.codBarras = callback[0]['IPTE'];
                        params.jpegRelatorioBoleto = result[0].Bytes;

                        $modal.open({
                            templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/boleto/impressao-boleto.view.html',
                            controller: 'EduImpressaoBoletoController',
                            controllerAs: 'controller',
                            size: 'lg',
                            resolve: {
                                parametros: function() {
                                    return params;
                                }
                            },
                            backdrop: 'true'
                        });

                    });
                }
            });
        }

        /**
         * Abre o modal de 2a via de boleto
         */
        function exibirModalBoleto(idBoleto, nossoNumero, dataVencimentoBoleto, paramEdu) {

            var params = {
                idBoleto: idBoleto,
                nossoNumero: nossoNumero,
                dataVencimentoBoleto: dataVencimentoBoleto,
                paramEdu: paramEdu
            };

            geraSegundaViaExtratoFinanceiro(idBoleto, nossoNumero, dataVencimentoBoleto, function(result) {
                if (result && result[0]['Bytes']) {

                    params.jpegRelatorioBoleto = result[0].Bytes;

                    $modal.open({
                        templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/boleto/impressao-boleto.view.html',
                        controller: 'EduImpressaoBoletoController',
                        controllerAs: 'controller',
                        size: 'lg',
                        resolve: {
                            parametros: function() {
                                return params;
                            }
                        },
                        backdrop: 'true'
                    });

                }
            });
        }

        /**
         * Simula o valor de um boleto em determinada data de vencimento
         *
         * @param {any} idBoleto - Id do boleto para pagamento.
         * @param {Date} novaDataVencimento - nova data de vencimento
         * @param {any} callback - Função de callback, se necessário.
         *
         */
        function simularNovaDataVencimento(idBoleto, novaDataVencimento, callback) {

            var parameters = {
                method: 'Boleto/SimulacaoValor',
                idBoleto: idBoleto,
                dataVencimento: novaDataVencimento
            };

            return factory.TOTVSQuery(parameters, function(response) {
                if (response) {
                    callback(response[0].VALORTOTALLIQUIDO);
                }
            });
        }

        /**
         * Obter código de barras do boleto
         */
        function obterCodigoBarrasBoleto(codColigada, idBoleto, nossoNumero, dtVencimento, callback) {

            var parameters = {
                method: 'Boleto/ObterIPTEBoleto',
                codColigada: codColigada,
                idBoleto: idBoleto,
                nossoNumero: nossoNumero === null ? "" : nossoNumero,
                dtVencimento: dtVencimento
            };

            return factory.TOTVSQuery(parameters, callback);
        }

        /**
         * Obtém o valor de um boleto         *
         * @param {any} idBoleto - Id do boleto para pagamento.
         * @param {any} callback - Função de callback, se necessário.         *
         */
        function obterValorLiquidoBoleto(idBoleto, callback) {

            let parameters = {
                method: 'Boleto/ValorLiquidoBoleto',
                idBoleto: idBoleto
            };

            return factory.TOTVSQuery(parameters, function(response) {
                if (response) {
                    callback(response[0].VALORTOTALLIQUIDO);
                }
            });
        }

        /**
         /**
         * Abre o modal de recibo de pagamento
         */
        function exibirModalRecibo(idBoleto) {
            var params = {
                idBoleto: idBoleto
            };

            gerarImagemRecibo(idBoleto, function(result) {
                if (result.length > 0 && result[0]['Bytes']) {

                    params.objRelatorioRecibo = result[0].Bytes;

                    $modal.open({
                        templateUrl: EDU_CONST_GLOBAL_URL_BASE_APP + '/js/aluno/financeiro/lancamentos/recibo/impressao-recibo.view.html',
                        controller: 'EduImpressaoReciboController',
                        controllerAs: 'controller',
                        size: 'lg',
                        resolve: {
                            parametros: function() {
                                return params;
                            }
                        },
                        backdrop: 'true'
                    });
                }
            });
        }

        /**
         * Simula o valor de um boleto em determinada data de vencimento
         *
         * @param {any} idBoleto - Id do boleto para pagamento.
         * @param {Date} novaDataVencimento - nova data de vencimento
         * @param {any} callback - Função de callback, se necessário.
         *
         */
        function alterarDataVencimentoBoleto(idBoleto, novaDataVencimento, callback) {

            var parameters = {
                method: 'Boleto/DataVencimento',
                idBoleto: idBoleto,
                novaDataVencimento: novaDataVencimento
            };

            return factory.TOTVSPost(parameters, {}, callback);
        }

        /**
         * Buscar registros dos dados para pagamento do boleto com cartão.
         *
         * @param {any} idBoleto - Id do boleto para pagamento.
         * @param {any} callback - Função de callback, se necessário.
         * @returns Dados para pagamento do boleto com cartão.
         */
        function retornarDadosPagCartao(idBoleto, callback) {

            var parameters = {
                method: 'DadosPagCartao',
                idBoleto: idBoleto
            };

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Buscar url para pagamento BuyPage.
         *
         * @param {any} idBoleto - Id do boleto para pagamento.
         * @param {any} valorBoleto - Id do boleto para pagamento.
         * @param {any} bandeira - Id do boleto para pagamento.
         * @param {any} produto - Id do boleto para pagamento.
         * @param {any} parcelas - Id do boleto para pagamento.
         * @param {any} urlRetorno - Id do boleto para pagamento.
         * @param {any} callback - Função de callback, se necessário.
         * @returns Dados para pagamento do boleto com cartão.
         */
        function retornarUrlPagBuyPage(idBoleto,
            valorBoleto,
            bandeira,
            produto,
            parcelas,
            urlRetorno,
            callback) {

            var parameters = {
                method: 'UrlBuyPageCielo',
                idBoleto: idBoleto,
                valorBoleto: valorBoleto,
                bandeira: bandeira,
                produto: produto,
                parcelas: parcelas,
                urlRetorno: urlRetorno
            };

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Buscar url para pagamento Checkout Cielo.
         *
         * @param {any} idBoleto - Id do boleto para pagamento.
         * @param {any} descricaoBoleto - Id do boleto para pagamento.
         * @param {any} valorBoleto - Id do boleto para pagamento.
         * @param {any} nomeRespFinanceiro - Id do boleto para pagamento.
         * @param {any} emailRespFinanceiro - Id do boleto para pagamento.
         * @param {any} cpfRespFinanceiro - Id do boleto para pagamento.
         * @param {any} telefoneRespFinanceiro - Id do boleto para pagamento.
         * @param {any} callback - Função de callback, se necessário.
         * @returns Dados para pagamento do boleto com cartão.
         */
        function retornarUrlPagCheckoutCielo(idBoleto,
            descricaoBoleto,
            valorBoleto,
            nomeRespFinanceiro,
            emailRespFinanceiro,
            cpfRespFinanceiro,
            telefoneRespFinanceiro,
            callback) {

            var parameters = {
                method: 'UrlCheckOutCielo',
                idBoleto: idBoleto,
                descricaoBoleto: descricaoBoleto,
                valorBoleto: valorBoleto,
                nomeRespFinanceiro: nomeRespFinanceiro,
                emailRespFinanceiro: emailRespFinanceiro,
                cpfRespFinanceiro: cpfRespFinanceiro,
                telefoneRespFinanceiro: telefoneRespFinanceiro
            };

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Busca script de configuração do IFrame do GetNet.
         *
         * @param {any} valorCompra - Valor do boleto.
         * @param {any} PrimeiroNome_Comprador -
         * @param {any} sobreNome_Comprador -
         * @param {any} cpfcnpj_Comprador -
         * @param {any} email_Comprador -
         * @param {any} telefone_Comprador -
         * @param {any} endereco_Comprador -
         * @param {any} NumeroResidencia_Comprador -
         * @param {any} complementoResidencia_Comprado -
         * @param {any} bairro_Comprador
         * @param {any} cidade_Comprador
         * @param {any} estado_Comprador
         * @param {any} cep_Comprador -
         * @param {any} pais_Comprador -
         * @param {any} produto -
         * @param {any} buttonclass
         * @param {any} IdBolet
         * @param {any} pagamentoCartaoDebito
         * @param {any} pagamentoCartaoCredito
         * @param {any} callback - Função de callback, se necessário.
         * @returns Dados para pagamento do boleto com cartão.
         */
        function retornarScriptGetNet(valorCompra,
            PrimeiroNome_Comprador, sobreNome_Comprador, cpfcnpj_Comprador, email_Comprador,
            telefone_Comprador, endereco_Comprador, NumeroResidencia_Comprador, complementoResidencia_Comprador,
            bairro_Comprador, cidade_Comprador, estado_Comprador, cep_Comprador, pais_Comprador, produto, buttonclass, IdBoleto,
            pagamentoCartaoDebito, pagamentoCartaoCredito, callback) {

            var parameters = {
                method: 'UrlIFrameGetNet',
                valorCompra: valorCompra,
                PrimeiroNome_Comprador: PrimeiroNome_Comprador,
                sobreNome_Comprador: sobreNome_Comprador,
                cpfcnpj_Comprador: cpfcnpj_Comprador,
                email_Comprador: email_Comprador,
                telefone_Comprador: telefone_Comprador,
                endereco_Comprador: endereco_Comprador,
                NumeroResidencia_Comprador: NumeroResidencia_Comprador,
                complementoResidencia_Comprador: complementoResidencia_Comprador,
                bairro_Comprador: bairro_Comprador,
                cidade_Comprador: cidade_Comprador,
                estado_Comprador: estado_Comprador,
                cep_Comprador: cep_Comprador,
                pais_Comprador: pais_Comprador,
                produto: produto,
                buttonclass: buttonclass,
                IdBoleto: IdBoleto,
                pagamentoCartaoDebito: pagamentoCartaoDebito,
                pagamentoCartaoCredito: pagamentoCartaoCredito
            };

            return factory.TOTVSGet(parameters, callback);
        }
    }

    function EduPaymentsFactory($totvsresource, $modal) {
        var url = CONST_GLOBAL_URL_BASE_SERVICOS + 'TOTVSEducacional/:method',
            factory;

        factory = $totvsresource.REST(url, {}, {});
        factory.getExtratoFinanceiroNew = getExtratoFinanceiroNew;
        factory.getDadosBoleto = getDadosBoleto;
        factory.getDadosMultiplosBoleto = getDadosMultiplosBoleto;
        factory.getDadosUsuarios = getDadosUsuarios;
        factory.getResumoPagamento = getResumoPagamento;
        factory.getResumoPagamentoMultiplosBoletos = getResumoPagamentoMultiplosBoletos;
        factory.getDetalhamentoBoleto = getDetalhamentoBoleto;
        factory.getCarteiraDigital = getCarteiraDigital;
        factory.getQtdeCartoesCarteiraDigital = getQtdeCartoesCarteiraDigital;
        factory.novoCartao = novoCartao;
        factory.apagarCartao = apagarCartao;
        factory.getCamposAntiFraude = getCamposAntiFraude;
        factory.gravaRecorrencia = gravaRecorrencia;
        factory.getRecorrencias = getRecorrencias;
        factory.apagarRecorrencia = apagarRecorrencia;
        factory.alterarCartaoRecorrencia = alterarCartaoRecorrencia;
        factory.retornaListaPaisesAsync = retornaListaPaisesAsync;
        factory.retornaListaEstadosAsync = retornaListaEstadosAsync;
        factory.getBoletoAlertaProxVencimento = getBoletoAlertaProxVencimento;
        factory.getMetadadosWidgetBinds = getMetadadosWidgetBinds;
        factory.validaDataGeracaoBoleto = validaDataGeracaoBoleto;

        return factory;

        function getExtratoFinanceiroNew(entrarComo, mostrarTodosPeriodosLetivos, listaTab, callback) {
            var parameters = {};
            parameters['method'] = 'v2/Payments/ExtratoFinanceiroNew';
            parameters['tipoUsuarioPortalAluno'] = entrarComo;
            parameters['mostrarTodosPeriodosLetivos'] = mostrarTodosPeriodosLetivos;
            parameters['filtroStatusBoletoExtratoFinanceiro'] = listaTab;

            return factory.TOTVSGet(parameters, callback);
        }

        function getBoletoAlertaProxVencimento(callback) {
            let parameters = {};
            parameters['method'] = 'v2/Payments/BoletoAlertaProximoVencimento';
            return factory.TOTVSGet(parameters, callback);
        }

        function getDadosBoleto(coligada, idboleto, telaOrigem, callback) {
            var parameters = {};
            parameters['method'] = 'v2/Payments/DadosBoleto';
            parameters['codColigada'] = coligada;
            parameters['idBoleto'] = idboleto;
            parameters['telaOrigemPortalAlunoPagamentoCartao'] = telaOrigem;

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Obtém os dados de múltiplos boletos
         *
         * @param {any} listaBoletos - Lista de boletos.
         * @param {any} telaOrigem - Tela de origem.
         * @param {any} callback - Função de callback, se necessário.
         * @returns Dados para pagamento para múltiplos boletos.
         */
        function getDadosMultiplosBoleto(listaBoletos, telaOrigem, callback) {
            let parameters = {};
            parameters['method'] = 'v2/Payments/DadosBoleto';
            parameters['listaBoletos'] = listaBoletos;
            parameters['telaOrigemPortalAlunoPagamentoCartao'] = telaOrigem;

            return factory.TOTVSGet(parameters, callback);
        }

        function getDadosUsuarios(callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/DadosUsuarios';

            return factory.TOTVSGet(parameters, callback);
        }

        function getResumoPagamento(coligada, boleto, formaPagamento, callback) {
            var parameters = {
                method: 'v1/Payments/ResumoPagamento',
                codColigada: coligada,
                idBoleto: boleto,
                tipoPagamento: formaPagamento
            };

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Obtém os dados do resumo de pagamento por múltiplos boletos
         *
         * @param {any} listaBoletos - Lista de boletos.
         * @param {any} formaPagamento - Forma de pagamento.
         * @param {any} tipoUsuarioPortalAluno - Tipo de usuário logado no portal do aluno.
         * @param {any} callback - Função de callback, se necessário.
         * @returns Dados do resumo de pagamento.
         */
        function getResumoPagamentoMultiplosBoletos(listaBoletos, formaPagamento, tipoUsuarioPortalAluno, callback) {
            let codTipoUsuarioPortalAluno = '';
            if (tipoUsuarioPortalAluno)
                codTipoUsuarioPortalAluno = tipoUsuarioPortalAluno;

            let parameters = {
                method: 'v2/Payments/ResumoPagamento',
                listaBoletos: listaBoletos,
                tipoPagamento: formaPagamento,
                tipoUsuarioPortalAluno: codTipoUsuarioPortalAluno
            };

            return factory.TOTVSGet(parameters, callback);
        }

        function getDetalhamentoBoleto(codColigada, codFilial, codTipoCurso, boleto, tipoUsuarioPortalAluno, callback) {
            var parameters = {
                method: 'v1/Payments/DetalhamentoBoleto',
                codColigada: codColigada,
                codFilial: codFilial,
                codTipoCurso: codTipoCurso,
                idBoleto: boleto,
                tipoUsuarioPortalAluno: tipoUsuarioPortalAluno
            };

            return factory.TOTVSGet(parameters, callback);
        }


        function getCarteiraDigital(cardType, callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/CarteiraDigital';
            parameters['cardType'] = cardType;

            return factory.TOTVSGet(parameters, callback);
        }

        function getQtdeCartoesCarteiraDigital(callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/QtdeCartoesCarteiraDigital';

            return factory.TOTVSGet(parameters, callback);
        }

        function novoCartao(coligada, filial, model, callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/CarteiraDigital/NovoCartao';
            parameters['codColigada'] = coligada;
            parameters['codFilial'] = filial;

            return factory.TOTVSPost(parameters, model, callback);
        }

        function apagarCartao(idCarteira, callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/CarteiraDigital/ApagaCartao';
            parameters['id'] = idCarteira;

            return factory.TOTVSUpdate(parameters, {}, callback);
        }

        function getCamposAntiFraude(companyCode, branchCode, bankBilletCode, copiedCard, digitalWalletCard, passport, callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/CamposAntiFraude';

            var model = {};
            model.CompanyCode = companyCode;
            model.BranchCode = branchCode;
            model.BankBilletCode = bankBilletCode;
            model.CopiedCard = copiedCard;
            model.DigitalWalletCard = digitalWalletCard;
            model.Passport = passport;
            model.ChannelCode = "web";
            model.AdyenPaymentSourceName = EDUPS_CONST_GLOBAL_ADYEN_PAYMENT_SOURCE_NAME;
            model.AdyenPaymentSourceVersion = EDUPS_CONST_GLOBAL_ADYEN_PAYMENT_SOURCE_VERSION;

            return factory.TOTVSPost(parameters, model, callback);
        }

        function gravaRecorrencia(model, callback) {
            let parameters = {};
            parameters['method'] = "v1/Payments/GravaRecorrencia";

            return factory.TOTVSPost(parameters, model, callback);
        }

        function getRecorrencias(callback) {
            var parameters = {};
            parameters['method'] = 'v1/Payments/GetRecorrencias';

            return factory.TOTVSGet(parameters, callback);
        }

        function apagarRecorrencia(idRecorrencia, servicos, callback) {
            let parameters = {};
            parameters['method'] = "v2/Payments/ApagaRecorrencia";
            parameters['servicos'] = servicos;
            parameters['idRecorrencia'] = idRecorrencia;

            return factory.TOTVSUpdate(parameters, {}, callback);
        }

        function alterarCartaoRecorrencia(idRecorrencia, idCarteiraDigital, servicos, callback) {
            let parameters = {};
            parameters['method'] = "v2/Payments/AlteraCartaoRecorrencia";
            parameters['servicos'] = servicos;
            parameters['idRecorrencia'] = idRecorrencia;
            parameters['idCarteiraDigital'] = idCarteiraDigital;

            return factory.TOTVSUpdate(parameters, {}, callback);
        }

        function retornaListaPaisesAsync(callback) {
            var parameters = {};
            parameters['method'] = "v1/Payments/ListaPaises";
            return factory.TOTVSGet(parameters, callback);
        }

        function retornaListaEstadosAsync(callback) {
            var parameters = {};
            parameters['method'] = "v1/Payments/ListaEstados";
            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Obtém os dados necessário para configuração dos metadados do widget binds.co
         * @param {any} callback Função de callback, se necessário.
         */
        function getMetadadosWidgetBinds(callback) {
            let parameters = {};
            parameters['method'] = 'v1/Payments/GetMetadadosWidgetBinds';

            return factory.TOTVSGet(parameters, callback);
        }

        /**
         * Valida se data usada para geração do boleto é igual data atual
         * @param {Date} dataBoleto Data de referência usada no cálculo do boleto
         * @param {any} callback Função de callback, se necessário.         
         */
        function validaDataGeracaoBoleto(dataBoleto, callback) {
            let parameters = {};
            let paramDataBoleto = `'${dataBoleto}'`;
            parameters['method'] = 'v1/Payments/ValidaDataIgualDataAtual';

            return factory.TOTVSPost(parameters, paramDataBoleto, callback);
        }
    }
});