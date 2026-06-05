<?php
// Mecânica Pesada — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mecânica Pesada e de Autos | Sophie Link</title>
    <meta name="description" content="Curso de Mecânica Pesada na Sophie Link.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/mec-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<!-- Industrial Nav -->
<nav class="mec-nav">
    <a href="../index.php" class="mec-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="mec-nav-links">
        <a href="../index.php">HOME</a>
        <a href="#modulos">GRADE</a>
        <a href="#habilidades">SKILLS</a>
    </div>
    <a href="../index.php#fale-conosco" class="mec-btn">
        <i data-lucide="wrench"></i> MATRICULE-SE
    </a>
</nav>

<!-- Hero Section -->
<section class="mec-hero">
    <div class="mec-hero-content">
        <div class="mec-badge">HEAVY DUTY TRAINING</div>
        <h1>Mecânica <span>Pesada e de Autos</span></h1>
        <p>A força que move a mineração não está apenas nas máquinas, está nos profissionais que as mantêm operando 24h por dia. Torne-se um deles.</p>
        
        <div class="mec-specs">
            <div class="mec-spec-item">
                <div class="mec-spec-val">12</div>
                <div class="mec-spec-lbl">Meses de Duração</div>
            </div>
            <div class="mec-spec-item">
                <div class="mec-spec-val">600</div>
                <div class="mec-spec-lbl">Horas de Formação</div>
            </div>
            <div class="mec-spec-item">
                <div class="mec-spec-val">CAT</div>
                <div class="mec-spec-lbl">Padrão Indústria</div>
            </div>
        </div>

        <a href="#modulos" class="mec-btn mec-btn-outline" style="margin-top: 1rem;">VER MODULOS</a>
    </div>
    <div class="mec-hero-visual">
        <i data-lucide="cog" style="width: 250px; height: 250px; color: rgba(255,184,0,0.15); animation: spin 20s linear infinite;"></i>
        <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
    </div>
</section>

<!-- Modules Section -->
<section class="mec-section" id="modulos">
    <h2 class="mec-title">Módulos do Curso</h2>
    <div class="mec-grid">
        <div class="mec-card">
            <div class="mec-card-num">01</div>
            <h3>Motores & Auxiliares</h3>
            <ul>
                <li><i data-lucide="check-square"></i> Motores Ciclo Otto e Diesel</li>
                <li><i data-lucide="check-square"></i> Arrefecimento e Lubrificação</li>
                <li><i data-lucide="check-square"></i> Injeção Eletrônica (Common Rail)</li>
                <li><i data-lucide="check-square"></i> Turboalimentadores</li>
            </ul>
        </div>
        <div class="mec-card">
            <div class="mec-card-num">02</div>
            <h3>Chassis & Transmissão</h3>
            <ul>
                <li><i data-lucide="check-square"></i> Transmissão Manual e Auto</li>
                <li><i data-lucide="check-square"></i> Freios ABS/ESP/Retarder</li>
                <li><i data-lucide="check-square"></i> Suspensão e Direção</li>
                <li><i data-lucide="check-square"></i> Alinhamento Geométrico</li>
            </ul>
        </div>
        <div class="mec-card">
            <div class="mec-card-num">03</div>
            <h3>Sistemas de Linha Amarela</h3>
            <ul>
                <li><i data-lucide="check-square"></i> Máquinas de Terraplenagem</li>
                <li><i data-lucide="check-square"></i> Hidráulica Industrial de Alta Pressão</li>
                <li><i data-lucide="check-square"></i> Diagnóstico com Scanner (Cat ET)</li>
                <li><i data-lucide="check-square"></i> Sistemas Elétricos Pesados</li>
            </ul>
        </div>
    </div>
</section>

<!-- Competencies Section -->
<section class="mec-section mec-plate-section" id="habilidades">
    <h2 class="mec-title">Especificações Técnicas (Skills)</h2>
    <div class="mec-plate-grid">
        <div class="mec-plate">
            <div class="mec-plate-icon"><i data-lucide="wrench"></i></div>
            <div>
                <h4>Motores Diesel Euro 5/6</h4>
                <p>Diagnóstico e desmontagem completa de motores de grande porte.</p>
            </div>
        </div>
        <div class="mec-plate">
            <div class="mec-plate-icon"><i data-lucide="droplets"></i></div>
            <div>
                <h4>Hidráulica Pesada</h4>
                <p>Manutenção de bombas, atuadores e válvulas direcionais.</p>
            </div>
        </div>
        <div class="mec-plate">
            <div class="mec-plate-icon"><i data-lucide="monitor-speaker"></i></div>
            <div>
                <h4>Diagnóstico Eletrônico</h4>
                <p>Uso de scanners multimarca e softwares originais de montadoras.</p>
            </div>
        </div>
        <div class="mec-plate">
            <div class="mec-plate-icon"><i data-lucide="settings"></i></div>
            <div>
                <h4>Transmissões Automáticas</h4>
                <p>Manutenção em caixas Allison, ZF e conversores de torque.</p>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="mec-footer">
    <div class="mec-footer-brand">SOPHIE <span>LINK</span></div>
    <p>CENTRO TÉCNICO PROFISSIONALIZANTE &copy; <?= date('Y') ?> | PARAUAPEBAS, PA</p>
    <a href="../index.php" style="color:var(--mec-yellow); text-decoration:none; display:inline-block; margin-top:1rem; font-weight:bold;">VOLTAR AO INÍCIO</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
