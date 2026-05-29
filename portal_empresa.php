<?php
// portal_empresa.php — Portal da Empresa | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'empresa') {
    header("Location: login.php");
    exit;
}
require_once 'includes/db.php';

$usuario_id = $_SESSION['usuario_id'];
$empresa_id = $_SESSION['empresa_id'];
$nomeEmpresa = $_SESSION['usuario_nome'] ?? 'Empresa Parceira';
$nomeShort   = explode(' ', $nomeEmpresa)[0]; 

// 1. Aprendizes vinculados à empresa
$aprendizes = $pdo->prepare("
    SELECT a.*, c.data_inicio, c.data_fim 
    FROM contratos c 
    JOIN aprendizes a ON c.aprendiz_id = a.id 
    WHERE c.empresa_id = ? AND c.status = 'ativo'
");
$aprendizes->execute([$empresa_id]);
$listaAprendizes = $aprendizes->fetchAll(PDO::FETCH_ASSOC);

// 2. Frequência média e faltas (simplificado: contar total de registros vs faltas)
$totalPresencas = 0;
$totalAulas = 0;
foreach ($listaAprendizes as $k => $apr) {
    $freq = $pdo->prepare("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'presente' THEN 1 ELSE 0 END) as presencas FROM frequencia WHERE aprendiz_id = ?");
    $freq->execute([$apr['id']]);
    $fData = $freq->fetch(PDO::FETCH_ASSOC);
    
    $listaAprendizes[$k]['presencas'] = $fData['presencas'] ?? 0;
    $listaAprendizes[$k]['total_aulas'] = $fData['total'] ?? 0;
    $listaAprendizes[$k]['faltas'] = ($fData['total'] ?? 0) - ($fData['presencas'] ?? 0);
    $listaAprendizes[$k]['freq_perc'] = $fData['total'] > 0 ? round(($fData['presencas'] / $fData['total']) * 100) : 100;
    
    $totalPresencas += $fData['presencas'];
    $totalAulas += $fData['total'];
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
$sitFinColor = $totalPendentes > 0 ? 'var(--c-red)' : 'var(--c-green)';

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal da Empresa — Sophie Link</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF6B00;
    --c-primary-d:  #D95A00;
    --c-primary-lt: #FFF0E6;
    --c-bg:         #F5F6FA;
    --c-surface:    #FFFFFF;
    --c-border:     #E5E7EB;
    --c-border-lt:  #F0F1F3;
    --c-text:       #111827;
    --c-text-2:     #374151;
    --c-text-muted: #6B7280;
    --c-text-light: #9CA3AF;
    --c-blue:       #3B82F6;
    --c-blue-lt:    #EFF6FF;
    --c-amber:      #F59E0B;
    --c-amber-lt:   #FFFBEB;
    --c-red:        #EF4444;
    --c-red-lt:     #FEF2F2;
    --sidebar-w:    252px;
    --header-h:     64px;
    --radius:       12px;
    --radius-sm:    8px;
    --shadow-sm:    0 1px 3px rgba(0,0,0,0.06);
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
}
html { font-size: 16px; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; }
a { text-decoration: none; color: inherit; }

.app { display: flex; min-height: 100vh; }
.sidebar { width: var(--sidebar-w); background: var(--c-surface); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 200; overflow-y: auto; }
.sb-brand { display: flex; align-items: center; gap: 10px; padding: 18px 18px 14px; border-bottom: 1px solid var(--c-border-lt); }
.sb-tag { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); margin-top: 1px; }
.sb-user { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: var(--c-bg); margin: 10px; border-radius: var(--radius); }
.sb-avatar { width: 36px; height: 36px; background: var(--c-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0; }
.sb-uname { font-size: 0.78rem; font-weight: 600; color: var(--c-text); }
.sb-urole { font-size: 0.68rem; color: var(--c-text-muted); }

.sb-sec { padding: 10px 18px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 9px 14px 9px 18px; font-size: 0.82rem; font-weight: 500; color: var(--c-text-muted); transition: all 0.15s; position: relative; cursor: pointer; }
.nav-link i { width: 16px; height: 16px; flex-shrink: 0; }
.nav-link:hover, .nav-link.active { color: var(--c-primary); background: var(--c-primary-lt); }
.nav-link.active { font-weight: 600; }
.nav-link.active::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--c-primary); border-radius: 0 3px 3px 0; }

.sb-footer { margin-top: auto; padding: 14px 18px; border-top: 1px solid var(--c-border-lt); }
.sb-footer a { display: flex; align-items: center; gap: 8px; font-size: 0.77rem; font-weight: 500; color: var(--c-text-muted); transition: color 0.15s; }
.sb-footer a:hover { color: var(--c-primary); }

.workspace { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }
.topbar { height: var(--header-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 100; }
.tb-title { font-size: 1rem; font-weight: 700; color: var(--c-text); }

.content { padding: 2rem; flex: 1; }
.page-hdr { margin-bottom: 2rem; }
.ph-title { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 6px; }
.ph-sub { font-size: 0.88rem; color: var(--c-text-muted); }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem; }
.stat-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); padding: 1.25rem 1.5rem; box-shadow: var(--shadow-sm); }
.stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.stat-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
.stat-icon i { width: 20px; height: 20px; }
.si-green  { background: var(--c-primary-lt); color: var(--c-primary); }
.si-blue   { background: var(--c-blue-lt);    color: var(--c-blue);    }
.si-amber  { background: var(--c-amber-lt);   color: var(--c-amber);   }
.stat-val { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 2px; }
.stat-lbl { font-size: 0.75rem; color: var(--c-text-muted); }

.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow-sm); margin-bottom: 1.5rem; }
.card-head { padding: 1rem 1.5rem; border-bottom: 1px solid var(--c-border-lt); display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 0.9rem; font-weight: 700; color: var(--c-text); display: flex; align-items: center; gap: 8px; }
.card-title i { width: 17px; height: 17px; color: var(--c-primary); }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 9px 1.5rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-light); border-bottom: 1px solid var(--c-border); }
.data-table td { padding: 12px 1.5rem; font-size: 0.82rem; border-bottom: 1px solid var(--c-border-lt); color: var(--c-text-2); }
.data-table tr:last-child td { border-bottom: none; }
.td-bold { font-weight: 700; color: var(--c-text); }

.pill { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 0.65rem; font-weight: 700; }
.pill-green  { background: var(--c-green-lt); color: #15803D; }
.pill-amber  { background: var(--c-amber-lt); color: #B45309; }
.pill-red    { background: var(--c-red-lt);   color: var(--c-red); }
.pill-blue   { background: var(--c-blue-lt);  color: #1D4ED8; }

.btn-secondary { display: inline-flex; align-items: center; gap: 7px; background: none; color: var(--c-text-2); border: 1px solid var(--c-border); border-radius: var(--radius-sm); padding: 7px 16px; font-family: var(--f-body); font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-secondary:hover { border-color: var(--c-primary); color: var(--c-primary); }

.sec { display: none; }
.sec.active { display: block; }
</style>
</head>
<body>
<div class="app">

    <aside class="sidebar">
        <div class="sb-brand" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
            <div class="sb-tag" style="margin-top: 4px;">Portal da Empresa</div>
        </div>
        <div class="sb-user">
            <div class="sb-avatar"><?= strtoupper(substr($nomeShort, 0, 1)) ?></div>
            <div>
                <div class="sb-uname"><?= htmlspecialchars($nomeShort) ?></div>
                <div class="sb-urole">Empresa Parceira</div>
            </div>
        </div>

        <div class="sb-sec">Menu Principal</div>
        <a href="#" class="nav-link active" onclick="showSec('inicio',this)"><i data-lucide="layout-dashboard"></i> Dashboard</a>
        <a href="#" class="nav-link" onclick="showSec('aprendizes',this)"><i data-lucide="users"></i> Meus Aprendizes</a>
        <a href="#" class="nav-link" onclick="showSec('frequencia',this)"><i data-lucide="calendar-check"></i> Frequência</a>
        <a href="#" class="nav-link" onclick="showSec('financeiro',this)"><i data-lucide="receipt"></i> Financeiro</a>

        <div class="sb-footer">
            <a href="login.php"><i data-lucide="log-out"></i> Sair</a>
        </div>
    </aside>

    <div class="workspace">
        <header class="topbar">
            <div class="tb-title" id="topbar-title">Dashboard</div>
        </header>

        <main class="content">

            <!-- =========== DASHBOARD =========== -->
            <div id="sec-inicio" class="sec active">
                <div class="page-hdr">
                    <div class="ph-title">Olá, <?= htmlspecialchars($nomeShort) ?>! 👋</div>
                    <div class="ph-sub">Acompanhe o desempenho dos seus aprendizes.</div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-green"><i data-lucide="users"></i></div></div>
                        <div class="stat-val"><?= count($listaAprendizes) ?></div><div class="stat-lbl">Aprendizes Ativos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="percent"></i></div></div>
                        <div class="stat-val"><?= $freqMedia ?>%</div><div class="stat-lbl">Frequência Média</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-amber"><i data-lucide="alert-triangle"></i></div></div>
                        <div class="stat-val"><?= $alertasFreq ?></div><div class="stat-lbl">Alertas de Frequência</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon"><i data-lucide="credit-card" style="color:<?= $sitFinColor ?>;"></i></div></div>
                        <div class="stat-val" style="color:<?= $sitFinColor ?>;"><?= $sitFin ?></div><div class="stat-lbl">Situação Financeira</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head">
                        <div class="card-title"><i data-lucide="file-text"></i> Documentos Rápidos</div>
                    </div>
                    <div style="padding:1.5rem; display:flex; gap:10px;">
                        <a href="relatorio_empresa_print.php" target="_blank" class="btn-secondary"><i data-lucide="download"></i> Baixar Relatório PDF de Aprendizes Ativos</a>
                        <button class="btn-secondary" onclick="showSec('financeiro',document.querySelector('[onclick*=financeiro]'))"><i data-lucide="receipt"></i> Visualizar Faturas</button>
                    </div>
                </div>
            </div>

            <!-- =========== APRENDIZES =========== -->
            <div id="sec-aprendizes" class="sec">
                <div class="page-hdr"><div class="ph-title">Meus Aprendizes</div></div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>CPF</th><th>Curso</th><th>Contrato</th><th>Média Freq.</th></tr></thead>
                        <tbody>
                            <?php foreach ($listaAprendizes as $a): ?>
                            <tr>
                                <td class="td-bold"><?= htmlspecialchars($a['nome']) ?></td>
                                <td><?= htmlspecialchars($a['cpf']) ?></td>
                                <td><?= htmlspecialchars($a['curso']) ?></td>
                                <td><?= date('d/m/Y', strtotime($a['data_inicio'])) ?> a <?= date('d/m/Y', strtotime($a['data_fim'])) ?></td>
                                <td>
                                    <?php if ($a['freq_perc'] >= 75): ?>
                                        <span class="pill pill-green"><?= $a['freq_perc'] ?>%</span>
                                    <?php else: ?>
                                        <span class="pill pill-red"><?= $a['freq_perc'] ?>%</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FREQUENCIA =========== -->
            <div id="sec-frequencia" class="sec">
                <div class="page-hdr"><div class="ph-title">Frequência</div></div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="calendar-check"></i> Controle de Presenças</div></div>
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>Aulas Dadas</th><th>Presenças</th><th>Faltas</th><th>Situação</th></tr></thead>
                        <tbody>
                            <?php foreach ($listaAprendizes as $a): ?>
                            <tr>
                                <td class="td-bold"><?= htmlspecialchars($a['nome']) ?></td>
                                <td><?= $a['total_aulas'] ?></td>
                                <td><?= $a['presencas'] ?></td>
                                <td><?= $a['faltas'] ?></td>
                                <td>
                                    <?php if ($a['freq_perc'] >= 75): ?>
                                        <span class="pill pill-green">OK</span>
                                    <?php else: ?>
                                        <span class="pill pill-red">Crítico</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FINANCEIRO =========== -->
            <div id="sec-financeiro" class="sec">
                <div class="page-hdr"><div class="ph-title">Financeiro</div></div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Mês de Referência</th><th>Vencimento</th><th>Valor Total</th><th>Status</th></tr></thead>
                        <tbody>
                            <?php foreach ($listaFin as $f): ?>
                            <tr>
                                <td class="td-bold"><?= htmlspecialchars($f['competencia']) ?></td>
                                <td><?= date('d/m/Y', strtotime($f['data_vencimento'])) ?></td>
                                <td>R$ <?= number_format($f['valor'], 2, ',', '.') ?></td>
                                <td>
                                    <?php if ($f['status'] === 'pago'): ?>
                                        <span class="pill pill-green">Pago</span>
                                    <?php else: ?>
                                        <span class="pill pill-red">Pendente</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>
</div>

<script>
lucide.createIcons();
function showSec(id, el) {
    event && event.preventDefault();
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    const titles = {inicio:'Dashboard',aprendizes:'Meus Aprendizes',frequencia:'Frequência',financeiro:'Financeiro'};
    document.getElementById('topbar-title').textContent = titles[id] || 'Portal da Empresa';
}
</script>
</body>
</html>
