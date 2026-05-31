<?php // Landing Page Institucional — Centro Técnico Profissionalizante Sophie Link 
session_start();
require_once '../includes/db.php';
/** @var \PDO $pdo */
$msg_contato = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'contato') {
    try {
        $stmt = $pdo->prepare("INSERT INTO mensagens_contato (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)");
        $stmt->execute([$_POST['nome'], $_POST['email'], $_POST['telefone'], $_POST['mensagem']]);
        $msg_contato = "Sua mensagem foi enviada com sucesso! Nossa secretaria entrará em contato em breve.";
    } catch (Exception $e) {
        $msg_contato = "Erro ao enviar mensagem: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centro Técnico Sophie Link — Parauapebas, PA</title>
    <meta name="description" content="Centro Técnico Profissionalizante Sophie Link — Educação técnica de excelência em Parauapebas, PA. Cursos de Eletromecânica, Logística, Segurança do Trabalho e mais.">
    <!-- OpenGraph SEO -->
    <meta property="og:title" content="Centro Técnico Sophie Link">
    <meta property="og:description" content="A melhor escola técnica de Parauapebas com laboratórios modernos e foco na indústria de mineração.">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://i.imgur.com/your-og-image.jpg">
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="assets/css/toast.css?v=10">
    <link rel="stylesheet" href="assets/css/index.css?v=10">

    <link rel="stylesheet" href="assets/css/premium.css?v=10">
</head>

<body>

    <!-- NAV -->
    <nav class="nav">
        <a href="index.php" class="nav-brand">
            <img src="assets/images/logoNome.png" alt="Sophie Link">
        </a>
        <div class="nav-actions">
            <button class="menu-btn" id="menuOpen"><i data-lucide="menu"></i> Menu</button>
        </div>
    </nav>

    <!-- SIDE MENU OVERLAY -->
    <div class="side-overlay" id="sideOverlay"></div>
    <div class="side-menu" id="sideMenu">
        <div class="sm-head">
            <div class="sm-head-brand">
                <div class="sm-head-mark">SL</div>
                <div class="sm-head-name"><span>Sophie</span> Link</div>
            </div>
            <button class="sm-close" id="smClose"><i data-lucide="x"></i></button>
        </div>

        <div class="sm-section">Navegação</div>
        <a href="#institucional" class="sm-link" onclick="toggleMenu()"><i data-lucide="info"></i> Institucional</a>
        <a href="#cursos" class="sm-link" onclick="toggleMenu()"><i data-lucide="book-open"></i> Nossos Cursos</a>
        <a href="#portais" class="sm-link" onclick="toggleMenu()"><i data-lucide="layout-grid"></i> Portais de Acesso</a>
        <a href="#contato" class="sm-link" onclick="toggleMenu()"><i data-lucide="map-pin"></i> Contato</a>

        <div class="sm-section">Portais</div>

        <!-- Accordion: Sou Aluno -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="graduation-cap" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Aluno</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body">
            <a href="login_aluno.php" class="sm-sub-link">Acessar Portal do Aluno</a>
            <a href="login_ava.php" class="sm-sub-link">Acessar Ambiente Virtual (AVA)</a>
        </div>

        <!-- Accordion: Sou Professor -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="user-check" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Professor</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body">
            <a href="login_professor.php" class="sm-sub-link">Acessar Portal do Professor</a>
            <a href="login_ava.php" class="sm-sub-link">Acessar Ambiente Virtual (AVA)</a>
        </div>

        <!-- Accordion: Sou Colaborador -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="briefcase" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Colaborador</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body">
            <a href="login_colaborador.php" class="sm-sub-link">Painel do Colaborador</a>
        </div>

        <!-- Accordion: Nossos Cursos -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="book-open" style="width:16px;height:16px;color:var(--c-text-light);"></i> Nossos Cursos</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body">
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Ensino Médio Integrado</a>
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Eletromecânica</a>
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Seg. do Trabalho</a>
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Administração</a>
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Eletrônica</a>
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Gestão da Qualidade</a>
            <a href="#cursos" class="sm-sub-link" onclick="toggleMenu()">Técnico em Logística</a>
        </div>

        <div class="sm-footer">
            <div class="sm-footer-addr">
                <i data-lucide="map-pin"></i>
                Avenida Amazonas, 64 – Bairro Rio Verde, Parauapebas – PA.
            </div>
        </div>
    </div>



    <section class="hero-carousel" id="heroCarousel">
        <div class="carousel-container">
            <!-- Item 1 -->
            <div class="carousel-item active" data-index="0">
                <img class="bg-image" src="assets/images/ava_hero.png" alt="Profissionais Sophie Link" style="background-color: #1a202c; object-position: center bottom;">
                <div class="banner-overlay"></div>
                <div class="banner-strip">
                    <div class="banner-text animate-text">
                        <div class="hero-tag"><i data-lucide="zap"></i> PRÁTICA</div>
                        <h1>Hoje é dia de <span class="cursive">Transformação</span></h1>
                        <p>O talento de quem transforma o mundo com seu trabalho. Prepare-se para o mercado com quem entende de prática.</p>

                        <div class="hero-actions">
                            <a href="#cursos" class="btn-primary">Ver Cursos</a>
                            <a href="#portais" class="btn-secondary">Acessar Portal</a>
                        </div>
                        <div class="carousel-nav-arrows">
                            <button class="nav-prev" onclick="prevSlide()"><i data-lucide="chevron-left"></i></button>
                            <button class="nav-next" onclick="nextSlide()"><i data-lucide="chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="carousel-item" data-index="1">
                <img class="bg-image" src="assets/images/tech_student_hero.png" alt="Aluna de Tecnologia" style="background-color: #0f172a; object-position: center bottom;">
                <div class="banner-overlay"></div>
                <div class="banner-strip">
                    <div class="banner-text animate-text">
                        <div class="hero-tag"><i data-lucide="code"></i> INOVAÇÃO</div>
                        <h1>Conecte-se ao <span class="cursive">Futuro</span></h1>
                        <p>Domine as tecnologias mais exigidas pelas grandes indústrias e destaque-se no polo tecnológico da região.</p>

                        <div class="hero-actions">
                            <a href="#cursos" class="btn-primary">Ver Cursos</a>
                            <a href="#portais" class="btn-secondary">Acessar Portal</a>
                        </div>
                        <div class="carousel-nav-arrows">
                            <button class="nav-prev" onclick="prevSlide()"><i data-lucide="chevron-left"></i></button>
                            <button class="nav-next" onclick="nextSlide()"><i data-lucide="chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="carousel-item" data-index="2">
                <img class="bg-image" src="assets/images/hero_aprendiz.png" alt="Operador de Máquinas" style="background-color: #27272a; object-position: center bottom;">
                <div class="banner-overlay"></div>
                <div class="banner-strip">
                    <div class="banner-text animate-text">
                        <div class="hero-tag"><i data-lucide="hard-hat"></i> INDÚSTRIA</div>
                        <h1>Força que move <span class="cursive">Resultados</span></h1>
                        <p>Treinamentos pesados e certificações com foco absoluto em segurança e alta produtividade operacional.</p>

                        <div class="hero-actions">
                            <a href="#cursos" class="btn-primary">Ver Cursos</a>
                            <a href="#portais" class="btn-secondary">Acessar Portal</a>
                        </div>
                        <div class="carousel-nav-arrows">
                            <button class="nav-prev" onclick="prevSlide()"><i data-lucide="chevron-left"></i></button>
                            <button class="nav-next" onclick="nextSlide()"><i data-lucide="chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra de Progresso do Autoplay -->
        <div class="carousel-progress">
            <div class="progress-bar" id="heroProgress"></div>
        </div>

        <!-- Script inline do Carousel -->
        <script>
            let currentSlide = 0;
            const slides = document.querySelectorAll('#heroCarousel .carousel-item');
            const totalSlides = slides.length;
            const progressBar = document.getElementById('heroProgress');
            let slideInterval;
            const intervalTime = 6000;

            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                if (index >= totalSlides) currentSlide = 0;
                else if (index < 0) currentSlide = totalSlides - 1;
                else currentSlide = index;
                
                slides[currentSlide].classList.add('active');
                resetProgress();
            }

            function nextSlide() { showSlide(currentSlide + 1); }
            function prevSlide() { showSlide(currentSlide - 1); }

            function resetProgress() {
                clearInterval(slideInterval);
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = `width ${intervalTime}ms linear`;
                    progressBar.style.width = '100%';
                }, 50);

                slideInterval = setInterval(nextSlide, intervalTime);
            }

            document.addEventListener('DOMContentLoaded', () => {
                resetProgress();
            });
        </script>
    </section>

    <!-- Wrapper para o Efeito de Cortina Sobre o Hero -->
    <main class="content-curtain" style="position: relative; z-index: 10; background: #FFF;">

        <div class="hero-stats">
            <div class="hero-stat-item">
                <div class="hero-stat-val">+500</div>
                <div class="hero-stat-lbl">Alunos Formados</div>
            </div>
            <div class="hero-stat-item">
                <div class="hero-stat-val">6</div>
                <div class="hero-stat-lbl">Cursos Técnicos</div>
            </div>
            <div class="hero-stat-item">
                <div class="hero-stat-val">100%</div>
                <div class="hero-stat-lbl">Foco na Prática</div>
            </div>
            <div class="hero-stat-item">
                <div class="hero-stat-val">Parauapebas</div>
                <div class="hero-stat-lbl">No coração do mercado</div>
            </div>
        </div>
        </section>

        <!-- ================================================================
     PORTAIS
     ================================================================ -->
        <section class="section portais-bg" id="portais">
            <div class="container">
                <div class="sec-tag">Acesso Restrito</div>
                <div class="sec-title">Nossos Portais</div>
                <div class="sec-sub">Sistemas dedicados para gestão acadêmica, corporativa e E-learning.</div>

                <div class="portais-grid">
                    <!-- Aluno -->
                    <div class="course-card portal-card-center">
                        <div class="portal-icon pi-aluno">
                            <i data-lucide="graduation-cap" class="lucide-md"></i>
                        </div>
                        <h3 class="portal-card-title">Portal do Aluno</h3>
                        <p class="portal-card-desc">Acompanhe suas notas, faltas, boletins e emita seus documentos escolares.</p>
                        <a href="login_aluno.php" class="btn btn-aluno">Acessar Portal</a>
                    </div>

                    <!-- Professor -->
                    <div class="course-card portal-card-center">
                        <div class="portal-icon pi-prof">
                            <i data-lucide="book-open" class="lucide-md"></i>
                        </div>
                        <h3 class="portal-card-title">Portal do Professor</h3>
                        <p class="portal-card-desc">Lançamento de diários, frequências, notas e acompanhamento de turmas.</p>
                        <a href="login_professor.php" class="btn btn-prof">Acessar Portal</a>
                    </div>

                    <!-- Empresa -->
                    <div class="course-card portal-card-center">
                        <div class="portal-icon pi-emp">
                            <i data-lucide="building" class="lucide-md"></i>
                        </div>
                        <h3 class="portal-card-title">Portal da Empresa</h3>
                        <p class="portal-card-desc">Acompanhamento de aprendizes, frequências, avaliações e faturamento.</p>
                        <a href="login_empresa.php" class="btn btn-emp">Acessar Portal</a>
                    </div>

                    <!-- Colaborador -->
                    <div class="course-card portal-card-center">
                        <div class="portal-icon pi-colab">
                            <i data-lucide="users" class="lucide-md"></i>
                        </div>
                        <h3 class="portal-card-title">Portal do Colaborador</h3>
                        <p class="portal-card-desc">Acesso interno para gestão acadêmica e administrativa da Sophie Link.</p>
                        <a href="login_colaborador.php" class="btn btn-colab">Acessar Portal</a>
                    </div>

                    <!-- Admin -->
                    <div class="course-card portal-card-center">
                        <div class="portal-icon pi-admin">
                            <i data-lucide="shield" class="lucide-md"></i>
                        </div>
                        <h3 class="portal-card-title">Área Administrativa</h3>
                        <p class="portal-card-desc">Acesso gerencial exclusivo da diretoria e TI do Centro Técnico.</p>
                        <a href="login_admin.php" class="btn btn-admin">Acessar Portal</a>
                    </div>

                    <!-- AVA -->
                    <div class="course-card portal-card-center">
                        <div class="portal-icon pi-ava">
                            <i data-lucide="monitor-play" class="lucide-md"></i>
                        </div>
                        <h3 class="portal-card-title">Ambiente Virtual (AVA)</h3>
                        <p class="portal-card-desc">Acesso às aulas online, fóruns de discussão e materiais didáticos.</p>
                        <a href="login_ava.php" class="btn btn-ava">Acessar Portal</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
     PARCEIROS
     ================================================================ -->
        <section class="section reveal">
            <div class="container" style="text-align: center;">
                <div class="sec-tag">Empresas parceiras</div>
                <div class="sec-title">Quem investe no seu futuro</div>
                <div class="sec-sub" style="margin: 0 auto; margin-bottom: 2rem;">Empresas que financiam bolsas integrais para alunos da Sophie Link em Parauapebas.</div>
                <div class="partners-row">
                    <div class="partner-badge"><i data-lucide="building-2"></i> Vale S.A. — Programa Partilhar</div>
                    <div class="partner-badge"><i data-lucide="settings"></i> Sotreq — Instituto Social</div>
                    <div class="partner-badge"><i data-lucide="heart"></i> Comunidade Kolping</div>
                </div>
            </div>
        </section>

        <!-- ================================================================
     CONTATO (FORM)
     ================================================================ -->
        <section class="section portais-bg" id="fale-conosco">
            <div class="container container-sm">
                <div class="sec-tag tag-center">Atendimento</div>
                <div class="sec-title title-center">Fale Conosco</div>
                <div class="sec-sub sub-center">Tem dúvidas sobre matrículas, cursos ou bolsas? Envie-nos uma mensagem.</div>

                <?php if ($msg_contato): ?>
                    <script>
                        document.addEventListener('DOMContentLoaded', () => {
                            const isErr = <?= strpos($msg_contato, 'Erro') !== false ? 'true' : 'false' ?>;
                            Toast.show(<?= json_encode($msg_contato) ?>, isErr ? 'error' : 'success');
                        });
                    </script>
                <?php endif; ?>

                <form method="POST" action="#fale-conosco" class="contact-form">
                    <input type="hidden" name="acao" value="contato">
                    <div class="cf-field">
                        <label class="cf-label">Nome Completo</label>
                        <input type="text" name="nome" class="cf-input" required>
                    </div>
                    <div class="cf-row">
                        <div class="cf-field">
                            <label class="cf-label">E-mail</label>
                            <input type="email" name="email" class="cf-input" required>
                        </div>
                        <div class="cf-field">
                            <label class="cf-label">Telefone / WhatsApp</label>
                            <input type="text" id="telefone" name="telefone" class="cf-input" maxlength="15" placeholder="(94) 90000-0000">
                        </div>
                    </div>
                    <div class="cf-field">
                        <label class="cf-label">Mensagem</label>
                        <textarea name="mensagem" class="cf-textarea" required rows="4"></textarea>
                    </div>
                    <button type="submit" class="btn btn-submit-cf">Enviar Mensagem</button>
                </form>
            </div>
        </section>

        <!-- ================================================================
     FOOTER
     ================================================================ -->
        <footer class="footer" id="contato">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand"><span>Sophie</span> Link</div>
                    <p class="footer-desc">Centro Técnico Profissionalizante comprometido com a formação de jovens para o mercado industrial e de mineração da Região dos Carajás.</p>
                    <div class="footer-addr">
                        <i data-lucide="map-pin"></i>
                        Avenida Amazonas, 64 – Bairro Rio Verde, Parauapebas – PA
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Sistemas</h4>
                    <ul>
                        <li><a href="login_aluno.php">Portal do Aluno</a></li>
                        <li><a href="login_ava.php">Ambiente Virtual (AVA)</a></li>
                        <li><a href="login_admin.php">Área Administrativa</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Institucional</h4>
                    <ul>
                        <li><a href="#institucional">Sobre a Escola</a></li>
                        <li><a href="#cursos">Nossos Cursos</a></li>
                        <li><a href="#fale-conosco">Fale Conosco</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA · Todos os direitos reservados.
            </div>
        </footer>

        <script src="assets/js/toast.js"></script>
        <script src="assets/js/index.js"></script>
</body>

</html>