<?php
// Carregar .env da raiz do projeto (4 níveis acima de public/api/ai/)
$envFile = __DIR__ . '/../../../.env';
$apiKey = '';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        if (trim($name) === 'OPENROUTER_API_KEY') {
            $apiKey = trim($value);
        }
    }
}

echo "=== Diagnóstico da API de IA ===\n\n";
echo "Caminho .env: " . realpath($envFile) . "\n";
echo "cURL habilitado: " . (function_exists('curl_init') ? 'SIM' : 'NAO') . "\n";
echo "Chave API: " . ($apiKey ? 'SIM (' . substr($apiKey,0,12) . '...)' : 'NAO ENCONTRADA') . "\n\n";

if (!$apiKey) { die("SEM CHAVE"); }

echo "Testando chamada à API...\n";
$prompt = "Responda apenas: OK";
$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
curl_setopt($ch, CURLOPT_USERAGENT, 'SophieLink/1.0');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json",
    "HTTP-Referer: http://localhost",
    "X-Title: Sophie Link"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "model"      => "google/gemini-2.5-flash",
    "max_tokens" => 50,
    "messages"   => [["role" => "user", "content" => $prompt]]
]));
$r = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

echo "HTTP Code: $code\n";
echo "cURL Error: " . ($err ?: 'nenhum') . "\n";
echo "Resposta: " . $r . "\n";
?>
