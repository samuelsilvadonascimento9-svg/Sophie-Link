<?php
// Informática Básica e Avançada — Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informática Básica e Avançada | Sophie Link</title>
    <meta name="description" content="Curso de Informática Básica e Avançada na Sophie Link. Domine o pacote Office, Windows e Ferramentas Digitais.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/info-page.css?v=3">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<div class="bg-blobs">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
</div>

<nav class="info-nav">
    <a href="../index.php" class="info-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="info-nav-links">
        <a href="../index.php"><i data-lucide="chevron-left" style="width:16px;height:16px;vertical-align:middle;"></i> Voltar para Início</a>
        <a href="#modulos">Módulos</a>
        <a href="#skills">Habilidades</a>
        <a href="../index.php#fale-conosco" class="btn-primary">Matricule-se</a>
    </div>
</nav>

<section class="info-hero">
    <div class="info-hero-content">
        <div class="info-badge"><i data-lucide="monitor" style="width:14px;height:14px;"></i> Curso Profissionalizante</div>
        <h1>Informática <span>Básica e Avançada</span></h1>
        <p>A porta de entrada para o mercado de trabalho. Domine o uso do computador, criação de documentos, planilhas avançadas, envio de e-mails corporativos e torne-se um profissional indispensável para qualquer escritório.</p>
        <a href="../index.php#fale-conosco" class="btn-primary" style="display:inline-block; margin-top:1rem; padding: 16px 32px; font-size: 1.1rem;">Garantir Minha Vaga</a>
    </div>
</section>

<section class="info-section" id="skills">
    <h2 class="info-section-title">O que você vai aprender</h2>
    <div class="glass-grid">
        <div class="glass-card">
            <div class="glass-card-icon"><i data-lucide="layout"></i></div>
            <h3>Pacote Office</h3>
            <p>Criação e formatação de textos profissionais no Word, apresentações de impacto no PowerPoint e conceitos essenciais do Pacote Office.</p>
        </div>
        <div class="glass-card">
            <div class="glass-card-icon"><i data-lucide="sheet"></i></div>
            <h3>Planilhas Avançadas</h3>
            <p>Aprenda a utilizar o Excel de forma inteligente, montando tabelas de controle, fórmulas essenciais e gráficos para relatórios.</p>
        </div>
        <div class="glass-card">
            <div class="glass-card-icon"><i data-lucide="globe"></i></div>
            <h3>Internet e E-mails</h3>
            <p>Navegação segura, pesquisas eficientes, organização na nuvem (Google Drive/OneDrive) e envio de e-mails profissionais com Outlook.</p>
        </div>
        <div class="glass-card">
            <div class="glass-card-icon"><i data-lucide="laptop"></i></div>
            <h3>Sistema Operacional</h3>
            <p>Entenda o Windows a fundo: organização de arquivos, atalhos de teclado de produtividade, painel de controle e configurações úteis.</p>
        </div>
    </div>
</section>

<section class="info-section" id="modulos">
    <h2 class="info-section-title">Estrutura do Curso</h2>
    <div class="modules-container">
        <div class="module-row">
            <div class="module-icon"><i data-lucide="mouse-pointer-click"></i></div>
            <div class="module-content">
                <h4>Módulo 1: Introdução à Informática</h4>
                <p>Conhecendo o hardware e software. Uso do mouse, teclado, e as primeiras interações com o sistema operacional Windows.</p>
            </div>
        </div>
        <div class="module-row">
            <div class="module-icon"><i data-lucide="type"></i></div>
            <div class="module-content">
                <h4>Módulo 2: Editoração de Textos</h4>
                <p>Microsoft Word: formatação de currículos, ofícios, regras ABNT básicas, estilos, margens e impressão correta de documentos.</p>
            </div>
        </div>
        <div class="module-row">
            <div class="module-icon"><i data-lucide="bar-chart-3"></i></div>
            <div class="module-content">
                <h4>Módulo 3: Planilhas e Gráficos</h4>
                <p>Microsoft Excel: formatando células, inserindo fórmulas matemáticas (SOMA, MÉDIA), procv básico, tabelas e criação de gráficos.</p>
            </div>
        </div>
        <div class="module-row">
            <div class="module-icon"><i data-lucide="presentation"></i></div>
            <div class="module-content">
                <h4>Módulo 4: Apresentações Profissionais</h4>
                <p>Microsoft PowerPoint: design de slides, transições, animações, e dicas para apresentações atraentes em reuniões de negócios.</p>
            </div>
        </div>
        <div class="module-row">
            <div class="module-icon"><i data-lucide="wifi"></i></div>
            <div class="module-content">
                <h4>Módulo 5: Internet Corporativa</h4>
                <p>Navegadores, antivírus básicos, ferramentas de busca avançada, agendamento de reuniões online e mercado digital.</p>
            </div>
        </div>
    </div>
</section>

<footer class="info-footer">
    <p>&copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link. <a href="../index.php">Voltar para a página inicial</a></p>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
