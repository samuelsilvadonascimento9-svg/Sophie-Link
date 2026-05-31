<?php
// portal_aluno.php — Portal do Aluno | Centro Técnico Profissionalizante Sophie Link
session_start();

if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'aluno') {
    header("Location: ../login.php");
    exit;
}

require_once '../../includes/db.php';

// Busca o aluno logado
$stmtAluno = $pdo->prepare("SELECT a.*, e.nome AS empresa_nome 
                          FROM aprendizes a 
                          LEFT JOIN contratos c ON a.id = c.aprendiz_id 
                          LEFT JOIN empresas e ON c.empresa_id = e.id 
                          JOIN usuarios u ON u.email = a.email
                          WHERE u.id = ? LIMIT 1");
$stmtAluno->execute([$_SESSION['usuario_id']]);
$aluno = $stmtAluno->fetch();

if (!$aluno) {
    // Tenta pelo nome se o email não bater (pois a tabela de seed pode estar zoada)
    $stmtAluno = $pdo->prepare("SELECT a.*, e.nome AS empresa_nome 
                              FROM aprendizes a 
                              LEFT JOIN contratos c ON a.id = c.aprendiz_id 
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

// Buscar Notas
$stmtNotas = $pdo->prepare("SELECT * FROM notas WHERE aprendiz_id = ? ORDER BY data_registro DESC");
$stmtNotas->execute([$aluno_id]);
$notasDb = $stmtNotas->fetchAll();

// Buscar Frequência
$stmtFreq = $pdo->prepare("SELECT * FROM frequencia WHERE aprendiz_id = ?");
$stmtFreq->execute([$aluno_id]);
$freqDb = $stmtFreq->fetchAll();

$totalAulas = count($freqDb);

// Exportar CSV
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=boletim_aluno_' . $aluno_id . '.csv');
    $out = fopen('php://output', 'w');
    fprintf($out, chr(0xEF).chr(0xBB).chr(0xBF));
    fputcsv($out, ['Boletim Escolar - ' . $aluno['nome']], ';');
    fputcsv($out, [], ';');
    fputcsv($out, ['Atividade', 'Nota', 'Data de Registro'], ';');
    foreach($notasDb as $n) {
        fputcsv($out, [$n['atividade'], $n['valor_nota'], date('d/m/Y', strtotime($n['data_registro']))], ';');
    }
    fclose($out);
    exit;
}
$faltas = 0;
foreach($freqDb as $f) { if($f['status'] === 'falta') $faltas++; }
$frequenciaPercentual = $totalAulas > 0 ? round((($totalAulas - $faltas) / $totalAulas) * 100) : 100;

// Calcular média geral
$somaNotas = 0;
foreach($notasDb as $n) { $somaNotas += $n['valor_nota']; }
$mediaGeral = count($notasDb) > 0 ? number_format($somaNotas / count($notasDb), 1, '.', '') : '0.0';

// Agrupar faltas por disciplina (Simplificado: as faltas no BD atual não têm disciplina vinculada, 
// então vamos usar um valor padrão baseado nas totais)
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
<link rel="stylesheet" href="../assets/css/portal_aluno.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>

<div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sb-brand">
            <img src="../assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
        </div>

        <div class="sb-user">
            <div class="sb-avatar"><?= strtoupper(substr($aluno['nome'], 0, 1)) ?></div>
            <div>
                <div class="sb-uname"><?= htmlspecialchars($aluno['nome']) ?></div>
                <div class="sb-urole"><?= htmlspecialchars($aluno['curso']) ?></div>
                <div class="sb-ra">ID: <?= str_pad($aluno['id'], 6, '0', STR_PAD_LEFT) ?></div>
            </div>
        </div>

        <div class="sb-sec">Menu</div>
        <a href="#" class="nav-link active" onclick="showSec('inicio',this)"><i data-lucide="layout-dashboard"></i> Início</a>
        <a href="#" class="nav-link" onclick="showSec('notas',this)"><i data-lucide="bar-chart-2"></i> Notas & Frequência</a>
        <a href="#" class="nav-link" onclick="showSec('financeiro',this)"><i data-lucide="credit-card"></i> Financeiro</a>
        <a href="#" class="nav-link"><i data-lucide="calendar"></i> Quadro de Horários</a>
        <a href="#" class="nav-link"><i data-lucide="file-text"></i> Histórico Escolar</a>
        <a href="#" class="nav-link"><i data-lucide="folder-open"></i> Secretaria</a>
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
            <!-- Boletim Section -->
            <div id="boletim" class="portal-section active">
                <div class="section-header">
                    <h2>Boletim Escolar</h2>
                    <div class="header-actions">
                        <a href="?export=csv" class="btn btn-secondary"><i data-lucide="download"></i> Exportar CSV</a>
                        <button class="btn btn-secondary" onclick="window.print()"><i data-lucide="printer"></i> Imprimir</button>
                    </div>
                </div>

        <!-- CONTENT -->
        <main class="content">

            <!-- ==================== INÍCIO ==================== -->
            <div id="sec-inicio" class="sec active">

                <div class="page-hdr">
                    <div>
                        <div class="ph-tag">2026 · 1º Semestre</div>
                        <div class="ph-title">Olá, <?= htmlspecialchars(explode(' ', $aluno['nome'])[0]) ?>! 👋</div>
                        <div class="ph-sub"><?= htmlspecialchars($aluno['curso']) ?> — Centro Técnico Profissionalizante Sophie Link</div>
                    </div>
                    <div class="ph-stats">
                        <div class="ph-stat"><div class="ph-val" style="color:var(--c-green)"><?= $mediaGeral ?></div><div class="ph-lbl">Média Geral</div></div>
                        <div class="ph-stat"><div class="ph-val" style="color:var(--c-primary)"><?= $frequenciaPercentual ?>%</div><div class="ph-lbl">Frequência</div></div>
                        <div class="ph-stat"><div class="ph-val" style="color:var(--c-amber)">0</div><div class="ph-lbl">Pendências</div></div>
                    </div>
                </div>

                <div class="grid-2">
                    <div>
                        <!-- Aviso -->
                        <div class="card" style="margin-bottom: 1.25rem; border-left: 4px solid var(--c-primary);">
                            <div class="card-body" style="display:flex;align-items:center;gap:12px;">
                                <i data-lucide="megaphone" style="width:22px;height:22px;color:var(--c-primary);flex-shrink:0;"></i>
                                <div>
                                    <div style="font-size:0.85rem;font-weight:700;color:var(--c-text);margin-bottom:3px;">Entrega de Documentos</div>
                                    <div style="font-size:0.78rem;color:var(--c-text-muted);">Prazo para entrega do relatório mensal na empresa: <strong>dia 10</strong>. Acesse a Secretaria para enviar.</div>
                                </div>
                            </div>
                        </div>

                        <!-- Notas recentes -->
                        <div class="card" style="margin-bottom: 1.25rem;">
                            <div class="card-head">
                                <div class="card-title"><i data-lucide="bar-chart-2"></i> Notas Recentes</div>
                                <a href="#" class="card-link" onclick="showSec('notas', document.querySelector('[onclick*=notas]'))">Ver boletim →</a>
                            </div>
                            <table class="grade-table">
                                <thead><tr><th>Atividade / Disciplina</th><th>Data</th><th>Nota</th><th>Situação</th></tr></thead>
                                <tbody>
                                    <?php if(empty($notasDb)): ?>
                                        <tr><td colspan="4" style="text-align:center;">Nenhuma nota lançada.</td></tr>
                                    <?php else: ?>
                                        <?php foreach (array_slice($notasDb, 0, 4) as $n): 
                                            $cor = $n['valor_nota'] >= 7 ? 'var(--c-green)' : ($n['valor_nota'] >= 5 ? 'var(--c-amber)' : 'var(--c-red)');
                                            $pill = $n['valor_nota'] >= 7 ? 'pill-green' : ($n['valor_nota'] >= 5 ? 'pill-amber' : 'pill-red');
                                            $status = $n['valor_nota'] >= 7 ? 'Aprovado' : ($n['valor_nota'] >= 5 ? 'Recuperação' : 'Reprovado');
                                        ?>
                                        <tr>
                                            <td><?= htmlspecialchars($n['atividade']) ?></td>
                                            <td><?= date('d/m/Y', strtotime($n['data_registro'])) ?></td>
                                            <td class="grade-val" style="color:<?= $cor ?>"><?= number_format($n['valor_nota'], 1, '.', '') ?></td>
                                            <td><span class="pill <?= $pill ?>"><?= $status ?></span></td>
                                        </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>

                        <!-- Financeiro resumo -->
                        <div class="card">
                            <div class="card-head">
                                <div class="card-title"><i data-lucide="credit-card"></i> Extrato Financeiro</div>
                                <a href="#" class="card-link" onclick="showSec('financeiro', document.querySelector('[onclick*=financeiro]'))">Ver tudo →</a>
                            </div>
                            <div class="fin-item">
                                <div><div class="fin-label">Mensalidade — Parcela 04/12</div><div class="fin-date">Vencimento: 10/04/2026</div></div>
                                <div><div class="fin-val">R$ 250,00</div><span class="pill pill-green" style="margin-top:5px">Pago</span></div>
                            </div>
                            <div class="fin-item">
                                <div><div class="fin-label">Mensalidade — Parcela 05/12</div><div class="fin-date">Vencimento: 10/05/2026</div></div>
                                <div style="text-align:right"><div class="fin-val">R$ 250,00</div><a href="boleto_print.php?mes=Maio&valor=250,00" target="_blank" class="fin-btn" style="text-decoration:none; display:inline-block;">Imprimir Boleto</a></div>
                            </div>
                        </div>
                    </div>

                    <!-- COLUNA DIREITA -->
                    <div>
                        <!-- Frequência -->
                        <div class="card" style="margin-bottom: 1.25rem;">
                            <div class="card-head"><div class="card-title"><i data-lucide="percent"></i> Frequência</div></div>
                            <div class="ring-wrap">
                                <div class="ring">
                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="33" fill="none" stroke="#E5E7EB" stroke-width="7"/>
                                        <circle cx="40" cy="40" r="33" fill="none" stroke="#FF6B00" stroke-width="7"
                                                stroke-dasharray="207.3" stroke-dashoffset="12.44" stroke-linecap="round"/>
                                    </svg>
                                    <div class="ring-val">94%<small>Freq.</small></div>
                                </div>
                                <span class="ring-lbl">Mínimo exigido: 75%</span>
                            </div>
                            <div class="mini-grid">
                                <div class="mini-stat"><div class="mini-val" style="color:var(--c-green)">8.4</div><div class="mini-lbl">Média</div></div>
                                <div class="mini-stat"><div class="mini-val" style="color:var(--c-amber)">2</div><div class="mini-lbl">Pendentes</div></div>
                            </div>
                        </div>

                        <!-- Progresso Contrato -->
                        <div class="card" style="margin-bottom: 1.25rem;">
                            <div class="card-head"><div class="card-title"><i data-lucide="target"></i> Contrato de Aprendizagem</div></div>
                            <div class="prog-wrap">
                                <div class="prog-row"><span>Carga Horária Cumprida</span><span>65%</span></div>
                                <div class="prog-bar"><div class="prog-fill" style="width:65%"></div></div>
                                <div class="prog-note">Faltam 140 horas teóricas para o término do programa.</div>
                            </div>
                        </div>

                        <!-- Avisos -->
                        <div class="card">
                            <div class="card-head"><div class="card-title"><i data-lucide="megaphone"></i> Avisos</div></div>
                            <div class="aviso-item" style="border-left: 3px solid var(--c-primary); background: var(--c-primary-lt);">
                                <div class="aviso-title">📋 Folha de Ponto</div>
                                <div class="aviso-text">Assine a folha de ponto na empresa semanalmente.</div>
                            </div>
                            <div class="aviso-item" style="border-left: 3px solid var(--c-blue); background: var(--c-blue-lt);">
                                <div class="aviso-title">📅 Reposição de Aula</div>
                                <div class="aviso-text">Aula de 22/05 reagendada para 03/06 (terça-feira).</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div><!-- /sec-inicio -->

            <!-- ==================== NOTAS ==================== -->
            <div id="sec-notas" class="sec">
                <div class="page-hdr">
                    <div>
                        <div class="ph-tag">Período 2026/1</div>
                        <div class="ph-title">Notas & Frequência</div>
                        <div class="ph-sub">Boletim detalhado — Técnico em Eletromecânica</div>
                    </div>
                    <div class="ph-stats">
                        <div class="ph-stat"><div class="ph-val" style="color:var(--c-green)">8.4</div><div class="ph-lbl">Média Geral</div></div>
                        <div class="ph-stat"><div class="ph-val" style="color:var(--c-primary)">94%</div><div class="ph-lbl">Frequência</div></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="bar-chart-2"></i> Boletim 2026/1</div></div>
                    <table class="grade-table">
                        <thead><tr><th>Disciplina</th><th>Nota 1</th><th>Nota 2</th><th>Média</th><th>Faltas</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td>Manutenção Eletromecânica I</td><td class="grade-val">8.0</td><td class="grade-val">9.0</td><td class="grade-val" style="color:var(--c-green)">8.5</td><td>2</td><td><span class="pill pill-green">Aprovado</span></td></tr>
                            <tr><td>Gestão da Qualidade</td><td class="grade-val">9.0</td><td class="grade-val">9.0</td><td class="grade-val" style="color:var(--c-green)">9.0</td><td>0</td><td><span class="pill pill-green">Aprovado</span></td></tr>
                            <tr><td>Saúde e Segurança (Mineração)</td><td class="grade-val">6.0</td><td class="grade-val">7.0</td><td class="grade-val" style="color:var(--c-amber)">6.5</td><td>4</td><td><span class="pill pill-amber">Recuperação</span></td></tr>
                            <tr><td>Logística Aplicada</td><td class="grade-val">—</td><td class="grade-val">—</td><td class="grade-val">—</td><td>0</td><td><span class="pill pill-gray">Em andamento</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div><!-- /sec-notas -->

            <!-- ==================== FINANCEIRO ==================== -->
            <div id="sec-financeiro" class="sec">
                <div class="page-hdr">
                    <div>
                        <div class="ph-tag">Mensalidades</div>
                        <div class="ph-title">Financeiro</div>
                        <div class="ph-sub">Gestão de mensalidades, faturamentos e boletos emitidos.</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="credit-card"></i> Extrato de Lançamentos</div></div>
                    <div class="fin-item">
                        <div><div class="fin-label">Mensalidade Aprendizagem — Parcela 04/12</div><div class="fin-date">Vencimento: 10/04/2026 · Pago em: 08/04/2026</div></div>
                        <div><div class="fin-val">R$ 250,00</div><span class="pill pill-green" style="margin-top:5px">Pago</span></div>
                    </div>
                    <div class="fin-item">
                        <div><div class="fin-label">Mensalidade Aprendizagem — Parcela 05/12</div><div class="fin-date">Vencimento: 10/05/2026</div></div>
                        <div style="text-align:right"><div class="fin-val">R$ 250,00</div><a href="boleto_print.php?mes=Maio&valor=250,00" target="_blank" class="fin-btn" style="text-decoration:none; display:inline-block;">Imprimir Boleto PDF</a></div>
                    </div>
                </div>
            </div><!-- /sec-financeiro -->

        </main>
    </div>
</div>

<script src="../assets/js/portal_aluno.js"></script>
</body>
</html>
