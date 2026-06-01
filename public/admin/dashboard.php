<?php
// dashboard.php — Painel Admin CMS | Sophie Link (Vercel/Stripe Style)
session_start();
require_once '../../includes/auth.php';
protect_page(['admin']);
require_once '../../includes/db.php';
/** @var PDO $pdo */
require_once '../../backend/Models/Empresa.php';
require_once '../../backend/Models/Aprendiz.php';
require_once '../../backend/Models/Turma.php';

$empresaModel = new \Models\Empresa();
$aprendizModel = new \Models\Aprendiz();
$turmaModel = new \Models\Turma();

$nome = $_SESSION['usuario_nome'] ?? 'Administrador';
$primeiroNome = explode(' ', $nome)[0];

// Se for um pedido de exportação
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=usuarios_sophielink.csv');
    $output = fopen('php://output', 'w');
    // Adiciona o BOM para o Excel ler acentos corretamente
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    fputcsv($output, ['ID', 'Nome', 'Email', 'Nivel', 'Criado Em'], ';');
    
    $stmtUsers = $pdo->query("SELECT id, nome, email, nivel, criado_em FROM usuarios WHERE deleted_at IS NULL ORDER BY id DESC");
    while ($row = $stmtUsers->fetch(PDO::FETCH_ASSOC)) {
        fputcsv($output, $row, ';');
    }
    fclose($output);
    exit;
}

$sucesso = '';
$erro = '';

// Lógica CRUD: Usuários
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao'])) {
    
    // Adicionar Usuário
    if ($_POST['acao'] === 'add_user') {
        $novo_nome = trim($_POST['nome']);
        $novo_email = trim($_POST['email']);
        $nova_senha = $_POST['senha'];
        $novo_nivel = $_POST['nivel'];

        if (empty($novo_nome) || empty($novo_email) || empty($nova_senha) || empty($novo_nivel)) {
            $erro = "Todos os campos são obrigatórios.";
        } else {
            try {
                $hash = password_hash($nova_senha, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)");
                $stmt->execute([$novo_nome, $novo_email, $hash, $novo_nivel]);
                $sucesso = "Usuário '$novo_nome' criado com sucesso!";
            } catch (PDOException $e) {
                if ($e->getCode() == 23000) {
                    $erro = "Já existe um usuário cadastrado com este e-mail.";
                } else {
                    $erro = "Erro ao cadastrar usuário: " . $e->getMessage();
                }
            }
        }
    }

    // Deletar Usuário
    if ($_POST['acao'] === 'del_user') {
        $del_id = $_POST['usuario_id'];
        if ($del_id == $_SESSION['usuario_id']) {
            $erro = "Você não pode excluir a si mesmo.";
        } else {
            try {
                $stmt = $pdo->prepare("UPDATE usuarios SET deleted_at = NOW() WHERE id = ?");
                $stmt->execute([$del_id]);
                $sucesso = "Usuário excluído com sucesso!";
            } catch (Exception $e) {
                $erro = "Erro ao excluir: " . $e->getMessage();
            }
        }
    }

    // Lógica CRUD: Empresas
    if ($_POST['acao'] === 'add_empresa') {
        $empresaModel->criar($_POST);
        $sucesso = "Empresa adicionada com sucesso!";
    }
    if ($_POST['acao'] === 'del_empresa') {
        $empresaModel->excluir((int)$_POST['id']);
        $sucesso = "Empresa excluída com sucesso!";
    }

    // Lógica CRUD: Alunos (Aprendizes)
    if ($_POST['acao'] === 'add_aluno') {
        $aprendizModel->criar($_POST);
        $sucesso = "Aluno adicionado com sucesso!";
    }
    if ($_POST['acao'] === 'del_aluno') {
        $aprendizModel->excluir((int)$_POST['id']);
        $sucesso = "Aluno excluído com sucesso!";
    }

    // Lógica Financeira
    if ($_POST['acao'] === 'dar_baixa') {
        $fatura_id = (int)$_POST['id'];
        $stmtBaixa = $pdo->prepare("UPDATE financeiro SET status = 'pago', data_pagamento = CURRENT_DATE() WHERE id = ?");
        $stmtBaixa->execute([$fatura_id]);
        $sucesso = "Baixa financeira realizada com sucesso!";
    }
}

// Buscar usuários do banco
$stmtUsers = $pdo->query("SELECT id, nome, email, nivel, criado_em FROM usuarios WHERE deleted_at IS NULL ORDER BY id DESC");
$usuarios = $stmtUsers->fetchAll(PDO::FETCH_ASSOC);
$totalUsuarios = count($usuarios);

$listaEmpresas = $empresaModel->listar();
$listaAlunos = $aprendizModel->listar();
$listaTurmas = $turmaModel->listar();

// Preparar dados para o Chart.js
$stmtChart = $pdo->query("SELECT nivel, COUNT(*) as qtd FROM usuarios WHERE deleted_at IS NULL GROUP BY nivel");
$chartDataRaw = $stmtChart->fetchAll(PDO::FETCH_ASSOC);
$chartLabels = [];
$chartValues = [];
foreach($chartDataRaw as $row) {
    $chartLabels[] = ucfirst($row['nivel']);
    $chartValues[] = (int)$row['qtd'];
}
$chartLabelsJson = json_encode($chartLabels);
$chartValuesJson = json_encode($chartValues);

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Console Admin — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="../assets/css/dashboard.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>

<header class="header">
    <div class="h-top">
        <div class="h-logo-area">
            <div class="h-logo">SL</div>
            <div class="h-slash">/</div>
            <div class="h-team">Sophie Link <span class="h-team-badge">Admin</span></div>
        </div>
        <div class="h-user-area">
            <a href="../index.php" class="btn btn-secondary" style="height:32px; font-size:13px;">View Site</a>
            <div class="h-avatar"><i data-lucide="user" style="width:16px;height:16px;color:var(--text-muted);"></i></div>
        </div>
    </div>
    <div class="h-tabs">
        <div class="tab active" onclick="showSec('overview', this)">Overview</div>
        <div class="tab" onclick="showSec('users', this)">User Management</div>
        <div class="tab" onclick="showSec('empresas', this)">Empresas</div>
        <div class="tab" onclick="showSec('alunos', this)">Alunos</div>
        <div class="tab" onclick="showSec('financeiro', this)">Financeiro</div>
        <div class="tab" onclick="showSec('settings', this)">Settings</div>
        <a href="../auth/logout.php" class="tab" style="margin-left:auto; color:var(--danger-color);">Logout</a>
    </div>
</header>

<main class="container">

    <?php if ($sucesso): ?>
        <div class="alert alert-success"><i data-lucide="check-circle" style="width:18px;"></i> <?= htmlspecialchars($sucesso) ?></div>
    <?php endif; ?>
    <?php if ($erro): ?>
        <div class="alert alert-error"><i data-lucide="alert-circle" style="width:18px;"></i> <?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <!-- SEC: OVERVIEW -->
    <div id="sec-overview" class="sec active">
        <div class="page-header">
            <div>
                <h1 class="ph-title">Overview</h1>
                <p class="ph-desc">System health and global statistics.</p>
            </div>
            <a href="backup_db.php" class="btn btn-secondary"><i data-lucide="database"></i> Backup Database</a>
        </div>

        <div class="grid-3">
            <div class="stat-box">
                <div class="sb-title">Total Accounts</div>
                <div class="sb-val"><?= $totalUsuarios ?></div>
            </div>
            <div class="stat-box">
                <div class="sb-title">New This Month</div>
                <div class="sb-val" style="color:var(--text-main);">+12</div>
            </div>
            <div class="stat-box">
                <div class="sb-title">System Status</div>
                <div class="sb-val" style="color:var(--success-color);">Healthy</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="chart-wrap">
                <div class="panel-head" style="margin-bottom:16px; border:none; padding:0;">
                    <div class="panel-title">Accounts by Role</div>
                </div>
                <canvas id="roleChart" width="400" height="400"></canvas>
            </div>

            <div class="panel" style="margin:0;">
                <div class="panel-head">
                    <div class="panel-title">Recent Activity Logs</div>
                    <div class="panel-sub">Auditing system actions.</div>
                </div>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead><tr><th>Event ID</th><th>User</th><th>Action</th><th>Timestamp</th></tr></thead>
                        <tbody>
                            <tr><td colspan="4" style="text-align:center;"><a href="logs.php" style="color:var(--text-main);">View Full Audit Logs &rarr;</a></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- SEC: USERS -->
    <div id="sec-users" class="sec">
        <div class="page-header">
            <div>
                <h1 class="ph-title">User Management</h1>
                <p class="ph-desc">Manage system access and roles.</p>
            </div>
            <div style="display:flex; gap:10px;">
                <a href="?export=csv" class="btn btn-secondary"><i data-lucide="download"></i> Exportar CSV</a>
                <button class="btn btn-primary" onclick="openModal('modalUser')"><i data-lucide="plus"></i> Add User</button>
            </div>
        </div>

        <div class="panel">
            <div class="table-wrap">
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Created At</th><th>Actions</th></tr></thead>
                    <tbody>
                        <?php foreach($usuarios as $u): ?>
                        <tr>
                            <td style="font-weight:500;"><?= htmlspecialchars($u['nome']) ?></td>
                            <td class="td-mono"><?= htmlspecialchars($u['email']) ?></td>
                            <td><span class="h-team-badge"><?= htmlspecialchars($u['nivel']) ?></span></td>
                            <td class="td-mono"><?= date('d/m/Y', strtotime($u['criado_em'])) ?></td>
                            <td>
                                <?php if($u['id'] !== $_SESSION['usuario_id']): ?>
                                <form method="POST" style="display:inline;" onsubmit="return confirm('Tem certeza que deseja excluir este usuário?');">
                                    <input type="hidden" name="acao" value="del_user">
                                    <input type="hidden" name="usuario_id" value="<?= $u['id'] ?>">
                                    <button type="submit" class="btn-danger-icon" title="Delete User"><i data-lucide="trash-2" style="width:16px;"></i></button>
                                </form>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- SEC: EMPRESAS -->
    <div id="sec-empresas" class="sec">
        <div class="page-header">
            <div>
                <h1 class="ph-title">Empresas Parceiras</h1>
                <p class="ph-desc">Gerencie as empresas e seus contratos.</p>
            </div>
            <button class="btn btn-primary" onclick="openModal('modalEmpresa')"><i data-lucide="plus"></i> Nova Empresa</button>
        </div>

        <div class="panel">
            <div class="table-wrap">
                <table class="data-table">
                    <thead><tr><th>Nome</th><th>CNPJ</th><th>Contato</th><th>Aprendizes (Ativos)</th><th>Status</th><th>Ações</th></tr></thead>
                    <tbody>
                        <?php foreach($listaEmpresas as $e): ?>
                        <tr>
                            <td style="font-weight:500;"><?= htmlspecialchars($e['nome']) ?></td>
                            <td class="td-mono"><?= htmlspecialchars($e['cnpj']) ?></td>
                            <td><?= htmlspecialchars($e['responsavel']) ?><br><small><?= htmlspecialchars($e['email']) ?></small></td>
                            <td style="text-align:center;"><span class="h-team-badge"><?= $e['total_aprendizes'] ?></span></td>
                            <td>
                                <span style="color: <?= $e['status'] === 'ativa' ? 'var(--success-color)' : 'var(--danger-color)' ?>; font-weight:600;">
                                    <?= ucfirst($e['status']) ?>
                                </span>
                            </td>
                            <td>
                                <form method="POST" style="display:inline;" onsubmit="return confirm('Excluir empresa?');">
                                    <input type="hidden" name="acao" value="del_empresa">
                                    <input type="hidden" name="id" value="<?= $e['id'] ?>">
                                    <button type="submit" class="btn-danger-icon" title="Excluir"><i data-lucide="trash-2" style="width:16px;"></i></button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- SEC: ALUNOS -->
    <div id="sec-alunos" class="sec">
        <div class="page-header">
            <div>
                <h1 class="ph-title">Gestão de Alunos</h1>
                <p class="ph-desc">Gerencie o cadastro de alunos e aprendizes.</p>
            </div>
            <button class="btn btn-primary" onclick="openModal('modalAluno')"><i data-lucide="plus"></i> Novo Aluno</button>
        </div>

        <div class="panel">
            <div class="table-wrap">
                <table class="data-table">
                    <thead><tr><th>Nome</th><th>CPF</th><th>Turma</th><th>Empresa</th><th>Situação</th><th>Ações</th></tr></thead>
                    <tbody>
                        <?php foreach($listaAlunos as $a): ?>
                        <tr>
                            <td style="font-weight:500;"><?= htmlspecialchars($a['nome']) ?></td>
                            <td class="td-mono"><?= htmlspecialchars($a['cpf']) ?></td>
                            <td><span class="h-team-badge"><?= htmlspecialchars($a['turma_nome'] ?? 'Sem Turma') ?></span></td>
                            <td><?= htmlspecialchars($a['empresa_nome'] ?? '-') ?></td>
                            <td>
                                <span style="color: <?= $a['situacao_aluno'] === 'cursando' ? 'var(--text-main)' : 'var(--text-muted)' ?>;">
                                    <?= ucfirst($a['situacao_aluno']) ?>
                                </span>
                            </td>
                            <td>
                                <form method="POST" style="display:inline;" onsubmit="return confirm('Excluir aluno?');">
                                    <input type="hidden" name="acao" value="del_aluno">
                                    <input type="hidden" name="id" value="<?= $a['id'] ?>">
                                    <button type="submit" class="btn-danger-icon" title="Excluir"><i data-lucide="trash-2" style="width:16px;"></i></button>
                                </form>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- SEC: FINANCEIRO -->
    <div id="sec-financeiro" class="sec">
        <div class="page-header">
            <div>
                <h1 class="ph-title">Gestão Financeira</h1>
                <p class="ph-desc">Controle de recebimentos de mensalidades das Empresas.</p>
            </div>
            <a href="?export=csv" class="btn btn-secondary"><i data-lucide="download"></i> Relatório Financeiro</a>
        </div>
        
        <?php
        $stmtFin = $pdo->query("
            SELECT f.*, e.nome AS empresa_nome 
            FROM financeiro f 
            JOIN empresas e ON f.empresa_id = e.id 
            ORDER BY f.data_vencimento DESC
        ");
        $faturas = $stmtFin->fetchAll(PDO::FETCH_ASSOC);
        
        $totalRecebido = 0;
        $totalPendente = 0;
        foreach($faturas as $fat) {
            if ($fat['status'] === 'pago') $totalRecebido += $fat['valor'];
            else $totalPendente += $fat['valor'];
        }
        ?>

        <div class="grid-3">
            <div class="stat-box">
                <div class="sb-title">Total Recebido (Mês)</div>
                <div class="sb-val" style="color:var(--success-color);">R$ <?= number_format($totalRecebido, 2, ',', '.') ?></div>
            </div>
            <div class="stat-box">
                <div class="sb-title">A Receber / Inadimplência</div>
                <div class="sb-val" style="color:var(--danger-color);">R$ <?= number_format($totalPendente, 2, ',', '.') ?></div>
            </div>
        </div>

        <div class="panel">
            <div class="table-wrap">
                <table class="data-table">
                    <thead><tr><th>Empresa</th><th>Competência</th><th>Vencimento</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
                    <tbody>
                        <?php foreach($faturas as $fat): ?>
                        <tr>
                            <td style="font-weight:500;"><?= htmlspecialchars($fat['empresa_nome']) ?></td>
                            <td class="td-mono"><?= htmlspecialchars($fat['competencia']) ?></td>
                            <td class="td-mono"><?= date('d/m/Y', strtotime($fat['data_vencimento'])) ?></td>
                            <td style="font-weight:600;">R$ <?= number_format($fat['valor'], 2, ',', '.') ?></td>
                            <td>
                                <?php if($fat['status'] === 'pago'): ?>
                                    <span class="h-team-badge" style="background:#D1FAE5; color:#059669;">Pago em <?= date('d/m', strtotime($fat['data_pagamento'])) ?></span>
                                <?php else: ?>
                                    <span class="h-team-badge" style="background:#FEF3C7; color:#D97706;">Pendente</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php if($fat['status'] !== 'pago'): ?>
                                <form method="POST" style="margin:0;" onsubmit="return confirm('Confirmar pagamento desta fatura?');">
                                    <input type="hidden" name="acao" value="dar_baixa">
                                    <input type="hidden" name="id" value="<?= $fat['id'] ?>">
                                    <button type="submit" class="btn btn-primary" style="padding:4px 10px; font-size:12px; height:auto;">Dar Baixa</button>
                                </form>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                        <?php if(empty($faturas)): ?>
                        <tr><td colspan="6" style="text-align:center; padding: 20px;">Nenhuma fatura gerada. O sistema gera faturas no 1º dia útil de cada mês.</td></tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- SEC: SETTINGS -->
    <div id="sec-settings" class="sec">
        <div class="page-header">
            <div>
                <h1 class="ph-title">Settings</h1>
                <p class="ph-desc">Global application configuration.</p>
            </div>
        </div>

        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">Maintenance Mode</div>
                <div class="panel-sub">Restrict access to the application for all non-admin users.</div>
            </div>
            <div class="panel-body" style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:14px;">The application is currently <strong>live</strong>.</div>
                <button class="btn btn-danger">Enable Maintenance</button>
            </div>
        </div>
    </div>

</main>

<!-- MODAL ADD USER -->
<div id="modalUser" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <div class="modal-title">Create New User</div>
            <button class="modal-close" onclick="closeModal('modalUser')"><i data-lucide="x"></i></button>
        </div>
        <form method="POST">
            <div class="modal-body">
                <input type="hidden" name="acao" value="add_user">
                
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" name="nome" class="form-control" required placeholder="e.g. Maria Oliveira">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" name="email" class="form-control" required placeholder="name@sophielink.com.br">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="senha" class="form-control" required placeholder="Min 6 characters">
                </div>
                
                <div class="form-group">
                    <label class="form-label">System Role</label>
                    <select name="nivel" class="form-control" required>
                        <option value="admin">Administrator (Root Access)</option>
                        <option value="coordenadora">Coordinator (Academic Panel)</option>
                        <option value="professor">Professor (Teacher Portal)</option>
                        <option value="empresa">Empresa (B2B Client)</option>
                        <option value="colaborador" selected>Colaborador (Operational)</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal('modalUser')">Cancel</button>
                <button type="submit" class="btn btn-primary">Create Account</button>
            </div>
        </form>
    </div>
</div>

<!-- MODAL ADD EMPRESA -->
<div id="modalEmpresa" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <div class="modal-title">Cadastrar Empresa</div>
            <button class="modal-close" onclick="closeModal('modalEmpresa')"><i data-lucide="x"></i></button>
        </div>
        <form method="POST">
            <div class="modal-body">
                <input type="hidden" name="acao" value="add_empresa">
                
                <div class="form-group">
                    <label class="form-label">Razão Social / Nome</label>
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
                    <label class="form-label">Email Comercial</label>
                    <input type="email" name="email" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal('modalEmpresa')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar Empresa</button>
            </div>
        </form>
    </div>
</div>

<!-- MODAL ADD ALUNO -->
<div id="modalAluno" class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <div class="modal-title">Cadastrar Aluno</div>
            <button class="modal-close" onclick="closeModal('modalAluno')"><i data-lucide="x"></i></button>
        </div>
        <form method="POST">
            <div class="modal-body">
                <input type="hidden" name="acao" value="add_aluno">
                
                <div class="form-group">
                    <label class="form-label">Nome Completo</label>
                    <input type="text" name="nome" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">CPF</label>
                    <input type="text" name="cpf" class="form-control" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Email do Aluno</label>
                    <input type="email" name="email" class="form-control" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Turma (Matrícula)</label>
                    <select name="turma_id" class="form-control">
                        <option value="">-- Nenhuma Turma --</option>
                        <?php foreach($listaTurmas as $t): ?>
                            <option value="<?= $t['id'] ?>"><?= htmlspecialchars($t['nome']) ?> (<?= htmlspecialchars($t['curso_nome']) ?>)</option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal('modalAluno')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar Aluno</button>
            </div>
        </form>
    </div>
</div>

<script>
    window.chartLabelsData = <?= $chartLabelsJson ?>;
    window.chartValuesData = <?= $chartValuesJson ?>;
</script>
<script src="../assets/js/dashboard.js"></script>
</body>
</html>
