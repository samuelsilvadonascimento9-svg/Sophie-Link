<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
require_once '../../includes/db.php';
require_once '../../includes/auth.php';
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
            <img src="../assets/images/logoNome.png" alt="Sophie Link">
            <span class="ava-brand-text">AVA</span>
        </div>
        <a href="../index.php" class="ava-back"><i data-lucide="arrow-left" style="width:16px;"></i> Voltar ao portal principal</a>
    </header>

    <main class="ava-main">
        <div class="ava-right">
            <div class="ava-form-box">
                <div class="ava-fb-title">Entrar no AVA</div>

                <?php if ($erro): ?>
                <div class="lb-error"><i data-lucide="alert-circle" style="width:16px;"></i> <?= htmlspecialchars($erro) ?></div>
                <?php endif; ?>

                <div class="ava-form-split">
                    <div class="ava-form-left">
                        <div class="scene-wrapper unlit" id="candleScene">
                            <div class="candles">
                                <div class="light__wave"></div>
                                <div class="candle1">
                                    <div class="candle1__body">
                                        <div class="candle1__eyes">
                                            <span class="candle1__eyes-one"></span>
                                            <span class="candle1__eyes-two"></span>
                                        </div>
                                        <div class="candle1__mouth"></div>
                                    </div>
                                    <div class="candle1__stick"></div>
                                </div>
                                <div class="candle2">
                                    <div class="candle2__body">
                                        <div class="candle2__eyes">
                                            <div class="candle2__eyes-one"></div>
                                            <div class="candle2__eyes-two"></div>
                                        </div>
                                    </div>
                                    <div class="candle2__stick"></div>
                                </div>
                                <div class="candle2__fire"></div>
                                <div class="candle__smoke-one"></div>
                                <div class="candle__smoke-two"></div>
                            </div>
                            <div class="floor"></div>
                        </div>
                    </div>

                    <div class="ava-form-right">
                        <form method="POST" action="">
                            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrf_token) ?>">
                            <div class="av-field">
                                <label class="av-label" for="email">E-mail Acadêmico</label>
                                <input type="text" id="email" name="email" class="av-input <?= $erro ? 'err' : '' ?>" placeholder="admin" value="<?= $emailValue ?>" required>
                            </div>

                            <div class="av-field">
                                <label class="av-label" for="senhaAva">Senha</label>
                                <div class="tc-input-row">
                                    <input type="password" id="senhaAva" name="senha" class="av-input tc-pass-input <?= $erro ? 'err' : '' ?>" placeholder="Digite sua senha..." value="<?= $senhaValue ?>" required autocomplete="current-password">
                                    <button type="button" id="tcToggleBtn" class="tc-toggle-btn" title="Mostrar/ocultar senha">
                                        <i data-lucide="eye-off" style="width:18px;height:18px;"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="av-row">
                                <label class="av-check"><input type="checkbox" name="lembrar"> Manter conectado</label>
                                <a href="esqueci_senha.php" class="av-forgot">Recuperar senha</a>
                            </div>

                            <button type="submit" class="av-submit">Acessar Minhas Disciplinas</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="../assets/js/toast.js"></script>
    <script src="../assets/js/login.js"></script>
    <script>
    (function() {
        const toggleBtn = document.getElementById('tcToggleBtn');
        const passInput = document.getElementById('senhaAva');
        const scene     = document.getElementById('candleScene');
        if (!toggleBtn || !passInput || !scene) return;

        let isLit = false;

        toggleBtn.addEventListener('click', () => {
            isLit = !isLit;
            
            if (isLit) {
                passInput.type = 'text';
                toggleBtn.innerHTML = '<i data-lucide="eye" style="width:18px;height:18px;"></i>';
                if (window.lucide) window.lucide.createIcons();

                scene.classList.remove('unlit', 'blowing');
                scene.classList.add('lit');
            } else {
                passInput.type = 'password';
                toggleBtn.innerHTML = '<i data-lucide="eye-off" style="width:18px;height:18px;"></i>';
                if (window.lucide) window.lucide.createIcons();

                scene.classList.add('blowing');

                setTimeout(() => {
                    if (!isLit) {
                        scene.classList.remove('lit');
                        scene.classList.add('unlit');
                    }
                }, 250);

                setTimeout(() => {
                    if (!isLit) {
                        scene.classList.remove('blowing');
                    }
                }, 800);
            }
        });
    })();
    </script>
</body>
</html>
