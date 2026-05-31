<?php
session_start();
header('Content-Type: application/json');

require_once '../../Core/Connect.php';

use Core\Connect;

$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$senha = filter_input(INPUT_POST, 'senha', FILTER_DEFAULT);

if (!$email || !$senha) {
    echo json_encode(['success' => false, 'message' => 'Preencha todos os campos.']);
    exit;
}

try {
    $pdo = Connect::getInstance();
    $stmt = $pdo->prepare("SELECT id, nome, senha, nivel, empresa_id FROM usuarios WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($senha, $user['senha'])) {
        $_SESSION['usuario_id'] = $user['id'];
        $_SESSION['usuario_nome'] = $user['nome'];
        $_SESSION['usuario_nivel'] = $user['nivel'];
        if ($user['empresa_id']) {
            $_SESSION['empresa_id'] = $user['empresa_id'];
        }
        
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciais inválidas.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
