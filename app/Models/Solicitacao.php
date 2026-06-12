<?php
namespace Models;

use Core\Model;

class Solicitacao extends Model {
    protected string $table = 'solicitacoes_documentos';

    public function listarPorAprendiz(int $alunoId): array {
        return $this->findAll(['aprendiz_id' => $alunoId], ['*'], 'criado_em DESC');
    }

    public function listarPendentes(): array {
        $stmt = $this->pdo->prepare("
            SELECT s.*, a.nome AS aluno_nome
            FROM solicitacoes_documentos s
            JOIN aprendizes a ON a.id = s.aprendiz_id
            WHERE s.status = 'pendente'
            ORDER BY s.criado_em ASC
        ");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function criar(array $dados): int {
        return $this->insert($dados);
    }
    
    public function concluir(int $id): void {
        $this->update(['status' => 'concluido'], ['id' => $id]);
    }
}
