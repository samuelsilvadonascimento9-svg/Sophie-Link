<?php
// public/api/chatbot/get_messages.php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../../app/Core/Autoloader.php';
require_once __DIR__ . '/../../../includes/db.php';

use Models\ChatMessage;

require_once __DIR__ . '/../../../includes/auth.php';
protect_page(['aluno', 'colaborador', 'admin', 'professor']);

$conversationId = isset($_GET['conversation_id']) ? (int) $_GET['conversation_id'] : 0;

if ($conversationId <= 0) {
    echo json_encode(['messages' => []]);
    exit;
}

// Verificar se a conversa pertence ao usuário atual
$pdo = \Core\Connect::getInstance();
$stmt = $pdo->prepare("SELECT id FROM chat_conversations WHERE id = ? AND usuario_id = ?");
$stmt->execute([$conversationId, $_SESSION['usuario_id']]);
if (!$stmt->fetch()) {
    echo json_encode(['messages' => []]);
    exit;
}

$model = new ChatMessage();
$messages = $model->historyForAi($conversationId, 50); // Busca as últimas 50 mensagens para a tela

echo json_encode(['messages' => array_reverse($messages)]);
