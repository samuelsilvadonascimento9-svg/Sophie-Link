<?php
// api/get_aluno.php — Retorna dados de um aluno por ID (JSON)
session_start();
require_once '../../../includes/auth.php';
protect_page(['colaborador', 'admin']);
require_once '../../../includes/db.php';
$pdo = \Core\Connect::getInstance();
header('Content-Type: application/json');

$id = (int)($_GET['id'] ?? 0);
if (!$id) { echo json_encode(['success' => false, 'error' => 'ID inválido']); exit; }

$stmt = $pdo->prepare("
    SELECT a.*, t.nome AS turma_nome, t.id AS turma_id, c.nome AS curso_nome,
           e.nome AS empresa_nome, cont.status AS contrato_status
    FROM aprendizes a
    LEFT JOIN turmas t ON a.turma_id = t.id
    LEFT JOIN cursos c ON t.curso_id = c.id
    LEFT JOIN contratos cont ON a.id = cont.aprendiz_id AND cont.status = 'ativo'
    LEFT JOIN empresas e ON cont.empresa_id = e.id
    WHERE a.id = ? AND a.deleted_at IS NULL
    LIMIT 1
");
$stmt->execute([$id]);
$aluno = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$aluno) { echo json_encode(['success' => false, 'error' => 'Aluno não encontrado']); exit; }

// Buscar turmas para o select
$turmas = $pdo->query("SELECT t.id, t.nome, c.nome as curso_nome FROM turmas t JOIN cursos c ON t.curso_id = c.id ORDER BY c.nome, t.nome")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'aluno' => $aluno, 'turmas' => $turmas]);
