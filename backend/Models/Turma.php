<?php
namespace Models;

use Core\Connect;
use PDO;

class Turma {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connect::getInstance();
    }

    public function listar(): array {
        $sql = "
            SELECT t.*, c.nome AS curso_nome,
                   COUNT(a.id) AS total_aprendizes
            FROM turmas t
            JOIN cursos c ON c.id = t.curso_id
            LEFT JOIN aprendizes a ON a.turma_id = t.id AND a.deleted_at IS NULL
            GROUP BY t.id
            ORDER BY t.nome ASC
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function buscarPorId(int $id): array|false {
        $stmt = $this->pdo->prepare("SELECT * FROM turmas WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function criar(array $dados): int {
        $stmt = $this->pdo->prepare("
            INSERT INTO turmas (curso_id, nome, turno, ano_semestre)
            VALUES (:curso_id, :nome, :turno, :ano_semestre)
        ");
        $stmt->execute([
            'curso_id' => $dados['curso_id'],
            'nome' => $dados['nome'],
            'turno' => $dados['turno'],
            'ano_semestre' => $dados['ano_semestre']
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    public function atualizar(int $id, array $dados): bool {
        $stmt = $this->pdo->prepare("
            UPDATE turmas SET
                curso_id = :curso_id,
                nome = :nome,
                turno = :turno,
                ano_semestre = :ano_semestre
            WHERE id = :id
        ");
        return $stmt->execute([
            'id' => $id,
            'curso_id' => $dados['curso_id'],
            'nome' => $dados['nome'],
            'turno' => $dados['turno'],
            'ano_semestre' => $dados['ano_semestre']
        ]);
    }

    public function excluir(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM turmas WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
