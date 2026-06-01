<?php
// ava.php — Ambiente Virtual de Aprendizagem | Sophie Link (Estilo Brightspace)
session_start();

require_once '../../includes/auth.php';
protect_page(['aluno', 'professor', 'admin']);

require_once '../../includes/db.php';

// Busca o aluno logado
$stmtAluno = $pdo->prepare("SELECT a.* FROM aprendizes a 
                            JOIN usuarios u ON u.email = a.email OR u.nome = a.nome
                            WHERE u.id = ? LIMIT 1");
$stmtAluno->execute([$_SESSION['usuario_id']]);
$aluno = $stmtAluno->fetch();

if (!$aluno) {
    // aluno fallback para testes
    $aluno = [
        'id' => 1,
        'nome' => $_SESSION['usuario_nome'] ?? 'Aluno'
    ];
}

$aluno_id = $aluno['id'];
$_SESSION['usuario_nome'] = $aluno['nome'];
$nomeAluno = $aluno['nome'];
$primeiroNome = explode(' ', $nomeAluno)[0];
$ra = str_pad($aluno['id'], 6, '0', STR_PAD_LEFT);

// Simular progresso baseado na nota lançada no bd
$stmtNotas = $pdo->prepare("SELECT atividade, valor_nota FROM notas WHERE aprendiz_id = ?");
$stmtNotas->execute([$aluno_id]);
$notasDb = $stmtNotas->fetchAll();
$progressoTotal = count($notasDb) > 0 ? min(100, count($notasDb) * 33) : 10;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AVA — Centro Técnico Sophie Link</title>
    <meta name="description" content="Ambiente Virtual de Aprendizagem do Centro Técnico Profissionalizante Sophie Link.">
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="../assets/css/ava.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>

<!-- ================================================================
     TOP NAVBAR
     ================================================================ -->
<nav class="topnav">
    <a href="../index.php" class="tn-logo" style="gap: 8px;">
        <img src="../assets/images/logo_hd.png" alt="Sophie Link Logo" style="height: 38px; object-fit: contain;">
        <div class="tn-logo-text">
            <div class="tn-logo-name">SOPHIE LINK</div>
            <div class="tn-logo-sub">Centro Técnico Profissionalizante</div>
        </div>
    </a>

    <div class="tn-divider"></div>
    <div class="tn-site-name">Câmpus Virtual — AVA</div>

    <div class="tn-spacer"></div>

    <div class="tn-icons">
        <button class="tn-icon-btn" title="Apps">
            <i data-lucide="layout-grid"></i>
        </button>
        <button class="tn-icon-btn" title="Mensagens">
            <i data-lucide="mail"></i>
            <span class="tn-badge">2</span>
        </button>
        <button class="tn-icon-btn" title="Chat">
            <i data-lucide="message-circle"></i>
        </button>
        <button class="tn-icon-btn" title="Notificações">
            <i data-lucide="bell"></i>
            <span class="tn-badge">3</span>
        </button>
    </div>

    <div style="width:1px;background:var(--c-border);height:28px;margin:0 8px;"></div>

    <div class="tn-user">
        <div class="tn-avatar"><?= strtoupper(substr($nomeAluno, 0, 2)) ?></div>
        <div class="tn-user-name"><?= strtoupper(htmlspecialchars($nomeAluno)) ?></div>
    </div>

    <a href="../index.php" class="tn-settings" title="Sair / Configurações">
        <i data-lucide="settings"></i>
    </a>
</nav>

<!-- ================================================================
     SUB-NAVBAR
     ================================================================ -->
<div class="subnav">
    <a href="../index.php" class="subnav-link"><i data-lucide="home"></i> Início</a>
    <div class="subnav-sep"></div>
    <a href="portal_aluno.php" class="subnav-link">Portal do Aluno</a>
    <div class="subnav-sep"></div>
    <span class="subnav-link active"><i data-lucide="book-open"></i> Meus Cursos</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('calendario')">Calendário</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('notas')">Notas</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('mensagens')">Mensagens</span>
</div>

<!-- ================================================================
     HERO BANNER
     ================================================================ -->
<div class="hero">
    <img src="../assets/images/ava_hero.png" alt="Campus Sophie Link" loading="eager">
    <div class="hero-overlay">
        <div class="hero-greeting">Olá, <?= strtoupper(htmlspecialchars($nomeAluno)) ?></div>
    </div>
</div>

<!-- ================================================================
     CONTEÚDO PRINCIPAL — HOME
     ================================================================ -->
<div id="sec-home" class="page-section active">
<div class="page-wrap">
    <div class="main-grid">

        <!-- ======================== COLUNA ESQUERDA ======================== -->
        <div>

            <!-- MEUS CURSOS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="book-open" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Meus cursos
                    </div>
                    <span class="panel-title-more">Filtrar ▾</span>
                </div>

                <div class="courses-grid">

                    <!-- Curso 1 -->
                    <a href="#" class="course-card" onclick="openCourse(event,'eletro')">
                        <img class="cc-thumb" src="../assets/images/ava_eletro.png" alt="Manutenção Eletromecânica">
                        <div class="cc-body">
                            <div class="cc-title">Manutenção Eletromecânica I</div>
                            <div class="cc-code">MEC-101 &bull; Turma A</div>
                            <div class="cc-status">
                                <div class="cc-dot cc-dot-green"></div>
                                Em Curso
                            </div>
                            <div class="cc-footer">Encerra em junho 18, 2026 às 23:59</div>
                        </div>
                    </a>

                    <!-- Curso 2 -->
                    <a href="#" class="course-card" onclick="openCourse(event,'qualidade')">
                        <img class="cc-thumb" src="../assets/images/ava_qualidade.png" alt="Gestão da Qualidade">
                        <div class="cc-body">
                            <div class="cc-title">Gestão da Qualidade (ISO 9001)</div>
                            <div class="cc-code">GQ-201 &bull; Turma B</div>
                            <div class="cc-status">
                                <div class="cc-dot cc-dot-green"></div>
                                Em Curso
                            </div>
                            <div class="cc-footer">Encerra em junho 18, 2026 às 23:59</div>
                        </div>
                    </a>

                    <!-- Curso 3 -->
                    <a href="#" class="course-card" onclick="openCourse(event,'seguranca')">
                        <img class="cc-thumb" src="../assets/images/ava_seguranca.png" alt="Saúde e Segurança">
                        <div class="cc-body">
                            <div class="cc-title">Saúde e Segurança do Trabalho (Mineração)</div>
                            <div class="cc-code">SST-301 &bull; Turma A</div>
                            <div class="cc-status">
                                <div class="cc-dot cc-dot-amber"></div>
                                Atenção — Freq. 72%
                            </div>
                            <div class="cc-footer">Encerra em junho 18, 2026 às 23:59</div>
                        </div>
                    </a>

                    <!-- Curso 4 -->
                    <a href="#" class="course-card" onclick="openCourse(event,'logistica')">
                        <img class="cc-thumb" src="../assets/images/ava_logistica.png" alt="Logística">
                        <div class="cc-body">
                            <div class="cc-title">Logística Aplicada e Cadeia de Suprimentos</div>
                            <div class="cc-code">LOG-401 &bull; Turma A</div>
                            <div class="cc-status">
                                <div class="cc-dot cc-dot-gray"></div>
                                Iniciando
                            </div>
                            <div class="cc-footer">Encerra em agosto 30, 2026 às 23:59</div>
                        </div>
                    </a>

                </div>

                <div class="courses-footer">
                    <a href="#">Exibir Todos os Cursos (4)</a>
                </div>
            </div>

            <!-- TRABALHO PENDENTE -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="clipboard-list" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Trabalho pendente
                        <i data-lucide="chevron-down" style="width:13px;height:13px;color:var(--c-text-muted);"></i>
                    </div>
                </div>
                <div class="pending-body">

                    <!-- Grupo: Em Atraso -->
                    <div class="pending-group">
                        <div class="pending-group-head">
                            <div class="pending-group-title" style="color:var(--c-red);">⚠ Em Atraso</div>
                            <div class="pending-badge">1</div>
                        </div>
                        <div class="pending-item">
                            <div class="pending-icon" style="background:var(--c-red-lt);color:var(--c-red);">
                                <i data-lucide="file-x"></i>
                            </div>
                            <div class="pending-info">
                                <div class="pending-name">Questionário — Normas NR-22 (Mineração)</div>
                                <div class="pending-meta">Até 20 de mai &bull; Saúde e Segurança (Mineração)</div>
                            </div>
                        </div>
                    </div>

                    <div class="pending-divider"></div>

                    <!-- Grupo: 29 maio - 11 junho -->
                    <div class="pending-group">
                        <div class="pending-group-head">
                            <div class="pending-group-title">29 de maio – 11 de junho</div>
                            <div class="pending-badge">2</div>
                        </div>
                        <div class="pending-item">
                            <div class="pending-icon">
                                <i data-lucide="file-text"></i>
                            </div>
                            <div class="pending-info">
                                <div class="pending-name">Questionário — Lubrificação e Rolamentos</div>
                                <div class="pending-meta">Até 30 de mai &bull; Manutenção Eletromecânica I</div>
                            </div>
                        </div>
                        <div class="pending-item">
                            <div class="pending-icon">
                                <i data-lucide="file-text"></i>
                            </div>
                            <div class="pending-info">
                                <div class="pending-name">Estudo de Caso — Análise de Falha (Sotreq)</div>
                                <div class="pending-meta">Até 07 de jun &bull; Gestão da Qualidade</div>
                            </div>
                        </div>
                    </div>

                    <div class="pending-divider"></div>

                    <!-- Grupo: 11 - 30 junho -->
                    <div class="pending-group">
                        <div class="pending-group-head">
                            <div class="pending-group-title">11 – 30 de junho</div>
                            <div class="pending-badge">1</div>
                        </div>
                        <div class="pending-item">
                            <div class="pending-icon" style="background:var(--c-amber-lt);color:var(--c-amber);">
                                <i data-lucide="pen-line"></i>
                            </div>
                            <div class="pending-info">
                                <div class="pending-name">Avaliação Bimestral — Módulos 1 e 2</div>
                                <div class="pending-meta">Até 14 de jun &bull; Presencial &bull; Auditório Sophie Link</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div><!-- /col-esquerda -->

        <!-- ======================== COLUNA DIREITA ======================== -->
        <div>

            <!-- AVISOS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="megaphone" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Avisos
                    </div>
                </div>
                <div class="avisos-body">
                    <div class="aviso-carousel">
                        <div class="aviso-slide active">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title">📋 Folha de Ponto Semanal</div>
                                Lembre de assinar a folha de ponto na empresa todas as semanas. Faltas não justificadas impactam diretamente sua frequência escolar e podem levar ao desligamento do programa.
                            </div>
                        </div>
                        <div class="aviso-slide">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title">📅 Reposição de Aula — 03/06</div>
                                A aula do dia 22/05 (Eletromecânica I) foi reagendada para terça-feira, 03/06, das 14h às 17h30, no Laboratório 2. Presença obrigatória.
                            </div>
                        </div>
                        <div class="aviso-slide">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title">🎓 Avaliação Bimestral — 14/06</div>
                                A prova bimestral dos módulos 1 e 2 acontecerá no dia 14/06 (segunda-feira), das 08h às 12h, no Auditório Sophie Link. Estudem com antecedência!
                            </div>
                        </div>
                    </div>
                    <div class="aviso-nav">
                        <button class="aviso-btn" onclick="avisoNav(-1)"><i data-lucide="chevron-left"></i></button>
                        <div class="aviso-dots" id="aviso-dots">
                            <div class="aviso-dot active" onclick="avisoGo(0)"></div>
                            <div class="aviso-dot" onclick="avisoGo(1)"></div>
                            <div class="aviso-dot" onclick="avisoGo(2)"></div>
                        </div>
                        <button class="aviso-btn" onclick="avisoNav(1)"><i data-lucide="chevron-right"></i></button>
                    </div>
                </div>
            </div>

            <!-- PROGRESSO DOS MÓDULOS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="trending-up" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Progresso dos módulos
                    </div>
                </div>
                <div class="progress-list">
                    <?php if (count($notasDb) > 0): ?>
                        <?php foreach($notasDb as $idx => $nota): 
                            $cores = ['var(--c-brand)', '#8B5CF6', '#22C55E', '#3B82F6'];
                            $cor = $cores[$idx % count($cores)];
                            $perc = min(100, round($nota['valor_nota'] * 10)); // Simula percentual com base na nota
                        ?>
                        <div>
                            <div class="prog-item-name"><?= htmlspecialchars($nota['atividade']) ?> <span><?= $perc ?>%</span></div>
                            <div class="prog-bar"><div class="prog-fill" style="width:<?= $perc ?>%;background:<?= $cor ?>;"></div></div>
                        </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div style="font-size:0.8rem;color:var(--c-text-muted);">Nenhum progresso registrado ainda.</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- CALENDÁRIO -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="calendar" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Calendário
                        <i data-lucide="chevron-down" style="width:13px;height:13px;color:var(--c-text-muted);"></i>
                    </div>
                </div>

                <div class="cal-header-row" onclick="toggleCal()">
                    <span class="cal-date-text" id="cal-label">sexta-feira, 29 de maio de 2026</span>
                    <span class="cal-toggle"><i data-lucide="chevron-right" id="cal-chevron"></i></span>
                </div>

                <div id="cal-body" class="cal-body" style="display:none;">
                    <div class="cal-grid">
                        <div class="cal-dh">D</div><div class="cal-dh">S</div><div class="cal-dh">T</div>
                        <div class="cal-dh">Q</div><div class="cal-dh">Q</div><div class="cal-dh">S</div><div class="cal-dh">S</div>
                        <div class="cal-d other">27</div><div class="cal-d other">28</div><div class="cal-d other">29</div>
                        <div class="cal-d other">30</div><div class="cal-d other">1</div>
                        <div class="cal-d">2</div><div class="cal-d">3</div>
                        <div class="cal-d">4</div><div class="cal-d">5</div><div class="cal-d">6</div>
                        <div class="cal-d has-ev">7</div><div class="cal-d">8</div><div class="cal-d">9</div><div class="cal-d">10</div>
                        <div class="cal-d">11</div><div class="cal-d">12</div><div class="cal-d">13</div>
                        <div class="cal-d has-ev">14</div><div class="cal-d">15</div><div class="cal-d">16</div><div class="cal-d">17</div>
                        <div class="cal-d">18</div><div class="cal-d">19</div><div class="cal-d">20</div>
                        <div class="cal-d">21</div><div class="cal-d">22</div><div class="cal-d">23</div><div class="cal-d">24</div>
                        <div class="cal-d">25</div><div class="cal-d">26</div><div class="cal-d">27</div>
                        <div class="cal-d">28</div><div class="cal-d today">29</div><div class="cal-d">30</div><div class="cal-d">31</div>
                    </div>
                </div>

                <!-- PRÓXIMOS EVENTOS -->
                <div class="events-head" onclick="toggleEvents()">
                    <span class="events-title">Próximos eventos</span>
                    <i data-lucide="chevron-down" style="width:14px;height:14px;color:var(--c-text-muted);"></i>
                </div>
                <div id="events-list" class="events-list">
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">MAI</div>
                            <div class="event-day">30</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title">Questionário CLT — Vencimento</div>
                            <div class="event-time">23:59</div>
                            <div class="event-course">Manutenção Eletromecânica I</div>
                        </div>
                    </div>
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">JUN</div>
                            <div class="event-day">03</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title">Reposição de Aula — Eletromecânica</div>
                            <div class="event-time">14:00</div>
                            <div class="event-course">Laboratório 2 · Presencial</div>
                        </div>
                    </div>
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">JUN</div>
                            <div class="event-day">07</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title">Estudo de Caso — Entrega</div>
                            <div class="event-time">23:59</div>
                            <div class="event-course">Gestão da Qualidade · Vencimento</div>
                        </div>
                    </div>
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">JUN</div>
                            <div class="event-day">14</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title" style="color:var(--c-accent);">AVALIAÇÃO BIMESTRAL · Presencial</div>
                            <div class="event-time">08:00</div>
                            <div class="event-course">Auditório Sophie Link · Módulos 1 e 2</div>
                        </div>
                    </div>
                </div>

            </div><!-- /calendário panel -->

        </div><!-- /col-direita -->

    </div><!-- /main-grid -->
</div><!-- /page-wrap -->
</div><!-- /sec-home -->


<!-- ================================================================
     SEÇÃO: CONTEÚDO DO CURSO (abre ao clicar no card)
     ================================================================ -->
<div id="sec-curso" class="page-section">
<div class="page-wrap" style="max-width: 960px;">
    <button onclick="closeCourse()" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-brand)';this.style.color='var(--c-brand)'" onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-muted)'">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar aos cursos
    </button>

    <div class="panel" id="curso-content">
        <!-- Conteúdo dinâmico do curso -->
    </div>
</div>
</div>


<!-- ================================================================
     SEÇÃO: NOTAS
     ================================================================ -->
<div id="sec-notas" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-brand)';this.style.color='var(--c-brand)'" onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-muted)'">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="bar-chart-2" style="width:15px;height:15px;color:var(--c-brand);"></i> Boletim 2026/1</div></div>
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:1px solid var(--c-border);">
                <th style="text-align:left;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Disciplina</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Nota 1</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Nota 2</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Média</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Faltas</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Situação</th>
            </tr></thead>
            <tbody>
                <?php $notas = [['Manutenção Eletromecânica I','8.0','9.0','8.5','2','green','Aprovado'],['Gestão da Qualidade','9.0','9.0','9.0','0','green','Aprovado'],['Saúde e Segurança (Mineração)','6.0','7.0','6.5','4','amber','Recuperação'],['Logística Aplicada','—','—','—','0','gray','Em andamento']]; foreach ($notas as $n): ?>
                <tr style="border-bottom:1px solid var(--c-border-lt);transition:background 0.12s;" onmouseover="this.style.background='var(--c-bg)'" onmouseout="this.style.background='transparent'">
                    <td style="padding:11px 14px;font-size:0.82rem;font-weight:600;color:var(--c-text);"><?= $n[0] ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;"><?= $n[1] ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;"><?= $n[2] ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;font-weight:700;color:var(--c-<?= $n[5] == 'amber' ? 'amber' : ($n[5] == 'gray' ? 'text-muted' : 'green') ?>);"><?= $n[3] ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;"><?= $n[4] ?></td>
                    <td style="padding:11px 14px;text-align:center;">
                        <span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:0.65rem;font-weight:700;background:var(--c-<?= $n[5] ?>-lt);color:var(--c-<?= $n[5] == 'gray' ? 'text-muted' : $n[5] ?>);"><?= $n[6] ?></span>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>
</div>


<!-- ================================================================
     SEÇÃO: MENSAGENS
     ================================================================ -->
<div id="sec-mensagens" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-brand)';this.style.color='var(--c-brand)'" onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-muted)'">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="mail" style="width:15px;height:15px;color:var(--c-brand);"></i> Caixa de Entrada (3 novas)</div></div>
        <?php $msgs = [['Coordenação Sophie Link','Lembrete: avaliação bimestral em 14/06. Presença obrigatória no auditório.','Hoje, 10:30',true],['Prof. Carlos Menezes','Material de apoio para o Módulo 3 disponível no AVA. Acesse a seção Eletromecânica I.','Ontem, 14:00',true],['Programa Partilhar (Vale)','Atualização do relatório mensal de abril disponível para download na secretaria.','26/05',false]];
        foreach ($msgs as $m): ?>
        <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-bottom:1px solid var(--c-border-lt);transition:background 0.12s;cursor:pointer;<?= $m[3] ? 'background:var(--c-brand-lt);' : '' ?>" onmouseover="this.style.background='#f0f4f8'" onmouseout="this.style.background='<?= $m[3] ? "var(--c-brand-lt)" : "transparent" ?>'">
            <div style="width:36px;height:36px;border-radius:50%;background:<?= $m[3] ? 'var(--c-brand)' : '#ddd' ?>;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:<?= $m[3] ? '#fff' : '#777' ?>;flex-shrink:0;"><?= strtoupper(substr($m[0], 0, 1)) ?></div>
            <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                    <span style="font-size:0.78rem;font-weight:<?= $m[3] ? '700' : '600' ?>;color:var(--c-text);"><?= $m[0] ?></span>
                    <span style="font-size:0.65rem;color:var(--c-text-muted);"><?= $m[2] ?></span>
                </div>
                <div style="font-size:0.73rem;color:var(--c-text-muted);line-height:1.4;"><?= $m[1] ?></div>
            </div>
            <?php if ($m[3]): ?>
            <div style="width:8px;height:8px;border-radius:50%;background:var(--c-brand);flex-shrink:0;margin-top:6px;"></div>
            <?php endif; ?>
        </div>
        <?php endforeach; ?>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: CALENDÁRIO COMPLETO
     ================================================================ -->
<div id="sec-calendario" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="padding:1.5rem;">
        <div style="font-size:0.95rem;font-weight:700;color:var(--c-brand);margin-bottom:1rem;">Agenda de Eventos — Maio/Junho 2026</div>
        <?php $eventos = [['30','Mai','Questionário — Lubrificação','Manutenção Eletromecânica I · Entrega Online','warning'],['03','Jun','Reposição de Aula','Eletromecânica I · Laboratório 2, 14h-17h30','info'],['07','Jun','Estudo de Caso — Entrega','Gestão da Qualidade · Valendo nota','warning'],['14','Jun','Avaliação Bimestral','Módulos 1 e 2 · Auditório Sophie Link · 08h-12h','danger']]; foreach ($eventos as $e): ?>
        <div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--c-border-lt);">
            <div style="width:44px;text-align:center;flex-shrink:0;">
                <div style="font-size:0.6rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);"><?= $e[1] ?></div>
                <div style="font-size:1.4rem;font-weight:800;color:var(--c-accent);line-height:1;"><?= $e[0] ?></div>
            </div>
            <div style="padding-left:12px;border-left:3px solid <?= $e[4]==='danger' ? 'var(--c-red)' : ($e[4]==='warning' ? 'var(--c-amber)' : 'var(--c-brand)') ?>;">
                <div style="font-size:0.82rem;font-weight:700;color:var(--c-text);margin-bottom:3px;"><?= $e[2] ?></div>
                <div style="font-size:0.72rem;color:var(--c-text-muted);"><?= $e[3] ?></div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>
</div>


<script src="../assets/js/ava.js"></script>
</body>
</html>
