<?php // Landing Page Institucional — Centro Técnico Profissionalizante Sophie Link ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centro Técnico Sophie Link — Parauapebas, PA</title>
    <meta name="description" content="Centro Técnico Profissionalizante Sophie Link — Educação técnica de excelência em Parauapebas, PA. Cursos de Eletromecânica, Logística, Segurança do Trabalho e mais.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & DESIGN TOKENS — TEMA CLEAN INSTITUCIONAL
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
    --radius:       12px;
    --radius-sm:    8px;
    --shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow:       0 4px 12px rgba(0,0,0,0.08);
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
    --nav-h:        68px;
}
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.6; }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 10px; }

/* ================================================================
   NAVBAR
   ================================================================ */
.nav {
    position: sticky; top: 0; z-index: 1000;
    height: var(--nav-h);
    background: var(--c-surface);
    border-bottom: 1px solid var(--c-border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
    box-shadow: var(--shadow-sm);
}
.nav-brand { display: flex; align-items: center; gap: 10px; }
.nav-brand-mark {
    width: 38px; height: 38px; border-radius: var(--radius-sm);
    background: var(--c-primary);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--f-display); font-weight: 800; font-size: 0.95rem; color: #fff;
}
.nav-brand-name { font-family: var(--f-display); font-size: 1.25rem; font-weight: 700; color: var(--c-text); }
.nav-brand-name span { color: var(--c-primary); }

.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-link-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: var(--radius-sm);
    font-size: 0.82rem; font-weight: 600; color: var(--c-text-muted);
    border: 1px solid transparent;
    transition: all 0.15s;
}
.nav-link-btn:hover { color: var(--c-primary); background: var(--c-primary-lt); border-color: rgba(255,107,0,0.2); }
.nav-link-btn i { width: 15px; height: 15px; }
.nav-cta {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 18px; border-radius: var(--radius-sm);
    font-size: 0.82rem; font-weight: 700;
    background: var(--c-primary); color: #fff;
    transition: background 0.15s, transform 0.15s;
}
.nav-cta:hover { background: var(--c-primary-d); transform: translateY(-1px); }
.nav-cta i { width: 15px; height: 15px; }

.menu-btn {
    display: flex; align-items: center; gap: 8px;
    background: none; border: 1px solid var(--c-border);
    border-radius: var(--radius-sm); padding: 8px 14px;
    font-family: var(--f-body); font-size: 0.8rem; font-weight: 600;
    color: var(--c-text-muted); cursor: pointer;
    transition: all 0.15s;
}
.menu-btn:hover { border-color: var(--c-primary); color: var(--c-primary); }
.menu-btn i { width: 17px; height: 17px; }

/* ================================================================
   SIDE MENU
   ================================================================ */
.side-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.35);
    backdrop-filter: blur(3px);
    z-index: 9000;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s;
}
.side-overlay.active { opacity: 1; pointer-events: all; }

.side-menu {
    position: fixed; top: 0; right: -380px; bottom: 0;
    width: 340px; z-index: 9001;
    background: var(--c-surface);
    border-left: 1px solid var(--c-border);
    display: flex; flex-direction: column;
    transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
    overflow-y: auto;
    box-shadow: var(--shadow);
}
.side-menu.active { right: 0; }

.sm-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 20px;
    border-bottom: 1px solid var(--c-border-lt);
}
.sm-head-brand { display: flex; align-items: center; gap: 10px; }
.sm-head-mark { width: 32px; height: 32px; border-radius: 7px; background: var(--c-primary); display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-weight: 800; font-size: 0.8rem; color: #fff; }
.sm-head-name { font-family: var(--f-display); font-size: 1rem; font-weight: 700; color: var(--c-text); }
.sm-head-name span { color: var(--c-primary); }
.sm-close { background: none; border: 1px solid var(--c-border); border-radius: 7px; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-text-muted); transition: all 0.15s; }
.sm-close:hover { border-color: var(--c-primary); color: var(--c-primary); }
.sm-close i { width: 16px; height: 16px; }

.sm-section { padding: 14px 20px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); }
.sm-link {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 20px; font-size: 0.85rem; font-weight: 500;
    color: var(--c-text-2); transition: all 0.15s;
}
.sm-link:hover { color: var(--c-primary); background: var(--c-primary-lt); }
.sm-link i { width: 16px; height: 16px; color: var(--c-text-light); flex-shrink: 0; }
.sm-link:hover i { color: var(--c-primary); }

.sm-acc-btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 10px 20px;
    font-family: var(--f-body); font-size: 0.85rem; font-weight: 600;
    color: var(--c-text-2); background: none; border: none; cursor: pointer;
    transition: all 0.15s;
}
.sm-acc-btn:hover { color: var(--c-primary); background: var(--c-primary-lt); }
.sm-acc-btn i { width: 16px; height: 16px; transition: transform 0.2s; }
.sm-acc-btn.open i { transform: rotate(180deg); }

.sm-acc-body { display: none; background: var(--c-bg); border-top: 1px solid var(--c-border-lt); border-bottom: 1px solid var(--c-border-lt); }
.sm-acc-body.open { display: block; }
.sm-sub-link { display: flex; align-items: center; gap: 8px; padding: 9px 20px 9px 34px; font-size: 0.8rem; color: var(--c-text-muted); transition: all 0.15s; }
.sm-sub-link::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--c-border); flex-shrink: 0; }
.sm-sub-link:hover { color: var(--c-primary); }
.sm-sub-link:hover::before { background: var(--c-primary); }

.sm-footer { margin-top: auto; padding: 16px 20px; border-top: 1px solid var(--c-border-lt); }
.sm-footer-addr { font-size: 0.72rem; color: var(--c-text-light); display: flex; align-items: flex-start; gap: 7px; }
.sm-footer-addr i { width: 14px; height: 14px; flex-shrink: 0; margin-top: 2px; color: var(--c-primary); }

/* ================================================================
   HERO
   ================================================================ */
.hero {
    background: var(--c-surface);
    border-bottom: 1px solid var(--c-border);
    padding: 6rem 3rem 5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 70%);
    pointer-events: none;
}
.hero-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px;
    color: var(--c-primary);
    background: var(--c-primary-lt);
    border: 1px solid rgba(255,107,0,0.2);
    padding: 5px 14px; border-radius: 20px;
    margin-bottom: 1.5rem;
}
.hero-tag::before { content: ''; width: 6px; height: 6px; background: var(--c-primary); border-radius: 50%; }
.hero h1 {
    font-family: var(--f-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800; line-height: 1.1;
    color: var(--c-text);
    margin-bottom: 1.25rem;
    max-width: 700px; margin-left: auto; margin-right: auto;
}
.hero h1 span { color: var(--c-primary); }
.hero p {
    font-size: 1.05rem; color: var(--c-text-muted);
    max-width: 560px; margin: 0 auto 2.5rem;
    line-height: 1.75;
}
.hero-actions { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--c-primary); color: #fff;
    padding: 12px 28px; border-radius: var(--radius-sm);
    font-size: 0.9rem; font-weight: 700;
    transition: background 0.15s, transform 0.15s;
    box-shadow: 0 4px 14px rgba(255,107,0,0.25);
}
.btn-primary:hover { background: var(--c-primary-d); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,107,0,0.3); }
.btn-primary i { width: 17px; height: 17px; }
.btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--c-text-2);
    padding: 12px 24px; border-radius: var(--radius-sm);
    font-size: 0.9rem; font-weight: 600;
    border: 1px solid var(--c-border);
    transition: all 0.15s;
}
.btn-secondary:hover { border-color: var(--c-primary); color: var(--c-primary); background: var(--c-primary-lt); }
.btn-secondary i { width: 17px; height: 17px; }

/* hero stats row */
.hero-stats {
    display: flex; justify-content: center; gap: 3rem;
    margin-top: 4rem; padding-top: 3rem;
    border-top: 1px solid var(--c-border);
    flex-wrap: wrap;
}
.hero-stat-val { font-family: var(--f-display); font-size: 2rem; font-weight: 800; color: var(--c-primary); }
.hero-stat-lbl { font-size: 0.78rem; color: var(--c-text-muted); margin-top: 2px; }

/* ================================================================
   SEÇÕES GENÉRICAS
   ================================================================ */
.section { padding: 5rem 3rem; }
.section-alt { background: var(--c-surface); border-top: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border); }
.container { max-width: 1080px; margin: 0 auto; }
.sec-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1px;
    color: var(--c-primary);
    background: var(--c-primary-lt);
    border: 1px solid rgba(255,107,0,0.2);
    padding: 4px 12px; border-radius: 20px;
    margin-bottom: 1rem;
}
.sec-title { font-family: var(--f-display); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; color: var(--c-text); margin-bottom: 0.75rem; }
.sec-sub { font-size: 0.95rem; color: var(--c-text-muted); max-width: 520px; line-height: 1.7; }

/* ================================================================
   SEÇÃO INSTITUCIONAL
   ================================================================ */
.inst-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-top: 3rem; }
.inst-text p { font-size: 0.92rem; color: var(--c-text-muted); line-height: 1.8; margin-bottom: 1.25rem; }
.inst-text strong { color: var(--c-text-2); }
.inst-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.inst-card {
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s;
}
.inst-card:hover { border-color: var(--c-primary); transform: translateY(-3px); }
.inst-card i { width: 36px; height: 36px; color: var(--c-primary); margin-bottom: 0.75rem; }
.inst-card h4 { font-size: 0.9rem; font-weight: 700; color: var(--c-text); margin-bottom: 0.4rem; }
.inst-card p { font-size: 0.78rem; color: var(--c-text-muted); line-height: 1.5; }

/* ================================================================
   CURSOS
   ================================================================ */
.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 2.5rem; }
.course-card {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    padding: 1.5rem;
    display: flex; align-items: flex-start; gap: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
}
.course-card:hover { border-color: var(--c-primary); box-shadow: var(--shadow); }
.course-icon {
    width: 44px; height: 44px; flex-shrink: 0;
    background: var(--c-primary-lt);
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    color: var(--c-primary);
}
.course-icon i { width: 22px; height: 22px; }
.course-name { font-size: 0.9rem; font-weight: 700; color: var(--c-text); margin-bottom: 4px; }
.course-desc { font-size: 0.75rem; color: var(--c-text-muted); line-height: 1.5; }

/* ================================================================
   PORTAIS DE ACESSO
   ================================================================ */
.portals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 2.5rem; }
.portal-card {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    padding: 2rem;
    display: flex; flex-direction: column;
    box-shadow: var(--shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.portal-card:hover { border-color: var(--c-primary); box-shadow: var(--shadow); transform: translateY(-4px); }
.pc-icon {
    width: 52px; height: 52px;
    background: var(--c-primary-lt);
    border-radius: var(--radius);
    display: flex; align-items: center; justify-content: center;
    color: var(--c-primary); margin-bottom: 1.25rem;
}
.pc-icon i { width: 26px; height: 26px; }
.pc-title { font-family: var(--f-display); font-size: 1.05rem; font-weight: 700; color: var(--c-text); margin-bottom: 0.5rem; }
.pc-desc { font-size: 0.82rem; color: var(--c-text-muted); line-height: 1.65; flex: 1; margin-bottom: 1.5rem; }
.pc-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.82rem; font-weight: 700; color: var(--c-primary);
    transition: gap 0.15s;
}
.pc-btn i { width: 15px; height: 15px; }
.portal-card:hover .pc-btn { gap: 10px; }

/* ================================================================
   PARCEIROS
   ================================================================ */
.partners-row {
    display: flex; align-items: center; justify-content: center;
    gap: 2.5rem; flex-wrap: wrap; margin-top: 2rem;
}
.partner-badge {
    display: flex; align-items: center; gap: 10px;
    background: var(--c-surface); border: 1px solid var(--c-border);
    border-radius: var(--radius); padding: 14px 20px;
    box-shadow: var(--shadow-sm);
    font-size: 0.85rem; font-weight: 700; color: var(--c-text-2);
    transition: border-color 0.15s;
}
.partner-badge:hover { border-color: var(--c-primary); }
.partner-badge i { width: 20px; height: 20px; color: var(--c-primary); }

/* ================================================================
   FOOTER
   ================================================================ */
.footer {
    background: var(--c-text);
    color: rgba(255,255,255,0.8);
    padding: 4rem 3rem 2rem;
}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; max-width: 1080px; margin: 0 auto 3rem; }
.footer-brand { font-family: var(--f-display); font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: 1rem; }
.footer-brand span { color: var(--c-primary); }
.footer-desc { font-size: 0.8rem; line-height: 1.7; color: rgba(255,255,255,0.5); margin-bottom: 1rem; }
.footer-addr { font-size: 0.75rem; color: rgba(255,255,255,0.4); display: flex; align-items: flex-start; gap: 7px; }
.footer-addr i { width: 14px; height: 14px; flex-shrink: 0; color: var(--c-primary); margin-top: 2px; }
.footer-col h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4); margin-bottom: 1rem; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-col ul li a { font-size: 0.82rem; color: rgba(255,255,255,0.6); transition: color 0.15s; }
.footer-col ul li a:hover { color: var(--c-primary); }
.footer-bottom { max-width: 1080px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem; color: rgba(255,255,255,0.35); text-align: center; }

/* ================================================================
   RESPONSIVE
   ================================================================ */
@media (max-width: 900px) {
    .inst-grid { grid-template-columns: 1fr; }
    .portals-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
    .nav { padding: 0 1.25rem; }
    .hero { padding: 4rem 1.5rem 3rem; }
    .section { padding: 3.5rem 1.5rem; }
    .hero-stats { gap: 1.5rem; }
    .footer-grid { grid-template-columns: 1fr; }
    .courses-grid { grid-template-columns: 1fr; }
    .inst-cards { grid-template-columns: 1fr; }
    .nav-link-btn { display: none; }
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
    <a href="index.php" class="brand">
        <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 38px; object-fit: contain;">
    </a>
    <div class="nav-actions">
        <a href="#institucional" class="nav-link-btn"><i data-lucide="info"></i> Institucional</a>
        <a href="#cursos" class="nav-link-btn"><i data-lucide="book-open"></i> Cursos</a>
        <a href="#portais" class="nav-link-btn"><i data-lucide="layout-grid"></i> Portais</a>
        <a href="#contato" class="nav-link-btn"><i data-lucide="map-pin"></i> Contato</a>
        <a href="portal_aluno.php" class="nav-cta"><i data-lucide="user"></i> Área do Aluno</a>
        <button class="menu-btn" id="menuOpen"><i data-lucide="menu"></i> Menu</button>
    </div>
</nav>

<!-- SIDE MENU OVERLAY -->
<div class="side-overlay" id="sideOverlay"></div>
<div class="side-menu" id="sideMenu">
    <div class="sm-head">
        <div class="sm-head-brand">
            <div class="sm-head-mark">SL</div>
            <div class="sm-head-name"><span>Sophie</span> Link</div>
        </div>
        <button class="sm-close" id="smClose"><i data-lucide="x"></i></button>
    </div>

    <div class="sm-section">Navegação</div>
    <a href="#institucional" class="sm-link" onclick="toggleMenu()"><i data-lucide="info"></i> Institucional</a>
    <a href="#cursos" class="sm-link" onclick="toggleMenu()"><i data-lucide="book-open"></i> Nossos Cursos</a>
    <a href="#portais" class="sm-link" onclick="toggleMenu()"><i data-lucide="layout-grid"></i> Portais de Acesso</a>
    <a href="#contato" class="sm-link" onclick="toggleMenu()"><i data-lucide="map-pin"></i> Contato</a>

    <div class="sm-section">Portais</div>

    <!-- Accordion: Sou Aluno -->
    <button class="sm-acc-btn" onclick="toggleAcc(this)">
        <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="graduation-cap" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Aluno</span>
        <i data-lucide="chevron-down"></i>
    </button>
    <div class="sm-acc-body">
        <a href="portal_aluno.php" class="sm-sub-link">Portal do Aluno</a>
        <a href="ava.php" class="sm-sub-link">Ambiente Virtual (AVA)</a>
        <a href="portal_aluno.php" class="sm-sub-link">Notas & Frequência</a>
        <a href="portal_aluno.php" class="sm-sub-link">Histórico Escolar</a>
        <a href="portal_aluno.php" class="sm-sub-link">Financeiro / Boletos</a>
    </div>

    <!-- Accordion: Sou Professor -->
    <button class="sm-acc-btn" onclick="toggleAcc(this)">
        <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="user-check" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Professor</span>
        <i data-lucide="chevron-down"></i>
    </button>
    <div class="sm-acc-body">
        <a href="login.php" class="sm-sub-link">Portal do Professor</a>
        <a href="ava.php" class="sm-sub-link">Câmpus Virtual (AVA)</a>
        <a href="login.php" class="sm-sub-link">Lançamento de Notas</a>
        <a href="login.php" class="sm-sub-link">Gestão de Frequência</a>
    </div>

    <!-- Accordion: Sou Colaborador -->
    <button class="sm-acc-btn" onclick="toggleAcc(this)">
        <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="briefcase" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Colaborador</span>
        <i data-lucide="chevron-down"></i>
    </button>
    <div class="sm-acc-body">
        <a href="login.php" class="sm-sub-link">Área Administrativa</a>
        <a href="login.php" class="sm-sub-link">RH On-line</a>
        <a href="login.php" class="sm-sub-link">Ordens de Serviço - TI</a>
        <a href="login.php" class="sm-sub-link">Ordens de Serviço - Compras</a>
    </div>

    <!-- Accordion: Nossos Cursos -->
    <button class="sm-acc-btn" onclick="toggleAcc(this)">
        <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="book-open" style="width:16px;height:16px;color:var(--c-text-light);"></i> Nossos Cursos</span>
        <i data-lucide="chevron-down"></i>
    </button>
    <div class="sm-acc-body">
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Ensino Médio Integrado</a>
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Eletromecânica</a>
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Seg. do Trabalho</a>
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Administração</a>
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Eletrônica</a>
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Gestão da Qualidade</a>
        <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Logística</a>
    </div>

    <div class="sm-footer">
        <div class="sm-footer-addr">
            <i data-lucide="map-pin"></i>
            Avenida Amazonas, 64 – Bairro Rio Verde, Parauapebas – PA.
        </div>
    </div>
</div>

<!-- ================================================================
     HERO
     ================================================================ -->
<section class="hero">
    <div class="hero-tag">Centro Técnico Profissionalizante · Parauapebas, PA</div>
    <h1>Formando Profissionais para o <span>Mercado Industrial</span></h1>
    <p>A Sophie Link prepara jovens para os setores de mineração, indústria e serviços — com cursos técnicos reconhecidos e parcerias com a Vale e Sotreq.</p>
    <div class="hero-actions">
        <a href="#portais" class="btn-primary"><i data-lucide="layout-grid"></i> Acessar Portais</a>
        <a href="#cursos" class="btn-secondary"><i data-lucide="book-open"></i> Ver Cursos</a>
    </div>
    <div class="hero-stats">
        <div>
            <div class="hero-stat-val">+500</div>
            <div class="hero-stat-lbl">Alunos formados</div>
        </div>
        <div>
            <div class="hero-stat-val">6</div>
            <div class="hero-stat-lbl">Cursos técnicos</div>
        </div>
        <div>
            <div class="hero-stat-val">100%</div>
            <div class="hero-stat-lbl">Bolsas Vale/Sotreq</div>
        </div>
        <div>
            <div class="hero-stat-val">Parauapebas</div>
            <div class="hero-stat-lbl">Nossa cidade, PA</div>
        </div>
    </div>
</section>

<!-- ================================================================
     INSTITUCIONAL
     ================================================================ -->
<section class="section section-alt" id="institucional">
    <div class="container">
        <div class="sec-tag">Quem somos</div>
        <div class="sec-title">Muito mais que ensino,<br>um Compromisso Social</div>
        <div class="inst-grid">
            <div class="inst-text">
                <p>Guiada pelos princípios da <strong>Comunidade Kolping</strong> — uma organização internacional de cunho social — a Sophie Link tem como objetivo formar profissionais éticos, críticos e tecnicamente capacitados para impulsionar o desenvolvimento socioeconômico de Parauapebas e região.</p>
                <p>Temos parcerias sólidas com empresas como <strong>Vale (Programa Partilhar)</strong> e <strong>Sotreq (Instituto Social Sotreq)</strong>, que financiam bolsas de estudo integrais para jovens de baixa renda, tornando a formação técnica de qualidade acessível a todos.</p>
            </div>
            <div class="inst-cards">
                <div class="inst-card">
                    <i data-lucide="hard-hat"></i>
                    <h4>Cursos Técnicos</h4>
                    <p>Eletromecânica, Logística, Segurança do Trabalho e mais.</p>
                </div>
                <div class="inst-card">
                    <i data-lucide="building-2"></i>
                    <h4>Infraestrutura</h4>
                    <p>Laboratórios modernos, biblioteca, auditório e áreas verdes.</p>
                </div>
                <div class="inst-card">
                    <i data-lucide="handshake"></i>
                    <h4>Parcerias</h4>
                    <p>Vale, Sotreq e outras empresas que investem no seu futuro.</p>
                </div>
                <div class="inst-card">
                    <i data-lucide="award"></i>
                    <h4>Reconhecimento</h4>
                    <p>Formação certificada e reconhecida pelo mercado regional.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ================================================================
     CURSOS
     ================================================================ -->
<section class="section" id="cursos">
    <div class="container">
        <div class="sec-tag">Formação técnica</div>
        <div class="sec-title">Nossos Cursos</div>
        <div class="sec-sub">Habilitações voltadas ao mercado de mineração, indústria e serviços de Parauapebas e região.</div>
        <div class="courses-grid">
            <div class="course-card">
                <div class="course-icon"><i data-lucide="cpu"></i></div>
                <div>
                    <div class="course-name">Técnico em Eletromecânica</div>
                    <div class="course-desc">O mais procurado. Formação voltada às demandas das mineradoras, com foco em manutenção industrial.</div>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="hard-hat"></i></div>
                <div>
                    <div class="course-name">Técnico em Segurança do Trabalho</div>
                    <div class="course-desc">Prevenção de acidentes, EPIs, laudos e normas de saúde ocupacional.</div>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="bar-chart-2"></i></div>
                <div>
                    <div class="course-name">Técnico em Administração</div>
                    <div class="course-desc">Gestão, finanças, recursos humanos e processos organizacionais.</div>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="zap"></i></div>
                <div>
                    <div class="course-name">Técnico em Eletrônica</div>
                    <div class="course-desc">Circuitos, automação e sistemas eletrônicos aplicados à indústria.</div>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="shield-check"></i></div>
                <div>
                    <div class="course-name">Técnico em Gestão da Qualidade</div>
                    <div class="course-desc">Normas ISO, controle de processos, auditorias e melhoria contínua.</div>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="package"></i></div>
                <div>
                    <div class="course-name">Técnico em Logística</div>
                    <div class="course-desc">Cadeia de suprimentos, armazenagem, transporte e gestão de estoque.</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ================================================================
     PORTAIS DE ACESSO
     ================================================================ -->
<section class="section section-alt" id="portais">
    <div class="container">
        <div class="sec-tag">Sistemas acadêmicos</div>
        <div class="sec-title">Portais de Acesso</div>
        <div class="sec-sub">Selecione o ambiente adequado ao seu perfil para acessar os serviços da Sophie Link.</div>
        <div class="portals-grid">
            <a href="portal_aluno.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="graduation-cap"></i></div>
                <div class="pc-title">Portal do Aluno</div>
                <p class="pc-desc">Acompanhe notas, frequência, histórico escolar, boletos e documentos da secretaria.</p>
                <span class="pc-btn">Acessar Portal <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="ava.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="monitor-play"></i></div>
                <div class="pc-title">Ambiente Virtual (AVA)</div>
                <p class="pc-desc">Sala de aula digital com módulos, videoaulas, atividades e acompanhamento de progresso.</p>
                <span class="pc-btn">Acessar AVA <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="login.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="shield"></i></div>
                <div class="pc-title">Área Administrativa</div>
                <p class="pc-desc">Acesso restrito para professores, coordenadores e gestores de empresas parceiras.</p>
                <span class="pc-btn">Fazer Login <i data-lucide="arrow-right"></i></span>
            </a>
        </div>
    </div>
</section>

<!-- ================================================================
     PARCEIROS
     ================================================================ -->
<section class="section">
    <div class="container" style="text-align: center;">
        <div class="sec-tag">Empresas parceiras</div>
        <div class="sec-title">Quem investe no seu futuro</div>
        <div class="sec-sub" style="margin: 0 auto;">Empresas que financiam bolsas integrais para alunos da Sophie Link em Parauapebas.</div>
        <div class="partners-row">
            <div class="partner-badge"><i data-lucide="building-2"></i> Vale S.A. — Programa Partilhar</div>
            <div class="partner-badge"><i data-lucide="settings"></i> Sotreq — Instituto Social</div>
            <div class="partner-badge"><i data-lucide="heart"></i> Comunidade Kolping</div>
        </div>
    </div>
</section>

<!-- ================================================================
     FOOTER / CONTATO
     ================================================================ -->
<footer class="footer" id="contato">
    <div class="footer-grid">
        <div>
            <div class="footer-brand"><span>Sophie</span> Link</div>
            <p class="footer-desc">Centro Técnico Profissionalizante comprometido com a formação de jovens para o mercado industrial e de mineração da Região dos Carajás.</p>
            <div class="footer-addr">
                <i data-lucide="map-pin"></i>
                Avenida Amazonas, 64 – Bairro Rio Verde, Parauapebas – PA
            </div>
        </div>
        <div class="footer-col">
            <h4>Sistemas</h4>
            <ul>
                <li><a href="portal_aluno.php">Portal do Aluno</a></li>
                <li><a href="ava.php">Ambiente Virtual (AVA)</a></li>
                <li><a href="login.php">Área Administrativa</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Institucional</h4>
            <ul>
                <li><a href="#institucional">Sobre a Escola</a></li>
                <li><a href="#cursos">Nossos Cursos</a></li>
                <li><a href="#portais">Empresas Parceiras</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Atendimento</h4>
            <ul>
                <li><a href="#">Fale Conosco</a></li>
                <li><a href="#">Ouvidoria</a></li>
                <li><a href="#">Trabalhe Conosco</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        &copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA · Todos os direitos reservados.
    </div>
</footer>

<script>
lucide.createIcons();

// Side menu
const sideMenu = document.getElementById('sideMenu');
const sideOverlay = document.getElementById('sideOverlay');
function toggleMenu() {
    sideMenu.classList.toggle('active');
    sideOverlay.classList.toggle('active');
}
document.getElementById('menuOpen').addEventListener('click', toggleMenu);
document.getElementById('smClose').addEventListener('click', toggleMenu);
sideOverlay.addEventListener('click', toggleMenu);

// Accordion
function toggleAcc(btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    // fecha todos
    document.querySelectorAll('.sm-acc-body.open').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.sm-acc-btn.open').forEach(b => b.classList.remove('open'));
    if (!isOpen) {
        body.classList.add('open');
        btn.classList.add('open');
    }
}
</script>
</body>
</html>