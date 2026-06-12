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
$mpAccessToken = \Core\Connect::getEnv('MP_ACCESS_TOKEN');
if (!$mpAccessToken) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'MP_ACCESS_TOKEN não configurado']);
    exit;
}
MercadoPagoConfig::setAccessToken($mpAccessToken);

// === VALIDAÇÃO DE ASSINATURA (x-signature) ===
$secret = \Core\Connect::getEnv('MP_WEBHOOK_SECRET');
if ($secret) {
    $xSignature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
    $xRequestId = $_SERVER['HTTP_X_REQUEST_ID'] ?? '';
    
    $ts = '';
    $v1 = '';
    
    $parts = explode(',', $xSignature);
    foreach ($parts as $part) {
        $kv = explode('=', trim($part), 2);
        if (count($kv) === 2) {
            if ($kv[0] === 'ts') $ts = $kv[1];
            if ($kv[0] === 'v1') $v1 = $kv[1];
        }
    }
    
    // O Mercado Pago envia o webhook como POST body JSON ou parâmetros GET/POST tradicionais dependendo da configuração.
    // O id pode estar em data.id ou id dependendo do tipo de notificação
    if (isset($_GET['topic']) && $_GET['topic'] == 'payment') {
        $dataID = $_GET['id'] ?? '';
    } else {
        $dataID = $data['data']['id'] ?? $data['id'] ?? '';
    }

    if ($ts && $v1 && $dataID && $xRequestId) {
        $manifest = "id:$dataID;request-id:$xRequestId;ts:$ts";
        $hmac = hash_hmac('sha256', $manifest, $secret);
        
        if (!hash_equals($hmac, $v1)) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Assinatura invalida']);
            exit;
        }
    } else {
        // Log ou tratamento de erro se faltarem campos
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Dados de assinatura incompletos']);
        exit;
    }
}

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
