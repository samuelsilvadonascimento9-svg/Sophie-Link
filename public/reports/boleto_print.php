<?php
// boleto_print.php — Gerador Simulado de Boleto
session_start();
if (!isset($_SESSION['usuario_id'])) {
    die("Acesso negado.");
}

$mes = $_GET['mes'] ?? 'Atual';
$valor = $_GET['valor'] ?? '299,00';
$vencimento = date('10/m/Y', strtotime('+1 month'));
$aluno = $_SESSION['usuario_nome'] ?? 'Aluno Exemplo';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Boleto Bancário - Sophie Link</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; color: #000; }
        .boleto-container { max-width: 800px; margin: 0 auto; border: 1px solid #000; padding: 2px; }
        .boleto-header { display: flex; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 5px; }
        .b-bank { width: 150px; font-weight: bold; font-size: 24px; border-right: 2px solid #000; }
        .b-code { width: 100px; font-weight: bold; font-size: 20px; text-align: center; border-right: 2px solid #000; }
        .b-linha { flex: 1; text-align: right; font-weight: bold; font-size: 18px; align-self: flex-end; }
        
        .row { display: flex; border-bottom: 1px solid #000; }
        .col { border-right: 1px solid #000; padding: 2px 5px; flex: 1; }
        .col:last-child { border-right: none; }
        .label { font-size: 10px; text-transform: uppercase; margin-bottom: 4px; display: block; }
        .value { font-size: 14px; font-weight: bold; }
        
        .barcode { margin-top: 20px; height: 50px; background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 8px, #fff 8px, #fff 10px); width: 60%; }
        
        @media print {
            body { padding: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 20px; text-align:center;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size:16px; cursor:pointer;">🖨️ Imprimir Boleto</button>
    </div>

    <div class="boleto-container">
        <div class="boleto-header">
            <div class="b-bank">BANCO Sophie</div>
            <div class="b-code">001-9</div>
            <div class="b-linha">00190.00009 00000.000000 00000.000000 0 00000000000000</div>
        </div>
        
        <div class="row">
            <div class="col" style="flex:3;">
                <span class="label">Local de Pagamento</span>
                <span class="value">Pagável em qualquer banco até o vencimento.</span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Vencimento</span>
                <span class="value"><?= $vencimento ?></span>
            </div>
        </div>
        
        <div class="row">
            <div class="col" style="flex:3;">
                <span class="label">Cedente</span>
                <span class="value">SOPHIE LINK EDUCACIONAL LTDA - CNPJ: 00.000.000/0001-00</span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Agência/Código Cedente</span>
                <span class="value">1234/56789-0</span>
            </div>
        </div>

        <div class="row">
            <div class="col" style="flex:1;">
                <span class="label">Data Documento</span>
                <span class="value"><?= date('d/m/Y') ?></span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Número Documento</span>
                <span class="value">REF-<?= strtoupper($mes) ?></span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Espécie Doc</span>
                <span class="value">RC</span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Aceite</span>
                <span class="value">N</span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Data Processamento</span>
                <span class="value"><?= date('d/m/Y') ?></span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">Valor Documento</span>
                <span class="value">R$ <?= $valor ?></span>
            </div>
        </div>
        
        <div class="row" style="min-height: 100px;">
            <div class="col" style="flex:3;">
                <span class="label">Instruções (Texto de Responsabilidade do Cedente)</span>
                <span class="value" style="font-weight:normal; font-size:12px;">
                    - Mensalidade ref. ao mês de <?= htmlspecialchars($mes) ?>.<br>
                    - Após o vencimento cobrar multa de 2% e juros de 1% ao mês.<br>
                    - Não receber após 30 dias de atraso.
                </span>
            </div>
            <div class="col" style="flex:1;">
                <span class="label">(-) Descontos / Abatimentos</span>
                <span class="value"></span>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <span class="label">Sacado</span>
                <span class="value"><?= htmlspecialchars($aluno) ?></span>
            </div>
        </div>
        
        <div class="barcode"></div>
    </div>
    <script>window.print();</script>
</body>
</html>
