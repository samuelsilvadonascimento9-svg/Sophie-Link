<?php
// Elétrica Industrial — Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elétrica Industrial | Sophie Link</title>
    <meta name="description" content="Curso Técnico em Elétrica Industrial. Domine alta tensão, motores e comandos elétricos.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/elec-page.css?v=3">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="ei-nav">
    <a href="../index.php" class="ei-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="ei-nav-links">
        <a href="../index.php">HOME</a>
        <a href="#modulos">CIRCUITOS</a>
        <a href="#skills">POTÊNCIA</a>
    </div>
    <a href="../index.php#fale-conosco" class="ei-btn">CONECTAR_AGORA()</a>
</nav>

<section class="ei-hero">
    <div class="ei-hero-left">
        <h1>Elétrica <span>Industrial</span></h1>
        <p>A energia que move motores de milhares de cavalos e plantas de mineração inteiras passa pelas mãos do eletricista industrial. Torne-se o especialista que a indústria não pode ficar sem.</p>
        <a href="#modulos" class="ei-btn" style="margin-top: 1rem; display:inline-block;">VERIFICAR CARGA</a>
    </div>
    
    <div class="ei-hero-right">
        <div class="ei-panel-box">
            <div style="color:var(--ei-yellow); font-family:var(--font-heading); font-size:1.8rem; margin-bottom:1.5rem; text-align:center; letter-spacing: 2px;">DANGER: HIGH VOLTAGE</div>
            
            <div class="ei-meter">
                <div class="ei-meter-label"><span>Tensão Máxima</span><span class="ei-meter-val">13.8 kV</span></div>
                <div class="ei-meter-bar"><div class="ei-meter-fill" style="width: 85%;"></div></div>
            </div>
            <div class="ei-meter">
                <div class="ei-meter-label"><span>Potência Instalada</span><span class="ei-meter-val">MVA</span></div>
                <div class="ei-meter-bar"><div class="ei-meter-fill" style="width: 60%; background:var(--ei-yellow); box-shadow:0 0 10px var(--ei-yellow);"></div></div>
            </div>
            <div class="ei-meter">
                <div class="ei-meter-label"><span>Empregabilidade</span><span class="ei-meter-val">96%</span></div>
                <div class="ei-meter-bar"><div class="ei-meter-fill" style="width: 96%; background:#0f0; box-shadow:0 0 10px #0f0;"></div></div>
            </div>
        </div>
    </div>
</section>

<section class="ei-section" id="modulos">
    <h2 class="ei-title"><i data-lucide="zap"></i> Diagrama Unifilar (Módulos)</h2>
    <div class="ei-grid">
        <div class="ei-card">
            <i data-lucide="cpu"></i>
            <h3>Comandos Elétricos</h3>
            <p>Montagem e manutenção de painéis de comando, contatores, relés térmicos e chaves de partida (Estrela-Triângulo, Compensadora).</p>
        </div>
        <div class="ei-card">
            <i data-lucide="activity"></i>
            <h3>Máquinas Elétricas</h3>
            <p>Funcionamento, fechamento de bobinas e manutenção de motores de indução trifásicos, geradores e transformadores.</p>
        </div>
        <div class="ei-card">
            <i data-lucide="power"></i>
            <h3>Instalações Industriais</h3>
            <p>Dimensionamento de cabos, disjuntores, eletrocalhas e cálculo de demanda de grandes plantas industriais.</p>
        </div>
        <div class="ei-card">
            <i data-lucide="shield-alert"></i>
            <h3>NR-10 e SEP</h3>
            <p>Segurança em Instalações e Serviços em Eletricidade. Formação completa para intervenção em Sistemas Elétricos de Potência.</p>
        </div>
    </div>
</section>

<section class="ei-section" id="skills">
    <h2 class="ei-title"><i data-lucide="settings"></i> Especificações de Operação</h2>
    <div class="ei-table-container">
        <table class="ei-table">
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
                    <td style="color:var(--ei-cyan); font-weight:bold;">CRÍTICA</td>
                </tr>
                <tr>
                    <td><strong>Soft Starters & Inversores</strong></td>
                    <td>Parametrização de inversores de frequência e chaves de partida suave.</td>
                    <td style="color:var(--ei-cyan); font-weight:bold;">ALTA</td>
                </tr>
                <tr>
                    <td><strong>Correção de Fator de Potência</strong></td>
                    <td>Dimensionamento e instalação de bancos de capacitores industriais.</td>
                    <td style="color:var(--ei-yellow); font-weight:bold;">MÉDIA/ALTA</td>
                </tr>
                <tr>
                    <td><strong>Manutenção Preditiva</strong></td>
                    <td>Análise termográfica de painéis e medição de isolação (Megômetro).</td>
                    <td style="color:var(--ei-cyan); font-weight:bold;">CRÍTICA</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<footer class="ei-footer">
    <h2>SYSTEM OFFLINE.</h2>
    <p style="color: #64748b; margin-bottom: 2rem;">Sophie Link <span>//</span> Centro Técnico Profissionalizante</p>
    <a href="../index.php" class="ei-btn">REINICIAR SISTEMA (HOME)</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
