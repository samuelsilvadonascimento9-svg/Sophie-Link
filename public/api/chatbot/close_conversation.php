<?php
// public/api/chatbot/close_conversation.php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../../app/Core/Autoloader.php';
require_once __DIR__ . '/../../../includes/db.php';

use Models\ChatConversation;

$payload = json_decode(file_get_contents('php://input'), true) ?: [];
$conversationId = isset($payload['conversation_id']) ? (int) $payload['conversation_id'] : 0;

if ($conversationId > 0) {
    $model = new ChatConversation();
    $model->close($conversationId);
}

echo json_encode(['success' => true]);
