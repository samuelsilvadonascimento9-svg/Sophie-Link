<?php
// includes/helpers.php

/**
 * Função utilitária para escapar saída HTML e prevenir XSS (Cross-Site Scripting).
 * @param mixed $value
 * @return string
 */
function h(mixed $value): string {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}
