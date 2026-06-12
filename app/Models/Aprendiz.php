<?php
namespace Models;

use Core\Connect;
use PDO;

class Aprendiz extends \Core\Model {
    protected string $table = 'aprendizes';

    /** Lista aprendizes com nome da empresa */
    public function listar(string $busca = '', int $empresaId = 0, string $situacao = ''): array {
        $sql = "
            SELECT a.*, e.nome AS empresa_nome
            FROM aprendizes a
            LEFT JOIN empresas e ON e.id = a.empresa_id
            WHERE 1=1
        ";
        $params = [];

        if ($busca) {
            $sql .= " AND (a.nome LIKE :busca OR a.cpf LIKE :busca OR a.email LIKE :busca)";
            $params['busca'] = "%{$busca}%";
        }
        if ($empresaId) {
            $sql .= " AND a.empresa_id = :empresa_id";
            $params['empresa_id'] = $empresaId;
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
            SELECT a.*, e.nome AS empresa_nome
            FROM aprendizes a
            LEFT JOIN empresas e ON e.id = a.empresa_id
            WHERE a.id = :id LIMIT 1
        ");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    /** Cria um novo aprendiz */
    public function criar(array $d): int {
        $stmt = $this->pdo->prepare("
            INSERT INTO aprendizes
                (nome, cpf, rg, data_nascimento, telefone, email, endereco,
                 nome_mae, nome_pai, empresa_id, curso, data_entrada, data_termino,
                 status_contrato, situacao_aluno, observacoes)
            VALUES
                (:nome, :cpf, :rg, :data_nascimento, :telefone, :email, :endereco,
                 :nome_mae, :nome_pai, :empresa_id, :curso, :data_entrada, :data_termino,
                 :status_contrato, :situacao_aluno, :observacoes)
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
            'empresa_id'      => $d['empresa_id'] ?: null,
            'curso'           => $d['curso'] ?? '',
            'data_entrada'    => $d['data_entrada'] ?: null,
            'data_termino'    => $d['data_termino'] ?: null,
            'status_contrato' => $d['status_contrato'] ?? 'ativo',
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
                empresa_id      = :empresa_id,
                curso           = :curso,
                data_entrada    = :data_entrada,
                data_termino    = :data_termino,
                status_contrato = :status_contrato,
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
            'empresa_id'      => $d['empresa_id'] ?: null,
            'curso'           => $d['curso'] ?? '',
            'data_entrada'    => $d['data_entrada'] ?: null,
            'data_termino'    => $d['data_termino'] ?: null,
            'status_contrato' => $d['status_contrato'] ?? 'ativo',
            'situacao_aluno'  => $d['situacao_aluno'] ?? 'cursando',
            'observacoes'     => $d['observacoes'] ?? '',
        ]);
    }

    /** Exclui aprendiz */
    public function excluir(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM aprendizes WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
