<?php
// Retorna JSON + garante que erros PHP não quebrem o JSON
header('Content-Type: application/json; charset=utf-8');

function jsonResponse(bool $success, $data = null, string $message = '', int $status = 200): void {
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
