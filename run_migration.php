<?php
require 'includes/db.php';
/** @var PDO $pdo */

try {
    $sql = file_get_contents('database/migrations/2026_06_improvements.sql');
    // Executa statement por statement
    foreach (explode(';', $sql) as $stmt) {
        $stmt = trim($stmt);
        if ($stmt && !str_starts_with($stmt, '--')) {
            $pdo->exec($stmt);
        }
    }
    echo "Migration executada com sucesso!\n";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
