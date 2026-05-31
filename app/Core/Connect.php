<?php
// Gerencia a conexão com o banco. Padrão Singleton: abre apenas uma conexão por execução.

namespace Core;

class Connect
{
    // Opções padrão do PDO: lança exceções em erros, retorna arrays associativos
    private const OPTIONS = [
        \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        \PDO::ATTR_CASE               => \PDO::CASE_NATURAL,
        \PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    /** @var \PDO|null */
    private static $instance = null;

    // Retorna a conexão existente ou cria uma nova se for a primeira chamada
    public static function getInstance(): \PDO
    {
        if (self::$instance) {
            return self::$instance; // Reutiliza a conexão já aberta
        }

        // Configurações padrão
        $dbHost = '127.0.0.1';
        $dbName = 'sophie_link';
        $dbUser = 'root';
        $dbPass = '';

        // Tenta carregar o arquivo .env
        $envFile = __DIR__ . '/../../.env';
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
            self::$instance = new \PDO($dsn, $dbUser, $dbPass, self::OPTIONS);
        } catch (\PDOException $e) {
            // Log do erro em arquivo ao invés de expor na tela
            error_log("DB Connection Error: " . $e->getMessage(), 3, __DIR__ . '/../../app.log');
            
            // Se for uma requisição de API, retornar JSON
            if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
                header('Content-Type: application/json; charset=utf-8');
                http_response_code(500);
                die(json_encode(['success' => false, 'message' => 'Erro interno de servidor. Falha na conexão com o banco de dados.']));
            }
            
            die("Erro crítico no sistema. A equipe técnica foi notificada.");
        }

        return self::$instance;
    }
}
?>
