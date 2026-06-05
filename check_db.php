<?php
require 'includes/db.php';
$pdo = \Core\Connect::getInstance();

$tablesQuery = $pdo->query("SHOW TABLES");
$tables = $tablesQuery->fetchAll(PDO::FETCH_COLUMN);
echo "Tabelas no BD:\n";
print_r($tables);

// Verifica se a coluna payment_link existe em financeiro
try {
    $stmt = $pdo->query("SHOW COLUMNS FROM financeiro LIKE 'payment_link'");
    if ($stmt->fetch()) {
        echo "\nColuna 'payment_link' existe na tabela financeiro.\n";
    } else {
        echo "\nFALTA a coluna 'payment_link' na tabela financeiro.\n";
    }
} catch (Exception $e) {
    echo "\nErro ao verificar tabela financeiro.\n";
}

// Verifica tabelas do AVA (por exemplo, modulos, aulas, progresso)
$avaTables = ['ava_modulos', 'ava_aulas', 'ava_progresso']; // Ajustar de acordo com schema_ava.php
foreach ($avaTables as $tb) {
    if (in_array($tb, $tables)) {
        echo "Tabela AVA '$tb' existe.\n";
    } else {
        echo "FALTA tabela AVA '$tb'.\n";
    }
}
