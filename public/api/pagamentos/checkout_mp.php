<?php
require '../../../includes/db.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;

$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

// === CONFIGURAÇÃO DO MERCADO PAGO ===
// Substitua pelo seu Access Token real do painel: https://www.mercadopago.com.br/developers/panel/app
MercadoPagoConfig::setAccessToken(\Core\Connect::getEnv('MP_ACCESS_TOKEN'));

// URL base do seu servidor local (sem espaços e sem %20)
$baseUrl = 'http://localhost/DevWeb/Sophie%20Link/public';

session_start();
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Acesso negado. Usuário não autenticado.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$fatura_id = (int)($data['id'] ?? 0);

if (!$fatura_id) {
    http_response_code(400);
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
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'Acesso negado à fatura.']);
            exit;
        }
    } elseif ($nivel === 'empresa') {
        if ($fatura['empresa_id'] != ($_SESSION['empresa_id'] ?? 0)) {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'Acesso negado à fatura.']);
            exit;
        }
    } elseif ($nivel !== 'admin') {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'Perfil sem acesso a pagamentos.']);
        exit;
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

    $client = new PreferenceClient();
    $preference = $client->create([
        'items' => [
            [
                'title'       => $titulo,
                'description' => 'Mensalidade Sophie Link - ' . ($fatura['empresa_nome'] ?: ''),
                'quantity'    => 1,
                'currency_id' => 'BRL',
                'unit_price'  => $valor
            ]
        ],
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
    ]);

    // Em teste/sandbox usa sandbox_init_point; em produção usa init_point
    $link = $preference->sandbox_init_point ?? $preference->init_point;

    if ($link) {
        // Salvar link real na tabela (limpar cache antigo)
        $upd = $pdo->prepare("UPDATE financeiro SET payment_link = ? WHERE id = ?");
        $upd->execute([$link, $fatura['id']]);

        echo json_encode([
            'success'    => true,
            'init_point' => $link
        ]);
    } else {
        throw new Exception('Falha ao gerar link de pagamento no Mercado Pago.');
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
