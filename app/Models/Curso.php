<?php
namespace Models;

use Core\Connect;
use PDO;

class Curso {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connect::getInstance();
    }

    public function listar(): array {
        $stmt = $this->pdo->query("SELECT * FROM cursos ORDER BY nome ASC");
        return $stmt->fetchAll();
    }

    public function buscarPorId(int $id): array|false {
        $stmt = $this->pdo->prepare("SELECT * FROM cursos WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function criar(array $dados): int {
        $stmt = $this->pdo->prepare("
            INSERT INTO cursos (nome, descricao, carga_horaria)
            VALUES (:nome, :descricao, :carga_horaria)
        ");
        $stmt->execute([
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'] ?? '',
            'carga_horaria' => $dados['carga_horaria'] ?? 0
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    public function atualizar(int $id, array $dados): bool {
        $stmt = $this->pdo->prepare("
            UPDATE cursos SET
                nome = :nome,
                descricao = :descricao,
                carga_horaria = :carga_horaria
            WHERE id = :id
        ");
        return $stmt->execute([
            'id' => $id,
            'nome' => $dados['nome'],
            'descricao' => $dados['descricao'] ?? '',
            'carga_horaria' => $dados['carga_horaria'] ?? 0
        ]);
    }

    public function excluir(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM cursos WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
