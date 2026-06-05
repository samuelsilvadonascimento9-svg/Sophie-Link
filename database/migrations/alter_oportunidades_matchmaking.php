<?php
require 'includes/db.php';
try {
    $pdo->exec('ALTER TABLE oportunidades ADD COLUMN skills_requeridas VARCHAR(255) NULL AFTER status;');
    $pdo->exec('ALTER TABLE oportunidades ADD COLUMN disciplinas_alvo VARCHAR(255) NULL AFTER skills_requeridas;');
    echo "Colunas adicionadas na tabela oportunidades.\n";
} catch (Exception $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo "Colunas já existem.\n";
    } else {
        echo "Erro: " . $e->getMessage() . "\n";
    }
}
