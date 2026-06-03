<?php
// Eletrônica — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eletrônica | Sophie Link</title>
    <meta name="description" content="Curso de Eletrônica na Sophie Link. Reparo de placas e microcontroladores.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📻</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/eletronica-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="el-nav">
    <a href="../index.php" class="el-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="el-nav-links">
        <a href="../index.php">PCB_MAIN</a>
        <a href="#modulos">COMPONENTS</a>
        <a href="#skills">I/O_PORTS</a>
    </div>
    <a href="../index.php#fale-conosco" class="el-btn">SOLDER_CONNECTION()</a>
</nav>

<section class="el-hero">
    <div class="el-hero-content">
        <h1>Eletrônica</h1>
        <p>A inteligência por trás de cada máquina está gravada em placas de circuito impresso. Domine a microeletrônica, soldagem SMD e programação de microcontroladores para diagnosticar o cérebro dos equipamentos modernos.</p>
        <a href="#modulos" class="el-btn" style="margin-top: 2rem;">BOOT_SEQUENCE_START</a>
    </div>
</section>

<section class="el-section" id="modulos">
    <h2 class="el-title">CIRCUIT MODULES</h2>
    <div class="el-grid">
        <div class="el-component">
            <i data-lucide="cpu"></i>
            <h3>Eletrônica Analógica</h3>
            <p>Resistores, capacitores, transistores e diodos. O comportamento dos elétrons e a base física dos circuitos.</p>
        </div>
        <div class="el-component">
            <i data-lucide="binary"></i>
            <h3>Eletrônica Digital</h3>
            <p>Portas lógicas, flip-flops e sistemas binários. Onde a tensão elétrica se transforma em informação (0 e 1).</p>
        </div>
        <div class="el-component">
            <i data-lucide="radio"></i>
            <h3>Soldagem SMD e PTH</h3>
            <p>Técnicas avançadas de soldagem em placas de circuito impresso com estação de ar quente e microscópio.</p>
        </div>
        <div class="el-component">
            <i data-lucide="monitor-smartphone"></i>
            <h3>Microcontroladores</h3>
            <p>Programação em C para Arduino, ESP32 e PIC. Automação de processos através de código gravado em chips.</p>
        </div>
    </div>
</section>

<section class="el-section" id="skills">
    <h2 class="el-title">I/O DATA SPECS</h2>
    <div style="background:var(--el-dark); border: 2px solid var(--el-trace); padding: 3rem; max-width: 800px; margin: 0 auto; font-family:var(--font-heading); color:var(--el-gold);">
        > INICIANDO DIAGNÓSTICO DE COMPETÊNCIAS...<br>
        > CARREGANDO USO DE INSTRUMENTOS:<br>
        &nbsp;&nbsp;[OK] Osciloscópio Digital<br>
        &nbsp;&nbsp;[OK] Multímetro True RMS<br>
        &nbsp;&nbsp;[OK] Fonte de Bancada<br>
        > CARREGANDO ANÁLISE DE DEFEITOS:<br>
        &nbsp;&nbsp;[OK] Rastreamento de Curtos-Circuitos<br>
        &nbsp;&nbsp;[OK] Medição de Fuga de Corrente<br>
        &nbsp;&nbsp;[OK] Leitura de Esquemas Elétricos Complexos (Datasheets)<br>
        > STATUS DO TÉCNICO: PRONTO PARA O MERCADO.
    </div>
</section>

<footer class="el-footer">
    <p>END OF TRANSMISSION. SOPHIE LINK PCB v1.0</p>
    <a href="../index.php" style="color:var(--el-gold);text-decoration:none;display:inline-block;margin-top:1rem;">RETURN_TO_HOME_ADDRESS</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
