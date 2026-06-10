<?php
// Segurança do Trabalho — Sophie Link (Arq 5: Minimalist Timeline)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Segurança do Trabalho | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦺</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/seg-page.css?v=5">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a5-header">
    <a href="../index.php" class="a5-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a5-nav">
        <a href="#diferenciais">Formação</a>
        <a href="#grade">Disciplinas</a>
        <a href="../index.php#fale-conosco">Matricule-se</a>
    </nav>
</header>

<section class="a5-hero">
    <div class="a5-hero-title">
        <h1>Protegendo Vidas <br>Na Indústria.</h1>
        <p>A autoridade máxima na prevenção de acidentes e na proteção do maior ativo das empresas: as pessoas.</p>
        <a href="../index.php#fale-conosco" class="a5-btn">Ver Inscrições</a>
    </div>
</section>

<div class="a5-stats">
    <div class="a5-stat-block">
        <h3>PGR</h3>
        <p>Gestão de Riscos</p>
    </div>
    <div class="a5-stat-block">
        <h3>+20</h3>
        <p>Normas Práticas</p>
    </div>
    <div class="a5-stat-block">
        <h3>MTE</h3>
        <p>Registro Legal</p>
    </div>
</div>

<section class="a5-section" id="diferenciais">
    <h2 class="a5-title">Eixos de Intervenção</h2>
    <div class="a5-check-list">
        <div class="a5-check-item">
            <div class="a5-check-icon"><i data-lucide="shield-check"></i></div>
            <div class="a5-check-text">
                <h4>Inspeção Rigorosa de Áreas</h4>
                <p>Aprenda na prática a auditar canteiros de obras, pátios industriais e ambientes insalubres em busca de potenciais riscos de acidentes e não-conformidades.</p>
            </div>
        </div>
        <div class="a5-check-item">
            <div class="a5-check-icon"><i data-lucide="cross"></i></div>
            <div class="a5-check-text">
                <h4>Primeiros Socorros Avançados</h4>
                <p>Treinamento tático e intenso em RCP, uso de DEA, imobilização e protocolo de emergência para resposta rápida no local de trabalho.</p>
            </div>
        </div>
        <div class="a5-check-item">
            <div class="a5-check-icon"><i data-lucide="file-text"></i></div>
            <div class="a5-check-text">
                <h4>Documentação Legal e Laudos</h4>
                <p>Nenhum TST trabalha sem papelada. Ensino completo para a elaboração técnica de PGR, PCMSO, LTCAT e emissão de permissões de trabalho (PT).</p>
            </div>
        </div>
    </div>
</section>

<section class="a5-section" id="grade" style="background:#fff;">
    <h2 class="a5-title">Evolução do Curso</h2>
    <div class="a5-timeline">
        <div class="a5-tl-item">
            <h4>Fase 1: Higiene Ocupacional</h4>
            <p>Medição de ruído (dosímetros), calor (IBUTG) e químicos para elaboração de laudos de insalubridade e periculosidade.</p>
        </div>
        <div class="a5-tl-item">
            <h4>Fase 2: Trabalho em Altura e Espaço Confinado</h4>
            <p>Legislação profunda das normas NR-35 e NR-33. Uso de linhas de vida, trava-quedas e medidores atmosféricos.</p>
        </div>
        <div class="a5-tl-item">
            <h4>Fase 3: Prevenção e Combate a Incêndios</h4>
            <p>Classes de extintores, sistemas de hidrantes industriais, formação de brigadas e elaboração de planos de abandono rápido.</p>
        </div>
        <div class="a5-tl-item">
            <h4>Fase 4: Gestão e Legislação</h4>
            <p>Auditoria final, e-Social para SST, gestão da CIPA, comunicação de acidente de trabalho (CAT) e defesas técnicas.</p>
        </div>
    </div>
</section>

<footer class="a5-footer">
    <p>&copy; <?= date('Y') ?> Centro Universitário Sophie Link.<br><br><a href="../index.php">RETORNAR À PÁGINA INICIAL</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>