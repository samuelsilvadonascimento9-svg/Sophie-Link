<?php
// public/api/chatbot/get_messages.php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../../app/Core/Autoloader.php';
require_once __DIR__ . '/../../../includes/db.php';

use Models\ChatMessage;

$conversationId = isset($_GET['conversation_id']) ? (int) $_GET['conversation_id'] : 0;

if ($conversationId <= 0) {
    echo json_encode(['messages' => []]);
    exit;
}

$model = new ChatMessage();
$messages = $model->historyForAi($conversationId, 50); // Busca as últimas 50 mensagens para a tela

echo json_encode(['messages' => array_reverse($messages)]);
