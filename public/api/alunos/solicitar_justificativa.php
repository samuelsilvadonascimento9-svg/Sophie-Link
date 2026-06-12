<?php
// solicitar_justificativa.php — Recebe upload de justificativa do aluno (Atestados)
session_start();
require_once '../../includes/auth.php';
protect_page(['aluno']);

require_once '../../includes/db.php';
/** @var \PDO $pdo */

$response = ['success' => false, 'error' => ''];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['error'] = 'Método inválido.';
    echo json_encode($response);
    exit;
}

$frequencia_id = $_POST['frequencia_id'] ?? null;
$aluno_id = $_SESSION['usuario_id']; // ID do aprendiz que está logado

if (!$frequencia_id) {
    $response['error'] = 'ID da falta não informado.';
    echo json_encode($response);
    exit;
}

// Verifica se o arquivo foi enviado
if (!isset($_FILES['arquivo']) || $_FILES['arquivo']['error'] !== UPLOAD_ERR_OK) {
    $response['error'] = 'Por favor, selecione um arquivo válido (Atestado).';
    echo json_encode($response);
    exit;
}

$file = $_FILES['arquivo'];

// Validação de formato (apenas PDF e Imagens)
$allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedMimeTypes)) {
    $response['error'] = 'Formato de arquivo não suportado. Envie apenas PDF, JPG ou PNG.';
    echo json_encode($response);
    exit;
}

// Validação de tamanho (ex: max 5MB)
$maxSize = 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    $response['error'] = 'O arquivo é muito grande. O tamanho máximo permitido é 5MB.';
    echo json_encode($response);
    exit;
}

// Verificar se a falta pertence ao aluno e se o status é 'falta'
$stmt = $pdo->prepare("SELECT status FROM frequencia WHERE id = ? AND aprendiz_id = ?");
$stmt->execute([$frequencia_id, $aluno_id]);
$falta = $stmt->fetch();

if (!$falta) {
    $response['error'] = 'Falta não encontrada ou não pertence a você.';
    echo json_encode($response);
    exit;
}

if ($falta['status'] !== 'falta') {
    $response['error'] = 'Esta falta já foi justificada ou não precisa de justificativa.';
    echo json_encode($response);
    exit;
}

// Define o diretório de uploads
$uploadDir = '../../uploads/justificativas/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Gera um nome seguro e único para o arquivo
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$newFileName = 'justificativa_' . $aluno_id . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$destination = $uploadDir . $newFileName;

// Move o arquivo
if (move_uploaded_file($file['tmp_name'], $destination)) {
    
    // Atualiza o banco de dados
    $stmtUpdate = $pdo->prepare("
        UPDATE frequencia 
        SET arquivo_justificativa = ?, status_justificativa = 'pendente' 
        WHERE id = ?
    ");
    
    $caminhoNoBanco = 'uploads/justificativas/' . $newFileName;
    
    if ($stmtUpdate->execute([$caminhoNoBanco, $frequencia_id])) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Erro ao atualizar o status da falta.';
    }

} else {
    $response['error'] = 'Falha ao salvar o arquivo no servidor.';
}

echo json_encode($response);
