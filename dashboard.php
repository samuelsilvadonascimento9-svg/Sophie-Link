<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header("Location: index.php");
    exit;
}
$nomeUsuario = $_SESSION['usuario_nome'] ?? 'Usuário';
$nivelUsuario = $_SESSION['usuario_nivel'] ?? 'admin';
$nivelLabel = ['admin' => 'Administrador', 'coordenadora' => 'Coordenadora', 'professor' => 'Professor', 'empresa' => 'Empresa'];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard — Sophie Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --orange: #FF7A00;
            --orange-hover: #E06C00;
            --orange-glow: rgba(255,122,0,0.2);
            --orange-subtle: rgba(255,122,0,0.08);
            --black: #0A0A0A;
            --surface: #141414;
            --surface2: #1C1C1C;
            --surface3: #222222;
            --border: rgba(255,255,255,0.06);
            --border-hover: rgba(255,122,0,0.4);
            --white: #FFFFFF;
            --muted: #6B6B6B;
            --muted-light: #999999;
            --sidebar-w: 260px;
        }

        html, body {
            height: 100%;
            font-family: 'Inter', sans-serif;
            background: var(--black);
            color: var(--white);
            -webkit-font-smoothing: antialiased;
        }

        /* ===================== */
        /* SCROLLBAR CUSTOMIZADO */
        /* ===================== */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--orange); }

        /* ===================== */
        /* PRELOADER             */
        /* ===================== */
        #preloader {
            position: fixed; inset: 0; background: var(--black); z-index: 99999;
            display: flex; align-items: center; justify-content: center;
            transition: opacity 0.5s, visibility 0.5s;
        }
        #preloader.hide { opacity: 0; visibility: hidden; pointer-events: none; }
        .preloader-bar {
            width: 200px; height: 2px; background: var(--surface2); border-radius: 2px; overflow: hidden;
        }
        .preloader-fill {
            height: 100%; width: 0; background: var(--orange);
            animation: loadFill 1s ease forwards;
        }
        @keyframes loadFill { to { width: 100%; } }

        /* ===================== */
        /* LAYOUT GERAL          */
        /* ===================== */
        .app-layout {
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* ===================== */
        /* SIDEBAR               */
        /* ===================== */
        .sidebar {
            width: var(--sidebar-w);
            background: var(--surface);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            height: 100vh;
            overflow: hidden;
            position: relative;
            transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        /* Linha laranja no topo da sidebar */
        .sidebar::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--orange), transparent);
        }

        .sidebar-brand {
            height: 64px;
            display: flex;
            align-items: center;
            padding: 0 1.5rem;
            border-bottom: 1px solid var(--border);
            gap: 10px;
            flex-shrink: 0;
        }
        .sidebar-brand-icon {
            width: 32px; height: 32px;
            background: var(--orange);
            border-radius: 7px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sidebar-brand-name {
            font-family: 'Teko', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: 1px;
            color: var(--white);
            white-space: nowrap;
        }
        .sidebar-brand-name span { color: var(--orange); }

        /* Nav */
        .sidebar-nav {
            flex: 1;
            padding: 1.25rem 0.75rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .nav-section-label {
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--muted);
            padding: 0.75rem 0.75rem 0.5rem;
            margin-top: 0.5rem;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--muted-light);
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            white-space: nowrap;
        }
        .nav-link .nav-icon {
            width: 18px; height: 18px;
            flex-shrink: 0;
            transition: color 0.2s;
        }
        .nav-link:hover {
            background: var(--orange-subtle);
            color: var(--white);
        }
        .nav-link:hover .nav-icon { color: var(--orange); }
        .nav-link.active {
            background: var(--orange-subtle);
            color: var(--white);
            border: 1px solid rgba(255,122,0,0.2);
        }
        .nav-link.active .nav-icon { color: var(--orange); }
        .nav-link.active::before {
            content: '';
            position: absolute;
            left: 0; top: 20%; bottom: 20%;
            width: 3px;
            background: var(--orange);
            border-radius: 0 2px 2px 0;
        }
        .nav-badge {
            margin-left: auto;
            background: var(--orange);
            color: white;
            font-size: 0.65rem;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 20px;
        }

        /* User no rodapé da sidebar */
        .sidebar-footer {
            padding: 1rem 0.75rem;
            border-top: 1px solid var(--border);
            flex-shrink: 0;
        }
        .user-card {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            border-radius: 8px;
            background: var(--surface2);
            border: 1px solid var(--border);
        }
        .user-avatar {
            width: 34px; height: 34px;
            border-radius: 8px;
            background: var(--orange);
            display: flex; align-items: center; justify-content: center;
            font-family: 'Teko', sans-serif;
            font-size: 1.1rem;
            font-weight: 700;
            color: white;
            flex-shrink: 0;
        }
        .user-info { flex: 1; min-width: 0; }
        .user-name {
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--white);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .user-role {
            font-size: 0.7rem;
            color: var(--muted);
        }
        .logout-btn {
            background: none; border: none; cursor: pointer;
            color: var(--muted);
            padding: 4px;
            border-radius: 4px;
            display: flex;
            transition: color 0.2s;
        }
        .logout-btn:hover { color: #ef4444; }

        /* ===================== */
        /* ÁREA PRINCIPAL        */
        /* ===================== */
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            min-width: 0;
        }

        /* TOPBAR */
        .topbar {
            height: 64px;
            border-bottom: 1px solid var(--border);
            background: var(--surface);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            flex-shrink: 0;
        }
        .topbar-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .page-title {
            font-family: 'Teko', sans-serif;
            font-size: 1.6rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: var(--white);
        }
        .page-breadcrumb {
            font-size: 0.75rem;
            color: var(--muted);
        }

        .topbar-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .icon-btn {
            width: 36px; height: 36px;
            border: 1px solid var(--border);
            background: var(--surface2);
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            color: var(--muted-light);
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
        }
        .icon-btn:hover {
            border-color: var(--border-hover);
            color: var(--white);
        }
        .icon-btn .badge-dot {
            position: absolute;
            top: 6px; right: 6px;
            width: 7px; height: 7px;
            background: #ef4444;
            border-radius: 50%;
            border: 2px solid var(--surface);
        }

        /* CONTEÚDO ROLÁVEL */
        .content-scroll {
            flex: 1;
            overflow-y: auto;
            padding: 2rem;
        }

        /* HEADER DA PÁGINA */
        .content-header {
            margin-bottom: 2rem;
        }
        .content-header-greeting {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--orange);
            margin-bottom: 0.5rem;
        }
        .content-header-title {
            font-family: 'Teko', sans-serif;
            font-size: 2.8rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            line-height: 1;
            color: var(--white);
            margin-bottom: 0.5rem;
        }
        .content-header-subtitle {
            font-size: 0.875rem;
            color: var(--muted);
        }

        /* ===================== */
        /* CARDS DE ESTATÍSTICAS */
        /* ===================== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
            transition: border-color 0.3s, transform 0.3s;
            cursor: default;
        }
        .stat-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at top right, var(--card-glow, transparent), transparent 70%);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .stat-card:hover {
            border-color: var(--card-border, var(--border));
            transform: translateY(-3px);
        }
        .stat-card:hover::before { opacity: 1; }

        .stat-card-orange { --card-glow: rgba(255,122,0,0.12); --card-border: rgba(255,122,0,0.25); }
        .stat-card-blue   { --card-glow: rgba(59,130,246,0.12); --card-border: rgba(59,130,246,0.25); }
        .stat-card-green  { --card-glow: rgba(34,197,94,0.12);  --card-border: rgba(34,197,94,0.25);  }
        .stat-card-red    { --card-glow: rgba(239,68,68,0.12);  --card-border: rgba(239,68,68,0.25);  }

        .stat-card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 1.25rem;
        }
        .stat-card-icon {
            width: 40px; height: 40px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
        }
        .stat-card-icon.orange { background: rgba(255,122,0,0.15); color: var(--orange); }
        .stat-card-icon.blue   { background: rgba(59,130,246,0.15); color: #3B82F6; }
        .stat-card-icon.green  { background: rgba(34,197,94,0.15);  color: #22C55E; }
        .stat-card-icon.red    { background: rgba(239,68,68,0.15);   color: #EF4444; }

        .stat-badge {
            font-size: 0.7rem;
            font-weight: 600;
            padding: 3px 8px;
            border-radius: 20px;
        }
        .stat-badge.up   { background: rgba(34,197,94,0.15); color: #4ADE80; }
        .stat-badge.down { background: rgba(239,68,68,0.15); color: #F87171; }

        .stat-card-value {
            font-family: 'Teko', sans-serif;
            font-size: 2.8rem;
            font-weight: 700;
            color: var(--white);
            line-height: 1;
            letter-spacing: -1px;
            margin-bottom: 0.4rem;
        }
        .stat-card-label {
            font-size: 0.78rem;
            color: var(--muted);
            font-weight: 500;
        }

        /* ===================== */
        /* LINHA INFERIOR        */
        /* ===================== */
        .dashboard-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.25rem;
        }

        /* Card genérico */
        .panel-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
        }
        .panel-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid var(--border);
        }
        .panel-card-title {
            font-family: 'Teko', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: var(--white);
        }
        .panel-card-link {
            font-size: 0.75rem;
            color: var(--orange);
            text-decoration: none;
            font-weight: 600;
            transition: opacity 0.2s;
        }
        .panel-card-link:hover { opacity: 0.75; }

        /* Lista de alertas */
        .alerts-list {
            padding: 1rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .alert-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 10px;
            transition: border-color 0.2s;
        }
        .alert-item:hover { border-color: var(--border-hover); }
        .alert-item-icon {
            width: 36px; height: 36px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; margin-top: 2px;
        }
        .alert-item-icon.warning  { background: rgba(251,191,36,0.15); color: #FBB124; }
        .alert-item-icon.danger   { background: rgba(239,68,68,0.15);  color: #EF4444; }
        .alert-item-icon.info     { background: rgba(59,130,246,0.15); color: #3B82F6; }

        .alert-item-body { flex: 1; }
        .alert-item-title {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--white);
            margin-bottom: 3px;
        }
        .alert-item-desc {
            font-size: 0.78rem;
            color: var(--muted);
            line-height: 1.5;
        }
        .alert-item-action {
            background: var(--orange);
            border: none;
            color: white;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 6px;
            cursor: pointer;
            flex-shrink: 0;
            white-space: nowrap;
            transition: background 0.2s;
        }
        .alert-item-action:hover { background: var(--orange-hover); }

        /* Ações rápidas */
        .quick-actions-list {
            padding: 1rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .quick-action-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px;
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 9px;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s;
            group: true;
        }
        .quick-action-btn:hover {
            border-color: var(--border-hover);
            background: var(--orange-subtle);
        }
        .quick-action-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .quick-action-icon {
            width: 34px; height: 34px;
            background: var(--surface3);
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            color: var(--muted-light);
            transition: all 0.2s;
        }
        .quick-action-btn:hover .quick-action-icon {
            background: var(--orange-subtle);
            color: var(--orange);
        }
        .quick-action-label {
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--muted-light);
            transition: color 0.2s;
        }
        .quick-action-btn:hover .quick-action-label { color: var(--white); }
        .quick-action-chevron {
            color: var(--muted);
            transition: color 0.2s, transform 0.2s;
        }
        .quick-action-btn:hover .quick-action-chevron {
            color: var(--orange);
            transform: translateX(3px);
        }

        /* ===================== */
        /* RESPONSIVO            */
        /* ===================== */
        @media (max-width: 1280px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .sidebar { display: none; }
            .stats-grid { grid-template-columns: 1fr; }
            .dashboard-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <!-- Preloader -->
    <div id="preloader">
        <div class="preloader-bar"><div class="preloader-fill"></div></div>
    </div>

    <div class="app-layout">

        <!-- ===== SIDEBAR ===== -->
        <aside class="sidebar">

            <div class="sidebar-brand">
                <div class="sidebar-brand-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <span class="sidebar-brand-name"><span>Sophie</span> Link</span>
            </div>

            <nav class="sidebar-nav">
                <span class="nav-section-label">Principal</span>
                <a href="dashboard.php" class="nav-link active">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    Dashboard
                </a>

                <span class="nav-section-label">Gestão</span>
                <?php if (in_array($nivelUsuario, ['admin', 'coordenadora'])): ?>
                <a href="empresas.php" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Empresas
                </a>
                <?php endif; ?>
                <a href="aprendizes.php" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Aprendizes
                    <span class="nav-badge" style="margin-left:auto">312</span>
                </a>
                <a href="#" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    Frequência
                </a>
                <a href="#" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    Notas
                </a>

                <span class="nav-section-label">Financeiro</span>
                <?php if (in_array($nivelUsuario, ['admin', 'coordenadora', 'empresa'])): ?>
                <a href="#" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    Pagamentos
                </a>
                <?php endif; ?>
                <a href="#" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    Relatórios
                </a>

                <?php if ($nivelUsuario === 'admin'): ?>
                <span class="nav-section-label">Sistema</span>
                <a href="#" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                    Configurações
                </a>
                <?php endif; ?>
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

        <!-- ===== ÁREA PRINCIPAL ===== -->
        <div class="main-content">

            <!-- Topbar -->
            <header class="topbar">
                <div class="topbar-left">
                    <div>
                        <div class="page-breadcrumb">Sophie Link / Dashboard</div>
                        <div class="page-title">Visão Geral</div>
                    </div>
                </div>
                <div class="topbar-actions">
                    <div class="icon-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                    <div class="icon-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                        <span class="badge-dot"></span>
                    </div>
                </div>
            </header>

            <!-- Conteúdo -->
            <div class="content-scroll">

                <!-- Header da página -->
                <div class="content-header">
                    <div class="content-header-greeting">— Painel Administrativo</div>
                    <h1 class="content-header-title">Olá, <?= explode(' ', $nomeUsuario)[0] ?>.</h1>
                    <p class="content-header-subtitle">Aqui está o resumo completo do sistema Sophie Link.</p>
                </div>

                <!-- Cards de Estatísticas -->
                <div class="stats-grid">
                    <div class="stat-card stat-card-orange">
                        <div class="stat-card-top">
                            <div class="stat-card-icon orange">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <span class="stat-badge up">+12 mês</span>
                        </div>
                        <div class="stat-card-value">312</div>
                        <div class="stat-card-label">Aprendizes Ativos</div>
                    </div>

                    <div class="stat-card stat-card-blue">
                        <div class="stat-card-top">
                            <div class="stat-card-icon blue">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </div>
                            <span class="stat-badge up">+2 mês</span>
                        </div>
                        <div class="stat-card-value">49</div>
                        <div class="stat-card-label">Empresas Parceiras</div>
                    </div>

                    <div class="stat-card stat-card-green">
                        <div class="stat-card-top">
                            <div class="stat-card-icon green">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                            </div>
                            <span class="stat-badge up">Semana</span>
                        </div>
                        <div class="stat-card-value">94%</div>
                        <div class="stat-card-label">Frequência Geral</div>
                    </div>

                    <div class="stat-card stat-card-red">
                        <div class="stat-card-top">
                            <div class="stat-card-icon red">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            </div>
                            <span class="stat-badge down">5 emp.</span>
                        </div>
                        <div class="stat-card-value">R$ 1,25k</div>
                        <div class="stat-card-label">Pendências Financeiras</div>
                    </div>
                </div>

                <!-- Grid inferior -->
                <div class="dashboard-grid">

                    <!-- Avisos e Pendências -->
                    <div class="panel-card">
                        <div class="panel-card-header">
                            <span class="panel-card-title">Avisos e Pendências</span>
                            <a href="#" class="panel-card-link">Ver todos →</a>
                        </div>
                        <div class="alerts-list">

                            <div class="alert-item">
                                <div class="alert-item-icon warning">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                                </div>
                                <div class="alert-item-body">
                                    <div class="alert-item-title">Contratos próximos do vencimento</div>
                                    <div class="alert-item-desc">12 aprendizes terão seus contratos encerrados nos próximos 30 dias.</div>
                                </div>
                                <button class="alert-item-action">Revisar</button>
                            </div>

                            <div class="alert-item">
                                <div class="alert-item-icon danger">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                                </div>
                                <div class="alert-item-body">
                                    <div class="alert-item-title">Pagamento em atraso detectado</div>
                                    <div class="alert-item-desc">Tech Solutions LTDA está com faturamento pendente há 5 dias.</div>
                                </div>
                                <button class="alert-item-action">Notificar</button>
                            </div>

                            <div class="alert-item">
                                <div class="alert-item-icon info">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                                </div>
                                <div class="alert-item-body">
                                    <div class="alert-item-title">Frequência baixa detectada</div>
                                    <div class="alert-item-desc">3 aprendizes estão com menos de 75% de presença no mês.</div>
                                </div>
                                <button class="alert-item-action">Ver lista</button>
                            </div>

                        </div>
                    </div>

                    <!-- Ações Rápidas -->
                    <div class="panel-card">
                        <div class="panel-card-header">
                            <span class="panel-card-title">Ações Rápidas</span>
                        </div>
                        <div class="quick-actions-list">

                            <div class="quick-action-btn">
                                <div class="quick-action-left">
                                    <div class="quick-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                                    </div>
                                    <span class="quick-action-label">Novo Aprendiz</span>
                                </div>
                                <svg class="quick-action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </div>

                            <div class="quick-action-btn">
                                <div class="quick-action-left">
                                    <div class="quick-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                    </div>
                                    <span class="quick-action-label">Nova Empresa</span>
                                </div>
                                <svg class="quick-action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </div>

                            <div class="quick-action-btn">
                                <div class="quick-action-left">
                                    <div class="quick-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                                    </div>
                                    <span class="quick-action-label">Registrar Frequência</span>
                                </div>
                                <svg class="quick-action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </div>

                            <div class="quick-action-btn">
                                <div class="quick-action-left">
                                    <div class="quick-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                    </div>
                                    <span class="quick-action-label">Gerar Relatório</span>
                                </div>
                                <svg class="quick-action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </div>

                            <div class="quick-action-btn">
                                <div class="quick-action-left">
                                    <div class="quick-action-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                                    </div>
                                    <span class="quick-action-label">Lançar Pagamento</span>
                                </div>
                                <svg class="quick-action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </div>

                        </div>
                    </div>

                </div>

            </div><!-- /content-scroll -->
        </div><!-- /main-content -->
    </div><!-- /app-layout -->

    <script>
        // Inicializa ícones Lucide se necessário
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Remove preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hide');
            }, 1000);
        });
    </script>
</body>
</html>
