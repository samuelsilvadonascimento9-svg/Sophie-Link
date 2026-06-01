<?php
namespace Models;

use Core\Connect;
use PDO;

class Aprendiz {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connect::getInstance();
    }

    /** Lista aprendizes com nome da turma e empresa atual (se houver contrato ativo) */
    public function listar(string $busca = '', int $turmaId = 0, string $situacao = ''): array {
        $sql = "
            SELECT a.*, t.nome AS turma_nome, e.nome AS empresa_nome
            FROM aprendizes a
            LEFT JOIN turmas t ON t.id = a.turma_id
            LEFT JOIN contratos c ON c.aprendiz_id = a.id AND c.status = 'ativo'
            LEFT JOIN empresas e ON e.id = c.empresa_id
            WHERE a.deleted_at IS NULL
        ";
        $params = [];

        if ($busca) {
            $sql .= " AND (a.nome LIKE :busca OR a.cpf LIKE :busca OR a.email LIKE :busca)";
            $params['busca'] = "%{$busca}%";
        }
        if ($turmaId) {
            $sql .= " AND a.turma_id = :turma_id";
            $params['turma_id'] = $turmaId;
        }
        if ($situacao) {
            $sql .= " AND a.situacao_aluno = :situacao";
            $params['situacao'] = $situacao;
        }

        $sql .= " ORDER BY a.nome ASC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /** Busca aprendiz por ID */
    public function buscarPorId(int $id): array|false {
        $stmt = $this->pdo->prepare("
            SELECT a.*, t.nome AS turma_nome, e.nome AS empresa_nome, c.id AS contrato_id
            FROM aprendizes a
            LEFT JOIN turmas t ON t.id = a.turma_id
            LEFT JOIN contratos c ON c.aprendiz_id = a.id AND c.status = 'ativo'
            LEFT JOIN empresas e ON e.id = c.empresa_id
            WHERE a.id = :id AND a.deleted_at IS NULL LIMIT 1
        ");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    /** Cria um novo aprendiz */
    public function criar(array $d): int {
        $stmt = $this->pdo->prepare("
            INSERT INTO aprendizes
                (nome, cpf, rg, data_nascimento, telefone, email, endereco,
                 nome_mae, nome_pai, turma_id, tipo, situacao_aluno, observacoes)
            VALUES
                (:nome, :cpf, :rg, :data_nascimento, :telefone, :email, :endereco,
                 :nome_mae, :nome_pai, :turma_id, :tipo, :situacao_aluno, :observacoes)
        ");
        $stmt->execute([
            'nome'            => $d['nome'],
            'cpf'             => $d['cpf'] ?? '',
            'rg'              => $d['rg'] ?? '',
            'data_nascimento' => $d['data_nascimento'] ?: null,
            'telefone'        => $d['telefone'] ?? '',
            'email'           => $d['email'] ?? '',
            'endereco'        => $d['endereco'] ?? '',
            'nome_mae'        => $d['nome_mae'] ?? '',
            'nome_pai'        => $d['nome_pai'] ?? '',
            'turma_id'        => $d['turma_id'] ?: null,
            'tipo'            => $d['tipo'] ?? 'aprendiz',
            'situacao_aluno'  => $d['situacao_aluno'] ?? 'cursando',
            'observacoes'     => $d['observacoes'] ?? '',
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    /** Atualiza aprendiz */
    public function atualizar(int $id, array $d): bool {
        $stmt = $this->pdo->prepare("
            UPDATE aprendizes SET
                nome            = :nome,
                cpf             = :cpf,
                rg              = :rg,
                data_nascimento = :data_nascimento,
                telefone        = :telefone,
                email           = :email,
                endereco        = :endereco,
                nome_mae        = :nome_mae,
                nome_pai        = :nome_pai,
                turma_id        = :turma_id,
                tipo            = :tipo,
                situacao_aluno  = :situacao_aluno,
                observacoes     = :observacoes
            WHERE id = :id
        ");
        return $stmt->execute([
            'id'              => $id,
            'nome'            => $d['nome'],
            'cpf'             => $d['cpf'] ?? '',
            'rg'              => $d['rg'] ?? '',
            'data_nascimento' => $d['data_nascimento'] ?: null,
            'telefone'        => $d['telefone'] ?? '',
            'email'           => $d['email'] ?? '',
            'endereco'        => $d['endereco'] ?? '',
            'nome_mae'        => $d['nome_mae'] ?? '',
            'nome_pai'        => $d['nome_pai'] ?? '',
            'turma_id'        => $d['turma_id'] ?: null,
            'tipo'            => $d['tipo'] ?? 'aprendiz',
            'situacao_aluno'  => $d['situacao_aluno'] ?? 'cursando',
            'observacoes'     => $d['observacoes'] ?? '',
        ]);
    }

    /** Exclui aprendiz logicamente */
    public function excluir(int $id): bool {
        $stmt = $this->pdo->prepare("UPDATE aprendizes SET deleted_at = NOW() WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
