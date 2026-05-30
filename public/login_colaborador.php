<?php
// login.php — Página de Login | Centro Técnico Profissionalizante Sophie Link
session_start();

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
            header('Location: admin/dashboard.php');
            break;
        case 'coordenadora':
            header('Location: admin/painel_academico.php');
            break;
        case 'empresa':
            header('Location: portals/portal_empresa.php');
            break;
        case 'professor':
            header('Location: portals/portal_professor.php');
            break;
        case 'colaborador':
            header('Location: portals/portal_colaborador.php');
            break;
        case 'aluno':
            header('Location: portals/portal_aluno.php');
            break;
        default:
            header('Location: index.php');
            break;
    }
    exit;
}

$niveis_esperados = ['colaborador'];
$tituloLogin = 'Portal do Colaborador';
$prefillEmail = '';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once '../includes/db.php';
    $email = trim($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';

    if (!$email || !$senha) {
        $erro = 'Preencha todos os campos.';
    } else {
        // Agora busca filtrando pelo nível esperado
        $placeholders = implode(',', array_fill(0, count($niveis_esperados), '?'));
        $sql = "SELECT * FROM usuarios WHERE email = ? AND nivel IN ($placeholders) AND deleted_at IS NULL LIMIT 1";
        
        $params = array_merge([$email], $niveis_esperados);
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
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
                    header('Location: admin/dashboard.php');
                    break;
                case 'coordenadora':
                    header('Location: admin/painel_academico.php');
                    break;
                case 'empresa':
                    header('Location: portals/portal_empresa.php');
                    break;
                case 'professor':
                    header('Location: portals/portal_professor.php');
                    break;
                case 'colaborador':
                    header('Location: portals/portal_colaborador.php');
                    break;
                case 'aluno':
                    header('Location: portals/portal_aluno.php');
                    break;
                default:
                    header('Location: index.php');
                    break;
            }
            exit;
        } else {
            $erro = 'E-mail ou senha inválidos para este portal.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar — Sophie Link</title>
    <meta name="description" content="Acesse sua conta no Centro Técnico Profissionalizante Sophie Link.">
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & TOKENS
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF6B00;
    --c-primary-d:  #D95A00;
    --c-primary-lt: #FFF0E6;
    --c-bg:         #F5F6FA;
    --c-surface:    #FFFFFF;
    --c-border:     #E5E7EB;
    --c-border-lt:  #F0F1F3;
    --c-text:       #111827;
    --c-text-2:     #374151;
    --c-text-muted: #6B7280;
    --c-error:      #EF4444;
    --c-error-lt:   #FEF2F2;
    --radius:       12px;
    --radius-sm:    8px;
    --shadow:       0 4px 12px rgba(0,0,0,0.08);
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
}
html { font-size: 16px; }
body {
    font-family: var(--f-body);
    background: var(--c-bg);
    color: var(--c-text);
    min-height: 100vh;
    display: flex; flex-direction: column;
    -webkit-font-smoothing: antialiased;
}
a { text-decoration: none; color: inherit; }

/* ================================================================
   LAYOUT: DUAS COLUNAS
   ================================================================ */
.login-wrapper {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
}

/* ================================================================
   LEFT PANEL — info institucional
   ================================================================ */
.login-left {
    background: var(--c-primary);
    display: flex; flex-direction: column;
    padding: 3rem;
    position: relative;
    overflow: hidden;
}
/* grade sutil */
.login-left::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 44px 44px;
    pointer-events: none;
}
/* orb claro */
.login-left::after {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: rgba(255,255,255,0.12);
    border-radius: 50%;
    top: -150px; right: -150px;
    pointer-events: none;
}

.ll-top { position: relative; z-index: 2; }
.ll-brand {
    display: flex; align-items: center; gap: 12px;
}
.ll-brand-mark {
    width: 40px; height: 40px; border-radius: 9px;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--f-display); font-weight: 800; font-size: 1rem; color: #fff;
}
.ll-brand-name { font-family: var(--f-display); font-size: 1.3rem; font-weight: 700; color: #fff; }

.ll-mid {
    position: relative; z-index: 2;
    flex: 1; display: flex; flex-direction: column; justify-content: center;
    padding: 3rem 0;
}
.ll-label {
    font-size: 0.65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 2px;
    color: rgba(255,255,255,0.65);
    margin-bottom: 1rem;
}
.ll-title {
    font-family: var(--f-display);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800; line-height: 1.1;
    color: #fff;
    margin-bottom: 1.25rem;
}
.ll-desc {
    font-size: 0.9rem; line-height: 1.75;
    color: rgba(255,255,255,0.75);
    max-width: 360px;
    margin-bottom: 2.5rem;
}

/* info cards */
.ll-cards { display: flex; flex-direction: column; gap: 10px; }
.ll-card {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: var(--radius); padding: 12px 16px;
    backdrop-filter: blur(8px);
}
.ll-card-icon {
    width: 34px; height: 34px; border-radius: 8px;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    color: #fff;
}
.ll-card-icon i { width: 16px; height: 16px; }
.ll-card-label { font-size: 0.8rem; font-weight: 700; color: #fff; }
.ll-card-sub { font-size: 0.68rem; color: rgba(255,255,255,0.65); margin-top: 1px; }

.ll-bottom {
    position: relative; z-index: 2;
    font-size: 0.72rem; color: rgba(255,255,255,0.5);
}

/* ================================================================
   RIGHT PANEL — formulário
   ================================================================ */
.login-right {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 2rem;
    background: var(--c-surface);
    border-left: 1px solid var(--c-border);
}

.login-box { width: 100%; max-width: 420px; }

.lb-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 0.78rem; font-weight: 600; color: var(--c-text-muted);
    margin-bottom: 2.5rem; transition: color 0.15s;
}
.lb-back:hover { color: var(--c-primary); }
.lb-back i { width: 15px; height: 15px; }

.lb-title {
    font-family: var(--f-display);
    font-size: 1.8rem; font-weight: 800;
    color: var(--c-text); margin-bottom: 6px;
}
.lb-sub { font-size: 0.85rem; color: var(--c-text-muted); margin-bottom: 2rem; }
.lb-sub em { font-style: normal; color: var(--c-primary); font-weight: 600; }

/* Erro */
.lb-error {
    display: flex; align-items: center; gap: 10px;
    background: var(--c-error-lt);
    border: 1px solid rgba(239,68,68,0.25);
    border-left: 3px solid var(--c-error);
    border-radius: var(--radius-sm); padding: 12px 14px;
    font-size: 0.82rem; color: var(--c-error);
    margin-bottom: 1.5rem;
}
.lb-error i { width: 17px; height: 17px; flex-shrink: 0; }

/* Form */
.lb-form { display: flex; flex-direction: column; gap: 1.1rem; }
.lb-field { display: flex; flex-direction: column; gap: 6px; }
.lb-label { font-size: 0.78rem; font-weight: 700; color: var(--c-text-2); }
.lb-input-wrap { position: relative; }
.lb-input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--c-text-muted); }
.lb-input-icon i { width: 16px; height: 16px; }
.lb-input {
    width: 100%;
    background: var(--c-bg);
    border: 1.5px solid var(--c-border);
    border-radius: var(--radius-sm);
    padding: 11px 12px 11px 40px;
    font-family: var(--f-body); font-size: 0.88rem;
    color: var(--c-text); outline: none;
    transition: border-color 0.2s, background 0.2s;
}
.lb-input::placeholder { color: var(--c-text-muted); }
.lb-input:focus { border-color: var(--c-primary); background: #fff; }
.lb-input.err { border-color: var(--c-error); }

.lb-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: var(--c-text-muted); display: flex; align-items: center; transition: color 0.15s;
}
.lb-eye:hover { color: var(--c-text); }
.lb-eye i { width: 16px; height: 16px; }

.lb-row { display: flex; align-items: center; justify-content: space-between; }
.lb-check { display: flex; align-items: center; gap: 7px; cursor: pointer; font-size: 0.78rem; color: var(--c-text-muted); }
.lb-check input { accent-color: var(--c-primary); }
.lb-forgot { font-size: 0.78rem; color: var(--c-text-muted); transition: color 0.15s; }
.lb-forgot:hover { color: var(--c-primary); }

.lb-submit {
    width: 100%;
    background: var(--c-primary); color: #fff;
    border: none; border-radius: var(--radius-sm);
    padding: 13px; font-family: var(--f-body); font-size: 0.92rem; font-weight: 700;
    cursor: pointer; transition: background 0.15s, transform 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    box-shadow: 0 4px 14px rgba(255,107,0,0.25);
    margin-top: 0.5rem;
}
.lb-submit:hover { background: var(--c-primary-d); transform: translateY(-1px); }
.lb-submit i { width: 17px; height: 17px; }

.lb-divider {
    display: flex; align-items: center; gap: 1rem;
    margin: 1.5rem 0 1rem;
    font-size: 0.7rem; color: var(--c-text-muted); font-weight: 600;
}
.lb-divider::before, .lb-divider::after { content: ''; flex: 1; height: 1px; background: var(--c-border); }

.lb-portals { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.lb-portal-btn {
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    padding: 12px 8px; border-radius: var(--radius-sm);
    border: 1.5px solid var(--c-border);
    background: var(--c-bg);
    font-size: 0.7rem; font-weight: 700;
    color: var(--c-text-muted); text-align: center;
    transition: all 0.15s;
}
.lb-portal-btn:hover { border-color: var(--c-primary); color: var(--c-primary); background: var(--c-primary-lt); }
.lb-portal-btn i { width: 20px; height: 20px; }

.lb-footer {
    text-align: center; margin-top: 2rem;
    font-size: 0.72rem; color: var(--c-text-muted);
}
.lb-footer a { color: var(--c-primary); }
.lb-footer a:hover { text-decoration: underline; }

/* ================================================================
   RESPONSIVE
   ================================================================ */
@media (max-width: 768px) {
    .login-wrapper { grid-template-columns: 1fr; }
    .login-left { display: none; }
    .login-right { background: var(--c-surface); border-left: none; }
}
</style>
</head>
<?php
$emailValue = htmlspecialchars($_POST['email'] ?? $prefillEmail);
$senhaValue = $prefillEmail ? '123456' : '';
?>
<body>
<div class="login-wrapper">

    <!-- LEFT PANEL -->
    <div class="login-left">
        <div class="ll-top">
            <a href="index.php" class="ll-brand">
                <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 48px; object-fit: contain;">
            </a>
        </div>

        <div class="ll-mid">
            <div class="ll-label">Sistema Educacional</div>
            <h1 class="ll-title">Bem-vindo ao<br>Centro Técnico</h1>
            <p class="ll-desc">Acesse sua conta para gerenciar aprendizes, acompanhar frequências, notas e relatórios financeiros em tempo real.</p>

            <div class="ll-cards">
                <div class="ll-card">
                    <div class="ll-card-icon"><i data-lucide="graduation-cap"></i></div>
                    <div>
                        <div class="ll-card-label">AVA — Aulas Online</div>
                        <div class="ll-card-sub">Ambiente virtual para professores e alunos</div>
                    </div>
                </div>
                <div class="ll-card">
                    <div class="ll-card-icon"><i data-lucide="check-square"></i></div>
                    <div>
                        <div class="ll-card-label">Frequência & Notas</div>
                        <div class="ll-card-sub">Lançamento diário pelo professor</div>
                    </div>
                </div>
                <div class="ll-card">
                    <div class="ll-card-icon"><i data-lucide="credit-card"></i></div>
                    <div>
                        <div class="ll-card-label">Relatórios Financeiros</div>
                        <div class="ll-card-sub">Controle de pagamentos por empresa</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ll-bottom">
            © <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA
        </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="login-right">
        <div class="login-box">

            <a href="index.php" class="lb-back">
                <i data-lucide="arrow-left"></i> Voltar ao site
            </a>

            <div class="lb-title"><?= htmlspecialchars($tituloLogin) ?></div>
            <div class="lb-sub">Acesso exclusivo para <em><?= htmlspecialchars('Colaborador') ?></em></div>

            <?php if ($erro): ?>
            <div class="lb-error">
                <i data-lucide="alert-circle"></i>
                <?= htmlspecialchars($erro) ?>
            </div>
            <?php endif; ?>

            <form method="POST" action="" class="lb-form" id="login-form">
                    <div class="lb-field">
                        <label class="lb-label" for="email">E-mail</label>
                        <div class="lb-input-wrap">
                            <div class="lb-input-icon"><i data-lucide="mail"></i></div>
                            <input type="text" id="email" name="email"
                                   class="lb-input <?= $erro ? 'err' : '' ?>"
                                   placeholder="seu@email.com"
                                   value="<?= $emailValue ?>"
                                   required autocomplete="username">
                        </div>
                    </div>

                    <div class="lb-field">
                        <label class="lb-label" for="senha">Senha</label>
                        <div class="lb-input-wrap">
                            <div class="lb-input-icon"><i data-lucide="lock"></i></div>
                            <input type="password" id="senha" name="senha"
                                   class="lb-input <?= $erro ? 'err' : '' ?>"
                                   value="<?= $senhaValue ?>"
                                   placeholder="••••••••" required autocomplete="current-password">
                            <button type="button" class="lb-eye" id="toggle-eye">
                                <i data-lucide="eye" id="eye-icon"></i>
                            </button>
                        </div>
                    </div>

                    <div class="lb-row">
                        <label class="lb-check">
                            <input type="checkbox" name="lembrar"> Lembrar-me
                        </label>
                        <a href="esqueci_senha.php" class="lb-forgot">Esqueceu a senha?</a>
                    </div>

                    <button type="submit" class="lb-submit" id="login-btn">
                        <i data-lucide="log-in"></i> Entrar
                    </button>

                </form>

            <div class="lb-footer">
                <a href="index.php">← Início</a> &nbsp;·&nbsp; © <?= date('Y') ?> Sophie Link
            </div>

        </div>
    </div>

</div>

<script>
lucide.createIcons();

const senhaInput = document.getElementById('senha');
const toggleEye  = document.getElementById('toggle-eye');
toggleEye.addEventListener('click', () => {
    const visible = senhaInput.type === 'text';
    senhaInput.type = visible ? 'password' : 'text';
    toggleEye.innerHTML = visible
        ? '<i data-lucide="eye"></i>'
        : '<i data-lucide="eye-off"></i>';
    lucide.createIcons();
});

document.getElementById('login-form').addEventListener('submit', () => {
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<i data-lucide="loader-circle"></i> Verificando...';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    lucide.createIcons();
});
</script>
</body>
</html>