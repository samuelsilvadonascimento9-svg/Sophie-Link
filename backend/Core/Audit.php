<?php
// includes/Audit.php

require_once __DIR__ . '/db.php';

class Audit {
    public static function log($acao, $descricao = '') {
        global $pdo;
        $usuario_id = $_SESSION['usuario_id'] ?? null;
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        
        try {
            $stmt = $pdo->prepare("INSERT INTO logs_auditoria (usuario_id, acao, descricao, ip) VALUES (?, ?, ?, ?)");
            $stmt->execute([$usuario_id, $acao, $descricao, $ip]);
        } catch (Exception $e) {
            // Se falhar o log no DB, registra no arquivo
            error_log("Audit DB Error: " . $e->getMessage());
        }
    }
}
?>
