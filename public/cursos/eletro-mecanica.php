<?php
// Eletromecânica — Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Técnico em Eletromecânica | Sophie Link</title>
    <meta name="description" content="Curso de Técnico em Eletromecânica. Domine mecânica e elétrica na indústria pesada.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚙️</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/em-page.css?v=3">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="em-nav">
    <a href="../index.php" class="em-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="em-nav-links">
        <a href="../index.php">INÍCIO</a>
        <a href="#modulos">MÓDULOS</a>
        <a href="#specs">COMPETÊNCIAS</a>
    </div>
    <a href="../index.php#fale-conosco" class="em-btn">MATRICULE-SE</a>
</nav>

<section class="em-hero">
    <div class="em-hero-left">
        <h1>Técnico em <span>Eletromecânica</span></h1>
        <p>A força mecânica não atua sem o controle elétrico. O mercado industrial pesado exige profissionais híbridos e completos, capazes de solucionar falhas conjuntas de forma rápida e eficiente.</p>
        <div style="margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#modulos" class="em-btn">Grade Curricular</a>
            <a href="../index.php#fale-conosco" class="em-btn em-btn-outline">Inscrever-se</a>
        </div>
    </div>
    <div class="em-hero-right">
        <div class="gear-animation">
            <i data-lucide="settings" class="gear-1" style="width:200px; height:200px;"></i>
            <i data-lucide="settings" class="gear-2" style="width:120px; height:120px;"></i>
        </div>
    </div>
</section>

<section class="em-section" id="modulos">
    <h2 class="em-title">Arquitetura de Formação</h2>
    <div class="em-grid">
        <div class="em-card">
            <div class="em-card-icon"><i data-lucide="wrench" style="width:40px;height:40px;"></i></div>
            <h3>Mecânica de Manutenção</h3>
            <p>Ajustagem, metrologia, lubrificação industrial, alinhamento de eixos, troca de rolamentos e manutenção de redutores pesados.</p>
        </div>
        <div class="em-card">
            <div class="em-card-icon"><i data-lucide="zap" style="width:40px;height:40px;"></i></div>
            <h3>Eletricidade Industrial</h3>
            <p>Circuitos elétricos, diagramas unifilares, motores de indução trifásicos, contatores e montagem de quadros de comando.</p>
        </div>
        <div class="em-card">
            <div class="em-card-icon"><i data-lucide="droplets" style="width:40px;height:40px;"></i></div>
            <h3>Sistemas Fluídicos</h3>
            <p>Acionamentos hidráulicos e pneumáticos. Leitura de esquemas de válvulas, bombas, cilindros e compressores industriais.</p>
        </div>
        <div class="em-card">
            <div class="em-card-icon"><i data-lucide="cpu" style="width:40px;height:40px;"></i></div>
            <h3>Automação & CLP</h3>
            <p>Introdução a Controladores Lógicos Programáveis. Entenda como sensores elétricos e código controlam atuadores mecânicos.</p>
        </div>
    </div>
</section>

<section class="em-specs-section" id="specs">
    <h2 class="em-title">O Perfil Híbrido</h2>
    <div class="em-spec-grid">
        <div class="em-spec-col">
            <h4><i data-lucide="settings"></i> Eixo Mecânico</h4>
            <ul class="em-spec-list">
                <li>Leitura de Desenho Técnico Mecânico Avançado</li>
                <li>Uso de Paquímetro, Micrômetro e Relógio Comparador</li>
                <li>Soldagem Básica (Eletrodo Revestido / MIG)</li>
                <li>Técnicas de Desmontagem de Conjuntos Industriais</li>
            </ul>
        </div>
        <div class="em-spec-col">
            <h4><i data-lucide="power"></i> Eixo Elétrico</h4>
            <ul class="em-spec-list">
                <li>Multímetro, Alicate Amperímetro e Megômetro</li>
                <li>Partidas Direta, Estrela-Triângulo e Inversores</li>
                <li>Fechamento de Motores de 6, 9 e 12 Terminais</li>
                <li>NR-10 (Segurança em Instalações Elétricas)</li>
            </ul>
        </div>
    </div>
</section>

<footer class="em-footer">
    <h3 style="font-family:var(--font-heading);font-size:2.5rem;color:#FFF;margin-bottom:1rem;text-transform:uppercase;">O Profissional do futuro é Híbrido</h3>
    <p style="color:var(--em-metal);">Sophie Link &copy; <?= date('Y') ?></p>
    <br>
    <a href="../index.php" style="color:var(--em-orange);text-decoration:none;font-weight:bold;font-size:1.2rem;">VOLTAR AO INÍCIO</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
