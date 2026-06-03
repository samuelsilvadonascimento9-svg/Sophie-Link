<?php
require 'includes/db.php';
try {
    $pdo->exec('ALTER TABLE financeiro ADD COLUMN payment_link VARCHAR(500) NULL AFTER observacoes;');
    echo "OK\n";
} catch (Exception $e) {
    if (strpos($e->getMessage(), 'Duplicate column name') !== false) {
        echo "Already exists\n";
    } else {
        echo "Error: " . $e->getMessage() . "\n";
    }
}
