<?php
// Elétrica Industrial — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elétrica Industrial | Sophie Link</title>
    <meta name="description" content="Curso de Elétrica Industrial na Sophie Link. Alta tensão e painéis de comando.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/elec-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="elec-nav">
    <a href="../index.php" class="elec-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="elec-nav-links">
        <a href="../index.php">HOME</a>
        <a href="#modulos">CIRCUITOS</a>
        <a href="#skills">POTÊNCIA</a>
    </div>
    <a href="../index.php#fale-conosco" class="elec-btn">CONECTAR_AGORA()</a>
</nav>

<section class="elec-hero">
    <div class="elec-hero-content">
        <h1>Elétrica <span>Industrial</span></h1>
        <p>A energia que move motores de milhares de cavalos e plantas de mineração inteiras passa pelas mãos do eletricista industrial. Torne-se o especialista que a indústria não pode ficar sem.</p>
        <a href="#modulos" class="elec-btn" style="margin-top: 1rem;">VERIFICAR CARGA</a>
    </div>
    
    <div class="elec-panel-box">
        <div style="color:var(--elec-danger); font-family:var(--font-heading); font-size:1.5rem; margin-bottom:1rem; text-align:center;">DANGER: HIGH VOLTAGE</div>
        
        <div class="elec-meter">
            <div class="elec-meter-label"><span>Tensão Máxima</span><span class="elec-meter-val">13.8 kV</span></div>
            <div class="elec-meter-bar"><div class="elec-meter-fill" style="width: 85%;"></div></div>
        </div>
        <div class="elec-meter">
            <div class="elec-meter-label"><span>Potência Instalada</span><span class="elec-meter-val">MVA</span></div>
            <div class="elec-meter-bar"><div class="elec-meter-fill" style="width: 60%; background:var(--elec-neon); box-shadow:0 0 10px var(--elec-neon);"></div></div>
        </div>
        <div class="elec-meter">
            <div class="elec-meter-label"><span>Empregabilidade</span><span class="elec-meter-val">96%</span></div>
            <div class="elec-meter-bar"><div class="elec-meter-fill" style="width: 96%; background:#0F0; box-shadow:0 0 10px #0F0;"></div></div>
        </div>
    </div>
</section>

<section class="elec-section" id="modulos">
    <h2 class="elec-title"><i data-lucide="zap"></i> Diagrama Unifilar (Módulos)</h2>
    <div class="elec-matrix">
        <div class="elec-card">
            <i data-lucide="cpu"></i>
            <h3>Comandos Elétricos</h3>
            <p>Montagem e manutenção de painéis de comando, contatores, relés térmicos e chaves de partida (Estrela-Triângulo, Compensadora).</p>
        </div>
        <div class="elec-card">
            <i data-lucide="activity"></i>
            <h3>Máquinas Elétricas</h3>
            <p>Funcionamento, fechamento de bobinas e manutenção de motores de indução trifásicos, geradores e transformadores.</p>
        </div>
        <div class="elec-card">
            <i data-lucide="power"></i>
            <h3>Instalações Industriais</h3>
            <p>Dimensionamento de cabos, disjuntores, eletrocalhas e cálculo de demanda de grandes plantas industriais.</p>
        </div>
        <div class="elec-card">
            <i data-lucide="shield-alert"></i>
            <h3>NR-10 e SEP</h3>
            <p>Segurança em Instalações e Serviços em Eletricidade. Formação completa para intervenção em Sistemas Elétricos de Potência.</p>
        </div>
    </div>
</section>

<section class="elec-section" id="skills">
    <h2 class="elec-title"><i data-lucide="settings"></i> Especificações de Operação</h2>
    <table class="elec-specs-table">
        <thead>
            <tr>
                <th>Componente de Habilidade</th>
                <th>Descrição Técnica</th>
                <th>Demanda de Mercado</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Leitura de Diagramas</strong></td>
                <td>Interpretação de projetos elétricos multifilares e unifilares industriais.</td>
                <td style="color:var(--elec-neon);">CRÍTICA</td>
            </tr>
            <tr>
                <td><strong>Soft Starters & Inversores</strong></td>
                <td>Parametrização de inversores de frequência e chaves de partida suave.</td>
                <td style="color:var(--elec-neon);">ALTA</td>
            </tr>
            <tr>
                <td><strong>Correção de Fator de Potência</strong></td>
                <td>Dimensionamento e instalação de bancos de capacitores industriais.</td>
                <td style="color:var(--elec-energy);">MÉDIA/ALTA</td>
            </tr>
            <tr>
                <td><strong>Manutenção Preditiva</strong></td>
                <td>Análise termográfica de painéis e medição de isolação (Megômetro).</td>
                <td style="color:var(--elec-neon);">CRÍTICA</td>
            </tr>
        </tbody>
    </table>
</section>

<footer class="elec-footer">
    <h2>SYSTEM OFFLINE.</h2>
    <p>Sophie Link <span>//</span> Centro Técnico Profissionalizante</p>
    <a href="../index.php" class="elec-btn" style="margin-top: 1.5rem;">REINICIAR SISTEMA (HOME)</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
