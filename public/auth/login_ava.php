<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
require_once '../../app/Core/Auth.php';
$csrf_token = Security::generateCsrfToken();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['force_logout']) || isset($_GET['tipo']))) {
    session_unset();
    session_destroy();
    
    if (isset($_GET['force_logout'])) {
        header("Location: login_ava.php");
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
            header('Location: ../portais/ava.php');
            break;
        default:
            header('Location: ../index.php');
            break;
    }
    exit;
}

$niveis_esperados = ['aluno', 'professor'];
$tituloLogin = 'Ambiente Virtual (AVA)';
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
                    header('Location: ../portais/empresa.php');
                    break;
                case 'professor':
                    header('Location: ../portais/ava_professor.php');
                    break;
                case 'colaborador':
                    header('Location: ../portais/colaborador.php');
                    break;
                case 'aluno':
                    header('Location: ../portais/ava.php');
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
    <title>Ambiente Virtual de Aprendizagem (AVA)</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../assets/css/auth/login_ava.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<?php
$emailValue = htmlspecialchars($_POST['email'] ?? $prefillEmail);
$senhaValue = $prefillEmail ? 'admin' : '';
?>
<body>
    <header class="ava-navbar">
        <div class="ava-brand">
            <img src="../assets/images/image-removebg-preview (1).png" alt="Sophie Link">
            <span class="ava-brand-text">AVA</span>
        </div>
        <a href="../index.php" class="ava-back"><i data-lucide="arrow-left" style="width:16px;"></i> Voltar ao portal principal</a>
    </header>

    <main class="ava-main">
        <div class="ava-left">
            <div class="ava-tag"><i data-lucide="play-circle" style="width:14px;"></i> Plataforma Digital</div>
            <h1 class="ava-title">Sua sala de aula <span>em qualquer lugar.</span></h1>
            <p class="ava-desc">Acesse suas disciplinas, participe dos fóruns de discussão, baixe materiais de apoio e entregue trabalhos diretamente pelo Ambiente Virtual de Aprendizagem da Sophie Link.</p>
            
            <div class="ava-features">
                <div class="ava-feat">
                    <i data-lucide="video"></i>
                    <div>
                        <div class="ava-feat-t">Aulas Integradas</div>
                        <div class="ava-feat-d">Conteúdo digital completo.</div>
                    </div>
                </div>
                <div class="ava-feat">
                    <i data-lucide="message-square"></i>
                    <div>
                        <div class="ava-feat-t">Fóruns</div>
                        <div class="ava-feat-d">Interação com a turma.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ava-right">
            <div class="ava-form-box">
                <div class="ava-fb-title">Entrar no AVA</div>

                <?php if ($erro): ?>
                <div class="lb-error"><i data-lucide="alert-circle" style="width:16px;"></i> <?= htmlspecialchars($erro) ?></div>
                <?php endif; ?>

                <form method="POST" action="">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
                    <div class="av-field">
                        <label class="av-label" for="email">E-mail Acadêmico</label>
                        <input type="text" id="email" name="email" class="av-input <?= $erro ? 'err' : '' ?>" placeholder="admin" value="<?= $emailValue ?>" required>
                    </div>

                    <div class="av-field">
                        <label class="av-label" for="senha">Senha</label>
                        <input type="password" id="senha" name="senha" class="av-input <?= $erro ? 'err' : '' ?>" placeholder="••••••••" value="<?= $senhaValue ?>" required>
                    </div>

                    <div class="av-row">
                        <label class="av-check"><input type="checkbox" name="lembrar"> Manter conectado</label>
                        <a href="#" class="av-forgot">Recuperar senha</a>
                    </div>

                    <button type="submit" class="av-submit">Acessar Minhas Disciplinas</button>
                </form>
            </div>
        </div>
    </main>

    <script src="../assets/js/toast.js"></script>
    <script src="../assets/js/login.js"></script>
</body>
</html>
