<?php
// auditoria_mte.php — Dossiê de Auditoria do Ministério do Trabalho
session_start();
require_once '../../includes/auth.php';
protect_page(['empresa']);
require_once '../../includes/db.php';
/** @var PDO $pdo */

$empresa_id = (int)$_SESSION['empresa_id'];
$aprendiz_id = (int)($_GET['aprendiz_id'] ?? 0);

if (!$aprendiz_id) die('Aprendiz não especificado.');

// Buscar dados do contrato
$stmt = $pdo->prepare("
    SELECT c.*, a.nome AS aprendiz_nome, a.cpf, a.rg, a.data_nascimento, a.telefone,
           e.nome AS empresa_nome, e.cnpj,
           t.nome AS turma_nome, cu.nome AS curso_nome
    FROM contratos c
    JOIN aprendizes a ON c.aprendiz_id = a.id
    JOIN empresas e ON c.empresa_id = e.id
    LEFT JOIN turmas t ON a.turma_id = t.id
    LEFT JOIN cursos cu ON t.curso_id = cu.id
    WHERE c.aprendiz_id = ? AND c.empresa_id = ?
    LIMIT 1
");
$stmt->execute([$aprendiz_id, $empresa_id]);
$contrato = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$contrato) die('Contrato não encontrado ou aprendiz não pertence a esta empresa.');

// Buscar Frequência
$stmtFreq = $pdo->prepare("
    SELECT data_registro, status 
    FROM frequencia 
    WHERE aprendiz_id = ? AND data_registro BETWEEN ? AND ?
    ORDER BY data_registro ASC
");
$stmtFreq->execute([$aprendiz_id, $contrato['data_inicio'], $contrato['data_fim']]);
$frequencia = $stmtFreq->fetchAll(PDO::FETCH_ASSOC);

$total_aulas = count($frequencia);
$presencas = 0;
foreach ($frequencia as $f) {
    if ($f['status'] === 'presente') $presencas++;
}
$freq_perc = $total_aulas > 0 ? round(($presencas / $total_aulas) * 100) : 100;

// Buscar Notas
$stmtNotas = $pdo->prepare("
    SELECT d.nome AS disciplina, n.valor_nota AS valor 
    FROM notas n
    JOIN disciplinas d ON n.disciplina_id = d.id
    WHERE n.aprendiz_id = ?
");
$stmtNotas->execute([$aprendiz_id]);
$notas = $stmtNotas->fetchAll(PDO::FETCH_ASSOC);
$media = 0;
if (count($notas) > 0) {
    $soma = 0;
    foreach ($notas as $n) $soma += (float)$n['valor'];
    $media = round($soma / count($notas), 1);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Dossiê MTE - <?= htmlspecialchars($contrato['aprendiz_nome']) ?></title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
        .header h1 { margin: 0 0 10px 0; font-size: 24px; text-transform: uppercase; }
        .header p { margin: 0; font-size: 14px; }
        .section { margin-bottom: 30px; }
        .section-title { background: #f0f0f0; padding: 5px 10px; font-weight: bold; border-left: 4px solid #333; margin-bottom: 15px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .data-item { margin-bottom: 5px; }
        .data-item strong { display: inline-block; width: 150px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f9f9f9; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; border-top: 1px solid #ccc; padding-top: 20px; }
        .signature-box { margin-top: 50px; display: flex; justify-content: space-around; }
        .signature-line { border-top: 1px solid #000; width: 250px; text-align: center; padding-top: 5px; }
        
        @media print {
            body { padding: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="text-align: right; margin-bottom: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #1E3A8A; color: white; border: none; cursor: pointer; border-radius: 4px;">🖨️ Imprimir Dossiê</button>
    </div>

    <div class="header">
        <h1>Relatório de Acompanhamento - Jovem Aprendiz</h1>
        <p>Documento comprobatório para fins de fiscalização do Ministério do Trabalho e Emprego (MTE)</p>
        <p>Emitido em: <?= date('d/m/Y H:i') ?></p>
    </div>

    <div class="section">
        <div class="section-title">1. Dados da Empresa Contratante</div>
        <div class="grid">
            <div class="data-item"><strong>Razão Social:</strong> <?= htmlspecialchars($contrato['empresa_nome']) ?></div>
            <div class="data-item"><strong>CNPJ:</strong> <?= htmlspecialchars($contrato['cnpj']) ?></div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">2. Dados do Aprendiz</div>
        <div class="grid">
            <div class="data-item"><strong>Nome Completo:</strong> <?= htmlspecialchars($contrato['aprendiz_nome']) ?></div>
            <div class="data-item"><strong>CPF:</strong> <?= htmlspecialchars($contrato['cpf']) ?></div>
            <div class="data-item"><strong>RG:</strong> <?= htmlspecialchars($contrato['rg'] ?? 'Não informado') ?></div>
            <div class="data-item"><strong>Data de Nasc.:</strong> <?= $contrato['data_nascimento'] ? date('d/m/Y', strtotime($contrato['data_nascimento'])) : 'Não informada' ?></div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">3. Dados do Programa de Aprendizagem</div>
        <div class="grid">
            <div class="data-item"><strong>Curso Teórico:</strong> <?= htmlspecialchars($contrato['curso_nome']) ?></div>
            <div class="data-item"><strong>Turma:</strong> <?= htmlspecialchars($contrato['turma_nome']) ?></div>
            <div class="data-item"><strong>Início do Contrato:</strong> <?= date('d/m/Y', strtotime($contrato['data_inicio'])) ?></div>
            <div class="data-item"><strong>Término do Contrato:</strong> <?= date('d/m/Y', strtotime($contrato['data_fim'])) ?></div>
            <div class="data-item"><strong>Jornada Prática/Teórica:</strong> Conforme aditivo contratual.</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">4. Desempenho e Frequência (Resumo)</div>
        <div class="grid">
            <div class="data-item"><strong>Total de Aulas:</strong> <?= $total_aulas ?></div>
            <div class="data-item"><strong>Presenças:</strong> <?= $presencas ?></div>
            <div class="data-item"><strong>Faltas:</strong> <?= $total_aulas - $presencas ?></div>
            <div class="data-item"><strong>Índice de Frequência:</strong> <?= $freq_perc ?>% (Mín. exigido: 75%)</div>
            <div class="data-item"><strong>Média Geral (Notas):</strong> <?= count($notas) > 0 ? $media : 'Sem avaliações' ?></div>
            <div class="data-item"><strong>Situação Legal:</strong> <?= $freq_perc >= 75 ? 'Regular' : 'Atenção (Abaixo do mínimo)' ?></div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">5. Histórico de Notas Teóricas</div>
        <?php if (empty($notas)): ?>
            <p>Nenhuma nota registrada até o momento.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Disciplina / Módulo</th>
                        <th style="width: 100px; text-align: center;">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($notas as $n): ?>
                    <tr>
                        <td><?= htmlspecialchars($n['disciplina']) ?></td>
                        <td style="text-align: center;"><?= number_format($n['valor'], 1, ',', '') ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

    <div class="signature-box">
        <div>
            <div class="signature-line">Assinatura da Coordenação (Sophie Link)</div>
        </div>
        <div>
            <div class="signature-line">Assinatura do Representante da Empresa</div>
        </div>
    </div>

    <div class="footer">
        Este documento foi gerado digitalmente pela plataforma Sophie Link e seus dados correspondem aos registros oficiais de frequência e notas lançados pelos docentes responsáveis.
    </div>

</body>
</html>
