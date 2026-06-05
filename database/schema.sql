CREATE DATABASE IF NOT EXISTS sophie_link CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sophie_link;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nivel ENUM('admin', 'coordenadora', 'professor', 'empresa', 'colaborador', 'aluno') NOT NULL,
    empresa_id INT NULL,
    reset_token VARCHAR(64) NULL DEFAULT NULL,
    reset_token_expiry TIMESTAMP NULL DEFAULT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY unique_email_nivel (email, nivel)
);

-- Inserindo usuários padrão
INSERT INTO usuarios (nome, email, senha, nivel) VALUES 
('Admin', 'admin', '$2y$10$eGfn4vk/q20wKlgzYYpICu4VmeVa6j5v6O3IC9BGkgYLIDib3UoxG', 'admin'),
('Aluno Teste', 'aluno', '$2y$10$I4Ubkn2OGCvvPFVKdUHLr.pLP/HrNdfLujaw1OzHiYkmCAXTApuhK', 'aluno'),
('Professor Teste', 'professor', '$2y$10$xI0qHfnwaeJ1NxI8Bd.ZU.ImIh/7W5rFAOYmxCOQLy4CTuJ.HEJD6', 'professor'),
('Colaborador Teste', 'colaborador', '$2y$10$I4Ubkn2OGCvvPFVKdUHLr.pLP/HrNdfLujaw1OzHiYkmCAXTApuhK', 'colaborador'),
('Empresa Teste', 'empresa', '$2y$10$I4Ubkn2OGCvvPFVKdUHLr.pLP/HrNdfLujaw1OzHiYkmCAXTApuhK', 'empresa');

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    responsavel VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT,
    status ENUM('ativa', 'inativa') DEFAULT 'ativa',
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    turno ENUM('Manhã', 'Tarde', 'Noite') NOT NULL,
    ano_semestre VARCHAR(10) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso_id INT NOT NULL,
    carga_horaria INT,
    tipo VARCHAR(50) NULL,
    imagem_capa VARCHAR(255) NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

CREATE TABLE professor_disciplina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    turma_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

CREATE TABLE aprendizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    rg VARCHAR(20),
    data_nascimento DATE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT,
    nome_mae VARCHAR(150),
    nome_pai VARCHAR(150),
    turma_id INT NULL,
    tipo ENUM('normal', 'aprendiz') DEFAULT 'aprendiz',
    situacao_aluno ENUM('cursando', 'formado', 'evadido') DEFAULT 'cursando',
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE SET NULL
);

CREATE TABLE contratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT NOT NULL,
    empresa_id INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status ENUM('ativo', 'encerrado', 'pendente') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

CREATE TABLE frequencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT NOT NULL,
    disciplina_id INT NULL,
    data_registro DATE NOT NULL,
    horario_entrada TIME NULL,
    horario_saida TIME NULL,
    status ENUM('presente', 'falta', 'justificada') NOT NULL,
    justificativa TEXT,
    registrado_por INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL,
    FOREIGN KEY (registrado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT NOT NULL,
    disciplina_id INT NULL,
    atividade VARCHAR(100) NOT NULL,
    valor_nota DECIMAL(5,2) NOT NULL,
    data_registro DATE NOT NULL,
    registrado_por INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE SET NULL,
    FOREIGN KEY (registrado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE financeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    competencia VARCHAR(7) NOT NULL, -- ex: '2026-05'
    valor DECIMAL(10,2) NOT NULL,
    status ENUM('pendente', 'pago', 'atrasado') DEFAULT 'pendente',
    data_vencimento DATE NOT NULL,
    data_pagamento DATE NULL,
    observacoes TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

CREATE TABLE logs_auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    acao VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabelas para tokens de reset de senha (com expiração)
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expira_em TIMESTAMP NULL DEFAULT NULL,
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

-- Tabelas para o Chatbot
CREATE TABLE IF NOT EXISTS chatbot_options (
  id INT(11) NOT NULL AUTO_INCREMENT,
  option_key VARCHAR(50) NOT NULL,
  response_text TEXT NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS chat_conversations (
  id INT(11) NOT NULL AUTO_INCREMENT,
  visitor_name VARCHAR(100) DEFAULT NULL,
  visitor_phone VARCHAR(30) DEFAULT NULL,
  visitor_email VARCHAR(100) DEFAULT NULL,
  chatbot_type VARCHAR(20) DEFAULT 'manual',
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS chat_messages (
  id INT(11) NOT NULL AUTO_INCREMENT,
  conversation_id INT(11) NOT NULL,
  sender VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  CONSTRAINT chat_messages_ibfk_1 FOREIGN KEY (conversation_id) REFERENCES chat_conversations (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabelas do AVA (Materiais e Entregas)
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

-- Tabelas do AVA (Simulados, Questões e Respostas)
CREATE TABLE IF NOT EXISTS ava_simulados (
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
);

CREATE TABLE IF NOT EXISTS ava_questoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    simulado_id INT NOT NULL,
    enunciado TEXT NOT NULL,
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    alternativa_correta ENUM('A', 'B', 'C', 'D') NOT NULL,
    FOREIGN KEY (simulado_id) REFERENCES ava_simulados(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ava_respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questao_id INT NOT NULL,
    aprendiz_id INT NOT NULL,
    alternativa_marcada ENUM('A', 'B', 'C', 'D') NOT NULL,
    correta BOOLEAN NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (questao_id) REFERENCES ava_questoes(id) ON DELETE CASCADE,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE,
    UNIQUE KEY(questao_id, aprendiz_id)
);

CREATE TABLE IF NOT EXISTS solicitacoes_documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aprendiz_id INT NOT NULL,
    tipo_documento ENUM('matricula', 'frequencia', 'historico') NOT NULL,
    status ENUM('pendente', 'concluido') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aprendiz_id) REFERENCES aprendizes(id) ON DELETE CASCADE
);
