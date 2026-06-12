<?php
namespace Models;

use Core\Model;

class Nota extends Model {
    protected string $table = 'notas';

    public function listarPorAluno(int $alunoId): array {
        $stmt = $this->pdo->prepare("
            SELECT n.*, d.nome AS disciplina_nome
            FROM notas n
            LEFT JOIN disciplinas d ON d.id = n.disciplina_id
            WHERE n.aprendiz_id = :aluno_id
            ORDER BY n.data_registro DESC
        ");
        $stmt->execute(['aluno_id' => $alunoId]);
        return $stmt->fetchAll();
    }

    public function listarBoletimPorAluno(int $alunoId): array {
        $stmt = $this->pdo->prepare("
            SELECT n.valor_nota, d.nome AS disciplina_nome, n.disciplina_id,
                   (SELECT COUNT(f2.id) FROM frequencia f2 WHERE f2.aprendiz_id = n.aprendiz_id AND f2.disciplina_id = n.disciplina_id AND f2.status = 'falta') AS total_faltas
            FROM notas n
            LEFT JOIN disciplinas d ON d.id = n.disciplina_id
            WHERE n.aprendiz_id = :aluno_id
            ORDER BY n.disciplina_id, n.data_registro ASC
        ");
        $stmt->execute(['aluno_id' => $alunoId]);
        return $stmt->fetchAll();
    }

    public function registrar(array $dados): int {
        return $this->insert($dados);
    }
}
