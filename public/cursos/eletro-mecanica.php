<?php
// Técnico em Eletromecânica — Sophie Link
$courseColor = '#F97316';
$courseDark  = '#ea6c0a';
$courseLt    = 'rgba(249,115,22,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Eletromecânica — Sophie Link</title>
    <meta name="description" content="Curso Técnico em Eletromecânica na Sophie Link em Parauapebas. Domine sistemas elétricos e mecânicos industriais com circuitos animados.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/curso.css?v=1">
    <style>
        :root { --c-course: <?= $courseColor ?>; --c-course-d: <?= $courseDark ?>; --c-course-lt: <?= $courseLt ?>; }
        /* Circuit canvas animation */
        .circuit-wrap canvas { display: block; }
    </style>
</head>
<body>

<nav class="nav">
    <a href="../index.php" class="nav-brand">
        <img src="../assets/images/logoNome.png" alt="Sophie Link" style="width:200px;object-fit:contain;">
    </a>
    <div class="nav-actions">
        <a href="../index.php#cursos" class="nav-back"><i data-lucide="arrow-left"></i> Todos os Cursos</a>
        <a href="../index.php#fale-conosco" class="nav-cta-curso"><i data-lucide="send"></i> Inscreva-se</a>
    </div>
</nav>

<section class="curso-hero">
    <div class="hero-overlay"></div>
    <div class="hero-layout">
        <div class="hero-content">
            <div class="hero-badge"><i data-lucide="zap"></i> CURSO TÉCNICO</div>
            <h1>Técnico em <span>Eletromecânica</span></h1>
            <p>Una elétrica e mecânica para dominar os sistemas industriais que movem as maiores empresas de mineração e manufatura do Brasil.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="24" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="1600" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">NR-10</div><div class="hero-stat-lbl">Incluída</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <div class="circuit-wrap" style="width:380px;height:380px;">
                <canvas id="circuitCanvas" width="380" height="380"></canvas>
            </div>
        </div>
    </div>
</section>

<!-- SOBRE -->
<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">Onde elétrica encontra mecânica</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Técnico em Eletromecânica</strong> é o profissional mais versátil da indústria. Domina tanto os sistemas elétricos quanto os mecânicos, sendo o responsável pela manutenção e operação dos equipamentos mais críticos das plantas industriais.</p>
                <p>Em Parauapebas, epicentro da mineração de ferro mundial, a demanda por eletromecânicos é insaciável. Máquinas de escavação, correias transportadoras, subestações elétricas — tudo passa por esse profissional.</p>
                <p>O curso inclui certificação NR-10 (Eletricidade), NR-12 (Máquinas) e formação em CLP/automação industrial, tornando o egresso imediatamente empregável.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="zap"></i></div>
                    <div class="highlight-text"><h4>NR-10 Incluída</h4><p>Habilitação para trabalho com sistemas elétricos de baixa e média tensão, incluída na grade.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="settings"></i></div>
                    <div class="highlight-text"><h4>Laboratório Industrial</h4><p>Oficinas com motores, CLPs, inversores de frequência, painéis e bancadas reais.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="trending-up"></i></div>
                    <div class="highlight-text"><h4>Alta Empregabilidade</h4><p>Déficit de 8.000 eletromecânicos na região dos Carajás. Salários iniciam em R$4.500.</p></div>
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
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Fundamentos Elétricos', '300h', ['Circuitos Elétricos CC e CA', 'Eletromagnetismo Aplicado', 'Instalações Elétricas Industriais', 'NR-10 — Segurança em Eletricidade']],
                ['Módulo II — Fundamentos Mecânicos', '300h', ['Metrologia e Ajuste', 'Elementos de Máquinas', 'Hidráulica e Pneumática', 'Lubrificação Industrial']],
                ['Módulo III — Sistemas Eletromecânicos', '400h', ['Motores Elétricos e Acionamentos', 'CLPs e Automação Industrial', 'Manutenção Preditiva e Preventiva', 'Inversores de Frequência']],
                ['Módulo IV — Estágio e TCC', '600h', ['Estágio em Indústria Parceira', 'Projeto de Automação', 'NR-12 Aplicada', 'Trabalho de Conclusão de Curso']],
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
        <h2 class="sec-title">O técnico mais completo da indústria</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['zap','Sistemas Elétricos','Projetar, instalar e manter sistemas elétricos industriais de baixa e média tensão.'],
                ['settings','Manutenção Mecânica','Diagnosticar falhas e realizar manutenção preventiva e corretiva em máquinas industriais.'],
                ['cpu','Automação CLP','Programar controladores lógicos programáveis (CLPs) para automação de processos.'],
                ['thermometer','Manutenção Preditiva','Utilizar análise de vibração, termografia e ultrassom para antever falhas.'],
                ['wind','Hidráulica Industrial','Dimensionar e manter sistemas hidráulicos e pneumáticos em plantas industriais.'],
                ['shield','Segurança Industrial','Aplicar NR-10 e NR-12 na manutenção segura de equipamentos e instalações.'],
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
        <h2 class="sec-title">O mercado que nunca para</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$5.500</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">+8k</span><span class="lbl">Vagas abertas na região</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Técnico Eletromecânico','Eletricista Industrial','Mecânico de Manutenção','Programador CLP','Técnico de Automação','Inspetor de Equipamentos','Supervisor de Manutenção','Técnico em Instrumentação'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;">Parceiros: <strong>Vale, Hydro, Sotreq, Komatsu, Atlas Copco, Caterpillar, Equipav</strong></p>
            </div>
        </div>
    </div>
</section>

<!-- DEPOIMENTOS -->
<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Quem já está no mercado</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['L','Lucas Freitas','Técnico Eletromecânico — Vale','Saí do curso e entrei direto na Vale. A formação em CLP e NR-10 foi o diferencial que todo supervisor estava procurando.'],
                ['J','Juliana Rocha','Técnica de Manutenção — Sotreq','Aprendi a programar CLPs e fazer manutenção preditiva. Hoje coordeno uma equipe de 8 técnicos. Impossível sem a Sophie Link.'],
                ['E','Eduardo Lima','Técnico de Automação — Komatsu','O estágio foi na Komatsu mesmo. Me tornei efetivo 3 meses depois de formado. Indico para todo mundo.'],
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
    <h2>Seja o técnico mais procurado da indústria.</h2>
    <p>Eletromecânica é a combinação perfeita para quem quer máxima empregabilidade na mineração.</p>
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
// Animated circuit board on canvas
(function() {
    const canvas = document.getElementById('circuitCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const color = '#F97316';

    // Generate circuit nodes
    const nodes = [];
    for (let i = 0; i < 20; i++) {
        nodes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 4 + 2,
            pulse: Math.random() * Math.PI * 2
        });
    }

    // Generate connections
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (d < 120) lines.push([i, j, 0]);
        }
    }

    // Animated signals
    const signals = [];
    setInterval(() => {
        if (lines.length && signals.length < 6) {
            const l = lines[Math.floor(Math.random() * lines.length)];
            signals.push({ line: l, t: 0 });
        }
    }, 600);

    function draw(ts) {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, W, H);

        // Draw grid
        ctx.strokeStyle = 'rgba(249,115,22,0.06)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
        for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

        // Draw connections
        lines.forEach(([a, b]) => {
            ctx.strokeStyle = 'rgba(249,115,22,0.25)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
        });

        // Draw signals
        for (let i = signals.length - 1; i >= 0; i--) {
            const s = signals[i];
            s.t += 0.02;
            if (s.t > 1) { signals.splice(i, 1); continue; }
            const a = nodes[s.line[0]], b = nodes[s.line[1]];
            const x = a.x + (b.x - a.x) * s.t;
            const y = a.y + (b.y - a.y) * s.t;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(249,115,22,0.9)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(249,115,22,0.2)';
            ctx.fill();
        }

        // Draw nodes
        nodes.forEach(n => {
            n.pulse += 0.05;
            const alpha = 0.5 + 0.5 * Math.sin(n.pulse);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(249,115,22,${alpha})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(249,115,22,${alpha * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
            ctx.stroke();
        });

        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();
</script>
</body>
</html>
