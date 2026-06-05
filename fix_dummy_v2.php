<?php
$f = 'public/portais/ava.php';
$content = file_get_contents($f);

$dummySectionsNew = <<<HTML
<!-- ================================================================
     SEÇÃO: PUBLICAÇÕES / FEED
     ================================================================ -->
<div id="sec-publicacoes" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="background:#fff;border:1px solid #ccc;padding:20px;border-radius:8px;">
        <div class="panel-head" style="font-size:1.2rem;font-weight:bold;margin-bottom:15px;"><i data-lucide="message-square" style="width:15px;height:15px;color:var(--c-brand);"></i> Publicações da Turma</div>
        <div style="text-align:center;color:#333;">
            <i data-lucide="globe" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
            As publicações e fóruns de discussão estarão disponíveis em breve.
        </div>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: AJUDA
     ================================================================ -->
<div id="sec-ajuda" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="background:#fff;border:1px solid #ccc;padding:20px;border-radius:8px;">
        <div class="panel-head" style="font-size:1.2rem;font-weight:bold;margin-bottom:15px;"><i data-lucide="help-circle" style="width:15px;height:15px;color:var(--c-brand);"></i> Central de Ajuda</div>
        <div style="color:#333;">
            <p>Precisa de ajuda com o AVA? Entre em contato com o suporte técnico da Sophie Link ou fale com a coordenação.</p>
            <p style="margin-top:10px;"><strong>E-mail:</strong> suporte@sophielink.com.br</p>
        </div>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: DESCOBRIR
     ================================================================ -->
<div id="sec-descobrir" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="background:#fff;border:1px solid #ccc;padding:20px;border-radius:8px;">
        <div class="panel-head" style="font-size:1.2rem;font-weight:bold;margin-bottom:15px;"><i data-lucide="compass" style="width:15px;height:15px;color:var(--c-brand);"></i> Descobrir Novos Cursos</div>
        <div style="text-align:center;color:#333;">
            <i data-lucide="search" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
            Explore nossa vitrine de cursos extracurriculares aqui.
        </div>
    </div>
</div>
</div>

<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE
     ================================================================ -->
HTML;

$content = preg_replace('/<!-- ================================================================\s*SEÇÃO: PUBLICAÇÕES \/ FEED.*?<!-- ================================================================\s*MODAL DE ENTREGA DE ATIVIDADE\s*================================================================ -->/s', $dummySectionsNew, $content);

file_put_contents($f, $content);
echo "Substituição forçada aplicada!";
