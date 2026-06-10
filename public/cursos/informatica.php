<?php
// Informática Básica e Avançada — Sophie Link (Arq 1: Tradicional Clean)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informática Básica e Avançada | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/info-page.css?v=5">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a1-header">
    <a href="../index.php" class="a1-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a1-nav">
        <a href="#diferenciais">Diferenciais</a>
        <a href="#grade">Matriz Curricular</a>
        <a href="../index.php#fale-conosco" class="a1-btn">Inscreva-se</a>
    </nav>
</header>

<section class="a1-hero">
    <div class="a1-hero-left">
        <h1>Seu futuro na tecnologia <span style="color:var(--a1-blue);">começa aqui.</span></h1>
        <p>Aprenda do básico ao avançado as ferramentas mais usadas no mercado de trabalho atual. Aulas 100% práticas em laboratórios de ponta.</p>
        <a href="../index.php#fale-conosco" class="a1-btn" style="padding: 15px 30px; font-size: 1.1rem;">Garantir Minha Vaga</a>
    </div>
    <div class="a1-hero-right">
        <div class="a1-hero-img">
            <i data-lucide="laptop" style="width:120px;height:120px;"></i>
        </div>
    </div>
</section>

<div class="a1-stats-wrapper">
    <div class="a1-stats-box">
        <div class="a1-stat">
            <h3>98%</h3>
            <p>Empregabilidade</p>
        </div>
        <div class="a1-stat">
            <h3>240h</h3>
            <p>Aulas Práticas</p>
        </div>
        <div class="a1-stat">
            <h3>15+</h3>
            <p>Laboratórios</p>
        </div>
        <div class="a1-stat">
            <h3>MEC</h3>
            <p>Aprovado</p>
        </div>
    </div>
</div>

<section class="a1-section" id="diferenciais">
    <h2 class="a1-section-title">O que nos torna diferentes?</h2>
    <div class="a1-grid">
        <div class="a1-card">
            <i data-lucide="monitor" style="width:40px;height:40px;"></i>
            <h4>Estrutura Premium</h4>
            <p>Laboratórios com computadores atualizados e softwares oficiais. Nada de máquinas lentas.</p>
        </div>
        <div class="a1-card">
            <i data-lucide="users" style="width:40px;height:40px;"></i>
            <h4>Professores do Mercado</h4>
            <p>Profissionais com vivência corporativa real para te ensinar o que as empresas de fato exigem.</p>
        </div>
        <div class="a1-card">
            <i data-lucide="award" style="width:40px;height:40px;"></i>
            <h4>Certificado Reconhecido</h4>
            <p>Válido em todo território nacional para enriquecer o seu currículo imediatamente.</p>
        </div>
    </div>
</section>

<section class="a1-section" id="grade" style="background:#fff;">
    <h2 class="a1-section-title">O que você vai aprender</h2>
    <div class="a1-list-wrap">
        <div class="a1-list-item">
            <div class="a1-list-icon"><i data-lucide="check-circle" style="width:30px;height:30px;"></i></div>
            <div class="a1-list-text">
                <h4>Windows e Ambiente de Trabalho</h4>
                <p>Gestão de pastas, segurança da informação, nuvem (Drive/OneDrive) e atalhos de produtividade.</p>
            </div>
        </div>
        <div class="a1-list-item">
            <div class="a1-list-icon"><i data-lucide="check-circle" style="width:30px;height:30px;"></i></div>
            <div class="a1-list-text">
                <h4>Editoração Profissional (Word)</h4>
                <p>Criação de ofícios, currículos, TCCs e contratos seguindo as normas da ABNT.</p>
            </div>
        </div>
        <div class="a1-list-item">
            <div class="a1-list-icon"><i data-lucide="check-circle" style="width:30px;height:30px;"></i></div>
            <div class="a1-list-text">
                <h4>Gestão em Planilhas (Excel)</h4>
                <p>Fórmulas básicas e intermediárias, relatórios financeiros, gráficos e organização de dados.</p>
            </div>
        </div>
        <div class="a1-list-item">
            <div class="a1-list-icon"><i data-lucide="check-circle" style="width:30px;height:30px;"></i></div>
            <div class="a1-list-text">
                <h4>Apresentações de Impacto (PowerPoint)</h4>
                <p>Animações, transições e criação de slides executivos para reuniões e palestras.</p>
            </div>
        </div>
    </div>
</section>

<footer class="a1-footer">
    <p>&copy; <?= date('Y') ?> Sophie Link. <a href="../index.php" style="color:var(--a1-blue);">Voltar ao Início</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
