<?php
// Excel Avançado — Sophie Link (Arq 2: Vídeo Centrado / Zig-Zag)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel Avançado | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/excel-page.css?v=5">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a2-header">
    <a href="../index.php" class="a2-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a2-nav">
        <a href="#diferenciais">Vantagens</a>
        <a href="#grade">Programa</a>
        <a href="../index.php#fale-conosco" style="background:var(--a2-green);color:#fff;padding:10px 20px;border-radius:4px;">Matricule-se</a>
    </nav>
</header>

<section class="a2-hero">
    <h1>Transforme Dados em <span>Decisões</span></h1>
    <p>O treinamento executivo focado em profissionais que querem dominar cruzamento de dados, automação e dashboards gerenciais sem enrolação.</p>
    
    <div class="a2-video-box">
        <i data-lucide="play-circle"></i>
    </div>
</section>

<div class="a2-stats">
    <div class="a2-stat-item">
        <h3>+200</h3>
        <p>Fórmulas Práticas</p>
    </div>
    <div class="a2-stat-item">
        <h3>100%</h3>
        <p>Foco no Mercado</p>
    </div>
    <div class="a2-stat-item">
        <h3>Avançado</h3>
        <p>Nível Executivo</p>
    </div>
</div>

<section class="a2-zigzag" id="diferenciais">
    <div class="a2-zz-row">
        <div class="a2-zz-text">
            <h2>Análise de Dados Avançada</h2>
            <p>Aprenda a cruzar milhares de informações em segundos usando PROCV, ÍNDICE, CORRESP e Tabelas Dinâmicas complexas. Chega de sofrer com relatórios manuais.</p>
        </div>
        <div class="a2-zz-img">
            <i data-lucide="pie-chart"></i>
        </div>
    </div>
    <div class="a2-zz-row">
        <div class="a2-zz-text">
            <h2>Dashboards Gerenciais</h2>
            <p>Construa painéis visuais interativos que impressionam diretores e gerentes. Transforme tabelas chatas em velocímetros e gráficos de alto impacto.</p>
        </div>
        <div class="a2-zz-img">
            <i data-lucide="activity"></i>
        </div>
    </div>
    <div class="a2-zz-row">
        <div class="a2-zz-text">
            <h2>Automação de Rotinas</h2>
            <p>Ganhe horas do seu dia estruturando planilhas inteligentes e usando macros gravadas para que o Excel trabalhe para você enquanto você foca na estratégia.</p>
        </div>
        <div class="a2-zz-img">
            <i data-lucide="zap"></i>
        </div>
    </div>
</section>

<section class="a2-curriculum" id="grade">
    <h2 class="a2-curr-title">Programa do Curso</h2>
    <div class="a2-curr-grid">
        <div class="a2-curr-item">
            <div class="a2-curr-icon"><i data-lucide="check" style="width:30px;height:30px;"></i></div>
            <div class="a2-curr-text">
                <h4>Nivelamento e Funções Essenciais</h4>
                <p>Revisão de conceitos vitais, formatação condicional avançada e funções lógicas complexas (SE aninhado, E, OU).</p>
            </div>
        </div>
        <div class="a2-curr-item">
            <div class="a2-curr-icon"><i data-lucide="check" style="width:30px;height:30px;"></i></div>
            <div class="a2-curr-text">
                <h4>Cruzamento de Dados</h4>
                <p>O coração do curso: funções de pesquisa absolutas como PROCV, PROCH, ÍNDICE e CORRESP para consolidar bases imensas.</p>
            </div>
        </div>
        <div class="a2-curr-item">
            <div class="a2-curr-icon"><i data-lucide="check" style="width:30px;height:30px;"></i></div>
            <div class="a2-curr-text">
                <h4>Relatórios Dinâmicos</h4>
                <p>Criação, manipulação e segmentação de dados em Tabelas Dinâmicas para extrair inteligência de negócio rápido.</p>
            </div>
        </div>
        <div class="a2-curr-item">
            <div class="a2-curr-icon"><i data-lucide="check" style="width:30px;height:30px;"></i></div>
            <div class="a2-curr-text">
                <h4>Design de Dashboards</h4>
                <p>Uso correto de gráficos executivos, controles de formulário e boas práticas de UX para apresentação de resultados.</p>
            </div>
        </div>
    </div>
</section>

<footer class="a2-footer">
    <p>&copy; <?= date('Y') ?> Sophie Link. <a href="../index.php">Retornar ao Início</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
