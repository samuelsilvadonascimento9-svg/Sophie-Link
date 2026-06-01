<?php
// includes/db.php

require_once __DIR__ . '/../app/Core/Autoloader.php';

// Configurações de Segurança da Sessão (deve ser chamado antes de qualquer session_start())
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) ? 1 : 0);
    ini_set('session.cookie_samesite', 'Strict');
    ini_set('session.gc_maxlifetime', 1800); // 30 min expiração
}
ini_set('expose_php', 0); // Tentar ocultar versão PHP

// Inicializa a conexão com o banco de dados usando o novo padrão Singleton
// Mantém a variável global $pdo para garantir compatibilidade retroativa com as páginas legadas
$pdo = \Core\Connect::getInstance();
?>
