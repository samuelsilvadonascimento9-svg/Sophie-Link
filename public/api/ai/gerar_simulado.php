<?php
// public/api/ai/gerar_simulado.php
session_start();
require_once '../../../includes/auth.php';
protect_page(['professor']);
require_once '../../../includes/db.php';
/** @var PDO $pdo */

// Carregar .env se existir
$envFile = __DIR__ . '/../../../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        putenv(trim($name) . '=' . trim($value));
    }
}

$apiKey = getenv('OPENROUTER_API_KEY');
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Chave da API OpenRouter não configurada.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$disciplina_id = (int)($input['disciplina_id'] ?? 0);
$turma_id = (int)($input['turma_id'] ?? 0);
$tema = trim($input['tema'] ?? '');
$qtd = (int)($input['qtd_questoes'] ?? 5);

if (!$disciplina_id || !$turma_id || !$tema) {
    echo json_encode(['success' => false, 'error' => 'Dados incompletos.']);
    exit;
}

// Obter nome da disciplina
$stmtDisc = $pdo->prepare("SELECT nome FROM disciplinas WHERE id = ?");
$stmtDisc->execute([$disciplina_id]);
$disciplina = $stmtDisc->fetchColumn();

// Montar o Prompt para a IA
$prompt = "Atue como um professor especialista em '{$disciplina}'. 
Crie um simulado de múltipla escolha sobre o tema '{$tema}' com {$qtd} questões.
Siga EXATAMENTE este formato JSON:
[
  {
    \"enunciado\": \"Texto da questão aqui\",
    \"A\": \"Texto alternativa A\",
    \"B\": \"Texto alternativa B\",
    \"C\": \"Texto alternativa C\",
    \"D\": \"Texto alternativa D\",
    \"correta\": \"A\" // Apenas a letra da alternativa correta (A, B, C ou D)
  }
]
Retorne APENAS um JSON válido. Não coloque blocos de markdown ```json.";

// Fazer chamada para a API do OpenRouter
$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer {$apiKey}",
    "Content-Type: application/json",
    "HTTP-Referer: http://localhost", // Necessário para OpenRouter
    "X-Title: Sophie Link"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "model" => "google/gemini-2.5-flash", // Usar um modelo rápido e bom do Gemini via OpenRouter
    "messages" => [
        ["role" => "user", "content" => $prompt]
    ]
]));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro na API de IA.', 'details' => $response]);
    exit;
}

$responseData = json_decode($response, true);
$aiText = $responseData['choices'][0]['message']['content'] ?? '';

// Tentar fazer parse do JSON retornado pela IA
// Limpar possível formatação markdown
$aiText = str_replace(['```json', '```'], '', $aiText);
$questoes = json_decode(trim($aiText), true);

if (!$questoes || !is_array($questoes)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'A IA não retornou um formato válido.', 'raw' => $aiText]);
    exit;
}

try {
    $pdo->beginTransaction();

    // Inserir Simulado
    $titulo = "Simulado: {$tema} (Gerado por IA)";
    $stmtSim = $pdo->prepare("INSERT INTO ava_simulados (titulo, disciplina_id, turma_id, professor_id, gerado_por_ia) VALUES (?, ?, ?, ?, 1)");
    $stmtSim->execute([$titulo, $disciplina_id, $turma_id, $_SESSION['usuario_id']]);
    $simulado_id = $pdo->lastInsertId();

    // Inserir Questões
    $stmtQ = $pdo->prepare("INSERT INTO ava_questoes (simulado_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta) VALUES (?, ?, ?, ?, ?, ?, ?)");

    foreach ($questoes as $q) {
        $stmtQ->execute([
            $simulado_id,
            $q['enunciado'],
            $q['A'],
            $q['B'],
            $q['C'],
            $q['D'],
            $q['correta']
        ]);
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'simulado_id' => $simulado_id, 'message' => 'Simulado gerado com sucesso!']);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao salvar no banco de dados: ' . $e->getMessage()]);
}
