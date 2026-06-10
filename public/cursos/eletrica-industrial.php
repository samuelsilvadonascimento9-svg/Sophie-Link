<?php
// Elétrica Industrial — Sophie Link (Design Web Sênior)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elétrica Industrial | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/elec-page.css?v=6">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a4-header">
    <a href="../index.php" class="a4-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div style="display:flex; align-items:center;">
        <nav class="a4-nav">
            <a href="#diferenciais">Especialidades</a>
            <a href="#grade">Curmatriz</a>
        </nav>
        <a href="../index.php#fale-conosco" class="a4-btn">Inscreva-se Agora</a>
    </div>
</header>

<div class="a4-hero-bg">
    <img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?q=80&w=1600&auto=format&fit=crop" alt="Painel elétrico industrial de alta potência">
</div>

<div class="a4-hero-title-box">
    <span class="font-accent">Especialização Técnica</span>
    <h1>Potência e Controle na <br>Alta Indústria.</h1>
    <p>Domine instalações elétricas complexas, inversores de frequência e a montagem de painéis de comando que sustentam as maiores operações industriais do país.</p>
</div>

<section class="a4-stats-section">
    <div class="a4-circle">
        <h3>96%</h3>
        <p>Empregabilidade</p>
    </div>
    <div class="a4-circle">
        <h3>NR-10</h3>
        <p>Incluso na Grade</p>
    </div>
    <div class="a4-circle">
        <h3>100%</h3>
        <p>Laboratórios Reais</p>
    </div>
</section>

<section class="a4-section" id="diferenciais">
    <h2 class="a4-title">Eixos de Atuação</h2>
    
    <div class="a4-wide-card">
        <div class="a4-wc-img">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop" alt="Painéis de Comando">
        </div>
        <div class="a4-wc-content">
            <div class="a4-wc-icon"><i data-lucide="cpu"></i></div>
            <div class="a4-wc-text">
                <h3>Painéis de Comando e Automação</h3>
                <p>Aprenda na prática a projetar e montar painéis seguindo normas rigorosas, utilizando contatores, relés térmicos, temporizadores e soft starters.</p>
            </div>
        </div>
    </div>
    
    <div class="a4-wide-card">
        <div class="a4-wc-img">
            <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=600&auto=format&fit=crop" alt="Máquinas Elétricas Industriais">
        </div>
        <div class="a4-wc-content">
            <div class="a4-wc-icon"><i data-lucide="activity"></i></div>
            <div class="a4-wc-text">
                <h3>Acionamento de Máquinas Elétricas</h3>
                <p>Domine o funcionamento e a parametrização avançada de motores de indução trifásicos e sistemas de correção de fator de potência.</p>
            </div>
        </div>
    </div>
    
    <div class="a4-wide-card">
        <div class="a4-wc-img">
            <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop" alt="EPI e Segurança NR-10">
        </div>
        <div class="a4-wc-content">
            <div class="a4-wc-icon"><i data-lucide="shield-alert"></i></div>
            <div class="a4-wc-text">
                <h3>Segurança Máxima NR-10</h3>
                <p>A segurança é inegociável na alta tensão. Você receberá treinamento prático completo e atualizado pelas normas NR-10 e SEP (Sistema Elétrico de Potência).</p>
            </div>
        </div>
    </div>
</section>

<section class="a4-section" id="grade" style="background:#fff; padding-top:60px; padding-bottom:80px; max-width:100%;">
    <div style="max-width:1200px; margin:0 auto;">
        <h2 class="a4-title">O que você vai dominar</h2>
        <div class="a4-grid-curriculo">
            <div class="a4-curr-box">
                <h4>Eletricidade Básica</h4>
                <p>Tensão, corrente, resistência e uso correto de multímetros, alicates amperímetros e megômetros em ambiente de campo.</p>
            </div>
            <div class="a4-curr-box">
                <h4>Comandos Elétricos</h4>
                <p>Partidas direta, estrela-triângulo e compensadora. Leitura e interpretação de diagramas unifilares industriais complexos.</p>
            </div>
            <div class="a4-curr-box">
                <h4>Instalações e Normas</h4>
                <p>Dimensionamento rigoroso de cabos, disjuntores e infraestrutura (eletrocalhas e leitos) de acordo com a NBR 5410.</p>
            </div>
        </div>
    </div>
</section>

<footer class="a4-footer">
    <p>Sophie Link &copy; <?= date('Y') ?> | <a href="../index.php">Retornar à página inicial</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
