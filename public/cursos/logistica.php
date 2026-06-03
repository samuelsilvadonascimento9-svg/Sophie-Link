<?php
// Técnico em Logística — Sophie Link
$courseColor = '#0284C7';
$courseDark  = '#0369a1';
$courseLt    = 'rgba(2,132,199,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Logística — Sophie Link</title>
    <meta name="description" content="Curso Técnico em Logística na Sophie Link. Gestão de cadeia de suprimentos, transporte e armazenagem para a indústria de Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚛</text></svg>">
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
            <div class="hero-badge"><i data-lucide="truck"></i> CURSO TÉCNICO</div>
            <h1>Técnico em <span>Logística</span></h1>
            <p>Gerencie cadeias de suprimentos, otimize rotas e controle estoques. Parauapebas é o maior polo logístico da Amazônia — esteja preparado.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="18" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="900" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">SCM</div><div class="hero-stat-lbl">Supply Chain</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- MAPA DE ROTAS ANIMADO -->
            <div class="route-visual">
                <div style="color:rgba(255,255,255,0.7);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.75rem;">🗺️ Rotas Ativas — PA</div>
                <svg class="route-svg" viewBox="0 0 340 200">
                    <!-- Grid background -->
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="340" height="200" fill="url(#grid)"/>
                    <!-- Route paths -->
                    <path class="route-path" d="M 40 160 Q 80 120 140 80 Q 180 50 240 60"/>
                    <path class="route-path" d="M 40 160 Q 100 140 160 150 Q 220 160 280 140"/>
                    <path class="route-active" d="M 40 160 C 80 100 160 40 240 60"/>
                    <!-- Points -->
                    <circle cx="40" cy="160" r="8" fill="#fff" opacity="0.9"/>
                    <circle cx="140" cy="80" r="6" fill="rgba(255,255,255,0.6)"/>
                    <circle cx="240" cy="60" r="8" fill="#fff" opacity="0.9"/>
                    <circle cx="280" cy="140" r="6" fill="rgba(255,255,255,0.5)"/>
                    <!-- Labels -->
                    <text x="24" y="180" fill="rgba(255,255,255,0.8)" font-size="10" font-family="Inter" font-weight="700">Parauapebas</text>
                    <text x="200" y="52" fill="rgba(255,255,255,0.8)" font-size="10" font-family="Inter" font-weight="700">Marabá</text>
                    <text x="260" y="158" fill="rgba(255,255,255,0.6)" font-size="9" font-family="Inter">Belém</text>
                    <!-- Moving truck -->
                    <g class="route-truck">
                        <rect x="90" y="108" width="18" height="10" rx="2" fill="rgba(255,255,255,0.9)"/>
                        <rect x="104" y="112" width="8" height="6" rx="1" fill="rgba(255,255,255,0.5)"/>
                        <circle cx="94" cy="119" r="3" fill="rgba(255,255,255,0.8)"/>
                        <circle cx="105" cy="119" r="3" fill="rgba(255,255,255,0.8)"/>
                    </g>
                </svg>
                <div class="route-stats">
                    <div class="route-stat"><div class="rv">4.2t</div><div class="rl">Carga Média</div></div>
                    <div class="route-stat"><div class="rv">98%</div><div class="rl">Entrega no Prazo</div></div>
                    <div class="route-stat"><div class="rv">-18%</div><div class="rl">Custo Logístico</div></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">A arte de mover o mundo</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Técnico em Logística</strong> é o maestro da cadeia de suprimentos — coordena fornecedores, controla estoque, planeja transporte e garante que o produto certo chegue no lugar certo, na hora certa, ao menor custo possível.</p>
                <p>Em Parauapebas, polo de distribuição e escoamento de minério para o mundo inteiro, a logística é a espinha dorsal da economia. A Vale movimenta 400 milhões de toneladas de minério por ano — e precisa de técnicos competentes para isso.</p>
                <p>O curso inclui TMS (Transportation Management System), WMS (Warehouse Management System), noções de comércio exterior e gestão de contratos de transporte.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="package"></i></div>
                    <div class="highlight-text"><h4>Gestão de Estoque</h4><p>Domínio de WMS, inventários rotativos, PEPS/UEPS e controle de armazenagem industrial.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="truck"></i></div>
                    <div class="highlight-text"><h4>Transporte e Roteirização</h4><p>Otimize rotas, gerencie frotas e reduza custos de frete com tecnologia e planejamento.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="globe"></i></div>
                    <div class="highlight-text"><h4>Comércio Exterior</h4><p>Noções de importação, exportação, incoterms e documentação aduaneira para operações internacionais.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Da origem ao destino</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Fundamentos da Logística', '200h', ['Supply Chain Management (SCM)', 'Fundamentos de Logística Industrial', 'Gestão de Fornecedores', 'Matemática Financeira e Custos']],
                ['Módulo II — Armazenagem e Estoques', '200h', ['Gestão de Estoque (WMS)', 'Layout e Movimentação de Materiais', 'Inventários e Auditorias de Estoque', 'Embalagem e Unitização']],
                ['Módulo III — Transporte e Distribuição', '250h', ['Modal Rodoviário, Ferroviário e Hidroviário', 'Roteirização e TMS', 'Legislação de Transporte (RNTRC)', 'Comércio Exterior — Importação/Exportação']],
                ['Módulo IV — Estágio', '250h', ['Estágio em Centro de Distribuição ou Indústria', 'Projeto de Otimização Logística', 'KPIs e Dashboard', 'Trabalho de Conclusão']],
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
        <h2 class="sec-title">Domínio total da cadeia</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['package','Gestão de Estoque','Controlar inventários, aplicar PEPS/UEPS e operar sistemas WMS com precisão.'],
                ['truck','Gestão de Transporte','Planejar rotas, negociar fretes e monitorar entregas com TMS integrado.'],
                ['git-branch','Supply Chain','Mapear e otimizar toda a cadeia de suprimentos de ponta a ponta.'],
                ['globe','Comércio Exterior','Processar documentos de importação/exportação e entender incoterms e drawback.'],
                ['bar-chart','Análise de Custos','Calcular e reduzir custos logísticos com foco em rentabilidade e eficiência.'],
                ['map','Roteirização','Aplicar algoritmos e softwares de roteirização para otimizar distribuição.'],
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
        <h2 class="sec-title">O maior polo logístico da Amazônia</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$3.500</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">+10k</span><span class="lbl">Vagas abertas na região</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Técnico em Logística','Analista de Estoque','Coordenador de CD','Operador WMS/TMS','Agente de Transporte','Analista de Supply Chain','Despachante Aduaneiro','Supervisor de Expedição'] as $c): ?>
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
        <h2 class="sec-title">Profissionais em movimento</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['N','Nathalia Pereira','Coordenadora CD — Vale','Implementei o WMS em dois centros de distribuição da Vale. A formação na Sophie Link foi a base técnica que me deu credibilidade para propor a mudança.'],
                ['W','William Souza','Analista Supply Chain — Sotreq','Aprendi a mapear a cadeia de suprimentos de um jeito que nenhum curso de YouTube ensina. A prática faz toda a diferença.'],
                ['S','Simone Monteiro','Despachante — Marabá','Comecei como auxiliar de estoque. Hoje tenho minha própria empresa de assessoria aduaneira. Tudo graças à formação em comércio exterior.'],
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
    <h2>Mova o futuro da logística.</h2>
    <p>A cadeia de suprimentos do Pará passa pelas mãos de quem se formou com a Sophie Link.</p>
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
