<?php
session_start();
if (!isset($_SESSION['usuario_id'])) { header('Location: ../index.php'); exit; }
$pageTitle = 'Em Construção';
$activeNav = '';
require_once '../../includes/components/layout/header.php';
?>

<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; text-align: center;">
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 24px; opacity: 0.8;">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
    <h2 style="font-family: var(--f-display); font-size: 2rem; font-weight: 800; color: var(--c-text); margin-bottom: 12px;">Página em Construção</h2>
    <p style="color: var(--c-muted); max-width: 400px; line-height: 1.6; font-size: 0.95rem;">
        Este módulo ainda está sendo desenvolvido pela equipe técnica e estará disponível em breve. Agradecemos a compreensão.
    </p>
    <br>
    <a href="dashboard.php" class="btn btn-primary">Voltar para o Dashboard</a>
</div>

<?php require_once '../../includes/components/layout/footer.php'; ?>
