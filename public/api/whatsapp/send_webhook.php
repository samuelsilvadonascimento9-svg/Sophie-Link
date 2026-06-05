<?php
// C:\xampp\htdocs\devweb\Sophie-Link\public\api\whatsapp\send_webhook.php
// Script simulador de envio de Webhook para WhatsApp (Z-API, Evolution API, etc.)
session_start();
require_once '../../../includes/auth.php';
protect_page(['admin', 'coordenador']);
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

    // Simula a mensagem humanizada
    $mensagem = "Olá, {$fatura['empresa_nome']}! Tudo bem?\n\n";
    $mensagem .= "Passando para lembrar que a sua fatura do programa Jovem Aprendiz da *Sophie Link* no valor de {$valorFormatado} vence dia {$vencimento}.\n";
    $mensagem .= "Qualquer dúvida sobre o boleto, nossa equipe financeira está à disposição! 💙";

    // AQUI ENTRARIA O CÓDIGO CURL REAL PARA A API DO WHATSAPP
    // Exemplo:
    // $ch = curl_init('https://api.z-api.io/instances/XXXX/token/YYYY/send-text');
    // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['phone' => $telefoneDestino, 'message' => $mensagem]));
    // ...

    // SIMULANDO SUCESSO (Delay artificial para parecer real)
    usleep(500000); // 0.5s

    // Adiciona uma observação de notificação na fatura
    $novaObs = trim(($fatura['observacoes'] ?? '') . "\n[SISTEMA] Notificação via WhatsApp enviada em " . date('d/m/Y H:i'));
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

