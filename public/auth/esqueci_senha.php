<?php
// esqueci_senha.php — Recuperação de Senha | Sophie Link
require_once '../../app/Core/Connect.php';
require_once '../../app/Core/Security.php';

$pdo = \Core\Connect::getInstance();
$csrfToken = Security::generateCsrfToken();

$mensagem = '';
$linkMock  = '';
$erro      = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Validação CSRF
    if (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Sessão expirada. Recarregue a página e tente novamente.";
    } else {
        $email = trim($_POST['email'] ?? '');
        $nivel = trim($_POST['nivel'] ?? '');

        if (empty($email) || empty($nivel)) {
            $erro = "Por favor, preencha todos os campos.";
        } else {
            $stmt = $pdo->prepare("SELECT id, nome FROM usuarios WHERE email = ? AND nivel = ? AND deleted_at IS NULL");
            $stmt->execute([$email, $nivel]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario) {
                // Invalida tokens antigos deste usuário
                $pdo->prepare("UPDATE password_resets SET usado = 1 WHERE email = ? AND nivel = ?")->execute([$email, $nivel]);

                // Gera novo token seguro com expiração de 1 hora
                $token   = bin2hex(random_bytes(32));
                $expiry  = date('Y-m-d H:i:s', time() + 3600);

                $ins = $pdo->prepare("INSERT INTO password_resets (email, nivel, token, expira_em) VALUES (?, ?, ?, ?)");
                $ins->execute([$email, $nivel, $token, $expiry]);

                $resetLink = "http://" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "/devweb/Sophie-Link/public/auth/resetar_senha.php?token=" . $token;
                $htmlBody  = "
                    <h2 style='color:#FF6B00;'>Redefinição de Senha — Sophie Link</h2>
                    <p>Olá, <strong>{$usuario['nome']}</strong>!</p>
                    <p>Você solicitou a recuperação de senha. Clique no link abaixo para criar uma nova senha:</p>
                    <p><a href='{$resetLink}' style='background:#FF6B00;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;'>Redefinir Senha</a></p>
                    <p style='color:#888;font-size:12px;'>Este link expira em 1 hora. Se não foi você, ignore este e-mail.</p>
                ";

                // Registra no log (simulação localhost) e tenta enviar
                $logMsg = "\n=== RESET DE SENHA ===\nPara: $email\nLink: $resetLink\nExpira: $expiry\n=====================\n";
                error_log($logMsg, 3, __DIR__ . '/../../app/logs/mail.log');

                // Tenta enviar via mail()
                $headers  = "From: Sophie Link <noreply@sophielink.com.br>\r\n";
                $headers .= "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
                @mail($email, "Recuperação de Senha - Sophie Link", $htmlBody, $headers);

                $mensagem = "Instruções enviadas para " . htmlspecialchars($email) . ". Verifique sua caixa de entrada.";
                $linkMock = "resetar_senha.php?token=" . $token;
            } else {
                // Mensagem genérica por segurança (não revela se email existe)
                $mensagem = "Se houver uma conta com esse e-mail, você receberá as instruções em breve.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Senha — Sophie Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F9FAFB; display: flex; justify-content: center; align-items: center; min-height: 100vh; color: #111827; }
        .recovery-box { background: #fff; width: 100%; max-width: 420px; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #E5E7EB; }
        .logo { font-size: 22px; font-weight: 800; color: #FF6B00; text-align: center; margin-bottom: 24px; letter-spacing: -1px; }
        .title { font-size: 20px; font-weight: 700; text-align: center; margin-bottom: 8px; }
        .desc { font-size: 14px; color: #6B7280; text-align: center; margin-bottom: 24px; line-height: 1.5; }
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #374151; }
        .form-control { width: 100%; padding: 11px 14px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; transition: 0.2s; }
        .form-control:focus { border-color: #FF6B00; box-shadow: 0 0 0 3px rgba(255,107,0,0.1); }
        .btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; background: #FF6B00; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; margin-top: 8px; }
        .btn:hover { background: #E65A00; }
        .alert { padding: 14px; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 20px; }
        .alert-error { background: #FEF2F2; color: #991B1B; border: 1px solid #F87171; }
        .alert-success { background: #ECFDF5; color: #065F46; border: 1px solid #6EE7B7; }
        .mock-link { margin-top: 10px; padding: 10px; background: #F0FDF4; border: 1px dashed #6EE7B7; border-radius: 6px; font-size: 12px; word-break: break-all; }
        .mock-link a { color: #059669; font-weight: 600; }
        .back-link { display: block; text-align: center; margin-top: 20px; font-size: 13px; color: #6B7280; text-decoration: none; }
        .back-link:hover { color: #111827; text-decoration: underline; }
        .timer-note { font-size: 11px; color: #9CA3AF; text-align: center; margin-top: 12px; }
    </style>
</head>
<body>

<div class="recovery-box">
    <div class="logo">SOPHIE LINK</div>
    <h1 class="title">Esqueceu a senha?</h1>
    <p class="desc">Informe o tipo de conta e seu e-mail cadastrado. Enviaremos um link para redefinir sua senha.</p>

    <?php if ($erro): ?>
        <div class="alert alert-error"><i data-lucide="alert-circle" style="width:16px;vertical-align:middle;margin-right:6px;"></i><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <?php if ($mensagem): ?>
        <div class="alert alert-success">
            <i data-lucide="mail-check" style="width:16px;vertical-align:middle;margin-right:6px;"></i>
            <?= htmlspecialchars($mensagem) ?>
            <?php if ($linkMock): ?>
                <div class="mock-link">
                    <strong>🔧 Simulação (localhost):</strong><br>
                    <a href="<?= htmlspecialchars($linkMock) ?>">Clique aqui para criar nova senha →</a>
                </div>
            <?php endif; ?>
        </div>
        <a href="login_aluno.php" class="back-link">← Voltar para o Login</a>
    <?php else: ?>
        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
            <div class="form-group">
                <label class="form-label">Tipo de Conta</label>
                <select name="nivel" class="form-control" required>
                    <option value="">Selecione...</option>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                    <option value="colaborador">Colaborador / Secretaria</option>
                    <option value="coordenadora">Coordenação</option>
                    <option value="empresa">Empresa Parceira</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">E-mail de Cadastro</label>
                <input type="email" name="email" class="form-control" required placeholder="exemplo@sophielink.com.br">
            </div>
            <button type="submit" class="btn">
                <i data-lucide="send" style="width:16px;height:16px;"></i> Enviar Link de Recuperação
            </button>
        </form>
        <p class="timer-note">O link de recuperação expira em 1 hora.</p>
        <a href="login_aluno.php" class="back-link">← Voltar para o Login</a>
    <?php endif; ?>
</div>

<script>lucide.createIcons();</script>
</body>
</html>
