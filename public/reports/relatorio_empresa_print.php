<?php
session_start();
if (!isset($_SESSION['usuario_id']) || !in_array($_SESSION['usuario_nivel'], ['admin', 'coordenadora', 'empresa'])) {
    die("Acesso negado.");
}
require_once '../../includes/db.php';
$empresa_id = $_GET['emp_id'] ?? ($_SESSION['empresa_id'] ?? null);
if (!$empresa_id) die("Empresa não especificada.");

$empresa = $pdo->prepare("SELECT nome, cnpj FROM empresas WHERE id = ?");
$empresa->execute([$empresa_id]);
$emp = $empresa->fetch(PDO::FETCH_ASSOC);

$aprendizes = $pdo->prepare("
    SELECT a.nome, a.cpf, c.data_inicio, c.data_fim 
    FROM contratos c 
    JOIN aprendizes a ON c.aprendiz_id = a.id 
    WHERE c.empresa_id = ? AND c.status = 'ativo'
");
$aprendizes->execute([$empresa_id]);
$lista = $aprendizes->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório Mensal - <?= htmlspecialchars($emp['nome']) ?></title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #FF6B00; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #FF6B00; }
        .info { text-align: right; font-size: 14px; color: #666; }
        h2 { text-align: center; margin-bottom: 5px; }
        h4 { text-align: center; color: #666; margin-top: 0; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 14px; }
        th { background-color: #f8f9fa; font-weight: bold; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; }
        @media print {
            body { margin: 0; padding: 20px; }
            .btn-print { display: none; }
        }
        .btn-print { background: #FF6B00; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; font-weight: bold; margin-bottom: 20px; }
    </style>

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>
    <button class="btn-print" onclick="window.print()">Imprimir PDF</button>

    <div class="header">
        <div class="logo">Sophie Link</div>
        <div class="info">
            Data de Emissão: <?= date('d/m/Y') ?><br>
            Programa de Aprendizagem Profissional
        </div>
    </div>

    <h2>Relatório de Aprendizes Ativos</h2>
    <h4>Empresa Parceira: <?= htmlspecialchars($emp['nome']) ?> (CNPJ: <?= htmlspecialchars($emp['cnpj']) ?>)</h4>

    <table>
        <thead>
            <tr>
                <th>Nome do Aprendiz</th>
                <th>CPF</th>
                <th>Início do Contrato</th>
                <th>Fim do Contrato</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($lista as $a): ?>
            <tr>
                <td><?= htmlspecialchars($a['nome']) ?></td>
                <td><?= htmlspecialchars($a['cpf']) ?></td>
                <td><?= date('d/m/Y', strtotime($a['data_inicio'])) ?></td>
                <td><?= date('d/m/Y', strtotime($a['data_fim'])) ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <div class="footer">
        Centro Técnico Profissionalizante Sophie Link - Parauapebas, PA<br>
        Este é um documento gerado automaticamente pelo sistema educacional.
    </div>
</body>
</html>
