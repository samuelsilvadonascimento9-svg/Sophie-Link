<?php
// Eletromecânica — Sophie Link (Design Web Sênior)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Eletromecânica | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚙️</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/em-page.css?v=6">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a3-header">
    <div class="a3-hd-left">
        <a href="../index.php" class="a3-logo">
            <img src="../assets/images/logoNome.png" alt="Sophie Link">
        </a>
    </div>
    <div class="a3-hd-right">
        <nav class="a3-nav">
            <a href="#diferenciais">Laboratórios</a>
            <a href="#grade">Disciplinas</a>
        </nav>
        <a href="../index.php#fale-conosco" class="a3-btn">Garantir Vaga</a>
    </div>
</header>

<section class="a3-hero">
    <div class="a3-hero-left">
        <span class="font-accent">A espinha dorsal da indústria</span>
        <h1>Onde a Mecânica <br>encontra a <span>Energia</span>.</h1>
        <p>Projete, instale e mantenha os sistemas que movem o setor de mineração em Carajás. Torne-se o profissional mais versátil e requisitado do mercado industrial.</p>
        
        <div class="a3-stats-inline">
            <div class="a3-stat-item">
                <h3>1.200h</h3>
                <p>Carga Horária</p>
            </div>
            <div class="a3-stat-item">
                <h3>CREA/CFT</h3>
                <p>Registro Profissional</p>
            </div>
        </div>
    </div>
    
    <div class="a3-hero-right">
        <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop" alt="Engenheiro trabalhando em equipamento mecânico">
    </div>
</section>

<section class="a3-section" id="diferenciais">
    <h2 class="a3-title">Formação Robusta</h2>
    <div class="a3-table-grid">
        <div class="a3-table-cell">
            <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop" alt="Torno Mecânico">
            <div class="a3-cell-body">
                <h3>Usinagem e Torneamento</h3>
                <p>Aprenda a operar tornos, fresas e centros de usinagem CNC para fabricação de peças de reposição críticas para a indústria.</p>
            </div>
        </div>
        <div class="a3-table-cell">
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop" alt="Soldador em ação">
            <div class="a3-cell-body">
                <h3>Soldagem Industrial</h3>
                <p>Domine processos MIG/MAG, TIG e Eletrodo Revestido com equipamentos de solda profissionais no nosso laboratório prático.</p>
            </div>
        </div>
        <div class="a3-table-cell">
            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop" alt="Painel Elétrico">
            <div class="a3-cell-body">
                <h3>Eletrotécnica e Automação</h3>
                <p>Montagem de quadros de comando, instalação de CLPs, motores de alta potência e inversores de frequência.</p>
            </div>
        </div>
        <div class="a3-table-cell">
            <img src="https://images.unsplash.com/photo-1565515268482-1c2ce1030e46?q=80&w=800&auto=format&fit=crop" alt="Sistemas Hidráulicos">
            <div class="a3-cell-body">
                <h3>Hidráulica e Pneumática</h3>
                <p>Desenho e reparo de sistemas de fluidos sob pressão presentes em escavadeiras, britadores e esteiras transportadoras.</p>
            </div>
        </div>
    </div>
</section>

<section class="a3-section" id="grade" style="background:#fff; border-top: 1px solid #e2e8f0; padding-top: 80px;">
    <h2 class="a3-title" style="margin-bottom: 40px;">Matriz Curricular</h2>
    <div class="a3-accordion">
        <div class="a3-acc-item">
            <div class="a3-acc-header">Eixo Mecânico</div>
            <div class="a3-acc-body">
                <p>Metrologia dimensional, Desenho Técnico (AutoCAD/SolidWorks), Elementos de Máquinas, Tecnologia dos Materiais, Lubrificação Industrial, Usinagem e Soldagem.</p>
            </div>
        </div>
        <div class="a3-acc-item">
            <div class="a3-acc-header">Eixo Elétrico e Controle</div>
            <div class="a3-acc-body">
                <p>Eletricidade Básica, Instalações Elétricas Industriais, Comandos Elétricos, Máquinas Elétricas (Motores e Transformadores), Eletrônica Analógica e Digital.</p>
            </div>
        </div>
        <div class="a3-acc-item">
            <div class="a3-acc-header">Eixo de Manutenção Integrada</div>
            <div class="a3-acc-body">
                <p>Manutenção Centrada em Confiabilidade (RCM), Pneumática e Hidráulica Aplicada, Controladores Lógicos Programáveis (CLP) e Projetos Eletromecânicos.</p>
            </div>
        </div>
    </div>
</section>

<footer class="a3-footer">
    <div class="a3-ft-left">
        <p>Sophie Link &copy; <?= date('Y') ?></p>
    </div>
    <div class="a3-ft-right">
        <p>Centro Técnico Profissionalizante. <a href="../index.php">Retornar à página inicial.</a></p>
    </div>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>
