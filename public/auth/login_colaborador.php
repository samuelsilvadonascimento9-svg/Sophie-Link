<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
require_once '../../includes/db.php';
require_once '../../includes/auth.php';
$csrf_token = Security::generateCsrfToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['force_logout']) || isset($_GET['tipo']))) {
    session_unset();
    session_destroy();
    
    if (isset($_GET['force_logout'])) {
        header("Location: login_colaborador.php");
        exit;
    }
}

if (isset($_SESSION['usuario_id'])) {
    $nivel = $_SESSION['usuario_nivel'] ?? '';
    switch ($nivel) {
        case 'admin':
            header('Location: ../admin/dashboard.php');
            break;
        case 'coordenadora':
            header('Location: ../admin/painel_academico.php');
            break;
        case 'empresa':
            header('Location: ../portais/empresa.php');
            break;
        case 'professor':
            header('Location: ../portais/professor.php');
            break;
        case 'colaborador':
            header('Location: ../portais/colaborador.php');
            break;
        case 'aluno':
            header('Location: ../portais/portal_aluno.php');
            break;
        default:
            header('Location: ../index.php');
            break;
    }
    exit;
}

$niveis_esperados = ['colaborador'];
$tituloLogin = 'Portal do Colaborador';
$prefillEmail = 'colaborador';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once '../../app/Controllers/AuthController.php';
    $erro = \Controllers\AuthController::handleLogin($niveis_esperados);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Colaborador — Login</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/auth/login_colaborador.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<?php
$emailValue = htmlspecialchars($_POST['email'] ?? $prefillEmail);
$senhaValue = $prefillEmail ? 'colaborador' : '';
?>
<body>
    <div class="colab-left">
        <div class="colab-form-wrap">
            <a href="../index.php" class="lb-back"><i data-lucide="arrow-left"></i> Voltar</a>
            
            <div class="cf-title">Bem-vindo(a)</div>
            <div class="cf-sub">Acesso restrito à equipe interna.</div>

            <?php if ($erro): ?>
            <div class="lb-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
            <?php endif; ?>

            <form method="POST" action="">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
                <div class="c-field">
                    <label class="c-label" for="email">E-mail Profissional</label>
                    <input type="text" id="email" name="email" class="c-input <?= $erro ? 'err' : '' ?>" placeholder="colaborador" value="<?= $emailValue ?>" required>
                </div>

                <div class="c-field">
                    <label class="c-label" for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" class="c-input <?= $erro ? 'err' : '' ?>" placeholder="••••••••" value="<?= $senhaValue ?>" required>
                </div>

                <div class="c-row">
                    <label class="c-check"><input type="checkbox" name="lembrar"> Continuar conectado</label>
                    <a href="esqueci_senha.php" class="c-forgot">Esqueci a senha</a>
                </div>

                <button type="submit" class="c-submit">Acessar Painel</button>
            </form>
        </div>
    </div>

    <div class="colab-right">
        <div class="cr-icon"><i data-lucide="layers"></i></div>
        <div class="cr-title">Sophie Team Workspace</div>
        <div class="cr-desc">Acesse as ferramentas internas, controle de processos e comunicação da equipe.</div>
    </div>
    <script src="../assets/js/toast.js"></script>
    <script src="../assets/js/login.js"></script>
</body>
</html>
