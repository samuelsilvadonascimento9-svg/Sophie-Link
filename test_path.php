<?php
$base = str_replace('\\', '/', dirname(__DIR__));
$doc_root = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
$web_path = str_replace($doc_root, '', $base);
echo "base: $base\n";
echo "doc_root: $doc_root\n";
echo "web_path: $web_path\n";
