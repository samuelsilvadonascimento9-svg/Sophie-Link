<?php
/**
 * setup_missing_tables.php
 * Cria todas as tabelas que faltavam no schema original do Sophie Link.
 * Execute este script UMA VEZ acessando: localhost/devweb/Sophie-Link/scripts/setup_missing_tables.php
 */

require_once __DIR__ . '/../../includes/db.php';
/** @var PDO $pdo */

$tabelas = [];

// ─── 1. MENSAGENS DE CONTATO (formulário da landing page) ─────────────────────
$tabelas['mensagens_contato'] = "
CREATE TABLE IF NOT EXISTS mensagens_contato (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(150) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    telefone   VARCHAR(20),
    mensagem   TEXT NOT NULL,
    lida       TINYINT(1) DEFAULT 0,
    criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── 2. MURAL DE AVISOS ───────────────────────────────────────────────────────
$tabelas['mural_avisos'] = "
CREATE TABLE IF NOT EXISTS mural_avisos (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    titulo           VARCHAR(200) NOT NULL,
    conteudo         TEXT NOT NULL,
    tipo             ENUM('info','evento','urgente','alerta') DEFAULT 'info',
    publicado_por    INT NULL,
    data_publicacao  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publicado_por) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── 3. REQUERIMENTOS (Secretaria Online) ────────────────────────────────────
$tabelas['requerimentos'] = "
CREATE TABLE IF NOT EXISTS requerimentos (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id      INT NOT NULL,
    tipo             VARCHAR(150) NOT NULL,
    observacoes      TEXT,
    protocolo        VARCHAR(20) NOT NULL UNIQUE,
    status           ENUM('pendente','em_andamento','concluido','recusado') DEFAULT 'pendente',
    resposta         TEXT,
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── 4. OPORTUNIDADES (Vagas) ─────────────────────────────────────────────────
$tabelas['oportunidades'] = "
CREATE TABLE IF NOT EXISTS oportunidades (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id       INT NULL,
    empresa_nome     VARCHAR(150),
    titulo           VARCHAR(200) NOT NULL,
    descricao        TEXT,
    tipo             ENUM('estagio','aprendiz','emprego') DEFAULT 'estagio',
    modalidade       ENUM('presencial','remoto','hibrido') DEFAULT 'presencial',
    bolsa            DECIMAL(10,2) NULL,
    status           ENUM('aberta','encerrada') DEFAULT 'aberta',
    data_publicacao  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_encerramento DATE NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── 5. CANDIDATURAS ─────────────────────────────────────────────────────────
$tabelas['candidaturas'] = "
CREATE TABLE IF NOT EXISTS candidaturas (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    oportunidade_id INT NOT NULL,
    aprendiz_id     INT NOT NULL,
    status          ENUM('inscrito','selecionado','reprovado') DEFAULT 'inscrito',
    criado_em       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_candidatura (oportunidade_id, aprendiz_id),
    FOREIGN KEY (oportunidade_id) REFERENCES oportunidades(id) ON DELETE CASCADE,
    FOREIGN KEY (aprendiz_id)    REFERENCES aprendizes(id)    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── 6. HORÁRIOS DE AULAS ────────────────────────────────────────────────────
$tabelas['horarios_aulas'] = "
CREATE TABLE IF NOT EXISTS horarios_aulas (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    turma_id       INT NOT NULL,
    disciplina_id  INT NOT NULL,
    dia_semana     ENUM('Segunda','Terça','Quarta','Quinta','Sexta','Sábado') NOT NULL,
    hora_inicio    TIME NOT NULL,
    hora_fim       TIME NOT NULL,
    sala           VARCHAR(50),
    criado_em      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turma_id)      REFERENCES turmas(id)      ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
";

// ─── EXECUÇÃO ─────────────────────────────────────────────────────────────────

$criadas  = [];
$erros    = [];
$ja_existiam = [];

foreach ($tabelas as $nome => $sql) {
    // Verifica se já existe
    $check = $pdo->query("SHOW TABLES LIKE '$nome'")->fetchColumn();
    if ($check) {
        $ja_existiam[] = $nome;
        continue;
    }
    try {
        $pdo->exec($sql);
        $criadas[] = $nome;
    } catch (PDOException $e) {
        $erros[] = "$nome: " . $e->getMessage();
    }
}

// ─── SEED: Dados de exemplo no mural ─────────────────────────────────────────
if (in_array('mural_avisos', $criadas)) {
    try {
        $pdo->exec("INSERT INTO mural_avisos (titulo, conteudo, tipo) VALUES
            ('Folha de Ponto Semanal', 'Lembre-se de assinar a folha de ponto na empresa todas as semanas. Faltas não justificadas impactam sua frequência escolar.', 'alerta'),
            ('Reposição de Aula — 03/06', 'A aula do dia 22/05 (Eletromecânica I) foi reagendada para terça-feira, 03/06, das 14h às 17h30, no Laboratório 2. Presença obrigatória.', 'evento'),
            ('Avaliação Bimestral — 14/06', 'A prova bimestral dos módulos 1 e 2 acontecerá no dia 14/06 (segunda-feira), das 08h às 12h, no Auditório Sophie Link.', 'urgente')
        ");
    } catch (PDOException $e) {
        // ignora se já existir conteúdo
    }
}

// ─── SAÍDA HTML ───────────────────────────────────────────────────────────────
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Setup — Tabelas Sophie Link</title>
    <style>
        body { font-family: 'Inter', sans-serif; max-width: 700px; margin: 60px auto; padding: 20px; background: #F8FAFC; color: #1E293B; }
        h1 { font-size: 1.5rem; margin-bottom: 1.5rem; }
        .ok  { background: #D1FAE5; border: 1px solid #6EE7B7; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; color: #065F46; }
        .warn{ background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; color: #92400E; }
        .err { background: #FEE2E2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; color: #991B1B; }
        a { display: inline-block; margin-top: 1.5rem; background: #0EA5E9; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    </style>
</head>
<body>
    <h1>⚙️ Setup de Tabelas — Sophie Link</h1>

    <?php foreach ($criadas as $t): ?>
        <div class="ok">✅ Tabela <strong><?= $t ?></strong> criada com sucesso!</div>
    <?php endforeach; ?>

    <?php foreach ($ja_existiam as $t): ?>
        <div class="warn">⚠️ Tabela <strong><?= $t ?></strong> já existe (ignorada).</div>
    <?php endforeach; ?>

    <?php foreach ($erros as $err): ?>
        <div class="err">❌ Erro: <?= htmlspecialchars($err) ?></div>
    <?php endforeach; ?>

    <?php if (empty($erros)): ?>
        <div class="ok" style="margin-top:1rem; font-weight:700;">🎉 Tudo certo! O banco está pronto.</div>
    <?php endif; ?>

    <a href="../public/index.php">← Voltar ao site</a>
</body>
</html>
