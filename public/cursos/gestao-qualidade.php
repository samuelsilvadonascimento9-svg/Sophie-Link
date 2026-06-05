<?php
// Gestão da Qualidade — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão da Qualidade | Sophie Link</title>
    <meta name="description" content="Curso de Gestão da Qualidade na Sophie Link. ISO 9001 e Six Sigma.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✅</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/gq-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="gq-nav">
    <a href="../index.php" class="gq-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="gq-nav-links">
        <a href="../index.php">Visão Geral</a>
        <a href="#programa">Programa</a>
    </div>
    <a href="../index.php#fale-conosco" class="gq-btn">Aplicação</a>
</nav>

<section class="gq-hero">
    <div class="gq-hero-grid"></div>
    <div class="gq-hero-content">
        <span class="gq-tag">Precisão & Excelência</span>
        <h1>Gestão da Qualidade Total</h1>
        <p>A qualidade não é um acidente, é o resultado de esforço inteligente. Torne-se o profissional responsável por auditar processos, aplicar normas ISO e garantir a excelência operacional exigida por multinacionais.</p>
        <a href="../index.php#fale-conosco" class="gq-btn" style="background:var(--gq-primary);color:#FFF!important;">Iniciar Programa</a>
    </div>
</section>

<div class="gq-metrics">
    <div class="gq-metric-item">
        <div class="gq-metric-val">100%</div>
        <div class="gq-metric-lbl">Foco em ISO 9001</div>
    </div>
    <div class="gq-metric-item">
        <div class="gq-metric-val">3σ</div>
        <div class="gq-metric-lbl">Princípios Six Sigma</div>
    </div>
    <div class="gq-metric-item">
        <div class="gq-metric-val">0</div>
        <div class="gq-metric-lbl">Margem para Erros</div>
    </div>
</div>

<section class="gq-section" id="programa">
    <h2 class="gq-section-title">Pilares do Conhecimento</h2>
    <div class="gq-cards">
        <div class="gq-card">
            <div class="gq-icon-wrap"><i data-lucide="award" style="width:28px;height:28px;"></i></div>
            <h3>Auditoria ISO</h3>
            <p>Conduzir auditorias internas e externas com base nas rigorosas normas da família ISO 9000 e 14000.</p>
        </div>
        <div class="gq-card">
            <div class="gq-icon-wrap"><i data-lucide="bar-chart-2" style="width:28px;height:28px;"></i></div>
            <h3>CEP Avançado</h3>
            <p>Controle Estatístico de Processo. Monitorar variáveis de produção com cartas de controle matemáticas.</p>
        </div>
        <div class="gq-card">
            <div class="gq-icon-wrap"><i data-lucide="scissors" style="width:28px;height:28px;"></i></div>
            <h3>Lean Manufacturing</h3>
            <p>A cultura Toyota aplicada. Implementação de 5S, Kaizen e eliminação sistemática de desperdícios.</p>
        </div>
        <div class="gq-card">
            <div class="gq-icon-wrap"><i data-lucide="alert-circle" style="width:28px;height:28px;"></i></div>
            <h3>FMEA e MASP</h3>
            <p>Análise de modos de falha e métodos ágeis para solução de problemas complexos na indústria.</p>
        </div>
    </div>
</section>

<footer class="gq-footer">
    <p>SOPHIE LINK — GESTÃO DA QUALIDADE &copy; <?= date('Y') ?></p>
    <a href="../index.php" style="color:var(--gq-primary);text-decoration:none;margin-top:1rem;display:inline-block;letter-spacing:1px;font-weight:500;">VOLTAR PARA A HOME</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
