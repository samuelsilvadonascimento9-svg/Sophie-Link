<?php
require_once __DIR__ . '/../includes/db.php';

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS requerimentos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            aprendiz_id INT NOT NULL,
            tipo VARCHAR(100) NOT NULL,
            observacoes TEXT,
            status ENUM('pendente', 'em_andamento', 'concluido', 'recusado') DEFAULT 'pendente',
            protocolo VARCHAR(20) UNIQUE,
            data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_conclusao TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "Tabela requerimentos criada com sucesso.\n";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
