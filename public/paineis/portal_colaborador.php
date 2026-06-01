<?php
// portal_colaborador.php — Portal da Secretaria / Colaborador | Sophie Link
session_start();
require_once '../../includes/auth.php';
protect_page(['colaborador']);
require_once '../../includes/db.php';
/** @var \PDO $pdo */
/** @var PDO $pdo */
require_once '../../app/Core/Security.php';
$csrfToken = Security::generateCsrfToken();

$nome = $_SESSION['usuario_nome'] ?? 'Secretaria';
$primeiroNome = explode(' ', $nome)[0];

// Se for um pedido de exportação
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=alunos_sophielink.csv');
    $output = fopen('php://output', 'w');
    // Adiciona o BOM para o Excel ler acentos corretamente
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    fputcsv($output, ['ID', 'Nome', 'CPF', 'RG', 'Curso', 'Situação', 'Criado Em'], ';');
    
    $stmt = $pdo->query("
        SELECT a.id, a.nome, a.cpf, a.rg, c.nome as curso, a.situacao_aluno, a.criado_em 
        FROM aprendizes a 
        LEFT JOIN turmas t ON a.turma_id = t.id 
        LEFT JOIN cursos c ON t.curso_id = c.id 
        WHERE a.deleted_at IS NULL 
        ORDER BY a.nome ASC
    ");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        fputcsv($output, $row, ';');
    }
    fclose($output);
    exit;
}

$erro = '';
$sucesso = '';

// Lógica de CRUD: Matricular novo aluno
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'matricular') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Requisição inválida (Falha de Segurança CSRF). Tente novamente.";
    } else {
    $novo_nome = trim($_POST['nome']);
    $novo_cpf = trim($_POST['cpf']);
    $novo_rg = trim($_POST['rg']);
    $novo_turma_id = (int)$_POST['turma_id'];

    if (empty($novo_nome) || empty($novo_cpf) || empty($novo_rg) || empty($novo_turma_id)) {
        $erro = "Todos os campos são obrigatórios.";
    } else {
        try {
            $stmt = $pdo->prepare("INSERT INTO aprendizes (nome, cpf, rg, turma_id, situacao_aluno) VALUES (?, ?, ?, ?, 'cursando')");
            $stmt->execute([$novo_nome, $novo_cpf, $novo_rg, $novo_turma_id]);
            $sucesso = "Aluno matriculado com sucesso!";
        } catch (PDOException $e) {
            $erro = "Erro ao cadastrar aluno no banco de dados. " . $e->getMessage();
        }
    }
    }
}

// Lógica de CRUD: Justificar Falta
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'justificar_falta') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Requisição inválida (Falha de Segurança CSRF). Tente novamente.";
    } else {
        $frequencia_id = (int)$_POST['frequencia_id'];
    if ($frequencia_id > 0) {
        try {
            $stmt = $pdo->prepare("UPDATE frequencia SET status = 'justificada' WHERE id = ?");
            $stmt->execute([$frequencia_id]);
            $sucesso = "Falta justificada com sucesso!";
        } catch (PDOException $e) {
            $erro = "Erro ao justificar falta. " . $e->getMessage();
        }
    }
    }
}

// Buscar todos os aprendizes para a lista (CRM Style)
$stmt = $pdo->query("
    SELECT a.*, e.nome AS empresa_nome, c.nome AS curso_nome 
    FROM aprendizes a 
    LEFT JOIN contratos cont ON a.id = cont.aprendiz_id 
    LEFT JOIN empresas e ON cont.empresa_id = e.id
    LEFT JOIN turmas t ON a.turma_id = t.id
    LEFT JOIN cursos c ON t.curso_id = c.id
    ORDER BY a.nome ASC
");
$aprendizes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Buscar turmas ativas para o select
$turmasDb = $pdo->query("SELECT t.id, t.nome, c.nome as curso_nome FROM turmas t JOIN cursos c ON t.curso_id = c.id ORDER BY c.nome, t.nome")->fetchAll(PDO::FETCH_ASSOC);

// Métricas Rápidas
$totalAlunos = count($aprendizes);
$ativos = 0;
foreach ($aprendizes as $a) {
    if ($a['situacao_aluno'] === 'cursando') $ativos++;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atendimento (Colaborador) — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/portal_colaborador.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>

<body>
    <div class="app">
        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="sb-header">
                <div class="sb-logo">SL</div>
                <div class="sb-title">Secretaria (Op)</div>
            </div>
            <div class="sb-menu">
                <div class="sb-lbl">Gestão</div>
                <div class="nav-link active" onclick="showSec('alunos', this)"><i data-lucide="users"></i> Buscar Alunos</div>
                <div class="nav-link" onclick="showSec('documentos', this)"><i data-lucide="file-check"></i> Emitir Declaração</div>
                <div class="nav-link" onclick="showSec('faltas', this)"><i data-lucide="user-x"></i> Justificar Faltas</div>

                <div class="sb-lbl" style="margin-top: 20px;">Agenda</div>
                <div class="nav-link" onclick="showSec('calendario', this)"><i data-lucide="calendar"></i> Calendário Letivo</div>
            </div>
            <div class="sb-user">
                <div class="sb-avatar"><?= strtoupper(substr($primeiroNome, 0, 1)) ?></div>
                <div>
                    <div class="sb-uname"><?= htmlspecialchars($primeiroNome) ?></div>
                    <div class="sb-urole">Apoio Administrativo</div>
                </div>
                <a href="../auth/logout.php" style="margin-left:auto; color:var(--c-text-muted);"><i data-lucide="log-out" style="width:18px;"></i></a>
            </div>
        </aside>

        <!-- WORKSPACE -->
        <div class="workspace">
            <header class="topbar">
                <div class="search-bar">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Buscar aluno por nome ou RA...">
                </div>
                <div class="tb-actions">
                    <button class="btn btn-outline"><i data-lucide="bell"></i> Avisos</button>
                    <!-- BOTÃO QUE ABRE O MODAL -->
                    <div style="display:flex; gap:10px;">
                        <a href="?export=csv" class="btn btn-outline"><i data-lucide="download" style="width:16px;"></i> CSV</a>
                        <button class="btn btn-primary" onclick="openModal('modalMatricula')"><i data-lucide="user-plus" style="width:16px;"></i> Matricular</button>
                    </div>
                </div>
            </header>

            <main class="content">
                <?php if ($sucesso): ?>
                    <div class="alert alert-success"><i data-lucide="check-circle"></i> <?= htmlspecialchars($sucesso) ?></div>
                <?php endif; ?>
                <?php if ($erro): ?>
                    <div class="alert alert-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
                <?php endif; ?>

                <!-- SEC: ALUNOS -->
                <div id="sec-alunos" class="sec active">
                    <h1 class="page-title">Fichas de Alunos</h1>
                    <p class="page-desc">Central de atendimento e atualização cadastral rápida.</p>

                    <div class="metrics">
                        <div class="metric-card">
                            <div class="mc-icon"><i data-lucide="users"></i></div>
                            <div>
                                <div class="mc-val"><?= $totalAlunos ?></div>
                                <div class="mc-lbl">Total Cadastrados</div>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="mc-icon" style="background:#D1FAE5; color:#059669;"><i data-lucide="check-circle"></i></div>
                            <div>
                                <div class="mc-val"><?= $ativos ?></div>
                                <div class="mc-lbl">Ativos Cursando</div>
                            </div>
                        </div>
                    </div>

                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">Alunos Recentes</div>
                            <button class="btn btn-outline" style="font-size:12px;">Ver Todos</button>
                        </div>
                        <div class="table-wrap">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>RA</th>
                                        <th>Nome do Aluno</th>
                                        <th>CPF</th>
                                        <th>Empresa Vinculada</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($aprendizes as $a):
                                        $ra = str_pad($a['id'], 6, '0', STR_PAD_LEFT);
                                        $isAtivo = $a['situacao_aluno'] === 'cursando';
                                    ?>
                                        <tr>
                                            <td style="font-family:monospace; color:var(--c-text-muted);"><?= $ra ?></td>
                                            <td style="font-weight:600; color:var(--c-text);"><?= htmlspecialchars($a['nome']) ?></td>
                                            <td><?= htmlspecialchars($a['cpf']) ?></td>
                                            <td><?= htmlspecialchars($a['empresa_nome'] ?? 'Sem Empresa') ?></td>
                                            <td>
                                                <span class="badge <?= $isAtivo ? 'badge-green' : 'badge-yellow' ?>">
                                                    <?= htmlspecialchars($a['situacao_aluno']) ?>
                                                </span>
                                            </td>
                                            <td>
                                                <button class="qa-btn">Editar</button>
                                                <button class="qa-btn">Atestado</button>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- SEC: DOCUMENTOS -->
                <div id="sec-documentos" class="sec">
                    <h1 class="page-title">Emissão de Documentos</h1>
                    <p class="page-desc">Gere declarações em PDF para assinatura da direção.</p>

                    <div class="panel" style="max-width: 600px;">
                        <div class="panel-head">
                            <div class="panel-title">Nova Declaração</div>
                        </div>
                        <form action="../reports/declaracao_print.php" method="GET" target="_blank" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                            <div>
                                <label style="font-size:13px; font-weight:500; display:block; margin-bottom:6px;">Selecionar Aluno</label>
                                <select name="aluno_id" class="form-control" required>
                                    <option value="">-- Selecione o Aluno --</option>
                                    <?php foreach ($aprendizes as $a): ?>
                                        <option value="<?= $a['id'] ?>"><?= htmlspecialchars($a['nome']) ?> (CPF: <?= htmlspecialchars($a['cpf']) ?>)</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:13px; font-weight:500; display:block; margin-bottom:6px;">Tipo de Documento</label>
                                <select name="tipo" class="form-control" required>
                                    <option value="matricula">Declaração de Matrícula</option>
                                    <option value="frequencia">Atestado de Frequência</option>
                                    <option value="historico">Histórico Parcial</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary" style="margin-top: 10px; width:100%; justify-content:center;"><i data-lucide="printer"></i> Gerar Documento Oficial (PDF)</button>
                        </form>
                    </div>
                </div>
                <!-- SEC: FALTAS -->
                <div id="sec-faltas" class="sec">
                    <h1 class="page-title">Justificar Faltas</h1>
                    <p class="page-desc">Exclusivo da Secretaria: visualize ausências e aplique justificativas (atestados, despensas).</p>
                    
                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">Faltas Pendentes</div>
                        </div>
                        <div class="table-wrap">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Aluno</th>
                                        <th>Disciplina</th>
                                        <th>Status Atual</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php 
                                    $stmtFaltas = $pdo->query("
                                        SELECT f.id, f.data_registro, f.status, a.nome AS aluno_nome, d.nome AS disc_nome
                                        FROM frequencia f
                                        JOIN aprendizes a ON f.aprendiz_id = a.id
                                        LEFT JOIN disciplinas d ON f.disciplina_id = d.id
                                        WHERE f.status = 'falta'
                                        ORDER BY f.data_registro DESC LIMIT 20
                                    ");
                                    while ($f = $stmtFaltas->fetch(PDO::FETCH_ASSOC)):
                                    ?>
                                    <tr>
                                        <td><?= date('d/m/Y', strtotime($f['data_registro'])) ?></td>
                                        <td style="font-weight:600;"><?= htmlspecialchars($f['aluno_nome']) ?></td>
                                        <td><?= htmlspecialchars($f['disc_nome'] ?? 'Geral') ?></td>
                                        <td><span class="badge badge-yellow">Falta</span></td>
                                        <td>
                                            <form method="POST" style="margin:0;">
                                                <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                                                <input type="hidden" name="acao" value="justificar_falta">
                                                <input type="hidden" name="frequencia_id" value="<?= $f['id'] ?>">
                                                <button type="submit" class="qa-btn" style="color:var(--c-brand); border-color:var(--c-brand);">Justificar (Atestado)</button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>

    <!-- MODAL DE MATRÍCULA -->
    <div id="modalMatricula" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">Matricular Novo Aluno</div>
                <button class="modal-close" onclick="closeModal('modalMatricula')"><i data-lucide="x"></i></button>
            </div>
            <form method="POST">
                <div class="modal-body">
                    <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                    <input type="hidden" name="acao" value="matricular">
                    
                    <div class="form-group">
                        <label class="form-label">Nome Completo</label>
                        <input type="text" name="nome" class="form-control" required placeholder="Ex: João Silva da Costa">
                    </div>
                    
                    <div style="display:flex; gap:16px;">
                        <div class="form-group" style="flex:1;">
                            <label class="form-label">CPF</label>
                            <input type="text" id="cpf_input" name="cpf" class="form-control" maxlength="14" required placeholder="000.000.000-00">
                        </div>
                        <div class="form-group" style="flex:1;">
                            <label class="form-label">RG</label>
                            <input type="text" name="rg" class="form-control" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Turma Inicial</label>
                        <select name="turma_id" class="form-control" required>
                            <option value="">Selecione uma turma...</option>
                            <?php foreach ($turmasDb as $t): ?>
                                <option value="<?= $t['id'] ?>"><?= htmlspecialchars($t['curso_nome'] . ' - ' . $t['nome']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modalMatricula')">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Concluir Matrícula</button>
                </div>
            </form>
        </div>
    </div>

    <script src="../assets/js/portal_colaborador.js"></script>
</body>
</html>
