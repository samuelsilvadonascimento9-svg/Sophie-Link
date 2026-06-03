<?php
// Técnico em Segurança do Trabalho — Sophie Link
$courseColor = '#DC2626';
$courseDark  = '#b91c1c';
$courseLt    = 'rgba(220,38,38,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Segurança do Trabalho — Sophie Link</title>
    <meta name="description" content="Curso Técnico em Segurança do Trabalho na Sophie Link. Forme-se para proteger vidas e garantir ambientes seguros nas grandes indústrias de Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛑️</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/curso.css?v=1">
    <style>
        :root { --c-course: <?= $courseColor ?>; --c-course-d: <?= $courseDark ?>; --c-course-lt: <?= $courseLt ?>; }
    </style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
    <a href="../index.php" class="nav-brand">
        <img src="../assets/images/logoNome.png" alt="Sophie Link" style="width:200px;object-fit:contain;">
    </a>
    <div class="nav-actions">
        <a href="../index.php#cursos" class="nav-back"><i data-lucide="arrow-left"></i> Todos os Cursos</a>
        <a href="../index.php#fale-conosco" class="nav-cta-curso"><i data-lucide="send"></i> Inscreva-se</a>
    </div>
</nav>

<!-- HERO -->
<section class="curso-hero">
    <div class="hero-overlay"></div>
    <div class="hero-layout">
        <div class="hero-content">
            <div class="hero-badge"><i data-lucide="hard-hat"></i> CURSO TÉCNICO</div>
            <h1>Técnico em <span>Segurança do Trabalho</span></h1>
            <p>Proteja vidas e ambientes industriais. Forme-se para atuar nas grandes mineradoras e indústrias que mais demandam profissionais de saúde e segurança ocupacional.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="18" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="1200" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">NR's</div><div class="hero-stat-lbl">Completas</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- CHECKLIST EPI INTERATIVO -->
            <div class="epi-board">
                <h3><i data-lucide="shield-check" style="width:20px;height:20px;"></i> Checklist de EPIs</h3>
                <div class="epi-list">
                    <?php $epis = [
                        ['hard-hat','Capacete de Segurança'],
                        ['eye','Óculos de Proteção'],
                        ['ear','Protetor Auricular'],
                        ['shield','Colete Refletivo'],
                        ['footprints','Bota com Biqueira'],
                        ['hand','Luva de Proteção'],
                    ]; foreach ($epis as [$icon,$nome]): ?>
                    <div class="epi-item">
                        <i data-lucide="circle" class="epi-check"></i>
                        <span class="epi-label"><?= $nome ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>
                <div class="epi-progress">
                    <span class="epi-progress-label">EPIs verificados: <span id="epiCount">0</span>/<?= count($epis) ?></span>
                    <div class="epi-progress-bar-wrap">
                        <div class="epi-progress-bar" id="epiBar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SOBRE -->
<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">Segurança que salva vidas</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Técnico em Segurança do Trabalho</strong> é um dos profissionais mais requisitados do setor industrial. Com a expansão da mineração e construção em Parauapebas, a demanda por especialistas em SST cresce a cada ano.</p>
                <p>O curso abrange todas as Normas Regulamentadoras (NRs) do Ministério do Trabalho, com ênfase em NR-10, NR-12, NR-35, NR-33 e NR-18, preparando o aluno para emissão de laudos, PPPs, PGR e LTCAT.</p>
                <p>Empresas como Vale, Hydro e Sotreq contratam nossos egressos diretamente pelas redes de parceria. A taxa de empregabilidade do curso é de 96%.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="shield-check"></i></div>
                    <div class="highlight-text"><h4>Todas as NRs</h4><p>Cobertura completa das 38 Normas Regulamentadoras vigentes, com simulações práticas.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="clock"></i></div>
                    <div class="highlight-text"><h4>1.200 Horas</h4><p>A maior carga horária entre os cursos técnicos, com 200h de estágio em campo real.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="hard-hat"></i></div>
                    <div class="highlight-text"><h4>Equipamentos Reais</h4><p>Laboratório equipado com EPIs, detectores de gás, manequins de resgate e sinalização industrial.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- GRADE -->
<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">O que você vai aprender</h2>
        <p class="sec-desc">Formação completa em Saúde, Segurança e Medicina do Trabalho.</p>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Fundamentos de SST', '200h', ['Legislação Trabalhista e Previdenciária', 'NR-1 ao NR-10 — Introdução', 'Higiene Ocupacional', 'Ergonomia']],
                ['Módulo II — NRs Avançadas', '300h', ['NR-12 Segurança em Máquinas', 'NR-33 Espaços Confinados', 'NR-35 Trabalho em Altura', 'NR-18 Construção Civil']],
                ['Módulo III — Documentação Técnica', '300h', ['PPRA/PGR Elaboração', 'LTCAT e PPP', 'Laudo de Insalubridade e Periculosidade', 'CIPA — Formação e Gestão']],
                ['Módulo IV — Prática e Estágio', '400h', ['Estágio em Empresa Parceira', 'Simulações de Acidente', 'Primeiros Socorros', 'Projeto Final de Curso']],
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

<!-- COMPETÊNCIAS -->
<section class="section reveal">
    <div class="container">
        <span class="sec-label">Competências</span>
        <h2 class="sec-title">Habilidades que protegem</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['shield-alert','Análise de Risco','Identificar, avaliar e controlar riscos ambientais e ocupacionais em qualquer ambiente.'],
                ['file-text','Laudos Técnicos','Elaborar LTCAT, PGR, PPRA e laudos de insalubridade/periculosidade com precisão.'],
                ['activity','Medicina Ocupacional','Coordenar exames, PCMSO e programas de saúde do trabalhador.'],
                ['alert-triangle','Investigação de Acidentes','Aplicar metodologias de análise de causas raízes e planos de ação.'],
                ['users','Treinamento','Ministrar treinamentos de NRs e DDS (Diálogo Diário de Segurança).'],
                ['check-circle','Auditoria','Realizar inspeções de segurança e auditorias de conformidade às NRs.'],
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

<!-- MERCADO -->
<section class="section section-alt reveal">
    <div class="container">
        <span class="sec-label">Mercado de Trabalho</span>
        <h2 class="sec-title">Demanda que nunca para</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$4.200</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">96%</span><span class="lbl">Taxa de empregabilidade</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Técnico de Segurança do Trabalho','Inspetor de SST','Consultor NR-12','Analista de Risco','Coordenador CIPA','Responsável SESMT','Auditor de Segurança','Perito em Acidentes'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;">Parceiros que contratam: <strong>Vale S.A., Hydro Alunorte, Sotreq, Equipav, Construtoras Norberto Odebrecht</strong> e contratadas.</p>
            </div>
        </div>
    </div>
</section>

<!-- DEPOIMENTOS -->
<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Vidas que foram protegidas — e transformadas</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['M','Marcos Oliveira','Técnico de SST — Vale S.A.','Passei no processo seletivo da Vale no mesmo mês que me formei. A preparação com as NRs foi cirúrgica — me senti pronto para o primeiro dia.'],
                ['P','Priscila Santos','Inspetora SST — Hydro','Comecei como auxiliar de produção. Depois do curso da Sophie Link, fui promovida para o SESMT. A mudança foi de outro nível.'],
                ['T','Tiago Ferreira','Consultor Autônomo','Faço consultorias para empresas no PA inteiro. O curso me deu a base técnica e a credibilidade para cobrar o que meu serviço vale.'],
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

<!-- CTA -->
<section class="cta-section">
    <h2>Proteja vidas. Construa uma carreira.</h2>
    <p>O mercado industrial não para de crescer — e precisa de profissionais formados com excelência.</p>
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
// EPI Checklist progress update
document.querySelectorAll('.epi-item').forEach(item => {
    item.addEventListener('click', () => {
        const total = document.querySelectorAll('.epi-item').length;
        const checked = document.querySelectorAll('.epi-item.checked').length;
        document.getElementById('epiCount').textContent = checked;
        document.getElementById('epiBar').style.width = (checked / total * 100) + '%';
    });
});
</script>
</body>
</html>
