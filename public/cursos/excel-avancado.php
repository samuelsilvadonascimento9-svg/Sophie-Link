<?php
// Excel Avançado — Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel Avançado | Sophie Link</title>
    <meta name="description" content="Curso de Excel Avançado na Sophie Link. Domine dados, fórmulas complexas e tabelas dinâmicas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/excel-page.css?v=3">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="ex-nav">
    <a href="../index.php" class="ex-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="ex-links">
        <a href="../index.php">Voltar ao Início</a>
        <a href="#conteudo">O que vou aprender?</a>
        <a href="../index.php#fale-conosco" class="btn-excel">Inscreva-se Agora</a>
    </div>
</nav>

<section class="ex-hero">
    <div class="ex-hero-content">
        <h1>Excel Avançado</h1>
        <p>Transforme dados brutos em decisões estratégicas. Domine funções complexas, macros, tabelas dinâmicas e torne-se a referência analítica do seu ambiente de trabalho.</p>
        <a href="../index.php#fale-conosco" class="btn-excel-light">Iniciar Jornada de Dados</a>
    </div>
</section>

<section class="ex-features">
    <div class="ex-feature-card">
        <div class="ex-feature-icon"><i data-lucide="function-square"></i></div>
        <h3>Fórmulas Lógicas</h3>
        <p>Domine PROCV, PROCH, SE, CONT.SE e centenas de funções financeiras e lógicas para automatizar cálculos complexos.</p>
    </div>
    <div class="ex-feature-card">
        <div class="ex-feature-icon"><i data-lucide="table-properties"></i></div>
        <h3>Tabelas Dinâmicas</h3>
        <p>Aprenda a resumir, analisar, explorar e apresentar dados de maneira interativa com poucos cliques.</p>
    </div>
    <div class="ex-feature-card">
        <div class="ex-feature-icon"><i data-lucide="line-chart"></i></div>
        <h3>Macros e Automação</h3>
        <p>Pare de fazer o mesmo trabalho todos os dias. Grave macros e entenda a lógica do VBA para o Excel trabalhar por você.</p>
    </div>
</section>

<section class="ex-content" id="conteudo">
    <h2 class="ex-content-title">Grade Curricular do Curso</h2>
    <ul class="ex-list">
        <li>
            <i data-lucide="check-circle" style="width:24px;height:24px;"></i>
            <div>
                <strong>Módulo 1: Funções de Pesquisa e Referência</strong><br>
                <span>Busca avançada de dados usando PROCV, ÍNDICE e CORRESP para cruzar tabelas gigantescas.</span>
            </div>
        </li>
        <li>
            <i data-lucide="check-circle" style="width:24px;height:24px;"></i>
            <div>
                <strong>Módulo 2: Funções Lógicas e Condicionais</strong><br>
                <span>Estruturas SE aninhadas, E, OU, formatação condicional avançada baseada em fórmulas lógicas.</span>
            </div>
        </li>
        <li>
            <i data-lucide="check-circle" style="width:24px;height:24px;"></i>
            <div>
                <strong>Módulo 3: Análise de Dados e Filtros</strong><br>
                <span>Filtros avançados, validação de dados em cascata, consolidação de planilhas e subtotais.</span>
            </div>
        </li>
        <li>
            <i data-lucide="check-circle" style="width:24px;height:24px;"></i>
            <div>
                <strong>Módulo 4: Tabelas e Gráficos Dinâmicos</strong><br>
                <span>Criação de resumos gerenciais, segmentação de dados e construção de dashboards visuais interativos no próprio Excel.</span>
            </div>
        </li>
        <li>
            <i data-lucide="check-circle" style="width:24px;height:24px;"></i>
            <div>
                <strong>Módulo 5: Introdução a Macros (VBA)</strong><br>
                <span>Gravador de macros, noções básicas de programação Visual Basic para Aplicações e automação de rotinas repetitivas.</span>
            </div>
        </li>
    </ul>
</section>

<footer class="ex-footer">
    <p>&copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link. <a href="../index.php">Ir para a Página Inicial</a></p>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
