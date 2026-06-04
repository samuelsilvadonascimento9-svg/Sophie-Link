<?php
namespace Helpers;

use Models\ChatConversation;
use Models\ChatMessage;

class ChatHelpers
{
    public static function createConversation(?string $name, ?string $phone, ?string $email, string $type): int
    {
        return (new ChatConversation())->create($name, $phone, $email, $type);
    }

    public static function conversationExists(int $conversationId): bool
    {
        return (new ChatConversation())->exists($conversationId);
    }

    public static function saveMessage(int $conversationId, string $sender, string $message): void
    {
        (new ChatMessage())->create($conversationId, $sender, $message);
        (new ChatConversation())->updateActivity($conversationId);
    }

    public static function getConversationHistoryForAi(int $conversationId, int $limit = 12): array
    {
        $rows = (new ChatMessage())->historyForAi($conversationId, $limit);
        $rows = array_reverse($rows); // cronológica

        $messages = [];
        foreach ($rows as $row) {
            $role = $row['sender'] === 'user' ? 'user' : 'assistant';
            $messages[] = ['role' => $role, 'content' => $row['message']];
        }
        return $messages;
    }
}
