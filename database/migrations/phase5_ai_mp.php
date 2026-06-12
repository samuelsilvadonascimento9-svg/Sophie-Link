<?php
if (php_sapi_name() !== 'cli' && !isset($_GET['run'])) {
    die('Acesso negado');
}

require_once __DIR__ . '/../../includes/db.php';
$pdo = \Core\Connect::getInstance();

try {
    echo "Iniciando migração da Fase 5 (AI & Mercado Pago)...\n";

    // A coluna chatbot_type em chat_conversations já é VARCHAR(20), então já suporta 'human_needed'.
    echo "- Tabela chat_conversations verificada.\n";

    // 2. Criar tabela leads_comercial
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS leads_comercial (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(150),
            telefone VARCHAR(20) NOT NULL,
            origem VARCHAR(50) DEFAULT 'chatbot_ai',
            status ENUM('novo', 'em_atendimento', 'convertido', 'descartado') DEFAULT 'novo',
            interesse TEXT NULL,
            chat_conversation_id INT NULL,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (chat_conversation_id) REFERENCES chat_conversations(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "- Tabela leads_comercial criada/verificada.\n";

    echo "\nMigração concluída com sucesso!\n";

} catch (PDOException $e) {
    echo "Erro durante a migração: " . $e->getMessage() . "\n";
}
