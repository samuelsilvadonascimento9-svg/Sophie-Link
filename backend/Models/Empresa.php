<?php
namespace Models;

use Core\Connect;
use PDO;

class Empresa {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connect::getInstance();
    }

    /** Lista todas as empresas com contagem de aprendizes */
    public function listar(string $busca = '', string $status = ''): array {
        $sql = "
            SELECT e.*,
                   COUNT(a.id) AS total_aprendizes
            FROM empresas e
            LEFT JOIN aprendizes a ON a.empresa_id = e.id
            WHERE 1=1
        ";
        $params = [];

        if ($busca) {
            $sql .= " AND (e.nome LIKE :busca OR e.cnpj LIKE :busca OR e.responsavel LIKE :busca)";
            $params['busca'] = "%{$busca}%";
        }
        if ($status) {
            $sql .= " AND e.status = :status";
            $params['status'] = $status;
        }

        $sql .= " GROUP BY e.id ORDER BY e.nome ASC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /** Busca uma empresa por ID */
    public function buscarPorId(int $id): array|false {
        $stmt = $this->pdo->prepare("SELECT * FROM empresas WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    /** Cria uma nova empresa */
    public function criar(array $dados): int {
        $stmt = $this->pdo->prepare("
            INSERT INTO empresas (nome, cnpj, responsavel, telefone, email, endereco, status, observacoes)
            VALUES (:nome, :cnpj, :responsavel, :telefone, :email, :endereco, :status, :observacoes)
        ");
        $stmt->execute([
            'nome'        => $dados['nome'],
            'cnpj'        => $dados['cnpj'] ?? '',
            'responsavel' => $dados['responsavel'] ?? '',
            'telefone'    => $dados['telefone'] ?? '',
            'email'       => $dados['email'] ?? '',
            'endereco'    => $dados['endereco'] ?? '',
            'status'      => $dados['status'] ?? 'ativa',
            'observacoes' => $dados['observacoes'] ?? '',
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    /** Atualiza uma empresa existente */
    public function atualizar(int $id, array $dados): bool {
        $stmt = $this->pdo->prepare("
            UPDATE empresas SET
                nome        = :nome,
                cnpj        = :cnpj,
                responsavel = :responsavel,
                telefone    = :telefone,
                email       = :email,
                endereco    = :endereco,
                status      = :status,
                observacoes = :observacoes
            WHERE id = :id
        ");
        return $stmt->execute([
            'id'          => $id,
            'nome'        => $dados['nome'],
            'cnpj'        => $dados['cnpj'] ?? '',
            'responsavel' => $dados['responsavel'] ?? '',
            'telefone'    => $dados['telefone'] ?? '',
            'email'       => $dados['email'] ?? '',
            'endereco'    => $dados['endereco'] ?? '',
            'status'      => $dados['status'] ?? 'ativa',
            'observacoes' => $dados['observacoes'] ?? '',
        ]);
    }

    /** Remove uma empresa */
    public function excluir(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM empresas WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
