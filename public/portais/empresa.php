<?php
// portal_empresa.php — Portal da Empresa | Sophie Link (Corporate Banking Theme)
session_start();
require_once '../../includes/auth.php';
protect_page(['empresa']);
require_once '../../includes/db.php';
/** @var \PDO $pdo */

$usuario_id = $_SESSION['usuario_id'];
$empresa_id = $_SESSION['empresa_id'];
$nomeEmpresa = $_SESSION['usuario_nome'] ?? 'Empresa Parceira';
$nomeShort   = explode(' ', $nomeEmpresa)[0]; 

// 1. Aprendizes vinculados à empresa com total de aulas e presenças
$aprendizes = $pdo->prepare("
    SELECT a.*, c.data_inicio, c.data_fim,
           COUNT(f.id) as total_aulas,
           SUM(CASE WHEN f.status = 'presente' THEN 1 ELSE 0 END) as presencas
    FROM contratos c 
    JOIN aprendizes a ON c.aprendiz_id = a.id 
    LEFT JOIN frequencia f ON f.aprendiz_id = a.id
    WHERE c.empresa_id = ? AND c.status = 'ativo'
    GROUP BY a.id, c.data_inicio, c.data_fim
");
$aprendizes->execute([$empresa_id]);
$listaAprendizes = $aprendizes->fetchAll(PDO::FETCH_ASSOC);

// 2. Frequência média e faltas
$totalPresencas = 0;
$totalAulas = 0;
foreach ($listaAprendizes as $k => $apr) {
    $presencas = (int)$apr['presencas'];
    $aulas = (int)$apr['total_aulas'];
    
    $listaAprendizes[$k]['faltas'] = $aulas - $presencas;
    $listaAprendizes[$k]['freq_perc'] = $aulas > 0 ? round(($presencas / $aulas) * 100) : 100;
    
    $totalPresencas += $presencas;
    $totalAulas += $aulas;
}
$freqMedia = $totalAulas > 0 ? round(($totalPresencas / $totalAulas) * 100) : 100;

// 3. Alertas de frequência (< 75%)
$alertasFreq = 0;
foreach ($listaAprendizes as $apr) {
    if ($apr['freq_perc'] < 75) $alertasFreq++;
}

// 4. Financeiro
$financeiro = $pdo->prepare("SELECT * FROM financeiro WHERE empresa_id = ? ORDER BY data_vencimento DESC");
$financeiro->execute([$empresa_id]);
$listaFin = $financeiro->fetchAll(PDO::FETCH_ASSOC);
$totalPendentes = 0;
$totalPagoMes = 0;
foreach ($listaFin as $f) {
    if ($f['status'] === 'pendente') $totalPendentes += $f['valor'];
    if ($f['status'] === 'pago' && date('Y-m', strtotime($f['data_vencimento'])) === date('Y-m')) {
        $totalPagoMes += $f['valor'];
    }
}
$sitFin = $totalPendentes > 0 ? 'Pendente' : 'Em dia';
$sitFinColor = $totalPendentes > 0 ? '#DC2626' : '#16A34A'; // Red or Green

// 5. Estimativa de Faturamento Atual
$valorPorAprendiz = 250.00; // Valor fixo do contrato fictício
$qtdAtivos = count($listaAprendizes);
$estimativaFatura = $qtdAtivos * $valorPorAprendiz;

// 6. Dados para Gráfico Chart.js
$nomesChart = [];
$freqsChart = [];
foreach ($listaAprendizes as $a) {
    $nomesChart[] = explode(' ', $a['nome'])[0];
    $freqsChart[] = $a['freq_perc'];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Corporativo — Sophie Link</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="../assets/css/portais/empresa.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>
<div class="app">

    <!-- THIN SIDEBAR -->
    <aside class="sidebar">
        <div class="sb-logo">SL</div>
        
        <div class="nav-link active" title="Dashboard" onclick="showSec('inicio', this)">
            <i data-lucide="grid"></i>
        </div>
        <div class="nav-link" title="Aprendizes" onclick="showSec('aprendizes', this)">
            <i data-lucide="users"></i>
        </div>
        <div class="nav-link" title="Frequência" onclick="showSec('frequencia', this)">
            <i data-lucide="calendar"></i>
        </div>
        <div class="nav-link" title="Financeiro" onclick="showSec('financeiro', this)">
            <i data-lucide="file-text"></i>
        </div>

        <div class="sb-bottom">
            <a href="../auth/logout.php" class="nav-link" title="Sair"><i data-lucide="log-out"></i></a>
        </div>
    </aside>

    <div class="workspace">
        <header class="topbar">
            <div class="tb-title">Portal do Parceiro B2B</div>
            <div class="tb-user">
                <div class="tb-name"><?= htmlspecialchars($nomeEmpresa) ?></div>
                <div class="tb-avatar"><?= strtoupper(substr($nomeShort, 0, 1)) ?></div>
            </div>
        </header>

        <main class="content">

            <!-- =========== DASHBOARD =========== -->
            <div id="sec-inicio" class="sec active">
                <div class="page-header">
                    <div class="ph-title">Visão Geral, <strong><?= htmlspecialchars($nomeShort) ?></strong></div>
                    <div class="ph-sub">Acompanhamento executivo de contratos de aprendizagem.</div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-val"><?= count($listaAprendizes) ?></div>
                        <div class="stat-lbl">Aprendizes Ativos</div>
                        <div class="stat-icon"><i data-lucide="users"></i></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val"><?= $freqMedia ?>%</div>
                        <div class="stat-lbl">Frequência Global</div>
                        <div class="stat-icon"><i data-lucide="activity"></i></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val"><?= $alertasFreq ?></div>
                        <div class="stat-lbl">Alertas (Freq < 75%)</div>
                        <div class="stat-icon"><i data-lucide="alert-circle"></i></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val" style="color: <?= $sitFinColor ?>;"><?= $sitFin ?></div>
                        <div class="stat-lbl">Situação Financeira</div>
                        <div class="stat-icon"><i data-lucide="briefcase"></i></div>
                    </div>
                </div>

                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">Ações Rápidas & Faturamento</div>
                    </div>
                    <div style="padding: 2rem; display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap;">
                        <div style="flex:1;">
                            <div style="font-size: 0.85rem; color: var(--c-text-muted); font-weight: 600; text-transform: uppercase;">Estimativa Próxima Fatura</div>
                            <div style="font-size: 1.8rem; font-weight: 800; color: var(--c-text);">R$ <?= number_format($estimativaFatura, 2, ',', '.') ?></div>
                            <div style="font-size: 0.85rem; color: var(--c-text-muted);">(<?= $qtdAtivos ?> aprendizes x R$ <?= number_format($valorPorAprendiz, 2, ',', '.') ?>)</div>
                        </div>
                        <div style="display:flex; gap: 10px;">
                            <a href="relatorio_empresa_print.php" target="_blank" class="btn btn-primary"><i data-lucide="printer"></i> Emitir Nota / Fatura</a>
                            <button class="btn btn-outline" onclick="showSec('financeiro', document.querySelectorAll('.nav-link')[3])"><i data-lucide="file-text"></i> Visualizar Extrato</button>
                        </div>
                    </div>
                </div>

                <div class="panel" style="margin-top: 1.5rem;">
                    <div class="panel-head">
                        <div class="panel-title">Frequência por Aprendiz</div>
                    </div>
                    <div style="padding: 2rem;">
                        <canvas id="freqChart" height="80"></canvas>
                    </div>
                </div>
            </div>

            <!-- =========== APRENDIZES =========== -->
            <div id="sec-aprendizes" class="sec">
                <div class="page-header"><div class="ph-title">Relação de <strong>Aprendizes</strong></div></div>
                <div class="panel">
                    <table class="data-table">
                        <thead><tr><th>Nome do Aprendiz</th><th>CPF</th><th>Curso</th><th>Fim do Contrato</th><th>Frequência</th></tr></thead>
                        <tbody>
                            <?php foreach ($listaAprendizes as $a): ?>
                            <tr>
                                <td style="font-weight: 500; color: var(--c-brand);"><?= htmlspecialchars($a['nome']) ?></td>
                                <td><?= htmlspecialchars($a['cpf']) ?></td>
                                <td><?= htmlspecialchars($a['curso']) ?></td>
                                <td><?= date('d/m/Y', strtotime($a['data_fim'])) ?></td>
                                <td>
                                    <span style="display:inline-block; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; background: <?= $a['freq_perc']>=75?'#DCFCE7':'#FEE2E2' ?>; color: <?= $a['freq_perc']>=75?'#16A34A':'#DC2626' ?>;">
                                        <?= $a['freq_perc'] ?>%
                                    </span>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                            <?php if(empty($listaAprendizes)): ?>
                            <tr><td colspan="5" style="text-align:center; padding:3rem;">Nenhum aprendiz ativo.</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FREQUÊNCIA =========== -->
            <div id="sec-frequencia" class="sec">
                <div class="page-header"><div class="ph-title">Relatório de <strong>Frequência</strong></div></div>
                <div class="panel">
                    <table class="data-table">
                        <thead><tr><th>Aprendiz</th><th>Aulas Dadas</th><th>Presenças</th><th>Faltas</th><th>Aproveitamento</th></tr></thead>
                        <tbody>
                            <?php foreach ($listaAprendizes as $a): ?>
                            <tr>
                                <td style="font-weight: 500;"><?= htmlspecialchars($a['nome']) ?></td>
                                <td><?= $a['total_aulas'] ?></td>
                                <td><?= $a['presencas'] ?></td>
                                <td style="color: #DC2626; font-weight: 500;"><?= $a['faltas'] ?></td>
                                <td><?= $a['freq_perc'] ?>%</td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FINANCEIRO =========== -->
            <div id="sec-financeiro" class="sec">
                <div class="page-header"><div class="ph-title">Extrato <strong>Financeiro</strong></div></div>
                <div class="panel">
                    <table class="data-table">
                        <thead><tr><th>Competência</th><th>Vencimento</th><th>Valor (R$)</th><th>Status</th><th>Pagamento</th></tr></thead>
                        <tbody>
                            <?php foreach ($listaFin as $f): 
                                $bg = $f['status'] === 'pago' ? '#DCFCE7' : ($f['status'] === 'atrasado' ? '#FEE2E2' : '#FEF3C7');
                                $col = $f['status'] === 'pago' ? '#16A34A' : ($f['status'] === 'atrasado' ? '#DC2626' : '#D97706');
                            ?>
                            <tr>
                                <td style="font-weight: 500;"><?= htmlspecialchars($f['competencia']) ?></td>
                                <td><?= date('d/m/Y', strtotime($f['data_vencimento'])) ?></td>
                                <td>R$ <?= number_format($f['valor'], 2, ',', '.') ?></td>
                                <td>
                                    <span style="display:inline-block; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform:uppercase; background: <?= $bg ?>; color: <?= $col ?>;">
                                        <?= htmlspecialchars($f['status']) ?>
                                    </span>
                                </td>
                                <td><?= $f['data_pagamento'] ? date('d/m/Y', strtotime($f['data_pagamento'])) : '-' ?></td>
                            </tr>
                            <?php endforeach; ?>
                            <?php if(empty($listaFin)): ?>
                            <tr><td colspan="5" style="text-align:center; padding:3rem;">Nenhum registro financeiro.</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>
</div>

<script src="../assets/js/portais/empresa.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('freqChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: <?= json_encode($nomesChart) ?>,
            datasets: [{
                label: 'Frequência Atual (%)',
                data: <?= json_encode($freqsChart) ?>,
                backgroundColor: '#4C1D95',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});
</script>
</body>
</html>
