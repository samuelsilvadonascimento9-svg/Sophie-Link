<?php
$dir = new RecursiveDirectoryIterator(__DIR__ . '/public');
$ite = new RecursiveIteratorIterator($dir);
$files = new RegexIterator($ite, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);
foreach($files as $f) {
    $path = $f[0];
    $content = file_get_contents($path);
    if (preg_match('/require_once.*includes\/db\.php[\'"];/', $content) && !strpos($content, '@var \PDO $pdo')) {
        $content = preg_replace('/(require_once.*includes\/db\.php[\'"];)/', "$1\n/** @var \PDO \$pdo */", $content);
        file_put_contents($path, $content);
        echo "Fixed $path\n";
    }
}
