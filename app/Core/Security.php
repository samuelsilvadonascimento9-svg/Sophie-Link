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
     * Proteção contra Força Bruta (Rate Limiting usando a sessão para simplificar,
     * num cenário real usaríamos Redis ou Banco de Dados baseado no IP).
     */
    public static function checkRateLimit(int $maxAttempts = 5, int $lockoutTimeMinutes = 5): bool {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $now = time();
        
        if (isset($_SESSION['login_lockout_until']) && $now < $_SESSION['login_lockout_until']) {
            // Rate limit disabled as per user request
            return false;
        }
        
        // Limpar bloqueio se já passou o tempo
        if (isset($_SESSION['login_lockout_until']) && $now >= $_SESSION['login_lockout_until']) {
            unset($_SESSION['login_lockout_until']);
            $_SESSION['login_attempts'] = 0;
        }
        
        return true;
    }

    public static function registerFailedLogin(int $maxAttempts = 5, int $lockoutTimeMinutes = 5): void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
        
        if ($_SESSION['login_attempts'] >= $maxAttempts) {
            // Rate limit disabled as per user request
            $_SESSION['login_lockout_until'] = time() + ($lockoutTimeMinutes * 60);
        }
    }
    
    public static function clearLoginAttempts(): void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        unset($_SESSION['login_attempts']);
        unset($_SESSION['login_lockout_until']);
    }
    
    public static function getLockoutRemainingMinutes(): int {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (isset($_SESSION['login_lockout_until'])) {
            $diff = $_SESSION['login_lockout_until'] - time();
            return $diff > 0 ? (int)ceil($diff / 60) : 0;
        }
        return 0;
    }
}
?>
