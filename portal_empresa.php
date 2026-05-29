<?php
// portal_empresa.php — Portal da Empresa | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id'])) {
    $_SESSION['usuario_nome']  = 'Vale S.A. — Programa Partilhar';
    $_SESSION['usuario_nivel'] = 'empresa';
}
$nomeEmpresa = $_SESSION['usuario_nome'] ?? 'Empresa Parceira';
$nomeShort   = 'Vale S.A.'; // exibição resumida
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal da Empresa — Sophie Link</title>
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
    --c-blue:       #3B82F6;
    --c-blue-lt:    #EFF6FF;
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
.sb-uname { font-size: 0.78rem; font-weight: 600; color: var(--c-text); }
.sb-urole { font-size: 0.68rem; color: var(--c-text-muted); }
.sb-sec { padding: 10px 18px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 9px 14px 9px 18px; font-size: 0.82rem; font-weight: 500; color: var(--c-text-muted); transition: all 0.15s; position: relative; cursor: pointer; }
.nav-link i { width: 16px; height: 16px; flex-shrink: 0; }
.nav-link:hover { color: var(--c-primary); background: var(--c-primary-lt); }
.nav-link.active { color: var(--c-primary); background: var(--c-primary-lt); font-weight: 600; }
.nav-link.active::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--c-primary); border-radius: 0 3px 3px 0; }
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
.si-green  { background: var(--c-primary-lt); color: var(--c-primary); }
.si-blue   { background: var(--c-blue-lt);    color: var(--c-blue);    }
.si-amber  { background: var(--c-amber-lt);   color: var(--c-amber);   }
.si-orange { background: var(--c-orange-lt);  color: var(--c-orange);  }
.stat-trend { font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.trend-up   { background: var(--c-primary-lt); color: var(--c-primary-d); }
.trend-down { background: var(--c-amber-lt);   color: #B45309; }
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
.pill-green  { background: var(--c-primary-lt); color: var(--c-primary-d); }
.pill-amber  { background: var(--c-amber-lt);   color: #B45309; }
.pill-red    { background: var(--c-red-lt);     color: var(--c-red); }
.pill-blue   { background: var(--c-blue-lt);    color: #1D4ED8; }
.pill-gray   { background: var(--c-bg);         color: var(--c-text-muted); border: 1px solid var(--c-border); }

/* FINANCEIRO */
.fin-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 1.5rem; border-bottom: 1px solid var(--c-border-lt); }
.fin-item:last-child { border-bottom: none; }
.fin-label { font-size: 0.83rem; font-weight: 600; color: var(--c-text); margin-bottom: 2px; }
.fin-date  { font-size: 0.72rem; color: var(--c-text-muted); }
.fin-val   { font-family: var(--f-display); font-weight: 800; font-size: 1.1rem; color: var(--c-text); text-align: right; }
.btn-primary { display: inline-flex; align-items: center; gap: 7px; background: var(--c-primary); color: #fff; border: none; border-radius: var(--radius-sm); padding: 8px 18px; font-family: var(--f-body); font-size: 0.82rem; font-weight: 700; cursor: pointer; }
.btn-secondary { display: inline-flex; align-items: center; gap: 7px; background: none; color: var(--c-text-2); border: 1px solid var(--c-border); border-radius: var(--radius-sm); padding: 7px 16px; font-family: var(--f-body); font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-secondary:hover { border-color: var(--c-primary); color: var(--c-primary); }

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
            <div class="sb-tag" style="margin-top: 4px;">Portal da Empresa</div>
        </div>
        <div class="sb-user">
            <div class="sb-avatar">V</div>
            <div>
                <div class="sb-uname">Vale S.A.</div>
                <div class="sb-urole">Programa Partilhar</div>
            </div>
        </div>

        <div class="sb-sec">Menu Principal</div>
        <a href="#" class="nav-link active" onclick="showSec('inicio',this)"><i data-lucide="layout-dashboard"></i> Dashboard</a>
        <a href="#" class="nav-link" onclick="showSec('aprendizes',this)"><i data-lucide="users"></i> Meus Aprendizes</a>
        <a href="#" class="nav-link" onclick="showSec('frequencia',this)"><i data-lucide="calendar-check"></i> Frequência</a>
        <a href="#" class="nav-link" onclick="showSec('desempenho',this)"><i data-lucide="bar-chart-2"></i> Desempenho Acadêmico</a>
        <a href="#" class="nav-link" onclick="showSec('financeiro',this)"><i data-lucide="receipt"></i> Financeiro</a>
        <a href="#" class="nav-link" onclick="showSec('documentos',this)"><i data-lucide="folder-open"></i> Documentos</a>
        <a href="#" class="nav-link" onclick="showSec('relatorios',this)"><i data-lucide="file-bar-chart-2"></i> Relatórios</a>
        <a href="#" class="nav-link" onclick="showSec('contato',this)"><i data-lucide="message-circle"></i> Falar com a Escola</a>

        <div class="sb-footer">
            <a href="index.php"><i data-lucide="log-out"></i> Sair</a>
        </div>
    </aside>

    <!-- WORKSPACE -->
    <div class="workspace">
        <header class="topbar">
            <div class="tb-title" id="topbar-title">Dashboard</div>
            <div class="tb-right">
                <button class="tb-btn"><i data-lucide="bell"></i><span class="notif-dot"></span></button>
                <button class="tb-btn"><i data-lucide="settings"></i></button>
            </div>
        </header>

        <main class="content">

            <!-- =========== DASHBOARD =========== -->
            <div id="sec-inicio" class="sec active">
                <div class="page-hdr">
                    <div class="ph-greeting">Programa Partilhar — Vale S.A.</div>
                    <div class="ph-title">Olá, Vale! 👋</div>
                    <div class="ph-sub">Acompanhe o desempenho dos seus aprendizes no Centro Técnico Profissionalizante Sophie Link — Parauapebas, PA.</div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-green"><i data-lucide="users"></i></div><span class="stat-trend trend-up">+3 este mês</span></div>
                        <div class="stat-val">148</div><div class="stat-lbl">Aprendizes Ativos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="percent"></i></div><span class="stat-trend trend-up">Ótimo</span></div>
                        <div class="stat-val">93%</div><div class="stat-lbl">Frequência Média</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-amber"><i data-lucide="alert-triangle"></i></div><span class="stat-trend trend-down">Atenção</span></div>
                        <div class="stat-val">4</div><div class="stat-lbl">Alertas de Frequência</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-top"><div class="stat-icon si-orange"><i data-lucide="credit-card"></i></div></div>
                        <div class="stat-val">Em dia</div><div class="stat-lbl">Situação Financeira</div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
                    <!-- Alertas -->
                    <div class="card">
                        <div class="card-head">
                            <div class="card-title"><i data-lucide="bell"></i> Alertas & Notificações</div>
                        </div>
                        <div>
                            <div style="display:flex;align-items:center;gap:14px;padding:14px 1.5rem;border-bottom:1px solid var(--c-border-lt);">
                                <div style="width:38px;height:38px;border-radius:50%;background:var(--c-amber-lt);color:var(--c-amber);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i data-lucide="alert-triangle" style="width:17px;height:17px;"></i></div>
                                <div style="flex:1;">
                                    <div style="font-size:0.83rem;font-weight:700;color:var(--c-text);margin-bottom:2px;">Frequência abaixo do mínimo</div>
                                    <div style="font-size:0.73rem;color:var(--c-text-muted);">4 aprendizes estão com presença abaixo de 75% nas aulas teóricas deste mês.</div>
                                </div>
                                <button class="btn-secondary" style="font-size:0.72rem;padding:5px 10px;" onclick="showSec('frequencia',document.querySelector('[onclick*=frequencia]'))">Ver lista</button>
                            </div>
                            <div style="display:flex;align-items:center;gap:14px;padding:14px 1.5rem;border-bottom:1px solid var(--c-border-lt);">
                                <div style="width:38px;height:38px;border-radius:50%;background:var(--c-blue-lt);color:var(--c-blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i data-lucide="calendar" style="width:17px;height:17px;"></i></div>
                                <div style="flex:1;">
                                    <div style="font-size:0.83rem;font-weight:700;color:var(--c-text);margin-bottom:2px;">Avaliação Bimestral — 14/06</div>
                                    <div style="font-size:0.73rem;color:var(--c-text-muted);">Prova bimestral presencial dos módulos 1 e 2. Libere seus aprendizes para o período integral.</div>
                                </div>
                                <button class="btn-secondary" style="font-size:0.72rem;padding:5px 10px;">Ciente</button>
                            </div>
                            <div style="display:flex;align-items:center;gap:14px;padding:14px 1.5rem;">
                                <div style="width:38px;height:38px;border-radius:50%;background:var(--c-primary-lt);color:var(--c-primary);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i data-lucide="check-circle" style="width:17px;height:17px;"></i></div>
                                <div style="flex:1;">
                                    <div style="font-size:0.83rem;font-weight:700;color:var(--c-text);margin-bottom:2px;">Relatório Mensal disponível</div>
                                    <div style="font-size:0.73rem;color:var(--c-text-muted);">O relatório de abril está disponível para download.</div>
                                </div>
                                <button class="btn-secondary" style="font-size:0.72rem;padding:5px 10px;" onclick="showSec('relatorios',document.querySelector('[onclick*=relatorios]'))">Baixar</button>
                            </div>
                        </div>
                    </div>

                    <!-- Ações rápidas -->
                    <div class="card">
                        <div class="card-head"><div class="card-title"><i data-lucide="zap"></i> Ações Rápidas</div></div>
                        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:8px;">
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('aprendizes',document.querySelector('[onclick*=aprendizes]'))"><i data-lucide="users" style="width:14px;height:14px;"></i> Ver Aprendizes</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('frequencia',document.querySelector('[onclick*=frequencia]'))"><i data-lucide="calendar-check" style="width:14px;height:14px;"></i> Frequência do Mês</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('financeiro',document.querySelector('[onclick*=financeiro]'))"><i data-lucide="receipt" style="width:14px;height:14px;"></i> Faturamento</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('relatorios',document.querySelector('[onclick*=relatorios]'))"><i data-lucide="download" style="width:14px;height:14px;"></i> Relatórios</button>
                            <button class="btn-secondary" style="width:100%;justify-content:center;" onclick="showSec('contato',document.querySelector('[onclick*=contato]'))"><i data-lucide="message-circle" style="width:14px;height:14px;"></i> Falar com a Escola</button>
                        </div>
                    </div>
                </div>

                <!-- Tabela resumo -->
                <div class="card">
                    <div class="card-head">
                        <div class="card-title"><i data-lucide="users"></i> Aprendizes em Destaque</div>
                        <a href="#" class="card-link" onclick="showSec('aprendizes',document.querySelector('[onclick*=aprendizes]'))">Ver todos →</a>
                    </div>
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>Curso</th><th>Frequência</th><th>Média</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>Eletromecânica</td><td>96%</td><td style="color:var(--c-primary);font-weight:700">8.5</td><td><span class="pill pill-green">Regular</span></td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>Eletromecânica</td><td>72%</td><td style="color:var(--c-amber);font-weight:700">6.5</td><td><span class="pill pill-amber">Atenção</span></td></tr>
                            <tr><td class="td-bold">Lucas Carvalho</td><td>Gestão da Qualidade</td><td>88%</td><td style="color:var(--c-primary);font-weight:700">8.0</td><td><span class="pill pill-green">Regular</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== APRENDIZES =========== -->
            <div id="sec-aprendizes" class="sec">
                <div class="page-hdr"><div class="ph-title">Meus Aprendizes</div><div class="ph-sub">Todos os aprendizes vinculados à Vale S.A. no Programa Partilhar — Sophie Link.</div></div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>RA</th><th>Nome</th><th>Curso</th><th>Frequência</th><th>Média</th><th>Contrato</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td>2026100401</td><td class="td-bold">Ana Paula Souza</td><td>Eletromecânica</td><td>96%</td><td style="color:var(--c-primary);font-weight:700">8.5</td><td>Mar/2025 – Mar/2027</td><td><span class="pill pill-green">Regular</span></td></tr>
                            <tr><td>2026100403</td><td class="td-bold">Fernanda Rocha</td><td>Eletromecânica</td><td>72%</td><td style="color:var(--c-amber);font-weight:700">6.5</td><td>Jan/2025 – Jan/2027</td><td><span class="pill pill-amber">Atenção</span></td></tr>
                            <tr><td>2026100407</td><td class="td-bold">Lucas Carvalho</td><td>Gestão da Qualidade</td><td>88%</td><td style="color:var(--c-primary);font-weight:700">8.0</td><td>Jun/2025 – Jun/2027</td><td><span class="pill pill-green">Regular</span></td></tr>
                            <tr><td>2026100412</td><td class="td-bold">Bianca Torres</td><td>Seg. do Trabalho</td><td>65%</td><td style="color:var(--c-red);font-weight:700">5.5</td><td>Feb/2025 – Feb/2027</td><td><span class="pill pill-red">Crítico</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FREQUÊNCIA =========== -->
            <div id="sec-frequencia" class="sec">
                <div class="page-hdr"><div class="ph-title">Frequência</div><div class="ph-sub">Relatório de presença dos seus aprendizes — Maio 2026.</div></div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="calendar-check"></i> Presença — Maio 2026</div><button class="btn-secondary"><i data-lucide="download" style="width:14px;height:14px;"></i> Exportar</button></div>
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>Curso</th><th>Aulas Dadas</th><th>Presenças</th><th>Faltas</th><th>%</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>Eletromecânica</td><td>40</td><td>38</td><td>2</td><td>96%</td><td><span class="pill pill-green">OK</span></td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>Eletromecânica</td><td>40</td><td>29</td><td>11</td><td>72%</td><td><span class="pill pill-amber">Atenção</span></td></tr>
                            <tr><td class="td-bold">Lucas Carvalho</td><td>Gest. Qualidade</td><td>40</td><td>35</td><td>5</td><td>88%</td><td><span class="pill pill-green">OK</span></td></tr>
                            <tr><td class="td-bold">Bianca Torres</td><td>Seg. Trabalho</td><td>40</td><td>26</td><td>14</td><td>65%</td><td><span class="pill pill-red">Crítico</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== DESEMPENHO =========== -->
            <div id="sec-desempenho" class="sec">
                <div class="page-hdr"><div class="ph-title">Desempenho Acadêmico</div><div class="ph-sub">Boletim detalhado dos aprendizes vinculados — 2026/1.</div></div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="bar-chart-2"></i> Boletim 2026/1</div></div>
                    <table class="data-table">
                        <thead><tr><th>Nome</th><th>Nota 1</th><th>Nota 2</th><th>Média</th><th>Faltas</th><th>Situação</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Ana Paula Souza</td><td>8.0</td><td>9.0</td><td style="color:var(--c-primary);font-weight:700">8.5</td><td>2</td><td><span class="pill pill-green">Aprovado</span></td></tr>
                            <tr><td class="td-bold">Fernanda Rocha</td><td>6.0</td><td>7.0</td><td style="color:var(--c-amber);font-weight:700">6.5</td><td>11</td><td><span class="pill pill-amber">Recuperação</span></td></tr>
                            <tr><td class="td-bold">Lucas Carvalho</td><td>8.5</td><td>7.5</td><td style="color:var(--c-primary);font-weight:700">8.0</td><td>5</td><td><span class="pill pill-green">Aprovado</span></td></tr>
                            <tr><td class="td-bold">Bianca Torres</td><td>5.0</td><td>6.0</td><td style="color:var(--c-red);font-weight:700">5.5</td><td>14</td><td><span class="pill pill-red">Reprovado</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== FINANCEIRO =========== -->
            <div id="sec-financeiro" class="sec">
                <div class="page-hdr"><div class="ph-title">Financeiro</div><div class="ph-sub">Faturamentos e pagamentos referentes ao Programa Partilhar.</div></div>
                <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:1.25rem;">
                    <div class="stat-card"><div class="stat-top"><div class="stat-icon si-green"><i data-lucide="check-circle"></i></div></div><div class="stat-val">R$ 22.2k</div><div class="stat-lbl">Total Pago (Mai/2026)</div></div>
                    <div class="stat-card"><div class="stat-top"><div class="stat-icon si-amber"><i data-lucide="clock"></i></div></div><div class="stat-val">R$ 0</div><div class="stat-lbl">Pendente</div></div>
                    <div class="stat-card"><div class="stat-top"><div class="stat-icon si-blue"><i data-lucide="calculator"></i></div></div><div class="stat-val">148</div><div class="stat-lbl">Aprendizes Faturados</div></div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i data-lucide="receipt"></i> Histórico de Faturamento</div></div>
                    <?php
                    $meses = [['Mai/2026','22.200,00','10/05/2026','Pago','pill-green'],['Abr/2026','22.200,00','10/04/2026','Pago','pill-green'],['Mar/2026','21.600,00','10/03/2026','Pago','pill-green'],['Fev/2026','20.800,00','10/02/2026','Pago','pill-green']];
                    foreach ($meses as $m): ?>
                    <div class="fin-item">
                        <div>
                            <div class="fin-label">Mensalidade Aprendizagem — <?= $m[0] ?></div>
                            <div class="fin-date">Vencimento: <?= $m[2] ?></div>
                        </div>
                        <div style="display:flex;align-items:center;gap:14px;">
                            <div class="fin-val">R$ <?= $m[1] ?></div>
                            <span class="pill <?= $m[4] ?>"><?= $m[3] ?></span>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- =========== DOCUMENTOS =========== -->
            <div id="sec-documentos" class="sec">
                <div class="page-hdr"><div class="ph-title">Documentos</div><div class="ph-sub">Contratos, termos e documentos administrativos dos seus aprendizes.</div></div>
                <div class="card">
                    <table class="data-table">
                        <thead><tr><th>Documento</th><th>Aprendiz</th><th>Data</th><th>Ações</th></tr></thead>
                        <tbody>
                            <tr><td class="td-bold">Contrato de Aprendizagem</td><td>Ana Paula Souza</td><td>15/03/2025</td><td><button class="btn-secondary" style="font-size:0.72rem;padding:4px 10px;"><i data-lucide="download" style="width:12px;height:12px;"></i> Baixar PDF</button></td></tr>
                            <tr><td class="td-bold">Contrato de Aprendizagem</td><td>Fernanda Rocha</td><td>10/01/2025</td><td><button class="btn-secondary" style="font-size:0.72rem;padding:4px 10px;"><i data-lucide="download" style="width:12px;height:12px;"></i> Baixar PDF</button></td></tr>
                            <tr><td class="td-bold">Relatório Anual 2025</td><td>Todos (Vale S.A.)</td><td>31/12/2025</td><td><button class="btn-secondary" style="font-size:0.72rem;padding:4px 10px;"><i data-lucide="download" style="width:12px;height:12px;"></i> Baixar PDF</button></td></tr>
                            <tr><td class="td-bold">Termo de Parceria Kolping/Vale</td><td>—</td><td>01/01/2024</td><td><button class="btn-secondary" style="font-size:0.72rem;padding:4px 10px;"><i data-lucide="eye" style="width:12px;height:12px;"></i> Visualizar</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- =========== RELATÓRIOS =========== -->
            <div id="sec-relatorios" class="sec">
                <div class="page-hdr"><div class="ph-title">Relatórios</div><div class="ph-sub">Exporte relatórios de desempenho e frequência dos seus aprendizes.</div></div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
                    <?php foreach ([['Frequência Mensal','Presença de todos os aprendizes por mês','calendar-check'],['Boletim Acadêmico','Notas e médias por disciplina e período','bar-chart-2'],['Relatório Anual','Resumo completo do ano letivo por aprendiz','file-text']] as $r): ?>
                    <div class="card" style="padding:1.5rem;">
                        <div style="width:44px;height:44px;border-radius:var(--radius-sm);background:var(--c-primary-lt);color:var(--c-primary);display:flex;align-items:center;justify-content:center;margin-bottom:12px;"><i data-lucide="<?= $r[2] ?>" style="width:22px;height:22px;"></i></div>
                        <div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:5px;"><?= $r[0] ?></div>
                        <div style="font-size:0.75rem;color:var(--c-text-muted);line-height:1.5;margin-bottom:14px;"><?= $r[1] ?></div>
                        <button class="btn-secondary" style="width:100%;justify-content:center;"><i data-lucide="download" style="width:14px;height:14px;"></i> Exportar PDF</button>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- =========== CONTATO =========== -->
            <div id="sec-contato" class="sec">
                <div class="page-hdr"><div class="ph-title">Falar com a Escola</div><div class="ph-sub">Envie uma mensagem diretamente à coordenação da Sophie Link.</div></div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
                    <div class="card" style="padding:1.5rem;">
                        <div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:1rem;display:flex;align-items:center;gap:8px;"><i data-lucide="send" style="width:17px;height:17px;color:var(--c-primary);"></i> Enviar Mensagem</div>
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;flex-direction:column;gap:5px;"><label style="font-size:0.73rem;font-weight:700;color:var(--c-text-muted);">Assunto</label><select style="padding:9px 12px;border:1.5px solid var(--c-border);border-radius:var(--radius-sm);font-family:var(--f-body);font-size:0.85rem;background:var(--c-bg);"><option>Frequência de Aprendiz</option><option>Documentação</option><option>Financeiro</option><option>Outro</option></select></div>
                            <div style="display:flex;flex-direction:column;gap:5px;"><label style="font-size:0.73rem;font-weight:700;color:var(--c-text-muted);">Mensagem</label><textarea rows="5" placeholder="Descreva sua solicitação..." style="padding:9px 12px;border:1.5px solid var(--c-border);border-radius:var(--radius-sm);font-family:var(--f-body);font-size:0.85rem;resize:vertical;"></textarea></div>
                            <button class="btn-primary" style="align-self:flex-start;"><i data-lucide="send" style="width:14px;height:14px;"></i> Enviar</button>
                        </div>
                    </div>
                    <div class="card" style="padding:1.5rem;">
                        <div style="font-size:0.9rem;font-weight:700;color:var(--c-text);margin-bottom:1rem;display:flex;align-items:center;gap:8px;"><i data-lucide="info" style="width:17px;height:17px;color:var(--c-primary);"></i> Contatos da Escola</div>
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;align-items:center;gap:10px;"><i data-lucide="map-pin" style="width:16px;height:16px;color:var(--c-primary);flex-shrink:0;"></i><span style="font-size:0.83rem;color:var(--c-text-2);">Av. Amazonas, 64 – Rio Verde, Parauapebas – PA</span></div>
                            <div style="display:flex;align-items:center;gap:10px;"><i data-lucide="mail" style="width:16px;height:16px;color:var(--c-primary);flex-shrink:0;"></i><span style="font-size:0.83rem;color:var(--c-text-2);">parceiros@sophielink.com.br</span></div>
                            <div style="display:flex;align-items:center;gap:10px;"><i data-lucide="phone" style="width:16px;height:16px;color:var(--c-primary);flex-shrink:0;"></i><span style="font-size:0.83rem;color:var(--c-text-2);">(94) 3341-XXXX</span></div>
                            <div style="display:flex;align-items:center;gap:10px;"><i data-lucide="clock" style="width:16px;height:16px;color:var(--c-primary);flex-shrink:0;"></i><span style="font-size:0.83rem;color:var(--c-text-2);">Seg – Sex, das 07h às 17h</span></div>
                        </div>
                        <div style="margin-top:1.5rem;padding:12px 14px;background:var(--c-primary-lt);border:1px solid rgba(34,197,94,0.2);border-radius:var(--radius-sm);">
                            <div style="font-size:0.8rem;font-weight:700;color:var(--c-primary-d);margin-bottom:3px;">Responsável pela Parceria</div>
                            <div style="font-size:0.75rem;color:var(--c-text-muted);">Coordenadora Juliana Costa<br>juliana@sophielink.com.br</div>
                        </div>
                    </div>
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
    const titles = {inicio:'Dashboard',aprendizes:'Meus Aprendizes',frequencia:'Frequência',desempenho:'Desempenho Acadêmico',financeiro:'Financeiro',documentos:'Documentos',relatorios:'Relatórios',contato:'Falar com a Escola'};
    document.getElementById('topbar-title').textContent = titles[id] || 'Portal da Empresa';
}
</script>
</body>
</html>
