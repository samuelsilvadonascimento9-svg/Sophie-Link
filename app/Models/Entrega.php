<?php
namespace Models;

use Core\Model;

class Entrega extends Model {
    protected string $table = 'ava_entregas';

    public function buscarPorAlunoEMaterial(int $alunoId, int $materialId): ?array {
        return $this->findOne([
            'aprendiz_id' => $alunoId,
            'material_id' => $materialId
        ]);
    }
    
    public function listarPorAluno(int $alunoId): array {
        return $this->findAll(['aprendiz_id' => $alunoId]);
    }

    public function registrar(array $dados): int {
        return $this->insert($dados);
    }
}
