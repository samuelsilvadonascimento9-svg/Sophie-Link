<?php
// Informática — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informática Avançada e Redes | Sophie Link</title>
    <meta name="description" content="Curso de Informática Básica, Avançada e Redes na Sophie Link.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💻</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/info-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<!-- Custom Tech Nav -->
<nav class="info-nav">
    <a href="../index.php" class="info-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="info-nav-links">
        <a href="../index.php"><i data-lucide="chevron-left" style="width:16px;height:16px;vertical-align:middle;"></i> root/home</a>
        <a href="#modulos">./modulos</a>
        <a href="#skills">./skills</a>
        <a href="../index.php#fale-conosco" class="btn-primary">init_inscricao()</a>
    </div>
</nav>

<!-- Hero Section -->
<section class="info-hero">
    <div class="info-hero-content">
        <div class="info-badge">v3.0.1_STABLE</div>
        <h1>Informática <span>Básica, Avançada e Redes</span></h1>
        <p>Acesse o nível administrativo do seu futuro profissional. Domine desde ferramentas de escritório até infraestrutura de redes e automação com Python.</p>
        <a href="../index.php#fale-conosco" class="btn-primary" style="display:inline-block; margin-top:1rem;">> EXECUTE_CAREER.sh</a>
    </div>
    <div class="info-terminal-wrapper">
        <div class="info-terminal">
            <div class="info-term-header">
                <div class="info-term-dot r"></div>
                <div class="info-term-dot y"></div>
                <div class="info-term-dot g"></div>
            </div>
            <div class="info-term-body">
                guest@sophielink:~$ sudo apt-get install future-career<br>
                [sudo] password for guest: *********<br>
                Reading package lists... Done<br>
                Building dependency tree... Done<br>
                The following NEW packages will be installed:<br>
                &nbsp;&nbsp;excel-adv python-basics ccna-networking aws-cloud<br>
                0 upgraded, 4 newly installed, 0 to remove.<br>
                After this operation, 100% employability will be reached.<br>
                Do you want to continue? [Y/n] y<br>
                Installing... <span class="term-cursor"></span>
            </div>
        </div>
    </div>
</section>

<!-- Modules / Tree Section -->
<section class="info-section" id="modulos">
    <h2 class="info-section-title">Directory: /sys/modulos</h2>
    <div class="tree-container">
        <div class="tree-item">
            <div class="tree-folder"><i data-lucide="folder"></i> Nivel_1_Basico (240h)</div>
            <div class="tree-files">
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> windows_11_mastery.exe</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> ms_word_docs.docx</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> excel_formulas.xlsx</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> cyber_sec_basics.log</div>
            </div>
        </div>
        <div class="tree-item">
            <div class="tree-folder"><i data-lucide="folder"></i> Nivel_2_Avancado (240h)</div>
            <div class="tree-files">
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> excel_vba_macros.xlsm</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> python_automation.py</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> sql_database_basics.sql</div>
            </div>
        </div>
        <div class="tree-item">
            <div class="tree-folder"><i data-lucide="folder"></i> Nivel_3_Redes (240h)</div>
            <div class="tree-files">
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> tcp_ip_fundamentals.conf</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> cisco_router_setup.cfg</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> firewall_rules.json</div>
            </div>
        </div>
        <div class="tree-item">
            <div class="tree-folder"><i data-lucide="folder"></i> Modulo_Complementar_Cloud (120h)</div>
            <div class="tree-files">
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> aws_ec2_s3.yaml</div>
                <div class="tree-file"><i data-lucide="file-code-2" style="width:16px;"></i> azure_active_directory.ps1</div>
            </div>
        </div>
    </div>
</section>

<!-- Competencies Section -->
<section class="info-section" id="skills">
    <h2 class="info-section-title">Dependencies & Skills</h2>
    <div class="code-grid">
        <div class="code-card">
            <i data-lucide="monitor"></i>
            <h3>Office Completo</h3>
            <p>Dominar Word, Excel, PowerPoint e Outlook para o ambiente corporativo profissional com máxima produtividade.</p>
        </div>
        <div class="code-card">
            <i data-lucide="terminal-square"></i>
            <h3>Python Scripts</h3>
            <p>Criar scripts de automação, manipulação de arquivos e análise de dados básicos com Python.</p>
        </div>
        <div class="code-card">
            <i data-lucide="server"></i>
            <h3>Redes Corporativas</h3>
            <p>Configurar roteadores, switches, VLANs e garantir a comunicação estável de empresas locais e multinacionais.</p>
        </div>
        <div class="code-card">
            <i data-lucide="shield-alert"></i>
            <h3>Segurança Digital</h3>
            <p>Proteger dados contra malwares e ataques, aplicando configurações de firewall e políticas de rede.</p>
        </div>
        <div class="code-card">
            <i data-lucide="cloud"></i>
            <h3>Cloud Computing</h3>
            <p>Implante e gerencie máquinas virtuais e storages nas principais nuvens do mercado (AWS e Azure).</p>
        </div>
        <div class="code-card">
            <i data-lucide="cpu"></i>
            <h3>Hardware & ITIL</h3>
            <p>Diagnóstico e montagem de computadores, além de suporte técnico (Help Desk) utilizando frameworks globais.</p>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="info-footer">
    <p>EOF. &copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link. <a href="../index.php">cd /home</a></p>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
