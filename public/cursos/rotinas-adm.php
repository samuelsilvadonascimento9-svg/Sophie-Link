<?php
// Rotinas Adm / DP — Sophie Link (Bespoke Redesign)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rotinas Adm. e Dep. Pessoal | Sophie Link</title>
    <meta name="description" content="Curso de Rotinas Administrativas e DP na Sophie Link. Folha de pagamento e eSocial.">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>">
    <!-- Custom CSS ONLY for this page -->
    <link rel="stylesheet" href="../assets/css/cursos/radm-page.css?v=2">
    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

<nav class="ra-nav">
    <a href="../index.php" class="ra-nav-logo">
        <img src="../assets/images/logoNome.png" alt="Sophie Link">
    </a>
    <div class="ra-nav-links">
        <a href="../index.php">INÍCIO</a>
        <a href="#dp">FOLHA & DP</a>
        <a href="#esocial">eSOCIAL</a>
    </div>
    <a href="../index.php#fale-conosco" class="ra-btn">EFETIVAR CONTRATO</a>
</nav>

<div class="ra-wrapper">
    <div class="ra-folder-tab">Dossiê: Rotinas Adm & DP</div>
    
    <div class="ra-folder-body">
        <section class="ra-hero">
            <div class="ra-hero-content">
                <h1>O coração do RH em suas mãos.</h1>
                <p>O Departamento Pessoal garante a segurança jurídica da empresa e o direito dos trabalhadores. Domine admissões, rescisões, eSocial, folha de pagamento e toda a rotina que mantém qualquer negócio funcionando dentro da lei.</p>
                <div style="margin-top:2rem;">
                    <span style="font-weight:600;color:var(--ra-indigo-dark);margin-right:1rem;">N° Documento:</span>
                    <span style="font-family:var(--font-heading);background:var(--ra-light);padding:0.2rem 1rem;border:1px solid var(--ra-border);">HR-<?= date('Y') ?>-X001</span>
                </div>
            </div>
            <div class="ra-stamp">APROVADO<br>RH</div>
        </section>

        <section class="ra-section" id="dp">
            <h2 class="ra-title"><i data-lucide="folder-open"></i> Arquivos do Departamento Pessoal</h2>
            <div class="ra-grid">
                <div class="ra-doc-card">
                    <h3>Folha de Pagamento</h3>
                    <p>Cálculo preciso de proventos, descontos, horas extras, DSR, adicional noturno, insalubridade e periculosidade.</p>
                </div>
                <div class="ra-doc-card">
                    <h3>Admissão & Rescisão</h3>
                    <p>Contratos de experiência, cálculo de TRCT, aviso prévio indenizado/trabalhado e homologações.</p>
                </div>
                <div class="ra-doc-card">
                    <h3>Obrigações Trabalhistas</h3>
                    <p>Gestão de FGTS, guias INSS (GPS), controle de férias (CLT) e cálculos proporcionais de 13º salário.</p>
                </div>
                <div class="ra-doc-card">
                    <h3>Softwares de DP</h3>
                    <p>Treinamento prático utilizando os mesmos sistemas integrados (ERPs) presentes nas grandes indústrias da região.</p>
                </div>
            </div>
        </section>

        <section class="ra-section" id="esocial" style="background:var(--ra-light); border-top:1px solid var(--ra-border);">
            <h2 class="ra-title"><i data-lucide="monitor"></i> Conformidade com eSocial</h2>
            <p style="margin-bottom:2rem; max-width:800px; color:#475569;">O eSocial unificou o envio de dados pelo empregador. Erros de escrituração digital causam multas milionárias. Nosso curso foca em eventos periódicos e não periódicos para você não errar na transmissão.</p>
            
            <ul style="list-style:none;">
                <li style="margin-bottom:1rem;display:flex;align-items:center;gap:1rem;"><i data-lucide="check-circle-2" style="color:var(--ra-indigo);"></i> Eventos Iniciais e de Tabela (S-1000 a S-1080)</li>
                <li style="margin-bottom:1rem;display:flex;align-items:center;gap:1rem;"><i data-lucide="check-circle-2" style="color:var(--ra-indigo);"></i> Eventos Não Periódicos (Admissão, Afastamento, Desligamento)</li>
                <li style="margin-bottom:1rem;display:flex;align-items:center;gap:1rem;"><i data-lucide="check-circle-2" style="color:var(--ra-indigo);"></i> Eventos Periódicos (Fechamento da Folha e Remuneração)</li>
            </ul>

            <div class="ra-signature">
                <div class="ra-sign-box">
                    <div class="ra-sign-line"></div>
                    <div>Assinatura do Candidato</div>
                </div>
                <div>
                    <a href="../index.php#fale-conosco" class="ra-btn" style="background:var(--ra-indigo); color:#FFF!important;">Assinar Termo de Matrícula</a>
                </div>
            </div>
        </section>
    </div>
</div>

<footer class="ra-footer">
    <p>Sophie Link DP & Administração &copy; <?= date('Y') ?></p>
    <a href="../index.php" style="color:var(--ra-indigo-dark);text-decoration:none;font-weight:600;margin-top:1rem;display:inline-block;">Retornar ao Arquivo Central</a>
</footer>

<script>
    lucide.createIcons();
</script>
</body>
</html>
