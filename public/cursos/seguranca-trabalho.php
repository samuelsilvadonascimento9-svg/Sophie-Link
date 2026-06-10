<?php
// Segurança do Trabalho — Sophie Link (Design Web Sênior)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Segurança do Trabalho | Sophie Link</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦺</text></svg>">
    <link rel="stylesheet" href="../assets/css/cursos/seg-page.css?v=6">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<header class="a5-header">
    <a href="../index.php" class="a5-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <nav class="a5-nav">
        <a href="#diferenciais">Eixos Práticos</a>
        <a href="#grade">Disciplinas</a>
        <a href="../index.php#fale-conosco">Matricule-se</a>
    </nav>
</header>

<section class="a5-hero">
    <div class="a5-hero-text">
        <span class="font-accent">A maior autoridade da obra</span>
        <h1>Protegendo Vidas <br>na Linha de Frente.</h1>
        <p>Aprenda a mapear riscos, emitir laudos técnicos e garantir que o maior ativo de qualquer empresa de Carajás retorne para casa em segurança todos os dias.</p>
        <a href="../index.php#fale-conosco" class="a5-btn">Ver Inscrições</a>
    </div>
    <div class="a5-hero-photo">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop" alt="Inspetor de Segurança do Trabalho com capacete">
        <div class="a5-hero-deco"></div>
    </div>
</section>

<div class="a5-stats">
    <div class="a5-stat-block">
        <h3>PGR</h3>
        <p>Gestão de Riscos</p>
    </div>
    <div class="a5-stat-block">
        <h3>MTE</h3>
        <p>Registro Legal</p>
    </div>
    <div class="a5-stat-block">
        <h3>1.200h</h3>
        <p>Carga Horária</p>
    </div>
</div>

<section class="a5-section" id="diferenciais">
    <h2 class="a5-title">Eixos de Atuação Prática</h2>
    <div class="a5-check-list">
        <div class="a5-check-item">
            <img src="https://images.unsplash.com/photo-1541888087644-325514b8f041?q=80&w=800&auto=format&fit=crop" alt="Auditoria no canteiro de obras">
            <div class="a5-check-content">
                <h4>Inspeção Rigorosa de Áreas</h4>
                <p>Auditorias em canteiros de obras e pátios industriais em busca de potenciais riscos de acidentes, uso incorreto de EPIs e não-conformidades com a legislação.</p>
            </div>
        </div>
        <div class="a5-check-item">
            <img src="https://images.unsplash.com/photo-1584036533827-45bce166ad94?q=80&w=800&auto=format&fit=crop" alt="Treinamento de Primeiros Socorros">
            <div class="a5-check-content">
                <h4>Primeiros Socorros Avançados</h4>
                <p>Treinamento tático intenso em RCP, uso de desfibrilador (DEA), imobilização e protocolo de emergência para resposta rápida no local de trabalho.</p>
            </div>
        </div>
        <div class="a5-check-item">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop" alt="Documentação técnica">
            <div class="a5-check-content">
                <h4>Documentação Legal e Laudos</h4>
                <p>Ensino completo para a elaboração técnica de PGR, PCMSO, LTCAT e emissão rigorosa de permissões de trabalho (PT) de risco.</p>
            </div>
        </div>
        <div class="a5-check-item">
            <img src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=800&auto=format&fit=crop" alt="Treinamento de Brigada de Incêndio">
            <div class="a5-check-content">
                <h4>Prevenção de Incêndios</h4>
                <p>Gestão de sistemas de combate a incêndio, formação de brigadas de emergência industriais e elaboração de planos de abandono de área.</p>
            </div>
        </div>
    </div>
</section>

<section class="a5-section" id="grade" style="background:#fff; border-top: 1px solid #e4e4e7;">
    <h2 class="a5-title">Evolução do Curso</h2>
    <div class="a5-timeline">
        <div class="a5-tl-item">
            <h4>Higiene Ocupacional e Instrumentação</h4>
            <p>Uso prático de dosímetros, luxímetros e medidores de stress térmico (IBUTG) para elaboração de laudos de insalubridade e periculosidade no ambiente de trabalho.</p>
        </div>
        <div class="a5-tl-item">
            <h4>Normas Regulamentadoras (NRs) Específicas</h4>
            <p>Mergulho profundo na legislação: NR-35 (Trabalho em Altura), NR-33 (Espaço Confinado) e NR-10 (Eletricidade), incluindo o dimensionamento de linhas de vida e trava-quedas.</p>
        </div>
        <div class="a5-tl-item">
            <h4>Gestão de SST e Ergonomia</h4>
            <p>Análise Ergonômica do Trabalho (AET), implementação e gestão da CIPA, e organização do SESMT (Serviço Especializado em Engenharia de Segurança e em Medicina do Trabalho).</p>
        </div>
        <div class="a5-tl-item">
            <h4>e-Social e Legislação Previdenciária</h4>
            <p>Encerramento do curso focando na emissão de Comunicação de Acidente de Trabalho (CAT), defesa de passivos trabalhistas e envio de eventos de SST para o governo federal.</p>
        </div>
    </div>
</section>

<footer class="a5-footer">
    <p>Centro Universitário Sophie Link &copy; <?= date('Y') ?></p>
    <p><a href="../index.php">Retornar à página inicial</a></p>
</footer>

<script>lucide.createIcons();</script>
</body>
</html>