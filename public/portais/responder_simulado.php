<?php
// C:\xampp\htdocs\devweb\Sophie-Link\public\portais\responder_simulado.php
session_start();
require_once '../../includes/auth.php';
protect_page(['aluno']);
require_once '../../includes/db.php';
/** @var PDO $pdo */

$aluno_id = $_SESSION['usuario_id']; // ID do usuario. Precisamos do ID do aprendiz
$stmtA = $pdo->prepare("SELECT id FROM aprendizes WHERE email = (SELECT email FROM usuarios WHERE id = ?) OR nome = (SELECT nome FROM usuarios WHERE id = ?)");
$stmtA->execute([$aluno_id, $aluno_id]);
$aprendiz = $stmtA->fetch();
$real_aluno_id = $aprendiz ? $aprendiz['id'] : 0;

$simulado_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Busca o simulado
$stmtSim = $pdo->prepare("SELECT s.*, d.nome AS disciplina_nome FROM ava_simulados s JOIN disciplinas d ON s.disciplina_id = d.id WHERE s.id = ?");
$stmtSim->execute([$simulado_id]);
$simulado = $stmtSim->fetch();

if (!$simulado) {
    die("Simulado não encontrado.");
}

// Verifica se o aluno já respondeu (se tem respostas salvas para questoes deste simulado)
$stmtVerifica = $pdo->prepare("
    SELECT COUNT(*) 
    FROM ava_respostas r 
    JOIN ava_questoes q ON r.questao_id = q.id 
    WHERE q.simulado_id = ? AND r.aprendiz_id = ?
");
$stmtVerifica->execute([$simulado_id, $real_aluno_id]);
$jaRespondeu = $stmtVerifica->fetchColumn() > 0;

// Busca as questões
$stmtQ = $pdo->prepare("SELECT * FROM ava_questoes WHERE simulado_id = ?");
$stmtQ->execute([$simulado_id]);
$questoes = $stmtQ->fetchAll();

// Se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$jaRespondeu) {
    $nota = 0;
    $total = count($questoes);
    
    try {
        $pdo->beginTransaction();
        $stmtIns = $pdo->prepare("INSERT INTO ava_respostas (questao_id, aprendiz_id, alternativa_marcada, correta) VALUES (?, ?, ?, ?)");
        
        foreach ($questoes as $q) {
            $qid = $q['id'];
            $marcada = $_POST['q_' . $qid] ?? '';
            $correta = ($marcada === $q['alternativa_correta']) ? 1 : 0;
            if ($correta) $nota++;
            
            $stmtIns->execute([$qid, $real_aluno_id, $marcada, $correta]);
        }
        
        $pdo->commit();
        $jaRespondeu = true;
        $mensagem = "Simulado finalizado! Você acertou {$nota} de {$total} questões.";
    } catch (Exception $e) {
        $pdo->rollBack();
        $erro = "Erro ao salvar respostas: " . $e->getMessage();
    }
}

// Se já respondeu, buscar as respostas dadas para exibir o gabarito
$respostasDadas = [];
if ($jaRespondeu) {
    $stmtR = $pdo->prepare("
        SELECT r.questao_id, r.alternativa_marcada, r.correta 
        FROM ava_respostas r 
        JOIN ava_questoes q ON r.questao_id = q.id 
        WHERE q.simulado_id = ? AND r.aprendiz_id = ?
    ");
    $stmtR->execute([$simulado_id, $real_aluno_id]);
    foreach ($stmtR->fetchAll() as $r) {
        $respostasDadas[$r['questao_id']] = $r;
    }
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Responder Simulado - Sophie Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/premium.css">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background: #F8FAFC; color: #1E293B; margin: 0; padding: 2rem; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .q-card { margin-bottom: 1.5rem; padding: 1.5rem; border: 1px solid #E2E8F0; border-radius: 8px; }
        .q-title { font-weight: 600; margin-bottom: 1rem; }
        .alt-label { display: block; margin-bottom: 0.5rem; padding: 0.75rem; border: 1px solid #E2E8F0; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .alt-label:hover { background: #F1F5F9; }
        .alt-radio { margin-right: 10px; }
        .btn-submit { background: #8B5CF6; color: #fff; padding: 10px 20px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 1rem; }
        .btn-submit:hover { background: #7C3AED; }
        .correct { background: #DCFCE7 !important; border-color: #22C55E !important; }
        .incorrect { background: #FEE2E2 !important; border-color: #EF4444 !important; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <a href="ava.php" style="color: #64748B; text-decoration: none; font-size: 0.85rem;">← Voltar para o AVA</a>
            <h1 style="margin: 1rem 0 0.5rem; color: #8B5CF6;"><i data-lucide="sparkles" style="vertical-align: middle;"></i> <?= htmlspecialchars($simulado['titulo']) ?></h1>
            <p style="color: #64748B; margin: 0;">Disciplina: <?= htmlspecialchars($simulado['disciplina_nome']) ?></p>
        </div>

        <?php if (isset($mensagem)): ?>
            <div style="padding: 1rem; background: #DCFCE7; color: #166534; border-radius: 8px; margin-bottom: 1.5rem; font-weight: 600;">
                <?= $mensagem ?>
            </div>
        <?php endif; ?>
        <?php if (isset($erro)): ?>
            <div style="padding: 1rem; background: #FEE2E2; color: #991B1B; border-radius: 8px; margin-bottom: 1.5rem; font-weight: 600;">
                <?= $erro ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <?php foreach ($questoes as $i => $q): 
                $qid = $q['id'];
                $resp = $respostasDadas[$qid] ?? null;
            ?>
                <div class="q-card">
                    <div class="q-title"><?= ($i + 1) ?>. <?= nl2br(htmlspecialchars($q['enunciado'])) ?></div>
                    
                    <?php foreach (['A', 'B', 'C', 'D'] as $letra): 
                        $altTexto = $q['alternativa_' . strtolower($letra)];
                        $class = '';
                        if ($jaRespondeu) {
                            if ($resp && $resp['alternativa_marcada'] === $letra) {
                                $class = $resp['correta'] ? 'correct' : 'incorrect';
                            }
                            if ($q['alternativa_correta'] === $letra) {
                                $class = 'correct'; // Mostra a correta sempre
                            }
                        }
                    ?>
                        <label class="alt-label <?= $class ?>">
                            <input type="radio" name="q_<?= $qid ?>" value="<?= $letra ?>" class="alt-radio" required <?= $jaRespondeu ? 'disabled' : '' ?> <?= ($resp && $resp['alternativa_marcada'] === $letra) ? 'checked' : '' ?>>
                            <strong><?= $letra ?>)</strong> <?= htmlspecialchars($altTexto) ?>
                            <?php if ($jaRespondeu && $q['alternativa_correta'] === $letra): ?>
                                <span style="float: right; color: #16A34A;"><i data-lucide="check-circle" style="width: 16px;"></i></span>
                            <?php endif; ?>
                            <?php if ($jaRespondeu && $resp && $resp['alternativa_marcada'] === $letra && !$resp['correta']): ?>
                                <span style="float: right; color: #DC2626;"><i data-lucide="x-circle" style="width: 16px;"></i></span>
                            <?php endif; ?>
                        </label>
                    <?php endforeach; ?>
                </div>
            <?php endforeach; ?>

            <?php if (!$jaRespondeu): ?>
                <div style="text-align: right;">
                    <button type="submit" class="btn-submit">Finalizar Simulado</button>
                </div>
            <?php endif; ?>
        </form>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>
