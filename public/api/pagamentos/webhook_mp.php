<?php
require '../../../includes/db.php';
$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

// O Mercado Pago envia o webhook como POST body JSON ou parâmetros GET/POST tradicionais dependendo da configuração.
$data = json_decode(file_get_contents('php://input'), true);

// O MP envia a notificação. Precisamos do action (ex: payment.created ou payment.updated) e data.id
if (isset($_GET['topic']) && $_GET['topic'] == 'payment') {
    $payment_id = $_GET['id'] ?? null;
} else {
    $payment_id = $data['data']['id'] ?? $data['id'] ?? null;
}

if (!$payment_id) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Payment ID missing']);
    exit;
}

// Em produção, você DEVE buscar o pagamento na API do MP usando o $payment_id para garantir a segurança.
// $mpAccessToken = 'SEU_ACCESS_TOKEN';
// $ch = curl_init("https://api.mercadopago.com/v1/payments/$payment_id");
// ...

try {
    // Para fins de demonstração (mock):
    $fatura_id = $_GET['ext_ref'] ?? null;
    
    if ($fatura_id) {
        $stmt = $pdo->prepare("UPDATE financeiro SET status = 'pago', data_pagamento = NOW() WHERE id = ?");
        $stmt->execute([$fatura_id]);
    }
    
    // Sucesso, retorna 200 pro MP parar de enviar notificações
    http_response_code(200);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
