<?php
// includes/Security.php

class Security {
    
    /**
     * Gera um token CSRF e armazena na sessão
     */
    public static function generateCsrfToken(): string {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    /**
     * Realiza um redirecionamento seguro para evitar Open Redirect.
     * Só permite caminhos relativos ao domínio (começando com /).
     */
    public static function safeRedirect(string $url): void {
        if (!empty($url) && str_starts_with($url, '/') && !str_starts_with($url, '//')) {
            header('Location: ' . $url);
            exit;
        }
    }

    /**
     * Valida um token CSRF
     */
    public static function validateCsrfToken(?string $token): bool {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (empty($_SESSION['csrf_token']) || empty($token)) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    /**
     * Proteção contra Força Bruta por IP
     */
    public static function checkRateLimit(int $maxAttempts = 5, int $lockoutTimeMinutes = 5): bool {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $pdo = \Core\Connect::getInstance();
        
        $stmt = $pdo->prepare("SELECT tentativas, bloqueado_ate FROM login_attempts WHERE ip = ?");
        $stmt->execute([$ip]);
        $row = $stmt->fetch();
        
        if ($row && $row['bloqueado_ate'] && new \DateTime() < new \DateTime($row['bloqueado_ate'])) {
            return false; // Ainda bloqueado
        }
        return true;
    }

    public static function registerFailedLogin(int $maxAttempts = 5, int $lockoutTimeMinutes = 5): void {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $pdo = \Core\Connect::getInstance();
        
        $stmt = $pdo->prepare("SELECT id, tentativas FROM login_attempts WHERE ip = ?");
        $stmt->execute([$ip]);
        $row = $stmt->fetch();
        
        if ($row) {
            $tentativas = $row['tentativas'] + 1;
            $bloqueado_ate = null;
            if ($tentativas >= $maxAttempts) {
                $bloqueado_ate = date('Y-m-d H:i:s', strtotime("+$lockoutTimeMinutes minutes"));
            }
            $stmtUpdate = $pdo->prepare("UPDATE login_attempts SET tentativas = ?, bloqueado_ate = ? WHERE id = ?");
            $stmtUpdate->execute([$tentativas, $bloqueado_ate, $row['id']]);
        } else {
            $stmtInsert = $pdo->prepare("INSERT INTO login_attempts (ip, tentativas) VALUES (?, 1)");
            $stmtInsert->execute([$ip]);
        }
    }
    
    public static function clearLoginAttempts(): void {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $pdo = \Core\Connect::getInstance();
        $stmt = $pdo->prepare("DELETE FROM login_attempts WHERE ip = ?");
        $stmt->execute([$ip]);
    }
    
    public static function getLockoutRemainingMinutes(): int {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $pdo = \Core\Connect::getInstance();
        
        $stmt = $pdo->prepare("SELECT bloqueado_ate FROM login_attempts WHERE ip = ?");
        $stmt->execute([$ip]);
        $row = $stmt->fetch();
        
        if ($row && $row['bloqueado_ate']) {
            $diff = strtotime($row['bloqueado_ate']) - time();
            return $diff > 0 ? (int)ceil($diff / 60) : 0;
        }
        return 0;
    }
}
?>
