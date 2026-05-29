<?php
session_start();

// Proteção simples: se não estiver logado, redireciona pro login (descomentar quando integrar totalmente)
// if (!isset($_SESSION['usuario_id'])) {
//     header("Location: index.php");
//     exit;
// }

// Título da página
$pageTitle = "AVA — Sophie Link";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle ?></title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Teko:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS para o AVA -->
    <link rel="stylesheet" href="assets/css/ava.css">
</head>
<body class="ava-body">

    <!-- NAVBAR AVA -->
    <?php include 'includes/navbar_ava.php'; ?>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="ava-container">
        
        <!-- HEADER (Banner de Boas Vindas) -->
        <header class="ava-header">
            <!-- Imagem genérica para hero do aluno -->
            <img src="assets/images/hero_aprendiz.png" alt="Banner AVA" class="ava-header-img" onerror="this.src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=300'">
            <h1 class="ava-title">Olá, Aprendiz! 👋</h1>
            <p class="ava-subtitle">Bem-vindo(a) de volta ao seu Ambiente Virtual de Aprendizagem.</p>
        </header>

        <!-- GRID DE LAYOUT (2/3 Conteúdo, 1/3 Widgets) -->
        <div class="ava-layout">
            
            <!-- COLUNA ESQUERDA: Cursos e Trilhas -->
            <section class="ava-main-content">
                
                <div class="ava-widget">
                    <div class="ava-widget-header">
                        <h2 class="ava-widget-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                            Meus Cursos e Trilhas
                        </h2>
                    </div>
                    
                    <div class="ava-widget-body ava-courses">
                        
                        <!-- Card 1 -->
                        <article class="ava-course-card">
                            <div class="ava-course-img">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" alt="Curso de Liderança">
                            </div>
                            <div class="ava-course-content">
                                <h3 class="ava-course-title">Desenvolvimento Comportamental e Liderança</h3>
                                <p class="ava-course-meta">Módulo 1 • Prof. Carlos</p>
                                
                                <div class="ava-progress-wrap">
                                    <div class="ava-progress-text">
                                        <span>Progresso</span>
                                        <span>60%</span>
                                    </div>
                                    <div class="ava-progress-bar">
                                        <div class="ava-progress-fill" style="width: 60%"></div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <!-- Card 2 -->
                        <article class="ava-course-card">
                            <div class="ava-course-img">
                                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600" alt="Curso de Finanças">
                            </div>
                            <div class="ava-course-content">
                                <h3 class="ava-course-title">Educação Financeira para Jovens</h3>
                                <p class="ava-course-meta">Módulo 2 • Profa. Marina</p>
                                
                                <div class="ava-progress-wrap">
                                    <div class="ava-progress-text">
                                        <span>Progresso</span>
                                        <span>25%</span>
                                    </div>
                                    <div class="ava-progress-bar">
                                        <div class="ava-progress-fill" style="width: 25%"></div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <!-- Card 3 -->
                        <article class="ava-course-card">
                            <div class="ava-course-img">
                                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600" alt="Curso de Comunicação">
                            </div>
                            <div class="ava-course-content">
                                <h3 class="ava-course-title">Comunicação Empresarial Assertiva</h3>
                                <p class="ava-course-meta">Módulo 1 • Prof. Ricardo</p>
                                
                                <div class="ava-progress-wrap">
                                    <div class="ava-progress-text">
                                        <span>Progresso</span>
                                        <span>100%</span>
                                    </div>
                                    <div class="ava-progress-bar">
                                        <div class="ava-progress-fill" style="width: 100%; background: #0D6EFD;"></div>
                                    </div>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>

            </section>

            <!-- COLUNA DIREITA: Avisos e Atividades -->
            <aside class="ava-sidebar">
                
                <!-- Quadro de Avisos -->
                <div class="ava-widget">
                    <div class="ava-widget-header">
                        <h2 class="ava-widget-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            Quadro de Avisos
                        </h2>
                    </div>
                    <div class="ava-widget-body" style="padding: 0 1.5rem;">
                        <ul class="ava-list">
                            <li class="ava-list-item">
                                <div class="ava-list-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                </div>
                                <div class="ava-list-content">
                                    <h4>Fechamento de Folha</h4>
                                    <p>As folhas de frequência devem ser assinadas até o dia 5.</p>
                                    <span class="ava-list-date">Postado hoje</span>
                                </div>
                            </li>
                            <li class="ava-list-item">
                                <div class="ava-list-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                </div>
                                <div class="ava-list-content">
                                    <h4>Nova Atividade Liberada</h4>
                                    <p>O Módulo 2 de Finanças já está disponível.</p>
                                    <span class="ava-list-date">Há 2 dias</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Atividades Pendentes -->
                <div class="ava-widget">
                    <div class="ava-widget-header">
                        <h2 class="ava-widget-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Pendências financeiras
                        </h2>
                    </div>
                    <div class="ava-widget-body">
                        <p style="font-size: 0.9rem; color: var(--ava-muted); margin: 0 0 1rem 0;">Você não possui pendências ou mensalidades em atraso no momento.</p>
                        <div style="background: rgba(25,135,84,0.1); color: #198754; padding: 12px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 0.9rem;">
                            Tudo em dia! ✨
                        </div>
                    </div>
                </div>

            </aside>

        </div>
    </main>

</body>
</html>
