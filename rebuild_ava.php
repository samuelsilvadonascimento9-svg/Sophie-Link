<?php
$content = file_get_contents('public/portais/ava.php');

// 1. Variáveis globais
$content = str_replace(
'    $disciplinasAluno = [];
    $percPresenca = 100;',
'    $disciplinasAluno = [];
    $avisosTurma = [];
    $proximosEventos = [];
    $percPresenca = 100;', $content);

// 2. Subnav e Portal do Aluno
$content = str_replace(
'    <div class="subnav-sep"></div>
    <a href="portal_aluno.php" class="subnav-link">Portal do aluno</a>',
'    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-notas" onclick="showSec(\'notas\')">Boletim</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-frequencia" onclick="showSec(\'frequencia\')">Frequência</span>
    <div class="subnav-sep"></div>
    <a href="aluno.php" class="subnav-link">Portal do aluno</a>', $content);

// 3. Toasts
$content = str_replace('<script src="../assets/js/a11y.js" defer></script>', '<link rel="stylesheet" href="../assets/css/toast.css">' . "\n    " . '<script src="../assets/js/a11y.js" defer></script>' . "\n    " . '<script src="../assets/js/toast.js" defer></script>', $content);

$modal_toast = '
<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE
     ================================================================ -->
<div id="delivery-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:var(--c-bg);width:100%;max-width:400px;border-radius:var(--radius);box-shadow:0 10px 25px rgba(0,0,0,0.2);overflow:hidden;">
        <div style="padding:15px 20px;border-bottom:1px solid var(--c-border);display:flex;justify-content:space-between;align-items:center;">
            <div style="font-weight:700;color:var(--c-brand);">Entregar Trabalho</div>
            <button onclick="closeDeliveryModal()" style="background:none;border:none;cursor:pointer;color:var(--c-text-muted);"><i data-lucide="x" style="width:20px;height:20px;"></i></button>
        </div>
        <form action="entregar_atividade.php" method="POST" enctype="multipart/form-data" style="padding:20px;">
            <input type="hidden" name="material_id" id="delivery-material-id" value="">
            <div style="margin-bottom:15px;font-size:0.85rem;color:var(--c-text);">
                Atividade: <strong id="delivery-title"></strong>
            </div>
            <div style="margin-bottom:20px;">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--c-text-muted);margin-bottom:8px;">Anexar Arquivo (PDF, DOCX, ZIP, JPG)</label>
                <input type="file" name="arquivo" required style="width:100%;padding:10px;border:1px dashed var(--c-border);border-radius:var(--radius);background:var(--c-bg-alt);color:var(--c-text);font-size:0.8rem;">
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px;">
                <button type="button" onclick="closeDeliveryModal()" style="padding:8px 15px;background:var(--c-bg-alt);border:1px solid var(--c-border);border-radius:var(--radius);color:var(--c-text);font-size:0.8rem;cursor:pointer;font-weight:600;">Cancelar</button>
                <button type="submit" style="padding:8px 15px;background:var(--c-brand);border:none;border-radius:var(--radius);color:#fff;font-size:0.8rem;cursor:pointer;font-weight:600;">Enviar Atividade</button>
            </div>
        </form>
    </div>
</div>
<script>
window.cursosAVA = <?= json_encode($cursosAVAData, JSON_UNESCAPED_UNICODE) ?>;
</script>
<script src="../assets/js/ava.js"></script>
<?php if(isset($_GET["success"]) && $_GET["success"] === "entrega"): ?>
<script>
document.addEventListener("DOMContentLoaded", () => {
    if(window.Toast) {
        Toast.show("Sua atividade foi entregue com sucesso e enviada ao professor!", "success");
    }
});
</script>
<?php endif; ?>
</body>';

$content = str_replace('<script>
window.cursosAVA = <?= json_encode($cursosAVAData, JSON_UNESCAPED_UNICODE) ?>;
</script>
<script src="../assets/js/ava.js"></script>
</body>', $modal_toast, $content);

// 4. Estrutura do Layout
$content = str_replace(
'<div id="sec-home" class="page-section active">
<div class="page-wrap">
    <div class="main-grid">

        <!-- ======================== COLUNA ESQUERDA ======================== -->
        <div>', 
'<div class="page-wrap">
    <div class="main-grid" style="align-items: stretch;">

        <!-- ======================== COLUNA ESQUERDA (TODAS AS SEÇÕES) ======================== -->
        <div id="coluna-esquerda" style="min-width:0; background:var(--c-surface); border-radius:8px; border:1px solid var(--c-border-lt); padding: 1.5rem; display:flex; flex-direction:column; gap:1.5rem;">
            
            <!-- CONTEÚDO PRINCIPAL — HOME -->
            <div id="sec-home" class="page-section active">', 
$content);

// Substitui o primeiro /col-esquerda
$content = str_replace('        </div><!-- /col-esquerda -->', '        </div><!-- /fim conteudo sec-home -->', $content);

// Pegamos o interior de colDireita
$startDireita = strpos($content, '        <!-- ======================== COLUNA DIREITA ======================== -->');
$endHome = strpos($content, '</div><!-- /sec-home -->', $startDireita) + strlen('</div><!-- /sec-home -->');

// Cortamos o fim original
$newFimSecHome = '            </div><!-- /sec-home -->';
$blocoDireitaEFinalHome = substr($content, $startDireita, $endHome - $startDireita);
$content = substr_replace($content, $newFimSecHome, $startDireita, $endHome - $startDireita);

// Pegamos apenas a parte da direita
$startD = strpos($blocoDireitaEFinalHome, '        <!-- ======================== COLUNA DIREITA ======================== -->');
$endD = strpos($blocoDireitaEFinalHome, '        </div><!-- /col-direita -->') + strlen('        </div><!-- /col-direita -->');
$apenasColunaDireita = substr($blocoDireitaEFinalHome, $startD, $endD - $startD);

// Agora vamos colocar a coluna direita ANTES do modal
$finalSections = '<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE';

$fechamentoMainGrid = '
        </div><!-- /Fim coluna-esquerda -->

' . $apenasColunaDireita . '

    </div><!-- /main-grid -->
</div><!-- /page-wrap -->

';

$content = str_replace($finalSections, $fechamentoMainGrid . $finalSections, $content);

// Limpar page-wraps das seções
$content = preg_replace('/<div id="sec-([^"]+)" class="page-section">\s*<div class="page-wrap"( style="[^"]*")?>/', '<div id="sec-$1" class="page-section">', $content);
// Limpar fechamentos duplicados
$content = str_replace("</div>\n</div>\n\n<!-- ====", "</div>\n\n<!-- ====", $content);

// Frequencia Summary and Boletim link (which were lost)
$content = str_replace(
'<!-- Progresso dos módulos -->
            <div class="panel">',
'<!-- FREQUÊNCIA RESUMO -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="check-circle" style="width:15px;height:15px;color:var(--c-green);"></i>
                        Sua Frequência Escolar
                    </div>
                </div>
                <div style="padding:1.5rem; display:flex; align-items:center; gap:15px;">
                    <div style="width:60px; height:60px; border-radius:50%; border:4px solid <?= $percPresenca >= 75 ? \'var(--c-green)\' : \'var(--c-red)\' ?>; display:flex; align-items:center; justify-content:center; font-size:1.2rem; font-weight:800; color:var(--c-text);">
                        <?= $percPresenca ?>%
                    </div>
                    <div>
                        <div style="font-size:0.85rem; font-weight:700; color:var(--c-text); margin-bottom:4px;">
                            <?= $percPresenca >= 75 ? \'Situação Regular\' : \'Atenção às Faltas!\' ?>
                        </div>
                        <div style="font-size:0.75rem; color:var(--c-text-muted); line-height:1.4;">
                            Mantenha sua presença acima de 75% para não ser reprovado.
                        </div>
                        <a href="#" onclick="showSec(\'frequencia\'); return false;" style="display:inline-block; margin-top:8px; font-size:0.75rem; color:var(--c-brand); font-weight:600; text-decoration:none;">Ver Detalhes →</a>
                    </div>
                </div>
            </div>

            <!-- Progresso dos módulos -->
            <div class="panel">', $content);

$content = str_replace(
'<?php endif; ?>
                </div>
            </div>

            <!-- CALENDÁRIO -->',
'<?php endif; ?>
                </div>
                <div style="padding:10px 1rem; border-top:1px solid var(--c-border-lt); text-align:center;">
                    <a href="#" onclick="showSec(\'notas\'); return false;" style="font-size:0.75rem; color:var(--c-brand); font-weight:600; text-decoration:none;">Ver Boletim Completo →</a>
                </div>
            </div>

            <!-- CALENDÁRIO -->', $content);

// $mesesCurtos fix
$content = str_replace(
'<?php foreach ($proximosEventos as $e): 
            $m = (int)date(\'n\', strtotime($e[\'data_entrega\'])) - 1;',
'<?php 
        $mesesCurtos = [\'Jan\',\'Fev\',\'Mar\',\'Abr\',\'Mai\',\'Jun\',\'Jul\',\'Ago\',\'Set\',\'Out\',\'Nov\',\'Dez\'];
        foreach ($proximosEventos as $e): 
            $m = (int)date(\'n\', strtotime($e[\'data_entrega\'])) - 1;', $content);

file_put_contents('public/portais/ava.php', $content);
echo "Recuperado e Refatorado!\n";
