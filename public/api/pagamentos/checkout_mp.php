<?php
require '../../../includes/db.php';
$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

// === CONFIGURAÇÃO DO MERCADO PAGO ===
// Substitua pelo seu Access Token real do painel: https://www.mercadopago.com.br/developers/panel/app
$mpAccessToken = 'APP_USR-6836003344835449-060310-e3161895eb8d95272de7ecf76cd26fa9-2244514896';

// URL base do seu servidor local (sem espaços e sem %20)
$baseUrl = 'http://localhost/DevWeb/Sophie%20Link/public';

// =============================================
$data = json_decode(file_get_contents('php://input'), true);
$fatura_id = (int)($data['id'] ?? 0);

if (!$fatura_id) {
    echo json_encode(['success' => false, 'error' => 'ID da fatura não fornecido.']);
    exit;
}

try {
    // Buscar fatura + dados do aprendiz via contrato
    $stmt = $pdo->prepare("
        SELECT 
            f.*,
            e.nome AS empresa_nome,
            a.nome AS aluno_nome,
            a.email AS aluno_email
        FROM financeiro f
        LEFT JOIN empresas e ON e.id = f.empresa_id
        LEFT JOIN contratos c ON c.empresa_id = f.empresa_id AND c.status = 'ativo'
        LEFT JOIN aprendizes a ON a.id = c.aprendiz_id
        WHERE f.id = ?
        LIMIT 1
    ");
    $stmt->execute([$fatura_id]);
    $fatura = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$fatura) {
        throw new Exception('Fatura não encontrada.');
    }

    if ($fatura['status'] === 'pago') {
        throw new Exception('Esta fatura já está paga.');
    }

    // Se já tiver link válido do MP salvo, retornar o mesmo (evita criar cobranças duplicadas)
    // Limpar links de mock que possam estar salvos
    if (!empty($fatura['payment_link']) && strpos($fatura['payment_link'], 'mercadopago') !== false) {
        echo json_encode(['success' => true, 'init_point' => $fatura['payment_link']]);
        exit;
    }

    // Montar dados da Preference do Mercado Pago
    $titulo = 'Mensalidade ' . $fatura['competencia'];
    $payerName = $fatura['aluno_nome'] ?: ($fatura['empresa_nome'] ?: 'Aluno Sophie Link');
    // Forçar um e-mail aleatório de teste para evitar que o MP reconheça seu e-mail e te bloqueie no Sandbox
    $payerEmail = 'test_user_' . rand(10000, 99999) . '@testuser.com';
    $valor = (float)$fatura['valor'];

    if ($valor <= 0) {
        throw new Exception('Valor da fatura inválido.');
    }

    $preferenceData = [
        'items' => [[
            'title'       => $titulo,
            'description' => 'Mensalidade Sophie Link - ' . ($fatura['empresa_nome'] ?: ''),
            'quantity'    => 1,
            'currency_id' => 'BRL',
            'unit_price'  => $valor
        ]],
        'payer' => [
            'name'  => $payerName,
            'email' => $payerEmail
        ],
        'payment_methods' => [
            'excluded_payment_types' => [],
            'installments' => 12
        ],
        'back_urls' => [
            'success' => 'https://sophielink.com.br/portais/aluno.php?pagamento=sucesso',
            'failure' => 'https://sophielink.com.br/portais/aluno.php?pagamento=falha',
            'pending' => 'https://sophielink.com.br/portais/aluno.php?pagamento=pendente'
        ],
        // 'auto_return' removido para evitar erro de validação estrita do Mercado Pago em localhost
        'external_reference' => (string)$fatura['id'],
        'statement_descriptor' => 'Sophie Link'
    ];

    // Chamada à API do Mercado Pago
    $ch = curl_init('https://api.mercadopago.com/checkout/preferences');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($preferenceData),
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $mpAccessToken,
            'Content-Type: application/json',
            'X-Idempotency-Key: fatura-' . $fatura_id . '-' . time()
        ],
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        throw new Exception('Erro de conexão com Mercado Pago: ' . $curlError);
    }

    $mpResult = json_decode($response, true);

    if ($httpCode >= 200 && $httpCode < 300 && (isset($mpResult['init_point']) || isset($mpResult['sandbox_init_point']))) {
        // Em teste/sandbox usa sandbox_init_point; em produção usa init_point
        $link = $mpResult['sandbox_init_point'] ?? $mpResult['init_point'];

        // Salvar link real na tabela (limpar cache antigo)
        $upd = $pdo->prepare("UPDATE financeiro SET payment_link = ? WHERE id = ?");
        $upd->execute([$link, $fatura['id']]);

        echo json_encode([
            'success'    => true,
            'init_point' => $link
        ]);
    } else {
        // Mostrar o erro completo do MP para diagnóstico
        $mpMessage = $mpResult['message'] ?? $mpResult['error'] ?? json_encode($mpResult);
        throw new Exception('Mercado Pago retornou erro [' . $httpCode . ']: ' . $mpMessage);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
