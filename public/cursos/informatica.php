<?php
// Informática — Sophie Link (Design Web Sênior)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Informática | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/info-page.css?v=6">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a1-header">
    <a href="../index.php" class="a1-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a1-nav">
        <a href="#diferenciais">Nossa Estrutura</a>
        <a href="#grade">Módulos</a>
        <a href="../index.php#fale-conosco" class="a1-btn">Garantir Vaga</a>
    </nav>
</header>

<section class="a1-hero">
    <div class="a1-hero-text">
        <span class="font-accent">O Futuro é Digital</span>
        <h1>Formamos os <br>Mestres da Tecnologia.</h1>
        <p>No Centro Técnico Sophie Link, você não aprende apenas a usar um computador. Você aprende a dominá-lo, consertá-lo e programá-lo. O mercado de TI de Parauapebas precisa de você.</p>
        <a href="../index.php#fale-conosco" class="a1-btn" style="padding: 16px 40px; font-size: 1.1rem;">Falar com a Secretaria</a>
    </div>
    
    <div class="a1-hero-photo">
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop" alt="Aluno estudando tecnologia">
        <div class="a1-photo-badge">
            <i data-lucide="check-circle"></i>
            <div>
                <h4>Aprovado pelo MEC</h4>
                <p>Diploma com validade nacional</p>
            </div>
        </div>
    </div>
</section>

<section class="a1-section" id="diferenciais" style="background: #fff;">
    <h2 class="a1-section-title">Onde a teoria encontra a <span class="font-accent" style="font-size:1em;">prática real</span></h2>
    
    <div class="a1-photo-grid">
        <div class="a1-photo-card">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" alt="Laboratório de Informática">
            <div class="a1-photo-card-body">
                <h4>Laboratórios Modernos</h4>
                <p>Cada aluno possui um computador individual de última geração. Esqueça a divisão de máquinas; o aprendizado é 100% mão na massa.</p>
            </div>
        </div>
        <div class="a1-photo-card">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" alt="Programação">
            <div class="a1-photo-card-body">
                <h4>Lógica e Programação</h4>
                <p>Do básico ao avançado, você aprenderá algoritmos, desenvolvimento web e banco de dados para criar sistemas reais.</p>
            </div>
        </div>
        <div class="a1-photo-card">
            <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop" alt="Hardware">
            <div class="a1-photo-card-body">
                <h4>Hardware na Veia</h4>
                <p>Desmonte, monte e conserte. Aulas imersivas de arquitetura de computadores, formatação e manutenção preventiva/corretiva.</p>
            </div>
        </div>
    </div>
</section>

<section class="a1-section" id="grade">
    <h2 class="a1-section-title" style="text-align:center;">Jornada de Aprendizado</h2>
    
    <div class="a1-modules">
        <div class="a1-module-item">
            <div class="a1-module-icon"><i data-lucide="monitor"></i></div>
            <div class="a1-module-text">
                <h4>Informática Básica (Pacote Office e Windows)</h4>
                <p>Domine editores de texto, planilhas avançadas, apresentações de impacto e a gestão total do sistema operacional.</p>
            </div>
        </div>
        <div class="a1-module-item">
            <div class="a1-module-icon"><i data-lucide="tool"></i></div>
            <div class="a1-module-text">
                <h4>Montagem e Manutenção de Computadores</h4>
                <p>Identificação de falhas, troca de peças, gestão térmica, instalação de drivers e formatação limpa e segura.</p>
            </div>
        </div>
        <div class="a1-module-item">
            <div class="a1-module-icon"><i data-lucide="network"></i></div>
            <div class="a1-module-text">
                <h4>Redes de Computadores</h4>
                <p>Cabeamento estruturado, configuração de roteadores, switches, IPs, topologias e segurança básica de rede.</p>
            </div>
        </div>
        <div class="a1-module-item">
            <div class="a1-module-icon"><i data-lucide="code"></i></div>
            <div class="a1-module-text">
                <h4>Desenvolvimento de Sistemas</h4>
                <p>Introdução à lógica de programação, HTML, CSS, JavaScript e estruturação de bancos de dados relacionais.</p>
            </div>
        </div>
    </div>
</section>

<footer class="a1-footer">
    <p>Centro Técnico Profissionalizante Sophie Link &copy; <?= date('Y') ?> | <a href="../index.php">Voltar ao Início</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
