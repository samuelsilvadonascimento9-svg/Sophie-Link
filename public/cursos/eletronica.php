<?php
// Eletrônica — Sophie Link (Arq 6: Dark Premium)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eletrônica | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔌</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/eletronica-page.css?v=5">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<div class="a6-bg-glow"></div>
<div class="a6-bg-glow-2"></div>

<header class="a6-header">
    <a href="../index.php" class="a6-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a6-nav">
        <a href="#diferenciais">Laboratórios</a>
        <a href="#grade">Tecnologias</a>
        <a href="../index.php#fale-conosco" class="a6-btn">MATRICULE-SE</a>
    </nav>
</header>

<section class="a6-hero">
    <div class="a6-badge">Formação em Hardware Avançado</div>
    <h1>O Código Precisa de um Cérebro. <br>Aprenda a Criá-lo.</h1>
    <p>Domine o hardware por trás da Inteligência Artificial, Automação e Internet das Coisas. O curso técnico de Eletrônica mais moderno e atualizado do mercado.</p>
    
    <div class="a6-stats-container">
        <div class="a6-glass-box">
            <h3>IoT</h3>
            <p>Internet of Things</p>
        </div>
        <div class="a6-glass-box">
            <h3>SMD</h3>
            <p>Microsoldagem Avançada</p>
        </div>
        <div class="a6-glass-box">
            <h3>100%</h3>
            <p>Laboratórios Práticos</p>
        </div>
    </div>
</section>

<section class="a6-section" id="diferenciais">
    <h2 class="a6-title">Ecossistema de Aprendizado</h2>
    <div class="a6-diff-grid">
        <div class="a6-diff-card">
            <i data-lucide="zap"></i>
            <h4>Estrutura Profissional</h4>
            <p>Bancadas equipadas com osciloscópios digitais, fontes assimétricas, multímetros true-RMS e estações de retrabalho de última geração.</p>
        </div>
        <div class="a6-diff-card">
            <i data-lucide="cpu"></i>
            <h4>Sistemas Embarcados</h4>
            <p>Aprenda a programar o "cérebro" das máquinas utilizando Arduino, ESP32, e a linguagem C++ voltada para controle de hardware.</p>
        </div>
        <div class="a6-diff-card">
            <i data-lucide="tool"></i>
            <h4>Reparo em Nível Componente</h4>
            <p>Especialização rigorosa em diagnóstico de falhas em placas-mãe multicamadas e ressoldagem de microcomponentes SMD e BGA.</p>
        </div>
    </div>
</section>

<section class="a6-section" id="grade">
    <h2 class="a6-title">Caminho de Formação (Módulos)</h2>
    <div class="a6-modules-grid">
        <div class="a6-pill">
            <div class="a6-pill-num">1</div>
            <h4>Fundamentos Analógicos (BJT, MOSFET)</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">2</div>
            <h4>Sistemas Digitais e Álgebra Booleana</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">3</div>
            <h4>Programação de Microcontroladores</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">4</div>
            <h4>Projetos Práticos de Automação IoT</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">5</div>
            <h4>Leitura de Esquemáticos Avançados</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">6</div>
            <h4>Manutenção e Troubleshooting</h4>
        </div>
    </div>
</section>

<footer class="a6-footer">
    <p>&copy; <?= date('Y') ?> Sophie Link. <a href="../index.php">RETORNAR À PLATAFORMA</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
