<?php
// Script para converter imagens do carrossel para WebP
$images = [
    'ava_hero.png',
    'tech_student_hero-removebg-preview.png',
    'hero_aprendiz-removebg-preview.png'
];

foreach ($images as $img) {
    if (file_exists($img)) {
        $data = file_get_contents($img);
        $imgObj = imagecreatefromstring($data);
        if ($imgObj !== false) {
            imagepalettetotruecolor($imgObj);
            imagealphablending($imgObj, true);
            imagesavealpha($imgObj, true);
            
            $webpName = str_replace('.png', '.webp', $img);
            if (imagewebp($imgObj, $webpName, 80)) {
                echo "Convertido com sucesso: $webpName\n";
            } else {
                echo "Falha ao salvar WebP: $webpName\n";
            }
            imagedestroy($imgObj);
        } else {
            echo "Falha ao ler a imagem: $img\n";
        }
    } else {
        echo "Arquivo não existe: $img\n";
    }
}
?>
