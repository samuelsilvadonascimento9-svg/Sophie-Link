<?php
require_once '../../includes/auth.php';
protect_page(['aluno']);

require_once '../../includes/db.php';
require_once '../../app/Core/Security.php';
/** @var PDO $pdo */

// Validação CSRF
if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    die(json_encode(['erro' => 'Requisição inválida. Tente novamente.']));
}

$aluno_id = $_SESSION['usuario_id'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Método inválido.");
}

$material_id = filter_input(INPUT_POST, 'material_id', FILTER_VALIDATE_INT);
if (!$material_id) {
    die("ID da atividade inválido.");
}

if (!isset($_FILES['arquivo']) || $_FILES['arquivo']['error'] !== UPLOAD_ERR_OK) {
    $erros = [
        UPLOAD_ERR_INI_SIZE   => 'Arquivo maior que o permitido pelo servidor.',
        UPLOAD_ERR_FORM_SIZE  => 'Arquivo maior que o permitido pelo formulário.',
        UPLOAD_ERR_PARTIAL    => 'O upload foi incompleto.',
        UPLOAD_ERR_NO_FILE    => 'Nenhum arquivo foi enviado.',
    ];
    $msg = $erros[$_FILES['arquivo']['error'] ?? 0] ?? 'Erro desconhecido no upload.';
    header('Location: ava.php?erro=' . urlencode($msg));
    exit;
}

// Limite de tamanho: 5MB
$maxBytes = 5 * 1024 * 1024;
if ($_FILES['arquivo']['size'] > $maxBytes) {
    header('Location: ava.php?erro=' . urlencode('O arquivo deve ter no máximo 5MB.'));
    exit;
}

// Validação de MIME real (não apenas extensão)
$allowedMimes = [
    'application/pdf'                                                  => 'pdf',
    'application/msword'                                               => 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    'application/zip'                                                  => 'zip',
    'application/x-rar-compressed'                                     => 'rar',
    'application/x-zip-compressed'                                     => 'zip',
    'image/jpeg'                                                       => 'jpg',
    'image/png'                                                        => 'png',
    'text/plain'                                                       => 'txt',
];

$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeReal = $finfo->file($_FILES['arquivo']['tmp_name']);

if (!isset($allowedMimes[$mimeReal])) {
    header('Location: ava.php?erro=' . urlencode("Tipo de arquivo não permitido ($mimeReal). Use PDF, DOC, DOCX, ZIP, RAR, JPG, PNG ou TXT."));
    exit;
}

// Usa a extensão do MIME real (não da extensão informada pelo usuário)
$ext = $allowedMimes[$mimeReal];

$uploadDir = __DIR__ . '/../../public/uploads/entregas/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$fileName = 'entrega_' . uniqid('', true) . '.' . $ext;
$destPath = $uploadDir . $fileName;

if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $destPath)) {
    $dbPath = 'uploads/entregas/' . $fileName;

    $stmt = $pdo->prepare(
        "INSERT INTO ava_entregas (material_id, aprendiz_id, arquivo_path, status, criado_em)
         VALUES (?, ?, ?, 'entregue', NOW())
         ON DUPLICATE KEY UPDATE arquivo_path = VALUES(arquivo_path), status = 'entregue', criado_em = NOW()"
    );
    $stmt->execute([$material_id, $aluno_id, $dbPath]);

    header('Location: ava.php?success=entrega');
    exit;
} else {
    header('Location: ava.php?erro=' . urlencode('Erro interno ao salvar o arquivo. Tente novamente.'));
    exit;
}
