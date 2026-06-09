<?php
require '../../../includes/db.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;

$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

// O Mercado Pago envia o webhook como POST body JSON ou parâmetros GET/POST tradicionais dependendo da configuração.
$data = json_decode(file_get_contents('php://input'), true);

// === CONFIGURAÇÃO DO MERCADO PAGO ===
$mpAccessToken = 'APP_USR-6836003344835449-060310-e3161895eb8d95272de7ecf76cd26fa9-2244514896';
MercadoPagoConfig::setAccessToken($mpAccessToken);

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

try {
    $client = new PaymentClient();
    $payment = $client->get($payment_id);
    
    // O webhook pode ser chamado várias vezes e por vários motivos (ex: pagamento criado, pendente, rejeitado).
    // Nós só processamos a baixa da fatura se o status for realmente 'approved' (aprovado).
    if ($payment->status === 'approved') {
        // Buscamos a referência da fatura (que nós passamos lá no checkout_mp.php)
        $fatura_id = $payment->external_reference;
        
        if ($fatura_id) {
            $stmt = $pdo->prepare("UPDATE financeiro SET status = 'pago', data_pagamento = NOW() WHERE id = ?");
            $stmt->execute([$fatura_id]);
        }
    }
    
    // Sucesso, retorna 200 pro MP parar de enviar notificações para esse ID
    http_response_code(200);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
