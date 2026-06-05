<?php
$f = 'public/portais/ava.php';
$content = file_get_contents($f);

// 1. Fix PHP logic at the top (Restore avisosTurma and proximosEventos)
$content = str_replace(
    '$disciplinasAluno = [];',
    "\$disciplinasAluno = [];\n    \$avisosTurma = [];\n    \$proximosEventos = [];",
    $content
);
$content = str_replace(
    '$atividadesAluno  = [];',
    "\$atividadesAluno  = [];\n    \$avisosTurma = [];\n    \$proximosEventos = [];",
    $content
);
$content = str_replace(
    "if (in_array(\$tipo_mat, ['pdf', 'aviso']))    \$materiaisAluno[]  = \$mat;\n            if (\$tipo_mat === 'atividade')                 \$atividadesAluno[] = \$mat;",
    "if (in_array(\$tipo_mat, ['pdf', 'aviso']))    \$materiaisAluno[]  = \$mat;\n            if (\$tipo_mat === 'atividade')                 \$atividadesAluno[] = \$mat;\n            if (\$tipo_mat === 'aviso')                     \$avisosTurma[]     = \$mat;\n            if (!empty(\$mat['data_entrega']) && \$mat['data_entrega'] >= date('Y-m-d')) {\n                \$proximosEventos[] = \$mat;\n            }",
    $content
);
$content = str_replace(
    "// Busca os simulados da IA para a turma",
    "usort(\$proximosEventos, fn(\$a, \$b) => strcmp(\$a['data_entrega'], \$b['data_entrega']));\n\n        // Busca os simulados da IA para a turma",
    $content
);

// 2. Fix the HTML layout broken by the user
// The user has:
//         </div><!-- /fim conteudo sec-home -->
//
//             </div><!-- /sec-home -->

// We want to insert the col-direita and close the page-wrap and main-grid correctly.
$colDireita = <<<HTML
        </div><!-- /col-esquerda -->

        <!-- ======================== COLUNA DIREITA ======================== -->
        <div>

            <!-- AVISOS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="megaphone" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Avisos
                    </div>
                </div>
                <div class="avisos-body">
                    <?php if (empty(\$avisosTurma)): ?>
                    <div style="padding:1.5rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">
                        <i data-lucide="inbox" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
                        Nenhum aviso no momento.
                    </div>
                    <?php else: ?>
                    <div class="aviso-carousel">
                        <?php foreach (array_values(\$avisosTurma) as \$idx => \$aviso): ?>
                        <div class="aviso-slide <?= \$idx === 0 ? 'active' : '' ?>">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title"><?= htmlspecialchars(\$aviso['titulo']) ?></div>
                                <?= nl2br(htmlspecialchars(\$aviso['descricao'])) ?>
                                <div style="font-size:0.65rem;color:var(--c-text-muted);margin-top:8px;">
                                    <?= date('d/m/Y', strtotime(\$aviso['criado_em'])) ?> &bull; <?= htmlspecialchars(\$aviso['disciplina_nome'] ?? 'Geral') ?>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php if (count(\$avisosTurma) > 1): ?>
                    <div class="aviso-nav">
                        <button class="aviso-btn" onclick="avisoNav(-1)"><i data-lucide="chevron-left"></i></button>
                        <div class="aviso-dots" id="aviso-dots">
                            <?php foreach (array_values(\$avisosTurma) as \$idx => \$aviso): ?>
                            <div class="aviso-dot <?= \$idx === 0 ? 'active' : '' ?>" onclick="avisoGo(<?= \$idx ?>)"></div>
                            <?php endforeach; ?>
                        </div>
                        <button class="aviso-btn" onclick="avisoNav(1)"><i data-lucide="chevron-right"></i></button>
                    </div>
                    <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>

            <!-- FREQUÊNCIA RESUMO -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="check-circle" style="width:15px;height:15px;color:var(--c-green);"></i>
                        Sua Frequência Escolar
                    </div>
                </div>
                <div style="padding:1.5rem; display:flex; align-items:center; gap:15px;">
                    <div style="width:60px; height:60px; border-radius:50%; border:4px solid <?= \$percPresenca >= 75 ? 'var(--c-green)' : 'var(--c-red)' ?>; display:flex; align-items:center; justify-content:center; font-size:1.2rem; font-weight:800; color:var(--c-text);">
                        <?= \$percPresenca ?>%
                    </div>
                    <div>
                        <div style="font-size:0.85rem; font-weight:700; color:var(--c-text); margin-bottom:4px;">
                            <?= \$percPresenca >= 75 ? 'Situação Regular' : 'Atenção às Faltas!' ?>
                        </div>
                        <div style="font-size:0.75rem; color:var(--c-text-muted); line-height:1.4;">
                            Mantenha sua presença acima de 75% para não ser reprovado.
                        </div>
                    </div>
                </div>
            </div>

        </div><!-- /col-direita -->

    </div><!-- /main-grid -->
</div><!-- /page-wrap -->
</div><!-- /sec-home -->
HTML;

$content = preg_replace('#</div><!-- /fim conteudo sec-home -->\s*</div><!-- /sec-home -->#s', $colDireita, $content);

// 3. Add back the missing delivery modal at the bottom of the body
$modalHtml = <<<HTML
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
HTML;
$content = str_replace('<script>', $modalHtml, $content);

file_put_contents($f, $content);
echo "AVA Fixed!";
