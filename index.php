<?php
// Home page - Landing Page Sophie Link
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sophie Link — Gestão de Aprendizes</title>
    <meta name="description" content="Sophie Link — Plataforma profissional de gestão de aprendizes, empresas parceiras e desenvolvimento de jovens talentos.">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        /* ===== RESET & BASE ===== */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --orange:       #FF7A00;
            --orange-deep:  #E06C00;
            --orange-light: #FF9D3A;
            --orange-glow:  rgba(255,122,0,0.3);
            --black:        #0A0A0A;
            --black2:       #111111;
            --white:        #FFFFFF;
            --muted:        #888888;
            --surface:      rgba(255,255,255,0.05);
            --border:       rgba(255,255,255,0.08);
        }

        html { scroll-behavior: smooth; }
        body {
            font-family: 'Inter', sans-serif;
            background: var(--black);
            color: var(--white);
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 4px; }

        /* ===== PRELOADER ===== */
        #preloader {
            position: fixed; inset: 0; z-index: 99999;
            background: var(--black);
            display: flex; align-items: center; justify-content: center;
            flex-direction: column; gap: 24px;
            transition: opacity 0.6s ease, visibility 0.6s ease;
        }
        #preloader.hide { opacity: 0; visibility: hidden; }
        .pre-logo {
            font-family: 'Teko', sans-serif;
            font-size: 3.5rem; font-weight: 700;
            letter-spacing: 6px; color: var(--white);
        }
        .pre-logo span { color: var(--orange); }
        .pre-bar {
            width: 200px; height: 2px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px; overflow: hidden;
        }
        .pre-fill {
            height: 100%; width: 0; background: var(--orange);
            animation: prefill 1.2s ease forwards;
        }
        @keyframes prefill { to { width: 100%; } }


        /* ===== HERO ===== */
        .hero {
            min-height: 100vh;
            display: flex; align-items: center;
            position: relative; overflow: hidden;
        }

        .hero-bg {
            position: absolute; inset: 0; z-index: 0;
            background: linear-gradient(135deg,
                #1a0a00 0%, #2d1200 20%,
                var(--orange-deep) 60%,
                var(--orange) 80%,
                var(--orange-light) 100%
            );
        }
        .hero-bg::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
                linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px);
            background-size: 50px 50px;
        }
        .hero-bg::after {
            content: '';
            position: absolute;
            top: -100px; left: -100px;
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(0,0,0,0.55) 0%, transparent 70%);
        }

        .hero-shapes { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .shape {
            position: absolute; border-radius: 4px; opacity: 0.12;
            animation: floatShape 6s ease-in-out infinite;
        }
        .shape-1 { width: 60px; height: 60px; background: var(--white); top: 15%; right: 42%; transform: rotate(15deg); }
        .shape-2 { width: 40px; height: 40px; background: var(--black); top: 60%; right: 35%; transform: rotate(-10deg); animation-delay: 1s; }
        .shape-3 { width: 80px; height: 20px; background: var(--white); top: 30%; left: 10%; transform: rotate(5deg); animation-delay: 2s; }
        .shape-4 { width: 30px; height: 30px; background: var(--black); bottom: 25%; right: 50%; transform: rotate(20deg); animation-delay: 0.5s; }
        @keyframes floatShape {
            0%, 100% { transform: translateY(0) rotate(15deg); }
            50%       { transform: translateY(-15px) rotate(15deg); }
        }

        .hero-star {
            position: absolute; bottom: 12%; left: 4%;
            width: 80px; height: 80px; z-index: 2;
            animation: spin 20s linear infinite; opacity: 0.5;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hero-content {
            position: relative; z-index: 3;
            max-width: 1300px; margin: 0 auto; padding: 96px 3rem 3rem;
            display: grid; grid-template-columns: 1fr 1fr;
            align-items: center; gap: 2rem; width: 100%;
        }

        .hero-eyebrow {
            display: inline-flex; align-items: center; gap: 10px;
            font-size: 0.72rem; font-weight: 700; letter-spacing: 4px;
            text-transform: uppercase; color: rgba(0,0,0,0.6);
            background: rgba(0,0,0,0.12); border-radius: 20px;
            padding: 6px 14px; margin-bottom: 1.5rem;
        }
        .hero-eyebrow-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: var(--black); animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .hero-title {
            font-family: 'Teko', sans-serif;
            font-size: clamp(3.5rem, 7vw, 6.5rem);
            font-weight: 700; line-height: 0.88;
            letter-spacing: -2px; color: var(--black);
            margin-bottom: 1.5rem;
        }
        .hero-title .accent { color: var(--white); display: block; }
        .hero-title .line2 {
            font-size: clamp(2.2rem, 4.5vw, 4rem);
            display: block; margin-top: 0.2rem;
        }

        .hero-desc {
            font-size: 1rem; line-height: 1.7;
            color: rgba(0,0,0,0.6);
            max-width: 480px; margin-bottom: 2.5rem;
        }

        .hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .btn-hero {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 16px 28px; border-radius: 10px;
            font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700;
            text-decoration: none; transition: all 0.25s;
            cursor: pointer; border: none; letter-spacing: 0.3px;
        }
        .btn-hero-admin {
            background: var(--black); color: var(--white);
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .btn-hero-admin:hover { background: #222; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.5); }
        .btn-hero-ava { background: var(--white); color: var(--black); }
        .btn-hero-ava:hover { background: rgba(255,255,255,0.9); transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }

        .hero-stats {
            display: flex; gap: 2.5rem; margin-top: 3rem;
            padding-top: 2rem; border-top: 1px solid rgba(0,0,0,0.15);
        }
        .hero-stat-num {
            font-family: 'Teko', sans-serif; font-size: 2.5rem;
            font-weight: 700; color: var(--black); line-height: 1;
        }
        .hero-stat-label {
            font-size: 0.7rem; font-weight: 600; letter-spacing: 1px;
            text-transform: uppercase; color: rgba(0,0,0,0.5); margin-top: 2px;
        }

        .hero-image {
            display: flex; align-items: flex-end; justify-content: center;
            position: relative; min-height: 500px;
        }
        .hero-image img {
            max-height: 580px; width: auto; object-fit: contain; object-position: bottom;
            filter: drop-shadow(0 30px 60px rgba(0,0,0,0.4));
            animation: heroFloat 4s ease-in-out infinite;
        }
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

        /* Badges flutuantes */
        .hero-badge {
            position: absolute; top: 20%; left: -10px;
            background: var(--black); border: 1px solid rgba(255,122,0,0.25);
            border-radius: 12px; padding: 14px 18px;
            display: flex; align-items: center; gap: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            animation: badgeFloat 3s ease-in-out infinite;
        }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
        .hero-badge-icon {
            width: 40px; height: 40px; border-radius: 8px;
            background: rgba(255,122,0,0.15); color: var(--orange);
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hero-badge-num { font-family:'Teko',sans-serif; font-size:1.6rem; font-weight:700; line-height:1; color:var(--white); }
        .hero-badge-label { font-size:0.68rem; color:var(--muted); font-weight:500; }

        .hero-badge2 {
            position: absolute; bottom: 22%; right: 0;
            background: var(--orange); border-radius: 12px;
            padding: 12px 16px; display: flex; align-items: center; gap: 10px;
            box-shadow: 0 10px 25px rgba(255,122,0,0.45);
            animation: badgeFloat2 3.5s ease-in-out infinite;
        }
        @keyframes badgeFloat2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        .hero-badge2-icon {
            width: 34px; height: 34px; border-radius: 6px;
            background: rgba(0,0,0,0.2);
            display: flex; align-items: center; justify-content: center;
        }
        .hero-badge2-text { font-size:0.78rem; font-weight:700; color:var(--white); }
        .hero-badge2-sub  { font-size:0.65rem; color:rgba(255,255,255,0.75); }

        .scroll-indicator {
            position: absolute; bottom: 2.5rem; left: 50%;
            transform: translateX(-50%); z-index: 10;
            display: flex; flex-direction: column; align-items: center; gap: 8px;
            animation: scrollBounce 2s ease-in-out infinite;
        }
        .scroll-indicator span { font-size:0.65rem; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:rgba(0,0,0,0.45); }
        @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }

        /* ===== PORTAIS ===== */
        .section-portals {
            padding: 7rem 3rem; background: var(--black2);
            position: relative; overflow: hidden;
        }
        .section-portals::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, var(--orange), transparent);
        }
        .section-inner { max-width: 1200px; margin: 0 auto; }

        .section-label {
            font-size: 0.68rem; font-weight: 700; letter-spacing: 4px;
            text-transform: uppercase; color: var(--orange);
            display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;
        }
        .section-label::before { content:''; display:block; width:24px; height:2px; background:var(--orange); }
        .section-title {
            font-family: 'Teko', sans-serif;
            font-size: clamp(2.5rem, 4vw, 3.5rem);
            font-weight: 700; letter-spacing: -1px; line-height: 1;
            color: var(--white); margin-bottom: 1rem;
        }
        .section-subtitle { font-size:0.95rem; color:var(--muted); max-width:500px; line-height:1.7; margin-bottom:3.5rem; }

        .portals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

        .portal-card {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 16px; padding: 2rem;
            position: relative; overflow: hidden;
            transition: all 0.3s; text-decoration: none;
            display: flex; flex-direction: column; cursor: pointer;
        }
        .portal-card::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at top left, var(--pc-glow, transparent), transparent 70%);
            opacity: 0; transition: opacity 0.3s;
        }
        .portal-card:hover { border-color: var(--pc-border, var(--border)); transform: translateY(-6px); }
        .portal-card:hover::before { opacity: 1; }

        .portal-card-admin { --pc-glow: rgba(255,122,0,0.12); --pc-border: rgba(255,122,0,0.35); }
        .portal-card-ava   { --pc-glow: rgba(59,130,246,0.12); --pc-border: rgba(59,130,246,0.35); }
        .portal-card-info  { --pc-glow: rgba(34,197,94,0.1);   --pc-border: rgba(34,197,94,0.3); }

        .portal-icon {
            width: 52px; height: 52px; border-radius: 12px;
            display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;
        }
        .portal-icon-orange { background: rgba(255,122,0,0.15); color: var(--orange); }
        .portal-icon-blue   { background: rgba(59,130,246,0.15); color: #3B82F6; }
        .portal-icon-green  { background: rgba(34,197,94,0.15); color: #22C55E; }

        .portal-tag { font-size:0.62rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:0.6rem; }
        .portal-name { font-family:'Teko',sans-serif; font-size:1.8rem; font-weight:700; letter-spacing:0.5px; color:var(--white); margin-bottom:0.75rem; line-height:1; }
        .portal-desc { font-size:0.85rem; color:var(--muted); line-height:1.6; flex:1; margin-bottom:1.5rem; }

        .portal-btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 10px 18px; border-radius: 8px;
            font-size: 0.82rem; font-weight: 700; text-decoration: none;
            width: fit-content; transition: all 0.2s;
        }
        .portal-btn-orange { background: var(--orange); color: var(--white); }
        .portal-btn-orange:hover { background: var(--orange-deep); box-shadow: 0 6px 20px rgba(255,122,0,0.4); }
        .portal-btn-blue { background: rgba(59,130,246,0.2); color: #60A5FA; border: 1px solid rgba(59,130,246,0.3); }
        .portal-btn-blue:hover { background: rgba(59,130,246,0.35); }
        .portal-btn-green { background: rgba(34,197,94,0.15); color: #4ADE80; border: 1px solid rgba(34,197,94,0.25); }
        .portal-btn-green:hover { background: rgba(34,197,94,0.3); }

        .portal-corner {
            position: absolute; top: 1.5rem; right: 1.5rem;
            width: 32px; height: 32px; border-radius: 6px;
            display: flex; align-items: center; justify-content: center;
            background: var(--border);
        }
        .portal-arrow { color: var(--muted); transition: color 0.2s, transform 0.2s; }
        .portal-card:hover .portal-arrow { color: var(--white); transform: translate(3px,-3px); }

        /* ===== FEATURES ===== */
        .section-features { padding: 7rem 3rem; background: var(--black); }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }

        .features-mockup {
            background: #141414; border: 1px solid var(--border);
            border-radius: 16px; overflow: hidden;
            box-shadow: 0 40px 80px rgba(0,0,0,0.5);
            position: relative;
        }
        .mockup-topbar { background: #1C1C1C; border-bottom: 1px solid var(--border); padding: 12px 16px; display: flex; align-items: center; gap: 8px; }
        .mockup-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mockup-body { padding: 1.25rem; }
        .mockup-row { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 10px; }
        .mockup-avatar { width:36px; height:36px; border-radius:8px; background:var(--orange); display:flex; align-items:center; justify-content:center; font-family:'Teko',sans-serif; font-size:1rem; font-weight:700; color:white; flex-shrink:0; }
        .mockup-name { font-size:0.82rem; font-weight:600; color:var(--white); }
        .mockup-sub  { font-size:0.7rem; color:var(--muted); }
        .mockup-badge { font-size:0.65rem; font-weight:700; padding:3px 10px; border-radius:20px; white-space:nowrap; }
        .mb-green  { background:rgba(34,197,94,0.15); color:#4ADE80; }
        .mb-orange { background:rgba(255,122,0,0.15); color:var(--orange); }
        .mb-blue   { background:rgba(59,130,246,0.15); color:#60A5FA; }

        .glow-card {
            position: absolute; right: -30px; bottom: -25px;
            background: var(--orange); border-radius: 14px; padding: 16px 20px;
            box-shadow: 0 20px 50px rgba(255,122,0,0.5);
            display: flex; align-items: center; gap: 12px;
            animation: gcFloat 3s ease-in-out infinite;
        }
        @keyframes gcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .glow-card-num { font-family:'Teko',sans-serif; font-size:2rem; font-weight:700; color:white; line-height:1; }
        .glow-card-text { font-size:0.72rem; color:rgba(255,255,255,0.8); font-weight:600; }

        .features-list { display:flex; flex-direction:column; gap:1.25rem; margin-top:2.5rem; }
        .feature-item {
            display: flex; gap: 1.25rem; align-items: flex-start;
            padding: 1.25rem; background: var(--surface);
            border: 1px solid var(--border); border-radius: 12px;
            transition: border-color 0.2s;
        }
        .feature-item:hover { border-color: rgba(255,122,0,0.25); }
        .feature-item-icon { width:42px; height:42px; border-radius:10px; background:rgba(255,122,0,0.12); color:var(--orange); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .feature-item-title { font-size:0.9rem; font-weight:700; color:var(--white); margin-bottom:4px; }
        .feature-item-desc  { font-size:0.8rem; color:var(--muted); line-height:1.5; }

        /* ===== FOOTER ===== */
        footer { background: #090909; border-top: 1px solid var(--border); padding: 3rem; }
        .footer-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; }
        .footer-brand { display:flex; align-items:center; gap:10px; text-decoration:none; }
        .footer-copy { font-size:0.8rem; color:var(--muted); }
        .footer-links { display:flex; gap:1.5rem; }
        .footer-links a { font-size:0.8rem; color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .footer-links a:hover { color:var(--orange); }



        /* ===== RESPONSIVO ===== */
        @media (max-width: 1024px) { .portals-grid { grid-template-columns: 1fr; } .features-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
            .hero-content { grid-template-columns: 1fr; padding: 80px 1.5rem 3rem; }
            .hero-image { display: none; }
            .hero-title { font-size: 3.5rem; }
            .section-portals, .section-features { padding: 4rem 1.5rem; }
            .portals-grid { grid-template-columns: 1fr; }
            footer { padding: 2rem 1.5rem; }
            .footer-inner { flex-direction: column; text-align: center; }
            .features-grid { grid-template-columns: 1fr; }
            .features-mockup-wrap { display: none; }
        }
    </style>
</head>
<body>

<!-- PRELOADER -->
<div id="preloader">
    <div class="pre-logo"><span>S</span>L</div>
    <div class="pre-bar"><div class="pre-fill"></div></div>
</div>

<?php include 'includes/mobile_menu_home.php'; ?>
<?php include 'includes/navbar_home.php'; ?>

<!-- HERO -->
<section class="hero" id="inicio">
    <div class="hero-bg"></div>
    <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
    </div>

    <!-- Estrela decorativa estilo UNIAENE -->
    <svg class="hero-star" viewBox="0 0 100 100" fill="rgba(0,0,0,0.35)">
        <path d="M50 0 L53 47 L100 50 L53 53 L50 100 L47 53 L0 50 L47 47 Z"/>
    </svg>

    <div class="hero-content">
        <!-- Texto -->
        <div class="hero-text">
            <div class="hero-eyebrow">
                <span class="hero-eyebrow-dot"></span>
                Plataforma Profissional
            </div>

            <h1 class="hero-title">
                GESTÃO
                <span class="accent">INTELIGENTE</span>
                <span class="line2">DE APRENDIZES</span>
            </h1>

            <p class="hero-desc">
                Centralize o controle de aprendizes, empresas parceiras, frequência escolar e financeiro em uma única plataforma moderna e poderosa.
            </p>

            <div class="hero-actions">
                <a href="dashboard.php" class="btn-hero btn-hero-admin" id="btn-admin">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    Painel Administrativo
                </a>
                <a href="#portais" class="btn-hero btn-hero-ava" id="btn-ava">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    Acessar AVA
                </a>
            </div>

            <div class="hero-stats">
                <div>
                    <div class="hero-stat-num">300<span style="color:var(--orange-deep)">+</span></div>
                    <div class="hero-stat-label">Aprendizes</div>
                </div>
                <div>
                    <div class="hero-stat-num">49<span style="color:var(--orange-deep)">+</span></div>
                    <div class="hero-stat-label">Empresas</div>
                </div>
                <div>
                    <div class="hero-stat-num">100<span style="color:var(--orange-deep)">%</span></div>
                    <div class="hero-stat-label">Digital</div>
                </div>
            </div>
        </div>

        <!-- Imagem do aprendiz -->
        <div class="hero-image">
            <img src="assets/images/hero_aprendiz.png" alt="Aprendiz Sophie Link" onerror="this.style.display='none'">

            <!-- Badge 1 -->
            <div class="hero-badge">
                <div class="hero-badge-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <div>
                    <div class="hero-badge-num">312</div>
                    <div class="hero-badge-label">Aprendizes ativos</div>
                </div>
            </div>

            <!-- Badge 2 -->
            <div class="hero-badge2">
                <div class="hero-badge2-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                    <div class="hero-badge2-text">Frequência 94%</div>
                    <div class="hero-badge2-sub">Média mensal</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Indicador de scroll -->
    <div class="scroll-indicator">
        <span>Explorar</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.45)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
</section>

<!-- PORTAIS DE ACESSO -->
<section class="section-portals" id="portais">
    <div class="section-inner">
        <div class="section-label">Portais de Acesso</div>
        <h2 class="section-title">Escolha seu ambiente</h2>
        <p class="section-subtitle">Acesse o sistema administrativo completo ou o Ambiente Virtual de Aprendizagem com um clique.</p>

        <div class="portals-grid">

            <!-- Admin -->
            <a href="dashboard.php" class="portal-card portal-card-admin" id="portal-admin">
                <div class="portal-corner">
                    <svg class="portal-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
                <div class="portal-icon portal-icon-orange">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <div class="portal-tag">Administrativo</div>
                <div class="portal-name">Painel Admin</div>
                <div class="portal-desc">
                    Gerencie aprendizes, empresas parceiras, frequência, notas e financeiro. Controle total do sistema Sophie Link.
                </div>
                <span class="portal-btn portal-btn-orange">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Acessar Painel
                </span>
            </a>

            <!-- AVA -->
            <a href="ava.php" class="portal-card portal-card-ava" id="portal-ava">
                <div class="portal-corner">
                    <svg class="portal-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
                <div class="portal-icon portal-icon-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div class="portal-tag">Ambiente Virtual</div>
                <div class="portal-name">AVA</div>
                <div class="portal-desc">
                    Acesse o Ambiente Virtual de Aprendizagem para atividades, conteúdos, avaliações e acompanhamento acadêmico.
                </div>
                <span class="portal-btn portal-btn-blue">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                    Acessar AVA
                </span>
            </a>

            <!-- Empresas -->
            <a href="empresas.php" class="portal-card portal-card-info" id="portal-empresas">
                <div class="portal-corner">
                    <svg class="portal-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
                <div class="portal-icon portal-icon-green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div class="portal-tag">Empresas Parceiras</div>
                <div class="portal-name">Empresas</div>
                <div class="portal-desc">
                    Portal para empresas parceiras visualizarem dados dos aprendizes vinculados, frequência e relatórios.
                </div>
                <span class="portal-btn portal-btn-green">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Portal Empresas
                </span>
            </a>

        </div>
    </div>
</section>

<!-- RECURSOS DO SISTEMA -->
<section class="section-features" id="sistema">
    <div class="section-inner">
        <div class="features-grid">

            <!-- Mockup visual -->
            <div class="features-mockup-wrap" style="position:relative; padding-bottom:30px; padding-right:30px;">
                <div class="features-mockup">
                    <div class="mockup-topbar">
                        <div class="mockup-dot" style="background:#ef4444"></div>
                        <div class="mockup-dot" style="background:#f59e0b"></div>
                        <div class="mockup-dot" style="background:#22c55e"></div>
                        <span style="font-size:0.72rem;color:var(--muted);margin-left:8px">Painel de Aprendizes — Sophie Link</span>
                    </div>
                    <div class="mockup-body">
                        <div class="mockup-row">
                            <div class="mockup-avatar">A</div>
                            <div style="flex:1">
                                <div class="mockup-name">Ana Paula Ferreira</div>
                                <div class="mockup-sub">Tech Solutions · contrato ativo até dez/2025</div>
                            </div>
                            <span class="mockup-badge mb-green">Cursando</span>
                        </div>
                        <div class="mockup-row">
                            <div class="mockup-avatar" style="background:#3B82F6">B</div>
                            <div style="flex:1">
                                <div class="mockup-name">Bruno Costa Lima</div>
                                <div class="mockup-sub">Construtora ABC · frequência 94%</div>
                            </div>
                            <span class="mockup-badge mb-orange">94% freq.</span>
                        </div>
                        <div class="mockup-row">
                            <div class="mockup-avatar" style="background:#22C55E">C</div>
                            <div style="flex:1">
                                <div class="mockup-name">Carla Souza Melo</div>
                                <div class="mockup-sub">Grupo SL · encerra em 30 dias</div>
                            </div>
                            <span class="mockup-badge mb-blue">Formando</span>
                        </div>
                        <div class="mockup-row" style="opacity:0.45">
                            <div class="mockup-avatar" style="background:#6B7280">D</div>
                            <div style="flex:1">
                                <div class="mockup-name">Diego Alves Santos</div>
                                <div class="mockup-sub">Metalúrgica Norte · ativo</div>
                            </div>
                            <span class="mockup-badge mb-green">Cursando</span>
                        </div>
                    </div>
                </div>
                <div class="glow-card">
                    <div>
                        <div class="glow-card-num">49</div>
                        <div class="glow-card-text">Empresas<br>Parceiras</div>
                    </div>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
            </div>

            <!-- Lista de recursos -->
            <div>
                <div class="section-label">Recursos do Sistema</div>
                <h2 class="section-title">Tudo em um só lugar</h2>
                <p class="section-subtitle">O Sophie Link oferece controle total sobre todos os aspectos da gestão de aprendizes.</p>

                <div class="features-list">
                    <div class="feature-item">
                        <div class="feature-item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
                        <div>
                            <div class="feature-item-title">Gestão Completa de Aprendizes</div>
                            <div class="feature-item-desc">Dados pessoais, documentos, filiação, empresa vinculada e datas de contrato em um único cadastro.</div>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
                        <div>
                            <div class="feature-item-title">Controle de Frequência e Notas</div>
                            <div class="feature-item-desc">Registro de presença e desempenho com alertas para frequência abaixo do mínimo.</div>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div>
                        <div>
                            <div class="feature-item-title">Financeiro e Pagamentos</div>
                            <div class="feature-item-desc">Controle de repasses, pendências e histórico financeiro por empresa parceira.</div>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-item-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
                        <div>
                            <div class="feature-item-title">Relatórios em PDF</div>
                            <div class="feature-item-desc">Gere relatórios profissionais com identidade visual Sophie Link para envio e arquivamento.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer id="sobre">
    <div class="footer-inner">
        <a href="home.php" class="footer-brand">
            <div class="nav-brand-icon" style="width:30px;height:30px;border-radius:6px">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <span style="font-family:'Teko',sans-serif;font-size:1.3rem;font-weight:600;letter-spacing:2px;color:var(--white)"><span style="color:var(--orange)">Sophie</span> Link</span>
        </a>
        <span class="footer-copy">© <?= date('Y') ?> Sophie Link — Todos os direitos reservados.</span>
        <div class="footer-links">
            <a href="dashboard.php">Admin</a>
            <a href="aprendizes.php">Aprendizes</a>
            <a href="empresas.php">Empresas</a>
        </div>
    </div>
</footer>

<script>
    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => document.getElementById('preloader').classList.add('hide'), 1200);
    });

    // Animações de entrada com IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.portal-card, .feature-item').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.animationDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
</script>

<style>
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
</style>
</body>
</html>
