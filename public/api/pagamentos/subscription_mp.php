<?php
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'empresa') {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Acesso negado. Apenas empresas podem assinar planos.']);
    exit;
}

require '../../../includes/db.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\PreApprovalPlan\PreApprovalPlanClient;

$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

// === CONFIGURAÇÃO DO MERCADO PAGO ===
$mpAccessToken = \Core\Connect::getEnv('MP_ACCESS_TOKEN') ?: 'APP_USR-6836003344835449-060310-e3161895eb8d95272de7ecf76cd26fa9-2244514896';
MercadoPagoConfig::setAccessToken($mpAccessToken);

$data = json_decode(file_get_contents('php://input'), true);
$empresa_id = $_SESSION['empresa_id'] ?? 0;
$valor = (float)($data['valor'] ?? 0);

if (!$empresa_id || $valor <= 0) {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos para assinatura.']);
    exit;
}

try {
    // Busca dados da empresa
    $stmt = $pdo->prepare("SELECT nome, email FROM empresas WHERE id = ?");
    $stmt->execute([$empresa_id]);
    $empresa = $stmt->fetch();

    if (!$empresa) {
        throw new Exception("Empresa não encontrada.");
    }

    $client = new PreApprovalPlanClient();
    $request = [
        "reason" => "Assinatura Mensal - Aprendizes Sophie Link",
        "auto_recurring" => [
            "frequency" => 1,
            "frequency_type" => "months",
            "transaction_amount" => $valor,
            "currency_id" => "BRL",
            "billing_day" => 10,
            "billing_day_proportional" => false
        ],
        "back_url" => "http://" . $_SERVER['HTTP_HOST'] . "/devweb/Sophie-Link/public/portais/empresa.php?assinatura=sucesso",
        "status" => "active"
    ];

    $plan = $client->create($request);

    if (isset($plan->init_point)) {
        echo json_encode([
            'success' => true,
            'init_point' => $plan->init_point,
            'plan_id' => $plan->id
        ]);
    } else {
        throw new Exception("Erro ao criar plano de assinatura.");
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
