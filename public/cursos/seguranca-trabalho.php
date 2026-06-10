<?php
// Segurança do Trabalho — Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Segurança do Trabalho | Sophie Link</title>
    <meta name="description" content="Curso de Segurança do Trabalho. Previna acidentes e salve vidas na indústria.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦺</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/seg-page.css?v=3">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<div class="st-stripes"></div>

<nav class="st-nav">
    <a href="../index.php" class="st-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="st-links">
        <a href="../index.php">HOME</a>
        <a href="#conteudo">DISCIPLINAS</a>
        <a href="#normas">NORMAS REGULAMENTADORAS</a>
    </div>
    <a href="../index.php#fale-conosco" class="st-btn">INSCRIÇÃO</a>
</nav>

<section class="st-hero">
    <div class="st-hero-shield">
        <i data-lucide="shield-check"></i>
    </div>
    <h1>Técnico em <br><span>Segurança do Trabalho</span></h1>
    <p>Em áreas de mineração e indústria pesada, a vida humana é o ativo mais valioso. O Técnico em Segurança do Trabalho é a autoridade máxima na prevenção de acidentes, inspecionando áreas de risco e garantindo que todos voltem para casa em segurança.</p>
    <a href="#conteudo" class="st-btn" style="margin-top: 1rem;">VER GRADE CURRICULAR</a>
</section>

<section class="st-section" id="conteudo">
    <h2 class="st-title">Prevenção e Controle</h2>
    <div class="st-grid">
        <div class="st-card">
            <div class="st-card-icon"><i data-lucide="hard-hat"></i></div>
            <h3>Inspeção de Área</h3>
            <p>Identificar condições inseguras, avaliar riscos ocupacionais e determinar o uso correto de EPIs no ambiente de mineração e canteiros de obras.</p>
        </div>
        <div class="st-card">
            <div class="st-card-icon"><i data-lucide="users"></i></div>
            <h3>Gestão de CIPA e SIPAT</h3>
            <p>Organizar comissões internas de prevenção e semanas de conscientização, liderando equipes na cultura de segurança.</p>
        </div>
        <div class="st-card">
            <div class="st-card-icon"><i data-lucide="cross"></i></div>
            <h3>Primeiros Socorros</h3>
            <p>Atendimento pré-hospitalar de urgência, imobilização de fraturas, RCP e suporte básico de vida no local do acidente.</p>
        </div>
        <div class="st-card">
            <div class="st-card-icon"><i data-lucide="flame"></i></div>
            <h3>Combate a Incêndio</h3>
            <p>Classes de fogo, uso prático de extintores, sistemas de hidrantes e planos de abandono rápido de área de risco.</p>
        </div>
    </div>
</section>

<section class="st-rules" id="normas">
    <h2 class="st-title" style="color:var(--st-white);">Competências Legais (NRs)</h2>
    <ul class="st-rule-list">
        <li>
            <div class="st-rule-icon"><i data-lucide="arrow-up-circle" style="width:36px;height:36px;"></i></div>
            <div class="st-rule-text">
                <h4>NR-35: Trabalho em Altura</h4>
                <p>Emissão de permissões, inspeção rigorosa de cintos de segurança tipo paraquedista, talabartes, trava-quedas e ancoragem em linhas de vida.</p>
            </div>
        </li>
        <li>
            <div class="st-rule-icon"><i data-lucide="box" style="width:36px;height:36px;"></i></div>
            <div class="st-rule-text">
                <h4>NR-33: Espaço Confinado</h4>
                <p>Avaliação e monitoramento de gases, técnicas de ventilação exaustora e protocolos de resgate em silos, tanques e galerias subterrâneas.</p>
            </div>
        </li>
        <li>
            <div class="st-rule-icon"><i data-lucide="activity" style="width:36px;height:36px;"></i></div>
            <div class="st-rule-text">
                <h4>NR-15 e NR-16: Insalubridade e Periculosidade</h4>
                <p>Medição de ruído, calor (IBUTG), poeiras e agentes químicos para elaboração de laudos de adicional de risco.</p>
            </div>
        </li>
    </ul>
</section>

<footer class="st-footer">
    <a href="../index.php" class="st-btn" style="background:transparent; color:var(--st-yellow);">Voltar para o Início</a>
    <p style="margin-top:2rem; color:var(--st-gray);">&copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link.</p>
</footer>

<div class="st-stripes"></div>

<script>
    lucide.createIcons();
</script>
</body>
</html>