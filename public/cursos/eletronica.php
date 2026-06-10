<?php
// Eletrônica — Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Eletrônica | Sophie Link</title>
    <meta name="description" content="Curso de Eletrônica na Sophie Link. Reparo de placas, solda SMD e microcontroladores.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔌</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/eletronica-page.css?v=3">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="el-nav">
    <a href="../index.php" class="el-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="el-links">
        <a href="../index.php">HOME</a>
        <a href="#modulos">CIRCUITOS</a>
    </div>
    <a href="../index.php#fale-conosco" class="el-btn">MATRICULE-SE</a>
</nav>

<section class="el-hero">
    <div class="pcb-lines"></div>
    <div class="el-hero-icon"><i data-lucide="cpu" style="width:80px;height:80px;"></i></div>
    <h1>Técnico em <span>Eletrônica</span></h1>
    <p>O coração de toda a tecnologia moderna bate em placas de circuito impresso. Aprenda eletrônica analógica, digital, reparo avançado de placas (SMD/BGA) e programação de microcontroladores.</p>
    <a href="#modulos" class="el-btn" style="margin-top: 1.5rem;">PROCESSAR DADOS</a>
</section>

<section class="el-section" id="modulos">
    <h2 class="el-title"><i data-lucide="microchip"></i> Matriz Curricular (PCB)</h2>
    <div class="el-grid">
        <div class="el-card">
            <div class="el-card-icon"><i data-lucide="zap"></i></div>
            <h3>Eletrônica Analógica</h3>
            <p>Estudo aprofundado de resistores, capacitores, diodos, transistores (BJT, FET, MOSFET) e amplificadores operacionais. Leitura de esquemas elétricos.</p>
        </div>
        <div class="el-card">
            <div class="el-card-icon"><i data-lucide="binary"></i></div>
            <h3>Eletrônica Digital</h3>
            <p>Portas lógicas, álgebra de Boole, flip-flops, contadores, registradores de deslocamento e conversores A/D e D/A.</p>
        </div>
        <div class="el-card">
            <div class="el-card-icon"><i data-lucide="cpu"></i></div>
            <h3>Microcontroladores</h3>
            <p>Programação C++ e Assembly para Arduino, ESP32 e PIC. Desenvolvimento de sistemas embarcados e IoT (Internet das Coisas).</p>
        </div>
        <div class="el-card">
            <div class="el-card-icon"><i data-lucide="pen-tool"></i></div>
            <h3>Manutenção e Solda</h3>
            <p>Técnicas de soldagem Through-Hole e SMD. Uso de estação de retrabalho, osciloscópio, multímetro e fonte de bancada para reparo de placas-mãe e módulos industriais.</p>
        </div>
    </div>
</section>

<footer class="el-footer">
    <a href="../index.php">RETORNAR AO SISTEMA CENTRAL</a>
    <p style="margin-top:2rem; color:var(--el-pcb);">&copy; <?= date('Y') ?> Sophie Link.</p>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
