<?php
// includes/db.php

// Configurações de Segurança da Sessão (deve ser chamado antes de qualquer session_start())
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) ? 1 : 0);
    ini_set('session.cookie_samesite', 'Strict');
    ini_set('session.gc_maxlifetime', 1800); // 30 min expiração
}
ini_set('expose_php', 0); // Tentar ocultar versão PHP

// Tenta carregar o arquivo .env
$envFile = __DIR__ . '/../.env';
$dbHost = '127.0.0.1';
$dbName = 'sophie_link';
$dbUser = 'root';
$dbPass = '';

if (file_exists($envFile)) {
    $envVariables = parse_ini_file($envFile);
    if ($envVariables) {
        $dbHost = $envVariables['DB_HOST'] ?? $dbHost;
        $dbName = $envVariables['DB_NAME'] ?? $dbName;
        $dbUser = $envVariables['DB_USER'] ?? $dbUser;
        $dbPass = $envVariables['DB_PASS'] ?? $dbPass;
    }
}

try {
    $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $dbUser, $dbPass, $options);
} catch (PDOException $e) {
    // Log do erro em arquivo ao invés de expor na tela
    error_log("DB Connection Error: " . $e->getMessage(), 3, __DIR__ . '/../app.log');
    die("Erro crítico no sistema. A equipe técnica foi notificada.");
}
?>
