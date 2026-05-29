/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */

/**
 * @module eduUtilsModule
 * @name eduEnumsConsts
 * @object constants
 *
 * @created 03/10/2016 v12.1.15
 * @updated
 *
 * @description Constantes para enums do Educacional.
 */

define(['utils/edu-utils.module'], function() {

    'use strict';

    angular
        .module('eduUtilsModule')
        .constant('eduEnumsConsts', {
            EduTipoUsuarioPortalEnum: {
                Aluno: 'A',
                Professor: 'P',
                Funcionario: 'F',
                Responsavel: 'R',
                AlunoProfessor: 'AP',
                Empresa: 'E'
            },
            EduTipoParametro: {
                Inteiro: 0,
                Real: 1,
                String: 2,
                Data: 3,
                Texto: 4,
                Checkbox: 5,
                Link: 6,
                Tabela: 7,
            },
            EduTipoApresentacaoEnum: {
                EnsinoBasico: 0,
                EnsinoSuperior: 1
            },
            EduSimOuNaoEnum: {
                Nao: 'N',
                Sim: 'S'
            },
            EduTipoAvalInstEnum: {
                Aluno: 'A',
                Professor: 'P',
                Egresso: 'E',
                Funcionario: 'F'
            },
            EduDadosCadastraisAlunoEnum: {
                ApenasConsulta: 'AC',
                SolicitaAlteracao: 'SA',
                SolicitaAlteracaoEnsino: 'SE',
                PermiteAlteracao: 'PA'
            },
            TstTipoQuestaoEnum: {
                Exclusiva: 'Exclusiva',
                Multipla: 'Multipla',
                Aberta: 'Aberta'
            },
            TstTrueFalseEnum: {
                True: 'T',
                False: 'F'
            },
            TipoEtapa: {
                Nota: 'N',
                Falta: 'F'
            },
            TipoAula: {
                Teorica: 'T',
                Pratica: 'P',
                Laboratorio: 'L',
                Estagio: 'E',
                Mista: 'M',
                Extensao: 'X'
            },
            StatusAtivInscrita: {
                NaoIniciada: 1,
                EmAndamento: 2,
                Concluida: 3
            },
            StatusBoletoEnum: {
                EmAberto: 0,
                Baixado: 1,
                Cancelado: 2,
                BaixadoParcialmente: 4,
                Inativo: 5
            },
            TipoEventoCalendario: {
                MatriculaPresencial: 0,
                MatriculaPortal: 1,
                Trancamento: 2,
                Avaliacoes: 3,
                AtividadesInsc: 4,
                Aula: 5,
                EntregaTrab: 6,
                LicaoCasa: 7
            },
            StatusLanEnum: {
                Aberto: 0,
                Baixado: 1,
                Cancelado: 2,
                BxAcordo: 3,
                BaixadoParcialmente: 4
            },
            EduMatricularSubTurmasEnum: {
                NaoPermitido: 0,
                Permitido: 1,
                PermitidoObrigatorio: 2
            },
            FinMeioPagtoAcordoEnum: {
                NaoInformar: 0,
                Informar: 1,
                InformarObrigatorio: 2
            },
            TipoIntegracaoBibliotecaria: {
                TOTVSGestaoBibliotecaria: '1',
                Pergamum: '2'
            },
            PaymentsTipoCartao: {
                Todos: -1,
                Credito: 1,
                Debito: 2
            },
            PaymentsTipoPagamento: {
                Carteira: 1,
                NovoCartao: 2
            },
            PaymentsPix: {
                QrCodeGerado: 1
            },
            EduTipoPagamentoEnum: {
                Boleto: 1,
                Cartao: 2,
                Pix: 3
            },
            PaymentsModeloTransacao: {
                CyberSource: 6,
                Adyen: 7
            },
            PaymentsFormaPgtoCalcLiquido: {
                CartaoCredito: 0,
                CartaoDebito: 1,
                Pix: 2
            },
            EduStatusEstagioSolicitacaoEnum: {
                EmAvaliacao: 0,
                Aprovado: 1,
                Reprovado: 2
            },
            EduStatusContratoEnum: {
                PendenteAssinatura: 1,
                Assinado: 2,
                Cancelado: 3,
                Encerrado: 4
            },
            EduFuncaoFuncionarioEnum: {
                Supervisor: 1,
                Contato: 2,
                ResponsavelLegal: 3,
                ResponsavelLegalSupervisor: 4
            },
            EduTipoVagaEnum: {
                Estagio: 0,
                Emprego: 1
            },
            EduTipoBolsaFiesEnum: {
                Nenhum: 0,
                FIES: 1,
                NovoFIES: 2
            },
            EduTipoDetalhamentoEnum: {
                Disciplina: "0",
                BolsaIncodicional: "4",
                BolsaCondicional: "5"
            },
            EduOrigemDetalhamentoEnum: {
                Servico: "SERVICO",
                BolsaIncodicional: "BOLINC",
                BolsaCondicional: "BOLCOND",
                DescontoPorAntecipacao: "DESCANT",
                Juros: "JUROS",
                Multa: "MULTA",
                ValorBaixadoParcialmente: "VALORBAIXADOPARCIALMENTE"
            },
            EduOpercaoDetalhamentoEnum: {
                Cobranca: "C",
                Desconto: "D"
            },
            EduOpercaoDiscDetalhamentoEnum: {
                Cobranca: "C",
                Abatimento: "A"
            },
            EduStatusPlanoAtividadeEnum: {
                Aprovado: 1,
                Pendente: 2,
                Reprovado: 3,
                EmAberto: 4,
                PendenteSupervisor: 5
            },
            EduStatusEstagioAvaliacaoFinalEnum: {
                EmAberto: 0,
                Pendente: 1,
                Aprovado: 2,
                Reprovado: 3
            },
            PaymentsAbreviacaoCartao: {
                Brasil: "BR",
                EUA: "US",
                Canada: "CA"
            },
            EduStatusDocumentoEntregueEnum: {
                NaoEntregue: 0,
                EntregueEmValidacao: 1,
                Recusado: 2,
                Validado: 3
            },
            PaymentsTelaOrigem: {
                NegociacaoOnline: 0,
                ExtratoFinanceiro: 1,
                MatriculaOnline: 2
            },
            EduStatusFiadorEnum: {
                Avaliacao: "V",
                Aprovado: "A",
                Reprovado: "R"
            },
            EduStatusFiadorContratoEnum: {
                EmAvaliacao: "V",
                Aprovado: "A",
                Reprovado: "R",
                Substituido: "S"
            },
            EduStatusDocumentoEntregueEnum: {
                NaoEntregue: 0,
                EntregueEmValidacao: 1,
                Recusado: 2,
                Validado: 3
            },
            EduDataServerArquivoEnum: {
                DocumentosFiador: "EduDocFiadorData",
                DocumentosAluno: "EduDocAlunoData"
            },
            EduExcecoesMatriculaEnum: {
                PLEncerrado: 0,
                ForaPeriodoMatricula: 1,
                AlunoInadimplente: 2,
                OcorrenciaAluno: 3,
                TurmaCheia: 4,
                FaltaDocObrigatorio: 5,
                EmprestimoAtrasoBib: 6,
                DebitoBiblioteca: 7,
                StatusBloqAltSitMat: 8,
                ForaPeriodoTurma: 9,
                StatusBloqMatricPL: 10,
                StatusBloqTranc: 11,
                ForaPeriodoTranc: 12,
                TrancPrimeiroPeriodo: 13,
                MaxPeriodosTranc: 14,
                NumPeriodosTranc: 15,
                AlterouNumero: 16,
                StatusBloqDisc: 17,
                DiscAtraso: 18,
                ChoqueHorarios: 19,
                PreRequisito: 20,
                CoRequisito: 21,
                DisciplinaCursada: 22,
                DisciplinaEmCurso: 23,
                MinCreditos: 24,
                MinDisciplinas: 25,
                MinCargaHoraria: 26,
                AprovEstudos: 27,
                LimiteMatricula: 28,
                PercLimiteMat: 29,
                MinimoCreditosPL: 30,
                MaximoCreditosPL: 31,
                ParamCurso: 32,
                JaMatriculadoPL: 33,
                ProcEmail: 34,
                ExcluiMatriculaComMovimento: 35,
                PreRequisitoFormula: 36,
                CoRequisitoFormula: 37,
                ParamMatricula: 38,
                StatusBloqAltSitMatDisc: 39,
                MatriculaEmTurmaDiscGerencial: 40,
                AlteraDataMatricula: 41,
                DesenturmacaoTurmaMista: 42,
                StatusBloqAltSitMatDiscPortal: 43,
                MatrizCurricularInativa: 44,
                TurmaCheiaCorrequisito: 45,
                SincUsuarioIntegracaoPergamum: 46,
                ErroConsultaPendenciaBiblioteca: 47,
                PermiteMatOutraFilial: 48,
                PermiteMatOutroNivelEnsino: 49,
                MatriculaComMovimentacao: 50,
                IntegralizacaoNaoAtendidaMatriculaDisciplina: 51,
                MinCreditosPeriodoNaoAtendidoIntegralizacaoAtendida: 52,
                IntegralizacaoNaoAtendidaConclusaoCursoMudancaStatus: 53,
                UltrapassouMaximoMatriculasItinerarioFormativo: 54,
                RequisitosItinerarioNaoAtendido: 55,
                ForaPeriodoMatriculaNoItinerarioFormativo: 56,
                PlanoPagtoDoContratoNaoDisponivelParaMtzDestinoNaTransfInterna: 57,
                NaoPossuiMinimoMatriculasItinerarioFormativo: 58,
                FaltaFiadorAprovado: 59,
            },
            TipoControleMatricula: {
                TipoControleMatriculaCH: 'C',
                TipoControleMatriculaNumeroDisciplina: 'D'
            },
            TabExtratoFinanceiro: {
                BoletosVencidos: 1,
                BoletosAVencer: 2,
                BoletosPagos: 3,
                Beneficios: 4
            },
            EduStatusTermoImagemVoz: {
                Pendente: "P",
                Aceito: "A",
                Revogado: "R"
            },
            EduPgtoMultiplosBoletosUsarParcelas: {
                MenorNumero: "E",
                MaiorNumero: "A"
            },
            EduTOTVSSignTipoStatusEnvelope: {
                Pendente: "Pendente",
                Finalizado: "Finalizado",
            }
        });
});