/**
 * @license TOTVS | Portal - TOTVS Educacional v12.1.15
 * (c) 2015-2016 TOTVS S/A https://www.totvs.com
 * License: Comercial
 */
(function() {

    'use strict';

    var DependenciasGlobais = [];

    //Módulos: AngularAMD Totvs Html Framework (THF)
    DependenciasGlobais.push('angularAMD', 'totvs-html-framework');

    //Módulo: TOTVS Desktop
    DependenciasGlobais.push(
        'totvs-desktop/totvs-desktop.module',
        'totvs-desktop/totvs-desktop.factory',
        'totvs-desktop/totvs-desktop.service',
        'totvs-desktop/totvs-desktop.controller',

        'totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.factory',
        'totvs-desktop/totvs-desktop-contexto/totvs-desktop-contexto-curso.controller'
    );

    //Controllers, Diretivas, Módulos, Providers, Factorys e Services Globais da aplicação
    DependenciasGlobais.push(
        'widgets/widget.module',

        'aluno/main/main.module',
        'aluno/main/main.route',

        'aluno/mural/mural.module',
        'aluno/mural/mural.route',

        'aluno/faltas/faltas.module',
        'aluno/faltas/faltas.route',

        'aluno/notas/notas.module',
        'aluno/notas/notas.route',

        'aluno/notafalta-unificada/notafalta-unificada.module',
        'aluno/notafalta-unificada/notafalta-unificada.route',

        'aluno/competencias/competencias.module',
        'aluno/competencias/competencias.route',

        'aluno/desempenho/desempenho.module',
        'aluno/desempenho/desempenho.route',

        'aluno/plano-aula/plano-aula.module',
        'aluno/plano-aula/plano-aula.route',

        'aluno/avaliacoes/avaliacoes.module',
        'aluno/avaliacoes/avaliacoes.route',

        'aluno/calendario/calendario.module',
        'aluno/calendario/calendario.route',

        'aluno/ocorrencias/ocorrencias.module',
        'aluno/ocorrencias/ocorrencias.route',

        'aluno/grade-curricular/grade-curricular.module',
        'aluno/grade-curricular/grade-curricular.route',

        'aluno/historico-eb/historico-eb.module',
        'aluno/historico-eb/historico-eb.route',

        'aluno/disciplinas-eb/disciplinas-eb.module',
        'aluno/disciplinas-eb/disciplinas-eb.route',

        'aluno/entregas/entregas.module',
        'aluno/entregas/entregas.route',

        'aluno/quadro-horario/quadro-horario.module',
        'aluno/quadro-horario/quadro-horario.route',

        'aluno/disciplina/disciplina.module',
        'aluno/disciplina/disciplina.route',

        'aluno/aulas/aulas.module',
        'aluno/aulas/aulas.route',

        'aluno/tcc/tcc.module',
        'aluno/tcc/tcc.route',

        'aluno/matricula/matricula-disciplina.module',
        'aluno/matricula/matricula-disciplina-detalhes.factory',
        'aluno/matricula/matricula-disciplina-detalhes.controller',
        'aluno/matricula/matricula-disciplina.service',

        'aluno/pagamento-cartao/pagamento-cartao.module',
        'aluno/pagamento-cartao/pagamento-cartao.route',

        'aluno/carteira-digital/carteira-digital.module',
        'aluno/carteira-digital/carteira-digital.route',

        'aluno/dados-pessoais/dados-pessoais.module',
        'aluno/dados-pessoais/responsaveis/responsaveis.module',
        'aluno/dados-pessoais/documentos/documentos.module',
        'aluno/dados-pessoais/movimentacao-academica/movimentacao-academica.module',
        'aluno/dados-pessoais/ficha-medica/ficha-medica.module',
        'aluno/dados-pessoais/ficha-medica-flexivel/ficha-medica-flexivel.module',
        'aluno/dados-pessoais/dados-pessoais.route',
        'aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.route',
        'aluno/dados-pessoais/termo-imagem-voz/termo-imagem-voz.service',

        'aluno/financeiro/financeiro.module',
        'aluno/financeiro/financeiro.new.route',
        'aluno/financeiro/lancamentos/simulacao/simulacao-boleto.controller',
        'aluno/financeiro/lancamentos/boleto/impressao-boleto.controller',
        'aluno/financeiro/lancamentos/boleto/impressao-codigo-barras.controller',
        'aluno/financeiro/lancamentos/recibo/impressao-recibo.controller',
        'aluno/financeiro/lancamentos/pix/pagamento-pix.controller',
        'aluno/financeiro/lancamentos/pgto-boletos-selecionados/pagamento-boletos-selecionados.controller',
        'aluno/financeiro/lancamentos/detalhamento/financeiro-detalhamento.controller',

        'aluno/negociacao/negociacao.module',
        'aluno/negociacao/negociacao.route',
        'aluno/negociacao/termo-aceite/impressao-termo-aceite.controller',

        'aluno/relatorios/relatorios.module',
        'aluno/relatorios/relatorios.route',

        'aluno/atividades-extras/atividades-extras.module',
        'aluno/atividades-extras/atividades-extras.route',
        'aluno/atividades-extras/inscritas/atividades-extras-inscritas-detalhes.controller',

        'aluno/requerimentos/requerimentos.module',
        'aluno/requerimentos/requerimentos.route',

        'aluno/arquivos/arquivo.module',
        'aluno/arquivos/arquivo.route',
        'aluno/arquivos/arquivo.controller',
        'aluno/arquivos/arquivo.factory',

        'aluno/matricula/matricula.module',
        'aluno/matricula/matricula.route',

        'aluno/estagio-emprego/estagio-emprego.module',
        'aluno/estagio-emprego/estagio-emprego.route',

        'aluno/altera-senha/altera-senha.module',
        'aluno/altera-senha/altera-senha.route',

        'aluno/atividades-academicas/atividades-academicas-alerta.module',

        'biblioteca/pesquisa-acervo/pesquisa-acervo.module',
        'biblioteca/pesquisa-acervo/pesquisa-acervo.route',

        'biblioteca/movimentacoes/bib-movimentacoes.module',
        'biblioteca/movimentacoes/bib-movimentacoes.route',

        'biblioteca/extrato-financeiro/extrato-financeiro.module',
        'biblioteca/extrato-financeiro/extrato-financeiro.route',
        'biblioteca/extrato-financeiro/detalhamento/extrato-detalhado.controller',
        'biblioteca/extrato-financeiro/boleto/impressao-boleto.controller',

        'setup/setup.module',
        'setup/setup.route',

        'diretivas/diretivas.module',
        'diretivas/edu-selecao-periodoletivo.directive',
        'diretivas/edu-selecao-turmadisciplina.directive',
        'diretivas/edu-turma-disciplina.directive',
        'diretivas/edu-datepicker.directive',
        'diretivas/edu-selecao-etapa.directive',
        'diretivas/edu-img-foto.directive',
        'diretivas/edu-selecao-grupoatendimento.directive',
        'diretivas/edu-file-model.directive',
        'diretivas/edu-upload-file.directive',
        'diretivas/edu-scheduler.directive',
        'diretivas/edu-widgets-container.directive',
        'diretivas/edu-alerta-prox-vencimento.directive',
        'diretivas/edu-alerta-atividades-academicas.directive',

        'utils/edu-utils.module',
        'utils/edu-enums.constants',

        'utils/reports/edu-relatorio.module',
        'utils/reports/edu-relatorio.service',

        'utils/interceptors/edu-interceptors.module',

        'cst-customizacao/cst-customizacao.module',
        'cst-customizacao/cst-customizacao.route'

    );

    define(DependenciasGlobais, function(angularAMD) {

        var app =
            angular.module('totvsApp', [
                'ngSanitize',
                'ui.router',
                'ui.mask',
                'ui.select',
                'oc.lazyLoad',
                'totvsHtmlFramework',
                'totvsDesktop',
                'ngMask',
                'ngAnimate',
                'eduWidgetsModule',
                'eduMainModule',
                'eduMuralModule',
                'eduNotasModule',
                'eduRelatoriosModule',
                'eduNotaFaltaUnificadaModule',
                'eduCompetenciasModule',
                'eduDesempenhoModule',
                'eduPlanoAulaModule',
                'eduOcorrenciasModule',
                'eduQuadroHorarioModule',
                'eduFaltasModule',
                'eduDiretivasModule',
                'eduMatriculaDisciplinaModule',
                'eduDadosPessoaisModule',
                'eduResponsaveisModule',
                'eduDocumentosModule',
                'eduMovimentacaoAcademicaModule',
                'eduAvaliacoesModule',
                'eduCalendarioModule',
                'eduUtilsModule',
                'eduInterceptorsModule',
                'eduFinanceiroModule',
                'eduNegociacaoModule',
                'eduGradeCurricularModule',
                'eduHistoricoEBModule',
                'eduDisciplinasEBModule',
                'eduDisciplinaModule',
                'eduAulasModule',
                'eduAtividadesExtrasModule',
                'eduRelatorioModule',
                'eduRequerimentosModule',
                'eduArquivoModule',
                'eduSetupModule',
                'eduTccModule',
                'eduEntregasModule',
                'eduFichaMedicaModule',
                'eduMatriculaModule',
                'cstCustomizacaoModule',
                'eduPagamentoCartaoModule',
                'eduCarteiraDigitalModule',
                'eduEstagioEmpregoModule',
                'eduAlteraSenhaModule',
                'bibPesquisaAcervoModule',
                'bibMovimentacoesModule',
                'bibExtratoFinanceiroModule',
                'eduTermoImagemVozModule',
                'eduAtividadesAcademicasAlertaModule'
            ]);

        // Busca os arquivos de configuração e rota do módulo principal 'totvsApp'
        // antes antes de realizar o bootstrapping(inicialização) da aplicação
        requirejs(['totvs-app.config', 'totvs-app.route', 'totvs-app.polyfills.config'], function() {
            if (app != null) {

                //Inicializa a aplicação
                var myapp = angularAMD.bootstrap(app);

                // alteração para realizar o login antes de redirecionar para uma rota
                myapp
                    .run(['$rootScope', '$state', '$timeout', function($rootScope, $state, $timeout) {
                        $rootScope.$on("$locationChangeStart", function(event, next, current) {
                            var keyParam = getParamURL(next, 'key');
                            // caso seja login, parar o carregamento e validar o usuário primeiro
                            if (keyParam) {
                                try {
                                    if (EDU_CONST_GOOGLE_ANALYTICS) {
                                        window.gtag('event', 'login');
                                    }
                                } catch (e) {}
                                event.preventDefault();
                                $rootScope.$emit('ValidarUsuario', {
                                    keyParam: keyParam,
                                    route: getRoute(next)
                                });
                            }
                        });
                        $rootScope.$on('$locationChangeSuccess', function() {
                            try {
                                if (EDU_CONST_GOOGLE_ANALYTICS) {
                                    var page = window.location.hash;
                                    page = page ? page.replace('#', '') : '/main';
                                    var informacoes = {
                                        page_location: window.location.href,
                                        page_path: page,
                                        page_title: page
                                    };
                                    if ($rootScope.InformacoesLogin && $rootScope.InformacoesLogin.login) {
                                        informacoes['User-ID'] = $rootScope.InformacoesLogin.login;
                                    }
                                    window.gtag('event', 'page_view', informacoes);
                                }
                            } catch (e) {}

                            if (getParamURL(window.location.href, 'from') === 'external-login') {
                                // Reload the state
                                $timeout(() => $state.reload(), 500)
                            }
                        });
                    }]);

                return myapp;
            }
        });
    });

    /**
     * busca um parametro de uma url
     * @param {any} url
     * @param {any} nomeParametro
     */
    function getParamURL(url, nomeParametro) {
        var results = new RegExp('[\?&]' + nomeParametro + '=([^&#]*)').exec(url);

        if (angular.isArray(results) && results.length > 1) {
            return decodeURIComponent(results[1]);
        } else {
            return undefined;
        }
    }

    /**
     * recupera a rota na qual esta sendo redirecionado
     * @param {any} url
     */
    function getRoute(url) {
        var patt = /\/#\/.*\?/g;
        return url.match(patt)[0].replace("/#", "").replace("?", "");
    }

}());