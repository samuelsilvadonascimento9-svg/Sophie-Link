<?php
namespace Core;

use PDO;
use PDOException;

class Connect {
    private static $instance;

    private function __construct() {}

    public static function getInstance() {
        if (!isset(self::$instance)) {
            try {
                // Lê variáveis do .env de forma simples
                $envFile = __DIR__ . '/../../.env';
                $env = [];
                if (file_exists($envFile)) {
                    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                    foreach ($lines as $line) {
                        if (strpos(trim($line), '#') === 0) continue;
                        list($name, $value) = explode('=', $line, 2);
                        $env[trim($name)] = trim($value);
                    }
                }

                $host = $env['DB_HOST'] ?? 'localhost';
                $db = $env['DB_NAME'] ?? 'sophie_link';
                $user = $env['DB_USER'] ?? 'root';
                $pass = $env['DB_PASS'] ?? '';

                self::$instance = new PDO(
                    "mysql:host={$host};dbname={$db};charset=utf8mb4",
                    $user,
                    $pass,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false
                    ]
                );
            } catch (PDOException $e) {
                die("Erro de conexão: " . $e->getMessage());
            }
        }
        return self::$instance;
    }
}
