<?php
// seed.php - Populate the database with initial mock data
$host = 'localhost';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    // Ler o schema.sql e executar (comprimido para não falhar se já existir, mas já existe então vamos apenas conectar)
    $pdo->exec("CREATE DATABASE IF NOT EXISTS sophie_link CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE sophie_link;");
    // $schema = file_get_contents(__DIR__ . '/database/schema.sql');
    // $pdo->exec($schema);
    $pdo->exec("USE sophie_link");
    
    // ===== LIMPAR DADOS (Opcional, mas útil para testes) =====
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
    $pdo->exec("TRUNCATE TABLE financeiro;");
    $pdo->exec("TRUNCATE TABLE notas;");
    $pdo->exec("TRUNCATE TABLE frequencia;");
    $pdo->exec("TRUNCATE TABLE aprendizes;");
    $pdo->exec("TRUNCATE TABLE empresas;");
    $pdo->exec("TRUNCATE TABLE usuarios;");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");
    
    // ===== INSERIR DADOS: EMPRESAS =====
    $stmtEmp = $pdo->prepare("INSERT INTO empresas (nome, cnpj, responsavel, email) VALUES (?, ?, ?, ?)");
    $empresas = [
        ['Vale S.A.', '33.592.510/0001-54', 'Juliana Costa', 'contato@vale.com'],
        ['Sotreq S.A.', '03.270.835/0001-10', 'Marcos Silva', 'parcerias@sotreq.com'],
        ['Kolping Brasil', '51.344.208/0001-44', 'Padre Carlos', 'contato@kolping.org.br']
    ];
    $empIds = [];
    foreach ($empresas as $e) {
        $stmtEmp->execute($e);
        $empIds[] = $pdo->lastInsertId();
    }
    
    $valeId = $empIds[0];
    
    // ===== INSERIR DADOS: USUÁRIOS =====
    // Senha padrão para todos: '123456'
    $senhaHash = password_hash('123456', PASSWORD_DEFAULT);
    $stmtUser = $pdo->prepare("INSERT INTO usuarios (nome, email, senha, nivel, empresa_id) VALUES (?, ?, ?, ?, ?)");
    
    $usuarios = [
        ['Admin Principal', 'admin@sophielink.com', $senhaHash, 'admin', null],
        ['Prof. Carlos Menezes', 'carlos@sophielink.com', $senhaHash, 'professor', null],
        ['Vale - Partilhar', 'vale@sophielink.com', $senhaHash, 'empresa', $valeId],
        ['Ana Ribeiro (Coord)', 'ana@sophielink.com', $senhaHash, 'coordenadora', null]
    ];
    
    foreach ($usuarios as $u) {
        $stmtUser->execute($u);
    }
    
    // ===== INSERIR DADOS: APRENDIZES =====
    $stmtApr = $pdo->prepare("INSERT INTO aprendizes (nome, cpf, email, empresa_id, curso, data_entrada) VALUES (?, ?, ?, ?, ?, ?)");
    
    $aprendizes = [
        ['Ana Paula Souza', '111.111.111-11', 'ana.souza@aluno.com', $valeId, 'Manutenção Eletromecânica', '2025-03-15'],
        ['Fernanda Rocha', '222.222.222-22', 'fernanda.r@aluno.com', $valeId, 'Manutenção Eletromecânica', '2025-01-10'],
        ['Lucas Carvalho', '333.333.333-33', 'lucas.c@aluno.com', $valeId, 'Gestão da Qualidade', '2025-06-10'],
        ['Bianca Torres', '444.444.444-44', 'bianca.t@aluno.com', $valeId, 'Segurança do Trabalho', '2025-02-10']
    ];
    $aprIds = [];
    foreach ($aprendizes as $a) {
        $stmtApr->execute($a);
        $aprIds[] = $pdo->lastInsertId();
    }
    
    $anaId = $aprIds[0];
    
    // ===== INSERIR DADOS: FREQUÊNCIA =====
    $stmtFreq = $pdo->prepare("INSERT INTO frequencia (aprendiz_id, data_registro, status) VALUES (?, ?, ?)");
    
    // Inserindo presença para Ana Paula em maio (alguns dias)
    $diasMaio = ['2026-05-02', '2026-05-04', '2026-05-09', '2026-05-11', '2026-05-16', '2026-05-18'];
    foreach ($diasMaio as $dia) {
        $stmtFreq->execute([$anaId, $dia, 'presente']);
    }
    
    // ===== INSERIR DADOS: NOTAS =====
    $stmtNota = $pdo->prepare("INSERT INTO notas (aprendiz_id, atividade, valor_nota, data_registro) VALUES (?, ?, ?, ?)");
    
    // Notas da Ana
    $notasAna = [
        ['Manutenção Eletromecânica I', 8.5, '2026-04-15'],
        ['Gestão da Qualidade', 9.0, '2026-04-20'],
        ['Segurança do Trabalho', 7.5, '2026-05-10']
    ];
    foreach ($notasAna as $n) {
        $stmtNota->execute([$anaId, $n[0], $n[1], $n[2]]);
    }
    
    echo "Dados inseridos com sucesso!\n";
    
} catch (PDOException $e) {
    die("Erro: " . $e->getMessage());
}
?>
