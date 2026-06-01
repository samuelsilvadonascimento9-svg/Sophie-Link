<?php
// portal_professor.php — Portal do Professor | Sophie Link (Estilo AVA/Brightspace)
session_start();
require_once '../../includes/auth.php';
protect_page(['professor']);
$nome = $_SESSION['usuario_nome'] ?? 'Professor';
$primeiroNome = explode(' ', str_replace(['Prof. ','Dr. '], '', $nome))[0];

require_once '../../includes/db.php';
/** @var \PDO $pdo */
$sucesso = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['acao']) && $_POST['acao'] === 'lancar_frequencia') {
        $data_registro = $_POST['data_registro'];
        $parts = explode('-', $_POST['disciplina_turma_id']);
        $disc_id = $parts[0];
        
        foreach($_POST as $key => $val) {
            if (strpos($key, 'freq_') === 0) {
                $aluno_id = str_replace('freq_', '', $key);
                $status = ($val === 'P') ? 'presente' : 'falta';
                
                // Tratar entrada e saída
                $entrada = $_POST['entrada_'.$aluno_id] ?? null;
                $saida = $_POST['saida_'.$aluno_id] ?? null;
                if (empty($entrada)) $entrada = null;
                if (empty($saida)) $saida = null;

                $stmt = $pdo->prepare("INSERT INTO frequencia (aprendiz_id, disciplina_id, data_registro, status, horario_entrada, horario_saida, registrado_por) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$aluno_id, $disc_id, $data_registro, $status, $entrada, $saida, $_SESSION['usuario_id']]);
            }
        }
        $sucesso = 'Frequência lançada com sucesso!';
    }
    
    if (isset($_POST['acao']) && $_POST['acao'] === 'lancar_notas') {
        $atividade = $_POST['atividade'];
        $data_registro = date('Y-m-d');
        $parts = explode('-', $_POST['disciplina_turma_id']);
        $disc_id = $parts[0];

        foreach($_POST as $key => $val) {
            if (strpos($key, 'nota_') === 0 && $val !== '') {
                $aluno_id = str_replace('nota_', '', $key);
                $stmt = $pdo->prepare("INSERT INTO notas (aprendiz_id, disciplina_id, atividade, valor_nota, data_registro, registrado_por) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$aluno_id, $disc_id, $atividade, (float)$val, $data_registro, $_SESSION['usuario_id']]);
            }
        }
        $sucesso = 'Notas lançadas com sucesso!';
    }
}

// Turmas do Professor
$stmtTurmas = $pdo->prepare("
    SELECT pd.*, t.nome AS turma_nome, d.nome AS disciplina_nome, d.id AS disc_id, t.id AS turma_id
    FROM professor_disciplina pd
    JOIN turmas t ON t.id = pd.turma_id
    JOIN disciplinas d ON d.id = pd.disciplina_id
    WHERE pd.usuario_id = ?
");
$stmtTurmas->execute([$_SESSION['usuario_id']]);
$turmasProf = $stmtTurmas->fetchAll();

// Alunos nas turmas do professor
$alunosDb = [];
if (count($turmasProf) > 0) {
    $turmaIds = array_unique(array_column($turmasProf, 'turma_id'));
    $in  = str_repeat('?,', count($turmaIds) - 1) . '?';
    $sql = "
        SELECT a.id, a.cpf, a.nome, a.turma_id, a.tipo, t.nome as turma_nome 
        FROM aprendizes a 
        JOIN turmas t ON t.id = a.turma_id
        WHERE a.deleted_at IS NULL AND a.turma_id IN ($in) 
        ORDER BY a.nome ASC
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array_values($turmaIds));
    $alunosDb = $stmt->fetchAll();
}
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
<link rel="stylesheet" href="../assets/css/portal_professor.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
    <style>
        .filter-row { display: none; }
        .filter-row.active { display: table-row; }
    </style>
</head>
<body>

<!-- TOP NAVBAR -->
<nav class="topnav">
    <a href="#" class="tn-logo">
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
    <div class="subnav-link active" onclick="showSec('inicio', this)"><i data-lucide="home"></i> Início</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" onclick="showSec('diario', this)"><i data-lucide="book-open"></i> Lançar Notas</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" onclick="showSec('frequencia', this)"><i data-lucide="calendar-check"></i> Lançar Frequência</div>
    <div class="subnav-sep"></div>
    <a href="ava.php" class="subnav-link" style="color: var(--c-brand); font-weight: 700; text-decoration: none;"><i data-lucide="monitor-play"></i> Acessar AVA</a>
</div>

<!-- HERO -->
<div class="hero">
    <i data-lucide="graduation-cap" class="hero-icon"></i>
    <div class="hero-title">Bem-vindo de volta, <strong><?= htmlspecialchars($primeiroNome) ?></strong></div>
</div>

<div class="container">
    <!-- COLUNA PRINCIPAL -->
    <div class="col-main">
        <?php if($sucesso): ?>
            <div class="alert-success"><i data-lucide="check-circle"></i> <?= $sucesso ?></div>
        <?php endif; ?>

        <!-- SEC: INICIO -->
        <div id="sec-inicio" class="sec active">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="book-open"></i> Minhas Disciplinas / Turmas</div>
                </div>
                <div class="w-body" style="display:flex; gap: 15px; flex-wrap: wrap;">
                    <?php if(empty($turmasProf)): ?>
                        <div style="padding:15px;">Nenhuma disciplina atribuída.</div>
                    <?php else: ?>
                        <?php foreach($turmasProf as $tp): ?>
                        <div style="width:250px; border:1px solid var(--c-border); border-radius:var(--radius); overflow:hidden;">
                            <div style="height:100px; background:linear-gradient(135deg, var(--c-brand) 0%, #4C1D95 100%);"></div>
                            <div style="padding:10px;">
                                <div style="font-weight:700; font-size:0.85rem; color:var(--c-text-link);"><?= htmlspecialchars($tp['disciplina_nome']) ?></div>
                                <div style="font-size:0.7rem; color:var(--c-text-muted); margin-top:4px;"><?= htmlspecialchars($tp['turma_nome']) ?></div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- SEC: NOTAS -->
        <div id="sec-diario" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="pen-tool"></i> Lançamento de Notas</div>
                </div>
                <div class="w-body">
                    <form method="POST">
                        <input type="hidden" name="acao" value="lancar_notas">
                        <div style="display:flex; gap:15px; margin-bottom: 15px;">
                            <div style="flex:1;">
                                <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:5px;">Turma e Disciplina</label>
                                <select name="disciplina_turma_id" class="input-field" required onchange="filterAlunos(this.value, 'notas')">
                                    <option value="">Selecione...</option>
                                    <?php foreach($turmasProf as $tp): ?>
                                        <option value="<?= $tp['disc_id'] . '-' . $tp['turma_id'] ?>">
                                            <?= htmlspecialchars($tp['turma_nome'] . ' — ' . $tp['disciplina_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:5px;">Nome da Atividade/Prova</label>
                                <input type="text" name="atividade" class="input-field" placeholder="Ex: Prova Bimestral 1" required>
                            </div>
                        </div>
                        <table class="data-table">
                            <thead><tr><th>RA</th><th>Aluno</th><th>Turma</th><th>Nota (0-10)</th></tr></thead>
                            <tbody id="tbody-notas">
                                <?php foreach($alunosDb as $a): ?>
                                <tr class="filter-row turma-<?= $a['turma_id'] ?>">
                                    <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td><?= htmlspecialchars($a['turma_nome']) ?></td>
                                    <td><input type="number" step="0.1" name="nota_<?= $a['id'] ?>" class="input-field" style="width:100px;" placeholder="Ex: 8.5"></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div style="margin-top: 15px; text-align:right;">
                            <button type="submit" class="btn-primary">Salvar Notas</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- SEC: FREQUENCIA -->
        <div id="sec-frequencia" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="calendar-check"></i> Chamada Eletrônica</div>
                </div>
                <div class="w-body">
                    <form method="POST">
                        <input type="hidden" name="acao" value="lancar_frequencia">
                        <div style="display:flex; gap:15px; margin-bottom: 15px;">
                            <div style="flex:1;">
                                <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:5px;">Turma e Disciplina</label>
                                <select name="disciplina_turma_id" class="input-field" required onchange="filterAlunos(this.value, 'frequencia')">
                                    <option value="">Selecione...</option>
                                    <?php foreach($turmasProf as $tp): ?>
                                        <option value="<?= $tp['disc_id'] . '-' . $tp['turma_id'] ?>">
                                            <?= htmlspecialchars($tp['turma_nome'] . ' — ' . $tp['disciplina_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div style="flex:1;">
                                <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:5px;">Data da Aula</label>
                                <input type="date" name="data_registro" class="input-field" value="<?= date('Y-m-d') ?>" required>
                            </div>
                        </div>
                        <table class="data-table">
                            <thead><tr><th>RA</th><th>Aluno</th><th>Tipo</th><th>Entrada/Saída (Para Aprendizes)</th><th>Presença</th></tr></thead>
                            <tbody id="tbody-frequencia">
                                <?php foreach($alunosDb as $a): ?>
                                <tr class="filter-row turma-<?= $a['turma_id'] ?>">
                                    <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td><span style="font-size:0.7rem; padding:3px 6px; background:#e5e7eb; border-radius:4px;"><?= ucfirst($a['tipo']) ?></span></td>
                                    <td>
                                        <?php if ($a['tipo'] === 'aprendiz'): ?>
                                            <input type="time" name="entrada_<?= $a['id'] ?>" class="input-field" style="width:100px; display:inline-block;" placeholder="Início">
                                            - 
                                            <input type="time" name="saida_<?= $a['id'] ?>" class="input-field" style="width:100px; display:inline-block;" placeholder="Fim">
                                        <?php else: ?>
                                            <span style="color:#9ca3af; font-size:0.8rem;">(Não aplicável)</span>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <select name="freq_<?= $a['id'] ?>" class="input-field" style="width:120px;">
                                            <option value="P">Presente (P)</option>
                                            <option value="F">Falta (F)</option>
                                        </select>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div style="margin-top: 15px; text-align:right;">
                            <button type="submit" class="btn-primary">Salvar Frequência</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- COLUNA LATERAL -->
    <div class="col-side">
        <div class="widget">
            <div class="w-head">
                <div class="w-title"><i data-lucide="bell"></i> Avisos da Coordenação</div>
            </div>
            <div class="w-body" style="font-size: 0.85rem; color: var(--c-text-2);">
                <div style="margin-bottom: 10px; border-bottom:1px solid var(--c-border-lt); padding-bottom:10px;">
                    <div style="font-weight:600; color:var(--c-text); margin-bottom:3px;">Prazo de Notas</div>
                    O prazo para lançamento das notas bimestrais encerra nesta sexta-feira.
                </div>
                <div>
                    <div style="font-weight:600; color:var(--c-text); margin-bottom:3px;">Reunião Pedagógica</div>
                    Reunião agendada para o dia 15/06 às 14h.
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function filterAlunos(val, section) {
    let tbody = document.getElementById('tbody-' + section);
    let rows = tbody.querySelectorAll('.filter-row');
    
    // hide all
    rows.forEach(r => r.classList.remove('active'));
    
    if (val) {
        let parts = val.split('-');
        let turmaId = parts[1];
        let targetRows = tbody.querySelectorAll('.turma-' + turmaId);
        targetRows.forEach(r => r.classList.add('active'));
    }
}
</script>
<script src="../assets/js/portal_professor.js"></script>
</body>
</html>
