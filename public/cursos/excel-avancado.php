<?php
// Excel Avançado — Sophie Link
$courseColor = '#166534';
$courseDark  = '#14532d';
$courseLt    = 'rgba(22,101,52,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel Avançado — Sophie Link</title>
    <meta name="description" content="Curso de Excel Avançado na Sophie Link. Domine fórmulas avançadas, tabelas dinâmicas, VBA e Power BI para se destacar no mercado de trabalho.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
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
            <div class="hero-badge"><i data-lucide="table-2"></i> CURSO PROFISSIONALIZANTE</div>
            <h1>Excel <span>Avançado</span></h1>
            <p>Deixe de ser só um usuário e vire o especialista em dados da sua empresa. Tabelas dinâmicas, VBA, Power BI e dashboards executivos que impressionam.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="3" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="120" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">VBA</div><div class="hero-stat-lbl">Automação</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- PLANILHA ANIMADA -->
            <div class="xls-visual">
                <div class="xls-toolbar">
                    <div class="xls-toolbar-dot"></div>
                    <div class="xls-toolbar-dot"></div>
                    <div class="xls-toolbar-dot"></div>
                    <span class="xls-toolbar-title">📊 Relatório_Mensal.xlsx</span>
                </div>
                <div class="xls-header">
                    <div class="xls-col-h"></div>
                    <div class="xls-col-h">A</div>
                    <div class="xls-col-h">B</div>
                    <div class="xls-col-h">C</div>
                    <div class="xls-col-h">D</div>
                    <div class="xls-col-h">E</div>
                </div>
                <div class="xls-grid">
                    <div class="xls-row">
                        <div class="xls-num">1</div>
                        <div class="xls-cell bold">Mês</div>
                        <div class="xls-cell bold">Receita</div>
                        <div class="xls-cell bold">Custo</div>
                        <div class="xls-cell bold">Lucro</div>
                        <div class="xls-cell bold">%</div>
                    </div>
                    <div class="xls-row">
                        <div class="xls-num">2</div>
                        <div class="xls-cell">Jan</div>
                        <div class="xls-cell num">85.400</div>
                        <div class="xls-cell num">61.200</div>
                        <div class="xls-cell num xls-cell">24.200</div>
                        <div class="xls-cell formula">=D2/B2</div>
                    </div>
                    <div class="xls-row">
                        <div class="xls-num">3</div>
                        <div class="xls-cell">Fev</div>
                        <div class="xls-cell num">92.100</div>
                        <div class="xls-cell num">58.300</div>
                        <div class="xls-cell num">33.800</div>
                        <div class="xls-cell formula">=D3/B3</div>
                    </div>
                    <div class="xls-row">
                        <div class="xls-num">4</div>
                        <div class="xls-cell">Mar</div>
                        <div class="xls-cell num">118.750</div>
                        <div class="xls-cell num">72.400</div>
                        <div class="xls-cell num">46.350</div>
                        <div class="xls-cell formula">=D4/B4</div>
                    </div>
                    <div class="xls-row">
                        <div class="xls-num">5</div>
                        <div class="xls-cell bold">TOTAL</div>
                        <div class="xls-cell num formula">=SOMA(B2:B4)</div>
                        <div class="xls-cell num formula">=SOMA(C2:C4)</div>
                        <div class="xls-cell num formula">=SOMA(D2:D4)</div>
                        <div class="xls-cell formula">=MÉDIA(E2:E4)</div>
                    </div>
                    <div class="xls-row">
                        <div class="xls-num">6</div>
                        <div class="xls-cell formula">PROCV</div>
                        <div class="xls-cell formula">=PROCV(A6,</div>
                        <div class="xls-cell formula">A2:E4,</div>
                        <div class="xls-cell formula">2,FALSO)</div>
                        <div class="xls-cell"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">O Excel que o mercado exige</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Excel Avançado</strong> é a habilidade mais pedida em vagas de emprego de qualquer área — de auxiliar administrativo a gestor financeiro. Pesquisas mostram que 90% dos profissionais que dizem "tenho Excel avançado" não sabem o que é isso de verdade.</p>
                <p>Na Sophie Link, você aprende o Excel de verdade: fórmulas avançadas (PROCV, ÍNDICE/CORRESP, SOMASES, CONT.SE), tabelas e gráficos dinâmicos, automação com VBA/Macros, Power Query para ETL e dashboards interativos com Power BI integrado ao Excel.</p>
                <p>Ao final do curso, você terá um portfólio com dashboards executivos reais que impressionam qualquer recrutador.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="table-2"></i></div>
                    <div class="highlight-text"><h4>Fórmulas Avançadas</h4><p>PROCV, ÍNDICE/CORRESP, SOMASES, CONT.SES, matriciais e as novas funções XLOOKUP e LET.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="code-2"></i></div>
                    <div class="highlight-text"><h4>VBA e Macros</h4><p>Automatize tarefas repetitivas, crie formulários e UserForms, gerencie dados com programação VBA.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="bar-chart-2"></i></div>
                    <div class="highlight-text"><h4>Power BI e Dashboards</h4><p>Crie dashboards executivos interativos integrados ao Excel com Power Query e Power Pivot.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Do básico ao dashboard executivo</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Revisão e Fórmulas Avançadas', '30h', ['Revisão de Fórmulas Essenciais', 'PROCV, PROCH e XLOOKUP', 'ÍNDICE e CORRESP', 'Fórmulas Matriciais e Dinâmicas']],
                ['Módulo II — Tabelas e Análise de Dados', '30h', ['Tabelas Dinâmicas (PivotTable)', 'Gráficos Avançados e Dinâmicos', 'Segmentação de Dados', 'Formatação Condicional Avançada']],
                ['Módulo III — VBA e Automação', '30h', ['Introdução ao VBA', 'Gravação e Edição de Macros', 'Criação de UserForms', 'Automação de Relatórios']],
                ['Módulo IV — Power Query e BI', '30h', ['Power Query — ETL de Dados', 'Power Pivot e DAX Básico', 'Dashboards Executivos', 'Projeto Final: Dashboard Real']],
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
        <h2 class="sec-title">Excel no nível que as empresas querem</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['table-2','Fórmulas Avançadas','PROCV, XLOOKUP, matriciais e funções dinâmicas para análise profissional de dados.'],
                ['pie-chart','Tabelas Dinâmicas','Criar relatórios interativos com PivotTable, PivotChart e slicers para qualquer volume de dados.'],
                ['code-2','VBA/Macros','Automatizar processos repetitivos, criar menus, formulários e relatórios automáticos.'],
                ['filter','Power Query','Importar, limpar e transformar dados de qualquer fonte com ETL profissional.'],
                ['bar-chart','Dashboards','Criar painéis executivos interativos e visualmente impressionantes com gráficos avançados.'],
                ['database','Power BI','Conectar Excel ao Power BI para relatórios gerenciais e análises de BI em tempo real.'],
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
        <h2 class="sec-title">Excel abre todas as portas</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">+40%</span><span class="lbl">Aumento salarial médio</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">100%</span><span class="lbl">Das vagas pedem Excel</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Analista Financeiro','Analista de BI','Controller','Analista de Dados','Analista Adm.','Gerente de Projetos','Analista Comercial','Consultor de Dados'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;"><strong>Toda empresa do Brasil</strong> contrata quem tem Excel Avançado de verdade. Não importa o setor.</p>
            </div>
        </div>
    </div>
</section>

<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Dados que transformam carreiras</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['F','Fabiana Reis','Analista Financeira — Vale','Criei um dashboard que automatizou 3 dias de trabalho manual em 10 minutos. A diretora ficou tão impressionada que me promoveu na mesma semana.'],
                ['C','Carlos Magno','Analista de BI — Startup','Saí do Excel básico para Power BI em 3 meses com a Sophie Link. Hoje ganho R$7.000 fazendo análise de dados para uma empresa de tecnologia.'],
                ['A','Amanda Torres','Coordenadora Adm. — Sotreq','O VBA que aprendi automatizou nossos relatórios mensais. Economizamos 40 horas de trabalho por mês. Virei a referência técnica do departamento.'],
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
    <h2>Seja o especialista em Excel da sua empresa.</h2>
    <p>Quem domina dados domina decisões — e domina a carreira.</p>
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
