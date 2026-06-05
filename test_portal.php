<?php
chdir('c:/xampp/htdocs/DevWeb/Sophie Link/public/portais');
$_SERVER['REQUEST_METHOD'] = 'GET';
session_start();
$_SESSION['usuario_id'] = 1;
$_SESSION['usuario_nome'] = 'Test User';
$_SESSION['usuario_tipo'] = 'aluno';
$_SESSION['usuario_nivel'] = 'aluno';
$_SESSION['usuario_email'] = 'test@example.com';

// Capture output to not clutter the terminal
ob_start();
try {
    include 'c:/xampp/htdocs/DevWeb/Sophie Link/public/portais/portal_aluno.php';
    ob_end_clean();
    echo "SUCCESS: No fatal errors.";
} catch (Throwable $e) {
    ob_end_clean();
    echo "ERROR: " . $e->getMessage() . " on line " . $e->getLine() . " in " . $e->getFile();
}
