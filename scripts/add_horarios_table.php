<?php
require_once __DIR__ . '/../includes/db.php';

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS horarios_aulas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            turma_id INT NOT NULL,
            disciplina_id INT NOT NULL,
            dia_semana ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado') NOT NULL,
            hora_inicio TIME NOT NULL,
            hora_fim TIME NOT NULL,
            professor_nome VARCHAR(100) NULL,
            FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
            FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Insert mock schedule for the first class (turma_id = 1) assuming it exists
    $count = $pdo->query("SELECT COUNT(*) FROM horarios_aulas")->fetchColumn();
    if ($count == 0) {
        // Obter uma turma válida para vincular (idealmente a mesma do admin/aluno)
        $turma = $pdo->query("SELECT id FROM turmas LIMIT 1")->fetch();
        if ($turma) {
            $t_id = $turma['id'];
            // Obter algumas disciplinas do curso desta turma
            $disciplinas = $pdo->query("SELECT id, nome FROM disciplinas LIMIT 3")->fetchAll();
            if (count($disciplinas) >= 2) {
                $d1 = $disciplinas[0]['id'];
                $d2 = $disciplinas[1]['id'];
                
                $stmt = $pdo->prepare("
                    INSERT INTO horarios_aulas (turma_id, disciplina_id, dia_semana, hora_inicio, hora_fim, professor_nome) VALUES 
                    (?, ?, 'Segunda', '19:00:00', '22:00:00', 'Prof. Carlos Silva'),
                    (?, ?, 'Quarta', '19:00:00', '22:00:00', 'Profa. Maria Oliveira'),
                    (?, ?, 'Sexta', '19:00:00', '20:30:00', 'Prof. Roberto Santos')
                ");
                $stmt->execute([$t_id, $d1, $t_id, $d2, $t_id, $d1]);
            }
        }
    }
    
    echo "Tabela horarios_aulas criada com sucesso.\n";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
