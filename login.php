<?php
session_start();
if (isset($_SESSION['usuario_id'])) {
    header("Location: dashboard.php");
    exit;
}
// index.php é a página de login direto — home.php é a landing page pública
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sophie Link — Sistema de Gestão de Aprendizes</title>
    <meta name="description" content="Plataforma profissional de gestão de aprendizes, empresas parceiras, frequência e controle financeiro.">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        /* === RESET E BASE === */
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :root {
            --orange: #FF7A00;
            --orange-hover: #E06C00;
            --orange-glow: rgba(255, 122, 0, 0.25);
            --black: #0A0A0A;
            --surface: #141414;
            --surface2: #1C1C1C;
            --border: rgba(255, 255, 255, 0.07);
            --white: #FFFFFF;
            --muted: #6B6B6B;
        }

        html,
        body {
            height: 100%;
            font-family: 'Inter', sans-serif;
            background: var(--black);
            color: var(--white);
            overflow: hidden;
        }

        /* === PRELOADER === */
        #preloader {
            position: fixed;
            inset: 0;
            background: var(--black);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.6s ease, visibility 0.6s ease;
        }

        #preloader.hide {
            opacity: 0;
            visibility: hidden;
        }

        .preloader-logo {
            font-family: 'Teko', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: 4px;
            color: var(--white);
            animation: preloaderPulse 1.2s ease-in-out infinite;
        }

        .preloader-logo span {
            color: var(--orange);
        }

        @keyframes preloaderPulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.3;
            }
        }

        /* === LAYOUT PRINCIPAL: 2 COLUNAS === */
        .login-wrapper {
            display: grid;
            grid-template-columns: 1fr 520px;
            height: 100vh;
            opacity: 0;
            animation: fadeInPage 0.8s ease 1.5s forwards;
        }

        @keyframes fadeInPage {
            to {
                opacity: 1;
            }
        }

        /* === LADO ESQUERDO — VISUAL / BRAND === */
        .login-visual {
            position: relative;
            overflow: hidden;
            background: var(--surface);
        }

        /* Grade de linhas de fundo estilo tech */
        .login-visual::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(255, 122, 0, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 122, 0, 0.04) 1px, transparent 1px);
            background-size: 60px 60px;
            z-index: 0;
        }

        /* Brilho laranja difuso no centro */
        .login-visual::after {
            content: '';
            position: absolute;
            top: 30%;
            left: 30%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 122, 0, 0.18) 0%, transparent 70%);
            z-index: 0;
            animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes glowPulse {

            0%,
            100% {
                transform: scale(1);
                opacity: 0.8;
            }

            50% {
                transform: scale(1.15);
                opacity: 1;
            }
        }

        .login-visual-content {
            position: relative;
            z-index: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 3rem;
        }

        /* Logo no topo */
        .brand-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-icon {
            width: 44px;
            height: 44px;
            background: var(--orange);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .brand-icon svg {
            color: white;
        }

        .brand-name {
            font-family: 'Teko', sans-serif;
            font-size: 1.8rem;
            font-weight: 600;
            letter-spacing: 2px;
            color: var(--white);
        }

        .brand-name span {
            color: var(--orange);
        }

        /* Headline central */
        .visual-headline {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .visual-eyebrow {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--orange);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .visual-eyebrow::before {
            content: '';
            display: block;
            width: 30px;
            height: 2px;
            background: var(--orange);
        }

        .visual-title {
            font-family: 'Teko', sans-serif;
            font-size: 5.5rem;
            font-weight: 700;
            line-height: 0.9;
            letter-spacing: -2px;
            color: var(--white);
            margin-bottom: 2rem;
        }

        .visual-title em {
            font-style: normal;
            color: var(--orange);
            display: block;
        }

        .visual-description {
            font-size: 0.95rem;
            color: var(--muted);
            max-width: 420px;
            line-height: 1.7;
        }

        /* Stats na parte inferior */
        .visual-stats {
            display: flex;
            gap: 3rem;
            border-top: 1px solid var(--border);
            padding-top: 2rem;
        }


        .stat-number {
            font-family: 'Teko', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--white);
            line-height: 1;
        }

        .stat-number span {
            color: var(--orange);
        }

        .stat-label {
            font-size: 0.75rem;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 4px;
        }

        /* === LADO DIREITO — FORMULÁRIO === */
        .login-panel {
            background: var(--surface);
            border-left: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 3.5rem;
            position: relative;
            overflow: hidden;
        }

        /* Detalhe decorativo laranja no topo */
        .login-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--orange), transparent);
        }

        .panel-tag {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 2.5rem;
        }

        .panel-title {
            font-family: 'Teko', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: -1px;
            color: var(--white);
            line-height: 1;
            margin-bottom: 0.5rem;
        }

        .panel-subtitle {
            font-size: 0.875rem;
            color: var(--muted);
            margin-bottom: 2.5rem;
        }

        /* Campos */
        .field-group {
            margin-bottom: 1.25rem;
        }

        .field-label {
            display: block;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 0.75rem;
        }

        .field-input-wrap {
            position: relative;
        }

        .field-input-wrap .field-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--muted);
            pointer-events: none;
            width: 18px;
            height: 18px;
        }

        .field-input {
            width: 100%;
            background: var(--surface2);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 14px 16px 14px 48px;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            color: var(--white);
            outline: none;
            transition: border-color 0.25s, box-shadow 0.25s;
        }

        .field-input::placeholder {
            color: var(--muted);
        }

        .field-input:focus {
            border-color: var(--orange);
            box-shadow: 0 0 0 3px var(--orange-glow);
        }

        .field-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;
            margin-top: 0.5rem;
        }

        .remember-label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            color: var(--muted);
            cursor: pointer;
        }

        .remember-check {
            width: 16px;
            height: 16px;
            accent-color: var(--orange);
        }

        .forgot-link {
            font-size: 0.8rem;
            color: var(--orange);
            text-decoration: none;
            font-weight: 600;
            transition: opacity 0.2s;
        }

        .forgot-link:hover {
            opacity: 0.75;
        }

        /* Botão de submit */
        .submit-btn {
            width: 100%;
            background: var(--orange);
            border: none;
            border-radius: 8px;
            padding: 16px;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--white);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: background-color 0.2s, transform 0.1s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
        }

        .submit-btn::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255, 255, 255, 0);
            transition: background 0.3s;
        }

        .submit-btn:hover {
            background: var(--orange-hover);
            box-shadow: 0 8px 25px rgba(255, 122, 0, 0.4);
        }

        .submit-btn:active {
            transform: scale(0.98);
        }

        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        /* Alerta de erro */
        #loginAlert {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            padding: 14px 16px;
            font-size: 0.85rem;
            color: #FCA5A5;
            margin-top: 1.25rem;
            display: none;
            animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Rodapé do painel */
        .panel-footer-text {
            text-align: center;
            font-size: 0.75rem;
            color: var(--muted);
            margin-top: 2.5rem;
        }

        /* === RESPONSIVO === */
        @media (max-width: 1024px) {
            .login-wrapper {
                grid-template-columns: 1fr;
            }

            .login-visual {
                display: none;
            }

            .login-panel {
                padding: 2.5rem 2rem;
            }
        }
    </style>
</head>

<body>

    <!-- Preloader -->
    <div id="preloader">
        <div class="preloader-logo"><span>S</span>L</div>
    </div>

    <?php include 'includes/mobile_menu_home.php'; ?>
    <?php include 'includes/navbar_home.php'; ?>

    <!-- Layout Principal -->
    <div class="login-wrapper">

        <!-- COLUNA ESQUERDA: Brand / Visual -->
        <div class="login-visual">
            <div class="login-visual-content">

                <div class="brand-logo">
                    <div class="brand-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <span class="brand-name"><span>Sophie</span> Link</span>
                </div>

                <div class="visual-headline">
                    <div class="visual-eyebrow">Plataforma Profissional</div>
                    <h1 class="visual-title">
                        GESTÃO
                        <em>INTELIGENTE</em>
                        DE APRENDIZES
                    </h1>
                    <p class="visual-description">
                        Centraliza o controle de aprendizes, empresas parceiras, frequência escolar, notas e financeiro em um único sistema profissional.
                    </p>
                </div>

                <div class="visual-stats">
                    <div class="stat-item">
                        <div class="stat-number">300<span>+</span></div>
                        <div class="stat-label">Aprendizes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">49<span>+</span></div>
                        <div class="stat-label">Empresas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">100<span>%</span></div>
                        <div class="stat-label">Digital</div>
                    </div>
                </div>

            </div>
        </div>

        <!-- COLUNA DIREITA: Formulário -->
        <div class="login-panel">

            <div class="panel-tag">Acesso Restrito ao Sistema</div>

            <h2 class="panel-title">Bem-vindo</h2>
            <p class="panel-subtitle">Insira suas credenciais para acessar o painel.</p>

            <form id="loginForm" novalidate>

                <div class="field-group">
                    <label class="field-label" for="email">Usuário</label>
                    <div class="field-input-wrap">
                        <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <input type="text" id="email" name="email" class="field-input" placeholder="admin" autocomplete="username" required>
                    </div>
                </div>

                <div class="field-group">
                    <label class="field-label" for="senha">Senha</label>
                    <div class="field-input-wrap">
                        <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input type="password" id="senha" name="senha" class="field-input" placeholder="••••••••" autocomplete="current-password" required>
                    </div>
                </div>

                <div class="field-footer">
                    <label class="remember-label">
                        <input type="checkbox" class="remember-check"> Lembrar-me
                    </label>
                    <a href="#" class="forgot-link">Esqueceu a senha?</a>
                </div>

                <button type="submit" class="submit-btn" id="submitBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Entrar no Sistema
                </button>

                <div id="loginAlert"></div>
            </form>

            <div class="panel-footer-text">
                Sophie Link &copy; <?= date('Y') ?> — Todos os direitos reservados.
            </div>

        </div>
    </div>

    <script>
        // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hide');
            }, 900);
        });

        // Login Form
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;
            const alertEl = document.getElementById('loginAlert');
            const btn = document.getElementById('submitBtn');

            if (!email || !senha) {
                alertEl.textContent = 'Preencha todos os campos.';
                alertEl.style.display = 'block';
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Verificando...';
            alertEl.style.display = 'none';

            try {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('senha', senha);

                const res = await fetch('backend/api/auth/login.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();

                if (data.success) {
                    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Redirecionando...';
                    btn.style.background = '#16a34a';
                    setTimeout(() => window.location.href = 'dashboard.php', 700);
                } else {
                    alertEl.textContent = data.message || 'Credenciais inválidas. Tente novamente.';
                    alertEl.style.display = 'block';
                    btn.disabled = false;
                    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Entrar no Sistema';
                }
            } catch {
                alertEl.textContent = 'Erro de conexão com o servidor.';
                alertEl.style.display = 'block';
                btn.disabled = false;
                btn.innerHTML = 'Entrar no Sistema';
            }
        });
    </script>

    <style>
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    </style>
</body>

</html>