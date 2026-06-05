<?php
// C:\xampp\htdocs\devweb\Sophie-Link\database\migrations\create_ava_simulados.php
require_once __DIR__ . '/../../includes/db.php';

try {
    // Tabela de Simulados
    $pdo->exec("CREATE TABLE IF NOT EXISTS ava_simulados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        disciplina_id INT NOT NULL,
        turma_id INT NOT NULL,
        professor_id INT NOT NULL,
        gerado_por_ia BOOLEAN DEFAULT FALSE,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
        FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
        FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )");

    // Tabela de Questões
    $pdo->exec("CREATE TABLE IF NOT EXISTS ava_questoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        simulado_id INT NOT NULL,
        enunciado TEXT NOT NULL,
        alternativa_a TEXT NOT NULL,
        alternativa_b TEXT NOT NULL,
        alternativa_c TEXT NOT NULL,
        alternativa_d TEXT NOT NULL,
        alternativa_correta ENUM('A', 'B', 'C', 'D') NOT NULL,
        FOREIGN KEY (simulado_id) REFERENCES ava_simulados(id) ON DELETE CASCADE
    )");

    // Tabela de Respostas
    $pdo->exec("CREATE TABLE IF NOT EXISTS ava_respostas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        questao_id INT NOT NULL,
        aprendiz_id INT NOT NULL,
        alternativa_marcada ENUM('A', 'B', 'C', 'D') NOT NULL,
        correta BOOLEAN NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (questao_id) REFERENCES ava_questoes(id) ON DELETE CASCADE,
        FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
        UNIQUE KEY(questao_id, aprendiz_id)
    )");

    echo "Migration executada com sucesso: tabelas de simulados criadas.\n";
} catch (PDOException $e) {
    die("Erro na migration: " . $e->getMessage());
}
