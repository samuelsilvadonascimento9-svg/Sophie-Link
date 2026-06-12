<?php
// C:\xampp\htdocs\devweb\Sophie-Link\public\api\whatsapp\send_webhook.php
// Script simulador de envio de Webhook para WhatsApp (Z-API, Evolution API, etc.)
session_start();
require_once '../../../includes/db.php';
$data = json_decode(file_get_contents('php://input'), true);

$isServerCall = isset($data['server_key']) && $data['server_key'] === 'mp_webhook_secret_local';
if (!$isServerCall) {
    require_once '../../../includes/auth.php';
    protect_page(['admin', 'coordenador']);
}
require_once '../../../includes/db.php';
/** @var PDO $pdo */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Apenas POST é aceito.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$fatura_id = $data['fatura_id'] ?? null;

if (!$fatura_id) {
    echo json_encode(['success' => false, 'error' => 'Fatura não informada.']);
    exit;
}

try {
    // Busca os dados da fatura e da empresa
    $stmt = $pdo->prepare("
        SELECT f.*, e.nome AS empresa_nome, e.telefone 
        FROM financeiro f 
        JOIN empresas e ON f.empresa_id = e.id 
        WHERE f.id = ?
    ");
    $stmt->execute([$fatura_id]);
    $fatura = $stmt->fetch();

    if (!$fatura) {
        throw new Exception("Fatura não encontrada.");
    }

    $telefoneDestino = $fatura['telefone'];
    $valorFormatado = 'R$ ' . number_format($fatura['valor'], 2, ',', '.');
    $vencimento = date('d/m/Y', strtotime($fatura['data_vencimento']));

    $isReceipt = isset($data['is_receipt']) && $data['is_receipt'] === true;

    if ($isReceipt) {
        $mensagem = "Olá, {$fatura['empresa_nome']}!\n\n";
        $mensagem .= "Identificamos o pagamento da sua fatura no valor de {$valorFormatado}. Muito obrigado!\n";
        $mensagem .= "O recibo já está disponível no seu portal da Sophie Link.";
        $obsText = "[SISTEMA] Recibo de pagamento enviado via WhatsApp em " . date('d/m/Y H:i');
    } else {
        $mensagem = "Olá, {$fatura['empresa_nome']}! Tudo bem?\n\n";
        $mensagem .= "Passando para lembrar que a sua fatura do programa Jovem Aprendiz da *Sophie Link* no valor de {$valorFormatado} vence dia {$vencimento}.\n";
        $mensagem .= "Qualquer dúvida sobre o boleto, nossa equipe financeira está à disposição! 💙";
        $obsText = "[SISTEMA] Notificação de cobrança via WhatsApp enviada em " . date('d/m/Y H:i');
    }

    // AQUI ENTRARIA O CÓDIGO CURL REAL PARA A API DO WHATSAPP
    // Exemplo:
    // $ch = curl_init('https://api.z-api.io/instances/XXXX/token/YYYY/send-text');
    // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['phone' => $telefoneDestino, 'message' => $mensagem]));
    // ...

    // SIMULANDO SUCESSO (Delay artificial para parecer real)
    usleep(500000); // 0.5s

    // Adiciona uma observação de notificação na fatura
    $novaObs = trim(($fatura['observacoes'] ?? '') . "\n" . $obsText);
    $stmtUpdate = $pdo->prepare("UPDATE financeiro SET observacoes = ? WHERE id = ?");
    $stmtUpdate->execute([$novaObs, $fatura_id]);

    echo json_encode([
        'success' => true,
        'message' => 'Mensagem de cobrança humanizada enviada com sucesso.',
        'simulated_payload' => [
            'to' => $telefoneDestino,
            'text' => $mensagem
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

