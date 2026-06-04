<?php
// public/api/chatbot/chatbot_response.php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../../app/Core/Autoloader.php';
require_once __DIR__ . '/../../../includes/db.php'; // Inicia a conexão Singleton global

use Helpers\ChatHelpers;
use Models\ChatbotOption;

// Carrega o perfil do Sophie Link
$studioProfile = require __DIR__ . '/../../../app/Config/sophie_profile.php';

// Pega a chave da API do .env
$envPath = __DIR__ . '/../../../.env';
$openRouterKey = '';
if (file_exists($envPath)) {
    $envVariables = parse_ini_file($envPath);
    $openRouterKey = $envVariables['OPENROUTER_API_KEY'] ?? '';
}

$payload = json_decode(file_get_contents('php://input'), true) ?: [];

$mode = $payload['mode'] ?? 'manual';
$message = trim($payload['message'] ?? '');
$conversationId = isset($payload['conversation_id']) ? (int) $payload['conversation_id'] : 0;

$visitorName = trim($payload['visitor_name'] ?? '') ?: null;
$visitorPhone = trim($payload['visitor_phone'] ?? '') ?: null;
$visitorEmail = trim($payload['visitor_email'] ?? '') ?: null;

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'];
$dir = dirname(dirname(dirname($_SERVER['SCRIPT_NAME'])));
$dir = $dir === '/' ? '' : $dir;
$baseUrl = $protocol . $host . $dir;

define('LINK_AGENDAR',   $baseUrl . '/#fale-conosco');
define('LINK_WHATSAPP',  'https://wa.me/+559499999999');

if ($message === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Mensagem vazia.']);
    exit;
}

if ($conversationId <= 0 || !ChatHelpers::conversationExists($conversationId)) {
    $conversationId = ChatHelpers::createConversation($visitorName, $visitorPhone, $visitorEmail, $mode === 'ai' ? 'ai' : 'manual');
}

ChatHelpers::saveMessage($conversationId, 'user', $message);

if ($mode === 'ai') {
    $history = ChatHelpers::getConversationHistoryForAi($conversationId, 12);
    $responseText = getAiResponse($message, "Sophie Link", ['api_key' => $openRouterKey, 'model' => 'openai/gpt-oss-120b:free'], $studioProfile, $history);
    $sender = 'ai';
} else {
    $responseText = getManualResponse($message, $studioProfile);
    $sender = 'bot';
}

ChatHelpers::saveMessage($conversationId, $sender, $responseText);

echo json_encode([
    'conversation_id' => $conversationId,
    'mode' => $mode,
    'reply_sender' => $sender,
    'reply' => $responseText,
]);

function getManualResponse($message, $studioProfile)
{
    $normalized = mb_strtolower(trim($message));

    $optionModel = new ChatbotOption();
    $optionResponse = $optionModel->findActiveResponse($normalized);
    if ($optionResponse !== null) {
        return $optionResponse;
    }

    if (in_array($normalized, ['menu', 'opcoes', 'opções', 'ola', 'olá', 'oi', 'inicio'], true)) {
        return "Como posso ajudar? Escolha uma opção digitando o NÚMERO:\n\n" . buildManualMenu();
    }

    if (in_array($normalized, ['1']) || str_contains($normalized, 'matrícula') || str_contains($normalized, 'matricula')) {
        return "Ótimo! Você pode se matricular falando com a nossa secretaria online:\n\n"
            . "📋 [Fale Conosco](" . LINK_AGENDAR . ")\n"
            . "📲 [WhatsApp Direto](" . LINK_WHATSAPP . ")\n\n"
            . "Nossa equipe responde rapidamente!";
    }

    if (in_array($normalized, ['2']) || str_contains($normalized, 'cursos')) {
        $cursos = $studioProfile['cursos'] ?? [];
        return "Nossos cursos técnicos:\n- " . implode("\n- ", $cursos);
    }

    if (in_array($normalized, ['3']) || str_contains($normalized, 'horario') || str_contains($normalized, 'horário')) {
        $h = $studioProfile['horario'] ?? [];
        return "📍 Nosso centro técnico fica em:\n" . ($studioProfile['endereco'] ?? 'Não informado.') . "\n\n"
             . "🕒 Horário de atendimento:\n"
             . "- Segunda a Sexta: " . ($h['segunda_a_sexta'] ?? '-') . "\n"
             . "- Sábado: " . ($h['sabado'] ?? '-') . "\n"
             . "- Domingo: Fechado";
    }

    if (in_array($normalized, ['4']) || str_contains($normalized, 'whatsapp') || str_contains($normalized, 'humano')) {
        return "Fale diretamente com a secretaria pelo WhatsApp 📲\n[👉 Abrir WhatsApp](" . LINK_WHATSAPP . ")";
    }

    return "Não entendi sua solicitação. Por favor, escolha uma opção digitando o NÚMERO:\n\n" . buildManualMenu();
}

function buildManualMenu()
{
    return "1 - 📅 Matrículas / Fale Conosco\n"
        . "2 - 📚 Conhecer nossos cursos técnicos\n"
        . "3 - 📍 Horário e Endereço\n"
        . "4 - 📲 Falar com a secretaria (WhatsApp)";
}

function getAiResponse($userMessage, $companyName, $openRouter, $studioProfile, $history = [])
{
    if (empty($openRouter['api_key'])) {
        return 'Integração IA indisponível. Verifique o .env.';
    }

    $studioContext = buildStudioContext($studioProfile);

    $systemPrompt = "Você é a assistente virtual do Centro Técnico Sophie Link. "
        . "Seu objetivo é apresentar os cursos, tirar dúvidas sobre as turmas e incentivar novas matrículas. Seja amigável e profissional. "
        . "1. IDIOMA: Responda SEMPRE em Português do Brasil. "
        . "2. PRECISÃO: NUNCA invente preços ou prometa vagas que não tem. Diga que vai confirmar com a secretaria. "
        . "3. CONCISÃO: Responda no máximo 2 ou 3 frases curtas. "
        . "4. CONVERSÃO: Se o aluno quiser se matricular, mande ESTE link: [Falar no WhatsApp](" . LINK_WHATSAPP . "). "
        . "DADOS OFICIAIS DO SOPHIE LINK:\n{$studioContext}";

    $messages = buildMessagesForAi($systemPrompt, $history, $userMessage);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://openrouter.ai/api/v1/chat/completions");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    $payload = [
        "model" => $openRouter['model'],
        "messages" => $messages,
        "temperature" => 0.7
    ];

    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer " . $openRouter['api_key'],
        "Content-Type: application/json",
        "HTTP-Referer: http://localhost",
        "X-Title: " . $companyName . " Chatbot"
    ]);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = json_decode($result, true);

    if ($httpCode !== 200) {
        return "Desculpe, nossos servidores estão ocupados no momento. Tente novamente.";
    }

    $content = $data['choices'][0]['message']['content'] ?? null;
    return $content ? sanitizeAiText($content) : 'Tente novamente em alguns instantes.';
}

function buildStudioContext($profile)
{
    $lines = [];
    $lines[] = 'Nome: ' . ($profile['nome'] ?? '');
    $lines[] = 'Endereço: ' . ($profile['endereco'] ?? '');
    $lines[] = 'Cursos Ofertados: ' . implode(', ', $profile['cursos'] ?? []);
    $lines[] = 'Diferenciais: ' . implode(' | ', $profile['diferenciais'] ?? []);
    return implode("\n", $lines);
}

function buildMessagesForAi($systemPrompt, $history, $currentMessage)
{
    $messages = [['role' => 'system', 'content' => $systemPrompt]];
    foreach ($history as $msg) {
        $messages[] = ['role' => $msg['role'], 'content' => $msg['content']];
    }
    $messages[] = ['role' => 'user', 'content' => $currentMessage];
    return $messages;
}

function sanitizeAiText($text)
{
    $text = preg_replace('/```[\s\S]*?```/u', '', $text);
    $text = str_replace(['**', '__', '*', '`'], '', $text);
    $text = preg_replace("/\n{3,}/", "\n\n", $text);
    $text = preg_replace('/"\}\s*$/u', '', trim($text));
    $text = str_replace('"}', '', $text);
    $text = preg_replace('/"$/u', '', trim($text));
    return trim($text);
}
