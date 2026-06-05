<?php
$content = file_get_contents('public/portais/ava.php');

// 1. Mudar o wrap principal para fora do sec-home
$content = str_replace(
'<div id="sec-home" class="page-section active">
<div class="page-wrap">
    <div class="main-grid">

        <!-- ======================== COLUNA ESQUERDA ======================== -->
        <div>', 
'<div class="page-wrap">
    <div class="main-grid">

        <!-- ======================== COLUNA ESQUERDA (TODAS AS SEÇÕES) ======================== -->
        <div id="coluna-esquerda" style="min-width:0;">
            
            <!-- CONTEÚDO PRINCIPAL — HOME -->
            <div id="sec-home" class="page-section active">', 
$content);

// 2. Localizar a coluna direita e extraí-la
$startDireita = strpos($content, '        <!-- ======================== COLUNA DIREITA ======================== -->');
$endHome = strpos($content, '</div><!-- /sec-home -->', $startDireita) + strlen('</div><!-- /sec-home -->');

$colDireitaBloco = substr($content, $startDireita, $endHome - $startDireita);

// Extrair a div da coluna direita do bloco
// $colDireitaBloco começa no comment e termina no /sec-home
// Vamos substituir o fim do sec-home para fechar apena o sec-home e extrair a coluna direita

$newFimSecHome = '            </div><!-- /sec-home -->';
$content = substr_replace($content, $newFimSecHome, $startDireita, $endHome - $startDireita);

// Agora a gente precisa pegar o interior de colDireitaBloco (tudo entre <!-- DIREITA e </div><!-- /col-direita -->)
$startD = strpos($colDireitaBloco, '        <!-- ======================== COLUNA DIREITA ======================== -->');
$endD = strpos($colDireitaBloco, '        </div><!-- /col-direita -->') + strlen('        </div><!-- /col-direita -->');
$apenasColunaDireita = substr($colDireitaBloco, $startD, $endD - $startD);

// 3. Inserir a coluna direita NO FINAL, antes dos modals
$finalSections = '<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE';

$fechamentoMainGrid = '
        </div><!-- /Fim coluna-esquerda -->

' . $apenasColunaDireita . '

    </div><!-- /main-grid -->
</div><!-- /page-wrap -->

';

$content = str_replace($finalSections, $fechamentoMainGrid . $finalSections, $content);

// 4. Remover page-wraps duplicados nas outras seções
$content = preg_replace('/<div id="sec-([^"]+)" class="page-section">\s*<div class="page-wrap"( style="[^"]*")?>/', '<div id="sec-$1" class="page-section">', $content);
// E remover o fechamento do page-wrap dessas seções
$content = str_replace("</div>\n</div>\n\n<!-- ====", "</div>\n\n<!-- ====", $content);

// 5. Arrumar IDs no subnav
$content = str_replace('<span class="subnav-link" onclick="showSec(\'notas\')">Boletim</span>', '<span class="subnav-link" id="snav-notas" onclick="showSec(\'notas\')">Boletim</span>', $content);
$content = str_replace('<span class="subnav-link" onclick="showSec(\'frequencia\')">Frequência</span>', '<span class="subnav-link" id="snav-frequencia" onclick="showSec(\'frequencia\')">Frequência</span>', $content);

file_put_contents('public/portais/ava.php', $content);
echo "Refatoração concluída!";
