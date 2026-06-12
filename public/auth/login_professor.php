<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
require_once '../../includes/auth.php';
$csrf_token = Security::generateCsrfToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['force_logout']) || isset($_GET['tipo']))) {
    session_unset();
    session_destroy();
    
    if (isset($_GET['force_logout'])) {
        header("Location: login_professor.php");
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
            header('Location: ../portais/ava_professor.php');
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

$niveis_esperados = ['professor'];
$tituloLogin = 'Portal do Professor';
$prefillEmail = '';

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
                Security::safeRedirect($_GET['redirect'] ?? '');
            }

            switch ($user['nivel']) {
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
                    header('Location: ../portais/ava_professor.php');
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
    <title>Portal do Professor — Login</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/auth/login_professor.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<?php
$emailValue = htmlspecialchars($_POST['email'] ?? $prefillEmail);
$senhaValue = $prefillEmail ? 'admin' : '';
?>
<body>
    <div class="prof-wrapper">
        
        <!-- Form Side -->
        <div class="prof-form-side">
            <a href="../index.php" class="lb-back"><i data-lucide="arrow-left"></i> Início</a>
            
            <div class="pf-head">
                <div class="pf-title">Área Docente</div>
                <div class="pf-sub">Acesso restrito a <strong>Professores</strong></div>
            </div>

            <?php if ($erro): ?>
            <div class="lb-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
            <?php endif; ?>

            <form method="POST" action="">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
                <div class="pf-field">
                    <label class="pf-label" for="email">E-mail Institucional</label>
                    <div class="pf-input-wrap">
                        <i data-lucide="mail" class="pf-icon"></i>
                        <input type="text" id="email" name="email" class="pf-input <?= $erro ? 'err' : '' ?>" placeholder="admin" value="<?= $emailValue ?>" required>
                    </div>
                </div>

                <div class="pf-field">
                    <label class="pf-label" for="senha">Senha de Acesso</label>
                    <div class="pf-input-wrap">
                        <i data-lucide="lock" class="pf-icon"></i>
                        <input type="password" id="senha" name="senha" class="pf-input <?= $erro ? 'err' : '' ?>" placeholder="••••••••" value="<?= $senhaValue ?>" required>
                    </div>
                </div>

                <div class="pf-row">
                    <label class="pf-check"><input type="checkbox" name="lembrar"> Lembrar-me</label>
                    <a href="esqueci_senha.php" class="pf-forgot">Recuperar Senha</a>
                </div>

                <button type="submit" class="pf-submit"><i data-lucide="log-in"></i> Acessar Diário</button>
            </form>
        </div>

        <!-- Branding Side -->
        <div class="prof-brand-side">
            <div class="pb-icon"><i data-lucide="book-open"></i></div>
            <div class="pb-title">Gestão<br>Acadêmica</div>
            <div class="pb-desc">Lance frequências, notas e acompanhe o desempenho das suas turmas com praticidade.</div>
        </div>

    </div>
    <script src="../assets/js/toast.js"></script>
    <script src="../assets/js/login.js"></script>
</body>
</html>
