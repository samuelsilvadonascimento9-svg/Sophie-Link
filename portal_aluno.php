<?php
// portal_aluno.php — Portal do Aluno | Centro Técnico Profissionalizante Sophie Link
session_start();

require_once 'includes/db.php';

// Simulando login do aluno (ID 1 = Ana Paula Souza)
$aluno_id = 1;
$stmtAluno = $pdo->prepare("SELECT a.*, e.nome AS empresa_nome FROM aprendizes a LEFT JOIN empresas e ON a.empresa_id = e.id WHERE a.id = ?");
$stmtAluno->execute([$aluno_id]);
$aluno = $stmtAluno->fetch();

if (!$aluno) {
    die("Aluno não encontrado no banco de dados.");
}

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
<style>
/* ================================================================
   RESET & TOKENS — TEMA CLEAN
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
    --c-green:      #22C55E;
    --c-green-lt:   #F0FDF4;
    --c-blue:       #3B82F6;
    --c-blue-lt:    #EFF6FF;
    --c-amber:      #F59E0B;
    --c-amber-lt:   #FFFBEB;
    --c-red:        #EF4444;
    --c-red-lt:     #FEF2F2;
    --sidebar-w:    250px;
    --header-h:     64px;
    --radius:       12px;
    --radius-sm:    8px;
    --shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow:       0 4px 12px rgba(0,0,0,0.08);
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
}
html { font-size: 16px; scroll-behavior: smooth; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 10px; }

/* ================================================================
   LAYOUT
   ================================================================ */
.app { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar {
    width: var(--sidebar-w);
    background: var(--c-surface);
    border-right: 1px solid var(--c-border);
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; bottom: 0; z-index: 200;
    overflow-y: auto;
}
.sb-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 18px 18px 14px;
    border-bottom: 1px solid var(--c-border-lt);
    flex-shrink: 0;
}
.sb-mark {
    width: 34px; height: 34px; border-radius: var(--radius-sm);
    background: var(--c-primary);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--f-display); font-weight: 800; font-size: 0.85rem; color: #fff;
}
.sb-name { font-family: var(--f-display); font-size: 0.95rem; font-weight: 700; color: var(--c-text); }
.sb-name span { color: var(--c-primary); }

.sb-user {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px;
    background: var(--c-bg); margin: 10px;
    border-radius: var(--radius);
}
.sb-avatar {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--c-primary), var(--c-primary-d));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0;
}
.sb-uname { font-size: 0.8rem; font-weight: 600; color: var(--c-text); }
.sb-urole { font-size: 0.68rem; color: var(--c-text-muted); margin-top: 1px; }
.sb-ra { font-size: 0.65rem; color: var(--c-text-light); }

.sb-sec { padding: 10px 18px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); }
.nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 14px 9px 18px;
    font-size: 0.82rem; font-weight: 500;
    color: var(--c-text-muted); transition: all 0.15s;
    position: relative; cursor: pointer;
}
.nav-link i { width: 16px; height: 16px; flex-shrink: 0; }
.nav-link:hover { color: var(--c-primary); background: var(--c-primary-lt); }
.nav-link.active {
    color: var(--c-primary); background: var(--c-primary-lt); font-weight: 600;
}
.nav-link.active::before {
    content: ''; position: absolute; left: 0; top: 4px; bottom: 4px;
    width: 3px; background: var(--c-primary); border-radius: 0 3px 3px 0;
}
.sb-footer {
    margin-top: auto; padding: 14px 18px;
    border-top: 1px solid var(--c-border-lt);
}
.sb-footer a {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.77rem; font-weight: 500; color: var(--c-text-muted); transition: color 0.15s;
}
.sb-footer a:hover { color: var(--c-primary); }

/* WORKSPACE */
.workspace { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }

/* TOPBAR */
.topbar {
    height: var(--header-h);
    background: var(--c-surface); border-bottom: 1px solid var(--c-border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; position: sticky; top: 0; z-index: 100;
}
.topbar-title { font-size: 1rem; font-weight: 700; color: var(--c-text); }
.topbar-right { display: flex; align-items: center; gap: 10px; }
.topbar-btn {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    border: 1px solid var(--c-border); background: transparent;
    color: var(--c-text-muted); display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s; position: relative;
}
.topbar-btn:hover { background: var(--c-bg); color: var(--c-text); }
.topbar-btn i { width: 16px; height: 16px; }
.notif-dot { position: absolute; top: 5px; right: 5px; width: 7px; height: 7px; background: var(--c-primary); border-radius: 50%; border: 1.5px solid #fff; }

/* CONTENT */
.content { padding: 2rem; flex: 1; }

/* Page Header */
.page-hdr {
    background: var(--c-surface); border: 1px solid var(--c-border);
    border-radius: var(--radius); padding: 1.5rem 2rem;
    margin-bottom: 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
}
.ph-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    color: var(--c-primary); background: var(--c-primary-lt);
    border: 1px solid rgba(255,107,0,0.2);
    padding: 3px 10px; border-radius: 20px; margin-bottom: 8px;
}
.ph-title { font-family: var(--f-display); font-size: 1.4rem; font-weight: 800; color: var(--c-text); margin-bottom: 4px; }
.ph-sub { font-size: 0.82rem; color: var(--c-text-muted); }
.ph-stats { display: flex; gap: 1.25rem; flex-wrap: wrap; }
.ph-stat { text-align: center; padding: 10px 16px; background: var(--c-bg); border: 1px solid var(--c-border); border-radius: var(--radius); }
.ph-val { font-family: var(--f-display); font-size: 1.4rem; font-weight: 800; line-height: 1; }
.ph-lbl { font-size: 0.62rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-muted); margin-top: 4px; }

/* Grid */
.grid-2 { display: grid; grid-template-columns: 1fr 280px; gap: 1.25rem; align-items: start; }

/* Cards */
.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.card-head { padding: 1rem 1.5rem; border-bottom: 1px solid var(--c-border-lt); display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 0.88rem; font-weight: 700; color: var(--c-text); display: flex; align-items: center; gap: 8px; }
.card-title i { width: 17px; height: 17px; color: var(--c-primary); }
.card-link { font-size: 0.75rem; font-weight: 600; color: var(--c-primary); }
.card-body { padding: 1.25rem 1.5rem; }

/* Table */
.grade-table { width: 100%; border-collapse: collapse; }
.grade-table th { text-align: left; padding: 9px 1.5rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-light); border-bottom: 1px solid var(--c-border); }
.grade-table td { padding: 12px 1.5rem; font-size: 0.83rem; border-bottom: 1px solid var(--c-border-lt); color: var(--c-text-2); }
.grade-table tr:last-child td { border-bottom: none; }
.grade-table tr:hover td { background: var(--c-bg); }
.grade-val { font-weight: 700; color: var(--c-text); }

/* Pills */
.pill { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 0.65rem; font-weight: 700; }
.pill-green  { background: var(--c-green-lt);  color: #15803D; }
.pill-amber  { background: var(--c-amber-lt);  color: #B45309; }
.pill-blue   { background: var(--c-blue-lt);   color: #1D4ED8; }
.pill-gray   { background: var(--c-bg);        color: var(--c-text-muted); border: 1px solid var(--c-border); }

/* Financeiro */
.fin-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 1.5rem; border-bottom: 1px solid var(--c-border-lt); }
.fin-item:last-child { border-bottom: none; }
.fin-label { font-size: 0.83rem; font-weight: 600; color: var(--c-text); margin-bottom: 2px; }
.fin-date  { font-size: 0.72rem; color: var(--c-text-muted); }
.fin-val   { font-family: var(--f-display); font-weight: 800; font-size: 1rem; color: var(--c-primary); text-align: right; }
.fin-btn {
    display: block; margin-top: 5px;
    font-size: 0.68rem; font-weight: 700; color: var(--c-primary);
    border: 1px solid rgba(255,107,0,0.3); border-radius: 5px;
    padding: 3px 8px; cursor: pointer; background: none;
    font-family: var(--f-body); transition: all 0.15s;
}
.fin-btn:hover { background: var(--c-primary-lt); }

/* Ring */
.ring-wrap { display: flex; flex-direction: column; align-items: center; padding: 1.5rem; gap: 5px; }
.ring { position: relative; width: 80px; height: 80px; }
.ring svg { transform: rotate(-90deg); }
.ring-val { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: var(--f-display); font-size: 1.05rem; font-weight: 800; color: var(--c-primary); }
.ring-val small { font-size: 0.48rem; color: var(--c-text-muted); font-weight: 600; }
.ring-lbl { font-size: 0.68rem; font-weight: 600; color: var(--c-text-muted); }

/* Mini stats */
.mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 0 1.25rem 1.25rem; }
.mini-stat { text-align: center; padding: 10px 6px; background: var(--c-bg); border-radius: var(--radius-sm); }
.mini-val { font-family: var(--f-display); font-size: 1.2rem; font-weight: 800; line-height: 1; }
.mini-lbl { font-size: 0.58rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-muted); margin-top: 4px; }

/* Progresso */
.prog-wrap { padding: 1.25rem 1.5rem; }
.prog-row { display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 8px; }
.prog-row span:last-child { color: var(--c-primary); }
.prog-bar { height: 8px; background: var(--c-border); border-radius: 8px; overflow: hidden; }
.prog-fill { height: 100%; background: var(--c-primary); border-radius: 8px; }
.prog-note { font-size: 0.72rem; color: var(--c-text-muted); margin-top: 8px; }

/* Avisos */
.aviso-item { padding: 12px 1.5rem; border-bottom: 1px solid var(--c-border-lt); }
.aviso-item:last-child { border-bottom: none; }
.aviso-title { font-size: 0.82rem; font-weight: 700; color: var(--c-text); margin-bottom: 4px; }
.aviso-text { font-size: 0.75rem; color: var(--c-text-muted); line-height: 1.5; }

/* Seções (mostrar/ocultar) */
.sec { display: none; }
.sec.active { display: block; }

/* Responsive */
@media (max-width: 1000px) { .grid-2 { grid-template-columns: 1fr; } }
@media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .workspace { margin-left: 0; }
    .content { padding: 1rem; }
    .ph-stats { display: none; }
}
</style>
</head>
<body>

<div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sb-brand">
            <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
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
            <a href="index.php"><i data-lucide="log-out"></i> Sair</a>
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
                                <div style="text-align:right"><div class="fin-val">R$ 250,00</div><button class="fin-btn">Copiar Boleto</button></div>
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
                        <div style="text-align:right"><div class="fin-val">R$ 250,00</div><button class="fin-btn" onclick="alert('Boleto copiado: 34191.09008 00000.000000 00000.000000 0 00000000000000')">Copiar Linha Digitável</button></div>
                    </div>
                </div>
            </div><!-- /sec-financeiro -->

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
    const titles = { inicio: 'Portal do Aluno', notas: 'Notas & Frequência', financeiro: 'Financeiro' };
    const tb = document.getElementById('topbar-title');
    if (tb) tb.textContent = titles[id] || 'Portal do Aluno';
}
</script>
</body>
</html>
