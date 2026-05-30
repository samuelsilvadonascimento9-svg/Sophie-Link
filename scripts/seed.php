<?php
if (php_sapi_name() !== 'cli') die('Acesso negado');
// seed.php - Populate the database with initial mock data
$host = 'localhost';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    // Ler o schema.sql e executar
    $pdo->exec("CREATE DATABASE IF NOT EXISTS sophie_link CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    $pdo->exec("USE sophie_link;");
    
    // Tenta carregar o schema atualizado se existir
    $schemaFile = __DIR__ . '/../database/schema.sql';
    if (file_exists($schemaFile)) {
        // Cuidado: Executar script SQL inteiro pode ter problemas de sintaxe no PDO.
        // Como já criamos as tabelas manualmente via código antes ou o db já existe, 
        // vamos dropar e recriar para garantir o novo schema
    }
    
    // ===== LIMPAR DADOS (Recriando as tabelas limpas para refletir novo schema) =====
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
    $pdo->exec("DROP TABLE IF EXISTS logs_auditoria;");
    $pdo->exec("DROP TABLE IF EXISTS financeiro;");
    $pdo->exec("DROP TABLE IF EXISTS notas;");
    $pdo->exec("DROP TABLE IF EXISTS frequencia;");
    $pdo->exec("DROP TABLE IF EXISTS contratos;");
    $pdo->exec("DROP TABLE IF EXISTS aprendizes;");
    $pdo->exec("DROP TABLE IF EXISTS usuarios;");
    $pdo->exec("DROP TABLE IF EXISTS empresas;");
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");
    
    // Executando o schema.sql
    $schema = file_get_contents(__DIR__ . '/../database/schema.sql');
    $pdo->exec($schema);
    
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
        ['Prof. Carlos Menezes', 'carlos@sophielink.com.br', $senhaHash, 'professor', null],
        ['Vale - Partilhar', 'vale@sophielink.com.br', $senhaHash, 'empresa', $valeId],
        ['Ana Ribeiro (Coord)', 'ana@sophielink.com.br', $senhaHash, 'coordenadora', null]
    ];
    $userAdminId = 1;
    foreach ($usuarios as $u) {
        $stmtUser->execute($u);
    }
    
    // ===== INSERIR DADOS: APRENDIZES =====
    $stmtApr = $pdo->prepare("INSERT INTO aprendizes (nome, cpf, email, curso, situacao_aluno) VALUES (?, ?, ?, ?, ?)");
    
    $aprendizes = [
        ['Ana Paula Souza', '111.111.111-11', 'ana.souza@aluno.com', 'Manutenção Eletromecânica', 'cursando'],
        ['Fernanda Rocha', '222.222.222-22', 'fernanda.r@aluno.com', 'Manutenção Eletromecânica', 'cursando'],
        ['Lucas Carvalho', '333.333.333-33', 'lucas.c@aluno.com', 'Gestão da Qualidade', 'cursando'],
        ['Bianca Torres', '444.444.444-44', 'bianca.t@aluno.com', 'Segurança do Trabalho', 'cursando']
    ];
    $aprIds = [];
    foreach ($aprendizes as $a) {
        $stmtApr->execute($a);
        $aprIds[] = $pdo->lastInsertId();
    }
    
    $anaId = $aprIds[0];
    
    // ===== INSERIR DADOS: CONTRATOS =====
    $stmtContrato = $pdo->prepare("INSERT INTO contratos (aprendiz_id, empresa_id, data_inicio, data_fim, valor) VALUES (?, ?, ?, ?, ?)");
    foreach ($aprIds as $idAluno) {
        // Todos para a Vale por enquanto, com duração de 1 ano
        $stmtContrato->execute([$idAluno, $valeId, '2025-01-10', '2026-01-10', 850.00]);
    }
    
    // ===== INSERIR DADOS: FREQUÊNCIA =====
    $stmtFreq = $pdo->prepare("INSERT INTO frequencia (aprendiz_id, data_registro, status) VALUES (?, ?, ?)");
    $diasMaio = ['2026-05-02', '2026-05-04', '2026-05-09', '2026-05-11', '2026-05-16', '2026-05-18'];
    foreach ($diasMaio as $dia) {
        $stmtFreq->execute([$anaId, $dia, 'presente']);
    }
    
    // ===== INSERIR DADOS: NOTAS =====
    $stmtNota = $pdo->prepare("INSERT INTO notas (aprendiz_id, atividade, valor_nota, data_registro) VALUES (?, ?, ?, ?)");
    $notasAna = [
        ['Manutenção Eletromecânica I', 8.5, '2026-04-15'],
        ['Gestão da Qualidade', 9.0, '2026-04-20'],
        ['Segurança do Trabalho', 7.5, '2026-05-10']
    ];
    foreach ($notasAna as $n) {
        $stmtNota->execute([$anaId, $n[0], $n[1], $n[2]]);
    }

    // ===== INSERIR DADOS: FINANCEIRO =====
    $stmtFin = $pdo->prepare("INSERT INTO financeiro (empresa_id, competencia, valor, status, data_vencimento) VALUES (?, ?, ?, ?, ?)");
    // 4 alunos * 850 = 3400 para a Vale
    $stmtFin->execute([$valeId, '2026-04', 3400.00, 'pago', '2026-04-10']);
    $stmtFin->execute([$valeId, '2026-05', 3400.00, 'pendente', '2026-05-10']);

    // ===== INSERIR DADOS: LOGS DE AUDITORIA =====
    $stmtLog = $pdo->prepare("INSERT INTO logs_auditoria (usuario_id, acao, descricao) VALUES (?, ?, ?)");
    $stmtLog->execute([$userAdminId, 'RESEED_DB', 'Banco de dados recriado e populado com sementes padrão.']);
    
    echo "Dados inseridos com sucesso!\n";
    
} catch (PDOException $e) {
    die("Erro: " . $e->getMessage());
}
?>
