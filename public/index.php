<?php // Landing Page Institucional — Centro Técnico Profissionalizante Sophie Link 
session_start();
require_once '../includes/db.php';
$msg_contato = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'contato') {
    try {
        $stmt = $pdo->prepare("INSERT INTO mensagens_contato (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)");
        $stmt->execute([$_POST['nome'], $_POST['email'], $_POST['telefone'], $_POST['mensagem']]);
        $msg_contato = "Sua mensagem foi enviada com sucesso! Nossa secretaria entrará em contato em breve.";
    } catch (Exception $e) {
        $msg_contato = "Erro ao enviar mensagem: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centro Técnico Sophie Link — Parauapebas, PA</title>
    <meta name="description" content="Centro Técnico Profissionalizante Sophie Link — Educação técnica de excelência em Parauapebas, PA. Cursos de Eletromecânica, Logística, Segurança do Trabalho e mais.">
    <!-- OpenGraph SEO -->
    <meta property="og:title" content="Centro Técnico Sophie Link">
    <meta property="og:description" content="A melhor escola técnica de Parauapebas com laboratórios modernos e foco na indústria de mineração.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://i.imgur.com/your-og-image.jpg">
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & DESIGN TOKENS — TEMA INDUSTRIAL/BRUTALISTA
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF5C00;
    --c-primary-d:  #D94A00;
    --c-bg:         #FFFFFF;
    --c-surface:    #FFFFFF;
    --c-border:     #000000;
    --c-text:       #000000;
    --c-text-2:     #111111;
    --c-text-muted: #333333;
    --c-text-light: #666666;
    --c-dark:       #111111;
    --c-dark-text:  #FFFFFF;
    --radius:       0px;
    --radius-sm:    0px;
    --shadow-sm:    4px 4px 0px #000;
    --shadow:       6px 6px 0px #000;
    --shadow-orange: 6px 6px 0px var(--c-primary);
    --font-sans:    'Inter', sans-serif;
    --font-display: 'Syne', sans-serif;
    --nav-h:        76px;
}
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--font-sans); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.6; }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-thumb { background: var(--c-primary); }

/* ================================================================
   NAVBAR
   ================================================================ */
.nav {
    position: sticky; top: 0; z-index: 1000;
    height: var(--nav-h);
    background: var(--c-bg);
    border-bottom: 3px solid var(--c-border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
}
.nav-brand { display: flex; align-items: center; gap: 10px; }
.nav-brand img { height: 42px; object-fit: contain; }

.nav-actions { display: flex; align-items: center; gap: 12px; }
.nav-link-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    font-size: 0.85rem; font-weight: 800; color: var(--c-text); text-transform: uppercase;
    transition: all 0.15s;
}
.nav-link-btn:hover { color: var(--c-primary); }
.nav-link-btn i { width: 16px; height: 16px; color: var(--c-primary); }
.nav-cta {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 22px;
    font-size: 0.85rem; font-weight: 800; text-transform: uppercase;
    background: var(--c-primary); color: #fff;
    border: 2px solid var(--c-border);
    box-shadow: var(--shadow-sm);
    transition: transform 0.15s, box-shadow 0.15s;
}
.nav-cta:hover { transform: translate(-2px, -2px); box-shadow: var(--shadow); }
.nav-cta i { width: 16px; height: 16px; }

.menu-btn {
    display: flex; align-items: center; gap: 8px;
    background: #fff; border: 2px solid var(--c-border);
    padding: 10px 18px;
    font-family: var(--font-sans); font-size: 0.85rem; font-weight: 800; text-transform: uppercase;
    color: var(--c-text); cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: all 0.15s;
}
.menu-btn:hover { background: var(--c-primary); color: #fff; }
.menu-btn i { width: 18px; height: 18px; }

/* ================================================================
   SIDE MENU
   ================================================================ */
.side-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    z-index: 9000; opacity: 0; pointer-events: none; transition: opacity 0.3s;
}
.side-overlay.active { opacity: 1; pointer-events: all; }

.side-menu {
    position: fixed; top: 0; right: -380px; bottom: 0;
    width: 340px; z-index: 9001;
    background: #fff;
    border-left: 3px solid var(--c-border);
    display: flex; flex-direction: column;
    transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
    overflow-y: auto;
}
.side-menu.active { right: 0; }

.sm-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px; border-bottom: 3px solid var(--c-border);
}
.sm-head-brand { display: flex; align-items: center; gap: 10px; }
.sm-head-mark { width: 36px; height: 36px; background: var(--c-primary); border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 900; font-size: 0.9rem; color: #fff; }
.sm-head-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--c-text); text-transform: uppercase; }
.sm-head-name span { color: var(--c-primary); }
.sm-close { background: #fff; border: 2px solid var(--c-border); width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-text); transition: all 0.15s; }
.sm-close:hover { background: var(--c-primary); color: #fff; }
.sm-close i { width: 18px; height: 18px; }

.sm-section { padding: 20px 20px 10px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-muted); }
.sm-link {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 20px; font-size: 0.9rem; font-weight: 700; text-transform: uppercase;
    color: var(--c-text); border-bottom: 1px solid #EEE; transition: all 0.15s;
}
.sm-link:hover { color: #fff; background: var(--c-primary); }
.sm-link i { width: 18px; height: 18px; color: var(--c-primary); }
.sm-link:hover i { color: #fff; }

.sm-acc-btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 14px 20px;
    font-family: var(--font-sans); font-size: 0.9rem; font-weight: 800; text-transform: uppercase;
    color: var(--c-text); background: none; border: none; border-bottom: 1px solid #EEE; cursor: pointer;
    transition: all 0.15s;
}
.sm-acc-btn:hover { background: #f9f9f9; }
.sm-acc-btn i { width: 18px; height: 18px; transition: transform 0.2s; color: var(--c-primary); }
.sm-acc-btn.open i { transform: rotate(180deg); }

.sm-acc-body { display: none; background: #fafafa; border-bottom: 2px solid #000; }
.sm-acc-body.open { display: block; }
.sm-sub-link { display: flex; align-items: center; gap: 8px; padding: 12px 20px 12px 40px; font-size: 0.85rem; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; transition: all 0.15s; border-bottom: 1px solid #EEE; }
.sm-sub-link::before { content: ''; width: 6px; height: 6px; background: var(--c-primary); }
.sm-sub-link:hover { color: #000; background: #fff; padding-left: 45px; }

.sm-footer { margin-top: auto; padding: 20px; border-top: 3px solid var(--c-border); background: var(--c-dark); color: #fff; }
.sm-footer-addr { font-size: 0.75rem; font-weight: 600; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
.sm-footer-addr i { width: 16px; height: 16px; flex-shrink: 0; color: var(--c-primary); }

/* ================================================================
   HERO
   ================================================================ */
.hero {
    background: #fff;
    border-bottom: 4px solid var(--c-border);
    padding: 5rem 3rem 0rem;
    position: relative;
    overflow: hidden;
}
.hero-container {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
}
.hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.85rem; font-weight: 900;
    text-transform: uppercase; letter-spacing: 2px;
    color: #fff; background: var(--c-border);
    padding: 8px 20px; border-radius: 50px;
    margin-bottom: 1.5rem;
}
.hero-tag::before { content: ''; width: 8px; height: 8px; background: var(--c-primary); border-radius: 50%; }
.hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 900; line-height: 0.95;
    color: var(--c-text); text-transform: uppercase;
    margin-bottom: 1.5rem; letter-spacing: -1px;
}
.hero h1 span { color: var(--c-primary); text-shadow: 3px 3px 0px #000; }
.hero p {
    font-size: 1.15rem; color: var(--c-text-2);
    max-width: 500px; margin-bottom: 3rem;
    line-height: 1.6; font-weight: 600;
}
.hero-image-wrap {
    position: relative;
    border: 4px solid #000;
    border-bottom: none;
    background: #f0f0f0;
    box-shadow: -15px 15px 0px var(--c-primary);
    display: flex; align-items: flex-end;
}
.hero-image-wrap img { width: 100%; display: block; object-fit: cover; }

.hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--c-primary); color: #fff;
    padding: 16px 36px; border: 3px solid #000;
    font-size: 1.05rem; font-weight: 900; text-transform: uppercase;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: var(--shadow-sm);
}
.btn-primary:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow); color: #fff; }
.btn-primary i { width: 20px; height: 20px; }

.btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #000; color: #fff;
    padding: 16px 36px; border: 3px solid #000;
    font-size: 1.05rem; font-weight: 900; text-transform: uppercase;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: var(--shadow-sm);
}
.btn-secondary:hover { background: #fff; color: #000; transform: translate(-3px, -3px); box-shadow: var(--shadow-orange); }
.btn-secondary i { width: 20px; height: 20px; }

/* hero stats row */
.hero-stats {
    display: flex; justify-content: space-around; align-items: center; gap: 2rem;
    margin-top: 4rem; padding: 2.5rem;
    background: var(--c-dark); color: #fff;
    border-top: 4px solid #000;
    flex-wrap: wrap; 
}
.hero-stat-item { text-align: center; }
.hero-stat-val { font-family: var(--font-display); font-size: 2.8rem; font-weight: 900; color: var(--c-primary); line-height: 1; margin-bottom: 5px; }
.hero-stat-lbl { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #fff; }

/* ================================================================
   SEÇÕES GENÉRICAS
   ================================================================ */
.section { padding: 6rem 3rem; border-bottom: 4px solid #000; }
.section-alt { background: var(--c-dark); color: #fff; }
.section-alt .sec-title { color: #fff; }
.section-alt .sec-sub { color: #ccc; }
.container { max-width: 1200px; margin: 0 auto; }

.sec-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.8rem; font-weight: 900;
    text-transform: uppercase; letter-spacing: 2px;
    color: #fff; background: var(--c-primary);
    border: 2px solid #000;
    padding: 6px 16px; border-radius: 30px;
    margin-bottom: 1.5rem;
    box-shadow: 3px 3px 0px #000;
}
.sec-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--c-text); margin-bottom: 1rem; text-transform: uppercase; line-height: 1.1; letter-spacing: -0.5px; }
.sec-sub { font-size: 1.1rem; color: var(--c-text-muted); max-width: 600px; line-height: 1.6; font-weight: 500; }

/* ================================================================
   INSTITUCIONAL
   ================================================================ */
.inst-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; margin-top: 4rem; }
.inst-text p { font-size: 1.05rem; color: #ddd; line-height: 1.8; margin-bottom: 1.5rem; }
.inst-text strong { color: var(--c-primary); font-weight: 900; text-transform: uppercase; }
.inst-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.inst-card {
    background: #fff; color: #000;
    border: 3px solid #000;
    padding: 2rem; text-align: left;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
}
.inst-card:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-orange); }
.inst-card i { width: 42px; height: 42px; color: var(--c-primary); margin-bottom: 1rem; }
.inst-card h4 { font-family: var(--font-display); font-size: 1.1rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5rem; }
.inst-card p { font-size: 0.85rem; color: var(--c-text-muted); line-height: 1.6; font-weight: 600; }

/* ================================================================
   CURSOS
   ================================================================ */
.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3.5rem; }
.course-card {
    background: #fff;
    border: 3px solid #000;
    padding: 2rem;
    display: flex; flex-direction: column; gap: 16px;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
}
.course-card:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-orange); }
.course-icon {
    width: 56px; height: 56px;
    background: #000; color: var(--c-primary);
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
}
.course-icon i { width: 28px; height: 28px; }
.course-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; color: var(--c-text); text-transform: uppercase; line-height: 1.2; }
.course-desc { font-size: 0.9rem; color: var(--c-text-muted); line-height: 1.6; font-weight: 500; flex: 1; }
.course-card a { font-size: 0.9rem; font-weight: 800; color: var(--c-primary); display: inline-flex; align-items: center; gap: 6px; text-transform: uppercase; margin-top: 10px; }
.course-card a:hover { color: #000; }

/* ================================================================
   PORTAIS DE ACESSO
   ================================================================ */
.portals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3.5rem; }
.portal-card {
    background: #000; color: #fff;
    border: 3px solid #000;
    padding: 2.5rem 2rem;
    display: flex; flex-direction: column;
    box-shadow: var(--shadow-orange);
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.portal-card:hover { background: #111; transform: translate(-4px, -4px); box-shadow: 10px 10px 0px var(--c-primary); }
.pc-icon {
    width: 60px; height: 60px;
    background: var(--c-primary); color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
}
.pc-icon i { width: 30px; height: 30px; }
.pc-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; text-transform: uppercase; margin-bottom: 1rem; color: #fff; }
.pc-desc { font-size: 0.9rem; color: #ccc; line-height: 1.6; font-weight: 500; flex: 1; margin-bottom: 2rem; }
.pc-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--c-primary); color: #fff;
    padding: 12px; border: 2px solid #000;
    font-size: 0.9rem; font-weight: 900; text-transform: uppercase;
    transition: background 0.15s;
}
.portal-card:hover .pc-btn { background: #fff; color: #000; }
.pc-btn i { width: 18px; height: 18px; }

/* ================================================================
   PARCEIROS
   ================================================================ */
.partners-row {
    display: flex; align-items: center; justify-content: center;
    gap: 3rem; flex-wrap: wrap; margin-top: 3rem;
}
.partner-badge {
    display: flex; align-items: center; gap: 12px;
    background: #fff; border: 3px solid #000;
    padding: 16px 28px;
    box-shadow: var(--shadow-sm);
    font-size: 1rem; font-weight: 900; color: #000; text-transform: uppercase;
    transition: transform 0.15s, box-shadow 0.15s;
}
.partner-badge:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-orange); }
.partner-badge i { width: 24px; height: 24px; color: var(--c-primary); }

/* ================================================================
   FOOTER
   ================================================================ */
.footer {
    background: #000; color: #fff;
    padding: 5rem 3rem 2rem;
    border-top: 5px solid var(--c-primary);
}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto 4rem; }
.footer-brand { font-family: var(--font-display); font-size: 1.6rem; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 1.5rem; }
.footer-brand span { color: var(--c-primary); }
.footer-desc { font-size: 0.9rem; line-height: 1.7; color: #aaa; margin-bottom: 1.5rem; font-weight: 500; }
.footer-addr { font-size: 0.85rem; color: #ddd; display: flex; align-items: flex-start; gap: 10px; font-weight: 600; }
.footer-addr i { width: 18px; height: 18px; flex-shrink: 0; color: var(--c-primary); }
.footer-col h4 { font-family: var(--font-display); font-size: 1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: var(--c-primary); margin-bottom: 1.5rem; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer-col ul li a { font-size: 0.9rem; font-weight: 600; color: #ccc; text-transform: uppercase; transition: color 0.15s; }
.footer-col ul li a:hover { color: #fff; padding-left: 5px; }
.footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 2rem; border-top: 2px solid #333; font-size: 0.8rem; font-weight: 700; color: #777; text-align: center; text-transform: uppercase; }

/* ================================================================
   RESPONSIVE
   ================================================================ */
@media (max-width: 1024px) {
    .inst-grid { grid-template-columns: 1fr; gap: 3rem; }
    .portals-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
    .nav { padding: 0 1.5rem; }
    .hero { padding: 3rem 1.5rem 0rem; }
    .hero-container { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
    .hero p { margin-left: auto; margin-right: auto; }
    .hero-actions { justify-content: center; }
    .section { padding: 4rem 1.5rem; }
    .hero-stats { padding: 2rem 1rem; gap: 2rem; justify-content: center; border-left: none; border-right: none; }
    .portals-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
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
        <a href="#portais" class="nav-cta"><i data-lucide="user"></i> Fazer Login</a>
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
        <a href="#portais" class="sm-sub-link" onclick="toggleMenu()">Acessar Portais</a>
    </div>

    <!-- Accordion: Sou Professor -->
    <button class="sm-acc-btn" onclick="toggleAcc(this)">
        <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="user-check" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Professor</span>
        <i data-lucide="chevron-down"></i>
    </button>
    <div class="sm-acc-body">
        <a href="#portais" class="sm-sub-link" onclick="toggleMenu()">Acessar Portais</a>
    </div>

    <!-- Accordion: Sou Colaborador -->
    <button class="sm-acc-btn" onclick="toggleAcc(this)">
        <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="briefcase" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Colaborador</span>
        <i data-lucide="chevron-down"></i>
    </button>
    <div class="sm-acc-body">
        <a href="#portais" class="sm-sub-link" onclick="toggleMenu()">Painel Administrativo</a>
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
    <div class="hero-container">
        <div class="hero-text">
            <div class="hero-tag">Matrículas Abertas</div>
            <h1>Formando profissionais para a <span>Indústria</span></h1>
            <p>A Sophie Link prepara jovens para os setores de mineração e serviços com cursos técnicos de excelência. Prepare-se para o mercado com quem entende de prática.</p>
            <div class="hero-actions">
                <a href="#cursos" class="btn-primary"><i data-lucide="book-open"></i> Ver Cursos</a>
                <a href="#portais" class="btn-secondary"><i data-lucide="user"></i> Acessar Portal</a>
            </div>
        </div>
        <div class="hero-image-wrap">
            <img src="assets/images/tech_student_hero.png" alt="Estudante Técnico Sophie Link">
        </div>
    </div>
    
    <div class="hero-stats">
        <div>
            <div class="hero-stat-val">+500</div>
            <div class="hero-stat-lbl">Alunos Formados</div>
        </div>
        <div>
            <div class="hero-stat-val">6</div>
            <div class="hero-stat-lbl">Cursos Técnicos</div>
        </div>
        <div>
            <div class="hero-stat-val">100%</div>
            <div class="hero-stat-lbl">Foco na Prática</div>
        </div>
        <div>
            <div class="hero-stat-val">Parauapebas</div>
            <div class="hero-stat-lbl">No coração da mineração</div>
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
                    <div class="course-desc" style="margin-bottom:8px;">O mais procurado. Formação voltada às demandas das mineradoras, com foco em manutenção industrial.</div>
                    <a href="#fale-conosco" style="font-size:12px; font-weight:600; color:var(--c-primary); display:inline-flex; align-items:center; gap:4px;">Tenho Interesse <i data-lucide="arrow-right" style="width:12px;"></i></a>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="hard-hat"></i></div>
                <div>
                    <div class="course-name">Técnico em Segurança do Trabalho</div>
                    <div class="course-desc" style="margin-bottom:8px;">Prevenção de acidentes, EPIs, laudos e normas de saúde ocupacional.</div>
                    <a href="#fale-conosco" style="font-size:12px; font-weight:600; color:var(--c-primary); display:inline-flex; align-items:center; gap:4px;">Tenho Interesse <i data-lucide="arrow-right" style="width:12px;"></i></a>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="bar-chart-2"></i></div>
                <div>
                    <div class="course-name">Técnico em Administração</div>
                    <div class="course-desc" style="margin-bottom:8px;">Gestão, finanças, recursos humanos e processos organizacionais.</div>
                    <a href="#fale-conosco" style="font-size:12px; font-weight:600; color:var(--c-primary); display:inline-flex; align-items:center; gap:4px;">Tenho Interesse <i data-lucide="arrow-right" style="width:12px;"></i></a>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="zap"></i></div>
                <div>
                    <div class="course-name">Técnico em Eletrônica</div>
                    <div class="course-desc" style="margin-bottom:8px;">Circuitos, automação e sistemas eletrônicos aplicados à indústria.</div>
                    <a href="#fale-conosco" style="font-size:12px; font-weight:600; color:var(--c-primary); display:inline-flex; align-items:center; gap:4px;">Tenho Interesse <i data-lucide="arrow-right" style="width:12px;"></i></a>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="shield-check"></i></div>
                <div>
                    <div class="course-name">Técnico em Gestão da Qualidade</div>
                    <div class="course-desc" style="margin-bottom:8px;">Normas ISO, controle de processos, auditorias e melhoria contínua.</div>
                    <a href="#fale-conosco" style="font-size:12px; font-weight:600; color:var(--c-primary); display:inline-flex; align-items:center; gap:4px;">Tenho Interesse <i data-lucide="arrow-right" style="width:12px;"></i></a>
                </div>
            </div>
            <div class="course-card">
                <div class="course-icon"><i data-lucide="package"></i></div>
                <div>
                    <div class="course-name">Técnico em Logística</div>
                    <div class="course-desc" style="margin-bottom:8px;">Cadeia de suprimentos, armazenagem, transporte e gestão de estoque.</div>
                    <a href="#fale-conosco" style="font-size:12px; font-weight:600; color:var(--c-primary); display:inline-flex; align-items:center; gap:4px;">Tenho Interesse <i data-lucide="arrow-right" style="width:12px;"></i></a>
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
            <a href="login_aluno.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="graduation-cap"></i></div>
                <div class="pc-title">Portal do Aluno</div>
                <p class="pc-desc">Acompanhe notas, frequência, histórico escolar e financeiro.</p>
                <span class="pc-btn">Acessar <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="login_ava.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="monitor-play"></i></div>
                <div class="pc-title">Ambiente Virtual (AVA)</div>
                <p class="pc-desc">Sala de aula digital com atividades e fóruns das disciplinas teóricas.</p>
                <span class="pc-btn">Acessar <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="login_professor.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="book-open"></i></div>
                <div class="pc-title">Portal do Professor</div>
                <p class="pc-desc">Lançamento de notas, frequências, planos de ensino e diário de classe.</p>
                <span class="pc-btn">Acessar <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="login_colaborador.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="briefcase"></i></div>
                <div class="pc-title">Portal do Colaborador</div>
                <p class="pc-desc">Acesso restrito para funcionários e equipe de apoio.</p>
                <span class="pc-btn">Acessar <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="login_empresa.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="building"></i></div>
                <div class="pc-title">Portal da Empresa</div>
                <p class="pc-desc">Acompanhamento de aprendizes, aprovação de relatórios e faturamento.</p>
                <span class="pc-btn">Acessar <i data-lucide="arrow-right"></i></span>
            </a>
            <a href="login_admin.php" class="portal-card">
                <div class="pc-icon"><i data-lucide="shield"></i></div>
                <div class="pc-title">Área Administrativa</div>
                <p class="pc-desc">Gestão escolar (Secretaria e Coordenação) e Dashboard Gerencial.</p>
                <span class="pc-btn">Acessar <i data-lucide="arrow-right"></i></span>
            </a>
        </div>
        <style>
/* ================================================================
   RESET & DESIGN TOKENS — TEMA INDUSTRIAL/BRUTALISTA
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF5C00;
    --c-primary-d:  #D94A00;
    --c-bg:         #FFFFFF;
    --c-surface:    #FFFFFF;
    --c-border:     #000000;
    --c-text:       #000000;
    --c-text-2:     #111111;
    --c-text-muted: #333333;
    --c-text-light: #666666;
    --c-dark:       #111111;
    --c-dark-text:  #FFFFFF;
    --radius:       0px;
    --radius-sm:    0px;
    --shadow-sm:    4px 4px 0px #000;
    --shadow:       6px 6px 0px #000;
    --shadow-orange: 6px 6px 0px var(--c-primary);
    --font-sans:    'Inter', sans-serif;
    --font-display: 'Syne', sans-serif;
    --nav-h:        76px;
}
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--font-sans); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.6; }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-thumb { background: var(--c-primary); }

/* ================================================================
   NAVBAR
   ================================================================ */
.nav {
    position: sticky; top: 0; z-index: 1000;
    height: var(--nav-h);
    background: var(--c-bg);
    border-bottom: 3px solid var(--c-border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
}
.nav-brand { display: flex; align-items: center; gap: 10px; }
.nav-brand img { height: 42px; object-fit: contain; }

.nav-actions { display: flex; align-items: center; gap: 12px; }
.nav-link-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    font-size: 0.85rem; font-weight: 800; color: var(--c-text); text-transform: uppercase;
    transition: all 0.15s;
}
.nav-link-btn:hover { color: var(--c-primary); }
.nav-link-btn i { width: 16px; height: 16px; color: var(--c-primary); }
.nav-cta {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 22px;
    font-size: 0.85rem; font-weight: 800; text-transform: uppercase;
    background: var(--c-primary); color: #fff;
    border: 2px solid var(--c-border);
    box-shadow: var(--shadow-sm);
    transition: transform 0.15s, box-shadow 0.15s;
}
.nav-cta:hover { transform: translate(-2px, -2px); box-shadow: var(--shadow); }
.nav-cta i { width: 16px; height: 16px; }

.menu-btn {
    display: flex; align-items: center; gap: 8px;
    background: #fff; border: 2px solid var(--c-border);
    padding: 10px 18px;
    font-family: var(--font-sans); font-size: 0.85rem; font-weight: 800; text-transform: uppercase;
    color: var(--c-text); cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: all 0.15s;
}
.menu-btn:hover { background: var(--c-primary); color: #fff; }
.menu-btn i { width: 18px; height: 18px; }

/* ================================================================
   SIDE MENU
   ================================================================ */
.side-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    z-index: 9000; opacity: 0; pointer-events: none; transition: opacity 0.3s;
}
.side-overlay.active { opacity: 1; pointer-events: all; }

.side-menu {
    position: fixed; top: 0; right: -380px; bottom: 0;
    width: 340px; z-index: 9001;
    background: #fff;
    border-left: 3px solid var(--c-border);
    display: flex; flex-direction: column;
    transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
    overflow-y: auto;
}
.side-menu.active { right: 0; }

.sm-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px; border-bottom: 3px solid var(--c-border);
}
.sm-head-brand { display: flex; align-items: center; gap: 10px; }
.sm-head-mark { width: 36px; height: 36px; background: var(--c-primary); border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 900; font-size: 0.9rem; color: #fff; }
.sm-head-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--c-text); text-transform: uppercase; }
.sm-head-name span { color: var(--c-primary); }
.sm-close { background: #fff; border: 2px solid var(--c-border); width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-text); transition: all 0.15s; }
.sm-close:hover { background: var(--c-primary); color: #fff; }
.sm-close i { width: 18px; height: 18px; }

.sm-section { padding: 20px 20px 10px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-muted); }
.sm-link {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 20px; font-size: 0.9rem; font-weight: 700; text-transform: uppercase;
    color: var(--c-text); border-bottom: 1px solid #EEE; transition: all 0.15s;
}
.sm-link:hover { color: #fff; background: var(--c-primary); }
.sm-link i { width: 18px; height: 18px; color: var(--c-primary); }
.sm-link:hover i { color: #fff; }

.sm-acc-btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 14px 20px;
    font-family: var(--font-sans); font-size: 0.9rem; font-weight: 800; text-transform: uppercase;
    color: var(--c-text); background: none; border: none; border-bottom: 1px solid #EEE; cursor: pointer;
    transition: all 0.15s;
}
.sm-acc-btn:hover { background: #f9f9f9; }
.sm-acc-btn i { width: 18px; height: 18px; transition: transform 0.2s; color: var(--c-primary); }
.sm-acc-btn.open i { transform: rotate(180deg); }

.sm-acc-body { display: none; background: #fafafa; border-bottom: 2px solid #000; }
.sm-acc-body.open { display: block; }
.sm-sub-link { display: flex; align-items: center; gap: 8px; padding: 12px 20px 12px 40px; font-size: 0.85rem; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; transition: all 0.15s; border-bottom: 1px solid #EEE; }
.sm-sub-link::before { content: ''; width: 6px; height: 6px; background: var(--c-primary); }
.sm-sub-link:hover { color: #000; background: #fff; padding-left: 45px; }

.sm-footer { margin-top: auto; padding: 20px; border-top: 3px solid var(--c-border); background: var(--c-dark); color: #fff; }
.sm-footer-addr { font-size: 0.75rem; font-weight: 600; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
.sm-footer-addr i { width: 16px; height: 16px; flex-shrink: 0; color: var(--c-primary); }

/* ================================================================
   HERO
   ================================================================ */
.hero {
    background: #fff;
    border-bottom: 4px solid var(--c-border);
    padding: 5rem 3rem 0rem;
    position: relative;
    overflow: hidden;
}
.hero-container {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
}
.hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.85rem; font-weight: 900;
    text-transform: uppercase; letter-spacing: 2px;
    color: #fff; background: var(--c-border);
    padding: 8px 20px; border-radius: 50px;
    margin-bottom: 1.5rem;
}
.hero-tag::before { content: ''; width: 8px; height: 8px; background: var(--c-primary); border-radius: 50%; }
.hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 900; line-height: 0.95;
    color: var(--c-text); text-transform: uppercase;
    margin-bottom: 1.5rem; letter-spacing: -1px;
}
.hero h1 span { color: var(--c-primary); text-shadow: 3px 3px 0px #000; }
.hero p {
    font-size: 1.15rem; color: var(--c-text-2);
    max-width: 500px; margin-bottom: 3rem;
    line-height: 1.6; font-weight: 600;
}
.hero-image-wrap {
    position: relative;
    border: 4px solid #000;
    border-bottom: none;
    background: #f0f0f0;
    box-shadow: -15px 15px 0px var(--c-primary);
    display: flex; align-items: flex-end;
}
.hero-image-wrap img { width: 100%; display: block; object-fit: cover; }

.hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--c-primary); color: #fff;
    padding: 16px 36px; border: 3px solid #000;
    font-size: 1.05rem; font-weight: 900; text-transform: uppercase;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: var(--shadow-sm);
}
.btn-primary:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow); color: #fff; }
.btn-primary i { width: 20px; height: 20px; }

.btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #000; color: #fff;
    padding: 16px 36px; border: 3px solid #000;
    font-size: 1.05rem; font-weight: 900; text-transform: uppercase;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: var(--shadow-sm);
}
.btn-secondary:hover { background: #fff; color: #000; transform: translate(-3px, -3px); box-shadow: var(--shadow-orange); }
.btn-secondary i { width: 20px; height: 20px; }

/* hero stats row */
.hero-stats {
    display: flex; justify-content: space-around; align-items: center; gap: 2rem;
    margin-top: 4rem; padding: 2.5rem;
    background: var(--c-dark); color: #fff;
    border-top: 4px solid #000;
    flex-wrap: wrap; 
}
.hero-stat-item { text-align: center; }
.hero-stat-val { font-family: var(--font-display); font-size: 2.8rem; font-weight: 900; color: var(--c-primary); line-height: 1; margin-bottom: 5px; }
.hero-stat-lbl { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #fff; }

/* ================================================================
   SEÇÕES GENÉRICAS
   ================================================================ */
.section { padding: 6rem 3rem; border-bottom: 4px solid #000; }
.section-alt { background: var(--c-dark); color: #fff; }
.section-alt .sec-title { color: #fff; }
.section-alt .sec-sub { color: #ccc; }
.container { max-width: 1200px; margin: 0 auto; }

.sec-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.8rem; font-weight: 900;
    text-transform: uppercase; letter-spacing: 2px;
    color: #fff; background: var(--c-primary);
    border: 2px solid #000;
    padding: 6px 16px; border-radius: 30px;
    margin-bottom: 1.5rem;
    box-shadow: 3px 3px 0px #000;
}
.sec-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--c-text); margin-bottom: 1rem; text-transform: uppercase; line-height: 1.1; letter-spacing: -0.5px; }
.sec-sub { font-size: 1.1rem; color: var(--c-text-muted); max-width: 600px; line-height: 1.6; font-weight: 500; }

/* ================================================================
   INSTITUCIONAL
   ================================================================ */
.inst-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; margin-top: 4rem; }
.inst-text p { font-size: 1.05rem; color: #ddd; line-height: 1.8; margin-bottom: 1.5rem; }
.inst-text strong { color: var(--c-primary); font-weight: 900; text-transform: uppercase; }
.inst-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.inst-card {
    background: #fff; color: #000;
    border: 3px solid #000;
    padding: 2rem; text-align: left;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
}
.inst-card:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-orange); }
.inst-card i { width: 42px; height: 42px; color: var(--c-primary); margin-bottom: 1rem; }
.inst-card h4 { font-family: var(--font-display); font-size: 1.1rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5rem; }
.inst-card p { font-size: 0.85rem; color: var(--c-text-muted); line-height: 1.6; font-weight: 600; }

/* ================================================================
   CURSOS
   ================================================================ */
.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3.5rem; }
.course-card {
    background: #fff;
    border: 3px solid #000;
    padding: 2rem;
    display: flex; flex-direction: column; gap: 16px;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s, box-shadow 0.2s;
}
.course-card:hover { transform: translate(-4px, -4px); box-shadow: var(--shadow-orange); }
.course-icon {
    width: 56px; height: 56px;
    background: #000; color: var(--c-primary);
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
}
.course-icon i { width: 28px; height: 28px; }
.course-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; color: var(--c-text); text-transform: uppercase; line-height: 1.2; }
.course-desc { font-size: 0.9rem; color: var(--c-text-muted); line-height: 1.6; font-weight: 500; flex: 1; }
.course-card a { font-size: 0.9rem; font-weight: 800; color: var(--c-primary); display: inline-flex; align-items: center; gap: 6px; text-transform: uppercase; margin-top: 10px; }
.course-card a:hover { color: #000; }

/* ================================================================
   PORTAIS DE ACESSO
   ================================================================ */
.portals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3.5rem; }
.portal-card {
    background: #000; color: #fff;
    border: 3px solid #000;
    padding: 2.5rem 2rem;
    display: flex; flex-direction: column;
    box-shadow: var(--shadow-orange);
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.portal-card:hover { background: #111; transform: translate(-4px, -4px); box-shadow: 10px 10px 0px var(--c-primary); }
.pc-icon {
    width: 60px; height: 60px;
    background: var(--c-primary); color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
}
.pc-icon i { width: 30px; height: 30px; }
.pc-title { font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; text-transform: uppercase; margin-bottom: 1rem; color: #fff; }
.pc-desc { font-size: 0.9rem; color: #ccc; line-height: 1.6; font-weight: 500; flex: 1; margin-bottom: 2rem; }
.pc-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--c-primary); color: #fff;
    padding: 12px; border: 2px solid #000;
    font-size: 0.9rem; font-weight: 900; text-transform: uppercase;
    transition: background 0.15s;
}
.portal-card:hover .pc-btn { background: #fff; color: #000; }
.pc-btn i { width: 18px; height: 18px; }

/* ================================================================
   PARCEIROS
   ================================================================ */
.partners-row {
    display: flex; align-items: center; justify-content: center;
    gap: 3rem; flex-wrap: wrap; margin-top: 3rem;
}
.partner-badge {
    display: flex; align-items: center; gap: 12px;
    background: #fff; border: 3px solid #000;
    padding: 16px 28px;
    box-shadow: var(--shadow-sm);
    font-size: 1rem; font-weight: 900; color: #000; text-transform: uppercase;
    transition: transform 0.15s, box-shadow 0.15s;
}
.partner-badge:hover { transform: translate(-3px, -3px); box-shadow: var(--shadow-orange); }
.partner-badge i { width: 24px; height: 24px; color: var(--c-primary); }

/* ================================================================
   FOOTER
   ================================================================ */
.footer {
    background: #000; color: #fff;
    padding: 5rem 3rem 2rem;
    border-top: 5px solid var(--c-primary);
}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto 4rem; }
.footer-brand { font-family: var(--font-display); font-size: 1.6rem; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 1.5rem; }
.footer-brand span { color: var(--c-primary); }
.footer-desc { font-size: 0.9rem; line-height: 1.7; color: #aaa; margin-bottom: 1.5rem; font-weight: 500; }
.footer-addr { font-size: 0.85rem; color: #ddd; display: flex; align-items: flex-start; gap: 10px; font-weight: 600; }
.footer-addr i { width: 18px; height: 18px; flex-shrink: 0; color: var(--c-primary); }
.footer-col h4 { font-family: var(--font-display); font-size: 1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: var(--c-primary); margin-bottom: 1.5rem; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer-col ul li a { font-size: 0.9rem; font-weight: 600; color: #ccc; text-transform: uppercase; transition: color 0.15s; }
.footer-col ul li a:hover { color: #fff; padding-left: 5px; }
.footer-bottom { max-width: 1200px; margin: 0 auto; padding-top: 2rem; border-top: 2px solid #333; font-size: 0.8rem; font-weight: 700; color: #777; text-align: center; text-transform: uppercase; }

/* ================================================================
   RESPONSIVE
   ================================================================ */
@media (max-width: 1024px) {
    .inst-grid { grid-template-columns: 1fr; gap: 3rem; }
    .portals-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
    .nav { padding: 0 1.5rem; }
    .hero { padding: 3rem 1.5rem 0rem; }
    .hero-container { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
    .hero p { margin-left: auto; margin-right: auto; }
    .hero-actions { justify-content: center; }
    .section { padding: 4rem 1.5rem; }
    .hero-stats { padding: 2rem 1rem; gap: 2rem; justify-content: center; border-left: none; border-right: none; }
    .portals-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; gap: 3rem; }
    .nav-link-btn { display: none; }
}
</style>
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
     CONTATO (FORM)
     ================================================================ -->
<section class="section" id="fale-conosco" style="background-color: var(--c-bg);">
    <div class="container" style="max-width: 600px;">
        <div class="sec-tag" style="justify-content:center;">Atendimento</div>
        <div class="sec-title" style="text-align:center;">Fale Conosco</div>
        <div class="sec-sub" style="text-align:center; margin: 0 auto 30px auto;">Tem dúvidas sobre matrículas, cursos ou bolsas? Envie-nos uma mensagem.</div>
        
        <?php if ($msg_contato): ?>
            <div style="background:#D1FAE5; color:#065F46; padding:15px; border-radius:8px; text-align:center; font-weight:600; margin-bottom:20px; border: 1px solid #A7F3D0;">
                <i data-lucide="check-circle" style="vertical-align:middle; margin-right:5px; width:18px;"></i> <?= htmlspecialchars($msg_contato) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="#fale-conosco" style="display:flex; flex-direction:column; gap:16px; background:#fff; padding:30px; border-radius:12px; box-shadow:var(--shadow-sm); border:1px solid var(--c-border);">
            <input type="hidden" name="acao" value="contato">
            <div>
                <label style="display:block; font-size:14px; font-weight:600; margin-bottom:6px; color:var(--c-text-2);">Nome Completo</label>
                <input type="text" name="nome" required style="width:100%; padding:12px; border:1px solid var(--c-border); border-radius:8px; font-family:inherit; outline:none;" onfocus="this.style.borderColor='var(--c-primary)'" onblur="this.style.borderColor='var(--c-border)'">
            </div>
            <div style="display:flex; gap:16px; flex-wrap:wrap;">
                <div style="flex:1; min-width:200px;">
                    <label style="display:block; font-size:14px; font-weight:600; margin-bottom:6px; color:var(--c-text-2);">E-mail</label>
                    <input type="email" name="email" required style="width:100%; padding:12px; border:1px solid var(--c-border); border-radius:8px; font-family:inherit; outline:none;" onfocus="this.style.borderColor='var(--c-primary)'" onblur="this.style.borderColor='var(--c-border)'">
                </div>
                <div style="flex:1; min-width:200px;">
                    <label style="display:block; font-size:14px; font-weight:600; margin-bottom:6px; color:var(--c-text-2);">Telefone / WhatsApp</label>
                    <input type="text" id="telefone" name="telefone" maxlength="15" placeholder="(94) 90000-0000" style="width:100%; padding:12px; border:1px solid var(--c-border); border-radius:8px; font-family:inherit; outline:none;" onfocus="this.style.borderColor='var(--c-primary)'" onblur="this.style.borderColor='var(--c-border)'">
                </div>
            </div>
            <div>
                <label style="display:block; font-size:14px; font-weight:600; margin-bottom:6px; color:var(--c-text-2);">Mensagem</label>
                <textarea name="mensagem" required rows="4" style="width:100%; padding:12px; border:1px solid var(--c-border); border-radius:8px; font-family:inherit; outline:none; resize:vertical;" onfocus="this.style.borderColor='var(--c-primary)'" onblur="this.style.borderColor='var(--c-border)'"></textarea>
            </div>
            <button type="submit" class="btn" style="width:100%; justify-content:center; padding:14px; font-size:16px; margin-top:10px; background:var(--c-primary); color:#fff; border:none; border-radius:8px; cursor:pointer;">Enviar Mensagem</button>
        </form>
    </div>
</section>

<!-- ================================================================
     FOOTER
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
                <li><a href="login_aluno.php">Portal do Aluno</a></li>
                <li><a href="login_ava.php">Ambiente Virtual (AVA)</a></li>
                <li><a href="login_admin.php">Área Administrativa</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Institucional</h4>
            <ul>
                <li><a href="#institucional">Sobre a Escola</a></li>
                <li><a href="#cursos">Nossos Cursos</a></li>
                <li><a href="#fale-conosco">Fale Conosco</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        &copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA · Todos os direitos reservados.
    </div>
</footer>

<script>
lucide.createIcons();

// Mask para Telefone
const phoneInput = document.getElementById('telefone');
if(phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

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