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
    <title><?= htmlspecialchars($pageTitle) ?> — Sophie Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --orange: #FF7A00; --orange-hover: #E06C00;
            --orange-glow: rgba(255,122,0,0.2); --orange-subtle: rgba(255,122,0,0.08);
            --black: #0A0A0A; --surface: #141414; --surface2: #1C1C1C; --surface3: #222222;
            --border: rgba(255,255,255,0.06); --border-hover: rgba(255,122,0,0.4);
            --white: #FFFFFF; --muted: #6B6B6B; --muted-light: #999999;
            --sidebar-w: 260px;
        }
        html, body { height: 100%; font-family: 'Inter', sans-serif; background: var(--black); color: var(--white); -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--orange); }

        /* PRELOADER */
        #preloader { position: fixed; inset: 0; background: var(--black); z-index: 99999; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s, visibility 0.5s; }
        #preloader.hide { opacity: 0; visibility: hidden; pointer-events: none; }
        .preloader-bar { width: 200px; height: 2px; background: var(--surface2); border-radius: 2px; overflow: hidden; }
        .preloader-fill { height: 100%; width: 0; background: var(--orange); animation: loadFill 0.8s ease forwards; }
        @keyframes loadFill { to { width: 100%; } }

        /* LAYOUT */
        .app-layout { display: flex; height: 100vh; overflow: hidden; }

        /* SIDEBAR */
        .sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; height: 100vh; overflow: hidden; position: relative; }
        .sidebar::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--orange), transparent); }
        .sidebar-brand { height: 64px; display: flex; align-items: center; padding: 0 1.5rem; border-bottom: 1px solid var(--border); gap: 10px; flex-shrink: 0; }
        .sidebar-brand-icon { width: 32px; height: 32px; background: var(--orange); border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sidebar-brand-name { font-family: 'Teko', sans-serif; font-size: 1.5rem; font-weight: 600; letter-spacing: 1px; color: var(--white); }
        .sidebar-brand-name span { color: var(--orange); }
        .sidebar-nav { flex: 1; padding: 1.25rem 0.75rem; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
        .nav-section-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); padding: 0.75rem 0.75rem 0.5rem; margin-top: 0.5rem; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; text-decoration: none; font-size: 0.875rem; font-weight: 500; color: var(--muted-light); transition: all 0.2s; position: relative; white-space: nowrap; border: 1px solid transparent; }
        .nav-link svg { width: 18px; height: 18px; flex-shrink: 0; transition: color 0.2s; }
        .nav-link:hover { background: var(--orange-subtle); color: var(--white); }
        .nav-link:hover svg { color: var(--orange); }
        .nav-link.active { background: var(--orange-subtle); color: var(--white); border-color: rgba(255,122,0,0.2); }
        .nav-link.active svg { color: var(--orange); }
        .nav-link.active::before { content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 3px; background: var(--orange); border-radius: 0 2px 2px 0; }
        .nav-badge { margin-left: auto; background: var(--orange); color: white; font-size: 0.65rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
        .sidebar-footer { padding: 1rem 0.75rem; border-top: 1px solid var(--border); flex-shrink: 0; }
        .user-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; background: var(--surface2); border: 1px solid var(--border); }
        .user-avatar { width: 34px; height: 34px; border-radius: 8px; background: var(--orange); display: flex; align-items: center; justify-content: center; font-family: 'Teko', sans-serif; font-size: 1.1rem; font-weight: 700; color: white; flex-shrink: 0; }
        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 0.82rem; font-weight: 600; color: var(--white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role { font-size: 0.7rem; color: var(--muted); }
        .logout-btn { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; border-radius: 4px; display: flex; transition: color 0.2s; }
        .logout-btn:hover { color: #ef4444; }

        /* MAIN */
        .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
        .topbar { height: 64px; border-bottom: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; flex-shrink: 0; }
        .page-breadcrumb { font-size: 0.75rem; color: var(--muted); }
        .page-title { font-family: 'Teko', sans-serif; font-size: 1.6rem; font-weight: 600; letter-spacing: 0.5px; color: var(--white); }
        .topbar-actions { display: flex; align-items: center; gap: 10px; }
        .icon-btn { width: 36px; height: 36px; border: 1px solid var(--border); background: var(--surface2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--muted-light); cursor: pointer; transition: all 0.2s; position: relative; }
        .icon-btn:hover { border-color: var(--border-hover); color: var(--white); }
        .badge-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; background: #ef4444; border-radius: 50%; border: 2px solid var(--surface); }
        .content-scroll { flex: 1; overflow-y: auto; padding: 2rem; }

        /* BOTÕES */
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: var(--orange); color: white; }
        .btn-primary:hover { background: var(--orange-hover); box-shadow: 0 4px 15px rgba(255,122,0,0.3); }
        .btn-ghost { background: var(--surface2); color: var(--muted-light); border: 1px solid var(--border); }
        .btn-ghost:hover { border-color: var(--border-hover); color: var(--white); }
        .btn-danger { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); }
        .btn-danger:hover { background: rgba(239,68,68,0.25); }
        .btn-sm { padding: 6px 12px; font-size: 0.78rem; }
        .btn-icon { padding: 8px; }

        /* FORMULÁRIO */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 1000; display: none; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(4px); }
        .modal-overlay.open { display: flex; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto; position: relative; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--orange), transparent); border-radius: 16px 16px 0 0; }
        .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; border-bottom: 1px solid var(--border); }
        .modal-title { font-family: 'Teko', sans-serif; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.5px; }
        .modal-close { background: none; border: none; color: var(--muted); cursor: pointer; padding: 4px; border-radius: 6px; display: flex; transition: color 0.2s; }
        .modal-close:hover { color: var(--white); }
        .modal-body { padding: 1.5rem; }
        .modal-footer { padding: 1.25rem 1.5rem; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: flex-end; gap: 10px; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-grid.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
        .form-label .req { color: var(--orange); }
        .form-input, .form-select, .form-textarea {
            background: var(--surface2); border: 1px solid var(--border); border-radius: 8px;
            padding: 10px 14px; font-family: 'Inter', sans-serif; font-size: 0.875rem;
            color: var(--white); outline: none; width: 100%;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-glow);
        }
        .form-select option { background: var(--surface2); }
        .form-textarea { resize: vertical; min-height: 80px; }
        .form-section-title { font-family: 'Teko', sans-serif; font-size: 1rem; font-weight: 600; color: var(--orange); letter-spacing: 1px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 1px solid var(--border); margin-bottom: 4px; grid-column: 1 / -1; }

        /* TABELA */
        .table-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .table-card-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); flex-wrap: wrap; gap: 1rem; }
        .table-card-title { font-family: 'Teko', sans-serif; font-size: 1.4rem; font-weight: 600; }
        .table-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .search-input-wrap { position: relative; }
        .search-input-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); width: 16px; height: 16px; pointer-events: none; }
        .search-input { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px 8px 36px; font-size: 0.85rem; color: var(--white); outline: none; width: 240px; transition: border-color 0.2s; }
        .search-input:focus { border-color: var(--orange); }
        .search-input::placeholder { color: var(--muted); }
        .filter-select { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; font-size: 0.85rem; color: var(--muted-light); outline: none; cursor: pointer; transition: border-color 0.2s; }
        .filter-select:focus { border-color: var(--orange); }
        .filter-select option { background: var(--surface2); }

        table { width: 100%; border-collapse: collapse; }
        thead th { padding: 12px 16px; text-align: left; font-size: 0.68rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); }
        tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: var(--surface2); }
        tbody td { padding: 14px 16px; font-size: 0.875rem; color: var(--muted-light); vertical-align: middle; }
        tbody td.td-name { color: var(--white); font-weight: 600; }
        .table-empty { text-align: center; padding: 3rem; color: var(--muted); font-size: 0.9rem; }

        /* BADGES */
        .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; }
        .badge-green  { background: rgba(34,197,94,0.15);  color: #4ADE80; }
        .badge-red    { background: rgba(239,68,68,0.15);   color: #F87171; }
        .badge-orange { background: rgba(255,122,0,0.15);  color: #FF7A00; }
        .badge-blue   { background: rgba(59,130,246,0.15); color: #60A5FA; }
        .badge-gray   { background: rgba(255,255,255,0.08); color: var(--muted-light); }

        /* TOAST */
        #toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; display: flex; flex-direction: column; gap: 10px; }
        .toast-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 18px; font-size: 0.85rem; min-width: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); animation: toastIn 0.3s ease; display: flex; align-items: center; gap: 10px; }
        .toast-item.success { border-left: 3px solid #22C55E; }
        .toast-item.error   { border-left: 3px solid #EF4444; }
        @keyframes toastIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

        @media (max-width: 768px) {
            .sidebar { display: none; }
            .form-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

<div id="preloader">
    <div class="preloader-bar"><div class="preloader-fill"></div></div>
</div>

<div id="toast"></div>

<div class="app-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sidebar-brand">
            <div class="sidebar-brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <span class="sidebar-brand-name"><span>Sophie</span> Link</span>
        </div>
        <nav class="sidebar-nav">
            <span class="nav-section-label">Principal</span>
            <a href="dashboard.php" class="nav-link <?= $activeNav === 'dashboard' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Dashboard
            </a>
            <span class="nav-section-label">Gestão</span>
            <?php if (in_array($nivelUsuario, ['admin', 'coordenadora'])): ?>
            <a href="empresas.php" class="nav-link <?= $activeNav === 'empresas' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Empresas
            </a>
            <?php endif; ?>
            <a href="aprendizes.php" class="nav-link <?= $activeNav === 'aprendizes' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Aprendizes
            </a>
            <a href="#" class="nav-link <?= $activeNav === 'frequencia' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                Frequência
            </a>
            <a href="#" class="nav-link <?= $activeNav === 'notas' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                Notas
            </a>
            <span class="nav-section-label">Financeiro</span>
            <a href="#" class="nav-link <?= $activeNav === 'financeiro' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                Pagamentos
            </a>
            <a href="#" class="nav-link <?= $activeNav === 'relatorios' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                Relatórios
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="user-card">
                <div class="user-avatar"><?= strtoupper(substr($nomeUsuario, 0, 1)) ?></div>
                <div class="user-info">
                    <div class="user-name"><?= htmlspecialchars($nomeUsuario) ?></div>
                    <div class="user-role"><?= $nivelLabel[$nivelUsuario] ?? $nivelUsuario ?></div>
                </div>
                <a href="backend/api/auth/logout.php" class="logout-btn" title="Sair">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </a>
            </div>
        </div>
    </aside>

    <!-- MAIN -->
    <div class="main-content">
        <header class="topbar">
            <div>
                <div class="page-breadcrumb">Sophie Link / <?= htmlspecialchars($pageTitle) ?></div>
                <div class="page-title"><?= htmlspecialchars($pageTitle) ?></div>
            </div>
            <div class="topbar-actions">
                <div class="icon-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    <span class="badge-dot"></span>
                </div>
            </div>
        </header>
        <div class="content-scroll">
