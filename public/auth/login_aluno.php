<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
require_once '../../app/Core/Auth.php';
$csrf_token = Security::generateCsrfToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['force_logout']) || isset($_GET['tipo']))) {
    session_unset();
    session_destroy();
    
    if (isset($_GET['force_logout'])) {
        header("Location: login_aluno.php");
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
            header('Location: ../paineis/portal_empresa.php');
            break;
        case 'professor':
            header('Location: ../paineis/portal_professor.php');
            break;
        case 'colaborador':
            header('Location: ../paineis/portal_colaborador.php');
            break;
        case 'aluno':
            header('Location: ../paineis/portal_aluno.php');
            break;
        default:
            header('Location: ../index.php');
            break;
    }
    exit;
}

$niveis_esperados = ['aluno'];
$tituloLogin = 'Portal do Aluno';
$prefillEmail = 'admin';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once '../../app/Core/Connect.php';
    if (!Security::checkRateLimit(5, 5)) {
        $minutos = Security::getLockoutRemainingMinutes();
        $erro = "Muitas tentativas falhas. Tente novamente em " . $minutos . " minutos.";
    } elseif (!Security::validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $erro = "Sessão expirada ou requisição inválida. Recarregue a página.";
    } else {
    $email = trim($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';

    if (!$email || !$senha) {
        $erro = 'Preencha todos os campos.';
    } else {
        $user = \Models\Usuario::autenticar($email, $senha, $niveis_esperados);

        if ($user) {
            Security::clearLoginAttempts();
            $_SESSION['usuario_id']    = $user['id'];
            $_SESSION['usuario_nome']  = $user['nome'];
            $_SESSION['usuario_nivel'] = $user['nivel'];
            $_SESSION['empresa_id']    = $user['empresa_id'];
            // Verifica se tem redirecionamento pendente
            if (isset($_GET['redirect']) && !empty($_GET['redirect'])) {
                header('Location: ' . filter_var($_GET['redirect'], FILTER_SANITIZE_URL));
                exit;
            }

            switch ($user['nivel']) {
                case 'admin':
                    header('Location: ../admin/dashboard.php');
                    break;
                case 'coordenadora':
                    header('Location: ../admin/painel_academico.php');
                    break;
                case 'empresa':
                    header('Location: ../paineis/portal_empresa.php');
                    break;
                case 'professor':
                    header('Location: ../paineis/portal_professor.php');
                    break;
                case 'colaborador':
                    header('Location: ../paineis/portal_colaborador.php');
                    break;
                case 'aluno':
                    header('Location: ../paineis/portal_aluno.php');
                    break;
                default:
                    header('Location: ../index.php');
                    break;
            }
            exit;
        } else {
            Security::registerFailedLogin();
            $erro = 'E-mail ou senha inválidos para este portal.';
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
    <title>Portal do Aluno — Login</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/login_aluno.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<?php
$emailValue = htmlspecialchars($_POST['email'] ?? $prefillEmail);
$senhaValue = $prefillEmail ? 'admin' : '';
?>
<body>
    <div class="login-container">
        <!-- BRANDING (Left) -->
        <div class="login-branding">
            <div class="brand-top">
                <div class="brand-logo"><img src="../assets/images/image-removebg-preview (1).png" alt="Sophie Link"></div>
                <h1 class="brand-title">O seu futuro<br>começa aqui.</h1>
                <p class="brand-desc">Acompanhe suas notas, frequências, histórico escolar e boletos em um só lugar. Tudo focado no seu aprendizado.</p>
            </div>
            <div class="brand-bottom">
                Portal do Aluno &copy; <?= date('Y') ?>
            </div>
        </div>

        <!-- FORM (Right) -->
        <div class="login-form-area">
            <a href="../index.php" class="lb-back"><i data-lucide="arrow-left"></i> Voltar ao site</a>
            
            <div class="lb-title">Acesse sua conta</div>
            <div class="lb-sub">Bem-vindo(a) de volta, Aluno(a)!</div>

            <?php if ($erro): ?>
            <div class="lb-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
            <?php endif; ?>

            <form method="POST" action="">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
                <div class="lb-field">
                    <label class="lb-label" for="email">Seu E-mail Institucional</label>
                    <div class="lb-input-wrap">
                        <div class="lb-input-icon"><i data-lucide="mail"></i></div>
                        <input type="text" id="email" name="email" class="lb-input <?= $erro ? 'err' : '' ?>" placeholder="admin" value="<?= $emailValue ?>" required>
                    </div>
                </div>

                <div class="lb-field">
                    <label class="lb-label" for="senha">Sua Senha</label>
                    <div class="lb-input-wrap">
                        <div class="lb-input-icon"><i data-lucide="lock"></i></div>
                        <input type="password" id="senha" name="senha" class="lb-input <?= $erro ? 'err' : '' ?>" placeholder="••••••••" value="<?= $senhaValue ?>" required>
                        <button type="button" class="lb-eye" onclick="let i=document.getElementById('senha'); i.type=i.type==='password'?'text':'password';"><i data-lucide="eye"></i></button>
                    </div>
                </div>

                <div class="lb-row">
                    <label class="lb-check"><input type="checkbox" name="lembrar"> Lembrar meus dados</label>
                    <a href="#" class="lb-forgot">Esqueci a senha</a>
                </div>

                <button type="submit" class="lb-submit">Entrar no Portal <i data-lucide="arrow-right"></i></button>
            </form>
        </div>
    </div>
    <script src="../assets/js/toast.js"></script>
    <script src="../assets/js/login.js"></script>
</body>
</html>
