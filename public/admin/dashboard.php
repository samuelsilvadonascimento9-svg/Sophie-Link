<?php
// dashboard.php — Painel Admin CMS | Sophie Link (Vercel/Stripe Style)
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'admin') {
    header("Location: ../login.php");
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
<style>
/* ================================================================
   RESET & TOKENS (Minimalist Vercel/Stripe Style)
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --bg-color: #FAFAFA;
    --surface-color: #FFFFFF;
    --border-color: #EAEAEA;
    --border-hover: #999999;
    --text-main: #000000;
    --text-muted: #666666;
    --text-light: #888888;
    --accent-color: #000000;
    --accent-fg: #FFFFFF;
    --danger-color: #E00;
    --danger-bg: #FFEEEE;
    --success-color: #0070F3;
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', Menlo, Monaco, Consolas, "Courier New", monospace;
    --radius: 6px;
    --radius-sm: 4px;
}
html { font-size: 14px; }
body { font-family: var(--font-sans); background: var(--bg-color); color: var(--text-main); -webkit-font-smoothing: antialiased; line-height: 1.5; }
a { text-decoration: none; color: inherit; }

/* HEADER */
.header { background: var(--surface-color); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; }
.h-top { display: flex; align-items: center; justify-content: space-between; height: 60px; padding: 0 24px; }
.h-logo-area { display: flex; align-items: center; gap: 16px; }
.h-logo { width: 28px; height: 28px; background: var(--text-main); color: #fff; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
.h-slash { color: var(--border-color); font-size: 24px; font-weight: 300; margin-top: -2px; }
.h-team { font-weight: 500; font-size: 14px; display: flex; align-items: center; gap: 6px; }
.h-team-badge { font-size: 10px; background: var(--border-color); padding: 2px 6px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.h-user-area { display: flex; align-items: center; gap: 16px; }
.h-avatar { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; background: linear-gradient(180deg, #fff, #f5f5f5); cursor: pointer; }

/* TABS */
.h-tabs { display: flex; gap: 24px; padding: 0 24px; height: 48px; }
.tab { display: flex; align-items: center; height: 100%; font-size: 14px; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.15s; }
.tab:hover { color: var(--text-main); }
.tab.active { color: var(--text-main); font-weight: 500; border-bottom-color: var(--text-main); }

/* CONTAINER & CONTENT */
.container { max-width: 1048px; margin: 0 auto; padding: 48px 24px; }
.page-header { margin-bottom: 32px; display: flex; align-items: flex-end; justify-content: space-between; }
.ph-title { font-size: 32px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; margin-bottom: 8px; }
.ph-desc { font-size: 16px; color: var(--text-muted); }

/* PANELS */
.panel { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 24px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
.panel-head { padding: 20px 24px; border-bottom: 1px solid var(--border-color); }
.panel-title { font-weight: 600; font-size: 16px; margin-bottom: 4px; }
.panel-sub { font-size: 14px; color: var(--text-muted); }
.panel-body { padding: 24px; }

/* TABLES */
.table-wrap { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.data-table th { text-align: left; padding: 12px 24px; border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-weight: 500; background: #FAFAFA; }
.data-table td { padding: 16px 24px; border-bottom: 1px solid var(--border-color); color: var(--text-main); }
.data-table tr:last-child td { border-bottom: none; }
.td-mono { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }

/* BUTTONS */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 36px; padding: 0 12px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
.btn-primary { background: var(--accent-color); color: var(--accent-fg); }
.btn-primary:hover { background: #333; }
.btn-secondary { background: var(--surface-color); border-color: var(--border-color); color: var(--text-main); }
.btn-secondary:hover { border-color: var(--border-hover); }
.btn-danger { background: var(--surface-color); border-color: var(--danger-bg); color: var(--danger-color); }
.btn-danger:hover { background: var(--danger-bg); }
.btn-danger-icon { background: none; border: none; color: var(--danger-color); cursor: pointer; padding: 4px; border-radius: 4px; }
.btn-danger-icon:hover { background: var(--danger-bg); }

/* WIDGETS */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }
.stat-box { border: 1px solid var(--border-color); border-radius: var(--radius); padding: 20px; background: var(--surface-color); display: flex; flex-direction: column; }
.sb-title { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
.sb-val { font-size: 28px; font-weight: 600; letter-spacing: -0.5px; line-height: 1; }

.sec { display: none; }
.sec.active { display: block; }

/* ALERTS */
.alert { padding: 12px 16px; border-radius: var(--radius); margin-bottom: 24px; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; border: 1px solid transparent; }
.alert-success { background: #E3FCEF; color: #006644; border-color: #A3E6C2; }
.alert-error { background: var(--danger-bg); color: var(--danger-color); border-color: #FFCACA; }

/* MODAL */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: none; align-items: center; justify-content: center; backdrop-filter: blur(2px); }
.modal-overlay.active { display: flex; }
.modal-box { background: var(--surface-color); border-radius: 8px; width: 100%; max-width: 450px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid var(--border-color); animation: modalIn 0.15s ease-out; }
@keyframes modalIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; }
.modal-title { font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.modal-close { background: none; border: none; color: var(--text-muted); cursor: pointer; }
.modal-body { padding: 24px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px; background: #FAFAFA; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }

.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: var(--text-muted); }
.form-control { width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); outline: none; font-size: 14px; font-family: var(--font-sans); }
.form-control:focus { border-color: var(--text-main); }
@keyframes spin { 100% { transform: rotate(360deg); } }

.dashboard-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; margin-top: 24px; }
.chart-wrap { background: var(--surface-color); padding: 20px; border: 1px solid var(--border-color); border-radius: var(--radius); }
</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
                            <tr><td class="td-mono">evt_94812</td><td>Ana Paula</td><td>Logged In</td><td class="td-mono">2 mins ago</td></tr>
                            <tr><td class="td-mono">evt_94811</td><td>System</td><td>Backup Executed</td><td class="td-mono">1 hr ago</td></tr>
                            <tr><td class="td-mono">evt_94810</td><td>System</td><td>Cron: Update Status</td><td class="td-mono">3 hrs ago</td></tr>
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
lucide.createIcons();

// Chart.js init
const ctx = document.getElementById('roleChart');
if(ctx) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: <?= $chartLabelsJson ?>,
            datasets: [{
                data: <?= $chartValuesJson ?>,
                backgroundColor: ['#FF6B00', '#111827', '#6B7280', '#E5E7EB', '#374151'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: "'Inter', sans-serif" } } }
            }
        }
    });
}

function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.tab').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
}
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
</script>
</body>
</html>
