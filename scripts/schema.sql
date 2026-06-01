CREATE DATABASE IF NOT EXISTS sophie_link CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sophie_link;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nivel ENUM('admin', 'coordenadora', 'professor', 'empresa', 'colaborador', 'aluno') NOT NULL,
    empresa_id INT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY unique_email_nivel (email, nivel)
);

-- Inserindo admin padrão (login: admin, senha: admin)
INSERT INTO usuarios (nome, email, senha, nivel) VALUES 
('Admin', 'admin@sophielink.com.br', '$2y$10$eGfn4vk/q20wKlgzYYpICu4VmeVa6j5v6O3IC9BGkgYLIDib3UoxG', 'admin');

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
