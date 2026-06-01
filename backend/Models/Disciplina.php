<?php
namespace Models;

use Core\Connect;
use PDO;

class Disciplina {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connect::getInstance();
    }

    public function listar(): array {
        $sql = "
            SELECT d.*, c.nome AS curso_nome
            FROM disciplinas d
            JOIN cursos c ON c.id = d.curso_id
            ORDER BY c.nome ASC, d.nome ASC
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function buscarPorId(int $id): array|false {
        $stmt = $this->pdo->prepare("SELECT * FROM disciplinas WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function criar(array $dados): int {
        $stmt = $this->pdo->prepare("
            INSERT INTO disciplinas (nome, curso_id, carga_horaria)
            VALUES (:nome, :curso_id, :carga_horaria)
        ");
        $stmt->execute([
            'nome' => $dados['nome'],
            'curso_id' => $dados['curso_id'],
            'carga_horaria' => $dados['carga_horaria'] ?? 0
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    public function atualizar(int $id, array $dados): bool {
        $stmt = $this->pdo->prepare("
            UPDATE disciplinas SET
                nome = :nome,
                curso_id = :curso_id,
                carga_horaria = :carga_horaria
            WHERE id = :id
        ");
        return $stmt->execute([
            'id' => $id,
            'nome' => $dados['nome'],
            'curso_id' => $dados['curso_id'],
            'carga_horaria' => $dados['carga_horaria'] ?? 0
        ]);
    }

    public function excluir(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM disciplinas WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
