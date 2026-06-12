<?php
// download_material.php — Serve PDFs do AVA com proteção de sessão e verificação de IDOR
session_start();
require_once '../../includes/auth.php';
protect_page(['aluno', 'professor', 'admin', 'coordenadora', 'colaborador']);
require_once '../../includes/db.php';
/** @var PDO $pdo */

$id = (int)($_GET['id'] ?? 0);
if (!$id) { http_response_code(400); exit('ID inválido.'); }

$stmt = $pdo->prepare("SELECT * FROM ava_materiais WHERE id = ? LIMIT 1");
$stmt->execute([$id]);
$mat = $stmt->fetch();

if (!$mat || !$mat['arquivo_path']) { http_response_code(404); exit('Material não encontrado.'); }

// ─── PROTEÇÃO IDOR: Alunos só podem baixar materiais da sua própria turma ─────
$nivel = $_SESSION['usuario_nivel'] ?? '';
if ($nivel === 'aluno') {
    // Busca a turma do aluno logado
    $stmtAluno = $pdo->prepare("
        SELECT a.turma_id FROM aprendizes a
        JOIN usuarios u ON (u.email = a.email OR u.nome = a.nome)
        WHERE u.id = ? LIMIT 1
    ");
    $stmtAluno->execute([$_SESSION['usuario_id']]);
    $turma_do_aluno = $stmtAluno->fetchColumn();

    // Bloqueia se o material pertencer a outra turma
    if ((int)$turma_do_aluno !== (int)$mat['turma_id']) {
        http_response_code(403);
        exit('Acesso negado: este material não pertence à sua turma.');
    }
}
// ─────────────────────────────────────────────────────────────────────────────

$filePath = __DIR__ . '/../../' . $mat['arquivo_path'];
if (!file_exists($filePath)) { http_response_code(404); exit('Arquivo não encontrado no servidor.'); }

$mime = mime_content_type($filePath) ?: 'application/octet-stream';
header('Content-Type: ' . $mime);
header('Content-Disposition: inline; filename="' . basename($mat['arquivo_nome']) . '"');
header('Content-Length: ' . filesize($filePath));
readfile($filePath);
exit;
