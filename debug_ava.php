<?php
$f = 'public/portais/ava.php';
$content = file_get_contents($f);

preg_match_all('/<div [^>]*class="[^"]*page-section[^"]*"[^>]*>/', $content, $m);
print_r($m);
