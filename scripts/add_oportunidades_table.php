<?php
require_once __DIR__ . '/../includes/db.php';

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS oportunidades (
            id INT AUTO_INCREMENT PRIMARY KEY,
            empresa_id INT NULL,
            empresa_nome VARCHAR(150) NULL, -- Fallback case there is no specific company ID
            titulo VARCHAR(200) NOT NULL,
            tipo ENUM('estagio', 'emprego', 'aprendiz') NOT NULL,
            descricao TEXT NOT NULL,
            modalidade ENUM('remoto', 'presencial', 'hibrido') DEFAULT 'presencial',
            bolsa DECIMAL(10,2) NULL,
            status ENUM('aberta', 'fechada') DEFAULT 'aberta',
            data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS candidaturas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            oportunidade_id INT NOT NULL,
            aprendiz_id INT NOT NULL,
            data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('analise', 'entrevista', 'aprovado', 'reprovado') DEFAULT 'analise',
            UNIQUE KEY unique_candidatura (oportunidade_id, aprendiz_id),
            FOREIGN KEY (oportunidade_id) REFERENCES oportunidades(id) ON DELETE CASCADE,
            FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    
    // Insert some mock data if empty
    $count = $pdo->query("SELECT COUNT(*) FROM oportunidades")->fetchColumn();
    if ($count == 0) {
        $pdo->exec("
            INSERT INTO oportunidades (empresa_nome, titulo, tipo, descricao, modalidade, bolsa) VALUES 
            ('Tech Solutions LTDA', 'Estágio em Suporte TI', 'estagio', 'Atuação em suporte técnico N1, manutenção de computadores e atendimento aos usuários da rede corporativa.', 'hibrido', 1200.00),
            ('Grupo Alfa', 'Auxiliar Administrativo', 'aprendiz', 'Auxílio em rotinas de departamento pessoal, arquivo de documentos e controle de planilhas.', 'presencial', 800.00),
            ('Inova Web', 'Dev Front-end Jr.', 'emprego', 'Desenvolvimento de interfaces web com HTML, CSS e JavaScript básico. Vaga para quem acabou de se formar.', 'remoto', 2500.00)
        ");
    }
    
    echo "Tabelas de oportunidades criadas e populadas com sucesso.\n";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
