<?php
if (php_sapi_name() !== 'cli') die('Acesso negado');
require '../includes/db.php';
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS mensagens_contato (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        telefone VARCHAR(20) NULL,
        mensagem TEXT NOT NULL,
        lida TINYINT(1) DEFAULT 0,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );");
    echo 'Table mensagens_contato created.';
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
