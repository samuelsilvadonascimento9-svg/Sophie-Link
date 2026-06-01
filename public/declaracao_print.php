<?php
// declaracao_print.php — Geração de Documento Oficial (PDF/Print)
session_start();
require_once '../includes/auth.php';
// Apenas colab/admin podem emitir docs
protect_page(['colaborador', 'admin', 'coordenadora']);

require_once '../includes/db.php';
/** @var PDO $pdo */

$aluno_id = (int)($_GET['aluno_id'] ?? 0);
$tipo = $_GET['tipo'] ?? 'matricula';

if (!$aluno_id) {
    die("ID de aluno inválido.");
}

$stmt = $pdo->prepare("
    SELECT a.*, e.nome AS empresa_nome, c.data_inicio, c.data_fim 
    FROM aprendizes a
    LEFT JOIN contratos c ON a.id = c.aprendiz_id
    LEFT JOIN empresas e ON c.empresa_id = e.id
    WHERE a.id = ? LIMIT 1
");
$stmt->execute([$aluno_id]);
$aluno = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$aluno) {
    die("Aluno não encontrado.");
}

$tipoDoc = "DECLARAÇÃO DE MATRÍCULA";
$texto = "Declaramos para os devidos fins que <strong>" . htmlspecialchars($aluno['nome']) . "</strong>, portador(a) do CPF <strong>" . htmlspecialchars($aluno['cpf']) . "</strong> e RG <strong>" . htmlspecialchars($aluno['rg']) . "</strong>, está regularmente matriculado(a) no curso de <strong>" . htmlspecialchars($aluno['curso'] ?? 'Aprendizagem Industrial') . "</strong> em nossa instituição.";

if ($tipo === 'frequencia') {
    $tipoDoc = "ATESTADO DE FREQUÊNCIA";
    
    // Contar total de faltas
    $stmtFreq = $pdo->prepare("SELECT COUNT(*) FROM frequencia WHERE aprendiz_id = ? AND status = 'falta'");
    $stmtFreq->execute([$aluno_id]);
    $faltas = $stmtFreq->fetchColumn();
    
    $stmtFreqP = $pdo->prepare("SELECT COUNT(*) FROM frequencia WHERE aprendiz_id = ? AND status = 'presente'");
    $stmtFreqP->execute([$aluno_id]);
    $presencas = $stmtFreqP->fetchColumn();
    
    $texto = "Atestamos para os devidos fins que o aluno <strong>" . htmlspecialchars($aluno['nome']) . "</strong>, portador(a) do CPF <strong>" . htmlspecialchars($aluno['cpf']) . "</strong>, frequentou nossas aulas acumulando <strong>$presencas</strong> presenças e <strong>$faltas</strong> faltas (não justificadas) até a presente data.";
}

if ($aluno['empresa_nome']) {
    $texto .= "<br><br>O(A) aluno(a) encontra-se vinculado(a) à empresa <strong>" . htmlspecialchars($aluno['empresa_nome']) . "</strong>, com vigência de contrato de " . date('d/m/Y', strtotime($aluno['data_inicio'])) . " a " . date('d/m/Y', strtotime($aluno['data_fim'])) . ".";
}

$texto .= "<br><br>Por ser verdade, firmamos a presente declaração.";

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title><?= $tipoDoc ?> - <?= htmlspecialchars($aluno['nome']) ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; color: #111; }
        .page { max-width: 800px; margin: 0 auto; padding: 40px; border: 1px solid #ccc; box-sizing: border-box; }
        .header { display: flex; align-items: center; border-bottom: 2px solid #5b21b6; padding-bottom: 20px; margin-bottom: 40px; }
        .logo { width: 150px; object-fit: contain; }
        .header-info { margin-left: auto; text-align: right; font-size: 13px; color: #555; }
        .title { text-align: center; font-size: 22px; font-weight: 700; margin-bottom: 50px; color: #111; text-decoration: underline; }
        .content { font-size: 16px; line-height: 1.8; text-align: justify; margin-bottom: 80px; }
        .footer { text-align: center; font-size: 14px; margin-top: 80px; }
        .signature-line { width: 300px; border-top: 1px solid #111; margin: 60px auto 10px; }
        
        @media print {
            body { padding: 0; background: #fff; }
            .page { border: none; width: 100%; max-width: none; padding: 20px; }
            .print-btn { display: none; }
        }
        
        .print-btn { display: block; margin: 20px auto; padding: 10px 20px; background: #5b21b6; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Imprimir Documento</button>
    <div class="page">
        <div class="header">
            <img src="assets/images/logo_hd.png" alt="Sophie Link" class="logo">
            <div class="header-info">
                <strong>Centro Técnico Profissionalizante Sophie Link</strong><br>
                Avenida Amazonas, 64 – Bairro Rio Verde<br>
                Parauapebas – PA | CEP 68515-000<br>
                CNPJ: 00.000.000/0001-00
            </div>
        </div>
        
        <div class="title"><?= $tipoDoc ?></div>
        
        <div class="content">
            <?= $texto ?>
        </div>
        
        <div class="footer">
            Parauapebas - PA, <?= date('d \d\e F \d\e Y') ?>.<br>
            
            <div class="signature-line"></div>
            <strong>Secretaria Escolar</strong><br>
            Centro Técnico Sophie Link
        </div>
    </div>
</body>
</html>
