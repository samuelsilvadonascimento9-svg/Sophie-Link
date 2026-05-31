<?php
namespace Core;

class Security {
    public static function startSession(): void {
        if (session_status() === PHP_SESSION_NONE) {
            ini_set('session.cookie_httponly', 1);
            ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) ? 1 : 0);
            ini_set('session.cookie_samesite', 'Strict');
            ini_set('session.gc_maxlifetime', 1800);
            session_start();
        }
    }
    public static function generateCsrfToken(): string {
        self::startSession();
        if (empty($_SESSION['csrf_token'])) { $_SESSION['csrf_token'] = bin2hex(random_bytes(32)); }
        return $_SESSION['csrf_token'];
    }
    public static function validateCsrfToken(?string $token): bool {
        self::startSession();
        if (empty($_SESSION['csrf_token']) || empty($token)) { return false; }
        return hash_equals($_SESSION['csrf_token'], $token);
    }
    public static function checkRateLimit(int $maxAttempts = 5, int $lockoutTimeMinutes = 5): bool {
        self::startSession();
        $now = time();
        if (isset($_SESSION['login_lockout_until']) && $now < $_SESSION['login_lockout_until']) { return false; }
        if (isset($_SESSION['login_lockout_until']) && $now >= $_SESSION['login_lockout_until']) {
            unset($_SESSION['login_lockout_until']);
            $_SESSION['login_attempts'] = 0;
        }
        return true;
    }
    public static function registerFailedLogin(int $maxAttempts = 5, int $lockoutTimeMinutes = 5): void {
        self::startSession();
        $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
        if ($_SESSION['login_attempts'] >= $maxAttempts) {
            $_SESSION['login_lockout_until'] = time() + ($lockoutTimeMinutes * 60);
        }
    }
    public static function clearLoginAttempts(): void {
        self::startSession();
        unset($_SESSION['login_attempts']);
        unset($_SESSION['login_lockout_until']);
    }
    public static function getLockoutRemainingMinutes(): int {
        self::startSession();
        if (isset($_SESSION['login_lockout_until'])) {
            $diff = $_SESSION['login_lockout_until'] - time();
            return $diff > 0 ? (int)ceil($diff / 60) : 0;
        }
        return 0;
    }
}
?>
