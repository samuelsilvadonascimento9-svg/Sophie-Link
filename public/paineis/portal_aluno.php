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

foreach ($faturas as $fat) {
    if ($fat['status'] === 'pago') $totalPago += $fat['valor'];
    if ($fat['status'] === 'pendente') {
        $totalPendente += $fat['valor'];
        if (!$proximoVencimento || strtotime($fat['data_vencimento']) < strtotime($proximoVencimento)) {
            $proximoVencimento = $fat['data_vencimento'];
        }
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
            <a href="#" class="nav-link" onclick="showSec('horarios',this)"><i data-lucide="calendar"></i> Agenda Acadêmica</a>
            <a href="#" class="nav-link" onclick="showSec('mural',this)"><i data-lucide="bell"></i> Mural de Avisos</a>
            <a href="#" class="nav-link" onclick="showSec('oportunidades',this)"><i data-lucide="briefcase"></i> Oportunidades</a>
            <a href="#" class="nav-link" onclick="showSec('historico',this)"><i data-lucide="file-text"></i> Histórico Escolar</a>
            <a href="#" class="nav-link" onclick="showSec('secretaria',this)"><i data-lucide="folder-open"></i> Secretaria</a>
            <a href="ava.php" class="nav-link"><i data-lucide="monitor-play"></i> Acesso ao AVA</a>

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
                        <button class="topbar-btn" title="Configurações" onclick="document.getElementById('configDropdown').style.display = document.getElementById('configDropdown').style.display === 'block' ? 'none' : 'block'; event.stopPropagation(); setTimeout(() => lucide.createIcons(), 50);">
                            <i data-lucide="settings"></i>
                        </button>
                        <div id="configDropdown" style="display: none; position: absolute; right: 0; top: 45px; background: white; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); width: 220px; z-index: 1000; overflow: hidden; text-align: left;">
                            <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                                <i data-lucide="user" style="width: 16px; height: 16px;"></i> Meu Perfil
                            </a>
                            <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                                <i data-lucide="key" style="width: 16px; height: 16px;"></i> Alterar Senha
                            </a>
                            <a href="#" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <i data-lucide="moon" style="width: 16px; height: 16px;"></i> Modo Escuro
                                </div>
                                <!-- Toggle switch dummy -->
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
                                                    <a href="../reports/boleto_print.php?mes=<?= urlencode($fat['competencia']) ?>&valor=<?= number_format($fat['valor'], 2, ',', '.') ?>" target="_blank" style="background: #10B981; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: 500; text-decoration: none; display: inline-block;">Gerar Boleto</a>
                                                <?php endif; ?>
                                            </div>

                                        </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
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
                                    <div class="metric-val" style="font-size: 1.25rem;">Agenda Acadêmica</div>
                                </div>
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
                                            <th style="padding: 8px; text-align:center;">Domingo</th>
                                        </tr>
                                    </thead>
                                    <tbody style="color: #475569;">
                                        <tr>
                                            <td style="padding: 8px; border: 1px solid #E2E8F0; background: #cbd5e1; text-align: center; color: #fff; font-weight: bold;">08:00<br>11:59</td>
                                            <td style="border: 1px solid #E2E8F0; padding: 4px; vertical-align: top;"><i data-lucide="star" style="width:10px; height:10px; display:inline-block; margin-right:4px;"></i>Introdução à Administração<br>02/02/2026 - 18/06/2026</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0; padding: 4px; vertical-align: top;"><i data-lucide="star" style="width:10px; height:10px; display:inline-block; margin-right:4px;"></i>Informática Básica<br>02/02/2026 - 18/06/2026</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0; background: #fecdd3;"></td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px; border: 1px solid #E2E8F0; background: #cbd5e1; text-align: center; color: #fff; font-weight: bold;">14:00<br>17:59</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0; padding: 4px; vertical-align: top;"><i data-lucide="star" style="width:10px; height:10px; display:inline-block; margin-right:4px;"></i>Comunicação Empresarial<br>02/02/2026 - 18/06/2026</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0; padding: 4px; vertical-align: top;"><i data-lucide="star" style="width:10px; height:10px; display:inline-block; margin-right:4px;"></i>Prática Profissional<br>02/02/2026 - 18/06/2026</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px; border: 1px solid #E2E8F0; background: #cbd5e1; text-align: center; color: #fff; font-weight: bold;">19:00<br>22:59</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0; padding: 4px; vertical-align: top;"><i data-lucide="star" style="width:10px; height:10px; display:inline-block; margin-right:4px;"></i>Segurança do Trabalho<br>02/02/2026 - 18/06/2026</td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                            <td style="border: 1px solid #E2E8F0;"></td>
                                        </tr>
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
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #0ea5e9;">
                                        <div style="font-weight: 600; color: #1E293B; margin-bottom: 8px; font-size: 0.9rem;">Introdução à Administração</div>
                                        <div style="font-size: 0.8rem; color: #64748B; display: flex; align-items: center; gap: 4px;">
                                            <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Segunda: 08:00 às 11:59
                                        </div>
                                    </div>
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #10b981;">
                                        <div style="font-weight: 600; color: #1E293B; margin-bottom: 8px; font-size: 0.9rem;">Comunicação Empresarial</div>
                                        <div style="font-size: 0.8rem; color: #64748B; display: flex; align-items: center; gap: 4px;">
                                            <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Terça: 14:00 às 17:59
                                        </div>
                                    </div>
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #8b5cf6;">
                                        <div style="font-weight: 600; color: #1E293B; margin-bottom: 8px; font-size: 0.9rem;">Informática Básica</div>
                                        <div style="font-size: 0.8rem; color: #64748B; display: flex; align-items: center; gap: 4px;">
                                            <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Quarta: 08:00 às 11:59
                                        </div>
                                    </div>
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #f59e0b;">
                                        <div style="font-weight: 600; color: #1E293B; margin-bottom: 8px; font-size: 0.9rem;">Segurança do Trabalho</div>
                                        <div style="font-size: 0.8rem; color: #64748B; display: flex; align-items: center; gap: 4px;">
                                            <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Quinta: 19:00 às 22:59
                                        </div>
                                    </div>
                                    <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border-left: 4px solid #ef4444;">
                                        <div style="font-weight: 600; color: #1E293B; margin-bottom: 8px; font-size: 0.9rem;">Prática Profissional</div>
                                        <div style="font-size: 0.8rem; color: #64748B; display: flex; align-items: center; gap: 4px;">
                                            <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Sexta: 14:00 às 17:59
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="calendar" style="font-size: 0.85rem;"></div>
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
                        </div>

                        <div class="inst-card">
                            <div class="inst-card-header" style="display: flex; justify-content: space-between; align-items: center;">
                                <div><i data-lucide="file-text" class="inst-icon"></i> Grade Curricular Cumprida</div>
                                <a href="?export=pdf" style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #0ea5e9; font-weight: 600; text-decoration: none; border: 1px solid #bae6fd; padding: 6px 12px; border-radius: 6px; background: #f0f9ff; transition: all 0.2s; cursor: pointer;">
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
                        <div class="inst-metrics" style="margin-bottom: 1.5rem;">
                            <div class="metric-box" style="flex: 1;">
                                <div class="metric-icon" style="background: #EFF6FF; color: #2563EB;"><i data-lucide="folder-open"></i></div>
                                <div class="metric-data">
                                    <div class="metric-lbl">Atendimento</div>
                                    <div class="metric-val" style="font-size: 1.25rem;">Secretaria Online</div>
                                </div>
                            </div>
                        </div>

                        <div class="finance-tabs" style="border-bottom: 1px solid #E2E8F0; margin-bottom: 1rem;">
                            <button class="finance-tab sec-tab active" onclick="switchSecretariaTab('disponiveis', this)" style="padding-bottom: 12px; font-weight: 500; font-size: 0.9rem;">Disponíveis</button>
                            <button class="finance-tab sec-tab" onclick="switchSecretariaTab('solicitados', this)" style="padding-bottom: 12px; font-weight: 500; font-size: 0.9rem;">Solicitados</button>
                        </div>

                        <!-- ABA DISPONÍVEIS -->
                        <div id="tab-sec-disponiveis">
                            <div class="inst-card" style="max-width: 600px;">
                                <div class="inst-card-header">
                                    <div><i data-lucide="folder-plus" class="inst-icon"></i> Novo Requerimento</div>
                                </div>
                                <div style="padding: 1.5rem;">
                                    <form onsubmit="event.preventDefault(); alert('Sua solicitação foi enviada para a secretaria!'); this.reset();">
                                        <div style="margin-bottom: 15px;">
                                            <label style="font-size: 0.85rem; font-weight: 500; color: #475569; display: block; margin-bottom: 6px;">Tipo de Solicitação</label>
                                            <select style="width:100%; padding: 10px 12px; border: 1px solid #E2E8F0; border-radius: 6px; outline: none; background: #fff; color: #1E293B; font-size: 0.9rem;">
                                                <option>Declaração de Matrícula</option>
                                                <option>Atestado de Frequência</option>
                                                <option>Envio de Folha de Ponto (Empresa)</option>
                                                <option>Justificativa de Falta (Atestado Médico)</option>
                                            </select>
                                        </div>
                                        <div style="margin-bottom: 15px;">
                                            <label style="font-size: 0.85rem; font-weight: 500; color: #475569; display: block; margin-bottom: 6px;">Observações</label>
                                            <textarea style="width:100%; height:80px; padding: 10px 12px; border: 1px solid #E2E8F0; border-radius: 6px; outline: none; resize:none; font-family: inherit; font-size: 0.9rem;" placeholder="Descreva sua solicitação..."></textarea>
                                        </div>
                                        <button type="submit" style="width:100%; display: flex; align-items: center; justify-content: center; background: #0ea5e9; border: none; padding: 12px; border-radius: 6px; color: #fff; font-weight: 500; cursor: pointer; transition: background 0.2s;">
                                            Enviar Solicitação
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!-- ABA SOLICITADOS -->
                        <div id="tab-sec-solicitados" style="display: none;">
                            <div class="inst-card">
                                <div class="inst-card-header">
                                    <div><i data-lucide="inbox" class="inst-icon"></i> Meus Pedidos</div>
                                </div>
                                <table class="inst-table">
                                    <thead>
                                        <tr>
                                            <th>Protocolo</th>
                                            <th>Data</th>
                                            <th style="text-align:right;">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="td-primary">#99201</td>
                                            <td style="color: #64748B;">02/05/2026</td>
                                            <td style="text-align:right;"><span class="inst-status status-ok">Concluído</span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style="text-align:center; padding: 2rem; color: #94A3B8;">Nenhum outro pedido aberto no momento.</td>
                                        </tr>
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
                            <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; background: #fff; border-left: 4px solid #0ea5e9;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem;">Abertura das Rematrículas</div>
                                    <span style="font-size: 0.75rem; color: #64748B;">Há 2 horas</span>
                                </div>
                                <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;">O período de rematrícula para o próximo semestre começará no dia 15 de Junho. Fique atento aos prazos para não perder sua vaga.</p>
                            </div>
                            <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; background: #fff; border-left: 4px solid #10b981;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem;">Palestra: O Futuro da TI</div>
                                    <span style="font-size: 0.75rem; color: #64748B;">Ontem</span>
                                </div>
                                <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;">Nesta sexta-feira às 19h teremos uma palestra exclusiva no auditório principal com especialistas do mercado de tecnologia. Não perca!</p>
                            </div>
                            <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; background: #fff; border-left: 4px solid #ef4444;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                    <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem;">Feriado Municipal</div>
                                    <span style="font-size: 0.75rem; color: #64748B;">28 de Maio</span>
                                </div>
                                <p style="color: #475569; font-size: 0.9rem; line-height: 1.5;">Informamos que não haverá aula na próxima quinta-feira devido ao feriado municipal. As atividades retornarão normalmente na sexta-feira.</p>
                            </div>
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
                                    <input type="checkbox" checked style="accent-color: #0ea5e9; width: 16px; height: 16px;"> <span style="font-weight: 500;">Exibir todas as vagas</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="checkbox" style="accent-color: #0ea5e9; width: 16px; height: 16px;"> Vagas disponíveis
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="checkbox" style="accent-color: #0ea5e9; width: 16px; height: 16px;"> Vagas inscritas
                                </label>
                            </div>

                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
                            <div style="border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; overflow: hidden; display: flex; flex-direction: column;">
                                <div style="padding: 20px; border-bottom: 1px solid #E2E8F0; flex-grow: 1;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                        <div>
                                            <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem; margin-bottom: 4px;">Estágio em Suporte TI</div>
                                            <div style="font-size: 0.85rem; color: #64748B;"><i data-lucide="building" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> Tech Solutions LTDA</div>
                                        </div>
                                        <span style="background: #e0f2fe; color: #0284c7; font-size: 0.7rem; font-weight: bold; padding: 4px 8px; border-radius: 4px;">ESTÁGIO</span>
                                    </div>
                                    <div style="font-size: 0.85rem; color: #475569; margin-bottom: 16px; line-height: 1.4;">Atuação em suporte técnico N1, manutenção de computadores e atendimento aos usuários da rede corporativa.</div>
                                    <div style="display: flex; gap: 12px; font-size: 0.8rem; color: #64748B;">
                                        <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Híbrido</div>
                                        <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="dollar-sign" style="width: 14px; height: 14px;"></i> R$ 1.200,00</div>
                                    </div>
                                </div>
                                <div style="padding: 12px 20px; background: #F8FAFC; display: flex; justify-content: flex-end;">
                                    <button style="background: #0ea5e9; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-weight: 500;">Candidatar-se</button>
                                </div>
                            </div>
                            
                            <div style="border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; overflow: hidden; display: flex; flex-direction: column;">
                                <div style="padding: 20px; border-bottom: 1px solid #E2E8F0; flex-grow: 1;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                        <div>
                                            <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem; margin-bottom: 4px;">Auxiliar Administrativo</div>
                                            <div style="font-size: 0.85rem; color: #64748B;"><i data-lucide="building" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> Grupo Alfa</div>
                                        </div>
                                        <span style="background: #dcfce7; color: #166534; font-size: 0.7rem; font-weight: bold; padding: 4px 8px; border-radius: 4px;">APRENDIZ</span>
                                    </div>
                                    <div style="font-size: 0.85rem; color: #475569; margin-bottom: 16px; line-height: 1.4;">Auxílio em rotinas de departamento pessoal, arquivo de documentos e controle de planilhas.</div>
                                    <div style="display: flex; gap: 12px; font-size: 0.8rem; color: #64748B;">
                                        <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Presencial</div>
                                        <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="dollar-sign" style="width: 14px; height: 14px;"></i> R$ 800,00</div>
                                    </div>
                                </div>
                                <div style="padding: 12px 20px; background: #F8FAFC; display: flex; justify-content: flex-end;">
                                    <button style="background: #0ea5e9; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-weight: 500;">Candidatar-se</button>
                                </div>
                            </div>
                            
                            <div style="border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; overflow: hidden; display: flex; flex-direction: column;">
                                <div style="padding: 20px; border-bottom: 1px solid #E2E8F0; flex-grow: 1;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                        <div>
                                            <div style="font-weight: 600; color: #1E293B; font-size: 1.1rem; margin-bottom: 4px;">Dev Front-end Jr.</div>
                                            <div style="font-size: 0.85rem; color: #64748B;"><i data-lucide="building" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> Inova Web</div>
                                        </div>
                                        <span style="background: #f3e8ff; color: #7e22ce; font-size: 0.7rem; font-weight: bold; padding: 4px 8px; border-radius: 4px;">EMPREGO</span>
                                    </div>
                                    <div style="font-size: 0.85rem; color: #475569; margin-bottom: 16px; line-height: 1.4;">Desenvolvimento de interfaces web com HTML, CSS e JavaScript básico. Vaga para quem acabou de se formar.</div>
                                    <div style="display: flex; gap: 12px; font-size: 0.8rem; color: #64748B;">
                                        <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Remoto</div>
                                        <div style="display: flex; align-items: center; gap: 4px;"><i data-lucide="dollar-sign" style="width: 14px; height: 14px;"></i> R$ 2.500,00</div>
                                    </div>
                                </div>
                                <div style="padding: 12px 20px; background: #F8FAFC; display: flex; justify-content: flex-end;">
                                    <button style="background: #0ea5e9; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-weight: 500;">Candidatar-se</button>
                                </div>
                            </div>
                        </div>
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
                        events: [
                            { title: 'Introdução à Administração', start: '2026-06-01T08:00:00' },
                            { title: 'Comunicação Empresarial', start: '2026-06-02T14:00:00' },
                            { title: 'Informática Básica', start: '2026-06-03T08:00:00' },
                            { title: 'Segurança do Trabalho', start: '2026-06-04T19:00:00' },
                            { title: 'Prática Profissional', start: '2026-06-05T14:00:00' },
                            { title: 'Introdução à Administração', start: '2026-06-08T08:00:00' },
                            { title: 'Comunicação Empresarial', start: '2026-06-09T14:00:00' },
                            { title: 'Informática Básica', start: '2026-06-10T08:00:00' },
                            { title: 'Segurança do Trabalho', start: '2026-06-11T19:00:00' },
                            { title: 'Prática Profissional', start: '2026-06-12T14:00:00' }
                        ],
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

            function switchHorarioTab(tab, btn) {
                document.querySelectorAll('#tab-quadro ~ .finance-tabs .finance-tab, #sec-horarios .finance-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('tab-quadro').style.display = tab === 'quadro' ? 'block' : 'none';
                document.getElementById('tab-calendario').style.display = tab === 'calendario' ? 'block' : 'none';

                if (tab === 'calendario') {
                    setTimeout(() => window.dispatchEvent(new Event('resize')), 10);
                }
            }

            function switchOportunidadesTab(tab, btn) {
                document.querySelectorAll('.op-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('tab-vagas').style.display = tab === 'vagas' ? 'block' : 'none';
                document.getElementById('tab-acompanhamento').style.display = tab === 'acompanhamento' ? 'block' : 'none';
            }

            function switchSecretariaTab(tab, btn) {
                document.querySelectorAll('.sec-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('tab-sec-disponiveis').style.display = tab === 'disponiveis' ? 'block' : 'none';
                document.getElementById('tab-sec-solicitados').style.display = tab === 'solicitados' ? 'block' : 'none';
            }
        </script>
        <script src="../assets/js/portal_aluno.js"></script>
</body>

</html>