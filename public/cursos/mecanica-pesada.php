<?php
// Mecânica Pesada e de Autos — Sophie Link
$courseColor = '#78350F';
$courseDark  = '#92400e';
$courseLt    = 'rgba(120,53,15,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mecânica Pesada e de Autos — Sophie Link</title>
    <meta name="description" content="Curso de Mecânica Pesada e Automotiva na Sophie Link. Manutenção de caminhões, máquinas de mineração e veículos pesados em Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
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
            <div class="hero-badge"><i data-lucide="wrench"></i> FORMAÇÃO PROFISSIONAL</div>
            <h1>Mecânica <span>Pesada e de Autos</span></h1>
            <p>Domine a manutenção de caminhões, retroescavadeiras, tratores e as maiores máquinas de mineração do planeta. Aqui a prática é tudo.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="12" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="600" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">HDT</div><div class="hero-stat-lbl">Heavy Duty Tech</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- ENGRENAGENS ANIMADAS -->
            <div class="gear-visual">
                <svg class="gear-svg-big" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M 50 15 L 55 5 L 65 5 L 70 15 A 40 40 0 0 1 80 22 L 92 20 L 97 29 L 88 36 A 40 40 0 0 1 90 50 L 100 55 L 100 65 L 90 70 A 40 40 0 0 1 83 81 L 88 92 L 80 97 L 72 88 A 40 40 0 0 1 58 90 L 55 100 L 45 100 L 42 90 A 40 40 0 0 1 28 85 L 20 92 L 12 84 L 18 73 A 40 40 0 0 1 12 60 L 2 55 L 2 45 L 12 40 A 40 40 0 0 1 17 27 L 8 18 L 15 10 L 26 17 A 40 40 0 0 1 38 12 Z"/>
                    <circle cx="50" cy="50" r="16" fill="rgba(0,0,0,0.3)"/>
                </svg>
                <svg class="gear-svg-sm" viewBox="0 0 100 100" fill="currentColor" style="position:absolute;bottom:10px;right:10px;">
                    <path d="M 50 20 L 55 10 L 65 10 L 70 20 A 35 35 0 0 1 80 28 L 90 25 L 95 35 L 86 42 A 35 35 0 0 1 88 50 L 98 56 L 98 66 L 88 72 A 35 35 0 0 1 81 82 L 88 92 L 80 98 L 72 88 A 35 35 0 0 1 60 90 L 56 100 L 46 100 L 42 90 A 35 35 0 0 1 30 85 L 22 92 L 14 84 L 21 74 A 35 35 0 0 1 15 62 L 5 56 L 5 46 L 15 40 A 35 35 0 0 1 20 28 L 12 18 L 20 12 L 30 22 A 35 35 0 0 1 42 17 Z"/>
                    <circle cx="50" cy="50" r="14" fill="rgba(0,0,0,0.3)"/>
                </svg>
                <div style="position:absolute;bottom:-40px;text-align:center;width:100%;">
                    <div style="color:rgba(255,255,255,0.8);font-weight:700;font-size:0.9rem;">⚙️ Engrenando seu futuro</div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">Força que move a mineração</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>A <strong>Mecânica Pesada e de Autos</strong> forma o profissional que mantém em operação as maiores máquinas do mundo: caminhões 797F da Caterpillar (310 toneladas), escavadeiras hidráulicas, motoniveladoras e retroescavadeiras que operam 24h/dia nas minas de Carajás.</p>
                <p>O programa inclui mecânica de motores diesel (EURO 5/6), hidráulica pesada, transmissões automáticas, sistemas de freio ABS/retarder, diagnóstico eletrônico com scanner multimarca e alinhamento de geometria variável.</p>
                <p>Parceria com oficinas autorizadas Komatsu, Caterpillar e Cummins em Parauapebas, garantindo estágio real em equipamentos de ponta.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="wrench"></i></div>
                    <div class="highlight-text"><h4>Motores Diesel</h4><p>Euro 5/6, injeção common rail, turbocompressores e sistemas SCR/DPF de pós-tratamento.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="droplets"></i></div>
                    <div class="highlight-text"><h4>Hidráulica Pesada</h4><p>Bombas, válvulas, atuadores e circuitos hidráulicos em máquinas de terraplanagem e mineração.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="monitor"></i></div>
                    <div class="highlight-text"><h4>Diagnóstico Eletrônico</h4><p>Scanner multimarca, leitura de DTC, reprogramação de módulos e calibrações avançadas.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Das ferramentas ao diagnóstico eletrônico</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Motor e Sistemas Auxiliares', '150h', ['Motores Ciclo Otto e Diesel', 'Sistema de Arrefecimento e Lubrificação', 'Sistema de Alimentação (Injeção Eletrônica)', 'Turboalimentadores e Intercoolers']],
                ['Módulo II — Chassis e Transmissão', '150h', ['Sistemas de Transmissão Manual e Automática', 'Freios (ABS/ESP/Retarder)', 'Suspensão e Direção Hidráulica', 'Alinhamento e Balanceamento']],
                ['Módulo III — Mecânica Pesada', '150h', ['Máquinas de Terraplenagem (Cat, Komatsu)', 'Hidráulica Industrial Pesada', 'Sistemas Elétricos de Caminhões', 'Diagnóstico com Cat ET / Komatsu PC']],
                ['Módulo IV — Estágio', '150h', ['Estágio em Oficina Parceira', 'Revisões Preventivas Reais', 'Projeto de Manutenção', 'Avaliação de Competências']],
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
        <h2 class="sec-title">O mecânico que o mercado procura</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['wrench','Motores Diesel','Diagnosticar e realizar manutenção completa em motores diesel Euro 5 e 6.'],
                ['droplets','Hidráulica Pesada','Identificar falhas e substituir componentes em sistemas hidráulicos de alta pressão.'],
                ['monitor','Diagnóstico Eletrônico','Utilizar scanners Cat ET, Komatsu PC, Cummins Insite e Bosch KTS para diagnósticos.'],
                ['rotate-ccw','Transmissões','Manutenção de câmbios automáticos Allison, ZF e transmissões hidrostáticas.'],
                ['disc','Sistemas de Freio','Manutenção de freios pneumáticos, ABS, retarder e sistemas EBS.'],
                ['tool','Preventiva e Preditiva','Executar planos de manutenção preventiva baseados em horas de operação.'],
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
        <h2 class="sec-title">Máquinas que nunca param</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$5.000</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">97%</span><span class="lbl">Empregabilidade</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Mecânico de Máquinas Pesadas','Mecânico de Caminhões','Técnico de Diagnóstico','Mecânico de Transmissões','Técnico Hidráulico','Mecânico de Pátio','Inspetor de Frotas','Supervisor de Manutenção'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;">Parceiros: <strong>Sotreq (Cat), Komatsu, Cummins, Mercedes-Benz Trucks, Scania, Man Volkswagen, WEG</strong></p>
            </div>
        </div>
    </div>
</section>

<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Mecânicos de verdade</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['H','Henrique Mota','Mecânico Pesado — Sotreq','Mantenho as escavadeiras Cat 390 da mina de Carajás. Salário de R$6.800 logo no primeiro emprego depois do curso.'],
                ['K','Karina Alves','Técnica de Diagnóstico — Mercedes-Benz','Sou a única mulher na equipe de diagnóstico eletrônico. A formação da Sophie Link me deu a confiança e o conhecimento para quebrar esse preconceito.'],
                ['O','Orlando Cruz','Supervisor de Manutenção — Komatsu','Comecei como aprendiz mecânico. Depois de me formar na Sophie Link, fui contratado pela Komatsu e em 2 anos virei supervisor. A formação foi o diferencial.'],
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
    <h2>Máquinas pesadas. Carreira sólida.</h2>
    <p>O mercado de mecânica pesada em Parauapebas não para — e precisa de você.</p>
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
</body>
</html>
