<?php
// painel_academico.php — Gestão Educacional e Financeira | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || !in_array($_SESSION['usuario_nivel'], ['admin', 'coordenadora'])) {
    header("Location: ../login.php");
    exit;
}
require_once '../../includes/db.php';

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
<style>
/* ================================================================
   RESET & TOKENS — ACADÊMICO
   ================================================================ */
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
    --c-green:      #22C55E;
    --c-green-lt:   #F0FDF4;
    --c-purple:     #8B5CF6;
    --c-purple-lt:  #F5F3FF;
    --c-amber:      #F59E0B;
    --c-amber-lt:   #FFFBEB;
    --c-red:        #EF4444;
    --c-red-lt:     #FEF2F2;
    --sidebar-w:    256px;
    --header-h:     64px;
    --radius:       12px;
    --radius-sm:    8px;
    --shadow-sm:    0 1px 3px rgba(0,0,0,0.06);
    --shadow:       0 4px 12px rgba(0,0,0,0.08);
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
}
html { font-size: 16px; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 10px; }

/* LAYOUT CORPORATIVO (DARK SIDEBAR) */
.app { display: flex; min-height: 100vh; }
.sidebar { width: var(--sidebar-w); background: #0F172A; border-right: 1px solid #1E293B; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 200; overflow-y: auto; }
.sb-brand { display: flex; align-items: center; gap: 10px; padding: 18px 18px 14px; border-bottom: 1px solid #1E293B; flex-shrink: 0; }
.sb-tag { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; margin-top: 1px; }

.sb-user { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #1E293B; margin: 10px; border-radius: var(--radius); }
.sb-avatar { width: 36px; height: 36px; background: var(--c-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0; }
.sb-uname { font-size: 0.8rem; font-weight: 600; color: #F8FAFC; }
.sb-urole { font-size: 0.68rem; color: #94A3B8; }

.sb-sec { padding: 10px 18px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 9px 14px 9px 18px; font-size: 0.82rem; font-weight: 500; color: #94A3B8; transition: all 0.15s; position: relative; cursor: pointer; }
.nav-link i { width: 16px; height: 16px; flex-shrink: 0; }
.nav-link:hover, .nav-link.active { color: #FFFFFF; background: rgba(255,107,0,0.15); }
.nav-link.active { font-weight: 600; color: var(--c-primary); }
.nav-link.active::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--c-primary); border-radius: 0 3px 3px 0; }
.nav-badge { margin-left: auto; background: var(--c-primary); color: #fff; font-size: 0.58rem; font-weight: 700; padding: 1px 6px; border-radius: 20px; }

.sb-footer { margin-top: auto; padding: 14px 18px; border-top: 1px solid var(--c-border-lt); }
.sb-footer a { display: flex; align-items: center; gap: 8px; font-size: 0.77rem; font-weight: 500; color: var(--c-text-muted); transition: color 0.15s; }
.sb-footer a:hover { color: var(--c-primary); }

.workspace { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }
.topbar { height: var(--header-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 100; }
.tb-title { font-size: 1rem; font-weight: 700; color: var(--c-text); }
.content { padding: 2rem; flex: 1; }

.page-hdr { margin-bottom: 2rem; }
.ph-greeting { font-size: 0.78rem; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
.ph-title { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 6px; }
.ph-sub { font-size: 0.88rem; color: var(--c-text-muted); max-width: 600px; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem; }
.stat-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); padding: 1.25rem 1.5rem; box-shadow: var(--shadow-sm); }
.stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.stat-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
.stat-icon i { width: 20px; height: 20px; }
.si-blue   { background: var(--c-blue-lt);   color: var(--c-blue);   }
.si-purple { background: var(--c-purple-lt); color: var(--c-purple); }
.si-green  { background: var(--c-green-lt);  color: var(--c-green);  }
.si-orange { background: var(--c-primary-lt);color: var(--c-primary);}
.stat-val { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 2px; }
.stat-lbl { font-size: 0.75rem; color: var(--c-text-muted); }

.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow-sm); margin-bottom: 1.5rem; }
.card-head { padding: 1rem 1.5rem; border-bottom: 1px solid var(--c-border-lt); display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 0.9rem; font-weight: 700; color: var(--c-text); display: flex; align-items: center; gap: 8px; }
.card-title i { width: 17px; height: 17px; color: var(--c-primary); }

.pill { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 0.65rem; font-weight: 700; }
.pill-green  { background: var(--c-green-lt);  color: #15803D; }
.pill-amber  { background: var(--c-amber-lt);  color: #B45309; }
.pill-red    { background: var(--c-red-lt);    color: var(--c-red); }
.pill-blue   { background: var(--c-blue-lt);   color: #1D4ED8; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 9px 1.5rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-light); border-bottom: 1px solid var(--c-border); }
.data-table td { padding: 12px 1.5rem; font-size: 0.82rem; border-bottom: 1px solid var(--c-border-lt); color: var(--c-text-2); }
.data-table tr:last-child td { border-bottom: none; }
.td-bold { font-weight: 700; color: var(--c-text); }

.btn { background: var(--c-primary); color: #fff; border: none; border-radius: var(--radius-sm); padding: 8px 14px; font-family: var(--f-body); font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.btn-sm { padding: 5px 10px; font-size: 0.7rem; }
.btn-outline { background: transparent; color: var(--c-text-2); border: 1px solid var(--c-border); }
.btn-outline:hover { border-color: var(--c-primary); color: var(--c-primary); }
.btn-danger { background: var(--c-red-lt); color: var(--c-red); border: 1px solid var(--c-red); }

.alert { padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 10px; }
.alert-success { background: var(--c-green-lt); color: #15803D; border: 1px solid rgba(21,128,61,0.2); }
.alert-warning { background: var(--c-red-lt); color: var(--c-red); border: 1px solid rgba(239,68,68,0.2); }

.sec { display: none; }
.sec.active { display: block; }
</style>
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
            <a href="../logout.php"><i data-lucide="log-out"></i> Sair</a>
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

<script>
lucide.createIcons();
function showSec(id, el) {
    event && event.preventDefault();
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    const titles = { dashboard:'Dashboard', aprendizes:'Aprendizes', 'empresas-list':'Empresas Parceiras', financeiro:'Financeiro' };
    document.getElementById('topbar-title').textContent = titles[id] || 'Gestão';
}

// Chart.js - Dashboard Visual
const ctx = document.getElementById('chartFinanceiro').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [{
            label: 'Receitas (R$)',
            data: [3400, 3400, 3400, 3400, <?= $receitaMes ?>],
            backgroundColor: '#FF6B00',
            borderRadius: 4
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});
</script>
</body>
</html>
