<?php
// declaracao_print.php — Emissão de Documento Oficial | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || !in_array($_SESSION['usuario_nivel'], ['colaborador', 'coordenadora', 'admin'])) {
    die("Acesso negado.");
}
require_once '../../includes/db.php';

$aluno_id = $_GET['aluno_id'] ?? null;
$tipo = $_GET['tipo'] ?? 'matricula';

if (!$aluno_id) {
    die("ID do aluno não fornecido.");
}

// Buscar dados do aluno
$stmt = $pdo->prepare("SELECT * FROM aprendizes WHERE id = ?");
$stmt->execute([$aluno_id]);
$aluno = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$aluno) {
    die("Aluno não encontrado.");
}

$data_hoje = strftime('%d de %B de %Y', strtotime('today'));
setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'portuguese');
$data_hoje_pt = utf8_encode(strftime('%d de %B de %Y'));

// Fallback manual para português se o setlocale falhar no Windows
$meses = ['', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
$data_hoje_manual = date('d') . ' de ' . $meses[(int)date('m')] . ' de ' . date('Y');

$titulo = "DECLARAÇÃO";
$texto = "";

if ($tipo === 'matricula') {
    $titulo = "DECLARAÇÃO DE MATRÍCULA";
    $texto = "Declaramos para os devidos fins que <strong>" . mb_strtoupper($aluno['nome']) . "</strong>, portador(a) do CPF <strong>" . htmlspecialchars($aluno['cpf']) . "</strong> e RG <strong>" . htmlspecialchars($aluno['rg']) . "</strong>, encontra-se regularmente matriculado(a) e frequentando o curso técnico de <strong>" . mb_strtoupper($aluno['curso']) . "</strong> neste Centro Técnico Profissionalizante no presente semestre letivo.";
} elseif ($tipo === 'frequencia') {
    $titulo = "ATESTADO DE FREQUÊNCIA";
    $texto = "Atestamos para os devidos fins que <strong>" . mb_strtoupper($aluno['nome']) . "</strong>, inscrito(a) sob o CPF <strong>" . htmlspecialchars($aluno['cpf']) . "</strong>, possui frequência regular de 100% no curso de <strong>" . mb_strtoupper($aluno['curso']) . "</strong>, cumprindo com assiduidade a carga horária exigida por esta instituição.";
} else {
    $titulo = "HISTÓRICO PARCIAL";
    $texto = "Certificamos que <strong>" . mb_strtoupper($aluno['nome']) . "</strong> (CPF: " . htmlspecialchars($aluno['cpf']) . ") cursou com aproveitamento os módulos iniciais do curso de <strong>" . mb_strtoupper($aluno['curso']) . "</strong>. O histórico completo detalhado encontra-se em anexo no sistema acadêmico.";
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title><?= $titulo ?> - <?= htmlspecialchars($aluno['nome']) ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        /* CSS Otimizado para Impressão A4 */
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; }
        body { font-family: 'Libre Baskerville', serif; margin: 0; padding: 0; background: #fff; color: #000; -webkit-print-color-adjust: exact; }
        
        .a4-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 25mm 20mm;
            background: white;
            position: relative;
        }

        /* HEADER / TIMBRADO */
        .header { text-align: center; border-bottom: 2px solid #FF6B00; padding-bottom: 15px; margin-bottom: 40px; }
        .logo { font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 800; color: #FF6B00; letter-spacing: -1px; margin-bottom: 5px; }
        .inst-info { font-family: 'Inter', sans-serif; font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 1px; }

        /* CONTENT */
        .doc-title { text-align: center; font-size: 20px; font-weight: 700; text-decoration: underline; margin-bottom: 50px; margin-top: 30px; letter-spacing: 1px; }
        .doc-body { font-size: 14px; line-height: 2.2; text-align: justify; text-indent: 40px; margin-bottom: 60px; }
        
        .doc-date { text-align: right; font-size: 14px; margin-bottom: 80px; }

        /* SIGNATURES */
        .signature-area { display: flex; justify-content: center; margin-top: 60px; }
        .signature-box { text-align: center; width: 60%; }
        .signature-line { border-top: 1px solid #000; margin-bottom: 5px; padding-top: 5px; }
        .signature-name { font-weight: 700; font-family: 'Inter', sans-serif; font-size: 14px; }
        .signature-role { font-family: 'Inter', sans-serif; font-size: 12px; color: #555; }

        /* FOOTER */
        .footer { position: absolute; bottom: 20mm; left: 20mm; right: 20mm; text-align: center; font-family: 'Inter', sans-serif; font-size: 10px; color: #888; border-top: 1px solid #eee; padding-top: 10px; }

        /* HIDE ON PRINT */
        .no-print { display: none; }
        @media screen {
            body { background: #525659; padding: 20px; display: flex; justify-content: center; }
            .a4-page { box-shadow: 0 0 10px rgba(0,0,0,0.5); }
            .no-print { display: block; position: fixed; top: 20px; right: 20px; }
            .btn-print { background: #FF6B00; color: white; border: none; padding: 12px 24px; font-family: 'Inter', sans-serif; font-weight: 600; border-radius: 6px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
            .btn-print:hover { background: #E65C00; }
        }
    </style>

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body onload="window.print()">

    <div class="no-print">
        <button class="btn-print" onclick="window.print()">Imprimir PDF</button>
    </div>

    <div class="a4-page">
        <!-- CABEÇALHO (PAPEL TIMBRADO) -->
        <div class="header">
            <div class="logo">SOPHIE LINK</div>
            <div class="inst-info">Centro Técnico Profissionalizante<br>CNPJ: 45.123.987/0001-99 • Parauapebas, PA</div>
        </div>

        <div class="doc-title"><?= $titulo ?></div>

        <div class="doc-body">
            <?= $texto ?>
        </div>

        <div class="doc-date">
            Parauapebas - PA, <?= $data_hoje_manual ?>.
        </div>

        <div class="signature-area">
            <div class="signature-box">
                <div class="signature-line">
                    <span class="signature-name">COORDENAÇÃO PEDAGÓGICA</span><br>
                    <span class="signature-role">Centro Técnico Sophie Link</span>
                </div>
            </div>
        </div>

        <div class="footer">
            Este documento é válido apenas com a assinatura da coordenação.<br>
            Verifique a autenticidade contatando a secretaria da instituição.
        </div>
    </div>

</body>
</html>
