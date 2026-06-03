<?php
// Eletromecânica — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eletromecânica | Sophie Link</title>
    <meta name="description" content="Curso de Eletromecânica na Sophie Link. O profissional mais versátil da indústria.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚙️</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/em-page.css?v=2">
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
        <a href="#modulos">SISTEMA</a>
        <a href="#specs">COMPETÊNCIAS</a>
    </div>
    <a href="../index.php#fale-conosco" class="em-btn">MATRICULE-SE</a>
</nav>

<section class="em-hero">
    <div class="em-hero-left">
        <h1><span class="mech">Eletro</span><span class="elec">mecânica</span></h1>
        <p>A força mecânica não atua sem o controle elétrico. O mercado industrial de Parauapebas exige profissionais completos que resolvam os dois problemas de uma vez só.</p>
        <div style="margin-top: 2rem;">
            <a href="#modulos" class="em-btn" style="margin-right:1rem; background:var(--em-primary);">VER CONTEÚDO</a>
            <a href="../index.php#fale-conosco" class="em-btn" style="background:transparent; border:2px solid var(--em-secondary); color:var(--em-secondary)!important; box-shadow:none;">INSCRIÇÃO</a>
        </div>
    </div>
    <div class="em-hero-right">
        <div class="em-hybrid-core">
            <i data-lucide="settings" style="width:100px; height:100px; color:#FFF; position:absolute; animation:spin 10s linear infinite;"></i>
            <i data-lucide="zap" style="width:50px; height:50px; color:var(--em-secondary); z-index:2;"></i>
            <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
        </div>
    </div>
</section>

<section class="em-section" id="modulos">
    <h2 class="em-title">Arquitetura de Formação</h2>
    <div class="em-grid">
        <div class="em-card type-mech">
            <i data-lucide="wrench"></i>
            <h3>Mecânica de Manutenção</h3>
            <p>Ajustagem, metrologia, lubrificação industrial, alinhamento de eixos, troca de rolamentos e manutenção de redutores mecânicos pesados.</p>
        </div>
        <div class="em-card type-elec">
            <i data-lucide="zap"></i>
            <h3>Eletricidade Industrial</h3>
            <p>Circuitos elétricos, diagramas unifilares, motores de indução e montagem de quadros de comando.</p>
        </div>
        <div class="em-card type-hybrid">
            <i data-lucide="droplets"></i>
            <h3>Sistemas Fluídicos</h3>
            <p>Acionamentos hidráulicos e pneumáticos. Leitura de esquemas de válvulas, cilindros e compressores industriais.</p>
        </div>
        <div class="em-card type-hybrid">
            <i data-lucide="cpu"></i>
            <h3>Automação & CLP</h3>
            <p>Introdução a Controladores Lógicos Programáveis (CLP). Como sensores elétricos controlam atuadores mecânicos.</p>
        </div>
    </div>
</section>

<section class="em-specs-section" id="specs">
    <h2 class="em-title">O Perfil Híbrido</h2>
    <div class="em-spec-grid">
        <div class="em-spec-col mech">
            <h4><i data-lucide="cog"></i> Eixo Mecânico</h4>
            <ul class="em-spec-list">
                <li>Leitura de Desenho Técnico Mecânico Avançado</li>
                <li>Uso de Paquímetro, Micrômetro e Relógio Comparador</li>
                <li>Soldagem Básica (Eletrodo Revestido / MIG)</li>
                <li>Técnicas de Desmontagem de Conjuntos Industriais</li>
            </ul>
        </div>
        <div class="em-spec-col elec">
            <h4><i data-lucide="power"></i> Eixo Elétrico</h4>
            <ul class="em-spec-list">
                <li>Multímetro, Alicate Amperímetro e Megômetro</li>
                <li>Partida Direta, Estrela-Triângulo e Inversores</li>
                <li>Fechamento de Motores de 6, 9 e 12 Terminais</li>
                <li>NR-10 (Segurança em Instalações Elétricas)</li>
            </ul>
        </div>
    </div>
</section>

<footer class="em-footer">
    <h3 style="font-family:var(--font-heading);font-size:2rem;color:#FFF;margin-bottom:1rem;">O PROFISSIONAL DO FUTURO É HÍBRIDO</h3>
    <p>Sophie Link &copy; <?= date('Y') ?></p>
    <br>
    <a href="../index.php" style="color:var(--em-primary);text-decoration:none;font-weight:bold;">VOLTAR AO PORTAL</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
