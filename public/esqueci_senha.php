<?php
// esqueci_senha.php — Recuperação de Senha | Sophie Link
require_once '../includes/db.php';
$pdo = \Core\Connect::getInstance();

$mensagem = '';
$linkMock = '';
$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    
    if (empty($email)) {
        $erro = "Por favor, digite seu e-mail.";
    } else {
        $stmt = $pdo->prepare("SELECT id, nome FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($usuario) {
            // Gera um token seguro
            $token = bin2hex(random_bytes(32));
            
            // Salva no banco
            $update = $pdo->prepare("UPDATE usuarios SET reset_token = ? WHERE id = ?");
            $update->execute([$token, $usuario['id']]);
            
            $resetLink = "http://" . $_SERVER['HTTP_HOST'] . "/resetar_senha.php?token=" . $token;
            $htmlBody = "<h2>Redefinição de Senha</h2><p>Olá {$usuario['nome']},</p><p>Você solicitou a recuperação de senha. Clique no link abaixo para criar uma nova senha:</p><p><a href='{$resetLink}'>{$resetLink}</a></p><p>Se não foi você, ignore este e-mail.</p>";
            
            Mailer::send($email, "Recuperação de Senha - Sophie Link", $htmlBody);
            
            // Simula o envio de e-mail mostrando o link na tela (já que é localhost)
            $mensagem = "Um link de redefinição foi gerado para " . htmlspecialchars($email) . ".";
            $linkMock = "resetar_senha.php?token=" . $token;
        } else {
            $erro = "Não encontramos uma conta com esse endereço de e-mail.";
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
        .recovery-box { background: #fff; width: 100%; max-width: 400px; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); border: 1px solid #E5E7EB; }
        .logo { font-size: 24px; font-weight: 700; color: #FF6B00; text-align: center; margin-bottom: 24px; letter-spacing: -1px; }
        .title { font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 8px; }
        .desc { font-size: 14px; color: #6B7280; text-align: center; margin-bottom: 24px; line-height: 1.5; }
        
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 8px; color: #374151; }
        .form-control { width: 100%; padding: 12px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; transition: 0.2s; }
        .form-control:focus { border-color: #FF6B00; box-shadow: 0 0 0 3px rgba(255,107,0,0.1); }
        
        .btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; background: #111827; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; }
        .btn:hover { background: #374151; }
        
        .alert { padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 20px; text-align: center; }
        .alert-error { background: #FEF2F2; color: #991B1B; border: 1px solid #F87171; }
        .alert-success { background: #ECFCCB; color: #3F6212; border: 1px solid #BEF264; display: flex; flex-direction: column; gap: 10px; }
        
        .mock-email { background: #fff; padding: 10px; border-radius: 6px; border: 1px dashed #BEF264; color: #4D7C0F; word-break: break-all; }
        
        .back-link { display: block; text-align: center; margin-top: 24px; font-size: 13px; color: #6B7280; text-decoration: none; font-weight: 500; }
        .back-link:hover { color: #111827; text-decoration: underline; }
    </style>

    <link rel="stylesheet" href="assets/css/premium.css">
</head>
<body>

<div class="recovery-box">
    <div class="logo">SOPHIE LINK</div>
    <h1 class="title">Esqueceu a senha?</h1>
    <p class="desc">Digite seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.</p>
    
    <?php if ($erro): ?>
        <div class="alert alert-error"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>
    
    <?php if ($mensagem): ?>
        <div class="alert alert-success">
            <div><i data-lucide="mail-check" style="display:inline-block; vertical-align:middle; width:18px;"></i> <?= htmlspecialchars($mensagem) ?></div>
            <div class="mock-email">
                <strong>(Simulação Localhost):</strong> <br>
                <a href="<?= $linkMock ?>" style="color:#0070F3; font-weight:600; text-decoration:underline;">Clique aqui para criar nova senha</a>
            </div>
        </div>
    <?php else: ?>
        <form method="POST">
            <div class="form-group">
                <label class="form-label">E-mail de Cadastro</label>
                <input type="email" name="email" class="form-control" required placeholder="exemplo@sophielink.com.br" autofocus>
            </div>
            <button type="submit" class="btn">Enviar Link de Recuperação</button>
        </form>
    <?php endif; ?>
    
    <a href="login.php" class="back-link">Voltar para o Login</a>
</div>

<script>
lucide.createIcons();
</script>
</body>
</html>
