<?php // Landing Page Institucional — Centro Técnico Profissionalizante Sophie Link ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centro Técnico Sophie Link — Parauapebas, PA</title>
    <meta name="description" content="Centro Técnico Profissionalizante Sophie Link — Educação técnica de excelência em Parauapebas, PA.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & DESIGN TOKENS — TEMA SOPHIE LINK (INSPIRADO NO UNIAENE)
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF6B00;
    --c-primary-d:  #D95A00;
    --c-primary-lt: #FFF0E6;
    --c-bg:         #0A0A0A; /* Dark mode base */
    --c-surface:    #171717;
    --c-surface-2:  #262626;
    --c-border:     #333333;
    --c-border-lt:  #404040;
    --c-text:       #F9FAFB;
    --c-text-2:     #D1D5DB;
    --c-text-muted: #9CA3AF;
    --c-text-light: #6B7280;
    --radius:       16px;
    --radius-sm:    10px;
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
    --nav-h:        80px;
}
html { scroll-behavior: smooth; font-size: 16px; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.6; }
a { text-decoration: none; color: inherit; }

/* ================================================================
   ANIMAÇÕES AVANÇADAS (ESTILO UNIAENE)
   ================================================================ */
@keyframes floatSeal { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
@keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.5); transform: scale(1); } 50% { box-shadow: 0 0 20px 8px rgba(255, 107, 0, 0.3); transform: scale(1.05); } 100% { box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.5); transform: scale(1); } }
@keyframes glassMove { from { transform: translate(-10%, -10%) rotate(0deg); } to { transform: translate(10%, 10%) rotate(10deg); } }
@keyframes bubbleUp { 0% { opacity: 1; transform: translate(0, 0) scale(0.5) rotate(0deg); } 100% { opacity: 0; transform: translate(var(--tx), -120px) scale(1.5) rotate(var(--rot)); } }

/* ================================================================
   ELEMENTOS FLUTUANTES E EFEITOS GLASS
   ================================================================ */
#floatingSeal {
    position: fixed; top: 12%; right: 3%; width: 120px; z-index: 99;
    animation: floatSeal 4s ease-in-out infinite;
    filter: drop-shadow(0px 10px 15px rgba(0,0,0,0.5));
    cursor: pointer;
}

#bannerCta {
    position: fixed; bottom: 5vh; right: 3%; z-index: 9999;
    background: linear-gradient(135deg, var(--c-primary), #FF8533);
    color: #fff; padding: 14px 28px; border-radius: 50px;
    font-family: var(--f-display); font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    display: flex; align-items: center; gap: 10px;
    animation: pulseGlow 2.5s infinite ease-in-out;
    transition: all 0.3s ease; border: 2px solid rgba(255,255,255,0.2);
}
#bannerCta:hover { background: #FF8533; transform: scale(1.08); box-shadow: 0 0 30px 10px rgba(255, 107, 0, 0.5); }

.glass-effect {
    position: relative; overflow: hidden; border-radius: 1.5rem;
    backdrop-filter: blur(12px) saturate(180%);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    isolation: isolate; padding: 2rem;
}
.glass-effect::before {
    content: ""; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 30%, rgba(255, 107, 0, 0.15), transparent 60%);
    mix-blend-mode: screen; animation: glassMove 12s ease-in-out infinite alternate; pointer-events: none;
}

.aquatic-note {
    position: absolute; pointer-events: none; z-index: 10; color: var(--c-primary);
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 107, 0, 0.6);
    animation: bubbleUp 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

/* ================================================================
   NAVBAR (MEGAMENU ESTILO)
   ================================================================ */
.top-bar { background: var(--c-surface); font-size: 0.75rem; padding: 8px 3rem; display: flex; justify-content: space-between; color: var(--c-text-muted); border-bottom: 1px solid var(--c-border); }
.top-bar a { color: var(--c-text-2); transition: color 0.2s; } .top-bar a:hover { color: var(--c-primary); }

.nav {
    position: sticky; top: 0; z-index: 1000; height: var(--nav-h);
    background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--c-border);
    display: flex; align-items: center; justify-content: space-between; padding: 0 3rem;
}
.nav-brand { display: flex; align-items: center; gap: 10px; }
.nav-brand img { height: 40px; }

.nav-links { display: flex; align-items: center; gap: 2rem; height: 100%; }
.nav-item { position: relative; display: flex; align-items: center; height: 100%; font-size: 0.85rem; font-weight: 600; color: var(--c-text-2); cursor: pointer; transition: color 0.2s; }
.nav-item:hover { color: var(--c-primary); }
.nav-item i { width: 14px; height: 14px; margin-left: 5px; transition: transform 0.2s; }
.nav-item:hover i { transform: rotate(180deg); }

/* Dropdown */
.dropdown {
    position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(15px);
    background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius-sm);
    min-width: 220px; padding: 10px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    opacity: 0; visibility: hidden; transition: all 0.3s ease; pointer-events: none;
}
.nav-item:hover .dropdown { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: all; }
.dropdown a {
    display: flex; align-items: center; gap: 10px; padding: 10px 20px;
    font-size: 0.85rem; color: var(--c-text-2); transition: all 0.2s;
}
.dropdown a:hover { background: rgba(255,107,0,0.1); color: var(--c-primary); padding-left: 25px; }

.nav-cta-group { display: flex; gap: 10px; }
.btn-outline { border: 1px solid var(--c-primary); color: var(--c-primary); padding: 8px 18px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; transition: all 0.2s; }
.btn-outline:hover { background: var(--c-primary); color: #fff; }

/* ================================================================
   HERO E SEÇÕES
   ================================================================ */
.hero {
    position: relative; padding: 8rem 3rem; min-height: 85vh;
    display: flex; align-items: center; justify-content: center; text-align: center;
    background: url('assets/images/home/hero-bg.jpg') center/cover no-repeat;
}
.hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(10,10,10,0.7), var(--c-bg)); }

.hero-content { position: relative; z-index: 2; max-width: 800px; }
.hero-tag {
    display: inline-block; padding: 6px 16px; border-radius: 30px;
    background: rgba(255,107,0,0.2); border: 1px solid rgba(255,107,0,0.5);
    color: var(--c-primary); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
    margin-bottom: 20px; backdrop-filter: blur(5px);
}
.hero h1 { font-family: var(--f-display); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }
.hero p { font-size: 1.1rem; color: var(--c-text-2); margin-bottom: 40px; max-width: 600px; margin-inline: auto; }

/* GRID DE CURSOS */
.cursos-sec { padding: 5rem 3rem; position: relative; }
.sec-title { font-family: var(--f-display); font-size: 2.5rem; font-weight: 800; text-align: center; margin-bottom: 3rem; }
.sec-title span { color: var(--c-primary); }

.cursos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
.curso-card {
    background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius);
    overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;
}
.curso-card:hover { transform: translateY(-10px); box-shadow: 0 15px 40px rgba(255,107,0,0.15); border-color: rgba(255,107,0,0.3); }
.curso-img { height: 200px; background: var(--c-surface-2); position: relative; }
.curso-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; transition: opacity 0.3s; }
.curso-card:hover .curso-img img { opacity: 1; }
.curso-tag { position: absolute; top: 15px; right: 15px; background: var(--c-primary); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; }
.curso-body { padding: 1.5rem; }
.curso-title { font-family: var(--f-display); font-size: 1.25rem; font-weight: 800; margin-bottom: 10px; }
.curso-desc { font-size: 0.85rem; color: var(--c-text-muted); margin-bottom: 20px; line-height: 1.5; }
.curso-link { font-size: 0.85rem; font-weight: 700; color: var(--c-primary); display: flex; align-items: center; gap: 5px; }

/* ================================================================
   FOOTER
   ================================================================ */
.footer { background: var(--c-surface); border-top: 1px solid var(--c-border); padding: 4rem 3rem 2rem; margin-top: 4rem; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; }
.footer-brand img { height: 40px; margin-bottom: 15px; }
.footer-text { font-size: 0.85rem; color: var(--c-text-muted); max-width: 300px; }
.footer-title { font-family: var(--f-display); font-weight: 800; font-size: 1.1rem; margin-bottom: 1.5rem; color: #fff; }
.footer-links { list-style: none; }
.footer-links li { margin-bottom: 10px; }
.footer-links a { color: var(--c-text-2); font-size: 0.85rem; transition: color 0.2s; }
.footer-links a:hover { color: var(--c-primary); }

@media (max-width: 992px) {
    .nav-links, .top-bar { display: none; }
    .hero h1 { font-size: 2.5rem; }
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
</head>
<body>

    <!-- Selo Flutuante -->
    <img id="floatingSeal" src="assets/images/image-removebg-preview.png" alt="Selo Sophie Link">

    <!-- CTA Fixo (Estilo Ribbon Pulse) -->
    <a href="login.php" id="bannerCta">
        <i data-lucide="user-circle"></i> Área Restrita
    </a>

    <!-- Top Bar -->
    <div class="top-bar">
        <div>Atendimento: Seg a Sex, 08h às 18h</div>
        <div style="display:flex; gap:15px;">
            <a href="#"><i data-lucide="phone" style="width:12px;height:12px;vertical-align:middle;"></i> (94) 99123-4567</a>
            <a href="#"><i data-lucide="mail" style="width:12px;height:12px;vertical-align:middle;"></i> contato@sophielink.com.br</a>
        </div>
    </div>

    <!-- Navegação -->
    <nav class="nav">
        <a href="index.php" class="nav-brand">
            <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link">
        </a>
        
        <div class="nav-links">
            <div class="nav-item">
                Institucional <i data-lucide="chevron-down"></i>
                <div class="dropdown">
                    <a href="#"><i data-lucide="info"></i> Sobre Nós</a>
                    <a href="#"><i data-lucide="map-pin"></i> Nossa Estrutura</a>
                    <a href="#"><i data-lucide="book-open"></i> Filosofia Educacional</a>
                </div>
            </div>
            <div class="nav-item">
                Cursos <i data-lucide="chevron-down"></i>
                <div class="dropdown">
                    <a href="#"><i data-lucide="cpu"></i> Eletromecânica</a>
                    <a href="#"><i data-lucide="shield"></i> Segurança do Trabalho</a>
                    <a href="#"><i data-lucide="package"></i> Logística</a>
                    <a href="#"><i data-lucide="check-circle"></i> Qualidade</a>
                </div>
            </div>
            <a href="#" class="nav-item">Matrículas</a>
            <a href="#" class="nav-item">Notícias</a>
            <div class="nav-item">
                Portais <i data-lucide="chevron-down"></i>
                <div class="dropdown">
                    <a href="portal_aluno.php"><i data-lucide="graduation-cap"></i> Portal do Aluno</a>
                    <a href="portal_professor.php"><i data-lucide="briefcase"></i> Portal do Professor</a>
                    <a href="portal_empresa.php"><i data-lucide="building"></i> Portal da Empresa</a>
                    <a href="ava.php"><i data-lucide="monitor-play"></i> Ambiente Virtual (AVA)</a>
                    <a href="dashboard.php"><i data-lucide="settings"></i> Painel Admin</a>
                </div>
            </div>
        </div>

        <div class="nav-cta-group">
            <a href="login.php" class="btn-outline">Entrar</a>
        </div>
    </nav>

    <!-- Hero Section (Glass Effect) -->
    <header class="hero" id="secao-emus"> <!-- ID usado para o rastro aquático -->
        <div class="hero-content glass-effect slide-container">
            <div class="hero-tag">Inscrições Abertas 2026</div>
            <h1>Educação Técnica com <span style="color:var(--c-primary)">Propósito</span></h1>
            <p>Formamos profissionais altamente qualificados para o mercado industrial de Parauapebas e região. Estrutura moderna, professores atuantes e parceria com grandes empresas.</p>
            <div style="display:flex; gap:15px; justify-content:center; margin-top:30px;">
                <a href="#" class="btn-outline" style="background:var(--c-primary);color:#fff;">Conheça os Cursos</a>
                <a href="#" class="btn-outline">Fale Conosco</a>
            </div>
        </div>
    </header>

    <!-- Seção Cursos -->
    <section class="cursos-sec">
        <h2 class="sec-title">Nossos <span>Cursos</span></h2>
        <div class="cursos-grid">
            <div class="curso-card">
                <div class="curso-img">
                    <!-- Simulando imagem de fundo -->
                    <div style="width:100%;height:100%;background:linear-gradient(45deg, #1f1f1f, #333);"></div>
                    <div class="curso-tag">Mais Procurado</div>
                </div>
                <div class="curso-body">
                    <h3 class="curso-title">Manutenção Eletromecânica</h3>
                    <p class="curso-desc">Aprenda a instalar, montar e realizar manutenção em sistemas mecânicos, elétricos e automatizados.</p>
                    <a href="#" class="curso-link">Ver matriz curricular <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
            <div class="curso-card">
                <div class="curso-img">
                    <div style="width:100%;height:100%;background:linear-gradient(45deg, #1f1f1f, #222);"></div>
                </div>
                <div class="curso-body">
                    <h3 class="curso-title">Segurança do Trabalho</h3>
                    <p class="curso-desc">Capacite-se para garantir a integridade física dos trabalhadores e a conformidade com as normas.</p>
                    <a href="#" class="curso-link">Ver matriz curricular <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
            <div class="curso-card">
                <div class="curso-img">
                    <div style="width:100%;height:100%;background:linear-gradient(45deg, #2a2a2a, #111);"></div>
                </div>
                <div class="curso-body">
                    <h3 class="curso-title">Logística e Qualidade</h3>
                    <p class="curso-desc">Domine os processos de cadeia de suprimentos e as metodologias de garantia da qualidade ISO.</p>
                    <a href="#" class="curso-link">Ver matriz curricular <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-grid">
            <div>
                <a href="#" class="footer-brand"><img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link"></a>
                <p class="footer-text">Centro Técnico Profissionalizante comprometido com o desenvolvimento socioeconômico da região de Carajás.</p>
            </div>
            <div>
                <div class="footer-title">Acesso Rápido</div>
                <ul class="footer-links">
                    <li><a href="portal_aluno.php">Portal do Aluno</a></li>
                    <li><a href="portal_professor.php">Portal do Professor</a></li>
                    <li><a href="ava.php">Ambiente Virtual (AVA)</a></li>
                    <li><a href="login.php">Área Restrita</a></li>
                </ul>
            </div>
            <div>
                <div class="footer-title">Contato</div>
                <ul class="footer-links">
                    <li><a href="#"><i data-lucide="map-pin" style="width:14px;vertical-align:middle;margin-right:5px;"></i> Av. Amazonas, 64 - Rio Verde</a></li>
                    <li><a href="#"><i data-lucide="phone" style="width:14px;vertical-align:middle;margin-right:5px;"></i> (94) 3346-0000</a></li>
                    <li><a href="#"><i data-lucide="mail" style="width:14px;vertical-align:middle;margin-right:5px;"></i> contato@sophielink.com.br</a></li>
                </ul>
            </div>
        </div>
        <div style="text-align:center; margin-top:4rem; padding-top:2rem; border-top:1px solid var(--c-border); color:var(--c-text-muted); font-size:0.8rem;">
            &copy; 2026 Centro Técnico Profissionalizante Sophie Link. Todos os direitos reservados.
        </div>
    </footer>

    <script>
        lucide.createIcons();

        // Efeito "Aquatic Notes" (Bolhas laranjas flutuantes ao passar o mouse no hero)
        document.addEventListener('DOMContentLoaded', () => {
            const secaoEmus = document.getElementById('secao-emus');
            if (!secaoEmus) return;

            const notas = ['✦', '✨', '⚙', '⚡', '★', '♦'];
            let ultimaNotaTempo = 0;

            secaoEmus.addEventListener('mousemove', (e) => {
                const tempoAtual = Date.now();
                if (tempoAtual - ultimaNotaTempo < 60) return; // Limita a frequência
                ultimaNotaTempo = tempoAtual;

                const notaEl = document.createElement('span');
                notaEl.className = 'aquatic-note';
                notaEl.innerText = notas[Math.floor(Math.random() * notas.length)];

                const rect = secaoEmus.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                notaEl.style.left = `${x}px`;
                notaEl.style.top = `${y}px`;
                notaEl.style.fontSize = `${Math.random() * 15 + 10}px`;

                const tx = (Math.random() - 0.5) * 100; 
                const rot = (Math.random() - 0.5) * 180; 
                notaEl.style.setProperty('--tx', `${tx}px`);
                notaEl.style.setProperty('--rot', `${rot}deg`);

                secaoEmus.querySelector('.slide-container').appendChild(notaEl);

                setTimeout(() => { notaEl.remove(); }, 1500);
            });
        });
    </script>
</body>
</html>