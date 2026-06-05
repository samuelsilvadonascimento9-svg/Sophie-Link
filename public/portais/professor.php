<?php
// portal_professor.php — Portal do Professor | Sophie Link
session_start();
require_once '../../includes/auth.php';
protect_page(['professor', 'admin', 'coordenadora']);
$nome = $_SESSION['usuario_nome'] ?? 'Professor';
$primeiroNome = explode(' ', str_replace(['Prof. ','Dr. '], '', $nome))[0];

require_once '../../includes/db.php';
/** @var PDO $pdo */
$sucesso = '';
$erro    = '';

// ─── UPLOAD DIR ──────────────────────────────────────────────────────────────
$uploadDir = __DIR__ . '/../../public/uploads/ava/';
if (!is_dir($uploadDir)) { mkdir($uploadDir, 0755, true); }

// ─── DELETE MATERIAL ─────────────────────────────────────────────────────────
if (isset($_GET['del']) && is_numeric($_GET['del'])) {
    $delId = (int)$_GET['del'];
    $s = $pdo->prepare("SELECT arquivo_path, professor_id FROM ava_materiais WHERE id = ?");
    $s->execute([$delId]);
    $mat = $s->fetch();
    if ($mat && $mat['professor_id'] == $_SESSION['usuario_id']) {
        if ($mat['arquivo_path'] && file_exists(__DIR__ . '/../../' . $mat['arquivo_path'])) {
            unlink(__DIR__ . '/../../' . $mat['arquivo_path']);
        }
        $pdo->prepare("DELETE FROM ava_materiais WHERE id = ?")->execute([$delId]);
        $sucesso = 'Material removido com sucesso.';
    } else {
        $erro = 'Sem permissão para remover este material.';
    }
}

// ─── POST: PUBLICAR MATERIAL ─────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $acao = $_POST['acao'] ?? '';

        if ($acao === 'publicar_material') {
            $tipo     = $_POST['tipo']     ?? '';
            $titulo   = trim($_POST['titulo']   ?? '');
            $descricao = trim($_POST['descricao'] ?? '');
            $data_entrega = !empty($_POST['data_entrega']) ? $_POST['data_entrega'] : null;

            $parts    = explode('-', $_POST['disciplina_turma_id'] ?? '');
            $disc_id  = isset($parts[0]) ? (int)$parts[0] : null;
            $turma_id = isset($parts[1]) ? (int)$parts[1] : null;

            if (!$titulo) throw new Exception('Informe um título para o material.');
            if (!in_array($tipo, ['apresentacao','pdf','atividade','avaliacao','aviso'])) throw new Exception('Tipo inválido.');

            $arquivo_nome = null;
            $arquivo_path = null;

            // Upload de arquivo (PDF ou outros)
            if (!empty($_FILES['arquivo']['name'])) {
                $ext = strtolower(pathinfo($_FILES['arquivo']['name'], PATHINFO_EXTENSION));
                $allowed = ['pdf','doc','docx','ppt','pptx','xlsx','zip','jpg','png'];
                if (!in_array($ext, $allowed)) {
                    throw new Exception('Tipo de arquivo não permitido. Use: PDF, DOC, PPT, XLSX, ZIP ou imagem.');
                }
                if ($_FILES['arquivo']['size'] > 20 * 1024 * 1024) {
                    throw new Exception('Arquivo muito grande. Máximo: 20 MB.');
                }
                $arquivo_nome = $_FILES['arquivo']['name'];
                $arquivo_path = 'public/uploads/ava/' . uniqid('mat_') . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $arquivo_nome);
                $fullPath = __DIR__ . '/../../' . $arquivo_path;
                if (!move_uploaded_file($_FILES['arquivo']['tmp_name'], $fullPath)) {
                    throw new Exception('Falha ao salvar o arquivo. Verifique permissões do diretório.');
                }
            }

            $stmt = $pdo->prepare("
                INSERT INTO ava_materiais
                    (disciplina_id, turma_id, professor_id, tipo, titulo, descricao, arquivo_nome, arquivo_path, data_entrega)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$disc_id, $turma_id, $_SESSION['usuario_id'], $tipo, $titulo, $descricao, $arquivo_nome, $arquivo_path, $data_entrega]);
            $sucesso = 'Material "' . htmlspecialchars($titulo) . '" publicado com sucesso!';
        }

        if ($acao === 'lancar_frequencia') {
            $data_registro = $_POST['data_registro'];
            $parts   = explode('-', $_POST['disciplina_turma_id']);
            $disc_id = (int)$parts[0];
            foreach ($_POST as $key => $val) {
                if (strpos($key, 'freq_') === 0) {
                    $aluno_id = (int)str_replace('freq_', '', $key);
                    $status   = ($val === 'P') ? 'presente' : 'falta';
                    $entrada  = $_POST['entrada_' . $aluno_id] ?? null;
                    $saida    = $_POST['saida_'   . $aluno_id] ?? null;
                    if (empty($entrada)) $entrada = null;
                    if (empty($saida))   $saida   = null;
                    $stmt = $pdo->prepare("
                        INSERT INTO frequencia
                            (aprendiz_id, disciplina_id, data_registro, status, horario_entrada, horario_saida, registrado_por)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                            status = VALUES(status),
                            horario_entrada = VALUES(horario_entrada),
                            horario_saida   = VALUES(horario_saida),
                            registrado_por  = VALUES(registrado_por)
                    ");
                    $stmt->execute([$aluno_id, $disc_id, $data_registro, $status, $entrada, $saida, $_SESSION['usuario_id']]);
                }
            }
            $sucesso = 'Frequência lançada com sucesso!';
        }

        if ($acao === 'lancar_notas') {
            $atividade     = trim($_POST['atividade'] ?? '');
            $data_registro = date('Y-m-d');
            $parts   = explode('-', $_POST['disciplina_turma_id']);
            $disc_id = (int)$parts[0];
            if (!$atividade) throw new Exception('Informe o nome da atividade/prova.');
            foreach ($_POST as $key => $val) {
                if (strpos($key, 'nota_') === 0 && $val !== '') {
                    $aluno_id = (int)str_replace('nota_', '', $key);
                    $nota     = (float)$val;
                    if ($nota < 0 || $nota > 10) throw new Exception("Nota inválida para aluno #$aluno_id.");
                    $stmt = $pdo->prepare("
                        INSERT INTO notas
                            (aprendiz_id, disciplina_id, atividade, valor_nota, data_registro, registrado_por)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                            valor_nota     = VALUES(valor_nota),
                            data_registro  = VALUES(data_registro),
                            registrado_por = VALUES(registrado_por)
                    ");
                    $stmt->execute([$aluno_id, $disc_id, $atividade, $nota, $data_registro, $_SESSION['usuario_id']]);
                }
            }
            $sucesso = 'Notas lançadas com sucesso!';
        }

    } catch (Exception $e) {
        $erro = 'Erro: ' . $e->getMessage();
    }
}

// ─── TURMAS DO PROFESSOR ──────────────────────────────────────────────────────
$stmtTurmas = $pdo->prepare("
    SELECT pd.*, t.nome AS turma_nome, d.nome AS disciplina_nome, d.id AS disc_id, t.id AS turma_id
    FROM professor_disciplina pd
    JOIN turmas t ON t.id = pd.turma_id
    JOIN disciplinas d ON d.id = pd.disciplina_id
    WHERE pd.usuario_id = ?
");
$stmtTurmas->execute([$_SESSION['usuario_id']]);
$turmasProf = $stmtTurmas->fetchAll();

// ─── ALUNOS NAS TURMAS ────────────────────────────────────────────────────────
$alunosDb = [];
if (count($turmasProf) > 0) {
    $turmaIds = array_unique(array_column($turmasProf, 'turma_id'));
    $in  = str_repeat('?,', count($turmaIds) - 1) . '?';
    $stmt = $pdo->prepare("
        SELECT a.id, a.cpf, a.nome, a.turma_id, a.tipo, t.nome AS turma_nome
        FROM aprendizes a
        JOIN turmas t ON t.id = a.turma_id
        WHERE a.deleted_at IS NULL AND a.turma_id IN ($in)
        ORDER BY a.nome ASC
    ");
    $stmt->execute(array_values($turmaIds));
    $alunosDb = $stmt->fetchAll();
}

// ─── MATERIAIS POSTADOS PELO PROFESSOR ───────────────────────────────────────
$stmtMats = $pdo->prepare("
    SELECT m.*, d.nome AS disciplina_nome, t.nome AS turma_nome
    FROM ava_materiais m
    LEFT JOIN disciplinas d ON d.id = m.disciplina_id
    LEFT JOIN turmas t ON t.id = m.turma_id
    WHERE m.professor_id = ?
    ORDER BY m.criado_em DESC
");
$stmtMats->execute([$_SESSION['usuario_id']]);
$materiaisProf = $stmtMats->fetchAll();

// ─── GARGALOS DE ENSINO (IA) ────────────────────────────────────────────────
$stmtGargalos = $pdo->prepare("
    SELECT 
        q.id, q.enunciado, s.titulo AS simulado_titulo, d.nome AS disciplina_nome,
        COUNT(r.id) AS total_respostas,
        SUM(CASE WHEN r.correta = 0 THEN 1 ELSE 0 END) AS total_erros
    FROM ava_questoes q
    JOIN ava_simulados s ON q.simulado_id = s.id
    JOIN disciplinas d ON s.disciplina_id = d.id
    LEFT JOIN ava_respostas r ON r.questao_id = q.id
    WHERE s.professor_id = ?
    GROUP BY q.id
    HAVING total_respostas > 0 AND (total_erros / total_respostas) > 0.7
");
$stmtGargalos->execute([$_SESSION['usuario_id']]);
$gargalosProf = $stmtGargalos->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do Professor — AVA Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/portais/professor.css">
    <link rel="stylesheet" href="../assets/css/premium.css">
    <style>
        .filter-row { display: none; }
        .filter-row.active { display: table-row; }
        .tipo-badge {
            display: inline-flex; align-items: center; gap: 4px;
            padding: 3px 9px; border-radius: 20px; font-size: 0.65rem; font-weight: 700;
        }
        .tipo-pdf      { background: #EFF6FF; color: #1D4ED8; }
        .tipo-atividade{ background: #FFF7ED; color: #C2410C; }
        .tipo-aviso    { background: #F0FDF4; color: #15803D; }
        .upload-zone {
            border: 2px dashed var(--c-border); border-radius: var(--radius);
            padding: 24px; text-align: center; cursor: pointer;
            transition: all 0.2s; background: var(--c-bg);
        }
        .upload-zone:hover { border-color: var(--c-brand); background: var(--c-brand-lt); }
        .upload-zone.dragover { border-color: var(--c-brand); background: var(--c-brand-lt); }
        .mat-row:hover { background: var(--c-bg); }
        .tab-btn {
            padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
            border: 1px solid var(--c-border); background: none; cursor: pointer; color: var(--c-text-muted);
            transition: all 0.15s;
        }
        .tab-btn.active { background: var(--c-brand); color: #fff; border-color: var(--c-brand); }
    </style>
</head>
<body>

<!-- TOP NAVBAR -->
<nav class="topnav">
    <a href="../index.php" class="tn-logo">
        <div class="tn-logo-mark">SL</div>
        <div class="tn-logo-text">
            <div class="tn-logo-name">SOPHIE LINK</div>
            <div class="tn-logo-sub">Ambiente Virtual</div>
        </div>
    </a>
    <div class="tn-site-name">Portal do Professor</div>
    <div class="tn-spacer"></div>
    <div class="tn-icons">
        <button class="tn-icon-btn"><i data-lucide="mail"></i></button>
        <button class="tn-icon-btn"><i data-lucide="bell"></i><span class="tn-badge">3</span></button>
    </div>
    <div class="tn-user">
        <div class="tn-avatar"><?= strtoupper(substr($primeiroNome, 0, 1)) ?></div>
        <div class="tn-user-name">Prof. <?= htmlspecialchars($primeiroNome) ?></div>
    </div>
    <div class="tn-divider"></div>
    <a href="../auth/logout.php" class="tn-settings" title="Sair"><i data-lucide="log-out"></i></a>
</nav>

<!-- SUB NAVBAR -->
<div class="subnav">
    <div class="subnav-link active" id="btn-inicio" onclick="showSec('inicio', this)"><i data-lucide="home"></i> Início</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-materiais" onclick="showSec('materiais', this)"><i data-lucide="file-plus"></i> Publicar Material</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-diario" onclick="showSec('diario', this)"><i data-lucide="book-open"></i> Lançar Notas</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-frequencia" onclick="showSec('frequencia', this)"><i data-lucide="calendar-check"></i> Lançar Frequência</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-ia" onclick="showSec('ia', this)"><i data-lucide="sparkles"></i> Simulado com IA</div>
    <div class="subnav-sep"></div>
    <a href="ava.php" class="subnav-link" style="color:#a78bfa;font-weight:700;"><i data-lucide="monitor-play"></i> Ver AVA</a>
</div>

<!-- HERO -->
<div class="hero">
    <i data-lucide="graduation-cap" class="hero-icon"></i>
    <div class="hero-title">Bem-vindo de volta, <strong><?= htmlspecialchars($primeiroNome) ?></strong></div>
</div>

<div class="container">
    <!-- COLUNA PRINCIPAL -->
    <div class="col-main">

        <?php if ($sucesso): ?>
            <div class="alert-success"><i data-lucide="check-circle"></i> <?= htmlspecialchars($sucesso) ?></div>
        <?php endif; ?>
        <?php if ($erro): ?>
            <div class="alert-success" style="background:#FEF2F2;border-color:#FECACA;color:#B91C1C;"><i data-lucide="alert-triangle"></i> <?= htmlspecialchars($erro) ?></div>
        <?php endif; ?>

        <!-- ============================================================
             SEC: INÍCIO — Minhas disciplinas + materiais recentes
             ============================================================ -->
        <div id="sec-inicio" class="sec active">
            <!-- Cards de turmas -->
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="book-open"></i> Minhas Disciplinas / Turmas</div>
                    <span class="w-action" onclick="showSec('materiais', document.getElementById('btn-materiais'))">+ Publicar Material</span>
                </div>
                <div class="w-body" style="display:flex;gap:14px;flex-wrap:wrap;">
                    <?php if (empty($turmasProf)): ?>
                        <div style="color:var(--c-text-muted);font-size:0.85rem;">Nenhuma disciplina atribuída ainda.</div>
                    <?php else: ?>
                        <?php foreach ($turmasProf as $tp): ?>
                        <div style="width:240px;border:1px solid var(--c-border);border-radius:var(--radius-lg);overflow:hidden;">
                            <div style="height:90px;background:linear-gradient(135deg,var(--c-brand) 0%,#4C1D95 100%);position:relative;">
                                <i data-lucide="book-open" style="position:absolute;right:12px;bottom:8px;width:40px;height:40px;color:rgba(255,255,255,0.2);"></i>
                            </div>
                            <div style="padding:10px 12px;">
                                <div style="font-weight:700;font-size:0.82rem;color:var(--c-brand);margin-bottom:2px;"><?= htmlspecialchars($tp['disciplina_nome']) ?></div>
                                <div style="font-size:0.7rem;color:var(--c-text-muted);"><?= htmlspecialchars($tp['turma_nome']) ?></div>
                                <div style="display:flex;gap:8px;margin-top:8px;">
                                    <button onclick="showSec('materiais',document.getElementById('btn-materiais'))" style="font-size:0.68rem;padding:4px 8px;border-radius:4px;border:1px solid var(--c-brand);color:var(--c-brand);background:none;cursor:pointer;">+ Material</button>
                                    <button onclick="showSec('frequencia',document.getElementById('btn-frequencia'))" style="font-size:0.68rem;padding:4px 8px;border-radius:4px;border:1px solid var(--c-border);color:var(--c-text-muted);background:none;cursor:pointer;">Chamada</button>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Materiais publicados recentemente -->
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="layers"></i> Materiais Publicados</div>
                    <div style="display:flex;gap:6px;">
                        <button class="tab-btn active" id="tab-all"   onclick="filterMats('all')">Todos</button>
                        <button class="tab-btn"         id="tab-pdf"  onclick="filterMats('pdf')">PDFs</button>
                        <button class="tab-btn"         id="tab-atv"  onclick="filterMats('atividade')">Atividades</button>
                        <button class="tab-btn"         id="tab-av"   onclick="filterMats('aviso')">Avisos</button>
                    </div>
                </div>
                <div class="w-body" style="padding:0;">
                    <?php if (empty($materiaisProf)): ?>
                        <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">
                            <i data-lucide="inbox" style="width:36px;height:36px;margin:0 auto 8px;display:block;opacity:0.35;"></i>
                            Nenhum material publicado ainda.<br>Use <strong>Publicar Material</strong> para começar.
                        </div>
                    <?php else: ?>
                    <table class="data-table" id="mats-table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Título</th>
                                <th>Disciplina</th>
                                <th>Turma</th>
                                <th>Data Entrega</th>
                                <th>Publicado em</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($materiaisProf as $m): ?>
                        <tr class="mat-row" data-tipo="<?= $m['tipo'] ?>">
                            <td>
                                <?php
                                $labels = ['apresentacao'=>'Apresentação','pdf'=>'PDF','atividade'=>'Atividade','avaliacao'=>'Avaliação','aviso'=>'Aviso'];
                                $label  = $labels[$m['tipo']] ?? $m['tipo'];
                                ?>
                                <span class="tipo-badge tipo-<?= $m['tipo'] ?>"><?= $label ?></span>
                            </td>
                            <td style="font-weight:600;max-width:200px;">
                                <?= htmlspecialchars($m['titulo']) ?>
                                <?php if ($m['arquivo_nome']): ?>
                                    <br><a href="download_material.php?id=<?= $m['id'] ?>" target="_blank" style="font-size:0.68rem;color:var(--c-brand);font-weight:500;">
                                        <i data-lucide="paperclip" style="width:11px;height:11px;"></i> <?= htmlspecialchars($m['arquivo_nome']) ?>
                                    </a>
                                <?php endif; ?>
                            </td>
                            <td><?= htmlspecialchars($m['disciplina_nome'] ?? '—') ?></td>
                            <td><?= htmlspecialchars($m['turma_nome'] ?? '—') ?></td>
                            <td><?= $m['data_entrega'] ? date('d/m/Y', strtotime($m['data_entrega'])) : '—' ?></td>
                            <td style="font-size:0.75rem;color:var(--c-text-muted);"><?= date('d/m/Y H:i', strtotime($m['criado_em'])) ?></td>
                            <td>
                                <a href="?del=<?= $m['id'] ?>" onclick="return confirm('Remover este material?')"
                                   style="color:var(--c-red);font-size:0.75rem;font-weight:600;">Remover</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- ============================================================
             SEC: PUBLICAR MATERIAL
             ============================================================ -->
        <div id="sec-materiais" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="file-plus"></i> Publicar Material / Atividade</div>
                </div>
                <div class="w-body">
                    <form method="POST" enctype="multipart/form-data" id="form-material">
                        <input type="hidden" name="acao" value="publicar_material">

                        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:14px;">
                            <!-- Tipo -->
                            <div>
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Tipo de Material *</label>
                                <select name="tipo" id="tipo-select" class="input-field" required onchange="toggleDataEntrega(this.value)">
                                    <option value="">Selecione...</option>
                                    <option value="apresentacao">🎓 Apresentação / Material Básico</option>
                                    <option value="pdf">📄 PDF / Documento</option>
                                    <option value="atividade">📝 Atividade para Entrega</option>
                                    <option value="avaliacao">✅ Avaliação / Link de Prova</option>
                                    <option value="aviso">📢 Aviso / Comunicado</option>
                                </select>
                            </div>
                            <!-- Turma e Disciplina -->
                            <div>
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Turma e Disciplina *</label>
                                <select name="disciplina_turma_id" class="input-field" required>
                                    <option value="">Selecione...</option>
                                    <?php foreach ($turmasProf as $tp): ?>
                                        <option value="<?= $tp['disc_id'] . '-' . $tp['turma_id'] ?>">
                                            <?= htmlspecialchars($tp['turma_nome'] . ' — ' . $tp['disciplina_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <!-- Data Entrega (só para atividade) -->
                            <div id="wrap-data-entrega" style="display:none;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Data de Entrega</label>
                                <input type="date" name="data_entrega" class="input-field" min="<?= date('Y-m-d') ?>">
                            </div>
                        </div>

                        <!-- Título -->
                        <div style="margin-bottom:14px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Título *</label>
                            <input type="text" name="titulo" class="input-field" placeholder="Ex: Apostila — Normas NR-22, Atividade 01 — Lubrificação..." required>
                        </div>

                        <!-- Descrição -->
                        <div style="margin-bottom:14px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Descrição / Instruções</label>
                            <textarea name="descricao" class="input-field" rows="3" style="resize:vertical;" placeholder="Descreva o conteúdo, instruções da atividade, observações..."></textarea>
                        </div>

                        <!-- Upload de Arquivo -->
                        <div style="margin-bottom:18px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Arquivo (PDF, DOC, PPT, XLSX, ZIP — máx. 20MB)</label>
                            <div class="upload-zone" id="upload-zone" onclick="document.getElementById('arquivo-input').click()" ondragover="this.classList.add('dragover');event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event)">
                                <i data-lucide="upload-cloud" style="width:32px;height:32px;color:var(--c-brand);margin:0 auto 8px;display:block;"></i>
                                <div id="upload-label" style="font-size:0.82rem;color:var(--c-text-muted);">Clique ou arraste o arquivo aqui</div>
                                <div style="font-size:0.7rem;color:var(--c-text-muted);margin-top:4px;">PDF, DOC, DOCX, PPT, PPTX, XLSX, ZIP, JPG, PNG</div>
                            </div>
                            <input type="file" id="arquivo-input" name="arquivo" style="display:none;" accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.zip,.jpg,.png" onchange="showFileName(this)">
                        </div>

                        <div style="text-align:right;">
                            <button type="button" onclick="showSec('inicio',document.getElementById('btn-inicio'))" style="margin-right:10px;background:none;border:1px solid var(--c-border);padding:8px 16px;border-radius:var(--radius);cursor:pointer;font-size:0.85rem;color:var(--c-text-muted);">Cancelar</button>
                            <button type="submit" class="btn-primary"><i data-lucide="send" style="width:14px;height:14px;display:inline;"></i> Publicar Material</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- ============================================================
             SEC: LANÇAR NOTAS
             ============================================================ -->
        <div id="sec-diario" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="pen-tool"></i> Lançamento de Notas</div>
                </div>
                <div class="w-body">
                    <form method="POST">
                        <input type="hidden" name="acao" value="lancar_notas">
                        <div style="display:flex;gap:15px;margin-bottom:15px;">
                            <div style="flex:1;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Turma e Disciplina</label>
                                <select name="disciplina_turma_id" class="input-field" required onchange="filterAlunos(this.value, 'notas')">
                                    <option value="">Selecione...</option>
                                    <?php foreach ($turmasProf as $tp): ?>
                                        <option value="<?= $tp['disc_id'] . '-' . $tp['turma_id'] ?>">
                                            <?= htmlspecialchars($tp['turma_nome'] . ' — ' . $tp['disciplina_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Nome da Atividade/Prova</label>
                                <input type="text" name="atividade" class="input-field" placeholder="Ex: Prova Bimestral 1" required>
                            </div>
                        </div>
                        <table class="data-table">
                            <thead><tr><th>RA</th><th>Aluno</th><th>Turma</th><th>Nota (0–10)</th></tr></thead>
                            <tbody id="tbody-notas">
                                <?php foreach ($alunosDb as $a): ?>
                                <tr class="filter-row turma-<?= $a['turma_id'] ?>">
                                    <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td><?= htmlspecialchars($a['turma_nome']) ?></td>
                                    <td><input type="number" step="0.1" min="0" max="10" name="nota_<?= $a['id'] ?>" class="input-field" style="width:100px;" placeholder="0.0"></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div style="margin-top:15px;text-align:right;">
                            <button type="submit" class="btn-primary">Salvar Notas</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- ============================================================
             SEC: LANÇAR FREQUÊNCIA
             ============================================================ -->
        <div id="sec-frequencia" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="calendar-check"></i> Chamada Eletrônica</div>
                </div>
                <div class="w-body">
                    <form method="POST">
                        <input type="hidden" name="acao" value="lancar_frequencia">
                        <div style="display:flex;gap:15px;margin-bottom:15px;">
                            <div style="flex:1;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Turma e Disciplina</label>
                                <select name="disciplina_turma_id" class="input-field" required onchange="filterAlunos(this.value,'frequencia')">
                                    <option value="">Selecione...</option>
                                    <?php foreach ($turmasProf as $tp): ?>
                                        <option value="<?= $tp['disc_id'] . '-' . $tp['turma_id'] ?>">
                                            <?= htmlspecialchars($tp['turma_nome'] . ' — ' . $tp['disciplina_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Data da Aula</label>
                                <input type="date" name="data_registro" class="input-field" value="<?= date('Y-m-d') ?>" required>
                            </div>
                        </div>
                        <table class="data-table">
                            <thead><tr><th>RA</th><th>Aluno</th><th>Tipo</th><th>Entrada / Saída</th><th>Presença</th></tr></thead>
                            <tbody id="tbody-frequencia">
                                <?php foreach ($alunosDb as $a): ?>
                                <tr class="filter-row turma-<?= $a['turma_id'] ?>">
                                    <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td><span style="font-size:0.7rem;padding:3px 6px;background:#e5e7eb;border-radius:4px;"><?= ucfirst($a['tipo']) ?></span></td>
                                    <td>
                                        <?php if ($a['tipo'] === 'aprendiz'): ?>
                                            <input type="time" name="entrada_<?= $a['id'] ?>" class="input-field" style="width:100px;display:inline-block;">
                                            <span style="color:var(--c-text-muted);margin:0 4px;">—</span>
                                            <input type="time" name="saida_<?= $a['id'] ?>" class="input-field" style="width:100px;display:inline-block;">
                                        <?php else: ?>
                                            <span style="color:#9ca3af;font-size:0.8rem;">N/A</span>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <select name="freq_<?= $a['id'] ?>" class="input-field" style="width:130px;">
                                            <option value="P">✅ Presente</option>
                                            <option value="F">❌ Falta</option>
                                        </select>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div style="margin-top:15px;text-align:right;">
                            <button type="submit" class="btn-primary">Salvar Frequência</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- ============================================================
             SEC: GERAR SIMULADO POR IA
             ============================================================ -->
        <div id="sec-ia" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="sparkles" style="color: #8B5CF6;"></i> Gerador de Simulado (IA)</div>
                </div>
                <div class="w-body">
                    <p style="font-size:0.85rem;color:var(--c-text-muted);margin-bottom:20px;">Use a Inteligência Artificial para gerar um simulado de múltipla escolha instantaneamente para seus alunos.</p>
                    
                    <form id="form-ia" onsubmit="gerarSimulado(event)">
                        <div style="display:flex;gap:15px;margin-bottom:15px;">
                            <div style="flex:1;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Turma e Disciplina</label>
                                <select id="ia_disciplina_turma" class="input-field" required>
                                    <option value="">Selecione...</option>
                                    <?php foreach ($turmasProf as $tp): ?>
                                        <option value="<?= $tp['disc_id'] . '-' . $tp['turma_id'] ?>">
                                            <?= htmlspecialchars($tp['turma_nome'] . ' — ' . $tp['disciplina_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Quantidade de Questões</label>
                                <select id="ia_qtd" class="input-field">
                                    <option value="5">5 Questões</option>
                                    <option value="10">10 Questões</option>
                                </select>
                            </div>
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Tema do Simulado</label>
                            <input type="text" id="ia_tema" class="input-field" placeholder="Ex: Ética Profissional no Ambiente de Trabalho" required>
                        </div>
                        
                        <div style="text-align:right;">
                            <button type="submit" id="btn-gerar-ia" class="btn-primary" style="background:#8B5CF6; border-color:#8B5CF6;">
                                <i data-lucide="sparkles" style="width:14px;height:14px;display:inline;"></i> Gerar com IA
                            </button>
                        </div>
                        <div id="ia-loading" style="display:none; text-align:center; padding:20px; font-size:0.9rem; color:#8B5CF6;">
                            <i data-lucide="loader-2" style="animation:spin 1s linear infinite;"></i> Gerando simulado... Isso pode levar alguns segundos.
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div><!-- /col-main -->

    <!-- COLUNA LATERAL -->
    <div class="col-side">
        <!-- Estatísticas Rápidas -->
        <div class="widget">
            <div class="w-head"><div class="w-title"><i data-lucide="bar-chart-2"></i> Resumo</div></div>
            <div class="w-body" style="display:flex;flex-direction:column;gap:10px;">
                <?php
                $totalMats  = count($materiaisProf);
                $totalPdfs  = count(array_filter($materiaisProf, fn($m) => $m['tipo'] === 'pdf'));
                $totalAtvs  = count(array_filter($materiaisProf, fn($m) => $m['tipo'] === 'atividade'));
                $totalAvs   = count(array_filter($materiaisProf, fn($m) => $m['tipo'] === 'aviso'));
                $totalAlunos = count($alunosDb);
                ?>
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:8px;background:var(--c-bg);border-radius:var(--radius);">
                    <span style="color:var(--c-text-muted);">Total de materiais</span>
                    <span style="font-weight:700;"><?= $totalMats ?></span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:8px;background:#EFF6FF;border-radius:var(--radius);">
                    <span style="color:#1D4ED8;">📄 PDFs</span>
                    <span style="font-weight:700;color:#1D4ED8;"><?= $totalPdfs ?></span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:8px;background:#FFF7ED;border-radius:var(--radius);">
                    <span style="color:#C2410C;">📝 Atividades</span>
                    <span style="font-weight:700;color:#C2410C;"><?= $totalAtvs ?></span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:8px;background:#F0FDF4;border-radius:var(--radius);">
                    <span style="color:#15803D;">📢 Avisos</span>
                    <span style="font-weight:700;color:#15803D;"><?= $totalAvs ?></span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:8px;background:var(--c-brand-lt);border-radius:var(--radius);">
                    <span style="color:var(--c-brand);">👩‍🎓 Alunos nas turmas</span>
                    <span style="font-weight:700;color:var(--c-brand);"><?= $totalAlunos ?></span>
                </div>
            </div>
        </div>

        <!-- Gargalos de Ensino (IA) -->
        <div class="widget">
            <div class="w-head"><div class="w-title"><i data-lucide="brain" style="color: #EF4444;"></i> Gargalos de Ensino (IA)</div></div>
            <div class="w-body">
                <?php if (empty($gargalosProf)): ?>
                    <div style="font-size:0.82rem;color:var(--c-text-muted);">Nenhum gargalo de aprendizado detectado nos simulados recentes.</div>
                <?php else: ?>
                    <div style="font-size:0.8rem;color:var(--c-text-muted);margin-bottom:10px;">
                        A IA detectou questões com <strong>taxa de erro > 70%</strong>. Considere revisar estes tópicos em sala de aula.
                    </div>
                    <?php foreach ($gargalosProf as $gargalo): 
                        $taxa_erro = round(($gargalo['total_erros'] / $gargalo['total_respostas']) * 100);
                    ?>
                        <div style="margin-bottom:12px; padding:10px; border-left:3px solid #EF4444; background:#FEF2F2; border-radius:0 4px 4px 0;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                <span style="font-size:0.75rem; font-weight:700; color:#B91C1C;">Erro: <?= $taxa_erro ?>%</span>
                                <span style="font-size:0.65rem; color:#7F1D1D;"><?= htmlspecialchars($gargalo['disciplina_nome']) ?></span>
                            </div>
                            <div style="font-size:0.82rem; font-weight:600; color:#7F1D1D; margin-bottom:2px;">
                                "<?= htmlspecialchars($gargalo['enunciado']) ?>"
                            </div>
                            <div style="font-size:0.7rem; color:#991B1B;">
                                Simulado: <?= htmlspecialchars($gargalo['simulado_titulo']) ?> (<?= $gargalo['total_erros'] ?> erros em <?= $gargalo['total_respostas'] ?> respostas)
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>

        <!-- Avisos da Coordenação -->
        <div class="widget">
            <div class="w-head"><div class="w-title"><i data-lucide="bell"></i> Avisos da Coordenação</div></div>
            <div class="w-body" style="font-size:0.85rem;color:var(--c-text-2);">
                <div style="margin-bottom:10px;border-bottom:1px solid var(--c-border-lt);padding-bottom:10px;">
                    <div style="font-weight:600;color:var(--c-text);margin-bottom:3px;">Prazo de Notas</div>
                    O prazo para lançamento das notas bimestrais encerra nesta sexta-feira.
                </div>
                <div>
                    <div style="font-weight:600;color:var(--c-text);margin-bottom:3px;">Reunião Pedagógica</div>
                    Reunião agendada para o dia 15/06 às 14h no Auditório.
                </div>
            </div>
        </div>
    </div>
</div>

<script>
lucide.createIcons();

function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.subnav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterAlunos(val, section) {
    const tbody = document.getElementById('tbody-' + section);
    tbody.querySelectorAll('.filter-row').forEach(r => r.classList.remove('active'));
    if (val) {
        const turmaId = val.split('-')[1];
        tbody.querySelectorAll('.turma-' + turmaId).forEach(r => r.classList.add('active'));
    }
}

function toggleDataEntrega(tipo) {
    const wrap = document.getElementById('wrap-data-entrega');
    wrap.style.display = tipo === 'atividade' ? 'block' : 'none';
}

function showFileName(input) {
    const label = document.getElementById('upload-label');
    if (input.files && input.files[0]) {
        const size = (input.files[0].size / 1024 / 1024).toFixed(2);
        label.innerHTML = `<strong>${input.files[0].name}</strong> (${size} MB) — <span style="color:var(--c-green);">✓ Pronto</span>`;
    }
}

function handleDrop(e) {
    e.preventDefault();
    document.getElementById('upload-zone').classList.remove('dragover');
    const dt = e.dataTransfer;
    if (dt.files && dt.files[0]) {
        const inp = document.getElementById('arquivo-input');
        inp.files = dt.files;
        showFileName(inp);
    }
}

function filterMats(tipo) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + (tipo === 'all' ? 'all' : tipo === 'pdf' ? 'pdf' : tipo === 'atividade' ? 'atv' : 'av')).classList.add('active');
    document.querySelectorAll('#mats-table .mat-row').forEach(r => {
        r.style.display = (tipo === 'all' || r.dataset.tipo === tipo) ? '' : 'none';
    });
}
</script>
<script src="../assets/js/portais/professor.js"></script>
</body>
</html>
