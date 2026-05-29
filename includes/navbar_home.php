<?php
/**
 * Navbar pública da Home (Landing Page) — Sophie Link
 * Apenas o menu hambúrguer à esquerda e a logo à direita/centro.
 * Uso: <?php include 'includes/navbar_home.php'; ?>
 */
?>

<!-- ============================================================
     ESTILOS DA NAVBAR HOME (Minimalista)
     ============================================================ -->
<style>
/* ---------- Variáveis ---------- */
:root {
    --orange:       #FF7A00;
    --black:        #0A0A0A;
    --white:        #FFFFFF;
    --border:       rgba(255,255,255,0.08);
}

/* ---------- Navbar base ---------- */
.hn-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem;
    background: transparent;
    transition: background 0.4s, backdrop-filter 0.4s, border-bottom-color 0.4s;
    border-bottom: 1px solid transparent;
}
.hn-bar.hn-scrolled {
    background: rgba(10,10,10,0.93);
    backdrop-filter: blur(18px);
    border-bottom-color: var(--border);
}

/* ---------- Hambúrguer (Esquerda) ---------- */
.hn-menu-toggle {
    display: flex; align-items: center; gap: 10px;
    background: none; border: none; cursor: pointer;
    color: var(--white); font-family: 'Inter', sans-serif;
    font-size: 1rem; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; transition: color 0.2s;
}
.hn-menu-toggle:hover { color: var(--orange); }
.hn-menu-toggle svg { width: 32px; height: 32px; }

/* ---------- Logo / Brand (Direita) ---------- */
.hn-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none;
}
.hn-brand-icon {
    width: 40px; height: 40px; border-radius: 8px;
    background: var(--orange);
    display: flex; align-items: center; justify-content: center;
}
.hn-brand-name {
    font-family: 'Teko', sans-serif;
    font-size: 2rem; font-weight: 600;
    letter-spacing: 2px; color: var(--white);
    line-height: 1;
}
.hn-brand-name em { font-style:normal; color: var(--orange); }

/* ---------- Responsivo ---------- */
@media (max-width: 768px) {
    .hn-bar { padding: 0 1.5rem; height: 70px; }
    .hn-menu-toggle span { display: none; /* Esconde o texto "MENU" no mobile */ }
}
</style>

<!-- ============================================================
     NAVBAR MARKUP
     ============================================================ -->
<nav class="hn-bar" id="hn-bar">

    <!-- Brand à esquerda -->
    <a href="index.php" class="hn-brand">
        <div class="hn-brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        </div>
        <span class="hn-brand-name"><em>Sophie</em> Link</span>
    </a>

    <!-- Hambúrguer à direita -->
    <button class="hn-menu-toggle" onclick="hnToggleMobile()">
        <span>Menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
    </button>

</nav>

<!-- ============================================================
     SCRIPT DA NAVBAR
     ============================================================ -->
<script>
    // Scroll: adiciona classe .hn-scrolled
    (function(){
        const bar = document.getElementById('hn-bar');
        if (!bar) return;
        const check = () => bar.classList.toggle('hn-scrolled', window.scrollY > 30);
        window.addEventListener('scroll', check, { passive: true });
        check();
    })();
</script>
