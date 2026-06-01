<?php
// painel_academico.php — Gestão Educacional e Financeira | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || !in_array($_SESSION['usuario_nivel'], ['admin', 'coordenadora'])) {
    header("Location: ../login_aluno.php");
    exit;
}
require_once '../../includes/db.php';
/** @var \PDO $pdo */

$usuario_id = $_SESSION['usuario_id'];
$nome       = $_SESSION['usuario_nome'] ?? 'Administrador';
$nivel      = $_SESSION['usuario_nivel'] ?? 'admin';
$primeiroNome = explode(' ', $nome)[0];
$nivelLabel = ['admin' => 'Administrador', 'coordenadora' => 'Coordenadora', 'professor' => 'Professor', 'empresa' => 'Empresa'];

$msg = '';

// AÇÕES (CRUD Básico e Cobrança)
if (isset($_GET['action'])) {
    $action = $_GET['action'];
    $id = $_GET['id'] ?? null;
    
    if ($action === 'delete_aprendiz' && $id && in_array($nivel, ['admin', 'coordenadora'])) {
        $pdo->prepare("DELETE FROM aprendizes WHERE id = ?")->execute([$id]);
        $pdo->prepare("INSERT INTO logs_auditoria (usuario_id, acao, descricao) VALUES (?, 'DELETE_APRENDIZ', ?)")->execute([$usuario_id, "Excluiu aprendiz ID $id"]);
        $msg = "Aprendiz excluído com sucesso.";
    }
    
    if ($action === 'pay_invoice' && $id && in_array($nivel, ['admin', 'coordenadora'])) {
        $pdo->prepare("UPDATE financeiro SET status = 'pago', data_pagamento = CURDATE() WHERE id = ?")->execute([$id]);
        $pdo->prepare("INSERT INTO logs_auditoria (usuario_id, acao, descricao) VALUES (?, 'PAY_INVOICE', ?)")->execute([$usuario_id, "Deu baixa na fatura ID $id"]);
        $msg = "Fatura marcada como paga!";
    }
    
    // Redireciona para limpar a URL
    if ($msg) {
        $_SESSION['flash_msg'] = $msg;
        header("Location: painel_academico.php");
        exit;
    }
}
$msg = $_SESSION['flash_msg'] ?? '';
unset($_SESSION['flash_msg']);

// BUSCAS DE DADOS
// 1. Dashboard Totais
$totAprendizes = $pdo->query("SELECT COUNT(*) FROM aprendizes WHERE situacao_aluno = 'cursando'")->fetchColumn();
$totEmpresas   = $pdo->query("SELECT COUNT(*) FROM empresas WHERE status = 'ativa'")->fetchColumn();
$receitaMes    = $pdo->query("SELECT COALESCE(SUM(valor),0) FROM financeiro WHERE status = 'pago' AND competencia = DATE_FORMAT(CURDATE(), '%Y-%m')")->fetchColumn();
$inadimplentes = $pdo->query("SELECT COALESCE(SUM(valor),0) FROM financeiro WHERE status = 'pendente' AND data_vencimento < CURDATE()")->fetchColumn();

// 2. Aprendizes e Contratos (JOIN)
$aprendizes = $pdo->query("
    SELECT a.*, c.data_fim, e.nome as empresa_nome 
    FROM aprendizes a 
    LEFT JOIN contratos c ON a.id = c.aprendiz_id 
    LEFT JOIN empresas e ON c.empresa_id = e.id
    ORDER BY a.nome
")->fetchAll(PDO::FETCH_ASSOC);

// 3. Empresas
$empresas = $pdo->query("SELECT * FROM empresas ORDER BY nome")->fetchAll(PDO::FETCH_ASSOC);

// 4. Financeiro
$financeiro = $pdo->query("
    SELECT f.*, e.nome as empresa_nome 
    FROM financeiro f 
    JOIN empresas e ON f.empresa_id = e.id 
    ORDER BY f.data_vencimento DESC
")->fetchAll(PDO::FETCH_ASSOC);

// 5. Alertas (Contratos Vencendo em 30 dias)
$alertas = $pdo->query("
    SELECT a.nome, c.data_fim 
    FROM contratos c 
    JOIN aprendizes a ON c.aprendiz_id = a.id 
    WHERE c.data_fim BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
")->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Acadêmico — Sophie Link</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="../assets/css/painel_academico.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>
<div class="app">

    <aside class="sidebar">
        <div class="sb-brand" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <img src="../assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
            <div class="sb-tag" style="margin-top: 4px;">Gestão Acadêmica</div>
        </div>

        <div class="sb-user">
            <div class="sb-avatar"><?= strtoupper(substr($nome, 0, 1)) ?></div>
            <div>
                <div class="sb-uname"><?= htmlspecialchars($primeiroNome) ?></div>
                <div class="sb-urole"><?= $nivelLabel[$nivel] ?? $nivel ?></div>
            </div>
        </div>

        <div class="sb-sec">Principal</div>
        <a href="#" class="nav-link active" onclick="showSec('dashboard',this)"><i data-lucide="layout-dashboard"></i> Dashboard</a>

        <div class="sb-sec">Gestão Educacional</div>
        <a href="#" class="nav-link" onclick="showSec('aprendizes',this)"><i data-lucide="users"></i> Aprendizes <span class="nav-badge"><?= count($aprendizes) ?></span></a>
        <?php if (in_array($nivel, ['admin','coordenadora'])): ?>
        <a href="#" class="nav-link" onclick="showSec('empresas-list',this)"><i data-lucide="building-2"></i> Empresas</a>
        <?php endif; ?>
        <a href="#" class="nav-link" onclick="showSec('frequencia',this)"><i data-lucide="calendar-check"></i> Frequência</a>
        <a href="#" class="nav-link" onclick="showSec('notas',this)"><i data-lucide="bar-chart-2"></i> Notas</a>

        <div class="sb-sec">Administrativo</div>
        <a href="#" class="nav-link" onclick="showSec('financeiro',this)"><i data-lucide="receipt"></i> Financeiro</a>

        <?php if ($nivel === 'admin'): ?>
        <div class="sb-sec">Sistema</div>
        <a href="../admin/dashboard.php" class="nav-link"><i data-lucide="settings"></i> Painel CMS (Site)</a>
        <?php endif; ?>

        <div class="sb-footer">
            <a href="../auth/logout.php"><i data-lucide="log-out"></i> Sair</a>
        </div>
    </aside>

    <div class="workspace">
        <header class="topbar">
            <div class="tb-title" id="topbar-title">Dashboard</div>
        </header>

        <main class="content">
            <?php if ($msg): ?>
            <div class="alert alert-success"><i data-lucide="check-circle"></i> <?= htmlspecialchars($msg) ?></div>
            <?php endif; ?>

            <?php if (count($alertas) > 0): ?>
            <div class="alert alert-warning">
                <i data-lucide="alert-triangle"></i>
                <strong>Atenção!</strong> <?= count($alertas) ?> contrato(s) vencendo nos próximos 30 dias.
            </div>
            <?php endif; ?>

            <!-- =========== DASHBOARD =========== -->
            <div id="sec-dashboard" class="sec active">
                <div class="page-hdr">
                    <div class="ph-title">Olá, <?= $primeiroNome ?>. 👋</div>
                    <div class="ph-sub">Acompanhe as métricas em tempo real.</div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="users"></i></div></div>
                        <div class="stat-val"><?= $totAprendizes ?></div><div class="stat-lbl">Aprendizes Ativos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-purple"><i data-lucide="building-2"></i></div></div>
                        <div class="stat-val"><?= $totEmpresas ?></div><div class="stat-lbl">Empresas Parceiras</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-green"><i data-lucide="dollar-sign"></i></div></div>
                        <div class="stat-val">R$ <?= number_format($receitaMes, 2, ',', '.') ?></div><div class="stat-lbl">Receita Paga (Mês)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-orange"><i data-lucide="alert-circle"></i></div></div>
                        <div class="stat-val">R$ <?= number_format($inadimplentes, 2, ',', '.') ?></div><div class="stat-lbl">Inadimplências</div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;">
                    <div class="card">
                        <div class="card-head"><div class="card-title"><i data-lucide="bar-chart"></i> Evolução Financeira</div></div>
                        <div style="padding: 1.5rem;"><canvas id="chartFinanceiro" height="100"></canvas></div>
                    </div>
                    <div class="card">
                        <div class="card-head"><div class="card-title"><i data-lucide="clock"></i> Alertas de Contrato</div></div>
                        <div style="padding: 1rem;">
                            <?php if (count($alertas) === 0): ?>
                            <p style="font-size:0.8rem;color:var(--c-text-muted);">Nenhum contrato vencendo em breve.</p>
                            <?php else: ?>
                            <ul style="list-style:none; display:flex;flex-direction:column;gap:10px;">
                                <?php foreach($alertas as $a): ?>
                                <li style="font-size:0.8rem; padding:10px; background:var(--c-red-lt); color:var(--c-red); border-radius:var(--radius-sm);">
                                    <strong><?= htmlspecialchars($a['nome']) ?></strong><br>
                                    Vence em: <?= date('d/m/Y', strtotime($a['data_fim'])) ?>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- =========== APRENDIZES =========== -->
            <div id="sec-aprendizes" class="sec">
                <div class="page-hdr" style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div><div class="ph-title">Aprendizes</div><div class="ph-sub">Gestão completa dos alunos e seus contratos.</div></div>
                    <button class="btn"><i data-lucide="plus"></i> Novo Aprendiz</button>
                </div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>CPF</th><th>Curso</th><th>Empresa</th><th>Situação</th><th>Ações</th></tr></thead>
                        <tbody>
                            <?php foreach ($aprendizes as $a): ?>
                            <tr>
                                <td class="td-bold"><?= htmlspecialchars($a['nome']) ?></td>
                                <td><?= htmlspecialchars($a['cpf']) ?></td>
                                <td><?= htmlspecialchars($a['curso']) ?></td>
                                <td><?= htmlspecialchars($a['empresa_nome'] ?? 'Sem Vínculo') ?></td>
                                <td><span class="pill pill-green"><?= htmlspecialchars($a['situacao_aluno']) ?></span></td>
                                <td>
                                    <button class="btn btn-sm btn-outline"><i data-lucide="edit-2"></i></button>
                                    <a href="?action=delete_aprendiz&id=<?= $a['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Deseja excluir este aluno permanentemente?');"><i data-lucide="trash"></i></a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== EMPRESAS =========== -->
            <div id="sec-empresas-list" class="sec">
                <div class="page-hdr" style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div><div class="ph-title">Empresas Parceiras</div><div class="ph-sub">Gestão das empresas cadastradas no programa.</div></div>
                    <button class="btn"><i data-lucide="plus"></i> Nova Empresa</button>
                </div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Empresa</th><th>CNPJ</th><th>Responsável</th><th>Status</th></tr></thead>
                        <tbody>
                            <?php foreach ($empresas as $e): ?>
                            <tr>
                                <td class="td-bold"><?= htmlspecialchars($e['nome']) ?></td>
                                <td><?= htmlspecialchars($e['cnpj']) ?></td>
                                <td><?= htmlspecialchars($e['responsavel']) ?></td>
                                <td><span class="pill pill-blue"><?= htmlspecialchars($e['status']) ?></span></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FINANCEIRO =========== -->
            <div id="sec-financeiro" class="sec">
                <div class="page-hdr"><div class="ph-title">Módulo Financeiro</div><div class="ph-sub">Gerador de cobranças e controle de recebimentos.</div></div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Empresa</th><th>Referência</th><th>Vencimento</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
                        <tbody>
                            <?php foreach ($financeiro as $f): ?>
                            <tr>
                                <td class="td-bold"><?= htmlspecialchars($f['empresa_nome']) ?></td>
                                <td><?= htmlspecialchars($f['competencia']) ?></td>
                                <td><?= date('d/m/Y', strtotime($f['data_vencimento'])) ?></td>
                                <td style="font-weight:700;">R$ <?= number_format($f['valor'], 2, ',', '.') ?></td>
                                <td>
                                    <?php if ($f['status'] === 'pago'): ?>
                                        <span class="pill pill-green">Pago</span>
                                    <?php else: ?>
                                        <span class="pill pill-red">Pendente</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if ($f['status'] === 'pendente'): ?>
                                    <a href="?action=pay_invoice&id=<?= $f['id'] ?>" class="btn btn-sm" onclick="return confirm('Confirmar o recebimento? Isso gerará um log de auditoria.');"><i data-lucide="check"></i> Dar Baixa</a>
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

<script src="../assets/js/painel_academico.js"></script>
</body>
</html>
