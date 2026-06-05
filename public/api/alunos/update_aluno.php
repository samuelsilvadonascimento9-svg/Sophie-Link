<?php
// api/update_aluno.php — Salva edição de dados de um aluno
session_start();
require_once '../../../includes/auth.php';
protect_page(['colaborador', 'admin']);
require_once '../../../includes/db.php';
require_once '../../../app/Core/Security.php';
$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!Security::validateCsrfToken($data['csrf_token'] ?? '')) {
    echo json_encode(['success' => false, 'error' => 'Token de segurança inválido.']); exit;
}

$id        = (int)($data['id'] ?? 0);
$nome      = trim($data['nome'] ?? '');
$cpf       = trim($data['cpf'] ?? '');
$rg        = trim($data['rg'] ?? '');
$email     = trim($data['email'] ?? '');
$telefone  = trim($data['telefone'] ?? '');
$situacao  = in_array($data['situacao'] ?? '', ['cursando','concluido','desligado','trancado']) ? $data['situacao'] : 'cursando';
$turma_id  = (int)($data['turma_id'] ?? 0);
$observacoes = trim($data['observacoes'] ?? '');

if (!$id || empty($nome) || empty($cpf)) {
    echo json_encode(['success' => false, 'error' => 'Campos obrigatórios faltando.']); exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE aprendizes
        SET nome = ?, cpf = ?, rg = ?, email = ?, telefone = ?,
            situacao_aluno = ?, turma_id = ?, observacoes = ?
        WHERE id = ? AND deleted_at IS NULL
    ");
    $stmt->execute([$nome, $cpf, $rg, $email, $telefone, $situacao, $turma_id ?: null, $observacoes, $id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'error' => 'Aluno não encontrado ou sem alterações.']); exit;
    }

    echo json_encode(['success' => true, 'message' => 'Dados do aluno atualizados com sucesso!']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erro ao salvar: ' . $e->getMessage()]);
}
