<?php
// portal_colaborador.php — Portal da Secretaria / Colaborador | Sophie Link
session_start();
require_once '../../includes/auth.php';
protect_page(['colaborador']);
require_once '../../includes/db.php';
/** @var \PDO $pdo */
require_once '../../app/Core/Security.php';
$csrfToken = Security::generateCsrfToken();

$nome = $_SESSION['usuario_nome'] ?? 'Secretaria';
$primeiroNome = explode(' ', $nome)[0];
$iniciais = strtoupper(substr($primeiroNome, 0, 1));

// Exportação CSV
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=alunos_sophielink_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    fputcsv($output, ['RA', 'Nome', 'CPF', 'RG', 'Email', 'Telefone', 'Curso', 'Turma', 'Empresa', 'Situação', 'Criado Em'], ';');
    $stmt = $pdo->query("
        SELECT a.id, a.nome, a.cpf, a.rg, a.email, a.telefone,
               c.nome as curso, t.nome as turma, e.nome as empresa,
               a.situacao_aluno, a.criado_em
        FROM aprendizes a
        LEFT JOIN turmas t ON a.turma_id = t.id
        LEFT JOIN cursos c ON t.curso_id = c.id
        LEFT JOIN contratos cont ON a.id = cont.aprendiz_id AND cont.status = 'ativo'
        LEFT JOIN empresas e ON cont.empresa_id = e.id
        WHERE a.deleted_at IS NULL
        ORDER BY a.nome ASC
    ");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['id'] = str_pad($row['id'], 6, '0', STR_PAD_LEFT);
        fputcsv($output, $row, ';');
    }
    fclose($output);
    exit;
}

$erro = '';
$sucesso = '';

// Lógica CRUD: Matricular novo aluno
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['acao'] ?? '') === 'matricular') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Requisição inválida (CSRF). Tente novamente.";
    } else {
        $novo_nome    = trim($_POST['nome']);
        $novo_cpf     = trim($_POST['cpf']);
        $novo_rg      = trim($_POST['rg']);
        $novo_email   = trim($_POST['email'] ?? '');
        $novo_tel     = trim($_POST['telefone'] ?? '');
        $novo_turma   = (int)$_POST['turma_id'];

        if (empty($novo_nome) || empty($novo_cpf) || !$novo_turma) {
            $erro = "Nome, CPF e Turma são obrigatórios.";
        } else {
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO aprendizes 
                        (nome, cpf, rg, email, telefone, turma_id, data_nascimento, endereco, nome_mae, nome_pai, tipo, observacoes, situacao_aluno)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'cursando')
                ");
                $stmt->execute([
                    $novo_nome,
                    $novo_cpf,
                    trim($_POST['rg'] ?? ''),
                    trim($_POST['email'] ?? ''),
                    trim($_POST['telefone'] ?? ''),
                    $novo_turma,
                    trim($_POST['data_nascimento'] ?? '') ?: null,
                    trim($_POST['endereco'] ?? ''),
                    trim($_POST['nome_mae'] ?? ''),
                    trim($_POST['nome_pai'] ?? ''),
                    in_array($_POST['tipo'] ?? '', ['normal','aprendiz']) ? $_POST['tipo'] : 'aprendiz',
                    trim($_POST['observacoes'] ?? ''),
                ]);
                $sucesso = "Aluno <strong>" . htmlspecialchars($novo_nome) . "</strong> matriculado com sucesso!";
            } catch (PDOException $e) {
                $erro = "Erro ao cadastrar: " . $e->getMessage();
            }
        }
    }
}

// Lógica CRUD: Justificar Falta via POST normal (fallback)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['acao'] ?? '') === 'justificar_falta') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Token inválido. Tente novamente.";
    } else {
        $fid = (int)($_POST['frequencia_id'] ?? 0);
        if ($fid > 0) {
            $pdo->prepare("UPDATE frequencia SET status = 'justificada' WHERE id = ?")->execute([$fid]);
            $sucesso = "Falta justificada com sucesso!";
        }
    }
}

// Buscar aprendizes
$aprendizes = $pdo->query("
    SELECT a.*, e.nome AS empresa_nome, c.nome AS curso_nome, t.nome AS turma_nome
    FROM aprendizes a
    LEFT JOIN contratos cont ON a.id = cont.aprendiz_id AND cont.status = 'ativo'
    LEFT JOIN empresas e ON cont.empresa_id = e.id
    LEFT JOIN turmas t ON a.turma_id = t.id
    LEFT JOIN cursos c ON t.curso_id = c.id
    WHERE a.deleted_at IS NULL
    ORDER BY a.nome ASC
")->fetchAll(PDO::FETCH_ASSOC);

// Turmas para select
$turmasDb = $pdo->query("SELECT t.id, t.nome, c.nome as curso_nome FROM turmas t JOIN cursos c ON t.curso_id = c.id ORDER BY c.nome, t.nome")->fetchAll(PDO::FETCH_ASSOC);

// Métricas
$totalAlunos  = count($aprendizes);
$ativos       = 0;
$concluidos   = 0;
foreach ($aprendizes as $a) {
    if ($a['situacao_aluno'] === 'cursando') $ativos++;
    if ($a['situacao_aluno'] === 'concluido') $concluidos++;
}

// Faltas pendentes
$faltasPendentes = (int)($pdo->query("SELECT COUNT(*) FROM frequencia WHERE status = 'falta'")->fetchColumn());
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do Colaborador — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/portais/colaborador.css">
</head>
<body>
<div id="toast-container"></div>

<div class="app">
    <!-- ===== SIDEBAR ===== -->
    <aside class="sidebar">
        <div class="sb-header">
            <div class="sb-logo-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
            </div>
            <div>
                <div class="sb-brand">Sophie<span>Link</span></div>
            </div>
        </div>

        <nav class="sb-menu">
            <div class="sb-section-label">Gestão</div>
            <div class="nav-link active" id="nav-alunos" onclick="showSec('alunos', this)">
                <i data-lucide="users"></i> Alunos
            </div>
            <div class="nav-link" id="nav-matricular" onclick="showSec('matricular', this)">
                <i data-lucide="user-plus"></i> Matricular Aluno
            </div>
            <div class="nav-link" id="nav-documentos" onclick="showSec('documentos', this)">
                <i data-lucide="file-text"></i> Declarações
            </div>
            <div class="nav-link" id="nav-faltas" onclick="showSec('faltas', this)">
                <i data-lucide="user-x"></i> Justificar Faltas
                <?php if ($faltasPendentes > 0): ?>
                <span class="nav-badge"><?= $faltasPendentes ?></span>
                <?php endif; ?>
            </div>

            <div class="sb-section-label">Planejamento</div>
            <div class="nav-link" id="nav-calendario" onclick="showSec('calendario', this)">
                <i data-lucide="calendar"></i> Calendário Letivo
            </div>
        </nav>

        <div class="sb-footer">
            <div class="sb-user">
                <div class="sb-avatar"><?= $iniciais ?></div>
                <div>
                    <div class="sb-uname"><?= htmlspecialchars($primeiroNome) ?></div>
                    <div class="sb-urole">Apoio Administrativo</div>
                </div>
                <a href="../auth/logout.php" class="sb-logout" title="Sair">
                    <i data-lucide="log-out"></i>
                </a>
            </div>
        </div>
    </aside>

    <!-- ===== WORKSPACE ===== -->
    <div class="workspace">
        <header class="topbar">
            <div class="topbar-left">
                <div class="search-wrap">
                    <i data-lucide="search"></i>
                    <input type="text" id="searchInput" class="search-input" placeholder="Buscar aluno por nome, RA ou empresa...">
                </div>
            </div>
            <div class="topbar-actions">
                <a href="?export=csv" class="btn btn-outline" title="Exportar lista de alunos em CSV">
                    <i data-lucide="download"></i> Exportar CSV
                </a>
            </div>
        </header>

        <main class="content">
            <?php if ($sucesso): ?>
            <div class="alert alert-success"><i data-lucide="check-circle"></i> <?= $sucesso ?></div>
            <?php endif; ?>
            <?php if ($erro): ?>
            <div class="alert alert-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
            <?php endif; ?>

            <!-- ===== SEÇÃO: ALUNOS ===== -->
            <div id="sec-alunos" class="sec active">
                <div class="page-header">
                    <h1 class="page-title">Fichas de Alunos</h1>
                    <p class="page-desc">Visualize, pesquise e gerencie os cadastros de todos os aprendizes.</p>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="mc-icon blue"><i data-lucide="users"></i></div>
                        <div>
                            <div class="mc-val"><?= $totalAlunos ?></div>
                            <div class="mc-lbl">Total Cadastrados</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="mc-icon green"><i data-lucide="check-circle"></i></div>
                        <div>
                            <div class="mc-val"><?= $ativos ?></div>
                            <div class="mc-lbl">Ativos Cursando</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="mc-icon yellow"><i data-lucide="graduation-cap"></i></div>
                        <div>
                            <div class="mc-val"><?= $concluidos ?></div>
                            <div class="mc-lbl">Concluídos</div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="mc-icon red"><i data-lucide="alert-triangle"></i></div>
                        <div>
                            <div class="mc-val"><?= $faltasPendentes ?></div>
                            <div class="mc-lbl">Faltas Pendentes</div>
                        </div>
                    </div>
                </div>

                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">Lista de Alunos</div>
                        <div class="panel-actions">
                            <input type="text" id="searchInput" class="form-control" placeholder="Buscar por nome, RA ou empresa..." style="width:260px; padding:7px 12px;" oninput="filterTable()">
                            <select id="filterSituacao" class="form-control" style="width:auto; padding:6px 10px; font-size:12px;" onchange="filterTable()">
                                <option value="">Todas as situações</option>
                                <option value="cursando">Cursando</option>
                                <option value="formado">Formado</option>
                                <option value="evadido">Evadido</option>
                            </select>
                        </div>
                    </div>
                    <div class="table-wrap">
                        <table class="data-table" id="alunosTable">
                            <thead>
                                <tr>
                                    <th>RA</th>
                                    <th>Aluno</th>
                                    <th>Empresa</th>
                                    <th>Curso</th>
                                    <th>Situação</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($aprendizes as $a):
                                    $ra = str_pad($a['id'], 6, '0', STR_PAD_LEFT);
                                    $inicial = strtoupper(mb_substr($a['nome'], 0, 1));
                                    $situacao = $a['situacao_aluno'];
                                    $badgeClass = match($situacao) {
                                        'cursando' => 'badge-green',
                                        'formado'  => 'badge-blue',
                                        'evadido'  => 'badge-red',
                                        default    => 'badge-gray'
                                    };
                                ?>
                                <tr data-nome="<?= strtolower(htmlspecialchars($a['nome'])) ?>"
                                    data-empresa="<?= strtolower(htmlspecialchars($a['empresa_nome'] ?? '')) ?>"
                                    data-ra="<?= $ra ?>"
                                    data-situacao="<?= $situacao ?>">
                                    <td><span class="ra-code"><?= $ra ?></span></td>
                                    <td>
                                        <div class="aluno-cell">
                                            <div class="aluno-avatar"><?= $inicial ?></div>
                                            <div>
                                                <div class="aluno-name"><?= htmlspecialchars($a['nome']) ?></div>
                                                <div class="aluno-email"><?= htmlspecialchars($a['email'] ?? 'Sem e-mail') ?></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><?= htmlspecialchars($a['empresa_nome'] ?? '—') ?></td>
                                    <td><?= htmlspecialchars($a['curso_nome'] ?? '—') ?></td>
                                    <td><span class="badge <?= $badgeClass ?>"><?= $situacao ?></span></td>
                                    <td>
                                        <div class="action-btns">
                                            <button class="icon-btn" title="Editar dados" onclick="abrirEdicao(<?= $a['id'] ?>)">
                                                <i data-lucide="pencil"></i>
                                            </button>
                                            <a href="../reports/declaracao_print.php?aluno_id=<?= $a['id'] ?>&tipo=matricula" target="_blank" class="icon-btn" title="Gerar Declaração de Matrícula">
                                                <i data-lucide="file-text"></i>
                                            </a>
                                            <button class="icon-btn danger" title="Ver histórico de faltas" onclick="showSec('faltas', document.getElementById('nav-faltas'))">
                                                <i data-lucide="calendar-x"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <?php if (empty($aprendizes)): ?>
                        <div class="empty-state">
                            <i data-lucide="users"></i>
                            <p>Nenhum aluno cadastrado ainda.</p>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <!-- ===== SEÇÃO: DECLARAÇÕES ===== -->
            <div id="sec-documentos" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Emissão de Documentos</h1>
                    <p class="page-desc">Selecione o aluno e o tipo de documento para gerar o PDF oficial.</p>
                </div>

                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">Gerar Novo Documento</div>
                    </div>
                    <form action="../reports/declaracao_print.php" method="GET" target="_blank" style="padding: 30px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            <div class="form-group" style="grid-column: 1/-1;">
                                <label class="form-label">Selecionar Aluno</label>
                                <select name="aluno_id" class="form-control" required>
                                    <option value="">— Selecione o aluno —</option>
                                    <?php foreach ($aprendizes as $a): ?>
                                    <option value="<?= $a['id'] ?>"><?= htmlspecialchars($a['nome']) ?> (RA: <?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?>)</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <div class="form-group" style="grid-column: 1/-1;">
                                <label class="form-label">Tipo de Documento</label>
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
                                    <label style="cursor:pointer; display:flex; align-items:center; gap:10px; padding:14px 16px; border:1px solid var(--border); border-radius:8px; transition:0.15s;" class="doc-option">
                                        <input type="radio" name="tipo" value="matricula" checked style="accent-color:var(--brand);">
                                        <i data-lucide="file-badge" style="width:20px;height:20px;color:var(--brand);"></i>
                                        <div>
                                            <div style="font-weight:600;font-size:13px;">Declaração de Matrícula</div>
                                            <div style="font-size:11.5px;color:var(--text-muted);">Comprova vínculo ativo</div>
                                        </div>
                                    </label>
                                    <label style="cursor:pointer; display:flex; align-items:center; gap:10px; padding:14px 16px; border:1px solid var(--border); border-radius:8px; transition:0.15s;" class="doc-option">
                                        <input type="radio" name="tipo" value="frequencia" style="accent-color:var(--brand);">
                                        <i data-lucide="calendar-check" style="width:20px;height:20px;color:var(--green);"></i>
                                        <div>
                                            <div style="font-weight:600;font-size:13px;">Atestado de Frequência</div>
                                            <div style="font-size:11.5px;color:var(--text-muted);">Percentual de presença</div>
                                        </div>
                                    </label>
                                    <label style="cursor:pointer; display:flex; align-items:center; gap:10px; padding:14px 16px; border:1px solid var(--border); border-radius:8px; transition:0.15s;" class="doc-option">
                                        <input type="radio" name="tipo" value="historico" style="accent-color:var(--brand);">
                                        <i data-lucide="scroll-text" style="width:20px;height:20px;color:var(--yellow);"></i>
                                        <div>
                                            <div style="font-weight:600;font-size:13px;">Histórico Parcial</div>
                                            <div style="font-size:11.5px;color:var(--text-muted);">Notas e disciplinas</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div style="display:flex; justify-content:flex-end; margin-top:30px; border-top:1px solid var(--border); padding-top:20px;">
                            <button type="submit" class="btn btn-primary" style="padding:12px 24px; font-size:15px;">
                                <i data-lucide="printer"></i> Gerar Documento (PDF)
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ===== SEÇÃO: FALTAS ===== -->
            <div id="sec-faltas" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Justificar Faltas</h1>
                    <p class="page-desc">Aplique justificativas (atestado médico, licença) nas ausências não justificadas.</p>
                </div>

                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">Faltas Pendentes</div>
                        <span class="badge badge-red"><?= $faltasPendentes ?> pendente(s)</span>
                    </div>
                    <div class="table-wrap">
                        <table class="data-table" id="faltasTable">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Aluno</th>
                                    <th>Disciplina</th>
                                    <th>Status</th>
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
                                    ORDER BY f.data_registro DESC
                                    LIMIT 50
                                ");
                                $faltas = $stmtFaltas->fetchAll(PDO::FETCH_ASSOC);
                                foreach ($faltas as $f):
                                    $inicial = strtoupper(mb_substr($f['aluno_nome'], 0, 1));
                                ?>
                                <tr id="falta-row-<?= $f['id'] ?>">
                                    <td><?= date('d/m/Y', strtotime($f['data_registro'])) ?></td>
                                    <td>
                                        <div class="aluno-cell">
                                            <div class="aluno-avatar" style="width:28px;height:28px;font-size:11px;"><?= $inicial ?></div>
                                            <span style="font-weight:600;"><?= htmlspecialchars($f['aluno_nome']) ?></span>
                                        </div>
                                    </td>
                                    <td><?= htmlspecialchars($f['disc_nome'] ?? 'Geral') ?></td>
                                    <td><span class="badge badge-yellow">Falta</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="justificarFalta(<?= $f['id'] ?>, this)" style="color:var(--green); border-color:var(--green);">
                                            <i data-lucide="check"></i> Justificar
                                        </button>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                                <?php if (empty($faltas)): ?>
                                <tr>
                                    <td colspan="5">
                                        <div class="empty-state">
                                            <i data-lucide="check-circle"></i>
                                            <p>Nenhuma falta pendente. Tudo em dia!</p>
                                        </div>
                                    </td>
                                </tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ===== SEÇÃO: CALENDÁRIO ===== -->
            <div id="sec-calendario" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Calendário Letivo</h1>
                    <p class="page-desc">Visualize os dias de aula, feriados e recessos do período atual.</p>
                </div>
                <div class="panel" style="max-width: 700px;">
                    <div class="calendar-header">
                        <div class="cal-nav">
                            <button class="btn btn-outline btn-sm" onclick="calNav(-1)"><i data-lucide="chevron-left" style="width:14px;height:14px;"></i></button>
                            <div class="cal-month-title" id="calMonthTitle"></div>
                            <button class="btn btn-outline btn-sm" onclick="calNav(1)"><i data-lucide="chevron-right" style="width:14px;height:14px;"></i></button>
                        </div>
                        <button class="btn btn-sm btn-ghost" onclick="calGoToday()">Hoje</button>
                    </div>
                    <div class="calendar-grid">
                        <div class="cal-weekdays">
                            <div class="cal-wd">Dom</div>
                            <div class="cal-wd">Seg</div>
                            <div class="cal-wd">Ter</div>
                            <div class="cal-wd">Qua</div>
                            <div class="cal-wd">Qui</div>
                            <div class="cal-wd">Sex</div>
                            <div class="cal-wd">Sáb</div>
                        </div>
                        <div class="cal-days" id="calDays"></div>
                    </div>
                    <div class="cal-legend">
                        <div class="cal-legend-item"><div class="cal-legend-dot" style="background:var(--brand);"></div>Hoje</div>
                        <div class="cal-legend-item"><div class="cal-legend-dot" style="background:var(--green);"></div>Dia de Aula</div>
                        <div class="cal-legend-item"><div class="cal-legend-dot" style="background:var(--yellow);"></div>Feriado</div>
                        <div class="cal-legend-item"><div class="cal-legend-dot" style="background:#7C3AED;"></div>Recesso</div>
                    </div>
                </div>
            </div>

            <!-- ===== SEÇÃO: MATRICULAR ALUNO ===== -->
            <div id="sec-matricular" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Matricular Novo Aluno</h1>
                    <p class="page-desc">Preencha os dados do aprendiz para adicioná-lo ao sistema.</p>
                </div>
                
                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">Ficha de Matrícula</div>
                    </div>
                    <form method="POST" id="formMatricula" style="padding: 30px;">
                        <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                        <input type="hidden" name="acao" value="matricular">

                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">

                            <!-- Linha 1 -->
                            <div class="form-group" style="grid-column: 1 / -1;">
                                <label class="form-label">Nome Completo *</label>
                                <input type="text" name="nome" class="form-control" required placeholder="Ex: João da Silva Costa">
                            </div>

                            <!-- Linha 2 -->
                            <div class="form-group">
                                <label class="form-label">CPF *</label>
                                <input type="text" id="cpf_input" name="cpf" class="form-control" maxlength="14" required placeholder="000.000.000-00">
                            </div>
                            <div class="form-group">
                                <label class="form-label">RG</label>
                                <input type="text" name="rg" class="form-control" placeholder="XX.XXX.XXX-X">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Data de Nascimento</label>
                                <input type="date" name="data_nascimento" class="form-control">
                            </div>

                            <!-- Linha 3 -->
                            <div class="form-group">
                                <label class="form-label">E-mail</label>
                                <input type="email" name="email" class="form-control" placeholder="aluno@email.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Telefone</label>
                                <input type="text" name="telefone" class="form-control" placeholder="(11) 99999-0000">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tipo de Aluno</label>
                                <select name="tipo" class="form-control">
                                    <option value="aprendiz">Jovem Aprendiz</option>
                                    <option value="normal">Aluno Regular</option>
                                </select>
                            </div>

                            <!-- Linha 4 -->
                            <div class="form-group" style="grid-column: 1 / -1;">
                                <label class="form-label">Endereço Completo</label>
                                <input type="text" name="endereco" class="form-control" placeholder="Rua, número, bairro, cidade - UF">
                            </div>

                            <!-- Linha 5 -->
                            <div class="form-group">
                                <label class="form-label">Nome da Mãe</label>
                                <input type="text" name="nome_mae" class="form-control" placeholder="Nome completo da mãe">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Nome do Pai</label>
                                <input type="text" name="nome_pai" class="form-control" placeholder="Nome completo do pai">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Turma Inicial *</label>
                                <select name="turma_id" class="form-control" required>
                                    <option value="">Selecione uma turma...</option>
                                    <?php foreach ($turmasDb as $t): ?>
                                    <option value="<?= $t['id'] ?>"><?= htmlspecialchars($t['curso_nome'] . ' — ' . $t['nome']) ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <!-- Linha 6 -->
                            <div class="form-group" style="grid-column: 1 / -1;">
                                <label class="form-label">Observações</label>
                                <textarea name="observacoes" class="form-control" rows="3" placeholder="Anotações internas sobre o aluno (opcional)" style="resize:vertical;"></textarea>
                            </div>

                        </div>
                        
                        <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:30px; border-top: 1px solid var(--border); padding-top: 20px;">
                            <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-size: 15px;"><i data-lucide="check"></i> Concluir Matrícula</button>
                        </div>
                    </form>
                </div>
            </div>

        </main>
    </div>
</div>

<!-- ===== MODAL: EDITAR ALUNO ===== -->
<div id="modalEdicao" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <div class="modal-icon"><i data-lucide="pencil"></i></div>
            <div class="modal-title-wrap">
                <div class="modal-title" id="editModalTitle">Editar Aluno</div>
                <div class="modal-subtitle" id="editModalRA">RA: ------</div>
            </div>
            <button class="modal-close" onclick="closeModal('modalEdicao')"><i data-lucide="x"></i></button>
        </div>
        <div id="editModalLoading" style="padding:40px; text-align:center; color:var(--text-muted);">
            <div class="spinner" style="margin:0 auto 12px;width:24px;height:24px;border-width:3px;"></div>
            <p>Carregando dados...</p>
        </div>
        <div id="editModalContent" style="display:none;">
            <div class="modal-body">
                <input type="hidden" id="edit_id">
                <div class="form-group">
                    <label class="form-label">Nome Completo *</label>
                    <input type="text" id="edit_nome" class="form-control" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">CPF *</label>
                        <input type="text" id="edit_cpf" class="form-control" maxlength="14" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">RG</label>
                        <input type="text" id="edit_rg" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">E-mail</label>
                        <input type="email" id="edit_email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="text" id="edit_telefone" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Situação</label>
                        <select id="edit_situacao" class="form-control">
                            <option value="cursando">Cursando</option>
                            <option value="formado">Formado</option>
                            <option value="evadido">Evadido</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Turma</label>
                        <select id="edit_turma_id" class="form-control"></select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="edit_observacoes" class="form-control" rows="2" style="resize:vertical;"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="closeModal('modalEdicao')">Cancelar</button>
                <button type="button" class="btn btn-primary" id="btnSalvarEdicao" onclick="salvarEdicao()">
                    <i data-lucide="save"></i> Salvar Alterações
                </button>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="csrfToken" value="<?= $csrfToken ?>">
<script src="../assets/js/portais/colaborador.js"></script>
</body>
</html>
