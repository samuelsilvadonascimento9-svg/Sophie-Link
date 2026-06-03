<?php
/**
 * setup_ava_tables.php
 * Cria as tabelas do AVA (materiais, entregas de atividades).
 * Execute UMA VEZ: localhost/devweb/Sophie-Link/scripts/setup_ava_tables.php
 */
require_once __DIR__ . '/../includes/db.php';
/** @var PDO $pdo */

$sqls = [];

// ─── 1. AVA_MATERIAIS: PDFs, Atividades e Avisos postados pelos professores ───
$sqls['ava_materiais'] = "
CREATE TABLE IF NOT EXISTS ava_materiais (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    disciplina_id INT NULL,
    turma_id      INT NULL,
    professor_id  INT NOT NULL,
    tipo          ENUM('pdf','atividade','aviso') NOT NULL DEFAULT 'pdf',
    titulo        VARCHAR(200) NOT NULL,
    descricao     TEXT,
    arquivo_nome  VARCHAR(255) NULL,
    arquivo_path  VARCHAR(500) NULL,
    data_entrega  DATE NULL,
    criado_em     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL,
    FOREIGN KEY (turma_id)      REFERENCES turmas(id)      ON DELETE SET NULL,
    FOREIGN KEY (professor_id)  REFERENCES usuarios(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── 2. AVA_ENTREGAS: Entregas de atividades pelos alunos ──────────────────────
$sqls['ava_entregas'] = "
CREATE TABLE IF NOT EXISTS ava_entregas (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    material_id  INT NOT NULL,
    aprendiz_id  INT NOT NULL,
    arquivo_nome VARCHAR(255) NULL,
    arquivo_path VARCHAR(500) NULL,
    comentario   TEXT NULL,
    nota         DECIMAL(5,2) NULL,
    status       ENUM('pendente','entregue','corrigida') DEFAULT 'entregue',
    criado_em    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_entrega (material_id, aprendiz_id),
    FOREIGN KEY (material_id)  REFERENCES ava_materiais(id) ON DELETE CASCADE,
    FOREIGN KEY (aprendiz_id)  REFERENCES aprendizes(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

$criadas = []; $ja_existiam = []; $erros = [];

foreach ($sqls as $nome => $sql) {
    $check = $pdo->query("SHOW TABLES LIKE '$nome'")->fetchColumn();
    if ($check) { $ja_existiam[] = $nome; continue; }
    try {
        $pdo->exec($sql);
        $criadas[] = $nome;
    } catch (PDOException $e) {
        $erros[] = "$nome: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Setup AVA Tables</title>
<style>body{font-family:Inter,sans-serif;max-width:700px;margin:60px auto;padding:20px;background:#F8FAFC;color:#1E293B;}
.ok{background:#D1FAE5;border:1px solid #6EE7B7;border-radius:8px;padding:12px 16px;margin-bottom:8px;color:#065F46;}
.warn{background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;padding:12px 16px;margin-bottom:8px;color:#92400E;}
.err{background:#FEE2E2;border:1px solid #FCA5A5;border-radius:8px;padding:12px 16px;margin-bottom:8px;color:#991B1B;}
a{display:inline-block;margin-top:1.5rem;background:#0EA5E9;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;}</style>
</head><body>
<h1>⚙️ Setup AVA Tables — Sophie Link</h1>
<?php foreach ($criadas as $t): ?><div class="ok">✅ Tabela <strong><?= $t ?></strong> criada!</div><?php endforeach; ?>
<?php foreach ($ja_existiam as $t): ?><div class="warn">⚠️ Tabela <strong><?= $t ?></strong> já existia (ignorada).</div><?php endforeach; ?>
<?php foreach ($erros as $e): ?><div class="err">❌ <?= htmlspecialchars($e) ?></div><?php endforeach; ?>
<?php if (empty($erros)): ?><div class="ok" style="font-weight:700;margin-top:1rem;">🎉 Tabelas do AVA prontas!</div><?php endif; ?>
<a href="../public/paineis/portal_professor.php">→ Portal do Professor</a>
<a href="../public/paineis/ava.php" style="background:#7C3AED;margin-left:8px;">→ AVA</a>
</body></html>
