<?php
// portal_colaborador.php — Portal da Secretaria / Colaborador | Sophie Link
session_start();
require_once '../../includes/auth.php';
protect_page(['colaborador']);
require_once '../../includes/db.php';
require_once '../../app/Models/Empresa.php';
/** @var \PDO $pdo */
require_once '../../app/Core/Security.php';
$csrfToken = Security::generateCsrfToken();

$empresaModel = new \Models\Empresa();

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

// Lógica CRUD: Concluir Solicitação de Documento
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['acao'] ?? '') === 'concluir_solicitacao') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Sessão expirada. Atualize a página e tente novamente.";
    } else {
        $sol_id = (int)$_POST['solicitacao_id'];
        $pdo->prepare("UPDATE solicitacoes_documentos SET status = 'concluido' WHERE id = ?")->execute([$sol_id]);
        $sucesso = "Solicitação concluída com sucesso!";
    }
}

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

// Lógica CRUD: Cadastrar Professor
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['acao'] ?? '') === 'add_professor') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Requisição inválida (CSRF). Tente novamente.";
    } else {
        $novo_nome = trim($_POST['nome']);
        $novo_email = trim($_POST['email']);
        $nova_senha = $_POST['senha'];

        if (empty($novo_nome) || empty($novo_email) || empty($nova_senha)) {
            $erro = "Todos os campos do professor são obrigatórios.";
        } else {
            try {
                $hash = password_hash($nova_senha, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, 'professor')");
                $stmt->execute([$novo_nome, $novo_email, $hash]);
                $sucesso = "Professor <strong>" . htmlspecialchars($novo_nome) . "</strong> cadastrado com sucesso!";
            } catch (PDOException $e) {
                if ($e->getCode() == 23000) {
                    $erro = "Já existe um usuário cadastrado com este e-mail.";
                } else {
                    $erro = "Erro ao cadastrar professor: " . $e->getMessage();
                }
            }
        }
    }
}

// Lógica CRUD: Cadastrar Empresa
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['acao'] ?? '') === 'add_empresa') {
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Requisição inválida (CSRF). Tente novamente.";
    } else {
        try {
            $empresaModel->criar($_POST);
            $sucesso = "Empresa adicionada com sucesso!";
        } catch (Exception $e) {
            $erro = "Erro ao cadastrar empresa: " . $e->getMessage();
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

// Buscar Professores
$listaProfessores = $pdo->query("SELECT id, nome, email, criado_em FROM usuarios WHERE nivel = 'professor' AND deleted_at IS NULL ORDER BY nome ASC")->fetchAll(PDO::FETCH_ASSOC);

// Buscar Empresas
$listaEmpresas = $empresaModel->listar();

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
            <!-- Gestão -->
            <div class="sb-section-group" id="group-gestao">
                <div class="sb-section-label" onclick="this.parentElement.classList.toggle('collapsed')">
                    Gestão <i data-lucide="chevron-down"></i>
                </div>
                <div class="sb-section-content">
                    <div class="nav-link active" id="nav-alunos" onclick="showSec('alunos', this)">
                        <i data-lucide="users"></i> Alunos
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
                </div>
            </div>

            <!-- Cadastros -->
            <div class="sb-section-group collapsed" id="group-cadastros">
                <div class="sb-section-label" onclick="this.parentElement.classList.toggle('collapsed')">
                    Cadastros <i data-lucide="chevron-down"></i>
                </div>
                <div class="sb-section-content">
                    <div class="nav-link" id="nav-matricular" onclick="showSec('matricular', this)">
                        <i data-lucide="user-plus"></i> Matricular Aluno
                    </div>
                    <div class="nav-link" id="nav-professores" onclick="showSec('professores', this)">
                        <i data-lucide="graduation-cap"></i> Professores
                    </div>
                    <div class="nav-link" id="nav-empresas" onclick="showSec('empresas', this)">
                        <i data-lucide="briefcase"></i> Empresas
                    </div>
                </div>
            </div>

            <!-- Planejamento -->
            <div class="sb-section-group collapsed" id="group-planejamento">
                <div class="sb-section-label" onclick="this.parentElement.classList.toggle('collapsed')">
                    Planejamento <i data-lucide="chevron-down"></i>
                </div>
                <div class="sb-section-content">
                    <div class="nav-link" id="nav-calendario" onclick="showSec('calendario', this)">
                        <i data-lucide="calendar"></i> Calendário Letivo
                    </div>
                </div>
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
                    <p class="page-desc">Selecione o aluno e o tipo de documento para gerar o PDF oficial, ou atenda as solicitações pendentes.</p>
                </div>
                
                <?php
                // Buscar solicitações pendentes
                $stmtPendentes = $pdo->query("
                    SELECT s.*, a.nome AS aluno_nome
                    FROM solicitacoes_documentos s
                    JOIN aprendizes a ON s.aprendiz_id = a.id
                    WHERE s.status = 'pendente'
                    ORDER BY s.criado_em ASC
                ");
                $solPendentes = $stmtPendentes->fetchAll();
                ?>
                <div class="panel" style="margin-bottom: 24px;">
                    <div class="panel-head" style="background:#F8FAFC;">
                        <div class="panel-title" style="color:var(--brand);">
                            <i data-lucide="bell" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i>
                            Solicitações Pendentes dos Alunos
                        </div>
                        <?php if (count($solPendentes) > 0): ?>
                        <span class="badge badge-red"><?= count($solPendentes) ?> pendente(s)</span>
                        <?php endif; ?>
                    </div>
                    <?php if (empty($solPendentes)): ?>
                        <div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px;">
                            <i data-lucide="check-circle" style="width:30px;height:30px;opacity:0.3;margin-bottom:10px;display:inline-block;"></i><br>
                            Nenhuma solicitação pendente no momento.
                        </div>
                    <?php else: ?>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Aluno</th>
                                    <th>Documento Solicitado</th>
                                    <th style="text-align:right;">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($solPendentes as $sol): ?>
                                <tr>
                                    <td><?= date('d/m/Y', strtotime($sol['criado_em'])) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($sol['aluno_nome']) ?></td>
                                    <td style="text-transform:capitalize;"><?= $sol['tipo_documento'] ?></td>
                                    <td style="text-align:right;">
                                        <div style="display:flex; gap:8px; justify-content:flex-end;">
                                            <a href="../reports/declaracao_print.php?aluno_id=<?= $sol['aprendiz_id'] ?>&tipo=<?= $sol['tipo_documento'] ?>" target="_blank" class="btn btn-sm btn-outline" style="color:var(--blue-dk); border-color:var(--blue-dk);" title="Gerar e Imprimir PDF">
                                                <i data-lucide="printer"></i> Imprimir
                                            </a>
                                            <form method="POST" style="display:inline;">
                                                <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                                                <input type="hidden" name="acao" value="concluir_solicitacao">
                                                <input type="hidden" name="solicitacao_id" value="<?= $sol['id'] ?>">
                                                <button type="submit" class="btn btn-sm btn-outline" style="color:var(--green); border-color:var(--green);" title="Marcar como Concluído">
                                                    <i data-lucide="check"></i> Concluir
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>

                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-title">Gerar Novo Documento</div>
                    </div>
                    <form action="../reports/declaracao_print.php" method="GET" target="_blank" style="padding: 24px;" onsubmit="if(!document.getElementById('doc_aluno_id').value){ alert('⚠️ Atenção: Por favor, selecione um aluno clicando em uma das linhas da tabela antes de gerar o documento.'); return false; }">
                        
                        <div style="display: flex; flex-wrap: wrap; gap: 30px; align-items: flex-start;">
                            
                            <!-- COLUNA ESQUERDA: LISTA DE ALUNOS -->
                            <div style="flex: 1 1 500px;">
                                <label class="form-label" style="font-size:15px; margin-bottom:15px;"><i data-lucide="users" style="width:18px;height:18px;vertical-align:-4px;margin-right:6px;color:var(--brand);"></i>1. Selecione o Aluno</label>
                                <input type="hidden" name="aluno_id" id="doc_aluno_id">
                                
                                <div style="border: 1px solid var(--border); border-radius: var(--radius-md); background: #fff; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                    
                                    <!-- Search Bar (Minimalist) -->
                                    <div style="display:flex; align-items:center; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px; margin-bottom: 20px;">
                                        <input type="text" id="doc_aluno_search" placeholder="Pesquisar por nome do aluno..." style="border:none; outline:none; font-size:15px; width:100%; color:var(--text); background:transparent;" autocomplete="off">
                                        <i data-lucide="search" style="width:20px;height:20px;color:#94A3B8;"></i>
                                    </div>
                                    
                                    <!-- Table -->
                                    <div class="table-wrap" style="overflow-x:auto;">
                                        <table class="data-table" style="width:100%; min-width:450px; border-bottom:1px solid var(--border);">
                                            <thead>
                                                <tr>
                                                    <th style="width:60%;">Aluno</th>
                                                    <th style="width:30%;">Turma</th>
                                                    <th style="width:10%; text-align:center;">Selecionar</th>
                                                </tr>
                                            </thead>
                                            <tbody id="doc_aluno_tbody">
                                                <?php 
                                                usort($aprendizes, function($a, $b) { return strcmp($a['nome'], $b['nome']); });
                                                foreach ($aprendizes as $a): 
                                                ?>
                                                <tr class="doc-aluno-row" data-nome="<?= htmlspecialchars(strtolower($a['nome'])) ?>" data-id="<?= $a['id'] ?>" style="cursor:pointer; transition:0.1s;">
                                                    <td style="font-weight:500; color:var(--text-2);">
                                                        <div style="display:flex; align-items:center; gap:8px;">
                                                            <div style="width:32px;height:32px;border-radius:50%;background:var(--blue-lt);color:var(--brand);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;">
                                                                <?= substr($a['nome'], 0, 1) ?>
                                                            </div>
                                                            <?= htmlspecialchars($a['nome']) ?>
                                                        </div>
                                                    </td>
                                                    <td style="font-size:12px; color:var(--text-muted);"><?= htmlspecialchars($a['curso_nome'] ?? '—') ?></td>
                                                    <td style="text-align:center;">
                                                        <div class="doc-radio" style="width:20px;height:20px;border:2px solid var(--border);border-radius:50%;margin:0 auto;position:relative;">
                                                            <div class="doc-radio-inner" style="width:10px;height:10px;background:var(--brand);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);transition:0.2s;"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <?php endforeach; ?>
                                                <tr id="doc_aluno_empty" style="display:none;">
                                                    <td colspan="3" style="text-align:center; padding:30px; color:var(--text-muted);">Nenhum aluno encontrado para sua pesquisa.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Pagination Footer -->
                                    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:15px; margin-top:15px; font-size:13px; color:var(--text-muted);">
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <div style="width:8px;height:8px;background:var(--green);border-radius:50%;box-shadow:0 0 0 3px var(--green-lt);"></div> Alunos Ativos
                                        </div>
                                        <div style="display:flex; align-items:center; gap:24px;">
                                            <div style="display:flex; align-items:center; gap:8px;">
                                                Exibir: 
                                                <select id="doc_page_size" style="border:none; border-bottom:2px solid var(--border); background:transparent; font-size:13px; font-weight:600; color:var(--text-2); cursor:pointer; outline:none; padding-bottom:2px;">
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                            <div style="font-weight:500;"><span id="doc_page_info">1 - 5</span> de <span id="doc_total_info">0</span></div>
                                            <div style="display:flex; gap:4px;">
                                                <button type="button" id="doc_btn_first" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Primeira Página"><i data-lucide="chevrons-left" style="width:16px;height:16px;"></i></button>
                                                <button type="button" id="doc_btn_prev" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Página Anterior"><i data-lucide="chevron-left" style="width:16px;height:16px;"></i></button>
                                                <button type="button" id="doc_btn_next" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Próxima Página"><i data-lucide="chevron-right" style="width:16px;height:16px;"></i></button>
                                                <button type="button" id="doc_btn_last" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Última Página"><i data-lucide="chevrons-right" style="width:16px;height:16px;"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <style>
                                    .doc-aluno-row:hover { background: #f8fafc; }
                                    .doc-aluno-row.selected { background: var(--blue-lt); }
                                    .doc-aluno-row.selected .doc-radio { border-color: var(--brand); }
                                    .doc-aluno-row.selected .doc-radio-inner { transform: translate(-50%,-50%) scale(1); }
                                </style>

                                <script>
                                document.addEventListener('DOMContentLoaded', function() {
                                    const searchInput = document.getElementById('doc_aluno_search');
                                    const hiddenInput = document.getElementById('doc_aluno_id');
                                    const rows = Array.from(document.querySelectorAll('.doc-aluno-row'));
                                    const emptyMsg = document.getElementById('doc_aluno_empty');
                                    const btnFirst = document.getElementById('doc_btn_first');
                                    const btnPrev = document.getElementById('doc_btn_prev');
                                    const btnNext = document.getElementById('doc_btn_next');
                                    const btnLast = document.getElementById('doc_btn_last');
                                    const pageInfo = document.getElementById('doc_page_info');
                                    const totalInfo = document.getElementById('doc_total_info');
                                    const pageSizeSelect = document.getElementById('doc_page_size');

                                    let filteredRows = [...rows];
                                    let currentPage = 1;
                                    let pageSize = parseInt(pageSizeSelect.value);

                                    function renderTable() {
                                        // Hide all first
                                        rows.forEach(r => r.style.display = 'none');
                                        
                                        const total = filteredRows.length;
                                        totalInfo.textContent = total;
                                        
                                        if (total === 0) {
                                            emptyMsg.style.display = 'table-row';
                                            pageInfo.textContent = '0 - 0';
                                            btnFirst.disabled = true;
                                            btnPrev.disabled = true;
                                            btnNext.disabled = true;
                                            btnLast.disabled = true;
                                            updateBtnStyles();
                                            return;
                                        }
                                        
                                        emptyMsg.style.display = 'none';
                                        const maxPage = Math.ceil(total / pageSize);
                                        if (currentPage > maxPage) currentPage = maxPage;
                                        if (currentPage < 1) currentPage = 1;

                                        const startIdx = (currentPage - 1) * pageSize;
                                        const endIdx = Math.min(startIdx + pageSize, total);
                                        
                                        pageInfo.textContent = `${startIdx + 1} - ${endIdx}`;
                                        
                                        for (let i = startIdx; i < endIdx; i++) {
                                            filteredRows[i].style.display = 'table-row';
                                        }
                                        
                                        btnFirst.disabled = currentPage === 1;
                                        btnPrev.disabled = currentPage === 1;
                                        btnNext.disabled = currentPage === maxPage;
                                        btnLast.disabled = currentPage === maxPage;
                                        updateBtnStyles();
                                    }

                                    function updateBtnStyles() {
                                        btnFirst.style.opacity = btnFirst.disabled ? '0.3' : '1';
                                        btnPrev.style.opacity = btnPrev.disabled ? '0.3' : '1';
                                        btnNext.style.opacity = btnNext.disabled ? '0.3' : '1';
                                        btnLast.style.opacity = btnLast.disabled ? '0.3' : '1';
                                    }

                                    pageSizeSelect.addEventListener('change', function() {
                                        pageSize = parseInt(this.value);
                                        currentPage = 1; // Reset to page 1 on size change
                                        renderTable();
                                    });

                                    searchInput.addEventListener('input', function() {
                                        const val = this.value.toLowerCase();
                                        filteredRows = rows.filter(r => r.dataset.nome.includes(val));
                                        currentPage = 1;
                                        renderTable();
                                    });

                                    btnFirst.addEventListener('click', () => { if(currentPage > 1) { currentPage = 1; renderTable(); } });
                                    btnPrev.addEventListener('click', () => { if(currentPage > 1) { currentPage--; renderTable(); } });
                                    btnNext.addEventListener('click', () => { if(currentPage * pageSize < filteredRows.length) { currentPage++; renderTable(); } });
                                    btnLast.addEventListener('click', () => { 
                                        const maxPage = Math.ceil(filteredRows.length / pageSize);
                                        if(currentPage < maxPage) { currentPage = maxPage; renderTable(); } 
                                    });

                                    rows.forEach(row => {
                                        row.addEventListener('click', function() {
                                            rows.forEach(r => r.classList.remove('selected'));
                                            this.classList.add('selected');
                                            hiddenInput.value = this.dataset.id;
                                        });
                                    });

                                    renderTable();
                                });
                                </script>
                            </div>

                            <!-- COLUNA DIREITA: OPÇÕES E BOTÃO -->
                            <div style="flex: 0 0 350px; position: sticky; top: 20px;">
                                <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
                                    <label class="form-label" style="font-size:15px; margin-bottom:15px; display:flex; align-items:center; gap:8px;">
                                        <i data-lucide="settings-2" style="width:18px;height:18px;color:var(--brand);"></i> 
                                        2. Configurar Emissão
                                    </label>
                                    
                                    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px;">
                                        <label style="cursor:pointer; display:flex; align-items:center; gap:12px; padding:16px; border:2px solid var(--border); border-radius:10px; transition:0.2s; background:#fff;" class="doc-option-card">
                                            <input type="radio" name="tipo" value="matricula" checked style="accent-color:var(--brand); transform:scale(1.2);">
                                            <i data-lucide="file-badge" style="width:22px;height:22px;color:var(--brand);"></i>
                                            <div>
                                                <div style="font-weight:600;font-size:14px;color:var(--text-2);">Matrícula</div>
                                                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Comprova vínculo ativo</div>
                                            </div>
                                        </label>
                                        <label style="cursor:pointer; display:flex; align-items:center; gap:12px; padding:16px; border:2px solid var(--border); border-radius:10px; transition:0.2s; background:#fff;" class="doc-option-card">
                                            <input type="radio" name="tipo" value="frequencia" style="accent-color:var(--brand); transform:scale(1.2);">
                                            <i data-lucide="calendar-check" style="width:22px;height:22px;color:var(--green);"></i>
                                            <div>
                                                <div style="font-weight:600;font-size:14px;color:var(--text-2);">Frequência</div>
                                                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Percentual de presença</div>
                                            </div>
                                        </label>
                                        <label style="cursor:pointer; display:flex; align-items:center; gap:12px; padding:16px; border:2px solid var(--border); border-radius:10px; transition:0.2s; background:#fff;" class="doc-option-card">
                                            <input type="radio" name="tipo" value="historico" style="accent-color:var(--brand); transform:scale(1.2);">
                                            <i data-lucide="scroll-text" style="width:22px;height:22px;color:var(--yellow);"></i>
                                            <div>
                                                <div style="font-weight:600;font-size:14px;color:var(--text-2);">Histórico Parcial</div>
                                                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Notas e disciplinas</div>
                                            </div>
                                        </label>
                                    </div>
                                    
                                    <style>
                                        .doc-option-card:has(input:checked) {
                                            border-color: var(--brand) !important;
                                            background: var(--blue-lt) !important;
                                        }
                                    </style>

                                    <div style="padding-top:20px; border-top:1px dashed #cbd5e1;">
                                        <button type="submit" class="btn btn-primary" style="width:100%; padding:14px; font-size:15px; display:flex; justify-content:center; gap:8px; border-radius:10px; box-shadow:0 4px 10px rgba(79, 70, 229, 0.2);">
                                            <i data-lucide="printer" style="width:18px;height:18px;"></i> Gerar Documento
                                        </button>
                                        <div style="text-align:center; font-size:11.5px; color:var(--text-muted); margin-top:10px;">
                                            O documento será aberto em uma nova aba para impressão.
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <!-- ===== SEÇÃO: FALTAS ===== -->
            <div id="sec-faltas" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Justificar Faltas</h1>
                    <p class="page-desc">Consulte o histórico de ausências dos alunos e aplique justificativas (atestado médico, licença, etc).</p>
                </div>

                <div class="panel">
                    <div class="panel-head" style="background:#F8FAFC;">
                        <div class="panel-title" style="color:var(--brand);">
                            <i data-lucide="user-x" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i>
                            Alunos com Registro de Faltas
                        </div>
                    </div>
                    <div class="table-wrap" style="padding:20px;">
                        
                        <!-- Search Bar (Minimalist) -->
                        <div style="display:flex; align-items:center; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px; margin-bottom: 20px;">
                            <input type="text" id="falta_search" placeholder="Pesquisar por nome do aluno ou turma..." style="border:none; outline:none; font-size:15px; width:100%; color:var(--text); background:transparent;" autocomplete="off">
                            <i data-lucide="search" style="width:20px;height:20px;color:#94A3B8;"></i>
                        </div>

                        <table class="data-table" style="width:100%; min-width:600px; border-bottom:1px solid var(--border);">
                            <thead>
                                <tr>
                                    <th class="falta-sort" data-sort="nome" style="width:40%; cursor:pointer;">Aluno <i data-lucide="arrow-up-down" style="width:12px;height:12px;opacity:0.5;margin-left:4px;"></i></th>
                                    <th class="falta-sort" data-sort="curso" style="width:20%; cursor:pointer;">Turma <i data-lucide="arrow-up-down" style="width:12px;height:12px;opacity:0.5;margin-left:4px;"></i></th>
                                    <th class="falta-sort" data-sort="pendentes" style="width:15%; text-align:center; cursor:pointer;">Pendentes <i data-lucide="arrow-up-down" style="width:12px;height:12px;opacity:0.5;margin-left:4px;"></i></th>
                                    <th class="falta-sort" data-sort="justificadas" style="width:15%; text-align:center; cursor:pointer;">Justificadas <i data-lucide="arrow-up-down" style="width:12px;height:12px;opacity:0.5;margin-left:4px;"></i></th>
                                    <th style="width:10%; text-align:right;">Ação</th>
                                </tr>
                            </thead>
                            <tbody id="faltas_tbody">
                                <?php
                                $stmtFaltas = $pdo->query("
                                    SELECT f.id, f.data_registro, f.status, f.status_justificativa, f.arquivo_justificativa, f.aprendiz_id, a.nome AS aluno_nome, d.nome AS disc_nome, c.nome AS curso_nome
                                    FROM frequencia f
                                    JOIN aprendizes a ON f.aprendiz_id = a.id
                                    LEFT JOIN disciplinas d ON f.disciplina_id = d.id
                                    LEFT JOIN turmas t ON a.turma_id = t.id
                                    LEFT JOIN cursos c ON t.curso_id = c.id
                                    WHERE f.status IN ('falta', 'justificada')
                                    ORDER BY a.nome ASC, f.data_registro DESC
                                ");
                                $todasFaltas = $stmtFaltas->fetchAll(PDO::FETCH_ASSOC);
                                
                                $alunosComFaltas = [];
                                foreach($todasFaltas as $f) {
                                    $aid = $f['aprendiz_id'];
                                    if (!isset($alunosComFaltas[$aid])) {
                                        $alunosComFaltas[$aid] = [
                                            'id' => $aid,
                                            'nome' => $f['aluno_nome'],
                                            'curso' => $f['curso_nome'] ?? '—',
                                            'pendentes' => 0,
                                            'justificadas' => 0,
                                            'registros' => []
                                        ];
                                    }
                                    if ($f['status'] === 'falta') $alunosComFaltas[$aid]['pendentes']++;
                                    else if ($f['status'] === 'justificada') $alunosComFaltas[$aid]['justificadas']++;
                                    
                                    $alunosComFaltas[$aid]['registros'][] = $f;
                                }
                                $alunosFaltasLista = array_values($alunosComFaltas);

                                foreach ($alunosFaltasLista as $aluno):
                                    $inicial = strtoupper(mb_substr($aluno['nome'], 0, 1));
                                ?>
                                <!-- MASTER ROW -->
                                <tr class="falta-master-row" 
                                    id="master-row-<?= $aluno['id'] ?>"
                                    data-id="<?= $aluno['id'] ?>" 
                                    data-nome="<?= htmlspecialchars(strtolower($aluno['nome'])) ?>" 
                                    data-curso="<?= htmlspecialchars(strtolower($aluno['curso'])) ?>"
                                    data-pendentes="<?= $aluno['pendentes'] ?>"
                                    data-justificadas="<?= $aluno['justificadas'] ?>"
                                    style="transition:0.2s;">
                                    
                                    <td>
                                        <div style="display:flex; align-items:center; gap:10px;">
                                            <div style="width:32px;height:32px;border-radius:50%;background:var(--blue-lt);color:var(--brand);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;">
                                                <?= $inicial ?>
                                            </div>
                                            <span style="font-weight:500; color:var(--text-2);"><?= htmlspecialchars($aluno['nome']) ?></span>
                                        </div>
                                    </td>
                                    <td style="font-size:13px; color:var(--text-muted);"><?= htmlspecialchars($aluno['curso']) ?></td>
                                    <td style="text-align:center;">
                                        <span class="badge badge-red pendentes-badge" id="badge-pend-<?= $aluno['id'] ?>"><?= $aluno['pendentes'] ?></span>
                                    </td>
                                    <td style="text-align:center;">
                                        <span class="badge badge-green justificadas-badge" id="badge-just-<?= $aluno['id'] ?>"><?= $aluno['justificadas'] ?></span>
                                    </td>
                                    <td style="text-align:right;">
                                        <button class="btn btn-sm btn-ghost" onclick="toggleFaltas(<?= $aluno['id'] ?>)" style="padding:6px 12px; font-weight:600; font-size:13px; color:var(--brand);">
                                            Detalhes <i data-lucide="chevron-down" id="icon-expand-<?= $aluno['id'] ?>" style="width:16px;height:16px;transition:0.3s;"></i>
                                        </button>
                                    </td>
                                </tr>
                                
                                <!-- DETAIL ROW (ACCORDION) -->
                                <tr class="falta-detail-row" id="detail-row-<?= $aluno['id'] ?>" data-parent-id="<?= $aluno['id'] ?>" style="display:none; background:#f8fafc; border-bottom:2px solid var(--border);">
                                    <td colspan="5" style="padding: 20px;">
                                        <div style="background:#fff; border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; box-shadow:0 4px 6px rgba(0,0,0,0.02);">
                                            <h4 style="margin-bottom:15px; font-size:14px; font-weight:600; color:var(--text-2); display:flex; align-items:center; gap:8px;">
                                                <i data-lucide="calendar-days" style="width:16px;height:16px;color:var(--brand);"></i> 
                                                Histórico de Faltas - <?= htmlspecialchars($aluno['nome']) ?>
                                            </h4>
                                            
                                            <table style="width:100%; font-size:13px; text-align:left; border-collapse:collapse;">
                                                <thead>
                                                    <tr style="border-bottom:1px solid var(--border);">
                                                        <th style="padding:10px; color:var(--text-muted); font-weight:600;">Data</th>
                                                        <th style="padding:10px; color:var(--text-muted); font-weight:600;">Disciplina</th>
                                                        <th style="padding:10px; color:var(--text-muted); font-weight:600;">Status</th>
                                                        <th style="padding:10px; color:var(--text-muted); font-weight:600; text-align:right;">Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php foreach($aluno['registros'] as $reg): ?>
                                                    <tr id="reg-row-<?= $reg['id'] ?>" style="border-bottom:1px solid #f1f5f9;">
                                                        <td style="padding:12px 10px; font-weight:500; color:var(--text-2);"><?= date('d/m/Y', strtotime($reg['data_registro'])) ?></td>
                                                        <td style="padding:12px 10px; color:var(--text-muted);"><?= htmlspecialchars($reg['disc_nome'] ?? 'Geral') ?></td>
                                                        <td style="padding:12px 10px;" id="reg-status-<?= $reg['id'] ?>">
                                                            <?php if($reg['status'] === 'justificada'): ?>
                                                                <span class="badge badge-green" style="background:#dcfce7;color:#166534;font-size:11.5px; padding:4px 8px;">
                                                                    <i data-lucide="check" style="width:12px;height:12px;margin-right:2px;"></i> Justificada
                                                                </span>
                                                            <?php elseif(($reg['status_justificativa'] ?? 'nenhuma') === 'pendente'): ?>
                                                                <span class="badge" style="background:#fef3c7;color:#b45309;font-size:11.5px; padding:4px 8px;">
                                                                    <i data-lucide="paperclip" style="width:12px;height:12px;margin-right:2px;"></i> Anexo Enviado
                                                                </span>
                                                            <?php elseif(($reg['status_justificativa'] ?? 'nenhuma') === 'rejeitada'): ?>
                                                                <span class="badge badge-red" style="background:#fee2e2;color:#dc2626;font-size:11.5px; padding:4px 8px;">Rejeitada</span>
                                                            <?php else: ?>
                                                                <span class="badge badge-red" style="font-size:11.5px; padding:4px 8px;">Pendente</span>
                                                            <?php endif; ?>
                                                        </td>
                                                        <td style="padding:12px 10px; text-align:right;" id="reg-action-<?= $reg['id'] ?>">
                                                            <?php if($reg['status'] === 'falta' && ($reg['status_justificativa'] ?? 'nenhuma') === 'pendente'): ?>
                                                                <a href="../<?= htmlspecialchars($reg['arquivo_justificativa']) ?>" target="_blank" class="btn btn-sm btn-outline" style="color:#0ea5e9; border-color:#0ea5e9; padding:4px 10px; margin-right:4px;">
                                                                    <i data-lucide="eye" style="width:14px;height:14px;"></i> Ver
                                                                </a>
                                                                <button class="btn btn-sm btn-outline" onclick="efetuarJustificativa(<?= $reg['id'] ?>, <?= $aluno['id'] ?>)" style="color:var(--green); border-color:var(--green); padding:4px 10px; margin-right:4px;" title="Aprovar">
                                                                    <i data-lucide="check" style="width:14px;height:14px;"></i>
                                                                </button>
                                                                <button class="btn btn-sm btn-outline" onclick="rejeitarJustificativa(<?= $reg['id'] ?>, <?= $aluno['id'] ?>)" style="color:var(--red); border-color:var(--red); padding:4px 10px;" title="Rejeitar">
                                                                    <i data-lucide="x" style="width:14px;height:14px;"></i>
                                                                </button>
                                                            <?php elseif($reg['status'] === 'falta'): ?>
                                                                <button class="btn btn-sm btn-outline" onclick="efetuarJustificativa(<?= $reg['id'] ?>, <?= $aluno['id'] ?>)" style="color:var(--green); border-color:var(--green); padding:4px 10px;">
                                                                    <i data-lucide="check" style="width:14px;height:14px;"></i> Justificar Manualmente
                                                                </button>
                                                            <?php else: ?>
                                                                <span style="color:var(--text-muted); font-size:12px;">—</span>
                                                            <?php endif; ?>
                                                        </td>
                                                    </tr>
                                                    <?php endforeach; ?>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                                
                                <tr id="falta_empty" style="<?= empty($alunosFaltasLista) ? '' : 'display:none;' ?>">
                                    <td colspan="5">
                                        <div class="empty-state" style="padding:40px 0;">
                                            <i data-lucide="check-circle" style="width:48px;height:48px;color:var(--green);margin-bottom:10px;opacity:0.8;"></i>
                                            <p style="font-size:15px;color:var(--text-muted);font-weight:500;">Nenhum histórico de falta encontrado para os alunos.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Pagination Footer -->
                        <?php if (!empty($alunosFaltasLista)): ?>
                        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:15px; margin-top:15px; font-size:13px; color:var(--text-muted);">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="width:8px;height:8px;background:var(--yellow);border-radius:50%;box-shadow:0 0 0 3px rgba(234, 179, 8, 0.2);"></div> Total de Alunos: <span id="falta_total_info">0</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:24px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    Exibir: 
                                    <select id="falta_page_size" style="border:none; border-bottom:2px solid var(--border); background:transparent; font-size:13px; font-weight:600; color:var(--text-2); cursor:pointer; outline:none; padding-bottom:2px;">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div style="font-weight:500;"><span id="falta_page_info">1 - 5</span></div>
                                <div style="display:flex; gap:4px;">
                                    <button type="button" id="falta_btn_first" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Primeira Página"><i data-lucide="chevrons-left" style="width:16px;height:16px;"></i></button>
                                    <button type="button" id="falta_btn_prev" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Página Anterior"><i data-lucide="chevron-left" style="width:16px;height:16px;"></i></button>
                                    <button type="button" id="falta_btn_next" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Próxima Página"><i data-lucide="chevron-right" style="width:16px;height:16px;"></i></button>
                                    <button type="button" id="falta_btn_last" class="btn btn-sm btn-ghost" style="padding:6px;border-radius:6px;" title="Última Página"><i data-lucide="chevrons-right" style="width:16px;height:16px;"></i></button>
                                </div>
                            </div>
                        </div>

                        <script>
                        // ==========================================
                        // LOGIC FOR MASTER-DETAIL AND AJAX ACTIONS
                        // ==========================================
                        function toggleFaltas(alunoId) {
                            const detailRow = document.getElementById('detail-row-' + alunoId);
                            const icon = document.getElementById('icon-expand-' + alunoId);
                            const masterRow = document.getElementById('master-row-' + alunoId);
                            
                            if (detailRow.style.display === 'none') {
                                detailRow.style.display = 'table-row';
                                icon.style.transform = 'rotate(180deg)';
                                masterRow.style.background = '#f8fafc';
                            } else {
                                detailRow.style.display = 'none';
                                icon.style.transform = 'rotate(0deg)';
                                masterRow.style.background = 'transparent';
                            }
                        }

                        function efetuarJustificativa(regId, alunoId) {
                            if (!confirm("Tem certeza que deseja justificar esta falta?")) return;
                            
                            fetch('../api/alunos/justificar_falta.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ falta_id: regId })
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.success) {
                                    showToast("Falta justificada com sucesso!", "success");
                                    
                                    // 1. Atualizar o status visual na linha detalhada
                                    const statusTd = document.getElementById('reg-status-' + regId);
                                    statusTd.innerHTML = `<span class="badge badge-green" style="background:#dcfce7;color:#166534;font-size:11.5px; padding:4px 8px;"><i data-lucide="check" style="width:12px;height:12px;margin-right:2px;"></i> Justificada</span>`;
                                    lucide.createIcons({root: statusTd});
                                    
                                    // 2. Remover o botão de ação e colocar traço
                                    const actionTd = document.getElementById('reg-action-' + regId);
                                    actionTd.innerHTML = `<span style="color:var(--text-muted); font-size:12px;">—</span>`;
                                    
                                    // 3. Atualizar contadores no master row (Data Attributes)
                                    const masterRow = document.getElementById('master-row-' + alunoId);
                                    let pendentes = parseInt(masterRow.getAttribute('data-pendentes'));
                                    let justificadas = parseInt(masterRow.getAttribute('data-justificadas'));
                                    
                                    pendentes = Math.max(0, pendentes - 1);
                                    justificadas += 1;
                                    
                                    masterRow.setAttribute('data-pendentes', pendentes);
                                    masterRow.setAttribute('data-justificadas', justificadas);
                                    
                                    // 4. Atualizar os Badges visuais no master row
                                    document.getElementById('badge-pend-' + alunoId).textContent = pendentes;
                                    document.getElementById('badge-just-' + alunoId).textContent = justificadas;
                                    
                                } else {
                                    showToast(data.message || "Erro ao justificar falta.", "error");
                                }
                            })
                            .catch(err => {
                                showToast("Erro de conexão.", "error");
                                console.error(err);
                            });
                        }

                        // ==========================================
                        // LOGIC FOR PAGINATION, SEARCH, AND SORTING
                        // ==========================================
                        document.addEventListener('DOMContentLoaded', function() {
                            const searchInput = document.getElementById('falta_search');
                            let masterRows = Array.from(document.querySelectorAll('.falta-master-row'));
                            const tbody = document.getElementById('faltas_tbody');
                            const emptyMsg = document.getElementById('falta_empty');
                            const btnFirst = document.getElementById('falta_btn_first');
                            const btnPrev = document.getElementById('falta_btn_prev');
                            const btnNext = document.getElementById('falta_btn_next');
                            const btnLast = document.getElementById('falta_btn_last');
                            const pageInfo = document.getElementById('falta_page_info');
                            const totalInfo = document.getElementById('falta_total_info');
                            const pageSizeSelect = document.getElementById('falta_page_size');
                            const sortHeaders = document.querySelectorAll('.falta-sort');

                            let filteredRows = [...masterRows];
                            let currentPage = 1;
                            let pageSize = parseInt(pageSizeSelect.value);
                            
                            let sortCol = 'nome';
                            let sortAsc = true;

                            function applySort() {
                                filteredRows.sort((a, b) => {
                                    let valA = a.getAttribute('data-' + sortCol);
                                    let valB = b.getAttribute('data-' + sortCol);
                                    
                                    // Parse integer if column is numeric
                                    if(sortCol === 'pendentes' || sortCol === 'justificadas') {
                                        valA = parseInt(valA);
                                        valB = parseInt(valB);
                                    } else {
                                        valA = valA.toString();
                                        valB = valB.toString();
                                    }

                                    if (valA < valB) return sortAsc ? -1 : 1;
                                    if (valA > valB) return sortAsc ? 1 : -1;
                                    return 0;
                                });
                                
                                // Re-append rows to DOM in sorted order
                                filteredRows.forEach(row => {
                                    tbody.appendChild(row); // Master row
                                    const detailRow = document.getElementById('detail-row-' + row.getAttribute('data-id'));
                                    if(detailRow) tbody.appendChild(detailRow); // Detail row right after
                                });
                            }

                            function renderTable() {
                                applySort();
                                
                                // Hide ALL master and detail rows
                                masterRows.forEach(r => {
                                    r.style.display = 'none';
                                    const detailRow = document.getElementById('detail-row-' + r.getAttribute('data-id'));
                                    if(detailRow) detailRow.style.display = 'none';
                                    
                                    // Reset chevron and background on hide
                                    const icon = document.getElementById('icon-expand-' + r.getAttribute('data-id'));
                                    if(icon) icon.style.transform = 'rotate(0deg)';
                                    r.style.background = 'transparent';
                                });
                                
                                const total = filteredRows.length;
                                totalInfo.textContent = total;
                                
                                if (total === 0) {
                                    emptyMsg.style.display = 'table-row';
                                    pageInfo.textContent = '0 - 0';
                                    btnFirst.disabled = true;
                                    btnPrev.disabled = true;
                                    btnNext.disabled = true;
                                    btnLast.disabled = true;
                                    updateBtnStyles();
                                    return;
                                }
                                
                                emptyMsg.style.display = 'none';
                                const maxPage = Math.ceil(total / pageSize);
                                if (currentPage > maxPage) currentPage = maxPage;
                                if (currentPage < 1) currentPage = 1;

                                const startIdx = (currentPage - 1) * pageSize;
                                const endIdx = Math.min(startIdx + pageSize, total);
                                
                                pageInfo.textContent = `${startIdx + 1} - ${endIdx}`;
                                
                                for (let i = startIdx; i < endIdx; i++) {
                                    filteredRows[i].style.display = 'table-row';
                                    // Note: We don't display the detail row automatically, user has to click to expand
                                }
                                
                                btnFirst.disabled = currentPage === 1;
                                btnPrev.disabled = currentPage === 1;
                                btnNext.disabled = currentPage === maxPage;
                                btnLast.disabled = currentPage === maxPage;
                                updateBtnStyles();
                            }

                            function updateBtnStyles() {
                                btnFirst.style.opacity = btnFirst.disabled ? '0.3' : '1';
                                btnPrev.style.opacity = btnPrev.disabled ? '0.3' : '1';
                                btnNext.style.opacity = btnNext.disabled ? '0.3' : '1';
                                btnLast.style.opacity = btnLast.disabled ? '0.3' : '1';
                            }

                            // Sorting Events
                            sortHeaders.forEach(th => {
                                th.addEventListener('click', function() {
                                    const col = this.getAttribute('data-sort');
                                    if(sortCol === col) {
                                        sortAsc = !sortAsc; // toggle direction
                                    } else {
                                        sortCol = col;
                                        sortAsc = true;
                                    }
                                    
                                    // Update visual icons
                                    sortHeaders.forEach(h => {
                                        const i = h.querySelector('i');
                                        if(h === this) {
                                            i.style.opacity = '1';
                                            i.setAttribute('data-lucide', sortAsc ? 'arrow-up' : 'arrow-down');
                                        } else {
                                            i.style.opacity = '0.5';
                                            i.setAttribute('data-lucide', 'arrow-up-down');
                                        }
                                    });
                                    lucide.createIcons();
                                    
                                    currentPage = 1;
                                    renderTable();
                                });
                            });

                            pageSizeSelect.addEventListener('change', function() {
                                pageSize = parseInt(this.value);
                                currentPage = 1; 
                                renderTable();
                            });

                            searchInput.addEventListener('input', function() {
                                const val = this.value.toLowerCase();
                                filteredRows = masterRows.filter(r => {
                                    return r.getAttribute('data-nome').includes(val) || r.getAttribute('data-curso').includes(val);
                                });
                                currentPage = 1;
                                renderTable();
                            });

                            btnFirst.addEventListener('click', () => { if(currentPage > 1) { currentPage = 1; renderTable(); } });
                            btnPrev.addEventListener('click', () => { if(currentPage > 1) { currentPage--; renderTable(); } });
                            btnNext.addEventListener('click', () => { if(currentPage * pageSize < filteredRows.length) { currentPage++; renderTable(); } });
                            btnLast.addEventListener('click', () => { 
                                const maxPage = Math.ceil(filteredRows.length / pageSize);
                                if(currentPage < maxPage) { currentPage = maxPage; renderTable(); } 
                            });

                            renderTable();
                        });
                        </script>
                        <?php endif; ?>
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

            <!-- ===== SEÇÃO: PROFESSORES ===== -->
            <div id="sec-professores" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Corpo Docente</h1>
                    <p class="page-desc">Gerencie o cadastro dos professores da instituição.</p>
                    <div style="margin-top: 15px;">
                        <button class="btn btn-primary" onclick="openModal('modalProfessor')"><i data-lucide="plus"></i> Novo Professor</button>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>E-mail (Login)</th>
                                    <th>Data de Cadastro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($listaProfessores as $p): ?>
                                <tr>
                                    <td style="font-weight:500;">
                                        <div class="aluno-cell">
                                            <div class="aluno-avatar" style="width:28px;height:28px;font-size:11px;"><?= strtoupper(mb_substr($p['nome'], 0, 1)) ?></div>
                                            <span><?= htmlspecialchars($p['nome']) ?></span>
                                        </div>
                                    </td>
                                    <td><?= htmlspecialchars($p['email']) ?></td>
                                    <td class="td-mono"><?= date('d/m/Y', strtotime($p['criado_em'])) ?></td>
                                </tr>
                                <?php endforeach; ?>
                                <?php if(empty($listaProfessores)): ?>
                                <tr><td colspan="3" style="text-align:center; padding: 20px;">Nenhum professor cadastrado.</td></tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ===== SEÇÃO: EMPRESAS ===== -->
            <div id="sec-empresas" class="sec">
                <div class="page-header">
                    <h1 class="page-title">Empresas Parceiras</h1>
                    <p class="page-desc">Gerencie as empresas conveniadas ao programa de aprendizagem.</p>
                    <div style="margin-top: 15px;">
                        <button class="btn btn-primary" onclick="openModal('modalEmpresa')"><i data-lucide="plus"></i> Nova Empresa</button>
                    </div>
                </div>

                <div class="panel">
                    <div class="table-wrap">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Razão Social</th>
                                    <th>CNPJ</th>
                                    <th>Responsável</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($listaEmpresas as $e): ?>
                                <tr>
                                    <td style="font-weight:500;"><?= htmlspecialchars($e['nome']) ?></td>
                                    <td class="td-mono"><?= htmlspecialchars($e['cnpj']) ?></td>
                                    <td><?= htmlspecialchars($e['responsavel']) ?><br><small style="color:var(--text-muted);"><?= htmlspecialchars($e['email']) ?></small></td>
                                    <td>
                                        <span class="badge <?= $e['status'] === 'ativa' ? 'badge-green' : 'badge-red' ?>">
                                            <?= ucfirst($e['status']) ?>
                                        </span>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                                <?php if(empty($listaEmpresas)): ?>
                                <tr><td colspan="4" style="text-align:center; padding: 20px;">Nenhuma empresa cadastrada.</td></tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </main>
    </div>
</div>

<!-- ===== MODAL: ADD PROFESSOR ===== -->
<div id="modalProfessor" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <div class="modal-title">Cadastrar Professor</div>
            <button class="modal-close" onclick="closeModal('modalProfessor')"><i data-lucide="x"></i></button>
        </div>
        <form method="POST">
            <div class="modal-body">
                <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                <input type="hidden" name="acao" value="add_professor">
                
                <div class="form-group">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" name="nome" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email (Login)</label>
                    <input type="email" name="email" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Senha</label>
                    <input type="password" name="senha" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal('modalProfessor')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
        </form>
    </div>
</div>

<!-- ===== MODAL: ADD EMPRESA ===== -->
<div id="modalEmpresa" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <div class="modal-title">Cadastrar Empresa</div>
            <button class="modal-close" onclick="closeModal('modalEmpresa')"><i data-lucide="x"></i></button>
        </div>
        <form method="POST">
            <div class="modal-body">
                <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                <input type="hidden" name="acao" value="add_empresa">
                
                <div class="form-group">
                    <label class="form-label">Razão Social</label>
                    <input type="text" name="nome" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">CNPJ</label>
                    <input type="text" name="cnpj" class="form-control" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Responsável</label>
                    <input type="text" name="responsavel" class="form-control">
                </div>

                <div class="form-group">
                    <label class="form-label">Email de Contato</label>
                    <input type="email" name="email" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal('modalEmpresa')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
        </form>
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
