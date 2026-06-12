<?php
namespace Models;

use Core\Model;

class Material extends Model {
    protected string $table = 'ava_materiais';

    public function listarPorTurmaEDisciplina(int $turmaId, int $disciplinaId): array {
        $stmt = $this->pdo->prepare("
            SELECT * FROM ava_materiais
            WHERE (turma_id = :turma_id OR turma_id IS NULL)
              AND (disciplina_id = :disciplina_id OR disciplina_id IS NULL)
            ORDER BY criado_em DESC
        ");
        $stmt->execute([
            'turma_id' => $turmaId,
            'disciplina_id' => $disciplinaId
        ]);
        return $stmt->fetchAll();
    }
    
    public function listarPorTurma(int $turmaId): array {
        $stmt = $this->pdo->prepare("
            SELECT * FROM ava_materiais
            WHERE turma_id = :turma_id OR turma_id IS NULL
            ORDER BY criado_em DESC
        ");
        $stmt->execute(['turma_id' => $turmaId]);
        return $stmt->fetchAll();
    }

    public function criar(array $dados): int {
        return $this->insert($dados);
    }
}
