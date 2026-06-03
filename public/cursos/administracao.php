<?php
// Técnico em Administração — Sophie Link
$courseColor    = '#1E3A8A';
$courseDark     = '#162e6e';
$courseLt       = 'rgba(30,58,138,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Administração — Sophie Link</title>
    <meta name="description" content="Curso Técnico em Administração no Centro Técnico Sophie Link em Parauapebas, PA. Forme-se em gestão empresarial, finanças e liderança.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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
            <div class="hero-badge"><i data-lucide="briefcase"></i> CURSO TÉCNICO</div>
            <h1>Técnico em <span>Administração</span></h1>
            <p>Domine gestão empresarial, finanças e liderança. Forme-se para atuar nas empresas mais exigentes da Região dos Carajás e de todo o Brasil.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="18" data-suffix=" meses">0 meses</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="800" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">MEC</div><div class="hero-stat-lbl">Reconhecido</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <div class="chart-visual">
                <div style="color:rgba(255,255,255,0.7);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;">📊 Desempenho Empresarial</div>
                <div class="chart-bars">
                    <div class="chart-bar"></div>
                    <div class="chart-bar"></div>
                    <div class="chart-bar"></div>
                    <div class="chart-bar"></div>
                    <div class="chart-bar"></div>
                    <div class="chart-bar"></div>
                </div>
                <div class="chart-kpi-row">
                    <div class="chart-kpi"><div class="kv">+32%</div><div class="kl">ROI Médio</div></div>
                    <div class="chart-kpi"><div class="kv">R$3.2k</div><div class="kl">Salário Inicial</div></div>
                    <div class="chart-kpi"><div class="kv">92%</div><div class="kl">Empregados</div></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SOBRE -->
<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">Gestão que transforma<br>negócios e carreiras</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O curso <strong>Técnico em Administração</strong> da Sophie Link prepara o estudante para atuar com competência em organizações públicas e privadas, desenvolvendo habilidades de planejamento, organização, liderança e controle de processos empresariais.</p>
                <p>Com metodologia prática e voltada ao mercado regional, o aluno aprende desde fundamentos de gestão financeira até técnicas avançadas de análise de dados, capacitando-se para os principais desafios do ambiente corporativo moderno.</p>
                <p>Parauapebas, polo da mineração e logística, demanda cada vez mais profissionais qualificados em gestão. Nossos egressos trabalham na Vale, Sotreq, Equipav e centenas de empresas da região.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="target"></i></div>
                    <div class="highlight-text"><h4>Objetivo do Curso</h4><p>Capacitar o aluno para planejar, organizar, dirigir e controlar recursos organizacionais com visão estratégica.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="clock"></i></div>
                    <div class="highlight-text"><h4>Carga Horária</h4><p>800 horas divididas em módulos teóricos e práticos, incluindo 100h de estágio supervisionado.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="map-pin"></i></div>
                    <div class="highlight-text"><h4>Área de Atuação</h4><p>Empresas de mineração, logística, comércio, setor público, startups e negócios próprios em toda a Amazônia.</p></div>
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
        <p class="sec-desc">Currículo alinhado às demandas reais do mercado regional e nacional.</p>
        <div class="grade-list">
            <?php
            $modulos = [
                ['Módulo I — Fundamentos da Administração', '160h', ['Teoria Geral da Administração', 'Comunicação Empresarial', 'Matemática Financeira Básica', 'Informática para Negócios']],
                ['Módulo II — Gestão Operacional', '200h', ['Gestão de Pessoas', 'Rotinas Administrativas', 'Departamento Pessoal', 'Marketing e Vendas']],
                ['Módulo III — Gestão Estratégica', '200h', ['Planejamento Estratégico', 'Análise Financeira', 'Gestão de Projetos', 'Empreendedorismo']],
                ['Módulo IV — Prática Profissional', '240h', ['Estágio Supervisionado', 'Simulação Empresarial', 'Projeto Integrador', 'Elaboração de TCC']],
            ];
            foreach ($modulos as $i => [$titulo, $horas, $disciplinas]):
            ?>
            <div class="modulo">
                <div class="modulo-header" id="mod-adm-<?= $i ?>">
                    <div class="modulo-num"><?= $i+1 ?></div>
                    <span class="modulo-title"><?= $titulo ?></span>
                    <span class="modulo-hrs"><?= $horas ?></span>
                    <i data-lucide="chevron-down" class="modulo-chevron"></i>
                </div>
                <div class="modulo-body">
                    <div class="modulo-body-inner">
                        <ul><?php foreach ($disciplinas as $d): ?><li><?= $d ?></li><?php endforeach; ?></ul>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- COMPETÊNCIAS -->
<section class="section reveal">
    <div class="container">
        <span class="sec-label">Competências</span>
        <h2 class="sec-title">Habilidades que o mercado exige</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['briefcase','Gestão Empresarial','Planejar e executar estratégias organizacionais com eficiência e visão de futuro.'],
                ['bar-chart-2','Análise Financeira','Interpretar demonstrações financeiras e tomar decisões baseadas em dados.'],
                ['users','Liderança de Equipes','Motivar, gerir conflitos e desenvolver talentos em ambientes corporativos.'],
                ['file-text','Rotinas Adm.','Dominar processos de DP, contratos, arquivamento e documentação corporativa.'],
                ['trending-up','Empreendedorismo','Criar e gerir negócios com foco em inovação, sustentabilidade e crescimento.'],
                ['shield','Compliance','Conhecer legislação trabalhista, tributária e governança corporativa.'],
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
        <h2 class="sec-title">Onde você pode trabalhar</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box">
                    <span class="val">R$2.800</span>
                    <span class="lbl">Salário médio inicial</span>
                </div>
                <div class="mercado-stat-box" style="background: var(--c-course-d);">
                    <span class="val">+15k</span>
                    <span class="lbl">Vagas abertas no PA</span>
                </div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php $cargos = ['Assistente Administrativo','Analista de RH','Coordenador de Projetos','Gestor Financeiro','Analista de Processos','Consultor Empresarial','Empreendedor','Analista de Marketing']; foreach ($cargos as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;">Empresas parceiras: <strong>Vale S.A., Sotreq, Equipav, Hydro, Prefeitura de Parauapebas</strong> e centenas de PMEs da região.</p>
            </div>
        </div>
    </div>
</section>

<!-- DEPOIMENTOS -->
<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Quem já transformou sua carreira</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['C','Carla Mendes','Assistente Adm. — Vale S.A.','O curso me deu a base que precisava para entrar no setor administrativo da Vale. A metodologia prática fez toda a diferença na hora da entrevista.'],
                ['R','Roberto Lins','Gestor de Projetos — Sotreq','Aprendi a liderar equipes e gerir orçamentos na Sophie Link. Hoje coordeno projetos de R$2 milhões com toda a confiança.'],
                ['A','Ana Beatriz','Empreendedora — Parauapebas','Com o que aprendi na Sophie Link, abri minha empresa de consultoria. Em 6 meses já tinha 12 clientes fixos.'],
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
    <h2>Pronto para liderar?</h2>
    <p>Junte-se a centenas de profissionais formados pela Sophie Link e conquiste seu espaço no mercado.</p>
    <div class="cta-btns">
        <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
        <a href="../index.php#cursos" class="btn-hero-secondary"><i data-lucide="arrow-left"></i> Ver Outros Cursos</a>
    </div>
</section>

<!-- FOOTER -->
<footer class="footer">
    <div class="footer-inner">
        <div class="footer-brand"><span>Sophie</span> Link</div>
        <div class="footer-links">
            <a href="../index.php">Início</a>
            <a href="../index.php#cursos">Cursos</a>
            <a href="../index.php#fale-conosco">Contato</a>
            <a href="../auth/login_aluno.php">Portal do Aluno</a>
        </div>
    </div>
    <div class="footer-bottom">© <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA</div>
</footer>

<script src="../assets/js/curso.js"></script>
<!-- EPI progress fix for admin page (não usa, mas inclui para completude) -->
</body>
</html>
