<?php
namespace Models;

use Core\Model;

class Contrato extends Model {
    protected string $table = 'contratos';

    public function listarPorAprendiz(int $alunoId): array {
        $stmt = $this->pdo->prepare("
            SELECT c.*, e.nome AS empresa_nome
            FROM contratos c
            LEFT JOIN empresas e ON e.id = c.empresa_id
            WHERE c.aprendiz_id = :aluno_id
            ORDER BY c.data_inicio DESC
        ");
        $stmt->execute(['aluno_id' => $alunoId]);
        return $stmt->fetchAll();
    }

    public function criar(array $dados): int {
        return $this->insert($dados);
    }
}
