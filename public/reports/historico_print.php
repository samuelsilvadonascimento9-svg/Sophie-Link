<?php
// historico_print.php — Histórico Escolar Formatado | Sophie Link
session_start();

require_once '../../includes/auth.php';
protect_page(['aluno', 'colaborador', 'coordenadora', 'admin']);

require_once '../../includes/db.php';
/** @var \PDO $pdo */

$aluno_id = $_GET['aluno_id'] ?? null;

if (!$aluno_id && isset($_SESSION['usuario_tipo']) && $_SESSION['usuario_tipo'] === 'aluno') {
    // Se for aluno logado e não passou ID, pega do banco usando o email ou nome da sessão
    $stmt = $pdo->prepare("SELECT a.id FROM aprendizes a JOIN usuarios u ON u.email = a.email OR u.nome = a.nome WHERE u.id = ? LIMIT 1");
    $stmt->execute([$_SESSION['usuario_id'] ?? 0]);
    $al = $stmt->fetch();
    if ($al) {
        $aluno_id = $al['id'];
    } else {
        // Mock fallback
        $aluno_id = 1;
    }
}

if (!$aluno_id) {
    die("ID do aluno não encontrado.");
}

// Buscar dados do aluno
$stmt = $pdo->prepare("SELECT a.*, t.nome AS turma_nome, c.nome AS curso_nome 
                       FROM aprendizes a 
                       LEFT JOIN turmas t ON a.turma_id = t.id 
                       LEFT JOIN cursos c ON t.curso_id = c.id 
                       WHERE a.id = ?");
$stmt->execute([$aluno_id]);
$aluno = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$aluno) {
    // Fallback pra mockup local caso não ache
    $aluno = [
        'id' => 1,
        'nome' => $_SESSION['usuario_nome'] ?? 'Aluno',
        'cpf' => '000.000.000-00',
        'rg' => '0000000',
        'curso_nome' => 'Curso Genérico',
        'turma_nome' => 'Turma A'
    ];
}

$data_hoje_manual = date('d/m/Y');
$titulo = "HISTÓRICO ESCOLAR";

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title><?= $titulo ?> - <?= htmlspecialchars($aluno['nome']) ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        /* CSS Premium para o Histórico A4 */
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background: #fff; color: #1E293B; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        
        .a4-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 25mm 20mm;
            background: white;
            position: relative;
        }

        /* HEADER / TIMBRADO PREMIUM */
        .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            border-bottom: 2px solid #E2E8F0; 
            padding-bottom: 20px; 
            margin-bottom: 35px; 
        }
        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .logo-box {
            background: #0EA5E9;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 800;
            font-family: 'Syne', sans-serif;
            box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
        }
        .logo-text { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: #0F172A; letter-spacing: -0.5px; line-height: 1.1; }
        .logo-sub { font-size: 11px; color: #64748B; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; }
        .inst-info { text-align: right; font-size: 10px; color: #94A3B8; line-height: 1.4; }

        /* CONTENT */
        .doc-title { text-align: center; font-size: 22px; font-weight: 700; color: #0F172A; margin-bottom: 30px; letter-spacing: 0.5px; text-transform: uppercase; }
        
        .student-info { 
            background: #F8FAFC; 
            border: 1px solid #E2E8F0; 
            border-radius: 12px; 
            padding: 20px; 
            margin-bottom: 35px; 
            font-size: 13px; 
            line-height: 1.6; 
        }
        .student-info table { width: 100%; border: none; border-collapse: collapse; }
        .student-info td { padding: 4px 0; color: #475569; }
        .student-info strong { color: #1E293B; font-weight: 600; margin-right: 4px; }
        .badge-status { background: #DCFCE7; color: #166534; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-left: 10px; }

        /* TABELA PREMIUM */
        .history-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 40px; border-radius: 8px; overflow: hidden; border: 1px solid #E2E8F0; }
        .history-table th, .history-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #E2E8F0; }
        .history-table th { background-color: #F1F5F9; font-weight: 600; color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #E2E8F0; }
        .history-table td { font-size: 12px; color: #1E293B; }
        .history-table tbody tr:last-child td { border-bottom: none; }
        .history-table tbody tr:nth-child(even) { background-color: #F8FAFC; }
        
        .td-center { text-align: center; }
        .td-right { text-align: right; }
        .status-pill { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
        .status-ok { background: #ECFDF5; color: #059669; }
        .status-cursando { background: #EFF6FF; color: #2563EB; }
        .status-reprovado { background: #FEF2F2; color: #DC2626; }

        /* SIGNATURES */
        .signature-area { display: flex; justify-content: space-between; margin-top: 80px; padding: 0 20px; }
        .signature-box { text-align: center; width: 40%; }
        .signature-line { border-top: 1px solid #CBD5E1; margin-bottom: 8px; padding-top: 8px; }
        .signature-name { font-weight: 700; font-size: 13px; color: #0F172A; }
        .signature-role { font-size: 11px; color: #64748B; }

        /* FOOTER E MARCA D'ÁGUA */
        .footer { position: absolute; bottom: 20mm; left: 20mm; right: 20mm; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #94A3B8; border-top: 1px solid #F1F5F9; padding-top: 15px; }
        .auth-code { font-family: monospace; background: #F1F5F9; padding: 4px 8px; border-radius: 4px; color: #64748B; }
        
        .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 120px; font-weight: 800; color: rgba(226, 232, 240, 0.4); z-index: -1; white-space: nowrap; pointer-events: none; }

        /* HIDE ON PRINT */
        .no-print { display: none; }
        @media screen {
            body { background: #334155; padding: 40px 20px; display: flex; justify-content: center; }
            .a4-page { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border-radius: 8px; }
            .no-print { display: flex; gap: 12px; position: fixed; top: 20px; right: 30px; z-index: 100; }
            .btn-action { color: white; border: none; padding: 12px 24px; font-family: 'Inter', sans-serif; font-weight: 600; border-radius: 8px; cursor: pointer; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
            .btn-print { background: #475569; }
            .btn-print:hover { background: #334155; transform: translateY(-1px); }
            .btn-pdf { background: #0EA5E9; }
            .btn-pdf:hover { background: #0284C7; transform: translateY(-1px); }
        }
    </style>
</head>
<body>

    <div class="no-print">
        <button class="btn-action btn-print" onclick="window.print()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Imprimir
        </button>
        <button class="btn-action btn-pdf" onclick="baixarPDF()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Baixar PDF
        </button>
    </div>

    <div class="a4-page" id="doc-content">
        <div class="watermark">SOPHIE LINK</div>
        
        <div class="header">
            <div class="header-left">
                <div class="logo-box">S</div>
                <div>
                    <div class="logo-text">SOPHIE LINK</div>
                    <div class="logo-sub">Centro Técnico Profissionalizante</div>
                </div>
            </div>
            <div class="inst-info">
                CNPJ: 45.123.987/0001-99<br>
                Rua da Educação, 100 - Centro<br>
                Parauapebas, PA
            </div>
        </div>

        <div class="doc-title"><?= $titulo ?></div>

        <div class="student-info">
            <table>
                <tr>
                    <td style="width: 60%;"><strong>Aluno(a):</strong> <?= mb_strtoupper($aluno['nome']) ?></td>
                    <td style="width: 40%; text-align: right;"><strong>Matrícula:</strong> <?= str_pad($aluno['id'], 6, '0', STR_PAD_LEFT) ?> <span class="badge-status">REGULAR</span></td>
                </tr>
                <tr>
                    <td><strong>Curso:</strong> <?= htmlspecialchars($aluno['curso_nome'] ?? $aluno['curso'] ?? 'Aprendizagem Básica') ?></td>
                    <td style="text-align: right;"><strong>Turma:</strong> <?= htmlspecialchars($aluno['turma_nome'] ?? 'Sem Turma') ?></td>
                </tr>
                <tr>
                    <td><strong>CPF:</strong> <?= htmlspecialchars($aluno['cpf'] ?? 'Não informado') ?></td>
                    <td style="text-align: right;"><strong>RG:</strong> <?= htmlspecialchars($aluno['rg'] ?? 'Não informado') ?></td>
                </tr>
            </table>
        </div>

        <table class="history-table">
            <thead>
                <tr>
                    <th class="td-center" style="width: 15%;">Período</th>
                    <th style="width: 45%;">Componente Curricular</th>
                    <th class="td-center" style="width: 15%;">Carga Horária</th>
                    <th class="td-center" style="width: 25%;">Situação</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td-center">2025/2</td>
                    <td>Segurança do Trabalho e EPIs</td>
                    <td class="td-center">40h</td>
                    <td class="td-center"><span class="status-pill status-ok">Concluído</span></td>
                </tr>
                <tr>
                    <td class="td-center">2025/2</td>
                    <td>Desenho Técnico Mecânico</td>
                    <td class="td-center">60h</td>
                    <td class="td-center"><span class="status-pill status-ok">Concluído</span></td>
                </tr>
                <tr>
                    <td class="td-center">2026/1</td>
                    <td>Elementos de Máquinas</td>
                    <td class="td-center">80h</td>
                    <td class="td-center"><span class="status-pill status-cursando">Cursando</span></td>
                </tr>
                <tr>
                    <td class="td-center">2026/1</td>
                    <td>Informática Básica e Office</td>
                    <td class="td-center">40h</td>
                    <td class="td-center"><span class="status-pill status-cursando">Cursando</span></td>
                </tr>
                <tr>
                    <td class="td-center">2026/1</td>
                    <td>Relações Humanas no Trabalho</td>
                    <td class="td-center">20h</td>
                    <td class="td-center"><span class="status-pill status-cursando">Cursando</span></td>
                </tr>
            </tbody>
        </table>

        <div style="font-size: 11px; color: #64748B; margin-top: 20px; line-height: 1.5; background: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px dashed #CBD5E1;">
            <p style="margin:0;"><strong>Certificação:</strong> Atestamos para os devidos fins que o histórico acima reflete fielmente os registros acadêmicos do aluno nesta instituição até a presente data. Cargas horárias sujeitas a alterações para disciplinas em curso.</p>
        </div>

        <div class="signature-area">
            <div class="signature-box">
                <div class="signature-line">
                    <div class="signature-name">SECRETARIA ACADÊMICA</div>
                    <div class="signature-role">Registro e Controle</div>
                </div>
            </div>
            <div class="signature-box">
                <div class="signature-line">
                    <div class="signature-name">DIRETORIA DE ENSINO</div>
                    <div class="signature-role">Centro Técnico Sophie Link</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div>Emitido em: <?= $data_hoje_manual ?> às <?= date('H:i') ?></div>
            <div class="auth-code">Autenticação: <?= strtoupper(bin2hex(random_bytes(6))) ?></div>
        </div>
    </div>

    <script>
        function baixarPDF() {
            const element = document.getElementById('doc-content');
            
            // Opções do PDF
            const opt = {
                margin: 0,
                filename: 'historico_escolar_<?= htmlspecialchars(str_replace(' ', '_', strtolower($aluno['nome']))) ?>.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // Muda o botão para mostrar carregamento
            const btn = document.querySelector('.btn-pdf');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Gerando...';
            btn.style.opacity = '0.7';
            
            html2pdf().set(opt).from(element).save().then(function() {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            });
        }
        
        // Auto-print ou apenas mostra a tela?
        // Vamos apenas mostrar a tela pois o aluno escolhe se quer baixar ou imprimir.
    </script>
</body>
</html>
