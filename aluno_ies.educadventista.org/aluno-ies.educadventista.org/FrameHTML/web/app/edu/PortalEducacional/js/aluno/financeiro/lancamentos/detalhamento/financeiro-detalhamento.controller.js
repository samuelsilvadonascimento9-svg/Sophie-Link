/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduFinanceiroModule
 * @name EduFinanceiroDetalhamentoController
 * @object controller
 *
 * @created 2021-03-04 v12.1.32
 * @updated
 *
 * @requires Financeiro.module
 *
 * @dependencies EduFinanceiroFactory
 *
 * @description Controller exibição do detalhamento do boleto
 */
define(['aluno/financeiro/financeiro.module',
    'aluno/financeiro/financeiro.new.route',
    'utils/edu-enums.constants',
    'aluno/financeiro/financeiro.factory'
], function() {

    'use strict';

    angular.module('eduFinanceiroModule')
        .controller('EduFinanceiroDetalhamentoController', EduFinanceiroDetalhamentoController);

    EduFinanceiroDetalhamentoController.$inject = [
        'parametros',
        '$filter',
        '$modalInstance',
        'totvs.app-notification.Service',
        'i18nFilter',
        'eduEnumsConsts',
        'EduPaymentsFactory'
    ];

    /**
     * Controller exibição do detalhamento do boleto
     * @param   {object} parametros           Objeto com parametros
     * @param   {object} $modalInstance       Objeto para janela modal
     */
    function EduFinanceiroDetalhamentoController(
        parametros,
        $filter,
        $modalInstance,
        totvsNotification,
        i18nFilter,
        eduEnumsConsts,
        EduPaymentsFactory) {

        // *********************************************************************************
        // *** Variables
        // *********************************************************************************
        var self = this;
        self.listaParcelas = [];
        self.textoStatusPagamento = null;
        self.valorTotal = null;
        self.vencimento = null;

        // *********************************************************************************
        // *** Public Properties and Methods
        // *********************************************************************************
        self.modalInstance = $modalInstance;
        self.converteData = converteData;
        self.mostrarDetalhe = mostrarDetalhe;
        self.isBolsa = isBolsa;
        self.getTextoCota = getTextoCota;
        self.isDisciplina = isDisciplina;
        self.getBolsasParcela = getBolsasParcela;
        self.isPossuiBolsa = isPossuiBolsa;
        self.getValorTotal = getValorTotal;
        self.isPossuiOutrasCobrancas = isPossuiOutrasCobrancas;
        self.isDescontoPorAntecipacao = isDescontoPorAntecipacao;
        self.getDetalhamentoDisciplinas = getDetalhamentoDisciplinas;
        self.getDescricaoDetalhe = getDescricaoDetalhe;
        self.isServico = isServico;
        self.getSinalTransacao = getSinalTransacao;
        self.destacarCobranca = destacarCobranca;
        self.getSinalTransacaoDisciplina = getSinalTransacaoDisciplina;
        self.getTextoDescontoPorAntecipacao = getTextoDescontoPorAntecipacao;

        // *********************************************************************************
        // *** Controller Initialize
        // *********************************************************************************
        init();

        /**
         * Função de inicialização
         */
        function init() {

            self.vencimento = parametros.vencimento;

            EduPaymentsFactory.getDetalhamentoBoleto(parametros.codColigada, parametros.codFilial, parametros.codTipoCurso, parametros.idBoleto, parametros.tipoUsuarioPortalAluno,
                function(resultDetalhamento) {
                    if (isDefinedNotNull(resultDetalhamento)) {
                        self.listaParcelas = resultDetalhamento.DETALHAMENTO.StudentInstallmentDetails;
                        if (resultDetalhamento.DETALHAMENTO.Status == eduEnumsConsts.StatusBoletoEnum.EmAberto ||
                            resultDetalhamento.DETALHAMENTO.Status == eduEnumsConsts.StatusBoletoEnum.BaixadoParcialmente) {
                            self.textoStatusPagamento = $filter('i18n')('l-mensagem-detalhamento-total-pagar', [], 'js/aluno/financeiro/lancamentos');
                            self.valorTotal = resultDetalhamento.DETALHAMENTO.PaymentNetAmount;
                        } else if (resultDetalhamento.DETALHAMENTO.Status == eduEnumsConsts.StatusBoletoEnum.Baixado) {
                            self.textoStatusPagamento = $filter('i18n')('l-mensagem-detalhamento-total-pago', [], 'js/aluno/financeiro/lancamentos');
                            self.valorTotal = resultDetalhamento.DETALHAMENTO.PaidAmount;
                            self.vencimento = '';
                        }

                        if (isDefinedNotNull(resultDetalhamento.DETALHAMENTO.StudentCostOtherServices)) {
                            self.outrasCobrancas = resultDetalhamento.DETALHAMENTO.StudentCostOtherServices;
                        }
                    } else {

                        totvsNotification.notify({
                            type: 'error',
                            title: $filter('i18n')('l-mensagem-titulo-detalhamento', [], 'js/aluno/financeiro/lancamentos'),
                            detail: $filter('i18n')('l-mensagem-erro-detalhamento', [], 'js/aluno/financeiro/lancamentos')
                        });
                    }
                });
        }


        // *********************************************************************************
        // *** Functions
        // *********************************************************************************

        function getTextoCota(parcela) {

            if (parcela.NumberOfQuotas > 1) {
                return ' - ' +
                    $filter('i18n')('l-mensagem-cota-parcela', [], 'js/aluno/financeiro/lancamentos') +
                    ' ' +
                    parcela.InstallmentQuota;
            }

            return '';
        }

        function getDescricaoDetalhe(parcela, detalhe) {
            if (isDisciplina(parcela, detalhe)) {

                var servico = parcela.InstallmentDetails.find(e => e.CategoryCode === eduEnumsConsts.EduTipoDetalhamentoEnum.Disciplina);
                if (isDefinedNotNull(servico))
                    return servico.Description;
            }
            return detalhe.Description;
        }

        function isServico(detalhe) {
            return detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.Servico;
        }

        function isDisciplina(parcela, detalhe) {
            if (detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.Servico) {
                var existe = parcela.InstallmentDetails.find(e => e.CategoryCode === eduEnumsConsts.EduTipoDetalhamentoEnum.Disciplina);
                return isDefinedNotNull(existe);
            }

            return false;
        }

        function isBolsa(detalhe) {

            return detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.BolsaIncodicional ||
                detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.BolsaCondicional;

        }

        function isPossuiOutrasCobrancas() {
            return isDefinedNotNull(self.outrasCobrancas);
        }

        function getValorTotal() {
            if (isPossuiOutrasCobrancas()) {
                return self.valorTotal + self.outrasCobrancas.Amount;
            }
            return self.valorTotal;
        }

        function getSinalTransacao(detalhe) {
            if (detalhe.TransactionType == eduEnumsConsts.EduOpercaoDetalhamentoEnum.Cobranca)
                return '+'

            if (detalhe.TransactionType == eduEnumsConsts.EduOpercaoDetalhamentoEnum.Desconto ||
                detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.DescontoPorAntecipacao ||
                detalhe.CategoryCode == eduEnumsConsts.EduTipoDetalhamentoEnum.BolsaIncodicional ||
                detalhe.CategoryCode == eduEnumsConsts.EduTipoDetalhamentoEnum.BolsaCondicional)
                return '-'
        }

        function getSinalTransacaoDisciplina(disciplina) {
            if (disciplina.ItemType == eduEnumsConsts.EduOpercaoDiscDetalhamentoEnum.Cobranca)
                return '+'

            if (disciplina.ItemType == eduEnumsConsts.EduOpercaoDiscDetalhamentoEnum.Abatimento)
                return '-'
        }

        function getDetalhamentoDisciplinas(parcela) {

            var lista = $.grep(parcela.InstallmentDetails, function(e) {
                return e.CategoryCode === eduEnumsConsts.EduTipoDetalhamentoEnum.Disciplina
            });

            if (lista.length > 0)
                return lista[0].DisciplineCalculationDetails;

            return null;
        }

        function isPossuiBolsa(parcela) {
            for (var i = 0; i < self.listaParcelas.length; i++) {
                let selfParcela = self.listaParcelas[i];
                if (selfParcela.InstallmentQuota == parcela.InstallmentQuota && selfParcela.InstallmentId == parcela.InstallmentId) {
                    for (var j = 0; j < selfParcela.InstallmentCalculationSummary.length; j++) {
                        let selfParcelaSummary = selfParcela.InstallmentCalculationSummary[j];
                        if (mostrarDetalhe(selfParcelaSummary) && selfParcelaSummary.Source != undefined && isBolsa(selfParcelaSummary)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function isDescontoPorAntecipacao(detalhe) {
            return detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.DescontoPorAntecipacao &&
                detalhe.AdvanceDiscountInterval.length > 0;
        }

        function getTextoDescontoPorAntecipacao(detalhe) {
            var textoAuxiliar = '';

            if (detalhe.AdvanceDiscountInterval.length == 0) return textoAuxiliar;

            for (var i = 0; i < detalhe.AdvanceDiscountInterval.length; i++) {
                textoAuxiliar += (textoAuxiliar == '' ? '' : ', ') +
                    $filter('date')(detalhe.AdvanceDiscountInterval[i].Deadline, 'dd/MM/y') + '(' +
                    $filter('currency')(detalhe.AdvanceDiscountInterval[i].DiscountAmount) + ')';
            }

            return $filter('i18n')('l-mensagem-intervalo-desconto-por-antecipacao', [], 'js/aluno/financeiro/lancamentos') + textoAuxiliar;
        }

        function getBolsasParcela(parcela) {
            var listaBolsas = [];

            for (var i = 0; i < self.listaParcelas.length; i++) {
                let selfListaParcelas = self.listaParcelas[i];
                if (selfListaParcelas.InstallmentQuota == parcela.InstallmentQuota &&
                    selfListaParcelas.InstallmentNumber == parcela.InstallmentNumber &&
                    selfListaParcelas.$$hashKey == parcela.$$hashKey) {
                    for (var j = 0; j < selfListaParcelas.InstallmentCalculationSummary.length; j++) {
                        let selfParcelaSummary = selfListaParcelas.InstallmentCalculationSummary[j];
                        if (mostrarDetalhe(selfParcelaSummary) && selfParcelaSummary.Source != undefined && isBolsa(selfParcelaSummary)) {
                            listaBolsas.push(selfListaParcelas.InstallmentCalculationSummary[j]);
                        }
                    }
                }
            }

            return listaBolsas;
        }

        function mostrarDetalhe(detalhe) {

            return parseFloat(detalhe.Amount) > 0;
        }

        function isDefinedNotNull(objeto) {
            return (angular.isDefined(objeto) && objeto !== null);
        }

        function destacarCobranca(detalhe) {
            return detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.Juros ||
                detalhe.Source == eduEnumsConsts.EduOrigemDetalhamentoEnum.Multa;
        }

        function converteData(data) {
            if (data) {
                return $filter('date')(data, 'dd/MM/y');
            }
        }
    }
});