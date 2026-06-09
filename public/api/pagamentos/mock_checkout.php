<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    die("Acesso negado. Usuário não autenticado.");
}

require '../../../includes/db.php';
$pdo = \Core\Connect::getInstance();

$fatura_id = $_GET['id'] ?? null;

if (!$fatura_id) {
    die("ID da fatura não fornecido.");
}

$stmt = $pdo->prepare("SELECT f.*, e.razao_social as empresa_nome FROM financeiro f LEFT JOIN empresas e ON e.id = f.empresa_id WHERE f.id = ?");
$stmt->execute([$fatura_id]);
$fatura = $stmt->fetch();

if (!$fatura) {
    die("Fatura não encontrada.");
}

// Validação de Permissão (IDOR)
$nivel = $_SESSION['usuario_nivel'] ?? '';
$usuario_id = $_SESSION['usuario_id'];

if ($nivel === 'aluno') {
    $stmtA = $pdo->prepare("SELECT id FROM aprendizes WHERE email = (SELECT email FROM usuarios WHERE id = ?) OR nome = (SELECT nome FROM usuarios WHERE id = ?) LIMIT 1");
    $stmtA->execute([$usuario_id, $usuario_id]);
    $aprendiz = $stmtA->fetch();
    $real_aluno_id = $aprendiz ? $aprendiz['id'] : 0;

    $stmtC = $pdo->prepare("SELECT id FROM contratos WHERE aprendiz_id = ? AND empresa_id = ? AND status = 'ativo'");
    $stmtC->execute([$real_aluno_id, $fatura['empresa_id']]);
    if (!$stmtC->fetch()) {
        die("Acesso negado à fatura.");
    }
} elseif ($nivel === 'empresa') {
    if ($fatura['empresa_id'] != ($_SESSION['empresa_id'] ?? 0)) {
        die("Acesso negado à fatura.");
    }
} elseif ($nivel !== 'admin') {
    die("Perfil sem acesso a pagamentos.");
}

// Lógica de processamento do Mock
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'pagar') {
    if ($fatura['status'] !== 'pago') {
        $stmtUpd = $pdo->prepare("UPDATE financeiro SET status = 'pago', data_pagamento = NOW() WHERE id = ?");
        $stmtUpd->execute([$fatura_id]);
    }
    echo json_encode(['success' => true]);
    exit;
}
if ($fatura['status'] === 'pago') {
    die("Esta fatura já foi paga.");
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Checkout - Mercado Pago (Ambiente de Teste)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .checkout-box { background: #fff; border-radius: 8px; width: 100%; max-width: 400px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
        .mp-logo { color: #009EE3; font-size: 1.5rem; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .amount { font-size: 2rem; font-weight: 700; color: #333; margin: 10px 0; }
        .desc { font-size: 0.9rem; color: #666; margin-bottom: 30px; }
        .btn { display: block; width: 100%; padding: 14px; border: none; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: 0.2s; margin-bottom: 12px; }
        .btn-pix { background: #00B1EA; color: #fff; }
        .btn-pix:hover { background: #0099cc; }
        .btn-card { background: #333; color: #fff; }
        .btn-card:hover { background: #111; }
        .btn-boleto { background: #e5e5e5; color: #333; }
        .btn-boleto:hover { background: #d4d4d4; }
        .footer-note { font-size: 0.75rem; color: #999; margin-top: 20px; }
        .overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); align-items: center; justify-content: center; flex-direction: column; color: #fff; }
        .spinner { width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 16px; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>

    <div class="checkout-box">
        <div class="mp-logo"><i data-lucide="shopping-bag"></i> Mercado Pago</div>
        <div class="amount">R$ <?= number_format($fatura['valor'], 2, ',', '.') ?></div>
        <div class="desc">Mensalidade <?= htmlspecialchars($fatura['competencia']) ?> - <?= htmlspecialchars($fatura['empresa_nome']) ?></div>

        <button class="btn btn-pix" onclick="processar('pix')"><i data-lucide="zap"></i> Pagar com Pix</button>
        <button class="btn btn-card" onclick="processar('card')"><i data-lucide="credit-card"></i> Cartão de Crédito</button>
        <button class="btn btn-boleto" onclick="processar('boleto')"><i data-lucide="file-text"></i> Gerar Boleto</button>

        <div class="footer-note">Ambiente de Testes Seguro (Sandbox)</div>
    </div>

    <div class="overlay" id="overlay">
        <div class="spinner"></div>
        <div id="overlay-text" style="font-weight: 600; font-size: 1.1rem;">Processando pagamento...</div>
    </div>

    <script>
        lucide.createIcons();

        function processar(metodo) {
            document.getElementById('overlay').style.display = 'flex';
            
            // Simular comunicação do pagamento
            fetch('mock_checkout.php?id=<?= $fatura_id ?>', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'action=pagar'
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTimeout(() => {
                        document.getElementById('overlay-text').innerHTML = '<i data-lucide="check-circle" style="color:#10B981; width:48px; height:48px; margin-bottom:10px;"></i><br>Pagamento Aprovado!';
                        lucide.createIcons();
                        
                        setTimeout(() => {
                            window.location.href = '../../portais/aluno.php?pagamento=sucesso';
                        }, 1500);
                    }, 1000);
                } else {
                    alert('Erro ao processar pagamento simulado.');
                    document.getElementById('overlay').style.display = 'none';
                }
            })
            .catch(err => {
                alert('Erro de rede.');
                document.getElementById('overlay').style.display = 'none';
            });
        }
    </script>
</body>
</html>
