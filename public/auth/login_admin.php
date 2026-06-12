<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
require_once '../../includes/auth.php';
$csrf_token = Security::generateCsrfToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['force_logout']) || isset($_GET['tipo']))) {
    session_unset();
    session_destroy();
    
    if (isset($_GET['force_logout'])) {
        header("Location: login_admin.php");
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

$niveis_esperados = ['admin', 'coordenadora'];
$tituloLogin = 'Área Administrativa';
$prefillEmail = 'admin';

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
    <title>Administração — Login</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/auth/login_admin.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<?php
$emailValue = htmlspecialchars($_POST['email'] ?? $prefillEmail);
$senhaValue = $prefillEmail ? 'admin' : '';
?>
<body>
    <div class="admin-box">
        <div class="ab-head">
            <div class="ab-icon"><i data-lucide="shield-alert"></i></div>
            <div class="ab-title">System Admin</div>
            <div class="ab-sub">Acesso Seguro</div>
        </div>

        <?php if ($erro): ?>
        <div class="lb-error"><i data-lucide="alert-circle" style="width:16px;"></i> <?= htmlspecialchars($erro) ?></div>
        <?php endif; ?>

        <form method="POST" action="">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
            <div class="a-field">
                <label class="a-label" for="email">Admin E-mail</label>
                <div class="a-input-wrap">
                    <i data-lucide="mail" class="a-icon" style="width:16px;"></i>
                    <input type="text" id="email" name="email" class="a-input <?= $erro ? 'err' : '' ?>" placeholder="admin" value="<?= $emailValue ?>" required>
                </div>
            </div>

            <div class="a-field">
                <label class="a-label" for="senha">Master Password</label>
                <div class="a-input-wrap">
                    <i data-lucide="key" class="a-icon" style="width:16px;"></i>
                    <input type="password" id="senha" name="senha" class="a-input <?= $erro ? 'err' : '' ?>" placeholder="••••••••" value="<?= $senhaValue ?>" required>
                </div>
            </div>

            <button type="submit" class="a-submit">Autenticar Sistema</button>
        </form>

        <div class="ab-footer">
            <a href="../index.php"><i data-lucide="arrow-left" style="width:12px; vertical-align:middle;"></i> Voltar para Frontend</a>
        </div>
    </div>
    <script src="../assets/js/toast.js"></script>
    <script src="../assets/js/login.js"></script>
</body>
</html>
