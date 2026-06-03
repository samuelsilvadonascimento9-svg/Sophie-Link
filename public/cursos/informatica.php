<?php
// Informática (Básica, Avançada, Redes) — Sophie Link
$courseColor = '#0891B2';
$courseDark  = '#0e7490';
$courseLt    = 'rgba(8,145,178,0.08)';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informática — Básica, Avançada e Redes — Sophie Link</title>
    <meta name="description" content="Cursos de Informática Básica, Avançada e Redes na Sophie Link em Parauapebas. Do básico ao networking profissional com terminal animado.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>">
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
            <div class="hero-badge"><i data-lucide="monitor"></i> CURSOS DE INFORMÁTICA</div>
            <h1>Informática <span>Básica, Avançada e Redes</span></h1>
            <p>Do primeiro clique à configuração de redes empresariais. Domine o computador que é a ferramenta número 1 do mercado de trabalho moderno.</p>
            <div class="hero-stats-row">
                <div class="hero-stat"><div class="hero-stat-val" data-count="3" data-suffix=" níveis">0</div><div class="hero-stat-lbl">Níveis</div></div>
                <div class="hero-stat"><div class="hero-stat-val" data-count="240" data-suffix="h">0h</div><div class="hero-stat-lbl">Por Nível</div></div>
                <div class="hero-stat"><div class="hero-stat-val">CompTIA</div><div class="hero-stat-lbl">Alinhado</div></div>
            </div>
            <div class="hero-btns">
                <a href="../index.php#fale-conosco" class="btn-hero-primary"><i data-lucide="send"></i> Inscreva-se Agora</a>
                <a href="#grade" class="btn-hero-secondary"><i data-lucide="book-open"></i> Ver Grade</a>
            </div>
        </div>
        <div class="hero-visual">
            <!-- TERMINAL DIGITANDO -->
            <div class="terminal-visual">
                <div class="terminal-bar">
                    <div class="terminal-dot red"></div>
                    <div class="terminal-dot yellow"></div>
                    <div class="terminal-dot green"></div>
                    <span class="terminal-title">terminal@sophie-link ~ </span>
                </div>
                <div class="terminal-body" id="terminalOutput">
                    <div class="term-line">$ sophie-link --start</div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section reveal" id="sobre">
    <div class="container">
        <span class="sec-label">Sobre os Cursos</span>
        <h2 class="sec-title">Tecnologia do básico ao avançado</h2>
        <div class="sobre-grid">
            <div class="sobre-text">
                <p>A <strong>Informática</strong> é pré-requisito para praticamente todo emprego do mercado atual. Na Sophie Link, oferecemos três níveis complementares que levam o aluno do zero ao profissional de TI qualificado.</p>
                <p><strong>Básico:</strong> Windows, Office (Word, Excel, PowerPoint), Internet e segurança digital. <strong>Avançado:</strong> Excel avançado, programação em Python, banco de dados e design gráfico. <strong>Redes:</strong> Infraestrutura de rede, cabeamento estruturado, configuração de roteadores e switches, segurança de rede e noções de nuvem AWS/Azure.</p>
                <p>O nível de Redes prepara para certificações internacionais como CompTIA Network+, Cisco CCNA e Microsoft Azure Fundamentals.</p>
            </div>
            <div class="sobre-highlights">
                <div class="highlight-item reveal reveal-delay-1">
                    <div class="highlight-icon"><i data-lucide="monitor"></i></div>
                    <div class="highlight-text"><h4>Básico ao Avançado</h4><p>Três módulos progressivos: cada nível se complementa e amplia as suas possibilidades no mercado.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-2">
                    <div class="highlight-icon"><i data-lucide="network"></i></div>
                    <div class="highlight-text"><h4>Redes e Infraestrutura</h4><p>Cabeamento, roteadores, switches, VLANs, TCP/IP e introdução à segurança de redes corporativas.</p></div>
                </div>
                <div class="highlight-item reveal reveal-delay-3">
                    <div class="highlight-icon"><i data-lucide="cloud"></i></div>
                    <div class="highlight-text"><h4>Cloud Computing</h4><p>Fundamentos de AWS e Azure, serviços em nuvem, virtualização e boas práticas de segurança.</p></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section section-alt reveal" id="grade">
    <div class="container">
        <span class="sec-label">Grade Curricular</span>
        <h2 class="sec-title">Do clique à rede corporativa</h2>
        <div class="grade-list">
            <?php $modulos = [
                ['Nível 1 — Informática Básica (240h)', '240h', ['Windows 10/11 — Uso Completo', 'Microsoft Word — Documentos Profissionais', 'Microsoft Excel — Planilhas e Fórmulas Básicas', 'Internet, E-mail e Segurança Digital']],
                ['Nível 2 — Informática Avançada (240h)', '240h', ['Excel Avançado (Fórmulas, Tabelas Dinâmicas, VBA)', 'PowerPoint — Apresentações Executivas', 'Introdução ao Python', 'Banco de Dados e SQL Básico']],
                ['Nível 3 — Redes (240h)', '240h', ['Fundamentos de Redes TCP/IP', 'Cabeamento Estruturado (Cat5e/Cat6/Fibra)', 'Configuração de Roteadores e Switches (Cisco)', 'Segurança de Rede e Firewall']],
                ['Módulo Complementar — Cloud e Prática', '120h', ['AWS Fundamentals (EC2, S3, RDS)', 'Microsoft Azure Basics', 'Active Directory e Domínio Windows', 'Helpdesk e Suporte Técnico']],
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
        <h2 class="sec-title">Do usuário ao especialista</h2>
        <div class="competencias-grid">
            <?php $comps = [
                ['monitor','Office Completo','Dominar Word, Excel, PowerPoint e Outlook para o ambiente corporativo profissional.'],
                ['code','Programação Python','Criar scripts, automações e análise de dados com Python — a linguagem mais requisitada.'],
                ['network','Redes TCP/IP','Configurar e manter redes LAN/WAN, VLANs, DHCP, DNS e roteamento estático.'],
                ['shield','Segurança Digital','Implementar políticas de segurança, firewall, VPN e proteção contra ataques cibernéticos.'],
                ['cloud','Cloud Computing','Criar e gerenciar recursos em AWS e Azure para soluções escaláveis na nuvem.'],
                ['headphones','Suporte Técnico','Diagnosticar e resolver problemas de hardware e software com metodologia ITIL.'],
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
        <h2 class="sec-title">TI: o mercado que nunca encolhe</h2>
        <div class="mercado-grid">
            <div class="mercado-info">
                <div class="mercado-stat-box"><span class="val">R$3.200</span><span class="lbl">Salário médio — Básico</span></div>
                <div class="mercado-stat-box" style="background:var(--c-course-d)"><span class="val">R$5.500</span><span class="lbl">Salário médio — Redes</span></div>
            </div>
            <div>
                <div class="cargos-grid">
                    <?php foreach (['Técnico de Suporte TI','Analista de Redes','Analista de Help Desk','Técnico em Infraestrutura','Administrador de Sistemas','Técnico Cloud AWS/Azure','Técnico de Cabeamento','Analista de Cibersegurança'] as $c): ?>
                    <div class="cargo-item"><div class="cargo-dot"></div><span><?= $c ?></span></div>
                    <?php endforeach; ?>
                </div>
                <p style="margin-top:1.5rem;color:var(--c-text-muted);font-size:0.9rem;">Parceiros: <strong>Vale (TI), Hydro, Empresas de TI de Parauapebas, Marabá e toda a região</strong></p>
            </div>
        </div>
    </div>
</section>

<section class="section reveal">
    <div class="container">
        <span class="sec-label">Depoimentos</span>
        <h2 class="sec-title">De usuário a profissional</h2>
        <div class="depoimentos-grid">
            <?php $deps = [
                ['P','Pedro Henrique','Técnico de Redes — Vale','Entrei na Sophie Link sem saber configurar um roteador. Saí pronto para administrar a rede de uma das maiores mineradoras do mundo.'],
                ['T','Tatiane Souza','Help Desk Sênior — Empresa de TI','O curso básico me deu a base, o avançado me deu confiança. Hoje treino novos funcionários com o que aprendi na Sophie Link.'],
                ['M','Matheus Figueiredo','Cloud Engineer — Startup Marabá','Aprendi AWS na Sophie Link, tirei minha certificação Cloud Practitioner e hoje trabalho 100% remoto. A melhor decisão da minha vida.'],
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
    <h2>O mundo é digital. Você está pronto?</h2>
    <p>Informática é a porta de entrada para todas as carreiras do século XXI.</p>
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
