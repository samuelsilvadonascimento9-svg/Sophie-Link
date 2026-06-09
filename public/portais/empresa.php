<?php
// portal_empresa.php — Portal da Empresa | Sophie Link
session_start();
require_once '../../includes/auth.php';
protect_page(['empresa']);
require_once '../../includes/db.php';
/** @var \PDO $pdo */

$usuario_id  = (int)($_SESSION['usuario_id']  ?? 0);
$empresa_id  = (int)($_SESSION['empresa_id']  ?? 0);
$nomeEmpresa = $_SESSION['usuario_nome'] ?? 'Empresa Parceira';
$nomeShort   = explode(' ', $nomeEmpresa)[0];

// ══════════════════════════════════════════════════════════════════════════════
// SEGURANÇA 1 — empresa_id obrigatório
// ══════════════════════════════════════════════════════════════════════════════
if (!$empresa_id) {
    die('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Erro</title></head>
    <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F1F5F9;">
    <div style="text-align:center;padding:3rem;background:#fff;border-radius:12px;border:1px solid #E2E8F0;max-width:400px;">
        <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
        <h2 style="color:#DC2626;margin-bottom:0.5rem;">Conta não vinculada</h2>
        <p style="color:#64748B;">Sua conta não está vinculada a uma empresa cadastrada. Contate o suporte técnico.</p>
        <a href="../auth/login_empresa.php" style="display:inline-block;margin-top:1.5rem;padding:10px 20px;background:#1E3A8A;color:#fff;border-radius:6px;text-decoration:none;">Voltar ao Login</a>
    </div></body></html>');
}

// ══════════════════════════════════════════════════════════════════════════════
// SEGURANÇA 2 — Revalidar empresa_id da sessão contra o banco
// Previne sessão manipulada: confirma que este usuario_id possui este empresa_id
// ══════════════════════════════════════════════════════════════════════════════
try {
    $stmtVal = $pdo->prepare(
        "SELECT empresa_id FROM usuarios WHERE id = ? AND nivel = 'empresa' LIMIT 1"
    );
    $stmtVal->execute([$usuario_id]);
    $rowVal = $stmtVal->fetch(PDO::FETCH_ASSOC);

    if (!$rowVal || (int)$rowVal['empresa_id'] !== $empresa_id) {
        error_log("[SophieLink] Tentativa de acesso com empresa_id inválido. usuario_id=$usuario_id empresa_id=$empresa_id");
        session_unset();
        session_destroy();
        header('Location: ../auth/login_empresa.php?err=sessao_invalida');
        exit;
    }
} catch (PDOException $e) {
    error_log('[SophieLink] Falha na revalidação de sessão: ' . $e->getMessage());
    die('Erro interno de autenticação. Por favor, faça login novamente.');
}

// ══════════════════════════════════════════════════════════════════════════════
// 0. AUTO-ATUALIZAR FATURAS VENCIDAS + LOG DE AUDITORIA
// ══════════════════════════════════════════════════════════════════════════════
try {
    $stmtUpd = $pdo->prepare(
        "UPDATE financeiro SET status = 'atrasado'
         WHERE empresa_id = ? AND status = 'pendente' AND data_vencimento < CURDATE()"
    );
    $stmtUpd->execute([$empresa_id]);
    $qtdAtualizadas = $stmtUpd->rowCount();

    if ($qtdAtualizadas > 0) {
        $pdo->prepare(
            "INSERT INTO logs_auditoria (usuario_id, acao, descricao) VALUES (?, 'auto_status_atrasado', ?)"
        )->execute([
            $usuario_id,
            "Sistema: {$qtdAtualizadas} fatura(s) marcada(s) como 'atrasado' automaticamente. empresa_id={$empresa_id}"
        ]);
    }
} catch (PDOException $e) {
    error_log('[SophieLink] Falha ao auto-atualizar status financeiro: ' . $e->getMessage());
    // Não fatal — o portal continua funcionando
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. APRENDIZES — JOIN com turmas/cursos + frequência dentro do contrato
//    Inclui dias_fim_contrato para detecção de expiração
// ══════════════════════════════════════════════════════════════════════════════
try {
    $stmtApr = $pdo->prepare("
        SELECT
            a.id, a.nome, a.cpf, a.telefone, a.email, a.status_risco,
            c.data_inicio, c.data_fim, c.valor AS valor_contrato,
            COALESCE(cu.nome, 'Não informado') AS curso_nome,
            COALESCE(t.nome,  'Sem turma')     AS turma_nome,
            COUNT(DISTINCT f.id)                                     AS total_aulas,
            SUM(CASE WHEN f.status = 'presente' THEN 1 ELSE 0 END) AS presencas,
            DATEDIFF(c.data_fim, CURDATE())                         AS dias_fim_contrato,
            (SELECT AVG(valor_nota) FROM notas n WHERE n.aprendiz_id = a.id) AS media_notas
        FROM contratos c
        JOIN aprendizes a   ON c.aprendiz_id = a.id
        LEFT JOIN turmas t  ON a.turma_id    = t.id
        LEFT JOIN cursos cu ON t.curso_id    = cu.id
        LEFT JOIN frequencia f
            ON  f.aprendiz_id   = a.id
            AND f.data_registro BETWEEN c.data_inicio AND c.data_fim
        WHERE c.empresa_id = ? AND c.status = 'ativo'
        GROUP BY
            a.id, a.nome, a.cpf, a.telefone, a.email,
            c.data_inicio, c.data_fim, c.valor, cu.nome, t.nome
        ORDER BY a.nome ASC
    ");
    $stmtApr->execute([$empresa_id]);
    $listaAprendizes = $stmtApr->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log('[SophieLink] Falha ao buscar aprendizes: ' . $e->getMessage());
    $listaAprendizes = [];
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. CALCULAR FREQUÊNCIA + DETECTAR CONTRATOS EXPIRANDO
// ══════════════════════════════════════════════════════════════════════════════
$totalPresencas      = 0;
$totalAulas          = 0;
$contratosExpirando  = []; // agrupa 30d e 60d com urgência

foreach ($listaAprendizes as $k => $apr) {
    $presencas = (int)$apr['presencas'];
    $aulas     = (int)$apr['total_aulas'];
    $listaAprendizes[$k]['faltas']    = $aulas - $presencas;
    $listaAprendizes[$k]['freq_perc'] = $aulas > 0 ? round(($presencas / $aulas) * 100) : 100;
    $totalPresencas += $presencas;
    $totalAulas     += $aulas;

    $diasFim = (int)$apr['dias_fim_contrato'];
    if ($diasFim >= 0 && $diasFim <= 60) {
        $listaAprendizes[$k]['urgencia'] = $diasFim <= 30 ? 'critica' : 'atencao';
        $contratosExpirando[] = $listaAprendizes[$k];
    }
}

usort($contratosExpirando, fn($a, $b) => $a['dias_fim_contrato'] <=> $b['dias_fim_contrato']);

$freqMedia   = $totalAulas > 0 ? round(($totalPresencas / $totalAulas) * 100) : 100;
$alertasFreq = count(array_filter($listaAprendizes, fn($a) => $a['freq_perc'] < 75));
$qtdAtivos   = count($listaAprendizes);

// ══════════════════════════════════════════════════════════════════════════════
// 3. FINANCEIRO — UMA QUERY, FILTRAGEM EM PHP (sem N+1)
// ══════════════════════════════════════════════════════════════════════════════
// Parâmetros de filtro (validados)
$filtroMes    = isset($_GET['mes'])    && preg_match('/^\d{4}-\d{2}$/', $_GET['mes'])                         ? $_GET['mes']    : '';
$filtroStatus = isset($_GET['status']) && in_array($_GET['status'], ['pago','pendente','atrasado'], true)      ? $_GET['status'] : '';
$activeTab    = ($filtroMes || $filtroStatus) ? 'financeiro' : (isset($_GET['tab']) ? $_GET['tab'] : 'inicio');

try {
    $stmtFin = $pdo->prepare(
        "SELECT * FROM financeiro WHERE empresa_id = ? ORDER BY data_vencimento DESC"
    );
    $stmtFin->execute([$empresa_id]);
    $todasFaturas = $stmtFin->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log('[SophieLink] Falha ao buscar financeiro: ' . $e->getMessage());
    $todasFaturas = [];
}

// Totalizadores (sempre sobre TODAS as faturas, antes de filtrar)
$totalPago     = 0.0;
$totalPendente = 0.0;
$totalAtrasado = 0.0;
$totalPagoMes  = 0.0;
$mesAtual      = date('Y-m');

foreach ($todasFaturas as $f) {
    $val = (float)$f['valor'];
    switch ($f['status']) {
        case 'pago':
            $totalPago += $val;
            if ($f['data_pagamento'] && date('Y-m', strtotime($f['data_pagamento'])) === $mesAtual) {
                $totalPagoMes += $val;
            }
            break;
        case 'pendente': $totalPendente += $val; break;
        case 'atrasado': $totalAtrasado += $val; break;
    }
}

// Filtrar para exibição (sem segunda query ao banco)
$listaFin = array_values(array_filter($todasFaturas, function ($f) use ($filtroMes, $filtroStatus) {
    $okMes    = !$filtroMes    || date('Y-m', strtotime($f['data_vencimento'])) === $filtroMes;
    $okStatus = !$filtroStatus || $f['status'] === $filtroStatus;
    return $okMes && $okStatus;
}));

$sitFin      = $totalAtrasado > 0 ? 'Atrasado' : ($totalPendente > 0 ? 'Pendente' : 'Em dia');
$sitFinColor = $totalAtrasado > 0 ? '#DC2626'  : ($totalPendente > 0 ? '#D97706'  : '#16A34A');
$sitFinBg    = $totalAtrasado > 0 ? '#FEF2F2'  : ($totalPendente > 0 ? '#FFFBEB'  : '#F0FDF4');

// ══════════════════════════════════════════════════════════════════════════════
// 4. ESTIMATIVA + MESES DISPONÍVEIS (derivado de $todasFaturas, sem query extra)
// ══════════════════════════════════════════════════════════════════════════════
$estimativaFatura = array_sum(array_column($listaAprendizes, 'valor_contrato'));

$mesesDisponiveis = array_unique(array_map(
    fn($f) => date('Y-m', strtotime($f['data_vencimento'])),
    $todasFaturas
));
rsort($mesesDisponiveis);

// ══════════════════════════════════════════════════════════════════════════════
// 5. EVOLUÇÃO FINANCEIRA — últimos 6 meses (para gráfico do dashboard)
// ══════════════════════════════════════════════════════════════════════════════
try {
    $stmtEvol = $pdo->prepare("
        SELECT
            DATE_FORMAT(data_vencimento, '%Y-%m')                           AS mes,
            SUM(CASE WHEN status = 'pago'                  THEN valor ELSE 0 END) AS pago,
            SUM(CASE WHEN status IN ('pendente','atrasado') THEN valor ELSE 0 END) AS pendente
        FROM financeiro
        WHERE empresa_id = ?
          AND data_vencimento >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY mes
        ORDER BY mes ASC
    ");
    $stmtEvol->execute([$empresa_id]);
    $evolucaoFin = $stmtEvol->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log('[SophieLink] Falha ao buscar evolução financeira: ' . $e->getMessage());
    $evolucaoFin = [];
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. PREPARAR DADOS PARA CHARTS E ROI
// ══════════════════════════════════════════════════════════════════════════════
$nomesChart = json_encode(array_map(fn($a) => explode(' ', $a['nome'])[0], $listaAprendizes));
$freqsChart = json_encode(array_map(fn($a) => $a['freq_perc'], $listaAprendizes));
$notasChart = json_encode(array_map(fn($a) => isset($a['media_notas']) ? round((float)$a['media_notas'], 1) : 0, $listaAprendizes));

$roiScores = array_map(function($a) {
    $notaP = isset($a['media_notas']) ? ((float)$a['media_notas'] * 10) : 0; // 0 a 100
    $freqP = $a['freq_perc'];
    // Se não tiver notas registradas, o ROI baseia-se apenas na frequência
    if ($notaP == 0) return $freqP;
    return round(($notaP + $freqP) / 2);
}, $listaAprendizes);
$roiChart = json_encode($roiScores);

$meses_pt   = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
$evolLabels = json_encode(array_map(fn($r) => $meses_pt[(int)substr($r['mes'],5,2)] . '/' . substr($r['mes'],2,2), $evolucaoFin));
$evolPago   = json_encode(array_map(fn($r) => (float)$r['pago'],    $evolucaoFin));
$evolPend   = json_encode(array_map(fn($r) => (float)$r['pendente'], $evolucaoFin));

// ══════════════════════════════════════════════════════════════════════════════
// 7. EXPORT CSV — precisa estar depois de carregar os dados e antes do HTML
// ══════════════════════════════════════════════════════════════════════════════
if (isset($_GET['export']) && in_array($_GET['export'], ['aprendizes','financeiro'], true)) {
    $tipo     = $_GET['export'];
    $filename = ($tipo === 'aprendizes' ? 'aprendizes' : 'extrato_financeiro') . '_' . date('Y-m-d') . '.csv';

    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: 0');
    header('Pragma: no-cache');

    $out = fopen('php://output', 'w');
    fprintf($out, chr(0xEF) . chr(0xBB) . chr(0xBF)); // BOM UTF-8 para Excel abrir corretamente

    if ($tipo === 'aprendizes') {
        fputcsv($out, ['Nome','CPF','Curso','Turma','Início Contrato','Fim Contrato','Valor Contrato (R$)','Total Aulas','Presenças','Faltas','Frequência (%)'], ';');
        foreach ($listaAprendizes as $a) {
            fputcsv($out, [
                $a['nome'], $a['cpf'], $a['curso_nome'], $a['turma_nome'],
                date('d/m/Y', strtotime($a['data_inicio'])),
                date('d/m/Y', strtotime($a['data_fim'])),
                number_format((float)$a['valor_contrato'], 2, ',', '.'),
                $a['total_aulas'], $a['presencas'], $a['faltas'], $a['freq_perc'] . '%',
            ], ';');
        }
    } else {
        fputcsv($out, ['Competência','Vencimento','Valor (R$)','Status','Data Pagamento','Observações'], ';');
        foreach ($listaFin as $f) {
            fputcsv($out, [
                $f['competencia'],
                date('d/m/Y', strtotime($f['data_vencimento'])),
                number_format((float)$f['valor'], 2, ',', '.'),
                $f['status'],
                $f['data_pagamento'] ? date('d/m/Y', strtotime($f['data_pagamento'])) : '',
                $f['observacoes'] ?? '',
            ], ';');
        }
    }
    fclose($out);
    exit;
}

// ══════════════════════════════════════════════════════════════════════════════
// Helpers para URLs com filtros combinados
// ══════════════════════════════════════════════════════════════════════════════
function urlFin(string $status = '', string $mes = ''): string {
    $p = ['tab' => 'financeiro'];
    if ($status) $p['status'] = $status;
    if ($mes)    $p['mes']    = $mes;
    return 'empresa.php?' . http_build_query($p);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Corporativo — Sophie Link</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="../assets/css/portais/empresa.css?v=<?= time() ?>">
    <script>
        // Dados para charts — injetados pelo PHP antes do JS externo
        window._chartFreqLabels  = <?= $nomesChart ?>;
        window._chartFreqDados   = <?= $freqsChart ?>;
        window._chartNotasDados  = <?= $notasChart ?>;
        window._chartRoiDados    = <?= $roiChart ?>;
        window._chartEvolLabels  = <?= $evolLabels ?>;
        window._chartEvolPago    = <?= $evolPago ?>;
        window._chartEvolPend    = <?= $evolPend ?>;
        window._activeTab        = <?= json_encode($activeTab) ?>;
    </script>
</head>
<body>
<div class="app">

<!-- ═════════════════════════════════════════════════════════════════
     SIDEBAR
═════════════════════════════════════════════════════════════════ -->
<aside class="sidebar">
    <div class="sb-brand" style="justify-content: center; overflow: hidden; padding: 20px 0;">
        <img src="../assets/images/logoNome.png" alt="Sophie Link Logo" style="width: 100px; height: auto; transform: scale(1.4);">
    </div>

    <div class="sb-user">
        <div class="sb-avatar"><?= strtoupper(substr($nomeShort, 0, 1)) ?></div>
        <div>
            <div class="sb-uname"><?= htmlspecialchars($nomeEmpresa) ?></div>
            <div class="sb-urole">Empresa Parceira</div>
            <div class="sb-ra">ID: <?= str_pad($empresa_id, 6, '0', STR_PAD_LEFT) ?></div>
        </div>
    </div>

    <div class="sb-sec">Menu</div>
    <nav class="sb-nav">
        <div class="nav-link" id="nav-inicio"     data-sec="inicio"     onclick="showSec('inicio',this)">
            <i data-lucide="layout-dashboard"></i> Início
        </div>
        <div class="nav-link" id="nav-aprendizes" data-sec="aprendizes" onclick="showSec('aprendizes',this)">
            <i data-lucide="users"></i> Aprendizes
        </div>
        <div class="nav-link" id="nav-frequencia" data-sec="frequencia" onclick="showSec('frequencia',this)">
            <i data-lucide="calendar-check"></i> Frequência
        </div>
        <div class="nav-link" id="nav-financeiro" data-sec="financeiro" onclick="showSec('financeiro',this)">
            <i data-lucide="credit-card"></i> Financeiro
            <?php if ($totalAtrasado > 0): ?>
            <span class="nav-badge" style="position: static; margin-left: auto;">!</span>
            <?php endif; ?>
        </div>
    </nav>

    <div class="sb-footer">
        <a href="../auth/logout.php">
            <i data-lucide="log-out"></i> Sair
        </a>
    </div>
</aside>

<!-- ═════════════════════════════════════════════════════════════════
     WORKSPACE
═════════════════════════════════════════════════════════════════ -->
<div class="workspace">
    <header class="topbar">
        <div class="tb-left">
            <div class="tb-title" id="topbar-title">Dashboard</div>
        </div>
        <div class="tb-user">
            <div class="tb-info">
                <div class="tb-name"><?= htmlspecialchars($nomeEmpresa) ?></div>
                <div class="tb-role">Parceiro B2B · <?= date('d/m/Y') ?></div>
            </div>
            <div class="tb-avatar"><?= strtoupper(substr($nomeShort, 0, 1)) ?></div>
        </div>
    </header>

    <main class="content">

<!-- ═════════════════════════════════════════════════════════════════
     DASHBOARD
═════════════════════════════════════════════════════════════════ -->
<div id="sec-inicio" class="sec">
    <div class="page-header">
        <div class="ph-title">Olá, <strong><?= htmlspecialchars($nomeShort) ?></strong></div>
        <div class="ph-sub">Acompanhamento executivo de contratos de aprendizagem</div>
    </div>

    <!-- Alertas críticos -->
    <?php if ($totalAtrasado > 0): ?>
    <div class="alert-banner alert-danger">
        <i data-lucide="alert-triangle"></i>
        <div><strong>Faturas em atraso:</strong> R$ <?= number_format($totalAtrasado, 2, ',', '.') ?> em aberto.
        <a href="<?= urlFin('atrasado') ?>" style="color:inherit;font-weight:700;margin-left:8px;text-decoration:underline;">Ver faturas →</a></div>
    </div>
    <?php endif; ?>
    <?php if ($alertasFreq > 0): ?>
    <div class="alert-banner alert-warn">
        <i data-lucide="user-x"></i>
        <div><strong><?= $alertasFreq ?> aprendiz<?= $alertasFreq > 1 ? 'es' : '' ?></strong> com frequência abaixo de 75% (mínimo legal).
        <a href="#" onclick="showSec('frequencia',document.getElementById('nav-frequencia'));return false;" style="color:inherit;font-weight:700;margin-left:8px;text-decoration:underline;">Ver relatório →</a></div>
    </div>
    <?php endif; ?>

    <!-- KPIs -->
    <div class="stats-grid">
        <div class="stat-card" onclick="showSec('aprendizes',document.getElementById('nav-aprendizes'))" style="cursor:pointer;">
            <div class="stat-icon-wrap blue"><i data-lucide="users"></i></div>
            <div class="stat-val"><?= $qtdAtivos ?></div>
            <div class="stat-lbl">Aprendizes Ativos</div>
        </div>
        <div class="stat-card" onclick="showSec('frequencia',document.getElementById('nav-frequencia'))" style="cursor:pointer;">
            <div class="stat-icon-wrap <?= $freqMedia >= 75 ? 'green' : 'red' ?>"><i data-lucide="activity"></i></div>
            <div class="stat-val"><?= $freqMedia ?>%</div>
            <div class="stat-lbl">Frequência Global</div>
            <div class="stat-sub">Mínimo legal: 75%</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon-wrap <?= $alertasFreq > 0 ? 'red' : 'green' ?>"><i data-lucide="alert-circle"></i></div>
            <div class="stat-val"><?= $alertasFreq ?></div>
            <div class="stat-lbl">Alertas freq. crítica</div>
            <div class="stat-sub"><?= $alertasFreq > 0 ? 'Requer atenção' : 'Tudo em ordem' ?></div>
        </div>
        <div class="stat-card" onclick="showSec('financeiro',document.getElementById('nav-financeiro'))" style="cursor:pointer;">
            <div class="stat-icon-wrap" style="background:<?= $sitFinBg ?>;color:<?= $sitFinColor ?>;"><i data-lucide="briefcase"></i></div>
            <div class="stat-val" style="color:<?= $sitFinColor ?>;font-size:1.6rem;"><?= $sitFin ?></div>
            <div class="stat-lbl">Situação Financeira</div>
        </div>
    </div>

    <!-- Contratos expirando -->
    <?php if (!empty($contratosExpirando)): ?>
    <div class="panel expiring-panel">
        <div class="panel-head">
            <div class="panel-title" style="color:#D97706;">
                <i data-lucide="clock" style="width:18px;height:18px;vertical-align:middle;margin-right:8px;"></i>
                Contratos a Vencer (próximos 60 dias)
            </div>
            <span class="count-badge"><?= count($contratosExpirando) ?></span>
        </div>
        <div class="expiring-list">
            <?php foreach ($contratosExpirando as $e): $dias = (int)$e['dias_fim_contrato']; ?>
            <div class="expiring-item <?= $e['urgencia'] === 'critica' ? 'expiring-urgent' : 'expiring-warn' ?>">
                <div class="expiring-info">
                    <div class="expiring-name"><?= htmlspecialchars($e['nome']) ?></div>
                    <div class="expiring-date"><?= $e['curso_nome'] ?> · Vence em <?= date('d/m/Y', strtotime($e['data_fim'])) ?></div>
                </div>
                <span class="expiring-badge <?= $e['urgencia'] === 'critica' ? 'badge-urgent' : 'badge-warn' ?>">
                    <?= $dias ?> dia<?= $dias !== 1 ? 's' : '' ?>
                </span>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

    <!-- Painel de faturamento -->
    <div class="panel">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="receipt" style="width:18px;height:18px;vertical-align:middle;margin-right:8px;"></i>Estimativa da Próxima Fatura</div>
        </div>
        <div class="fatura-block">
            <div class="fatura-info">
                <div class="fatura-label">Valor estimado — soma dos contratos ativos</div>
                <div class="fatura-valor">R$ <?= number_format($estimativaFatura, 2, ',', '.') ?></div>
                <div class="fatura-detail"><?= $qtdAtivos ?> aprendiz<?= $qtdAtivos !== 1 ? 'es' : '' ?> com contrato vigente</div>
                <?php if ($totalPagoMes > 0): ?>
                <div class="fatura-detail" style="color:#16A34A;margin-top:4px;">
                    <i data-lucide="check-circle" style="width:13px;height:13px;vertical-align:middle;"></i>
                    Pago em <?= date('m/Y') ?>: R$ <?= number_format($totalPagoMes, 2, ',', '.') ?>
                </div>
                <?php endif; ?>
            </div>
            <div class="fatura-actions">
                <a href="relatorio_empresa_print.php" target="_blank" class="btn btn-primary">
                    <i data-lucide="printer"></i> Imprimir Extrato
                </a>
                <button class="btn btn-outline" onclick="showSec('financeiro',document.getElementById('nav-financeiro'))">
                    <i data-lucide="file-text"></i> Ver Extrato
                </button>
            </div>
        </div>
    </div>

    <!-- Gráfico de frequência -->
    <div class="panel" style="margin-top:1.5rem;">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="bar-chart-2" style="width:18px;height:18px;vertical-align:middle;margin-right:8px;"></i>Frequência por Aprendiz</div>
            <div style="font-size:0.8rem;color:#64748B;">Linha — = mínimo legal (75%)</div>
        </div>
        <div style="padding:2rem;">
            <?php if ($qtdAtivos > 0): ?>
            <canvas id="freqChart" height="80"></canvas>
            <?php else: ?>
            <div class="empty-state"><i data-lucide="bar-chart-2" style="opacity:.3;width:40px;height:40px;"></i><p>Nenhum aprendiz ativo para exibir.</p></div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Gráfico de ROI -->
    <div class="panel" style="margin-top:1.5rem;">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="pie-chart" style="width:18px;height:18px;vertical-align:middle;margin-right:8px;"></i>Retorno sobre Investimento (ROI)</div>
            <div style="font-size:0.8rem;color:#64748B;">Cruzamento de Notas e Frequência</div>
        </div>
        <div style="padding:2rem;">
            <?php if ($qtdAtivos > 0): ?>
            <canvas id="roiChart" height="80"></canvas>
            <?php else: ?>
            <div class="empty-state"><i data-lucide="pie-chart" style="opacity:.3;width:40px;height:40px;"></i><p>Nenhum aprendiz ativo para exibir.</p></div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Gráfico de evolução financeira -->
    <div class="panel" style="margin-top:1.5rem;">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="trending-up" style="width:18px;height:18px;vertical-align:middle;margin-right:8px;"></i>Evolução Financeira — Últimos 6 meses</div>
        </div>
        <div style="padding:2rem;">
            <?php if (!empty($evolucaoFin)): ?>
            <canvas id="evolChart" height="70"></canvas>
            <?php else: ?>
            <div class="empty-state"><p>Sem dados financeiros para o período.</p></div>
            <?php endif; ?>
        </div>
    </div>
</div>

<!-- ═════════════════════════════════════════════════════════════════
     APRENDIZES
═════════════════════════════════════════════════════════════════ -->
<div id="sec-aprendizes" class="sec">
    <div class="page-header">
        <div class="ph-title">Relação de <strong>Aprendizes</strong></div>
        <div class="ph-sub"><?= $qtdAtivos ?> contrato<?= $qtdAtivos !== 1 ? 's' : '' ?> ativo<?= $qtdAtivos !== 1 ? 's' : '' ?> vinculado<?= $qtdAtivos !== 1 ? 's' : '' ?> à sua empresa</div>
    </div>
    <div class="panel">
        <?php if (empty($listaAprendizes)): ?>
        <div class="empty-state">
            <i data-lucide="users" style="opacity:.3;width:40px;height:40px;"></i>
            <p>Nenhum aprendiz ativo vinculado à sua empresa.</p>
        </div>
        <?php else: ?>
        <div class="table-toolbar">
            <div class="search-wrap">
                <i data-lucide="search" class="search-icon"></i>
                <input type="text" id="search-aprendizes" class="search-input" placeholder="Buscar por nome, CPF ou curso...">
            </div>
            <div style="display:flex;gap:8px;">
                <a href="?export=aprendizes" class="btn btn-outline btn-sm" title="Exportar lista completa em CSV">
                    <i data-lucide="download"></i> Exportar CSV
                </a>
            </div>
        </div>
        <table class="data-table" id="table-aprendizes">
            <thead>
                <tr>
                    <th class="sortable" data-sort="0">Nome <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="1">CPF <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="2">Curso <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="3">Turma <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="4" style="text-align:center;">Fim Contrato <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="5" style="text-align:center;">Frequência <span class="sort-icon">↕</span></th>
                    <th style="text-align:center;">Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($listaAprendizes as $a):
                    $critico  = $a['freq_perc'] < 75;
                    $freqBg   = $critico ? '#FEE2E2' : '#DCFCE7';
                    $freqCol  = $critico ? '#DC2626' : '#16A34A';
                    $diasFim  = (int)$a['dias_fim_contrato'];
                    $expClass = $diasFim >= 0 && $diasFim <= 30 ? 'expiring-row-urgent' : ($diasFim <= 60 ? 'expiring-row-warn' : '');
                ?>
                <tr class="<?= $critico ? 'row-critical' : '' ?> <?= $expClass ?>">
                    <td>
                        <div style="font-weight:600;color:var(--c-brand);"><?= htmlspecialchars($a['nome']) ?></div>
                        <?php if ($a['status_risco'] === 'Alto'): ?>
                        <div style="font-size:0.72rem;color:#DC2626;margin-top:2px; font-weight:bold;"><i data-lucide="siren" style="width:11px;height:11px;vertical-align:middle;"></i> Alto Risco de Evasão</div>
                        <?php elseif ($a['status_risco'] === 'Medio'): ?>
                        <div style="font-size:0.72rem;color:#D97706;margin-top:2px;"><i data-lucide="alert-circle" style="width:11px;height:11px;vertical-align:middle;"></i> Risco Médio de Evasão</div>
                        <?php endif; ?>
                        <?php if ($critico): ?>
                        <div style="font-size:0.72rem;color:#DC2626;margin-top:1px;"><i data-lucide="alert-triangle" style="width:11px;height:11px;vertical-align:middle;"></i> Frequência crítica</div>
                        <?php endif; ?>
                        <?php if ($diasFim >= 0 && $diasFim <= 30): ?>
                        <div style="font-size:0.72rem;color:#D97706;margin-top:1px;"><i data-lucide="clock" style="width:11px;height:11px;vertical-align:middle;"></i> Contrato vence em <?= $diasFim ?> dia<?= $diasFim !== 1 ? 's' : '' ?></div>
                        <?php endif; ?>
                    </td>
                    <td><?= htmlspecialchars($a['cpf']) ?></td>
                    <td><?= htmlspecialchars($a['curso_nome']) ?></td>
                    <td><?= htmlspecialchars($a['turma_nome']) ?></td>
                    <td style="text-align:center;" data-value="<?= $a['data_fim'] ?>">
                        <?= date('d/m/Y', strtotime($a['data_fim'])) ?>
                    </td>
                    <td style="text-align:center;" data-value="<?= $a['freq_perc'] ?>">
                        <span class="freq-badge" style="background:<?= $freqBg ?>;color:<?= $freqCol ?>;">
                            <?= $a['freq_perc'] ?>%
                        </span>
                    </td>
                    <td style="text-align:center;">
                        <a href="../reports/auditoria_mte.php?aprendiz_id=<?= $a['id'] ?>" target="_blank" class="btn btn-outline btn-sm" title="Dossiê do Ministério do Trabalho" style="padding:4px 8px; font-size:0.75rem; border-color: #CBD5E1;">
                            <i data-lucide="printer" style="width:12px;height:12px;margin-right:4px;"></i> MTE
                        </a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <div class="table-footer">
            <span id="aprendizes-count" class="table-count"><?= count($listaAprendizes) ?> aprendiz<?= count($listaAprendizes) !== 1 ? 'es' : '' ?></span>
        </div>
        <?php endif; ?>
    </div>
</div>

<!-- ═════════════════════════════════════════════════════════════════
     FREQUÊNCIA
═════════════════════════════════════════════════════════════════ -->
<div id="sec-frequencia" class="sec">
    <div class="page-header">
        <div class="ph-title">Relatório de <strong>Frequência</strong></div>
        <div class="ph-sub">Registros calculados dentro do período de cada contrato ativo</div>
    </div>

    <div class="freq-summary">
        <div class="freq-sum-card">
            <div class="freq-sum-val"><?= $freqMedia ?>%</div>
            <div class="freq-sum-lbl">Média Global</div>
        </div>
        <div class="freq-sum-card">
            <div class="freq-sum-val" style="color:<?= $alertasFreq > 0 ? '#DC2626' : '#16A34A' ?>;"><?= $alertasFreq ?></div>
            <div class="freq-sum-lbl">Abaixo de 75%</div>
        </div>
        <div class="freq-sum-card">
            <div class="freq-sum-val"><?= $totalAulas ?></div>
            <div class="freq-sum-lbl">Total de Aulas</div>
        </div>
        <div class="freq-sum-card">
            <div class="freq-sum-val" style="color:#DC2626;"><?= $totalAulas - $totalPresencas ?></div>
            <div class="freq-sum-lbl">Total de Faltas</div>
        </div>
    </div>

    <div class="panel">
        <?php if (empty($listaAprendizes)): ?>
        <div class="empty-state">
            <i data-lucide="calendar-x" style="opacity:.3;width:40px;height:40px;"></i>
            <p>Nenhum aprendiz ativo para exibir frequência.</p>
        </div>
        <?php else: ?>
        <div class="table-toolbar">
            <div class="search-wrap">
                <i data-lucide="search" class="search-icon"></i>
                <input type="text" id="search-frequencia" class="search-input" placeholder="Buscar por nome...">
            </div>
            <a href="?export=aprendizes" class="btn btn-outline btn-sm">
                <i data-lucide="download"></i> Exportar CSV
            </a>
        </div>
        <table class="data-table" id="table-frequencia">
            <thead>
                <tr>
                    <th class="sortable" data-sort="0">Aprendiz <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="1" style="text-align:center;">Aulas <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="2" style="text-align:center;">Presenças <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="3" style="text-align:center;">Faltas <span class="sort-icon">↕</span></th>
                    <th class="sortable" data-sort="4" style="text-align:center;">Freq. % <span class="sort-icon">↕</span></th>
                    <th style="text-align:center;">Situação Legal</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($listaAprendizes as $a):
                    $critico = $a['freq_perc'] < 75;
                ?>
                <tr class="<?= $critico ? 'row-critical' : '' ?>">
                    <td style="font-weight:500;"><?= htmlspecialchars($a['nome']) ?></td>
                    <td style="text-align:center;" data-value="<?= $a['total_aulas'] ?>"><?= $a['total_aulas'] ?></td>
                    <td style="text-align:center;color:#16A34A;font-weight:500;" data-value="<?= $a['presencas'] ?>"><?= $a['presencas'] ?></td>
                    <td style="text-align:center;color:#DC2626;font-weight:600;" data-value="<?= $a['faltas'] ?>"><?= $a['faltas'] ?></td>
                    <td style="text-align:center;" data-value="<?= $a['freq_perc'] ?>">
                        <div class="freq-bar-wrap"><div class="freq-bar" style="width:<?= min($a['freq_perc'],100) ?>%;background:<?= $critico ? '#DC2626' : '#16A34A' ?>;"></div></div>
                        <div style="font-size:0.85rem;font-weight:600;color:<?= $critico ? '#DC2626' : '#16A34A' ?>;"><?= $a['freq_perc'] ?>%</div>
                    </td>
                    <td style="text-align:center;">
                        <?php if ($critico): ?>
                        <span class="status-badge status-danger"><i data-lucide="x-circle" style="width:12px;height:12px;"></i> Crítico</span>
                        <?php else: ?>
                        <span class="status-badge status-ok"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Regular</span>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <div class="table-footer">
            <span id="frequencia-count" class="table-count"><?= count($listaAprendizes) ?> registro<?= count($listaAprendizes) !== 1 ? 's' : '' ?></span>
        </div>
        <?php endif; ?>
    </div>
</div>

<!-- ═════════════════════════════════════════════════════════════════
     FINANCEIRO
═════════════════════════════════════════════════════════════════ -->
<div id="sec-financeiro" class="sec">
    <div class="page-header">
        <div class="ph-title">Extrato <strong>Financeiro</strong></div>
        <div class="ph-sub">Histórico de cobranças e pagamentos da sua empresa</div>
    </div>

    <!-- Totalizadores -->
    <div class="fin-totals">
        <div class="fin-total-card" onclick="window.location='<?= urlFin('pago') ?>'" style="cursor:pointer;">
            <div class="fin-total-label">Total Pago (Histórico)</div>
            <div class="fin-total-val" style="color:#16A34A;">R$ <?= number_format($totalPago, 2, ',', '.') ?></div>
        </div>
        <div class="fin-total-card" onclick="window.location='<?= urlFin('pendente') ?>'" style="cursor:pointer;">
            <div class="fin-total-label">Pendente (a vencer)</div>
            <div class="fin-total-val" style="color:#D97706;">R$ <?= number_format($totalPendente, 2, ',', '.') ?></div>
        </div>
        <div class="fin-total-card <?= $totalAtrasado > 0 ? 'fin-total-danger' : '' ?>" onclick="window.location='<?= urlFin('atrasado') ?>'" style="cursor:pointer;">
            <div class="fin-total-label">Em atraso ⚠</div>
            <div class="fin-total-val" style="color:#DC2626;">R$ <?= number_format($totalAtrasado, 2, ',', '.') ?></div>
        </div>
        <div class="fin-total-card">
            <div class="fin-total-label">Pago em <?= date('m/Y') ?></div>
            <div class="fin-total-val" style="color:#16A34A;">R$ <?= number_format($totalPagoMes, 2, ',', '.') ?></div>
        </div>
    </div>

    <!-- Tabela de faturas -->
    <div class="panel">
        <div class="panel-head" style="flex-wrap:wrap;gap:12px;">
            <div class="panel-title"><i data-lucide="list" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i>Histórico de Faturas</div>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">

                <!-- Chips de status -->
                <div class="chip-filters">
                    <a href="<?= urlFin('', $filtroMes) ?>" class="chip <?= !$filtroStatus ? 'chip-active' : '' ?>">Todas</a>
                    <a href="<?= urlFin('pago', $filtroMes) ?>" class="chip chip-green <?= $filtroStatus === 'pago' ? 'chip-active' : '' ?>">Pagos</a>
                    <a href="<?= urlFin('pendente', $filtroMes) ?>" class="chip chip-yellow <?= $filtroStatus === 'pendente' ? 'chip-active' : '' ?>">A vencer</a>
                    <a href="<?= urlFin('atrasado', $filtroMes) ?>" class="chip chip-red <?= $filtroStatus === 'atrasado' ? 'chip-active' : '' ?>">Atrasados</a>
                </div>

                <!-- Filtro de mês -->
                <form method="GET" id="formFiltroFin" style="display:flex;align-items:center;gap:8px;">
                    <input type="hidden" name="tab" value="financeiro">
                    <?php if ($filtroStatus): ?>
                    <input type="hidden" name="status" value="<?= htmlspecialchars($filtroStatus) ?>">
                    <?php endif; ?>
                    <select name="mes" onchange="this.form.submit()" class="filter-select">
                        <option value="">Todos os meses</option>
                        <?php
                        $meses_pt_full = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
                        foreach ($mesesDisponiveis as $mes):
                            [$ano, $mNum] = explode('-', $mes);
                            $lbl = $meses_pt_full[(int)$mNum] . ' / ' . $ano;
                        ?>
                        <option value="<?= $mes ?>" <?= $filtroMes === $mes ? 'selected' : '' ?>><?= $lbl ?></option>
                        <?php endforeach; ?>
                    </select>
                </form>

                <a href="?export=financeiro<?= $filtroMes ? '&mes='.$filtroMes : '' ?><?= $filtroStatus ? '&status='.$filtroStatus : '' ?>" class="btn btn-outline btn-sm">
                    <i data-lucide="download"></i> CSV
                </a>

                <?php if ($filtroMes || $filtroStatus): ?>
                <a href="empresa.php?tab=financeiro" class="chip chip-clear">✕ Limpar filtros</a>
                <?php endif; ?>
            </div>
        </div>

        <?php if (empty($listaFin)): ?>
        <div class="empty-state">
            <i data-lucide="file-x" style="opacity:.3;width:40px;height:40px;"></i>
            <p><?= ($filtroMes || $filtroStatus) ? 'Nenhuma fatura encontrada para os filtros aplicados.' : 'Nenhum registro financeiro cadastrado.' ?></p>
        </div>
        <?php else: ?>
        <div class="faturas-list" style="padding: 1rem 1.75rem; display: flex; flex-direction: column; gap: 12px; background: #FAFAFA;">
            <?php foreach ($listaFin as $f):
                switch ($f['status']) {
                    case 'pago':
                        $stBg = '#DCFCE7'; $stCol = '#16A34A'; $stLabel = 'Pago'; break;
                    case 'atrasado':
                        $stBg = '#FEE2E2'; $stCol = '#DC2626'; $stLabel = 'Atrasado'; break;
                    default:
                        $stBg = '#FEF3C7'; $stCol = '#D97706'; $stLabel = 'A Vencer'; break;
                }
                $isAtrasado = $f['status'] === 'atrasado';
                $diasAtraso = 0;
                if ($isAtrasado) {
                    $diff = (new DateTime())->diff(new DateTime($f['data_vencimento']));
                    $diasAtraso = $diff->invert ? $diff->days : -$diff->days;
                    $diasAtraso = abs($diasAtraso);
                }
            ?>
            <div class="fatura-row" style="display: flex; justify-content: space-between; align-items: center; border: 1px solid <?= $isAtrasado ? '#FECACA' : '#E2E8F0' ?>; padding: 18px 24px; border-radius: 8px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                
                <div style="display: flex; align-items: center; gap: 16px; width: 25%;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background: <?= $isAtrasado ? '#FEF2F2' : ($f['status'] === 'pago' ? '#F0FDF4' : '#F8FAFC') ?>; color: <?= $isAtrasado ? '#DC2626' : ($f['status'] === 'pago' ? '#16A34A' : '#64748B') ?>; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i data-lucide="file-text" style="width: 22px; height: 22px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 0.8rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px;">Competência</div>
                        <div style="font-size: 1rem; font-weight: 600; color: #1E293B; margin-top: 2px;"><?= htmlspecialchars($f['competencia']) ?></div>
                    </div>
                </div>

                <div style="width: 25%;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px;">Vencimento</div>
                    <div style="font-size: 1rem; font-weight: 500; color: #475569; margin-top: 2px;">
                        <?= date('d/m/Y', strtotime($f['data_vencimento'])) ?>
                    </div>
                </div>

                <div style="width: 20%;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px;">Valor</div>
                    <div style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-top: 2px; font-family: monospace;">
                        R$ <?= number_format((float)$f['valor'], 2, ',', '.') ?>
                    </div>
                </div>

                <div style="width: 30%; display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                    <span class="fin-badge" style="background:<?= $stBg ?>;color:<?= $stCol ?>; padding: 6px 14px; font-size: 0.8rem;"><?= $stLabel ?></span>
                    
                    <?php if ($f['status'] === 'pago'): ?>
                        <div style="font-size: 0.8rem; color: #16A34A; font-weight: 500; display: flex; align-items: center; gap: 4px;">
                            <i data-lucide="check-circle" style="width:14px;height:14px;"></i> Pago em <?= date('d/m/Y', strtotime($f['data_pagamento'])) ?>
                        </div>
                    <?php else: ?>
                        <?php if ($isAtrasado): ?>
                        <div style="font-size: 0.78rem; color: #DC2626; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                            <i data-lucide="clock" style="width:13px;height:13px;"></i> <?= $diasAtraso ?> dia<?= $diasAtraso !== 1 ? 's' : '' ?> em atraso
                        </div>
                        <?php endif; ?>
                        <button
                            onclick="iniciarPagamento(<?= (int)$f['id'] ?>, this)"
                            style="display: inline-flex; align-items: center; justify-content: center; width: 100%; gap: 7px; padding: 9px 18px; background: var(--c-brand); color: #fff; border: none; border-radius: 6px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--f-body); transition: background 0.18s;"
                            onmouseover="this.style.background='#172554'"
                            onmouseout="this.style.background='var(--c-brand)'">
                            <i data-lucide="credit-card" style="width:15px;height:15px;"></i>
                            Cartão/Boleto
                        </button>
                        <button
                            onclick="gerarPix(<?= (int)$f['id'] ?>, this)"
                            style="display: inline-flex; align-items: center; justify-content: center; width: 100%; gap: 7px; padding: 9px 18px; background: #0db1a1; color: #fff; border: none; border-radius: 6px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: var(--f-body); transition: background 0.18s;"
                            onmouseover="this.style.background='#0a8f82'"
                            onmouseout="this.style.background='#0db1a1'">
                            <i data-lucide="zap" style="width:15px;height:15px;"></i>
                            Pagar com PIX
                        </button>
                    <?php endif; ?>
                </div>

            </div>
            <?php endforeach; ?>
        </div>
        <div class="table-footer" style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.75rem;">
            <span class="table-count"><?= count($listaFin) ?> fatura<?= count($listaFin) !== 1 ? 's' : '' ?> encontrada<?= count($listaFin) !== 1 ? 's' : '' ?></span>
            <div style="font-size: 1.1rem; font-weight: 700; color: #1E293B;">
                Total do período: <span style="font-family: monospace; color: var(--c-brand);">R$ <?= number_format((float)array_sum(array_column($listaFin, 'valor')), 2, ',', '.') ?></span>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

    </main>
</div>
</div>

<script src="../assets/js/portais/empresa.js?v=<?= time() ?>"></script>

<!-- Modal PIX -->
<div id="modalPix" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 2000; align-items: center; justify-content: center; padding: 20px;">
    <div style="background: #fff; width: 100%; max-width: 400px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); overflow: hidden; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative;">
        <div style="width: 100%; padding: 20px 24px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin:0; font-size: 1.1rem; color: #1E293B; display: flex; align-items: center; gap: 8px;"><i data-lucide="zap" style="color: #0db1a1;"></i> Pagamento PIX</h3>
            <button onclick="fecharModalPix()" style="background:transparent; border:none; cursor:pointer; color:#94A3B8;"><i data-lucide="x"></i></button>
        </div>
        <div style="padding: 24px; width: 100%; display: flex; flex-direction: column; align-items: center;">
            <p style="font-size: 0.9rem; color: #64748B; margin-top: 0; margin-bottom: 20px;">Escaneie o QR Code abaixo com o aplicativo do seu banco para pagar.</p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 10px; border-radius: 12px; margin-bottom: 24px;">
                <img id="pixQrCodeImage" src="" alt="QR Code PIX" style="width: 200px; height: 200px; display: block; object-fit: contain;">
            </div>
            <div style="width: 100%;">
                <label style="font-size: 0.8rem; font-weight: 600; color: #475569; display: block; text-align: left; margin-bottom: 8px;">Ou copie o código (Pix Copia e Cola):</label>
                <div style="display: flex; gap: 8px;">
                    <input type="text" id="pixCopiaColaCode" readonly style="flex: 1; padding: 10px 12px; border: 1px solid #CBD5E1; border-radius: 6px; font-size: 0.85rem; color: #1E293B; background: #F1F5F9; outline: none;">
                    <button id="btnCopiarPix" onclick="copiarCodigoPix()" style="background: #1E293B; color: #fff; border: none; border-radius: 6px; padding: 0 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s;"><i data-lucide="copy" style="width: 16px;"></i> Copiar</button>
                </div>
            </div>
        </div>
        <div style="width: 100%; padding: 16px 24px; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 0.8rem; color: #94A3B8;">
            O pagamento será aprovado em instantes pelo sistema.
        </div>
    </div>
</div>

</body>
</html>
