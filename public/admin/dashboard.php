<?php
// dashboard.php — Painel Admin CMS | Sophie Link (Vercel/Stripe Style)
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'admin') {
    header("Location: ../login_aluno.php");
    exit;
}
require_once '../../includes/db.php';

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
}

// Buscar usuários do banco
$stmtUsers = $pdo->query("SELECT id, nome, email, nivel, criado_em FROM usuarios WHERE deleted_at IS NULL ORDER BY id DESC");
$usuarios = $stmtUsers->fetchAll(PDO::FETCH_ASSOC);
$totalUsuarios = count($usuarios);

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
        <div class="tab" onclick="showSec('settings', this)">Settings</div>
        <a href="../logout.php" class="tab" style="margin-left:auto; color:var(--danger-color);">Logout</a>
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

<script>
    window.chartLabelsData = <?= $chartLabelsJson ?>;
    window.chartValuesData = <?= $chartValuesJson ?>;
</script>
<script src="../assets/js/dashboard.js"></script>
</body>
</html>
