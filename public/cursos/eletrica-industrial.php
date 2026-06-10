<?php
// Elétrica Industrial — Sophie Link (Arq 4: Dynamic Overlap)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elétrica Industrial | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/elec-page.css?v=5">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a4-header">
    <a href="../index.php" class="a4-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div style="display:flex; align-items:center;">
        <nav class="a4-nav">
            <a href="#diferenciais">Diferenciais</a>
            <a href="#grade">Módulos</a>
        </nav>
        <a href="../index.php#fale-conosco" class="a4-btn">Inscreva-se Agora</a>
    </div>
</header>

<div class="a4-hero-bg">
    <i data-lucide="zap"></i>
</div>

<div class="a4-hero-title-box">
    <h1>Potência e Controle na <br><span>Indústria</span></h1>
    <p>Especialize-se na área que move o mundo. Formamos eletricistas industriais de alta performance, prontos para atuar em painéis de comando, motores de grande porte e distribuição de alta potência.</p>
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
        <p>Foco Prático</p>
    </div>
    <div class="a4-circle">
        <h3>CREA</h3>
        <p>Registro CFT</p>
    </div>
</section>

<section class="a4-section" id="diferenciais">
    <h2 class="a4-title">Por que fazer este curso?</h2>
    
    <div class="a4-wide-card">
        <div class="a4-wc-icon"><i data-lucide="cpu"></i></div>
        <div class="a4-wc-text">
            <h3>Painéis de Comando</h3>
            <p>Aprenda na prática a projetar e montar painéis, utilizando contatores, relés térmicos, temporizadores e soft starters.</p>
        </div>
    </div>
    <div class="a4-wide-card">
        <div class="a4-wc-icon"><i data-lucide="activity"></i></div>
        <div class="a4-wc-text">
            <h3>Máquinas Elétricas</h3>
            <p>Domine o funcionamento e a parametrização de motores de indução trifásicos, além de correção de fator de potência.</p>
        </div>
    </div>
    <div class="a4-wide-card">
        <div class="a4-wc-icon"><i data-lucide="shield-alert"></i></div>
        <div class="a4-wc-text">
            <h3>Segurança Máxima</h3>
            <p>A segurança é inegociável. Treinamento completo seguindo as normas da NR-10 e SEP para a sua total proteção no mercado.</p>
        </div>
    </div>
</section>

<section class="a4-section" id="grade" style="background:#fff; padding-top:40px; padding-bottom:80px; max-width:100%;">
    <div style="max-width:1000px; margin:0 auto;">
        <h2 class="a4-title">Matriz Curricular</h2>
        <div class="a4-wide-card" style="border: 1px solid #e0f2fe; box-shadow:none;">
            <div class="a4-wc-icon" style="background:var(--a4-cyan);color:#fff;">1</div>
            <div class="a4-wc-text">
                <h3>Eletricidade Básica e Medidas</h3>
                <p>Tensão, corrente, resistência e uso correto de multímetros, alicates amperímetros e megômetros em campo.</p>
            </div>
        </div>
        <div class="a4-wide-card" style="border: 1px solid #e0f2fe; box-shadow:none;">
            <div class="a4-wc-icon" style="background:var(--a4-cyan);color:#fff;">2</div>
            <div class="a4-wc-text">
                <h3>Comandos Elétricos Industriais</h3>
                <p>Partidas direta, estrela-triângulo e compensadora. Leitura e interpretação de diagramas unifilares completos.</p>
            </div>
        </div>
        <div class="a4-wide-card" style="border: 1px solid #e0f2fe; box-shadow:none;">
            <div class="a4-wc-icon" style="background:var(--a4-cyan);color:#fff;">3</div>
            <div class="a4-wc-text">
                <h3>Instalações Industriais</h3>
                <p>Dimensionamento rigoroso de cabos, disjuntores e infraestrutura elétrica (eletrocalhas) de acordo com a NBR 5410.</p>
            </div>
        </div>
    </div>
</section>

<footer class="a4-footer">
    <p>Sophie Link &copy; <?= date('Y') ?> | <a href="../index.php">Voltar ao Início</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
