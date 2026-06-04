<?php
// relatorio_empresa_print.php — Extrato para impressão | Sophie Link
session_start();
require_once '../../includes/auth.php';
protect_page(['empresa']);
require_once '../../includes/db.php';
/** @var \PDO $pdo */

$empresa_id  = $_SESSION['empresa_id'] ?? null;
$nomeEmpresa = $_SESSION['usuario_nome'] ?? '';

if (!$empresa_id) {
    die('Acesso negado.');
}

// Buscar dados da empresa
$stmtEmp = $pdo->prepare("SELECT * FROM empresas WHERE id = ?");
$stmtEmp->execute([$empresa_id]);
$empresa = $stmtEmp->fetch(PDO::FETCH_ASSOC);

// Filtro de período (opcional via GET)
$filtroMes = isset($_GET['mes']) && preg_match('/^\d{4}-\d{2}$/', $_GET['mes']) ? $_GET['mes'] : '';

$sqlFin    = "SELECT * FROM financeiro WHERE empresa_id = ?";
$paramsFin = [$empresa_id];
if ($filtroMes) {
    $sqlFin    .= " AND DATE_FORMAT(data_vencimento, '%Y-%m') = ?";
    $paramsFin[] = $filtroMes;
}
$sqlFin .= " ORDER BY data_vencimento ASC";
$stmtFin  = $pdo->prepare($sqlFin);
$stmtFin->execute($paramsFin);
$faturas = $stmtFin->fetchAll(PDO::FETCH_ASSOC);

// Totais
$totalPago     = 0;
$totalPendente = 0;
$totalAtrasado = 0;
foreach ($faturas as $f) {
    if ($f['status'] === 'pago')     $totalPago     += $f['valor'];
    if ($f['status'] === 'pendente') $totalPendente += $f['valor'];
    if ($f['status'] === 'atrasado') $totalAtrasado += $f['valor'];
}

// Aprendizes ativos
$stmtApr = $pdo->prepare("
    SELECT a.nome, c.data_inicio, c.data_fim, c.valor AS valor_contrato
    FROM contratos c JOIN aprendizes a ON c.aprendiz_id = a.id
    WHERE c.empresa_id = ? AND c.status = 'ativo' ORDER BY a.nome
");
$stmtApr->execute([$empresa_id]);
$aprendizes = $stmtApr->fetchAll(PDO::FETCH_ASSOC);

$meses_pt = ['','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Extrato Financeiro — <?= htmlspecialchars($nomeEmpresa) ?></title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; font-size: 12px; color: #000; background: #fff; }
        @media print {
            .no-print { display: none !important; }
            body { font-size: 11px; }
        }
        .no-print {
            background: #1E3A8A; padding: 12px 24px;
            display: flex; align-items: center; justify-content: space-between;
        }
        .no-print span { color: #fff; font-size: 0.9rem; font-family: Arial, sans-serif; }
        .no-print button {
            background: #fff; color: #1E3A8A; border: none;
            padding: 8px 18px; border-radius: 4px; font-weight: 700;
            cursor: pointer; font-size: 0.9rem;
        }

        .report-wrap { max-width: 800px; margin: 0 auto; padding: 30px; }

        /* Cabeçalho */
        .report-header { border: 1px solid #000; display: flex; margin-bottom: 0; }
        .rh-brand { padding: 16px; border-right: 1px solid #000; min-width: 200px; }
        .rh-brand-name { font-size: 18px; font-weight: 900; color: #1E3A8A; letter-spacing: -0.5px; }
        .rh-brand-sub  { font-size: 9px; color: #555; margin-top: 2px; }
        .rh-center { flex: 1; display: flex; align-items: center; justify-content: center; border-right: 1px solid #000; }
        .rh-doc-title  { font-size: 14px; font-weight: 700; text-align: center; }
        .rh-right { padding: 12px 16px; min-width: 180px; font-size: 10px; line-height: 1.8; }
        .rh-right strong { font-size: 11px; }

        /* Tabela de empresa */
        .empresa-box { border: 1px solid #000; border-top: none; padding: 12px 16px; font-size: 11px; line-height: 1.9; }
        .empresa-box-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .emp-field { }
        .emp-label { font-weight: 700; font-size: 9px; text-transform: uppercase; color: #555; }
        .emp-val   { font-size: 11px; }

        /* Seção título */
        .section-title {
            background: #1E3A8A; color: #fff;
            padding: 6px 12px; font-size: 10px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 1px;
            margin-top: 16px;
        }

        /* Tabela de faturas */
        .fin-table { width: 100%; border-collapse: collapse; border: 1px solid #000; border-top: none; }
        .fin-table th {
            background: #F1F5F9; padding: 7px 10px; font-size: 9px;
            font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #000;
            border-right: 1px solid #ccc; text-align: left;
        }
        .fin-table td {
            padding: 7px 10px; font-size: 10px; border-bottom: 1px solid #E5E7EB;
            border-right: 1px solid #E5E7EB; vertical-align: middle;
        }
        .fin-table tr:last-child td { border-bottom: none; }
        .fin-table tfoot td { font-weight: 700; background: #F8FAFC; border-top: 2px solid #000; font-size: 11px; }
        .status-pago     { color: #16A34A; font-weight: 700; }
        .status-pendente { color: #D97706; font-weight: 700; }
        .status-atrasado { color: #DC2626; font-weight: 700; }

        /* Resumo totais */
        .totals-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid #000; border-top: none; }
        .total-item { padding: 12px; text-align: center; border-right: 1px solid #000; }
        .total-item:last-child { border-right: none; }
        .total-label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #555; margin-bottom: 4px; }
        .total-val   { font-size: 16px; font-weight: 900; font-family: monospace; }

        /* Aprendizes */
        .apr-table { width: 100%; border-collapse: collapse; border: 1px solid #000; border-top: none; }
        .apr-table th {
            background: #F1F5F9; padding: 6px 10px; font-size: 9px;
            font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #000;
            border-right: 1px solid #ccc; text-align: left;
        }
        .apr-table td {
            padding: 6px 10px; font-size: 10px;
            border-bottom: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;
        }
        .apr-table tr:last-child td { border-bottom: none; }

        /* Rodapé */
        .report-footer { margin-top: 30px; border-top: 1px solid #000; padding-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .sign-line { border-top: 1px solid #000; padding-top: 4px; margin-top: 40px; font-size: 10px; text-align: center; }
        .report-note { font-size: 9px; color: #666; margin-top: 20px; line-height: 1.5; }
    </style>
</head>
<body>

<div class="no-print">
    <span>📄 Extrato Financeiro — <?= htmlspecialchars($nomeEmpresa) ?></span>
    <button onclick="window.print()">🖨️ Imprimir / Salvar PDF</button>
</div>

<div class="report-wrap">

    <!-- Cabeçalho do documento -->
    <div class="report-header">
        <div class="rh-brand">
            <div class="rh-brand-name">SOPHIE LINK</div>
            <div class="rh-brand-sub">Centro Técnico Profissionalizante</div>
            <div class="rh-brand-sub">CNPJ: 07.114.699/0050-48</div>
        </div>
        <div class="rh-center">
            <div class="rh-doc-title">EXTRATO FINANCEIRO<br><span style="font-weight:400;font-size:11px;"><?= $filtroMes ? ($meses_pt[(int)substr($filtroMes,5,2)] . '/' . substr($filtroMes,0,4)) : 'Histórico Completo' ?></span></div>
        </div>
        <div class="rh-right">
            <strong>Data de Emissão:</strong><br>
            <?= date('d/m/Y H:i') ?><br><br>
            <strong>Emitido por:</strong><br>
            Portal Corporativo Sophie Link
        </div>
    </div>

    <!-- Dados da empresa -->
    <div class="empresa-box">
        <div class="empresa-box-row">
            <div class="emp-field">
                <div class="emp-label">Empresa</div>
                <div class="emp-val"><strong><?= htmlspecialchars($empresa['nome'] ?? $nomeEmpresa) ?></strong></div>
            </div>
            <div class="emp-field">
                <div class="emp-label">CNPJ</div>
                <div class="emp-val"><?= htmlspecialchars($empresa['cnpj'] ?? '—') ?></div>
            </div>
            <div class="emp-field">
                <div class="emp-label">Responsável</div>
                <div class="emp-val"><?= htmlspecialchars($empresa['responsavel'] ?? '—') ?></div>
            </div>
            <div class="emp-field">
                <div class="emp-label">E-mail</div>
                <div class="emp-val"><?= htmlspecialchars($empresa['email'] ?? '—') ?></div>
            </div>
        </div>
    </div>

    <!-- Resumo de totais -->
    <div class="section-title">Resumo do Período</div>
    <div class="totals-grid">
        <div class="total-item">
            <div class="total-label">Total Pago</div>
            <div class="total-val" style="color:#16A34A;">R$ <?= number_format($totalPago, 2, ',', '.') ?></div>
        </div>
        <div class="total-item">
            <div class="total-label">Total Pendente</div>
            <div class="total-val" style="color:#D97706;">R$ <?= number_format($totalPendente, 2, ',', '.') ?></div>
        </div>
        <div class="total-item">
            <div class="total-label">Total em Atraso</div>
            <div class="total-val" style="color:#DC2626;">R$ <?= number_format($totalAtrasado, 2, ',', '.') ?></div>
        </div>
    </div>

    <!-- Tabela de faturas -->
    <div class="section-title">Histórico de Faturas</div>
    <table class="fin-table">
        <thead>
            <tr>
                <th>Competência</th>
                <th>Vencimento</th>
                <th>Data Pagamento</th>
                <th style="text-align:right;">Valor (R$)</th>
                <th>Status</th>
                <th>Observações</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($faturas)): ?>
            <tr><td colspan="6" style="text-align:center;padding:1rem;">Nenhuma fatura no período.</td></tr>
            <?php else: ?>
            <?php foreach ($faturas as $f): ?>
            <tr>
                <td><?= htmlspecialchars($f['competencia']) ?></td>
                <td><?= date('d/m/Y', strtotime($f['data_vencimento'])) ?></td>
                <td><?= $f['data_pagamento'] ? date('d/m/Y', strtotime($f['data_pagamento'])) : '—' ?></td>
                <td style="text-align:right; font-family:monospace; font-weight:600;">
                    R$ <?= number_format($f['valor'], 2, ',', '.') ?>
                </td>
                <td class="status-<?= $f['status'] ?>">
                    <?= strtoupper($f['status']) ?>
                </td>
                <td><?= htmlspecialchars($f['observacoes'] ?? '') ?></td>
            </tr>
            <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" style="text-align:right;">TOTAL DO PERÍODO:</td>
                <td style="text-align:right; font-family:monospace;">
                    R$ <?= number_format(array_sum(array_column($faturas, 'valor')), 2, ',', '.') ?>
                </td>
                <td colspan="2"></td>
            </tr>
        </tfoot>
    </table>

    <!-- Aprendizes ativos -->
    <?php if (!empty($aprendizes)): ?>
    <div class="section-title" style="margin-top:20px;">Aprendizes com Contrato Ativo</div>
    <table class="apr-table">
        <thead>
            <tr>
                <th>Nome do Aprendiz</th>
                <th>Início do Contrato</th>
                <th>Fim do Contrato</th>
                <th style="text-align:right;">Valor Mensal (R$)</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($aprendizes as $a): ?>
            <tr>
                <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                <td><?= date('d/m/Y', strtotime($a['data_inicio'])) ?></td>
                <td><?= date('d/m/Y', strtotime($a['data_fim'])) ?></td>
                <td style="text-align:right; font-family:monospace;">
                    R$ <?= number_format($a['valor_contrato'], 2, ',', '.') ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

    <!-- Rodapé com assinaturas -->
    <div class="report-footer">
        <div>
            <div class="sign-line">
                <?= htmlspecialchars($empresa['responsavel'] ?? 'Responsável pela Empresa') ?><br>
                <?= htmlspecialchars($empresa['nome'] ?? $nomeEmpresa) ?>
            </div>
        </div>
        <div>
            <div class="sign-line">
                Coordenação Financeira<br>
                Centro Técnico Profissionalizante Sophie Link
            </div>
        </div>
    </div>

    <div class="report-note">
        <strong>⚠ Aviso Legal:</strong> Este extrato é meramente informativo e foi gerado automaticamente pelo sistema Sophie Link em <?= date('d/m/Y \à\s H:i') ?>. 
        Em caso de divergências, entre em contato com o setor financeiro do Centro Técnico Sophie Link. 
        Este documento não substitui nota fiscal ou recibo oficial de pagamento.
    </div>

</div>
</body>
</html>
