<?php
// C:\xampp\htdocs\devweb\Sophie-Link\database\migrations\alter_aprendizes_risco.php
require_once __DIR__ . '/../../includes/db.php';

try {
    // Adiciona coluna status_risco
    $pdo->exec("ALTER TABLE aprendizes ADD COLUMN IF NOT EXISTS status_risco ENUM('Baixo', 'Medio', 'Alto') DEFAULT 'Baixo'");
    
    echo "Migration executada com sucesso: coluna 'status_risco' adicionada à tabela 'aprendizes'.\n";
} catch (PDOException $e) {
    die("Erro na migration: " . $e->getMessage());
}
