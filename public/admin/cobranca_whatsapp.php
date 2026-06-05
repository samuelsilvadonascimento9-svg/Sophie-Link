<?php
// C:\xampp\htdocs\devweb\Sophie-Link\public\admin\cobranca_whatsapp.php
session_start();
require_once '../../includes/auth.php';
protect_page(['admin', 'coordenador']);
require_once '../../includes/db.php';
/** @var PDO $pdo */

// Busca faturas pendentes ou atrasadas
$stmt = $pdo->prepare("
    SELECT f.*, e.nome AS empresa_nome, e.telefone 
    FROM financeiro f
    JOIN empresas e ON f.empresa_id = e.id
    WHERE f.status IN ('pendente', 'atrasado')
    ORDER BY f.data_vencimento ASC
");
$stmt->execute();
$faturas = $stmt->fetchAll();

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cobrança Humanizada via WhatsApp - Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/premium.css">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background: #F8FAFC; color: #1E293B; margin: 0; padding: 2rem; }
        .container { max-width: 1000px; margin: 0 auto; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .table th, .table td { padding: 12px; border-bottom: 1px solid #E2E8F0; text-align: left; }
        .table th { background: #F1F5F9; font-weight: 600; font-size: 0.85rem; color: #64748B; text-transform: uppercase; }
        .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
        .badge-pendente { background: #FEF3C7; color: #D97706; }
        .badge-atrasado { background: #FEE2E2; color: #DC2626; }
        .btn-zap { background: #25D366; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; }
        .btn-zap:hover { background: #128C7E; }
        .btn-zap:disabled { background: #9CA3AF; cursor: not-allowed; }
    </style>
</head>
<body>
    <div class="container">
        <h1 style="color: #25D366; display: flex; align-items: center; gap: 10px;">
            <i data-lucide="message-circle" style="width: 32px; height: 32px;"></i> Cobrança Humanizada (WhatsApp)
        </h1>
        <p style="color: #64748B; margin-bottom: 2rem;">Dispare mensagens de lembrete de vencimento via webhook simulando integração com Z-API / Evolution API.</p>

        <?php if (empty($faturas)): ?>
            <div style="padding: 2rem; text-align: center; color: #64748B; border: 1px dashed #CBD5E1; border-radius: 8px;">
                Nenhuma fatura pendente ou atrasada. O financeiro está em dia! 🎉
            </div>
        <?php else: ?>
            <table class="table">
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>Contato</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($faturas as $f): 
                        $statusClass = $f['status'] === 'atrasado' ? 'badge-atrasado' : 'badge-pendente';
                    ?>
                        <tr id="row-<?= $f['id'] ?>">
                            <td style="font-weight: 600;"><?= htmlspecialchars($f['empresa_nome']) ?></td>
                            <td><?= htmlspecialchars($f['telefone'] ?: 'Não cadastrado') ?></td>
                            <td>R$ <?= number_format($f['valor'], 2, ',', '.') ?></td>
                            <td><?= date('d/m/Y', strtotime($f['data_vencimento'])) ?></td>
                            <td><span class="badge <?= $statusClass ?>"><?= ucfirst($f['status']) ?></span></td>
                            <td>
                                <?php if ($f['telefone']): ?>
                                    <button class="btn-zap" onclick="enviarCobranca(<?= $f['id'] ?>, this)">
                                        <i data-lucide="send" style="width: 14px;"></i> Notificar
                                    </button>
                                <?php else: ?>
                                    <span style="font-size: 0.75rem; color: #9CA3AF;">Sem telefone</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

    <script>
        lucide.createIcons();

        async function enviarCobranca(faturaId, btnElement) {
            const row = document.getElementById('row-' + faturaId);
            const originalHtml = btnElement.innerHTML;
            
            btnElement.disabled = true;
            btnElement.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Enviando...';
            lucide.createIcons();

            try {
                const res = await fetch('../api/whatsapp/send_webhook.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fatura_id: faturaId })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    btnElement.innerHTML = '<i data-lucide="check-circle"></i> Enviado';
                    btnElement.style.background = '#10B981';
                    row.style.background = '#ECFDF5';
                    setTimeout(() => row.style.background = 'transparent', 2000);
                } else {
                    alert('Erro: ' + data.error);
                    btnElement.disabled = false;
                    btnElement.innerHTML = originalHtml;
                }
            } catch (err) {
                alert('Erro na requisição.');
                btnElement.disabled = false;
                btnElement.innerHTML = originalHtml;
            }
            lucide.createIcons();
        }
    </script>
    <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
    </style>
</body>
</html>
