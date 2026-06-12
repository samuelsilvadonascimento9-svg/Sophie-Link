<?php
namespace Models;

use Core\Model;

class Frequencia extends Model {
    protected string $table = 'frequencia';

    public function listarPorAluno(int $alunoId): array {
        $stmt = $this->pdo->prepare("
            SELECT f.*, d.nome AS disciplina_nome
            FROM frequencia f
            LEFT JOIN disciplinas d ON d.id = f.disciplina_id
            WHERE f.aprendiz_id = :aluno_id
            ORDER BY f.data_registro DESC
        ");
        $stmt->execute(['aluno_id' => $alunoId]);
        return $stmt->fetchAll();
    }

    public function listarBoletimPorAluno(int $alunoId): array {
        $stmt = $this->pdo->prepare("
            SELECT f.status, d.nome AS disciplina_nome, f.disciplina_id
            FROM frequencia f
            LEFT JOIN disciplinas d ON d.id = f.disciplina_id
            WHERE f.aprendiz_id = :aluno_id
            ORDER BY f.disciplina_id, f.data_registro ASC
        ");
        $stmt->execute(['aluno_id' => $alunoId]);
        return $stmt->fetchAll();
    }

    public function registrar(array $dados): int {
        return $this->insert($dados);
    }
    
    public function atualizarJustificativa(int $id, string $status): void {
        $this->update(['status_justificativa' => $status], ['id' => $id]);
    }
}
