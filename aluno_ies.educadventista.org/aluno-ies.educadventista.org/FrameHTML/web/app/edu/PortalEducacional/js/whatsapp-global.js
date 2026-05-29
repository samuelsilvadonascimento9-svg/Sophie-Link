/**
 * BOTÃO WHATSAPP DINÂMICO - PORTAL EDUCACIONAL
 * Versão FINAL - Produção
 * 
 * Detecta automaticamente a instituição do aluno logado e direciona
 * para o WhatsApp correto baseado em CODCOLIGADA e CODFILIAL
 * 
 * INSTALAÇÃO:
 * 1. Salvar como: /js/whatsapp-global.js
 * 2. Adicionar no index.html antes do </body>:
 *    <script src="js/whatsapp-global.js"></script>
 * 
 * CONFIGURAÇÃO:
 * Edite o objeto WHATSAPP_CONFIG abaixo com os números de cada instituição
 */

(function() {
    'use strict';

    // ========================================
    // ⚙️ CONFIGURAÇÃO DOS NÚMEROS DE WHATSAPP
    // ========================================

    // COLIGADAS COM ATENDIMENTO UNIFICADO (mesmo número para todas as filiais)
    var WHATSAPP_CONFIG_UNIFICADO = {
        '1': {
            phone: '5508009480048',
            name: 'UNASP'
        } // Todas as filiais da UNASP usam este número
    };

    // CONFIGURAÇÃO POR COLIGADA_FILIAL (atendimento específico por campus)
    var WHATSAPP_CONFIG = {
        // Outras Instituições (atendimento por campus)
        '2_1': {
            phone: '553538293600',
            name: 'FADMINAS'
        },
        '3_1': {
            phone: '554432368001',
            name: 'FAP'
        },
        '4_1': {
            phone: '5575991870101',
            name: 'UNIAENE'
        },
        '5_1': {
            phone: '559192416182',
            name: 'FAAMA'
        }
    };

    // Controle interno
    var botaoConfigurado = false;
    var ultimaChave = null;
    var ultimosDados = null; // Guardar dados completos para comparação

    // ========================================
    // 🔑 GERAR CHAVE ÚNICA DO CONTEXTO
    // ========================================
    function gerarChaveContexto(dados) {
        if (!dados) return null;

        // Incluir CODTIPOCURSO na chave para detectar mudanças de nível
        return dados.codColigada + '_' + dados.codFilial + '_' + dados.codTipoCurso;
    }

    // ========================================
    // 🔍 BUSCAR DADOS VIA TOTVS FACTORY
    // ========================================
    function buscarDadosViaFactory() {
        try {
            if (typeof angular === 'undefined') return null;

            var element = document.querySelector('[ng-controller="TotvsDesktopController as desktop"]') ||
                document.querySelector('[ng-app]') ||
                document.body;

            var injector = angular.element(element).injector();
            if (!injector) return null;

            var factory = injector.get('TotvsDesktopContextoCursoFactory');
            if (!factory) return null;

            var contexto = factory.getCursoSelecionado();
            if (!contexto || !contexto.cursoSelecionado) return null;

            var codColigada = contexto.cursoSelecionado.CODCOLIGADA;
            var codFilial = contexto.cursoSelecionado.CODFILIAL;
            var nomeFilial = contexto.cursoSelecionado.NOMEFILIAL;
            var codTipoCurso = contexto.cursoSelecionado.CODTIPOCURSO;
            var nivelEnsino = contexto.cursoSelecionado.NIVELENSINO;
            var tipoCurso = contexto.cursoSelecionado.TIPOCURSO;

            if (codColigada && codFilial) {
                return {
                    codColigada: codColigada,
                    codFilial: codFilial,
                    nomeFilial: nomeFilial,
                    codTipoCurso: codTipoCurso,
                    nivelEnsino: nivelEnsino,
                    tipoCurso: tipoCurso
                };
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    // ========================================
    // 🔗 MONTAR URL DO WHATSAPP
    // ========================================
    function montarURLWhatsApp(dados) {
        var config;
        var chave;

        // Regra: Ocultar WhatsApp para Nível 3 (Extensão/Livre) da UNASP
        if (dados.codColigada == 1 && dados.codTipoCurso == 3) {
            return null;
        }

        // Verificar se é uma coligada com atendimento unificado
        if (WHATSAPP_CONFIG_UNIFICADO[dados.codColigada]) {
            config = WHATSAPP_CONFIG_UNIFICADO[dados.codColigada];
            chave = dados.codColigada + '_unificado';
        } else {
            // Usar configuração específica por campus
            chave = dados.codColigada + '_' + dados.codFilial;
            config = WHATSAPP_CONFIG[chave];

            // Se não encontrar, tentar apenas pela coligada
            if (!config && WHATSAPP_CONFIG_UNIFICADO[dados.codColigada]) {
                config = WHATSAPP_CONFIG_UNIFICADO[dados.codColigada];
            }
        }

        // Se não encontrou configuração, retornar null
        if (!config) {
            return null;
        }

        var mensagem = encodeURIComponent('Olá, preciso de suporte');
        var url = 'https://wa.me/' + config.phone + '?text=' + mensagem;

        return {
            url: url,
            config: config,
            chave: chave
        };
    }

    // ========================================
    // 🎨 INJETAR ESTILOS CSS
    // ========================================
    function injetarEstilos() {
        if (document.getElementById('whatsapp-global-styles')) return;

        var style = document.createElement('style');
        style.id = 'whatsapp-global-styles';
        style.textContent = `
            .whatsapp-float-button {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                width: 60px !important;
                height: 60px !important;
                background-color: #25D366 !important;
                border-radius: 50% !important;
                display: none !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                z-index: 99999 !important;
                text-decoration: none !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
            }
            .whatsapp-float-button.visible { display: flex !important; }
            .whatsapp-float-button:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 6px 20px rgba(37,211,102,0.4) !important;
            }
            .whatsapp-icon { width: 32px !important; height: 32px !important; }
            .whatsapp-pulse {
                position: absolute !important;
                top: -2px !important;
                right: -2px !important;
                width: 18px !important;
                height: 18px !important;
                background-color: #FF4444 !important;
                border: 3px solid white !important;
                border-radius: 50% !important;
                animation: pulse-whatsapp 2s infinite !important;
            }
            .whatsapp-tooltip {
                position: fixed !important;
                bottom: 30px !important;
                right: 90px !important;
                background-color: white !important;
                padding: 10px 16px !important;
                border-radius: 8px !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                z-index: 99998 !important;
                white-space: nowrap !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
                pointer-events: none !important;
            }
            .whatsapp-float-button:hover + .whatsapp-tooltip {
                opacity: 1 !important;
                visibility: visible !important;
            }
            .whatsapp-tooltip-text {
                color: #374151 !important;
                font-size: 14px !important;
                font-weight: 500 !important;
            }
            .whatsapp-tooltip-arrow {
                position: absolute !important;
                right: -6px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                width: 0 !important;
                height: 0 !important;
                border-top: 6px solid transparent !important;
                border-bottom: 6px solid transparent !important;
                border-left: 6px solid white !important;
            }
            @keyframes pulse-whatsapp {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }
            @media (max-width: 768px) {
                .whatsapp-float-button {
                    bottom: 15px !important;
                    right: 15px !important;
                    width: 56px !important;
                    height: 56px !important;
                }
                .whatsapp-tooltip {
                    bottom: 26px !important;
                    right: 80px !important;
                    font-size: 13px !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // ========================================
    // 🔘 CRIAR BOTÃO HTML
    // ========================================
    function criarBotao() {
        if (document.getElementById('whatsapp-global-btn')) return;

        var botao = document.createElement('a');
        botao.id = 'whatsapp-global-btn';
        botao.className = 'whatsapp-float-button';
        botao.href = '#';
        botao.target = '_blank';
        botao.innerHTML = `
            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span class="whatsapp-pulse"></span>
        `;

        var tooltip = document.createElement('div');
        tooltip.className = 'whatsapp-tooltip';
        tooltip.innerHTML = `
            <span class="whatsapp-tooltip-text">💬 Fale com o Suporte</span>
            <div class="whatsapp-tooltip-arrow"></div>
        `;

        document.body.appendChild(botao);
        document.body.appendChild(tooltip);
    }

    // ========================================
    // 👁️ EXIBIR BOTÃO
    // ========================================
    function exibirBotao(url, config) {
        var botao = document.getElementById('whatsapp-global-btn');
        if (!botao) return;

        botao.href = url;
        botao.title = 'Falar com ' + config.name;
        botao.classList.add('visible');
    }

    // ========================================
    // 🚫 OCULTAR BOTÃO
    // ========================================
    function ocultarBotao() {
        var botao = document.getElementById('whatsapp-global-btn');
        if (!botao) return;

        botao.classList.remove('visible');
        botao.href = '#';
    }

    // ========================================
    // ⚙️ CONFIGURAR BOTÃO
    // ========================================
    function configurarBotao() {
        var botao = document.getElementById('whatsapp-global-btn');
        if (!botao) return;

        var dados = buscarDadosViaFactory();
        if (!dados) return;

        var novaChave = gerarChaveContexto(dados);
        var resultado = montarURLWhatsApp(dados);

        // Se retornou null, OCULTAR o botão (mas MANTER a chave!)
        if (!resultado) {
            ocultarBotao();
            botaoConfigurado = false;
            ultimaChave = novaChave;
            ultimosDados = dados;
            return;
        }

        // Se mudou o contexto, RECONFIGURAR
        if (ultimaChave !== novaChave) {
            exibirBotao(resultado.url, resultado.config);
            botaoConfigurado = true;
            ultimaChave = novaChave;
            ultimosDados = dados;
        } else if (!botaoConfigurado) {
            // Primeira configuração
            exibirBotao(resultado.url, resultado.config);
            botaoConfigurado = true;
            ultimaChave = novaChave;
            ultimosDados = dados;
        }
    }

    // ========================================
    // 👂 ESCUTAR EVENTOS ANGULAR
    // ========================================
    function escutarEventosAngular() {
        try {
            if (typeof angular === 'undefined') return;

            var element = document.querySelector('[ng-controller="TotvsDesktopController as desktop"]') ||
                document.querySelector('[ng-app]') ||
                document.body;

            var injector = angular.element(element).injector();
            if (!injector) return;

            var rootScope = injector.get('$rootScope');

            // Reconfigurar quando o aluno trocar de curso/contexto
            rootScope.$on('OnChangeCursoSelecionadoEmit:Event', function() {
                botaoConfigurado = false;
                ultimaChave = null;
                ultimosDados = null;

                setTimeout(function() {
                    configurarBotao();
                }, 100);

                setTimeout(function() {
                    configurarBotao();
                }, 500);
            });
        } catch (e) {
            // Silenciosamente falha
        }
    }

    // ========================================
    // 🔄 MONITORAR MUDANÇAS CONTINUAMENTE
    // ========================================
    function monitorarMudancas() {
        setInterval(function() {
            var dados = buscarDadosViaFactory();
            if (!dados) return;

            var novaChave = gerarChaveContexto(dados);

            // Se o contexto mudou, reconfigurar
            if (ultimaChave && ultimaChave !== novaChave) {
                botaoConfigurado = false;
                ultimaChave = null;
                ultimosDados = null;
                configurarBotao();
            }
        }, 1000);
    }

    // ========================================
    // 🚀 INICIALIZAR
    // ========================================
    function inicializar() {
        injetarEstilos();
        criarBotao();
        escutarEventosAngular();
        monitorarMudancas();

        // Tentativas progressivas até o Factory estar pronto
        var delays = [0, 2000, 4000, 6000, 8000];

        delays.forEach(function(delay) {
            setTimeout(function() {
                if (!botaoConfigurado) {
                    configurarBotao();
                }
            }, delay);
        });
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

})();