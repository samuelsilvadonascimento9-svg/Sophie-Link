<?php
// portal_aluno.php — Portal do Aluno | Centro Técnico Profissionalizante Sophie Link
session_start();

require_once '../../includes/auth.php';
protect_page(['aluno']);

require_once '../../includes/db.php';
/** @var PDO $pdo */

// Busca o aluno logado
$stmtAluno = $pdo->prepare("SELECT a.*, e.nome AS empresa_nome, t.nome AS turma_nome, c_curso.nome AS curso_nome, t.curso_id 
                          FROM aprendizes a 
                          LEFT JOIN turmas t ON t.id = a.turma_id
                          LEFT JOIN cursos c_curso ON c_curso.id = t.curso_id
                          LEFT JOIN contratos c ON a.id = c.aprendiz_id AND c.status = 'ativo'
                          LEFT JOIN empresas e ON c.empresa_id = e.id 
                          JOIN usuarios u ON u.email = a.email
                          WHERE u.id = ? LIMIT 1");
$stmtAluno->execute([$_SESSION['usuario_id']]);
$aluno = $stmtAluno->fetch();

if (!$aluno) {
    // Tenta pelo nome se o email não bater
    $stmtAluno = $pdo->prepare("SELECT a.*, e.nome AS empresa_nome, t.nome AS turma_nome, c_curso.nome AS curso_nome, t.curso_id 
                              FROM aprendizes a 
                              LEFT JOIN turmas t ON t.id = a.turma_id
                              LEFT JOIN cursos c_curso ON c_curso.id = t.curso_id
                              LEFT JOIN contratos c ON a.id = c.aprendiz_id AND c.status = 'ativo'
                              LEFT JOIN empresas e ON c.empresa_id = e.id 
                              JOIN usuarios u ON u.nome = a.nome
                              WHERE u.id = ? LIMIT 1");
    $stmtAluno->execute([$_SESSION['usuario_id']]);
    $aluno = $stmtAluno->fetch();
}

if (!$aluno) {
    // Cria aluno mock se o banco estiver vazio ou falhar no link
    $aluno = [
        'id' => 1,
        'nome' => $_SESSION['usuario_nome'],
        'curso' => 'Curso Genérico',
        'situacao_aluno' => 'cursando',
        'empresa_nome' => 'Nenhuma'
    ];
}

$aluno_id = $aluno['id'];

$_SESSION['usuario_nome'] = $aluno['nome'];
$_SESSION['usuario_tipo'] = 'aluno';

// Buscar Notas com Disciplina
$stmtNotas = $pdo->prepare("
    SELECT n.*, d.nome AS disciplina_nome 
    FROM notas n 
    LEFT JOIN disciplinas d ON d.id = n.disciplina_id
    WHERE n.aprendiz_id = ? 
    ORDER BY n.data_registro DESC
");
$stmtNotas->execute([$aluno_id]);
$notasDb = $stmtNotas->fetchAll();

// Buscar Frequência
$stmtFreq = $pdo->prepare("SELECT * FROM frequencia WHERE aprendiz_id = ?");
$stmtFreq->execute([$aluno_id]);
$freqDb = $stmtFreq->fetchAll();

$totalAulas = count($freqDb);

// Disciplinas do curso do aluno
$disciplinasCurso = [];
if (!empty($aluno['curso_id'])) {
    $stmtD = $pdo->prepare("SELECT * FROM disciplinas WHERE curso_id = ? ORDER BY nome ASC");
    $stmtD->execute([$aluno['curso_id']]);
    $disciplinasCurso = $stmtD->fetchAll();
}

// Exportar CSV
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=boletim_aluno_' . $aluno_id . '.csv');
    $out = fopen('php://output', 'w');
    fprintf($out, chr(0xEF) . chr(0xBB) . chr(0xBF));
    fputcsv($out, ['Boletim Escolar - ' . $aluno['nome']], ';');
    fputcsv($out, [], ';');
    fputcsv($out, ['Atividade', 'Nota', 'Data de Registro'], ';');
    foreach ($notasDb as $n) {
        fputcsv($out, [$n['atividade'], $n['valor_nota'], date('d/m/Y', strtotime($n['data_registro']))], ';');
    }
    fclose($out);
    exit;
}
$faltas = 0;
foreach ($freqDb as $f) {
    if ($f['status'] === 'falta') $faltas++;
}
$frequenciaPercentual = $totalAulas > 0 ? round((($totalAulas - $faltas) / $totalAulas) * 100) : 100;

// Calcular média geral
$somaNotas = 0;
foreach ($notasDb as $n) {
    $somaNotas += $n['valor_nota'];
}
$mediaGeral = count($notasDb) > 0 ? number_format($somaNotas / count($notasDb), 1, '.', '') : '0.0';

// Prepara o Boletim Detalhado
$boletim = [];
foreach ($disciplinasCurso as $d) {
    $boletim[$d['id']] = [
        'nome' => $d['nome'],
        'soma_notas' => 0,
        'qtd_notas' => 0,
        'faltas' => 0
    ];
}
foreach ($notasDb as $n) {
    $did = $n['disciplina_id'];
    if ($did && isset($boletim[$did])) {
        $boletim[$did]['soma_notas'] += $n['valor_nota'];
        $boletim[$did]['qtd_notas']++;
    }
}
foreach ($freqDb as $f) {
    $did = $f['disciplina_id'];
    if ($did && isset($boletim[$did]) && $f['status'] === 'falta') {
        $boletim[$did]['faltas']++;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do Aluno | Centro Técnico Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/portal_aluno.css?v=12">
    <link rel="stylesheet" href="../assets/css/premium.css?v=12">
</head>

<body>

    <div class="app">

        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="sb-brand" style="justify-content: center; overflow: hidden; padding: 20px 0;">
                <img src="../assets/images/logoNome.png" alt="Sophie Link Logo" style="width: 100px; height: auto; transform: scale(1.4);">
            </div>

            <div class="sb-user">
                <div class="sb-avatar"><?= strtoupper(substr($aluno['nome'], 0, 1)) ?></div>
                <div>
                    <div class="sb-uname"><?= htmlspecialchars($aluno['nome']) ?></div>
                    <div class="sb-urole"><?= htmlspecialchars($aluno['curso_nome'] ?? $aluno['curso'] ?? 'Curso Genérico') ?></div>
                    <div class="sb-ra">ID: <?= str_pad($aluno['id'], 6, '0', STR_PAD_LEFT) ?></div>
                </div>
            </div>

            <div class="sb-sec">Menu</div>
            <a href="#" class="nav-link active" onclick="showSec('inicio',this)"><i data-lucide="layout-dashboard"></i> Início</a>
            <a href="#" class="nav-link" onclick="showSec('notas',this)"><i data-lucide="bar-chart-2"></i> Notas & Frequência</a>
            <a href="#" class="nav-link" onclick="showSec('financeiro',this)"><i data-lucide="credit-card"></i> Financeiro</a>
            <a href="#" class="nav-link" onclick="showSec('horarios',this)"><i data-lucide="calendar"></i> Quadro de Horários</a>
            <a href="#" class="nav-link" onclick="showSec('historico',this)"><i data-lucide="file-text"></i> Histórico Escolar</a>
            <a href="#" class="nav-link" onclick="showSec('secretaria',this)"><i data-lucide="folder-open"></i> Secretaria</a>
            <a href="ava.php" class="nav-link"><i data-lucide="monitor-play"></i> Acesso ao AVA</a>

            <div class="sb-footer">
                <a href="../logout.php"><i data-lucide="log-out"></i> Sair</a>
            </div>
        </aside>

        <!-- WORKSPACE -->
        <div class="workspace">

            <!-- TOPBAR -->
            <header class="topbar">
                <div class="topbar-title" id="topbar-title">Portal do Aluno</div>
                <div class="topbar-right">
                    <button class="topbar-btn"><i data-lucide="bell"></i><span class="notif-dot"></span></button>
                    <button class="topbar-btn"><i data-lucide="settings"></i></button>
                </div>
            </header>

            <div class="workspace-content">
                <!-- CONTENT -->
                <main class="content">

                    <!-- ==================== INÍCIO ==================== -->
                    <div id="sec-inicio" class="sec active">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-tag"><?= htmlspecialchars($aluno['turma_nome'] ?? 'Sem Turma') ?></div>
                                <div class="ph-title">Painel do Estudante</div>
                                <div class="ph-sub">Visão Acadêmica — Centro Técnico Profissionalizante Sophie Link</div>
                            </div>
                        </div>

                        <!-- Carteirinha do Aluno (Premium Institutional) -->
                        <div class="inst-banner">
                            <div class="inst-banner-bg"></div>
                            <div class="inst-student">
                                <div class="inst-avatar">
                                    <?= htmlspecialchars(substr(explode(' ', $aluno['nome'])[0], 0, 1) . (count(explode(' ', $aluno['nome'])) > 1 ? substr(explode(' ', $aluno['nome'])[1], 0, 1) : '')) ?>
                                </div>
                                <div class="inst-info">
                                    <div class="inst-badge">MATRÍCULA ATIVA</div>
                                    <h2><?= htmlspecialchars($aluno['nome']) ?></h2>
                                    <div class="inst-details">
                                        <span><i data-lucide="hash"></i> RA: <?= htmlspecialchars($aluno['ra'] ?? date('Y') . str_pad($aluno['id'], 4, '0', STR_PAD_LEFT)) ?></span>
                                        <span><i data-lucide="book-open"></i> <?= htmlspecialchars($aluno['curso_nome'] ?? $aluno['curso'] ?? 'Aprendizagem') ?></span>
                                        <span><i data-lucide="users"></i> <?= htmlspecialchars($aluno['turma_nome'] ?? 'Sem Turma') ?></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Resumo Acadêmico -->
                        <div class="inst-metrics">
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #EFF6FF; color: #2563EB;"><i data-lucide="bar-chart-2"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Média Global</div>
                                    <div class="metric-val"><?= $mediaGeral ?></div>
                                </div>
                            </div>
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #F0FDF4; color: #16A34A;"><i data-lucide="check-circle"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Frequência Geral</div>
                                    <div class="metric-val"><?= $frequenciaPercentual ?>%</div>
                                </div>
                            </div>
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #F8FAFC; color: #475569;"><i data-lucide="calendar"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Período Atual</div>
                                    <div class="metric-val">2º Sem. 2026</div>
                                </div>
                            </div>
                        </div>

                        <div class="grid-2">
                            <!-- COLUNA ESQUERDA: Avisos & Financeiro -->
                            <div class="inst-col">
                                <!-- Avisos -->
                                <div class="inst-card">
                                    <div class="inst-card-header">
                                        <i data-lucide="bell" class="inst-icon"></i> Avisos da Secretaria
                                    </div>
                                    <div class="inst-list">
                                        <div class="inst-list-item">
                                            <div class="inst-list-icon warning"><i data-lucide="alert-triangle"></i></div>
                                            <div class="inst-list-content">
                                                <h4>Entrega de Documentos</h4>
                                                <p>Prazo para entrega do relatório mensal na empresa: dia 10.</p>
                                            </div>
                                        </div>
                                        <div class="inst-list-item">
                                            <div class="inst-list-icon info"><i data-lucide="file-text"></i></div>
                                            <div class="inst-list-content">
                                                <h4>Folha de Ponto</h4>
                                                <p>Assine a folha de ponto na empresa semanalmente.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Próxima Mensalidade -->
                                <div class="inst-card highlight-card">
                                    <div class="inst-card-header borderless">
                                        <i data-lucide="credit-card" class="inst-icon"></i> Próxima Mensalidade
                                    </div>
                                    <div class="finance-block">
                                        <div class="finance-due">Vencimento: <strong>10/05/2026</strong></div>
                                        <div class="finance-amount">R$ 250,00</div>
                                        <div class="finance-status"><span class="pill pill-amber">A Vencer</span></div>
                                        <a href="../reports/boleto_print.php?mes=Maio&valor=250,00" target="_blank" class="inst-btn-primary"><i data-lucide="printer"></i> Imprimir Boleto</a>
                                    </div>
                                </div>
                            </div>

                            <!-- COLUNA DIREITA: Últimas Notas -->
                            <div class="inst-col">
                                <div class="inst-card">
                                    <div class="inst-card-header">
                                        <div><i data-lucide="award" class="inst-icon"></i> Últimas Avaliações</div>
                                        <a href="#" class="inst-link" onclick="showSec('notas', document.querySelector('[onclick*=notas]'))">Ver Histórico →</a>
                                    </div>
                                    <table class="inst-table">
                                        <thead>
                                            <tr>
                                                <th>Disciplina / Atividade</th>
                                                <th style="text-align:center;">Situação</th>
                                                <th style="text-align:right;">Nota Final</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php if (empty($notasDb)): ?>
                                                <tr>
                                                    <td colspan="3" style="text-align:center; padding: 2rem; color: #94A3B8;">Nenhuma avaliação registrada no período.</td>
                                                </tr>
                                            <?php else: ?>
                                                <?php foreach (array_slice($notasDb, 0, 5) as $n):
                                                    $aprovado = $n['valor_nota'] >= 7;
                                                ?>
                                                    <tr>
                                                        <td class="td-primary"><?= htmlspecialchars($n['disciplina_nome'] ?? $n['atividade']) ?></td>
                                                        <td style="text-align:center;">
                                                            <span class="inst-status <?= $aprovado ? 'status-ok' : 'status-warn' ?>"><?= $aprovado ? 'Aprovado' : 'Atenção' ?></span>
                                                        </td>
                                                        <td class="td-score <?= $aprovado ? 'score-good' : 'score-bad' ?>"><?= number_format($n['valor_nota'], 1, '.', '') ?></td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            <?php endif; ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div><!-- /sec-inicio -->

                    <!-- ==================== NOTAS ==================== -->
                    <div id="sec-notas" class="sec">

                        <div class="inst-metrics" style="margin-bottom: 1.5rem;">
                            <div class="metric-box" style="flex: 1;">
                                <div class="metric-icon" style="background: #EFF6FF; color: #2563EB;"><i data-lucide="bar-chart-2"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Período 2026/1</div>
                                    <div class="metric-val" style="font-size: 1.25rem;">Notas & Frequência</div>
                                </div>
                            </div>
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #F8FAFC; color: #475569;"><i data-lucide="target"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Média Geral</div>
                                    <div class="metric-val">8.4</div>
                                </div>
                            </div>
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #F0FDF4; color: #16A34A;"><i data-lucide="check-circle"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Frequência</div>
                                    <div class="metric-val">94%</div>
                                </div>
                            </div>
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header">
                                <div><i data-lucide="bar-chart-2" class="inst-icon"></i> Boletim Detalhado</div>
                            </div>
                            <table class="inst-table">
                                <thead>
                                    <tr>
                                        <th>Disciplina</th>
                                        <th style="text-align:center;">Faltas</th>
                                        <th style="text-align:center;">Situação</th>
                                        <th style="text-align:right;">Média</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (empty($boletim)): ?>
                                        <tr>
                                            <td colspan="4" style="text-align:center; padding: 2rem; color: #94A3B8;">Nenhuma disciplina vinculada à sua turma.</td>
                                        </tr>
                                    <?php else: ?>
                                        <?php foreach ($boletim as $discId => $d):
                                            $media = $d['qtd_notas'] > 0 ? $d['soma_notas'] / $d['qtd_notas'] : null;

                                            if ($media === null) {
                                                $mediaStr = '—';
                                                $scoreClass = 'score-bad';
                                                $pillClass = 'status-warn';
                                                $status = 'Em andamento';
                                            } else {
                                                $mediaStr = number_format($media, 1, '.', '');
                                                $scoreClass = $media >= 7 ? 'score-good' : 'score-bad';
                                                $pillClass = $media >= 7 ? 'status-ok' : ($media >= 5 ? 'status-warn' : 'status-warn');
                                                $status = $media >= 7 ? 'Aprovado' : ($media >= 5 ? 'Recuperação' : 'Reprovado');
                                            }
                                        ?>
                                            <tr>
                                                <td class="td-primary"><?= htmlspecialchars($d['nome']) ?></td>
                                                <td style="text-align:center; color: var(--c-text-muted); font-weight: 500;"><?= $d['faltas'] ?></td>
                                                <td style="text-align:center;"><span class="inst-status <?= $pillClass ?>"><?= $status ?></span></td>
                                                <td class="td-score <?= $scoreClass ?>"><?= $mediaStr ?></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div><!-- /sec-notas -->

                    <!-- ==================== FINANCEIRO ==================== -->
                    <div id="sec-financeiro" class="sec">
                        <div class="inst-metrics" style="margin-bottom: 1.5rem;">
                            <div class="metric-box" style="flex: 1;">
                                <div class="metric-icon" style="background: #F0FDF4; color: #16A34A;"><i data-lucide="dollar-sign"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Mensalidades</div>
                                    <div class="metric-val" style="font-size: 1.25rem;">Painel Financeiro</div>
                                </div>
                            </div>
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header">
                                <div><i data-lucide="credit-card" class="inst-icon"></i> Extrato de Lançamentos</div>
                            </div>

                            <div class="finance-block" style="border-bottom: 1px solid var(--c-border); border-radius: 0;">
                                <div class="finance-due">Vencimento: <strong>10/04/2026</strong> <span style="color: #64748B; font-weight: normal;">· Pago em: 08/04/2026</span></div>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #1E293B; margin-bottom: 8px;">Mensalidade Aprendizagem — Parcela 04/12</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div class="finance-amount">R$ 250,00</div>
                                    <span class="inst-status status-ok">Pago</span>
                                </div>
                            </div>

                            <div class="finance-block" style="border-radius: 0;">
                                <div class="finance-due">Vencimento: <strong>10/05/2026</strong></div>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #1E293B; margin-bottom: 8px;">Mensalidade Aprendizagem — Parcela 05/12</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div class="finance-amount">R$ 250,00</div>
                                    <a href="../reports/boleto_print.php?mes=Maio&valor=250,00" target="_blank" class="inst-btn-primary" style="padding: 6px 12px; font-size: 0.75rem;"><i data-lucide="printer" style="width: 14px; height: 14px;"></i> Boleto</a>
                                </div>
                            </div>
                        </div>
                    </div><!-- /sec-financeiro -->

                    <!-- ==================== HORARIOS ==================== -->
                    <div id="sec-horarios" class="sec">
                        <div class="inst-metrics" style="margin-bottom: 1.5rem;">
                            <div class="metric-box" style="flex: 1;">
                                <div class="metric-icon" style="background: #FFFBEB; color: #D97706;"><i data-lucide="calendar"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Cronograma</div>
                                    <div class="metric-val" style="font-size: 1.25rem;">Quadro de Horários</div>
                                </div>
                            </div>
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header">
                                <div><i data-lucide="calendar" class="inst-icon"></i> Agenda Semanal</div>
                            </div>
                            <table class="inst-table">
                                <thead>
                                    <tr>
                                        <th>Dia da Semana</th>
                                        <th>Horário</th>
                                        <th>Disciplina</th>
                                        <th style="text-align:center;">Local</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="td-primary">Segunda-feira</td>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">19:00 às 22:30</td>
                                        <td style="font-weight: 600;">Elementos de Máquinas</td>
                                        <td style="text-align:center;"><span class="inst-status status-ok" style="background: #EFF6FF; color: #2563EB;">Sala 104</span></td>
                                    </tr>
                                    <tr>
                                        <td class="td-primary">Terça-feira</td>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">19:00 às 22:30</td>
                                        <td style="font-weight: 600;">Elementos de Máquinas</td>
                                        <td style="text-align:center;"><span class="inst-status status-ok" style="background: #EFF6FF; color: #2563EB;">Sala 104</span></td>
                                    </tr>
                                    <tr>
                                        <td class="td-primary">Sexta-feira</td>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">08:00 às 17:00</td>
                                        <td style="font-weight: 600;">Treinamento Prático</td>
                                        <td style="text-align:center;"><span class="inst-status status-warn">Empresa</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ==================== HISTÓRICO ==================== -->
                    <div id="sec-historico" class="sec">
                        <div class="inst-metrics" style="margin-bottom: 1.5rem;">
                            <div class="metric-box" style="flex: 1;">
                                <div class="metric-icon" style="background: #F8FAFC; color: #475569;"><i data-lucide="file-text"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Documento Oficial</div>
                                    <div class="metric-val" style="font-size: 1.25rem;">Histórico Escolar</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: center; padding: 0 1.5rem;">
                                <a href="?export=csv" class="inst-btn-primary" style="background: #1E293B;"><i data-lucide="download"></i> Baixar PDF</a>
                            </div>
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header">
                                <div><i data-lucide="file-text" class="inst-icon"></i> Grade Curricular Cumprida</div>
                            </div>
                            <table class="inst-table">
                                <thead>
                                    <tr>
                                        <th>Período</th>
                                        <th>Disciplina</th>
                                        <th style="text-align:center;">Carga Horária</th>
                                        <th style="text-align:center;">Situação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2025/2</td>
                                        <td class="td-primary">Segurança do Trabalho</td>
                                        <td style="text-align:center; font-weight: 500;">40h</td>
                                        <td style="text-align:center;"><span class="inst-status status-ok">Concluído</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2025/2</td>
                                        <td class="td-primary">Desenho Técnico</td>
                                        <td style="text-align:center; font-weight: 500;">60h</td>
                                        <td style="text-align:center;"><span class="inst-status status-ok">Concluído</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2026/1</td>
                                        <td class="td-primary">Elementos de Máquinas</td>
                                        <td style="text-align:center; font-weight: 500;">80h</td>
                                        <td style="text-align:center;"><span class="inst-status status-warn" style="background: #EFF6FF; color: #2563EB;">Cursando</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!-- /sec-historico -->

                    <!-- ==================== SECRETARIA ==================== -->
                    <div id="sec-secretaria" class="sec">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-tag">Atendimento</div>
                                <div class="ph-title">Secretaria Online</div>
                                <div class="ph-sub">Abra requerimentos ou envie documentos exigidos.</div>
                            </div>
                        </div>

                        <div class="grid-2">
                            <!-- Novo Requerimento -->
                            <div class="card">
                                <div class="card-head">
                                    <div class="card-title"><i data-lucide="folder-plus"></i> Novo Requerimento</div>
                                </div>
                                <div class="card-body">
                                    <form onsubmit="event.preventDefault(); alert('Sua solicitação foi enviada para a secretaria!'); this.reset();">
                                        <div class="form-group" style="margin-bottom: 15px;">
                                            <label class="form-label">Tipo de Solicitação</label>
                                            <select class="form-control" style="width:100%;">
                                                <option>Declaração de Matrícula</option>
                                                <option>Atestado de Frequência</option>
                                                <option>Envio de Folha de Ponto (Empresa)</option>
                                                <option>Justificativa de Falta (Atestado Médico)</option>
                                            </select>
                                        </div>
                                        <div class="form-group" style="margin-bottom: 15px;">
                                            <label class="form-label">Observações</label>
                                            <textarea class="form-control" style="width:100%; height:80px; resize:none;" placeholder="Descreva sua solicitação..."></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary" style="width:100%;">Enviar Solicitação</button>
                                    </form>
                                </div>
                            </div>

                            <!-- Meus Pedidos -->
                            <div class="card">
                                <div class="card-head">
                                    <div class="card-title"><i data-lucide="inbox"></i> Meus Pedidos</div>
                                </div>
                                <div class="table-wrap">
                                    <table class="grade-table">
                                        <thead>
                                            <tr>
                                                <th>Protocolo</th>
                                                <th>Data</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="td-mono">#99201</td>
                                                <td>02/05/2026</td>
                                                <td><span class="pill pill-green">Concluído</span></td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" style="text-align:center; font-size: 13px; color:var(--c-text-muted);">Nenhum pedido aberto no momento.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div><!-- /sec-secretaria -->



                </main>
            </div>
        </div>

        <script src="../assets/js/portal_aluno.js"></script>
</body>

</html>