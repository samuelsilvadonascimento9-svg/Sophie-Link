<?php
// portal_professor.php — Portal do Professor | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'professor') {
    header("Location: login_professor.php");
    exit;
}
$nome = $_SESSION['usuario_nome'] ?? 'Professor';
$primeiroNome = explode(' ', str_replace(['Prof. ','Dr. '], '', $nome))[0];

require_once 'includes/db.php';
$sucesso = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['acao']) && $_POST['acao'] === 'lancar_frequencia') {
        $data_registro = $_POST['data_registro'];
        foreach($_POST as $key => $val) {
            if (strpos($key, 'freq_') === 0) {
                $aluno_id = str_replace('freq_', '', $key);
                $status = ($val === 'P') ? 'presente' : 'falta';
                $stmt = $pdo->prepare("INSERT INTO frequencia (aprendiz_id, data_registro, status, registrado_por) VALUES (?, ?, ?, ?)");
                $stmt->execute([$aluno_id, $data_registro, $status, $_SESSION['usuario_id']]);
            }
        }
        $sucesso = 'Frequência lançada com sucesso!';
    }
    
    if (isset($_POST['acao']) && $_POST['acao'] === 'lancar_notas') {
        $atividade = $_POST['atividade'];
        $data_registro = date('Y-m-d');
        foreach($_POST as $key => $val) {
            if (strpos($key, 'nota_') === 0 && $val !== '') {
                $aluno_id = str_replace('nota_', '', $key);
                $stmt = $pdo->prepare("INSERT INTO notas (aprendiz_id, atividade, valor_nota, data_registro, registrado_por) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$aluno_id, $atividade, (float)$val, $data_registro, $_SESSION['usuario_id']]);
            }
        }
        $sucesso = 'Notas lançadas com sucesso!';
    }
}

// Buscar alunos para as tabelas
$stmtAlunos = $pdo->query("SELECT id, cpf, nome, curso FROM aprendizes ORDER BY nome ASC");
$alunosDb = $stmtAlunos->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do Professor — Sophie Link</title>
    <meta name="robots" content="noindex">
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
    --c-orange:     #FF6B00;
    --c-orange-lt:  #FFF0E6;
    --c-green:      #22C55E;
    --c-green-lt:   #F0FDF4;
    --c-amber:      #F59E0B;
    --c-amber-lt:   #FFFBEB;
    --c-red:        #EF4444;
    --c-red-lt:     #FEF2F2;
    --c-purple:     #8B5CF6;
    --c-purple-lt:  #F5F3FF;
    --sidebar-w:    252px;
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

.app { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar { width: var(--sidebar-w); background: var(--c-surface); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 200; overflow-y: auto; }
.sb-brand { display: flex; align-items: center; gap: 10px; padding: 18px 18px 14px; border-bottom: 1px solid var(--c-border-lt); flex-shrink: 0; }
.sb-mark { width: 34px; height: 34px; border-radius: var(--radius-sm); background: var(--c-primary); display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-weight: 800; font-size: 0.85rem; color: #fff; }
.sb-name { font-family: var(--f-display); font-size: 0.95rem; font-weight: 700; color: var(--c-text); }
.sb-name span { color: var(--c-primary); }
.sb-tag { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); margin-top: 1px; }
.sb-user { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: var(--c-bg); margin: 10px; border-radius: var(--radius); }
.sb-avatar { width: 36px; height: 36px; background: var(--c-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0; }
.sb-uname { font-size: 0.8rem; font-weight: 600; color: var(--c-text); }
.sb-urole { font-size: 0.68rem; color: var(--c-text-muted); }
.sb-sec { padding: 10px 18px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 9px 14px 9px 18px; font-size: 0.82rem; font-weight: 500; color: var(--c-text-muted); transition: all 0.15s; position: relative; cursor: pointer; }
.nav-link i { width: 16px; height: 16px; flex-shrink: 0; }
.nav-link:hover { color: var(--c-primary); background: var(--c-primary-lt); }
.nav-link.active { color: var(--c-primary); background: var(--c-primary-lt); font-weight: 600; }
.nav-link.active::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--c-primary); border-radius: 0 3px 3px 0; }
.nav-badge { margin-left: auto; background: var(--c-primary); color: #fff; font-size: 0.58rem; font-weight: 700; padding: 1px 6px; border-radius: 20px; }
.sb-footer { margin-top: auto; padding: 14px 18px; border-top: 1px solid var(--c-border-lt); }
.sb-footer a { display: flex; align-items: center; gap: 8px; font-size: 0.77rem; font-weight: 500; color: var(--c-text-muted); transition: color 0.15s; }
.sb-footer a:hover { color: var(--c-primary); }

/* WORKSPACE */
.workspace { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }
.topbar { height: var(--header-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 100; }
.tb-title { font-size: 1rem; font-weight: 700; color: var(--c-text); }
.tb-right { display: flex; align-items: center; gap: 8px; }
.tb-btn { width: 36px; height: 36px; border-radius: var(--radius-sm); border: 1px solid var(--c-border); background: transparent; color: var(--c-text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; position: relative; }
.tb-btn:hover { background: var(--c-bg); color: var(--c-text); }
.tb-btn i { width: 16px; height: 16px; }
.notif-dot { position: absolute; top: 5px; right: 5px; width: 7px; height: 7px; background: var(--c-orange); border-radius: 50%; border: 1.5px solid #fff; }

.content { padding: 2rem; flex: 1; }
.page-hdr { margin-bottom: 2rem; }
.ph-greeting { font-size: 0.78rem; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
.ph-title { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 6px; }
.ph-sub { font-size: 0.88rem; color: var(--c-text-muted); }

/* STATS */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem; }
.stat-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); padding: 1.25rem 1.5rem; box-shadow: var(--shadow-sm); }
.stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.stat-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
.stat-icon i { width: 20px; height: 20px; }
.si-blue   { background: var(--c-primary-lt); color: var(--c-primary); }
.si-green  { background: var(--c-green-lt);   color: var(--c-green);   }
.si-amber  { background: var(--c-amber-lt);   color: var(--c-amber);   }
.si-orange { background: var(--c-orange-lt);  color: var(--c-orange);  }
.stat-trend { font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.trend-up   { background: var(--c-green-lt);  color: #15803D; }
.trend-down { background: var(--c-amber-lt);  color: #B45309; }
.stat-val { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 2px; }
.stat-lbl { font-size: 0.75rem; color: var(--c-text-muted); }

/* CARDS */
.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.card-head { padding: 1rem 1.5rem; border-bottom: 1px solid var(--c-border-lt); display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 0.9rem; font-weight: 700; color: var(--c-text); display: flex; align-items: center; gap: 8px; }
.card-title i { width: 17px; height: 17px; color: var(--c-primary); }
.card-link { font-size: 0.75rem; font-weight: 600; color: var(--c-primary); }

/* TABELA */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 9px 1.5rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-light); border-bottom: 1px solid var(--c-border); }
.data-table td { padding: 12px 1.5rem; font-size: 0.82rem; border-bottom: 1px solid var(--c-border-lt); color: var(--c-text-2); }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: var(--c-bg); }
.td-bold { font-weight: 700; color: var(--c-text); }

/* PILLS */
.pill { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 0.65rem; font-weight: 700; }
.pill-green  { background: var(--c-green-lt);  color: #15803D; }
.pill-amber  { background: var(--c-amber-lt);  color: #B45309; }
.pill-red    { background: var(--c-red-lt);    color: var(--c-red); }
.pill-blue   { background: var(--c-primary-lt);color: var(--c-primary); }
.pill-gray   { background: var(--c-bg);        color: var(--c-text-muted); border: 1px solid var(--c-border); }

/* INPUT */
.field-group { display: flex; flex-direction: column; gap: 5px; }
.field-label { font-size: 0.73rem; font-weight: 700; color: var(--c-text-muted); }
.field-input { padding: 9px 12px; border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); font-family: var(--f-body); font-size: 0.85rem; color: var(--c-text); outline: none; background: var(--c-bg); transition: border-color 0.15s; }
.field-input:focus { border-color: var(--c-primary); }
.field-select { padding: 9px 12px; border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); font-family: var(--f-body); font-size: 0.85rem; color: var(--c-text); outline: none; background: var(--c-bg); }
.btn-primary { display: inline-flex; align-items: center; gap: 7px; background: var(--c-primary); color: #fff; border: none; border-radius: var(--radius-sm); padding: 9px 18px; font-family: var(--f-body); font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.btn-primary:hover { background: var(--c-primary-d); }
.btn-secondary { display: inline-flex; align-items: center; gap: 7px; background: none; color: var(--c-text-2); border: 1px solid var(--c-border); border-radius: var(--radius-sm); padding: 9px 18px; font-family: var(--f-body); font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-secondary:hover { border-color: var(--c-primary); color: var(--c-primary); }

/* AGENDA DE AULAS */
.aula-item { display: flex; align-items: center; gap: 14px; padding: 12px 1.5rem; border-bottom: 1px solid var(--c-border-lt); transition: background 0.15s; cursor: pointer; }
.aula-item:last-child { border-bottom: none; }
.aula-item:hover { background: var(--c-bg); }
.aula-data { width: 50px; text-align: center; flex-shrink: 0; }
.aula-dia { font-family: var(--f-display); font-size: 1.3rem; font-weight: 800; color: var(--c-primary); line-height: 1; }
.aula-mes { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--c-text-muted); }
.aula-info { flex: 1; }
.aula-nome { font-size: 0.85rem; font-weight: 700; color: var(--c-text); margin-bottom: 2px; }
.aula-meta { font-size: 0.72rem; color: var(--c-text-muted); }
.aula-status { font-size: 0.68rem; font-weight: 700; }

/* SEÇÕES */
.sec { display: none; }
.sec.active { display: block; }

@media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .sidebar { transform: translateX(-100%); } .workspace { margin-left: 0; } .content { padding: 1rem; } }
</style>
</head>
<body>
<div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sb-brand" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
            <div class="sb-tag" style="margin-top: 4px;">Portal do Professor</div>
        </div>
        <div class="sb-user">
            <div class="sb-avatar"><?= strtoupper(substr(str_replace(['Prof. ','Dr. '], '', $nome), 0, 1)) ?></div>
            <div>
                <div class="sb-uname"><?= htmlspecialchars($nome) ?></div>
                <div class="sb-urole">Professor</div>
            </div>
        </div>

        <div class="sb-sec">Menu Principal</div>
        <a href="#" class="nav-link active" onclick="showSec('inicio',this)"><i data-lucide="layout-dashboard"></i> Início</a>
        <a href="#" class="nav-link" onclick="showSec('turmas',this)"><i data-lucide="users"></i> Minhas Turmas</a>
        <a href="#" class="nav-link" onclick="showSec('frequencia',this)"><i data-lucide="calendar-check"></i> Lançar Frequência <span class="nav-badge">Hoje</span></a>
        <a href="#" class="nav-link" onclick="showSec('notas',this)"><i data-lucide="edit-3"></i> Lançar Notas</a>
        <a href="#" class="nav-link" onclick="showSec('agenda',this)"><i data-lucide="calendar"></i> Agenda de Aulas</a>
        <a href="#" class="nav-link" onclick="showSec('atividades',this)"><i data-lucide="file-plus"></i> Atividades & AVA</a>
        <a href="#" class="nav-link" onclick="showSec('relatorios',this)"><i data-lucide="file-bar-chart-2"></i> Relatórios</a>

        <div class="sb-sec">Acesso</div>
        <a href="ava.php" class="nav-link"><i data-lucide="monitor-play"></i> Câmpus Virtual (AVA)</a>
        <a href="dashboard.php" class="nav-link"><i data-lucide="shield"></i> Painel Admin</a>

        <div class="sb-footer">
            <a href="index.php"><i data-lucide="log-out"></i> Sair</a>
        </div>
    </aside>

    <!-- WORKSPACE -->
    <div class="workspace">
        <header class="topbar">
            <div class="tb-title" id="topbar-title">Portal do Professor</div>
            <div class="tb-right">
                <button class="tb-btn"><i data-lucide="bell"></i><span class="notif-dot"></span></button>
                <button class="tb-btn"><i data-lucide="settings"></i></button>
            </div>
        </header>

        <main class="content">

            <!-- =========== INÍCIO =========== -->
            <div id="sec-inicio" class="sec active">
                <div class="page-hdr">
                    <div class="ph-greeting">Bem-vindo de volta</div>
                    <div class="ph-title">Olá, <?= $primeiroNome ?>! 👋</div>
                    <div class="ph-sub">Você tem 1 aula hoje e 2 atividades aguardando correção.</div>
                    <?php if($sucesso): ?>
                        <div style="background:var(--c-green-lt);color:#15803D;padding:10px 15px;border-radius:var(--radius-sm);margin-top:10px;font-weight:600;font-size:0.85rem;"><i data-lucide="check-circle" style="width:16px;height:16px;vertical-align:middle;margin-right:5px;"></i> <?= $sucesso ?></div>
                    <?php endif; ?>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="users"></i></div><span class="stat-trend trend-up">2 turmas</span></div>
                        <div class="stat-val">68</div><div class="stat-lbl">Total de Alunos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-green"><i data-lucide="percent"></i></div><span class="stat-trend trend-up">Ótimo</span></div>
                        <div class="stat-val">91%</div><div class="stat-lbl">Frequência Média</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-amber"><i data-lucide="file-text"></i></div><span class="stat-trend trend-down">Pendente</span></div>
                        <div class="stat-val">2</div><div class="stat-lbl">Atividades para Corrigir</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-orange"><i data-lucide="bar-chart-2"></i></div><span class="stat-trend trend-up">Período</span></div>
                        <div class="stat-val">8.2</div><div class="stat-lbl">Média Geral das Turmas</div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.25rem;">
                    <!-- Próximas aulas -->
                    <div class="card">
                        <div class="card-head">
                            <div class="card-title"><i data-lucide="calendar"></i> Próximas Aulas</div>
                            <a href="#" class="card-link" onclick="showSec('agenda',document.querySelector('[onclick*=agenda]'))">Ver agenda →</a>
                        </div>
                        <div>
                            <div class="aula-item" style="background:var(--c-primary-lt);border-left:3px solid var(--c-primary);">
                                <div class="aula-data"><div class="aula-dia">29</div><div class="aula-mes">Hoje</div></div>
                                <div class="aula-info">
                                    <div class="aula-nome">Manutenção Eletromecânica I — Turma A</div>
                                    <div class="aula-meta">14:00 – 17:30 · Sala de Laboratório 2</div>
                                </div>
                                <span class="pill pill-blue">Hoje</span>
                            </div>
                            <div class="aula-item">
                                <div class="aula-data"><div class="aula-dia">31</div><div class="aula-mes">Mai</div></div>
                                <div class="aula-info">
                                    <div class="aula-nome">Gestão da Qualidade — Turma B</div>
                                    <div class="aula-meta">07:30 – 11:00 · Sala 05</div>
                                </div>
                                <span class="pill pill-gray">Em 2 dias</span>
                            </div>
                            <div class="aula-item">
                                <div class="aula-data"><div class="aula-dia">03</div><div class="aula-mes">Jun</div></div>
                                <div class="aula-info">
                                    <div class="aula-nome">Manutenção Eletromecânica I — Turma A (Reposição)</div>
                                    <div class="aula-meta">14:00 – 17:30 · Laboratório 2</div>
                                </div>
                                <span class="pill pill-amber">Reposição</span>
                            </div>
                        </div>
                    </div>

                    <!-- Ações rápidas -->
                    <div class="card">
                        <div class="card-head"><div class="card-title"><i data-lucide="zap"></i> Ações Rápidas</div></div>
                        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:8px;">
                            <button class="btn-primary" style="width:100%;justify-content:center;" onclick="showSec('frequencia',document.querySelector('[onclick*=frequencia]'))"><i data-lucide="clipboard-check" style="width:15px;height:15px;"></i> Lançar Frequência de Hoje</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('notas',document.querySelector('[onclick*=notas]'))"><i data-lucide="edit-3" style="width:15px;height:15px;"></i> Lançar Notas</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center; border-color:var(--c-purple); color:var(--c-purple);" onclick="analisarTurmaIA()"><i data-lucide="sparkles" style="width:15px;height:15px;"></i> Analisar Turma com IA</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('atividades',document.querySelector('[onclick*=atividades]'))"><i data-lucide="file-plus" style="width:15px;height:15px;"></i> Nova Atividade no AVA</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('relatorios',document.querySelector('[onclick*=relatorios]'))"><i data-lucide="file-bar-chart-2" style="width:15px;height:15px;"></i> Gerar Relatório</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- =========== TURMAS =========== -->
            <div id="sec-turmas" class="sec">
                <div class="page-hdr"><div class="ph-title">Minhas Turmas</div><div class="ph-sub">Alunos vinculados às suas disciplinas no semestre 2026/1.</div></div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
                    <div class="card" style="padding:1.5rem;display:flex;align-items:center;gap:16px;">
                        <div style="width:52px;height:52px;border-radius:var(--radius);background:var(--c-primary-lt);color:var(--c-primary);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i data-lucide="cpu" style="width:26px;height:26px;"></i></div>
                        <div><div style="font-family:var(--f-display);font-size:1rem;font-weight:800;color:var(--c-text);margin-bottom:3px;">Manutenção Eletromecânica I</div><div style="font-size:0.78rem;color:var(--c-text-muted);">Turma A · 36 alunos · Freq. média: 93%</div></div>
                    </div>
                    <div class="card" style="padding:1.5rem;display:flex;align-items:center;gap:16px;">
                        <div style="width:52px;height:52px;border-radius:var(--radius);background:var(--c-purple-lt,#F5F3FF);color:var(--c-purple,#8B5CF6);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i data-lucide="shield-check" style="width:26px;height:26px;"></i></div>
                        <div><div style="font-family:var(--f-display);font-size:1rem;font-weight:800;color:var(--c-text);margin-bottom:3px;">Gestão da Qualidade</div><div style="font-size:0.78rem;color:var(--c-text-muted);">Turma B · 32 alunos · Freq. média: 89%</div></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="users"></i> Alunos — Turma A: Eletromecânica</div></div>
                    <table class="data-table">
                        <thead><tr><th>RA</th><th>Nome</th><th>Empresa</th><th>Freq.</th><th>Média</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td>2026100401</td><td class="td-bold">Ana Paula Souza</td><td>Vale S.A.</td><td>96%</td><td style="color:var(--c-green);font-weight:700">8.5</td><td><span class="pill pill-green">Regular</span></td></tr>
                            <tr><td>2026100403</td><td class="td-bold">Fernanda Rocha</td><td>Vale S.A.</td><td>72%</td><td style="color:var(--c-amber);font-weight:700">6.5</td><td><span class="pill pill-amber">Atenção</span></td></tr>
                            <tr><td>2026100404</td><td class="td-bold">João Mendes</td><td>Tech Solutions</td><td>61%</td><td style="color:var(--c-red);font-weight:700">5.8</td><td><span class="pill pill-red">Crítico</span></td></tr>
                            <tr><td>2026100406</td><td class="td-bold">Pedro Araújo</td><td>MinerTech</td><td>88%</td><td style="color:var(--c-green);font-weight:700">7.8</td><td><span class="pill pill-green">Regular</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FREQUÊNCIA =========== -->
            <div id="sec-frequencia" class="sec">
                <form method="POST">
                <input type="hidden" name="acao" value="lancar_frequencia">
                <div class="page-hdr"><div class="ph-title">Lançar Frequência</div><div class="ph-sub">Registre a presença dos alunos na aula de hoje.</div></div>
                <div class="card" style="margin-bottom:1.25rem;padding:1.5rem;">
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
                        <div class="field-group"><label class="field-label">Disciplina</label><select class="field-select" name="disciplina"><option>Manutenção Eletromecânica I</option><option>Gestão da Qualidade</option></select></div>
                        <div class="field-group"><label class="field-label">Turma</label><select class="field-select"><option>Turma A</option><option>Turma B</option></select></div>
                        <div class="field-group"><label class="field-label">Data</label><input type="date" class="field-input" name="data_registro" value="<?= date('Y-m-d') ?>" required></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="clipboard-check"></i> Lista de Presença</div><button type="submit" class="btn-primary"><i data-lucide="save" style="width:14px;height:14px;"></i> Salvar</button></div>
                    <table class="data-table">
                        <thead><tr><th>ID</th><th>Nome do Aluno</th><th>Presença</th><th>Observação</th></tr></thead>
                        <tbody>
                            <?php foreach ($alunosDb as $a): ?>
                            <tr>
                                <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                <td class="td-bold"><?= htmlspecialchars($a['nome']) ?></td>
                                <td>
                                    <label style="display:inline-flex;align-items:center;gap:5px;margin-right:12px;font-size:0.8rem;cursor:pointer;"><input type="radio" name="freq_<?= $a['id'] ?>" value="P" checked style="accent-color:var(--c-green);"> Presente</label>
                                    <label style="display:inline-flex;align-items:center;gap:5px;font-size:0.8rem;cursor:pointer;"><input type="radio" name="freq_<?= $a['id'] ?>" value="F" style="accent-color:var(--c-red);"> Falta</label>
                                </td>
                                <td><input type="text" placeholder="Opcional..." class="field-input" style="width:100%;padding:5px 8px;font-size:0.78rem;"></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                </form>
            </div>

            <!-- =========== NOTAS =========== -->
            <div id="sec-notas" class="sec">
                <form method="POST">
                <input type="hidden" name="acao" value="lancar_notas">
                <div class="page-hdr"><div class="ph-title">Lançar Notas</div><div class="ph-sub">Registre as notas dos alunos por avaliação.</div></div>
                <div class="card" style="margin-bottom:1.25rem;padding:1.5rem;">
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
                        <div class="field-group"><label class="field-label">Disciplina</label><select class="field-select"><option>Manutenção Eletromecânica I</option><option>Gestão da Qualidade</option><option>Segurança do Trabalho</option></select></div>
                        <div class="field-group"><label class="field-label">Atividade/Avaliação</label><input type="text" class="field-input" name="atividade" placeholder="Ex: Prova Bimestral" required></div>
                        <div class="field-group"><label class="field-label">Turma</label><select class="field-select"><option>Turma A</option><option>Turma B</option></select></div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="edit-3"></i> Lançamento (0–10)</div><button type="submit" class="btn-primary"><i data-lucide="save" style="width:14px;height:14px;"></i> Salvar Notas</button></div>
                    <table class="data-table">
                        <thead><tr><th>ID</th><th>Nome</th><th>Curso</th><th>Nota (lançar)</th></tr></thead>
                        <tbody>
                            <?php foreach ($alunosDb as $a): ?>
                            <tr>
                                <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                <td class="td-bold"><?= htmlspecialchars($a['nome']) ?></td>
                                <td><?= htmlspecialchars($a['curso']) ?></td>
                                <td><input type="number" min="0" max="10" step="0.1" class="field-input" name="nota_<?= $a['id'] ?>" placeholder="0.0" style="width:80px;padding:5px 8px;font-size:0.85rem;text-align:center;"></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                </form>
            </div>

            <!-- =========== AGENDA =========== -->
            <div id="sec-agenda" class="sec">
                <div class="page-hdr"><div class="ph-title">Agenda de Aulas</div><div class="ph-sub">Calendário completo de aulas e eventos do semestre.</div></div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="calendar"></i> Junho 2026</div></div>
                    <div>
                        <div class="aula-item" style="background:var(--c-primary-lt);border-left:3px solid var(--c-primary);">
                            <div class="aula-data"><div class="aula-dia">29</div><div class="aula-mes">Hoje</div></div>
                            <div class="aula-info"><div class="aula-nome">Manutenção Eletromecânica I — Turma A</div><div class="aula-meta">14:00 – 17:30 · Laboratório 2</div></div>
                            <span class="pill pill-blue">Hoje</span>
                        </div>
                        <div class="aula-item">
                            <div class="aula-data"><div class="aula-dia">31</div><div class="aula-mes">Mai</div></div>
                            <div class="aula-info"><div class="aula-nome">Gestão da Qualidade — Turma B</div><div class="aula-meta">07:30 – 11:00 · Sala 05</div></div>
                            <span class="pill pill-gray">Programada</span>
                        </div>
                        <div class="aula-item">
                            <div class="aula-data"><div class="aula-dia">03</div><div class="aula-mes">Jun</div></div>
                            <div class="aula-info"><div class="aula-nome">Manutenção Eletromecânica I — Turma A (Reposição de 22/05)</div><div class="aula-meta">14:00 – 17:30 · Laboratório 2</div></div>
                            <span class="pill pill-amber">Reposição</span>
                        </div>
                        <div class="aula-item">
                            <div class="aula-data"><div class="aula-dia">14</div><div class="aula-mes">Jun</div></div>
                            <div class="aula-info"><div class="aula-nome">Avaliação Bimestral — Turmas A e B</div><div class="aula-meta">08:00 – 12:00 · Auditório Sophie Link</div></div>
                            <span class="pill pill-red">Prova</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- =========== ATIVIDADES =========== -->
            <div id="sec-atividades" class="sec">
                <div class="page-hdr"><div class="ph-title">Atividades & AVA</div><div class="ph-sub">Gerencie atividades, fóruns e materiais publicados no ambiente virtual.</div></div>
                <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;gap:8px;">
                    <button class="btn-secondary"><i data-lucide="upload" style="width:14px;height:14px;"></i> Subir Material</button>
                    <button class="btn-primary"><i data-lucide="plus" style="width:14px;height:14px;"></i> Nova Atividade</button>
                </div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Atividade</th><th>Disciplina</th><th>Entrega</th><th>Entregues</th><th>Situação</th><th>Ações</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Questionário — Lubrificação</td><td>Eletromecânica I</td><td>30/05</td><td>28/36</td><td><span class="pill pill-amber">Aberta</span></td><td><button class="btn-secondary" style="padding:4px 10px;font-size:0.72rem;">Corrigir</button></td></tr>
                            <tr><td class="td-bold">Estudo de Caso — Sotreq</td><td>Gest. Qualidade</td><td>07/06</td><td>0/32</td><td><span class="pill pill-blue">Publicada</span></td><td><button class="btn-secondary" style="padding:4px 10px;font-size:0.72rem;">Editar</button></td></tr>
                            <tr><td class="td-bold">Fórum — Segurança Vale</td><td>Eletromecânica I</td><td>15/05</td><td>36/36</td><td><span class="pill pill-green">Encerrada</span></td><td><button class="btn-secondary" style="padding:4px 10px;font-size:0.72rem;">Ver</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== RELATÓRIOS =========== -->
            <div id="sec-relatorios" class="sec">
                <div class="page-hdr"><div class="ph-title">Relatórios</div><div class="ph-sub">Exporte relatórios das suas turmas para a coordenação.</div></div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
                    <?php foreach ([['Frequência','Presença de todos os alunos por aula e período','calendar-check'],['Boletim','Notas e médias detalhadas por disciplina e aluno','bar-chart-2'],['Desempenho','Comparativo de turmas e evolução no semestre','trending-up']] as $r): ?>
                    <div class="card" style="padding:1.5rem;">
                        <div style="width:44px;height:44px;border-radius:var(--radius-sm);background:var(--c-primary-lt);color:var(--c-primary);display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><i data-lucide="<?= $r[2] ?>" style="width:22px;height:22px;"></i></div>
                        <div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:5px;"><?= $r[0] ?></div>
                        <div style="font-size:0.75rem;color:var(--c-text-muted);line-height:1.5;margin-bottom:14px;"><?= $r[1] ?></div>
                        <button class="btn-secondary" style="width:100%;justify-content:center;"><i data-lucide="download" style="width:14px;height:14px;"></i> Exportar PDF</button>
                    </div>
                    <?php endforeach; ?>
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
    const titles = {inicio:'Portal do Professor',turmas:'Minhas Turmas',frequencia:'Lançar Frequência',notas:'Lançar Notas',agenda:'Agenda de Aulas',atividades:'Atividades & AVA',relatorios:'Relatórios'};
    document.getElementById('topbar-title').textContent = titles[id] || 'Professor';
}

function analisarTurmaIA() {
    alert("🤖 Assistente de IA Sophie Link\n\nAnalisando Turma A: Eletromecânica...\n- Frequência Média: 93% (Estável)\n- Média de Notas: 8.5 (Boa)\n\n📌 Sugestão Didática:\nA aluna Fernanda Rocha apresenta 72% de frequência e média 6.5. O modelo preditivo sugere risco de reprovação. Recomendação: Oferecer lista de exercícios de nivelamento e contato com o setor pedagógico.");
}
</script>
</body>
</html>
