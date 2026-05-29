<?php
$html = file_get_contents('www.uniaene.edu.br/www.uniaene.edu.br/index.html');
if ($html === false) {
    die("Error reading index.html\n");
}

// Replace paths to point to the inner folder structure
$html = str_replace('../../assets/', 'www.uniaene.edu.br/assets/', $html);
$html = str_replace('href="css/', 'href="www.uniaene.edu.br/www.uniaene.edu.br/css/', $html);
$html = str_replace('src="js/', 'src="www.uniaene.edu.br/www.uniaene.edu.br/js/', $html);
$html = str_replace('href="images/', 'href="www.uniaene.edu.br/www.uniaene.edu.br/images/', $html);
$html = str_replace('src="images/', 'src="www.uniaene.edu.br/www.uniaene.edu.br/images/', $html);

// Override the branding CSS to make it "Sophie Link" (Orange / Dark Theme)
$custom_css = '
<style>
    :root {
        --primary-color: #FF6B00 !important;
        --secondary-color: #D95A00 !important;
        --bg-color: #080808 !important;
        --text-color: #ffffff !important;
        --light-bg: #141414 !important;
    }
    body, .bg-white, .bg-light, section { background-color: var(--bg-color) !important; color: var(--text-color) !important; }
    h1, h2, h3, h4, h5, h6, p, a, span, div { color: var(--text-color) !important; }
    .btn-primary, .bg-primary { background-color: var(--primary-color) !important; border-color: var(--primary-color) !important; color: #fff !important; }
    .btn-primary:hover, .bg-primary:hover { background-color: var(--secondary-color) !important; border-color: var(--secondary-color) !important; }
    .text-primary { color: var(--primary-color) !important; }
    .header-top, .main-header { background-color: var(--bg-color) !important; border-bottom: 1px solid #333 !important; }
    /* Override specific uniaene classes */
    .glass-box, .glass-effect { background: rgba(255, 107, 0, 0.1) !important; border: 1px solid rgba(255, 107, 0, 0.3) !important; }
    .text-dark { color: #fff !important; }
    .header-main { background-color: #080808 !important; }
    nav ul li a { color: #fff !important; }
</style>
';
$html = str_replace('</head>', $custom_css . '</head>', $html);

// Change UNIAENE text to Sophie Link
$html = str_replace('UNIAENE', 'Sophie Link', $html);
$html = str_replace('Centro Universitário Adventista de Ensino do Nordeste', 'Programa de Aprendizagem Profissional', $html);

// Write to index.php
file_put_contents('index.php', $html);
echo "index.php successfully rewritten.\n";
