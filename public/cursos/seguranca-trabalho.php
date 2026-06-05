<?php
// Segurança do Trabalho — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Segurança do Trabalho | Inspeção Sophie Link</title>
    <meta name="description" content="Curso de Segurança do Trabalho. Previna acidentes e salve vidas.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦺</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/seg-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body>

    <div class="seg-stripe-top"></div>

    <nav class="seg-nav">
        <a href="../index.php" class="seg-nav-logo">
            <img src="../assets/images/logoNome.png" alt="Sophie Link">
        </a>
        <div class="seg-nav-links">
            <a href="#form">[ RELATÓRIO ]</a>
            <a href="#checklist">[ CHECKLIST ]</a>
        </div>
        <a href="../index.php#fale-conosco" class="seg-btn">Emitir Matrícula</a>
    </nav>

    <section class="seg-hero">
        <div class="seg-clipboard" id="form">
            <div class="seg-clip-top">
                <div class="seg-clip-hole"></div>
            </div>

            <div class="seg-form-header">
                <div class="seg-form-title">
                    <h1>Segurança<br>do Trabalho</h1>
                    <p>FORMULÁRIO DE TREINAMENTO OBRIGATÓRIO TST-01</p>
                </div>
                <div class="seg-form-meta">
                    <div>DATA: <?= date('d/m/Y') ?></div>
                    <div>STATUS: <span class="box">APROVADO PARA INÍCIO</span></div>
                </div>
            </div>

            <div class="seg-form-body">
                <p class="seg-desc">Em áreas de mineração e indústria pesada, a vida humana é o ativo mais valioso. O Técnico em Segurança do Trabalho é a autoridade máxima na prevenção de acidentes, inspecionando áreas de risco, emitindo permissões de trabalho (PT) e garantindo que todos voltem para casa em segurança.</p>

                <div class="seg-checklist-title">Checklist de Competências (NRs)</div>

                <div class="seg-check-grid" id="checklist">
                    <div class="seg-check-item">
                        <div class="seg-check-box"><i data-lucide="check" stroke-width="4"></i></div>
                        <div class="seg-check-content">
                            <h3>Inspeção de Área</h3>
                            <p>Identificar condições inseguras e atos inseguros no ambiente de mineração e pátios industriais.</p>
                        </div>
                    </div>
                    <div class="seg-check-item">
                        <div class="seg-check-box"><i data-lucide="check" stroke-width="4"></i></div>
                        <div class="seg-check-content">
                            <h3>Gestão de CIPA e SIPAT</h3>
                            <p>Organizar comissões de prevenção e semanas de conscientização obrigatórias por lei.</p>
                        </div>
                    </div>
                    <div class="seg-check-item">
                        <div class="seg-check-box"><i data-lucide="check" stroke-width="4"></i></div>
                        <div class="seg-check-content">
                            <h3>Trabalho em Altura (NR-35)</h3>
                            <p>Emitir permissões, inspecionar cinto de segurança, talabarte e linhas de vida.</p>
                        </div>
                    </div>
                    <div class="seg-check-item">
                        <div class="seg-check-box"><i data-lucide="check" stroke-width="4"></i></div>
                        <div class="seg-check-content">
                            <h3>Espaço Confinado (NR-33)</h3>
                            <p>Medição de gases, ventilação exaustora e resgate em silos e galerias.</p>
                        </div>
                    </div>
                    <div class="seg-check-item">
                        <div class="seg-check-box"><i data-lucide="check" stroke-width="4"></i></div>
                        <div class="seg-check-content">
                            <h3>Primeiros Socorros</h3>
                            <p>Atendimento pré-hospitalar, imobilização e suporte básico de vida no local do acidente.</p>
                        </div>
                    </div>
                    <div class="seg-check-item">
                        <div class="seg-check-box"><i data-lucide="check" stroke-width="4"></i></div>
                        <div class="seg-check-content">
                            <h3>Combate a Incêndio</h3>
                            <p>Classes de fogo, uso de extintores, hidrantes e abandono de área.</p>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 3rem; text-align: center;">
                    <a href="../index.php#fale-conosco" class="seg-btn">Assinar Requerimento de Matrícula</a>
                </div>
            </div>
        </div>
    </section>

    <footer class="seg-footer">
        <p>DEP. DE PREVENÇÃO E SAÚDE OCUPACIONAL - SOPHIE LINK</p>
        <a href="../index.php" style="color:var(--seg-alert);text-decoration:none;display:block;margin-top:1rem;">[ VOLTAR PARA A RECEPÇÃO ]</a>
    </footer>

    <div class="seg-stripe-top"></div>

    <script>
        lucide.createIcons();
    </script>
</body>

</html>