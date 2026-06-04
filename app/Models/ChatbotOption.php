<?php
namespace Models;

use Core\Model;

class ChatbotOption extends Model
{
    protected string $table = 'chatbot_options';

    public function findActiveResponse(string $option): ?string
    {
        $row = $this->findOne([
            'option_key' => $option,
            'is_active'  => 1,
        ], ['response_text']);

        return $row['response_text'] ?? null;
    }
}
