<?php // Landing Page Institucional — Centro Técnico Profissionalizante Sophie Link 
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
require_once '../includes/db.php';
/** @var \PDO $pdo */
$msg_contato = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'contato') {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        $msg_contato = "Erro: Token de segurança inválido. Tente enviar novamente.";
    } else {
        try {
            $stmt = $pdo->prepare("INSERT INTO mensagens_contato (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)");
            $stmt->execute([$_POST['nome'], $_POST['email'], $_POST['telefone'], $_POST['mensagem']]);
            $msg_contato = "Sua mensagem foi enviada com sucesso! Nossa secretaria entrará em contato em breve.";
        } catch (Exception $e) {
            $msg_contato = "Erro ao enviar mensagem: " . $e->getMessage();
        }
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
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" as="style">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="assets/css/toast.css?v=24">
    <link rel="stylesheet" href="assets/css/index.css?v=24">

    <link rel="stylesheet" href="assets/css/premium.css?v=24">
    <link rel="stylesheet" href="assets/css/chatbot.css?v=7">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Centro Técnico Profissionalizante Sophie Link",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Avenida Amazonas, 64 - Bairro Rio Verde",
                "addressLocality": "Parauapebas",
                "addressRegion": "PA",
                "addressCountry": "BR"
            },
            "telephone": "+55-94-99999-9999"
        }
    </script>
</head>

<body>

    <!-- NAV -->
    <nav class="nav">
        <a href="index.php" class="nav-brand">
            <img src="assets/images/logoNome.png" alt="Sophie Link" style="width: 250px; object-fit: contain;">
        </a>
        <div class="nav-actions">
            <button class="menu-btn" id="menuOpen" aria-label="Abrir menu"><i data-lucide="menu"></i> Menu</button>
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
            <button class="sm-close" id="smClose" aria-label="Fechar menu"><i data-lucide="x"></i></button>
        </div>

        <div class="sm-section">Navegação</div>
        <a href="#institucional" class="sm-link" onclick="toggleMenu()"><i data-lucide="info"></i> Institucional</a>
        <a href="#cursos" class="sm-link" onclick="toggleMenu()"><i data-lucide="book-open"></i> Nossos Cursos</a>
        <a href="#contato" class="sm-link" onclick="toggleMenu()"><i data-lucide="map-pin"></i> Contato</a>

        <div class="sm-section">Serviços</div>
        <a href="verificar-certificado.php" class="sm-link"><i data-lucide="shield-check"></i> Verificar Certificado</a>

        <div class="sm-section">Portais</div>

        <!-- Accordion: Sou Aluno -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)" aria-expanded="false" aria-controls="acc-1">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="graduation-cap" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Aluno</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body" id="acc-1">
            <a href="auth/login_aluno.php" class="sm-sub-link">Acessar Portal do Aluno</a>
            <a href="auth/login_ava.php" class="sm-sub-link">Acessar Ambiente Virtual (AVA)</a>
        </div>

        <!-- Accordion: Sou Professor -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)" aria-expanded="false" aria-controls="acc-2">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="user-check" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Professor</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body" id="acc-2">
            <a href="auth/login_professor.php" class="sm-sub-link">Acessar Portal do Professor</a>
            <a href="auth/login_ava.php" class="sm-sub-link">Acessar Ambiente Virtual (AVA)</a>
        </div>

        <!-- Accordion: Sou Colaborador -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)" aria-expanded="false" aria-controls="acc-3">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="briefcase" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Colaborador</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body" id="acc-3">
            <a href="auth/login_colaborador.php" class="sm-sub-link">Painel do Colaborador</a>
        </div>

        <!-- Accordion: Sou Empresa -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)" aria-expanded="false" aria-controls="acc-4">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="building" style="width:16px;height:16px;color:var(--c-text-light);"></i> Sou Empresa</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body" id="acc-4">
            <a href="auth/login_empresa.php" class="sm-sub-link">Acessar Portal da Empresa</a>
        </div>



        <!-- Accordion: Nossos Cursos -->
        <button class="sm-acc-btn" onclick="toggleAcc(this)" aria-expanded="false" aria-controls="acc-6">
            <span style="display:flex;align-items:center;gap:10px;"><i data-lucide="book-open" style="width:16px;height:16px;color:var(--c-text-light);"></i> Nossos Cursos</span>
            <i data-lucide="chevron-down"></i>
        </button>
        <div class="sm-acc-body" id="acc-6">
            <a href="cursos/administracao.php" class="sm-sub-link">Técnico em Administração</a>
            <a href="cursos/eletrica-industrial.php" class="sm-sub-link">Técnico em Elétrica Industrial</a>
            <a href="cursos/eletro-mecanica.php" class="sm-sub-link">Técnico em Eletromecânica</a>
            <a href="cursos/eletronica.php" class="sm-sub-link">Técnico em Eletrônica</a>
            <a href="cursos/excel-avancado.php" class="sm-sub-link">Excel Avançado e Dashboards</a>
            <a href="cursos/gestao-qualidade.php" class="sm-sub-link">Técnico em Gestão da Qualidade</a>
            <a href="cursos/informatica.php" class="sm-sub-link">Técnico em Informática</a>
            <a href="cursos/logistica.php" class="sm-sub-link">Técnico em Logística</a>
            <a href="cursos/mecanica-pesada.php" class="sm-sub-link">Técnico em Mecânica Pesada</a>
            <a href="cursos/rotinas-adm.php" class="sm-sub-link">Rotinas Adm. e DP</a>
            <a href="cursos/seguranca-trabalho.php" class="sm-sub-link">Técnico em Seg. do Trabalho</a>
        </div>

        <div class="sm-footer">
            <div class="sm-footer-addr">
                <i data-lucide="map-pin"></i>
                Avenida Amazonas, 64 – Bairro Rio Verde, Parauapebas – PA.
            </div>
        </div>
    </div>



    <section class="hero-carousel" id="heroCarousel">

        <!-- Fundo Estático Geométrico (Estilo UNIAENE) -->
        <div class="hero-static-bg">
            <div class="geo-rect-1"></div>
            <div class="geo-rect-2"></div>
            <div class="geo-rect-3"></div>

            <!-- Elementos Flutuantes -->
            <div class="float-box float-box-1">
                <i data-lucide="book-open"></i>
            </div>
            <div class="float-box float-box-2">
                <i data-lucide="sparkles"></i>
            </div>
            <div class="float-box float-box-3">
                <span>SL</span>
            </div>
        </div>

        <div class="carousel-container">
            <!-- Item 1 -->
            <div class="carousel-item active" data-index="0">
                <div class="slide-layout">
                    <div class="slide-text animate-text">
                        <h1 class="hero-title-new">
                            <div class="title-row-1">
                                SUA JORNADA <span class="title-badge">O DIA DA</span>
                                <span class="title-stars">
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                </span>
                            </div>
                            <div class="title-row-2">TRANSFORMAÇÃO!</div>
                        </h1>
                        <p class="hero-subtitle-new">Prepare-se para o mercado de trabalho com uma metodologia que valoriza o aprendizado prático e o talento de quem transforma o mundo.</p>
                    </div>
                    <div class="slide-image-wrapper animate-image">
                        <img src="assets/images/ai_tech_student.png" alt="Painel do ambiente virtual de aprendizagem">
                    </div>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="carousel-item" data-index="1">
                <div class="slide-layout">
                    <div class="slide-text animate-text">
                        <h2 class="hero-title-new">
                            <div class="title-row-1">
                                CONECTE-SE <span class="title-badge">AGORA</span>
                                <span class="title-stars">
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                </span>
                            </div>
                            <div class="title-row-2">AO FUTURO!</div>
                        </h2>
                        <p class="hero-subtitle-new">Domine as tecnologias mais requisitadas pelas grandes indústrias e destaque-se no polo tecnológico de Carajás.</p>
                    </div>
                    <div class="slide-image-wrapper animate-image">
                        <img src="assets/images/tech_student.webp" alt="Estudante de tecnologia segurando um notebook">
                    </div>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="carousel-item" data-index="2">
                <div class="slide-layout">
                    <div class="slide-text animate-text">
                        <h2 class="hero-title-new">
                            <div class="title-row-1">
                                A FORÇA QUE <span class="title-badge">MOVE</span>
                                <span class="title-stars">
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                    <i data-lucide="star" class="fill-star"></i>
                                </span>
                            </div>
                            <div class="title-row-2">RESULTADOS!</div>
                        </h2>
                        <p class="hero-subtitle-new">Treinamentos e certificações de excelência, com foco absoluto na segurança e alta produtividade operacional.</p>
                    </div>
                    <div class="slide-image-wrapper animate-image">
                        <img src="assets/images/aprendiz.webp" alt="Operador da indústria com EPI e capacete de segurança">
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

            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            function prevSlide() {
                showSlide(currentSlide - 1);
            }

            function resetProgress() {
                clearInterval(slideInterval);
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';

                // Só anima se a aba estiver visível
                if (document.visibilityState === 'visible') {
                    setTimeout(() => {
                        progressBar.style.transition = `width ${intervalTime}ms linear`;
                        progressBar.style.width = '100%';
                    }, 50);
                    slideInterval = setInterval(nextSlide, intervalTime);
                }
            }

            document.addEventListener('DOMContentLoaded', () => {
                resetProgress();
            });

            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    resetProgress();
                } else {
                    clearInterval(slideInterval);
                }
            });
        </script>
    </section>

    <!-- Wrapper para o Efeito de Cortina Sobre o Hero -->
    <main class="content-curtain" style="position: relative; z-index: 10; background: #FFF;">

        <!-- ================================================================
             STATS BAR — Contador Animado
             ================================================================ -->
        <section class="stats-bar" id="stats">
            <div class="stats-inner">
                <div class="stat-item">
                    <div class="stat-num" data-target="500" data-prefix="+">0</div>
                    <div class="stat-label">Alunos formados</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-num" data-target="11" data-prefix="">0</div>
                    <div class="stat-label">Cursos técnicos</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-num" data-target="100" data-suffix="%" data-prefix="">0</div>
                    <div class="stat-label">Foco na prática</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <div class="stat-num" data-target="8" data-suffix=" anos" data-prefix="">0</div>
                    <div class="stat-label">De história em Parauapebas</div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             PILARES — Por que a Sophie Link?
             ================================================================ -->
        <section class="section reveal" id="institucional">
            <div class="container">
                <div class="sh-header">
                    <div>
                        <span class="sh-label">Nossa essência</span>
                        <h2 class="sh-title">Por que a Sophie Link?</h2>
                    </div>
                    <p class="sh-sub">Educação técnica com propósito real, preparando jovens para o mercado industrial de Parauapebas e região.</p>
                </div>

                <div class="pillars-grid">
                    <div class="pillar-card reveal">
                        <div class="pillar-icon"><i data-lucide="hard-hat"></i></div>
                        <div class="pillar-body">
                            <h3>Prática Industrial</h3>
                            <p>Laboratórios e treinamentos com equipamentos reais do setor de mineração e eletromecânica.</p>
                        </div>
                    </div>
                    <div class="pillar-card reveal" style="transition-delay:.08s">
                        <div class="pillar-icon"><i data-lucide="building-2"></i></div>
                        <div class="pillar-body">
                            <h3>Parceria com Empresas</h3>
                            <p>Convênios com Vale, Sotreq e Kolping que viabilizam bolsas integrais e inserção direta no mercado.</p>
                        </div>
                    </div>
                    <div class="pillar-card reveal" style="transition-delay:.16s">
                        <div class="pillar-icon"><i data-lucide="award"></i></div>
                        <div class="pillar-body">
                            <h3>Certificação Reconhecida</h3>
                            <p>Diplomas com registro no MEC, reconhecidos pela indústria regional e nacional.</p>
                        </div>
                    </div>
                    <div class="pillar-card reveal" style="transition-delay:.24s">
                        <div class="pillar-icon"><i data-lucide="users"></i></div>
                        <div class="pillar-body">
                            <h3>Jovem Aprendiz</h3>
                            <p>Programa que une teoria e prática profissional para jovens entre 14 e 24 anos, com carteira assinada.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             CURSOS — Grid com Filtro por Categoria
             ================================================================ -->
        <section class="section section-alt reveal" id="cursos">
            <div class="container">
                <div class="sh-header">
                    <div>
                        <span class="sh-label">O que oferecemos</span>
                        <h2 class="sh-title">Nossos Cursos</h2>
                    </div>
                    <div class="course-filters" id="courseFilters">
                        <button class="cf-chip cf-active" data-filter="all">Todos</button>
                        <button class="cf-chip" data-filter="tecnico">Técnico</button>
                        <button class="cf-chip" data-filter="industrial">Industrial</button>
                        <button class="cf-chip" data-filter="gestao">Gestão & TI</button>
                    </div>
                </div>

                <div class="courses-grid-v2" id="coursesGrid">

                    <div class="course-card-v2" data-cat="tecnico industrial">
                        <div class="ccv2-icon" style="background:#FFF7ED;color:#F97316"><i data-lucide="zap"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Eletromecânica</div>
                            <div class="ccv2-meta">Industrial · 1.200h</div>
                        </div>
                        <a href="cursos/eletro-mecanica.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico industrial">
                        <div class="ccv2-icon" style="background:#EFF6FF;color:#2563EB"><i data-lucide="cpu"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Elétrica Industrial</div>
                            <div class="ccv2-meta">Industrial · 1.200h</div>
                        </div>
                        <a href="cursos/eletrica-industrial.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico industrial">
                        <div class="ccv2-icon" style="background:#F0FDF4;color:#16A34A"><i data-lucide="settings-2"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Mecânica Pesada</div>
                            <div class="ccv2-meta">Industrial · 1.600h</div>
                        </div>
                        <a href="cursos/mecanica-pesada.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico industrial">
                        <div class="ccv2-icon" style="background:#FFF1F2;color:#E11D48"><i data-lucide="shield-check"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Seg. do Trabalho</div>
                            <div class="ccv2-meta">Industrial · 1.200h</div>
                        </div>
                        <a href="cursos/seguranca-trabalho.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico industrial">
                        <div class="ccv2-icon" style="background:#FDF4FF;color:#9333EA"><i data-lucide="circuit-board"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Eletrônica</div>
                            <div class="ccv2-meta">Industrial · 1.200h</div>
                        </div>
                        <a href="cursos/eletronica.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico gestao">
                        <div class="ccv2-icon" style="background:#ECFDF5;color:#059669"><i data-lucide="package"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Logística</div>
                            <div class="ccv2-meta">Gestão · 800h</div>
                        </div>
                        <a href="cursos/logistica.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico gestao">
                        <div class="ccv2-icon" style="background:#FFF7ED;color:#EA580C"><i data-lucide="briefcase"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Administração</div>
                            <div class="ccv2-meta">Gestão · 800h</div>
                        </div>
                        <a href="cursos/administracao.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico gestao">
                        <div class="ccv2-icon" style="background:#F0F9FF;color:#0284C7"><i data-lucide="bar-chart-2"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Gestão da Qualidade</div>
                            <div class="ccv2-meta">Gestão · 800h</div>
                        </div>
                        <a href="cursos/gestao-qualidade.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico gestao">
                        <div class="ccv2-icon" style="background:#FFF7ED;color:#F97316"><i data-lucide="file-text"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Rotinas Adm. e Dep. Pessoal</div>
                            <div class="ccv2-meta">Gestão · 400h</div>
                        </div>
                        <a href="cursos/rotinas-adm.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="tecnico gestao">
                        <div class="ccv2-icon" style="background:#EFF6FF;color:#1D4ED8"><i data-lucide="monitor"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Técnico em Informática</div>
                            <div class="ccv2-meta">Gestão & TI · 1.000h</div>
                        </div>
                        <a href="cursos/informatica.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                    <div class="course-card-v2" data-cat="gestao">
                        <div class="ccv2-icon" style="background:#F0FDF4;color:#15803D"><i data-lucide="table-2"></i></div>
                        <div class="ccv2-body">
                            <div class="ccv2-name">Excel Avançado e Dashboards</div>
                            <div class="ccv2-meta">Gestão & TI · 80h</div>
                        </div>
                        <a href="cursos/excel-avancado.php" class="ccv2-arrow"><i data-lucide="arrow-right"></i></a>
                    </div>

                </div>
            </div>
        </section>

        <!-- ================================================================
             PARCEIROS
             ================================================================ -->
        <section class="section reveal" id="parceiros">
            <div class="container" style="text-align:center;">
                <span class="sh-label">Quem investe nos nossos alunos</span>
                <h2 class="sh-title" style="text-align:center;margin-bottom:0.5rem;">Empresas Parceiras</h2>
                <p class="sh-sub" style="margin:0 auto 3rem;text-align:center;">Instituições que financiam bolsas integrais e abrem portas para jovens aprendizes.</p>
                <div class="partners-strip">
                    <div class="partner-card reveal">
                        <div class="pc-logo"><i data-lucide="building-2"></i></div>
                        <div class="pc-name">Vale S.A.</div>
                        <div class="pc-prog">Programa Partilhar</div>
                    </div>
                    <div class="partner-card reveal" style="transition-delay:.1s">
                        <div class="pc-logo"><i data-lucide="settings"></i></div>
                        <div class="pc-name">Sotreq</div>
                        <div class="pc-prog">Instituto Social</div>
                    </div>
                    <div class="partner-card reveal" style="transition-delay:.2s">
                        <div class="pc-logo"><i data-lucide="heart"></i></div>
                        <div class="pc-name">Comunidade Kolping</div>
                        <div class="pc-prog">Parceria Institucional</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             CTA STRIP — Chamada para Matrícula
             ================================================================ -->
        <section class="cta-strip reveal">
            <div class="cta-strip-inner">
                <h2>Pronto para <span>transformar</span> sua carreira?</h2>
                <p>Vagas limitadas por turma. Fale com nossa secretaria e garanta sua vaga agora.</p>
                <div class="cta-strip-btns">
                    <a href="#fale-conosco" class="cta-btn-primary">
                        <i data-lucide="send"></i> Quero me matricular
                    </a>
                    <a href="#cursos" class="cta-btn-secondary">
                        <i data-lucide="book-open"></i> Ver cursos
                    </a>
                </div>
            </div>
        </section>

        <!-- ================================================================
             CONTATO — 2 Colunas
             ================================================================ -->
        <section class="section reveal" id="fale-conosco">
            <div class="container">
                <div class="contact-layout">

                    <!-- Coluna Esquerda: Informações -->
                    <div class="contact-info">
                        <span class="sh-label">Secretaria</span>
                        <h2 class="sh-title">Fale conosco</h2>
                        <p>Tem dúvidas sobre matrículas, bolsas ou cursos? Nossa secretaria responde rapidamente.</p>

                        <div class="contact-items">
                            <div class="ci-item">
                                <div class="ci-icon"><i data-lucide="map-pin"></i></div>
                                <div>
                                    <div class="ci-label">Endereço</div>
                                    <div class="ci-val">Avenida Amazonas, 64 – Rio Verde<br>Parauapebas – PA</div>
                                </div>
                            </div>
                            <div class="ci-item">
                                <div class="ci-icon"><i data-lucide="message-circle"></i></div>
                                <div>
                                    <div class="ci-label">WhatsApp</div>
                                    <a href="https://wa.me/5594999999999" class="ci-val ci-link">(94) 9 9999-9999</a>
                                </div>
                            </div>
                            <div class="ci-item">
                                <div class="ci-icon"><i data-lucide="clock"></i></div>
                                <div>
                                    <div class="ci-label">Horário de funcionamento</div>
                                    <div class="ci-val">Seg – Sex, das 08h às 18h</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Coluna Direita: Formulário -->
                    <div class="contact-form-wrap">
                        <?php if ($msg_contato): ?>
                            <script>
                                document.addEventListener('DOMContentLoaded', () => {
                                    const isErr = <?= strpos($msg_contato, 'Erro') !== false ? 'true' : 'false' ?>;
                                    Toast.show(<?= json_encode($msg_contato) ?>, isErr ? 'error' : 'success');
                                });
                            </script>
                        <?php endif; ?>

                        <form method="POST" action="#fale-conosco" class="form-clean" id="formContato">
                            <input type="hidden" name="acao" value="contato">
                            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token'] ?? '') ?>">

                            <div class="fc-field">
                                <input type="text" name="nome" id="f-nome" class="fc-input" placeholder=" " required autocomplete="name">
                                <label for="f-nome" class="fc-label">Nome completo</label>
                            </div>

                            <div class="fc-row">
                                <div class="fc-field">
                                    <input type="email" name="email" id="f-email" class="fc-input" placeholder=" " required autocomplete="email">
                                    <label for="f-email" class="fc-label">E-mail</label>
                                </div>
                                <div class="fc-field">
                                    <input type="text" name="telefone" id="telefone" class="fc-input" placeholder=" " maxlength="15" autocomplete="tel">
                                    <label for="telefone" class="fc-label">WhatsApp</label>
                                </div>
                            </div>

                            <div class="fc-field">
                                <textarea name="mensagem" id="f-msg" class="fc-input fc-textarea" placeholder=" " required rows="4"></textarea>
                                <label for="f-msg" class="fc-label">Sua mensagem</label>
                            </div>

                            <button type="submit" class="fc-submit">
                                <i data-lucide="send"></i> Enviar mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             FOOTER — Dark Institucional
             ================================================================ -->
        <footer class="footer-dark" id="contato">
            <div class="fd-inner">
                <div class="fd-brand-col">
                    <div class="fd-logo sl-glitch-fx" onclick="window.scrollTo({top: 0, behavior: 'smooth'});" title="Voltar ao topo">
                        <div class="glitch-original">Sophie <span>Link</span></div>
                        <div class="glitch-layer glitch-top">
                            <div class="glitch-text">Sophie <span>Link</span></div>
                        </div>
                        <div class="glitch-layer glitch-bot">
                            <div class="glitch-text">Sophie <span>Link</span></div>
                        </div>
                    </div>
                    <p class="fd-desc">Centro Técnico Profissionalizante comprometido com a formação de jovens para o mercado industrial e de mineração da Região dos Carajás.</p>
                    <a href="https://maps.app.goo.gl/QNMhxocz63pQhng29" target="_blank" class="fd-addr fd-addr-link">
                        <i data-lucide="map-pin"></i>
                        Av. Amazonas, 64 – Rio Verde, Parauapebas – PA
                    </a>
                    <div class="fd-socials">
                        <a href="https://www.instagram.com/sophielink_kolpingbrasil" target="_blank" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://www.facebook.com/1144265205434947" target="_blank" title="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="http://wa.me/5594992106258" target="_blank" title="WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                    </div>
                </div>

                <div class="fd-col">
                    <h4>Institucional</h4>
                    <ul>
                        <li><a href="#institucional">Sobre a Escola</a></li>
                        <li><a href="#cursos">Nossos Cursos</a></li>
                        <li><a href="#parceiros">Empresas Parceiras</a></li>
                        <li><a href="#fale-conosco">Fale Conosco</a></li>
                        <li><a href="verificar-certificado.php" style="color: var(--brand); font-weight: 500;"><i data-lucide="shield-check" style="width: 14px; height: 14px; margin-right: 4px; display: inline-block; vertical-align: middle;"></i>Verificar Certificado</a></li>
                    </ul>
                </div>
            </div>
            <div class="fd-bottom">
                <span>© <?= date('Y') ?> Centro Técnico Profissionalizante Sophie Link · Parauapebas, PA</span>
                <span class="fd-dev">Todos os direitos reservados</span>
            </div>
        </footer>

        <script src="assets/js/toast.js"></script>
        <script src="assets/js/index.js"></script>

        <!-- CHATBOT HTML -->
        <button id="chatbot-toggle" class="chatbot-toggle-btn">
            <i data-lucide="message-square"></i>
        </button>

        <div id="chatbot-container" class="chatbot-container hidden">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <div class="chatbot-avatar">
                        <i data-lucide="bot" style="width: 24px; height: 24px;"></i>
                    </div>
                    <div>
                        <strong>Assistente Sophie</strong>
                        <span>Online agora</span>
                    </div>
                </div>

                <div class="chatbot-header-actions">
                    <button id="chatbot-menu-btn" class="chat-action-btn"><i data-lucide="more-vertical"></i></button>
                    <button id="chatbot-close" class="chat-action-btn"><i data-lucide="x"></i></button>

                    <div id="chatbot-dropdown" class="chatbot-dropdown hidden">
                        <button id="chatbot-restart-menu">
                            <i data-lucide="refresh-cw" style="width:14px; height:14px;"></i>
                            Reiniciar Chat
                        </button>
                        <div class="dropdown-divider"></div>
                        <label class="dropdown-label">Atendimento:</label>
                        <select id="mode" class="dropdown-select">
                            <option value="ai" selected>Inteligência Artificial</option>
                            <option value="manual">Menu Opções</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="chatbot-messages" class="chatbot-messages">
                <div class="message bot">Olá! Sou a assistente virtual do Sophie Link. Como posso ajudar com seu futuro profissional hoje?</div>
            </div>

            <form id="chat-form" class="chatbot-input-area">
                <input type="hidden" id="visitor_name" value="Visitante">
                <input type="hidden" id="visitor_phone" value="">
                <input type="hidden" id="visitor_email" value="">

                <input type="text" id="message" placeholder="Escreva sua mensagem..." autocomplete="off" required>
                <button type="submit" id="chatbot-send">
                    <i data-lucide="send" style="width:18px; height:18px;"></i>
                </button>
            </form>
        </div>

        <div id="custom-confirm" class="confirm-overlay hidden">
            <div class="confirm-card">
                <h3>Reiniciar Chat?</h3>
                <p>Isso apagará todo o histórico da conversa atual.</p>
                <div class="confirm-buttons">
                    <button id="confirm-cancel" class="btn-cancel">Cancelar</button>
                    <button id="confirm-yes" class="btn-yes">Sim, reiniciar</button>
                </div>
            </div>
        </div>

        <!-- Chatbot Script -->
        <script src="assets/js/chatbot.js?v=1"></script>

        <!-- Form Validation Script -->
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const formContato = document.getElementById('formContato');
                if (formContato) {
                    const emailInput = document.getElementById('f-email');
                    const telInput = document.getElementById('telefone');

                    // Validação de email em tempo real
                    emailInput.addEventListener('input', function() {
                        if (this.value && !this.value.includes('@')) {
                            this.setCustomValidity('Por favor, inclua um "@" no endereço de email.');
                        } else {
                            this.setCustomValidity('');
                        }
                    });

                    // Máscara básica e validação para telefone
                    telInput.addEventListener('input', function(e) {
                        let val = this.value.replace(/\D/g, '');
                        if (val.length > 11) val = val.slice(0, 11);
                        if (val.length > 2) {
                            val = '(' + val.slice(0, 2) + ') ' + val.slice(2);
                        }
                        if (val.length > 10) {
                            val = val.slice(0, 10) + '-' + val.slice(10);
                        }
                        this.value = val;

                        if (val.replace(/\D/g, '').length < 10) {
                            this.setCustomValidity('O telefone deve ter no mínimo 10 dígitos com DDD.');
                        } else {
                            this.setCustomValidity('');
                        }
                    });
                }
            });
        </script>

        <!-- Re-render lucide icons after injecting HTML -->
        <script>
            lucide.createIcons();
        </script>
</body>

</html>