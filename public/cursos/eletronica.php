<?php
// Técnico em Eletrônica — Sophie Link
$courseColor = '#7C3AED';
$courseDark  = '#6d28d9';
$courseLt    = 'rgba(124,58,237,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Eletrônica — Sophie Link</title>
    <meta name="description" content="Curso Técnico em Eletrônica na Sophie Link. Domine circuitos, microcontroladores e sistemas embarcados para a indústria tecnológica de Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖥️</text></svg>">
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
            <div class="hero-badge"><i data-lucide="cpu"></i> CURSO TÉCNICO</div>
            <h1>Técnico em <span>Eletrônica</span></h1>
            <p>Domine circuitos, microcontroladores, instrumentação e sistemas embarcados. O futuro da indústria é eletrônico — e você vai estar na vanguarda.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="18" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="1200" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">IoT</div><div class="hero-stat-lbl">Incluído</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <div class="chip-visual">
                <div class="chip-core"><i data-lucide="cpu"></i></div>
                <div class="chip-pin h" style="top:80px;left:105px;"></div>
                <div class="chip-pin h" style="top:80px;left:145px;"></div>
                <div class="chip-pin h" style="top:80px;left:185px;"></div>
                <div class="chip-pin h" style="bottom:80px;left:105px;"></div>
                <div class="chip-pin h" style="bottom:80px;left:145px;"></div>
                <div class="chip-pin h" style="bottom:80px;left:185px;"></div>
                <div class="chip-pin v" style="left:78px;top:112px;"></div>
                <div class="chip-pin v" style="left:78px;top:150px;"></div>
                <div class="chip-pin v" style="right:78px;top:112px;"></div>
                <div class="chip-pin v" style="right:78px;top:150px;"></div>
                <div class="chip-dot" style="top:25px;left:25px;animation-delay:0s;"></div>
                <div class="chip-dot" style="top:25px;right:25px;animation-delay:0.4s;"></div>
                <div class="chip-dot" style="bottom:25px;left:25px;animation-delay:0.8s;"></div>
                <div class="chip-dot" style="bottom:25px;right:25px;animation-delay:1.2s;"></div>
                <div class="chip-dot" style="top:50%;left:5px;transform:translateY(-50%);animation-delay:1.6s;"></div>
                <div class="chip-dot" style="top:50%;right:5px;transform:translateY(-50%);animation-delay:2s;"></div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">A eletrônica que move o mundo moderno</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Técnico em Eletrônica</strong> é o profissional que mantém o coração tecnológico funcionando — desde sensores industriais até sistemas de automação avançados. Em Parauapebas, com a mineração 4.0, este profissional nunca esteve tão em alta.</p>
                <p>O curso abrange eletrônica analógica e digital, microcontroladores Arduino e Raspberry Pi, programação em C/Python para sistemas embarcados, IoT industrial e instrumentação.</p>
                <p>Nosso laboratório conta com osciloscópios digitais, bancadas de soldagem SMD, impressoras 3D para prototipagem e kits de desenvolvimento IoT integrados a PLCs.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="cpu"></i></div>
                    <div class="highlight-text"><h4>Microcontroladores</h4><p>Arduino, Raspberry Pi, ESP32 — programação real desde o primeiro módulo.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="wifi"></i></div>
                    <div class="highlight-text"><h4>IoT Industrial</h4><p>Desenvolva soluções de Internet das Coisas para monitoramento e automação industrial.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="activity"></i></div>
                    <div class="highlight-text"><h4>Instrumentação</h4><p>Calibração e manutenção de instrumentos de medição industriais (pressão, temperatura, fluxo).</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Do analógico ao digital</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Eletrônica Analógica', '250h', ['Teoria de Circuitos', 'Semicondutores e Amplificadores', 'Fontes de Alimentação', 'Filtros e Osciladores']],
                ['Módulo II — Eletrônica Digital', '250h', ['Lógica Combinacional e Sequencial', 'Microprocessadores e Microcontroladores', 'Programação Arduino/ESP32', 'Interfaces e Periféricos']],
                ['Módulo III — Automação e IoT', '300h', ['CLPs e Redes Industriais', 'SCADA e HMI', 'IoT Industrial (MQTT/LoRa)', 'Instrumentação e Calibração']],
                ['Módulo IV — Estágio', '400h', ['Estágio em Empresa Parceira', 'Projeto Final de Produto Eletrônico', 'Documentação Técnica', 'Apresentação de Resultados']],
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
        <h2 class="sec-title">Habilidades tech de alto nível</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['cpu','Microcontroladores','Programar e integrar Arduino, ESP32, STM32 em projetos industriais reais.'],
                ['activity','Circuitos Eletrônicos','Projetar, montar e solucionar falhas em circuitos analógicos e digitais.'],
                ['wifi','IoT Industrial','Conectar sensores e atuadores à nuvem para monitoramento em tempo real.'],
                ['gauge','Instrumentação','Calibrar e manter instrumentos de medição em conformidade com normas ABNT.'],
                ['code','Programação Embarcada','Codificar em C, Python e Assembly para sistemas embarcados de alto desempenho.'],
                ['monitor','SCADA/HMI','Operar e configurar interfaces homem-máquina e sistemas supervisórios.'],
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
        <h2 class="sec-title">Tech que o mercado industrial precisa</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$4.800</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">94%</span><span class="lbl">Empregados em 6 meses</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Técnico em Eletrônica','Técnico de Instrumentação','Programador CLP/SCADA','Desenvolvedor IoT','Técnico de Automação','Técnico de Telecomunicações','Analista de Sistemas Embarcados','Técnico em Robótica'] as $c): ?>
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
        <h2 class="sec-title">Tecnologia que transforma</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['D','Diego Alves','Técnico IoT — Hydro','Aprendi a conectar sensores industriais ao sistema de monitoramento da planta. Parece ficção científica, mas foi o que aprendi na Sophie Link.'],
                ['F','Fernanda Costa','Instrumentadora — Vale','A calibração de instrumentos parecia impossível antes do curso. Hoje é minha especialidade. Ganha melhor que muita engenharia.'],
                ['G','Gabriel Torres','Empreendedor Tech','Abri uma empresa de automação residencial e industrial. Comecei com o que aprendi na Sophie Link e hoje tenho 5 funcionários.'],
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
    <h2>O futuro é eletrônico. O seu futuro começa aqui.</h2>
    <p>Eletrônica é a espinha dorsal da Indústria 4.0. Venha aprender com quem entende.</p>
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
