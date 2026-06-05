<?php
// includes/auth.php

require_once __DIR__ . '/../app/Core/Autoloader.php';
require_once __DIR__ . '/../app/Core/Security.php';

// Inicia a sessão com configurações seguras se ainda não foi iniciada
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) ? 1 : 0);
    ini_set('session.cookie_samesite', 'Strict');
    ini_set('session.gc_maxlifetime', 1800); // 30 min no servidor
    session_start();
}

/**
 * Função para proteger páginas que exigem login.
 * Se níveis forem fornecidos, verifica se o usuário possui um deles.
 */
function protect_page(array $allowed_levels = []) {
    $script = $_SERVER['SCRIPT_NAME'];
    $pos = strpos($script, '/public/');
    $base = ($pos !== false) ? substr($script, 0, $pos) : '';

    if (!isset($_SESSION['usuario_id'])) {
        // Redireciona para login
        header('Location: ' . $base . '/public/auth/login_aluno.php');
        exit;
    }
    
    // Verifica inatividade de 30 minutos (1800 segundos)
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
        session_unset();
        session_destroy();
        header('Location: ' . $base . '/public/auth/login_aluno.php?msg=Sessao+expirada');
        exit;
    }
    
    $_SESSION['last_activity'] = time(); // atualiza o timestamp de inatividade
    
    // Regenerar ID da sessão a cada 15 minutos para evitar Session Hijacking
    if (!isset($_SESSION['last_regeneration'])) {
        $_SESSION['last_regeneration'] = time();
    } elseif (time() - $_SESSION['last_regeneration'] > 900) {
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
    
    // Verifica permissão
    if (!empty($allowed_levels) && !in_array($_SESSION['usuario_nivel'], $allowed_levels)) {
        header('Location: ' . $base . '/public/404.php');
        exit;
    }
}
?>
