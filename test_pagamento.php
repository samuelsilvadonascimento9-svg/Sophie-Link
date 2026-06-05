<?php
require 'includes/db.php';
$pdo = \Core\Connect::getInstance();
$stmt = $pdo->query('SELECT id FROM financeiro LIMIT 1');
$id = $stmt->fetchColumn();
echo "Fatura ID: $id\n";
