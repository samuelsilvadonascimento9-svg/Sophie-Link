<?php
$cssFile = 'c:\\xampp\\htdocs\\devweb\\Sophie-Link\\public\\assets\\css\\index.css';
$lines = file($cssFile);
$newCss = file_get_contents('c:\\xampp\\htdocs\\devweb\\Sophie-Link\\scratch\\new_css.txt');
// lines 112 to 368 are index 111 to 367. Line 369 is index 368
$out = array_merge(array_slice($lines, 0, 111), [$newCss], array_slice($lines, 368));
file_put_contents($cssFile, implode("", $out));

$phpFile = 'c:\\xampp\\htdocs\\devweb\\Sophie-Link\\public\\index.php';
$lines = file($phpFile);
$newHtml = file_get_contents('c:\\xampp\\htdocs\\devweb\\Sophie-Link\\scratch\\new_html.txt');
// The carousel in index.php goes from <section class="hero-carousel"> at line 127
// to </section> at line 228
$out2 = array_merge(array_slice($lines, 0, 126), [$newHtml], array_slice($lines, 228));
file_put_contents($phpFile, implode("", $out2));

echo "Patched successfully!";
