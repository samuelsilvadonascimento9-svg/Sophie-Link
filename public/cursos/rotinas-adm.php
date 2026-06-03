<?php
// Auxiliar de Rotinas Adm. / Dep. Pessoal — Sophie Link
$courseColor = '#6366F1';
$courseDark  = '#4f46e5';
$courseLt    = 'rgba(99,102,241,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auxiliar de Rotinas Administrativas e Dep. Pessoal — Sophie Link</title>
    <meta name="description" content="Curso de Auxiliar de Rotinas Administrativas e Departamento Pessoal na Sophie Link. DP, folha de pagamento e rotinas empresariais em Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>">
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
            <div class="hero-badge"><i data-lucide="users"></i> FORMAÇÃO PROFISSIONAL</div>
            <h1>Rotinas Adm. <span>e Dep. Pessoal</span></h1>
            <p>Domine a folha de pagamento, contratos de trabalho, eSocial e todas as rotinas que fazem o RH e DP funcionarem com excelência.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="6" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="300" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">eSocial</div><div class="hero-stat-lbl">Atualizado</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- FLUXO DE DOCUMENTOS -->
            <div class="docs-visual">
                <div class="doc-card">
                    <h4><i data-lucide="file-text" style="width:14px;height:14px;"></i> Folha de Pagamento</h4>
                    <p>Processada com sucesso</p>
                    <div class="doc-line"></div>
                    <div class="doc-line short"></div>
                    <div class="doc-line"></div>
                </div>
                <div class="doc-card">
                    <h4><i data-lucide="user-plus" style="width:14px;height:14px;"></i> Admissão</h4>
                    <p>Contrato gerado</p>
                    <div class="doc-line"></div>
                    <div class="doc-line short"></div>
                </div>
                <div class="doc-card">
                    <h4><i data-lucide="calendar" style="width:14px;height:14px;"></i> Férias e FGTS</h4>
                    <p>Calculado automaticamente</p>
                    <div class="doc-line"></div>
                    <div class="doc-line short"></div>
                    <div class="doc-line"></div>
                </div>
                <div class="doc-arrow">
                    <i data-lucide="arrow-down" style="width:20px;height:20px;"></i>
                </div>
                <div class="doc-arrow">
                    <i data-lucide="arrow-down" style="width:20px;height:20px;"></i>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">O coração do RH de qualquer empresa</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O <strong>Auxiliar de Rotinas Administrativas e Departamento Pessoal</strong> é a mão direita do gestor de RH. Responsável pela folha de pagamento, contratos de trabalho, benefícios, eSocial, admissões e demissões — esse profissional é indispensável em qualquer empresa.</p>
                <p>Com as mudanças do eSocial e a digitalização dos processos trabalhistas, empresas precisam urgentemente de profissionais atualizados na legislação e nos sistemas digitais de RH.</p>
                <p>O curso inclui simulações reais com softwares de DP (ADP, Protheus, Sankhya), cálculos de rescisão, 13º salário, férias, INSS e FGTS conforme a legislação vigente.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="file-text"></i></div>
                    <div class="highlight-text"><h4>Folha de Pagamento</h4><p>Calcule INSS, IRRF, FGTS, adicionais, horas extras e benefícios com precisão absoluta.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="monitor"></i></div>
                    <div class="highlight-text"><h4>eSocial</h4><p>Domine o sistema de escrituração fiscal digital das relações de trabalho do governo federal.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="scale"></i></div>
                    <div class="highlight-text"><h4>CLT Atualizada</h4><p>Legislação trabalhista, reforma trabalhista, contratos de trabalho e aspectos previdenciários.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Da admissão à rescisão</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Rotinas Administrativas', '80h', ['Comunicação Empresarial', 'Arquivo e Protocolo', 'Informática para o Escritório', 'Atendimento ao Cliente Interno']],
                ['Módulo II — Legislação Trabalhista', '80h', ['CLT e Reforma Trabalhista', 'Tipos de Contrato de Trabalho', 'Admissão e Integração', 'Demissão e Cálculo Rescisório']],
                ['Módulo III — Folha de Pagamento', '80h', ['Folha de Pagamento Completa', 'INSS, IRRF e FGTS', '13º Salário e Férias', 'Horas Extras e Adicionais']],
                ['Módulo IV — eSocial e Sistemas', '60h', ['eSocial — Todos os Módulos', 'Softwares de DP (ADP, Protheus)', 'DARF, GFIP e GPS', 'Projeto Final e Avaliação']],
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
        <h2 class="sec-title">Domínio total do DP</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['file-text','Folha de Pagamento','Processar folha mensal completa com todos os cálculos trabalhistas e previdenciários.'],
                ['user-plus','Admissão','Conduzir todo o processo de admissão: documentos, exames, CTPS e eSocial.'],
                ['user-minus','Rescisão','Calcular rescisões contratuais (sem justa causa, justa causa, pedido de demissão).'],
                ['calendar','Férias e 13º','Controlar cotas de férias, emitir avisos e calcular 13º salário proporcional.'],
                ['monitor','eSocial','Enviar todos os eventos trabalhistas ao eSocial dentro dos prazos legais.'],
                ['scale','CLT','Interpretar e aplicar a Consolidação das Leis do Trabalho no cotidiano do DP.'],
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
        <h2 class="sec-title">Toda empresa precisa de DP</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$2.200</span><span class="lbl">Salário médio inicial</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">88%</span><span class="lbl">Empregabilidade</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Auxiliar de Dep. Pessoal','Assistente de RH','Analista de Folha','Assistente Administrativo','Analista de Benefícios','Analista eSocial','Assistente Fiscal','Coordenador de DP'] as $c): ?>
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
        <h2 class="sec-title">Carreiras que foram simplificadas</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['L','Larissa Mendes','Analista de DP — Vale','Cuido da folha de pagamento de 300 colaboradores. A Sophie Link me ensinou cada detalhe do cálculo — hoje faço no automático.'],
                ['J','Jonas Cavalcante','Assistente Adm. — Comércio Local','A empresa me contratou em 2 semanas depois de me formar. O conhecimento em eSocial foi o que mais chamou atenção do entrevistador.'],
                ['E','Eliana Barros','Coordenadora de RH — Sotreq','Comecei como auxiliar de DP. Em 3 anos virei coordenadora. A base sólida que a Sophie Link me deu foi fundamental para crescer.'],
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
    <h2>Toda empresa tem DP. A sua carreira pode estar lá.</h2>
    <p>Profissionais de Departamento Pessoal são contratados todos os dias em Parauapebas e na região.</p>
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
