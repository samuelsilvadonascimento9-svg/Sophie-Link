<?php
/**
 * scripts/gerar_mensalidades.php
 * 
 * Este script deve ser executado via CRON JOB no dia 1º de cada mês à meia-noite.
 * Ele agrupa todos os contratos ativos por empresa, soma o valor e gera a fatura
 * para o mês corrente na tabela 'financeiro', evitando duplicidades.
 */

require_once __DIR__ . '/../includes/db.php';
$pdo = \Core\Connect::getInstance();

$competencia_atual = date('Y-m'); // Ex: '2026-06'
$vencimento = date('Y-m-10');     // Vencimento dia 10 do mês vigente

try {
    $pdo->beginTransaction();

    // 1. Buscar soma de contratos ativos agrupados por empresa
    $stmt = $pdo->query("
        SELECT empresa_id, SUM(valor) as total_fatura 
        FROM contratos 
        WHERE status = 'ativo' 
        GROUP BY empresa_id
    ");
    $empresas_com_contratos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $faturas_geradas = 0;

    foreach ($empresas_com_contratos as $row) {
        $empresa_id = $row['empresa_id'];
        $valor_total = $row['total_fatura'];

        if ($valor_total <= 0) continue;

        // 2. Verificar se a fatura da competência atual já existe para esta empresa
        $stmtCheck = $pdo->prepare("SELECT id FROM financeiro WHERE empresa_id = ? AND competencia = ?");
        $stmtCheck->execute([$empresa_id, $competencia_atual]);
        
        if (!$stmtCheck->fetch()) {
            // 3. Gerar a nova fatura
            $stmtInsert = $pdo->prepare("
                INSERT INTO financeiro (empresa_id, competencia, valor, status, data_vencimento, observacoes) 
                VALUES (?, ?, ?, 'pendente', ?, ?)
            ");
            
            $obs = "Fatura gerada automaticamente pelo sistema. Referente à competência {$competencia_atual}.";
            
            $stmtInsert->execute([
                $empresa_id,
                $competencia_atual,
                $valor_total,
                $vencimento,
                $obs
            ]);

            $faturas_geradas++;
        }
    }

    $pdo->commit();
    echo "[SUCESSO] CRON executado: {$faturas_geradas} faturas geradas para a competência {$competencia_atual}.\n";

} catch (Exception $e) {
    $pdo->rollBack();
    echo "[ERRO] Falha ao gerar mensalidades: " . $e->getMessage() . "\n";
}
