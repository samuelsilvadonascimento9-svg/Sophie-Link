<?php
require 'app/Core/Connect.php';
$pdo = \Core\Connect::getInstance();
$pdo->exec("UPDATE usuarios SET email = 'aluno', senha = '".password_hash('aluno', PASSWORD_DEFAULT)."' WHERE nivel = 'aluno'");
$pdo->exec("UPDATE usuarios SET email = 'professor', senha = '".password_hash('professor', PASSWORD_DEFAULT)."' WHERE nivel = 'professor'");
echo "OK\n";
