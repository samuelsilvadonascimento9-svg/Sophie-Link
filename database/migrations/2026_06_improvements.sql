-- Migration: Melhorias Sophie Link
-- Execute no banco de dados: sophie_link

-- Tabela para tokens de reset de senha (com expiração)
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expira_em TIMESTAMP NOT NULL,
    usado TINYINT(1) DEFAULT 0,
    INDEX idx_token (token),
    INDEX idx_email_nivel (email, nivel)
);

-- Tabela de notificações do AVA para o aluno
CREATE TABLE IF NOT EXISTS ava_notificacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensagem TEXT,
    tipo ENUM('info', 'aviso', 'atividade', 'nota') DEFAULT 'info',
    lida TINYINT(1) DEFAULT 0,
    link VARCHAR(300) NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
    INDEX idx_aprendiz_lida (aprendiz_id, lida)
);

-- Adicionar coluna reset_token na tabela de usuarios (se não existir)
ALTER TABLE usuarios 
    ADD COLUMN IF NOT EXISTS reset_token VARCHAR(64) NULL DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP NULL DEFAULT NULL;
