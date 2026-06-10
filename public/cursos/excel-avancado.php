<?php
// Excel Avançado — Sophie Link (Design Web Sênior)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel Avançado | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/excel-page.css?v=6">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a2-header">
    <a href="../index.php" class="a2-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a2-nav">
        <a href="#diferenciais">O que vou aprender?</a>
        <a href="../index.php#fale-conosco">Matricule-se Agora</a>
    </nav>
</header>

<section class="a2-hero">
    <span class="font-accent">Seja indispensável no escritório</span>
    <h1>Domine o software mais <br>exigido pelas empresas.</h1>
    <p>Do Procv aos Dashboards interativos. Um curso desenhado para quem precisa de resultados rápidos, análise de dados precisa e produtividade máxima no ambiente corporativo.</p>
    
    <!-- Video Poster Fotográfico -->
    <div class="a2-video-box">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop" alt="Dashboard e Análise de Dados">
        <div class="a2-video-overlay">
            <div class="a2-play-btn"><i data-lucide="play"></i></div>
        </div>
    </div>
</section>

<section class="a2-stats">
    <div class="a2-stat-item">
        <h3>100%</h3>
        <p>Prático em Laboratório</p>
    </div>
    <div class="a2-stat-item">
        <h3>+10</h3>
        <p>Dashboards Criados</p>
    </div>
    <div class="a2-stat-item">
        <h3>40h</h3>
        <p>Carga Horária</p>
    </div>
</section>

<section class="a2-zigzag" id="diferenciais">
    <div class="a2-zz-row">
        <div class="a2-zz-text">
            <h2>Fórmulas Avançadas <br>Sem Mistério</h2>
            <p>Aprenda a aninhar funções complexas como SE, PROCV, ÍNDICE e CORRESP para automatizar rotinas massantes e evitar erros manuais nas planilhas do seu setor.</p>
            <p><em>Foco em produtividade real.</em></p>
        </div>
        <div class="a2-zz-img">
            <div class="a2-zz-deco"></div>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Pessoa trabalhando em dados no computador">
        </div>
    </div>

    <div class="a2-zz-row">
        <div class="a2-zz-text">
            <h2>Tabelas Dinâmicas e <br>Dashboards Executivos</h2>
            <p>Transforme milhares de linhas de dados brutos em painéis de controle visuais, dinâmicos e profissionais que impressionam qualquer gerência em minutos.</p>
            <p><em>Tome decisões baseadas em dados.</em></p>
        </div>
        <div class="a2-zz-img">
            <div class="a2-zz-deco"></div>
            <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=800&auto=format&fit=crop" alt="Gráficos e relatórios financeiros">
        </div>
    </div>
</section>

<footer class="a2-footer">
    <p>Sophie Link &copy; <?= date('Y') ?> | <a href="../index.php">Voltar ao Início</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
