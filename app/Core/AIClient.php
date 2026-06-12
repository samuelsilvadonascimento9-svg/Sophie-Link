<?php
namespace Core;

class AIClient {
    /**
     * Faz uma chamada à API de IA (OpenRouter) e retorna o texto gerado.
     *
     * @param string $prompt O prompt para a IA.
     * @param string $model O modelo a ser utilizado (padrão: google/gemini-2.5-flash).
     * @return string O texto de resposta gerado.
     * @throws \Exception Em caso de falha na requisição ou se a chave não estiver configurada.
     */
    public static function gerarResposta(string $prompt, string $model = "google/gemini-2.5-flash"): string {
        // Carregar .env se existir (caso ainda não esteja carregado)
        $envFile = __DIR__ . '/../../.env';
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) continue;
                list($name, $value) = explode('=', $line, 2);
                if (!getenv(trim($name))) {
                    putenv(trim($name) . '=' . trim($value));
                }
            }
        }

        $apiKey = getenv('OPENROUTER_API_KEY') ?: \Core\Connect::getEnv('OPENROUTER_API_KEY');
        if (!$apiKey) {
            throw new \Exception('Chave da API OpenRouter não configurada no ambiente.');
        }

        $ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Necessário em XAMPP local
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // Necessário em XAMPP local
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);           // Timeout de 60s
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);    // Timeout de conexão 15s
        curl_setopt($ch, CURLOPT_USERAGENT, 'SophieLink/1.0');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer {$apiKey}",
            "Content-Type: application/json",
            "HTTP-Referer: http://localhost",
            "X-Title: Sophie Link"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            "model"      => $model,
            "max_tokens" => 2000,
            "messages"   => [
                ["role" => "user", "content" => $prompt]
            ]
        ]));

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($httpCode !== 200) {
            $detail = $curlError ? "cURL Error: {$curlError}" : $response;
            throw new \Exception('Erro na API de IA. HTTP Code: ' . $httpCode . ' Detalhes: ' . $detail);
        }

        $responseData = json_decode($response, true);
        $aiText = $responseData['choices'][0]['message']['content'] ?? '';

        return $aiText;
    }
}
