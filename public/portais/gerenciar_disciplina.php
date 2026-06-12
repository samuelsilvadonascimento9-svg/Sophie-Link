<?php
// gerenciar_disciplina.php — Dashboard dedicado da disciplina no AVA do Professor
session_start();
require_once '../../includes/auth.php';
protect_page(['professor', 'admin', 'coordenadora']);
$nome = $_SESSION['usuario_nome'] ?? 'Professor';
$primeiroNome = explode(' ', str_replace(['Prof. ','Dr. '], '', $nome))[0];

require_once '../../includes/db.php';
/** @var PDO $pdo */
$sucesso = '';
$erro    = '';

$discId = (int)($_GET['disc'] ?? 0);
$turmaId = (int)($_GET['turma'] ?? 0);

if (!$discId || !$turmaId) {
    die("Disciplina ou Turma não informada.");
}

// Validar se o professor tem acesso a essa turma
$stmtCheck = $pdo->prepare("SELECT 1 FROM professor_disciplina WHERE usuario_id = ? AND disciplina_id = ? AND turma_id = ?");
$stmtCheck->execute([$_SESSION['usuario_id'], $discId, $turmaId]);
if (!$stmtCheck->fetchColumn()) {
    die("Acesso negado a esta disciplina.");
}

// Buscar infos da turma e disciplina
$stmtInfo = $pdo->prepare("
    SELECT d.nome AS disciplina_nome, d.imagem_capa, t.nome AS turma_nome, c.nome AS curso_nome 
    FROM disciplinas d 
    JOIN turmas t ON t.id = ?
    LEFT JOIN cursos c ON t.curso_id = c.id
    WHERE d.id = ?
");
$stmtInfo->execute([$turmaId, $discId]);
$info = $stmtInfo->fetch();

$disciplinaNome = htmlspecialchars($info['disciplina_nome']);
$turmaNome = htmlspecialchars($info['turma_nome']);
$bgImage = !empty($info['imagem_capa']) ? '../' . $info['imagem_capa'] : '../assets/images/hero_bg.png';

// ─── LÓGICA DE POST ───
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $acao = $_POST['acao'] ?? '';

        if ($acao === 'publicar_material') {
            $tipo     = $_POST['tipo']     ?? '';
            $titulo   = trim($_POST['titulo']   ?? '');
            $descricao = trim($_POST['descricao'] ?? '');
            $data_entrega = !empty($_POST['data_entrega']) ? $_POST['data_entrega'] : null;

            if (!$titulo) throw new Exception('Informe um título para o material.');
            if (!in_array($tipo, ['apresentacao','pdf','atividade','avaliacao','aviso'])) throw new Exception('Tipo inválido.');

            $arquivo_nome = null;
            $arquivo_path = null;

            if (!empty($_FILES['arquivo']['name'])) {
                $ext = strtolower(pathinfo($_FILES['arquivo']['name'], PATHINFO_EXTENSION));
                $allowed_ext = ['pdf','doc','docx','ppt','pptx','xlsx','zip','jpg','png'];
                if (!in_array($ext, $allowed_ext)) {
                    throw new Exception('Tipo de arquivo não permitido.');
                }
                $arquivo_nome = $_FILES['arquivo']['name'];
                $arquivo_path = 'public/uploads/ava/' . uniqid('mat_') . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $arquivo_nome);
                $fullPath = __DIR__ . '/../../' . $arquivo_path;
                if (!move_uploaded_file($_FILES['arquivo']['tmp_name'], $fullPath)) {
                    throw new Exception('Falha ao salvar o arquivo.');
                }
            }

            $stmt = $pdo->prepare("
                INSERT INTO ava_materiais
                    (disciplina_id, turma_id, professor_id, tipo, titulo, descricao, arquivo_nome, arquivo_path, data_entrega)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$discId, $turmaId, $_SESSION['usuario_id'], $tipo, $titulo, $descricao, $arquivo_nome, $arquivo_path, $data_entrega]);
            $sucesso = 'Material "' . htmlspecialchars($titulo) . '" publicado com sucesso!';
        }

        if ($acao === 'lancar_frequencia') {
            $data_registro = $_POST['data_registro'];
            
            $stmtFreq = $pdo->prepare("
                INSERT INTO frequencia
                    (aprendiz_id, disciplina_id, data_registro, status, horario_entrada, horario_saida, registrado_por)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    status          = VALUES(status),
                    horario_entrada = VALUES(horario_entrada),
                    horario_saida   = VALUES(horario_saida),
                    registrado_por  = VALUES(registrado_por)
            ");

            foreach ($_POST as $key => $val) {
                if (strpos($key, 'freq_') === 0) {
                    $aluno_id = (int)str_replace('freq_', '', $key);
                    $status   = ($val === 'P') ? 'presente' : 'falta';
                    $entrada  = $_POST['entrada_' . $aluno_id] ?? null;
                    $saida    = $_POST['saida_'   . $aluno_id] ?? null;
                    if (empty($entrada)) $entrada = null;
                    if (empty($saida))   $saida   = null;
                    $stmtFreq->execute([$aluno_id, $discId, $data_registro, $status, $entrada, $saida, $_SESSION['usuario_id']]);
                }
            }
            $sucesso = 'Frequência lançada com sucesso!';
        }

        if ($acao === 'lancar_notas') {
            $atividade     = trim($_POST['atividade'] ?? '');
            $data_registro = date('Y-m-d');
            if (!$atividade) throw new Exception('Informe o nome da atividade/prova.');

            $stmtNota = $pdo->prepare("
                INSERT INTO notas
                    (aprendiz_id, disciplina_id, atividade, valor_nota, data_registro, registrado_por)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    valor_nota     = VALUES(valor_nota),
                    data_registro  = VALUES(data_registro),
                    registrado_por = VALUES(registrado_por)
            ");

            foreach ($_POST as $key => $val) {
                if (strpos($key, 'nota_') === 0 && $val !== '') {
                    $aluno_id = (int)str_replace('nota_', '', $key);
                    $nota     = (float)$val;
                    if ($nota < 0 || $nota > 10) throw new Exception("Nota inválida para aluno #$aluno_id.");
                    $stmtNota->execute([$aluno_id, $discId, $atividade, $nota, $data_registro, $_SESSION['usuario_id']]);
                }
            }
            $sucesso = 'Notas lançadas com sucesso!';
        }

    } catch (Exception $e) {
        $erro = 'Erro: ' . $e->getMessage();
    }
}

// ─── LÓGICA DE DELETE ───
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

// ─── CARREGAR DADOS DA TURMA ───
$stmtAlunos = $pdo->prepare("SELECT id, cpf, nome, tipo FROM aprendizes WHERE turma_id = ? AND deleted_at IS NULL ORDER BY nome ASC");
$stmtAlunos->execute([$turmaId]);
$alunos = $stmtAlunos->fetchAll();

$stmtMats = $pdo->prepare("SELECT * FROM ava_materiais WHERE disciplina_id = ? AND turma_id = ? AND professor_id = ? ORDER BY criado_em DESC");
$stmtMats->execute([$discId, $turmaId, $_SESSION['usuario_id']]);
$materiais = $stmtMats->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $disciplinaNome ?> — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/portais/professor.css?v=<?= time() ?>">
    <link rel="stylesheet" href="../assets/css/premium.css?v=<?= time() ?>">
    <style>
        .hero-sm {
            height: 140px;
            display: flex;
            align-items: flex-end;
            padding: 2rem 4rem;
            position: relative;
        }
        .hero-sm-title {
            position: relative;
            z-index: 2;
            color: #fff;
            font-size: 1.8rem;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .hero-sm-sub {
            position: relative;
            z-index: 2;
            color: rgba(255,255,255,0.9);
            font-size: 1rem;
            margin-top: 4px;
        }
    </style>
</head>
<body>

<!-- TOP NAVBAR -->
<nav class="topnav">
    <a href="ava_professor.php" class="tn-logo" style="text-decoration:none;">
        <i data-lucide="arrow-left" style="color:#fff; margin-right:12px;"></i>
        <div class="tn-logo-mark">SL</div>
        <div class="tn-logo-text">
            <div class="tn-logo-name">SOPHIE LINK</div>
            <div class="tn-logo-sub">Voltar ao Início</div>
        </div>
    </a>
    <div class="tn-site-name">Gestão da Disciplina</div>
    <div class="tn-spacer"></div>
    <div class="tn-user">
        <div class="tn-avatar"><?= strtoupper(substr($primeiroNome, 0, 1)) ?></div>
        <div class="tn-user-name">Prof. <?= htmlspecialchars($primeiroNome) ?></div>
    </div>
</nav>

<!-- SUB NAVBAR -->
<div class="subnav">
    <div class="subnav-link active" id="btn-visao" onclick="showSec('visao', this)"><i data-lucide="layout-dashboard"></i> Visão Geral</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-materiais" onclick="showSec('materiais', this)"><i data-lucide="layers"></i> Materiais</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-frequencia" onclick="showSec('frequencia', this)"><i data-lucide="calendar-check"></i> Frequência</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" id="btn-diario" onclick="showSec('diario', this)"><i data-lucide="book-open"></i> Notas</div>
</div>

<!-- HERO COMPACTO -->
<div class="hero-sm" style="background-image: linear-gradient(rgba(10, 15, 26, 0.4), rgba(10, 15, 26, 0.9)), url('<?= $bgImage ?>'); background-size: cover; background-position: center;">
    <div>
        <div class="hero-sm-title"><?= $disciplinaNome ?></div>
        <div class="hero-sm-sub">Turma: <?= $turmaNome ?> | Curso: <?= htmlspecialchars($info['curso_nome'] ?? '') ?></div>
    </div>
</div>

<div class="container">
    <div class="col-main">
        <?php if ($sucesso): ?>
            <div class="alert alert-success" style="margin-bottom:20px; background:#D1FAE5; color:#065F46; padding:12px; border-radius:8px;">
                <i data-lucide="check-circle" style="vertical-align:middle; width:18px; height:18px; margin-right:8px;"></i>
                <?= $sucesso ?>
            </div>
        <?php endif; ?>
        <?php if ($erro): ?>
            <div class="alert alert-error" style="margin-bottom:20px; background:#FEE2E2; color:#991B1B; padding:12px; border-radius:8px;">
                <i data-lucide="alert-circle" style="vertical-align:middle; width:18px; height:18px; margin-right:8px;"></i>
                <?= $erro ?>
            </div>
        <?php endif; ?>

        <!-- ================= VISÃO GERAL ================= -->
        <div id="sec-visao" class="sec active">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="users"></i> Alunos Matriculados (<?= count($alunos) ?>)</div>
                </div>
                <div class="w-body" style="padding:0;">
                    <?php if (empty($alunos)): ?>
                        <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">Nenhum aluno matriculado nesta turma.</div>
                    <?php else: ?>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Nome do Aluno</th>
                                    <th>RA (CPF)</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($alunos as $a): ?>
                                <tr>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td style="font-family:monospace;"><?= htmlspecialchars($a['cpf']) ?></td>
                                    <td><span class="tipo-badge" style="background:#E0E7FF;color:#3730A3;">Cursando</span></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- ================= MATERIAIS ================= -->
        <div id="sec-materiais" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="file-plus"></i> Publicar Novo Material</div>
                </div>
                <div class="w-body">
                    <form method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="acao" value="publicar_material">
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
                            <div>
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Tipo de Material *</label>
                                <select name="tipo" class="input-field" required onchange="document.getElementById('data_entrega_wrap').style.display = this.value === 'atividade' ? 'block' : 'none';">
                                    <option value="">Selecione...</option>
                                    <option value="apresentacao">🎓 Apresentação</option>
                                    <option value="pdf">📄 PDF / Documento</option>
                                    <option value="atividade">📝 Atividade</option>
                                    <option value="avaliacao">✅ Avaliação</option>
                                    <option value="aviso">📢 Aviso</option>
                                </select>
                            </div>
                            <div id="data_entrega_wrap" style="display:none;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Data de Entrega</label>
                                <input type="date" name="data_entrega" class="input-field" min="<?= date('Y-m-d') ?>">
                            </div>
                        </div>

                        <div style="margin-bottom:14px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Título *</label>
                            <input type="text" name="titulo" class="input-field" required>
                        </div>

                        <div style="margin-bottom:14px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Descrição / Instruções</label>
                            <textarea name="descricao" class="input-field" rows="2" style="resize:vertical;"></textarea>
                        </div>

                        <div style="margin-bottom:18px;">
                            <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Anexar Arquivo</label>
                            <input type="file" name="arquivo" class="input-field" style="padding:10px;">
                        </div>

                        <div style="text-align:right;">
                            <button type="submit" class="btn-primary"><i data-lucide="upload"></i> Publicar na Turma</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="widget" style="margin-top:20px;">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="layers"></i> Materiais Publicados</div>
                </div>
                <div class="w-body" style="padding:0;">
                    <?php if (empty($materiais)): ?>
                        <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">Nenhum material publicado nesta turma.</div>
                    <?php else: ?>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Título</th>
                                    <th>Arquivo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($materiais as $m): 
                                    $labels = ['apresentacao'=>'Apresentação','pdf'=>'PDF','atividade'=>'Atividade','avaliacao'=>'Avaliação','aviso'=>'Aviso'];
                                    $label = $labels[$m['tipo']] ?? $m['tipo'];
                                ?>
                                <tr>
                                    <td><span class="tipo-badge tipo-<?= $m['tipo'] ?>"><?= $label ?></span></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($m['titulo']) ?></td>
                                    <td>
                                        <?php if ($m['arquivo_nome']): ?>
                                            <a href="download_material.php?id=<?= $m['id'] ?>" target="_blank" style="color:var(--brand);font-size:0.8rem;font-weight:600;"><i data-lucide="paperclip" style="width:14px;height:14px;vertical-align:middle;"></i> Baixar</a>
                                        <?php else: ?>—<?php endif; ?>
                                    </td>
                                    <td>
                                        <a href="?disc=<?= $discId ?>&turma=<?= $turmaId ?>&del=<?= $m['id'] ?>" onclick="return confirm('Excluir material?')" style="color:var(--red);font-size:0.8rem;font-weight:600;">Excluir</a>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- ================= FREQUÊNCIA ================= -->
        <div id="sec-frequencia" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="calendar-check"></i> Lançar Frequência da Turma</div>
                </div>
                <div class="w-body">
                    <?php if (empty($alunos)): ?>
                        <div class="alert alert-error">Não há alunos nesta turma para lançar frequência.</div>
                    <?php else: ?>
                        <form method="POST">
                            <input type="hidden" name="acao" value="lancar_frequencia">
                            
                            <div style="margin-bottom:14px; max-width:250px;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Data da Aula *</label>
                                <input type="date" name="data_registro" class="input-field" value="<?= date('Y-m-d') ?>" required>
                            </div>

                            <table class="data-table" style="margin-bottom:20px; border:1px solid var(--c-border); border-radius:var(--radius);">
                                <thead>
                                    <tr>
                                        <th>Aluno</th>
                                        <th style="width:100px;">Presente</th>
                                        <th style="width:100px;">Falta</th>
                                        <th style="width:140px;">H. Entrada</th>
                                        <th style="width:140px;">H. Saída</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($alunos as $a): ?>
                                    <tr>
                                        <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                        <td style="text-align:center;">
                                            <input type="radio" name="freq_<?= $a['id'] ?>" value="P" checked style="transform:scale(1.3);accent-color:var(--green);">
                                        </td>
                                        <td style="text-align:center;">
                                            <input type="radio" name="freq_<?= $a['id'] ?>" value="F" style="transform:scale(1.3);accent-color:var(--red);">
                                        </td>
                                        <td><input type="time" name="entrada_<?= $a['id'] ?>" class="input-field" style="padding:6px;"></td>
                                        <td><input type="time" name="saida_<?= $a['id'] ?>" class="input-field" style="padding:6px;"></td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                            
                            <div style="text-align:right;">
                                <button type="submit" class="btn-primary"><i data-lucide="save"></i> Salvar Frequência</button>
                            </div>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- ================= NOTAS ================= -->
        <div id="sec-diario" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="book-open"></i> Lançar Notas da Turma</div>
                </div>
                <div class="w-body">
                    <?php if (empty($alunos)): ?>
                        <div class="alert alert-error">Não há alunos nesta turma para lançar notas.</div>
                    <?php else: ?>
                        <form method="POST">
                            <input type="hidden" name="acao" value="lancar_notas">
                            
                            <div style="margin-bottom:14px; max-width:400px;">
                                <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:5px;">Nome da Avaliação/Atividade *</label>
                                <input type="text" name="atividade" class="input-field" placeholder="Ex: Prova Bimestral 1" required>
                            </div>

                            <table class="data-table" style="margin-bottom:20px; border:1px solid var(--c-border); border-radius:var(--radius);">
                                <thead>
                                    <tr>
                                        <th>Aluno</th>
                                        <th style="width:150px;">Nota (0 a 10)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($alunos as $a): ?>
                                    <tr>
                                        <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                        <td><input type="number" step="0.1" min="0" max="10" name="nota_<?= $a['id'] ?>" class="input-field" style="padding:6px; font-weight:bold; color:var(--brand);" placeholder="—"></td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                            
                            <div style="text-align:right;">
                                <button type="submit" class="btn-primary"><i data-lucide="save"></i> Salvar Notas</button>
                            </div>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>

    </div>
</div>

<script src="../assets/js/portais/professor.js?v=<?= time() ?>"></script>
</body>
</html>
