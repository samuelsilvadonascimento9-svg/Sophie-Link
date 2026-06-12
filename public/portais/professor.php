<?php
// professor.php — Portal do Professor (Dashboard Acadêmico) | Sophie Link
session_start();

require_once '../../includes/auth.php';
protect_page(['professor', 'admin', 'coordenadora']);

require_once '../../includes/db.php';
/** @var \PDO $pdo */

// CSRF — gerado uma vez, reutilizado em todos os formulários da página
$csrfToken = Security::generateCsrfToken();

$usuario_id = $_SESSION['usuario_id'];
$nome = $_SESSION['usuario_nome'] ?? 'Professor';
$primeiroNome = explode(' ', str_replace(['Prof. ','Dr. '], '', $nome))[0];

$sucesso = '';
$erro = '';

// Lógica de Lançamento de Nota
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'lancar_nota') {
    // ─── PROTEÇÃO CSRF ────────────────────────────────────────────────────────
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = 'Requ. inválida (token CSRF). Recarregue a página e tente novamente.';
    } else {
    $aprendiz_id   = (int)($_POST['aprendiz_id']   ?? 0);
    $disciplina_id = (int)($_POST['disciplina_id'] ?? 0);
    $atividade     = trim($_POST['atividade']  ?? '');
    $valor_nota    = $_POST['valor_nota'] ?? null;
    $data_registro = date('Y-m-d');

    if ($aprendiz_id && $disciplina_id && $atividade && $valor_nota !== null) {
        try {
            // ─── PROTEÇÃO IDOR: Confirma que o professor leciona ESTA disciplina
            // para a TURMA do aluno antes de aceitar o lançamento ────────────────
            $stmtAuth = $pdo->prepare("
                SELECT 1
                FROM professor_disciplina pd
                JOIN aprendizes a ON a.turma_id = pd.turma_id
                WHERE pd.usuario_id    = ?
                  AND pd.disciplina_id = ?
                  AND a.id             = ?
                LIMIT 1
            ");
            $stmtAuth->execute([$usuario_id, $disciplina_id, $aprendiz_id]);

            if (!$stmtAuth->fetchColumn()) {
                $erro = "Acesso negado: você não leciona esta disciplina para este aluno.";
            } else {
                $stmt = $pdo->prepare("INSERT INTO notas (aprendiz_id, disciplina_id, atividade, valor_nota, data_registro, registrado_por) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$aprendiz_id, $disciplina_id, $atividade, $valor_nota, $data_registro, $usuario_id]);
                $sucesso = "Nota lançada com sucesso para a atividade '$atividade'.";
            }
            // ────────────────────────────────────────────────────────────────────
        } catch (Exception $e) {
            $erro = "Erro ao lançar nota: " . $e->getMessage();
        }
    } else {
        $erro = "Preencha todos os campos obrigatórios.";
    }
    } // end CSRF check
}


// Lógica de Criação de Turma pelo Professor
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'criar_turma') {
    // ─── PROTEÇÃO CSRF ────────────────────────────────────────────────────────
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = 'Requ. inválida (token CSRF). Recarregue a página e tente novamente.';
    } else {
    $curso_id = $_POST['curso_id'] ?? null;
    $disciplina_id = $_POST['disciplina_id'] ?? null;
    $nome_turma = trim($_POST['nome_turma'] ?? '');
    $turno = $_POST['turno'] ?? null;
    $ano_semestre = trim($_POST['ano_semestre'] ?? '');

    if ($curso_id && $disciplina_id && $nome_turma && $turno && $ano_semestre) {
        try {
            $pdo->beginTransaction();
            
            // 1. Criar a Turma
            $stmt = $pdo->prepare("INSERT INTO turmas (curso_id, nome, turno, ano_semestre) VALUES (?, ?, ?, ?)");
            $stmt->execute([$curso_id, $nome_turma, $turno, $ano_semestre]);
            $nova_turma_id = $pdo->lastInsertId();
            
            // 2. Vincular Professor à Turma e Disciplina recém-criada
            $stmtVinc = $pdo->prepare("INSERT INTO professor_disciplina (usuario_id, turma_id, disciplina_id) VALUES (?, ?, ?)");
            $stmtVinc->execute([$usuario_id, $nova_turma_id, $disciplina_id]);
            
            $pdo->commit();
            $sucesso = "Turma '$nome_turma' criada e vinculada a você com sucesso!";
            
            // Recarregar a aba ativa para exibir a nova turma
            echo "<script>window.addEventListener('DOMContentLoaded', () => { showSec('turmas', document.querySelectorAll('.nav-link')[1]); });</script>";
        } catch (Exception $e) {
            $pdo->rollBack();
            $erro = "Erro ao criar turma: " . $e->getMessage();
        }
    } else {
        $erro = "Preencha todos os campos obrigatórios para criar a turma.";
    }
    } // end CSRF check
}

// Buscar Turmas do Professor
$stmtTurmas = $pdo->prepare("
    SELECT pd.*, t.nome AS turma_nome, t.turno, c.nome AS curso_nome, d.nome AS disciplina_nome
    FROM professor_disciplina pd
    JOIN turmas t ON pd.turma_id = t.id
    JOIN cursos c ON t.curso_id = c.id
    JOIN disciplinas d ON pd.disciplina_id = d.id
    WHERE pd.usuario_id = ?
");
$stmtTurmas->execute([$usuario_id]);
$turmasDoProfessor = $stmtTurmas->fetchAll(PDO::FETCH_ASSOC);

// Extrair IDs de turmas para buscar os alunos depois (para o select de notas)
$turmaIds = array_unique(array_column($turmasDoProfessor, 'turma_id'));

$alunosPorTurma = [];
if (!empty($turmaIds)) {
    $in = str_repeat('?,', count($turmaIds) - 1) . '?';
    $stmtAlunos = $pdo->prepare("
        SELECT id, nome, turma_id 
        FROM aprendizes 
        WHERE turma_id IN ($in) AND situacao_aluno = 'cursando'
        ORDER BY nome ASC
    ");
    $stmtAlunos->execute($turmaIds);
    $alunosDb = $stmtAlunos->fetchAll(PDO::FETCH_ASSOC);
    foreach ($alunosDb as $a) {
        $alunosPorTurma[$a['turma_id']][] = $a;
    }
}

// Buscar Todos os Cursos para o Modal de Criar Turma
$cursosAtivos = $pdo->query("SELECT id, nome FROM cursos ORDER BY nome ASC")->fetchAll(PDO::FETCH_ASSOC);

// Buscar Todas as Disciplinas para o Modal de Criar Turma
$disciplinasAtivas = $pdo->query("SELECT id, nome, curso_id FROM disciplinas ORDER BY nome ASC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do Professor | Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/portais/professor_dashboard.css?v=<?= time() ?>">
    <link rel="stylesheet" href="../assets/css/premium.css?v=<?= time() ?>">
    <style>
        /* Ajustes básicos de layout baseados no aluno.css */
        .app { display: flex; height: 100vh; overflow: hidden; background: var(--c-bg); }
        .sidebar { width: 260px; background: var(--c-surface); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; }
        .workspace { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
        .topbar { height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; border-bottom: 1px solid var(--c-border); background: var(--c-surface); }
        .content { padding: 24px; flex:1; }
        .page-hdr { margin-bottom: 24px; }
        .ph-title { font-size: 24px; font-weight: 700; color: var(--c-text); font-family: 'Syne', sans-serif; }
        .ph-sub { color: var(--c-text-muted); font-size: 14px; margin-top: 4px; }
        .card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius-md); margin-bottom: 24px; overflow: hidden; }
        .card-head { padding: 16px 20px; border-bottom: 1px solid var(--c-border); font-weight: 600; }
        .card-body { padding: 20px; }
        .sb-brand { height: 64px; display: flex; align-items: center; padding: 0 24px; border-bottom: 1px solid var(--c-border); }
        .sb-user { padding: 20px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--c-border); }
        .sb-avatar { width: 40px; height: 40px; background: var(--c-primary); color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 600; font-size: 18px; }
        .sb-uname { font-weight: 600; color: var(--c-text); }
        .sb-urole { font-size: 12px; color: var(--c-text-muted); }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 24px; color: var(--c-text-muted); text-decoration: none; font-weight: 500; transition: 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--c-primary); background: rgba(37, 99, 235, 0.05); }
        .nav-link i { width: 18px; height: 18px; }
        .sb-footer { margin-top: auto; border-top: 1px solid var(--c-border); }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px; border-radius: var(--radius-sm); font-weight: 500; cursor: pointer; text-decoration: none; border: none; font-size: 14px; }
        .btn-primary { background: var(--c-primary); color: white; }
        .btn-primary:hover { background: var(--c-primary-dark); }
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px; color: var(--c-text); }
        .form-control { width: 100%; padding: 10px 12px; border: 1px solid var(--c-border); border-radius: var(--radius-sm); font-family: 'Inter', sans-serif; font-size: 14px; background: var(--c-surface); color: var(--c-text); }
        .alert { padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-size: 14px; }
        .alert-success { background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); }
        .alert-error { background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2); }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--c-border); }
        .data-table th { background: rgba(0,0,0,0.02); font-weight: 600; color: var(--c-text-muted); font-size: 12px; text-transform: uppercase; }
        .sec { display: none; }
        .sec.active { display: block; }
        /* Modal Styles */
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 1000; }
        .modal-overlay.active { display: flex; }
        .modal-box { background: var(--c-surface); width: 100%; max-width: 500px; border-radius: var(--radius-lg); box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; }
        .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--c-border); display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 24px; }
        .modal-footer { padding: 16px 24px; border-top: 1px solid var(--c-border); background: rgba(0,0,0,0.02); display: flex; justify-content: flex-end; gap: 12px; }
    </style>
</head>
<body>
<div class="app">

    <aside class="sidebar">
        <div class="sb-brand">
            <img src="../assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px;">
        </div>

        <div class="sb-user">
            <div class="sb-avatar"><?= strtoupper(substr($primeiroNome, 0, 1)) ?></div>
            <div>
                <div class="sb-uname">Prof. <?= htmlspecialchars($primeiroNome) ?></div>
                <div class="sb-urole">Docente</div>
            </div>
        </div>

        <div style="padding: 16px 24px 8px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--c-text-muted);">Principal</div>
        <a href="#" class="nav-link active" onclick="showSec('dashboard', this)"><i data-lucide="layout-dashboard"></i> Visão Geral</a>
        <a href="#" class="nav-link" onclick="showSec('turmas', this)"><i data-lucide="users"></i> Minhas Turmas</a>
        <a href="#" class="nav-link" onclick="showSec('notas', this)"><i data-lucide="edit-3"></i> Lançar Notas</a>

        <div style="padding: 16px 24px 8px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--c-text-muted);">Sala de Aula</div>
        <a href="ava_professor.php" class="nav-link"><i data-lucide="monitor-play"></i> Acessar AVA</a>

        <div class="sb-footer">
            <a href="../auth/logout.php" class="nav-link"><i data-lucide="log-out"></i> Sair</a>
        </div>
    </aside>

    <div class="workspace">
        <header class="topbar">
            <div class="tb-title" id="topbar-title" style="font-weight: 600; font-size: 18px;">Visão Geral</div>
            <div>
                <button class="btn btn-primary" onclick="window.location.href='ava_professor.php'"><i data-lucide="monitor-play" style="width:16px;"></i> Ambiente Virtual (AVA)</button>
            </div>
        </header>

        <main class="content">
            <?php if ($sucesso): ?>
                <div class="alert alert-success"><i data-lucide="check-circle"></i> <?= htmlspecialchars($sucesso) ?></div>
            <?php endif; ?>
            <?php if ($erro): ?>
                <div class="alert alert-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
            <?php endif; ?>

            <!-- SEC: DASHBOARD -->
            <div id="sec-dashboard" class="sec active">
                <div class="page-hdr">
                    <div class="ph-title">Olá, Professor(a) <?= htmlspecialchars($primeiroNome) ?>! 👋</div>
                    <div class="ph-sub">Bem-vindo(a) ao seu novo Portal Docente.</div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 24px;">
                    <div class="card" style="margin: 0;">
                        <div class="card-body" style="display: flex; align-items: center; gap: 16px;">
                            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(37, 99, 235, 0.1); color: var(--c-primary); display: flex; align-items: center; justify-content: center;">
                                <i data-lucide="book-open"></i>
                            </div>
                            <div>
                                <div style="font-size: 24px; font-weight: 700; font-family: 'Syne', sans-serif;"><?= count($turmasDoProfessor) ?></div>
                                <div style="font-size: 13px; color: var(--c-text-muted);">Turmas Atribuídas</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head">Acesso Rápido</div>
                    <div class="card-body" style="display: flex; gap: 16px;">
                        <button class="btn btn-primary" onclick="showSec('notas', document.querySelectorAll('.nav-link')[2])">Lançar Nova Nota</button>
                        <a href="ava_professor.php" class="btn" style="background: var(--c-surface); border: 1px solid var(--c-border); color: var(--c-text);">Publicar Atividade no AVA</a>
                    </div>
                </div>
            </div>

            <!-- SEC: TURMAS -->
            <div id="sec-turmas" class="sec">
                <div class="page-hdr" style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                        <div class="ph-title">Minhas Turmas</div>
                        <div class="ph-sub">Lista de disciplinas e turmas que você ministra.</div>
                    </div>
                    <div>
                        <button class="btn btn-primary" onclick="abrirModalNovaTurma()"><i data-lucide="plus" style="width:16px;"></i> Nova Turma</button>
                    </div>
                </div>

                <div class="card">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Disciplina</th>
                                <th>Turma</th>
                                <th>Curso</th>
                                <th>Turno</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($turmasDoProfessor)): ?>
                                <tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--c-text-muted);">Nenhuma turma atribuída a você ainda.</td></tr>
                            <?php else: ?>
                                <?php foreach($turmasDoProfessor as $t): ?>
                                <tr>
                                    <td style="font-weight: 500; color: var(--c-text);"><?= htmlspecialchars($t['disciplina_nome']) ?></td>
                                    <td><span style="background: rgba(37,99,235,0.1); color: var(--c-primary); padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;"><?= htmlspecialchars($t['turma_nome']) ?></span></td>
                                    <td><?= htmlspecialchars($t['curso_nome']) ?></td>
                                    <td><?= htmlspecialchars($t['turno']) ?></td>
                                </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- SEC: LANÇAR NOTAS -->
            <div id="sec-notas" class="sec">
                <div class="page-hdr">
                    <div class="ph-title">Lançamento de Notas</div>
                    <div class="ph-sub">Insira as notas das avaliações que irão direto para o boletim do aluno.</div>
                </div>

                <div class="card" style="max-width: 600px;">
                    <div class="card-head">Formulário de Avaliação</div>
                    <div class="card-body">
                        <form method="POST">
                            <input type="hidden" name="action" value="lancar_nota">
                            <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                            <div class="form-group">
                                <label class="form-label">Turma e Disciplina</label>
                                <select name="disciplina_id" id="disciplinaSelect" class="form-control" required onchange="updateAlunos()">
                                    <option value="">Selecione...</option>
                                    <?php foreach($turmasDoProfessor as $t): ?>
                                        <option value="<?= $t['disciplina_id'] ?>" data-turma="<?= $t['turma_id'] ?>">
                                            <?= htmlspecialchars($t['disciplina_nome']) ?> — <?= htmlspecialchars($t['turma_nome']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Aluno</label>
                                <select name="aprendiz_id" id="alunoSelect" class="form-control" required>
                                    <option value="">Selecione a turma primeiro...</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Descrição da Atividade</label>
                                <input type="text" name="atividade" class="form-control" placeholder="Ex: Prova Bimestral, Trabalho Prático" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Nota (0.0 a 10.0)</label>
                                <input type="number" step="0.1" min="0" max="10" name="valor_nota" class="form-control" placeholder="Ex: 8.5" required>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%;"><i data-lucide="check"></i> Salvar Nota no Boletim</button>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    </div>
</div>

<!-- Modal Nova Turma -->
<div id="modalNovaTurma" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <h3 style="font-family:'Syne', sans-serif; font-size:18px; margin:0; color:var(--c-text);">Criar Nova Turma</h3>
            <button class="btn" style="padding:4px; background:transparent; border:none; color:var(--c-text-muted);" onclick="fecharModalNovaTurma()"><i data-lucide="x"></i></button>
        </div>
        <form method="POST">
            <div class="modal-body">
                <input type="hidden" name="action" value="criar_turma">
                <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                <div class="form-group">
                    <label class="form-label">Curso *</label>
                    <select name="curso_id" id="modalCurso" class="form-control" required onchange="filtrarDisciplinas()">
                        <option value="">Selecione o Curso...</option>
                        <?php foreach($cursosAtivos as $c): ?>
                            <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['nome']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Sua Disciplina nesta Turma *</label>
                    <select name="disciplina_id" id="modalDisciplina" class="form-control" required>
                        <option value="">Selecione o curso primeiro...</option>
                    </select>
                    <div style="font-size:12px; color:var(--c-text-muted); margin-top:4px;">
                        Você será automaticamente vinculado a esta disciplina na nova turma.
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Nome da Turma *</label>
                    <input type="text" name="nome_turma" class="form-control" placeholder="Ex: Turma A, 1º Semestre" required>
                </div>

                <div style="display:flex; gap:16px;">
                    <div class="form-group" style="flex:1;">
                        <label class="form-label">Turno *</label>
                        <select name="turno" class="form-control" required>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                    </div>
                    <div class="form-group" style="flex:1;">
                        <label class="form-label">Ano/Semestre *</label>
                        <input type="text" name="ano_semestre" class="form-control" placeholder="Ex: 2026/1" required>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn" style="background:#fff; border:1px solid var(--c-border); color:var(--c-text);" onclick="fecharModalNovaTurma()">Cancelar</button>
                <button type="submit" class="btn btn-primary"><i data-lucide="check" style="width:16px;"></i> Criar Turma</button>
            </div>
        </form>
    </div>
</div>

<script>
    // Dados de alunos passados do PHP para o JS para filtrar o select dinamicamente
    const alunosPorTurma = <?= json_encode($alunosPorTurma) ?>;

    function showSec(secId, el) {
        document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById('sec-' + secId).classList.add('active');
        if (el) {
            el.classList.add('active');
            document.getElementById('topbar-title').innerText = el.innerText;
        }
    }

    function updateAlunos() {
        const discSelect = document.getElementById('disciplinaSelect');
        const alunoSelect = document.getElementById('alunoSelect');
        const selectedOption = discSelect.options[discSelect.selectedIndex];
        const turmaId = selectedOption.getAttribute('data-turma');

        alunoSelect.innerHTML = '<option value="">Selecione o aluno...</option>';

        if (turmaId && alunosPorTurma[turmaId]) {
            alunosPorTurma[turmaId].forEach(aluno => {
                const opt = document.createElement('option');
                opt.value = aluno.id;
                opt.textContent = aluno.nome;
                alunoSelect.appendChild(opt);
            });
        } else if (turmaId) {
            alunoSelect.innerHTML = '<option value="">Nenhum aluno ativo nesta turma.</option>';
        }
    }

    // --- Modal Nova Turma ---
    const disciplinasDB = <?= json_encode($disciplinasAtivas) ?>;

    function abrirModalNovaTurma() {
        document.getElementById('modalNovaTurma').classList.add('active');
    }
    function fecharModalNovaTurma() {
        document.getElementById('modalNovaTurma').classList.remove('active');
    }
    
    function filtrarDisciplinas() {
        const cursoId = document.getElementById('modalCurso').value;
        const discSelect = document.getElementById('modalDisciplina');
        discSelect.innerHTML = '<option value="">Selecione a disciplina...</option>';
        
        if(cursoId) {
            const vinculadas = disciplinasDB.filter(d => d.curso_id == cursoId);
            vinculadas.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = d.nome;
                discSelect.appendChild(opt);
            });
            if(vinculadas.length === 0) {
                discSelect.innerHTML = '<option value="">Nenhuma disciplina encontrada para este curso.</option>';
            }
        } else {
            discSelect.innerHTML = '<option value="">Selecione o curso primeiro...</option>';
        }
    }

    lucide.createIcons();
</script>
</body>
</html>
