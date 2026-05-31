<?php
require_once __DIR__ . '/backend/Core/Autoloader.php';
try {
    $pdo = \Core\Connect::getInstance();
    echo "DB OK";
} catch (Exception $e) {
    echo "DB ERROR: " . $e->getMessage();
}
