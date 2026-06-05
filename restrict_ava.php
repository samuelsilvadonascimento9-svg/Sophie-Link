<?php
$f = 'public/portais/ava.php';
$content = file_get_contents($f);

// 1. Remove the professor access from protect_page
$content = str_replace(
    "protect_page(['aluno', 'professor', 'admin']);",
    "protect_page(['aluno']);",
    $content
);

// 2. We can leave the $isProf logic in there, but it will just never be true.
// Actually, it's safer to leave it than to delete it and risk breaking the PHP syntax if there are unmatched braces.

file_put_contents($f, $content);
echo "Professor access restricted from ava.php!";
