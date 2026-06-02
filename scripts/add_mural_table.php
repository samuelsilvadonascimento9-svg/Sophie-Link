<?php
require_once __DIR__ . '/../includes/db.php';

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS mural_avisos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(200) NOT NULL,
            conteudo TEXT NOT NULL,
            tipo ENUM('info', 'alerta', 'urgente', 'evento') DEFAULT 'info',
            data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            autor_id INT NULL,
            FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    
    // Insert some mock data if empty
    $count = $pdo->query("SELECT COUNT(*) FROM mural_avisos")->fetchColumn();
    if ($count == 0) {
        $pdo->exec("
            INSERT INTO mural_avisos (titulo, conteudo, tipo, data_publicacao) VALUES 
            ('Abertura das Rematrículas', 'O período de rematrícula para o próximo semestre começará no dia 15 de Junho. Fique atento aos prazos para não perder sua vaga.', 'info', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
            ('Palestra: O Futuro da TI', 'Nesta sexta-feira às 19h teremos uma palestra exclusiva no auditório principal com especialistas do mercado de tecnologia. Não perca!', 'evento', DATE_SUB(NOW(), INTERVAL 1 DAY)),
            ('Feriado Municipal', 'Informamos que não haverá aula na próxima quinta-feira devido ao feriado municipal. As atividades retornarão normalmente na sexta-feira.', 'urgente', DATE_SUB(NOW(), INTERVAL 3 DAY))
        ");
    }
    
    echo "Tabela mural_avisos criada e populada com sucesso.\n";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}
