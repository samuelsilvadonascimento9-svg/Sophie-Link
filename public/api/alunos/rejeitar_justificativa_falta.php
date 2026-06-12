<?php
// api/rejeitar_justificativa_falta.php — Rejeita uma justificativa de falta
session_start();
require_once '../../../includes/auth.php';
protect_page(['colaborador', 'admin']);
require_once '../../../app/Core/Security.php';
$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!Security::validateCsrfToken($data['csrf_token'] ?? '')) {
    echo json_encode(['success' => false, 'error' => 'Token inválido.']); exit;
}

$id = (int)($data['frequencia_id'] ?? 0);
if (!$id) {
    echo json_encode(['success' => false, 'error' => 'ID inválido.']); exit;
}

try {
    $stmt = $pdo->prepare("UPDATE frequencia SET status_justificativa = 'rejeitada' WHERE id = ? AND status = 'falta'");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'error' => 'Falta não encontrada ou já processada.']); exit;
    }

    echo json_encode(['success' => true, 'message' => 'Justificativa rejeitada.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erro: ' . $e->getMessage()]);
}
