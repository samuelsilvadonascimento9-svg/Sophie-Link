<?php
// download_material.php — Serve PDFs do AVA com proteção de sessão
session_start();
require_once '../../includes/auth.php';
protect_page(['aluno', 'professor', 'admin', 'coordenadora']);
require_once '../../includes/db.php';
/** @var PDO $pdo */

$id = (int)($_GET['id'] ?? 0);
if (!$id) { http_response_code(400); exit('ID inválido.'); }

$stmt = $pdo->prepare("SELECT * FROM ava_materiais WHERE id = ? LIMIT 1");
$stmt->execute([$id]);
$mat = $stmt->fetch();

if (!$mat || !$mat['arquivo_path']) { http_response_code(404); exit('Material não encontrado.'); }

$filePath = __DIR__ . '/../../' . $mat['arquivo_path'];
if (!file_exists($filePath)) { http_response_code(404); exit('Arquivo não encontrado no servidor.'); }

$mime = mime_content_type($filePath) ?: 'application/octet-stream';
header('Content-Type: ' . $mime);
header('Content-Disposition: inline; filename="' . basename($mat['arquivo_nome']) . '"');
header('Content-Length: ' . filesize($filePath));
readfile($filePath);
exit;
