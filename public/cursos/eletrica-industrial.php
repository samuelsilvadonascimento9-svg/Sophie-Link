<?php
// Elétrica Industrial / Máquinas Pesadas — Sophie Link
$courseColor = '#D97706';
$courseDark  = '#b45309';
$courseLt    = 'rgba(217,119,6,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elétrica Industrial e Máquinas Pesadas — Sophie Link</title>
    <meta name="description" content="Curso de Elétrica Industrial e Máquinas Pesadas na Sophie Link. NR-10, subestações, painéis elétricos e sistemas de alta tensão em Parauapebas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
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
            <div class="hero-badge"><i data-lucide="zap-off"></i> FORMAÇÃO PROFISSIONAL</div>
            <h1>Elétrica Industrial <span>e Máquinas Pesadas</span></h1>
            <p>Domine instalações elétricas industriais, subestações e sistemas de alta tensão que alimentam as maiores plantas industriais do Norte do Brasil.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="12" data-suffix=" meses">0</div><div class="hero-stat-lbl">Duração</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="800" data-suffix="h">0h</div><div class="hero-stat-lbl">Carga Horária</div></div>
                <div class="hero-stat"><div class="hero-stat-val">SEP</div><div class="hero-stat-lbl">Alta Tensão</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- FAÍSCA ELÉTRICA ANIMADA -->
            <div class="spark-visual">
                <div class="spark-ring"></div>
                <div class="spark-ring"></div>
                <div class="spark-ring"></div>
                <div class="spark-bolt">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                </div>
                <div class="spark-particles">
                    <div class="spark-p"></div>
                    <div class="spark-p"></div>
                    <div class="spark-p"></div>
                    <div class="spark-p"></div>
                    <div class="spark-p"></div>
                    <div class="spark-p"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre o Curso</span>
        <h2 class="sec-title">A energia que move a indústria</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>O eletricista industrial é o profissional mais crítico de qualquer planta de mineração ou manufatura. Uma parada elétrica não planejada pode custar milhões por hora — e é esse especialista que evita e resolve essas situações.</p>
                <p>O programa abrange instalações elétricas industriais, dimensionamento de cabos e proteções, subestações de média e alta tensão, painéis de controle, sistemas de aterramento, NR-10 SEP (Sistema Elétrico de Potência) e análise termográfica.</p>
                <p>A Vale opera subestações de 500kV em Carajás. Nossos alunos são treinados para operar e manter sistemas de potência reais, não apenas simulações.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="zap"></i></div>
                    <div class="highlight-text"><h4>NR-10 SEP</h4><p>Habilitação para trabalho em sistemas de alta tensão, incluindo subestações e redes de distribuição.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="thermometer"></i></div>
                    <div class="highlight-text"><h4>Termografia Elétrica</h4><p>Diagnóstico preditivo com câmera termográfica para identificar pontos quentes antes de falhas críticas.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="settings-2"></i></div>
                    <div class="highlight-text"><h4>Painéis Industriais</h4><p>Montagem, instalação e comissionamento de painéis de força e controle para sistemas industriais.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Da tomada à subestação</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Módulo I — Fundamentos Elétricos', '180h', ['Circuitos Elétricos CC e CA', 'NR-10 — Segurança em Eletricidade', 'Instalações Elétricas (NBR 5410)', 'Aterramento e SPDA']],
                ['Módulo II — Instalações Industriais', '200h', ['Dimensionamento de Cabos e Proteções', 'Quadros de Distribuição Industrial', 'Sistemas de Iluminação Industrial', 'Motores e Partida de Motores']],
                ['Módulo III — Alta Tensão', '200h', ['Subestações de Média e Alta Tensão', 'NR-10 SEP Habilitado', 'Transformadores e Religadores', 'Análise Termográfica e Preditiva']],
                ['Módulo IV — Estágio', '220h', ['Estágio em Subestação ou Planta Industrial', 'Projeto Elétrico Industrial', 'Documentação Técnica', 'Avaliação Final']],
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
        <h2 class="sec-title">Alta tensão, alta capacitação</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['zap','Instalações Elétricas','Projetar e executar instalações industriais em conformidade com NBR 5410/5419.'],
                ['shield','NR-10 SEP','Trabalhar com segurança em subestações e sistemas elétricos de potência.'],
                ['thermometer','Termografia','Realizar inspeções termográficas para detecção preditiva de falhas elétricas.'],
                ['settings','Painéis Industriais','Montar e comissionar painéis de força, partida direta, estrela-triângulo e soft-starter.'],
                ['zap-off','Subestações','Operar e manter transformadores, chaves seccionadoras e disjuntores de alta tensão.'],
                ['activity','Análise Elétrica','Utilizar analisadores de qualidade de energia para diagnóstico de harmônicos e desequilíbrios.'],
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
        <h2 class="sec-title">Iluminando carreiras brilhantes</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$5.800</span><span class="lbl">Salário médio — PA</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">99%</span><span class="lbl">Empregabilidade</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Eletricista Industrial','Técnico de Subestação','Técnico em Alta Tensão','Inspetor Termográfico','Montador de Painéis','Técnico de Manutenção Elétrica','Analista de Qualidade de Energia','Projetista Elétrico'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;">Parceiros: <strong>Vale, Eletronorte, Celpa, Hydro, Sotreq, Siemens Energy, ABB</strong></p>
            </div>
        </div>
    </div>
</section>

<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">Quem já iluminou seu futuro</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['A','Anderson Lima','Eletricista de Subestação — Vale','Opero subestações de 138kV. Sem a formação NR-10 SEP da Sophie Link, jamais chegaria a esse nível de responsabilidade.'],
                ['C','Carolina Rocha','Técnica em Alta Tensão — Eletronorte','Sou uma das poucas mulheres com habilitação SEP no estado do Pará. A Sophie Link abriu essa porta para mim.'],
                ['R','Ronaldo Farias','Inspetor Termográfico — Hydro','A termografia que aprendi na Sophie Link me permitiu identificar uma falha crítica que evitou um apagão na planta. Me tornaram referência na empresa.'],
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
    <h2>Alta tensão. Alta remuneração.</h2>
    <p>Eletricistas industriais habilitados com NR-10 SEP são os profissionais mais disputados da mineração.</p>
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
