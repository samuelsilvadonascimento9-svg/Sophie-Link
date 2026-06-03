<?php
require 'app/Core/Autoloader.php';
require 'includes/db.php';

$sql = "
CREATE TABLE IF NOT EXISTS ava_materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    disciplina_id INT NULL,
    turma_id INT NULL,
    professor_id INT NULL,
    tipo ENUM('apresentacao','pdf','atividade','avaliacao','aviso') NOT NULL DEFAULT 'pdf',
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NULL,
    arquivo_nome VARCHAR(255) NULL,
    arquivo_path VARCHAR(500) NULL,
    data_entrega DATE NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE SET NULL,
    FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ava_entregas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    material_id INT NOT NULL,
    aprendiz_id INT NOT NULL,
    arquivo_nome VARCHAR(255) NULL,
    arquivo_path VARCHAR(500) NULL,
    comentario TEXT NULL,
    status ENUM('entregue','corrigida','reprovada') DEFAULT 'entregue',
    nota DECIMAL(5,2) NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (material_id) REFERENCES ava_materiais(id) ON DELETE CASCADE,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

try {
    $pdo->exec($sql);
    echo "Tabelas criadas com sucesso!\n";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
