<?php
session_start();
require_once '../includes/db.php';
/** @var \PDO $pdo */

$codigo = trim($_GET['codigo'] ?? '');
$resultado = null;

if (!empty($codigo)) {
    // Busca o certificado no banco
    $stmt = $pdo->prepare("
        SELECT c.*, a.nome as aluno_nome, a.cpf as aluno_cpf 
        FROM certificados c
        JOIN aprendizes a ON c.aprendiz_id = a.id
        WHERE c.codigo = ?
    ");
    $stmt->execute([$codigo]);
    $resultado = $stmt->fetch(\PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificar Certificado — Sophie Link</title>
    <meta name="description" content="Verifique a autenticidade de um certificado emitido pelo Centro Técnico Profissionalizante Sophie Link.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="assets/css/index.css?v=25">
    <style>
        :root {
            --brand: #FF6B00;
            --brand-d: #D95A00;
            --accent: #0A0F1A;
            --bg: #F8F9FB;
        }

        body {
            background-color: var(--bg);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .verify-header {
            background: var(--accent);
            color: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .verify-header a {
            position: absolute;
            left: 24px;
            color: #fff;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            font-size: 0.9rem;
            opacity: 0.8;
            transition: opacity 0.2s;
        }

        .verify-header a:hover {
            opacity: 1;
        }

        .vh-logo {
            font-size: 1.2rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .vh-logo span {
            color: var(--brand);
        }

        .verify-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4rem 1.5rem;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
        }

        .verify-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            padding: 2.5rem;
            width: 100%;
            text-align: center;
            border: 1px solid #E5E7EB;
        }

        .vc-icon {
            width: 64px;
            height: 64px;
            background: #FFF0E6;
            color: var(--brand);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        }

        .vc-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .vc-desc {
            color: #6B7280;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 2rem;
        }

        .search-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .search-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #E5E7EB;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
            transition: all 0.2s;
            outline: none;
            text-align: center;
            letter-spacing: 1px;
        }

        .search-input:focus {
            border-color: var(--brand);
            box-shadow: 0 0 0 4px rgba(255, 107, 0, 0.1);
        }

        .search-btn {
            background: var(--brand);
            color: #fff;
            border: none;
            padding: 14px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .search-btn:hover {
            background: var(--brand-d);
        }

        .result-card {
            margin-top: 2rem;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            text-align: left;
            animation: slideUp 0.4s ease;
        }

        .rc-valid {
            border: 2px solid #10B981;
            background: #fff;
        }

        .rc-valid-head {
            background: #10B981;
            color: #fff;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 1.1rem;
        }

        .rc-invalid {
            border: 2px solid #EF4444;
            background: #fff;
        }

        .rc-invalid-head {
            background: #EF4444;
            color: #fff;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 1.1rem;
        }

        .rc-body {
            padding: 1.5rem;
        }

        .rc-row {
            margin-bottom: 1rem;
            border-bottom: 1px solid #F3F4F6;
            padding-bottom: 1rem;
        }

        .rc-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
        }

        .rc-label {
            font-size: 0.75rem;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .rc-val {
            font-size: 1rem;
            color: #111827;
            font-weight: 500;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>

<body>

    <header class="verify-header">
        <a href="index.php"><i data-lucide="arrow-left"></i> Voltar ao site</a>
        <div class="vh-logo">Sophie <span>Link</span></div>
    </header>

    <main class="verify-container">
        <div class="verify-card">
            <div class="vc-icon"><i data-lucide="shield-check" style="width:32px; height:32px;"></i></div>
            <h1 class="vc-title">Verificação de Autenticidade</h1>
            <p class="vc-desc">Digite o código impresso no verso ou no rodapé do certificado para validar sua autenticidade nos nossos registros.</p>

            <form action="" method="GET" class="search-form">
                <input type="text" name="codigo" class="search-input" placeholder="Ex: SL-2024-000123" value="<?= htmlspecialchars($codigo) ?>" required autocomplete="off">
                <button type="submit" class="search-btn"><i data-lucide="search"></i> Verificar Certificado</button>
            </form>

            <?php if (!empty($codigo)): ?>
                <?php if ($resultado && $resultado['ativo']): ?>
                    <div class="result-card rc-valid">
                        <div class="rc-valid-head"><i data-lucide="check-circle"></i> Certificado Autêntico</div>
                        <div class="rc-body">
                            <div class="rc-row">
                                <div class="rc-label">Aluno(a)</div>
                                <div class="rc-val"><?= htmlspecialchars($resultado['aluno_nome']) ?></div>
                            </div>
                            <div class="rc-row">
                                <div class="rc-label">Curso Concluído</div>
                                <div class="rc-val"><?= htmlspecialchars($resultado['curso']) ?></div>
                            </div>
                            <div class="rc-row" style="display: flex; gap: 2rem;">
                                <div>
                                    <div class="rc-label">Carga Horária</div>
                                    <div class="rc-val"><?= htmlspecialchars($resultado['carga_horaria']) ?> horas</div>
                                </div>
                                <div>
                                    <div class="rc-label">Data de Conclusão</div>
                                    <div class="rc-val"><?= date('d/m/Y', strtotime($resultado['data_conclusao'])) ?></div>
                                </div>
                            </div>
                            <div class="rc-row">
                                <div class="rc-label">Código de Autenticidade</div>
                                <div class="rc-val" style="font-family: monospace; font-size: 1.1rem; color: #059669;"><?= htmlspecialchars($resultado['codigo']) ?></div>
                            </div>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="result-card rc-invalid">
                        <div class="rc-invalid-head"><i data-lucide="x-circle"></i> Certificado Não Encontrado</div>
                        <div class="rc-body">
                            <p style="color: #4B5563; font-size: 0.95rem; line-height: 1.5; margin: 0;">
                                O código <strong><?= htmlspecialchars($codigo) ?></strong> não consta em nossa base de dados como um certificado válido.
                                Verifique se o código foi digitado corretamente, incluindo os traços (ex: SL-2024-XXXX).
                            </p>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </main>

    <script>
        lucide.createIcons();
    </script>
</body>

</html>