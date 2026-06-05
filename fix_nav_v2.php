<?php
$f = 'public/portais/ava.php';
$content = file_get_contents($f);

// 1. Fix the top navbar Mensagens button
$content = preg_replace(
    '/<button class="tn-icon-btn" title="Mensagens">/',
    '<button class="tn-icon-btn" title="Mensagens" onclick="showSec(\'mensagens\')">',
    $content
);

// 2. Fix the subnav links
$newSubnav = <<<HTML
    <a href="portal_aluno.php" class="subnav-link">Portal do aluno</a>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-notas" onclick="showSec('notas')">Boletim</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-frequencia" onclick="showSec('frequencia')">Frequência</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-publicacoes" onclick="showSec('publicacoes')">Publicações</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-ajuda" onclick="showSec('ajuda')">Ajuda</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-descobrir" onclick="showSec('descobrir')">Descobrir</span>
HTML;

$content = preg_replace(
    '/<a href="portal_aluno\.php" class="subnav-link">Portal do aluno<\/a>\s*<div class="subnav-sep"><\/div>\s*<span class="subnav-link">Publicações<\/span>\s*<div class="subnav-sep"><\/div>\s*<span class="subnav-link">Ajuda do ava<\/span>\s*<div class="subnav-sep"><\/div>\s*<span class="subnav-link">Descobrir<\/span>/s',
    $newSubnav,
    $content
);

// 3. Add the dummy sections
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

if (strpos($content, 'id="sec-publicacoes"') === false) {
    $content = str_replace(
        '<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE
     ================================================================ -->',
        $dummySections,
        $content
    );
}

file_put_contents($f, $content);
echo "Navigation Fixed Properly!";
