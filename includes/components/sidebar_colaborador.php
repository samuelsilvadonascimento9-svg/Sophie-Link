<?php
// includes/components/sidebar_colaborador.php
// Componente reutilizável: Sidebar do Portal do Colaborador
// Variáveis necessárias no escopo pai: $primeiroNome, $iniciais, $faltasPendentes
?>
<aside class="sidebar">
    <div class="sb-header">
        <div class="sb-logo-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        </div>
        <div>
            <div class="sb-brand">Sophie<span>Link</span></div>
        </div>
    </div>

    <nav class="sb-menu">
        <!-- Gestão -->
        <div class="sb-section-group" id="group-gestao">
            <div class="sb-section-label" onclick="this.parentElement.classList.toggle('collapsed')">
                Gestão <i data-lucide="chevron-down"></i>
            </div>
            <div class="sb-section-content">
                <div class="nav-link active" id="nav-alunos" onclick="showSec('alunos', this)">
                    <i data-lucide="users"></i> Alunos
                </div>
                <div class="nav-link" id="nav-documentos" onclick="showSec('documentos', this)">
                    <i data-lucide="file-text"></i> Declarações
                </div>
                <div class="nav-link" id="nav-faltas" onclick="showSec('faltas', this)">
                    <i data-lucide="user-x"></i> Justificar Faltas
                    <?php if (($faltasPendentes ?? 0) > 0): ?>
                        <span class="nav-badge"><?= $faltasPendentes ?></span>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Cadastros -->
        <div class="sb-section-group collapsed" id="group-cadastros">
            <div class="sb-section-label" onclick="this.parentElement.classList.toggle('collapsed')">
                Cadastros <i data-lucide="chevron-down"></i>
            </div>
            <div class="sb-section-content">
                <div class="nav-link" id="nav-matricular" onclick="showSec('matricular', this)">
                    <i data-lucide="user-plus"></i> Matricular Aluno
                </div>
                <div class="nav-link" id="nav-professores" onclick="showSec('professores', this)">
                    <i data-lucide="graduation-cap"></i> Professores
                </div>
                <div class="nav-link" id="nav-empresas" onclick="showSec('empresas', this)">
                    <i data-lucide="briefcase"></i> Empresas
                </div>
            </div>
        </div>

        <!-- Planejamento -->
        <div class="sb-section-group collapsed" id="group-planejamento">
            <div class="sb-section-label" onclick="this.parentElement.classList.toggle('collapsed')">
                Planejamento <i data-lucide="chevron-down"></i>
            </div>
            <div class="sb-section-content">
                <div class="nav-link" id="nav-calendario" onclick="showSec('calendario', this)">
                    <i data-lucide="calendar"></i> Calendário Letivo
                </div>
            </div>
        </div>
    </nav>

    <div class="sb-footer">
        <div class="sb-user">
            <div class="sb-avatar"><?= $iniciais ?? '?' ?></div>
            <div>
                <div class="sb-uname"><?= htmlspecialchars($primeiroNome ?? 'Colaborador') ?></div>
                <div class="sb-urole">Apoio Administrativo</div>
            </div>
            <a href="../auth/logout.php" class="sb-logout" title="Sair">
                <i data-lucide="log-out"></i>
            </a>
        </div>
    </div>
</aside>
