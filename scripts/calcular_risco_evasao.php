<?php
/**
 * calcular_risco_evasao.php
 * Script executado via CRON (ou manualmente pela interface do Coordenador)
 * Analisa frequência e notas de cada aprendiz para determinar o Risco de Evasão.
 */

require_once __DIR__ . '/../includes/db.php';

try {
    // Busca todos os aprendizes ativos
    $stmtAprendizes = $pdo->query("SELECT id, nome FROM aprendizes WHERE situacao_aluno = 'cursando'");
    $aprendizes = $stmtAprendizes->fetchAll(PDO::FETCH_ASSOC);

    $atualizados = 0;

    foreach ($aprendizes as $aluno) {
        $id = $aluno['id'];

        // 1. Calcular Frequência Global
        $stmtFreq = $pdo->prepare("SELECT COUNT(*) as total, SUM(CASE WHEN status = 'presente' THEN 1 ELSE 0 END) as presencas FROM frequencia WHERE aprendiz_id = ?");
        $stmtFreq->execute([$id]);
        $freqData = $stmtFreq->fetch(PDO::FETCH_ASSOC);
        
        $freqPerc = 100;
        if ($freqData && $freqData['total'] > 0) {
            $freqPerc = round(($freqData['presencas'] / $freqData['total']) * 100);
        }

        // 2. Calcular Média de Notas
        $stmtNotas = $pdo->prepare("SELECT AVG(valor_nota) as media FROM notas WHERE aprendiz_id = ?");
        $stmtNotas->execute([$id]);
        $notasData = $stmtNotas->fetch(PDO::FETCH_ASSOC);
        
        $mediaNotas = 10.0;
        if ($notasData && $notasData['media'] !== null) {
            $mediaNotas = (float)$notasData['media'];
        }

        // 3. Regra de Negócio Preditiva (Simples)
        // Risco Alto: Frequência < 75% OU Média < 5.0
        // Risco Médio: Frequência < 85% OU Média < 7.0
        // Risco Baixo: Frequência >= 85% E Média >= 7.0
        $risco = 'Baixo';
        if ($freqPerc < 75 || $mediaNotas < 5.0) {
            $risco = 'Alto';
        } elseif ($freqPerc < 85 || $mediaNotas < 7.0) {
            $risco = 'Medio';
        }

        // Atualiza o aprendiz
        $stmtUpdate = $pdo->prepare("UPDATE aprendizes SET status_risco = ? WHERE id = ?");
        $stmtUpdate->execute([$risco, $id]);
        
        $atualizados++;
    }

    echo "Cálculo de Risco de Evasão concluído com sucesso. Aprendizes analisados: {$atualizados}.\n";

} catch (PDOException $e) {
    echo "Erro ao calcular risco: " . $e->getMessage() . "\n";
}
