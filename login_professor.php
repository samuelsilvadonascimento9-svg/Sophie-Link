<?php
// login_professor.php — Página de Login Exclusiva para Professores | Sophie Link
session_start();

if (isset($_SESSION['usuario_id']) && $_SESSION['usuario_nivel'] === 'professor') {
    header('Location: portal_professor.php');
    exit;
}

$erro = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once 'includes/db.php';
    $email = trim($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';

    if (!$email || !$senha) {
        $erro = 'Preencha todos os campos.';
    } else {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            if ($user['nivel'] === 'professor') {
                $_SESSION['usuario_id']    = $user['id'];
                $_SESSION['usuario_nome']  = $user['nome'];
                $_SESSION['usuario_nivel'] = $user['nivel'];
                $_SESSION['empresa_id']    = $user['empresa_id'];
                header('Location: portal_professor.php');
                exit;
            } else {
                $erro = 'Acesso negado. Esta área é exclusiva para o corpo docente.';
            }
        } else {
            $erro = 'E-mail ou senha inválidos.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acesso do Professor — Sophie Link</title>
    <meta name="description" content="Acesse o Portal do Professor do Centro Técnico Profissionalizante Sophie Link.">
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & TOKENS - ESTILO PROFESSOR (Mais Sóbrio / Escuro)
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF6B00;
    --c-primary-d:  #D95A00;
    --c-bg:         #F5F6FA;
    --c-surface:    #FFFFFF;
    --c-border:     #E5E7EB;
    --c-text:       #111827;
    --c-text-2:     #374151;
    --c-text-muted: #6B7280;
    --c-error:      #EF4444;
    --radius:       12px;
    --radius-sm:    8px;
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
}
html { font-size: 16px; }
body {
    font-family: var(--f-body);
    background: var(--c-bg);
    color: var(--c-text);
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    -webkit-font-smoothing: antialiased;
    padding: 2rem;
}
a { text-decoration: none; color: inherit; }

/* ================================================================
   LAYOUT CENTRAL
   ================================================================ */
.login-box {
    width: 100%; max-width: 440px;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    padding: 3rem 2.5rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    position: relative; overflow: hidden;
}

.login-box::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: var(--c-primary);
}

.lb-head { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 2.5rem; }
.lb-icon {
    width: 50px; height: 50px; border-radius: 12px;
    background: rgba(255, 107, 0, 0.1);
    color: var(--c-primary);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
}
.lb-icon i { width: 24px; height: 24px; }
.lb-title { font-family: var(--f-display); font-size: 1.6rem; font-weight: 800; color: var(--c-text); margin-bottom: 4px; }
.lb-sub { font-size: 0.85rem; color: var(--c-text-muted); }

/* Erro */
.lb-error {
    display: flex; align-items: center; gap: 10px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: var(--radius-sm); padding: 12px 14px;
    font-size: 0.82rem; color: var(--c-error); margin-bottom: 1.5rem;
}
.lb-error i { width: 17px; height: 17px; flex-shrink: 0; }

/* Form */
.lb-form { display: flex; flex-direction: column; gap: 1.25rem; }
.lb-field { display: flex; flex-direction: column; gap: 6px; }
.lb-label { font-size: 0.78rem; font-weight: 600; color: var(--c-text-2); }
.lb-input-wrap { position: relative; }
.lb-input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--c-text-muted); }
.lb-input-icon i { width: 18px; height: 18px; }
.lb-input {
    width: 100%; background: var(--c-bg); border: 1.5px solid var(--c-border);
    border-radius: var(--radius-sm); padding: 12px 14px 12px 42px;
    font-family: var(--f-body); font-size: 0.9rem; color: var(--c-text); outline: none; transition: all 0.2s;
}
.lb-input::placeholder { color: var(--c-border); }
.lb-input:focus { border-color: var(--c-primary); box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15); }
.lb-input.err { border-color: var(--c-error); }

.lb-eye {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: var(--c-text-muted); display: flex; transition: color 0.15s;
}
.lb-eye:hover { color: var(--c-text); }
.lb-eye i { width: 18px; height: 18px; }

.lb-submit {
    width: 100%; background: var(--c-primary); color: #fff;
    border: none; border-radius: var(--radius-sm);
    padding: 14px; font-family: var(--f-body); font-size: 0.95rem; font-weight: 700;
    cursor: pointer; transition: background 0.15s, transform 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    margin-top: 0.5rem;
}
.lb-submit:hover { background: var(--c-primary-d); transform: translateY(-1px); }
.lb-submit i { width: 18px; height: 18px; }

.lb-footer { text-align: center; margin-top: 2.5rem; font-size: 0.8rem; color: var(--c-text-muted); }
.lb-footer a { color: var(--c-primary); font-weight: 600; }
.lb-footer a:hover { text-decoration: underline; }
</style>
</head>
<body>

<div class="login-box">
    <div class="lb-head">
        <div class="lb-icon"><i data-lucide="book-open-check"></i></div>
        <div class="lb-title">Portal do Docente</div>
        <div class="lb-sub">Sistema de gestão acadêmica e AVA</div>
    </div>

    <?php if ($erro): ?>
    <div class="lb-error">
        <i data-lucide="alert-circle"></i>
        <?= htmlspecialchars($erro) ?>
    </div>
    <?php endif; ?>

    <form method="POST" action="" class="lb-form" id="login-form">
        <div class="lb-field">
            <label class="lb-label" for="email">E-mail Institucional</label>
            <div class="lb-input-wrap">
                <div class="lb-input-icon"><i data-lucide="mail"></i></div>
                <input type="email" id="email" name="email" class="lb-input <?= $erro ? 'err' : '' ?>" placeholder="prof@sophielink.com.br" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required autocomplete="username">
            </div>
        </div>

        <div class="lb-field">
            <label class="lb-label" for="senha">Senha</label>
            <div class="lb-input-wrap">
                <div class="lb-input-icon"><i data-lucide="lock"></i></div>
                <input type="password" id="senha" name="senha" class="lb-input <?= $erro ? 'err' : '' ?>" placeholder="••••••••" required autocomplete="current-password">
                <button type="button" class="lb-eye" id="toggle-eye">
                    <i data-lucide="eye" id="eye-icon"></i>
                </button>
            </div>
        </div>

        <button type="submit" class="lb-submit" id="login-btn">
            <i data-lucide="log-in"></i> Acessar Portal
        </button>
    </form>

    <div class="lb-footer">
        Precisa de ajuda? <a href="#">Contate a coordenação</a><br><br>
        <a href="index.php">← Voltar ao Início</a>
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
    btn.innerHTML = '<i data-lucide="loader-circle" class="spin"></i> Verificando...';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    lucide.createIcons();
});
</script>
</body>
</html>
