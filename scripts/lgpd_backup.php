<?php
// scripts/lgpd_backup.php — Script de Backup Anonimizado (Compliance LGPD)
// Este script exporta os dados acadêmicos (aprendizes, notas, frequência) em JSON
// substituindo PII (Personally Identifiable Information) por hash ou dados genéricos.

require_once __DIR__ . '/../includes/db.php';

header('Content-Type: application/json; charset=utf-8');

try {
    // 1. Busca Aprendizes e Anonimiza
    $stmtAprendizes = $pdo->query("SELECT * FROM aprendizes");
    $aprendizes = $stmtAprendizes->fetchAll(PDO::FETCH_ASSOC);

    $dadosAnonimizados = [
        'data_backup' => date('Y-m-d\TH:i:sP'),
        'total_registros' => count($aprendizes),
        'aprendizes' => []
    ];

    foreach ($aprendizes as $a) {
        $id = $a['id'];
        
        // Busca Notas
        $stmtNotas = $pdo->prepare("SELECT disciplina_id, atividade, valor_nota, data_registro FROM notas WHERE aprendiz_id = ?");
        $stmtNotas->execute([$id]);
        $notas = $stmtNotas->fetchAll(PDO::FETCH_ASSOC);
        
        // Busca Frequência
        $stmtFreq = $pdo->prepare("SELECT disciplina_id, data_registro, status, horario_entrada, horario_saida FROM frequencia WHERE aprendiz_id = ?");
        $stmtFreq->execute([$id]);
        $freq = $stmtFreq->fetchAll(PDO::FETCH_ASSOC);

        // Estrutura do aprendiz anonimizado
        $dadosAnonimizados['aprendizes'][] = [
            'id_anonimo' => hash('sha256', 'aluno_' . $id), // ID irreversível
            'turma_id' => $a['turma_id'],
            'tipo' => $a['tipo'],
            'situacao_aluno' => $a['situacao_aluno'],
            'criado_em' => $a['criado_em'],
            
            // PII Substituído
            'nome' => '[ANONIMIZADO]',
            'cpf' => '[ANONIMIZADO]',
            'rg' => '[ANONIMIZADO]',
            'data_nascimento' => '[ANONIMIZADO]',
            'telefone' => '[ANONIMIZADO]',
            'email' => '[ANONIMIZADO]',
            'endereco' => '[ANONIMIZADO]',
            'nome_mae' => '[ANONIMIZADO]',
            'nome_pai' => '[ANONIMIZADO]',
            
            'historico_academico' => [
                'notas' => $notas,
                'frequencia' => $freq
            ]
        ];
    }

    // Salvar num arquivo físico na pasta segura (ou apenas exibir)
    $backupPath = __DIR__ . '/../backups';
    if (!is_dir($backupPath)) {
        mkdir($backupPath, 0777, true);
    }
    
    $filename = 'backup_anonimizado_' . date('Ymd_His') . '.json';
    $filepath = $backupPath . '/' . $filename;
    
    file_put_contents($filepath, json_encode($dadosAnonimizados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if (php_sapi_name() === 'cli') {
        echo "✅ Backup anonimizado gerado com sucesso: {$filepath}\n";
    } else {
        echo json_encode([
            'status' => 'sucesso',
            'mensagem' => 'Backup anonimizado gerado em conformidade com a LGPD.',
            'arquivo' => $filename
        ]);
    }

} catch (Exception $e) {
    if (php_sapi_name() === 'cli') {
        echo "❌ Erro ao gerar backup: " . $e->getMessage() . "\n";
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => $e->getMessage()]);
    }
}
