<?php
/**
 * Menu Mobile público da Home — Sophie Link
 * Estilo UNIAENE (Off-canvas branco à direita)
 * Uso: <?php include 'includes/mobile_menu_home.php'; ?>
 */
?>

<style>
/* Fundo escuro atrás do menu (Overlay) */
.hn-mobile-overlay {
    position: fixed; inset: 0; z-index: 1001;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
}
.hn-mobile-overlay.hn-mm-open {
    opacity: 1; pointer-events: all;
}

/* Painel lateral branco (Menu) */
.hn-mobile-menu {
    position: fixed; top: 0; right: 0; bottom: 0; z-index: 1002;
    width: 100%; max-width: 400px;
    background: #FFFFFF; color: #000000;
    transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
    display: flex; flex-direction: column;
    box-shadow: -10px 0 30px rgba(0,0,0,0.2);
    overflow-y: auto;
}
.hn-mobile-menu.hn-mm-open {
    transform: translateX(0);
}

/* Topo do menu (Botão Fechar) */
.hn-mm-header {
    display: flex; justify-content: flex-end; align-items: center;
    padding: 1.5rem 1.5rem 1rem;
}
.hn-mm-close {
    display: flex; align-items: center; gap: 8px;
    background: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: 800;
    color: #000; padding: 5px;
}
.hn-mm-close svg { width: 24px; height: 24px; }

/* Logo centralizada */
.hn-mm-logo-area {
    display: flex; flex-direction: column; align-items: center;
    padding: 0 1.5rem 2rem;
}
.hn-mm-logo-icon {
    width: 48px; height: 48px; border-radius: 12px;
    background: var(--orange); display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
}
.hn-mm-logo-text {
    font-family: 'Teko', sans-serif; font-size: 2.8rem; font-weight: 700;
    line-height: 1; letter-spacing: 2px; color: #02254B; /* Azul escuro inspirado */
}
.hn-mm-logo-text span { color: var(--orange); }
.hn-mm-logo-sub {
    font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 700;
    letter-spacing: 3px; color: #02254B; text-transform: uppercase;
    text-align: center; margin-top: 8px; line-height: 1.4;
}

/* Lista de Links */
.hn-mm-body {
    flex: 1; padding: 0 2rem;
    display: flex; flex-direction: column; gap: 1.25rem;
}
.hn-mm-link {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Inter', sans-serif; font-size: 1.4rem; font-weight: 800;
    text-decoration: none; color: #000000;
    transition: color 0.2s;
}
.hn-mm-link:hover, .hn-mm-link:active { color: var(--orange); }
.hn-mm-link svg { width: 16px; height: 16px; color: #666; stroke-width: 3px; }

/* Separador */
.hn-mm-divider {
    height: 1px; background: #EEEEEE; margin: 0.5rem 0;
}

/* Botões de Ação Especiais no Menu */
.hn-mm-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px; border-radius: 8px;
    font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 700;
    text-decoration: none; text-align: center;
}
.hn-mm-btn-orange { background: var(--orange); color: #FFF; }
.hn-mm-btn-blue { background: rgba(59,130,246,0.15); color: #2563EB; border: 1px solid rgba(59,130,246,0.3); }

/* Rodapé do Menu (Redes sociais e Copyright) */
.hn-mm-footer {
    padding: 2rem; margin-top: 2rem;
}
.hn-mm-social {
    display: flex; gap: 12px; margin-bottom: 1.5rem;
}
.hn-mm-social-icon {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid #DDDDDD; display: flex; align-items: center; justify-content: center;
    color: #000; text-decoration: none; transition: all 0.2s;
}
.hn-mm-social-icon.whatsapp { background: #25D366; color: white; border-color: #25D366; }
.hn-mm-social-icon:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

.hn-mm-copy {
    font-family: 'Inter', sans-serif; font-size: 0.7rem; color: #666666;
    line-height: 1.5;
}
.hn-mm-copy strong { color: #000; font-weight: 800; }
</style>

<!-- Overlay -->
<div class="hn-mobile-overlay" id="hn-mobile-overlay" onclick="hnToggleMobile()"></div>

<!-- Painel Lateral -->
<div class="hn-mobile-menu" id="hn-mobile-menu">
    
    <div class="hn-mm-header">
        <button class="hn-mm-close" onclick="hnToggleMobile()">
            menu
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    </div>

    <div class="hn-mm-logo-area">
        <div class="hn-mm-logo-text">SOPHIE<span>LINK</span></div>
        <div class="hn-mm-logo-sub">
            SISTEMA PROFISSIONAL DE GESTÃO<br>DE APRENDIZES
        </div>
    </div>

    <div class="hn-mm-body">
        <a href="home.php" class="hn-mm-link" onclick="hnToggleMobile()">Início</a>
        
        <a href="#portais" class="hn-mm-link" onclick="hnToggleMobile()">
            Portais
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        
        <a href="#sistema" class="hn-mm-link" onclick="hnToggleMobile()">
            Recursos do Sistema
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        
        <a href="#sobre" class="hn-mm-link" onclick="hnToggleMobile()">Sobre</a>

        <div class="hn-mm-divider"></div>

        <?php if (basename($_SERVER['PHP_SELF']) !== 'login.php'): ?>
            <a href="login.php" class="hn-mm-link" onclick="hnToggleMobile()">Entrar (Login)</a>
        <?php endif; ?>
        
        <a href="ava.php" class="hn-mm-btn hn-mm-btn-blue" onclick="hnToggleMobile()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            Acessar AVA
        </a>
        
        <a href="dashboard.php" class="hn-mm-btn hn-mm-btn-orange" onclick="hnToggleMobile()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Painel Administrativo
        </a>
    </div>

    <div class="hn-mm-footer">
        <div class="hn-mm-social">
            <a href="#" class="hn-mm-social-icon whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="#" class="hn-mm-social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="hn-mm-social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
        </div>
        <div class="hn-mm-copy">
            © <?= date('Y') ?> <strong>SOPHIE LINK</strong>.<br>TODOS OS DIREITOS RESERVADOS.
        </div>
    </div>
</div>

<script>
// Ajuste na função hnToggleMobile para controlar overlay e painel
function hnToggleMobile() {
    const mm = document.getElementById('hn-mobile-menu');
    const overlay = document.getElementById('hn-mobile-overlay');
    
    if (mm) mm.classList.toggle('hn-mm-open');
    if (overlay) overlay.classList.toggle('hn-mm-open');
    
    // Trava o scroll do body
    if (mm && mm.classList.contains('hn-mm-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}
</script>
