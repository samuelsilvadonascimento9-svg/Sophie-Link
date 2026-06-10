<?php
// Eletrônica — Sophie Link (Design Web Sênior)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eletrônica | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔌</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/eletronica-page.css?v=6">
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
        <a href="../index.php#fale-conosco" class="a6-btn">Garantir Vaga</a>
    </nav>
</header>

<div class="a6-hero-wrapper">
    <div class="a6-hero-content">
        <div class="a6-badge">Formação em Hardware e Sistemas Embarcados</div>
        <h1>O Código Precisa de um Cérebro. <br>Aprenda a <span class="font-accent" style="font-size:1.2em;">Criá-lo.</span></h1>
        <p>Domine o hardware por trás da Inteligência Artificial, Automação Industrial e Internet das Coisas. O curso técnico de Eletrônica mais sofisticado de Carajás.</p>
    </div>
</div>

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
        <p>Mão na Massa</p>
    </div>
</div>

<section class="a6-section" id="diferenciais">
    <h2 class="a6-title">Ecossistema de Aprendizado</h2>
    <div class="a6-diff-grid">
        <div class="a6-diff-card">
            <img src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop" alt="Osciloscópio na bancada">
            <div class="a6-diff-content">
                <h4>Estrutura Profissional</h4>
                <p>Bancadas equipadas com osciloscópios digitais, fontes assimétricas e estações de retrabalho de última geração.</p>
            </div>
        </div>
        <div class="a6-diff-card">
            <img src="https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=800&auto=format&fit=crop" alt="Placa Microcontroladora">
            <div class="a6-diff-content">
                <h4>Sistemas Embarcados</h4>
                <p>Programe o "cérebro" das máquinas usando Arduino, ESP32 e C/C++ voltado puramente para controle de hardware.</p>
            </div>
        </div>
        <div class="a6-diff-card">
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop" alt="Soldagem de componente">
            <div class="a6-diff-content">
                <h4>Reparo em Nível Componente</h4>
                <p>Especialização cirúrgica em diagnóstico de falhas em placas multicamadas e ressoldagem de microcomponentes.</p>
            </div>
        </div>
    </div>
</section>

<section class="a6-section" id="grade">
    <h2 class="a6-title">Trilha de Especialização</h2>
    <div class="a6-modules-grid">
        <div class="a6-pill">
            <div class="a6-pill-num">1</div>
            <h4>Fundamentos Analógicos (Transistores e MOSFETs)</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">2</div>
            <h4>Sistemas Digitais e Lógica Booleana</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">3</div>
            <h4>Linguagem C e Programação de Microcontroladores</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">4</div>
            <h4>Projetos Práticos de Automação IoT (Wi-Fi e Bluetooth)</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">5</div>
            <h4>Leitura de Esquemáticos Complexos</h4>
        </div>
        <div class="a6-pill">
            <div class="a6-pill-num">6</div>
            <h4>Instrumentação e Troubleshooting</h4>
        </div>
    </div>
</section>

<footer class="a6-footer">
    <p>&copy; <?= date('Y') ?> Centro Universitário Sophie Link. <a href="../index.php">RETORNAR À PLATAFORMA</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
