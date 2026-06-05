<?php
// Administração — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administração de Empresas | Sophie Link</title>
    <meta name="description" content="Curso de Administração na Sophie Link. Formação executiva completa.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/adm-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body>

    <nav class="adm-nav">
        <a href="../index.php" class="adm-nav-logo">
            <img src="../assets/images/logoNome.png" alt="Sophie Link">
        </a>
        <div class="adm-nav-links">
            <a href="../index.php">Visão Geral</a>
            <a href="#modulos">Programa</a>
            <a href="#competencias">Habilidades</a>
        </div>
        <a href="../index.php#fale-conosco" class="adm-btn">Iniciar Carreira</a>
    </nav>

    <section class="adm-hero">
        <div class="adm-hero-content">
            <div class="adm-tag">EXECUTIVE PROGRAM</div>
            <h1>Administração <span>de Empresas</span></h1>
            <p>Desenvolva visão estratégica, lidere equipes de alta performance e domine a gestão financeira. Prepare-se para assumir cargos de liderança nas maiores empresas da região.</p>
            <a href="../index.php#fale-conosco" class="adm-btn">Ver Detalhes do Programa</a>
        </div>
        <div class="adm-hero-visual">
            <div class="adm-chart-row">
                <div class="adm-chart-col">
                    <div class="adm-chart-num">94%</div>
                    <div class="adm-chart-lbl">Empregabilidade</div>
                </div>
                <div class="adm-chart-col">
                    <div class="adm-chart-num">+6k</div>
                    <div class="adm-chart-lbl">Salário Médio (Gerência)</div>
                </div>
            </div>
            <div class="adm-chart-bar-wrap">
                <div class="adm-chart-bar" style="height:40%;animation-delay:0.1s;"></div>
                <div class="adm-chart-bar" style="height:60%;animation-delay:0.3s;"></div>
                <div class="adm-chart-bar" style="height:50%;animation-delay:0.5s;"></div>
                <div class="adm-chart-bar" style="height:80%;animation-delay:0.7s;"></div>
                <div class="adm-chart-bar" style="height:100%;animation-delay:0.9s;"></div>
            </div>
        </div>
    </section>

    <section class="adm-section" id="modulos">
        <div class="adm-section-header">
            <h2 class="adm-section-title">O Programa Executivo</h2>
            <p class="adm-section-desc">Uma grade curricular desenvolvida com base nas demandas reais do mercado corporativo moderno.</p>
        </div>
        <div class="adm-cards">
            <div class="adm-card">
                <div class="adm-card-icon"><i data-lucide="building-2"></i></div>
                <h3>Gestão Organizacional</h3>
                <p>Aprenda a estruturar empresas, definir culturas corporativas e aplicar metodologias ágeis de gestão e OKRs.</p>
            </div>
            <div class="adm-card">
                <div class="adm-card-icon"><i data-lucide="pie-chart"></i></div>
                <h3>Finanças & Controladoria</h3>
                <p>Domine o fluxo de caixa, DRE, planejamento tributário, matemática financeira e análise de investimentos de capital.</p>
            </div>
            <div class="adm-card">
                <div class="adm-card-icon"><i data-lucide="users"></i></div>
                <h3>Gestão de Pessoas</h3>
                <p>Liderança situacional, recrutamento estratégico, avaliação de desempenho e gestão de conflitos no ambiente de trabalho.</p>
            </div>
            <div class="adm-card">
                <div class="adm-card-icon"><i data-lucide="target"></i></div>
                <h3>Marketing Estratégico</h3>
                <p>Posicionamento de marca, funis de vendas, análise de mercado B2B/B2C e estratégias de crescimento.</p>
            </div>
            <div class="adm-card">
                <div class="adm-card-icon"><i data-lucide="truck"></i></div>
                <h3>Operações & Logística</h3>
                <p>Cadeia de suprimentos, gestão de estoques, logística reversa e otimização de processos operacionais (Lean).</p>
            </div>
            <div class="adm-card">
                <div class="adm-card-icon"><i data-lucide="briefcase"></i></div>
                <h3>Empreendedorismo</h3>
                <p>Plano de negócios, captação de recursos, inovação corporativa e pitch para investidores.</p>
            </div>
        </div>
    </section>

    <footer class="adm-footer">
        <div class="adm-footer-brand">Sophie Link Corporate</div>
        <p>&copy; <?= date('Y') ?> Centro Técnico Profissionalizante. Formando os líderes do amanhã.</p>
        <br>
        <a href="../index.php" style="color:#FFF; font-weight:bold;">Voltar à Página Principal</a>
    </footer>

    <script>
        lucide.createIcons();
    </script>
</body>

</html>