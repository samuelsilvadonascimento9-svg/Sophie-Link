<?php
// resetar_senha.php — Definição de Nova Senha | Sophie Link
require_once '../../app/Core/Connect.php';

$erro = '';
$sucesso = '';
$token = $_GET['token'] ?? '';

if (empty($token)) {
    $erro = "Token inválido ou não fornecido. Por favor, solicite a recuperação novamente.";
} else {
    // Verifica se o token existe no banco
    $stmt = $pdo->prepare("SELECT id, email FROM usuarios WHERE reset_token = ?");
    $stmt->execute([$token]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        $erro = "Token expirado ou inválido. Solicite um novo link de recuperação.";
    } else {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $senha = $_POST['senha'];
            $confirma = $_POST['confirma'];
            
            if (strlen($senha) < 6) {
                $erro = "A senha deve ter pelo menos 6 caracteres.";
            } elseif ($senha !== $confirma) {
                $erro = "As senhas não coincidem.";
            } else {
                // Atualiza a senha e limpa o token
                $hash = password_hash($senha, PASSWORD_DEFAULT);
                $update = $pdo->prepare("UPDATE usuarios SET senha = ?, reset_token = NULL WHERE id = ?");
                $update->execute([$hash, $usuario['id']]);
                
                $sucesso = "Sua senha foi redefinida com sucesso! Você já pode fazer login.";
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
    <title>Redefinir Senha — Sophie Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F9FAFB; display: flex; justify-content: center; align-items: center; min-height: 100vh; color: #111827; }
        .recovery-box { background: #fff; width: 100%; max-width: 400px; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #E5E7EB; }
        .logo { font-size: 24px; font-weight: 700; color: #FF6B00; text-align: center; margin-bottom: 24px; letter-spacing: -1px; }
        .title { font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 8px; }
        
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 8px; color: #374151; }
        .form-control { width: 100%; padding: 12px; border: 1px solid #D1D5DB; border-radius: 8px; outline: none; font-size: 14px; font-family: 'Inter', sans-serif; transition: 0.2s; }
        .form-control:focus { border-color: #FF6B00; box-shadow: 0 0 0 3px rgba(255,107,0,0.1); }
        
        .btn { display: block; text-align: center; width: 100%; padding: 12px; background: #111827; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: 0.2s; }
        .btn:hover { background: #374151; }
        
        .alert { padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 500; margin-bottom: 20px; text-align: center; line-height: 1.5; }
        .alert-error { background: #FEF2F2; color: #991B1B; border: 1px solid #F87171; }
        .alert-success { background: #ECFCCB; color: #3F6212; border: 1px solid #BEF264; }
    </style>

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>

<div class="recovery-box">
    <div class="logo">SOPHIE LINK</div>
    <h1 class="title">Criar Nova Senha</h1>
    
    <?php if ($erro): ?>
        <div class="alert alert-error">
            <i data-lucide="alert-triangle" style="vertical-align:middle; width:18px; margin-bottom:4px;"></i><br>
            <?= htmlspecialchars($erro) ?>
        </div>
        <a href="esqueci_senha.php" class="btn" style="margin-top:10px; background:#fff; color:#111827; border:1px solid #D1D5DB;">Voltar e tentar novamente</a>
    <?php elseif ($sucesso): ?>
        <div class="alert alert-success">
            <i data-lucide="check-circle" style="vertical-align:middle; width:24px; margin-bottom:8px;"></i><br>
            <?= htmlspecialchars($sucesso) ?>
        </div>
        <a href="login.php" class="btn">Ir para o Login</a>
    <?php else: ?>
        <p style="font-size:14px; color:#6B7280; text-align:center; margin-bottom:24px;">Conta: <strong><?= htmlspecialchars($usuario['email']) ?></strong></p>
        <form method="POST">
            <div class="form-group">
                <label class="form-label">Nova Senha</label>
                <input type="password" name="senha" id="new-password" class="form-control" required placeholder="Mínimo 6 caracteres" autofocus>
                <div style="height: 4px; background: #E5E7EB; margin-top: 8px; border-radius: 2px; overflow: hidden;">
                    <div id="pwd-strength-bar" style="height: 100%; width: 0%; transition: 0.3s;"></div>
                </div>
                <div id="pwd-strength-text" style="font-size: 11px; margin-top: 4px; font-weight: 500; color: #6B7280; text-align: right;">Força da Senha</div>
            </div>
            <div class="form-group">
                <label class="form-label">Confirmar Senha</label>
                <input type="password" name="confirma" class="form-control" required placeholder="Repita a nova senha">
            </div>
            <button type="submit" class="btn">Salvar Alterações</button>
        </form>
    <?php endif; ?>
</div>

<script>
    lucide.createIcons();

    const pwdInput = document.getElementById('new-password');
    const pwdBar = document.getElementById('pwd-strength-bar');
    const pwdText = document.getElementById('pwd-strength-text');

    if(pwdInput) {
        pwdInput.addEventListener('input', function() {
            const val = this.value;
            let strength = 0;
            if(val.length >= 6) strength += 25;
            if(val.length >= 8) strength += 25;
            if(/[A-Z]/.test(val)) strength += 25;
            if(/[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) strength += 25;

            pwdBar.style.width = strength + '%';
            
            if(val.length === 0) {
                pwdBar.style.width = '0%';
                pwdText.innerText = 'Força da Senha';
            } else if(strength <= 25) {
                pwdBar.style.background = '#EF4444';
                pwdText.innerText = 'Fraca';
                pwdText.style.color = '#EF4444';
            } else if(strength <= 50) {
                pwdBar.style.background = '#F59E0B';
                pwdText.innerText = 'Razoável';
                pwdText.style.color = '#F59E0B';
            } else if(strength <= 75) {
                pwdBar.style.background = '#10B981';
                pwdText.innerText = 'Boa';
                pwdText.style.color = '#10B981';
            } else {
                pwdBar.style.background = '#059669';
                pwdText.innerText = 'Forte';
                pwdText.style.color = '#059669';
            }
        });
    }
</script>
</body>
</html>

