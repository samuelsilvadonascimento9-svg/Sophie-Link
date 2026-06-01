<?php
// Inclua este arquivo no topo de todas as páginas do painel
// Requer: $pageTitle (string), $activeNav (string)
if (!isset($pageTitle)) $pageTitle = 'Sophie Link';
if (!isset($activeNav)) $activeNav = '';
$nomeUsuario = $_SESSION['usuario_nome'] ?? 'Usuário';
$nivelUsuario = $_SESSION['usuario_nivel'] ?? 'admin';
$nivelLabel = ['admin' => 'Administrador', 'coordenadora' => 'Coordenadora', 'professor' => 'Professor', 'empresa' => 'Empresa'];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?> — Sophie Link Admin</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --c-primary: #2563EB;
            --c-primary-hover: #1D4ED8;
            --c-primary-light: #60A5FA;
            --c-bg: #0A0A0F;
            --c-surface: #12121A;
            --c-surface-hover: #1A1A24;
            --c-border: rgba(255,255,255,0.08);
            --c-border-hover: rgba(37,99,235,0.3);
            --c-text: #FFFFFF;
            --c-muted: rgba(255,255,255,0.5);
            --c-glass: rgba(255,255,255,0.03);
            --f-body: 'Inter', sans-serif;
            --f-display: 'Syne', sans-serif;
            --sidebar-w: 260px;
        }

        html, body {
            height: 100%; font-family: var(--f-body); background: var(--c-bg);
            color: var(--c-text); -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--c-primary-light); }

        /* PRELOADER */
        #preloader { position: fixed; inset: 0; background: var(--c-bg); z-index: 99999; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s, visibility 0.3s; }
        #preloader.hide { opacity: 0; visibility: hidden; pointer-events: none; }
        .spinner { width: 40px; height: 40px; border: 3px solid var(--c-border); border-top-color: var(--c-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* LAYOUT */
        .app-layout { display: flex; height: 100vh; overflow: hidden; }

        /* SIDEBAR */
        .sidebar { width: var(--sidebar-w); background: var(--c-surface); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; flex-shrink: 0; height: 100vh; position: relative; z-index: 10; }
        .sidebar-brand { height: 70px; display: flex; align-items: center; padding: 0 1.5rem; border-bottom: 1px solid var(--c-border); gap: 12px; }
        .sidebar-brand-icon { width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, var(--c-primary), #7C3AED); display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-weight: 800; font-size: 0.9rem; color: #fff; }
        .sidebar-brand-name { font-family: var(--f-display); font-size: 1.2rem; font-weight: 700; letter-spacing: 0.5px; }
        .sidebar-brand-name em { font-style: normal; color: var(--c-primary-light); }

        .sidebar-nav { flex: 1; padding: 1.5rem 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
        .nav-label { font-size: 0.65rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.25); padding: 0.5rem 0.75rem; margin-top: 0.5rem; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 10px; text-decoration: none; font-size: 0.85rem; font-weight: 600; color: var(--c-muted); transition: all 0.2s; position: relative; }
        .nav-link i { width: 18px; height: 18px; transition: color 0.2s; }
        .nav-link:hover { background: var(--c-glass); color: var(--c-text); }
        .nav-link.active { background: rgba(37,99,235,0.15); color: var(--c-primary-light); border-left: 3px solid var(--c-primary); margin-left: -3px; padding-left: 17px; }
        .nav-badge { margin-left: auto; background: rgba(37,99,235,0.2); color: var(--c-primary-light); font-size: 0.65rem; font-weight: 800; padding: 3px 8px; border-radius: 20px; }

        .sidebar-footer { padding: 1.25rem 1rem; border-top: 1px solid var(--c-border); }
        .user-card { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: var(--c-glass); border: 1px solid var(--c-border); }
        .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--c-border); display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-weight: 700; color: #fff; }
        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 0.85rem; font-weight: 700; color: var(--c-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role { font-size: 0.7rem; color: var(--c-primary-light); font-weight: 600; }
        .logout-btn { color: var(--c-muted); padding: 6px; border-radius: 6px; transition: all 0.2s; cursor: pointer; background: none; border: none; }
        .logout-btn:hover { color: #EF4444; background: rgba(239,68,68,0.1); }

        /* MAIN */
        .main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; position: relative; }
        .main-bg-glow { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 800px; height: 400px; background: radial-gradient(ellipse at top, rgba(37,99,235,0.15), transparent 70%); pointer-events: none; z-index: 0; }
        
        .topbar { height: 70px; border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; z-index: 10; position: relative; background: rgba(10,10,15,0.8); backdrop-filter: blur(20px); }
        .tb-breadcrumb { font-size: 0.75rem; font-weight: 600; color: var(--c-muted); text-transform: uppercase; letter-spacing: 1px; }
        .tb-title { font-family: var(--f-display); font-size: 1.25rem; font-weight: 800; color: var(--c-text); }
        .tb-actions { display: flex; align-items: center; gap: 12px; }
        .tb-btn { width: 40px; height: 40px; border-radius: 10px; border: 1px solid var(--c-border); background: var(--c-glass); display: flex; align-items: center; justify-content: center; color: var(--c-muted); cursor: pointer; transition: all 0.2s; position: relative; }
        .tb-btn:hover { color: var(--c-text); border-color: rgba(255,255,255,0.2); }
        
        .content-scroll { flex: 1; overflow-y: auto; padding: 2.5rem 3rem; z-index: 1; position: relative; }

        /* COMPONENTES COMPARTILHADOS (Botões, Modais, Tabelas) */
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 20px; border-radius: 10px; font-family: var(--f-body); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: var(--c-primary); color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.2); }
        .btn-primary:hover { background: var(--c-primary-hover); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,99,235,0.3); }
        .btn-ghost { background: var(--c-glass); border: 1px solid var(--c-border); color: var(--c-text); }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
        .btn-danger { background: rgba(239,68,68,0.15); color: #EF4444; border: 1px solid rgba(239,68,68,0.2); }
        .btn-danger:hover { background: rgba(239,68,68,0.25); }
        .btn-sm { padding: 6px 12px; font-size: 0.75rem; border-radius: 8px; }
        .btn-icon { padding: 8px; }

        /* FORMULÁRIOS & MODAIS */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; display: none; align-items: center; justify-content: center; padding: 1rem; }
        .modal-overlay.open { display: flex; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 20px; width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto; position: relative; animation: slideUp 0.3s ease; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; border-bottom: 1px solid var(--c-border); }
        .modal-title { font-family: var(--f-display); font-size: 1.4rem; font-weight: 800; }
        .modal-close { background: none; border: none; color: var(--c-muted); cursor: pointer; padding: 4px; border-radius: 8px; transition: all 0.2s; }
        .modal-close:hover { color: var(--c-text); background: var(--c-glass); }
        .modal-body { padding: 2rem; }
        .modal-footer { padding: 1.25rem 2rem; border-top: 1px solid var(--c-border); display: flex; align-items: center; justify-content: flex-end; gap: 12px; background: rgba(0,0,0,0.2); }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-label { font-size: 0.75rem; font-weight: 700; color: var(--c-muted); }
        .form-label .req { color: var(--c-primary-light); }
        .form-input, .form-select, .form-textarea {
            background: var(--c-glass); border: 1px solid var(--c-border); border-radius: 10px;
            padding: 12px 16px; font-family: var(--f-body); font-size: 0.9rem; color: var(--c-text);
            outline: none; width: 100%; transition: all 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--c-primary); background: rgba(37,99,235,0.05); }
        .form-select option { background: var(--c-surface); color: var(--c-text); }
        .form-textarea { resize: vertical; min-height: 100px; }
        .form-section-title { font-family: var(--f-display); font-size: 1.1rem; font-weight: 800; color: var(--c-primary-light); border-bottom: 1px solid var(--c-border); padding-bottom: 8px; margin-bottom: 8px; margin-top: 1rem; grid-column: 1 / -1; }
        .form-section-title:first-child { margin-top: 0; }

        /* TABELA */
        .table-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .table-card-header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; border-bottom: 1px solid var(--c-border); flex-wrap: wrap; gap: 1rem; }
        .table-card-title { font-family: var(--f-display); font-size: 1.4rem; font-weight: 800; }
        .table-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .search-input-wrap { position: relative; }
        .search-input-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--c-muted); width: 16px; height: 16px; }
        .search-input { background: var(--c-glass); border: 1px solid var(--c-border); border-radius: 10px; padding: 10px 14px 10px 40px; font-size: 0.85rem; color: var(--c-text); width: 260px; outline: none; transition: border-color 0.2s; }
        .search-input:focus { border-color: var(--c-primary); }
        .filter-select { background: var(--c-glass); border: 1px solid var(--c-border); border-radius: 10px; padding: 10px 14px; font-size: 0.85rem; color: var(--c-text); outline: none; transition: border-color 0.2s; }
        .filter-select:focus { border-color: var(--c-primary); }

        table { width: 100%; border-collapse: collapse; }
        thead th { padding: 14px 1.5rem; text-align: left; font-size: 0.7rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--c-muted); border-bottom: 1px solid var(--c-border); background: rgba(255,255,255,0.02); }
        tbody tr { border-bottom: 1px solid var(--c-border); transition: background 0.15s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: var(--c-glass); }
        tbody td { padding: 16px 1.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.8); vertical-align: middle; }
        tbody td.td-name { color: var(--c-text); font-weight: 600; }
        .table-empty { text-align: center; padding: 4rem; color: var(--c-muted); font-size: 0.95rem; }

        /* BADGES */
        .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; }
        .badge-green  { background: rgba(34,197,94,0.15); color: #4ADE80; border: 1px solid rgba(34,197,94,0.3); }
        .badge-red    { background: rgba(239,68,68,0.15); color: #F87171; border: 1px solid rgba(239,68,68,0.3); }
        .badge-orange { background: rgba(249,115,22,0.15); color: #FB923C; border: 1px solid rgba(249,115,22,0.3); }
        .badge-blue   { background: rgba(59,130,246,0.15); color: #60A5FA; border: 1px solid rgba(59,130,246,0.3); }
        .badge-gray   { background: rgba(255,255,255,0.05); color: var(--c-muted); border: 1px solid var(--c-border); }

        /* TOAST */
        #toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; display: flex; flex-direction: column; gap: 10px; }
        .toast-item { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 12px; padding: 16px 20px; font-size: 0.85rem; font-weight: 600; min-width: 300px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); animation: toastIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 12px; }
        .toast-item.success { border-left: 4px solid #4ADE80; }
        .toast-item.error   { border-left: 4px solid #EF4444; }
        @keyframes toastIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

        @media (max-width: 768px) {
            .sidebar { display: none; }
            .form-grid { grid-template-columns: 1fr; }
            .content-scroll { padding: 1.5rem; }
        }
    </style>
</head>
<body>

<div id="preloader"><div class="spinner"></div></div>
<div id="toast"></div>

<div class="app-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sidebar-brand">
            <div class="sidebar-brand-icon">SL</div>
            <div class="sidebar-brand-name"><em>Sophie</em> Link</div>
        </div>
        <nav class="sidebar-nav">
            <div class="nav-label">Principal</div>
            <a href="dashboard.php" class="nav-link <?= $activeNav === 'dashboard' ? 'active' : '' ?>">
                <i data-lucide="layout-dashboard"></i> Dashboard
            </a>
            
            <div class="nav-label">Gestão Educacional</div>
            <?php if (in_array($nivelUsuario, ['admin', 'coordenadora'])): ?>
            <a href="empresas.php" class="nav-link <?= $activeNav === 'empresas' ? 'active' : '' ?>">
                <i data-lucide="building-2"></i> Empresas
            </a>
            <?php endif; ?>
            <a href="aprendizes.php" class="nav-link <?= $activeNav === 'aprendizes' ? 'active' : '' ?>">
                <i data-lucide="users"></i> Aprendizes
            </a>
            <a href="#" class="nav-link <?= $activeNav === 'frequencia' ? 'active' : '' ?>">
                <i data-lucide="calendar-check"></i> Frequência
            </a>
            <a href="#" class="nav-link <?= $activeNav === 'notas' ? 'active' : '' ?>">
                <i data-lucide="graduation-cap"></i> Notas & AVA
            </a>
            
            <div class="nav-label">Administrativo</div>
            <a href="#" class="nav-link <?= $activeNav === 'financeiro' ? 'active' : '' ?>">
                <i data-lucide="receipt"></i> Financeiro
            </a>
            <a href="#" class="nav-link <?= $activeNav === 'relatorios' ? 'active' : '' ?>">
                <i data-lucide="bar-chart-3"></i> Relatórios
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="user-card">
                <div class="user-avatar"><?= strtoupper(substr($nomeUsuario, 0, 1)) ?></div>
                <div class="user-info">
                    <div class="user-name"><?= htmlspecialchars($nomeUsuario) ?></div>
                    <div class="user-role"><?= $nivelLabel[$nivelUsuario] ?? $nivelUsuario ?></div>
                </div>
                <a href="auth/logout.php" class="logout-btn" title="Sair">
                    <i data-lucide="log-out" style="width:18px;height:18px"></i>
                </a>
            </div>
        </div>
    </aside>

    <!-- MAIN -->
    <main class="main-content">
        <div class="main-bg-glow"></div>
        <header class="topbar">
            <div>
                <div class="tb-breadcrumb">Gestão / <?= htmlspecialchars($pageTitle) ?></div>
                <div class="tb-title"><?= htmlspecialchars($pageTitle) ?></div>
            </div>
            <div class="tb-actions">
                <button class="tb-btn" title="Configurações"><i data-lucide="settings" style="width:18px;height:18px"></i></button>
            </div>
        </header>
        <div class="content-scroll">
