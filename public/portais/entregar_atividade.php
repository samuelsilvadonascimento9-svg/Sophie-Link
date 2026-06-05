<?php
require_once '../../includes/auth.php';
protect_page(['aluno']);

require_once '../../includes/db.php';
/** @var \PDO $pdo */

$aluno_id = $_SESSION['usuario_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $material_id = filter_input(INPUT_POST, 'material_id', FILTER_VALIDATE_INT);
    if (!$material_id) {
        die("ID da atividade inválido.");
    }

    if (!isset($_FILES['arquivo']) || $_FILES['arquivo']['error'] !== UPLOAD_ERR_OK) {
        die("Nenhum arquivo enviado ou ocorreu um erro no upload.");
    }

    $uploadDir = __DIR__ . '/../../public/uploads/entregas/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileInfo = pathinfo($_FILES['arquivo']['name']);
    $ext = strtolower($fileInfo['extension']);
    $allowedExts = ['pdf', 'doc', 'docx', 'zip', 'rar', 'jpg', 'png', 'txt'];
    
    if (!in_array($ext, $allowedExts)) {
        die("Tipo de arquivo não permitido.");
    }

    $fileName = uniqid('entrega_') . '.' . $ext;
    $destPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $destPath)) {
        $dbPath = 'uploads/entregas/' . $fileName;

        $stmt = $pdo->prepare("INSERT INTO ava_entregas (material_id, aprendiz_id, arquivo_path, status, criado_em) VALUES (?, ?, ?, 'entregue', NOW()) ON DUPLICATE KEY UPDATE arquivo_path = VALUES(arquivo_path), status = 'entregue', criado_em = NOW()");
        $stmt->execute([$material_id, $aluno_id, $dbPath]);

        header('Location: ava.php?success=entrega');
        exit;
    } else {
        die("Erro ao salvar arquivo.");
    }
} else {
    die("Método inválido.");
}
