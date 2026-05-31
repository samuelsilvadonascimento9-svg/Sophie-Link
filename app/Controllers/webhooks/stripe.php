<?php
// app/api/webhooks/stripe.php
require_once '../../Core/ApiHelper.php';
require_once '../../../app/Core/Autoloader.php';
$pdo = \Core\Connect::getInstance();
// O Stripe envia o payload no corpo cru (raw input)
$payload = file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

// Em um ambiente real, você configuraria o webhook secret no .env
$endpoint_secret = 'whsec_test_mock_secret_key'; 

$event = null;

try {
    // Como não temos a biblioteca oficial do Stripe no projeto (sem Composer),
    // estamos simulando a decodificação do evento para fins de MVP.
    $event = json_decode($payload, true);
    
    if (!$event || !isset($event['type'])) {
        throw new Exception("Payload inválido.");
    }
} catch(\Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Webhook falhou na decodificação.']);
    exit();
}

// Manipular o evento
switch ($event['type']) {
    case 'payment_intent.succeeded':
        $paymentIntent = $event['data']['object']; // Contém os detalhes do pagamento
        // Aqui atualizaria a tabela 'financeiro'
        // $empresa_id = $paymentIntent['metadata']['empresa_id'];
        Audit::log('webhook_stripe', 'Pagamento processado com sucesso: ' . $paymentIntent['id']);
        break;
        
    case 'payment_intent.payment_failed':
        $paymentIntent = $event['data']['object'];
        Audit::log('webhook_stripe_error', 'Falha no pagamento: ' . $paymentIntent['id']);
        break;
        
    default:
        // Evento não tratado, mas recebido com sucesso
        break;
}

http_response_code(200);
echo json_encode(['status' => 'success']);
?>

