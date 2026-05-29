<?php
// dashboard.php — Painel Administrativo | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}
$nome       = $_SESSION['usuario_nome'] ?? 'Administrador';
$nivel      = $_SESSION['usuario_nivel'] ?? 'admin';
$primeiroNome = explode(' ', $nome)[0];
$nivelLabel = ['admin' => 'Administrador', 'coordenadora' => 'Coordenadora', 'professor' => 'Professor', 'empresa' => 'Empresa'];

// Redireciona professores e empresas para seus portais
if ($nivel === 'professor') { header('Location: portal_professor.php'); exit; }
if ($nivel === 'empresa')   { header('Location: portal_empresa.php');   exit; }
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Admin — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & TOKENS — ADMIN CLEAN
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

/* LAYOUT */
.app { display: flex; min-height: 100vh; }

/* ================================================================
   SIDEBAR
   ================================================================ */
.sidebar {
    width: var(--sidebar-w); background: var(--c-surface);
    border-right: 1px solid var(--c-border);
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; bottom: 0; z-index: 200;
    overflow-y: auto;
}
.sb-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 18px 18px 14px; border-bottom: 1px solid var(--c-border-lt);
    flex-shrink: 0;
}
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

/* ================================================================
   WORKSPACE
   ================================================================ */
.workspace { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }

.topbar { height: var(--header-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 100; }
.tb-left { display: flex; align-items: center; gap: 10px; }
.tb-title { font-size: 1rem; font-weight: 700; color: var(--c-text); }
.tb-right { display: flex; align-items: center; gap: 8px; }
.tb-btn { width: 36px; height: 36px; border-radius: var(--radius-sm); border: 1px solid var(--c-border); background: transparent; color: var(--c-text-muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; position: relative; }
.tb-btn:hover { background: var(--c-bg); color: var(--c-text); }
.tb-btn i { width: 16px; height: 16px; }
.notif-dot { position: absolute; top: 5px; right: 5px; width: 7px; height: 7px; background: var(--c-primary); border-radius: 50%; border: 1.5px solid #fff; }

.content { padding: 2rem; flex: 1; }

/* PAGE HEADER */
.page-hdr { margin-bottom: 2rem; }
.ph-greeting { font-size: 0.78rem; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
.ph-title { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 6px; }
.ph-sub { font-size: 0.88rem; color: var(--c-text-muted); max-width: 600px; }

/* STATS */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.75rem; }
.stat-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); padding: 1.25rem 1.5rem; box-shadow: var(--shadow-sm); transition: box-shadow 0.2s, transform 0.2s; }
.stat-card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }
.stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.stat-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
.stat-icon i { width: 20px; height: 20px; }
.si-blue   { background: var(--c-blue-lt);   color: var(--c-blue);   }
.si-purple { background: var(--c-purple-lt); color: var(--c-purple); }
.si-green  { background: var(--c-green-lt);  color: var(--c-green);  }
.si-orange { background: var(--c-primary-lt);color: var(--c-primary);}
.stat-trend { font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.trend-up   { background: var(--c-green-lt);  color: #15803D; }
.trend-down { background: var(--c-amber-lt);  color: #B45309; }
.stat-val { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 2px; }
.stat-lbl { font-size: 0.75rem; color: var(--c-text-muted); }

/* GRID PRINCIPAL */
.dash-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 1.25rem; margin-bottom: 1.75rem; }

/* CARDS GENÉRICOS */
.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.card-head { padding: 1rem 1.5rem; border-bottom: 1px solid var(--c-border-lt); display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 0.9rem; font-weight: 700; color: var(--c-text); display: flex; align-items: center; gap: 8px; }
.card-title i { width: 17px; height: 17px; color: var(--c-primary); }
.card-link { font-size: 0.75rem; font-weight: 600; color: var(--c-primary); }
.card-link:hover { text-decoration: underline; }

/* ALERTAS */
.alert-list { display: flex; flex-direction: column; }
.alert-item { display: flex; align-items: center; gap: 14px; padding: 14px 1.5rem; border-bottom: 1px solid var(--c-border-lt); transition: background 0.15s; }
.alert-item:last-child { border-bottom: none; }
.alert-item:hover { background: var(--c-bg); }
.alert-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.alert-icon i { width: 18px; height: 18px; }
.ai-warn  { background: var(--c-amber-lt); color: var(--c-amber); }
.ai-err   { background: var(--c-red-lt);   color: var(--c-red);   }
.ai-info  { background: var(--c-blue-lt);  color: var(--c-blue);  }
.ai-ok    { background: var(--c-green-lt); color: var(--c-green); }
.alert-body { flex: 1; min-width: 0; }
.alert-title { font-size: 0.83rem; font-weight: 700; color: var(--c-text); margin-bottom: 2px; }
.alert-desc  { font-size: 0.73rem; color: var(--c-text-muted); line-height: 1.5; }
.alert-btn { flex-shrink: 0; font-size: 0.72rem; font-weight: 700; padding: 5px 12px; border-radius: var(--radius-sm); border: 1px solid var(--c-border); background: none; font-family: var(--f-body); cursor: pointer; color: var(--c-text-2); transition: all 0.15s; }
.alert-btn:hover { border-color: var(--c-primary); color: var(--c-primary); background: var(--c-primary-lt); }

/* AÇÕES RÁPIDAS */
.action-list { display: flex; flex-direction: column; gap: 0; }
.action-btn { display: flex; align-items: center; justify-content: space-between; padding: 12px 1.5rem; border-bottom: 1px solid var(--c-border-lt); transition: background 0.15s; cursor: pointer; }
.action-btn:last-child { border-bottom: none; }
.action-btn:hover { background: var(--c-bg); }
.ab-left { display: flex; align-items: center; gap: 12px; }
.ab-icon { width: 34px; height: 34px; border-radius: var(--radius-sm); background: var(--c-primary-lt); color: var(--c-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ab-icon i { width: 16px; height: 16px; }
.ab-label { font-size: 0.83rem; font-weight: 600; color: var(--c-text-2); }
.ab-arrow { width: 15px; height: 15px; color: var(--c-text-light); transition: transform 0.15s; }
.action-btn:hover .ab-arrow { transform: translateX(3px); color: var(--c-primary); }

/* PILLS */
.pill { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 0.65rem; font-weight: 700; }
.pill-green  { background: var(--c-green-lt);  color: #15803D; }
.pill-amber  { background: var(--c-amber-lt);  color: #B45309; }
.pill-red    { background: var(--c-red-lt);    color: var(--c-red); }
.pill-blue   { background: var(--c-blue-lt);   color: #1D4ED8; }
.pill-gray   { background: var(--c-bg);        color: var(--c-text-muted); border: 1px solid var(--c-border); }

/* TABELAS */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 9px 1.5rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--c-text-light); border-bottom: 1px solid var(--c-border); }
.data-table td { padding: 12px 1.5rem; font-size: 0.82rem; border-bottom: 1px solid var(--c-border-lt); color: var(--c-text-2); }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: var(--c-bg); }
.td-bold { font-weight: 700; color: var(--c-text); }

/* NAVEGAÇÃO SEÇÕES */
.sec { display: none; }
.sec.active { display: block; }

@media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .sidebar { transform: translateX(-100%); } .workspace { margin-left: 0; } .content { padding: 1rem; } }
</style>
</head>
<body>
<div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sb-brand" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
            <div class="sb-tag" style="margin-top: 4px;">Painel Administrativo</div>
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
        <a href="#" class="nav-link" onclick="showSec('aprendizes',this)"><i data-lucide="users"></i> Aprendizes <span class="nav-badge">312</span></a>
        <?php if (in_array($nivel, ['admin','coordenadora'])): ?>
        <a href="#" class="nav-link" onclick="showSec('empresas-list',this)"><i data-lucide="building-2"></i> Empresas</a>
        <a href="portal_professor.php" class="nav-link"><i data-lucide="user-check"></i> Portal Professor</a>
        <?php endif; ?>
        <a href="#" class="nav-link" onclick="showSec('frequencia',this)"><i data-lucide="calendar-check"></i> Frequência</a>
        <a href="#" class="nav-link" onclick="showSec('notas',this)"><i data-lucide="bar-chart-2"></i> Notas & AVA</a>

        <div class="sb-sec">Administrativo</div>
        <?php if (in_array($nivel, ['admin','coordenadora','empresa'])): ?>
        <a href="#" class="nav-link" onclick="showSec('financeiro',this)"><i data-lucide="receipt"></i> Financeiro</a>
        <?php endif; ?>
        <a href="#" class="nav-link" onclick="showSec('relatorios',this)"><i data-lucide="file-bar-chart-2"></i> Relatórios</a>

        <?php if ($nivel === 'admin'): ?>
        <div class="sb-sec">Sistema</div>
        <a href="#" class="nav-link" onclick="showSec('configuracoes',this)"><i data-lucide="settings"></i> Configurações do Site</a>
        <a href="#" class="nav-link" onclick="showSec('usuarios',this)"><i data-lucide="shield-check"></i> Usuários & Acessos</a>
        <?php endif; ?>

        <div class="sb-footer">
            <a href="backend/api/auth/logout.php"><i data-lucide="log-out"></i> Sair</a>
        </div>
    </aside>

    <!-- WORKSPACE -->
    <div class="workspace">
        <header class="topbar">
            <div class="tb-left">
                <div class="tb-title" id="topbar-title">Dashboard</div>
            </div>
            <div class="tb-right">
                <button class="tb-btn"><i data-lucide="search"></i></button>
                <button class="tb-btn"><i data-lucide="bell"></i><span class="notif-dot"></span></button>
                <button class="tb-btn"><i data-lucide="settings"></i></button>
            </div>
        </header>

        <main class="content">

            <!-- =========== DASHBOARD =========== -->
            <div id="sec-dashboard" class="sec active">
                <div class="page-hdr">
                    <div class="ph-greeting">Bem-vindo de volta</div>
                    <div class="ph-title">Olá, <?= $primeiroNome ?>. 👋</div>
                    <div class="ph-sub">Acompanhe as métricas do programa de aprendizagem. Controle frequência, notas e situação financeira em tempo real.</div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="users"></i></div><span class="stat-trend trend-up">+12 este mês</span></div>
                        <div class="stat-val">312</div><div class="stat-lbl">Aprendizes Ativos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-purple"><i data-lucide="building-2"></i></div><span class="stat-trend trend-up">+2 este mês</span></div>
                        <div class="stat-val">49</div><div class="stat-lbl">Empresas Parceiras</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-green"><i data-lucide="percent"></i></div><span class="stat-trend trend-up">Estável</span></div>
                        <div class="stat-val">94%</div><div class="stat-lbl">Frequência Média</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-orange"><i data-lucide="alert-circle"></i></div><span class="stat-trend trend-down">Atenção</span></div>
                        <div class="stat-val">R$ 1.2k</div><div class="stat-lbl">Inadimplências</div>
                    </div>
                </div>

                <div class="dash-grid">
                    <div class="card">
                        <div class="card-head">
                            <div class="card-title"><i data-lucide="bell"></i> Avisos & Pendências</div>
                            <a href="#" class="card-link">Ver histórico →</a>
                        </div>
                        <div class="alert-list">
                            <div class="alert-item">
                                <div class="alert-icon ai-warn"><i data-lucide="file-warning"></i></div>
                                <div class="alert-body">
                                    <div class="alert-title">Contratos próximos do vencimento</div>
                                    <div class="alert-desc">12 aprendizes terão contratos encerrados nos próximos 30 dias. Revise para prorrogação ou desligamento.</div>
                                </div>
                                <button class="alert-btn">Revisar</button>
                            </div>
                            <div class="alert-item">
                                <div class="alert-icon ai-err"><i data-lucide="credit-card"></i></div>
                                <div class="alert-body">
                                    <div class="alert-title">Pagamento em atraso</div>
                                    <div class="alert-desc">A empresa "Tech Solutions LTDA" está com faturamento pendente do mês anterior.</div>
                                </div>
                                <button class="alert-btn">Notificar</button>
                            </div>
                            <div class="alert-item">
                                <div class="alert-icon ai-info"><i data-lucide="bar-chart-down"></i></div>
                                <div class="alert-body">
                                    <div class="alert-title">Alerta de frequência baixa</div>
                                    <div class="alert-desc">3 aprendizes registraram menos de 75% de presença neste módulo.</div>
                                </div>
                                <button class="alert-btn">Ver lista</button>
                            </div>
                            <div class="alert-item">
                                <div class="alert-icon ai-ok"><i data-lucide="check-circle"></i></div>
                                <div class="alert-body">
                                    <div class="alert-title">Avaliação bimestral concluída</div>
                                    <div class="alert-desc">Módulos 1 e 2 corrigidos. Média geral da turma: 8.2. Relatório disponível.</div>
                                </div>
                                <button class="alert-btn">Baixar</button>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-head"><div class="card-title"><i data-lucide="zap"></i> Ações Rápidas</div></div>
                        <div class="action-list">
                            <a href="#" class="action-btn" onclick="showSec('aprendizes',document.querySelector('[onclick*=aprendizes]'))">
                                <div class="ab-left"><div class="ab-icon"><i data-lucide="user-plus"></i></div><span class="ab-label">Cadastrar Aprendiz</span></div>
                                <i data-lucide="chevron-right" class="ab-arrow"></i>
                            </a>
                            <a href="#" class="action-btn" onclick="showSec('empresas-list',document.querySelector('[onclick*=empresas-list]'))">
                                <div class="ab-left"><div class="ab-icon"><i data-lucide="building"></i></div><span class="ab-label">Nova Empresa</span></div>
                                <i data-lucide="chevron-right" class="ab-arrow"></i>
                            </a>
                            <a href="#" class="action-btn" onclick="showSec('frequencia',document.querySelector('[onclick*=frequencia]'))">
                                <div class="ab-left"><div class="ab-icon"><i data-lucide="clipboard-check"></i></div><span class="ab-label">Registrar Frequência</span></div>
                                <i data-lucide="chevron-right" class="ab-arrow"></i>
                            </a>
                            <a href="#" class="action-btn" onclick="showSec('financeiro',document.querySelector('[onclick*=financeiro]'))">
                                <div class="ab-left"><div class="ab-icon"><i data-lucide="receipt"></i></div><span class="ab-label">Lançar Pagamento</span></div>
                                <i data-lucide="chevron-right" class="ab-arrow"></i>
                            </a>
                            <a href="portal_professor.php" class="action-btn">
                                <div class="ab-left"><div class="ab-icon"><i data-lucide="user-check"></i></div><span class="ab-label">Portal do Professor</span></div>
                                <i data-lucide="chevron-right" class="ab-arrow"></i>
                            </a>
                            <a href="portal_empresa.php" class="action-btn">
                                <div class="ab-left"><div class="ab-icon"><i data-lucide="briefcase"></i></div><span class="ab-label">Portal da Empresa</span></div>
                                <i data-lucide="chevron-right" class="ab-arrow"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Tabela recente -->
                <div class="card">
                    <div class="card-head">
                        <div class="card-title"><i data-lucide="users"></i> Aprendizes Recentes</div>
                        <a href="#" class="card-link" onclick="showSec('aprendizes',null)">Ver todos →</a>
                    </div>
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>Curso</th><th>Empresa</th><th>Frequência</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>Eletromecânica</td><td>Vale S.A.</td><td>96%</td><td><span class="pill pill-green">Regular</span></td></tr>
                            <tr><td class="td-bold">Carlos Eduardo Lima</td><td>Gestão da Qualidade</td><td>Sotreq</td><td>88%</td><td><span class="pill pill-green">Regular</span></td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>Segurança do Trabalho</td><td>Vale S.A.</td><td>72%</td><td><span class="pill pill-amber">Atenção</span></td></tr>
                            <tr><td class="td-bold">João Mendes</td><td>Logística</td><td>Tech Solutions</td><td>61%</td><td><span class="pill pill-red">Crítico</span></td></tr>
                            <tr><td class="td-bold">Maria Clara Neves</td><td>Administração</td><td>Sotreq</td><td>94%</td><td><span class="pill pill-green">Regular</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== APRENDIZES =========== -->
            <div id="sec-aprendizes" class="sec">
                <div class="page-hdr">
                    <div class="ph-greeting">Gestão Educacional</div>
                    <div class="ph-title">Aprendizes</div>
                    <div class="ph-sub">Cadastro, acompanhamento e situação dos aprendizes matriculados.</div>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <div style="display:flex;align-items:center;gap:6px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--radius-sm);padding:7px 12px;"><i data-lucide="search" style="width:15px;height:15px;color:var(--c-text-muted);"></i><input type="text" placeholder="Buscar aprendiz..." style="border:none;outline:none;font-family:var(--f-body);font-size:0.82rem;background:transparent;color:var(--c-text);width:200px;"></div>
                    </div>
                    <button style="display:flex;align-items:center;gap:7px;background:var(--c-primary);color:#fff;border:none;border-radius:var(--radius-sm);padding:9px 18px;font-family:var(--f-body);font-size:0.82rem;font-weight:700;cursor:pointer;"><i data-lucide="user-plus" style="width:15px;height:15px;"></i> Novo Aprendiz</button>
                </div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>RA</th><th>Curso</th><th>Empresa</th><th>Frequência</th><th>Situação</th><th>Ações</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>2026100401</td><td>Eletromecânica</td><td>Vale S.A.</td><td>96%</td><td><span class="pill pill-green">Regular</span></td><td><button style="background:none;border:1px solid var(--c-border);border-radius:5px;padding:3px 8px;font-size:0.7rem;cursor:pointer;font-family:var(--f-body);">Detalhes</button></td></tr>
                            <tr><td class="td-bold">Carlos Eduardo Lima</td><td>2026100402</td><td>Gestão da Qualidade</td><td>Sotreq</td><td>88%</td><td><span class="pill pill-green">Regular</span></td><td><button style="background:none;border:1px solid var(--c-border);border-radius:5px;padding:3px 8px;font-size:0.7rem;cursor:pointer;font-family:var(--f-body);">Detalhes</button></td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>2026100403</td><td>Segurança do Trabalho</td><td>Vale S.A.</td><td>72%</td><td><span class="pill pill-amber">Atenção</span></td><td><button style="background:none;border:1px solid var(--c-border);border-radius:5px;padding:3px 8px;font-size:0.7rem;cursor:pointer;font-family:var(--f-body);">Detalhes</button></td></tr>
                            <tr><td class="td-bold">João Mendes</td><td>2026100404</td><td>Logística</td><td>Tech Solutions</td><td>61%</td><td><span class="pill pill-red">Crítico</span></td><td><button style="background:none;border:1px solid var(--c-border);border-radius:5px;padding:3px 8px;font-size:0.7rem;cursor:pointer;font-family:var(--f-body);">Detalhes</button></td></tr>
                            <tr><td class="td-bold">Maria Clara Neves</td><td>2026100405</td><td>Administração</td><td>Sotreq</td><td>94%</td><td><span class="pill pill-green">Regular</span></td><td><button style="background:none;border:1px solid var(--c-border);border-radius:5px;padding:3px 8px;font-size:0.7rem;cursor:pointer;font-family:var(--f-body);">Detalhes</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== EMPRESAS =========== -->
            <div id="sec-empresas-list" class="sec">
                <div class="page-hdr">
                    <div class="ph-greeting">Gestão Educacional</div>
                    <div class="ph-title">Empresas Parceiras</div>
                    <div class="ph-sub">Gestão das empresas que participam do Programa de Aprendizagem.</div>
                </div>
                <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
                    <button style="display:flex;align-items:center;gap:7px;background:var(--c-primary);color:#fff;border:none;border-radius:var(--radius-sm);padding:9px 18px;font-family:var(--f-body);font-size:0.82rem;font-weight:700;cursor:pointer;"><i data-lucide="plus" style="width:15px;height:15px;"></i> Nova Empresa</button>
                </div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Empresa</th><th>CNPJ</th><th>Aprendizes</th><th>Situação Fin.</th><th>Responsável</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Vale S.A. — Programa Partilhar</td><td>33.592.510/0001-54</td><td>148</td><td><span class="pill pill-green">Em dia</span></td><td>Juliana Costa</td></tr>
                            <tr><td class="td-bold">Sotreq — Instituto Social</td><td>60.367.015/0001-20</td><td>94</td><td><span class="pill pill-green">Em dia</span></td><td>Ricardo Alves</td></tr>
                            <tr><td class="td-bold">Tech Solutions LTDA</td><td>12.345.678/0001-90</td><td>18</td><td><span class="pill pill-red">Pendente</span></td><td>Marcos Lopes</td></tr>
                            <tr><td class="td-bold">MinerTech Parauapebas</td><td>98.765.432/0001-11</td><td>52</td><td><span class="pill pill-green">Em dia</span></td><td>Cláudia Ferro</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FREQUÊNCIA =========== -->
            <div id="sec-frequencia" class="sec">
                <div class="page-hdr">
                    <div class="ph-title">Frequência</div>
                    <div class="ph-sub">Registro e acompanhamento de presença nas aulas teóricas.</div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="calendar-check"></i> Registro de Presença — Maio 2026</div><span class="pill pill-blue">Turma: Eletromecânica A</span></div>
                    <table class="data-table">
                        <thead><tr><th>Aluno</th><th>Aulas Dadas</th><th>Presenças</th><th>Faltas</th><th>%</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>40</td><td>38</td><td>2</td><td>96%</td><td><span class="pill pill-green">OK</span></td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>40</td><td>29</td><td>11</td><td>72%</td><td><span class="pill pill-amber">Atenção</span></td></tr>
                            <tr><td class="td-bold">João Mendes</td><td>40</td><td>24</td><td>16</td><td>61%</td><td><span class="pill pill-red">Crítico</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== NOTAS =========== -->
            <div id="sec-notas" class="sec">
                <div class="page-hdr"><div class="ph-title">Notas & AVA</div><div class="ph-sub">Boletim geral e lançamentos de notas por disciplina.</div></div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="bar-chart-2"></i> Boletim Geral 2026/1</div></div>
                    <table class="data-table">
                        <thead><tr><th>Aluno</th><th>Eletromecânica</th><th>Gest. Qualidade</th><th>SST</th><th>Logística</th><th>Média</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>9.0</td><td>8.5</td><td>9.0</td><td>—</td><td style="color:var(--c-green);font-weight:700">8.8</td></tr>
                            <tr><td class="td-bold">Carlos Eduardo Lima</td><td>8.0</td><td>9.0</td><td>7.5</td><td>—</td><td style="color:var(--c-green);font-weight:700">8.2</td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>6.5</td><td>7.0</td><td>8.0</td><td>—</td><td style="color:var(--c-amber);font-weight:700">7.2</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FINANCEIRO =========== -->
            <div id="sec-financeiro" class="sec">
                <div class="page-hdr"><div class="ph-title">Financeiro</div><div class="ph-sub">Gestão de mensalidades, faturamentos e inadimplências.</div></div>
                <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:1.25rem;">
                    <div class="stat-card"><div class="stat-top"><div class="stat-icon si-green"><i data-lucide="check-circle"></i></div></div><div class="stat-val">R$ 48.5k</div><div class="stat-lbl">Recebido (Mês)</div></div>
                    <div class="stat-card"><div class="stat-top"><div class="stat-icon si-orange"><i data-lucide="clock"></i></div></div><div class="stat-val">R$ 1.2k</div><div class="stat-lbl">Pendente</div></div>
                    <div class="stat-card"><div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="trending-up"></i></div></div><div class="stat-val">R$ 49.7k</div><div class="stat-lbl">Total Previsto</div></div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="receipt"></i> Lançamentos — Maio 2026</div></div>
                    <table class="data-table">
                        <thead><tr><th>Empresa</th><th>Referência</th><th>Valor</th><th>Vencimento</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Vale S.A.</td><td>Mai/2026</td><td>R$ 22.200,00</td><td>10/05/2026</td><td><span class="pill pill-green">Pago</span></td></tr>
                            <tr><td class="td-bold">Sotreq</td><td>Mai/2026</td><td>R$ 14.100,00</td><td>10/05/2026</td><td><span class="pill pill-green">Pago</span></td></tr>
                            <tr><td class="td-bold">Tech Solutions</td><td>Abr/2026</td><td>R$ 1.200,00</td><td>10/04/2026</td><td><span class="pill pill-red">Pendente</span></td></tr>
                            <tr><td class="td-bold">MinerTech</td><td>Mai/2026</td><td>R$ 7.800,00</td><td>10/05/2026</td><td><span class="pill pill-green">Pago</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== RELATÓRIOS =========== -->
            <div id="sec-relatorios" class="sec">
                <div class="page-hdr"><div class="ph-title">Relatórios</div><div class="ph-sub">Exporte relatórios do programa para fins institucionais e de auditoria.</div></div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
                    <?php
                    $relatorios = [
                        ['Frequência Mensal','Presença por turma e aluno exportado em PDF/Excel','calendar-check','blue'],
                        ['Boletim Geral','Notas e médias de todas as disciplinas do período','bar-chart-2','purple'],
                        ['Financeiro','Faturamentos e inadimplências por empresa parceira','receipt','orange'],
                        ['Contratos','Status dos contratos de aprendizagem vigentes','file-text','green'],
                        ['Aprendizes','Listagem completa com situação e dados cadastrais','users','blue'],
                        ['Empresas','Empresas ativas, aprendizes vinculados e status','building-2','purple'],
                    ];
                    foreach ($relatorios as $r): ?>
                    <div class="card" style="padding:1.5rem;display:flex;flex-direction:column;gap:12px;">
                        <div style="width:44px;height:44px;border-radius:var(--radius-sm);background:var(--c-<?= $r[3] ?>-lt);color:var(--c-<?= $r[3] ?>);display:flex;align-items:center;justify-content:center;"><i data-lucide="<?= $r[0] == 'Frequência Mensal' ? 'calendar-check' : ($r[0] == 'Boletim Geral' ? 'bar-chart-2' : ($r[0] == 'Financeiro' ? 'receipt' : ($r[0] == 'Contratos' ? 'file-text' : ($r[0] == 'Aprendizes' ? 'users' : 'building-2')))) ?>" style="width:22px;height:22px;"></i></div>
                        <div><div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:4px;"><?= $r[0] ?></div><div style="font-size:0.75rem;color:var(--c-text-muted);line-height:1.5;"><?= $r[1] ?></div></div>
                        <button style="margin-top:auto;display:flex;align-items:center;gap:6px;background:none;border:1px solid var(--c-border);border-radius:var(--radius-sm);padding:7px 12px;font-family:var(--f-body);font-size:0.75rem;font-weight:700;cursor:pointer;color:var(--c-text-2);width:fit-content;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-primary)';this.style.color='var(--c-primary)'" onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-2)'"><i data-lucide="download" style="width:13px;height:13px;"></i> Exportar</button>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- =========== CONFIGURAÇÕES =========== -->
            <div id="sec-configuracoes" class="sec">
                <div class="page-hdr"><div class="ph-title">Configurações do Site</div><div class="ph-sub">Gerencie informações institucionais, textos e configurações gerais do portal.</div></div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
                    <div class="card card-body" style="padding:1.5rem;">
                        <div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:1rem;display:flex;align-items:center;gap:8px;"><i data-lucide="globe" style="width:17px;height:17px;color:var(--c-primary);"></i> Dados Institucionais</div>
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div><label style="font-size:0.75rem;font-weight:700;color:var(--c-text-muted);display:block;margin-bottom:5px;">Nome da Instituição</label><input type="text" value="Centro Técnico Profissionalizante Sophie Link" style="width:100%;padding:9px 12px;border:1.5px solid var(--c-border);border-radius:var(--radius-sm);font-family:var(--f-body);font-size:0.85rem;color:var(--c-text);outline:none;background:var(--c-bg);"></div>
                            <div><label style="font-size:0.75rem;font-weight:700;color:var(--c-text-muted);display:block;margin-bottom:5px;">Endereço</label><input type="text" value="Avenida Amazonas, 64 – Bairro Rio Verde, Parauapebas – PA" style="width:100%;padding:9px 12px;border:1.5px solid var(--c-border);border-radius:var(--radius-sm);font-family:var(--f-body);font-size:0.85rem;color:var(--c-text);outline:none;background:var(--c-bg);"></div>
                            <div><label style="font-size:0.75rem;font-weight:700;color:var(--c-text-muted);display:block;margin-bottom:5px;">E-mail de Contato</label><input type="email" value="contato@sophielink.com.br" style="width:100%;padding:9px 12px;border:1.5px solid var(--c-border);border-radius:var(--radius-sm);font-family:var(--f-body);font-size:0.85rem;color:var(--c-text);outline:none;background:var(--c-bg);"></div>
                            <button style="background:var(--c-primary);color:#fff;border:none;border-radius:var(--radius-sm);padding:10px 20px;font-family:var(--f-body);font-weight:700;font-size:0.85rem;cursor:pointer;margin-top:5px;align-self:flex-start;">Salvar Alterações</button>
                        </div>
                    </div>
                    <div class="card" style="padding:1.5rem;">
                        <div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:1rem;display:flex;align-items:center;gap:8px;"><i data-lucide="layout" style="width:17px;height:17px;color:var(--c-primary);"></i> Seções da Página Inicial</div>
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <?php $secoes = ['Hero (Banner Principal)' => true, 'Seção Institucional' => true, 'Nossos Cursos' => true, 'Portais de Acesso' => true, 'Parceiros' => true, 'Rodapé de Contato' => true]; foreach ($secoes as $sec => $ativo): ?>
                            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--c-bg);border:1px solid var(--c-border);border-radius:var(--radius-sm);">
                                <span style="font-size:0.83rem;font-weight:600;color:var(--c-text-2);"><?= $sec ?></span>
                                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                                    <input type="checkbox" <?= $ativo ? 'checked' : '' ?> style="accent-color:var(--c-primary);width:15px;height:15px;">
                                    <span style="font-size:0.72rem;color:var(--c-text-muted);"><?= $ativo ? 'Visível' : 'Oculto' ?></span>
                                </label>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- =========== USUÁRIOS =========== -->
            <div id="sec-usuarios" class="sec">
                <div class="page-hdr"><div class="ph-title">Usuários & Acessos</div><div class="ph-sub">Gerencie contas de professores, coordenadores e empresas no sistema.</div></div>
                <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
                    <button style="display:flex;align-items:center;gap:7px;background:var(--c-primary);color:#fff;border:none;border-radius:var(--radius-sm);padding:9px 18px;font-family:var(--f-body);font-size:0.82rem;font-weight:700;cursor:pointer;"><i data-lucide="user-plus" style="width:15px;height:15px;"></i> Novo Usuário</button>
                </div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>E-mail</th><th>Nível</th><th>Último Acesso</th><th>Status</th><th>Ações</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Admin Sophie Link</td><td>admin@sophielink.com.br</td><td><span class="pill pill-red">Admin</span></td><td>Hoje, 10:30</td><td><span class="pill pill-green">Ativo</span></td><td><button style="font-size:0.7rem;border:1px solid var(--c-border);background:none;border-radius:5px;padding:3px 8px;cursor:pointer;font-family:var(--f-body);">Editar</button></td></tr>
                            <tr><td class="td-bold">Prof. Carlos Menezes</td><td>carlos@sophielink.com.br</td><td><span class="pill pill-blue">Professor</span></td><td>Hoje, 08:15</td><td><span class="pill pill-green">Ativo</span></td><td><button style="font-size:0.7rem;border:1px solid var(--c-border);background:none;border-radius:5px;padding:3px 8px;cursor:pointer;font-family:var(--f-body);">Editar</button></td></tr>
                            <tr><td class="td-bold">Vale S.A. (Empresa)</td><td>vale@sophielink.com.br</td><td><span class="pill pill-purple">Empresa</span></td><td>Ontem</td><td><span class="pill pill-green">Ativo</span></td><td><button style="font-size:0.7rem;border:1px solid var(--c-border);background:none;border-radius:5px;padding:3px 8px;cursor:pointer;font-family:var(--f-body);">Editar</button></td></tr>
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
    const titles = {
        dashboard:'Dashboard', aprendizes:'Aprendizes',
        'empresas-list':'Empresas Parceiras', frequencia:'Frequência',
        notas:'Notas & AVA', financeiro:'Financeiro',
        relatorios:'Relatórios', configuracoes:'Configurações do Site', usuarios:'Usuários & Acessos'
    };
    document.getElementById('topbar-title').textContent = titles[id] || 'Admin';
}
</script>
</body>
</html>
