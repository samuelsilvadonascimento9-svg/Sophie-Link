<?php
// logs.php — Interface de Logs de Auditoria
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'admin') {
    header("Location: ../login_aluno.php");
    exit;
}
require_once '../../includes/db.php';
/** @var \PDO $pdo */

// Tratar banco que ainda não tem a tabela logs_auditoria
try {
    $stmt = $pdo->query("
        SELECT l.*, u.nome, u.email 
        FROM logs_auditoria l 
        LEFT JOIN usuarios u ON l.usuario_id = u.id 
        ORDER BY l.data_hora DESC 
        LIMIT 100
    ");
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    // Se a tabela não existir, array vazio
    $logs = [];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audit Logs — Sophie Link Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/dashboard.css">

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
            <a href="dashboard.php" class="btn btn-secondary" style="height:32px; font-size:13px;">Back to Dashboard</a>
        </div>
    </div>
</header>

<main class="container">
    <div class="page-header">
        <div>
            <h1 class="ph-title">Audit Logs</h1>
            <p class="ph-desc">Detailed system activity tracking.</p>
        </div>
    </div>

    <div class="panel">
        <div class="table-wrap">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date & Time</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Description</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($logs)): ?>
                    <tr><td colspan="6" style="text-align:center; padding: 20px;">Nenhum log encontrado (ou tabela não criada).</td></tr>
                    <?php else: ?>
                        <?php foreach($logs as $log): ?>
                        <tr>
                            <td class="td-mono">#<?= $log['id'] ?></td>
                            <td class="td-mono"><?= date('d/m/Y H:i:s', strtotime($log['data_hora'])) ?></td>
                            <td style="font-weight:500;"><?= $log['nome'] ? htmlspecialchars($log['nome']) : 'Sistema' ?> <br> <small style="color:var(--text-muted);"><?= htmlspecialchars($log['email'] ?? '') ?></small></td>
                            <td><span class="h-team-badge" style="background:#E5E7EB; color:#374151;"><?= htmlspecialchars($log['acao']) ?></span></td>
                            <td><?= htmlspecialchars($log['descricao']) ?></td>
                            <td class="td-mono">-</td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</main>
<script>lucide.createIcons();</script>
</body>
</html>
