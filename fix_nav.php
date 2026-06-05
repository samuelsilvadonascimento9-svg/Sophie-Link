<?php
$f = 'public/portais/ava.php';
$content = file_get_contents($f);

// 1. Fix the top navbar Mensagens button
$content = str_replace(
    '<button class="tn-icon-btn" title="Mensagens">',
    '<button class="tn-icon-btn" title="Mensagens" onclick="showSec(\'mensagens\')">',
    $content
);

// 2. Fix the subnav links
$oldSubnav = <<<HTML
    <span class="subnav-link">Publicações</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link">Ajuda do ava</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link">Descobrir</span>
HTML;
$newSubnav = <<<HTML
    <span class="subnav-link" onclick="showSec('notas')">Boletim</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('frequencia')">Frequência</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('publicacoes')">Publicações</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('ajuda')">Ajuda</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" onclick="showSec('descobrir')">Descobrir</span>
HTML;

$content = str_replace($oldSubnav, $newSubnav, $content);

// 3. Add the new dummy sections at the end of the sections but before the modal
$dummySections = <<<HTML
<!-- ================================================================
     SEÇÃO: PUBLICAÇÕES / FEED
     ================================================================ -->
<div id="sec-publicacoes" class="page-section">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="message-square" style="width:15px;height:15px;color:var(--c-brand);"></i> Publicações da Turma</div></div>
        <div style="padding:2rem;text-align:center;color:var(--c-text-muted);">
            <i data-lucide="globe" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
            As publicações e fóruns de discussão estarão disponíveis em breve.
        </div>
    </div>
</div>

<!-- ================================================================
     SEÇÃO: AJUDA
     ================================================================ -->
<div id="sec-ajuda" class="page-section">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="help-circle" style="width:15px;height:15px;color:var(--c-brand);"></i> Central de Ajuda</div></div>
        <div style="padding:1.5rem;color:var(--c-text);">
            <p>Precisa de ajuda com o AVA? Entre em contato com o suporte técnico da Sophie Link ou fale com a coordenação.</p>
            <p style="margin-top:10px;"><strong>E-mail:</strong> suporte@sophielink.com.br</p>
        </div>
    </div>
</div>

<!-- ================================================================
     SEÇÃO: DESCOBRIR
     ================================================================ -->
<div id="sec-descobrir" class="page-section">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="compass" style="width:15px;height:15px;color:var(--c-brand);"></i> Descobrir Novos Cursos</div></div>
        <div style="padding:2rem;text-align:center;color:var(--c-text-muted);">
            <i data-lucide="search" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
            Explore nossa vitrine de cursos extracurriculares aqui.
        </div>
    </div>
</div>

<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE
     ================================================================ -->
HTML;

$content = str_replace(
    '<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE
     ================================================================ -->',
    $dummySections,
    $content
);

file_put_contents($f, $content);
echo "Navigation Fixed!";
