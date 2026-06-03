<?php
if (php_sapi_name() !== 'cli') die('Acesso negado');
require_once __DIR__ . '/../includes/db.php';

$senhaHash = password_hash('123456', PASSWORD_DEFAULT);

// Inserir Aluno
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = 'aluno@sophielink.com.br'");
$stmt->execute();
if (!$stmt->fetch()) {
    $pdo->prepare("INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, 'aluno')")
        ->execute(['Aluno Teste', 'aluno@sophielink.com.br', $senhaHash]);
    echo "Usuario aluno criado!\n";
}

// Inserir Admin se nao existir
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = 'admin@sophielink.com.br'");
$stmt->execute();
if (!$stmt->fetch()) {
    $pdo->prepare("INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, 'admin')")
        ->execute(['Administrador', 'admin@sophielink.com.br', $senhaHash]);
    echo "Usuario admin criado!\n";
}

// Inserir Colaborador (Secretaria)
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = 'secretaria@sophielink.com.br'");
$stmt->execute();
if (!$stmt->fetch()) {
    $pdo->prepare("INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, 'colaborador')")
        ->execute(['Secretaria Teste', 'secretaria@sophielink.com.br', $senhaHash]);
    echo "Usuario secretaria criado!\n";
}

echo "Todos os usuarios de teste verificados/criados com senha: 123456";
