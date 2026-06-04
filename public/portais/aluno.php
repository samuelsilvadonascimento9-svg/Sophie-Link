<?php
// portal_aluno.php — Portal do Aluno | Centro Técnico Profissionalizante Sophie Link
session_start();

require_once '../../includes/auth.php';
protect_page(['aluno']);

require_once '../../includes/db.php';
/** @var \PDO $pdo */
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

// Busca Faturas do Aluno (pela empresa do contrato ativo)
$stmtFat = $pdo->prepare("
    SELECT f.* 
    FROM financeiro f
    JOIN contratos c ON f.empresa_id = c.empresa_id
    WHERE c.aprendiz_id = ? AND c.status = 'ativo'
    ORDER BY f.data_vencimento DESC
");
$stmtFat->execute([$aluno_id]);
$faturas = $stmtFat->fetchAll(PDO::FETCH_ASSOC);

$totalPago = 0;
$totalPendente = 0;
$proximoVencimento = null;
$proximaFaturaId = null;

foreach ($faturas as $fat) {
    if ($fat['status'] === 'pago') $totalPago += $fat['valor'];
    if ($fat['status'] === 'pendente') {
        $totalPendente += $fat['valor'];
        if (!$proximoVencimento || strtotime($fat['data_vencimento']) < strtotime($proximoVencimento)) {
            $proximoVencimento = $fat['data_vencimento'];
            $proximaFaturaId = $fat['id'];
        }
    }
}

// ================= LÓGICA DA SECRETARIA =================
// Processar novo requerimento
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'novo_requerimento') {
    $tipo = $_POST['tipo_solicitacao'] ?? '';
    $obs = $_POST['observacoes'] ?? '';
    if ($tipo) {
        $protocolo = date('YmdHi') . rand(10,99);
        $stmtReq = $pdo->prepare("INSERT INTO requerimentos (aprendiz_id, tipo, observacoes, protocolo) VALUES (?, ?, ?, ?)");
        $stmtReq->execute([$aluno_id, $tipo, $obs, $protocolo]);
        
        header("Location: portal_aluno.php?req=sucesso#sec-secretaria");
        exit;
    }
}

// Buscar requerimentos do aluno
$stmtReqList = $pdo->prepare("SELECT * FROM requerimentos WHERE aprendiz_id = ? ORDER BY data_solicitacao DESC");
$stmtReqList->execute([$aluno_id]);
$requerimentosDb = $stmtReqList->fetchAll(PDO::FETCH_ASSOC);

// ================= LÓGICA DO MURAL DE AVISOS =================
$stmtAvisos = $pdo->query("SELECT * FROM mural_avisos ORDER BY data_publicacao DESC LIMIT 10");
$avisosDb = $stmtAvisos->fetchAll(PDO::FETCH_ASSOC);

// ================= LÓGICA DE OPORTUNIDADES =================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'candidatar') {
    $vaga_id = $_POST['vaga_id'] ?? null;
    if ($vaga_id) {
        try {
            $stmtCand = $pdo->prepare("INSERT INTO candidaturas (oportunidade_id, aprendiz_id) VALUES (?, ?)");
            $stmtCand->execute([$vaga_id, $aluno_id]);
            header("Location: portal_aluno.php?cand=sucesso#sec-oportunidades");
            exit;
        } catch (PDOException $e) {
            header("Location: portal_aluno.php?cand=erro#sec-oportunidades");
            exit;
        }
    }
}

// Buscar vagas disponíveis
$stmtVagas = $pdo->query("SELECT o.*, e.nome AS empresa_nome_rel 
                          FROM oportunidades o 
                          LEFT JOIN empresas e ON o.empresa_id = e.id 
                          WHERE o.status = 'aberta' 
                          ORDER BY o.data_publicacao DESC");
$vagasDb = $stmtVagas->fetchAll(PDO::FETCH_ASSOC);

// Buscar minhas candidaturas
$stmtMinhasCand = $pdo->prepare("SELECT oportunidade_id FROM candidaturas WHERE aprendiz_id = ?");
$stmtMinhasCand->execute([$aluno_id]);
$minhasCandidaturas = $stmtMinhasCand->fetchAll(PDO::FETCH_COLUMN);

// ================= LÓGICA DE HORÁRIOS =================
$stmtHorarios = $pdo->prepare("SELECT h.*, d.nome AS disciplina_nome 
                               FROM horarios_aulas h 
                               JOIN disciplinas d ON h.disciplina_id = d.id 
                               WHERE h.turma_id = ?");
$stmtHorarios->execute([$aluno['turma_id']]);
$horariosDb = $stmtHorarios->fetchAll(PDO::FETCH_ASSOC);

// Mapear para quadro de horários
$quadro = [];
$turnos_labels = ['Manhã' => '08:00 - 11:59', 'Tarde' => '14:00 - 17:59', 'Noite' => '19:00 - 22:59'];
foreach ($horariosDb as $h) {
    $hora_int = (int)date('H', strtotime($h['hora_inicio']));
    $turno = $hora_int < 12 ? 'Manhã' : ($hora_int < 18 ? 'Tarde' : 'Noite');
    $quadro[$turno][$h['dia_semana']][] = $h;
}

// Gerar eventos para o FullCalendar
$events_fc = [];
$diasMap = ['Domingo'=>0, 'Segunda'=>1, 'Terça'=>2, 'Quarta'=>3, 'Quinta'=>4, 'Sexta'=>5, 'Sábado'=>6];
$startDate = new DateTime('2026-06-01');
$endDate = new DateTime('2026-06-30');
foreach ($horariosDb as $h) {
    $dia_alvo = $diasMap[$h['dia_semana']];
    $current = clone $startDate;
    while ($current <= $endDate) {
        if ((int)$current->format('w') === $dia_alvo) {
            $events_fc[] = [
                'title' => $h['disciplina_nome'],
                'start' => $current->format('Y-m-d') . 'T' . $h['hora_inicio'],
                'end' => $current->format('Y-m-d') . 'T' . $h['hora_fim']
            ];
        }
        $current->modify('+1 day');
    }
}
$events_json = json_encode($events_fc);

$notasPorDisciplina = [];
$labelsAv = [];
$valuesAv = [];
$mediaTurmaAv = [];

foreach ($notasDb as $n) {
    $did = $n['disciplina_id'] ?: 0;
    if (!isset($notasPorDisciplina[$did])) {
        $notasPorDisciplina[$did] = [];
    }
    $notasPorDisciplina[$did][] = [
        'atividade' => $n['atividade'],
        'nota' => (float)$n['valor_nota'],
        'data' => date('d/m/Y', strtotime($n['data_registro']))
    ];
}

$notasGrafico = array_reverse($notasDb);
foreach ($notasGrafico as $n) {
    $labelsAv[] = $n['atividade'];
    $valuesAv[] = (float)$n['valor_nota'];
    $mediaTurmaAv[] = 7.0;
}

$jsonNotasReais = json_encode($notasPorDisciplina);
$jsonLabelsAv = json_encode($labelsAv);
$jsonValuesAv = json_encode($valuesAv);
$jsonMediaTurmaAv = json_encode($mediaTurmaAv);

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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
    <link rel="stylesheet" href="../assets/css/portais/aluno.css?v=<?= time() ?>">
    <link rel="stylesheet" href="../assets/css/premium.css?v=<?= time() ?>">
    <script>
        window.notasReais = <?= $jsonNotasReais ?>;
        window.notasLabels = <?= $jsonLabelsAv ?>;
        window.notasValues = <?= $jsonValuesAv ?>;
        window.mediaTurmaAv = <?= $jsonMediaTurmaAv ?>;
    </script>

        <style>
            /* Modo Escuro Premium */
            body.dark-mode {
                --premium-bg: #0F172A;
                --premium-surface: #1E293B;
                --premium-border: #334155;
                --premium-text: #F8FAFC;
                --premium-text-muted: #94A3B8;
                --c-bg: #0F172A;
                --c-surface: #1E293B;
                --c-text: #F8FAFC;
                --c-text-muted: #94A3B8;
                --c-border: #334155;
            }
            body.dark-mode .sidebar {
                background: #1E293B;
                border-right-color: #334155;
            }
            body.dark-mode .inst-card, body.dark-mode .metric-box {
                background: #1E293B;
                border-color: #334155;
            }
            body.dark-mode .inst-table th {
                background: #0F172A;
                color: #F8FAFC;
                border-bottom-color: #334155;
            }
            body.dark-mode .inst-table td {
                border-bottom-color: #334155;
            }
            body.dark-mode .vaga-card {
                background: #1E293B !important;
                border-color: #334155 !important;
            }
            body.dark-mode .page-hdr {
                background: #1E293B;
                border-bottom-color: #334155;
            }
            body.dark-mode input, body.dark-mode select {
                background: #0F172A !important;
                color: #F8FAFC !important;
                border-color: #334155 !important;
            }
            body.dark-mode .nav-link:hover, body.dark-mode .nav-link.active {
                background: #334155;
            }
            .notas-tab {
                background: none;
                border: none;
                padding: 10px 20px;
                color: var(--premium-text-muted);
                cursor: pointer;
                font-weight: 500;
                border-bottom: 2px solid transparent;
            }
            .notas-tab.active { color: #0EA5E9; border-bottom-color: #0EA5E9; }
        </style>
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
            <a href="#" class="nav-link" onclick="showSec('horarios',this)"><i data-lucide="calendar"></i> Agenda Acadêmica</a>
            <a href="#" class="nav-link" onclick="showSec('mural',this)"><i data-lucide="bell"></i> Mural de Avisos</a>
            <a href="#" class="nav-link" onclick="showSec('oportunidades',this)"><i data-lucide="briefcase"></i> Oportunidades</a>
            <a href="#" class="nav-link" onclick="showSec('historico',this)"><i data-lucide="file-text"></i> Histórico Escolar</a>
            <a href="#" class="nav-link" onclick="showSec('secretaria',this)"><i data-lucide="folder-open"></i> Secretaria</a>
            <a href="../auth/login_ava.php" class="nav-link"><i data-lucide="monitor-play"></i> Acesso ao AVA</a>

            <div class="sb-footer">
                <a href="../auth/logout.php"><i data-lucide="log-out"></i> Sair</a>
            </div>
        </aside>

        <!-- WORKSPACE -->
        <div class="workspace">

            <!-- TOPBAR -->
            <header class="topbar">
                <div class="topbar-title" id="topbar-title">Portal do Aluno</div>
                <div class="topbar-right">
                    <div style="position: relative; display: inline-block;">
                        <button id="btnConfig" class="topbar-btn" title="Configurações">
                            <i data-lucide="settings"></i>
                        </button>
                        <div id="configDropdown" style="display: none; position: absolute; right: 0; top: 45px; background: white; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); width: 220px; z-index: 1000; overflow: hidden; text-align: left;">
                            <a href="#" onclick="showSec('perfil', document.querySelector('.nav-link')); document.getElementById('configDropdown').style.display='none'; return false;" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                                <i data-lucide="user" style="width: 16px; height: 16px;"></i> Meu Perfil
                            </a>
                            <a href="#" onclick="emBreve(); return false;" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                                <i data-lucide="key" style="width: 16px; height: 16px;"></i> Alterar Senha
                            </a>
                            <a href="#" onclick="toggleDarkMode(); return false;" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <i data-lucide="moon" style="width: 16px; height: 16px;"></i> Modo Escuro
                                </div>
                                <div style="width: 32px; height: 18px; background: #E2E8F0; border-radius: 9px; position: relative;">
                                    <div style="width: 14px; height: 14px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.2);"></div>
                                </div>
                            </a>
                        </div>
                    </div>
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
                                        <?php if ($totalPendente > 0): ?>
                                            <div class="finance-due">Vencimento: <strong><?= $proximoVencimento ? date('d/m/Y', strtotime($proximoVencimento)) : 'Em breve' ?></strong></div>
                                            <div class="finance-amount">R$ <?= number_format($totalPendente, 2, ',', '.') ?></div>
                                            <div class="finance-status"><span class="pill pill-amber">A Vencer</span></div>
                                            <button onclick="iniciarPagamento(<?= $proximaFaturaId ?>)" class="inst-btn-primary" style="border:none; cursor:pointer;"><i data-lucide="credit-card"></i> Pagar Mensalidade</button>
                                        <?php else: ?>
                                            <div class="finance-due">Situação Financeira</div>
                                            <div class="finance-amount" style="color: #16A34A; font-size: 1.5rem;">Em dia!</div>
                                            <div class="finance-status"><span class="pill pill-ok">Regular</span></div>
                                        <?php endif; ?>
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

                        <!-- Top Charts Container -->
                        <div class="notas-charts-wrapper" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                            <!-- Chart 1 -->
                            <div class="inst-card">
                                <div class="inst-card-header borderless" style="padding-bottom: 12px;">
                                    <div style="font-size: 1.05rem; font-weight: 700; color: #1E293B;">Notas por avaliação</div>
                                </div>
                                <div class="notas-filters" style="padding: 0 1.5rem; display: flex; flex-direction: column; gap: 16px;">
                                    <!-- Premium Select 1 -->
                                    <div style="display: flex; flex-direction: column; gap: 6px;">
                                        <label style="font-size: 0.7rem; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; padding-left: 2px;">Disciplina</label>
                                        <div style="position: relative;">
                                            <select id="filtroDisciplinaChart1" style="width: 100%; appearance: none; -webkit-appearance: none; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 36px 10px 14px; font-size: 0.9rem; font-weight: 600; color: #1E293B; outline: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02);" onmouseover="this.style.borderColor='#CBD5E1'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.04)';" onmouseout="this.style.borderColor='#E2E8F0'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.02)';">
                                                <option>Automação com python: Projeto integrador</option>
                                            </select>
                                            <i data-lucide="chevron-down" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #64748B; pointer-events: none;"></i>
                                        </div>
                                    </div>
                                    <!-- Premium Select 2 -->
                                    <div style="display: flex; flex-direction: column; gap: 6px;">
                                        <label style="font-size: 0.7rem; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; padding-left: 2px;">Etapa</label>
                                        <div style="position: relative;">
                                            <select id="filtroEtapaChart1" style="width: 100%; appearance: none; -webkit-appearance: none; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 36px 10px 14px; font-size: 0.9rem; font-weight: 600; color: #1E293B; outline: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02);" onmouseover="this.style.borderColor='#CBD5E1'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.04)';" onmouseout="this.style.borderColor='#E2E8F0'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.02)';">
                                                <option>Média</option>
                                            </select>
                                            <i data-lucide="chevron-down" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #64748B; pointer-events: none;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div style="padding: 1rem 1.5rem 1.5rem; height: 280px; position: relative;">
                                    <canvas id="chartNotasAvaliacao"></canvas>
                                </div>
                            </div>
                            
                            <!-- Chart 2 -->
                            <div class="inst-card">
                                <div class="inst-card-header borderless" style="justify-content: space-between; align-items: center; padding-bottom: 12px;">
                                    <div style="font-size: 1.05rem; font-weight: 700; color: #1E293B;">Notas por etapa</div>
                                    <a href="#" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; color: #FFFFFF; text-decoration: none; padding: 8px 14px; background: #FF6B00; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(255, 107, 0, 0.2);" onmouseover="this.style.background='#EA580C'; this.style.boxShadow='0 4px 6px rgba(255, 107, 0, 0.3)';" onmouseout="this.style.background='#FF6B00'; this.style.boxShadow='0 2px 4px rgba(255, 107, 0, 0.2)';">
                                        Ver Desempenho
                                        <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                                    </a>
                                </div>
                                <div class="notas-filters" style="padding: 0 1.5rem; display: flex; flex-direction: column; gap: 16px;">
                                    <!-- Premium Select 1 -->
                                    <div style="display: flex; flex-direction: column; gap: 6px;">
                                        <label style="font-size: 0.7rem; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; padding-left: 2px;">Disciplina</label>
                                        <div style="position: relative;">
                                            <select id="filtroDisciplinaChart2" style="width: 100%; appearance: none; -webkit-appearance: none; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 36px 10px 14px; font-size: 0.9rem; font-weight: 600; color: #1E293B; outline: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02);" onmouseover="this.style.borderColor='#CBD5E1'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.04)';" onmouseout="this.style.borderColor='#E2E8F0'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.02)';">
                                                <option>Automação com python: Projeto integrador</option>
                                            </select>
                                            <i data-lucide="chevron-down" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #64748B; pointer-events: none;"></i>
                                        </div>
                                    </div>
                                    <div style="height: 64px;"></div> <!-- Spacer to align with chart 1 -->
                                </div>
                                <div style="padding: 1rem 1.5rem 1.5rem; height: 280px; position: relative;">
                                    <canvas id="chartNotasEtapa"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Main Table Section -->
                        <div class="notas-table-section" style="margin-top: 1.5rem;">
                            <!-- Controles Modernos -->
                            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 24px; gap: 16px; background: #FFFFFF; padding: 16px 20px; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="font-weight: 700; color: #1E293B; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                                        <i data-lucide="calendar" style="width: 18px; height: 18px; color: #FF6B00;"></i> Período:
                                    </div>
                                    <select style="padding: 8px 16px; border-radius: 8px; border: 1px solid #CBD5E1; font-weight: 600; color: #0F172A; background: #F8FAFC; outline: none; cursor: pointer;">
                                        <option>2026-1S</option>
                                    </select>
                                </div>

                                <!-- Segmented Tabs -->
                                <div style="display: inline-flex; background: #F1F5F9; padding: 4px; border-radius: 10px; border: 1px solid #E2E8F0;">
                                    <button class="notas-tab active" onclick="switchNotasTab('etapas', this)" style="padding: 8px 20px; border: none; background: transparent; border-radius: 6px; font-weight: 600; font-size: 0.85rem; color: #64748B; cursor: pointer; transition: all 0.2s;">Visão por Etapas</button>
                                    <button class="notas-tab" onclick="switchNotasTab('avaliacoes', this)" style="padding: 8px 20px; border: none; background: transparent; border-radius: 6px; font-weight: 600; font-size: 0.85rem; color: #64748B; cursor: pointer; transition: all 0.2s;">Histórico de Avaliações</button>
                                    <style>
                                        .notas-tab.active { background: #FFFFFF !important; color: #FF6B00 !important; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                                        .notas-tab:hover:not(.active) { color: #1E293B !important; }
                                    </style>
                                </div>
                            </div>

                            <!-- Tab 1: Notas por Etapas -->
                            <div id="tab-notas-etapas" class="notas-tab-content active">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                                    <span style="font-size: 0.85rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Filtrar Disciplina:</span>
                                    <select style="padding: 8px 16px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 0.85rem; font-weight: 600; color: #1E293B; min-width: 200px; outline: none; cursor: pointer;">
                                        <option>TODAS AS DISCIPLINAS</option>
                                    </select>
                                </div>
                                
                                <div style="overflow-x: auto; padding-bottom: 10px;">
                                    <table style="min-width: 800px; width: 100%; border-spacing: 0 10px; border-collapse: separate;">
                                        <thead>
                                            <tr>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: left;">Turma</th>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: left;">Disciplina</th>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: center;">Situação</th>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: center;">1ª Média</th>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: center;">2ª Recup.</th>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: center;">Média Final</th>
                                                <th style="padding: 0 16px; font-weight: 700; font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; text-align: right;">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php if (empty($boletim)): ?>
                                                <tr><td colspan="7" style="text-align:center; padding: 2rem; background: #fff; border-radius: 12px; border: 1px solid #E2E8F0;">Nenhuma disciplina vinculada à sua turma.</td></tr>
                                            <?php else: ?>
                                                <?php foreach ($boletim as $discId => $d):
                                                    $media = $d['qtd_notas'] > 0 ? $d['soma_notas'] / $d['qtd_notas'] : null;
                                                    $mediaStr = $media !== null ? number_format($media, 2, '.', '') : '—';
                                                    $status = $media !== null ? ($media >= 7 ? 'Aprovado' : 'Cursando') : 'Cursando';
                                                    $turmaStr = htmlspecialchars($aluno['turma_nome'] ?? 'TGT03NA');
                                                    
                                                    // Estilização dinâmica
                                                    $statusBg = $status === 'Aprovado' ? '#F0FDF4' : '#EFF6FF';
                                                    $statusColor = $status === 'Aprovado' ? '#16A34A' : '#2563EB';
                                                    $statusBorder = $status === 'Aprovado' ? '#BBF7D0' : '#BFDBFE';
                                                    
                                                    $valColor = $media !== null ? '#334155' : '#94A3B8';
                                                    $finalColor = $media !== null ? '#1E293B' : '#94A3B8';
                                                ?>
                                                <tr style="background: #FFFFFF; box-shadow: 0 2px 4px rgba(0,0,0,0.02); border: 1px solid #E2E8F0; border-radius: 12px; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 12px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.02)';">
                                                    <td style="padding: 16px; font-weight: 600; color: #64748B; font-size: 0.85rem; border-radius: 12px 0 0 12px; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; border-left: 1px solid #E2E8F0;"><?= $turmaStr ?></td>
                                                    <td style="padding: 16px; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
                                                        <div style="display: flex; align-items: center; gap: 10px;">
                                                            <div style="width: 32px; height: 32px; border-radius: 8px; background: #EFF6FF; color: #3B82F6; display: flex; align-items: center; justify-content: center;"><i data-lucide="book" style="width: 16px; height: 16px;"></i></div>
                                                            <span style="font-weight: 700; color: #1E293B; font-size: 0.95rem;"><?= htmlspecialchars($d['nome']) ?></span>
                                                        </div>
                                                    </td>
                                                    <td style="padding: 16px; text-align: center; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
                                                        <span style="background: <?= $statusBg ?>; color: <?= $statusColor ?>; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; border: 1px solid <?= $statusBorder ?>;"><?= $status ?></span>
                                                    </td>
                                                    <td style="padding: 16px; text-align: center; font-weight: 700; color: <?= $valColor ?>; font-size: 0.95rem; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;"><?= $mediaStr ?></td>
                                                    <td style="padding: 16px; text-align: center; font-weight: 700; color: #94A3B8; font-size: 0.95rem; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">—</td>
                                                    <td style="padding: 16px; text-align: center; font-weight: 800; color: <?= $finalColor ?>; font-size: 1rem; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;"><?= $mediaStr ?></td>
                                                    <td style="padding: 16px; text-align: right; border-radius: 0 12px 12px 0; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0;">
                                                        <button onclick="abrirModalNotas('<?= $discId ?>', '<?= addslashes($d['nome']) ?>', <?= $media !== null ? $media : 'null' ?>)" style="background: transparent; border: 1px solid #0EA5E9; color: #0EA5E9; padding: 6px 14px; border-radius: 6px; font-weight: 600; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#0EA5E9'; this.style.color='white';" onmouseout="this.style.background='transparent'; this.style.color='#0EA5E9';">Ver Notas</button>
                                                    </td>
                                                </tr>
                                                <?php endforeach; ?>
                                            <?php endif; ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div id="tab-notas-avaliacoes" class="notas-tab-content" style="display: none; margin-top: 1.5rem;">
                                <div class="inst-card"><div style="padding: 2rem; text-align: center; color: #64748B;">Nenhuma avaliação avulsa selecionada. Use a aba "Visão por Etapas".</div></div>
                            </div>
                        </div>
                    </div><!-- /sec-notas -->

                    <!-- ==================== FINANCEIRO ==================== -->
                    <div id="sec-financeiro" class="sec">
                        <div class="inst-metrics" style="margin-bottom: 1.5rem;">
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #F0FDF4; color: #16A34A;"><i data-lucide="check-circle"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Total Pago</div>
                                    <div class="metric-val">R$ <?= number_format($totalPago, 2, ',', '.') ?></div>
                                </div>
                            </div>
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #FEF2F2; color: #DC2626;"><i data-lucide="alert-circle"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Em Aberto</div>
                                    <div class="metric-val">R$ <?= number_format($totalPendente, 2, ',', '.') ?></div>
                                </div>
                            </div>
                            <div class="metric-box">
                                <div class="metric-icon" style="background: #EFF6FF; color: #2563EB;"><i data-lucide="calendar"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Próximo Vencimento</div>
                                    <div class="metric-val" style="font-size: 1.1rem; padding-top: 4px;"><?= $proximoVencimento ? date('d/m/Y', strtotime($proximoVencimento)) : 'Nenhum' ?></div>
                                </div>
                            </div>
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header">
                                <div><i data-lucide="credit-card" class="inst-icon"></i> Histórico de Faturas</div>
                            </div>

                            <style>
                                .finance-tabs {
                                    display: flex;
                                    justify-content: flex-start;
                                    gap: 24px;
                                    padding: 0 24px;
                                    border-bottom: 1px solid #E2E8F0;
                                    background: #fff;
                                }

                                .finance-tab {
                                    background: none;
                                    border: none;
                                    padding: 12px 4px;
                                    font-size: 0.9rem;
                                    font-weight: 500;
                                    color: #64748B;
                                    cursor: pointer;
                                    border-bottom: 2px solid transparent;
                                    transition: all 0.2s;
                                }

                                .finance-tab:hover {
                                    color: #0ea5e9;
                                }

                                .finance-tab.active {
                                    color: #0ea5e9;
                                    border-bottom-color: #0ea5e9;
                                    font-weight: 600;
                                }
                            </style>
                            <div class="finance-tabs">
                                <button class="finance-tab active" onclick="filtrarFaturas('todas', this)">Todas</button>
                                <button class="finance-tab" onclick="filtrarFaturas('pendente', this)">A Vencer</button>
                                <button class="finance-tab" onclick="filtrarFaturas('pago', this)">Pagos</button>
                            </div>

                            <div class="faturas-list" style="padding: 16px 24px; display: flex; flex-direction: column; gap: 16px;">
                                <?php if (empty($faturas)): ?>
                                    <div style="text-align:center; padding: 2rem; color: #94A3B8;">Nenhuma fatura encontrada.</div>
                                <?php else: ?>
                                    <?php foreach ($faturas as $fat): ?>
                                        <div class="fatura-row" data-status="<?= htmlspecialchars($fat['status']) ?>" style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #E2E8F0; padding: 16px; border-radius: 6px; background: #fff;">

                                            <div style="display: flex; align-items: center; gap: 16px; width: 30%;">
                                                <div style="color: #64748B;"><i data-lucide="user" style="width: 32px; height: 32px;"></i></div>
                                                <div>
                                                    <div style="font-size: 0.85rem; color: #64748B;"><?= htmlspecialchars($fat['competencia']) ?></div>
                                                    <div style="font-size: 1.1rem; font-weight: 600; color: #1E293B;">R$ <?= number_format($fat['valor'], 2, ',', '.') ?></div>
                                                </div>
                                            </div>

                                            <div style="width: 40%; font-size: 0.8rem; color: #475569; line-height: 1.5;">
                                                <div><span style="color: #94A3B8;">Aluno:</span> <?= htmlspecialchars($aluno['nome']) ?></div>
                                                <div><span style="color: #94A3B8;">Responsável:</span> <?= htmlspecialchars($aluno['nome']) ?></div>
                                                <div><span style="color: #94A3B8;">Período letivo:</span> <?= htmlspecialchars(date('Y', strtotime($fat['data_vencimento']))) . '-1S' ?></div>
                                            </div>

                                            <div style="width: 30%; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                                                <?php if ($fat['status'] === 'pago'): ?>
                                                    <a href="#" onclick="abrirComprovante('<?= htmlspecialchars($fat['id']) ?>', '<?= htmlspecialchars($fat['competencia']) ?>', '<?= number_format($fat['valor'], 2, ',', '.') ?>', '<?= date('d/m/Y', strtotime($fat['data_pagamento'] ?: $fat['data_vencimento'])) ?>', '<?= date('d/m/Y', strtotime($fat['data_vencimento'])) ?>'); return false;" style="font-size: 0.75rem; color: #0ea5e9; text-decoration: underline;">Exibir detalhamento</a>
                                                    <button onclick="abrirComprovante('<?= htmlspecialchars($fat['id']) ?>', '<?= htmlspecialchars($fat['competencia']) ?>', '<?= number_format($fat['valor'], 2, ',', '.') ?>', '<?= date('d/m/Y', strtotime($fat['data_pagamento'] ?: $fat['data_vencimento'])) ?>', '<?= date('d/m/Y', strtotime($fat['data_vencimento'])) ?>')" style="background: #0ea5e9; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 500; cursor: pointer;">Comprovante</button>
                                                <?php elseif ($fat['status'] === 'cancelado'): ?>
                                                    <span style="color: #94A3B8; font-size: 0.85rem; padding: 6px 12px; background: #F1F5F9; border-radius: 4px;">Cancelado</span>
                                                <?php else: ?>
                                                    <button onclick="iniciarPagamento(<?= $fat['id'] ?>)" style="background: #10B981; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 500; cursor: pointer; display: inline-block;"><i data-lucide="credit-card" style="width:14px;height:14px;margin-bottom:-2px;"></i> Pagar</button>
                                                <?php endif; ?>
                                            </div>

                                        </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div><!-- /sec-financeiro -->

                    
                    <!-- ==================== MEU PERFIL ==================== -->
                    <div id="sec-perfil" class="sec">
                        <style>
                            /* New premium styles for profile UNIAENE inspiration */
                            .perfil-page-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                            .perfil-page-title { font-size: 1.6rem; font-weight: 300; color: #1E293B; letter-spacing: 0.5px; text-transform: uppercase; }
                            .perfil-badge-status { background: #F1F5F9; color: #64748B; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
                            
                            .perfil-banner { display: flex; align-items: stretch; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 25px; overflow: hidden; }
                            .perfil-avatar-col { width: 180px; background: #FFFFFF; border-right: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: center; padding: 20px; }
                            .perfil-avatar-box { width: 120px; height: 120px; background: #1E293B; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 3rem; font-weight: bold; }
                            .perfil-info-col { flex: 1; padding: 25px 30px; display: flex; flex-direction: column; justify-content: center; gap: 15px; }
                            .perfil-info-item { display: flex; flex-direction: column; gap: 2px; }
                            .perfil-info-lbl { font-size: 0.75rem; color: #0EA5E9; font-weight: 600; }
                            .perfil-info-val { font-size: 0.9rem; color: #64748B; font-weight: 500; }
                            
                            .perfil-tabs { display: flex; gap: 30px; border-bottom: 1px solid #E2E8F0; margin-bottom: 30px; }
                            .perfil-tab { padding: 10px 0; font-size: 0.9rem; font-weight: 600; color: #94A3B8; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
                            .perfil-tab:hover { color: #64748B; }
                            .perfil-tab.active { color: #0EA5E9; border-bottom-color: #0EA5E9; }
                            
                            .perfil-section-block { margin-bottom: 40px; }
                            .perfil-section-title { font-size: 1rem; font-weight: 700; color: #0EA5E9; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid #E2E8F0; }
                            
                            .perfil-readonly-row { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 15px; }
                            .perfil-readonly-item { display: flex; flex-direction: column; gap: 6px; }
                            .perfil-readonly-lbl { font-size: 0.75rem; color: #94A3B8; font-weight: 600; }
                            .perfil-readonly-val-box { display: flex; align-items: center; border: 1px solid #E2E8F0; border-radius: 4px; padding: 10px 14px; background: #FFFFFF; }
                            .perfil-readonly-val { flex: 1; font-size: 0.9rem; color: #475569; font-weight: 500; }
                            .perfil-readonly-icon { width: 28px; height: 28px; background: #0EA5E9; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: background 0.2s; }
                            .perfil-readonly-icon:hover { background: #0284C7; }
                            
                            .perfil-empty-msg { display: flex; align-items: center; gap: 10px; background: #F0F9FF; border: 1px solid #BAE6FD; padding: 12px 16px; border-radius: 6px; color: #0369A1; font-size: 0.85rem; font-weight: 500; }
                            
                            .perfil-tab-content { display: none; animation: fadeIn 0.3s ease; }
                            .perfil-tab-content.active { display: block; }
                        </style>

                        <div class="perfil-page-hdr">
                            <div class="perfil-page-title"><?= htmlspecialchars($aluno['nome']) ?></div>
                            <div class="perfil-badge-status"><?= htmlspecialchars($aluno['situacao_aluno'] ?? 'Cursando') ?></div>
                        </div>

                        <div class="perfil-banner">
                            <div class="perfil-avatar-col">
                                <div class="perfil-avatar-box">
                                    <i data-lucide="user" style="width: 60px; height: 60px; opacity: 0.8;"></i>
                                </div>
                            </div>
                            <div class="perfil-info-col">
                                <div class="perfil-info-item">
                                    <div class="perfil-info-lbl">Registro acadêmico</div>
                                    <div class="perfil-info-val"><?= htmlspecialchars($aluno['ra'] ?? $aluno['id']) ?></div>
                                </div>
                                <div class="perfil-info-item">
                                    <div class="perfil-info-lbl">Curso</div>
                                    <div class="perfil-info-val"><?= htmlspecialchars($aluno['curso_nome'] ?? 'Não informado') ?></div>
                                </div>
                                <div class="perfil-info-item">
                                    <div class="perfil-info-lbl">Habilitação</div>
                                    <div class="perfil-info-val"><?= htmlspecialchars($aluno['curso_nome'] ?? 'Não informado') ?></div>
                                </div>
                                <div class="perfil-info-item">
                                    <div class="perfil-info-lbl">Turno</div>
                                    <div class="perfil-info-val">Noturno</div>
                                </div>
                            </div>
                        </div>

                        <div class="perfil-tabs">
                            <div class="perfil-tab active" onclick="switchPerfilMainTab('pessoais', this)">Dados pessoais</div>
                            <div class="perfil-tab" onclick="switchPerfilMainTab('profissionais', this)">Dados profissionais</div>
                            <div class="perfil-tab" onclick="switchPerfilMainTab('responsaveis', this)">Responsáveis</div>
                            <div class="perfil-tab" onclick="switchPerfilMainTab('documentos', this)">Documentos</div>
                        </div>

                        <div id="tab-content-pessoais" class="perfil-tab-content active">
                            <!-- Identificação -->
                            <div class="perfil-section-block">
                                <div class="perfil-section-title">Identificação</div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Data de nascimento:</div>
                                        <div class="perfil-readonly-val-box" style="border: none; padding: 0; background: transparent;">
                                            <span class="perfil-readonly-val"><?= htmlspecialchars($aluno['data_nascimento'] ?? '30/11/2006') ?></span>
                                        </div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Naturalidade:</div>
                                        <div class="perfil-readonly-val-box" style="border: none; padding: 0; background: transparent;">
                                            <span class="perfil-readonly-val">Não informado</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Estado natal:</div>
                                        <div class="perfil-readonly-val-box" style="border: none; padding: 0; background: transparent;">
                                            <span class="perfil-readonly-val">Não informado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Filiação -->
                            <div class="perfil-section-block">
                                <div class="perfil-section-title">Filiação</div>
                                <div class="perfil-empty-msg">
                                    <i data-lucide="info" style="width: 18px; height: 18px;"></i>
                                    Nenhum registro encontrado!
                                </div>
                            </div>

                            <!-- Contato -->
                            <div class="perfil-section-block">
                                <div class="perfil-section-title">Contato</div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">E-mail</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val"><?= htmlspecialchars($aluno['email'] ?? 'email@exemplo.com') ?></span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Celular</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val"><?= htmlspecialchars($aluno['telefone'] ?? '(00) 00000-0000') ?></span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Comercial</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val"></span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Residencial</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val"></span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Endereço -->
                            <div class="perfil-section-block">
                                <div class="perfil-section-title">Endereço</div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">CEP</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val">00000-000</span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Logradouro</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val">Rua das Amostras</span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab-content-profissionais" class="perfil-tab-content">
                            <div class="perfil-section-block">
                                <div class="perfil-section-title">Dados da Empresa</div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Empresa</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val">Tech Solutions S/A</span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Cargo</div>
                                        <div class="perfil-readonly-val-box">
                                            <span class="perfil-readonly-val">Jovem Aprendiz</span>
                                            <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="perfil-section-block">
                                <div class="perfil-section-title">Endereço Profissional</div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">CEP</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">00000-000</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Logradouro</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">Avenida Paulista</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                </div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Número</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">1000</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Complemento</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">Andar 5, Sala 501</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                </div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Bairro</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">Bela Vista</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Cidade</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">São Paulo</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                </div>
                                <div class="perfil-readonly-row">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Estado</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">SP</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Telefone da empresa</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">(11) 4002-8922</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                </div>
                                <div class="perfil-readonly-row" style="grid-template-columns: 1fr; max-width: 50%;">
                                    <div class="perfil-readonly-item">
                                        <div class="perfil-readonly-lbl">Horário de Trabalho</div>
                                        <div class="perfil-readonly-val-box"><span class="perfil-readonly-val">08:00 às 14:00</span><div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div></div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 20px; margin-bottom: 20px;">
                                <button class="inst-btn-primary" style="display: inline-flex; align-items: center; gap: 8px;"><i data-lucide="save" style="width: 16px; height: 16px;"></i> Atualizar informações</button>
                            </div>
                        </div>
                        
                        <div id="tab-content-responsaveis" class="perfil-tab-content">
                            <div class="perfil-banner" style="margin-top: 15px; margin-bottom: 25px; background: #FFFFFF; align-items: center; padding: 0;">
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px; border-right: 1px solid #E2E8F0; width: 220px;">
                                    <div class="perfil-avatar-box" style="width: 80px; height: 80px; background: #F1F5F9; color: #64748B; font-size: 2rem; margin-bottom: 10px; border-radius: 50%;">
                                        <i data-lucide="user" style="width: 40px; height: 40px;"></i>
                                    </div>
                                    <div style="font-weight: 700; color: #1E293B; font-size: 0.9rem; text-align: center; line-height: 1.2;">SAMOEL SILVA DO NASCIMENTO</div>
                                    <div style="font-size: 0.75rem; color: #64748B; margin-top: 10px;">Parentesco: <span style="color:#1E293B; font-weight: 500;">Outros</span></div>
                                    <div style="font-size: 0.75rem; color: #64748B; margin-top: 2px;">Status: <span style="color: #10B981; font-weight: 600;">Ativo</span></div>
                                </div>
                                <div style="flex: 1; padding: 25px;">
                                    <div class="perfil-section-title" style="margin-top: 0; padding-top: 0;">Dados do Responsável Financeiro</div>
                                    <div class="perfil-readonly-row">
                                        <div class="perfil-readonly-item">
                                            <div class="perfil-readonly-lbl">E-mail</div>
                                            <div class="perfil-readonly-val-box">
                                                <span class="perfil-readonly-val">samoelsilvadonascimento9@gmail.com</span>
                                                <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                            </div>
                                        </div>
                                        <div class="perfil-readonly-item">
                                            <div class="perfil-readonly-lbl">Telefone</div>
                                            <div class="perfil-readonly-val-box">
                                                <span class="perfil-readonly-val">94 99139-3708</span>
                                                <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="perfil-readonly-row">
                                        <div class="perfil-readonly-item">
                                            <div class="perfil-readonly-lbl">Celular</div>
                                            <div class="perfil-readonly-val-box">
                                                <span class="perfil-readonly-val"></span>
                                                <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                            </div>
                                        </div>
                                        <div class="perfil-readonly-item">
                                            <div class="perfil-readonly-lbl">Telefone comercial</div>
                                            <div class="perfil-readonly-val-box">
                                                <span class="perfil-readonly-val"></span>
                                                <div class="perfil-readonly-icon"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <button class="inst-btn-primary" style="display: inline-flex; align-items: center; gap: 8px;"><i data-lucide="save" style="width: 16px; height: 16px;"></i> Atualizar informações</button>
                            </div>
                        </div>

                        <div id="tab-content-documentos" class="perfil-tab-content">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                                <span style="font-size: 1.2rem; color: #1E293B; font-weight: 300;">Documentos:</span>
                                <div class="perfil-input-wrapper" style="width: 150px; background: #FFFFFF; border-radius: 4px;">
                                    <select style="font-weight: 600;"><option>2026-1S</option></select>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 20px; margin-bottom: 20px; font-size: 0.8rem; font-weight: 600;">
                                <div style="display: flex; align-items: center; gap: 6px; color: #F59E0B;"><i data-lucide="alert-circle" style="width: 14px;"></i> Não entregue</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: #3B82F6;"><i data-lucide="clock" style="width: 14px;"></i> Entregue em validação</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: #EF4444;"><i data-lucide="x-circle" style="width: 14px;"></i> Recusado</div>
                                <div style="display: flex; align-items: center; gap: 6px; color: #10B981;"><i data-lucide="check-circle" style="width: 14px;"></i> Validado</div>
                            </div>

                            <div style="background: var(--premium-surface); border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                                <table class="inst-table" style="margin: 0; border: none; font-size: 0.85rem;">
                                    <thead style="background: #FFFFFF; color: #1E293B;">
                                        <tr>
                                            <th style="color: #64748B; font-weight: 600; text-align: center; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Situação</th>
                                            <th style="color: #64748B; font-weight: 600; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Descrição</th>
                                            <th style="color: #64748B; font-weight: 600; text-align: center; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Envio</th>
                                            <th style="color: #64748B; font-weight: 600; text-align: center; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Obrigatório?</th>
                                            <th style="color: #64748B; font-weight: 600; text-align: center; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Qtd prevista | entregue</th>
                                            <th style="color: #64748B; font-weight: 600; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Data de entrega</th>
                                            <th style="color: #64748B; font-weight: 600; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #0EA5E9;">Prazo de entrega</th>
                                            <th style="color: #64748B; font-weight: 600; border-bottom: 1px solid #0EA5E9;">Motivo de rejeição</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="text-align: center; color: #10B981;"><i data-lucide="check-circle" style="width: 18px; margin: auto;"></i></td>
                                            <td style="font-weight: 600; color: #0EA5E9; cursor: pointer; text-decoration: underline;">Certificado de Conclusão do Ensino Médio</td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;">Sim</td>
                                            <td style="text-align: center;">1 | 1</td>
                                            <td>30/01/2026</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; color: #10B981;"><i data-lucide="check-circle" style="width: 18px; margin: auto;"></i></td>
                                            <td style="font-weight: 600; color: #0EA5E9; cursor: pointer; text-decoration: underline;">CPF</td>
                                            <td style="text-align: center;"></td>
                                            <td style="text-align: center;">Sim</td>
                                            <td style="text-align: center;">1 | 1</td>
                                            <td>04/02/2026</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; color: #F59E0B;"><i data-lucide="alert-circle" style="width: 18px; margin: auto;"></i></td>
                                            <td style="font-weight: 600;">RG/CN</td>
                                            <td style="text-align: center; color: #0EA5E9; cursor: pointer;"><i data-lucide="paperclip" style="width: 16px; margin: auto;"></i></td>
                                            <td style="text-align: center;">Não</td>
                                            <td style="text-align: center;">1 | 0</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; color: #F59E0B;"><i data-lucide="alert-circle" style="width: 18px; margin: auto;"></i></td>
                                            <td style="font-weight: 600;">Certidão de Nascimento ou Casamento</td>
                                            <td style="text-align: center; color: #0EA5E9; cursor: pointer;"><i data-lucide="paperclip" style="width: 16px; margin: auto;"></i></td>
                                            <td style="text-align: center;">Não</td>
                                            <td style="text-align: center;">1 | 0</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center; color: #F59E0B;"><i data-lucide="alert-circle" style="width: 18px; margin: auto;"></i></td>
                                            <td style="font-weight: 600;">Certificado de Dispensa Militar</td>
                                            <td style="text-align: center; color: #0EA5E9; cursor: pointer;"><i data-lucide="paperclip" style="width: 16px; margin: auto;"></i></td>
                                            <td style="text-align: center;">Não</td>
                                            <td style="text-align: center;">1 | 0</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <script>
                            function switchPerfilMainTab(tabId, element) {
                                document.querySelectorAll('.perfil-tab').forEach(el => el.classList.remove('active'));
                                if(element) element.classList.add('active');
                                document.querySelectorAll('.perfil-tab-content').forEach(el => el.classList.remove('active'));
                                const target = document.getElementById('tab-content-' + tabId);
                                if(target) target.classList.add('active');
                            }
                        </script>
                    </div><!-- /sec-perfil -->
                    
                    <!-- ==================== HORARIOS ==================== -->
                    <div id="sec-horarios" class="sec">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-title">Agenda Acadêmica</div>
                                <div class="ph-sub">Cronograma de aulas e eventos da sua turma</div>
                            </div>
                        </div>

                        <div class="finance-tabs" style="border-bottom: 1px solid #E2E8F0; margin-bottom: 1.5rem;">
                            <button class="finance-tab active" onclick="switchHorarioTab('quadro', this)">Quadro de Horário</button>
                            <button class="finance-tab" onclick="switchHorarioTab('calendario', this)">Calendário</button>
                        </div>

                        <!-- TAB QUADRO -->
                        <div id="tab-quadro">
                            <div style="font-size: 1.1rem; margin-bottom: 1rem; font-weight: 500;">
                                Quadro de Horário: <select style="padding: 4px; border: 1px solid #ccc; border-radius: 4px;">
                                    <option>2026-1S</option>
                                </select>
                            </div>
                            <div style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; min-width: 800px; font-size: 0.75rem; text-align: left;">
                                    <thead>
                                        <tr style="background: #64748B; color: #fff;">
                                            <th style="padding: 8px; width: 60px; text-align:center;"></th>
                                            <th style="padding: 8px; text-align:center;">Segunda</th>
                                            <th style="padding: 8px; text-align:center;">Terça</th>
                                            <th style="padding: 8px; text-align:center;">Quarta</th>
                                            <th style="padding: 8px; text-align:center;">Quinta</th>
                                            <th style="padding: 8px; text-align:center;">Sexta</th>
                                            <th style="padding: 8px; text-align:center;">Sábado</th>
                                        </tr>
                                    </thead>
                                    <tbody style="color: #475569;">
                                        <?php 
                                        $dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                                        foreach (['Manhã', 'Tarde', 'Noite'] as $t_nome): 
                                        ?>
                                        <tr>
                                            <td style="padding: 8px; border: 1px solid #E2E8F0; background: #cbd5e1; text-align: center; color: #fff; font-weight: bold;"><?= str_replace(' - ', '<br>', $turnos_labels[$t_nome]) ?></td>
                                            <?php foreach ($dias as $d): ?>
                                                <td style="border: 1px solid #E2E8F0; padding: 4px; vertical-align: top;">
                                                    <?php 
                                                    if (isset($quadro[$t_nome][$d])) {
                                                        foreach ($quadro[$t_nome][$d] as $aula) {
                                                            echo '<i data-lucide="star" style="width:10px; height:10px; display:inline-block; margin-right:4px;"></i>' . htmlspecialchars($aula['disciplina_nome']) . '<br><span style="font-size:0.65rem;color:#94A3B8;">' . date('H:i', strtotime($aula['hora_inicio'])) . ' às ' . date('H:i', strtotime($aula['hora_fim'])) . '</span><br>';
                                                        }
                                                    }
                                                    ?>
                                                </td>
                                            <?php endforeach; ?>
                                        </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- TAB CALENDÁRIO -->
                        <div id="tab-calendario" style="display: none;">
                            <div style="font-size: 1.1rem; margin-bottom: 1rem; font-weight: 500;">
                                Calendário: <select style="padding: 4px; border: 1px solid #ccc; border-radius: 4px;">
                                    <option>2026-1S</option>
                                </select>
                            </div>

                            <div style="margin-bottom: 2rem;">
                                <div style="font-weight: bold; color: #0ea5e9; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Disciplinas em Curso</div>
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
                                    <?php 
                                    $colors = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];
                                    $ci = 0;
                                    foreach ($horariosDb as $h): 
                                        $color = $colors[$ci % count($colors)]; $ci++;
                                    ?>
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid <?= $color ?>;">
                                        <div style="font-weight: 600; color: #1E293B; margin-bottom: 8px; font-size: 0.9rem;"><?= htmlspecialchars($h['disciplina_nome']) ?></div>
                                        <div style="font-size: 0.8rem; color: #64748B; display: flex; align-items: center; gap: 4px;">
                                            <i data-lucide="clock" style="width: 14px; height: 14px;"></i> <?= $h['dia_semana'] ?>: <?= date('H:i', strtotime($h['hora_inicio'])) ?> às <?= date('H:i', strtotime($h['hora_fim'])) ?>
                                        </div>
                                    </div>
                                    <?php endforeach; ?>
                                    <?php if(empty($horariosDb)) echo "<div style='color:#94A3B8; font-size: 0.9rem;'>Nenhum horário cadastrado para a sua turma.</div>"; ?>
                                </div>
                            </div>

                            <div id="calendar" style="font-size: 0.85rem;"></div>
                        </div>
                    </div>

                    <!-- ==================== HISTÓRICO ==================== -->
                    <div id="sec-historico" class="sec">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-title">Histórico Escolar</div>
                                <div class="ph-sub">Documento oficial de notas e carga horária cumprida</div>
                            </div>
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header" style="display: flex; justify-content: space-between; align-items: center;">
                                <div><i data-lucide="file-text" class="inst-icon"></i> Grade Curricular Cumprida</div>
                                <a href="../reports/historico_print.php?aluno_id=<?= $aluno['id'] ?>" target="_blank" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #0ea5e9; font-weight: 600; text-decoration: none; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 6px; background: #f0f9ff; transition: all 0.2s; cursor: pointer;">
                                    <i data-lucide="download" style="width: 14px; height: 14px;"></i> Baixar PDF
                                </a>
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
                                        <td class="td-primary" style="font-weight: 600;">Segurança do Trabalho e EPIs</td>
                                        <td style="text-align:center; font-weight: 500; color: var(--c-text-muted);">40h</td>
                                        <td style="text-align:center;"><span class="inst-status status-ok" style="background: #ECFDF5; color: #059669; padding: 4px 10px; border-radius: 20px; font-weight: 700;">Concluído</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2025/2</td>
                                        <td class="td-primary" style="font-weight: 600;">Desenho Técnico Mecânico</td>
                                        <td style="text-align:center; font-weight: 500; color: var(--c-text-muted);">60h</td>
                                        <td style="text-align:center;"><span class="inst-status status-ok" style="background: #ECFDF5; color: #059669; padding: 4px 10px; border-radius: 20px; font-weight: 700;">Concluído</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2026/1</td>
                                        <td class="td-primary" style="font-weight: 600;">Elementos de Máquinas</td>
                                        <td style="text-align:center; font-weight: 500; color: var(--c-text-muted);">80h</td>
                                        <td style="text-align:center;"><span class="inst-status" style="background: #EFF6FF; color: #2563EB; padding: 4px 10px; border-radius: 20px; font-weight: 700;">Cursando</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2026/1</td>
                                        <td class="td-primary" style="font-weight: 600;">Informática Básica e Office</td>
                                        <td style="text-align:center; font-weight: 500; color: var(--c-text-muted);">40h</td>
                                        <td style="text-align:center;"><span class="inst-status" style="background: #EFF6FF; color: #2563EB; padding: 4px 10px; border-radius: 20px; font-weight: 700;">Cursando</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 500; color: var(--c-text-muted);">2026/1</td>
                                        <td class="td-primary" style="font-weight: 600;">Relações Humanas no Trabalho</td>
                                        <td style="text-align:center; font-weight: 500; color: var(--c-text-muted);">20h</td>
                                        <td style="text-align:center;"><span class="inst-status" style="background: #EFF6FF; color: #2563EB; padding: 4px 10px; border-radius: 20px; font-weight: 700;">Cursando</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!-- /sec-historico -->

                                        <!-- ==================== SECRETARIA ==================== -->
                    <div id="sec-secretaria" class="sec">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-title">Secretaria Online</div>
                                <div class="ph-sub">Atendimento e solicitação de requerimentos institucionais</div>
                            </div>
                        </div>

                        <div class="finance-tabs" style="border-bottom: 1px solid #E2E8F0; margin-bottom: 1.5rem;">
                            <button class="finance-tab sec-tab active" onclick="switchSecretariaTab('disponiveis', this)" style="padding-bottom: 12px; font-weight: 500; font-size: 0.9rem;">Novo Requerimento</button>
                            <button class="finance-tab sec-tab" onclick="switchSecretariaTab('solicitados', this)" style="padding-bottom: 12px; font-weight: 500; font-size: 0.9rem;">Meus Pedidos</button>
                        </div>

                        <!-- ABA DISPONÍVEIS -->
                        <div id="tab-sec-disponiveis">
                            <div class="inst-card" style="max-width: 700px; border-top: 4px solid #0EA5E9;">
                                <div class="inst-card-header" style="border-bottom: 1px solid var(--premium-border);">
                                    <div><i data-lucide="folder-plus" class="inst-icon"></i> Solicitar Documentos</div>
                                </div>
                                <div style="padding: 2rem;">
                                    <?php if(isset($_GET['req']) && $_GET['req'] == 'sucesso'): ?>
                                        <div style="background: #D1FAE5; border: 1px solid #34D399; color: #065F46; padding: 16px; border-radius: 8px; margin-bottom: 20px; font-size: 0.95rem; display: flex; align-items: center; gap: 10px;">
                                            <i data-lucide="check-circle" style="width: 20px;"></i> Sua solicitação foi enviada com sucesso! Acompanhe em "Meus Pedidos".
                                        </div>
                                        <script>
                                            setTimeout(() => { switchSecretariaTab('solicitados', document.querySelectorAll('.sec-tab')[1]); }, 2500);
                                        </script>
                                    <?php endif; ?>
                                    <form method="POST" action="portal_aluno.php">
                                        <input type="hidden" name="action" value="novo_requerimento">
                                        
                                        <div class="perfil-input-group" style="margin-bottom: 20px;">
                                            <label>Tipo de Solicitação</label>
                                            <div class="perfil-input-wrapper">
                                                <i data-lucide="file-text"></i>
                                                <select name="tipo_solicitacao" required style="cursor: pointer;">
                                                    <option value="" disabled selected>Selecione um documento...</option>
                                                    <option value="Declaração de Matrícula">Declaração de Matrícula</option>
                                                    <option value="Atestado de Frequência">Atestado de Frequência</option>
                                                    <option value="Envio de Folha de Ponto (Empresa)">Envio de Folha de Ponto (Empresa)</option>
                                                    <option value="Justificativa de Falta (Atestado Médico)">Justificativa de Falta (Atestado Médico)</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="perfil-input-group" style="margin-bottom: 25px;">
                                            <label>Observações Adicionais</label>
                                            <div style="background: var(--premium-surface); border: 1px solid var(--premium-border); border-radius: 6px; overflow: hidden; padding: 5px;">
                                                <textarea name="observacoes" style="width:100%; height:100px; border: none; outline: none; background: transparent; color: var(--premium-text); font-family: inherit; font-size: 0.9rem; padding: 10px;" placeholder="Descreva sua solicitação detalhadamente..."></textarea>
                                            </div>
                                        </div>
                                        
                                        <div style="display: flex; justify-content: flex-end;">
                                            <button type="submit" class="inst-btn-primary" style="padding: 12px 24px; font-size: 1rem;"><i data-lucide="send" style="width: 18px; margin-right: 8px;"></i> Enviar Solicitação</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!-- ABA SOLICITADOS -->
                        <div id="tab-sec-solicitados" style="display: none;">
                            <div class="inst-card">
                                <div class="inst-card-header">
                                    <div><i data-lucide="inbox" class="inst-icon"></i> Acompanhamento de Pedidos</div>
                                </div>
                                <table class="inst-table">
                                    <thead>
                                        <tr>
                                            <th>Protocolo</th>
                                            <th>Solicitação</th>
                                            <th>Data</th>
                                            <th style="text-align:right;">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty($requerimentosDb)): ?>
                                            <tr>
                                                <td colspan="4" style="text-align:center; padding: 3rem; color: var(--premium-text-muted);">
                                                    <i data-lucide="folder-open" style="width: 40px; height: 40px; margin-bottom: 10px; opacity: 0.5;"></i><br>
                                                    Nenhum pedido aberto no momento.
                                                </td>
                                            </tr>
                                        <?php else: ?>
                                            <?php foreach ($requerimentosDb as $req):
                                                $statusClass = 'status-warn';
                                                $statusText = 'Pendente';
                                                if ($req['status'] === 'em_andamento') { $statusClass = 'status-warn'; $statusText = 'Em Andamento'; }
                                                if ($req['status'] === 'concluido') { $statusClass = 'status-ok'; $statusText = 'Concluído'; }
                                                if ($req['status'] === 'recusado') { $statusClass = 'status-warn'; $statusText = 'Recusado'; }
                                            ?>
                                                <tr>
                                                    <td class="td-primary" style="font-weight: 600;">#<?= htmlspecialchars($req['protocolo']) ?></td>
                                                    <td style="color: var(--premium-text);"><?= htmlspecialchars($req['tipo']) ?></td>
                                                    <td style="color: var(--premium-text-muted);"><i data-lucide="calendar" style="width: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> <?= date('d/m/Y', strtotime($req['data_solicitacao'])) ?></td>
                                                    <td style="text-align:right;"><span class="inst-status <?= $statusClass ?>"><?= $statusText ?></span></td>
                                                </tr>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div><!-- /sec-secretaria -->

                    <!-- ==================== MURAL DE AVISOS ==================== -->
                    <div id="sec-mural" class="sec">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-title">Mural de Avisos</div>
                                <div class="ph-sub">Fique por dentro das últimas novidades da instituição</div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <?php if (empty($avisosDb)): ?>
                                <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; background: #fff; text-align:center; color: #94A3B8;">
                                    Nenhum aviso no mural no momento.
                                </div>
                            <?php else: ?>
                                <?php foreach ($avisosDb as $aviso): 
                                    $bColor = '#0ea5e9'; // info default
                                    if ($aviso['tipo'] === 'evento') $bColor = '#10b981';
                                    if ($aviso['tipo'] === 'urgente') $bColor = '#ef4444';
                                    if ($aviso['tipo'] === 'alerta') $bColor = '#f59e0b';
                                ?>
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; background: #fff; border-left: 4px solid <?= $bColor ?>;">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                            <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem;"><?= htmlspecialchars($aviso['titulo']) ?></div>
                                            <span style="font-size: 0.75rem; color: #64748B;"><?= date('d/m/Y H:i', strtotime($aviso['data_publicacao'])) ?></span>
                                        </div>
                                        <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;"><?= nl2br(htmlspecialchars($aviso['conteudo'])) ?></p>
                                    </div>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- ==================== OPORTUNIDADES ==================== -->
                    <div id="sec-oportunidades" class="sec">
                        <div class="page-hdr">
                            <div>
                                <div class="ph-title">Oportunidades de Carreira</div>
                                <div class="ph-sub">Vagas de estágio e emprego nas nossas empresas parceiras</div>
                            </div>
                        </div>

                        <div class="finance-tabs" style="border-bottom: 1px solid #E2E8F0; margin-bottom: 1rem;">
                            <button class="finance-tab op-tab active" onclick="switchOportunidadesTab('vagas', this)" style="padding-bottom: 12px; font-weight: 500; font-size: 0.9rem;">Vagas disponíveis/inscritas</button>
                            <button class="finance-tab op-tab" onclick="switchOportunidadesTab('acompanhamento', this)" style="padding-bottom: 12px; font-weight: 500; font-size: 0.9rem;">Acompanhamento de estágios</button>
                        </div>
                        
                        <div id="tab-vagas">
                            <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 24px; font-size: 0.85rem; color: #475569;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="filtro_vagas" value="todas" onchange="filtrarOportunidades('todas')" checked style="accent-color: #0ea5e9; width: 16px; height: 16px;"> <span style="font-weight: 500;">Exibir todas as vagas</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="filtro_vagas" value="disponiveis" onchange="filtrarOportunidades('disponiveis')" style="accent-color: #0ea5e9; width: 16px; height: 16px;"> Vagas disponíveis
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="filtro_vagas" value="inscritas" onchange="filtrarOportunidades('inscritas')" style="accent-color: #0ea5e9; width: 16px; height: 16px;"> Vagas inscritas
                                </label>
                            </div>

                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
                                <?php if (empty($vagasDb)): ?>
                                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #94A3B8; background: #fff; border: 1px solid #E2E8F0; border-radius: 8px;">
                                        Nenhuma vaga disponível no momento.
                                    </div>
                                <?php else: ?>
                                    <?php if(isset($_GET['cand']) && $_GET['cand'] == 'sucesso'): ?>
                                        <div style="grid-column: 1 / -1; background: #D1FAE5; color: #065F46; padding: 12px; border-radius: 6px; font-size: 0.9rem;">
                                            Candidatura realizada com sucesso! Boa sorte!
                                        </div>
                                    <?php elseif(isset($_GET['cand']) && $_GET['cand'] == 'erro'): ?>
                                        <div style="grid-column: 1 / -1; background: #FEE2E2; color: #991B1B; padding: 12px; border-radius: 6px; font-size: 0.9rem;">
                                            Você já está inscrito nesta vaga.
                                        </div>
                                    <?php endif; ?>
                                    
                                    <?php foreach ($vagasDb as $vaga): 
                                        $empresa = $vaga['empresa_nome_rel'] ?: $vaga['empresa_nome'];
                                        $inscrito = in_array($vaga['id'], $minhasCandidaturas);
                                        
                                        $badgeBg = '#e0f2fe'; $badgeColor = '#0284c7'; $badgeText = 'ESTÁGIO';
                                        if ($vaga['tipo'] === 'aprendiz') { $badgeBg = '#dcfce7'; $badgeColor = '#166534'; $badgeText = 'APRENDIZ'; }
                                        if ($vaga['tipo'] === 'emprego') { $badgeBg = '#f3e8ff'; $badgeColor = '#7e22ce'; $badgeText = 'EMPREGO'; }
                                    ?>
                                    <div class="vaga-card" data-inscrito="<?= $inscrito ? 'true' : 'false' ?>" style="border: 1px solid <?= $inscrito ? '#A7F3D0' : '#E2E8F0' ?>; border-radius: 8px; background: #fff; overflow: hidden; display: flex; flex-direction: column;">
                                        <div style="padding: 20px; border-bottom: 1px solid #E2E8F0; flex-grow: 1;">
                                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                                <div>
                                                    <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem; margin-bottom: 4px;"><?= htmlspecialchars($vaga['titulo']) ?></div>
                                                    <div style="font-size: 0.85rem; color: #64748B;"><i data-lucide="building" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> <?= htmlspecialchars($empresa) ?></div>
                                                </div>
                                                <span style="background: <?= $badgeBg ?>; color: <?= $badgeColor ?>; font-size: 0.7rem; font-weight: bold; padding: 4px 8px; border-radius: 4px;"><?= $badgeText ?></span>
                                            </div>
                                            <div style="font-size: 0.85rem; color: #475569; margin-bottom: 16px; line-height: 1.4;"><?= nl2br(htmlspecialchars($vaga['descricao'])) ?></div>
                                            <div style="display: flex; gap: 12px; font-size: 0.8rem; color: #64748B;">
                                                <div style="display: flex; align-items: center; gap: 4px; text-transform: capitalize;"><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> <?= htmlspecialchars($vaga['modalidade']) ?></div>
                                                <?php if ($vaga['bolsa']): ?>
                                                <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="dollar-sign" style="width: 14px; height: 14px;"></i> R$ <?= number_format($vaga['bolsa'], 2, ',', '.') ?></div>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                        <div style="padding: 12px 20px; background: <?= $inscrito ? '#ECFDF5' : '#F8FAFC' ?>; display: flex; justify-content: flex-end;">
                                            <?php if ($inscrito): ?>
                                                <span style="color: #10B981; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;"><i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> Inscrito</span>
                                            <?php else: ?>
                                                <form method="POST" action="portal_aluno.php">
                                                    <input type="hidden" name="action" value="candidatar">
                                                    <input type="hidden" name="vaga_id" value="<?= $vaga['id'] ?>">
                                                    <button type="submit" style="background: #0ea5e9; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#0284c7'" onmouseout="this.style.background='#0ea5e9'">Candidatar-se</button>
                                                </form>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div> <!-- /tab-vagas -->
                        
                        <div id="tab-acompanhamento" style="display: none;">
                            <div class="inst-card" style="padding: 2rem;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid var(--premium-border); padding-bottom: 1.5rem;">
                                    <div>
                                        <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--premium-text); margin: 0 0 0.5rem 0;">Meu Contrato Atual</h3>
                                        <div style="font-size: 0.9rem; color: var(--premium-text-muted);">Acompanhe o andamento das suas atividades na empresa.</div>
                                    </div>
                                    <span class="pill pill-ok" style="font-size: 0.8rem; padding: 6px 16px;">Contrato Ativo</span>
                                </div>
                                
                                <div class="grid-2" style="gap: 2rem;">
                                    <div>
                                        <div style="margin-bottom: 1.5rem;">
                                            <label style="font-size: 0.75rem; font-weight: 600; color: var(--premium-text-muted); text-transform: uppercase;">Empresa Concedente</label>
                                            <div style="font-size: 1rem; font-weight: 500; color: var(--premium-text); margin-top: 4px;"><?= htmlspecialchars($aluno['empresa_nome'] ?? 'Vale S.A.') ?></div>
                                        </div>
                                        <div style="margin-bottom: 1.5rem;">
                                            <label style="font-size: 0.75rem; font-weight: 600; color: var(--premium-text-muted); text-transform: uppercase;">Vigência</label>
                                            <div style="font-size: 0.9rem; color: var(--premium-text); margin-top: 4px;">01/02/2026 a 31/01/2027</div>
                                        </div>
                                    </div>
                                    
                                    <div style="background: var(--premium-surface); border: 1px solid var(--premium-border); border-radius: 8px; padding: 1.5rem;">
                                        <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--premium-text); margin: 0 0 1rem 0;">Próximas Entregas</h4>
                                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                                            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                                                <div style="width: 12px; height: 12px; background: #0EA5E9; border-radius: 50%; margin-top: 4px;"></div>
                                                <div>
                                                    <div style="font-size: 0.85rem; font-weight: 600; color: var(--premium-text);">Relatório Mensal - Maio</div>
                                                    <div style="font-size: 0.75rem; color: var(--premium-text-muted);">Prazo: 10/06/2026</div>
                                                </div>
                                            </div>
                                            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                                                <div style="width: 12px; height: 12px; background: #F59E0B; border-radius: 50%; margin-top: 4px;"></div>
                                                <div>
                                                    <div style="font-size: 0.85rem; font-weight: 600; color: var(--premium-text);">Avaliação de Desempenho (Gestor)</div>
                                                    <div style="font-size: 0.75rem; color: var(--premium-text-muted);">Prazo: 15/07/2026</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- /tab-acompanhamento -->
                    </div>

                </main>
            </div>
        </div>

        <!-- MODAL COMPROVANTE -->
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(15, 23, 42, 0.6);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(2px);
            }

            .modal-overlay.active {
                display: flex;
            }

            .modal-box {
                background: #fff;
                border-radius: 8px;
                width: 100%;
                max-width: 800px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .modal-header {
                background: #0ea5e9;
                color: #fff;
                padding: 16px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-close {
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
            }

            .comp-body {
                padding: 24px;
                font-family: Arial, sans-serif;
                color: #000;
            }

            .comp-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 0.8rem;
                border: 1px solid #000;
            }

            .comp-table td,
            .comp-table th {
                border: 1px solid #000;
                padding: 6px;
            }

            .comp-footer {
                padding: 16px 24px;
                border-top: 1px solid #E2E8F0;
                display: flex;
                justify-content: flex-end;
                gap: 12px;
            }
        </style>

        <div id="modalComprovante" class="modal-overlay">
            <div class="modal-box">
                <div class="modal-header">
                    <div style="font-size: 1.1rem; font-weight: 500;">Comprovante</div>
                    <button class="modal-close" onclick="fecharComprovante()"><i data-lucide="x"></i></button>
                </div>
                <div class="comp-body" id="comp-print-area">
                    <table class="comp-table">
                        <tr>
                            <td colspan="2" style="font-weight: bold; font-size: 0.9rem;">
                                Centro Técnico Sophie Link<br>
                                <span style="font-size: 0.7rem; font-weight: normal;">CNPJ: 07.114.699/0050-48</span>
                            </td>
                            <td colspan="2" style="text-align: center; font-weight: bold; font-size: 0.9rem;">
                                Comprovante de Pagamento
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="width: 50%; vertical-align: top;">
                                RA: <?= htmlspecialchars($aluno['id']) ?><br>
                                Aluno: <?= htmlspecialchars($aluno['nome']) ?><br>
                                Responsável: <?= htmlspecialchars($aluno['nome']) ?><br>
                                CPF: <?= htmlspecialchars($aluno['cpf'] ?? 'Não informado') ?>
                            </td>
                            <td style="text-align: center; vertical-align: middle; width: 25%;">
                                <h2 style="color: #0ea5e9; margin: 0; font-family: 'Syne', sans-serif;">SOPHIE LINK</h2>
                            </td>
                            <td style="width: 25%; vertical-align: top;">
                                Contrato: <span id="comp-contrato"></span><br>
                                Parcela: <span id="comp-parcela"></span><br>
                                Vencimento: <span id="comp-vencimento"></span><br>
                                Data Pgto: <span id="comp-pgto"></span><br>
                                Método Pgto: PIX<br>
                                Status: Pago
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style="font-weight: bold;">Resumo de Lançamentos do Boleto:</td>
                            <td style="font-weight: bold; text-align: right;">Valor</td>
                        </tr>
                        <tr>
                            <td colspan="3">Serviços Educacionais - Aprendizagem</td>
                            <td style="text-align: right;" id="comp-valor"></td>
                        </tr>
                        <tr>
                            <td colspan="3">Juros / Multa</td>
                            <td style="text-align: right;">R$ 0,00</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="text-align: right; font-weight: bold; font-size: 0.9rem;">Valor Pago:</td>
                            <td style="text-align: right; font-weight: bold; font-size: 0.9rem;" id="comp-total"></td>
                        </tr>
                    </table>
                </div>
                <div class="comp-footer">
                    <button style="background: #0ea5e9; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center;" onclick="imprimirComprovante()"><i data-lucide="printer" style="width:16px; margin-right:6px;"></i> Imprimir</button>
                    <button style="background: #0ea5e9; color: #fff; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;" onclick="fecharComprovante()">Cancelar</button>
                </div>
            </div>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script>
            function abrirComprovante(id, comp, valor, pgto, venc) {
                document.getElementById('comp-contrato').textContent = id;
                document.getElementById('comp-parcela').textContent = comp;
                document.getElementById('comp-vencimento').textContent = venc;
                document.getElementById('comp-pgto').textContent = pgto;
                document.getElementById('comp-valor').textContent = 'R$ ' + valor;
                document.getElementById('comp-total').textContent = 'R$ ' + valor;
                document.getElementById('modalComprovante').classList.add('active');
            }

            function fecharComprovante() {
                document.getElementById('modalComprovante').classList.remove('active');
            }

            function imprimirComprovante() {
                const element = document.getElementById('comp-print-area');

                // Opções do PDF
                const opt = {
                    margin: 10,
                    filename: 'comprovante.pdf',
                    image: {
                        type: 'jpeg',
                        quality: 0.98
                    },
                    html2canvas: {
                        scale: 2
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'landscape'
                    }
                };

                // Gera o PDF como blob URL e abre em nova aba
                html2pdf().set(opt).from(element).outputPdf('bloburl').then(function(pdfUrl) {
                    window.open(pdfUrl, '_blank');
                });
            }
        </script>
        <style>
            /* FullCalendar Uniaene Theme */
            .fc-theme-standard .fc-scrollgrid { border: 1px solid #E2E8F0; }
            .fc .fc-col-header-cell { background-color: #64748B; padding: 6px 0; border: 1px solid #E2E8F0; }
            .fc .fc-col-header-cell-cushion { color: #ffffff !important; font-weight: normal; text-transform: lowercase; font-size: 0.85rem; text-decoration: none; }
            .fc .fc-daygrid-day-number { color: #475569; font-size: 0.75rem; padding: 4px 8px; text-decoration: none; }
            .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #E2E8F0; }
            .fc-day-today { background-color: #F8FAFC !important; }
            .fc-event { background: transparent !important; border: none !important; }
            .fc-daygrid-event-harness { margin-bottom: 2px !important; }
            .fc-toolbar-title { font-size: 1.1rem !important; font-weight: 600; color: #1E293B; text-transform: lowercase; }
            .fc .fc-button-primary { background-color: #1E293B !important; border-color: #1E293B !important; text-transform: lowercase; font-size: 0.8rem !important; padding: 4px 12px !important; }
            .fc .fc-button-primary:hover { background-color: #0f172a !important; border-color: #0f172a !important; }
            .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active { background-color: #0f172a !important; border-color: #0f172a !important; }
            .custom-fc-event { font-size: 0.65rem; padding: 2px 4px; color: #475569; white-space: normal; line-height: 1.2; }
            .custom-fc-event strong { color: #0ea5e9; font-weight: 600; }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                var calendarEl = document.getElementById('calendar');
                if (calendarEl) {
                    var calendar = new FullCalendar.Calendar(calendarEl, {
                        initialView: 'dayGridMonth',
                        initialDate: '2026-06-01',
                        locale: 'pt-br',
                        headerToolbar: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek'
                        },
                        buttonText: {
                            today: 'hoje',
                            month: 'mês',
                            week: 'semana'
                        },
                        events: <?= $events_json ?>,
                        eventContent: function(arg) {
                            return {
                                html: '<div class="custom-fc-event"><strong>Aula:</strong> ' + arg.event.title + '</div>'
                            };
                        }
                    });
                    calendar.render();
                    window.dispatchEvent(new Event('resize'));
                }
            });
        </script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="../assets/js/portais/aluno.js?v=<?= time() ?>"></script>
        <div id="modalNotas" class="modal-overlay" onclick="fecharModalNotas()">
            <div class="modal-box" onclick="event.stopPropagation()" style="max-width: 850px; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div style="background: #FFFFFF; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0; border-bottom: 1px solid #E2E8F0;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="background: #FFF0E6; color: #FF6B00; padding: 10px; border-radius: 10px; display: flex;"><i data-lucide="award" style="width: 22px; height: 22px;"></i></div>
                        <div>
                            <span style="font-size: 0.75rem; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Desempenho na Disciplina</span>
                            <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin-top: 2px;" id="modalNotasTitle">Disciplina</h3>
                        </div>
                    </div>
                    <button class="modal-close" onclick="fecharModalNotas()" style="background: #F1F5F9; border: none; color: #64748B; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#E2E8F0'; this.style.color='#0F172A';" onmouseout="this.style.background='#F1F5F9'; this.style.color='#64748B';"><i data-lucide="x" style="width: 18px; height: 18px;"></i></button>
                </div>
                <div class="comp-body" style="padding: 24px; background: #F8FAFC;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">FILTRAR ETAPA:</span>
                            <select style="padding: 8px 16px; border-radius: 8px; border: 1px solid #CBD5E1; font-size: 0.85rem; font-weight: 600; color: #1E293B; background: #FFFFFF; outline: none; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                <option>Todas as Etapas</option>
                            </select>
                        </div>
                    </div>

                    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                        <div style="max-height: 300px; overflow-y: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; color: #334155;">
                                <thead style="position: sticky; top: 0; z-index: 10; background: #FFFFFF;">
                                    <tr>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 700; font-size: 0.75rem; color: #64748B; text-transform: uppercase; border-bottom: 2px solid #E2E8F0;">Etapa</th>
                                        <th style="padding: 16px 20px; text-align: center; font-weight: 700; font-size: 0.75rem; color: #64748B; text-transform: uppercase; border-bottom: 2px solid #E2E8F0;">Data</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 700; font-size: 0.75rem; color: #64748B; text-transform: uppercase; border-bottom: 2px solid #E2E8F0;">Avaliação</th>
                                        <th style="padding: 16px 20px; text-align: center; font-weight: 700; font-size: 0.75rem; color: #64748B; text-transform: uppercase; border-bottom: 2px solid #E2E8F0;">Peso</th>
                                        <th style="padding: 16px 20px; text-align: center; font-weight: 700; font-size: 0.75rem; color: #64748B; text-transform: uppercase; border-bottom: 2px solid #E2E8F0;">Nota</th>
                                        <th style="padding: 16px 20px; text-align: center; font-weight: 700; font-size: 0.75rem; color: #64748B; text-transform: uppercase; border-bottom: 2px solid #E2E8F0;">Devolução</th>
                                    </tr>
                                </thead>
                                <tbody id="modalNotasBody">
                                    <!-- Conteúdo será injetado via JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="comp-footer" style="padding: 20px 24px; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end; border-radius: 0 0 16px 16px;">
                    <button style="background: #FF6B00; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; border: none; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(255, 107, 0, 0.2);" onmouseover="this.style.background='#D95A00'; this.style.transform='translateY(-1px)';" onmouseout="this.style.background='#FF6B00'; this.style.transform='translateY(0)';">
                        Ver Detalhes da Disciplina
                        <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            </div>
        </div>

    </div><!-- /.app -->

    <script src="../assets/js/portais/aluno.js?v=12"></script>
</body>
</html>