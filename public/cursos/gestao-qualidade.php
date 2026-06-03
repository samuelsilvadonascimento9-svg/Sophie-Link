<?php
// Técnico em Gestão da Qualidade — Sophie Link
$courseColor = '#059669';
$courseDark  = '#047857';
$courseLt    = 'rgba(5,150,105,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Gestão da Qualidade — Sophie Link</title>
    <meta name="description" content="Curso Técnico em Gestão da Qualidade na Sophie Link. ISO 9001, ferramentas da qualidade e melhoria contínua para a indústria de Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✅</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/curso.css?v=1">
    <style>:root { --c-course: <?= $courseColor ?>; --c-course-d: <?= $courseDark ?>; --c-course-lt: <?= $courseLt ?>; }</style>
</head>
<body>
<nav class="nav">
    <a href="../index.php" class="nav-brand"><img src="../assets/images/logoNome.png" alt="Sophie Link" style="width:200px;object-fit:contain;"></a>
    <div class="nav-actions">
        <a href="../index.php#cursos" class="nav-back"><i data-lucide="arrow-left"></i> Todos os Cursos</a>
        <a href="../index.php#fale-conosco" class="nav-cta-curso"><i data-lucide="send"></i> Inscreva-se</a>
    </div>
</nav>

<section class="curso-hero">
    <div class="hero-overlay"></div>
    <div class="hero-layout">
        <div class="hero-content">
            <div class="hero-badge"><i data-lucide="check-circle"></i> CURSO TÉCNICO</div>
            <h1>Técnico em <span>Gestão da Qualidade</span></h1>
            <p>Implante sistemas de qualidade, lidere auditorias ISO e elimine desperdícios. A excelência operacional começa com você.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="18" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="900" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">ISO</div><div class="hero-stat-lbl">9001 / 14001</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- GAUGE ANIMADO -->
            <div class="gauge-visual">
                <svg class="gauge-svg" viewBox="0 0 280 160">
                    <!-- Track -->
                    <path d="M 20 140 A 120 120 0 0 1 260 140" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="18" stroke-linecap="round"/>
                    <!-- Red zone -->
                    <path d="M 20 140 A 120 120 0 0 1 80 45" fill="none" stroke="rgba(239,68,68,0.6)" stroke-width="18" stroke-linecap="round"/>
                    <!-- Yellow zone -->
                    <path d="M 80 45 A 120 120 0 0 1 200 45" fill="none" stroke="rgba(250,204,21,0.6)" stroke-width="18" stroke-linecap="round"/>
                    <!-- Green zone -->
                    <path d="M 200 45 A 120 120 0 0 1 260 140" fill="none" stroke="rgba(74,222,128,0.7)" stroke-width="18" stroke-linecap="round"/>
                    <!-- Center -->
                    <circle cx="140" cy="140" r="10" fill="white" opacity="0.8"/>
                    <!-- Needle -->
                    <g id="gaugeNeedleGroup" style="transform-origin:140px 140px;transform:rotate(20deg);">
                        <line x1="140" y1="140" x2="140" y2="30" stroke="white" stroke-width="3" stroke-linecap="round" id="gaugeNeedle"/>
                    </g>
                    <!-- Labels -->
                    <text x="14" y="160" fill="rgba(255,255,255,0.6)" font-size="12" font-family="Inter">0%</text>
                    <text x="127" y="22" fill="rgba(255,255,255,0.6)" font-size="12" font-family="Inter">50%</text>
                    <text x="248" y="160" fill="rgba(255,255,255,0.6)" font-size="12" font-family="Inter">100%</text>
                </svg>
                <div class="gauge-label">98%</div>
                <div class="gauge-sublabel">Índice de Qualidade</div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">Qualidade que distingue líderes</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Técnico em Gestão da Qualidade</strong> é responsável por garantir que produtos e processos atendam aos mais altos padrões industriais. Com ISO 9001, Lean Manufacturing, Six Sigma e ferramentas da qualidade, este profissional é indispensável.</p>
                <p>Em Parauapebas, a Vale e suas contratadas exigem rigorosa conformidade com padrões internacionais. O técnico em qualidade é quem garante essa conformidade no dia a dia das operações.</p>
                <p>O curso prepara para auditorias internas ISO, análise de não-conformidades, implementação de melhorias contínuas e gestão de indicadores de performance (KPIs).</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="award"></i></div>
                    <div class="highlight-text"><h4>ISO 9001 / 14001</h4><p>Formação alinhada às normas internacionais mais exigidas pelas grandes corporações.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="trending-down"></i></div>
                    <div class="highlight-text"><h4>Lean Six Sigma</h4><p>Elimine desperdícios e reduza variações com as metodologias mais eficazes da manufatura enxuta.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="bar-chart-2"></i></div>
                    <div class="highlight-text"><h4>Controle Estatístico</h4><p>CEP, cartas de controle e análise de capacidade de processos com ferramentas avançadas.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Formação em excelência</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Fundamentos da Qualidade', '200h', ['História e Evolução da Qualidade', 'Normas ABNT e ISO 9001', 'Ferramentas Básicas da Qualidade (7 QC Tools)', 'Metrologia e Calibração']],
                ['Módulo II — Sistemas da Qualidade', '250h', ['SGQ — Sistema de Gestão da Qualidade', 'Auditorias Internas ISO', 'Análise de Falhas (FMEA)', 'CEP — Controle Estatístico de Processo']],
                ['Módulo III — Lean e Melhoria Contínua', '250h', ['Lean Manufacturing', 'Six Sigma — Yellow Belt', 'Kaizen e 5S', 'Gestão de Indicadores (KPIs)']],
                ['Módulo IV — Estágio e TCC', '200h', ['Estágio em Empresa Parceira', 'Projeto de Melhoria Real', 'Apresentação de Resultados', 'Trabalho de Conclusão']],
            ]; foreach ($modulos as $i => [$titulo,$horas,$disciplinas]): ?>
            <div class="modulo">
                <div class="modulo-header">
                    <div class="modulo-num"><?= $i+1 ?></div>
                    <span class="modulo-title"><?= $titulo ?></span>
                    <span class="modulo-hrs"><?= $horas ?></span>
                    <i data-lucide="chevron-down" class="modulo-chevron"></i>
                </div>
                <div class="modulo-body"><div class="modulo-body-inner"><ul><?php foreach ($disciplinas as $d): ?><li><?= $d ?></li><?php endforeach; ?></ul></div></div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="section reveal">
    <div class="container">
        <span class="sec-label">Competências</span>
        <h2 class="sec-title">O que você vai dominar</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['award','Auditoria ISO','Conduzir auditorias internas e externas com base nas normas ISO 9001 e 14001.'],
                ['bar-chart-2','CEP Avançado','Monitorar processos com cartas de controle e análise estatística de capacidade.'],
                ['scissors','Lean Manufacturing','Implementar Kaizen, 5S, VSM e eliminação de desperdícios nos processos produtivos.'],
                ['alert-circle','FMEA','Identificar e priorizar modos de falha antes que causem impactos à qualidade.'],
                ['check-square','Inspeção','Executar planos de inspeção, amostragem e controle de recebimento de materiais.'],
                ['trending-up','KPIs','Definir, medir e analisar indicadores-chave de desempenho para melhoria contínua.'],
            ]; foreach ($comps as [$icon,$title,$desc]): ?>
            <div class="competencia-card reveal">
                <div class="comp-icon"><i data-lucide="<?= $icon ?>"></i></div>
                <div class="comp-title"><?= $title ?></div>
                <div class="comp-desc"><?= $desc ?></div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="section section-alt reveal">
    <div class="container">
        <span class="sec-label">Mercado de Trabalho</span>
        <h2 class="sec-title">Qualidade como vantagem competitiva</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$3.800</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">90%</span><span class="lbl">Empregabilidade</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Técnico de Qualidade','Auditor Interno ISO','Inspetor de Qualidade','Analista de Processos','Coordenador 5S/Lean','Técnico em Metrologia','Analista de FMEA','Consultor de Qualidade'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Excelência em prática</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['V','Vanessa Dias','Auditora ISO — Vale','Conduzo auditorias de qualidade na maior mineradora do mundo. A Sophie Link me preparou melhor do que eu esperava para essa responsabilidade.'],
                ['B','Bruno Carvalho','Técnico Lean — Sotreq','Implementei o primeiro programa 5S da empresa. Reduziram os desperdícios em 34% no primeiro trimestre. Tudo que aprendi na Sophie Link.'],
                ['I','Isabel Nunes','Inspetora de Qualidade','Sou a mais jovem inspetora do meu departamento. As ferramentas da qualidade que aprendi me colocam à frente de profissionais com anos de experiência.'],
            ]; foreach ($deps as [$ini,$nome,$cargo,$texto]): ?>
            <div class="depoimento-card reveal">
                <div class="dep-quote">"</div>
                <p class="dep-text"><?= $texto ?></p>
                <div class="dep-author">
                    <div class="dep-avatar"><?= $ini ?></div>
                    <div><div class="dep-name"><?= $nome ?></div><div class="dep-role"><?= $cargo ?></div></div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="cta-section">
    <h2>Zero defeitos. Máxima carreira.</h2>
    <p>A qualidade não é um acidente — é o resultado de esforço consistente e formação de excelência.</p>
    <div class="cta-btns">
        <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
        <a href="../index.php#cursos" class="btn-hero-secondary"><i data-lucide="arrow-left"></i> Ver Outros Cursos</a>
    </div>
</section>

<footer class="footer">
    <div class="footer-inner">
        <div class="footer-brand"><span>Sophie</span> Link</div>
        <div class="footer-links">
            <a href="../index.php">Início</a><a href="../index.php#cursos">Cursos</a>
            <a href="../index.php#fale-conosco">Contato</a><a href="../auth/login_aluno.php">Portal do Aluno</a>
        </div>
    </div>
    <div class="footer-bottom">© <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA</div>
</footer>
<script src="../assets/js/curso.js"></script>
<script>
// Gauge needle animation
(function(){
    const needle = document.getElementById('gaugeNeedleGroup');
    if (!needle) return;
    let angle = -90, dir = 1;
    setInterval(() => {
        angle += dir * 1.2;
        if (angle >= 80) dir = -1;
        if (angle <= -90) dir = 1;
        needle.style.transform = `rotate(${angle}deg)`;
    }, 30);
})();
</script>
</body>
</html>
