<?php
/**
 * Navbar específica do AVA — Sophie Link
 */
?>
<nav class="ava-navbar">
    <!-- Brand / Logo -->
    <a href="ava.php" class="ava-brand">
        <div class="ava-brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <div class="ava-brand-text">SOPHIE<span>LINK</span></div>
        <div class="ava-brand-sub">AMBIENTE VIRTUAL DE APRENDIZAGEM</div>
    </a>

    <!-- Ações e Perfil -->
    <div class="ava-nav-actions">
        


        <!-- Mensagens -->
        <button class="ava-icon-btn" title="Mensagens">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>

        <!-- Configurações -->
        <div style="position: relative; display: inline-block;">
            <button class="ava-icon-btn" title="Configurações" onclick="document.getElementById('configDropdown').style.display = document.getElementById('configDropdown').style.display === 'block' ? 'none' : 'block'; event.stopPropagation();">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
            <div id="configDropdown" style="display: none; position: absolute; right: 0; top: 40px; background: white; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); width: 220px; z-index: 1000; overflow: hidden; text-align: left;">
                <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Meu Perfil
                </a>
                <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Alterar Senha
                </a>
                <a href="#" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; color: #1E293B; text-decoration: none; font-size: 0.85rem; transition: background 0.2s;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Modo Escuro
                    </div>
                    <!-- Toggle switch dummy -->
                    <div style="width: 32px; height: 18px; background: #E2E8F0; border-radius: 9px; position: relative;">
                        <div style="width: 14px; height: 14px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.2);"></div>
                    </div>
                </a>
            </div>
        </div>

        <!-- Perfil do Usuário -->
        <div class="ava-profile">
            <div class="ava-avatar">A</div>
            <span class="ava-profile-name">Aprendiz Teste</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
    </div>
</nav>
