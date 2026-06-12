<?php
require_once __DIR__ . '/../includes/db.php';
global $pdo;
$pdo->exec("
CREATE TABLE IF NOT EXISTS certificados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    aprendiz_id INT,
    curso VARCHAR(100),
    carga_horaria INT,
    data_conclusao DATE,
    data_emissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    emitido_por INT,
    ativo TINYINT(1) DEFAULT 1,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
    FOREIGN KEY (emitido_por) REFERENCES usuarios(id) ON DELETE SET NULL
)
");
echo "Table created successfully\n";
